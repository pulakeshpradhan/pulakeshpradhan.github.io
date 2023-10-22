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
// var site = ee.Geometry.Rectangle(-57.8,6.6,-58,6.8);
Map.setCenter(-57.92,6.71,15);
Map.setOptions('Satellite')
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(aoi);
var composite1 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2015-06-23', '2015-12-30')
                  .select(['B2','B3','B4','B8']);
var composite2 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2016-03-01', '2016-09-30')
                  .select(['B2','B3','B4','B8']);
var composite3 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2017-03-01', '2017-09-30')
                  .select(['B2','B3','B4','B8']);
var composite4 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2018-03-01', '2018-09-30')
                  .select(['B2','B3','B4','B8']);
var composite5 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',10)
                  .filterDate('2019-01-01', '2019-12-30')
                  .select(['B2','B3','B4','B8']);
var composite6 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .filterDate('2020-01-01', '2020-12-30')
                  .select(['B2','B3','B4','B8']);
var composite7 = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',5)
                  .filterDate('2021-01-01', '2021-12-30')
                  .select(['B2','B3','B4','B8']);
var uct1 = composite1.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting1 = uct1.limit(1,'system:time_start', false).first();
var date1 = ee.Date(lasting1.get('system:time_start'));
var uct2 = composite2.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting2 = uct2.limit(2,'system:time_start', false).first();
var date2 = ee.Date(lasting2.get('system:time_start'));
var uct3 = composite3.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting3 = uct3.limit(3,'system:time_start', false).first();
var date3 = ee.Date(lasting3.get('system:time_start'));
var uct4 = composite4.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting4 = uct4.limit(4,'system:time_start', false).first();
var date4 = ee.Date(lasting4.get('system:time_start'));
var uct5 = composite5.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting5 = uct5.limit(5,'system:time_start', false).first();
var date5 = ee.Date(lasting5.get('system:time_start'));
var uct6 = composite6.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting6 = uct6.limit(6,'system:time_start', false).first();
var date6 = ee.Date(lasting6.get('system:time_start'));
var uct7 = composite7.filterMetadata('MGRS_TILE','equals','21NUH');
var lasting7 = uct7.limit(7,'system:time_start', false).first();
var date7 = ee.Date(lasting7.get('system:time_start'));
// print(uct)
// Define the visualization parameters.
var vizParams = {
  bands: ['B8', 'B4', 'B3'],
  min: 700,
  max: 2500
};
var ext2015 = ui.Map.Layer(lasting1.clip(aoi), vizParams, 'FCC1',false)
var ext2016 = ui.Map.Layer(lasting2.clip(aoi), vizParams, 'FCC2',false)
var ext2017 = ui.Map.Layer(lasting3.clip(aoi), vizParams, 'FCC3',false)
var ext2018 = ui.Map.Layer(lasting4.clip(aoi), vizParams, 'FCC4',false)
var ext2019 = ui.Map.Layer(lasting5.clip(aoi), vizParams, 'FCC5',false)
var ext2020 = ui.Map.Layer(lasting6.clip(aoi), vizParams, 'FCC6',false)
var ext2021 = ui.Map.Layer(lasting7.clip(aoi), vizParams, 'FCC7',false)
Map.add(ext2015);
Map.add(ext2016);
Map.add(ext2017);
Map.add(ext2018);
Map.add(ext2019);
Map.add(ext2020);
Map.add(ext2021);
// var cEI1 = ee.String(lasting1.get('system:index'))
// var dT1 = ((((cEI1.slice(6,8)).cat('/')).cat(cEI1.slice(4,6))).cat('/')).cat(cEI1.slice(2,4))
// var dTitle1 = ee.String('Image acquisition date ').cat(dT1).getInfo();
// var title1 = ui.Label(dTitle1);
// title1.style().set('position', 'top-center');
// Map.add(title1);
// var cEI2 = ee.String(lasting2.get('system:index'))
// var dT2 = ((((cEI2.slice(6,8)).cat('/')).cat(cEI2.slice(4,6))).cat('/')).cat(cEI2.slice(2,4))
// var dTitle2 = ee.String('Image acquisition date ').cat(dT2).getInfo();
// var title2 = ui.Label(dTitle2);
// title2.style().set('position', 'top-center');
// Map.add(title2);
// var cEI3 = ee.String(lasting3.get('system:index'))
// var dT3 = ((((cEI3.slice(6,8)).cat('/')).cat(cEI3.slice(4,6))).cat('/')).cat(cEI3.slice(2,4))
// var dTitle3 = ee.String('Image acquisition date ').cat(dT3).getInfo();
// var title3 = ui.Label(dTitle3);
// title3.style().set('position', 'top-center');
// Map.add(title3);
// var cEI4 = ee.String(lasting4.get('system:index'))
// var dT4 = ((((cEI4.slice(6,8)).cat('/')).cat(cEI4.slice(4,6))).cat('/')).cat(cEI4.slice(2,4))
// var dTitle4 = ee.String('Image acquisition date ').cat(dT4).getInfo();
// var title4 = ui.Label(dTitle4);
// title4.style().set('position', 'top-center');
// Map.add(title4);
// var cEI5 = ee.String(lasting5.get('system:index'))
// var dT5 = ((((cEI5.slice(6,8)).cat('/')).cat(cEI5.slice(4,6))).cat('/')).cat(cEI5.slice(2,4))
// var dTitle5 = ee.String('Image acquisition date ').cat(dT5).getInfo();
// var title5 = ui.Label(dTitle5);
// title5.style().set('position', 'top-center');
// Map.add(title5);
// var cEI6 = ee.String(lasting6.get('system:index'))
// var dT6 = ((((cEI6.slice(6,8)).cat('/')).cat(cEI6.slice(4,6))).cat('/')).cat(cEI6.slice(2,4))
// var dTitle6 = ee.String('Image acquisition date ').cat(dT6).getInfo();
// var title6 = ui.Label(dTitle6);
// title6.style().set('position', 'top-center');
// Map.add(title6);
// var cEI7 = ee.String(lasting7.get('system:index'))
// var dT7 = ((((cEI7.slice(6,8)).cat('/')).cat(cEI7.slice(4,6))).cat('/')).cat(cEI7.slice(2,4))
// var dTitle7 = ee.String('Image acquisition date ').cat(dT7).getInfo();
// var title7 = ui.Label(dTitle7);
// title7.style().set('position', 'top-center');
// Map.add(title7);
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Mahaica River Mouth Dynamics', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This tool maps the dynamics in the vacinity of the Mahaica River Mouth in Guyana from 2015 to 2021 using Sentinel 2 imagery. ' +
  'Use the tools below to explore changes in the river mouth area dynamics.',
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
    value:'Select layers to display.',
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
var FCC2015 = ui.Checkbox('2015').setValue(false); //false = unchecked
var FCC2016 = ui.Checkbox('2016').setValue(false);
var FCC2017 = ui.Checkbox('2017').setValue(false);
var FCC2018 = ui.Checkbox('2018').setValue(false);
var FCC2019 = ui.Checkbox('2019').setValue(false);
var FCC2020 = ui.Checkbox('2020').setValue(false);
var FCC2021 = ui.Checkbox('2021').setValue(false);
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
panel.add(FCC2015)
      .add(FCC2016)
      .add(FCC2017)
      .add(FCC2018)
      .add(FCC2019)
      .add(FCC2020)
      .add(FCC2021)
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent 2015
var doCheckbox15 = function() {
  FCC2015.onChange(function(checked){
  ext2015.setShown(checked)
  })
}
doCheckbox15();
//Extent 2016
var doCheckbox16 = function() {
  FCC2016.onChange(function(checked){
  ext2016.setShown(checked)
  })
}
doCheckbox16();
//Extent 2017
var doCheckbox17 = function() {
  FCC2017.onChange(function(checked){
  ext2017.setShown(checked)
  })
}
doCheckbox17();
//Extent 2018
var doCheckbox18 = function() {
  FCC2018.onChange(function(checked){
  ext2018.setShown(checked)
  })
}
doCheckbox18();
//Extent 2019
var doCheckbox19 = function() {
  FCC2019.onChange(function(checked){
  ext2019.setShown(checked)
  })
}
doCheckbox19();
//Extent 2020
var doCheckbox20 = function() {
  FCC2020.onChange(function(checked){
  ext2020.setShown(checked)
  })
}
doCheckbox20();
//Extent 2021
var doCheckbox21 = function() {
  FCC2021.onChange(function(checked){
  ext2021.setShown(checked)
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