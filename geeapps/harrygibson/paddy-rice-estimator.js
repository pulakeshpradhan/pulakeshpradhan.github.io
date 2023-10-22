var mod09a1_full = ee.ImageCollection("MODIS/006/MOD09A1"),
    test_img_may = ee.Image("MODIS/006/MOD09A1/2017_05_25"),
    test_img_jan = ee.Image("MODIS/006/MOD09A1/2017_01_09"),
    gTopo30 = ee.Image("USGS/GTOPO30"),
    mcd12q1 = ee.ImageCollection("MODIS/051/MCD12Q1"),
    mcd12q1_2013 = ee.Image("MODIS/051/MCD12Q1/2013_01_01"),
    nationalBoundaries = ee.FeatureCollection("USDOS/LSIB/2013");
// Implement the rice paddy detection algorithm described in doi:10.1016/j.rse.2005.10.004, Xiao et al 2006
// EE code by Harry Gibson
/* MOD09A1 bands in earth engine
idx name        type          dims
0	sur_refl_b01	signed int16	86400x43200 px
1	sur_refl_b02	signed int16	86400x43200 px
2	sur_refl_b03	signed int16	86400x43200 px
3	sur_refl_b04	signed int16	86400x43200 px
4	sur_refl_b05	signed int16	86400x43200 px
5	sur_refl_b06	signed int16	86400x43200 px
6	sur_refl_b07	signed int16	86400x43200 px
7	QA	unsigned int32	86400x43200 px
8	SolarZenith	signed int16	86400x43200 px
9	ViewZenith	signed int16	86400x43200 px
10	RelativeAzimuth	signed int16	86400x43200 px
11	StateQA	unsigned int16	86400x43200 px
12	DayOfYear	unsigned int16	86400x43200 px
MOD09A1 user guide: https://lpdaac.usgs.gov/sites/default/files/public/product_documentation/mod09_user_guide_v1.4.pdf
specifies the wavelengths for each band in MOD09A1 product as follows
bandname     - wavelength - desc in rice paper
sur_refl_b01 - 620-670nm - "red"??
sur_refl_b02 - 841-876nm - "NIR"
sur_refl_b03 - 459-479nm - "blue"??
sur_refl_b04 - 545-565nm - "green"??
sur_refl_b05 - 1230-1250nm
sur_refl_b06 - 1628-1652nm - "SWIR"
sur_refl_b07 - 2105-2155nm
Also the QA band is a packed value giving quality for each band separately, see tables 10 in the guide, and 
the StateQA band is an overall pixel quality measure with various different metrics again in a single packed value 
- see table 13
*/
/// http://ricepedia.org/burundi
// ****************** SETUP ****************** //
// use a single image for testing the sub-steps
var test_img = test_img_may;
// vaguely true-colour representation of it
var vizParams = {
  bands: ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],
  min: 0,
  max: 10000,
  gamma: [0.95, 1.1, 1]
};
Map.addLayer(test_img, vizParams, "test_image", false);
// We'll work on an annual basis - one rice image per year, based on the 46 MODIS images
var yearFrom = 2015;
var yearTo = 2015;
var years = ee.List.sequence(yearFrom-1, yearTo);
var ISO3_TO_EXPORT = "HTI";
// Get a geometry for the area of interest 
var geoms = nationalBoundaries.filterMetadata("iso_alpha3", "equals", ISO3_TO_EXPORT);
var bufferedboxes = geoms.map(
  function(f){
    return f.bounds().buffer(10000).bounds();
  });
