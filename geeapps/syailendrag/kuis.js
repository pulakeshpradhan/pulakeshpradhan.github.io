//Kuis
//Mencari keliling setengah bumi
var lineStr = ee.Geometry.LineString([[90, 0], [-90, 0]]);
print(lineStr);
Map.addLayer(lineStr);
var linLen = lineStr.length();
print('Keliling Setengah Bumi Adalah: ', linLen);
//Menghitung Panjang Indonesia
var bujurIna = ee.Geometry.LineString([[95, 0], [141, 0]]);
print(bujurIna);
Map.addLayer(bujurIna);
var bujurlen = bujurIna.length();
print('panjang Indonesia dari 95BT-141BT Adalah: ',bujurlen);
//Menghitung Lintang Indonesia
var lintangIna = ee.Geometry.LineString([[120, 6], [120, -11]]);
print(lintangIna);
Map.addLayer(lintangIna);
var lintanglen = lintangIna.length();
print('Panjang Indonesia dari 6LU-11LS Adalah: ', lintanglen);