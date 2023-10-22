// ========================================== INPUT PARAMETERS =================================================
var StartYear = 1987;
var EndYear = 2017;
// ======================================== VISUALIZATION PARAMETERS =============================================
var ETa_Palette = ['#CA5C25','#BA8949', '#F6CD6C','#E0FF8B', '#90F24F', '#0AC16C','#068A3B','#23548B'];
var Anomaly_Palette = ['#D2691E','#F4A460','#FFDEAD','#DCDCDC','#D1F6A7','#8ACB28','#4A9308'];
var Trend_Palette = ['#FF0000','#FFA500','#FFDAB9','#C0C0C0','#90EE90','#32CD32','#008000'];
var LandCover_Palette = ['#288E14','#9C9C9C','#FADE81','#F5310A','#128EFA'];
var visMonthET = {min: 0, max: 200, palette: ETa_Palette};
var visQuarterET = {min: 0, max: 500, palette: ETa_Palette};
var visYearET = {min: 0, max: 1500, palette: ETa_Palette};
var visTrendYear = {min: -20, max: 20, palette: Trend_Palette};
var LandCover_vis = {min: 1, max: 5, palette: LandCover_Palette};
// ==================================================== INPUT DATA =====================================================
// Paraiba do Sul basin limits (from ANA ottobacias)
var BHPS = ee.FeatureCollection('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/BH_ParaibaDoSul_BHO_2017');
var BHPS_15km = ee.FeatureCollection('users/ricardogeo/SSEBop_1987_2017/Ancillary_data/BHPS_MDEHC_buffer15km');
// Monthly and Annual NCEP/CFSv2 based reference ET (ET0)
var ET0_monthly = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ET0_monthly_1987_to_2017').clip(BHPS);
var ET0_year = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ET0_annual_1987_to_2017').clip(BHPS);
// Monthly and Annual Precipitation - CHIRPS and TerraClimate ensemble
var P_monthly = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/Ensemble_monthly_precipitation_1987to2017').clip(BHPS);
var P_year = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/Ensemble_annual_precipitation_1987to2017').clip(BHPS);
// Landsat-based ETa by SSEBop model from 1987 to 2017 (Monthly and Annual)
var ETa_monthly = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ETa_BHPS_monthly_SSEBop_elvi_1987_to_2017')
  .clip(BHPS);
var ETa_year = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Results/ETa_BHPS_annual_SSEBop_elvi_1987_to_2017').clip(BHPS);
// Trend analisys datasets (Monthly, Quarterly and Annual)
var MK_year = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Trends/annual_MK_test');
var seas_MK_month = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Trends/monthly_seasonal_MK_test');
var seas_MK_quarter = ee.Image('users/ricardogeo/SSEBop_1987_2017/BHPS_Trends/quarterly_seasonal_MK_test');
// LandCover from Mapbiomas project (Collection 3.1)
var mapbiomas = ee.Image('projects/mapbiomas-workspace/public/collection3_1/mapbiomas_collection31_integration_v1');
//Map.addLayer(ee.Image(1),{min:1,palette:['Black']},'Background');
// ============================================ TREND ANALISYS (MANN-KENDALL FUNCTION) ================================================
// Function - Compute signals between continuous data to Mann-Kendall test
var getSign = function(img){
        var index = ee.Number.parse(img.get('system:index'));
        // Data mask
        var background = img.select(0).unmask(-9999);
        var mask = background.neq(-9999).selfMask().rename('mask');
        //Compute sgn
        var sgn = img.neq(0).where(img.gt(0),1).where(img.lt(0),-1);
        var sgn_pos = sgn.eq(1).slice(0,index.add(1)).reduce(ee.Reducer.sum()).rename('sgn_pos');
        var sgn_neg = sgn.eq(-1).slice(0,index.add(1)).reduce(ee.Reducer.sum()).rename('sgn_neg');
        return mask.addBands([sgn_pos,sgn_neg]);
};
// Function - Get tied values in annual data
var getTied = function(img){
        var index = ee.Number.parse(img.get('system:index'));
        // Data mask
        var background = img.select(0).unmask(-9999);
        var mask = background.neq(-9999).selfMask().rename('mask');
        // Compute tie values
        var tie = img.eq(0).where(img.eq(0),1).updateMask(mask);
        var tie_sum = tie.reduce(ee.Reducer.sum());
        var tied_cor = img.expression('(i)*(i-1)*(2*i+5)',{'i':tie_sum}).reduce(ee.Reducer.sum());        
        return tied_cor.rename('tied_cor');
};
// Function - compute Mann-kendall test
var MannKendall = function(sgn,tied){
  // Sumation of each signals
  var sgn_pos = sgn.select('sgn_pos').sum();
  var sgn_neg = sgn.select('sgn_neg').sum();
  // Compute S, n and var(S) values
  var S = sgn_pos.subtract(sgn_neg); 
  var n = ee.Image(sgn.size());
  var varS = S.expression('(n*(n-1)*(2*n+5)-tied)/18',{'n':n,'tied':tied.select('tied_cor')});
  var tau = n.expression('S/(n*(n-1)/2)',{'n':n,'S':S});
  // Mann-Kendall test
  var Zmk = (S.add(1)).divide(varS.pow(0.5))
    .where(S.eq(0),0)
    .where(S.gt(0),(S.subtract(1)).divide(varS.pow(0.5)));
  return Zmk.rename('z-value').addBands([
    S.rename('S'),
    varS.rename('varS'),
    tau.rename('tau'),
    n.rename('n')
    ]);
};
// Compute p-value from z-value (Not-Used)
var ZtoP_value_experimental = function(mask,Zimg){
  return mask.rename('p-value')
    .where(Zimg.abs().gte(0),Zimg.expression('1+((abs(z)-0)*((1-0.1)/(0-1.645)))',{'z':Zimg}))
    .where(Zimg.abs().gte(1.645),Zimg.expression('0.1+((abs(z)-1.645)*((0.1-0.05)/(1.645-1.960)))',{'z':Zimg}))
    .where(Zimg.abs().gte(1.960),Zimg.expression('0.05+((abs(z)-1.960)*((0.05-0.01)/(1.960-2.576)))',{'z':Zimg}))
    .where(Zimg.abs().gte(2.576),Zimg.expression('0.01+((abs(z)-2.576)*((0.01-0.001)/(2.576-3.292)))',{'z':Zimg}))
    .where(Zimg.abs().gte(3.292),Zimg.expression('0.001+((abs(z)-3.292)*((0.001)/(3.292-10)))',{'z':Zimg}));
};
// Function - Reclassify to p-values from critical z-values
var ZtoP_value = function(mask,Zimg){
  return mask.rename('p-value')
    .where(Zimg.abs().gte(0),1.000)
    .where(Zimg.abs().gte(1.645),0.100)
    .where(Zimg.abs().gte(1.960),0.050)
    //.where(Zimg.abs().gte(2.326),0.020)
    .where(Zimg.abs().gte(2.576),0.010)
    //.where(Zimg.abs().gte(3.090),0.002)
    .where(Zimg.abs().gte(3.292),0.001);
};
// ================================================= AUXILIAR FUNCTIONS ================================================
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
// Function to set a Year property into a ImageCollection
var setYear = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
// Function to set a Quarter property into a ImageCollection
var setQuarter = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
// Function to annual aggregation from monthly data
var annualAgreg = function(col, bandname){return ee.ImageCollection.fromImages(
      ee.List.sequence(StartYear,EndYear,1).map(function(y){
        return col
          .filterMetadata('year', 'equals', y)
          .select(bandname).sum()
          .set('year', y)}))
          .map(function(img){
            var index = ee.Number.parse(img.get('system:index'));
            var dateStr = ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList).get(index);
            var millis = ee.Date(ee.Date(dateStr).format('yyyy-MM-dd')).millis();
            return img.set({'system:time_start':millis})})};
