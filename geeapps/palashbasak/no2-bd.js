// Google Earth Engine App to Display NO2 Concentration in Bangladesh over different years
// Reference: https://docs.google.com/document/d/1uq3llHg8sQJkQICw6swugv_qCW8DqmbLTpltsPj7EIw/edit
// https://www.youtube.com/watch?v=saaecbImPmI&t=175s
// ************************************************************
// 1. Model
var m = {};
// Sentinel-5P NRTI NO2: Near Real-Time Nitrogen Dioxide
m.col = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density');
// National boundary of Bangladesh
m.bd_boundary = ee.FeatureCollection("users/palashbasak/bgd_admbnda_adm0_bbs_20201113");
// ************************************************************
// 2. Components
var c = {};
c.band_viz = {
  min: 0,
  max: 200,
  opacity: 0.5,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
// Control Panel
c.controlPanel = ui.Panel();
c.map = ui.Map({
  center: {'lat': 23.803784494055314, 'lon': 90.40671875000001, 'zoom': 7}
});
// Info section of the control Panel
c.info = {};
c.info.titleLabel = ui.Label('Monthly Mean Concentration of Nitrogen Dioxide (NO2) over Bangladesh');
c.info.aboutLabel = ui.Label(
  'This app shows the average monthly distribution of NO2 concentrations over Bangladesh.' +
  ' Select a specific year and month to update the display.' +
  ' Wait for the layer to be re-drawn after changing year or month.' +
  ' User the Inspector tool to get value for a specific location' +
  ' Note that Sentinel-5P NO2 data is available only since July 2018.'
);
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel, 
  ]);
// Year selection
c.year_list = [
  {label: '2018', value: 2018},
  {label: '2019', value: 2019},
  {label: '2020', value: 2020},
  {label: '2021', value: 2021},
  {label: '2022', value: 2022},
  {label: '2023', value: 2023}
  ];
c.selectYear = {};
c.selectYear.label = ui.Label('Select a year');
c.selectYear.selector = ui.Select({items: c.year_list, placeholder: 'Select a year', value: 2023});
c.selectYear.panel = ui.Panel([
  c.selectYear.label, c.selectYear.selector
  ]);
// Month Selection
c.month_list = [
  {label: 'January', value: 1},
  {label: 'February', value: 2},
  {label: 'March', value: 3},
  {label: 'April', value: 4},
  {label: 'May', value: 5},
  {label: 'June', value: 6},
  {label: 'July', value: 7},
  {label: 'August', value: 8},
  {label: 'September', value: 9},
  {label: 'October', value: 10},
  {label: 'November', value: 11},
  {label: 'December', value: 12}
  ];
c.selectMonth = {};
c.selectMonth.label = ui.Label('Select a month');
c.selectMonth.selector = ui.Select({items: c.month_list, placeholder: 'Select a month', value: 1});
c.selectMonth.panel = ui.Panel([
  c.selectMonth.label, c.selectMonth.selector
  ]);
// Citation
c.citation = {};
c.citation.authorLabel = ui.Label(
  'App Author'
);
c.citation.authorName = ui.Label({
  value: 'Palash Basak, PhD, University of Newcastle, Australia',
  targetUrl: 'https://www.linkedin.com/in/palashbasak/'
});
c.citation.dataSourceLabel = ui.Label(
  'Data Source'
);
c.citation.dataSource = ui.Label({
  value: 'Sentinel-5P Near Real-Time Nitrogen Dioxide (NO2) data',
  targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_NRTI_L3_NO2'
});
c.citation.panel = ui.Panel([
  c.citation.authorLabel, c.citation.authorName, 
  c.citation.dataSourceLabel, c.citation.dataSource
  ]);
// Add Legend
c.legend = {};
// set position of panel
c.legend.panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
c.legendTitle = ui.Label({
  value: 'NO2 (µmol/m2)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
// Add the title to the panel
c.legend.panel.add(c.legendTitle);
// create the legend image
c.legend.lon = ee.Image.pixelLonLat().select('latitude');
c.legend.lgradient = c.legend.lon.multiply((c.band_viz.max-c.band_viz.min)/100.0).add(0);
c.legend.llegendImage = c.legend.lgradient.visualize(c.band_viz);
// create text on top of legend
c.legend.topPanel = ui.Panel({
  widgets: [
    ui.Label(c.band_viz.max + ' (High)')
],
});
c.legend.panel.add(c.legend.topPanel);
// create thumbnail from the image
c.legend.thumbnail = ui.Thumbnail({
image: c.legend.llegendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
c.legend.panel.add(c.legend.thumbnail);
// create text on top of legend
c.legend.bottomPanel = ui.Panel({
widgets: [
ui.Label(c.band_viz.min + ' (Low)')
],
});
c.legend.panel.add(c.legend.bottomPanel);
c.map.add(c.legend.panel);
// ************************************************************
// 3. Composition
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.selectMonth.panel);
c.controlPanel.add(c.citation.panel);
// ************************************************************
// 4. Styling
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
c.controlPanel.style().set({
  width: '325px'
});
s.widgetTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
s.widgetSelect = {
  fontSize: '26px',
  color: 'red',
  fontWeight: 'bold',
  textAlign: 'left',
  stretch: 'both'
};
// Set widget style.
c.info.titleLabel.style().set({
  fontSize: '24px',
  fontWeight: 'bold'
});
c.selectYear.label.style().set(s.widgetTitle);
c.selectMonth.label.style().set(s.widgetTitle);
c.selectYear.selector.style().set(s.widgetSelect);
c.selectMonth.selector.style().set(s.widgetSelect);
// ************************************************************
// 5. Behaviour
function updateMap() {
  c.year = c.selectYear.selector.getValue();
  c.month = c.selectMonth.selector.getValue();
  // var img = m.col.filterDate(year + '-01-01', year + '-01-30')
  m.img = m.col.filter(ee.Filter.calendarRange(c.year, c.year,'year'))
                  .filter(ee.Filter.calendarRange(c.month, c.month,'month'))
                  .mean()
                  .multiply(1e6)
                  .clip(m.bd_boundary);
  var layer = ui.Map.Layer({
    eeObject: m.img,
    visParams: c.band_viz,
    name: 'S5P N02 - ' + c.year + ' ' + c.month
  });
  c.map.layers().set(0, layer);
  // c.map.addLayer(m.col.mean(), band_viz, 'S5P N02');
  // c.map.setCenter(90.40671875000001, 23.803784494055314, 7.5);
  Export.image.toDrive({
  image: m.img,
  description: 'S5P NO2 Jan 2023',
  fileNamePrefix: 'NO2_Jan2023_BD_S5P',
  region: m.bd_boundary,
  scale: 1000,
  maxPixels: 1e10});
}
c.selectYear.selector.onChange(updateMap);
c.selectMonth.selector.onChange(updateMap);
// ************************************************************
// 6. Initialization
updateMap();