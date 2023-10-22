var BAINTERREG = /* color: #d63000 */ee.Geometry.Polygon(
        [[[21.687310487296145, 65.36903854053712],
          [19.424126893546145, 65.222107891302],
          [14.809869081046145, 66.0915051959019],
          [18.962701112296145, 69.22297358124395],
          [13.821099549796145, 69.36282098610197],
          [10.569146424796145, 64.75295711287716],
          [17.292779237296145, 64.39447280894633],
          [16.150201112296145, 63.95416891017608],
          [17.204888612296145, 63.12199353072284],
          [15.249322206046145, 62.600828429371056],
          [16.809380799796145, 61.9362671112167],
          [21.170953065421145, 62.183352271755005],
          [24.439385682608645, 62.67656813507845],
          [24.21150775776937, 63.095330782126666],
          [25.78255267964437, 63.802451874604145],
          [23.92586322651937, 64.4306965117431]]]),
    imageCollection = ee.ImageCollection("COPERNICUS/S2_SR");
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var winter_IC = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-12-01', '2019-04-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterBounds(BAINTERREG)
                  .map(maskS2clouds);
var fall_IC = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-09-01', '2019-11-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterBounds(BAINTERREG)
                  .map(maskS2clouds);
var summer_IC = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-06-01', '2019-08-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterBounds(BAINTERREG)
                  .map(maskS2clouds);  
var spring_IC = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-04-01', '2019-05-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterBounds(BAINTERREG)
                  .map(maskS2clouds);  
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
ui.root.clear();
var map = ui.Map();
ui.root.add(map)
var places = {
  VAASA: [21.6251, 63.0888],
  UMEÅ: [20.264, 63.796],
  MOiRANA: [14.162, 66.299]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    map.setCenter(places[key][0], places[key][1]);
  }
});
select.style().set('position', 'top-center' )
// Set a place holder.
select.setPlaceholder('Choose a location...');
//map layer linking
var layer = ui.Map.Layer(winter_IC.median(), rgbVis);
var layers = map.layers();
layers.add(layer)
var seasons = {
  Winter: winter_IC,
  Summer: summer_IC,
  Fall: fall_IC,
  Spring: spring_IC
};
var select2 = ui.Select({
  items: Object.keys(seasons),
  onChange: function(key) 
  {
    map.remove(layer);
     switch(key) 
     {
       case "Winter":
         layer = ui.Map.Layer(winter_IC.median(), rgbVis);
         break;
       case "Summer":
         layer = ui.Map.Layer(summer_IC.median(), rgbVis);
         break;
       case "Fall":
         layer = ui.Map.Layer(fall_IC.median(), rgbVis);
         break;
       case "Spring":
         layer = ui.Map.Layer(spring_IC.median(), rgbVis);
         break;
     }
     layers.add(layer);
  }
});
select.setValue("VAASA");
select2.setValue("Winter");
print(layers);
map.add(select2);
map.add(select);
map.setZoom(13);
map.setCenter(21.6251, 63.0888);
map.setLocked(true);
map.setControlVisibility(false);
var title = ui.Label('Kvarken Seasons');
title.style().set('position', 'top-center');
map.add(title);
// Display the button in the console.
//print(button);