//var landcover_2017 = ee.Image("users/andersonmuchawona/land40" ).select('classification_mean');
var lower_2017 = ee.Image("users/andersonmuchawona/lowerzambezilandcover" ).select('classification_mean');
var landcoverclass =  lower_2017.mask( lower_2017);
var count = landcoverclass;
var count = landcoverclass.eq([0,1, 2, 3, 4, 5,
  6, 7, 8, 9, 10
]).rename(['0', 'Bushland', 'Cropland', 'Grassland',
  'Natural moist', 'Forest', 'Water', 'Settlement',
 'Rock outcrop_mine Dump', 'Forest Plantation', 'Wooded grassland',
]);
var total = count.multiply(ee.Image
  .pixelArea()).divide(10000);
// wards of lower zambezi project
var wards = ee
  .FeatureCollection(
    'users/andersonmuchawona/projectwardsLWZ')
  .filterMetadata('Ward',
    'not_equals', 'Save');
/*
 * Visualization and styling
 */
// Constants used to visualize the data on the map
var  lower_2017_STYLE = {
  min: 1,
  max: 10,
  palette: ['0afd03', 'ffe5ba', 'f4ff90','d69c85', '11a515', '2727f3', '939cc4', 'd63000','19421d','d2d616']
};
var PA_STYLE = {
  color: '26458d',
  fillColor: '00000000'
};
var HIGHLIGHT_STYLE = {
  color: '8856a7',
  fillColor: '8856a7C0'
};
// Configure our map with a minimal set of controls
//Map.setControlVisibility(false);
//Map.setControlVisibility({
 // scaleControl: true,
//  zoomControl: true
//});
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
Map.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
Map.style().set({
  cursor: 'crosshair'
});
Map.setCenter(30.2452,-16.4184,1);
//Map.setCenter(landcover_2017,1);
// Add our two base layers to the map: tree loss and protected areas
Map.addLayer( lower_2017.mask( lower_2017),
   lower_2017_STYLE);
Map.addLayer(wards.style(
  PA_STYLE));
// A list of points the user has clicked on, as [lon,lat] tuples
var selectedPoints = [];
// Returns the list of districts the user has selected
function getSelectedwards() {
  return wards.filterBounds(ee
    .Geometry.MultiPoint(
      selectedPoints));
}
var select = ui.Select({
  items: Object.keys( wards),
  onChange: function(key) {
    print(wards[key])
    Map.setCenter( wards[key][0], wards[key][1]);
  }
});
// Makes a bar chart of the given FeatureCollection of districts areas by name
function makeResultsBarChart(
  wards) {
  var chart = ui.Chart.image.regions({
      image: total,
      regions: wards,
      reducer: ee.Reducer.sum(),
      scale: 30,
      seriesProperty: 'Ward'
    })
        .setChartType('ColumnChart');
  chart.setOptions({
    title: 'land  Cover 2017',
    vAxis: {
     title: 'hectare'
    },
   hAxis: {
     title: 'Class',
     minValue: 1
    },
    width: 1000,
    height: 300
   });
  chart.style().set({
    stretch: 'both'
  });
  return chart;
 }
// You can add a table of the given FeatureCollection of protected areas by name
// I disabled for now as they are redundant.
 function makeResultsTable(protectedAreas) {
  var table = ui.Chart.image.regions({image:total,regions:Districts,reducer:ee.Reducer.sum(),seriesProperty:'NAME_2'});
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected district
function updateOverlay() {
  var overlay =
    getSelectedwards().style(
      HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(
    overlay));
}
function updateChart() {
  var chartBuilder =
    chartTypeToggleButton.value;
  var chart = chartBuilder(
    getSelectedwards());
  resultsPanel.clear().add(chart).add(
    buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(
    2));
  var instructionsLabel = ui.Label(
    ''
    );
  resultsPanel.widgets().reset([
    instructionsLabel
  ]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly
function handleMapClick(location) {
  selectedPoints.push([location.lon,
    location.lat
  ]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index]
    .label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index]
      .label);
    button.value = states[index]
      .value;
    onClick();
  });
  return button;
}
var chartTypeToggleButton =
  ToggleButton(
    [{
        label: 'Display results as a bar chart',
        value: makeResultsBarChart,
      },
      {
        //  label: 'Display results as a table',
        //  value: makeResultsTable,
      }
    ],
    updateChart);
