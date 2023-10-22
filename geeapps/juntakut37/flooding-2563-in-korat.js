//
var korat = ee.FeatureCollection("users/juntakut37/korat"),
    s1 = ee.ImageCollection("COPERNICUS/S1_GRD");
Map.centerObject(korat);
Map.setOptions("TERRAIN");
Map.setControlVisibility(false);
Map.drawingTools().setShown(false);
var black = ee.Image(0);
var hole = ee.Image(1).clip(korat);
var stamp = black.where(hole, 1);
var mask = stamp.eq(0);
var background = stamp.updateMask(mask);
Map.addLayer(background, {opacity: 0.85}, 'Korat Mask');
// UI panel elements and their text
// -------------------------------------
var title_panel = ui.Panel({style:{'background-color':'000000', height: '150px'}});
var title_text = ui.Label("Nakhon Ratchasima Flooding in October, 2020 due to Tropical Strom Noul", {'background-color':'000000', 'fontSize': '28px', 'font-weight':'bold', 'color': 'orange'});
var selector_panel = ui.Panel({style:{'background-color':'333333'}});
var area_panel = ui.Panel({style:{'background-color':'555555', margin: '5px', padding: '5px'}});
var description_panel = ui.Panel({style:{'background-color':'333333'}});
var desc_spacer = ui.Label("", {'background-color':'333333'});
var desc_h1 = ui.Label("THE PURPOSE of THIS APP:", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para1 = ui.Label("This web app visualises and estimates flood extent in Nakhon Ratchasima Province, Thailand this year (2020), based on satellite images from the European Space Agency's Sentinel-1. Unlike conventional satellites, Sentinel-1 has a radar-based instrument capable of imaging the earth in all kinds of weather, during day or night. In overcast situations, radar imagery is often the only way to assess the extent of flooding.", {'background-color':'333333', color:'white'});
var desc_h2 = ui.Label("THE USE of THIS APP:", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para2 = ui.Label("From the drop-down menu above, choose an Amphoe of Nakhon Ratchasima Province for which you want to see a map of flooded areas. The map window on the right will then zoom to that Amphoe and show you the location and extent of flooding (in blue), in relation to the density of human settlements (in yellow to red) in that Amphoe.", {'background-color':'333333', color:'white'});
var desc_para3 = ui.Label("At the top-right corner, you'll see a button called 'Layers'. Clicking on that will show you all layers in this map that can be switched on/off. Don't forget to check out the 'Before Flooding' and 'After Flooding' layers; they show you the actual satellite images used to make the flood map.", {'background-color':'333333', color:'white'});
var desc_para4 = ui.Label("When you choose an Amphoe, the app also shows (in a panel below the drop-down) an estimate of the minimum extent of flooding in that Amphoe.", {'background-color':'333333', color:'white'});
var footer_panel = ui.Panel({style:{'background-color':'333333'}});
var footer_spacer = ui.Label("", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text1 = ui.Label("Please use these maps and numbers with caution. This analysis has limitations, and may suffer from both inclusion and exclusion errors. Flood areas may include wetlands/water bodies where water levels may have changed. Conversely, given that Sentinel-1 imagery are not available for the period of peak flooding, there is almost certain understimation of the extent of flooding.", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text2 = ui.Label("Col.Asst.Dr.Juntakut, P. | Chulachomklao Royal Military Academy (CRMA)", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
title_panel.add(title_text);
description_panel.add(desc_spacer);
description_panel.add(desc_h1);
description_panel.add(desc_para1);
description_panel.add(desc_h2);
description_panel.add(desc_para2);
description_panel.add(desc_para3);
description_panel.add(desc_para4);
footer_panel.add(footer_spacer);
footer_panel.add(footer_text1);
footer_panel.add(footer_text2);
//---------------------------------------------------------------------
//--------------------------------------------------------------
var panel = ui.Panel(
  [title_panel, selector_panel, area_panel, description_panel, footer_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '350px', 'background-color':'333333'}
  );
// -------------------------------------
//------------------------------------------
// Function to generate analyses and add map layers on the fly for a given taluk
function showFloodMap(amphoe) {
  area_panel.clear();
  Map.clear();
  Map.setOptions("TERRAIN");
  Map.setControlVisibility(false, true, true, false, true, false);
  Map.drawingTools().setShown(false);
  var amphoe = korat.filterMetadata('AMPHOE_E', 'equals', amphoe);
  Map.centerObject(amphoe);
//------------------------------  DAMAGE ASSSESSMENT  ----------------------------------//
//----------------------------- Exposed population density ----------------------------//
  // create a layer of human settlements
  var population_count = ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015").select("population_count").clip(amphoe);
  var pop = population_count.updateMask(population_count.gt(0));
  // Human Settlement Layer visualisation parameters
  var imageVisParam = {bands: ["population_count"], max: 412, opacity: 0.5, palette: ["ffffff","fff0a6","f79503","f70000"]};
// Calculate the amount of exposed population
// get GHSL projection
//var GHSLprojection = population_count.projection();
// Reproject flood layer to GHSL scale
//var flooded_res1 = flooded
//    .reproject({
 //   crs: GHSLprojection
 // });
// Create a raster showing exposed population only using the resampled flood layer
var population_exposed = population_count
 // .updateMask(flooded_res1)
  .updateMask(population_count);
//Sum pixel values of exposed population raster 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: amphoe,
  scale: 1000,
  maxPixels:1e9 
});
// get number of exposed people as integer
var number_pp_exposed = stats.getNumber('population_count').round();
//----------------------------- Affected agricultural land ----------------------------//
// using MODIS Land Cover Type Yearly Global 500m
// filter image collection by the most up-to-date MODIS Land Cover product 
var LC = ee.ImageCollection('MODIS/006/MCD12Q1')
  .filterDate('2019-01-01',after)
  .sort('system:index',false)
  .select("LC_Type1")
  .first()
  .clip(amphoe);
// Extract only cropland pixels using the classes cropland (>60%) and Cropland/Natural 
// Vegetation Mosaics: mosaics of small-scale cultivation 40-60% incl. natural vegetation
var cropmask = LC
  .eq(12)
  .or(LC.eq(14))
var cropland = LC
  .updateMask(cropmask)
// get MODIS projection
//var MODISprojection = LC.projection();
// Reproject flood layer to MODIS scale
//var flooded_res = flooded
   // .reproject({
  //  crs: MODISprojection
 // });
// Calculate affected cropland using the resampled flood layer
//var cropland_affected = flooded_res
var cropland_affected = cropland
  .updateMask(cropland)
// get pixel area of affected cropland layer
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// sum pixels of affected cropland layer
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: amphoe,
  scale: 5,
  maxPixels: 1e9
  });
// convert area to km2
var crop_affected = crop_stats
  .getNumber('LC_Type1')
  .divide(10000000)
  .round();
//-------------------------------- Affected urban area ------------------------------//  
 // Using the same MODIS Land Cover Product 
// Filter urban areas
var urbanmask = LC.eq(13)
var urban = LC
  .updateMask(urbanmask)
//Calculate affected urban areas using the resampled flood layer
var urban_affected = urban
  //.mask(flooded_res)
  .updateMask(urban);
// get pixel area of affected urban layer
var urban_pixelarea = urban_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// sum pixels of affected cropland layer
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: amphoe,
  scale: 500,
  bestEffort: true,
  });
