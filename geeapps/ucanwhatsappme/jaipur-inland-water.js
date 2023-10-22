var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset = ee.ImageCollection('GLCF/GLS_WATER');
var water = dataset.select('water');
var waterVis = {
  min: 1.0,
  max: 4.0,
  palette: ['FAFAFA', '00C5FF', 'DF73FF', '828282', 'CCCCCC'],
};
var clip=water.mean().clip(table);
Map.addLayer(clip, waterVis, 'Water');
Map.setCenter(75.78, 27.1052, 9);