var roi = ui.import && ui.import("roi", "table", {
      "id": "users/andreatassi23/MajellaPark"
    }) || ee.FeatureCollection("users/andreatassi23/MajellaPark");
Map.centerObject(roi,10);
//Function to mask the clouds in Sentinel-2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image,['system:time_start']);
}
//Function to add or subtract day from the period of interest
function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}
//Select the date of today
var today = ee.Date(new Date()).format('YYYY-MM-dd')
//print(today,"today")
//Select the date back 15 days from today
var days_before = ee.Date(addDays(new Date(), -20)).format('YYYY-MM-dd');
//print(days_before,"shortperiod")
//Select the date back one year
var year_before =  ee.Date(addDays(new Date(), -365)).format('YYYY-MM-dd');
//print(year_before,"yearsperido")
//Define the whole period of interest (from "years_before" to "today"). This will be used for the NDVI median of 1 year 
var whole_period_of_interest = ee.Filter.date(year_before,today);
//print(whole_period_of_interest)
//Define the period of interest for NDVI max (from "days_before" to "today"). This will be used for the NDVI max of the last 15 days
var short_period = ee.Filter.date(days_before,today);
//print(short_period)
//-------Define and visualize the NDVI max of the last 15 days
var small_dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filter(short_period)
                  .filterBounds(roi)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',15))
                  .map(maskS2clouds);
print("Sentinel 2 for NDVI max visualization",small_dataset)
//Add NDVI 
var addNDVI = function(image) {var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
  return image.addBands(ndvi);
};
var inBands=["B4","B8"]
var collection = small_dataset.select(inBands).map(addNDVI)
var ndvi = collection.select('NDVI')
//Select a bands for the median visualization
var maxNDVI = collection.select('NDVI').max().clip(roi)
Map.addLayer(maxNDVI,{min:0, max: 1, palette: [
      '#640000','#ff0000','#ffff00','#00c800','	#006400'
  ], }, 'NDVI max of the last 20 days');
//-----------Define the whole NDVI median for 1 year
//Download the Sentinel 2 images, filtered by date respect the roi 
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filter(whole_period_of_interest)
                  .filterBounds(roi)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',15))
                  .map(maskS2clouds);
print("Sentinel 2 Image Collection",dataset)
//Add NDVI 
var addNDVI = function(image) {var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
  return image.addBands(ndvi);
};
var inBands=["B4","B8"]
var collection = dataset.select(inBands).map(addNDVI)
var ndvi = collection.select('NDVI')
//Select a bands for the median visualization
var medianNDVI = collection.select('NDVI').median().clip(roi)
Map.addLayer(medianNDVI,{min:0, max: 1, palette: [
  '#640000','#ff0000','#ffff00','#00c800','	#006400'
  ], }, 'NDVI median of the last year', false);
//--------Generate an user interface 
// Panel
var panel = ui.Panel();
panel.style().set('width', '430px');
// Definition of the panel
var intro = ui.Panel([
  ui.Label({
    value: 'MAJELLA PARK',
    style: {fontSize: '60px', textAlign: 'center', color: 'red', fontFamily: 'serif',  fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'NDVI Time series analisys',
    style: {fontSize: '35px', textAlign: 'left', color: 'red', fontFamily: 'serif',  fontWeight: 'bold'}
  }),
  ui.Label({value: '*Click to generate the graph', 
  style: {fontSize: '18px', textAlign: 'left', fontFamily: 'monospace', fontWeight: 'bold'}})
]);
panel.add(intro);
// Insert latitude and longitude
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
 Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat).buffer(100);
  Map.addLayer(point)
  // Generation of NDVI graph
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(),10,'system:time_start');
  ndviChart.setOptions({
      interpolateNulls: true,
      //lineWidth: 1,
      pointSize: 2,
    title: 'NDVI',
    vAxis: {title: 'NDVI', maxValue: 1,minValue:-1, scaleType : 'linear'},
    hAxis: {title: 'Date', format: 'YYYY-MMM', gridlines: {count: 12}},
    visibleInLegend: true});
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, panel);
//Palette for the classification
var palette = ['640000', 'ff0000','ffff00','00c800','006400'];  
// name of the legend
var names = ['Bare','Low','Moderate','Moderate to High','High'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend of the NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);