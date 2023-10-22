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
    }) || ee.Image("users/nitamihaidaniel/romania/ndvi_2019_romania"),
    habitate = ui.import && ui.import("habitate", "table", {
      "id": "users/nitamihaidaniel/poim_braila/habitate_forestiere_braila_3857"
    }) || ee.FeatureCollection("users/nitamihaidaniel/poim_braila/habitate_forestiere_braila_3857");
var s1 = ['#ff54d2', '#e7ff64', '#4cff41', '#06ba1c'];
Map.addLayer(change, {bands: 'VV', min: 0.5, max: 1.5, palette: s1 }, 'change');
Map.addLayer(B432, {min:450, max:1650}, 'Natural color', false);
Map.setCenter(26.75436,44.64297, 10);
Map.addLayer(NDVI, { min: 0.5456162441635737, max: 0.8597981653099009, palette: ['#ffded2','#ca9c6d','#edff56','#4dff6b','#2bc60f','#316a3b'] }, 'NDVI', false);
Map.addLayer(B1184, {min:300, max:4000}, 'False color', false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var outlines = empty.paint({
  featureCollection: habitate,
  color: 'habitat',
  width: 1
});
var palette = ['FF0000', '00FF00', '0000FF'];
Map.addLayer(outlines, {palette: palette, max: 14}, 'different color edges');