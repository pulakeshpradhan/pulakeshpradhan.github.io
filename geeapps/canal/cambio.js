var cuenca=ee.FeatureCollection('users/canal/peru').geometry();
var area_de_interes=ee.FeatureCollection('users/canal/limite').geometry();
Map.centerObject(cuenca,5);
var collectionLandsatAnual_1985=ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA').filterBounds(cuenca)
                                                                        .filterDate('1998-01-01','1999-12-31')
                                                                        .filterMetadata('CLOUD_COVER', 'less_than', 20);
var collectionLandsatAnual_2019=ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(cuenca)
                                                                        .filterDate('2017-01-01','2019-12-31')
                                                                        .filterMetadata('CLOUD_COVER', 'less_than', 20);
var collectionLT=collectionLandsatAnual_1985.map(function(imagen){
  var ndvi_LT05= imagen.normalizedDifference(['B4', 'B3'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LT05).select('NDVI');
});
 var collectionLCNDVI=collectionLandsatAnual_2019.map(function(imagen){
  var ndvi_LC08= imagen.normalizedDifference(['B5', 'B4'])
                .rename('NDVI');
  return imagen.addBands(ndvi_LC08).select('NDVI');
});
var median_2019 = collectionLCNDVI.reduce(ee.Reducer.median());
 var median_1985 = collectionLT.reduce(ee.Reducer.median());
var diferenciaNDVI = median_2019.subtract( median_1985).rename('Diferencia_NDVI');
var degradadoParams = {min: -1, max: 1, palette: ['blue','red', 'white', 'green']};
 var  visParams={gamma:1.6,bands:['B5_median','B4_median','B3_median']};   
  var ndviViz={
        min:-1,
        max:1,
       // palette: 'orange,red,white, green',
         palette: [ 'FFA500','FF0000','FFFFFF','008000']
      };
Map.addLayer( median_2019.clip(cuenca), ndviViz,'Peru anaul 2019',false);
Map.addLayer( median_1985.clip(cuenca), ndviViz,'Peru anaul 1985');
 //Map.addLayer( median_2019.clip(cuenca),  visParams,'Peru anaul 2019');
Map.addLayer(area_de_interes,{},'Area de interes');
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
Map.centerObject(cuenca,5)
Map.addLayer(diferenciaNDVI.select('Diferencia_NDVI').clip(cuenca),degradadoParams,'Mapa de Cambio de 1985 al 2019');