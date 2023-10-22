/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var state = ee.FeatureCollection("users/adis/indianState"),
    JRC = ee.Image("JRC/GSW1_3/GlobalSurfaceWater");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Import Layers of Interest//
//Set up general display
//Set up a satellite background
Map.setOptions('Satellite')
//Center the map to India
Map.setCenter(78.9629, 20.5937, 10);
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
//Create variables for GUI layers for each layer
//We set each layer to "false" so the user can turn them on later
var water = ui.Map.Layer(JRC, {
  bands: ['occurrence'],
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'ffbbbb', '0000ff']
}, 'Water',false)
//Drop Down For State Selection//
// EXTRACT STATE NAMES TO A VARIABLE
var StateNames = state.aggregate_array('ST_NM').distinct().sort()
// SELECT A STATE FROM DROP DOWN SELECT WIDGET
var StateSelect = ui.Select({
  items: StateNames.getInfo(),
  placeholder: ('Select a State'),
  style: {width: '290px'},
  onChange: function getState(key) {
    print(key)
    return key
  }
});
//Set up panels and widgets for display//
//Set up title and summary widgets//
//App title//
var header = ui.Label('Water Monitoring Webapp (Sense for Water)', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary//
var text = ui.Label(
  'This tool maps Water extent using JRC Global Surface Water Mapping Layers,' +
  'Use the tools below to explore changes in water extent.',
    {fontSize: '15px'});
//Create a panel to hold text//
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '320px',position:'middle-right'}});
// Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
// ADD LABELS AND WIDGETS TO UI
panel.add(ui.Label('Select Area of Interest', {fontWeight: 'bold'}));
panel.add(StateSelect);
//Add these layers to our map. They will be added but not displayed
Map.add(water);
//Add our main panel to the root of our GUI
ui.root.insert(1,panel)
//Add checkbox widgets and legends//
//Create a new label for this series of checkboxes//
var extLabel = ui.Label({value:'Source of Data',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further in the code
var extCheck = ui.Checkbox('JRC Composite Layer').setValue(false); //false = unchecked
// Add functionality to widgets//
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent JRC DATASET
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  water.setShown(checked)
  })
}
doCheckbox();
//Create legends//
//The following code creates legends we can add to the panel//
// Set position of panel
var JRCLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// This uses function to construct a legend for the given single-band vis parameters.
//Requires that the vis parameters specify 'min' and 'max' but not 'bands'.
function makeLegend (water) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((water.max - water.min)/100.0).add(water.min);
  var legendImage = gradient.visualize(water);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('5 m'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('45 m')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck)
      .add(JRCLegend)