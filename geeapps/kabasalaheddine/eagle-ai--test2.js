var table1 = ui.import && ui.import("table1", "table", {
      "id": "projects/ee-kabasalaheddine/assets/Plastic_ceiba_L8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/Plastic_ceiba_L8"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-kabasalaheddine/assets/Plastic_cyprus_L8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/Plastic_cyprus_L8"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "projects/ee-kabasalaheddine/assets/Water_ceiba_L8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/Water_ceiba_L8"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "projects/ee-kabasalaheddine/assets/plastic_mety_L8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/plastic_mety_L8"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water_cyprus_L8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water_cyprus_L8"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water_mety_l8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water_mety_l8"),
    table11 = ui.import && ui.import("table11", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water1"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water1"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water2"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water2"),
    table8 = ui.import && ui.import("table8", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water3"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water3"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water4"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water4"),
    table10 = ui.import && ui.import("table10", "table", {
      "id": "projects/ee-kabasalaheddine/assets/water5"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/water5"),
    table13 = ui.import && ui.import("table13", "table", {
      "id": "projects/ee-kabasalaheddine/assets/LAND1"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/LAND1"),
    table12 = ui.import && ui.import("table12", "table", {
      "id": "projects/ee-kabasalaheddine/assets/seaweed_scot"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/seaweed_scot"),
    table16 = ui.import && ui.import("table16", "table", {
      "id": "projects/ee-kabasalaheddine/assets/plastic_Accra"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/plastic_Accra"),
    table14 = ui.import && ui.import("table14", "table", {
      "id": "projects/ee-kabasalaheddine/assets/plastic_Calabria"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/plastic_Calabria"),
    table15 = ui.import && ui.import("table15", "table", {
      "id": "projects/ee-kabasalaheddine/assets/plastic3"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/plastic3"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-kabasalaheddine/assets/Seaweed_scot_l8"
    }) || ee.FeatureCollection("projects/ee-kabasalaheddine/assets/Seaweed_scot_l8"),
    plast = ui.import && ui.import("plast", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                15.767184907519392,
                37.910681051657555
              ],
              [
                15.767184907519392,
                37.90715964177743
              ],
              [
                15.770618135058454,
                37.90715964177743
              ],
              [
                15.770618135058454,
                37.910681051657555
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[15.767184907519392, 37.910681051657555],
          [15.767184907519392, 37.90715964177743],
          [15.770618135058454, 37.90715964177743],
          [15.770618135058454, 37.910681051657555]]], null, false),
    AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            15.79293411406236,
            37.90783684907419
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Point([15.79293411406236, 37.90783684907419]);
Map.setControlVisibility({mapTypeControl: false});
//Map.setControlVisibility(all, layerList, zoomControl, scaleControl, false, 
//fullscreenControl, drawingToolsControl)
Map.setOptions('SATELLITE');
Map.centerObject(AOI, 2);
var panel = ui.Panel({style: {width: '500px', 
 height: '600px',backgroundColor:'#95B9C7',border: '5px solid darkgray'}})
 var panel = ui.Panel({style: {width: '500px', 
 height: '600px',backgroundColor:'#95B9C7',border: '5px solid darkgray'}})
 .add(ui.Label({value      :'EAGLE AI APP: Choose the satellite and click on the map to determine area of interest (AOI)',
                     style:{
                     color      : '#00008B', 
                     fontWeight : 'bold', 
                     fontSize   : '12px',
                     fontFamily : 'serif',
                     padding    : '10px',
                    backgroundColor:'#95B9C7'
                     }
                     }))
 var select_style = {fontSize: '15px', 
                      color: '#000000',
                      fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
    ui.root.add(panel);
    //SHOW HIDE PANEL
    var notesShow = false;
function notesButtonHandler() {
  if(notesShow){
    notesShow = false;
    notesPanel.style().set('shown', false);
    notesPanel.style().set('width', '83px');
    notesButton.setLabel('Click to see Eagle AI Tutorial');
  } else {
    notesShow = true;
    notesPanel.style().set('shown', true);
    notesPanel.style().set('width', '290px');
    notesButton.setLabel('Hide Eagle AI  notes');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '500', margin: '8px 8px 1px 8px'};
var linkStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '500', margin: '8px 8px 1px 8px', color: '#0000FF'};
// Show/hide note button.
var notesButton = ui.Button({label: 'Click to see Eagle AI notes', onClick: notesButtonHandler, style: {margin: '0px'}});
// Notes panel. 
var notesPanel = ui.Panel({
  widgets: [
    ui.Label({value: 'Eagle AI app detect and quantify plastic marine debris based on data satellite.', style: noteStyle}),
    ui.Label({value: 'Choose the satellite, click on the map to determine the area of interest (see the link below for the demo video and the tutoriel).', style: noteStyle}),
    ui.Label({value: 'Some reference cases.', style: noteStyle}),
    ui.Label({value: '• Calabria, Italy 22-10-2018 (Sentinel 2).', style: noteStyle}),
    ui.Label({value: '• Accra, Ghana 31-10-2018 (Sentinel 2).', style: noteStyle}),
    ui.Label({value: '• Isle of May, Scotland 20-04-2018 (Sentinel 2).', style: noteStyle}), 
    ui.Label({value: '• La Ceiba, Honduras 19-01-2018 (Landsat 8).', style: noteStyle}),
    ui.Label({value: 'Demo video.', style: linkStyle, targetUrl: 'https://www.youtube.com/watch?v=RzDbnKLJ8uw/'}),
    ui.Label({value: 'Tutorial.', style: linkStyle, targetUrl: 'https://drive.google.com/file/d/1EGC1e0dE4nnysWMANaEZwDltZYIClnHs/view?usp=sharing'}),
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
var notesContainer = ui.Panel({widgets: [notesButton, notesPanel],
  style: {position: 'top-center', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
Map.add(notesContainer);
//Select the satellite
 var sate = ['Sentinel2', 'Landsat8']
    var select = ui.Select({
        items: sate,
        onChange: function (key) {
    panel.remove(panel.widgets().get(10))
    panel.remove(panel.widgets().get(11))
    panel.remove(panel.widgets().get(12))
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
        var choice = select.getValue()
//      print(choice)
 if(choice == 'Landsat8'){
//INPUT
//LANDSAT 8
//Map.centerObject(AOI, 8);
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
//var collection1 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').first())
//  .set('SENSOR_ID', 'OLI_TIRS');
//LANDSAT 8 
//var collection = ee.ImageCollection("LANDSAT/LO08/C01/T1_RT");
var start = ee.Image(collection.first()).date().format().getInfo();
Map.style().set('cursor', 'crosshair');
var now = Date.now()
var end = ee.Date(now).format().getInfo();  
var start_date = end 
var end_date = end
var s2_data
var collection1
var geometry
var point
var list_s2_data
var cloud_cover = 100
var n_files
var selected_image
var addFDI
var addNDVI
var S2_corr
var maskedComposite
var AOI1
//function maskS2clouds(image) {
var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};
// A function to mask out cloudy pixels.
var cloud_shadows = function(image) {
  // Select the QA band.
  var QA = image.select(['BQA']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 7,8, 'Cloud_shadows').eq(1);
  // Return an image masking out cloudy areas.
};
// A function to mask out cloudy pixels.
var clouds = function(image) {
  // Select the QA band.
  var QA = image.select(['BQA']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 4,4, 'Cloud').eq(0);
  // Return an image masking out cloudy areas.
};
var maskClouds = function(image) {
  var cs = cloud_shadows(image);
  var c = clouds(image);
  image = image.updateMask(cs);
  return image.updateMask(c);
};  
//}
//function maskS2shadow(image) {
 ///var cld = require('users/fitoprincipe/geetools:cloud_masks')
//var mask_shadow = cld.hollstein_S2(['shadow'])(image)
  //return mask_shadow//.divide(10000);
//}
//faunctioh for Atmospheric correction/NDVI FDI CALCULATION/Cloud masking
var imagetreatment = function(s2_data,S2_corr,addNDVI,addFDI,maskedComposite){
// - Apply SIAC and retrieve bottom of atmosphere (BOA) reflectance
//var siac = require('users/marcyinfeng/utils:SIAC');
//S2_corr = siac.get_sur(s2_data.first()); 
S2_corr=s2_data.first()
var ndvi = S2_corr.expression(
    '(nir-red)/(nir+red)', {
      'red' : S2_corr.select('B4'), 
     'nir' : S2_corr.select('B5'),
}).rename('NDVI');
 addNDVI=S2_corr.addBands(ndvi);
//print(addNDVI,'NDVI')
//var ndviParams = {min: -1, max:1, palette: ['blue', 'white', 'green']};
//Map.addLayer(ndvi, ndviParams, 'ndvi',0);
// Display the result.
// Compute the Floating debris index(FDI).
var fdi = S2_corr.expression(
    'nir-(red2+(SWIR1-red2)*10*((lam_nir-lam_red)/(lam_SWIR1-lam_red)))', {
      'nir' : S2_corr.select('B5'),
     'red2' : S2_corr.select('B4'),
     'SWIR1' : S2_corr.select('B6'),
     'lam_red' : 654.5,
      'lam_nir' : 865.0, 
      'lam_SWIR1': 1608.5
}).rename('FDI');
 addFDI=addNDVI.addBands(fdi);
var point_train=table1.merge(table2).merge(table3).merge(table4).merge(table5).merge(table6)
 //using the "random" column. Roughly 80% for training, 20% for testing.
 var split = 0.8;
 var training = point_train.filter(ee.Filter.lt('random', split));
 var testing = point_train.filter(ee.Filter.gte('random', split));
//Print these variables to see how much training and testing data you are using
 //print('Samples n =', point_train.aggregate_count('.all'));
 //print('Training n =', training.aggregate_count('.all'));
// print('Testing n =', testing.aggregate_count('.all'));
//******Part 4: Random Forest Classification and Accuracy Assessments******
//////////////////////////////////////////////////////////////////////////
 var bands = ['B6', 'B2', 'B3', 'B4', 'B5','FDI','NDVI'];
//print(addFDI,'FDI')
// fdiParams = {min: 0, max:0.05, palette: ['blue', 'white', 'green']};
//Map.addLayer(fdi, fdiParams, 'FDI image',0);
var classifier1 = ee.Classifier.libsvm({
kernelType: 'RBF',
gamma: 0.5,
cost: 10
});
  var  classifier= classifier1.train({ 
 features: training,
 classProperty: 'Classe',
 inputProperties: bands
 });
//Test the accuracy of the model
////////////////////////////////////////
//Print Confusion Matrix and Overall Accuracy
 var confusionMatrix = classifier.confusionMatrix();
 //print('Confusion matrix: ', confusionMatrix);
 //print('Training Overall Accuracy: ', confusionMatrix.accuracy());
 var kappa = confusionMatrix.kappa();
// print('Training Kappa', kappa);
 //
 var validation = testing.classify(classifier);
 var testAccuracy = validation.errorMatrix('Classe', 'classification');
 //print('Validation Error Matrix RF: ', testAccuracy);
 //print('Validation Overall Accuracy RF: ', testAccuracy.accuracy());
 var kappa1 = testAccuracy.kappa();
 //print('Validation Kappa', kappa1);
//Apply the trained classifier to the image
 var classified = addFDI.select(bands).classify(classifier);
//print(classified,'classified')
// Load or import the Hansen et al. forest change dataset.
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
// Select the land/water mask.
var datamask = hansenImage.select('datamask');
// Create a binary mask.
var mask = datamask.eq(2);
// Update the composite mask with the water mask.
 maskedComposite = classified.updateMask(mask);
//Map.addLayer(maskedComposite, visParams, 'masked'); 
return  maskedComposite; 
}
var app = function(){
  var get_fileame = function(image){
    return image.get('LANDSAT_PRODUCT_ID')
  }
  var date_style = {fontSize: '12px', 
                      color: '#000000',
                      fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
var date_style2 = {fontSize: '10px', 
                      color: '#000000',
                      fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
// var panel = ui.Panel({style: {width: '500px',}})
 var date_slider_style = { 
    width: '80%',
    height: '120px',
    stretch: 'both',
    padding: '10px',
    fontFamily : 'serif',
      backgroundColor:'#95B9C7',
  }
  var slider_style = {
    width: '90%', 
    height: '80px',
    stretch: 'both',
    padding: '10px', 
    fontFamily : 'serif',
      backgroundColor:'#95B9C7',
  }
  var location_style = {fontSize: '12px', 
                      color: '#FF0000',
                      fontWeight: 'bold',
                      fontFamily : 'DM Serif Display',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
   // AOI setting
  Map.onClick(function(coords) {
    geometry = ee.Geometry.Point(coords.lon, coords.lat);
    var location = 'longitude: ' + coords.lon.toFixed(2) + ' ' +
                   'latitude: ' + coords.lat.toFixed(2);
   var point = ui.Map.Layer(ee.Geometry.Point(geometry), {color: 'FF0000'})
 Map.remove(point)
    point = ui.Map.Layer(geometry, {color: 'FF0000'})
    Map.layers().set(0, point);
    panel.widgets().set(0, ui.Label(location, location_style))
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUD_COVER', 'not_greater_than', 50)
                            .map(maskClouds)
//                            .map(maskS2shadow)
    list_s2_data = s2_data.toList(5000, 0)
//    print(collection,'rrrr')
  //  print(s2_data)
  });
 // Date range start slider
  var dateSlider_start = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              start_date = ee.Algorithms.If(this_range, this_range.start(), start)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                     .filterMetadata('CLOUD_COVER', 'not_greater_than', cloud_cover)
                                     .map(maskClouds)
//                                      .map(maskS2shadow) 
              list_s2_data = s2_data.toList(5000, 0)
              },
    style: date_slider_style
  });
// Date range end slider
  var dateSlider_end = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              end_date = ee.Algorithms.If(this_range, this_range.end(), end)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                      .filterMetadata('CLOUD_COVER', 'not_greater_than', cloud_cover)
                                      .map(maskClouds)
//                                       .map(maskS2shadow)
              list_s2_data = s2_data.toList(5000, 0)
            },
    style: date_slider_style
  });
  // cloud cover slider
  var slider = ui.Slider({min:0, max:100, step : 1, value: 100, style: slider_style});
  slider.onChange(function(value) {
    cloud_cover = value
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUD_COVER', 'not_greater_than', cloud_cover)
                           .map(maskClouds)
//                            .map(maskS2shadow)
    list_s2_data = s2_data.toList(5000, 0)
  });
  panel.widgets().set(2, ui.Label('Start date: ', date_style))
  panel.widgets().set(3, dateSlider_start.setValue(now));
  panel.widgets().set(4, ui.Label('End date: ', date_style));
  panel.widgets().set(5, dateSlider_end.setValue(now));
  panel.widgets().set(6, ui.Label('Cloud cover percentage: ', date_style));
  panel.widgets().set(7, slider)
 var button1 = ui.Button({
    label: 'Search',
//    style: {fontFamily : 'serif'},
     style: date_style,
    onClick: function() {
    panel.remove(panel.widgets().get(9))
    panel.remove(panel.widgets().get(10))
    panel.remove(panel.widgets().get(11))
    panel.remove(panel.widgets().get(12))
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
    n_files = list_s2_data.size()
    n_files.evaluate(function(result){
      panel.widgets().set(9, ui.Label({value: + result +  ' Satellite images are found!', 
                                       //style:{fontFamily : 'serif',}
                                      style: date_style
      })) 
    }) 
    var fnames = s2_data.aggregate_array('LANDSAT_PRODUCT_ID')
    fnames.evaluate(function(result){
        panel.widgets().set(10, ui.Label('Results: ',date_style));
        panel.widgets().set(11, ui.Label(result.join('\n'),date_style))
      })
    fnames.evaluate(function(result){  
    var select = ui.Select({
        items: result,
        onChange: function(key) {
        var image = ee.Image(s2_data.filterMetadata('LANDSAT_PRODUCT_ID', 'equals', key).first())
///        var  image=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
        selected_image = image
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(image, rgbVis, 'Image_satellite_L8');                              
        Map.centerObject(geometry,14)
       Map.layers().set(0, image)
//        Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}))
      }})
      select.setPlaceholder('Display satellite image',date_style)
      panel.widgets().set(12, select);
      panel.widgets().set(13, button2);
      panel.widgets().set(14, button3);
    //  panel.widgets().set(24, button4);
    })
    }});
  panel.widgets().set(8, button1);
var legend
  var button2 = ui.Button({
    label: 'Detect plastic',
    style: date_style,
    onClick: function() {
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
    var legend = ui.Panel({
   style: {
     position: 'bottom-left',
     padding: '8px 15px'
   }
 });
var  image1=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
var legend = ui.Panel({
   style: {
     position: 'bottom-left',
     padding: '8px 15px'
   }
 });
//Create legend title
 var legendTitle = ui.Label({
   value: 'Classification Legend',
   style: {
     fontWeight: 'bold',
     fontSize: '18px',
     margin: '0 0 4px 0',
     padding: '0'
     }
 });
//Add the title to the panel
 legend.add(legendTitle);
//Create and style 1 row of the legend.
 var makeRow = function(color, name) {
       var colorBox = ui.Label({
         style: {
           backgroundColor: '#' + color,
           padding: '8px',
           margin: '0 0 4px 0'
         }
       });
       var description = ui.Label({
         value: name,
       style: {margin: '0 0 4px 6px'}
       });
       return ui.Panel({
         widgets: [colorBox, description],
         layout: ui.Panel.Layout.Flow('horizontal')
       });
 };
//Identify palette with the legend colors
 var palette =['000044', 'C0C0C0','12660a']; 
//Identify names within the legend
 var names = ['Water','Plastic','Seaweed'];
//Add color and names
 for (var i = 0; i < 3; i++) {
   legend.add(makeRow(palette[i], names[i]));
   }  
//Add legend to map
  Map.add(legend);
 ////******Part 6: Display the Final Land Cover Classification and Provide Export Options******
//////////////////////////////////////////////////////////////////////////////////////////////
//Create palette for the final land cover map classifications
 var urbanPalette = 
 '<RasterSymbolizer>' +
 ' <ColorMap  type="intervals">' +
//     '<ColorMapEntry color="#604a26" quantity="0" label="Land"/>' +
     '<ColorMapEntry color="#000044" quantity="1" label="Water"/>' +
     '<ColorMapEntry color="#C0C0C0" quantity="2" label="Plastic"/>' +
    '<ColorMapEntry color="#12660a" quantity="3" label="Seaweed"/>' +
   '</ColorMap>' +
 '</RasterSymbolizer>';
//var ndviParams = {min: 0, max:0.3, palette: ['blue', 'white', 'green']};
//Map.addLayer(image, ndviParams, 'ndvi',1);
 Map.addLayer(image1.sldStyle(urbanPalette), {}, "Plastic Classification L8",1);
Map.centerObject(geometry,14)
        Map.layers().set(0, image1)
//        Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}))
      }
    });
  //ui.root.add(panel);
// First, we want to count the number of pixels in the entire layer for future reference.
  var button3 = ui.Button({
    label: 'Quantify Plastic ',
    style: date_style,
    onClick: function() {
    Map.onClick(function (coords) {
    var geometry = ee.Geometry.Point(coords.lon, coords.lat);
    var coor=[coords.lon,coords.lat]
    var xd=0.01
var yd=0.01
 var rect = ee.Geometry.Rectangle([coor[0]-xd,coor[1]-yd,coor[0]+xd,coor[1]+yd],null,false);
 print(coor)
print(rect)
Map.addLayer(rect,'','Suspected plastic')
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
var  image2=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
var allpix =  image2.updateMask(image2);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count all pixels in a single class
  geometry: rect,
  //scale: 10,  //sentinel2
 scale: 30,  //landsat8
  maxPixels: 1e10 
  });
//
var allpixels = ee.Number(pixstats.get('classification')); // extract pixel count as a number
print(pixstats)
// Now, we can create a function to derive the extent of one NDVI class
// The arguments are class number (cnr) and class name (name)
var areacount = function(cnr, name,pix) {
 var singleMask =  image2.updateMask(image2.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: rect,
  scale: 30,  //sentinel2
//   scale: 30,  //landsat8
  maxPixels: 1e10
  });
 pix =  ee.Number(stats.get('classification'));
// var area = pix.multiply(100).divide(1000000);      // sentinel2 pixel = 10m x 10m --> 100 sqm
var area = pix.multiply(900).divide(1000000);      // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
//arealist.push({Classe: name, Pixels: pix, Hectares: area, Percentage: perc});
//print('Classe:',names[i], 'pixel=',pix, 'Area(km²)=',area ,'Percentage(%)=', perc);
return pix;
};
// Create a list that contains the NDVI class names (7 classes, ranging from [-0.2, 0, 0.1, 0.2, 0.3, 0.4, 1])
var names2 = ['Land','Water','Plastic','Seaweed'];
// execute function for each class
var area0 = [1,2,3,4];
 panel.widgets().set(15, ui.Label({value:  'Calculation ...', style: date_style2 }))                        
for (var i = 0; i < 4; i++) {
  areacount(i, names2[i])
 var pix=areacount(i, names2[i],pix)
 // area0[i] = pix.multiply(100).divide(1000000);                // sentinel2 pixel = 10m x 10m --> 100 sqm
  area0[i] = pix.multiply(900).divide(1000000);                // LANDSAT8 pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
// print(names2[i], area0[i],'km²')
//  panel.widgets().set(15, ui.Label({value: +names2+ ':', style: date_style }))
//  panel.widgets().set(16, ui.Label({value: +area+ ' km²', style: date_style }))
var area1=area0[0]
var area2=area0[1]
var area3=area0[2]
var area4=area0[3]
  }
//  print(area1,area2,area3,area4)
//var dataTable = [
  //['State', 'Population'],
  //['Land', 100],
  //['Water', 200],
  //['Plastic', 300],
  //['Seaweed', 50],
//];
// Define the chart and print it to the console.
//var chart = ui.Chart(dataTable).setChartType('ColumnChart').setOptions({
//title: 'Surface area',
//legend: {position: 'none'},
//hAxis: {title: 'State', titleTextStyle: {italic: false, bold: true}},
//vAxis: {title: 'Population', titleTextStyle: {italic: false, bold: true}},
//colors: ['1d6b99']
//}); 
// area1.evaluate(function(result){   
  //    panel.widgets().set(16, ui.Label({value: 'Land =' +result+'km²', style: date_style2})) 
    //}) 
 area2.evaluate(function(result){ 
      panel.widgets().set(17, ui.Label({value: 'Water =' +result+ 'km²', style: date_style2})) 
    }) 
 area3.evaluate(function(result){ 
      panel.widgets().set(18, ui.Label({value: 'Plastic  =' +result+'km²', style: date_style2})) 
    })
 area4.evaluate(function(result){ 
      panel.widgets().set(19, ui.Label({value: 'Seaweed =' +result+ 'km²', style: date_style2})) 
    })
}
 )}
    });
}
app()
} else if(choice == 'Sentinel2'){
  //INPUT
//Map.centerObject(AOI, 8) 
//Sentinel 2 
var collection = ee.ImageCollection('COPERNICUS/S2');
//LANDSAT 8 
//var collection = ee.ImageCollection("LANDSAT/LO08/C01/T1_RT");
var start = ee.Image(collection.first()).date().format().getInfo();
Map.style().set('cursor', 'crosshair');
var now = Date.now()
var end = ee.Date(now).format().getInfo();  
var start_date = end
var end_date = end
var s2_data
var geometry
var point 
var list_s2_data
var cloud_cover = 100
var n_files
var selected_image
var addFDI
var addNDVI
var S2_corr
var maskedComposite
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = 1 << 10;
var cirrusBitMask = 1 << 11;
//Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);//.divide(10000);
}
//function maskS2shadow(image) {
 ///var cld = require('users/fitoprincipe/geetools:cloud_masks')
//var mask_shadow = cld.hollstein_S2(['shadow'])(image)
  //return mask_shadow//.divide(10000);
//}
//faunctioh for Atmospheric correction/NDVI FDI CALCULATION/Cloud masking
var imagetreatment = function(s2_data,S2_corr,addNDVI,addFDI,maskedComposite){
// - Apply SIAC and retrieve bottom of atmosphere (BOA) reflectance
var siac = require('users/marcyinfeng/utils:SIAC');
S2_corr = siac.get_sur(s2_data.first()); 
var ndvi = S2_corr.expression(
    '(nir-red)/(nir+red)', {
      'red' : S2_corr.select('B4'), 
     'nir' : S2_corr.select('B8'),
}).rename('NDVI');
 addNDVI=S2_corr.addBands(ndvi);
//print(addNDVI,'NDVI')
//var ndviParams = {min: -1, max:1, palette: ['blue', 'white', 'green']};
//Map.addLayer(ndvi, ndviParams, 'ndvi',0);
// Display the result.
//Map.centerObject(ground_sensor, 12);
// Compute the Floating debris index(FDI).
var fdi = S2_corr.expression(
    'nir-(red2+(SWIR1-red2)*10*((lam_nir-lam_red)/(lam_SWIR1-lam_red)))', {
      'nir' : S2_corr.select('B8'),
     'red2' : S2_corr.select('B6'),
     'SWIR1' : S2_corr.select('B11'),
     'lam_red' : 664.6,
      'lam_nir' : 832.8, 
      'lam_SWIR1': 1613.7
}).rename('FDI');
 addFDI=addNDVI.addBands(fdi);
var point_train=table7.merge(table8).merge(table9).merge(table10)
.merge(table11).merge(table12).merge(table13).merge(table14).merge(table15).merge(table16)
 //using the "random" column. Roughly 80% for training, 20% for testing.
 var split = 0.8;
 var training = point_train.filter(ee.Filter.lt('random', split));
 var testing = point_train.filter(ee.Filter.gte('random', split));
//Print these variables to see how much training and testing data you are using
 //print('Samples n =', point_train.aggregate_count('.all'));
 //print('Training n =', training.aggregate_count('.all'));
// print('Testing n =', testing.aggregate_count('.all'));
//******Part 4: Random Forest Classification and Accuracy Assessments******
//////////////////////////////////////////////////////////////////////////
 var bands = ['B11', 'B2', 'B3', 'B4', 'B6', 'B8','FDI','NDVI'];
//print(addFDI,'FDI')
// fdiParams = {min: 0, max:0.05, palette: ['blue', 'white', 'green']};
//Map.addLayer(fdi, fdiParams, 'FDI image',0);
var classifier1 = ee.Classifier.libsvm({
kernelType: 'RBF',
gamma: 0.5,
cost: 10
});
  var  classifier= classifier1.train({ 
 features: training,
 classProperty: 'Classe',
 inputProperties: bands
 });
//Test the accuracy of the model
////////////////////////////////////////
//Print Confusion Matrix and Overall Accuracy
 var confusionMatrix = classifier.confusionMatrix();
 //print('Confusion matrix: ', confusionMatrix);
 //print('Training Overall Accuracy: ', confusionMatrix.accuracy());
 var kappa = confusionMatrix.kappa();
// print('Training Kappa', kappa);
 //
 var validation = testing.classify(classifier);
 var testAccuracy = validation.errorMatrix('Classe', 'classification');
 //print('Validation Error Matrix RF: ', testAccuracy);
 //print('Validation Overall Accuracy RF: ', testAccuracy.accuracy());
 var kappa1 = testAccuracy.kappa();
 //print('Validation Kappa', kappa1);
//Apply the trained classifier to the image
 var classified = addFDI.select(bands).classify(classifier);
//print(classified,'classified')
// Load or import the Hansen et al. forest change dataset.
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
// Select the land/water mask.
var datamask = hansenImage.select('datamask');
// Create a binary mask.
var mask = datamask.eq(2);
// Update the composite mask with the water mask.
 maskedComposite = classified.updateMask(mask);
//Map.addLayer(maskedComposite, visParams, 'masked'); 
return  maskedComposite; 
}
var app = function(){
  var get_fileame = function(image){
    return image.get('PRODUCT_ID')
  }
  var date_style = {fontSize: '12px', 
                      color: '#000000',
                      fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
  var date_style2 = {fontSize: '10px', 
                      color: '#000000',
                      fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }   
 var date_slider_style = { 
    width: '80%',
    height: '120px',
    stretch: 'both',
    padding: '10px',
    fontFamily : 'serif',
      backgroundColor:'#95B9C7',
  }
  var slider_style = {
    width: '90%', 
    height: '80px',
    stretch: 'both',
    padding: '10px', 
    fontFamily : 'serif',
      backgroundColor:'#95B9C7',
  }
  var location_style = {fontSize: '12px', 
                      color: '#FF0000',
                      fontWeight: 'bold',
                      fontFamily : 'DM Serif Display',
                      textAlign: 'left',
                      stretch: 'both',
                      backgroundColor:'#95B9C7',
  }
   // AOI setting
  Map.onClick(function(coords) {
    geometry = ee.Geometry.Point(coords.lon, coords.lat);
    var location = 'longitude: ' + coords.lon.toFixed(2) + ' ' +
                   'latitude: ' + coords.lat.toFixed(2);
   var point = ui.Map.Layer(ee.Geometry.Point(geometry), {color: 'FF0000'})
 Map.remove(point)
    point = ui.Map.Layer(geometry, {color: 'FF0000'})
    Map.layers().set(0, point);
    panel.widgets().set(0, ui.Label(location, location_style))
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
                            .map(maskS2clouds)
//                            .map(maskS2shadow)
    list_s2_data = s2_data.toList(5000, 0)
  });
 // Date range start slider
  var dateSlider_start = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              start_date = ee.Algorithms.If(this_range, this_range.start(), start)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
                                     .map(maskS2clouds)
//                                      .map(maskS2shadow)
              list_s2_data = s2_data.toList(5000, 0)
              },
    style: date_slider_style
  });
// Date range end slider
  var dateSlider_end = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              end_date = ee.Algorithms.If(this_range, this_range.end(), end)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
                                      .map(maskS2clouds)
//                                       .map(maskS2shadow)
              list_s2_data = s2_data.toList(5000, 0)
            },
    style: date_slider_style
  });
  // cloud cover slider
  var slider = ui.Slider({min:0, max:100, step : 1, value: 100, style: slider_style});
  slider.onChange(function(value) {
    cloud_cover = value
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
                           .map(maskS2clouds)
//                            .map(maskS2shadow)
    list_s2_data = s2_data.toList(5000, 0)
  });
  panel.widgets().set(2, ui.Label('Start date: ', date_style))
  panel.widgets().set(3, dateSlider_start.setValue(now));
  panel.widgets().set(4, ui.Label('End date: ', date_style));
  panel.widgets().set(5, dateSlider_end.setValue(now));
  panel.widgets().set(6, ui.Label('Cloud cover percentage: ', date_style));
  panel.widgets().set(7, slider)
   //ui.root.add(panel);
 var button1 = ui.Button({
    label: 'Search',
//    style: {fontFamily : 'serif'},
     style: date_style,
    onClick: function() {
   panel.remove(panel.widgets().get(9))
    panel.remove(panel.widgets().get(10))
    panel.remove(panel.widgets().get(11))
    panel.remove(panel.widgets().get(12))
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
    n_files = list_s2_data.size()
    n_files.evaluate(function(result){
      panel.widgets().set(9, ui.Label({value: + result +  ' Satellite images are found!', 
                                       //style:{fontFamily : 'serif',}
                                      style: date_style
      })) 
    }) 
    var fnames = s2_data.aggregate_array('PRODUCT_ID')
    fnames.evaluate(function(result){
        panel.widgets().set(10, ui.Label('Results: ',date_style));
        panel.widgets().set(11, ui.Label(result.join('\n'),date_style))
      })
    fnames.evaluate(function(result){  
    var select = ui.Select({
        items: result,
        onChange: function(key) {
        var image = ee.Image(s2_data.filterMetadata('PRODUCT_ID', 'equals', key).first())
///        var  image=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
        selected_image = image
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(image, rgbVis, 'Image_satellite_S2');                              
        Map.centerObject(geometry,14)
       Map.layers().set(0, image)
//        Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}))
      }})
      select.setPlaceholder('Display satellite image',date_style)
      panel.widgets().set(12, select);
      panel.widgets().set(13, button2);
      panel.widgets().set(14, button3);
      // panel.widgets().set(14, button4);
    })
    }});
  panel.widgets().set(8, button1);
var legend
  var button2 = ui.Button({
    label: 'Detect plastic',
    style: date_style,
    onClick: function() {
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
    var legend = ui.Panel({
   style: {
     position: 'bottom-left',
     padding: '8px 15px'
   }
 });
var  image1=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
var legend = ui.Panel({
   style: {
     position: 'bottom-left',
     padding: '8px 15px'
   }
 });
//Create legend title
 var legendTitle = ui.Label({
   value: 'Classification Legend',
   style: {
     fontWeight: 'bold',
     fontSize: '18px',
     margin: '0 0 4px 0',
     padding: '0'
     }
 });
//Add the title to the panel
 legend.add(legendTitle);
//Create and style 1 row of the legend.
 var makeRow = function(color, name) {
       var colorBox = ui.Label({
         style: {
           backgroundColor: '#' + color,
           padding: '8px',
           margin: '0 0 4px 0'
         }
       });
       var description = ui.Label({
         value: name,
       style: {margin: '0 0 4px 6px'}
       });
       return ui.Panel({
         widgets: [colorBox, description],
         layout: ui.Panel.Layout.Flow('horizontal')
       });
 };
//Identify palette with the legend colors
 var palette =['000044', 'C0C0C0','12660a']; 
//Identify names within the legend
 var names = ['Water','Plastic','Seaweed'];
//Add color and names
 for (var i = 0; i < 3; i++) {
   legend.add(makeRow(palette[i], names[i]));
   }  
//Add legend to map
  Map.add(legend);
 ////******Part 6: Display the Final Land Cover Classification and Provide Export Options******
//////////////////////////////////////////////////////////////////////////////////////////////
//Create palette for the final land cover map classifications
 var urbanPalette = 
 '<RasterSymbolizer>' +
 ' <ColorMap  type="intervals">' +
//     '<ColorMapEntry color="#604a26" quantity="0" label="Land"/>' +
     '<ColorMapEntry color="#000044" quantity="1" label="Water"/>' +
     '<ColorMapEntry color="#C0C0C0" quantity="2" label="Plastic"/>' +
    '<ColorMapEntry color="#12660a" quantity="3" label="Seaweed"/>' +
   '</ColorMap>' +
 '</RasterSymbolizer>';
//var ndviParams = {min: 0, max:0.3, palette: ['blue', 'white', 'green']};
//Map.addLayer(image, ndviParams, 'ndvi',1);
 Map.addLayer(image1.sldStyle(urbanPalette), {}, "Plastic Classification S2",1);
Map.centerObject(geometry,14)
        Map.layers().set(0, image1)
//        Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}))
      }
    });
  //ui.root.add(panel);
// First, we want to count the number of pixels in the entire layer for future reference.
  var button3 = ui.Button({
    label: 'Quantify Plastic ',
    style: date_style,
    onClick: function() {
    Map.onClick(function (coords) {
    var geometry = ee.Geometry.Point(coords.lon, coords.lat);
    var coor=[coords.lon,coords.lat]
    var xd=0.01
var yd=0.01
 var rect = ee.Geometry.Rectangle([coor[0]-xd,coor[1]-yd,coor[0]+xd,coor[1]+yd],null,false);
 print(coor)
print(rect)
Map.addLayer(rect,'','Suspected plastic')
    panel.remove(panel.widgets().get(15))
    panel.remove(panel.widgets().get(16))
    panel.remove(panel.widgets().get(17))
    panel.remove(panel.widgets().get(18))
    panel.remove(panel.widgets().get(19))
var  image2=imagetreatment(s2_data,S2_corr,addNDVI,addFDI,maskedComposite)
var allpix =  image2.updateMask(image2);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count all pixels in a single class
  geometry: rect,
  scale: 10,  //sentinel2
//   scale: 30,  //landsat8
  maxPixels: 1e10 
  });
//
var allpixels = ee.Number(pixstats.get('classification')); // extract pixel count as a number
print(allpixels)
// Now, we can create a function to derive the extent of one NDVI class
// The arguments are class number (cnr) and class name (name)
var areacount = function(cnr, name,pix) {
 var singleMask =  image2.updateMask(image2.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: rect,
  scale: 10,  //sentinel2
//   scale: 30,  //landsat8
  maxPixels: 1e10
  });
 pix =  ee.Number(stats.get('classification'));
 var area = pix.multiply(100).divide(1000000);      // sentinel2 pixel = 10m x 10m --> 100 sqm
//var area = pix.multiply(100).divide(1000000);      // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
//arealist.push({Classe: name, Pixels: pix, Hectares: area, Percentage: perc});
//print('Classe:',names[i], 'pixel=',pix, 'Area(km²)=',area ,'Percentage(%)=', perc);
return pix;
};
// Create a list that contains the NDVI class names (7 classes, ranging from [-0.2, 0, 0.1, 0.2, 0.3, 0.4, 1])
var names2 = ['Land','Water','Plastic','Seaweed']; 
// execute function for each class
var area0 = [1,2,3,4];
 panel.widgets().set(15, ui.Label({value:  'Calculation ...', style: date_style2 }))                        
for (var i = 0; i < 4; i++) {
  areacount(i, names2[i])
 var pix=areacount(i, names2[i],pix)
  area0[i] = pix.multiply(100).divide(1000000);                // sentinel2 pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
// print(names2[i], area0[i],'km²')
//  panel.widgets().set(15, ui.Label({value: +names2+ ':', style: date_style }))
//  panel.widgets().set(16, ui.Label({value: +area+ ' km²', style: date_style }))
var area1=area0[0]
var area2=area0[1]
var area3=area0[2]
var area4=area0[3]
  }
 //area1.evaluate(function(result){ 
   // panel.widgets().set(16, ui.Label({value: 'Land =' +result+'km²', style: date_style2})) 
//}) 
 area2.evaluate(function(result){ 
      panel.widgets().set(17, ui.Label({value: 'Water =' +result+ 'km²', style: date_style2})) 
    }) 
 area3.evaluate(function(result){ 
      panel.widgets().set(18, ui.Label({value: 'Plastic  =' +result+'km²', style: date_style2})) 
    })
 area4.evaluate(function(result){  
      panel.widgets().set(19, ui.Label({value: 'Seaweed =' +result+ 'km²', style: date_style2})) 
    })
}
 )} 
    });
} 
app()
}
        }}) 
      select.setPlaceholder('Choose the satellite',select_style)
       panel.widgets().set(1, select);