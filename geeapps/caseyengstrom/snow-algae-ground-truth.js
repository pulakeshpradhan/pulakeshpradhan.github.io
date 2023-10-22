var s2sr = ui.import && ui.import("s2sr", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    glaciers = ui.import && ui.import("glaciers", "table", {
      "id": "GLIMS/current"
    }) || ee.FeatureCollection("GLIMS/current"),
    algaeMap = ui.import && ui.import("algaeMap", "image", {
      "id": "users/caseyengstrom/algaeMaps/v1s2srNorthAmerica"
    }) || ee.Image("users/caseyengstrom/algaeMaps/v1s2srNorthAmerica"),
    trainingData = ui.import && ui.import("trainingData", "table", {
      "id": "users/caseyengstrom/snowAlgaeAtlas/trainDat/s2/t055"
    }) || ee.FeatureCollection("users/caseyengstrom/snowAlgaeAtlas/trainDat/s2/t055"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// citizen science points
/** 
 * todo
 * - exit from computation if area too large
 * - speed up ROI cloud filter-- clip to ROI to apply cloudmasks?
 * - improve classifier--use ratios?
 * - reduce to vectors, put random points in side vectors. the random points miss a lot... or just reduce the grid spacing...
 * - add international basemaps of algae composite
 * - button to download points w imageList (to my google drive, use coords as primary key)
 *    , or maintain imageList property in Gaia? (also ask about the username being added)
 * - better title. Update slug by making a new app, del old
 * - decide params for search radius, and for point density
 *      - narrower radius, might miss the area they hike at
 *      - more points, might actually be closer to their intended path
 *      - too many points, they might get overwhelmed with the near points and not visit as many
 * - should functions be declared with var? ask on stackex
 * - target on screen, -- on map move, reset target. 
 *  * - add checkbox option to include glacier/lake/steep points
 *  imageList: problem, if 2 images in last n days stacked one on top, will return one image that
 *     was not actually used to generate the points 
 */
var s2cloudless = require('users/caseyengstrom/tools:s2cloudless')
var s2srClassifier = require('users/caseyengstrom/snowalgae:s2srClassifier')
// cloud filtering params
var maxCC = 40 // whole image max Cloud Cover, preliminary filter
// var maxMasked = 0.2 // filter out if ROI has more than this fraction masked
var eeNow = ee.Date(Date.now());
// var eeNow = ee.Date('2020-08-01'); // for testing
var startDate = eeNow.advance(-30, 'day');
// max allowable size of user-drawn polygon
var polySizeThresh = 50 // in sq km (approx size of columbia icefield)
// Functions --------------------------------------------
// make random points within an ROI
var myMakePoints = function(roi){
  var cellSize = 80 // m, the side of the grid cells in which to make points (ie spaced every _, on average)
  var seed = 1
  // Generate a random image of integers in Albers projection at the specified cell size.
  var proj = ee.Projection("EPSG:5070").atScale(cellSize)
  var cells = ee.Image.random(seed).multiply(1000000).int().clip(roi).reproject(proj)
  // Generate another random image and select the maximum random value 
  // in each grid cell as the sample point.
  var random = ee.Image.random(seed).multiply(1000000).int()
  var maximum = cells.addBands(random).reduceConnectedComponents(ee.Reducer.max())
  // Find all the points that are local maximums.
  var points = random.eq(maximum).selfMask().clip(roi) // this is an image
  var samples = points.reduceToVectors({
    reducer: ee.Reducer.countEvery(), 
    geometry: roi,
    crs: proj.scale(1/16, 1/16), // random, so it dosen't matter they won't overlay the image points perfectly
    geometryType: "centroid", 
    maxPixels: 1e9
  })
  return samples;
}
// limit number of blue points to equal red points
var limitNumPoints = function(points){
  print(' all points', points)
  var myAlgaePoints = points
    .filterMetadata('IS_ALGAE', 'equals', 1)
    .sort('random')
    .limit(100) // max algae points
  var algaePointsSize = myAlgaePoints.size()
  var limitedOtherPoints = points
    .filterMetadata('IS_ALGAE', 'equals', 0)
    .sort('random')
    .limit(algaePointsSize)
  return myAlgaePoints.merge(limitedOtherPoints)
} // returns at most 200 points, always returns equal number of blue and red points
// function to conditionally set properties of feature
var addPointProperties = function(f){ // pass imageList to set as attribute
  var id = ee.Number(f.get('random')).multiply(1000).int() // 3 digit UID
  var klass = f.get("IS_ALGAE"); // 1 if algae, 0 if other
  // properties
  var colorList = ee.List(['0000ff', 'ff0000']); // class 0 should be blue, class 1 should be red
  // var titleList = ee.List(['Untitled ', 'predAlgae']);
  var iconList = ee.List(['blue-pin-down', 'red-pin-down']);
  // use klass as index for property lists
  return f.set({
    style: {color: colorList.get(klass)},
    title: ee.String('redSnow').cat(id), // add uid for user, and title for filtering/reminder what they are
    icon: iconList.get(klass)
  }); 
}
// do this on button click
var searchArea = function(){
  var roi = drawingTools.layers().get(0).getEeObject(); // update global ROI 
  var roiArea = roi.area(100)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  roiArea.evaluate(function(result){
    if(result > polySizeThresh*1e6){
      errorMessagePlaceholder.setValue("Error: Selected area too large. Please try drawing a smaller polygon.");
      imageDateLabel.setValue("Date of most recent cloud-free image: NA")
      pointCountLabel.setValue("Points in area: NA")
    }else{
      errorMessagePlaceholder.setValue("");
      imageDateLabel.setValue("Date of most recent cloud-free image: Loading...")
      pointCountLabel.setValue("Points in region: Loading...")
    }
  })
  var myS2 = s2sr
    .filterBounds(roi)
    .filterDate(startDate, eeNow)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', maxCC) 
  print('myS2, non specific cloud filters', myS2)
  // add cloud masks
  myS2 = myS2
    .map(s2cloudless.addCloudMask) // add cloudmask band--speed up by just computing for ROI?
  print('cloudmasks added', myS2)
  // // Slow!
  // myS2 = myS2
  //   .map(s2cloudless.maskedFracInROI(roi))
  //   .filterMetadata('ROI_MASKED_FRACTION','less_than', maxMasked)
  // print('collection (no clouds in ROI)', myS2)
  // select most recent image (PROBLEM: if they select area on margin of image)
  var image = myS2
    .sort('system:time_start', false) 
    .first() // get the most recent image
  var imageDate = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd')
  imageDate.evaluate(function(result){
    imageDateLabel.setValue("Date of most recent cloud-free image: " + result)
  })
  var rgbLayer = ui.Map.Layer(image, s2srClassifier.rgbVisParam, 'Satellite image');
  Map.layers().set(1, rgbLayer) 
  // add bands to image
  image = s2srClassifier.addRedSnowMask(image)
  image = s2srClassifier.addClassBand(image) 
  var classLayer = ui.Map.Layer(image.select('CLASSIFICATION'), s2srClassifier.classVisParam, 'Classification', false);
  var algaeLayer = ui.Map.Layer(image.select('ALGAE'), s2srClassifier.rednessVisParam, 'Algae (predicted)', false);
  Map.layers() 
    .set(2, classLayer) 
    .set(3, algaeLayer)
  var points = myMakePoints(roi) // returns evenly spaced points within the red region
  print("n total points", points.size())
  var classifiedPoints = image
    .select('CLASSIFICATION') // masked pixels will not be assigned points
    .eq(1)                // boolean image
    .rename('IS_ALGAE')
    .sampleRegions({ 
      collection: points,
      scale: 10,
      geometries: true 
    })
    .randomColumn()                    
  // returns FC, with boolean property 'IS_ALGAE'
  print("n classified points", classifiedPoints.size())
  classifiedPoints = limitNumPoints(classifiedPoints)
  var styledPoints = classifiedPoints.map(addPointProperties);
  print('styledPoints.first()', styledPoints.first())
  // add points to map
  var pointLayer = ui.Map.Layer(styledPoints.style({styleProperty: "style"}), {}, "Points to visit")
  Map.layers().set(4, pointLayer)
  // report n points in panel
  var nPtsFound = classifiedPoints.size()
  nPtsFound.evaluate(function(result){
    pointCountLabel.setValue("Points in area: " + result)
  })
  // update the download link
  var url = styledPoints
    .select('title', 'icon') // only choose attributes that will show up on Gaia
    .getDownloadURL({
      format: "json",
      filename: "Snow_algae_pts_"+imageDate.getInfo(),
      callback: function(result){downloadLink.setUrl(result)}
    });
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
// Panel --------------------------------------------------
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
drawingTools.onDraw(ui.util.debounce(searchArea, 500));
drawingTools.onEdit(ui.util.debounce(searchArea, 500));
Map.setCenter(-124, 52, 5)
// Map.centerObject(ee.Geometry.Point([-116.7773, 50.7444]), 14) // bugaboos
// Map.centerObject(ee.Geometry.Point([-117.43417, 51.23993]), 14) // perley rock
// Map.centerObject(ee.Geometry.Point([-121.69197, 48.85489]), 14) // bagley lakes
Map.addLayer(algaeMap, s2srClassifier.rednessVisParam, "Previous years snow algae"); // layer 0
//0
var title = ui.Label({
  value: "Snow Algae Atlas Point Finder v1.0",
  style: {fontSize: '24px', color: '484848'}
  })
//1
var subtitle = ui.Label({
  value: "Part of the Living Snow Project",
  style: {fontSize: '18px', color: '484848'}
}).setUrl("https://wp.wwu.edu/livingsnowproject/") // set url to project homepage
//2
var stepOne = ui.Label("1. Use the search box at the top of this page \
  to center the map on the mountain region you will be visiting, or browse \
  the basemap to locate bloom sites from previous years \
  (zoom in to see this layer).")
//3
var stepTwo = ui.Label("2. Click 'Draw Polygon' button below and draw a shape \
  around your region of interest. Please be patient while \
  the map loads the most recent cloud-free image for your region.")
//4
var searchButton = ui.Button({
  label:'Draw polygon',
  onClick: drawPolygon,
  style: {margin: '5px 5px 5px 30px'}
});
//5
var errorMessagePlaceholder = ui.Label({
  value: "",
  style: {margin: '5px 5px 5px 30px', color: 'red'}
})
//6 
var hidePolygonCheckbox = ui.Checkbox({
  label: 'Show polygon (uncheck to hide)',
  value: true,
  onChange: switchPolygonShown,
  style: {margin: '5px 5px 5px 30px'}
})
//7
var imageDateLabel = ui.Label({
  value: 'Date of most recent cloud-free image: NA',
  style: {margin: '5px 5px 5px 30px'}
}); 
//8
var pointCountLabel = ui.Label({
  value: "Points in region: NA",
  style: {margin: '5px 5px 5px 30px'}
}); 
//9
var stepThree = ui.Label("3. If the algorithm finds points, click the Download \
  link below to download the points so you can navigate to the field. \
  If no points were found, try searching a different area. In the 'Layers' menu, \
  click the Classification layer, and draw a new polygon around any coloured areas \
  of the map to generate new points. If you really want to find some snow algae, \
  you can explore the Predicted Algae layer.")
//10
// Download link (default is just a unlinked label, becomes active with on click Get Points)
var downloadLink = ui.Label({
  value: 'Download points',
  style: {margin: '5px 5px 5px 30px'}
});
//11
var note = ui.Label("Note: not all locations and dates will find points, \
  e.g. due to cloud cover, or lack of snow. Check back in a few days, \
  or try searching a different location.")
//12
var projectWebsiteLink = ui.Label({
  value: 'Please visit the project website for further instructions.',
  targetUrl: "https://wp.wwu.edu/livingsnowproject/"
})
//13
var contact = ui.Label({
  value: "Email/report a bug",
  targetUrl: "mailto:cengstro@sfu.ca"
})
var panel = ui.Panel({style: {width: '400px'}})
  .add(title) //0
  .add(subtitle)//1
  .add(stepOne)//2
  .add(stepTwo)//3
  .add(searchButton)//4
  .add(errorMessagePlaceholder)//5
  .add(hidePolygonCheckbox)//6
  .add(imageDateLabel)//7
  .add(pointCountLabel)//8
  .add(stepThree)//9
  .add(downloadLink) //10
  .add(note)//11
  .add(projectWebsiteLink)//12
  .add(contact)//13
ui.root.add(panel);
// //code to add glacier filter
// var filterOutDangerPoints = true;
// var checkbox = ui.Checkbox("Check to include sites overlying technical glacier terrain (not reccommended)", false)
// checkbox.onChange(function(checked){
//     if(checked){filterOutDangerPoints = false }else{ filterOutDangerPoints = true}
//     searchArea();
//   })
// // in searchArea()
//   if(filterOutDangerPoints){
//     var myGlaciers = glaciers.filterBounds(roi).geometry(100)  
//     var roiNoGlaciers = roi.difference(myGlaciers, 100)
//     styledPoints = styledPoints.filterBounds(roiNoGlaciers)
//   }
//   .add(checkbox) 
// code to make recent image mosaic
  // var mosaic = myS2.sort('system:time_start')
  //   .map(function(i){
  //     var dateImage = i.metadata('system:time_start', 'date');
  //     return i.addBands(dateImage)
  //   })
  //   .qualityMosaic('date')
    // .set('PRODUCT_ID_LIST', imageList)
// reduce to Vectors within classified region
  // // faster with or wout this? could just use old roi
  // var redROI = mosaicPlusClass
  //   .select('RED_SNOW_MASK')
  //   .reduceToVectors({scale: 30, geometry: roi}) // for faster speed
//  // var imageList = myS2.aggregate_array('PRODUCT_ID') // avoid using system:index, is there a way to pass this through Gaia?