var table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// var str = ee.String('Ini contoh string ya!!');
// var num = ee.Number(5);
// var arr = ee.Array([[5, 2, 3], [-2, 7, 10], [6, 6, 9]]);
// var lis = ee.List([5, 'five', 6, 'six']);
// var dict = ee.Dictionary({five: 5, six: 6})
// print(num);
// print(str);
// print(arr);
// print(lis);
// print(dict);
// var poi = ee.Geometry.Point(0, 0);
// print(poi);
// Map.addLayer(poi);
// var multi = ee.Geometry.MultiPoint(0, 0, 45, 0, 0, -45);
// print(multi);
// Map.addLayer(multi);
// var lineStr = ee.Geometry.LineString([[0, 0], [45, 0], [0, -45]]);
// print(lineStr);
// Map.addLayer(lineStr);
// var linLen = lineStr.length();
// print(linLen);
// var lineStr = ee.Geometry.LineString([[0,0], [0, 180]]);
// print(lineStr);
// Map.addLayer(lineStr);
// var linLen = lineStr.length();
// print(linLen);
var lineStr = ee.Geometry.LineString([[95,0], [141, 0]]);
print(lineStr);
Map.addLayer(lineStr);
var linLen = lineStr.length();
print(linLen);
var lineStr2 = ee.Geometry.LineString([[95,6 ], [95, -11]]);
print(lineStr2);
Map.addLayer(lineStr2);
var linLen2 = lineStr2.length();
print(linLen2);
 //Indonesia
var poly_ina = ee.Geometry.MultiPoint(95, 6, 95, -11, 141, -11, 141, 6);
var poly_ina2 = ee.Geometry.LineString(95, 6, 95, -11, 141, -11, 141, 6);
var poly_ina3 = ee.Geometry.Polygon(95, 6, 95, -11, 141, -11, 141, 6);
Map.addLayer(poly_ina);
Map.addLayer(poly_ina2);
Map.addLayer(poly_ina3);
var centrGeo_ina = poly_ina3.centroid();
Map.addLayer(centrGeo_ina);
var buffGeo_ina1 = centrGeo_ina.buffer(2560348);
Map.addLayer(buffGeo_ina1);
var buffGeo_ina2 = centrGeo_ina.buffer(939958);
Map.addLayer(buffGeo_ina2);
var poly_ina_kiri = ee.Geometry.MultiPoint(95, 6, 95, -11, 118, -11, 118, 6);
var poly_ina_kanan = ee.Geometry.MultiPoint(118, 6, 118, -11, 141, -11, 141, 6);
 var centrGeo_ina_kiri = poly_ina_kiri.centroid().buffer(2560348);
 var centrGeo_ina_kanan = poly_ina_kanan.centroid().buffer(2560348);
Map.addLayer(centrGeo_ina_kiri, {color: 'red'}, 'poly1');
Map.addLayer(centrGeo_ina_kanan, {color: 'blue'}, 'poly2');
 var intersection = centrGeo_ina_kiri.intersection(centrGeo_ina_kanan);
Map.addLayer(intersection, {color: 'green'}, 'intersection');
var union = centrGeo_ina_kiri.union(centrGeo_ina_kanan);
Map.addLayer(union, {color: 'magenta'}, 'union');
var diff1 = centrGeo_ina_kanan.difference(centrGeo_ina_kiri);
Map.addLayer(diff1, {color: 'white'}, 'diff1');
var diff2 = centrGeo_ina_kiri.difference(centrGeo_ina_kanan,
ee.ErrorMargin(1));
Map.addLayer(diff2, {color: 'yellow'}, 'diff2');
var symDiff =
centrGeo_ina_kiri.symmetricDifference(centrGeo_ina_kanan);
Map.addLayer(symDiff, {color: 'black'}, 'symmetric difference');
//identifikasi pusat image dan tingkat zoom
Map.centerObject(intersection, 3);
// menghitung luas dalam km2
print('Polygon area: ', poly_ina3.area().divide(1000 * 1000));
var Ina_border = table.filter(ee.Filter.eq('country_na', 'Indonesia'));
print(Ina_border);
Map.addLayer(Ina_border);
var intersection = intersection.intersection(Ina_border);
Map.addLayer(intersection, {color: 'blue'}, '2intersection');