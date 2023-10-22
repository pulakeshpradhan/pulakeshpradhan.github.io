var _ = {
  poi: ee.Geometry.Point([-122.193286,37.012289]),
  extent: '',
  collection: "COPERNICUS/S2_SR",
  s_month: 9,
  e_month: 9,
  year: 2020,
  nbiPre: '',
  nbiPost: '',
  class_dNBR: '',
  cloudFilter: 50,
  preConditions: '',
  postConditions: '',
  region: ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_10"),
  dem: ee.Image('NASA/NASADEM_HGT/001'),
  demMask: '',
  firms: '',
  seriesChart: ''
};
// ----------------------------------
// Define viz parameters for sentinel
// ----------------------------------
var viz = {
  nc: {
    min: 0.0,
    max: 0.3,
    bands: ['B4', 'B3', 'B2'],
    },
  swir_fc: {
    min: 0.0,
    max: 0.3,
    bands: ['B12', 'B8', 'B4'],
    },
  firms: {
    min: 120.0,
    max: 260.0,
    bands: ['T21'],
    palette: ['yellow', 'orange', 'red'],
    }
  }
;
var updateExtent = function() {
  _.extent = _.region
    .filterBounds(_.poi)
  ;
};
updateExtent();
print('Key Terms', 'Initial', _);
// FIRMS dataset
// -------------
// Convert from Kelvin to Farenheit
var convert_k2f = function(image) {
  return  image            // input
  .subtract(273.15).multiply(9).divide(5).add(32)
  ;
};
var updateFIRMS = function() {
  _.firms = ee.ImageCollection('FIRMS')
    .select('T21')
    .filter(ee.Filter.calendarRange(_.year, _.year, 'year'))
    .filter(ee.Filter.calendarRange(_.s_month - 1, _.e_month - 1, 'month'))
    .map(convert_k2f)
  ;
};
updateFIRMS();
print('After firms', _);
// -------------------------------------------------------------------
// Load and filter sentinel dataset  
// -------------------------------------------------------------------
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
// Cloud mask
// -----------
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).multiply(0.0001);
}
// Make image collection
// ---------------------
var makeImageCollection = function(collection, sMonth, eMonth, year, extent) {
  return ee.ImageCollection(collection)
    .filterBounds(extent)
    .filter(ee.Filter.calendarRange(year, year, 'year'))
    .filter(ee.Filter.calendarRange(sMonth, eMonth, 'month'))
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',_.cloudFilter))
    .map(maskS2clouds)
    .select('B12', 'B8', 'B4', 'B3', 'B2')
  ;
};
var updateConditions = function() {
  updateExtent();
  // Make pre-conditions
  // -------------------
  _.preConditions = makeImageCollection(
    _.collection,
    _.s_month,
    _.e_month,
    _.year - 1,
    _.extent
    );
  // Make post-conditions
  // --------------------
  _.postConditions = makeImageCollection(
    _.collection,
    _.s_month,
    _.e_month,
    _.year,
    _.extent
    );
}; 
// End of function
updateConditions();
print('Key Terms', 'Middle', _);
// -------------------------------------------------------------------
// Write function to computer normalized burn severity ratio
// -------------------------------------------------------------------
var burnRatioSentinel = function(image) {
  return image.normalizedDifference(['B8','B12']);
};
var update_dNBR = function() {
// -------------------------------------------------------------------
// Apply function to pre- and post- conditions
// -------------------------------------------------------------------
  _.nbiPre = _.preConditions
    .map(burnRatioSentinel)
  ;
  _.nbiPost = _.postConditions
    .map(burnRatioSentinel)
  ;
// -------------------------------------------------------------------
// Compute delta (change) in normalized burn index 
// -------------------------------------------------------------------
  _.delta_nbi = _.nbiPre
    .median()
    .subtract(
      _.nbiPost
      .median()
      );
}; 
// End of function
update_dNBR();
print(_);
// -------------------------------------------------------------------
// Classify burn severity
// -------------------------------------------------------------------
var classify_dNBR = function() {
  _.class_dNBR = _.delta_nbi
    .gte(-0.25)
    .add(_.delta_nbi.gte(-0.1))
    .add(_.delta_nbi.gte(0.1))
    .add(_.delta_nbi.gte(0.27))
    .add(_.delta_nbi.gte(0.44))
    .add(_.delta_nbi.gte(0.66));
};
classify_dNBR();
// -------------------------------------------------------------------
// Viz parameters
// -------------------------------------------------------------------
var dNBRvis = {
  min: 0,
  max: 6,
  palette: [
    '#778735', 
    '#a7c04f', 
    '#07e444', 
    '#f6fc0d', 
    '#f7b140', 
    '#f86819', 
    '#a601d4'
  ]
};
// -------------------------------------------------------------------
// Legend
// -------------------------------------------------------------------
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
var dNBRlabels = [
  'High post-fire regrowth',
  'Low post-fire regrowth',
  'Unburned',
  'Low Severity',
  'Moderate-low Severity',
  'Moderate-high Severity',
  'High Severity'];
