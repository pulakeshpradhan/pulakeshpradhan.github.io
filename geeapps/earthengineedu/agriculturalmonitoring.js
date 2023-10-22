var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '450px',
  position: 'top-left'
});
// Load country features from Large Scale International Boundary (LSIB) dataset.
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Subset the United States feature from countries.
var USA = countries.filter(ee.Filter.eq('country_na', 'United States'));
var cultivatedAreaData = ee.ImageCollection('USDA/NASS/CDL')
                          .filter(ee.Filter.date('2013-01-01', '2019-12-31'));
// Calculate cultivated area in sq km           
var calcCultivatedArea = function(image) {
   var cultivated = image.select('cultivated').eq(2);
   var cultivatedArea = cultivated.multiply(ee.Image.pixelArea());
   var areaStats = cultivatedArea.reduceRegion({
     geometry: USA,
     reducer: ee.Reducer.sum(),
     scale: 1000,
     bestEffort: true,
     maxPixels: 1e13
   });
   var totalCultivatedArea = ee.Number(areaStats.get('cultivated')).divide(1e6);
   return(image.set('DATE', image.date())
               .set('TOTAL_CULTIVATED_AREA',totalCultivatedArea));
};
var cultivatedArea = cultivatedAreaData.map(calcCultivatedArea);
// Extract the years and format as YYYY
var cultivatedAreaYears = cultivatedArea.aggregate_array('DATE');
var formatDate = function (x) {
 return ee.Date(x).format("YYYY");
};
var cultivatedAreaYearsFormatted = cultivatedAreaYears.map(formatDate);
// Extract the total cultivated area
var cultivatedAreaSqKm = ee.Array(cultivatedArea.aggregate_array('TOTAL_CULTIVATED_AREA'));
// Plot the total cultivated area by year as a bar chart
var chart = ui.Chart.array.values({
 array: cultivatedAreaSqKm,
 axis: 0,
 xLabels: cultivatedAreaYearsFormatted
}).setChartType('ColumnChart')
 .setOptions({
   title: 'Cultivated Land Area in the USA',
   hAxis: {title: 'Year', format: '####'},
   vAxis: {title: 'Area (square km)'},
   legend: { position: "none" },
   lineWidth: 1,
   pointSize: 3
 });
panel.add(chart);
///////////////////////////////////////////////////////////////////////////
// Calculate cultivated area for corn and soybean
// Load country features from Large Scale International Boundary (LSIB) dataset.
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Subset the US feature from countries.
var USA = countries.filter(ee.Filter.eq('country_na', 'United States'));
var dataset = ee.ImageCollection('USDA/NASS/CDL')
            .filter(ee.Filter.date('2010-01-01', '2019-12-31'));
// Function to calculate cultivated area for a given crop
var calculateLandArea = function(cropCode) {
 return function(image) {
   var crop = image.select('cropland').eq(cropCode);
   var cropArea = crop.multiply(ee.Image.pixelArea());
   // Calculate total area in sq km for the crop
   var areaStats = cropArea.reduceRegion({
     geometry: USA,
     reducer: ee.Reducer.sum(),
     scale: 1000,
     bestEffort: true,
     maxPixels: 1e13
   });
   var totalCropArea = ee.Number(areaStats.get('cropland')).divide(1e6);
   return(image.set('DATE', image.date())
               .set('TOTAL_CROP_AREA',totalCropArea));
 };
};
// Corn
var calculateLandAreaCorn = calculateLandArea(1);
var cornYearlyAreaStats = dataset.map(calculateLandAreaCorn);
var cornDatesList = cornYearlyAreaStats.aggregate_array('DATE');
var cornTotalAreaList = cornYearlyAreaStats.aggregate_array('TOTAL_CROP_AREA');
// Soybeans
var calculateLandAreaSoybeans = calculateLandArea(5);
var soyYearlyAreaStats = dataset.map(calculateLandAreaSoybeans);
var soyDatesList = soyYearlyAreaStats.aggregate_array('DATE');
var soyTotalAreaList = soyYearlyAreaStats.aggregate_array('TOTAL_CROP_AREA');
var l1 = ee.List([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
var y_axis = ee.Array.cat([soyTotalAreaList, cornTotalAreaList], 1);
var x_axis = ee.Array(l1);
var chart2 = ui.Chart.array.values(y_axis, 0, x_axis)
    .setSeriesNames(['Soybean', 'Corn'])
    .setOptions({
      title: 'Soybean vs. Corn Field Area ',
      hAxis: {title: 'Year', format: '####'},
      vAxis: {'title': 'Area (Square km)'},
      pointSize: 3,
});
panel.add(chart2);
/****************
 * START OF USER INTERFACE
 *////////////////
// LABELS
var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '450px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Cropland Mapping App',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'Use this app to map and plot changes in the area used to cultivate crops and forest areas over the past decade.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var landAreaText = ui.Label({
  value: 'The following charts show the time series of area used to grow plants, such as corn and soybeans, and the amount of cultivated land in use in the US. Maps were acquired from the USDA National Agricultural Statistics Service Cropland Dataset.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  }
})
// LAYER CHECKBOXES
var cultivationIndex = 1;
var croplandIndex = 0;
var dataset2 = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2018-01-01', '2019-12-31'))
                  .first();
var cultivationCover = dataset2.select('cultivated');
var checkbox = ui.Checkbox('Show Cropland layer', true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(cultivationIndex).setShown(checked);
});
  Map.addLayer(cultivationCover, {}, 'Cultivated Landcover');
var dataset3 = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
                  .first();
var croplandCover = dataset3.select('cropland');
var checkbox2 = ui.Checkbox('Show Cultivation layer', false);
checkbox2.onChange(function(checked)  {
    Map.layers().get(croplandIndex).setShown(checked);
});
  Map.addLayer(croplandCover, {}, 'Crop Landcover');
ui.root.add(panel);
panel.add(title);
panel.add(text);
panel.add(checkbox);
panel.add(checkbox2);
panel.add(landAreaText);
panel.add(chart);
panel.add(chart2);