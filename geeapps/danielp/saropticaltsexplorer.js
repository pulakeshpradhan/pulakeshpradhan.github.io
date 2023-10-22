var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                14.88249655255113,
                50.28512161854381
              ],
              [
                14.885200219238142,
                50.28377794538418
              ],
              [
                14.888118462646345,
                50.285011932360895
              ],
              [
                14.884620862090925,
                50.28656122626226
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Polygon(
        [[[14.88249655255113, 50.28512161854381],
          [14.885200219238142, 50.28377794538418],
          [14.888118462646345, 50.285011932360895],
          [14.884620862090925, 50.28656122626226]]]);
/*
Author: Daniel Paluba
email: palubad@natur.cuni.cz
(For more info contact me via email: palubad@natur.cuni.cz
  or on LinkedIn: https://www.linkedin.com/in/daniel-paluba/)
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
THE PUBLICATION WILL BE ADDED. FOLLOW THE GITHUB REPOSITORY OF THE APP:
###########################################################################################################################################################################
*/
// Set map center
Map.setCenter(14.8,49.8,10);
var map = ui.Map();
// Replace the default Map with the newly created map.
// ui.root.widgets().reset([map]);
// App title
var header = ui.Label('SAR & Optical Time Series Explorer', {fontSize: '23px', fontWeight: 'bold', color: '77797e'});
// // App summary1
// var text1 = ui.Label(
//   'Set the input parateres above and click on any area on the map.',
//     {fontSize: '15px'});
// App summary2
var text2 = ui.Label(
  "This application enables to explore SAR and optical time series at any point or polygon on the Earth's surface using Copernicus Sentinel-2 a Sentinel-1 data. It was developed especially for the ESA-NASA Trans-Atlantic Training 2023. Developed by Daniel Paluba",
    {fontSize: '12px'});
// Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text2],//Adds header and text
  style:{width: '550px',position:'middle-right', padding: '10px'}});
// Create variable for additional text and separators
// // This creates another panel to house a line separator and instructions for the user
// var intro = ui.Panel([
//   ui.Label({
//     value: '__________________________________________________________',
//     style: {fontWeight: 'bold',  color: '77797e'},
//   })]);
// Add panel to the larger panel 
// panel.add(intro)
// Add main panel to the root of GUI
ui.root.insert(1,panel)
var symbol = {
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label({value:'Select a drawing mode and draw your geometry.', style: {fontSize: '14px', margin: '10px 5px'}}),
    ui.Panel([ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'vertical',position: 'top-right', textAlign: 'center'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'vertical',position: 'top-right', textAlign: 'center'}
    })],ui.Panel.Layout.flow('horizontal'), {position: 'top-right', textAlign: 'center' })
  ],
  style: {position: 'top-center'},
  layout: null,
});
panel.add(controlPanel);
// Defining startDate and endDate in the UI
var dateLabel = ui.Label({
    value:'Select start and end dates for time series generation.',
    style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
  })
var startLabel = ui.Label({
    value:'Start date',
    style: {margin: '0 55px 0 10px',fontSize: '12px',color: 'gray'}
  })
var endLabel = ui.Label({
    value:'End date',
    style: {margin: '0 0px 0 10px',fontSize: '12px',color: 'gray'}
  })
var startDate_selected = ui.Textbox({placeholder: 'Start Date',  value: '2020-01-01',
  style: {width: '100px'}});
var endDate_selected = ui.Textbox({placeholder: 'End Date',  value: '2022-12-31',
  style: {width: '100px'}});
var index_label = ui.Label('Select optical vegetation indices',
  {fontWeight: 'bold', fontSize: '14px', margin:'5px 0px 0px 8px'});
var index_label_SAR = ui.Label('Select SAR polarimetric indices',
  {fontWeight: 'bold', fontSize: '14px', margin:'5px 0px 0px 8px'});
var cloudSliderLabel = ui.Label('Set the maximum cloud coverage for Sentinel-2 images (in %)',
  {fontWeight: 'bold', fontSize: '14px', margin:'5px 0px 0px 8px'});
