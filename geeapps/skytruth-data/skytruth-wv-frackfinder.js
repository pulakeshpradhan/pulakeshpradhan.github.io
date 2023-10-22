// Load in global layer assets.
var wv = ee.FeatureCollection("users/MatthewSkyTruth/WVOutline"),
    pads2018_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2018WellPads"),
    pads2016_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2016WellPads"),
    pads2014_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2014WellPads"),
    pads2011_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2011WellPads"),
    pads2009_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2009WellPads"),
    pads2007_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2007WellPads"),
    pads2018shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2018WellpadShapes"),
    pads2016shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2016WellpadShapes"),
    pads2014shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2014WellpadShapes"),
    pads2011shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2011WellpadShapes"),
    pads2009shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2009WellpadShapes"),
    pads2007shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2007WellpadShapes"),
    impoundments2018_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2018Impoundments"),
    impoundments2016_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2016Impoundments"),
    impoundments2014_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2014Impoundments"),
    impoundments2011_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2011Impoundments"),
    impoundments2009_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2009Impoundments"),
    impoundments2007_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2007Impoundments"),
    impoundments2018shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2018ImpoundmentShapes"),
    impoundments2016shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2016ImpoundmentShapes"),
    impoundments2014shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2014ImpoundmentShapes"),
    impoundments2011shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2011ImpoundmentShapes"),
    impoundments2009shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2009ImpoundmentShapes"),
    impoundments2007shapes_coll = ee.FeatureCollection("users/MatthewSkyTruth/FrackFinder/2007ImpoundmentShapes"),
    skytruthLogo = ee.Image("users/skytruth-data/skytruth_logo_instagram_modified");
// Remove the default Google map, make a custom instance of a Google Map.
ui.root.clear();
var map = ui.Map();
ui.root.add(map);
var app = {};
// Create an alternative black and white basemap.
var bAndW = [
  {
    stylers: [{gamma: 0.9},{saturation:-100}]
  }];
map.setOptions('ROADMAP',{'Black and White':bAndW});
// Color variables for wells.
var w = 'ffffff',
    b = '4fbeff',
    r = 'ff5757',
    g = '12a154',
    p = 'db80ff',
    o = 'eb8934',
    d = '0e37ed';
// Color variables for impoundments.
var z = '000000',
    y = '2e2e2e',
    x = '595959',
    v = '808080',
    u = '999999',
    t = 'b8b8b8';
// Draw WV Outline, add to map.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: wv,
  color: 1,
  width: 1
});
map.addLayer(outline, {palette: '000000'}, 'edges');
//Function for keeping map area fixed to center point
map.onChangeBounds(function(){
  var check = map.getZoom();
  if(check < 8){
    map.setCenter(-80.62, 38.80,7);
  }
  else{}
});
// Sets the center of the map, hides drawing tools and fullscreen control.
map.setCenter(-80.62, 38.80,7.5);
map.setControlVisibility({layerList:false, drawingToolsControl:false, fullscreenControl:false});
// Creates a welcome panel to inform the user about the app's capabilities.
var putOn = ui.Button({label:'Add Welcome Panel',onClick:expand,
            style:{fontSize:'8px',width:'200px',padding:'20px 0px 0px 28px',stretch:'both',
                   whiteSpace:'pre',textAlign:'center',position:'top-center',backgroundColor:'061732'}}); 
//Welcome Panel variable for thumbnail
var logoWelcome = ui.Thumbnail(
  {image:skytruthLogo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'90px',height:'90px',margin:'0px 0px 0px 190px'}
  });
