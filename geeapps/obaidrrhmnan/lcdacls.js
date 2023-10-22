/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table3 = ee.FeatureCollection("users/obaidrrhmnan/multan"),
    image2 = ee.Image("users/obaidrrhmnan/lcdamtn06062020"),
    table = ee.FeatureCollection("users/obaidrrhmnan/khanewal"),
    table2 = ee.FeatureCollection("users/obaidrrhmnan/rajanpur"),
    image = ee.Image("users/obaidrrhmnan/lcdakhn06202020");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bound = table;
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection0 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-05-01', '2020-05-15')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var composite0 = collection0.median().clip(bound);
var collection1 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-05-08', '2020-05-15')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var composite1 = collection1.median().clip(bound);
var collection2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-05-25', '2020-06-05')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(maskS2clouds);
var composite2 = collection2.median().clip(bound);
/*
var collection3 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-03-29', '2020-03-31')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
var composite3 = collection3.median().clip(bound);
var collection4 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-01-01', '2020-03-15')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var composite4 = collection4.median().clip(bound);*/
//var stack = composite3;
//NDVIs
/*
var visParams_ndvi = {min: -0.2, max: 0.8, palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
    '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'};
// Calculate NDVI
/*
// compute ndvi and add to the image collection
var withNDVI = collection4.map(function(img){
  var red = ee.Image(img.select('B4'));
  var nir = ee.Image(img.select('B8'));
  var ndvi = (nir.subtract(red)).divide(nir.add(red)).rename('ndvi');
  return img.addBands(ndvi);
});
// use quality mosaic to get the per pixel maximum NDVI values and corresponding bands
var ndviQual = withNDVI.qualityMosaic('ndvi');*/
/*
var ndvi_pre = ee.Image(composite1.normalizedDifference(['B8','B4']));
var ndvi_premasked = ndvi_pre.updateMask(ndvi_pre.gte(0.05));
var ndvi_post = ee.Image(composite2.normalizedDifference(['B8','B4']));
var ndvi_postmasked = ndvi_post.updateMask(ndvi_post.gte(0.05));
var ndvi_postvgt = ndvi_post.updateMask(ndvi_post.gte(0.05));
var stack = ndvi_post.addBands(ndvi_pre);
var landMask = ee.Image('CGIAR/SRTM90_V4').mask();
var ndv_diff = (ndvi_postmasked).subtract(ndvi_premasked);
var ndviup = ndv_diff.updateMask(landMask);
var DTstring = ['1) root 9999 9999 9999',
'2) nd<=-0.15 9999 9999 1 *',
'3) nd>-0.15 9999 9999 9999',
'6) nd<=-0.05 9999 9999 2 *',
'7) nd>-0.05 9999 9999 9999',
'14) nd<=0 9999 9999 3 *',
'15) nd>0 9999 9999 9999',
'30) nd<=0.1 9999 9999 4 *',
'31) nd>0.1 9999 9999 5 *'].join("\n");
var classifier = ee.Classifier.decisionTree(DTstring);
var reclassifiedImage = ndviup.select('nd').classify(classifier);*/
var vis = {
  min: 1,
  max: 5,
  palette: ['16cdd6', 'd65828', 'd65828', 'aed673', '50fd36'],
};
// Display the results.
//Map.addLayer(composite1.clip(bound), {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.5}, 'apr');
Map.addLayer(composite1.clip(bound), {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.4,gamma: [0.95, 1.2, 1]}, 'Pre 05-10 May 2020');
Map.addLayer(composite2.clip(bound), {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.4,gamma: [0.95, 1.2, 1]}, 'Post 25 may -  06 June 2020');
//Map.addLayer(composite0.clip(bound), {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.7}, 'april');
Map.setCenter(72.0054138, 30.442288, 10);
Map.addLayer(image, vis, 'Rapid Crop Damage');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['16cdd6', 'd65828', 'aed673', '50fd36'];
// name of the legend
var names = ['Harvested Vegetation','Vegetation loss/Hotspot', 'No Vegetation Change', 'Vegetation Gain'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);