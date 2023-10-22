var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            27.5450525123031,
            53.90341189481082
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([27.5450525123031, 53.90341189481082]);
function s2_preproc(image) {
  return image.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
function calc_s1_dv(img) {
  var dvh = img.select('VV').divide(img.select('VH')).rename('DVH');
  return img.addBands(dvh).copyProperties(img, ["system:time_start"]);
}
var date1 = '2020-01-01'
var date2 = '2021-01-01';
var s2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(geometry)
  .filterDate(date1, date2).map(s2_preproc);
var s1d = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(geometry)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .map(calc_s1_dv);
var s1a = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(geometry)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .map(calc_s1_dv);
var s2_list = s2.toList(s2.size());
var s2_img = ee.Image(s2_list.get(-1));
var s1d_list = s1d.toList(s1d.size());
var s1d_img = ee.Image(s1d_list.get(-1));
var s1a_list = s1a.toList(s1a.size());
var s1a_img = ee.Image(s1a_list.get(-1));
// print(s1a_img);
Map.addLayer(s1a_img, {bands: ['VV', 'VH', 'DVH'], min: -40, max: -1}, 'Sentinel1 (ASC): (VV, VH, VV/VH)');
Map.addLayer(s1d_img, {bands: ['VV', 'VH', 'DVH'], min: -40, max: -1}, 'Sentinel1 (DESC): (VV, VH, VV/VH)');
Map.addLayer(s2_img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'Sentinel2 RGB');
Map.setCenter(27.5450525123031, 53.90341189481082, 11);