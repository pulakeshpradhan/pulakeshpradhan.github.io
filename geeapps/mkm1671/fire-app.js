var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.8826660911498,
                38.70103678375369
              ],
              [
                -122.86755988997793,
                38.651719636420204
              ],
              [
                -122.8716797630248,
                38.61846500464432
              ],
              [
                -122.85245368880605,
                38.60236851587527
              ],
              [
                -122.79752204818105,
                38.545465338128764
              ],
              [
                -122.75906989974355,
                38.52720382956075
              ],
              [
                -122.72748420638418,
                38.55405738507393
              ],
              [
                -122.72473762435293,
                38.65600943285699
              ],
              [
                -122.81262824935293,
                38.768524683266754
              ],
              [
                -122.9046387473998,
                38.7117534059433
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
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.8826660911498, 38.70103678375369],
          [-122.86755988997793, 38.651719636420204],
          [-122.8716797630248, 38.61846500464432],
          [-122.85245368880605, 38.60236851587527],
          [-122.79752204818105, 38.545465338128764],
          [-122.75906989974355, 38.52720382956075],
          [-122.72748420638418, 38.55405738507393],
          [-122.72473762435293, 38.65600943285699],
          [-122.81262824935293, 38.768524683266754],
          [-122.9046387473998, 38.7117534059433]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 425.44,
        "max": 2270.56,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":425.44,"max":2270.56,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B12",
          "B8",
          "B4"
        ],
        "min": 294.45,
        "max": 2428.05,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B12","B8","B4"],"min":294.45,"max":2428.05,"gamma":1},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B12",
          "B8",
          "B4"
        ],
        "min": 294.45,
        "max": 2428.05,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B12","B8","B4"],"min":294.45,"max":2428.05,"gamma":1},
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.811994467989,
                38.768607330442244
              ],
              [
                -122.82538405539134,
                38.762450372219625
              ],
              [
                -122.83225051046946,
                38.750402613010586
              ],
              [
                -122.84907332541087,
                38.74611847521525
              ],
              [
                -122.85822333564505,
                38.741575040179235
              ],
              [
                -122.84826697578177,
                38.733808891092266
              ],
              [
                -122.85067023505911,
                38.72979158606839
              ],
              [
                -122.86474646796927,
                38.72389913004363
              ],
              [
                -122.8774494098638,
                38.728452434189705
              ],
              [
                -122.89049567451224,
                38.72041699579284
              ],
              [
                -122.88706244697318,
                38.709969575001296
              ],
              [
                -122.8777927326177,
                38.709969575001296
              ],
              [
                -122.85170020332083,
                38.714791651268875
              ],
              [
                -122.84723700752005,
                38.72229201224299
              ],
              [
                -122.84311713447318,
                38.71532741744188
              ],
              [
                -122.85170020332083,
                38.71077327696775
              ],
              [
                -122.8554767536138,
                38.70273585072241
              ],
              [
                -122.84895362128958,
                38.69255381382744
              ],
              [
                -122.8331607746099,
                38.68773023780533
              ],
              [
                -122.81015815009818,
                38.68585431485718
              ],
              [
                -122.79951514472708,
                38.686390297861074
              ],
              [
                -122.7950519489263,
                38.6847823368047
              ],
              [
                -122.80123175849661,
                38.67969022174429
              ],
              [
                -122.80153253295599,
                38.66553167869055
              ],
              [
                -122.7853963635224,
                38.658025364369806
              ],
              [
                -122.78182672650894,
                38.65121610258155
              ],
              [
                -122.79418634564956,
                38.64692601910683
              ],
              [
                -122.78114008100113,
                38.637808738823026
              ],
              [
                -122.78182672650894,
                38.62708104176916
              ],
              [
                -122.77152704389175,
                38.63217689802994
              ],
              [
                -122.76637720258316,
                38.638076910681214
              ],
              [
                -122.74406122357925,
                38.625471748756816
              ],
              [
                -122.76672052533706,
                38.623057741518785
              ],
              [
                -122.7687804618605,
                38.61527872097676
              ],
              [
                -122.7629439750441,
                38.610449939053055
              ],
              [
                -122.77221368939956,
                38.6013280197687
              ],
              [
                -122.796246282173,
                38.63351785263756
              ],
              [
                -122.81890558393081,
                38.64102673489942
              ],
              [
                -122.81203912885269,
                38.61420568641548
              ],
              [
                -122.83126520307144,
                38.611523029790995
              ],
              [
                -122.83881830365738,
                38.606157415600954
              ],
              [
                -122.82989191205581,
                38.5814704226117
              ],
              [
                -122.80036615521988,
                38.56214424599412
              ],
              [
                -122.78937982709488,
                38.55409013814918
              ],
              [
                -122.76672052533706,
                38.53099669446281
              ],
              [
                -122.75161432416519,
                38.53636792446275
              ],
              [
                -122.74062799604019,
                38.55570103191342
              ],
              [
                -122.73513483197769,
                38.57502894137291
              ],
              [
                -122.73101495893081,
                38.61474220570246
              ],
              [
                -122.72414850385269,
                38.655505929170936
              ],
              [
                -122.79143976361831,
                38.74660399907977
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.811994467989, 38.768607330442244],
          [-122.82538405539134, 38.762450372219625],
          [-122.83225051046946, 38.750402613010586],
          [-122.84907332541087, 38.74611847521525],
          [-122.85822333564505, 38.741575040179235],
          [-122.84826697578177, 38.733808891092266],
          [-122.85067023505911, 38.72979158606839],
          [-122.86474646796927, 38.72389913004363],
          [-122.8774494098638, 38.728452434189705],
          [-122.89049567451224, 38.72041699579284],
          [-122.88706244697318, 38.709969575001296],
          [-122.8777927326177, 38.709969575001296],
          [-122.85170020332083, 38.714791651268875],
          [-122.84723700752005, 38.72229201224299],
          [-122.84311713447318, 38.71532741744188],
          [-122.85170020332083, 38.71077327696775],
          [-122.8554767536138, 38.70273585072241],
          [-122.84895362128958, 38.69255381382744],
          [-122.8331607746099, 38.68773023780533],
          [-122.81015815009818, 38.68585431485718],
          [-122.79951514472708, 38.686390297861074],
          [-122.7950519489263, 38.6847823368047],
          [-122.80123175849661, 38.67969022174429],
          [-122.80153253295599, 38.66553167869055],
          [-122.7853963635224, 38.658025364369806],
          [-122.78182672650894, 38.65121610258155],
          [-122.79418634564956, 38.64692601910683],
          [-122.78114008100113, 38.637808738823026],
          [-122.78182672650894, 38.62708104176916],
          [-122.77152704389175, 38.63217689802994],
          [-122.76637720258316, 38.638076910681214],
          [-122.74406122357925, 38.625471748756816],
          [-122.76672052533706, 38.623057741518785],
          [-122.7687804618605, 38.61527872097676],
          [-122.7629439750441, 38.610449939053055],
          [-122.77221368939956, 38.6013280197687],
          [-122.796246282173, 38.63351785263756],
          [-122.81890558393081, 38.64102673489942],
          [-122.81203912885269, 38.61420568641548],
          [-122.83126520307144, 38.611523029790995],
          [-122.83881830365738, 38.606157415600954],
          [-122.82989191205581, 38.5814704226117],
          [-122.80036615521988, 38.56214424599412],
          [-122.78937982709488, 38.55409013814918],
          [-122.76672052533706, 38.53099669446281],
          [-122.75161432416519, 38.53636792446275],
          [-122.74062799604019, 38.55570103191342],
          [-122.73513483197769, 38.57502894137291],
          [-122.73101495893081, 38.61474220570246],
          [-122.72414850385269, 38.655505929170936],
          [-122.79143976361831, 38.74660399907977]]]);
