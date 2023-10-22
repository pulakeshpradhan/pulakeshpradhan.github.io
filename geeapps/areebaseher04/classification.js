var newfc = ui.import && ui.import("newfc", "table", {
      "id": "users/areebaseher04/Training_pointAssetId_Final"
    }) || ee.FeatureCollection("users/areebaseher04/Training_pointAssetId_Final"),
    valpnts = ui.import && ui.import("valpnts", "table", {
      "id": "users/areebaseher04/validation_pointAssetId_Final"
    }) || ee.FeatureCollection("users/areebaseher04/validation_pointAssetId_Final"),
    dataset = ui.import && ui.import("dataset", "image", {
      "id": "users/areebaseher04/FYPdatasetFinalDone"
    }) || ee.Image("users/areebaseher04/FYPdatasetFinalDone"),
    dataset5 = ui.import && ui.import("dataset5", "image", {
      "id": "users/areebaseher04/FYPdatasetFinal3"
    }) || ee.Image("users/areebaseher04/FYPdatasetFinal3"),
    dataset3 = ui.import && ui.import("dataset3", "image", {
      "id": "users/areebaseher04/FYPdatasetFinalNeww"
    }) || ee.Image("users/areebaseher04/FYPdatasetFinalNeww"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var roi2 = ee.Geometry.Polygon([
  [[67.2712183255738,25.560226722795598], 
  [67.15860846229255,25.396581781900228], 
  [66.97733404823005,25.168100135657102], 
  [66.85099127479255,25.06613845374657], 
  [66.63126471229255,24.966581786071078],
  [66.5955591458863,24.79964389874974],
  [66.7658472318238,24.76972078062407],
  [67.0350122708863,24.694881443979487],
  [67.19156744666755,24.782189623417384],
  [67.4744653958863,24.767226861786693],
  [67.6172876615113,25.232714639341086],
  [67.57608893104255,25.597387658939848],
  [67.40580084510505,25.70385166199184],
  [67.2712183255738,25.560226722795598]
  ]
]);
// print("maindata", dataset2)
var class0Result = []
var class1Result = []
var class2Result = []
var class3Result = []
//RGB images 
Map.centerObject(roi2,12);
Map.addLayer(dataset, {min: 0.0,max: 0.3,bands: ['B4', 'B3', 'B2'], }, 'RGB');
//gee app deploy
//header
var header=ui.Label('plantation level monitoring',{fontSize:'25px',fontWeight: 'bold'});
//text
var text=ui.Label('plantation evel monitoring app is use to give you plantation level of your desired area',{fontSize:'15px'});
//panel to hold text
var panel=ui.Panel({widgets:[header,text],style:{width:'300px',position: 'middle-right'}});
//add our main panel to root gui.
ui.root.insert(1,panel);
//Map.add(panel);
//make the built geometry tool hidden
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPolygon(aoi) {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function polygonHide() {
  clearGeometry();
}
function polygonClear(classified) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  var layer_pixel = layers.get(1)
  var layer_tree = layers.get(2)
  Map.remove(layer_pixel)
  Map.remove(layer_tree)
  clearGeometry();
}
//time series chart will be laced here
// var chartPanel = ui.Panel({
//   style:
//       {height: '235px', width: '600px', position: 'bottom-right', shown: false}
// });
// Map.add(chartPanel);
// function chartNdviTimeSeries() {
//   // Make the chart panel visible the first time a geometry is drawn.
//   if (!chartPanel.style().get('shown')) {
//     chartPanel.style().set('shown', true);
//   }
//   // Get the drawn geometry; it will define the reduction region.
//   var aoi = drawingTools.layers().get(0).getEeObject();
//   // Set the drawing mode back to null; turns drawing off.
//   drawingTools.setShape(null);
//   // Reduction scale is based on map scale to avoid memory/timeout errors.
//   var mapScale = Map.getScale();
//   var scale = mapScale > 5000 ? mapScale * 2 : 5000;
//   // Chart NDVI time series for the selected area of interest.
//   var chart = ui.Chart.image
//                   .seriesByRegion({
//                     imageCollection: ee.ImageCollection('MODIS/006/MOD13A2'),
//                     regions: aoi,
//                     reducer: ee.Reducer.mean(),
//                     band: 'NDVI',
//                     scale: scale,
//                     xProperty: 'system:time_start'
//                   })
//                   .setOptions({
//                     titlePostion: 'none',
//                     legend: {position: 'none'},
//                     hAxis: {title: 'Date'},
//                     vAxis: {title: 'NDVI (x1e4)'},
//                     series: {0: {color: '23cba7'}}
//                   });
//   // Replace the existing chart in the chart panel with the new chart.
//   chartPanel.widgets().reset([chart]);
// }
// drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
// drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
// var controlPanel = ui.Panel({
//   widgets: [
//     ui.Label('3. Wait for chart to render.'),
//     ui.Label({
//         value: class0,
//         label:'class name'
//       })
//       ],
//       style: {position: 'top-left'},
//       layout: null,
// });  
// Map.add(controlPanel);
function Test(data){
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // print("aoi",aoi);
  print("dataset",dataset)
  var buffer = function(feature) {
    return feature.buffer(10)
  };
  newfc = newfc.map(buffer)
  //2) ---- Define the classifier
  //if you want use RandomForest (classifier_alg= "RF") else use SVM (classifier_alg= "SVM")
  var classifier_alg="RF" 
  //3) ----- Define the superpixel seed location spacing, in pixels: (5 - 10 - 15 - 20)
  var size_segmentation = 15;
  //----- Define the GLCM indices used in input for the PCA
  var glcm_bands= ["gray_asm","gray_contrast","gray_corr","gray_ent","gray_var","gray_idm","gray_savg"];
  //-----Pixel-based Approach
  //Selecting desired bands
  var bands= dataset.bandNames();
  print("datasetdataset",dataset);
  // Get the predictors into the table and create a training dataset based on "LULC" property
  var training = dataset.select(bands).sampleRegions({
    collection: newfc,
    properties: ['landcover'],
    scale: 10
  });
  //Training a Random Forest Classifier
  if(classifier_alg=="RF"){
    var classifier =  ee.Classifier.smileRandomForest(50).train({
      features: training,
      classProperty: 'landcover',
      inputProperties: bands
    }); 
  }
  else if (classifier_alg=="SVM") {
  var classifi = ee.Classifier.libsvm({
    kernelType: 'RBF',
    gamma: 1,
    cost: 10
  });
  var classifier = classifi.train(training, 'landcover', bands);
  }
  else{
    print("You need to set your classifier for the Pixel Based approach")
  }
  // data
   //Clip and filter the result of pixel' classification 
  var classified = dataset.select(bands).classify(classifier).clip(aoi).focal_mode();
  //Visualize the result
  Map.addLayer(classified, {min: 0, max: 6, palette: palette}, 'LULC PIXEL APPROACH', false);
  //Create the confusion matrix and calculate the overall accuracy on the training data
  print('RF error matrix_training: ', classifier.confusionMatrix());
  print('RF accuracy_training: ', classifier.confusionMatrix().accuracy());
  //Validation of the pixel-based approach
  var classifierTest = dataset.select(bands).sampleRegions({
    collection: valpnts,
    properties: ['landcover'],
    scale: 10
  });
  var classified_test_RF = classifierTest.classify(classifier);
  var testAccuracy = classified_test_RF.errorMatrix('landcover', 'classification');
  print('Pixel approach_Test confusion matrix: ', testAccuracy);  
  print('PIXEL APPROACH : Overall Accuracy ', testAccuracy.accuracy());
  //Print the number of pixels for each class 
  var analysis_image = classified.select("classification")
  var class_1 =  analysis_image.updateMask(analysis_image.eq(0))
  var class_2 =  analysis_image.updateMask(analysis_image.eq(1))
  var class_3 =  analysis_image.updateMask(analysis_image.eq(2))
  var class_4 =  analysis_image.updateMask(analysis_image.eq(3))
  //  ***********************************************
//lake_mask = lake_mask.updateMask(lake_mask)
 var area_image = class_1.addBands(class_2)
                    .addBands(class_3)
                    .addBands(class_4)
  var classPixels0 = ee.Number(area_image.reduceRegion({
      reducer: ee.Reducer.count(),
      scale: 10,
      geometry: aoi, 
      maxPixels: 1e13,
    }).values().get(0));
  var classPixels1 = ee.Number(area_image.reduceRegion({
      reducer: ee.Reducer.count(),
      scale: 10,
      geometry: aoi, 
      maxPixels: 1e13,
    }).values().get(1));
  var classPixels2 = ee.Number(area_image.reduceRegion({
      reducer: ee.Reducer.count(),
      scale: 10,
      geometry: aoi, 
      maxPixels: 1e13,
    }).values().get(2));
  var classPixels3= ee.Number(area_image.reduceRegion({
      reducer: ee.Reducer.count(),
      scale: 10,
      geometry: aoi, 
      maxPixels: 1e13,
    }).values().get(3))
  print("ali",classPixels0)
  var totPixels = ee.Number(ee.Image(1).reduceRegion({
      reducer: ee.Reducer.count(),
      geometry: aoi,
      scale: 10,
      maxPixels: 1e13,
    }).values().get(0));
  print('Polygon area: ', totPixels);
  // window.class0= classPixels0.divide(totPixels).multiply(100);
  var class0= classPixels0.divide(totPixels).multiply(100);
  //ass0 = 'Classification 0' + class0
  print("Trees"+" " +class0.getInfo())
  var class1= classPixels1.divide(totPixels).multiply(100);
  var class2= classPixels2.divide(totPixels).multiply(100);
  var class3= classPixels3.divide(totPixels).multiply(100);
  print("Grass"+" " +class1.getInfo())
  print("Barreen Land"+" " +class2.getInfo())
  print("Stadium or Golf Clubs"+" " +class3.getInfo())
  class0Result.push(class0)
  class1Result.push(class1)
  class2Result.push(class2)
  class3Result.push(class3)
  var dataclass = ee.List([class0, class1, class2, class3]);
  print(dataclass)
  var Trees_mask = classified.select('classification').eq(1)
  var Trees = analysis_image.updateMask(Trees_mask)
  // Map.addLayer(Trees, {min: 0, max: 6, palette: palette}, 'Trees', false);
  Map.addLayer(Trees, {bands:['classification'], min:0, max:0.3, palette: ['228B22']}, 'Trees');
  var text2=ui.Label('Percentage of each Class',{fontSize:'25px',fontWeight: 'bold'});
  var class0_perc = ui.Label("Trees"+" " + class0.getInfo()+ " %",{fontSize:'15px'});
  var class1_perc = ui.Label("Grass"+" " +class1.getInfo()+ " %",{fontSize:'15px'});
  var class2_perc = ui.Label("Barreen Land"+" " +class2.getInfo()+ " %",{fontSize:'15px'});
  var class3_perc = ui.Label("Stadium or Golf Clubs"+" " +class3.getInfo()+ " %",{fontSize:'15px'});
  panel.add(text2);
  panel.add(class0_perc);
  panel.add(class1_perc);
  panel.add(class2_perc);
  panel.add(class3_perc);
}
drawingTools.onDraw(ui.util.debounce(Test, 500));
drawingTools.onEdit(ui.util.debounce(Test, 500));
//chart display
// var data = ee.List([class0, class1, class2, class3]);
// var chart = ui.Chart.array.values(data, 0, data);
// var chartPanel = ui.Panel(chart);
// Map.add(chartPanel);
//user interface
/*
var symbol = {
  polygon: '🔺',
  point: '📍',
};
*/
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label:  'Hide geometry',
      onClick: polygonHide,
      style: {stretch: 'horizontal'}
    }),
     ui.Button({
      label:  'Clear',
      onClick: polygonClear,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('1.Click "Polygon" button\nto draw geometry over\ndesired location.',{whiteSpace: 'pre'}),
    ui.Label(
        '2.Select "LULC" layer to\nsee classifed layer.',
        {whiteSpace: 'pre'}), 
    ui.Label('3.Click "Hide Geometry"\nbutton to see Classified\nlayer.',{whiteSpace: 'pre'}),
    ui.Label('4.Click "Clear" button to\ndelete drawn polygon.',{whiteSpace: 'pre'}),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
//ends the geometry drawing tool code
//Palette for the classification
var palette = [
  '274F13', //(0)  Trees    
  '000000', //(1) Non_Trees           
  'F52206', //(2) Grass
  '5FF506', ///3)  Stadium_Golf
];  
// name of the legend
var names = ['Trees','Non_Trees','Grass ','Stadium_Golf'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '30 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);