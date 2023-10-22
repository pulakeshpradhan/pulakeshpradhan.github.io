var fd = ui.import && ui.import("fd", "table", {
      "id": "users/savannalabnmsu/tunisiaPlots_1"
    }) || ee.FeatureCollection("users/savannalabnmsu/tunisiaPlots_1"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    tree_cov = ui.import && ui.import("tree_cov", "image", {
      "id": "projects/ee-slnmsu-tunisia-peer/assets/tunisia_woody_cover_final"
    }) || ee.Image("projects/ee-slnmsu-tunisia-peer/assets/tunisia_woody_cover_final");
var aoi = countries.filterMetadata('country_na','equals','Tunisia')
print('Classified Image', tree_cov);
//Export.image.toDrive({image:classifiedImage,region:aoi.geometry().bounds(),maxPixels:1e11,scale:40})
//Export.image.toAsset({image:classifiedImage,region:aoi.geometry().bounds(),maxPixels:1e11,scale:40})
//create viz parameters
var visParams = {min:10,max:90,palette: ['saddlebrown','orange','yellow','green']};
//create legend
var createLegend = require('users/savannalabnmsu/misc:colorbar.js')
var legend = createLegend.makeColorBar(visParams, '% Woody Canopy Cover','400px','100px','bottom-left',14);
//print(legend)
///////////////////////////////////////////////UI INTERFACE///////////////////////////////////////////////////////////////////////////////
var changeBaseMap = require('users/savannalabnmsu/misc:removeMapIcons.js')
var map1 = ui.Map().setControlVisibility(true)
var map2 = ui.Map().setControlVisibility(true).setOptions('hybrid');
changeBaseMap.removeIcons(map1)
var chartPanel = ui.Panel(
  [
    ui.Label(
    'Woody cover map of Tunisia',
    { fontSize:'20px', width:'95%',fontWeight:'bold'}),
    ui.Label(
    'Derived at 40m resolution\n'
    +'using satellite indices calibrated with high resolution imagery samples.',
    { fontSize:'14px', width:'95%'}),
    ],
  ui.Panel.Layout.flow('vertical'),
  {width:'25%', height:'100%', backgroundColor:'#ffffff'}
  );
var label = ui.Label('basemap/VHR',{position:'bottom-right', fontWeight:'bold'});
var splitPanel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
  //style: {stretch: 'both'}
});
var linker = ui.Map.Linker([map1, map2]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'))
ui.root.widgets().reset([]);
ui.root.widgets().add(splitPanel);
ui.root.widgets().add(chartPanel);
var linker = ui.Map.Linker([map1,map2]);
map1.addLayer(tree_cov,visParams,'tree cover tunisia')
map1.addLayer({eeObject: fd.style('blue',1), name: 'plots'});
map1.addLayer(aoi.style({color:'ff0000',fillColor:'ffffff00'}),{},'Tunisia')
map1.add(legend)
//map2.add(label)
//map2.addLayer(tree_cov.updateMask(map.lte(1000)),visParams,'tree cover kenya')
//map2.addLayer({eeObject: fdp, name: 'field sites'});
map1.centerObject(aoi,7)
///////////////////////////////////////INSPECTOR PANEL////////////////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width:'45%'},
});
// add sub panels for point labels
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
inspector.add(ui.Label('Click on the map to inspect point value. Swipe to compare with basemap imagery.',{fontSize: '16px'}));
inspector.add(inspector0);
inspector.add(inspector1);
// Add the panel to the UI
chartPanel.add(inspector);
// Set the map cursor to a "crosshair".
map1.style().set('cursor', 'crosshair');
map2.style().set('cursor', 'crosshair');
function reportVal(mp){
  mp.onClick(function(coords) {
  //Clear the panel and show a loading message.
  inspector0.clear();
  inspector0.style().set('shown', true);
  inspector0.add(ui.Label('Loading...', {color: 'gray'}));
  inspector1.clear();
  inspector1.style().set('shown', true);
  inspector1.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the woody cover
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint1 = tree_cov.reduceRegion(ee.Reducer.mean(), point, 40);
  var covValue = ee.Algorithms.If(point.intersects(tree_cov.geometry()),sampledPoint1.get('wcwoodycover'),'Null');
   //display coordinates at selected point 
    inspector0.clear();
    inspector0.add(ui.Label({
     value: 'lat/lon: ' + coords.lat.toFixed(2) +', '+ coords.lon.toFixed(2),
      style: {stretch: 'vertical', fontSize: '16px'}
    }));
  //});
  // Request the corresp. woody cover value from the server and add as label to inspector panels
   covValue.evaluate(function(result) {
    inspector1.clear();
    inspector1.add(ui.Label({
      value: 'Canopy Cover (%): ' + result.toFixed(2),
      style: {stretch: 'vertical', fontSize: '16px'}
    }));
  });
});
}
reportVal(map1);
reportVal(map2);