// Function to quarterly aggregation from monthly data
var quarterAgreg = function(col, datelist, bandname){return ee.ImageCollection.fromImages(
      ee.List.sequence(StartYear,EndYear,1).map(function(y){
        return datelist.map(function(m) {
            return col
              .filterMetadata('year', 'equals', y)
              .filter(ee.Filter.inList('month', m))
              .select(bandname).sum()
              .set('year', y)
              .set('quarter', m)
              .set('system:time_start',ee.Date.fromYMD(y,ee.List(m).flatten().get(0),1).millis());
              })}).flatten())};
// Function to compute Long-Term (LT) mean values
var getLTmean = function(col, datelist, timestep, bandname){return ee.ImageCollection.fromImages(
  datelist.map(function(t){
        return col
            .filterMetadata(timestep, 'equals', t)
            .select(bandname).mean()
            .set(timestep, t)}))};
// Function to get spatial Mean
var getMean = function(img, aoi, cellsize){
  return img.reduceRegion({
    reducer:ee.Reducer.mean(),
    geometry:aoi,
    scale: cellsize,
    bestEffort: true
    });
};
// Functions to stack image colletion series into image bands  
var stackCollection = function(collection) {
  var first = ee.Image(collection.first()).select([]);
  var appendBands = function(image, previous) 
  {return ee.Image(previous).addBands(image);};
  return ee.Image(collection.iterate(appendBands, first));};
// Function to generate Download Links  
var getDownloadLink = function(filename, dic1,dic2,dic3,dic4,dic5){
  var col_dic = ee.FeatureCollection([
    ee.Feature(null, dic1).set({'LC':'Forest'}),
    ee.Feature(null, dic2).set({'LC':'Non_Forest'}),
    ee.Feature(null, dic3).set({'LC':'Farming'}),
    ee.Feature(null, dic4).set({'LC':'Non_Vegetation'}),
    ee.Feature(null, dic5).set({'LC':'Water'}),
    ]);
  return col_dic.getDownloadURL({
      filename: filename, 
      format: 'CSV',
      selectors: ['LC', dic1.keys().getInfo()]
      })};
// Function to set Months, Quarter and Year names as list
var datelistMonthYear = ee.List.sequence(StartYear,EndYear,1).map(function(y){
        return ee.List.sequence(1, 12).map(function(m) {return ee.Date.fromYMD(y,m,1).format('yyyy-MM-dd')})}).flatten();
