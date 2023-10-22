var punto_interes=ee.Geometry.Point([-76.0955, -11.0403]);
var rnj=ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin');
// Landat 8 surface reflection data, rename the band names. See USGS pages for more info
var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(punto_interes)
.map(function(image){
  return image.rename(['B0', 'Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'B7', 'B8', 'B9', 'B10', 'BQA']);
});
// Load Rodrigo Principe's cloud masking module
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();
var landsatCollection =ee.ImageCollection(L8coll).map(maskClouds);
Map.addLayer( landsatCollection.sort('CLOUD_COVER').first().clip(rnj),{bands:['NIR','Red','Green']},'Lago Chinchaycocha');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Serie temporal del Lago Chinchaycocha',
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
var btnAplicar=ui.Panel([
  ui.Button
   ('Aplicar filtro', 
    aplicandoFiltroLtLg
   ),
]);
//panel.add(intro);
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var inspector=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
 var main = ui.Panel
            ( 
                {
                      widgets: 
                                [
                                    intro,
                                   inspector,
                                   txtLongitud,
                                   txtLatitud,
                                   btnAplicar
                                ],
                           style: {width: '320px', padding: '8px'}      
                }
            );
function aplicandoFiltroLtLg(){
   lon.setValue('lon: ' + longitud.getValue()),
   lat.setValue('lat: ' + latitud.getValue());
   var point_1 = ee.Geometry.Point([ee.Number.parse(longitud.getValue()), ee.Number.parse(latitud.getValue())]);
   realizandoGrafica(point_1);
}
var realizandoGrafica=function(point){
          var dot = ui.Map.Layer(point, {color: 'ffff00'});
          Map.layers().set(20, dot);
          //fin de codigo
            // var Chart_indices_1 = ui.Chart.image.series(collectionLCFinal, point, ee.Reducer.mean(), 500);
             var Chart_Bandas = ui.Chart.image.series(landsatCollection , point, ee.Reducer.mean(), 500);
             //var Chart_indices_3 = ui.Chart.image.series(collection_chart_2, point, ee.Reducer.mean(), 500);
              Chart_Bandas.setOptions({
              title: 'Bandas ',
              vAxis: {title: 'Bandas'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
          main.clear();
          main.add(intro);
          main.add(inspector);
          main.add(txtLongitud);
          main.add(txtLatitud);
          main.add(btnAplicar);
          main.add(Chart_Bandas);
         // main.add(Chart_indices_11);
};
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(6)),
  lat.setValue('lat: ' + coords.lat.toFixed(6));
   var point = ee.Geometry.Point(coords.lon, coords.lat);
   realizandoGrafica(point);
});
Map.centerObject(punto_interes,10);
//agregando 
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);