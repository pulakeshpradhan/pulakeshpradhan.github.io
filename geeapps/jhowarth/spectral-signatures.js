var widgets = require('users/jhowarth/eePrimer:modules/widgets.js');
// --------------------------------------
// initialize layout
// --------------------------------------
// Initialize panel.
var panel = ui.Panel(
  {style: {width: '30%'}});
// Initialize map.
var map = ui.Map();
//initialize splitPanel
var split_panel =  ui.SplitPanel({
    firstPanel: panel,
    secondPanel: map
    });
ui.root.clear();
ui.root.add(split_panel);
// --------------------------------------
// Function to make band list 
// --------------------------------------
var makeBandList = function(r,g,b) {
  return [r, g, b];
};
// --------------------------------------
// Define parameters
// --------------------------------------
var bandConfig = {
  red: 'B4',
  green: 'B3',
  blue: 'B2'
};
var config = {
  counter: 0,
  S2: ee.ImageCollection('COPERNICUS/S2_SR'),
  poi: map.getCenter(),
  filterStart: '2020-06-01',
  filterEnd: '2020-08-01',
  cloudPercent: 20,
  zoom: 8,
  baseMap: 'HYBRID',
  viz_S2: {
    min: 0.0,
    max: 0.3,
    bands: makeBandList(bandConfig.red, bandConfig.green, bandConfig.blue),
    gamma: 1.5,
    },
  label_S2: 'Sentinel 2',
};
// ----------------------------------------------
// Function to generate random colors
// ----------------------------------------------
var makeColor = function() {
  return Math.floor(Math.random()*16777215).toString(16);
};
// ----------------------------------------------
// Function to mask clouds using the Sentinel-2 QA band
// ----------------------------------------------
// function maskS2clouds(image) {
//   var qa = image.select('QA60');
//   // Bits 10 and 11 are clouds and cirrus, respectively.
//   var cloudBitMask = 1 << 10;
//   var cirrusBitMask = 1 << 11; 
//   // Both flags should be set to zero, indicating clear conditions.
//   // var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
//   //     .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
//   return image
//     // .updateMask(mask)
//     .divide(10000);
// }
// ----------------------------------------------
var make_S2_image = function(collection) {  
  return collection
    .filterBounds(config.poi)                         // filter by location
    .filterDate(config.filterStart, config.filterEnd)             // filter by time
    // Pre-filter to get less cloudy granules.
    .filter(                                          // filter
      ee.Filter.lt(                                   // criteria  
        'CLOUDY_PIXEL_PERCENTAGE',                    // property
        config.cloudPercent))                         // value  
    // .map(maskS2clouds)                             // apply cloud mask to all images
    .median()
    .divide(10000);                                   // scale by division  
  };
