/*
Notes:
- The string in the end of the filename is the link to the script run to produce the Asset
- minObs3 = minimum 3 consecutive anomalous observations to flag a change (algoritm is then more sensitive to detect change, but prone to false positive detection).
- minObs6 = minimum 6 consecutive anomalous observations to flag a change (default, algorithm is more conservative i.e. less sensitive, but prone to false negative detection).
- Consider running minObservations = 4 and chiSquareProbability = 0.90. As usual, the optimal parameters depend on the target change types to be mapped (balancing omission and commission errors).
- Consider filtering the change pixels by change direction (negative NDMI change signal tree cover loss), change magnitude, and the spatial contiguity (connectivity) of the change pixels.
- Repository by Daniel Wiell to process CCDC results in Earth Engine:
  https://code.earthengine.google.com/?accept_repo=users/wiell/temporalSegmentation
  https://code.earthengine.google.com/?accept_repo=users/wiell/temporalSegmentationExamples
- Heard that the Boston team is also actively developing scripts to process CCDC results in Earth Engine.
*/
////////////////////////////////////////////////////////////////
////////// Import libraries ///////////////////////
////////////////////////////////////////////////////////////////
var temporalSegmentation = require('users/wiell/temporalSegmentation:temporalSegmentation')
var palettes = require('users/gena/packages:palettes');
var cont_palette = palettes.colorbrewer.RdYlGn[7].slice(0).reverse();
////////////////////////////////////////////////////////////////
////////// CCDC results ///////////////////////
////////////////////////////////////////////////////////////////
// More sensitive, consider running minObs = 4, threshold = 0.90
// var ccdc_EK_minObs3 = ee.Image("users/hadicu06/IIASA/CCDC/CCDC_prov_EK_30m_NDMI_minObs3_3a61299978ad3f0a1402ed15cc17ddc7")
var ccdc_EK_minObs6 = ee.Image("users/hadicu06/IIASA/CCDC/CCDC_prov_EK_30m_NDMI_minObs6_914d0afa608667f70d33bbd81a8e4803")
// var ccdc_SS_minObs3 = ee.Image("users/hadicu06/IIASA/CCDC/CCDC_prov_SS_30m_NDMI_minObs3_026e5f4117508c3c3a51a00dfce323b7")
var ccdc_SS_minObs6 = ee.Image("users/hadicu06/IIASA/CCDC/CCDC_prov_SS_30m_NDMI_minObs6_32f26edd8fda6416f6284b57046cb326")
////////////////////////////////////////////////////////////////
////////// SAR results ///////////////////////
////////////////////////////////////////////////////////////////
// SAR-based change, SS
var PALSAR_cumulative_MF_SS = ee.Image("users/nehajo88/PALSAR_cumulative2010_2015_MF") // 2010-2015, SS
var S1_cumulative_MF_SS = ee.Image("users/nehajo88/S1_cumulative_2015-2018MF") // 2015-2018, SS
// SAR-based change, EK
var PALSAR_cumulative_MF_EK = ee.Image("users/nehajo88/PALSAR_cumulative2010_2015_MF_EK") // 2010-2015, EK
var S1_cumulative_MF_EK = ee.Image("users/nehajo88/S1_cumulative_2015-2018MF_EK") // 2015-2018, EK
////////////////////////////////////////////////////////////////
////////// Vector data ///////////////////////
////////////////////////////////////////////////////////////////
var provinces = ee.FeatureCollection("users/hadicu06/IIASA/vector/RBI/Admin_Provinsi_simpl15m") // "WA" == "KALIMANTAN TIMUR"
var admin_SS = provinces.filterMetadata("WA", "equals", "SUMATERA SELATAN")
var admin_EK = provinces.filterMetadata("WA", "equals", "KALIMANTAN TIMUR")
////////////////////////////////////////////////////////////////
//////////// Process data structure of CCDC output ////////////////////
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
// Make a function
/////////////////////////////////////////////////
function getNumberOfBreaks(ccdc_res, start_date, end_date){
  var tBreak = ccdc_res.select('tBreak');
  var tBreakArray = tBreak.toArray();
  var epochDay = 719529
  var jdays_start = ee.Array(ee.Date(start_date).millis().divide(1000).divide(3600).divide(24).add(epochDay))
  var jdays_end = ee.Array(ee.Date(end_date).millis().divide(1000).divide(3600).divide(24).add(epochDay))
  ////////////////////////////////////////////////////////////////
  // Mask to keep only change between jdays_start and jdays_end
  ////////////////////////////////////////////////////////////////////////
  // Mask
  var tBreakMask_start = tBreakArray.gt(jdays_start);
  var tBreakMask_end = tBreakArray.lt(jdays_end);
  var tBreakMask_start_end = tBreakMask_start.and(tBreakMask_end)
  //Map.addLayer(tBreakMask_start_end, {}, 'tBreakMask_start_end', true)
  // Date of breaks
  var tBreakArray_masked_start_to_end = tBreakArray.arrayMask(tBreakMask_start_end)
  // Magnitude
  var magnArray = ccdc_res.select('ndmi_magnitude').toArray()
  var magnArray_masked_start_to_end = magnArray.arrayMask(tBreakMask_start_end)
  //Map.addLayer(magnArray_masked_start_to_end, {}, 'magnArray_masked_start_to_end', false)
  ///////////////////////////////////////////////////////////
  // KEEP ONLY NEGATIVE MAGNITUDE BREAKS = COVER LOSS
  ////////////////////////////////////////////////////////////////////////
  var keepNegMagnMask = magnArray_masked_start_to_end.lt(0)
  // Date of breaks
  var tBreakArray_masked_start_to_end_neg = tBreakArray_masked_start_to_end.arrayMask(keepNegMagnMask)
  // Magnitude
  var magnArray_masked_start_to_end_neg = magnArray_masked_start_to_end.arrayMask(keepNegMagnMask)
  ////////////////////////////////////////////////////////////////////////
  /////////////// Treat pixels with zero element (empty) of array as masked ///////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  var emptyArrayMask = magnArray_masked_start_to_end_neg.arrayLength(0).gt(0)
  //Map.addLayer(emptyArrayMask, {}, 'emptyArrayMask', true)
  magnArray_masked_start_to_end_neg = magnArray_masked_start_to_end_neg.updateMask(emptyArrayMask)    // updateMask() works for array?
  tBreakArray_masked_start_to_end_neg = tBreakArray_masked_start_to_end_neg.updateMask(emptyArrayMask)
  var numBreaks_starttoend = tBreakArray_masked_start_to_end_neg.arrayLength(0).rename('num_breaks')
  // Mask pixels with 0 number of breaks
  numBreaks_starttoend = numBreaks_starttoend.updateMask(numBreaks_starttoend.neq(0))
  var numBreaks_starttoend_int = numBreaks_starttoend.uint8()
  // Map.addLayer(numBreaks_starttoend_int, {palette: cont_palette, min:1, max:5}, 'numBreaks_starttoend_int', true)
  return numBreaks_starttoend_int;
}
/////////////////////////////////////////////////
// Run the function
/////////////////////////////////////////////////
// 2010-2015, SS
var breaks_SS_obs6_2010_2015 = getNumberOfBreaks(ccdc_SS_minObs6, '2010-01-01', '2014-12-31')
var breaks_SS_obs6_2010_2015 = getNumberOfBreaks(ccdc_SS_minObs6, '2010-01-01', '2014-12-31')
// 2010-2015, EK
var breaks_EK_obs6_2010_2015 = getNumberOfBreaks(ccdc_EK_minObs6, '2010-01-01', '2014-12-31')
var breaks_EK_obs6_2010_2015 = getNumberOfBreaks(ccdc_EK_minObs6, '2010-01-01', '2014-12-31')
// 2015-2018, SS
var breaks_SS_obs6_2015_2018 = getNumberOfBreaks(ccdc_SS_minObs6, '2015-01-01', '2018-12-31')
var breaks_SS_obs6_2015_2018 = getNumberOfBreaks(ccdc_SS_minObs6, '2015-01-01', '2018-12-31')
// 2015-2018, EK
var breaks_EK_obs6_2015_2018 = getNumberOfBreaks(ccdc_EK_minObs6, '2015-01-01', '2018-12-31')
var breaks_EK_obs6_2015_2018 = getNumberOfBreaks(ccdc_EK_minObs6, '2015-01-01', '2018-12-31')
////////////////////////////////////////////////////////////////
//////////// VISUALIZE ////////////////////
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Make two map panels, not linked
//////////////////////////////////////////////////////////////////
var rightMapEK = ui.Map()
var leftMapSS = ui.Map()
// ui.Map.Linker([rightMapEK, leftMapSS])
var splitMap = ui.SplitPanel(rightMapEK, leftMapSS, 'horizontal', false);
ui.root.clear()
// ui.root.add(rightMapEK)
// ui.root.add(leftMapSS)
ui.root.add(splitMap)
rightMapEK.addLayer(breaks_EK_obs6_2010_2015.gte(1).selfMask(), {palette:'red'}, "OPTIC: Breakpoint(s) during 2010-2015 (RED)")
rightMapEK.addLayer(breaks_EK_obs6_2015_2018.gte(1).selfMask(), {palette:'orange'}, "OPTIC: Breakpoint(s) during 2015-2018 (ORANGE)")
leftMapSS.addLayer(breaks_SS_obs6_2010_2015.gte(1).selfMask(), {palette:'red'}, "OPTIC: Breakpoint(s) during 2010-2015 (RED)")
leftMapSS.addLayer(breaks_SS_obs6_2015_2018.gte(1).selfMask(), {palette:'orange'}, "OPTIC: Breakpoint(s) during 2015-2018 (ORANGE)")
// Add SAR maps
leftMapSS.addLayer(PALSAR_cumulative_MF_SS, {palette:'#ffff99'}, "SAR: 2010-2015 (YELLOW)")
leftMapSS.addLayer(S1_cumulative_MF_SS, {palette:'#b15928'}, "SAR: 2015-2018 (BROWN)")
rightMapEK.addLayer(PALSAR_cumulative_MF_EK, {palette:'#ffff99'}, "SAR: 2010-2015 (YELLOW)")
rightMapEK.addLayer(S1_cumulative_MF_EK, {palette:'#b15928'}, "SAR: 2015-2018 (BROWN)")
/////////////////////////////////////////////////////////////////////
// Final touch on map display
////////////////////////////////////////////////////////////////////
leftMapSS.setOptions('SATELLITE')
rightMapEK.setOptions('SATELLITE')
leftMapSS.centerObject(admin_SS, 6)
rightMapEK.centerObject(admin_EK, 6)
rightMapEK.add(ui.Label("East Kalimantan", {position:'top-center', fontWeight:'bold'}))
leftMapSS.add(ui.Label("South Sumatera", {position:'top-center', fontWeight:'bold'}))
rightMapEK.addLayer(ee.Image().byte().paint(admin_EK, null, "blue"), {palette:'blue'}, "East Kalimantan")
leftMapSS.addLayer(ee.Image().byte().paint(admin_SS, null, "blue"), {palette:'blue'}, "South Sumatera")