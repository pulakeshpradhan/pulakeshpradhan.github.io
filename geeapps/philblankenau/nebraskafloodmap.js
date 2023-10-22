// TODO
// 1. Check other flood dates for clear images and different flooding extents
// 2. Check your july date to double check it doesn't need cloud masking
//////////////////////////////////////////////////////////////////////
// Create different layers
// - Flood day images with boundaries
// - Non-flood day image with boundaries
// - Gauges as a feature collection
/////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////
var mosaic = function(imgs) {
  var msc = imgs.mosaic().divide(10000.0);
  var geo = imgs.geometry().dissolve();
  return msc.set({bounds: geo});
};
// Compute MNDWI
var calcMndwi = function(sentinelImg) {
  return sentinelImg.addBands([sentinelImg.normalizedDifference(['B3', 'B11']).rename('mndwi')]);
};
// main Otsu Function 
var otsu = function(histogram) {
  // Written by Gennadii Donchyts
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
  // Compute between sum of squares, where each mean partitions the data.
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
          bCount.multiply(bMean.subtract(mean).pow(2)));
  });
  // print(ui.Chart.array.values(ee.Array(bss), 0, means));
  // Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
//////////////////////////////////////////////////////////////////////
// DATA //
//////////////////////////////////////////////////////////////////////
var s2toa = ee.ImageCollection('COPERNICUS/S2');
var boundary = ee.Geometry.Polygon([
  [-97.56191565995312,39.49460479072289],
  [-95.54043128495312,39.42674787979082],
  [-95.10097815995312,42.117677273699144],
  [-96.86977698807812,42.20318732895907],
  [-97.56191565995312,39.49460479072289],
]);
// March 21st
// var toaFloodImgs = s2toa
//   .filterDate('2019-03-20', '2019-03-22')
//   .filterMetadata('MGRS_TILE', 'contains', '14')
//   .filterBounds(boundary)
//   .filterMetadata('DATASTRIP_ID', 'equals', 'S2A_OPER_MSI_L1C_DS_EPAE_20190322T001148_S20190321T171358_N02.07');
var toaFloodImgs = s2toa
  .filterDate('2019-03-15', '2019-03-19')
  .filterMetadata('MGRS_TILE', 'contains', '14')
  .filterBounds(boundary);
// print(toaFloodImgs);
var toaNoFloodImgs = s2toa
  .filterDate('2018-07-08', '2018-07-10')
  .filterMetadata('MGRS_TILE', 'contains', '14')
  .filterBounds(boundary);
// Compute MNDWI
var calcMndwi = function(sentinelImg) {
  var threshold = 0.2;
  var mndwi = sentinelImg.normalizedDifference(['B3', 'B11']).rename('mndwi');
  mndwi = mndwi.gt(threshold);
  mndwi = mndwi.where(sentinelImg.divide(10000).select('B8A').gt(0.20), 0);
  return mndwi;
};
var waterMask = toaFloodImgs.map(calcMndwi);
waterMask = waterMask.mosaic().selfMask().rename(['Water 2019-03-16']);
// mask = mask.where()
// Map.addLayer(
//   toaFloodImgs.map(function(img) {return img.divide(10000)}),
//   {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4},
//   'true color'
// );
// Map.addLayer(waterMask.map(function(img) {return img.mask(img)}), {palette: 'blue'}, 'mndwi');
// Fake gauge data
var gauges = ee.FeatureCollection(
  ee.Feature(
    ee.Geometry.Point([-96.15806432916702,41.015237866056985]),
    {discharge: [55000, 56000, 57000, 57000, 54000], name: 'Louisville'}
  )
);
///////////////////////////////////////////////////////////////////////////
// Ancillary data
///////////////////////////////////////////////////////////////////////////
// Locations of interest
var locations = {
  fremont: {lon: -96.499, lat: 41.442}
};
var layerProperties = {
  'Water 2019-03-16': {
    name: 'Water 2019-03-16',
    visParams: {min: 0, max: 1, palette: ['Blue']},
    legend: [{'Water': 'blue'}],
    visibility: true
  }
};
///////////////////////////////////////////////////////////////////////////////
// APPLICATION CODE
//
// Original code taken from: https://google.earthengine.app/view/forest-change
///////////////////////////////////////////////////////////////////////////////
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locations['fremont'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, 12);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = waterMask.visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.visibility));
}
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Nebraska Flooding, 2019', {fontSize: '36px', color: 'green'});
var text = ui.Label(
  'Derived of Sentinel 2 satellite images.',
  {fontSize: '11px'}
);
var toolPanel = ui.Panel([header, text], 'flow', {width: '350px'});
ui.root.widgets().add(toolPanel);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0',  position: 'bottom-right'}
});
mapPanel.add(legendPanel);
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
/////////////////////////////////////////////////////////////////
// Create a panel that contains the layer name with checkbox and opacity slider
var createLayerPanel = function(layerProps) {
  var checkbox = ui.Checkbox({
    label: layerProps.name,
    value: true,
    onChange: function(value) {
      // Loop through the layers in the mapPanel. For each layer,
      // if the layer's name is the same as the name selected in the layer
      // pulldown, set the visibility of the layer equal to the value of the
      // checkbox. Otherwise, set the visibility to false.
      mapPanel.layers().forEach(function(element, index) {
        element.setShown(layerProps.name == element.getName() ? value : false);
      });
    }
  })
  // Create an opacity slider. This tool will change the opacity for each layer.
  // That way switching to a new layer will maintain the chosen opacity.
  // var opacitySlider = ui.Slider({
  //   min: 0,
  //   max: 1,
  //   value: 1,
  //   step: 0.01,
  // });
  // opacitySlider.onSlide(function(value) {
  //   mapPanel.layers().forEach(function(element, index) {
  //     element.setOpacity(value);
  //   });
  // });
  var viewPanel = ui.Panel([checkbox], ui.Panel.Layout.Flow('horizontal'));
  toolPanel.add(viewPanel);
};
for (var key in layerProperties) {
  var prop = layerProperties[key];
  createLayerPanel(prop);
}
// ADD HYDROGRAPH STUFF
toolPanel.add(ui.Label('View Different Gauge Hydrographs', {'font-size': '24px'}));
var plotGauge = function(obj) {
  // Find the matching feature
  var feat = ee.Feature(gauges.filterMetadata('name', 'equals', obj).first());
  var chart = ui.Chart.array.values(feat.get('discharge'), 0, feat.get('time'));
  chart.setOptions({
    hAxis: {title: 'Date'},
    vAxis: {title: 'Discharge (cfs)'},
    legend: {position: 'none'}
  })
  toolPanel.add(chart)
  mapPanel.centerObject(feat, 14)
}
var selector = ui.Select(
  {
    items: gauges.aggregate_array('name').getInfo(),
    placeholder: 'Select a USGS Gauge',
    onChange: plotGauge
  }
);
var gaugeDropDown = ui.Panel(
  [selector],
  ui.Panel.Layout.Flow('horizontal')
);
toolPanel.add(gaugeDropDown);
mapPanel.add(ui.Map.Layer(gauges, {color: 'red'}, 'gauges', true));