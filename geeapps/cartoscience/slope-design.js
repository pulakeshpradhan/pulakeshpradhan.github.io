var image = ui.import && ui.import("image", "image", {
      "id": "NOAA/NGDC/ETOPO1"
    }) || ee.Image("NOAA/NGDC/ETOPO1");
var i = image.select('bedrock');
var s = ee.Terrain.slope(i).resample('bilinear');
var h = ee.Terrain.hillshade(i).resample('bilinear');
Map.addLayer(h, {min: 178, max: 182},'hillshade');
//Map.addLayer(s,{min: -0.02, max: 0.32, palette:['00ffe7','0071ff','ef00ff','7900ff','000000'], opacity: 0.9},'slope');
Map.addLayer(s,{min: -0.02, max: 0.32, palette:['611327','9D2235','CA6A29','DBC759','DDDCC5'], opacity: 0.9},'slope');