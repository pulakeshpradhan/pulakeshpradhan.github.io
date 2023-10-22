var hemerobyRTRW = ui.import && ui.import("hemerobyRTRW", "table", {
      "id": "projects/ee-ramiqcom/assets/hemeroby/RTRW_levelhemeroby"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/hemeroby/RTRW_levelhemeroby"),
    adm1 = ui.import && ui.import("adm1", "table", {
      "id": "projects/ee-ramiqcom/assets/admin/ADM1_DIY"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/admin/ADM1_DIY"),
    adm2 = ui.import && ui.import("adm2", "table", {
      "id": "projects/ee-ramiqcom/assets/admin/ADM2_DIY"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/admin/ADM2_DIY"),
    adm3 = ui.import && ui.import("adm3", "table", {
      "id": "projects/ee-ramiqcom/assets/admin/ADM3_DIY"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/admin/ADM3_DIY"),
    adm4 = ui.import && ui.import("adm4", "table", {
      "id": "projects/ee-ramiqcom/assets/admin/ADM4_DIY"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/admin/ADM4_DIY"),
    nasadem = ui.import && ui.import("nasadem", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    yogyakartaSpatial = ui.import && ui.import("yogyakartaSpatial", "table", {
      "id": "projects/ee-ramiqcom/assets/hemeroby/Yogyakarta_Spatial"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/hemeroby/Yogyakarta_Spatial"),
    diyLandcover = ui.import && ui.import("diyLandcover", "table", {
      "id": "projects/ee-ramiqcom/assets/hemeroby/DIY_Landcover"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/hemeroby/DIY_Landcover"),
    diySpatial = ui.import && ui.import("diySpatial", "table", {
      "id": "projects/ee-ramiqcom/assets/hemeroby/DIY_Spatial"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/hemeroby/DIY_Spatial"),
    hemerobyLanduse = ui.import && ui.import("hemerobyLanduse", "table", {
      "id": "projects/ee-ramiqcom/assets/hemeroby/Levelhemeroby_2019"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/hemeroby/Levelhemeroby_2019");
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
  });
  // Center map to DIY
  Map.centerObject(adm1, 10);
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
  value: 'Hemeroby index for analysis and evaluation of human intervention in the Special Region of Yogyakarta',
  style: {fontWeight: 'bold', color: 'orange', fontSize: '25px', padding: '10px 0px', stretch: 'horizontal'}
});
mainPanel.add(titleLabel);
// App abstract
var abstractLabel = ui.Label({
  value: 'The Special Region of Yogyakarta is one of the provinces in Java with a high population growth rate. Population growth leads to high development activities that can cause changes in land use. The use of the Hemeroby concept aims to determine the level of human intervention in the study area. The use of land use data in 2019 to determine the current degree and index of hemeroby, while data from the Regional Spatial Plan (RTRW) and Detailed Spatial Planning (RDTR) to determine the degree and index of hemeroby in the future. Based on the degree and the resulting hemeroby index, the level of human intervention in the Special Region of Yogyakarta is currently strong to very strong, which has exceeded the existing spatial plan. These results indicate that monitoring the level of human intervention in landscape ecosystems needs to be carried out periodically to determine the direction of sustainable regional development to maintain biodiversity and ecosystem balance',
  style: {stretch: 'horizontal', fontSize: '10px', textAlign: 'justify'}
});
mainPanel.add(abstractLabel);
// Hemeroby select source
var sourceSelect = ui.Select({
  items: ['Hemeroby land use', 'Hemeroby spatial planning', 'DIY land use', 'DIY spatial planning'],
  value: 'Hemeroby spatial planning',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value == 'Hemeroby land use' || value == 'Hemeroby spatial planning'){
      showHeme();
      aggrSelect.setDisabled(false);
    } else {
      elseCover();
      aggrSelect.setDisabled(true);
    }
  }
});
mainPanel.add(sourceSelect);
// Aggregation select
var aggrSelect = ui.Select({
  items: ['Dasymetric', 'Regency', 'District', 'Village'],
  value: 'Dasymetric',
  style: {stretch: 'horizontal'},
  onChange: function(){
    showHeme();
  }
});
mainPanel.add(aggrSelect);
// Border choice
var borderSelect = ui.Select({
  items: ['None', 'Regency', 'District', 'Village'],
  value: 'Regency',
  style: {stretch: 'horizontal'},
  onChange: function(){
    adminBorder();
  }
});
mainPanel.add(borderSelect);
// Legend tool
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Function to show land cover DIY
function landCoverDIY(){
  var feature = diyLandcover;
  var coverList = feature.sort('Legenda').aggregate_array('Legenda').distinct();
  var coverLength = coverList.length();
  var cover1 = feature.filter(ee.Filter.eq('Legenda', coverList.get(0))).map(function(feat){return feat.set({'class_id': 1})});
  var cover2 = feature.filter(ee.Filter.eq('Legenda', coverList.get(1))).map(function(feat){return feat.set({'class_id': 2})});
  var cover3 = feature.filter(ee.Filter.eq('Legenda', coverList.get(2))).map(function(feat){return feat.set({'class_id': 3})});
  var cover4 = feature.filter(ee.Filter.eq('Legenda', coverList.get(3))).map(function(feat){return feat.set({'class_id': 4})});
  var cover5 = feature.filter(ee.Filter.eq('Legenda', coverList.get(4))).map(function(feat){return feat.set({'class_id': 5})});
  var cover6 = feature.filter(ee.Filter.eq('Legenda', coverList.get(5))).map(function(feat){return feat.set({'class_id': 6})});
  var cover7 = feature.filter(ee.Filter.eq('Legenda', coverList.get(6))).map(function(feat){return feat.set({'class_id': 7})});
  var cover8 = feature.filter(ee.Filter.eq('Legenda', coverList.get(7))).map(function(feat){return feat.set({'class_id': 8})});
  var cover9 = feature.filter(ee.Filter.eq('Legenda', coverList.get(8))).map(function(feat){return feat.set({'class_id': 9})});
  var cover10 = feature.filter(ee.Filter.eq('Legenda', coverList.get(9))).map(function(feat){return feat.set({'class_id': 10})});
  var cover11 = feature.filter(ee.Filter.eq('Legenda', coverList.get(10))).map(function(feat){return feat.set({'class_id': 11})});
  var cover12 = feature.filter(ee.Filter.eq('Legenda', coverList.get(11))).map(function(feat){return feat.set({'class_id': 12})});
  var featureNew = cover1.merge(cover2).merge(cover3).merge(cover4).merge(cover5).merge(cover6).merge(cover7).merge(cover8).merge(cover9).merge(cover10).merge(cover11).merge(cover12);
  var palette = ['azure', 'olive', 'green', 'lime', 'red', 'yellow', 'gray', 'orange', 'chocolate', 'aqua', 'navy', 'beige'];
  var painted = ee.Image().byte().paint({
    featureCollection: featureNew,
    color: 'class_id'
  });
  var vis = {palette: palette, min: 1, max: 12, opacity: 0.8};
  Map.addLayer(painted, vis);
  var legend = legendTool.legendDiscrete('DIY Land Use', coverList.getInfo(), palette, coverLength.getInfo(), 'bottom-left');
  Map.add(legend);
}
// Function for land cover sleman
function spatialPlanningDIY(){
  var feature = diySpatial;
  var coverList = feature.sort('NAMA_KWSN').aggregate_array('NAMA_KWSN').distinct();
  var kawasanCount = coverList.length();
  var cover1 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(0))).map(function(feat){return feat.set({'class_id': 1})});
  var cover2 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(1))).map(function(feat){return feat.set({'class_id': 2})});
  var cover3 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(2))).map(function(feat){return feat.set({'class_id': 3})});
  var cover4 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(3))).map(function(feat){return feat.set({'class_id': 4})});
  var cover5 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(4))).map(function(feat){return feat.set({'class_id': 5})});
  var cover6 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(5))).map(function(feat){return feat.set({'class_id': 6})});
  var cover7 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(6))).map(function(feat){return feat.set({'class_id': 7})});
  var cover8 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(7))).map(function(feat){return feat.set({'class_id': 8})});
  var cover9 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(8))).map(function(feat){return feat.set({'class_id': 9})});
  var cover10 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(9))).map(function(feat){return feat.set({'class_id': 10})});
  var cover11 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(10))).map(function(feat){return feat.set({'class_id': 11})});
  var cover12 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(11))).map(function(feat){return feat.set({'class_id': 12})});
  var cover13 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(12))).map(function(feat){return feat.set({'class_id': 13})});
  var cover14 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(13))).map(function(feat){return feat.set({'class_id': 14})});
  var cover15 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(14))).map(function(feat){return feat.set({'class_id': 15})});
  var cover16 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(15))).map(function(feat){return feat.set({'class_id': 16})});
  var cover17 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(16))).map(function(feat){return feat.set({'class_id': 17})});
  var cover18 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(17))).map(function(feat){return feat.set({'class_id': 18})});
  var cover19 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(18))).map(function(feat){return feat.set({'class_id': 19})});
  var cover20 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(19))).map(function(feat){return feat.set({'class_id': 20})});
  var cover21 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(20))).map(function(feat){return feat.set({'class_id': 21})});
  var cover22 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(21))).map(function(feat){return feat.set({'class_id': 22})});
  var cover23 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(22))).map(function(feat){return feat.set({'class_id': 23})});
  var cover24 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(23))).map(function(feat){return feat.set({'class_id': 24})});
  var cover25 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(24))).map(function(feat){return feat.set({'class_id': 25})});
  var cover26 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(25))).map(function(feat){return feat.set({'class_id': 26})});
  var cover27 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(26))).map(function(feat){return feat.set({'class_id': 27})});
  var cover28 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(27))).map(function(feat){return feat.set({'class_id': 28})});
  var cover29 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(28))).map(function(feat){return feat.set({'class_id': 29})});
  var cover30 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(29))).map(function(feat){return feat.set({'class_id': 30})});
  var cover31 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(30))).map(function(feat){return feat.set({'class_id': 31})});
  var cover32 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(31))).map(function(feat){return feat.set({'class_id': 32})});
  var cover33 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(32))).map(function(feat){return feat.set({'class_id': 33})});
  var cover34 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(33))).map(function(feat){return feat.set({'class_id': 34})});
  var cover35 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(34))).map(function(feat){return feat.set({'class_id': 35})});
  var cover36 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(35))).map(function(feat){return feat.set({'class_id': 36})});
  var cover37 = feature.filter(ee.Filter.eq('NAMA_KWSN', coverList.get(36))).map(function(feat){return feat.set({'class_id': 37})});
  var featureNew = cover1.merge(cover2).merge(cover3).merge(cover4).merge(cover5).merge(cover6).merge(cover7).merge(cover8).merge(cover9).merge(cover10).merge(cover11).merge(cover12).merge(cover13).merge(cover14).merge(cover15).merge(cover16).merge(cover17).merge(cover18).merge(cover19).merge(cover20).merge(cover21).merge(cover22).merge(cover23).merge(cover24).merge(cover25).merge(cover26).merge(cover27).merge(cover28).merge(cover29).merge(cover30).merge(cover31).merge(cover32).merge(cover33).merge(cover34).merge(cover35).merge(cover36).merge(cover37);
  var palette = ['azure', 'olive', 'green', 'lime', 'red', 'yellow', 'gray', 'orange', 'chocolate', 'aqua', 'navy', 'beige', 'indigo', 'purple', 'magenta', 'maroon', 'fuchsia', 'teal', 'pink', 'violet', 'crimson', 'salmon', 'coral', 'gold', 'khaki', 'sienna', 'rosybrown', 'wheat', 'bisque', 'seagreen', 'palegreen', 'greenyellow', 'cyan', 'aquamarine', 'cadetblue', 'skyblue', 'dodgerblue'];
  var painted = ee.Image().byte().paint({
    featureCollection: featureNew,
    color: 'class_id'
  });
  var vis = {palette: palette, min: 1, max: 37, opacity: 0.8};
  Map.addLayer(painted, vis);
  var legend = legendTool.legendDiscrete('DIY Spatial Planning', coverList.getInfo(), palette, kawasanCount.getInfo(), 'bottom-left');
  Map.add(legend);
}
// Function to show other than hemeroby
function elseCover(){
  // Reset map
  resetMap();
  dem();
  var sourceStatus = sourceSelect.getValue();
  switch (sourceStatus) {
    case 'DIY land use':
      landCoverDIY();
      break;
    case 'DIY spatial planning':
      spatialPlanningDIY();
      break;
  }
  // Add menu for download
  download();
  // Show border
  adminBorder();
}
// Function to convert vector to raster hemeroby
function hemerobyRaster(){
  var hemeroby;
  var sourceStatus = sourceSelect.getValue();
  switch (sourceStatus) {
    case 'Hemeroby spatial planning':
      hemeroby = hemerobyRTRW;
      break;
    case 'Hemeroby land use':
      hemeroby = hemerobyLanduse;
      break;
  }
  var rasterHemeroby = hemeroby.reduceToImage({
    properties: ['Nilai_Heme'],
    reducer: ee.Reducer.first()
  }).select('first').rename('Hemeroby');
  return rasterHemeroby.clip(adm1).toInt();
}
// Function to show dasymetric hemeroby
function hemerobyShow(){
  var hemeroby = hemerobyRaster();
  // Title for layer
  var title = 'Hemeroby';
  // Hemeroby class list
  var hemeClass = hemerobyRTRW.sort('Nilai_Heme').aggregate_array('Hemeroby').distinct();
  var hemeLegend = hemeClass.getInfo();
  // Hemeroby class length
  var hemeLength = hemeClass.length();
  var hemeCount = hemeLength.getInfo();
  // Palette for visual
  var palette = ['darkgreen', 'green', 'greenyellow', 'yellow', 'orange', 'orangered', 'red'];
  // Visual parameter
  var vis = {palette: palette, min: 1, max: 7};
  // Add layer to map
  Map.addLayer(hemeroby, vis, title, true, 0.8);
  // Legend
  var legend = legendTool.legendDiscrete(title, hemeLegend, palette, hemeCount, 'bottom-left');
  // Add legend to map
  Map.add(legend);
}
// Function to aggregate
function aggr(){
  var hemeroby = hemerobyRaster();
  var regency = adm2;
  var district = adm3;
  var village = adm4;
  var aggrFeature;
  var aggrStatus = aggrSelect.getValue();
  switch (aggrStatus) {
    case 'Regency':
      aggrFeature = adm2;
      break;
    case 'District':
      aggrFeature = adm3;
      break;
    case 'Village':
      aggrFeature = adm4;
      break;
  }
  var aggrHeme = hemeroby.reduceRegions({
    collection: aggrFeature,
    reducer: ee.Reducer.mean(),
    scale: 10,
  });
  return aggrHeme;
}
// Show aggregation hemeroby
function showAggr(){
  var hemeroby = aggr();
  // Palette
  var palette = ['green', 'yellow', 'red'];
  // Visual parameter
  var vis = {palette: palette, min: 1, max: 7};
  // Title for layer
  var title = 'Hemeroby Index';
  // Painted
  var painted = ee.Image().byte().paint({
    featureCollection: hemeroby,
    color: 'mean'
  }).clip(adm1);
  // Add to layer to map
  Map.addLayer(painted, vis, title, true, 0.8);
  // Legend
  var legend = legendTool.legendGradient(title, vis, 'bottom-left');
  Map.add(legend);
}
// Function to get DEM
function dem(){
  var bounds = adm1;
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
  var hillVis = {min:0, max:255, gamma:1};
  Map.addLayer(SHADED_RELIEF, hillVis, 'Hillshade');
}
// Function to show hemeroby to map
function showHeme(){
  // Reset map
  resetMap();
  // Add DEM
  dem();
  var aggrStatus = aggrSelect.getValue();
  var sourceStatus = sourceSelect.getValue();
  if ((sourceStatus == 'Hemeroby land use' || sourceStatus == 'Hemeroby spatial planning') && aggrStatus == 'Dasymetric'){
    hemerobyShow();
  } else if ((sourceStatus == 'Hemeroby land use' || sourceStatus == 'Hemeroby spatial planning') && aggrStatus !== 'Dasymetric'){
    showAggr();
  }
  // Add menu for inspect
  showIndex();
  // Add menu for download
  download();
  // Show border
  adminBorder();
}
showHeme();
// Function to add border
function adminBorder(){
  var oldBorder = Map.layers().get(2);
  if (oldBorder !== undefined) {
    Map.remove(oldBorder);
  }
  var regency = adm2;
  var district = adm3;
  var village = adm4;
  var aggrFeature;
  var aggrStatus = borderSelect.getValue();
  switch (aggrStatus) {
    case 'Regency':
      aggrFeature = adm2;
      break;
    case 'District':
      aggrFeature = adm3;
      break;
    case 'Village':
      aggrFeature = adm4;
      break;
  }
  var painted = ee.Image().byte().paint({
    featureCollection:aggrFeature,
    color: 1,
    width: 0.1
  });
  Map.addLayer(painted, {palette: 'black'}, 'Border', true, 0.8);
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
  // Hemeroby category
  var hemeLabel = ui.Label({
    value: 'Hemeroby:'
  });
  infoPanel.add(hemeLabel);
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
    var image = Map.layers().get(1).getEeObject();
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
    // Add hemeroby type
    var valueNumber = ee.Number(pixel).getInfo();
    var hemeName;
    if (valueNumber >= 7) {
      hemeName = 'Metahemerobic';
    } else if (valueNumber >= 6) {
      hemeName = 'Polyhemerobic';
    } else if (valueNumber >= 5) {
      hemeName = 'a-Euhemerobic';
    } else if (valueNumber >= 4) {
      hemeName = 'b-Euhemerobic';
    } else if (valueNumber >= 3) {
      hemeName = 'Mesohemerobic';
    } else if (valueNumber >= 2) {
      hemeName = 'Oligohemerobic';
    } else if (valueNumber >= 1) {
      hemeName = 'Ahemerobic';
    }
    hemeLabel.setValue('Hemeroby: ' + hemeName);
    // Get admin name
    var area = adm4;
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
      var visualStatus = aggrSelect.getValue();
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
    var image = Map.layers().get(1);
    var object = image.getEeObject();
    var title = image.getName();
    var band = image.getVisParams().bands;
    var geometry = adm1.geometry();
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
    var image = Map.layers().get(1);
    var object = image.getEeObject();
    var title = image.getName();
    var regency = adm2;
    var district = adm3;
    var village = adm4;
    var aggrStatus = aggrSelect.getValue();
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