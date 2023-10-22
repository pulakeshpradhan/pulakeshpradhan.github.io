var Amazon = ui.import && ui.import("Amazon", "table", {
      "id": "projects/ee-josiascruz75/assets/RHA_TOA"
    }) || ee.FeatureCollection("projects/ee-josiascruz75/assets/RHA_TOA"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1};
/******************************************************************************/
var empty = ee.Image().byte();
var outline = empty.paint({
featureCollection: Amazon,
color: 1,
width: 0.5
});
/*******************************************************************************/
Map.centerObject (Amazon,5);
Map.setOptions('SATELLITE');
var mainPanel = ui.Panel({
  style: {width: '400px'}
});
/************************Legenda Runoff**************************************************/
var palette1 = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#0c13ff'];
function createColorBar1(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 600, 0.1],
      dimensions: '10x20',
      format: 'png', 
      min: 0, max: 600,
      palette: palette},
    style: {stretch: 'vertical', margin: '8px 8px', maxHeight: '40px'},
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 5px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 20px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-right', padding: '8px 10px'}
  });
  return legendPanel;
}
// Call the function to create a colorbar legend  
var colorBar1 = createColorBar1('Runoff (mm/month)', palette1, 0, 600);
/********************************************************************************************/
 /************************Legenda CHIRPS**************************************************/
var palette1 = ["04fff3","01b8b8","075fe4","0310b4","03017c"];
function createColorBar1(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 900, 0.1],
      dimensions: '200x20',
      format: 'png', 
      min: 0, max: 900,
      palette: palette},
    style: {stretch: 'vertical', margin: '8px 8px', maxHeight: '40px'},
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 10px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 10px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-right', padding: '8px 15px'}
  });
  return legendPanel
  legendPanel//.reset([colorBar]);
}
// Call the function to create a colorbar legend  
var colorBar = createColorBar1('Precipitation (mm/month)', palette1, 0, 900);
/*************************************************************************************************/
var title3 = ui.Label({
  value: 'GEE RUNOFF AMAZON',
  style: {'fontSize': '20px','fontWeight':'bold','textAlign':'center', 'padding':'10px 1px 1px 60px'}
});
mainPanel.add(title3)
var title = ui.Label({
  value: 'Precipitation (mm/month)',
  style: {'fontSize': '16px','fontWeight':'bold'}
});
mainPanel.add(title);
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  });
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  });
mainPanel.add(colorBar);
var titleCN = ui.Label({
  value: 'CURVER NUMBER',
  style: {'fontSize': '16px','fontWeight':'bold'}
});
mainPanel.add(titleCN);
var dropdownPanelCN = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanelCN);
var yearSelectorCN = ui.Select({
  placeholder: 'please wait..',
  });
var buttonCN = ui.Button('Generate runoff');
dropdownPanelCN.add(yearSelectorCN);
dropdownPanelCN.add(buttonCN);
var button = ui.Button('Load');
dropdownPanel.add(yearSelector);
dropdownPanel.add(monthSelector);
dropdownPanel.add(button);
mainPanel.add(colorBar1);
/*********************************************************************************************/
var years = ee.List.sequence(2009, 2022);
var months = ee.List.sequence(1, 12);
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d');
});
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d');
});
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList);
  yearSelector.setPlaceholder('year');
});
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList);
  monthSelector.setPlaceholder('month');
});
var yearsCN = ee.List([2009,2014,2019,2024,2029,2034,2039,2044,2049]);
var monthsCN = ee.List.sequence(1, 12);
var yearStringsCN = yearsCN.map(function(year){
  return ee.Number(year).format('%04d');
});
yearStringsCN.evaluate(function(yearList) {
  yearSelectorCN.items().reset(yearList);
  yearSelectorCN.setPlaceholder('year');
});
var loadCHIRPS = function() {
  var col = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select('precipitation');
  var yearChirps = yearSelector.getValue();
  var monthChirps = monthSelector.getValue();
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(yearChirps), ee.Number.parse(monthChirps), 1);
  var endDate =  startDate.advance(1, 'month');
  var filtered = col.filter(ee.Filter.date(startDate, endDate));
  var CHIRPS = ee.Image(filtered.sum().clip(Amazon));
  var precipitationVis = {min: 0.0, max: 870.79, palette:["04fff3","01b8b8","075fe4","0310b4","03017c"]};
  var layerName2 = 'CHIRPS ' +' '+ yearChirps + '-' + monthChirps;
  Map.addLayer(CHIRPS, precipitationVis, layerName2);
  Map.centerObject (Amazon,5);
  var loadCN = function() {
  var colCN = ee.ImageCollection('projects/ee-josiascruz/assets/CN').select('b1');
  var year = yearSelectorCN.getValue();
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number(1), 1);
  var endDate =  ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number(1), 31);
  var filteredCN = colCN.filter(ee.Filter.date(startDate, endDate));
  var imageCN = ee.Image(filteredCN.first());
  var S =imageCN.expression('(25400 / (cn))-254', {  'cn':imageCN.select('b1')});
