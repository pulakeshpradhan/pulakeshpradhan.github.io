// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({style: {width: '300px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(-0.31275, 5.53803, 12);
//map.style().set('cursor', 'crosshair');
// Define some constants.
var Densu1986 = 'Class1986';
var Densu2016 = 'Class2016';
var Ndvi2016 = 'NDVI2016';
// Create an empty list of filter constraints.
var constraints = [];
// Loading the 1986 image
var Image1986 = ee.Image('users/edwinosei1995/CLASSIFIED1986');
var D1986Vis = Image1986.visualize({min:0, max:2, palette: ['green', 'yellow', 'blue']});
print(Image1986)
// Loading the 2016 image
var Image2016 = ee.Image('users/edwinosei1995/CLASSIFIED2016');
var D2016Vis = Image2016.visualize({min:1, max:3, palette: ['green', 'blue', 'red']});
print(Image2016)
// Loading the 2016 image
var ImageN2016 = ee.Image('users/edwinosei1995/NDVI2016');
var N2016Vis = ImageN2016.visualize({min:-0.2, max:0.7, palette: ['blue', 'white', 'green']});
print(ImageN2016)
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [Densu1986, Densu2016, Ndvi2016],
  value: Densu1986,
  onChange: redraw,
});
panel.add(ui.Label('LULC of Densu Delta', {'fontSize': '30px', color: 'red'}));
panel.add(ui.Label('View Different Layers:', {'font-size': '24px'})).add(select);
panel.add(ui.Label('Results from analysis of Landsat images characterizing land use land cover extent.', {'fontSize': '11px'}));
panel.add(ui.Label('0545490268', {'fontSize': '12px'}));
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
panel.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
function refreshLegendColors(selection){
    //  Palette with the colors
    var palette2016 =['FF0000', '22ff00', '1500ff'];
    var palette1986 =['22ff00', '1500ff','FFFF00'];
    var paletteN2016 =['6bb0ee', 'fdfdfd','22ff00'];
    // name of the legend
    var names2016 = ['Settlement','Vegetation','Water'];
    var names1986 = ['Vegetation','Water','Bareland'];
    var namesN2016 = ['Water','Settlement','Vegetation'];
         if(selection == Densu1986){
       // Add color and and names
        for (var j = 0; j < 3; j++) {
          legend.add(makeRow(palette1986[j], names1986[j]));
        }
         }else if(selection == Densu2016){
        // Add color and and names
        for (var i = 0; i < 3; i++) {
          legend.add(makeRow(palette2016[i], names2016[i]));
        }
         }else{
        // Add color and and names
        for (var n = 0; n < 3; n++) {
          legend.add(makeRow(paletteN2016[n], namesN2016[n]));
        }
         }
}
// add legend to map (alternatively you can also print the legend to the console)
panel.add(legend);
// Create a function that adds a constraint of the requested type.
function selectConstraint(name) {
  if (name == Densu1986) {
    addConstraint(name, Image1986, 50);
  } else if (name == Densu2016) {
    addConstraint(name, Image2016, 100);
  } else{
    addConstraint(name, ImageN2016, 160);
  }
  constraint.setValue(null);
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == Densu1986) {
    image = D1986Vis;
  } else if (layer == Densu2016) {
    image = D2016Vis;
  } else{
    image = N2016Vis;
    for (var i = 5; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }}
  map.addLayer(image, {}, layer);
  //GOOD SPOT TO UPDATE LEGEND COLORS
  legend.clear();
  refreshLegendColors(select.getValue());
}
// Invoke the redraw function once at start up to initialize the map.
redraw();