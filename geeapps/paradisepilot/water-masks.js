var modis005_waterMask = ee.Image('MODIS/MOD44W/MOD44W_005_2000_02_24')
    .select('water_mask');
var waterMaskVis = {
  min: 0.0,
  max: 1.0,
};
var modis006_waterMask = ee.ImageCollection('MODIS/006/MOD44W')
  .filter(ee.Filter.date('2015-01-01','2015-05-01'))
  .select('water_mask');
var waterMaskVis = {
  min: 0.0,
  max: 1.0,
  palette: ['bcba99','2d0491'],
};
// St. Denis National Wildlife Area (Saskatchewan)
Map.setCenter(-106.086271, 52.209860, 12);
Map.addLayer(modis006_waterMask, waterMaskVis, 'MODIS/006/MOD44W: water_mask');
Map.addLayer(modis005_waterMask, waterMaskVis, 'MODIS/MOD44W/MOD44W_005_2000_02_24: water_mask');