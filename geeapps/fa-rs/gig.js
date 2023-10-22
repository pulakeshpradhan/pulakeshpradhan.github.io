var nasadem = ui.import && ui.import("nasadem", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    climate = ui.import && ui.import("climate", "imageCollection", {
      "id": "WORLDCLIM/V1/MONTHLY"
    }) || ee.ImageCollection("WORLDCLIM/V1/MONTHLY"),
    gaul0 = ui.import && ui.import("gaul0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    gaul2 = ui.import && ui.import("gaul2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    soil = ui.import && ui.import("soil", "image", {
      "id": "projects/fa-idn/assets/IDN_PEAT_BIGBRG_20200219"
    }) || ee.Image("projects/fa-idn/assets/IDN_PEAT_BIGBRG_20200219");
// Function to zoom user location or Indonesia
function myLocation(){
  var indonesia = gaul2.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
  // Zoom to current location or Indonesia
  function current_position(point) {
    Map.centerObject(point, 10);
  }
  function oops(error) {
    Map.centerObject(indonesia, 5);
  }
  ui.util.getCurrentPosition(current_position, oops);
}
myLocation();
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
    layerList: true,
    drawingToolsControl: true
  });
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
}
resetMap();
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '400px', padding: '10px'}
});
ui.root.add(mainPanel);
// App title
var titleLabel = ui.Label({
  value: 'Geographic Information Generator',
  style: {fontWeight: 'bold', color: 'navy', fontSize: '30px', padding: '15px 0px', stretch: 'horizontal'}
});
mainPanel.add(titleLabel);
// AOI label
var aoiLabel = ui.Label({
  value: 'Select an AOI option',
});
mainPanel.add(aoiLabel);
// AOI select
var aoiSelect = ui.Select({
  items: ['GeoJSON', 'Draw AOI', 'Map bounds'],
  value: 'Draw AOI',
  style: {stretch: 'horizontal'},
  placeholder: 'Select AOI',
  onChange: function(value){
    if (value == 'Draw AOI') {
      drawSelect.style().set({shown: true});
      geojsonTextbox.style().set({shown: false});
    } else if (value == 'GeoJSON') {
      drawSelect.style().set({shown: false});
      geojsonTextbox.style().set({shown: true});
    } else {
      drawSelect.style().set({shown: false});
      geojsonTextbox.style().set({shown: false});
    }
    activateStatisticButton();
  }
});
mainPanel.add(aoiSelect);
// Select draw AOI
var drawSelect = ui.Select({
  placeholder: 'Select a geometry or draw geometry first!',
  style: {stretch: 'horizontal'},
  onChange: function(){
    showStatistic.setDisabled(false);
  }
});
mainPanel.add(drawSelect);
// Drawing tools function
function draw(){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    drawSelect.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw();
// Function to return draw aoi as geometry
function drawGeometry(){
  var geomName = drawSelect.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Textbox to add geojson string
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(){
    activateStatisticButton();
  }
});
mainPanel.add(geojsonTextbox);
// Function to have a geometry with geojson
function geojson(){
  var string = geojsonTextbox.getValue();
  var jsonString = JSON.parse(string);
  print(jsonString)
  var geometryJSON = ee.FeatureCollection(jsonString).geometry();
  print(geometryJSON)
  return geometryJSON;
}
// Function to get Map bounds
function mapBounds(){
  var bounds = ee.Geometry(Map.getBounds(true));
  return bounds;
}
// Function to decide AOI
function aoi(){
  // AOI
  var aoiFeature;
  var aoiStatus = aoiSelect.getValue();
  switch (aoiStatus) {
    case 'GeoJSON':
      aoiFeature = geojson();
      break;
    case 'Draw AOI':
      aoiFeature = drawGeometry();
      break;
    case 'Map bounds':
      aoiFeature = mapBounds();
      break;
  }
  return aoiFeature;
}
// Show image button
var showStatistic = ui.Button({
  label: 'Calculate statistic',
  style: {stretch: 'horizontal', fontWeight: 'bold'},
  disabled: true,
  onClick: function(){
    calculate();
  }
});
mainPanel.add(showStatistic);
// Function to activate show images
function activateStatisticButton(){
  var aoiStatus = aoiSelect.getValue();
  var geojsonstatus = geojsonTextbox.getValue();
  var drawSelectStatus = drawSelect.getValue();
  if (aoiStatus == 'GeoJSON' && geojsonstatus !== null) {
    showStatistic.setDisabled(false);
  } else if (aoiStatus == 'Draw AOI' && drawSelectStatus !== null) {
    showStatistic.setDisabled(false);
  } else if (aoiStatus == 'Map bounds') {
    showStatistic.setDisabled(false);
  } else {
    showStatistic.setDisabled(true);
  }
}
activateStatisticButton();
// Zoom to aoi function
function zoomAoi(){
  // AOI
  var aoiFeature = aoi();
  var aoiStatus = aoiSelect.getValue();
  if (aoiStatus == 'GeoJSON'){
    // Zoom to AOI
    Map.centerObject(aoiFeature, 10); 
  }
}
// Function to get DEM
function hillshade(){
  var bounds = aoi();
  var elevation = nasadem.select('elevation').clip(bounds).multiply(20);
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
  }).resample('bicubic').updateMask(0.5);
  var SLOPE = ee.Terrain.slope(elevation).multiply(2).visualize({
    min:100,
    max:180,
    palette:['#ffffff', '#000000']
  }).resample('bicubic').updateMask(1);
  var SHADED_RELIEF = ee.ImageCollection([SLOPE, MULTI]).mosaic().reduce(ee.Reducer.median()).updateMask(1);
  var visualized = SHADED_RELIEF.visualize({min: 0, max: 1});
  return visualized;
}
// Legend
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Button remove AOI
var removeAoiButton = ui.Button({
  label: 'Remove AOI',
  style: {stretch: 'horizontal'},
  onClick: function(){
    Map.drawingTools().clear();
    drawSelect.items().reset([]);
    draw();
    drawSelect.setValue(null);
    showStatistic.setDisabled(true);
  }
});
mainPanel.add(removeAoiButton);
// Admin filter
function admin(){
  var geom = aoi();
  var feature = gaul2.filterBounds(geom).first();
  return feature;
}
// Country
function country(){
  var feature = admin();
  var name = feature.get('ADM0_NAME').getInfo();
  return name;
}
// Province
function province(){
  var feature = admin();
  var name = feature.get('ADM1_NAME').getInfo();
  return name;
}
// Regency
function regency(){
  var feature = admin();
  var name = feature.get('ADM2_NAME').getInfo();
  return name;
}
// Area
function area(){
  var geom = aoi();
  var size = geom.area(1).divide(10000).round().getInfo();
  var num = Number(size).toLocaleString();
  return num;
}
// DEM
function dem(){
  var geom = aoi();
  var elevation = nasadem.select('elevation').clip(geom);
  return elevation;
}
// Min elevation
function minElevation(){
  var geom = aoi();
  var elevation = dem();
  var min = elevation.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: geom,
    scale: 30,
    bestEffort: true
  }).get('elevation').getInfo();
  var num = Number(min).toLocaleString();
  return num;
}
// Min elevation
function maxElevation(){
  var geom = aoi();
  var elevation = dem();
  var max = elevation.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: geom,
    scale: 30,
    bestEffort: true
  }).get('elevation').getInfo();
  var num = Number(max).toLocaleString();
  return num;
}
// Mosaic median climate
function clim(){
  var geom = aoi();
  var data = climate;
  return data;
}
// Min temperature
function minTemp(){
  var geom = aoi();
  var iklim = clim().min().select('tmin').divide(10);
  var min = iklim.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: geom,
    scale: 30,
    bestEffort: true
  }).get('tmin').getInfo();
  return min;
}
// Max temperature
function maxTemp(){
  var geom = aoi();
  var iklim = clim().max().select('tmax').divide(10);
  var max = iklim.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: geom,
    scale: 30,
    bestEffort: true
  }).get('tmax').getInfo();
  return max;
}
// Max temperature
function precip(){
  var geom = aoi();
  var iklim = clim().max().select('prec');
  var max = iklim.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: geom,
    scale: 30,
    bestEffort: true
  }).get('prec').getInfo();
  var num = Number(max).toLocaleString();
  return num;
}
// Peat soil
function peat(){
  var geom = ee.Geometry(Map.getBounds(true));
  var peatSoil = ee.Image(soil).where(soil.eq(1), 1).where(soil.eq(2), 0);
  var scale = soil.projection().nominalScale().round();
  var area = peatSoil.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geom,
    scale: scale,
    bestEffort: true,
  }).get('b1');
  var num = ee.Number(area).pow(2).divide(100000).round().getInfo();
  var string = num.toLocaleString();
  return string;
}
// Mineral soil
function mineral(){
  var geom = ee.Geometry(Map.getBounds(true));
  var mineralSoil = ee.Image(soil).where(soil.eq(2), 1).where(soil.eq(1), 0);
  var scale = soil.projection().nominalScale().round();
  var area = mineralSoil.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geom,
    scale: scale,
    bestEffort: true,
  }).get('b1');
  var num = ee.Number(area).pow(2).divide(100000).round().getInfo();
  var string = num.toLocaleString();
  return string;
}
// Function to show statistic
function calculate(){
  // Reset map
  resetMap();
  // Zoom to AOI
  zoomAoi();
  // Variabel
  var countryName = country();
  var provinceName = province();
  var regencyName = regency();
  var areaSize = area();
  var maxElevationName = maxElevation();
  var minElevationName = minElevation();
  var maxTempName = maxTemp();
  var minTempName = minTemp();
  var rain = precip();
  var peatArea = peat();
  var mineralArea = mineral();
  // Set value to data table
  infoLayout(countryName, provinceName, regencyName, 
    areaSize, maxElevationName, minElevationName, 
    maxTempName, minTempName, rain,
    peatArea, mineralArea);
}
function infoLayout(a, b, c, d, e, f, g, h, i, j, k){
  // Panel for the number
  var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {position: 'bottom-left'}
  });
  Map.add(infoPanel);
  // Command label
  var calculateLabel = ui.Label({
    value: 'Click calculate statistis to get value!',
    style: {color: 'blue'}
  });
  infoPanel.add(calculateLabel);
  // Table
  var tableChart = ui.Chart({
    chartType: 'Table',
    downloadable: true
  });
  infoPanel.add(tableChart);
  // Add column to table
  tableChart.setDataTable(
    [ ['Variable', 'Value', 'Unit'], 
      ['Country', a, ' '],
      ['Province', b, ' '],
      ['Regency', c, ' '],
      ['Area', d, 'Hectares'],
      ['Max elevation', e, 'm'],
      ['Min elevation', f, 'm'],
      ['Max temperature', g, 'Celsius'],
      ['Min temperatur', h, 'Celsius'],
      ['Precipitation', i, 'mm/month'],
      ['Peat soil', j, 'Ha'],
      ['Mineral soil', k, 'Ha']
    ]
  );
  // Page option
  tableChart.setOptions({pageSize: 20});
  // Add table style
  tableChart.style().set({height: '300px', width: '300px'});
}
infoLayout(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');