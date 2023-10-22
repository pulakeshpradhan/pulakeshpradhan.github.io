var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            32.58452286762963,
            30.018339620143728
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([32.58452286762963, 30.018339620143728]);
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',50))
    .filterDate('2021-03-22','2021-03-31')
    .filterBounds(geometry);
    //.filterMetadata('MGRS_TILE','equals','T06VUP');
print(collection);
//var scene = ee.Image(collection.sort('Date'));
//print(scene)
var imagelist = collection.toList(collection.size());
print(imagelist);
var img_tag = 0; // just to make it easier to select the same image
var img1 = imagelist.get(img_tag);
var img2 = imagelist.get(img_tag);
//print(img1)
var scene1 = ee.Image(img1);
var scene2 = ee.Image(img2);
print(scene1);
print(scene2);
var visParams = {bands: ['B4', 'B3', 'B2'], max: 4000, gamma: [0.95, 1.1, 2]};
var visParams_imprv = {bands: ['B4', 'B3', 'B1'], max: 3000};
//, max: 4000};
//gain: '0.5, 0.5, 0.5',scale:20};
//var visParams_NIR = {bands: ['B4', 'B83', 'B1'],gain: '0.1, 0.1, 0.1',scale:20};
//
Map.setCenter( 30.043676314615986, 32.428691193971815,  6); // Center on the Grand Canyon.
//Map.addLayer(scene,visParams,'RGB');
Map.addLayer(scene1,visParams,'RGB');
//Map.addLayer(scene2,visParams_imprv,'Bathymetric');
var min = collection.min();
// Select the red, green and blue bands.
//var result = min.select('B7', 'B5', 'B4');
//Map.addLayer(result, {gain: '0.1, 0.1, 0.1', scale:20},'working');
//Map.setCenter(5, 47, 4);