var getYearsDateList = function(y){return ee.Date.fromYMD(y,1,1).format('yyyy-MM-dd')};
var SetYearNames = function(start, end){
  var listYears = ee.List.sequence(start,end,1);
  return listYears.map(function(list){return ee.String('year_').cat(ee.Number(list).int())});
};
var months_names = ee.List(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']);
var quarter_names = ee.List(['JFM','AMJ','JAS','OND']);
var NamesQuarterYear = ee.List.sequence(StartYear,EndYear,1).map(function(y){
        return quarter_names.map(function(m) {return ee.String(m).cat("_").cat(ee.Number(y).int())})}).flatten();
// Number indices of months for each Quarter
var quarter_n = ee.List([
  ee.List([1,2,3]), // First Quarter (JFM)
  ee.List([4,5,6]), // Second Quarter (AMJ)
  ee.List([7,8,9]), // Third Quarter (JAS)
  ee.List([10,11,12]), // Fourth Quarter (OND)
]);
// Add independent variables into collection
var addVariables = function(img) {
  var date = ee.Date(img.get('system:time_start'));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  var months = date.difference(ee.Date('1970-01-01'), 'month');
  return img
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    .addBands(ee.Image(months).rename('m').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Create composite bands from multiple images
var compositeImages = function(value, img1,img2,img3,img4,img5,img6,name1,name2,name3,name4,name5,name6){
  return ee.Image.cat([
    img1.select(value).rename(name1),
    img2.select(value).rename(name2),
    img3.select(value).rename(name3),
    img4.select(value).rename(name4),
    img5.select(value).rename(name5),
    img6.select(value).rename(name6)
]);
};
// Create trend charts function
var createTrendChart = function(img, point, band, color, Panel, panelOrder){
    var chart = ui.Chart.image.series(img.select(band), point, ee.Reducer.mean(), 1000)
    .setChartType('LineChart')
    .setOptions({
        title: band+ ' average ETa over PSRB ('+StartYear+' to '+EndYear+') - annual Trend',
        vAxis: {title: 'mm / year'},
        hAxis:{title: 'Year'},
        colors: [color],
        lineWidth: 2,
        pointSize: 0,
        trendlines: {0: {lineDashStyle: [4, 4],
          title: 'Trend line',
          color: 'Black',
          lineWidth: 1,
//          lineDashStyle: [5, 1]
          }}
        });
  Panel.widgets().set(panelOrder, chart);
};
// Create LandCover ETa charts function
var create_LC_ETaChart = function(img, point, bandNames, Panel, panelOrder){
  var chart = ui.Chart.image.series(img.select(bandNames), point, ee.Reducer.mean(), 10000);
  chart.setOptions({
    title: 'average annual ETa by LandCover over PSRB ('+StartYear+' to '+EndYear+')',
    vAxis: {title: 'mm / year'},
    hAxis:{title: 'Year'},
    colors: ['#FADE81','#288E14','#9C9C9C','#F5310A','#128EFA'],
    lineWidth: 1.5,
    pointSize: 0,
    });
  Panel.widgets().set(panelOrder, chart);
};
// ================================================= PROCESSING STEPS ================================================
//---------------------------------------------- Aggregate LandCover classes---------------------------------------------
// Period year list
var periodYear = SetYearNames(StartYear, EndYear);
var countYears = periodYear.length();
// Create a dictionary of LandCover reclass names
var LC_dict = ee.Dictionary({
    '1':'Forest',
    '2':'Non Forest Natural Formation',
    '3':'Farming',
    '4':'Non vegetated area',
    '5':'Water'
});
// Convert to ImageCollection
var Mapbiomas_col = img2col(ee.List.sequence(1985,2017,1).map(getYearsDateList),
  mapbiomas.set('LandCover_level1',LC_dict),'LC');
// Grouping Mapbiomas class
var Mapbiomas_col_reclass = Mapbiomas_col.map(function(img){
  return img.remap(
  [3,4,5,9,11,12,32,13,15,18,19,20,21,23,24,29,30,25,33,31,27], 
  [1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,6]);
});
var Mapbiomas_reclass = Mapbiomas_col_reclass.toBands().rename(SetYearNames(1985,2017))
  .set('LandCover_level1',LC_dict);
// Generate mask for main LandCover classes in 1987-2017 period
// 1. Forest
var forest = Mapbiomas_reclass.eq(1).selfMask();
// 2. Non Forest Natural Formation
var non_forest = Mapbiomas_reclass.eq(2).selfMask();
// 3. Farming
var farming = Mapbiomas_reclass.eq(3).selfMask();
// 4. Non vegetated area
var non_veget = Mapbiomas_reclass.eq(4).selfMask();
// 5. Water
var water = Mapbiomas_reclass.eq(5).selfMask();
// 6. Non Observed
var non_obs = Mapbiomas_reclass.eq(6).selfMask();
// Select No-Changed LandCover classes for 1987-2017 period
var ever_forest = forest.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
var ever_non_forest = non_forest.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
var ever_farming = farming.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
var ever_non_veget = non_veget.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
var ever_water = water.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
var ever_non_obs = non_obs.select(periodYear).reduce(ee.Reducer.sum()).eq(countYears).selfMask();
// Merge No-Changed LandCover classes for 1987-2017 period
var NoChanged_classes = ever_forest
  .blend(ever_non_forest.multiply(2))
  .blend(ever_farming.multiply(3))
  .blend(ever_non_veget.multiply(4))
  .blend(ever_water.multiply(5))
  .blend(ever_non_obs.multiply(6))
  .rename('NoChange_LC')
  .clip(BHPS);
// Merge LandCover classes for 1987-2017 period into the PSRB (or BHPS)
var Mapbiomas_col_reclass_BHPS = Mapbiomas_col_reclass.map(function(img){
    return img.clip(BHPS).rename('LC')});
//-------------------------------------------------- Data management ---------------------------------------------
// Convert image band to collection
// Annual
var ETa_annual_col = img2col(ee.List.sequence(StartYear, EndYear,1).map(getYearsDateList), ETa_year.select(SetYearNames(StartYear, EndYear)),'ETa');
var ET0_annual_col = img2col(ee.List.sequence(StartYear, EndYear,1).map(getYearsDateList), ET0_year.select(SetYearNames(StartYear, EndYear)),'ET0');
var P_annual_col = img2col(ee.List.sequence(StartYear, EndYear,1).map(getYearsDateList), P_year.select(SetYearNames(StartYear, EndYear)),'Precipitation');
// Monthly
var ETa_monthly_col = img2col(datelistMonthYear, ETa_monthly,'ETa').map(setMonth);
var ET0_monthly_col = img2col(datelistMonthYear, ET0_monthly,'ET0').map(setMonth);
var P_monthly_col = img2col(datelistMonthYear, P_monthly,'Precipitation').map(setMonth);
//----------------------------------------------------- Quarterly aggregation---------------------------------------------
// Actual ET from SSEBop
var ETa_quarter_col = quarterAgreg(ETa_monthly_col,quarter_n,'ETa');
var ETa_quarter = ETa_quarter_col.toBands().rename(NamesQuarterYear);
// Reference ET from NCEY/CFSv2
var ET0_quarter_col = quarterAgreg(ET0_monthly_col,quarter_n,'ET0');
var ET0_quarter = ET0_quarter_col.toBands().rename(NamesQuarterYear);
// Precipitation from CHIRPS and TerraClimate ensemble
var P_quarter_col = quarterAgreg(P_monthly_col,quarter_n,'Precipitation');
var P_quarter = P_quarter_col.toBands().rename(NamesQuarterYear);
//------------------------------------ Combine Datasets (ETa, ET0, Precipitation and LandCover¹) -----------------------------------
//¹ only for annual data
var annual_data = ETa_annual_col.combine(ET0_annual_col).combine(P_annual_col).combine(Mapbiomas_col_reclass_BHPS)
  .map(function(img){
    var NoChangeLC = NoChanged_classes;
    return img.addBands(NoChangeLC);
});
var monthly_data = ETa_monthly_col.combine(ET0_monthly_col).combine(P_monthly_col);
var quarterly_data = ETa_quarter_col.combine(ET0_quarter_col).combine(P_quarter_col);
//---------------------------------------------- ET stats for each LandCover into PSRB---------------------------------------------
var ETa_year_select = ETa_year.select(periodYear);
var LC_reclass = Mapbiomas_reclass.select(periodYear);
// ETa by LandCover (Annual)
var Forest_ETa = ETa_year_select.updateMask(LC_reclass.eq(1));
var NonForest_ETa = ETa_year_select.updateMask(LC_reclass.eq(2));
var Farming_ETa = ETa_year_select.updateMask(LC_reclass.eq(3));
var NonVeget_ETa = ETa_year_select.updateMask(LC_reclass.eq(4));
var Water_ETa = ETa_year_select.updateMask(LC_reclass.eq(5));
// Average Annual ETa by LandCover
var mean_Forest_ETa = getMean(Forest_ETa,BHPS,30);
var mean_NonForest_ETa = getMean(NonForest_ETa,BHPS,30);
var mean_Farming_ETa = getMean(Farming_ETa,BHPS,30);
var mean_NonVeget_ETa = getMean(NonVeget_ETa,BHPS,30);
var mean_Water_ETa = getMean(Water_ETa,BHPS,30);
// FOREST
var forest_ETa_yr = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList),
  mean_Forest_ETa.toImage().float().clip(BHPS), 'Forest');
// NON-FOREST
var non_forest_ETa_yr = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList),
  mean_NonForest_ETa.toImage().float().clip(BHPS),  'Non-forest');
