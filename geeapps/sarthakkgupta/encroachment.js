var image = ui.import && ui.import("image", "image", {
      "id": "UMD/hansen/global_forest_change_2015_v1_3"
    }) || ee.Image("UMD/hansen/global_forest_change_2015_v1_3"),
    USstates = ui.import && ui.import("USstates", "fusionTable", {
      "docId": "1AeBEfx40Th1efQSHtaEJhzBlS-d-i3Ri7QwXFues"
    }) || ee.FeatureCollection("ft:1AeBEfx40Th1efQSHtaEJhzBlS-d-i3Ri7QwXFues"),
    y2000USA = ui.import && ui.import("y2000USA", "image", {
      "id": "users/mfstuhlmacher/UrbanSecondPaper/USA_2000_L7/USA_2000"
    }) || ee.Image("users/mfstuhlmacher/UrbanSecondPaper/USA_2000_L7/USA_2000"),
    y2015USA = ui.import && ui.import("y2015USA", "image", {
      "id": "users/mfstuhlmacher/UrbanSecondPaper/USA_2015_L8_VIIRS/USA_2015"
    }) || ee.Image("users/mfstuhlmacher/UrbanSecondPaper/USA_2015_L8_VIIRS/USA_2015"),
    IndiaStates = ui.import && ui.import("IndiaStates", "fusionTable", {
      "docId": "1deurQgNQeIpYhocEH2LlAkJl3dzFY4YFOQPa-3ua"
    }) || ee.FeatureCollection("ft:1deurQgNQeIpYhocEH2LlAkJl3dzFY4YFOQPa-3ua"),
    y2000India = ui.import && ui.import("y2000India", "image", {
      "id": "users/mfstuhlmacher/UrbanSecondPaper/India_2000_L7/India_2000"
    }) || ee.Image("users/mfstuhlmacher/UrbanSecondPaper/India_2000_L7/India_2000"),
    y2015India = ui.import && ui.import("y2015India", "image", {
      "id": "users/mfstuhlmacher/UrbanSecondPaper/India_2015_L8_VIIRS/India_2015"
    }) || ee.Image("users/mfstuhlmacher/UrbanSecondPaper/India_2015_L8_VIIRS/India_2015");
Map.setCenter(-10.663554538581934, 27.563156559170853,3.1);
var label1 = ui.Label('Hover over "Layers" to toggle between layers.');
var label2 = ui.Label('');
var label3 = ui.Label('Maps the intersection of new urbanization and forest loss from 2000 to 2015. Determines where and how much urban encroachment on forest land occurred in the US and India from 2000 to 2015.');
var label4 = ui.Label('');
var label5 = ui.Label('Urban Encroachment on Forest in Red');
var label6 = ui.Label('All Deforestation in Purple');
var label7 = ui.Label('')
var label8 = ui.Label('Developed by Sarthak Gupta');
var label9 = ui.Label('sarthakkgupta@gmail.com');
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '350px'}
});
// Add a bunch of labels to one panel.
panel.add(label1);
panel.add(label2);
panel.add(label3);
panel.add(label4);
panel.add(label5);
panel.add(label6);
panel.add(label7);
panel.add(label8);
panel.add(label9);
// Adds the panel to the map
Map.add(panel);
// whole country viz
var unmaskUSA = y2015USA.unmask(3);
var unmaskIndia = y2015India.unmask(3);
var unmask = ee.ImageCollection([unmaskUSA, unmaskIndia]);
Map.addLayer(unmask,{'palette':['white']},'White base map', false);
Map.addLayer(ee.ImageCollection([y2015USA, y2015India]),{'palette':['black']},'Black country boundary', true);
// USA
// Find increase in urban areas from 2000 to 2015
var diff = y2015USA.subtract(y2000USA);
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
var bothMaskUSA = both.mask(both);
// Convert encroachment pixels to area in m2
var bothArea = bothMaskUSA.multiply(ee.Image.pixelArea());
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
// INDIA
// Find increase in urban areas from 2000 to 2015
var diff = y2015India.subtract(y2000India);
var diffmask = diff.mask(diff);
// Convert urban pixels to area in m2
var urbanArea = diffmask.multiply(ee.Image.pixelArea());
// Find intersection of forest loss and gain in urban to find encroachment
var both = diff.where(loss.eq(0), 0);
var bothMaskIndia = both.mask(both);
Map.addLayer(ee.ImageCollection([bothMaskUSA, bothMaskIndia]),{'palette': 'red'},'Urban Encroachment on Forest 2000-2015');
// Convert encroachment pixels to area in m2
var bothArea = bothMaskIndia.multiply(ee.Image.pixelArea());
// List of India States
var serverList = ["ANDAMAN AND NICOBAR ISLANDS","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","CHANDIGARH","Chhattisgarh","DADRA AND NAGAR HAVELI","DAMAN AND DIU","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu And Kashmir","Jharkhand","Karnataka","Kerala","LAKSHADWEEP","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Nct Of Delhi","Orissa","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
// Function that prints numerical values of urban increase, forest loss, and encroachment from 2000 to 2015 to the Console
var Analysis = serverList.map(function(n) {
  var State = IndiaStates.filterMetadata('ST_NAME','equals', n);
    var urbanincrease = urbanArea.reduceRegion(
        {  
        'reducer': ee.Reducer.sum(),
        'scale': 30,
        'geometry': State.geometry(),
        'maxPixels': 1e9
        });
    var forestloss = lossArea.reduceRegion(
        {  
        'reducer': ee.Reducer.sum(),
        'scale': 30,
        'geometry': State.geometry(),
        'maxPixels': 1e9
        });
    var encroachment = bothArea.reduceRegion(
        {  
        'reducer': ee.Reducer.sum(),
        'scale': 30,
        'geometry': State.geometry(),
        'maxPixels': 1e9
        });
  });