//var AOI_geom = bufferedboxes.union(ee.ErrorMargin(10));
// random uganda box test
// var minX = 28;var maxX = 36;var minY = -2;var maxY = 5;
// MAP-africa
var minX = -18; var maxX = 52; var minY = -32; var maxY = 34;
var AOI_geom = ee.Geometry.Polygon([[[minX, minY],[maxX, minY],[maxX, maxY],[minX, maxY],[minX, minY]]]);
Map.addLayer(AOI_geom);
// Export resolution in metres (so, in WGS84 the output resolution will vary with latitude)
var EXPORT_RES_M = 500;
var AGGREGATE_AS_PROPORTION = true;
// Use a different cloud storage bucket if you need to.
var CLOUDBUCKET = "ee-oxford-upload";
// INPUT DATA
// prefilter to only include images for the years we want
// I feel we shouldn't have to do this as post filtering to only export / map the image for one year 
// ought to propagate up but somehow it doesn't seem to and we get timeouts if we don't do this
var whenFrom = ee.Date.fromYMD(yearFrom, 1, 1);
// we need images 40 days before the first date for which we require an output, and for each image we have we need 
// the full year of images to compute its masking
whenFrom = whenFrom.advance(-1, 'year');
var whenTo = ee.Date.fromYMD(yearTo, 12, 31);
var mod09a1 = mod09a1_full.filterDate(whenFrom, whenTo);
//print("Input date-limited series", mod09a1);
// xiao excluded areas above 2000m, however now we're extending the region this would exclude tibet in 
// its entirety and i reckon they do grow rice there, so i might not bother with this
var elevMask = gTopo30.lte(2000);
// Map.addLayer(elevMask,{opacity:0.5}, "elev-mask");
// xiao used 2 degree slope limit, just be a bit more conservative as we're extending the area in the absence 
// of any real knowledge. We're never going to be able to cope with terracing in this approach.
var slopeMask = ee.Terrain.slope(gTopo30).lte(3);
Map.addLayer(slopeMask.not().updateMask(slopeMask.not())
              , null ,"steep", false, 0.7);
var igbp_latest = mcd12q1_2013.select('Land_Cover_Type_1');
var oceanMask = igbp_latest.neq(0);
Map.addLayer(oceanMask.not().updateMask(oceanMask.not())
            , null, "ocean?", false, 0.7);
var igbp_qc = mcd12q1_2013.select('Land_Cover_Type_QC');
/* 04-07 Land-water mask
0 = Shallow ocean
1 = Land (Nothing else but land)
2 = Ocean coastlines and lake shores
3 = Shallow inland water
4 = Ephemeral water
5 = Deep inland water
6 = Moderate or continental ocean
7 = Deep ocean */
var qc_landwater = igbp_qc.right_shift(4);
var ocean_qc_mask = qc_landwater.eq(0)
    .or(qc_landwater.eq(2))
    .or(qc_landwater.eq(3))
    .or(qc_landwater.eq(6))
    .or(qc_landwater.eq(7))
    .not()
    ;
