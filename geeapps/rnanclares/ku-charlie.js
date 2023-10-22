var s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    ku_charlie = ui.import && ui.import("ku_charlie", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -92.15004416931153,
            19.495634094289564
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-92.15004416931153, 19.495634094289564]);
var filteredS1 = s1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  //.filter(ee.Filter.calendarRange(1,12, 'month'))
  //.filter(ee.Filter.calendarRange(1,31,'day_of_month'))
  .filterDate('2021-06-01', '2021-07-01')
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
Map.setCenter(-92.15013, 19.49527, 13)
var speckleFilter = function(img){
  var vv = img.select('VV')
  var vv_spk = vv.focal_median(30,'circle','meters').rename('vv_spk')
  var vh = img.select('VH')
  var vh_spk = vh.focal_median(30,'circle','meters').rename('vh_spk')
  return img.addBands(vv_spk).addBands(vh_spk)
}
var vv_vh_ratio = function(img){
 var vv_vh = img.select('vv_spk').divide(img.select('vh_spk')).rename('vv_vh')
 return img.addBands(vv_vh)
}
filteredS1 = filteredS1.map(speckleFilter)
filteredS1 = filteredS1.map(vv_vh_ratio)
var compositeS1 = ee.Image.cat([
  filteredS1.select('vv_spk').median(),
  filteredS1.select('vh_spk').median(),
  filteredS1.select('vv_vh').median()])
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var compositeS2 = s2.filterDate('2021-3-01', '2021-03-31')
.filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
.map(maskS2clouds).median()
Map.addLayer(compositeS2, {bands: ['B8', 'B4', 'B3'], min: 100, max: 4000, gamma: 1.5}, 'Sentinel_2 mosaic')
//Map.addLayer(compositeS1,{bands: ['vv_spk', 'vh_spk', 'vv_vh']
//, min: [-20,-25,0], max:[ 0, -5, 2]}, 'Imagen Sentinel 1')
Map.addLayer(compositeS1,{bands: ['vv_spk']
, min: [-20], max:[ 0]}, 'Imagen Sentinel 1')