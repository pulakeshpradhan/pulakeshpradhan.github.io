var training_points = ui.import && ui.import("training_points", "table", {
      "id": "users/grettelvargas/Manglares_data_031221/training_points"
    }) || ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/training_points"),
    allArea = ui.import && ui.import("allArea", "table", {
      "id": "users/grettelvargas/Manglares_data_031221/buffer_2km"
    }) || ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/buffer_2km");
// // -------------------------------------------------------------------------
// // MSc.Grettel Vargas Azofeifa
// // Unidad de Acción Climática
// // Centro Agronómico Tropical de Investigación y Enseñanza.
// // Créditos: Susan Kotikot, Jordan Cissel, Steven Canty, Universidad de Sanford
// // 
// // Año 2021-2022
//********************************************************************************************************************************************
//  Configuración del  mapa                   
//********************************************************************************************************************************************
// Centrar el mapa y el área de estudio
Map.centerObject(allArea, 9);
Map.addLayer(allArea, {}, 'Contorno manglares', false)
Map.setOptions('HYBRID');
// Especificar la extensión del área a ser clasificada
     var classificationExtent = allArea; // Buffer de 2km
     var simard = ee.ImageCollection('projects/mangrovescience/DAAC_Hba_Simard') // Mangrove Height (Simard et al. 2019)
     var training_points = ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/training_points")
//Map.addLayer(training_points, {color: 'yellow'}, 'All Training_ptos')    
//-----------------------------------------------------------------------------------------------
// Establecer variable para visualización de datos
     var median_vis = {
       min: 0.0,
       max: 0.3,
       bands: ['B8_median', 'B11_median', 'B4_median'],
};
// Configuración del mosaico de Sentinel-2         
//********************************************************************************************************************************************
// 
function maskS2clouds(image) {
      var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.//
     var cloudBitMask = 1 << 10; 
     var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
     var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
         .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
     return image.updateMask(mask).divide(10000);
}     
// Filtrar la colección de imágenes por fecha y región
//********************************************************************************************************************************************
     var getImage = function(geometry) {
      var start = ee.Date('2021-01-01');
      var end = ee.Date('2021-05-31');
      var date_range = ee.DateRange(start,end);
     var sentinel_collection = ee.ImageCollection('COPERNICUS/S2_SR')
       .filterDate(date_range)
       .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))//Pre-filter to get less cloudy granules.
       .filterBounds(allArea)
       .map(maskS2clouds)
       .select('B.*')
       .map(function(image) { return image.clip(allArea); });
//  Reducir la colección de imágenes en un sola imagen -> Mosaico
//********************************************************************************************************************************************
     var sentinel_image = sentinel_collection.reduce(ee.Reducer.median());
//  Calcular y agregar indices de vegetacion espectrales
//********************************************************************************************************************************************
// Agregar NDVI (Normalized Difference Vegetation Index (NDVI))
     var ndvi = sentinel_image.normalizedDifference(['B8_median', 'B4_median']);
     var image = sentinel_image.addBands(ndvi.rename('NDVI'));
// Agregar MVI  Baloloy, et al. 2020, DOI:10.1016/j.isprsjprs.2020.06.001
     var mvi =  sentinel_image.expression('float (NIR-GREEN)/ float (SWIR-GREEN)',
     {'NIR': sentinel_image.select('B8_median'),'GREEN': sentinel_image.select('B3_median'), 'SWIR': sentinel_image.select('B11_median') });
     image = image.addBands(mvi.rename('MVI'));
// Agregar NDBI (Normalized Difference Built-up Index (NDBI)), //SWIR(Band11)-NIR(Band8)/ SWIR(Band11)+NIR(Band8)
     var ndbi = sentinel_image.normalizedDifference(['B11_median','B8_median']);
     image = image.addBands(ndbi.rename('NDBI'));
