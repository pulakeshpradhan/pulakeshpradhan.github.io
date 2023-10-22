// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
/*
 * Configure layers and locations
 */
 //////////////
var mapPanel = ui.Map();
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rmpanel = ui.Panel({
  style:
      {position: 'top-right',fontSize: '16px', padding: '0'}
});
rmpanel.add(ui.Label('Socioeconomic Adjusted Risk'))
rightMap.add(rmpanel)
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: mapPanel,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([mapPanel, rightMap]);
var lmpanel = ui.Panel({
  style:
      {position: 'top-left',fontSize: '16px', padding: '0'}
});
lmpanel.add(ui.Label('Physical Risk'))
mapPanel.add(lmpanel)
/////////////
var palette_for_colorbar = ['#703103','#945629','#ce7e45', '#df923d', '#f1b555', '#fcd163', '#99b718', 
          '#74a901', '#66a000', '#529400', '#3e8601', '#207401', '#056201',
          '#004c00', '#023b01', '#012e01', '#011d01', '#011301'];
var palette_lfmc = ['#703103','#945629','#ce7e45', '#df923d', '#f1b555', '#fcd163', '#99b718', 
          '#74a901', '#66a000', '#529400', '#3e8601', '#207401', '#056201',
          '#004c00', '#023b01', '#012e01', '#011d01', '#011301'];
var palette_danger = ['green','yellow','orange', 'red'];
var palette_population = ["ffffe7","ffac1d","9f0c21"];   
var palette_flammability = ['#ebf0f7', '#cfa9d2', '#e42786','#710026'];
var roi = ee.FeatureCollection('users/kkraoj/west_usa');   
var palettes = require('users/gena/packages:palettes');
var palette_ndvi = palettes.matplotlib.viridis[7]
// ['grey', 'FF0099'];
var colorbar_thumbnail = require('users/kkraoj/ee:fmc_from_sar/make_colorbar');
var colorbar_thumbnail = colorbar_thumbnail.make_colorbar(palette_for_colorbar)
var lfmc_col = ee.ImageCollection('users/kkraoj/lfm-mapper/lfmc_col');
  // [
  //   ee.Image('users/kkraoj/lfmc_map_2019-01-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-02-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-03-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-04-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-05-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-06-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-07-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-08-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-09-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-10-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-11-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-12-01'),
var ndataset = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
                  .filter(ee.Filter.date('2010-01-01', '2010-12-31')).max();
var nighttimeLights = ndataset.select('avg_vis');
var nighttimeLightsVis = {
  min: 3.0,
  max: 60.0,
};
var lfmc = ee.Image('users/kkraoj/lfmc_map_2019-01-01');
//////////////////////////////////////////////// forest covers
var convert_to_flammability = function(lfmc_image){
    var cover = ee.Image('MODIS/051/MCD12Q1/2012_01_01')
      .select('Land_Cover_Type_1');
    var is_forest = cover.lte(ee.Image.constant(5))
    var is_shrub = cover.gte(ee.Image.constant(6)).lte(ee.Image.constant(7))
    var is_grass = cover.eq(ee.Image.constant(10))
    var lfmc_forest = lfmc_image.updateMask(is_forest)
    var lfmc_shrub = lfmc_image.updateMask(is_shrub)
    var lfmc_grass = lfmc_image.updateMask(is_grass)
    //<60: critical, 60-80 : high, 80 - 120 : moderate, >120
        var break4 = function(image,b1,b2,b3) {
        var c1 = ee.Image.constant(b1);
        var c2 = ee.Image.constant(b2);
        var c3 = ee.Image.constant(b3);
        var tocompare = c1.addBands(c2).addBands(c3);
        var lfmc_compare = image.lte(tocompare)
        var severe_level = lfmc_compare.expression(
            'b1 + b2 + b3', {
              'b1': lfmc_compare.select(0),
              'b2': lfmc_compare.select(1),
              'b3': lfmc_compare.select(2)
        });
        return severe_level; //level from 0 to 3 (low to extreme)
        };
    var sev_grass = break4(lfmc_grass, 13, 50, 10)
    var sev_shrub = break4(lfmc_shrub, 60, 80, 120)
    var sev_forest = break4(lfmc_forest, 40, 100, 130)
    var all_sev_collection = ee.ImageCollection([sev_grass,sev_shrub,sev_forest])
    var sev_mosaic = all_sev_collection.mosaic()
    return sev_mosaic
    }
