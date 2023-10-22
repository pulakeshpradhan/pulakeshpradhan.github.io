var dates = ui.import && ui.import("dates", "image", {
      "id": "users/murillop/Amazon-Andes/date_full"
    }) || ee.Image("users/murillop/Amazon-Andes/date_full"),
    mag = ui.import && ui.import("mag", "image", {
      "id": "users/murillop/Amazon-Andes/mag_full"
    }) || ee.Image("users/murillop/Amazon-Andes/mag_full"),
    area = ui.import && ui.import("area", "table", {
      "id": "users/murillop/Amazon-Andes/study_Area_final"
    }) || ee.FeatureCollection("users/murillop/Amazon-Andes/study_Area_final"),
    PAs = ui.import && ui.import("PAs", "table", {
      "id": "users/murillop/COL_cartography/PA_5"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/PA_5"),
    sentinel = ui.import && ui.import("sentinel", "image", {
      "id": "users/murillop/Amazon-Andes/sentinel2018"
    }) || ee.Image("users/murillop/Amazon-Andes/sentinel2018");
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
var b1 = ee.Image(dates.select('a').int().rename('first'))
var b2 = ee.Image(dates.select('b').int().rename('first'))
var b3 = ee.Image(dates.select('c').int().rename('first'))
var b4 = ee.Image(dates.select('d').int().rename('first'))
var b5 = ee.Image(dates.select('e').int().rename('first'))
var b6 = ee.Image(dates.select('f').int().rename('first'))
var b7 = ee.Image(dates.select('g').int().rename('first'))
var b8 = ee.Image(dates.select('h').int().rename('first'))
var b9 = ee.Image(dates.select('i').int().rename('first'))
var b = ee.ImageCollection([b1,b2,b3,b4,b5,b6,b7,b8,b9])
//For VIDEO
var b1_2= ee.ImageCollection([b1,b2]).max()
var b1_3= ee.ImageCollection([b1,b2,b3]).max()
var b1_4= ee.ImageCollection([b1,b2, b3,b4]).max()
var b1_5= ee.ImageCollection([b1,b2, b3,b4,b5]).max()
var b1_6= ee.ImageCollection([b1,b2, b3,b4,b5,b6]).max()
var b1_7= ee.ImageCollection([b1,b2, b3,b4,b5,b6,b7]).max()
var b1_8= ee.ImageCollection([b1,b2, b3,b4,b5,b6,b7,b8]).max()
var b1_9= ee.ImageCollection([b1,b2, b3,b4,b5,b6,b7,b8,b9]).max()
var accum = ee.ImageCollection([b1,b1_2,b1_3,b1_4,b1_5,b1_6,b1_7,b1_8,b1_9])
// var accum = ee.ImageCollection([b1.addBands(b2).max(), b1.addBands(b2).addBands(b3).max()])
// print (accum)
//SECOND AND THIRD DISTURBANCE BFAST
// var b = ee.ImageCollection([b1,b2,b3,b4,b5,b6,b7,b8,b9])
// var number_disturbance = function(img){
//   var i = img.gt(0)
//   return i
// }
// var n = b.map(number_disturbance)
// var sum = n.sum()
// print(n)
// Map.addLayer(n,{},'n')
// Map.addLayer(sum,{},'suma_dist')
var bb = b.max()
var loss= bb.neq(0).updateMask(bb.neq(0))
//////////////////////MAGNITUDE//////////////////////////////////////
var m1 = ee.Image(mag.select('a').rename('first'))
var m2 = ee.Image(mag.select('b').rename('first'))
var m3 = ee.Image(mag.select('c').rename('first'))
var m4 = ee.Image(mag.select('d').rename('first'))
var m5 = ee.Image(mag.select('e').rename('first'))
var m6 = ee.Image(mag.select('f').rename('first'))
var m7 = ee.Image(mag.select('g').rename('first'))
var m8 = ee.Image(mag.select('h').rename('first'))
var m9 = ee.Image(mag.select('i').rename('first'))
var m = ee.ImageCollection([m1,m2,m3,m4,m5,m6,m7,m8,m9])
var mm = m.max().multiply(100)
//////////////////////2018///////////////REAL TIME///////
var y2018 = ee.Image(dates.select('i'))
///////////////////////////////////////////////
var bfast = bb.addBands(loss).addBands(mm).addBands(y2018).rename(['lossyear', 'loss', 'magnitude', '2018'])  //--->including total loss
var bfast = (bfast.clip(area))
var empty = ee.Image().byte()
// Paint the edges with different colors, display.
var PA = empty.paint({
  featureCollection: PAs,
  color: 'blue',
  width: 2
});
var tini= ee.Geometry.Polygon(
        [[[-74.159977675189, 2.3587881803377404],
          [-74.159977675189, 2.2730276051801908],
          [-73.98900294374369, 2.2730276051801908],
          [-73.98900294374369, 2.3587881803377404]]], null, false)
// Paint the edges with different colors, display.
var studyarea = empty.paint({featureCollection: area,color: 'blue',width: 2});
var tini_subset = empty.paint({featureCollection: tini,color: 'blue',width: 2});
////////////////Gray background/////////////////////
var GRAYMAP = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
var sen_vis = {"opacity":0.05,"bands":["swir2","nir","green"],"min":474.9,"max":3446.1,"gamma":1};
var sen_vis2 ={"opacity":0.05,"bands":["nir","swir2","green"],"min":542.96,"max":3325.04,"gamma":1};
var rgb = accum.map(function(img) { //it could be b or accum
    return img.visualize({
    min: 2010,
    max: 2018,
    //palette: ["000000","000000","000000","dfdfdf","dfdfdf","dfdfdf","dfdfdf","FFFFFF","FFFFFF"],
    palette: ["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],
    forceRgbOutput: true
  }).clip(tini).blend(sentinel.visualize(sen_vis2)) //Functional //ch2_studyarea
})
var gifParams = {
  'region': tini,
  'dimensions': 512,
  'crs': 'EPSG:32618',
  'framesPerSecond': 2,
  'format': 'gif'
};
// set position of panel
var video1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '0px',
    //padding: '8px 15px', 
    backgroundColor: 'FFFFFF'
  }
});
var label_gif = ui.Label('Background: Sentinel-2 2018.\nWhite patches indicate accumulated disturbance 2010-2018 in Tinigua subset.\nHuge expansion is detected in 2018. Please see labels in the graphical abstract', {whiteSpace:'pre'});
/*
 * Configure layers and locations
 */
