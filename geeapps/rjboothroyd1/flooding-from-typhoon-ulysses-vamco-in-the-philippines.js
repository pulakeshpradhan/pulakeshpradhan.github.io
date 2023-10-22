/* Visualise flooding from Typhoon Ulysses in the Cagayan Valley, Philippines (November, 2020)
 * Uses Sentinel-1 and Sentinel-2 imagery before/during event.
 * Imagery before from 01/05/2020 - 30/10/2020
 * Imagery during from 13/11/2020
 * Code adapted by Rich Boothroyd (richard.boothroyd@glasgow.ac.uk)
 * Initial code by  Alejandro Marambio / Guido Lemoine 
 * Initial inspiration by ESA tweet https://twitter.com/ESA_EO/status/1199279903088291840?s=20 
*/
// Set map centre
Map.setCenter(121.7445, 17.5794,11); // Tuguegarao City, Philippines
// Sentinel-2 - optical imagery:
// Rename bands
var s2b = ['B1', 'B2', 'B3', 'B4', 'B11', 'QA60', 'B8', 'B12'];
var bns = ['Aerosols', 'Blue', 'Green', 'Red', 'Swir1', 'BQA', 'Nir', 'Swir2'];
var S2 = ee.ImageCollection("COPERNICUS/S2").select(s2b, bns);
// Visualisation params
var params_true_T1 = {min: 0.0, max: 0.3, bands: ["Red", "Green", "Blue"]};
var params_true_T2 = {min: 0.0, max: 3000, bands: ["Red", "Green", "Blue"]};
// Filter date range, roi and apply simple cloud processing
var T1_imgCol = S2.filterDate('2020-05-01', '2020-10-31') 
                  .map(function(image) {
                      var qa = image.select('BQA');
                      var cloudBitMask = ee.Number(2).pow(10).int();
                      var cirrusBitMask = ee.Number(2).pow(11).int();
                      var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
                      qa.bitwiseAnd(cirrusBitMask).eq(0));
                      return image.updateMask(mask).resample('bicubic').multiply(0.0001)
                   }); 
// Define and rename quantiles of interest, display false colour
var bnp50 = ['Aerosols_p50', 'Blue_p50', 'Green_p50', 'Red_p50', 'Swir1_p50', 'BQA_p50', 'Nir_p50', 'Swir2_p50'];
var T1_p50 = T1_imgCol.reduce(ee.Reducer.percentile([50])).select(bnp50, bns);
var T2_imgCol = S2.filterDate('2020-11-10', '2020-11-15')
var T2_image = ee.Image(T2_imgCol.first().select(bnp50, bns));
// Define and rename quantiles of interest, display false colour
Map.addLayer(T1_p50, params_true_T1, 'Sentinel-2 Optical Before', true);
Map.addLayer(T2_imgCol, params_true_T2, 'Sentinel-2 Optical 13/11/2020', true);
// Sentinel-1 - SAR imagery:
// Sentinel-1 / T1
var T1 = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filterDate('2020-05-01', '2020-10-31') // dry
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filterMetadata('resolution_meters', 'equals' , 10)
        .select('VV')
        .mean(); 
// Sentinel-1 / T2
var T2 = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filterDate('2020-11-10', '2020-11-15') //wet
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filterMetadata('resolution_meters', 'equals' , 10)
        .select('VV')
        .mean();
Map.addLayer (T1, {min: -15, max: 0, palette: ['black', 'white']},'Sentinel-1 SAR Before');
Map.addLayer (T2, {min: -15, max: 0, palette: ['black', 'white']},'Sentinel-1 SAR 13/11/2020');
// Green Band
var Green = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filterDate('2020-11-10', '2020-11-15') //wet
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filterMetadata('resolution_meters', 'equals' , 10)
        .select('VV')
        .mean();
// Composite RGB
var Red1 = T2.select('VV').rename ('Red');
var Green1 = Green.select('VV').rename ('Green');
var Blue1 = T1.select('VV').rename ('Blue');
Map.addLayer(Red1.addBands(Green1).addBands(Blue1),{bands: ['Blue', 'Red', 'Red'], min: -20,  max: 5,  gamma: [1, 1, 1]}, 'Potential flooding from SAR differencing');