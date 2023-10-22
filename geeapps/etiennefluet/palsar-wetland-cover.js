//----------------------------------------------------------------------------------------
//  Load in the Palsar data
var palsar = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/SAR')
                  .filter(ee.Filter.date('2007-01-01', '2010-12-31'));
var sarhh = palsar.select('HH');
var sarhhVis = {min: 0.0, max: 10000.0,};
//-----------------------------------------------------------------------------------
// Load JRC surface water 
// In each image:  0 No obs. ;  1 Not water ; 2 Water
var monthlyhist = ee.ImageCollection("JRC/GSW1_0/MonthlyHistory")
                  .filter(ee.Filter.date('2007-01-01', '2010-12-31'));
// Calc water frequency
var filtwat = function(image) {
  var i = image.where(image.lt(2), 0);
  return i.where(i.eq(2), 1);
};
// Map the function over the collection and display the result.
var filtwater = monthlyhist.map(filtwat)
var filtwater_sum = filtwater.sum();
var filtwater_sum_masked = filtwater_sum.updateMask(filtwater_sum.neq(0));
print('filtwater_sum: ', filtwater_sum);
// Calc nb observ 
var filtobs = function(image) {
  return image.where(image.eq(2), 1);
};
// Map the function over the collection and display the result.
var filtobsnb = monthlyhist.map(filtobs)
var filtobsnb_sum = filtobsnb.sum();
print('filtobsnb_sum: ', filtobsnb);
// combine the two images as two bands of same image
var comb = ee.Image.cat([filtwater_sum_masked, filtobsnb_sum]);
// Rename bands.
var comb = comb.select(
    ['water', 'water_1'],    // old names
    ['water', 'nbobs'])      // new names
print('comb: ', comb);
// Compute the water occurence %
var fraction = comb.expression(
    '( Water * 1.0 ) / ( NbObs * 1.0 ) * 100.0', {
      'Water': comb.select('water'),
      'NbObs': comb.select('nbobs')
});
//-------------------------------------------------------------------------------------
//   Load  Built-up area in 2014 - thresholded by confidence
var bt = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1')
                          //.select('built');
                          .select('cnfd')
                          .lt(70);   // threshold a confidence level
//-------------------------------------------------------------------------------------
//    Load slope
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation).lt(5);
//------------------------------------------------------------------------------
// Load forest / non-forest data 
var forestNonForest = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').select('fnf')
                  .filter(ee.Filter.date('2010-01-01', '2011-12-31'))
var listOfImages = forestNonForest.toList(forestNonForest.size());
var forestNonForestImage = listOfImages.get(0)  // get first image in list
var forestNonForest = ee.Image(forestNonForestImage);   // convert to image
// filter to only keep forest (val=1)
var forestNonForestmasked = forestNonForest.updateMask(forestNonForest.eq(1));
//var forestNonForestImage_masked = forestNonForestImage.updateMask(forestNonForestImage.eq(2));
var forestNonForestVis = {  min: 1.0, max: 3.0,   palette: ['006400', 'FEFF99', '0000FF']};
//-------------------------------------------------------------------------------------
//  Function: Convert to sigma naught:  sarhh_sigma0 = 10 * log10 * DN^2 + -83.0
var c = function(image) { return image.pow(2).log10().multiply(10).add(-83.0)};
//-------------------------------------------------------------------------------------
//   Function: Define a boxcar or low-pass kernel.
var boxcar = ee.Kernel.square({radius: 1, units: 'pixels', normalize: true});
//-------------------------------------------------------------------------------------
//   Function:  Threshold SAR backscatter
var initial_db_wetclass = function(image) {
  //var i = image.where(image.lt(-19), 0);
  var i2 = image.where(image.gt(-5.9), 0);
  var i3 = i2.where(image.gt(0), 1);
  return i3
};
//-------------------------------------------------------------------------------------
//    Convert from DN to dB by applying functionover the collection.
var sarhh_dB  = sarhh.map(c)
// Reduce the SAR image to get a one-band maximum value image.
var sarhh_dB_max = sarhh_dB.reduce(ee.Reducer.mean()); //max());
// apply smoother to reduce speckle
var sarhh_dB_max = sarhh_dB_max.convolve(boxcar);
//   Apply classification over the collection and display the result.
// var sarhh_dB_class = sarhh_dB.map(initial_db_wetclass)
var sarhh_dB_class = initial_db_wetclass(sarhh_dB_max);
// sum the wetland count over the 4 years
// var sarhhclass_sum = sarhh_dB_class.sum();
//-------------------------------------------------------------------------------------
//     Masking
var sarhhclass_sum_masked = sarhh_dB_class.updateMask(sarhh_dB_class.gte(0)); // mask the SAR above 0
sarhhclass_sum_masked = sarhhclass_sum_masked.updateMask(bt);  // mask with build-up
sarhhclass_sum_masked = sarhhclass_sum_masked.updateMask(slope);  // mask by slope
//------------------------------------------------------------------------------------
//   MAKE LEGEND 
// set position of panel
var legend = ui.Panel({
  style: {position: 'bottom-left',
  padding: '8px 15px'}
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '24px',
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
var palette =['ff5722', '0000FF', "C0C0C0"];
// name of the legend
var names = ['Inundated Wetland (ALOS 2006-2010)', 
             'JRC water cover (2006-2010)',
             'Background (ALOS backscatter annual mosaic 2006-2010)'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
//-------------------------------------------------------------------------------------
//    Add to map
Map.setCenter(-67.7, 3.9, 9);  // Zoom in on Orinoco/Amazon
//Map.setCenter(-121.74,38.05, 12); // Zoom in on the San Joaquin Delta 
// background SAR dB data
var sarhh_dBVis = {min: -83.0, max: 0.0,};
Map.addLayer(sarhh_dB_max, sarhh_dBVis, 'Palsar HH');
// Forest cover 
// var forestNonForestVis = {min: 1.0, max: 3.0,  palette: ['#5dd383', '#71D892', '#71D892']};
//Map.addLayer(forestNonForestmasked, forestNonForestVis, 'Forest/Non-Forest');
// wetland % occurence from  SAR classification
var sarhhclassVis = {  min: 0, max: 4,  palette: ['#ff5722', '#ee3900']};
Map.addLayer(sarhhclass_sum_masked, sarhhclassVis, 'Palsar Wetland class');
// Add water % occurence
var fractionVIS = {min: 0, max: 100, palette: ['lightblue', 'blue']};
Map.addLayer(fraction, fractionVIS, "Fraction.Water");