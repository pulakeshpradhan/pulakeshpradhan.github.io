var recorte=ee.Geometry.Polygon( [[-75.58235724103929,-11.792806015819995],
[-75.46837408674241,-11.792806015819995],
[-75.46837408674241,-11.70406757472895],
[-75.58235724103929,-11.70406757472895],
 [-75.58235724103929,-11.792806015819995]]
);
var punto_interes=ee.Geometry.Point([-75.53834, -11.7659]);
var maskClouds = function(image) {  
  var scored = ee.Algorithms.Landsat.simpleCloudScore(image); 
  return image.mask(scored.select(['cloud']).lt(25));
};
 var pansharp = function (img) {  
                 var rgb = img.select(['B2', 'B3', 'B4']).float();
                 var gray = img.select('B8').float();
                 var huesat = rgb.rgbToHsv().select('hue', 'saturation');
                 return ee.Image.cat(huesat, gray).hsvToRgb();
               };
var calcularIndices=function(imagen){
var NIR='B5';
var RED='B4';
var GREEN='B3';
var SWIR_1='B6';
var SWIR_2='B7';
var ndwi= imagen.normalizedDifference([GREEN, NIR]).rename('NDWI');
var mndwi=imagen.normalizedDifference([GREEN, SWIR_2]).rename('MNDWI');
var ndii=imagen.normalizedDifference([NIR, SWIR_2]).rename('NDII');
var ndvi= imagen.normalizedDifference([NIR, RED]).rename('NDVI');
var evi=imagen.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': imagen.select('B5'),
      'RED': imagen.select('B4'),
      'BLUE': imagen.select('B2')
}).rename('EVI');
var rvi=imagen.expression(
    'RED/NIR', {
      'NIR': imagen.select('B5'),
      'RED': imagen.select('B4'),
}).rename('RVI');
var savi=imagen.expression(
    '(1.5)*((NIR-RED)/(NIR+RED+0.5))', {
      'NIR': imagen.select('B5'),
      'RED': imagen.select('B4'),
}).rename('SAVI');
return imagen.addBands(ndvi)
             .addBands(mndwi)
             .addBands(ndii)
             .addBands(ndwi)
             .addBands(evi)
             .addBands(rvi)
              .addBands(savi);
};
var l8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
              .filterBounds(punto_interes)
              .map(maskClouds);
var l8ToaSeca;
var l8ToaHumeda;
  var l8ToaSecaAnual=function(){
    var anioInc=2013;
    var anioDesp=anioInc+1;
    l8ToaSeca=ee.ImageCollection([]);
    l8ToaHumeda=ee.ImageCollection([]);
    while(anioInc>=2013 && anioInc<=2019){
      var l8ToaSecaAnual=l8toa.filterDate(anioInc+'-05-01',anioInc+'-11-30');
      var l8ToaHumedaAnual;
      if(anioDesp<=2019){
         l8ToaHumedaAnual=l8toa.filterDate(anioInc+'-12-01',anioDesp+'-04-30');
      }
      l8ToaSeca=l8ToaSeca.merge(l8ToaSecaAnual);
      l8ToaHumeda=l8ToaHumeda.merge(l8ToaHumedaAnual);
      anioInc++;
      anioDesp++;
    }
  };
    var medianaL8ToaSecaIndices;
    var medianaL8ToaHumedaIndices;
    l8ToaSecaAnual();
   l8ToaSeca.evaluate(function(){
     var l8ToaSecaIndices= l8ToaSeca.map(calcularIndices);
     var l8ToaHumedaIndices= l8ToaHumeda.map(calcularIndices);
     l8ToaSecaIndices.evaluate(function(){
         medianaL8ToaSecaIndices=l8ToaSecaIndices.reduce(ee.Reducer.median());
        var greenestSeca = l8ToaSecaIndices.qualityMosaic('NDVI') ;
        var panSeca = pansharp(greenestSeca); 
       Map.addLayer(greenestSeca.clip(recorte),{},'Seca',false);
       Map.addLayer(panSeca.clip(recorte),{},'Mas verde en epoca seca 15m',false);
       Map.addLayer(medianaL8ToaSecaIndices.clip(recorte),{},'Mediana epoca seca');
       l8ToaHumedaIndices.evaluate(function(){
         medianaL8ToaHumedaIndices=l8ToaHumedaIndices.reduce(ee.Reducer.median());
         var greenestHumeda = l8ToaHumedaIndices.qualityMosaic('NDVI') ;
          var panHumeda = pansharp(greenestHumeda); 
          Map.addLayer(greenestHumeda.clip(recorte),{},'Humeda',false);
           Map.addLayer( panHumeda.clip(recorte),{},'Mas verde en epoca humeda 15m',false);
            Map.addLayer(medianaL8ToaHumedaIndices.clip(recorte),{},'Mediana epoca humeda');
       });
     });
    });
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Pastizales',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Haga clic en un punto en el mapa para inspeccionar.')
]);
var longitud=ui.Textbox
    ({
       placeholder: 'Longitud',
       value: '',
       style: {width: '100px'}
     });
