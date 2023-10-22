var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .select('VV')
  .map(function(image) {
    var edge = image.lt(-30.0);
    var maskedImage = image.mask().and(edge.not());
    return image.updateMask(maskedImage);
  });
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass',  'ASCENDING'));
var dsc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var filter2015 = ee.Filter.date('2015-04-15','2015-10-31');
var filter2016 = ee.Filter.date('2016-04-15','2016-10-31');
var filter2017 = ee.Filter.date('2017-04-15','2017-10-31');
var filter2018 = ee.Filter.date('2018-04-15','2018-10-31');
var filter2019 = ee.Filter.date('2019-04-15','2019-10-31');
var filter2020 = ee.Filter.date('2020-04-15','2020-10-31');
var filter2021 = ee.Filter.date('2021-04-15','2021-10-31');
var filter2022 = ee.Filter.date('2022-04-15','2022-10-31');
// St. Denis National Wildlife Area (Saskatchewan)
Map.setCenter(-106.086271, 52.209860, 12);
var vizParamS1 = {min: -25, max: 5};
Map.addLayer(asc.filter(filter2022).median(), vizParamS1, 'S1 ASC VV median 2022 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2021).median(), vizParamS1, 'S1 ASC VV median 2021 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2020).median(), vizParamS1, 'S1 ASC VV median 2020 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2019).median(), vizParamS1, 'S1 ASC VV median 2019 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2018).median(), vizParamS1, 'S1 ASC VV median 2018 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2017).median(), vizParamS1, 'S1 ASC VV median 2017 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2016).median(), vizParamS1, 'S1 ASC VV median 2016 04/15 - 10/31', true);
Map.addLayer(asc.filter(filter2015).median(), vizParamS1, 'S1 ASC VV median 2015 04/15 - 10/31', true);