var gaul = ui.import && ui.import("gaul", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    nasadem = ui.import && ui.import("nasadem", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    etopo = ui.import && ui.import("etopo", "image", {
      "id": "NOAA/NGDC/ETOPO1"
    }) || ee.Image("NOAA/NGDC/ETOPO1"),
    olmPrecip = ui.import && ui.import("olmPrecip", "image", {
      "id": "OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"
    }) || ee.Image("OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"),
    olmLandTemp = ui.import && ui.import("olmLandTemp", "image", {
      "id": "OpenLandMap/CLM/CLM_LST_MOD11A2-DAY_M/v01"
    }) || ee.Image("OpenLandMap/CLM/CLM_LST_MOD11A2-DAY_M/v01"),
    gcom = ui.import && ui.import("gcom", "imageCollection", {
      "id": "JAXA/GCOM-C/L3/OCEAN/SST/V3"
    }) || ee.ImageCollection("JAXA/GCOM-C/L3/OCEAN/SST/V3"),
    era5 = ui.import && ui.import("era5", "imageCollection", {
      "id": "ECMWF/ERA5/MONTHLY"
    }) || ee.ImageCollection("ECMWF/ERA5/MONTHLY"),
    gfcc = ui.import && ui.import("gfcc", "imageCollection", {
      "id": "NASA/MEASURES/GFCC/TC/v3"
    }) || ee.ImageCollection("NASA/MEASURES/GFCC/TC/v3"),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    viirsVeg = ui.import && ui.import("viirsVeg", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP13A1"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP13A1"),
    allen = ui.import && ui.import("allen", "image", {
      "id": "ACA/reef_habitat/v1_0"
    }) || ee.Image("ACA/reef_habitat/v1_0"),
    srtmLandform = ui.import && ui.import("srtmLandform", "image", {
      "id": "CSP/ERGo/1_0/Global/SRTM_landforms"
    }) || ee.Image("CSP/ERGo/1_0/Global/SRTM_landforms"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR_HARMONIZED"
    }) || ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    s2Cloud = ui.import && ui.import("s2Cloud", "imageCollection", {
      "id": "COPERNICUS/S2_CLOUD_PROBABILITY"
    }) || ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA"),
    worldCover = ui.import && ui.import("worldCover", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100");
// Function to zoom location or Indonesia
function myLocation(){
  // Indonesia layer for zoom
  var indonesia = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
  // Zoom to current location or Indonesia
  function current_position(point) {
    Map.centerObject(point, 7);
  }
  function oops(error) {
    Map.centerObject(indonesia, 5);
  }
  ui.util.getCurrentPosition(current_position, oops);
}
myLocation();
// Function to start map
function resetMap(){
  // Clear map
  Map.clear();
  // Set map to gray
  Map.setOptions('SATELLITE');
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  // Set drawing tools to only be rectangle and not linked to script
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
  // Set geometry to hide after each function
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
}
resetMap();
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '400px', padding: '10px 20px'}
});
ui.root.add(mainPanel);
// App title
var appTitle = ui.Label({
  value: 'Environment Explorer',
  style: {fontSize: '35px', color: 'green', fontWeight: 'bold', margin: '30px 5px'}
});
mainPanel.add(appTitle);
// App description
var appDesc = ui.Label({
  value: 'This app will show you information about our Earth such as temperature, precipitation, elevation, vegetation, water, etc'
});
mainPanel.add(appDesc);
// Explore select
var exploreSelect = ui.Select({
  items: ['Air temperature', 'Benthic habitat', 'Elevation', 'Enhanced Vegetation Index', 'Forest cover', 'Land temperature', 'Landform', 'Landsat', 'Precipitation', 'Sea temperature', 'Sentinel-2', 'Surface water'],
  placeholder: 'What do you want to explore?',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    resetMap();
    precipSelect.style().set('shown', false);
    landTempSelect.style().set('shown', false);
    compositeSelect.style().set('shown', false);
    explore();
  }
});
mainPanel.add(exploreSelect);
// Explore function
function explore(){
  var value = exploreSelect.getValue();
  switch(value){
    case 'Elevation':
      elevation();
      dataDescLabel.setValue('NASADEM & ETOPO1');
      dataDescLabel.setUrl('https://cmr.earthdata.nasa.gov/search/concepts/C1546314043-LPDAAC_ECS.html');
      break;
    case 'Precipitation':
      precipSelect.style().set('shown', true);
      precipitation();
      dataDescLabel.setValue('OpenLandMap Precipitation Monthly');
      dataDescLabel.setUrl('https://doi.org/10.5281/zenodo.1435912');
      break;
    case 'Land temperature':
      landTempSelect.style().set('shown', true);
      landTemp();
      dataDescLabel.setValue('OpenLandMap Long-term Land Surface Temperature Daytime Monthly Median');
      dataDescLabel.setUrl('https://doi.org/10.5281/zenodo.1420114');
      break;
    case 'Sea temperature':
      seaTemp();
      dataDescLabel.setValue('GCOM-C/SGLI L3 Sea Surface Temperature (V3)');
      dataDescLabel.setUrl('https://suzaku.eorc.jaxa.jp/GCOM/index.html');
      break;
    case 'Air temperature':
      airTemp();
      dataDescLabel.setValue('ERA5 Monthly Aggregates - Latest Climate Reanalysis Produced by ECMWF / Copernicus Climate Change Service');
      dataDescLabel.setUrl('https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels');
      break;
    case 'Forest cover':
      forestCover();
      dataDescLabel.setValue('Global Forest Cover Change (GFCC) Tree Cover Multi-Year Global 30m');
      dataDescLabel.setUrl('https://doi.org/10.5067/MEaSUREs/GFCC/GFCC30TC.003');
      break;
    case 'Surface water':
      surfaceWater();
      dataDescLabel.setValue('JRC Global Surface Water Mapping Layers, v1.4');
      dataDescLabel.setUrl('https://global-surface-water.appspot.com/');
      break;
    case 'Enhanced Vegetation Index':
      evi();
      dataDescLabel.setValue('VNP13A1: VIIRS Vegetation Indices 16-Day 500m');
      dataDescLabel.setUrl('https://doi.org/10.5067/VIIRS/VNP13A1.001');
      break;
    case 'Benthic habitat':
      benthic();
      dataDescLabel.setValue('Allen Coral Atlas (ACA) - Geomorphic Zonation and Benthic Habitat - v1.0');
      dataDescLabel.setUrl('https://allencoralatlas.org/');
      break;
    case 'Landform':
      landform();
      dataDescLabel.setValue('Global SRTM Landforms');
      dataDescLabel.setUrl('https://www.csp-inc.org/');
      break;
    case 'Sentinel-2':
      compositeSelect.style().set('shown', true);
      sentinel2();
      dataDescLabel.setValue('Harmonized Sentinel-2 MSI: MultiSpectral Instrument, Level-2A');
      dataDescLabel.setUrl('https://earth.esa.int/web/sentinel/user-guides/sentinel-2-msi/product-types/level-2a');
      break;
    case 'Landsat':
      compositeSelect.style().set('shown', true);
      landsat();
      dataDescLabel.setValue('USGS Landsat 8 Collection 2 Tier 1 TOA Reflectance');
      dataDescLabel.setUrl('https://www.usgs.gov/land-resources/nli/landsat/landsat-8-data-users-handbook');
      break;
  }
}
// Precipitation select
var precipSelect = ui.Select({
  items: ['Yearly sum', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  style: {stretch: 'horizontal', shown: false},
  value: 'Yearly sum',
  placeholder: ' ',
  onChange: function(value){
    resetMap();
    precipitation();
  }
});
mainPanel.add(precipSelect);
// Land temperature select
var landTempSelect = ui.Select({
  items: ['Yearly average', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  style: {stretch: 'horizontal', shown: false},
  value: 'Yearly average',
  placeholder: ' ',
  onChange: function(value){
    resetMap();
    landTemp();
  }
});
mainPanel.add(landTempSelect);
// Composite select
var compositeSelect = ui.Select({
  items: ['Red Green Blue', 'NIR Red Green', 'SWIR2 SWIR1 NIR', 'SWIR1 NIR Blue', 'NIR SWIR1 Blue', 'SWIR1 Blue NIR'],
  style: {stretch: 'horizontal', shown: false},
  value: 'Red Green Blue',
  placeholder: ' ',
  onChange: function(value){
    resetMap();
    var imagery = exploreSelect.getValue();
    switch(imagery){
      case 'Sentinel-2':
        sentinel2();
        break;
      case 'Landsat':
        landsat();
        break;
    }
  }
});
mainPanel.add(compositeSelect);
// Data desc
var dataDescLabel = ui.Label({
  value: ' ',
  style: {textAlign: 'justify'}
});
mainPanel.add(dataDescLabel);
// Palette
var palettes = require('users/gena/packages:palettes');
// Legend
var legend = require('users/ramiqcom/ugm:tools/legend');
// Admin boundary
function admin(){
  var data = gaul;
  var image = ee.Image().toByte().paint({
    featureCollection: data,
    width: 0.1,
    color: 1
  });
  var visualized = image.visualize({palette: 'black'});
  Map.addLayer(visualized, {}, 'Admin Boundary');
}
// Hillshade
function hillshade(){
  function hillshadeEtopo(){
    var elevation = etopo.select('bedrock').multiply(10);
    var N = ee.Terrain.hillshade(elevation,0,36).multiply(0);
    var NE = ee.Terrain.hillshade(elevation,45,44).multiply(0);
    var E = ee.Terrain.hillshade(elevation,90,56).multiply(0);
    var SE = ee.Terrain.hillshade(elevation,135,68).multiply(0);
    var S = ee.Terrain.hillshade(elevation,180,80).multiply(0.1);
    var SW = ee.Terrain.hillshade(elevation,225,68).multiply(0.2);
    var W = ee.Terrain.hillshade(elevation,270,56).multiply(0.2);
    var NW = ee.Terrain.hillshade(elevation,315,44).multiply(0.5);
    var MULTI = N.add(NE).add(E).add(SE).add(S).add(SW).add(W).add(NW).visualize({
      min:0,
      max:255,
      palette:['#000000', '#ffffff']
    }).updateMask(0.5);
    var SLOPE = ee.Terrain.slope(elevation).multiply(2).visualize({
      min:100,
      max:180,
      palette:['#ffffff', '#000000']
    }).updateMask(1);
    var SHADED_RELIEF = ee.ImageCollection([SLOPE, MULTI]).mosaic().reduce(ee.Reducer.median()).updateMask(1);
    var reliefVisualized = SHADED_RELIEF.visualize({min:0, max:255, gamma:1}).divide(255);
    return reliefVisualized;
  }
  function hillshadeNasadem(){
    var elevation = nasadem.select('elevation').updateMask(nasadem.select('elevation').gt(0)).multiply(10);
    var N = ee.Terrain.hillshade(elevation,0,36).multiply(0);
    var NE = ee.Terrain.hillshade(elevation,45,44).multiply(0);
    var E = ee.Terrain.hillshade(elevation,90,56).multiply(0);
    var SE = ee.Terrain.hillshade(elevation,135,68).multiply(0);
    var S = ee.Terrain.hillshade(elevation,180,80).multiply(0.1);
    var SW = ee.Terrain.hillshade(elevation,225,68).multiply(0.2);
    var W = ee.Terrain.hillshade(elevation,270,56).multiply(0.2);
    var NW = ee.Terrain.hillshade(elevation,315,44).multiply(0.5);
    var MULTI = N.add(NE).add(E).add(SE).add(S).add(SW).add(W).add(NW).visualize({
      min:0,
      max:255,
      palette:['#000000', '#ffffff']
    }).updateMask(0.5);
    var SLOPE = ee.Terrain.slope(elevation).multiply(2).visualize({
      min:100,
      max:180,
      palette:['#ffffff', '#000000']
    }).updateMask(1);
    var SHADED_RELIEF = ee.ImageCollection([SLOPE, MULTI]).mosaic().reduce(ee.Reducer.median()).updateMask(1);
    var reliefVisualized = SHADED_RELIEF.visualize({min:0, max:255, gamma:1}).divide(255);
    return reliefVisualized;
  }
  var hillshadeCombined = hillshadeEtopo().blend(hillshadeNasadem());
  return hillshadeCombined;
}
// Elevation data
function elevationData(){
  var dem = nasadem.select('elevation');
  var demOcean = etopo.select('bedrock');
  var blend = demOcean.blend(demOcean);
  return blend;
}
// Elevation object
function elevation(){
  var dem = nasadem.select('elevation').clip(gaul);
  var demVisualized = dem.visualize({min: 0, max: 5000, palette: ['green', 'yellow', 'red', 'white']}).divide(255);
  var demOcean = etopo.select('bedrock');
  var hillshadeOcean = ee.Terrain.hillshade(demOcean.multiply(10));
  var demOceanVisualized = demOcean.visualize({min: 0, max: -10000, palette: ['dodgerblue', 'navy']}).divide(255);
  var demCombined = demOceanVisualized.blend(demVisualized).updateMask(0.8);
  var terrain = hillshade();
  var terrainDem = terrain.blend(demCombined);
  Map.addLayer(terrainDem, {}, 'Elevation');
  admin();
  var title = 'Elevation (m)';
  var legendVis = {palette: ['navy', 'dodgerblue', 'green', 'yellow', 'red', 'white'], min: -10000, max: 5000};
  var legendElevation = legend.legendGradient(title, legendVis, 'bottom-left');
  Map.add(legendElevation);
}
// Precipitation data
function precipData(){
  var data = olmPrecip;
  var sub = precipSelect.getValue();
  var subData;
  switch(sub){
    case 'Yearly sum':
      subData = data.reduce(ee.Reducer.sum());
      break;
    case 'January':
      subData = data.select('jan');
      break;
    case 'February':
      subData = data.select('feb');
      break;
    case 'March':
      subData = data.select('mar');
      break;
    case 'April':
      subData = data.select('apr');
      break;
    case 'May':
      subData = data.select('may');
      break;
    case 'June':
      subData = data.select('jun');
      break;
    case 'July':
      subData = data.select('jul');
      break;
    case 'August':
      subData = data.select('aug');
      break;
    case 'September':
      subData = data.select('sep');
      break;
    case 'October':
      subData = data.select('oct');
      break;
    case 'November':
      subData = data.select('nov');
      break;
    case 'December':
      subData = data.select('dec');
      break;
  }
  return subData;
}
// Precipitation object
function precipitation(){
  var subData = precipData();
  var vis = {palette: ['red', 'yellow', 'green', 'cyan', 'blue'], min: 0, max: 300};
  var sub = precipSelect.getValue();
  if(sub == 'Yearly sum'){
    vis.max = 3000;
  }
  var terrain = hillshade();
  var dataVisualized = subData.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Precipitation ' + sub + ' (mm)';
  Map.addLayer(blended, {}, title);
  admin();
  var legendPrecip = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendPrecip);
}
// Land temperature data
function landTempData(){
  var data = olmLandTemp.multiply(0.02).subtract(273.15);
  var sub = landTempSelect.getValue();
  var subData;
  switch(sub){
    case 'Yearly average':
      subData = data.reduce(ee.Reducer.mean());
      break;
    case 'January':
      subData = data.select('jan');
      break;
    case 'February':
      subData = data.select('feb');
      break;
    case 'March':
      subData = data.select('mar');
      break;
    case 'April':
      subData = data.select('apr');
      break;
    case 'May':
      subData = data.select('may');
      break;
    case 'June':
      subData = data.select('jun');
      break;
    case 'July':
      subData = data.select('jul');
      break;
    case 'August':
      subData = data.select('aug');
      break;
    case 'September':
      subData = data.select('sep');
      break;
    case 'October':
      subData = data.select('oct');
      break;
    case 'November':
      subData = data.select('nov');
      break;
    case 'December':
      subData = data.select('dec');
      break;
  }
  return subData;
}
// Land temperature object
function landTemp(){
  var subData = landTempData();
  var vis = {palette: ['blue', 'cyan', 'green', 'yellow', 'red'], min: -10, max: 40};
  var terrain = hillshade().updateMask(subData);
  var dataVisualized = subData.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var sub = landTempSelect.getValue();
  var title = 'Land temperature' + sub + ' (Celcius)';
  Map.addLayer(blended, {}, title);
  admin();
  var legendLandTemp = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendLandTemp);
}
// Sea temperature data
function seaTempData(){
  var data = gcom.filterDate('2021-01-01', '2021-12-31').select('SST_AVE').median().divide(1000);
  return data;
}
// Sea temperature object
function seaTemp(){
  var data = seaTempData();
  var vis = {palette: ['blue', 'cyan', 'green', 'yellow', 'red'], min: -10, max: 40};
  var terrain = hillshade().updateMask(data);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Sea temperature' + ' (Celcius)';
  Map.addLayer(blended, {}, title);
  var legendSeaTemp = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendSeaTemp);
}
// Air temperature data
function airTempData(){
  var data = era5.sort('system:time_start', false).select('mean_2m_air_temperature').first().subtract(273.15);
  return data;
}
// Air temperature object
function airTemp(){
  var data = airTempData();
  var vis = {palette: ['blue', 'cyan', 'green', 'yellow', 'red'], min: -10, max: 40};
  var terrain = hillshade().updateMask(data);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Air temperature' + ' (Celcius)';
  Map.addLayer(blended, {}, title);
  admin();
  var legendAirTemp = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendAirTemp);
}
// Fores cover data
function forestCoverData(){
  var data = gfcc.filterDate('2015-01-01', '2015-12-31').select('tree_canopy_cover').median();
  return data;
}
// Forest cover object
function forestCover(){
  var data = forestCoverData().clip(gaul);
  var vis = {palette: ['LemonChiffon', 'Olive', 'DarkGreen'], min: 0, max: 100};
  var terrain = hillshade().clip(gaul);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Forest cover' + ' (%)';
  Map.addLayer(blended, {}, title);
  admin();
  var legendForest = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendForest);
}
// Forest cover data
function surfaceWaterData(){
  var data = gsw.select('seasonality');
  return data;
}
// Surface water object
function surfaceWater(){
  var data = surfaceWaterData().clip(gaul);
  var vis = {palette: ['white', 'lightskyblue', 'dodgerblue', 'darkblue'], min: 0, max: 12};
  var terrain = hillshade().clip(gaul);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Number of months water is present';
  Map.addLayer(blended, {}, title);
  admin();
  var legendWater = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendWater);
}
// EVI data
function eviData(){
  var data = viirsVeg.sort('system:time:start', false).first().select('EVI').multiply(0.0001);
  return data;
}
// EVI object
function evi(){
  var data = eviData().clip(gaul);
  var vis = {palette: ['LemonChiffon', 'Olive', 'DarkGreen'], min: 0, max: 1};
  var terrain = hillshade().clip(gaul);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Enhanced Vegetation Index';
  Map.addLayer(blended, {}, title);
  admin();
  var legendEvi = legend.legendGradient(title, vis, 'bottom-left');
  Map.add(legendEvi);
}
// Benthic habitat data
function benthicData(){
  var data = allen.select('benthic').selfMask();
  return data;
}
// Benthic habitat object
function benthic(){
  var data = benthicData();
  var title = 'Benthic Habitat';
  Map.addLayer(data, {}, title);
  admin();
  var legendBenthic = legend.legendDiscrete(title, data.get('benthic_class_names').getInfo(), data.get('benthic_class_palette').getInfo(), 7, 'bottom-left');
  Map.add(legendBenthic);
}
// Landform data
function landformData(){
  var data = srtmLandform.select('constant');
  return data;
}
// Landform object
function landform(){
  var data = landformData();
  var vis = {min: 11, max: 42, palette: [
    '141414', '383838', '808080', 'EBEB8F', 'F7D311', 'AA0000', 'D89382',
    'DDC9C9', 'DCCDCE', '1C6330', '68AA63', 'B5C98E', 'E1F0E5', 'a975ba',
    '6f198c']
  };
  var terrain = hillshade().updateMask(data);
  var dataVisualized = data.visualize(vis).divide(255).updateMask(0.8);
  var blended = terrain.blend(dataVisualized);
  var title = 'Landform';
  Map.addLayer(blended, {}, title);
  admin();
  var type = ['Peak/ridge (warm)', 'Peak/ridge', 'Peak/ridge (cool)', 'Mountain/divide', 'Cliff', 'Upper slope (warm)', 'Upper slope (warm)', 
  'Upper slope', 'Upper slope (cool)', 'Upper slope (flat)', 'Lower slope (warm)', 'Lower slope', 'Lower slope (cool)', 'Lower slope (flat)',
  'Valley', 'Valley (narrow)'];
  var legendLandform = legend.legendDiscrete(title, type, vis.palette, 15, 'bottom-left');
  Map.add(legendLandform);
}
// Sentinel-2 data
function sentinel2Data(){
  var data = s2.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', 20)).select(['B.*', 'MSK_CLDPRB']).map(function(img){
    var cloudBand = img.select('MSK_CLDPRB');
    return img.updateMask(cloudBand.lte(50));
  });
  var mosaic = data.median();
  return mosaic;
}
// Sentinel-2 object
function sentinel2(){
  Map.setOptions('TERRAIN');
  var data = sentinel2Data();
  var vis;
  var composite = compositeSelect.getValue();
  switch(composite){
    case 'Red Green Blue':
      vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: [2000, 2000, 2000], gamma: 1};
      break;
    case 'NIR Red Green':
      vis = {bands: ['B8', 'B4', 'B3'], min: 0, max: [4000, 2000, 2000], gamma: 1};
      break;
    case 'SWIR2 SWIR1 NIR':
      vis = {bands: ['B12', 'B11', 'B8'], min: 0, max: [3000, 3000, 4000], gamma: 1};
      break;
    case 'SWIR1 NIR Blue':
      vis = {bands: ['B11', 'B8', 'B2'], min: 0, max: [3000, 4000, 2000], gamma: 1};
      break;
    case 'NIR SWIR1 Blue':
      vis = {bands: ['B8', 'B11', 'B2'], min: 0, max: [4000, 3000, 2000], gamma: 1};
      break;
    case 'SWIR1 Blue NIR':
      vis = {bands: ['B11', 'B2', 'B8'], min: 0, max: [3000, 2000, 4000], gamma: 1};
      break;
  }
  Map.addLayer(data, vis, 'Sentinel-2');
}
// Landsat data
function landsatData(){
  var data = l8.filter(ee.Filter.lte('CLOUD_COVER', 20)).select(['B.*']).map(function(img){
    var cloudBand = ee.Algorithms.Landsat.simpleCloudScore(img).select('cloud');
    return img.updateMask(cloudBand.lte(20));
  });
  var mosaic = data.median();
  return mosaic;
}
// Sentinel-2 object
function landsat(){
  Map.setOptions('TERRAIN');
  var data = landsatData();
  var vis;
  var composite = compositeSelect.getValue();
  switch(composite){
    case 'Red Green Blue':
      vis = {bands: ['B4', 'B3', 'B2'], min: 0.05, max: [0.3, 0.3, 0.3], gamma: 1.5};
      break;
    case 'NIR Red Green':
      vis = {bands: ['B5', 'B4', 'B3'], min: 0.05, max: [0.6, 0.3, 0.3], gamma: 1.5};
      break;
    case 'SWIR2 SWIR1 NIR':
      vis = {bands: ['B7', 'B6', 'B5'], min: 0.05, max: [0.6, 0.6, 0.6], gamma: 1.5};
      break;
    case 'SWIR1 NIR Blue':
      vis = {bands: ['B6', 'B5', 'B2'], min: 0.05, max: [0.6, 0.6, 0.3], gamma: 1.5};
      break;
    case 'NIR SWIR1 Blue':
      vis = {bands: ['B5', 'B6', 'B2'], min: 0.05, max: [0.6, 0.6, 0.3], gamma: 1.5};
      break;
    case 'SWIR1 Blue NIR':
      vis = {bands: ['B6', 'B2', 'B5'], min: 0.05, max: [0.6, 0.3, 0.6], gamma: 1.5};
      break;
  }
  Map.addLayer(data, vis, 'Landsat');
}