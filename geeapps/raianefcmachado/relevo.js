var srtm = ui.import && ui.import("srtm", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    srtm2 = ui.import && ui.import("srtm2", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003");
//see the information of the data
print (srtm);
//displaying the data in interactive map
Map.addLayer(srtm, {min:0, max: 6000, 
palette: ['90EE90','FFFF00','FF0000']}, 'Altimetria'); //Light green, yellow, red
//display hillshading and slope
var hillshade = ee.Terrain.hillshade(srtm);
Map.addLayer(hillshade, {min:150, max:255,}, 'Relevo Sombreado');
print(hillshade);
var slope = ee.Terrain.slope(srtm);
Map.addLayer(slope, {min:0, max:20, pallete: ['bf2222', 'ec8711', '9ff00', '3fa86d', '8392e1']},'Declividade');
print(slope);