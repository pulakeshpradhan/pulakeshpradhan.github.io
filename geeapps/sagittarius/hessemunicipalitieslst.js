/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([8.99730466617056, 50.852242115166334]),
    HesseMunic = ee.FeatureCollection("users/sagittarius/HessenMittelstaedte"),
    HesseBorder = ee.FeatureCollection("users/sagittarius/HesseBorderWGS84"),
    geometry2 = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[9.664621402748539, 50.563626045892576],
          [9.669449378975346, 50.56027285732625],
          [9.669814159401371, 50.560681795535],
          [9.669642498024418, 50.56227662064518],
          [9.671359111793949, 50.5631898722612],
          [9.669385005958988, 50.564239408231344],
          [9.6665955085835, 50.56493454256408]]]),
    HesseCitiesAbove20 = ee.FeatureCollection("users/sagittarius/HessenStaedteAb20");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*
Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
*/
var aoi = HesseCitiesAbove20;
// ----- LOAD ADDITIONAL DATA -----
// import the 10 m ESRI data
var esri_lulc_2020 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");
// ----- LOAD REQUIRED FUNCTIONS -----
// link to the code that computes the Landsat LST
var LandsatLST = require('users/sagittarius/Landsat8LST:modules/Landsat_LST.js')
var miscFunctions = require('users/sagittarius/Landsat8LST:modules/miscFunctions.js')
// ----- PREPARING THE HESSE BORDER LAYERS -----
// drawBorder() in miscFunctions.js
var HesseMunicOutline = miscFunctions.drawBorder(aoi)
var HesseBorderOutline = miscFunctions.drawBorder(HesseBorder)
// ----- SELECT REGION OF INTEREST, DATE RANGE AND LANDSAT SATELLITE -----
// select region of interest, date range, and landsat satellite
//var geometry = ee.Geometry.Rectangle([-8.91, 40.0, -8.3, 40.4]);
//var geometry = geometry;
var satellite = 'L8';
var date_start = '2018-08-01';
var date_end = '2018-08-10';
var use_ndvi = true;
// ----- GET LANDSAT COLLECTION -----
// with added variables: NDVI, FVC, TPW, EM, LST 
var LandsatColl18 = LandsatLST.collection(satellite, date_start, date_end, HesseBorder, use_ndvi);
var LandsatColl16 = LandsatLST.collection(satellite, '2016-08-11', '2016-08-21', HesseBorder, use_ndvi);
var LandsatColl16Full = LandsatLST.collection(satellite, '2016-01-01', '2016-12-31', HesseBorder, use_ndvi);
var LandsatColl18Full = LandsatLST.collection(satellite, '2018-01-01', '2018-12-31', HesseBorder, use_ndvi);
var LandsatCollFull = LandsatLST.collection(satellite, '2013-01-01', '2021-12-31', HesseBorder, use_ndvi);
print('L8_18', LandsatColl18);
print('L8_16', LandsatColl16);
print('L8_16Full', LandsatColl16Full);
print('L8_18Full', LandsatColl18Full);
print('L8_Full', LandsatCollFull);
// ----- SORT BY CLOUD COVER AND SELECT THE FIRST FEATURE -----
//var exImage = LandsatColl.first();
//var LandsatColl = ee.Image(LandsatColl.sort('CLOUD_COVER').first());
var exImage18 = LandsatColl18.sort('CLOUD_COVER').first();
var exImage16 = LandsatColl16.sort('CLOUD_COVER').first();
print('exImage18', exImage18);
// ----- MEDIAN -----
var Landsat16FullMedian = LandsatColl16Full.median().clip(aoi);
var Landsat18FullMedian = LandsatColl18Full.median().clip(aoi);
var LandsatFullMedian = LandsatCollFull.median().clip(aoi);
// ----- CREATE A CHART -----
var l8FullChart = ui.Chart.image.series(LandsatCollFull.select('LST'), geometry)
  .setChartType('ScatterChart')
  .setOptions({
   title: 'Landsat 8 LST Time Series at geometry',
   trendlines: {
     0: {color: 'CC0000'}
   },
   lineWidth: 1,
   pointSize: 3,
  });
