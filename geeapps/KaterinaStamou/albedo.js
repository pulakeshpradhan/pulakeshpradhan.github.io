var sent2 = ui.import && ui.import("sent2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    montenegro = ui.import && ui.import("montenegro", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                18.584568472388685,
                42.973175717349
              ],
              [
                18.584568472388685,
                42.45251448004254
              ],
              [
                19.826023550513685,
                42.45251448004254
              ],
              [
                19.826023550513685,
                42.973175717349
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[18.584568472388685, 42.973175717349],
          [18.584568472388685, 42.45251448004254],
          [19.826023550513685, 42.45251448004254],
          [19.826023550513685, 42.973175717349]]], null, false);
 Map.centerObject(montenegro,11);
//CALCULATE ALBEDO
var albedo = function(image){
  var alb = image.expression(
  "((0.5673*BLUE)+(0.1407*GREEN)+(0.2359*RED))",
  {
    'RED': image.select('B4'),
    'BLUE':  image.select('B2'),
    'GREEN':  image.select('B3'),
  });
  return(image.addBands(alb.rename("albedo")));
};
// find 1st image
var firstimage = ee.ImageCollection(sent2)
                  .filterDate('2017-07-11','2017-07-12')
                  .filterBounds(montenegro)
                  .map(albedo)
                  .first();
print("firstimage",firstimage);
Map.addLayer(firstimage,{min:0,max:3000,bands:"B4,B3,B2"}, '1ST IMAGE MONTENEGRO',false);
//show the classified image SCL
var scl_1 = firstimage.select("SCL"); 
Map.addLayer(scl_1.clip(montenegro),{min:1,max:11, bands:"SCL", palette:['ff0004', '868686', '774b0a', '10d22c', 'ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9']}, 'SCL_1',false);
// MASK clouds based on SCL (SCL values 7-11 are Clouds Low/medium/high Probability, Cirrus, Snow/ice)
var firstimage_MaskedSCL = firstimage.updateMask(scl_1.lte(6));
Map.addLayer(firstimage_MaskedSCL,{min:0,max:3000,bands:"B4,B3,B2"}, '1st IMAGE MONTENEGRO scl',false);
// isolate just the albedo band
var Albedo_1 = firstimage_MaskedSCL.select("albedo"); 
Map.addLayer(Albedo_1.clip(montenegro),{min:0,max:3000,bands:"albedo", palette:['darkgreen', 'green', 'lightgrey', 'grey', 'white']}, 'ALBEDO_1ST DATE',false);
//Calculate WATER INDEX (from 1st date)
var ndwi = firstimage_MaskedSCL.normalizedDifference(['B3', 'B8']);
var ndwiViz = {min: -1, max: 1, palette: ['darkblue','lightblue','blue']};
Map.addLayer(ndwi.clip(montenegro), ndwiViz, 'NDWI_1',false);
//Calculate NDVI (from 1st date)
var NDVI_1st_date =firstimage_MaskedSCL.expression(
'(NIR-RED) / (NIR+RED)', {RED:firstimage_MaskedSCL.select('B4'), NIR:firstimage_MaskedSCL.select('B8'), BLUE:firstimage_MaskedSCL.select('B2')});
Map.addLayer(NDVI_1st_date.clip(montenegro),{palette:['darkgrey', 'grey', 'lightgreen', 'green', 'darkgreen'], min:0, max:1}, 'NDVI_1st_date',false);
// find 2nd image
var secondimage = ee.ImageCollection(sent2)
                  .filterDate('2019-08-04','2019-08-10')
                  .filterBounds(montenegro)
                  .map(albedo)
                  .first();
