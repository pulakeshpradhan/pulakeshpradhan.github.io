var ndvi = ee.ImageCollection("MODIS/006/MOD13Q1"),
    et = ee.ImageCollection("MODIS/006/MOD16A2"),
    soilmoisture = ee.ImageCollection("NASA_USDA/HSL/SMAP_soil_moisture"),
    chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
//--------
//ndvi: 16days
//et: 8days
//soilmoisture: 3days
//chirps:1days
// filter the country
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
var country_names = ['Uganda'];
var myCountry = countries.filter(ee.Filter.inList('Country', country_names));
var aoi = myCountry.geometry();
//Filter date and collection
var startDate = '2018-01-01'
var endDate = '2018-12-31'
//Collection
var ndvi = ndvi.filterDate(startDate,endDate).sort('system:time_start',false).select('NDVI').first().clip(aoi)
var et = et.filterDate(startDate,endDate).sort('system:time_start',false).select('ET').first().clip(aoi)
var soilmoisture = soilmoisture.filterDate(startDate,endDate).sort('system:time_start',false).select('ssm').first().clip(aoi)
var chirps =  chirps.filterDate(startDate,endDate).sort('system:time_start',false).select('precipitation').first().clip(aoi)
//Date images
var date_ndvi = ndvi.date().format('YYYY-MM-dd')
var date_et = et.date().format('YYYY-MM-dd')
var date_sm = soilmoisture.date().format('YYYY-MM-dd')
var date_cp = chirps.date().format('YYYY-MM-dd')
// Collection array
var images = [ndvi,et,soilmoisture,chirps]
//Min Max precipitation current value
// var ndvi_rescale = ndvi.multiply(0.0001)
var minMax_ndvi = ndvi.reduceRegion(ee.Reducer.percentile([0, 100])).values()
var min_ndvi = ee.Number(minMax_ndvi.get(0))
var max_ndvi = ee.Number(minMax_ndvi.get(1))
var minMax_et = et.reduceRegion(ee.Reducer.percentile([0, 100])).values()
var min_et = (ee.Number(minMax_et.get(0))).int()
var max_et = (ee.Number(minMax_et.get(1))).int()
var minMax_sm = soilmoisture.reduceRegion(ee.Reducer.percentile([0, 100])).values()
var min_sm = (ee.Number(minMax_sm.get(0))).int()
var max_sm = (ee.Number(minMax_sm.get(1))).int()
var minMax_cp = chirps.reduceRegion(ee.Reducer.percentile([0, 100])).values()
var min_cp = (ee.Number(minMax_cp.get(0))).int()
var max_cp = (ee.Number(minMax_cp.get(1))).int()
var viz_ndvi = {min: min_ndvi.getInfo(), max: max_ndvi.getInfo(), palette: ['FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401','056201', '004C00', '023B01', '012E01', '011301']};
var viz_et = {min: min_et.getInfo(), max: max_et.getInfo(), palette: ['f89800','b9ff2d','4effda','41bfff','2a46fd']};
var viz_sm = {min: min_sm.getInfo(), max: max_sm.getInfo(), palette: ['#f9bf11', '#fae41f', '#ddef26','7bbc1f','21861a','37c187','50fdf9','3cabfe','2935fd','1f00d8','13009d','0e0363']};
var viz_cp = {min: min_cp.getInfo(), max: max_cp.getInfo(), palette: ['#c6dbef', '#9ecae1', '#6baed6','4292c6','2171b5','084594']};
// print (min_et)
// Map.addLayer(et,viz_et,'ET')
var vis = [viz_ndvi,viz_et,viz_sm,viz_cp];
var NAMES = [
  'NDVI ' + date_ndvi.getInfo(),
  'ET '+ date_et.getInfo(),
  'SOIL MOISTURE ' + date_sm.getInfo(),
  'PRECIPITATION '+ date_cp.getInfo()
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name,index) {
  var map = ui.Map();
  map.add(ui.Label({value:name,style:{fontWeight:'bold' ,backgroundColor: '#bdbdbd' ,position:'top-left'}}));
  map.addLayer(images[index], vis[index], name);
  map.setControlVisibility(true);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel([
    ui.Panel([maps[0],maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2],maps[3]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Create a title.
var title = ui.Label('NDVI, SOIL MOISTURE, EVAPOTRANSPIRATION, PRECIPITATION NEARLY TIME', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px',
  color: 'FF0000'
});
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps to Quang Son.
maps[0].centerObject(aoi,6)
//---------------------------------------------
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
maps[0].style().set('cursor', 'crosshair');
maps[1].style().set('cursor', 'crosshair');
maps[2].style().set('cursor', 'crosshair');
maps[3].style().set('cursor', 'crosshair');
function onMapClick(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) 
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);            
  var ndviMean = ndvi.multiply(0.0001).reduce(ee.Reducer.mean());
  var ndviPoint = ndviMean.reduceRegion(ee.Reducer.mean(), point, 30);      
  var ndviValue = ndviPoint.get('mean');
  //ET
  var etMean = et.reduce(ee.Reducer.mean());
  var etPoint = etMean.reduceRegion(ee.Reducer.mean(), point, 30);      
  var etValue = etPoint.get('mean');  
  //SM
  var smMean = soilmoisture.reduce(ee.Reducer.mean());
  var smPoint = smMean.reduceRegion(ee.Reducer.mean(), point, 30);      
  var smValue = smPoint.get('mean');  
  //CHIRP
  var cpMean = chirps.reduce(ee.Reducer.mean());
  var cpPoint = cpMean.reduceRegion(ee.Reducer.mean(), point, 30);      
  var cpValue = cpPoint.get('mean');   
  maps[0].add(ui.Label(ndviValue.getInfo().toFixed(1)));
  maps[1].add(ui.Label(etValue.getInfo().toFixed(1)));
  maps[2].add(ui.Label(smValue.getInfo().toFixed(1)));
  maps[3].add(ui.Label(cpValue.getInfo().toFixed(1)));
  maps[0].layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  maps[1].layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  maps[2].layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  maps[3].layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
}
// Register a callback on the default map to be invoked when the map is clicked.
maps[0].onClick(onMapClick);
maps[1].onClick(onMapClick);
maps[2].onClick(onMapClick);
maps[3].onClick(onMapClick);