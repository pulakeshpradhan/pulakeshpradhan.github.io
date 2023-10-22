/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-1.6933344734547928, 52.91704444693481],
          [-1.6933344734547928, 52.34023283932497],
          [0.004053221857707179, 52.34023283932497],
          [0.004053221857707179, 52.91704444693481]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
var label_log = ui.Label('', {whiteSpace: 'pre'});
// Define title and description.
var intro = ui.Label('Wheat Phenology:',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label("Determine wheat phenology from Sentinel-1 imagery.\nChoose a 2 week observation window using the date selector.\nClick on a wheat field to plot vegetation indices throughout 2021.\n\n* https://www.mdpi.com/2077-0472/12/10/1605\n* https://www.mdpi.com/2072-4292/11/19/2228\n* https://opendata.dwd.de/climate_environment/CDC/observations_germany/phenology/", {whiteSpace: 'pre', fontSize: '12px'})
// Add title and description to the panel  
panel.add(intro).add(subtitle);
panel.add(label_log);
var chartPanel1 = ui.Panel();
panel.add(chartPanel1);
var chartPanel2 = ui.Panel();
panel.add(chartPanel2);
var chartPanel3 = ui.Panel();
panel.add(chartPanel3);
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
var start = '2016' //ee.Image(collection.first()).date().get('year').format();
var now = ee.Date('2021-07-15');
var end = ee.Date('2023-02-01')
// Load Sentinel-1 C-band SAR Ground Range collection (VV + VH)
var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(ee.Geometry.Point(-1.4870, 52.6440)) // UK bounds
  // .filterDate(now.format(), now.advance(2,'week').format()) // Choose a date range
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .select(['VV', 'VH', 'angle']);
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR');
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var MAX_CLOUD_PROBABILITY = 65;
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
// The masks for the 10m bands sometimes do not exclude bad data at
// scene edges, so we apply masks from the 20m and 60m bands as well.
// Example asset that needs this operation:
// COPERNICUS/S2_CLOUD_PROBABILITY/20190301T000239_20190301T000238_T55GDP
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
// Filter input collections by desired data range and region.
var criteria = ee.Filter.and(ee.Filter.bounds(geometry));
s2Sr = s2Sr.filter(criteria).map(maskEdges);
s2Clouds = s2Clouds.filter(criteria);
// Join S2 SR with cloud probability dataset to add cloud mask.
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2CloudMasked =
    ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
// Add NDVI band to image collection
var s2CloudMasked = s2CloudMasked.map(addNDVI);
function plot_map(data) {
  if (data.length === undefined) {
    var value = data;
    var wheat_poly = springWheat;
  }
  else {
    var value = data[0];
    var wheat_poly = data[1];
  }
  // Update the end date of the date range to match the value of the date slider
  var end = ee.Date(value.start()).advance(2, 'week');
  label_log.set('value','Images from '+value.start().format().getInfo()+' to '+end.format().getInfo())
  // Update the date filter of the collection
  var filteredCollection = collection
    .filterDate(value.start().format(), end.format())
    // .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    // .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    // .select(['VV', 'VH']);
  if (filteredCollection.size().getInfo() === 0) {
    label_log.set('value',label_log.value + '\n No radar images found.')
    return
  }
  // Update the VHVV and y_VHVV bands of the filtered collection
  var updatedCollection = filteredCollection
    .map(addVHVV)
    .map(addVHVV_y);
  // Update the VHVV layer on the map
  var image = ee.Image(updatedCollection.first());
  var vhvv = image.select('VHVV');
  var visParams = {min: -25, max: 0, palette: ['black', 'white']};
  //Map.layers().set(0, ui.Map.Layer(vhvv, visParams, 'Sentinel-1 VV-VH'));
  // Update the wheat samples on the map
  var wheat_raster = wheat_poly
    .reduceToImage({
      properties: ['OBJECTID'],
      reducer: ee.Reducer.first()
  }).gte(0);
  var sample = image.select(['VHVV', 'y_VHVV']).updateMask(wheat_raster).sample({
    region: wheat_raster.clip(geometry).geometry(),
    scale: 30,
    geometries: true,
    numPixels: 1000,
    seed: 123
  });
  // Map.layers().set(4, ui.Map.Layer(sample, {color:'red'}, 'samples'));
  var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
  Map.layers().set(0, ui.Map.Layer(s2CloudMasked.filterDate(value.start().format(), end.format()).median(), rgbVis, 'S2 SR masked at ' + MAX_CLOUD_PROBABILITY + '%',true));
  // Map.layers().set(1, ui.Map.Layer(s2CloudMasked.select('NDVI').filterDate(value.start().format(), end.format()).median(), {}, 'S2 NDVI SR masked at ' + MAX_CLOUD_PROBABILITY + '%',true)); 
  Map.layers().set(1, ui.Map.Layer(image.select('y_VHVV').updateMask(wheat_raster), {min: 0, max: 5, palette: ['pink', 'yellow','blue','green','brown']}, 'Sentinel-1 0.75*(VV-VH)+8.75'));
}
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: [now, wheat_poly],
    period: 1,
    onChange: plot_map,
    style: {width: '180px'}
  });
  panel.add(dateSlider);
});
var cropland = ee.FeatureCollection("users/spiruel/crop_labels/CEH_cropmap2021");
var springWheat = cropland.filterMetadata('crop_code','equals','sw')
var winterWheat = cropland.filterMetadata('crop_code','equals','ww')
var wheat_poly = springWheat;
var addVHVV = function(image) {
  var VHVV = image.select('VH').subtract(image.select('VV')).rename('VHVV');;
  return image.addBands(VHVV);
};
// var collection = collection.map(addVHVV);
// Multiply VH-VV values
var addVHVV_y = function(image) {
  var y_VHVV = (image.select('VHVV').multiply(0.75)).add(8.45).rename('y_VHVV')
  return image.addBands(y_VHVV);
};
// Map.addLayer(sample,{color:'red'},'samples')
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
// Create a function to highlight the selected feature.
function highlightSelectedFeature(feature) {
  // Clear any existing selections.
  removeLayer('selectedFeature');
  // Highlight the selected feature.
  var selectedFeature = ee.FeatureCollection([feature]);
  Map.addLayer(selectedFeature, {color: 'FF0000'}, 'selectedFeature');
}
function plotParcel(feature) {
  var year = 2021;
  // Filter the image collection to the selected year
  var yearCollection = collection.filter(ee.Filter.calendarRange(year, year, 'year'));
  // Update the VHVV and y_VHVV bands of the filtered collection
  var yearCollection = yearCollection
    .map(addVHVV)
    .map(addVHVV_y);
  var ndvi = s2CloudMasked.filter(ee.Filter.calendarRange(year, year, 'year')).select('NDVI');
  // Generate the chart
  var ndviChart = ui.Chart.image.seriesByRegion({
    imageCollection: ndvi,
    regions: [feature],
    reducer: ee.Reducer.mean(),
    band: 'NDVI',
    scale: 10,
    xProperty: 'system:time_start',
    seriesProperty: 'system:index'
  })
  // print(ndviChart)
  chartPanel1.clear();
  chartPanel1.add(ndviChart);
  // Define chart parameters
  var chartParams = {
    title: '0.75*(VH-VV)+8.45 against time for selected feature',
    hAxis: {title: 'Date'},
    vAxis: {title: 'VHVV'},
    lineWidth: 1,
    pointSize: 3,
    series: {
      0: {color: 'blue', lineWidth: 1, pointSize: 3},
      1: {color: 'green', lineWidth: 1, pointSize: 3},
    },
    trendlines: {
    0: {  // add a trend line to the 1st series
      type: 'polynomial',  // or 'polynomial', 'exponential'
      color: 'green',
      degree: 3,
      lineWidth: 5,
      opacity: 0.2,
      visibleInLegend: true,
    }
    }
  };
  // Generate the chart
  var vhvvChart = ui.Chart.image.seriesByRegion({
    imageCollection: yearCollection,
    regions: [feature],
    reducer: ee.Reducer.median(),
    band: 'y_VHVV',
    scale: 10,
    xProperty: 'system:time_start',
    seriesProperty: 'system:index'
  }).setOptions(chartParams);
  // Display the chart
  // print(vhvvChart)
  chartPanel2.clear();
  chartPanel2.add(vhvvChart);
  var maskedAngles = yearCollection
  .map(function (image) {
    var angle = image.select('angle')
    return image.updateMask(
      angle.gte(32).and(angle.lt(40))
    )
  })
  var vvChart = ui.Chart.image.seriesByRegion({
    imageCollection: maskedAngles,
    regions: [feature],
    reducer: ee.Reducer.median(),
    band: 'VV',
    scale: 10,
    xProperty: 'system:time_start',
    seriesProperty: 'system:index'
  })
  chartPanel3.clear();
  chartPanel3.add(vvChart);
  // // Find the date of the maximum VHVV value.
  // var maxDate = yearCollection.select('y_VHVV').reduce(ee.Reducer.max())
  //                 .reduceRegion(ee.Reducer.firstNonNull(), feature.geometry(), 30)
  //                 .get('system:time_start');
  // print('Date of Maximum VHVV Value: ', ee.Date(ee.Number.parse(maxDate)).format('YYYY-MM-dd'));
}
// Create a function to handle clicks on the map.
function handleClickOnMap(coords) {
  var all_feats = springWheat.merge(winterWheat);
  // Filter the wheat feature collection to include only the features that
  // intersect with the clicked location.
  var selectedFeatures = all_feats.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
  // If any features were selected, highlight the first one.
  if (selectedFeatures.size().getInfo() > 0) {
    var selectedFeature = selectedFeatures.first();
    highlightSelectedFeature(selectedFeature);
    plotParcel(selectedFeature);
  }
}
// Vis parameter:  
var vis_wff = {
  min: 0,
  max: 5,
  opacity: 1,
  palette: ['pink', 'yellow','blue','green','brown']
};
// Create color bar
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    position: 'bottom-left',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Thumbnail for the color bar
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis_wff.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px',position: 'bottom-left' },
});
// Title  
var legendTitle = ui.Label({
  value: 'Phenological stage',
  style: {fontWeight: 'bold'}
});
// Labels
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis_wff.min, {margin: '4px 8px'}),
    ui.Label(((vis_wff.max-vis_wff.min) / 5+vis_wff.min),{margin: '4px 8px'}),
    ui.Label(((vis_wff.max-vis_wff.min) / 5+1),{margin: '4px 8px'}),
    ui.Label(((vis_wff.max-vis_wff.min) / 5+2),{margin: '4px 8px'}),
    ui.Label(((vis_wff.max-vis_wff.min) / 5+3),{margin: '4px 8px'}),
    ui.Label(vis_wff.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add the legend to the map
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
  position: 'bottom-right'
});
Map.add(legendPanel);
Map.setCenter(-0.371, 51.806, 14)
// Define the dropdown options
var wheatOptions = [
  {label: 'Spring Wheat', value: 'sw'},
  {label: 'Winter Wheat', value: 'ww'}
];
// Create a dropdown widget
var wheatSelect = ui.Select({
  items: wheatOptions,
  placeholder:'Choose spring/winter wheat',
  onChange: function(value) {
    // Update the map based on the user's selection
    if (value === 'sw') {
      var wheat_poly = springWheat
    } else if (value === 'ww') {
      var wheat_poly = winterWheat;
    }
    plot_map([ee.DateRange(now.format(), now.advance(2,'week').format()), wheat_poly]);
  }
});
// Add the dropdown widget to the map
panel.add(wheatSelect);
function plot_layers() {
// Map.addLayer(image.select('y_VHVV').updateMask(wheat_raster), {min: 0, max: 5, palette: ['pink', 'yellow','blue','green','brown']}, 'Sentinel-1 0.75*(VV-VH)+8.75');
  Map.addLayer(springWheat,{color:'yellow'},'spring wheat', false)
  Map.addLayer(winterWheat,{color:'blue'},'winter wheat',false)
}
// Add a click event handler to the map.
Map.onClick(handleClickOnMap);
plot_map([ee.DateRange(now.format(), now.advance(2,'week').format()), springWheat]);
plot_layers();