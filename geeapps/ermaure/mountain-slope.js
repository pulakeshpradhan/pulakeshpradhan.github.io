var alos = ui.import && ui.import("alos", "image", {
      "id": "JAXA/ALOS/AW3D30_V1_1"
    }) || ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    visParams = ui.import && ui.import("visParams", "imageVisParam", {
      "params": {
        "bands": "AVE",
        "min": 0,
        "max": 3000
      }
    }) || {"bands":"AVE","min":0,"max":3000},
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI");
var aqua = imageCollection.select('chlor_a')
                          .filterDate('2020-04-01', '2020-05-01');
var slope = ee.Terrain.slope(alos.select('AVE'));
// print(slope)
// Make UI components.
var label = ui.Label('Click for elevation');
var inspector = ui.Panel([label]);
// Define callback functions.
function showElevation(elevation) {
  inspector.clear();
  var elevationLabel = ui.Label('Elevation: ' + elevation);
  inspector.add(elevationLabel);
}
function inspect(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = slope.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30
  }).get('slope');
  elevation.evaluate(showElevation);
}
visParams = {palette: ['white', 'green', 'red'],
"bands":"slope","min":0,"max":45};
// Set up the map.
Map.addLayer(slope, visParams, 'Elevation');
Map.setCenter(138.7271, 35.3644, 10);
Map.add(inspector);
Map.onClick(inspect);