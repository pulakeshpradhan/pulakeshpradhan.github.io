//===============================================================================================
//                                                                                              \\
//            Script #4: LANDTRENDR TEMPORAL SEGMENTATION (Adopted from                          \\
//            WAForDD 2.2 for the Wof Washa Project)                                              \\
//                                                                                                 \\ 
//==================================================================================================
// Original script:
// Date   : 01-SEP-2021
// Authors: Francis Dwomoh    | fkdwomoh@ou.edu
//          Michael Wimberly  | mcwimberly@ou.edu
//          Izaya Numata      | izaya.numata@sdstate.edu
// Updated: 01-SEP-2019
/***************************************************************************************************
This script applies the LandTrendR algorithm (Kennedy et al., 2010) to fit a temporally segmented piecewise
regression model for each pixel of an annual time series percent canopy cover (CC) dataset.
The objective here is to apply LandTrendr (LT) to smooth Random Forest predicted canopy cover time series 
to minimize year-to-year noise and fill data gaps.
This script is the third of three steps in the WAForDD system to generate forest degradation products.
Before running this script: Make sure that the annual time series canopy cover percent dataset have already 
been generated and save in the appropriate GEE asset.
The LandTrendr fitted canopy cover product from this step will be input to the next step involing 
classification of continuous canopy values into canopy cover classes to estimate annual forest degradation. 
After running this script the Task Manager (in the right-hand side panel) will be highlighted yellow,
prompting you to click the RUN button to export the LT-fitted canopy cover image  
The output canopy cover products are saved as GEE assets or can be exported to Google Drive. 
***************************************************************************************************/ 
//======================================================================================================= 
//---- INPUTS TO SET BY USER
//======================================================================================================= 
// USER ONLY NEEDS TO MODIFY SECTIONS A) TO C) BELOW AS NEEDED -----
// ---- A) Determine the current/study year for which LandTrendr-fitted CC to be exported  ******
// User input of the year to be summarized and exported, from 2000 to the present year
var yearC = 2020;       
// Initial year and final year in the time series - this should remain set to 2001
var year_init = 1984;
var year_final = 2022;
// ---- B) Set up paths to GEE assets
// Path to ImageCollection where LandTrendR output will be saved
var lt_Asset = 'projects/eth-weforest/assets/Canopy_LT_WofWasha_w_Buffer/';
// Name of the LandTrendR output image to be saved
var outfile_name ='CanopyCover_LT_' + yearC; 
// If desired, destination folder in your Google Drive (GD) where LT-fitted out images will be exported
// If exporting image to GD, create a folder in your GD then paste folder name in space provided below
var myGoogleDrive_Folder = 'WAForDD_downloads'; //***** User input as desired
//======================================================================================================= 
//---- READ IN DATA AND DEFINE THE STUDY AREA
//======================================================================================================= 
// Predicted canopy cover from Random Forests
var ann_cc1yr = ee.ImageCollection("projects/eth-weforest/assets/Canopy_WofWasha_w_Buffer");
// Validation points (Canopy Cover)
var val_pts = ee.FeatureCollection("projects/eth-weforest/assets/validation_data");//2771 pts
print(ann_cc1yr, "Predicted Canopy Cover from Random Forests");
print(val_pts, "Validation Points");
// Convert ImageCollection of Canopy Cover to a list object
//var ann_cc1yr_list = ann_cc1yr.toList(ann_cc1yr.size());
// Import polygon boundary of selected ecological zones covering area of interest - Ghana forest zone
var studyArea = ee.FeatureCollection("projects/eth-weforest/assets/WofWasha_incl_buffer");
// Center and Zoom
Map.centerObject(studyArea, 12); 
//=======================================================================================================//
// -----    Step 1: Define LandTrendr Parameters   -----
//=======================================================================================================//
print("Step 1: Define LandTrendr Parameters");
// --- Set base parameters for the analysis - start and end years/dates -----//
  // Define starting and ending years of the times series
var startyear = year_init;
var endyear = year_final;
var distDir = -1; // define the sign of spectral delta for vegetation loss for the segmentation index - 
                  // Canopy Cover delta is negative for vegetation loss
