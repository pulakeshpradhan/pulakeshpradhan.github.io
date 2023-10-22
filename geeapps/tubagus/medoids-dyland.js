// Initiate new map object.
var map = ui.Map();
// Initiate new map object.
var imagebaru = function() {
  // Clear the existing image layers on the map
  Map.layers().reset();
  // Get the selected year
  var selectedYear = masukinTahun.getValue();
  // Start and end date to filter collections
  var startDate = selectedYear + '-01-01';
  var endDate = selectedYear + '-12-31';
// Get the AOI coordinate from the input
 var coordinate = masukinKoordinat.getValue().split(',').map(Number);
  // Convert the coordinate to a point geometry
  var point = ee.Geometry.Point(coordinate);
  // Create an AOI around the point using a buffer of 5000 meters
  var aoi = point.buffer(2000).bounds();
  map.centerObject(point,14)
// ---------- Landsat 8
// Landsat 8 Surface Reflectance product
var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");
// Function to mask clouds L8
function maskL8srClouds(img) {
   var cloudShadowBitMask = (1<<4)
  var cloudBitMask = (1<<3)
  var qa = img.select('QA_PIXEL')
  var mask_shadow = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
  var mask_cloud = qa.bitwiseAnd(cloudBitMask).eq(0)
  var mask = mask_shadow.and(mask_cloud)
  return img.updateMask(mask)
}
// Filter Landsat 8 collection, mask clouds, apply median filter, 
//and clip to aoi
var l8FiltMasked = l8.filterBounds(aoi)
                .filterDate(startDate,endDate)
                //////.filterMetadata('CLOUD_COVER','less_than',10)
                .map(maskL8srClouds)
// ---------- Landsat 7
// Landsat 7 Surface Reflectance product
var l7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2');
// Function to mask clouds L7
function maskL7srClouds(img) {
  var cloudShadowBitMask = (1<<4)
  var cloudBitMask = (1<<3)
  var qa = img.select('QA_PIXEL')
  var mask_shadow = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
  var mask_cloud = qa.bitwiseAnd(cloudBitMask).eq(0)
  var mask = mask_shadow.and(mask_cloud)
  return img.updateMask(mask)
}
// Filter Landsat 7 collection, mask clouds, and rename bands
var l7FiltMasked = l7.filterBounds(aoi)
                .filterDate(startDate,endDate)
                ////////.filterMetadata('CLOUD_COVER','less_than',10)
                .map(maskL7srClouds);
// Merging both collections
function rename(image){
  return image.select(
    ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'],
    ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']);
}
// Apply the rename function
var l7FiltMaskedRenamed = l7FiltMasked.map(rename);
// Merge Landsat collections
var citra = l7FiltMaskedRenamed.merge(l8FiltMasked.select('SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'));
// -------------- MEDOID
var citramedian = citra.median(); 
var img_medoid = citra.map(function(image) {
  var diff = ee.Image(image).subtract(citramedian).pow(ee.Image.constant(2)); // get the difference between each image/band and the corresponding band median and take to power of 2 to make negatives positive and make greater differences weight more
  return diff.reduce('sum').addBands(image);  // per image in collection, sum the powered difference across the bands - set this as the first band add the SR bands to it - now a 7 band image collection
}).reduce(ee.Reducer.min(7)).select([1,2,3,4,5,6], ['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6', 'SR_B7']) // find the powered difference that is the least - what image object is the closest to the median of the collection - and then subset the SR bands and name them - leave behind the powered difference band;
  .clip(aoi); 
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  return image.addBands(opticalBands, null, true);
}
  var citramedoidComposite = applyScaleFactors(img_medoid)
  var rgbImageLayer = ui.Map.Layer(citramedoidComposite, {bands:['SR_B4','SR_B3','SR_B2'], min:0, max:0.1}, 'Medoid composite');
  Map.layers().add(rgbImageLayer);
  Map.centerObject(aoi, 14.2);
};
// Create a panel for the user interface
var controlPanel = ui.Panel({
  style: {
    width: '360px',
    padding: '10px',
    stretch: 'horizontal'
  }
});
var PanelLabel = ui.Panel([
  ui.Label('Intruksi Penggunaan', {fontWeight: 'bold'}),
  ui.Label('1) Masukkan tahun citra yang akan ditampilkan dalam rentang 2000 hingga 2022'),
  ui.Label('2) Masukkan koordinat yang didapatkan pada UI Dynamic Landslide'),
  ui.Label('3) Lalu klik submit'),
  ui.Label('Informasi lebih lanjut', {}, 'http://grid.unpad.ac.id/~dyland/index.html'),
  ui.Label('________________________________________________'),
]);
controlPanel.add(PanelLabel);
// Add a label for the year input
var buatTahun = ui.Label('Masukkan Tahun', {fontWeight: 'bold'});
// controlPanel.add(buatTahun);
var tahunData = ui.Panel(
  [
    ui.Label('Masukkan Tahun', {fontWeight: 'bold',margin: '13px 8px'}),
    ui.Textbox({
  placeholder: 'YYYY',
  value: '2019',
  style: {width: '185px'}// Default year value
}) 
  ],
  ui.Panel.Layout.Flow('horizontal')
);
controlPanel.add(tahunData);
// Add an input textbox for year selection
var masukinTahun = ui.Textbox({
  placeholder: 'YYYY',
  value: '2019',
  style: {
  width: '50px'}// Default year value
});
// controlPanel.add(masukinTahun);
// Add a label for the coordinate input
var buatKoordinat = ui.Label('Masukkan Koordinat (lon, lat)', {fontWeight: 'bold'});
controlPanel.add(buatKoordinat);
// Add an input textbox for coordinate selection
var masukinKoordinat = ui.Textbox({
  placeholder: 'lon, lat',
  value: '99.99652272873855, 0.08574845457538438',
  style:{stretch: 'horizontal'}// Default coordinate value
});
controlPanel.add(masukinKoordinat);
// Add a submit button
var submitButton2 = ui.Button({
  label: 'Submit',
  onClick: imagebaru,
  style:{stretch: 'horizontal'}// Call the imagebaru function directly
});
controlPanel.add(submitButton2);
// Add the control panel to the map
ui.root.add(controlPanel);