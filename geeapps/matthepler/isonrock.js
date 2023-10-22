var MineFeature3 = ui.import && ui.import("MineFeature3", "table", {
      "id": "users/matthepler/M1101905"
    }) || ee.FeatureCollection("users/matthepler/M1101905"),
    MineFeature = ui.import && ui.import("MineFeature", "table", {
      "id": "users/matthepler/Doe_branch"
    }) || ee.FeatureCollection("users/matthepler/Doe_branch"),
    MineFeature4 = ui.import && ui.import("MineFeature4", "table", {
      "id": "projects/direct-link-253221/assets/Iron_MTN"
    }) || ee.FeatureCollection("projects/direct-link-253221/assets/Iron_MTN"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 6,
        "max": 8,
        "palette": [
          "939393"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":6,"max":8,"palette":["939393"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 0,
        "max": 3000,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":0,"max":3000,"gamma":1};
//sets map center-  Edit the code of the mine below to change the location
//the last number is the zoom level
Map.setCenter(-82.8209, 36.92313,14); 
// finds todays date, takes the month and goes back 4 months 
var newDate = new Date();
var today = ee.Date(newDate);
var previous = today.advance(-3, 'month')
// Construct a collection of corresponding Dynamic World and Sentinel-2 for
// inspection. Filter the DW and S2 collections by region and date.
var COL_FILTER = ee.Filter.and(
    ee.Filter.bounds(MineFeature4),
    ee.Filter.date(previous,today));
    var COL_FILTER2 = ee.Filter.and(
    ee.Filter.bounds(MineFeature4),
    ee.Filter.date(previous,today),
    ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));
var dwCol = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').filter(COL_FILTER);
var s2Col = ee.ImageCollection('COPERNICUS/S2').filter(COL_FILTER2);
// Join corresponding DW and S2 images (by system:index).
var DwS2Col = ee.Join.saveFirst('s2_img').apply(dwCol, s2Col,
    ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'}));
// Extract an example DW image and its source S2 image.
var dwImage = ee.Image(DwS2Col.first());
var s2Image = ee.Image(dwImage.get('s2_img'));
// Create a visualization that blends DW class label with probability.
// Define list pairs of DW LULC label and color.
var CLASS_NAMES = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'];
var VIS_PALETTE = [
    '419BDF', '397D49', '88B053', '7A87C6',
    'E49635', 'DFC35A', 'C4281B', 'A59B8F',
    'B39FE1'];
    //arays for remapping data later
var array1 = [0,1,2,3,4,5,6,7,8]
var array2 = [0,0,0,0,0,0,0,1,0]
// Create an RGB image of the label (most likely class) on [0, 1].
var dwRgb = dwImage
    .select('label')
    .visualize({min: 0, max: 8, palette: VIS_PALETTE})
    .divide(255);
// Get the most likely class probability.
var top1Prob = dwImage.select(CLASS_NAMES).reduce(ee.Reducer.max());
// Create a hillshade of the most likely class probability on [0, 1];
var top1ProbHillshade =
    ee.Terrain.hillshade(top1Prob.multiply(100))
    .divide(255);
// Combine the RGB image with the hillshade.
var dwRgbHillshade = dwRgb.multiply(top1ProbHillshade);
//Clip Sentinal Hillshade and Dynamic world layers to Mine
var dwRgbHillshadeClip = dwRgbHillshade.clip(MineFeature4)
var s2ImageClip = s2Image.clip(MineFeature4)
var dwImageClip = dwImage.clip(MineFeature4)
//Seleect just the Bare earth from the mine , 
var label1= dwImageClip.select(9)
var label2 =label1.remap(array1,array2); 
var mask = label2.gt(0); 
var bare = label2.updateMask(mask);
//Map.addLayer(label1, {min: 0, max: 8},'all classes label')
Map.addLayer(bare ,{min: 6, max: 8},'Disturbance change detectiion');
//var bareEarth = dwImageClip.select(7)
//Map.addLayer(bareEarth,{min: 7, max: 7},'bare1')
// Display the Dynamic World visualization with the source Sentinel-2 image.
//Map.setCenter(-82.80591, 36.91006,14);
Map.addLayer(
    s2Col,
    {min: 0, max: 3000, bands: ['B8', 'B4', 'B3']},
    'Sentinel-2 False color'); 
    Map.addLayer(
    s2Col,
    {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']},
    'Sentinel-2 L1C'); 
    //Map.addLayer(dwImageClip, {min: 0, max: 1},'dynamic')
/*Map.addLayer( 
    dwRgbHillshadeClip,
    {min: 0, max: 0.65},
    'Dynamic World'); */
      var shown = true; // true or false, 1 or 0 
    var opacity = 0.3; // number [0-1]
    var visParams = {color: 'blue'}; // dictionary: 
Map.addLayer(MineFeature4, visParams,'Mine boundary',shown,opacity); 
 Map.centerObject(MineFeature4);  
  // Create a label on the map. (something funky going on with the day)
   var date = ee.Date(s2Image.get('system:time_start')).format('YYYY-MM-dd');
  date = date.getInfo();
  var label = ui.Label(date);
  var label2 = ui.Label('Sentinal 2 Satelite Imagery')
  Map.add(label); 
  Map.add(label2);