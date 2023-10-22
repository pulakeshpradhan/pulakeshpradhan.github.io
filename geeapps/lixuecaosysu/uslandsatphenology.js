/* 
This script uses to compare derived Landsat and MODIS phenology information 
Author: lixuecaosysu@gmail.com 
*/
//  ###### Define regioin of interest ######
//  --------------------------------------------------------------------------------------
// var roiRegion = roi.buffer(50000).bounds(); 
Map.setOptions('SATELLITE');
var roi = ee.Geometry.Point([-87.65973904063304,41.86104098047697]); 
Map.centerObject(roi, 10); 
//  --------------------------------------------------------------------------------------
//  ###### Load GEE library for visualization ######
//  --------------------------------------------------------------------------------------
var getCollections = require('users/lixuecaosysu/publicTools:getCollections');
// var timeSeriesFitting = require('users/lixuecaosysu/geeTools:timeSeriesFitting');
var legendSystem = require('users/lixuecaosysu/publicTools:legendSystem');
//  --------------------------------------------------------------------------------------
//  ###### Load ancillary datasets ######
//  --------------------------------------------------------------------------------------
var NLCD = ee.Image('USGS/NLCD/NLCD2011').select('landcover')/*.clip(roiRegion)*/; 
var NLCD_ISA = ee.Image('USGS/NLCD/NLCD2011').select('impervious')/*.clip(roiRegion)*/;
var NLCDmask = ee.Image(1).subtract(NLCD.lt(20).add(NLCD.eq(31)).gte(1)); // remove water and barren 
//  --------------------------------------------------------------------------------------
//  ###### Load MODIS long-term mean and annual dynamics data ######
//  --------------------------------------------------------------------------------------
var modisCol = ee.ImageCollection('users/lixuecaosysu/Global_Urban_Phenology/pheno_modis')/*.filterBounds(roi)*/
var modis_mean = ee.Image(modisCol.filter(ee.Filter.eq('type', 'longMean')).mosaic())
                   .float().divide(100)
                   .updateMask(NLCDmask);  
/* filter by correlation */ 
var modis_valid = modis_mean.select('correlation')/*.gt(0.85)*/
var modis_mean =  modis_mean.updateMask(modis_valid); 
var modis_aSOS = ee.Image(modisCol.filter(ee.Filter.eq('type', 'SOS')).first()).float().divide(100)
                   .updateMask(NLCDmask).updateMask(modis_valid); 
var modis_aEOS = ee.Image(modisCol.filter(ee.Filter.eq('type', 'EOS')).first()).float().divide(100)
                   .updateMask(NLCDmask).updateMask(modis_valid); 
/* derive annual SOS */
var modis_yearList = ee.List.sequence(2000, 2015);
var modis_id = ee.List.sequence(0, modis_yearList.length().subtract(1)); 
var modis_List = modis_id.map(function(id){
  var tempYear = ee.Number(modis_yearList.get(id));
  var tempBandName = ee.String('y').cat(ee.String(tempYear).slice(0,4)); 
  var tempImg1 = modis_aSOS.select(tempBandName).rename('sos')
                           .set('system:time_start', ee.Date.fromYMD(tempYear, 6,1));
  var tempImg2 = modis_aEOS.select(tempBandName).rename('eos')
                           .set('system:time_start', ee.Date.fromYMD(tempYear, 6,1));
  return tempImg1.addBands(tempImg2); 
});
var modis_AnnualCol = ee.ImageCollection(modis_List); // print(modis_List, 'modis_List');
// print(ui.Chart.image.series(modis_AnnualCol/*.select('sos')*/, roi2, ee.Reducer.mean(), 500));
//  --------------------------------------------------------------------------------------
//  ###### Added the MCD12Q2 product ######
//  --------------------------------------------------------------------------------------
var mcd12Q2 = getCollections.getDoy_MCD12Q2()/*.filterBounds(roi)*/
var mcd12Q2_AnnualCol = mcd12Q2.select('doySOS').map(function(image){return image.updateMask(NLCDmask)/*.clip(roiRegion)*/}); 
var mcd12Q2_List = mcd12Q2_AnnualCol.toList(mcd12Q2_AnnualCol.size()); // print(mcd12Q2_List, 'mcd12Q2_List');
var mcd12Q2_yearList = ee.List.sequence(2001, 2014);
var mcd12Q2_id = ee.List.sequence(0, mcd12Q2_yearList.length().subtract(1)); 
// var mcd12Q2Vis = legendSystem.getSOSvisImg(90, 180, 9, mcd12Q2_sos);
// print(ui.Chart.image.series(mcd12Q2.select('doySOS'), roi2, ee.Reducer.mean(), 500));
//  --------------------------------------------------------------------------------------
//  ###### Load Landsat long-term mean and annual dynamics data ######
//  --------------------------------------------------------------------------------------
// var usCluster = ee.FeatureCollection('users/lixuecaosysu/Global_Urban_Phenology/uCluster_USA_gt500')
                  // .filterBounds(roi);