// FARMING
var farming_ETa_yr = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList),
  mean_Farming_ETa.toImage().float().clip(BHPS),'Farming');
// NON-VEGETATION
var non_veget_ETa_yr = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList),
  mean_NonVeget_ETa.toImage().float().clip(BHPS),'Non-vegetation');
// WATER
var water_ETa_yr = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList),
  mean_Water_ETa.toImage().float().clip(BHPS),'Water');
var mean_ETa_yr_LC = forest_ETa_yr
  .combine(non_forest_ETa_yr)
  .combine(farming_ETa_yr)
  .combine(non_veget_ETa_yr)
  .combine(water_ETa_yr);
// --------------------------------------------- ANNUAL MANN-KENDALL PROCESSING FOR EACH LANDCOVER --------------------------------------------------------
// Data mask
var bhps_mask = (ETa_monthly.select(0).unmask(-9999)).neq(-9999).selfMask().rename('mask');
// -------------------------------------------- Annual Mann-Kendall processing for each LandCover --------------------------------------------------------
// Subset input ETa colection by selected Start and End year
var forest_ETa_selected = forest_ETa_yr.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var nonforest_ETa_selected = non_forest_ETa_yr.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var farming_ETa_selected = farming_ETa_yr.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var non_veget_ETa_selected = non_veget_ETa_yr.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var water_ETa_selected = water_ETa_yr.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var ETa_forest_img = mean_Forest_ETa.toImage().float().clip(BHPS);
var ETa_nonforest_img = mean_NonForest_ETa.toImage().float().clip(BHPS);
var ETa_farming_img = mean_Farming_ETa.toImage().float().clip(BHPS);
var ETa_nonveget_img = mean_NonVeget_ETa.toImage().float().clip(BHPS);
var ETa_water_img = mean_Water_ETa.toImage().float().clip(BHPS);
// Sen Slope computation 
var SenSlope_forest_LC = forest_ETa_selected.map(addVariables).select(['t', 'Forest'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
var SenSlope_nonforest_LC = nonforest_ETa_selected.map(addVariables).select(['t', 'Non-forest'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
var SenSlope_farming_LC = farming_ETa_selected.map(addVariables).select(['t', 'Farming'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
var SenSlope_nonveget_LC = non_veget_ETa_selected.map(addVariables).select(['t', 'Non-vegetation'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
var SenSlope_water_LC = water_ETa_selected.map(addVariables).select(['t', 'Water'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
// Paired differences for Mann-Kendall computation
var getDiff_forest = function(year){return ETa_forest_img.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_forest_img)};
var getDiff_nonforest = function(year){return ETa_nonforest_img.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_nonforest_img)};
var getDiff_farming = function(year){return ETa_farming_img.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_farming_img)};
var getDiff_nonveget = function(year){return ETa_nonveget_img.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_nonveget_img)};
var getDiff_water = function(year){return ETa_water_img.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_water_img)};
// Compute Tied correction (by aproximation)
var tied_forest = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_forest)).map(getTied).sum().divide(2).int();
var tied_nonforest = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_nonforest)).map(getTied).sum().divide(2).int();
var tied_farming = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_farming)).map(getTied).sum().divide(2).int();
var tied_nonveget = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_nonveget)).map(getTied).sum().divide(2).int();
var tied_water = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_water)).map(getTied).sum().divide(2).int();
// Compute Positive and Negative signals
var sgn_forest = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_forest)).map(getSign);
var sgn_nonforest = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_nonforest)).map(getSign);
var sgn_farming = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_farming)).map(getSign);
var sgn_nonveget = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_nonveget)).map(getSign);
var sgn_water = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiff_water)).map(getSign);
// Compute Mann-kendall test
var forest_MK = MannKendall(sgn_forest,tied_forest);
var nonforest_MK = MannKendall(sgn_nonforest,tied_nonforest);
var farming_MK = MannKendall(sgn_farming,tied_farming);
var nonveget_MK = MannKendall(sgn_nonveget,tied_nonveget);
var water_MK = MannKendall(sgn_water,tied_water);
// Reclassify z-values to p-values
var forest_p_value = ZtoP_value(bhps_mask, forest_MK.select('z-value'));
var nonforest_p_value = ZtoP_value(bhps_mask, nonforest_MK.select('z-value'));
var farming_p_value = ZtoP_value(bhps_mask, farming_MK.select('z-value'));
var nonveget_p_value = ZtoP_value(bhps_mask, nonveget_MK.select('z-value'));
var water_p_value = ZtoP_value(bhps_mask, water_MK.select('z-value'));
// Stack Mann-Kendall results ("z-value", "S", "varS", "p-value" and "slope") into multi-band image
var forest_ETa_Trend = forest_MK.addBands([forest_p_value.rename('p-value'), SenSlope_forest_LC.rename('slope')]);
var nonforest_ETa_Trend = nonforest_MK.addBands([nonforest_p_value.rename('p-value'), SenSlope_nonforest_LC.rename('slope')]);
var farming_ETa_Trend = farming_MK.addBands([farming_p_value.rename('p-value'), SenSlope_farming_LC.rename('slope')]);
var nonveget_ETa_Trend = nonveget_MK.addBands([nonveget_p_value.rename('p-value'), SenSlope_nonveget_LC.rename('slope')]);
var water_ETa_Trend = water_MK.addBands([water_p_value.rename('p-value'), SenSlope_water_LC.rename('slope')]);
// -------------------------------------------- Annual Mann-Kendall processing for each 30m pixel --------------------------------------------------------
// Subset input ETa by selected Start and End year
var ETa_col_selected = ETa_annual_col.filter(ee.Filter.calendarRange(StartYear, EndYear, 'year'));
var ETa_img_selected = ETa_col_selected.toBands().rename(SetYearNames(StartYear, EndYear));
// Add variables to compute trend analisys
var input_year = ETa_col_selected.map(addVariables);
// Sen Slope computation 
var SenSlope_year = input_year.select(['t', 'ETa'])
  .reduce(ee.Reducer.sensSlope()).select('slope');
