var mosaic = ui.import && ui.import("mosaic", "image", {
      "id": "projects/wwf-de/Virungas/Mosaic_Class_v4"
    }) || ee.Image("projects/wwf-de/Virungas/Mosaic_Class_v4"),
    Hansen = ui.import && ui.import("Hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    S2 = ui.import && ui.import("S2", "image", {
      "id": "projects/wwf-de/Virungas/Virungas_S2_2018_comp"
    }) || ee.Image("projects/wwf-de/Virungas/Virungas_S2_2018_comp"),
    S1 = ui.import && ui.import("S1", "image", {
      "id": "projects/wwf-de/Virungas/Virungas_S1_2018"
    }) || ee.Image("projects/wwf-de/Virungas/Virungas_S1_2018"),
    s2viz = ui.import && ui.import("s2viz", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "red",
          "green",
          "blue"
        ],
        "min": 0.050097203701734545,
        "max": 0.12476985260844231,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["red","green","blue"],"min":0.050097203701734545,"max":0.12476985260844231,"gamma":1},
    s1viz = ui.import && ui.import("s1viz", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH_phase_1",
          "VV_phase_1",
          "ratio_p20"
        ],
        "min": -2440,
        "max": 2384,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH_phase_1","VV_phase_1","ratio_p20"],"min":-2440,"max":2384,"gamma":1},
    vir_lands = ui.import && ui.import("vir_lands", "table", {
      "id": "users/WWFDE/Virungas/Virungas_Landscape"
    }) || ee.FeatureCollection("users/WWFDE/Virungas/Virungas_Landscape");
// // Recode classes
var maskParks = mosaic.lte(19);
var maskLandscape = mosaic.gte(1);
var mosaicParks = mosaic.expression(
  "(b(0) == 6) ? 1" +
  ": (b(0) == 7) ? 2" +
  ": (b(0) == 2) ? 3" +
  ": (b(0) == 5) ? 4" +
  ": (b(0) == 8) ? 5" +
  ": (b(0) == 4) ? 6" +
  ": (b(0) == 13) ? 7" +
  ": (b(0) == 12) ? 8" +
  ": (b(0) == 15) ? 9" +
  ": (b(0) == 18) ? 10" +
  ": (b(0) == 19) ? 11" +
  ": (b(0) == 20) ? 12" +
  ": (b(0) == 21) ? 13" +
  ": (b(0) == 22) ? 14" +
  ": (b(0) == 23) ? 15" +
  ": (b(0) == 24) ? 16" +
  ": (b(0) == 25) ? 17" +
  ": 0")
  .updateMask(maskParks);
var landscape = mosaic.expression(
  "(b(0) <= 20) ? 12" +
  ": (b(0) == 21) ? 13" +
  ": (b(0) == 22) ? 14" +
  ": (b(0) == 23) ? 15" +
  ": (b(0) == 24) ? 16" +
  ": (b(0) == 25) ? 17" +
  ": 0")
  .updateMask(maskLandscape);
// // Add Hansen's forest loss
var loss = Hansen.select('loss').updateMask(mosaic);
var maskL = loss.eq(1);
var loss = loss.mask(maskL);
// // Compute hillshade
var hillshade = ee.Terrain.hillshade(srtm.select('elevation').updateMask(mosaic));
// // // // Map
// // Add legend
var add_legend1 = function(title, lbl, pal) {
  var legend1 = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend1.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '13px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 2px 0'}, value: '██'}),
      ui.Label({ value: labels1[x], style: { fontSize: '12px', margin: '2px 0 2px 4px' } }) ];
    legend1.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend1); };
var add_legend2 = function(title, lbl, pal) {
  var legend2 = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend2.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '13px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 2px 0'}, value: '██'}),
      ui.Label({ value: labels2[x], style: { fontSize: '12px', margin: '2px 0 2px 4px' } }) ];
    legend2.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend2); };
var palette1 = ['73b273' //    Forest
               ,'ffd27f' //    Grassland
               ,'fff5d7' //    Bare soil
               ,'ffffbe' //    Cropland
               ,'97dbf2' //    Water
               ,'ff7f7f' //    Urban
];
var palette2 = ['1a4020' //  6 & 9  High & Low Closed Mixed Forest
               ,'247532' //  7 & 10 High & Low Open Mixed Forest
               ,'96C569' //  2 & 3 Bamboo (Mixed & Pure)
               ,'D7E3BB' //  5 Herbaceous
               ,'89456A' //  8 Hypericum
               ,'F0C1D3' //  4 Hagenia
               ,'D4A70B' // 13 Neoboutonia forest
               ,'F0D20B' // 12 Mimulopsis
               ,'D8A872' // 15 Bracken fern
               ,'1B989E' // 18 Swamp
               ,'6677CD' // 19 Sub-alpine/Alpine
];
var labels1 = ['Forest',
               'Grassland',
               'Bare soil',
               'Cropland',
               'Water',
               'Urban'];
var labels2 = ['Closed mixed forest', 
               'Open mixed forest',
               'Bamboo (Mixed/Pure)',
               'Herbaceous',
               'Hypericum',
               'Hagenia',
               'Neoboutonia forest',
               'Mimulopsis',
               'Bracken fern',
               'Swamp',
               'Sub-alpine/Alpine'];
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: vir_lands,
  color: 1,
  width: 3
});
// // Display the classification
Map.setCenter(29.476972, -1.180427, 10);
Map.addLayer(S1.clip(vir_lands), s1viz, 'Sentinel-1', false);
Map.addLayer(S2.clip(vir_lands), s2viz, 'Sentinel-2', false);
Map.addLayer(landscape.clip(vir_lands), {palette: palette1, min: 12, max: 17}, 'Landcover Classification');
Map.addLayer(mosaicParks, {palette: palette2, min: 1, max: 11}, 'Vegetation Classification');
Map.addLayer(loss.clip(vir_lands), {min: 1, max: 1, palette: ['780202']}, 'Tree Cover loss', false);
Map.addLayer(hillshade.clip(vir_lands), {opacity: 0.2}, 'Hillshade');
Map.addLayer(outline, {palette: 'orange'}, 'Virungas Landscape');
add_legend1('Landcover Classification', labels1, palette1);
add_legend2('Vegetation Classification', labels2, palette2);