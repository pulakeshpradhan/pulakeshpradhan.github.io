var trends = ui.import && ui.import("trends", "image", {
      "id": "users/yuhjulio/vegtrends_WA"
    }) || ee.Image("users/yuhjulio/vegtrends_WA");
// Configure layers and locations
var layerProperties = {
  'Vegetation Change Category': {
    name: 'b1',
    visParams: {min:1, max: 9, palette:['silver','maroon','red','lightpink','yellow','lightgreen','moccasin','green','blue']},
    legend: [
      {'no change': 'silver'}, {'Vegetation loss': 'maroon'}, {'Woody loss': 'red'},
      {'Herbaceous loss': 'lightpink'}, {'Herbaceous gain/Woody loss': 'yellow'},{'Woody gain/Herbaceous loss': 'lightgreen'},
      {'Herbaceous gain': 'moccasin'},{'Woody gain': 'green'},{'Vegetation gain': 'blue'}
    ],
    defaultVisibility: true
  },
  "Underlying NPP-rainfall relationship": {
    name: 'b2',
    visParams: {min: 1, max: 3, palette: ['black','green','red']},
    legend:
        [{'no valid relationship': 'black'}, {'linear': 'green'}, {'log-linear': 'red'}],
    defaultVisibility: false
  }
};
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
mapPanel.setCenter(
    -5, 14, 6);
// Add these to the interface.
ui.root.setLayout(ui.Panel.Layout.absolute());
ui.root.widgets().reset([mapPanel]);
// Add layers to the map and center it.
for (var key in layerProperties) {
  var filter = trends.select('b2');
  var layer = layerProperties[key];
  if (layer.name == 'b1'){
    var image = trends.select(layer.name).updateMask(filter.gte(2)).visualize(layer.visParams);
    mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
    mapPanel.setOptions('hybrid');
  }else{
    var image = trends.select(layer.name).updateMask(filter.gte(1)).visualize(layer.visParams);
    mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
    mapPanel.setOptions('hybrid');
  }
}
// mask out nodata areas
function addMask(visualized) {
  var valid =
    trends.select(1).gte(1);
    return visualized.updateMask(valid);
}
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a tool panel
var header1 = ui.Label('Vegetation Change in West African Savannas', {fontSize: '32px', color: 'blue', backgroundColor:'grey'});
var header2 = ui.Label('Description', {fontSize: '28px', color: 'white', backgroundColor:'grey'});
var toolPanel = ui.Panel([header1, header2], 'flow', {width: '400px', position:"top-left", backgroundColor:'grey'});
ui.root.widgets().add(toolPanel);
var text = ui.Label(
    "Long-term (1982 - 2013) woody and herbaceous vegetation trends are assessed in the Sudano-Sahelian savanna region of West Africa,\n"
    +"using the change in the sensivity of annual productivity to rainfall variability  over decadal \n"
    +"and inter-annual timescales. The shape of the underlying productivity-rainfall model, whether linear or saturating, \n" 
    +"is also taken into account.",
    {fontSize: '14px', color:'white', backgroundColor:'grey'});
var link1 = ui.Label(
    'Download Data from ORNL DAAC', {color: 'white', backgroundColor:'grey'},
    'https://doi.org/10.3334/ORNLDAAC/1738');    
var link2 = ui.Label(
    'See related publication', {color: 'white', backgroundColor:'grey'},
    'https://www.mdpi.com/2072-4292/11/5/576');
var text2 = ui.Label(
    'Pixel Resolution: 0.05 degree', {color: 'white', backgroundColor:'grey'})
var body = ui.Panel(
    [text,link1,link2,text2], 'flow', {backgroundColor:'grey'});
toolPanel.add(body);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  style: {color: 'white', backgroundColor:'grey'},
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style:{width:'150px', stretch:'horizontal'}
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
// create panel for opacity and select tools and add to toolPanel
var viewPanel =
    ui.Panel([ui.Label('Choose a layer', {'font-size': '20px', color: 'white', backgroundColor:'grey'}),layerSelect, checkbox, opacitySlider], ui.Panel.Layout.Flow('vertical'), {backgroundColor:'grey'});
toolPanel.add(viewPanel);
//add footnote to data description
var note = ui.Label(
    '*Areas with no significant positive producivity-rainfall relationship are excluded from trend analysis.',
    {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '2x', color: 'white', backgroundColor:'grey'});
toolPanel.add(note);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '2x', position: "bottom-left", color: 'white', backgroundColor:'grey'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '20px', margin: '0 0 4px 0', padding: '0', color: 'white', backgroundColor:'grey'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel()
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
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
    var description = ui.Label(name, {margin: '0 0 4px 6px', color: 'white', backgroundColor:'grey'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'), {color: 'white', backgroundColor:'grey'}));
    keyPanel.style({color: 'white', backgroundColor:'grey'})
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);