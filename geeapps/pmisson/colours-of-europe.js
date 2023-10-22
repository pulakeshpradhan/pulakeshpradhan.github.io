var image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/iss038e014887_modificado"
    }) || ee.Image("users/pmisson/iss038e014887_modificado"),
    table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013");
var VIIRS201912 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191201");
Map.setOptions('SATELLITE');
Map.addLayer(VIIRS201912.select('avg_rad'),{min:0,max:25}, 'VIIRS 2019_12')
Map.addLayer(image,{},'ISS038-E-14887')
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#fcff21'}, 'costline');
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#fcff21'}, 'country',false);
Map.setCenter(0.712, 50.824, 7);