//print(ocean_qc_mask);
//Map.addLayer(ocean_qc_mask,null,"is-ocean");
// ****************** MOD09A1 NORMALISED INDEX COMPUTATION FUNCTIONS ****************** // 
// Define functions to compute the various normalised indices used in the algorithm, on a single 
// MOD09A1 image.
var unScale = function(image){
  return image.float().divide(10000);
};
var computeNDVI = function(image){
  var nir = unScale(image.select('sur_refl_b02'));
  var red = unScale(image.select('sur_refl_b01'));
  var ndvi = (nir.subtract(red)).divide(nir.add(red));
  return ndvi.rename('ndvi').set('system:time_start', image.get('system:time_start'));
};
var computeLSWI = function(image){
  var nir = unScale(image.select('sur_refl_b02'));
  var swir = unScale(image.select('sur_refl_b06'));
  var lswi = (nir.subtract(swir)).divide(nir.add(swir));
  return lswi.rename('lswi').set('system:time_start', image.get('system:time_start'));
};
var computeEVI = function(image){
  var nir = unScale(image.select('sur_refl_b02'));
  var red = unScale(image.select('sur_refl_b01'));
  var blue = unScale(image.select('sur_refl_b03'));
  var evi = nir.subtract(red)
    .divide(nir.add(red.multiply(6.0)).subtract(blue.multiply(7.5)).add(1.0))
    .multiply(2.5)
    .clamp(0.0, 1.0);
  return evi.rename('evi').set('system:time_start', image.get('system:time_start'));
};
var computeNDSI = function(image){
  // the referenced paper used nir band but most other references use swir
  // for example doi:10.1016/j.rse.2003.10.016
  // Doing it with nir and a threshold of snow = 0.4+ gives completely nonsense results
  // so i assume this was a misprint
  //var nir = unScale(image.select('sur_refl_b02'));
  var swir = unScale(image.select('sur_refl_b06'));
  var green = unScale(image.select('sur_refl_b04'));
  var ndsi = (green.subtract(swir)).divide(green.add(swir));
  return ndsi.rename('ndsi').set('system:time_start', image.get('system:time_start'));
};
// ****************** ALGORITHM STEPS EXTRACTED FROM NARRATIVE OF THE PAPER ****************** //
// Steps are numbered according to how they appear in the text but are not executed in this order.
// 1. Compute flooded areas as those where LSWI is nearly as high, or higher, than NDVI or EVI
var computeFlooded = function(image){
  var lswi = computeLSWI(image);
  var evi = computeEVI(image);
  var ndvi = computeNDVI(image);
  var test = evi.min(ndvi);
  var flood = lswi.add(0.05).gte(test);
  return flood.rename('flood').set('system:time_start', image.get('system:time_start'));
};
// 2. "a procedure to determine whether rice growth occurs in (a) pixel, using the assumption that the EVI 
//      value of a true rice pixel reaches half the maximum EVI value (in that crop cycle) within 5 8-day 
//      composites (40 days) following the date of flooding and transplanting"
// This needs breaking down into several steps:
// ****************** These stages are implemented further below ****************** //
// 2. a. Identify dates when flooding occurs (relative to a previous image that was not flooded)
// 2. b. Identify maximum EVI values reached by each pixel in each crop cycle (or, let's say ever)
// 2. c. Identify locations / times where the EVI was at least half of this maximum value
// 2. d. Identify from these locations/times the ones which are within 40 days of a flooding date
// ****************** ************************************ ****************** //
// 3. Cloud cover mask
// "Exclude pixels where marked as cloud in the QC band, and also exclude pixels where blue band 
// reflectance GTE 0.2"
// This description is somewhat inconclusive of what they actually did, see comments
// NB returns 0 where cloudy and 1 otherwise, for use with updateMask
var computeCloudOrBlueMask = function(image){
    var blue = unScale(image.select('sur_refl_b03'));
    // from MODIS doc: "All cloud information should be derived from State QA SDSs" (not the band qa)
    var qa = image.select('StateQA');
    // from MODIS doc: "bits 0-1 are a cloud mask read from MOD35 and bit 10 is a cloud mask generated by PGE11's
    // internal cloud algorithm"
    // Xiao et al does not specify which was used so we'll use either (OR):
    // bits 0-1 key: 00 = clear, 01 = cloudy, 10 = mixed, 11 = unset, assumed clear
    var cloudMOD35 = (qa.bitwise_and(3).eq(1)).or(qa.bitwise_and(3).eq(1));
    // bit 10 key: 0 = clear, 1 = cloud
    var cloudInternal = qa.bitwise_and(1024).eq(1024);
    return cloudMOD35
      .or(cloudInternal)
      .not()
      // turned the blue check off for the time being as it doesn't appear necessary and it marks clouds 
      // in the middle of clear deserts
      //.or(blue.gte(0.2)) 
      .rename('cloud').set('system_time_start', image.get('system:time_start'));
};
var computeCloudMODISMask = function(image){
    var qa = image.select('StateQA');
    // from MODIS doc: "bits 0-1 are a cloud mask read from MOD35"
    // bits 0-1 key: 00 = clear, 01 = cloudy, 10 = mixed, 11 = unset, assumed clear
    var cloudMOD35 = (qa.bitwise_and(3).eq(1)).or(qa.bitwise_and(3).eq(1));
    return cloudMOD35
      .not()
      .rename('cloud').set('system_time_start', image.get('system:time_start'));
};
var computeCloudInternalMask = function(image){
    var qa = image.select('StateQA');
    // from MODIS doc: "bit 10 is a cloud mask generated by PGE11's internal cloud algorithm"
    // bit 10 key: 0 = clear, 1 = cloud
    var cloudInternal = qa.bitwise_and(1024).eq(1024);
    return cloudInternal
      .not()
      .rename('cloud').set('system_time_start', image.get('system:time_start'));
};
// 4. Snow mask
// "Filter snow pixels based on NDSI and NIR reflectance, where NDSI > 0.40 and NIR > 0.11"
// NB NDSI has been implemented using SWIR band, not NIR, but Xiao et al state NIR - this appears 
// wrong. Unsure if we should also use SWIR in the additional check here.
// NB - Returns 0 where snow and 1 otherwise, for use with updateMask
var computeSnowMask = function(image){
  var ndsi = computeNDSI(image);
  var nir = image.select('sur_refl_b02');
  var snow = ndsi.gte(0.40).bitwise_and(nir.gte(0.11)).not();
  return snow.rename('snow').set('system:time_start', image.get('system:time_start'));
};
// 5. a. Function to flag as water where NDVI < 0.10 and NDVI < LSWI
var computeWater = function(image){
  // i dunno why they don't use the "flooded" function already implemented, rather than redefining 
  // a slightly different version that doesn't use EVI...
  var lswi = computeLSWI(image);
  var ndvi = computeNDVI(image);
  var water = ndvi.lt(0.1).and(ndvi.lt(lswi));
  return water.rename('water').set('system:time_start', image.get('system:time_start'));
};
// ****************** SINGLE IMAGE CHECKS ****************** //
// test each of the functions on a single image to make sure they're looking sensible
// Test the different cloud masks, there are two, see which is better
var cloudEither = computeCloudOrBlueMask(test_img).not(); // back to 1=cloud for display
//Map.addLayer(cloudEither.updateMask(cloudEither), {palette:['000000','FF69B4']},"cloud-either");
var cloudInt = computeCloudInternalMask(test_img).not();
//Map.addLayer(cloudInt.updateMask(cloudInt), {palette:['000000','69FFB4']},"cloud-int");
var cloudMod = computeCloudMODISMask(test_img).not();
//Map.addLayer(cloudMod.updateMask(cloudMod), {palette:['000000','FFB469']},"cloud-mod");
var cloudBoth = cloudInt.and(cloudMod);
//Map.addLayer(cloudBoth.updateMask(cloudBoth), {palette:['000000', 'FFFF00']}, "cloud-both");
// Seems like it is most realistic when BOTH checks are showing cloud i.e. conservative
// Go with that from now on
test_img = test_img.updateMask(cloudBoth.not());
// Compute snow on the remaining image after masking the clouds
var snow = computeSnowMask(test_img);
//Map.addLayer(snow.not().updateMask(snow.not()), {palette:['000000', '#FFFFFF']}, "snow");
test_img = test_img.updateMask(snow);
var water = computeWater(test_img);
//Map.addLayer(water.updateMask(water), {palette:['000000', '00AAFF']}, 'oneoff-water');
// Compute flooding on the remaining image after masking the clouds and snow
//var flood = computeFlooded(test_img);
//Map.addLayer(flood.updateMask(flood), {palette:['000000', '0000FF']}, "flood");
// ****************** END SINGLE IMAGE CHECKS ****************** //
// ****************** COLLECTION BASED ANALYSIS ****************** //
// All the functions above can be tested on a single image, now do the time-series things //
// This order is not specified in Xiao et al, but we'll mask snow and clouds first before assessing for water
// or vegetation. It shouldn't matter as they all delete pixels but the false positives on e.g. water if 
// cloud isn't masked first make it hard to run checks on how good a job we're doing.
// So first apply the cloud mask to all the images, we can't do anything where it's cloudy
// Then also apply the snow mask, and finally set the year as a separate property for easier joining
var maskedByImageSeries = mod09a1.map(function(img){
  var cloudInt = computeCloudInternalMask(img); // 1 = clear 0 = cloud
  var cloudMod = computeCloudMODISMask(img); // 1 = clear 0 = cloud
  var cloudBoth = cloudInt.or(cloudMod); // 0 = cloud only when both masks say cloud, see tests above
  var snowMask = computeSnowMask(img);
  return img.set('year', ee.Date(img.get('system:time_start')).get('year'))
            .updateMask(oceanMask)
            .updateMask(elevMask)
            .updateMask(slopeMask)
            .updateMask(cloudBoth)
            .updateMask(snowMask)
            ;
});
print("self masked image series", maskedByImageSeries);
Map.addLayer(ee.Image(maskedByImageSeries.first())
            , null, "sample self-masked img", false, 0.7);