// Agregar NDBaI (Normalized Difference Bareness Index (NDBaI)), https://eo4sd-lab.net/sites/default/files/eo4sd_lab_s2_ndbal_guide_v1.1.pdf
// (SWIR [B11] – Vegetation Red Edge [B8A] / (SWIR [B11] + Vegetation Red Edge [B8A])
     var ndbai = sentinel_image.normalizedDifference(['B11_median','B8A_median']);
     image = image.addBands(ndbai.rename('NDBaI'));
// Agregar NDMI (Normalized Difference Moisture Index  (NDMI)),  NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11)
     var ndmi = sentinel_image.normalizedDifference(['B8_median', 'B11_median']);
     image = image.addBands(ndmi.rename('NDMI'));
     return(image);
};
//  Imagen a utilizar con la inclusión de los indices y demás parametros
//********************************************************************************************************************************************
     var trainingImage = getImage(allArea);
//  Normalización de la imágen anterior, este método asegura que todos los valores de entrada estén entre 0 y 1.  
//  Formula is (x - xmin) / (xmax - xmin)
//********************************************************************************************************************************************
function normalize(image){
     var bandNames = image.bandNames();
// Compute min and max of the image
     var minDict = image.reduceRegion({
       reducer: ee.Reducer.min(),
       geometry: allArea,
       scale: 20,
       maxPixels: 1e9,
       bestEffort: true,
       tileScale: 16
});
     var maxDict = image.reduceRegion({
       reducer: ee.Reducer.max(),
       geometry: allArea,
       scale: 20,
       maxPixels: 1e9,
       bestEffort: true,
       tileScale: 16
});
     var mins = ee.Image.constant(minDict.values(bandNames));
     var maxs = ee.Image.constant(maxDict.values(bandNames));
     var normalized = image.subtract(mins).divide(maxs.subtract(mins))
     return normalized
}
     var composite = normalize(trainingImage);
//  Mosaico normalizado y se agrega al visor
//********************************************************************************************************************************************
    var classificationImage = getImage(composite);
    Map.addLayer(classificationImage, median_vis, "Mosaico Sentinel-2");
//  3- Construcción del Modelo para el clasificador de Random Forest                  
//********************************************************************************************************************************************
//   Bandas espectrales a incluir en la clasificación y el mosaico Sentinel-2
//********************************************************************************************************************************************
    var bands = ['B8_median', 'B4_median', 'B3_median', 'B2_median', 'NDVI', 'NDMI', 'NDBaI', 'NDBI','MVI' ];
    var input= classificationImage.select(bands).clip(allArea);
//  Función para realizar la clasificación supervisada RF.
//********************************************************************************************************************************************
// Entrenamos el clasificador con los puntos de entrenamiento.
    var trainImage = input.sampleRegions({
       collection: training_points,
       properties: ['class'],
       scale: 10,
       tileScale: 16,
});
    var trainingData = trainImage.randomColumn()
    var trainSet = trainingData.filter(ee.Filter.lt('random', 0.7));
    var testSet  = trainingData.filter(ee.Filter.gte('random', 0.7));
// Tamaño del set de datos para el entrenamiento
    var trainingSize= trainSet.size();
print('Numero de puntos de entrenamiento:', trainingSize);
// Tamaño del set de datos para el test
    var validationSize= testSet.size();
print('Numero de puntos de validacion:', validationSize);
//  Inicio del Random Forest
//********************************************************************************************************************************************
    var classifier = ee.Classifier.smileRandomForest(75)
       .train({
       features: trainSet,
       classProperty: 'class',
       inputProperties: bands
});
    var classified = input.classify(classifier);
//  Clasificacion de la imagen
//********************************************************************************************************************************************
//Map.addLayer(classified.randomVisualizer(), {}, 'Clasificación RF');
  // Probar la precisión del modelo
