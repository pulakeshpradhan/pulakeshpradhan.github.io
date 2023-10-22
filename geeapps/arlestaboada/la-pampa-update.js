var recorte=ee.Geometry.Polygon([[
    [-69.6891069408768,-12.97943874575515],
    [-69.84772205318149,-12.85897125478074],
    [-70.25146961177524,-12.898464218983982],
    [-70.2713823315018,-12.937281735705676],
    [-69.99603748286899,-13.107204317360146],
    [-69.69528675044711,-13.012222590499784],
  ]])
//Inicio de Cambios de 1984 al 2019
var ImagenInicio=ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_003069_19841010');
var ImagenFinal=ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_003069_20190808');
var ndvi_LT05 = ImagenInicio.normalizedDifference(['B4', 'B3'])
                .rename('NDVI');
var ndvi_LC08 =ImagenFinal.normalizedDifference(['B5', 'B4'])
                 .rename('NDVI');
ImagenInicio= ImagenInicio.addBands(ndvi_LT05).select('NDVI'); 
ImagenFinal=ImagenFinal.addBands( ndvi_LC08).select('NDVI') ;
var diferenciaNDVI = ImagenFinal.subtract(ImagenInicio).rename('Diferencia_NDVI');
var degradadoParams = {min: -1, max: 1, palette: ['blue','red', 'white', 'green']};
 Map.addLayer(diferenciaNDVI.select('Diferencia_NDVI').clip(recorte),degradadoParams,'Mapa de Cambio de 1984 al 2019');
 //Map.addLayer(ImagenFinal.select('NDVI').clip(recorte),degradadoParams,'La pampa');
  Map.centerObject(ImagenFinal.clip(recorte),10);
//Fin de cambios
var IdsLT05= ['LT05_003069_19841010','LT05_003069_19900824','LT05_003069_19960723',
        'LT05_003069_20010907','LT05_003069_20070823','LT05_003069_20090828',
        'LT05_003069_20100916','LT05_003069_20110903'];
var IdsLC08=['LC08_003069_20141013',  'LC08_003069_20150829','LC08_003069_20160916',
            'LC08_003069_20171005','LC08_003069_20180906','LC08_003069_20190808']
var IDCollectionLTO5='LANDSAT/LT05/C01/T1_TOA' ;
var IDCollectionLC08='LANDSAT/LC08/C01/T1_TOA' ;
var  collectionLTO5;
var collectionLC08;
var collectionFinal;
var IDImagen;
// coleccion LT05
 collectionLTO5=IdsLT05.map(function(ID){
    IDImagen= IDCollectionLTO5+'/'+ID;
    return ee.Image(IDImagen);
    });
var collectionLT=ee.ImageCollection(collectionLTO5);
var collectionLTNDVI=collectionLT.map(function(imagen){
  var ndvi_LT05= imagen.normalizedDifference(['B4', 'B3'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LT05).select('NDVI');
});
//coleccion LC08
   collectionLC08=IdsLC08.map(function(ID){ 
    IDImagen= IDCollectionLC08+'/'+ID;
      return ee.Image(IDImagen);
   });
   var collectionLC=ee.ImageCollection(collectionLC08);
 var collectionLCNDVI=collectionLC.map(function(imagen){
  var ndvi_LC08= imagen.normalizedDifference(['B5', 'B4'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LC08).select('NDVI');
});
//uniendo colecciones
collectionLTNDVI.evaluate(function(){
  collectionLCNDVI.evaluate(function(){
    collectionFinal=collectionLTNDVI.merge(collectionLCNDVI);
    collectionFinal.evaluate(function(){
              // Visualization parameters.
        var args = {
          crs: 'EPSG:3857',  // Maps Mercator
          dimensions: '700',
          region: recorte,
          min: -1,
          max: 1,
          palette: 'blue,red,white, green',
          framesPerSecond: 1,
        };
        // Create a video thumbnail and add it to the map.
        var thumb = ui.Thumbnail({
          // Specifying a collection for "image" animates the sequence of images.
          image: collectionFinal,
          params: args,
          style: {
            position: 'bottom-right',
            width: '500px'
          }});
        Map.add(thumb);
            });
  });
});
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: { position: 'bottom-right', margin: '0px 8px'},
  });
}
function makeLegend(low, mid, high, palette) {
  var legend=ui.Panel();
    var legendTitle=ui.Label
                ({
                    value:'Derecha: NDVI ',
                });
    var legendTitle_2=ui.Label
                ({
                    value:'Centro:Intensidad de cambio ',
                });
    legend.add(legendTitle);
    legend.add(legendTitle_2);
  var labelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal')
      );
 legend.add(labelPanel);
 legend.style().set({
  position: 'top-left'
});
  return ui.Panel([ColorBar(palette), legend]);
}
Map.add(makeLegend(-1, 0, 1, ["blue", "red", "white", "green"]));
//grafico 
// Create a panel to hold our widgets.
//var panel = ui.Panel();
//panel.style().set('width', '320px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Serie temporal de Tambopata:La Pampa',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Haga clic en un punto en el mapa para inspeccionar.')
]);
//panel.add(intro);
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var inspector=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
//ocultar y mostrar panel
var mostrarPanel = ui.Button({
        style: {position: 'middle-left',shown:true},
        label: 'Mostrar panel',
        onClick: function() {
          // Hide the button.
       Map.remove(  mostrarPanel);
          // Display the panel.
          main.style().set('shown',true);
          ocultarPanel.style().set('shown', true);
        }
    });
   var ocultarPanel = ui.Button({
        style: {position: 'top-right'},
        label: 'Ocultar panel',
        onClick: function() {
          // Hide the button.
          ocultarPanel.style().set('shown', false);
          // Display the panel.
          main.style().set('shown', false);
           Map.add( mostrarPanel);
        }
    });
 var main = ui.Panel
            ( 
                {
                      widgets: 
                                [
                                   ocultarPanel,
                                   intro,
                                   inspector,
                                ],
                           style: {width: '320px', padding: '8px'}      
                }
            );
//onclick
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
   var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(2, dot);
   var ndviChart = ui.Chart.image.series(collectionFinal, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI ',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
});
main.clear();
main.add(ocultarPanel);
main.add(intro);
main.add(inspector);
main.add(ndviChart);
});
//agregando 
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);