// Now we need to calculate some further masks for the individual images, based on annual aggregations 
// of those images.
// 5. Permanent water mask
// "Identify pixels covered by water, then exclude from the analysis those pixels which are water for 
// more than 10 images (8 day blocks) per year" 
// 5. b. Set as permanent water those pixels which are flagged as water in more than 10 images per year
// TODO would it be better (in terms of quality not to mention computation) to use something pre-baked e.g. JRC water
// mapping into an annual series based on 
// https://groups.google.com/d/topic/google-earth-engine-developers/GLZ6ILKqYNA/discussion
var annualPermanentWaterMask =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    var start = ee.Date.fromYMD(y, 1, 1);
    // this approach enables us to use non-calendar years e.g. april-april or whatever
    var stop = start.advance(0, 'year').advance(12, 'month').advance(0,'day');
    var waterYear = maskedByImageSeries.filter(ee.Filter.date(start, stop))
             .map(computeWater);
    var waterYearCount = waterYear.sum();
    var waterYearMean = waterYear.mean();
    // let's also try to implement a threshold for the average because the count will vary 
    var w = waterYearCount.gt(10); //.and(waterYearMean.gt(0.3));
    return w.set('year', y)
            .set('system:time_end',ee.Date.fromYMD(y,1,1).advance(1, 'year'))
            .set('system:time_start',ee.Date.fromYMD(y,1,1))
            .not();
}).flatten());
// 6. Mask out evergreen vegetation
// TODO would it be better (in terms of quality not to mention computation) to use something pre-baked e.g. MODIS landcover
// 6. a.  Identify areas where NDVI > 0.7 for at least 20 8-day composites per year, to flag evergreen forests
//        Use a gapfilled product to allow a meaningful cumulative count
//        TODO what gapfilled product? And why don't we use one for the water flagging, too?
var annualEvergreenForest = ee.ImageCollection.fromImages(
  years.map(function(y){
    var start = ee.Date.fromYMD(y, 1, 1);
    var stop = start.advance(12, 'month').advance(0, 'day');
    var ndviGreenYearColl = maskedByImageSeries.filter(ee.Filter.date(start, stop))
      .map(function(img){
          return computeNDVI(img).gt(0.7);
        });
    var ndviGreenYearCount = ndviGreenYearColl.sum();
    var ndviGreenYearMean = ndviGreenYearColl.mean();
    // TODO - maybe a mean value too if n is say between 10 and 20? 
    var forestYear = ndviGreenYearCount.gt(20).rename("maybeForest");
    return forestYear.set('year', y)
            .set('system:time_end',ee.Date.fromYMD(y,1,1).advance(1, 'year'))
            .set('system:time_start',ee.Date.fromYMD(y,1,1));
  }).flatten());
