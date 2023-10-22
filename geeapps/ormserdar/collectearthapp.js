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
    script = require("users/ormserdar/ce_scripts:frames_africa_deal");
}
// The date that is used as the start of the chart ( if the dataset is available )
// You can change the start date manually and hit the button "Run""again to reload the charts using the different time series
var startTime = ui.url.get('startTime', "2000-01-01");
var now = new Date( Date.now() );
var today = now.getFullYear()+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
var lastYearToday = ( now.getFullYear() -1 )+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
// The last date for which the chart is generated.
var endTime = ui.url.get('endTime', "2022-01-30");
var plotId = ui.url.get('plotId', 'Plot');
var geoJson = ui.url.get('geoJson', 
'{"type":"MultiLineString","coordinates":[[[33.23184870286311, 41.66704103720797],[33.231848703190884, 41.66641046246437],[33.232689371398834, 41.66641045963431],[33.23268937189005, 41.66704103437802],[33.23184870286311, 41.66704103720797]]]}'
//Kastamonu İğne yapraklı Göknar Ormanı (devamlı yeşil) 
//'{"type":"MultiLineString","coordinates":[[[32.25887860523537, 41.66415735305377],[32.25887860556302, 41.66352677831013],[32.259719236120596, 41.66352677548018],[32.259719236611666, 41.664157350223846],[32.25887860523537, 41.66415735305377]]]}'
//Bartın kayın gürgen karışık geniş yapraklı Ormanı (yaprak döken)
//'{"type":"MultiLineString","coordinates":[[[32.786166415676014, 41.85652744679925],[32.786166416027044, 41.85589687205563],[32.78700957032657, 41.85589686922148],[32.787009570852696, 41.85652744396516],[32.786166415676014, 41.85652744679925]]]}'
//Kastamonu geniş yapraklı yaprak dökmeyen Defne Ormanı (devamlı yeşil)
);
var obj = JSON.parse(geoJson);
var geometry = ee.Geometry( obj );
script.processPlotInfo( geometry, startTime, endTime, lastYearToday, null, plotId  );