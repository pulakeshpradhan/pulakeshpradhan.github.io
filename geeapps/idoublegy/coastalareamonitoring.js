var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    lc10m = ui.import && ui.import("lc10m", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/idoublegy/westafrica_final"
    }) || ee.FeatureCollection("users/idoublegy/westafrica_final"),
    mangrove = ui.import && ui.import("mangrove", "image", {
      "id": "users/idoublegy/westafrica_mangrove_change"
    }) || ee.Image("users/idoublegy/westafrica_mangrove_change");
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first();
//var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
//.select('discrete_classification');
var clip=dataset.clip(table);
Map.centerObject(clip);
print('clip', clip);
print('mangrove', mangrove);
// Create a collection with fromImages().
var images1 = ee.Image([
   mangrove,
  clip,
   ]);
 print('images1', images1);
 var renamed = images1.select(
  ['mang20', 'mang15','change','Map',], // old names
  ['mang19','mang09','change','map',]               // new names
);
/*
var images = {
  'sg': image.select('mang20'),
  'sl': image2.select('mang20'),
 'lc': image9.select('b1','b2','b3','b4'),
};
print('lc10m', lc10m);
*/
/*
var renamed = images1.select(
  ['mang20', 'mang20_1', 'mang20_2','mang20_3','mang20_4', 'mang20_5','mang20_6','b1','b2','b3','b4','Map',], // old names
  ['ghana', 'guinea', 'Ivory','Nigeria','tg','sg','sl','b','g','r','s','map',]               // new names
);
var classMask = renamed.select('ghana', 'guinea', 'Ivory','Nigeria','tg','sg','sl').gt(0)
var classed= renamed.updateMask(classMask)
print('renamed', renamed);*/
/*
Export.image.toDrive({
  image: renamed,
  description: 'wa_data_stack',
  scale: 10,
  region: wa,
  maxPixels: 1e9
});
*/
var layerProperties = {
      'Mangrove Extent Map 2019': {
    name:'mang19',
  //  var visPar = {bands:['B4','B3','B2'], min: 0.0, max: 0.3}; 
      visParams: {  min: 0.1, max: 1, palette: ['F4F9F9','green']},
    legend: [
      {'Mangrove': 'green'},{'Other Feature': 'white'}
      ],
    defaultVisibility: true
  },
      'Mangrove Extent Map 2009': {
    name:'mang09',
  //  var visPar = {bands:['B4','B3','B2'], min: 0.0, max: 0.3}; 
      visParams: {  min: 0, max: 1, palette: ['F4F9F9','Blue']},
    legend: [
      {'Mangrove': 'green'},{'Other Feature': 'white'}
      ],
    defaultVisibility: false
  },
      'Mangrove Change Map 2009-2019': {
    name: 'change',
    visParams: {min: 0, max: 1, palette: ['F4F9F9','red',]},
    legend: [
      {'Mangrove': 'green'},{'Other Feature': 'white'}
      ],
    defaultVisibility: false
  },
'Landcover Map': {
    name: 'map',
    visParams:  {min: 10, max: 100, palette: ['006400', 'ffbb22','ffff4c','f096ff', 'red','B4B4B4',
    '0064c8',
    '0096a0',
    '00cf75', ]},
    legend: [  
     {'Trees': '006400'},{'Shrubland': 'FFBB22'}, {'Grassland': 'FFFF4C'}, {'Cropland/Agriculture': 'F096FF'},{'Urban/Built-up ': 'red'}, {'Barren / sparse vegetation': 'B4B4B4'}, {'Open water': '0064c8'},{'Herbaceous wetland': '0096A0'},{'Mangroves': '00cf75'}
           ],
    defaultVisibility: false
  },
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
 'Ghana': {lon: -1.2239510387139996,lat: 5.148670510632946, zoom: 9},
 'Togo':{lon: 1.4917254694569637,lat: 6.243717998298798, zoom: 10},
 'Benin':{lon: 2.2643305499378252, lat: 6.39113274621905, zoom: 10},
 'Nigeria': {lon: 5.626567312240911,latitude: 4.752379941804837,zoom: 8 },
 '(Ghana) Keta Anlo Ramsar Site': {lon: 0.778, lat: 5.8946, zoom: 11},
 '(Nigeria) Niger Delta': {lon: 6.3222, lat: 4.4691, zoom: 9},
 '(Senegal) Saloum Delta': {lon:-16.49861  , lat:13.83528, zoom: 11}
};
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['(Ghana) Keta Anlo Ramsar Site'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image =renamed.select(layer.name).visualize(layer.visParams);
  //var masked = addZeroAndWaterMask(image, hansen.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
/*
// Draws black and gray overlays for nodata/water/zero values.
function addZeroAndWaterMask(visualized, original) {
  // Places where there is nodata or water are drawn in gray.
  var water =
      hansen.select('datamask').neq(1).selfMask().visualize({palette: 'gray'});
  // Places were the underyling value is zero are drawn in black.
  var zero = original.eq(0).selfMask().visualize({palette: 'black'});
  // Stack the images, with the gray on top, black next, and the original below.
  return ee.ImageCollection([visualized, zero, water]).mosaic();
}
*/
/*
 * Additional component configuration
 */
 //Add logo
 var logo = ee.Image('users/idoublegy/loogo1').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1047x375',
        format: 'png'
        },
    style: {height: '85px', width: '250px',padding :'30'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Add a title and some explanatory text to a side panel.
var title = ui.Label('Regional Marine Centre', {fontSize: '20px', color: 'blue'});
var header = ui.Label('West Africa Coastal Area Mapping', {fontSize: '16px', color: 'black'});
var text = ui.Label(
    'Mangrove distribution using a combination of Sentinel-2 and UAV data (Regional Marine Centre) and 10m Landcover map (ESA/VITO/Brockmann Consult/CS/GAMMA Remote Sensing/IIASA/WUR) in coastal west Africa ',
    {fontSize: '13px'});
//var toolPanel1 = ui.Panel([header, text], 'flow', {width: '300px'});
//ui.root.widgets().add(toolPanel);
toolPanel.add(title);
toolPanel.add(header);
toolPanel.add(text);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Regional Marine Centre Geoportal', {},
    'https://geoportal.gmes.ug.edu.gh');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
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
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select Layer', {'font-size': '14px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
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
  ui.Label('Visit Predefined Locations', {'font-size': '14px'}), locationSelect
]);
toolPanel.add(locationPanel);