// --- Define the LandTrendr run parameters
// For details to these parameters, reference: Kennedy, R. E., Yang, Z., & Cohen, W. B. (2010). Detecting trends in forest disturbance and recovery 
// using yearly Landsat time series: 1.LandTrendr—Temporal segmentation algorithms. Remote Sensing of Environment, 114(12), 2897-2910.
var run_params = { 
  maxSegments:            5,          // Maximum number of segments to be fitted on the time series
  spikeThreshold:         0.5,        // Threshold for dampening the spikes. i.e This parameter will remove noise. Value of 1.0 (or 100 for % values) means no dampening
  vertexCountOvershoot:   2,          // The inital model can overshoot the maxSegments + 1 vertices by this amount. Later, it will be prunned down to maxSegments + 1
  preventOneYearRecovery: false,       // Prevent segments that represent one year recoveries (Boolean: true of false)
  recoveryThreshold:      1,         // If a segment has a recovery rate faster than 1/recoveryThreshold (in years), then the segment is disallowed
  pvalThreshold:          0.10,       // If the p-value of the fitted model exceeds this threshold, then the current model is discarded and another one is fitted using the Levenberg-Marquardt optimizer
  bestModelProportion:    0.50,       // Takes the model with most vertices that has a p-value that is at most this proportion away from the model with lowest p-value
  minObservationsNeeded:  6           // Min observations needed to perform output fitting
};
//=======================================================================================================//
// -----    Step 2: Run the LandTrendr algorithm   -----
//=======================================================================================================//
print("Step 2: Run LandTrendr");
// The next section implements LandTrendr processing of continuous canopy cover
// Adapted from the example code provided by Yang/Braaten/Kennedy
// --- Create a temporary collection with cc values
// Build the image collection based on the cc values (cc is termed classification in the image properties)
var ltCollection1yr_tmp = ann_cc1yr.select(['classification']);
// Need to then create a new version of the segmentation index
// Multiply by -1 so that larger values indicate more disturbance
var indexNameFTV = 'CC_FTV' ;                                                     // create a name for the to-be-fitted band - get the name of the segmentation index and append "_FTV"
var ltAddband = function(img) {                                                   // start anonymous function to add the band
  return img.addBands(img.select([0],[indexNameFTV])                              // duplicate the segmentation index as a second band using the name that was just created
                         .multiply(distDir))                                      // ...flip the values around so that it is back to its original orientation
                         .set('system:time_start', img.get('system:time_start')); // ...set the output system:time_start metadata to the input image time_start otherwise it is null                                 
};
var ltCollection1yr = ltCollection1yr_tmp.map(ltAddband);
run_params.timeSeries = ltCollection1yr;                                 // add LT collection to the segmentation run parameter object - 1 yr composite
var lt1yr = ee.Algorithms.TemporalSegmentation.LandTrendr(run_params);   // run LandTrendr spectral temporal segmentation algorithm - 1 yr composite
print('LandTrendr Results', lt1yr);
// ----- FUNCTION TO EXTRACT VERTICES FROM LT RESULTS AND STACK BANDS -----
var getLTvertStack = function(LTresult) {
  var emptyArray = [];                              // make empty array to hold another array whose length will vary depending on maxSegments parameter    
  var vertLabels = [];                              // make empty array to hold band names whose length will vary depending on maxSegments parameter 
  var iString;                                      // initialize variable to hold vertex number
  for(var i=1;i<=run_params.maxSegments+1;i++){     // loop through the maximum number of vertices in segmentation and fill empty arrays
    iString = i.toString();                         // define vertex number as string 
    vertLabels.push("vert_"+iString);               // make a band name for given vertex
    emptyArray.push(0);                             // fill in emptyArray
  }
  var zeros = ee.Image(ee.Array([emptyArray,        // make an image to fill holes in result 'LandTrendr' array where vertices found is not equal to maxSegments parameter plus 1
                                 emptyArray,
                                 emptyArray]));
  var lbls = [['yrs_','src_','fit_'], vertLabels,]; // labels for 2 dimensions of the array that will be cast to each other in the final step of creating the vertice output 
  var vmask = LTresult.arraySlice(0,3,4);           // slices out the 4th row of a 4 row x N col (N = number of years in annual stack) matrix, which identifies vertices - contains only 0s and 1s, where 1 is a vertex (referring to spectral-temporal segmentation) year and 0 is not
  var ltVertStack = LTresult.arrayMask(vmask)       // uses the sliced out isVert row as a mask to only include vertice in this data - after this a pixel will only contain as many "bands" are there are vertices for that pixel - min of 2 to max of 7. 
                      .arraySlice(0, 0, 3)          // ...from the vertOnly data subset slice out the vert year row, raw spectral row, and fitted spectral row
                      .addBands(zeros)              // ...adds the 3 row x 7 col 'zeros' matrix as a band to the vertOnly array - this is an intermediate step to the goal of filling in the vertOnly data so that there are 7 vertice slots represented in the data - right now there is a mix of lengths from 2 to 7
                      .toArray(1)                   // ...concatenates the 3 row x 7 col 'zeros' matrix band to the vertOnly data so that there are at least 7 vertice slots represented - in most cases there are now > 7 slots filled but those will be truncated in the next step
                      .arraySlice(1, 0, run_params.maxSegments+1) // ...before this line runs the array has 3 rows and between 9 and 14 cols depending on how many vertices were found during segmentation for a given pixel. this step truncates the cols at 7 (the max verts allowed) so we are left with a 3 row X 7 col array
                      .arrayFlatten(lbls, '');      // ...this takes the 2-d array and makes it 1-d by stacking the unique sets of rows and cols into bands. there will be 7 bands (vertices) for vertYear, followed by 7 bands (vertices) for rawVert, followed by 7 bands (vertices) for fittedVert, according to the 'lbls' list
  return ltVertStack;                               // return the stack
};
var ltVertStack1yr = getLTvertStack(lt1yr.select(["LandTrendr"])); // select out the "LandTrendr" band
// extract the segmentation-fitted index stack 
var years = [];                                                           // make an empty array to hold year band names
for (var i = startyear; i <= endyear; ++i) years.push('yr'+i.toString()); // fill the array with years from the startYear to the endYear and convert them to string
var ltFitStack1yr = lt1yr.select([1])                                     // select out the 2nd band data which is the segmentation-fitted spectral index 
                   .arrayFlatten([years]);                                // ...flatten is out into band, assigning the year as the band name
