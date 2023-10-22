////// EXTREME SEA LEVEL RISE
// LOAD DEFAULTS 
// Erase Default Options GEE
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Color Palette
var paletas=require('users/gena/packages:palettes');
var mipaleta=paletas.colorbrewer.YlOrRd[5]; //.reverse()
// CREATE MAIN PANEL
// Add a title and some explanatory text to a side panel
var header = ui.Label('Extreme Sea Level', {fontSize: '20px', color: '#add8e6',fontWeight: 'bold', backgroundColor :'#00008B'});
var panel = ui.Panel([header], 'flow',{width: '400px', position: 'bottom-left',backgroundColor :'#00008B'});
// DROPDOWN AND SLIDER OPTIONS
// Dropdown Options
var vrb=ui.Select({items:['Extreme Sea Level: JRC','Extreme Sea Level: UMELB-IHE'],style: {backgroundColor :'#add8e6', color:'black'}});
var Options0=ui.Slider({min:0,max:2,step:1,value:1,style: {stretch: 'horizontal', width:'400px', fontSize:'0px', position:'top-center',backgroundColor :'#00008B', color:'#FFA500'}});
var Options0_text=ui.Label('Baseline                                   RCP 4.5                                   RCP 8.5', {fontWeight: 'bold',backgroundColor :'#00008B', color:'white',fontSize: '12px', whiteSpace:'pre'})
var Opt0 = function(ele) {
  var selection= 'Baseline'
  if (ele==1){
    selection='RCP 4.5'
  }else if(ele==2){
    selection='RCP 8.5'
  }
  return selection}
var Options1=ui.Slider({min:0,max:2,step:1,value:1,style: {stretch: 'horizontal', width:'400px', fontSize:'0px', position:'top-center',backgroundColor :'#00008B', color:'#FFA500'}});
var Options1_text=ui.Label(' 1 year                                    10 years                                    100 years', {fontWeight: 'bold', backgroundColor :'#00008B', color:'white',fontSize: '12px', whiteSpace:'pre'})
var Opt1 = function(ele) {
  var selection= '1'
  if (ele==1){
    selection='10'
  }else if(ele==2){
    selection='100'
  }
  return selection}
var Options2b=ui.Slider({min:0,max:1,step:1,value:0,style: {stretch: 'horizontal', width:'350px', fontSize:'0px', position:'top-center',backgroundColor :'#00008B', color:'#FFA500'}});
var Options2b_text=ui.Label('2050                                                                                 2100', {fontWeight: 'bold',backgroundColor :'#00008B', color:'white',fontSize: '12px', whiteSpace:'pre'})
var Opt2b = function(ele) {
  var selection= '2050'
  if (ele==1){
    selection='100'
  }
  return selection}
