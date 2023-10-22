var path117 = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[122.56930159824685, 30.374280935603437],
          [122.56930159824685, 30.127533646753886],
          [122.87691878574685, 30.127533646753886],
          [122.87691878574685, 30.374280935603437]]], null, false),
    path118 = 
    /* color: #0b4a8b */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[121.96143204770488, 30.631872702880983],
          [121.96143204770488, 30.577501069559545],
          [122.04932267270488, 30.577501069559545],
          [122.04932267270488, 30.631872702880983]]], null, false),
    LC8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
// This script is used to display the landsat scenes covering the study area
// Author : Wenting Cao (cwt@zju.edu.cn)
// Map a function to remove the cloud and shadows
var maskBadCloud = function(image){
   var cloudShadowBitMask = Math.pow(2, 3);
   var snowBitMask = Math.pow(2, 4);
   var cloudBitMask = Math.pow(2, 5);
   var pixel_qa = image.select('pixel_qa')
   var valid = pixel_qa.bitwiseAnd(cloudShadowBitMask).eq(0).add(
               pixel_qa.bitwiseAnd(cloudBitMask).eq(0)).add(
               pixel_qa.bitwiseAnd(snowBitMask).eq(0)).eq(3);
   var clean = image.updateMask(valid);
  return clean;
};
// generate the bound of Landsat scenes and cut the edge area
var bound117 = LC8
             .filterBounds(path117)
             .filter(ee.Filter.calendarRange(2017, 2017, 'year'))
             .first()
             .geometry()
             .buffer(-1500)
var bound118 = LC8.filterBounds(path118)
             .filter(ee.Filter.calendarRange(2017, 2017, 'year'))
             .first()
             .geometry()
             .buffer(-450)
Map.centerObject(bound117, 8)
var image117 = // LandsatImport.LC
                LC8
                .map(maskBadCloud)
                //.filterBounds(bound1)
                .filter(ee.Filter.calendarRange(2017, 2017, 'year'))
                //.filterMetadata('SATELLITE', 'equals', 'LANDSAT_8')
                .filterMetadata('WRS_ROW', 'equals', 39)
                .filterMetadata('WRS_PATH', 'equals', 117)
                .median()
                .clip(bound117)
var image118 = // LandsatImport.LC
                 LC8
                 .map(maskBadCloud)
               // .filterBounds(bound2)
                .filter(ee.Filter.calendarRange(2017, 2017, 'year'))
                //.filterMetadata('SATELLITE', 'equals', 'LANDSAT_8')
                .filterMetadata('WRS_ROW', 'equals', 39)
                .filterMetadata('WRS_PATH', 'equals', 118)
                .median()
                .clip(bound118)
Map.addLayer(image118, {min:0, max:4000, bands:['B4', 'B3', 'B2']}, 'image118')
Map.addLayer(image117, {min:0, max:4000, bands:['B4', 'B3', 'B2']}, 'image117')