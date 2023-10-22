// Import Feature Collection dari database GEE dan
// memilih batas negara Indonesia serta menampilkan di viewer
var table = ee.FeatureCollection("FAO/GAUL/2015/level0");
var Batas = table.filter(ee.Filter.inList('ADM0_NAME', ['Indonesia']));
var Batas = Batas.geometry();
Map.addLayer(Batas)
Map.centerObject(Batas);
// Import Image Collection VIIRS night light serta menseleksi
// sesuai waktu perekaman yang diinginkan dan menampilkan di viewer
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filter(ee.Filter.date('2014-05-01', '2020-05-01'));
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min:0,max:20};
Map.addLayer(nighttime, nighttimeVis, 'Nighttime');
// Membuat visualisasi data VIIRS night light
var finalCollection = nighttime.map(function(image){
  return image.visualize({bands: ['avg_rad', 'avg_rad', 'avg_rad'], min:0,max:20});
});
// Membuat GIF dengan parameter visualisasi pada batas area yang diinginkan.
var gifParams = {
  'region': Batas,
  'dimensions': 720,
  'crs': 'EPSG:3857',
  'framesPerSecond': 10
};
// Print URL GIF URL pada console.
print(finalCollection.getVideoThumbURL(gifParams));