// 6. b.  Identify areas where LSWI is always GTE 0.10, to flag natural evergreen (non forest) vegetation
//        TODO this has been tuned for the original study area, is it globally suitable?
var annualEvergreenShrubbery = ee.ImageCollection.fromImages(
  years.map(function(y){
    var start = ee.Date.fromYMD(y, 1, 1);
    var stop = start.advance(12, 'month').advance(0, 'day');
    var shrubbyYearImg = maskedByImageSeries.filter(ee.Filter.date(start, stop))
      .map(function(img){
        return computeLSWI(img).gte(0.1);
        })
      .reduce(ee.Reducer.allNonZero())
      .rename("maybeShrubbery");
    return shrubbyYearImg.set('year', y)
             .set('system:time_end',ee.Date.fromYMD(y,1,1).advance(1, 'year'))
             .set('system:time_start',ee.Date.fromYMD(y,1,1));
  }).flatten());
// 6. c. Combine the forest and other evergreen vegetations estimates into a single image band
var annualEvergreenMask = annualEvergreenForest
  .combine(annualEvergreenShrubbery)
  .map(function(image){
    var forest = image.select('maybeForest');
    var shrub = image.select('maybeShrubbery');
    return forest.or(shrub)
      .rename('evergreen')
      .set('system:time_end',image.get('system:time_end'))
      .set('system:time_start',image.get('system:time_start'))
      .set('year', image.get('year'))
      .not();
  });