var txtLongitud= ui.Panel([
  ui.Label({
    value: 'Colocar la longitud',
  }),
  longitud
]);
var latitud =ui.Textbox
    ({
       placeholder: 'latitud',
       value: '',
       style: {width: '100px'}
     });
var txtLatitud= ui.Panel([
  ui.Label({
    value: 'Colocar latitud',
  }),
  latitud
]);
 var removeLayerSearch = function(name) {
              var layers = Map.layers();
              // list of layers names
              var names = [];
              layers.forEach(function(lay) {
                var lay_name = lay.getName();
                names.push(lay_name);
              });
              // get index
              var index = names.indexOf(name);
              if (index > -1) {
                // if name in names
                var layer = layers.get(index);
                Map.remove(layer);
              } else {
                return;
              }
            };
//panel.add(intro);
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var inspector=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'));
var ndvi_seca_mediana=ui.Label();
var evi_seca_mediana=ui.Label();
var rvi_seca_mediana=ui.Label();
var savi_seca_mediana=ui.Label();
var ndwi_seca_mediana=ui.Label();
var mndwi_seca_mediana=ui.Label();
var ndvi_humeda_mediana=ui.Label();
var evi_humeda_mediana=ui.Label();
var rvi_humeda_mediana=ui.Label();
var savi_humeda_mediana=ui.Label();
var ndwi_humeda_mediana=ui.Label();
var mndwi_humeda_mediana=ui.Label();
var mediana_seca=ui.Label('Mediana');
mediana_seca.style().set('fontWeight', 'bold');
var mediana_humeda=ui.Label('Mediana');
mediana_humeda.style().set('fontWeight', 'bold');
var seca = ui.Panel([
  ui.Label({
    value: 'Época Seca',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
  ui.Label('Mayo-Noviembre'),
  mediana_seca,
  ndvi_seca_mediana,
  evi_seca_mediana,
  rvi_seca_mediana,
  savi_seca_mediana,
  ndwi_seca_mediana,
  mndwi_seca_mediana,
]);
var humeda = ui.Panel([
  ui.Label({
    value: 'Época Húmeda',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
  ui.Label('Diciembre-Abril'),
  mediana_humeda,
  ndvi_humeda_mediana,
  evi_humeda_mediana,
  rvi_humeda_mediana,
  savi_humeda_mediana,
  ndwi_humeda_mediana,
  mndwi_humeda_mediana,
]);
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(6)),
  lat.setValue('lat: ' + coords.lat.toFixed(6));
   var point = ee.Geometry.Point(coords.lon, coords.lat);
   var punto_inspeccion_seca= medianaL8ToaSecaIndices.sample(point,30);
   ndvi_seca_mediana.setValue('NDVI: '+punto_inspeccion_seca.first().get('NDVI_median').getInfo());
  evi_seca_mediana.setValue('EVI: '+punto_inspeccion_seca.first().get('EVI_median').getInfo());
  rvi_seca_mediana.setValue('RVI: '+punto_inspeccion_seca.first().get('RVI_median').getInfo());
  ndwi_seca_mediana.setValue('NDWI: '+punto_inspeccion_seca.first().get('NDWI_median').getInfo());
  mndwi_seca_mediana.setValue('MNDWI: '+punto_inspeccion_seca.first().get('MNDWI_median').getInfo());
  savi_seca_mediana.setValue('SAVI: '+punto_inspeccion_seca.first().get('SAVI_median').getInfo());
  removeLayerSearch('Punto de interes');
  Map.addLayer(point,{color:'red'},'Punto de interes');
  var punto_inspeccion_humeda= medianaL8ToaHumedaIndices.sample(point,30);
  ndvi_humeda_mediana.setValue('NDVI: '+punto_inspeccion_humeda.first().get('NDVI_median').getInfo());
  evi_humeda_mediana.setValue('EVI: '+punto_inspeccion_humeda.first().get('EVI_median').getInfo());
  rvi_humeda_mediana.setValue('RVI: '+punto_inspeccion_humeda.first().get('RVI_median').getInfo());
  ndwi_humeda_mediana.setValue('NDWI: '+punto_inspeccion_humeda.first().get('NDWI_median').getInfo());
  mndwi_humeda_mediana.setValue('MNDWI: '+punto_inspeccion_humeda.first().get('MNDWI_median').getInfo());
  savi_humeda_mediana.setValue('SAVI: '+punto_inspeccion_humeda.first().get('SAVI_median').getInfo());
});
  var main = ui.Panel
            ( 
                {
                      widgets: 
                                [
                                    intro,
                                   inspector,
                                   seca,
                                   humeda
                                ],
                           style: {width: '320px', padding: '8px'}      
                }
            );
  Map.centerObject(recorte);
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);