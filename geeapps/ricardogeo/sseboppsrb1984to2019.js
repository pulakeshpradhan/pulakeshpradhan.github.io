// ========================================== INPUT PARAMETERS =================================================
var StartYear = 1984;
var EndYear = 2019;
// Cloud Storage Bucket parameters
var gs_dir = ee.String('gs://landsat-ssebop-data/');
var basename_y = ee.String('Annual/Landsat_SSEBopETa_PSRB_');
var basename_m = ee.String('Monthly/Landsat_SSEBopETa_PSRB_');
var file_format = ee.String('.tif');
// ======================================== VISUALIZATION PARAMETERS =============================================
var ETa_Palette = ['#B59B75','#D8C689','#FEF3AC', '#78D062','#1c8591', '#0B2F7A'];
var Anomaly_Palette = ['#D2691E','#F4A460','#FFDEAD','#DCDCDC','#D1F6A7','#8ACB28','#4A9308'];
var Trend_Palette = ['#FF0000','#FFA500','#FFDAB9','#C0C0C0','#90EE90','#32CD32','#008000'];
var OBS_Palette = ['Blue','SkyBlue','Moccasin','SandyBrown','Red'];
var clearIndex_Palette = ['Red','Yellow','Green'];
var visMonthET = {min: 0, max: 150, palette: ETa_Palette};
var visQuarterET = {min: 0, max: 500, palette: ETa_Palette};
var visYearET = {min: 0, max: 1500, palette: ETa_Palette};
var visAnom = {min: -50, max: 50, palette: Anomaly_Palette};
var visTrendYear = {min: -15, max: 15, palette: Trend_Palette};
var vizTrendMonth = {min:-1.5,max:1.5,palette: Trend_Palette};
var vizTrendQuarter = {min: -3, max: 3,palette: Trend_Palette};
var sigVis = {min: -1,max: 1,palette: 'red, white, blue'};
var vizOBStotal = {min:400,max:1800,palette: OBS_Palette};
var vizOBSclear = {min:100,max:1000,palette: OBS_Palette};
var vizclearindex = {min:0.4,max:1,palette: clearIndex_Palette};
// ==================================================== INPUT DATA =====================================================
// Paraiba do Sul basin limits (from ANA ottobacias)
var BHPS = ee.FeatureCollection('users/ricardogeo/SSEBop_1984_2019/Feature_data/BH_ParaibaDoSul_BHO_2017');
var BHPS_15km = ee.FeatureCollection('users/ricardogeo/SSEBop_1984_2019/Feature_data/BHPS_MDEHC_buffer15km');
// Monthly and Annual NCEP/CFSv2 based reference ET (ETr)
var ETr_monthly = ee.Image('users/ricardogeo/SSEBop_1984_2019/NCEP_CFSv2_METDATA/AOI/ETr_monthly_AOI_1984_2019')
  .clip(BHPS).toUint16();
var ETr_year = ee.Image('users/ricardogeo/SSEBop_1984_2019/NCEP_CFSv2_METDATA/AOI/ETr_annual_AOI_1984_2019')
  .clip(BHPS).toUint16();
// Annual Precipitation - CHIRPS
var P_year = ee.Image('users/ricardogeo/SSEBop_1984_2019/Global_Precipitation_data/CHIRPS_annual_precipitation_1984_2019')
  .clip(BHPS).toUint16();
// Mann-Kendall test results
var MK_annual = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Trends/annual_MK_test_PSRB_1984_2019');
var MK_annual_significances = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Trends/annual_sig_masks_MK_test_PSRB_1984_2019');
var SMK_monthly = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Trends/monthly_seasonal_MK_test_PSRB_1984_2019');
var SMK_quarterly = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Trends/quarterly_seasonal_MK_test_PSRB_1984_2019');
// Time-series observations quality
var totalOBS_img = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Results/Landsat_Total_pixels_PSRB_1984_to_2019')
  .clip(BHPS);
var NC_Count_img = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Results/Landsat_NC_Count_PSRB_1984_to_2019')
  .clip(BHPS);
var NC_Index_img = ee.Image('users/ricardogeo/SSEBop_1984_2019/PSRB_Results/Landsat_NC_Index_PSRB_1984_to_2019')
  .clip(BHPS);
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
var setYear = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
var setQuarter = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
var setDate_y = function(img){
                var index = ee.Number.parse(img.get('system:index'));
                var dateStr = datelist_y.get(index);
                var d = ee.Date(dateStr);
                var millis = d.millis();
                var y = ee.Number(d.get('year'));
                return img.set({'system:time_start':millis,'year':y});
              };
