var AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/daprieto24/FFC/AOI_OCHOSUR"
    }) || ee.FeatureCollection("users/daprieto24/FFC/AOI_OCHOSUR");
//*** Demonstrates before/after imagery comparison with a variety of dates. ***
// Configure the imagery 2020
//Masking clouds
function maskS2clouds(image) {
var QA = image.select("QA60");
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = 1 << 10;
var cirrusBitMask = 1 << 11;
//Both flgas should be set to zero, indicating clear conditions.
var mask = QA.bitwiseAnd(cloudBitMask).eq(0)
    .and(QA.bitwiseAnd(cirrusBitMask).eq(0));
return image.updateMask(mask).divide(10000);
}
//Image visualization parameters
var imageVisParam = {bands:['B4','B3','B2'], min: 0.058, max: 0.18, gamma: 1,
};
//Copernicus Collection
var dataset = ee.ImageCollection("COPERNICUS/S2")
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
              .filterDate('2020-08-20', '2020-08-30')
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2020]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_20 = dataset.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2020 = series_20.min().clip(AOI).visualize({bands: ['B4', 'B3', 'B2'], min: 0.05, max: 0.35, gamma: 1.3, opacity: 1});
//Print Image 2020
Map.addLayer(Image_2020.clip(AOI),imageVisParam,'Image'+" "+ arr[a])
}
Map.centerObject (AOI);
// Configure the imagery 2019
//Copernicus Collection
var dataset1 = ee.ImageCollection("COPERNICUS/S2")
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
              .filterDate('2019-08-01', '2019-08-15') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2019]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_19 = dataset1.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2019 = series_19.min().clip(AOI).visualize({bands: ['B4', 'B3', 'B2'], min: 0.05, max: 0.35, gamma: 1.3, opacity: 1});
//print(final_image)
Map.addLayer(Image_2019.clip(AOI),imageVisParam,'Image'+" "+ arr[a])
}
// Configure the imagery 2018
//Copernicus Collection
var dataset2 = ee.ImageCollection("COPERNICUS/S2")
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
              .filterDate('2018-08-25', '2018-09-03') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2018]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_18 = dataset2.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2018 = series_18.min().clip(AOI).visualize({bands: ['B4', 'B3', 'B2'], min: 0.05, max: 0.35, gamma: 1.3, opacity: 1});
//print(final_image)
Map.addLayer(Image_2018.clip(AOI),imageVisParam,'Image'+" "+ arr[a])
}
// Configure the imagery 2017
//Copernicus Collection
var dataset3 = ee.ImageCollection('COPERNICUS/S2')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .filterDate('2016-01-01', '2017-12-31') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2017]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_17 = dataset3.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2017 = series_17.min().clip(AOI).visualize({bands: ['B4', 'B3', 'B2'], min: 0.05, max: 0.35, gamma: 1.3, opacity: 1});
//print(final_image)
Map.addLayer(Image_2017.clip(AOI),imageVisParam,'Image'+" "+ arr[a])
}
//Declare variable to images
var images = {
  /*'Mosaic 2017': Image_2017,*/
  'Mosaic 2018': Image_2018,
  'Mosaic 2019': Image_2019,
  'Mosaic 2020': Image_2020
  };
// ** Set up the maps and control widgets **
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
 //* Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject (AOI,12);