//Creates the style parameters for all elements of the welcome panel  
var welcomeParams = {backgroundColor:'061732',stretch:'horizontal',color:w, fontSize:'14px',fontWeight:'bold'};  
//Creates the welcome panel and necessary variables
var welcome = ui.Panel({style:{width:'500px',position:'top-center',textAlign:'center',backgroundColor:'061732',border:'2px solid black'}});
var title = ui.Label('Welcome to SkyTruth\'s West Virginia FrackFinder App!',welcomeParams);
var develop = ui.Label('The FrackFinder project has been developed to assist with the mapping of hydraulic fracturing across the West Virginia landscape. We hope the public will use this as a tool for research into the environmental and public health implications fracking may have on society.',welcomeParams);
var instruct = ui.Label('To use the FrackFinder app, click on the boxes on the left panel to add or remove wellpad data from all of our updates.',welcomeParams);
var note = ui.Label('To download either a point or polygon representation of our entire dataset, follow the links in the left panel; this will take you to another page where you can initiate the download.',welcomeParams);
var removeWelcome = ui.Button('Remove these instructions',minimize,false,{backgroundColor:'061732',margin:'10px 0px 0px 160px',width:'150px'});
//Adds the welcome panel and its components to the map
map.add(welcome);
welcome.add(logoWelcome);
welcome.add(title);
welcome.add(develop);
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
//Creates a legend panel for the map
//Added here 05/19/20
// set position of panel
var legend = ui.Panel({style:{width:'180px',position:'top-left',textAlign:'left',backgroundColor:'061732',border:'2px solid black'}});
//functions for minimizing and expanding the legend
//added here 05/20/20
function minimizeLeg(){
  map.remove(legend);
  app.content1.panel.add(putOnLegend);
}
function expandLeg(){
  map.add(legend);
  app.content1.panel.remove(putOnLegend);
}
var removeLegend = ui.Button('x',minimizeLeg,false,{backgroundColor:'061732'});
var putOnLegend = ui.Button({label:'Add Legend',onClick:expandLeg,
            style:{fontSize:'8px',width:'200px',padding:'20px 0px 0px 28px',stretch:'both',
                   whiteSpace:'pre',textAlign:'center',position:'top-center',backgroundColor:'061732'}}); 
// Create legend title and a note for users
var legendTitle = ui.Label({
  value: 'Legend',
  style: {backgroundColor:'061732',stretch:'horizontal',color:w, fontSize:'14px',fontWeight:'bold',textAlign:'center'}
});
var wellImp = ui.Label('Wellpads will appear in color on the map, while impoundments will appear in grayscale.',
      {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'061732'});
