/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[80.81860953540051, 7.293449804501222],
         [80.76367789477551, 7.339761512463741],
         [80.91473990649426, 7.24440865652139]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).set('system:time_start', image.get('system:time_start'));
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-01-04', '2018-02-04')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var dataset2 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-12-04', '2019-02-04')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
// Function to calculate and add an NDVI band
var addNBR = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B12']).rename('NBR'));
};
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
// Add NDVI band to image collection
var NB1 = dataset.map(addNBR).map(addNDVI);
var NB2 = dataset2.map(addNBR).map(addNDVI);
// print (NBR1);
// Extract NDVI band and create NDVI median composite image
var NBR = NB1.select(['NBR']);
var NBR= NBR.median();                
var NBR2 = NB2.select(['NBR']);
var NBR2= NBR2.median();
var dNBR =  NBR2.select('NBR').subtract(NBR.select('NBR'));
var NDVI = NB1.select(['NDVI']);
var NDVI = NDVI.median();                
var NDVI2 = NB2.select(['NDVI']);
var NDVI2= NDVI2.median();
var dNDVI =  NDVI2.select('NDVI').subtract(NDVI.select('NDVI'));
print(dNDVI);
var RdNBR = dNBR.expression(
'delNBR/sqrt(abs(preNBR/1000))', {
'delNBR': dNBR.select('NBR'),
'preNBR': NBR2.select('NBR')
});
print (RdNBR);
var RBR = dNBR.select('NBR').divide(NBR.select('NBR').add(1.001));
// Create a time series chart.
var plotNDVI = ui.Chart.image.seriesByRegion(NB2, geometry,ee.Reducer.mean(),
'NBR',500,'system:time_start', 'system:index')
              .setChartType('LineChart').setOptions({
                title: 'NBR short-term time series',
                hAxis: {title: 'Date'},
                vAxis: {title: 'NBR'}
});
// Display.
print(plotNDVI);
// Create a time series chart.
var plotNDVI2 = ui.Chart.image.seriesByRegion(NB2, geometry,ee.Reducer.mean(),
'NDVI',500,'system:time_start', 'system:index')
              .setChartType('LineChart').setOptions({
                title: 'NBR short-term time series',
                hAxis: {title: 'Date'},
                vAxis: {title: 'NDVI'}
});
// Display.
print(plotNDVI2);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var ndvi_pal = ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b',
'#a6d96a'];
Map.setCenter(80.63613570399932,7.28535448067862, 15);
Map.addLayer(dataset.median(), rgbVis, 'Before');
Map.addLayer(dataset2.median(), rgbVis, 'After');
// Display NDVI results on map
Map.addLayer(NBR, {min:0, max:0.9, palette: ndvi_pal}, 'NBR');
Map.addLayer(dNBR, {min:0.27, max:1, palette: ndvi_pal}, 'NBR');
Map.addLayer(RBR, {min:-1, max:1, palette: ndvi_pal}, 'RBR');
Map.addLayer(dNDVI, {min:-1, max:1, palette: ndvi_pal}, 'dNDVI');
Map.addLayer(RdNBR, {min:-1, max:1, palette: ndvi_pal}, 'dNDVI')
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '22px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_STYLE = {
  fontSize: '15px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var postfi = 'Post Fire Image';