// Paired differences for Mann-Kendall computation
var getDiffETa = function(year){
  return ETa_img_selected.select(ee.String('year_').cat(ee.Number(year).int())).subtract(ETa_img_selected);
};
// Compute Tied correction
var tied = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiffETa)).map(getTied).sum().divide(2).int();
// Compute Positive and Negative signals
var sgn = ee.ImageCollection(ee.List.sequence(StartYear,EndYear,1).map(getDiffETa)).map(getSign);
// Compute Mann-kendall test
var annual_Zmk = MannKendall(sgn,tied);
// Reclassify z-values to p-values
var annual_p_value = ZtoP_value(bhps_mask, annual_Zmk.select('z-value'));
// Stack Mann-Kendall results ("z-value", "S", "varS", "p-value" and "slope") into multi-band image
var annual_ETa_Trend = annual_Zmk.addBands([
  annual_p_value.rename('p-value'),
  SenSlope_year.rename('slope')
]);
// Mask p-values
var p_values = annual_ETa_Trend.select('p-value').clip(BHPS);
var sig90 = p_values.updateMask(p_values.lte(0.1));
var sig95 = p_values.updateMask(p_values.lte(0.05));
var sig99 = p_values.updateMask(p_values.lte(0.01));
var sig99_9 = p_values.updateMask(p_values.lte(0.001));
// ================================================= MAP LAYERS ================================================
var SenSlope_yr = ui.Map.Layer(annual_ETa_Trend.select('slope'), visTrendYear, 'annual ETa trend from '+StartYear+' to '+EndYear+' (mm.year-2)');
var LC_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('median_LC'),
  LandCover_vis, 'Land Cover (mode: '+StartYear+'-'+EndYear+' period)');
