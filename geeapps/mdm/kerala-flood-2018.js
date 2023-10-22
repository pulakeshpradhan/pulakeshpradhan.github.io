var kerala = ee.FeatureCollection("users/mdm/kl_taluks"),
    s1 = ee.ImageCollection("COPERNICUS/S1_GRD");
Map.centerObject(kerala)
Map.setOptions("TERRAIN")
Map.setControlVisibility(false)
Map.drawingTools().setShown(false)
var black = ee.Image(0);
var hole = ee.Image(1).clip(kerala);
var stamp = black.where(hole, 1);
var mask = stamp.eq(0);
var background = stamp.updateMask(mask);
Map.addLayer(background, {opacity: 0.85}, 'Kerala Mask');
// UI panel elements and their text
// -------------------------------------
var title_panel = ui.Panel({style:{'background-color':'000000', height: '85px'}})
var title_text = ui.Label("Visualising the 2018 Kerala Floods", {'background-color':'000000', 'fontSize': '28px', 'font-weight':'bold', 'color': 'orange'});
var selector_panel = ui.Panel({style:{'background-color':'333333'}})
var area_panel = ui.Panel({style:{'background-color':'555555', margin: '5px', padding: '5px'}})
var description_panel = ui.Panel({style:{'background-color':'333333'}})
var desc_spacer = ui.Label("", {'background-color':'333333'});
var desc_h1 = ui.Label("WHAT DOES THIS APP DO?", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para1 = ui.Label("This web app visualises and estimates taluk-wise flood extent in Kerala this year (2018), based on satellite images from the European Space Agency's Sentinel-1. Unlike conventional satellites, Sentinel-1 has a radar-based instrument capable of imaging the earth in all kinds of weather, during day or night. In overcast situations, radar imagery is often the only way to assess the extent of flooding.", {'background-color':'333333', color:'white'});
var desc_h2 = ui.Label("HOW DO I USE THIS APP?", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para2 = ui.Label("From the drop-down menu above, choose a taluk of Kerala for which you want to see a map of flooded areas. The map window on the right will then zoom to that taluk and show you the location and extent of flooding (in blue), in relation to the density of human settlements (in yellow to red) in that taluk.", {'background-color':'333333', color:'white'});
var desc_para3 = ui.Label("At the top-right corner, you'll see a button called 'Layers'. Clicking on that will show you all layers in this map that can be switched on/off. Don't forget to check out the 'Before Flooding' and 'After Flooding' layers; they show you the actual satellite images used to make the flood map.", {'background-color':'333333', color:'white'});
var desc_para4 = ui.Label("When you choose a taluk, the app also shows (in a panel below the drop-down) an estimate of the minimum extent of flooding in that taluk.", {'background-color':'333333', color:'white'});
var footer_panel = ui.Panel({style:{'background-color':'333333'}})
var footer_spacer = ui.Label("", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text1 = ui.Label("DISCLAIMER & CAVEAT: Use these maps and numbers with caution. This analysis has limitations, and may suffer from both inclusion and exclusion errors. Flood areas may include wetlands/water bodies where water levels may have changed. Conversely, given that Sentinel-1 imagery are not available for the period of peak flooding, there is almost certain understimation of the extent of flooding.", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text2 = ui.Label("MD Madhusudan | @mdmadhusudan | mdm at ncf-india dot org", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
title_panel.add(title_text)
description_panel.add(desc_spacer)
description_panel.add(desc_h1)
description_panel.add(desc_para1)
description_panel.add(desc_h2)
description_panel.add(desc_para2)
description_panel.add(desc_para3)
description_panel.add(desc_para4)
footer_panel.add(footer_spacer)
footer_panel.add(footer_text1)
footer_panel.add(footer_text2)
var panel = ui.Panel(
  [title_panel, selector_panel, area_panel, description_panel, footer_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '350px', 'background-color':'333333'}
  )
// -------------------------------------
// Function to generate analyses and add map layers on the fly for a given taluk
function showFloodMap(taluk) {
  area_panel.clear()
  Map.clear()
  Map.setOptions("TERRAIN")
  Map.setControlVisibility(false, true, true, false, true, false)
  Map.drawingTools().setShown(false)
  var taluk = kerala.filterMetadata('taluk_name', 'equals', taluk)
  Map.centerObject(taluk);
  // create a layer of human settlements
  var pop = ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015").select("population_count").clip(taluk)
  var pop = pop.updateMask(pop.gt(0));
  // Human Settlement Layer visualisation parameters
  var imageVisParam = {bands: ["population_count"], max: 412, opacity: 0.5, palette: ["ffffff","fff0a6","f79503","f70000"]}
  // include JRC layer on surface water seasonality to mask flood pixels from
  // areas of "permanent" water, i.e., where there is water > 10 months of the year
  // this value can be lowered for more aggressive masking
  var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
  var swater_mask = swater.gte(10).updateMask(swater.gte(10));
  // Load Sentinel-1
  var collection =  s1.filterBounds(taluk)
                      .filterMetadata('orbitProperties_pass', 'equals', 'DESCENDING')
                      .select('VV')
                      // .aside(print);
  // Filter by date, and use median to reduce before collection, and minimum to reduce after collection
  var before = collection.filterDate('2018-07-15', '2018-08-10').median()//.aside(print);
  var after = collection.filterDate('2018-08-11', '2018-08-23').min()//.aside(print);
  // Raw difference between before and after images
  var diff_raw = after.subtract(before)
  // Threshold smoothed radar intensities to identify "flooded" areas.
  var DIFF_UPPER_THRESHOLD = -3; 
  // COMPUTING FLOODED AREA...
  // Using Difference Approach 1: Using Refined Lee Speckle Filter
  // Functions used below are defined at the bottom of the script
  var diff_lee = toDB(RefinedLee(toNatural(after))).subtract(toDB(RefinedLee(toNatural(before))))
  var diff_thresholded_lee = diff_lee.lt(DIFF_UPPER_THRESHOLD);
  var flooded_lee = diff_thresholded_lee.updateMask(diff_thresholded_lee)
                                        .clip(taluk)
  // Using Difference Approach 2: Using Focal Median smoothing
  var SMOOTHING_RADIUS = 50;
  var diff_fmedian = after.focal_median(SMOOTHING_RADIUS, 'square', 'meters')
                          .subtract(before.focal_median(SMOOTHING_RADIUS, 'square', 'meters'))
  var diff_thresholded_fmedian = diff_fmedian.lt(DIFF_UPPER_THRESHOLD);
  var flooded_fmedian = diff_thresholded_fmedian.updateMask(diff_thresholded_fmedian)
                                                .clip(taluk)
  var flooded = flooded_lee.unmask(flooded_fmedian)
                          // .reproject("EPSG:3857", null, 30)
  //flooded layer where perrenial water bodies (water > 10 mo/yr) is assigned a 0 value
  var flooded_mask = flooded.where(swater_mask,0)
  // final flooded area without pixels in perennial waterbodies
  var flooded = flooded.updateMask(flooded_mask);
  // Computing connectivity of pixels to eliminate those connected to 3 or fewer neighbours
  // Ideally, connectedPixelCount must be followed by reproject, but this hugely slows down
  // analyses if done at zoom levels less than 12. Hence dropped for visualisation purposes, 
  // but done below in the computation of flooded area
  var connections = flooded.connectedPixelCount(25)
                    // .reproject("EPSG:3857", null, 30)
  var final_flooded = flooded.updateMask(connections.gte(3))
                            // .reproject("EPSG:3857", null, 30)
                            // .aside(print)
  // Estimate flood-affected area  by district (choose in Line 7 above)
  var area_affected = final_flooded.reproject("EPSG:3857", null, 30)
                          .multiply(ee.Image.pixelArea())
                          .reduceRegion(ee.Reducer.sum(), taluk, 30, null, null, true, 10000000, 4)
                          .get('sum')
  var area_affected = ee.Number(area_affected).float().divide(10000).round().int()
  // Update computed flood area stats to UI panel
  area_panel.add(
    ui.Label("Minimum Extent of Flooding", {'background-color':'555555', fontSize: '16px', color:'gold'}))
  area_panel.add(
    ui.Label(area_affected.getInfo()+" hectares", {'background-color':'555555', fontSize: '28px', color:'white', 'font-weight':'bold'}))
  var black = ee.Image(0);
  var hole = ee.Image(1).clip(taluk);
  var stamp = black.where(hole, 1);
  var mask = stamp.eq(0);
  var background = stamp.updateMask(mask);
  Map.addLayer(background, {opacity: 0.85}, 'Taluk Mask');
  Map.addLayer(before.clip(taluk), {min: -20, max: 0}, 'Before Flooding', false);
  Map.addLayer(after.clip(taluk), {min: -20, max: 0}, 'After Flooding', false);
  // Map.addLayer(diff_raw.clip(taluk), {min: -10, max: 10}, 'After - Before', false); 
  // Map.addLayer(diff_lee.clip(taluk), {min: -10, max:10}, 'RLee Despeckled Diff', false); 
  // Map.addLayer(flooded_lee, {palette:"#004cff", opacity: 0.8},'Flooded Areas: RLee', false);
  // Map.addLayer(diff_fmedian.clip(taluk), {min: -10, max: 10}, 'FMedian Smoothed Diff', false); 
  // Map.addLayer(flooded_fmedian, {palette:"#004cff", opacity: 0.8},'Flooded Areas: FMedian', false);
  Map.addLayer(pop, imageVisParam, 'Human Settlements', true)
  Map.addLayer(flooded, {palette:"#0000ff", opacity: 0.67},'Flooded Areas', true);
}
// Trigger the showFloodMap function each time a taluk name in dropdown changes
ee.List(kerala.distinct('taluk_name').aggregate_array('taluk_name'))
     .sort()
     .evaluate(function(taluk){
       selector_panel.add(ui.Select({
         placeholder: "Choose a taluk",
         items: taluk,
         style: {fontSize: '16px',
         'color': 'blue',
         'background-color': "cccccc",
         width: '150px',
         height: '30px'},
         onChange: showFloodMap,
       }))
     })
// add UI elements at the same level as map window.
ui.root.insert(0, panel);
ui.Map()
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
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
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
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result.arrayFlatten([['sum']]));
}