// Cálculo de perdas iniciais = 0.2S
  var Ia = S.multiply(0.2);
  var a = CHIRPS.subtract(Ia); // uso da precipitação do CHIRPS
  var mask = a.gt(0); 
  var Pef = a.multiply(mask);
// cálculo de runoff.
  var runoff = (Pef.pow(2)).divide(CHIRPS.add(S.multiply(0.8))).rename('runoff_CHIRPS');
/***********************************************************************************/
  var CNVis = {min: 55, max: 100, palette:['red','darkgreen','cyan','Brown','blue','darkblue']};
  var runoffVis = {min: 0, max: 600, palette:['#d7191c','#fdae61','#ffffbf','#a6d96a','#0c13ff']};
  var layerName = 'CN ' + year + ' '+'CHIRPS';
  var layerName1 = 'Runoff ' + yearChirps + '-'+ monthChirps+'-'+'CHIRPS';
  //Map.clear();
  Map.addLayer(runoff, runoffVis, layerName1);
   Map.addLayer(outline, {palette: '#000000'}, 'Bacias Hidrográficas Amazon',1);
  Map.setOptions('SATELLITE');
  Map.centerObject (Amazon,5);
};
buttonCN.onClick(loadCN);
};
button.onClick(loadCHIRPS);
Map.clear()// for removing the layers
var clearButton = ui.Button('Reset')
mainPanel.add(clearButton)
var reset = function() {
  Map.clear()};
clearButton.onClick(reset)
/**************************************************************************/
/************************Legenda**************************************************/
var palette1 = ["04fff3","01b8b8","075fe4","0310b4","03017c"];
function createColorBar1(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 700, 0.1],
      dimensions: '700x20',
      format: 'png', 
      min: 0, max: 700,
      palette: palette},
    style: {stretch: 'vertical', margin: '8px 8px', maxHeight: '40px'},
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 10px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 10px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-right', padding: '8px 15px'}
  });
  return legendPanel;
}
// Call the function to create a colorbar legend  
var colorBar = createColorBar1('Precipitation (mm/month)', palette1, 0, 700);
/************************Legenda runoff gcm**************************************************/
var palette = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#0c13ff'];
function createColorBar(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 600, 0.1],
      dimensions: '600x20',
      format: 'png', 
      min: 0, max: 600,
      palette: palette},
    style: {stretch: 'vertical', margin: '8px 8px', maxHeight: '40px'},
  });
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 10px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 10px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-right', padding: '8px 15px'}
  });
  return legendPanel;
}
var colorBar2 = createColorBar('Runoff (mm/month)', palette, 0,600);
var titlepr = ui.Label({
  value: 'Precipitation GCM (mm/month)',
  style: {'fontSize': '16px', 'fontWeight':'bold', 'padding':'1px 20px 1px 1px' }
});
// You can add widgets to the panel
mainPanel.add(titlepr);
// You can even add panels to other panels
var dropdownPanelpr = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanelpr);
var yearSelectorpr = ui.Select({
  placeholder: 'please wait..',
  });
var monthSelectorpr = ui.Select({
  placeholder: 'please wait..',
  });
var modelSelectorpr = ui.Select({
  placeholder: 'please wait..',
  }) ;
var RCPSelectorpr = ui.Select({
  placeholder: 'please wait..',
  }) ;
mainPanel.add(colorBar);
var titleCNGCM = ui.Label({
  value: 'CURVER NUMBER',
  style: {'fontSize': '16px','fontWeight':'bold'}
});
mainPanel.add(titleCNGCM);
var dropdownPanelCNGCM = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanelCNGCM);
var yearSelectorCNGCM = ui.Select({
  placeholder: 'please wait..',
  });
