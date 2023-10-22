var cba = ui.import && ui.import("cba", "table", {
      "id": "users/diegopons06/vectores/deptos_cba_latlong"
    }) || ee.FeatureCollection("users/diegopons06/vectores/deptos_cba_latlong"),
    viz = ui.import && ui.import("viz", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "onlywater"
        ],
        "min": 4.79937053755965,
        "max": 51.33072287644116,
        "palette": [
          "71ff06",
          "0cffdd",
          "1287ff",
          "1017ff"
        ]
      }
    }) || {"opacity":1,"bands":["onlywater"],"min":4.79937053755965,"max":51.33072287644116,"palette":["71ff06","0cffdd","1287ff","1017ff"]},
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -62.85195932993633,
                -32.26615295819178
              ],
              [
                -62.85195932993633,
                -32.91871148148906
              ],
              [
                -62.04171763071758,
                -32.91871148148906
              ],
              [
                -62.04171763071758,
                -32.26615295819178
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
        [[[-62.85195932993633, -32.26615295819178],
          [-62.85195932993633, -32.91871148148906],
          [-62.04171763071758, -32.91871148148906],
          [-62.04171763071758, -32.26615295819178]]], null, false);
//ASSETS EUROCLIMA C2 
//productos para componente 2
//TODOS
/*
// Falta subir Gaby
+ Densidad aparente
//Falta subir Nico
+ Distancia a uso agropecuario ( Falta filtrar areas menores a 600 ha. y subir)
+
+ Completar datos salud (si conseguimos un capa actualizada para Argentina: postas, dispensarios)
 */
