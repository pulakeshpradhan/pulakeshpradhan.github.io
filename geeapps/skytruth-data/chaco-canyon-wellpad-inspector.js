var chaco = ee.FeatureCollection("users/skytruth-data/chaco_EEApp"),    
    nmWells = ee.FeatureCollection("users/MatthewSkyTruth/NM_WellpadData"),
    skytruthLogo = ee.Image("users/skytruth-data/skytruth_logo_instagram_modified"),
    landClasses = ee.FeatureCollection("users/skytruth-data/NM_Surface_Ownership_2019");
// Remove the default Google map, make a custom instance of a Google Map.
ui.root.clear();
var map = ui.Map();
ui.root.add(map);
var app = {};
map.setOptions({'mapTypeId':'Terrain'})
var ownColors = {
  'I': '#ccb2d1',
  'BLM': '#606060',
  'S': '#6a7bcc',
  'NPS': '#c36575',
  'P': '#becf50',
  'FS': '#086313'
};
var i = landClasses.filter(ee.Filter.eq('own','I'));
var blm = landClasses.filter(ee.Filter.eq('own','BLM'));
var s = landClasses.filter(ee.Filter.eq('own','S'));
var nps = landClasses.filter(ee.Filter.eq('own','NPS'));
var p = landClasses.filter(ee.Filter.eq('own','P'));
var fs = landClasses.filter(ee.Filter.eq('own','FS'));
var filts = ee.Filter.or(ee.Filter.eq('own','I'),
                         ee.Filter.eq('own','BLM'),
                         ee.Filter.eq('own','S'),
                         ee.Filter.eq('own','NPS'),
                         ee.Filter.eq('own','P'),
                         ee.Filter.eq('own','FS'));
landClasses = landClasses.filter(filts);
// Reduce ownership to a list.
var ownList = landClasses.reduceColumns(ee.Reducer.toList(),['own']);
// Draw out only one instance of all owner names.
ownList = ee.List(ownList.get('list')).distinct();
// For use in the identifying panel on the left of the screen.
var fullNameList = ownList.replace('I','Indigenous')
                .replace('BLM','Bureau of Land Management')
                .replace('S','State')
                .replace('NPS','National Park Service')
// Pass to dictionary to be drawn from the ownership evaluation below.
var ownDict = ee.Dictionary.fromLists(ownList,fullNameList);
map.addLayer(i,{'color':ownColors['I']},'Indigenous',true,0.7);
map.addLayer(blm,{'color':ownColors['BLM']},'BLM',true,0.7);
map.addLayer(s,{'color':ownColors['S']},'State',true,0.7);
map.addLayer(nps,{'color':ownColors['NPS']},'NPS',true,0.7);
map.addLayer(p,{'color':ownColors['P']},'Private',true,0.7);
map.addLayer(fs,{'color':ownColors['FS']},'Forest Service',true,0.7);
//white color variable  
var w = 'ffffff';
var mapBounds =  ee.Geometry.Polygon(
        [[[-108.57867582560743, 36.39168479106102],
          [-108.57867582560743, 35.663121890158756],
          [-107.32623441935743, 35.663121890158756],
          [-107.32623441935743, 36.39168479106102]]], null, false);
//Function for keeping map area fixed to center point
map.onChangeBounds(function(){
  var check = map.getZoom();
  if(check < 9){
    map.centerObject(chaco.geometry().centroid(), 10);
  }
  else{}
});
// Draw Chaco Outline, add to map.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: chaco,
  color: 1,
  width: 2
});
map.addLayer(outline, {palette: '000000'}, 'edges');
map.addLayer(nmWells, {color: 'brown'},'wells');
map.addLayer(chaco,{},'',false);
// Sets the center of the map, hides drawing tools and fullscreen control.
map.setCenter(-107.9596, 36.0536,10.25);
map.setControlVisibility({layerList:false, drawingToolsControl:false, fullscreenControl:false});
//Welcome Panel variable for thumbnail
var logoWelcome = ui.Thumbnail(
  {image:skytruthLogo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'90px',height:'90px',margin:'0px 0px 0px 190px'}
  });
