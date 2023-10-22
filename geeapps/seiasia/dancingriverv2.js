//Working Code: 07/8/2019
Map.setOptions('ROADMAP');
var admin_boundary = ee.FeatureCollection("users/seiasia/MMR_adm1");
var river = ee.ImageCollection("users/seiasia/river_boundary_irra");  //ALL RIVER RASTERS COLLECTION
var point_locations = ee.FeatureCollection("users/seiasia/Irr_Zoom_Pts");
Map.setCenter(94.9107, 20.9398, 7);
// Legend
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
var input_point = [];
// var i_vale = 0;
var date_inp = [];
var inputtransect = [];
var arealist;
var chrt;
var select_image_by_dt = function(year){
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
    var start_dt = input_list.get(0).widgets().get(1).getValue();
 var params_dict = {
      "startdate": [start_dt]
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
var get_river_layers = function(index_1){
  var params = getParams();
  var StartDate = params.startdate[0];
  var faetue = "users/seiasia/SEI_ToolsFund/Centerline/CL_" + StartDate;
  var table1 = ee.FeatureCollection(faetue);
  var lol = select_image_by_dt(StartDate);
  var removedisplays11 = Map.layers();
  removedisplays11.map(function(p){Map.remove(p)});
  removedisplays11 = Map.layers();
  removedisplays11.map(function(p){Map.remove(p)});
  Map.setOptions('SATELLITE');
  Map.addLayer(admin_boundary,{},"Administrative Boundary",false);
  Map.addLayer(lol,colorizedVis,'River');
  Map.addLayer(table1,{color: '0000ff', opacity: 0.6},'Center line',false);
  Map.setOptions('SATELLITE');
  Map.add(legend2);
};
var calc = function(index) {
  Map.setOptions('SATELLITE');
  var params = getParams();
  var StartDate = params.startdate[0];
  var inputdata = inputtransect;
  var lol = select_image_by_dt(StartDate);
  var faetue = "users/seiasia/SEI_ToolsFund/Centerline/CL_" + StartDate;
  var table1 = ee.FeatureCollection(faetue);
  var calc_length = function(inpmask, inpimage){
    var pop = inpimage.mask(imagea);
    var areas = pop.reduceRegion({
    geometry: inputtransect, reducer: ee.Reducer.count(), scale: 30});
    var value = areas.get("nochange").getInfo();
    return value * 30;
  };
  var imagea = (lol.first()).eq(1);
  var nochange_val = calc_length(imagea, lol.first());
  imagea = (lol.first()).eq(2);
  var erosion_val = calc_length(imagea, lol.first());
  imagea = (lol.first()).eq(3);
  var deposition_val = calc_length(imagea, lol.first());
  imagea = ((lol.first()).eq(3)).add((lol.first()).eq(1));
  var premon_val = calc_length(imagea, lol.first());
  imagea = ((lol.first()).eq(2)).add((lol.first()).eq(1));
  var postmon_val = calc_length(imagea, lol.first());
  var removedisplays = Map.layers();
  removedisplays.map(function(p){Map.remove(p)});
  premon_label.setValue('Pre-Monsoon area: ' + premon_val + ' meters');
  postmon_label.setValue('Post-Monsoon area: ' + postmon_val + ' meters');
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
  Map.addLayer(lol, colorizedVis,'River');
  Map.addLayer(table1, {color: '0000ff', opacity: 0.6},'Centerline', false);
  Map.addLayer(inputdata,{color: 'FFA500', opacity: 0.2},'Transect');
  // Map.add(legend2);
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
  style: {fontSize: '20px',margin: '10px 5px 4px 15px', padding: '1px',width:'200px'}})]);
var UI_panel = ui.Panel({style: {position:'top-left', width:'300px'}});
var f_title = {fontSize: '18px',fontWeight: "Bold",color: 'blue',padding: '8px 4px 4px 13px'};
var f_subtitle = {fontSize: '14px',fontWeight:'bold', color: 'black'};
var f_text = {fontSize: '14px', color: 'black'};
var f_text1 = {fontSize: '12px', color: 'black'};
var f_stats = {fontSize: '12px', color: 'black'};
var title = ui.Panel([
    ui.Label({
        value: 'Dancing Rivers - Ayeyarwady v1.0',
        style: f_title
    })
]);
var subtitle = ui.Panel([ui.Label({value: '1. Monitor Erosion and Deposition',
      style: f_subtitle})
      ]);
var UI_panel_params = ui.Panel([
  ui.Panel([ui.Label({value: 'Enter Year',style: f_text}),
      ui.Textbox({placeholder: "eg. 2014",value:date_inp[0], style:{margin:'5px 20px 0px 30px', width:'100px'}})],
      ui.Panel.Layout.flow('horizontal')),
      ui.Button({label:'Display Results', onClick: get_river_layers, style:{margin:'5px 10px 0px 50px', width:'100px'}}),
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
  style:{margin:'15px 20px 0px 50px', width:'120px'}
}));
// UI_panel_buttons.add(
//   ui.Button({
//   label:'Reset', 
//   onClick: reset_map
//   }));
var stats_title_label = ui.Label({value: 'River Width Statistics',
      style: {fontSize: '12px', color: 'black',fontWeight : 'bold'}});
var postmon_label = ui.Label({value: 'Pre-Monsoon: ',
      style: f_stats});
var premon_label = ui.Label({value: 'Post-Monsoon: ',
      style: f_stats});
UI_panel.add(stats_title_label);
UI_panel.add(premon_label);
UI_panel.add(postmon_label);
////////                                                    FOOTERS
var f_footer = {fontSize: '12px', fontWeight: 0,  color: 'black'}; //position: 'bottom-left'
var footer = ui.Panel([
    ui.Label({
        value: 'This tool is developed by Stockholm Environment Institute- SEI in collaboration with ADPC for SERVIR Mekong',
        style: f_footer
    }),
    ui.Label({
        value: 'More about SERVIR Mekong and SEI Asia, visit:', //  'More about SERVIR Mekong on https://servir.adpc.net '
        style: f_footer //, position: 'bottom-left'
    }),
    ui.Label({
        value: 'SERVIR Mekong',
        style: f_footer,
        targetUrl:'https://servir.adpc.net'
    }),
    ui.Label({
        value: 'SEI Asia Center',
        style: f_footer,
        targetUrl:'https://www.sei.org/centres/asia'
    }),
    ui.Label({
        value: 'For queries contact: dhyey.bhatpuria@sei.org',
        style: f_footer
    })
]);
var footer_blank = ui.Panel([
    ui.Label({
          value: '                                                                                                                                                                                                                  ',
        style: {fontSize: '18px', fontWeight: 0,  color: 'black', position: 'bottom-left'}
    })
]);
UI_panel.add(footer_blank);
UI_panel.add(footer);
// UI_panel.add(footer1);
// UI_panel.add(footer2);
// UI_panel.add(footer3);