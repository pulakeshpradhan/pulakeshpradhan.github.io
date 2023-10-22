// Import data
var nlcd = ee.ImageCollection("USGS/NLCD"),
    gfw = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    counties = ee.FeatureCollection("TIGER/2018/Counties");
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                        UI Details and Buttons                                       ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.style().set({cursor: 'crosshair'});
// Make it so county is whatever county is selected on map
// Map.onClick( return something)
Map.addLayer(counties);
// Coordinate list to push clicked point to, then use to filder bounds
var coords = [];
// Filter counties dataset by clicked location
function getCounty(){
  var county_shp = counties.filterBounds(ee.Geometry.Point(coords));
  Map.addLayer(county_shp);
  Map.centerObject(county_shp, 10)
  return county_shp;
}
function handleMapClick(location) {
  coords = [];
  coords.push(location.lon, location.lat);
  Map.remove(Map.layers().get(0));
  getCounty();
  Map.add(runButton);
}
function runButtonClick(location) {
  getAreaChanges();
  Map.remove(runButton);
  Map.add(clearButton);
  Map.remove(Map.layers().get(0));
  Map.remove(Map.layers().get(0));
}
// Clears the set of selected points and resets the overlay 
function clearResults() {
  coords = [];
  Map.remove(Map.layers().get(1));
  Map.remove(Map.layers().get(0));
  panel.remove(panel.widgets().get(7));
  Map.remove(clearButton);
  Map.setCenter(-98.32, 39.66, 5);
  Map.addLayer(counties);
}
Map.onClick(handleMapClick);
// Clear button
var clearButton = ui.Button('Clear', clearResults);
var runButton = ui.Button('Run', runButtonClick);
// Add panel to map for options
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'middle-right'
});
// Give some instructions
var instructions = ui.Label('Type in the name of a county (case sensitive), then press "Enter". Alternatively, click a county on the map.');
instructions.style().set('fontSize', '12px');
// Text box for user to type in county
var textbox = ui.Textbox({
  placeholder: 'Enter county name...',
  onChange: function(text) {
    var county = counties.filter(ee.Filter.eq('NAME',text));
    Map.centerObject(county);
    Map.remove(Map.layers().get(0));
    Map.addLayer(county);
    Map.add(runButton);
    return coords.push(county.geometry().centroid().coordinates().get(0),county.geometry().centroid().coordinates().get(1));
  }
});
// Drop down selectors for start and end years
var startYears = {2001:'2001',2006:'2006',2011:'2011'};
var endYears = {2006:'2006',2011:'2011',2016:'2016'};
var emptyStart = [];
var emptyEnd = [];
var startSelect = ui.Select({
  items: Object.keys(startYears),
  placeholder: 'Start of analysis period',
  onChange: function(key){
    var string = 'USGS/NLCD/NLCD' + key;
    var nlcd_start_img = ee.Image(ee.String(string));
    emptyStart.push(nlcd_start_img.select(['landcover']));
  }
});
var endSelect = ui.Select({
  items: Object.keys(endYears),
  placeholder: 'End of analysis period',
  onChange: function(key){
    var string = 'USGS/NLCD/NLCD' + key;
    var nlcd_end_img = ee.Image(ee.String(string));
    emptyEnd.push(nlcd_end_img.select(['landcover']));
  }
});
// Give the panel a title
var title1 = ui.Label('1. Choose start and end years of analysis period');
title1.style().set('fontWeight','bold');
title1.style().set('color', 'green');
title1.style().set('fontSize', '20px');
var title2 = ui.Label('2. Choose a county to analyze');
title2.style().set('fontWeight','bold');
title2.style().set('color', 'green');
title2.style().set('fontSize', '20px');
var title3 = ui.Label('3. Press "Run" on the map');
title3.style().set('fontWeight','bold');
title3.style().set('color', 'green');
title3.style().set('fontSize', '20px');
// Add widget to panel
panel.add(title1);
panel.add(startSelect);
panel.add(endSelect);
panel.add(title2);
panel.add(instructions);
panel.add(textbox);
panel.add(title3)
Map.add(panel);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                              Begin Analysis                                         ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Whole script in a function
function getAreaChanges(){
  var county = getCounty();
  var tcd2010 = ee.Image("projects/glad/tcc2010");
  var area = ee.Image.pixelArea().divide(10000);
  //NLCD Forest Classification
  //2001
  var nlcd_start = ee.Image(emptyStart[0]);
  var ipcc_start = nlcd_start.remap([11,12,21,22,23,24,31,41,42,43,51,52,71,72,73,74,81,82,90,95],[1085, 1141, 989, 1265, 937, 706, 1438, 908, 1379, 45, 132, 904, 310, 569, 967, 1102, 674, 455, 1128, 512]).reproject('EPSG:4326', null, 30);
  Map.addLayer(nlcd_start.clip(county),{},"NLCD Start Year");
  //2011
  var nlcd_end = ee.Image(emptyEnd[0]);
  var ipcc_end = nlcd_end.remap([11,12,21,22,23,24,31,41,42,43,51,52,71,72,73,74,81,82,90,95],[13319, 14723, 14652, 8960, 9916, 13185, 6735, 9729, 12647, 11869, 6775, 11507, 14167, 10042, 6687, 13850, 19574, 9447, 12266, 11775]);
  Map.addLayer(nlcd_end.clip(county),{},"NLCD End Year")  ;
  // Change raster (includes all nlcd change classes, but labeled ipcc_change)
  var ipcc_change = ipcc_start.subtract(ipcc_end);
  var ipcc_change_and_area = area.addBands(ipcc_change);
  // Changed get area do all change classes within AOI
  var change_class_areas = ipcc_change_and_area.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1
    }),
    geometry: county,
    maxPixels: 1e13,
  });
  // Make resulting list of objects
  var class_areas = ee.List(change_class_areas.get('groups'));
  // Find area of classes in 2001
  var classes_2001 = area.addBands(nlcd_start);
  // UMD Tree Cover Density 
  // 2000
  var tcd_2000_area = ee.Image(gfw.select(['treecover2000'])).multiply(area).multiply(0.01);
  // 2010
  var tcd_2010_area = ee.Image(tcd2010.select(['tcc'])).multiply(area).multiply(0.01);
  // Get average tree area and tree area change between two time periods
  var tcd_avg = ee.Image(gfw.select(['treecover2000'])).add(ee.Image(tcd2010.select(['tcc']))).divide(2);
  var tcd_change = ee.Image(gfw.select(['treecover2000'])).subtract(ee.Image(tcd2010.select(['tcc'])));
  // Find difference
  var tree_area_change = tcd_2000_area.subtract(tcd_2010_area);
  // Find average
  var tree_area_avg = (tcd_2000_area.add(tcd_2010_area)).divide(2);
  // Loss outside NLCD 
  // Just changed this to greater than 0
  var loss_mask = tree_area_change.gt(0);
  loss_mask = loss_mask.updateMask(loss_mask);
  var tree_area_loss = tree_area_change.multiply(loss_mask).clip(county);
  var gain_mask = tree_area_change.lt(0);
  gain_mask = gain_mask.updateMask(gain_mask);
  var tree_area_gain = tree_area_change.multiply(gain_mask).multiply(-1).clip(county);
  var loss_outside_nlcd_and_area = tree_area_loss.addBands(ipcc_change);
  var gain_outside_nlcd_and_area = tree_area_gain.addBands(ipcc_change);
  // Average tree cover
  var area_outside_nlcd_and_area = tree_area_avg.addBands(ipcc_change);
  var tree_net_change = tree_area_change.clip(county);
  // Two periods of tcd and net change
  var tcd_2010 = tcd2010.select(['tcc']).addBands(ipcc_change);
  var tcd_2000 = ee.Image(gfw.select(['treecover2000'])).addBands(ipcc_change);
  var tree_net_change_and_area = tree_net_change.addBands(ipcc_change);
  // 'Tree cover loss area in classes'
  var loss_tree_areas = loss_outside_nlcd_and_area.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1}),
    geometry: county,
    maxPixels: 1e13,
  });
  // 'Tree cover gain area in classes'
  var gain_tree_areas = gain_outside_nlcd_and_area.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1}),
    geometry: county,
    maxPixels: 1e13,
  });
  // Find average tree cover by class 
  var avg_tree_areas = area_outside_nlcd_and_area.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1}),
    geometry: county,
    maxPixels: 1e13,
  });
  // Find tcd 2000 by class 
  var tcd2000_class = tcd_2000.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.mean().group({
      groupField: 1}),
    geometry: county,
    maxPixels: 1e13,
  });
  // Find tcd 2010 by class
  var tcd2010_class = tcd_2010.reproject('EPSG:4326',[0.00025,0,100,0,-0.00025,10]).reduceRegion({
    reducer: ee.Reducer.mean().group({
      groupField: 1}),
    geometry: county,
    maxPixels: 1e13,
  });
  // Pull out the groups from dictionaries
  var tcl = ee.List(loss_tree_areas.get('groups'));
  var tc_gain = ee.List(gain_tree_areas.get('groups'));
  var avg_tree_area = ee.List(avg_tree_areas.get('groups'));
  var tcd_00 = ee.List(tcd2000_class.get('groups'));
  var tcd_10 = ee.List(tcd2010_class.get('groups'));
  var leng = ee.List.sequence(0,class_areas.length().subtract(1),1);
  // Return the sums for each group
  var class_areas_results = class_areas.map(function(y){
    var val = ee.Dictionary(y).get('sum');
      return val;
  });
  var tcl_results = tcl.map(function(y){
    var val = ee.Dictionary(y).get('sum');
      return val;
  });
  var tc_gain_results = tc_gain.map(function(y){
    var val = ee.Dictionary(y).get('sum');
      return val;
  });
  var avg_tree_area_results = avg_tree_area.map(function(y){
    var val = ee.Dictionary(y).get('sum');
      return val;
  });
  var tcd_00_results = tcd_00.map(function(y){
    var val = ee.Dictionary(y).get('mean');
      return val;
  });
  var tcd_10_results = tcd_10.map(function(y){
    var val = ee.Dictionary(y).get('mean');
      return val;
  });
  ////////////////////////////////////end of processing -- create feature class now////////////////////////////////////////////////
  // Pull out change class unique group numeric labels
  var keys_list = leng.map(function(x){
    var d = ee.Dictionary(class_areas.get(x));
    var key = ee.String(d.get('group'));
    return key;
  })
  // Pull out areas of each change class
  var vals_list = leng.map(function(x){
    var d = ee.Dictionary(class_areas.get(x));
    var val = d.get('sum');
    return val;
  })
  // Remap group values to class names based on which classes were calculated
  var from_list = ee.List(["-5297","-8009","-8291","-11747","-7522","-8478","-13214","-5337","-10337","-11209","-12729","-5249","-10431","-12412","-11881","-18136","-13285","-8604","-10069","-10828","-6280","-8992","-9274","-12730","-8505","-9461","-14197","-6320","-11320","-12192","-13712","-6232","-11414","-13395","-12864","-19119","-14268","-9587","-11052","-11811","-5827","-8539","-8821","-12277","-8052","-9008","-13744","-5867","-10867","-11739","-13259","-5779","-10961","-12942","-12411","-18666","-13815","-9134","-10599","-11358","-6029","-8741","-9023","-12479","-8254","-9210","-13946","-6069","-11069","-11941","-13461","-5981","-11163","-13144","-12613","-18868","-14017","-9336","-10801","-11560","-5470","-8182","-8464","-11920","-7695","-8651","-13387","-5510","-10510","-11382","-12902","-5422","-10604","-12585","-12054","-18309","-13458","-8777","-10242","-11001","-5798","-8510","-8792","-12248","-8023","-8979","-13715","-5838","-10838","-11710","-13230","-5750","-10932","-12913","-12382","-18637","-13786","-9105","-10570","-11329","-5746","-8458","-8740","-12196","-7971","-8927","-13663","-5786","-10786","-11658","-13178","-5698","-10880","-12861","-12330","-18585","-13734","-9053","-10518","-11277","-6603","-9315","-9597","-13053","-8828","-9784","-14520","-6643","-11643","-12515","-14035","-6555","-11737","-13718","-13187","-19442","-14591","-9910","-11375","-12134","-6223","-8935","-9217","-12673","-8448","-9404","-14140","-6263","-11263","-12135","-13655","-6175","-11357","-13338","-12807","-19062","-14211","-9530","-10995","-11754","-5356","-8068","-8350","-11806","-7581","-8537","-13273","-5396","-10396","-11268","-12788","-5308","-10490","-12471","-11940","-18195","-13344","-8663","-10128","-10887","-6425","-9137","-9419","-12875","-8650","-9606","-14342","-6465","-11465","-12337","-13857","-6377","-11559","-13540","-13009","-19264","-14413","-9732","-11197","-11956","-5768","-8480","-8762","-12218","-7993","-8949","-13685","-5808","-10808","-11680","-13200","-5720","-10902","-12883","-12352","-18607","-13756","-9075","-10540","-11299","-6690","-9402","-9684","-13140","-8915","-9871","-14607","-6730","-11730","-12602","-14122","-6642","-11824","-13805","-13274","-19529","-14678","-9997","-11462","-12221","-5633","-8345","-8627","-12083","-7858","-8814","-13550","-5673","-10673","-11545","-13065","-5585","-10767","-12748","-12217","-18472","-13621","-8940","-10405","-11164","-5650","-8362","-8644","-12100","-7875","-8831","-13567","-5690","-10690","-11562","-13082","-5602","-10784","-12765","-12234","-18489","-13638","-8957","-10422","-11181","-6061","-8773","-9055","-12511","-8286","-9242","-13978","-6101","-11101","-11973","-13493","-6013","-11195","-13176","-12645","-18900","-14049","-9368","-10833","-11592","-5594","-8306","-8588","-12044","-7819","-8775","-13511","-5634","-10634","-11506","-13026","-5546","-10728","-12709","-12178","-18433","-13582","-8901","-10366","-11125","-6166","-8878","-9160","-12616","-8391","-9347","-14083","-6206","-11206","-12078","-13598","-6118","-11300","-13281","-12750","-19005","-14154","-9473","-10938","-11697","-5831","-8543","-8825","-12281","-8056","-9012","-13748","-5871","-10871","-11743","-13263","-5783","-10965","-12946","-12415","-18670","-13819","-9138","-10603","-11362","-5607","-8319","-8601","-12057","-7832","-8788","-13524","-5647","-10647","-11519","-13039","-5559","-10741","-12722","-12191","-18446","-13595","-8914","-10379","-11138"])
  var to_list = ee.List(["Barren to Barren","Barren to Cultivated crops","Barren to Deciduous forest","Barren to Developed, high intensity","Barren to Developed, low intensity","Barren to Developed, medium intensity","Barren to Developed, open space","Barren to Dwarf scrub","Barren to Emerging herbacious wetlands","Barren to Evergreen forest","Barren to Grass/herb","Barren to Lichens","Barren to Mixed forest","Barren to Moss","Barren to Open water","Barren to Pasture/hay","Barren to Perennial ice/snow","Barren to Sedge","Barren to Shrub/scrub","Barren to Woody wetlands","Cultivated crops to Barren","Cultivated crops to Cultivated crops","Cultivated crops to Deciduous forest","Cultivated crops to Developed, high intensity","Cultivated crops to Developed, low intensity","Cultivated crops to Developed, medium intensity","Cultivated crops to Developed, open space","Cultivated crops to Dwarf scrub","Cultivated crops to Emerging herbacious wetlands","Cultivated crops to Evergreen forest","Cultivated crops to Grass/herb","Cultivated crops to Lichens","Cultivated crops to Mixed forest","Cultivated crops to Moss","Cultivated crops to Open water","Cultivated crops to Pasture/hay","Cultivated crops to Perennial ice/snow","Cultivated crops to Sedge","Cultivated crops to Shrub/scrub","Cultivated crops to Woody wetlands","Deciduous forest to Barren","Deciduous forest to Cultivated crops","Deciduous forest to Deciduous forest","Deciduous forest to Developed, high intensity","Deciduous forest to Developed, low intensity","Deciduous forest to Developed, medium intensity","Deciduous forest to Developed, open space","Deciduous forest to Dwarf scrub","Deciduous forest to Emerging herbacious wetlands","Deciduous forest to Evergreen forest","Deciduous forest to Grass/herb","Deciduous forest to Lichens","Deciduous forest to Mixed forest","Deciduous forest to Moss","Deciduous forest to Open water","Deciduous forest to Pasture/hay","Deciduous forest to Perennial ice/snow","Deciduous forest to Sedge","Deciduous forest to Shrub/scrub","Deciduous forest to Woody wetlands","Developed, high intensity to Barren","Developed, high intensity to Cultivated crops","Developed, high intensity to Deciduous forest","Developed, high intensity to Developed, high intensity","Developed, high intensity to Developed, low intensity","Developed, high intensity to Developed, medium intensity","Developed, high intensity to Developed, open space","Developed, high intensity to Dwarf scrub","Developed, high intensity to Emerging herbacious wetlands","Developed, high intensity to Evergreen forest","Developed, high intensity to Grass/herb","Developed, high intensity to Lichens","Developed, high intensity to Mixed forest","Developed, high intensity to Moss","Developed, high intensity to Open water","Developed, high intensity to Pasture/hay","Developed, high intensity to Perennial ice/snow","Developed, high intensity to Sedge","Developed, high intensity to Shrub/scrub","Developed, high intensity to Woody wetlands","Developed, low intensity to Barren","Developed, low intensity to Cultivated crops","Developed, low intensity to Deciduous forest","Developed, low intensity to Developed, high intensity","Developed, low intensity to Developed, low intensity","Developed, low intensity to Developed, medium intensity","Developed, low intensity to Developed, open space","Developed, low intensity to Dwarf scrub","Developed, low intensity to Emerging herbacious wetlands","Developed, low intensity to Evergreen forest","Developed, low intensity to Grass/herb","Developed, low intensity to Lichens","Developed, low intensity to Mixed forest","Developed, low intensity to Moss","Developed, low intensity to Open water","Developed, low intensity to Pasture/hay","Developed, low intensity to Perennial ice/snow","Developed, low intensity to Sedge","Developed, low intensity to Shrub/scrub","Developed, low intensity to Woody wetlands","Developed, medium intensity to Barren","Developed, medium intensity to Cultivated crops","Developed, medium intensity to Deciduous forest","Developed, medium intensity to Developed, high intensity","Developed, medium intensity to Developed, low intensity","Developed, medium intensity to Developed, medium intensity","Developed, medium intensity to Developed, open space","Developed, medium intensity to Dwarf scrub","Developed, medium intensity to Emerging herbacious wetlands","Developed, medium intensity to Evergreen forest","Developed, medium intensity to Grass/herb","Developed, medium intensity to Lichens","Developed, medium intensity to Mixed forest","Developed, medium intensity to Moss","Developed, medium intensity to Open water","Developed, medium intensity to Pasture/hay","Developed, medium intensity to Perennial ice/snow","Developed, medium intensity to Sedge","Developed, medium intensity to Shrub/scrub","Developed, medium intensity to Woody wetlands","Developed, open space to Barren","Developed, open space to Cultivated crops","Developed, open space to Deciduous forest","Developed, open space to Developed, high intensity","Developed, open space to Developed, low intensity","Developed, open space to Developed, medium intensity","Developed, open space to Developed, open space","Developed, open space to Dwarf scrub","Developed, open space to Emerging herbacious wetlands","Developed, open space to Evergreen forest","Developed, open space to Grass/herb","Developed, open space to Lichens","Developed, open space to Mixed forest","Developed, open space to Moss","Developed, open space to Open water","Developed, open space to Pasture/hay","Developed, open space to Perennial ice/snow","Developed, open space to Sedge","Developed, open space to Shrub/scrub","Developed, open space to Woody wetlands","Dwarf scrub to Barren","Dwarf scrub to Cultivated crops","Dwarf scrub to Deciduous forest","Dwarf scrub to Developed, high intensity","Dwarf scrub to Developed, low intensity","Dwarf scrub to Developed, medium intensity","Dwarf scrub to Developed, open space","Dwarf scrub to Dwarf scrub","Dwarf scrub to Emerging herbacious wetlands","Dwarf scrub to Evergreen forest","Dwarf scrub to Grass/herb","Dwarf scrub to Lichens","Dwarf scrub to Mixed forest","Dwarf scrub to Moss","Dwarf scrub to Open water","Dwarf scrub to Pasture/hay","Dwarf scrub to Perennial ice/snow","Dwarf scrub to Sedge","Dwarf scrub to Shrub/scrub","Dwarf scrub to Woody wetlands","Emerging herbacious wetlands to Barren","Emerging herbacious wetlands to Cultivated crops","Emerging herbacious wetlands to Deciduous forest","Emerging herbacious wetlands to Developed, high intensity","Emerging herbacious wetlands to Developed, low intensity","Emerging herbacious wetlands to Developed, medium intensity","Emerging herbacious wetlands to Developed, open space","Emerging herbacious wetlands to Dwarf scrub","Emerging herbacious wetlands to Emerging herbacious wetlands","Emerging herbacious wetlands to Evergreen forest","Emerging herbacious wetlands to Grass/herb","Emerging herbacious wetlands to Lichens","Emerging herbacious wetlands to Mixed forest","Emerging herbacious wetlands to Moss","Emerging herbacious wetlands to Open water","Emerging herbacious wetlands to Pasture/hay","Emerging herbacious wetlands to Perennial ice/snow","Emerging herbacious wetlands to Sedge","Emerging herbacious wetlands to Shrub/scrub","Emerging herbacious wetlands to Woody wetlands","Evergreen forest to Barren","Evergreen forest to Cultivated crops","Evergreen forest to Deciduous forest","Evergreen forest to Developed, high intensity","Evergreen forest to Developed, low intensity","Evergreen forest to Developed, medium intensity","Evergreen forest to Developed, open space","Evergreen forest to Dwarf scrub","Evergreen forest to Emerging herbacious wetlands","Evergreen forest to Evergreen forest","Evergreen forest to Grass/herb","Evergreen forest to Lichens","Evergreen forest to Mixed forest","Evergreen forest to Moss","Evergreen forest to Open water","Evergreen forest to Pasture/hay","Evergreen forest to Perennial ice/snow","Evergreen forest to Sedge","Evergreen forest to Shrub/scrub","Evergreen forest to Woody wetlands","Grass/herb to Barren","Grass/herb to Cultivated crops","Grass/herb to Deciduous forest","Grass/herb to Developed, high intensity","Grass/herb to Developed, low intensity","Grass/herb to Developed, medium intensity","Grass/herb to Developed, open space","Grass/herb to Dwarf scrub","Grass/herb to Emerging herbacious wetlands","Grass/herb to Evergreen forest","Grass/herb to Grass/herb","Grass/herb to Lichens","Grass/herb to Mixed forest","Grass/herb to Moss","Grass/herb to Open water","Grass/herb to Pasture/hay","Grass/herb to Perennial ice/snow","Grass/herb to Sedge","Grass/herb to Shrub/scrub","Grass/herb to Woody wetlands","Lichens to Barren","Lichens to Cultivated crops","Lichens to Deciduous forest","Lichens to Developed, high intensity","Lichens to Developed, low intensity","Lichens to Developed, medium intensity","Lichens to Developed, open space","Lichens to Dwarf scrub","Lichens to Emerging herbacious wetlands","Lichens to Evergreen forest","Lichens to Grass/herb","Lichens to Lichens","Lichens to Mixed forest","Lichens to Moss","Lichens to Open water","Lichens to Pasture/hay","Lichens to Perennial ice/snow","Lichens to Sedge","Lichens to Shrub/scrub","Lichens to Woody wetlands","Mixed forest to Barren","Mixed forest to Cultivated crops","Mixed forest to Deciduous forest","Mixed forest to Developed, high intensity","Mixed forest to Developed, low intensity","Mixed forest to Developed, medium intensity","Mixed forest to Developed, open space","Mixed forest to Dwarf scrub","Mixed forest to Emerging herbacious wetlands","Mixed forest to Evergreen forest","Mixed forest to Grass/herb","Mixed forest to Lichens","Mixed forest to Mixed forest","Mixed forest to Moss","Mixed forest to Open water","Mixed forest to Pasture/hay","Mixed forest to Perennial ice/snow","Mixed forest to Sedge","Mixed forest to Shrub/scrub","Mixed forest to Woody wetlands","Moss to Barren","Moss to Cultivated crops","Moss to Deciduous forest","Moss to Developed, high intensity","Moss to Developed, low intensity","Moss to Developed, medium intensity","Moss to Developed, open space","Moss to Dwarf scrub","Moss to Emerging herbacious wetlands","Moss to Evergreen forest","Moss to Grass/herb","Moss to Lichens","Moss to Mixed forest","Moss to Moss","Moss to Open water","Moss to Pasture/hay","Moss to Perennial ice/snow","Moss to Sedge","Moss to Shrub/scrub","Moss to Woody wetlands","Open water to Barren","Open water to Cultivated crops","Open water to Deciduous forest","Open water to Developed, high intensity","Open water to Developed, low intensity","Open water to Developed, medium intensity","Open water to Developed, open space","Open water to Dwarf scrub","Open water to Emerging herbacious wetlands","Open water to Evergreen forest","Open water to Grass/herb","Open water to Lichens","Open water to Mixed forest","Open water to Moss","Open water to Open water","Open water to Pasture/hay","Open water to Perennial ice/snow","Open water to Sedge","Open water to Shrub/scrub","Open water to Woody wetlands","Pasture/hay to Barren","Pasture/hay to Cultivated crops","Pasture/hay to Deciduous forest","Pasture/hay to Developed, high intensity","Pasture/hay to Developed, low intensity","Pasture/hay to Developed, medium intensity","Pasture/hay to Developed, open space","Pasture/hay to Dwarf scrub","Pasture/hay to Emerging herbacious wetlands","Pasture/hay to Evergreen forest","Pasture/hay to Grass/herb","Pasture/hay to Lichens","Pasture/hay to Mixed forest","Pasture/hay to Moss","Pasture/hay to Open water","Pasture/hay to Pasture/hay","Pasture/hay to Perennial ice/snow","Pasture/hay to Sedge","Pasture/hay to Shrub/scrub","Pasture/hay to Woody wetlands","Perennial ice/snow to Barren","Perennial ice/snow to Cultivated crops","Perennial ice/snow to Deciduous forest","Perennial ice/snow to Developed, high intensity","Perennial ice/snow to Developed, low intensity","Perennial ice/snow to Developed, medium intensity","Perennial ice/snow to Developed, open space","Perennial ice/snow to Dwarf scrub","Perennial ice/snow to Emerging herbacious wetlands","Perennial ice/snow to Evergreen forest","Perennial ice/snow to Grass/herb","Perennial ice/snow to Lichens","Perennial ice/snow to Mixed forest","Perennial ice/snow to Moss","Perennial ice/snow to Open water","Perennial ice/snow to Pasture/hay","Perennial ice/snow to Perennial ice/snow","Perennial ice/snow to Sedge","Perennial ice/snow to Shrub/scrub","Perennial ice/snow to Woody wetlands","Sedge to Barren","Sedge to Cultivated crops","Sedge to Deciduous forest","Sedge to Developed, high intensity","Sedge to Developed, low intensity","Sedge to Developed, medium intensity","Sedge to Developed, open space","Sedge to Dwarf scrub","Sedge to Emerging herbacious wetlands","Sedge to Evergreen forest","Sedge to Grass/herb","Sedge to Lichens","Sedge to Mixed forest","Sedge to Moss","Sedge to Open water","Sedge to Pasture/hay","Sedge to Perennial ice/snow","Sedge to Sedge","Sedge to Shrub/scrub","Sedge to Woody wetlands","Shrub/scrub to Barren","Shrub/scrub to Cultivated crops","Shrub/scrub to Deciduous forest","Shrub/scrub to Developed, high intensity","Shrub/scrub to Developed, low intensity","Shrub/scrub to Developed, medium intensity","Shrub/scrub to Developed, open space","Shrub/scrub to Dwarf scrub","Shrub/scrub to Emerging herbacious wetlands","Shrub/scrub to Evergreen forest","Shrub/scrub to Grass/herb","Shrub/scrub to Lichens","Shrub/scrub to Mixed forest","Shrub/scrub to Moss","Shrub/scrub to Open water","Shrub/scrub to Pasture/hay","Shrub/scrub to Perennial ice/snow","Shrub/scrub to Sedge","Shrub/scrub to Shrub/scrub","Shrub/scrub to Woody wetlands","Woody wetlands to Barren","Woody wetlands to Cultivated crops","Woody wetlands to Deciduous forest","Woody wetlands to Developed, high intensity","Woody wetlands to Developed, low intensity","Woody wetlands to Developed, medium intensity","Woody wetlands to Developed, open space","Woody wetlands to Dwarf scrub","Woody wetlands to Emerging herbacious wetlands","Woody wetlands to Evergreen forest","Woody wetlands to Grass/herb","Woody wetlands to Lichens","Woody wetlands to Mixed forest","Woody wetlands to Moss","Woody wetlands to Open water","Woody wetlands to Pasture/hay","Woody wetlands to Perennial ice/snow","Woody wetlands to Sedge","Woody wetlands to Shrub/scrub","Woody wetlands to Woody wetlands"])
  var to = keys_list.map(function(x){
    var id = from_list.indexOf(x)
    var new_to = to_list.get(id);
    return new_to;
  });
  // Create a dictionary of class names and area values, just in case
  var class_area_dict = ee.Dictionary.fromLists(keys_list,vals_list)
  var class_area_dict_names = class_area_dict.rename(keys_list,to);
  // Create output feature collection
  var output_fc = ee.FeatureCollection(leng.map(function(x){
    var dict = {class_name: to.get(x), class_area: class_areas_results.get(x), tree_cover_loss_area: tcl_results.get(x), tree_cover_gain_area: tc_gain_results.get(x), 
    avg_tree_area: avg_tree_area_results.get(x), tcd_00: tcd_00_results.get(x), tcd_10: tcd_10_results.get(x)};
    var feature = ee.Feature(null, dict);
    return feature;
  }));
  // Set download URL for feature collection and output to the panel
  // Set download URL for feature collection and output to the panel
  var download = ui.Label('4. Download').setUrl(output_fc.getDownloadURL({
    format: 'CSV', filename: 'changeAreas', 
    selectors: ee.FeatureCollection(output_fc).first().propertyNames().getInfo()
  }));
  // Make it match the other instructions
  download.style().set({fontSize: '20px', fontWeight: 'bold'})
  panel.add(download)
  print(output_fc)
  var areaChart =
      ui.Chart.feature.byFeature(output_fc,'class_name','class_area');
  areaChart.setChartType('ColumnChart');
  areaChart.setOptions({
    title: 'Area of Change Classes',
    hAxis: {
      title: 'Change Class'
    },
    vAxis: {
      title: 'Area (hectares)',
      scaleType: 'log'
    },
    pointSize: 4
  });
  panel.add(areaChart)
  return output_fc;
}