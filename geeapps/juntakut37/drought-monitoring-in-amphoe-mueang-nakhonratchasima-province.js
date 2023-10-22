//=====================================================================================================
//                     DROUGHT MONITORING USING THE STANDARDIZED VEGETATION INDEX (SVI)
//=====================================================================================================
//The Standardized Vegetation Index (SVI) developed by Peters et al. (2002) describes the probability 
//of variation from the normal Enhanced Vegetation Index (EVI) over multiple years of data, on a weekly
//(or 16 day) time step. The EVI images are level 3 products based on data captured by MODIS. The SVI is  
//calculated by taking the EVI of the pixel i during week j for year k
//minus the mean for pixel i during week j over n years, 
//divided by standard deviation of pixel i during week j over n years. Please visit
//http://www.un-spider.org/advisory-support/recommended-practices/recommended-practice-agricultural-drought-monitoring-svi
//for more information about the SVI.
//This script uses the 'SummaryQA' band in order to mask out clouds. However, the MODIS dataset also
//includes a 'DetailedQA' band which can serve as a more precise mask. Feel free to apply an improved
//mask by changing the script.
//=====================================================================================================
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                    RUN THE MODEL
// Import:
var MOD13Q1_imageCollection = ee.ImageCollection("MODIS/006/MOD13Q1"),
    SviVis = {"opacity":1,"bands":["SVI"],"min":-2.5,"max":2.5,"palette":["d73027","fc8d59","fee08b","ffffbf","d9ef8b","91cf60","1a9850"]},
    EviVis = {"opacity":1,"bands":["EVI_Masked"],"min":0,"max":0.5,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]},
    MeanEviVis = {"opacity":1,"bands":["EVI_Masked"],"min":0,"max":0.5,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]};
var AOI = ee.FeatureCollection("users/juntakut37/tambon_ap_muang_korat");
//var AOI = ee.FeatureCollection("users/juntakut37/muni_korat");
Map.setOptions('HYBRID');
Map.centerObject(AOI,10);
//Map.setCenter(20, 40, 10);
//Map.setControlVisibility({layerList: true, zoomControl: false});
// Now hit Run to start the model! 
//**************************************DISCLAIMER!****************************************************
//Please refer to the disclaimer at the end of the script!
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//=====================================================================================================
//                             SELECT YOUR OWN STUDY AREA   
// Use the polygon-tool in the top left corner of the map pane to draw the shape of your 
// study area. Single clicks add vertices, double-clicking completes the polygon.
//*************************************CAUTION!**********************************************
//Afterwards, go to the setting of the polygon (gear-symbol within your 'Geometry Imports'),
//rename the polygon to 'AOI' and change the 'Import as' drop-down to 'FeatureCollection'.
// **CAREFUL**: Under 'Geometry Imports' (top left in map pane) uncheck the 
//              geometry box, so it does not block the view on the imagery later.
//**********************************Alternatively:*******************************************
//Upload your shapefile via the 'Assets' tab in the upper left corner. Select 'NEW' => 'Shape Files'
//and upload the four relevant files of your shapefile (.dbf, .prj, .shp, .shx). Once uploaded, refresh
//the assets and import your shapefile from the asset tab into this script by clicking the arrow symbol.
//Rename the imported asset to 'AOI' (Area of Interest).
//=====================================================================================================
//                                     SET TIME FRAME
//If you want to use another period of time than the whole time span of MODIS data, change the 
//code between ee.Date brackets (start_date & end_date) to the desired dates.
//Keep in mind, that a reduction of the time span will lead to a less accurate SVI calculation.
var start_date = ee.Date(ee.List(MOD13Q1_imageCollection.get('date_range')).get(0)).advance(-1,'day');
var end_date = ee.Date(ee.List(MOD13Q1_imageCollection.get('date_range')).get(1)).advance(+1,'day');
print('The observed time period begins on ', start_date.advance(+1,'day').format('YYYY-MM-dd'),'and ends on ', end_date.advance(-1,'day').format('YYYY-MM-dd'));
//var start_date = ee.Date('2018-01-01');
//var end_date = ee.Date('2020-12-31');
//print('The observed time period begins on ', start_date.advance(+1,'day').format('YYYY-MM-dd'),'and ends on ', end_date.advance(-1,'day').format('YYYY-MM-dd'));
//                                 SET TIME FRAME FOR EXPORT
//As exporting all images over the whole investigation period might cause issues, a reduction of the
//images to be exported is advisable. You can change the start and end point for the export selection 
//below. The images will be added to the 'Tasks' tab.
var startDateForDownload = '2019-01-01';
var endDateForDownload = end_date;
var endDateForDownload = '2020-12-31';
//=====================================================================================================
//                                     SET RESOLUTION
//MODIS Vegetation Indices have a resolution of 250 meter. Depending on the size of your AOI it might
//be useful to decrease the resolution to a certain extent (eg. 1000). This shortens the processing time.
//However, the defined resolution effects the statistic calculations (plotted charts) and the exported
//image, not the displayed image.
var resolution = 500; //the resolution might be increased up to 250 depending on the AOI size
//=====================================================================================================
//                                    INTERACTIVE CHART
//Show interactive chart when clicking on a pixel?
var showInteractiveChart = true; //set to "true" if you want to use the interactive chart. Otherwise set to "false"
//=====================================================================================================
//                                  WORST / BEST SVI IMAGES
//Filter for images with highest and lowest SVI mean. If set to "true", images with highest and lowest 
//SVI mean will be calculated. The images will be added to the 'Tasks'.
var filterWorstBestSVI = false;
var amountWorstBestImages = 3; //Amount of hits for highest and lowest SVI mean. 3 = worst 3 images and best 3 images
var maxPixels = 1e9; //Number of pixels that will be recognised for statistics. If actual number of pixels is higher, the SVI mean will not depict the mean of all pixels
//************************************************************************************************* 
//                                  START OF THE SCRIPT
//Add MODIS Data
var evi = MOD13Q1_imageCollection.select(['EVI', 'SummaryQA'])
  .filterDate(start_date, end_date)
  .filterBounds(AOI)
  .map(function(image){return image.clip(AOI)});