// Map.addLayer(sev_mosaic,
//             {min: 0, max: 3, palette: palette1},
//             'Flammability');
//////////////////////////////////////////////////////
var layerProperties = {
  'Fuel Wetness': {
    name: 0,
    visParams: {min: 50, max: 200, palette: palette_lfmc},
    legend: false,
    defaultVisibility: false
  },
  'Flammability': {
    name: 0,
    visParams: {min: 0, max: 3, palette: palette_flammability},
    legend: [
     {'Extreme':'#710026'}, {'High': '#e42786'},  {'Moderate': '#cfa9d2'},{'Low': '#ebf0f7'}
    ],
    defaultVisibility: false
  },
  'Fuel Availability': {
    name: 0,
    visParams: {min: 0, max: 3, palette: palette_flammability},
    legend: [
     {'High': '#e5e500'}, {'Low': '#41035d'}
    ],
    defaultVisibility: false  
  },
  'Urban Proximity':{
    name: 0,
     visParams : {
      max: 1000.0,
      palette: palette_population,
      min: 20.0
    },
    legend: [
     {'Dense': '9f0c21'}, {'Moderate': 'ffac1d'}, {'Sparse': 'ffffe7'}
    ],
    defaultVisibility: false  
    },
  'Total Risk':{
    name: 0,
     visParams : {
      max: 1000.0,
      palette: palette_population,
      min: 20.0
    },
    legend: [
       {'Extreme': 'red'}, {'Very High': 'orange'}, {'High': 'yellow'},
      {'Medium': 'green'}
    ],
    defaultVisibility: false 
  }
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var styleDict = require('users/kkraoj/ee:fmc_from_sar/style_map');
styleDict.stylemap(mapPanel);
styleDict.stylemap(rightMap);
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: false, mapTypeControl: true});
// Center the map
var defaultLocation = {lon:-113.03, lat:38, zoom:6};
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
// ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add a title and some explanatory text to a side panel.
var bear = ee.Image('users/kkraoj/bear_v1').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
var thumb = ui.Thumbnail({
  image: bear,
  params: {
    dimensions: '642x291',
    format: 'png'
  },
  style: {height: '127px', width: '280px',padding :'0'}
});
// var header = ui.Label('FireNet: Wildfire Risk Forecaster', {fontSize: '36px', color: '#945629'});
var text = ui.Label(
    'Click on a time in the bottom scroll to identify wildfire risk using fuel flamability (hazard), fuel availability (exposure) and socio-economic factors (vulnerability). Model powered by deep learning. Use the case studies to understand how FireNet can help forecast wildfire risk.',
    {fontSize: '13px'});
