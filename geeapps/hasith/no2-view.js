/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[78.75639392667964, 10.51936024357438],
          [78.75639392667964, 5.5385767515352295],
          [82.51371814542964, 5.5385767515352295],
          [82.51371814542964, 10.51936024357438]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dataset = ee.FeatureCollection('USDOS/LSIB/2013');
var image = ee.Image().float().paint(dataset, 0,1);
//Draw border around a country
var today  = ee.Date(Date.now());
var collection2020 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
  .select('NO2_column_number_density')
  .filterDate(today.advance(-4,"week"),today)
  .filterBounds(geometry)
print(collection2020)
var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
//Map.addLayer(data2020_post.select('NO2_column_number_density').mean(),band_viz,'post');
/*
var ahe_viz = {
   min: 0,
  max: 0.0001,
  opacity: .75,
  palette: [ 'blue','red']
}*/
Map.centerObject(geometry,8)
Map.addLayer(collection2020.select('NO2_column_number_density').mean(),band_viz);
Map.addLayer(image, {palette:'white'}, 'Line Map');