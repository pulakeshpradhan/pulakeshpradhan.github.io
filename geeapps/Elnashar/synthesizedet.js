var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                18.119407514763928,
                17.43971415041288
              ],
              [
                18.119407514763928,
                8.195140924786443
              ],
              [
                28.842063764763928,
                8.195140924786443
              ],
              [
                28.842063764763928,
                17.43971415041288
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[18.119407514763928, 17.43971415041288],
          [18.119407514763928, 8.195140924786443],
          [28.842063764763928, 8.195140924786443],
          [28.842063764763928, 17.43971415041288]]], null, false);
Map.setCenter(0, 0, 2);
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
var d = require('users/Elnashar/FD:Data');
var s = require('users/Elnashar/FD:DataStyle');
var f = require('users/Elnashar/FD:Functions');
f.addZomeLevel('Synthesized ET');
var label = ui.Label('',{fontWeight:'bold',fontSize:'15px'});
// Ensemble ET product, Sect. 4.2
var yyKey = ee.List.sequence(1982, 2019).map(function(i){return ee.String(ee.Number(i).int())});
var yyVal = ee.List.sequence(1982, 2019);
var yyDic = ee.Dictionary.fromLists(yyKey, yyVal);
var mmDic = ee.Dictionary({'01':1,'02':2,'03':3,'04':4,'05':5,'06':6,'07':7,'08':8,'09':9,'10':10,'11':11,'12':12});
function readAsset(image){
  var id = image.id().split("_");
  var yy = ee.Number(yyDic.get(id.get(1)));
  var mm = ee.Number(mmDic.get(id.get(2)));
  var date = ee.Date.fromYMD({day:1, month:mm, year:yy}).millis();
  return image.rename('SynthesizedET').setMulti({'mm':mm, 'yy':yy, 'system:time_start':date}); }
var SynthesizedET = ee.ImageCollection('users/Elnashar/SynthesizedET').map(readAsset);
//  Figure 17. Decadal and long-term synthesized ET
var Synthesized_ET_1982_2019_mean = ee.Image("users/Elnashar/ET/Decadal_LongTerm_Synthesized_ET/Synthesized_ET_1982_2019_mean");
var Synthesized_ET_2010_2019_mean = ee.Image("users/Elnashar/ET/Decadal_LongTerm_Synthesized_ET/Synthesized_ET_2010_2019_mean");
var Synthesized_ET_2000_2009_mean = ee.Image("users/Elnashar/ET/Decadal_LongTerm_Synthesized_ET/Synthesized_ET_2000_2009_mean");
var Synthesized_ET_1990_1999_mean = ee.Image("users/Elnashar/ET/Decadal_LongTerm_Synthesized_ET/Synthesized_ET_1990_1999_mean");
var Synthesized_ET_1982_1989_mean = ee.Image("users/Elnashar/ET/Decadal_LongTerm_Synthesized_ET/Synthesized_ET_1982_1989_mean");
function synthesised_ET_Classified_Maps(){
  f.addClassifiedLegend('Decadal/long-term legend', s.label_ET, 'left');
  f.addlayerCL(Synthesized_ET_1982_2019_mean, 'Synthesized_ET_1982_2019_mean', s.style_ET, s.label_ET, 'None', 1, 1);
  f.addlayerCL(Synthesized_ET_2010_2019_mean, 'Synthesized_ET_2010_2019_mean', s.style_ET, s.label_ET, 'None', 0, 1);
  f.addlayerCL(Synthesized_ET_2000_2009_mean, 'Synthesized_ET_2000_2009_mean', s.style_ET, s.label_ETT, 'None', 0, 1);
  f.addlayerCL(Synthesized_ET_1990_1999_mean, 'Synthesized_ET_1990_1999_mean', s.style_ET, s.label_ET, 'None', 0, 1);
  f.addlayerCL(Synthesized_ET_1982_1989_mean, 'Synthesized_ET_1982_1989_mean', s.style_ET, s.label_ET, 'None', 0, 1);}
var DL = ['Synthesized_ET_1982_2019_mean', 'Synthesized_ET_2010_2019_mean',
          'Synthesized_ET_2000_2009_mean', 'Synthesized_ET_1990_1999_mean',
          'Synthesized_ET_1982_1989_mean',];