var toolPanel = ui.Panel([thumb, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
// var link = ui.Label(
//     'Remote Sensing of Environment paper by Rao et al.', {},
//     'http://science.sciencemag.org/content/342/6160/850');
// var linkPanel = ui.Panel(
//     [ui.Label('For more information', {fontWeight: 'bold'}), link]);
// toolPanel.add(linkPanel);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left',fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '10'}
});
mapPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '10'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  if (Array.isArray(legend)) {
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
    } else {
      keyPanel.add(colorbar_thumbnail, ui.Panel.Layout.Flow('horizontal'));
        // print(colorbar_thumbnail)
    }
}
// Create a visibility checkbox and an opacity slider.
//
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.9,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var text = ui.Label(
    'Layer Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([text, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// toolPanel.add(ui.Label('__________________________________________'));
// Use a DateSlider
// Use the start of the collection and now to bound the slider.
var start = ee.Date('2019-01-01').get('year').format();
var now = Date.now();
var end = ee.Date('2019-12-20').format();
// Run this function on a change of the dateSlider.
var showLayer = function(range) {
  var lfmc = lfmc_col.filterDate(range.start(), range.end()).median();
  // Asynchronously compute the name of the composite.  Display it.
  // range.start().get('year').evaluate(function(name) {
      var visParams = {min:50, max: 200,palette:palette_lfmc};
      var lfmc_layer = ui.Map.Layer(lfmc, visParams, 'Fuel Wetness');
      // layer = mapPanel.addLayer(lfmc_layer)
         mapPanel.layers().set(0, lfmc_layer);
       mapPanel.layers().get(0).setShown(layerSelect.getValue() === "Fuel Wetness") 
      // return lfmc_layer
      // });
    var visParams = {min:0, max: 3,palette:palette_flammability};
    var flammability = convert_to_flammability(lfmc)
    var flammability_layer = ui.Map.Layer(flammability, visParams,'Flammability');
    // var layer = mapPanel.addLayer(flammability_layer)
    // layer.setOpacity(0);
    mapPanel.layers().set(1, flammability_layer);
    mapPanel.layers().get(1).setShown(layerSelect.getValue() === "Flammability")
    ///// ndvi 
    var dataset = ee.ImageCollection("LANDSAT/LC08/C01/T1_8DAY_NDVI")
                  .filterDate(range.start(), range.end()).max();
    var ndvi = dataset.select('NDVI').clip(roi);
    var visParams = {
      min: 0.2,
      max: 0.8,
      palette: palette_ndvi,
    };
    var ndvi_layer = ui.Map.Layer(ndvi, visParams,'Fuel Availability');
    // var layer = mapPanel.addLayer(flammability_layer)
    // layer.setOpacity(0);
    mapPanel.layers().set(2, ndvi_layer);
    mapPanel.layers().get(2).setShown(layerSelect.getValue() === "Fuel Availability")
    ////////////////pop
    // var dataset = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density").first();
    // var population = dataset.select('population_density').clip(roi).focal_max(30000, 'circle', 'meters');
    var population = ee.Image('users/kkraoj/wildfire/population_density');
    var visParams = {
      min: 20,
      max: 1000,
      palette: palette_population,
    };
    var population_layer = ui.Map.Layer(population.mask(population.gte(1)), visParams, 'Urban Proximity');
    mapPanel.layers().set(3, population_layer);
    mapPanel.layers().get(3).setShown(layerSelect.getValue() === "Urban Proximity") 
    ///////// fire danger
    var danger = flammability.multiply(ndvi).multiply(population.log());
    var visParams = {
      min: 0,
      max: 10,
      palette: palette_danger,
    };
    var danger_layer = ui.Map.Layer(danger, visParams, 'Total Risk');
    mapPanel.layers().set(4, danger_layer);
    mapPanel.layers().get(4).setShown(layerSelect.getValue() === "Total Risk") 
    var ndanger = danger.multiply(ee.Image(50).subtract(nighttimeLights)).divide(ee.Image(50));
    var ndanger_layer = ui.Map.Layer(ndanger, visParams, 'Social Equality Risk');
    rightMap.layers().set(0, ndanger_layer);
  };
  // Asynchronously compute the date ange and show the slider.
  var dateRange = ee.DateRange(start, end).evaluate(function(range) {
    var dateSlider = ui.DateSlider({
      start: range['dates'][0],
      end: range['dates'][1],
      value: ee.Date('2019-10-01').millis().getInfo(),
      period: 29,
      onChange: showLayer,
      style: {position:'bottom-center',width:'500px'}
    });
    mapPanel.add(dateSlider.setValue(ee.Date('2019-10-01').millis().getInfo()));
  });
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
// initialize in october 2019
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[4],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    var i;
    for (i = 0; i < selectItems.length; i++) {
      if (selectItems[i]===selected) {
          mapPanel.layers().get(i).setShown(true);
        //  block of code to be executed if the condition is true
      } else {
          mapPanel.layers().get(i).setShown(false);
        //  block of code to be executed if the condition is false
      }
      setLegend(layerProperties[layerSelect.getValue()].legend);
    }
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('View Different Layers', {'font-size': '24px'}));
toolPanel.add(ui.Label(
    'Wildfire risk and its components',
    {fontSize: '13px'}))
// toolPanel.add ui.Panel([header, text], 'flow', {width: '300px'});
toolPanel.add(layerSelect);
toolPanel.add(viewPanel);
// toolPanel.add(ui.Label('__________________________________________'));
toolPanel.add(ui.Label('View Case Studies', {'font-size': '24px'}));
toolPanel.add(ui.Label(
    'Zoom into catastrophic wildfires',
    {fontSize: '13px'}))
var defaultLocation = {lon:-113.03, lat:38, zoom:6};
var selectFires = {
      'Walker Fire (5 Sep 2019)':
      {lat:40.053,lon:-120.669,zoom  :11.5, perimeter:ee.FeatureCollection('users/kkraoj/walker')},
      'Kincade Fire (23 Oct 2019)':
      {lat:38.692458,lon:-122.780053,zoom  :11.5, perimeter:ee.FeatureCollection('users/kkraoj/kincade')},
      // 'Saddleridge Fire (10 Oct 2019)': 
      // {lat:34.326,lon:-118.481,zoom  :10},
      // 'Tick Fire (23 Oct 2019)':
      // {lat:34.472778,lon:-118.368056,zoom  :10},
};
var fireSelect = ui.Select({
  items:  Object.keys(selectFires),
  onChange: function(selected) {
    // zoom into the fire
      mapPanel.setCenter(
        selectFires[selected].lon, selectFires[selected].lat, selectFires[selected].zoom)
        var perimeter_layer = ui.Map.Layer(selectFires[selected].perimeter, {color: '00FFFF'}, 'perimeter');
        mapPanel.layers().set(5, perimeter_layer)
        // mapPanel.addLayer(selectFires[selected].perimeter, {color: '00FFFF'}, 'colored');
      }
    }
);
toolPanel.add(fireSelect);
// Create an opacity slider for shape file only
var opacitySlider2 = ui.Slider({
  min: 0,
  max: 1,
  value: 0.9,
  step: 0.01,
});
opacitySlider2.onSlide(function(value) {
  mapPanel.layers().get(5).setOpacity(value) 
  });
