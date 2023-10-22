var table = ee.FeatureCollection("users/LearningIIT/2011_Dist"),
    collection = ee.ImageCollection("ECMWF/ERA5/DAILY"),
    imageCollection2 = ee.ImageCollection("ECMWF/ERA5/MONTHLY");
 // Example script to load and visualize ERA5 climate reanalysis parameters in
// Google Earth Engine
var map = ui.Map();
// var dateselect = ['2010','2011'];
// var date= ui.Select
// ({
//   items:dateselect, 
//   placeholder : 'Choose a year',
//   onChange: function (dated){
//     print(dated + ' is Selected');
//     if(dated == '2010')
//     {
//       var year =2010;
//     }
//   },
//   style: {
//     width: '50%',
//     color: 'black',
//     width : '750px',
//     backgroundColor: 'orange'
//   }
// });  
// additional General Settings boxes
var districtselect = ['Uttarkashi', 'Chamoli','Rudraprayag','Tehri Garhwal','Dehradun', 'Garhwal',
'Pithoragarh', 'Bageshwar',  'Almora',
'Champawat','Nainital','Udham Singh Nagar','Hardwar'   ];
var district= ui.Select({
  items:districtselect, 
  placeholder : 'Choose a District',
  onChange: function (value){
    print(value + ' is Selected');
    if(value == 'Uttarkashi')
    {
      var featureToAnalyze =table
.filter(ee.Filter.eq('DISTRICT', 'Uttarkashi')) ;
      Map.clear();
      Map.centerObject(featureToAnalyze, 9)
 weather(featureToAnalyze,year) ;
    }
    else if(value == 'Chamoli')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Chamoli'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }
    else if(value == 'Rudraprayag')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Rudraprayag'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }
      else if(value == 'Tehri Garhwal')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Tehri Garhwal'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Dehradun')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Dehradun'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Garhwal')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT','Garhwal'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Pithoragarh')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Pithoragarh'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Bageshwar')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Bageshwar'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Almora')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Almora'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Nainital')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Nainital'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }
    else if(value == 'Champawat')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Champawat'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }
    else if(value == 'Udham Singh Nagar')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Udham Singh Nagar'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    }  else if(value == 'Hardwar')
    {
      var featureToAnalyze = table
.filter(ee.Filter.eq('DISTRICT', 'Hardwar'));
      Map.clear();
      Map.centerObject(featureToAnalyze, 9);
      weather(featureToAnalyze) ;
    } 
  },
  style: {
    width: '50%',
    color: 'black',
    width : '750px',
    backgroundColor: 'orange'
  }
});
var headLabel = ui.Label({value:' Weather App for Uttrakhand District',
  style: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center'
  }
});
var panel = ui.Panel({
  style: {
    width: '40%',
    backgroundColor: 'green'
  }
});
var chartPanel = ui.Panel({style: {width:'800px'}});
ui.root.add(panel);
panel.add(headLabel); 
panel.add(district);
//panel.add(date);
 panel.add(chartPanel);
