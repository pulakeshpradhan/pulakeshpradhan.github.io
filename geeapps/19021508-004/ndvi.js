var Shapefile2 = ui.import && ui.import("Shapefile2", "table", {
      "id": "users/19021508-004/PAK_adm3"
    }) || ee.FeatureCollection("users/19021508-004/PAK_adm3");
var pak = Shapefile2.filter(ee.Filter.eq('NAME_3', 'Gujrat'));
var geometry = pak.geometry();
print ('Gujrat Area', geometry.area().divide(10000))
Map.addLayer(geometry, {color :'silver'}, 'Gujrat');
Map.centerObject(pak,9);
//date
var date_start = ee.Date('2018-01-01');
var date_end= ee.Date('2022-10-31');
//define collection
var S2 = ee.ImageCollection("COPERNICUS/S2_SR")
                .filterBounds(pak)        
                .filterDate(date_start.advance(-1,'year'),date_end);
//apply cloud mask
function filterS2_level2A(image) {
  var SCL = image.select('SCL');
  var mask01 = ee.Image(0).where(
      SCL.lt(8).and(SCL.gt(3)) ,1); //Put a 1 on good pixels
  return image.updateMask(mask01);
}
var S2filtered= S2.map(filterS2_level2A);
//compute ndvi
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8','B4'])
                  .multiply(10000).int16();
  return image.addBands(ndvi.rename('ndvi'));
}
var S2filtered = S2filtered.map(addNDVI);
//select bands of interest (NDVI only)
var S2filtered = S2filtered.select('ndvi');
//clip collection to study area
var S2_clipped = S2filtered.map(function(img){ 
                    return img.clip(pak)});
                //create list of months from 1 to 12
var months = ee.List.sequence(1, 12);
//separate by years
var years = ee.List.sequence(date_start.advance(-1,"year")
                                       .get("year"),
                             date_end.get("year"));
//compute median value per month
var composite = years.map(function (y) {
     return ee.ImageCollection.fromImages(months.map(function (m) {
      return S2_clipped.filter(ee.Filter.calendarRange(y,y,'year'))
                       .filter(ee.Filter.calendarRange(m,m,'month'))
                       .median()
                       .set('month',m, 'year',y);
    }))
  });
  //decompose list of img collection into list of images
function decomposeList(l) {
  return ee.ImageCollection(l).toList(12)
}
var list_imgs = composite.map(decomposeList).flatten();
//set system id and system index according to year and month
function renameImages(img1) {
  var img = ee.Image(img1);
  var value = ee.Number(img.get('year')).format('%04d')
          .cat('_').cat(ee.Number(img.get('month')).format('%02d'));
  return ee.Image(img.set('system:index', value, 'system:id',value))
}
var list_imgs_renamed = list_imgs.map(renameImages);
//convert from list to img collection
var decomposed_collection = ee.ImageCollection(list_imgs_renamed);
//set image dates in milliseconds
function setTime(img) {
  return img.set('system:time_start', ee.Date.fromYMD(
                  img.get('year'),img.get('month'),01).millis())
}
//set number of bands
function addNumBands(img){
  return img.set('num_bands', img.bandNames().length())
}
//add time band to image
function addTime(img) {
  var time = ee.Image(img.date().millis()).rename('t').float();
  return img.addBands(time)
}
//add constant band
function addConstant(img) {
  return img.addBands(ee.Image.constant(1))
}
//apply functions
var decomposed_collection =  decomposed_collection.map(addNumBands);
var decomposed_collection = decomposed_collection
                                       .filter('num_bands > 0');
var decomposed_collection =  decomposed_collection.map(setTime)
var decomposed_collection =  decomposed_collection.map(addConstant)
var decomposed_collection =  decomposed_collection.map(addTime)
//PART 3.2
// define the dependent variable to be modeled.
var dependent = 'ndvi';
// define the number of cycles per year to model.
var harmonics = 3;
// make a list of harmonic frequencies to model,  
// which also serve as band name suffixes.
var harmonicFrequencies = ee.List.sequence(1, harmonics);
// get a sequence of band names for harmonic terms.
var getNames = function(base, list) {
  return ee.List(list).map(function(i) { 
    return ee.String(base).cat(ee.Number(i).int());
  });
};
// create lists of names for the harmonic terms.
var cosNames = getNames('cos_', harmonicFrequencies);
var sinNames = getNames('sin_', harmonicFrequencies);
// define independent variables.
var independents = ee.List(['constant', 't'])
                            .cat(cosNames).cat(sinNames);
// compute the specified number of harmonics
// and add them as bands. Assumes the time band is present.
var addHarmonics = function(freqs) {
  return function(image) {
    // make an image of frequencies
    var frequencies = ee.Image.constant(freqs);
    // this band should represent time in radians.
    var PI2 = 2.0 * Math.PI
    var time = ee.Image(image).select('t').multiply( PI2 / (1000 * 60 * 60 * 24 * 365.25));
    // get the cosine terms.
    var cosines = time.multiply(frequencies).cos().rename(cosNames); 
    // get the sin terms.
    var sines = time.multiply(frequencies).sin().rename(sinNames);
    return image.addBands(cosines).addBands(sines);
  };
};
// Add variables.
var harmonicSentinel = decomposed_collection.map(
                                addHarmonics(harmonicFrequencies));
                                // fit model to time-series using linear regression reducer
var harmonicTrend = harmonicSentinel
   .select(independents.add(dependent))
   .reduce(ee.Reducer.linearRegression({
        numX: independents.length(),
        numY: 1}));
// turn the array image into a multi-band image of coefficients.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
   .arrayProject([0])
   .arrayFlatten([independents]);
// compute fitted values.
var fittedHarmonic = harmonicSentinel.map(function(image) {
   return image.addBands(image.select(independents)
        .multiply(harmonicTrendCoefficients)
        .reduce('sum')
        .rename('fitted'));
});
//get original composite values
var original_ndvi = decomposed_collection.select('ndvi');
//get fitted ndvi values
var fitted_ndvi = fittedHarmonic.select('fitted');
//combine bands
var combined = original_ndvi.combine(fitted_ndvi);
//fill gaps in original with fitted values
var gap_filled_composite = combined.map(function(img){
            return img.select('ndvi').unmask(img.select('fitted'))
});
//filter by date
var gap_filled_composite = gap_filled_composite
                                 .filterDate(date_start, date_end);
                                 // (OPTIONAL PART)
//convert from img collection to multi-band single image
var singleBand = gap_filled_composite.toBands();
//add august composite to map
Map.addLayer(singleBand,{bands: '2021_08_ndvi', min: 0, max: 10000,
                       palette: ['white', 'green']}, 'ndvi august');