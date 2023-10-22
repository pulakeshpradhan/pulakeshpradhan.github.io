var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -60.364652356684864,
                -6.779929613622313
              ],
              [
                -60.364652356684864,
                -7.517099798116556
              ],
              [
                -59.246793469966114,
                -7.517099798116556
              ],
              [
                -59.246793469966114,
                -6.779929613622313
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-60.364652356684864, -6.779929613622313],
          [-60.364652356684864, -7.517099798116556],
          [-59.246793469966114, -7.517099798116556],
          [-59.246793469966114, -6.779929613622313]]], null, false),
    image = ui.import && ui.import("image", "image", {
      "id": "users/ceciliajrsa/PDigital2000_2020_AMZ"
    }) || ee.Image("users/ceciliajrsa/PDigital2000_2020_AMZ"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -59.246793469966114,
                -7.2
              ],
              [
                -59.246793469966114,
                -6.779929613622313
              ],
              [
                -59.9,
                -6.779929613622313
              ],
              [
                -59.9,
                -7.2
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-59.246793469966114, -7.2],
          [-59.246793469966114, -6.779929613622313],
          [-59.9, -6.779929613622313],
          [-59.9, -7.2]]]);
//##########################################################################################
// START INPUTS
//##########################################################################################
// define collection parameters
var startYear = 2013;
var endYear = 2020;
var startDay = '06-01';
var endDay = '09-30';
var index = 'NDVI';
var index1 = 'NBR';
var maskThese = ['cloud', 'shadow', 'water'];
// define landtrendr parameters
var runParams = { 
  maxSegments:            7,
  spikeThreshold:         0.5,
  vertexCountOvershoot:   3,
  preventOneYearRecovery: true,
  recoveryThreshold:      0.25,
  pvalThreshold:          0.05,
  bestModelProportion:    0.75,
  minObservationsNeeded:  6
};
// define change parameters
var changeParams = {
  delta:  'loss',
  sort:   'greatest',
  year:   {checked:true, start:2013, end:2020},
  mag:    {checked:true, value:100,  operator:'>'},
  dur:    {checked:true, value:8,    operator:'<'},
  preval: {checked:true, value:200,  operator:'>'},
  mmu:    {checked:false, value:11},
};
// define change parameters
var changeParams1 = {
  delta:  'loss',
  sort:   'greatest',
  year:   {checked:true, start:2013, end:2020},
  mag:    {checked:true, value:100,  operator:'>'},
  dur:    {checked:true, value:8,    operator:'<'},
  preval: {checked:true, value:200,  operator:'>'},
  mmu:    {checked:false, value:11},
};
//##########################################################################################
// END INPUTS
//##########################################################################################
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Image composition of the StartDate
var start_imageComp = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(startYear+'-'+startDay, startYear+'-'+endDay)
                  .filterBounds(geometry2)
                  .sort('CLOUD_COVER')
                  .limit(6);
// Image composition of the EndDate
var end_imageComp = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(endYear+'-'+startDay, endYear+'-'+endDay)
                  .filterBounds(geometry2)
                  .sort('CLOUD_COVER')
                  .limit(6);
// load the LandTrendr.js module
var ltgee = require('users/emaprlab/public:Modules/LandTrendr.js'); 
// add index to changeParams object
changeParams.index = index;
// run landtrendr
var lt = ltgee.runLT(startYear, endYear, startDay, endDay, geometry2, index, [], runParams, maskThese);
changeParams1.index = index1;
// run landtrendr
var lt1 = ltgee.runLT(startYear, endYear, startDay, endDay, geometry2, index1, [], runParams, maskThese);
// get the change map layers
var changeImg = ltgee.getChangeMap(lt, changeParams);
var changeImg1 = ltgee.getChangeMap(lt1, changeParams1);
// set visualization dictionaries
var palette = ["#277da1","#577590","#4d908e","#43aa8b","#90be6d","#f9c74f","#f9844a","#f8961e","#f3722c","#f94144"];
var yodVizParms = {
  min: startYear,
  max: endYear,
  palette: palette
};
var magVizParms = {
  min: 0,
  max: 1000,
  palette: palette
};
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
//##########################################################################################
// SET UP MAPS
//########################################################################################## 
var leftMap = ui.Map();
var rightMap = ui.Map();
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(true);
rightMap.setControlVisibility(true);
leftMap.setControlVisibility({zoomControl: true});
// display the change attribute map - note that there are other layers - print changeImg to console to see all
leftMap.centerObject(geometry2);
// leftMap.setOptions('HYBRID');
leftMap.addLayer(geometry2);
leftMap.addLayer(start_imageComp.median().clip(geometry2), visParams, 'Landsat Image ' + startYear);
leftMap.addLayer(changeImg.select(['mag']).clip(geometry2), magVizParms, 'Magnitude of Change '+ index);
leftMap.addLayer(changeImg.select(['yod']).clip(geometry2), yodVizParms, 'Year of Detection '+ index);
rightMap.centerObject(geometry2);
// rightMap.setOptions('HYBRID');
rightMap.addLayer(geometry2);
rightMap.addLayer(end_imageComp.median().clip(geometry2), visParams, 'Landsat Image ' + endYear);
rightMap.addLayer(changeImg1.select(['mag']).clip(geometry2), magVizParms, 'Magnitude of Change ' + index1);
rightMap.addLayer(changeImg1.select(['yod']).clip(geometry2), yodVizParms, 'Year of Detection '+ index1);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//################################################################
//#### HERE THE UI BEGIN
//################################################################
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendYear = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Magnitude',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitleYear = ui.Label({
  value: 'Year',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