//********************************************************************************************************************************************
// Evaluar la precisión usando la fracción del testSet 
var test = classified.sampleRegions({
  collection: testSet,
  properties: ['class'],
  scale: 10,
  tileScale: 16
});
//Los resultados de la clasificación se evalúan en función de las siguientes métricas
var confusionMatrix = ee.ConfusionMatrix(testSet.classify(classifier)
.errorMatrix({
  actual: 'class',
  predicted: 'classification'
}));
 print ('ConfusionMatrix:', confusionMatrix); // Matrix de Confusión-
 print ('Overall Accuraccy:', confusionMatrix.accuracy()); // - Precisión general: cuántas muestras se clasificaron correctamente.
 print('Validation Kappa: ', confusionMatrix.kappa());  // Coeficiente Kappa: qué tan bien se desempeñó la clasificación en comparación con la asignación aleatoria.
 print('Producers Accuracy:', confusionMatrix.producersAccuracy()); // - Precisión del productor: qué tan bien predijo la clasificación cada clase.
 print('Consumers Accuracy:', confusionMatrix.consumersAccuracy()); // - Precisión del consumidor (confiabilidad): qué tan confiable es la predicción en cada clase.
// 5) Exportar las capas de interés (SHP, CSV, ASSET, IMAGE)           
//********************************************************************************************************************************************
//  Exportar las métricas en un solo archivo CSV
//********************************************************************************************************************************************
     var fc = ee.FeatureCollection([
        ee.Feature(null, {
        'accuracy': confusionMatrix.accuracy(),
        'matrix': confusionMatrix.array(),
        'kapa': confusionMatrix.kappa(),
        'Producers Accuracy:': confusionMatrix.producersAccuracy(),
        'Consumers Accuracy:': confusionMatrix.consumersAccuracy(),
  })
  ])
//print(fc)  
Export.table.toDrive({
    collection: fc,
    description: 'Accuracy29',
    folder: 'Taller',
    fileNamePrefix: 'acc_class',
    fileFormat: 'CSV'
})
// 5) Exportar las capas de interés (SHP, CSV, ASSET, IMAGE)           
//**********************************************************************
// Export the mangrove polygon to Google Drive 
//**********************************************************************
// Export.table.toDrive({
//   collection: mangroves_polygon,
//   description:'Poligonos_Manglares',
//   fileFormat: 'SHP'
// });
Export.image.toAsset({
    image : classified,
    description: 'S2_class',
    scale: 10, 
    region: allArea,
    maxPixels: 1e13 
});
// Export.image.toAsset({
//  image : classified.toFloat().select(['B2_median', 'B3_median', 'B4_median', 'B8_median', 'NDVI', 'NDMI', 'NDBaI', 'NDBI', 'MVI']),
//  description: 'S2_imagen',
//  scale: 10, 
//  region: allArea,
// maxPixels: 1e13 
//});
// Convertir el raster de manglar a polígono.
//********************************************************************************************************************************************
//  Extraer la categoria de manglar de la clasificación.  
//********************************************************************************************************************************************
    var Mangroves_filtered = classified.updateMask(classified.eq(2)); 
     var mangroves_polygon = Mangroves_filtered.toInt().reduceToVectors({
        geometry: allArea,
        crs: Mangroves_filtered.projection(),
        scale: 10,
        geometryType: 'polygon',
        eightConnected: false,
        maxPixels: 1e13
});
// Map.addLayer(mangroves_polygon, {color: 'white'}, 'Poligonos para manglares');
 Export.table.toDrive({
   collection: mangroves_polygon,
   description:'Poligonos_Manglares',
   fileFormat: 'SHP'
 });
// Configuración del mapa
//********************************************************************************************************************************************
// Paleta viridis para los datos de Simard
//**********************************************************************
     var hba = simard.mosaic()
     var viridis = {min: 0 , max : 25,palette : ['#481567FF','#482677FF','#453781FF','#404788FF','#39568CFF',
                                                 '#33638DFF','#2D708EFF','#287D8EFF','#238A8DFF','#1F968BFF',
                                                 '#20A387FF','#29AF7FFF','#3CBB75FF','#55C667FF',
                                                 '#73D055FF','#95D840FF','#B8DE29FF','#DCE319FF','#FDE725FF' 
]};
     var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false) //https://daac.ornl.gov/CMS/guides/CMS_Global_Map_Mangrove_Canopy.html