// Combine the overall evergreen and watermasks into a collection of 2-band images
var annualMasks = annualPermanentWaterMask.combine(annualEvergreenMask);
// 6. extra - let's also try to make a an mask of evergreen from the MODIS landcover data
var annualLandcoverMask = mcd12q1.map(function(image){
  var igbp = image.select('Land_Cover_Type_1');
  // igbp evergreen forest classes 1, 2; deciduous classes 3, 4, mixed forest class 5
  var year = ee.Date(image.get('system:time_start')).get('year');
  var igbpForest = igbp.eq(1).or(igbp.eq(2)).or(igbp.eq(3)).or(igbp.eq(4)).or(igbp.eq(5));
  return igbpForest
    .rename('evergreen_landcover')
    .set('system:time_start',image.get('system:time_start'))
    .set('year', year)
    .not();
});
// we can't .combine this to the others as it comes from different images, with different IDs
var getAnnualLCJoin = ee.Join.saveBest({
  matchKey: 'lcImage',
  measureKey: 'yearDiff'
});
var lcJoinRes = getAnnualLCJoin.apply({
  primary: annualMasks,
  secondary: annualLandcoverMask,
  condition: ee.Filter.maxDifference({
    difference: 5, // the latest landcover image is 2013 and the latest rice mapping is 2016 so cover that
    leftField: 'year',
    rightField: 'year'
  })
});
annualMasks = lcJoinRes.map(function(image){
  var lcImg = ee.Image(image.get('lcImage'));
  image = ee.Image(image).addBands(lcImg);
  return image;
});
//.combine(annualLandcoverMask);
print(annualMasks);
//var checkEverPermWater = annualPermanentWater.reduce(ee.Reducer.anyNonZero());
//Map.addLayer(checkEverPermWater.updateMask(checkEverPermWater), {palette:['000000', '00AAFF']}, 'perm-water');
//var checkEverEvergreenWhut = annualEvergreen.reduce(ee.Reducer.anyNonZero());
//Map.addLayer(checkEverEvergreenWhut.updateMask(checkEverEvergreenWhut), {palette:['000000', '228B22']}, 'perm-forest');
// ****************** PROCESS THE COLLECTIONS ****************** //
// now having started with the original image stack and for each one, applied the cloud / snow mask based on the image,
// next we apply the permanent water or evergreen vegetation mask based on the year of that image
// join each is-a-flood image to the previous one temporally
var getAnnualMaskJoin = ee.Join.inner();
var joinRes = getAnnualMaskJoin.apply({
  primary: maskedByImageSeries,
  secondary: annualMasks,
  condition: ee.Filter.equals({
    leftField: 'year',
    rightField: 'year'
  })
});
print('Annual join result', joinRes);
Map.addLayer(ee.Image(joinRes.first().get('secondary'))
            , null, "sample annual mask", false, 0.7);
var fullyMaskedSeries = ee.ImageCollection(joinRes.map(function(feature){
  var image = ee.Image(feature.get('primary'));
  var annualMask = ee.Image(feature.get('secondary'));
  var masked = image
    .updateMask(annualMask.select('water'))
    .updateMask(annualMask.select('evergreen'))
    .updateMask(annualMask.select('evergreen_landcover'));
  return masked;
}));
print('Fully masked image series', fullyMaskedSeries);
Map.addLayer(ee.Image(fullyMaskedSeries.first())
      , null, "sample fully-masked img", false, 0.7);