// GEE App
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);}
var dummyGeometry = ui.Map.GeometryLayer({geometries:null, name:'geometry', color:'23cba7'});
drawingTools.layers().add(dummyGeometry); 
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));}
var mmList = ['1','2','3','4','5','6','7','8','9','10','11','12'];
var yyList = [];
for (var y=1982; y<=2019; y++){yyList.push(String(y))}
var app = {};
var palette = ['ffffff','fcd163','99b718','66a000','3e8601','207401','056201','004c00','011301'];
var ifNotYYMM = 'Select year and month then press submit';
var ifNotViewport = 'To download currently AOI,\nit must be less or equal\n10000x10000 grid pixel.';
var gee = 'https://code.earthengine.google.com/8b68188cde8946bc404deea0a416d6dd';
var ifNotAOI = 'Draw the area of interest';
var mmImage = '';
var zoomed = 0;
var legend = 0;
function toLayer(Synthesized_ET, min, max, palette, name){
  f.removeLayer(name);
  Map.addLayer(Synthesized_ET, {min:min, max:max, palette:palette}, name, 1, 1);
  drawingTools.setShape(null);}
app.Panels = function(){
  var introValue = 'Synthesis of Global\nActual Evapotranspiration\nfrom 1982 to 2019';
  var introLabel = ui.Label({value:introValue,style:{color:'black',fontWeight:'bold',fontSize:'20px',margin:'10px 5px',whiteSpace:'pre'}});
  app.intro = {panel:ui.Panel([introLabel.setUrl('https://doi.org/10.5194/essd-13-447-2021')])};
  var doiLabel = ui.Label({value:'Click to open dataset repository version',style:{color:'blue',fontWeight:'bold',fontSize:'15px',margin:'10px 5px',whiteSpace:'pre'}});
  app.doi = {panel:ui.Panel([doiLabel.setUrl('https://doi.org/10.7910/DVN/ZGOUED')])};
  var codeLabel = ui.Label({value:'Click to open GEE JavaScript version',style:{color:'blue',fontWeight:'bold',fontSize:'15px',margin:'10px 5px',whiteSpace:'pre'}});
  app.code = {panel:ui.Panel([codeLabel.setUrl('https://code.earthengine.google.com/7d9bb651b66cfbc4cdb6d968025177e5')])};
  app.yymm = {
    decadal:ui.Button({label:'Show', onClick:function(){
    f.addZomeLevel('Synthesized ET');
    var layers = f.layersName(Map.layers());
    var index =  layers.indexOf('Synthesized_ET_1982_1989_mean');
    if (index == -1) {synthesised_ET_Classified_Maps();}}}),
    yySelector:ui.Select({placeholder:'Select year',items:yyList,onChange:function(year){return year}}),
    mmSelector:ui.Select({placeholder:'Select month',items:mmList,onChange:function(month){
      app.yymm.DrawRectangle.setDisabled(false);
      app.yymm.DrawPolygon.setDisabled(false);
      return month}}),
    DrawRectangle:ui.Button({label:'By rectangle',disabled:true, onClick:function(){
      clearGeometry();
      drawingTools.setShape('rectangle');
      drawingTools.draw();
      app.yymm.submit.setDisabled(false);}}),
    DrawPolygon:ui.Button({label:'By polygon',disabled:true, onClick:function(){
      clearGeometry();
      drawingTools.setShape('polygon');
      drawingTools.draw();
      app.yymm.submit.setDisabled(false);}}),
    submit:ui.Button({label:'Submit', disabled:true, onClick:function(){
      f.addZomeLevel('Synthesized ET');
      var yy = app.yymm.yySelector.getValue();
      var mm = app.yymm.mmSelector.getValue();
      if (yy){
        if (mm){
          yy = Number(yy);
          mm = Number(mm);
          var name = 'Synthesized_ET_' + yy + '_' + f.str2(mm, 2);
          var mmImage = SynthesizedET.filterMetadata('yy','equals',yy).filterMetadata('mm','equals',mm).first();
          if ((yy >= 1982) & (yy <= 2000)){app.yymm.console.setValue('Selected synthesized ET is based on NTSG'); }
          if ((yy >= 2001) & (yy <= 2002)){app.yymm.console.setValue('Selected synthesized ET\nis the mean of\nNTSG and MOD16A2105'); }
          if ((yy >= 2003) & (yy <= 2017)){app.yymm.console.setValue('Selected synthesized ET\nis the mean of\nPML and SSEBop'); }
          if ((yy >= 2018) & (yy <= 2019)){app.yymm.console.label.setValue('Selected synthesized ET\nis based on SSEBop'); }
          var AOI = drawingTools.layers().get(0).getEeObject();
          // if (zoomed === 0){Map.centerObject(ee.Feature(AOI).geometry(), 5); zoomed = 1;}
          try{
            var url = mmImage.getDownloadURL({name:name, region:AOI, scale:1000});
            app.yymm.download.setUrl(url);
            app.yymm.download.style().set({shown: true});}
          catch(err){app.yymm.console.setValue(ifNotViewport)}
          drawingTools.onDraw(ui.util.debounce(toLayer(mmImage.divide(100).clip(AOI), 1, 300, palette, name), 500));
          if (legend === 0) {f.addStrightLegend('Monthly legend', 1, 300, palette, 'right'); legend = 1; }
          app.yymm.inspector.setValue('Click to get monthly pixel value');
          drawingTools.layers().get(0).setShown(false); }}
      else{app.yymm.console.setValue(ifNotYYMM)} }}),
    inspector:ui.Label('', {whiteSpace:'pre'}),
    download:ui.Label('Download AOI (Multiplied with 100)', {shown: false}),
    clearMap:ui.Button({label:'Clear all', onClick:function(){
      Map.clear();
      clearGeometry();
      Map.setOptions('HYBRID');
      app.yymm.submit.setDisabled(true);
      app.yymm.console.setValue('');
      drawingTools.setShown(false);
      zoomed = 0;
      legend = 0; }}),
    console:ui.Label({value:'',style:{color:'red', whiteSpace:'pre'}}), };
  app.yymm.panel = ui.Panel({
    widgets:[
      ui.Label({value:'Show decadal/long-term ET',style:{color:'green',fontWeight:'bold'}}),
      ui.Panel([app.yymm.decadal], ui.Panel.Layout.flow('horizontal')),
      ui.Label({value:'Show monthly ET',style:{color:'green',fontWeight:'bold'}}),
      ui.Panel([app.yymm.yySelector, app.yymm.mmSelector], ui.Panel.Layout.flow('horizontal')),
      ui.Label({value:'Draw AOI',style:{color:'green',fontWeight:'bold'}}),
      ui.Panel([app.yymm.DrawRectangle, app.yymm.DrawPolygon, app.yymm.submit], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.yymm.inspector], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.yymm.download], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.yymm.clearMap], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.yymm.console], ui.Panel.Layout.flow('horizontal'))
    ]})};
