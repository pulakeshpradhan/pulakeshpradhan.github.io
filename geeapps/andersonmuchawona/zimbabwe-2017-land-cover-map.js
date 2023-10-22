var landcover_2017 = ee.Image("users/andersonmuchawona/landcover2017F1" ).select('classification_mean');
var landcoverclass = landcover_2017.mask(landcover_2017);
var count = landcoverclass;
var count = landcoverclass.eq([0,1, 2, 3, 4, 5,
  6, 7, 8, 9, 10
]).rename(['0', 'Bushland', 'Cropland', 'Grassland',
  'Natural moist', 'Forest', 'Water', 'Settlement',
 'Rock outcrop_mine Dump', 'Forest Plantation', 'Wooded grassland',
]);
var total = count.multiply(ee.Image
  .pixelArea()).divide(10000);
// Districts of Zimbabwe
var Districts = ee
  .FeatureCollection(
    'users/andersonmuchawona/ZWEdstricts')
  .filterMetadata('DISTRICT',
    'not_equals', 'Save');
/*
 * Visualization and styling
 */
// Constants used to visualize the data on the map
var landcover_2017_STYLE = {
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
Map.setCenter(28.8963,-18.4732,6);
//Map.setCenter(landcover_2017,6);
// Add our two base layers to the map: tree loss and protected areas
Map.addLayer(landcover_2017.mask(landcover_2017),
  landcover_2017_STYLE);
Map.addLayer(Districts.style(
  PA_STYLE));
// A list of points the user has clicked on, as [lon,lat] tuples
var selectedPoints = [];
// Returns the list of districts the user has selected
function getSelectedDistricts() {
  return Districts.filterBounds(ee
    .Geometry.MultiPoint(
      selectedPoints));
}
var select = ui.Select({
  items: Object.keys( Districts),
  onChange: function(key) {
    print(Districts[key])
    Map.setCenter( Districts[key][0], Districts[key][1]);
  }
});
// Makes a bar chart of the given FeatureCollection of districts areas by name
function makeResultsBarChart(
  Districts) {
  var chart = ui.Chart.image.regions({
      image: total,
      regions: Districts,
      reducer: ee.Reducer.sum(),
      scale: 30,
      seriesProperty: 'DISTRICT'
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
    getSelectedDistricts().style(
      HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(
    overlay));
}
function updateChart() {
  var chartBuilder =
    chartTypeToggleButton.value;
  var chart = chartBuilder(
    getSelectedDistricts());
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
  'Click to select a District for Stats', {
    fontWeight: 'bold',
    fontSize: '20px'
  }));
// Add the panel to the default map
Map.add(inspector);
// Set the default map's cursor to a "crosshair"
Map.style().set('cursor', 'crosshair');
Map.setCenter(28.8963, -18.4732, 8);
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
  var PApoint = Districts
    .filterBounds(point);
  var o_name = ee.List(PApoint
    .aggregate_array("DISTRICT")).map(
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
var header = ui.Label('Zimbabwe 2017 Land Cover Map', {fontSize: '26px', color: 'red'});
var text = ui.Label(
    'Results from analysis of 2017 Sentinel 2 images characterizing forest extent .',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'http://www.forestry.co.zw,for feedback and enquires email anderson@forestry.co.zw',{},
    'http://www.forestry.co.zw');
var linkPanel = ui.Panel(
    [ui.Label('For more information Click the link below', {fontWeight: 'bold'}), link]);
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
              'f4ff90',//Grassland  
              'd69c85',//Natural Moist 
              '11a515',//forest 
              '2727f3',//water 
              '939cc4',//settlement 
              'd63000',//rockoutcrop 
              '19421d',//Forest Plantation
              'd2d616',//Wooded Grassland
	];
	var viz = {min:1,max:10,palette:palette};
var labels = ['Bushland','Cropland', 'Grassland', 'Natural Moist', 'Forest', 'Water', 'settlement', 'Rock', 'Forest Plantation', 'Wooded Grassland'];
//var labels = [
  //'land cover 2017',
//  'Districts'
//];
add_legend('', labels, palette);
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Buhera': {lon: 31.9244, lat: -19.425, zoom: 10},
  'Chimanimani': {lon: 32.6423, lat: -19.8537, zoom: 10},
  'Chipinge': {lon: 32.5223, lat: -20.3604, zoom: 10},
  'Makoni': {lon: 32.1535, lat:-18.3505, zoom: 10},
  'Mutare': {lon: 32.46, lat: -19.18, zoom: 10},
  'Mutasa': {lon: 32.7188, lat: -18.6488, zoom: 10},
  'Nyanga': {lon: 32.7545, lat: -17.771, zoom: 11},
  'Bindura': {lon: 31.2606, lat: -17.1394, zoom: 10},
  'Centenary': {lon: 31.159, lat: -16.3649, zoom: 10},
  'Guruve': {lon: 30.6591, lat: -16.6361, zoom: 10},
  'Mazowe': {lon: 30.9091, lat: -17.231, zoom: 10},
  'Mbire': {lon: 30.5163, lat: -16.1139, zoom: 10},
  'Mount darwin': {lon:31.7001, lat: -16.587, zoom: 10},
  'Rushinga': {lon: 32.3149, lat: -16.5885, zoom: 11},
  'Shamva': {lon: 31.609, lat: -17.0433, zoom: 10},
  'Chikomba': {lon: 31.1009, lat: -18.8163, zoom: 10},
  'Goromonzi': {lon: 31.3591, lat: -17.7661, zoom: 10},
  'Marondera': {lon: 31.6228, lat: -18.1632, zoom: 10},
  'Mudzi': {lon: 32.5754, lat: -16.8737, zoom: 10},
  'Murehwa': {lon: 31.7927, lat: -17.7939, zoom: 10},
  'Mutoko': {lon: 32.2486, lat: -17.4785, zoom: 11},
  'Seke': {lon: 30.9028, lat: -18.2262, zoom: 10},
  'Uzumba': {lon: 32.1058, lat: -16.921, zoom: 10},
  'Wedza': {lon: 31.6141, lat: -18.7251, zoom: 10},
  'Chegutu': {lon: 30.3809, lat: -18.1192, zoom: 10},
  'Hurungwe': {lon: 29.5541, lat: -16.4499, zoom: 10},
  'Kadoma': {lon: 29.9057, lat: -18.3434, zoom: 10},
  'Kariba': {lon: 28.5884, lat: -16.9623, zoom: 11},
  'Makonde': {lon: 30.0073, lat: -17.2267, zoom: 10},
  'Mhondoro_ngezi': {lon: 30.0595, lat: -18.4698, zoom: 10},
  'Sanyati': {lon: 29.6805, lat: -18.0316, zoom: 10},
  'Zvimba': {lon: 30.4413, lat: -17.2044, zoom: 10},
  'Bikita': {lon: 31.9493, lat: -20.1291, zoom: 10},
  'Chiredzi': {lon: 31.8999, lat: -21.4063, zoom: 10},
  'Chivi': {lon: 30.5031, lat: -20.4077, zoom: 11},
  'Gutu': {lon: 31.2172, lat: -19.5632, zoom: 10},
  'Masvingo': {lon: 30.6844, lat: -20.0516, zoom: 10},
  'Mwenezi': {lon: 30.8131, lat: -21.2722, zoom: 10},
  'Zaka': {lon: 31.4229, lat: -20.3479, zoom: 10},
  'Binga': {lon: 27.6324, lat: -17.7549, zoom: 10},
  'Bubi': {lon: 28.6722, lat: -19.5062, zoom: 10},
  'Hwange': {lon: 26.5162, lat: -18.569, zoom: 11},
  'Lupane': {lon: 27.9499, lat: -18.8356, zoom: 10},
  'Nkayi': {lon: 28.6475, lat: -18.9058, zoom: 10},
  'Tsholotsho': {lon: 27.3154, lat: -19.5747, zoom: 10},
  'Umguza': {lon: 28.2108, lat: -19.7687, zoom: 10},
  'Beitbridge': {lon: 29.9339, lat: -21.857, zoom: 11},
  'Bulilima': {lon: 27.5944, lat: -20.2126, zoom: 10},
  'Gwanda': {lon: 29.1984, lat: -21.1607, zoom: 10},
  'Insiza': {lon: 29.3467, lat: -19.9972, zoom: 10},
  'Mangwe': {lon: 27.9316, lat: -20.9023, zoom: 10},
  'Matobo': {lon: 28.4617, lat: -21.0139, zoom: 10},
  'Plumtree': {lon: 29.569, lat: -17.980, zoom: 10},
  'Umzingwane': {lon: 28.9842, lat: -20.2654, zoom: 11},
  'Chirumhanzu': {lon: 30.4591, lat: -19.2288, zoom: 10},
  'Gokwe _south': {lon: 28.509, lat: -18.0551, zoom: 10},
  'Gokwe_north': {lon: 28.8606, lat: -17.4954, zoom: 10},
  'Gweru': {lon: 29.6351, lat: -19.6096, zoom: 10},
  'Zvishavane': {lon: 30.0361, lat: -20.2654, zoom: 10},
  'Shurugwi': {lon: 30.146, lat: -19.6614, zoom: 10},
  'Mberengwa': {lon: 30.0087, lat: -20.7131, zoom: 10},
  'Kwekwe': {lon: 29.701, lat: -18.7666, zoom: 10}
};
// Center the map
var defaultLocation = locationDict['Buhera'];
Map.setCenter(28.8963,-18.4732,10);
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
  ui.Label('Districts to Zoom In', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);