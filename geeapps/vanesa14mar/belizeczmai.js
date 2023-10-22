var bz08 = ui.import && ui.import("bz08", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bz08"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bz08"),
    bz18 = ui.import && ui.import("bz18", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bz_18_6"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bz_18_6"),
    BAU2030 = ui.import && ui.import("BAU2030", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bau2030ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bau2030ftoag"),
    fires = ui.import && ui.import("fires", "table", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/biggerfires_gee"
    }) || ee.FeatureCollection("users/vanesa14mar/BZ_LULC_CZMAI/biggerfires_gee"),
    BAU2050 = ui.import && ui.import("BAU2050", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bau2050ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bau2050ftoag"),
    BAU2070 = ui.import && ui.import("BAU2070", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bau2070ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bau2070ftoag"),
    BAU2090 = ui.import && ui.import("BAU2090", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bau2090ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/bau2090ftoag"),
    CON2030 = ui.import && ui.import("CON2030", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/cons2030ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/cons2030ftoag"),
    CON2050 = ui.import && ui.import("CON2050", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/cons2050ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/cons2050ftoag"),
    CON2070 = ui.import && ui.import("CON2070", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/cons2070ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/cons2070ftoag"),
    CON2090 = ui.import && ui.import("CON2090", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/cons2090ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/cons2090ftoag"),
    DEV2030 = ui.import && ui.import("DEV2030", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/dev2030ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/dev2030ftoag"),
    DEV2050 = ui.import && ui.import("DEV2050", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/dev2050ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/dev2050ftoag"),
    DEV2070 = ui.import && ui.import("DEV2070", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/dev2070ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/dev2070ftoag"),
    DEV2090 = ui.import && ui.import("DEV2090", "image", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/dev2090ftoag"
    }) || ee.Image("users/vanesa14mar/BZ_LULC_CZMAI/dev2090ftoag"),
    PA = ui.import && ui.import("PA", "table", {
      "id": "users/vanesa14mar/BZ_LULC_CZMAI/bz_con1rs_shp1rp"
    }) || ee.FeatureCollection("users/vanesa14mar/BZ_LULC_CZMAI/bz_con1rs_shp1rp"),
    watersheds = ui.import && ui.import("watersheds", "table", {
      "id": "users/vanesa14mar/bz_watersheds_srtm30m_gee"
    }) || ee.FeatureCollection("users/vanesa14mar/bz_watersheds_srtm30m_gee"),
    bz_aoi = ui.import && ui.import("bz_aoi", "table", {
      "id": "users/vanesa14mar/bz_aoi"
    }) || ee.FeatureCollection("users/vanesa14mar/bz_aoi");
Map.centerObject(BAU2030, 8)
//Vis Param
// var Vis = {
//   min: 1.0,
//   max: 6.0,
//   palette: [
//     '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
//     'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
//     '69fff8', 'f9ffa4', '1c0dff'
//   ],
// };
var Vis6 = {
  min: 1.0,
  max: 6.0,
  palette: [
    '006400', '32CD32', 'FF0000', '87CEFA', 'FFFF00', 'FFA500',
  ],
};
//FFFF00 is yellow, FFA500 is orange, 006400 is dark green, 32CD32 is lime green, FF0000 is red, 87CEFA is light sky blue
//var Vis_Watersheds = ['FDFEFE'];
Map.addLayer(bz08, Vis6, '2008LULC', true);
Map.addLayer(bz18, Vis6, '2018LULC', true);
Map.addLayer(BAU2030, Vis6, 'BAU2030', false);
Map.addLayer(BAU2050, Vis6, 'BAU2050', false);
Map.addLayer(BAU2070, Vis6, 'BAU2070', false);
Map.addLayer(BAU2090, Vis6, 'BAU2090', false);
Map.addLayer(CON2030, Vis6, 'CON2030', false);
Map.addLayer(CON2050, Vis6, 'CON2050', false);
Map.addLayer(CON2070, Vis6, 'CON2070', false);
Map.addLayer(CON2090, Vis6, 'CON2090', false);
Map.addLayer(DEV2030, Vis6, 'DEV2030', false);
Map.addLayer(DEV2050, Vis6, 'DEV2050', false);
Map.addLayer(DEV2070, Vis6, 'DEV2070', false);
Map.addLayer(DEV2090, Vis6, 'DEV2090', false);
Map.addLayer(watersheds.draw({color: 'FDFEFE', strokeWidth: 2}), {}, 'Watershed_bounds', false)
Map.addLayer(fires.draw({color: 'A93226', strokeWidth: 1}), {}, 'Fires', false);
//Map.addLayer(PA.draw({color: '154360', strokeWidth: 2}), {}, 'ProtectedAreas')
//Map.addLayer(ProtecAreas, {}, 'ProtecAreas'); make them all one color? Val >= 0.5 are one class
//DEV
//Map.addLayer(BZWatersheds, {}, 'BZWatersheds');
// var pa = PA.clip(bz_aoi).FeatureCollection('users/vanesa14mar/BZ_LULC_CZMAI/bz_con1rs_shp1rp').byte().paint({
//   featureCollection: PA,
//   color: white,
//   width: 2
// });
// Map.addLayer(PA, {}, 'ProtectedAreas')
// var pa = ee.FeatureCollection('users/vanesa14mar/BZ_LULC_CZMAI/bz_con1rs_shp1rp').byte().paint({
//   color: white,
//   width: 2
// });
// Map.addLayer(PA, {}, 'ProtectedAreas')
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: PA,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'white'}, 'ProtectedAreas');
var empty2 = ee.Image().byte();
var outline2 = empty2.paint({
  featureCollection: watersheds,
  color: 1,
  width: 2
})
Map.addLayer(outline2, {palette: 'black'}, 'WatershedBounds')