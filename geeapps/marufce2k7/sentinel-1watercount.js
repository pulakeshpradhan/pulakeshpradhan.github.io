//Ref: https://mbonnema.github.io/GoogleEarthEngine/07-SAR-Water-Classification/
/**********************************
 Geometric Definitions
***********************************/
// Coordinate of Sirajganj Jason Altimetry Station
var coordinate = [89.6828,24.6915];
// Coordinate of Bangabandhu Multipurpose Bridge
var jamunaBridgeCoordinate = [89.7771, 24.3998];
// Kazipur Water Level Station SW49A
var kazipurWLCoordinate = [89.69, 24.635];
// Sirajgang Water Level Station SW49
var sirajganjWLCoordinate = [89.72, 24.4705];
// bounding a square region around roi with buffer distance of 10000 meter on both side total width 20000
var roi = ee.Geometry.Point(coordinate).buffer({distance: 10000}).bounds();
//print(roi.area(.001))
Map.centerObject(roi, 10);
//Get todays date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;
print('Today is ', today);
//Load Sentinel-1 SAR collection and filter according to data collection type
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(roi)
  .filterDate('2014-11-01',today)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filterMetadata('resolution_meters', 'equals', 10)
  //.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
  .sort('system:time_start', false); //descending order sorting
//Add first image to map to get an idea of what a SAR image looks like  
Map.addLayer(S1.first(),{bands: 'VV',min: -18, max: 0}, 'SAR image');
// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV') //select the VV polarization band
  var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Apply a focal median filter
  return img.addBands(vv_smoothed) // Add filtered VV band to original image
}
// Map speckle noise filter across collection. Result is same collection, with smoothed VV band added to each image
S1 = S1.map(filterSpeckles)
//Add speckle filtered image to map to sompare with raw SAR image
Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image')
var scalePerPixel = S1.first().select('VV_Filtered').projection().nominalScale();
var areaPerPixel = scalePerPixel.pow(2); //in m2 100
var areaPerPixelinkm2 = areaPerPixel.divide(1000000)
print('Scale in meters:', scalePerPixel, 'Per pixel area in m2', areaPerPixel);
//Here we are using -12. This is only an approximation and will result in some errors. Try adjusting the 
var classifyWater = function(img) {
  var vv = img.select('VV_Filtered')
  var water = vv.lt(-12).rename('Water')  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water) //Remove all pixels equal to 0
  return img.addBands(water)  //Return image with added classified water band
}
//Map classification across sentinel-1 collection and print to console to inspect
S1 = S1.map(classifyWater)
//print(S1)
//Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image Pixel Val')
//convert to area
//print('area',ee.Image.pixelArea())
var areakmImgFunc = function(image){
  return image.multiply(ee.Image.pixelArea()) //for dynamic scale of image in image format
              .divide(1000*1000) //convert in km2
              .set('system:time_start', image.get('system:time_start'));
};
var S1AreakmImg = S1.map(areakmImgFunc);
//print('first area image',S1AreaImg.first())
//Map.addLayer(S1AreaImg.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image Area Val')
//Make time series of water pixels within region
var upScale = ee.Number(10); //upscaled n times for calculation timeout problem
var chartScale = upScale.multiply(scalePerPixel); //chart scale is n times the actual pixel scale
var ClassChart = ui.Chart.image.series({
  imageCollection: S1AreakmImg.select('Water'),
  region: roi,
  reducer: ee.Reducer.sum(),
  scale: chartScale, //this scale will control the computation time to generate chart i.e. if 100 meaning 10 times original 10m resolution, 50 meaning 5 times original 10m resolution
})
  .setOptions({
      title: 'Area detected as water inside ROI of Total 417.4km2',
      hAxis: {'title': 'Date', format: 'yyyy'},
      vAxis: {'title': 'Area of Inundation (km2)'},
      lineWidth: 2
    })
//Set the postion of the chart and add it to the map    
ClassChart.style().set({
    position: 'bottom-center',
    width: '800px',
    height: '200px',
  });
Map.add(ClassChart)
// Create a label on the map.
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label);
//Create callbakc function that adds image to the map coresponding with clicked data point on chart
ClassChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data and clip water classification to roi 
    var classification = ee.Image(S1.filter(equalDate).first()).clip(roi).select('Water'); 
    var SARimage = ee.Image(S1.filter(equalDate).first());
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(SARimage.clip(roi), {
      bands: ['VV'],
      max: 0,
      min: -20
    });
    Map.layers().reset([S1Layer]);
    var visParams = {
      min: 0,
      max: 1,
      palette: ['#FFFFFF','#0000FF']
    }
    //Add water classification on top of SAR image
    Map.addLayer(classification,visParams,'Water')
//    Map.addLayer(roi, {},'ROI')
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
Map.addLayer(roi, {}, 'ROI');