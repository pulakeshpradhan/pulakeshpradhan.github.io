//Create buffer zone as study area
var geom = ee.Geometry.Point(112.59, -7.75).buffer(50000);
var sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-06-01', '2019-06-30');
var setelah = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-01-01', '2019-12-31');
var setelah_h = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-10-22', '2019-10-27');
var band_viz = {
  min: 0,
  max: 0.05,
  opacity:0.5,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
//Map.addLayer(sebelum.mean(), band_viz, 'Emisi CO Sebelum');
//Membuat grafis 
var tempTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: setelah,
  regions: geom,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
tempTimeSeries.setChartType('ScatterChart');
tempTimeSeries.setOptions({
  title: 'CO Emission around Mt. Arjuno',
  vAxis: {title: 'CO total column'},
  hAxis: {title: 'Periods'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(tempTimeSeries);
//Clip data
var COclip = setelah_h.mean().clip(geom);
Map.addLayer(COclip, band_viz, 'Emisi CO Arjuno Clip');
Map.addLayer(setelah.mean(), band_viz, 'Emisi CO Arjuno', false);
Map.setCenter(112.59, -7.75, 10);
var header = ui.Label('Map of CO Emission During Fores Fire Event at M. Arjuno', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Map of CO Emission around Mount Arjuno captured by Sentinel-5P, October 2019',
{fontSize: '15px'});
var text_2 = ui.Label('Carbon monoxide (CO) is an important atmospheric trace gas for our understanding of tropospheric chemistry. In certain urban areas, it is a major atmospheric pollutant. Main sources of CO are combustion of fossil fuels, biomass burning, and atmospheric oxidation of methane and other hydrocarbons. Whereas fossil fuel combustion is the main source of CO at Northern mid-latitudes, the oxidation of isoprene and biomass burning play an important role in the tropics. TROPOMI on the Sentinel 5 Precursor (S5P) satellite observes the CO global abundance exploiting clear-sky and cloudy-sky Earth radiance measurements in the 2.3 µm spectral range of the shortwave infrared (SWIR) part of the solar spectrum. TROPOMI clear sky observations provide CO total columns with sensitivity to the tropospheric boundary layer. For cloudy atmospheres, the column sensitivity changes according to the light path. The map shows clearly there is increase CO around the study area due to forest fire event, (http://www.tropomi.eu/data-products/sulphur-dioxide).',
{fontSize: '11px'});
var text_3 = ui.Label(
'Developed by: Setiani, Devianto, and Ramdani (2020)',
{fontSize: '11px'});
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
value: 'CO Emission (mol/m^2)',
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