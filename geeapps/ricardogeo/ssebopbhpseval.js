// =========================================== USER INTERFACE =================================================
//var SetETproduct = prompt('Enter the global ET product name to compare with SSEBop ('
//+'Options: FLUXCOM_RSMETEO, FLUXCOM_RS, GLDAS, GLEAM, PML_V2, MOD16A2, TerraClim):','GLEAM');
// ======================================== VISUALIZATION PARAMETERS =============================================
var ETa_Palette = ['#CA5C25','#BA8949', '#F6CD6C','#E0FF8B', '#90F24F', '#0AC16C','#068A3B','#23548B'];
var R2_Palette = ['LemonChiffon','YellowGreen','LightSeaGreen','SteelBlue','Navy'];
var RMSE_Palette = ['Cornsilk','NavajoWhite','SandyBrown','OrangeRed'];
var NSE_Palette = ['LemonChiffon','YellowGreen','LightSeaGreen','SteelBlue','Navy'];
var visMonthET = {min: 0, max: 150, palette: ETa_Palette};
// Map visualization parameters
var ETa_viz_month = {min:0,max:150,palette: ETa_Palette};
var viz_R2 = {min:0.5,max:1,palette: R2_Palette};
var viz_RMSE = {min:0,max:50,palette: RMSE_Palette};
var viz_NSE = {min:0,max:1,palette: NSE_Palette};
//['#CA5C25','#BA8949', '#F6CD6C','#E0FF8B', '#90F24F', '#0AC16C','#068A3B','#23548B']
//============================================= INPUT DATA =========================================================
// Paraiba do Sul basin limits (from ANA ottobacias)
var BHPS = ee.FeatureCollection('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/BH_ParaibaDoSul_BHO_2017');
var BHPS_buffer15km = ee.FeatureCollection('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/BHPS_MDEHC_buffer15km');
// Landsat-based monthly ETa from SSEBop (1987-2017)
var ETa_SSEBop = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ETa_BHPS_monthly_SSEBop_elvi_1987_to_2017');
var LT_SSEBop_month_all = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ETa_LT_monthly_all_BHPS_1987to2017');
//--------------------------------------------- Validation Datasets (ET) --------------------------------------------------
// Monthly ETa from Gridded FluxNet - Max Planck Institute
var FLUXCOM_RS = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/monthly_ET_GFET_RS_2001_to_2015');
var FLUXCOM_RSMETEO = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/monthly_ET_GFET_50km_1987_to_2016');
// Other ETa datasets (Monthly)
var GLDAS = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/ETa_GLDAS_month_1987to2017');
var GLEAM = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/ETa_GLEAM_month_1987_to_2017');
var PML_V2 = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/ETa_PML_V2_month_2003_to_2017');
var MOD16A2 = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/MOD16A2_month_2001_to_2017');
var TerraClim = ee.Image('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/ET_Valid_Datasets/TerraClim_month_1987_to_2017');
// Datase scale validation metrics
var valid_FLUXCOM_RS = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_FLUXCOM_RS_2001to2015');
var valid_FLUXCOM_RSMETEO = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_FLUXCOM_RSMETEO_1987to2016');
var valid_GLDAS = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_GLDAS_1987to2017');
var valid_GLEAM = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_GLEAM_1987to2017');
var valid_PML_V2 = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_PML_V2_2003to2017');
var valid_MOD16A2 = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_MOD16A2_2001to2017');
var valid_TerraClim = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_monthly_ETa_TerraClim_1987to2017');
var valid_average = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Validation/SSEBop_ELVI/valid_metrics_Average_7_datasets_monthly')
  .clip(BHPS);
//============================================= FUNCTIONS ===============================================
// Functions to stack image colletion series into image bands  
var stackCollection = function(collection) {
  var first = ee.Image(collection.first()).select([]);
  var appendBands = function(image, previous) 
  {return ee.Image(previous).addBands(image);};
  return ee.Image(collection.iterate(appendBands, first));};