legend.add(removeLegend);
legend.add(legendTitle);
legend.add(wellImp);
// Creates a function that styles 1 row of the legend.
var makeRow = function(colorWell, colorImp, name) {
      //Creates the label for wellpad color
      var colorBoxWell = ui.Label({
        style: {
          backgroundColor: '#' + colorWell,
          padding: '8px',
          margin: '0px, 0px, 4px, 0px'
        }
      });
      //Creates label for impoundment color
      var colorBoxImp = ui.Label({
        style: {
          backgroundColor: '#' + colorImp,
          padding: '8px',
          margin: '0px, 0px, 4px, 0px'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {backgroundColor:'061732',fontSize: '12px', fontWeight:'bold',stretch:'horizontal',color:w, 
                padding:'0px 0px 10px 10px', margin: '0px, 0px, 4px, 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBoxWell,colorBoxImp, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
        style:{backgroundColor:'#061732'}
      });
};
//  Palette with the Wellpad colors
var paletteWells = [d, r, g, o, p, b];
var paletteImp   = [z, y, x, v, u, t];
//Names for the legend
var names = ['2007','2009',
             '2011','2014',
             '2016','2018'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(paletteWells[i], paletteImp[i], names[i]));
  }  
map.add(legend);
// Creates the wellpad map layers.
var pads2007 = ui.Map.Layer(pads2007_coll,{color:d},'07',false);
var pads2009 = ui.Map.Layer(pads2009_coll,{color:r},'09',false);
var pads2011 = ui.Map.Layer(pads2011_coll,{color:g},'11',false);
var pads2014 = ui.Map.Layer(pads2014_coll,{color:o},'14',false);
var pads2016 = ui.Map.Layer(pads2016_coll,{color:p},'16',false);
var pads2018 = ui.Map.Layer(pads2018_coll,{color:b},'18',false);
//Added here 05/19/20
var pads2007shape = ui.Map.Layer(pads2007shapes_coll,{color:d},'shp07',false);
var pads2009shape = ui.Map.Layer(pads2009shapes_coll,{color:r},'shp09',false);
var pads2011shape = ui.Map.Layer(pads2011shapes_coll,{color:g},'shp11',false);
var pads2014shape = ui.Map.Layer(pads2014shapes_coll,{color:o},'shp14',false);
var pads2016shape = ui.Map.Layer(pads2016shapes_coll,{color:p},'shp16',false);
var pads2018shape = ui.Map.Layer(pads2018shapes_coll,{color:b},'shp18',false);
//Creates the impoundment map layers.
var imp2007 = ui.Map.Layer(impoundments2007_coll,{color:z},'imp07',false);
var imp2009 = ui.Map.Layer(impoundments2009_coll,{color:y},'imp09',false);
var imp2011 = ui.Map.Layer(impoundments2011_coll,{color:x},'imp11',false);
var imp2014 = ui.Map.Layer(impoundments2014_coll,{color:v},'imp14',false);
var imp2016 = ui.Map.Layer(impoundments2016_coll,{color:u},'imp16',false);
var imp2018 = ui.Map.Layer(impoundments2018_coll,{color:t},'imp18',false);
//Added here 05/19/20
var imp2007shape = ui.Map.Layer(impoundments2007shapes_coll,{color:z},'impShp07',false);
var imp2009shape = ui.Map.Layer(impoundments2009shapes_coll,{color:y},'impShp09',false);
var imp2011shape = ui.Map.Layer(impoundments2011shapes_coll,{color:x},'impShp11',false);
var imp2014shape = ui.Map.Layer(impoundments2014shapes_coll,{color:v},'impShp14',false);
var imp2016shape = ui.Map.Layer(impoundments2016shapes_coll,{color:u},'impShp16',false);
var imp2018shape = ui.Map.Layer(impoundments2018shapes_coll,{color:t},'impShp18',false);
// Creates the merged wellpad and impoundments layer, which is then used by the Inspector panel.
var wellsMerged = pads2007_coll.merge(pads2009_coll)
                          .merge(pads2011_coll)
                          .merge(pads2014_coll)
                          .merge(pads2016_coll)
                          .merge(pads2018_coll);
//Added here 05/19/20
var wellsMergedShape = pads2007shapes_coll.merge(pads2009shapes_coll)
                          .merge(pads2011shapes_coll)
                          .merge(pads2014shapes_coll)
                          .merge(pads2016shapes_coll)
                          .merge(pads2018shapes_coll);
var impMerged = impoundments2007_coll.merge(impoundments2009_coll)
                          .merge(impoundments2011_coll)
                          .merge(impoundments2014_coll)
                          .merge(impoundments2016_coll)
                          .merge(impoundments2018_coll);
//Added here 05/19/20
var impMergedShape = impoundments2007shapes_coll.merge(impoundments2009shapes_coll)
                          .merge(impoundments2011shapes_coll)
                          .merge(impoundments2014shapes_coll)
                          .merge(impoundments2016shapes_coll)
                          .merge(impoundments2018shapes_coll);
// Reset the area values for both the merged shape collections. Trying to fix the Inspector.
function setArea(poly){return poly.set('area_m2', poly.geometry().area())}
wellsMergedShape = wellsMergedShape.map(setArea);
impMergedShape = impMergedShape.map(setArea);
// Sets a location type as a wellpad or impoundment for centroids
function setAttributes_wells(pt)
{
  return pt.set({'Location Type': 'Wellpad'});
}
function setAttributes_imp(pt)
{
  return pt.set('Location Type', 'Impoundment');
}
//merges both the wellpad and impoundment datasets for the inspector and adds location type and long lat values
var wellsFinal = wellsMerged.map(setAttributes_wells);
var impFinal = impMerged.map(setAttributes_imp);
var merged = wellsFinal.merge(impFinal);
//Merges both the wellpad and impoundment shapes for the inspector
var wellsFinalShape = wellsMergedShape.map(setAttributes_wells);
var impFinalShape = impMergedShape.map(setAttributes_imp);
var mergedShape = wellsFinalShape.merge(impFinalShape);
// Add wellpad and impoundment data to the map.
map.add(pads2007);
map.add(pads2009);
map.add(pads2011);
map.add(pads2014);
map.add(pads2016);
map.add(pads2018);
map.add(pads2007shape);
map.add(pads2009shape);
map.add(pads2011shape);
map.add(pads2014shape);
map.add(pads2016shape);
map.add(pads2018shape);
map.add(imp2007);
map.add(imp2009);
map.add(imp2011);
map.add(imp2014);
map.add(imp2016);
map.add(imp2018);
map.add(imp2007shape);
map.add(imp2009shape);
map.add(imp2011shape);
map.add(imp2014shape);
map.add(imp2016shape);
map.add(imp2018shape);
//Creates a function that sets shown to true for wellpads and impoundments associated with respective year.
function checkCallbacks(padLayer,padLayerShape, impLayer, impLayerShape, padColl, impColl)
{
  padLayer.setShown(true);
  padLayerShape.setShown(true);
  impLayer.setShown(true);
  impLayerShape.setShown(true);
  // Add labels describing the number of wellpads / impoundments found per update.
  var newLabelw = ui.Label(padColl.size().evaluate(addCtw),{stretch:'horizontal',color:w,textAlign:'center',backgroundColor:'061732',padding:'30px 0px 30px 0px'});
  var newLabeli = ui.Label(impColl.size().evaluate(addCti),{stretch:'horizontal',color:w,textAlign:'center',backgroundColor:'061732',padding:'30px 0px 30px 0px'});
}
//Create Functions for changing visibility of map layers.
//Modified here 05/19/20
var layer07Map = function(){
  var det = checkbox2007.getValue();
  if (det === true) {
    checkCallbacks(pads2007, pads2007shape, imp2007, imp2007shape, pads2007_coll, impoundments2007_coll);
  }
  else {
    pads2007.setShown(false);
    pads2007shape.setShown(false);
    imp2007.setShown(false);
    imp2007shape.setShown(false);
}
};
var layer09Map = function(){
  var det = checkbox2009.getValue();
  if (det === true) {
    checkCallbacks(pads2009,pads2009shape, imp2009, imp2009shape, pads2009_coll, impoundments2009_coll);
  }
  else {
    pads2009.setShown(false);
    pads2009shape.setShown(false);
    imp2009.setShown(false);
    imp2009shape.setShown(false);
}
};
var layer11Map = function(){
  var det = checkbox2011.getValue();
  if (det === true) {
    checkCallbacks(pads2011, pads2011shape, imp2011, imp2011shape, pads2011_coll, impoundments2011_coll);
  }
  else {
  pads2011.setShown(false);
  pads2011shape.setShown(false);
  imp2011.setShown(false);
  imp2011shape.setShown(false);
}
};
var layer14Map = function(){
  var det = checkbox2014.getValue();
  if (det === true) {
    checkCallbacks(pads2014,pads2014shape, imp2014, imp2014shape, pads2014_coll, impoundments2014_coll);
  }
  else {
    pads2014.setShown(false);
    pads2014shape.setShown(false);
    imp2014.setShown(false);
    imp2014shape.setShown(false);
}
};
var layer16Map = function(){
  var det = checkbox2016.getValue();
  if (det === true) {
    checkCallbacks(pads2016, pads2016shape, imp2016, imp2016shape, pads2016_coll, impoundments2016_coll);
  }
  else {
    pads2016.setShown(false);
    pads2016shape.setShown(false);
    imp2016.setShown(false);
    imp2016shape.setShown(false);
}
};
var layer18Map = function(){
  var det = checkbox2018.getValue();
  if (det === true) {
    checkCallbacks(pads2018, pads2018shape, imp2018, imp2018shape, pads2018_coll, impoundments2018_coll);
  }
  else {
    pads2018.setShown(false);
    pads2018shape.setShown(false);
    imp2018.setShown(false);
    imp2018shape.setShown(false);
}
};
//ui checkboxes for Wellpads and Impoundments
var checkboxParams = {stretch:'vertical',
                      color:w,textAlign:'center',backgroundColor:'061732',padding:'15px 0px 0px 85px'};
var checkbox2007 = ui.Checkbox({label:'2007',value:false, onChange: layer07Map,
            style: checkboxParams});
var checkbox2009 = ui.Checkbox({label:'2009',value:false, onChange: layer09Map,
            style: checkboxParams});
var checkbox2011 = ui.Checkbox({label:'2011',value:false, onChange: layer11Map,
            style: checkboxParams});
var checkbox2014 = ui.Checkbox({label:'2014',value:false, onChange: layer14Map,
            style: checkboxParams});
var checkbox2016 = ui.Checkbox({label:'2016',value:false, onChange: layer16Map,
            style: checkboxParams});
var checkbox2018 = ui.Checkbox({label:'2018',value:false, onChange: layer18Map,
            style: checkboxParams});
// Wellpad/Impoundment inspector.
//functions for minimizing and expanding Wellpad and Impoundment Inspector with button click
//Added here 05/19/2020
function minimizeInsp(){
  map.remove(insp);
  app.content1.panel.add(putOnInsp);
}
function expandInsp(){
  map.add(insp);
  app.content1.panel.remove(putOnInsp);
}
var insp = ui.Panel({style:{width:'250px',position:'top-right',backgroundColor:'061732',border:'2px solid black'}});
var inspTitle = ui.Label('Wellpad and Impoundment Inspector',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'14px',fontWeight:'bold'});
//Modified here 05/19/20
var mapclick = ui.Label('Click a wellpad or impoundment on the map for more information.',{backgroundColor:'061732',color:w,textAlign:'center',fontSize:'13px'});
var note = ui.Label('*Note: You may need to zoom in if there are several points in an area. Inspector data may require a few seconds to load.',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'11px'});
//Added here 05/19/20
var removeInsp = ui.Button('x',minimizeInsp,false,{backgroundColor:'061732'});
var putOnInsp = ui.Button({label:'Add Inspector Panel',onClick:expandInsp,
            style:{fontSize:'8px',width:'200px',padding:'20px 0px 0px 28px',stretch:'both',
                   whiteSpace:'pre',textAlign:'center',position:'top-center',backgroundColor:'061732'}}); 
