var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Pertanian_Azizah"
    }) || ee.FeatureCollection("users/Surabaya/Pertanian_Azizah"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "max": 4,
        "palette": [
          "ff4700",
          "ff7f12",
          "ffe10c",
          "1bff0c",
          "3f9728"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"max":4,"palette":["ff4700","ff7f12","ffe10c","1bff0c","3f9728"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "max": 4,
        "palette": [
          "ff4700",
          "ff7f12",
          "ffe10c",
          "1bff0c",
          "3f9728"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"max":4,"palette":["ff4700","ff7f12","ffe10c","1bff0c","3f9728"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "max": 4,
        "palette": [
          "ff4700",
          "ff7f12",
          "ffe10c",
          "1bff0c",
          "3f9728"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"max":4,"palette":["ff4700","ff7f12","ffe10c","1bff0c","3f9728"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "max": 4,
        "palette": [
          "ff4700",
          "ff7f12",
          "ffe10c",
          "1bff0c",
          "3f9728"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"max":4,"palette":["ff4700","ff7f12","ffe10c","1bff0c","3f9728"]};
//cloud mask
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 5);
  var cloudsBitMask = (1 << 7);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask); }
//(Palette Warna)
var vizParamsRGB = {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,};
var vizParamsRGB7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 3000, };
//(Palette Warna 2)
var vizParamskuantif = {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3,};
var vizParamskuantif7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3,};
//Data Citra Landsat
var col012020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-01-01','2020-10-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col022020= ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-02-01','2020-02-29')
          .filterBounds(table);
          Map.centerObject(table,12);
var col032020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-03-01','2020-03-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col042020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-04-01','2020-04-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col052020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-05-01','2020-05-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col062020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-06-01','2020-06-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col072020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-07-01','2020-07-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col082020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-08-01','2020-08-30')
          .filterBounds(table);
          Map.centerObject(table,12);
var col092020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-09-01','2020-09-30')
          .filterBounds(table);
          Map.centerObject(table,12);
//Composite Citra
var image012020 = col012020.median().clip(table);
var image022020 = col022020.median().clip(table);
var image032020 = col032020.median().clip(table);
var image042020 = col042020.median().clip(table);
var image052020 = col052020.median().clip(table);
var image062020 = col062020.median().clip(table);
var image072020 = col072020.median().clip(table);
var image082020 = col082020.median().clip(table);
var image092020 = col092020.median().clip(table);
//NDVI
var ndvi012020 = image012020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi022020 = image022020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi032020 = image032020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi042020 = image042020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi052020 = image052020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi062020 = image062020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi072020 = image012020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi082020 = image012020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi092020 = image012020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var januari = ndvi012020.lt(-0.03).add(ndvi012020.gt(-0.03)).add(ndvi012020.gt(0.15))
.add(ndvi012020.gt(0.26)).add(ndvi012020.gt(0.36));
januari = januari.updateMask(januari.neq(0));
Map.addLayer(januari, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Januari');
var Februari = ndvi022020.lt(-0.03).add(ndvi022020.gt(-0.03)).add(ndvi022020.gt(0.15))
.add(ndvi022020.gt(0.26)).add(ndvi022020.gt(0.36));
Februari = Februari.updateMask(Februari.neq(0));
Map.addLayer(Februari, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Februari');
var Maret = ndvi032020.lt(-0.03).add(ndvi032020.gt(-0.03)).add(ndvi032020.gt(0.15))
.add(ndvi032020.gt(0.26)).add(ndvi032020.gt(0.36));
Maret = Maret.updateMask(Maret.neq(0));
Map.addLayer(Maret, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Maret');
var April = ndvi042020.lt(-0.03).add(ndvi042020.gt(-0.03)).add(ndvi042020.gt(0.15))
.add(ndvi042020.gt(0.26)).add(ndvi042020.gt(0.36));
April = April.updateMask(April.neq(0));
Map.addLayer(April, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'April');
var Mei = ndvi052020.lt(-0.03).add(ndvi052020.gt(-0.03)).add(ndvi052020.gt(0.15))
.add(ndvi052020.gt(0.26)).add(ndvi052020.gt(0.36));
Mei = Mei.updateMask(Mei.neq(0));
Map.addLayer(Mei, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Mei');
var Juni = ndvi062020.lt(-0.03).add(ndvi062020.gt(-0.03)).add(ndvi062020.gt(0.15))
.add(ndvi062020.gt(0.26)).add(ndvi062020.gt(0.36));
Juni = Juni.updateMask(Juni.neq(0));
Map.addLayer(Juni, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Juni');
var Juli = ndvi072020.lt(-0.03).add(ndvi072020.gt(-0.03)).add(ndvi072020.gt(0.15))
.add(ndvi072020.gt(0.26)).add(ndvi072020.gt(0.36));
Juli = Juli.updateMask(Juli.neq(0));
Map.addLayer(Juli, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Juli');
var Agustus = ndvi082020.lt(-0.03).add(ndvi082020.gt(-0.03)).add(ndvi082020.gt(0.15))
.add(ndvi082020.gt(0.26)).add(ndvi082020.gt(0.36));
Agustus = Agustus.updateMask(Agustus.neq(0));
Map.addLayer(Agustus, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'Agustus');
var September = ndvi092020.lt(-0.03).add(ndvi092020.gt(-0.03)).add(ndvi092020.gt(0.15))
.add(ndvi092020.gt(0.26)).add(ndvi092020.gt(0.36));
September = September.updateMask(September.neq(0));
Map.addLayer(September, {min: 0, max: 4, palette: ['ff4700','ff7f12','ffe10c','1bff0c','3f9728']}, 'September');
//Gabung NDVI
var ndvi =(ndvi012020.rename('01')).addBands(ndvi022020.rename('02')).addBands(ndvi032020.rename('03')).addBands(ndvi042020.rename('04'))
.addBands(ndvi052020.rename('05')).addBands(ndvi062020.rename('06')).addBands(ndvi072020.rename('07')).addBands(ndvi082020.rename('08')).addBands(ndvi092020.rename('09'))
print('NDVI', ndvi );
var chartmean = ui.Chart.image.regions(ndvi,table,ee.Reducer.mean(), 30, 'id')
                .setOptions({
                title:'Rata Rata Nilai Indeks Vegetasi',
                vAxis:{title:'Indeks'}});
                print(chartmean);
var chartmean = ui.Chart.image.regions(ndvi,table,ee.Reducer.min(), 30, 'id')
                .setOptions({
                title:' Nilai Minimun Indeks Vegetasi',
                vAxis:{title:'Indeks'}});
                print(chartmean);
//--------------------------------------------------------------------------
//                        SECTION 12- LEGENDA
//--------------------------------------------------------------------------
//Penambahan Title 
Map.add(ui.Label(
    'Peta Indeks Kekeringan Berdsarkan Nilai NDVI', {fontWeight: 'bold', fontSize: '24px'}));
Map.add(ui.Label(
    'By : Nur Azizah Affandy', {fontWeight: 'bold', fontSize: '12px', position: 'bottom-left',}));
//Lagenda TVDI
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'KELAS NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
// Creates the content of the legend
var content = function(color, label) {
      // Create the color boxes
      var box = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};                
var classcolor = ['ff4700','ff7f12','ffe10c','1bff0c','3f9728'];
var labelName = ['(Lahan Tidak Bervegetasi)',' (Kehijauan Sangat Rendah)','(Kehijauan Rendah)'
                ,'(Kehijauan Sedang)',' (Kehijauan Tinggi)'];
// Combine legend colou and labels
for (var i = 0; i < 5; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
Map.add(legend);