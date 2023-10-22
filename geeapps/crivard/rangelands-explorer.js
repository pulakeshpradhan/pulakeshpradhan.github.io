/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var srtm = ee.Image("USGS/SRTMGL1_003"),
    bgr = ee.FeatureCollection("users/crivard/BGR_pasturebounds_NAD83_UTM13N_191016_JC"),
    green = ee.FeatureCollection("users/crivard/GreenRanch_ByParcel_190807"),
    ort = ee.FeatureCollection("users/crivard/ORT_byparcel_190807"),
    matp = ee.FeatureCollection("users/crivard/matador_pastures2015");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Define global variables
var thisLayer;
var loc;
var char;
var dat;
var df;
var count = 0;
var slayers = [];
var sdata = [];
var funcs = require('users/crivard/rangelands:Funcs');
print("defined global variables");
//Palettes for vp
var palettes = require("users/gena/packages:palettes");
var rainbow = palettes.kovesi.rainbow_bgyr_35_85_c73[7];
var yellgr = palettes.colorbrewer.YlGn[9];
var grred = ['1621A2', 'white', 'cyan', 'green', 'yellow', 'orange', 'red']
var grbrn = ['FFFFFF','CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
'66A000', '529400', '3E8601', '207401', '056201', '004C00']
var gr = ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800']
var rygcb = ['red', 'yellow', 'green', 'cyan', 'blue']
//Location Boundaries
var mont_bds = ee.FeatureCollection('TIGER/2018/States')
.filter(ee.Filter.eq('NAME','Montana'));
var locs = {
  "All Montana":[-109.844, 46.863,7,mont_bds],
  "Bear Gulch":[-104.8482,47.1850,12.5,bgr],
  "Green":[-111.4046,45.586, 11, green],
  "Matador Pastures": [-108.27,47.8933,11,matp],
  "ORT": [-109.37169,48.527,13.8,ort]
};
print("saved location bounds");
//Gets appropriate functions
var reqFunc = function(dat){
  var df;
  if(dat == "nass"){df = require('users/crivard/rangelands:nass-Data');}
  if(dat =="srtm"){df = require('users/crivard/rangelands:srtm-Data');}
  if(dat == "naip"){df = require('users/crivard/rangelands:naip-Data');}
  if(dat == "modis"){df = require('users/crivard/rangelands:mod-Data');}
  if(dat == "daymet"){df = require('users/crivard/rangelands:daymet-Data');}
  if(dat == "landsat"){df = require('users/crivard/rangelands:landsat-Data');}
  if(dat == "uIdaho"){df = require('users/crivard/rangelands:uIdaho-Data');}
  print("got appropriate functions from " + dat);
  return(df);
};
print(typeof reqFunc);
//Dataset Info
var data = {
  nass: {
    "cropland": {band: "cropland", vp: {}}, 
    "cultivated": {band: "cultivated",vp:{}}
    },
  srtm: {
    "elevation": {band: "elevation", vp: "get", scale:30},
    "slope": {band: "slope", vp : "get", scale:30},
    "twi": {band: "twi", vp: "get", scale:30}
    },
  naip: {
    "true color": {band:"true color", vp:{min: 0.0, max: 255.0}}
    },
  modis: {
    "GPP": {band: "Gpp", vp:"get", scale:500, palette: yellgr},
    "Modis NDVI": {band: "NDVI",vp:"get", scale:250, palette: grbrn},
    "Modis Treecover": {band:"Percent_Tree_Cover", vp:"get",scale:250,palette:gr}
  },
  daymet:{
    "max temp": {band: "tmax", vp:"get", scale:1000, palette: grred},
    "min temp": {band: "tmin", vp:"get", scale:1000, palette: grred},
    "shortwave radiation": {band:"srad" , vp:"get", scale:1000, palette: grred},
    "vapor pressure": {band: "vp", vp:"get", scale:1000, palette: grred},
    "day length": {band: "dayl", vp:"get", scale:1000, palette: grred}
  },
  landsat:{
    "Landsat NDVI": {band:"NDVI", vp:"get", scale:30, palette:grbrn},
    "Landsat Treecover": {band:"tree_canopy_cover", vp:"get", scale:30, palette:gr}
  },
  uIdaho:{
    "Drought Severity":{band:"pdsi", vp:"get", scale:4.5, palette:rygcb}
  }
};
print("created 'data'");
//Gets visual parameters
var getVisPar = function(geom){
  print("getting visual parameters...");
  var vp= {};
  var maxd = thisLayer.reduceRegion({
    reducer: "max",
    geometry: geom,
    bestEffort: true,
    scale: data[dat][char]["scale"]
  });
  var mind = thisLayer.reduceRegion({
    reducer: "min",
    geometry: geom,
    bestEffort: true,
    scale: data[dat][char]["scale"]
  });
  var max = maxd.get(data[dat][char]["band"]);
  var min = mind.get(data[dat][char]["band"]);
  var palt = rainbow;
  var keys = Object.keys(data[dat][char])
  if(keys.indexOf("palette") != -1){
      print("custom palette");
      palt = data[dat][char]["palette"];
      print(palt);
  }
  vp = {min:min.getInfo(),max:max.getInfo(),palette:palt};
  print("got visual parameters...");
  return(vp);
};
print(typeof getVisPar);
//Display Map function
var displayMap = function(type){
  //get user selections
  loc = loc_select.getValue();
  dat = dat_select.getValue();
  char = char_select.getValue();
  df = reqFunc(dat);
  var visPar = {};
  if(count===0){map.clear();}
  print("slayers",slayers)
  if(slayers.indexOf(char) >= 0){funcs.removeLayer(char,map);}
  //get thisLayer
  print("get this Layer");
  thisLayer = df.getLayer(locs[loc][3], data[dat][char]["band"]);
  print("thisLayer", thisLayer);
  visPar = data[dat][char]["vp"];
  if(visPar == "get"){
    visPar = getVisPar(locs[loc][3]);
  }
  map.addLayer(thisLayer,visPar, char);
  if(slayers.indexOf(char)<0){slayers.push(char);}
  sdata.push(dat);
  var bdName = loc + " shp";
  funcs.removeLayer(bdName,map);
  map.addLayer(locs[loc][3], {}, bdName, true, 0.5);
  map.centerObject(locs[loc][3], locs[loc][2]);
  //Add hillshade (back)
  funcs.removeLayer("hillshade",map);
  map.addLayer(hillshade, {},"hillshade",true, 0.25);
  //Adjusting map interaction
  map.onChangeZoom(zoomMap);
  if(count===0){
    inspector.style().set('position', 'bottom-left');
    map.add(inspector);
    map.onClick(inspect);
    map.style().set('cursor', 'crosshair');
  }
  count = count + 1;
};
//Display Map function
var zoomMap = function(type){
  var funcs = require('users/crivard/rangelands:Funcs');
  //if(count===0){map.clear();}else{funcs.removeLayer("hillshade",map);}
  if (slayers.indexOf(char) >= 0){funcs.removeLayer(char,map);}
  var scale = map.getScale();
  var bounds = map.getBounds();
  var w = bounds[0], e = bounds [2];
  var n = bounds[1], s = bounds [3];
  var geometry = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]],
  ]);
  //get new visual parameters
  var visPar = getVisPar(geometry);
  visPar = data[dat][char]["vp"];
  if(visPar == "get"){
    visPar = getVisPar(geometry);
  }
  map.addLayer(thisLayer,visPar, char);
  if(slayers.indexOf(char) <0){slayers.push(char);}
  var bdName = loc + " shp";
  funcs.removeLayer(bdName,map);
  map.addLayer(locs[loc][3], {}, bdName, true, 0.5);
  //Add hillshade (back)
  funcs.removeLayer("hillshade",map);
  map.addLayer(hillshade, {},"hillshade",true, 0.25);
};
/// User Interface
//Set-up Montana Basemap
ui.root.clear();
var map = ui.Map();
ui.root.add(map);
map.addLayer(locs["All Montana"][3],{},"Montana",true,0.25);
map.centerObject(locs["All Montana"][3],locs["All Montana"][2]);
var hillshade = ee.Terrain.hillshade(srtm);
map.addLayer(hillshade, {}, "hillshade", true, 0.25);
//Initializing control panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px'}
});
//Select Location Tab
var loc_select = ui.Select({items: Object.keys(locs)});
loc_select.setPlaceholder('Choose Location...');
panel.add(loc_select);
//Select Characteristics Tab
var char_select = ui.Select();
//Select Data Tab
var dat_select = ui.Select({items: Object.keys(data)});
dat_select.onChange(function(keyd){
  //Activates Characteristics Tab
  char_select = ui.Select({items:Object.keys(data[keyd])});
  char_select.setPlaceholder('Choose Property...');
  panel.widgets().set(2,char_select);
  //Activates Generate Map button
  char_select.onChange(function(){if(count===0){panel.add(go)}});
});
dat_select.setPlaceholder('Choose Dataset...');
panel.add(dat_select);
//Click to Generate Map
var go = ui.Button({label: 'Generate Map'});
go.onClick(displayMap);
//Setting up Control Panel
ui.root.add(panel);
//-----Inspector Tool----//
//from Lauren's example
var label = new ui.Label('Click for Info');
var inspector = new ui.Panel([label]);
inspector.setLayout(ui.Panel.Layout.flow('vertical'));
function inspect(coords){
  inspector.clear();
  inspector.add(ui.Label('Loading...',{color:'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(point);
  inspector.clear();
  for(var l=0; l<slayers.length;l++){
    var rowPanel = new ui.Panel();
    rowPanel.setLayout(ui.Panel.Layout.flow('horizontal'));
    print("in for loop");
    var eachLayer = funcs.returnLayer(slayers[l],map)
    var sc = data[sdata[l]][slayers[l]]["scale"];
    print("sc",sc);
    print("eachLayer ",eachLayer);
    print("thisLayer ",thisLayer);
    var eachLayerImg = eachLayer.getEeObject();
    var info = eachLayerImg.sampleRegions({
      collection:point, 
      properties:[], 
      scale: sc
    }).first().get(data[sdata[l]][slayers[l]]["band"]);
    info = info.getInfo();
    if(info % 1 !== 0){info = info.toFixed(4);}
    //Associates numeric value with crop name
    if(slayers[l] == "cropland"){info = df.findCropName(info);}
    var titleLabel = new ui.Label({
      value: slayers[l],
      style: {fontWeight: 'bold',}
    });
    rowPanel.add(titleLabel);
    var valueLabel = new ui.Label(info);
    rowPanel.add(valueLabel);
    inspector.add(rowPanel);
  }
}