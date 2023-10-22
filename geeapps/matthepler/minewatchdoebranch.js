/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var MineFeature1 = ee.FeatureCollection("users/matthepler/M1101914"),
    MineFeature2 = ee.FeatureCollection("users/matthepler/M1101918"),
    MineFeature3 = ee.FeatureCollection("users/matthepler/M1101905"),
    imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":446,"max":1718,"gamma":1},
    imageVisParam2 = {"opacity":1,"bands":["B8","B4","B3"],"min":291.5,"max":3387.5,"gamma":1},
    MineFeature4 = ee.FeatureCollection("users/matthepler/Doe_branch"),
    CFX = ee.FeatureCollection("projects/direct-link-253221/assets/MErge");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//an array of variables incase i need to loop through them later
var Minearray = [MineFeature1,MineFeature2,MineFeature3,MineFeature4]
//set one of the mines to select the Area of Interest
var MineFeature = Minearray[3]
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
    var shown = true; // true or false, 1 or 0 
    var opacity = 0.3; // number [0-1]
    var opacity2= 0.8;
    var visParams = {color: 'blue'}; // dictionary: 
     var visParams3 = {color: 'green'}; // dictionary: 
Map.addLayer(lastImage, imageVisParam2,'Near Infrared Satellite Image',shown,opacity2);
Map.addLayer(MineFeature, visParams,'Doe Branch Mine Permit Boundary',shown,opacity); 
        print(lastImage.date());
        Map.addLayer(CFX,visParams3,"CFX")
    // Create a label on the map. (something funky going on with the day)
   var date = ee.Date(lastImage.get('system:time_start')).format('YYYY-MM-dd');
  date = date.getInfo();
  var label = ui.Label(date);
  var label2 = ui.Label('False Color Near Infrared Satelite Imagery')
  Map.add(label); 
  Map.add(label2);
Map.centerObject(MineFeature,14);