//Definicion de region y escala
var assets = 'users/nicolasalejandromari/EUROCLIMA_C2/Gran_Chaco_WWF';
var txt_assets = 'users/nicolasalejandromari/EUROCLIMA_C2/Area_Euroclima';
var complejos = 'users/nicolasalejandromari/EUROCLIMA_C2/comp_070604_2';
var Salta_forestal_1 = 'users/laura22huaranca/Salta_Forestal_limite';
var sitios_cordoba_2 = 'users/nicolasalejandromari/EUROCLIMA_C2/Sitios_Cba';
var sitios_bolivia_3 = 'users/nicolasalejandromari/EUROCLIMA_C2/Sitios_bolivia';
var sitios_salta_4 = 'users/galarzamartininta/Salta_Norte';
var sitios_santiago_5 = 'users/lopezjuana/sitios_pilotosC1_Santiago';
var Salta_forestal = ee.FeatureCollection(Salta_forestal_1);
var sitios_cordoba = ee.FeatureCollection(sitios_cordoba_2);
var sitios_bolivia = ee.FeatureCollection(sitios_bolivia_3);
var sitios_salta =  ee.FeatureCollection(sitios_salta_4);
var sitios_Stgo =  ee.FeatureCollection(sitios_santiago_5);
var region = ee.FeatureCollection(txt_assets);
var L_GChaco = ee.FeatureCollection(assets);
var feat_complejos = ee.FeatureCollection(complejos);
var scale = 1000;
//Acceso a los assets
var distancia_centros_educativos ='users/diegopons06/EUROCLIMA/distancia_centros_educativos_AR_BO_PY';
var distancia_centros_salud='users/diegopons06/EUROCLIMA/distancia_centros_salud_AR_BO_PY';
var distancia_cursos_agua='users/diegopons06/EUROCLIMA/distancia_cursos_agua_gt1000';
var distancia_uso_agropecuario = 'users/nicolasalejandromari/Distancia_a_Uso_Agrop__to_Asset';
var elevacion='users/diegopons06/EUROCLIMA/Elevacion_RAW';
var human_impact='users/diegopons06/EUROCLIMA/human_impact_mode_RAW';
var riqueza ='users/diegopons06/EUROCLIMA/riqueza_mapbiomas_2017';
var fragmentacion='users/diegopons06/EUROCLIMA/fragmentacion_2017_integer_10000_GEE';
var dominancia='users/diegopons06/EUROCLIMA/dominancia_2017_integer_10000_GEE2';
var diversidad= 'users/diegopons06/EUROCLIMA/diversidad_2017_integer_10000_latlong';
var evapo = 'users/lopezjuana/evapo_anual_mean';
var ppa = 'users/lopezjuana/anualPrecip_mean';
var pdsi = 'users/lopezjuana/pdsi_minimo_mean';
var tmin = 'users/lopezjuana/Temp_minima_mean';
var tmax = 'users/lopezjuana/Temp_maxima_mean'
var albedo = 'users/lopezjuana/albedo_diario_promedio_2017';
var accesibilidad= "users/galarzamartininta/Accesibilidad";
var crecimientoPop= "users/galarzamartininta/CrecimientoPOPajustado";
var poblacion= "users/galarzamartininta/PoblacionPOPajustado";
var protegidas = 'users/laura22huaranca/distancia_proteg';
var comunidades = 'users/laura22huaranca/distancia_comunidades';
// Variables de SoilGrids 
var CECSOL_Mean = 'users/gbarraza48/CECSOL_Mean_AE'; // Capacidad de intercambio de cationes
var BDRICM_1km = 'users/gbarraza48/BDRICM_M_1km_ll_AEuroclima'; //Profundidad hasta la roca madre (Horizonte R)hasta 200cm
var BDTICM_1km = 'users/gbarraza48/BDTICM_M_1km_ll_AEuroclima'; // Profundidad absoluta a la roca madre
var CLYPPT_1km = 'users/gbarraza48/CLYPPT_Mean'; // Contenido de Arcilla
var OCDENS_1km = 'users/gbarraza48/OCDENS_Mean'; // Densidad de carbono Organico
var OCSTHA_1km = 'users/gbarraza48/OCSTHA_Suma'; // Stock de carbono organico del suelo - intervalos de profundidad 0.00m-0.05m s1, 0.05m-0.10m s2, 0.10m-0.30m s3
var ORCDRC_1km = 'users/gbarraza48/ORCDRC'; // Contenido de carbono organico del suelo
var PHIHOX_1km = 'users/gbarraza48/PHIHOX'; // Indice pH medido en solucion de agua
var SLGWRB_1km = 'users/gbarraza48/SLGWRB_1km_ll_AEuroclima'; // Grado de Suelo Sodico
// 
//var dist_caminos =  'users/nicolasalejandromari/Distancia_a_Caminos__to_Asset'; // Distancia a todo tipo de caminos
var Diversidad_topo = 'users/nicolasalejandromari/srtmTopographicDiversity_toasset'; // Diversidad Topografica SRTM
var dist_uso_forestal ='users/nicolasalejandromari/Distancia_a_Uso_Foresta__to_Asset'; // Distancia a uso Forestal (Mapbiomas C1)
//
var instituciones = 'users/laura22huaranca/instituciones';
var IPSE = 'users/laura22huaranca/ipse_interanual2';
//Generar las imagenes a partir de los assets
var img_distancia_centros_educativos = ee.Image(distancia_centros_educativos);
var img_distancia_centros_salud = ee.Image(distancia_centros_salud);
var img_distancia_cursos_agua = ee.Image(distancia_cursos_agua);
var img_elevacion = ee.Image(elevacion);
var img_human_impact = ee.Image(human_impact);
var img_evapo = ee.Image(evapo);
var img_ppa = ee.Image(ppa);
var img_pdsi = ee.Image(pdsi);
var img_tmin = ee.Image(tmin);
var img_tmax = ee.Image(tmax);
var img_albedo = ee.Image(albedo);
var img_accesibilidad = ee.Image(accesibilidad);
var img_crecimientoPop = ee.Image(crecimientoPop);
var img_poblacion = ee.Image(poblacion);
var img_protegidas = ee.Image(protegidas);
var img_comunidades = ee.Image(comunidades);
var img_riqueza= ee.Image(riqueza);
var img_fragmentacion= ee.Image(fragmentacion);
var img_dominancia= ee.Image(dominancia);
var img_diversidad= ee.Image(diversidad);
//  
var img_CECSOL_1km = ee.Image(CECSOL_Mean);
var img_BDRICM_1km = ee.Image(BDRICM_1km);
var img_BDTICM_1km = ee.Image(BDTICM_1km);
var img_CLYPPT_1km = ee.Image(CLYPPT_1km);
var img_OCDENS_1km = ee.Image(OCDENS_1km);
var img_OCSTHA_1km = ee.Image(OCSTHA_1km);
var img_ORCDRC_1km = ee.Image(ORCDRC_1km);
var img_PHIHOX_1km = ee.Image(PHIHOX_1km);
var img_SLGWRB_1km = ee.Image(SLGWRB_1km);
var img_distusoagrop = ee.Image(distancia_uso_agropecuario);
//var img_dist_caminos = ee.Image(dist_caminos);
var img_Diversidad_topo = ee.Image(Diversidad_topo);
var img_dist_uso_forestal = ee.Image(dist_uso_forestal);
var img_instituciones = ee.Image(instituciones);
var img_IPSE = ee.Image(IPSE);
//Apilar las bandas
 // img_distancia_centros_educativos
 // img_distancia_centros_salud
 // img_poblacion
