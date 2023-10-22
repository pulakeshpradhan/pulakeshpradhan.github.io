//######################################################################################################## 
//#                         ESCUELA POLITÉCNIA NACIONAL                                                #\\
//#                 FACULTAD DE INGENIERÍA CIVIL Y AMBIENTAL                                           #\\
//#                                 PIJ 17 - 05                                                        #\\
//########################################################################################################
// CREATION DATE: 05/01/2019
// AUTHOR: DAVID CARCHIPULLA | cmorales.david@outlook.com
//         Environmental Engineering Thesis
//LAST UPDATE: 30/06/2020
//####################################################################################
//########### DEFINE UI COMPONENTS ###################################################
//####################################################################################
// SET UP PRIMARY PANELS
// control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
// plot panel
var plotsPanelLabel = ui.Label('LandTrendr Time Series Plots', {fontWeight: 'bold', stretch: 'horizontal'});
var plotPanel = ui.Panel(null, null, {stretch: 'horizontal'});
var plotPanelParent = ui.Panel([plotsPanelLabel, plotPanel], null, {width: '480px'});
// map panel
var map = ui.Map();
map.setOptions('HYBRID');
var processingLabel = ui.Label('Processing, please wait...', {shown:false, position: 'top-center'});
map.add(processingLabel);
// params panel
var runParams = [
  {label: 'Number of wet season images:', value: 23},
  {label: 'Number of drought season images:', value: 85},
  {label: 'Wet season sampling areas:', value: 'Drainage, roads, and wells'},
  {label: 'Drought season sampling areas:', value: 'Roads, and wells'},
  {label: 'Speckle filter:', value: 'Focal median ≈ 30 meters'},
  {label: 'Supervised Classification variables:', value:'Angle, day of the year, DEM, slope, VH,and VV '},
  {label: 'Number of decision trees:', value: 100},
];
var paramBoxes = [];
var paramPanels = [ui.Label('Parameters',{fontWeight: 'bold'})];
runParams.forEach(function(param, index){
  var paramLabel = ui.Label(param.label,{fontWeight: 'bold'});
  var paramBox = ui.Label({value:param.value});
  paramBox.style().set('stretch', 'horizontal');
  var paramPanel = ui.Panel([paramLabel,paramBox], ui.Panel.Layout.Flow('horizontal'));
  paramBoxes.push(paramBox);
  paramPanels.push(paramPanel);
});
var paramPanel = ui.Panel(paramPanels,null,{stretch: 'horizontal'});
////////////// Importing Shapefiles
var AOI = ee.FeatureCollection("users/PIJ-17-05/wetland_bff_500m"); //AVAILABLE SHAPES
var drain = ee.FeatureCollection("users/PIJ-17-05/drain_bff10m"); //AVAILABLE SHAPES
var wells = ee.FeatureCollection('users/PIJ-17-05/wells_bff10m');
var roads = ee.FeatureCollection('users/PIJ-17-05/roads_w');//AVAILABLE SHAPES
var dem = ee.Image("users/PIJ-17-05/dem_antisana");//AVAILABLE TIFF
var slp = ee.Image("users/PIJ-17-05/slp_antisana");
var hp = ee.FeatureCollection('users/PIJ-17-05/Humedal_Pugllohuma7');
var aguas_abiertas = ee.FeatureCollection('users/PIJ-17-05/aguas_abiertas');
////////////// Load Sentinel-1 SAR collection 
//and filter according to data collection type
var image = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(AOI)
  .filterDate('2017-01-01','2019-12-31')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filterMetadata('resolution_meters', 'equals' , 10);
// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV'); //select the VV polarization band
  var vh = img.select('VH');
  var vv_smoothed = vv.focal_median(30,'circle','meters'); //Apply a focal median filter
  var vh_smoothed = vh.focal_median(30,'circle','meters'); //Apply a focal median filter
  var smoothed = ee.Image.cat(vv_smoothed, vh_smoothed)
    .rename(['VV_S', 'VH_S']);
  return img.addBands(smoothed); // Add filtered VV band to original image
};
image=image.map(filterSpeckles);
print(image);
////////////// Adding Polarimetric Indexes
// Function to compute and add day of the year; slope; and elevation data
// Also, Images are being clipped
var addindexes = function(ima) {
  var doy = ima.date().getRelative('day', 'year');
  var doyBand = ee.Image.constant(doy).uint16().rename('doy');
  var recipe = ee.Image.cat(doyBand,dem,slp)
    .rename(['DOY','DEM','slp']);
  return ima.addBands(recipe).clip(AOI);
};
// Add index bands to image collection
var image_2 = image.map(addindexes);
// Reshaped sample is imported to GEE
var ClassSample = ee.FeatureCollection("users/PIJ-17-05/ClassSample");
// Needed variables are stablished
var bands = ['DEM','DOY','VH_S','VV_S','angle','slp'];
// Classifier is trained
// 800 decision trees are needed
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: ClassSample,
  classProperty: 'landcover',
  inputProperties: bands // Not all variables are needed, 
  });                    // Just those included in bands
print(classifier);
// Classification is implemented in image_2
// image_2 includes all images provided by GEE
// and it already has computed polarimetric indexes
var rfModel = function(classifying) {
  var classified = classifying.select(bands).classify(classifier);
  return classifying.addBands(classified);
};
var classifiedD = image_2.map(rfModel);
print(classifiedD);
// Classes are selected and added to the image as new bands
// It is needed to visualiza spatial classification
var add_class = function(img) {
  var class_band = img.select('classification');
  var ss = class_band.eq(10);    //Identify classified pixels 
  var ws = class_band.eq(11);  // and set them equal to 1. 
  var ds = class_band.eq(12);     // All other pixels set to 0
  ss = ss.updateMask(ss);        //Remove all pixels equal to 0
  ws = ws.updateMask(ws);  //Remove all pixels equal to 0
  ds = ds.updateMask(ds);           //Remove all pixels equal to 0
  var class_bands = ee.Image.cat(ss, ws, ds)
    .rename(['Saturated','Wet','Dry']);
  return img.addBands(class_bands);  
};                    
//Map classification across sentinel-1 collection and print to console to inspect
classifiedD = classifiedD.map(add_class);
////////////// Load Sentinel-2 image collection, 
//filter according to data collection type, and apply cloud mask
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var QA = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var clouds = QA.bitwiseAnd(Math.pow(2, 10)).eq(0);
  var cirrus = QA.bitwiseAnd(Math.pow(2, 11)).eq(0);
  return image.updateMask(clouds).updateMask(cirrus);
}
//Load Sentinel-2 collection and filter according to data collection type
var s2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(hp)
  .filterDate('2017-01-01','2019-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',20)
  .map(maskS2clouds);
// Function to compute and add NDVI, as well as, NDWI
var MSindexes = function(ima) {
  var NDVI=ima.normalizedDifference(['B8', 'B4']);
  var NDWI=ima.normalizedDifference(['B8', 'B11']);
  var indexes= ee.Image.cat(NDVI, NDWI)
    .rename(['NDVI','NDWI']);
  return ima.addBands(indexes.clip(AOI));
};
// Add index bands to image collection
s2 = s2.map(MSindexes);
print(s2);
//////////////Make time series of pixels within region
var Class_11_Chart = ui.Chart.image.series({
  imageCollection: classifiedD.select('Wet'),
  region: AOI,
  reducer: ee.Reducer.sum(),
  scale:100
})
  .setOptions({
      title: 'Wet soil pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Ha of wet soil'},
      lineWidth: 2,
      series: {
        0: {color: '#70dcbe'} // wet soil
        }
    });
//Set the postion of the chart and add it to the map    
Class_11_Chart.style().set({
    position: 'bottom-center',
    width: '500px', 
    height: '300px'    
  });
