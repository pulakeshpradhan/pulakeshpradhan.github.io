/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var deptos = ee.FeatureCollection("users/benitezrcamilo/DEPARTAMENTOS_PARAGUAY_2012_PC"),
    Bosque = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-57.56847985108823, -25.2458225432429]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.57414467652768, -25.242329022555925]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.54047686000138, -25.252562140011197]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.57980078612377, -25.27576059682183]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.639943710947364, -25.341872609720777],
                  [-57.63936435380015, -25.341116288153202],
                  [-57.64035140671763, -25.341950180896262]]]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.60271970885327, -25.300844305753255]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.629522483580956, -25.28463489172071]),
            {
              "system:index": "6"
            })]),
    No_bosque = /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.542837202156875, -25.26811776258071],
                  [-57.54244023522267, -25.268146869487154],
                  [-57.54217201432118, -25.26714752837219],
                  [-57.542558252419326, -25.267642348787508]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.544002251915, -25.260683203296523]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.62158261306746, -25.26960773689529]),
            {
              "system:index": "2"
            })]),
    urban = /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-57.544786541942244, -25.275226403183545]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.58196665348879, -25.262276270739346]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.56336324195428, -25.233184893607373]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.6404518143342, -25.35390683652766]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.587064241204644, -25.311849286468473]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.56751986055758, -25.282532161925197]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.57164775354562, -25.286260638848148]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.55339368456367, -25.25608452497909]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-57.56253465288643, -25.25552173431016]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.56246793832105, -25.263004179432098],
                  [-57.561738377469, -25.263547530088317],
                  [-57.56227481927198, -25.262829530490475],
                  [-57.562832718747075, -25.262751908658007]]]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.62267395028812, -25.29899161473108],
                  [-57.62260957727176, -25.29899161473108],
                  [-57.62168689737064, -25.29941840668248],
                  [-57.62237354287845, -25.29866181992122],
                  [-57.62378974923831, -25.298700619357202]]]),
            {
              "system:index": "10"
            })]),
    Agua = /* color: #ff0000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.6681308138015, -25.325986224095683],
                  [-57.66581338521263, -25.33017554631596],
                  [-57.666929184162825, -25.326955987505038]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.6327851901583, -25.25954546797553],
                  [-57.63102566104453, -25.25799297990996],
                  [-57.63407265048545, -25.25981715134641]]]),
            {
              "system:index": "1"
            })]),
    gridFeatureCollection = ee.FeatureCollection("ft:1kuaEY8hdCAHfPnhUueIR4swKgf0K4l2QTATsboUS");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Area de estudio
var asu = deptos.filterMetadata('DPTO_DESC', 'equals', 'ASUNCION')
var roi = asu.geometry().bounds()
//var sr = ee.FeatureCollection("users/fabibenitez0927/San-Rafael/Area-de-estudio")
var carta = 'SG-21-V-D' //carta 1:250.000
//Numero de arboles para clasificación
var num_arboles = 100 //Numero de árboles de Random Forest (mantener 20 para visualización rápida y 50 para clasificación final)
////////////////////////////////////////////////////////////////////////////////////////////////////////
//**********************************************************************************************///////
////////////////////////////NO MODIFICAR ESTA LINEA DEL CODIGO/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
////
var limite = gridFeatureCollection.filterMetadata('name', "equals", carta);/////////////////////////
var dirasset = "users/benitezrcamilo/Monitoreo/assets_col1b/asuncion/"///////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//**********************************************************************************************//
/////////////////////////////////////////////////////////////////////////////////////////////////
//Colocar por cada año el sensor correspondiente
var anos     = ['2000','2005','2010','2015', "2018"];
var sensores = ['L5','L5','L5','L8', 'L8', 'L8'];
// Las 86 bandas usadas para la prediccion
var bands = [
      'median_blue', 'median_green', 'median_red', 'median_nir', 'median_swir1', 'median_swir2', 'median_temp',
      'median_ndvi', 'amp_ndvi', 'stdDev_ndvi', 'median_gv_dry', 'median_npv_dry', 'median_soil_dry', 
      'median_shade_dry', 'median_cloud_dry', 'median_ndvi_dry',
      'median_evi2_dry', 'median_gcvi_dry','median_ndwi_dry', 'median_hallcover_dry', 
      'median_ndfi_dry', 'median_sefi_dry', 'median_wefi_dry','median_fns_dry',
      'median_gv_wet','median_npv_wet','median_soil_wet','median_shade_wet','median_cloud_wet','median_ndvi_wet',
      'median_evi2_wet','median_gcvi_med_wet',
      'median_ndwi_wet','median_hallcover_wet','median_ndfi_wet','median_sefi_wet','median_wefi_wet','median_fns_wet',
      'median_pri','amp_pri','stdDev_pri','median_hallcover','amp_hallcover_','stdDev_hallcover','median_gv','amp_gv','stdDev_gv',
      'median_npv','amp_npv','stdDev_npv','median_soil','amp_soil','stdDev_soil','median_shader','amp_shade','stdDev_shade',
      'median_cloud','amp_cloud','stdDev_cloud',
      'median_ndfi','amp_ndfi','stdDev_ndfi','median_sefi','amp_sefi','stdDev_sefi','median_wefi','amp_wefi','stdDev_wefi',
      'median_fns','amp_fns','stdDev_fns','median_evi2','amp_evi2','stdDev_evi2','median_savi','amp_savi','stdDev_savi',
      'median_cai','amp_cai','stdDev_cair','median_ndwi','amp_ndwi','stdDev_ndwi','median_gcvi','amp_gcvi','stdDev_gcvi'
                 ];
