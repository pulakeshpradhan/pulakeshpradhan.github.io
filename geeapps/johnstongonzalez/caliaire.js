//comuna 22
var comuna =(ee.FeatureCollection("users/cindycuervo/ComunasWGS"))
print (comuna)
//COMUNA = 22
//sentinel 5 no2
var s5p = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density').filterBounds(comuna)
var col_mar19 = s5p.filterDate('2019-03-15', '2019-03-30');
var col_mar20 = s5p.filterDate('2020-03-15', '2020-03-30');
var col_mar21 = s5p.filterDate('2021-03-15', '2021-03-30');
var band_viz = {min: 0,max: 100, palette: ['white', 'yellow', 'orange', 'red']};
Map.addLayer(col_mar19.mean().multiply(1000000).clip(comuna), band_viz, 'S5P N02 2019');
Map.addLayer(col_mar20.mean().multiply(1000000).clip(comuna), band_viz, 'S5P N02 2020');
Map.addLayer(col_mar21.mean().multiply(1000000).clip(comuna), band_viz, 'S5P N02 2021');
Map.setCenter(-76.54, 3.35, 13);
var empty_roi = ee.Image().byte();
var outline_roi = empty_roi.paint({featureCollection: comuna, color: 1,width: 0.01});
Map.addLayer(outline_roi, {color: 'red'},   'Comuna')