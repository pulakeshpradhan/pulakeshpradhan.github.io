var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    modis = ee.ImageCollection("MODIS/006/MOD14A1");
//----------------------------------------------------------------------
//             CLOUD MASK - VISUALIZATION OF SENTINEL 2 MOSAIC
//----------------------------------------------------------------------
var Brazil = countries.filter(ee.Filter.eq('country_na',  'Brazil'));
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-08-22', '2019-08-27'));
var fires = dataset.select('T21');
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//https://gis.stackexchange.com/questions/266377/sentinel-cloud-free-collection-google-earth-engine-code-editor
// Define process arguments
// temporal range
var sdate = ee.String('2019-08-22');
var edate = ee.String('2019-08-27');
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = ee.Number(2).pow(10).int();
var cirrusBitMask = ee.Number(2).pow(11).int();
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
var visparam = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3};
var composite = ee.ImageCollection('COPERNICUS/S2') 
  .filterDate(sdate,edate)
  //.map(maskS2clouds)
  .median()
  .clip(Brazil)
  .divide(10000);
  //print(collection);
  Map.addLayer(composite, visparam, 'Sentinel 2 - false color',false);
  Map.addLayer(fires, firesVis, 'Fires FIRMS 20-27Agustus2019');
  Map.addLayer (Brazil,{},'Brazil',false);
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Fire Information for Resource Management System (Brazil, August 20-27, 2019)',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('The Fire Information for Resource Management System (FIRMS) dataset contains the LANCE fire detection product in rasterized form. The near real-time (NRT) active fire locations are processed by LANCE using the standard MODIS MOD14/MYD14 Fire and Thermal Anomalies product.')
]);
inspectorPanel.add(intro);
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
  params: makeColorBarParams(firesVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(firesVis.min, {margin: '4px 8px'}),
    ui.Label(
        (firesVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(firesVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend:  The brightness temperature of a fire pixel (K)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
// Create the main map and set the SST layer.
var compositeLayer = ui.Map.Layer(dataset).setName('Fires FIRMS 20-27Agustus2019');
var compositeLayer2 = composite.visualize(visparam);
var compositeLayer3 = ui.Map.Layer(compositeLayer2).setName('Sentinel-2');
//ui.Map.Layer(composite).setName('Sentinel-2 Composite');
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer3, '');
layers.add(compositeLayer, '');
//layers.add(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'Sentinel 2 - false color',false);
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
mapPanel.centerObject(Brazil);