insp.add(removeInsp);
insp.add(inspTitle);
insp.add(mapclick);
insp.add(note);
map.add(insp);
var buff;
var len;
var wellFirst;
var textArea;
var textYear;
var impFirst;
var impTextArea;
var impTextYear;
//function for wellpad inspector to initiate on click.
map.onClick(function(coords){
  insp.clear();
  var pt = ee.Geometry.Point(coords.lon,coords.lat);
  buff = pt.buffer(200);
  // Variables for textboxes in inspector.
  //Modified here 05/19/2020
  var inspClick = ui.Label('Click a wellpad or impoundment on the map for more information.',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'13px'});
  var year = ui.Label('First identified drilling at location: ',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'13px'});
  var area = ui.Label('Area of wellpad (sq.m.): ',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'13px'});
  var yearBox = ui.Textbox({placeholder:'No wellpad here...',style:{backgroundColor:'061732',textAlign:'center',width:'200px',border:'2px solid black'}});
  var areaBox = ui.Textbox({placeholder:'No wellpad here...',style:{backgroundColor:'061732',textAlign:'center',width:'200px',border:'2px solid black'}});
  var dash = ui.Label('============================',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'13px'});
  var impYear = ui.Label('First identified impoundment creation at location: ',{backgroundColor:'061732',color:w, textAlign:'left',fontSize:'13px'});
  var impArea = ui.Label('Area of impoundment (sq.m.): ',{backgroundColor:'061732',color:w, textAlign:'center',fontSize:'13px'});
  var impYearBox = ui.Textbox({placeholder:'No impoundment here...',style:{backgroundColor:'061732',textAlign:'center',width:'200px',border:'2px solid black'}});
  var impAreaBox = ui.Textbox({placeholder:'No impoundment here...',style:{backgroundColor:'061732',textAlign:'center',width:'200px',border:'2px solid black'}});
  // Set derived values for the textboxes we'll be updating.
  wellFirst = ee.Feature(wellsFinalShape.filterBounds(buff).first());
  textYear = wellFirst.get('classifica');
  textArea = wellFirst.get('area_m2');
  impFirst = ee.Feature(impFinalShape.filterBounds(buff).first());
  impTextYear = impFirst.get('classifica');
  impTextArea = impFirst.get('area_m2');
  // Set Wellpad textbox values.
  textYear.evaluate(function(val){
    yearBox.setValue(val)});
  textArea.evaluate(function(val){
    if (val !== undefined){
      areaBox.setValue(val.toFixed(2))}});
  // Set Impoundment textbox values.
  impTextYear.evaluate(function(val){
    impYearBox.setValue(val)});
  impTextArea.evaluate(function(val){
    if (val !== undefined){
      impAreaBox.setValue(val.toFixed(2))}});
  insp.add(removeInsp);
  insp.add(inspTitle);
  insp.add(inspClick);
  insp.add(note);
  // Adds wellpad components to inspector
  insp.add(year);
  insp.add(yearBox);
  insp.add(area);
  insp.add(areaBox);
  insp.add(dash);
  //adds impoundment components to inspector
  insp.add(impYear);
  insp.add(impYearBox);
  insp.add(impArea);
  insp.add(impAreaBox);
});
//Creates a label on panel for displaying how many wellpads in recently clicked dataset
var ctLabelw = ui.Label('Clicking a dataset will display how many wellpads and impoundments were created here.',
{stretch:'horizontal',color:w,textAlign:'center',backgroundColor:'061732',padding:'30px 0px 0px 0px'});
var ctLabeli = ui.Label('',
{stretch:'horizontal',color:w,textAlign:'center',backgroundColor:'061732',padding:'30px 0px 0px 0px'});
// Functions for retrieving values and setting ui elements.
function addCtw(val)
{
  ctLabelw.setValue('Number of wellpads in the most recently selected dataset: ' + val);
}
function addCti(val){
  ctLabeli.setValue('Number of impoundments in the most recently selected dataset: ' + val);
}
//Main ui panel components
var label = ui.Label('Click for wellpad Data');
var inspector = ui.Panel([label]);
var wellpadlabel = ui.Label('Number of wellpads in West Virginia', {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:w});
var title = ui.Label('West Virginia FrackFinder',
      {stretch:'horizontal',color:w,fontSize:'16px',textAlign:'center',backgroundColor:'061732',fontWeight:'bold'});
