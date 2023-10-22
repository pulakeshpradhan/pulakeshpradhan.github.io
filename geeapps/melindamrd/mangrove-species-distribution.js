var area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                106.81712386365827,
                -5.839280790543782
              ],
              [
                106.81712386365827,
                -6.186177207934609
              ],
              [
                107.20748183484967,
                -6.186177207934609
              ],
              [
                107.20748183484967,
                -5.839280790543782
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
        [[[106.81712386365827, -5.839280790543782],
          [106.81712386365827, -6.186177207934609],
          [107.20748183484967, -6.186177207934609],
          [107.20748183484967, -5.839280790543782]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/melindamrd/THESIS/Mangrove_AR_30"
    }) || ee.FeatureCollection("users/melindamrd/THESIS/Mangrove_AR_30"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B4",
          "SR_B3",
          "SR_B2"
        ],
        "min": 0.8039500117301941,
        "max": 1.1539000272750854,
        "gamma": 0.488
      }
    }) || {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":0.8039500117301941,"max":1.1539000272750854,"gamma":0.488},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B5",
          "SR_B4",
          "SR_B3"
        ],
        "min": 9476,
        "max": 16480,
        "gamma": 1.431
      }
    }) || {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],"min":9476,"max":16480,"gamma":1.431},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B7",
          "SR_B5",
          "SR_B3"
        ],
        "min": 0.6963000297546387,
        "max": 1.9174000024795532,
        "gamma": 0.611
      }
    }) || {"opacity":1,"bands":["SR_B7","SR_B5","SR_B3"],"min":0.6963000297546387,"max":1.9174000024795532,"gamma":0.611},
    imageVisParamSA = ui.import && ui.import("imageVisParamSA", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "band_0"
        ],
        "min": 0.14134744367198918,
        "max": 0.24940281976641282,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["band_0"],"min":0.14134744367198918,"max":0.24940281976641282,"gamma":1},
    imageVisParamRA = ui.import && ui.import("imageVisParamRA", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "band_1"
        ],
        "min": 0.1390937112936214,
        "max": 0.18580664477243664,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["band_1"],"min":0.1390937112936214,"max":0.18580664477243664,"gamma":1},
    imageVisParamAM = ui.import && ui.import("imageVisParamAM", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "band_2"
        ],
        "min": -0.3981373275190592,
        "max": -0.26482680893386873,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["band_2"],"min":-0.3981373275190592,"max":-0.26482680893386873,"gamma":1},
    imageVisParamRMSE = ui.import && ui.import("imageVisParamRMSE", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "RMSE"
        ],
        "min": 0.0025640084074610046,
        "max": 0.0052981128934923,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["RMSE"],"min":0.0025640084074610046,"max":0.0052981128934923,"gamma":1};
// PREPARATION
// Set Map Center when Running the Code
Map.centerObject(area,12);
var center = {lon: 107.01693904753685, lat: -6.001395063514777, zoom: 12};
// Landsat 9 SR Cloud Masking
    function maskClouds(image) {
      // Bits 3 and 5 are cloud shadow and cloud, respectively.
        var cloudShadowBitMask = ee.Number(2).pow(3).int();
        var cloudsBitMask = ee.Number(2).pow(5).int();  
        // Get the pixel QA band.
        var qa = image.select('QA_PIXEL');
        // Both flags should be set to zero, indicating clear conditions.
        var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)); 
      // Return the masked image, scaled to [0, 1].
      return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
      }
// VISUALIZATION
var imageVis = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
                .filterDate('2022-02-01', '2022-07-27')
                .map(maskClouds);
// Display Landsat 9 Data
var imageVisClipped = imageVis.median();
Map.addLayer(imageVisClipped,imageVisParam3, 'Basemap (FCC:753)', false);
// LSU ANALYSIS
// Load Landsat 9 data
var bands = ['SR_B2','SR_B3','SR_B4','SR_B5'];
var imageL9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
                .filterDate('2022-02-01', '2022-07-27')
                .map(maskClouds)
                .select(bands)
                .filterBounds(area);
// Print Landsat 9 Data
print(imageL9, 'Selected Image');
// Display Landsat 9 Data
var imageL9Clipped = imageL9.median().clip(table);
//Map.addLayer(imageL9Clipped,imageVisParam2, 'FCC: 7, 5, 4', false);
// Define Endmembers (Speclib Source: BRIN-KKP)
var SA = [  7.404778 , 
           18.588444 , 
            7.359889 ,
           28.183001 ];
var RA = [  5.750846 , 
           10.935000 ,
            4.992308 ,
           34.488770 ];
var AM = [  4.285307 , 
           13.439613 ,
            4.221780 ,
           30.279579 ];