//Create Quality Masks. You can change the code and use the 'DetailedQA' for a better masking.
var QualityMask = evi.map(function(QA){
  var intermediateMask = QA.select(['SummaryQA'],['QA_Mask']);
  var mask = (intermediateMask.eq(2).max(intermediateMask.eq(3))).not();
  return QA.addBands(mask);
});
//Apply Masks
var MaskImages = QualityMask.map(function(Masking){
  var SelectImageForMask = Masking.select(['EVI'], ['EVI_Masked']);
  var SelectMask = Masking.select(['QA_Mask']);
  var ApplyMask = SelectImageForMask.updateMask(SelectMask);
  return ApplyMask.addBands(Masking);
});
//*************************************************************************************************
//Calculate statistics and SVI
  //Rescale EVI data range to -1, 1
var rescaledEVIRange = MaskImages.map(function(rescale){
  var recalculated = rescale.expression('evi / divider',
  {
    evi: rescale.select('EVI_Masked'),
    divider: 10000
  })
  return rescale.addBands({
    srcImg: recalculated,
    overwrite: true
  })
})
  //Select band that will be used for SVI calculation
var SelectImageForStats = rescaledEVIRange.select(['EVI_Masked']);
//Calculate statistics for each image
var statsCollection = SelectImageForStats.map(function(stats){
    var startDOY = ee.Date(stats.get('system:time_start')).getRelative('day', 'year');
    var endDOY = ee.Date(stats.get('system:time_end')).getRelative('day', 'year');
    //var startDOY = ee.Date(stats.get('system:start_date')).getRelative('day', 'year');
    //var endDOY = ee.Date(stats.get('system:end_date')).getRelative('day', 'year');
  var collectionForStats = SelectImageForStats
    .filter(ee.Filter.calendarRange(startDOY, endDOY, 'day_of_year'))
    .reduce(ee.Reducer.stdDev().combine(ee.Reducer.mean(), null, true));
  return stats.addBands(collectionForStats);
});
//Calculate SVI
var FinalCollection = statsCollection.map(function(toSVI){
  var SelectImageForSVI = toSVI.select(['EVI_Masked'], ['SVI']);
  var calc = toSVI.expression('(evi - mean) / stdDev', 
  {
    evi: SelectImageForSVI, 
    mean: toSVI.select('EVI_Masked_mean'), 
    stdDev: toSVI.select('EVI_Masked_stdDev')});
  return toSVI
    .addBands(calc)
    .set({
      startDate: ee.Date(toSVI.get('system:time_start')).format('YYYY_MM_dd_DD'),
      endDate: ee.Date(toSVI.get('system:time_end')).format('YYYY_MM_dd_DD')
    });
});
//************************************************************************************************* 
//Display Data
//Map.centerObject(AOI, 10); //Center map view to AOI
var selectEviForMean = FinalCollection.select(['EVI_Masked']);
var Mean_EVI = selectEviForMean.mean();
//Map.addLayer(FinalCollection.first(), MaskVis, 'Quality Mask', false);
Map.addLayer(Mean_EVI, MeanEviVis, 'Mean EVI', false);
  //filters the latest image from image collection by the given end date. The given Name uses the end date as well
