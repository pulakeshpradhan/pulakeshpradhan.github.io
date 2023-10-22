var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                95.08712560109323,
                4.316879916565555
              ],
              [
                95.08712560109323,
                1.420433833936662
              ],
              [
                103.78829747609323,
                1.420433833936662
              ],
              [
                103.78829747609323,
                4.316879916565555
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[95.08712560109323, 4.316879916565555],
          [95.08712560109323, 1.420433833936662],
          [103.78829747609323, 1.420433833936662],
          [103.78829747609323, 4.316879916565555]]], null, false);
// Import two weeks of S5P SO2 and composite by mean.
var so2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2020-08-10', '2020-08-14')
  .mean()
  .rename('so2');
// Define an area to perform interpolation over.
var aoi =
  ee.Geometry.Polygon(
    [[[95.0871, 4.3168],
       [95.0871, 1.4204],
       [103.7882, 1.4204],
       [103.7882, 4.3168]]], null, false);
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
//Menambahkan element kartografis
var header = ui.Label('Map of SO2 Emission After Mt. Sinabung Eruption', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Map of SO2 Emission around Mount Sinabung captured by Sentinel-5P, August 2020',
{fontSize: '15px'});
var text_2 = ui.Label(
'Sulphur dioxide (SO2) enters the Earth’s atmosphere through both natural and anthropogenic processes. It plays a role in chemistry on a local and global scale and its impact ranges from short term pollution to effects on climate. Only about 30% of the emitted SO2 comes from natural sources; the majority is of anthropogenic origin. SO2 emissions adversely affect human health and air quality. SO2 has an effect on climate through radiative forcing, via the formation of sulphate aerosols. Volcanic SO2 emissions can also pose a threat to aviation, along with volcanic ash. S5P/TROPOMI samples the Earth’s surface with a revisit time of one day with unprecedented spatial resolution of 3.5 x 7 km which allows the resolution of fine details including the detection of much smaller SO2 plumes (http://www.tropomi.eu/data-products/sulphur-dioxide).',
{fontSize: '11px'});
var text_3 = ui.Label(
'Developed by: Dr. Fatwa Ramdani, Geoinformatics Research Group, Brawijaya University (2020)',
{fontWeight: 'bold', fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '400px'});
ui.root.widgets().add(toolPanel);
//Create external reference with link
var link = ui.Label(
'Geoinformatics', {},
'http://gis.filkom.ub.ac.id/');
var linkPanel = ui.Panel(
[ui.Label('Geoinformatics Research Group Homepage', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
//Membuat legenda
var legendTitle2 = ui.Label({
value: 'SO2 Emission (mol/m^2)',
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
  'font-weight':'10',
  'fontWeight': 'bold',
  'color': '#000000'
  };
//Membuat judul legenda
var legendTitle = ui.Label('Legend',titleTextVis);
//Menambahkan judul legenda
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