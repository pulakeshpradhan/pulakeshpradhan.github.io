var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                106.75883532948058,
                -6.5561170061173275
              ],
              [
                106.75883532948058,
                -6.655701666592536
              ],
              [
                106.86320544666808,
                -6.655701666592536
              ],
              [
                106.86320544666808,
                -6.5561170061173275
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[106.75883532948058, -6.5561170061173275],
          [106.75883532948058, -6.655701666592536],
          [106.86320544666808, -6.655701666592536],
          [106.86320544666808, -6.5561170061173275]]], null, false),
    Deforestasi = ui.import && ui.import("Deforestasi", "imageVisParam", {
      "params": {
        "opacity": 0.55,
        "bands": [
          "VV"
        ],
        "palette": [
          "ff390c"
        ]
      }
    }) || {"opacity":0.55,"bands":["VV"],"palette":["ff390c"]};
// Pemetaan wilayah Deforestasi
// Konsep dasarnya adalah mengacu pada perubahan nilai band setiap raster dengan membandingkan secara temporal citra, sehingga dihasilkan poligon deforestasi secara spasial
// Citra yang digunakan merupakan citra yang direkam pada periode kemarau dan kemudian dibandingkan
// Citra Sentinel 1 menunjukan terrain, basah/kering permukaan dan landuse
// Apabila nilai raster semakin tinggi/mengubah warna menjadi terang berarti ada perubahan landuse sebagai indikasi adanya deforestasi
// Tempat bisa disesuaikan dengan menggerakan roi/geometry lalu 'run'
// Script ini sejatinya belum teruji
// Rizki Pramayuda (Bachelor Degree of Geography Departemen 2017)
// Menampilkan Citra Sentinel-1 dengan VV Polarisation
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterBounds(roi)
.select(['VV'])
// Waktu Sebelum dan Sesudah Kejadian
var Sebelum = s1.filterDate('2018-06-01', '2018-08-03').mosaic().clip(roi);
var Sesudah = s1.filterDate('2019-06-01', '2019-08-03').mosaic().clip(roi);
// Menentukan ambang batas penghalusan area banjir
var Radius_Penghalusan = 10; 
var Ambang_atas = -3;
var Beda_Kehalusan = Sebelum.focal_median(Radius_Penghalusan)
                            .subtract(Sesudah.focal_median(Radius_Penghalusan));
var Ambang_Perbedaan = Beda_Kehalusan.lt(Ambang_atas);
// Menampilkan Hasil
Map.centerObject(roi, 13);
Map.addLayer(Sebelum, {min:-30,max:0}, 'Sebelum');
Map.addLayer(Sesudah, {min:-30,max:0}, 'Sesudah');
Map.addLayer(Ambang_Perbedaan.updateMask(Ambang_Perbedaan), Deforestasi,'Deforestasi');