//var imageToVisualize = FinalCollection.limit(1, 'system:time_start', false).first();
//var imageToVisualize = FinalCollection.limit(1, 'system:start_date', false).first();
//var imageStartDate = imageToVisualize.get('startDate');
//var imageEndDate = imageToVisualize.get('endDate');
//Map.addLayer(imageToVisualize, EviVis, 'EVI '+imageStartDate.getInfo()+' to '+imageEndDate.getInfo(), false);
//Map.addLayer(imageToVisualize, SviVis, 'SVI '+imageStartDate.getInfo()+' to '+imageEndDate.getInfo());
///////////////////////////////////////////////////////////////////
//print(dr_2019_11_01);
//var dr_2021_11_01 = ee.Image(FinalCollection.select('SVI')
                //.filter(ee.Filter.date('2021-11-01', '2022-01-31'))
                //.mean());
//print(dr_2019_06_10);
//var dr_2021_06_10 = ee.Image(FinalCollection.select('SVI')
                //.filter(ee.Filter.date('2021-06-01', '2021-10-31'))
                //.mean());
//print(dr_2019_02_05);
var dr_2021_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2021-02-01', '2021-05-31'))
                .mean());
//print(dr_2018_11_01);
var dr_2020_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2020-11-01', '2021-01-31'))
                .mean());
//print(dr_2018_06_10);
var dr_2020_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2020-06-01', '2020-10-31'))
                .mean());
//print(dr_2018_02_05);
var dr_2020_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2020-02-01', '2020-05-31'))
                .mean());
var dr_2019_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2019-11-01', '2020-01-31'))
                .mean());
//print(dr_2019_06_10);
var dr_2019_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2019-06-01', '2019-10-31'))
                .mean());
//print(dr_2019_02_05);
var dr_2019_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2019-02-01', '2019-05-31'))
                .mean());
//print(dr_2018_11_01);
var dr_2018_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-11-01', '2019-01-31'))
                .mean());
//print(dr_2018_06_10);
var dr_2018_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-06-01', '2018-10-31'))
                .mean());
//print(dr_2018_02_05);
var dr_2018_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-02-01', '2018-05-31'))
                .mean());
//print(dr_2018_11_01);
var dr_2018_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-11-01', '2019-01-31'))
                .mean());
//print(dr_2018_06_10);
var dr_2018_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-06-01', '2018-10-31'))
                .mean());
//print(dr_2018_02_05);
var dr_2018_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2018-02-01', '2018-05-31'))
                .mean());
//print(dr_2017_11_01);
var dr_2017_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2017-11-01', '2018-01-31'))
                .mean());
//print(dr_2017_06_10);
var dr_2017_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2017-06-01', '2017-10-31'))
                .mean());
//print(dr_2017_02_05);
var dr_2017_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2017-02-01', '2017-05-31'))
                .mean());                
//print(dr_2016_11_01);
var dr_2016_11_01 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2016-11-01', '2017-01-31'))
                .mean());
//print(dr_2016_06_10);
var dr_2016_06_10 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2016-06-01', '2016-10-31'))
                .mean());                
