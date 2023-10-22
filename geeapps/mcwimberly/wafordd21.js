//======================================================================================================= 
//                                                                                                     \\
//            Script #4: ESTIMATING ANNUAL FOREST COVER CHANGE IN WAForDD                              \\
//                                                                                                     \\
//          UI and APP-based with CSV summary download options, link to code editor for images         \\
//                                                                                                     \\
//=======================================================================================================
// Date   : 02-FEB-2020
// Authors: Francis Dwomoh    | fkdwomoh@ou.edu
//          Michael Wimberly  | mcwimberly@ou.edu
//          Izaya Numata      | izaya.numata@sdstate.edu
//          Dawn Nekorchuk    | dawn.nekorchuk@ou.edu
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Data Imports & Import Set-up 
//
// Data used for all
// Import polygon boundary of selected ecological zones covering area of interest - Ghana forest zone
var studyArea = ee.FeatureCollection("projects/servir-wa/WAForDD/shapefiles/EcologicalZones_all");
//print('study area', studyArea);
// Import forest reserves polygons
var reserves = ee.FeatureCollection("projects/servir-wa/WAForDD/shapefiles/Forest_Land_Use_Edited");
//print('reserves', reserves);
// Import ecological zones/regions
var ecoregions = ee.FeatureCollection("projects/servir-wa/WAForDD/shapefiles/EcologicalZones_summary");
//print('ecoregions', ecoregions);
//Fitted LandTrendr canopy cover
var cc_lt = ee.ImageCollection("projects/servir-wa/WAForDD/Canopy_Cover_LT");
//var cc_lt = ee.ImageCollection("projects/servir-wa/WAForDD/Canopy_Cover_LT_2001St");
//print('cc_lt', cc_lt);
// Predicted canopy cover from Random Forests
var ann_cc1yr = ee.ImageCollection("projects/servir-wa/WAForDD/Canopy_Cover");
//var ann_cc1yr = ee.ImageCollection("projects/servir-wa/WAForDD/Canopy_Cover_2001St");
//print('ann_cc1yr', ann_cc1yr);
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Calculations 
//
// Thresholds for classifying canopy cover
var low_cc = 20;
var med_cc = 55;
// Function for reclassifying canopy cover
// Applies the classification thresholds plus a 3 x 3 majority filter
// Clips the output to the reserve boundaries -- postponed clip to get full range of cc_fits prev/next year.
var reclass_cc = function(img) { 
  var img2 = img.expression(
    'of+(cf*2)', {
    'of': img.gt(low_cc).and(img.lte(med_cc)),
    'cf': img.gt(med_cc)
  })
  .reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    kernel: ee.Kernel.square(1),
  })
  .rename('cc_fit');
  //.clip(reserves);
  var curyear = img.get('year');
  return img2.set('year', curyear)
             .set('date', ee.Date.fromYMD(curyear, 1, 1))
             .set('system:time_start', ee.Date.fromYMD(curyear, 1, 1).millis());
};
// Apply the reclassification function to the LandTrendR image collection
var cc_ltrcls = cc_lt.map(reclass_cc);
//print('Reclassified image collection', cc_ltrcls);
// Convert the classified LandTrendR image collection to a list
var cc_ltrcls_list = cc_ltrcls.toList(cc_ltrcls.size());
// Extract the first year image from the beginning of the list
var firstimg = ee.Image(cc_ltrcls_list.get(0));
var firstyear = ee.Number(firstimg.get('year'));
var firstdate = firstimg.get('date');
//print("First year", firstyear);
// Make an image for the year before the first year by copying the first year image
var newfyear = firstyear.subtract(1);
//print(newfyear);
var newfirst = firstimg.set('year', newfyear)
                       .set('date', ee.Date.fromYMD(newfyear, 1, 1))
                       .set('system:time_start', ee.Date.fromYMD(newfyear, 1, 1).millis());
//print('newfirst', newfirst);
// Make an image for the year before the first year by copying the first year image
var newfyear2 = firstyear.subtract(2);
//print(newfyear);
var newfirst2 = firstimg.set('year', newfyear2)
                       .set('date', ee.Date.fromYMD(newfyear2, 1, 1))
                       .set('system:time_start', ee.Date.fromYMD(newfyear2, 1, 1).millis());
// Extract the last year image from the end of the list
var lastindex = cc_ltrcls_list.size().subtract(1);
var lastimg = ee.Image(cc_ltrcls_list.get(lastindex));
var lastyear = ee.Number(lastimg.get('year'));
var lastdate = lastimg.get('date');
//print('Last year', lastyear);
// Make an image for the year after the last year by copying the last year image
var newlyear = lastyear.add(1);
//print(newlyear);
var newlast = lastimg.set('year', newlyear)
                     .set('date', ee.Date.fromYMD(newlyear, 1, 1))
                     .set('system:time_start', ee.Date.fromYMD(newlyear, 1, 1).millis());
