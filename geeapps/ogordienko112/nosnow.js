var startDoy = 1;
var startYear = 2000;
var endYear = 2021;
var startDate;
var startYear;
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]},{
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  }];
Map.setOptions("satellite");
//Map.setOptions('baseChange', {'baseChange': baseChange});
function addDateBands(img) {
  // Get image date.
  var date = img.date();
  // Get calendar day-of-year.
  var calDoy = date.getRelative('day', 'year');
  // Get relative day-of-year; enumerate from user-defined startDoy.
  var relDoy = date.difference(startDate, 'day');
  // Get the date as milliseconds from Unix epoch.
  var millis = date.millis();
  // Add all of the above date info as bands to the snow fraction image.
  var dateBands = ee.Image.constant([calDoy, relDoy, millis, startYear])
    .rename(['calDoy', 'relDoy', 'millis', 'year']);
  // Cast bands to correct data type before returning the image.
  return img.addBands(dateBands)
    .cast({'calDoy': 'int', 'relDoy': 'int', 'millis': 'long','year': 'int'})
    .set('millis', millis);
}
var waterMask = ee.Image('MODIS/MOD44W/MOD44W_005_2000_02_24')
  .select('water_mask')
  .not();
  var completeCol = ee.ImageCollection('MODIS/006/MOD10A1')
  .select('NDSI_Snow_Cover');
  // Pixels must have been 10% snow covered 
var snowCoverEphem = completeCol.filterDate('2021-01-01', '2021-05-01')
  .map(function(img) {
    return img.gte(10);
  })
  .sum()
  .gte(14);
// Pixels must not be 10% snow covered more than 124 days in 2021.
var snowCoverConst = completeCol.filterDate('2020-01-01', '2021-01-01')
  .map(function(img) {
    return img.gte(10);
  })
  .sum()
  .lte(124);
  var analysisMask = waterMask.multiply(snowCoverEphem).multiply(snowCoverConst);
  var years = ee.List.sequence(startYear, endYear);
  var annualList = years.map(function(year) {
  // Set the global startYear variable as the year being worked on so that
  // it will be accessible to the addDateBands mapped to the collection below.
  startYear = year;
  // Get the first day-of-year for this year as an ee.Date object.
  var firstDoy = ee.Date.fromYMD(year, 1, 1);
  // Advance from the firstDoy to the user-defined startDay; subtract 1 since
  // firstDoy is already 1. Set the result as the global startDate variable so
  // that it is accessible to the addDateBands mapped to the collection below.
  startDate = firstDoy.advance(startDoy-1, 'day');
  // Get endDate for this year by advancing 1 year from startDate.
  // Need to advance an extra day because end date of filterDate() function
  // is exclusive.
  var endDate = startDate.advance(1, 'year').advance(1, 'day');
  // Filter the complete collection by the start and end dates just defined.
  var yearCol = completeCol.filterDate(startDate, endDate);
  // Construct an image where pixels represent the first day within the date
  // range that the lowest snow fraction is observed.
  var noSnowImg = yearCol
    // Add date bands to all images in this particular collection.
    .map(addDateBands)
    // Sort the images by ascending time to identify the first day without
    // snow. Alternatively, you can use .sort('millis', false) to
    // reverse sort (find first day of snow in the fall).
    .sort('millis')
    // Make a mosaic composed of pixels from images that represent the
    // observation with the minimum percent snow cover (defined by the
    // NDSI_Snow_Cover band); include all associated bands for the selected
    // image.
    .reduce(ee.Reducer.min(5))
    // Rename the bands - band names were altered by previous operation.
    .rename(['snowCover', 'calDoy', 'relDoy', 'millis', 'year'])
    // Apply the mask.
    .updateMask(analysisMask)
    // Set the year as a property for filtering by later.
    .set('year', year);
  // Mask by minimum snow fraction - only include pixels that reach 0
  // percent cover. Return the resulting image.
  return noSnowImg.updateMask(noSnowImg.select('snowCover').eq(0));
});
var annualCol = ee.ImageCollection.fromImages(annualList);
// Define a year to visualize.
var thisYear = 2021;
// Define visualization arguments.
var visArgs = {
  bands: ['calDoy'],
  min: 350,
  max: 600,
  palette: [
     'red']};
// Subset the year of interest.
var firstDayNoSnowYear = annualCol.filter(ee.Filter.eq('year', thisYear)).first();
// Map it.
Map.setCenter(30.553019967797532,50.45268904170014, 5);
Map.addLayer(firstDayNoSnowYear, visArgs, 'First day of no snow, 2021');
// Define the years to difference.
var firstYear = 2011;
var secondYear = 2021;
// Calculate difference image.
var firstImg = annualCol.filter(ee.Filter.eq('year', firstYear))
  .first().select('calDoy');
var secondImg = annualCol.filter(ee.Filter.eq('year', secondYear))
  .first().select('calDoy');
var dif = secondImg.subtract(firstImg);
// Define visualization arguments.
var visArgs = {
  min: -15,
  max: 15,
  palette: ['b2182b', 'ef8a62', 'fddbc7', 'f7f7f7', 'd1e5f0', '67a9cf', '2166ac']};
// Map it.
Map.setCenter(30.553019967797532,50.45268904170014, 5);
Map.addLayer(dif, visArgs, '2011-2021 first day no snow dif');
// Calculate slope image.
var slope = annualCol.sort('year').select(['year', 'calDoy'])
  .reduce(ee.Reducer.linearFit()).select('scale');
// Define visualization arguments.
var visArgs = {
  min: -1,
  max: 1,
  palette: ['b2182b', 'ef8a62', 'fddbc7', 'f7f7f7',
            'd1e5f0', '67a9cf', '2166ac']};
// Map it.
Map.setCenter(30.553019967797532,50.45268904170014, 5);
Map.addLayer(slope, visArgs, '2011-2021 first day no snow slope');
// Define an AOI.
var countries  = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var country = countries.filter(ee.Filter.eq('country_na', 'Ukraine'));
var aoi = country;
var styleParams = {
  fillColor: 'FF000000',
  color: '999999',
  width: 1.0,
};
var countries1 = country.style(styleParams);
Map.addLayer(countries1,  {}, 'Area of interest');
// Calculate annual mean DOY of AOI.
var annualAoiMean = annualCol.select('calDoy').map(function(img) {
  var summary = img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: aoi,
    scale: 1e3,
    bestEffort: true,
    maxPixels: 1e14,
    tileScale: 4,
  });
  return ee.Feature(null, summary).set('year', img.get('year'));
});
// Print chart to console.
var chart = ui.Chart.feature.byFeature(annualAoiMean, 'year', 'calDoy')
  .setOptions({
    title: 'Середній регіональний перший день року без снігового покриву для України',
    legend: {position: 'none'},
    hAxis: {
      title: 'Рік',
      format: '####'
    },
    vAxis: {title: 'День року'}});
//print(chart);
var panel = ui.Panel();
panel.style().set('width', '300px');
var intro = ui.Panel([
  ui.Label({
    value: 'Середній регіональний перший день року без снігового покриву для України',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
panel.add(intro);
//ui.root.insert(0, chart);