// The previous code provides the LandTrendr fitted CC images as a multi-band image (one band for each year)
// The following code converts the image into a collection (one image for each year)
var bnames = ltFitStack1yr.bandNames();                                      // Get a list of the band names
// The following function extracts each image band from the multiband image and returns it as a single-band image
// Also multiply distDir again to return the index to its original positive values
function extract_band1yr(curband) {                              
  var curimage =  ltFitStack1yr.select([curband])
                            .rename('cc_fit')
                            .multiply(distDir);
  var curyearstr = ee.String(curband).slice(-4);
  var curyear = ee.Number.parse(curyearstr);
  return curimage.set('date', ee.Date.fromYMD(curyear, 1, 1))
                 .set('system:time_start', ee.Date.fromYMD(curyear, 1, 1).millis());
}
// Use the function to create the image collection
var ltFitCollection1yr = ee.ImageCollection(bnames.map(extract_band1yr));
print('Fitted LandTrendr Canopy Cover', ltFitCollection1yr);
//=======================================================================================================//
// -----    Step 3: Graphical User Interface   -----
//=======================================================================================================//
print("Step 3: Graphical User Interface");
// This section creates maps and a GUI to display the results
// Color ramp for mapping percent canopy cover
var cc_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#edf8e9" quantity="15" label="0-15"/>' +
      '<ColorMapEntry color="#c7e9c0" quantity="30" label="15-30" />' +
      '<ColorMapEntry color="#a1d99b" quantity="45" label="30-45" />' +
      '<ColorMapEntry color="#74c476" quantity="60" label="45-60" />' +
      '<ColorMapEntry color="#31a354" quantity="75" label="60-75" />' +
      '<ColorMapEntry color="#006d2c" quantity="100" label="75-100" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Add layers to the map
