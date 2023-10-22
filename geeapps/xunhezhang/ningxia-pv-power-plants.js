var Dunnett = ui.import && ui.import("Dunnett", "table", {
      "id": "users/xunhezhang/global_solarplant/global_solar_2020_WGS84"
    }) || ee.FeatureCollection("users/xunhezhang/global_solarplant/global_solar_2020_WGS84"),
    L8_G4 = ui.import && ui.import("L8_G4", "image", {
      "id": "users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_terrn_LST_v1"
    }) || ee.Image("users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_terrn_LST_v1"),
    L8_G3 = ui.import && ui.import("L8_G3", "image", {
      "id": "users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_terrn_v1"
    }) || ee.Image("users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_terrn_v1"),
    L8_G2 = ui.import && ui.import("L8_G2", "image", {
      "id": "users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_v1"
    }) || ee.Image("users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_GLCM30_v1"),
    L8_G1 = ui.import && ui.import("L8_G1", "image", {
      "id": "users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_v1"
    }) || ee.Image("users/xunhezhang/PV_ningxia/L8_ningxia_reflectance_v1");
var China_land = ee.FeatureCollection("users/xunhezhang/china/China_land");
var china = ee.FeatureCollection('users/xunhezhang/china/china_provinces');
var aim_region = ee.FeatureCollection('users/xunhezhang/china/china_provinces').filter(
                                  ee.Filter.eq("name", "ningxia")
                                   );
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
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
function erodeGeometry(image) {
  return image.clip(image.geometry().buffer(-7000))
}
{
var dataset1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2020-01-01','2020-12-31')
                  .filterBounds(aim_region.geometry())
                  // .filter(ee.Filter.calendarRange(9,11,'month'))
                  .map(erodeGeometry)
                  .map(maskL8sr).median();
var dataset2 = ee.ImageCollection("COPERNICUS/S2_SR")
                  .filterDate('2020-01-01','2020-12-31')
                  // .filter(ee.Filter.calendarRange(9,11,'month'))
                  .filterBounds(aim_region.geometry())
                  // .map(erodeGeometry)
                  .map(maskS2clouds).median();                  
}
var layerProperties = {
  'L8 <2020>' : {
    name: dataset1.clip(aim_region),
    visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']},
    defaultVisibility: true
  },
  'S2 <2020>': {
    name: dataset2.clip(aim_region),
    visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']},
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Example1': {lon: 106.867, lat: 37.96, zoom: 12},
  'Example2': {lon: 105.75, lat: 37.64, zoom: 13},
  'Example3': {lon: 105.025, lat: 37.560, zoom: 13},
  'Example4': {lon: 105.44, lat: 37.56, zoom: 14},  
  'Example5': {lon: 105.78, lat: 37.63, zoom: 14},  
  'Example6': {lon: 106.67, lat:38.68, zoom: 13},   
  'Example7': {lon: 106.64, lat:39.18, zoom: 13},  
  'Example8': {lon: 106.75, lat:39.36, zoom: 14},   
  'Example9': {lon: 105.56, lat:37.09, zoom: 13},  
  'Example10': {lon: 105.96, lat:37.43, zoom: 13},     
  'Whloe map, Ningxia': {lon: 106.056, lat: 37.29, zoom: 7.5},
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true, scaleControl : true});
// Center the map
var defaultLocation = locationDict['Example1'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = layer.name.visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
// var image = background.select(layer.name).visualize(layer.visParams);
//   mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('PV power plants in Ningxia autonomous region, China ', {fontSize: '28px', color: 'blue'});
var text = ui.Label(
    'Mapping from pixel-based Random Forest classifier with Landsat-8 imagery.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '360px'});
// Create a hyperlink to an external reference.
// var link = ui.Label(
//     'Xunhe Zhang', {}, //
//     'https://scholar.google.com.hk/citations?user=bnZF2NcAAAAJ&hl=zh-CN');         //
// var linkPanel = ui.Panel(
//     [ui.Label('For more information', {fontWeight: 'bold'}), link]);
// toolPanel.add(linkPanel);
ui.root.widgets().add(toolPanel);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    // mapPanel.layers().forEach(function(element, index) {
    //   element.setShown(selected == element.getName());
    // });
    if(selected === 'L8 <2020>'){
      mapPanel.layers().get(0).setShown(1)
      mapPanel.layers().get(1).setShown(0)
    } 
    else if(selected === 'S2 <2020>'){
      mapPanel.layers().get(0).setShown(0)
      mapPanel.layers().get(1).setShown(1)
    }
  },
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select Background image', {fontWeight: 'bold','font-size': '14px'}));
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
        mapPanel.layers().get(0).setShown(value);
        mapPanel.layers().get(1).setShown(value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
}
);
opacitySlider.onSlide(function(value) {
  mapPanel.layers().get(0).setOpacity(value);
  mapPanel.layers().get(1).setOpacity(value);
});
var viewPanel =
    ui.Panel([layerSelect,checkbox, opacitySlider], ui.Panel.Layout.Flow('vertical'));
toolPanel.add(viewPanel);
// Create the  Cheakbox for select results.
// mapPanel.add(ui.Map.Layer(RF_PV.updateMask(RF_PV.eq(1)), {palette: ['red']}, 'step1',false));
// mapPanel.add(ui.Map.Layer(step2.style({color: 'green', fillColor: '00000000'}),'', 'step3',false));
// mapPanel.add(ui.Map.Layer(table.style({color: 'blue', fillColor: '00000000'}), '','step2',false));
mapPanel.add(ui.Map.Layer(L8_G1.updateMask(L8_G1.eq(1)), {palette: ['4daf4a']}, 'L8_G1',false));
mapPanel.add(ui.Map.Layer(L8_G2.updateMask(L8_G2.eq(1)), {palette: ['e31a1c']}, 'L8_G1+G2',false));
mapPanel.add(ui.Map.Layer(L8_G3.updateMask(L8_G3.eq(1)), {palette: ['377eb8']}, 'L8_G1+G2+G3',false));
mapPanel.add(ui.Map.Layer(L8_G4.updateMask(L8_G4.eq(1)), {palette: ['ff7f00']}, 'L8_G1+G2+G3+G4',false));
mapPanel.add(ui.Map.Layer(Dunnett.filterBounds(aim_region.geometry()).style({color: 'aa00ff', fillColor: '00000000'}),'', "Dunnett's Dataset",false));
// Add legend
{
  //Palette for the classification
var palette = ['4daf4a','e31a1c','377eb8','ff7f00','aa00ff'];
// name of the legend
var names = ['L8_G1','L8_G1+G2','L8_G1+G2+G3','L8_G1+G2+G3+G4',"Dunnett's Dataset"];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Load results',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(seq,color, name) {
      var check = ui.Checkbox({
        label: [],
        value: false,
        onChange: function(checked) {
          mapPanel.layers().get(1+seq).setShown(checked);
        },
        style: {margin: '0 0 4px 12px'} 
      })
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [check,colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(i+1,palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
toolPanel.add(legend);
}
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Visit Example Locations', {fontWeight: 'bold','font-size': '14px'}), locationSelect
]);
toolPanel.add(locationPanel);