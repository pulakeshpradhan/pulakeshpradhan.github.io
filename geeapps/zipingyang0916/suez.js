var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            32.57326515994133,
            30.014822547943158
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([32.57326515994133, 30.014822547943158]);
var japan = ee.FeatureCollection('users/zipingyang0916/japan_ver1')
var p = ee.Geometry.Point([117.560836,36.193272]).buffer(10000)
var name_eq = ee.Filter.eq('NAME_1','Chiba')
var chiba = japan.filter(name_eq).geometry()
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(geometry)
                  .filterDate('2021-03-21', '2021-03-26')
                  .map(maskS2clouds)
                  .select('B2','B3','B4');
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var image = dataset.median();
Map.centerObject(geometry,13)
Map.addLayer(image, rgbVis, 'RGB');
/*Export.image.toDrive({
  image: image,
  description: 'imageToDriveExample',
  scale: 30,
  region: chiba
});*/