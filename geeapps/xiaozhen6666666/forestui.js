var image = ui.import && ui.import("image", "image", {
      "id": "users/xiaozhen6666666/jx_cla_1990"
    }) || ee.Image("users/xiaozhen6666666/jx_cla_1990"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/xiaozhen6666666/forest/changeTypes"
    }) || ee.Image("users/xiaozhen6666666/forest/changeTypes"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/xiaozhen6666666/forest/change_times"
    }) || ee.Image("users/xiaozhen6666666/forest/change_times"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/xiaozhen6666666/forest/p"
    }) || ee.Image("users/xiaozhen6666666/forest/p"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/xiaozhen6666666/forest/recently_BreakSegment"
    }) || ee.Image("users/xiaozhen6666666/forest/recently_BreakSegment"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/xiaozhen6666666/forest/sensSlope"
    }) || ee.Image("users/xiaozhen6666666/forest/sensSlope"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/xiaozhen6666666/forest/slt_scale"
    }) || ee.Image("users/xiaozhen6666666/forest/slt_scale"),
    region = ui.import && ui.import("region", "table", {
      "id": "users/xiaozhen6666666/forest/jx_all"
    }) || ee.FeatureCollection("users/xiaozhen6666666/forest/jx_all");
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
/*
 * Configure layers and locations
 */