// var clusterId = ee.Feature(usCluster.first()).get('name'); 
/* longterm mean of Landsat */
var landsat_meanCol = ee.ImageCollection('users/lixuecaosysu/Global_Urban_Phenology/mean_DG')/*.filterBounds(roi)*/
                     .filter(ee.Filter.eq('mapUnit', 'ntlCluster'))
                     .map(function(image){
                       /* reorganize this bands due to their inconsistent orders */
                       var yEnd = image.get('yEnd'); 
                       var vmin = image.select('vmin');
                       var vmax = image.select('vmax');
                       var n1 = image.select('n1');
                       var n2 = image.select('n2');
                       var m1 = image.select('m1');
                       var m2 = image.select('m2');
                       var correlation = image.select('correlation'); 
                       var newImg = ee.Image.cat([vmin, vmax, n1, m1, n2, m2, correlation]); 
                       return newImg.float().divide(10000).set('yEnd', yEnd)/*.clip(roiRegion)*/;}); 
/* get multi-temporal long-term mean */
var landsat_mean8595 = ee.Image(landsat_meanCol.filter(ee.Filter.eq('yEnd', 1995)).mosaic());
var landsat_mean9505 = ee.Image(landsat_meanCol.filter(ee.Filter.eq('yEnd', 2005)).mosaic());
var landsat_mean0510 = ee.Image(landsat_meanCol.filter(ee.Filter.eq('yEnd', 2010)).mosaic());
var landsat_mean1015 = ee.Image(landsat_meanCol.filter(ee.Filter.eq('yEnd', 2015)).mosaic());
// print(landsat_mean8595, 'landsat_mean1015'); Map.addLayer(landsat_mean1015, {}, 'landsat_mean1015');
/* get available observations */
var landsat_valid8595 = landsat_mean8595.select('correlation')/*.gt(0.85)*/
var landsat_valid9505 = landsat_mean9505.select('correlation')/*.gt(0.85)*/
var landsat_valid0510 = landsat_mean0510.select('correlation')/*.gt(0.85)*/
var landsat_valid1015 = landsat_mean1015.select('correlation')/*.gt(0.85)*/
var landsat_valid = landsat_valid8595.unmask(0).add(landsat_valid9505.unmask(0))
                    .add(landsat_valid0510.unmask(0)).add(landsat_valid1015.unmask(0)); 
var landsat_valid = landsat_valid.gte(2); 
/* filter by correlation */
var landsat_mean = landsat_mean1015.updateMask(landsat_valid);
/* annual variability of Landsat phenology matrics */
var landsat_aCol = ee.ImageCollection('users/lixuecaosysu/Global_Urban_Phenology/annual_Phe_DG')/*.filterBounds(roi)*/
                    .filter(ee.Filter.eq('mapUnit', 'ntlCluster')); print(landsat_aCol, 'landsat_aCol')
var landsat_aSOS = ee.Image(landsat_aCol.filter(ee.Filter.eq('type', 'SOS')).first())
                    .updateMask(landsat_valid);
var landsat_aEOS = ee.Image(landsat_aCol.filter(ee.Filter.eq('type', 'EOS')).first())
                    .updateMask(landsat_valid);