print("secondimage",secondimage);
Map.addLayer(secondimage,{min:0,max:3000,bands:"B4,B3,B2"}, '2ND IMAGE MONTENEGRO',false);
//show the classified image SCL
var scl_2 = secondimage.select("SCL"); 
Map.addLayer(scl_2.clip(montenegro),{min:1,max:11, bands:"SCL", palette:['ff0004', '868686', '774b0a', '10d22c', 'ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9']}, 'SCL_2',false);
// MASK clouds based on SCL (SCL values 7-11 are Clouds Low/medium/high Probability, Cirrus, Snow/ice)
var secondimage_MaskedSCL = secondimage.updateMask(scl_2.lte(6));
Map.addLayer(secondimage_MaskedSCL,{min:0,max:3000,bands:"B4,B3,B2"}, '2ND IMAGE MONTENEGRO scl',false);
// isolate just the albedo band
var Albedo_2 = secondimage_MaskedSCL.select("albedo"); 
Map.addLayer(Albedo_2.clip(montenegro),{min:0,max:3000,bands:"albedo", palette:['darkgreen', 'green', 'lightgrey', 'grey', 'white']}, 'ALBEDO_2nd DATE',false);
//Calculate WATER INDEX (from 2ND date)
var ndwi_2 = secondimage_MaskedSCL.normalizedDifference(['B3', 'B8']);
var ndwiViz = {min: -1, max: 1, palette: ['darkblue','lightblue','blue']};
Map.addLayer(ndwi_2.clip(montenegro), ndwiViz, 'NDWI_2',false);
//Calculate NDVI (from 2nd date)
var NDVI_2nd_date =secondimage_MaskedSCL.expression(
'(NIR-RED) / (NIR+RED)', {RED:secondimage_MaskedSCL.select('B4'), NIR:secondimage_MaskedSCL.select('B8'), BLUE:secondimage_MaskedSCL.select('B2')});
Map.addLayer(NDVI_2nd_date.clip(montenegro),{palette:['darkgrey', 'grey', 'lightgreen', 'green', 'darkgreen'], min:0, max:1}, 'NDVI_2nd_date',false);
//CALCULATE DIFFERENCE ALBEDO
var dn_1 =Albedo_2.subtract(Albedo_1)
Map.addLayer(dn_1.clip(montenegro),{min:0,max:3000,palette: ['00FFFF', '0000FF','0084FF','FCD163']},"ALBEDO_difference")
// Mask the green parts of dn, where NDVI of 2nd date is NDVI > 0.10.
var dn_1_Masked = dn_1.updateMask(NDVI_2nd_date.lte(0.1));
Map.addLayer(dn_1_Masked.clip(montenegro), {bands:['albedo'], palette: ['00FFFF', '0000FF','0084FF','FCD163'], min:0, max:3000}, 'dn_testmask',false);
// Mask the watery parts of dNn, where of 2nd date is NDWI < 0.30.
var dn_correct = dn_1_Masked.updateMask(ndwi_2.lte(0.30));
Map.addLayer(dn_correct.clip(montenegro), {bands:['albedo'], palette: ['00FFFF', '0000FF','0084FF','FCD163'],min:0, max:3000}, 'dn_correct',false);
// CALCULATE STANDARD DEVIATION AND MEAN
// Combine the mean and standard deviation reducers.
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});
// Use the combined reducer to get the mean and SD of dn.
var stats_1 = dn_correct.reduceRegion({
  reducer: reducers,
  bestEffort: true,
});
// Display the dictionary  means and SDs of dn.
print(stats_1);
//calculate threshold for illegal mining x= m+3*s
var x = 204.99222065950522+(3*1110.0926517818148);
print(x, 'threshold value');
var threshold = dn_correct.updateMask(dn_correct.lt(x));
Map.addLayer(threshold,{min:0,max:3000,bands:"albedo", palette:['yellow', '6b5b95','d64161'] }, 'illegal_threshold',false);
// // var albedomask = function(dn){
// //   var dn_mask = dn.expression(
// //   "albedo > (18.493246284861925+(3*1669.053612117535))",
// //   {
// //     albedo: dn.select('albedo'),
// //   });
// //   return(dn.addBands(dn_mask.rename("albedo_mask")));
// //   };
// // print(dn, 'new dn')
// //   // isolate masked areas
// // var maskedareas = dn.select("albedo_mask"); 
// // Map.addLayer(maskedareas.clip(montenegro),"illegal");