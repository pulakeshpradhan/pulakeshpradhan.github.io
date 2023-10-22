var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);
Map.setCenter(75.78, 27.1052, 9);
var clip=slope.clip(table);
Map.addLayer(clip, {min: 0, max: 4}, 'slope');