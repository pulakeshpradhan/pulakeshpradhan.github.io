// Hitung Keliling setengah bumi
var KelSetengah = ee.Geometry.LineString([[0, 90], [0, -90]]);
print(KelSetengah);
Map.addLayer(KelSetengah);
var keliling = KelSetengah.length();
print(keliling);
// Menghitung Panjang Indonesia dari 95 BT sampai 141 BT 
var PjgBujur = ee.Geometry.LineString([[95, 0], [141, 0]]);
print(PjgBujur);
Map.addLayer(PjgBujur);
var panjangbujurindo = PjgBujur.length();
print(panjangbujurindo);
// Menghitung Panjang Indonesia dari 6 BT sampai -11 BT 
var PjgLintang = ee.Geometry.LineString([[130, 6], [130, -11]]);
print(PjgLintang);
Map.addLayer(PjgLintang);
var panjanglintangindo = PjgLintang.length();
print(panjanglintangindo);