var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-25.115253311181732, 63.024540680862366],
          [-11.843768936181732, 63.06438140184282],
          [-11.865741592431732, 66.48650658401047],
          [-25.093280654931732, 66.65251126960891]]]);
// Select images from a collection with a silder.
var point = ee.Geometry.Point([-16.28, 64.08]);
Map.addLayer(point.buffer(70000),{opacity:0.7},'边界')
var box = ee.Geometry.Polygon([[
  [-25.115, 63.024], [-11.843, 63.064],
  [-11.865, 66.486], [-25.093, 66.652]
]], null, false);
// Map.addLayer(box)
var collection = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
    .select('stable_lights')
    .filterDate('2013-01-01','2013-12-31').first();
print(collection)    
var visparam={
  min: 0,
  max: 63,
  palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
};
Map.addLayer(collection.mask(collection),visparam)
Map.setCenter(-18.71, 64.789,6)
// var image = collection.visualize({
//   min: 0,
//   max: 63,
//   palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
// });
// print(ui.Thumbnail({
//   image: image,
//   params: {
//     dimensions: '256x256',
//     region: box.toGeoJSON(),
//     format: 'png'
//   },
//   style: {height: '300px', width: '300px'}
// }));