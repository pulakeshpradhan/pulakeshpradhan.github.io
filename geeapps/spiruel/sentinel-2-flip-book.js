var dust = ee.Geometry.Polygon(
        [[[3.1813278199991624, 39.86462203990654],
          [3.1813278199991624, 39.83141033717322],
          [3.2352294923624436, 39.83141033717322],
          [3.2352294923624436, 39.86462203990654]]], null, false);
var aval = ee.Geometry.MultiPolygon(
        [[[42.5287836481018, 43.20448739441091],
           [42.5287836481018, 43.19773018627225],
           [42.539662687866205, 43.19773018627225],
           [42.539662687866205, 43.20448739441091]]], null, false);
var overWater = /* color: #d63000 */ee.Geometry.Polygon(
        [[[27.75970458984375, 42.695368745586514],
          [27.75970458984375, 42.686347231358454],
          [27.79068946838379, 42.686347231358454],
          [27.79068946838379, 42.695368745586514]]], null, false);
var overLand = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[27.950763702392578, 43.27920492608278],
          [27.950763702392578, 43.23444807390198],
          [28.062686920166016, 43.23444807390198],
          [28.062686920166016, 43.27920492608278]]], null, false);
var withBoat = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[28.033504486083984, 43.23951299933541],
          [28.033504486083984, 43.229507802824486],
          [28.055005073547363, 43.229507802824486],
          [28.055005073547363, 43.23951299933541]]], null, false);
Map.setOptions('satellite');
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'33.333%'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Sentinel 2 Flipbook',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle2 = ui.Label('Use the slider on the map to'+
  ' visualise the temporal offset between the spectral bands.', {});
var subtitle = ui.Label('Select from multiple areas of interest, or select your own location and specify the date.')
// Add title and description to the panel  
panel.add(intro).add(subtitle).add(subtitle2);
/*
Define study areas.
*/
// Generate polygons for each study region.
var nile = ee.Geometry.Polygon([[28.76,31.49],[30.69,29.91],
      [31.52, 29.96],[32.89,31.43],[31.00,31.76],[28.76,31.49]]),
    bets = ee.Geometry.Polygon([[46.19,-15.66],[46.25,-16.04],
      [46.51,-16.15],[46.70,-16.06],[46.19,-15.66]])
// Define labels for each study region.
var DUST = 'Saharan dust over Mallorca',
    PLANE = 'Aircraft over Sunny Beach, Bulgaria',
    AVAL = 'Avalanche at East Donguz-Orun glacier'
/*
Select Area of INTEREST
*/
// Define the select button for the AOI
var selectAoi = ui.Select({
  items:[DUST,PLANE,AVAL],
  placeholder:'Select area of interest',
  onChange: function(value) {
    if(value == DUST){
        var areaOfInterest = dust;
        var startDate = ee.Date('2020-10-21');
    }//sets the area of interest to
    else if(value == PLANE){
        var areaOfInterest = overWater;
        var startDate = ee.Date('2017-05-03');
    }
    else if (value == AVAL){
        var areaOfInterest = aval;
        var startDate = ee.Date('2018-01-20');
    }
    var endDate = startDate.advance(5, 'day');
    renderDateRange(ee.DateRange(startDate,endDate));
    Map.centerObject(areaOfInterest);
  }
  });
// Add a label.
var selectSIAOI = ui.Label({value:'Select an area of interest:',
style: {fontSize: '18px', fontWeight: 'bold'}});
// Add the select AOI panel to the map panel.
panel.add(selectSIAOI)
    .add(selectAoi);
