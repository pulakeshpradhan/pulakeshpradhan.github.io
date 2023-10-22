var dist = ui.import && ui.import("dist", "table", {
      "id": "users/premkumars/Sub_Basin"
    }) || ee.FeatureCollection("users/premkumars/Sub_Basin");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATA PRE PROCESSING
// EXTRACT STATE NAMES TO A VARIABLE
var stateNames = dist.aggregate_array('ST_NM').distinct().sort();
var distName = dist.aggregate_array('DISTRICT').sort();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Set up a satellite background
Map.setOptions('Terrain');
//Center the map to India
Map.setCenter(78.9629, 20.5937, 5);
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
// SELECT A STATE FROM DROP DOWN SELECT WIDGET
var StateSelect = ui.Select({
  items: stateNames.getInfo(),
  placeholder: ('Select a Basin'),
  style: {width: '180px'},
  onChange: function getState(key) {
    print(key);
    var selectedpolys = dist.filterMetadata('ST_NM','equals',key);
    var selectedDistNames = selectedpolys.aggregate_array('DISTRICT').sort();
    print(selectedDistNames);
    // PASS THE COUNTY NAMES TO THE ITEMS FOR THE NEXT DROP DOWN LIST
    selectedDistNames.evaluate(function(values) {
    distSelect.items().reset(values);
    distSelect.setValue(values[0], false);
});
  }
});
// SELECT AREA OF INTEREST FROM DROP DOWN SELECT WIDGET
var distSelect = ui.Select({
  placeholder: ('Select a Sub-Basin'),
  style: {width: '180px'},
  onChange: display 
}); 
//This function will be called when the user changes the value in the dropdown
function display(distID){
  var selected = dist.filter(
    ee.Filter.eq('DISTRICT',distID));
  var geometry = selected.geometry();
  print(distID, geometry);
  Map.clear();
  Map.addLayer(geometry,{color:'grey'},distID);
  Map.centerObject(geometry, 8);
  //////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence').clip(geometry);
var change = gsw.select("change_abs").clip(geometry);
var transition = gsw.select('transition').clip(geometry);
var seasonality = gsw.select("seasonality").clip(geometry);
// //////////////////////////////////////////////////////////////
// // Constants
// //////////////////////////////////////////////////////////////
var VIS_OCCURRENCE = {
    min: 0,
    max: 100,
    palette: ['red', 'blue']
};
var VIS_CHANGE = {
    min: -50,
    max: 50,
    palette: ['red', 'black', 'limegreen']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
var VIS_seasonality = {
    min: 0,
    max: 12,
    palette: ['white', 'blue']
};
// //////////////////////////////////////////////////////////////
// // Helper functions
// //////////////////////////////////////////////////////////////
// Create a feature for a transition class that includes the area covered.
function createFeature(transition_class_stats) {
  transition_class_stats = ee.Dictionary(transition_class_stats);
  var class_number = transition_class_stats.get('transition_class_value');
  var result = {
      transition_class_number: class_number,
      transition_class_name: lookup_names.get(class_number),
      transition_class_palette: lookup_palette.get(class_number),
      area_m2: transition_class_stats.get('sum')
  };
  return ee.Feature(null, result);   // Creates a feature without a geometry.
}
// Create a JSON dictionary that defines piechart colors based on the
// transition class palette.
// https://developers.google.com/chart/interactive/docs/gallery/piechart
function createPieChartSliceDictionary(fc) {
  return ee.List(fc.aggregate_array("transition_class_palette"))
    .map(function(p) { return {'color': p}; }).getInfo();
}
// Convert a number to a string. Used for constructing dictionary key lists
// from computed number objects.
function numToString(num) {
  return ee.Number(num).format();
}
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a dictionary for looking up names of transition classes.
var lookup_names = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(numToString),
    gsw.get('transition_class_names')
);
// Create a dictionary for looking up colors of transition classes.
var lookup_palette = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(numToString),
    gsw.get('transition_class_palette')
);
// Create a water mask layer, and set the image mask so that non-water areas
// are transparent.
var water_mask = occurrence.gt(90).mask(1);
// Generate a histogram object and print it to the console tab.
var histogram = ui.Chart.image.histogram({
  image: change,
  region: geometry,
  scale: 30,
  minBucketWidth: 10
});
histogram.setOptions({
  title: 'Histogram of surface water change intensity.'
});
print(histogram);
// Summarize transition classes in a region of interest.
var area_image_with_transition_class = ee.Image.pixelArea().addBands(transition);
var reduction_results = area_image_with_transition_class.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'transition_class_value',
  }),
  geometry: geometry,
  scale: 30,
  bestEffort: true,
});
print('reduction_results', reduction_results);
var roi_stats = ee.List(reduction_results.get('groups'));
var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
print('transition_fc', transition_fc);
////////////////////////////////////////////
//Add checkbox widgets and legends//
//Create a new label for this series of checkboxes//
var extLabel = ui.Label({value:'Source of Data',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further in the code
var extCheck = ui.Checkbox('Transition classes (1984-2021)').setValue(false); //false = unchecked
// Add functionality to widgets//
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent JRC DATASET
var doCheckbox = function() {
  extCheck.onChange (function(checked){
  transition.setShown(checked);
  });
};
doCheckbox();
// //4.4) Add these new widgets to the panel in the order you want them to appear
//       panel.add(extLabel)
//       .add(extCheck);
////////////////////////////////////////////////////////////////////////////////////////
// Add a summary chart.
var transition_summary_chart = ui.Chart.feature.byFeature({
    features: transition_fc,
    xProperty: 'transition_class_name',
    yProperties: ['area_m2', 'transition_class_number']
  })
  .setChartType('PieChart')
  .setOptions({
    title: 'Summary of transition class areas',
    slices: createPieChartSliceDictionary(transition_fc),
    sliceVisibilityThreshold: 0  // Don't group small slices.
  });
// print(transition_summary_chart);
panel.add(transition_summary_chart);
//////////////////////////////////////////////////////////////
// Map Layers
//////////////////////////////////////////////////////////////
// Map.addLayer({
//   eeObject: water_mask,
//   visParams: VIS_WATER_MASK,
//   name: '90% occurrence water mask',
//   shown: false
// });
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2021)",
  visParams: VIS_OCCURRENCE,
  shown: false
});
// Map.addLayer({
//   eeObject: change,
//   visParams: VIS_CHANGE,
//   name: 'occurrence change intensity',
//   shown: false
// });
Map.addLayer({
  eeObject: transition,
  name: 'Transition classes(1984-2021)',
  shown: true
});
Map.addLayer({
  eeObject: seasonality,
  visParams: VIS_seasonality,
  name: 'Seasonality',
  shown: false
});
}
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//App title//
var header = ui.Label('Sense4water decadal inland water dynamics', {fontSize: '25px', fontWeight: 'bold', color: '000137', padding: '10px'});
//App summary//
var text = ui.Label(
  "This application facilitates you to have a dynamic view over the past 36 years of decadal fluctuations in the inland surface water bodies using remote sensing data. Further, the application will foster you to visualize the inland water bodies changes in the viewpoint of seasonal variations, transitions, and variations.",
    {fontSize: '15px'});
//Create a panel to hold text//
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '400px',position:'middle-right'}});
// Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '_____________________________________________________________',
    style: {fontWeight: 'bold',  color: '000137'},
  })]);
// ADD LABELS AND WIDGETS TO UI
panel.add(ui.Label('The seasonal fluctuations highlight the availability of water over the 12 months lightest to darkest colour reflects the availability of water from January to December. ', {fontWeight: 'normal'}));
panel.add(ui.Label('Further, the transition data brings out how the inland water has transformed from one class to another during the past 36 years. The classes are Permanent, New permanent, Lost permanent, Seasonal, New seasonal, Lost seasonal, Seasonal to permanent, Permanent to seasonal, Ephemeral permanent, and Ephemeral seasonal. The shift between these classes can be easily comprehended by the pie chart shown below. Further, the results can be exported in CSV format as per your requirement. ', {fontWeight: 'normal'})); 
panel.add(ui.Label('Select Area of Interest', {fontWeight: 'normal'})); 
var panel11 = ui.Panel({
  widgets: [StateSelect, distSelect],
  style: {
    backgroundColor: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
panel.add(panel11);
panel.add(intro);
ui.root.add(panel);