// Questions text
var questionv = ui.Label({value: 'Select data set:', style: {fontSize: '14px', color: '#add8e6',fontWeight: 'bold', backgroundColor :'#00008B'}});
var question0 = ui.Label({value: 'Select Sea Level Rise Scenario:', style: {fontSize: '14px', color: '#add8e6',fontWeight: 'bold', backgroundColor :'#00008B'}});
var question1 = ui.Label({value: 'Select Return Period:', style: {fontSize: '14px', color: '#add8e6',fontWeight: 'bold', backgroundColor :'#00008B'}});
var question2 = ui.Label({value: 'Select Year:', style: {fontSize: '14px', color: '#add8e6',fontWeight: 'bold', backgroundColor :'#00008B'}});
// Select Scenario  
panel.add(questionv);panel.add(vrb);
panel.add(question0);panel.add(Options0); panel.add(Options0_text);
panel.add(question1);panel.add(Options1); panel.add(Options1_text);
// Add panel for scenario 50 or 100
var panel2 = ui.Panel()
panel2.style().set({backgroundColor :'#00008B'})
panel.widgets().set(11,panel2);
// Add panel for links
var linkpanel = ui.Panel()
linkpanel.style().set({backgroundColor :'#00008B'})
panel.widgets().set(12,linkpanel);
// Add Logo Panel
var logopanel = ui.Panel()
logopanel.style().set({backgroundColor :'#00008B'})
panel.widgets().set(13,logopanel);
// LATERAL PANELS
ui.root.clear();
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(30, 50, 4);
map.setLocked(false,4,4)
// Create an inspector panel
var inspector = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {position: 'bottom-right',width: '300px'}});
// Close button
inspector.add(ui.Label('Click on the zoom box for information'));
map.add(inspector);   
// Create a function to Remove Layers
var removeLayer = function(name,map) {
  var layers = map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    map.remove(layer)
  } else {
    //print('Layer '+name+' not found')
  }
}
// CHANGE ON OPTIONS
Options0.onChange(function(){
  var item0=Options0.getValue();
  panel2.clear()
  if (item0 !== 0) {   
    panel2.add(question2);
    panel2.add(Options2b);
    panel2.add(Options2b_text);
  } else{
    panel2.clear()
  }
});
// BUTTON
var message = ui.Panel({style: {position: 'top-center'}});
map.add(message) 
var button = ui.Button({label: 'View',
  onClick: function() {
  message.add(ui.Label('Loading ...')); 
  var item0=Options0.getValue();
  if (item0 !== 0) {  
      change_vis(Opt1(Options1),Opt2b(Options2b),message)
  } else{
      change_vis(Opt1(Options1),'2010',message)
  } 
  }
  ,
  style: {fontSize: '16px', fontWeight: 'bold',width:'300px', position:'top-center',backgroundColor :'#add8e6', color:'black'}
});
panel.add(button);
// ADD IHE LOGO
var table = ui.Chart([['<img src=https://www.un-ihe.org/sites/default/files/ihe-delft_logo_black_cyan_full_version_0.png width=350px>']
],'Table', {allowHtml: true});
panel.add(table)
// Create a link panel
var text_ESL='Vousdoukas et al., 2018, Global probabilistic projections of extreme sea levels show intensification of coastal flood hazard, Nature Communications volume 9, Article number: 2360'
var link_ESL='https://www.nature.com/articles/s41467-018-04692-w'
var text_UMELB='Kirezci et al., 2020, Projections of global-scale extreme sea levels and resulting episodic coastal flooding over the 21st Century, Scientific Reports volume 10, Article number: 11629'
var link_UMELB='https://www.nature.com/articles/s41598-020-67736-6'
var text_Shoreline='Vousdoukas et al., 2020, Sandy coastlines under threat of erosion, Nature Climate Change volume 10, pages 260–263'
var link_Shoreline='https://www.nature.com/articles/s41558-020-0697-0'
vrb.onChange(function(){
  linkpanel.clear()
  linkpanel.add(ui.Label({value:'Visualisation based on', style:{fontWeight: 'bold', backgroundColor :'#00008B', color:'white'}}));
  if (vrb.getValue()== 'Extreme Sea Level: JRC'){  
    linkpanel.add(ui.Label({value:text_ESL, style:{fontWeight: 'bold', backgroundColor :'#00008B', color:'white'},targetUrl:link_ESL}));
  }else if (vrb.getValue()== 'Extreme Sea Level: UMELB-IHE'){
    linkpanel.add(ui.Label({value:text_UMELB, style:{fontWeight: 'bold', backgroundColor :'#00008B', color:'white'},targetUrl:link_UMELB}));
  }else{
    linkpanel.add(ui.Label({value:text_Shoreline, style:{fontWeight: 'bold', backgroundColor :'#00008B', color:'white'},targetUrl:link_Shoreline}));
  }
  })
// ZOOM BOX
// Create a map to be used as the zoom box.
var zoomBox = ui.Map({style: {stretch: 'both', shown: false}})
    .setControlVisibility(false);
zoomBox.style().set('cursor', 'crosshair');
var visParams = {min: 0, max: [0.18, 20, -0.18], bands: ['scale', 'offset', 'scale']};
// Update the center of the zoom box map when the base map is clicked.
map.onClick(function(coords) {
  centerZoomBox(coords.lon, coords.lat);
});
var centerZoomBox = function(lon, lat) {
  instructions.style().set('shown', false);
  zoomBox.style().set('shown', true);
  zoomBox.setCenter(lon, lat, 8);
  var bounds = zoomBox.getBounds();
  var w = bounds[0], e = bounds [2];
  var n = bounds[1], s = bounds [3];
  var outline = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]],
  ]);
};
// Add a label and the zoom box map to the default map.
var instructions = ui.Label('Select a scenario and click the map to see an area in detail.', {
  stretch: 'both',  textAlign: 'center',backgroundColor: '#d3d3d3'
});
var panelz = ui.Panel({
  widgets: [zoomBox, instructions],
  style: { position: 'top-right', height: '250px',width: '250px'}});
