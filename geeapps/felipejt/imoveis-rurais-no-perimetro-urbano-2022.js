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
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/felipejt/CAR_PIRA22"
    }) || ee.FeatureCollection("users/felipejt/CAR_PIRA22"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/felipejt/urbpira"
    }) || ee.FeatureCollection("users/felipejt/urbpira"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.8400000000000001,
        "bands": [
          "TCI_R",
          "TCI_G",
          "TCI_B"
        ],
        "min": 18,
        "max": 232,
        "gamma": 1
      }
    }) || {"opacity":0.8400000000000001,"bands":["TCI_R","TCI_G","TCI_B"],"min":18,"max":232,"gamma":1};
//Map.addLayeimageVisParamr(table);
Map.centerObject(table, 12);
var sentinel2 = imageCollection
         .filterBounds(table)
         .filterDate('2021-12-15','2022-01-29')
         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
         .select(['TCI_R','TCI_G','TCI_B']);
//print(sentinel2); 
//Map.addLayer(sentinel2, table);
var mosaico = sentinel2.mosaic().clip(table);
Map.addLayer(mosaico, {opacity: 0.84});
//var img = ee.Image('COPERNICUS/S2_SR/20220119T132231_20220119T132233_T22KHV');
//var fc = ee.FeatureCollection(table);
//var imgClip = img.clipToCollection(fc);
//Map.addLayer(imgClip, imageVisParam);
//Map.addLayer(table4.draw({color: 'white', strokeWidth: 1}), {}, 'drawn');
Map.addLayer(table4.style({color: 'white', width: 1, fillColor: '00000000', neighborhood: 5}), {opacity: 0.5}, 'drawn');
Map.addLayer(table2, {color: 'red'});