var Forest_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('Forest').eq(1).selfMask()
  ,{min:1,palette:['Yellow']}, 'Forest (median '+StartYear+'-'+EndYear+')');
var NonForest_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('Non-Forest').eq(2).selfMask()
  ,{min:1,palette:['Yellow']}, 'Non-Forest (median '+StartYear+'-'+EndYear+')');
var Farming_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('Farming').eq(3).selfMask()
  ,{min:1,palette:['Yellow']}, 'Farming (median '+StartYear+'-'+EndYear+')');
var NonVeget_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('Non-vegetation').eq(4).selfMask()
  ,{min:1,palette:['Yellow']}, 'Non-vegetation (median '+StartYear+'-'+EndYear+')');
var Water_map = ui.Map.Layer(Mapbiomas_col_reclass.mode().clip(BHPS).rename('Water').eq(5).selfMask()
  ,{min:1,palette:['Yellow']}, 'Water (median '+StartYear+'-'+EndYear+')');
var SSEBop_LT = ui.Map.Layer(ETa_annual_col.mean(), visYearET, 'Long-Term annual ETa from '+StartYear+' to '+EndYear+' (mm)');
// ============================================ TREND ANALISYS DATASET (MANN-KENDALL) ================================================
// Composite Mann-Kendall values into image bands
var z_value_img = compositeImages('z-value', annual_ETa_Trend, forest_ETa_Trend, nonforest_ETa_Trend, farming_ETa_Trend, nonveget_ETa_Trend, water_ETa_Trend,
  'annual','Forest','NonForest','Farming','NonVegetation','Water');
var S_img = compositeImages('S', annual_ETa_Trend,  forest_ETa_Trend, nonforest_ETa_Trend, farming_ETa_Trend, nonveget_ETa_Trend, water_ETa_Trend,
  'annual','Forest','NonForest','Farming','NonVegetation','Water');
var varS_img = compositeImages('varS', annual_ETa_Trend, forest_ETa_Trend, nonforest_ETa_Trend, farming_ETa_Trend, nonveget_ETa_Trend, water_ETa_Trend,
  'annual','Forest','NonForest','Farming','NonVegetation','Water');
var p_value_img = compositeImages('p-value', annual_ETa_Trend, forest_ETa_Trend, nonforest_ETa_Trend, farming_ETa_Trend, nonveget_ETa_Trend, water_ETa_Trend,
  'annual','Forest','NonForest','Farming','NonVegetation','Water');
var slope_img = compositeImages('slope', annual_ETa_Trend, forest_ETa_Trend, nonforest_ETa_Trend, farming_ETa_Trend, nonveget_ETa_Trend, water_ETa_Trend,
  'annual','Forest','NonForest','Farming','NonVegetation','Water');
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
mapPanel.centerObject(BHPS,8);
mapPanel.setOptions("SATELLITE");  
mapPanel.style().set('cursor', 'crosshair');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '680px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Landsat-based actual evapotranspiration over Paraíba do Sul River Basin ('+StartYear+' to '+EndYear+')',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })
]);
panel.add(intro);
mapPanel.add(ui.Label('Click a point on the map to show time-series plots'));
// Create a second panel to hold the legends.
var panel2 = ui.Panel();
panel2.style().set('width', '240px');
// Create the first legend title.
var panel2TitleTrend =  ui.Panel([
  ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px'
    }
  })
]);
panel2.add(panel2TitleTrend);
var panelCheck1 = ui.Panel([],ui.Panel.Layout.flow('vertical'));
panelCheck1.style()
  .set('width', '600px')
  .set('margin', '10px');
var panelCheck2 = ui.Panel([],ui.Panel.Layout.flow('vertical'));
panelCheck2.style()
  .set('width', '600px')
  .set('margin', '10px');
