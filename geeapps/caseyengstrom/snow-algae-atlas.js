var s2sr = ui.import && ui.import("s2sr", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    l8sr = ui.import && ui.import("l8sr", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    terra = ui.import && ui.import("terra", "imageCollection", {
      "id": "MODIS/006/MOD09GA"
    }) || ee.ImageCollection("MODIS/006/MOD09GA"),
    basemap = ui.import && ui.import("basemap", "image", {
      "id": "users/caseyengstrom/algaeMaps/v1s2srNorthAmerica"
    }) || ee.Image("users/caseyengstrom/algaeMaps/v1s2srNorthAmerica"),
    trainingData = ui.import && ui.import("trainingData", "table", {
      "id": "users/caseyengstrom/snowAlgaeAtlas/trainDat/s2/t055"
    }) || ee.FeatureCollection("users/caseyengstrom/snowAlgaeAtlas/trainDat/s2/t055"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -123.77581024169922,
                51.01062701467792
              ],
              [
                -123.76139068603516,
                50.993342953659564
              ],
              [
                -123.73941802978516,
                51.01386705927822
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-123.77581024169922, 51.01062701467792],
          [-123.76139068603516, 50.993342953659564],
          [-123.73941802978516, 51.01386705927822]]]);
/**
 * todo:
 * don't draw chart for large polygon
 * add basemap version to layer name
 * avoid resetting global vars. functional programming
 * add l8, modis (just load map based on date)
 * style panel
 * start and end date textboxes, checkboxes for collections
 * add flexibility for tropics
 */
