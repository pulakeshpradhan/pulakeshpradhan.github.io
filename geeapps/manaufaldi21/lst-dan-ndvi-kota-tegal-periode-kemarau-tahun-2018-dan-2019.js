var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/manaufaldi21/IDN_adm2"
    }) || ee.FeatureCollection("users/manaufaldi21/IDN_adm2");
//Location
var Nama_kabupaten = ['Kota Tegal']
var kabupaten = table
.filter(ee.Filter.inList('NAME_2', Nama_kabupaten));
//Map.addLayer(kabupaten, {color:"Green"},"Tegal ");
Map.centerObject(kabupaten, 13);
//satellite
var landsat8jul18 = L8
.filterDate('2018-07-01','2018-07-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
var landsat8jul19 = L8
.filterDate('2019-07-01','2019-07-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
var landsat8agus18 = L8
.filterDate('2018-08-01','2018-08-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
var landsat8agus19 = L8
.filterDate('2019-08-01','2019-08-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
var landsat8oct18 = L8
.filterDate('2018-10-01','2018-10-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
var landsat8oct19 = L8
.filterDate('2019-10-01','2019-10-31')
.sort('CLOUD_COVER')
.mean()
.clip(kabupaten)
//Band Landsat JULI
//2018
var BLUEjul18 = landsat8jul18.select('B2')
var REDjul18 = landsat8jul18.select('B4')
var NIRjul18 = landsat8jul18.select('B5')
var thermaljul18 = landsat8jul18.select('B10')
//2019
var BLUEjul19 = landsat8jul19.select('B2')
var REDjul19 = landsat8jul19.select('B4')
var NIRjul19 = landsat8jul19.select('B5')
var thermaljul19 = landsat8jul19.select('B10')
//Band Landsat AGUSTUS
//2018
var BLUEagus18 = landsat8agus18.select('B2')
var REDagus18 = landsat8agus18.select('B4')
var NIRagus18 = landsat8agus18.select('B5')
var thermalagus18 = landsat8agus18.select('B10')
//2019
var BLUEagus19 = landsat8agus19.select('B2')
var REDagus19 = landsat8agus19.select('B4')
var NIRagus19 = landsat8agus19.select('B5')
var thermalagus19 = landsat8agus19.select('B10')
//Band Landsat OCTOBER
//2018
var BLUEoct18 = landsat8oct18.select('B2')
var REDoct18 = landsat8oct18.select('B4')
var NIRoct18 = landsat8oct18.select('B5')
var thermaloct18 = landsat8oct18.select('B10')
//2019
var BLUEoct19 = landsat8oct19.select('B2')
var REDoct19 = landsat8oct19.select('B4')
var NIRoct19 = landsat8oct19.select('B5')
var thermaloct19 = landsat8oct19.select('B10')
var citraParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.089,
  max: 0.1824,
  gamma: [1, 1, 1]
};
//ANALISIS MODE
//Normallized Difference Vegetation Index (NDVI) JULI
//2018
var landsat8_NDVIjul18 = NIRjul18.subtract(REDjul18).divide(NIRjul18.add(REDjul18)).rename('NDVIjul18')
//2019
var landsat8_NDVIjul19 = NIRjul19.subtract(REDjul19).divide(NIRjul19.add(REDjul19)).rename('NDVIjul19')
//Normallized Difference Vegetation Index (NDVI) AGUSTUS
//2018
var landsat8_NDVIagus18 = NIRagus18.subtract(REDagus18).divide(NIRagus18.add(REDagus18)).rename('NDVIagus18')
//2019
var landsat8_NDVIagus19 = NIRagus19.subtract(REDagus19).divide(NIRagus19.add(REDagus19)).rename('NDVIagus19')
//Normallized Difference Vegetation Index (NDVI) OCTOBER
//2018
var landsat8_NDVIoct18 = NIRoct18.subtract(REDoct18).divide(NIRoct18.add(REDoct18)).rename('NDVIoct18')
//2019
var landsat8_NDVIoct19 = NIRoct19.subtract(REDoct19).divide(NIRoct19.add(REDoct19)).rename('NDVIoct19')
var NDVIParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
// - Land Surface Temperatur (LST) JULI
//2018
var landsat8_LSTjul18 = landsat8jul18.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.3323))/0.987)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIjul18, 
        'B10': thermaljul18
      })
//2019
var landsat8_LSTjul19 = landsat8jul19.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.4149))/1.0237)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIjul19, 
        'B10': thermaljul19
      })
// - Land Surface Temperatur (LST) AGUSTUS
//2018
var landsat8_LSTagus18 = landsat8agus18.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.3821))/0.9307)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIagus18, 
        'B10': thermalagus18
      })
//2019
var landsat8_LSTagus19 = landsat8agus19.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.2947))/0.7561)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIagus19, 
        'B10': thermalagus19
      })
// - Land Surface Temperatur (LST) OCTOBER
//2018
var landsat8_LSToct18 = landsat8oct18.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.1392))/0.6167)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIoct18, 
        'B10': thermaloct18
      })
