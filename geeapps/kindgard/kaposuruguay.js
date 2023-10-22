var image = ui.import && ui.import("image", "image", {
      "id": "users/fernandobezares/Kapos_WGS84"
    }) || ee.Image("users/fernandobezares/Kapos_WGS84"),
    GAUL = ui.import && ui.import("GAUL", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var country = GAUL.filterMetadata('ADM0_NAME', 'equals', 'Uruguay')
var image = image.mask(image).clip(country)
Map.addLayer(image.randomVisualizer())
Map.centerObject(country,7)