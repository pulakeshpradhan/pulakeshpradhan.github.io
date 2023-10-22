var SL = ui.import && ui.import("SL", "image", {
      "id": "users/yuhjulio/logos/SL_logo_new"
    }) || ee.Image("users/yuhjulio/logos/SL_logo_new"),
    nmsu = ui.import && ui.import("nmsu", "image", {
      "id": "users/yuhjulio/logos/nmsu_logo"
    }) || ee.Image("users/yuhjulio/logos/nmsu_logo"),
    nasa = ui.import && ui.import("nasa", "image", {
      "id": "users/yuhjulio/logos/nasa_logo"
    }) || ee.Image("users/yuhjulio/logos/nasa_logo"),
    CH = ui.import && ui.import("CH", "image", {
      "id": "NASA/JPL/global_forest_canopy_height_2005"
    }) || ee.Image("NASA/JPL/global_forest_canopy_height_2005"),
    cov_bm = ui.import && ui.import("cov_bm", "image", {
      "id": "users/savannalabnmsu/treecover_data/Sen_cover_bm_filled"
    }) || ee.Image("users/savannalabnmsu/treecover_data/Sen_cover_bm_filled"),
    servir = ui.import && ui.import("servir", "image", {
      "id": "users/savannalabnmsu/servir_logo"
    }) || ee.Image("users/savannalabnmsu/servir_logo");
var img  = cov_bm.toFloat();
print(img)
//define bands to be used
var cover = img.select(0);
var biomass = img.select(1);//.updateMask(CH.select(0).resample('bicubic').gt(0));
//Export.image.toDrive({
//  image: cover.addBands(biomass),
//  maxPixels:1e11,
//  region: img.geometry().bounds(),
//  scale:40
//});
//vis parameters
var visParams1= {min:0,max:100,palette: 'white,green'};
var visParams2= {min:0,max:50000,palette: 'white,saddlebrown'};
// A function to construct a legend 
function makeLegend(vis, position) {
  var lat = ee.Image.pixelLonLat().select('longitude');
  var gradient = lat.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,10', dimensions:'300x30'}, 
    style: {padding: '0px'}
  });
  return ui.Panel({
    widgets: [
      ui.Label(String(vis['min']), {color:'black', fontSize:'18px', fontWeight: 'bold',backgroundColor: 'ffffff'}), 
      thumb,
      ui.Label(vis['max'],{color:'black',fontSize:'18px', fontWeight: 'bold',backgroundColor: 'ffffff'})],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {position:position, width: '427px', Height: '55px', backgroundColor: 'ffffff'}
});
}
var legend1 = makeLegend(visParams1, 'bottom-left');
var legend2 = makeLegend(visParams2, 'bottom-right');
///////////////////////////////////////////////CONFIGURE UI INTERFACE///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * Set up the maps and control widgets
 */
// Create the left map and have it display canopy cover
var leftMap = ui.Map();
leftMap.setControlVisibility( {all: false, zoomControl: true, mapTypeControl: false, scaleControl: true});
leftMap.addLayer(cover,visParams1);
var label1 = ui.Label('Canopy Cover (%)', {fontSize:'24px', fontWeight: 'bold', position:'middle-left'});
leftMap.add(label1);
leftMap.add(legend1);
leftMap.setOptions('hybrid');
// Create the right map, and have it display biomass
var rightMap = ui.Map();
rightMap.setControlVisibility( {all: false, zoomControl: true, mapTypeControl: false, scaleControl: true});
rightMap.addLayer(biomass,visParams2);
var label2 = ui.Label('Woody Biomass (Kg/ha)', {fontSize:'24px', fontWeight: 'bold', position:'middle-right'});
rightMap.add(label2);
rightMap.add(legend2);
rightMap.setOptions('hybrid');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-14, 14, 8);
// reset UI and add main panels
var toolPanel = ui.Panel([], 'flow', {width: '25vw', backgroundColor:'black', stretch:'vertical'});
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.widgets().reset([toolPanel]);
ui.root.widgets().add(splitPanel);
// Add a title and some explanatory text to the tool panel
var header1 = ui.Label('Woody Vegetation Mapping in Tropical Drylands', {fontSize: '32px', color: 'green', backgroundColor:'black'});
//var header2 = ui.Label('Description', {fontSize: '24px', color: 'white', backgroundColor:'black'});
var text1 = ui.Label(
    "A demo of woody resource mapping in African savannas using Google Earth Engine. Radar backscatter and optical reflectance metrics serve as predictors of percent canopy cover in a random forest model, \n"
    +"while a generalized allometric relationship between biomass/cover and gridded canopy height is used to estimate aboveground wood biomass in kg/ha.\n"
    +"Prototype results shown are for Senegal in West Africa using 2015-2017 Copernicus Sentinel data and 2005 canopy height derived from the IceSat-1 space-borne lidar mission (Simard et al., 2011, doi:10.1029/2011JG001708).",
    {fontSize: '16px', color:'white', backgroundColor:'black'}
    );
var text2 = ui.Label(   
    "Disclaimer:",
    {fontSize: '18px', color:'yellow', backgroundColor:'black'}
    );
