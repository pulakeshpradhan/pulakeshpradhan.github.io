//IMPORTS
var extra =    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[34.8385469988856, 7.524395549405837],
                  [34.8385469988856, 4.563988224404203],
                  [36.0030977801356, 4.563988224404203],
                  [36.0030977801356, 7.524395549405837]]], null, false)
            )]
            );
var cover2= ee.Image("projects/nmsu-savannalab-main/assets/cover_esa_40m");
var adminLayers = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2")
var wards = ee.FeatureCollection('projects/nmsu-savannalab-main/assets/kenya_wards')
var countries = ee.FeatureCollection("USDOS/LSIB/2017")
var tree_cov = cover2
//area of interest
var admins = countries.filter(
  ee.Filter.or(
            ee.Filter.eq('COUNTRY_NA','Ethiopia'),
            ee.Filter.eq('COUNTRY_NA','Eritrea'),
            ee.Filter.eq('COUNTRY_NA','Djibouti'),
            ee.Filter.eq('COUNTRY_NA','Somalia'),
            ee.Filter.eq('COUNTRY_NA','Kenya'),
            ee.Filter.eq('COUNTRY_NA','Uganda'),
            ee.Filter.eq('COUNTRY_NA','Burundi'),
            ee.Filter.eq('COUNTRY_NA','Rwanda'),
            ee.Filter.eq('COUNTRY_NA','Tanzania')
            ));
var aoi = admins.union(1)//wards.reduceToImage(['Shape_Are'], ee.Reducer.first())    
//import woody cover data
var tc = tree_cov.select([0],['cover'])
//tc = ee.ImageCollection([tc.clipToCollection(extra),tc.clipToCollection(admins)]).mosaic()
//create viz parameters
var visParams = {min:0,max:100,palette: ['saddlebrown','orange','yellow','green','blue']};
//create legend
var cb = require('users/savannalabnmsu/misc:labeledColorBar_steps')
var bar = cb.makeColorBar(visParams, 'Woody Canopy Cover (%)', 'bottom-center','90%','20%','11px','bold',5)
//function to create pie chart
var pchrt = require('users/savannalabnmsu/misc:createPieChart.js')
///////////////////////////////////////////////UI INTERFACE///////////////////////////////////////////////////////////////////////////////
var changeBaseMap = require('users/savannalabnmsu/misc:removeMapIcons.js')
var map1 = ui.Map().setControlVisibility(false)
var map2 = ui.Map().setControlVisibility(false).setOptions('satellite');
changeBaseMap.removeIcons(map1)
var text = ui.Panel(
  [ui.Label('Woody Canopy Cover for East and Southern Africa',{fontSize: '14px',fontWeight:'bold'}),
  ui.Label('Resolution: 40m',{fontSize: '12px',fontWeight:'bold'}),
  ui.Label('Epoch: 2019-2021',{fontSize: '12px',fontWeight:'bold'})],
  //ui.Label('Link to GEE Asset',{fontSize: '12px',fontWeight:'bold'},'https://code.earthengine.google.com/?asset=projects/ee-slabnmsu-servir-assets/assets/east_africa_canopycover_2020')],
  ui.Panel.Layout.flow('vertical'),
  {width:'300px',  backgroundColor:'#ffffff', position:'top-left'}
  );
var label = ui.Label('basemap/VHR',{position:'bottom-right', fontWeight:'bold'});
var splitPanel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'))
ui.root.widgets().reset([]);
ui.root.widgets().add(splitPanel);
var linker = ui.Map.Linker([map1,map2]);
map1.setCenter(38,2,7)
map2.setCenter(38,2,7)
map1.layers().set(0, ui.Map.Layer(tc,visParams,'tree cover ESA'))
map1.layers().set(1, ui.Map.Layer(wards.style({color:'000000',fillColor:'ffffff00',width:1}),{},'kenya'))
map2.layers().set(0, ui.Map.Layer(wards.style({color:'000000',fillColor:'ffffff00',width:1}),{},'Kenya'))
//map1.layers().set(2, ui.Map.Layer(wards.style({color:'000000',fillColor:'ffffff00'}),{},'kenya wards'))
//map1.layers().set(1, ui.Map.Layer(admins.style({color:'0000ff',fillColor:'ffffff00'}),{},'ADMIN_LAYERS'))
//map2.layers().set(0, ui.Map.Layer(admins.style({color:'0000ff',fillColor:'ffffff00'}),{},'ADMIN_LAYERS'))
text.add(bar)
map1.add(text)
///////////////////////////////////////INSPECTOR PANEL////////////////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width:'100%'},
});
// add sub panels for different information that will be updated upon map click
var inspector0 = ui.Panel();
var inspector1 = ui.Panel();
var inspector2 = ui.Panel();
var inspector4 = ui.Panel();
inspector.add(ui.Label(
  'Click on the map to inspect point and zonal estimates.Ony works for ward areas within Kenya wards.\n'
  +'Swipe and zoom to compare with Google imagery basemap.'
  ,{fontSize: '12px'}));