//2019
var landsat8_LSToct19 = landsat8oct19.expression(
      '(B10/(1+(10.895*B10/14388)*(2.3028*log((0.017*(((ndvi-(-0.3694))/0.8243)**2)+0.963)))))-273.1',{
        'ndvi': landsat8_NDVIoct19, 
        'B10': thermaloct19
      })
var LSTParams = {min: 20, max: 50, palette: ['white', 'pink', 'red']};
//Output Layer
//Map.addLayer(landsat8, citraParams , 'landsat8 Citra Kota Tegal' )
//Map.addLayer(landsat8_NDVI, NDVIParams, 'NDVI Kota Tegal' )
//Map.addLayer(landsat8_LSToct19, LSTParams, 'LST Kota Tegal' )
//KLASIFIKASI NDVI
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#785300" quantity="0" label="0" />' + // Badan Air
      '<ColorMapEntry color="#e7a000" quantity="0.090" label="0.090" />' + // Lahan Terbuka
      '<ColorMapEntry color="#d5e73c" quantity="0.2" label="0.2" />' + // Vegetasi Jarang
      '<ColorMapEntry color="#85bc2d" quantity="0.5" label="0.5" />' + // Vegetasi Sedang
      '<ColorMapEntry color="#22741d" quantity="1" label="1" />' + // Vegetasi Padat
    '</ColorMap>' +
  '</RasterSymbolizer>';
//Menampilkan NDVI CLASSES 2018
//Juli
var NDVIclassjul18=landsat8_NDVIjul18.sldStyle(intervals);
Map.addLayer(NDVIclassjul18, {}, 'NDVI Juli 2018');
//Agustus
var NDVIclassagus18=landsat8_NDVIagus18.sldStyle(intervals);
Map.addLayer(NDVIclassagus18, {}, 'NDVI Agustus 2018');
//October
var NDVIclassoct18=landsat8_NDVIoct18.sldStyle(intervals);
Map.addLayer(NDVIclassoct18, {}, 'NDVI October 2018');
//Menampilkan NDVI CLASSES 2019
//Juli
var NDVIclassjul19=landsat8_NDVIjul19.sldStyle(intervals);
Map.addLayer(NDVIclassjul19, {}, 'NDVI Juli 2019');
//September
var NDVIclassagus19=landsat8_NDVIagus19.sldStyle(intervals);
Map.addLayer(NDVIclassagus19, {}, 'NDVI Agustus 2019');
//October
var NDVIclassoct19=landsat8_NDVIoct19.sldStyle(intervals);
Map.addLayer(NDVIclassoct19, {}, 'NDVI October 2019');
//Membuat Legenda Kelas NDVI
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Klasifikasi NDVI ',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
//-------------------------------------------------------------------------
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
var palette =['785300', 'e7a000', 'd5e73c', '85bc2d', '22741d'];
var names = ['>0','0 - 0.09','0.09 - 0.2', '0.2 - 0.5','0.5 - 1'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
//KLASIFIKASI LST
var intervals2 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#92ff02" quantity="28" label="28" />' + 
      '<ColorMapEntry color="#ffe000" quantity="32" label="32" />' + 
      '<ColorMapEntry color="#ff5300" quantity="36" label="36" />' + 
      '<ColorMapEntry color="#ef0202" quantity="45" label="45" />' + 
    '</ColorMap>' +
  '</RasterSymbolizer>';
//Menampilkan LST CLasses 2018
//Juli
var LSTclassjul18=landsat8_LSTjul18.sldStyle(intervals2);
Map.addLayer(LSTclassjul18, {}, 'LST Juli 2018');
//Agustus
var LSTclassagus18=landsat8_LSTagus18.sldStyle(intervals2);
Map.addLayer(LSTclassagus18, {}, 'LST Agustus 2018');
//October
var LSTclassoct18=landsat8_LSToct18.sldStyle(intervals2);
Map.addLayer(LSTclassoct18, {}, 'LST October 2018');
//Menampilkan LST CLasses 2019
//Juli
var LSTclassjul19=landsat8_LSTjul19.sldStyle(intervals2);
Map.addLayer(LSTclassjul19, {}, 'LST Juli 2019');
//September
var LSTclassagus19=landsat8_LSTagus19.sldStyle(intervals2);
Map.addLayer(LSTclassagus19, {}, 'LST Agustus 2019');
//October
var LSTclassoct19=landsat8_LSToct19.sldStyle(intervals2);
Map.addLayer(LSTclassoct19, {}, 'LST October 2019');
//Membuat Legenda LST
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle2 = ui.Label({
  value: 'Klasifikasi LST ',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend2.add(legendTitle2);
Map.add(legend2);
//-------------------------------------------------------------------------
var makeRow2 = function(color, name) {
        var colorBox2 = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description2 = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox2, description2],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette2 =['92ff02', 'ffe000', 'ff5300', 'ef0202'];
var names2 = ['Rendah','Cukup Rendah', 'Cukup Tinggi','Tinggi'];
for (var i = 0; i < 4; i++) {
  legend2.add(makeRow2(palette2[i], names2[i]));
  }