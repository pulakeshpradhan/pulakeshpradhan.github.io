var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    modis = ee.ImageCollection("MODIS/006/MOD14A1"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[109.29714416437872, 2.1903702444419917],
          [108.63796447687872, 1.1361420024597313],
          [108.96755432062872, -0.7973515459857947],
          [109.78054260187872, -2.5762938612962594],
          [110.30788635187872, -3.453974790962707],
          [112.72487853937872, -4.024045464510399],
          [115.69118713312872, -4.615619140670448],
          [117.11940978937872, -3.344304807044216],
          [117.69069885187872, -1.4564001101609414],
          [118.28396057062872, -0.1821426021520502],
          [119.18483947687872, 0.8725108668949589],
          [118.67946838312872, 1.9049084035334871],
          [118.76735900812872, 3.85790739616551],
          [118.08620666437872, 4.5153244560012595],
          [115.73513244562872, 4.383885906824727],
          [114.94411682062872, 3.1561035398470265],
          [113.91140197687872, 1.9049084035334871],
          [112.19753478937872, 1.7072528354342444],
          [110.59353088312872, 1.1800783370676469]]]);
//----------------------------------------------------------------------
//             CLOUD MASK - VISUALIZATION OF SENTINEL 2 MOSAIC
//----------------------------------------------------------------------
//var Brazil = countries.filter(ee.Filter.eq('country_na',  'Brazil'));
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-09-05', '2019-09-15'));
var fires = dataset.select('T21');
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//https://gis.stackexchange.com/questions/266377/sentinel-cloud-free-collection-google-earth-engine-code-editor
// Define process arguments
// temporal range
var sdate = ee.String('2019-09-05');
var edate = ee.String('2019-09-15');
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
var visparam = {bands: ['B11', 'B8', 'B4'], min: 0, max: 0.4};
var composite = ee.ImageCollection('COPERNICUS/S2') 
  .filterDate(sdate,edate)
  //.map(maskS2clouds)
  .median()
  .clip(geometry)
  .divide(10000);
  //print(collection);
  Map.addLayer(composite, visparam, 'Sentinel 2 - false color',false);
  Map.addLayer(fires, firesVis, 'Fires FIRMS 5-15September2019');
  Map.addLayer (geometry,{},'Kalimantan',false);
//----------------------------------------------------------------------
//             CLOUD MASK - VISUALIZATION OF SENTINEL 2 MOSAIC
//----------------------------------------------------------------------
// Load fire counts image
var fire = ee.ImageCollection('FIRMS')
             .filterBounds(geometry)
             .filterDate('2019-09-05', '2019-09-15');
// Filter fire with more than 50% confidence and add a new band representing areas where confidence of fire > 50%
var filterConfidence = function(image) {
  var line_number = image.select('line_number');
  var confidence = image.select('confidence');
  var conf_50 = confidence.gt(40).rename('confidence_50');
  var count_band = line_number.updateMask(conf_50).rename('count');
  return image.addBands(count_band);
};
var fire_conf = fire.map(filterConfidence);
print('fire_conf', fire_conf);
// Count for individual image
var countIndividualImg = function(image) {
  var countObject = image.reduceRegion({
    reducer: ee.Reducer.countDistinct(),
    scale: 1000,
    geometry: geometry
  });
  return image.set(countObject);
};
var fire_ind_count = fire_conf.map(countIndividualImg);
print('fire_ind_count', fire_ind_count);
// Set properties to band
var setPropertiesToBand = function(image) {
  var countProperty = image.get('count');
  return image.addBands(image.metadata('count'));
};
var fire_ind_count_band = fire_ind_count.map(setPropertiesToBand);
print('fire_ind_count_band', fire_ind_count_band);
// Reduce the collection with a sum reducer.
var sum = fire_ind_count_band.reduce(ee.Reducer.sum());
print (sum);
// Get image containing total fire counts
Export.image.toDrive({
  image: sum.select('count_1_sum'),
  description: 'count_1_sum_2010_40',
});
//=====================================================================
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Fire Information for Resource Management System (Kalimantan, September 5-15, 2019)',
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
    ui.Label(firesVis.max, {margin: '4px 8px',textAlign: 'right', stretch: 'horizontal'})
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
//ui.root.clear();
ui.root.add(inspectorPanel);
Map.centerObject(geometry,6);