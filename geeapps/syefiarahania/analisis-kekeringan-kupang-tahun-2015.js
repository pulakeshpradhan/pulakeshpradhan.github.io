var chirps = ui.import && ui.import("chirps", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    kupang = ui.import && ui.import("kupang", "table", {
      "id": "users/syefiarahania/SHP_Kab_Kupang"
    }) || ee.FeatureCollection("users/syefiarahania/SHP_Kab_Kupang");
var filtered = chirps
  .filter(ee.Filter.date('2015-01-01', '2015-12-01'))
var total = filtered.sum()
var palette = ['white', 'blue']
var visParams = {
  min:0,
  max: 2000,
  palette: palette
}
Map.addLayer(total.clip(kupang), visParams, 'Total Precipitation')
// Calculate average rainfall in Kupang
var stats = total.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: kupang,
  scale: 5000,
  })
print(stats)
// Calculate Long Term Rainfall Average 
// CHIRPS data comes as Pentad
// We can compute monthly long term averages
// Long Period Average (LPA) should by 30 years or more
// List of 30 years
var lpaYears = ee.List.sequence(1984, 2014);
var months = ee.List.sequence(1, 12);
print(lpaYears);
//var julyImages = chirps.filter(ee.Filter.calendarRange(7, 7, 'month'));
//print(julyImages);
// Map over the years and create a monthly totals collection
var monthlyImages = lpaYears.map(function(year) {
  return months.map(function(month) {
    var filtered = chirps.filter(ee.Filter.calendarRange(year, year, 'year'))
    .filter(ee.Filter.calendarRange(month, month, 'month'));
    var monthlyTotal = filtered.sum();
    return monthlyTotal.set({'month': month, 'year': year});
  });
}).flatten();
print(monthlyImages);
// We now have 1 image per month for entire long-period duratioon
var monthlyCol = ee.ImageCollection.fromImages(monthlyImages);
var monthlyRainfall = months.map(function(month) {
  var filtered = monthlyCol.filter(ee.Filter.eq('month', month));
  var monthlyMean = filtered.mean();
  return monthlyMean.set('month', month);
});
print(monthlyRainfall);
var chart = ui.Chart.image.series({
  imageCollection: monthlyRainfall,
  region: kupang,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'month'
});
print(chart);
var palette = ['white', 'blue'];
var visParams = {
  min:0,
  max: 4500,
  palette: palette
};
Map.centerObject(kupang, 7);
//var nestedList = ee.List([['a', 'b'], ['c', 'd'], ['e', 'f']])
//var flattened = nestedList.flatten()
//print (flattened)
// We can compute average for each month across all years
// i.e. Average July precipitation for all July months in the collection
var longTermMeans = months.map(function(month) {
    var filtered = monthlyCol.filter(ee.Filter.eq('month', month))
    var monthlyMean = filtered.mean()
    return monthlyMean.set('month', month)
})
var monthlyRainfall = ee.ImageCollection.fromImages(longTermMeans)
// Now we take 2015 data and compute monthly average
var filtered = chirps
  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
  .filter(ee.Filter.bounds(kupang))
// Calculate monthly average rainfall
var monthlyTotals = months
  .map(function(month) {
    return filtered
      .filter(ee.Filter.calendarRange(month, month, 'month'))
        .sum()
        .set('month', month);
});
var observedRainfall = ee.ImageCollection.fromImages(monthlyTotals)
print(observedRainfall)
var palette = ['white', 'blue']
var visParams = {
  min:0,
  max: 2500,
  palette: palette
}
Map.addLayer(monthlyRainfall.sum().clip(kupang), visParams, 'Long Term')
Map.addLayer(observedRainfall.sum().clip(kupang), visParams , 'Current')
// Calculate deviation in %
var deviation = months.map(function(month) {
  var longTermMean = monthlyRainfall
    .filter(ee.Filter.eq('month', month)).first()
  var monthlyObserved = observedRainfall
    .filter(ee.Filter.eq('month', month)).first()
  var deviation = (monthlyObserved.subtract(longTermMean)
    .divide(longTermMean)).multiply(100)
    .set('month', month)
  return deviation
})
var chart = ui.Chart.image.series({
  imageCollection: deviation, 
  region: kupang, 
  reducer: ee.Reducer.mean(), 
  scale: 10000,
  xProperty: 'month'
}).setOptions({
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 3,
      title: 'Rainfall Deviation from Long-term Mean',
      vAxis: {title: 'Deviation %'},
      hAxis: {title: 'Month', gridlines: {count: 12}}
});
print(chart);
// Seasonal Deviation
var startMonth = 7
var endEnd = 10
var combinedFilter = ee.Filter.and(
  ee.Filter.gte('month', 7), ee.Filter.lte('month', 10))
var rainfallNormal = monthlyRainfall.filter(combinedFilter).sum()
var rainfallObserved = observedRainfall.filter(combinedFilter).sum()
var seasonalDeviation = (rainfallObserved.subtract(rainfallNormal)
    .divide(rainfallNormal)).multiply(100)
var visParamsSD = {
  min:-77,
  max:25,
  palette: ['d7191c','fdae61','ffffbf','abdda4','2b83ba']
}
Map.addLayer(seasonalDeviation.clip(kupang), visParamsSD, 'Deviation')
// Export to Asset.
Export.image.toAsset({
  image: seasonalDeviation,
  description: 'Seasonal_Deviation_2015',
  assetId: 'users/syefiarahania',
  region: kupang.geometry(),
  scale: 5000})
// Export a cloud-optimized GeoTIFF.
Export.image.toDrive({
  image: seasonalDeviation,
  description: 'Seasonal_Deviation2015',
  scale: 5000,
  region: kupang,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
//Visualize Map
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '700px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Analisis Kekeringan di Kabupaten Kupang Tahun 2015',
    style: {fontSize: '25px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Kelompok 6',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label('Adira Shifana Putri (1906307315)'),
  ui.Label('Syefiara Hania Yumnaristya (1906288820)'),
  ui.Label('Zafira Chairunnisa (1906288833)')
]);
panel.add(intro);
// Create the color bar for the legend.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '200x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visParamsSD.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label('-77', {margin: '2px 4px'}),
    ui.Label(
        // (viz.max / 2),
        '12,5',
        {margin: '2px 4px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('25', {margin: '2px 4px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Seasonal Deviation (%)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.add(legendPanel)
// Create a Rainfall Deviation chart.
var chart = ui.Chart.image.series({
  imageCollection: deviation, 
  region: kupang, 
  reducer: ee.Reducer.mean(), 
  scale: 10000,
  xProperty: 'month'
}).setOptions({
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 2,
      title: 'Rainfall Deviation from Long-term Mean',
      vAxis: {title: 'Deviation %'},
      hAxis: {title: 'Month', gridlines: {count: 12}}
});
panel.widgets().set(2, chart);
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var text1 = ui.Label('Script dasar dibuat oleh:', subTextVis)
var text2 = ui.Label('Ujaval Gandhi (Channel Youtube : Spatial Thoughts)', subTextVis)
var text3 = ui.Label('https://youtube.com/c/SpatialThoughts', subTextVis)
panel.add(text1)
panel.add(text2)
panel.add(text3)
// Create a Monthly Rainfall chart.
//var chart2 = ui.Chart.image.series({
  //imageCollection: monthlyRainfall,
  //region: kupang,
  //reducer: ee.Reducer.mean(),
  //scale: 500,
  //xProperty: 'month'
//});
//panel.widgets().set(1, chart2);
// Add the panel to the ui.root.
ui.root.insert(0, panel);