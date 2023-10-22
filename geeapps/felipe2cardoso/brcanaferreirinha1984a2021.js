var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -43.30996770397978,
            -12.288163890539026
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-43.30996770397978, -12.288163890539026]);
//Definição da Área de Estudo
/*************************************DEFINIÇÃO DA ÁREA DE ESTUDO****************************************/
var area_estudo = ee.FeatureCollection('users/felipe2cardoso/Ferreirinha_of');
/***************************************LAYER ÁREA DE ESTUDO******************************************/
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: area_estudo,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Usina Bahia');
Map.centerObject(area_estudo,15); 
/*************************************MASCARAS DE NUVES PARA AS COLEÇÕES LANDSAT 5,7 e 8**************/
//Mascará de nuvens para a banda pixel_qa SR landsat 4,5 e 7
var cloudMaskL457 = function(image) {
var qa = image.select('pixel_qa'); // substitiu a band FMASK
//Se o bit da nuvem (5) estiver definido e a confiança na nuvem (7) estiver alta
//ou o bit de sombra da nuvem está definido (3), então é um pixel ruim.
var cloud = qa.bitwiseAnd(1 << 5)
            .and(qa.bitwiseAnd(1 << 7))
            .or(qa.bitwiseAnd(1 << 3))
//Remove os pixels das arestas que não ocorrem em todas as bandas
var mask2 = image.mask().reduce(ee.Reducer.min());
return image.updateMask(cloud.not()).updateMask(mask2).divide(10000).copyProperties(image, ["system:time_start"]); //dividir valor DN por 10.000 
}
//Mascará de nuvens para a banda pixel_qa SR landsat 8
function cloudMaskL8(image) {
// Os bits 3 e 5 são nuvem e sombra, respectivamente..
var cloudShadowBitMask = 1 << 3;
var cloudsBitMask = 1 << 5;
// Obter a banda QA de pixels..
var qa = image.select('pixel_qa');
// Ambos os bit devem ser definidos como zero, indicando condições claras
var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
          .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
// Retorna a imagem mascarada, dimensionada para a refletância, sem as bandas QA.
return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}
/******************************************ÍNDICES FENOLÓGICOS E DE ÁGUA*************************************/                       
function f_index_ (image) {
  var ndvi =  image.normalizedDifference(['nir', 'red']).rename('NDVI');// Rouse 1973
  var lswi =  image.normalizedDifference(['nir', 'swir1']).rename('LSWI'); //Xiao 2002
  var mndwi = image.normalizedDifference(['green', 'swir2']).rename('MNDWI'); // Xu 2005
  var ndwi = image.normalizedDifference(['green', 'nir']).rename ('NDWI'); //Mc Feeters 1996
  var evi = image.expression('2.5 * ((N - R) / (N + (6 * R) - (7.5 * B) + 1))', { //Huete 2002
        'N': image.select('nir'), 'R': image.select('red'), 'B': image.select('blue')}).rename('EVI');
  var savi = image.expression('(1 + L ) * float(nir - red)/ (nir + red + L)',{ 'nir': image.select('nir'),
        'red': image.select('red'),'L':1}).rename('SAVI');
  return image.addBands([ndvi,lswi, mndwi, ndwi, evi,savi])}
/**************************************IMPORTAR COLEÇÕES LANDSAT*******************************************/
var l5Bands = ['B1','B2','B3','B4','B5','B6','B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l5names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista com nomes iguais
var l7Bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l7names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l8Bands = ['B2','B3', 'B4', 'B5', 'B6', 'B10', 'B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l8names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista para poder compatibilizar as bandas
/****************************************DEFINIÇÃO DO INTERVALO DE TEMPO*************************************/
var startyear = 1984;
var endyear = 2021;  
var startdate = ee.Date.fromYMD(startyear, 1, 1);
var enddate = ee.Date.fromYMD(endyear , 12, 31);
var years = ee.List.sequence(startyear, endyear);
var months = ee.List.sequence(1,12); 
//LANDSAT 5 SURFACE REFLECTANCE COLLECTION SR T1
var ls5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                            .select(l5Bands, l5names)
                            .filterDate(startdate,enddate)
                           // .filter(ee.Filter.calendarRange(9,4,"month"))
                            .filterMetadata('CLOUD_COVER','less_than', 10)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_estudo);
//LANDSAT 7 SURFACE REFLECTANCE COLLECTION SR T1
var ls7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
                            .select(l7Bands, l7names)
                            .filterDate(startdate,enddate)
                           // .filter(ee.Filter.calendarRange(9,4,"month"))
                           .filterMetadata('CLOUD_COVER','less_than', 10)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_estudo);
