var daskCLASS = ui.import && ui.import("daskCLASS", "image", {
      "id": "projects/ee-kevinbarnes/assets/DASK20230712_classification_norms_clip"
    }) || ee.Image("projects/ee-kevinbarnes/assets/DASK20230712_classification_norms_clip"),
    daskPROB = ui.import && ui.import("daskPROB", "image", {
      "id": "projects/ee-kevinbarnes/assets/DASK20230712_classification_norms_prob_clip"
    }) || ee.Image("projects/ee-kevinbarnes/assets/DASK20230712_classification_norms_prob_clip"),
    PROTECTED = ui.import && ui.import("PROTECTED", "image", {
      "id": "projects/ee-kevinbarnes/assets/DASK_PADUS123_nomarine_nowpawetlands"
    }) || ee.Image("projects/ee-kevinbarnes/assets/DASK_PADUS123_nomarine_nowpawetlands");
var daskCLASS=daskCLASS.subtract(1)
var table = ee.FeatureCollection("FAO/GAUL/2015/level1");
// Interactive exploration of the fab 4
// Allows filtering based on constraints and a popup info window.
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({style: {width: '300px'}});
var panel2 = ui.Panel({style: {width: '400px'}});
var map = ui.Map();
ui.root.add(panel).add(panel2).add(map);
map.setCenter(-99.241, 46.977, 6);
map.style().set('cursor', 'crosshair');
panel2.add(ui.Label({value: "Dakota Skipper Habitat Suitability Models.", style: {fontSize: '20px', fontWeight:'bold'}}))
panel2.add(ui.Label("Random Forest models were trained using 2010-2022 skipper observations and a stratified random sample of available areas. These data were related to a suite of covariates that were summarised at native, local (15-m & 90-m radius), and landscape-scales (800 m radius). The suite of covariates contained environmental data, such as potentially undisturbed grass or perennial grass and forb net primary productivity, and abiotic data related to climate and soils. Models were applied to 30 m resolution imagery. Outputs include binary habitat suitability classification (0 & 1) and habitat suitability index (0-100)."))
panel2.add(ui.Label("In the left pannel use the drop down menu to select which model you would like to view (binary habitat suitability or habitat suitability index). Click on the image to inspect pixel values, and use the checkboxes in the left panel to control what information is displayed. Mask (filter out) pixel values by choosing a model (variable) and threshold value; for example, try displaying habitat suitability classification code equal to 1 and index value greater than or equal to 75."))
//add admin
var admin = ee.FeatureCollection(table);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: admin,
  color: 1,
  width: 1
});
// Define some constants.
var CLASS = 'Habitat Suitability Classificaiton';
var PROB = 'Habitat Suitability Index';
var GREATER_THAN = 'Greater than or equal to';
var LESS_THAN = 'Less than or equal to';
var EQUAL_TO = 'Equal to'
// Create an empty list of filter constraints.
var constraints = [];
// Load the birds set vis
var classVis = daskCLASS.visualize({min:0, max:1, palette: ['indigo', 'yellow']});
var probVis = daskPROB.visualize({min:10, max:80, palette: ['indigo', 'cyan', 'LimeGreen','yellow']});
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [CLASS, PROB],
  value: PROB,
  onChange: redraw,
});
panel.add(ui.Label('Select Model Output:')).add(select);
// Check-boxes to control which layers are shown in the inspector.
panel.add(ui.Label('Info box fields:'));
var classCheck = ui.Checkbox(CLASS).setValue(false);
panel.add(classCheck);
var probCheck = ui.Checkbox(PROB).setValue(true);
panel.add(probCheck);
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({style: {shown: false}});
map.add(inspector);
// Register an onClick handler that populates and shows the inspector panel.
map.onClick(function(coords) {
  // Gather the image bands into a single Image that we can asynchronously sample.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = ee.Image.cat(daskCLASS, daskPROB)
      .unmask(0).sample(point, 30).first().toDictionary();
      print(sample)
  sample.evaluate(function(values) {
    inspector.clear();
    // Display a label that corresponds to a checked checkbox.
    if (classCheck.getValue()) {
      inspector.add(ui.Label('DASK Habitat Suitability Classification: ' + values.b1));
    }
    if (probCheck.getValue()) {
      inspector.add(ui.Label('DASK Habitat Suitability Index: ' + values.b1_1 ));
    }
    inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
// Add a label and select to enable adding a new filter.
panel.add(ui.Label('Filter by Classification/Index Values:'));
var constraint = ui.Select({
  items: [CLASS, PROB],
  placeholder: '[Choose a Variable...]',
  onChange: selectConstraint,
});
panel.add(constraint);
// Create a function that configures a new constraint.
function addConstraint(name, image, defaultValue) {
  panel.add(ui.Label('Filter by ' + name + ':'));
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  // Create a greater-than / less-than selector.
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN, EQUAL_TO],
    value: GREATER_THAN,
    onChange: redraw,
  });
  subpanel.add(mode);
  // Create a textbox for the filter threshold.
  var input = ui.Textbox({
    value: defaultValue,
    style: {width: '100px'},
    onChange: redraw,
  });
  subpanel.add(input);
  panel.add(subpanel);
  // Add this constraint to the global list so we can access the
  // constraints from the redraw() function in the future.
  constraints.push({
    image: image,
    mode: mode,
    value: input,
  });
  redraw();
}
// Create a function that adds a constraint of the requested type.
function selectConstraint(name) {
  if (name == CLASS) {
    addConstraint(name, daskCLASS, 1);
  } else if (name == PROB) {
    addConstraint(name, daskPROB, 40);
  } 
  constraint.setValue(null);
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == CLASS) {
    image = classVis;
  } else if (layer == PROB) {
    image = probVis;
  } 
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gte(value));
    } 
    if (mode==LESS_THAN) {
      image = image.updateMask(constraint.image.lte(value));
    } 
    if (mode==EQUAL_TO) {
      image = image.updateMask(constraint.image.eq(value));
    }
  }
  map.addLayer(image, {}, layer);
  map.addLayer(PROTECTED.selfMask(),{palette:'pink',opacity:0.75},'protected');
  map.addLayer(outline, {palette: 'white'}, 'boundaries');
}
// Invoke the redraw function once at start up to initialize the map.
redraw();