var prefi = 'Pre Fire Image';
var MAIN = 'dNBR';
var OILPALM = 'dNDVI';
var RUBBER = 'RBR';
var OILPALM_RUBBER = 'RdNBR';
var mainVis = dNBR.visualize({min:-1, max:1, palette: ndvi_pal});
var oilpalmVis = dNDVI.visualize({min:-1, max:1, palette: ndvi_pal});
var rubberVis = RBR.visualize({min:-1, max:1, palette: ndvi_pal});
var oilpalm_rubberVis = RdNBR.visualize({min:-1, max:1, palette: ndvi_pal});
var prefivis = dataset.median().visualize(rgbVis);
var postfivis = dataset2.median().visualize(rgbVis);
// Create a label and pull-down menu.
var label = ui.Label('Select to show', TITLE_STYLE);
var select = ui.Select({
  items: [postfi,prefi,MAIN, OILPALM, RUBBER, OILPALM_RUBBER],
  value: MAIN,
  onChange: redraw,
  style: {stretch:'horizontal'}
});
// Create a panel that contains both the pull-down menu and the label.
var panel = ui.Panel({
  widgets: [label, select],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    width: '300px',
    padding: '10px'
  }
});
// Add the panel to the map.
Map.add(panel);
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  Map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == MAIN) {
    image = mainVis;
  } else if (layer == OILPALM) {
    image = oilpalmVis;
  } else if (layer == RUBBER) {
    image = rubberVis;
  } else if (layer == OILPALM_RUBBER) {
    image = oilpalm_rubberVis;
  } else if (layer == postfi) {
    image = prefivis;
  } else if (layer == prefi) {
    image = postfivis;
  }
  Map.addLayer(image, {}, layer);
}
// Invoke the redraw function once at start up to initialize the map.
redraw();
var label = ui.Label('Select to show', TITLE_STYLE);
var labels = ['Text 1','Text 2', 'Text 3', 'Text 4', 'Text 5', 'Text 6'];
var palette =['ff0000',// palm  (red)
              '9933ff',//rubber  (purple)
              '008000',//other trees  (green)
              'lime',//shrub (lime)
              'yellow',//bare (yellow)
              '0000ff',//river (blue)
];
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({style: { fontWeight: 'bold', fontSize: '15px', margin: '1px 1px 4px 1px', padding: '2px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '1px 1px 4px 1px'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '1px 1px 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
add_legend('Legend', labels, palette);
Map.add(ui.Panel(
    [
      ui.Label('Wild Fire Monitoring 2019-2020', TITLE_STYLE),
      ui.Label(
          'CDRD Sri Lanka', TEXT_STYLE),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}));
function initMap(map) {
map.setCenter(80.63613570399932,7.28535448067862, 12);
}
// Initialize
initMap(Map);
// set image
var image = ee.Image("LANDSAT/LC8_L1T_TOA/LC81260452014268LGN00");
// function to create map 1
function createMap1() {
var map = new ui.Map();
map.addLayer(dataset.median(), rgbVis, 'Before');
return map;
}
// function to create map 2
function createMap2() {
var map = new ui.Map();
map.addLayer(dataset2.median(), rgbVis, 'After');
return map;
}
// function to create map 3
function createMap3() {
var map = new ui.Map();
map.addLayer(RBR, {min:-1, max:1, palette: ndvi_pal}, 'RBR');
return map;
}
// function to create map 3
function createMap4() {
var map = new ui.Map();
map.addLayer(dNDVI, {min:-1, max:1, palette: ndvi_pal}, 'dNDVI');
return map;
}
// function to create map 3
function createMap5() {
var map = new ui.Map();
map.addLayer(RdNBR, {min:-1, max:1, palette: ndvi_pal});
return map;
}
// add maps
function createMap(title) {
var map = ui.Map();
ui.Label(title, {position:'top-center'});
map.add(title);
return map;
}
function getMapSize() {
var scale = Map.getScale();
var bounds = ee.Geometry(Map.getBounds(true)).transform('EPSG:32648', scale).coordinates().get(0).getInfo();
var ll = bounds[0];
var ur = bounds[2];
var width = (ur[0] - ll[0]) / scale;
var height = (ur[1] - ll[1]) / scale;
return { w: Math.floor(width), h: Math.floor(height) };
}
var maps = [createMap1(), createMap2(), createMap3(), createMap4(), createMap5()];
var height = '500';
// Create a panel with vertical flow layout.
var panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {width: '100vw', height: height + 'px'}
});
var linker = ui.Map.Linker(maps)
maps.map(function(map) {
initMap(map)
map.setOptions('HYBRID')
panel.add(map)
})
ui.root.clear();
ui.root.add(panel);
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////