//----------------------------------------------------------------------------------------
//  Load in the Palsar data
//var palsar = ee.ImageCollection('users/etiennefluet/alos_hh_hathcockbay')
var hh_11_2007 = ee.Image('users/etiennefluet/alos_hh/AP_09556_FBS_F0590_RT2_HH');
var hh_12_2007 = ee.Image('users/etiennefluet/alos_hh/AP_10227_FBS_F0590_RT2_HH');
var hh_02_2008 = ee.Image('users/etiennefluet/alos_hh/AP_10898_FBS_F0590_RT2_HH'); 
var hh_03_2008 = ee.Image('users/etiennefluet/alos_hh/AP_11569_FBS_F0590_RT2_HH');
//-------------------------------------------------------------------------------------
//  Function: Convert to sigma naught:  sarhh_sigma0 = 10 * log10 * DN^2 + -83.0
var conv_to_sigma0 = function(image) { return image.pow(2).log10().multiply(10).add(-83.0)};
//    Convert from DN to dB by applying functionover the collection.
var hh_11_2007  = conv_to_sigma0(hh_11_2007)
var hh_12_2007  = conv_to_sigma0(hh_12_2007)
var hh_02_2008  = conv_to_sigma0(hh_02_2008)
var hh_03_2008  = conv_to_sigma0(hh_03_2008)
//-------------------------------------------------------------------------------------
//    Add to map
Map.setCenter(-85.2, 30.1, 11);  // Zoom on Hathcock Bay
var palsarVis = {min: -100.0, max: -70.0,};
Map.addLayer(hh_11_2007, palsarVis, 'hh_11_2007');
Map.addLayer(hh_12_2007, palsarVis, 'hh_12_2007');
Map.addLayer(hh_02_2008, palsarVis, 'hh_02_2008');
Map.addLayer(hh_03_2008, palsarVis, 'hh_03_2008');
//-----------------------------------------------------------------------------------
// Make the histogram, set the options.
//var histogram = ui.Chart.image.histogram(palsar)
// Display the histogram.
//print(histogram);