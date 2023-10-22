var table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// TUGASSSS
var Ina_border = table.filter(ee.Filter.eq('country_na', 'Indonesia'));
print(Ina_border);
Map.addLayer(Ina_border);
var poly_ina_kiri = ee.Geometry.MultiPoint(95, 6, 95, -11, 118, -11, 118, 6);
var poly_ina_kanan = ee.Geometry.MultiPoint(118, 6, 118, -11, 141, -11, 141, 6);
var centrGeo_ina_kiri = poly_ina_kiri.centroid().buffer(2560348);
var centrGeo_ina_kanan = poly_ina_kanan.centroid().buffer(2560348);
var intersection =centrGeo_ina_kiri.intersection(centrGeo_ina_kanan);
Map.addLayer(intersection, {color: 'green'}, 'intersection');
var union = centrGeo_ina_kiri.union(centrGeo_ina_kanan);
Map.addLayer(union, {color: 'magenta'}, 'union');
var diff1 = centrGeo_ina_kanan.difference(centrGeo_ina_kiri,
ee.ErrorMargin(1));
Map.addLayer(diff1, {color: 'white'}, 'diff1');
var diff2 = centrGeo_ina_kiri.difference(centrGeo_ina_kanan,
ee.ErrorMargin(1));
Map.addLayer(diff2, {color: 'yellow'}, 'diff2');
var symDiff =centrGeo_ina_kiri.symmetricDifference(centrGeo_ina_kanan);
Map.addLayer(symDiff, {color: 'black'}, 'symmetric difference');
var intersectionbaru =
intersection.intersection(Ina_border);
Map.addLayer(intersectionbaru, {color: 'yellow'}, 'Indo & Intersection');
Map.centerObject(intersectionbaru, 5);