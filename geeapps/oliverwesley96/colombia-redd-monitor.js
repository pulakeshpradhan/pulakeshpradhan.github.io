var PA = ui.import && ui.import("PA", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    RF2013 = ui.import && ui.import("RF2013", "image", {
      "id": "users/oliverwesley96/a1389RF2013"
    }) || ee.Image("users/oliverwesley96/a1389RF2013"),
    shp1389 = ui.import && ui.import("shp1389", "table", {
      "id": "users/oliverwesley96/shp1389"
    }) || ee.FeatureCollection("users/oliverwesley96/shp1389"),
    RF2020 = ui.import && ui.import("RF2020", "image", {
      "id": "users/oliverwesley96/a1389RF2020"
    }) || ee.Image("users/oliverwesley96/a1389RF2020"),
    shp1391 = ui.import && ui.import("shp1391", "table", {
      "id": "users/oliverwesley96/shp1391"
    }) || ee.FeatureCollection("users/oliverwesley96/shp1391"),
    shp1392 = ui.import && ui.import("shp1392", "table", {
      "id": "users/oliverwesley96/shp1392"
    }) || ee.FeatureCollection("users/oliverwesley96/shp1392"),
    shp1400 = ui.import && ui.import("shp1400", "table", {
      "id": "users/oliverwesley96/shp1400"
    }) || ee.FeatureCollection("users/oliverwesley96/shp1400"),
    areas2013 = ui.import && ui.import("areas2013", "imageCollection", {
      "id": "users/oliverwesley96/areas2013"
    }) || ee.ImageCollection("users/oliverwesley96/areas2013"),
    areas2020 = ui.import && ui.import("areas2020", "imageCollection", {
      "id": "users/oliverwesley96/areas2020"
    }) || ee.ImageCollection("users/oliverwesley96/areas2020");
//insert image collections and visualize
var RF13viz = ee.ImageCollection(areas2013)
                .map(function(image) { 
                  return image.visualize({bands: ['classification'], palette: '8A2BE2'})
                });
var RF20viz = ee.ImageCollection(areas2020)
               .map(function(image) { 
                 return image.visualize({bands: ['classification'], palette: 'FA6400'})
               });
var RFimages = {
  '2013': RF13viz, 
  '2020': RF20viz
};
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var styling = {color: 'white', fillColor: '00000000'};
//insert shapefiles for background
leftMap.addLayer(shp1389.style(styling));
leftMap.addLayer(shp1391.style(styling));
leftMap.addLayer(shp1392.style(styling));
leftMap.addLayer(shp1400.style(styling));
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
//insert shapefiles for background
rightMap.addLayer(shp1389.style(styling));
rightMap.addLayer(shp1391.style(styling));
rightMap.addLayer(shp1392.style(styling));
rightMap.addLayer(shp1400.style(styling));
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a year to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(RFimages[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(RFimages), onChange: updateMap});
  select.setValue(Object.keys(RFimages)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(shp1389, 6);
//5.Add title and description//
var header = ui.Label('REDD+ Project Monitor', {fontSize: '25px', fontWeight: 'bold', color: 'dc143c'});
//App summary
var text = ui.Label(
  'This tool maps forest extent in Colombian Forestry Offsetting Projects from the project initiation until present conditions (2020) using a Random Forest Classification derived from Landsat 8 imagery. ' +
  'Use the tools below to explore changes in forest extent.',
    {fontSize: '15px'});
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: 'dc143c'},
  }),
 ]);
