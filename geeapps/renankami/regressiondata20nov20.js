var gfed_filter = ui.import && ui.import("gfed_filter", "table", {
      "id": "users/renankami/GFED_500ha_03nov20"
    }) || ee.FeatureCollection("users/renankami/GFED_500ha_03nov20"),
    gfed_no_filter = ui.import && ui.import("gfed_no_filter", "table", {
      "id": "users/renankami/GFED_20200924_28ha"
    }) || ee.FeatureCollection("users/renankami/GFED_20200924_28ha"),
    pantanal = ui.import && ui.import("pantanal", "table", {
      "id": "users/renankami/limites_pantanal"
    }) || ee.FeatureCollection("users/renankami/limites_pantanal"),
    protected_areas = ui.import && ui.import("protected_areas", "table", {
      "id": "users/renankami/ptn_protected_areas"
    }) || ee.FeatureCollection("users/renankami/ptn_protected_areas"),
    forest_types = ui.import && ui.import("forest_types", "image", {
      "id": "users/renankami/ptn_forest_types"
    }) || ee.Image("users/renankami/ptn_forest_types"),
    land_use = ui.import && ui.import("land_use", "image", {
      "id": "users/renankami/ptn_land_use"
    }) || ee.Image("users/renankami/ptn_land_use"),
    biomass = ui.import && ui.import("biomass", "image", {
      "id": "users/renankami/ptn_biomass_abg"
    }) || ee.Image("users/renankami/ptn_biomass_abg"),
    soil_carbon = ui.import && ui.import("soil_carbon", "image", {
      "id": "users/renankami/ptn_soil_carbon"
    }) || ee.Image("users/renankami/ptn_soil_carbon"),
    hand = ui.import && ui.import("hand", "image", {
      "id": "users/renankami/ptn_hand"
    }) || ee.Image("users/renankami/ptn_hand"),
    gfc = ui.import && ui.import("gfc", "image", {
      "id": "UMD/hansen/global_forest_change_2019_v1_7"
    }) || ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    canopy_height = ui.import && ui.import("canopy_height", "image", {
      "id": "NASA/JPL/global_forest_canopy_height_2005"
    }) || ee.Image("NASA/JPL/global_forest_canopy_height_2005"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "slope"
        ],
        "min": -0.01327276026189346,
        "max": 0.17914670315284453,
        "palette": [
          "ce7e45",
          "011d01"
        ]
      }
    }) || {"opacity":1,"bands":["slope"],"min":-0.01327276026189346,"max":0.17914670315284453,"palette":["ce7e45","011d01"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 1.7841910202135054,
        "max": 72.06704864920798,
        "palette": [
          "5de425",
          "008000",
          "b3d65c",
          "41ffd2"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":1.7841910202135054,"max":72.06704864920798,"palette":["5de425","008000","b3d65c","41ffd2"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "1"
        ],
        "min": 0.17141998651256074,
        "max": 8.173157452732996,
        "palette": [
          "808000",
          "cf55d8",
          "b1123f"
        ]
      }
    }) || {"opacity":1,"bands":["1"],"min":0.17141998651256074,"max":8.173157452732996,"palette":["808000","cf55d8","b1123f"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 22.079770407479685,
        "max": 36.37632587813114,
        "palette": [
          "808000",
          "800000",
          "fff72b"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":22.079770407479685,"max":36.37632587813114,"palette":["808000","800000","fff72b"]},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 6.6461036237090845,
        "max": 15.369822056450172,
        "palette": [
          "9f9f00",
          "008000",
          "49e82b",
          "5cf8ff",
          "ffed21"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":6.6461036237090845,"max":15.369822056450172,"palette":["9f9f00","008000","49e82b","5cf8ff","ffed21"]},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 8.571193549001153,
        "max": 14.594035382651137,
        "palette": [
          "29b33a",
          "800000",
          "54ff3f",
          "ff70fb",
          "ff9144",
          "ca3cb3"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":8.571193549001153,"max":14.594035382651137,"palette":["29b33a","800000","54ff3f","ff70fb","ff9144","ca3cb3"]};
// NORMALIZED BURNED AREAS - PANTANAL DRY SEASON 2020
// CONTRASTING VEGETATION IMAGERY: EX ANTE FIRE & EX POST FIRE
// RENAN A. KAMIMURA (renankami@gmail.com)
// NORMALIZED BURNED AREAS - PANTANAL DRY SEASON 2020
// CONTRASTING VEGETATION IMAGERY: EX ANTE FIRE & EX POST FIRE
// RENAN A. KAMIMURA (renankami@gmail.com)
// SOURCES:
// Keeley (2009) Fire intensity, fire severity and burn severity: a brief review and suggested usage. International Journal of Wildland Fire.
// Key & Benson (2009) Landscape Assessment (LA) Sampling and Analysis Methods. USDA Forest Service.
// SET TIME FRAME - TEMPORAL WINDOW - EX ANTE FIRE
var prefire_start = '2020-05-01';   
var prefire_end = '2020-06-25';
// SET TIME FRAME - TEMPORAL WINDOW - EX EX POST FIRE
var postfire_start = '2020-09-01';
var postfire_end = '2020-11-05';
// SHOW IN CONSOLE WINDOW START AND END DATE OF FIRE EVENTS
print(ee.String('Fire EVENT occurred between').cat(prefire_end).cat(' and ').cat(postfire_end));
// INPUT COLLECTION OF SENTINEL MSI 2A - SURFACE REFLECTANCE
// STUDY AREA - BRAZILIAN BIOME OF PANTANAL (TROPICAL WETLAND)
var area = ee.FeatureCollection(pantanal);
// SET STURY AREA AS CENTER IN WINDOW VISUALIZATION
Map.centerObject(area);
// SELECTED IMAGENS OF SENTINEL VARIABLE
var imagery = ee.ImageCollection(S2);
// TIME AND AREA FILTERS TO SEARCH SENTINEL IMAGES
var prefireImCol = ee.ImageCollection(imagery
    .filterDate(prefire_start, prefire_end)
    .filterBounds(area));
// SELECT IMAGES OVERLAP IN STUDY AREA
var postfireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(postfire_start, postfire_end)
    // Filter by location.
    .filterBounds(area));
// Add the clipped images to the console on the right
//print("Pre-fire Image Collection: ", prefireImCol); 
//print("Post-fire Image Collection: ", postfireImCol);
// Mosaic and clip images to study area with clouds 
var pre_mos = prefireImCol.mosaic().clip(area);
var post_mos = postfireImCol.mosaic().clip(area);
// Apply a cloud mask
// Mask 1 = clouds from the pixel quality band
function maskS2sr(image) {
  var cloudBitMask = ee.Number(2).pow(10).int();  // Bits 10 - clouds 
  var cirrusBitMask = ee.Number(2).pow(11).int(); // Bits 11 - cirrus
  var qa = image.select('QA60'); // Get the pixel QA band.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0) // All flags should be set to zero, indicating clear conditions
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
// Images with cloud mask 1
var prefire_CM_ImCol_1 = prefireImCol.map(maskS2sr);
var postfire_CM_ImCol_1 = postfireImCol.map(maskS2sr);
//Mask 2 - Scene classification (SCL)
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
// Images with cloud mask 2
var prefire_CM_ImCol = prefire_CM_ImCol_1.map(mask_scl_band);
var postfire_CM_ImCol = postfire_CM_ImCol_1.map(mask_scl_band);
// Mosaic and clip images to study area without clouds
var pre_cm_mos = prefire_CM_ImCol.mosaic().clip(area);
var post_cm_mos = postfire_CM_ImCol.mosaic().clip(area);
// Calculate NBR for pre and post fire images with cloud mask 1 & 2
// NBR = (NIR-SWIR2) / (NIR+SWIR2)
var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
// Add the NBR images to the console on the right
//print("Pre-fire Normalized Burn Ratio: ", preNBR); 
//("Post-fire Normalized Burn Ratio: ", postNBR);
//------------------ Calculate difference between pre- and post-fire images ----------------
// The result is called delta NBR or dNBR
var dNBR_unscaled = preNBR.subtract(postNBR);
// Scale product to USGS standards
var dNBR = dNBR_unscaled.multiply(1000);
// Add the difference image to the console on the right
//print("Difference Normalized Burn Ratio: ", dNBR);
// False Color Imagery without cloud mask
var vis = {bands: ['B4', 'B8', 'B3'], 'gain': '0.12, 0.08, 0.1'};
//Map.addLayer(pre_mos, vis,'Pre-fire mosaic - Sentinel MSI 2A');
//Map.addLayer(post_mos, vis,'Post-fire mosaic - Sentinel MSI 2A');
// False color images to the map with cloud mask
Map.addLayer(pre_cm_mos, vis,'Pre-fire False Color Image');
Map.addLayer(post_cm_mos, vis,'Post-fire False Color Image');
//--------------------------- Burn Ratio Product - Greyscale -------------------------------
var grey = ['white', 'black'];
// Remove comment-symbols (//) below to display pre and post-fire NBR seperately
//Map.addLayer(preNBR, {min: -1, max: 1, palette: grey}, 'Prefire NBR');
//Map.addLayer(postNBR, {min: -1, max: 1, palette: grey}, 'Postfire NBR');
Map.addLayer(dNBR, {min: -500, max: 600, palette: grey}, 'dNBR continous');
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
// CANOPY HEIGHT 30 METERS
//var canopy_height = ee.FeatureCollection("users/potapovpeter/GEDI_V27");
//print(canopy_height)
//Map.addLayer(canopy_height);
//var canopy_height_clip = canopy_height.clip(area);
//Map.addLayer(canopy_height_clip, {min: 5, max: 20, palette: ['#808000', '#00FF00']}, 'Canopy_Height');
// Add landforms and tree cover from GEE 
var elevation = srtm.select('elevation');
var slope = ee.Terrain.slope(elevation);
var tree_cover = gfc.select(['treecover2000']);
// Clip GEE's raster data to study area
var elevation_clip = elevation.clip(area);
var slope_clip = slope.clip(area);
var tree_cover_clip = tree_cover.clip(area);
var canopy_height_clip = canopy_height.clip(area);
// Add maplayers: forest types & structure and landforms
Map.addLayer(elevation_clip, {min: 100, max: 200, palette: ['#808080', '#800080']}, 'Elevation');
Map.addLayer(slope_clip, {min: 2, max: 8, palette: ['CE7E45', '011D01']}, 'Slope');
Map.addLayer(hand, {min: 1, max: 40, palette: ['00FFFF', '#000080']}, 'HAND');
Map.addLayer(tree_cover_clip, {min: 10, max: 80, palette: ['#00FFFF', '#008000']}, 'Tree Cover');
Map.addLayer(canopy_height_clip, {min: 5, max: 20, palette: ['#808000', '#00FF00']}, 'Canopy_Height');
Map.addLayer(biomass, {min: 1, max: 100, palette: ['#008000', '#00FFFF']}, 'Aboveground biomass');
Map.addLayer(soil_carbon, {min: 1, max: 30, palette: ['#808000', '#800000']}, 'Soil Organic Carbon');
Map.addLayer(forest_types, {min: 1, max: 30, palette: ['#808000', '#008000']}, 'Forest types');
Map.addLayer(land_use, {min: 5, max: 30, palette: ['#800080', '#800000']}, 'Land use 2019');
// Panatanal's boundaries
//var styling = {color: 'purple', fillColor: '00000000'};
//Map.addLayer(pantanal.style(styling));
//Map.addLayer(pantanal, {color: 'blue'},'Boundaries of Pantanal')
// Burned areas - Main scars - GFED
//var styling_A = {color: 'red', fillColor: '00000000'};
//Map.addLayer(gfed_filter.style(styling_A));
Map.addLayer(gfed_filter, {color: 'red'}, 'GFED Burned Scars > 500 ha')
//Map.addLayer(gfed_no_filter, {color: '#FF00FF', fillcolor: '00000'}, 'GFED Burned Scars > 28 ha')
// Protected areas
Map.addLayer(protected_areas, {color: 'green'},'Protected Areas')
// Measuring burn severity into classes
// Reclassifing dNBR continous data to categorical data (8 burn severity classes)
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// Count number of pixels in each class
var allpix =  classified.updateMask(classified);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  maxPixels: 1e20,
  scale: 30
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
// Create an empty list to store area values in
var arealist = [];
// Create a function to derive extent of one burn severity class // Arguments are class number and class name
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  maxPixels: 1e20,
  scale: 30
  });                                                                      // divide area pixel by 10000 transforming square meters to hectares    
var pix =  ee.Number(stats.get('sum'));                                   // Sentinel NBR pixel = 20m x 20m = 400 square meters
var hect = pix.multiply(900).divide(10000);                              // Landsat pixel = 30m x 30m = 900 square meters
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
/*
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
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//==========================================================================================
//                                  PREPARE FILE EXPORT
var id = dNBR.id().getInfo();
Export.image.toDrive({image: dNBR, scale: 30, description: id, fileNamePrefix: 'dNBR_01May_05Nov_2020_Water_2',
region: area, maxPixels: 1e12});
// importando mosaico S2 em falsa composicao colorida
var mosaic_post = post_cm_mos.select(['B4', 'B8', 'B3']);
Export.image.toDrive({image: mosaic_post, scale: 20, description: 'S2_mosaic-post_fire', fileNamePrefix: 'post_fire_mosaic',
region: area, maxPixels: 1e12});
*/