var buttonPanel = ui.Panel(
  [ui.Button('Clear results',
    clearResults)],
  ui.Panel.Layout.Flow(
  'horizontal'), {
    margin: '0 0 0 auto',
    width: '600px',
    height: 'auto'
  });
var resultsPanel = ui.Panel({
  style: {
    position: 'bottom-left'
  }
});
Map.add(resultsPanel);
clearResults();
// Create an inspector panel with a horizontal layout
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow(
    'vertical')
});
// Add a label to the panel
inspector.add(ui.Label(
  'Click to select a ward for Stats', {
    fontWeight: 'bold',
    fontSize: '20px'
  }));
// Add the panel to the default map
Map.add(inspector);
// Set the default map's cursor to a "crosshair"
Map.style().set('cursor', 'crosshair');
Map.setCenter(30.2452, -16.4184, 8);
// Register an onClick handler that populates and shows the inspector panel
Map.onClick(function(coords) {
  inspector.clear();
  inspector.style().set('shown',
    true);
  inspector.add(ui.Label(
    'Loading...', {
      color: 'gray'
    }));
  var point = ee.Geometry.Point(
    coords.lon, coords.lat);
  var PApoint = wards
    .filterBounds(point);
  var o_name = ee.List(PApoint
    .aggregate_array("Ward")).map(
    function(d) {
      return ee.String(d)
    });
  var status = ee.List(PApoint
      .aggregate_array("PROVINCE"))
    .map(function(d) {
      return ee.String(d)
    });
  var y_status = ee.List(PApoint
      .aggregate_array("ID_2"))
    .map(function(d) {
      return ee.Number(d)
    });
  var type = ee.List(PApoint
      .aggregate_array("DESIG_ENG"))
    .map(function(d) {
      return ee.String(d)
    });
  var list = ee.List([o_name, type,
    status, y_status
  ]);
  // Request the value from the server and use the results in a function
  list.evaluate(function(info) {
    inspector.clear();
    // Add a label with the results from the server
    inspector.add(ui.Label({
      value: info +
        ' (Name ,Province, ID, Year)',
      style: {
        position: 'top-center'
      }
    }));
    // Add a button to hide the Panel
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector
        .style().set(
          'shown',
          false);
      }
    }));
  });
});
// Add a title and some explanatory text to a side panel.
var header = ui.Label(' ZAMBEZI VALLEY BIODIVERSITY PROJECT 2017 LAND COVER  MAP  ', {fontSize: '26px', color: 'red'});
var text = ui.Label(
    'Results from analysis of 2017 Sentinel 2 Satelite images characterizing land use/cover extent .',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Anderson , andersonmuchawona@gmail.com', {},
    'http://www.forestry.co.zw');
var linkPanel = ui.Panel(
    [ui.Label('For more information contact', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
// Create the legend.
var add_legend = function(title, lbl,
  pal) {
  var legend = ui.Panel({
      style: {
        position: 'bottom-left'
      }
    }),
    entry;
  legend.add(ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0px'
    }
  }));
  for (var x = 0; x < lbl
    .length; x++) {
    entry = [ui.Label({
        style: {
          color: pal[x],
          margin: '0 0 4px 0'
        },
        value: '██'
      }),
      ui.Label({
        value: labels[x],
        style: {
          margin: '0 0 4px 4px'
        }
      })
    ];
    legend.add(ui.Panel(entry, ui
      .Panel.Layout.Flow(
        'horizontal')));
  }
  Map.add(legend);
};
//var palette = ['red', '26458d'];
var palette = ['0afd03',// Bushland  
              'ffe5ba',//Cropland  
              'faff71',//Grassland  
              'ce7bd6',//Natural Moist 
              '11a515',//forest 
              '2727f3',//water 
              '939cc4',//settlement 
              'd63000',//rockoutcrop 
              '19421d',//Forest Plantation
              'd2d616',//Wooded Grassland
	];
	var viz = {min:1,max:10,palette:palette};