print(l8FullChart);
// ----- PREPARING THE OUTPUT LAYERS -----
// Land Cover
var esri_lulc_clip = esri_lulc_2020.mosaic().clip(aoi);
//var hesse16LST = exImage16.select('LST');
var hesseMun16LST = exImage16.select('LST').clip(aoi)//.subtract(273.15);
var hesseMun16NDVI = exImage16.select('NDVI').clip(aoi);
var hesseMun16RGB = exImage16.select(['B4', 'B3', 'B2']).clip(aoi).multiply(0.0001)
//var hesse18LST = exImage18.select('LST');
var hesseMun18LST = exImage18.select('LST').clip(aoi)//.subtract(273.15);
var hesseMun18NDVI = exImage18.select('NDVI').clip(aoi);
var hesseMun18RGB = exImage18.select(['B4', 'B3', 'B2']).clip(aoi).multiply(0.0001);
// full collections 
// LST
var hesseMun16FullMedLST = Landsat16FullMedian.select('LST')//.subtract(273.15);
var hesseMun18FullMedLST = Landsat18FullMedian.select('LST')//.subtract(273.15);
var hesseMunFullMedLST = LandsatFullMedian.select('LST')//.subtract(273.15);
 // NDVI
var hesseMun16FullMedNDVI = Landsat16FullMedian.select('NDVI');
var hesseMun18FullMedNDVI = Landsat18FullMedian.select('NDVI');
var hesseMunFullMedNDVI = LandsatFullMedian.select('NDVI');
// ----- CALCULATE IMAGE STATISTICS RASTER -----
// CALCULATE LST DIFFERENCES AND MEANS 
var diff1816 = hesseMun18LST.subtract(hesseMun16LST);
print('Differenz LST 2018-2016', diff1816);
// ----- CALCULATE IMAGE STATISTICS PIXEL -----
// imageStatistics() in miscFunctions.js
var hesseMun18LSTMean = miscFunctions.imageStatistics(hesseMun18LST , aoi, 'mean');
var hesseMun18LSTMin = miscFunctions.imageStatistics(hesseMun18LST , aoi, 'min');
var hesseMun18LSTMax = miscFunctions.imageStatistics(hesseMun18LST , aoi, 'max');
var listStatistics = ee.List([hesseMun18LSTMean, hesseMun18LSTMin]);
print(listStatistics);
print('18 LST Mean', hesseMun18LSTMean);
print('18 LST Min', hesseMun18LSTMin);
print('18 LST Max', hesseMun18LSTMax);
var hesseMun16LSTMean = miscFunctions.imageStatistics(hesseMun16LST, aoi, 'mean');
var hesseMun16LSTMin = miscFunctions.imageStatistics(hesseMun16LST , aoi, 'min');
var hesseMun16LSTMax = miscFunctions.imageStatistics(hesseMun16LST , aoi, 'max');
print('16 LST Mean', hesseMun16LSTMean);
print('16 LST Min', hesseMun16LSTMin);
print('16 LST Max', hesseMun16LSTMax);
var diff1816Mean = miscFunctions.imageStatistics(diff1816, aoi, 'mean');
var diff1816Min = miscFunctions.imageStatistics(diff1816 , aoi, 'min');
var diff1816Max = miscFunctions.imageStatistics(diff1816 , aoi, 'max');
print('Diff LST 18-16', diff1816Mean);
print('Diff LST 18-16', diff1816Min);
print('Diff LST 18-16', diff1816Max);
// ----- CALCULATE THE UTFVI -----
// UTFVI = (T_lst - T_mean) / T_mean
// Calculate the UTFVI formula.
//var hesseMun18LSTMeanValue = ee.Number(hesseMun18LSTMean)
//print(hesseMun18LSTMeanValue)
//var utfvi_18 = hesseMun18LST.subtract(hesseMun18LSTMeanValue).divide(hesseMun18LSTMeanValue);
// hesseMun18LSTMean is a single value implied by ee.Number()
var utfvi_18 = hesseMun18LST.subtract(ee.Number(hesseMun18LSTMean)).divide(ee.Number(hesseMun18LSTMean));
var utfvi_16 = hesseMun16LST.subtract(ee.Number(hesseMun16LSTMean)).divide(ee.Number(hesseMun16LSTMean));
var Abw_MW_18 = hesseMun18LST.subtract(ee.Number(hesseMun18LSTMean));
var Abw_MW_16 = hesseMun16LST.subtract(ee.Number(hesseMun16LSTMean));
//  -----------------------------
//  P R E P A R E   T H E   M A P
//  -----------------------------
// ----- SET MAP CENTER -----
Map.centerObject(aoi, 8);
//Map.addLayer(exImage.select('TPW'),{min:0.0, max:60.0, palette:cmap1},'TCWV')
//Map.addLayer(exImage.select('TPWpos'),{min:0.0, max:9.0, palette:cmap1},'TCWVpos')
//Map.addLayer(exImage.select('FVC'),{min:0.0, max:1.0, palette:cmap2}, 'FVC')
//Map.addLayer(exImage.select('EM'),{min:0.9, max:1.0, palette:cmap1}, 'Emissivity')
//Map.addLayer(exImage.select('B10'),{min:290, max:320, palette:cmap1}, 'TIR BT')
//Map.addLayer(exImage.select('LST'),{min:290, max:320, palette:cmap1}, 'LST_Gesamt')
//Map.addLayer(exImage.select('LST').clip(HesseMuninc),{min:290, max:320, palette:cmap1}, 'LST_Gemeinden')
//Map.addLayer(exImage.multiply(0.0001),{bands: ['B4', 'B3', 'B2'], min:0, max:0.3}, 'RGB')
//, min:0, max:0.3
// ----- PREPARE VISUALISATION CONDITIONS FOR MAPPING -----
// ----- PREPARING LULC LEGEND COLORS -----
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Water", "Trees", "Grass", "Flooded Vegetation", "Crops",
    "Scrub/Shrubs", "Built Area", "Bare Ground", "Snow/Ice", "Clouds"
  ],
  "colors": [
    "#1A5BAB", "#358221", "#A7D282", "#87D19E", "#FFDB5C", "EECFA8", "#ED022A", "EDE9E4", "#F2FAFF", "#C8C8C8"
  ]
};
// ----- PREPARING THE LAYER COLORS -----
// palettes
var palNDVI =  'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, ' +
                '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