var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                            .select(l8Bands, l8names)
                            .filterDate(startdate,enddate)
                            // .filter(ee.Filter.calendarRange(9,4,"month"))
                            .filterMetadata('CLOUD_COVER','less_than', 10)
                            .map(cloudMaskL8)
                            .map(f_index_)
                            .filterBounds(area_estudo);
//Merge the dataseries
var composites = ee.ImageCollection(ls5.merge(ls8));
var image = ee.Image(composites.filterDate(startdate,enddate).median())
var bandNames = image.bandNames();
print('bands',bandNames);
var NDVI = composites.select('NDVI')
var count = composites.size();
print('Número de Imagens:' , count);
//Aplique um redutor a cada elemento de uma coleção, usando os seletores fornecidos para determinar as entradas.
//Retorna um dicionário de resultados, codificado com os nomes de saída.
var range = composites.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]) 
print('Intervalo de datas: ', ee.Date(range.get('min')), ee.Date(range.get('max')))
//var sunStats = composites.aggregate_stats('SUN_ELEVATION');
//print('Estatísticas de elevação do sol:: ', sunStats);
//Classifique por propriedade de cobertura de nuvens, obtenha a imagem menos nublada.
var image = ee.Image(composites.sort('CLOUD_COVER').first());
print('Imagem menos nublada: ', image);
//Limite a coleção às 10 imagens mais recentes.
//var recent = composites.sort('system:time_start', false).limit(10);
//print('Imagens Recentes: ', recent);
/*********************************************Adicionando Layers*******************************************************************/
//Map.addLayer(image.clip(area_estudo),{bands: ['red', 'green', 'blue'], min: 0.03, max: 0.19, gamma: 1.05},"Coleções")
Map.addLayer(NDVI.reduce(ee.Reducer.mean()).clip(area_estudo), {palette: ['blue','red','orange','yellow','green','lime'],min: -0.5, max: 0.8}, 'NDVI',0);
Map.setOptions('SATELLITE')
/****************************************FUNÇÃO DE INSPEÇÃO*********************************************************/
// Crie um painel inspetor com um layout horizontal.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Adicione um rótulo ao painel.
inspector.add(ui.Label('Click to get mean NDVI'));
// Adicione o painel ao mapa padrão.
Map.add(inspector);
// Defina o cursor do mapa padrão como uma "cruz".
Map.style().set('cursor', 'crosshair');
//Registre um retorno de chamada no mapa a ser invocado quando o mapa for clicado.
Map.onClick(function(coords) {
  // Limpe o painel e mostre uma mensagem de carregamento.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Calcule o NDVI médio; uma operação de servidor potencialmente longa.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = NDVI.reduce(ee.Reducer.mean());
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('NDVI_mean');
  // Solicite o valor do servidor e use os resultados em uma função.
  computedValue.evaluate(function(result) {
    inspector.clear();
    //Adicione um rótulo com os resultados do servidor.
    inspector.add(ui.Label({
      value: 'Mean NDVI: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
    //Adicione um botão para ocultar o painel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
/***************************************************Painel de Gráficos**************************************************/
// Crie um painel para conter nossos widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Crie um painel de introdução com rótulos.
var intro = ui.Panel([
  ui.Label({
    value: 'Inspetor de dois gráficos',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Clique em um ponto no mapa para inspecionar a area da Usina.')
]);
panel.add(intro);
// Crie painéis para manter os valores lon / lat.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Registre um retorno de chamada no mapa padrão a ser invocado quando o mapa for clicado.
Map.onClick(function(coords) {
  // Atualize o painel lon / lat com valores do evento de clique.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Adicione um ponto vermelho para o ponto clicado.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Crie um gráfico NDVI.
  var ndviChart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 30);
  ndviChart.setOptions({
    title: 'NDVI ao longo do tempo',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Data', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
  // Crie um gráfico de espectro RGB.
  var rgbChart = ui.Chart.image.series(composites, point)
      .setOptions({
        title: 'Bands Reflectance ao longo do tempo',
        vAxis: {title: 'band value'},
        hAxis: {title: 'Data', format: 'MM-yy', gridlines: {count: 7}},
      });
   panel.widgets().set(3, rgbChart);
});
Map.style().set('cursor', 'crosshair');
// Adicione o painel ao ui.root.
ui.root.insert(0, panel);
Map.addLayer(NDVI.reduce(ee.Reducer.mean()).clip(area_estudo), {palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'],min: 0, max: 0.8}, 'NDVI');