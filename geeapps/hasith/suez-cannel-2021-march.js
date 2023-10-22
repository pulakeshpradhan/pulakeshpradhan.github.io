/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var suez = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[32.04047410457059, 30.61763806635276],
          [32.04047410457059, 29.462131261300126],
          [32.91114060847684, 29.462131261300126],
          [32.91114060847684, 30.61763806635276]]], null, false),
    imageVisParam3 = {"opacity":1,"bands":["VV"],"min":-21.70438670465952,"max":-2.089123525677138,"gamma":1},
    geometry5 = /* color: #ff0000 */ee.Geometry.Point([32.579622858414204, 30.018757829257712]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dataset = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filterDate('2021', '2022')
        .filterBounds(suez)
var pre = dataset.filterDate('2021-03-20','2021-03-27');
//Map.addLayer(post.mean());
//var poly1 = geometry4.buffer(5000);
Map.centerObject(suez,11)
//Map.addLayer(poly1, {color: '0000FF'}, 'poly2');
var poly1 = suez;
Map.addLayer(pre.mean().select("VV").clip(poly1),imageVisParam3);
//Map.addLayer(post.mean().select("VV").clip(poly1),imageVisParam2);