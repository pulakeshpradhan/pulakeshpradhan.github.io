var ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/soleimanisaeed/AnneNg/CityofDarwin"
    }) || ee.FeatureCollection("users/soleimanisaeed/AnneNg/CityofDarwin"),
    VIS_OCCURRENCE = ui.import && ui.import("VIS_OCCURRENCE", "imageVisParam", {
      "params": {
        "min": 0,
        "max": 100,
        "palette": [
          "red",
          "blue"
        ]
      }
    }) || {"min":0,"max":100,"palette":["red","blue"]},
    VIS_WATER_MASK = ui.import && ui.import("VIS_WATER_MASK", "imageVisParam", {
      "params": {
        "palette": [
          "black",
          "blue"
        ]
      }
    }) || {"palette":["black","blue"]},
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_0/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    gfc2020 = ui.import && ui.import("gfc2020", "image", {
      "id": "UMD/hansen/global_forest_change_2020_v1_8"
    }) || ee.Image("UMD/hansen/global_forest_change_2020_v1_8");
var gsw = gsw.clip(ROI),
    gfc2020= gfc2020.clip(ROI);
//------------------------------------------------
//                     Asset List                 |
//------------------------------------------------
var occurrence = gsw.select('occurrence');
//------------------------------------------------
//                    Calculations                |
//------------------------------------------------
// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(50).unmask(0).clip(ROI);
//------------------------------------------------
//              Initialize Map Location           |
//------------------------------------------------
Map.setCenter( 130.8994, -12.4018, 11);  // Darwin City, Australia
//------------------------------------------------
//                     Map Layers                 |
//------------------------------------------------
Map.addLayer({
              eeObject: water_mask,
              visParams: VIS_WATER_MASK,
              name: '50% occurrence water mask',
              shown:false
              });
Map.addLayer({
              eeObject: occurrence, 
              name: 'Water Occurrence (1984-2015)',
              shown:false
              });
Map.addLayer({
              eeObject: occurrence.updateMask(occurrence.divide(100)),
              // eeObject: occurrence,
              name: 'Water Occurrence (1984-2015)',
              visParams: VIS_OCCURRENCE,
              shown:false
              });
/* This band combination shows
healthy vegetation as green
and soil as mauve:
*/
Map.addLayer(
            gfc2020,
            {bands: ['last_b50', 'last_b40', 'last_b30']},
            'false color'
            ,false
              );
/*
 forest extent in 2000 as green, 
 forest loss as red, 
 and forest gain as blue:
*/
Map.addLayer(
            gfc2020, 
            {bands: ['loss', 'treecover2000', 'gain'],max:[1, 255, 1]},
            'forest cover, loss, gain'
            ,false
            );
Map.addLayer(gfc2020.mask(gfc2020),
            {
              bands: ['treecover2000'],
              palette: ['000000', '00FF00'],
              max: 100
            },
            'forest cover palette'
            // ,false
            );
// ================================
var treeCover = gfc2020.select(['treecover2000']);
var lossImage = gfc2020.select(['loss']);
var gainImage = gfc2020.select(['gain']);
// Add the tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover');
// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
            {palette: ['FF0000']}, 'Loss');
// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
            {palette: ['0000FF']}, 'Gain');
var areaLoss = lossImage.multiply(ee.Image.pixelArea());            
// Sum the values of forest loss pixels in the ROI.
var stats = areaLoss.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: ROI,
  scale: 30
});
print('Loss  Area m^2: ', stats.get('loss'));
// ==========================
var areaGain = gainImage.multiply(ee.Image.pixelArea());
// Sum the values of forest loss pixels in the Congo Republic.
var gainImage_stats = areaGain.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: ROI,
  scale: 30
});
print('Gain Area m^2: ', gainImage_stats.get('gain'));
// ============================================
var areaCover = treeCover.multiply(ee.Image.pixelArea());
// Sum the values of forest loss pixels in the Congo Republic.
var treeCover_stats = areaCover.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: ROI,
  scale: 30
});
print('A ', treeCover_stats);
print('Area of  tree Cover km^2: ', treeCover_stats.get('treecover2000'));