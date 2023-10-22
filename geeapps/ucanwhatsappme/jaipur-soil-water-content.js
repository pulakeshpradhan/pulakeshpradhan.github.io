var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01");
var visualization = {
  bands: ['b0'],
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
Map.centerObject(dataset);
var clip=dataset.clip(table);
Map.setCenter(75.78, 27.1052, 9);
Map.addLayer(clip, visualization, "Soil water content at 33kPa (field capacity)");