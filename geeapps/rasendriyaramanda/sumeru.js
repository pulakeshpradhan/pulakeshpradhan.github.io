var geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-rasendriyaramanda/assets/sumeru-polygon"
    }) || ee.FeatureCollection("projects/ee-rasendriyaramanda/assets/sumeru-polygon");
// Now select your image type!
var collection1 = ee.ImageCollection('COPERNICUS/S2') // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2021-01-01' ,'2021-11-03') //... chooses only pixels between the dates you define here
  .filterBounds(geometry) // ... that are within your aoi
print(collection1) // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
/// so far this is finding all the images in the collection which meets the critera- the latest on top. To get a nice blended-looking mosaic, 
// try some of the tools for 'reducing' these to one pixel (or bands of pixels in a layer stack). 
var medianpixels1 = collection1.median() // This finds the median value of all the pixels which meet the criteria. 
var medianpixelsclipped1 = medianpixels1.clip(geometry).divide(10000) // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1      
// Now visualise the mosaic as a natural colour image. 
Map.addLayer(medianpixelsclipped1, {bands: ['B12', 'B11', 'B4'], min: 0, max: 1, gamma: 1.5}, 'Sentinel 2_sebelum')
var collection2 = ee.ImageCollection('COPERNICUS/S2') // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 100)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2021-12-05' ,'2021-12-07') //... chooses only pixels between the dates you define here
  .filterBounds(geometry) // ... that are within your aoi
print(collection2) // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
/// so far this is finding all the images in the collection which meets the critera- the latest on top. To get a nice blended-looking mosaic, 
// try some of the tools for 'reducing' these to one pixel (or bands of pixels in a layer stack). 
var medianpixels2 = collection2.median() // This finds the median value of all the pixels which meet the criteria. 
var medianpixelsclipped2 = medianpixels2.clip(geometry).divide(10000) // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1      
// Now visualise the mosaic as a natural colour image. 
Map.addLayer(medianpixelsclipped2, {bands: ['B12', 'B11', 'B4'], min: 0, max: 1, gamma: 1.5}, 'Sentinel 2_setelah')
//==========================================================================================
//Widget
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2013 = ui.Map.Layer(medianpixelsclipped1, {bands: ['B12', 'B11', 'B4'], min: 0, max: 1, gamma: 1.5});
var Img2014 = ui.Map.Layer(medianpixelsclipped2, {bands: ['B12', 'B11', 'B4'], min: 0, max: 1, gamma: 1.5});
// Add default layers to maps.
leftMap.add(Img2013);
rightMap.add(Img2014);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
//Membuat panel
//panel utama
var panel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px',position: 'bottom-left'}
});
var panel4 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px',position: 'bottom-right'}
});
//Membuat tulisan untuk judul dan deskripsi
//judul 
var judul1 = ui.Label('Tanggal 01 Januari - 03 November 2021 (Cloud Cover < 10%)');
judul1.style().set('color', 'Black');
judul1.style().set('fontWeight');
judul1.style().set({
  fontSize: '13px',
  padding: '0px 0px',
});
var judul2 = ui.Label('Tanggal 06 November 2021 (Cloud Cover > 90%)');
judul2.style().set('color', 'Black');
judul2.style().set('fontWeight');
judul2.style().set({
  fontSize: '13px',
  padding: '0px 0px',
});
//Menampilkan panel
leftMap.add(panel3);
rightMap.add(panel4);
panel3.add(judul1);
panel4.add(judul2);
//panel3.add(mapDesc);
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.centerObject(geometry, 12);