//print(dr_2016_02_05);
var dr_2016_02_05 = ee.Image(FinalCollection.select('SVI')
                .filter(ee.Filter.date('2016-02-01', '2016-05-31'))
                .mean());
////Display last five months
Map.addLayer(dr_2016_02_05.clip(AOI), SviVis, 'Drought: February to May  2016', 0);
Map.addLayer(dr_2016_06_10.clip(AOI), SviVis, 'Drought: June to October 2016', 0);
Map.addLayer(dr_2016_11_01.clip(AOI), SviVis, 'Drought: November to January 2016', 0);
Map.addLayer(dr_2017_02_05.clip(AOI), SviVis, 'Drought: February to May 2017', 0);
Map.addLayer(dr_2017_06_10.clip(AOI), SviVis, 'Drought: June to October 2017', 0);
Map.addLayer(dr_2017_11_01.clip(AOI), SviVis, 'Drought: November to January 2017', 0);
Map.addLayer(dr_2018_02_05.clip(AOI), SviVis, 'Drought: February to May  2018', 0);
Map.addLayer(dr_2018_06_10.clip(AOI), SviVis, 'Drought: June to October 2018', 0);
Map.addLayer(dr_2018_11_01.clip(AOI), SviVis, 'Drought: November to January 2018', 0);
Map.addLayer(dr_2019_02_05.clip(AOI), SviVis, 'Drought: February to May 2019', 0);
Map.addLayer(dr_2019_06_10.clip(AOI), SviVis, 'Drought: June to October 2019', 0);
Map.addLayer(dr_2019_11_01.clip(AOI), SviVis, 'Drought: November to January 2019', 0);
Map.addLayer(dr_2020_02_05.clip(AOI), SviVis, 'Drought: February to May  2020', 0);
Map.addLayer(dr_2020_06_10.clip(AOI), SviVis, 'Drought: June to October 2020', 0);
Map.addLayer(dr_2020_11_01.clip(AOI), SviVis, 'Drought: November to January 2020', 0);
Map.addLayer(dr_2021_02_05.clip(AOI), SviVis, 'Drought: February to May 2021', 1);
//Map.addLayer(dr_2021_06_10.clip(AOI), SviVis, 'Drought: June to October 2021', 0);
//Map.addLayer(dr_2021_11_01.clip(AOI), SviVis, 'Drought: November to January 2021', 0);
//Map.addLayer(AOI.draw({color: 'ffffff', strokeWidth: 5}), {},'Study Area');
Map.addLayer(AOI.draw({color: '000000', strokeWidth: 5}), {},'Study Area', 0);
//************************************************************************************************* 
//Create a chart of SVI and EVI over time
//Add labels to AOI feature collection. Labels will be used for the charts
var RoiWithLabels = AOI.map(function(addLabels){
  var labelNames = addLabels.set('labelEVI','EVI').set('labelSVI', 'SVI');
  return labelNames;
});
//Plot SVI Chart
var SVI_Chart = ui.Chart.image.seriesByRegion(
  FinalCollection, 
  RoiWithLabels, 
  ee.Reducer.mean(),
  'SVI', 
  resolution, //Scale in meter
  'system:time_start', 
  'labelSVI' //label
  ).setOptions({
    title: 'SVI Time Series (based on EVI)',
    vAxis: {title: 'SVI'},
    hAxis: {title: 'Year'},
    //legend: {position: 'none'},
    });
