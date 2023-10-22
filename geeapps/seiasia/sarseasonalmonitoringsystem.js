// Working Code: 29/8/2019
// New version with pre and post images representing previous and current
// year respectively
Map.setOptions('ROADMAP');
var admin_boundary = ee.FeatureCollection("users/seiasia/MMR_adm3");
var river = ee.ImageCollection("users/seiasia/river_morpho_newcol");  //ALL RIVER RASTERS COLLECTION
var sentinel1 = ee.ImageCollection("COPERNICUS/S1_GRD");
var dem = ee.Image("users/seiasia/MERIT_DEM_SEA");
var point_locations = ee.FeatureCollection("users/seiasia/Irr_Zoom_Pts");
var logo = ee.Image("users/seiasia/SEI_GEE_cropped");
Map.setCenter(94.9107, 20.9398, 7);
// Legend  //////////////////////////////////////////////////////////////////////////////////////
var colors = ['61C8FF', 'cc3300','ffff00'];  // A74530
var names = (["No Change", "Erosion", "Deposition"]);
var colorizedVis = {
  min: 1,
  max: 3,
  palette: colors
};
var legend2 = ui.Panel({style: {position: 'bottom-left'}});
legend2.add(ui.Label({
  value: "River Changes",
  style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0px'}})); 
var entry;
for (var x = 0; x<3; x++){
  entry = [ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value: '██'}),
    ui.Label({value: names[x],style: {margin: '0 0 4px 4px'}})];
  legend2.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
// LEGEND  //////////////////////////////////////////////////////////////////////////////////////
var input_point = [];
// var i_vale = 0;
var date_inp = [];
var inputtransect = [];
var arealist;
var chrt;
var input_ed_layer;
var geom;
var extract_water_sar_vv = function(startdate, enddate){
  // var startdate = ee.Date.fromYMD(year,month,1);
  // var end_day = ee.Algorithms.If(ee.Number(month).eq(2),28,30);
  // var enddate = ee.Date.fromYMD(year,month,end_day);
  geom = ee.Geometry(Map.getBounds(true)).buffer(100);
  var filtered1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .select('VV').filterDate(startdate, enddate).filterBounds(geom)
  .sort('system:time_start', false);//.first();
  var mean1 = filtered1.reduce(ee.Reducer.median());  //.mean
  // Map.addLayer(mean1,{min:-30, max: 5}, "VV "+ year);
  // Slope Correction
  var terrain = ee.Algorithms.Terrain(dem);
  var slope = terrain.select('slope').clip(geom);
  mean1 = mean1.mask(slope.lt(5));
  // Water Detection
  var SMOOTHING_RADIUS = 80;
  var diff_smoothed = mean1.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
  var water12w = diff_smoothed.lt(-20);
  // Map.addLayer(water12w,{}, "water detection "+year);
  var erode = function(img, distance) {  //N.gorelick code
    var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt();  //.multiply(ee.Image.pixelArea().sqrt())
    return img.updateMask(d.gt(distance));
  };
  var dilate = function(img, distance) {
    var d = img.fastDistanceTransform(distance).sqrt();  // .multiply(ee.Image.pixelArea().sqrt())
    return d.lt(distance).selfMask();
  };
  var out12 = dilate(water12w, 4);
  return erode(out12, 4);
};
var select_image_by_dt = function(year){  /// MODIFY
  var year_num = ee.Number.parse(year);
  var pr_start = ee.Date.fromYMD(year_num, 1, 1);
  var pr_end = ee.Date.fromYMD(year_num, 1, 30);
  // var df = inp_shapefile;
  var selectfromcol = river.filterDate(pr_start, pr_end);
  return selectfromcol;
};
var calculateArea = function(image, aoi) {
  var buff_aoi = aoi.buffer(15);
  var areas = ee.Image.pixelArea().addBands(image).reduceRegion({
  geometry:buff_aoi,
  reducer: ee.Reducer.count().group({
    groupField: 1,
    groupName: 'nochange',
  }), scale: 30, maxPixels: 1e8
  }).get("groups");
  return areas;
};
var getParams = function() {
    var input_list = UI_panel_params.widgets(); 
    var start_yr = ee.String(input_list.get(0).widgets().get(1).getValue());
    print(start_yr)
 var params_dict = {
      "startyear": [start_yr]
 };
  return params_dict;
};
var reset_map = function(index){
  Map.layers().reset();
  Map.setOptions('ROADMAP');
  calculate_button.setDisabled(true);
  var removedisplays_1 = Map.layers();
  removedisplays_1.map(function(p){Map.remove(p)});
  var input_point = [];
  // var i_vale = 0;
  // pts_num.setValue('Number of Points added: ' + i_vale);
  date_inp = [];
  inputtransect = [];
  arealist;
  chrt = [];
  premon_label.setValue('Pre-Monsoon area: ' );
  postmon_label.setValue('Post-Monsoon area: ');
};
var compiled_vv;
var get_river_layers = function(index_1){  // EDITED
  var params = getParams();
  var postmonsoon_year =  ee.Number.parse(params.startyear[0]);
  var pr_start = ee.Date.fromYMD(postmonsoon_year, 11, 1);
  var pr_end = ee.Date.fromYMD(postmonsoon_year, 12, 31);
  var newp40_postmonsoonvv = extract_water_sar_vv(pr_start, pr_end);
  var pr_start1 = ee.Date.fromYMD(postmonsoon_year.subtract(1), 11, 1);
  var pr_end1 = ee.Date.fromYMD(postmonsoon_year.subtract(1), 12, 31);
  var newp40_premonsoonvv = extract_water_sar_vv(pr_start1, pr_end1);
  var create_binary = function(inp_vector, inp_raster){
    var image11 = ee.Image().byte().paint(inp_vector, 0);
    var ouput = inp_raster.unmask(image11, false);
    return ouput;
  };
  var vectordata = geom.buffer(100);
  var newp40_premonsoon = create_binary(vectordata,newp40_premonsoonvv);
  var newp40_postmonsoon = create_binary(vectordata, newp40_postmonsoonvv);
  // UNCOMMENT IF YOU WANT EROSION AND DEPOSITION
  var erosion = ((newp40_premonsoon.eq(0).and(newp40_postmonsoon.eq(1)))
  .multiply(2)).rename("erosion");
  var deposition = ((newp40_premonsoon.eq(1).and(newp40_postmonsoon.eq(0)))
  .multiply(3)).rename("deposition");
  var nochange = newp40_premonsoon.eq(1).and(newp40_postmonsoon.eq(1))
  .rename("nochange");
  var compiled = nochange.add(erosion).add(deposition);
  compiled = compiled.selfMask();
  compiled_vv = compiled;
  Map.addLayer(newp40_premonsoon, {min:0, max:1, palette: "000000,00FFF0"}, "WaterBody premonsoon-vv", false);
  Map.addLayer(newp40_postmonsoon, {min:0, max:1, palette: "000000,00FF00"}, "WaterBody postmonsoon-vv", false);
  Map.addLayer(compiled_vv,colorizedVis,'SAR based River VV');
  Map.setOptions('SATELLITE');
  Map.add(legend2);
};
var calc = function(index) {   //MODIFY THE FEATURE
  Map.layers().reset();
  Map.setOptions('SATELLITE');
  // var params = getParams();
  // var StartDate = params.startdate[0];
  var inputdata = inputtransect;
  // var input_ed_layer = select_image_by_dt(StartDate);
  var input_ed_layer = compiled_vv;
  print('compiled_vv', input_ed_layer);
  Map.addLayer(input_ed_layer, colorizedVis,'River');
  // var faetue = "users/seiasia/Centerline_" + StartDate;
  // var table1 = ee.FeatureCollection(faetue);
  var calc_length = function(inpmask, inpimage){
    var pop = inpimage.mask(imagea);
    var areas = pop.reduceRegion({
    geometry: inputtransect, reducer: ee.Reducer.count(), scale: 30});
    var value = areas.get("nochange").getInfo();
    return value * 30;
  };
  var imagea = (input_ed_layer).eq(1);
  var nochange_val = calc_length(imagea, input_ed_layer);
  imagea = (input_ed_layer).eq(2);
  var erosion_val = calc_length(imagea, input_ed_layer);
  imagea = (input_ed_layer).eq(3);
  var deposition_val = calc_length(imagea, input_ed_layer);
  imagea = (input_ed_layer.eq(3)).add(input_ed_layer.eq(1));
  var premon_val = calc_length(imagea, input_ed_layer);
  imagea = ((input_ed_layer).eq(2)).add((input_ed_layer).eq(1));
  var postmon_val = calc_length(imagea, input_ed_layer);
  var removedisplays = Map.layers();
  removedisplays.map(function(p){Map.remove(p)});
  premon_label.setValue('Pre-Monsoon: ' + premon_val + ' meters');
  postmon_label.setValue('Post-Monsoon: ' + postmon_val + ' meters');
  var class_name=['No Change','Erosion','Deposition'];
  var dataTable = [];
  dataTable[0] = ['Geomorphology Process', 'Length (m)'];
  dataTable[1] = ['No Change', nochange_val];
  dataTable[2] = ['Erosion', erosion_val];
  dataTable[3] = ['Deposition', deposition_val];
  var chart_colors = [];
  chart_colors.push({color:colors[0]});
  chart_colors.push({color:colors[1]});
  chart_colors.push({color:colors[2]});
  chrt = ui.Chart(dataTable);
  chrt = chrt.setChartType('PieChart');
  chrt = chrt.setOptions({title: 'Type of Changes on Transect', width: '340px',
    pieStartAngle: 90, slices:chart_colors, legend:{position: 'right'}});
  UI_panel.widgets().set(10, chrt);
  removedisplays = Map.layers();
  removedisplays.map(function(p){Map.remove(p)});
  Map.addLayer(admin_boundary,{},"Administrative Boundary", false);
  Map.addLayer(input_ed_layer, colorizedVis,'River');
  // Map.addLayer(table1, {color: '0000ff', opacity: 0.6},'Centerline', false);
  Map.addLayer(inputdata,{color: 'FFA500', opacity: 0.2},'Transect');
  Map.add(legend2);
  Map.setOptions('SATELLITE');
};
var callback = function(obj){
  input_point = ee.List(input_point).add([obj.lon, obj.lat]);
  var inpggpoint = ee.Geometry.Point([obj.lon, obj.lat]);
  Map.addLayer(inpggpoint,{color: 'FFA500', opacity: 0.2});
};
var showLayer1 = function(index) {
  Map.onClick(callback);
};
// Get the list of IDs and put them into a select
var featurename = point_locations.aggregate_array("Name");
var featurename = ee.List(featurename).sort();
// Display the image with the given ID.
var show_command = function(id) {
  var command_area_select = point_locations.filterMetadata('Name', "equals", id);
  Map.centerObject(command_area_select, 12)};
var location_selection = ui.Panel([ui.Select({
  items: featurename.getInfo(),
  placeholder: "Select Region",
  onChange: show_command,
  style: {fontSize: '20px',margin: '10px 5px 4px 15px', padding: '1px',width:'230px'}})]);
var UI_panel = ui.Panel({style: {position:'top-left', width:'300px'}});
var f_title = {fontSize: '18px',fontWeight: "Bold",color: 'blue',padding: '8px 4px 4px 13px'};
var f_subtitle = {fontSize: '14px',fontWeight:'bold', color: 'black'};
var f_text = {fontSize: '14px', color: 'black'};
var f_text1 = {fontSize: '12px', color: 'black'};
var f_stats = {fontSize: '12px', color: 'black'};
var f_stats_title = {fontSize: '12px', color: 'black',fontWeight : 'bold'};
var title = ui.Panel([
    ui.Label({
        value: 'Dancing River - Ayeyarwady',
        style: f_title
    })
]);
var subtitle = ui.Panel([ui.Label({value: '1. Monitor Erosion and Deposition',
      style: f_subtitle})
      ]);
var UI_panel_params = ui.Panel([
  ui.Panel([ui.Label('Enter Year:'), 
                ui.Textbox({placeholder: "YYYY",value:date_inp[1], style:{margin:'5px 10px 0px 10px', width:'50px'}})
                ],ui.Panel.Layout.flow('horizontal')),
      ui.Button({label:'Display Results', onClick: get_river_layers, style:{margin:'5px 10px 0px 70px', width:'110px'}}),
      ui.Label({value: '2. River Width Change',
      style: f_subtitle}),
      ui.Button({label:'Draw Streamline transect', onClick: showLayer1, style:{margin:'5px 10px 0px 50px', width:'150px'}}),
      ui.Label({value: 'Click on Map area to create transect on either side of river bank.' + 'Wait of the transect to appear on Map. '+ 
      ' The Calculate button will activate after it.',style: f_text1})
      ]);
var pts_num = ui.Label({style: {fontSize: '12px', color: 'blue'}});
var showLayer = function(index) {
  inputtransect = ee.Geometry.LineString(input_point);
  Map.addLayer(inputtransect,{color: 'FFA500', opacity: 0.2}, "Transect");
  input_point = [];
  ui.util.setTimeout(function(ind){calculate_button.setDisabled(false)}, 4000);
};
UI_panel.add(title);
UI_panel.add(location_selection);
UI_panel.add(subtitle);
UI_panel.add(UI_panel_params);
UI_panel.add(pts_num);
ui.root.insert(0, UI_panel);
Map.style().set('cursor', 'crosshair');
// UI_panel.add(ui.Button({
//   label:'Create Transect', 
//   onClick: showLayer,
//   style:{margin:'15px 20px 0px 50px', width:'100px'}
// }));
var UI_panel_buttons = ui.Panel([
  ui.Button({
  label:'Create Streamline Transect', 
  onClick: showLayer}),
], ui.Panel.Layout.flow('horizontal'));
UI_panel.add(UI_panel_buttons);
var calculate_button = ui.Button({
  label:'Calculate', 
  onClick: calc,
  disabled: true
});
UI_panel_buttons.add(calculate_button);
UI_panel.add(ui.Button({
  label:'Reset', 
  onClick: reset_map,
  style:{margin:'15px 20px 0px 70px', width:'120px'}
}));
// UI_panel_buttons.add(
//   ui.Button({
//   label:'Reset', 
//   onClick: reset_map
//   }));
var stats_title_label = ui.Label({value: 'River Width Statistics',
      style: f_stats_title});
var postmon_label = ui.Label({value: 'Pre-Monsoon: ',
      style: f_stats});
var premon_label = ui.Label({value: 'Post-Monsoon: ',
      style: f_stats});
UI_panel.add(stats_title_label);
UI_panel.add(premon_label);
UI_panel.add(postmon_label);
////////  FOOTERS
var f_footer = {fontSize: '12px', fontWeight: 0,  color: 'black'}; //position: 'bottom-left'
var footer = ui.Panel([ui.Panel([
  // ui.Label({
  //       value: 'To access historical yearly coastline changes check following link',
  //       style: f_footer
  //   }),
    ui.Label({value: 'This is a SAR based seasonal monitoring system, to access historical seasonal monitoring system based on optical data click here',style: f_footer, targetUrl:'https://myit-servir.adpc.net/'})]),
        ui.Panel([
      ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'60px',height:'80px'}}),// width = h *0.9
      ui.Panel([ui.Label({
        value: 'This tool is developed by',
        style: f_footer
    }),ui.Label({
        value: 'Stockholm Environment Institute',
        style: f_footer
    }),
      ui.Label({
        value: 'SEI Asia Center',
        style: f_footer,
        targetUrl:'https://www.sei.org/centres/asia'}),
        ], ui.Panel.Layout.flow('vertical'))], ui.Panel.Layout.flow('horizontal')),
    ui.Label({
        value: 'For queries contact: dhyey.bhatpuria@sei.org, karthi.matheswaran@sei.org',
        style: f_footer
    }),
    ui.Label({
        value: 'Disclaimer: Stockholm Environment Institute (SEI) make no express or implied warranty of this application and associated data as to the merchantability or fitness for a particular purpose. SEI shall not be liable for special, consequential or incidental damages attributed to this application and associated data.',
        style: {fontSize: '9px',fontWeight: 0,  color: 'black', position: 'bottom-left'}
    })]
    );
var footer_blank = ui.Panel([
    ui.Label({
          value: '                                                                                                                                                                                                                  ',
        style: {fontSize: '18px', fontWeight: 0,  color: 'black', position: 'bottom-left'}
    })
]);
UI_panel.add(footer_blank);
UI_panel.add(footer);