var stack= img_distancia_cursos_agua
 .addBands(img_elevacion)
 .addBands(img_human_impact)
 .addBands(img_evapo)
 .addBands(img_ppa)
 .addBands(img_pdsi)
 .addBands(img_tmin)
 .addBands(img_tmax)
 .addBands(img_albedo)
 .addBands(img_accesibilidad)
 .addBands(img_crecimientoPop)
 .addBands(img_protegidas)
 .addBands(img_comunidades)
 .addBands(img_riqueza)
 .addBands(img_fragmentacion)
 .addBands(img_dominancia)
 .addBands(img_CECSOL_1km)
 .addBands(img_BDRICM_1km)
 .addBands(img_BDTICM_1km)
 .addBands(img_CLYPPT_1km)
 .addBands(img_OCDENS_1km)
 .addBands(img_OCSTHA_1km)
 .addBands(img_ORCDRC_1km)
 .addBands(img_PHIHOX_1km)
 .addBands(img_SLGWRB_1km)
 .addBands(img_diversidad)
 .addBands(img_distusoagrop)
 //.addBands(img_dist_caminos)
 .addBands (img_Diversidad_topo)
 .addBands (img_dist_uso_forestal)
 .addBands (img_instituciones)
 .addBands (img_IPSE)
 print (stack,'stack');
// Renombrado de bandas por B1, B2, ...
var bandNames = stack.bandNames();
var getNewBandNames = function(prefix) {
  var seq = ee.List.sequence(1, bandNames.length());
  print(seq, 'seq');
  return seq.map(function(b) {
    return ee.String(prefix).cat(ee.Number(b).int());
  });
};
var newbandNames = getNewBandNames('B');
var stack = stack.select(bandNames,newbandNames);
// Reescalado de datos (con valores minimos y maximos)
var minDict = stack.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: region,
    scale: scale,
    maxPixels: 5e8
});
var maxDict = stack.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: region,
    scale: scale,
    maxPixels: 5e8
});
var n = ee.Number.parse(newbandNames.length().int());
print(n);
var stand = ee.Image(stack.select([]));
for (var i=0;i<31;i++){
  var min = minDict.values(newbandNames).get(i);
  var max = maxDict.values(newbandNames).get(i);
  var banda = stack.select([newbandNames.get(i)]).unitScale(min,max);
  var stand = stand.addBands([banda]);
}
//print(stand, 'set_datos');
var vissetdatos = {bands: ["B4","B6","B11"], gamma: 1, max: 0.9937959226222655, min: 0.0007967363077676741, opacity: 1};
//Map.addLayer(stand, vissetdatos, 'set_datos', false);
// Visualizacion de capas individuales con sus respectivas paletas
//Cargar paletas de cada capa
//Visualización de resultados finales
Map.centerObject(region,8);
var blank = ee.Image(0).mask(0);
//------------------------------------------------------------------------------------------------------------------------
//Step 1: import the JRC Monthly Water History v1.0 (1984-2015)
var jrc = ee.ImageCollection("JRC/GSW1_1/MonthlyHistory");
//Step 2: Set the geometry of the country
 // Define country name