var CheckboxTitle1 = ui.Label({
  value: 'Select a Layer to show on map:',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px',
    padding: '4px'
    }
});
panelCheck1.add(CheckboxTitle1);
// ================================================= CHECKBOXES ================================================
// Make checkbox to select ET products
var checkbox0 = ui.Checkbox('Long-Term annual ETa ('+StartYear+' to '+EndYear+')');
var checkbox1 = ui.Checkbox('annual ETa trends ('+StartYear+' to '+EndYear+')',false);
var checkbox2 = ui.Checkbox('LandCover classes (mode: '+StartYear+' to '+EndYear+ ')',false);
var checkbox3 = ui.Checkbox('Forest',false);
var checkbox4 = ui.Checkbox('Non Forest Natural Formation',false);
var checkbox5 = ui.Checkbox('Farming',false);
var checkbox6 = ui.Checkbox('Non vegetated area',false);
var checkbox7 = ui.Checkbox('Water',false);
// Add checkbox to select ET products
checkbox0.onChange(function(checked){mapPanel.add(SSEBop_LT.setShown(checked))});
checkbox1.onChange(function(checked){mapPanel.add(SenSlope_yr.setShown(checked))});
checkbox2.onChange(function(checked){mapPanel.add(LC_map.setShown(checked))});
panelCheck1.add(checkbox0.setValue(1));
panelCheck1.add(checkbox1);
panelCheck1.add(checkbox2);
panel.add(panelCheck1);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.widgets().set(13, ui.Label('Clicked Location:'));
panel.widgets().set(14, ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
//=================================================== INSERT CHARTS ======================================================
// Register a callback on the default map to be invoked when the map is clicked.
var generateInteractiveChart = function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
  mapPanel.layers().set(4, dot);
  // Create an Annual ET chart.
  var AnnualChart = ui.Chart.image.series(annual_data.select(['ETa','ET0','Precipitation']), point, ee.Reducer.mean(), 30);
  AnnualChart.setChartType('ComboChart').setOptions({
    title: 'Annual variation of ETa, ET0 and Precipitation ('+StartYear+' to '+EndYear+') - at clicked point',
    vAxis: {title: 'mm / year'},
    hAxis:{title: 'Year'},
    colors: ['Green','Red','LightSkyBlue'],
    seriesType: 'line',
    series: {2: {type: 'bars'}},
    lineWidth: 1,
    pointSize: 3,
    });
  panel.widgets().set(4, AnnualChart);
};
// Function to get validation metrics
var getMKvalues = function(coords) {
  // Create a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Get the Metrics from validation images
  var z_value = ee.ImageCollection(z_value_img.select('annual')).getRegion(point, 30).flatten();
  var S = ee.ImageCollection(S_img.select('annual')).getRegion(point, 30).flatten();
  var varS = ee.ImageCollection(varS_img.select('annual')).getRegion(point, 30).flatten();
  var p_value = ee.ImageCollection(p_value_img.select('annual')).getRegion(point, 30).flatten();
  var slope = ee.ImageCollection(slope_img.select('annual')).getRegion(point, 30).flatten();
  //Annual Mann-Kendall results
  var MKyr_panel = ui.Panel();
  mapPanel.onClick(function(){MKyr_panel.clear()});
//  MKyr_panel.add(ui.Label({value:'MK results (annual):',style: {fontWeight: 'bold'}}));
  MKyr_panel.add(ui.Label(
    'z-value: '+z_value.get(9).getInfo().toFixed(3))).add(ui.Label(
      'S: '+S.get(9).getInfo().toFixed(0))).add(ui.Label(
        'varS: '+varS.get(9).getInfo().toFixed(0))).add(ui.Label(
          'p-value: '+p_value.get(9).getInfo().toFixed(4))).add(ui.Label(
            'Sen-slope: '+slope.get(9).getInfo().toFixed(2)+' mm.yr-2'));
  panel2.add(MKyr_panel.add(ui.Label('---------------------------------')));
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
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
// For anomaly
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visYearET.min, {margin: '2px 4px'}),
    ui.Label((visYearET.max / 2),{margin: '2px 4px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visYearET.max, {margin: '2px 4px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Create legend titles
var legendTitle = ui.Label({
  value: 'Long-Term ETa (mm/year)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px',
    padding: '4px',
    textAlign:'center'
    }
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set('width', '200px').set('position','bottom-center');
//mapPanel.widgets().set(1,legendPanel);
// Add Trend legend to the right panel
var legendTitleTrend = ui.Label({
  value: 'Annual ETa trends',
  style: {fontWeight: 'bold'}
});
// Create the color bar for the legend.
var colorBarTrend = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Trend_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// create legend labels
var legendLabelsTrend = ui.Panel({
  widgets: [
    ui.Label(visTrendYear.min, {margin: '4px 8px'}),
    ui.Label(('mm/yr-2'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visTrendYear.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTrend = ui.Panel([legendTitleTrend, colorBarTrend, legendLabelsTrend]);
legendTrend.style().set('width', '200px').set('position','bottom-right');
// Create LandCover classes Legend
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 4px 2px 8px'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 2px 4px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var legendTitleLC = ui.Label({
  value: 'Land Cover (Level 1)',
  style: {fontWeight: 'bold'}
});
var legendLC = ui.Panel([legendTitleLC]);
for (var i = 0; i < 5; i++) {
  legendLC.add(makeRow(LandCover_Palette[i], LC_dict.values().getInfo()[i]));
  }
// Add Legends to the right panel
panel2.add(legendPanel);
panel2.add(ui.Label('        '));
panel2.add(legendTrend);
panel2.add(ui.Label('        '));
panel2.add(legendLC);
panel2.add(ui.Label('________________________________'));
// Generate interactive chart by click on map
mapPanel.onClick(generateInteractiveChart);
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-43.53, -22.03);
var ETalink = ui.Label('ETa by LandCover (PSRB)').setUrl(
  getDownloadLink('ETa by LandCover',
  mean_Forest_ETa,
  mean_NonForest_ETa,
  mean_Farming_ETa,
  mean_NonVeget_ETa,
  mean_Water_ETa
  )
);
var TrendLink = ui.Label('ETa trends by LandCover (PSRB)').setUrl(
  getDownloadLink('Mann-Kendall results by LandCover',
  getMean(forest_ETa_Trend,BHPS,10000),
  getMean(nonforest_ETa_Trend,BHPS,10000),
  getMean(farming_ETa_Trend,BHPS,10000),
  getMean(nonveget_ETa_Trend,BHPS,10000),
  getMean(water_ETa_Trend,BHPS,10000)
  )
);
panel2.add(ui.Label({
  value: 'Download results (Table)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px'
    }
}));
panel2.add(ETalink);
panel2.add(TrendLink);
panel2.add(ui.Label('________________________________'));
panel2.add(ui.Label({
  value: 'Mann-Kendall results',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0px 2px 8px',
    }
}));
panel2.add(ui.Label('(at clicked point):'));
mapPanel.onClick(getMKvalues);
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel));
ui.root.insert(2, panel2);
generateInteractiveChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
getMKvalues({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
create_LC_ETaChart(mean_ETa_yr_LC, initialPoint,['Forest','Non-forest','Farming','Non-vegetation','Water'],panel, 12);
createTrendChart(mean_ETa_yr_LC, initialPoint,'Forest','#288E14', panel, 13);
createTrendChart(mean_ETa_yr_LC, initialPoint,'Non-forest','#9C9C9C', panel, 14);
createTrendChart(mean_ETa_yr_LC, initialPoint,'Farming','#FADE81', panel, 15);
createTrendChart(mean_ETa_yr_LC, initialPoint,'Non-vegetation','#F5310A', panel, 16);
createTrendChart(mean_ETa_yr_LC, initialPoint,'Water','#128EFA', panel, 17);
// Insert references hyperlinks
var reflink1 = ui.Label('Project MapBiomas - Collection 3.1 of Brazilian Land Cover & Use Map Series')
  .setUrl('https://mapbiomas.org/en');
var reflink2 = ui.Label(
  'Senay et al (2013). Operational Evapotranspiration Mapping Using Remote Sensing'+
  ' and Weather Datasets: A New Parameterization for the SSEB Approach.')
  .setUrl('https://onlinelibrary.wiley.com/doi/full/10.1111/jawr.12057');
// Insert Notes texts and links
var text1_1 = ui.Label('1: Actual ET (ETa) derived from SSEBop model using'); 
var LandsatLink = ui.Label('Landsat collection.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/landsat');
var text2_1 = ui.Label('2: Reference ET (ET0) derived from');
var NCEPlink = ui.Label('NCEP/CFSv2 6h products.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/NOAA_CFSV2_FOR6H');
var text3_1 = ui.Label('3: Precipitation derived from a combination of');
var text3_2 = ui.Label('and');
var text3_3 = ui.Label('precipitation products.');
var TerraClimlink = ui.Label('TerraClimate').setUrl('https://developers.google.com/earth-engine/datasets/catalog/IDAHO_EPSCOR_TERRACLIMATE');
var CHIRPSlink = ui.Label('CHIRPS').setUrl('https://developers.google.com/earth-engine/datasets/catalog/UCSB-CHG_CHIRPS_DAILY');
var text4_1 = ui.Label('4: Original Land Cover map provided by');
var mapbiomasLink = ui.Label('Mapbiomas').setUrl('https://mapbiomas.org/google-earth-engine');
var text4_2 = ui.Label('-');
var collectionLink = ui.Label('Collection 3.1.')
  .setUrl('https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection3_1/mapbiomas_collection31_integration_v1');
// References title
var title_references = ui.Label({
  value: 'References:',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px',
    }
});
panel.add(ui.Label('_________________________________________________________________________________________________'));
panel.add(ui.Panel([title_references]));
panel.widgets().set(18, ui.Panel([reflink1]));
panel.widgets().set(19, ui.Panel([reflink2]));
panel.add(ui.Label('_________________________________________________________________________________________________'));
panel.add(ui.Panel([
  ui.Label({value:'Notes',style: {fontWeight: 'bold'}}),
  ]));
panel.widgets().set(22, ui.Panel([text1_1, LandsatLink], ui.Panel.Layout.flow('horizontal',true)));
panel.widgets().set(23, ui.Panel([text2_1, NCEPlink], ui.Panel.Layout.flow('horizontal',true))); 
panel.widgets().set(24, ui.Panel([text3_1, TerraClimlink,text3_2,CHIRPSlink,text3_3], ui.Panel.Layout.flow('horizontal',true))); 
panel.widgets().set(25, ui.Panel([text4_1, mapbiomasLink,text4_2,collectionLink], ui.Panel.Layout.flow('horizontal',true)));