// 2. a. Identify dates when flooding occurs (relative to a previous image that was not flooded)
// get all the flooding
var floodedImages = fullyMaskedSeries.map(function(image){
  return computeFlooded(image);
});
// join each is-a-flood image to the previous one temporally
var savePrevFloodJoin = ee.Join.saveFirst({
  matchKey: 'prevFlood',
  ordering: 'system:time_start',
  ascending: false
});
var floodsWithPrev = savePrevFloodJoin.apply({
  primary: floodedImages,
  secondary: floodedImages,
  condition: ee.Filter.greaterThan({
    leftField: 'system:time_start',
    rightField: 'system:time_start'
  })
});
print('Floods with previous image', floodsWithPrev);
// build a collection of images that are 1 where a pixel is flooded now but wasn't in prev image
var floodInitiations = floodsWithPrev.map(function(joinedImg){
  var prevImg = ee.Image(joinedImg.get('prevFlood'));
  var thisImg = ee.Image(joinedImg);
  var isNewFlood = thisImg.and(prevImg.not());
  return isNewFlood.set('system:time_start', thisImg.get('system:time_start')).rename('flood-starts');
});
floodInitiations = ee.ImageCollection(floodInitiations);
// 2. b. Identify maximum EVI values reached by each pixel in each crop cycle (or, let's say ever, for now, to 
//    avoid faffing about with figuring out what the local crop cycle is... we're masking evergreen veg after all)
// 2. c. Identify locations / times where the EVI was at least half of this maximum value
var maxEVIThreshold = fullyMaskedSeries.map(function(image){
  return computeEVI(image);
}).max().divide(2.0);
var eviOverThresholdDates = fullyMaskedSeries.map(function(image){
  // also compute a date window that will be used in the join to get the flood images
  var fortyDaysAgo = ee.Date(image.get('system:time_start')).advance(-40, 'day');
  var fortyDayWindow = ee.DateRange(fortyDaysAgo, image.get('system:time_start'));
  return computeEVI(image)
    .gt(maxEVIThreshold)
    .rename('high-evi')
    .set('system:time_start', image.get('system:time_start'))
    .set('forty_day_window', fortyDayWindow);
});
// 2. d. Identify from these locations/times the ones which are within 40 days of a flooding date
// we want to look at more than one preceding image so use a saveAll
var saveFloodStartsJoin = ee.Join.saveAll({
  matchesKey: 'floodsInLast40D',
  ordering: 'system:time_start',
  ascending: false
});
// to each evi-over-threshold image attach the flood initiation images occurring in the prev 40 days
var greenWithPrevFloods = saveFloodStartsJoin.apply({
  primary: eviOverThresholdDates,
  secondary: floodInitiations,
  condition: ee.Filter.dateRangeContains({
    leftField: 'forty_day_window',
    rightField: 'system:time_start'
  })
});
//print(greenWithPrevFloods);
// aaaaannndd finally... it was all worth it for this one variable name
var riceRiceBaby = greenWithPrevFloods.map(function(image){
  var recentFloodMaps = ee.ImageCollection.fromImages(image.get('floodsInLast40D'));
  var anyRecentFloods = recentFloodMaps.reduce(ee.Reducer.anyNonZero());
  var thisImg = ee.Image(image);
  var isItRice = thisImg.and(anyRecentFloods);
  return isItRice.rename('rice')
    .set('system:time_start', image.get('system:time_start'));
});
riceRiceBaby = ee.ImageCollection(riceRiceBaby);
print(riceRiceBaby);
//var sampleRice = ee.Image(riceRiceBaby.filterDate(ee.Date.fromYMD(2016,9,1), ee.Date.fromYMD(2016,9,10)).first());
//Map.addLayer(sampleRice.updateMask(sampleRice), {palette:['000000', 'FF0000']}, "rice-oneday");
var yr = yearTo;
var riceYr = ee.Image(riceRiceBaby.filterDate(ee.Date.fromYMD(yr,1,1), ee.Date.fromYMD(yr,12,31))
  .reduce(ee.Reducer.anyNonZero()));
print ("Rice estimate for "+yr, riceYr);
Map.addLayer(riceYr.updateMask(riceYr), {palette:['000000', 'FF0000']}, "rice-"+yr);
//var eviHighPostFlood = floodsAndEVIPeaks.map(function(image))
/*
var sampleComb = ee.Image(floodsAndEVIPeaks.filterDate(ee.Date.fromYMD(2001,8,13), ee.Date.fromYMD(2001,8,23)).first());
print(sampleComb);
var last40days = floodInitiations.filterDate(testDate.advance(-40, 'day'), testDate);
var floodInLast40days = last40days.reduce(ee.Reducer.anyNonZero());
print (floodInLast40days);
var sampleEVI = ee.Image(eviOverThresholdDates.filterDate(testDate).first());
print (sampleEVI);
var isrice = sampleEVI.and(floodInLast40days).rename('rice')
  .set('system:time_start', sampleEVI.get('system::time_start'));
print(isrice);
Map.addLayer(isrice.updateMask(isrice),{palette:['000000', 'FF0000']}, "rice" );
*/
if (AGGREGATE_AS_PROPORTION && EXPORT_RES_M != 500){
  var riceReduced = riceYr.reproject('EPSG:4326', null, 500)
  .reduceResolution({
    reducer:ee.Reducer.mean(), 
    maxPixels:10000
  });
  var xSize = Math.ceil((maxX - minX) * 24);
  var ySize = Math.ceil((maxY - minY) * 24);
  Export.image.toCloudStorage({
    image:riceReduced,
    description: "rice-"+yr,
    bucket:CLOUDBUCKET,
    //scale:5000,
    dimensions:"192x168",
    maxPixels:400000000,
    region:AOI_geom,
    crs: 'EPSG:4326'
});
}
else{
Export.image.toCloudStorage({
  image:riceYr,
  description: "rice-"+yr,
  bucket:CLOUDBUCKET,
  scale:EXPORT_RES_M,
  maxPixels:400000000,
  region:AOI_geom,
  crs: 'EPSG:4326'
});
}