// convert area to hectares
var urban_area_km2 = urban_stats
  .getNumber('LC_Type1')
  .divide(1000000)
  .round();
//------------------------------- FLOOD EXTENT CALCULATION -------------------------------//
  // include JRC layer on surface water seasonality to mask flood pixels from
  // areas of "permanent" water, i.e., where there is water > 10 months of the year
  // this value can be lowered for more aggressive masking
  var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
  var swater_mask = swater.gte(10).updateMask(swater.gte(10));
  // Load Sentinel-1
  var collection =  s1.filterBounds(amphoe)
                      .filterMetadata('orbitProperties_pass', 'equals', 'DESCENDING')
                      .select('VV');
                      // .aside(print);
  // Filter by date, and use median to reduce before collection, and minimum to reduce after collection
  var before = collection.filterDate('2020-07-15', '2020-08-10').median().aside(print);
  var after = collection.filterDate('2020-10-11', '2020-10-23').min().aside(print);
  // Raw difference between before and after images
  var diff_raw = after.subtract(before);
  // Threshold smoothed radar intensities to identify "flooded" areas.
  var DIFF_UPPER_THRESHOLD = -3; 
  // COMPUTING FLOODED AREA...
  // Using Difference Approach 1: Using Refined Lee Speckle Filter
  // Functions used below are defined at the bottom of the script
  var diff_lee = toDB(RefinedLee(toNatural(after))).subtract(toDB(RefinedLee(toNatural(before))));
  var diff_thresholded_lee = diff_lee.lt(DIFF_UPPER_THRESHOLD);
  var flooded_lee = diff_thresholded_lee.updateMask(diff_thresholded_lee)
                                        .clip(amphoe);
  // Using Difference Approach 2: Using Focal Median smoothing
  var SMOOTHING_RADIUS = 50;
  var diff_fmedian = after.focal_median(SMOOTHING_RADIUS, 'square', 'meters')
                          .subtract(before.focal_median(SMOOTHING_RADIUS, 'square', 'meters'));
  var diff_thresholded_fmedian = diff_fmedian.lt(DIFF_UPPER_THRESHOLD);
  var flooded_fmedian = diff_thresholded_fmedian.updateMask(diff_thresholded_fmedian)
                                                .clip(amphoe);
  var flooded = flooded_lee.unmask(flooded_fmedian);
                          // .reproject("EPSG:3857", null, 30)
  //flooded layer where perrenial water bodies (water > 10 mo/yr) is assigned a 0 value
  var flooded_mask = flooded.where(swater_mask,0);
  // final flooded area without pixels in perennial waterbodies
  var flooded = flooded.updateMask(flooded_mask);
  // Computing connectivity of pixels to eliminate those connected to 3 or fewer neighbours
  // Ideally, connectedPixelCount must be followed by reproject, but this hugely slows down
  // analyses if done at zoom levels less than 12. Hence dropped for visualisation purposes, 
  // but done below in the computation of flooded area
  var connections = flooded.connectedPixelCount(25);
                    // .reproject("EPSG:3857", null, 30)
  var final_flooded = flooded.updateMask(connections.gte(3));
                            // .reproject("EPSG:3857", null, 30)
                            // .aside(print)
  // Estimate flood-affected area  by district (choose in Line 7 above)
  var area_affected = final_flooded.reproject("EPSG:3857", null, 30)
                          .multiply(ee.Image.pixelArea())
                          .reduceRegion(ee.Reducer.sum(), korat, 30, null, null, true, 10000000, 4)
                          .get('sum');
  var area_affected = ee.Number(area_affected).float().divide(1000000).round().int()
  //-------------------------- Display the results on the map -----------------------//
  // Update computed flood area stats to UI panel
  area_panel.add(
    ui.Label("Minimum Extent of Flooding", {'background-color':'555555', fontSize: '16px', color:'gold'}));
  area_panel.add(
    ui.Label("based on Senintel-1 imagery", {'background-color':'555555', fontSize: '11px', color:'grey'}));
  area_panel.add(
    ui.Label(area_affected.getInfo()+" sq.km.", {'background-color':'555555', fontSize: '28px', color:'white', 'font-weight':'bold'}));
  // Update computed exposed people stats to UI panel
  area_panel.add(
    ui.Label("Exposed People", {'background-color':'555555', fontSize: '16px', color:'gold'}));
  area_panel.add(
    ui.Label("based on GHSL 2015 (250m)", {'background-color':'555555', fontSize: '11px', color:'grey'}));
  area_panel.add(
    ui.Label(number_pp_exposed.getInfo()+" peoples", {'background-color':'555555', fontSize: '28px', color:'white', 'font-weight':'bold'}));
  // Update computed affected crop area stats to UI panel
  area_panel.add(
    ui.Label("Affected Cropland", {'background-color':'555555', fontSize: '16px', color:'gold'}));
  area_panel.add(
    ui.Label("based on MODIS Land Cover 2019 (500m)", {'background-color':'555555', fontSize: '11px', color:'grey'}));
  area_panel.add(
    ui.Label(crop_affected.getInfo()+" sq.km.", {'background-color':'555555', fontSize: '28px', color:'white', 'font-weight':'bold'}));
  // Update computed affected crop area stats to UI panel
  area_panel.add(
    ui.Label("Affected Urban", {'background-color':'555555', fontSize: '16px', color:'gold'}));
  area_panel.add(
    ui.Label("based on MODIS Land Cover 2019 (500m)", {'background-color':'555555', fontSize: '11px', color:'grey'}));
  area_panel.add(
    ui.Label(urban_area_km2.getInfo()+" sq.km.", {'background-color':'555555', fontSize: '28px', color:'white', 'font-weight':'bold'}));