var palLST = [  '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
                '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
                '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
                'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
                'ff0000', 'de0101', 'c21301', 'a71001', '911003'];
//var palLSTDiff = 'blue, cyan, green, yellow, red';
var palLSTDiff = 'green, yellow, red';
//var cmap1 = ['blue', 'cyan', 'green', 'yellow', 'red'];
//var cmapNDVI = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
//var cmap2 = ['F2F2F2','EFC2B3','ECB176','E9BD3A','E6E600','63C600','00A600']; 
//var cmapNDVI = {min: 0, max: 1, palette: 'red, orange, yellow, lightgreen, green'};
//var cmapLST = {min: 15, max: 50, palette: 'blue, cyan, green, yellow, red'};
var cmapLST = {min: 10, max: 55, palette: 'cyan, green, yellow, red'};
//var cmapLST = {min: ee.Number(hesseMun18LSTMin), max: ee.Number(hesseMun18LSTMax), palette: 'cyan, green, yellow, red'};
var cmapUTFVI = {min: 0.0, max: 0.02, palette: 'blue, cyan, green, yellow, orange, red'};
var cmapAbw_MW = {min: -15, max: 15, palette: 'blue, cyan, green, yellow, orange, red'};
var cmapNDVI = {min: 0, max: 1, palette: palNDVI};
//var cmapLST = {min: 15, max: 50, palette: palLST};
//var cmapLSTDiff = {min: -30, max: 30, palette: palLSTDiff};
var cmapLSTDiff = {min: -5, max: 35, palette: palLSTDiff};
//var hesseMun16LST_composite = hesseMun16LST.visualize(vis);
//Map.addLayer(hesseMun16LST_composite);
//var hesseMun18LST_composite = hesseMun18LST.visualize(vis);
//Map.addLayer(hesseMun18LST_composite);
//----- DECLARE CHECKBOXES AND ADD RELATED LAYERS TO MAP -----
Map.addLayer(hesseMun16FullMedNDVI, cmapNDVI, 'Median_2016_NDVI', false);
Map.addLayer(hesseMun16FullMedLST.subtract(273.15), cmapLST, 'Median_2016_LST', false);
Map.addLayer(hesseMun18FullMedNDVI, cmapNDVI, 'Median_2018_NDVI', false);
Map.addLayer(hesseMun18FullMedLST.subtract(273.15), cmapLST, 'Median_2018_LST', false);
Map.addLayer(hesseMunFullMedNDVI, cmapNDVI, 'Median_Full_NDVI', false);
Map.addLayer(hesseMunFullMedLST.subtract(273.15), cmapLST, 'Median_Full_LST', false);
Map.addLayer(utfvi_18, cmapUTFVI, 'UTFVI_18');
Map.addLayer(utfvi_16, cmapUTFVI, 'UTFVI_16');
Map.addLayer(Abw_MW_18, cmapAbw_MW, 'Abw_MW_18');
Map.addLayer(Abw_MW_16, cmapAbw_MW, 'Abw_MW_16');
// Add clipped land cover image to the map
Map.addLayer(esri_lulc_clip, {min:1, max:10, palette:dict["colors"]}, "Gemeinden Land Cover");
// 2016 RGB
var checkbox0 = miscFunctions.prepCheckbox('Zeige 2016 RGB', 0);
Map.addLayer(hesseMun16RGB, {min:0, max:0.3}, '2016 RGB', false)
print(checkbox0);
// 2016 NDVI
var checkbox1 = miscFunctions.prepCheckbox('Zeige 2016 NDVI', 1);
//Map.addLayer(hesseMun16NDVI, {min:0, max:1, palette:cmapNDVI}, '2016 NDVI')
Map.addLayer(hesseMun16NDVI, cmapNDVI, '2016 NDVI', false)
print(checkbox1);
// 2016 LST
var checkbox2 = miscFunctions.prepCheckbox('Zeige 2016 LST', 2);
//Map.addLayer(hesseMun16LST, {min:15, max:45, palette:cmap1}, '2016 LST')
Map.addLayer(hesseMun16LST.subtract(273.15), cmapLST, '2016 LST')
print(checkbox2);
// 2018 RGB
var checkbox3 = miscFunctions.prepCheckbox('Zeige 2018 RGB', 3);
Map.addLayer(hesseMun18RGB, {min:0, max:0.3}, '2018 RGB', false);
print(checkbox3);
// 2018 NDVI
var checkbox4 = miscFunctions.prepCheckbox('Zeige 2018 NDVI', 4);
Map.addLayer(hesseMun18NDVI, cmapNDVI, '2018 NDVI', false);
print(checkbox4);
// 2018 LST
var checkbox5 = miscFunctions.prepCheckbox('Zeige 2018 LST', 5);
Map.addLayer(hesseMun18LST.subtract(273.15), cmapLST, '2018 LST');
print(checkbox5);
// LST diff1816
var checkbox6 = miscFunctions.prepCheckbox('Zeige LST Diff 18-16', 6);
Map.addLayer(diff1816, cmapLSTDiff, 'LST Diff 18-16');
print(checkbox6);
// Hessen Gemeinden
var checkbox7 = miscFunctions.prepCheckbox('Gemeindegrenzen', 7)
Map.addLayer(HesseMunicOutline, {}, 'Hessen Gemeindegrenzen', false)
print(checkbox7);
// Hessen Grenzen
var checkbox8 = miscFunctions.prepCheckbox('Grenzen Hessen', 8);
Map.addLayer(HesseBorderOutline, {}, 'Hessen Grenzen', false)
print(checkbox8);
//  -------------------------------
//  A D D   L E G E N D   P A N E L
//  -------------------------------
// create the panel
var panel = ui.Panel({
  style : {
    position: 'bottom-right',
    padding: '16px;'
  }
})
// create the main title for the panel
var legendTitle = ui.Label({
  value: 'Map Legend',
  style: {fontWeight: 'bold'}
});
// combine the "subpanels"
var legendPanel = ui.Panel([legendTitle, 
                            miscFunctions.prepLegendPanel('Normalised Difference Vegetation Index', cmapNDVI), 
                            miscFunctions.prepLegendPanel('Land Surface Temperature (°C)', cmapLST),
                            miscFunctions.prepLegendPanel('Difference LST 2018-2016 (°C)', cmapLSTDiff),
                            miscFunctions.prepLegendPanel('UTFVI', cmapUTFVI)
]); 
// add the panel information to the panel containing the position
panel.add(legendPanel);
// Add the legendPanel to the map.
Map.add(panel);
// LULC LEGEND
// Create a panel to hold the legend widget
var legendLULC = ui.Panel({
  style: {
    position: "bottom-left",
    padding: "8px 15px"
  }
});
// Display map and legend
// Add legend to the map
miscFunctions.addCategoricalLegend(legendLULC, dict, "ESRI 2020 Land Cover 10m");
Map.add(legendLULC);
// Panel for statistical values
// Create the title label.
var statTitle = ui.Label({value: 'Statistische Werte',
  style : {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0px;'
  }
});
var statSubTitle16 = ui.Label({value: 'LST 2016',
  style : {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
});
var statSubTitle18 = ui.Label({value: 'LST 2018',
  style : {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
});
var statSubTitleDiff1816 = ui.Label({value: 'LST Diff 2018 - 2016',
  style : {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
});
// ui.Label needs to print a client side string
// https://gis.stackexchange.com/questions/315537/print-and-ui-label-return-different-strings-in-console-and-in-the-ui-in-goog
// toFixed is a client side approach as well
// https://gis.stackexchange.com/questions/358283/is-it-possible-to-round-decimal-places-for-float-data-in-google-earth-engine
// 2016
var stat16LSTMean = ui.Label({value: 'mean: Please wait...'});
hesseMun16LSTMean.evaluate(function(val){stat16LSTMean.setValue('mean: ' + val.toFixed(2) + ' °C')});
var stat16LSTMin = ui.Label({value: 'min: Please wait...'});
hesseMun16LSTMin.evaluate(function(val){stat16LSTMin.setValue('min: ' + val.toFixed(2) + ' °C')});
var stat16LSTMax = ui.Label({value: 'max: Please wait...'});
hesseMun16LSTMax.evaluate(function(val){stat16LSTMax.setValue('max: ' + val.toFixed(2) + ' °C')});
// 2018
var stat18LSTMean = ui.Label({value: 'mean: Please wait...'});
hesseMun18LSTMean.evaluate(function(val){stat18LSTMean.setValue('mean: ' + val.toFixed(2) + ' °C')});
var stat18LSTMin = ui.Label({value: 'min: Please wait...'});
hesseMun18LSTMin.evaluate(function(val){stat18LSTMin.setValue('min: ' + val.toFixed(2) + ' °C')});
var stat18LSTMax = ui.Label({value: 'max: Please wait...'});
hesseMun18LSTMax.evaluate(function(val){stat18LSTMax.setValue('max: ' + val.toFixed(2) + ' °C')});
// Difference 2018 - 2016
var statDiff1816LSTMean = ui.Label({value: 'mean: Please wait...'});
diff1816Mean.evaluate(function(val){statDiff1816LSTMean.setValue('mean: ' + val.toFixed(2) + ' °C')});
var statDiff1816LSTMin = ui.Label({value: 'min: Please wait...'});
diff1816Min.evaluate(function(val){statDiff1816LSTMin.setValue('min: ' + val.toFixed(2) + ' °C')});
var statDiff1816LSTMax = ui.Label({value: 'max: Please wait...'});
diff1816Max.evaluate(function(val){statDiff1816LSTMax.setValue('max: ' + val.toFixed(2) + ' °C')});
// Create a panel to hold the chart.
var statPanel = ui.Panel();
statPanel.style().set({
  width: '0 16px',
  position: 'top-left'
});
// add everything to the panel
statPanel.add(statTitle);
statPanel.add(statSubTitle16);
statPanel.add(stat16LSTMean);
statPanel.add(stat16LSTMin);
statPanel.add(stat16LSTMax);
statPanel.add(statSubTitle18);
statPanel.add(stat18LSTMean);
statPanel.add(stat18LSTMin);
statPanel.add(stat18LSTMax);
statPanel.add(statSubTitleDiff1816);
statPanel.add(statDiff1816LSTMean);
statPanel.add(statDiff1816LSTMin);
statPanel.add(statDiff1816LSTMax);
//show the panel on the map
Map.add(statPanel);
// NOTES ON PANELS
 /*
var panel = ui.Panel({
  style : {
    position: 'bottom-left',
    padding: '5px;'
  }
})
var title = ui.Label({
  value: 'Legende',
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
})
panel.add(title)
Map.add(panel)
*/
// uncomment the code below to export a image band to your drive
/*
Export.image.toDrive({
  image: exImage.select('LST'),
  description: 'LST',
  scale: 30,
  region: geometry,
  fileFormat: 'GeoTIFF',
});
*/