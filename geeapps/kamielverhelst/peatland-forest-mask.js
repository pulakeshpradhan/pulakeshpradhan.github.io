var aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/kamielverhelst/TrainingPoly"
    }) || ee.FeatureCollection("users/kamielverhelst/TrainingPoly"),
    aoi_validation = ui.import && ui.import("aoi_validation", "table", {
      "id": "users/kamielverhelst/ValidationPoly"
    }) || ee.FeatureCollection("users/kamielverhelst/ValidationPoly"),
    FNF_Selection_Clean = ui.import && ui.import("FNF_Selection_Clean", "table", {
      "id": "users/kamielverhelst/FNF_Selection_Clean_2class"
    }) || ee.FeatureCollection("users/kamielverhelst/FNF_Selection_Clean_2class"),
    Labeled_Training_2class = ui.import && ui.import("Labeled_Training_2class", "image", {
      "id": "users/kamielverhelst/Labeled_Training_2class"
    }) || ee.Image("users/kamielverhelst/Labeled_Training_2class"),
    Labeled_Validation_2class = ui.import && ui.import("Labeled_Validation_2class", "image", {
      "id": "users/kamielverhelst/Labeled_Validation_2class"
    }) || ee.Image("users/kamielverhelst/Labeled_Validation_2class"),
    DEM = ui.import && ui.import("DEM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    ForestHeight = ui.import && ui.import("ForestHeight", "image", {
      "id": "users/potapovpeter/GEDI_V27/GEDI_SAFR_v27"
    }) || ee.Image("users/potapovpeter/GEDI_V27/GEDI_SAFR_v27"),
    Baseline_GRS = ui.import && ui.import("Baseline_GRS", "image", {
      "id": "projects/radar-wur/raddalert/gfw/africa_radd_primaryhumidtropicalforest_baseline2018_v20201206"
    }) || ee.Image("projects/radar-wur/raddalert/gfw/africa_radd_primaryhumidtropicalforest_baseline2018_v20201206"),
    MaskPT030 = ui.import && ui.import("MaskPT030", "image", {
      "id": "users/kamielverhelst/Comparison_MaskPT030_gabon_adm0"
    }) || ee.Image("users/kamielverhelst/Comparison_MaskPT030_gabon_adm0"),
    MaskPT050 = ui.import && ui.import("MaskPT050", "image", {
      "id": "users/kamielverhelst/Comparison_MaskPT050_gabon_adm0"
    }) || ee.Image("users/kamielverhelst/Comparison_MaskPT050_gabon_adm0"),
    MaskPT070 = ui.import && ui.import("MaskPT070", "image", {
      "id": "users/kamielverhelst/Comparison_MaskPT070_gabon_adm0"
    }) || ee.Image("users/kamielverhelst/Comparison_MaskPT070_gabon_adm0"),
    gabon_adm0 = ui.import && ui.import("gabon_adm0", "table", {
      "id": "users/kamielverhelst/gabon_adm0"
    }) || ee.FeatureCollection("users/kamielverhelst/gabon_adm0"),
    s2_cloudfree = ui.import && ui.import("s2_cloudfree", "image", {
      "id": "users/kamielverhelst/S2_cloudfree_2019"
    }) || ee.Image("users/kamielverhelst/S2_cloudfree_2019"),
    ExtendedArea_MaskPT050 = ui.import && ui.import("ExtendedArea_MaskPT050", "image", {
      "id": "users/kamielverhelst/ExtendedArea_MaskPT050_gabon_adm0"
    }) || ee.Image("users/kamielverhelst/ExtendedArea_MaskPT050_gabon_adm0");
Map.centerObject(aoi, 12);
//imported functions & paramters 
//-------------------------------
var data_import = require('users/kamielverhelst/Thesis_FM:share/data_import');
var plot = require('users/kamielverhelst/Thesis_FM:share/plot_helper');
var appUI = require('users/kamielverhelst/Thesis_FM:share/app_ui');
//// Load S1 data
// var s1_VV_stat = data_import.add_s1_stat('2019-01-01','2019-12-31', 'VV', '', gabon_adm0); 
var s1_VH_stat = data_import.add_s1_stat('2019-01-01','2019-12-31', 'VH', '', gabon_adm0);
Map.addLayer(s1_VH_stat.select('VH_mean'), {min: -20.5, max: -8.5}, 'Sentinel-1 (radar) VH 2019 mean', false);
//// Add landcover layer (Aldous, 2020)
// var aldous_palette = data_import.gabon_coastal_landcover();
// plot.createLegend('Legend (Land cover)', aldous_palette[0], aldous_palette[1], 'bottom-left');
Map.addLayer(s2_cloudfree, {'bands': ['B4', 'B3', 'B2'], 'min': 0, 'max': 2500, 'gamma': 1.1},
                'S2 cloud-free mosaic');
