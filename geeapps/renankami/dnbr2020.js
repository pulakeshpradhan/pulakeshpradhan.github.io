var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -69.66427668366997,
                -9.85028309782475
              ],
              [
                -69.66427668366997,
                -10.409960117024408
              ],
              [
                -68.78399714265434,
                -10.409960117024408
              ],
              [
                -68.78399714265434,
                -9.85028309782475
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-69.66427668366997, -9.85028309782475],
          [-69.66427668366997, -10.409960117024408],
          [-68.78399714265434, -10.409960117024408],
          [-68.78399714265434, -9.85028309782475]]], null, false),
    gpd = ui.import && ui.import("gpd", "table", {
      "id": "users/renankami/imoveis_AC"
    }) || ee.FeatureCollection("users/renankami/imoveis_AC");
// NORMALIZED BURNED AREA INDEX - NBR - MEASRURING FIRE SEVERITY - REMOTE SENSING
// 2019 DRY SEASON - APR/MAY (EX ANTE FIRE) TO INITIAL AUG (EX POST)
// CONTRASTING VEGETATION BURNED WITH SENTINEL MSI 2A IMAGERY
// RENAN A. KAMIMURA (renankami@gmail.com)
// SOURCES:
// Keeley (2009) Fire intensity, fire severity and burn severity: a brief review and suggested usage. International Journal of Wildland Fire.
// Key & Benson (2009) Landscape Assessment (LA) Sampling and Analysis Methods. USDA Forest Service.
// 1) SET TIME FRAME - TEMPORAL WINDOW - EX ANTE FIRE
var prefire_start = '2020-06-08';   
var prefire_end = '2020-06-20';
// 2) SET TIME FRAME - TEMPORAL WINDOW - EX POST FIRE
var postfire_start = '2020-09-10';
var postfire_end = '2020-09-20';
// 3) SHOW IN CONSOLE WINDOW START / END DATE OF FIRE EVENTS
print(ee.String('Fire period ').cat(prefire_end).cat(' and ').cat(postfire_end));
// 4) ADD STUDY AREA BOUDARIES WITH SHAPEFILE
var area = ee.FeatureCollection(geometry);
// 5) SET STUDY AREA AS CENTER IN A WINDOW VISUALIZATION
Map.centerObject(area);
// 6) SELECTED SENTINEL IMAGES SELECTED ABOVE
var S2 = ee.ImageCollection("COPERNICUS/S2_SR"); //BOA
//var S2 = ee.ImageCollection("COPERNICUS/S2"); //TOA
var imagery = ee.ImageCollection(S2);
// 7) TIME AND AREA FILTERS TO SEARCH IMAGES - LESS 20% CLOUD COVER - FILTERING IMAGENS FROM PERIODS: MAY-JUNE (PRE FIRE) & SEP-NOV (POST FIRE)
var prefireImCol = ee.ImageCollection(imagery
    .filterDate(prefire_start, prefire_end)
    .filterBounds(area))
    .sort("CLOUDY_PIXEL_PERCENTAGE")
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));
// 8) SELECT IMAGES OVERLAPING IN STUDY AREA - LESS 20% CLOUD COVER - FILTERING IMAGENS FROM PERIODS: MAY-JUNE (PRE FIRE) & SEP-NOV (POST FIRE)
var postfireImCol = ee.ImageCollection(imagery
    .filterDate(postfire_start, postfire_end)
    .filterBounds(area))
    .sort("CLOUDY_PIXEL_PERCENTAGE")
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));
print(prefireImCol)
print(postfireImCol)
// 9) MOSAIC AND CLIP IMAGERY TO STUDY AREA WITH CLOUD, WATER AND NOISY
var pre_mos = prefireImCol.mosaic().clip(area);
var post_mos = postfireImCol.mosaic().clip(area);
//Map.addLayer(pre_mos,'Pre-fire mosaic - Sentinel MSI 2A');
//Map.addLayer(post_mos,'Post-fire mosaic - Sentinel MSI 2A');
// 10) APPLY A CLOUD MASK
// 10.1) MASK 1 = CLOUDS, CIRRUS & QA BANDS 
function maskS2sr(image) {
  var cloudBitMask = ee.Number(2).pow(10).int();  // Bits 10 - clouds 
  var cirrusBitMask = ee.Number(2).pow(11).int(); // Bits 11 - cirrus
  var qa = image.select('QA60'); // Get the pixel QA band.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0) // All flags should be set to zero, indicating clear conditions
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
// IMAGERY WITH THE FIRST CLOUD MASK - STEP 1
var prefire_CM_ImCol_1 = prefireImCol.map(maskS2sr);
var postfire_CM_ImCol_1 = postfireImCol.map(maskS2sr);
// 10.2) MASK 2 = SCENE CLASSIFICATION (SCL) BAND
  function mask_scl_band(image) {
    var scl = image.select('SCL');
    var mask = scl.eq(1).eq(0) // saturated or defective
               .and(scl.eq(2).eq(0)) // dark area pixels
               .and(scl.eq(3).eq(0)) // cloud shadows
               //.and(scl.eq(5).eq(0)) // bare soils
               .and(scl.eq(6).eq(0)) // water
               //.and(scl.eq(7).eq(0)) // unclassified
               .and(scl.eq(8).eq(0)) // clouds medium probability
               .and(scl.eq(9).eq(0)) // clouds high probability
               .and(scl.eq(10).eq(0)) // cirrus
               .and(scl.eq(11).eq(0)); // snow/ice
    return image.updateMask(mask)
        .copyProperties(image, ["system:time_start"]);
  }
// IMAGERY WITH THE SECOND STEP OF CLOUD, NOISY AND WATER MASK - STEP 2
var prefire_CM_ImCol = prefire_CM_ImCol_1.map(mask_scl_band);
var postfire_CM_ImCol = postfire_CM_ImCol_1.map(mask_scl_band);
// 11) MOSAIC AND CLIP IMAGERY TO STUDY AREA WITHOUT CLOUDS, WATER AND NOISY
var pre_cm_mos = prefire_CM_ImCol_1.mosaic().clip(area);
var post_cm_mos = postfire_CM_ImCol_1.mosaic().clip(area);
// 12) Calculate NBR for pre and post fire images with cloud mask 1 & 2
// NBR = (NIR-SWIR2) / (NIR+SWIR2)
var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
// Add the NBR images to the console on the right
//print("Pre-fire Normalized Burn Ratio: ", preNBR); 
//print("Post-fire Normalized Burn Ratio: ", postNBR);
// 13) DIFERENCE NBR or dNBR = EX ANTE - EX POST FIRE
var dNBR_unscaled = preNBR.subtract(postNBR);
// 14) CHANGE ESCALE OF DATA
var dNBR = dNBR_unscaled.multiply(1000);
// 15) ADDING MOSAIC DATASETS OF S2 PANTANAL'S IMAGERY
// 15.1) FALSE COLOR WITH CLOUDS
//Map.addLayer(pre_mos, vis,'Pre-fire mosaic - Sentinel MSI 2A');
//Map.addLayer(post_mos, vis,'Post-fire mosaic - Sentinel MSI 2A');
// 15.2) FALSE COLOR WITHOUT CLOUDS
// STANDARD PARAMETERS IN IMAGERY HISTOGRAM
var vis = {bands: ['B4', 'B8', 'B3'], 'gain': '0.12, 0.08, 0.1'};
//var vis_post = {bands: ['B4', 'B8', 'B3'], 'gain': '0.115, 0.8, 0.1'};
Map.addLayer(pre_cm_mos, vis,'Pre-fire False Color Image');
Map.addLayer(post_cm_mos, vis,'Post-fire False Color Image');
// 15.3) HISTOGRAM WITH NBR EX ANTE & EX POST
//var histogram_ante = ui.Chart.image.histogram(pre_cm_mos, area, 90)
//var histogram_post = ui.Chart.image.histogram(pos_cm_mos, area, 90)
// Display the histogram.
//print(histogram_ante);
//print(histogram_post);
// 16) EX ANTE, EX POST NBR & DELTA NBR IN GREYSCALE
var grey = ['white', 'black'];
var red = ['red', 'white'];
//Map.addLayer(preNBR, {min: -0.3, max: 0.3, palette: red}, 'Prefire NBR');
//Map.addLayer(postNBR, {min: -0.3, max: 0.3, palette: red}, 'Postfire NBR');
Map.addLayer(dNBR, {min: -300, max: 600, palette: grey}, 'dNBR continous');
//var histogram_dNBR = ui.Chart.image.histogram(dNBR, 210)
//print(histogram_dNBR);
// 17) CATEGORICAL (CLASSIFYING) DELTA NBR
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Add the image to the map using both the color ramp and interval schemes.
Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
// 28) ADD LAYER SHAPEFILE GPD's BOUNDARIES
var styling = {color: 'purple', fillColor: '00000000'};
Map.addLayer(gpd.style(styling));
//Map.addLayer(gpd, {color: 'blue'},'GPD Boundaries');
// 18) RECLASSIFING CONTINIUS DELTA NBR TO CATEGORICAL DATA (8 burn severity classes) 
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// 19) MEASURE AREA BURNED = COUNT NUMBER OF PIXELS IN EACH CLASS
var allpix =  classified.updateMask(classified);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  maxPixels: 1e20,
  scale: 30
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
// 20) Create an empty list to store area values in
var arealist = [];
// 21) Create a function to derive extent of one burn severity class // Arguments are class number and class name
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  maxPixels: 1e20,
  scale: 30
  });