//print(table);
function weather(featureToAnalyze)  
{
  var region=featureToAnalyze ;
       // Daily mean 2m air temperature
var era5_2mt = ee.ImageCollection('ECMWF/ERA5/DAILY') 
                   .select('mean_2m_air_temperature')
                   .filter(ee.Filter.date('2018-06-01', '2019-6-01'));
//print(era5_2mt);
// Predefine the chart titles.
var title = {
  title: ' Air Temperature vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: ' Air Temperature (K)'},
};
var chart_air_temp = ui.Chart.image.seriesByRegion(era5_2mt,region, ee.Reducer.mean(), 'mean_2m_air_temperature', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for Mean Air temperature of Census Code ' );
// plot the chart
//print(chart);
// Daily total precipitation sums
var era5_tp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('total_precipitation')
                  .filter(ee.Filter.date('2018-06-01', '2019-06-01'));
// Predefine the chart titles.
var title = {
  title: ' Precipitation vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Precipitation (m)'},
};
var chart_tot_prec = ui.Chart.image.seriesByRegion(era5_tp,region, ee.Reducer.mean(), 'total_precipitation', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for Precipitation ');
// plot the chart
//print(chart);
// Daily mean 2m dewpoint temperature
var era5_2d = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('dewpoint_2m_temperature')
                   .filter(ee.Filter.date('2018-06-01', '2019-06-01'));
// Predefine the chart titles.
var title = {
  title: ' Dewpoint 2m Temperature vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Dewpoint 2m Temperature (K)' },
};
var chart_dewpoint_temp = ui.Chart.image.seriesByRegion(era5_2d,region, ee.Reducer.mean(), 'dewpoint_2m_temperature', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for Dewpoint 2m Temperature  ');
// plot the chart
//print(chart);
// Daily mean sea-level pressure
var era5_mslp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                    .select('mean_sea_level_pressure')
                      .filter(ee.Filter.date('2018-06-01', '2019-06-01'));
// Predefine the chart titles.
var title = {
  title: ' Mean Sea Level Pressure vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Mean Sea Level Pressure (Pa)'},
};
var chart_mslp = ui.Chart.image.seriesByRegion(era5_mslp,region, ee.Reducer.mean(), 'mean_sea_level_pressure', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for Mean Sea Level Pressure  ');
// plot the chart
//print(chart);
// Daily mean surface pressure
var era5_sp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('surface_pressure')
                .filter(ee.Filter.date('2018-06-01', '2019-06-01'));
// Predefine the chart titles.
var title = {
  title: ' Surface Pressure vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Surface Pressure (Pa)'},
};
var chart_sp = ui.Chart.image.seriesByRegion(era5_sp,region, ee.Reducer.mean(), 'surface_pressure', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for surface_pressure ');
// plot the chart
//print(chart);
// Daily mean 10m u-component of wind
var era5_u_wind_10m = ee.ImageCollection('ECMWF/ERA5/DAILY')
                          .select('u_component_of_wind_10m')
                          .filter(ee.Filter.date('2018-06-01', '2019-06-01'));
// Predefine the chart titles.
var title = {
  title: ' u component of wind 10m vs Time ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'u component of wind 10m  (m/s)'},
};
var chart_u_wind = ui.Chart.image.seriesByRegion(era5_u_wind_10m,region, ee.Reducer.mean(), 'u_component_of_wind_10m', 2500, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
//print('Chart for u component of wind 10m ');
// plot the chart
//print(chart);
// Convert pressure levels from Pa to hPa - Example for surface pressure
var era5_sp = era5_sp.map(function(image) {
  return image.divide(100).set(
      'system:time_start', image.get('system:time_start'));
});
// Visualization palette for total precipitation
var visTp = {
  min: 0,
  max: 0.1,
  palette: ['#FFFFFF', '#00FFFF', '#0080FF', '#DA00FF', '#FFA400', '#FF0000']
};
// Visualization palette for temperature (mean, min and max) and 2m dewpoint
// temperature
var vis2mt = {
  min: 250,
  max: 320,
  palette: [
    '#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF'
  ]
};
// Visualization palette for u- and v-component of 10m wind
var visWind = {
  min: 0,
  max: 30,
  palette: [
    '#FFFFFF', '#FFFF71', '#DEFF00', '#9EFF00', '#77B038', '#007E55', '#005F51',
    '#004B51', '#013A7B', '#023AAD'
  ]
};
// Visualization palette for pressure (surface pressure, mean sea level
// pressure) - adjust min and max values for mslp to min:990 and max:1050
var visPressure = {
  min: 500,
  max: 1150,
  palette: [
    '#01FFFF', '#058BFF', '#0600FF', '#DF00FF', '#FF00FF', '#FF8C00', '#FF8C00'
  ]
};
// Add layer to map
Map.addLayer(
    era5_tp.filter(ee.Filter.date('2018-06-01', '2019-6-01')).median().clip(region), visTp,
    'Daily total precipitation sums ');
Map.addLayer(
    era5_2d.filter(ee.Filter.date('2018-06-01', '2019-6-01')).median().clip(region), vis2mt,
    'Daily mean 2m dewpoint temperature ');
Map.addLayer(
    era5_2mt .filter(ee.Filter.date('2018-06-01', '2019-6-01')).median().clip(region), vis2mt,
    'Daily mean 2m air temperature ');
Map.addLayer(
    era5_u_wind_10m .filter(ee.Filter.date('2018-06-01', '2019-6-01')).median().clip(region), visWind,
    'Daily mean 10m u-component of wind  ');
Map.addLayer(
    era5_sp .filter(ee.Filter.date('2018-06-01', '2019-6-01')).median().clip(region), visPressure,
    'Daily mean surface pressure ');
  chartPanel.clear();
  chartPanel.add(chart_air_temp);
  chartPanel.add(chart_tot_prec );
  chartPanel.add(chart_dewpoint_temp);
  chartPanel.add(chart_mslp );
  chartPanel.add(chart_sp );
  chartPanel.add(chart_u_wind);
}