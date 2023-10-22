var GMWR = ui.import && ui.import("GMWR", "image", {
      "id": "users/smk6598/GMW_PR_USVI"
    }) || ee.Image("users/smk6598/GMW_PR_USVI"),
    test = ui.import && ui.import("test", "table", {
      "id": "users/grettelvargas/Manglares_data_031221/test"
    }) || ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/test"),
    train = ui.import && ui.import("train", "table", {
      "id": "users/grettelvargas/Manglares_data_031221/train"
    }) || ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/train"),
    allArea = ui.import && ui.import("allArea", "table", {
      "id": "users/grettelvargas/Manglares_data_031221/buffer_2km"
    }) || ee.FeatureCollection("users/grettelvargas/Manglares_data_031221/buffer_2km"),
    training_points = ui.import && ui.import("training_points", "table", {
      "id": "users/grettelvargas/Clases_manglar/training_todas"
    }) || ee.FeatureCollection("users/grettelvargas/Clases_manglar/training_todas");
// // -------------------------------------------------------------------------
// // 
// // Grettel Vargas Azofeifa
// // Unidad de Acción Climática
// // The Tropical Agricultural Research and Higher Education Center.
// // 
// // Año 2021
// // --------------------------------------------------------------------------
///////////////////////////////////////////////////////////////
//                    1) Set up the map                      //
///////////////////////////////////////////////////////////////
//center map to area being classified
Map.setCenter(-84.0748, 10.00030, 12);
Map.addLayer(allArea, {}, 'Contorno manglares')
Map.setOptions('HYBRID');
//specify the extent of the area to be classified
var classificationExtent = allArea; 
var simard = ee.ImageCollection('projects/mangrovescience/DAAC_Hba_Simard')
var training_points = ee.FeatureCollection("users/grettelvargas/Clases_manglar/training_todas")
//-----------------------------------------------------------------------------------------------
// Establish variable for visualizing data on screen
var median_vis = {
  min: 0.0,
  max: 0.3,
  bands: ['B8_median', 'B11_median', 'B4_median'],
};
///////////////////////////////////////////////////////////////
//            2) Set up Filtered Landsat Composite           //
///////////////////////////////////////////////////////////////
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
//2.2) Filter Landsat data by Date and Region
/////////////////////////////////////////////
var getImage = function(geometry) {
  var start = ee.Date('2021-01-01');
  var end = ee.Date('2021-04-30');
  var date_range = ee.DateRange(start,end);
  var sentinel_collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(date_range)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))//Pre-filter to get less cloudy granules.
    .filterBounds(allArea)
    .map(maskS2clouds)
    .select('B.*')
    .map(function(image) { return image.clip(allArea); });
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Reduce collection to 1 image and mask out water areas 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Reduce Sentinel image collection to single image
  var sentinel_image = sentinel_collection.reduce(ee.Reducer.median());
//Mask out the zero values in the data
 var masked = sentinel_image.selfMask();