// Function to reduce resolution of Landsat SSEBop to other dataset resolution
var ReduceResolution = function(input, listName, refData){
  return input.select(listName).reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort: true
      })
    .reproject({crs: refData.select(0).projection()});
};
// Function to convert image bands to collection
var img2col = function(datelist,img, bandname){
  var cut_list = ee.List.sequence(0, datelist.length().subtract(1), 1);
  var var_select = ee.ImageCollection(cut_list.map(function (cut) {
    var cut_end = ee.Number(cut).add(1);
      return img.slice(ee.Number(cut), cut_end).rename(bandname);}));
  return var_select.map(function(img){
            var index = ee.Number.parse(img.get('system:index'));
            var dateStr = datelist.get(index);
            var d = ee.Date(dateStr);
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y,'system:time_start':millis});
}).sort('system:time_start', true);
};
// Function to set a month property into a ImageCollection
var setMonth = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var m = ee.Number(d.get('month'));
            return img.set({'month':m});
};
var setYear = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
// Function to annual aggregation from monthly data
var annualAgreg = function(col,datelist,bandname){return ee.ImageCollection.fromImages(
      datelist.map(function(y){
        return col
          .filterMetadata('year', 'equals', y)
          .select(bandname).sum()
          .set('year', y)}))
          .map(function(img){
            var index = ee.Number.parse(img.get('system:index'));
            var dateStr = datelist.map(getYearsDateList).get(index);
            var millis = ee.Date(ee.Date(dateStr).format('yyyy-MM-dd')).millis();
            return img.set({'system:time_start':millis})})};
// Function to compute Long-Term (LT) mean values
var getLTmean = function(col, datelist, timestep, bandname){return ee.ImageCollection.fromImages(
  datelist.map(function(t){
        return col
            .filterMetadata(timestep, 'equals', t)
            .select(bandname).mean()
            .set(timestep, t)}))};            