var text = ui.Label(
    'Perimeter Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([text, opacitySlider2], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
///set the initial layer 
showLayer(ee.DateRange('2019-10-01', '2019-11-02'));
////////clicking features
var chartPanel = ui.Panel();
var generateChart = function (coords) {
  chartPanel.clear();
  // Update the lon/lat panel with values from the click event.
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(6, dot);
  // Make a chart from the time series.
  /// get all values
  var values = [1,2,3,4];
  // print(mapPanel.layers().get(0).getEeObject())
  for (var i = 1; i < 5; i++) {
    values[i-1] = mapPanel.layers().get(i).getEeObject().reduceRegion(ee.Reducer.first(),point, 5000)
  }
  var h = values[0].get('constant').getInfo()/3;
  var e= values[1].get('NDVI').getInfo();
  var v = ee.Number(values[2].get('population_density'))
  if (v.getInfo()===null) {
  //  block of code to be executed if condition1 is true
  } else {
    var v = v.log().getInfo()/10
    //  block of code to be executed if the condition1 is false and condition2 is false
  }
  // var v = ee.Number(values[2].get('population_density')).log().getInfo()/10;
  var r = (values[3].get('constant').getInfo()+1)/11;
  var dataTable = {
  cols: [{id: 'name', label: 'Airport Code', type: 'string'},
         {id: 'year', label: 'Elevation (m)', type: 'number'}],
  // rows: [{c: [{v: 'SFO'}, {v: values[2].get('population_density').getInfo()}]},
  //       {c: [{v: 'JFK'}, {v: 4}]},
  //       {c: [{v: 'DEN'}, {v: 1655}]},
  //       {c: [{v: 'LHR'}, {v: 25}]}]
  rows: [{c: [{v: 'Hazard'}, {v: h}]},
        {c: [{v: 'Exposure'}, {v: e}]},
        {c: [{v: 'Vulnerability'}, {v: v}]},
        {c: [{v: 'Total Risk'}, {v: r }]}]
  };
  // Define a dictionary of customization options.
  var options = {
    // title: 'Risk Attribution',
    legend: {position: 'none'},
    padding:0,
    hAxis: {
      minValue:0,
      maxValue:1
    }
  };
  // Make a BarChart from the table and the options.
  var chart = new ui.Chart(dataTable, 'BarChart', options);
  chartPanel.add(chart)
  /////cheating for LA census
  var dataTable2 = {
  cols: [{id: 'name', label: 'Airport Code', type: 'string'},
         {id: 'year', label: 'Elevation (m)', type: 'number'}],
  // rows: [{c: [{v: 'SFO'}, {v: values[2].get('population_density').getInfo()}]},
  //       {c: [{v: 'JFK'}, {v: 4}]},
  //       {c: [{v: 'DEN'}, {v: 1655}]},
  //       {c: [{v: 'LHR'}, {v: 25}]}]
  rows: [{c: [{v: 'White'}, {v: 0.45}]},
        {c: [{v: 'Black'}, {v: 0.07}]},
        {c: [{v: 'Asian'}, {v: 0.13}]},
        {c: [{v: 'Hispanic'}, {v: 0.35 }]}]
  };
  // Define a dictionary of customization options.
  var options = {
    title: 'Racial Diversity',
    legend: {position: 'none'},
    padding:0,
    hAxis: {
      minValue:0,
      maxValue:1
    }
  };
  // Make a BarChart from the table and the options.
  var chart2 = new ui.Chart(dataTable2, 'BarChart', options);
  chartPanel.add(chart2)
  // Print the chart to display it in the console.
  // print(chart);
};
// Register a callback on the default map to be invoked when the map is clicked.
// toolPanel.add(ui.Label('__________________________________________'));
toolPanel.add(ui.Label('Risk Attribution', {'font-size': '24px'}));
toolPanel.add(ui.Label(
    'Click on any point on left map to view individual attribution of wildfire risk.',
    {fontSize: '13px'}))
toolPanel.add(chartPanel);
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');