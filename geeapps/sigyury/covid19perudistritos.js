// CASOS COVID19 POR DISTRITO PERÚ
// SIGYURY  
// BY: EFRAIN YURY TURPO CAYO
var params = {
  day : '13',
  month :'06',
  year : '2020'
  }
var PERU = ee.FeatureCollection("users/sigyury/Covid19/covid_simply40")
           .select(['NOMBDEP','NOMBPROV','NOMBDIST','UBIGEO']);
var BASE_TABLE = ee.FeatureCollection("users/sigyury/Covid19/covid_"+params.day+params.month+params.year);
var base130620 = ee.FeatureCollection('users/sigyury/Covid19/covid_07062020')
BASE_TABLE = BASE_TABLE.merge(base130620)
 print(PERU.limit(10))
//Map.addLayer(PERU,{},'PERU',false)
Map.centerObject(PERU,5)
PERU = PERU.map(
          function(feature){
            var add = BASE_TABLE.filterMetadata('UBIGEO', 'equals', ee.Number.parse(feature.get('UBIGEO'), 10))
            return feature.set('casos',add.size())
          })
// PCR
var PCR = PERU.map(
          function(feature){
            var add = BASE_TABLE.filterMetadata('UBIGEO', 'equals', ee.Number.parse(feature.get('UBIGEO'), 10))
                                .filterMetadata('METODODX', 'equals', 'PCR')
            return feature.set('casos',add.size())
          })
// PR
var PR = PERU.map(
          function(feature){
            var add = BASE_TABLE.filterMetadata('UBIGEO', 'equals', ee.Number.parse(feature.get('UBIGEO'), 10))
                                .filterMetadata('METODODX', 'equals', 'PR')
            return feature.set('casos',add.size())
          })
// Make an image out of the attribute.
var RASTER = PERU
  //.filter(ee.Filter.notNull(['COUNT']))
  .reduceToImage({
    properties: ['casos'],
    reducer: ee.Reducer.first()
}).rename('covid');
print(RASTER)
// PCR
var RASTER_PCR = PCR
  //.filter(ee.Filter.notNull(['COUNT']))
  .reduceToImage({
    properties: ['casos'],
    reducer: ee.Reducer.first()
}).rename('covid');
print(RASTER)
// PR
var RASTER_PR = PR
  //.filter(ee.Filter.notNull(['COUNT']))
  .reduceToImage({
    properties: ['casos'],
    reducer: ee.Reducer.first()
}).rename('covid');
print(RASTER)
// Create zones using an expression, display.
var clasif = function (image) {
      var clasificado = image.expression(
          "(b('covid') > 1000) ? 7" +
            ": (b('covid') > 500) ? 6" +
              ": (b('covid') > 250) ? 5" +
                ": (b('covid') > 100) ? 4" +
                   ": (b('covid') > 50) ? 3" +
                     ": (b('covid') > 10) ? 2" +
                        ": (b('covid') > 0) ? 1" +
                ": 0"
      ).clip(PERU)
  return clasificado.toInt8()
}
RASTER = clasif(RASTER);
RASTER_PCR = clasif(RASTER_PCR);
RASTER_PR = clasif(RASTER_PR);
// reproject scale with scale
var RASTER = RASTER.reproject({
              crs: RASTER.projection().crs(),
              scale: 500
            })
var PaletteCOVID = ['C5C5C5','FEE6DA','FC9373','FB6A49','DF2921','A6060D','630101','370000'];
Map.addLayer(RASTER, {min:0 , max:7, palette:PaletteCOVID}, 'Covid19_casosTOT')
Map.addLayer(RASTER_PCR, {min:0 , max:7, palette:PaletteCOVID}, 'Covid19_casosPCR', false)
Map.addLayer(RASTER_PR, {min:0 , max:7, palette:PaletteCOVID}, 'Covid19_casosPR', false)
// Create the application title bar.
Map.add(ui.Label(
    'Distritos en el Perú con casos coronavirus (SARS-CoV-2)', {fontWeight: 'bold', fontSize: '24px',color: '#370000'}));
//--------ADD LAYER GRID-------
// Create an empty image into which to paint the features, cast to byte.
var grid15_1 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outlinegrid = grid15_1.paint({
    featureCollection: PERU,
    color: 1,
    width: 0.5
});
Map.addLayer(outlinegrid, {
    palette: '#000000'
}, 'Limite Distrit',false);
//---------------
//----------------------------------------------------------
// Legend
//----------------------------------------------------------
var names = ee.List(['0 casos','1-10','11-50','51-100','101-250','251-500','501-1000','mas de 1000'])
var ClassPalette= ee.List(PaletteCOVID)
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: '# Casos por Distrito',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
// legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var color = color.getInfo();
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// use getInfo to make the names client-side
var newNames = names.getInfo();
for (var i = 0; i < names.length().getInfo(); i++) {
    legend.add(makeRow(ClassPalette.get(i), newNames[i]));
}
Map.add(legend)
/// ADD CLICK INSPECTOR
var panel = ui.Panel();
panel.style().set({
  width: '150px',
  position: 'top-left'  //top-left   bottom-right
});
var title = ui.Label({
  value: 'Click en el mapa #Casos '+ params.day + '/' +params.month + '/' +params.year,
  style: {fontSize: '20px'}
});
panel.add(title);
var distrito = ui.Label();
var provincia = ui.Label();
var departamento = ui.Label();
var casoscovid = ui.Label();
var fuente = ui.Label();
panel.add(departamento);
panel.add(provincia);
panel.add(distrito);
panel.add(casoscovid);
panel.add(fuente);
Map.onClick(function(coords) {
  // Add a red dot to the map.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var namedist = PERU.filterBounds(point).first().get('NOMBDIST')
  var nameprovincia = PERU.filterBounds(point).first().get('NOMBPROV')
  var namedepartamento = PERU.filterBounds(point).first().get('NOMBDEP')
  var numcasoscovid = PERU.filterBounds(point).first().get('casos')
  casoscovid.setValue('Casos positivos: ' + numcasoscovid.getInfo());
  distrito.setValue('Distrito: ' + namedist.getInfo());
  provincia.setValue('Provincia: ' + nameprovincia.getInfo());
  departamento.setValue('Departamento: ' + namedepartamento.getInfo());
  fuente.setValue('Fuente: MINSA,            Developed by: Efrain Yury Turpo Cayo (SIG-YURY soluciones GEOMATICS)')
  // var dot = ui.Map.Layer(point, {color: 'FF0000'});
  // Map.layers().set(1, dot);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.add(panel);