/* derive annual SOS */
var landsat_yearList = ee.List.sequence(1985, 2015);
var landsat_id = ee.List.sequence(0, landsat_yearList.length().subtract(1)); 
var landsat_List = landsat_id.map(function(id){
  var tempYear = ee.Number(landsat_yearList.get(id));
  var tempBandName = ee.String('y').cat(ee.String(tempYear).slice(0,4)); 
  var tempImg1 = landsat_aSOS.select(tempBandName).rename('sos')
                            .set('system:time_start', ee.Date.fromYMD(tempYear, 6,1));
  var tempImg2 = landsat_aEOS.select(tempBandName).rename('eos')
                            .set('system:time_start', ee.Date.fromYMD(tempYear, 6,1));                      
  return tempImg1.addBands(tempImg2);
}); 
var landsat_AnnualCol = ee.ImageCollection(landsat_List); // print(landsat_List, 'landsat_List');
// Map.addLayer(landsat_AnnualCol.select('sos').mean(), {}, 'landsat_mean')
// print(ui.Chart.image.series(landsat_AnnualCol/*.select('sos')*/, roi2, ee.Reducer.mean(), 100));
//  --------------------------------------------------------------------------------------
//  ###### Assign a color system for the SOS ######
//  --------------------------------------------------------------------------------------
var paletteList = ['868887','7ecda2','87cd7e','accd7e','c3cd7e','efe295','efcc95','efb295','ef9995']; 
var sosVis = {min:0, max:11, opacity: 0.8, palette: paletteList}
// *** plot long-term mean
var landsat_plot = landsat_mean.select('n1'); 
var modis_plot = modis_mean.select('n1'); 
var mcd12Q2_plot = ee.Image(mcd12Q2_AnnualCol.mean())/*.clip(roiRegion)*/
//  *** plot annual phenology metrics
// var landsat_plot90 = ee.Image(landsat_List.get(5)).select('sos');
// var landsat_plot01 = ee.Image(landsat_List.get(16)).select('sos');
// var landsat_plot03 = ee.Image(landsat_List.get(18)).select('sos');
// var landsat_plot06 = ee.Image(landsat_List.get(21)).select('sos');
// var landsat_plot09 = ee.Image(landsat_List.get(24)).select('sos');
// var landsat_plot12 = ee.Image(landsat_List.get(27)).select('sos');
// var landsat_plot14 = ee.Image(landsat_List.get(29)).select('sos');
// var landsat_plot14 = ee.Image(landsat_List.get(11)).select('sos');
// var modis_plot = ee.Image(modis_List.get(14)).select('sos');
// var mcd12Q2_plot = ee.Image(mcd12Q2_List.get(13)).select('doySOS');
var sosLandsatVis = legendSystem.getSOSvisImg(90, 180, 9, landsat_plot);
var sosModisVis = legendSystem.getSOSvisImg(90, 180, 9, modis_plot);
var sosMcd12Q2Vis = legendSystem.getSOSvisImg(90, 180, 9, mcd12Q2_plot);
// var sosLandsatVis = legendSystem.getSOSvisImg(0, 180, 18, landsat_plot);
// var sosModisVis = legendSystem.getSOSvisImg(0, 180, 18, modis_plot);
// var sosMcd12Q2Vis = legendSystem.getSOSvisImg(0, 180, 18, mcd12Q2_plot);
//  --------------------------------------------------------------------------------------
//  ###### Map.AddLayer ######
//  --------------------------------------------------------------------------------------
Map.addLayer(NLCD, {}, 'NLCD', false); 
// Map.addLayer(mcd12Q2_sos, {min:90, max:180}, 'mcd12Q2_sos', false);
// Map.addLayer(modis_mean, {}, 'modis_mean', false);
// Map.addLayer(modis_aSOS, {}, 'modis_aSOS', false); 
// Map.addLayer(usCluster, {}, 'usCluster', false);
// Map.addLayer(landsat_mean, {}, 'landsat_mean', false);
// Map.addLayer(landsat_aSOS, {}, 'landsat_aSOS', false)
Map.addLayer(sosModisVis/*.unmask(0, true)*/, sosVis, 'meanSOS_MODIS(2000-2015)', false);
Map.addLayer(sosLandsatVis/*.unmask(0, true)*/, sosVis, 'meanSOS_Landsat(1985-2015)');
Map.addLayer(sosMcd12Q2Vis/*.unmask(0, true)*/, sosVis, 'meanSOS_MCD12Q2(2001-2014)', false);
// var ol = ee.Image().byte().paint({
//   featureCollection: ee.FeatureCollection(ee.Feature(roiRegion)),
//   width:2,
// })
// Map.addLayer(ol, {palette: '#f1f759'}, 'ol')
//  --------------------------------------------------------------------------------------
// //  ###### Point based validation for MODIS ######
// //  --------------------------------------------------------------------------------------
// /* Collect MODIS collection */
// var yearStart = 2000;
// var yearEnd = 2015; 
// var eviCol = ee.ImageCollection('MODIS/006/MYD13A1').select(['EVI'], ['evi']) // Aqua 
//                 .merge(ee.ImageCollection('MODIS/006/MOD13A1').select(['EVI'], ['evi'])) // Terra 
//                 .filter(ee.Filter.calendarRange(yearStart, yearEnd, 'year')).filterBounds(roiRegion)
//                 .map(function(image){
//                   var timeField = ee.Date(image.get('system:time_start')); 
//                   var yearVal = ee.Number(ee.Date(image.get('system:time_start')).get('year'));
//                   var doyVal = ee.Number(ee.Date(image.get('system:time_start')).getRelative('day', 'year').add(1));
//                   //  *** add a doy & a consistent layer
//                   var doy = ee.Image.constant(doyVal).rename('doy').float(); 
//                   var constant = ee.Image.constant(1).float().rename('constant');
//                   image = image.multiply(0.0001).float(); // *** multiple a scale factor
//                   var valid = image.gt(0).add(image.lt(1)).eq(2);
//                   return image/*.updateMask(valid)*/.addBands([doy, constant])
//                               .set({'year': yearVal, 'doy': doyVal, 'system:time_start': timeField}); 
//                 });
// /* Apply a temporal lay of 2 days*/
// var lagDays = 2; 
// var timeField = 'doy'; 
// var eviCol_lag = timeSeriesFitting.getSmoothByDoy(eviCol, eviCol, lagDays, timeField); 
// var eviCol = ee.ImageCollection(eviCol_lag.map(function(image){
//   var cols = ee.ImageCollection.fromImages(ee.Image(image).get('images')).select('evi');
//   /* rename as EVI for implement our approach*/
//   return ee.Image(image).addBands(cols.mean().rename('evi_sm')); 
// })); 
// /* Apply double logistic fitting */
// var fitPara = timeSeriesFitting.doubleLogistic_GetPara(eviCol).clip(roiRegion); 
// /* Derive the fitting line */
// var eviCol = timeSeriesFitting.doubleLogistic_Fitting(fitPara, eviCol); 
// /* Plot the fitting curve */
// var chart = ui.Chart.image.doySeries(eviCol.select(['evi', 'fitted']), roi2, ee.Reducer.mean(), 500)
//               .setChartType('ScatterChart')
//               .setOptions({
//                 hAxis: {'title': 'DOY', viewWindow: {min:0, max:366}},
//                 vAxis: {'title': 'EVI'},
//                 pointSize: 5, color: '#a5d539', dataOpacity:0.5, legend: 'none',
//               }); 
// print(chart);
// //  --------------------------------------------------------------------------------------
// //  ###### Point based validation for Landsat ######
// //  --------------------------------------------------------------------------------------
// /* Collect Landsat time series */
// var selVar = ee.List(['evi', 'year', 'doy', 'constant'])
// var LC = getCollections.getLandsatCol().filterBounds(roiRegion)
//           .map(getCollections.getLandsat_EVI_timeSeries)
//           .select(selVar)
//           .filter(ee.Filter.calendarRange(2005, 2010, 'year'));
// /* Apply a temporal lag */
// var lagDays = 2; 
// var timeField = 'doy'; 
// var LClag = timeSeriesFitting.getSmoothByDoy(LC, LC, lagDays, timeField);
// var LC_sm = ee.ImageCollection(LClag.map(function(image) {
//   var collection = ee.ImageCollection.fromImages(ee.Image(image).get('images')).select('evi');
//   return ee.Image(image).addBands(collection.mean().rename('evi_sm'));
// }));
// /* Fittign use double logistic function */  
// // var fitPara = timeSeriesFitting.doubleLogistic_GetPara(LC_sm); 
// var fitPara = landsat_mean.clip(roiRegion);
// var LC_sm = timeSeriesFitting.doubleLogistic_Fitting(fitPara, LC_sm);
// /* Plot the fitting curve */
// var chart = ui.Chart.image.doySeries(LC_sm.select(['evi_sm', 'fitted']), roi2, ee.Reducer.mean(), 30)
//               .setChartType('ScatterChart')
//               .setOptions({
//                 hAxis: {'title': 'DOY', viewWindow: {min:0, max:366}},
//                 vAxis: {'title': 'EVI'},
//                 pointSize: 5, color: '#a5d539', dataOpacity:0.5, legend: 'none',
//               }); 
// print(chart);
// //  --------------------------------------------------------------------------------------
//  ###### Add legned on the map ######
//  ------------------------------------------------------------------------------
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Day of Year',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.clear();
legend.add(legendTitle);
//  *** add entries on the legend
var colors = ['868887','7ecda2','87cd7e','accd7e','c3cd7e','efe295','efcc95','efb295','ef9995'];
var names = ['<100', '110', '120', '130', '140', '150', '160', '170', '>180'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<9; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------