var image = ee.Image("UMD/hansen/global_forest_change_2015_v1_3"),
    IndiaStates = ee.FeatureCollection("ft:1deurQgNQeIpYhocEH2LlAkJl3dzFY4YFOQPa-3ua"),
    y2000 = ee.Image("users/mfstuhlmacher/UrbanSecondPaper/India_2000_L7/India_2000"),
    y2015 = ee.Image("users/mfstuhlmacher/UrbanSecondPaper/India_2015_L8_VIIRS/India_2015");
//whole country viz
var unmask = y2015.unmask(3);
Map.addLayer(unmask,{'palette':['white']},'White base map', false);
Map.addLayer(y2015,{'palette':['black']},'Black country boundary', false);
// Find increase in urban areas from 2000 to 2015
var diff = y2015.subtract(y2000);
var diffmask = diff.mask(diff);
// Convert urban pixels to area in m2
var urbanArea = diffmask.multiply(ee.Image.pixelArea());
// Select loss from 2000-2015 from Hansen
var loss = image.select(['loss']).eq(1);
var lossmask = loss.mask(loss);
Map.addLayer(lossmask,{'palette': 'violet', 'opacity':1}, 'Deforestation 2000-2015', false);
// Convert forest loss pixels to area im m2
var lossArea = lossmask.multiply(ee.Image.pixelArea());
// Find intersection of forest loss and gain in urban to find encroachment
var both = diff.where(loss.eq(0), 0);
var bothMask = both.mask(both);
Map.addLayer(bothMask,{'palette': 'red'},'Urban Encroachment on Forest 2000-2015');
// Convert encroachment pixels to area in m2
var bothArea = bothMask.multiply(ee.Image.pixelArea());
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
      // print(n, 'Urban Increase', urbanincrease, 'Forest Loss', forestloss, 'Encroachemnt',encroachment);
  });