var labels = ['Bushland','Cropland', 'Grassland','Natural Moist', 'Forest', 'Water', 'settlement', 'Rock', 'Forest Plantation', 'Wooded Grassland'];
//var labels = [
  //'land cover 2017',
//  'Districts'
//];
add_legend('', labels, palette);
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Hurungwe_9': {lon: 29.874945, lat: -16.504159, zoom: 12},
  'Hurungwe_8': {lon: 29.700457, lat: -16.389301, zoom: 12},
  'Hurungwe_7': {lon: 29.425506, lat: -16.012177, zoom: 12},
  'Mbire_1': {lon: 30.298100, lat:-15.896522, zoom: 12},
  'Mbire_4': {lon:  30.796872, lat: -16.091925, zoom: 12},
  'Mbire_16': {lon: 30.350775, lat: -16.283529, zoom: 12},
  'Mbire_2': {lon:  30.297567, lat: -16.040054, zoom: 12},
  'Mbire_5': {lon: 31.080316, lat: -16.043429, zoom: 12},
  'Mbire_11': {lon: 30.179461, lat: -16.216110, zoom: 12},
  'Mbire_13': {lon:  30.969556, lat: -16.156704, zoom: 12},
  'Mbire_12': {lon:  30.625617, lat: -16.122434, zoom: 12},
  'Mbire_3': {lon: 30.523349, lat: -16.085299, zoom: 12},
  'Mbire_9': {lon:  30.500469, lat: -16.183899, zoom: 12},
  'Muzarabani_29': {lon: 30.944449, lat: -16.533603, zoom: 12},
  'Muzarabani_7': {lon:  30.872641, lat: -16.345259, zoom: 12},
  'Muzarabani_13': {lon:  31.002782, lat: -16.703058, zoom: 12},
  'Muzarabani_28': {lon: 30.985273, lat: -16.797027, zoom: 12},
  'Muzarabani_6': {lon:  30.992848, lat: -16.412393, zoom: 12},
  'Muzarabani_23': {lon: 31.223091, lat: -16.058318, zoom: 12},
  'Muzarabani_4': {lon: 31.076463, lat: -16.198129, zoom: 12},
  'Muzarabani_1': {lon: 31.180313, lat: -16.218981, zoom: 12},
  'Muzarabani_5': {lon:  30.994453, lat: -16.278922, zoom: 12},
  'Muzarabani_19': {lon: 31.073869, lat: -16.340161, zoom: 12},
  'Muzarabani_2': {lon: 31.355687, lat: -16.266566, zoom: 12},
  'Muzarabani_24': {lon:  31.326404, lat: -16.163144, zoom: 12},
  'Muzarabani_8': {lon:  31.018095, lat: -16.380175, zoom: 12},
  'Muzarabani_10': {lon: 31.259585, lat: -16.447753, zoom: 12},
  'Muzarabani_9': {lon: 31.070777, lat: -16.447084, zoom: 12},
  'Muzarabani_27': {lon: 31.200521, lat: -16.372776, zoom: 12},
  'Muzarabani_17': {lon: 31.315200, lat: -16.392680, zoom: 12},
  'Muzarabani_21': {lon: 31.150962, lat: -16.514147, zoom: 12},
  'Muzarabani_20': {lon: 31.114918, lat: -16.472150, zoom: 12}
  };
// Center the map
var defaultLocation = locationDict['Hurungwe_9'];
Map.setCenter(30.2452,-16.4184,9);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    print(locationDict[value])
     Map.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Wards to Zoom In', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);