print(config.S2.first());
// ----------------------------------------------
// // Applies scaling factors to L8.
// var applyScaleFactors = function(image) {
//   var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
//   var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
//   return image.addBands(opticalBands, null, true)
//               .addBands(thermalBands, null, true);
// };    
// var make_L8_image = function(collection) {
//   var image = collection
//     .filterBounds(config.poi)
//     .filterDate(config.filterStart, config.filterEnd)
//     .filter(                                          // filter
//       ee.Filter.lt(                                   // criteria  
//         'CLOUD_COVER',                                 // property
//         config.cloudPercent))  
//     ;
//   var filtered = image.map(applyScaleFactors); 
//   return filtered.min();
// };
// print(config.L8.first());
// ----------------------------------------------
// Make labels
// ----------------------------------------------
// Style for instructions 
var instructionStyle = {
  fontSize: '14px',
  color: '#478EC9',
  whiteSpace: 'pre'
  // backgroundColor: background
};
var makeInstructions = function(stepLabel) {
  var instructionPanel = ui.Panel();
  var instructionLabel = ui.Label(
    {
    value: stepLabel,
    style: instructionStyle
    }
  );
  return instructionPanel.add(instructionLabel);
};
// ----------------------------------------------
// Add layers to map 
// ----------------------------------------------
map.setOptions(config.baseMap);
map.setZoom(config.zoom);
map.style().set({cursor: 'crosshair'});
// map.setControlVisibility({
//   layerList: false
// });
// Add S2 image
map.addLayer(make_S2_image(config.S2), config.viz_S2, config.label_S2);
// // Add L8 image
// map.addLayer(make_L8_image(config.L8), config.viz_L8, config.label_L8);
// // add point location placeholder
// map.addLayer(map.getCenter(), {color: config.vizColor}, 'Sample location',1,0);
// ----------------------------------------------
// make time window widgets
// ----------------------------------------------
var time_panel = ui.Panel(
  {
    style: 
    {
      width: '80%',
      shown: false
    }
  }
)
;
var start_end_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
var time_checkbox = ui.Checkbox({
  label: 'Define start and end dates', 
  value: false,
  style: {
    fontSize: '16px',
    fontFamily: 'Helvetica',
    padding: '4 px',
    }
  }
);
time_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  time_panel.style().set('shown',checked);
  start_end_panel.style().set('shown',checked);
});
var changeStart = function(text) {
  config.filterStart = String(text);
  print(config.filterStart);
};
var changeEnd = function(text) {
  config.filterEnd = String(text);
  print(config.filterEnd);
};
var makeTimeWindow = function(date, fun) {
  var timeDict =  {
    placeholder: date,
    onChange: fun     
    };
  return ui.Textbox(timeDict);
};
start_end_panel
  .add(makeTimeWindow(config.filterStart, changeStart))
  .add(makeTimeWindow(config.filterEnd, changeEnd))
;
time_panel
  .add(makeInstructions('Select two dates between 2019-01-01 and today.\nThen click the DRAW button.'))
  .add(start_end_panel)
  .add(makeInstructions('If the layer panel appears red while drawing,\nthen please try to widen your time window and\nclick the DRAW button again.'))
;
// ----------------------------------------------
// Visualization scheme 
// ----------------------------------------------
var viz_checkbox = ui.Checkbox(
  {
  label: 'Change visualization scheme', 
  value: false,
  style: {
    fontSize: '16px',
    fontFamily: 'Helvetica',
    padding: '4 px',
    }
  }
);
viz_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  viz_panel.style().set('shown',checked);
  rgb_panel.style().set('shown',checked);
  min_panel.style().set('shown',checked);
  max_panel.style().set('shown',checked);
  gamma_panel.style().set('shown',checked);
});
var viz_panel = ui.Panel(
  {
    style: 
    {
      width: '80%',
      shown: false
    }
  }
)
;
var rgb_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
var bands = {
    'B1 - Coastal aerosol': 'B1',
    'B2 - Blue': 'B2',
    'B3 - Green': 'B3',
    'B4 - Red': 'B4',
    'B5 - Red edge 1': 'B5',
    'B6 - Red edge 2': 'B6',
    'B7 - Red edge 3': 'B7',
    'B8 - NIR': 'B8',
    'B8A - NIR (narrow)': 'B8A',
    'B9 - Water vapor': 'B9',
    'B10 - Cirrus': 'B10',
    'B11 - SWIR 1': 'B11',
    'B12 - SWIR 2': 'B12'};
var selectRed = ui.Select({
  items: Object.keys(bands),
  onChange: function(key) {
    bandConfig.red = bands[key];
    config.viz_S2.bands = 
      makeBandList(
        bandConfig.red, 
        bandConfig.green, 
        bandConfig.blue
        );
  }
});
// Set a place holder.
selectRed.setPlaceholder('RED');
var selectGreen = ui.Select({
  items: Object.keys(bands),
  onChange: function(key) {
    bandConfig.green = bands[key];
    config.viz_S2.bands = 
      makeBandList(
        bandConfig.red, 
        bandConfig.green, 
        bandConfig.blue
        );
  }
});
// Set a place holder.
selectGreen.setPlaceholder('GREEN');
var selectBlue = ui.Select({
  items: Object.keys(bands),
  onChange: function(key) {
    bandConfig.blue = bands[key];
    config.viz_S2.bands = 
      makeBandList(
        bandConfig.red, 
        bandConfig.green, 
        bandConfig.blue
        );
  }
});
// Set a place holder.
selectBlue.setPlaceholder('BLUE');
// Sliders
var min_label = ui.Label(
    {
    value: 'Minimum display value',
    style: instructionStyle
    }
  );
