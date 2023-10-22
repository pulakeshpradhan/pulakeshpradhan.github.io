var jabar1 = ui.import && ui.import("jabar1", "table", {
      "id": "users/ramiqcom/westJava/ADM1_West_Java"
    }) || ee.FeatureCollection("users/ramiqcom/westJava/ADM1_West_Java"),
    jabar2 = ui.import && ui.import("jabar2", "table", {
      "id": "users/ramiqcom/westJava/ADM2_West_Java"
    }) || ee.FeatureCollection("users/ramiqcom/westJava/ADM2_West_Java"),
    jabar3 = ui.import && ui.import("jabar3", "table", {
      "id": "users/ramiqcom/westJava/ADM3_West_Java"
    }) || ee.FeatureCollection("users/ramiqcom/westJava/ADM3_West_Java"),
    jabar4 = ui.import && ui.import("jabar4", "table", {
      "id": "users/ramiqcom/westJava/ADM4_West_Java"
    }) || ee.FeatureCollection("users/ramiqcom/westJava/ADM4_West_Java"),
    ghsl = ui.import && ui.import("ghsl", "imageCollection", {
      "id": "users/ramiqcom/westJava/GHSL_West_Java"
    }) || ee.ImageCollection("users/ramiqcom/westJava/GHSL_West_Java"),
    dem = ui.import && ui.import("dem", "image", {
      "id": "users/ramiqcom/westJava/DEM_ALOS30M_West_Java"
    }) || ee.Image("users/ramiqcom/westJava/DEM_ALOS30M_West_Java"),
    jrc = ui.import && ui.import("jrc", "imageCollection", {
      "id": "JRC/GSW1_3/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/YearlyHistory"),
    dynamic = ui.import && ui.import("dynamic", "imageCollection", {
      "id": "GOOGLE/DYNAMICWORLD/V1"
    }) || ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1"),
    worldPop = ui.import && ui.import("worldPop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop_age_sex"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop_age_sex"),
    school_kernel = ui.import && ui.import("school_kernel", "image", {
      "id": "users/ramiqcom/westJava/school_kernel"
    }) || ee.Image("users/ramiqcom/westJava/school_kernel"),
    road_kernel = ui.import && ui.import("road_kernel", "image", {
      "id": "users/ramiqcom/westJava/road_kernel"
    }) || ee.Image("users/ramiqcom/westJava/road_kernel"),
    hospital_kernel = ui.import && ui.import("hospital_kernel", "image", {
      "id": "users/ramiqcom/westJava/hospital_kernell"
    }) || ee.Image("users/ramiqcom/westJava/hospital_kernell"),
    precipitation = ui.import && ui.import("precipitation", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    forest = ui.import && ui.import("forest", "imageCollection", {
      "id": "JAXA/ALOS/PALSAR/YEARLY/FNF"
    }) || ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF");
// Function to start map
function resetMap(){
  Map.clear();
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true
  });
  Map.centerObject(jabar1, 9);
}
resetMap();
// Panel for main menu app
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '350px', stretch: 'horizontal', padding: '10px'},
});
ui.root.add(mainPanel);
// Title for app
var title = ui.Label({
  value: 'Flood Risk in West Java',
  style: {fontWeight: 'bold', color: 'blue', fontSize: '25px', padding: '20px 5px'}
});
mainPanel.add(title);
// Index choice
var indexSelect = ui.Select({
  value: 'Risk',
  items: ['Risk', 'Hazard', 'Exposure', 'Vulnerability'],
  style: {stretch: 'horizontal'},
  onChange: function(value){
    var analysisStatus = analysisSelect.getValue();
    if (value == 'Risk' || value == 'Hazard') {
      analysisSelect.setDisabled(false);
    } else if (value == 'Exposure' || value == 'Vulnerability') {
      analysisSelect.setDisabled(true).setValue(null);
      showMap();
    }
    if (analysisStatus !== null) {
      showMap();
    }
  }
});
mainPanel.add(indexSelect);
// Analysis choice
var analysisSelect = ui.Select({
  items: ['Coastal', 'Surface', 'Combination'],
  placeholder: 'Select flood risk analysis',
  style: {stretch: 'horizontal'},
  onChange: function(){
    showMap();
  }
});
mainPanel.add(analysisSelect);
// Visual choice
var visualSelect = ui.Select({
  items: ['Dasymetric', 'Regency', 'District', 'Village'],
  value: 'Dasymetric',
  style: {stretch: 'horizontal'},
  onChange: function(){
    var analysisStatus = analysisSelect.getValue();
    var indexStatus = indexSelect.getValue();
    if (analysisStatus !== null || indexStatus == 'Exposure' || indexStatus == 'Vulnerability') {
      showMap();
    }
  }
});
mainPanel.add(visualSelect);
// Border choice
var borderSelect = ui.Select({
  items: ['None', 'Regency', 'District', 'Village'],
  value: 'Regency',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    var border = Map.layers().get(1);
    if (border === undefined) {
      admin();
    } else if (border !== undefined && value !== 'None') {
      Map.remove(border);
      admin();
    } else if (border !== undefined && value == 'None') {
      Map.remove(border);
    } 
  }
});
mainPanel.add(borderSelect);
// Population growth multiplier
var populationGrowthLabel = ui.Label({
  value: 'Population growth multiplier'
});
mainPanel.add(populationGrowthLabel);
// Population growth scenario slider
var populationSlider = ui.Slider({
  value: 1,
  step: 0.01,
  min: -2,
  max: 2,
  style: {stretch: 'horizontal'},
  onChange: function(){
    var analysisStatus = analysisSelect.getValue();
    var indexStatus = indexSelect.getValue();
    if (analysisStatus !== null || indexStatus == 'Exposure' || indexStatus == 'Vulnerability') {
      showMap();
    }
  }
});
mainPanel.add(populationSlider);
// Sea rise label
var seaRiseLabel = ui.Label({
  value: 'Sea rise mm/year'
});
mainPanel.add(seaRiseLabel);
// Sea rise slider
var seaRiseSlider = ui.Slider({
  value: 3,
  step: 0.1,
  min: 0,
  max: 100,
  style: {stretch: 'horizontal'},
  onChange: function(){
    var analysisStatus = analysisSelect.getValue();
    var indexStatus = indexSelect.getValue();
    if (analysisStatus !== null || indexStatus == 'Exposure' || indexStatus == 'Vulnerability') {
      showMap();
    }
  }
});
mainPanel.add(seaRiseSlider);
// Year label
var yearLabel = ui.Label({
  value: 'Year',
});
mainPanel.add(yearLabel);
// Year scenario slider
var yearSlider = ui.Slider({
  value: 2050,
  step: 1,
  min: 2020,
  max: 2100,
  style: {stretch: 'horizontal'},
  onChange: function(){
    var analysisStatus = analysisSelect.getValue();
    var indexStatus = indexSelect.getValue();
    if (analysisStatus !== null || indexStatus == 'Exposure' || indexStatus == 'Vulnerability') {
      showMap();
    }
  }
});
mainPanel.add(yearSlider);
// Function to make seasonal water trend
function waterTrend(){
  var water = jrc.map(function(img){
    var clippped = img.clip(jabar1);
    var seasonal = ee.Image(0).where(clippped.eq(2), 1);
    return seasonal.copyProperties(img, ['system:time_start']);
    });
  var trend = water.formaTrend().select('long-trend');
  return trend.rename('Flood Trend');
}
// Function to get the lates seasonal water
function water2020(){
  var water = jrc.sort('year', false).first();
  var clipped = water.clip(jabar1);
  return clipped.rename('Flood 2020');
}
// Function to get pop trend
function popTrend(){
  var pop =  ghsl;
  // Create a time band for each image
  var addTimeBand = pop.map(function(obj){
    var timeBand = ee.Image(obj.metadata('system:time_start'));
    return obj.addBands(timeBand);
  });
  // Create a model
  var model = addTimeBand.select(['system:time_start', 'population_count']).reduce(ee.Reducer.linearFit());
  var scaleModel = model.select('scale');
  var offsetMode = model.select('offset');
  return model;
}
// Function to get urban cover
function urban(){
  var coverJabar = dynamic.filterBounds(jabar1);
  var cover = coverJabar.select('label');
  var urbanCover = cover.map(function(img){
    return ee.Image(0).where(img.eq(6), 1).copyProperties(img, ['system:time_start']);
  });
  var u2015 = urbanCover.filterDate('2015-01-01', '2015-12-31').max().set({'system:time_start': 1439701701000});
  var u2016 = urbanCover.filterDate('2016-01-01', '2016-12-31').max().set({'system:time_start': 1471324101000});
  var u2017 = urbanCover.filterDate('2017-01-01', '2017-12-31').max().set({'system:time_start': 1502860101000});
  var u2018 = urbanCover.filterDate('2018-01-01', '2018-12-31').max().set({'system:time_start': 1534396101000});
  var u2019 = urbanCover.filterDate('2019-01-01', '2019-12-31').max().set({'system:time_start': 1565932101000});
  var u2020 = urbanCover.filterDate('2020-01-01', '2020-12-31').max().set({'system:time_start': 1597554501000});
  var u2021 = urbanCover.filterDate('2021-01-01', '2021-12-31').max().set({'system:time_start': 1629090501000});
  var u2022 = urbanCover.filterDate('2022-01-01', '2022-12-31').max().set({'system:time_start': 1660626501000});
  var jabarMosaicCol = ee.ImageCollection([u2015, u2016, u2017, u2018, u2019, u2020, u2021, u2022]);
  return jabarMosaicCol;
}
// Function to get urban trend
function urbanTrend(){
  var urbanCol = urban();
  var trend = urbanCol.formaTrend().select('long-trend');
  return trend.rename('Urban Trend');
}
// Function to get urban cover newest 2022
function urban2022(){
  var urbanCol = urban();
  var u2022 = urban().sort('system:time_start', false).first();
  return u2022.rename('Urban 2022');
}
// Function to get crop cover
function crops(){
  var coverJabar = dynamic.filterBounds(jabar1);
  var cover = coverJabar.select('label');
  var cropsCover = cover.map(function(img){
    return ee.Image(0).where(img.eq(4), 1).copyProperties(img, ['system:time_start']);
  });
  var c2015 = cropsCover.filterDate('2015-01-01', '2015-12-31').max().set({'system:time_start': 1439701701000});
  var c2016 = cropsCover.filterDate('2016-01-01', '2016-12-31').max().set({'system:time_start': 1471324101000});
  var c2017 = cropsCover.filterDate('2017-01-01', '2017-12-31').max().set({'system:time_start': 1502860101000});
  var c2018 = cropsCover.filterDate('2018-01-01', '2018-12-31').max().set({'system:time_start': 1534396101000});
  var c2019 = cropsCover.filterDate('2019-01-01', '2019-12-31').max().set({'system:time_start': 1565932101000});
  var c2020 = cropsCover.filterDate('2020-01-01', '2020-12-31').max().set({'system:time_start': 1597554501000});
  var c2021 = cropsCover.filterDate('2021-01-01', '2021-12-31').max().set({'system:time_start': 1629090501000});
  var c2022 = cropsCover.filterDate('2022-01-01', '2022-12-31').max().set({'system:time_start': 1660626501000});
  var jabarMosaicCol = ee.ImageCollection([c2015, c2016, c2017, c2018, c2019, c2020, c2021, c2022]);
  return jabarMosaicCol;
}
// Function to get crops trend
function cropsTrend(){
  var cropsCol = crops();
  var trend = cropsCol.formaTrend().select('long-trend');
  return trend.rename('Crops Trend');
}
// Function to get urban cover newest 2022
function crops2022(){
  var cropsCol = crops();
  var c2022 = cropsCol.sort('system:time_start', false).first();
  return c2022.rename('Crops 2022');
}
// Function to get age raster
function age(){
  var pop = worldPop.filterBounds(jabar1).first().clip(jabar1);
  var popCount = pop.select('population');
  var productive = ee.Image().expression({
    expression: '(m15 + m20 + m25 + m30 + m35 + m40 + m45 + m50 + m55 + m60) + (f15 + f20 + f25 + f30 + f35 + f40 + f45 + f50 + f55 + f60)',
    map: {
      'm15': pop.select('M_15'),
      'm20': pop.select('M_20'),
      'm25': pop.select('M_25'),
      'm30': pop.select('M_30'),
      'm35': pop.select('M_35'),
      'm40': pop.select('M_40'),
      'm45': pop.select('M_45'),
      'm50': pop.select('M_50'),
      'm55': pop.select('M_55'),
      'm60': pop.select('M_60'),
      'f15': pop.select('F_15'),
      'f20': pop.select('F_20'),
      'f25': pop.select('F_25'),
      'f30': pop.select('F_30'),
      'f35': pop.select('F_35'),
      'f40': pop.select('F_40'),
      'f45': pop.select('F_45'),
      'f50': pop.select('F_50'),
      'f55': pop.select('F_55'),
      'f60': pop.select('F_60'),
    }
  });
  var ratio = productive.divide(popCount).rename('Age Ratio');
  return ratio;
}
// Function to model flood surface
function modelFlood(){
  var water = jrc.map(function(img){
    var clippped = img.clip(jabar1);
    var seasonal = ee.Image(0).where(clippped.eq(2), 1);
    return seasonal.copyProperties(img, ['system:time_start']);
    });
  // Water band
  var water2007 = water.filter(ee.Filter.eq('system:index', '2007')).first().rename('Water');
  var water2010 = water.filter(ee.Filter.eq('system:index', '2010')).first().rename('Water');
  var water2017 = water.filter(ee.Filter.eq('system:index', '2017')).first().rename('Water');
  var forestRaster = forest;
  // Forest band
  var forest2007 = forestRaster.filter(ee.Filter.eq('system:index', '2007')).first().rename('Forest');
  var forest2010 = forestRaster.filter(ee.Filter.eq('system:index', '2010')).first().rename('Forest');
  var forest2017 = forestRaster.filter(ee.Filter.eq('system:index', '2017')).first().rename('Forest');
  // Geometry for bounds
  var geometry = jabar1;
  var rain = precipitation.filterBounds(jabar1);
  // Precipitation band
  var rain2007 = rain.filterDate('2007-01-01', '2007-12-31').sum().clip(jabar1).rename('Precipitation');
  var rain2010 = rain.filterDate('2010-01-01', '2010-12-31').sum().clip(jabar1).rename('Precipitation');
  var rain2017 = rain.filterDate('2017-01-01', '2017-12-31').sum().clip(jabar1).rename('Precipitation');
  // Band time
  var time2007 = ee.Image(water2007.metadata('system:time_start').divide(1e18));
  var time2010 = ee.Image(water2010.metadata('system:time_start').divide(1e18));
  var time2017 = ee.Image(water2017.metadata('system:time_start').divide(1e18));
  // Band dem and slope
  var elevation = dem.rename('Elevation');
  var slope = ee.Terrain.slope(dem).rename('Slope');
  // Multiband for model
  var image2007 = time2007.addBands([forest2007, rain2007, water2007]);
  var image2010 = time2010.addBands([forest2010, rain2010, water2010]);
  var image2017 = time2017.addBands([forest2017, rain2017, water2017]);
  // Image collection for model
  var imageCol = ee.ImageCollection.fromImages([image2007, image2010, image2017]);
  // Model
  var model = imageCol.select(['system:time_start', 'Forest', 'Precipitation', 'Water']).reduce(
    ee.Reducer.linearRegression({
      numX: 3,
      numY: 1,
    })
  ).select('coefficients').arrayFlatten([['time', 'forest', 'precipitation'], ['water']]);
  // Model changble
  var year = ee.Date(yearSlider.getValue().toString()).millis().divide(1e18);
  var modelYear = model.select('time_water');
  var newWater = modelYear.multiply(year);
  var flood = ee.Image(0).where(newWater.gte(1), 1);
  return flood;
}
function special(year1){
  var water = jrc.map(function(img){
    var clippped = img.clip(jabar1);
    var seasonal = ee.Image(0).where(clippped.eq(2), 1);
    return seasonal.copyProperties(img, ['system:time_start']);
    });
  // Water band
  var water2007 = water.filter(ee.Filter.eq('system:index', '2007')).first().rename('Water');
  var water2010 = water.filter(ee.Filter.eq('system:index', '2010')).first().rename('Water');
  var water2017 = water.filter(ee.Filter.eq('system:index', '2017')).first().rename('Water');
  var forestRaster = forest;
  // Forest band
  var forest2007 = forestRaster.filter(ee.Filter.eq('system:index', '2007')).first().rename('Forest');
  var forest2010 = forestRaster.filter(ee.Filter.eq('system:index', '2010')).first().rename('Forest');
  var forest2017 = forestRaster.filter(ee.Filter.eq('system:index', '2017')).first().rename('Forest');
  // Geometry for bounds
  var geometry = jabar1;
  var rain = precipitation.filterBounds(jabar1);
  // Precipitation band
  var rain2007 = rain.filterDate('2007-01-01', '2007-12-31').sum().clip(jabar1).rename('Precipitation');
  var rain2010 = rain.filterDate('2010-01-01', '2010-12-31').sum().clip(jabar1).rename('Precipitation');
  var rain2017 = rain.filterDate('2017-01-01', '2017-12-31').sum().clip(jabar1).rename('Precipitation');
  // Band time
  var time2007 = ee.Image(water2007.metadata('system:time_start').divide(1e18));
  var time2010 = ee.Image(water2010.metadata('system:time_start').divide(1e18));
  var time2017 = ee.Image(water2017.metadata('system:time_start').divide(1e18));
  // Band dem and slope
  var elevation = dem.rename('Elevation');
  var slope = ee.Terrain.slope(dem).rename('Slope');
  // Multiband for model
  var image2007 = time2007.addBands([forest2007, rain2007, water2007]);
  var image2010 = time2010.addBands([forest2010, rain2010, water2010]);
  var image2017 = time2017.addBands([forest2017, rain2017, water2017]);
  // Image collection for model
  var imageCol = ee.ImageCollection.fromImages([image2007, image2010, image2017]);
  // Model
  var model = imageCol.select(['system:time_start', 'Forest', 'Precipitation', 'Water']).reduce(
    ee.Reducer.linearRegression({
      numX: 3,
      numY: 1,
    })
  ).select('coefficients').arrayFlatten([['time', 'forest', 'precipitation'], ['water']]);
  // Model changble
  var year = ee.Date(year1).millis().divide(1e18);
  var modelYear = model.select('time_water');
  var newWater = modelYear.multiply(year);
  var flood = ee.Image(0).where(newWater.gte(1), 1);
  return flood;
}
// Function to get flood hazard
function floodHazard(){
  // Year
  var year = yearSlider.getValue();
  var yearDif = year - 2020;
  // Coastal flood hazard
  var elevation = dem;
  var seaRise = seaRiseSlider.getValue();
  var newDem = elevation.subtract((seaRise/1000) * yearDif);
  var drownDem = ee.Image(0).where(elevation.gte(0).and(newDem.lt(0)), 1);
  // Surface flood hazard
  var surfaceFlood = modelFlood();
  // Combined flood
  var combined = surfaceFlood.add(drownDem);
  // Flood hazard
  var hazard;
  var floodAnalysis = analysisSelect.getValue();
  switch (floodAnalysis) {
    case 'Coastal':
      hazard = drownDem;
      break;
    case 'Surface':
      hazard = surfaceFlood;
      break;
    case 'Combination':
      hazard = combined;
      break;
  }
  return hazard;
}
// Legend tool
var legend = require('users/ramiqcom/ugm:tools/legend');
// Function base flood hazard
function baseHazard() {
  // Year
  var year = yearSlider.getValue();
  var yearDif = year - 2020;
  // Coastal flood hazard
  var elevation = dem;
  var seaRise = seaRiseSlider.getValue();
  var newDem = elevation.subtract((seaRise/1000) * yearDif);
  var drownDem = ee.Image(0).where(elevation.gte(0).and(newDem.lt(0)), 1);
  // Surface flood hazard
  var surfaceFlood = modelFlood();
  // Combination
  var combined = ee.Image(0)
                .where(surfaceFlood.eq(1), 1)
                .where(drownDem.eq(1), 2)
                .where(surfaceFlood.eq(1).and(drownDem.eq(1)), 3);
  var image;
  var analysisStatus = analysisSelect.getValue();
  switch (analysisStatus) {
    case 'Surface':
      image = surfaceFlood;
      break;
    case 'Coastal':
      image = drownDem;
      break;
    case 'Combination':
      image = combined;
      break;
  }
  return image;
}
// Function to show flood hazard pixel
function hazardPixel() {
  // Year
  var year = yearSlider.getValue();
  var hazardFlood = baseHazard();
  // Visualization
  var oneHazard = ['red'];
  var oneTitle = ['Flood Hazard'];
  var combineHazard = ['blue', 'orange', 'red'];
  var combineTitle = ['Surface', 'Coastal', 'Both'];
  // Visual
  var palette;
  var legendTitle;
  var min;
  var max;
  var image = hazardFlood;
  var hazardTitle;
  var analysisStatus = analysisSelect.getValue();
  switch (analysisStatus) {
    case 'Surface':
      palette = oneHazard;
      legendTitle = oneTitle;
      min = 1;
      max = 1;
      hazardTitle = analysisStatus;
      break;
    case 'Coastal':
      palette = oneHazard;
      legendTitle = oneTitle;
      min = 1;
      max = 1;
      hazardTitle = analysisStatus;
      break;
    case 'Combination':
      palette = combineHazard;
      legendTitle = combineTitle;
      min = 1;
      max = 3;
      hazardTitle = 'Surface & Coastal';
      break;
  }
  var vis = {palette: palette, min: min, max: max};
  var title = hazardTitle + ' Flood Hazard ' + 'in West Java ' + year;
  var legendLayout = legend.legendDiscrete(title, legendTitle, palette, max, 'bottom-left');
  Map.add(legendLayout);
  Map.addLayer(image.selfMask(), vis, title);
}
// Function to show flood hazard aggr
function hazardAggr() {
  // Year
  var year = yearSlider.getValue();
  var hazardFlood = baseHazard();
  var regency = jabar2;
  var district = jabar3;
  var village = jabar4;
  var aggrStatus = visualSelect.getValue();
  var aggrRisk;
  switch (aggrStatus) {
    case 'Regency':
      aggrRisk = regency;
      break;
    case 'District':
      aggrRisk = district;
      break;
    case 'Village':
      aggrRisk = village;
      break;
  }
  // Visual for each hazard
  var vis;
  var visOne = {palette: ['white', 'red'], min: 0, max: 1};
  var visTwo = {palette: ['white', 'red'], min: 0, max: 2};
  var image;
  var hazardTitle;
  var analysisStatus = analysisSelect.getValue();
  switch (analysisStatus) {
    case 'Surface':
    case 'Coastal':
      vis = visOne;
      hazardTitle = analysisStatus;
      image = hazardFlood;
      break;
    case 'Combination':
      hazardTitle = 'Surface & Coastal';
      vis = visTwo;
      image = ee.Image(0)
              .where(hazardFlood.eq(1).or(hazardFlood.eq(2)), 1)
              .where(hazardFlood.eq(3), 2);
      break;
  }
  var reduce = image.reduceRegions({
      collection: aggrRisk,
      reducer: ee.Reducer.mean(),
      scale: 30,
    });
  var choro = ee.Image().byte().paint({
      featureCollection: reduce,
      color: 'mean'
    });
  var title = hazardTitle + ' Flood Hazard Index ' + 'in West Java ' + year;
  var legendLayout = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendLayout);
  Map.addLayer(choro, vis, title);
}
// Function to get flood hazard to show on map
function floodHazardShow() {
  var aggrStatus = visualSelect.getValue();
  if (aggrStatus == 'Dasymetric') {
    hazardPixel();
  } else {
    hazardAggr();
  }
}
// Function to get flood exposure
function floodExpo(){
  // Year
  var year = yearSlider.getValue();
  var yearDif = year - 2020;
  var yearDate = ee.Date(year+'-01-01').millis();
  // Pop raster
  var growth = populationSlider.getValue();
  var trendPop = popTrend();
  var scale = trendPop.select('scale').multiply(growth);
  var offset = trendPop.select('offset');
  var popCalculate = scale.multiply(yearDate).add(offset);
  var popRaster = ee.Image(popCalculate).where(popCalculate.lt(0), 0);
  var popMax = ee.Number(popRaster.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: jabar1,
    scale: 250,
    bestEffort: true,
    maxPixels: 1000000000
  }).get('scale'));
  var popRatio = popRaster.divide(popMax);
  // Urban raster
  var urbanLatest = urban2022();
  var trendUrban = urbanTrend();
  var urbanRaster = urbanLatest.add(trendUrban.multiply(yearDif));
  // Crops raster
  var cropsLatest = crops2022();
  var trendCrops = cropsTrend();
  var cropsRaster = cropsLatest.add(trendCrops.multiply(yearDif));
  // Kernell
  var road = road_kernel;
  var hospital = hospital_kernel;
  var school = school_kernel;
  // Flood exposure
  var exposure = ee.Image().expression({
    expression: '((pop + crops + urban + sekolah + rs + jalan)/6)',
    map: {
     'pop': popRatio,
     'crops': cropsRaster,
     'urban': urbanRaster,
     'sekolah': road,
     'rs': hospital,
     'jalan': school
    }
  });
  return exposure;
}
// Function to get flood vulnerability
function floodVuln(){
  // Year
  var year = yearSlider.getValue();
  var yearDif = year - 2020;
  // Urban raster
  var urbanLatest = urban2022();
  var trendUrban = urbanTrend();
  var urbanRaster = urbanLatest.add(trendUrban.multiply(yearDif));
   // Vulnerability
  var ageRaster = age();
  var urbanization = urbanRaster;
  var literacy = 0.9862;
  var vulnerability = ageRaster.add(urbanization).add(literacy).divide(3);
  return vulnerability;
}
// Function to model the flood risk
function floodRisk(){
  // Flood risk
  var hazard = floodHazard();
  var exposure = floodExpo();
  var vulnerability = floodVuln();
  var risk = hazard.multiply(exposure).multiply(vulnerability);
  return risk.multiply(10);
}
// Function for per pixel
function pixel(){
  // Visualization
  var riskVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var expoVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var vulnVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var vis;
  // Get value of index select
  var indexStatus = indexSelect.getValue();
  var index;
  switch (indexStatus) {
    case 'Risk':
      index = floodRisk();
      vis = riskVis;
      break;
    case 'Exposure':
      index = floodExpo().selfMask();
      vis = expoVis;
      break;
    case 'Vulnerability':
      index = floodVuln().selfMask();
      vis = vulnVis;
      break;
  }
  var floodType = analysisSelect.getValue();
  var floodTitle;
  switch (floodType) {
    case 'Surface':
      floodTitle = 'Surface';
      break;
    case 'Coastal':
      floodTitle = 'Coastal';
      break;
    case 'Combination':
    case null:
      floodTitle = 'Coastal & Surface';
      break;
  }
  var year = yearSlider.getValue();
  var title = floodTitle + ' Flood ' + indexStatus + ' in ' + year;
  Map.addLayer(index, vis, title);
  var mapLegend = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(mapLegend);
}
// Function to get aggregation
function aggrBase(){
  var regency = jabar2;
  var district = jabar3;
  var village = jabar4;
  var aggrStatus = visualSelect.getValue();
  var aggrRisk;
  switch (aggrStatus) {
    case 'Regency':
      aggrRisk = regency;
      break;
    case 'District':
      aggrRisk = district;
      break;
    case 'Village':
      aggrRisk = village;
      break;
  }
  // Get value of index select
  var indexStatus = indexSelect.getValue();
  var index;
  switch (indexStatus) {
    case 'Risk':
      index = floodRisk();
      break;
    case 'Exposure':
      index = floodExpo();
      break;
    case 'Vulnerability':
      index = floodVuln();
      break;
  }
  var reduce = index.reduceRegions({
    collection: aggrRisk,
    reducer: ee.Reducer.mean(),
    scale: 250,
  });
  return reduce;
}
function popAffected(){
  // Year
  var yearTarget = 2022;
  var yearDif = yearTarget - 2020;
  var yearDate = ee.Date(yearTarget+'-01-01').millis();
  // Coastal flood hazard
  var elevation = dem;
  var seaRise = seaRiseSlider.getValue();
  var newDem = elevation.subtract((seaRise/1000) * yearDif);
  var drownDem = ee.Image(0).where(elevation.gte(0).and(newDem.lt(0)), 1);
  // Surface flood hazard
  var surfaceFlood = special('2022-01-01');
  // Combination
  var combined = ee.Image(0)
                .where(surfaceFlood.eq(1), 1)
                .where(drownDem.eq(1), 2)
                .where(surfaceFlood.eq(1).and(drownDem.eq(1)), 3);
  // Pop raster
  var growth = populationSlider.getValue();
  var trendPop = popTrend();
  var scale = trendPop.select('scale').multiply(growth);
  var offset = trendPop.select('offset');
  var popCalculate = scale.multiply(yearDate).add(offset);
  var popRaster = ee.Image(popCalculate).where(popCalculate.lt(0), 0);
  var hazard = combined;
  var affected = ee.Image(popRaster).where(hazard.eq(0), 0);
  var regency = jabar2;
  var reduce = affected.reduceRegions({
    collection: regency,
    reducer: ee.Reducer.sum(),
    scale: 250,
  });
  var url = reduce.getDownloadURL({
    format: 'csv',
    filename: 'PopAffected2022',
    selectors: ['NAME_2', 'sum']
  });
  print(url);
}
function areaAffected(){
  // Year
  var yearDif = 2022 - 2020;
  // Coastal flood hazard
  var elevation = dem;
  var seaRise = seaRiseSlider.getValue();
  var newDem = elevation.subtract((seaRise/1000) * yearDif);
  var drownDem = ee.Image(0).where(elevation.gte(0).and(newDem.lt(0)), 1);
  // Surface flood hazard
  var surfaceFlood = special('2022-01-01');
  // Combination
  var combined = ee.Image(0)
                .where(surfaceFlood.eq(1), 1)
                .where(drownDem.eq(1), 2)
                .where(surfaceFlood.eq(1).and(drownDem.eq(1)), 3);
  // New image
  var area1 = ee.Image(0).where(combined.gt(0), 1).multiply(250*250);
  // Area ffected
  var regency = jabar2;
  var reduce = area1.reduceRegions({
    collection: regency,
    reducer: ee.Reducer.sum(),
    scale: 250,
  });
  var url = reduce.getDownloadURL({
    format: 'csv',
    filename: 'combinedArea2022',
    selectors: ['NAME_2', 'sum']
  });
  print(url);
}
// Function for showing aggregation
function aggregation(){
  // Vis choice
  var riskVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var expoVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var vulnVis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  var vis;
  // Get value of index select
  var indexStatus = indexSelect.getValue();
  switch (indexStatus) {
    case 'Risk':
      vis = riskVis;
      break;
    case 'Exposure':
      vis = expoVis;
      break;
    case 'Vulnerability':
      vis = vulnVis;
      break;
  }
  var reduce = aggrBase();
  var choro = ee.Image().byte().paint({
    featureCollection: reduce,
    color: 'mean'
  });
  var floodType = analysisSelect.getValue();
  var floodTitle;
  switch (floodType) {
    case 'Surface':
      floodTitle = 'Surface';
      break;
    case 'Coastal':
      floodTitle = 'Coastal';
      break;
    case 'Combination':
    case null:
      floodTitle = 'Coastal & Surface';
      break;
  }
  var year = yearSlider.getValue();
  var title = floodTitle + ' Flood ' + indexStatus + ' in ' + year;
  Map.addLayer(choro, vis, title);
  var mapLegend = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(mapLegend);
}
// Show map function
function showMap(){
  // Reset map condition
  resetMap();
  // Show hazard map
  var indexStatus = indexSelect.getValue();
  if (indexStatus == 'Hazard') {
    floodHazardShow();
  } else {
    // Visualization select
    var visualStatus = visualSelect.getValue();
    switch (visualStatus) {
      case 'Dasymetric':
        pixel();
        break;
      case 'Regency':
      case 'District':
      case 'Village':
        aggregation();
        break;
    }
  }
  if (borderSelect.getValue() !== 'None') {
      admin();
  }
  download();
  showIndex();
}
// Function to add admin border to map
function admin(){
  var regency = jabar2;
  var district = jabar3;
  var village = jabar4;
  var borderStatus = borderSelect.getValue();
  var adminFeature;
  var adminName;
  switch (borderStatus) {
    case 'Dasymetric':
    case 'Regency':
      adminFeature = regency;
      adminName = 'Regency Border';
      break;
    case 'District':
      adminFeature = district;
      adminName = 'District Border';
      break;
    case 'Village':
      adminFeature = village;
      adminName = 'Village Border';
      break;
  }
  var visAdmin = ee.Image().byte().paint({
    featureCollection: adminFeature,
    color: 1,
    width: 1
  });
  Map.addLayer(visAdmin, {palette: 'gray'}, adminName);
}
// Function to download file
function download() {
  var downloadPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
    style: {maxWidth: '350px', position: 'bottom-right'}
  });
  Map.add(downloadPanel);
  var downloadButton = ui.Button({
    label: 'Generate download link',
    onClick: function(){
      var visualStatus = visualSelect.getValue();
      if (visualStatus == 'Dasymetric'){
        downloadRaster();
      } else {
        aggrDownload();
      }
    }
  });
  downloadPanel.add(downloadButton);
  var downloadLinkLabel = ui.Label({
    value: 'Download link',
    style: {padding: '5px 0px'}
  });
  downloadPanel.add(downloadLinkLabel);
  // Function to download raster
  function downloadRaster() {
    downloadLinkLabel.setValue('Link is being generated');
    var image = Map.layers().get(0);
    var object = image.getEeObject();
    var title = image.getName();
    var band = image.getVisParams().bands;
    var geometry = jabar1.geometry();
    var url = object.getDownloadURL({
      params: {name: title, bands: band, scale: 250, format: 'GEO_TIFF', region: geometry},
      callback: function(link){
        if (link === null) {
        downloadLinkLabel.setValue('Image size too big!');
        downloadLinkLabel.style().set({color: 'red'});
        } else {
          downloadLinkLabel.setValue('Link ready');
          downloadLinkLabel.style().set({color: 'blue'});
        }
          downloadLinkLabel.setUrl(link);
        }
    });
  }
  // Function for aggregation download
  function aggrDownload() {
    downloadLinkLabel.setValue('Link is being generated');
    var image = Map.layers().get(0);
    var object = image.getEeObject();
    var title = image.getName();
    var regency = jabar2;
    var district = jabar3;
    var village = jabar4;
    var aggrStatus = visualSelect.getValue();
    var aggrRisk;
    var selector;
    switch (aggrStatus) {
      case 'Regency':
        aggrRisk = regency;
        selector = ['NAME_2', 'mean'];
        break;
      case 'District':
        aggrRisk = district;
        selector = ['NAME_2', 'NAME_3', 'mean'];
        break;
      case 'Village':
        aggrRisk = village;
        selector = ['NAME_2', 'NAME_3', 'NAME_4', 'mean'];
        break;
    }
    var reduce = object.reduceRegions({
        collection: aggrRisk,
        reducer: ee.Reducer.mean(),
        scale: 250,
      }).select(selector);
    var url = reduce.getDownloadURL({
      format: 'geojson',
      filename: title,
      callback: function(link){
        if (link === null) {
        downloadLinkLabel.setValue('Feature size too big!');
        downloadLinkLabel.style().set({color: 'red'});
        } else {
          downloadLinkLabel.setValue('Link ready');
          downloadLinkLabel.style().set({color: 'blue'});
        }
          downloadLinkLabel.setUrl(link);
        }
    });
  }
}
// Function to show population on panel
function showIndex(){
  // Panel for the number
  var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', position: 'bottom-left'}
  });
  Map.add(infoPanel);
  // Title for panel
  var title = ui.Label({
    value: 'Click map to get value!',
    style: {fontWeight: 'bold', color: 'blue'}
  });
  infoPanel.add(title);
  // Pixel value
  var pxLabel = ui.Label({
    value: 'Value:'
  });
  infoPanel.add(pxLabel);
  // Village name
  var villageLabel = ui.Label({
    value: 'Village:'
  });
  infoPanel.add(villageLabel);
  // District name
  var districtLabel = ui.Label({
    value: 'District:'
  });
  infoPanel.add(districtLabel);
  // City name
  var cityLabel = ui.Label({
    value: 'City/regency:'
  });
  infoPanel.add(cityLabel);
  // Info panel function for raster
  function rasterClick(value){
    // Lat lon to create a point for filter bounds
    var lat = value.lat;
    var lon = value.lon;
    var point = ee.Geometry.Point([lon, lat]);
    // Get the pop image for analysis
    var image = Map.layers().get(0).getEeObject();
    var band = image.bandNames().get(0);
    // Make pixel calculation
    var pixel = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: point,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(band);
    // Add pixel pop calculation to panel
    ee.Number(pixel).evaluate(function(value){
      var number = value;
      pxLabel.setValue('Value: ' + number);
    });
    // Get admin name
    var area = jabar4;
    var selected = area.filterBounds(point).first();
    var villageName = selected.get('NAME_4').getInfo();
    villageLabel.setValue('Village: ' + villageName);
    var districtName = selected.get('NAME_3').getInfo();
    districtLabel.setValue('District: ' + districtName);
    var cityName = selected.get('NAME_2').getInfo();
    cityLabel.setValue('City/regency: ' + cityName);
  }
  // Click function to show the population
  Map.onClick(rasterClick);
}