// Function to set Months and Year names as list
var SetMonthYear = function(startY, endY){
  var listYears = ee.List.sequence(startY,endY,1);
  var months = ee.List.sequence(1, 12);
  return listYears.map(function(y){
        return months.map(function(m) {return ee.Date.fromYMD(y,m,1).format('yyyy-MM-dd')})}).flatten();
};
var SetMonthNames = function(startY, endY){
  var listYears = ee.List.sequence(startY,endY,1);
  var months = ee.List.sequence(1, 12);
  return listYears.map(function(y){
        return months.map(function(m) {return ee.Date.fromYMD(y,m,1).format('MMM-yyyy')})}).flatten();
};
var getYearsDateList = function(y){return ee.Date.fromYMD(y,1,1).format('yyyy-MM-dd')};
var SetYearNames = function(start, end){
  var listYears = ee.List.sequence(start,end,1);
  return listYears.map(function(list){return ee.String('year_').cat(ee.Number(list).int())});
};
var months_names = ee.List(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']);
var compositeMetrics = function(metric, img1,img2,img3,img4,img5,img6,img7,name1,name2,name3,name4,name5,name6,name7){
  return ee.Image.cat([
    img1.select(metric).rename(name1),
    img2.select(metric).rename(name2),
    img3.select(metric).rename(name3),
    img4.select(metric).rename(name4),
    img5.select(metric).rename(name5),
    img6.select(metric).rename(name6),
    img7.select(metric).rename(name7)
]);
};
//============================================= PROCESSING STEPS ===============================================
// Composite products validations metrics into image bands
var R2_img = compositeMetrics(
  'R2',
  valid_FLUXCOM_RSMETEO,valid_FLUXCOM_RS,valid_GLDAS,valid_GLEAM,valid_PML_V2,valid_MOD16A2,valid_TerraClim,
  'FLUXCOM_RSMETEO','FLUXCOM_RS','GLDAS','GLEAM','PML_V2','MOD16A2','TerraClim');
var RMSE_img = compositeMetrics(
  'RMSE',
  valid_FLUXCOM_RSMETEO,valid_FLUXCOM_RS,valid_GLDAS,valid_GLEAM,valid_PML_V2,valid_MOD16A2,valid_TerraClim,
  'FLUXCOM_RSMETEO','FLUXCOM_RS','GLDAS','GLEAM','PML_V2','MOD16A2','TerraClim');
var NSE_img = compositeMetrics(
  'NSE',
  valid_FLUXCOM_RSMETEO,valid_FLUXCOM_RS,valid_GLDAS,valid_GLEAM,valid_PML_V2,valid_MOD16A2,valid_TerraClim,
  'FLUXCOM_RSMETEO','FLUXCOM_RS','GLDAS','GLEAM','PML_V2','MOD16A2','TerraClim');
// Reduce resolution of Landsat SSEBop to Other datasets resolution
var SSEBop_FLUXCOM_RS = ReduceResolution(ETa_SSEBop, SetMonthNames(2001,2015), FLUXCOM_RS).clip(BHPS);
var SSEBop_FLUXCOM_RSMETEO = ReduceResolution(ETa_SSEBop, SetMonthNames(1987,2016), FLUXCOM_RSMETEO).clip(BHPS);
var SSEBop_GLDAS = ReduceResolution(ETa_SSEBop, SetMonthNames(1987,2017), GLDAS).clip(BHPS);
var SSEBop_GLEAM = ReduceResolution(ETa_SSEBop, SetMonthNames(1987,2017), GLEAM).clip(BHPS);
var SSEBop_PML_V2 = ReduceResolution(ETa_SSEBop, SetMonthNames(2003,2017), PML_V2).clip(BHPS);
var SSEBop_MOD16A2 = ReduceResolution(ETa_SSEBop, SetMonthNames(2001,2017), MOD16A2).clip(BHPS);
var SSEBop_TerraClim = ReduceResolution(ETa_SSEBop, SetMonthNames(1987,2017), TerraClim).clip(BHPS);
// Convert image band to collection
var FLUXCOM_RS_col = (img2col(SetMonthYear(2001,2015), SSEBop_FLUXCOM_RS,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(2001,2015), FLUXCOM_RS.clip(BHPS),'FLUXCOM_RS_ETa').map(setMonth));
var FLUXCOM_RSMETEO_col = (img2col(SetMonthYear(1987,2016), SSEBop_FLUXCOM_RSMETEO,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(1987,2016), FLUXCOM_RSMETEO.clip(BHPS),'FLUXCOM_RSMETEO_ETa').map(setMonth));
var GLDAS_col = (img2col(SetMonthYear(1987,2017), SSEBop_GLDAS,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(1987,2017), GLDAS.clip(BHPS),'GLDAS_ETa').map(setMonth));
var GLEAM_col = (img2col(SetMonthYear(1987,2017), SSEBop_GLEAM,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(1987,2017), GLEAM.clip(BHPS),'GLEAM_ETa').map(setMonth));
var PML_V2_col = (img2col(SetMonthYear(2003,2017), SSEBop_PML_V2,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(2003,2017), PML_V2.clip(BHPS),'PML_V2_ETa').map(setMonth));
var MOD16A2_col = (img2col(SetMonthYear(2001,2017), SSEBop_MOD16A2,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(2001,2017), MOD16A2.clip(BHPS),'MOD16A2_ETa').map(setMonth));
var TerraClim_col = (img2col(SetMonthYear(1987,2017), SSEBop_TerraClim,'SSEBop_ETa').map(setMonth))
 .combine(img2col(SetMonthYear(1987,2017), TerraClim.clip(BHPS),'TerraClim_ETa').map(setMonth));
// ============================================== MAP LAYERS =======================================================
//----------------------------------------------------- Long-Term aggregations---------------------------------------------
// Long-Term Monthly (average)
//var SSEBopETa_LT_col = getLTmean(SSEBop_product, ee.List.sequence(1,12,1),'month','SSEBop_ETa').toBands().rename(months_names);
//var GlobalETa_LT_col = getLTmean(GlobalET_product, ee.List.sequence(1,12,1),'month',SetETproduct+'_ETa').toBands().rename(months_names); 
// Monthly (average)
var FLUXCOM_RSMETEO_avg = FLUXCOM_RSMETEO_col.select('FLUXCOM_RSMETEO_ETa').mean();
var FLUXCOM_RS_avg = FLUXCOM_RS_col.select('FLUXCOM_RS_ETa').mean();
var GLDAS_avg = GLDAS_col.select('GLDAS_ETa').mean();
var GLEAM_avg = GLEAM_col.select('GLEAM_ETa').mean();
var PML_V2_avg = PML_V2_col.select('PML_V2_ETa').mean();
var MOD16A2_avg = MOD16A2_col.select('MOD16A2_ETa').mean();
var TerraClim_avg = TerraClim_col.select('TerraClim_ETa').mean();
// Set map visualizations as UI
var FLUXCOM_RSMETEO_product = ui.Map.Layer(FLUXCOM_RSMETEO_avg,ETa_viz_month, 'FLUXCOM RS+METEO ETa (mm/month)');
var FLUXCOM_RS_product = ui.Map.Layer(FLUXCOM_RS_avg,ETa_viz_month, 'FLUXCOM RS ETa (mm/month)');
var GLDAS_product = ui.Map.Layer(GLDAS_avg,ETa_viz_month, 'GLDAS ETa (mm/month)');
var GLEAM_product = ui.Map.Layer(GLEAM_avg,ETa_viz_month, 'GLEAM ETa (mm/month)');
var PML_V2_product = ui.Map.Layer(PML_V2_avg,ETa_viz_month, 'PML_V2 ETa (mm/month)');
var MOD16A2_product = ui.Map.Layer(MOD16A2_avg,ETa_viz_month, 'MOD16A2 ETa (mm/month)');
var TerraClim_product = ui.Map.Layer(TerraClim_avg,ETa_viz_month, 'TerraClim ETa (mm/month)');
// Set map visualizations as UI for statistics
var R2_map = ui.Map.Layer(valid_average.select('R2'),viz_R2, 'Average R²');
var RMSE_map = ui.Map.Layer(valid_average.select('RMSE'),viz_RMSE, 'Average RMSE (mm/month)');
var NSE_map = ui.Map.Layer(valid_average.select('NSE'),viz_NSE, 'Average NSE');
// Make checkbox to select ET products
var checkbox1 = ui.Checkbox('FLUXCOM RS+METEO',false);
var checkbox2 = ui.Checkbox('FLUXCOM RS',false);
var checkbox3 = ui.Checkbox('GLDAS',false);
var checkbox4 = ui.Checkbox('GLEAM',false);
var checkbox5 = ui.Checkbox('PML_V2',false);
var checkbox6 = ui.Checkbox('MOD16A2',false);
var checkbox7 = ui.Checkbox('TerraClim',false);
// Make checkbox to select Statistics
var checkbox8 = ui.Checkbox('R2 (Average)',false);
var checkbox9 = ui.Checkbox('RMSE (Average)',false);
var checkbox10 = ui.Checkbox('NSE (Average)',false);
var SSEBop_LT = ui.Map.Layer(LT_SSEBop_month_all, ETa_viz_month, 'Landsat SSEBop ETa (mm/month)');
//=================================================== INSERT CHARTS ======================================================
//============================================ Add Title and Charts on panel =========================================================
// Add the panel to the ui.root.
var mapPanel = ui.Map();
//var layers = mapPanel.layers();
//layers.add([FLUXCOM_RSMETEO_product,FLUXCOM_RS_product]);
mapPanel.centerObject(BHPS,8);
mapPanel.setOptions("SATELLITE");  
mapPanel.style().set('cursor', 'crosshair');
var MonthlyETNames = ['0-25 mm', '25-50 mm', '50-75 mm', '75-100 mm', '100-125 mm', '125-150 mm', '150-175 mm', '> 175 mm'];
// Create Period Titlle to show on map
var mapTitle = ui.Label({
    value: 'ETa intercomparison: SSEBop X Global ET datasets',
    style: {fontSize: '14px'}
  });
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '600px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Global ET intercomparison over PSRB (1987 to 2017)',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to show time-series plots.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
panel.add(ui.Label('[Chart]'));
panel.add(ui.Label('[Legend]'));
// Register a callback on the default map to be invoked when the map is clicked.
var generateChart = function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
  mapPanel.layers().set(1, dot);
  // Create an Monthly ET chart.
  var createChart = function(img, product, Panel, panelOrder, ChartTitle){
    var chart = ui.Chart.image.series(img.select(['SSEBop_ETa',product+'_ETa']), point, ee.Reducer.mean(), 1000)
      chart.setOptions({
        title: ChartTitle,
        vAxis: {title: 'mm / month'},
        hAxis:{title: 'Year'},
        colors: ['Blue','Red'],
        lineWidth: 1,
        pointSize: 0,
    });
  Panel.widgets().set(panelOrder, chart);
};
  createChart(FLUXCOM_RSMETEO_col,'FLUXCOM_RSMETEO',panel,2,'Monthly ET intercomparison (1987 - 2016)');
  createChart(FLUXCOM_RS_col,'FLUXCOM_RS',panel,3,'Monthly ET intercomparison (2001 - 2015)');
  createChart(GLDAS_col,'GLDAS',panel,4,'Monthly ET intercomparison (1987 - 2017)');
  createChart(GLEAM_col,'GLEAM',panel,5,'Monthly ET intercomparison (1987 - 2017)');
  createChart(PML_V2_col,'PML_V2',panel,6,'Monthly ET intercomparison (2003 - 2017)');
  createChart(MOD16A2_col,'MOD16A2',panel,7,'Monthly ET intercomparison (2001 - 2017)');
  createChart(TerraClim_col,'TerraClim',panel,8,'Monthly ET intercomparison (1987 - 2017)');
};
// Function to get validation metrics
var getMetrics = function(coords) {
  // Create a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Get the Metrics from validation images
  var R2 = ee.ImageCollection(R2_img).getRegion(point, 1000).flatten();
  var RMSE = ee.ImageCollection(RMSE_img).getRegion(point, 1000).flatten();
  var NSE = ee.ImageCollection(NSE_img).getRegion(point, 1000).flatten();
  //FLUXCOM RS+METEO metrics
  var FLUX1_panel = ui.Panel();
  FLUX1_panel.add(ui.Label({value:'FLUXCOM RS+METEO:',style: {fontWeight: 'bold'}}));
  FLUX1_panel.add(ui.Label('R²: '+R2.get(15).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(15).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(15).getInfo().toFixed(3)));
  panel2.add(FLUX1_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){FLUX1_panel.clear()});
   //FLUXCOM RS metrics
  var FLUX2_panel = ui.Panel();
  FLUX2_panel.add(ui.Label({value:'FLUXCOM RS:',style: {fontWeight: 'bold'}}));
  FLUX2_panel.add(ui.Label('R²: '+R2.get(16).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(16).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(16).getInfo().toFixed(3)));
  panel2.add(FLUX2_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){FLUX2_panel.clear()});
  //GLDAS metrics
  var GLDAS_panel = ui.Panel();
  GLDAS_panel.add(ui.Label({value:'GLDAS:',style: {fontWeight: 'bold'}}));
  GLDAS_panel.add(ui.Label('R²: '+R2.get(17).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(17).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(17).getInfo().toFixed(3)));
  panel2.add(GLDAS_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){GLDAS_panel.clear()});
  //GLEAM metrics
  var GLEAM_panel = ui.Panel();
  GLEAM_panel.add(ui.Label({value:'GLEAM:',style: {fontWeight: 'bold'}}));
  GLEAM_panel.add(ui.Label('R²: '+R2.get(18).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(18).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(18).getInfo().toFixed(3)));
  panel2.add(GLEAM_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){GLEAM_panel.clear()});
  //PML_V2 metrics
  var PML_V2_panel = ui.Panel();
  PML_V2_panel.add(ui.Label({value:'PML_V2:',style: {fontWeight: 'bold'}}));
  PML_V2_panel.add(ui.Label('R²: '+R2.get(19).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(19).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(19).getInfo().toFixed(3)));
  panel2.add(PML_V2_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){PML_V2_panel.clear()});
  //MOD16A2 metrics
  var MOD16A2_panel = ui.Panel();
  MOD16A2_panel.add(ui.Label({value:'MOD16A2:',style: {fontWeight: 'bold'}}));
  MOD16A2_panel.add(ui.Label('R²: '+R2.get(20).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(20).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(20).getInfo().toFixed(3)));
  panel2.add(MOD16A2_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){MOD16A2_panel.clear()});
  //TerraClimate metrics
  var TerraClimate_panel = ui.Panel();
  TerraClimate_panel.add(ui.Label({value:'TerraClimate:',style: {fontWeight: 'bold'}}));
  TerraClimate_panel.add(ui.Label('R²: '+R2.get(21).getInfo().toFixed(3))).add(ui.Label('RMSE: '+RMSE.get(21).getInfo().toFixed(2)+' mm')).add(ui.Label('NSE: '+NSE.get(21).getInfo().toFixed(3)));
  panel2.add(TerraClimate_panel.add(ui.Label('...............................')));
  mapPanel.onClick(function(){TerraClimate_panel.clear()});
};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
// Create the color bar for the legend.
// For ET
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// For R²
var colorBarR2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(R2_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '12px'},
});
// For RMSE
var colorBarRMSE = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(RMSE_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '12px'},
});
// For NSE
var colorBarNSE = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(NSE_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '12px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visMonthET.min, {margin: '4px 8px'}),
    ui.Label(
        (visMonthET.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visMonthET.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For R²
var legendLabelsR2 = ui.Panel({
  widgets: [
    ui.Label(viz_R2.min),
    ui.Label(('R²'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_R2.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For RMSE
var legendLabelsRMSE = ui.Panel({
  widgets: [
    ui.Label(viz_RMSE.min),
    ui.Label(('RMSE'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_RMSE.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For NSE
var legendLabelsNSE = ui.Panel({
  widgets: [
    ui.Label(viz_NSE.min),
    ui.Label(('NSE'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_NSE.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Create legend titles
var legendTitle = ui.Label({
  value: 'Long-Term monthly ETa (mm)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px',
    padding: '0'
    }
});
//var legendTitleR2 = ui.Label({value:'R²',style: {position: 'top-center'}})
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set('width', '300px').set('position','bottom-center');
mapPanel.widgets().set(1,legendPanel);
var legendR2 = ui.Panel([colorBarR2, legendLabelsR2]);
legendR2.style().set('width', '200px').set('position','bottom-right');
var legendRMSE = ui.Panel([colorBarRMSE, legendLabelsRMSE]);
legendRMSE.style().set('width', '200px').set('position','bottom-right');
var legendNSE = ui.Panel([colorBarNSE, legendLabelsNSE]);
legendNSE.style().set('width', '200px').set('position','bottom-right');
//mapPanel.add(legendNSE).add(legendRMSE).add(legendR2);
//============================================ Add Legend on second panel (on the right) =========================================================
// Create a second panel to hold the legends.
var panel2 = ui.Panel();
panel2.style().set('width', '200px');
var panelCheck = ui.Panel();
panelCheck.style()
  .set('width', '200px')
  .set('margin', '10px');
var panelCheckStats = ui.Panel();
panelCheckStats.style()
  .set('width', '200px')
  .set('margin', '10px');
var CheckboxTitle = ui.Label({
  value: 'Select Global ET product',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px',
    padding: '0'
    }
});
var CheckboxTitleStats = ui.Label({
  value: 'Select Statistics to Map',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px',
    padding: '0'
    }
});
var TitleStats = ui.Label({
  value: 'Statistics metrics '+
  '(Clicked point):',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    //margin: '4px',
    padding: '0',
    textAlign: 'center'
    }
});
panelCheck.add(CheckboxTitle);
panelCheckStats.add(CheckboxTitleStats);
// Add checkbox to select ET products
checkbox1.onChange(function(checked){mapPanel.add(FLUXCOM_RSMETEO_product.setShown(checked))});
checkbox2.onChange(function(checked){mapPanel.add(FLUXCOM_RS_product.setShown(checked))});
checkbox3.onChange(function(checked){mapPanel.add(GLDAS_product.setShown(checked))});
checkbox4.onChange(function(checked){mapPanel.add(GLEAM_product.setShown(checked))});
checkbox5.onChange(function(checked){mapPanel.add(PML_V2_product.setShown(checked))});
checkbox6.onChange(function(checked){mapPanel.add(MOD16A2_product.setShown(checked))});
checkbox7.onChange(function(checked){mapPanel.add(TerraClim_product.setShown(checked))});
// Add checkbox to select Statistics metrics
checkbox8.onChange(function(checked){
  mapPanel.add(R2_map.setShown(checked));
  mapPanel.add(legendR2);});
checkbox9.onChange(function(checked){
  mapPanel.add(RMSE_map.setShown(checked));
  mapPanel.add(legendRMSE);
});
checkbox10.onChange(function(checked){
  mapPanel.add(NSE_map.setShown(checked));
  mapPanel.add(legendNSE);
});
panelCheck.add(checkbox1);
panelCheck.add(checkbox2);
panelCheck.add(checkbox3);
panelCheck.add(checkbox4);
panelCheck.add(checkbox5);
panelCheck.add(checkbox6);
panelCheck.add(checkbox7);
panelCheckStats.add(checkbox8);
panelCheckStats.add(checkbox9);
panelCheckStats.add(checkbox10);
panel2.add(panelCheck).add(panelCheckStats);
var divLine1 = ui.Label('__________________________');
panel2.add(divLine1);
panel2.add(TitleStats);
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
mapPanel.onClick(getMetrics);
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-43.53, -22.03);
/*
 * Initialize the app
 */
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel.add(mapTitle).add(SSEBop_LT)));
ui.root.insert(2, panel2);
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
getMetrics({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});