var Class_10_Chart = ui.Chart.image.series({
  imageCollection: classifiedD.select('Saturated'),
  region: AOI,
  reducer: ee.Reducer.sum(),
  scale:100
})
  .setOptions({
      title: 'Saturated soil pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Ha of saturated soil'},
      lineWidth: 2,
      series: {
        0: {color: '#2007ab'} // saturated soil
      } 
    });
//Set the postion of the chart and add it to the map    
Class_10_Chart.style().set({
    position: 'bottom-left',
    width: '500px',
    height: '300px'
  });  
var Class_12_Chart = ui.Chart.image.series({
  imageCollection: classifiedD.select('Dry'),
  region: AOI,
  reducer: ee.Reducer.sum(),
  scale:100
})
  .setOptions({
      title: 'Dry soil pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Ha of dry soil'},
      lineWidth: 2,
      series: {
        0: {color: '#38ad1b'} // dry soil
        }
    });
//Set the postion of the chart and add it to the map    
Class_12_Chart.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
// Create a label on the map.
var label = ui.Label({
  value: 'Click a point on the chart to show the image for that date.',
  style: {position: 'bottom-center'}
});
map.add(label);
//Create callback function that adds image to the map coresponding with clicked data point on chart
Class_11_Chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data 
    var rfClass = ee.Image(classifiedD.filter(equalDate)
                    .first()).select('classification'); 
    var ic = s2.map(function(image){
    return image.set(
    'dateDist',
    ee.Number(image.get('system:time_start')).subtract(rfClass
    .get('system:time_start')).abs()
      );
    });
    ic = ic.sort('dateDist');
    var S2NDVI = ee.Image(ic.first()).select('NDVI');
    var S2NDWI = ee.Image(ic.first()).select('NDWI');
    //Make map layer based on SAR image, reset the map layers, 
    // and add this new layer
    var S1Layer = ui.Map.Layer(rfClass, {
      max: 12,
      min: 10,
      palette: ['#2007ab','#70dcbe','#38ad1b']
    },'SAR Classification');
    map.layers().reset([S1Layer]);
    var waterPalette = ['red', 'yellow', 'green', 'blue'];
    map.addLayer(S2NDWI, {min: -1, max: 1, palette: waterPalette}, 
    'NDWI');
    var vegetationPalette = ['blue', 'white', 'green'];
    map.addLayer(S2NDVI, {min: -1, max: 1, palette: vegetationPalette}, 
    'NDVI');
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
//Map aguas_abiertas
//map.addLayer(aguas_abiertas, {color: 'white'} , 'Aguas abiertas');
map.addLayer(hp, {}, 'Humedal Pugllohuma');  
  });
Class_10_Chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data 
    var rfClass = ee.Image(classifiedD.filter(equalDate)
                    .first()).select('classification'); 
    var ic = s2.map(function(image){
    return image.set(
    'dateDist',
    ee.Number(image.get('system:time_start')).subtract(rfClass
    .get('system:time_start')).abs()
      );
    });
    ic = ic.sort('dateDist');
    var S2NDVI = ee.Image(ic.first()).select('NDVI');
    var S2NDWI = ee.Image(ic.first()).select('NDWI');
    //Make map layer based on SAR image, reset the map layers, 
    // and add this new layer
    var S1Layer = ui.Map.Layer(rfClass, {
      max: 12,
      min: 10,
      palette: ['#2007ab','#70dcbe','#38ad1b']
    },'SAR Classification');
    map.layers().reset([S1Layer]);
    var waterPalette = ['red', 'yellow', 'green', 'blue'];
    map.addLayer(S2NDWI, {min: -1, max: 1, palette: waterPalette}, 
    'NDWI');
    var vegetationPalette = ['blue', 'white', 'green'];
    map.addLayer(S2NDVI, {min: -1, max: 1, palette: vegetationPalette}, 
    'NDVI');
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
//Map aguas_abiertas
//map.addLayer(aguas_abiertas, {color: 'white'} , 'Aguas abiertas');
map.addLayer(hp, {}, 'Humedal Pugllohuma');  
  });
Class_12_Chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data 
    var rfClass = ee.Image(classifiedD.filter(equalDate)
                    .first()).select('classification'); 
    var ic = s2.map(function(image){
    return image.set(
    'dateDist',
    ee.Number(image.get('system:time_start')).subtract(rfClass
    .get('system:time_start')).abs()
      );
    });
    ic = ic.sort('dateDist');
    var S2NDVI = ee.Image(ic.first()).select('NDVI');
    var S2NDWI = ee.Image(ic.first()).select('NDWI');
    //Make map layer based on SAR image, reset the map layers, 
    // and add this new layer
    var S1Layer = ui.Map.Layer(rfClass, {
      max: 12,
      min: 10,
      palette: ['#2007ab','#70dcbe','#38ad1b']
    },'SAR Classification');
    map.layers().reset([S1Layer]);
    var waterPalette = ['red', 'yellow', 'green', 'blue'];
    map.addLayer(S2NDWI, {min: -1, max: 1, palette: waterPalette}, 
    'NDWI');
    var vegetationPalette = ['blue', 'white', 'green'];
    map.addLayer(S2NDVI, {min: -1, max: 1, palette: vegetationPalette}, 
    'NDVI');
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
//Map aguas_abiertas
//map.addLayer(aguas_abiertas, {color: 'white'} , 'Aguas abiertas');
map.addLayer(hp, {}, 'Humedal Pugllohuma');  
  });
/////ADDING A LEGEND FOR BOTH NDVI AND NDWI
// set position of panel
var NDVIlegend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '8px 15px'
  }
});
var NDWIlegend = ui.Panel({
  style: {
    position: 'middle-left',
    padding: '8px 15px'
  }
});
// Create legend title
var NDVIlegendTitle = ui.Label({
  value: 'NDVI LEGEND',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var NDWIlegendTitle = ui.Label({
  value: 'NDWI LEGEND',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
NDVIlegend.add(NDVIlegendTitle);
NDWIlegend.add(NDWIlegendTitle);
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
//  Palette with the colors
var NDVIpalette =['1500ff','FFFFFF','22ff00'];
var NDWIpalette =['FF0000', 'f4c20d', '22ff00', '1500ff'];
// name of the legend
var NDVInames = ['Vegetation free region',
    'Bush and meadow vegetation',
    'Forests of temperate climate and tropical rainforests'];
var NDWInames = ['Low humidity','Slight humidity','Flooded Vegetation','Water'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  NDVIlegend.add(makeRow(NDVIpalette[i], NDVInames[i]));
  }  
for (var j = 0; j < 4; j++) {
  NDWIlegend.add(makeRow(NDWIpalette[j], NDWInames[j]));
  }  
// Create a confusion matrix representing resubstitution accuracy.
print('RF error matrix: ', classifier.confusionMatrix());
print('RF accuracy: ', classifier.confusionMatrix().accuracy());
//Map AOI and Zoom area
//map.addLayer(AOI, {}, 'AOI');
map.centerObject(AOI, 15.3); //Specify the zoom magnitude
//Map Pozos
map.addLayer(wells, {color: 'white'} , 'Pozos');
//Drenaje
map.addLayer(drain, {color: '#2fced6'} , 'Drenaje');
//Carretera
map.addLayer(roads, {color: '#999900'} , 'Carretera');
//####################################################################################
//########### ADD PANELS TO INTERFACE ################################################
//####################################################################################
controlPanel.add(NDVIlegend);
controlPanel.add(NDWIlegend);
controlPanel.add(paramPanel);
plotPanelParent.add(Class_10_Chart);
plotPanelParent.add(Class_11_Chart);
plotPanelParent.add(Class_12_Chart);
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);
ui.root.add(plotPanelParent);