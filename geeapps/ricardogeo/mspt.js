//================================================= INPUT SETTINGS ======================================================= 
// Input variables
var StartYear = 1985, EndYear = 2020;
// ======================================== VISUALIZATION PARAMETERS =============================================
var True_Color_DN = {bands: ['red', 'green', 'blue'],min: 0,max: 1200};
var False_Color_DN = {bands: ['swir1', 'nir', 'red'],min: 0,max: 5000};
var ETa_Palette = ['#B59B75','#D8C689','#FEF3AC', '#78D062','#1c8591', '#0B2F7A'];
var LE_Palette = ['#8B0000','#FF0000','#FFEFD5', '#B0E0E6','#6495ED', '#00008B'];
var ETf_Palette = ['#B59B75','#D8C689','#FEF3AC', '#78D062','#1c8591', '#0B2F7A'];
var visET = {min: 0, max: 8, palette: ETa_Palette};
var visEF = {min: 0, max: 1, palette: ETf_Palette};
var visLE = {min: 0, max: 200, palette: LE_Palette};
// =================================================== CONSTANTS ========================================================
var psy = 0.066; // kPa °C−1
var alfa = 1.26;
var Topt = 25;
// =================================================== FUNCTIONS ========================================================
// Define function to get and rename bands of interest from OLI.
function renameOLI(img) {
  return img.select(
		['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B10', 'pixel_qa'],
		['blue','green','red','nir','swir1','swir2','BT', 'pixel_qa']
	);
}
// Define function to get and rename bands of interest from ETM+.
function renameETM(img) {
  return img.select(
		['B1', 'B2', 'B3', 'B4', 'B5', 'B7','B6', 'pixel_qa'],
		['blue','green','red','nir','swir1','swir2','BT', 'pixel_qa']
  );
}
// Function to generate export to Drive Tasks
var exportDrive = function(img,aoi,desc,celsize){
  return Export.image.toDrive({image: img, 
  description: desc,
  folder: 'Landsat_AET_fusion',
  scale: celsize,
  region: aoi,
  maxPixels: 1e13,
  skipEmptyTiles: true,
  });
};
//============================================ PROCESSING STEP FUNCTIONS ======================================================
// Cloud and Cloud shadow masking
var fmask = function(img) {
  var mask_aoi = img.select(0).clamp(1,1).selfMask().rename('mask_aoi');
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = img.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return mask_aoi.addBands([img.updateMask(mask)]).copyProperties(img,img.propertyNames());
};
// Function to compute NDVI and MNDWI
var computeLandsatInputs = function(img){
  var mask = img.select(0).clamp(1,1).selfMask().rename('mask');
  var mask_aoi = img.select('mask_aoi');
  // Landsat spectral bands
  var image = img.where(img.lt(0),0);
  var blue = image.select('blue').multiply(0.0001);
  var green = image.select('green').multiply(0.0001);
  var red = image.select('red').multiply(0.0001);
  var nir = image.select('nir').multiply(0.0001);
  var swir1 = image.select('swir1').multiply(0.0001);
  // Compute MNDWI water index
  var mndwi = img.expression('(green - swir1)/(green + swir1)',
    {'green':green,'swir1':swir1});
  // Compute NDVI
  var ndvi_orig = image.normalizedDifference(['nir','red']);
  var ndvi = ndvi_orig.where(ndvi_orig.lte(0),0).where(ndvi_orig.gt(1),1);
  return mask.addBands([
    mask_aoi,
    mndwi.float().rename('MNDWI'),
    ndvi.float().rename('NDVI'),
    ]).copyProperties(img,img.propertyNames());
};
// Get meteorological data at Landsat scene
var computeMETEO = function(img){
  // Create a mask for each image
  var aoi = img.select('mask_aoi').geometry();
  // Get the UTC zone of the Landsat scene.
  var long_raster = ee.Image.pixelLonLat().select('longitude');
  var UTC_zone = long_raster.divide(15).round();
  // Create time data for each image in collection
  var d = ee.Date(ee.Number(img.get('system:time_start')));
  var Date = d.format('yyyy-MM-dd');
  var doy = ee.Number(d.getRelative('day', 'year'));
  var hour = ee.Number.parse(d.format('H'));
  var minute = ee.Number.parse(d.format('m'));
  var second = ee.Number.parse(d.format('s'));
  var UTC = ee.Number.parse(d.format('H'));
  var UTC_sat_temp = hour.add(minute.divide(60)).add(second.divide(3600))
    .round();
  var UTC_sat = ee.Number(ee.Algorithms.If(UTC_sat_temp.gt(23), 0, UTC_sat_temp));
  // Compute Local time
  var time0 = ee.Image(ee.Date(Date).millis());
  var time23 = ee.Image(ee.Date(Date).advance(1,'day').millis());
  var time0_local = time0.add(UTC_zone.multiply(60*60*1000));
  var time23_local = time23.add(UTC_zone.multiply(60*60*1000));
  var valueTime0 = ee.Number(time0_local.sample({region:aoi,scale:20000}).first().get('constant'));
  var valueTime23 = ee.Number(time23_local.sample({region:aoi,scale:20000}).first().get('constant'));
  var imgTime0 = ee.Image(valueTime0);
  var imgTime23 = ee.Image(valueTime23);
  // Meteorological inputs (https://developers.google.com/earth-engine/datasets/catalog/ECMWF_ERA5_LAND_HOURLY)
  var ERA5 = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
    .filter(ee.Filter.rangeContains('system:time_start', valueTime0, valueTime23));
  // Interpolate the ERA5 for Landsat scene time.
  var ERA5_T = ERA5.filterMetadata('hour','equals',UTC_sat).first();
  var Tair_sat = ERA5_T.select('temperature_2m');
  var SNSR_sat = ERA5_T.select('surface_net_solar_radiation_hourly').divide(3600);
  var SNTR_sat = ERA5_T.select('surface_net_thermal_radiation_hourly').divide(3600 * (-1));
  var Rn_sat = SNSR_sat.subtract(SNTR_sat);
  // Extract 24h Meteorological data
  var ERA5_Filt = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
    .filter(ee.Filter.date(ee.Date(Date).advance(1,'day'), ee.Date(Date).advance(2,'day')))
    .filter(ee.Filter.eq('hour',0)).first();
  var SNSR = ERA5_Filt.select('surface_net_solar_radiation').divide(24 * 3600);
  var SNTR = ERA5_Filt.select('surface_net_thermal_radiation').divide(24 * 3600 * (-1));
  var Rn_daily = SNSR.subtract(SNTR).rename('Rnday');
  var Tair = ERA5.select('temperature_2m').mean();
  var Tmin = ERA5.select('temperature_2m').min();
  var Tmax = ERA5.select('temperature_2m').max();
  // Saturation Vapor Pressure (es) - Fisher et al 2011 / Priestley & Taylor (1972)
  var es_kPa = img.expression('0.61121 * exp((17.502 * T) / (T + 240.97))',{'T': Tair_sat.subtract(273.15)});
  // Slope of the Saturation Vapor Pressure-Temperature Curve (Δ) - Fisher et al 2011 / Priestley & Taylor (1972)
  var delta = img.expression('(17.502 * 240.97 * es)/(T + 240.97)**2', {
    'T': Tair_sat.subtract(273.15),'es':es_kPa});
  return img.addBands([
    Tmin.float().rename('Tmin'),
    Tmax.float().rename('Tmax'),
    Tair.float().rename('Tair'),
    Tair_sat.float().rename('Tair_sat'),
    Rn_sat.float().rename('Rn'),
    delta.float().rename('delta'),
    Rn_daily.float().rename('Rnday'),
    ]).copyProperties(img,img.propertyNames()).set({'UTC':UTC_sat});
};
// modified PT computation functions
var computeMSPT = function(img){
  // Input data
  var TminC = img.select('Tmin').subtract(273.15);
  var TmaxC = img.select('Tmax').subtract(273.15);
  var mndwi = img.select('MNDWI');
  var ndvi = img.select('NDVI');
  var TairC = img.select('Tair').subtract(273.15);
  var TairC_sat = img.select('Tair_sat').subtract(273.15);
  var Rn = img.select('Rn');
  var Rnday = img.select('Rnday');
  var delta = img.select('delta');
  // Bio-physiological constraint functions
  var DT = TmaxC.subtract(TminC);
  var fSM_temp = img.expression('(1/DT)**(DT/DTmax)',
    {'DT':DT,'DTmax':40});
  var fwet_temp = fSM_temp.pow(4); // Compute Relative surface wetness (fwet)
  var fT_temp = img.expression('exp(-(((Ta-Topt)/Topt)**2))',
    {'Ta':TairC,'Topt':Topt});// Plant temperature constraint
  var fv_temp = img.expression('(NDVI-NDVIsoil)/(NDVIveg-NDVIsoil)',// Fraction of green vegetation in the scene
    {'NDVI':ndvi,'NDVIsoil':0.05,'NDVIveg':0.95});  
  // Bio-physiological constraint functions (CAPPED TO 0 - 1)
  var fv = fv_temp.where(fv_temp.lt(0),0).where(fv_temp.gt(1),1); // Fraction of green vegetation in the scene
  var fwet = fwet_temp.where(fwet_temp.lt(0),0).where(fwet_temp.gt(1),1); // Compute Relative surface wetness (fwet)
  var fSM = fSM_temp.where(fSM_temp.lt(0),0).where(fSM_temp.gt(1),1); // Compute Soil moisture constraint (fSM)
  var fT = fT_temp.where(fT_temp.lt(0),0).where(fT_temp.gt(1),1);// Plant temperature constraint
  // Rn partitioning
  var Rns = Rn.expression('Rn*(1-fv)',
    {'Rn':Rn,'fv':fv}).rename('Rns');
  var Rnc_temp = Rn.multiply(fv);
  var Rnc = Rnc_temp.where(Rnc_temp.lt(0),0);
  // Compute Ground heat flux (G) - Yao et al (2013)
  var G_temp = img.expression('ag*Rn*(1-fv)',
    {'ag': 0.18,'Rn':Rn,'fv':fv});
  var G = G_temp.where(mndwi.gt(0),Rn.multiply(0.26));  
  // LE partitioning
  // Canopy transpiration
  var LEc = img.expression('(1-fwet)*fv*fT*(alfa*delta/(delta+y))*Rnc', {
    'fwet': fwet,'fT':fT,'fv':fv,'alfa':alfa,'delta':delta,'y':psy,'Rnc':Rnc});
  // Soil evaporation
  var LEs = img.expression('(1-fwet)*fSM*(alfa*delta/(delta+y))*(Rns-G)', {
    'fwet': fwet,'fSM':fSM,'alfa':alfa,'delta':delta,'y':psy,'Rns':Rns,'G':G});
  // Interception evaporation
  var LEi = img.expression('fwet*(alfa*delta/(delta+y))*Rnc', {
    'fwet': fwet,'alfa':alfa,'delta':delta,'y':psy,'Rnc':Rnc});
  // Wet soil surface evaporation
  var LEws = img.expression('fwet*(alfa*delta/(delta+y))*(Rns-G)', {
    'fwet': fwet,'alfa':alfa,'delta':delta,'y':psy,'Rns':Rns,'G':G});
  // Water Evaporation (set as equal to Potential Evapotranspiration - PET)
  var LEp = img.expression('(alfa*delta/(delta+y))*(Rn-G)', {
    'alfa':alfa,'delta':delta,'y':psy,'Rn':Rn,'G':G});
  // Total Actual Evapotranspiration
  var LE_temp = LEs.add(LEc).add(LEi).add(LEws);
  var LE = LE_temp.where(LE_temp.lt(0),0).where(mndwi.gt(0),LEp);// Replaces LE on water by LEp and LE < 0 to 0
  // Compute Evaporative Fraction (1.1 factor - Xu et al.(2015))
  var EF_full = (LE.divide(Rn.subtract(G))).multiply(1.1);
  var EF = EF_full.where(EF_full.gt(1.3),1.3);
  // Convert W/m2 to mm/d
  var Lheat = img.expression('(2.501-0.00236*(TC))*10**6', {
    'TC':TairC}); // latent heat of vaporization (J.kg−1)
  var LEday_temp = EF.multiply(Rnday);
  var LEday = LEday_temp.where(LEday_temp.lt(0),0); // Daily Latent Heat Flux
  var ETd = img.expression('LEd * (24*3600)/Lheat',{'LEd':LEday,'Lheat':Lheat}); // Daily Actual Evapotranspiration
    return img.addBands([
    G.float().rename('G'),
    fv.float().rename('fv'),
    fwet.float().rename('fwet'),
    fSM.float().rename('fSM'),
    fT.float().rename('fT'),
    LEc.float().rename('LEc'),
    LEs.float().rename('LEs'),
    LEi.float().rename('LEi'),
    LEws.float().rename('LEws'),
    LE.float().rename('LE'),
    LEday.float().rename('LEday'),
    EF.float().rename('EF'),
    ETd.float().rename('ETd')
    ]).copyProperties(img,img.propertyNames());
};
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
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
//      backgroundColor: colors.gray,
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
  // Add the app title to the side panel
  var titleLabel = ui.Label('Modified satellite-based Priestley–Taylor evapotranspiration algorithm', TITLE_STYLE);
  mainPanel.widgets().set(1, titleLabel);
    // Add the app description to the main panel
  var descriptionText =
      'This app computes the Modified satellite-based Priestley–Taylor LE model ' +
      'to produce a daily actual evapotranspiration (AET). ' +
      'These algorithm are derived from Landsat surface reflectance collection and '  + 
      'ERA5-Land climate reanalysis data. '+
      'Please follow the steps below to run the tool:';
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
  var startDate = ui.Textbox({placeholder: 'Enter Start date here...',value: '2019-09-20'});
  var endDate = ui.Textbox({placeholder: 'Enter End date here...',value: '2019-09-25'});
  mainPanel.widgets().set(5, startDate);
  mainPanel.widgets().set(6, endDate);
  var secondSubTitle_text = '2) Center the Map on your area of interest';
  var secondSubTitle = ui.Label(secondSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(7, secondSubTitle);
  var thirdSubTitle_text = '3) Click on RUN button below to generate results';
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
//================================================ LEGEND COLOR BARS ======================================================
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
var colorBarLE = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(LE_Palette),
  style: {stretch: 'horizontal', margin: '0px 4px', maxHeight: '12px'},
});
// Create legend title
var legendTitleET = ui.Label({
  value: 'actual evapotranspiration (AET)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 17px 4px 17px',
    padding: '0px',
    }
});
var legendTitleLE = ui.Label({
  value: 'Latent Heat Flux (LE)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 51px 4px 51px',
    padding: '0px',
    }
});
var legendTitleEF = ui.Label({
  value: 'Evaporative Fraction (EF)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 39px 4px 39px',
    padding: '0px',
    }
});
// Build legend
var legendLabelsET = ui.Panel({
      widgets: [
        ui.Label('0'),
        ui.Label(('mm.d-1'),{textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('8.0')
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
var legendLabelsLE = ui.Panel({
      widgets: [
        ui.Label('0'),
        ui.Label(('W.m-2.d-1'),{textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('200')
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
var legendLE = ui.Panel([legendTitleLE, colorBarLE, legendLabelsLE]);
  legendLE.style().set('position','bottom-right');
var legendET = ui.Panel([legendTitleET, colorBarET, legendLabelsET]);
  legendET.style().set('position','bottom-right');
//=================================================== INSERT CHARTS ======================================================
// Register a callback on the map to be invoked when the map is clicked to plot the charts on panel.
var generateChartEF_AET = function(panelMap,order,map,year){
  panelMap.onClick(function(coords) {
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
    panelMap.layers().set(50, dot);
    // Create an Annual EF/AET chart.
    var MERGEChart = ui.Chart.image.series(map.getEeObject(), point, ee.Reducer.mean(), 30);
    MERGEChart.setChartType('LineChart').setOptions({
      title: 'Landsat-based daily AET and evaporative fraction (EF) ('+year+')',
      series: {
       0: {targetAxisIndex: 1},
       1: {targetAxisIndex: 0}
      },
      vAxes: {
          // Adds titles to each axis.
          0: {title: 'actual ET (mm.d-1)'},
          1: {title: 'evaporative fraction'}
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
var generateChartLE = function(panelMap,order,map,unit,year){
  panelMap.onClick(function(coords) {
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
    // Create an Annual ET chart.
    var LEChart = ui.Chart.image.series(map.getEeObject(), point, ee.Reducer.mean(), 30);
    LEChart.setChartType('ComboChart').setOptions({
      title: 'Landsat-based LE components ('+year+')',
      vAxis: {title: unit},
      hAxis:{title: 'date'},
      colors: ['Red','Green','Lime','Sienna','Blue'],
      seriesType: 'line',
      lineWidth: 1,
      pointSize: 3,
      });
    mainPanel.widgets().set(order, LEChart);
  });
};
//================================================= COMPUTE SELECT DATA =============================================================
// Create UI Buttons
var RUN_Button = ui.Button({label: 'RUN',style: {width:'140px',textAlign:'center'}});
var EXPORT_Button = ui.Button({label: 'EXPORT TO DRIVE',style: {width:'140px',textAlign:'center'}});
var CLEAR_Button = ui.Button({label: 'CLEAR MAP',style: {width:'140px',textAlign:'center'}});
RUN_Button.onClick(function() {
//  prompt('Go to Task tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  //Define dates
  var date_start = startDate.getValue();
  var date_end = endDate.getValue();
  // Landsat collections
  var L5_col = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameETM);
  var L7_col = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameETM);
  var L8_col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(ee.Geometry(mapPanel.getBounds(true)).centroid(1))
      .filterMetadata('CLOUD_COVER_LAND','less_than',60)
    .map(renameOLI);
  // Merge SR Landsat collections for whole period
  var Landsat_Collection = L5_col.merge(L7_col).merge(L8_col).sort('system:time_start', true);
  var Landsat_SR_Collection_SELECT = Landsat_Collection
    .filterDate(date_start, date_end)
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
  var Satellite = Landsat.first().get('SATELLITE').getInfo();
  // Create AOI's from Landsat scene
  var AOI_Landsat = Landsat_Collection.geometry().dissolve();
  // Filter by Year of selected data
  var selected_year = ee.Date(Landsat.first().get('system:time_start')).format('YYYY');
  var Landsat_year = Landsat_Collection.filterDate(
    selected_year.getInfo()+'-01-01', selected_year.getInfo()+'-12-31');
  // Create Annual Date List
  var LandsatDateList = Landsat_year.aggregate_array('system:time_start')
    .map(function(list){return ee.Date(ee.Number.parse(list)).format('yyyy-MM-dd')}).distinct();
  // Compute MS-PT model
  var input_MSPT = Landsat
    .map(fmask)
    .map(computeLandsatInputs)
    .map(computeMETEO)
    .map(computeMSPT);
  var annual_MSPT = Landsat_year
    .map(fmask)
    .map(computeLandsatInputs)
    .map(computeMETEO)
    .map(computeMSPT);
  // Extract daily variables
  var EF = input_MSPT.select('EF').toBands().rename('EF MS-PT');
  var LEd = input_MSPT.select('LEday').toBands().rename('LEd MS-PT'); 
  var ETd = input_MSPT.select('ETd').toBands().rename('ETd MS-PT');
  // Extract annual variables
  var annual_LE = annual_MSPT.select(['LEs','LEc','LEws','LEi','LE']);
  var annual_EF_ETd = annual_MSPT.select(['EF','ETd']);
  // Export to Drive
  var region = AOI_Landsat.getInfo();
  var CellSize = Landsat.first().projection().nominalScale().getInfo();
  // Plot on Map the acquisition date and satellite
  mapPanel.add(ui.Label('Date: '+date.getInfo()+' / satellite: '+Satellite+' / PathRow: '+PathRow));
  EXPORT_Button.onClick(function() {
        var driveTaskEF = exportDrive(EF.float(),region,'Landsat_EF_MSPT_'+date_asset.getInfo()+'_'+PathRow+'_'+Satellite, CellSize);
        var driveTaskLEd = exportDrive(LEd.float(),region,'Landsat_LEd_MSPT_'+date_asset.getInfo()+'_'+PathRow+'_'+Satellite, CellSize);
        var driveTaskETd = exportDrive(ETd.float(),region,'Landsat_ETd_MSPT_'+date_asset.getInfo()+'_'+PathRow+'_'+Satellite, CellSize);
        prompt('Go to TASKS tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  });
  // Create UI MapLayers
  var LandsatMap = ui.Map.Layer(Landsat.map(fmask),True_Color_DN, Satellite+' '+Path+'/'+Row+' ('+date.getInfo()+')');
  var EFMap = ui.Map.Layer(EF,visEF,'evaporative fraction ('+date.getInfo()+')'+' - '+Satellite);
  var LEdMap = ui.Map.Layer(LEd,visLE,'daily LE ('+date.getInfo()+')'+' - '+Satellite);
  var ETdMap = ui.Map.Layer(ETd,visET,'daily AET ('+date.getInfo()+')'+' - '+Satellite);
  // UI MapLayers for Charts
  var EF_ETd_Map_year = ui.Map.Layer(annual_EF_ETd,{},'EF and AET ('+selected_year.getInfo()+')',false);
  var LE_Map_year = ui.Map.Layer(annual_LE,{},'LE components ('+selected_year.getInfo()+')',false);
  // Generate Charts
  generateChartEF_AET(mapPanel,10,EF_ETd_Map_year,selected_year.getInfo());
  generateChartLE(mapPanel,11,LE_Map_year,'W.m-2',selected_year.getInfo());
  mapPanel.add(LandsatMap);
  mapPanel.add(EFMap);
  mapPanel.add(LEdMap);
  mapPanel.add(ETdMap);
  mapPanel.add(legendEF);
  mapPanel.add(legendLE);
  mapPanel.add(legendET);
});
CLEAR_Button.onClick(function() {
    startDate.setValue('2019-09-20',false);
    endDate.setValue('2019-09-25',false);
    mapPanel.clear();
    mapPanel.add(legendEF);
    mapPanel.add(legendLE);
    mapPanel.add(legendET);
    EXPORT_Button.unlisten();
});
mainPanel.widgets().set(13, ui.Panel([RUN_Button,EXPORT_Button,CLEAR_Button], ui.Panel.Layout.flow('horizontal')));
  var forthSubTitle_text = '4) Click on Map to show time-series plots below:';
  var forthSubTitle = ui.Label(forthSubTitle_text, SUBTITLE_STYLE);
  mainPanel.widgets().set(14, forthSubTitle);