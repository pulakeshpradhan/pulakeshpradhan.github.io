//Click on the map inside MIS to see the time series chart
//of precipitation, adjust dates to see a different time line
//imports, global vars
// Step 1: 
// var dsm = ee.Image("JAXA/ALOS/AW3D30/V2_2");
// var ulb = ee.FeatureCollection("users/spareeth/Module11/urmia_bdry");
//Step 2: 
var mis = ee.FeatureCollection("users/spareeth/Module11/miandoab_scheme");
//Step 3, here : 
var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06");
///
//////FUNCTIONS DEFINED////////
//below function return number of days in a month
function getDaysInMonth(y,m) {
  var dt = ee.Date.fromYMD(y,m,1);
  var n = dt.advance(1,"month").difference(dt,'day');
  return n;
}
//below function will convert mm/hr to mm/month for the 
// GPM data
var monthly = function(image) {
  var dt = ee.Date(image.get("system:time_end"));
  var y = dt.get('year');
  var m = dt.get('month');
  var days = getDaysInMonth(y,m);
  return image.multiply(days).multiply(24).copyProperties(image, ["system:time_start", "system:time_end"]);
};
//////FUNCTIONS DEFINED END HERE////////
//Print GPM to see the metadata of image collection
print(GPM);
// select the band with precipitation information
var pcp = GPM.filterDate('2018-10-01', '2019-09-30')
              .select('precipitation');
// apply the monthly function to image collection 'pcp' to
// convert mm/hr to mm/month
var pcp_monthly = pcp.map(monthly);
//Visualize the Miandoab scheme boundary
Map.addLayer(mis,{},'Scheme');
// Click and plot a chart on console function.
var panel = ui.Panel();
print(panel);
Map.onClick(function(coords) {
  // Add a red point to the map wherever the user clicks.
   // Add a chart to put monthly precipitation chart
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(8, dot);
  var chart = ui.Chart.image.series({
    imageCollection: pcp_monthly.select(['precipitation']),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart.setOptions({
    title: 'Monthly Precipitation 2019',
    vAxis: {title: 'P (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    label: 'Precipitation',
    width: 250,
    height: 250,
    //interpolateNulls: true,
    //curveType: 'function'
  });
 chart.setChartType('ColumnChart');
 //print(chart);
 panel.clear();
 panel.add(chart);
});