var hansen = image.addBands(image2)
.addBands(image3).addBands(image4)
.addBands(image5).addBands(image6).addBands(image7)
print(hansen)
var layerProperties = {
  'classification': {
    name: 'classification',
    visParams: {min: 0, max: 1, palette: ['gray', 'lightgreen']},
    legend: [
      {'ohter': 'white'}, {'forest': 'lightgreen'},
    ],
    defaultVisibility: true
  },
   'changeType': {
    name: 'first',
    visParams: {min: 0, max: 4, palette: ['white','red','green','orange','lightgreen']},
    legend: [
      {'deforestation': 'red'}, {'reforestation': 'green'}, {'degradation': 'orange'},
      {'regeneration': 'lightgreen'}
    ],
    defaultVisibility: true
  },
   'break times': {
    name: 'times',
    visParams: {min: 0, max: 3, palette: ['green','orange','red']},
    legend: [
      {'once': 'green'}, {'twice': 'orange'}, {'three times': 'red'},
    ],
    defaultVisibility: true
  },
   'time of last abrupt change': {
    name: 'tBreak',
    visParams: {min: 1990, max: 2020, palette: ['blue', 'green', 'red']},
    legend: [
      {'2020': 'red'}, {'...': 'green'}, {'1990': 'blue'},
      {'No break': 'black'}
    ],
    defaultVisibility: true
  },
   'M-K slope': {
    name: 'slope_median',
    visParams: {min: -100, max: 100, palette: ['red', 'green']},
    legend: [
      {'-200': 'red'}, {'...': 'green'}, {'200': 'green'},
    ],
    defaultVisibility: true
  },  
   'SLT slope': {
    name: 'scale',
    visParams: {min: -100, max: 100, palette: ['red', 'green']},
    legend: [
      {'-200': 'red'}, {'...': 'green'}, {'200': 'green'},
    ],
    defaultVisibility: true
  },   
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Jiangxi': {lon: 114.9042, lat: 27.0875, zoom: 8},
  'Jiujiang': {lon: 116.0019, lat: 29.7051, zoom: 11},
  'Ganzhou': {lon: 114.9335, lat: 25.8307, zoom: 11}
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Jiangxi'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = hansen.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
// Draws black and gray overlays for nodata/water/zero values.
// function addZeroAndWaterMask(visualized, original) {
//   // Places where there is nodata or water are drawn in gray.
//   var water =
//       hansen.select('datamask').neq(1).selfMask().visualize({palette: 'gray'});
//   // Places were the underyling value is zero are drawn in black.
//   var zero = original.eq(0).selfMask().visualize({palette: 'black'});
//   // Stack the images, with the gray on top, black next, and the original below.
//   return ee.ImageCollection([visualized, zero, water]).mosaic();
// }
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('江西省森林资源监测系统', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    '用于1990-2019年森林覆盖变化分析，并评估生态造林工程效果',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
// var link = ui.Label(
//     'Science paper by Hansen, Potapov, Moore, Hancher et al.', {},
//     'http://science.sciencemag.org/content/342/6160/850');
// var linkPanel = ui.Panel(
//     [ui.Label('For more information', {fontWeight: 'bold'}), link]);
// toolPanel.add(linkPanel);
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
toolPanel.add(ui.Label('查看不同的图层', {'font-size': '24px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    '图例',
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
  label: '透明度',
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
  ui.Label('查看典型区域', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);
// Click on the map to inspect the CCDC results for a single pixel (in the console).
// Tweak the collection creation as you want (add additional bands or use Sentinel 1?).
// You might need to update the CCDC configuration to pick up missed breaks.
// Look at ee.Algorithms.TemporalSegmentation.Ccdc() in the EE docs.
// Change config -> rerun -> change config -> rerun, until you're happy
// Then continue to the next example script, which exports the CCDC product as an asset.
var temporalSegmentation = require('users/xiaozhen6666666/temporalSegmentation:temporalSegmentation')
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'EVI变化分析',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('在地图上单击，选择一个点')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
function chartPoint(latLon) {
  var point = ee.Geometry.Point([latLon.lon, latLon.lat])
  var collection = createLandsatCollection({
    region: point,
    start: '1982-01-01',
    end: '2021-01-01', 
    mapImage: function(image) { return image.addBands(toEVI(image)) }
  })
  var ccdc = ee.Algorithms.TemporalSegmentation.Ccdc({
    collection: collection,
    breakpointBands:['evi'],
    dateFormat: 1
  })
  temporalSegmentation.chartPoint({
    image: ccdc,
    point: point,
    bandName: 'evi',
    dateFormat:1,
    // If you don't plot the raw collection, this will be faster.
    // Just comment it out if you want
    collection: collection,
    callback: function (chart) {
      panel.widgets().set(2, chart)
    }
  })
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + latLon.lon.toFixed(2)),
  lat.setValue('lat: ' + latLon.lat.toFixed(2));
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
}
mapPanel.onClick(chartPoint)
mapPanel.setOptions('HYBRID')
mapPanel.style().set('cursor', 'crosshair')
ui.root.insert(0, panel);
/////////////////////////////////////////////////////////
// Generic utility functions to create ImageCollection //
/////////////////////////////////////////////////////////
function toEVI(image){
    var bands = image.select('red', 'nir', 'blue')
    return bands.expression(
      '2.5 * (i.nir - i.red) / (i.nir + 6 * i.red - 7.5 * i.blue + 10000)',
      {i: bands}
      ).multiply(10000).rename('evi')
}
function toNDVI(image){
    var bands = image.select('red', 'nir')
    return bands.expression(
      '(i.nir-i.red) / (i.nir+i.red)',
      {i: bands}
      ).multiply(10000).rename('ndvi')
}
function createLandsatCollection(params) {
    var defaultParams = {
      region: Map.getBounds(true), 
      start: '1982-01-01', 
      end: formatDate(new Date()), 
      mapImage: function (image) { return image }
    }
    params = mergeObjects([defaultParams, params])
    var filter = ee.Filter.and(
        ee.Filter.bounds(params.region),
        ee.Filter.date(params.start, params.end  )
    )
    var cloudMaskL457 = function(image) {
    var qa = image.select('pixel_qa');
    // If the cloud bit (5) is set and the cloud confidence (7) is high
    // or the cloud shadow bit is set (3), then it's a bad pixel.
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
    // Remove edge pixels that don't occur in all bands
    var mask2 = image.mask().reduce(ee.Reducer.min());
    return image.updateMask(cloud.not()).updateMask(mask2);
    };
    function maskL8sr(image) {
      // Bits 3 and 5 are cloud shadow and cloud, respectively.
      var cloudShadowBitMask = (1 << 3);
      var cloudsBitMask = (1 << 5);
      // Get the pixel QA band.
      var qa = image.select('pixel_qa');
      // Both flags should be set to zero, indicating clear conditions.
      var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                     .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
      return image.updateMask(mask);
    }
    var l4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
    .merge(ee.ImageCollection('LANDSAT/LT04/C01/T2_SR'))
    .filter(filter)
    .map(cloudMaskL457)
    .select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'], 
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']
    )
    // print('l4', l4.size())
    var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .merge(ee.ImageCollection('LANDSAT/LT05/C01/T2_SR'))
      .filter(filter)
      .map(cloudMaskL457)
      .select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'], 
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']
      )
    // print('l5', l5.size())
    // print(l5.limit(50))
    var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .merge(ee.ImageCollection('LANDSAT/LE07/C01/T2_SR'))
      .filter(filter)
      .map(cloudMaskL457)
      .select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'], 
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']
      )
    // print('l7', l7.size())
    var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .merge(ee.ImageCollection('LANDSAT/LC08/C01/T2_SR'))
      .filter(filter)
      .map(maskL8sr)
      .select(
        ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'], 
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']
      )
    // print('l8', l8.size())
    return l4.merge(l5).merge(l7).merge(l8)
      .map(mapImage)
      .sort('system:time_start')
    function mapImage(image) {
      return params.mapImage(image)
        .clip(params.region)
    }
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()
      if (month.length < 2) 
          month = '0' + month
      if (day.length < 2) 
          day = '0' + day
      return [year, month, day].join('-')
    }
    function mergeObjects(objects) {
      return objects.reduce(function (acc, o) {
        for (var a in o) { acc[a] = o[a] }
        return acc
        }, {})
    }
  }