//Add this new panel to the larger panel we created 
panel.add(intro)
var places = {
  ACAPA: shp1389,
  SUPP: shp1391,
  CAJAMBRE: shp1392,
  CONCOSTA: shp1400
};
// Define the select button for the AOI
var selectAoi = ui.Select({
  placeholder:'Choose area of interest',
  items:Object.keys(places),
  onChange: function(key){
    Map.clear()
        leftMap.centerObject(places[key], 10)
  }
});
// Add a label.
var selectSIAOI = ui.Label({value:'Zoom into Project Area',
style: {fontSize: '18px', fontWeight: 'bold'}});
// Add the select AOI panel to the map panel.
panel.add(selectSIAOI)
    .add(selectAoi);
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
//4.1) Create a new label for this series of checkboxes
//var RFLabel = ui.Label({value:'Forest Extent',
//style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
//});
//panel.add(RFLabel)
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
var dataTableA = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Area (ha)', role: 'data', type: 'number'},
    {label: 'Area annotation', role: 'annotation', type: 'string'},
    {label: 'colour', role: 'style'}
  ],
  ['2013', 68273.22, '68.27e3','8A2BE2'],
  ['2020', 55571.46, '55.57e3','FA6400'],
];
// Define the chart and print it to the console.
var chartA = ui.Chart(dataTableA).setChartType('ColumnChart').setOptions({
  title: 'ACAPA Forest Extent',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Area (ha)', titleTextStyle: {italic: false, bold: true}, minValue: 0},
  colors: ['8A2BE2','FA6400']
});
var dataTableB = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Area (ha)', role: 'data', type: 'number'},
    {label: 'Area annotation', role: 'annotation', type: 'string'},
    {label: 'colour', role: 'style'}
  ],
  ['2013', 53496.98, '53.5e3','8A2BE2'],
  ['2020', 46411.45, '46.41e3','FA6400'],
];
// Define the chart and print it to the console.
var chartB = ui.Chart(dataTableB).setChartType('ColumnChart').setOptions({
  title: 'SUPP Forest Extent',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Area (ha)', titleTextStyle: {italic: false, bold: true}, minValue: 0},
  colors: ['8A2BE2','FA6400']
});
var dataTableC = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Area (ha)', role: 'data', type: 'number'},
    {label: 'Area annotation', role: 'annotation', type: 'string'},
    {label: 'colour', role: 'style'}
  ],
  ['2013', 49547.36, '49.55e3','8A2BE2'],
  ['2020', 58551.70, '58.55e3','FA6400'],
];
// Define the chart and print it to the console.
var chartC = ui.Chart(dataTableC).setChartType('ColumnChart').setOptions({
  title: 'CAJAMBRE Forest Extent',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Area (ha)', titleTextStyle: {italic: false, bold: true}, minValue: 0},
  colors: ['8A2BE2','FA6400']
});
var dataTableD = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Area (ha)', role: 'data', type: 'number'},
    {label: 'Area annotation', role: 'annotation', type: 'string'},
    {label: 'colour', role: 'style'}
  ],
  ['2013', 48736.07, '48.74e3','8A2BE2'],
  ['2020', 63077.95, '63.08e3','FA6400'],
];
// Define the chart and print it to the console.
var chartD = ui.Chart(dataTableD).setChartType('ColumnChart').setOptions({
  title: 'CONCOSTA Forest Extent',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Area (ha)', titleTextStyle: {italic: false, bold: true}, minValue: 0},
  colors: ['8A2BE2','FA6400']
});
////////////////////////////////////////////////////////
//  8) Create a dropdown menu to display graph results //
////////////////////////////////////////////////////////
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
//Create key of items for dropdown
var yACAPA = 'ACAPA'
var ySUPP = 'SUPP'
var yCAJAMBRE = 'CAJAMBRE'
var yCONCOSTA = 'CONCOSTA'
//Construct Dropdown
var graphSelect = ui.Select({
  items:[yACAPA,ySUPP,yCAJAMBRE,yCONCOSTA],
  placeholder:'Choose Project to Compare Forest Extent',
  onChange: selectLayer,
  style: {position:'top-right'}
})
var constraints = []
//Write a function that runs on change of Dropdown
function selectLayer(){
  var graph = graphSelect.getValue() // get value from dropdown selection
  panelGraph.clear() //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  if (graph == yACAPA){
    panelGraph.add(chartA)
  }
  else if (graph == ySUPP){
    panelGraph.add(chartB)
  }
  else if (graph == yCAJAMBRE){
    panelGraph.add(chartC)
  }
   else if (graph == yCONCOSTA){
    panelGraph.add(chartD)
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
//Create a new label
var graphLabel = ui.Label({value:'Select REDD+ project to display forest extent',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
// Create a hyperlink to an external reference.
var linkA = ui.Label(
    'ACAPA', {},
    'https://registry.verra.org/app/projectDetail/VCS/1389');
var LinkB = ui.Label(
    'SUPP', {},
    'https://registry.verra.org/app/projectDetail/VCS/1391');
var LinkC = ui.Label(
    'CAJAMBRE', {},
    'https://registry.verra.org/app/projectDetail/VCS/1392');
var LinkD = ui.Label(
    'CONCOSTA', {},
    'https://registry.verra.org/app/projectDetail/VCS/1400');    
var linkPanel = ui.Panel(
    [ui.Label('For more information on these REDD+ projects, click the links below:', {fontWeight: 'bold'}), linkA, LinkB, LinkC, LinkD]);
panel.add(linkPanel);