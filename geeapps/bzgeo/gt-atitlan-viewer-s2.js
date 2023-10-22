////////////////////////////////////////////////////////////////////////////////////////////////
// Exercise: Generate simple User Interface (UI) to display imagery
// Example study area: Lake Atitlan, Guatemala
// based on code from Sulong Zhou and Noel Gorelick
// modified by Kel Markert, SERVIR SCO / UAH
// Last modified: 27 Sept. 2022
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Specify geographic domain for windows
var pt = ee.Geometry.Point([-91.1898, 14.68556]);
var lake = ee.FeatureCollection("projects/servir-amazonia/aoi/gt_atitlan_lake_swbd"),
    lake_ = ee.FeatureCollection("projects/servir-amazonia/aoi/gt_atitlan_lake_swbd_buff300m"),
    ws = ee.FeatureCollection("projects/servir-amazonia/aoi/gt_atitlan_ws");
var roi = lake,
    roi2 = ee.Image().byte().paint({featureCollection:lake_,color:'blue',width:2}),
    roi3 = ee.Geometry.Rectangle(-91.3156, 14.58, -91.0835, 14.78);
////////////////////////////////////////////////////////////////////////////////////////////////
var t = 'system:time_start';
// Specify image collection to be used -> can be changed to another collection (e.g. Landsat-8 SR)
var collection_lake = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterBounds(pt)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
              //.filterDate('2018-01-01','2019-12-31')
              .sort(t, false)
              .map(function(image){var dateStr = ee.Date(image.get('system:time_start')).format();
              return image.clip(roi).set('date',dateStr);});
var collection_full = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterBounds(pt)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
              //.filterDate('2018-01-01','2019-12-31')
              .sort(t, false)
              .map(function(image){var dateStr = ee.Date(image.get('system:time_start')).format();
              return image.clip(ws).set('date',dateStr);});
var collection_lake0 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterBounds(pt);
var collection_lake1 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).filterBounds(pt);
////////////
var ndvi = function(img) {return img.clip(roi).normalizedDifference(['B5','B4']).rename('NDCI').set('system:time_start',img.get('system:time_start'));};
// Chart generation: NDVI
var chart_indices1 = ui.Chart.image.series(collection_lake1.map(ndvi), roi, ee.Reducer.mean(), 30)
            .setOptions({title: "NDCI over Lake Atitlan (2015-), filtered",fontSize: '14px',
            hAxis:{title:'date'},pointSize:5,series:{0:{color:'mediumblue'}}});
var chart_indices2 = ui.Chart.image.series(collection_lake0.map(ndvi), roi, ee.Reducer.mean(), 30)
            .setOptions({title: "NDCI over Lake Atitlan (2015-), unfiltered",fontSize: '14px',
            hAxis:{title:'date'},pointSize:5,series:{0:{color:'navy'}}});
////////////////////////////////////////////////////////////////////////////////////////////////
var baseViz = {min: -169, max: 2367, bands:'B11,B8,B2'};
var startDate = ee.Date.fromYMD(2022, 01, 01);
var numFrames = 23;  // The total number of frames
var windowSize = 5;  // The size of the window
var windowUnit = 'day';  // The units of the window size
// Each frame is associated with an offset in `unit` from `startDate`.
var monthIndexList = ee.List.sequence(0, numFrames - 1);
// Map a function that converts `index` to a composite image.
var monthlyComposites = monthIndexList.map(
  function makeComposite(index) {
    var step = ee.Number(windowSize).multiply(index);
    var frameStart = startDate.advance(step, windowUnit);
    var frameEnd = frameStart.advance(windowSize, windowUnit);
    return collection_lake0.filterDate(frameStart, frameEnd).median().visualize(baseViz).clip(roi3);
  });
var collection = ee.ImageCollection.fromImages(monthlyComposites);
// Visualization and animation parameters.
var params = {
  crs: 'EPSG:3857',
  framesPerSecond: 3,
  region: roi3,
  dimensions: 512,
};
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2: UI DEFINITION
/////////////////////////////////////////
// Display each image in the collection
var imgLayer = null;
var imgLayer2 = null;
var aoiLayer = null;
var imgDates = ee.List(collection_full.aggregate_array('date'));
var imgIds = ee.List(collection_full.aggregate_array('system:index'));
imgIds.evaluate(function(ids) {
  var size = ids.length;
  var showTitle = ui.Label("", {fontWeight: 'bold', color: 'blue'});
  var curIndex = 0;
/////////////////////////////////////////
// Define buttons
  var previous = ui.Button("Earlier", function() {
    curIndex += 1;
    if (curIndex >= size) {curIndex = 0;}
    showTitle.setValue(imgDates.get(curIndex).getInfo());
    showSelectRawImage(ids[curIndex]);});
  var next = ui.Button("Later", function() {
    curIndex -= 1;
    if (curIndex < 0) {curIndex = total - 1;}
    showTitle.setValue(imgDates.get(curIndex).getInfo());
    showSelectRawImage(ids[curIndex]);});
  var buttonPanel = new ui.Panel(
    [next, previous],
    ui.Panel.Layout.Flow('horizontal'));
/////////////////////////////////////////
function showSelectRawImage(key) {
  if (imgLayer !== null) {
    Map.remove(imgLayer);
    Map.remove(imgLayer2);
    //Map.remove(aoiLayer);
  }
  var image2 = ee.Image(collection_full.filter(ee.Filter.eq("system:index", key)).first());
  var image1 = ee.Image(collection_lake.filter(ee.Filter.eq("system:index", key)).first());
  //imgLayer2 = Map.addLayer(image2, {bands: ['B8A', 'B5', 'B3'], min: -169, max: 2367},key);
  //imgLayer = Map.addLayer(image1, {bands: ['B8A', 'B5', 'B3'], min: 153, max: 678},key);
  imgLayer2 = Map.addLayer(image2, {bands: ['B11', 'B8', 'B2'], min: -169, max: 2367},key);
  imgLayer = Map.addLayer(image1, {bands: ['B11', 'B8', 'B2'], min: -295, max: 1160},key);
  //aoiLayer = Map.addLayer(roi2, {palette: "cyan"},'Lake Atitlan');
}
  showTitle.setValue(imgDates.get(curIndex).getInfo());
  showSelectRawImage(ids[curIndex]);
/////////////////////////////////////////
var insert_logo = ui.Thumbnail({image:ee.Image("users/servirbz/compil_imagery/_logos/logo_uah_blue"),params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'223px',height:'100px'}});
/////////////////////////////////////////
// UI ITEMS
var main = ui.Panel({
    widgets: [
      ui.Label('Sentinel-2 explorer: Lake Atitlan', {fontWeight: 'bold', fontSize: '18px', color: 'mediumblue'}), // UI title
      ui.Label("date / time of image shown: ", {fontWeight: 'bold'}),
      showTitle,
      buttonPanel,
      //chart_indices1,
      //chart_indices2,
      ui.Thumbnail(collection, params),
      insert_logo,
      ui.Label('credit: contains modified European Space Agency / Copernicus Sentinel data', {fontSize: '14px'})
    ],
    style: {width: '350px', padding: '8px'}
  });
  ui.root.insert(0, main);});
// END OF UI DEFINITION
////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: OTHER VIEWER PARAMETERS
Map.setOptions('TERRAIN');
Map.centerObject(pt,13);
//////////////////////////////////////////// END ///////////////////////////////////////////////