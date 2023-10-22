var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -78.15520660949711,
                -11.02780473220737
              ],
              [
                -78.15520660949711,
                -13.170752489662325
              ],
              [
                -75.98540680480961,
                -13.170752489662325
              ],
              [
                -75.98540680480961,
                -11.02780473220737
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#9999ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #9999ff */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-78.15520660949711, -11.02780473220737],
          [-78.15520660949711, -13.170752489662325],
          [-75.98540680480961, -13.170752489662325],
          [-75.98540680480961, -11.02780473220737]]], null, false);
ui.root.setLayout('absolute');
Map.setCenter(-54.5, -10.44, 4);
// Define Title 
var titlePanel = ui.Panel();
titlePanel.style().set({position: 'top-center', border: '2px solid black'});
var titleText = ui.Label('GOES16 - Data Visualization App', {textAlign: 'center', fontWeight: 'bold', fontSize: '24px'});
titlePanel.add(titleText);
ui.root.add(titlePanel);
// Define Date Box
var datePanel = ui.Panel();
datePanel.style().set({position: 'middle-left', border: '2px solid black'});
var dateText = ui.Label('Select Day of the Year: ', {textAlign: 'center', fontWeight: 'bold', fontSize: '20px', width: '350px'});
datePanel.add(dateText);
// Add start date text
var startText = ui.Label('Start hour (hh:mm:ss):',
{width: '350px', fontSize: '12px', color: 'black', textAlign: 'center', fontWeight: 'bold'});
// Add end date text
var endText = ui.Label('End hour (hh:mm:ss):',
{width: '350px', fontSize: '12px', color: 'black', textAlign: 'center', fontWeight: 'bold'});
// Add date ui system to the date panel
var dateSelector = ui.DateSlider({
  start: '2022-01-01',
  end: ee.Date(Date.now()).advance(1, 'day'),
  value: ee.Date(Date.now())
});
dateSelector.style().set({width: '350px'});
datePanel.add(dateSelector);
ui.root.add(datePanel);
// Add start hour
var startHour = ui.Textbox({
  value: '11:00:00'
});
startHour.style().set({width: '200px', textAlign: 'center', margin: '0px 0px 0px 75px'});
datePanel.add(startText);
datePanel.add(startHour);
// Add end hour
var endHour = ui.Textbox({
  value: '23:00:00'
});
endHour.style().set({width: '200px', textAlign: 'center', margin: '0px 0px 0px 75px'});
datePanel.add(endText);
datePanel.add(endHour);
// Add countries in South America
var countryLayer = ui.Map.FeatureViewLayer('USDOS/LSIB_SIMPLE/2017_FeatureView');
countryLayer.setVisParams({polygonStrokeColor: 'black', polygonStrokeWidth: 2, polygonStrokeType: 'dashed', polygonFillOpacity: 0});
countryLayer.setName('USDOS/LSIB_SIMPLE/2017');
Map.add(countryLayer);
// Add GOES16 imagery
var goes16 = ee.ImageCollection('NOAA/GOES/16/MCMIPF');
// Function to add scaling and offset
function applyScaleAndOffset(img) {
  var bands = img.select('CMI_C.*').bandNames().map(function scalingOffset (band) {
    var selected = img.select(ee.String(band));
    var offset = ee.Number(img.get(ee.String(band).cat('_offset')));
    var scale = ee.Number(img.get(ee.String(band).cat('_scale')));
    var final = selected.multiply(scale).add(offset).rename(ee.String(band));
    return final.toFloat();
  });
  var imgFinal = ee.ImageCollection(bands).toBands().copyProperties(img).set('system:id', img.get('system:id')).set('system:time_start', img.get('system:time_start'));
  return imgFinal;
}
// Function to generate a green band
function addGreenBand (img) {
  var green1 = ee.Image(img).select('1_CMI_C02').multiply(0.45);
  var green2 = ee.Image(img).select('2_CMI_C03').multiply(0.10);
  var green3 = ee.Image(img).select('0_CMI_C01').multiply(0.45);
  var greenFinal = green1.add(green2).add(green3).rename('GREEN');
  return ee.Image(img).addBands(greenFinal);
}
// Visualization parameters
var goesRgbViz = {
  bands: ['1_CMI_C02', 'GREEN', '0_CMI_C01'],
  min: 0,
  max: 0.7,
  gamma: 1.5
};
// Create label
var gifLabel = ui.Label('Create a region of interest using drawing tools!', {textAlign: 'center', fontWeight: 'bold', fontSize: '16px', width: '350px'});
datePanel.add(gifLabel);
// Define drawing tools
var drawingTools = Map.drawingTools();
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
drawingTools.setDrawModes(['polygon', 'rectangle']);
// Add button to create a GIF
var gifPanel = ui.Panel();
gifPanel.style().set({position: 'middle-right', border: '2px solid black'});
var gifButton = ui.Button({
  label: 'Click here to create a GIF (takes a while to load)',
  onClick: function () {
    gifPanel.clear();
    ui.root.remove(gifPanel);
    var imgCol = goes16.filterDate(ee.Date(ee.Date.parse('HH:mm:ss', startHour.getValue()).millis().add(dateSelector.getValue()[0])),
    ee.Date(ee.Date.parse('HH:mm:ss', endHour.getValue()).millis().add(dateSelector.getValue()[0]))).aside(print);
    var col = imgCol.map(applyScaleAndOffset).map(addGreenBand);
    var aoi = drawingTools.layers().get(0).getEeObject();
    var rgbVis = col.map(function (img) {
      return img.visualize(goesRgbViz).updateMask(img.select(0).mask().clip(aoi));
    });
    var gifParams = {
      'dimensions': 400,
      'region': aoi,
      'crs': 'EPSG:3857',
      'framesPerSecond': 10,
      'format': 'gif'
    };
    var thumbnail = ui.Thumbnail(rgbVis, gifParams);
    gifPanel.add(thumbnail);
    ui.root.add(gifPanel);
  }
});
gifButton.style().set({width: '350px', textAlign: 'center'});
datePanel.add(gifButton);
// Add button to add the latest GOES16 image
var latestPanel = ui.Panel();
var latestButton = ui.Button({
  label: 'Click here to add the latest image',
  onClick: function () {
    latestPanel.clear();
    var latest = goes16.filterDate(ee.Date(Date.now()).advance(-4, 'hour'), ee.Date(Date.now())).sort('system:time_start', false).first();
    var latest = applyScaleAndOffset(latest);
    var latest = addGreenBand(latest);
    Map.layers().insert(0, latest);
    Map.layers().get(0).set('name', 'Latest GOES16').set('visParams', goesRgbViz);
    var nameLatestImage = ui.Label();
    var dateLatestImage = ui.Label();
    var nameImg = latest.get('system:id').evaluate(function getName (name) {
      return nameLatestImage.setValue('Latest image asset ID: ' + name);
    });
    nameLatestImage.style().set({width: '350px', textAlign: 'center'});
    var dateImg = ee.Date(latest.get('system:time_start')).format().evaluate(function getDate (date) {
      return dateLatestImage.setValue('Date of the latest image (UTC): ' + date);
    });
    dateLatestImage.style().set({width: '350px', textAlign: 'center'});
    return latestPanel.add(nameLatestImage), latestPanel.add(dateLatestImage);
  }
});
latestButton.style().set({width: '350px', textAlign: 'center'});
datePanel.add(latestButton);
datePanel.add(latestPanel);
// Add button to add the 3 previous images
var previousButton = ui.Button({
  label: 'Click here to add the 3 previous images (sometimes it doesnt work)',
  onClick: function () {
    latestPanel.clear();
    var previousList = goes16.filterDate(ee.Date(Date.now()).advance(-4, 'hour'), ee.Date(Date.now())).sort('system:time_start', false).toList(4).aside(print);
    var second = ee.Image(previousList.get(1)).aside(print);
    var second = applyScaleAndOffset(second);
    var second = addGreenBand(second);
    Map.layers().insert(0, second);
    Map.layers().get(0).set('name', 'Second Latest GOES16').set('visParams', goesRgbViz);
    var third = ee.Image(previousList.get(2)).aside(print);
    var third = applyScaleAndOffset(second);
    var third = addGreenBand(second);
    Map.layers().insert(0, third);
    Map.layers().get(0).set('name', 'Third Latest GOES16').set('visParams', goesRgbViz);
    var fourth = ee.Image(previousList.get(3)).aside(print);
    var fourth = applyScaleAndOffset(second);
    var fourth = addGreenBand(second);
    Map.layers().insert(0, fourth);
    Map.layers().get(0).set('name', 'Fourth Latest GOES16').set('visParams', goesRgbViz);
  }
});
previousButton.style().set({width: '350px', textAlign: 'center'});
datePanel.add(previousButton);