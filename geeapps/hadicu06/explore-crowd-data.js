////////////////////////////////////////////////////////////////////////////////
/*
// Todo:
- Add max sum weight (all users) - DONE
- Show on map number of points total (for 2018), and by class (for 2018) - DONE
- Add Landsat
- Put a link to google slide showing no effect of filtering methods on accuracy with change in proportion of training data
- Add outliers
- Add ability to draw polygon and save, to report area where crowd data are erroneous - DONE
*/
////////////////////////////////////////////////////////////////////////////////
// Data
// Just 2018? Yes, determines quality of yearly map
// Test if can display many points
// var allSamp2018 = ee.FeatureCollection("users/hadicu06/IIASA/trainingSamples/crowdsourced/covariates_natPP_allSmp_2018_100m_842e5b6440c5fed5e1634bc140a80cfd")
var allSamp_weightExpert = ee.FeatureCollection("users/hadicu06/IIASA/crowdsourcing/weightedMajManyMethods_keepAllAns_noMinVals_addCols_20200331_forGEE")
var allSamp_weightOrdinary = ee.FeatureCollection("users/hadicu06/IIASA/crowdsourcing/weightedMajManyMethods_keepAllAns_noMinVals_vsOtherUsersConsensus_addCols_20200331_forGEE")
//print("allSamp_weightExpert.aggregate_stats('weightedMaj')", allSamp_weightExpert.aggregate_stats('weightedMaj'))
//print("allSamp_weightOrdinary.aggregate_stats('weightedMaj')", allSamp_weightOrdinary.aggregate_stats('weightedMaj'))
//print('allSamp.size()', allSamp.size())
//print('allSamp.first()', allSamp.first());
/*
var allSampWeightedMean80 = allSamp.filter(ee.Filter.gte('weightedMaj', 0.8))
                            .distinct('imageName');
print('allSampWeightedMean80.size()', allSampWeightedMean80.size())
*/
/*
Map.setOptions('SATELLITE')
Map.addLayer(ee.Image().byte().paint(allSamp, null, 0.2), null, 'all')
//Map.addLayer(allSamp, {palette:'red'}, 'feature collection')
Map.addLayer(ee.Image().byte().paint(allSampWeightedMean80, null, 0.2), null, 'weighted mean >= 0.8')
*/
//////////////////////////////////////////////////////////////////////////
// Landsat composite
// var nationalComposite_2018 = ee.Image("users/linabun08/IIASA/composite/L87_2018_filledWith2017_median_mosaic_c0498f9a04c89ef69912e4463768d361")
//       .rename(['landsat_blue',  'landsat_green', 'landsat_red', 'landsat_nir', 'landsat_swir1', 'landsat_swir2']); 
var landsat_2018_0 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_0")
var landsat_2018_1 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_1")
var landsat_2018_2 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_2")
var landsat_2018_3 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_3")
var landsat_2018_4 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_4")
var landsat_2018_5 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_5")
var landsat_2018_6 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/L87_2018_composite_indices_30m_manyReducers_topoCor_brdfCor_a5fb7f15aab66c7018c8824e6566d81b_6")
var landsat_2018_mosaic = ee.ImageCollection.fromImages(
  [landsat_2018_0, landsat_2018_1, landsat_2018_2, landsat_2018_3, landsat_2018_4, landsat_2018_5, landsat_2018_6]
  ).mosaic()
   .select(landsat_2018_0.bandNames().removeAll(['red_count']))
var nationalComposite_2018 = landsat_2018_mosaic;
////////////////////////////////////////////////
// Sentinel-1: two season composite
var S1_season_0 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_0")
var S1_season_1 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_1")
var S1_season_2 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_2")
var S1_season_3 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_3")
var S1_season_4 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_4")
var S1_season_5 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_5")
var S1_season_6 = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_84ca8b8a222d2dde6ae67a5802b7d680_6")
var S1_season_missing = ee.Image("users/hadicu06/IIASA/composite/newBiggerAsset/S1_2018_landsatGrid_VVVH_sep_twoSeasons_extraProc_meanMedian_missing")
var S1_season_mosaic = ee.ImageCollection.fromImages(
  [S1_season_0, S1_season_1, S1_season_2, S1_season_3, S1_season_4, S1_season_5, S1_season_6, S1_season_missing]
  ).mosaic()
S1_season_mosaic = S1_season_mosaic.addBands(
  S1_season_mosaic.select('VV_median_dry').divide(S1_season_mosaic.select('VH_median_dry')).rename('VV_div_VH_median_dry'))
