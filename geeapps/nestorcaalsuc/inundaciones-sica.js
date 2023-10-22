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
    Acumulado = ui.import && ui.import("Acumulado", "table", {
      "id": "users/nestorcaalsuc/Shapes/PP_ACUMULADO"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/PP_ACUMULADO"),
    Diaria = ui.import && ui.import("Diaria", "table", {
      "id": "users/nestorcaalsuc/Shapes/PP_DIARIA"
    }) || ee.FeatureCollection("users/nestorcaalsuc/Shapes/PP_DIARIA"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/nestorcaalsuc/SICA"
    }) || ee.FeatureCollection("users/nestorcaalsuc/SICA");
Map.setOptions('satellite')
var before_start= '2020-10-01';
var before_end='2020-10-30';
var after_start='2020-11-01';
var after_end='2020-11-30';
var polarization = "VH"; 
var pass_direction = "DESCENDING";
var difference_threshold = 1.25; 
var aoi = ee.FeatureCollection(geometry);
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  .filterBounds(aoi)
  .select(polarization);
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
var difference = after_filtered.divide(before_filtered);
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      var flooded_mask = difference_binary.where(swater_mask,0);
      var flooded = flooded_mask.updateMask(flooded_mask);
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(10));
      var DEM = ee.Image("NASA/NASADEM_HGT/001");
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
Map.centerObject(aoi,5);
//Map.addLayer(before_filtered, {min:-25,max:0}, 'Antes de la inundación',0);
//Map.addLayer(after_filtered, {min:-25,max:0}, 'Después de la inundación',0);
//Map.addLayer(flooded,{palette:"0000FF"},'Áreas inundadas SAR',0);
var S2 = ee.ImageCollection('COPERNICUS/S2')
Map.addLayer(swater.clip(geometry),{min: 1, max: 1, palette:"28A1FB"},"Cuerpos de agua permanentes",0)
function maskClouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
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
var endDate = '2020-12-01';
var s2 = S2.filterDate(startDate,endDate)
    .map(maskClouds)
    .map(addIndicesS2)
    .filterBounds(geometry)
var composite = s2
              .max() 
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
    collection: classes,
    properties: ['Cobertura'],
    scale: 20 
    }).randomColumn('random');
var split = 0.8; 
var training = samples.filter(ee.Filter.lt('random', split));
var testing = samples.filter(ee.Filter.gte('random', split)); 
   var classifier = ee.Classifier.smileRandomForest(100,5).train({ 
    features: training.select(['B8','B11','B4','NDVI','MNDWI','SR','GCVI', 'Cobertura']), 
    classProperty: 'Cobertura', 
    inputProperties: bands
    });    
    var validation = testing.classify(classifier);
    var testAccuracy = validation.errorMatrix('Cobertura', 'classification');
    var classifiedrf = image.select(bands) 
                      .classify(classifier); 
    var pixelcount = classifiedrf.connectedPixelCount(100, false); 
    var countmask = pixelcount.select(0).gt(25); 
    var classMask = classifiedrf.select('classification').gt(0)
    var classed= classifiedrf.updateMask(countmask).updateMask(classMask)
      var flooded_mask2 = classed.where(swater_mask,0);
      var flooded2 = flooded_mask2.updateMask(flooded_mask2);
      var connections2 = flooded2.connectedPixelCount();    
      var flooded2 = flooded2.updateMask(connections2.gte(10));
      var flooded2 = flooded2.updateMask(slope.lt(4));
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-01-01', '2020-10-15')
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
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                 .map(function (image){return image.clip(geometry);});
var rgbVis2 = {
  min: 0.0,
  max: 0.3,
  bands: ['B12', 'B8A', 'B3'],
};
var DelimitacionAOI = ee.Image().byte();
var Delimitacion = DelimitacionAOI.paint({featureCollection: geometry, width: 1,});
var A = ui.Map.Layer(flooded, {min: 1, max: 1, palette:'0000FF'}, 'Área Inundada SAR ',false);
var B = ui.Map.Layer(before_filtered, {min:-25,max:0}, 'Sentinel-1 SAR Antes', false);
var C = ui.Map.Layer(after_filtered, {min:-25,max:0}, 'Sentinel-1 SAR Despues', false)
var D = ui.Map.Layer(dataset.median(), rgbVis, 'Sentinel 2A antes',false);
var E = ui.Map.Layer(dataset2.median(), rgbVis2, 'Sentinel 2A después',false);
var F = ui.Map.Layer(Delimitacion, {palette: 'red', opacity: 0.8}, 'Límites de Paises');
var G = ui.Map.Layer(flooded2, {min: 1, max: 1, palette:'cyan'}, 'Área Inundada Sentinel ',false);
Map.add(B)
Map.add(C)
Map.add(D)
Map.add(E)
Map.add(F)
Map.add(G)
Map.add(A)
var header = ui.Label('Hackathon para Copernicus Centroamérica', 
            { fontSize: '20px', fontWeight: 'bold', color: '0000ff'});
