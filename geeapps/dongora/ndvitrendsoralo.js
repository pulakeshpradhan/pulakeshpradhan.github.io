var VegIndx = ui.import && ui.import("VegIndx", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    NPP = ui.import && ui.import("NPP", "imageCollection", {
      "id": "FAO/WAPOR/2/L1_NPP_D"
    }) || ee.ImageCollection("FAO/WAPOR/2/L1_NPP_D"),
    RET = ui.import && ui.import("RET", "imageCollection", {
      "id": "FAO/WAPOR/2/L1_RET_D"
    }) || ee.ImageCollection("FAO/WAPOR/2/L1_RET_D"),
    L7 = ui.import && ui.import("L7", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_RT"),
    soralo_area = ui.import && ui.import("soralo_area", "table", {
      "id": "users/esmeelmulder/soralo_area"
    }) || ee.FeatureCollection("users/esmeelmulder/soralo_area"),
    SensSlope_significant_NDVI = ui.import && ui.import("SensSlope_significant_NDVI", "image", {
      "id": "users/esmeelmulder/SensSlope_significant_NDVI_19_7_21"
    }) || ee.Image("users/esmeelmulder/SensSlope_significant_NDVI_19_7_21"),
    SensSlope_NDVI = ui.import && ui.import("SensSlope_NDVI", "image", {
      "id": "users/esmeelmulder/SensSlope_NDVI_19_7_21"
    }) || ee.Image("users/esmeelmulder/SensSlope_NDVI_19_7_21"),
    SensSlope_NDVI_P = ui.import && ui.import("SensSlope_NDVI_P", "image", {
      "id": "users/esmeelmulder/SensSlope_NDVI_P_19_7_21"
    }) || ee.Image("users/esmeelmulder/SensSlope_NDVI_P_19_7_21"),
    SensSlope_significant_NDVI_P = ui.import && ui.import("SensSlope_significant_NDVI_P", "image", {
      "id": "users/esmeelmulder/SensSlope_significant_NDVI_P_19_7_21"
    }) || ee.Image("users/esmeelmulder/SensSlope_significant_NDVI_P_19_7_21"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.138725394376465,
            -1.6182435908099908
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([36.138725394376465, -1.6182435908099908]);
//********************************************
//*** INTERACTIVE REGION REDUCTION APP *******
//********************************************
//polygon selection menue from: https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// 1. *********NDVI********** 
// 1.1. Prepare the data 
// Select only the ndvi data band.
var modNDVI = VegIndx.map(
  function(img) {
    var rescaled_NDVI = img.select('NDVI').multiply(0.0001)
                           .rename('NDVI_rescaled');
    return img.addBands(rescaled_NDVI).copyProperties(img, ['system:time_start']);
  }
);
var modNDVI_rescale = modNDVI.select('NDVI_rescaled');
//print("modNDVIday", modNDVIday)
//Add NDVI layer to background
var NDVI_date_high = modNDVI
                  .filter(ee.Filter.date('2020-01-01', '2020-01-31'));//highest NDVI peak to assess bare soil areas
var ndvi_high = NDVI_date_high.select('NDVI_rescaled');
var ndviVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(ndvi_high, ndviVis, 'NDVI 2020 peak', false);
var NDVI_date_low = modNDVI
                  .filter(ee.Filter.date('2017-09-01', '2017-12-31'));//low NDVI peak to assess bare soil areas
var ndvi_low = NDVI_date_low.select('NDVI_rescaled');
Map.addLayer(ndvi_low, ndviVis, 'NDVI 2017 low', false);
//*******************
// Compute length of season (consecutive days above NDVI = 0.2)
// modified from: https://stackoverflow.com/questions/52972466/google-earth-engine-counts-days-of-the-longest-dry-period-in-a-time-period
//********************
// Define time range
var startyear = 2000;
var endyear = 2020;
var startmonth = 1;
var endmonth = 12;
// Set date in ee date format
var startdate = ee.Date.fromYMD(startyear,startmonth,1);
var enddate = ee.Date.fromYMD(endyear,endmonth,31);
// Filter data
var datain_t = modNDVI.filterDate(startdate, enddate)
  .filter(ee.Filter.calendarRange(startmonth,endmonth, 'month'))
  .select('NDVI').map(function(img){
    return img.addBands(ee.Image.constant(0).uint8().rename('counter').reproject('SR-ORG:6974'));
  })
  .sort('system:time_start');
// // START 
var dataset_NDVI = datain_t
.filterDate("2019-01-01","2019-12-31")
.sort('system:time_start:');
//print("dataset_NDVI", dataset_NDVI);
//print("dataset_NDVI projection NDVI", dataset_NDVI.select('NDVI').first().projection());
//print("dataset_NDVI projection counter", dataset_NDVI.select('counter').first().projection());
var NDVIThresh = 2000.0; 
function NDVIseason(img, list){
  // get previous image
  var prev = ee.Image(ee.List(list).get(-1));
  // find areas gt NDVI threshold (gt==0.2)
  var green = img.select('NDVI').gt(NDVIThresh);
  // add previous day counter to today's counter
  var accum = prev.select('counter').add(green).rename('counter');
  // create a result image for iteration
  // NDVI > thresh will equall the accumulation of counters
  // otherwise it will equal zero
  var out = img.select('NDVI').addBands(
        img.select('counter').where(green.eq(1),accum)
      ).uint8();
  return ee.List(list).add(out);
}
// create first image for iteration
var first = ee.List([ee.Image(dataset_NDVI.first())]);
// apply green iteration function
var NDVIseason_max = ee.ImageCollection.fromImages(
    dataset_NDVI.iterate(NDVIseason,first)
).max(); // get the max value
//print('NDVIseason_max', NDVIseason_max);
var NDVIseason_all = ee.ImageCollection.fromImages(
    dataset_NDVI.iterate(NDVIseason,first)
);
//print('NDVIseason_all',NDVIseason_all);
var NDVI_map = NDVIseason_max.select('counter');
//print("counter", NDVIseason_max.select('counter');
//print("NDVI rescale", NDVIseason_max.select('NDVI_rescaled').max());
var counterVis = {
  min: 0,
  max: 25,
  bands: ['counter'],
  palette: 'edf8e9, 005a32'
};
// display results
Map.addLayer(NDVIseason_max,counterVis,'Max NDVI Season', false);
//print('proj map', NDVIseason_max.select('counter').projection());
//print('proj dataset', NDVIseason_all.select('counter'.projection()));
//2. ****** RGB image *****
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var RGB_high = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-01-01', '2020-01-31')//highest NDVI peak to assess bare soil areas
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(RGB_high.median(), rgbVis, 'S2 RGB 2020 peak', false);
var RGB_low = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2017-09-01', '2017-12-31')//highest NDVI peak to assess bare soil areas
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
Map.addLayer(RGB_low.median(), rgbVis, 'S2 RGB 2017 low', false);
//******** NPP ***************
// prepare dataset
var NPP_Wap = NPP.select('L1_NPP_D');
var NPP_Wap = NPP_Wap.map(
  function(img) {
    var rescaled_NPP = img.multiply(0.001)
                           .rename('NPP_rescaled');
    return img.addBands(rescaled_NPP).copyProperties(img, ['system:time_start']);
  }
);
var NPP_Wap = NPP_Wap.map(
  function(img) {
    var rescaled_NPP = img.select('L1_NPP_D').multiply(0.01)
                           .rename('NPP_dekadal');
    return img.addBands(rescaled_NPP).copyProperties(img, ['system:time_start']);
  }
);
var NPP_Wapor = NPP_Wap.select('NPP_rescaled');
var NPP_Wapor_dk = NPP_Wap.select('NPP_dekadal');
//print("NPP_Wapor" , NPP_Wapor);
//Compute the seasonal sums for each year for the first and the second season
// short rains: 21 Sept till 11 Feb
var startYear = 2009;
var endYear = 2020;
var startMonthS = 9;
var startDayS = 21;
var endMonthS = 2;
var endDayS = 10;
// Create a list of years by generating a sequence from start and end years 
var years = ee.List.sequence(startYear, endYear);
// Generate annual summed image mosaics 
var annualNPP_shortRains = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthS, startDayS);
    var endDate = ee.Date.fromYMD(ee.Number(year).add(1), endMonthS, endDayS);
    var annual = NPP_Wapor_dk
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
// long rains: 11 Feb till 21 Sep
var startMonthL = 2;
var startDayL = 11;
var endMonthL = 9;
var endDayL = 20;
// Generate annual summed image mosaics 
var annualNPP_longRains = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthL, startDayL);
    var endDate = ee.Date.fromYMD(ee.Number(year), endMonthL, endDayL);
    var annual = NPP_Wapor_dk
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
// annual season rains: 21 Sept till 20 Sept
var startMonthY = 9;
var startDayY = 21;
var endMonthY = 9;
var endDayY = 20;
// Generate annual summed image mosaics 
var annualNPP_year = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthY, startDayY);
    var endDate = ee.Date.fromYMD(ee.Number(year).add(1), endMonthY, endDayY);
    var annual = NPP_Wapor_dk
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
// NDVI
var startYear = 2000;
var endYear = 2019;
// Create a list of years by generating a sequence from start and end years 
var years = ee.List.sequence(startYear, endYear);
var annualNDVI_year = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthY, startDayY);
    var endDate = ee.Date.fromYMD(ee.Number(year).add(1), endMonthY, endDayY);
    var annual = modNDVI_rescale
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD((ee.Number(year).add(1)), 9, 21).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 9, 21).millis());//.format("YYYY_MM_dd"));
}));
//print('years list', years);
//print('NPP_Wapor_dk', NPP_Wapor_dk);
//print('annualNPP_shortRains', annualNPP_shortRains);
//******** NPP normalized ***************
// prepare dataset
var RET_Wap = RET.select('L1_RET_D');
var RET_Wap = RET_Wap.map(
  function(img) {
    var rescaled_RET = img.multiply(1)//actually by 0.1 but then by 10 for dekadal
                           .rename('RET_dek');
    return img.addBands(rescaled_RET).copyProperties(img, ['system:time_start']);
  }
);
var RET_Wap_dk = RET_Wap.select('RET_dek');
// applying joins:
//set filter:
var filter = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
// specify join:
var InnerJoin = ee.Join.inner();
//merge bands:
var MergeBands = function(aRow) {
  var anImage = ee.Image.cat(aRow.get('primary'), aRow.get('secondary'));
  return anImage;
};
var Joined_NPP_RET = InnerJoin.apply(NPP_Wap.select('NPP_dekadal'), RET_Wap.select('RET_dek'),  filter);
//print("InnerJoined NPP_RET", Joined_NPP_RET);
var Merged_NPP_RET = ee.ImageCollection(Joined_NPP_RET.map(MergeBands));
//print("Merged_AETI_RET_D", Merged_AETI_RET_D);
var NPP_RET_norm = ee.ImageCollection(Merged_NPP_RET.map(
  function(img) {
    var NPP_RET_dek = img.select('NPP_dekadal').divide(img.select('RET_dek'))
                           .rename('NPP_norm');
    return NPP_RET_dek.copyProperties(img, ['system:time_start']);
  }
));
//print("NPP_RET_norm", NPP_RET_norm);
//Compute the seasonal sums for each year for the first and the second season
// short rains: 21 Sept till 11 Feb
var startYear = 2009;
var endYear = 2020;
var startMonthS = 9;
var startDayS = 21;
var endMonthS = 2;
var endDayS = 10;
// Create a list of years by generating a sequence from start and end years 
var years = ee.List.sequence(startYear, endYear);
// Generate annual summed image mosaics 
var annualNPP_shortRains_norm = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthS, startDayS);
    var endDate = ee.Date.fromYMD(ee.Number(year).add(1), endMonthS, endDayS);
    var annual = NPP_RET_norm
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
// long rains: 11 Feb till 21 Sep
var startMonthL = 2;
var startDayL = 11;
var endMonthL = 9;
var endDayL = 20;
// Generate annual summed image mosaics 
var annualNPP_longRains_norm = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthL, startDayL);
    var endDate = ee.Date.fromYMD(ee.Number(year), endMonthL, endDayL);
    var annual = NPP_RET_norm
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
// annual season rains: 21 Sept till 20 Sept
var startMonthY = 9;
var startDayY = 21;
var endMonthY = 9;
var endDayY = 20;
// Generate annual summed image mosaics 
var annualNPP_year_norm = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var startDate = ee.Date.fromYMD(year, startMonthY, startDayY);
    var endDate = ee.Date.fromYMD(ee.Number(year).add(1), endMonthY, endDayY);
    var annual = NPP_RET_norm
      .filterDate(startDate, endDate)
      .sum();
    return annual
      .set('year', ee.Date.fromYMD(year, 1, 1).format("YYYY"))
      .set('system:time_start', ee.Date.fromYMD(year, 1, 1).format("YYYY_MM_dd"));
}));
//print('NPP_normalized', NPP_RET_norm);
//print('annualNPP_shortRains_norm', annualNPP_shortRains_norm);
//***** Create polygon selection interface *******
//Define Drawing Tools
var drawingTools = Map.drawingTools();
//Remove drawing tools
drawingTools.setShown(false);
//Setup loop to clear all existing geometries (reset)
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
// Initialize a dummy GeometryLayer with null geometry to act as a placeholder for drawn geometries
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
//Define the geometry clearing function
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//define function that will be called when each respective drawing button is clicked
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//Define a panel to hold the time series chart (set the 'shown' stype parameter to 'false' to initially hide the panel unit until the first chart is rendered)
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
//Add the panel to the Map
Map.add(chartPanel);
//Define a function that gets called on geometry drawing completion and editing events to generate an NDVI time series chart
//this is done in the next several steps
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart_NDVI = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: modNDVI,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI_rescaled',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    title: 'NDVI 16-day MODIS timeseries',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI [-]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NDVI_season = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: NDVIseason_all,
                    regions: aoi,
                    reducer: ee.Reducer.max(),
                    band: 'counter',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    title: 'Threshold exceedance',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Frequency [-]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NDVI_raw = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: modNDVI,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    title: 'NDVI',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI [x 10,000]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_sr = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_shortRains,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'year'
                  })
                  .setOptions({
                    title: 'NPP Short Rains - 21 Sept till 11 Feb',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/season]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_lr = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_longRains,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'year'
                  })
                  .setOptions({
                    title: 'NPP Long Rains - 11 Feb till 21 Sep',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/season]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_yr = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_year,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    title: 'NPP Annual - 21 Sept till 20 Sept',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/season]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NDVI_yr = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNDVI_year,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    title: 'NDVI Annual sum - 21 Sept till 20 Sept',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI [total/year]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_sr_norm = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_shortRains_norm,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'year'
                  })
                  .setOptions({
                    title: 'NPP Short Rains Normalized - 21 Sept till 11 Feb',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/mm/season]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_lr_norm = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_longRains_norm,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'year'
                  })
                  .setOptions({
                    title: 'NPP normalized Long Rains - 11 Feb till 21 Sep',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/mm/season]'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart_NPP_yr_norm = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: annualNPP_year_norm,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'year'
                  })
                  .setOptions({
                    title: 'NPP normalized Annual - 21 Sept till 20 Sept',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NPP [g/m2/mm/season]'},
                    series: {0: {color: '23cba7'}}
                  }); 
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart_NDVI]);
  //chartPanel.widgets().reset([chart_NPP_sr]);
  //chartPanel.widgets().reset([chart_NPP_lr]);
  //chartPanel.widgets().reset([chart_NPP_yr]);
  //chartPanel.widgets().reset([chart_NDVI_yr]);
  //chartPanel.widgets().reset([chart_NPP_sr_norm]);
  //chartPanel.widgets().reset([chart_NPP_lr_norm]);
  //chartPanel.widgets().reset([chart_NPP_yr_norm]);
  //chartPanel.widgets().reset([chart_NDVI_season]);
  //chartPanel.widgets().reset([chart_NDVI_raw]);
}
//Set the drawing tools widget to listen for geometry drawing and editing events and respond with the chartNdviTimeSeries function
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
//This section defines the drawing control panel, which contains instructions and drawing tool buttons
// Difine symbols
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
//Define ui.Panel to hold app instructions and drawing buttons
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
//Add the panel to the Map
Map.add(controlPanel);
//change the basemap
Map.setOptions("HYBRID");
//add sen slope maps
var SenVis = {
  min: -0.2,
  max: 0.2,
  palette: '#FF0000, #00FF00'
};
var SenVis_NDVI = {
  min: -0.002,
  max: 0.002,
  palette: '#FF0000, #00FF00'
};
Map.addLayer(SensSlope_NDVI,SenVis_NDVI,"SensSlope_NDVI", false);
Map.addLayer(SensSlope_significant_NDVI,SenVis_NDVI,"SensSlope_significant_NDVI", false);
Map.addLayer(SensSlope_NDVI_P,SenVis,"SensSlope_NDVI_P", false);
Map.addLayer(SensSlope_significant_NDVI_P,SenVis,"SensSlope_significant_NDVI_P", false);
Export.image.toDrive(SensSlope_significant_NDVI)
// ****************************
// 0. Study Site visualization
// ****************************
var SA = ee.FeatureCollection(soralo_area);
Map.centerObject(SA,8);
//Map.addLayer(SA, {color: 'red'}, 'Soralo Area');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: SA,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Soralo Area');