map.add(panelz);
var legend = ui.Panel({ style: {position: 'bottom-left',padding: '8px 15px'}});
map.add(legend)
// LOAD AND FILTER MAP
var paleteria = [mipaleta[0], mipaleta[1], mipaleta[2], mipaleta[3],mipaleta[4]];
var change_vis = function (f1,f2,message) {
  if (vrb.getValue()=== null){
    message.clear()
    message.add(ui.Label('Please Select a variable ...'));  
  }
  var item0=Opt0(Options0.getValue()); /////////////////////////////////////////////////////////////
  var SLR=ee.FeatureCollection("users/santiagoduarte09/SLR/ESL_"+vrb.getValue().substr(19,40)+"_Baseline");
  var id='RP_'+f1+'_'+f2; 
  if (item0 == 'RCP 4.5'){
    SLR=ee.FeatureCollection("users/santiagoduarte09/SLR/ESL_"+vrb.getValue().substr(19,40)+"_RCP45");
  } else if (item0 == 'RCP 8.5'){
    SLR= ee.FeatureCollection("users/santiagoduarte09/SLR/ESL_"+vrb.getValue().substr(19,40)+"_RCP85");
  } 
  // Min and Max Aprox from Feature
  var minmax= SLR.reduceColumns({reducer: ee.Reducer.minMax(),selectors: [id]}).values();
  var minf = ee.Number(minmax.get(1));var maxf = ee.Number(minmax.get(0));   
  // Select function
  var SLR_selected = SLR.select(id);
  // Increase Points Size  
  var features = SLR_selected.map(function (f) {return f.buffer(30000)});
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  var back_paint = empty.paint({featureCollection: features,color: id});
  var styled = back_paint.visualize({min: minf, max: maxf, palette: mipaleta });
  // ADD AND REMOVE LAYERS
  // map
  removeLayer('Sea Level Rise',map);
  map.addLayer(styled, {}, 'Sea Level Rise');
  // Zoom Box
  var features2 = SLR_selected.map(function (f) {return f.buffer(3000)});
  var back_paint2 = empty.paint({featureCollection: features2,color: id});
  var styled2 = back_paint2.visualize({min: minf, max: maxf, palette: mipaleta });
  removeLayer('Sea Level Rise',zoomBox);
  zoomBox.addLayer(styled2, {}, 'Sea Level Rise');
  message.clear()
 // CREATE LEGEND
  //map.remove(3)
  legend.clear()
  var legendTitle = ui.Label({
    value: 'Extreme Sea Level (m)',
    style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0'}});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
      var colorBox = ui.Label({style: { backgroundColor: color, padding: '6px', margin: '0 0 3px 0'}});
      var description = ui.Label({value: name, style: {margin: '0 0 4px 4px'}});
      return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
  };
  var a_min=(maxf.getInfo()-minf.getInfo())*2/5+minf.getInfo()
  var a_med=(maxf.getInfo()-minf.getInfo())*3/5+minf.getInfo()
  var a_max=(maxf.getInfo()-minf.getInfo())*4/5+minf.getInfo() 
  var names =[minf.getInfo().toFixed(0), a_min.toFixed(0), a_med.toFixed(0), a_max.toFixed(0) ,maxf.getInfo().toFixed(0)];
  for (var i = 0; i < 5; i++) {legend.add(makeRow(paleteria[i], names[i]))}
  // INFORMATION ON CLICK
  zoomBox.onClick(function(coords) {
    // Point to Analyze
    inspector.add(ui.Label('Loading'));
    inspector.clear()
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var Locationtext='Lat='+coords.lat.toFixed(2)+'  Lon='+coords.lon.toFixed(2)
    // Define a spatial filter, with distance 50 km and a save distance
    var distFilter = ee.Filter.withinDistance({
       distance: 5000,leftField: '.geo',rightField: '.geo',maxError: 10});  
    var distSaveAll = ee.Join.saveAll({matchesKey: 'points',measureKey: 'distance'});
    var spatialFill = distSaveAll.apply(SLR, point, distFilter); 
    if (spatialFill.size().getInfo()>= 1) { 
      var valor=ee.Number.parse(spatialFill.first().get(id)) 
      var esl = ui.Label({
        value: 'Extreme Sea Level (m): ' + valor.getInfo().toFixed(2),
        style: {stretch: 'horizontal',fontSize: '14px'},
      })
      var hideButton = ui.Button({
      label: 'X',
      onClick: function(){
        inspector.clear();
        inspector.add(ui.Label('Click on the zoom box for information'))},
      style:{color: 'red',position: 'middle-right'}}
      );
      inspector.add(hideButton);
      inspector.add(ui.Label(Locationtext))
      inspector.add(esl)
      var sf=ee.FeatureCollection(spatialFill)
      var chart =  ui.Chart.feature
        .byProperty({
          features: sf,
        })
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Extreme Sea Level',
          hAxis: {
            title: 'Scenarios',
            titleTextStyle: {italic: false, bold: true} ,
            ticks: sf.first().propertyNames()
          },
          vAxis: {
            title: 'Extreme Sea Level (m)',
            titleTextStyle: {italic: false, bold: true}
          }})
          //.setSeriesNames([Locationtext]);
          //.style()
      print(sf);
      inspector.add(chart)
    } else{
      inspector.clear()
      inspector.add(ui.Label(Locationtext));
      inspector.add(ui.Label('Please select a point')); 
    }
    ///////////
  })
  };