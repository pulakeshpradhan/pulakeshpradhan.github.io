var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "MODIS/006/MOD11A2"
    }) || ee.ImageCollection("MODIS/006/MOD11A2"),
    AYACUCHO = ui.import && ui.import("AYACUCHO", "table", {
      "id": "users/fhuamani/AYACUCHO"
    }) || ee.FeatureCollection("users/fhuamani/AYACUCHO"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Night_1km"
        ],
        "min": 13280,
        "max": 14663,
        "palette": [
          "163dff",
          "29d8ff",
          "fff823",
          "ff8662",
          "ff0404"
        ]
      }
    }) || {"opacity":1,"bands":["LST_Night_1km"],"min":13280,"max":14663,"palette":["163dff","29d8ff","fff823","ff8662","ff0404"]};
Map.addLayer(AYACUCHO,{}, 'AYACUCHO')
var modis = ee.ImageCollection('MODIS/006/MOD11A2')
            .filterBounds(AYACUCHO)
            .filterDate('2018-07-02', '2018-07-10').mean();
print (modis);
Map.addLayer(modis,{}, 'MODIS');
var shape = ee.FeatureCollection(AYACUCHO)
var clip = modis.clipToCollection(shape);
Map.addLayer(clip, imageVisParam, 'CONT AYACUCHO');