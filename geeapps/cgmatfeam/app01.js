// CRIAR TITULO
var title = ui.Label('Centro de Geotecnologias e Monitoramento Ambiental Territorial');
title.style().set('position', 'top-center');
Map.add(title);
// CRIAR PAINEL LATERAL
var panel = ui.Panel();
panel.style().set({
  height: '600px',
  width: '400px',
  position: 'top-right'
});
Map.add(panel)
//VARIÁVEIS
var dt_hoje = new Date() //data de hoje
var dt_u7d = new Date((new Date()).valueOf() - 7000*3600*24); //data de 7 dias atrás
var dt_u30d = new Date((new Date()).valueOf() - 30000*3600*24); //data de 30 dias atrás
var rmbh_buf = ee.Geometry.Point(-43.96, -19.93).buffer(45000)
Map.addLayer(rmbh_buf);
//ÁREA DE INTERESSE
var AOI = ee.Geometry.Rectangle({
  coords: [[-62.7811, -7.0928], [-39.7526, -24.1380]],
  geodesic: false
});
Map.addLayer(AOI);
Map.centerObject(AOI, 5);
//CRIAR COLEÇÃO S5CO
var collectionN0 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-13', '2020-09-23');
var collectionN1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-17', '2020-09-23')
  .filterBounds(AOI)
  .median();
var collectionN2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-16', '2020-09-22')
  .filterBounds(AOI)
  .median();
var collectionN3 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-15', '2020-09-21')
  .filterBounds(AOI)
  .median();
var collectionN4 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-14', '2020-09-20')
  .filterBounds(AOI)
  .median();
var collectionN5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-09-13', '2020-09-19')
  .filterBounds(AOI)
  .median();
var composicao = ee.ImageCollection([collectionN5, collectionN4, collectionN3, collectionN2, collectionN1])
var band_viz_co = {
  min: -0.028900609637731528,
  max: 0.1288602375994983,
  opacity: 0.40,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collectionN1, band_viz_co, 'S5P CO');
//PARAMETRO DE VISUALIZAÇÃO THUMBNAIL
var argsS5CO = {
  crs: 'EPSG:4326',  
  dimensions: '500',
  region: AOI,
  min: -0.028900609637731528,
  max: 0.1288602375994983,
  palette: ['white', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  framesPerSecond: 2,
};
// CRIAR VIDEO THUMBNAIL
var thumbS5CO = ui.Thumbnail({
  // Specifying a collection for "image" animates the sequence of images.
  image: composicao,
  params: argsS5CO,
  style: {
    position: 'bottom-right',
    width: '320px'
  }});
panel.add(thumbS5CO)
// CRIAR GRÁFICO
//----->define opções
var options = {
  title: 'Belo Horizonte - Concentração de CO da troposfera'
};
//----->Gráficos
var tempTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: collectionN0,
  regions: rmbh_buf,
  reducer: ee.Reducer.mean(),
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
})
  .setOptions(options);
panel.add(tempTimeSeries)