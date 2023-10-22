// Sentinel 1 vh
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[96.69462484595942, 17.23428331154523],
          [96.69462484595942, 16.67008650558881],
          [97.14781088111567, 16.674033189519594],
          [97.13545126197505, 17.231987941337895],
          [96.87315267799067, 17.23428331154523]]], null, false),
    Gulf_of_Martban = /* color: #d63000 */ee.Geometry.Polygon(
        [[[96.70371900500243, 17.016963132099757],
          [96.70371900500243, 16.856688544390764],
          [96.89872632922118, 16.856688544390764],
          [96.89872632922118, 17.016963132099757]]], null, false);
var geom = geometry;
var zoomlevel = 12;
Map.centerObject(Gulf_of_Martban, zoomlevel-3);
var usedefaultthresold = true;
Map.setOptions('SATELLITE');
////////  Datasets
var sentinel1 = ee.ImageCollection("COPERNICUS/S1_GRD");
var dem = ee.Image("users/seiasia/MERIT_DEM_SEA");
// var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
var logo = ee.Image("users/seiasia/SEI_GEE_cropped");
////////  Datasets
////////  Functions
var extract_water_sar = function(year,month,day,method, threshold){
  var tidaldate = ee.Date.fromYMD(year,month,day);
  var startdate = tidaldate.advance(-30,'day'); 
  var enddate = tidaldate;
  var sensor;
  var thresholdval;
  if (method == 'VH'){
    sensor = 'VH';
    thresholdval = threshold; //-30; //-25
  }
   if (method == 'VV'){
    sensor = 'VV';
    thresholdval = -20;
  } 
  var filtered1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .select(sensor).filterDate(startdate, enddate).filterBounds(geom)
  .sort('system:time_start', false);
  // print('filtered', filtered1);
  var mean1 = filtered1.reduce(ee.Reducer.median());  //.mean
  // Slope Correction
  var terrain = ee.Algorithms.Terrain(dem);
  var slope = terrain.select('slope').clip(geom);
  mean1 = mean1.mask(slope.lt(5));
  // Map.addLayer(mean1,{min:-30, max: 5}, sensor );
  // Water Detection
  var SMOOTHING_RADIUS = 80;
  var diff_smoothed = mean1.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
  var water12w = diff_smoothed.lt(thresholdval);
  var erode = function(img, distance) {  //N.gorelick code
    var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt();  //.multiply(ee.Image.pixelArea().sqrt())
    return img.updateMask(d.gt(distance));
  };
  var dilate = function(img, distance) {
    var d = img.fastDistanceTransform(distance).sqrt();  // .multiply(ee.Image.pixelArea().sqrt())
    return d.lt(distance).selfMask();
  };
  var out12 = dilate(water12w, 4);
  var erode_out = erode(out12, 4).rename("eroded")
  return erode_out.addBands(diff_smoothed.rename("SAR_out"));
};
// Function to transform canny images -> vectors -> linestrings
function toLineString(image){
  var proj = image.select(0).projection()
 var boundsEroded = geom.buffer(-30)
  var vectors = ee.Image(image).reduceToVectors({
    geometry: geom,
    crs: proj,
    scale: 5,
    eightConnected: true,
    maxPixels: 100000000000000
  });
  vectors = vectors.toList(vectors.size()).map(function(f) {
    f = ee.Feature(f)
    var coords = f.geometry().simplify(25).coordinates()
    return coords.map(function(c) { 
      var geom1 = ee.Geometry.MultiLineString(c).intersection(boundsEroded)
      // EE bug/feature, intersection returns LinearRing geometries, wrap one more time
      geom1 = ee.Geometry.MultiLineString(geom1.coordinates())
      return f
        .setGeometry(geom1)
        .copyProperties(image, ['system:time_start'])
    })
  }).flatten()
  // print(vectors)
  return ee.FeatureCollection(vectors);
}
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var calc_erosion_depo = function(t_pre, r_post){
  // UNCOMMENT IF YOU WANT EROSION AND DEPOSITION
  var erosion = ((t_pre.eq(0).and(r_post.eq(1))).multiply(2)).rename("erosion");
  var deposition = (t_pre.eq(1).and(r_post.eq(0))).rename("water");
  var nochange = t_pre.eq(1).and(r_post.eq(1)).rename("water");
  var compiled = nochange.add(erosion).add(deposition);
  return compiled.selfMask().rename("Erosion");
};
var create_binary = function(inp_vector, inp_raster){
  var image11 = ee.Image().byte().paint(inp_vector, 0);
  var ouput = inp_raster.unmask(image11, false);
  return ouput;
};
var get_bankline = function(image, season_type){
  var scale = 30;
  var simplificationFactor = 6;
  var error = ee.ErrorMargin(scale, "meters");
  var projection = image.projection();
  image = image.gte(0);
  // var waterEdges = toLineString(image)  // Genna Method
  var waterPolygon = image.reduceToVectors(
    {reducer: ee.Reducer.countEvery(),scale: scale,crs: projection,
    geometryType: "polygon",eightConnected: false,geometry:geom,maxPixels: 100000000000000});
  var simplifiedPolygon = waterPolygon.map(function(item)
  {
    item = item.simplify(scale * simplificationFactor);
    item = ee.Feature((item.geometry(error)));
    var type = item.geometry().type();
    var perimcal = item.perimeter();
    return item.set({size: item.geometry().coordinates().flatten().length().divide(2), geometryType: type});
  }, true).filter(ee.Filter.eq("geometryType", "Polygon"));
  var filteredGeo = (simplifiedPolygon.limit(5, "size", false));
  var out = filteredGeo.map(function(f) {
  var outerRingCoordinates = f.geometry().coordinates().get(0);
  var filled = ee.Geometry.LineString(outerRingCoordinates);
  return ee.Feature(filled);
});
  return out.map(function(item){return item.set({season: season_type})});
};
var calc_coastal_erosion = function(ht_year, ht_month, ht_date, thresholdvalue){
  // print('thresholdvalue',thresholdvalue);
  //Current Month
  var lt_date = ht_date;
  var lt_month = ee.Algorithms.If(ee.Number(ht_month).eq(1),12,ee.Number(ht_month).subtract(1));
  var lt_year = ee.Algorithms.If(ee.Number(ht_month).eq(1),ee.Number(ht_year).subtract(1),ht_year);
  var newp40_premonsoonvh = extract_water_sar(lt_year,lt_month,lt_date,'VH', thresholdvalue);
  var newp40_postmonsoonvh = extract_water_sar(ht_year,ht_month,ht_date, 'VH', thresholdvalue);
  var vectordata = geom.buffer(100);
  var newp40_premonsoon = create_binary(vectordata, newp40_premonsoonvh.select('eroded'));
  var newp40_postmonsoon = create_binary(vectordata, newp40_postmonsoonvh.select('eroded'));
  var compiled_vh = calc_erosion_depo(newp40_premonsoon, newp40_postmonsoon);
  return compiled_vh.addBands(newp40_premonsoon.rename("Previous Month")).addBands(newp40_postmonsoon.rename("Current Month"))
  .addBands(newp40_premonsoonvh.select("SAR_out").rename("SAR Previous Month")).addBands(newp40_postmonsoonvh.select("SAR_out").rename("SAR Current Month"));
};
////////  Functions
////////  Legend
var colors = ['61C8FF', 'cc3300'];  // A74530
var names = (["Sea", "Erosion"]);
var colorizedVis = {
  min: 1,
  max: 2,
  palette: colors
};
var legend2 = ui.Panel({style: {position: 'bottom-left'}});
legend2.add(ui.Label({
  value: "Coastal Dynamics",
  style: {fontWeight: 'bold',fontSize: '16px',margin: '0 0 4px 0',padding: '0px'}})); 