var setDate_m = function(img){
                var index = ee.Number.parse(img.get('system:index'));
                var dateStr = datelist_m.get(index);
                var d = ee.Date(dateStr);
                var millis = d.millis();
                var y = ee.Number(d.get('year'));
                var m = ee.Number(d.get('month'));
                return img.set({'system:time_start':millis,'month':m,'year':y});
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
// Function to 5-year aggregation from monthly data
var filt5year = function(col, bandname, StartY, EndY){return ee.ImageCollection.fromImages(
      ee.List.sequence(StartY, EndY,1).map(function(y){
            return col
              .filterMetadata('year', 'equals', y)
              .select(bandname).first()
              .set('year', y)
              .set('system:time_start', ee.Date.fromYMD(y,1,1).millis());
              }))};
// Function to compute Long-Term (LT) mean values
var getLTmean = function(col, datelist, timestep, bandname){return ee.ImageCollection.fromImages(
  datelist.map(function(t){
        return col
            .filterMetadata(timestep, 'equals', t)
            .select(bandname).mean()
            .set(timestep, t)}))};
// Function to set Months, Quarter and Year names as list
var datelistMonthYear = ee.List.sequence(StartYear,EndYear,1).map(function(y){
        return ee.List.sequence(1, 12).map(function(m) {return ee.Date.fromYMD(y,m,1).format('yyyy-MM-dd')})}).flatten();
var getYearsDateList = function(y){return ee.Date.fromYMD(y,1,1).format('yyyy-MM-dd')};
var SetYearNames = function(start, end){
  var listYears = ee.List.sequence(start,end,1);
  return listYears.map(function(list){return ee.String('year_').cat(ee.Number(list).int())});
};
var Set5YearNames = function(bandname){
  var list5Years = ee.List(['1984_1989','1990_1995','1996_2001','2002_2007','2008_2013','2014_2019']);
  return list5Years.map(function(list){return ee.String(bandname+'_').cat(list)});
};
var months_names = ee.List(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']);
var months_names_index = ee.List([
  '01-Jan','02-Feb','03-Mar','04-Apr','05-May','06-Jun','07-Jul','08-Aug','09-Sep','10-Oct','11-Nov','12-Dec']);
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
// Function to generate export to Drive Tasks
var exportDrive = function(img,aoi,desc,celsize){
  return Export.image.toDrive({image: img, 
  description: desc,
  folder: 'SSEBop_BHPS_1984_2019',
  scale: celsize,
  region: aoi,
  maxPixels: 1e13,
  skipEmptyTiles: true,
  });
};
// ================================================= PROCESSING STEPS ================================================
// Convert image band to collection
var yearList = ee.List.sequence(StartYear,EndYear,1).map(function(list){
  return ee.String('annual_').cat(ee.Number(list).int())});
var datelist_y = ee.List.sequence(StartYear,EndYear,1)
  .map(function(y){return ee.Date.fromYMD(y,1,1).format('yyyy-MM-dd')});
var monthsLists = ee.List.sequence(StartYear,EndYear,1).map(function(y){
  return ee.List.sequence(1, 12).map(function(m) {
        return ee.String('monthly_').cat(ee.Date.fromYMD(y,m,1).format('yyyy')).cat('M')
              .cat(ee.Date.fromYMD(y,m,1).format('MM'));
  })}).flatten();
var datelist_m = ee.List.sequence(StartYear,EndYear,1).map(function(y){
  return ee.List.sequence(1, 12).map(function(m) {
        return ee.Date.fromYMD(y,m,1).format('yyyy-MM-dd');
  })}).flatten();
var ETa_monthly_col = ee.ImageCollection.fromImages(
    monthsLists.map(function(m){
            var image = ee.Image.loadGeoTIFF(gs_dir.cat(basename_m).cat(m).cat(file_format))
              .rename('ETa').clip(BHPS);
            return image;
    })).map(setDate_m);
var ETr_monthly_col = img2col(datelistMonthYear, ETr_monthly,'ETr').map(setMonth);
//----------------------------------------------------- Annual aggregation---------------------------------------------
// Actual ET from SSEBop
var ETa_annual_col = ee.ImageCollection.fromImages(
    yearList.map(function(y){
            var image = ee.Image.loadGeoTIFF(gs_dir.cat(basename_y).cat(y).cat(file_format))
              .rename('ETa').clip(BHPS);
            return image;
    })).map(setDate_y);
var ETa_annual = ETa_annual_col.toBands().rename(SetYearNames(StartYear,EndYear));
// Reference ET from NCEY/CFSv2
var ETr_annual_col = annualAgreg(ETr_monthly_col,'ETr');
var ETr_annual = ETr_annual_col.toBands().rename(SetYearNames(StartYear,EndYear));
// Annual Precipitation from CHIRPS
var P_annual_col = img2col(ee.List.sequence(StartYear,EndYear,1).map(getYearsDateList), P_year,'Precipitation').map(setYear);
// 5-Year average ETa
var ETa_5Year_mean_col = ee.ImageCollection.fromImages([
  filt5year(ETa_annual_col, 'ETa', 1984, 1989).mean().set('system:time_start', ee.Date('1984-01-01').millis()),
  filt5year(ETa_annual_col, 'ETa', 1990, 1995).mean().set('system:time_start', ee.Date('1990-01-01').millis()),
  filt5year(ETa_annual_col, 'ETa', 1996, 2001).mean().set('system:time_start', ee.Date('1996-01-01').millis()),
  filt5year(ETa_annual_col, 'ETa', 2002, 2007).mean().set('system:time_start', ee.Date('2002-01-01').millis()),
  filt5year(ETa_annual_col, 'ETa', 2008, 2013).mean().set('system:time_start', ee.Date('2008-01-01').millis()),
  filt5year(ETa_annual_col, 'ETa', 2014, 2019).mean().set('system:time_start', ee.Date('2014-01-01').millis())
  ]);
var ETa_5Year_mean = ETa_5Year_mean_col.toBands().rename(Set5YearNames('ETa'));
//----------------------------------------------------- Quarterly aggregation---------------------------------------------
// Actual ET from SSEBop
var ETa_quarter_col = quarterAgreg(ETa_monthly_col,quarter_n,'ETa');
var ETa_quarter = ETa_quarter_col.toBands().rename(NamesQuarterYear);
// Reference ET from NCEY/CFSv2
var ETr_quarter_col = quarterAgreg(ETr_monthly_col,quarter_n,'ETr');
var ETr_quarter = ETr_quarter_col.toBands().rename(NamesQuarterYear);
//------------------------------------------------- Long-Term aggregations---------------------------------------------
// Annual (average)
var LT_ETa_year = ETa_annual_col.mean().rename('ETa_LT_yr_'+StartYear+'_'+EndYear).toUint16();
// Monthly (average)
var ETa_LT_avg_monthly_col = ee.ImageCollection.fromImages(
      ee.List.sequence(1,12,1).map(function(m){
        return ETa_monthly_col
            .filterMetadata('month', 'equals', m)
            .select('ETa').mean()
            .set('month', m)}));
var ETa_LT_avg_monthly = ETa_LT_avg_monthly_col.toBands().rename(months_names);
var ETa_LT_avg_monthly_all = ETa_monthly_col.mean().rename('ETa_mean');
// Quarterly (average)
var ETa_LT_avg_quarter_col = ee.ImageCollection.fromImages(
      quarter_n.map(function(m){
        return ETa_quarter_col
            .filterMetadata('quarter', 'equals', m)
            .select('ETa').mean()
            .set('quarter', m)}));
var ETa_LT_avg_quarter = ETa_LT_avg_quarter_col.toBands().rename(quarter_names);
var ETa_LT_avg_quarter_all = ETa_quarter_col.mean().rename('ETa');
//--------------------------------------- Anomaly computation (1984-2019)---------------------------------------------------
// Annual ETa anomaly
var anom_eta_year = ETa_annual_col.map(function(img){
  //var anom_pct = (img.divide(LT_ETa_year)).multiply(100).rename('ETa_anomaly');
  var anom_pct = ((img.subtract(LT_ETa_year)).divide(LT_ETa_year)).multiply(100).rename('pct_anomaly');
  var anom_mm = img.subtract(LT_ETa_year).rename('mm_anomaly');
  return anom_pct.addBands([anom_mm]).copyProperties(img,img.propertyNames());
});
var anom_pct_eta_year = anom_eta_year.select('pct_anomaly').toBands().rename(SetYearNames(StartYear,EndYear));
// 5-Year ETa anomaly
var anom_eta_5year = ETa_5Year_mean_col.map(function(img){
  //var anom_pct = (img.divide(LT_ETa_year)).multiply(100).rename('ETa_anomaly');
  var anom_pct = ((img.subtract(LT_ETa_year)).divide(LT_ETa_year)).multiply(100).rename('pct_anomaly');
  var anom_mm = img.subtract(LT_ETa_year).rename('mm_anomaly');
  return anom_pct.addBands([anom_mm]).copyProperties(img,img.propertyNames());
});
var anom_pct_eta_5year = anom_eta_5year.select('pct_anomaly').toBands().rename(Set5YearNames('anomaly'));
// Monthly ETa anomaly
var anom_eta_month = ETa_monthly_col.map(function(img){
  var index = ee.Number(img.get('month')).subtract(1);
  var LT_month = ETa_LT_avg_monthly.select(index).rename('mean_ETa');
//  var anom_pct = (img.divide(LT_month)).multiply(100).rename('ETa_anomaly');
  var anom_pct = ((img.subtract(LT_month)).divide(LT_month)).multiply(100).rename('pct_anomaly');
  var anom_mm = img.subtract(LT_month).rename('mm_anomaly');
  return anom_pct.addBands([anom_mm]).copyProperties(img,img.propertyNames());
});
// Quarterly ETa anomaly
var anom_eta_quarter = ETa_quarter_col.map(function(img){
  var index = ee.List(img.get('quarter'));
  var LT_quarter = ETa_LT_avg_quarter.select(ee.Number(index.get(2)).divide(3).subtract(1)).rename('mean_ETa');
//  var anom_pct = (img.divide(LT_quarter)).multiply(100).rename('ETa_anomaly');
  var anom_pct = ((img.subtract(LT_quarter)).divide(LT_quarter)).multiply(100).rename('pct_anomaly');
  var anom_mm = img.subtract(LT_quarter).rename('mm_anomaly');
  return anom_pct.addBands([anom_mm]).copyProperties(img,img.propertyNames());
});
//------------------------------------ Combine Datasets (ETa, ETr and Anomalies) -----------------------------------
var annual_data = ETa_annual_col.combine(ETr_annual_col).combine(anom_eta_year).combine(P_annual_col);
var monthly_data = ETa_monthly_col.combine(ETr_monthly_col).combine(anom_eta_month);
var quarterly_data = ETa_quarter_col.combine(ETr_quarter_col).combine(anom_eta_quarter);
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
mapPanel.centerObject(BHPS,8);
mapPanel.setOptions("SATELLITE");  
mapPanel.style().set('cursor', 'crosshair');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '605px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Landsat-based SSEBop-ETa over Paraíba do Sul River Basin ('+StartYear+' to '+EndYear+')',
    style: {fontSize: '16px', fontWeight: 'bold'}
  }),
  ui.Label('                        ')
]);
panel.add(intro);
mapPanel.add(ui.Label('Click on the map to show time-series plots'));
//=================================================== INSERT CHARTS ======================================================
// Register a callback on the default map to be invoked when the map is clicked.
var generateChart = function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(2)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
  mapPanel.layers().set(50, dot);
  // Create an Annual ET chart.
  var AnnualChart = ui.Chart.image.series(annual_data.select(['ETa','ETr','Precipitation']), point, ee.Reducer.mean(), 500);
  AnnualChart.setChartType('ComboChart').setOptions({
    title: 'Annual variation of ETa, ETr and Precipitation ('+StartYear+' to '+EndYear+')',
    vAxis: {title: 'mm / year'},
    hAxis:{title: 'Year'},
    colors: ['Red','Green','LightSkyBlue'],
    seriesType: 'line',
    series: {2: {type: 'bars'},3: {lineWidth: 5,pointSize: 1}},
    lineWidth: 1,
    pointSize: 3,
    });
  panel.widgets().set(26, AnnualChart);
  // Create an Monthly ET chart.
  var MonthlyChart = ui.Chart.image.series(monthly_data.select(['ETa','ETr']), point, ee.Reducer.mean(), 500);
  MonthlyChart.setChartType('ComboChart').setOptions({
    title: 'Monthly variation of ETa, ETr and Precipitation ('+StartYear+' to '+EndYear+')',
    vAxis: {title: 'mm / month'},
    hAxis:{title: 'Year'},
    colors: ['Red','Green'],
    seriesType: 'line',
    series: {2: {type: 'bars'}},
    bar:{groupWidth:'100%'},
    lineWidth: 1,
    pointSize: 0,
    });
  panel.widgets().set(27, MonthlyChart);
  // Create an Quarterly ET chart.
  var QuarterlyChart = ui.Chart.image.series(quarterly_data.select(['ETa','ETr']), point, ee.Reducer.mean(), 500);
  QuarterlyChart.setChartType('ComboChart').setOptions({
    title: 'Quarterly variation of ETa, ETr and Precipitation ('+StartYear+' to '+EndYear+')',
    vAxis: {title: 'mm / quarter'},
    hAxis:{title: 'Year'},
    colors: ['Red','Green'],
    seriesType: 'line',
    series: {2: {type: 'bars'}},
    bar:{groupWidth:'100%'},
    lineWidth: 1,
    pointSize: 0,
    });
  panel.widgets().set(28, QuarterlyChart);
};
// Creates and styles 1 row of the legend (For p-value of Trend maps).
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 4px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// set position of Significance panel
var legendSig = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
//    backgroundColor:'#DCDCDC'
  }
});
// Create Significance legend title
var legendTitleSig = ui.Label({
  value: 'Annual Trends',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0',
//    backgroundColor:'#DCDCDC'
    }
});
// Add the title to the panel
legendSig.add(legendTitleSig);
// name and pallete of the legend
var namesSig = ['Negative trend','No-trend','Positive trend'];
var paletteSig =['FF0000', 'FFFFFF', '0000FF'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legendSig.add(makeRow(paletteSig[i], namesSig[i]));
  } 
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
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBar3 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBar_anom = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Anomaly_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarTrend_yr = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Trend_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarTrend_mth = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Trend_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarTrend_qtr = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Trend_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarTot_obs = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(OBS_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarClear_obs = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(OBS_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarClear_index = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(clearIndex_Palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
// For Annual ET
var legendLabelsYear = ui.Panel({
  widgets: [
    ui.Label(visYearET.min),
    ui.Label(('mm/year'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visYearET.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For Annual ET Trends
var legendLabelsTrend_yr = ui.Panel({
  widgets: [
    ui.Label(visTrendYear.min),
    ui.Label(('mm/year-2'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visTrendYear.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For Month
var legendLabelsMonth = ui.Panel({
  widgets: [
    ui.Label(visMonthET.min),
    ui.Label(('mm/month'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visMonthET.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For Quarter
var legendLabelsQuarter = ui.Panel({
  widgets: [
    ui.Label(visQuarterET.min),
    ui.Label(('mm/quarter'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visQuarterET.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For ET anomaly
var legendLabels_anomaly = ui.Panel({
  widgets: [
    ui.Label(visAnom.min),
    ui.Label(('ET anomaly (%)'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visAnom.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// For Landsat Time-series quality
var legendLabels_tot_obs = ui.Panel({
  widgets: [
    ui.Label(vizOBStotal.min),
    ui.Label(vizOBStotal.min + (vizOBStotal.max - vizOBStotal.min) / 2,{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vizOBStotal.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendLabels_clear_obs = ui.Panel({
  widgets: [
    ui.Label(vizOBSclear.min),
    ui.Label(vizOBSclear.min + (vizOBSclear.max - vizOBSclear.min) / 2,{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vizOBSclear.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendLabels_clear_index = ui.Panel({
  widgets: [
    ui.Label(vizclearindex.min),
    ui.Label(vizclearindex.min + (vizclearindex.max - vizclearindex.min) / 2,{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vizclearindex.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Create legend titles
var legendTitleYear = ui.Label('Annual ETa');
var legendTitleMonth = ui.Label('Monthly ETa');
var legendTitleQuarter = ui.Label('Quarterly ETa');
var legendYear = ui.Panel([colorBar1, legendLabelsYear]);
legendYear.style().set('position','bottom-center');
var legendTrend_yr = ui.Panel([colorBarTrend_yr, legendLabelsTrend_yr]);
legendYear.style().set('position','bottom-center');
var legendMonth = ui.Panel([colorBar2, legendLabelsMonth]);
legendMonth.style().set('position','bottom-right');
var legendQuarter = ui.Panel([colorBar3, legendLabelsQuarter]);
legendMonth.style().set('position','bottom-right');
var legendAnomaly = ui.Panel([colorBar_anom, legendLabels_anomaly]);
legendAnomaly.style().set('position','bottom-center');
var legend_tot_obs = ui.Panel({
  widgets:[colorBarTot_obs, legendLabels_tot_obs],
  style: {width: '196px'}
  });
var legend_clear_obs = ui.Panel({
  widgets:[colorBarClear_obs, legendLabels_clear_obs],
  style: {width: '196px'}
  });
var legend_clear_index = ui.Panel({
  widgets:[colorBarClear_index, legendLabels_clear_index],
  style: {width: '196px'}
  });
//============================================ Add Title and Charts on panel =========================================================
var pointvalue = function(panelMap,panel,order,map,bandName,timescale,timeString,decimal){
  panelMap.onClick(function(coords) {
    panel.clear();
    panel.widgets().set(0, ui.Label({
            value: 'Loading...',
            style: {color: 'gray'}
          }));
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var data = map.getEeObject().sample(point, 500).first().get(bandName);
    data.evaluate(function(result) {panel.widgets().set(order, ui.Label({
              value: timescale+' ETa ('+timeString+'): ' + result.toFixed(decimal)+' mm',
              style:{margin:'3px'}
    })); });
})};
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click on Map to get ETa value')]);
inspector.style().set('position','bottom-center');
mapPanel.widgets().set(2, inspector);
// Add Textboxes for input parameters to Map
var EnterYear = ui.Textbox({placeholder: 'Enter Year...',value: ''});
var EnterMonth = ui.Textbox({placeholder: 'Enter Month...',value: ''});
var EnterQuarter = ui.Textbox({placeholder: 'Enter Quarter...',value: ''});
EnterYear.onChange(function(year){
  var img_year = ee.Image.loadGeoTIFF(gs_dir.cat(basename_y)
    .cat('annual_').cat(year).cat(file_format))
    .clip(BHPS).rename(ee.String('ETa_').cat(year));
  var annualET = ui.Map.Layer(img_year,visYearET,'ETa annual: '+year);
  pointvalue(mapPanel,inspector,0,annualET,'ETa_'+year,'Annual',year,0);
  mapPanel.layers().set(3, annualET);
});
EnterMonth.onChange(function(month){
  var YearSelected = ee.Number.parse(EnterYear.getValue());
  var img_month = ee.Image.loadGeoTIFF(gs_dir.cat(basename_m)
    .cat(ee.String('monthly_')).cat(ee.Date.fromYMD(YearSelected,ee.Number.parse(month),1).format('yyyy'))
    .cat('M').cat(ee.Date.fromYMD(YearSelected,ee.Number.parse(month),1).format('MM')).cat(file_format))
    .clip(BHPS).rename(ee.String('ETa_').cat(ee.Date.fromYMD(YearSelected,ee.Number.parse(month),1).format('Myyyy')));
  var monthlyET = ui.Map.Layer(img_month,visMonthET,'ETa monthly: '+month+'/'+YearSelected.getInfo());
  pointvalue(mapPanel,inspector,1,monthlyET,'ETa_'+month+YearSelected.getInfo(),'Monthly',month+'/'+YearSelected.getInfo(),2);
  mapPanel.layers().set(4, monthlyET);
});
EnterQuarter.onChange(function(quarter){
  var YearSelected = ee.Number.parse(EnterYear.getValue());
  var quarterlyET = ui.Map.Layer(ETa_quarter_col.filter(ee.Filter.and(
        ee.Filter.eq('year',YearSelected),
        ee.Filter.listContains('quarter', ee.Number.parse(quarter).multiply(3))
        )).toBands().rename('ETa'),visQuarterET,'ETa quarterly: '+quarter+'/'+YearSelected.getInfo());
  pointvalue(mapPanel,inspector,2,quarterlyET,'ETa','Quarterly',quarter+'/'+YearSelected.getInfo(),2);
  mapPanel.layers().set(5, quarterlyET);
});
// Button to refresh the Map
var ClearButton = ui.Button({
  label: 'CLEAR MAP',
  onClick: function() {
    EnterYear.setValue('',false);
    EnterMonth.setValue('',false);
    EnterQuarter.setValue('',false);
    mapPanel.clear();
    mapPanel.centerObject(BHPS,8);
    mapPanel.setOptions("SATELLITE");
    mapPanel.style().set('cursor', 'crosshair');
    mapPanel.add(ui.Label('Click a point on the map to show time-series plots'));
    mapPanel.widgets().set(2, inspector.clear().add(ui.Label('Click on Map to get ETa value')));
    mapPanel.layers().set(50, ui.Map.Layer(ee.Geometry.Point(-43.53, -22.03), {color: 'Red'}, 'clicked location'));
    mapPanel.onClick(generateChart);},
  style: {width:'570px',textAlign:'center',fontSize :'40px',fontWeight:'bold',color:'Red',position: 'top-center'}
});
//----------------------------------------------- Create ETa download buttons -----------------------------------------------------
//var downloadYear = ui.Button('DOWNLOAD LINK');
var downloadYear = ui.Button({
  label: 'DOWNLOAD LINK',
    onClick: function() {
      var YearSelected = ee.Number.parse(EnterYear.getValue());
      var ETaSelected = ee.Image.loadGeoTIFF(gs_dir.cat(basename_y)
      .cat('annual_').cat(YearSelected).cat(file_format))
      .clip(BHPS).rename(ee.String('ETa_').cat(YearSelected)).toUint16();
      var region = (BHPS_15km.geometry()).getInfo();
      var AnnualLink = ETaSelected.getDownloadURL({
        name:'Annual_AET_LandsatSSEBop_'+YearSelected.getInfo(),scale: 30,region:region,maxPixels: 1e13});
      var DLNTextYear = ui.Label({
        value: 'Download - Annual LandsatSSEBop AET ('+YearSelected.getInfo()+')',style: {position:'bottom-left'}}).setUrl(AnnualLink);
      mapPanel.add(DLNTextYear);
    }});
var ExportYear = ui.Button({
  label: 'EXPORT TO GOOGLE DRIVE',
  onClick: function() {
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var ETaSelected = ee.Image.loadGeoTIFF(gs_dir.cat(basename_y)
      .cat('annual_').cat(YearSelected).cat(file_format))
      .clip(BHPS).rename(ee.String('ETa_').cat(YearSelected)).toUint16();
    var ETa_YearMonth = ETa_monthly_col.filterMetadata('year','equals',YearSelected)
      .toBands().rename(months_names_index).toUint16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTaskYear = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_'+YearSelected.getInfo(), 30);
    prompt('Go to Task tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  },
  style: {width:'200px',textAlign:'center',fontSize :'18px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ExportMonth = ui.Button({
  label: 'EXPORT TO GOOGLE DRIVE',
  onClick: function() {
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var MonthSelected = ee.Number.parse(EnterMonth.getValue());
    var ETaSelected = ee.Image.loadGeoTIFF(gs_dir.cat(basename_m)
    .cat(ee.String('monthly_')).cat(ee.Date.fromYMD(YearSelected,MonthSelected,1).format('yyyy'))
    .cat('M').cat(ee.Date.fromYMD(YearSelected,MonthSelected,1).format('MM')).cat(file_format))
    .clip(BHPS).rename(ee.String('ETa_').cat(ee.Date.fromYMD(YearSelected.getInfo(),MonthSelected.getInfo(),1)
    .format('Myyyy'))).toUint16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(
        ETaSelected.clip(BHPS),region, 
        'Landsat_SSEBopETa_PSRB_monthly_'+YearSelected.getInfo()+'_M'+MonthSelected.getInfo(), 30);
    prompt('Go to Task tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  },
  style: {width:'200px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ExportQuarter = ui.Button({
  label: 'EXPORT TO GOOGLE DRIVE',
  onClick: function() {
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var QuarterSelected = ee.Number.parse(EnterQuarter.getValue());
    var ETaSelected = ETa_quarter_col
      .filter(ee.Filter.eq('year',YearSelected))
      .filter(ee.Filter.listContains('quarter', QuarterSelected.multiply(3)))
      .toBands().rename('ETa_'+YearSelected.getInfo()+'_'+QuarterSelected.getInfo())
      .toUint16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(
        ETaSelected.clip(BHPS),region, 
        'Landsat_SSEBopETa_PSRB_quarterly_'+YearSelected.getInfo()+'_Q'+QuarterSelected.getInfo(), 90);
    prompt('Go to Task tab to RUN the export task (Only for Earth Engine Code Editor).','Click OK to close this window');
  },
  style: {width:'200px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
//----------------------------------------------- Create Long-Term ETa buttons -----------------------------------------------------
var TitleLongTerm = ui.Label({
  value: 'Long-Term ETa ('+StartYear+'-'+EndYear+'):',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '30px 4px 4px 4px',
    padding: '4px',
    }
});
var LongTermYear = ui.Button({
  label: 'ANNUAL',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).','Click OK to close this window');
    var ETaSelected = ETa_annual_col.mean().rename('ETa_LT_yr_'+StartYear+'_'+EndYear).toUint16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_LongTerm_annual_'+StartYear+'_'+EndYear, 90);
    var AnnualMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa annual ('+StartYear+'-'+EndYear+')');
    mapPanel.add(AnnualMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LongTermMonth = ui.Button({
  label: 'MONTHLY',
  onClick: function() {
    var condButtonMonth = ee.Algorithms.If(ee.Algorithms.IsEqual(EnterMonth.getValue(), ''),
      prompt('Type the Month and click the MONTHLY button again. '
      +'If you have already entered the month, wait for the map to be generated. The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).',
      'Click OK to close this window'), ee.Number.parse(EnterMonth.getValue()));
    var MonthSelected = ee.Number.parse(EnterMonth.getValue());
    var ETaLT = ETa_LT_avg_monthly.toUint16();
    var ETaSelected = ETaLT.select(MonthSelected.subtract(1));
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_LongTerm_monthly_'+StartYear+'_'+EndYear+'_M'+MonthSelected.getInfo(), 90);
    var MonthlyMap = ui.Map.Layer(ETaSelected,visMonthET,'Long-Term ETa monthly M'+MonthSelected.getInfo()+' ('+StartYear+'-'+EndYear+')');
    mapPanel.add(MonthlyMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LongTermQuarter = ui.Button({
  label: 'QUARTERLY',
  onClick: function() {
    var condButtonQuarter = ee.Algorithms.If(ee.Algorithms.IsEqual(EnterQuarter.getValue(), ''),
      prompt('Type the Quarter and click the QUARTERLY button again. '
      +'If you have already entered the Quarter, wait for the map to be generated. The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).',
      'Click OK to close this window'), ee.Number.parse(EnterQuarter.getValue()));
    var QuarterSelected = ee.Number.parse(EnterQuarter.getValue());
    var ETaLT = ETa_LT_avg_quarter.toUint16();
    var ETaSelected = ETaLT.select(QuarterSelected.subtract(1));
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_LongTerm_quarterly_'+StartYear+'_'+EndYear+'_Q'+QuarterSelected.getInfo(), 90);
    var QuarterMap = ui.Map.Layer(ETaSelected,visQuarterET,'Long-Term ETa quarterly Q'+QuarterSelected.getInfo()+' ('+StartYear+'-'+EndYear+')');
    mapPanel.add(QuarterMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa1984to1989 = ui.Button({
  label: '1984-1989',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_1984_1989');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_1984_1989', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (1984-1989)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa1990to1995 = ui.Button({
  label: '1990-1995',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_1990_1995');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_1990_1995', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (1990-1995)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa1996to2001 = ui.Button({
  label: '1996-2001',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_1996_2001');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_1996_2001', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (1996-2001)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa2002to2007 = ui.Button({
  label: '2002-2007',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_2002_2007');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_2002_2007', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (2002-2007)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa2008to2013 = ui.Button({
  label: '2008-2013',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_2008_2013');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_2008_2013', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (2008-2013)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonETa2014to2019 = ui.Button({
  label: '2014-2019',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var ETaSelected = ETa_5Year_mean.select('ETa_2014_2019');
    var driveTask = exportDrive(ETaSelected.clip(BHPS),region, 'Landsat_SSEBopETa_PSRB_annual_mean_2014_2019', 90);
    var ETaMap = ui.Map.Layer(ETaSelected,visYearET,'Long-Term ETa (2014-2019)');
    mapPanel.add(ETaMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
//----------------------------------------------- Create ETa Anomaly buttons -----------------------------------------------------
var legendTitleAnomaly = ui.Label({
  value: 'Evapotranspiration Anomaly:',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '40px 4px 4px 4px',
    padding: '4px',
    }
});
var anomalyYear = ui.Button({
  label: 'ANNUAL',
  onClick: function() {
    var condButtonYear = ee.Algorithms.If(ee.Algorithms.IsEqual(EnterYear.getValue(), ''),
      prompt('Type the Year and click the ANNUAL button again. '
      +'If you have already entered the year, wait for the map to be generated. The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).',
      'Click OK to close this window'), ee.Number.parse(EnterMonth.getValue()));
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var Annual = anom_eta_year.select('pct_anomaly').filterMetadata('year','equals',YearSelected)
    .toBands().rename('ETa_Anomaly_'+YearSelected.getInfo())
    .toInt16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(Annual.clip(BHPS),region, 'ETa_anomaly_PSRB_annual_'+YearSelected.getInfo(), 90);
    var AnnualMap = ui.Map.Layer(Annual,visAnom,'ETa anomaly (%): '+YearSelected.getInfo());
    mapPanel.add(AnnualMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var anomalyMonth = ui.Button({
  label: 'MONTHLY',
  onClick: function() {
    var condButtonMonth = ee.Algorithms.If(ee.Algorithms.IsEqual(EnterMonth.getValue(), ''),
      prompt('Type the Month and click the MONTHLY button again. '
      +'If you have already entered the month, wait for the map to be generated. The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).',
      'Click OK to close this window'), ee.Number.parse(EnterMonth.getValue()));
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var MonthSelected = ee.Number.parse(condButtonMonth);
    var Monthly = anom_eta_month.select('pct_anomaly')
      .filter(ee.Filter.eq('year',YearSelected))
      .filter(ee.Filter.eq('month',MonthSelected))
      .toBands().rename('ETa_Anomaly_'+YearSelected.getInfo()+'_M'+MonthSelected.getInfo())
      .toInt16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(
        Monthly.clip(BHPS),region, 
        'ETa_anomaly_PSRB_monthly_'+YearSelected.getInfo()+'_M'+MonthSelected.getInfo(), 90);
    var MonthlyMap = ui.Map.Layer(Monthly,visAnom,'ETa anomaly (%): '+YearSelected.getInfo()+'/M'+MonthSelected.getInfo());
    mapPanel.add(MonthlyMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var anomalyQuarter = ui.Button({
  label: 'QUARTERLY',
  onClick: function() {
    var condButtonQuarter = ee.Algorithms.If(ee.Algorithms.IsEqual(EnterQuarter.getValue(), ''),
      prompt('Type the Quarter and click the QUARTERLY button again. '
      +'If you have already entered the quarter, wait for the map to be generated. The map will also be available for export in the Tasks tab (Only for Earth Engine Code Editor).',
      'Click OK to close this window'), ee.Number.parse(EnterQuarter.getValue()));
    var YearSelected = ee.Number.parse(EnterYear.getValue());
    var QuarterSelected = ee.Number.parse(condButtonQuarter);
    var Quarterly = anom_eta_quarter.select('pct_anomaly')
      .filter(ee.Filter.eq('year',YearSelected))
      .filter(ee.Filter.listContains('quarter', QuarterSelected.multiply(3)))
      .toBands().rename('ETa_Anomaly_'+YearSelected.getInfo()+'_Q'+QuarterSelected.getInfo())
      .toInt16();
    var region = (BHPS_15km.geometry()).getInfo();
    var driveTask = exportDrive(
        Quarterly.clip(BHPS),region, 
        'ETa_anomaly_PSRB_quarterly_'+YearSelected.getInfo()+'_Q'+QuarterSelected.getInfo(), 90);
    var QuarterlyMap = ui.Map.Layer(Quarterly,visAnom,'ETa anomaly (%): '+YearSelected.getInfo()+'/Q'+QuarterSelected.getInfo());
    mapPanel.add(QuarterlyMap);
  },
  style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly1984to1989 = ui.Button({
  label: '1984-1989',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_1984_1989');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_1984_1989', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (1984-1989)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly1990to1995 = ui.Button({
  label: '1990-1995',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_1990_1995');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_1990_1995', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (1990-1995)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly1996to2001 = ui.Button({
  label: '1996-2001',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_1996_2001');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_1996_2001', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (1996-2001)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly2002to2007 = ui.Button({
  label: '2002-2007',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_2002_2007');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_2002_2007', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (2002-2007)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly2008to2013 = ui.Button({
  label: '2008-2013',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_2008_2013');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_2008_2013', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (2008-2013)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var ButtonAnomaly2014to2019 = ui.Button({
  label: '2014-2019',
  onClick: function() {
    var region = (BHPS_15km.geometry()).getInfo();
    var anomalySelected = anom_pct_eta_5year.select('anomaly_2014_2019');
    var drivanomalysk = exportDrive(anomalySelected.clip(BHPS),region, 'anomaly_PSRB_annual_mean_2014_2019', 90);
    var anomalyMap = ui.Map.Layer(anomalySelected,visAnom,'Long-Term anomaly (2014-2019)');
    mapPanel.add(anomalyMap);},
  style: {width:'82px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
//----------------------------------------------- Create ETa MK-Trends buttons -----------------------------------------------------
// Select MK Layers at each p-value
// Annual
var trend_yr = MK_annual.select('slope');
var p_values_yr = MK_annual.select('p_value');
var trend_p005_yr = ui.Map.Layer(trend_yr.updateMask(p_values_yr.lte(0.05)),visTrendYear,'ETa trends at p<0.05 (mm/year-2)');
var trend_p001_yr = ui.Map.Layer(trend_yr.updateMask(p_values_yr.lte(0.01)),visTrendYear,'ETa trends at p<0.01 (mm/year-2)');
var trend_p0001_yr = ui.Map.Layer(trend_yr.updateMask(p_values_yr.lte(0.001)),visTrendYear,'ETa trends at p<0.001 (mm/year-2)');
var sig_p005_yr = ui.Map.Layer(MK_annual_significances.select('sig_p005'),sigVis,'Significance at p<0.05');
var sig_p001_yr = ui.Map.Layer(MK_annual_significances.select('sig_p001'),sigVis,'Significance at p<0.01');
var sig_p0001_yr = ui.Map.Layer(MK_annual_significances.select('sig_p0001'),sigVis,'Significance at p<0.001');
var region = (BHPS_15km.geometry()).getInfo();
var TitleTrendsAnnual = ui.Label({
  value: "Annual ETa Trends - Mann-Kendall/Sen's slope ("+StartYear+"-"+EndYear+"):",
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '30px 4px 4px 4px',
    padding: '4px',
    }
});
var BTtrendYear_p005 = ui.Button({
  label: 'P-VALUE < 0.05',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(MK_annual.updateMask(p_values_yr.lte(0.05)),region, 'ETa_trends_PSRB_annual_p005_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(trend_p005_yr);
    mapPanel.add(sig_p005_yr);
    mapPanel.add(legendSig);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BTtrendYear_p001 = ui.Button({
  label: 'P-VALUE < 0.01',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(MK_annual.updateMask(p_values_yr.lte(0.01)),region, 'ETa_trends_PSRB_annual_p001_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(trend_p001_yr);
    mapPanel.add(sig_p001_yr);
    mapPanel.add(legendSig);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BTtrendYear_p0001 = ui.Button({
  label: 'P-VALUE < 0.001',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(MK_annual.updateMask(p_values_yr.lte(0.001)),region, 'ETa_trends_PSRB_annual_p0001_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(trend_p0001_yr);
    mapPanel.add(sig_p0001_yr);
    mapPanel.add(legendSig);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
//----------------------------------------------- Create Time-series quality buttons -----------------------------------------------------
// UI Maps
var totalOBS_map = ui.Map.Layer(totalOBS_img,vizOBStotal,'Landsat total observations');
var NC_Count_map = ui.Map.Layer(NC_Count_img,vizOBSclear,'Landsat clear observations');
var NC_Index_map = ui.Map.Layer(NC_Index_img,vizclearindex,'Landsat clear observations index');
var TitleTSQ = ui.Label({
  value: "Landsat Time-series quality ("+StartYear+"-"+EndYear+"):",
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '30px 4px 4px 4px',
    padding: '4px',
    }
});
var totalOBS = ui.Button({
  label: 'TOTAL OBSERVATIONS',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(totalOBS_img,region, 'Landsat_Total_observations_PSRB_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(totalOBS_map);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var clearOBS = ui.Button({
  label: 'CLEAR OBSERVATIONS',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(NC_Count_img,region, 'Landsat_Clear_observations_PSRB_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(NC_Count_map);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var clearOBSindex = ui.Button({
  label: 'CLEAR OBSERVATIONS INDEX',
  onClick: function() {
    prompt('The map will also be available for export in the Tasks tab','Click OK to close this window');
    var driveTask = exportDrive(NC_Index_img,region, 'Landsat_Clear_observations_index_PSRB_'+StartYear+'_'+EndYear, 90);
    mapPanel.add(NC_Index_map);
  },style: {width:'180px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
// Insert Widgets on Panel.
panel.add(ui.Label({value:'Type the Year (from 1984 to 2019) and press Enter:', style:{fontWeight:'bold'}}));
panel.widgets().set(2, ui.Panel([EnterYear,ExportYear], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(3, legendYear);
panel.add(ui.Label({value:'Type the Month (from 1 to 12) and press Enter:', style:{fontWeight:'bold'}}));
panel.widgets().set(5, ui.Panel([EnterMonth, ExportMonth], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(6, legendMonth);
panel.add(ui.Label({value:'Type the Quarter (from 1 to 4) and press Enter:', style:{fontWeight:'bold'}}));
panel.widgets().set(8, ui.Panel([EnterQuarter, ExportQuarter], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(9, legendQuarter);
panel.widgets().set(11, TitleLongTerm);
panel.widgets().set(12, ui.Panel([LongTermYear, LongTermMonth, LongTermQuarter], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(13, ui.Panel([
    ButtonETa1984to1989, ButtonETa1990to1995, ButtonETa1996to2001,
    ButtonETa2002to2007, ButtonETa2008to2013, ButtonETa2014to2019], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(14, legendTitleAnomaly);
panel.widgets().set(15, ui.Panel([anomalyYear, anomalyMonth, anomalyQuarter], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(16, ui.Panel([
    ButtonAnomaly1984to1989, ButtonAnomaly1990to1995, ButtonAnomaly1996to2001,
    ButtonAnomaly2002to2007, ButtonAnomaly2008to2013, ButtonAnomaly2014to2019], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(17, legendAnomaly);
panel.widgets().set(18, TitleTrendsAnnual);
panel.widgets().set(19, ui.Panel([BTtrendYear_p005, BTtrendYear_p001, BTtrendYear_p0001], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(20, legendTrend_yr);
panel.widgets().set(21, TitleTSQ);
panel.widgets().set(22, ui.Panel([totalOBS, clearOBS, clearOBSindex], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(23, ui.Panel([legend_tot_obs, legend_clear_obs, legend_clear_index], ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(25, ClearButton);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.widgets().set(27, ui.Label({value:'Clicked Location:', style: {fontWeight: 'bold'}}));
panel.widgets().set(28, ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-43.53, -22.03);
/*
 * Initialize the app
 */
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
// Reference texts and links
// Insert references title
var title_references = ui.Label({
  value: 'References:',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px',
    }
});
// Insert references hyperlinks
var Gilbert1987 = ui.Label('Gilbert (1987). Statistical Methods for Environmental Pollution Monitoring.')
  .setUrl('https://www.osti.gov/biblio/7037501-statistical-methods-environmental-pollution-monitoring');
var Salmietal2002 = ui.Label('Salmi et al (2002). Detecting trends of annual values of atmospheric pollutants by'+
  ' the Mann-Kendall Test and Sen’s Slope estimates - The Excel template application MAKESENS.')
  .setUrl('https://en.ilmatieteenlaitos.fi/documents/30106/335634754/MAKESENS-Manual_2002.pdf/25bbe115-7f7e-4de3-97d8-5a96ac88499f');
var Senayetal2011 = ui.Label('Senay et al (2011). Enhancing the Simplified Surface Energy Balance (SSEB)'+
  ' approach for estimating landscape ET: Validation with the METRIC model.')
  .setUrl('https://www.sciencedirect.com/science/article/abs/pii/S0378377410003355');
var Senayetal2013 = ui.Label('Senay et al (2013). Operational Evapotranspiration Mapping Using Remote Sensing'+
  ' and Weather Datasets: A New Parameterization for the SSEB Approach.')
  .setUrl('https://onlinelibrary.wiley.com/doi/full/10.1111/jawr.12057');
var Senayetal2017 = ui.Label('Senay et al (2017). Satellite-based water use dynamics using historical Landsat data'+
' (1984–2014) in the southwestern United States.')
  .setUrl('https://www.sciencedirect.com/science/article/pii/S0034425717301967');
var Senayetal2018 = ui.Label('Senay (2018). Satellite Psychrometric Formulation of the Operational Simplified'+
  ' Surface Energy Balance (SSEBop) Model for Quantifying and Mapping Evapotranspiration.')
  .setUrl('https://elibrary.asabe.org/abstract.asp?aid=48975');
// Notes texts and links
var textSSEBop = ui.Label('1. Actual ET (ETa) derived from Operational Simplified Surface Energy'+
  ' Balance (SSEBop) model using top-of-atmosphere (TOA) Landsat collection.'); 
//var LandsatLink = ui.Label('Landsat collection.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/landsat');
var textNCEP = ui.Label('2. Alfafa Reference ET (ETr) derived from');
var NCEPlink = ui.Label('NCEP/CFSv2 6h products.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/NOAA_CFSV2_FOR6H');
var textCHIRPS = ui.Label('3: Precipitation data derived from');
var CHIRPSlink = ui.Label('CHIRPS Daily product').setUrl('https://developers.google.com/earth-engine/datasets/catalog/UCSB-CHG_CHIRPS_DAILY');
var CodeEditor_script = ui.Label('Code Editor script of this APP')
  .setUrl('https://code.earthengine.google.com/5eb4f63dcc60a78b648516b47e7343dc?noload=true');
var SSEBop_asset = ui.Label('Landsat monthly SSEBopETa (ASSET)')
  .setUrl('https://code.earthengine.google.com/?asset=users/ricardogeo/SSEBop_1984_2019/PSRB_Results/Landsat_SSEBopETa_PSRB_monthly_1984_2019');
  // Insert download hyperlinks
var imglinks1 = ui.Label('Monthly ETa maps (GeoTIFF)').setUrl('https://1drv.ms/u/s!ApHz19zg1d_OmB92mIl98Q7BOV2s?e=GVzhOL');
var imglinks2 = ui.Label('Annual ETa maps (GeoTIFF)').setUrl('https://1drv.ms/u/s!ApHz19zg1d_OmxfkkQz5c7BIGyAk?e=9xRTxg');
// Insert Reference texts and links
panel.add(ui.Label('_________________________________________________________________________________________________'));
panel.add(title_references);
panel.add(Gilbert1987);
panel.add(Salmietal2002);
panel.add(Senayetal2013);
panel.add(Senayetal2017);
panel.add(Senayetal2018);
panel.add(ui.Label('_________________________________________________________________________________________________'));
panel.add(ui.Panel([
  ui.Label({value:'Notes',style: {fontWeight: 'bold'}}),
  ]));
panel.add(textSSEBop);
panel.add(ui.Panel([textNCEP, NCEPlink], ui.Panel.Layout.flow('horizontal',true)));
panel.add(ui.Panel([textCHIRPS, CHIRPSlink], ui.Panel.Layout.flow('horizontal',true)));
panel.add(ui.Panel([ui.Label('4:'),CodeEditor_script], ui.Panel.Layout.flow('horizontal',true)));
panel.add(ui.Panel([ui.Label('5:'),SSEBop_asset], ui.Panel.Layout.flow('horizontal',true)));
panel.add(ui.Label('_________________________________________________________________________________________________'));
panel.add(ui.Panel([
  ui.Label({value:'Contacts:',style: {fontWeight: 'bold'}}),
  ]));
panel.add(ui.Panel([ui.Label('E-mail:'), ui.Label('ricardogeo@gmail.com').setUrl('https://ricardogeo@gmail.com')], 
  ui.Panel.Layout.flow('horizontal',true)));
panel.add(ui.Panel([ui.Label('Lattes:'), ui.Label('Ricardo Neves de Souza Lima').setUrl('http://lattes.cnpq.br/0528268655953558')], 
  ui.Panel.Layout.flow('horizontal',true))); 
panel.add(ui.Panel([ui.Label('Researchgate:'), ui.Label('https://www.researchgate.net/profile/Ricardo_Neves_De_Souza_Lima').setUrl('https://www.researchgate.net/profile/Ricardo_Neves_De_Souza_Lima')], 
  ui.Panel.Layout.flow('horizontal',true)));