var country_names = ['Argentina'];
// import the country feasture collection
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
// find the countries in the country list
var Country =cba;// countries.filter(ee.Filter.inList('Country', country_names)).geometry();
//Step 3: Define the study period
// Define study period
var startDate = ee.Date.fromYMD(1985, 1, 1);
var endDate = ee.Date.fromYMD(2019, 12, 31);
//Step 4: filter the data for the study period
// filter jrc data for country and period
var myjrc = jrc.filterDate(startDate, endDate).filterBounds(Country);
//Step 5: Set all observations to 1 and add the layer as a new bands
// Detect observations
var myjrc = myjrc.map(function(img){
  // observation is img > 0
  var obs = img.gt(0);
  return img.addBands(obs.rename('obs').set('system:time_start', img.get('system:time_start')));
});
//Step 6: Set all observations with water to 1 and add the layer as a new bands
// Detect all observations with water
var myjrc = myjrc.map(function(img){
  // if water
  var water = img.select('water').eq(2);
  return img.addBands(water.rename('onlywater').set('system:time_start', img.get('system:time_start')));
});
//Step 7: calculate total number of observations and number of observations with water
// calculate the total amount of observations
var totalObs = ee.Image(ee.ImageCollection(myjrc.select("obs")).sum().toFloat());
// calculate all observations with water
var totalWater = ee.Image(ee.ImageCollection(myjrc.select("onlywater")).sum().toFloat());
//Step 8: Calculate the percentage of observations with water.
// calculate the percentage of observations with water
var floodfreq = totalWater.divide(totalObs).multiply(100);
//Step 9: Mask areas without water
// maks areas that are not water
var myMask = floodfreq.eq(0).not();
floodfreq = floodfreq.updateMask(myMask);
var stack=stack.addBands(floodfreq);
print (stack, 'bandas');
//Step 10: visualize the result.
//var viz = {min:0, max:50, palette:['c10000,d742f4,001556,b7d2f7']};
var viz = {min:0, max:100, palette:["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","08519c","08306b"]};
Map.addLayer(floodfreq.clip(Country),viz,"Frec.Agua en superficie");
print (floodfreq,'floodfreq');
Map.setOptions("HYBRID")
Map.centerObject(cba,7);
//-----------------------------------------------------------------panel
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Agua en Superficie(%)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 2px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: cba,
  color: 1,
  width: 0.5
});
Map.addLayer(outline, {palette: 'ffffff'}, 'Departamentos');
//------------panel inspector
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Consulte la frecuencia'));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cargando...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var temporalMean = ndvi.reduce(ee.Reducer.mean());
  var sampledPoint = floodfreq.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('onlywater');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'frecuencia agua en superficie: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
/*
//puntos al azar************************************************
// User specified parameters
// Define the region in which to compute random points.
var region = cba
// Data
// Create 1000 random points in the region.
var randomPoints = ee.FeatureCollection.randomPoints(region,1000);
// Add to map
Map.centerObject(randomPoints);
Map.addLayer(randomPoints, {}, 'random points');
// sample the features
var trainingSample = stack.reduceRegions(randomPoints,ee.Reducer.mean());// tchImg reemplazar por apilado a muestrear
// print the output
//print(trainingSample,'puntos de entrenamiento');
//------------entrenamiento de muestras
var training_tree = stack.sample({
  numPixels: 5000,
  seed: 0
  })
var trainingSample = stack.sampleRegions(referenceData,["land_class"],30);
 var image= stack
var bandNames = stack.bandNames();
var classifier = ee.Classifier.randomForest(100,0).setOutputMode('PROBABILITY').train(trainingSample,"land_class",bandNames);
var classification = stack.classify(classifier).multiply(100)
 var classifierR_tree = ee.Classifier.randomForest(100).setOutputMode('REGRESSION')
    .train(training_tree,"treecover2000");
Map.addLayer(classification.clip(myProvince),{min:20,max:80,palette:"white,gray,black"},"primitive")
/* Clasificacion por probabilidades******************************************************
var bandNames = image.bandNames();
var classifier = ee.Classifier.smileRandomForest(5).setOutputMode('PROBABILITY').train(trainingSample,"land_class",bandNames);
var dict = classifier.explain();
print('Explain:',dict);
var variable_importance = ee.Feature(null, ee.Dictionary(dict).get('importance'));
var chart =
  ui.Chart.feature.byProperty(variable_importance)
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Random Forest Variable Importance',
      legend: {position: 'none'},
      hAxis: {title: 'Bands'},
      vAxis: {title: 'Importance'}
    });
print(chart); 
var classification = image.classify(classifier).multiply(100)
Map.addLayer(classification.clip(cambodia),{min:20,max:90,palette:"white,gray,black"},"Rubber primitive")*/
/*
//matriz de confusion*************************************************************************************
var image = ee.Image("users/servirmekong/Vietnam/landCoverMap");
var referenceData = ee.FeatureCollection("users/servirmekong/Vietnam/ReferenceDataForestTraining");
var referenceData = referenceData.randomColumn("random");
var sample = referenceData.filter(ee.Filter.gt("random",0.8));
Map.addLayer(sample)
var validation = image.sampleRegions(sample,["land_class"],10);
var confMatrix = validation.errorMatrix("land_class","Mode");
Map.addLayer(image,{min:0,max:4,palette:"blue,purple,darkred,yellow,darkgreen"},"land cover map");
var OA = confMatrix.accuracy();
var CA = confMatrix.consumersAccuracy();
var Kappa = confMatrix.kappa();
var Order = confMatrix.order();
var PA = confMatrix.producersAccuracy();
print(confMatrix,'Confusion Matrix');
print(OA,'Overall Accuracy');
print(CA,'Consumers Accuracy');
print(Kappa,'Kappa');
print(Order,'Order');
print(PA,'Producers Accuracy');
*/