// Create variables for GUI layers for each layer
//********************************************************************************************************************************************
     var simHBA = ui.Map.Layer(hba,viridis,'Alturas Simart Hba',false)
     var exten2021 = ui.Map.Layer(mangroves_polygon, {color: '71F4B7'}, 'Extension Manglar 2021',false)
//Add these layers to our map. They will be added but not displayed
Map.add(simHBA)
Map.add(exten2021)
// Configuración de los paneles y widgets              
//*********************************************************************************************************************************************
// Configuración del título y la descripción
//*********************************************************************************************************************************************
//App título
    var header = ui.Label('Monitoreo de Manglares en Costa Rica 2021', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App para la descripción
    var text = ui.Label(
      'Esta herramienta muestra la extensión de los manglares en Costa Rica año 2021 derivada de imágenes Sentinel-2. ' +
      'Utilice la herramienta a continuación para explorar los cambios en la extensión de los manglares y la altura del dosel de los manglares en 2000 según Simart et al. 2019..',
      {fontSize: '15px'});
// Crear un panel para el texto
//*********************************************************************************************************************************************
    var panel = ui.Panel({
       widgets:[header, text],//Adds header and text
       style:{width: '300px',position:'middle-left'}});
// Crear variables adicionales para el panel
//*********************************************************************************************************************************************
    var intro = ui.Panel([
      ui.Label({
      value: '____________________________________________',
      style: {fontWeight: 'bold',  color: '4A997E'},
}),
     ui.Label({
     value:'Seleccione las capas',
     style: {fontSize: '15px', fontWeight: 'bold'}
})]);
// Agrega este nuevo panel al panel más grande que creamos 
panel.add(intro)
ui.root.insert(1,panel)
// Agrega widgets de casillas de verificación y leyendas             
//**********************************************************************************************************************************************
// Crea una nueva etiqueta para esta serie de casillas de verificación
//*********************************************************************************************************************************************
     var extLabel = ui.Label({value:'Extensión del manglar',
     style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// Agregar los checks 
//*********************************************************************************************************************************************
     var extCheck1 = ui.Checkbox('2021').setValue(false); //false = unchecked
// Aplica para Simard Height map
     var heightLab = ui.Label({value:'Alturas del manglar (Simard et al. 2019)',
     style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
     var heightCheck = ui.Checkbox('2000').setValue(false);
// Crear la Simbologia
//*********************************************************************************************************************************************
// Establecer la posición del panel
     var extentLegend = ui.Panel({
       style: {
       position: 'bottom-left',
       padding: '8px 15px'
  }
});
// Crea y da estilo a una fila de la simbologia
//*********************************************************************************************************************************************
     var makeRowa = function(color, name) {
// Crea y aplica estilo de la leyenda
//*********************************************************************************************************************************************
     var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
// Establecer el mismo tamaño
//*********************************************************************************************************************************************
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
// Crea una etiqueta con el texto de la descripción
//*********************************************************************************************************************************************
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 // Visualizacion del panel
//*********************************************************************************************************************************************
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Crea una paleta usando los mismos colores que usamos para cada capa de extensión
//*********************************************************************************************************************************************
      var paletteMAPa = [
         'f3f6f4',//2020
];
// Nombre de cada valor en la simbologia
//*********************************************************************************************************************************************
      var namesa = ['Manglares 2021']; 
// Agregar colores y nombres en la leyenda
//*********************************************************************************************************************************************
      for (var i = 0; i < 1; i++) {
      extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
}  
// Simbologia para las alturas
//*********************************************************************************************************************************************
function makeLegend2 (viridis) {
     var lon = ee.Image.pixelLonLat().select('longitude');
     var gradient = lon.multiply((viridis.max-viridis.min)/100.0).add(viridis.min);
     var legendImage = gradient.visualize(viridis);
     var thumb = ui.Thumbnail({
        image: legendImage, 
        params: {bbox:'0,0,100,8', dimensions:'256x20'},  
        style: {position: 'bottom-center'}
  });
     var panel2 = ui.Panel({
        widgets: [
        ui.Label('5 m'), 
        ui.Label({style: {stretch: 'horizontal'}}), 
        ui.Label('45 m')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
     return ui.Panel().add(panel2).add(thumb);
}
// Agregar estos elementos al panel
//*********************************************************************************************************************************************
panel.add(extLabel)
      .add(extCheck1)
      .add(extentLegend)
      .add(heightLab)
      .add(makeLegend2(viridis))
      .add(heightCheck) 
// Agregar funcionalidad a los widgets                  
//*********************************************************************************************************************************************
//Extension de manglares 2021
//*********************************************************************************************************************************************
    var doCheckbox1 = function() {
      extCheck1.onChange(function(checked){
        exten2021.setShown(checked)
  })
}
doCheckbox1();
// Datos de altura de Simart
//*********************************************************************************************************************************************
    var doCheckbox4 = function() {  
      heightCheck.onChange(function(checked){
        simHBA.setShown(checked)
})
}
doCheckbox4();
// Grafico de columnas
//**********************************************************************************************************************************************
    var palette = ee.List(["#fff2cc", "#80cc00", "#c90076", "#f9cb9c", "#006400", "#004eff", "#004eff", "#bcbcbc", "#004eff", "#f1c232", "#bf9000",
                      "#eeeeee", "#f44336", "#d9ead3", "#b45f06", "#004eff", "#004eff", "#004eff", "#004eff", "#783f04", "#004eff", "#e06666",
                      "#6aa84f", "#fce5cd"])
    var values = ee.List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 5, 16, 17, 18, 19, 20, 21, 22, 23])
    var labels = ee.List(["Arroz",
              "Caña de azúcar",
              "Manglar",
              "Melón",
              "Bosque",
              "Bosrdes marinos",
              "Oceanos y mares",
              "Playas y arenales",
              "Esteros",
              "Pastos",
              "Palma africana",
              "Suelo desnudo",
              "Edificacion",
              "Sandia",
              "Pantano palustre",
              "Laguna costera",
              "Ríos",
              "Acuacultura",
              "Canales",
              "Otros usos",
              "Maricultura",
              "Salineras",
              "Plantación forestal",
              "Banano"
]);
// Calculo de areas para cada clase
//*********************************************************************************************************************************************
     var areas = ee.Image.pixelArea().divide(10000).addBands(classified)
        .reduceRegion({
        reducer: ee.Reducer.sum().group(1), 
        geometry: allArea, 
        scale: 100
  }).get('groups')
// Un diccionario de valores predeterminados para completar 0 para las clases que faltan.
//*********************************************************************************************************************************************
     var defaults = ee.Dictionary(labels.map(function(label) {
     var index = labels.indexOf(label)
     return [label, 0]
}).flatten())
// Convertir la lista del diccionario
//*********************************************************************************************************************************************
areas = ee.Dictionary(ee.List(areas).map(function(dict) {
     dict = ee.Dictionary(dict)
     var value = dict.getNumber('sum')
     var klass = dict.getNumber('group')
     var index = values.indexOf(klass)
     var label = labels.get(index)
     return [label, value]
}).flatten())
// Combinar con los valores predeterminados para completar los valores faltantes y agregue una columna de color
//*********************************************************************************************************************************************
    var result = areas.combine(defaults, false).map(function(k, v) {
    var index = labels.indexOf(k)
    return [k, v, palette.get(index)]
}).values(labels)
// Agregue el encabezado de la tabla de datos
//*********************************************************************************************************************************************
result = result.insert(0, ['Label', 'Area', { role: 'style' }])
// Grafico de area
    var chart_area = ui.Chart(result.getInfo())
    .setChartType('ColumnChart')
    .setOptions({
      vAxis: {
        title: 'Area (hectareas)',
        titleTextStyle: {italic: false, bold: true},
        gridlines: {color:'FFFFFF'},
        format:'short',
        baselineColor:'#000000',
      },
      hAxis: {
        title: 'Clases de cobertura y uso de la tierra',
        titleTextStyle: {italic: false, bold: true},
      },
    legend: {position:'left', title:'Clases de cobertura y uso de la tierra'}
  })
//  Configuracion del Mapa
//*********************************************************************************************************************************************
Map.centerObject(allArea)
var lulc_class_color =
'<RasterSymbolizer>' +
  '<ChannelSelection>' + 
    '<GrayChannel>' + 
        '<SourceChannelName>1</SourceChannelName>' +
    '</GrayChannel>' +
  '</ChannelSelection>' +
  '<ColorMap type="values">' +
    '<ColorMapEntry color="#fff2cc" quantity="0" />' +
    '<ColorMapEntry color="#80cc00" quantity="1" />' +
    '<ColorMapEntry color="#c90076" quantity="2" />' +
    '<ColorMapEntry color="#f9cb9c" quantity="3" />' +
    '<ColorMapEntry color="#006400" quantity="4" />' +
    '<ColorMapEntry color="#004eff" quantity="5" />' +
    '<ColorMapEntry color="#004eff" quantity="6" />' +
    '<ColorMapEntry color="#bcbcbc" quantity="7" />' +
    '<ColorMapEntry color="#004eff" quantity="8" />' +
    '<ColorMapEntry color="#f1c232" quantity="9" />' +
    '<ColorMapEntry color="#bf9000" quantity="10" />' +
    '<ColorMapEntry color="#eeeeee" quantity="11" />' +
    '<ColorMapEntry color="#f44336" quantity="12" />' +
    '<ColorMapEntry color="#d9ead3" quantity="13" />' +
    '<ColorMapEntry color="#b45f06" quantity="14" />' +
    '<ColorMapEntry color="#004eff" quantity="15" />' +
    '<ColorMapEntry color="#004eff" quantity="16" />' +
    '<ColorMapEntry color="#004eff" quantity="17" />' +
    '<ColorMapEntry color="#004eff" quantity="18" />' +
    '<ColorMapEntry color="#783f04" quantity="19" />' +
    '<ColorMapEntry color="#004eff" quantity="20" />' +
    '<ColorMapEntry color="#e06666" quantity="21" />' +
    '<ColorMapEntry color="#6aa84f" quantity="22" />' +
    '<ColorMapEntry color="#fce5cd" quantity="23" />' +
  '</ColorMap>' +
'</RasterSymbolizer>'
//Map.addLayer(mapbiomas_lulc.clip(aoi), {}, 'LULC - inspection')
Map.addLayer(classified.clip(allArea).sldStyle(lulc_class_color), {}, 'Clasificación 2021')
// Simbologia
   var legendPanel = ui.Panel({
     style: {
       position: 'bottom-left',
       padding: '8px 15px'
  }})
   var legendTitle = ui.Label({
     value: 'Clases de cobertura y uso de la tierra',
     style: {fontWeight: 'bold',
     fontSize: '15px',
     margin: '0 0 4px 0',
     padding: '0'
    }})
legendPanel.add(legendTitle)
   var makeRow = function(color, label) {
     var colorBox = ui.Label({
       style: {
         backgroundColor: color,
          padding: '8px',
          margin: '0 0 4px 0'
        }})
      var description = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      })
       return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })}
var palette =["#fff2cc", "#80cc00", "#c90076", "#f9cb9c", "#006400", "#004EFF", "#004EFF", "#bcbcbc", "#004EFF", "#f1c232", "#bf9000",
              "#eeeeee", "#f44336", "#d9ead3", "#b45f06", "#004EFF", "#004EFF", "#004EFF", "#004EFF", "#783f04", "#004EFF", "#e06666",
              "#6aa84f", "#fce5cd"]
labels = labels.getInfo()
for (var i = 0; i < 23; i++) {
  legendPanel.add(makeRow(palette[i], labels[i]))
}  
//Map.add(legendPanel)
// Crear un menu desplegable para mostrar los resultados
//**********************************************************************
// Agregar un panel para los graficos
    var panelGraph = ui.Panel({
      style:{width: '300px',position:'middle-right'}
})
// Agregar un selecter y el grafico al panel principal
panel.add(chart_area)
      .add(panelGraph)
//**********************************************************************
//Ultima Línea