// Description:
// Author: Etienne Fluet-Chouinard
//  TODO:
//     - Fix date setting with code.  Maybe has to be another step after the data have been ingested.
//------------------------------------------------------------------------------------
// ROI
// var roi = ee.FeatureCollection('users/etiennefluet/nwi_meta_roi');
var roi = ee.FeatureCollection('users/etiennefluet/fl_polygon');
//-------------------------------------------------------------------------
//  Load in the ALOS collection
// Function: Convert to sigma naught:  sarhh_sigma0 = 10 * log10 * DN^2 + -83.0
var conv_to_sigma0 = function(image) { 
  var sig0 = image.pow(2).log10().multiply(10).add(-83.0)
                  .reproject('EPSG:4326', null, 30);
                  //.set('system:time_start', image.get('system:time_start'));
  // Copy the date metadata over to the computed anomaly images in the new collection.
  return sig0 ;
};
// Backscatter
var incangle = ee.ImageCollection("users/etiennefluet/fl_aug31")
              .select('b2')
              .map(function(image){return image.multiply(180/3.1415926535)});
// Incidence angle
var sig0hh = ee.ImageCollection("users/etiennefluet/fl_allofem2")
              .select('b1')
              .map(conv_to_sigma0);
              //.filterDate('2006-01-01', '2011-12-31')
              //.filterBounds(roi)
              //.map(function(image){return image.clip(roi)});
              //.reduce(ee.Reducer.median());    //  Convert from DN to dB by applying functionover the collection.
// Get count
var scene_count = sig0hh.reduce(ee.Reducer.count());
// Get mean incidence angle
var incangle_mean = incangle.reduce(ee.Reducer.mean());
var incangle_range = incangle.reduce(ee.Reducer.minMax());
var incangle_range = incangle_range.select('b2_max').subtract(incangle_range.select('b2_min'));
print(incangle_range)
//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////       MAKE MAP            ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Center 
Map.centerObject(roi, 10);
// Map incangle_mean
Map.addLayer(incangle_mean, 
            {bands: ['b2_mean'], min:30, max:70, palette: ['white',  'red']}, 
            'incangle_mean', 0);
// Map incangle_range
Map.addLayer(incangle_range, 
            {bands: ['b2_max'], min:0, max:50, palette: ['white',  'orange']}, 
            'incangle_range', 1);
// Map scene ecount
Map.addLayer(scene_count, 
            {bands: ['b1_count'], min:0, max:50, palette: ['white',  'green']}, 
            'scene_count', 0);
// Map incidence angle
var palsarVis = {bands: ['b1'] , min: -140.0, max: -50.0,};
Map.addLayer(sig0hh, palsarVis, 'ALOS HH', 0);
// Map incidence angle
var angleVis = {bands: ['b2'] , min: 30, max: 45,};
Map.addLayer(incangle, angleVis, 'incidnce angle', 0);
// Add ROI outline
var empty = ee.Image().byte();        // Create an empty image into which to paint the features, cast to byte.
var outline = empty.paint({ featureCollection: roi, color: 1, width: 1 }); // Paint all the polygon edges with the same number and width, display.
Map.addLayer(outline, {palette: '000000'}, 'ROI', 0);
/////////   INCIDENCE ANGLE CORRECTION         ///////////////////////////////////////////
// Find pixels that have minimal change in EVI between two dates.
// Get backscatter and incidence angle over these areas/periods.
// Fit linear model per LC class.
/////////// Threshold as flooded / non-flooded   /////////////////////////////////////////
// Mask only one LC category.
// Mask by bin of EVI.
// For each bin, run unsupervised clustering on in