var buttonCNGCM = ui.Button('Generate runoff');
dropdownPanelCNGCM.add(yearSelectorCNGCM);
dropdownPanelCNGCM.add(buttonCNGCM);
var buttonpr = ui.Button('Load');
dropdownPanelpr.add(yearSelectorpr);
dropdownPanelpr.add(monthSelectorpr);
dropdownPanelpr.add(modelSelectorpr);
dropdownPanelpr.add(RCPSelectorpr);
dropdownPanelpr.add(buttonpr);
mainPanel.add(colorBar2);
// Let's add a dropdown with the years
var yearspr= ee.List.sequence(2009,2050);
var monthspr= ee.List.sequence(1, 12);
var RCP = ee.List(['rcp45', 'rcp85']);
var modelpr = ee.List(['ACCESS1-0', 'bcc-csm1-1', 'BNU-ESM', 'CanESM2', 'CCSM4', 'CESM1-BGC', 'CNRM-CM5', 'CSIRO-Mk3-6-0', 'GFDL-CM3', 'GFDL-ESM2G', 'GFDL-ESM2M', 'inmcm4', 'IPSL-CM5A-LR', 'IPSL-CM5A-MR', 'MIROC-ESM', 'MIROC-ESM-CHEM', 'MIROC5', 'MPI-ESM-LR', 'MPI-ESM-MR', 'MRI-CGCM3', 'NorESM1-M']);
// Dropdown items need to be strings
var yearStringspr = yearspr.map(function(year){
  return ee.Number(year).format('%04d');
});
var monthStrings = monthspr.map(function(month){
  return ee.Number(month).format('%02d');
});
var RCPStrings = RCP.map(function(RCP){
  return RCP;
});
var modelStrings = modelpr.map(function(modelpr){
  return modelpr;
});
// Evaluate the results and populate the dropdown
yearStringspr.evaluate(function(yearList) {
  yearSelectorpr.items().reset(yearList);
  yearSelectorpr.setPlaceholder('Year');
});
monthStrings.evaluate(function(monthList) {
  monthSelectorpr.items().reset(monthList);
  monthSelectorpr.setPlaceholder('Month');
});
RCPStrings.evaluate(function(RCPList) {
  RCPSelectorpr.items().reset(RCPList);
  RCPSelectorpr.setPlaceholder('Scenario');
});
  modelStrings.evaluate(function(modelList) {
  modelSelectorpr.items().reset(modelList);
  modelSelectorpr.setPlaceholder('Model');
});
  var loadpr = function() {
  var colpr = ee.ImageCollection("NASA/NEX-GDDP")
        .select('pr');     
  var yearpr = yearSelectorpr.getValue();
  var monthpr = monthSelectorpr.getValue();
  var RCPs = RCPSelectorpr.getValue();
  var model = modelSelectorpr.getValue();
  var startDatepr = ee.Date.fromYMD(
    ee.Number.parse(yearpr), ee.Number.parse(monthpr), 1);
  var endDatepr =  startDatepr.advance(1, 'month');
  var filteredpr = colpr.filter(ee.Filter.date(startDatepr, endDatepr));
  var imagepr = ee.Image(filteredpr.filterMetadata('scenario', 'equals',RCPs).filterMetadata ('model','equals',model).sum().multiply(86400).resample('bilinear').clip(Amazon));
  var prVis = {min: 0, max: 600, palette:["04fff3","01b8b8","075fe4","0310b4","03017c"]};
  var layerName = 'Precipitation'+' ' + yearpr + monthpr+' '+ model + ' ' + RCPs;
  Map.addLayer(imagepr, prVis, layerName);
  var yearsCNGCM = ee.List([2009,2014,2019,2024,2029,2034,2039,2044,2049]);
  var monthsCNGCM = ee.List.sequence(1, 12);
  var yearStringsCNGCM = yearsCNGCM.map(function(year){
  return ee.Number(year).format('%04d');});
  yearStringsCNGCM.evaluate(function(yearList) {
  yearSelectorCNGCM.items().reset(yearList);
  yearSelectorCNGCM.setPlaceholder('select a year');});
  var loadCNGCM = function() {
  var colCNGCM = ee.ImageCollection('projects/ee-josiascruz/assets/CN').select('b1');    
  var yearGCM = yearSelectorCNGCM.getValue();
  var startDateGCM = ee.Date.fromYMD(
    ee.Number.parse(yearGCM), ee.Number(1), 1);
  var endDateGCM =  ee.Date.fromYMD(
    ee.Number.parse(yearGCM), ee.Number(1), 31);
  var filteredCNGCM = colCNGCM.filter(ee.Filter.date(startDateGCM,endDateGCM));
  var imageCNGCM = ee.Image(filteredCNGCM.first());
  /************************Curva número (CN) da Amazônia *****************************/
// Variáveis numéricas para o cálculo de abstração máxima.
  var S =imageCNGCM.expression('(25400 / (cn))-254', {  'cn':imageCNGCM.select('b1')});
// Cálculo de perdas iniciais = 0.2S
  var Ia = S.multiply(0.2);
  var a = imagepr.subtract(Ia); // uso da precipitação do CHIRPS
  var mask = a.gt(0); 
  var Pef = a.multiply(mask);
// cálculo de runoff.
  var runoffGCM = (Pef.pow(2)).divide(imagepr.add(S.multiply(0.8))).rename('runoff_CGCM');
/***********************************************************************************/
  var CNVis = {min: 55, max: 100, palette:['red','darkgreen','cyan','Brown','blue','darkblue']};
  var runoffVis = {min: 0, max: 600, palette:['#d7191c','#fdae61','#ffffbf','#a6d96a','#0c13ff']};
  var layerName = 'CN ' + yearGCM + '-'+'Amazon';
  var layerName1 = 'Runoff'+' ' + yearpr +'-'+ monthpr +' ' + model + ' ' + RCPs;
  Map.addLayer(runoffGCM, runoffVis, layerName1);
  Map.setOptions('SATELLITE');
  Map.centerObject (Amazon,5);
  //Map.addLayer(imageCN, CNVis, layerName)
  Map.addLayer(outline, {palette: '#000000'}, 'Bacias Hidrográficas Amazon',1); 
 //Map.clear();
};
buttonCNGCM.onClick(loadCNGCM);
Map.centerObject (Amazon,5);
Map.setOptions('SATELLITE');
};
buttonpr.onClick(loadpr);
ui.root.add(mainPanel);
Map.clear()// for removing the layers
var clearButton = ui.Button('Reset')
mainPanel.add(clearButton)
var reset = function() {
  Map.clear()};
