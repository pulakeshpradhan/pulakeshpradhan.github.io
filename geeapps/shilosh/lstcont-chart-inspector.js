var CFSV2_TFA = ui.import && ui.import("CFSV2_TFA", "image", {
      "id": "users/shilosh/CFSv2_Daily_LST_TFA"
    }) || ee.Image("users/shilosh/CFSv2_Daily_LST_TFA"),
    MODIS_TFA = ui.import && ui.import("MODIS_TFA", "image", {
      "id": "users/shilosh/MODIS_Daily_LST_TFA"
    }) || ee.Image("users/shilosh/MODIS_Daily_LST_TFA"),
    LST_Cont = ui.import && ui.import("LST_Cont", "image", {
      "id": "users/shilosh/MODIS_Continuous_LST_Daily_2018"
    }) || ee.Image("users/shilosh/MODIS_Continuous_LST_Daily_2018");
var firstDay = '2018-01-01';
var lastDay  = '2019-01-01';
var Temperature_Band = 'LST_Daily_Mean';
var Day_Temperature_Band = 'LST_Day_1km';
var Night_Temperature_Band = 'LST_Night_1km';
var collection = 'MODIS/006/MYD11A1';
var geometry = ee.Geometry.Rectangle([33.2,29.0,36.6,34.0]);
var geometry_json = geometry.toGeoJSON(); 
// Zoom to a location.
Map.setCenter(34.80, 31.25, 9); // Center on Beer-Sheva
// Reverse the images into imageCollections
var MODIS_TFA_ic = ee.ImageCollection(MODIS_TFA.bandNames().map(function(name) { 
  return MODIS_TFA.select([ee.Algorithms.String(name)],['mod']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
var CFSV2_TFA_ic = ee.ImageCollection(CFSV2_TFA.bandNames().map(function(name) { 
  return CFSV2_TFA.select([ee.Algorithms.String(name)],['cfs']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
var Cont_LST = ee.ImageCollection(LST_Cont.bandNames().map(function(name) { 
  return LST_Cont.select([ee.Algorithms.String(name)],['contLst']).set('system:time_start', ee.Date(ee.Algorithms.String(name).replace('day_',''))) }))
print('Cont_LST = ', Cont_LST)
//convert Kelvin to Celsius
var MODIS_k2celsius = function(image) {
      return image.updateMask(image.select(Day_Temperature_Band))
                  .updateMask(image.select(Night_Temperature_Band))
                  .reduce( ee.Reducer.mean()).rename(Temperature_Band)
                  .multiply(ee.Image(0.02))
                  .subtract(ee.Image(273.15))   //convert Kelvin to Celsius
                  .set('system:time_start', image.get('system:time_start'));
};
var CFSV2_k2celsius = function(image) {
      return image.subtract(ee.Image(273.15))   
                  .set('system:time_start', image.get('system:time_start'));
};
// Add a property with doy to the colection.
function createDoyProperty(img) {
  var d = ee.Date(img.get('system:time_start'))
    .getRelative('day', 'year')
    .add(1);
  return img.set('system:DOY', d);
}
// var MODIS_Daily = ee.ImageCollection(ee.List.sequence(1, 365).map(function (doy){
//   return  ee.ImageCollection(collection)
//                         .select(Day_Temperature_Band, Night_Temperature_Band)
//                         .filter(ee.Filter.calendarRange(doy, doy, 'day_of_year'))
//                         .map(MODIS_k2celsius)
//                         .mean()
//                         .set('system:DOY',doy)
// }))
var MODIS_Daily = ee.ImageCollection(collection)
            .filterDate(firstDay, lastDay)
            .select('LST_Day_1km', 'LST_Night_1km')
            // .map(function (image){return image.reduce(ee.Reducer.mean())
              // .set('system:time_start', image.get('system:time_start'))})
            // .map(addTimeStampToMODIS)
            .map(MODIS_k2celsius)
            .map(createDoyProperty)
print('MODIS_Daily = ', MODIS_Daily)
var CFSV2_Daily = ee.ImageCollection(ee.List.sequence(1, 365).map(function (doy){
  return  ee.ImageCollection('NOAA/CFSV2/FOR6H')
                        .filterDate(firstDay, lastDay)
                        .select('Maximum_temperature_height_above_ground_6_Hour_Interval')
                        .filter(ee.Filter.calendarRange(doy, doy, 'day_of_year'))
                        .map(CFSV2_k2celsius)
                        .mean()
                        .set('system:DOY',doy)
}))
print('CFSV2_Daily = ', CFSV2_Daily)
// Use an equals filter to specify how the collections match.
var Filter = ee.Filter.equals({
  leftField: 'system:DOY',
  rightField: 'system:DOY'
});
  // Define the join.
  var innerJoin = ee.Join.inner('primary', 'secondary');
// Join CFSV2 with CFSV2_TFA_ic by DOY
  // Apply the join.
  var CFSV2_JoinInner = innerJoin.apply(CFSV2_Daily, CFSV2_TFA_ic, Filter);
// Calculate CFSv2 anomalies
CFSV2_Daily = CFSV2_JoinInner.map(function(f) {
  var CFSv2_TFA = ee.Image(f.get('secondary'));
  var CFSv2_Daily_mean = ee.Image(f.get('primary'));
  return CFSv2_Daily_mean.addBands(CFSv2_TFA.rename('CFSv2_TFA'));
})
// Join CFSV2 with MODIS_TFA_ic by DOY
  // Apply the join.
  var CFSV2_JoinInner = innerJoin.apply(CFSV2_Daily, MODIS_TFA_ic, Filter);
// Calculate CFSv2 anomalies
CFSV2_Daily = CFSV2_JoinInner.map(function(f) {
  var Modis_TFA = ee.Image(f.get('secondary'));
  var CFSv2 = ee.Image(f.get('primary'));
  return CFSv2.addBands(Modis_TFA.rename('MODIS_TFA'));
})
// Join all with MODIS_Daily by DOY
  // Apply the join.
  var CFSV2_JoinInner = innerJoin.apply(CFSV2_Daily, MODIS_Daily, Filter);
// Calculate CFSv2 anomalies
CFSV2_Daily = CFSV2_JoinInner.map(function(f) {
  var Modis_daily_mean = ee.Image(f.get('secondary'));
  var CFSv2 = ee.Image(f.get('primary'));
  return CFSv2.addBands(Modis_daily_mean.rename('MODIS_Daily'));
})
var timeFromDOY_LST = function(image) {
      var days = ee.Number(image.get('system:DOY'))
      // var d = ee.Date('2010-01-01')
      var d = ee.Date(firstDay)
      return image
                  .set('system:time_start', d.advance(days.subtract(1), 'day'));
};
CFSV2_Daily = CFSV2_Daily.map(timeFromDOY_LST)
print('CFSV2_Daily = ', CFSV2_Daily)
// Use an equals filter to specify how the collections match.
var Filter = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
// Join all with Cont_LST by system:time_start
  // Apply the join.
  var CFSV2_JoinInner = innerJoin.apply(CFSV2_Daily, Cont_LST, Filter);
// Calculate CFSv2 anomalies
CFSV2_Daily = CFSV2_JoinInner.map(function(f) {
  var cont_lst = ee.Image(f.get('secondary'));
  var CFSv2 = ee.Image(f.get('primary'));
  return CFSv2.addBands(cont_lst);
})
print('CFSV2_Daily = ', CFSV2_Daily)
var scale = ee.Image('MODIS/006/MYD11A1/2018_01_01').projection().nominalScale().getInfo();
// Map.addLayer(ee.Image(MaskedValues.first()).select('con'))
// Map.addLayer(rmse_val)
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'LSTcont Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect 2018 data.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an LST TFA chart.
  // var series = ui.Chart.image.doySeriesByYear(
  //   LST, Temperature_Band, geometry, ee.Reducer.mean(), 500);
  var series = ui.Chart.image.series(
    CFSV2_Daily, point, ee.Reducer.mean(), 500);
  series.setOptions({
    title: 'LST & ContinuousLST',
    vAxis: {title: 'Celsius'},
    hAxis: {title: 'Day of year', gridlines: {count: 7}},
  });
  panel.widgets().set(2, series);
});
//   // Create an RGB spectrum chart.
//   var rgbChart = ui.Chart.image.series(rgb, point)
//       .setOptions({
//         title: 'RGB Reflectance Over Time',
//         vAxis: {title: 'band value'},
//         hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
//       });
//   panel.widgets().set(3, rgbChart);
// });
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);