// var bufferLabel = ui.Label('Set the buffer around points for TS extraction',
//   {fontWeight: 'bold', fontSize: '14px', margin:'5px 0px 0px 8px'});
// Define checkboxes
var selectNDVI = ui.Checkbox({
  label:'NDVI',
  value: true
});
var selectEVI = ui.Checkbox({
  label:'EVI',
  value: true
});
var selectNDMI = ui.Checkbox({
  label:'NDMI',
  value: true
});
var selectNDWI = ui.Checkbox({
  label:'NDWI',
  value: true
});
var selectNBR = ui.Checkbox({
  label:'NBR',
  value: true
});
// Define checkboxes
var selectRVI = ui.Checkbox({
  label:'RVI',
  value: true
});
var selectRFDI = ui.Checkbox({
  label:'RFDI',
  value: true
});
// var selectDPSVI = ui.Checkbox({
//   label:'DPSVI',
//   value: false
// });
var selectVH_VV = ui.Checkbox({
  label:'VH/VV',
  value: false
});
// Add a slider bar widget
var cloudSlider = ui.Slider({min:0,max:100, style:{width:'200px'}}).setValue(30);
// var bufferSize = ui.Textbox({placeholder: 'Buffer size',
//   style: {width: '100px'}}).setValue('50');
// The START of the code adopted from a GEE tutorial "Interactive Region Reduction App"
// URL https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// developed by Justin Braaten https://github.com/jdbcode
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
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
drawingTools.onDraw(ui.util.debounce(generateCharts, 500));
drawingTools.onDraw(ui.util.debounce(generateCharts, 500));
// The END of the parts adopted from a GEE tutorial "Interactive Region Reduction App"
// URL https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// developed by Justin Braaten https://github.com/jdbcode
// The END of the code adopted from a GEE tutorial "Interactive Region Reduction App"
// URL https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// developed by Justin Braaten https://github.com/jdbcode
panel
  .add(dateLabel)
  .add((ui.Panel([startLabel, endLabel],ui.Panel.Layout.flow('horizontal'))))
  .add((ui.Panel([startDate_selected, endDate_selected],ui.Panel.Layout.flow('horizontal'))))
  .add(index_label)
  .add((ui.Panel([selectNDVI, selectEVI, selectNDMI,selectNDWI, selectNBR],ui.Panel.Layout.flow('horizontal'))))
  .add(index_label_SAR)
  .add((ui.Panel([selectRVI,selectRFDI,selectVH_VV],ui.Panel.Layout.flow('horizontal'))))
  .add(cloudSliderLabel)
  .add(cloudSlider);
  // .add(bufferLabel)
  // .add(bufferSize);
