//================================================= INPUT SETTINGS ======================================================= 
// Input variables
var StartYear = 1985;
//var EndYear = ee.Date(Date.now()).format('yyyy').getInfo();
var EndYear = 2022;
//========================================== IMPORT FUNCTIONS ======================================================= 
var inputLandsat = require('users/ricardogeo/functions:Utilities/function_prepareLandsat_dinamic (C2)');
var LandsatAET = require('users/ricardogeo/functions:Landsat_AET/1_functionAET');
var LandsatSSEBop = require('users/ricardogeo/functions:SSEBop/1_functionSSEBop (C2)');
var LandsatSSEB = require('users/ricardogeo/functions:SSEB/1_functionSSEB (C2)');
var LandsatSSEBI = require('users/ricardogeo/functions:S-SEBI/1_functionS-SEBI (C2)');
var LandsatSEBAL = require('users/ricardogeo/functions:SEBAL/1_functionSEBAL (C2)');
//var LandsatMETRIC = require('users/ricardogeo/functions:METRIC/1_functionMETRIC (C2)');
var LandsatMETRIC = require('users/ricardogeo/functions:METRIC/1_functionMETRIC_Monthly (C2)');
var LandsatCMRSET = require('users/ricardogeo/functions:CMRSET_V2/1_functionCMRSET_V2');
var cosi = require('users/ricardogeo/functions:Utilities/function_cosi');
var refET = require('users/ricardogeo/functions:Utilities/function_referenceET');
var exportData = require('users/ricardogeo/functions:Utilities/function_exportData');
var inputDateList = require('users/ricardogeo/functions:Utilities/function_DateList');
var aggregData = require('users/ricardogeo/functions:Utilities/function_aggregate_image');
//========================================== DATE LIST ======================================================= 
var datelistDay = inputDateList.getDayDate(1985,2020,'yyyy-MM-dd');
//========================================== IMPORT PRE-COMPUTED DATA ======================================================= 
var ET0 = ee.Image('projects/ee-ricardogeo/assets/ERA5_Land/ET0_Daily_BR_1985_2020');
//Convert datasets to Collection
var ET0_col = inputDateList.img2col(datelistDay,ET0, 'grass_reference_ET');
// ======================================== VISUALIZATION PARAMETERS =============================================
// Visualization parameters
var True_Color = {bands: ['red', 'green', 'blue'],min: 0,max: 0.12};
var False_Color = {bands: ['swir1', 'nir', 'red'],min: 0,max: 0.5};
var True_Color_DN = {bands: ['red', 'green', 'blue'],min: 0,max: 1200};
var False_Color_DN = {bands: ['swir1', 'nir', 'red'],min: 0,max: 5000};
//var ETa_Palette = ['#CA5C25','#BA8949', '#F6CD6C','#E0FF8B', '#90F24F', '#0AC16C','#068A3B','#23548B'];
var ETa_Palette = ['#B59B75','#D8C689','#FEF3AC', '#78D062','#1c8591', '#0B2F7A'];
var LE_Palette = ['#8B0000','#FF0000','#FFEFD5', '#B0E0E6','#6495ED', '#00008B'];
//var ETf_Palette = ['#B59B75','#D8C689','#FEF3AC', '#78D062','#1c8591', '#0B2F7A'];
var ETf_Palette = ['#8B0000','#FF0000','#FFEFD5', '#B0E0E6','#6495ED', '#00008B'];
var QA_Palette = ['Green','Lime','Yellow', 'Orange','Tomato','Red', 'Maroon','Black'];
var visET = {min: 0, max: 8, palette: ETa_Palette};
var visEF = {min: 0, max: 1, palette: ETf_Palette};
var visLE = {min: 0, max: 200, palette: LE_Palette};
// Define function to get and rename Landsat C2 bands of interest from OLI, ETM and TM.
var renameOLI = function(img) {
  return img.select(
		['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7','ST_B10','ST_TRAD', 'QA_PIXEL'],
		['blue','green','red','nir','swir1','swir2','ST','TRAD', 'pixel_qa']
	);
};
var renameETM = function(img) {
  return img.select(
		['SR_B1','SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7','ST_B6','ST_TRAD', 'QA_PIXEL'],
		['blue','green','red','nir','swir1','swir2','ST','TRAD', 'pixel_qa']
	);
};
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
//mapPanel.setOptions('baseChange', {'baseChange': baseChange});
mapPanel.style().set('cursor', 'crosshair');
mapPanel.setCenter(-49.18, -13.86, 5);
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '50',
  fontSize: '25px',
  padding: '5px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontSize: '16px',
  fontWeight: '50',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
  var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '60%',
      width: '500px',
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
  // Add the app title to the side panel
  var titleLabel = ui.Label('Landsat-based actual evapotranspiration algorithms', TITLE_STYLE);
  mainPanel.widgets().set(1, titleLabel);
  // Add the app description to the main panel
  var descriptionText =
      'This application computes daily actual evapotranspiration (AET) and daily evaporative fraction (EF) ' +
      'based on Landsat surface reflectance collection 2 and ERA5-Land climate reanalysis data. ' +
      'Ten algorithms were used to compute AET and EF, which can be viewed as an ensemble data or separately '  + 
      'for each algorithm. Please follow the steps below to run the tool:';
  var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
  mainPanel.widgets().set(2, descriptionLabel);
  var firstSubTitle_text = '1) Select the Start and End dates';
  var firstSubTitle = ui.Label(firstSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(3, firstSubTitle);
   var firstSubParagraph_text = 'The tool will search for images between these dates and'+
                                 ' select the one with the lowest cloud coverage.'+
                                 ' Date format must be: YYYY-MM-DD.';
   var firstSubParagraph = ui.Label(firstSubParagraph_text, SUBPARAGRAPH_STYLE);
   mainPanel.widgets().set(4, firstSubParagraph);
   //Get Today's date and pass it as default End date. 
//  var startDate = ui.Textbox({placeholder: 'Enter Start date here...',value: ee.Date(Date.now()).advance(-1,'month').format('yyyy-MM-dd').getInfo()});
//  var endDate = ui.Textbox({placeholder: 'Enter End date here...',value: ee.Date(Date.now()).format('yyyy-MM-dd').getInfo()});
  var startDate = ui.Textbox({placeholder: 'Enter Start date here...',value: '2021-01-01'});
  var endDate = ui.Textbox({placeholder: 'Enter End date here...',value: '2021-02-01'});
  mainPanel.widgets().set(5, startDate);
  mainPanel.widgets().set(6, endDate);
  var secondSubTitle_text = '2) Center and zoom the Map on your area of interest';
  var secondSubTitle = ui.Label(secondSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(7, secondSubTitle);
  var thirdSubTitle_text = '3) Click on RUN button below to show a selected Landsat scene';
  var thirdSubTitle = ui.Label(thirdSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(8, thirdSubTitle);
// Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//=================================================== COLOR BARS ======================================================
// Function to Creates a color bar thumbnail image for use in legends from the given color palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bars for the legends.
// Build color bars
var colorBarET = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 4px', maxHeight: '12px'},
});
var colorBarEF = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETf_Palette),
  style: {stretch: 'horizontal', margin: '0px 4px', maxHeight: '12px'},
});
// Create Trend legend title
var legendTitleET = ui.Label({
  value: 'actual evapotranspiration (AET)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 17px 4px 17px',
    padding: '0px',
    }
});
var legendTitleEF = ui.Label({
  value: 'evaporative fraction (EF)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 39px 4px 39px',
    padding: '0px',
    }
});
// Build Trend legend
var legendLabelsET = ui.Panel({
      widgets: [
        ui.Label('0'),
        ui.Label(('mm.d-1'),{textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('8.0')
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
var legendLabelsEF = ui.Panel({
      widgets: [
        ui.Label('0'),
        ui.Label((''),{textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('1')
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
var legendEF = ui.Panel([legendTitleEF, colorBarEF, legendLabelsEF]);
  legendEF.style().set('position','bottom-right');
var legendET = ui.Panel([legendTitleET, colorBarET, legendLabelsET]);
  legendET.style().set('position','bottom-right');
//=================================================== INSERT CHARTS ======================================================
// Register a callback on the default map to be invoked when the map is clicked.
var generateChartET = function(ModelName,panelMap,order,map,unit,year){
  panelMap.onClick(function(coords) {
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
//    var buffer = point.buffer(50).bounds(); 
    var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
    panelMap.layers().set(50, dot);
    // Create an Annual ET chart.
    var ETChart = ui.Chart.image.series(map.getEeObject(), point, ee.Reducer.first(), 10);
//    var ETChart = ui.Chart.image.series(map, point, ee.Reducer.first(), 15);
    ETChart.setChartType('ComboChart').setOptions({
//    ETChart.setChartType('LineChart').setOptions({
      title: 'Landsat-based daily actual ET - '+ModelName+' ('+year+')',
      vAxis: {title: unit},
      hAxis:{title: 'date',format:'MMM-yyyy'},
      colors: ['Red','Lime'],
      seriesType: 'line',
      series: {0: {lineWidth: 1,pointSize: 7,pointShape:'diamond'}, 1: {lineWidth: 1,pointSize: 0.5}},
      });
    mainPanel.widgets().set(order, ETChart);
  });
};
var generateChartEF = function(ModelName,panelMap,order,map,unit,year){
  panelMap.onClick(function(coords) {
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
    // Create an Annual EF chart.
    var EFChart = ui.Chart.image.series(map.getEeObject(), point, ee.Reducer.first(), 10);
//    var EFChart = ui.Chart.image.series(map, point, ee.Reducer.first(), 15);
//    EFChart.setChartType('ComboChart').setOptions({
    EFChart.setChartType('LineChart').setOptions({
      title: 'Landsat-based daily evaporative fraction - '+ModelName+' ('+year+')',
      vAxis: {title: unit},
      hAxis:{title: 'date',format:'MMM-yyyy'},
      colors: ['Green'],
      seriesType: 'line',
      lineWidth: 1,
      pointSize: 7,
      pointShape:'square'
      });
    mainPanel.widgets().set(order, EFChart);
  });
};
var generateChartMERGE = function(panelMap,order,map,year){
  panelMap.onClick(function(coords) {
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
//    panelMap.layers().set(50, dot);
    // Create an Annual ET chart.
    var MERGEChart = ui.Chart.image.series(map.getEeObject(), point, ee.Reducer.first(), 5);
//    var MERGEChart = ui.Chart.image.series(map, point, ee.Reducer.first(), 15);
    MERGEChart.setChartType('LineChart').setOptions({
      title: 'Landsat-based merged daily EF and AET ('+year+')',
      series: {
       0: {targetAxisIndex: 0},
       1: {targetAxisIndex: 1}
      },
      vAxes: {
          // Adds titles to each axis.
          0: {title: 'evaporative fraction'},
          1: {title: 'actual ET (mm.d-1)'}
        },
      hAxis:{title: 'date'},
      colors: ['Green','Red'],
      seriesType: 'line',
      lineWidth: 1,
      pointSize: 3,
      });
    mainPanel.widgets().set(order, MERGEChart);
  });
};
//================================================= INSPECT MAP VALUES ============================================
var pointvalue = function(panelMap,panel,order,map,modelName,bandName,timeString,decimal,unit){
  panelMap.onClick(function(coords) {
    panel.clear();
    panel.widgets().set(0, ui.Label({
            value: 'Loading...',
            style: {color: 'gray'}
          }));
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var data = map.sample(point, 30).first().get(bandName);
    data.evaluate(function(result) {panel.widgets().set(order, ui.Label({
              value: modelName+' '+bandName+': ' + result.toFixed(decimal)+' '+unit+timeString,
              style:{margin:'2px'}
    })); });
})};
//================================================= COMPUTE SELECT DATA =============================================================
// Create UI Buttons
var RUN_Button = ui.Button({label: 'RUN',style: {width:'215px',textAlign:'center'}});
var EXPORT_Button = ui.Button({label: 'EXPORT',style: {width:'140px',textAlign:'center'}});// NOT USED
var CLEAR_Button = ui.Button({label: 'CLEAR MAP',style: {width:'215px',textAlign:'center'}});
var RUN_ENSEMBLE = ui.Button({label: 'ENSEMBLE',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_METRIC = ui.Button({label: 'METRIC',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SSEBop = ui.Button({label: 'SSEBop',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
//var RUN_SSEB = ui.Button({label: 'SSEB',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SSEBI = ui.Button({label: 'S-SEBI',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SEBAL = ui.Button({label: 'SEBAL',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_PTJPL = ui.Button({label: 'PT-JPL',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_MSPT = ui.Button({label: 'MS-PT',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_VPDPT = ui.Button({label: 'VPD-PT',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SWIPT = ui.Button({label: 'SWI-PT',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SPT = ui.Button({label: 'SPT',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SEMIPM = ui.Button({label: 'SEMI-PM',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_SIM = ui.Button({label: 'SIM',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var RUN_CMRSET = ui.Button({label: 'CMRSET',style: {width:'120px',textAlign:'center',padding:'0px',border:'1px solid black'}});
var listModels = ['METRIC','SSEBop','S-SEBI','SEBAL','PT-JPL','MS-PT','VPD-PT','SWI-PT','SEMI-PM','SIM','CMRSET'];
var SetDataNames = function(prefix){
  var listData = listModels;
  return listData.map(function(list){return ee.String(prefix+'_').cat(list)});
};
RUN_Button.onClick(function() {
//  prompt('Go to Task tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  // Define download area
  var coords = ee.Geometry(mapPanel.getBounds(true)).centroid(1).coordinates();
  var lon = ee.Number(coords.get(0));
  var lat = ee.Number(coords.get(1));
  var lonDist = 0.35;
  var latDist = 0.35;
  var areaDeDownload = ee.Geometry.Rectangle([lon.subtract(lonDist),
                                              lat.subtract(latDist),
                                              lon.add(lonDist),
                                              lat.add(latDist)]);
  var quadroImg = ee.FeatureCollection(areaDeDownload).style({
      width:2,
      fillColor:'00000000',
      lineType:'dotted',
    });
  //Define dates
  var date_start = startDate.getValue();
  var date_end = endDate.getValue();
  // Landsat collections
  var L5_col = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
//      .filterDate(date_start, date_end)
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameETM);
  var L7_col = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
//      .filterDate(date_start, date_end)
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameETM);
  var L8_col = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
//      .filterDate(date_start, date_end)
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameOLI);
  // Landsat collections
  var Landsat_Collection = L5_col.merge(L7_col).merge(L8_col).sort('system:time_start', true);
  var Landsat_SR_Collection_SELECT = Landsat_Collection.filterDate(date_start, date_end)
    .sort('CLOUD_COVER_LAND');
  // Selected Landsat scene  
  var Landsat = ee.ImageCollection(Landsat_SR_Collection_SELECT.first());
  // Create an ee.Date from Landsat scene
  var date = ee.Date(Landsat.first().get('system:time_start')).format('yyyy-MM-dd');
  var date_asset = ee.Date(Landsat.first().get('system:time_start')).format('yyyyMMdd');
  // Get Landsat WRS scene
  var Path = Landsat.first().get('WRS_PATH').getInfo();
  var Row = Landsat.first().get('WRS_ROW').getInfo();
  var PathRow = Path+'-'+Row;
  // Get Landsat ID
  var Satellite = Landsat.first().get('SPACECRAFT_ID').getInfo();
  // Create AOI's from Landsat scene
  var AOI_Landsat = Landsat_Collection.geometry().dissolve();
  // Filter by Year of selected data
  var selected_year = ee.Date(Landsat.first().get('system:time_start')).format('YYYY');
  var selected_year_n = ee.Number.parse(selected_year);
  var Landsat_year = Landsat_Collection.filterDate(
    selected_year.getInfo()+'-01-01', selected_year.getInfo()+'-12-31');
  // Create Annual Date List
  var LandsatcolMask = Landsat_year
    .map(function(img){
      var d = ee.Date(ee.Number(img.get('system:time_start')));
      var date = d.format('yyyy-MM-dd');
      return img.set({'Landsat_date':date})});
  var LandsatDateList = ee.List(LandsatcolMask.aggregate_array('Landsat_date'));
  var FullDateList = inputDateList.getDayDate(selected_year,selected_year,'yyyy-MM-dd');
  // Filter annual ET0
  var ET0_year = ET0_col.filterDate(
    selected_year.getInfo()+'-01-01', selected_year.getInfo()+'-12-31');
  var input_data = Landsat
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatAET.LCaggreg)
  .map(LandsatAET.computeVegInd)
  .map(LandsatAET.computeMETEO);
  var annual_data = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatAET.LCaggreg)
  .map(LandsatAET.computeVegInd)
  .map(LandsatAET.computeMETEO);
  // Maximum FAPAR - Compute StartYear to EndYear maximum fAPAR
  var FAPARmax = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatAET.computeVegInd)
  .select('fAPAR')
  .reduce(ee.Reducer.max(), 4);
  input_data = input_data.map(function(img){return img.addBands(FAPARmax.rename('FAPARmax'))});
  annual_data = annual_data.map(function(img){return img.addBands(FAPARmax.rename('FAPARmax'))});
  // Compute AET models - Landsat date
  var input_METRIC = Landsat
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatMETRIC.spec_ind)
  .map(LandsatMETRIC.computeAlbedo)
  .map(LandsatMETRIC.computeLST)
  .map(LandsatMETRIC.computeMETEO)
//  .map(cosi.compute_cosi) // INACTIVATE FOR MONTHLY APPLICATIONS
//  .map(cosi.compute_cosi_24h) // INACTIVATE FOR MONTHLY APPLICATIONS
  .map(LandsatMETRIC.computeRn)
  .map(LandsatMETRIC.computeHotCold)
//  .map(LandsatMETRIC.computeCrad) // INACTIVATE FOR MONTHLY APPLICATIONS
  .map(refET.computePET_inst)
  .map(refET.computePET_daily)
  .map(LandsatMETRIC.compute_H)
  .map(LandsatMETRIC.computeET);
  var input_SSEBop = Landsat
    .map(inputLandsat.fmask)
    .map(inputLandsat.applyScaleFactors)
    .map(LandsatSSEBop.spec_ind)
    .map(LandsatSSEBop.computeLST)
    .map(refET.computePET_daily)
    .map(LandsatSSEBop.compute_dT)
    .map(LandsatSSEBop.computeSSEBop);
  var input_SEBAL = Landsat
    .map(inputLandsat.fmask)
    .map(inputLandsat.applyScaleFactors)
    .map(LandsatSEBAL.spec_ind)
    .map(LandsatSEBAL.computeAlbedo)
    .map(LandsatSEBAL.computeLST)
    .map(LandsatSEBAL.computeMETEO)
    .map(LandsatSEBAL.computeHotCold)
    .map(LandsatSEBAL.computeRn)
    .map(LandsatSEBAL.compute_H)
    .map(LandsatSEBAL.computeET);
  var input_CMRSET = Landsat
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatCMRSET.computeInd)
  .map(LandsatCMRSET.computeAET);
  var input_SSEB = Landsat
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSSEB.spec_ind)
  .map(LandsatSSEB.computeLST)
  .map(LandsatSSEB.computeHotCold)
  .map(refET.computePET_daily)
  .map(LandsatSSEB.computeET);
  var input_SSEBI = Landsat
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSSEBI.spec_ind)
  .map(LandsatSSEBI.computeAlbedo)
  .map(LandsatSSEBI.computeLST)
  .map(LandsatSSEBI.computeMETEO)
  .map(LandsatSSEBI.computeRn)
  .map(LandsatSSEBI.computeDryWet)
  .map(LandsatSSEBI.computeET);
  var input_PTJPL = input_data.map(LandsatAET.computePTJPL);
  var input_MSPT = input_data.map(LandsatAET.computeMSPT);
  var input_VPDPT = input_data.map(LandsatAET.computeVPDPT);
  var input_SWIPT = input_data.map(LandsatAET.computeSWIPT);
  var input_SPT = input_data.map(LandsatAET.computeSPT);
  var input_SEMIPM = input_data.map(LandsatAET.computeSEMI_PM);
  var input_SIM = input_data.map(LandsatAET.computeSIM);
  // Compute AET models - Annual time-step 
  var annual_METRIC = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatMETRIC.spec_ind)
  .map(LandsatMETRIC.computeAlbedo)
  .map(LandsatMETRIC.computeLST)
  .map(LandsatMETRIC.computeMETEO)
//  .map(cosi.compute_cosi) // INACTIVATE FOR MONTHLY APPLICATIONS
//  .map(cosi.compute_cosi_24h) // INACTIVATE FOR MONTHLY APPLICATIONS
  .map(LandsatMETRIC.computeRn)
  .map(LandsatMETRIC.computeHotCold)
//  .map(LandsatMETRIC.computeCrad) // INACTIVATE FOR MONTHLY APPLICATIONS
  .map(refET.computePET_inst)
  .map(refET.computePET_daily)
  .map(LandsatMETRIC.compute_H)
  .map(LandsatMETRIC.computeET);
  var annual_SSEBop = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSSEBop.spec_ind)
  .map(LandsatSSEBop.computeLST)
  .map(refET.computePET_daily)
  .map(LandsatSSEBop.compute_dT)
  .map(LandsatSSEBop.computeSSEBop);
  var annual_SEBAL = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSEBAL.spec_ind)
  .map(LandsatSEBAL.computeAlbedo)
  .map(LandsatSEBAL.computeLST)
  .map(LandsatSEBAL.computeMETEO)
  .map(LandsatSEBAL.computeHotCold)
  .map(LandsatSEBAL.computeRn)
  .map(LandsatSEBAL.compute_H)
  .map(LandsatSEBAL.computeET);
  var annual_CMRSET = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatCMRSET.computeInd)
  .map(LandsatCMRSET.computeAET);
  var annual_SSEB = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSSEB.spec_ind)
  .map(LandsatSSEB.computeLST)
  .map(LandsatSSEB.computeHotCold)
  .map(refET.computePET_daily)
  .map(LandsatSSEB.computeET);
  var annual_SSEBI = Landsat_year
  .map(inputLandsat.fmask)
  .map(inputLandsat.applyScaleFactors)
  .map(LandsatSSEBI.spec_ind)
  .map(LandsatSSEBI.computeAlbedo)
  .map(LandsatSSEBI.computeLST)
  .map(LandsatSSEBI.computeMETEO)
  .map(LandsatSSEBI.computeRn)
  .map(LandsatSSEBI.computeDryWet)
  .map(LandsatSSEBI.computeET);
  var annual_PTJPL = annual_data.map(LandsatAET.computePTJPL);
  var annual_MSPT = annual_data.map(LandsatAET.computeMSPT);
  var annual_VPDPT = annual_data.map(LandsatAET.computeVPDPT);
  var annual_SWIPT = annual_data.map(LandsatAET.computeSWIPT);
  var annual_SPT = annual_data.map(LandsatAET.computeSPT);
  var annual_SEMIPM = annual_data.map(LandsatAET.computeSEMI_PM);
  var annual_SIM = annual_data.map(LandsatAET.computeSIM);
  // Extract daily variables
  var merge_ETd = input_METRIC.select('ETd')
  .combine(input_SSEBop.select('ETd'))
  .combine(input_SSEBI.select('ETd'))
  .combine(input_SEBAL.select('ETd'))
  .combine(input_PTJPL.select('ETd'))
  .combine(input_MSPT.select('ETd'))
  .combine(input_VPDPT.select('ETd'))
  .combine(input_SWIPT.select('ETd'))
//  .combine(input_SPT.select('ETd'))
  .combine(input_SEMIPM.select('ETd'))
  .combine(input_SIM.select('ETd'))
  .combine(input_CMRSET.select('ETd'))
    .map(function(img){
      return img.rename(listModels);
  });
  var merge_EF = input_METRIC.select('EF')
  .combine(input_SSEBop.select('EF'))
  .combine(input_SSEBI.select('EF'))
  .combine(input_SEBAL.select('EF'))
  .combine(input_PTJPL.select('EF'))
  .combine(input_MSPT.select('EF'))
  .combine(input_VPDPT.select('EF'))
  .combine(input_SWIPT.select('EF'))
//  .combine(input_SPT.select('EF'))
  .combine(input_SEMIPM.select('EF'))
  .combine(input_SIM.select('EF'))
  .combine(input_CMRSET.select('Kc'))
    .map(function(img){
      return img.rename(listModels);
  });
  // From merged ETd, remove outliers and create a ensemble average ETd   
  var Ensemble_ETd = merge_ETd.map(function(img){
//  var mask = img.clamp(1,1);
    var AET_mean = img.reduce(ee.Reducer.mean());
//  var AET_median = img.reduce(ee.Reducer.median());
//  var AET_min = img.reduce(ee.Reducer.min());
//  var AET_max = img.reduce(ee.Reducer.max());
    var AET_count = img.reduce(ee.Reducer.count());
    var AET_sd = ((img.subtract(AET_mean)).pow(2))
      .reduce(ee.Reducer.sum()).divide(AET_count).sqrt();
    var AET_cv = AET_sd.divide(AET_mean);
    var diff = (img.subtract(AET_mean).rename(SetDataNames('diff'))).abs();
    var max_diff = diff.reduce(ee.Reducer.max());
    var diff_rank = diff.divide(max_diff).rename(SetDataNames('rank_diff'));
    var diff_mask = (diff_rank.neq(1)).rename(SetDataNames('mask_diff'));
    var CV_Lim1 = AET_mean.expression('0.5+0.15*(10-ET)',{'ET':AET_mean}); 
    var CV_Lim2 = 0.5;
    var CV_Limit = ee.Image(CV_Lim2).where(AET_mean.lt(10),CV_Lim1);
    var NoOutlier = AET_cv.lte(CV_Limit);
    var Outl_remov = NoOutlier.add(diff_mask).selfMask();
    var AET_mean_final = img.multiply(Outl_remov.gte(1))
      .reduce(ee.Reducer.mean());
    return AET_mean_final.rename('AET_mean_final')
      .copyProperties(img,img.propertyNames());
    }).sort('system:time_start', true);
  var AET_mean = Ensemble_ETd.select('AET_mean_final').toBands().rename('AET');
//  var AET_mean = merge_ETd.toBands().rename(['METRIC','SSEBop','SSEB','SEBAL','PT-JPL','MS-PT','VPD-PT','SEMI-PM','SIM','CMRSET'])
//    .reduce(ee.Reducer.mean()).rename('ETd_mean');
    // From merged EF, remove outliers and create a ensemble average EF   
  var Ensemble_EF = merge_EF.map(function(img){
//  var mask = img.clamp(1,1);
    var EF_mean = img.reduce(ee.Reducer.mean());
//  var EF_median = img.reduce(ee.Reducer.median());
//  var EF_min = img.reduce(ee.Reducer.min());
//  var EF_max = img.reduce(ee.Reducer.max());
    var EF_count = img.reduce(ee.Reducer.count());
    var EF_sd = ((img.subtract(EF_mean)).pow(2))
      .reduce(ee.Reducer.sum()).divide(EF_count).sqrt();
    var EF_cv = EF_sd.divide(EF_mean);
    var diff = (img.subtract(EF_mean).rename(SetDataNames('diff'))).abs();
    var max_diff = diff.reduce(ee.Reducer.max());
    var diff_rank = diff.divide(max_diff).rename(SetDataNames('rank_diff'));
    var diff_mask = (diff_rank.neq(1)).rename(SetDataNames('mask_diff'));
    var CV_Lim1 = EF_mean.expression('0.5+0.15*(10-EF)',{'EF':EF_mean}); 
    var CV_Lim2 = 0.5;
    var CV_Limit = ee.Image(CV_Lim2).where(EF_mean.lt(10),CV_Lim1);
    var NoOutlier = EF_cv.lte(CV_Limit);
    var Outl_remov = NoOutlier.add(diff_mask).selfMask();
    var EF_mean_final = img.multiply(Outl_remov.gte(1))
      .reduce(ee.Reducer.mean());
    return EF_mean_final.rename('EF_mean_final')
      .copyProperties(img,img.propertyNames());
    }).sort('system:time_start', true);
  var EF_mean = Ensemble_EF.select('EF_mean_final').toBands().rename('EF');
//  var EF_mean = merge_EF.toBands().rename(['METRIC','SSEBop','SSEB','SEBAL','PT-JPL','MS-PT','VPD-PT','SEMI-PM','SIM','CMRSET'])
//    .reduce(ee.Reducer.mean()).rename('EF_mean');
  // Extract annual variables
  var annual_ETd = annual_METRIC.select('ETd')
  .combine(annual_SSEBop.select('ETd'))
  .combine(annual_SSEBI.select('ETd'))
  .combine(annual_SEBAL.select('ETd'))
  .combine(annual_PTJPL.select('ETd'))
  .combine(annual_MSPT.select('ETd'))
  .combine(annual_VPDPT.select('ETd'))
  .combine(annual_SWIPT.select('ETd'))
//  .combine(annual_SPT.select('ETd'))
  .combine(annual_SEMIPM.select('ETd'))
  .combine(annual_SIM.select('ETd'))
  .combine(annual_CMRSET.select('ETd'))
    .map(function(img){
      return img.rename(['METRIC','SSEBop','S-SEBI','SEBAL','PT-JPL','MS-PT','VPD-PT','SWI-PT','SEMI-PM','SIM','CMRSET']);
  });
  var annual_EF = annual_METRIC.select('EF')
  .combine(annual_SSEBop.select('EF'))
  .combine(annual_SSEBI.select('EF'))
  .combine(annual_SEBAL.select('EF'))
  .combine(annual_PTJPL.select('EF'))
  .combine(annual_MSPT.select('EF'))
  .combine(annual_VPDPT.select('EF'))
  .combine(annual_SWIPT.select('EF'))
//  .combine(annual_SPT.select('EF'))
  .combine(annual_SEMIPM.select('EF'))
  .combine(annual_SIM.select('EF'))
  .combine(annual_CMRSET.select('Kc'))
    .map(function(img){
      return img.rename(['METRIC','SSEBop','S-SEBI','SEBAL','PT-JPL','MS-PT','VPD-PT','SWI-PT','SEMI-PM','SIM','CMRSET']);
  });
  var mean_annual_ETd = annual_ETd.map(function(img){
    return img.select(['METRIC','SSEBop','S-SEBI','SEBAL','PT-JPL','MS-PT','VPD-PT','SWI-PT','SEMI-PM','SIM','CMRSET'])
    .reduce(ee.Reducer.mean()).rename('ETd').copyProperties(img,img.propertyNames());
  });
  var mean_annual_EF = annual_EF.map(function(img){
    return img.select(['METRIC','SSEBop','S-SEBI','SEBAL','PT-JPL','MS-PT','VPD-PT','SWI-PT','SEMI-PM','SIM','CMRSET'])
    .reduce(ee.Reducer.mean()).rename('EF').copyProperties(img,img.propertyNames());
  });
  var merged_EF_AET = mean_annual_ETd.combine(mean_annual_EF);
  // Export to Drive
  // Create GeoJSON region to export results to GOOGLE DRIVE
  var AOI_bounds = ee.Geometry.Polygon({
    'coords': AOI_Landsat.bounds().coordinates(),
    'geodesic':false
    });
  var Xmin = ee.List(ee.List(AOI_bounds.coordinates().get(0)).get(0)).getNumber(0).getInfo();
  var Ymin = ee.List(ee.List(AOI_bounds.coordinates().get(0)).get(0)).getNumber(1).getInfo();
  var Xmax = ee.List(ee.List(AOI_bounds.coordinates().get(0)).get(2)).getNumber(0).getInfo();
  var Ymax = ee.List(ee.List(AOI_bounds.coordinates().get(0)).get(2)).getNumber(1).getInfo();
//  var region = ee.Geometry.BBox(Xmin, Ymin, Xmax, Ymax);
  var region = AOI_Landsat.getInfo();
  var CellSize = Landsat.first().projection().nominalScale().getInfo();
//  pointvalue(mapPanel,inspector,0,input_METRIC.select('ETd').first(),'METRIC','ETd','d',2,'mm');
//  pointvalue(mapPanel,inspector,1,input_SSEBop.select('ETd').first(),'SSEBop','ETd','d',2,'mm');
//  pointvalue(mapPanel,inspector,2,input_SSEB.select('ETd').first(),'SSEB','ETd','d',2,'mm');
//  pointvalue(mapPanel,inspector,1,AET_mean,'Ensemble','AET','/d',2,'mm');
//  pointvalue(mapPanel,inspector,0,EF_mean,'Ensemble','EF','',2,'');
  // insert title on Map
  mapPanel.add(ui.Label('Date: '+date.getInfo()+' / satellite: '+Satellite+' / WRS: '+PathRow));
  // Models ET results
  RUN_ENSEMBLE.style().set('position','bottom-left');
  RUN_METRIC.style().set('position','bottom-left');
  RUN_SSEBop.style().set('position','bottom-left');
//  RUN_SSEB.style().set('position','bottom-left');
  RUN_SSEBI.style().set('position','bottom-left');
  RUN_SEBAL.style().set('position','bottom-left');
  RUN_PTJPL.style().set('position','bottom-left');
  RUN_MSPT.style().set('position','bottom-left');
  RUN_VPDPT.style().set('position','bottom-left');
  RUN_SWIPT.style().set('position','bottom-left');
//  RUN_SPT.style().set('position','bottom-left');
  RUN_SEMIPM.style().set('position','bottom-left');
  RUN_SIM.style().set('position','bottom-left');
  RUN_CMRSET.style().set('position','bottom-left');
  mapPanel.add(RUN_ENSEMBLE);
  mapPanel.add(RUN_METRIC);
  mapPanel.add(RUN_SSEBop);
//  mapPanel.add(RUN_SSEB);
  mapPanel.add(RUN_SSEBI);
  mapPanel.add(RUN_SEBAL);
  mapPanel.add(RUN_PTJPL);
  mapPanel.add(RUN_MSPT);
  mapPanel.add(RUN_VPDPT);
  mapPanel.add(RUN_SWIPT);
//  mapPanel.add(RUN_SPT);
  mapPanel.add(RUN_SEMIPM);
  mapPanel.add(RUN_SIM);
  mapPanel.add(RUN_CMRSET);
  RUN_ENSEMBLE.onClick(function() {
      var ETd_ENSEMBLE = ui.Map.Layer(AET_mean.rename('ETd ENSEMBLE'),visET,'daily ENSEMBLE AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_ENSEMBLE = ui.Map.Layer(EF_mean.rename('EF ENSEMBLE'),visEF,'daily ENSEMBLE EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          AET_mean.rename('ETd_ENSEMBLE').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_ENSEMBLE_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          EF_mean.rename('EF_ENSEMBLE').float(),region,
          'Landsat_AET_fusion',
          'Landsat_ENSEMBLE_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(mean_annual_ETd.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(mean_annual_EF.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('ENSEMBLE',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('ENSEMBLE',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_ENSEMBLE);
      mapPanel.add(ETd_ENSEMBLE);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,AET_mean,'ENSEMBLE','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,EF_mean,'ENSEMBLE','EF','',2,'');
    });
  RUN_METRIC.onClick(function() {
      var ETd_METRIC = ui.Map.Layer(input_METRIC.select('ETd').toBands().rename('ETd METRIC'),visET,'daily METRIC AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_METRIC = ui.Map.Layer(input_METRIC.select('EF').toBands().rename('EF METRIC'),visEF,'daily METRIC EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_METRIC,{}, 'METRIC results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_METRIC.select('ETd').toBands().rename('ETd_METRIC').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_METRIC_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_METRIC.select('EF').toBands().rename('EF_METRIC').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_METRIC_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_METRIC.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_METRIC.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('METRIC',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('METRIC',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_METRIC);
      mapPanel.add(ETd_METRIC);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_METRIC.select('ETd').toBands().rename('AET'),'METRIC','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_METRIC.select('EF').toBands().rename('EF'),'METRIC','EF','',2,'');
    });
  RUN_SSEBop.onClick(function() {
      var ETd_SSEBop = ui.Map.Layer(input_SSEBop.select('ETd').toBands().rename('ETd SSEBop'),visET,'daily SSEBop AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SSEBop = ui.Map.Layer(input_SSEBop.select('EF').toBands().rename('EF SSEBop'),visEF,'daily SSEBop EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SSEBop,{}, 'SSEBop results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SSEBop.select('ETd').toBands().rename('ETd_SSEBop').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SSEBop_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SSEBop.select('EF').toBands().rename('EF_SSEBop').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SSEBop_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_SSEBop.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SSEBop.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('SSEBop',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SSEBop',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SSEBop);
      mapPanel.add(ETd_SSEBop);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SSEBop.select('ETd').toBands().rename('AET'),'SSEBop','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SSEBop.select('EF').toBands().rename('EF'),'SSEBop','EF','',2,'');
    });
  RUN_SSEBI.onClick(function() {
      var ETd_SSEBI = ui.Map.Layer(input_SSEBI.select('ETd').toBands().rename('ETd S-SEBI'),visET,'daily S-SEBI AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SSEBI = ui.Map.Layer(input_SSEBI.select('EF').toBands().rename('EF S-SEBI'),visEF,'daily S-SEBI EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SSEB,{}, 'S-SEBI results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SSEBI.select('ETd').toBands().rename('ETd_SSEBI').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SSEBI_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SSEBI.select('EF').toBands().rename('EF_SSEBI').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SSEBI_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_SSEBI.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SSEBI.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('SSEBI',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SSEBI',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SSEBI);
      mapPanel.add(ETd_SSEBI);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SSEBI.select('ETd').toBands().rename('AET'),'SSEBI','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SSEBI.select('EF').toBands().rename('EF'),'SSEBI','EF','',2,'');
    });
  RUN_SEBAL.onClick(function() {
      var ETd_SEBAL = ui.Map.Layer(input_SEBAL.select('ETd').toBands().rename('ETd SEBAL'),visET,'daily SEBAL AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SEBAL = ui.Map.Layer(input_SEBAL.select('EF').toBands().rename('EF SEBAL'),visEF,'daily SEBAL EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SEBAL,{}, 'SEBAL results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SEBAL.select('ETd').toBands().rename('ETd_SEBAL').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SEBAL_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SEBAL.select('EF').toBands().rename('EF_SEBAL').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SEBAL_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var downloadAET = input_SEBAL.select('ETd').toBands().rename('ETd_SEBAL').float().getDownloadURL({
                name: 'Landsat_SEBAL_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite,
                scale: CellSize,
                region: areaDeDownload,
              });
      var downloadEF = input_SEBAL.select('EF').toBands().rename('EF_SEBAL').float().getDownloadURL({
                name: 'Landsat_SEBAL_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite,
                scale: CellSize,
                region: areaDeDownload,
              });
      var downloadTextAET = ui.Label('Download AET (SEBAL)').setUrl(downloadAET);
      var downloadTextEF = ui.Label('Download EF (SEBAL)').setUrl(downloadEF);
      var downloadPanel = ui.Panel([downloadTextAET,downloadTextEF]);
      downloadPanel.style().set('position','middle-right');
      var annualETdMap = ui.Map.Layer(annual_SEBAL.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SEBAL.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('SEBAL',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SEBAL',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SEBAL);
      mapPanel.add(ETd_SEBAL);
//      mapPanel.widgets().set(3, downloadPanel);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SEBAL.select('ETd').toBands().rename('AET'),'SEBAL','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SEBAL.select('EF').toBands().rename('EF'),'SEBAL','EF','',2,'');
    });
  RUN_PTJPL.onClick(function() {
      var ETd_PTJPL = ui.Map.Layer(input_PTJPL.select('ETd').toBands().rename('ETd PT-JPL'),visET,'daily PT-JPL AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_PTJPL = ui.Map.Layer(input_PTJPL.select('EF').toBands().rename('EF PT-JPL'),visEF,'daily PT-JPL EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_PTJPL,{}, 'PT-JPL results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_PTJPL.select('ETd').toBands().rename('ETd_PTJPL').float(),region,
          'Landsat_AET_fusion',
          'Landsat_PTJPL_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_PTJPL.select('EF').toBands().rename('EF_PTJPL').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_PTJPL_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_PTJPL.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_PTJPL.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('PTJPL',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('PTJPL',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_PTJPL);
      mapPanel.add(ETd_PTJPL);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_PTJPL.select('ETd').toBands().rename('AET'),'PTJPL','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_PTJPL.select('EF').toBands().rename('EF'),'PTJPL','EF','',2,'');
    });
  RUN_MSPT.onClick(function() {
      var ETd_MSPT = ui.Map.Layer(input_MSPT.select('ETd').toBands().rename('ETd MS-PT'),visET,'daily MS-PT AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_MSPT = ui.Map.Layer(input_MSPT.select('EF').toBands().rename('EF MS-PT'),visEF,'daily MS-PT EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_MSPT,{}, 'MS-PT results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_MSPT.select('ETd').toBands().rename('ETd_MSPT').float(),region,
          'Landsat_AET_fusion',
          'Landsat_MSPT_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_MSPT.select('EF').toBands().rename('EF_MSPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_MSPT_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_MSPT.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_MSPT.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('MSPT',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('MSPT',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_MSPT);
      mapPanel.add(ETd_MSPT);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_MSPT.select('ETd').toBands().rename('AET'),'MSPT','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_MSPT.select('EF').toBands().rename('EF'),'MSPT','EF','',2,'');
    });
  RUN_VPDPT.onClick(function() {
      var ETd_VPDPT = ui.Map.Layer(input_VPDPT.select('ETd').toBands().rename('ETd VPD-PT'),visET,'daily VPD-PT AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_VPDPT = ui.Map.Layer(input_VPDPT.select('EF').toBands().rename('EF VPD-PT'),visEF,'daily VPD-PT EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_VPDPT,{}, 'VPD-PT results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_VPDPT.select('ETd').toBands().rename('ETd_VPDPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_VPDPT_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_VPDPT.select('EF').toBands().rename('EF_VPDPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_VPDPT_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_VPDPT.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_VPDPT.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('VPDPT',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('VPDPT',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_VPDPT);
      mapPanel.add(ETd_VPDPT);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_VPDPT.select('ETd').toBands().rename('AET'),'VPDPT','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_VPDPT.select('EF').toBands().rename('EF'),'VPDPT','EF','',2,'');
    });
  RUN_SWIPT.onClick(function() {
      var ETd_SWIPT = ui.Map.Layer(input_SWIPT.select('ETd').toBands().rename('ETd SWI-PT'),visET,'daily SWI-PT AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SWIPT = ui.Map.Layer(input_SWIPT.select('EF').toBands().rename('EF SWI-PT'),visEF,'daily SWI-PT EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SWIPT,{}, 'SWI-PT results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SWIPT.select('ETd').toBands().rename('ETd_SWIPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SWIPT_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SWIPT.select('EF').toBands().rename('EF_SWIPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SWIPT_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_SWIPT.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SWIPT.select('EF'),{}, 'annual_EF');
    // Insert Time-Series Plot
      generateChartET('SWIPT',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SWIPT',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SWIPT);
      mapPanel.add(ETd_SWIPT);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SWIPT.select('ETd').toBands().rename('AET'),'SWIPT','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SWIPT.select('EF').toBands().rename('EF'),'SWIPT','EF','',2,'');
    });
  RUN_SPT.onClick(function() {
      var ETd_SPT = ui.Map.Layer(input_SPT.select('ETd').toBands().rename('ETd SPT'),visET,'daily SPT AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SPT = ui.Map.Layer(input_SPT.select('EF').toBands().rename('EF SPT'),visEF,'daily SPT EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SPT,{}, 'SPT results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
          input_SPT.select('ETd').toBands().rename('ETd SPT').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SPT_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
          input_SPT.select('EF').toBands().rename('EF SPT').float(),region,
          'Landsat_AET_fusion',
          'Landsat_SPT_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SPT);
      mapPanel.add(ETd_SPT);
      //mapPanel.add(inputData);
    });
  RUN_SEMIPM.onClick(function() {
      var ETd_SEMIPM = ui.Map.Layer(input_SEMIPM.select('ETd').toBands().rename('ETd SEMI-PM'),visET,'daily SEMI-PM AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SEMIPM = ui.Map.Layer(input_SEMIPM.select('EF').toBands().rename('EF SEMI-PM'),visEF,'daily SEMI-PM EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SEMIPM,{}, 'SEMI-PM results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SEMIPM.select('ETd').toBands().rename('ETd_SEMIPM').float(),region,
          'Landsat_AET_fusion',
          'Landsat_SEMIPM_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SEMIPM.select('EF').toBands().rename('EF_SEMIPM').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SEMIPM_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_SEMIPM.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SEMIPM.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('SEMIPM',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SEMIPM',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SEMIPM);
      mapPanel.add(ETd_SEMIPM);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SEMIPM.select('ETd').toBands().rename('AET'),'SEMIPM','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SEMIPM.select('EF').toBands().rename('EF'),'SEMIPM','EF','',2,'');
    });
  RUN_SIM.onClick(function() {
      var ETd_SIM = ui.Map.Layer(input_SIM.select('ETd').toBands().rename('ETd SIM'),visET,'daily SIM AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_SIM = ui.Map.Layer(input_SIM.select('EF').toBands().rename('EF SIM'),visEF,'daily SIM EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_SIM,{}, 'SIM results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_SIM.select('ETd').toBands().rename('ETd_SIM').float(),region,
          'Landsat_AET_fusion',
          'Landsat_SIM_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_SIM.select('EF').toBands().rename('EF_SIM').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_SIM_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_SIM.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_SIM.select('EF'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('SIM',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('SIM',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_SIM);
      mapPanel.add(ETd_SIM);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_SIM.select('ETd').toBands().rename('AET'),'SIM','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_SIM.select('EF').toBands().rename('EF'),'SIM','EF','',2,'');
    });
  RUN_CMRSET.onClick(function() {
      var ETd_CMRSET = ui.Map.Layer(input_CMRSET.select('ETd').toBands().rename('ETd CMRSET'),visET,'daily CMRSET AET ('+date.getInfo()+')'+' - '+Satellite);
      var EF_CMRSET = ui.Map.Layer(input_CMRSET.select('Kc').toBands().rename('EF CMRSET'),visEF,'daily CMRSET EF ('+date.getInfo()+')'+' - '+Satellite,false);
      var inputData = ui.Map.Layer(input_CMRSET,{}, 'CMRSET results ('+date.getInfo()+')'+' - '+Satellite,false);
      var driveTaskETd = exportData.exportDrive(
      //var driveTaskETd = exportData.exportDriveImg(
          input_CMRSET.select('ETd').toBands().rename('ETd_CMRSET').float(),region,
          'Landsat_AET_fusion',
          'Landsat_CMRSET_ETd_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var driveTaskEF = exportData.exportDrive(
      //var driveTaskEF = exportData.exportDriveImg(
          input_CMRSET.select('Kc').toBands().rename('EF_CMRSET').float(),region, 
          'Landsat_AET_fusion',
          'Landsat_CMRSET_EF_'+date_asset.getInfo()+'_'+Path+Row+'_'+Satellite, 
          CellSize);
      var annualETdMap = ui.Map.Layer(annual_CMRSET.select('ETd').merge(ET0_year),{}, 'annual_ETd');
      var annualEFMap = ui.Map.Layer(annual_CMRSET.select('Kc'),{}, 'annual_EF');
      // Insert Time-Series Plot
      generateChartET('CMRSET',mapPanel,12,annualETdMap,'mm.d-1',selected_year.getInfo());
      generateChartEF('CMRSET',mapPanel,13,annualEFMap,'evaporative fraction',selected_year.getInfo());
    prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
      mapPanel.add(EF_CMRSET);
      mapPanel.add(ETd_CMRSET);
      // Create a inspector panel and execute point value
      var inspector = ui.Panel([ui.Label('Click on Map to get daily values (EF and AET)')]);
      inspector.style().set('position','bottom-center');
      mapPanel.widgets().set(2, inspector);
      // Insert point value to AET and EF
      pointvalue(mapPanel,inspector,1,input_CMRSET.select('ETd').toBands().rename('AET'),'CMRSET','AET','/d',2,'mm');
      pointvalue(mapPanel,inspector,0,input_CMRSET.select('Kc').toBands().rename('EF'),'CMRSET','EF','',2,'');
    });
    // Create UI MapLayers
  var LandsatMap = ui.Map.Layer(Landsat
    .map(inputLandsat.fmask)
    .map(inputLandsat.applyScaleFactors),
    True_Color, Satellite+' '+Path+'/'+Row+' ('+date.getInfo()+')');
  // Insert selected Landsat image
  mapPanel.add(LandsatMap);
//  mapPanel.add(ui.Map.Layer(quadroImg,{},'Download image area'));
  // Insert Legends
  mapPanel.add(legendEF);
  mapPanel.add(legendET);
});
CLEAR_Button.onClick(function() {
//    startDate.setValue(ee.Date(Date.now()).advance(-1,'month').format('yyyy-MM-dd').getInfo(),false);
//    endDate.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo(),false);
    startDate.setValue('2021-01-01',false);
    endDate.setValue('2021-02-01',false);
    mapPanel.clear();
//    mapPanel.add(legendEF);
//    mapPanel.add(legendET);
//    mapPanel.setOptions('baseChange', {'baseChange': baseChange});
    RUN_ENSEMBLE.unlisten();
    RUN_METRIC.unlisten();
    RUN_SSEBop.unlisten();
//    RUN_SSEB.unlisten();
    RUN_SSEBI.unlisten();
    RUN_SEBAL.unlisten();
    RUN_PTJPL.unlisten();
    RUN_MSPT.unlisten();
    RUN_VPDPT.unlisten();
    RUN_SWIPT.unlisten();
//    RUN_SPT.unlisten();
    RUN_SEMIPM.unlisten();
    RUN_SIM.unlisten();
    RUN_CMRSET.unlisten();
});
mainPanel.widgets().set(9, ui.Panel([RUN_Button,CLEAR_Button], ui.Panel.Layout.flow('horizontal')));
  var fourthSubTitle_text = '4) Click on the buttons in map to show the results for each algorithm';
  var fourthSubTitle = ui.Label(fourthSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(10, fourthSubTitle);
  var fifthSubTitle_text = '5) Click on Map to show time-series plots below:';
  var fifthSubTitle = ui.Label(fifthSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(11, fifthSubTitle);
// Insert references hyperlinks
var Allenetal2007 = ui.Label('Allen et al (2007). Satellite-Based Energy Balance for Mapping Evapotranspiration '+
  'with Internalized Calibration (METRIC)—Model.')
  .setUrl('https://doi.org/10.1061/(ASCE)0733-9437(2007)133:4(380)',PARAGRAPH_STYLE);
var Senayetal2013 = ui.Label('Senay et al (2013). Operational Evapotranspiration Mapping Using Remote Sensing '+
  'and Weather Datasets: A New Parameterization for the SSEB Approach.')
  .setUrl('https://onlinelibrary.wiley.com/doi/full/10.1111/jawr.12057',PARAGRAPH_STYLE);
//var Senayetal2011 = ui.Label('Senay et al (2011). Enhancing the Simplified Surface Energy Balance (SSEB) approach '+
//  'for estimating landscape ET: Validation with the METRIC model')
//  .setUrl('https://www.sciencedirect.com/science/article/pii/S0378377410003355',PARAGRAPH_STYLE);  
var Roerinketal2000 = ui.Label('Roerink et al (2000). S-SEBI: A simple remote sensing algorithm to '+
  'estimate the surface energy balance')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S1464190999001288',PARAGRAPH_STYLE); 
var Bastiaanssenetal1998 = ui.Label('Bastiaanssen et al (1998). A remote sensing surface energy balance '+
  'algorithm for land (SEBAL). 1. Formulation.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0022169498002534',PARAGRAPH_STYLE);
var Fisheretal2008 = ui.Label('Fisher et al (2008). Global estimates of the land–atmosphere water '+
  'flux based on monthly AVHRR and ISLSCP-II data, validated at 16 FLUXNET sites.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0034425707003938',PARAGRAPH_STYLE);
var Yaoetal2013 = ui.Label('Yao et al (2013). MODIS-driven estimation of terrestrial latent heat flux in '+
  'China based on a modified Priestley–Taylor algorithm.')
  .setUrl('https://www.sciencedirect.com/science/article/abs/pii/S016819231200353X?via%3Dihub',PARAGRAPH_STYLE);
var Yaoetal2015 = ui.Label('Yao et al (2015). A satellite-based hybrid algorithm to determine the Priestley–Taylor '+
  'parameter for global terrestrial latent heat flux estimation across multiple biomes.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0034425715300092?via%3Dihub',PARAGRAPH_STYLE);
var Haoetal2019 = ui.Label('Hao et al (2019). Developing a soil water index-based Priestley–Taylor '+
  'algorithm for estimating evapotranspiration over East Asia and Australia.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0168192319303764?via%3Dihub',PARAGRAPH_STYLE);
var Wangetal2010 = ui.Label('Wang et al (2010). Evidence for decadal variation in global terrestrial '+
  'evapotranspiration between 1982 and 2002: 1. Model development.')
  .setUrl('https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2009JD013671',PARAGRAPH_STYLE);
var WangLiang2008 = ui.Label('Wang and Liang (2008). An Improved Method for Estimating Global Evapotranspiration Based '+
  'on Satellite Determination of Surface Net Radiation, Vegetation Index, Temperature, and Soil Moisture.')
  .setUrl('https://journals.ametsoc.org/view/journals/hydr/9/4/2007jhm911_1.xml',PARAGRAPH_STYLE);
var Guerschmanetal2022 = ui.Label('Guerschman et al (2022). Estimating actual evapotranspiration at field-to-continent '+
  'scales by calibrating the CMRSET algorithm with MODIS, VIIRS, Landsat and Sentinel-2 data.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0022169421013688',PARAGRAPH_STYLE);
// Notes texts and links
  var legend_text = 'METRIC = Mapping EvapoTranspiration at high Resolution with Internalized Calibration (Allen et al 2007); '+
  'SSEBop = Operational Simplified Surface Energy Balance (Senay et al 2013); S-SEBI = Simplified Surface Energy Balance Index (Roerink et al 2000); '+
  'SEBAL = Surface Energy Balance Algorithm for Land (Bastiaanssen et al 1998); PT-JPL = Priestley-Taylor Jet Propulsion Laboratory (Fisher et al 2008); '+
  'MS-PT = Modified satellite-based Priestley–Taylor (Yao et al 2013); VPD-PT = Vapor Pressure Deficit-based Priestley-Taylor (Yao et al 2015); '+
  'SEMI-PM = Semi-Empirical Penman Algorithm (Wang et al 2010); SIM = simple hybrid ET formulation (Wang and Liang 2008); '+
  'CMRSET = CSIRO MODIS Reflectance-based Scaling EvapoTranspiration (Guerschman et al 2009; 2022).';
  var legend = ui.Label(legend_text, PARAGRAPH_STYLE);
// Insert references title
  var title_references_text = 'References:';
  var title_references = ui.Label(title_references_text, SUBTITLE_STYLE);
  var notes_text = 'Notes:';
  var notes = ui.Label(notes_text, SUBTITLE_STYLE);
// Insert Reference texts and links
mainPanel.widgets().set(23, ui.Label('                                                                                                  '));
mainPanel.widgets().set(24, ui.Label('                                                                                                  '));
mainPanel.widgets().set(25, ui.Label('                                                                                                  '));
mainPanel.widgets().set(26, ui.Label('_________________________________________________________________________________________________'));
mainPanel.widgets().set(27, title_references);
mainPanel.widgets().set(28, Allenetal2007);
mainPanel.widgets().set(29, Senayetal2013);
mainPanel.widgets().set(30, Roerinketal2000);
mainPanel.widgets().set(31, Bastiaanssenetal1998);
mainPanel.widgets().set(32, Fisheretal2008);
mainPanel.widgets().set(33, Yaoetal2013);
mainPanel.widgets().set(34, Yaoetal2015);
//mainPanel.widgets().set(34, Haoetal2019);
mainPanel.widgets().set(35, Wangetal2010);
mainPanel.widgets().set(36, WangLiang2008);
mainPanel.widgets().set(37, Guerschmanetal2022);
mainPanel.widgets().set(39, ui.Label('_________________________________________________________________________________________________'));
mainPanel.widgets().set(40, notes);
mainPanel.widgets().set(41, legend);
mainPanel.add(ui.Label('_________________________________________________________________________________________________'));
mainPanel.add(ui.Panel([
  ui.Label('Contacts:',SUBTITLE_STYLE),
  ]));
mainPanel.add(ui.Panel([ui.Label({value:'E-mail:',style: {color:'#9E9E9E'}}), ui.Label('ricardogeo@gmail.com').setUrl('https://ricardogeo@gmail.com')], 
  ui.Panel.Layout.flow('horizontal',true)));
mainPanel.add(ui.Panel([ui.Label({value:'Lattes:',style:{color:'#9E9E9E'}}), ui.Label('Ricardo Neves de Souza Lima').setUrl('https://lattes.cnpq.br/0528268655953558')], 
  ui.Panel.Layout.flow('horizontal',true))); 
mainPanel.add(ui.Panel([ui.Label({value:'Researchgate:',style:{color:'#9E9E9E'}}), ui.Label('https://www.researchgate.net/profile/Ricardo_Neves_De_Souza_Lima').setUrl('https://www.researchgate.net/profile/Ricardo_Neves_De_Souza_Lima')], 
  ui.Panel.Layout.flow('horizontal',true)));