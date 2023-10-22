var image = ee.Image("UMD/hansen/global_forest_change_2015_v1_3"),
    USstates = ee.FeatureCollection("ft:1AeBEfx40Th1efQSHtaEJhzBlS-d-i3Ri7QwXFues"),
    y2000 = ee.Image("users/mfstuhlmacher/UrbanSecondPaper/USA_2000_L7/USA_2000"),
    y2015 = ee.Image("users/mfstuhlmacher/UrbanSecondPaper/USA_2015_L8_VIIRS/USA_2015");
// whole country viz
var unmask = y2015.unmask(3);
Map.addLayer(unmask,{'palette':['white']},'white base map', false);
Map.addLayer(y2015,{'palette':['black']},'black country boundary', false);
// Find increase in urban areas from 2000 to 2015
var diff = y2015.subtract(y2000);
var diffmask = diff.mask(diff);
// Convert urban pixels to area in m2
var urbanArea = diffmask.multiply(ee.Image.pixelArea());
// Select loss from 2000-2015 from Hansen
var loss = image.select(['loss']).eq(1);
var lossmask = loss.mask(loss);
Map.addLayer(lossmask,{'palette': 'violet', 'opacity':1}, 'Deforestation 2000-2015',false);
// Convert forest loss pixels to area im m2
var lossArea = lossmask.multiply(ee.Image.pixelArea());
// Find intersection of forest loss and gain in urban to find encroachment
var both = diff.where(loss.eq(0), 0);
var bothMask = both.mask(both);
Map.addLayer(bothMask,{'palette': 'red'}, 'Urban Encroachment on Forest 2000-2015');
// Convert encroachment pixels to area in m2
var bothArea = bothMask.multiply(ee.Image.pixelArea());
// Function that prints numerical values of urban increase, forest loss, and encroachment from 2000 to 2015 to the Console
var Analysis = function(feature) {
  var urbanincrease = urbanArea.reduceRegion(
    {  
      'reducer': ee.Reducer.sum(),
      'scale': 30,
      'geometry': feature.geometry(),
      'maxPixels': 1e9
      });
  var forestloss = lossArea.reduceRegion(
      {  
      'reducer': ee.Reducer.sum(),
      'scale': 30,
      'geometry': feature.geometry(),
      'maxPixels': 1e9
      });
  var encroachment = bothArea.reduceRegion(
      {  
      'reducer': ee.Reducer.sum(),
      'scale': 30,
      'geometry': feature.geometry(),
      'maxPixels': 1e9
      });
  return feature.set({'Increase in Urban 2000 - 2015 (m2)': urbanincrease.get('classification_mode')}).set({'Loss of Forest 2000 - 2015 (m2)': forestloss.get('loss')}).set({'Urban Encroachment into Forest (m2)': encroachment.get('classification_mode')});
  };
var AnalysisExport = USstates.map(Analysis);
// Export the FeatureCollection.
/*  Export.table.toDrive({
   collection: AnalysisExport,
    description: 'exportTableExample',
    fileFormat: 'CSV'      
});
*/