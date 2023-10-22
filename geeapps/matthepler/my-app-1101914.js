/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var MineFeature1 = ee.FeatureCollection("users/matthepler/M1101914"),
    MineFeature2 = ee.FeatureCollection("users/matthepler/M1101918"),
    MineFeature3 = ee.FeatureCollection("users/matthepler/M1101905"),
    imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":336.28,"max":3133.72,"gamma":1},
    imageVisParam2 = {"opacity":1,"bands":["B8","B4","B3"],"min":336.28,"max":3133.72,"gamma":1};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//an array of variables incase i need to loop through them later
var Minearray = [MineFeature1,MineFeature2,MineFeature3]
//set one of the mines to select the Area of Interest
var MineFeature = Minearray[0]
// 
//date variables
var newDate = new Date();
var today = ee.Date(newDate); 
var previous = today.advance(-4, 'month')
//set up sentinal sattelite parameters
var SentinalToa = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(previous,today)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .select('B8','B4','B3','B2')
    .filterBounds(MineFeature);
    //grab the first and last image
    var image = SentinalToa.first();
    var lastImage = SentinalToa.limit(1, 'system:time_start', false).first();
    //add the last image to the map and print the date.
    Map.addLayer(lastImage, imageVisParam2); 
var shown = true; // true or false, 1 or 0 
var opacity = 0.3; // number [0-1]
var visParams = {color: 'blue'}; // dictionary: 
Map.addLayer(MineFeature, visParams,'1101914',shown,opacity); 
        print(lastImage.date());
       // Create a label on the map. (something funky going on with the day)
   var date = ee.Date(lastImage.get('system:time_start')).format('YYYY-MM-dd');
  date = date.getInfo();
  var label = ui.Label(date);
  var label2 = ui.Label('False Color Near Infrared Satelite Imagery')
  Map.add(label); 
  Map.add(label2);
Map.centerObject(MineFeature,13);