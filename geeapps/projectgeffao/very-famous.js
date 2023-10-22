var toCenter = ui.import && ui.import("toCenter", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -61.032321643289194,
            10.900338764103413
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-61.032321643289194, 10.900338764103413]);
// Time Series 1
// MODIS NDVI Annual integral and charts
//Capacity Building in Trinidad and Tobago 
//Material prepared by cesarnon@gmail.com and ingridteich@gmail.com
//Free to use, touch, break, adapt, etc.
// Load the feature with the region of interest
var globe = ee.Geometry.Polygon([-180, 88, 0, 88, 180, 88, 180, -88, 0, -88, -180, -88], null, false);
var roi = globe
Map.centerObject(toCenter,9)
var yrStart = 2001;
var yrEnd = 2018;
//make a list for calendar year computation / year 2000 is not complete so I added a +1
var years = ee.List.sequence(yrStart, yrEnd);
print(years, 'years for calendar analysis');
//Load NDVI collection
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
//.filterDate('2001-01-01', '2023-12-31');
print(modis, 'collection to process');
// Make a funtion to have NDVI average by year
var byYear = ee.ImageCollection.fromImages(
      years.map(function (y) {
        //get the subset for the target year
        var modisYear = modis.filter(ee.Filter.calendarRange(y, y, 'year'));
        //get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean()
              .set('year', y)
 //              .set('system:index', ee.String(y))
              .set('system:time_start',ee.Date.fromYMD(y,01,01).millis())
return modisYearMean.clip(roi)
}));
Map.addLayer(byYear.select('NDVI'),{},'YearCollection',false)
Map.addLayer(modis.select('NDVI'),{},'modis',false)
print(byYear,'Colection of Year mean');
///       Section 2 Charts and on-Clik Function
/*
var lon = ui.Label();
var lat = ui.Label(); 
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat); 
// Create an NDVI annual year chart.
  var calChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS Annual mean NDVI calendar year',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 7}},
  });
print (calChart);
// Create an NDVI  16day chart.
var monChart = ui.Chart.image.series(modis.select('NDVI'), point, ee.Reducer.mean(), 250);
  monChart.setOptions({
    title: 'MODIS 16 days NDVI',
    vAxis: {title: 'Index * 10000'},
    hAxis: {title: 'Calendar_Year', format: 'yyyy', gridlines: {count: 7}},
  });
print (monChart);
})
*/
///       Section 3 Put the charts in a panel on the map
//-----------------------------------------------
/*
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
panel.style().set('position', 'bottom-right');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Charts in the panel',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat); 
// Create an NDVI annual year chart.
  var calChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS Annual mean NDVI calendar year',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(2, calChart);
})
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
Map.add(panel)
*/
//----------------------------------------------
///       Section 4 Put the charts in a fix panel
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat); 
// Create an NDVI annual year chart.
  var calChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS Annual mean NDVI calendar year',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(2, calChart);
// Create an NDVI  16day chart.
var monChart = ui.Chart.image.series(modis.select('NDVI'), point, ee.Reducer.mean(), 250);
  monChart.setOptions({
    title: 'MODIS 16 days NDVI',
    vAxis: {title: 'Index * 10000'},
    hAxis: {title: 'Calendar_Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(3, monChart);
})
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//Map.add(panel)
///--------------------------------------------------------------------------
///       Section 5 making a image stack
/*
// Prepare the a image stack for other uses
var bandName= years.map(function (number) { return ee.String('ndvi_').cat(ee.String(ee.Number(number).toInt())); })
print(bandName, 'bandName')
//var imgYearCal = byYearCal.toBands().divide(10000).rename(bandName)
var imgYearCal = byYear.toBands().rename(bandName).toInt16()
print(imgYearCal,'Image of calendar year means');
Map.addLayer(imgYearCal)
*/
//-------------
///       Section 6 Exporting the image stack to get the time series out
/*
// Export to Asset
Export.image.toAsset({
  image: imgYearCal,
  description: 'AnnualNDVI_TTO_250m',
  assetId:'TTO_training/AnnualNDVI_TTO_250m',
  scale: 250,
  region: geometry,
//  region: roi, // this is for the whole oblast
  maxPixels: 1e13
});
//Export to Drive
Export.image.toDrive({
  image: imgYearCal,
  description: 'AnnualNDVI_TTO_250m',
  scale: 250,
  region: geometry,
//  region: roi, // this is for the whole oblast
  folder: 'TTO_GEE_Training',
  maxPixels: 1e13
});
*/
//-------------
///       Section 7 Exporting the tabular data out
/*
// Getting out spatial stats for regions of interest
var ftc1 = ee.FeatureCollection("users/projectgeffao/TTO_training/TrinidadAndTobago")
// get the hectares for all the columns in each province
var  stats = imgYearCal.reduceRegions({
             reducer: ee.Reducer.mean(),
             scale: 250,
             collection: ftc1,
              })
//print (stats)            
print (stats.select(['.*'],null,false))            
 Export.table.toDrive({
		collection:stats.select(['.*'],null,false),
	description:'Stats_By_Regions',
	folder:'TTO_GEE_Training',
	fileFormat:'CSV',
})
*/