var min_slider = ui.Slider({
  min: 0.0,
  max: 1.0,
  value: config.viz_S2.min,
  step: 0.05,
  style: 
    {width: '50%'},
  onChange: function(value) {config.viz_S2.min = value;}
});
var min_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      min_label, 
      min_slider], 
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
var max_label = ui.Label(
    {
    value: 'Maximum display value',
    style: instructionStyle
    }
  );
var max_slider = ui.Slider({
  min: 0.0,
  max: 1.0,
  value: config.viz_S2.max,
  step: 0.05,
  style: 
    {width: '50%'},
  onChange: function(value) {config.viz_S2.max = value;}
});
var max_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      max_label, 
      max_slider], 
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
var gamma_label = ui.Label(
    {
    value: 'Gamma value',
    style: instructionStyle
    }
  );
var gamma_slider = ui.Slider({
  min: 0.0,
  max: 5.0,
  value: config.viz_S2.gamma,
  step: 0.1,
  style: 
    {width: '50%'},
  onChange: function(value) {config.viz_S2.gamma = value;}
});
var gamma_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      gamma_label, 
      gamma_slider], 
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
// Construct panel
rgb_panel
  .add(selectRed)
  .add(selectGreen)
  .add(selectBlue);
viz_panel
  .add(makeInstructions('Select bands to display RGB color channels.\nThen click the DRAW button.'))
  .add(rgb_panel)
  .add(min_panel)
  .add(max_panel)
  .add(gamma_panel);
