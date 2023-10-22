var Beira = ee.Geometry.Point(34.8, -19.7);
Map.centerObject(Beira, 6);
var now = ee.Date(Date.now());
var today = ee.Date.fromYMD(now.get('year'), now.get('month'), now.get('day'));
var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_V06")
                .select(['precipitationCal'])
                .filterBounds(Beira)
                .filterDate(today.advance(-7, 'day'),today.advance(1, 'day'));
var GPM_latest_image = GPM.limit(1, 'system:time_start', false).first();
// Define colour palette and visualization parameters
var palette =
      ['000096','0064ff','00b4ff','33db80','9beb4a',
      'ffeb00','ffb300','ff6400','eb1e00','af0000'];
var prec_vis = {min: 0.0, max: 10.0, palette: palette};
var opacity = 0.8;
// Add image to the map
Map.addLayer(GPM_latest_image, prec_vis, 'GPM precipitation', 1, opacity);
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click on a point on the map')]);
Map.add(inspector);
// Create a panel to hold the chart.
var panel = ui.Panel();
      panel.style().set({
      width: '400px',
      position: 'bottom-right'
});
Map.add(panel);
Map.onClick(function(coords) {
    // Show the loading label
    inspector.widgets().set(0,
      ui.Label({
        value: 'Loading...',
        style: {color: 'gray'}
      }));
    panel.clear();
    var click_point = ee.Geometry.Point(coords.lon, coords.lat);
    var options = {
          title: 'Global Precipitation Measurements \n at selected location',
          hAxis: {title: 'Date'},
          vAxis: {title: 'Precipitation (mm/hr)'},
          lineWidth: 1,
    };
    var timeseriesGPM = ui.Chart.image.seriesByRegion({
          imageCollection: GPM,
          regions: click_point,
          reducer: ee.Reducer.mean(),
          seriesProperty: "GPM"})
          .setOptions(options);
    panel.add(timeseriesGPM);
    inspector.widgets().set(0,
        ui.Label({
            value: 'Click on another location on the map to see a different graph.',
        }));
});