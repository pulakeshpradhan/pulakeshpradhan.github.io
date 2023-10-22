var table = ui.import && ui.import("table", "table", {
      "id": "users/felipejt/Piracicaba"
    }) || ee.FeatureCollection("users/felipejt/Piracicaba"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TCI_R",
          "TCI_G",
          "TCI_B"
        ],
        "min": 18,
        "max": 174,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["TCI_R","TCI_G","TCI_B"],"min":18,"max":174,"gamma":1},
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_RT");
var antiga = imageCollection2
         .filterBounds(table)
         .filterDate('1999-01-01','1999-12-01')
         .filterMetadata('CLOUD_COVER', 'less_than', 10)
         .select(['B3','B2','B1']);
var nova = imageCollection
         .filterBounds(table)
         .filterDate('2022-01-01','2022-01-29')
         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
         .select(['TCI_R','TCI_G','TCI_B']);         
print(antiga); 
print(nova); 
var mosaico = antiga.mosaic().clip(table);
Map.addLayer(mosaico);
var mosaico2 = nova.mosaic().clip(table);
Map.addLayer(mosaico2);
var leftMap = ui.Map();
var rightMap = ui.Map();
var img1 = ee.Image(mosaico);
var img2 = ee.Image(mosaico2);
var img1_layer = leftMap.layers();
var img2_layer = rightMap.layers();
img1_layer.add(img1);
img2_layer.add(img2);
var img1_label = ui.Label('Landsat - 30m - 1999');
img1_label.style().set('position', 'bottom-left');
var img2_label = ui.Label('Sentinel - 10m - 2022');
img2_label.style().set('position', 'bottom-right');
leftMap.add(img1_label);
rightMap.add(img2_label);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(table,11)