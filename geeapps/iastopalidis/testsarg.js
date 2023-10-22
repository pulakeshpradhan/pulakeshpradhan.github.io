var sarg = ee.FeatureCollection("users/iastopalidis/sargodha");
var lsib = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var country = lsib.filterMetadata('country_na','equals','Pakistan');
var startDate = '2021-06-01';
var endDate = '2021-06-14';
var NDVImed ;
var ndvi_pal;
var s2composite;
function maskS2srClouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// We will use the Sentinel-2 Surface Reflection product.
// This dataset has already been atmospherically corrected
var s2 = ee.ImageCollection("COPERNICUS/S2_SR");
// Filter Sentinel-2 collection
var s2Filt = s2.filterBounds(country)
                .filterDate(startDate,endDate)
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))
                .map(maskS2srClouds);
                // Composite images
s2composite = s2Filt.mean().clip(sarg);
// Create image collection of S-2 imagery for the perdiod 2016-2018
var S2 = ee.ImageCollection('COPERNICUS/S2')
//filter start and end date
.filterDate(startDate, endDate)
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['nd']);
NDVImed = NDVI.mean().clip(sarg); //I just changed the name of this variable ;)
// Create palettes for display of NDVI
ndvi_pal = ['#eaff00',  '#c2e699','#78c679','#31a354','#006837'];
///
var viz = {
  min: -1.0,
  max: 1.0,
   palette: [
    'e6f5b7', '006837', '006837', '006837', '006837', '006837', '006837',
    '006837', '006837'
  ],
};
//Legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }, layout: ui.Panel.Layout.flow('horizontal')
});
  var legendTitle = ui.Label({
    value: 'NDVI',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
// Add the title to the panel
legend.add(legendTitle);
// create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ], style: {padding: '1px', position: 'top-left'}
    });
  legend.add(panel);
 var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'200x10'},  
    style: {padding: '1px', position: 'bottom-right', stretch:'horizontal'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);
///
Map.setCenter(72.846084, 31.982649, 16);
var linkedMap = ui.Map();
// Map.addLayer(NDVImed, {min:-0.5, max:0.9, palette: ndvi_pal}, 'NDVI');
Map.setOptions('SATELLITE');
linkedMap.setOptions('SATELLITE');
linkedMap.addLayer(NDVImed, {min:-0.5, max:0.9, palette: ndvi_pal}, 'NDVI');
linkedMap.add(legend);
Map.addLayer(s2composite,{bands:['B4','B3','B2'],min:0.02,max:0.3,
                          gamma:1.5},'Sentinel-2 2021 composite');
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);