inspector.add(inspector0);
inspector.add(inspector1);
inspector.add(inspector2);
inspector.add(inspector4);
// Add the panel to the UI
text.add(inspector);
// Set the map cursor to a "crosshair".
map1.style().set('cursor', 'crosshair');
map2.style().set('cursor', 'crosshair');
// function to run when map is clicked
//2 different functions, one prinst nodata when maps are clicked out of bounds
function updatePanels(mp){
  mp.onClick(function(coords){
  })
}
function reportVal(mp){
  mp.onClick(function(coords) {
  //Clear the panels and show a loading message.
  inspector0.clear();
  inspector0.style().set('shown', true);
  inspector0.add(ui.Label('Loading...', {color: 'gray'}));
  inspector1.clear();
  inspector1.style().set('shown', true);
  inspector1.add(ui.Label('Loading...', {color: 'gray'}));
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Loading...', {color: 'gray'}));
  inspector4.clear();
  inspector4.style().set('shown', true);
  inspector4.add(ui.Label('Loading...', {color: 'gray'}));
  // create point using clicked coordinates and center/zoom
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(point.intersects(admins.geometry()))
  map1.centerObject(point, 9.5);
  map2.centerObject(point, 9.5);
  var updatePanel1 = function(){
    inspector0.widgets().set(0,ui.Label('Null/Outside of Kenya Bounds',{fontSize: '12px'}));
    inspector1.widgets().set(0,ui.Label('Null/Outside of Kenya Bounds',{fontSize: '12px'}));
    inspector2.widgets().set(0,ui.Label('Null/Outside of Kenya Bounds',{fontSize: '12px'}));
    inspector4.widgets().set(0,ui.Label('Null/Outside of Kenya Bounds',{fontSize: '12px'}));
   // return ui.Panel([inspector0,inspector1,inspector2,inspector3,inspector4])
  };
  var updatePanel2 = function(){
    //filter admin area instersecting point and display and create labels
    var pointF = ee.FeatureCollection([point]);
    var zone = wards.filterBounds(point);
    var name_d = zone.first().get('ward').getInfo()//name of district;
    var labd = ui.Label('Ward: '+name_d,{fontSize: '12px'});
    map1.layers().set(2, ui.Map.Layer(zone.style({color:'0000ff',fillColor:'00000000'}),{}, 'admin_area'));
    map1.layers().set(3, ui.Map.Layer(pointF.style({color:'0000ff',pointSize:7}),{}, 'clicked point'));
    map2.layers().set(0, ui.Map.Layer(zone.style({color:'0000ff',fillColor:'00000000'}),{}, 'admin_area'));
    map2.layers().set(1, ui.Map.Layer(pointF.style({color:'0000ff',pointSize:7}),{}, 'clicked point'));
    //Compute the woody cover for specific lat/lon at 40m scale
    //also compute average woody/non woody for the admin area
    var sampledPoint1 = tc.reduceRegion(ee.Reducer.mean(), point, 40);
    var pointValue = ee.Number(sampledPoint1.get('cover')).float();
    var areaValWoody = ee.Number(tc.reduceRegion(ee.Reducer.mean(), zone, 1000,null,null,true,1e11).get('cover')).float();
    var areaValNonWoody = ee.Number(100).subtract(areaValWoody).float();
    var values = ee.List([areaValWoody,areaValNonWoody]).getInfo();
    var palette  = ee.List(['green','red']).getInfo();
    var names = ee.List([
                  ee.String('woody').getInfo(),
                  ee.String('non woody').getInfo()
                  ]).getInfo();
    var pieChart = pchrt.createPieChart(names,values,palette,'250px','200px',2);   
    //display coordinates for  selected point 
    inspector0.widgets().set(0,
    ui.Label('lat/lon (40m pixel): ' + coords.lat.toFixed(2) +', '+ coords.lon.toFixed(2),{stretch: 'vertical', fontSize: '12px'}));
    //});
    // Request the corresp. location woody cover value from the server and update inspector panel
    pointValue.evaluate(function(result) {
    inspector1.widgets().set(0,
    ui.Label('% Canopy Cover (40m pixel): ' + result.toFixed(2),{stretch: 'vertical', fontSize: '12px'}));
    });
  // update adminsitravetive zone names
   inspector2.widgets().set(0,labd)
  //area of woody cover for selected admin zone
   inspector4.widgets().set(0,pieChart)
   //return ui.Panel([inspector0,inspector1,inspector2,inspector3,inspector4])
  };
  ee.Algorithms.If(point.intersects(admins.geometry()),updatePanel1(),updatePanel2())
});
}
reportVal(map1);
reportVal(map2);