//var bfast = ee.Image('UMD/hansen/global_forest_change_2017_v1_5');
var layerProperties = {
  'Disturbance year': {
    name: 'lossyear',
    visParams: {min: 2010, max: 2018, palette: ['yellow', 'orange', 'red']},
    legend: [
      {'2018': 'red'}, {'...': 'orange'}, {'2010': 'yellow'},
      //{'No loss': 'black'} , {'Water or no data': 'grey'}
    ],
    defaultVisibility: true
  },
  // 'Total loss': {
  //   name: 'loss',
  //   visParams: {min: 0, max: 1, palette: ['black', 'red']},
  //   legend:
  //       //[{'Loss': 'red'}, {'No loss': 'black'}, {'Water or no data': 'grey'}], //Comente esta completa
  //       [{'Pérdida ': 'red'}],
  //   defaultVisibility: false
  // },
  'Change Magnitude': {
    name: 'magnitude',
    visParams: {min: -16, max: -2, palette: ['red', 'blue']},
    legend: [
      {'-12--16': '#ff0000'}, {'-8--12': '#d13fee'}, {'-4--8': '#9f52dd'},
      {'0--4': '#6a5acd'}//, {'Water or no data': '#404040'}
    ],
    defaultVisibility: false
  },
  '2018 Near real time': {
    name: '2018',
    visParams: {min: 2018, max: 2019, palette: ['yellow', 'orange', 'red']},
    legend: [
      {'December': 'red'}, {'...': 'orange'}, {'January': 'yellow'},
    ],
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Deforestation in Puerto Guzmán' :  {lon: -75.9585, lat: 0.8622, zoom: 13},
  'Fragmentation within Protected Area Tinigua': {lon: -74.0716, lat: 2.4049, zoom: 11},
  'Coca in Puerto Asís': {lon: -76.2909, lat: 0.5792, zoom: 13}
};
/*
* Map panel configuration
*/
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
// mapPanel.setControlVisibility(
//     {all: false, zoomControl: true, mapTypeControl: true});
mapPanel.setOptions('Gray', {'Gray': GRAYMAP}).setControlVisibility(null, null, true, true, true, true)
mapPanel.add(ui.Map.Layer(studyarea, {palette:'red'}, 'Study area'))
mapPanel.add(ui.Map.Layer(PA, {palette:'blue'}, 'Protected areas'))
//mapPanel.add(ui.Map.Layer(b, {}, 'year'))
mapPanel.add(video1.add(label_gif).add(ui.Thumbnail(rgb, gifParams)))
mapPanel.addLayer(tini_subset,{palette:"black"},'Tinigua subset')
// Create the application title bar.
// mapPanel.add(ui.Label(
//     'Emapr', {fontWeight: 'bold', fontSize: '24px', position: 'bottom-left'}));
var ce = ui.Label({
    value: 'Conflict Ecology Lab', style: {fontWeight: 'bold', fontSize: '18px', position: 'bottom-left'}
  });
ce.setUrl('https://www.conflict-ecology.org/');
var emapr = ui.Label({
    value: 'eMapR Lab', style: {fontWeight: 'bold', fontSize: '18px', position: 'bottom-left'}
  });
emapr.setUrl('http://emapr.ceoas.oregonstate.edu/');
mapPanel.add(ce)
mapPanel.add(emapr)
// Center the map
var defaultLocation = locationDict['Deforestation in Puerto Guzmán'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
mapPanel.setCenter(-74.043, 1.501,8);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = bfast.select(layer.name).visualize(layer.visParams);
  var masked = addZeroAndWaterMask(image, bfast.select(layer.name));
  mapPanel.add(ui.Map.Layer(masked, {}, key, layer.defaultVisibility));
}
// Draws black and gray overlays for nodata/water/zero values.
function addZeroAndWaterMask(visualized, original) {
  // Places where there is nodata or water are drawn in gray.
  var water =
  bfast.select('loss').neq(1).selfMask().visualize({palette: 'gray'});
  // Places were the underyling value is zero are drawn in black.
  var zero = original.eq(0).selfMask().visualize({palette: 'black'});
  // Stack the images, with the gray on top, black next, and the original below.
  return ee.ImageCollection([visualized, zero, water]).mosaic();
}
/*
* Additional component configuration
*/
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Forest Disturbance: Andes-Amazon transition belt', {fontSize: '36px', color: 'blue'});
var text = ui.Label(
    'Visor of disturbance maps produced for:\n"The end of gunpoint conservation: Forests after the Colombian peace agreement',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'BFAST-Monitor', {},
    'https://iopscience.iop.org/article/10.1088/1748-9326/ab6ae3');
var linkPanel = ui.Panel(
    [ui.Label('Details about BFAST-Monitor implementation:', {fontWeight: 'bold'}), link]);
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
toolPanel.add(ui.Label('Layer selection:', {'font-size': '24px'}));
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
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
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
  ui.Label('Other places:', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);