//Creates the style parameters for all elements of the welcome panel  
var welcomeParams = {backgroundColor:'#061732',stretch:'horizontal',color:w, fontSize:'14px',fontWeight:'bold'};  
//Creates the welcome panel and necessary variables
var putOn = ui.Button({label:'Add Welcome Panel',onClick:expand,
            style:{fontSize:'8px',width:'180px',padding:'18px 0px 0px 18px',stretch:'both',
                  whiteSpace:'pre',textAlign:'center',position:'top-center',backgroundColor:'#061732'}}); 
var welcome = ui.Panel({style:{width:'500px',position:'top-center',textAlign:'center',backgroundColor:'#061732',border:'2px solid black'}});
var title = ui.Label('Welcome to SkyTruth\'s Chaco Culture National Historical Park Well Inspector App',welcomeParams);
var instruct = ui.Label('To use the inspector you may zoom and pan around the map and click on a well for more information.',welcomeParams);
var note = ui.Label('If there are several points in an area it may be best to zoom in to ensure precise readings. The inspector may take a few seconds to update its information.',welcomeParams);
var removeWelcome = ui.Button('Remove these instructions',minimize,false,{backgroundColor:'#061732',margin:'10px 0px 0px 160px',width:'150px'});
//Adds the welcome panel and its components to the map
map.add(welcome);
welcome.add(logoWelcome);
welcome.add(title);
welcome.add(instruct);
welcome.add(note);
welcome.add(removeWelcome);
//functions for minimizing and expanding welcome panel with button click
function minimize(){
  map.remove(welcome);
  app.content1.panel.add(putOn);
}
function expand(){
  map.add(welcome);
  app.content1.panel.remove(putOn);
}
var buff;
var len;
var first;
var nameText;
var idText;
var longText;
var latText;
var countyText;
var statusText;
var ownText;
//Contains the labels for all well properties on inspector
var wellName = ui.Label('Well Name: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var wellLong = ui.Label('Longitude: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var wellLat = ui.Label('Latitude: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var id = ui.Label('Well ID: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var wellCounty = ui.Label('County: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var wellStatus = ui.Label('Status of Well: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
var ownership = ui.Label('Land ownership: ',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'13px'});
//Contains all the placeholder textboxes for inspector
var nameBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var longBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var latBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var countyBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var idBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var statusBox = ui.Textbox({placeholder:'No well here...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
var ownBox = ui.Textbox({placeholder:'Nothing selected...',style:{backgroundColor:'#061732',textAlign:'center',width:'200px',border:'2px solid black'}});
map.onClick(function(coords){
  var pt = ee.Geometry.Point(coords.lon,coords.lat);
  buff = pt.buffer(150);
  if(pt.intersects(landClasses)){
    ownText = ee.String(landClasses.filterBounds(pt).first().get('own'));
    ownText = ownDict.get(ownText);
    ownText.evaluate(function(val){
      ownBox.setValue(val);
    });
  }
  // If statement to set values of well Inspector textboxes.
  if(buff.intersects(nmWells)){
    first = ee.Feature(nmWells.filterBounds(buff).first());
    nameText = first.get('name');
    longText = first.get('longitude');
    latText = first.get('latitude');
    idText = first.get('id');
    countyText = first.get('county');
    statusText = first.get('status');
    nameText.evaluate(function(val){
      nameBox.setValue(val)});
    longText.evaluate(function(val){
      longBox.setValue(val)});
    latText.evaluate(function(val){
      latBox.setValue(val)});
    countyText.evaluate(function(val){
      countyBox.setValue(val)});
    idText.evaluate(function(val){
      idBox.setValue(val)});
    statusText.evaluate(function(val){
      statusBox.setValue(val)});
    pt = ui.Map.Layer(pt, {color: 'yellow'});
    map.layers().set(8,pt);
  }
  else{}
});
//============//
// Adding a legend to the map.
var legend = ui.Panel({style:{width:'180px',position:'bottom-left',textAlign:'left',backgroundColor:'#061732',border:'2px solid black'}});
//functions for minimizing and expanding the legend
function minimizeLeg(){
  map.remove(legend);
  app.content1.panel.add(putOnLegend);
}
function expandLeg(){
  map.add(legend);
  app.content1.panel.remove(putOnLegend);
}
var removeLegend = ui.Button('x',minimizeLeg,false,{backgroundColor:'#061732'});
var putOnLegend = ui.Button({label:'Add Legend',onClick:expandLeg,
            style:{fontSize:'8px',width:'200px',padding:'20px 0px 0px 28px',stretch:'both',
                   whiteSpace:'pre',textAlign:'center',position:'top-center',backgroundColor:'#061732'}}); 
// Create legend title and a note for users
var legendTitle = ui.Label({
  value: 'Land Ownership',
  style: {backgroundColor:'#061732',stretch:'horizontal',color:w, fontSize:'14px',fontWeight:'bold',textAlign:'center'}
});
legend.add(removeLegend);
legend.add(legendTitle);
// Combine two lists into a dictionary to use for the function below.
var rowDict = {
  'I': '#ccb2d1',
  'B': '#606060',
  'S': '#6a7bcc',
  'N': '#c36575',
  'P': '#becf50',
  'F': '#086313'
};
// Creates a function that styles 1 row of the legend.
var makeRow = function(value,key) {
      //Creates the label for wellpad color
      var colorBoxOwn = ui.Label({
        style: {
          backgroundColor: value,
          padding: '8px',
          margin: '0px, 0px, 4px, 0px'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: key,
        style: {backgroundColor:'#061732',fontSize: '12px', fontWeight:'bold',stretch:'horizontal',color:w, 
                padding:'0px 0px 10px 10px', margin: '0px, 0px, 4px, 6px'}
      });
      // return the panel
      var teenyTiny= ui.Panel({
        widgets: [colorBoxOwn, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
        style:{backgroundColor:'#061732'}
      });
      return legend.add(teenyTiny);
};
// Map row function over dictionary defined on line 246.
makeRow(rowDict['I'],'Indigenous')
makeRow(rowDict['B'],'Bureau of Land Management')
makeRow(rowDict['S'],'State')
makeRow(rowDict['N'],'National Park Service')
makeRow(rowDict['P'],'Private')
makeRow(rowDict['F'],'Forest Service')
map.add(legend);
//============// 
//Main UI panel components
var logo = ui.Thumbnail(
  {image:skytruthLogo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'90px',height:'90px', margin:'0px 0px 10px 46px'}
  });
app.logoPanel = function(){
  app.logo = {panel:ui.Panel({
    widgets:[logo],
    style:{padding:'15px 0px 0px 23px',width:'240px',backgroundColor:'#061732'}
  })};};
var insp = ui.Panel({style:{width:'250px',textAlign:'center',backgroundColor:'#061732'}});
var title = ui.Label('Chaco Culture National Historical Park Well Inspector', {stretch:'horizontal',color:w,fontSize:'16px',textAlign:'center',backgroundColor:'#061732',fontWeight:'bold'});
var mapclick = ui.Label('Click a well on the map for more information.',{backgroundColor:'#061732',color:w,textAlign:'center',fontSize:'13px'});
var note = ui.Label('*Note: You may need to zoom in if there are several points in an area. Inspector data may require a few seconds to load.',{backgroundColor:'#061732',color:w, textAlign:'center',fontSize:'11px'});
app.panel = function(){
  app.content1 = {panel:ui.Panel({
    widgets:
    [
    title,
    insp,
    mapclick,
    note,
    wellName,
    nameBox,
    id,
    idBox,
    wellLong,
    longBox,
    wellLat,
    latBox,
    wellCounty,
    countyBox,
    wellStatus,
    statusBox,
    ownership,
    ownBox
    ],
    style:{width:'220px',backgroundColor:'#061732'}})}};
app.boot = function(){
  app.logoPanel();
  app.panel();
  var main = ui.Panel({
    widgets:[app.logo.panel,app.content1.panel],
    style:{width:'237px',backgroundColor:'#061732'}
  });
  ui.root.insert(0,main);
};
app.boot();