// Spectral Unmixing
var fractions = imageL9Clipped.unmix([SA, RA, AM],false,false);
print(fractions, 'Fraction Images');
// Display LSU Result
Map.addLayer(fractions.select('band_0'),imageVisParamSA,'Sonneratia alba', false);
Map.addLayer(fractions.select('band_1'),imageVisParamRA,'Rhizophora apiculata', false);
Map.addLayer(fractions.select('band_2'),imageVisParamAM,'Avicennia marina',false);
//Map.addLayer(fractions,{},'LSU',false);
// RMSE OF LSU ANALYSIS
// 1. Endmembers Spectra Times Abundance Map
// Create an Array of Endmembers Spectra
var endSpectra = ee.Array([
  [  7.404778 ,  5.750846 ,  4.285307 ],
  [ 18.588444 , 10.935000 , 13.439613 ],
  [  7.359889 ,  4.992308 ,  4.221780 ],
  [ 28.183001 , 34.488770 , 30.279579 ],
]);
// Print the dimensions.
//print(endSpectra.length()); //    [4x3]
// Make an Array Image, with a 1-D Array per pixel.
var arrayLSU1D = fractions.toArray();
// Make an Array Image with a 2-D Array per pixel, 3xn.
var arrayLSU2D = arrayLSU1D.toArray(1);
// Do a matrix multiplication: 4x3 times 3xn.
var rMultiAbun = ee.Image(endSpectra)
  .matrixMultiply(arrayLSU2D)
  // Get rid of the extra dimensions.
  .arrayProject([0])
  .arrayFlatten(
    [['rB2', 'rB3', 'rB4', 'rB5']]);
// 2. RMSE Calculation II
// Calculate the numerator (mixed - unmixed)^2
var RraMerge = imageL9Clipped.addBands(rMultiAbun);
//print(RraMerge, 'RraMerge');
// Calculate the numerator ((pred-true))
var subsCalc = RraMerge.expression(
  '( rB2 + rB3 + rB4 + rB5 ) - ( RB2 + RB3 + RB4 + RB5 )',{
    'rB2': RraMerge.select('rB2'),
    'rB3': RraMerge.select('rB3'),
    'rB4': RraMerge.select('rB4'),
    'rB5': RraMerge.select('rB5'),
    'RB2': RraMerge.select('SR_B2'),
    'RB3': RraMerge.select('SR_B3'),
    'RB4': RraMerge.select('SR_B4'),
    'RB5': RraMerge.select('SR_B5')
    });
var subs = RraMerge.addBands(subsCalc.rename('subs'));
// Calculate the numerator ((pred-true)^2)
var numCalc = subs.expression(
  'pow( subs, 2)',{
    'subs': subs.select('subs'),
    });
var num = subs.addBands(numCalc.rename('num'));
//print(num, 'Numerator');
// Calculate the denominator (pred+true)
 var denomCalc = num.expression(
  '( rB2 + rB3 + rB4 + rB5 ) + ( RB2 + RB3 + RB4 + RB5 )',{
    'rB2': RraMerge.select('rB2'),
    'rB3': RraMerge.select('rB3'),
    'rB4': RraMerge.select('rB4'),
    'rB5': RraMerge.select('rB5'),
    'RB2': RraMerge.select('SR_B2'),
    'RB3': RraMerge.select('SR_B3'),
    'RB4': RraMerge.select('SR_B4'),
    'RB5': RraMerge.select('SR_B5')
    });
var denom = num.addBands(denomCalc.rename('denom'));
//print(denom, 'Denominator');
// Divide the fraction before rooting them
var MSEcalc = denom.expression(
  'num / denom',{
    'num': denom.select('num'),
    'denom': denom.select('denom'),
    });
var MSE = denom.addBands(MSEcalc.rename('MSE'));
//print(MSE, 'MSE');
// Calculate the RMSE
 var RMSEcalc = MSE.expression(
  'sqrt(MSE)',{
    'MSE': MSE.select('MSE'),
    });