// Resumen de la aplicación
var text = ui.Label(
  'Este visor ha sido diseñado para ver las zonas inundadas por los ' + 'huracanes  ETA e IOTA. ',
    {fontSize: '12px'});
 var text2 = ui.Label(
  'La información que se encuentra dispuesta inicia desde el 01 al 30 de noviembre del 2020.'+ 
  'Debe tenerse en cuenta que las imágenes ópticas para el cálculo de las zonas inundadas post huracanes, '+ 
  'son obtenidas de la aplicación de Random Forest a partir de pixeles de 10 metros; con lo que, '+
  'el modelamiento en zonas urbanas, genera estimaciones con ruido proveniente de la reflectancia variada del lugar'+
  ' para el caso de Sentinel 2A y por efecto de la retrodispersión de radar para Sentinel 1C',
    {fontSize: '12px'});   
// Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text, text2],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro = ui.Panel([
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '14px', fontWeight: 'bold'}
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(1,panel)
var extLabel = ui.Label({value:'Fechas de Monitoreo',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
});
var extCheckA = ui.Checkbox('Áreas Inundadas Sentinel-1C SAR').setValue(false);
var extCheckB = ui.Checkbox('Sentinel-1C SAR Antes').setValue(false); 
var extCheckC = ui.Checkbox('Sentinel-1C SAR Después').setValue(false); 
var extCheckG = ui.Checkbox('Áreas Inundadas Sentinel-2A').setValue(false); 
var extCheckD = ui.Checkbox('Sentinel-2A Antes').setValue(false); 
var extCheckE = ui.Checkbox('Sentinel-2A Después').setValue(false); 
var extCheckF = ui.Checkbox('Paises del SICA').setValue(true); 
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
     .add(extCheckG)
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
var doCheckboxG = function() {
  extCheckG.onChange(function(checked){
  G.setShown(checked)
  })
}
doCheckboxG();  
var PaisesInund = ui.Label({
  value: 'Principales Zonas afectadas',
  style: {fontSize: '14px', fontWeight: 'bold'}
});
var lugares_gt = {
  Playitas: [-90.49108, 15.99965],
  Campur: [-90.04701, 15.63365],
  El_Faisan: [-90.5891, 15.81584],
  Polochic: [-89.5885, 15.4013],
  Sesajal: [-90.1944, 15.72837]
};
var lugares_hn = {
  Choloma: [-83.4807, 14.0821],
  Cuero: [-87.115, 15.7494]
};
var lugares_nc = {
  Bilwi: [-87.8782, 15.6655],
  Layasiksa: [-83.6873, 13.6552]
};
var ubicar_gt = ui.Select({
  items: Object.keys(lugares_gt),
  onChange: function(key) {
    Map.setCenter(lugares_gt[key][0], lugares_gt[key][1],13);
  }
});
var ubicar_hn = ui.Select({
  items: Object.keys(lugares_hn),
  onChange: function(key) {
    Map.setCenter(lugares_hn[key][0], lugares_hn[key][1],10);
  }
});
var ubicar_nc = ui.Select({
  items: Object.keys(lugares_nc),
  onChange: function(key) {
    Map.setCenter(lugares_nc[key][0], lugares_nc[key][1],10);
  }
});
// Marcador de posición
ubicar_gt.setPlaceholder("Guatemala");
ubicar_hn.setPlaceholder("Honduras");
ubicar_nc.setPlaceholder("Nicaragua");
panel.add(PaisesInund)
     .add(ubicar_gt)
     .add(ubicar_hn)
     .add(ubicar_nc);
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
    value:"Equipo: Maria Gualim , Jorge Yat , Josue Caal",
    style: {fontWeight: 'normal',  color: '#505050', fontSize: '12px', margin: '10px 5px'},
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
    value:'_________________________________________',
    style: {fontWeight: 'normal', fontSize: '12px', margin: '10px 5px'}
  })]);
panel.add(chart)
.add(chart1)
.add(intro2)
.add(intro3)
.add(intro5)
.add(intro6)
.add(intro4)
//.add(thumb)