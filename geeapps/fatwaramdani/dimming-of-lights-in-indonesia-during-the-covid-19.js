var geom = ui.import && ui.import("geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.15858824194305,
                -5.711959895673218
              ],
              [
                105.15858824194305,
                -8.719814420188468
              ],
              [
                114.60683042944305,
                -8.719814420188468
              ],
              [
                114.60683042944305,
                -5.711959895673218
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[105.15858824194305, -5.711959895673218],
          [105.15858824194305, -8.719814420188468],
          [114.60683042944305, -8.719814420188468],
          [114.60683042944305, -5.711959895673218]]], null, false);
//ANALISIS TAMBAHAN DENGAN DATA MALAM HARI
//Mencari data VIIRS (https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMCFG)
/*
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2019-12-01', '2019-12-31'));
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0, opacity: 1};
Map.addLayer(nighttime, nighttimeVis, 'Nighttime Dec 2019', false);
var dataset2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2020-03-01', '2020-03-31'));
var nighttime2 = dataset2.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0, opacity: 1};
Map.addLayer(nighttime2, nighttimeVis, 'Nighttime Mar 2020', false);
*/
var so2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .select('avg_rad')
  .filterDate('2019-12-01', '2019-12-31') 
  .mean()
  .rename('so2');
var so3 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .select('avg_rad')
  .filterDate('2020-04-01', '2020-04-25')
  .mean()
  .rename('so3');
// Define an area to perform interpolation over.
var aoi =
  ee.Geometry.Polygon(
    [[[105.1585, -5.7119],
       [105.1585, -8.7198],
       [114.6068, -8.7198],
       [114.6068, -5.7119]]], null, false);
// Sample the SO2 composite to generate a FeatureCollection.
var samples = so2.addBands(ee.Image.pixelLonLat())
  .sample({region: aoi, numPixels: 2000,
    scale:1000, projection: 'EPSG:4326'})
  .map(function(sample) {
    var lat = sample.get('latitude');
    var lon = sample.get('longitude');
    var so2 = sample.get('so2');
    return ee.Feature(ee.Geometry.Point([lon, lat]), {so2: so2});
  });
var samples2 = so3.addBands(ee.Image.pixelLonLat())
  .sample({region: aoi, numPixels: 2000,
    scale:1000, projection: 'EPSG:4326'})
  .map(function(sample) {
    var lat = sample.get('latitude');
    var lon = sample.get('longitude');
    var so3 = sample.get('so3');
    return ee.Feature(ee.Geometry.Point([lon, lat]), {so3: so3});
  });
// Combine mean and standard deviation reducers for efficiency.
var combinedReducer = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true});
// Estimate global mean and standard deviation from the points.
var stats = samples.reduceColumns({
  reducer: combinedReducer,
  selectors: ['so2']});
var stats2 = samples.reduceColumns({
  reducer: combinedReducer,
  selectors: ['so3']});
// Do the interpolation, valid to 50 kilometers.
var interpolated = samples.inverseDistance({
  range: 5e4,
  propertyName: 'so2',
  mean: stats.get('mean'),
  stdDev: stats.get('stdDev'),
  gamma: 0.3});
var interpolated2 = samples2.inverseDistance({
  range: 5e4,
  propertyName: 'so3',
  mean: stats.get('mean'),
  stdDev: stats.get('stdDev'),
  gamma: 0.3});