// ========================================================================================
// ======================= CREATE TIME SERIES CHARTS FOR THE APP  =========================
// ========================================================================================
// Map.style().set('cursor', 'crosshair');
// Create the title label.
// var title = ui.Label('Click to generate time series graphs');
// title.style().set('position', 'top-center');
// Map.add(title);
// Create a panel to hold the chart.
var panel2 = ui.Panel();
panel2.style().set({
  width: '500px',
  position: 'bottom-right'
});
panel.add(panel2);
// Register a function to draw a chart when a user clicks on the map.
// Map.style().set('cursor', 'crosshair');
function generateCharts () {
  // reset the Layer list
  Map.layers().reset();
  // reset the Time series panel
  panel2.clear();
  var point = drawingTools.layers().get(0).toGeometry();
  var centroidCoords = point.centroid().coordinates();
  var coordinatesLabel = ui.Label({
    value:'Coordinates of the centroid of the selected area/point:',
    style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
  });
  var coordinatesValues = ui.Label({
    value: centroidCoords.getInfo(),
    style: {fontSize: '14px', margin: '3px 10px 10px 5 px'}
  }); 
  panel2.add(coordinatesLabel)
  panel2.add(coordinatesValues)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  // var mapScale = Map.getScale();
  var scale = 10;
  // Map.centerObject(point,16);
// Define the input parameters
var startDate = startDate_selected.getValue(),
    endDate = endDate_selected.getValue(),
    cloud_cover = ee.Number(cloudSlider.getValue());
    // buffer = ee.Number(ee.Number.parse(bufferSize.getValue()));
// set the maximum threshold for single image cloud coverage
var max_clouds = cloud_cover;
// create empty lists to add the indices selected from the ckeckboxes
var listOfOpticalVIs = [];
var listOfSARfeatures = [];
// conditions based on checkboxes
if (selectNDVI.getValue() == true) {
  listOfOpticalVIs = ee.List(listOfOpticalVIs).add(selectNDVI.getLabel());
} else {
  listOfOpticalVIs = listOfOpticalVIs;
}
if (selectEVI.getValue() == true) {
  listOfOpticalVIs = ee.List(listOfOpticalVIs).add(selectEVI.getLabel());
} else {
  listOfOpticalVIs = listOfOpticalVIs;
}
if (selectNDMI.getValue() == true) {
  listOfOpticalVIs = ee.List(listOfOpticalVIs).add(selectNDMI.getLabel());
} else {
  listOfOpticalVIs = listOfOpticalVIs;
}
if (selectNDWI.getValue() == true) {
  listOfOpticalVIs = ee.List(listOfOpticalVIs).add(selectNDWI.getLabel());
} else {
  listOfOpticalVIs = listOfOpticalVIs;
}
if (selectNBR.getValue() == true) {
  listOfOpticalVIs = ee.List(listOfOpticalVIs).add(selectNBR.getLabel());
} else {
  listOfOpticalVIs = listOfOpticalVIs;
}
print(listOfOpticalVIs)
if (selectRVI.getValue() == true) {
  listOfSARfeatures = ee.List(listOfSARfeatures).add(selectRVI.getLabel());
} else {
  listOfSARfeatures = listOfSARfeatures;
}
if (selectRFDI.getValue() == true) {
  listOfSARfeatures = ee.List(listOfSARfeatures).add(selectRFDI.getLabel());
} else {
  listOfSARfeatures = listOfSARfeatures;
}
// if (selectDPSVI.getValue() == true) {
//   listOfSARfeatures = ee.List(listOfSARfeatures).add(selectDPSVI.getLabel());
// } else {
//   listOfSARfeatures = listOfSARfeatures;
// }
if (selectVH_VV.getValue() == true) {
  listOfSARfeatures = ee.List(listOfSARfeatures).add(selectVH_VV.getLabel());
} else {
  listOfSARfeatures = listOfSARfeatures;
}
// Add Sentinel-2 data
var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
          .filterBounds(point)
          .filterDate(startDate, endDate)
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',max_clouds));
print('Original S-2 collection size:', S2.size());
var leastCloudyS2 = S2.sort('CLOUDY_PIXEL_PERCENTAGE').first();
Map.addLayer(leastCloudyS2, {bands:['B4','B3','B2'], min: 0, max: 3000}, 'The least cloudy Sentinel-2 image',0);
// Add Sentinel-1 data
var S1Collection = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
                  .filterBounds(point)
                  .filterDate(startDate, endDate)
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
                  // .filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
                  // .filter(ee.Filter.lt('relativeOrbitNumber_start',146));
print('S-1 collection size:', S1Collection.size());
print('Least cloudy S2 image',ee.Date(leastCloudyS2.get('system:time_start')));
// Add Local Incidence Angle (LIA) from Copernicus DEM
// call the addLIA function 
var addLIA = require('users/danielp/functions:addLIA');
S1Collection = addLIA.addLIA(S1Collection,point.buffer(30000).bounds());
print(S1Collection.limit(10))
var S2date = ee.Date(leastCloudyS2.get('system:time_start'));
Map.addLayer(ee.Image(powerToDb(S1Collection.filterDate(S2date,S2date.advance(30,'day')).first())), 
                    {bands:['VH'], min: -25, max: 5}, 
                    'The closest Sentinel-1 image',0);
// Add the point
// Map.addLayer(point,{'color':'red'}, 'Selected point');
// Function to add optical vegetation indices (VI)
var addOpticalVI = function(img) {
  var EVI = img.expression(
        '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
            'NIR': img.select('B8').divide(10000),
            'RED': img.select('B4').divide(10000),
            'BLUE': img.select('B2').divide(10000)
        }).rename("EVI");
  var NDVI = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var NDWI = img.normalizedDifference(['B3', 'B8']).rename('NDWI'),
      NDMI = img.normalizedDifference(['B8', 'B11']).rename('NDMI'),
      NBR = img.normalizedDifference(['B8', 'B12']).rename('NBR');
  return img
    .addBands([NDVI,EVI,NDWI,NDMI, NBR])
      .copyProperties(img,img.propertyNames());
};
// change linear units to dB
function powerToDb (img){
  return ee.Image(10).multiply(img.log10()).copyProperties(img,img.propertyNames());
}
// Function to add radar indices
var addSARIndices = function(img) {
  var VV = ee.Image(img.select('VV')),
      VH = ee.Image(img.select('VH'));
  var RVI = (ee.Image(4).multiply(VH))
            .divide(VV.add(VH)).rename('RVI');
  var RFDI = (VV.subtract(VH))
              .divide(VV.add(VH)).rename('RFDI'); 
  var VH_VV = VH.divide(VV).rename('VH/VV');
  //   // DPSVI from dos Santos et al. (2021) - https://doi.org/10.1080/01431161.2021.1959955
  // var max =  img.reduceRegion({reducer: ee.Reducer.max(), scale: 20,
  //                             geometry: img.geometry(1000), bestEffort: true});
  // var DPSVIi = img.expression(
  //   '(((VVmax - VV)+VH)/1.414213562) * ((VV+VH)/VV) * VH', {
  //     'VH': VH,
  //     'VV':  VV,
  //     'VVmax': ee.Number(max.get('VV'))
  // }).rename('DPSVI');
  // var DPSVIi = img.expression(
  //     '(VV*VV+VV*VH)/1.414213562',{
  //       'VH': VH,
  //       'VV': VV
  //     }).rename('DPSVI');
  // var max2 = DPSVIi.reduceRegion({reducer: ee.Reducer.max(),
  //                             scale: 20,
  //                             geometry: img.geometry(1000),
  //                             bestEffort: true});
  // var min = DPSVIi.reduceRegion({reducer: ee.Reducer.min(),
  //                               scale: 20,
  //                               geometry: img.geometry(1000),
  //                               bestEffort: true});
  // var DPSVI = img.expression(
  //   '(DPSVI - DPSVImin) /(DPSVImax - DPSVImin)',{
  //     'DPSVI': DPSVIi,
  //     'DPSVImax': ee.Number(max2.get('DPSVI')),
  //     'DPSVImin': ee.Number(min.get('DPSVI'))
  //   });
  return img.select('angle')
            .addBands([
                      RVI,
                      RFDI,
                      ee.Image(powerToDb(VH)).rename('VH'), 
                      ee.Image(powerToDb(VV)).rename('VV'),
                      img.select('LIA'),
                      // DPSVI.rename('DPSVI'),
                      VH_VV,
                      ]);
};
S1Collection = S1Collection.map(addSARIndices);
// call the function to mask out clouds, their shadows and snow cover in Sentinel-2 images
// using the combination of 4 different cloud-shadow-snow masking approaches
var maskClouds = require('users/danielp/functions:maskClouds_S2');
// apply the function
S2 = maskClouds.maskClouds(S2,startDate,endDate,point,max_clouds);
S2 = S2.map(addOpticalVI)
// print(S2, 'S2');
S2 = S2.select(listOfOpticalVIs);
  var IndicesChartSAR = ui.Chart.image.series({
      imageCollection: S1Collection.select(listOfSARfeatures),
      region: point,
      reducer  : ee.Reducer.mean(),
      scale: scale,
  }).setOptions({
      title: 'Time-series of SAR Polarimetric Indices',
        vAxis: {
          viewWindow: {min: 0, max: 1.5}, 
          title: 'Polarimetric indices'
        },
      hAxis: {title: 'Date'}
  });
  var VVVHChart = ui.Chart.image.series({
      imageCollection: S1Collection.select(['VV','VH', 
                                            // 'LIA'
                                            ]),
      region: point,
      reducer: ee.Reducer.mean(),
      scale: scale,
  }).setOptions({
      title: 'Time-series of SAR VV & VH vs Local Incidence Angle (LIA)',
      series: {
        2:{targetAxisIndex:0},
        // 0:{targetAxisIndex:1, lineWidth: 1, opacity: 0.5, lineDashStyle: [1, 1]},
        // 1:{targetAxisIndex:1},
      },
      vAxes: {
        // 1: {viewWindow: {min: -50, max: 70}, title: 'Local Incidence Angle - LIA (°)'},
        0: {
          // viewWindow: {min: -25, max: 0},  
          title: 'VV & VH polarizations (dB)'},
        // 0: {viewWindow: {min: -30, max: 5}},
      },
      hAxis: {title: 'Date'}
  }); 
  var IndicesChartOriginal = ui.Chart.image.series({
      imageCollection: S2.select(listOfOpticalVIs),
      region: point,
      reducer: ee.Reducer.mean(),
      scale: scale,
  }).setOptions({
      title: 'Time-series of optical vegetation indices',
      vAxis: {title: 'Optical vegetation indices'},
      hAxis: {title: 'Date'},
      interpolateNulls:true
  });
  panel2.add(IndicesChartOriginal);
  panel2.add(IndicesChartSAR);
  panel2.add(VVVHChart);
}