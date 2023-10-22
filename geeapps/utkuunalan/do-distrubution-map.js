var S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    ROI = ui.import && ui.import("ROI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                32.8123105383799,
                39.83447261060771
              ],
              [
                32.8123105383799,
                39.80981813327543
              ],
              [
                32.84492620000099,
                39.80981813327543
              ],
              [
                32.84492620000099,
                39.83447261060771
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
        [[[32.8123105383799, 39.83447261060771],
          [32.8123105383799, 39.80981813327543],
          [32.84492620000099, 39.80981813327543],
          [32.84492620000099, 39.83447261060771]]], null, false);
/*
****************************************************************************************************
*************************EnvE-741 Remote Sensing For Environmental Engineers************************
*******************************************Term Project*********************************************
                    Automatic Dissolved Oxygen Distrubiton Map for Water Bodies
                             by Using The DO Index Suggested By
              Ismail, Karaoui & Arioua, Abdelkrim & Boudhar, Abdelghani & Mohammed, Hssaisoune & 
    Sabri,Elmouatassime & Ait Ouhamchich, Kamal & Elhamdouni, Driss & A., El & Nouaim, Wafae. (2018)
*****************************************************************************************************
                                        ______AUTHORS______
                                          Taşdelen, Rozeran
                                            Özdemir, Ezgi
                                        Ünalan, Utku Berkalp
*/
print("Use of the Program: \nWithin the selectedROI, Water Body is detected automatically.\nDO distribution map is created automatically as well.\n_______________________________________________________________________\nBy clicking any point within the Water Body, DO concentration for that \npoint displays on the panel titled 'Pointwise Concentration'")
//Set center of polygon objects
Map.centerObject(ROI);
var date_start = '2020-05-29';
var date_end = '2022-06-11';
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.Blues[9].reverse()
// Load the image from the archive.
s1 = s1
  .filterBounds(Map.getBounds(true))
  .filterDate(date_start,date_end)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .map(function(image){return image.clip(Map.getBounds(true))});
//print(s1);
//Calculate median image of time period
var image = ee.Image(s1.median()).clip(ROI); 
//print(image);
// Define visualization parameters in an object literal.
var s1_band='VV';
var vizParams = {
  bands: [s1_band],
  min: -20,
  max: 0,
};
// Display S1-Image
Map.addLayer(image, vizParams, 'S1- VV Image');
// Compute the histogram of the VV-band.  The mean and variance are only FYI.
var histogram = image.select(s1_band).reduceRegion({
  reducer: ee.Reducer.histogram()
      .combine('mean', null, true)
      .combine('variance', null, true), 
  geometry: ROI, 
  scale: 10,
  bestEffort: true
});
print(histogram);
// Chart the histogram
print(Chart.image.histogram(image.select(s1_band), ROI, 10));
// Return the DN that maximizes interclass variance in S1-band (in the region).
var otsu = function(histogram) {
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
  // Compute between sum of squares, where each mean partitions the data.
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
           bCount.multiply(bMean.subtract(mean).pow(2)));
  });
  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  // Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
var threshold = otsu(histogram.get(s1_band+'_histogram'));
 print('threshold', threshold);
//Add water mask
var water_mask = image.select(s1_band).lt(threshold);
Map.addLayer(water_mask.mask(water_mask), {palette: 'blue'}, 'WaterMask');
// After the water mask is set, apply erosion to get rid of boundary pixels
var kernel = ee.Kernel.rectangle(3,3);
//*************************************************************************************
//*************************************************************************************
//Sentinel 2 cloud_mask
//Evaluating the potential of Sentinel-2 satellite images for water quality characterization
//of artificial reservoirs: The Bin El Ouidane Reservoir case study (Morocco)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var image_set = S2.filterDate(date_start,date_end)
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
            .map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