// Define visualization arguments.
var band_viz = {
  min: 0.0,
  max: 60,
  opacity:0.5,
  palette: ['white', 'purple', 'cyan', 'green', 'yellow', 'red']
};
// Display to map.
//Map.centerObject(aoi, 7);
//Map.addLayer(so2, band_viz, 'Light before pandemic', 0);
//Map.addLayer(so3, band_viz, 'Light after pandemic', 0);
//Map.addLayer(interpolated, band_viz, 'Dimming light before pandemic');
//Map.addLayer(interpolated2, band_viz, 'Dimming light after pandemic');
//Map.addLayer(samples, {}, 'Samples', 0);
Map.centerObject(geom, 7);
//Menentukan parameter visualisasi
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.inferno[7]; //Sumber: https://github.com/gee-community/ee-palettes
var band_viz = {
  min: 0,
  max: 60,
  opacity:0.5,
  palette: ['palette']
};
//Menampilkan data
Map.addLayer(so2, {min: 0, max: 60, palette: palette, opacity:0.7});
Map.setCenter(106.85, -6.25, 7);
//Membuat peta yang terhubung (linked map)
var linkedMap = ui.Map();
linkedMap.addLayer(so3, {min: 0, max: 60, palette: palette, opacity:0.7});
linkedMap.setCenter(106.85, -6.25, 7);
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
//Membuat judul di sudut kiri-kanan bawah
var judul_sebelum= Map.add(ui.Label(
'Dimming light before pandemic', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
var judul_selama= linkedMap.add(ui.Label(
'Dimming light during pandemic', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
//Membagi panel peta menjadi dua
var splitPanel = ui.SplitPanel({
firstPanel: linker.get(0),
secondPanel: linker.get(1),
orientation: 'horizontal',
wipe: true,
style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Membuat legenda
var legendTitle2 = ui.Label({
value: 'Dimming light',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
//Membuat panel aksesoris dan komponen kartografi
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'bold', 
  'color': '#000000'
  };
//Membuat judul legenda
var legendTitle = ui.Label('Legend',titleTextVis);
//Menambahkan judul legenda kedua
legend.add(legendTitle);
legend.add(legendTitle2);
//Membuat gambar legenda
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage = gradient.visualize(band_viz);
//Membuat teks di atas legenda
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(band_viz['max']))
],
});
legend.add(panel);
//Menampilkan gambar legenda
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
//Menambahkan gambar ke legenda
legend.add(thumbnail);
//Membuat teks di bawah legenda
var panel = ui.Panel({
widgets: [
ui.Label(band_viz['min'])
],
});
legend.add(panel);
//Menampilkan legenda di peta utama
Map.add(legend);
// Load a 2012 nightlights image, clipped to the admin border.
var nl2012 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182012')
  .select('stable_lights')
  .clip(geom);
// Define arbitrary thresholds on the 6-bit nightlights image.
var zones = nl2012.gt(20).add(nl2012.gt(55)).add(nl2012.gt(62));
zones = zones.updateMask(zones.neq(0));
// Convert the zones of the thresholded nightlights to vectors.
var vectors = zones.addBands(nl2012).reduceToVectors({
  geometry: geom,
  crs: nl2012.projection(),
  scale: 1000,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});
// Display the thresholds.
Map.addLayer(zones, {min: 1, max: 3, opacity: 0.7, palette: ['0000FF', '00FF00', 'FF0000']}, 'night lights', 0);
// Make a display image for the vectors, add it to the map.
var display = ee.Image(0).updateMask(0).paint(vectors, '000000', 3);
Map.addLayer(display, {palette: '000000'}, 'vectors', false);
/*
// Sample the nighttime composite to generate a FeatureCollection.
var samples = dataset.addBands(ee.Image.pixelLonLat())
  .sample({region: aoi, numPixels: 2000,
    scale:1000, projection: 'EPSG:4326'})
  .map(function(sample) {
    var lat = sample.get('latitude');
    var lon = sample.get('longitude');
    var so2 = sample.get('so2');
    return ee.Feature(ee.Geometry.Point([lon, lat]), {so2: so2});
  });
// Combine mean and standard deviation reducers for efficiency.
var combinedReducer = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true});
// Estimate global mean and standard deviation from the points.
var stats = samples.reduceColumns({
  reducer: combinedReducer,
  selectors: ['so2']});
// Do the interpolation, valid to 50 kilometers.
var interpolated = samples.inverseDistance({
  range: 5e4,
  propertyName: 'so2',
  mean: stats.get('mean'),
  stdDev: stats.get('stdDev'),
  gamma: 0.3});
// Define visualization arguments.
var band_viz = {
  min: 0.0,
  max: 0.0005,
  opacity:0.5,
  palette: ['white', 'purple', 'cyan', 'green', 'yellow', 'red']
};
// Display to map.
Map.centerObject(aoi, 7);
Map.addLayer(so2, band_viz, 'SO2');
Map.addLayer(interpolated, band_viz, 'SO2 Interpolated');
Map.addLayer(samples, {}, 'Samples', false);
*/
//Membuat judul utama di tengah-atas
var title = ui.Label("Map of Dimming Light Before and During COVID-19");
title.style().set({
  height: '10%',
  width: '100%',
  margin: 0,
  textAlign: 'center',
  fontSize: '20px',
  backgroundColor: '444444',
  color: 'white'
});
Map.add(title);
//Membuat panel di sisi kanan
var header = ui.Label('The Dimming of Lights Indonesia during the COVID-19 Pandemic', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'This map shows the average Day/Night Band (DNB) radiance values of VIIRS Nighttime. The Suomi National Polar-orbiting Partnership (SNPP) Visible Infrared Imaging Radiometer Suite (VIIRS) supports a Day-Night Band (DNB) sensor that provides global daily measurements of nocturnal visible and near-infrared (NIR) light that are suitable for Earth system science and applications. The VIIRS DNB’s ultra-sensitivity in lowlight conditions enable us to generate a new set of science-quality nighttime products that manifest substantial improvements in sensor resolution and calibration when compared to the previous era of Defense Meteorological Satellite Program/Operational Linescan System’s (DMSP/OLS) nighttime lights image products. Such improvements allow the VIIRS DNB products to better monitor both the magnitude and signature of nighttime phenomena, and anthropogenic sources of light emissions. (Source: https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/VNP46A1/#:~:text=The%20Suomi%20National%20Polar%2Dorbiting,Earth%20system%20science%20and%20applications.)',
{fontSize: '15px'});
var text_2 = ui.Label(
'Developed by Dr. Fatwa Ramdani, Geoinformatics Research Group, Universitas Brawijaya',
{fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2], 'flow', {width: '400px'});
ui.root.widgets().add(toolPanel);
//Membuat rujukan eksternal dengan tautan
var link = ui.Label(
'Official Homepage of Geoinformatics Research Group, UB', {},
'http://gis.filkom.ub.ac.id/');
var linkPanel = ui.Panel(
[ui.Label('Other information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);