Map.addLayer(ltFitStack1yr.select(['yr1984']).multiply(-1).sldStyle(cc_intervals), {}, '1984 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr1990']).multiply(-1).sldStyle(cc_intervals), {}, '1990 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr1995']).multiply(-1).sldStyle(cc_intervals), {}, '1995 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2000']).multiply(-1).sldStyle(cc_intervals), {}, '2000 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2002']).multiply(-1).sldStyle(cc_intervals), {}, '2002 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2005']).multiply(-1).sldStyle(cc_intervals), {}, '2005 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2010']).multiply(-1).sldStyle(cc_intervals), {}, '2010 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2015']).multiply(-1).sldStyle(cc_intervals), {}, '2015 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2016']).multiply(-1).sldStyle(cc_intervals), {}, '2016 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2017']).multiply(-1).sldStyle(cc_intervals), {}, '2017 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2018']).multiply(-1).sldStyle(cc_intervals), {}, '2018 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2019']).multiply(-1).sldStyle(cc_intervals), {}, '2019 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2020']).multiply(-1).sldStyle(cc_intervals), {}, '2020 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2021']).multiply(-1).sldStyle(cc_intervals), {}, '2021 (1 yr)', false);
Map.addLayer(ltFitStack1yr.select(['yr2022']).multiply(-1).sldStyle(cc_intervals), {}, '2022 (1 yr)', false);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '500px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Canopy Cover Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.'),
  ui.Label('Wof Washa Forest Reserve is demarked by inner grey boundary '+
  'and the outer line demarks the Buffer Area.'),
  ui.Label('Pick a canopy cover map under the right hand menu ´Layers` for display.'),
  ui.Label('Only a subset of canopy cover maps are included '+
  'but the resulting graph when a point is clicked includes the full range of years included in the study'),
  ui.Label('This interactive map was created by OpenForests for WeForest. The script for the analysis and app was adopted in parts or in whole, from the scripts developed by '+
  'Wimberly et al. 2022'),
  ui.Label('https://doi.org/10.1080/17538947.2021.2012533')
  ]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  // The number here must be equal to the number of map layers that are being displayed
  // The 16 map layers in the legend are numbered 0-15. This layer (number 16) is for the dot that is displayed when you click
  Map.layers().set(15, dot);
  // Create an chart of annual summaries of cc 1 yr
  var cc1yrChart = ui.Chart.image.series(ann_cc1yr.select(['classification']), point, ee.Reducer.mean(), 30, 'date' )
    .setSeriesNames(['CC (1-year)'])
    .setOptions({
      title: 'Canopy Cover (1-year composite)',
      lineWidth: 1,
      pointSize: 3,
      colors: ['#e7298a'],
      vAxis: {
        title: 'Index Value',
        minValue: 0,
        maxValue: 100,
      }
  });
  panel.widgets().set(2, cc1yrChart);
  // Create a chart of the fitted LandTrendr values
  var cc1yrfChart = ui.Chart.image.series(ltFitCollection1yr.select(['cc_fit']), point, ee.Reducer.mean(), 30, 'date' )
    .setSeriesNames(['CC (1-year)'])
    .setOptions({
      title: 'LandTrendr Fitted Canopy Cover (1-year composite)',
      lineWidth: 1,
      pointSize: 3,
      colors: ['#e7298a'],
      vAxis: {
        title: 'Index Value',
        minValue: 0,
        maxValue: 100,
      }
  });
  panel.widgets().set(3, cc1yrfChart);
});
// Set the cursor
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//=======================================================================================================//
//----- Step 4: Subset LT-fitted Image For Study Year -----
//=======================================================================================================//
print("Step 4: Subset LT-fitted Image");
// Convert the LandTrendr-processed image collection to a list
var outimage_list = ltFitCollection1yr.toList(ltFitCollection1yr.size());
//--- Subset image for a study year to export ---
  // Make a list of years based on our study period. NB: Study year cannot be outside range of study period
