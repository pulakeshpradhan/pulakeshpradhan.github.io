//======================================================================================================= 
//                                                                                                     \\
//            Script #4 ALTERNATE: ESTIMATING ANNUAL FOREST COVER CHANGE IN WAForDD                    \\
//                                                                                                     \\
//          This Version of Script #4 is UI-based with CSV summary & image download options.           \\
//                                                                                                     \\
//=======================================================================================================
// Date   : 27-SEP-2019
// Authors: Francis Dwomoh    | fkdwomoh@ou.edu
//          Michael Wimberly  | mcwimberly@ou.edu
//          Izaya Numata      | izaya.numata@sdstate.edu
//          Dawn Nekorchuk    | dawn.nekorchuk@ou.edu
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Data Imports & Import Set-up
//
// Data used for all
// Import polygon boundary of selected ecological zones covering area of interest - Ghana forest zone
var studyArea = ee.FeatureCollection("projects/servir-wa/WAForDD/shapefiles/EcologicalZones_select");
// Import forest reserves polygons
var reserves = ee.FeatureCollection("projects/servir-wa/WAForDD/shapefiles/Forest_Land_Use");
//print(reserves);
// Set up global variables for image file list, collections, year selections
var map = ui.Map();
var cccFiles = '';
var cccImageCollection = ee.ImageCollection([]);
var degradedCollection = ee.ImageCollection([]);
var deforestedCollection = ee.ImageCollection([]);
var degradedYear = ee.Image([]);
var deforestedYear = ee.Image([]);
var degradedYearSummary = '';
var deforestedYearSummary = '';
//Due to possibility of missing years, set up reset, so at least nothing will show up as opposed to last known
function resetResults(){
  degradedYear = ee.Image([]);
  deforestedYear = ee.Image([]);
  degradedYearSummary = '';
  deforestedYearSummary = '';
}
//Data import, from different composites, depending on user-selection
function importData(compYear) {
  var mainAssetFolder = 'projects/servir-wa/WAForDD/';//***** User input as desired
  // sub-sub-directory for a particular composite window selected in B) above (either 1, 2 or 3 yr)
  //'Composite_v2/'
  var compositeSubDir = compYear + 'yr_'+ 'Composite_v2'; 
  // Full path to GEE Asset where input Classified Canopy Cover rasters will be imported
  var canopyCoverCompositeAsset = mainAssetFolder + 'CanopyCover_Class/' + compositeSubDir;
  // print(mainAssetFolder);
  // print(compositeSubDir);
  // print(canopyCoverCompositeAsset);
  // Get list of files in classfied canopy cover directory
  // Using list to get at indices for calculating on sequential/consecutive images
  // GLOBAL
  cccFiles = ee.data.getList({id: canopyCoverCompositeAsset});
  //print('cccFiles: ', cccFiles);
  //print(cccFiles.length);
  // // Bring in all images in that list to an ImageCollection
  // // cccImageCollection is GLOBAL
  // var cccImages = cccFiles.map(function(el){
  //   //var elIDs = el.id;
  //   var elImages = ee.Image(el.id);
  //   return elImages;
  // });
  // cccImageCollection = ee.ImageCollection(cccImages);
  // print(cccImageCollection);
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions & Calculations
//
//Function to Generate Annual Forest *Degradation* time series 
function forestDegradation(imageYear1, imageYear2){
  // Create an image which is one where closed forest changed to open forest and zero elsewhere.
  var closedForestBefore = imageYear1.eq(3);             // Pixels that were Closed Forest last year
  var openForestNow = imageYear2.eq(2);                  // Pixels that are Open Forest in the current year
  // Degraded forest: Closed Forest in the previous year becoming Open Forest in the current year
  var degradedForest = openForestNow.eq(1).and(closedForestBefore.eq(1)); // 1 or 0
  // Create time properties for output image 
  var year = ee.Date(imageYear2.get('system:time_start')).format('YYYY');
  var date = ee.Date(imageYear2.get('system:time_start'));
  return degradedForest.rename('degradation')
                       .set('year', year)
                       .set('date', date);
}
// Function to Generate Annual *Deforestation* time series 
function forestDeforestation(imageYear1, imageYear2){
  // Create an image which is one where closed and or open forest changed to non forest and zero elsewhere.
  var nonForestNow = imageYear2.eq(1);                        // Pixels that are Non-Forest in the current year
  var forestBefore = imageYear1.eq(3).or(imageYear1.eq(2));  // Pixels were either closed or open forest in the previous year
  // Deforestation: Closed and or Open Forest in the previous year becoming Non-Forest in the current year
  var deForest = nonForestNow.eq(1).and(forestBefore.eq(1));  // 1 or 0
  // Create time properties for output image 
  var year = ee.Date(imageYear2.get('system:time_start')).format('YYYY');
  var date = ee.Date(imageYear2.get('system:time_start'));
  return deForest.rename('deforestation')
                 .set('year', year)
                 .set('date', date );
}
function calcForestStats() {
  // degradedCollection & deforestedCollection are GLOBAL
  //reset collections so don't add new files to old
  degradedCollection = ee.ImageCollection([]);
  deforestedCollection = ee.ImageCollection([]);
  //For loop copied from original script
for (var imagenum = 0; imagenum < cccFiles.length-1; imagenum++) {
    var imageid1 = cccFiles[imagenum].id;
    var image1 = ee.Image(imageid1);
    var imageid2 = cccFiles[imagenum+1].id;
    var image2 = ee.Image(imageid2);
    var degraded = forestDegradation(image1, image2);
    degradedCollection = degradedCollection.merge(degraded);
    var deforested = forestDeforestation(image1, image2);
    deforestedCollection = deforestedCollection.merge(deforested);
}
print('Degraded Input Data:', degradedCollection);
print('Deforested Input Data:', deforestedCollection);
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Year Display
//
function displayYear(year){
  //reset map
  map.clear();
  drawBaseMap();
  //reset results to prevent accidental carry-over if missing years
  resetResults();
  print("Year: ", year);
  //Must be string to match metadata field
  var stringYear = String(year);
  //print(stringYear);
  //pull selected image using filter and then first to grab the first/only image
  degradedYear = degradedCollection.filterMetadata('year', 'equals', stringYear)
                                           .first();
  print('Image for Year, Degraded:', degradedYear);
  deforestedYear = deforestedCollection.filterMetadata('year', 'equals', stringYear)
                                             .first();
  print('Image for year, Deforested:', deforestedYear);
  map.addLayer(degradedYear.updateMask(degradedYear), {palette: 'orange'},'Forest Degradation (orange)');
  map.addLayer(deforestedYear.updateMask(deforestedYear), {palette: 'red'},'Deforestation (red)');
  //add Legend
  var legendData = {
  'Forest Degradation': 'orange',
  'Deforestation': 'red',
  'Reserves': 'black',
  };
  var legend = makeLegend(legendData);
  map.add(legend);
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Calculate Zonal Summaries and Export
//
function calcSummaryAndExports(){
  /*ee.Image.pixelArea() method generates an image in which the value of each pixel is the pixel's area in square meters.
  Multiplying the forest degradation image with this area image and then summing over the result gives us a measure of area*/
  var degradedYearArea = degradedYear.multiply(ee.Image.pixelArea());
  //print(degradedYearArea);
  var deforestedYearArea = deforestedYear.multiply(ee.Image.pixelArea());
  //print(deforestedYearArea);
  function summarizeRegions(img, label){
    var output = img.reduceRegions({
      collection: reserves,
      reducer: ee.Reducer.sum().setOutputs([String(label + '_m2')]),
      //from original script
      scale: 30
    // convert from meters to meters squared
    }).map(function(feature){
    var num = ee.Number.parse(feature.get(String(label + '_m2')));
    return feature.set(String(label + '_km2'), num.divide(1000000));
    });
    return(output);
  }
  //Do the summaries
  degradedYearSummary = summarizeRegions(degradedYearArea, 'degraded');
  deforestedYearSummary = summarizeRegions(deforestedYearArea, 'deforested');
  print('Forest Reserves, Degraded Summary:', degradedYearSummary);
  print('Forest Reserves, Deforested Summary:', deforestedYearSummary);
  // Need to click "RUN in the Tasks tab to configure and start each export
  var degradedFileName = "Export_Degraded_" 
                        + String(config.compositeWindow) + 'yr_' 
                        + String(config.studyYear);
  Export.table.toDrive({
     collection: degradedYearSummary, 
     description: degradedFileName,
     selectors: ['zone', 'RESERVE_NA', 'Region', 'TOWN', 'Remarks', 'Area_km2', 'degraded_km2']
  });
  var deforestedFileName = "Export_Deforested_" 
                        + String(config.compositeWindow) + 'yr_' 
                        + String(config.studyYear);
  Export.table.toDrive({
     collection: deforestedYearSummary, 
     description: deforestedFileName,
     selectors: ['zone', 'RESERVE_NA', 'Region', 'TOWN', 'Remarks', 'Area_km2', 'deforested_km2']
  });
  //Also export images. Settings copied over from original script. 
  Export.image.toDrive({
    image: degradedYear.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: degradedFileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
  Export.image.toDrive({
    image: deforestedYear.unmask(-9999),   // Use unmask function to maintain NA values when exporting to Google Drive, otherwise NAs may become zeros
    description: deforestedFileName,      // file name of exported image
    scale: 30,                                  // pixel size
    region: studyArea,                          // aoi of image area to export
    maxPixels: 1e13                             // allows computation to succeed by avoiding 'Error: Too many pixels in the region'
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////
//
// UI
//
var config = {
  compositeWindowStart: 1,
  compositeWindowEnd: 3,
  initialCalcButtonText: 'Click to Calculate From Composites',
  studyYearsStart: 2001,
  studyYearsEnd: 2019,
  initialDownloadButtonText: 'Click to Summarize & Download CSV &/ Images',
  // the following get set by user
  compositeCalcFlag: false, //has composite calculations been done? 
  compositeWindow: 1, //default
  studyYear: 2018, //default
  }; 
function makeSidePanel(title, description) {
  title = ui.Label({
    value: title,
    style: {
      fontSize: '18px',
      fontWeight: '100',
      padding: '10px',
    }
  });
  description = ui.Label({
    value: description,
    style: {
      color: 'gray',
      padding: '10px',
    }
  });
  return ui.Panel({
    widgets: [title, description],
    style: {
      height: '100%',
      width: '35%',
    },
  });
}
function initializeWidgets() {
  var panel = ui.Panel();
  panel.add(ui.Label('Select composite window (years, 1 - 3):'));
  var sliderComposite = ui.Slider({
    min: config.compositeWindowStart,
    max: config.compositeWindowEnd,
    step: 1,
    style: {stretch: 'horizontal', width:'200px' },
    value: config.compositeWindow, //default value
    onChange: function(value) {
      print('Composite window: ', value);
      //set config
      config.compositeWindow = value;
      //print(config.compositeWindow);
      //reset Calc button label
      buttonCalc.setLabel(config.initialCalcButtonText);
      //reset download label
      buttonDownload.setLabel(config.initialDownloadButtonText);
      //hide year slider and download until recalc
      sliderStudy.style().set('shown', false);
      buttonDownload.style().set('shown', false);
    },
  });
  panel.add(sliderComposite);
  var buttonCalc = ui.Button({
    label: config.initialCalcButtonText,
    onClick: function(button) {
      button.setLabel("(Current)");
      //import the data (sliderComposite.value needed)
      print('Importing Data & Calculating...');
      importData(config.compositeWindow);
      //Do the calculations
      calcForestStats();
      //Display default year
      displayYear(config.studyYear);
      //Show the year slider and download button
      sliderStudy.style().set('shown', true);
      buttonDownload.style().set('shown', true);
    },
  });
  panel.add(buttonCalc);
  panel.add(ui.Label('After calculations, can view any year:'));
  panel.add(ui.Label('Select study year (2001 - 2019):'));
  var sliderStudy = ui.Slider({
    min: config.studyYearsStart,
    max: config.studyYearsEnd,
    step: 1,
    style: {stretch: 'horizontal', 
            width:'400px'},
    value: config.studyYear, //default
    onChange: function(value) {
      //set year & show on map
      config.studyYear = value;
      displayYear(config.studyYear);
      //reset download label
      buttonDownload.setLabel(config.initialDownloadButtonText);
    },
  });
  panel.add(sliderStudy);
  //but actually hide it at the beginning until calculations are done
  sliderStudy.style().set('shown', false);
  panel.add(ui.Label('Year displayed will be summarized by forest reserve and available as CSV:'));
  var buttonDownload = ui.Button({
    label: config.initialDownloadButtonText,
    onClick: function(button) {
      config.buttonLabel = 'See Tasks Panel to Download';
      button.setLabel(config.buttonLabel);
      print('Summarizing...');
      //calc summary and download options
      calcSummaryAndExports();
    },
  });
  panel.add(buttonDownload);
  //but actually hide it at the beginning until calculations are done
  buttonDownload.style().set('shown', false);
  return panel;
}
function drawBaseMap(){
  //Display the outline of reserves as a black line, no fill
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
    featureCollection: reserves,
    color: 1,
    width: 1
  });
  map.addLayer(outline, {palette: '000000'}, 'Forest_Land_Use');
}
//legend functions 
//borrowed heavily from Sufy's demo: sufy@google.com
function makeLegendEntry(color, label) {
  label = ui.Label(label, {
    margin: 'auto 0',
    fontWeight: '100',
    color: '#555'
  });
  return makeRow([makeColorBox(color), label]);
}
function makeColorBox(color) {
  return ui.Label('', {
    backgroundColor: color,  
    padding: '8px',
    margin: '5px',
    border: '1px solid gray',
  });
}
function makeRow(widgets){
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      padding: '0px 5px',
    }
  });
}
function makeLegend(data) {
  // Start with a ui.Panel:
  var legend = ui.Panel({
    style: {
      width: '175px',
      position: 'bottom-right',
      border: '1px solid lightgray',
    }
  });
  // // Add a title to the legend:
  // legend.add(ui.Label("Legend", {
  //   fontWeight: '100',
  //   color: 'gray',
  // }));
  Object.keys(data).map(function(label){
    legend.add(makeLegendEntry(data[label], label));
  });
  return legend;
} 
function init() {
  //Default map
  map.setCenter(-2.52685546875, 6.593673875998476, 10);
  drawBaseMap();
  var sidePanel = makeSidePanel(
    'ESTIMATING ANNUAL FOREST COVER CHANGE IN WAForDD',
    'This script generates annual estimates in forest degradation (and deforestation).'
  );
  var descriptionText = 
  'The input data are images of annual forest canopy cover classes that have already been generated in previous steps. ' +
  'This input classified canopy cover maps were obtained from continuous canopy cover maps generated through Random Forest modeling and ' +
  'smoothed with the LandTrendr temporal segmentation algorithm. The objective here is to generate annual forest degradation estimates.';
  sidePanel.add(ui.Label({value: descriptionText,
                          style: {padding: '10px'}}));
  var note1Text = 
  'This script is the fourth in the set of scripts in the WAForDD system to generate forest degradation products. ' +
  'Before running this script: Make sure that the annual time series classified canopy cover dataset have already been generated and save in the appropriate GEE asset. ';
  sidePanel.add(ui.Label({value: note1Text,
                          style: {padding: '10px'}}));
  var widgetPanel = initializeWidgets();
  sidePanel.add(widgetPanel);
  var note2Text = 
  'Note: The following thresholds, from FC REDD+ secretariat, were used to classify the continuous canopy cover in three canopy cover classes: ' +
  '1) Class 1: Non-Forest (canopy cover values less or equal to 20%) ' +
  '2) Class 2: Open-Forest (canopy cover values > 20% to 60%) ' +
  '3) Class 3: Closed-Forest (canopy cover values > 60%) ' +
  'Based on the classes above, here forest degradation is interpreted as a change from a closed canopy class ' +
  'to an open canopy class on annual basis. ' +
  'NB: If different threshold values are required the user has to adjust these values in the LandTrendr script before running this script. ';
  sidePanel.add(ui.Label({value: note2Text, 
                          style: {color: 'gray',
                                  padding: '10px'}}));
  var splitPanel = ui.SplitPanel({
    firstPanel: sidePanel,
    secondPanel: map,
  });
  ui.root.clear();
  ui.root.add(splitPanel);
  //print explanation message to Console
  print('Details here will be added on change of composite window or year.')
}
init();