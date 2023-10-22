var change = ui.import && ui.import("change", "image", {
      "id": "users/nitamihaidaniel/romania/change_2019"
    }) || ee.Image("users/nitamihaidaniel/romania/change_2019"),
    B432 = ui.import && ui.import("B432", "image", {
      "id": "users/nitamihaidaniel/romania/s2_ro_natural_2019"
    }) || ee.Image("users/nitamihaidaniel/romania/s2_ro_natural_2019"),
    judete = ui.import && ui.import("judete", "table", {
      "id": "users/nitamihaidaniel/Administrative_unite_2nd_Order_wgs"
    }) || ee.FeatureCollection("users/nitamihaidaniel/Administrative_unite_2nd_Order_wgs"),
    B1184 = ui.import && ui.import("B1184", "image", {
      "id": "users/nitamihaidaniel/romania/s2_false_2019_romania"
    }) || ee.Image("users/nitamihaidaniel/romania/s2_false_2019_romania"),
    NDVI = ui.import && ui.import("NDVI", "image", {
      "id": "users/nitamihaidaniel/romania/ndvi_2019_romania"
    }) || ee.Image("users/nitamihaidaniel/romania/ndvi_2019_romania");
var s1 = ['#ff54d2', '#e7ff64', '#4cff41', '#06ba1c'];
Map.addLayer(change, {bands: 'VV', min: 0.5, max: 1.5, palette: s1 }, 'change');
Map.addLayer(B432, {min:450, max:1650}, 'Natural color');
Map.setCenter(26.5498783, 46.178936, 12);
Map.addLayer(NDVI, { min: 0.5456162441635737, max: 0.8597981653099009, palette: ['#ffded2','#ca9c6d','#edff56','#4dff6b','#2bc60f','#316a3b'] }, 'NDVI');
Map.addLayer(B1184, {min:300, max:4000}, 'False color');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: judete,
  color: 1,
  width: 3
});