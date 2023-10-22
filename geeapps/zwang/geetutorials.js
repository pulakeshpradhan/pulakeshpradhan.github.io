var landsat8 = ee.ImageCollection("LANDSAT/LC8_L1T_8DAY_TOA"),
    globalEle = ee.Image("USGS/GMTED2010");
var apr2014 = landsat8.filterDate('2014-4-1', '2014-4-30').mean();
Map.addLayer(apr2014); 
Map.addLayer(globalEle);