var leftInstruct = ui.Label('Toggle the checkbox next to each year to turn on/off the wellpads and impoundments, to see how fracking has spread through West Virginia since 2007.',
      {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'061732'});
//Added here 05/19/20
var wellDownload = ui.Label({
  value:'Click here to download the SkyTruth FrackFinder Point Data',
  style:{backgroundColor:w, position:'top-center',textAlign:'center',border:'2px solid black'},
  targetUrl:'https://drive.google.com/file/d/1cMr0UsL9uca4Yg0q1n0NmySmxjjfRBuY/view?usp=sharing'
});
var impDownload = ui.Label({
  value:'Click here to download the SkyTruth FrackFinder Polygon Data',
  style:{backgroundColor:w, position:'top-center',textAlign:'center',border:'2px solid black'},
  targetUrl:'https://drive.google.com/file/d/1M4sIT4joCJHDIPISGbKGSmPF8l6BrDl3/view?usp=sharing'
});
var logo = ui.Thumbnail(
  {image:skytruthLogo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'90px',height:'90px', margin:'0px 0px 10px 37px'}
  });
app.logoPanel = function(){
  app.logo = {panel:ui.Panel({
    widgets:[logo],
    style:{padding:'15px 0px 0px 32px',width:'220px',backgroundColor:'061732'}
  })};};
app.panel1 = function(){
  app.content1 = {panel:ui.Panel({
    widgets:
    [
    title,
    leftInstruct,
    checkbox2007,
    checkbox2009,
    checkbox2011,
    checkbox2014,
    checkbox2016,
    checkbox2018,
    ctLabelw,
    ctLabeli,
    wellDownload,
    impDownload
    ],
    style:{width:'220px',backgroundColor:'061732'}})}};
app.boot = function(){
  app.logoPanel();
  app.panel1();
  var main = ui.Panel({
    widgets:[app.logo.panel,app.content1.panel],
    style:{width:'240px',backgroundColor:'061732'}
  });
  ui.root.insert(0,main);
};
app.boot();