// var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks'); // for L8
var s2cloudless = require('users/caseyengstrom/tools:s2cloudless')
var s2srClassifier = require('users/caseyengstrom/snowalgae:s2srClassifier')
var maxCC = 80 // whole image max Cloud Cover
var maxMasked = 0.25 // filter out if ROI has more than this fraction masked
// var roi;
var myS2;
var polySizeThresh = 50 // in sq km (approx size of columbia icefield)
// Callback functions ----------------------------------------------
// callback for chart click
// todo: nest to accept ROI, avoid global vars
function loadLayer(x, y, series) {
  var s2Image = myS2
    .filterMetadata('system:time_start', 'equals', x)
    .first()
  print('s2Image', s2Image)  
  var s2RgbLayer = ui.Map.Layer(s2Image, s2srClassifier.rgbVisParam, 'True color');
  var s2ClassLayer = ui.Map.Layer(s2Image.select('CLASSIFICATION'), s2srClassifier.classVisParam, 'Classification', false);
  var s2AlgaeLayer = ui.Map.Layer(s2Image.select('ALGAE'), s2srClassifier.rednessVisParam, 'Algae abundance', false);
  // var s2CloudLayer = ui.Map.Layer(s2Image.select('CLOUD_MASK'), {}, 'cloudmask')
  Map.layers()
    .set(1, s2RgbLayer)
    .set(2, s2ClassLayer)
    .set(3, s2AlgaeLayer);
    // .set(4, s2CloudLayer);
}
// callback for draw or edit polygon
function drawChart() {
  // Get the drawn geometry; it will define the reduction region.
  var roi = drawingTools.layers().get(0).getEeObject(); // update global ROI
  var roiArea = roi.area(100)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on roi area to avoid memory/timeout errors.
  // an area of 1 sq km yields a scale of 20, scale increases linear with area
  print('roiArea', roiArea)
  print('map scale', Map.getScale()) // approx area of pix scale on map, in metres
  // var scale = 100// // ~10000 pixels max-- keep computation easy
  var errorMessage = ui.Label("Error: Selected area too large. Please try again with a smaller polygon.")
  if(roiArea.getInfo() > polySizeThresh*1e6){
    panel.widgets().set(5, errorMessage);
  }else{
    panel.widgets().set(5, ui.Label(""));
  }
  var scale;
  if(speedCheckbox.getValue()){
    scale = roiArea.divide(10000)
  }else{
    scale = 40
  }
  print('scale', scale)
  // If roiArea > polySizeThresh, error message and quit
  // Define months to filter depending on hemisphere
  var centroidlat = ee.Number(roi.centroid().coordinates().get(1))
  var isNorth = centroidlat.gt(0);
  var startMonth = ee.Algorithms.If(isNorth, 6, 12);
  var endMonth = ee.Algorithms.If(isNorth, 8, 2);
  // print('isNorth', isNorth)
  myS2 = s2sr
    .filterBounds(roi)
    .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', maxCC) 
    .map(s2cloudless.addCloudMask)
    .map(s2cloudless.maskedFracInROI(roi))
    .filterMetadata('ROI_MASKED_FRACTION','less_than', maxMasked)
    .map(s2srClassifier.maskAndClass)
  print('myS2', myS2)
  var chart = ui.Chart.image.series({
    imageCollection: myS2.select('ALGAE'),
    region: roi,
    reducer: ee.Reducer.sum(),
    scale: scale,
    xProperty: 'system:time_start'
  }).setOptions({
    title: "Algae abundance",
    hAxis: {title: 'Date'},
    vAxis: {title: 'Sum Red-Green Normalized Difference'}//,
    // series: {0: {color: 'ff0000'}}
  });
  panel.widgets().set(6, chart);
  chart.onClick(loadLayer) 
}
var switchPolygonShown = function(){
  var geomLayer = Map.drawingTools().layers().get(0)
  var isShown = geomLayer.getShown()
  if(isShown){
    geomLayer.setShown(false)
  }else{
    geomLayer.setShown(true)
  }
}
// UI ----------------------------------------------------------
Map.setOptions('SATELLITE') // set the default basemap
Map.setCenter(-124, 52, 5)
var drawingTools = Map.drawingTools();
// Hide the default drawing tools
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPolygon() {
  hidePolygonCheckbox.setValue(true);
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
// Listen for change in polygon, fire callback on change
drawingTools.onDraw(ui.util.debounce(drawChart, 500));
drawingTools.onEdit(ui.util.debounce(drawChart, 500));
// initialize map layers
// Map.centerObject(ee.Geometry.Point([-116.7773, 50.7444]), 14) // bugaboos
Map.addLayer(basemap, s2srClassifier.rednessVisParam, 'Algae distribution (max composite, all years)'); // call instead of Map.addLayer() so we can save basemapLayer as an obj to call again
var title = ui.Label({
  value: "The Snow Algae Atlas v1.0",
  style: {fontSize: '24px', color: '484848'}
})
var step1 = ui.Label("1. Zoom in to snowy regions and explore the distribution of snow algae (red layer)")
var step2 = ui.Label("2. Click the 'Draw polygon' button below and draw a polygon on the map to chart two-year time series for a particular region. Please be patient while the chart loads.")
var drawButton = ui.Button({
  label: 'Draw polygon',
  onClick: drawPolygon,
  style: {margin: '5px 5px 5px 30px'}
})
var speedCheckbox = ui.Checkbox({
  label: "Speed up chart processing (uncheck for higher resolution)",
  value: true,
  onChange: drawChart,
  style: {margin: '5px 5px 5px 30px', fontSize: '10px'}
})
var errorMessagePlaceholder = ui.Label("")
var chartPlaceholder = ui.Label("")
var hidePolygonCheckbox = ui.Checkbox({
  label: 'Polygon visibility (uncheck to hide)',
  value: true,
  onChange: switchPolygonShown,
  style: {margin: '5px 5px 5px 30px', fontSize: '10px'}
}) 
var step4 = ui.Label("4. Click on the time-series chart to view imagery for a given day.")
var step5 = ui.Label("5. Hover over the 'Layers' tab in top right of map screen to toggle layers.")
var step6 = ui.Label("6. Repeat for different regions and areas.")
var note = ui.Label("Currently only available for North America with Sentinel-2, other regions and platforms coming soon!")
var attribution = ui.Label({
  value: "Updated 2021-06-12 by Casey Engstrom",
})
var homepageLink = ui.Label({
  value: "Personal website", 
  targetUrl: "https://caseyengstrom.ca"
})
var emailLink = ui.Label({
  value: "Email/report a bug", 
  targetUrl: "mailto:casey.engstrom@gmail.com"
})
var panel = ui.Panel({style: {width: '500px'}})
  .add(title) // 0
  .add(step1) //1
  .add(step2) //2
  .add(drawButton) // 3
  .add(speedCheckbox) //4
  .add(errorMessagePlaceholder) //5
  .add(chartPlaceholder) //6
  .add(hidePolygonCheckbox) //7
  .add(step4) //8
  .add(step5) //9
  .add(step6) //10
  .add(note) //11
  .add(attribution) //12
  .add(homepageLink)//13
  .add(emailLink)//14
ui.root.add(panel);
    // // determine what collection the image belonds to
    // var id = ee.String(image.get('system:id')).split("/");
    // // get poor quality area (mask = 1)
    // // in the cloud masks, 0 = invalid, hence the need for not()
    // var mask = ee.Algorithms.If(
    //   id.contains("COPERNICUS"), image.select('cloudmask').not(), 
    //   ee.Algorithms.If(
    //     id.contains("LANDSAT"), image.select('cloudmask').not(),
    //     ee.Algorithms.If(id.contains("MODIS"), image.select('cloudmask').not())
    //   )
    // );