// print('img_mosaic', img_mosaic)
////////////////////////////////////////////////////////////////////////////////
// UI widgets
/*
filter(isMaxMeanWeightAnsAll == 1, userAnswer_major == "Yes")
filter(isMaxMeanWeightAnsTop8 == 1, userAnswer_major == "Yes")
filter(isMaxSumWeightAnsTop8 == 1, userAnswer_major == "Yes")
filter(manyUserAnswer_major == "Yes", manyUserAnswer_major_perc >= 80)
filter(manyUserAnswer_major == "Yes",
         isMaxMeanWeightAnsAll == 1, userAnswer_major == "Yes")
*/
var params = {
  pointColor: '#ffeda0',
  /*
  pointColorUndisturbedForest: ,
  pointColorLoggedOverForest,
  pointColorOilPalmMonoculture,
  pointColorTreeBasedNotOilPalm,
  pointColorShrub,
  pointColorCropland,
  pointColorGrassAndSavannah,
  */  
  pointSize: 1
}
var config = {
  year: '2018',
  userWeightMethod: 'Expert image set',
  minVals: 8,
  thresWeightedMaj: 0.8,
  thresSimpleMaj: 80,
  userName: 'John Doe',
  correctClassName: 'Correct class'
}
// Dropdown to select years of data i.e. 2018, 2015, 2010, or all
function makeYearWidget(){
  var yearWidget = ui.Select({
    items: ['2018', '2015', '2010', 'All'], 
    value: config.year, 
    onChange: function(value){
      config.year = value;
    }, 
    //style
  })
  return yearWidget;
}
// Radio button (checkbox) to pick ensemble method:
/*
filter(isMaxMeanWeightAnsAll == 1, userAnswer_major == "Yes")
filter(isMaxMeanWeightAnsTop8 == 1, userAnswer_major == "Yes")
filter(isMaxSumWeightAnsTop8 == 1, userAnswer_major == "Yes")
filter(manyUserAnswer_major == "Yes", manyUserAnswer_major_perc >= 80)
filter(manyUserAnswer_major == "Yes",
         isMaxMeanWeightAnsAll == 1, userAnswer_major == "Yes")
*/
// Can check multiple boxes i.e. combining multiple criteria
// use forEach trick in https://code.earthengine.google.com/?scriptPath=users%2Femaprlab%2Fpublic%3AUI%20Applications%2FLandTrendr%2FUI%20LandTrendr%20Pixel%20Time%20Series%20Plotter
// index panel
var criteriaList = [
  'a) Simple majority',
  'b) Weighted mean',
  'c) Maximum sum weight',
  'd) Maximum sum weight (top 8 users)',
  'e) Maximum mean weight',
  'f) Maximum mean weight (top 8 users)'
  ];
