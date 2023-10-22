var table2 = ui.import && ui.import("table2", "table", {
      "id": "users/abocin/ROU_adm0"
    }) || ee.FeatureCollection("users/abocin/ROU_adm0"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/abocin/Spitale"
    }) || ee.FeatureCollection("users/abocin/Spitale");
// An example Earth Engine script demonstrating how to use the global
// Accessibility to Cities 2015 dataset and associated Friction Surface
// published by Weiss et al., Nature (2018). 
// Load the global Accessibility to Cities image and the Friction Surface.
var accessibility = ee.Image('Oxford/MAP/accessibility_to_cities_2015_v1_0')
//    .clip(table4);
var friction = ee.Image('Oxford/MAP/friction_surface_2015_v1_0')
//    .clip(table4);
// Color palettes for visualizing accessibility and friction data.
var accessibilityPalette = ["#e9b198","#d7d09e","#b1d8a0","#8ac7af","#acefd7","#99d9d9","#60d5db","#7cccee","#74aff3","#a3b9e5","#c9baed","#eaaecf"];
var frictionPalette = ["#e9b198","#d7d09e","#b1d8a0","#8ac7af","#acefd7","#99d9d9","#60d5db","#7cccee","#74aff3","#a3b9e5","#c9baed","#eaaecf"];
// Apply the color palette to the log of travel time.
var accessibilityVis = {min:0, max:10, palette:accessibilityPalette};
var logAccessibility = accessibility.where(accessibility.gt(0), accessibility.log());
var accessibilityRgb = logAccessibility.visualize(accessibilityVis);
// Composite onto a solid-color background to fill in the oceans.
var background = ee.Image(1).visualize({palette: ['F7F4F3'], opacity: 0.5});
var accessibilityBlended = background.blend(accessibilityRgb).updateMask(1);
// Add the visualization of accessibility to cities to the map.
Map.addLayer(accessibilityBlended, {}, 'Accessibility to Cities 2015', false);
// Apply the color palette to the friction surface.
var frictionVis = {min:0.0022, max:0.04, palette:frictionPalette};
var frictionRgb = friction.visualize(frictionVis);
// Add the visualization of the friction surface to the map, default off.
Map.addLayer(frictionRgb, {}, 'Friction Surface', false);
// Locations of hospitals on Wikipedia's list of hospitals in Romania:
var hospitals = ee.FeatureCollection(table);
// Paint the locations of hospitals into an image.
var hospitalImage = ee.Image(0).float().paint(hospitals, 1);
// Compute the cumulative travel time from everywhere to the nearest hospital.
var travelTime = friction.cumulativeCost(hospitalImage, 200000);
// Apply the color palette to the log of travel time.
var logTravelTime = travelTime.where(travelTime.gt(0), travelTime.log());
var travelTimeRgb = logTravelTime.visualize(accessibilityVis);
// Mask the oceans and composite onto a solid-color background.
var travelTimeMasked = travelTimeRgb.mask(accessibility.mask());
var travelTimeBlended = background.blend(travelTimeMasked).updateMask(1);
// Add the visualization of our custom accessibility indicator to the map.
Map.addLayer(travelTimeBlended, {}, 'Accessibility to Hospitals', true);
//Center map
Map.centerObject(table2,8);