var RMSE = MSE.addBands(RMSEcalc.rename('RMSE'));
//print(RMSE, 'RMSE');
// Take Only the RMSE Image
var RMSEimage = RMSE.select('RMSE');
print(RMSEimage, 'RMSEimage');
// Display RMSE Image
Map.addLayer(RMSEimage,imageVisParamRMSE,'RMSE', false);
// 4. Get the RMSE Number of the LSU Analysis
// Reduce the region. The region parameter is the Feature geometry.
var RMSEresult = RMSEimage.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: table.geometry(),
  scale: 30,
  maxPixels: 1e9
});
// Print the RMSE Result
print(RMSEresult, 'Mean of the RMSE');
// EXPORT MAPS
// 1. Make Visual Parameters for Map Exports
//var imageFCC = imageL9Clipped.visualize(imageVisParam2);
var imageSA = fractions.select('band_0').visualize(imageVisParamSA);
var imageRA = fractions.select('band_1').visualize(imageVisParamRA);
var imageAM = fractions.select('band_2').visualize(imageVisParamAM);
/*
// 2. Export Mangrove in RGB
Export.image.toDrive({
  image: imageFCC,
  description: 'FCC',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_FCC',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
// 3. Export LSU SA
Export.image.toDrive({
  image: imageSA,
  description: 'LSU_SA',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_LSU_SA',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
// 4. Export LSU RA
Export.image.toDrive({
  image: imageRA,
  description: 'LSU_RA',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_LSU_RA',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
// 5. Export LSU AM
Export.image.toDrive({
  image: imageAM,
  description: 'LSU_AM',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_LSU_AM',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
// 6. Export LSU All
Export.image.toDrive({
  image: fractions,
  description: 'LSU_ALL',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_LSU_ALL',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
// 7. Export RMSE Image
Export.image.toDrive({
  image: RMSEimage,
  description: 'RMSE',
  folder: 'GEE2',
  fileNamePrefix:'LANDSAT_RMSE2',
  region: table,
  scale: 30,
  maxPixels: 10e10,
  fileFormat: 'GeoTIFF'
});
*/
// User Interface
  // Add Title and Desc.
  var header = ui.Label('Avicennia marina, Rhizophora apiculata, Sonneratia alba Distribution Map of Muaragembong Mangrove Forest Area',
                       {fontWeight: 'bold',
                        fontSize: '20px', 
                        color: 'black', 
                        textAlign: 'center'});
  var text = ui.Label(
            'Muaragembong Mangrove Forest Area is located in Bekasi, West Java, Indonesia. It is part of the Jakarta Bay mangrove chain that stretches from Banten in west headland to Karawang in the east. The species distribution is obtained from a Linear Spectral Unmixing (LSU) analysis using Sentinel-2A MSI imagery. The image is from July 2022.',
            {fontSize: '14px', textAlign: 'justify'});
  var text2 = ui.Label(
            'LEGEND',
            {fontWeight: 'bold', fontSize: '14px', textAlign: 'justify'});
  var text3 = ui.Label(
            'Brighter pixels indicate more abundance. Darker pixels indicate less abundance.',
            {fontSize: '14px', textAlign: 'justify'});
  var text4 = ui.Label(
            'by Melinda Meganagatha Rosbella Devy - Geografi, UM',
            {fontSize: '10px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text4, text, text2, text3], 'flow', {width: '300px'});
// 4. Legend Panel
  var legendPanel = ui.Panel({
                    style: {
                      fontSize: '12px', 
                      margin: '0 0 0 8px', 
                      padding: '0'}
  });
  var legendTitle = ui.Label(
                    'Legend:',
                    {fontWeight: 'bold', 
                     fontSize: '14px', 
                     margin: '0 0 4px 0', 
                     padding: '0'});
  // Create Legend Style
     var makeRow = function(color, name) {
     var colorBox = ui.Label({
         style: {
         backgroundColor: '#' + color,
        padding: '8px',
        margin: '0 0 4px 0'} });
     var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'} });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal') }); };
// 5. Slider
 // Create Map Options
    var images = {
      'Avicennia marina' : fractions.select('band_2').visualize(imageVisParamAM),
      'Rhizophora apiculata' : fractions.select('band_1').visualize(imageVisParamRA),
      'Sonneratia alba' : fractions.select('band_0').visualize(imageVisParamSA),
      'Root Mean-Squared Error (RMSE)' : RMSEimage.visualize(imageVisParamRMSE)
      };
 // Create the Left Map and Display as Layer 0
    var leftMap = ui.Map(center);
    leftMap.setControlVisibility(false);
    var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
 // Create the Right Map and Display as Layer 1
    var rightMap = ui.Map(center);
    rightMap.setControlVisibility(false);
    var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Add Layer Selection Widget
    function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('Select Species');
    function updateMap(selection) {
             mapToChange.layers().set(0, ui.Map.Layer(images[selection])); }
 // Add Dropdown
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
        select.setValue(Object.keys(images)[defaultValue], true);
    var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
        mapToChange.add(controlPanel); }
 // Create a SplitPanel
    var splitPanel = ui.SplitPanel({
      firstPanel: leftMap,
      secondPanel: rightMap,
      wipe: true,
      style: {stretch: 'both'} });
      ui.root.widgets().reset([splitPanel]);
      ui.root.widgets().add(toolPanel);
 // Link the Left and Right Map
      var linker = ui.Map.Linker([leftMap, rightMap]);