legendYear.add(legendTitleYear); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((magVizParms.max-magVizParms.min)/100.0).add(magVizParms.min);
var legendImage = gradient.visualize(magVizParms);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(magVizParms['max'])
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
var names = [
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  ];
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
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
for (var i = 0; i < names.length; i++) {
  legendYear.add(makeRow(palette[i], names[i]));
  }  
// create text on botton of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(magVizParms['min'])
    ],
  });
legend.add(panel);
leftMap.add(legend);
rightMap.add(legendYear);
//##########################################################################################
// VALIDATION
//########################################################################################## 
// Creates a raster with deforestation between the years 2013 and 2020.
// Source raster: INPE http://terrabrasilis.dpi.inpe.br/geonetwork/srv/eng/catalog.search#/metadata/507294db-a789-42dd-9158-9dea77d9293f
var INPE_deforestation = image.remap([12,13,14,15,16,17,27,29], [1,1,1,1,1,1,1,1], 0).clip(geometry2);
var NDVI_deforestation = changeImg.select(['mag']).clip(geometry2);
var NBR_deforestation = changeImg1.select(['mag']).clip(geometry2);
var customRemap = function(image, lowerLimit, upperLimit, newValue) {
  var mask = image.gte(lowerLimit).and(image.lt(upperLimit));
  return image.where(mask, newValue);
};
var NDVI_deforestation_remapped = customRemap(NDVI_deforestation, 200, 800, 1).unmask(0);
var NBR_deforestation_remapped = customRemap(NBR_deforestation, 300, 800, 1).unmask(0);
// leftMap.addLayer(INPE_deforestation_clip);
// rightMap.addLayer(NDVI_deforestation_remapped);
// leftMap.addLayer(NBR_deforestation_remapped);
// NDVI confusion matrix
var NDVI_TN = INPE_deforestation.eq(0).and(NDVI_deforestation_remapped.eq(0));
var NDVI_TP = INPE_deforestation.eq(1).and(NDVI_deforestation_remapped.eq(1));
var NDVI_FN = INPE_deforestation.eq(1).and(NDVI_deforestation_remapped.eq(0));
var NDVI_FP = INPE_deforestation.eq(0).and(NDVI_deforestation_remapped.eq(1));
var NDVI_TN_count = NDVI_TN.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NDVI_TP_count = NDVI_TP.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NDVI_FN_count = NDVI_FN.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NDVI_FP_count = NDVI_FP.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
// leftMap.addLayer(NDVI_TN);
// rightMap.addLayer(NDVI_FN);
var NDVI_CM_TP = ee.Number(NDVI_TP_count.get('remapped')).toLong();
var NDVI_CM_FP = ee.Number(NDVI_FP_count.get('remapped')).toLong();
var NDVI_CM_FN = ee.Number(NDVI_FN_count.get('remapped')).toLong();
var NDVI_CM_TN = ee.Number(NDVI_TN_count.get('remapped')).toLong();
var NDVI_CM_arr = ee.Array([[NDVI_CM_TP, NDVI_CM_FP], [NDVI_CM_FN, NDVI_CM_TN]]);
var NDVI_CM = ee.ConfusionMatrix(NDVI_CM_arr);
print('NDVI Confusion Matrix:', NDVI_CM);
print('NDVI Confusion Matrix Accuracy:', NDVI_CM.accuracy());
print('NDVI Confusion Matrix Kappa:', NDVI_CM.kappa());
// NBR confusion matrix
var NBR_TN = INPE_deforestation.eq(0).and(NBR_deforestation_remapped.eq(0));
var NBR_TP = INPE_deforestation.eq(1).and(NBR_deforestation_remapped.eq(1));
var NBR_FN = INPE_deforestation.eq(1).and(NBR_deforestation_remapped.eq(0));
var NBR_FP = INPE_deforestation.eq(0).and(NBR_deforestation_remapped.eq(1));
var NBR_TN_count = NBR_TN.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NBR_TP_count = NBR_TP.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NBR_FN_count = NBR_FN.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
var NBR_FP_count = NBR_FP.reduceRegion({reducer: ee.Reducer.sum(), scale: 300, maxPixels: 1e9});
// leftMap.addLayer(NBR_TN);
// rightMap.addLayer(NBR_FN);
var NBR_CM_TP = ee.Number(NBR_TP_count.get('remapped')).toLong();
var NBR_CM_FP = ee.Number(NBR_FP_count.get('remapped')).toLong();
var NBR_CM_FN = ee.Number(NBR_FN_count.get('remapped')).toLong();
var NBR_CM_TN = ee.Number(NBR_TN_count.get('remapped')).toLong();
var NBR_CM_arr = ee.Array([[NBR_CM_TP, NBR_CM_FP], [NBR_CM_FN, NBR_CM_TN]]);
var NBR_CM = ee.ConfusionMatrix(NBR_CM_arr);
print('NBR Confusion Matrix:', NBR_CM);
print('NBR Confusion Matrix Accuracy:', NBR_CM.accuracy());
print('NBR Confusion Matrix Kappa:', NBR_CM.kappa());
// RMS HISTOGRAMS//
// var rmse = lt.select(['rmse']);
// var histogram = ui.Chart.image.histogram({
//   image: rmse,
//   region: geometry2,
//   scale: 30,
// });
// histogram.setOptions({
//   title: 'Histogram of RMSE in '+index
// });
// print('RMSE '+index+':');
// print(histogram);
// var rmse1 = lt1.select(['rmse']);
// var histogram1 = ui.Chart.image.histogram({
//   image: rmse1,
//   region: geometry2,
//   scale: 30,
// });
// histogram.setOptions({
//   title: 'Histogram of RMSE in '+index1
// });
// print('RMSE '+index1+':');
// print(histogram1);