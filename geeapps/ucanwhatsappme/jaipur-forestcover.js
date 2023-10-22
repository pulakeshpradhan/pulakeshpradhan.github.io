var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
                  .filterDate('2017-01-01', '2017-12-31');
var forestNonForest = dataset.select('fnf');
var clip=forestNonForest.mean().clip(table);
var forestNonForestVis = {
  min: 1.0,
  max: 3.0,
  palette: ['006400', 'FEFF99', '0000FF'],
};
Map.setCenter(75.78, 27.1052, 9);
Map.addLayer(clip, forestNonForestVis, 'Forest/Non-Forest');