var entry;
for (var x = 0; x<2; x++){
  entry = [ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value: '██'}),
    ui.Label({value: names[x],style: {margin: '0 0 4px 4px'}})];
  legend2.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
////////  Legend
////////  UI
Map.style().set('cursor', 'crosshair');
Map.add(legend2);
var UI_panel = ui.Panel({style: {position:'top-right', width:'300px',textAlign :'left'}});
var f_title = {fontSize: '18px',fontWeight: "Bold",color: 'blue',padding: '8px 4px 4px 13px'};
var f_subtitle = {fontSize: '14px',fontWeight:'bold', color: 'black'};
var f_text = {fontSize: '14px', color: 'black'};
var f_text1 = {fontSize: '12px', color: 'black'};
var f_stats = {fontSize: '12px', color: 'black'};
var title = ui.Panel([ui.Label({value: 'Coastal Erosion',style: f_title})]);
var subtitle = ui.Panel([ui.Label({value: 'Monitor Coastal Dynamics-Select Month',
      style: f_subtitle})]);
var date_inp = [];
var get_river_layers = function(index_1){};
var showLayer1 = function(index) {Map.onClick(callback)};
var colors = ['61C8FF', 'cc3300'];  // '61C8FF', 'cc3300','ffff00'
var colorizedVis = {min: 1,max: 2, palette: colors};
var getthresh = function(){
  var input_list = UI_panel_params.widgets();
    var threshold_value = ee.String(input_list.get(1).widgets().get(1).getValue());
 var params_dict1 = {
      "threshold": [threshold_value]
 };
 return params_dict1;
}
var getParams_1 = function() {
    var input_list = UI_panel_params.widgets();
    // print(input_list);
    var start_mnth = ee.String(input_list.get(0).widgets().get(1).getValue());
    // print(start_mnth)
    var start_yr = ee.String(input_list.get(0).widgets().get(2).getValue());
    // var threshold_value = ee.String(input_list.get(1).widgets().get(1).getValue());
    // print('threshold_value', threshold_value);
 var params_dict = {
      "startmonth": [start_mnth],
      "startyear": [start_yr],
      // "threshold": [threshold_value]
 };
  return params_dict;
};
var getParams_2 = function() {
    var input_list = UI_panel_params.widgets();
    // print(input_list);
    var start_mnth = ee.String(input_list.get(0).widgets().get(1).getValue());
    var start_yr = ee.String(input_list.get(0).widgets().get(2).getValue());
    var threshold_value = ee.String(input_list.get(2).widgets().get(1).getValue());
    // print('threshold_value', threshold_value);
 var params_dict = {
      "startmonth": [start_mnth],
      "startyear": [start_yr],
      "threshold": [threshold_value]
 };
  return params_dict;
};
var showLayer = function(index) {
  Map.layers().reset();
  // var params = getParams();
  // var month = params.startmonth[0];
  // var year = params.startyear[0];
  // print('stage1')
  var thesholdval;
  var month
  var year
  // print(thresh_checkbox.getValue())
  if (thresh_checkbox.getValue()) {
    var params = getParams_2();
    month = params.startmonth[0];
    year = params.startyear[0];
    thesholdval = params.threshold[0];
    thesholdval = ee.Number.parse(thesholdval);
  }else{
    // print("weqwe")
    thesholdval = -30;
    params = getParams_1();
    month = params.startmonth[0];
    year = params.startyear[0];
  }
  // print('thesholdval 11', thesholdval);
  var geom = ee.Geometry(Map.getBounds(true)).buffer(100);
  Map.setZoom(zoomlevel);
  month = ee.Number.parse(month);
  year = ee.Number.parse(year);
  // thesholdval = ee.Number.parse(thesholdval);
  var output_raster = calc_coastal_erosion(year, month, 1, thesholdval);
  var Output_Pre = get_bankline(output_raster.select('Erosion'), "post-tidal");
  Map.addLayer(output_raster.select('SAR Previous Month'), {min:-26, max:0, palette: "000000,00FFF0"}, "SAR Previous Month", false);
  Map.addLayer(output_raster.select('SAR Current Month'), {min:-26, max:0, palette: "000000,00FFF0"}, "SAR Current Month", false);
  Map.addLayer(output_raster.select('Previous Month'), {min:0, max:1, palette: "000000,00FFF0"}, "land/sea image (Previous Month)", false);
  Map.addLayer(output_raster.select('Current Month'), {min:0, max:1, palette: "000000,00FF00"}, "land/sea image (Current Month)", false);
  Map.addLayer(output_raster.select('Erosion'),colorizedVis,'Eroded Areas');
  Map.addLayer(Output_Pre, {color: "00008b"},"Coastline", false);
};
var threshtxtbox = ui.Textbox({placeholder: "-30", value:date_inp[2], disabled: false, style:{margin:'5px 5px 0px 5px', width:'40px'}})
// var changetoggle = function(){ return threshtxtbox.setDisabled()}
var thresh_checkbox = ui.Checkbox({label: 'Use Entered Threshold value'})
var UI_panel       = ui.Panel({style: {position:'top-left', width:'285px'}});
var UI_panel_title = ui.Label('Coastal Erosion', {fontSize: '20px', fontWeight: 'bold'});
var UI_panel_params = ui.Panel([
      ui.Panel([ui.Label('Enter Month and Year:'), 
                ui.Textbox({placeholder: "MM",value:date_inp[0], style:{margin:'5px 5px 0px 5px', width:'40px'}}),
                ui.Textbox({placeholder: "YYYY",value:date_inp[1], style:{margin:'5px 5px 0px 5px', width:'50px'}})
                ],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([thresh_checkbox]),
      ui.Panel([ui.Label('Enter Threshold value:'), threshtxtbox],ui.Panel.Layout.flow('horizontal'))
                ]);
UI_panel.add(UI_panel_title);
UI_panel.add(UI_panel_params);
ui.root.insert(0, UI_panel);
UI_panel.add(ui.Button({label:'Run',onClick: showLayer,style:{margin:'15px 20px 0px 50px', width:'150px'}}));
UI_panel.add(ui.Label({
  value :'Instructions: Enter Month (MM e.g. April is 04) and year (YYYY e.g. 2019). Click on Run button. Check the Layers tab on right to view selected month Coastal Erosion and current coastline. Threshold values are in negative usually would range from -15 to -40. By default it is kept to -30.',
  style: {fontSize : '12px', margin:'25px 8px 0px 8px'}
}));
////////  FOOTERS
var f_footer = {fontSize: '12px', fontWeight: 0,  color: 'black'}; //position: 'bottom-left'
var footer = ui.Panel([ui.Panel([
  // ui.Label({
  //       value: 'To access historical yearly coastline changes check following link',
  //       style: f_footer
  //   }),
    ui.Label({value: 'Download yearly historical coastline changes (1988-2018)',style: f_footer, targetUrl:'https://drive.google.com/open?id=1gbK6OhIOU9WR5LBGA7vMHzER2JW6-zrE'})]),
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
        value: 'For queries contact: dhyey.bhatpuria@sei.org',
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