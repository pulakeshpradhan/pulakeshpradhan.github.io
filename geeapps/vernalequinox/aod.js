var aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/vernalequinox/JABAR"
    }) || ee.FeatureCollection("users/vernalequinox/JABAR");
//JANUARI
var collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
                  .select('Optical_Depth_047')
                  .filterDate('2022-01-17', '2022-01-18');
var Januari_Modis = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), Januari_Modis, 'AOD Januari/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Januari_Modis',
  region: aoi
});
//FEBRUARI
var collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
                  .select('Optical_Depth_047')
                  .filterDate('2022-02-17', '2022-02-18');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'AOD Februari/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Februari_Modis',
  region: aoi
});
//MARET
var collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
                  .select('Optical_Depth_047')
                  .filterDate('2022-03-10', '2022-03-11');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'AOD Maret/10');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Maret_Modis',
  region: aoi
});
//APRIL
var collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
                  .select('Optical_Depth_047')
                  .filterDate('2022-04-17', '2022-04-18');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'AOD Aprilt/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_April_Modis',
  region: aoi
});
//MEI
var collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES')
                  .select('Optical_Depth_047')
                  .filterDate('2022-05-18', '2022-05-19');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'AOD Mei/18');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Mei_Modis',
  region: aoi
});
///Sentinel
//JANUARI
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .select('AOT')
                  .filterDate('2022-01-01', '2022-02-02');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'Sentinel Januari/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Januari_Sentinel',
  region: aoi
});
//FEBRUARI
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .select('AOT')
                  .filterDate('2022-02-02', '2022-03-03');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'Sentinel Februari/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Feb_Sentinel',
  region: aoi
});
//MARET
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .select('AOT')
                  .filterDate('2022-03-03', '2022-04-04');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'Sentinel Maret/10');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Mar_Sentinel',
  region: aoi
});
//APRIL
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .select('AOT')
                  .filterDate('2022-04-04', '2022-05-05');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'Sentinel Aprilt/17');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Apr_Sentinel',
  region: aoi
});
//MEI
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .select('AOT')
                  .filterDate('2022-05-05', '2022-06-06');
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(aoi), band_viz, 'Sentinel Mei/18');
Export.image.toDrive({
  image: collection.mean(),
  description: 'AOD_Mei_Sentinel',
  region: aoi
});
// BAR Legenda
var viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
var legendTitle = ui.Label({
value: 'Legenda',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
legend.add(legendTitle);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'20x200'},
style: {padding: '1px', position: 'bottom-center'}
});
legend.add(thumbnail);
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend)