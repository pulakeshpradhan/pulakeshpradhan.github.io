var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/DAS_CORONG"
    }) || ee.FeatureCollection("users/Surabaya/DAS_CORONG");
//cloud mask
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask); }
var col1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-01-01','2021-01-30')
          .filterBounds(table);
          Map.centerObject(table,10);
var image1 = col1.median().clip(table);
var kuantifikasi1 =image1.divide(10000);
var ndvi1 = image1.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi1 = image1.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi1 = kuantifikasi1.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi1.select('NDVI'),
 'NDWI' : ndwi1.select('NDWI')});
 //
 var col2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-02-01','2021-02-28')
          .filterBounds(table);
var image2 = col2.median().clip(table);
var kuantifikasi2 =image2.divide(10000);
var ndvi2 = image2.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi2 = image2.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi2 = kuantifikasi2.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi2.select('NDVI'),
 'NDWI' : ndwi2.select('NDWI')});
 //
 var col3 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-03-01','2021-03-30')
          .filterBounds(table);
var image3 = col3.median().clip(table);
var kuantifikasi3 =image3.divide(10000);
var ndvi3 = image3.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi3 = image3.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi3 = kuantifikasi3.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi3.select('NDVI'),
 'NDWI' : ndwi3.select('NDWI')});
 //
 var col4 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-04-01','2021-04-30')
          .filterBounds(table);
var image4 = col4.median().clip(table);
var kuantifikasi4 =image4.divide(10000);
var ndvi4 = image4.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi4 = image4.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi4 = kuantifikasi4.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi4.select('NDVI'),
 'NDWI' : ndwi4.select('NDWI')});
 //
 var col5 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-05-01','2021-05-30')
          .filterBounds(table);
var image5 = col5.median().clip(table);
var kuantifikasi5 =image5.divide(10000);
var ndvi5 = image5.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi5 = image5.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi5 = kuantifikasi5.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi5.select('NDVI'),
 'NDWI' : ndwi5.select('NDWI')});
 //
 var col6 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-06-01','2021-06-30')
          .filterBounds(table);
var image6 = col6.median().clip(table);
var kuantifikasi6 =image6.divide(10000);
var ndvi6 = image6.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi6 = image6.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi6 = kuantifikasi6.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi6.select('NDVI'),
 'NDWI' : ndwi6.select('NDWI')});
 //
 var col7 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-07-01','2021-07-31')
          .filterBounds(table);
var image7 = col7.median().clip(table);
var kuantifikasi7 =image7.divide(10000);
var ndvi7 = image7.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi7 = image7.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi7 = kuantifikasi7.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi7.select('NDVI'),
 'NDWI' : ndwi7.select('NDWI')});
 //
 var col8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-08-01','2021-08-30')
          .filterBounds(table);
var image8 = col8.median().clip(table);
var kuantifikasi8 =image8.divide(10000);
var ndvi8 = image8.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi8 = image8.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi8 = kuantifikasi8.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi8.select('NDVI'),
 'NDWI' : ndwi8.select('NDWI')});
 //
 var col9 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-09-01','2021-09-30')
          .filterBounds(table);
var image9 = col9.median().clip(table);
var kuantifikasi9 =image9.divide(10000);
var ndvi9 = image9.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi9 = image9.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi9 = kuantifikasi9.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi9.select('NDVI'),
 'NDWI' : ndwi9.select('NDWI')});
 //
 var col10 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-10-01','2021-10-31')
          .filterBounds(table);
var image10 = col10.median().clip(table);
var kuantifikasi10 =image10.divide(10000);
var ndvi10 = image10.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi10 = image10.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi10 = kuantifikasi10.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi10.select('NDVI'),
 'NDWI' : ndwi10.select('NDWI')});
 //
 var col11 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-11-01','2021-11-30')
          .filterBounds(table);
var image11 = col11.median().clip(table);
var kuantifikasi11 =image11.divide(10000);
var ndvi11 = image11.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi11 = image11.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi11 = kuantifikasi11.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi11.select('NDVI'),
 'NDWI' : ndwi11.select('NDWI')});
 //
 var col12 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-12-01','2021-12-31')
          .filterBounds(table);