//var year_list = ee.List.sequence(startyear, endyear, 1);
// Function to generate index for the study year  
var year_index = function(curyear) {
  if (curyear < startyear || curyear > endyear ) {
  print("Invalid Study Year! Study year range "+ startyear + ' to '+ endyear);
  }
  // Convert year list to year index
  var curyear_index = ee.Number(curyear).subtract(startyear);
  return curyear_index;
};
// Use function above to get index of study year
var index_studyYear = year_index(yearC);
// Extract the image from the image list
var out_image = ee.Image(outimage_list.get(index_studyYear)).set('year', yearC)
                                                            .set('date', yearC +'-01-01')
                                                            .set('system:time_start', ee.Date.fromYMD(yearC, 1,1).millis());           
// Subset an image for the index year selected above
// var out_image = ee.Image(outimage_stack1yr.select([index_studyYear]));
//var out_image = ee.Image(outimage_stack.select([index_studyYear])
//                .rename(['cc_fit'])
//                .set('year', yearC)                                 // Set time/date properties to image
//                .set('date', yearC +'-01-01')
//                .set('system:time_start', ee.Date.fromYMD(yearC, 1,1).millis()));
print('Subset CC image to export: ' + yearC, out_image);
//=======================================================================================================//
//----- Step 6:  Overlay validation points on LT Canopy Cover for accuracy assessment -----
//=======================================================================================================//
print("Step 6: Overlay validation points on LT Canopy Cover");
var sumyear = [2005, 2007, 2012, 2013, 2016, 2018, 2020];
function overlay_pts2(inyear) {
  var baseyr = inyear; // Year of base image to import for RF training 
  var base_img = ee.Image(outimage_list.get(baseyr - year_init)); //Rename bands to original indices names
  // --- Sample Imagery at Training Points to Create Training datasets -----//
  //-----******************************************************************-----//
  // From the entire training dataset, subset training points corresponding to the respective base image year
  var pts = val_pts.filter(ee.Filter.eq('Year', baseyr));
  //--- Overlay training points on corresponding composite image to create FeatureCollection training data for that year
  // Note that the reference CC readings are stored in the 'CnpyCvr' (or CanopyCover) property.
  var validation = base_img.sampleRegions({
                collection: pts,
                properties: ['Canopy_Cover'], //field containing canopy cover readings 
                scale: 30,
                geometries: false, // omit geometries to save memory and avoid GEE timing out
                tileScale : 1  //parameter to reduce the chances of running into memory problems 
  });
  return validation;
}
var validation_df = ee.FeatureCollection(sumyear.map(overlay_pts2)).flatten();
print("Validation Export Table", validation_df);
Export.table.toDrive({
  collection: validation_df, 
  description: "Validation_CanCov_LT"
});
var roi = ee.FeatureCollection('projects/eth-weforest/assets/WofWasha_5k_buffer');
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: roi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'grey'}, 'Regions of Interest');
//=======================================================================================================//
//----- Step 7: Exporting data to GGE Asset (or to Google Drive)-----
//=======================================================================================================//
print("Step 7: Export Canopy Cover (CC) Images");
// Exporting data to GEE Asset
var exportImg = true;
print(exportImg, "exportImg");
var exportImgtoDrive = false;
print(exportImgtoDrive, "exportImgtoDrive");
if(exportImg){
      // 
      Export.image.toAsset({
        image: out_image,                       // image to export
        description: outfile_name,              // file name of exported image
        scale: 30,                              // pixel size
        assetId: lt_Asset + outfile_name,       // export image to this path in GEE asset
        region: studyArea,                      // aoi of image area to export
        maxPixels: 1e13                         // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
      });
} 
print("Done");
//////////////////////////
// --If you are exporting data to Google drive--
  //////////////
// Exporting continuous canopy image 
if(exportImgtoDrive){
      // 
      Export.image.toDrive({
        image: out_image.unmask(-9999),             // Use unmask function to maintain NA values when exporting to Google Drive
        description: outfile_name,                  // file name of exported image
        scale: 30,                                  // pixel size
        folder: myGoogleDrive_Folder,               // Destination folder in your Google Drive
        region: studyArea,                          // aoi of image area to export
        maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
      });
} else {}
////////////////////////// END OF SCRIPT //////////////////////////
////////////////////////////////////////////////////////////