// Codificación e Integración de las muestas
Bosque = Bosque.set({'class': 1});
Bosque = Bosque.map(function(feat) {return feat.set({'class': 1})});
No_bosque = No_bosque.set({'class': 2});
No_bosque = No_bosque.map(function(feat) {return feat.set({'class': 2})});
urban = urban.set({'class': 3});
urban = urban.map(function(feat) {return feat.set({'class': 3})});
Agua = Agua.set({'class': 4});
Agua = Agua.map(function(feat) {return feat.set({'class': 4})});
//Listado de las categorias utilizados para la toma de muestras
var lista_amostra = [Bosque, No_bosque, urban, Agua]; //must be a featurecollection with an attributte ‘class’
var amostraTotal = lista_amostra[0]
for (var i_amostra=1;i_amostra<lista_amostra.length; i_amostra++){
  amostraTotal = amostraTotal.merge(lista_amostra[i_amostra]);
}
//Para cada año
for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  var sensor = sensores[i_ano];
  var img_asset = ee.Image(dirasset+carta+"_"+ano)
  var visParMedian = {'bands':['median_nir','median_swir1','median_red'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
  var visParUmido = {'bands':['median_swir1_wet','median_nir_wet','median_red_wet'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
  var visParSeco = {'bands':['median_swir1_dry','median_nir_dry','median_red_dry'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
  Map.addLayer(img_asset, visParMedian, 'Year_'+ano, false);
  Map.addLayer(img_asset, visParUmido, 'wet_'+ano, false);
  Map.addLayer(img_asset, visParSeco, 'dry_'+ano, false);
  //var img_asset = ee.Image(dirasset + carta + "_" + ano)
  // Overlay the points on the imagery to get training.
  var training = img_asset.select(bands).sampleRegions(amostraTotal, ['class'], 30);
  if (i_ano == 1) {
    print('Quantidade de Amostras:')
    print('TOTAL:')
    print(training.size())
    print('Cobertura forestal natural:')
    print(training.filterMetadata('class', "equals", 1).size())  
    print('Otras coberturas naturales (No bosque):')
    print(training.filterMetadata('class', "equals", 2).size())
    print('Urbano:')
    print(training.filterMetadata('class', "equals", 3).size())  
    print('Agua')
    print(training.filterMetadata('class', "equals", 4).size())
  }
var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Clases',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
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
legend.add(makeRow('1b6c14', 'Cobertura forestal natural'));
legend.add(makeRow('d0d80e', 'Otras coberturas naturales'));
legend.add(makeRow('ed4a4a', 'Urbano'));
legend.add(makeRow('153482', 'Água'));
//var mapClasses = ui.Map();
Map.add(legend);  var classifier_RF = ee.Classifier.randomForest(num_arboles).train(training, 'class', bands);
  var trainAccuracy = classifier_RF.confusionMatrix();
  print('RandomForest '+ ano + ' Training overall accuracy: ', trainAccuracy.accuracy());
  var classified_RF = img_asset.classify(classifier_RF).mask(img_asset.select('median_blue'));;
  classified_RF = classified_RF.select(['classification'],['class_'+ano])
var asuncion = deptos.filterMetadata ("DPTO_DESC", "equals", "ASUNCION");
var RF = classified_RF
Map.addLayer(RF.select('class_'+ano), {
       "min": 1,
        "max": 4,
        "palette": "1b6c14,d0d80e,ed4a4a,153482,",
      "format": "png"
  },  'Asunción '+ano,true);
  Export.image.toDrive({
  image:RF,
  description: ano +'_RF',
  scale: 30,
  region: roi,
  maxPixels: 1e13
});
}
//Limite del area de estudio sin fondo
Map.addLayer(outline, visPar, 'Limite de Asunción', false);
var empty = ee.Image().byte();
var outline1 = empty.paint({featureCollection: asu, color: 1, width: 3})
Map.setCenter(-57.60083, -25.28436, 13)