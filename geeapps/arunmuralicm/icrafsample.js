var table = ee.FeatureCollection("users/arunmuralicm/Lanscape");
// Display as default and with a custom color.
var tableImage = ee.Image().float().paint(table, 0).paint(table, 1, 1)
Map.addLayer(tableImage, {palette:['000000', 'ffffff']}, 'Landscape', true, 0.5)
Map.centerObject(table,3)
// image collection - Tree cover
var image = ee.ImageCollection('MODIS/051/MOD44B')
.filterDate('2000-01-01','2017-01-01');
var scale = 250;
var treecover = image.select('Percent_Tree_Cover');
// image collection - Night lights
var image1 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
.filterDate('2014-01-01','2015-01-01');
var scale = 500;
var avg_radiance = image1.select('avg_rad');
// image collection - npp, gpp
/*var scale = function(image){
  var scaled = image.multiply(0.0001).rename ('scale_band');
  return image.addBands(scaled);
};*/
var image2 = ee.ImageCollection('MODIS/055/MOD17A3')
.filterDate('2000-01-01','2015-01-01');
var scale = 1000;
var avg_npp = image2.select('Npp');
var avg_gpp = image2.select('Gpp');
//----------------------------------------------CHIRPS data-----------------------------------------//
var startdate ="2010-01-01"
var enddate = "2018-01-01" 
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(startdate,enddate)
//-------------MONTHLY------------------------ 
//defines period of interest 
var startyear = 2010; 
var endyear = 2018; 
var years = ee.List.sequence(startyear, endyear);
//select data for the period of interest and place
var precip = chirps.filterDate(startdate, enddate)
  .sort('system:time_start', false)
  .filterBounds(table);
//----------ANNUAL--------
//function for calculating the annual precipitation
var annualPrecip = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = precip
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '750px'}});
  var places = {
  Honduras: [table.filter(ee.Filter.eq('SL', 'Honduras')).geometry()],
  Nicaragua:[table.filter(ee.Filter.eq('SL', 'Nicaragua')).geometry()],
  Peru: [table.filter(ee.Filter.eq('SL', 'Peru')).geometry()],
  BurkinaFaso: [table.filter(ee.Filter.eq('SL', 'Burkina Faso')).geometry()],
  Ghana: [table.filter(ee.Filter.eq('SL', 'Ghana')).geometry()],
  Cameroon: [table.filter(ee.Filter.eq('SL', 'Cameroon')).geometry()],
  NileCongo: [table.filter(ee.Filter.eq('SL', 'Nile-Congo')).geometry()],
  Miombo: [table.filter(ee.Filter.eq('SL', 'Miombo')).geometry()],
  SouthAfrica: [table.filter(ee.Filter.eq('SL', 'South Africa')).geometry()],
  WesternGhats: [table.filter(ee.Filter.eq('SL', 'Western Ghats')).geometry()],
  Mekong: [table.filter(ee.Filter.eq('SL', 'Mekong')).geometry()],
  Sumatra: [table.filter(ee.Filter.eq('SL', 'Sumatra')).geometry()],
  WestKalimantan: [table.filter(ee.Filter.eq('SL', 'West Kalimantan')).geometry()],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
  //Map.setCenter(places[key][0], places[key][1]);
    var selectedcountry = ee.Feature(places[key][0], places[key][1]);
    //print(selectedcountry);
  //Map.addLayer(selectedcountry);
    Map.centerObject(selectedcountry,5)
    var annualVCF = ui.Chart.image.series(treecover,selectedcountry, ee.Reducer.mean(),250)
        .setOptions({
  title: ('Percentage of tree cover'),
  hAxis: {title: 'Month'},
  vAxis: {title: 'Percentage'},
})
.setChartType('ColumnChart');
var mthly_nlt = ui.Chart.image.series(avg_radiance,selectedcountry, ee.Reducer.mean(),500)
.setOptions({
  title: ('Monthly night lights radiance'),
  hAxis: {title: 'Month'},
  vAxis: {title: 'Average radiance'},
})
.setChartType('ComboChart');
var forest_npp = ui.Chart.image.series(avg_npp,selectedcountry, ee.Reducer.mean(),1000)
.setOptions({
  title: ('Annual Net Primary Productivity(Npp)'),
  hAxis: {title: 'Year'},
  vAxis: {title: 'Npp (kg*C/m^2)'},
})
.setChartType('ColumnChart');
var forest_gpp = ui.Chart.image.series(avg_gpp,selectedcountry, ee.Reducer.mean(),1000)
.setOptions({
  title: ('Annual Gross Primary Productivity(Gpp)'),
  hAxis: {title: 'Year'},
  vAxis: {title: 'Gpp (kg*C/m^2)'},
})
.setChartType('ColumnChart');
var chirps_preci = ui.Chart.image.series(annualPrecip,selectedcountry, ee.Reducer.mean(),5000)
.setOptions({
  title: ('Annual Precipitation'),
  hAxis: {title: 'Year'},
  vAxis: {title: 'Precipitation (mm)'},
})
.setChartType('ColumnChart');
panel.clear();
panel.widgets().set(1, annualVCF);
panel.widgets().set(2, forest_gpp);
panel.widgets().set(3, forest_npp);
panel.widgets().set(4, mthly_nlt);
panel.widgets().set(5, chirps_preci);
ui.root.widgets().add(panel);
  }
});
// Set a place holder.
select.setPlaceholder('Choose the Landscape');
Map.add(select);