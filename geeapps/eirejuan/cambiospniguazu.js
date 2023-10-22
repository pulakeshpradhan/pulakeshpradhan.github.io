var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/eirejuan/PN_IGUAZU"
    }) || ee.FeatureCollection("users/eirejuan/PN_IGUAZU");
//Imagen Cambios en NDVI para SENTINEL 2
// >>>>>>>>>>   Antes  <<<<<<<<<
var IMGSentinel = ee.ImageCollection ('COPERNICUS/S2') 
  .filterDate ('2020-10-01', '2020-11-30') //fechas disponibles ('2015-07-01' - actualidad)
  .filterBounds (geometry) 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
// >>>>>>>>>>   Despues   <<<<<<<<<
var IMGSentinel2 = ee.ImageCollection ('COPERNICUS/S2') 
  .filterDate ('2020-11-30', '2021-02-28') //fechas disponibles ('2015-07-01' - actualidad)
  .filterBounds (geometry) 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30);
// >>>>>>>>>>  Definición de imagen e la colección  <<<<<<<<<  
var mylist1= IMGSentinel.toList(500);
var mylist2= IMGSentinel2.toList(500);
print(IMGSentinel, 'ANTES') ;
print(IMGSentinel2, 'DESPUES') ;
var SentinelFiltro = ee.Image(mylist1.get(1));
var SentinelFiltro2 = ee.Image(mylist2.get(1));
var SentinelClip = SentinelFiltro.clip (geometry);
var SentinelClip2 = SentinelFiltro2.clip (geometry);
// get the angle of first image
// >>>>>>>>>>   Variables para algebra de bandas  <<<<<<<<<
var nir = SentinelClip.select('B8');
var doce = SentinelClip.select('B4');
var nir2 = SentinelClip2.select('B8');
var doce2 = SentinelClip2.select('B4');
// >>>>>>>>>>  Función  <<<<<<<<<
var addGCI = function(image) {
return image.addBands((((nir2.subtract(doce2)).divide(nir2.add(doce2))).subtract((nir.subtract(doce)).divide(nir.add(doce)))).rename('DIF'))};
// >>>>>>>>>>  Asígnación de función a la colección  <<<<<<<<<
var IMGSentinel = IMGSentinel.map(addGCI);
// >>>>>>>>>>   Selección de banda a la colección  <<<<<<<<<
var GCI = IMGSentinel.select(['DIF']);
var GCImed = GCI.median();
// >>>>>>>>>>   Paleta de colores  <<<<<<<<<
var GCI_pal = ['FF0000', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
              '74A901', '66A000', '529400', '3E8601', '207401', '056201',
              '004C00', '023B01', '012E01', '011D01', '011301'];
// >>>>>>>>>> Añade al mapa <<<<<<<<<
Map.addLayer(GCImed, {min:0.16, max:0.223, palette: GCI_pal}, 'Cambios en Vegetación');
// >>>>>>>>>>  Exportar  <<<<<<<<<
var SentinelClip = GCImed.clip (geometry);
Export.image.toDrive({
  image: SentinelClip.select("DIF"),
  description: 'Change_NDVI',
  scale: 10,
  region: geometry});
// >>>>>>>>>>   Define Histograma  <<<<<<<<<
var options = {
  title: 'Sentinel CHANGE NDVI histogram',
  fontSize: 20,
  hAxis: {title: 'CHANGE NDVI'},
  vAxis: {title: 'count'},
  series: {
    0: {color: 'blue'},
    }
};
// >>>>>>>>>>  Opciones de histograma <<<<<<<<<
var histogram = ui.Chart.image.histogram(SentinelClip.select("DIF"), geometry, 500)
    .setSeriesNames(['CHANGE NDVI'])
    .setOptions(options);
// >>>>>>>>>>  Añade gráfico de histograma  <<<<<<<<<
print(histogram);
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  'Gran    Dismin. de Vigor Vegetal',
  'Mediana Dismin. de Vigor Vegetal.',
  ' Baja   Dismin. de Vigor Vegetal.',
  'Sin cambios',
  'Bajo Aumento de Vigor Vegetal',
  'Medio Aumento de Vigor vegetal',
  'Gran Aumento de Vigor Vegetal',
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'NDVI', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '20px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = GCI_pal;
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 7; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
Map.add(Leyenda);