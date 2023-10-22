var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.9358331261405,
                6.727386706201948
              ],
              [
                -57.935747295452025,
                6.719715070451507
              ],
              [
                -57.93540397269812,
                6.697978112359339
              ],
              [
                -57.90334621055212,
                6.697168285384646
              ],
              [
                -57.90295997245398,
                6.725596668692593
              ],
              [
                -57.92304435355749,
                6.725937628726685
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-57.9358331261405, 6.727386706201948],
          [-57.935747295452025, 6.719715070451507],
          [-57.93540397269812, 6.697978112359339],
          [-57.90334621055212, 6.697168285384646],
          [-57.90295997245398, 6.725596668692593],
          [-57.92304435355749, 6.725937628726685]]]);
// Sentinel-2 Normalized Difference Vegetation Index (NDVI) script, written by Will Deadman (william.m.deadman@gmail.com)
var S2_display = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
var ndvi_palette = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, ' + '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
function addnd(input) {
  var nd = input.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return input.addBands(nd);
}
var site = ee.Geometry.Rectangle(-57.8,6.6,-58,6.8);
Map.setCenter(-57.92,6.71,15);
Map.setOptions('Satellite')
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(aoi);
var composite1 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2015-06-23', '2015-12-30')
                  // .select(['B2','B3','B4','B8'])
                  .map(addnd);
var composite2 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2016-03-01', '2016-09-30')
                  // .select(['B2','B3','B4','B8'])
                  .map(addnd);
var composite3 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2017-03-01', '2017-09-30')
                  // .select(['B2','B3','B4','B8'])
                  .map(addnd);
var composite4 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2018-03-01', '2018-09-30')
                  // .select(['B2','B3','B4','B8'])
                  .map(addnd);
var composite5 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',10)
                  .filterDate('2019-01-01', '2019-12-30')
                  // .select(['B2','B3','B4','B8'])
                  .map(addnd);
var composite6 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2020-01-01', '2020-12-30')
                  // .select(['B2','B3','B4','B8']);
                  .map(addnd);
var composite7 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',5)
                  .filterDate('2021-01-01', '2021-12-30')
                  // .select(['B2','B3','B4','B8']);
                  .map(addnd);
var ndvi_2015 = ui.Map.Layer (composite1.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2015', false);
Map.add(ndvi_2015);
var ndvi_2016 = ui.Map.Layer (composite2.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2016', false);
Map.add(ndvi_2016);
var ndvi_2017 = ui.Map.Layer (composite3.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2017', false); 
Map.add(ndvi_2017);
var ndvi_2018 = ui.Map.Layer (composite4.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2018', false);
Map.add(ndvi_2018);
var ndvi_2019 = ui.Map.Layer (composite5.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2019', false);
Map.add(ndvi_2019);
var ndvi_2020 = ui.Map.Layer (composite6.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2020', false);
Map.add(ndvi_2020);
var ndvi_2021 = ui.Map.Layer (composite7.select('ndvi').median().clip(aoi),{min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI 2021', false);
Map.add(ndvi_2021);
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Mahaica River Mouth Normalized Difference Vegetation Index', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This tool maps the Normalized Difference Vegetation Index in the vacinity of the Mahaica River Mouth in Guyana from 2015 to 2021 using Sentinel 2 imagery. ' +
  'Use the tools below to explore changes in Normalized Difference Vegetation Index.',
    {fontSize: '15px'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Forest Cover Change',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var NDVI2015 = ui.Checkbox('2015').setValue(false); //false = unchecked
var NDVI2016 = ui.Checkbox('2016').setValue(false);
var NDVI2017 = ui.Checkbox('2017').setValue(false);
var NDVI2018 = ui.Checkbox('2018').setValue(false);
var NDVI2019 = ui.Checkbox('2019').setValue(false);
var NDVI2020 = ui.Checkbox('2020').setValue(false);
var NDVI2021 = ui.Checkbox('2021').setValue(false);
//4.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// 4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(NDVI2015)
      .add(NDVI2016)
      .add(NDVI2017)
      .add(NDVI2018)
      .add(NDVI2019)
      .add(NDVI2020)
      .add(NDVI2021)
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent 2015
var doCheckbox15 = function() {
  NDVI2015.onChange(function(checked){
  ndvi_2015.setShown(checked)
  })
}
doCheckbox15();
//Extent 2016
var doCheckbox16 = function() {
  NDVI2016.onChange(function(checked){
  ndvi_2016.setShown(checked)
  })
}
doCheckbox16();
//Extent 2017
var doCheckbox17 = function() {
  NDVI2017.onChange(function(checked){
  ndvi_2017.setShown(checked)
  })
}
doCheckbox17();
//Extent 2018
var doCheckbox18 = function() {
  NDVI2018.onChange(function(checked){
  ndvi_2018.setShown(checked)
  })
}
doCheckbox18();
//Extent 2019
var doCheckbox19 = function() {
  NDVI2019.onChange(function(checked){
  ndvi_2019.setShown(checked)
  })
}
doCheckbox19();
//Extent 2020
var doCheckbox20 = function() {
  NDVI2020.onChange(function(checked){
  ndvi_2020.setShown(checked)
  })
}
doCheckbox20();
//Extent 2021
var doCheckbox21 = function() {
  NDVI2021.onChange(function(checked){
  ndvi_2021.setShown(checked)
  })
}
doCheckbox21();
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var end = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Copyrights:'+
    'This project is supported by Archipelagic & Island States (AIS) and United Nations Development Programme - Indonesia (UNDP)s 2021 Joint Research Innovation Grant. ',
    style: {fontSize: '15px'}
  })
  ]);
//Add this new panel to the larger panel we created 
panel.add(end)