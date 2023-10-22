var s2 = ee.ImageCollection("COPERNICUS/S2");
Map.addLayer(s2, {bands:["B4", "B3", "B2"], min:300, max:3000})