var image12 = col12.median().clip(table);
var kuantifikasi12 =image12.divide(10000);
var ndvi12 = image12.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndwi12 = image12.normalizedDifference(['B3', 'B5']).rename('NDWI');
var nddi12 = kuantifikasi12.expression(
 '(NDVI - NDWI) / (NDVI + NDWI)',{
 'NDVI'  : ndvi12.select('NDVI'),
 'NDWI' : ndwi12.select('NDWI')});
 //GRAF
 var NDVICORONG=(ndvi1.rename('1')).addBands(ndvi2.rename('2')).addBands(ndvi3.rename('3')).addBands(ndvi4.rename('4')).addBands(ndvi5.rename('5'))
 .addBands(ndvi6.rename('6')).addBands(ndvi7.rename('7')).addBands(ndvi8.rename('8')).addBands(ndvi9.rename('9')).addBands(ndvi1.rename('10')).addBands(ndvi11.rename('11'))
 .addBands(ndvi12.rename('12'));
var NDWICORONG=(ndwi1.rename('1')).addBands(ndwi2.rename('2')).addBands(ndwi3.rename('3')).addBands(ndwi4.rename('4')).addBands(ndwi5.rename('5'))
 .addBands(ndwi6.rename('6')).addBands(ndwi7.rename('7')).addBands(ndwi8.rename('8')).addBands(ndwi9.rename('9')).addBands(ndwi1.rename('10')).addBands(ndwi11.rename('11'))
 .addBands(ndwi12.rename('12'));
var NDDICORONG=(nddi1.rename('1')).addBands(nddi2.rename('2')).addBands(nddi3.rename('3')).addBands(nddi4.rename('4')).addBands(nddi5.rename('5'))
 .addBands(nddi6.rename('6')).addBands(nddi7.rename('7')).addBands(nddi8.rename('8')).addBands(nddi9.rename('9')).addBands(nddi1.rename('10')).addBands(nddi11.rename('11'))
 .addBands(nddi12.rename('12'));
var chartndvi = ui.Chart.image.regions(NDVICORONG,table,ee.Reducer.mean(), 30, 'id')
                .setOptions({
                title:'Rata Rata NDVI',
                vAxis:{title:'Indeks'}});
                print( chartndvi,'NDVI')
var chartndwi = ui.Chart.image.regions(NDWICORONG,table,ee.Reducer.mean(), 30, 'id')
                .setOptions({
                title:'Rata Rata NDWI',
                vAxis:{title:'Indeks'}});
                print( chartndwi,'NDWI')
var chartnddi = ui.Chart.image.regions(NDDICORONG,table,ee.Reducer.mean(), 30, 'id')
                .setOptions({
                title:'Rata Rata NDDI',
                vAxis:{title:'Indeks'}});
                print( chartnddi,'NDDI')
