// Exected URL parameters:
// ee_script : one of "sentinelAndLandsat", ""sentinelAndLandsatWithFires"
// startTime : Defautls to 2000-01-01
// endTime : Defaults to todays date
// geoJson : This is the only parameter that MUST be filled
// plotId : The name of the plot being assessed, defaults to Plot
var survey = ui.url.get('survey', "standard");
var script;
var surveyString = JSON.stringify(survey);
if( 
  surveyString.indexOf("belize" ) != -1 
  || 
  surveyString.indexOf("fire_timor") != -1
) {
    script = require("users/collectearth/ce_scripts:frames_belize_2020");
}else{
    script = require("users/ormserdar/high_mountain:frames_landsat_v4");
}
// The date that is used as the start of the chart ( if the dataset is available )
// You can change the start date manually and hit the button "Run""again to reload the charts using the different time series
var startTime = ui.url.get('startTime', "2000-01-01");
var now = new Date( Date.now() );
var today = now.getFullYear()+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
var lastYearToday = ( now.getFullYear() -1 )+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
// The last date for which the chart is generated.
var endTime = ui.url.get('endTime', "2020-12-31");
var plotId = ui.url.get('plotId', 'Plot');
var geoJson = ui.url.get('geoJson', 
'{"type":"MultiLineString","coordinates":[[[-53.728627,-33.057883],[-53.727877,-33.057883],[-53.727877,-33.058514],[-53.728627,-33.058514],[-53.728627,-33.057883]]]}'
//'{"type":"MultiLineString","coordinates":[[[149.227521,-30.453452],[149.228562,-30.453452],[149.228562,-30.454354],[149.227521,-30.454354],[149.227521,-30.453452]]]}'
);
var obj = JSON.parse(geoJson);
var geometry = ee.Geometry( obj );
script.processPlotInfo( geometry, startTime, endTime, lastYearToday, null, plotId  );