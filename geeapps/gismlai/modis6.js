//modis
var dataset_modis = ee.ImageCollection('MODIS/051/MCD12Q1')
                  .filter(ee.Filter.date('2003-01-01', '2003-12-31'))
                  .first();
console.log(dataset_modis);       
var igbpLandCover = dataset_modis.select('Land_Cover_Type_1');
var igbpLandCoverVis = {
  min: 0.0,
  max: 16.0,
  palette: [
    '1c0dff', '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044',
    'dcd159', 'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5',
    'ff6d4c', '69fff8', 'f9ffa4'
  ],
};
Map.addLayer(igbpLandCover, igbpLandCoverVis, 'modis');
//CDL
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2003-01-01', '2003-12-31'))
                  .first();
console.log(dataset); 
var cropLandcover = dataset.select('cropland');
Map.setCenter(-100.55, 40.71, 4);
Map.addLayer(cropLandcover, {}, 'Crop Landcover');