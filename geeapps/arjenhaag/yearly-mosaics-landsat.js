var L4 = ui.import && ui.import("L4", "imageCollection", {
      "id": "LANDSAT/LT04/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT04/C02/T1_L2"),
    L5 = ui.import && ui.import("L5", "imageCollection", {
      "id": "LANDSAT/LT05/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT05/C02/T1_L2"),
    L7 = ui.import && ui.import("L7", "imageCollection", {
      "id": "LANDSAT/LE07/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LE07/C02/T1_L2"),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    L9 = ui.import && ui.import("L9", "imageCollection", {
      "id": "LANDSAT/LC09/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC09/C02/T1_L2");
// Yearly cloud-free Landsat mosaics animation
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// dates
var start = '1988-01-01';
var end = '2023-01-01';
// bands
var L457_BANDS = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7','QA_PIXEL'];
var L89_BANDS = ['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7','QA_PIXEL'];
var STD_NAMES = ['blue','green','red','nir','swir1','swir2','pixel_qa'];
var sel_names = ['swir1','nir','green'];
// animation
var timeStep = 200;  // default is 100
var compact  = true;  // default is false
var a_width  = '400px';   // default is 600px
var position = 'bottom-right';  // default is top-center
// visual parameter(s)
var visParams_rgb = {min:10000, max:25000, gamma:2.5};
var visParams_sng = {min:10000, max:25000, gamma:1.0};
// ----------------------------------------------------------------------------------------- //
// Functions / initial processing
// ----------------------------------------------------------------------------------------- //
// modules
var animation = require('users/arjenhaag/modules:animation');
// align band names
L4 = L4.select(L457_BANDS, STD_NAMES);
L5 = L5.select(L457_BANDS, STD_NAMES);
L7 = L7.select(L457_BANDS, STD_NAMES);
L8 = L8.select(L89_BANDS, STD_NAMES);
L9 = L9.select(L89_BANDS, STD_NAMES);
// merge and filter images
var images = L4.merge(L5).merge(L7).merge(L8).merge(L9);
// Landsat 8 CFMask cloud masking
function applyCFMask(img) {
  // bits 3 and 5 are cloud shadow and cloud, respectively
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // get the pixel QA band
  var qa = img.select('pixel_qa');
  // both flags should be set to zero, indicating clear conditions
  var shadows = qa.bitwiseAnd(cloudShadowBitMask).eq(0);
  var clouds = qa.bitwiseAnd(cloudsBitMask).eq(0);
  var mask = clouds.and(shadows);
  return img.updateMask(mask);
}
images = images.map(applyCFMask);
// ----------------------------------------------------------------------------------------- //
// User Interface
// ----------------------------------------------------------------------------------------- //
// drawing tools
var drawingTools = Map.drawingTools();  // get the drawing tools widget object
drawingTools.setShown(false);  // hide by default to customize
Map.setControlVisibility({zoomControl: false});
// clear existing geometries
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
// geometry clearing and drawing functions
function clearGeometry() {
  var layers = drawingTools.layers();
  // layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  layers.get(0).geometries().reset();
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
// drawing tools listener
// (note that ui.util.debounce wraps the function to reduce the frequency of it being invoked while drawing and editing a geometry)
function drawOff() {
  drawingTools.setShape(null);
}
drawingTools.onDraw(ui.util.debounce(drawOff, 100));
// add placeholder geometry
var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
// drawing tools control
var drawing_control = ui.Panel({
  widgets: [
    ui.Button({
      label: 'Draw rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    })
  ],
  layout: null,
});
// time period
var year_slider_labels = ui.Panel(
  [ui.Label('Start', {margin:'0px 90px 0px 7px'}), ui.Label('End (inclusive)', {margin:'0px'})],
  ui.Panel.Layout.flow('horizontal')
);
var year_slider_1 = ui.Slider(1988, 2022, 1988, 1);
var year_slider_2 = ui.Slider(1988, 2022, 2022, 1);
var year_slider = ui.Panel(
  [year_slider_1, year_slider_2],
  ui.Panel.Layout.flow('horizontal')
);
var years_warning_box = ui.Label('Start year should be less than end year!', {padding:'0px', margin:'0px 7px', color:'red', shown:false});
var period_panel = ui.Panel([
  year_slider_labels,
  year_slider,
  years_warning_box
]);
// mosaics functions
var mosaic_funcs_dict = {
  'Mean': ee.Reducer.mean(),
  'Median': ee.Reducer.median(),
  '25th percentile': ee.Reducer.percentile([25]),
  '75th percentile': ee.Reducer.percentile([75]),
};
var mosaics_functions = ui.Select({items:['Mean', 'Median', '25th percentile', '75th percentile'], value:'Median'});
// visualisation
var vis_options_dict = {
  'True colour': {
    bands: ['red','green','blue'],
    visParams: visParams_rgb
  },
  'False colour': {
    bands: ['swir1','nir','green'],
    visParams: visParams_sng
  }
};
var vis_selector = ui.Select({items:['True colour', 'False colour'], value:'False colour'});
// charts
var charts_panel = ui.Panel([]);
// update function
function updateAll() {
  // clean up
  Map.layers().reset();
  Map.widgets().reset();
  charts_panel.clear();
  // get values from UI
  var bounds = drawingTools.layers().get(0).getEeObject();
  var year_start = year_slider_1.getValue();
  var year_end = year_slider_2.getValue();
  var mosaic_func = mosaic_funcs_dict[mosaics_functions.getValue()];
  var select_bands = vis_options_dict[vis_selector.getValue()]['bands'];
  var select_visParams = vis_options_dict[vis_selector.getValue()]['visParams'];
  // filter and mosaic images
  var images_user = images.filterBounds(bounds).select(select_bands);
  var mosaics_user = ee.ImageCollection(ee.List.sequence(year_start, year_end).map(function(i) {
    var start_year  = ee.Date.fromYMD(i,1,1);
    var end_year    = ee.Date.fromYMD(ee.Number(i).add(1),1,1);
    var images_year = images_user.filterDate(start_year, end_year);
    var mosaic = images_year.reduce(mosaic_func);
    return mosaic.set('year', i, 'year_str', ee.Number(i).format('%d'), 'image_count', images_year.size());
  }));
  // show chart of image counts
  var img_count_chart = ui.Chart.array.values(mosaics_user.aggregate_array('image_count'), 0, mosaics_user.aggregate_array('year_str'));
  img_count_chart.setChartType('ColumnChart');
  img_count_chart.setOptions({
    title: 'Landsat image count per year',
    vAxis: {title: 'Number of images'},
    hAxis: {title: ''},
    legend: 'none'
  });
  // print(img_count_chart);
  charts_panel.add(img_count_chart);
  // print(mosaics_user.first());  // FOR TESTING ONLY
  // Map.addLayer(mosaics_user.first(), visParams, 'test (first)', true);  // FOR TESTING ONLY
  // Map.addLayer(mosaics_user.first(), select_visParams, 'test (first)', true);  // FOR TESTING ONLY
  // load images for animation
  animation.animate(mosaics_user, {
    'maxFrames': mosaics_user.size(),
    // 'vis': visParams,
    'vis': select_visParams,
    'prefix': 'Landsat',
    'label': 'year_str',
    // 'label': '{{year}}',
    'timeStep': timeStep,
    'compact': compact,
    'position': position,
    'width': a_width,
    'map': Map,
    // 'chart': img_count_chart
  });
  // clearGeometry();
  drawingTools.layers().get(0).setShown(false);
}
// toggle UI elements
var toggledUI = true;
function toggleUI() {
  toggledUI = !toggledUI;
  Map.setControlVisibility({
    layerList: toggledUI,
    mapTypeControl: toggledUI
  });
}
// UI panel
var ui_panel = ui.Panel({
  widgets: [
    ui.Label('Yearly Landsat Mosaics Animation', {fontWeight:'bold', fontSize:'20px'}),
    ui.Label('Follow these steps to start loading an animation:'),
    ui.Label('1. Draw bounding box'),
    ui.Label('2. Select start and end year'),
    ui.Label('3. Select function to create yearly mosaics'),
    ui.Label('4. Select the desired visualization'),
    ui.Label('5. Press the update button'),
    ui.Label("6. Wait for all the images to load (see grey bars at top right 'Layers' element; go do something else in the meantime)"),
    ui.Label('The bounding box is saved (until a new one is drawn) so that other settings can be changed to see their effect on the same area.'),
    ui.Label('You can record your screen to save an animation to your local drive. We recommend minimizing all UI elements and going into fullscreen view before doing so.'),
    ui.Label('You can zoom in and out and pan around the map, but keep in mind this will require loading (parts of) the data again.'),
    ui.Label('1. Bounding box', {fontWeight:'bold'}),
    drawing_control,
    ui.Label('2. Time period', {fontWeight:'bold'}),
    period_panel,
    ui.Label('3. Mosaic function', {fontWeight:'bold'}),
    mosaics_functions,
    ui.Label('4. Visualization', {fontWeight:'bold'}),
    vis_selector,
    ui.Label('5. Load images', {fontWeight:'bold'}),
    ui.Button('Update', updateAll),
    ui.Button('Toggle UI', toggleUI),
    charts_panel
  ],
  style: {width: '350px', position: 'top-left'}
});
ui.root.insert(0, ui_panel);