// Divide area PER pixel by 10000 transforming square meters to hectare
// Sentinel NBR pixel = 20m x 20m = 400 square meters 
// Landsat pixel = 30m x 30m = 900 square meters
var pix =  ee.Number(stats.get('sum'));                                   
var hect = pix.multiply(900).divide(10000);                              
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
};
// 22) Severity classes in different order
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Unburned ?','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// 23) execute function for each class
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
//   ADD A LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'dNBR Classes',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
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
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// name of the legend
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Unburned ?',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
/*
// 32) PREPARE FILE EXPORT TO GDRIVE
// 32A) DELTA NBR - 30 METER OF SPATIAL RESOLUTION
var id = dNBR.id().getInfo();
Export.image.toDrive({image: dNBR, scale: 30, description: id, fileNamePrefix: 'dNBR_01May_05Nov_2020_Water_2',
region: area, maxPixels: 1e12});
// 32B) MOSAIC S2 FALSE COMPOSITE - 20 METER OF SPATIAL RESOLUTION
var mosaic_post = post_cm_mos.select(['B4', 'B8', 'B3']);
Export.image.toDrive({image: mosaic_post, scale: 20, description: 'S2_mosaic-post_fire', fileNamePrefix: 'post_fire_mosaic',
region: area, maxPixels: 1e12});
// 33A) EXPORTING EX POST FIRE NBR
Export.image.toDrive({image: postNBR, scale: 30, description: 'S2_post_NBR', fileNamePrefix: 'S2_post_NBR',
region: area, maxPixels: 1e12});
// 33B) EXPORTING EX ANTE FIRE NBR
Export.image.toDrive({image: preNBR, scale: 30, description: 'S2_pre_NBR', fileNamePrefix: 'S2_pre_NBR',
region: area, maxPixels: 1e12});
*/