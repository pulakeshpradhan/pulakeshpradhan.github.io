// CCDC Synthetic Image
// ---------------------------------------------------------------
// Imports and predefined variables:
var ut = require('users/xjtang/ccdc:Utilities');
var ccdc = ee.ImageCollection('projects/CCDC/v2')
            .filterMetadata('system:index', 'starts_with', 'z')
            .mosaic();
// ---------------------------------------------------------------
// Main functions:
var createSyntParam = function(date) {
  var synt = {};
  synt.red = 'SWIR1';
  synt.green = 'NIR';
  synt.blue = 'RED';
  synt.stretch = [0, 0.6];
  synt.nSeg = 10;
  synt.bands = [synt.red, synt.green, synt.blue];
  synt.date = date;
  return synt;
};
// ---------------------------------------------------------------
// Initialization:
var createSynthetic = function(ccdc, synt) {
  var ccdcImg = ut.genCCDCImage(ccdc, synt.nSeg, synt.bands);
  var syntImg = ut.genMultiSyntImg(ccdcImg, synt.date, synt.bands, synt.nSeg);
  return(syntImg);
};
var years = [2001, 2006, 2011, 2016];
var maps = years.map(function(year) {
  var syntParam = createSyntParam(year + 0.7);
  var syntImg = createSynthetic(ccdc, syntParam);
  return Map.addLayer(syntImg, {bands: syntParam.bands, min: syntParam.stretch[0], 
                      max: syntParam.stretch[1]}, 'Synthetic ' + year);
});
Map.setCenter(-71.042532, 42.249432, 15);
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
// End