//------------------------------  DISPLAY PRODUCTS  ----------------------------------//
  var black = ee.Image(0);
  var hole = ee.Image(1).clip(amphoe);
  var stamp = black.where(hole, 1);
  var mask = stamp.eq(0);
  var background = stamp.updateMask(mask);
  Map.addLayer(background, {opacity: 0.85}, 'Korat Mask');
  Map.addLayer(before.clip(amphoe), {min: -20, max: 0}, 'Before Flooding', false);
  Map.addLayer(after.clip(amphoe), {min: -20, max: 0}, 'After Flooding', false);
  // Map.addLayer(diff_raw.clip(taluk), {min: -10, max: 10}, \'After - Before\', false); 
  // Map.addLayer(diff_lee.clip(taluk), {min: -10, max:10}, \'RLee Despeckled Diff\', false); 
  // Map.addLayer(flooded_lee, {palette:"#004cff", opacity: 0.8},\'Flooded Areas: RLee\', false);
  // Map.addLayer(diff_fmedian.clip(taluk), {min: -10, max: 10}, \'FMedian Smoothed Diff\', false); 
  // Map.addLayer(flooded_fmedian, {palette:"#004cff", opacity: 0.8},\'Flooded Areas: FMedian\', false);
//-------------------------------------------------- 
  // Urban
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['grey'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)
// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban', false); 
 //-------------------------------------------------- 
  // MODIS Land Cover
var LCVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
  Map.addLayer(LC, LCVis, 'Land Cover',0);
  // Cropland
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
  Map.addLayer(cropland, croplandVis, 'Cropland',0)
// Affected cropland
  Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland', false);
 //---------------------------------------
// Exposed Population
var populationExposedVis = {
  min: 0,
  max: 800.0,
  palette: ['yellow', 'orange', 'red'],
};
// Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population',0);
 //---------------------------------------------------------------- 
  Map.addLayer(pop, imageVisParam, 'Human Settlements', true);
  Map.addLayer(flooded, {palette:"#0000ff", opacity: 0.67},'Flooded Areas', true);
}
//----------------------------- Display legend on the map --------------------------//
// Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
// Create legend title
var legendTitle = ui.Label('Legend', {'fontWeight': 'bold', 'fontSize': '15px', 'margin': '10px 0 0 0', 'padding': '0'});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
//  Palette with the colors
var palette =['#0000FF', '#30b21c', 'grey'];
// name of the legend
var names = ['potentially flooded areas','affected cropland','affected urban'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Create second legend title to display exposed population density
var legendTitle2 = ui.Label({
value: 'Exposed population density',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
// Add second title to the panel
legend.add(legendTitle2);
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
var pallete = ["ffffff","fff0a6","f79503","f70000"];
// name of the legend
var names = ['Below 50', '50 - 500', '500-1000', 'Above 1000'];
// Add color and and names
for (var i = pallete.length; i > 0; i--) {
  legend.add(makeRow( pallete[i-1], names[i-1]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend );
//------------------------------------------------------------------------------
// Trigger the showFloodMap function each time an Amphoe name in dropdown changes
ee.List(korat.distinct('AMPHOE_E').aggregate_array('AMPHOE_E'))
     .sort()
     .evaluate(function(amphoe){
       selector_panel.add(ui.Select({
         placeholder: "Please Choose An Amphoe",
         items: amphoe,
         style: {fontSize: '20px',
         'color': 'blue',
         'background-color': "cccccc",
         width: '200px',
         height: '30px'},
         onChange: showFloodMap,
       }));
     });
// add UI elements at the same level as map window.
ui.root.insert(0, panel);
ui.Map();
////////////////////////////////////////////////////////////////////
// ************* Radar Imagery Processing Functions ************* //
////////////////////////////////////////////////////////////////////
// Functions to convert backscatter values from/to dB
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}
// The RL speckle filter from https://code.earthengine.google.com/2ef38463ebaf5ae133a478f173fd0ab5
// by Guido Lemoine
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it\'s directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
 // var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
 // Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it\'s directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result.arrayFlatten([['sum']]));
}