var criteriaBox = [];
criteriaList.forEach(function(name, index) {
  var checkBox = ui.Checkbox(name);
  criteriaBox.push(checkBox);
});
var criteriaPanelLabel = ui.Label('Select quality filtering criterion(a)', {fontWeight : 'bold'});
var criteriaPanel = ui.Panel({
  widgets: criteriaBox,
  layout: ui.Panel.Layout.Flow('vertical'),
  style: {stretch: 'vertical'}
});
// Set by default 'b) Weighted mean' is ticked
criteriaBox[1].setValue(true);
// Weight calculation methods: a) Against expert images; b) Against the rest of contributors
// >> Done in init()
// Additional filter to remove least accurate data (least accurate user/s OR least accurate validations)?
// Textbox 1: threshold to filter minimum number of validations
function makeMinValsWidget(){
  var minValsWidget = ui.Textbox({
    value: config.minVals,
    onChange: function(value){
      config.minVals = value;
   },
   //style:
  })
  return minValsWidget;
}
// Textbox 2: threshold to filter simple majority percentage
// Textbox 3: threshold to filter weighted majority value
function makeThresWeightedMajWidget(){
  var thresWeightedMajWidget = ui.Textbox({
    value: config.thresWeightedMaj,
    onChange: function(value){
      config.thresWeightedMaj = value;
   },
   //style:
  })
  return thresWeightedMajWidget;
}
// Textbox 4: threshold to filter simple majority percent
function makeThresSimpleMajWidget(){
  var thresSimpleMajWidget = ui.Textbox({
    value: config.thresSimpleMaj,
    onChange: function(value){
      config.thresSimpleMaj = value;
   },
   disabled: true
   //style:
  })
  return thresSimpleMajWidget;
}
// Make the widgets in global scope, so can set disable = true depending on checked criteria
var yearWidget = makeYearWidget()
var minValsWidget = makeMinValsWidget()
var thresWeightedMajWidget = makeThresWeightedMajWidget()
var thresSimpleMajWidget = makeThresSimpleMajWidget()
/*
'a) Simple majority',
'b) Weighted mean',
'c) Maximum sum weight (top 8 users)',
'd) Maximum mean weight',
'e) Maximum mean weight (top 8 users)'
*/
criteriaBox[0].onChange(function(value){
  thresSimpleMajWidget.setDisabled(!value)
})
criteriaBox[1].onChange(function(value){
  thresWeightedMajWidget.setDisabled(!value)
})
// Initialize floating panel on map to show number of points
/*
function makeInfoPanelTop(){
  var infoPanelTop = ui.Panel()
  infoPanelTop.add(ui.Label('Number of samples (year 2018)', {fontWeight: 'bold' }))
  var infoTop_tot = ui.Label()
  var infoTop_undisturbedForest = ui.Label()
  var infoTop_loggedoverForest = ui.Label()
  var infoTop_oilPalmMonoculture = ui.Label()
  var infoTop_treeBasedNotOilPalm = ui.Label()
  var infoTop_shrub = ui.Label()
  var infoTop_cropland = ui.Label()
  var infoTop_grass = ui.Label()
  infoPanelTop.add(infoTop_tot)
  infoPanelTop.add(infoTop_undisturbedForest)
  infoPanelTop.add(infoTop_loggedoverForest)
  infoPanelTop.add(infoTop_oilPalmMonoculture)
  infoPanelTop.add(infoTop_treeBasedNotOilPalm)
  infoPanelTop.add(infoTop_shrub)
  infoPanelTop.add(infoTop_cropland)
  infoPanelTop.add(infoTop_grass)
  infoPanelTop.style().set({position: 'bottom-left', padding: '0px', margin: '0px'})
  return infoPanelTop;
}
*/ 
/*
function makeInfoPanelBottom(){
  var infoPanelBottom = ui.Panel()
  infoPanelBottom.add(ui.Label('Number of samples (year 2018)', {fontWeight: 'bold' }))
  var infoBottom_tot = ui.Label()
  var infoBottom_undisturbedForest = ui.Label()
  var infoBottom_loggedoverForest = ui.Label()
  var infoBottom_oilPalmMonoculture = ui.Label()
  var infoBottom_treeBasedNotOilPalm = ui.Label()
  var infoBottom_shrub = ui.Label()
  var infoBottom_cropland = ui.Label()
  var infoBottom_grass = ui.Label()
  infoPanelBottom.add(infoBottom_tot)
  infoPanelBottom.add(infoBottom_undisturbedForest)
  infoPanelBottom.add(infoBottom_loggedoverForest)
  infoPanelBottom.add(infoBottom_oilPalmMonoculture)
  infoPanelBottom.add(infoBottom_treeBasedNotOilPalm)
  infoPanelBottom.add(infoBottom_shrub)
  infoPanelBottom.add(infoBottom_cropland)
  infoPanelBottom.add(infoBottom_grass)
  infoPanelBottom.style().set({position: 'bottom-left', padding: '0px', margin: '0px'})
  return infoPanelBottom;
}
*/ 
// Function to initialize all widgets
function initializeWidgets(){
  var panel = ui.Panel();
  panel.add(ui.Label('Choose the year of samples (image chips)'))
  panel.add(yearWidget)                          // Here consider saving widget as a named object, so can set disable:true depending on selected filtering criteria
  panel.add(ui.Label('Minimum number of validations'))
  panel.add(minValsWidget)
  panel.add(ui.Label('Select crowd data aggregation criterion(a)'))
  panel.add(criteriaPanel)
  panel.add(ui.Label('Threshold on weighted mean'))
  panel.add(thresWeightedMajWidget)
  panel.add(ui.Label('Threshold on simple majority percent consensus'))
  panel.add(thresSimpleMajWidget)
  return panel;
}
///////////////////////////////////////////////////////////////////////////
// Widgets for drawing and downloading polygon of erroneous crowd data area
function makeUiUserName(){
  var uiUserName = ui.Textbox({
    placeholder: config.userName, 
    value: config.userName, 
    onChange: function(value){
      config.userName = value;
    }, 
    style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}
  })
  return uiUserName;
}
function makeUiCorrectClassName(){
  var uiCorrectClassName = ui.Textbox({
    placeholder: config.correctClassName, 
    value: config.correctClassName, 
    onChange: function(value){
      config.correctClassName = value;
    }, 
    style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}
  })
  return uiCorrectClassName;
}
////////////////////////////////////////////////////////////////////////////////
// Initialize app interface
// Points are shown as map layers for all classes and by class
// Points are shown for all, and for YES answer
// Map: two map panels side by side
// Function to initialize side panel
function makeSidePanel(title, description) {
  title = ui.Label({
    value: title, 
    style: {fontSize: '18px', fontWeight: '100', padding: '10px'}
  });
  description = ui.Label({
    value: description,
    style: {color: 'gray', padding: '10px'}
  });
  return ui.Panel({
    widgets: [title, description], 
    style: {height: '100%', width: '20%'}
  });
}
// Initialize whole interface
function init() {
  var map1 = ui.Map()
  var map2 = ui.Map()
  var linker = ui.Map.Linker([map1, map2]);
  map1.setCenter(114.17966656306427,-1.3611500370441083, 5)
  map1.setOptions('SATELLITE')
  map2.setOptions('SATELLITE')
  // Set drawing tool for bottom map panel, to draw polygon to report area of erroneous crowd data
  map2.drawingTools().setShown(true)
  var drawingTools = map2.drawingTools();   
  drawingTools.setDrawModes(['polygon']);                                     
  // Add map title on top-center that it's "ALL SAMPLES" or "SELECTED SAMPLES"
  var mapTitleTopText = ui.Label('All Samples', {position: 'bottom-center', fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 0', padding: '0px'})
  var mapTitleTopPanel = ui.Panel()
  mapTitleTopPanel.add(mapTitleTopText)
  mapTitleTopPanel.style({position: 'bottom-center', margin: '0 0 0 0', padding: '0px'})
  map1.add(mapTitleTopPanel)
  var mapTitleBottomText = ui.Label('Selected Samples', {position: 'bottom-center', fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 0', padding: '0px'})
  var mapTitleBottomPanel = ui.Panel()
  mapTitleBottomPanel.add(mapTitleBottomText)
  mapTitleBottomPanel.style({position: 'bottom-center', margin: '0 0 0 0', padding: '0px'})
  map2.add(mapTitleBottomPanel)
  // Show Landsat composite
  map1.addLayer(nationalComposite_2018, {min:[0,0,0], max:[3000,6000,1500], bands: ['swir1_median', 'nir_median', 'red_median']}, 'Landsat 2018 (SWIR,NIR,RED)', false)
  map2.addLayer(nationalComposite_2018, {min:[0,0,0], max:[3000,6000,1500], bands: ['swir1_median', 'nir_median', 'red_median']}, 'Landsat 2018 (SWIR,NIR,RED)', false)
 // Show Sentinel-1 composite
  var bands = ['VV_median_dry', 'VH_median_dry', 'VV_div_VH_median_dry']
  var minVV = -1200
  var maxVV = -500
  var minVH = -1800
  var maxVH = -1100
  var minRatio = 0.5
  var maxRatio = 0.7
  map1.addLayer(S1_season_mosaic, {bands:bands, min:[minVV, minVH, minRatio], max:[maxVV, maxVH, maxRatio]}, 'Sentinel-1 2018 (VV,VH,VV/VH)', false)
  map2.addLayer(S1_season_mosaic, {bands:bands, min:[minVV, minVH, minRatio], max:[maxVV, maxVH, maxRatio]}, 'Sentinel-1 2018 (VV,VH,VV/VH)', false)
  // Show initially allSamp_weightExpert on map1
  if(config.userWeightMethod === 'Expert image set'){
    var allSamp = allSamp_weightExpert;
  } else if(config.userWeightMethod === 'Consensus of the rest of the users'){
    var allSamp = allSamp_weightOrdinary;
  }
  var allSampAllYear = allSamp;
  var allSamp2018 = allSamp.filter(ee.Filter.eq('date_y', 2018))
  var allSamp2015 = allSamp.filter(ee.Filter.eq('date_y', 2015))
  var allSamp2010 = allSamp.filter(ee.Filter.eq('date_y', 2010))
  var map1LyrAllYear = ui.Map.Layer(ee.Image().byte().paint(allSampAllYear, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples', false)
  var map1Lyr2010 = ui.Map.Layer(ee.Image().byte().paint(allSamp2010, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2010)', false)
  var map1Lyr2015 = ui.Map.Layer(ee.Image().byte().paint(allSamp2015, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2015)', false)
  var map1Lyr2018 = ui.Map.Layer(ee.Image().byte().paint(allSamp2018, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018)', true)
  map1.add(map1LyrAllYear)
  map1.add(map1Lyr2010)
  map1.add(map1Lyr2015)
  map1.add(map1Lyr2018)
  // Also add point layer by class for 2018
  var allSamp2018_UndisturbedForest = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Undisturbed Forest'))          
  var allSamp2018_LoggedOverForest = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Logged Over Forest'))          
  var allSamp2018_OilPalmMonoculture = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Oil Palm Monoculture'))          
  var allSamp2018_TreeBasedNotOilPalm = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Tree Based Not Oil Palm'))          
  var allSamp2018_Shrub = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Shrub'))          
  var allSamp2018_Cropland = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Cropland'))          
  var allSamp2018_GrassAndSavannah = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Grass And Savanna')) 
  // Display on map          
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_UndisturbedForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Undisturbed Forest', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_LoggedOverForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Logged Over Forest', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_OilPalmMonoculture, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Oil Palm Monoculture', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_TreeBasedNotOilPalm, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Tree Based Not Oil Palm', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_Shrub, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Shrub', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_Cropland, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Cropland', false))
  map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_GrassAndSavannah, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Grass and Savannah', false))
  // Add panel to show number of samples
  // Top map panel
  var infoPanelTop = ui.Panel()
  infoPanelTop.add(ui.Label('Number of samples (year 2018)', {fontWeight: 'bold' }))
  var infoTop_tot = ui.Label()
  var infoTop_undisturbedForest = ui.Label()
  var infoTop_loggedoverForest = ui.Label()
  var infoTop_oilPalmMonoculture = ui.Label()
  var infoTop_treeBasedNotOilPalm = ui.Label()
  var infoTop_shrub = ui.Label()
  var infoTop_cropland = ui.Label()
  var infoTop_grass = ui.Label()
  infoTop_tot.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_undisturbedForest.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_loggedoverForest.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_oilPalmMonoculture.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_treeBasedNotOilPalm.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_shrub.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_cropland.style().set({margin: '0 0 0 0', padding: '0px'})
  infoTop_grass.style().set({margin: '0 0 0 0', padding: '0px'})
  infoPanelTop.add(infoTop_tot)
  infoPanelTop.add(infoTop_undisturbedForest)
  infoPanelTop.add(infoTop_loggedoverForest)
  infoPanelTop.add(infoTop_oilPalmMonoculture)
  infoPanelTop.add(infoTop_treeBasedNotOilPalm)
  infoPanelTop.add(infoTop_shrub)
  infoPanelTop.add(infoTop_cropland)
  infoPanelTop.add(infoTop_grass)
  infoPanelTop.style().set({position: 'bottom-left', padding: '0px', margin: '0px'})
  // Print the values for infoPanelTop 
  infoTop_tot.setValue('Total: ' + allSamp2018.size().getInfo()) 
  infoTop_undisturbedForest.setValue('Undisturbed Forest: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Undisturbed Forest')).size().getInfo()) 
  infoTop_loggedoverForest.setValue('Logged Over Forest: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Logged Over Forest')).size().getInfo()) 
  infoTop_oilPalmMonoculture.setValue('Oil Palm Monoculture: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Oil Palm Monoculture')).size().getInfo()) 
  infoTop_treeBasedNotOilPalm.setValue('Tree Based Not Oil Palm: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Tree Based Not Oil Palm')).size().getInfo()) 
  infoTop_shrub.setValue('Shrub: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Shrub')).size().getInfo()) 
  infoTop_cropland.setValue('Cropland: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Cropland')).size().getInfo()) 
  infoTop_grass.setValue('Grass And Savanna: ' + allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Grass And Savanna')).size().getInfo()) 
 // Bottom map panel
  var infoPanelBottom = ui.Panel()
  infoPanelBottom.add(ui.Label('Number of samples (year 2018)', {fontWeight: 'bold'}))
  var infoBottom_tot = ui.Label()
  var infoBottom_undisturbedForest = ui.Label()
  var infoBottom_loggedoverForest = ui.Label()
  var infoBottom_oilPalmMonoculture = ui.Label()
  var infoBottom_treeBasedNotOilPalm = ui.Label()
  var infoBottom_shrub = ui.Label()
  var infoBottom_cropland = ui.Label()
  var infoBottom_grass = ui.Label()
  infoBottom_tot.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_undisturbedForest.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_loggedoverForest.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_oilPalmMonoculture.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_treeBasedNotOilPalm.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_shrub.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_cropland.style().set({margin: '0 0 0 0', padding: '0px'})
  infoBottom_grass.style().set({margin: '0 0 0 0', padding: '0px'})
  infoPanelBottom.add(infoBottom_tot)
  infoPanelBottom.add(infoBottom_undisturbedForest)
  infoPanelBottom.add(infoBottom_loggedoverForest)
  infoPanelBottom.add(infoBottom_oilPalmMonoculture)
  infoPanelBottom.add(infoBottom_treeBasedNotOilPalm)
  infoPanelBottom.add(infoBottom_shrub)
  infoPanelBottom.add(infoBottom_cropland)
  infoPanelBottom.add(infoBottom_grass)
  infoPanelBottom.style().set({position: 'bottom-left', margin: '0 0 0 0', padding: '0px'})
  // Add info panel to maps
  map1.add(infoPanelTop)
  map2.add(infoPanelBottom)
  // Add widgets to draw and download polygon of area with erroneous crowd data
  var uiUserName = makeUiUserName(); 
  var uiCorrectClassName = makeUiCorrectClassName();
  // Add initialized placeholders for "Update link" button and "link to table" panel
  var uiUpdateLink = ui.Panel();
  uiUpdateLink.style().set({position: 'top-left', padding: '0px', margin: '0px'})
  var uiDownloadLink = ui.Panel();
  uiDownloadLink.style().set({position: 'top-left', padding: '0px', margin: '0px'})
  // Function to read drawn geometries
  function getMergedFC(filename) {
    var numGeomLayers = ee.Number(drawingTools.layers().length()).getInfo()   // evaluate()
    var fc_merged = ee.FeatureCollection(ee.Feature(null, {'dummy': 1, 'name': 'dummy'}))  // {'dummy': 1, "name":0}
        var result = numGeomLayers;
        for (var i = 0; i <= result-1; i++) {
         var layer = drawingTools.layers().get(i)
         //var name = layer.get("name")
         var fc = ee.FeatureCollection(layer.getEeObject()).map(function(ft){
           return ft.set("name", ee.String(filename))
         })
        /* If not ft.set()
        var fc = ee.FeatureCollection(layer.getEeObject())
        */
         fc_merged = fc_merged.merge(fc)
        }
     fc_merged = fc_merged.filter(ee.Filter.neq('dummy', 1))
     return fc_merged;
   }
  // Function to download geojson (by Olha Danylo)
  var downloadButton = ui.Button({
    label: "Update download link",
    style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'},
    onClick: function() {
      var user_name = config.userName   // uiUserName.getValue()
      var correct_class_name =  config.correctClassName
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
      var filename = user_name + '_' + correct_class_name + '_' + date;
      //print('filename', filename);
      var newfc = getMergedFC(filename); 
      //print('newfc', newfc)
      var downloadLink = newfc.getDownloadURL({format:"json", selectors: [".geo", "name"], filename: filename})
      //var urlLabel = ui.Label({value:'Link to data', style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}})
      urlLabel.setUrl(downloadLink)
      downloadTablePanel.widgets().reset([urlLabel])
      // Clear drawn polygon
      drawingTools.clear()
    }
  }) 
  var urlLabel = ui.Label({value:"Link to data", style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}})
  var downloadTablePanel = ui.Panel({widgets:[urlLabel], style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}})
  uiUpdateLink.add(downloadButton)
  uiDownloadLink.add(downloadTablePanel)
  var feedbackPanel = ui.Panel({
    widgets: [
      ui.Label('To download the drawn polygons (if any):', {fontSize: '14px', fontWeight: 'bold', margin: '0 0 0 0', padding: '0px'}),
      ui.Label('Fill your name', {fontWeight: 'bold', margin: '0 0 0 0', padding: '0px'}),
      uiUserName, 
      ui.Label('Fill the name of correct class', {fontWeight: 'bold', margin: '0 0 0 0', padding: '0px'}),
      uiCorrectClassName,
      uiUpdateLink,
      uiDownloadLink
      ], 
    style: {position: 'top-right', margin: '0 0 0 0', padding: '0px'}
  })
  map2.add(feedbackPanel)
  // Side panel
  var sidePanel = makeSidePanel(
    'Explore Crowd Data', 
    'This is an app to explore spatial distribution of crowd data depending on the aggregation and filtering methods. Optionally, user can draw polygon on the map to indicate areas where the crowd data are incorrect, download the polygon, and send the data to us at hadi@iiasa.ac.at.')
  // Initialize widget panel inside side panel
  var widgetPanel = initializeWidgets()
  // Some widgets need to be created here i.e. inside init()
  // On map1, dynamically shows whole points based on selected userWeightMethod
  var selectUserWeightMethodWidget = ui.Select({
    items: ['Expert image set', 'Consensus of the rest of the users'], 
    value: config.userWeightMethod, 
    onChange: function(value){
      config.userWeightMethod = value;
      updateMap1()
    }, 
    //style
  })
  function updateMap1(){
    if(config.userWeightMethod === 'Expert image set'){
      var allSamp = allSamp_weightExpert;
    } else if(config.userWeightMethod === 'Consensus of the rest of the users'){
      var allSamp = allSamp_weightOrdinary;
    }
    var allSampAllYear = allSamp;
    var allSamp2018 = allSamp.filter(ee.Filter.eq('date_y', 2018))
    var allSamp2015 = allSamp.filter(ee.Filter.eq('date_y', 2015))
    var allSamp2010 = allSamp.filter(ee.Filter.eq('date_y', 2010))
    var map1LyrAllYear = ui.Map.Layer(ee.Image().byte().paint(allSampAllYear, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples', false)
    var map1Lyr2010 = ui.Map.Layer(ee.Image().byte().paint(allSamp2010, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2010)', false)
    var map1Lyr2015 = ui.Map.Layer(ee.Image().byte().paint(allSamp2015, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2015)', false)
    var map1Lyr2018 = ui.Map.Layer(ee.Image().byte().paint(allSamp2018, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018)', true)
    map1.layers().set(2, map1LyrAllYear)  // 1
    map1.layers().set(3, map1Lyr2010)     // 2
    map1.layers().set(4, map1Lyr2015)     // 3
    map1.layers().set(5, map1Lyr2018)     // 4
    // Also show point layer by class for 2018
    var allSamp2018_UndisturbedForest = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Undisturbed Forest'))          
    var allSamp2018_LoggedOverForest = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Logged Over Forest'))          
    var allSamp2018_OilPalmMonoculture = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Oil Palm Monoculture'))          
    var allSamp2018_TreeBasedNotOilPalm = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Tree Based Not Oil Palm'))          
    var allSamp2018_Shrub = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Shrub'))          
    var allSamp2018_Cropland = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Cropland'))          
    var allSamp2018_GrassAndSavannah = allSamp2018.filter(ee.Filter.eq('pileClassEng', 'Grass And Savanna')) 
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_UndisturbedForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Undisturbed Forest', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_LoggedOverForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Logged Over Forest', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_OilPalmMonoculture, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Oil Palm Monoculture', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_TreeBasedNotOilPalm, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Tree Based Not Oil Palm', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_Shrub, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Shrub', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_Cropland, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Cropland', false))
    map1.add(ui.Map.Layer(ee.Image().byte().paint(allSamp2018_GrassAndSavannah, params.pointColor, params.pointSize), {palette: params.pointColor}, 'All samples (2018); Grass and Savannah', false))
     // Update the values for infoPanelTop
    infoTop_tot.setValue('Total: ' + allSamp2018.size().getInfo()) 
    infoTop_undisturbedForest.setValue('Undisturbed Forest: ' + allSamp2018_UndisturbedForest.size().getInfo()) 
    infoTop_loggedoverForest.setValue('Logged Over Forest: ' + allSamp2018_LoggedOverForest.size().getInfo()) 
    infoTop_oilPalmMonoculture.setValue('Oil Palm Monoculture: ' + allSamp2018_OilPalmMonoculture.size().getInfo()) 
    infoTop_treeBasedNotOilPalm.setValue('Tree Based Not Oil Palm: ' + allSamp2018_TreeBasedNotOilPalm.size().getInfo()) 
    infoTop_shrub.setValue('Shrub: ' + allSamp2018_Shrub.size().getInfo()) 
    infoTop_cropland.setValue('Cropland: ' + allSamp2018_Cropland.size().getInfo()) 
    infoTop_grass.setValue('Grass And Savanna: ' + allSamp2018_GrassAndSavannah.size().getInfo()) 
  }  
  // Add to overall widget panel
   widgetPanel.add(ui.Label('User reliability score evaluated against:'))
   widgetPanel.add(selectUserWeightMethodWidget)
  // Button to apply filtering parameters
  var applyWidget = ui.Button({
    label: 'Apply', 
    onClick: applyFun,
    //style
  })
  // Add to overall widgetPanel
  widgetPanel.add(ui.Label('Apply the above filters to the crowd data'))
  widgetPanel.add(applyWidget)
  sidePanel.add(widgetPanel)
  // Make split panel
  var splitPanel = ui.SplitPanel({
    firstPanel: map1, 
    secondPanel: map2, 
    orientation: 'vertical', 
    //style: 
  })
  // Set up whole app interfact
  ui.root.clear()
  ui.root.add(sidePanel)
  ui.root.add(splitPanel)
  //////////////////////////////////////////////////////////////////////////////////
  function applyFun(){
    if(config.year === "2010"){
        var selYearInt = 2010
        // Filter
        var yearFilter = ee.Filter.eq('date_y', selYearInt)
      } else if(config.year === "2015") {
        var selYearInt = 2015
        var yearFilter = ee.Filter.eq('date_y', selYearInt)
      } else if(config.year === "2018") {
        var selYearInt = 2018
        var yearFilter = ee.Filter.eq('date_y', selYearInt)
      } else if(config.year === "All") {
        var yearFilter = ee.Filter.gte('date_y', 2010)
      }
      // Filter
      var minValsFilter = ee.Filter.gte('manyUserAnswer_numVals', parseInt(config.minVals))
      // Initialize fixed filters
      var filterCombined = ee.Filter.and(yearFilter, minValsFilter)
       // Heyhere
        /*
      'a) Simple majority',
      'b) Weighted mean',
      'c) Maximum sum weight (top 8 users)',
      'd) Maximum mean weight',
      'e) Maximum mean weight (top 8 users)'
      */
     // Debug
     /*
     print('criteriaBox[0].getValue()', criteriaBox[0].getValue())
     print('criteriaBox[1].getValue()', criteriaBox[1].getValue())
     print('criteriaBox[2].getValue()', criteriaBox[2].getValue())
     print('criteriaBox[3].getValue()', criteriaBox[3].getValue())
     print('criteriaBox[4].getValue()', criteriaBox[4].getValue())
     */ 
     // End debugging
     // Filter if a) is checked
      if(criteriaBox[0].getValue()){
        var thresSimpleMajFilter = ee.Filter.gte('manyUserAnswer_major_perc', parseFloat(config.thresSimpleMaj))
        filterCombined = ee.Filter.and(filterCombined, thresSimpleMajFilter, ee.Filter.eq('manyUserAnswer_major', "Yes"))  
      } 
      // Filter if b) is checked
      if(criteriaBox[1].getValue()){
        var thresWeightedMeanFilter = ee.Filter.gte('weightedMaj', parseFloat(config.thresWeightedMaj))
        filterCombined = ee.Filter.and(filterCombined, thresWeightedMeanFilter)
      } 
      // Filter if c) is checked
      if(criteriaBox[2].getValue()){
       filterCombined = ee.Filter.and(filterCombined, ee.Filter.eq('isMaxSumWeightAnsAll', 1), ee.Filter.eq('userAnswer_major', true)) // somewhat userAnswer_major = "Yes" / "No" becomes boolean when ingested in EE
     } 
      // Filter if d) is checked 
      if(criteriaBox[3].getValue()){
        filterCombined = ee.Filter.and(filterCombined, ee.Filter.eq('isMaxSumWeightAnsTop8', '1'), ee.Filter.eq('userAnswer_major', true)) // somewhat userAnswer_major = "Yes" / "No" becomes boolean when ingested in EE
      } 
      // Filter if e) is checked
      if(criteriaBox[4].getValue()){
        filterCombined = ee.Filter.and(filterCombined, ee.Filter.eq('isMaxMeanWeightAnsAll', 1), ee.Filter.eq('userAnswer_major', true))  // somewhat userAnswer_major = "Yes" / "No" becomes boolean when ingested in EE
      }
      // Filter if f) is checked
      if(criteriaBox[5].getValue()){
        filterCombined = ee.Filter.and(filterCombined, ee.Filter.eq('isMaxMeanWeightAnsTop8', '1'), ee.Filter.eq('userAnswer_major', true)) // somewhat userAnswer_major = "Yes" / "No" becomes boolean when ingested in EE
      }
      // User's reliability 
      if(config.userWeightMethod === 'Expert image set'){
        var allSamp = allSamp_weightExpert;
      } else if(config.userWeightMethod === 'Consensus of the rest of the users'){
        var allSamp = allSamp_weightOrdinary;
      }
      var selSamp = allSamp.filter(filterCombined)
                .distinct('imageName');
      //print('selSamp.size()', selSamp.size())          
      var selSamp_UndisturbedForest = selSamp.filter(ee.Filter.eq('pileClassEng', 'Undisturbed Forest'))          
      var selSamp_LoggedOverForest = selSamp.filter(ee.Filter.eq('pileClassEng', 'Logged Over Forest'))          
      var selSamp_OilPalmMonoculture = selSamp.filter(ee.Filter.eq('pileClassEng', 'Oil Palm Monoculture'))          
      var selSamp_TreeBasedNotOilPalm = selSamp.filter(ee.Filter.eq('pileClassEng', 'Tree Based Not Oil Palm'))          
      var selSamp_Shrub = selSamp.filter(ee.Filter.eq('pileClassEng', 'Shrub'))          
      var selSamp_Cropland = selSamp.filter(ee.Filter.eq('pileClassEng', 'Cropland'))          
      var selSamp_GrassAndSavannah = selSamp.filter(ee.Filter.eq('pileClassEng', 'Grass And Savanna')) 
      //print("selSamp.aggregate_histogram('pileClassEng')", selSamp.aggregate_histogram('pileClassEng'))           
       // Print the values for infoPanelTop i.e. fixed values for all samples
      infoBottom_tot.setValue('Total: ' + selSamp.size().getInfo()) 
      infoBottom_undisturbedForest.setValue('Undisturbed Forest: ' + selSamp_UndisturbedForest.size().getInfo()) 
      infoBottom_loggedoverForest.setValue('Logged Over Forest: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Logged Over Forest')).size().getInfo()) 
      infoBottom_oilPalmMonoculture.setValue('Oil Palm Monoculture: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Oil Palm Monoculture')).size().getInfo()) 
      infoBottom_treeBasedNotOilPalm.setValue('Tree Based Not Oil Palm: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Tree Based Not Oil Palm')).size().getInfo()) 
      infoBottom_shrub.setValue('Shrub: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Shrub')).size().getInfo()) 
      infoBottom_cropland.setValue('Cropland: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Cropland')).size().getInfo()) 
      infoBottom_grass.setValue('Grass And Savanna: ' + selSamp.filter(ee.Filter.eq('pileClassEng', 'Grass And Savanna')).size().getInfo()) 
      // Display on map          
      // Previously idx 1,2,3,4,5,6,7,8
      map2.layers().set(2, ui.Map.Layer(ee.Image().byte().paint(selSamp, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples'))
      map2.layers().set(3, ui.Map.Layer(ee.Image().byte().paint(selSamp_UndisturbedForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Undisturbed Forest', false))
      map2.layers().set(4, ui.Map.Layer(ee.Image().byte().paint(selSamp_LoggedOverForest, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Logged Over Forest', false))
      map2.layers().set(5, ui.Map.Layer(ee.Image().byte().paint(selSamp_OilPalmMonoculture, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Oil Palm Monoculture', false))
      map2.layers().set(6, ui.Map.Layer(ee.Image().byte().paint(selSamp_TreeBasedNotOilPalm, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Tree Based Not Oil Palm', false))
      map2.layers().set(7, ui.Map.Layer(ee.Image().byte().paint(selSamp_Shrub, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Shrub', false))
      map2.layers().set(8, ui.Map.Layer(ee.Image().byte().paint(selSamp_Cropland, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Cropland', false))
      map2.layers().set(9, ui.Map.Layer(ee.Image().byte().paint(selSamp_GrassAndSavannah, params.pointColor, params.pointSize), {palette: params.pointColor}, 'Filtered samples; Grass and Savannah', false))
  }
}
//////////////////////////////////////////////////////////////////////////////////////
init()
////////////////////////////////////////////////////////////////////////////////////