// Define the visualization parameters for each band / band conbination.
var visConfigs = {
  rgb: {min:0, max:10000, bands: ['B4', 'B3', 'B2']},
  rgb2: {min:0, max:20000, bands: ['B4', 'B3', 'B2']},
  blue: {bands: ['B2','B2','B2'], min:0, max:10000},
  nir:  {bands: ['B8','B8','B8'], min:0, max:10000},
  green:  { bands: ['B3','B3','B3'], min:0, max:10000},
  red: {bands: ['B4','B4','B4'], min:0, max:10000},
  b5_red_edge: {bands: ['B5','B5','B5'], min:0, max:10000},
  b6_red_edge:  {bands: ['B6','B6','B6'], min:0, max:10000},
  b7_red_edge:  {bands: ['B7','B7','B7'], min:0, max:10000},
  b8a_narrow_nir:  {bands: ['B8A','B8A','B8A'], min:0, max:10000},
};
var subset = aval;//Map.getBounds(true);
var Start_period = ee.Date('2016-01-01');
var End_period = ee.Date(Date.now());
var collection = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterDate(Start_period, End_period)
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
var dateDict = ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
var source = ui.Label({value: 'Sources:', style: {fontSize: '14px', fontWeight: 'italic'}})
var credit = ui.Label({value: 'Saharan dust AOI sourced from @UEspai on Twitter', style: {fontSize: '10px', fontWeight: 'italic'}})
var credit2 = ui.Label({value: 'Avalanche AOI sourced from @inrushmd via @hareldan on Twitter', style: {fontSize: '10px', fontWeight: 'italic'}})
// Add title and description to the panel  
panel.add(source).add(credit).add(credit2);
// Add a label.
var selectDate = ui.Label({value:'Or select a date:',
style: {fontSize: '18px', fontWeight: 'bold'}});
// Add the select AOI panel to the map panel.
panel.add(selectDate)
function renderSlider(dates) {
  var DateSlider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 5, // Every 5 days
    onChange: renderDateRange,
  })
  panel.add(DateSlider)
}
function renderDateRange(dateRange) {
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  Map.clear()
  if (slider != null) {
    Map.add(slider);
  };
  Map.addLayer(image, visConfigs.blue, 'blue');
  Map.addLayer(image, visConfigs.nir, 'nir');
  Map.addLayer(image, visConfigs.green, 'green');
  Map.addLayer(image, visConfigs.red, 'red');
  Map.addLayer(image, visConfigs.b5_red_edge, 'b5_red_edge');
  Map.addLayer(image, visConfigs.b6_red_edge, 'b6_red_edge');
  Map.addLayer(image, visConfigs.b7_red_edge, 'b7_red_edge');
  Map.addLayer(image, visConfigs.b8a_narrow_nir, 'b8a_narrow_nir');
  for (var i = 1; i < Map.layers().length(); i++) {
      Map.layers().get(i).setOpacity(0);
  }
  //Map.layers().reset([layer])
  // Do something with the geometry
  var gifParams = {
    'region': ee.Geometry.Rectangle(Map.getBounds()),
    'dimensions': 600,
    'framesPerSecond': 10
  };
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  // Export a video showing the different spectral bands.  
  var filmStrip = ee.ImageCollection([
    image.visualize(visConfigs.rgb),
    image.visualize(visConfigs.blue),
    image.visualize(visConfigs.nir),
    image.visualize(visConfigs.green),
    image.visualize(visConfigs.red),
    image.visualize(visConfigs.b5_red_edge),
    image.visualize(visConfigs.b6_red_edge),
    image.visualize(visConfigs.b7_red_edge),
    image.visualize(visConfigs.b8a_narrow_nir)
  ]);
  // Print the GIF URL to the console.
  print(filmStrip.getVideoThumbURL(gifParams));
  print(filmStrip.getFilmstripThumbURL(gifParams));
  print(filmStrip)
  // Render the GIF animation in the console.
  //print(ui.Thumbnail(filmStrip, gifParams));
  //panel.add(ui.Thumbnail(filmStrip, gifParams));
}
var slider = ui.Slider();
  slider.onSlide(function(value) {
    var int_value = value * (Map.layers().length() - 1) >> 0;
    Map.layers().get(int_value).setOpacity(1);
    for (var i = int_value + 1; i < Map.layers().length(); i++) {
      Map.layers().get(i).setOpacity(0);
  }
  });
/*
Map.drawingTools().onDraw(function (geometry) {
  // Do something with the geometry
  var gifParams = {
    'region': Map.getBounds(),
    'dimensions': 600,
    'framesPerSecond': 10
  };
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
    // Export a video showing the different spectral bands.  
  var filmStrip = ee.ImageCollection([
    image.visualize(visConfigs.rgb),
    image.visualize(visConfigs.blue),
    image.visualize(visConfigs.nir),
    image.visualize(visConfigs.green),
    image.visualize(visConfigs.red),
    image.visualize(visConfigs.b5_red_edge),
    image.visualize(visConfigs.b6_red_edge),
    image.visualize(visConfigs.b7_red_edge),
    image.visualize(visConfigs.b8a_narrow_nir)
  ]);
  // Print the GIF URL to the console.
  print(filmStrip.getVideoThumbURL(gifParams));
  print(filmStrip.getFilmstripThumbURL(gifParams));
  print(filmStrip)
  // Render the GIF animation in the console.
  //print(ui.Thumbnail(filmStrip, gifParams));
  panel.add(ui.Thumbnail(filmStrip, gifParams));
  Map.addLayer(geometry, null, 'a drawn geometry')
})
*/
// Select the region to preview.
var aoi = aval;
Map.centerObject(aoi);
//43.201453, 42.534942 on 2018-01-20