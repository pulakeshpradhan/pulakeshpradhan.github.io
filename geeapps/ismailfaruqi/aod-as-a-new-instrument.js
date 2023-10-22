var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/cokrosantoso/Indonesia"
    }) || ee.FeatureCollection("users/cokrosantoso/Indonesia"),
    AOD = ui.import && ui.import("AOD", "imageCollection", {
      "id": "MODIS/006/MCD19A2_GRANULES"
    }) || ee.ImageCollection("MODIS/006/MCD19A2_GRANULES"),
    NL = ui.import && ui.import("NL", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    FLDAS = ui.import && ui.import("FLDAS", "imageCollection", {
      "id": "NASA/FLDAS/NOAH01/C/GL/M/V001"
    }) || ee.ImageCollection("NASA/FLDAS/NOAH01/C/GL/M/V001");
var countries = Indonesia
var Nama_Provinsi = ['Jakarta Raya', 'Banten', 'Jawa Barat', 'Yogyakarta', 'Jawa Tengah', 'Jawa Timur']
var geometry = countries.filter(ee.Filter.inList('NAME_1',Nama_Provinsi));
var area = ee.FeatureCollection(geometry);
Map.addLayer(geometry,{color:"Black"},"Provinsi");
// VARIABEL NL
var nl = NL
        .select('avg_rad')
        .filterDate('2020-2-1', '2021-3-31')
        .sort('CLOUD_COVER', false)
        .mean();
var nighttimeVis = {min: 0.0, max: 60.0};
var night_light = nl
.clipToCollection(geometry);
//memunculkan visualisasi citra
Map.addLayer(night_light, nighttimeVis, 'Night Light');
// VARIABEL RELATIVE HUMIDITY
var rh = FLDAS
        .filter(ee.Filter.date('2020-2-01', '2021-5-31'))
        .mean();
var RH = rh.expression(
  '0.263 * p * q * (exp(17.67 * (T - T0) / (T - 29.65))) ** -1', {
    T: rh.select('Tair_f_tavg'),
    T0: 273.15,
    p: rh.select('Psurf_f_tavg'),
    q: rh.select('Qair_f_tavg')
  }
).float();
// Relative Humidity visualisation
var rhVis = {
  min: 70,
  max: 100,
  palette: ['a50026', 'd73027', 
  'f46d43', 'fdae61', 'fee090', 
  'e0f3f8', 'abd9e9', '74add1', 
  '4575b4', '313695'],
};
Map.addLayer(RH.clip(geometry), rhVis, 'Relative Humidity (%)', false);
// VARIABEL UTAMA RISET INI
var aod = AOD
.filterDate('2020-02-01','2021-7-30')
.filterBounds(geometry)
.select('Optical_Depth_047')
.sort('CLOUD_COVER', false)
;
var band_viz = {
  min: 0,
  max: 500,
  palette: ['4682B4',
  '87CEEB',
  'FFF5EE',
  'FFA07A',
  '800000',
  ]
};
var composite = aod
.mean()
.visualize(band_viz)
.clipToCollection(geometry);
var compositeLayer = ui.Map.Layer(composite).setName('AOD')
// Create the main map and set the AOD layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'AOD');
// --------------------------------------------------------------------------------------
// CREATE SIDE PANEL
// --------------------------------------------------------------------------------------
// // Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '35%'}});
// add hyperlink to read full paper
var label_url_viewer = ui.Label({
    value:'Click here to read our full paper',
    style: {fontSize: '13px', fontWeight: 'bold'}
  });
label_url_viewer.setUrl('https://bit.ly/FullPaperAOD_LuruskanNiat');
var intro = ui.Panel([
  ui.Label({
    value: 'Spatial Distribution of Aerosol Optical Depth (AOD) as a New Instrument in Minimizing Coronavirus Fatality Rate',
    style: {fontSize: '22px', fontWeight: 'bold'}
  }),
    ui.Label({
    value: 'Description',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Aerosol Optical Depth (AOD) has the potential to be a factor in the transmission of COVID-19 because bioaerosol plays an important role in the spread of the virus through the air.  Aerosol Optical Depth level analysis conducted by Ismail Al Faruqi, Aufa Qoulan Karima, Khaila Nursofa from ITB raised the title of the study "Analysis of Aerosol Optical Depth (AOD) Level Utilizing Remote Sensing Data as a New Instrument in Minimizing Coronavirus Fatality Levels"' +
    ' with the addition of two variables that have never been studied in determining the fatality rate (CFR) of COVID-19 before. The two variables are relative humidity variables as a study of the influence of weather and also night light variables as an indication of human economic activity.'+
    ' The results of this study showed that the addition of four variables in the analysis of AOD levels, simultaneously affected the COVID-19 fatality rate as proven through the F test at a confidence interval of 99%. AOD and NL variables also exerted a (partial) effect on CFR variables through T tests at a confidence interval of 87.6% for AOD and 95.2% for NL. The relationship of RH and CFR variable had a significant correlation in α = 0.05 through pearson bivariate analysis. Thus, the interpretation of the spatial distribution of Aerosol Optical Depth levels can be done one of them through these EE (Earth Engine) Apps.',
    style: {fontSize: '13px'}
  }),
  label_url_viewer,
  ui.Label('Click a location to see its time series of Aerosol Optical Depth in Java.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of AOD for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
// Make a chart from the time series.
  var aodChart = ui.Chart.image.series(aod, point, ee.Reducer.mean(), 1000);
  // Customize the chart.
  aodChart.setOptions({
    title: 'Aerosol Optical Depth: Time Series',
    vAxis: {title: 'Optical Depth'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'FFA07A',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, aodChart);
};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(band_viz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(band_viz.min, {margin: '4px 8px'}),
    ui.Label(
        (band_viz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(band_viz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Mean Value of AOD COVID-19 Period (Feb 2020 - July 2021)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(106.8235, -6.214);
mapPanel.centerObject(area, 7);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});