var zones1 = nddi1.lt(0.05).add(nddi1.gt(0.05)).add(nddi1.gt(0.10)).add(nddi1.gt(0.15)).add(nddi1.gt(0.25).add(nddi1.gt(1)));
zones1 = zones1.updateMask(zones1.neq(0));
var zones2 = nddi2.lt(0.05).add(nddi2.gt(0.05)).add(nddi2.gt(0.10)).add(nddi2.gt(0.15)).add(nddi2.gt(0.25).add(nddi2.gt(1)));
zones2 = zones2.updateMask(zones2.neq(0));
var zones3 = nddi3.lt(0.05).add(nddi3.gt(0.05)).add(nddi3.gt(0.10)).add(nddi3.gt(0.15)).add(nddi3.gt(0.25).add(nddi3.gt(1)));
zones3 = zones3.updateMask(zones3.neq(0));
var zones4 = nddi4.lt(0.05).add(nddi4.gt(0.05)).add(nddi4.gt(0.10)).add(nddi4.gt(0.15)).add(nddi4.gt(0.25).add(nddi4.gt(1)));
zones4 = zones4.updateMask(zones4.neq(0));
var zones5 = nddi5.lt(0.05).add(nddi5.gt(0.05)).add(nddi5.gt(0.10)).add(nddi5.gt(0.15)).add(nddi5.gt(0.25).add(nddi5.gt(1)));
zones5 = zones5.updateMask(zones5.neq(0));
var zones6 = nddi6.lt(0.05).add(nddi6.gt(0.05)).add(nddi6.gt(0.10)).add(nddi6.gt(0.15)).add(nddi6.gt(0.25).add(nddi6.gt(1)));
zones6 = zones6.updateMask(zones6.neq(0));
var zones7 = nddi7.lt(0.05).add(nddi7.gt(0.05)).add(nddi7.gt(0.10)).add(nddi7.gt(0.15)).add(nddi7.gt(0.25).add(nddi7.gt(1)));
zones7 = zones7.updateMask(zones7.neq(0));
var zones8 = nddi8.lt(0.05).add(nddi8.gt(0.05)).add(nddi8.gt(0.10)).add(nddi8.gt(0.15)).add(nddi8.gt(0.25).add(nddi8.gt(1)));
zones8 = zones8.updateMask(zones8.neq(0));
var zones9 = nddi9.lt(0.05).add(nddi9.gt(0.05)).add(nddi9.gt(0.10)).add(nddi9.gt(0.15)).add(nddi9.gt(0.25).add(nddi9.gt(1)));
zones9 = zones9.updateMask(zones9.neq(0));
var zones10 = nddi10.lt(0.05).add(nddi10.gt(0.05)).add(nddi10.gt(0.10)).add(nddi10.gt(0.15)).add(nddi10.gt(0.25).add(nddi10.gt(1)));
zones10 = zones10.updateMask(zones10.neq(0));
var zones11 = nddi11.lt(0.05).add(nddi11.gt(0.05)).add(nddi11.gt(0.10)).add(nddi11.gt(0.15)).add(nddi11.gt(0.25).add(nddi11.gt(1)));
zones11 = zones11.updateMask(zones11.neq(0));
var zones12 = nddi12.lt(0.05).add(nddi12.gt(0.05)).add(nddi12.gt(0.10)).add(nddi12.gt(0.15)).add(nddi12.gt(0.25).add(nddi12.gt(1)));
zones12 = zones12.updateMask(zones12.neq(0));
Map.addLayer(zones1, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIJANUARI');
Map.addLayer(zones2, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIFEBRUARI');
Map.addLayer(zones3, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIMARET');
Map.addLayer(zones4, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIAPRIL');
Map.addLayer(zones5, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIMEI');
Map.addLayer(zones6, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIJUNI');
Map.addLayer(zones7, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIJULI');
Map.addLayer(zones8, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIAGUSTUS');
Map.addLayer(zones9, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDISEPTEMBER');
Map.addLayer(zones10, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIOKTOBER');
Map.addLayer(zones11, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDINOVEMBER');
Map.addLayer(zones12, {min: 0, max: 5, palette: ['#ffffff', '#7a8737', '#0ae042','#fff70b','#ffaf38','#ff641b']}, 'NDDIDESEMBER');
//--------------------------------------------------------------------------
//                        SECTION 12- LEGENDA
//--------------------------------------------------------------------------
//Penambahan Title 
Map.add(ui.Label(
    'PETA DAERAH TERDAMPAK KEKERINGAN DAS CORONG TAHUN 2021', {fontWeight: 'bold', fontSize: '24px'}));
Map.add(ui.Label(
    'By : Azizah Nur Affandi ', {fontWeight: 'bold', fontSize: '12px', position: 'bottom-left',}));
//Lagenda TVDI
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Indeks NDDI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
// Creates the content of the legend
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
var classcolor = ['ffffff', '7a8737', '0ae042','fff70b','ffaf38','ff641b'];
var labelName = ['<0,05 (Basah)','0.05 - 0.10 (Normal)','0.10 - 0.15 (Agak Kering)'
                ,'0.15 - 0.25 (Kering Sedang )','0,25 - 1 (Kering)','>1 (Sangat Kering)'];
// Combine legend colou and labels
for (var i = 1; i < 6; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
Map.add(legend);