var text3 = ui.Label(
    "Biomass estimates are a work in progress and are based on circa 2005 canopy height estimates.\n"
    +"Efforts are underway to derive newer height estimates using more recently acquired data from the IceSat-2 and GEDI missions.",
    {fontSize: '16px', color:'white', backgroundColor:'black'}
    );
var link1 = ui.Label(
    'Related Publication',
    {fontSize: '18px', color: 'white', backgroundColor:'black'},
    'https://www.frontiersin.org/articles/10.3389/fenvs.2020.00004/abstract'
    );
var link2 = ui.Label(
    'Other SERVIR West Africa Applications',
    {fontSize: '18px', color: 'white', backgroundColor:'black'},
    'https://savannalabnmsu.users.earthengine.app/'
    );
var link3 = ui.Label(
    'NMSU Savannalab website',
    {fontSize: '18px', color: 'white', backgroundColor:'black'},
    'https://savannalab.nmsu.edu/'
    );
var text4 = ui.Label(
    'Pixel Resolution: 40 meters',
    {fontSize: '16px', color: 'white', backgroundColor:'black'}
    );
var checkbox = ui.Checkbox({// visibility checkbox and an opacity slider.
  label: 'Opacity',
  value: true,
  style: {fontSize: '18px', color: 'white', backgroundColor:'black'},
  onChange: function(checked) {
    leftMap.layers().get(0).setShown(checked);
    rightMap.layers().get(0).setShown(checked);
    }
});
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style:{width:'200px', height: '25px', stretch:'both'}
});
opacitySlider.onSlide(function(value) {
    leftMap.layers().get(0).setOpacity(value);
    rightMap.layers().get(0).setOpacity(value);
  });
// create panel for opacity and select tools and add to toolPanel
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('vertical'), {backgroundColor:'black'});
var body = ui.Panel(
    [header1, text1,text2,text3,link1,link2,link3,text4, viewPanel], 'flow', {height:'80%',backgroundColor:'black'});
toolPanel.add(body);
//function add logos
function makeThumb(image, w, h, bgc, pdg) {
  return ui.Thumbnail({ 
    image: image,
    style: 
    {width: w, height:h, backgroundColor:bgc, padding:pdg}
  });
}
var params = {bands:['b1','b3','b3'], palette: ['blue','green','red'],forceRgbOutput:true};
var serv_logo = makeThumb(servir,'200px','60px','white','10px');
//print(serv_logo)
var nasa_logo = makeThumb(nasa.unmask(0),'100px','100px','black');
var nmsu_logo = makeThumb(nmsu,'100px','100px','black', '10px');
var sl_logo = makeThumb(SL,'100px','100px','black', '10px');
var blank =  ui.Panel({style:{width:'50px', height:'50px', backgroundColor:'#000000'}});
//logo panel
var logo_panel = ui.Panel([nasa_logo,nmsu_logo,sl_logo,blank,serv_logo],
                          ui.Panel.Layout.flow('horizontal',true),
                          {width:'80%', height: '20%', backgroundColor:'#000000'}
                          );
toolPanel.add(logo_panel);
///////////////////////////////INSPECTOR PANEL////////////////////////////////////////////////////
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
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
inspector.add(ui.Label('Click on map to inspect value'));
inspector.add(inspector0);
inspector.add(inspector1);
inspector.add(inspector2);
// Add the panel to the UI
body.add(inspector);
// Set the map cursor to a "crosshair".
leftMap.style().set('cursor', 'crosshair');
rightMap.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
function reportVal(mp){
  mp.onClick(function(coords) {
  //Clear the panel and show a loading message.
  inspector0.clear();
  inspector0.style().set('shown', true);
  inspector0.add(ui.Label('Loading...', {color: 'gray'}));
  inspector1.clear();
  inspector1.style().set('shown', true);
  inspector1.add(ui.Label('Loading...', {color: 'gray'}));
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the woody cover/biomass value at clicked location
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint1 = cover.reduceRegion(ee.Reducer.mean(), point, 40);
  var sampledPoint2 = biomass.reduceRegion(ee.Reducer.mean(), point, 40);
  var covValue = ee.Algorithms.If(point.intersects(cov_bm.geometry()),sampledPoint1.get('canopy_cover'),'Null');
  var bmValue = ee.Algorithms.If(point.intersects(cov_bm.geometry()),sampledPoint2.get('biomass'),'Null');
  //var covValue = sampledPoint.get('predicted_RF');
  //var bmValue = sampledPoint.get('bm_RF');
 //display coordinates at selected point 
    inspector0.clear();
    inspector0.add(ui.Label({
     value: 'lat/lon: ' + coords.lat.toFixed(2) +', '+ coords.lon.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  //});
  // Request the corresp. woody cover value from the server and add as label to inspector panels
   covValue.evaluate(function(result) {
    inspector1.clear();
    inspector1.add(ui.Label({
      value: 'Canopy Cover (%): ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  });
  // do same for biomass value
   bmValue.evaluate(function(result) {
    inspector2.clear();
    inspector2.add(ui.Label({
      value: 'Biomass (Kg/ha): ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
   });
});
}
reportVal(leftMap);
reportVal(rightMap);