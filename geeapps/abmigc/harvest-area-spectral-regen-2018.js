var dataTable = ui.import && ui.import("dataTable", "table", {
      "id": "users/jnhird/HA_Polys/Final_SpecRegnDatasets/20201216_SpecRegn2018_Simplfd"
    }) || ee.FeatureCollection("users/jnhird/HA_Polys/Final_SpecRegnDatasets/20201216_SpecRegn2018_Simplfd");
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Script: Visualizing key spectral regeneration metrics for the Harvest Area 2018 Spectral Regeneration Dataset
// Author: Jennifer Hird, Remote Sensing Scientist, Geospatial Centre, Alberta Biodiversity Monitoring Institute
// Contact: jennifer.hird@ucalgary.ca | twitter: @JNHird | online: abmi.ca
// Last Updated: December 18, 2020
//
// Link to Code: https://code.earthengine.google.com/?scriptPath=users%2Fjnhird%2FsharedABMI%3ASpecRegn_2018HAs_VisualizationTool_v20201218
//
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: Import dataset
// var dataTable = ee.FeatureCollection("users/jnhird/HA_Polys/Final_SpecRegnDatasets/20201216_SpecRegn2018_Simplfd");
//:: Filter dataset for visualization
var relvHAs = dataTable.filter(ee.Filter.gt('hrvYr_m',0));
var otherHAs = dataTable.style({color:'808080FF',fillColor:'808080FF'});
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Create Maps
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var layerLabStyle = {fontSize:'16px',fontWeight:'bold',border:'1px solid black',padding:'5px 15px 5px 15px'};
var panelBorderStyle = {border:'1px solid black'};
//:: --- Map 1 (Year of Harvest) --
var harvYrImg = relvHAs.reduceToImage({properties:['hrvYr_m'],reducer:ee.Reducer.first()}).rename('HarvYr');
var harvYrViz = {
  min: 1989,max: 2013,
  palette: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']
};
var map1 = ui.Map();
map1.setOptions({mapTypeId:'SATELLITE'});
map1.setControlVisibility(false);
map1.addLayer(otherHAs);
map1.addLayer(harvYrImg.visualize(harvYrViz));
var map1lab = ui.Label('Year of Detected Harvest Event');
map1lab.style().set(layerLabStyle);
map1.add(map1lab);
map1.style().set(panelBorderStyle);
map1.setCenter(-114.5726, 55.6136,12);
map1.style().set('cursor', 'crosshair');
//:: --- Map 2 (Regen2018) --
var reg2018Img = relvHAs.reduceToImage({properties:['reg2018_m'],reducer:ee.Reducer.first()}).rename('reg2018_m');
var reg2018viz = {
  min:0, max:150,
  // palette: ['#D7A83E','#ACC138','#9B9D19','#6A923B','#43732F'] //** Needs more dynamism!
  // palette: ["#ca3226","#df7f46","#f9e373","#64c042","#2e570f"]
  palette: ["#ca3226","#f9e373","#64c042","#2e570f"]
};
var map2 = ui.Map();
map2.setOptions({mapTypeId:'SATELLITE'});
map2.setControlVisibility(false);
map2.addLayer(otherHAs);
map2.addLayer(reg2018Img.visualize(reg2018viz));
var map2lab = ui.Label('Spectral Regeneration (%) in 2018');
map2lab.style().set(layerLabStyle);
map2.add(map2lab);
map2.style().set(panelBorderStyle);
map2.style().set('cursor', 'crosshair');
//:: --- Map 3 (5-Yr Regen) --
var reg5yImg = relvHAs.reduceToImage({properties:['reg5yr_m'],reducer:ee.Reducer.first()}).rename('reg5yr_m');
var reg5yViz = {
  min:0, max:150,
  // palette: ['#D7A83E','#ACC138','#9B9D19','#6A923B','#43732F']
  // palette: ["#ca3226","#df7f46","#f9e373","#64c042","#2e570f"]
  palette: ["#ca3226","#f9e373","#64c042","#2e570f"]
};
var map3 = ui.Map();
map3.setOptions({mapTypeId:'SATELLITE'});
map3.setControlVisibility(false);
map3.addLayer(otherHAs);
map3.addLayer(reg5yImg.visualize(reg5yViz));
var map3lab = ui.Label('5-Year Spectral Regeneration (%)');
map3lab.style().set(layerLabStyle);
map3.add(map3lab);
map3.style().set(panelBorderStyle);
map3.style().set('cursor', 'crosshair');
//:: --- Map 4 (Yrs to 80% Regen) --
var regyr80Img = relvHAs.reduceToImage({properties:['y2reg80_m'],reducer:ee.Reducer.first()}).rename('y2reg80_m');
var regyr80Viz = {
  min:0, max:25,
  palette: ['#9be564','#d7f75b','#d19c1d','#7d451b','#472c1b']
};
var map4 = ui.Map();
map4.setOptions({mapTypeId:'SATELLITE'});
map4.setControlVisibility(false);
map4.addLayer(otherHAs);
map4.addLayer(regyr80Img.visualize(regyr80Viz));
var map4lab = ui.Label('Years to 80% Spectral Regeneration');
map4lab.style().set(layerLabStyle);
map4.add(map4lab);
map4.style().set(panelBorderStyle);
map4.style().set('cursor', 'crosshair');
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Set up Legends 
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: BASED ON CODE FROM:
//::  https://code.earthengine.google.com/7be167882a772c6ddcbc67b2345eac64
//::  https://gis.stackexchange.com/questions/345058/add-legend-in-a-splitpanel-in-google-earth-engine/345229#345229
//::  Author: Daniel Wiell, StackExchange
var panStyle = {position:'bottom-left',padding:'4px 8px'};
var titleStyle = {fontWeight:'bold',fontSize:'14px',margin:'0 0 4px 0',padding:'0'};
//:: Legend 1
//------------
//:: Create panel and title label
var legend1 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend1.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label(harvYrViz['max'])]});
legend1.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((harvYrViz.max-harvYrViz.min)/100.0).add(harvYrViz.min);
var legendImage = gradient.visualize(harvYrViz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend1.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label(harvYrViz['min'])]});
legend1.add(panelMin);
// add to map
map1.add(legend1);
//:: Legend 2
//------------
//:: Create panel and title label
var legend2 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend2.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label(reg2018viz['max']+' %')]});
legend2.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((reg2018viz.max-reg2018viz.min)/100.0).add(reg2018viz.min);
var legendImage = gradient.visualize(reg2018viz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend2.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label(reg2018viz['min']+' %')]});
legend2.add(panelMin);
// add to map
map2.add(legend2);
//:: Legend 3
//------------
//:: Create panel and title label
var legend3 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend3.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label(reg5yViz['max']+' %')]});
legend3.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((reg5yViz.max-reg5yViz.min)/100.0).add(reg5yViz.min);
var legendImage = gradient.visualize(reg5yViz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend3.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label(reg5yViz['min']+' %')]});
legend3.add(panelMin);
// add to map
map3.add(legend3);
//:: Legend 4
//------------
//:: Create panel and title label
var legend4 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend4.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label(regyr80Viz['max']+' yrs')]});
legend4.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((regyr80Viz.max-regyr80Viz.min)/100.0).add(regyr80Viz.min);
var legendImage = gradient.visualize(regyr80Viz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend4.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label(regyr80Viz['min']+' yrs')]});
legend4.add(panelMin);
// add to map
map4.add(legend4);
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Set up Panels 
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: -- Map panel --
//------------------
//:: Set visibility of controls in maps
map1.setControlVisibility({zoomControl:true});
map3.setControlVisibility({mapTypeControl:true,fullscreenControl:true});
map4.setControlVisibility({scaleControl:true});
//:: Create linker to link 4 maps
var mapLink = ui.Map.Linker([map1, map2, map3, map4]);
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([map1, map2], null, {stretch: 'both'}),
      ui.Panel([map3, map4], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// -- Info panel -- 
//------------------
//:: -- Text boxes --
// Create a title.
var toolTitle = ui.Label('ABMI Harvest Area 2018 Spectral Regeneration Dataset: Visualization Tool', {
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '20px',
  padding: '2px 5px 0px 5px'
  // backgroundColor: bckCol
});
//:: Create a subtitle note
var subTitle = ui.Label('Note: grey polygons represent harvest areas not suitable for deriving satellite-based spectral regeneration. See Metatdata documentation for more details.');
subTitle.style().set({textAlign:'left',fontSize:'12px',backgroundColor:'#EEEEEE', stretch:'horizontal',padding: '5px'});
//:: Create instruction label
var instrLab = ui.Label('Click a harvest area to see some of its spectral regeneration metrics.');
instrLab.style().set({
  textAlign:'left', fontSize:'15px', stretch:'horizontal',
  padding: '5px', border:'1px solid lightGray', backgroundColor: '#EEEEEE'
});
var harvHeading = ui.Label('Info for Selected Harvest Area');
harvHeading.style().set({
  textAlign:'left', fontSize:'16px',fontWeight:'bold',
  stretch:'horizontal'
});
//:: -- Info boxes --
var notDatTxt = '...';
//:: Lat/Long
var lon = ui.Label(notDatTxt);
var lat = ui.Label(notDatTxt);
var lonlatpPanel = ui.Panel([
  ui.Label({value: 'Clicked Location (Lat/Long):', 
    style:{fontSize: '14px', fontWeight: 'bold', shown: 'false'}}),
  lon, lat],
  ui.Panel.Layout.flow('vertical')
);
//:: Year of Harvest
var yrHarvTitle = ui.Label({value:'Year of Detected Harvest Event:',style:{fontSize:'14px', fontWeight: 'bold'}});
var yrHarvVal = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var yrHarvPanel = ui.Panel({
  widgets:[yrHarvTitle,yrHarvVal],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: Spec Regn 2018
var spRg18Title = ui.Label({value:'Spectral Regeneration (%) in 2018:',style:{fontSize:'14px', fontWeight: 'bold'}});
var spRg18Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var spRg18Panel = ui.Panel({
  widgets:[spRg18Title,spRg18Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: 5-Yr Reg
var spRg5Title = ui.Label({value:'5-Year Spectral Regeneration (%):',style:{fontSize:'14px', fontWeight: 'bold'}});
var spRg5Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var spRg5Panel = ui.Panel({
  widgets:[spRg5Title,spRg5Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: Yr to 80 Reg
var y2r80Title = ui.Label({value:'Years to 80% Spectral Regeneration:',style:{fontSize:'14px', fontWeight: 'bold'}});
var y2r80Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var y2r80Panel = ui.Panel({
  widgets:[y2r80Title,y2r80Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: -- Add widgets to, style panel --
//:: Add widgets to Info Panel
var infoPanel = ui.Panel({widgets:[
    toolTitle,
    instrLab,
    harvHeading,
    lonlatpPanel,
    yrHarvPanel,
    spRg18Panel,
    spRg5Panel,
    y2r80Panel,
    subTitle],
  layout:'flow',
  style:{width:'300px', border:'1px solid black'}
});
//::--- Event Handling Function(s) ---
//:: Create emtpy layer to add selected HA polygon to
var selHAlayer = ui.Map.Layer();
var selHAlayer2 = ui.Map.Layer();
var selHAlayer3 = ui.Map.Layer();
var selHAlayer4 = ui.Map.Layer();
//:: Create panel for 'Calculating' message for user
var calcMsg = ui.Panel([
  ui.Label({
    value: 'Please wait. Extracting values...',
    style:{
      color: 'blue',
      fontWeight: 'bold'
    }
  })
]);
calcMsg.style().set({
  position: 'top-center',
  textAlign: 'center',
  padding: '1px 2px 1px 2px',
  shown: false
});
map1.add(calcMsg);
//:: Create panel for 'Error' message for user
var errMsg = ui.Panel([
  ui.Label({
    value: 'Please click on a harvest area feature shown in colour.',
    style: {
      color: 'red',
      fontWeight: 'bold',
      padding: '0px'
    }
  })
]);
errMsg.style().set({
  position: 'bottom-center',
  textAlign: 'center',
  padding: '1px 2px 1px 2px',
  shown: false
});
map1.add(errMsg);
//:: Callback function for when a map is clicked
//-------------------------------------------------
var infoFill = function(coords) {
// map1.onClick(function(coords) {
  //:: If selected HA outline layer is already listed, remove it
  if (map1.layers().length() > 2) {
    map1.layers().remove(selHAlayer);
  }
  if (map2.layers().length() > 2) {
    map2.layers().remove(selHAlayer2);
  }
  if (map3.layers().length() > 2) {
    map3.layers().remove(selHAlayer3);
  }
  if (map4.layers().length() > 2) {
    map4.layers().remove(selHAlayer4);
  }
  //:: Print calculating message on screen
  calcMsg.style().set('shown', true);
  //:: Remove error message from previous click
  errMsg.style().set('shown', false);
  //:: Create geometry where user clicked
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //:: Logical variable: whether the clicked location is contained within the feature colleciton
  var ptInPoly = point.containedIn(relvHAs).getInfo();
  //:: Conditional statement
  if (ptInPoly === true) {   
        //:: Remove error message, if shown
    errMsg.style().set('shown', false);
    //:: Update the lon/lat panel with values from the click event.
    lon.setValue('lon: ' + coords.lon.toFixed(2)),
    lat.setValue('lat: ' + coords.lat.toFixed(2));
    //:: Extract the polygon feature in which user clicked
    var thisHA = ee.Feature(relvHAs.filterBounds(point).first());
    var haImg = ee.Image().byte().paint({
      featureCollection: thisHA,
      width: 2
    });
    //:: Update selected HA polygon layer on map
    selHAlayer.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer2.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer3.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer4.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    map1.layers().add(selHAlayer);
    map2.layers().add(selHAlayer2);
    map3.layers().add(selHAlayer3);
    map4.layers().add(selHAlayer4);
    //:: Set values of labels in info panel
    yrHarvVal.setValue(thisHA.get('hrvYr_m').getInfo().toFixed(0));
    spRg18Val.setValue(thisHA.get('reg2018_m').getInfo().toFixed(2));
    spRg5Val.setValue(thisHA.get('reg5yr_m').getInfo().toFixed(2));
    y2r80Val.setValue(thisHA.get('y2reg80_m').getInfo().toFixed(2));
    //:: Remove calculating message from screen
    calcMsg.style().set('shown', false);
  } else { //:: else if (ptInPoly === false), then do:
      //:: Remove calculating message from screen
      calcMsg.style().set('shown', false);
      //:: Print error message on screen
      errMsg.style().set('shown', true);
  }
};
// });    
map1.onClick(infoFill);
map2.onClick(infoFill);
map3.onClick(infoFill);
map4.onClick(infoFill);    
// -- Add to root --
// -----------------
// Add these to the interface.
ui.root.widgets().reset([infoPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.widgets().add(mapGrid);