//2.3) Adding Spectral Indices
//////////////////////////////////////////////
  //Calculate and add NDVI (Normalized Difference Vegetation Index (NDVI))
  var ndvi = sentinel_image.normalizedDifference(['B8_median', 'B4_median']);
  var image = sentinel_image.addBands(ndvi.rename('NDVI'));
  // MVI Bololoy 
   var mvi =  sentinel_image.expression('float (NIR-GREEN)/ float (SWIR-GREEN)',
   {'NIR': sentinel_image.select('B8_median'),'GREEN': sentinel_image.select('B3_median'), 'SWIR': sentinel_image.select('B11_median') });
   image = image.addBands(mvi.rename('MVI'));
  //Calculate and add NDBI (Normalized Difference Built-up Index (NDBI))
  //SWIR(Band11)-NIR(Band8)/ SWIR(Band11)+NIR(Band8)
  var ndbi = sentinel_image.normalizedDifference(['B11_median','B8_median']);
  image = image.addBands(ndbi.rename('NDBI'));
  //Calculate and add NDBaI (Normalized Difference Bareness Index (NDBaI))
  //https://eo4sd-lab.net/sites/default/files/eo4sd_lab_s2_ndbal_guide_v1.1.pdf
  // (SWIR [B11] – Vegetation Red Edge [B8A] / (SWIR [B11] + Vegetation Red Edge [B8A])
  var ndbai = sentinel_image.normalizedDifference(['B11_median','B8A_median']);
  image = image.addBands(ndbai.rename('NDBaI'));
  //Calculate and add NDMI (Normalized Difference Moisture Index  (NDMI))
  //NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11)
  var ndmi = sentinel_image.normalizedDifference(['B8_median', 'B11_median']);
  image = image.addBands(ndmi.rename('NDMI'));
  var evi = image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))',
    {'NIR' : image.select('B8_median').divide(10000), 'RED' : image.select('B4_median').divide(10000), 'BLUE': image.select('B2_median').divide(10000)})
   image = image.addBands(evi.rename('EVI'));
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
  // Mask non-mangrove candidates out of Sentinel image using NDMI layer
  //image = low_land_sentinel_image.updateMask(ndmi_layer.lte(0.1)).
  // Mask non-vegetation using NDVI: Here I use a low threshold of 0.1 in order not to exclude areas of dead mangroves.
  //If you do not need dead mangrove areas, increase the threshold to only retain green areas..
  var veg_sentinel_image = image.updateMask(ndvi.gte(-0.9)).set('system:time_start',ee.Date(end).millis());
  return(veg_sentinel_image);
};
//Image to be used for training is the full extent image. I use the full extent image here because it allows me to used
//training data from any point within that extent. E.g., I can use training data for Puerto Rico to classify St. Thomas
//if the full extent image includes both of these areas.
var trainingImage = getImage(allArea);
//Map.addLayer(trainingImage, median_vis, "sentinel image: full extent");
// Normalize the image 
// Machine learning algorithms work best on images when all features have
// the same range
// Function to Normalize Image
// Pixel Values should be between 0 and 1
// Formula is (x - xmin) / (xmax - xmin)
//************************************************************************** 
function normalize(image){
  var bandNames = image.bandNames();
  // Compute min and max of the image
  var minDict = image.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: boundary,
    scale: 20,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var maxDict = image.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: boundary,
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
///2.5) Display results
///////////////////////
//Image to be classified
var classificationImage = getImage(classificationExtent);
Map.addLayer(classificationImage, median_vis, "Sentinel imagen a clasificar");
//Map.addLayer(training_points, {color: 'yellow'}, 'All Training_ptos')
///////////////////////////////////////////////////////////////
//          3) Construct Random Forest Model                 //
///////////////////////////////////////////////////////////////
////////////////////////////////////////////////
//// In this example, we use land cover classes: 
//// 1 = Magle alto
//// 2 = Magle bajo
//// 3 = Bosque seco
//// 4 = Agua
//// 5 = Cultivo intensivo
//// 6 = Suelo desnudo
//// 7 = Salinas
//// 8 = Matorral seco
//// 9 = Pastos
//// 10 = Arenales
//// 11 = Agricultura de secano
//// 12 = Bosque seco denso/alto
//// 13 = Humedales
// Designate which spectral bands to include in the classification
  var bands = ["B8_median", "B4_median", "B3_median", "B2_median", "NDVI", "NDMI", "NDBaI", "NDBI","MVI" ];
  var trainingImage= trainingImage.select(bands).clip(allArea)
// Add a random column and split the GCPs into training and validation set
var gcp = training_points.randomColumn()
// This being a simpler classification, we take 70% points
// for validation. Normal recommended ratio is
// 70% training, 30% validation
var trainingGcp = gcp.filter(ee.Filter.lt('random', 0.7));
var validationGcp = gcp.filter(ee.Filter.gte('random', 0.7));
//Map.addLayer(validationGcp, {color: 'green'}, 'Puntos de validacion')
var trainingGcpPoints= trainingGcp.size();
print('Numero de puntos de entrenamiento:', trainingGcpPoints);
var validationGcpPoints= validationGcp.size();
print('Numero de puntos de validacion:', validationGcpPoints);
//----------------------------------------------------- -
//Function for performing the classification.
function classification(trainingImage,classificationImage){
  // Train the classifier using the training points
  var training = trainingImage.select(bands).sampleRegions({
    collection: trainingGcp,
    properties: ['class'],
    scale: 10,
    tileScale: 16,
  });
//3.2) Begin Random Forest Classification
/////////////////////////////////////////    
  // Establish the classifier
  var classifier = ee.Classifier.smileRandomForest(100,5)
    .train({
      features: training,
      classProperty: 'class',
      inputProperties: bands
    });
    //classify the image
  var classified = classificationImage.select(bands).classify(classifier);
  return classified;
}
//----------------------------------------------------- -
// Classify the image
var classified_image = classification(trainingImage,classificationImage);
//Map.addLayer(classified_image.randomVisualizer(), {}, 'Clasificación RF');
//3.3) Test the accuracy of the model
/////////////////////////////////////
// Use classification map to assess accuracy using the validation fraction
// of the overall training set created above.
var test = classified_image.sampleRegions({
  collection: validationGcp,
  properties: ['class'],
  scale: 10,
  tileScale: 16
});
//print('Confusion matrix:', test);
var testConfusionMatrix = test.errorMatrix('class', 'classification')
// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
//print('Validation Confusion Matrix:', testConfusionMatrix); //// Confusion matrix based on validation data
//print('Validation overall accuracy:', testConfusionMatrix.accuracy()); //Overall accuracy of classification based on validation data
//print('Validation Kappa: ', testConfusionMatrix.kappa());//kappa value of classification based on validation data
//print('Producers Accuracy:', testConfusionMatrix.producersAccuracy());
//print('Consumers Accuracy:', testConfusionMatrix.consumersAccuracy());
//3.4) Post-processing
/////////////////////////////////////
// Smooth with a mode filter. //Filter the image to romove groups of (isolated) pixels
var SCALE=10;
var mode = classified_image.focal_mode();
// Weighted smoothing 
// using a 3x3 window
// euclidean distance weighting from corners
var weights = [[1,2,1],
               [2,3,2],
               [1,2,1]];
// create a 3x3 kernel with the weights
// kernel W and H must equal weight H and H
var kernel = ee.Kernel.fixed(3,3,weights);
// apply mode filter on neightborhood using weights
var Classification_mode_filtered = classified_image.reduceNeighborhood({
  reducer: ee.Reducer.mode(),
  kernel: kernel
});
// 4) Results
////////////////////
//4.1) Extract the Mangrove class from the filtered thematic map.  
////////////////////
   var Mangroves_filtered = Classification_mode_filtered.updateMask(Classification_mode_filtered.eq(2)); 
  // Map.addLayer(Mangroves_filtered.randomVisualizer(), {}, 'Capa de Manglar');
// 4.2) Calculate mangrove area, and print to console/////////
//=============================================================================================
//Mangroves area from current map
  var MangroveClass = Mangroves_filtered.select(2).rename('mangroves');//rename the mangroves band
  var areaImage = MangroveClass.add(ee.Image.pixelArea());//assign pixel values to be pixel area
  var Mangrove_area = areaImage.reduceRegion({
   reducer: ee.Reducer.sum(), //add up areas of all pixels
   geometry: classificationExtent,
   scale: 10,
   maxPixels: 1e13
});
///////////////////////////////////////////////////////////////
//          5) Export Layers of Interest                      //
///////////////////////////////////////////////////////////////
// 5.1) Export the mangrove polygon to Google Drive 
// Export.table.toDrive({
//   collection: mangroves_polygon,
//   description:'Poligonos_Manglares',
//   fileFormat: 'SHP'
// });
// 5.2) Generate random points for "mangrove presence" validation, and export to Google Drive
//var presence_points = ee.FeatureCollection.randomPoints(mangroves_polygon, 1000);
//Export.table.toDrive({collection: presence_points, fileFormat: 'GeoJSON'});
// 5.3) Create a Feature with null geometry and the value we want to export.
// Use .array() to convert Confusion Matrix to an Array so it can be
// exported in a CSV file
//var fc = ee.FeatureCollection([
//  ee.Feature(null, {
//    'accuracy': testConfusionMatrix.accuracy(),
//    'matrix': testConfusionMatrix.array(),
//    'kapa': testConfusionMatrix.kappa(),
//    'Producers Accuracy:': testConfusionMatrix.producersAccuracy(),
//    'Consumers Accuracy:': testConfusionMatrix.consumersAccuracy(),
//  })
//  ])
//vprint(fc)  
//Export.table.toDrive({
//  collection: fc,
//  description: 'Accuracy_class',
//  folder: 'Resultados',
//  fileNamePrefix: 'acc_class',
//  fileFormat: 'CSV'
//})
// Convert mangrove raster to polygon, inside of which to generate random mangrove present points for validation
   var mangroves_polygon = Mangroves_filtered.toInt().reduceToVectors({
     geometry: classificationExtent,
     crs: Mangroves_filtered.projection(),
     scale: 10,
     geometryType: 'polygon',
     eightConnected: false,
     maxPixels: 1e13
});
//Map.addLayer(mangroves_polygon, {color: 'white'}, 'Poligonos para manglares');
// Export the mangrove polygon to Google Drive 
 Export.table.toDrive({
   collection: mangroves_polygon,
   description:'Poligonos_Manglares',
   fileFormat: 'SHP'
 });
// Generate random points for "mangrove presence" validation, and export to Google Drive
var presence_points = ee.FeatureCollection.randomPoints(mangroves_polygon, 1000);
Export.table.toDrive({collection: presence_points, fileFormat: 'GeoJSON'});
///////////////////////////////////////////////////////////////
//      6) Begin setting up map appearance and app layers             
///////////////////////////////////////////////////////////////
//6.1) Set up general display
// We want to set up a Viridis color pallete to display the Simard data
//Mosaic the Simard data to an Image so we can clip it later
var hba = simard.mosaic()
var viridis = {min: 0 , max : 25,palette : ['#481567FF','#482677FF','#453781FF','#404788FF','#39568CFF',
                                              '#33638DFF','#2D708EFF','#287D8EFF','#238A8DFF','#1F968BFF',
                                              '#20A387FF','#29AF7FFF','#3CBB75FF','#55C667FF',
                                              '#73D055FF','#95D840FF','#B8DE29FF','#DCE319FF','#FDE725FF' 
]};
var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false) //https://daac.ornl.gov/CMS/guides/CMS_Global_Map_Mangrove_Canopy.html
//6.2) Create variables for GUI layers for each layer
//We set each layer to "false" so the user can turn them on later
var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false)
var exten2021 = ui.Map.Layer(mangroves_polygon, {color: '71F4B7'}, 'Extent Mangrove High 2021',false)
//Add these layers to our map. They will be added but not displayed
Map.add(simHBA)
Map.add(exten2021)
///////////////////////////////////////////////////////////////
//      7) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//7.1) Set up title and summary widgets
//App title
var header = ui.Label('Monitoreo de Manglares en Costa Rica 2021', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'Esta herramienta monitorea la extensión de los manglares en Costa Rica en 2021 derivada de imágenes Sentinel-2.. ' +
  'Utilice la herramienta a continuación para explorar los cambios en la extensión de los manglares y la altura del dosel de los manglares en 2000 según Simart et al. 2019..',
    {fontSize: '15px'});
