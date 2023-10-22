var sentinel = ee.ImageCollection("COPERNICUS/S2_SR"),
    countries = ee.FeatureCollection("USDOS/LSIB/2013"),
    rect = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[36.83349762118405, -2.3878340078823324],
          [36.83349762118405, -2.848776824276682],
          [37.54211578524655, -2.848776824276682],
          [37.54211578524655, -2.3878340078823324]]], null, false),
    ls = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
var S2=sentinel
var AOI2 = countries.filterMetadata('name','Equals','KENYA')
var AOI = rect
var S2=S2
    .filterBounds(AOI)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',10)
    .select([1,2,3,7],['Blue','Green','Red','NIR'])
    .mean()
    .clip(AOI)
var chart = ui.Chart.image.histogram({
  image:S2,
  region:AOI,
  scale:1000
})
var imageCollection = ls.select([1,2,3,4],['blue','green','red','nir']).filterBounds(AOI).filterMetadata('CLOUD_COVER','less_than',20).aside(print);
var months = ee.List.sequence(1, 12);
var composites = ee.ImageCollection.fromImages(months.map(function(m) {
  var filtered = imageCollection.filter(ee.Filter.calendarRange({
    start: m,
    field: 'month'
  }));
  var composite = filtered.median().clip(AOI)//ee.Algorithms.Landsat.simpleComposite(filtered);
  return composite.normalizedDifference(['nir', 'red']).rename('NDVI')
      .set('month', m);
}));
print("Composites:", composites);
// var jan = ee.Image(composites.first());
var jan = composites.filterMetadata('month','equals',1)
var feb = composites.filterMetadata('month','equals',2)
var mar = composites.filterMetadata('month','equals',3)
var apr = composites.filterMetadata('month','equals',4)
var may = composites.filterMetadata('month','equals',5)
var jun = composites.filterMetadata('month','equals',6)
var jul = composites.filterMetadata('month','equals',7)
var aug = composites.filterMetadata('month','equals',8)
var sep = composites.filterMetadata('month','equals',9)
var oct = composites.filterMetadata('month','equals',10)
var nov = composites.filterMetadata('month','equals',11)
var dec = composites.filterMetadata('month','equals',12)
//Precipitations
// set start and end year
var startyear = 2000; 
var endyear = 2018; 
// make a date object
var startdate = ee.Date.fromYMD(startyear,1, 1);
var enddate = ee.Date.fromYMD(endyear + 1, 1, 1);
// make a list with years - sort of empty buckets (one per year)
var years = ee.List.sequence(startyear, endyear);
print('years: ', years)
var annualPrecip = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = chirps
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
print("Annual precipitation: ", annualPrecip)
var title = {
  title: 'Yearly Precipitation',
  hAxis: {title: 'Year'},
  vAxis: {title: 'Precipitation (mm)'},
};
var chart = ui.Chart.image.seriesByRegion({
  imageCollection: annualPrecip, 
  regions: AOI,
  reducer: ee.Reducer.mean(),
  band: 'precipitation',
  scale: 2500,
  xProperty: 'system:time_start',
  seriesProperty: 'SITE'
}).setOptions(title)
  .setChartType('ColumnChart');
// Create a panel to hold the chart.
var panelRain = ui.Panel();
panelRain.style().set({
  width: '400px',
  position: 'bottom-left',
  backgroundColor: 'Snow',
});
Map.add(panelRain)
panelRain.add(chart)
//// UI INTERFACE
// Create a title label .
var title = ui.Label('NDVI app - OOGR');
title.style().set({
  position: 'top-center',
  fontSize:'25px',
  fontWeight:'bold'
});
Map.add(title);
// Create a panel to hold the chart.
var panelMonths = ui.Panel();
panelMonths.style().set({
  width: '200px',
  position: 'middle-right',
  backgroundColor: 'Snow',
});
Map.add(panelMonths);
// Create the title label of the control panel.
var title = ui.Label('Monthly NDVI average');
title.style().set({
  position: 'top-left',
  fontSize:'16px',
  fontWeight:'bold'
});
panelMonths.add(title);
var checkbox1 = ui.Checkbox('January', true);
checkbox1.onChange(function(checked) {Map.layers().get(0).setShown(checked);});
checkbox1.style().set('position', 'top-left');
panelMonths.add(checkbox1);
var checkbox2 = ui.Checkbox('February', false);
checkbox2.onChange(function(checked) {Map.layers().get(1).setShown(checked);});
checkbox2.style().set('position', 'top-left');
panelMonths.add(checkbox2);
var checkbox3 = ui.Checkbox('March', false);
checkbox3.onChange(function(checked) {Map.layers().get(2).setShown(checked);});
checkbox3.style().set('position', 'top-left');
panelMonths.add(checkbox3);
var checkbox4 = ui.Checkbox('April', false);
checkbox4.onChange(function(checked) {Map.layers().get(3).setShown(checked);});
checkbox4.style().set('position', 'top-left');
panelMonths.add(checkbox4);
var checkbox5 = ui.Checkbox('May', false);
checkbox5.onChange(function(checked) {Map.layers().get(4).setShown(checked);});
checkbox5.style().set('position', 'top-left');
panelMonths.add(checkbox5);
var checkbox6 = ui.Checkbox('June', false);
checkbox6.onChange(function(checked) {Map.layers().get(5).setShown(checked);});
checkbox6.style().set('position', 'top-left');
panelMonths.add(checkbox6);
var checkbox7 = ui.Checkbox('July', false);
checkbox7.onChange(function(checked) {Map.layers().get(6).setShown(checked);});
checkbox7.style().set('position', 'top-left');
panelMonths.add(checkbox7);
var checkbox8 = ui.Checkbox('August', false);
checkbox8.onChange(function(checked) {Map.layers().get(7).setShown(checked);});
checkbox8.style().set('position', 'top-left');
panelMonths.add(checkbox8);
var checkbox9 = ui.Checkbox('September', false);
checkbox9.onChange(function(checked) {Map.layers().get(8).setShown(checked);});
checkbox9.style().set('position', 'top-left');
panelMonths.add(checkbox9);
var checkbox10 = ui.Checkbox('October', false);
checkbox10.onChange(function(checked) {Map.layers().get(9).setShown(checked);});
checkbox10.style().set('position', 'top-left');
panelMonths.add(checkbox10);
var checkbox11 = ui.Checkbox('November', false);
checkbox11.onChange(function(checked) {Map.layers().get(10).setShown(checked);});
checkbox11.style().set('position', 'top-left');
panelMonths.add(checkbox11);
var checkbox12 = ui.Checkbox('December', false);
checkbox12.onChange(function(checked) {Map.layers().get(11).setShown(checked);});
checkbox12.style().set('position', 'top-left');
panelMonths.add(checkbox12);
// Layers added to the map
Map.addLayer(jan, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'January',true);
Map.addLayer(feb, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'February',false);
Map.addLayer(mar, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'March',false);
Map.addLayer(apr, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'April',false);
Map.addLayer(may, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'May',false);
Map.addLayer(jun, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'June',false);
Map.addLayer(jul, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'July',false);
Map.addLayer(aug, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'August',false);
Map.addLayer(sep, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'September',false);
Map.addLayer(oct, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'October',false);
Map.addLayer(nov, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'November',false);
Map.addLayer(dec, {min: 0, max: 1, palette:['Snow','DarkGreen']}, 'December',false);
Map.centerObject(AOI, 11);
// Map.addLayer(S2,{bands:['Red','Green','Blue'], min:0, max:3000},'Sentinel 2 RGB')
// Map.addLayer(S2),{},'Sentinel2 NDVI')