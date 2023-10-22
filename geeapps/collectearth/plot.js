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
}else if( 
  surveyString.indexOf("ad_redd2021" ) != -1 
) {
    script = require("users/collectearth/ce_scripts:frames_landsat_v5_kNDVI");
}
else if( 
  surveyString.indexOf("myanmar_timor_leste_class_training_dem" ) != -1  // For Lorena with CCDC Temporal segmentation
) {
    script = require("users/collectearth/ce_scripts:frames_landsat_v4_Timor");
}
else if( 
  surveyString.indexOf("myanmar" ) != -1  // For Lorena with CCDC Temporal segmentation
) {
    script = require("users/collectearth/ce_scripts:frames_landsat_v4_Myanmar");
}
else{
    script = require("users/collectearth/ce_scripts:frames_landsat_v4_tempSegmentation");
} 
// The date that is used as the start of the chart ( if the dataset is available )
// You can change the start date manually and hit the button "Run""again to reload the charts using the different time series
var startTime = ui.url.get('startTime', "2000-01-01");
var now = new Date( Date.now() );
var today = now.getFullYear()+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
var lastYearToday = ( now.getFullYear() -1 )+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
// The last date for which the chart is generated.
var endTime = ui.url.get('endTime', today);
var plotId = ui.url.get('plotId', 'Plot');
var geoJson = ui.url.get('geoJson', 
'{"type":"MultiLineString","coordinates":[[[-61.79819,17.624234],[-61.796098,17.624234],[-61.796098,17.622228],[-61.79819,17.622228],[-61.79819,17.624234]]]}'
);
var obj = JSON.parse(geoJson);
var geometry = ee.Geometry( obj );
script.processPlotInfo( geometry, startTime, endTime, lastYearToday, null, plotId  );