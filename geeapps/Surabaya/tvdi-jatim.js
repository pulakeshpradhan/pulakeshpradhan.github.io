var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Jatim"
    }) || ee.FeatureCollection("users/Surabaya/Jatim"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/Surabaya/pointtvdi"
    }) || ee.FeatureCollection("users/Surabaya/pointtvdi");
//JUMA MAULANA & FILSA BIORESITA
//cloud mask
function wakwaw(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
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
//Import Data Citra
var col2021 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
              .map(wakwaw)
              .filterDate('2020-05-01','2020-10-31')
              .filterMetadata('CLOUD_COVER','less_than',90)
              .filterBounds(table);
              Map.centerObject(table,8.5);
var image2021 = col2021.mean().clip(table);
var kuantifikasi2021 =image2021.divide(10000);
//NDVI
var ndvi2021 = kuantifikasi2021.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
//MAX MIN NDVI
var min2021 = ee.Number(ndvi2021.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2021 = ee.Number(ndvi2021.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
//LST ESTIMATION
var thermal2021= kuantifikasi2021.select('B10').multiply(1000);
var fv2021 =(ndvi2021.subtract(min2021).divide(max2021.subtract(min2021))).pow(ee.Number(2)).rename('FV'); 
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2021=fv2021.multiply(a).add(b).rename('EMM');
var LST2021 = thermal2021.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2021.select('B10'),
          'Ep': EM2021.select('EMM')
          }).rename('LST');
 //Print Hasil
Export.image.toDrive({
  image: LST2021,
  description: "LST_2021",
  folder: "tvdi",
  fileNamePrefix: "LST",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: ndvi2021,
  description: "ndvi_2021",
  folder: "tvdi",
  fileNamePrefix: "ndvi",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
//TVDI
//MAX ALGO
var LSTmint = ndvi2021.expression(
'((-2.1879 * ndvi) + 23.709)', {
'ndvi': ndvi2021.select('NDVI')});
print (LSTmint,'mint')
//MIN ALGO
var LSTmaxt = ndvi2021.expression(
'((-2.7137 * ndvi) + 27.330)', {
'ndvi' : ndvi2021.select('NDVI')});
print (LSTmaxt,'maxt')
var tvdi=(LST2021.subtract(LSTmint).divide(LSTmaxt.subtract(LSTmint)));
print (tvdi,'tvdi');
//ALGO TVDI
var imageVisParam5 = {min: -2, max:4, palette: [
'blue', 'green', 'yellow','orange','red']}
var zones = tvdi.lt(0.4).add(tvdi.gt(0.4)).add(tvdi.gt(0.6)).add(tvdi.gt(0.8)).add(tvdi.gt(1.3));
zones = zones.updateMask(zones.neq(0));
Map.addLayer(zones, {min: 1, max: 4, palette: ['blue', 'green', 'yellow','orange','red']}, 'Kekeringan Tahun 2020');
//shp
//Styling Shapefile in Google Earth Engine
ee.FeatureCollection(table);
// Display the county boundaries.
var adm = ee.Image().byte().paint({
  featureCollection: table,
  color: 1,
  width: 2,
});
Map.addLayer(adm, {palette: '000000'}, 'Batas Administrasi');
//--------------------------------------------------------------------------
//                        SECTION 12- LEGENDA
//--------------------------------------------------------------------------
//Penambahan Title 
Map.add(ui.Label(
    'PETA POTENSI DAERAH TERDAMPAK KEKERINGAN JAWA TIMUR', {fontWeight: 'bold', fontSize: '24px'}));
Map.add(ui.Label(
    'By : Juma Maulana', {fontWeight: 'bold', fontSize: '12px', position: 'bottom-left',}));
//Lagenda TVDI
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Kelas Kekeringan',
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
var classcolor = ['0c78ff','1bff0c','ffe10c','ff7f12','ff4700'];
var labelName = ['(Basah)','(Agak Basah)','(Normal)'
                ,' (Agak Kering)','(Kering)'];
// Combine legend colou and labels
for (var i = 0; i < 5; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
Map.add(legend);