// Define function to compute a binary forest mask from a probability layer
function createForestMask(classified, threshold) {
  var mask = classified.expression(
  '( CLASS > ' + threshold.toString() + ' )', {
    'CLASS': classified
  });
  return mask.mask(mask); // apply mask on itself to set 0 -> nodata
}
// Generate mask from ForestHeight data, with threshold at 10 meters
var Baseline_FH = createForestMask(ForestHeight, 10)
// Load and add benchmark masks
var baselinecols = ['5c6353', '97a683'];
Map.addLayer(Baseline_GRS, {palette: baselinecols[0]}, 'Baseline (GRS)', false);
Map.addLayer(Baseline_FH, {palette: baselinecols[1]}, 'Baseline (GLAD Forest Height)', false);
// Define project forest mask colors
var greens = ['90c489', '629e5a', '36732e', '48a832'];
// Compute forest mask for a set of threshold values
var PTs = [0.30, 0.50, 0.70];
var masks = [MaskPT030, MaskPT050, MaskPT070, ExtendedArea_MaskPT050_masked, Baseline_GRS, Baseline_FH];
var maskNames = ['Project (PT=0.30)', 'Project (PT=0.50)', 'Project (PT=0.70)', 'Project (Extended Area)', 'Baseline (GRS)', 'Baseline (GLAD Forest Height)'];
for (var i = 0; i < PTs.length; i++) {
  // masks[i] = createForestMask(classified_full, PTs[i]);
  Map.addLayer(masks[i], {palette: [greens[i]]}, maskNames[i], false);
}
var ExtendedArea_MaskPT050_masked = ExtendedArea_MaskPT050.mask(ExtendedArea_MaskPT050);
Map.addLayer(ExtendedArea_MaskPT050_masked, {palette: greens[3]}, maskNames[3]);
// Export.image.toAsset({
//   image: masks[1], 
//   assetId: 'Comparison_MaskPT050_gabon_adm0',
//   region: gabon_adm0,
//   scale: 20,
//   maxPixels: 150000000000
// })
// Create a legend
plot.createLegend('Forest Masks', (greens +','+ baselinecols).split(','), maskNames, 'bottom-right');
// Set up side panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px', padding: '20px'}
});
appUI.loadInterface(panel);
// Define performance function
function computePerfMetrics(region, mask, labeled) {
  // trick to get performance pixels (TN, FP, FN, TP)
  var performance = mask.expression(
  '2 * LAB + CLASS', {
    'LAB': labeled,
    'CLASS': mask.unmask()
  });
  // var perf_style = {min: 0, max: 3, palette: ['000000', '35e329', '2d7cfb', 'dc0f0f']}
  // Map.addLayer(performance, perf_style, 'Performance');
  // get the frequencies of the performance pixels (TN, FP, FN, TP)
  var hist = ee.Dictionary(performance.reduceRegion({
    reducer: ee.Reducer.histogram(4, 1),
    geometry: region,
    scale: 20,
  }).get('constant'));
  var hist_list = ee.List(hist.get('histogram')).getInfo()
  // compute metrics
  var acc = ( hist_list[0] + hist_list[3] ) / ( hist_list[0] + hist_list[1] + hist_list[2] + hist_list[3] );
  var users_acc = hist_list[3] / (hist_list[3] + hist_list[1]);
  var prods_acc = hist_list[3] / (hist_list[3] + hist_list[2]);
  // return metrics
  return [acc, users_acc, prods_acc];
}
// Add a selector for the metrics calculation
panel.add(ui.Label({
  value: 'Select a mask to calculate performance:',
  style: {
    fontWeight: '900',
    fontSize: '12px',
    margin: '0',
  }
}))
var selector = ui.Select({
  items: maskNames,
  onChange: function(key) {
    var metrics = computePerfMetrics(aoi_validation, masks[maskNames.indexOf(key)], Labeled_Validation_2class);
    print(metrics);
    acc.setValue('Accuracy: ' + (Math.round(metrics[0] * 10000) / 100) + '%');
    users_acc.setValue('User\'s Accuracy: ' + (Math.round(metrics[1] * 10000) / 100) + '%');
    producers_acc.setValue('Producer\'s Accuracy: ' + (Math.round(metrics[2] * 10000) / 100) + '%');
  },
  style: {margin: '5px 0 5px 0'}
}).setPlaceholder('Select a mask...');
panel.add(selector);
panel.add(ui.Label({
  value: 'Results (might take a minute):',
  style: {
    fontWeight: '900',
    fontSize: '12px',
    margin: '0',
  }
}));
var acc = ui.Label({
  value: 'Accuracy: ',
  style: {
    fontSize: '12px',
    margin: '0',
  }
});
var users_acc = ui.Label({
  value: 'User\'s Accuracy:',
  style: {
    fontSize: '12px',
    margin: '0',
  }
});
var producers_acc = ui.Label({
  value: 'Producer\'s Accuracy:',
  style: {
    fontSize: '12px',
    margin: '0',
  }
});
// Final UI additions
panel.add(acc);
panel.add(users_acc);
panel.add(producers_acc);
Map.addLayer(Labeled_Validation_2class, {min: 0, max: 1}, 'Validation Labels', false);
Map.addLayer(aoi_validation, {}, 'Validation Area', false);
ui.root.add(panel);