// ----------------------------------------------
// panel for spectral signatures
// ----------------------------------------------
var spectral_panel = ui.Panel(
  {
    style: 
    {
      width: '80%',
      shown: false
    }
  }
)
;
spectral_panel.add(makeInstructions('Click one or more locations on S2 image\nto chart their spectral signatures.'));
// ----------------------------------------------
// checkbox for spectral signatures
// ----------------------------------------------
var spectral_checkbox = ui.Checkbox({
  label: 'Explore spectral signatures', 
  value: false,
  style: {
    fontSize: '16px',
    fontFamily: 'Helvetica',
    padding: '4 px',
    }
  }
);
spectral_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  spectral_panel.style().set('shown',checked);
  reset_button.style().set('shown', checked);
});
// ----------------------------------------------
// function to draw specta signatures from points
// ----------------------------------------------
var makeSpectralSignature = function() {
  //Choose bands to include and define feature collection to use
  var subset = make_S2_image(config.S2)
    .select(
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8',
      'B8A',
      'B9',
      'B11',
      'B12'
      )
    ;
  // Define customization options.
  var plotOptions = {
    title: 'Sentinel 2 surface reflectance spectra',
    hAxis: {title: 'Wavelength (nanometers)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 2,
    colors: colors_list,
    curveType: 'function'
  };
  // Define a list of Sentinel 2 wavelengths for X-axis labels.
  var series = {
    wavelengths: [ 444, 497,  560, 665, 704, 740, 783, 835, 865, 954, 1614, 2202],
    bands:      ['B1','B2', 'B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']
};
  var samples_fc = ee.FeatureCollection(samples);
  var chart = ui.Chart.image.regions({
    image: subset, 
    regions: samples_fc, 
    reducer: ee.Reducer.mean(), 
    scale: 10, 
    seriesProperty: 'sample', 
    xLabels: series.wavelengths
    });
  // Create the chart and set options.
  return chart
          .setChartType('ScatterChart')
          .setOptions(plotOptions);
};
// ----------------------------------------------
// Click handler for spectra charts
// ----------------------------------------------
var samples = [];
var colors_list = [];
// When you click the map
map.onClick(function(coords) {
  config.color = makeColor();
  colors_list.push(config.color);
  config.poi = ee.Geometry.Point(coords.lon, coords.lat);
  samples.push(ee.Feature(config.poi, {'sample': samples.length}));
  print(config.poi);
  spectral_panel.clear();
  spectral_panel.add(makeSpectralSignature(config.poi));
  map.layers().set(samples.length, ui.Map.Layer(config.poi, {color: config.color}, 'Sample ' + String(samples.length - 1), true));
  }
);
// ----------------------------------------------
// Button to draw map with config parameters
// ----------------------------------------------
// Draw map button
var centerButton = ui.Button(
  {
  label: 'DRAW S2 scene at map center',
  style: 
  {
    height: '48px',
    padding: '12px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4766B3',
    width: '70%'
  },
  onClick: function() {
    config.poi = map.getCenter();
    map.layers().set(
      0, 
      ui.Map.Layer(
        make_S2_image(config.S2), 
        config.viz_S2, 
        'Sentinel 2')
      );
    }
  }
);
// ----------------------------------------------
// Button to clear chart and sample points
// ----------------------------------------------
// Chart reset button
var reset_button = ui.Button(
  {
    label: 'Clear chart and samples',
    style: 
      {
        fontSize: '12px',
        color: 'black',
        width: '70%',
        shown: false,
        padding: '48px'
      }
  }
);
reset_button.onClick(function() {
      samples = [];
      colors_list = [];
      spectral_panel.clear();
      for (var i = map.layers().length() - 1; i >= 1; i--) {
        map.remove(map.layers().get(i));
      }
    });
// ----------------------------------------------
// Title for the panel
// ----------------------------------------------
var title = ui.Label( {
  value: 'Spectral signatures in Sentinel 2', 
  style: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  targetUrl: {},
  // imageUrl:  {}
  }
)
;
// --------------------------------------
// Make credits. 
// --------------------------------------
// Make legend panel.
var credits_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('vertical'),
    style: 
    {
      width: '95%',
      shown: true,
      position: 'bottom-left'
    }
  }
)
;
var makeLabel = function(title, style, link) {
  return ui.Label({
    value: title,
    style: style,
    targetUrl: link
  });
};
// style dictionary for labels
var styles = {
  // title: {
  //   fontSize: '24px',
  //   fontWeight: 'bold'
  //   },
  // subTitle: {
  //   fontSize: '14px',
  //   // color: '#478EC9',
  //   whiteSpace: 'pre'
  //   // backgroundColor: background
  //   },
  // instruction: {
  //   fontSize: '14px',
  //   // color: '#478EC9',
  //   whiteSpace: 'pre'
  //   // backgroundColor: background
  //   },
  credits: {
    fontSize: '10px',
    whiteSpace: 'pre',
    color: '#999999',
    margin: '1px 8px 1px 8px'
  }
};
credits_panel
  .add(makeLabel(
    '\n\nSOURCE:', 
    styles.credits
    )
  )
  .add(makeLabel(
    'Sentinel-2 MSI: MultiSpectral Instrument, Level-2A', 
    styles.credits,
    'https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR?hl=en'
    )
  )
  .add(makeLabel(
    '\n\nJeff Howarth\nGeography Dept\nMiddlebury College',
    styles.credits,
    'https://github.com/jeffhowarth/eeprimer/blob/master/activities/spectral_signatures.md'
    )
  )
  // .add(makeLabel(
  //   'LST from L8 module by Sofia Ermida',
  //   styles.credits,
  //   'https://github.com/sofiaermida/Landsat_SMW_LST/blob/master/modules/Landsat_LST.js'
  //   )
  // )
  // .add(makeLabel(
  //   'Earth Engine community color palettes',
  //   styles.credits,
  //   'https://github.com/gee-community/ee-palettes'
  //   )
  // )
;
// ----------------------------------------------
// Compose panel
// ----------------------------------------------
panel.add(title)
  .add(makeInstructions('Click, hold, and drag map to pan.\nClick + or - to change zoom.\nClick DRAW button to redraw S2 image at map center.'))
  .add(time_checkbox)
  .add(time_panel)
  .add(spectral_checkbox)
  .add(spectral_panel)
  .add(reset_button)
  .add(viz_checkbox)
  .add(viz_panel)
  .add(centerButton)
  .add(credits_panel)
  ;