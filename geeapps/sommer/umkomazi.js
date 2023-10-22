var umk44 = ee.Image('users/sommer/Umkomazi_1944');
print(umk44)
var vizGrey = {
  bands: ['b1'],
  min: 0,
  max: 255,
};
Map.addLayer(umk44, vizGrey, "Ortho 1944");
Map.centerObject(umk44);
var umk44_dem = ee.Image('users/sommer/Umkomazi_1944_DEM');
print(umk44_dem)
var sld_ramp =
  '<RasterSymbolizer>' +
    '<ColorMap type="ramp" extended="false" >' +
      '<ColorMapEntry color="#050603" label="1150" quantity="1150"/>'+
      '<ColorMapEntry color="#183e29" label="1250" quantity="1250"/>'+
      '<ColorMapEntry color="#3e8a59" label="1350" quantity="1350"/>'+
      '<ColorMapEntry color="#a5ba6f" label="1450" quantity="1450"/>'+
      '<ColorMapEntry color="#c7a75c" label="1550" quantity="1550"/>'+
      '<ColorMapEntry color="#d77f3f" label="1650" quantity="1650"/>'+
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(umk44_dem.sldStyle(sld_ramp), {}, "DEM 1944");
//var hillshade = ee.Terrain.hillshade(umk44_dem);
//Map.addLayer(hillshade, {}, "DEM 1944 Hillshade", 1, 0.25);
//var slope = ee.Terrain.slope(umk44_dem);
//Map.addLayer(slope, {min: 0, max: 60}, "Slope 1944");