clearButton.onClick(reset)
var title2 = ui.Label({
  value: 'Reference' ,
  style: {'fontSize': '16px'}
});
mainPanel.add(title2);
var reference = ui.Label({
  value: 'DA SILVA CRUZ, Josias; BLANCO, Claudio José Cavalcante; DE OLIVEIRA JÚNIOR, José Francisco.'+
  'Modeling of land use and land cover change dynamics for future projection of the Amazon number curve.'+
  'Science of The Total Environment, v. 811, p. 152348, 2022.\nhttps://doi.org/10.1016/j.scitotenv.2021.152348',
   style: {'fontSize': '11px'}
 });
mainPanel.add(reference);
var reference2 = ui.Label({
  value: 'Funk, Chris, Pete Peterson, Martin Landsfeld, Diego Pedreros, James Verdin, Shraddhanand Shukla,'+
  'Gregory Husak, James Rowland, Laura Harrison, Andrew Hoell & Joel Michaelsen. "The climate hazards infrared'+
  'precipitation with stations—a new environmental record for monitoring extremes". Scientific Data 2, 150066.'+
  'doi:10.1038/sdata.2015.66 2015.',
  style: {'fontSize': '11px'}
 });
mainPanel.add(reference2);
var reference3 = ui.Label({
  value:'Thrasher, B., Maurer, E. P., McKellar, C., & Duffy, P. B., 2012: Technical Note: Bias correcting '+
  'climate model simulated daily temperature extremes with quantile mapping. Hydrology and Earth System Sciences,'+
  '16(9), 3309-3314. doi:10.5194/hess-16-3309-2012',
  style: {'fontSize': '11px'}
 });
mainPanel.add(reference3);
var logo = ui.Thumbnail({
  image: ee.Image('projects/ee-josiascruz/assets/Logos_aap1'), 
  params: {min: 0, max: 255}, 
  style: {
    height: '220px',
    width: '290px'
  }
});
var logoPanel = ui.Panel({
  widgets: [logo], 
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {height: '24%', margin: '4px 16px 100px 50px'}
});
mainPanel.add(logoPanel);
var autor = ui.Label({
  value:'Authors: Cruz and Blanco.',
  style: {'fontSize': '12px', 'position':'bottom-left'}
 });
mainPanel.add(autor);
var instrution = ui.Label({
  value: 'Instrution:\nGEEAmazonRunoff generates the runoff for the Amazon and Tocantins-Araguaia Watershed from the year 2009 until 2050.'+ 
  'To generate the runoff just add the precipitation year and the CN referring to the year, each CN has a time window'+
  'of 5 years, for example: the CN of 2009 can be used until 2013.'+'            '+'Attention: reset when generating runoff. ',
  style: {'fontSize': '14px','fontWeight': 'bold','color':'red', 'width':'400px','padding': '10px'},
});
Map.clear()// for removing the layers
var clearButton = ui.Button('Close instrution')
  var reset = function() {
  Map.clear()};
clearButton.onClick(reset)  // for removing the layers
Map.add(instrution);
Map.add(clearButton);
//Map.add(reference);
//ui.root.add(mainPanel);