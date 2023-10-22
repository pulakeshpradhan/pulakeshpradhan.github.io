// ThailandFlood 2015 using Sentinel-1 SAR images
var rect = ee.Geometry.Rectangle(88.779, 0.041, 112.597, 22.631);
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filterBounds(rect.bounds())
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var spring = ee.Filter.date('2015-03-01', '2015-04-20');
var lateSpring = ee.Filter.date('2015-04-21', '2015-06-10');
var summer = ee.Filter.date('2015-06-11', '2015-08-31');
var ascChangeJun = ee.Image.cat(
        asc.filter(ee.Filter.date('2015-06-01', '2015-06-30')).mean());
var ascChangeAug = ee.Image.cat(
        asc.filter(ee.Filter.date('2015-08-01', '2015-08-31')).mean());
var ascChangeOct = ee.Image.cat(
        asc.filter(ee.Filter.date('2015-10-01', '2015-10-31')).mean());
var descChangeJun = ee.Image.cat(
        desc.filter(ee.Filter.date('2015-06-01', '2015-06-30')).mean());
var descChangeAug = ee.Image.cat(
        desc.filter(ee.Filter.date('2015-08-01', '2015-08-31')).mean());
var descChangeOct = ee.Image.cat(
        desc.filter(ee.Filter.date('2015-10-01', '2015-10-31')).mean());
Map.setCenter(100.4899, 14.1738, 9);
Map.addLayer(ascChangeOct, {min: -25, max: 5}, 'Multi-T Mean ASC OCT', true);
Map.addLayer(descChangeOct, {min: -25, max: 5}, 'Multi-T Mean DESC OCT', true);
Map.addLayer(ascChangeAug, {min: -25, max: 5}, 'Multi-T Mean ASC AUG', true);
Map.addLayer(descChangeAug, {min: -25, max: 5}, 'Multi-T Mean DESC AUG', true);
Map.addLayer(ascChangeJun, {min: -25, max: 5}, 'Multi-T Mean ASC JUN', true);
Map.addLayer(descChangeJun, {min: -25, max: 5}, 'Multi-T Mean DESC JUN', true);