//7.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-left'}});
//7.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Seleccione las capas',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//7.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
///////////////////////////////////////////////////////////////
//         8) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//8.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Extensión del manglar',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//8.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var extCheck1 = ui.Checkbox('2021').setValue(false); //false = unchecked
//Now do the same for the Simard Height map
var heightLab = ui.Label({value:'Alturas del manglar (Simard et al. 2019)',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var heightCheck = ui.Checkbox('2000').setValue(false);
//8.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Create a palette using the same colors we used for each extent layer
var paletteMAPa = [
'f3f6f4',//2020
];
// Name of each legend value
var namesa = ['Manglares 2021']; 
// Add color and names to legend
for (var i = 0; i < 1; i++) {
  extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
  }  
//Height Legend
///////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
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
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck1)
      .add(extentLegend)
      .add(heightLab)
      .add(makeLegend2(viridis))
      .add(heightCheck)
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent 2017
var doCheckbox1 = function() {
  extCheck1.onChange(function(checked){
  exten2021.setShown(checked)
  })
}
doCheckbox1();
//Simard Height Data
var doCheckbox4 = function() {
  heightCheck.onChange(function(checked){
  simHBA.setShown(checked)
  })
}
doCheckbox4();
//----------------------------------------------------------------------------------------------------
//column CHART
//----------------------------------------------------------------------------------------------------
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
// Compute the area of each class.
var areas = ee.Image.pixelArea().divide(10000).addBands(Classification_mode_filtered)
  .reduceRegion({
    reducer: ee.Reducer.sum().group(1), 
    geometry: allArea, 
    scale: 100
  }).get('groups')
// A dictionary of default values to fill in 0's for missing classes.
var defaults = ee.Dictionary(labels.map(function(label) {
  var index = labels.indexOf(label)
  return [label, 0]
}).flatten())
// Convert the list of group dictionaries into one big dictionary.
areas = ee.Dictionary(ee.List(areas).map(function(dict) {
  dict = ee.Dictionary(dict)
  var value = dict.getNumber('sum')
  var klass = dict.getNumber('group')
  var index = values.indexOf(klass)
  var label = labels.get(index)
  return [label, value]
}).flatten())
// Combine with the defaults to fill in missing values, and add a color column.
var result = areas.combine(defaults, false).map(function(k, v) {
  var index = labels.indexOf(k)
  return [k, v, palette.get(index)]
}).values(labels)
// Append the data table header.
result = result.insert(0, ['Label', 'Area', { role: 'style' }])
//chart_area
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
//print(chart_area)
//----------------------------------------------------------------------------------------------------
//map LAYER
//----------------------------------------------------------------------------------------------------
Map.centerObject(allArea)
var lulc_class_color =
'<RasterSymbolizer>' +
  '<ChannelSelection>' + //used when image has more than one band (to specify which band in which channel).
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
Map.addLayer(Classification_mode_filtered.clip(allArea).sldStyle(lulc_class_color), {}, 'Clasificación 2021')
//Legend
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
Map.add(legendPanel)
////////////////////////////////////////////////////////
//  8) Create a dropdown menu to display graph results //
////////////////////////////////////////////////////////
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
//Add selecter and graph panel to main panel
panel.add(chart_area)
      .add(panelGraph)