// Set start and end dates of a period BEFORE the fire. Make sure it is long enough for 
// Sentinel-2 to acquire an image (repetition rate = 5 days). Adjust these parameters, if
// your ImageCollections (see Console) do not contain any elements.
var prefire_start = '2018-11-10';   
var prefire_end = '2018-12-01';
// Now set the same parameters for AFTER the fire.
var postfire_start = '2019-11-10';
var postfire_end = '2019-12-01';
var imagery = ee.ImageCollection('COPERNICUS/S2');
// In the following lines imagery will be collected in an ImageCollection, depending on the
// location of our study area, a given time frame and the ratio of cloud cover.
var prefireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(prefire_start, prefire_end)
    // Filter by location.
    .filterBounds(geometry));
// Select all images that overlap with the study area from a given time frame 
var postfireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(postfire_start, postfire_end)
    // Filter by location.
    .filterBounds(geometry));
// Add the clipped images to the console on the right
print("Pre-fire Image Collection: ", prefireImCol); 
print("Post-fire Image Collection: ", postfireImCol)
// Function to mask clouds from the pixel quality band of Sentinel-2 SR data.
function maskS2sr(image) {
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Get the pixel QA band.
  var qa = image.select('QA60');
  // All flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
//Apply Cloud Mask
var prefire_CM_ImCol = prefireImCol.map(maskS2sr);
var postfire_CM_ImCol = postfireImCol.map(maskS2sr);
var pre_cm_mos = prefire_CM_ImCol.median().clip(geometry);
var post_cm_mos = postfire_CM_ImCol.median().clip(geometry);
Map.addLayer(pre_cm_mos);
Map.addLayer(post_cm_mos);
Map.addLayer(post_cm_mos, imageVisParam, 'Burned Area False Color');
Map.addLayer(post_cm_mos, imageVisParam2, 'Burned Area SWIR');
var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
Map.addLayer(preNBR, {}, 'Pre fire NBR');
Map.addLayer(postNBR, {}, 'Post fire NBR');
// The result is called delta NBR or dNBR
var dNBR_unscaled = preNBR.subtract(postNBR);
// Scale product to USGS standards
var dNBR = dNBR_unscaled.multiply(1000);
// Add the difference image to the console on the right
print("Difference Normalized Burn Ratio: ", dNBR);
//------------------------- Burn Ratio Product - Classification ----------------------------
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
//==========================================================================================
//                                    ADD A LEGEND
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
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Separate result into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// count number of pixels in entire layer
var allpix =  classified.updateMask(classified);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               
  geometry: geometry2,
  scale: 20, 
  maxPixels: 1e9
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
print(allpixels, 'allpixels')
// create an empty list to store area values in
var arealist = [];
// create a function to derive extent of one burn severity class
// arguments are class number and class name
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: geometry2,
  scale: 20,
  maxPixels: 1e9
  });
var pix =  ee.Number(stats.get('sum'));
var hect = pix.multiply(400).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
};
// severity classes in different order
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// execute function for each class
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
var images = {
  'Before SWIR': pre_cm_mos.visualize({bands:["B12","B8","B4"], min: 74.68, max: 2747.32}),
  'Burned SWIR': post_cm_mos.visualize({bands:["B12","B8","B4"], min: 74.68, max: 2747.32}),
  'dNBR': dNBR.sldStyle(sld_intervals)
};
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-122.7596, 38.7498, 12);