var recorte=ee.Geometry.Polygon( [[-75.58235724103929,-11.792806015819995],
[-75.46837408674241,-11.792806015819995],
[-75.46837408674241,-11.70406757472895],
[-75.58235724103929,-11.70406757472895],
 [-75.58235724103929,-11.792806015819995]]
);
var punto_interes=ee.Geometry.Point([-75.53834, -11.7659]);
// Landat 5 surface reflection data
var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
.filterDate('1985-01-01','2012-01-01')
.filter(ee.Filter.lt('CLOUD_COVER',100))
.filterBounds(punto_interes)
.map(function(image){
  return image.rename(['B1', 'B2', 'B3', 'B4', 'B5', 'BT', 'B6','BQA']);
});
// Landat 8 surface reflection data, rename the band names. See USGS pages for more info
var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(punto_interes)
.map(function(image){
  return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'BQA']);
});
//.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
// Load Rodrigo Principe's cloud masking module
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var maskClouds = cloud_masks.landsatTOA();
var landsatCollection =ee.ImageCollection(L5coll.merge(L8coll)).map(maskClouds);
 var collectionLCFinal=landsatCollection.map(function(imagen){
  var NIR='B4';
  var RED='B3';
  var GREEN='B2';
  var SWIR_1='B5';
  var SWIR_2='B6';
  var ndwi_LC08 = imagen.normalizedDifference([GREEN, NIR]).rename('NDWI');
  var mndwi_LC08=imagen.normalizedDifference([GREEN, SWIR_2]).rename('MNDWI');
  var ndii_LC08=imagen.normalizedDifference([NIR, SWIR_2]).rename('NDII');
  var ndvi_LC08= imagen.normalizedDifference([NIR, RED])
                .rename('NDVI');
//indice calculado
var GREEN_cal=imagen.select('B2');
var BLUE_cal=imagen.select('B1');
var RED_cal=imagen.select('B3');
var NIR_cal=imagen.select('B4');
var SWIR_1_cal=imagen.select('B5');
var SWIR_2_cal=imagen.select('B6');
 var wri_LC08=GREEN_cal.add(RED_cal).divide(NIR_cal.add(SWIR_2_cal)).rename('WRI');
  var TWC_CRIS_LC08 = imagen.expression(
    '0.0315*BLUE+0.2021*GREEN+0.3102*RED+0.1594*NIR-0.6806*SWIR_1-0.6109*SWIR_2', {
      'NIR': imagen.select('B4'),
      'RED': imagen.select('B3'),
      'BLUE': imagen.select('B1'),
      'GREEN': imagen.select('B2'),
      'SWIR_1':imagen.select('B5'),
      'SWIR_2':imagen.select('B6'),
}).rename('TWC_CRIS');
var AWEI_shadow= imagen.expression(
    'BLUE+2.5*GREEN-1.5*NIR+SWIR_1-0.25*SWIR_2', {
      'NIR': imagen.select('B4'),
      'RED': imagen.select('B3'),
      'BLUE': imagen.select('B1'),
      'GREEN': imagen.select('B2'),
      'SWIR_1':imagen.select('B5'),
      'SWIR_2':imagen.select('B6'),
}).rename('AWEI_shadow');
var WI_2015= imagen.expression(
    '1.7204+171*GREEN+3*RED-70*NIR-45*SWIR_1-7*SWIR_2', {
      'NIR': imagen.select('B4'),
      'RED': imagen.select('B3'),
      'BLUE': imagen.select('B1'),
      'GREEN': imagen.select('B2'),
      'SWIR_1':imagen.select('B5'),
      'SWIR_2':imagen.select('B6'),
}).rename('WI_2015');
  return imagen.addBands(ndvi_LC08)
                .addBands(ndwi_LC08)
                .addBands(mndwi_LC08)
                .addBands(ndii_LC08)
                .addBands(wri_LC08)
                .addBands(TWC_CRIS_LC08)
                .addBands(AWEI_shadow)
                .addBands(WI_2015);
               // .select('NDVI','NDWI','MNDWI','NDII','WRI','TWC_CRIS','AWEI_shadow','WI_2015');
});
var collection_chart_1=collectionLCFinal.select('NDVI','NDWI','MNDWI','NDII','TWC_CRIS','AWEI_shadow');
var collection_chart_2=collectionLCFinal.select('WRI','WI_2015');
collectionLCFinal.evaluate(function(){
  Map.addLayer( collectionLCFinal.first().clip(recorte).select('NDVI'),{},'Tragadero');
  var Tragadero_a = ee.Geometry.Point(-75.533451, -11.767604);
   Map.addLayer(Tragadero_a,{color: 'ff0000 '},'Tragadero_a');
  var Tragadero_b = ee.Geometry.Point(-75.532829, -11.766028);
   Map.addLayer(Tragadero_b,{color: 'ff0000 '},'Tragadero_b');
  var Tragadero_c= ee.Geometry.Point(-75.533034, -11.764957);
   Map.addLayer(Tragadero_c,{color: 'ff0000 '},'Tragadero_c');
  var Tragadero_d = ee.Geometry.Point(-75.538963, -11.761369);
   Map.addLayer(Tragadero_d,{color: 'ff0000 '},'Tragadero_d');
    var paca_a = ee.Geometry.Point(-75.502946, -11.733909);
   Map.addLayer(paca_a ,{color: 'ff0000 '},'Paca_a');
     var paca_b = ee.Geometry.Point(-75.507993	, -11.728564);
   Map.addLayer(paca_b ,{color: 'ff0000 '},'Paca_b');
     var paca_c = ee.Geometry.Point(-75.5097573, -11.734756);
   Map.addLayer(paca_c ,{color: 'ff0000 '},'Paca_c');
     var paca_d = ee.Geometry.Point(-75.508737, -11.739234);
   Map.addLayer(paca_d ,{color: 'ff0000 '},'Paca_d');
     var paca_e = ee.Geometry.Point(-75.512752, -11.721819);
   Map.addLayer(paca_e ,{color: 'ff0000 '},'Paca_e');
       var paca_f = ee.Geometry.Point(-75.506687, -11.717254);
   Map.addLayer(paca_f ,{color: 'ff0000 '},'Paca_f');
   var nahuinpuquio_a = ee.Geometry.Point(-75.338205, -12.071629);
   Map.addLayer(nahuinpuquio_a ,{color: 'ff0000 '},'nahuinpuquio_a');
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Serie temporal de tragadero y paca',
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
          Map.layers().set(12, dot);
          //inicio codigo harmonic
          // The dependent variable we are modeling.
            var dependent = 'NDVI';
          // The number of cycles per year to model.
            var harmonics = 1;
            // Make a list of harmonic frequencies to model.
            // These also serve as band name suffixes.
            var harmonicFrequencies = ee.List.sequence(1, harmonics);
            // Function to get a sequence of band names for harmonic terms.
            var constructBandNames = function(base, list) {
              return ee.List(list).map(function(i) {
                return ee.String(base).cat(ee.Number(i).int());
              });
            };
            // Construct lists of names for the harmonic terms.
            var cosNames = constructBandNames('cos_', harmonicFrequencies);
            var sinNames = constructBandNames('sin_', harmonicFrequencies);
            // Independent variables.
            var independents = ee.List(['constant', 't'])
              .cat(cosNames).cat(sinNames);
           // Function to add a time band.
            var addDependents = function(image) {
              // Compute time in fractional years since the epoch.
              var years = image.date().difference('1970-01-01', 'year');
              var timeRadians = ee.Image(years.multiply(2 * Math.PI)).rename('t');
              var constant = ee.Image(1);
              return image.addBands(constant).addBands(timeRadians.float());
            };
            // Function to compute the specified number of harmonics
            // and add them as bands.  Assumes the time band is present.
            var addHarmonics = function(freqs) {
              return function(image) {
                // Make an image of frequencies.
                var frequencies = ee.Image.constant(freqs);
                // This band should represent time in radians.
                var time = ee.Image(image).select('t');
                // Get the cosine terms.
                var cosines = time.multiply(frequencies).cos().rename(cosNames);
                // Get the sin terms.
                var sines = time.multiply(frequencies).sin().rename(sinNames);
                return image.addBands(cosines).addBands(sines);
              };
            };
                          // Filter to the area of interest, mask clouds, add variables.
            var harmonicLandsat = collectionLCFinal
              .filterBounds(point)
              .map(maskClouds)
              .map(addDependents)
              .map(addHarmonics(harmonicFrequencies));
          //inicio NDVI
            // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendNDVI = harmonicLandsat
                .select(independents.add('NDVI'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsNDVI = harmonicTrendNDVI.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicNDVI = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsNDVI)
                    .reduce('sum')
                    .rename('fitted'));
              });
           var Chart_indices_1=ui.Chart.image.series(fittedHarmonicNDVI.select(['fitted','NDVI']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //FIN NDVI
          //inicio ndwi
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendNDWI = harmonicLandsat
                .select(independents.add('NDWI'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsNDWI= harmonicTrendNDWI.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicNDWI = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsNDWI)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_2=ui.Chart.image.series(fittedHarmonicNDWI.select(['fitted','NDWI']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin ndwi
           //inicio ndii
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendNDII = harmonicLandsat
                .select(independents.add('NDII'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsNDII= harmonicTrendNDII.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicNDII = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsNDII)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_3=ui.Chart.image.series(fittedHarmonicNDII.select(['fitted','NDII']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin ndii
          //inicio mndwi
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendMNDWI = harmonicLandsat
                .select(independents.add('MNDWI'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsMNDWI= harmonicTrendMNDWI.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicMNDWI = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsMNDWI)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_4=ui.Chart.image.series(fittedHarmonicMNDWI.select(['fitted','MNDWI']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin mndwi
           //inicio AWEI_shadow
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendAWEI_shadow = harmonicLandsat
                .select(independents.add('AWEI_shadow'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsAWEI_shadow= harmonicTrendAWEI_shadow.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicAWEI_shadow = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsAWEI_shadow)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_5=ui.Chart.image.series(fittedHarmonicAWEI_shadow.select(['fitted','AWEI_shadow']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin AWEI_shadow
            //inicio TWC_CRIS
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendTWC_CRIS = harmonicLandsat
                .select(independents.add('TWC_CRIS'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsTWC_CRIS= harmonicTrendTWC_CRIS.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicTWC_CRIS = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsTWC_CRIS)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_6=ui.Chart.image.series(fittedHarmonicTWC_CRIS.select(['fitted','TWC_CRIS']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin TWC_CRIS
          //inicio WI_2015
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendWI_2015 = harmonicLandsat
                .select(independents.add('WI_2015'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsWI_2015= harmonicTrendWI_2015.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicWI_2015 = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsWI_2015)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_7=ui.Chart.image.series(fittedHarmonicWI_2015.select(['fitted','WI_2015']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin WI_2015
          //inicio Wri
           // The output of the regression reduction is a 4x1 array image.
              var harmonicTrendWRI = harmonicLandsat
                .select(independents.add('WRI'))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
            // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficientsWRI= harmonicTrendWRI.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
              // Compute fitted values.
              var fittedHarmonicWRI = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(independents)
                    .multiply(harmonicTrendCoefficientsWRI)
                    .reduce('sum')
                    .rename('fitted'));
              });
               var Chart_indices_8=ui.Chart.image.series(fittedHarmonicWRI.select(['fitted','WRI']), point, ee.Reducer.mean(), 30)
                  .setOptions({
                    title: 'Harmonic model: original and fitted values',
                    lineWidth: 1,
                    pointSize: 3,
              });
          //fin Wro
          //fin de codigo
            // var Chart_indices_1 = ui.Chart.image.series(collectionLCFinal, point, ee.Reducer.mean(), 500);
             var Chart_indices_11 = ui.Chart.image.series(collection_chart_1, point, ee.Reducer.mean(), 500);
             //var Chart_indices_3 = ui.Chart.image.series(collection_chart_2, point, ee.Reducer.mean(), 500);
              Chart_indices_1.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_2.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_3.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
             Chart_indices_4.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_5.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_6.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_7.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_8.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
           Chart_indices_11.setOptions({
              title: 'indices espectrales ',
              vAxis: {title: 'indices espectrales'},
              hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
          });
          main.clear();
          main.add(intro);
          main.add(inspector);
          main.add(txtLongitud);
          main.add(txtLatitud);
          main.add(btnAplicar);
          main.add(Chart_indices_1);
          main.add(Chart_indices_2);
          main.add(Chart_indices_3);
          main.add(Chart_indices_4);
          main.add(Chart_indices_5);
          main.add(Chart_indices_6);
           main.add(Chart_indices_7);
          main.add(Chart_indices_8);
          main.add(Chart_indices_11);
};
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(6)),
  lat.setValue('lat: ' + coords.lat.toFixed(6));
   var point = ee.Geometry.Point(coords.lon, coords.lat);
   realizandoGrafica(point);
});
Map.centerObject(recorte);
//agregando 
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);