// -------------------------------------------------------------------
// Configure layout
// -------------------------------------------------------------------
var panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
    }
    });
// initialize two maps
// ===================
var leftMap = ui.Map();
var rightMap = ui.Map();
// link the two maps
// =================
var linker = ui.Map.Linker([leftMap,rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var mapLayout = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// add maps to map panel
ui.root.clear();
ui.root.add(mapLayout);
// Make mask from oceans.
// ---------------------
_.demMask = _.dem
  .select('elevation')
  .gt(0);
print(_.demMask);
// Map display
leftMap.setCenter(-122.227327, 37.150974,10);
leftMap.setOptions('TERRAIN');
rightMap.setOptions('TERRAIN');
var updateMap = function() {
  rightMap.layers().set(
    0, 
    ui.Map.Layer(
      _.postConditions.median(), 
      viz.swir_fc, 
      'SWIR False color',
      1,
      0.55)
    );
  rightMap.layers().set(
    1, 
    ui.Map.Layer(
      _.firms.max(), 
      viz.firms, 
      'FIRMS',
      1,
      0.55)
    );
  leftMap.layers().set(
    0, 
    ui.Map.Layer(
      _.class_dNBR.updateMask(_.demMask), 
      dNBRvis, 
      'Change in NBR between',
      1,
      0.55)
    );
  leftMap.layers().set( 
    1, 
    ui.Map.Layer(
      _.postConditions.median(), 
      viz.nc,
      'Natural Color',
      0,
      0.55)
    );
};
updateMap();
// --------------------------------------------------------------------
// Define click handler
// --------------------------------------------------------------------
leftMap.onClick(function(coords) {
  _.poi = ee.Geometry.Point(coords.lon, coords.lat);
  refresh();
  }
);
rightMap.onClick(function(coords) {
  _.poi = ee.Geometry.Point(coords.lon, coords.lat);
  refresh();
  }
);
// --------------------------------------------------------------------
// Make style dictionary for labels
// --------------------------------------------------------------------
var styles = {
  title: {
    fontSize: '24px',
    fontWeight: 'bold'
    },
  instruction: {
    fontSize: '14px',
    color: '#478EC9',
    whiteSpace: 'pre'
    // backgroundColor: background
    },
   credits: {
    fontSize: '10px',
    color: '#999999',
    whiteSpace: 'pre'
    // backgroundColor: background
    }
};
var title_label = ui.Label(
    {
    value: 'Global fire explorer',
    style: styles.title
    }
  );
var credits_label = ui.Label(
    {
    value: 'Jeff Howarth\nGeography Department\nMiddlebury College',
    style: styles.credits
    }
  );
// --------------------------------------------------------------------
// Sliders
// --------------------------------------------------------------------
// Start month  
var s_month_label = ui.Label(
    {
    value: 'Select a start month',
    style: styles.instruction
    }
  );
var s_month_slider = ui.Slider({
  min: 1,
  max: 12,
  value: _.s_month,
  step: 1,
  style: 
    {width: '50%'},
  onChange: function(value) {
    _.s_month = value;
    refresh();
  }
});
var s_month_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      s_month_label, 
      s_month_slider], 
    style: 
    {
      width: '95%',
      shown: true
    }
  }
)
;
var year_label = ui.Label(
    {
    value: 'Select a year',
    style: styles.instruction
    }
  );
