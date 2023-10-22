//-----------------------------------------------------------------------------------------------------------//
//                                              INITIALISATION
//----------------------------------------------------------------------------------------------------------//
var mapPanel = ui.Map();
ui.root.widgets().reset([mapPanel]);
mapPanel.setOptions('SATELLITE');
mapPanel.style().set('cursor', 'crosshair');
//-----------------------------------------------------------------------------------------------------------//
//                                              DATA PROCESSING
//----------------------------------------------------------------------------------------------------------//
var startYear = 1990;
var endYear = 2022;
var years = ee.List.sequence(startYear, endYear);
// Set the Area of Interest
var tun = ee.FeatureCollection("users/labiadhmoez/TUN_adm");
// Add the CHRIPS daily precipitation collection
var Daily = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                   .select('precipitation')
                   .filterBounds(tun);
// Create a function to calculate Annual Precipitation from Daily Precipitation      
function precAnnual (year) {
  var annual = Daily.filter(ee.Filter.calendarRange(year, year, 'year'))
                       .sum()
                       .rename('Annual Precipitation');
  return annual.set('year', ee.Date.fromYMD(year, 1, 1)
               .format('YYYY'));
}
// Apply the precAnnual to each year            
var annualPrecip = ee.ImageCollection.fromImages(years.map(precAnnual));
// Add MEAN, MIN, MAX bands to annualPrecip
function addBands (image){
  var annualMean = annualPrecip.mean()
                               .rename('Long Term Average');
  return image.addBands(annualMean);
}
// Apply the addBands function to the collection
var precCol = ee.ImageCollection(annualPrecip.map(addBands));
var annualMean_show = ee.Image("users/labiadhmoez/TUN_average_prec_1990_2000");
var pViz = {min: 0, max: 800, palette:'red,orange,yellow,aqua,blue,navy'};
mapPanel.centerObject(tun, 7);
mapPanel.addLayer(annualMean_show, pViz, 'Average Annual Precipitation');
//-----------------------------------------------------------------------------------------------------------//
//                                              APP
//----------------------------------------------------------------------------------------------------------//
// ******Define the Onlick Function (chart) ******//
mapPanel.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  loc.setValue('Clicked location: ');
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '#8A2BE2'}, 'clicked location');
  mapPanel.layers().set(1, dot);
  // Inspect
  var options = {
     title: 'Total Annual precipitation from ' + startYear + ' to ' + endYear,
     hAxis: {title: 'Year'},
     vAxis: {title: 'Precipitation (mm)'},
     curveType: 'function',
     series: {
               0: {color: '#2B4EB6', lineWidth: 2}, // Prec 
               1: {color: '#F79C24', lineWidth:1}, //LT-MEAN
  }};
     var chart = ui.Chart.image.series({
     imageCollection: precCol,
     region: point,
     reducer: ee.Reducer.mean(),
     scale: 5000,
     xProperty: 'year',
      }).setOptions(options)
        .setChartType('LineChart');
    panel.widgets().set(6, chart);
  });
// ******Create panel and Widgets******//
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'vertical',
      height: '65%',
      width: '600px',
      position: 'top-left'
    }
  });
// Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: panel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
// Add title
var title = ui.Label({value: 'Rainfall Time-Series Inspector', 
                      style: {fontWeight: 'bold',
                              textAlign: 'center',
                              fontSize: '30px',
                              margin: '30px 10px 40px 10px',
                              color : '#273358',
                              stretch: 'horizontal'}});
//LEGEND
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
//colorbar
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(pViz.palette),
  style: {stretch: 'horizontal', margin: '0px 20px', Height: '23px'}
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(pViz.min, {margin: '4px 8px'}),
    ui.Label(
        (pViz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(pViz.max + '+', {margin: '4px 20px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
//Legend title
var legendTitle = ui.Label({
  value: 'Average Annual Precipitation ' + startYear + '-' + endYear + ' (mm)',
  style: {fontSize: '14px', 
          textAlign: 'center',
          fontWeight: 'bold',
  }
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
// Add inspect and graph
var label = ui.Label({value: 'Click a point on the map to generate the chart.', 
                      style: {fontWeight: 'bold',
                              margin: '40px 10px 5px 10px'}});
var chart_desc = ui.Label({value:'The chart shows the annual total rainfall amounts of the last 33 years (1990 to 2022)' +
                                  ' as calculated from daily CHRIPS* rainfall data. Click on the maximize button ' +
                                  'to open the chart in a seperate window and save data as image or CSV.',
                           style: {fontSize: '13px', 
                                   textAlign: 'left', 
                                   stretch: 'horizontal'}});
var loc = ui.Label();
var lon = ui.Label();
var lat = ui.Label();
var latlong = ui.Panel([loc,lon, lat], ui.Panel.Layout.flow('horizontal'));
//source
var source = ui.Label({value:'*CHIRPS: Climate Hazards Group InfraRed Precipitation with Station data',
                      style: {fontSize: '9px', 
                              textAlign: 'left', 
                              margin: '10px 10px 20px 10px', 
                              stretch: 'horizontal'}});
// Add widgets to the Panel 
panel.widgets().set(0, title);
panel.widgets().set(1, legendPanel);
panel.widgets().set(2, label);
panel.widgets().set(3, chart_desc);
panel.widgets().set(4, source);
panel.widgets().set(5, latlong);   
//reserved for position 6 (chart)