print('SVI chart based on mean values within AOI:',SVI_Chart);
//Plot  EVI Chart
var EVI_Chart = ui.Chart.image.seriesByRegion(
  FinalCollection, //Image collection to be used
  RoiWithLabels, //Region that will be observed in Chart
  ee.Reducer.mean(), //Reducer type
  'EVI_Masked', //Band to be used
  resolution, //Scale in meter
  'system:time_start', 
  'labelEVI' //label
  ).setOptions({
    title: 'EVI Time Series',
    vAxis: {title: 'EVI'},
    hAxis: {title: 'Year'},
    //legend: {position: 'none'},
});
print('EVI chart based on mean values within AOI:',EVI_Chart);
//*************************************************************************************************
//Inspector Chart
// Create a panel to hold the chart.
if (showInteractiveChart === true){
  var inspectorPanel = ui.Panel({
    style:{
      width: '600px',
      position: 'bottom-right',
      'background-color': '333333',
    }
  });
  Map.add(inspectorPanel);
  // Register a function to draw a chart when a user clicks on the map.
  Map.onClick(function(coords) {
  inspectorPanel.clear();
  var point = ee.FeatureCollection(ee.Geometry.Point(coords.lon, coords.lat)).map(function(addLabels){
  var labelNames = addLabels.set('labelSVI', 'SVI');
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(6, dot);
  return labelNames;
});
    //Button to hide Panel once the chart is loaded
  var hideButton = ui.Button({
    label: 'X',
    onClick: function(){
      inspectorPanel.clear();
    },
    style:{
      color: 'black',
    }
  });
  inspectorPanel.add(hideButton);
    //Chart to display data history of clicked point
  var inspectorChart = ui.Chart.image.seriesByRegion(  FinalCollection, 
  point, 
  ee.Reducer.mean(),
  'SVI', 
  resolution, //Scale in meter
  'system:time_start', 
  'labelSVI' //label
  ).setOptions({
    title: 'SVI Time Series (based on EVI)',
    vAxis: {title: 'SVI'},
    hAxis: {title: 'Year'},
    //legend: {position: 'none'},
    });
  inspectorChart.setOptions({title: 'SVI for requested pixel', vAxis: {title: 'SVI'}, hAxis: {title: 'Year'}});
  inspectorPanel.add(inspectorChart);
  });
}
//************************************************************************************************* 
//Create title
//Add Title
var title = ui.Label({
  value: 'Drought Monitoring Using the Standard Vegetation Index (SVI)',
  style:{
  fontWeight: 'bold',
  fontSize: '18px'
  }});
