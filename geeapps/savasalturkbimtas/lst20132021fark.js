//var yil = ['2013','2014','2015','2016','2017','2018', '2019','2020', '2021']
var yil = ['2013', '2021']
var ilceler = ['BEYOĞLU', 'ÇATALCA', 'ÇEKMEKÖY', 'GÜNGÖREN', 'ARNAVUTKÖY', 'ŞİLE',
       'ESENLER', 'ZEYTİNBURNU', 'ÜMRANİYE', 'SULTANBEYLİ',
       'BAHÇELİEVLER', 'SULTANGAZİ', 'SİLİVRİ', 'SARIYER', 'BAĞCILAR',
       'TUZLA', 'KAĞITHANE', 'KARTAL', 'ATAŞEHİR', 'BAŞAKŞEHİR', 'BEYKOZ',
       'SANCAKTEPE', 'PENDİK', 'BEŞİKTAŞ', 'ESENYURT', 'MALTEPE', 'FATİH',
       'KADIKÖY', 'KÜÇÜKÇEKMECE', 'GAZİOSMANPAŞA', 'ADALAR', 'AVCILAR',
       'BAKIRKÖY', 'BEYLİKDÜZÜ', 'BAYRAMPAŞA', 'BÜYÜKÇEKMECE', 'EYÜP',
       'ŞİŞLİ', 'ÜSKÜDAR']
var geometry2 = ee.FeatureCollection("users/savasalturkbimtas/ist2"); 
var d = function() {
  Map.clear()
  var ilce = ilcelerui.getValue()
var geometry = geometry2.filter(ee.Filter.eq('ILCE_ADI', ilce))
    var tarih1 = "2013" + "-06-01"
  var tarih2 = "2013" + "-08-30"
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
  return col.updateMask(mask);
}
//vis params
var vizParams = {
bands: ['B5', 'B6', 'B4'],
min: 0,
max: 4000,
gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
//load the collection:
 {
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate(tarih1,tarih2)
.filterBounds(geometry);
}
//imagen reduction
{
var image = col.median();
//Map.addLayer(image, vizParams2);
}
//median
{
var ndvi = image.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
//Map.addLayer(ndvi, ndviParams, 'ndvi');
}
//select thermal band 10(with brightness tempereature), no calculation 
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
//Map.addLayer(thermal, b10Params, 'thermal');
// find the min and max of NDVI
{
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
}
//fractional vegetation
{
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
//Map.addLayer(fv);
}
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
//Map.addLayer(EM, imageVisParam3,'EMM');
//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
var LST1 = LST.clip(geometry);
 ////////////// 2021
 ////////////
 var tarih1 = "2021" + "-06-01"
  var tarih2 = "2021" + "-08-30"
  {
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate(tarih1,tarih2)
.filterBounds(geometry);
}
//imagen reduction
{
var image = col.median();
//Map.addLayer(image, vizParams2);
}
//median
{
var ndvi = image.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
//Map.addLayer(ndvi, ndviParams, 'ndvi');
}
//select thermal band 10(with brightness tempereature), no calculation 
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
//Map.addLayer(thermal, b10Params, 'thermal');
// find the min and max of NDVI
{
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
}
//fractional vegetation
{
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
//Map.addLayer(fv);
}
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
//Map.addLayer(EM, imageVisParam3,'EMM');
//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST2 = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
var LST3 = LST2.clip(geometry);
var LST_FARK = LST3.subtract(LST1)
Map.setCenter(28.59, 41.1, 8);
var minMaxValues = LST_FARK.reduceRegion({reducer: ee.Reducer.minMax(),
                                 geometry: geometry,
                                 scale:30
                                 })
Map.addLayer(LST_FARK, {min:minMaxValues.get("LST_min").getInfo(),max:minMaxValues.get("LST_max").getInfo(),palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},"2013-2021" +" İlçe "+ ilce,true);
var min1 = ee.Number(ee.Number(minMaxValues.get("LST_min")).format("%.1f")).getInfo()
var max1 = ee.Number(ee.Number(minMaxValues.get("LST_max")).format("%.1f")).getInfo()
var ort = (max1-min1) / 2
var ort1 = ee.Number(ort).format("%.1f").getInfo()
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(min1, {margin: '4px 8px'}),
    ui.Label(
        (ort1),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(max1, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var palette = [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]
var nSteps = 10
// Creates a color bar thumbnail image for use in legend from the given color palette
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, nSteps, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: nSteps,
    palette: palette,
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0).int(),
  params: makeColorBarParams(palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Legend title
var legendTitle = ui.Label({
  value: ilce,
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
  }
// Export.image.toDrive({
//   image: LST1,
//   description: 'imageToDriveExample_transform',region:geometry,scale:30,maxPixels: 3784216672400
// });
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'LST İlçe Bazında (2013-2021 arasındaki LST değişimi)',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);
var ilcelerui = ui.Select({
  placeholder: 'İlçe seçiniz...',
  })
var button = ui.Button('Hesapla')
dropdownPanel.add(ilcelerui)
dropdownPanel.add(button)
ilcelerui.items().reset(ilceler)
button.onClick(
  d
  )
ui.root.add(mainPanel);