function onClick(coords){
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var layers = Map.layers();
  var layersName = f.layersName(layers);
  var mmLayers = [];
  for (var v=0; v<layersName.length; v++){
  if(DL.indexOf(layersName[v]) == -1){
    mmLayers.push(layersName[v]);}}
  mmLayers.sort();
  var images = [];
  var layersNameValue = [];
  if(layersName.length >= 1){
    for (var l=0; l<=layersName.length; l++){
      var index = layersName.indexOf(layersName[l]);
      if (index > -1) {
        var layer = layers.get(index);
        var path = layer.getEeObject();
        var name = layer.getName();
        if (DL.indexOf(name) == -1){
          images.push(ee.Image(path).rename(name));} }}}
  if(images.length >= 1){
    images = ee.ImageCollection.fromImages(images);
    var stacked = f.stackCollection(images);
    var pv = stacked.sample(point, 30).first();
    try{
      mmLayers.map(function(n){layersNameValue.push(n + ': ' + pv.get(n).getInfo().toFixed(2));});
      app.yymm.inspector.setValue(layersNameValue.join('\n'));  }
    catch(err){app.yymm.inspector.setValue('None');} } }
Map.onClick(onClick);
app.boot = function(){
  app.Panels();
  var leftPanel = ui.Panel({widgets:[app.intro.panel, app.doi.panel, app.code.panel, app.yymm.panel], style:{width:'350px'}});
  ui.root.insert(0, leftPanel);};
app.boot();