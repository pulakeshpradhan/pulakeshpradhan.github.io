var recorte=ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin')
              .geometry();
var IdsLT05= ['LT05_007068_20050117','LT05_007068_20050509','LT05_007068_20050525',
              'LT05_007068_20050626','LT05_007068_20050712','LT05_007068_20050728',
              'LT05_007068_20050813','LT05_007068_20050829','LT05_007068_20050930',
              'LT05_007068_20051117'];
var IdsLC08=[]
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
  var ndwi_LT05 = imagen.normalizedDifference(['B2', 'B4']).rename('NDWI');
  var ndvi_LT05= imagen.normalizedDifference(['B4', 'B3'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LT05).addBands(ndwi_LT05).select('NDVI','NDWI');
});
//coleccion LC08
   collectionLC08=IdsLC08.map(function(ID){ 
    IDImagen= IDCollectionLC08+'/'+ID;
      return ee.Image(IDImagen);
   });
   var collectionLC=ee.ImageCollection(collectionLC08);
 var collectionLCNDVI=collectionLC.map(function(imagen){
  var ndwi_LC08 = imagen.normalizedDifference(['B3', 'B5']).rename('NDWI');
  var ndvi_LC08= imagen.normalizedDifference(['B5', 'B4'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LC08).addBands(ndwi_LC08).select('NDVI','NDWI');
});
//uniendo colecciones
collectionLTNDVI.evaluate(function(){
  collectionLCNDVI.evaluate(function(){
    collectionFinal=collectionLTNDVI.merge(collectionLCNDVI);
    Map.addLayer(collectionFinal.first().clip(recorte).select('NDVI'),{},'Año 2005');
    var collectionMosaic= collectionFinal.map(function(imagen){
       var agua=imagen.select('NDWI').gt(0);
       var ndvi=imagen.select('NDVI');
       var mascara_agua= agua.updateMask(agua);
       var mascara_ndvi= ndvi
                         .updateMask(ndvi);
      var ndwiViz = {
               min: 0, 
               max: 1, 
             palette: [ '0000FF']
            };  
      var ndviViz={
        min:-1,
        max:1,
       // palette: 'orange,red,white, green',
         palette: [ 'FFA500','FF0000','FFFFFF','008000']
      };
     var mosaic = ee.ImageCollection
          ([
               mascara_ndvi.visualize(ndviViz),
               mascara_agua.visualize(ndwiViz),
          ]).mosaic();
          return mosaic;
    });
    collectionFinal.evaluate(function(){
              // Visualization parameters.
        var args = {
          crs: 'EPSG:3857',  // Maps Mercator
          dimensions: '350',
          region: recorte,
         // min: -1,
          //max: 1,
         // palette: 'blue,red,white, green',
          framesPerSecond: 1,
        };
        // Create a video thumbnail and add it to the map.
        var thumb = ui.Thumbnail({
          // Specifying a collection for "image" animates the sequence of images.
          //image: collectionFinal.select('NDVI'),
           image: collectionMosaic,
          params: args,
          style: {
            position: 'bottom-right',
            width: '350px'
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
Map.add(makeLegend(-1, 0, 1, ['FFA500', "red", "white", "green"]));
//grafico 
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Serie temporal de Chinchaycocha año 2005',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Haga clic en un punto en el mapa para inspeccionar.')
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
                                   inspector
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
  var dot = ui.Map.Layer(point, {color: 'ffff00'});
  Map.layers().set(2, dot);
   var ndviChart = ui.Chart.image.series(collectionFinal, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI ',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
});
main.clear();
main.add(intro);
main.add(inspector);
main.add(ndviChart);
});
Map.centerObject(recorte);
//agregando 
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);