var NoAgua = ui.import && ui.import("NoAgua", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.60303733197858,
                16.02479680442648
              ],
              [
                -90.60243651715925,
                16.031272596564467
              ],
              [
                -90.60273692456892,
                16.032015030634593
              ],
              [
                -90.60595557538679,
                16.02714791250713
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.41213739505382,
                15.9305110855415
              ],
              [
                -90.41112888446422,
                15.93146022872871
              ],
              [
                -90.41181552997203,
                15.931872898279783
              ],
              [
                -90.41237342944713,
                15.931357061208374
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -89.55808938833437,
                15.440226021129428
              ],
              [
                -89.55396951528749,
                15.44564495853876
              ],
              [
                -89.55650152059755,
                15.446596360418186
              ],
              [
                -89.55937684866151,
                15.443990336177691
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.50158201198757,
                15.970121077360663
              ],
              [
                -90.50244031887233,
                15.972266535927142
              ],
              [
                -90.50561605434596,
                15.970533667332171
              ],
              [
                -90.50535856228053,
                15.968553227714613
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.57921109346714,
                16.05088920834993
              ],
              [
                -90.57981190828647,
                16.053611185105073
              ],
              [
                -90.58212933687534,
                16.052786347593372
              ],
              [
                -90.58084187654819,
                16.050229329593982
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "Cobertura": 0
      },
      "color": "#ff00cf",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff00cf */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.60303733197858, 16.02479680442648],
                  [-90.60243651715925, 16.031272596564467],
                  [-90.60273692456892, 16.032015030634593],
                  [-90.60595557538679, 16.02714791250713]]]),
            {
              "Cobertura": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.41213739505382, 15.9305110855415],
                  [-90.41112888446422, 15.93146022872871],
                  [-90.41181552997203, 15.931872898279783],
                  [-90.41237342944713, 15.931357061208374]]]),
            {
              "Cobertura": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-89.55808938833437, 15.440226021129428],
                  [-89.55396951528749, 15.44564495853876],
                  [-89.55650152059755, 15.446596360418186],
                  [-89.55937684866151, 15.443990336177691]]]),
            {
              "Cobertura": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.50158201198757, 15.970121077360663],
                  [-90.50244031887233, 15.972266535927142],
                  [-90.50561605434596, 15.970533667332171],
                  [-90.50535856228053, 15.968553227714613]]]),
            {
              "Cobertura": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.57921109346714, 16.05088920834993],
                  [-90.57981190828647, 16.053611185105073],
                  [-90.58212933687534, 16.052786347593372],
                  [-90.58084187654819, 16.050229329593982]]]),
            {
              "Cobertura": 0,
              "system:index": "4"
            })]),
    Alta_Verapaz = ui.import && ui.import("Alta_Verapaz", "table", {
      "id": "users/nestorcaalsuc/Shapes/MunicipiosUTM"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/MunicipiosUTM"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.85079207743428,
                16.094696740573948
              ],
              [
                -90.85079207743428,
                15.100026110166771
              ],
              [
                -89.40334334696554,
                15.100026110166771
              ],
              [
                -89.40334334696554,
                16.094696740573948
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-90.85079207743428, 16.094696740573948],
          [-90.85079207743428, 15.100026110166771],
          [-89.40334334696554, 15.100026110166771],
          [-89.40334334696554, 16.094696740573948]]], null, false),
    Delimitacion = ui.import && ui.import("Delimitacion", "table", {
      "id": "users/nestorcaalsuc/Shapes/Alta_Verapaz"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/Alta_Verapaz"),
    Agua = ui.import && ui.import("Agua", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.66853434983216,
                15.926495849846257
              ],
              [
                -90.6799069160553,
                15.925381610267994
              ],
              [
                -90.67853362503968,
                15.913289649911775
              ],
              [
                -90.66767604294739,
                15.913743627442518
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.49262926007698,
                16.007123747503968
              ],
              [
                -90.49177095319222,
                16.017683828069735
              ],
              [
                -90.49451753522347,
                16.017683828069735
              ],
              [
                -90.49558488815667,
                16.00652092421427
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "Cobertura": 1
      },
      "color": "#071cd6",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #071cd6 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.66853434983216, 15.926495849846257],
                  [-90.6799069160553, 15.925381610267994],
                  [-90.67853362503968, 15.913289649911775],
                  [-90.66767604294739, 15.913743627442518]]]),
            {
              "Cobertura": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-90.49262926007698, 16.007123747503968],
                  [-90.49177095319222, 16.017683828069735],
                  [-90.49451753522347, 16.017683828069735],
                  [-90.49558488815667, 16.00652092421427]]]),
            {
              "Cobertura": 1,
              "system:index": "1"
            })]),
    ecoregions = ui.import && ui.import("ecoregions", "table", {
      "id": "projects/google/charts_feature_example"
    }) || ee.FeatureCollection("projects/google/charts_feature_example"),
    Acumulado = ui.import && ui.import("Acumulado", "table", {
      "id": "users/nestorcaalsuc/Shapes/PP_ACUMULADO"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/PP_ACUMULADO"),
    Diaria = ui.import && ui.import("Diaria", "table", {
      "id": "users/nestorcaalsuc/Shapes/PP_DIARIA"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/PP_DIARIA");
// Cargando Sentinel-1 C-band SARRecolección de rango de tierra (escala logarítmica, VV, descendente)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')) .filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(geometry)
.map(function (image){return image.clip(geometry);})
.select('VV');
//print(collectionVV, 'Collection VV'); 
//Filtrar por dia
var antes = collectionVV.filterDate('2020-10-01', '2020-10-15').mosaic();
var despues = collectionVV.filterDate('2020-11-01', '2020-11-30').mosaic();
//Aplicar filtro de speckle
var SMOOTHING_RADIUS = 50;
var antes_filtered = antes.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var despues_filtered = despues.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//Composición sentinel
var S2 = ee.ImageCollection('COPERNICUS/S2')
//Centrar el mapa sobre la región de interés usando el archivo shapefile de la región.
Map.centerObject(geometry,9.5)
//Map.setOptions('satellite') 
///////////////////////////////////////////////////////////////
// 2) Configurando una Imagen Sentinel Compuesta Filtrada     //
///////////////////////////////////////////////////////////////
//2.1) Emmascarar las nuber
////////////////////
//Los datos de Landsat incluyen una banda 'pixel_qa’ que se puede utilizar para crear una función para enmascarar las nubes.
function maskClouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//2.2) AAñadir indice espectrales
///////////////////////////////
// Esta función mapea índices espectrales para el mapeo de manglares usando imágenes Sentinel 2
var addIndicesS2 = function(img) {
  // NDVI = Normalized Difference Vegetation Index (Rojo e IR Cercano), para cuantificar la vegetación
  var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI');
  // NDMI = Normalized Difference Moisture Index (IR Cercano e IR Onda Corta), contenido húmedo de la vegetación
  var ndmi = img.normalizedDifference(['B12','B3']).rename('NDMI');
  // MNDWI = Modified Normalized Difference Water Index (Verde e IR Onda Corta) (Hanqiu Xu, 2006), información sobre el agua
  var mndwi = img.normalizedDifference(['B3','B11']).rename('MNDWI');
  //SR = Simple Ratio (Rojo e IR Cercano), indice de vegetación simple
  var sr = img.select('B8').divide(img.select('B4')).rename('SR');
  //Ratio54 = Band Ratio 54 equivalente 11-8 (IR Onda Corta e IR Cercano), para mapear las Características del Agua
  var ratio54 = img.select('B11').divide(img.select('B8')).rename('R54');
  //Ratio35 = Band Ratio 35 radio 3-11 (Rojo e IR Onda Corta), para mapear las Características del Agua
  var ratio35 = img.select('B4').divide(img.select('B11')).rename('R35');
  //GCVI = Green Chlorophyll Vegetation Index (IR Cercano y Verde), Biomasa de hojas verdes
  var gcvi = img.expression('(NIR/GREEN)-1',{
    'NIR':img.select('B8'),
    'GREEN':img.select('B3')
  }).rename('GCVI');
  return img
    .addBands(ndvi)
    .addBands(ndmi)
    .addBands(mndwi)
    .addBands(sr)
    .addBands(ratio54)
    .addBands(ratio35)
    .addBands(gcvi);
};
var year = '2020';
var startDate = '2020-11-01';
var endDate = '2020-12-15';
var s2 = S2.filterDate(startDate,endDate)
    .map(maskClouds)
    .map(addIndicesS2)
var composite = s2
              // Uses the median reducer
              .median() 
              // Clips the composite to our area of interest
              .clip(geometry); 
var NDVIMask = composite.select('NDVI').lte(0.25);
var MNDWIMask = composite.select('MNDWI').gt(-0.5);
var compositeNew = composite
                        .updateMask(NDVIMask)
                        .updateMask(MNDWIMask)
var visPar = {bands:['B8','B11','B4'], min: 0, max: 0.35}; 
var classes = Agua.merge(NoAgua)
var bands = ['B8','B11','B4','NDVI','MNDWI','SR','GCVI']
var image = compositeNew.select(bands).clip(geometry)
var samples = image.sampleRegions({
    collection: classes, // Conjunto de geometrías seleccionadas para entrenamiento
    properties: ['Cobertura'], // Etiqueta en la geometría
    scale: 20 //Cada muestra tenga el mismo tamaño que el píxel de Sentinel
    }).randomColumn('random'); // Crea una columna con números aleatorios
var split = 0.8; // Aproximadamente 80% para entrenamiento, 20% para pruebas.
var training = samples.filter(ee.Filter.lt('random', split)); //Conjunto de training
var testing = samples.filter(ee.Filter.gte('random', split)); //Conjunto de testing  
    var classifier = ee.Classifier.smileRandomForest(100,5).train({ 
    features: training.select(['B8','B11','B4','NDVI','MNDWI','SR','GCVI', 'Cobertura']), // Entrenar usando bandas y propiedad de cobertura terrestre
    classProperty: 'Cobertura', // Usa la propiedad de cobertura terrestre de las clases
    inputProperties: bands
    });    
    var validation = testing.classify(classifier);
    var testAccuracy = validation.errorMatrix('Cobertura', 'classification');
    var classifiedrf = image.select(bands) // Selecciona los predictores
                      .classify(classifier); // .classify aplica Random Forest
// Los resultados del modelo pueden ser "ruidosos". Para reducir el ruido, cree una máscara para enmascarar
// píxeles no conectados
    var pixelcount = classifiedrf.connectedPixelCount(100, false); // Crea una imagen que muestre la cantidad de píxeles a los que está conectado cada píxel
    var countmask = pixelcount.select(0).gt(25); // filtra todos los píxeles conectados a 4 o menos
// Enmascara los resultados para mostrar solo la extensión del manglar
    var classMask = classifiedrf.select('classification').gt(0)
    var classed= classifiedrf.updateMask(countmask).updateMask(classMask)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-01-01', '2020-10-15')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .map(function (image){return image.clip(geometry);});
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B12', 'B8A', 'B3'],
};
var dataset2 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-11-16', '2020-12-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                 .map(function (image){return image.clip(geometry);});
var rgbVis2 = {
  min: 0.0,
  max: 0.3,
  bands: ['B12', 'B8A', 'B3'],
};
//Transparentar el relleno de los shapes
var DelimitacionAOI = ee.Image().byte();
var Delimitacion = DelimitacionAOI.paint({featureCollection: Delimitacion, width: 2,});
// Crear variables para capas de GUI para cada capa
var A = ui.Map.Layer(classed, {min: 1, max: 1, palette:'blue'}, 'Zona Inundada ',false);
var B = ui.Map.Layer(antes_filtered, {min:-25,max:0}, 'Sentinel-1 SAR Antes', false);
var C = ui.Map.Layer(despues_filtered, {min:-25,max:0}, 'Sentinel-1 SAR Despues', false)
var D = ui.Map.Layer(dataset.median(), rgbVis, 'Sentinel antes de ETA e IOTA',false);
var E = ui.Map.Layer(dataset2.median(), rgbVis2, 'Sentinel despues de ETA e IOTA',false);
var F = ui.Map.Layer(Delimitacion, {palette: 'red', opacity: 0.8}, 'Alta Verapaz');
//Agrega  capas al mapa. Se agregarán pero no se mostrarán
Map.add(B)
Map.add(C)
Map.add(D)
Map.add(E)
Map.add(F)
Map.add(A)
// ////////////////////////////////////////////////// ///////////////
// // Configurar paneles y widgets para su visualización //
// ////////////////////////////////////////////////// ///////////////
// Configurar widgets de título y resumen
// Título de la aplicación
var header = ui.Label('Departamento de Alta Verapaz\n Huracanes ETA-IOTA', 
            { fontSize: '20px', fontWeight: 'bold', color: '0000ff'});
// Resumen de la aplicación
var text = ui.Label(
  'Este visor ha sido diseñado para ver las zonas inundadas por los ' + 'huracanes  ETA e IOTA. ',
    {fontSize: '12px'});
 var text2 = ui.Label(
  'La información que se encuentra dispuesta inicia desde el 01 al 30 de noviembre del 2020.'+ 
  'Debe tenerse en cuenta que las imágenes ópticas para el cálculo de las zonas inundadas post huracanes, '+ 
  'son obtenidas de la aplicación de Machine Learning a partir de pixeles de 10 metros; con lo que, '+
  'el modelamiento en zonas urbanas, genera estimaciones con ruido proveniente de la reflectancia variada del lugar',
    {fontSize: '12px'});   
// Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text, text2],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(1,panel)
////////////////////////////////////////////////// ///////////////
// // 4) Agregar widgets de casilla de verificación y leyendas //
// ////////////////////////////////////////////////// ///////////////
// //4.1) Crea una nueva etiqueta para esta serie de casillas de verificación
var extLabel = ui.Label({value:'Fechas de Monitoreo',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var extCheckA = ui.Checkbox('Zona Inundada').setValue(false);
var extCheckB = ui.Checkbox('Sentinel-1 SAR Antes').setValue(false); 
var extCheckC = ui.Checkbox('Sentinel-1 SAR Después').setValue(false); 
var extCheckD = ui.Checkbox('Sentinel-2A antes de ETA e IOTA').setValue(false); 
var extCheckE = ui.Checkbox('Sentinel-2A Después de ETA e IOTA').setValue(false); 
var extCheckF = ui.Checkbox('Alta Verapaz').setValue(true); 
// // Crear leyendas
// //El siguiente código crea leyendas que podemos agregar al panel
// // Leyenda de extensión
// // Establecer la posición del panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // Lo siguiente crea y aplica estilo a 1 fila de la leyenda.
var makeRowa = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Crea una etiqueta con el texto de descripción.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
            // Devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Agregue estos nuevos widgets al panel en el orden en que desea que aparezcan.
panel.add(extCheckA)
     .add(extCheckB)
     .add(extCheckC)
     .add(extCheckD)
     .add(extCheckE)
     .add(extCheckF)
// ////////////////////////////////////////////////// ///////////////
// // Agregar funcionalidad a los widgets //
// ////////////////////////////////////////////////// ///////////////
// // Para cada casilla de verificación creamos una función para que al hacer clic en la casilla de verificación
// // Activa capas de interés  
var doCheckboxA = function() {
  extCheckA.onChange(function(checked){
  A.setShown(checked)
  })
}
doCheckboxA();   
var doCheckboxB = function() {
  extCheckB.onChange(function(checked){
  B.setShown(checked)
  })
}
doCheckboxB();     
var doCheckboxC = function() {
  extCheckC.onChange(function(checked){
  C.setShown(checked)
  })
}
doCheckboxC();     
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxC();   
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxD(); 
var doCheckboxE = function() {
  extCheckE.onChange(function(checked){
  E.setShown(checked)
  })
}
doCheckboxE(); 
var doCheckboxF = function() {
  extCheckF.onChange(function(checked){
  F.setShown(checked)
  })
}
doCheckboxF();     
var lugares = {
  Playitas: [-90.49108, 15.99965],
  Campur: [-90.04701, 15.63365],
  El_Faisan: [-90.5891, 15.81584],
  Polochic: [-89.5885, 15.4013],
  Sesajal: [-90.1944, 15.72837]
};
var ubicar = ui.Select({
  items: Object.keys(lugares),
  onChange: function(key) {
    Map.setCenter(lugares[key][0], lugares[key][1],13);
  }
});
// Marcador de posición
ubicar.setPlaceholder('Principales Zonas afectadas');
panel.add(ubicar);
// Defina un diccionario que asocie nombres de propiedad con valores y etiquetas.
var precipInfo = {
  '01_nov': {v: 1, f: '01'},
  '02_nov': {v: 2, f: '02'},
  '03_nov': {v: 3, f: '03'},
  '04_nov': {v: 4, f: '04'},
  '05_nov': {v: 5, f: '05'},
  '06_nov': {v: 6, f: '06'},
  '07_nov': {v: 7, f: '07'},
  '08_nov': {v: 8, f: '08'},
  '09_nov': {v: 9, f: '09'},
  '10_nov': {v: 10, f: '10'},
  '11_nov': {v: 11, f: '11'},
  '12_nov': {v: 12, f: '12'},
  '13_nov': {v: 13, f: '13'},
  '14_nov': {v: 14, f: '14'},
  '15_nov': {v: 15, f: '15'},
  '16_nov': {v: 16, f: '16'},
  '17_nov': {v: 17, f: '17'},
  '18_nov': {v: 18, f: '18'},
  '19_nov': {v: 19, f: '19'},
  '20_nov': {v: 20, f: '20'},
  '21_nov': {v: 21, f: '21'},
  '22_nov': {v: 22, f: '22'},
  '23_nov': {v: 23, f: '23'},
  '24_nov': {v: 24, f: '24'},
  '25_nov': {v: 25, f: '25'},
  '26_nov': {v: 26, f: '26'},
  '27_nov': {v: 27, f: '27'},
  '28_nov': {v: 28, f: '28'},
  '29_nov': {v: 29, f: '29'},
  '30_nov': {v: 30, f: '30'},
};
// Organizar la información de propiedad en objetos para definir x propiedades y
// sus etiquetas de tick.
var xPropValDict = {};  // Diccionario para codificar los nombres de las propiedades del eje x como valores.
var xPropLabels = [];   // Contiene diccionarios que etiquetan valores codificados del eje x.
for (var key in precipInfo) {
  xPropValDict[key] = precipInfo[key].v;
  xPropLabels.push(precipInfo[key]);
}
// Define the chart and print it to the console.
var chart = ui.Chart.feature
                .byProperty({
                  features: Acumulado,
                  xProperties: xPropValDict,
                  seriesProperty: 'Estacion'
                })
                .setChartType('AreaChart')
                .setOptions({
                  title: 'Precipitación acumulada en el mes de Noviembre 2020, periodo de los Huracanes ETA e IOTA en Alta Verapaz',
                  hAxis: {
                    title: 'Noviembre',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Precipitation (mm)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['red', 'blue', 'cyan','green', 'yellow', 'purple','orange', 'brown', 'gray','pink'],
                  lineSize: 3,
                  pointSize: 0,
                  curveType: 'function'
                });
// Defina un diccionario que asocie nombres de propiedad con valores y etiquetas.
var precipInfo1 = {
  '01_nov': {v: 1, f: '01'},
  '02_nov': {v: 2, f: '02'},
  '03_nov': {v: 3, f: '03'},
  '04_nov': {v: 4, f: '04'},
  '05_nov': {v: 5, f: '05'},
  '06_nov': {v: 6, f: '06'},
  '07_nov': {v: 7, f: '07'},
  '08_nov': {v: 8, f: '08'},
  '09_nov': {v: 9, f: '09'},
  '10_nov': {v: 10, f: '10'},
  '11_nov': {v: 11, f: '11'},
  '12_nov': {v: 12, f: '12'},
  '13_nov': {v: 13, f: '13'},
  '14_nov': {v: 14, f: '14'},
  '15_nov': {v: 15, f: '15'},
  '16_nov': {v: 16, f: '16'},
  '17_nov': {v: 17, f: '17'},
  '18_nov': {v: 18, f: '18'},
  '19_nov': {v: 19, f: '19'},
  '20_nov': {v: 20, f: '20'},
  '21_nov': {v: 21, f: '21'},
  '22_nov': {v: 22, f: '22'},
  '23_nov': {v: 23, f: '23'},
  '24_nov': {v: 24, f: '24'},
  '25_nov': {v: 25, f: '25'},
  '26_nov': {v: 26, f: '26'},
  '27_nov': {v: 27, f: '27'},
  '28_nov': {v: 28, f: '28'},
  '29_nov': {v: 29, f: '29'},
  '30_nov': {v: 30, f: '30'},
};
// Organizar la información de propiedad en objetos para definir x propiedades y
// sus etiquetas de tick.
var xPropValDict1 = {};  // Diccionario para codificar los nombres de las propiedades del eje x como valores.
var xPropLabels1 = [];   // Contiene diccionarios que etiquetan valores codificados del eje x.
for (var key in precipInfo1) {
  xPropValDict1[key] = precipInfo1[key].v;
  xPropLabels1.push(precipInfo1[key]);
}
// Define the chart and print it to the console.
var chart1 = ui.Chart.feature
                .byProperty({
                  features: Diaria,
                  xProperties: xPropValDict1,
                  seriesProperty: 'Estacion'
                })
                .setChartType('AreaChart')
                .setOptions({
                  title: 'Precipitación diaria en el mes de Noviembre 2020, periodo de los Huracanes ETA e IOTA en Alta Verapaz',
                  hAxis: {
                    title: 'Noviembre',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels1
                  },
                  vAxis: {
                    title: 'Precipitation (mm)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['red', 'blue', 'cyan','green', 'yellow', 'purple','orange', 'brown', 'gray','pink'],
                  lineSize: 3,
                  pointSize: 0,
                  curveType: 'function'
                });
///Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro2 = ui.Panel([
  ui.Label({
    value: '_______________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Autor: Ing. M.Sc. Nestor Caal Suc\n Doctorando en Ingeniería Geomática y Agricultura de Presición.\n Enero del Año 2021',
    style: {fontWeight: 'normal',  color: '#505050', fontSize: '12px', margin: '10px 5px'},
    targetUrl: 'https://www.facebook.com/nestorerick.caal'
  })]);
var intro3 = ui.Label({
  value: 'Fuente de datos Meteorológicos: ANACAFE',
  style: {fontSize: '11px', color: '#505050', margin: '10px 5px'}, 
  targetUrl: 'https://meteorologia.anacafe.org/'
});
var intro5 = ui.Label({
  value: 'Fuente de imágenes: Sentinel Online - ESA - Sentinel - Copernicus',
  style: {fontSize: '11px', color: '#505050', margin: '10px 5px'}, 
  targetUrl: 'https://sentinels.copernicus.eu/web/sentinel/home'
});
var intro6 = ui.Label({
  value: 'Procesado con Google Earth Enggine -GEE-',
  style: {fontSize: '11px', color: '#505050', margin: '10px 5px'}, 
  targetUrl: 'https://code.earthengine.google.com/'
});
var logo = ee.Image('users/nestorcaalsuc/logos/Logo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '300x320',
       format: 'png'},
    style: {height: '200px', width: '210px',padding :'0'}
    });
///Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro4 = ui.Panel([
  ui.Label({
    value: '________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Con el apoyo de: ',
    style: {fontWeight: 'normal', fontSize: '12px', margin: '10px 5px'}
  })]);
panel.add(chart)
.add(chart1)
.add(intro2)
.add(intro3)
.add(intro5)
.add(intro6)
.add(intro4)
.add(thumb)