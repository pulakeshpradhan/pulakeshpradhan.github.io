var jayapura = ui.import && ui.import("jayapura", "table", {
      "id": "users/pramayudar/JayapuraSHP"
    }) || ee.FeatureCollection("users/pramayudar/JayapuraSHP");
var kotajayapura = jayapura.filter(ee.Filter.eq("KECAMATAN", "JAYAPURA UTARA"));
print(kotajayapura);
Map.centerObject(kotajayapura, 11);
Map.addLayer(kotajayapura);
// 1. Memanggil Data Sentinel-2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}
var S2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2021-10-01', '2021-10-30')
                  .filter(ee.Filter.bounds(jayapura))
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 0))
                  .map(maskS2clouds)
                  .median();
print(S2)
//2. Memanggil data sentinel 1
var s1VV = ee.ImageCollection("COPERNICUS/S1_GRD")
              .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
              .filter(ee.Filter.eq('instrumentMode', 'IW'))
              .filter(ee.Filter.date('2021-10-01', '2021-10-30'))
              .select('VV')
              //.filter(ee.Filter.bounds(geometry))
              .map(function(image) {
                var edge = image.lt(-30.0);
                var maskedImage = image.mask().and(edge.not());
                return image.updateMask(maskedImage);
              })
              .median()
print(s1VV)
//3. Visualisasi 
// Add Sentinel-2 to the default Map.
Map.addLayer(S2, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'Sentinel-2');
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(s1VV, {bands: ['VV'], min:-13.21 , max: -0.9371371773050903}, 'Sentinel-1');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.centerObject(kotajayapura, 11);