title.style().set('position', 'top-center');
Map.add(title);
// UI panel elements and their text
// -------------------------------------
var title_panel = ui.Panel({style:{'background-color':'000000', height: '150px'}});
var title_text = ui.Label("Drought Monitoring in Amphoe Mueang, Nakhon Ratchasima, Thailand", {'background-color':'000000', 'fontSize': '28px', 'font-weight':'bold', 'color': '00cc00'});
var selector_panel = ui.Panel({style:{'background-color':'333333'}});
var area_panel = ui.Panel({style:{'background-color':'555555', margin: '5px', padding: '5px'}});
var description_panel = ui.Panel({style:{'background-color':'333333'}});
var desc_spacer = ui.Label("", {'background-color':'333333'});
var desc_h1 = ui.Label("THE PURPOSE of THIS APP:", {'background-color':'333333', color:'b3ffb3', 'font-weight':'bold'});
var desc_para1 = ui.Label("This web app visualises and estimates drought impacts in Nakhon Ratchasima Province, Thailand, based on satellite images from the MODIS (Moderate Resolution Imaging Spectroradiometer) which is a key instrument aboard the Terra (originally known as EOS AM-1) and Aqua (originally known as EOS PM-1) satellites. Terra's orbit around the Earth is timed so that it passes from north to south across the equator in the morning, while Aqua passes south to north over the equator in the afternoon. Terra MODIS and Aqua MODIS are viewing the entire Earth's surface every 1 to 2 days, acquiring data in 36 spectral bands, or groups of wavelengths. These data will improve our understanding of global dynamics and processes occurring on the land, in the oceans, and in the lower atmosphere. MODIS is playing a vital role in the development of validated, global, interactive Earth system models able to predict global change accurately enough to assist policy makers in making sound decisions concerning the protection of our environment.", {'background-color':'333333', color:'white'});
var desc_h2 = ui.Label("THE USE of THIS APP:", {'background-color':'333333', color:'b3ffb3', 'font-weight':'bold'});
var desc_para2 = ui.Label("Google Earth Engine will display the latest SVI image in the map section. The latest EVI image and the mean EVI image of the whole timescale will be added to the Layers, but will be deactivated. You can visualize them by hovering over Layers and activating their checkboxes.", {'background-color':'333333', color:'white'});
var desc_para3 = ui.Label("In order to receive a pixel value from the visualized images, clicking on a location within you AOI. The charts, which are presented and printed into the Console display the EVI and SVI over time by taking the mean of all pixels in your AOI for each acquisition date.", {'background-color':'333333', color:'white'});
var desc_para4 = ui.Label("A positive SVI indicates a good vegetation condition which is better than the average for the specific period. A negative SVI indicates a worse vegetation condition compared to the average of the specific period. This phenomenon might be connected to droughts. The severity and spatial distribution of droughts that occurred in the past can be examined by analysing the graphs and the images. Even the observation of imminent droughts might be possible if combined with additional data sources.", {'background-color':'333333', color:'white'});
var footer_panel = ui.Panel({style:{'background-color':'333333'}});
var footer_spacer = ui.Label("", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text1 = ui.Label("Please use these maps and numbers with caution. This analysis has limitations, and may suffer from both inclusion and exclusion errors.", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text2 = ui.Label("Col.Asst.Dr.Juntakut, P. | Chulachomklao Royal Military Academy (CRMA)", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
title_panel.add(title_text);
description_panel.add(desc_spacer);
description_panel.add(desc_h1);
description_panel.add(desc_para1);
description_panel.add(desc_h2);
description_panel.add(desc_para2);
description_panel.add(desc_para3);
description_panel.add(desc_para4);
footer_panel.add(footer_spacer);
footer_panel.add(footer_text1);
footer_panel.add(footer_text2);
//---------------------------------------------------------------------
//--------------------------------------------------------------
var panel = ui.Panel(
  [title_panel, selector_panel, area_panel, description_panel, footer_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '350px', 'background-color':'333333'}
  );
ui.root.insert(0, panel);
ui.Map();
//************************************************************************************************* 
//Create legend
//Get Max and Min values from imports-section with one decimal 
var getSviVisMax = Math.round(SviVis.max*10)/10;
var getSviVisMin = Math.round(SviVis.min*10)/10;
var getEviVisMax = Math.round(EviVis.max*10)/10;
var getEviVisMin = Math.round(EviVis.min*10)/10;
var getEviMeanVisMax = Math.round(MeanEviVis.max*10)/10;
var getEviMeanVisMin = Math.round(MeanEviVis.min*10)/10;
//Create Colorramp information
var vizSVI = {min: getSviVisMin, max:getSviVisMax, palette:SviVis.palette};
var vizEVI = {min: getEviVisMin, max:getEviVisMax, palette:EviVis.palette};
var vizMeanEVI = {min: getEviMeanVisMin, max:getEviMeanVisMax, palette:MeanEviVis.palette};
//Add main panel which will contain smaller panels for each legend (SVI, EVI, Mean EVI)
    var mainPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
    });
//**************************************************
//Add SVI Legend
          //Add new panel for SVI legend within the main Panel
        var sviLegend = ui.Panel({
          style: {
             //position: 'bottom-left',
             padding: '0 0'
           }
        });
        mainPanel.add(sviLegend);
         //Create a checkbox which will enable a toggle function to show the SVI legend
        var sviCheckbox = ui.Checkbox('Show SVI Legend', false);
          //Provide information what happens if the checkbox is checked or unchecked
       // sviCheckbox.onChange(function(checked) {
          //if (checked) { //if it is checked, fill the SVI legend panel with information
              //Create legend title
              var sviLegendTitle = ui.Label({
                value: 'SVI',
                style: {
                  fontWeight: 'bold',
                  fontSize: '18px',
                  margin: '0 auto',
                  padding: '0 auto'
                  }
              });
               // Add the title to the panel
              sviLegend.add(sviLegendTitle);
              // create the legend image
              var sviLon = ee.Image.pixelLonLat().select('latitude');
              var sviGradient = sviLon.multiply((vizSVI.max-vizSVI.min)/100.0).add(vizSVI.min);
              var sviLegendImage = sviGradient.visualize(vizSVI);
              // create text on top of legend
              var sviPanelMax = ui.Panel({
                  widgets: [
                    ui.Label(vizSVI['max'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                });
              sviLegend.add(sviPanelMax);
              // create thumbnail from the image
              var sviThumbnail = ui.Thumbnail({
                image: sviLegendImage, 
                params: {bbox:'0,0,10,100', dimensions:'10x150'},  
                style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
              });
              // add the thumbnail to the legend
              sviLegend.add(sviThumbnail);
              // create text on top of legend
              var sviPanelMin = ui.Panel({
                  widgets: [
                    ui.Label(vizSVI['min'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                  });
              sviLegend.add(sviPanelMin);
         // } else {
        //    sviLegend.clear();
        //  }
       // });
        print(sviCheckbox);
//**************************************************
//Add EVI Legend
        //Add new panel for SVI legend within the main Panel
        var eviLegend = ui.Panel({
          style: {
             //position: 'bottom-left',
             padding: '0 0'
           }
        });
        mainPanel.add(eviLegend);
          //Create a checkbox which will enable a toggle function to show the SVI legend
        var eviCheckbox = ui.Checkbox('Show EVI Legend', false);
          //Provide information what happens if the checkbox is checked or unchecked
        eviCheckbox.onChange(function(checked) {
          if (checked) { //if it is checked, fill the SVI legend panel with information
              //Create legend title
              var eviLegendTitle = ui.Label({
                value: 'EVI',
                style: {
                  fontWeight: 'bold',
                  fontSize: '18px',
                  margin: '0 auto',
                  padding: '0 auto'
                  }
              });
               // Add the title to the panel
              eviLegend.add(eviLegendTitle);
              // create the legend image
              var eviLon = ee.Image.pixelLonLat().select('latitude');
              var eviGradient = eviLon.multiply((vizEVI.max-vizEVI.min)/100.0).add(vizEVI.min);
              var eviLegendImage = eviGradient.visualize(vizEVI);
              // create text on top of legend
              var eviPanelMax = ui.Panel({
                  widgets: [
                    ui.Label(vizEVI['max'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                });
              eviLegend.add(eviPanelMax);
              // create thumbnail from the image
              var eviThumbnail = ui.Thumbnail({
                image: eviLegendImage, 
                params: {bbox:'0,0,10,100', dimensions:'10x150'},  
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
              });
              // add the thumbnail to the legend
              eviLegend.add(eviThumbnail);
              // create text on top of legend
              var eviPanelMin = ui.Panel({
                  widgets: [
                    ui.Label(vizEVI['min'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                });
              eviLegend.add(eviPanelMin);
          } else {
            eviLegend.clear();
          }
        });
        print(eviCheckbox);
//**************************************************
//Add Mean EVI Legend
        //Add new panel for Mean EVI legend within the main Panel
        var meanEviLegend = ui.Panel({
          style: {
             //position: 'bottom-left',
             padding: '0 0'
           }
        });
        mainPanel.add(meanEviLegend);
          //Create a checkbox which will enable a toggle function to show the SVI legend
        var meanEviCheckbox = ui.Checkbox('Show Mean EVI Legend', false);
          //Provide information what happens if the checkbox is checked or unchecked
        meanEviCheckbox.onChange(function(checked) {
          if (checked) { //if it is checked, fill the SVI legend panel with information
              //Create legend title
              var meanEviLegendTitle = ui.Label({
                value: 'Mean EVI',
                style: {
                  fontWeight: 'bold',
                  fontSize: '18px',
                  margin: '0 auto',
                  padding: '0 auto'
                  }
              });
               // Add the title to the panel
              meanEviLegend.add(meanEviLegendTitle);
              // create the legend image
              var meanEviLon = ee.Image.pixelLonLat().select('latitude');
              var meanEviGradient = meanEviLon.multiply((vizMeanEVI.max-vizMeanEVI.min)/100.0).add(vizMeanEVI.min);
              var MeanEviLegendImage = meanEviGradient.visualize(vizMeanEVI);
              // create text on top of legend
              var meanEviPanelMax = ui.Panel({
                  widgets: [
                    ui.Label(vizMeanEVI['max'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                });
              meanEviLegend.add(meanEviPanelMax);
              // create thumbnail from the image
              var meanEviThumbnail = ui.Thumbnail({
                image: MeanEviLegendImage, 
                params: {bbox:'0,0,10,100', dimensions:'10x150'},  
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
              });
              // add the thumbnail to the legend
              meanEviLegend.add(meanEviThumbnail);
              // create text on top of legend
              var meanEviPanelMin = ui.Panel({
                  widgets: [
                    ui.Label(vizMeanEVI['min'])
                  ],
                  style: {
                    padding: '0 auto',
                    margin: '0 auto',
                    position: 'bottom-center'
                  }
                });
              meanEviLegend.add(meanEviPanelMin);
          } else {
            meanEviLegend.clear();
          }
        });
        print(meanEviCheckbox);
Map.add(mainPanel);
//************************************************************************************************* 
//Calculates the SVI mean of every image and filters for the worst and best SVI mean
if (filterWorstBestSVI ===  true) {
  //Calculate the mean of the SVI for each image in image collection
  var sviMeanCollection = FinalCollection.map(function(toSVImean){
    var calculateSviMean = ee.Number(toSVImean.select(['SVI']).reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: AOI,
      scale: resolution,
      bestEffort: true,
      maxPixels: maxPixels 
    }).values().get(0));
  //Gives the SVI mean value back to the properties of each image
  return toSVImean.set({
    SVI_Mean: calculateSviMean
  });
  });
  //Sort and select for the highest and lowest SVI mean
  var selectLowest =  sviMeanCollection.limit(amountWorstBestImages, 'SVI_Mean');
  print(amountWorstBestImages+' images with lowest SVI mean ',selectLowest);
  var selectHighest =  sviMeanCollection.limit(amountWorstBestImages, 'SVI_Mean', false);
  print(amountWorstBestImages+' images with highest SVI mean ',selectHighest);
  //Add image with the highest and lowest SVI to the map
  Map.addLayer(selectLowest.first(), SviVis, 'SVI with lowest mean '+selectLowest.first().get('startDate').getInfo()+' to '+selectLowest.first().get('endDate').getInfo(), false);
  Map.addLayer(selectHighest.first(), SviVis, 'SVI with highest mean '+selectHighest.first().get('startDate').getInfo()+' to '+selectHighest.first().get('endDate').getInfo(), false);
  //Add the requested amount of images with highest and lowest SVI to dowload list
  var batch = require('users/fitoprincipe/geetools:batch');
  batch.Download.ImageCollection.toDrive(selectLowest, "SVI_ImageCollection",{
    name: 'Lowest_SVI_{startDate}-{endDate}',
    scale: resolution,
    region: AOI
  });
  batch.Download.ImageCollection.toDrive(selectHighest, "SVI_ImageCollection",{
    name: 'Highest_SVI_{startDate}-{endDate}',
    scale: resolution,
    region: AOI
  });
}
//************************************************************************************************* 
print('Final Image Collection:', FinalCollection);
//Add exports to tasks tab
var batch = require('users/fitoprincipe/geetools:batch');
var ImageCollectionForExport = FinalCollection.select(['SVI']).filterDate(startDateForDownload, endDateForDownload);
print('Selected Images for Export',ImageCollectionForExport);
batch.Download.ImageCollection.toDrive(ImageCollectionForExport, "SVI_ImageCollection",{
  name: 'SVI_{startDate}-{endDate}',
  scale: resolution,
  region: AOI
});
//=====================================================================================================
//                                          DISCLAIMER
//Map disclaimer
//The designations employed and the presentation of the material on this map do not imply the expression 
//of any opinion whatsoever on the part of the Secretariat of the United Nations concerning the legal status 
//of any country, territory, city or area or of its authorities, or concerning the delimitation of its 
//frontiers or boundaries.
//Every effort is made to ensure this map is free of errors but there is no warrant the map or its 
//features are either spatially or temporally accurate or fit for a particular use. This map is provided 
//without any warranty of any kind whatsoever, either express or implied.
//When providing a large AOI or calculating the images with the highest or lowest SVI, the browser might
//signalise, that Google Earth Engine is not giving any replies. Press 'wait' in order to keep on 
//running the script. It might take a couple of minutes to complete all calculations.
//When adjusting the visualisation parameters in the 'Layers' menu, the information within the legends
//will not change automatically. Import the new visualisation settings, delete the predefined parameters
//from the 'Imports' section and rename your new parameters to the same name, that was used by 
//the default parameter.