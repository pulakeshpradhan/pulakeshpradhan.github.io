var pres = ui.import && ui.import("pres", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/kalinggatitonnurihsan/Bandung_shp"
    }) || ee.FeatureCollection("users/kalinggatitonnurihsan/Bandung_shp"),
    radiation = ui.import && ui.import("radiation", "imageCollection", {
      "id": "IDAHO_EPSCOR/TERRACLIMATE"
    }) || ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE"),
    LST = ui.import && ui.import("LST", "imageCollection", {
      "id": "MODIS/006/MOD11A2"
    }) || ee.ImageCollection("MODIS/006/MOD11A2"),
    AOD = ui.import && ui.import("AOD", "imageCollection", {
      "id": "MODIS/006/MCD19A2_GRANULES"
    }) || ee.ImageCollection("MODIS/006/MCD19A2_GRANULES"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/kalinggatitonnurihsan/Indonesia_shp"
    }) || ee.FeatureCollection("users/kalinggatitonnurihsan/Indonesia_shp"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                91.11647254066771,
                9.121917667170404
              ],
              [
                91.11647254066771,
                -12.534968516572102
              ],
              [
                147.3664725406677,
                -12.534968516572102
              ],
              [
                147.3664725406677,
                9.121917667170404
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
        [[[91.11647254066771, 9.121917667170404],
          [91.11647254066771, -12.534968516572102],
          [147.3664725406677, -12.534968516572102],
          [147.3664725406677, 9.121917667170404]]], null, false),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/kalinggatitonnurihsan/hujan_januari2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujan_januari2019"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/kalinggatitonnurihsan/hujanagus2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanagus2019"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/kalinggatitonnurihsan/hujanapril2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanapril2019"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/kalinggatitonnurihsan/hujandes2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujandes2019"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/kalinggatitonnurihsan/hujanfebruari2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanfebruari2019"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/kalinggatitonnurihsan/hujanjuli2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanjuli2019"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/kalinggatitonnurihsan/hujanjuni2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanjuni2019"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/kalinggatitonnurihsan/hujanmaret2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanmaret2019"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/kalinggatitonnurihsan/hujanmei2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanmei2019"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/kalinggatitonnurihsan/hujannov2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujannov2019"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/kalinggatitonnurihsan/hujanokt2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanokt2019"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/kalinggatitonnurihsan/hujanseptem2019"
    }) || ee.Image("users/kalinggatitonnurihsan/hujanseptem2019"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/kalinggatitonnurihsan/pv_sosioeko_ditampilin_Polyg1"
    }) || ee.Image("users/kalinggatitonnurihsan/pv_sosioeko_ditampilin_Polyg1"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/kalinggatitonnurihsan/skor_pv_efektif_PolygonToRas1"
    }) || ee.Image("users/kalinggatitonnurihsan/skor_pv_efektif_PolygonToRas1"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/kalinggatitonnurihsan/SosioEko1fix"
    }) || ee.Image("users/kalinggatitonnurihsan/SosioEko1fix");
//define daerah
var Indonesia = ee.FeatureCollection("users/cokrosantoso/Indonesia");
var Nama_Provinsi = ['Jawa Barat']
var daerah = Indonesia.filter(ee.Filter.inList('NAME_1',Nama_Provinsi));
// var daerah = geometry2;
// Map.addLayer(daerah, {color:"green"},"IDN");
Map.centerObject(daerah,5);
//banyaknya hari hujan selama satu tahun
var hari = image.add(image2).add(image3).add(image4).add(image5)
            .add(image6).add(image7).add(image8).add(image9)
            .add(image10).add(image11).add(image12)
//data shortwave radiation
var swr =radiation
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('srad')
.mean()
.multiply(0.1)
.multiply(12)
.clip(daerah);
//LST modis
var lst = LST
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.mean()
.multiply(0.02).subtract(273.15)
.clip(daerah);
//presipitasi
var presipitasi = pres
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('precipitation')
.mean()
.clip(daerah);
//AOD
var aod = AOD
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('Optical_Depth_047')
.mean()
.multiply(0.001)
.clip(daerah);
//smoothing data yang didapat
var SMOOTHING_RADIUS = 1000;
var SMOOTHING_RADIUS1 = 1000;
var hari_smoothed = hari.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
var swr_smoothed = swr.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
var lst_smoothed = lst.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
var aod_smoothed = aod.focal_median(SMOOTHING_RADIUS1, 'circle', 'meters');
//koreksi suhu
var kor_suhu =(lst_smoothed.subtract(45)).multiply(0.094);
//koreksi Atmosfer
var kor_atmosfer = (aod_smoothed.multiply(hari_smoothed)).multiply(0.035);
//koreksi hujan
var kor_hujan = hari_smoothed.multiply(0.035);
// koreksi AOD
var kor_AOD = aod_smoothed.multiply(0.035);
// ukuran piksel 10m
// efisiensi 0.15
//pv teoritik 1 bulan
var pv_teoritik = swr_smoothed.multiply(0.15).multiply(365);
//pv efektif 1bulan( -15 untuk membuat positif hasil)
var pv_efektif = swr_smoothed.multiply(-0.15).multiply(365).multiply((kor_suhu).add(kor_atmosfer).subtract(1));
//koresi suhu
var pv_efektif_suhu = swr_smoothed.multiply(-0.15).multiply(365).multiply((kor_suhu).subtract(1));
//koreksi atmosfer
var pv_efektif_atmosfer = swr_smoothed.multiply(-0.15).multiply(365).multiply(kor_atmosfer.subtract(1));
//koreksi hujan
var pv_efektif_hujan = swr_smoothed.multiply(-0.15).multiply(365).multiply(kor_hujan.subtract(1));
//koreksi AOD
var pv_efektif_aod = swr_smoothed.multiply(-0.15).multiply(365).multiply(kor_AOD.subtract(1));
// Map.addLayer(pv_efektif, {color:'RRGGBB'}, 'pv efektif');
// Map.addLayer(hari, {color:'RRGGBB'}, 'hari');
// Map.addLayer(lst, {color:'RRGGBB'}, 'lst');
// Map.addLayer(aod, {color:'RRGGBB'}, 'aod');
// Map.addLayer(swr, {color:'RRGGBB'}, 'swr');
var PVVis = {
  min: 0,
  max: 500000,
  palette: ['3aff00','f6ff04','ff3900'],
};
//Map.addLayer(pv_efektif.clip(daerah), PVVis, "Potensi Energi (W/m/Tahun)",false)
//layout kesesuaian
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';          
var kesesuaian_classified = image.sldStyle(intervals1);
Map.addLayer(image14.sldStyle(intervals1), {}, 'Kesesuaian PV');
Map.addLayer(image15.sldStyle(intervals1), {}, 'Kesesuaian SosioEkoGeo');
Map.addLayer(image13.sldStyle(intervals1), {}, 'Kesesuaian ');
//--------Legenda Kesesuaian
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 8px'
  }});
var legendTitle = ui.Label({
  value: 'Kesesuaian',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
    // Judul
  var legendTitle1 = ui.Label({
  value: 'Tingkat Keesesuaian Pembangunan PLTS di Indonesia',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
Map.add(legendTitle1);
var makeRow = function(color, name) {
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['ff3900','f6ff04','3aff00','04fddf','1008ff'];
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
//export a cloud -optimized geotiff
Export.image.toDrive({
  image: aod,
  description: 'aod_jabar',
  folder: 'pv_efektif',
  scale: 1000,
  region:daerah,
  maxPixels: 1000000000000,
  fileFormat: 'GeoTIFF'
});