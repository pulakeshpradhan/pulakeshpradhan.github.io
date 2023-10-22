var table = ui.import && ui.import("table", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    dev = ui.import && ui.import("dev", "image", {
      "id": "projects/ee-kevinbarnes/assets/AAFCNLCD2016_alldev_5670m"
    }) || ee.Image("projects/ee-kevinbarnes/assets/AAFCNLCD2016_alldev_5670m"),
    grs = ui.import && ui.import("grs", "image", {
      "id": "projects/ee-kevinbarnes/assets/AAFCNLCD2016_grsphwetshrb_5670m"
    }) || ee.Image("projects/ee-kevinbarnes/assets/AAFCNLCD2016_grsphwetshrb_5670m"),
    fors = ui.import && ui.import("fors", "image", {
      "id": "projects/ee-kevinbarnes/assets/GFCC_5670m"
    }) || ee.Image("projects/ee-kevinbarnes/assets/GFCC_5670m");
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({style: {width: '300px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(-101.37, 40.66, 5);
map.style().set('cursor', 'crosshair');
// Define some constants.
var AL = 'Alabama';
var AZ = 'Arizona';
var AR = 'Arkansas';
var CA = 'California';
var CO = 'Colorado';
var CT = 'Connecticut';
var DE = 'Delaware';
var FL = 'Florida';
var GA = 'Georgia';
var ID = 'Idaho';
var IL = 'Illinois';
var IN = 'Indiana';
var IA = 'Iowa';
var KN = 'Kansas';
var KY = 'Kentucky';
var LA = 'Louisiana';
var ME = 'Maine';
var MD = 'Maryland';
var MA = 'Massachusetts';
var MI = 'Michigan';
var MN = 'Minnesota';
var MS = 'Mississippi';
var MO = 'Missouri';
var MT = 'Montana';
var NE = 'Nebraska';
var NV = 'Nevada';
var NH = 'New Hampshire';
var NJ = 'New Jersey';
var NM = 'New Mexico';
var NY = 'New York';
var NC = 'North Carolina';
var ND = 'North Dakota';
var OH = 'Ohio';
var OK = 'Oklahoma';
var OR = 'Oregon';
var PE = 'Pennsylvania';
var RI = 'Rhode Island';
var SD = 'South Dakota';
var SC = 'South Carolina';
var TN = 'Tennessee';
var TX = 'Texas';
var UT = 'Utah';
var VT = 'Vermont';
var VA = 'Virginia';
var WA = 'Washington';
var WV = 'West Virginia';
var WI = 'Wisconsin';
var WY = 'Wyoming';
var box = ee.Geometry.Polygon(
        [[[-125.96171875, 50.16613071378527],
          [-125.96171875, 21.273709576605658],
          [-64.43828125000002, 21.273709576605658],
          [-64.43828125000002, 50.16613071378527]]], null, false);
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({style: {shown: false}});
map.add(inspector);
// Add a label and select to enable adding a new filter.
panel.add(ui.Label('Change threshold values for lower 48:'));
// Create a textbox for the filter threshold.
panel.add(ui.Label('Greater Than X % Grass (0-100)'));
  // Create a textbox for the filter threshold.
var input1 = ui.Slider({
    min: 0,
    max: 100,
    value: 15,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input1);
panel.add(ui.Label('Less Than X % Grass (0-100)'))
var input2 = ui.Slider({
    min: 0,
    max: 100,
    value: 60,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input2);
panel.add(ui.Label('Greater Than X % Canopy Cover (0-100)'))
var input3 = ui.Slider({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input3);
panel.add(ui.Label('Less Than X % Canopy Cover (0-100)'))
var input4 = ui.Slider({
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input4);
panel.add(ui.Label('Greater Than X % Developed (0-100)'))
var input5 = ui.Slider({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input5);
panel.add(ui.Label('Less Than X % Developed (0-100)'))
var input6 = ui.Slider({
    min: 0,
    max: 100,
    value: 5,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input6);
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [AL, AZ, AR, CA, CO, CT, DE, FL, GA, ID, IL, IN, IA, KN,
  KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY,
  NC, ND, OH, OK, OR, PE, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV,
  WI, WY],
    value: AL,
    onChange: redraw,
});
panel.add(ui.Label('Update State:')).add(select);
// Add a label and select to enable adding a new filter.
panel.add(ui.Label('Change threshold values for state:'));
// Create a textbox for the filter threshold.
panel.add(ui.Label('Greater Than X % Grass (0-100)'));
  // Create a textbox for the filter threshold.
var input7 =ui.Slider({
    min: 0,
    max: 100,
    value: 15,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input7);
panel.add(ui.Label('Less Than X % Grass (0-100)'))
var input8 = ui.Slider({
    min: 0,
    max: 100,
    value: 60,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input8);
panel.add(ui.Label('Greater Than X % Canopy Cover (0-100)'))
var input9 = ui.Slider({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input9);
panel.add(ui.Label('Less Than X % Canopy Cover (0-100)'))
var input10 = ui.Slider({
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input10);
panel.add(ui.Label('Greater Than X % Developed (0-100)'))
var input11 = ui.Slider({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input11);
panel.add(ui.Label('Less Than X % Developed (0-100)'))
var input12 = ui.Slider({
    min: 0,
    max: 100,
    value: 5,
    step: 1,
    style: {width: '200px'},
    onChange: redraw,
  });
panel.add(input12);
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var input1Val = parseFloat(input1.getValue())
  var input2Val = parseFloat(input2.getValue())
  var input3Val = parseFloat(input3.getValue())
  var input4Val = parseFloat(input4.getValue())
  var input5Val = parseFloat(input5.getValue())
  var input6Val = parseFloat(input6.getValue())
  var selectVal = select.getValue();
  var input7Val = parseFloat(input7.getValue())
  var input8Val = parseFloat(input8.getValue())
  var input9Val = parseFloat(input9.getValue())
  var input10Val = parseFloat(input10.getValue())
  var input11Val = parseFloat(input11.getValue())
  var input12Val = parseFloat(input12.getValue())
  var states = ee.FeatureCollection(table).filterBounds(box);
  var grs_clipped1 = grs.clip(states);
  var fors_clipped1 = fors.clip(states);
  var dev_clipped1 = dev.clip(states);
  var grs_zone1 = grs_clipped1.gte(input1Val).and(grs_clipped1.lte(input2Val)).multiply(1);
  var fors_zone1 = fors_clipped1.gte(input3Val).and(fors_clipped1.lte(input4Val)).multiply(1);
  var dev_zone1 = dev_clipped1.gte(input5Val).and(dev_clipped1.lte(input6Val)).multiply(1);
  var all = dev_zone1.add(grs_zone1).add(fors_zone1).eq(3).add(1);
  var state = ee.FeatureCollection(table).filterBounds(box).filterMetadata('NAME','equals',selectVal);
  var grs_clipped = grs.clip(state);
  var fors_clipped = fors.clip(state);
  var dev_clipped = dev.clip(state);
  var grs_zone = grs_clipped.gte(input7Val).and(grs_clipped.lte(input8Val)).multiply(1);
  var fors_zone = fors_clipped.gte(input9Val).and(fors_clipped.lte(input10Val)).multiply(1);
  var dev_zone = dev_clipped.gte(input11Val).and(dev_clipped.lte(input12Val)).multiply(1);
  var all2 = dev_zone.add(grs_zone).add(fors_zone).eq(3).add(1).unmask(0);
  var all = all2.firstNonZero(all)
  var allVis = all.visualize({min:1, max:2, opacity:0.5, palette: ['dimgray','yellow']});
  map.addLayer(grs.clip(states), {min:0,max:100,palette:['black','indigo','cyan','limegreen','yellow']},'grass',false)
  map.addLayer(fors.clip(states), {min:0,max:100,palette:['black','indigo','cyan','limegreen','yellow']},'forest',false)
  map.addLayer(dev.clip(states), {min:0,max:100,palette:['black','indigo','cyan','limegreen','yellow']},'development',false)
  map.addLayer(states, {}, 'States');
  map.addLayer(allVis, {}, 'Wildlife Benefits Zone');
// Register an onClick handler that populates and shows the inspector panel.
  map.onClick(function(coords) {
  // Gather the image bands into a single Image that we can asynchronously sample.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = ee.Image.cat(grs, fors, dev, all)
      .unmask(0).sample(point, 5670).first().toDictionary();
      print(sample)
  sample.evaluate(function(values) {
    inspector.clear();
    // Display a label that corresponds to a checked checkbox.
    inspector.add(ui.Label('% Grass: ' + values.b1));
    inspector.add(ui.Label('% Canopy Cover: ' + values.b1_1));
    inspector.add(ui.Label('% Developed: ' + values.b1_2));
   inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
}
// Invoke the redraw function once at start up to initialize the map.
redraw();