var quadras = ee.FeatureCollection("users/claumao/cidu_uea");
Map.setOptions('satellite')
function maskS2clouds(image) {
   var qa = image.select('QA60')
// Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var collection = ee.ImageCollection('COPERNICUS/S2')
var fdata = collection.filterDate('2022-01-01', '2022-02-20')
    // Pre-filter to get less cloudy granules.
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).filterBounds(quadras)
//.map(maskS2clouds);
var collection = collection.median();
var im2015 = ee.Image('COPERNICUS/S2/20150822T142326_20161003T030212_T20MRB')
var im2016 = ee.Image('COPERNICUS/S2/20160816T142322_20160816T142325_T20MRB')
var im2017 = ee.Image('COPERNICUS/S2/20170819T143319_20170819T143314_T20MRB')
var im2018 = ee.Image('COPERNICUS/S2/20180918T142751_20180918T143027_T20MRB')
var im2019 = ee.Image('COPERNICUS/S2/20190829T142759_20190829T142756_T20MRB')
var im2020 = ee.Image('COPERNICUS/S2/20200818T142741_20200818T142736_T20MRB')
var im2021 = ee.Image('COPERNICUS/S2/20210825T141739_20210825T141733_T20MRB')
var im2022 = ee.Image('COPERNICUS/S2/20220105T142729_20220105T142727_T20MRB')
var image = ee.ImageCollection.fromImages(
  [ee.Image(im2015), ee.Image(im2016),ee.Image(im2017),ee.Image(im2018),
  ee.Image(im2019),ee.Image(im2020),ee.Image(im2021),ee.Image(im2022)]);
print('Coleção de Imagens: ', image);
//var clip = collection.clipToCollection(quadras);
var clip2015 = im2015.clip(quadras);
var clip2016 = im2016.clip(quadras);
var clip2017 = im2017.clip(quadras);
var clip2018 = im2018.clip(quadras);
var clip2019 = im2019.clip(quadras);
var clip2020 = im2020.clip(quadras);
var clip2021 = im2021.clip(quadras);
var clip2022 = im2022.clip(quadras);
var ndvi2015 = clip2015.normalizedDifference(['B8', 'B4']);
var ndvi2016 = clip2016.normalizedDifference(['B8', 'B4']);
var ndvi2017 = clip2017.normalizedDifference(['B8', 'B4']);
var ndvi2018 = clip2018.normalizedDifference(['B8', 'B4']);
var ndvi2019 = clip2019.normalizedDifference(['B8', 'B4']);
var ndvi2020 = clip2020.normalizedDifference(['B8', 'B4']);
var ndvi2021 = clip2021.normalizedDifference(['B8', 'B4']);
var ndvi2022 = clip2022.normalizedDifference(['B8', 'B4']);
// RENOMEANDO
ndvi2015 = ndvi2015.addBands(ndvi2015.rename('NDVI15'));
ndvi2016 = ndvi2016.addBands(ndvi2016.rename('NDVI16'));
ndvi2017 = ndvi2017.addBands(ndvi2017.rename('NDVI17'));
ndvi2018 = ndvi2018.addBands(ndvi2018.rename('NDVI18'));
ndvi2019 = ndvi2019.addBands(ndvi2019.rename('NDVI19'));
ndvi2020 = ndvi2020.addBands(ndvi2020.rename('NDVI20'));
ndvi2021 = ndvi2021.addBands(ndvi2021.rename('NDVI21'));
ndvi2022 = ndvi2022.addBands(ndvi2022.rename('NDVI22'));
var addEVI = function(image) {
  return image.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': image.select('B5'),
      'RED': image.select('B4'),
      'BLUE': image.select('B2')})
      .rename('EVI')
      .float()
      .copyProperties(image, ['system:time_start']);
};
// RAMPA DE CORES
var palette = [ 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
// RESULTADOS
Map.addLayer(im2022, {bands: ['B4', 'B3', 'B2'], min: 444, max: 2890}, 'RGB-2022',0)
Map.addLayer(ndvi2015, {min: 0.0403, max: 0.7317, bands:['NDVI15'], palette: palette},'NDVI-2015',1);
Map.addLayer(ndvi2016, {min: 0.0403, max: 0.7317, bands:['NDVI16'], palette: palette}, 'NDVI-2016',1);
Map.addLayer(ndvi2017, {min: 0.0403, max: 0.7317, bands:['NDVI17'], palette: palette}, 'NDVI-2017',1);
Map.addLayer(ndvi2018, {min: 0.0403, max: 0.7317, bands:['NDVI18'], palette: palette}, 'NDVI-2018',1);
Map.addLayer(ndvi2019, {min: 0.0403, max: 0.7317, bands:['NDVI19'], palette: palette}, 'NDVI-2019',1);
Map.addLayer(ndvi2020, {min: 0.0403, max: 0.7317, bands:['NDVI20'], palette: palette}, 'NDVI-2020',1);
Map.addLayer(ndvi2021, {min: 0.0403, max: 0.7317, bands:['NDVI21'], palette: palette}, 'NDVI-2021',1);
Map.addLayer(ndvi2022, {min: 0.0403, max: 0.7317, bands:['NDVI22'], palette: palette}, 'NDVI-2022',1);
Map.addLayer(quadras,{},'Quadras',0);
Map.centerObject(quadras,15)
// FAZER FUSÃO DE BANDAS
var imFus = ee.Image.cat(ndvi2015.select('NDVI15'),ndvi2016.select('NDVI16'),ndvi2017.select('NDVI17'),ndvi2018.select('NDVI18'),ndvi2019.select('NDVI19'),ndvi2020.select('NDVI20'),ndvi2021.select('NDVI21'),ndvi2022.select('NDVI22'));
var vegIndices = ee.ImageCollection.fromImages(
  [ee.Image(ndvi2015), ee.Image(ndvi2016),ee.Image(ndvi2017),ee.Image(ndvi2018),ee.Image(ndvi2019),ee.Image(ndvi2020),ee.Image(ndvi2021),ee.Image(ndvi2022)]);
//print('collectionFromImages: ', vegIndices);
function ColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 500, 20],
      dimensions: '100x10',
      format: 'png',
      min: -1,
      max: 400,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend(a,b) {
  var labelPanel = ui.Panel(
      [
        ui.Label(a, {margin: '4px 8px'}),
        ui.Label(' ',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(b, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(), labelPanel]);
}
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '14px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
Map.add(ui.Panel(
    [
      ui.Label('Escala NDVI', LEGEND_TITLE_STYLE), makeLegend('0','1'),
      ui.Label('Maximo: 0.7', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));
var titleLabel = ui.Label(
    'NDVI (2015-2022) - Cidade Universitária - UEA', {fontWeight: 'bold', fontSize: '20px'})
Map.add(titleLabel);