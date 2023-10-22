var pts = ui.import && ui.import("pts", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -121.47578716278076,
            40.334212223383304
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -121.47535387382267,
              40.334165774308985
            ],
            [
              -121.47499445781467,
              40.33416781890998
            ]
          ],
          "geodesic": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -121.47578716278076,
            40.334212223383304
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -121.47535387382267,
              40.334165774308985
            ],
            [
              -121.47499445781467,
              40.33416781890998
            ]
          ],
          "geodesic": true
        }
      ],
      "coordinates": []
    }),
    gw_viz = ui.import && ui.import("gw_viz", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "min": 8.215350589532154,
        "max": 66.96624024274246,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"min":8.215350589532154,"max":66.96624024274246,"gamma":1},
    SMP1 = ui.import && ui.import("SMP1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -121.48055076599121,
            40.33404865521603
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "Upstream",
        "system:index": "0"
      },
      "color": "#1640d6",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1640d6 */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([-121.48055076599121, 40.33404865521603]),
        {
          "label": "Upstream",
          "system:index": "0"
        }),
    SMP2 = ui.import && ui.import("SMP2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -121.4763879776001,
            40.33126793571064
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "downstream",
        "system:index": "0"
      },
      "color": "#32ffec",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #32ffec */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([-121.4763879776001, 40.33126793571064]),
        {
          "label": "downstream",
          "system:index": "0"
        }),
    mwell_15 = ui.import && ui.import("mwell_15", "table", {
      "id": "users/Shree1175/ForestProgram/MWel_2015"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/MWel_2015"),
    mwell_16 = ui.import && ui.import("mwell_16", "table", {
      "id": "users/Shree1175/ForestProgram/MWel_2016"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/MWel_2016"),
    mwell_17 = ui.import && ui.import("mwell_17", "table", {
      "id": "users/Shree1175/ForestProgram/MWel_2017"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/MWel_2017"),
    dgw = ui.import && ui.import("dgw", "table", {
      "id": "users/Shree1175/ForestProgram/gw_532018"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/gw_532018"),
    bm = ui.import && ui.import("bm", "table", {
      "id": "users/Shree1175/ForestProgram/bm_532018"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/bm_532018"),
    gw = ui.import && ui.import("gw", "image", {
      "id": "users/Shree1175/ForestProgram/idw_stack"
    }) || ee.Image("users/Shree1175/ForestProgram/idw_stack"),
    samples = ui.import && ui.import("samples", "table", {
      "id": "users/Shree1175/ForestProgram/biomass_gee"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/biomass_gee"),
    sa_old = ui.import && ui.import("sa_old", "table", {
      "id": "users/Shree1175/ForestProgram/Childsmeadow_bnd2018"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/Childsmeadow_bnd2018"),
    CM_Lower_2015 = ui.import && ui.import("CM_Lower_2015", "image", {
      "id": "users/charlotteks/CMLower2015"
    }) || ee.Image("users/charlotteks/CMLower2015"),
    CM_Lower_2019 = ui.import && ui.import("CM_Lower_2019", "image", {
      "id": "users/charlotteks/CMLower2019"
    }) || ee.Image("users/charlotteks/CMLower2019"),
    Childs_Boundaries = ui.import && ui.import("Childs_Boundaries", "table", {
      "id": "users/charlotteks/Childs_Boundaries"
    }) || ee.FeatureCollection("users/charlotteks/Childs_Boundaries"),
    CM_Upper_2019 = ui.import && ui.import("CM_Upper_2019", "image", {
      "id": "users/charlotteks/CMUpper2019"
    }) || ee.Image("users/charlotteks/CMUpper2019"),
    CM_Upper_2015 = ui.import && ui.import("CM_Upper_2015", "image", {
      "id": "users/charlotteks/CMUpper2015"
    }) || ee.Image("users/charlotteks/CMUpper2015"),
    viz_channel = ui.import && ui.import("viz_channel", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "cluster"
        ],
        "palette": [
          "ffffff",
          "1e2ff9",
          "ffd867"
        ]
      }
    }) || {"opacity":1,"bands":["cluster"],"palette":["ffffff","1e2ff9","ffd867"]},
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/Shree1175/ForestProgram/all_study_reach"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/all_study_reach"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/Shree1175/ForestProgram/Study_Channel"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/Study_Channel"),
    survey_channel = ui.import && ui.import("survey_channel", "table", {
      "id": "users/Shree1175/ForestProgram/all_rtk_channel_only"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/all_rtk_channel_only");
//2.5.2020 Charlotte -  I added a new asset survey channel. See points displayed in the map. The attribute CODE has 
// Willow (36) and Deepest channel (T_W)(2022). The channel points should help with classification or validation. 
//let try to use these 2058 points and see if we can classify the image in Willow, Channel, outside channel. 
//3.16.2020 Added shapefile with 3 reaches to compare total area of channel between 2015 and 2019 by reaches (control, treatment 1 and treatment 2)
//load reaches after the channel classification
//load well data for each year
var channel = ee.FeatureCollection(table)
var all_reach = ee.FeatureCollection(table2)
var water = ee.FeatureCollection(dgw).select('DTW_Sticku', 'Year')
//print('check groundwater',water)
//var mw15 =ee.FeatureCollection(mwell_15).select('DTW_Sticku')
//var mw16 =ee.FeatureCollection(mwell_16).select('DTW_Sticku')
//var mw17 =ee.FeatureCollection(mwell_17).select('DTW_Sticku')
//load biomass
var biomass = ee.FeatureCollection(bm).select('Year', 'c_mg')//.buffer(10);
//print('check biomass', biomass)
//var biomass2 = ee.FeatureCollection(samples.buffer(10));
//Map.addLayer(biomass2, {color: 'yellow'}, 'samples', true);
//var bm_15 = biomass.filter(ee.Filter.eq('Year',2015));
//var bm_16 = biomass.filter(ee.Filter.eq('Year',2016));
//var bm_17 = biomass.filter(ee.Filter.eq('Year',2017));
//add year to mwell data
//load groundwater stack
//How do I add s year bands (2015, 2016,2017) to the stack so that the collection becomes 2 band image for each year
var stack = ee.ImageCollection(gw)
//print('check interpolated data', stack)
//Study area upper and lower reach
Map.centerObject(sa_old, 18);
//Map.addLayer(sa_old, {color: 'red'}, 'Childsmeadow', false);
var sa= ee.FeatureCollection(Childs_Boundaries)
Map.addLayer(sa, {color: 'red'}, 'Childsmeadow Study Area', false);
var start_year = 2013
var end_year = 2019
var startJulian=213; // Aug
var endJulian=305; // oct end
//////////////////////////////////////////////////////////////////
//Set up dates
//////////////////////////////////////////////////////////////////
if(startJulian > endJulian){endJulian = endJulian + 365}
var startDate = ee.Date.fromYMD(start_year,1,1).advance(startJulian,'day');
var endDate = ee.Date.fromYMD(end_year,1,1).advance(endJulian,'day');
//////////////////////////////////////////////////////////////////////////
//NDVI vizualize parameters
//////////////////////////////////////////////////////////////////////////
var vizParamsIndices = {bands:"NDVI", min:0.2,  max:0.85, palette: ['ffffff', '009F00','ffffff'], opacity: 0.77};
var ndvi_palette ='FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +  
'3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
/////////////////////////////////
// FUNCTIONS
/////////////////////////////////
// calculate indices -- only NDVI
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return image.addBands(ndvi);
}
function addNDMI(image) {
  var ndmi = image.normalizedDifference(['B5', 'B6']);
  return image.addBands(ndmi);
}
// adds a band representing the image timestamp julian.
var addTime = function(image) {
  return image.addBands(image.metadata('system:time_start')
    .divide(1000 * 60 * 60 * 24 * 365));
};
var analysisIndices = ['NDVI', 'NDMI','NDWI'];
function addIndices(in_image){
    in_image = in_image.addBands(in_image.normalizedDifference(['nir', 'red']).select([0],['NDVI']));
    in_image = in_image.addBands(in_image.normalizedDifference(['nir', 'swir2']).select([0],['NBR']));
    in_image = in_image.addBands(in_image.normalizedDifference(['nir', 'swir1']).select([0],['NDMI']));
    in_image = in_image.addBands(in_image.normalizedDifference(['green', 'nir']).select([0],['NDWI']));
    return in_image;
};
/////////////////////////////////////////////////////////////////////////////////////////
// Function to get year information added as a band to the entire collection.
//////////////////////////////////////////////////////////////////////////////////////////
var addYear = function(image) {
  var t = image.get('system:time_start');
  var y = ee.Date(t).get('year');
  var yimg = ee.Image(y).short().rename('year');
  var addyimg = yimg.addBands(image)
  return addyimg ;
};
//function for masking clouds
var cloudmasking=function(img){
  var cloudmask = img.select('cfmask').eq(0)//.not()
  return img.updateMask(cloudmask);
}
//cloud mask using pixel_qa for SR images
var clearMask = function(image) {
  var clear = image.select('pixel_qa').bitwiseAnd(2).neq(0);
  var mask = clear.eq(1);
  image = image.updateMask(mask);
  return image;
};
//Adding cloud correction on SR collection
var maskClouds_pixelQA = function(image) {
  var mask = image.select('pixel_qa');
  var maskImage = mask.bitwiseAnd(32).neq(0).or(mask.bitwiseAnd(8).neq(0));
  var maskWater = mask.bitwiseAnd(4).neq(0)
  //var mask2 = image.select('sr_cloud_qa').bitwiseAnd(4).neq(0);
  maskImage = maskImage.eq(0);
  return image.mask(maskImage);
}
//annualize the time series 
function annualizeSeries(series,startYear,endYear,compositingPeriod){
var years = ee.List.sequence(startYear,endYear,compositingPeriod);
var out =years.map(function(yr){
    var startDateT = ee.Date.fromYMD(yr,1,1);
    var endDateT = startDateT.advance(compositingPeriod,'year').advance(-1,'day');
    var seriesT = series.filterDate(startDateT,endDateT);
    seriesT = seriesT.median();
    return seriesT.set('system:time_start',ee.Date.fromYMD(yr,7,1).millis()).clip(sa);
    return seriesT;
  });
return ee.ImageCollection.fromImages(out);
}
/////////////////////////////////////////////////////////
//Function to convert collection to a multi-band image
//TBiwas, TNC
////////////////////////////////////////////////////////
function collectionToImage(collection){
  var first = ee.Image(collection.first());
  var theRest = collection.filter(ee.Filter.neq('system:index', first.id()));
  return theRest.iterate(function(image, previous) {
    return ee.Image(previous).addBands(image);
  }, first);
}
var sensorBandDictLandsatSR =ee.Dictionary({L8 : ee.List([1,2,3,4,5,6,7,10]),
                        L7 : ee.List([0,1,2,3,4,5,6,9]),
                        L5 : ee.List([0,1,2,3,4,5,6,9]),
                        L4 : ee.List([0,1,2,3,4,5,6,9])
  });
var bandNamesLandsatWOTOA = ee.List(['blue','green','red','nir','swir1','swir2','cfmask','pixel_qa']);
//////////////////////////////////  start processing /////////////////////////
print('Start and end dates for all images:',startDate,endDate);
//get landsat 7 & landsat 8 data for childsmeadow
var l5SRs = ee.ImageCollection('LANDSAT/LT5_SR')
  .filterBounds(sa)
  .filterMetadata('CLOUD_COVER', 'less_than', 80)
  .filterDate(startDate, endDate);
var l8sr = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
  .filterBounds(sa)
  .filterMetadata('CLOUD_COVER', 'less_than', 80)
  .filterDate(startDate, endDate)
  .select(sensorBandDictLandsatSR.get('L8'),bandNamesLandsatWOTOA)
var l7sr = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
  .filterBounds(sa)  
  .filterMetadata('CLOUD_COVER', 'less_than', 80)
  .filterDate(startDate, endDate)
  .select(sensorBandDictLandsatSR.get('L7'),bandNamesLandsatWOTOA)
print('check landsat 8', l8sr)
print('check landsat 7', l7sr)
//mask clouds
//var l5srcmasked = l5sr.map(cloudmasking);
var l7srcmasked = l7sr.map(clearMask);
var l8srcmasked = l8sr.map(clearMask) //.select('B2', 'B3', 'B4', 'B5','B6', 'B7')
/*
//rename LS7 bands to be consistent with LS8
var renameLS7=function(img){
  var newBdnms=img.select(['B1', 'B2', 'B3','B4','B5','B6']).rename(['B2', 'B3', 'B4','B5', 'B6', 'B7'])
  return newBdnms;
}
l7srcmasked=l7srcmasked.map(renameLS7);
*/
//merge LS8 and LS7 collections
var lscomp=ee.ImageCollection(l8srcmasked.merge(l7srcmasked));
//var lscomp2 = ee.ImageCollection(l5srcmasked.merge(l7srcmasked).merge(l8srcmasked))
print(' Adding timestamp to the Collection ');
lscomp = lscomp.map(addTime);
print(lscomp.limit(5))
print(' Adding indices NDVI, NDWI and NDMI to landsat Collection ');
var with_indices = lscomp.map(addIndices);
//var with_indices = lscomp.map(addNDVI)
//with_indices = with_indices.map(addNDMI)
//print(with_indices)
print(with_indices)
/*
//update band name to NDVI
var rename_bands=function(img){
  var a =img.select(['nd']).rename(['NDVI'])
  var b = img.select(['nd_1']).rename(['NDMI'])
  return img.addBands(a).addBands(b);
}
with_indices = with_indices.map(rename_bands)
//print('collection with NDVI ', with_ndvi)
print('Rename band names in the collection', with_indices)
*/
//Get the dates of First and Last images
var start_image = ee.Image(with_indices.sort('system:time_start',true).first());
var end_image = ee.Image(with_indices.sort('system:time_start',false).first());
var start_date = ee.Date(start_image.get('system:time_start'));
var end_date = ee.Date(end_image.get('system:time_start'));
print('Start Date  collection ', start_date); 
print('End Date  Collection ', end_date); 
//Reduce collection to annual median for each year
var annualizeTS = annualizeSeries(with_indices,2014,2019,1)
print('Annual median TimeSeries', annualizeTS)
//annualizeTS=annualizeTS.map(rename_ndvi);
var annualize_NDVI = annualizeTS.select('NDVI') 
print ('AnnualMedian NDVI', annualize_NDVI);
var annualize_NDMI = annualizeTS.select('NDMI') 
print ('AnnualMedian NDMI', annualize_NDMI);
var annualize_NDWI = annualizeTS.select('NDWI') 
print ('AnnualMedian NDMI', annualize_NDMI);
//check the temporal trend of annual median NDVI (or other indices)
var chartIndices = ui.Chart.image.series(annualize_NDVI, sa, ee.Reducer.median(), 1500)
  .setOptions({title: 'Temporal Trend of NDVI Landsat',
  vAxis: {title: 'Median Band Values'},
  //hAxis: {title: 'Year', format: '20'+'yy', gridlines: {count: 6}},
  legend:{title:'NDVI'} 
  });
print(chartIndices);
//Add yearBand of data in the time series
var annualMedianTSyear = annualize_NDVI.map(addYear);
print('AddyearTimeSeries',annualMedianTSyear)
//combine indices
var cmb_indices = annualizeTS.select('NDVI','NDMI')
var cmb_indicesYr = cmb_indices.map(addYear)
print('Select indices', cmb_indicesYr)
//check the temporal trend of annual median NDVI (or other indices)
var chartIndices = ui.Chart.image.series(cmb_indices, sa, ee.Reducer.median(), 1500)
  .setOptions({title: 'Landsat Temporal Trend of NDVI & NDMI',
  vAxis: {title: 'Median Band Values'},
 // hAxis: {title: 'Year', format: '20'+'yy', gridlines: {count: 6}},
  legend:{title:'NDVI,NDMI', } 
  });
//print(chartIndices);
//Chart 4 
//add biomass and groundwater information to the annual summary of NDVI
//var annual_all = annualize_NDVI.addBands(biomass).addBands(water)
var LOC = biomass.merge(water);
print("combine field samples",LOC)
// Create a funtion to clip each image to the feature collection
var clipFeature = function(image) {
  return image.clipToCollection(LOC);
};
// Map the clip funtion over the Image Collection 
var IndicesSampled_clip= annualize_NDVI.map(clipFeature);
print(IndicesSampled_clip, "Image collection with indices")
//Display results
//Map.addLayer(IndicesSampled_clip, {}, 'sampled locations biomass and gw')
//Map.addLayer(biomass, {color: 'green'}, 'biomass-sampled', true);
//Map.addLayer(water, {color: 'blue'}, 'groundwater-sampled', true);
//Define a chart with different series for each region, averaged by DOY for single year.
//var series3 = ui.Chart.image.series(
//IndicesSampled_clip, 'NDVI', LOC, ee.Reducer.mean(), 30, ee.Reducer.max(), 'label');
//print(series3);
var chart03 = ui.Chart.image.series({
  imageCollection: IndicesSampled_clip.select('NDVI'), 
  //imageCollection: medianND.select('nd_median'),
  region: LOC, 
  reducer: ee.Reducer.mean(), 
 scale: 30})
  .setOptions({
              title: 'Temporal trend of Landsat NDVI from locations sampled biomass and gw'});
  //print(chart3);
/////////////////////////////////////////////////////////////
//visualize results
/////////////////////////////////////////////////////////////
//var image = ee.Image(list.get(1)).clip(sa);
var annualTS = annualizeTS.map(addYear)
var start_image = ee.Image(annualTS.sort('system:time_start',true).first())
//var end_image = ee.Image(annualTS.sort('system:time_start',false).first())
var end_image = ee.Image(annualTS.filterMetadata('system:index','equals','5').first())
print(annualTS, "annual time series")
print(start_image, 'Start image')
print(end_image, "End Image")
var image = ee.ImageCollection(annualTS).median()//.select('NDVI')
//print(image)
Map.addLayer(start_image,{bands:['swir1','nir','red'],min: 335, max: 3645, gamma: 1.6}, 'Annual Median L8 2015', false);
Map.addLayer(end_image,{bands:['swir1','nir','red'],min: 335, max: 3645, gamma: 1.6}, 'Annual Median L8 2019', false);
var ndvi_series = ee.ImageCollection(annualize_NDVI, sa, ee.Reducer.median());
Map.addLayer(ndvi_series,vizParamsIndices,'Full Time Series of NDVI for Charting',false);
//Map.addLayer(water, {color: 'blue'}, 'Well', true);
//Map.addLayer(biomass, {color: 'green'}, 'biomass', true);
//Map.addLayer(mw15, {color: 'blue'}, 'Well', true);
//Map.addLayer(biomass2, {color: 'green'}, 'biomass', true);
//Map.addLayer(bm_15, {color: 'yellow'}, '2015', true);
//Map.addLayer(bm_16, {color: 'pink'}, '2016', true);
//Map.addLayer(bm_17, {color: 'brown'}, '2017', true);
//Map.addLayer(stack,gw_viz,' Interpolated groundwater', false)
/////////////////////////////////////////////////////////////
//drone imagery - 1/7/2020
/////////////////////////////////////////////////////////////
var CM_Image_2015 = ee.ImageCollection([CM_Lower_2015.toInt(), CM_Upper_2015.toInt()]).mosaic().clip(Childs_Boundaries).set('system:time_start','2015');
var CM_Image_2019 = ee.ImageCollection([CM_Lower_2019, CM_Upper_2019]).mosaic().clip(Childs_Boundaries).set('system:time_start','2019');
var Indices_2015 = CM_Image_2015.addBands(CM_Image_2015.normalizedDifference(['b4', 'b1']).rename('NDVI_2015')).addBands(CM_Image_2015.normalizedDifference(['b2', 'b4']).rename('NDWI_2015'));
var Indices_2019 = CM_Image_2019.addBands(CM_Image_2019.normalizedDifference(['b4', 'b1']).rename('NDVI_2019')).addBands(CM_Image_2019.normalizedDifference(['b2', 'b4']).rename('NDWI_2019'));
Map.addLayer(CM_Image_2015,{bands: ['b1','b2','b3'], min: 0.0, max: 255.0},'2015 Drone Image Childsmeadow', false)
Map.addLayer(CM_Image_2019,{bands: ['b1','b2','b3'], min: 0.0, max: 255.0},'2019 Drone Image Childsmeadow', false)
//Map.addLayer(mwell_15, {color: 'blue'}, 'Wells-2015', false);
//Map.addLayer(channel, {color: 'blue'}, 'Channel Classify', true);
//Map.addLayer(survey_channel, {color: 'blue'}, 'Channels surveyed', true);
///////////////////////////////////////////////////////////
//Feb 17.2020 - adding buffer to well location sampled
//////////////////////////////////////////////////////////
var buff10 = function(feature){
  return feature.buffer(1.5)
};
var well_buff =mwell_15.map(buff10)
Map.addLayer(well_buff, {color: 'blue'}, 'Buffer Wells-2015', false)
/////////////////// 15 m buffer /////////////////// 
var buff15 = function(feature){
  return feature.buffer(15)
};
var well_buff_15 =mwell_15.map(buff15)
Map.addLayer(well_buff_15, {color: 'blue'}, 'Buffer Wells-15m-2015', false)
/////////////////////////////////////////////////////////////
// Create a summary of NDVI and NDWI from the buffered wells - 15 m buffer
//////////////////////////////////////////////////////////////
var wells16_2015data = Indices_2015.reduceRegions({
  collection: well_buff,
  reducer: ee.Reducer.mean(),
  scale: 0.03 // A nominal scale in meters of the projection to work in.
});
var wells16_2019data = Indices_2019.reduceRegions({
  collection: well_buff,
  reducer: ee.Reducer.mean(),
  scale: 0.03 // A nominal scale in meters of the projection to work in.
});
// Join 2015 and 2019 indices to point feature collection 
var join_filter = ee.Filter.equals({leftField: 'WellID', rightField: 'WellID'});
var joinType = ee.Join.inner('primary', 'secondary');
var joined = joinType.apply(wells16_2015data, wells16_2019data, join_filter);
function cleanJoin(feature){
  return ee.Feature(feature.get('primary')).copyProperties(feature.get('secondary'));
}
var wells16_allData = joined.map(cleanJoin);
print(wells16_allData.limit(5))
var chart2 =
  ui.Chart.feature.byFeature(wells16_allData, 'WellID', ['NDVI_2015','NDVI_2019'])
    .setChartType('ColumnChart')
    .setSeriesNames(['NDVI_2015', 'NDVI_2019'])
    .setOptions({
      title: 'NDVI at Each Well in 2015 and 2019',
      hAxis: {title: 'Well_ID'},
      vAxis: {title: 'NDVI'},
      series: {0: {color: 'red'},
             1: {color: 'green'}}
    });
//print(chart2)
var chart3 =
  ui.Chart.feature.byFeature(wells16_allData, 'WellID', ['NDWI_2015','NDWI_2019'])
    .setChartType('ColumnChart')
    .setSeriesNames(['NDWI_2015', 'NDWI_2019'])
    .setOptions({
      title: 'NDWI at Each Well in 2015 and 2019',
      hAxis: {title: 'Well_ID'},
      vAxis: {title: 'NDWI'},
      series: {0: {color: 'red'},
             1: {color: 'green'}}
    });
//print(chart3)
//////////////////////////////////////////////////////////////////////////
//  Classification - 2015 
/////////////////////////////////////////////////////////////////////////
//TB 18.2.2020 - clipped the indice_2019 image only to the channel to reduce variability
// and run the classification
var imagestack = ee.ImageCollection(Indices_2015).mosaic().clip(channel)
// Make the training dataset.
var training2015 = imagestack.sample({
  region:channel, // ee.FeatureCollection('users/Shree1175/Study_Channel'),
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(10).train(training2015);
// Cluster the input using the trained clusterer.
var result = imagestack.cluster(clusterer);
// Filter classes that match 
var resultfiltered = result.eq(1).or(result.eq(0));
var resultfiltered2 = result.eq(9).or(result.eq(0));
var resultfiltered3 = result.eq(7).or(result.eq(0));
var final_classified = resultfiltered.add(resultfiltered2) 
var classified_2015 = final_classified.remap([0,1,2], [0,1,0]) // 0 non channel, 1 channel
// Display the clusters with random colors.
//Map.addLayer(result.randomVisualizer(), {}, 'clusters', false);
//Map.addLayer(final_classified, {palette: ['white', 'black']}, 'filtered channel_2015', false);
Map.addLayer(final_classified, viz_channel, 'Channel_2015', false);
//////////////////////////////////////////////////////////////////////////
//  Classification - 2019
/////////////////////////////////////////////////////////////////////////
var imagestack = ee.ImageCollection(Indices_2019).mosaic().clip(channel)
//Map.addLayer(imagestack)
///////////////////////////////////////////////////////////////////////////////
//from the survey channel choose only the deep channel location for training
////////////////////////////////////////////////////////////////////////////////
print('All survey points', survey_channel.limit(10))
var deep_channel = ee.FeatureCollection(survey_channel).select('Code', 'equals','T_W')
print('Only Deept channel', deep_channel.limit(10))
// Define a region in which to generate a sample of the input.
//var region = ee.Geometry.Rectangle(29.7, 30, 32.5, 31.7);
// Make the training dataset.
var training2019 = imagestack.sample({
  region: channel, //ee.FeatureCollection('users/Shree1175/Study_Channel'),
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training2019);
// Cluster the input using the trained clusterer.
var result = imagestack.cluster(clusterer);
// Filter classes that match addec class 6 to filterclass as well (TB 2.17.2020)
var resultfiltered = result.eq(1).or(result.eq(0));
var resultfiltered2 = result.eq(6).or(result.eq(0));
var final_classified2 = resultfiltered.add(resultfiltered2) //.clip(channel)
var classified_2019 = final_classified2.remap([0,1,2], [0,1,0]) // 0 non channel, 1 channel
// difference in classified images
var channels_difference = classified_2019.subtract(classified_2015)
var new_channels_mask = channels_difference.eq(1)
var new_channels = channels_difference.updateMask(new_channels_mask)
// Display the clusters with random colors.
//Map.addLayer(result.randomVisualizer(), {}, 'clusters', false);
Map.addLayer(final_classified2, viz_channel, 'Channel_2019', false);
//Map.addLayer(channel, {color: 'blue'}, 'Channel Classify', false);
//Map.addLayer(survey_channel, {color: 'blue'}, 'Channels surveyed', false);
Map.addLayer(new_channels, {palette: 'blue'}, 'New channels from 2015 to 2019')
var study_reaches = ee.Image().byte().paint({featureCollection:all_reach, color: 2, width: 3});
Map.addLayer(study_reaches, {color: 'red'}, 'Reaches', true);
/////////////////////////////////////////////////////////////
// Add charts summarizing the area of channel/nonchannel in 2015 and 2019 in each reach
//////////////////////////////////////////////////////////////
// mask channel and nonchannel areas and combine bands
var mask_channel_1 = classified_2015.eq(1)
var mask_nonchannel_0 = classified_2015.eq(0)
var channel_1 = classified_2015.updateMask(mask_channel_1)
var nonchannel_0 = classified_2015.updateMask(mask_nonchannel_0)
var bands = (channel_1.rename('channel')) //.addBands(nonchannel_0.rename('nonchannel'))
// calculate area of channel and area of nonchannel and add to study_reach feature collection
var getArea = function(feature) {
  var countDictionary = bands.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: feature.geometry(),
  scale: 1,
  maxPixels: 1e9});
  var channel_area = ee.Number(countDictionary.get('channel')).multiply(9).divide(10000) // sq m 
 //var nonchannel_area = ee.Number(countDictionary.get('nonchannel')).multiply(9).divide(10000) // sq m 
  var areaDictionary = ee.Dictionary({channelarea:channel_area}) //, nonchannelarea:nonchannel_area})
  var reachesWithArea = feature.set(areaDictionary)
  return reachesWithArea;
};
// Map the channel area  function over the features.
var area = all_reach.map(getArea);
var chart4 =
  ui.Chart.feature.byFeature(area, 'Treatment', ['channelarea']) //,'nonchannelarea'])
    .setChartType('ColumnChart')
    .setSeriesNames(['channels']) //, 'non-channels'])
    .setOptions({
      title: 'Channel Area by Study Site - 2015',
      hAxis: {title: 'Study Site'},
      vAxis: {title: 'Area (square meters)'},
      series: {0: {color: 'blue'},
             1: {color: 'brown'}}
    });
//print(chart4)
// mask channel and nonchannel areas and combine bands
var mask_channel_19 = classified_2019.eq(1)
var mask_nonchannel_19 = classified_2019.eq(0)
var channel_19 = classified_2019.updateMask(mask_channel_19)
var nonchannel_19 = classified_2019.updateMask(mask_nonchannel_19)
var bands19 = (channel_19.rename('channel')) //.addBands(nonchannel_19.rename('nonchannel'))
// calculate area of channel and area of nonchannel and add to study_reach feature collection
var getArea19 = function(feature) {
  var countDictionary = bands19.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: feature.geometry(),
  scale: 1,
  maxPixels: 1e9});
  var channel_area = ee.Number(countDictionary.get('channel')).multiply(9).divide(10000) // pixel size 3cm x 3cm 
  //var nonchannel_area = ee.Number(countDictionary.get('nonchannel')).multiply(9).divide(10000) // pixel size 3cm x 3cm 
  var areaDictionary = ee.Dictionary({channelarea:channel_area}) //, nonchannelarea:nonchannel_area})
  var reachesWithArea = feature.set(areaDictionary)
  return reachesWithArea;
};
// Map the channel area  function over the features.
var area19 = all_reach.map(getArea19);
var chart5 =
  ui.Chart.feature.byFeature(area19, 'Treatment', ['channelarea' ]) //,'nonchannelarea'])
    .setChartType('ColumnChart')
    .setSeriesNames(['channels']) //'non-channels'])
    .setOptions({
      title: 'Channel Area by Study Site - 2019',
      hAxis: {title: 'Study Site'},
      vAxis: {title: 'Area (square meters)'},
      series: {0: {color: 'blue'},
             1: {color: 'brown'}}
    });
/////////// TB 3.18.2020 Modifying ////////////////
// mask channel and nonchannel areas and combine bands
var mask_channel_19 = classified_2019.eq(1)
var mask_channel_15 = classified_2015.eq(1)
var channel_19 = classified_2019.updateMask(mask_channel_19)
var channel_15 = classified_2015.updateMask(mask_channel_15)
var bands = (channel_19.rename('2019')).addBands(channel_15.rename('2015'))
print("Check Channels 2019 - 2015", bands)
Export.image(bands, "channels",
      {'maxPixels':1.0E13,
        'region':sa,
        'crs':  'EPSG:' + 4326,
        'scale': 0.03
      });
// calculate area of channel and area of nonchannel and add to study_reach feature collection
var getArea = function(feature) {
  var countDictionary = bands.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: feature.geometry(),
  scale: 1,
  maxPixels: 1e9});
  var channel_area19 = ee.Number(countDictionary.get('2019')).multiply(9).divide(10000) // pixel size 3cm x 3cm 
  var channel_area15 = ee.Number(countDictionary.get('2015')).multiply(9).divide(10000) // pixel size 3cm x 3cm 
  var areaDictionary = ee.Dictionary({Channel2019:channel_area19, Channel2015:channel_area15})
  var reachesWithArea = feature.set(areaDictionary)
  return reachesWithArea;
};
// Map the channel area  function over the features.
var area_channel = all_reach.map(getArea);
var chart6 =
  ui.Chart.feature.byFeature(area_channel, 'Treatment', ['Channel2015','Channel2019'])
    .setChartType('ColumnChart')
    .setSeriesNames(['2015','2019'])
    .setOptions({
      title: 'Channel Area by Treatment (2015 vs 2019)',
      hAxis: {title: 'Study Site'},
      vAxis: {title: 'Area (square meters)'},
      series: {0: {color: 'lightblue'},
             1: {color: 'blue'}}
    });
///////////////// Compare mean NDVI and NDMI by Reaches Landsat /////////////////////////
var allIndices = Indices_2015.addBands(Indices_2019)
var reaches_indices = allIndices.reduceRegions({
  collection: all_reach,
  reducer: ee.Reducer.mean(),
  scale: 0.03 // A nominal scale in meters of the projection to work in.
});
print('reaches', reaches_indices)
var chart7 =
  ui.Chart.feature.byFeature(reaches_indices, 'Treatment', ['NDVI_2015','NDVI_2019'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'NDVI by Treatment (2015 vs 2019)',
      hAxis: {title: 'Study Site'},
      vAxis: {title: 'NDVI'},
      series: {0: {color: 'lightgreen'},
             1: {color: 'green'}}
    });
print(chart7)
var chart8 =
  ui.Chart.feature.byFeature(reaches_indices, 'Treatment', ['NDWI_2015','NDWI_2019'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'NDWI by Treatment (2015 vs 2019)',
      hAxis: {title: 'Study Site'},
      vAxis: {title: 'NDWI'},
      series: {0: {color: 'd2b2e5'},
             1: {color: 'purple'}}
    });
print(chart8)
/*
var image = ee.ImageCollection(annualTS).median() //filterBounds(all_reach)
var buff30 = function(feature){
  return feature.buffer(15)
};
var well_buff =mwell_15.map(buff30)
well_buff = well_buff.filterBounds(all_reach)
Map.addLayer(well_buff, {color: 'blue'}, 'Buffer Wells LSAT', false)
var chart7 = ui.Chart.image.series({
  imageCollection: image.select('NDVI','NDMI'), 
  //imageCollection: medianND.select('nd_median'),
  region: well_buff, 
  reducer: ee.Reducer.mean(), 
 scale: 30})
  .setOptions({
              title: 'Temporal trend of NDVI and NDMI nearby well locations'});
print(chart7);*/
/////////////////////////////////////////////////////////////
// Create a summary of NDVI and NDWI from the buffered wells - 15 m buffer
//////////////////////////////////////////////////////////////
var wells_indices_buff15 = allIndices.reduceRegions({
  collection: well_buff_15,
  reducer: ee.Reducer.mean(),
  scale: 0.03 // A nominal scale in meters of the projection to work in.
});
var chart9 =
  ui.Chart.feature.byFeature(wells_indices_buff15, 'WellID', ['NDVI_2015','NDVI_2019'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'NDVI Surrounding Each Well (15 m buffer) - 2015 and 2019',
      hAxis: {title: 'Well_ID'},
      vAxis: {title: 'NDVI'},
      series: {0: {color: 'lightgreen'},
             1: {color: 'green'}}
    });
print(chart9)
//////////////////////////////////////////////////////////////////////////
/////////////////// Add UI Panel to Share Information ///////////////////
/////////////////////////////////////////////////////////////////////////
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel for widgets
var panel = ui.Panel();
panel.style().set('width', '450px');
// Product Title 
var EndProduct = ui.Label({
  value: 'Monitoring Restoration at Childsmeadow',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '1'
    }
});
Map.add(EndProduct)
// upload The Nature Conservancy logo
var logo = ee.Image('users/charlotteks/TNC_Logo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1329x384', 
        format: 'png'
        },
    style: {height: '48px', width: '166px',padding :'0'}
    });
var Logo = ui.Panel(thumb, 'flow', {width: '300px'});
var intro = ui.Panel([
  ui.Label({
    value: 'Comparing temporal trends of NDVI and NDMI post restoration (2015 - 2019)',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Temporal trends of NDVI and NDMI from Landsat and Drone Imagery within Childsmeadow, The Nature Conservancy California')
]);
//({
var chart10 = ui.Chart.feature.byFeature(wells_indices_buff15, 'WellID', ['NDWI_2015','NDWI_2019'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'NDWI Surrounding Each Well (15 m buffer) - 2015 and 2019',
      hAxis: {title: 'Well_ID'},
      vAxis: {title: 'NDWI'},
      series: {0: {color: 'd2b2e5'},
             1: {color: 'purple'}}
    });
//print(chart10)
// Product Title 
var Description = ui.Label({
  value: 'Trends from Drone Imagery',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '1'
    }
});
////////////////////////
//Map.add(panel);
panel.add(intro);
panel.add(Logo);
panel.add(chart03)
panel.add(Description)
panel.add(chart2);
panel.add(chart3);
//panel.add(chart3)
//panel.add(chart4)
//panel.add(chart5)
panel.add(chart6);
//panel.add(chart7)
//panel.add(chart8)
// Add the panel to the ui.root.
ui.root.insert(0, panel);