var year_slider = ui.Slider({
  min: 2001,
  max: 2022,
  value: _.year,
  step: 1,
  style: 
    {width: '50%'},
  onChange: function(value) {
    _.year = value;
    refresh();
  }
});
var year_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      year_label, 
      year_slider], 
    style: 
    {
      width: '95%',
      shown: true
    }
  }
)
;
// End month  
var e_month_label = ui.Label(
    {
    value: 'Select an end month',
    style: styles.instruction
    }
  );
var e_month_slider = ui.Slider({
  min: 1,
  max: 12,
  value: _.e_month,
  step: 1,
  style: 
    {width: '50%'},
  onChange: function(value) {
    _.e_month = value;
    refresh();
  }
});
var e_month_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [
      e_month_label, 
      e_month_slider], 
    style: 
    {
      width: '95%',
      shown: true
    }
  }
)
;
// Initialize chart panel
var time_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('vertical'),
    widgets: [
      s_month_panel,
      e_month_panel,
      year_panel],
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
// --------------------------------------
// Make legend. 
// --------------------------------------
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
// Make legend panel.
var legend_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('vertical'),
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
// Function to update legend
var updateLegend = function() {
  legend_panel.clear();
  legend_panel.add(
    cart                                                     // module
      .makeGradientLegend(                                                // function
        viz.firms,                                                       // viz parameters
        'FIRMS brightness temperature (F)',                          // legend title
        'bottom-left'                                                     // position on map
      )
  );
  legend_panel.add(
    cart
    .makeLegend(
      'Burn severity', 
      dNBRvis.palette, 
      dNBRlabels
    )
  );
};
updateLegend();
// --------------------------------------------------------------------
// Add time series chart for a location.
// --------------------------------------------------------------------
// Initialize chart panel
var chart_panel = ui.Panel(
  {
    layout: ui.Panel.Layout.flow('vertical'),
    style: 
    {
      width: '95%',
      shown: false
    }
  }
)
;
// Define the chart and print it to the console.
var makeSeriesChart = function() {
  _.seriesChart = ui.Chart.image
    .series({
      imageCollection: _.firms,
      region: _.poi.buffer(5000),
      reducer: ee.Reducer.max(),
      scale: 1000,
      xProperty: 'system:index'
    })
    .setSeriesNames(['poi'])
    .setOptions({
      title: null,
      hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
      vAxis: {
        title: 'Brightness temp (F)',
        titleTextStyle: {italic: false, bold: true}
      },
      lineWidth: 4,
      colors: [viz.firms.palette[2]],
      curveType: 'function'
     })
    .setChartType('AreaChart')
    ;
  chart_panel.clear();
  chart_panel.add(_.seriesChart);
};
makeSeriesChart();
// --------------------------------------------------------------------
// Check boxes.
// --------------------------------------------------------------------
var legend_checkbox = ui.Checkbox({
  label: 'Show legends', 
  value: false,
  style: styles.instructions
  }
);
legend_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  legend_panel.style().set('shown',checked);
});
var time_checkbox = ui.Checkbox({
  label: 'Choose time window', 
  value: false,
  style: styles.instructions
  }
);
time_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  time_panel.style().set('shown',checked);
});
var chart_checkbox = ui.Checkbox({
  label: 'Show time series chart', 
  value: false,
  style: styles.instructions
  }
);
chart_checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  chart_panel.style().set('shown',checked);
});
// --------------------------------------------------------------------
// Add widgets to panel.
// --------------------------------------------------------------------
panel
  .add(title_label)
  .add(legend_checkbox)
  .add(legend_panel)
  .add(time_checkbox)
  .add(time_panel)
  .add(chart_checkbox)
  .add(chart_panel)
  .add(credits_label)
;
leftMap
  .add(panel)
;
var refresh = function() {
  updateExtent();
  updateConditions();
  updateFIRMS();
  update_dNBR();
  classify_dNBR();
  updateMap();
  makeSeriesChart();
};