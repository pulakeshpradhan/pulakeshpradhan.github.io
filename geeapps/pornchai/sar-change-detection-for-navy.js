var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "LinearRing",
          "coordinates": [
            [
              98.88408871400063,
              8.052664569462445
            ],
            [
              98.92863484131996,
              8.052919522505478
            ],
            [
              98.92897816407387,
              8.03107796357346
            ],
            [
              98.88443203675453,
              8.030907985741242
            ],
            [
              98.88408871400063,
              8.052664569462445
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#e4f811",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #e4f811 */ee.Geometry.LinearRing(
        [[98.88408871400063, 8.052664569462445],
         [98.92863484131996, 8.052919522505478],
         [98.92897816407387, 8.03107796357346],
         [98.88443203675453, 8.030907985741242],
         [98.88408871400063, 8.052664569462445]]);
// Load Sentinel-1 C-band SAR GRD collection
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(ee.Filter.eq('instrumentMode', 'IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                    .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
                    .filterMetadata('resolution_meters','equals', 10)
                    .filterBounds(roi)
                    .select('VV');
// LIST of SENTINEL-1 image VV polarise
print('List of SAR pol VV that cover this ROI');
print(collectionVV, 'Collection VV');
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(ee.Filter.eq('instrumentMode', 'IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                    .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
                    .filterMetadata('resolution_meters','equals', 10)
                    .filterBounds(roi)
                    .select('VH');
// LIST of SENTINEL-1 image VH polarise
print('List of SAR pol VH that cover this ROI');
print(collectionVH, 'Collection VH');
// Filter by date for VV *** select T1/T2/T3 HERE!!!
//var img2014VV = collectionVV.filterDate('2014-01-01', '2014-12-31').mosaic();
var img2015VV = collectionVV.filterDate('2015-01-01', '2015-12-31').mosaic();
var img2016VV = collectionVV.filterDate('2016-01-01', '2016-12-31').mosaic();
var img2017VV = collectionVV.filterDate('2017-01-01', '2017-12-31').mosaic();
//var img2018VV = collectionVV.filterDate('2018-01-01', '2018-12-31').mosaic();
//var img2019VV = collectionVV.filterDate('2019-01-01', '2019-12-31').mosaic();
//var img2020VV = collectionVV.filterDate('2020-01-01', '2020-12-31').mosaic();
//var img2021VV = collectionVV.filterDate('2021-01-01', '2021-12-31').mosaic();
//var img2022VV = collectionVV.filterDate('2022-01-01', '2022-12-31').mosaic(); 
// Filter by date for VH *** select T1/T2/T3 HERE!!!
//var img2014VH = collectionVH.filterDate('2014-01-01', '2014-12-31').mosaic();
var img2015VH = collectionVH.filterDate('2015-01-01', '2015-12-31').mosaic();
var img2016VH = collectionVH.filterDate('2016-01-01', '2016-12-31').mosaic();
var img2017VH = collectionVH.filterDate('2017-01-01', '2017-12-31').mosaic();
//var img2018VH = collectionVH.filterDate('2018-01-01', '2018-12-31').mosaic();
//var img2019VH = collectionVH.filterDate('2019-01-01', '2019-12-31').mosaic();
//var img2020VH = collectionVH.filterDate('2020-01-01', '2020-12-31').mosaic();
//var img2021VH = collectionVH.filterDate('2021-05-01', '2021-12-31').mosaic();
//var img2022VH = collectionVH.filterDate('2022-01-01', '2022-12-31').mosaic();
// *** MODIFY HERE !!! for zoom level to cover your roi
Map.centerObject(roi, 13); // <== Map center and Zoom level ***
var lbl_imgT1, lbl_imgT2, lbl_imgT3;
lbl_imgT1 = '2558(2015)';   // <== change label for T1 ***
lbl_imgT2 = '2559(2016)';   // <== change label for T2 ***
lbl_imgT3 = '2560(2017)';   // <== change label for T3 ***
// Display Map
var imgT1_VV, imgT2_VV, imgT3_VV;
var imgT1_VH, imgT2_VH, imgT3_VH;
// *** CHANGE SAR layer VV HERE !!!
// *** MODIFY HERE !!! 
imgT1_VV = img2015VV; // <=== change VV image for T1 ***
imgT2_VV = img2016VV; // <=== change VV image for T2 ***
imgT3_VV = img2017VV; // <=== change VV image for T3 ***
// *** CHANGE SAR layer VH HERE !!!
// *** MODIFY HERE !!! 
imgT1_VH = img2015VH; // <=== change VH image for T1 ***
imgT2_VH = img2016VH; // <=== change VH image for T2 ***
imgT3_VH = img2017VH; // <=== change VH image for T3 ***
// Display Map VV
Map.addLayer(imgT1_VV, {min:-28,max:3}, lbl_imgT1 + ' VV', 0);
Map.addLayer(imgT2_VV, {min:-28,max:3}, lbl_imgT2 + ' VV', 0);
Map.addLayer(imgT3_VV, {min:-28,max:3}, lbl_imgT3 + ' VV', 0);
// Display Map VH
Map.addLayer(imgT1_VH, {min:-28,max:3}, lbl_imgT1 + ' VH', 0);
Map.addLayer(imgT2_VH, {min:-28,max:3}, lbl_imgT2 + ' VH', 0);
Map.addLayer(imgT3_VH, {min:-28,max:3}, lbl_imgT3 + ' VH', 0);
// *** MODIFY HERE !!! Timeseries from 3 different periods
var imgR_VH = imgT3_VH;
var imgG_VH = imgT2_VH;
var imgB_VH = imgT1_VH;
// RGB Composite for RGB
Map.addLayer(imgR_VH.addBands(imgG_VH).addBands(imgB_VH),{min:-28,max:3},lbl_imgT1+'/'+lbl_imgT2+'/'+lbl_imgT3+' RGB',0);
// Apply filter to reduce speckle
var SMOOTHING_RADIUS = 30;
var imgT1_VV_filtered = imgT1_VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var imgT2_VV_filtered = imgT2_VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var imgT3_VV_filtered = imgT3_VV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var imgT1_VH_filtered = imgT1_VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var imgT2_VH_filtered = imgT2_VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var imgT3_VH_filtered = imgT3_VH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
// Display Map for speckle filter images
Map.addLayer(imgT1_VV_filtered, {min:-28,max:3}, lbl_imgT1+' VV Filtered', 0);
Map.addLayer(imgT2_VV_filtered, {min:-28,max:3}, lbl_imgT2+' VV Filtered', 0);
Map.addLayer(imgT3_VV_filtered, {min:-28,max:3}, lbl_imgT3+' VV Filtered', 0);
print ('Histogram for imgT1, imgT2 and imgT3 VV');
print(ui.Chart.image.histogram({image:imgT1_VV, region: roi, scale: 300}));
print(ui.Chart.image.histogram({image:imgT2_VV, region: roi, scale: 300}));
print(ui.Chart.image.histogram({image:imgT3_VV, region: roi, scale: 300}));
Map.addLayer(imgT1_VH_filtered, {min:-28,max:3}, lbl_imgT1+' VH Filtered', 0);
Map.addLayer(imgT2_VH_filtered, {min:-28,max:3}, lbl_imgT2+' VH Filtered', 0);
Map.addLayer(imgT3_VH_filtered, {min:-28,max:3}, lbl_imgT3+' VH Filtered', 0);
print ('Histogram for imgT1, imgT2 and imgT3 VH Filtered');
print(ui.Chart.image.histogram({image:imgT1_VH_filtered, region: roi, scale: 300}));
print(ui.Chart.image.histogram({image:imgT2_VH_filtered, region: roi, scale: 300}));
print(ui.Chart.image.histogram({image:imgT3_VH_filtered, region: roi, scale: 300}));
// *** MODIFY HERE !!! Timeseries from 3 different periods
var imgR_VH_filtered = imgT3_VH_filtered;
var imgG_VH_filtered = imgT2_VH_filtered;
var imgB_VH_filtered = imgT1_VH_filtered;
// RGB Composite for RGB Filtered
Map.addLayer(imgR_VH_filtered.addBands(imgG_VH_filtered).addBands(imgB_VH_filtered),{min:-28,max:3},lbl_imgT1+'/'+lbl_imgT2+'/'+lbl_imgT3+' RGB Filtered',0);
// Calculate the RATIO difference between before (T1-T2) and after (T2-T3)
// VV
var imgRatio_T1T2_VV = imgT1_VV_filtered.subtract(imgT2_VV_filtered);
var imgRatio_T2T3_VV = imgT2_VV_filtered.subtract(imgT3_VV_filtered);
// VH
var imgRatio_T1T2_VH = imgT1_VH_filtered.subtract(imgT2_VH_filtered);
var imgRatio_T2T3_VH = imgT2_VH_filtered.subtract(imgT3_VH_filtered);
// Display the Ratio of images
// VV
//Map.addLayer(imgRatio_T1T2_VV, {min:-13,max:10},lbl_imgT1+'/'+lbl_imgT2+' Ratio VV ',0);
//Map.addLayer(imgRatio_T2T3_VV, {min:-13,max:10},lbl_imgT2+'/'+lbl_imgT3+' Ratio VV ',0);
//print('Histogram for imgRatio_T1T2_VV and imgRatio_T2T3_VV');
//print(ui.Chart.image.histogram({image:imgRatio_T1T2_VV, region: roi, scale: 300}));
//print(ui.Chart.image.histogram({image:imgRatio_T2T3_VV, region: roi, scale: 300}));
// VH
//Map.addLayer(imgRatio_T1T2_VH, {min:-13,max:10},lbl_imgT1+'/'+lbl_imgT2+' Ratio VH ',0);
//Map.addLayer(imgRatio_T2T3_VH, {min:-13,max:10},lbl_imgT2+'/'+lbl_imgT3+' Ratio VH ',0);
//print('Histogram for imgRatio_T1T2_VH and imgRatio_T2T3_VH VH');
//print(ui.Chart.image.histogram({image:imgRatio_T1T2_VH, region: roi, scale: 300}));
//print(ui.Chart.image.histogram({image:imgRatio_T2T3_VH, region: roi, scale: 300}));
// Combine the mean and standard deviation reducers.
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});
// Caculate the mean and standard deviation for each difference imamge
var statsT1T2 = imgRatio_T1T2_VH.reduceRegion({
  reducer: reducers,
  geometry: roi,
  scale: 10,
})
var statsT2T3 = imgRatio_T2T3_VH.reduceRegion({
  reducer: reducers,
  geometry: roi,
  scale: 10,
})
print('stats for DIFF ' + lbl_imgT1 + '-' + lbl_imgT2 + ': ', statsT1T2);
print('stats for DIFF ' + lbl_imgT2 + '-' + lbl_imgT3 + ': ', statsT2T3);
// *** MODIFY HERE !!! Apply Thresholds based on < stdvx1.5 to create a vegetation regrowth mask
var RATIO_UPPER_THRESHOLD_T1T2 = 0.11243035007826058 + 1.5*1.6545429749003449; // <== NEED to check Histogram ***
var RATIO_UPPER_THRESHOLD_T2T3 = 0.07471419784153649 + 1.5*1.7876366358484004; // <== NEED to check Histogram ***
var imgRATIO_T1T2VH_thresholded = imgRatio_T1T2_VH.gt(RATIO_UPPER_THRESHOLD_T1T2);
var imgRATIO_T2T3VH_thresholded = imgRatio_T2T3_VH.gt(RATIO_UPPER_THRESHOLD_T2T3);
// Display Masks
Map.addLayer(imgRATIO_T1T2VH_thresholded.updateMask(imgRATIO_T1T2VH_thresholded),{palette:"FF0000"},'Change Detected: '+lbl_imgT1+'-'+lbl_imgT2, 0);
Map.addLayer(imgRATIO_T2T3VH_thresholded.updateMask(imgRATIO_T2T3VH_thresholded),{palette:"0000FF"},'Change Detected: '+lbl_imgT2+'-'+lbl_imgT3, 0);
// *** try to clip BUT not work !!!
//Map.addLayer(imgRATIO_T1T2VH_thresholded.clip(dnp_roi),{palette:"FF0000"},'เสียพื้นที่ LOSS: '+lbl_imgT1+'-'+lbl_imgT2, 0);
//Map.addLayer(imgRATIO_T2T3VH_thresholded.clip(dnp_roi),{palette:"0000FF"},'เสียพื้นที่ LOSS: '+lbl_imgT2+'-'+lbl_imgT3, 0);
//Compare differences in vegetation loss between T1/T2
var area_lossT1T2 = imgRATIO_T1T2VH_thresholded.reduceRegion({
reducer: ee.Reducer.sum(),
geometry: roi,
scale: 10,
});
print('Total area loss('+lbl_imgT1+'-'+lbl_imgT2+'): ', area_lossT1T2);
//Compare differences in vegetation loss between T2/T3
var area_lossT2T3 = imgRATIO_T2T3VH_thresholded.reduceRegion({
reducer: ee.Reducer.sum(),
geometry: roi,
scale: 10,
});
print('Total area loss('+lbl_imgT2+'-'+lbl_imgT3+'): ', area_lossT2T3);
// Export the image, specifying scale and region.
// T1 to T2
/** EXPORT to Google Drive
Export.image.toDrive({
image: diffT1T2VH_thresholded,
description: lbl_imgT1+'-'+lbl_imgT2+'_mask',
scale: 10,
region: roi,
fileFormat: 'GeoTIFF',
});
// T2 to T3
Export.image.toDrive({
image: diffT2T3VH_thresholded,
description: lbl_imgT2+'-'+lbl_imgT3+'_mask',
scale: 10,
region: roi,
fileFormat: 'GeoTIFF',
});
**/