//print('newlast', newlast);
// Add the new images to the beginning and end of the time series
var newcollection = ee.ImageCollection(newfirst).merge(cc_ltrcls);
var newcollection2 = ee.ImageCollection(newfirst2).merge(newcollection);
var newcollection3 = newcollection2.merge(ee.ImageCollection(newlast));
print(newcollection3);
var timeField = 'system:time_start';
// Function to compute temporally lagged images
// Returns an imageCollection with lagged images stored as properties
var lag = function(leftCollection, rightCollection, lagDays) {
  var filter = ee.Filter.or(
    ee.Filter.and(ee.Filter.maxDifference({
      difference: 1000 * 60 * 60 * 24 * 731,
      leftField: timeField, 
      rightField: timeField
    }), 
    ee.Filter.greaterThan({
      leftField: timeField, 
      rightField: timeField
    })), ee.Filter.and(ee.Filter.maxDifference({
      difference: 1000 * 60 * 60 * 24 * 366,
      leftField: timeField, 
      rightField: timeField
    }), 
    ee.Filter.lessThan({
      leftField: timeField, 
      rightField: timeField
    }))
  );
  return ee.Join.saveAll({
    matchesKey: 'images',
    measureKey: 'delta_t',
    ordering: timeField,
    ascending: false, // Sort reverse chronologically
  }).apply({
    primary: leftCollection, 
    secondary: rightCollection, 
    condition: filter
  });
};
// Apply the function to generate lagged images
var lagged_cc = lag(newcollection3, newcollection3, 365 * 1 + 1);
// Function to merge lagged images
// Returns a image with lagged index values stored in separate bands
var lagmerge = function(image) {
  // Function to be passed to iterate.
  var merger = function(current, previous) {
    return ee.Image(previous).addBands(current);
  };
  return ee.ImageCollection.fromImages(
image.get('images')).iterate(merger, image);
};
// Generate the merged lagged image
var merged_cc = ee.ImageCollection(lagged_cc.map(lagmerge));
// Clip off the "extra" years that we added to the beginning and end of the time series
var filt_cc = merged_cc.filterDate(firstdate, ee.Date(lastdate).advance(1, 'day'));
//Full images of canopy cover fits: current, previous and next years
print('filt_cc', filt_cc); 
//
// Change Calculations
//
// Function to compute a "change type" code based on the current class, the class in the previous year,
// and the class in the subsequent year
var add_code = function(img) {
  var ccode = img.expression(
    'prev * 100 + cur * 10 + fut', {
    'prev': img.select('cc_fit_2'),
    'cur': img.select('cc_fit'),
    'fut': img.select('cc_fit_1')
  }).rename('ccode');
  return img.addBands(ccode);
};
// Apply the function to make the change type calculation
// and now clip to reserves
var filt_change = filt_cc.map(add_code)
                         .map(function(img){
                            return img.clip(reserves);
});
print(filt_change, 'filtchange');
// Determine pixels where degradation (close forest to open forest) has occured based on the change type code
var calc_degradation = function(img) {
  var chng_code = img.select('ccode');
  var curyear = img.get('year');
  var degradation = chng_code.eq(211)
                    .or(chng_code.eq(210))
                    .rename('degradation')
                    .set('year', curyear);
  return degradation;
}; 
// Apply the function to calculate degradation
var degradation = filt_change.map(calc_degradation);
//print("degradation", degradation);
// Determine pixels where deforestation type 1 (open forest to low tree cover) has occured based on the change type code
var calc_deforestation1 = function(img) {
  var chng_code = img.select('ccode');
  var curyear = img.get('year');
  var defor1 = chng_code.eq(100)
               .rename('deforestation1')
               .set('year', curyear);
  return defor1;
}; 
// Apply the function to calculate deforestation type 1
var deforestation1 = filt_change.map(calc_deforestation1);
//print("deforestation1", deforestation1);
// Determine pixels where deforestation type 2 (closed forest to low tree cover) has occured based on the change type code
var calc_deforestation2 = function(img) {
  var chng_code = img.select('ccode');
  var curyear = img.get('year');
  var defor2 = chng_code.eq(200)
               .or(chng_code.eq(201))
               .rename('deforestation2')
               .set('year', curyear);
  return defor2;
}; 
// Apply the function to calculate deforestsation type 2
var deforestation2 = filt_change.map(calc_deforestation2);
//print("deforestation2", deforestation2);
// Determine pixels where recovery type 1 (open forest to closed forest) has occured based on the change type code
var calc_recovery1 = function(img) {
  var chng_code = img.select('ccode');
  var prev_year = img.select('cc_fit_3');
  var curyear = img.get('year');
  var recov1 = (chng_code.eq(120)
                        .or(chng_code.eq(121))
                        .or(chng_code.eq(122))
                        .or(chng_code.eq(20))
                        .or(chng_code.eq(21)) 
                        .or(chng_code.eq(22)))
                        .and(prev_year.lt(2))
                        .rename('recovery1')
                        .set('year', curyear);  
  return recov1;
}; 
// Apply the function to calculate recovery type 1
var recovery1 = filt_change.map(calc_recovery1);
//print("recovery1", recovery1);
// Determine pixels where recovery type 2 (low tree cover to open forest) has occured based on the change type code
var calc_recovery2 = function(img) {
  var chng_code = img.select('ccode');
  var prev_year = img.select('cc_fit_3');
  var curyear = img.get('year');
  var recov2 = (chng_code.eq(10)
                        .or(chng_code.eq(11))
                        .or(chng_code.eq(12)))
                        .and(prev_year.lt(1))
                        .rename('recovery2')
                        .set('year', curyear);                        
  return recov2;
}; 
// Apply the function to calculate recovery type 2
var recovery2 = filt_change.map(calc_recovery2);
//print("recovery2", recovery2);
/* Final list of image collections
filt_cc : with bands for current year, previous, and next (full area)
filt_change : with bands for current year, previous, and next (clipped to reserves)
degradation
deforestation1
deforestation2
recovery1
recovery2
*/
/* Not needed for UI anymore, using original image collections above
// Convert image collections to lists
var filt_change_list = filt_change.toList(filt_change.size());
var degradation_list = degradation.toList(degradation.size());
var deforestation1_list = deforestation1.toList(deforestation1.size());
var deforestation2_list = deforestation2.toList(deforestation2.size());
var recovery1_list = recovery1.toList(recovery1.size());
var recovery2_list = recovery2.toList(recovery2.size());
//print(filt_change_list, 'filt_change_list');
*/
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Summary Table Export 
//
// Combine the separate image collections for the change types 
// into a single image collection consisting of multiband images
var change_type = deforestation1.combine(deforestation2);
change_type = change_type.combine(degradation);
change_type = change_type.combine(recovery1);
change_type = change_type.combine(recovery2);
//print('change_type', change_type);
//Drop first year as change values are all 0 (can't calculate)
change_type = change_type.filterMetadata('year', 'greater_than', firstyear.add(1)); 
//print('change_type filt', change_type);
//Add a band of all 1s inside the reserves, to be used to calculate total reserve areas
// single image
var identityReserves = ee.Image.constant(1).clip(reserves).rename('reserve_area');
//print('img res', identityReserves);
//add area band
var change_full = change_type.map(function(img){
    return img.addBands(identityReserves);
});
//print('change full', change_full);
//Calculate
/*ee.Image.pixelArea() method generates an image in which the value of each pixel is the pixel's area in square meters.
Multiplying the forest degradation image with this area image and then summing over the result gives us a measure of area*/
//var change_area = change.multiply(ee.Image.pixelArea());
//print(change_area, "change_area");
var calc_area = function(img) {
  var curyear = img.get('year');
  var reserve_area = img.select('reserve_area')
                     .multiply(ee.Image.pixelArea())
                     .divide(10000)
                     .rename('reserve_area');
  var degrad_area = img.select('degradation')
                       .multiply(ee.Image.pixelArea())
                       .divide(10000)
                       .rename('degraded_area');
  var defor1_area = img.select('deforestation1')
                       .multiply(ee.Image.pixelArea())
                       .divide(10000)
                       .rename('open_forest_loss_area');
  var defor2_area = img.select('deforestation2')
                       .multiply(ee.Image.pixelArea())
                       .divide(10000)
                       .rename('closed_forest_loss_area');
  var recov1_area = img.select('recovery1')
                      .multiply(ee.Image.pixelArea())
                      .divide(10000)
                      .rename('closed_forest_recovery_area');
  var recov2_area = img.select('recovery2')
                       .multiply(ee.Image.pixelArea())
                       .divide(10000)
                       .rename('open_forest_recovery_area');
  var outimage = ee.Image([reserve_area, degrad_area, defor1_area, defor2_area, recov2_area, recov1_area]);
  return outimage.set('year', curyear);
};
var change_area = change_full.map(calc_area);
//print(change_area, "change_area");
function sumZonal(image) { 
  // To get the doy and year, we convert the metadata to grids and then summarize
  // var image2 = image;//.addBands([image.metadata('year').int()]);
  // Reduce by regions to get zonal means for each county
  //  var output = image2.select(['year', 'defor1_area', 'defor2_area', 'degrad_area', 'recov1_area', 'recov2_area'], ['year', 'defor1_area', 'defor2_area', 'degrad_area', 'recov1_area', 'recov2_area'])
  var curyear = image.get('year');
  var output = image.reduceRegions({
                       collection: ecoregions,
                       reducer: ee.Reducer.sum(),
                       scale: 30});
  // output.set('year', curyear);
  return output.map(function(feature){
    //var dict = ee.Dictionary(feature.get('histogram'));
    feature = feature//.set(dict)
                     .set('year', curyear)
                     .setGeometry(null);
  return (feature)});
} 
// Map the zonal statistics function over the filtered spectral index data
var zonalChange = change_area.map(sumZonal);  
//print('zonalChange', zonalChange);
// Flatten the results for export
var zonalChangeFlat = zonalChange.flatten();
//print('zonalChangeFlat', zonalChangeFlat);
function sumZonalReserves(image) { 
  // To get the doy and year, we convert the metadata to grids and then summarize
  //var image2 = image;//.addBands([image.metadata('year').int()]);
  // Reduce by regions to get zonal means for each county
  //  var output = image2.select(['year', 'defor1_area', 'defor2_area', 'degrad_area', 'recov1_area', 'recov2_area'], ['year', 'defor1_area', 'defor2_area', 'degrad_area', 'recov1_area', 'recov2_area'])
  var curyear = image.get('year');
  var output = image.reduceRegions({
                       collection: reserves,
                       reducer: ee.Reducer.sum(),
                       scale: 30});
  // output.set('year', curyear);
  return output.map(function(feature){
    //var dict = ee.Dictionary(feature.get('histogram'));
    feature = feature//.set(dict)
                     .set('year', curyear)
                     .setGeometry(null);
  return (feature)});
} 
// Map the zonal statistics function over the filtered spectral index data
var zonalReserves = change_area.map(sumZonalReserves);  
//print('zonalReserves', zonalReserves);
// Flatten the results for export
var zonalReservesFlat = zonalReserves.flatten();
//print('zonalReservesFlat', zonalReservesFlat.limit(500));
Export.table.toDrive({
  collection: zonalChangeFlat,
  description: 'summary_by_ecozone',
  selectors: ['year', 'VEGCODE', 'reserve_area', 'degraded_area', 
              'open_forest_loss_area', 'closed_forest_loss_area', 
              'open_forest_recovery_area', 'closed_forest_recovery_area']
});
Export.table.toDrive({
  collection: zonalReservesFlat,
  description: 'summary_by_reserve',
  selectors: ['year', 'Name', 'reserve_area', 'degraded_area', 
              'open_forest_loss_area', 'closed_forest_loss_area', 
              'open_forest_recovery_area', 'closed_forest_recovery_area']
});
// Separate function for final exporting in app, new UI panel, etc.
function createSummariesPanel(){
  // Create download URLs to display
  //getdownloadurl
  var ecozoneURL = zonalChangeFlat.getDownloadURL({format: 'csv',
                    filename: 'WAForDD_summary_by_ecozone',
                    selectors: ['year', 'VEGCODE', 'reserve_area', 'degraded_area', 
                                'open_forest_loss_area', 'closed_forest_loss_area', 
                                'open_forest_recovery_area', 'closed_forest_recovery_area']
  });
  var reserveURL = zonalReservesFlat.getDownloadURL({format: 'csv',
                      filename: 'WAForDD_summary_by_reserve',
                      selectors: ['year', 'Name', 'reserve_area', 'degraded_area', 
                                  'open_forest_loss_area', 'closed_forest_loss_area', 
                                  'open_forest_recovery_area', 'closed_forest_recovery_area']
  });
  var urlLabelEcozones = ui.Label('Click to download WAForDD all years summary by ecozone');
  var urlLabelReserves = ui.Label('Click to download WAForDD all years summary by reserve');
  urlLabelEcozones.setUrl(ecozoneURL);
  urlLabelReserves.setUrl(reserveURL);
  var thisPanel = ui.Panel([urlLabelEcozones, urlLabelReserves], '', {padding: '0px 0px 0px 10px'});
  return(thisPanel);
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Yearly Image Export 
//
function exportYearImagesToDrive(){
  // get year from canopy cover, will be same for the others
  // used to add into download file name
  var yearString = dispCurYear.get('year').getInfo();
  //filenames for web or drive downloads
  var canopyFileName = yearString+'_canopy_cover';
  var degradFileName = yearString+'_degradation';
  var defor1FileName = yearString+'_open_forest_loss';
  var defor2FileName = yearString+'_closed_forest_loss';
  var recov1FileName = yearString+'_closed_forest_recovery';
  var recov2FileName = yearString+'_open_forest_recovery';
  //Also export images. Settings copied over from original script. 
  Export.image.toDrive({
    image: dispCurYear.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: canopyFileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
  Export.image.toDrive({
    image: dispDegrad.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: degradFileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
    Export.image.toDrive({
    image: dispDefor1.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: defor1FileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
  Export.image.toDrive({
    image: dispDefor2.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: defor2FileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
  Export.image.toDrive({
    image: dispRecov1.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: recov1FileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
  Export.image.toDrive({
    image: dispRecov2.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: recov2FileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// GUI 
//
//
// Configs and globals
//
var map = ui.Map();
//multiple interactions, global variables
var sidePanel = ui.Panel();
// Create panels to hold lon/lat values and reserve name.
var lon = ui.Label();
var lat = ui.Label();
var reserveName = ui.Label();
var ecozoneName = ui.Label();
// for links
var downloadImagesButton = ui.Button();
var downloadImagesPanel = ui.Panel();
//configs
var config = {
  //start and end date from data, found at beginning of script
  // start year is first year + 1, because that's when change results start
  studyYearsStart: ee.Date(firstdate).get('year').add(2).getInfo(),
  studyYearsEnd: ee.Date(lastdate).get('year').getInfo(),
  downloadButtonText: 'Click to Download Images for Year Displayed',
  //colors for forest, make sure matches paletteForest
  colorLow: '#edf8e9',
  colorOpen: '#a1d99b',
  colorClosed: '#31a354',
  //colors for degradation, deforestation, recovery
  colorDegradation: 'yellow',
  colorDeforestation1: 'orange',
  colorDeforestation2: 'red',
  colorRecovery2: 'cyan',
  colorRecovery1: 'blue'
}; 
//palette for displaying the classified raster data
var paletteForest = 
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#edf8e9" quantity="0" label="Low Forest Cover"/>' +
      '<ColorMapEntry color="#a1d99b" quantity="1" label="Open Forest" />' +
      '<ColorMapEntry color="#31a354" quantity="2" label="Closed Forest" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
//multiple functions interact, so must be global
var dispPrevYear = ee.Image([]);
var dispCurYear = ee.Image([]);
var dispNextYear = ee.Image([]);
var dispDegrad = ee.Image([]);
var dispDefor1 = ee.Image([]);
var dispDefor2 = ee.Image([]);
var dispRecov1 = ee.Image([]);
var dispRecov2 = ee.Image([]);
//
// Display functions
//
function drawReserves(){
  //Display the outline of reserves as a black line, no fill
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
    featureCollection: reserves,
    color: 1,
    width: 1
  });
  map.addLayer(outline, {palette: '000000'}, 'Forest Reserves');
}
//Explicit clear in between years
function resetResults(){
  dispPrevYear = ee.Image([]);
  dispCurYear = ee.Image([]);
  dispNextYear = ee.Image([]);
  dispDegrad = ee.Image([]);
  dispDefor1 = ee.Image([]);
  dispDefor2 = ee.Image([]);
  dispRecov1 = ee.Image([]);
  dispRecov2 = ee.Image([]);
}
function displayYear(requestedYear){
  //reset map
  map.clear(); //note, removes listeners too
  //reset image results to prevent any accidental carry-over 
  resetResults();
  //map.clear removes listeners, so add here
  // re-register a callback to be invoked when the map is clicked.
  map.onClick(handleClick);
  //get full canopy cover maps for year
  var canopyReqYear = filt_cc.filterMetadata('year', 'equals', requestedYear)
                        //returns collection of one image, so get first element
                        .first();
  //print('canopy cover year', canopyReqYear);
  //get all change images of year to display (previously clipped to reserves)
  var changeReqYear = filt_change.filterMetadata('year', 'equals', requestedYear)
                        //returns collection of one image, so get first element
                        .first();
  //print("change req year", changeReqYear);
  //get images to display
  dispPrevYear = canopyReqYear.select('cc_fit_2');
  dispCurYear = canopyReqYear.select('cc_fit');
  dispNextYear = canopyReqYear.select('cc_fit_1');
  dispDegrad = degradation.filter(ee.Filter.eq('year', requestedYear))
                        //returns list of one image, so get first element
                        .first();
  dispDegrad = dispDegrad.updateMask(dispDegrad.eq(1));
  //print('disp degrad', dispDegrad);
  dispDefor1 = deforestation1.filter(ee.Filter.eq('year', requestedYear))
                          //returns list of one image, so get first element
                          .first();
  dispDefor1 = dispDefor1.updateMask(dispDefor1.eq(1));
  dispDefor2 = deforestation2.filter(ee.Filter.eq('year', requestedYear))
                          //returns list of one image, so get first element
                          .first();
  dispDefor2 = dispDefor2.updateMask(dispDefor2.eq(1));
  dispRecov1 = recovery1.filter(ee.Filter.eq('year', requestedYear))
                          //returns list of one image, so get first element
                          .first();
  dispRecov1 = dispRecov1.updateMask(dispRecov1.eq(1));
  dispRecov2 = recovery2.filter(ee.Filter.eq('year', requestedYear))
                          //returns list of one image, so get first element
                          .first();
  dispRecov2 = dispRecov2.updateMask(dispRecov2.eq(1));
  map.addLayer(dispPrevYear.sldStyle(paletteForest), {}, 'Previous Year', false);
  map.addLayer(dispCurYear.sldStyle(paletteForest), {}, 'Current Year');
  map.addLayer(dispNextYear.sldStyle(paletteForest), {}, 'Next Year', false);
  map.addLayer(dispDegrad, {palette: config.colorDegradation, bands: 'degradation'}, 'Degradation');
  map.addLayer(dispDefor1, {palette: config.colorDeforestation1, bands: 'deforestation1'}, 'Open Forest Loss');
  map.addLayer(dispDefor2, {palette: config.colorDeforestation2, bands: 'deforestation2'}, 'Closed Forest Loss');
  map.addLayer(dispRecov2, {palette: config.colorRecovery2, bands: 'recovery2'}, 'Open Forest Recovery');
  map.addLayer(dispRecov1, {palette: config.colorRecovery1, bands: 'recovery1'}, 'Closed Forest Recovery');
  //draw reserves on top 
  drawReserves();
  //also keep point, so can change years while looking at same point
  // The number here must be equal to the number of map layers
  map.layers().set(9, dot);
  //add Legend
  var legendData = {
  'Low Forest Cover': config.colorLow,
  'Open Forest': config.colorOpen,
  'Closed Forest': config.colorClosed,
  'Degradation' : config.colorDegradation,
  'Open Forest Loss': config.colorDeforestation1,
  'Closed Forest Loss': config.colorDeforestation2,
  'Open Forest Recovery': config.colorRecovery2,
  'Closed Forest Recovery': config.colorRecovery1
  };
  var legend = makeLegend(legendData);
  map.add(legend);
  //if running in code editor, can now also download to drive the images
  exportYearImagesToDrive();
}
//
// Legend
//
//legend functions, generic
//borrowed heavily from Sufy's demo: sufy@google.com
function makeLegendEntry(color, label) {
  label = ui.Label(label, {
    margin: 'auto 0',
    fontWeight: '100',
    color: '#555'
  });
  return makeRow([makeColorBox(color), label]);
}
function makeColorBox(color) {
  return ui.Label('', {
    backgroundColor: color,  
    padding: '5px',
    margin: '4px',
    border: '1px solid gray',
  });
}
function makeRow(widgets){
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      padding: '0px 5px',
    }
  });
}
function makeLegend(data) {
  // Start with a ui.Panel:
  var legend = ui.Panel({
    style: {
      width: '200px',
      position: 'bottom-right',
      border: '1px solid lightgray',
    }
  });
  Object.keys(data).map(function(label){
    legend.add(makeLegendEntry(data[label], label));
  });
  return legend;
} 
//
// Inspector & Chart
//
// Register a callback to be invoked when the map is clicked.
map.onClick(handleClick);
// Multiple functions now interact, so global declared
var dot = ui.Map.Layer();
function handleClick(coords){
  //clear previous (especially for when clicking outside of reserves)
  reserveName.setValue('');
  ecozoneName.setValue('');
    //clear point on map
    //removeLayer('Selected Point');
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  //define point based on click position
  var clickPoint = ee.Geometry.Point(coords.lon, coords.lat);
  // Add a dot for the point clicked on. 
  dot = ui.Map.Layer(clickPoint, 
                          //pink to be bright & to distinguish from other colors
                          {color: '#ff005a'}, 
                          'Selected Point');
  // The number here must be equal to the number of map layers
  map.layers().set(9, dot);
  //print(coords.lon, 'lon');
  //print(coords.lat, 'lat');
  //is point in a reserve?
  //if point is NOT in a reserve, no feature returned, size = 0
  var pointInside = ee.Algorithms.If(reserves.filterBounds(clickPoint).size().eq(0),
                                  false, 
                                  true);
  //print(pointInside, 'point in reserve?');
  //if point is in a reserve, then we:
  // Doing this client-side for interactive UI (otherwise if is the wrong choice, in general)
  pointInside.evaluate(function (answer) {
    if (answer) {
    //get reserve name
    //Will ERROR if point not in reserve ...
    var pointReserve = reserves.filterBounds(clickPoint)
                                //get first/only entry 
                              .first()
                              //get name
                              .get('Name');
    //print(pointReserve, 'reserve at point');
    reserveName.setValue('reserve: ' + pointReserve.getInfo());
    //get ecozone name
    var pointEcozone = ecoregions.filterBounds(clickPoint)
                              //get first/only entry 
                              .first()
                              //get name
                              .get('VEGCODE');
    //print(pointEcozone, "ecozone at point");  
    ecozoneName.setValue('ecozone: ' + pointEcozone.getInfo());
   } //end if answer
  }); //end evaluate
  // Create an chart of annual summaries of cover
  var pointCCChart = makeCCChart(clickPoint);  
  // Create a chart of the fitted LandTrendr values
  var pointLTChart = makeLTChart(clickPoint);
    //print(pointCCChart);
    //note: if print chart, cannot add widget to panel if already printed in console
    //var widgetList = sidePanel.widgets();
    //print(widgetList, "check placement");
  //add in specific placement locations to overwrite chart with each click
  sidePanel.widgets().set(5, pointCCChart);
  sidePanel.widgets().set(6, pointLTChart);
} //end handleclick
function makeCCChart(pt){
    var thisChart = ui.Chart.image.series(ann_cc1yr.select(['classification']), 
                                        pt, 
                                        ee.Reducer.mean(), 
                                        30, 
                                        'year' )
    .setSeriesNames(['Canopy Cover'])
    .setOptions({
      title: 'Canopy Cover',
      lineWidth: 1,
      pointSize: 3,
      colors: ['#e7298a'],
      vAxis: {
        title: 'Index Value',
        minValue: 0,
        maxValue: 100,
      },
      hAxis: {
        format: '####',
      },
  });
  //do not test print, cannot add widget to panel if already printed in console
  return thisChart;
}
function makeLTChart(pt){
  var thisChart = ui.Chart.image.series(cc_lt.select(['cc_fit']), 
                                      pt, 
                                      ee.Reducer.mean(), 
                                      30, 
                                      'year' )
      .setSeriesNames(['Canopy Cover'])
      .setOptions({
        title: 'LandTrendr Fitted Canopy Cover',
        lineWidth: 1,
        pointSize: 3,
        colors: ['#e7298a'],
        vAxis: {
          title: 'Index Value',
          minValue: 0,
          maxValue: 100,
        },
        hAxis: {
          format: '####',
        },
      });
  //do not test print, cannot add widget to panel if already printed in console
  return thisChart;
}
  /*
  //borrowed heavily from https://gis.stackexchange.com/questions/291199/google-earth-engine-remove-layer-from-the-layer-manager
  var removeLayer = function(name) {
    var layers = map.layers();
    // list of layers names
    var names = [];
    layers.forEach(function(lay) {
      var lay_name = lay.getName();
      names.push(lay_name);
    });
    // get index
    var index = names.indexOf(name);
    if (index > -1) {
      // if name in names
      var layer = layers.get(index);
      map.remove(layer);
    } else {
      //print('Layer '+name+' not found');
    }
  };
  */
//
// Create UI
//
//side panel, generic
function makeSidePanel(title, description) {
  title = ui.Label({
    value: title,
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '10px 0px 0px 10px',
    }
  });
  description = ui.Label({
    value: description,
    style: {
      //color: 'gray',
      padding: '10px',
    }
  });
  return ui.Panel({
    widgets: [title, description],
    style: {
      height: '100%',
      width: '30%',
    },
  });
}
//main
function init() {
  // Configure the map.
  map.style().set('cursor', 'crosshair');
  // center and zoom
  map.centerObject(studyArea, 9); 
  //reserve outlines
  drawReserves();
  //draws default year (last available)
  displayYear(config.studyYearsEnd);
  //text
  sidePanel = makeSidePanel(
    'WAForDD: Monitoring Tropical Forest Landscapes in Ghana',
    'The West Africa Forest Degradation Data System (WAForDD 2.1) uses all available Landsat data to monitor the forest reserve network in Ghana. '+
    'The approach combines machine learning classification with LandTrendr time series analysis to generate annual maps of overstory canopy cover. '+
    'Change detection algorithms are applied to identify degradation, deforestation, and recovery events inside the forest reserves.'
  );
  //generate urls and add labels
  //summary over all years, so display always and doesn't matter what year is selected
  var summariesPanel = createSummariesPanel();
  sidePanel.add(summariesPanel);
  var instructionsText = 
  'Click on a point on the map for timeseries charts and other details.';
  sidePanel.add(ui.Label({value: instructionsText,
                          style: {fontWeight: 'bold', padding: '10px 0px 0px 10px'}}));
  //for display of data from points clicked on map
  // Create panels to hold lon/lat values and reserve name.
  sidePanel.add(ui.Panel([lon, lat, ecozoneName, reserveName], 
                          ui.Panel.Layout.flow('horizontal'), 
                          {padding: '0px 0px 0px 10px'}));
  // Add placeholders for the charts
  sidePanel.add(ui.Label({value: '[Fig 1 - Random Forest Canopy Cover]', style: {padding: '5px 0px 0px 10px'}}));
  sidePanel.add(ui.Label({value: '[Fig 2 - LandTrendr Processed Canopy Cover]', style: {padding: '5px 0px 5px 10px'}}));
  //Year selector for map display  
  var yearSliderLabel = ui.Label({value: 'Select year to display layers on map.', 
                                  style: {fontWeight: 'bold', padding: '5px 0px 0px 10px'}});
  sidePanel.add(yearSliderLabel);
  var sliderComposite = ui.Slider({
    min: config.studyYearsStart,
    max: config.studyYearsEnd,
    step: 1,
    style: {fontWeight: 'bold', stretch: 'horizontal', width:'200px', padding: '0px 0px 0px 10px' },
    value: config.studyYearsEnd, //default to latest, draws in init()
    onChange: function(value) {
      //draw year
      displayYear(value);
    },
  });
  sidePanel.add(sliderComposite);
  //var yearSliderNote = ui.Label({value: 'Note: First year ('+firstyear.getInfo()+') will only show canopy cover.', 
  //                                style: {padding: '0px 0px 0px 10px'}});
  //sidePanel.add(yearSliderNote);
  // Link back to code snapshot
  // REMEMBER TO UPDATE LINK WITH EACH CODE UPDATE
  // Then, update app
  var codeLink = ui.Label(
  'Link to Code Editor for large image downloads (GEE account required)',
  {padding: '10px'},
  'https://code.earthengine.google.com/?scriptPath=users%2Fservir_wa%2FWAforDD%3AV2_1%2FWAForDD_4_AnnualForestDegradation_GUI');
  sidePanel.add(codeLink);
/*
  var descriptionText = 
  'WAForDD was co-developed by the University of Oklahoma, '+
  'the Centre for Remote Sensing and Geographic Information Services at the University of Ghana, '+
  'and the Forestry Commission of Ghana. '+
  'Financial support was provided by the NASA Applied Sciences Program (NSSC19K0128). '+
  'For more information, contact Dr. Michael Wimberly (mcwimberly@ou.edu).';
  sidePanel.add(ui.Label({value: descriptionText,
                          style: {padding: '10px'}}));
*/
  var desc1 = 'WAForDD was co-developed by the: ';
  var desc2Link = ui.Label(
  'EcoGRAPH Research Group at the University of Oklahoma',
  {padding: '0px'},
  'http://ecograph.net/degradation/');
  var desc3Link = ui.Label(
  'The Centre for Remote Sensing and Geographic Information Services at the University of Ghana',
  {padding: '0px'},
  'https://cersgis.org/');
  var desc4Link = ui.Label(
  'The Forestry Commission of Ghana ',
  {padding: '0px'},
  'http://www.fcghana.org/');
  var desc5 = 'Financial support was provided by the NASA Applied Sciences Program (NSSC19K0128). \n'+
  'For more information, contact:';
  var desc6Link = ui.Label(
    'Dr. Michael C. Wimberly',
    {padding: '0px'},
    'mailto:mcwimberly@ou.edu?subject=WAForDD GEE App');
  sidePanel.add(ui.Panel([ui.Label(desc1), desc2Link, desc3Link, desc4Link, ui.Label(desc5, {whiteSpace: 'pre-line'}), desc6Link], '',
                          {padding: '0px 0px 0px 10px'}));
  //sidePanel.add(ui.Panel([ui.Label(desc1), desc2Link, desc3Link, desc4Link, ui.Label(desc5)], 
  //                        ui.Panel.Layout.flow('horizontal', true), 
  //                        {padding: '0px 0px 0px 10px'}));
  var splitPanel = ui.SplitPanel({
    firstPanel: sidePanel,
    secondPanel: map,
  });
  ui.root.clear();
  ui.root.add(splitPanel);
}
init();