//image = image.mask(water_mask)
Map.addLayer(image_set.median().clip(ROI), rgbVis, 'S2_1C-True Color Image (RGB)')
water_mask = water_mask.focalMin({kernel: kernel, iterations: 1});
image = image_set.median()
//DO = –0,0167*B08 + 0,0067*B09 + 0,0162*B10 + 0,0083*B11 + 9,577
//(–0.0167 * B08) + (0.0067 * B09) + (0.0162 * B10) + (0.0083*B11) + 9.577
var DO = image.expression(
    '-0.0167*B08*10000 + B09*0.0067*10000 + 0.0162*B10*10000 + 0.0098*B11*10000 + 9.557', {
      'B08': image.select('B8'),
      'B09': image.select('B9'),
      'B10': image.select('B10'),
      'B11': image.select('B11'),
}).float().rename("DO").mask(water_mask);
image = image.addBands(DO.float())
var image_mask = image.mask(water_mask);
var min_DO = image_mask.select("DO").reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: ROI,
    scale: 30,
    maxPixels: 1e10
}).values().get(0)
var max_DO = image_mask.select("DO").reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: ROI,
    scale: 30,
    maxPixels: 1e10
}).values().get(0)
var mx_DO = max_DO
var mn_DO = min_DO
max_DO = ee.Number(max_DO)
min_DO = ee.Number(min_DO)
var diff = max_DO.subtract(min_DO)
var DO_norm = DO.expression(
    '(DO_ - min) / (max - min + 0.00001)', {
      'max': max_DO,
      'min': min_DO,
      'DO_': DO.select("DO"),
}).rename("DO_norm").mask(water_mask);
Map.addLayer(DO_norm, {min: 0, max: 1, palette: palette},'Dissolved Oxygen Distribution (mg/L)');
var min_DO_Norm = DO_norm.select("DO").reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: ROI,
    scale: 30,
    maxPixels: 1e10
}).values().get(0)
var max_DO_Norm = DO_norm.select("DO").reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: ROI,
    scale: 30,
    maxPixels: 1e10
}).values().get(0)
//Image Visualisation//
var vis = {min: min_DO.getInfo(), max: max_DO.getInfo(), palette: palette};
var nSteps = 10
// Creates a color bar thumbnail image for use in legend from the given color palette
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, nSteps, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: nSteps,
    palette: palette,
  };
}
// Create the colour bar for the legend
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0).int(),
  params:  makeColorBarParams(palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(ee.Number(min_DO).getInfo().toFixed(2), {margin: '4px 8px', position: "top-left"}),
        ui.Label(((ee.Number(max_DO).getInfo()-ee.Number(min_DO).getInfo()) / 2+ee.Number(min_DO).getInfo()).toFixed(2),
        {margin: '4px 8px', textAlign: 'center', position: "top-center", stretch: 'horizontal'}),
    ui.Label(ee.Number(max_DO).getInfo().toFixed(2), {margin: '4px 8px', position: "top-left"})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Legend title
var legendTitle = ui.Label({
  value: '_______    Dissolved Oxygen Concentration (mg/L)    _______',
  style: {fontWeight: 'bold',  textAlign: 'center', position: "top-center"}
});
// Add the legendPanel to the map
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
  width: '400px',
  position: 'bottom-left'
});
Map.add(legendPanel);
// Load 1-band image
var dataset = DO.select("DO");
Map.style().set('cursor', 'crosshair');
// Following is adapted from https://code.earthengine.google.com/?scriptPath=Examples:User+Interface/Ocean+Timeseries+Investigator
// Set a callback function for when the user clicks the map.
var header = ui.Label('Pointwise Concentration', {fontWeight: 'bold', fontSize: '18px'});
var toolPanel = ui.Panel([header], 'flow', {width: '400px'});
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var DOValue = dataset.reduceRegion(ee.Reducer.last(), click_point, 20);
  var DOText = 'Conc: ' + DOValue.get('DO').getInfo().toFixed(4) + " mg/L";
// var demText = 'Habitat suitability: ' + demValue.get('b1');
  toolPanel.widgets().set(1, ui.Label(location));
  toolPanel.widgets().set(2, ui.Label(DOText));
  // Add a red dot to the map where the user clicked.
  Map.layers().set(1, ui.Map.Layer(click_point, {color: 'FF0000'}));
});
// Add the panel to the ui.root.
ui.root.add(toolPanel);
/*
Ismail, Karaoui & Arioua, Abdelkrim & Boudhar, Abdelghani & Mohammed, Hssaisoune & Sabri, 
Elmouatassime & Ait Ouhamchich, Kamal & Elhamdouni, Driss & A., El & Nouaim, Wafae. (2018).
Evaluating the potential of Sentinel-2 satellite images for water quality characterization 
of artificial reservoirs: The Bin El Ouidane Reservoir case study (Morocco). Meteorology 
Hydrology and Water Management. 7. 10.26491/mhwm/95087. 
*/