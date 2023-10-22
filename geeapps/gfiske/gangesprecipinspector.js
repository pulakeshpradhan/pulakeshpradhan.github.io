var GangesBrah = ee.FeatureCollection("users/gfiske/GlobalRivers/GangesBrah");
//GlobalRivers/precip_in_GangesBrahmaputra
//March 2019
//The purpose of this script is to investigate the precip trends within the
//Ganges and Brahmaputra watersheds for Bernhard and Valier
// Add in the CHIRPS precip data and aggregate by year
var year1 = 2008;
var year2 = 2018;
var years = ee.List.sequence(year1, year2);
var precip = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
            .filterDate(year1 + '-01-01',year2 + '-12-31')
            .map(function(img){
              var d = ee.Date(ee.Number(img.get('system:time_start')));
              var y = ee.Number(d.get('year'));
              return img.set({'year':y});
            });
var byYearPrecip = ee.ImageCollection.fromImages(
      years.map(function(y){
            return precip.filterMetadata('year', 'equals', y)
                        .select('precipitation')
                        .sum().round() //take the sum of all the images per year
                        .set('year', y)
                        .set('date', ee.Date.fromYMD(y,1,1).millis());
      })
    );
var meanPrecip = precip.mean();
// Now aggregate by month
var months = ee.List.sequence(1, 12);
var byYearMonth = ee.ImageCollection.fromImages(
      years.map(function(y){
        return months.map(function(m) {
            return precip.filterMetadata('year', 'equals', y)
                        .filterMetadata('month', 'equals', m)
                        .mean() //take the mean of the two images per month
                        .set('year', y)
                        .set('month', m)
                        .set('date', ee.Date.fromYMD(y,m,1).millis());
        });
      }).flatten()
    );
var byYearMonthCount = byYearMonth.size();
//print('byYearMonthCount modis collection count: ', byYearMonthCount);
// Setup my map
Map.setCenter(86.5, 23.7, 5);
var precpalette = ["edf8b1","7fcdbb","2c7fb8"];
Map.addLayer(meanPrecip.clip(GangesBrah), {min:0.5,max:70, palette:precpalette}, "mean precip", true);
var GRAY = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
Map.setOptions('Gray', {'Gray': GRAY});
// Create a side panel with charts
var intro = ui.Panel([
  ui.Label({
    value: 'CHIRPS precip trends in Ganges-Brahmaputra Watersheds',
    style: {fontSize: '20px', fontWeight: 'bold', width: '600px'}
  }),
  ui.Label('Click a precip pixel on the map to chart data for that location'),
  ui.Label('Map shows mean precip 2008-2018')
]);
var lon = ui.Label();
var lat = ui.Label();
//var gain = ui.Label();
//var loss = ui.Label();
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px 16px',
      margin: '0 4px 4px 4px'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '5px 0 0 5px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add the widgets to a new map panel.
var panel = ui.Panel();
panel.add(intro);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
// Get the list of palette colors and class names from the image.
var palette = ["2c7fb8","7fcdbb","edf8b1"];
var names = ["High precip", "Medium", "Low"];
panel.widgets().set(3, makeRow(palette[0], names[0]));
panel.widgets().set(4, makeRow(palette[1], names[1]));
panel.widgets().set(5, makeRow(palette[2], names[2]));
panel.add(lon);
panel.add(lat);
//a function for the map click feature
Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  // Add a point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'yellow'}, "point");
  Map.layers().set(1, dot);
  // Plot the sum of yearly precip at the roi
  var pChart = ui.Chart.image.seriesByRegion(byYearPrecip, point, ee.Reducer.mean(), 'precipitation', 1000, 'date', null)
      .setChartType('ScatterChart')
      .setOptions({
        title: 'total yearly precipitation at roi (mm)',
        lineWidth: 1,
        pointSize: 3
      });
  panel.widgets().set(6, pChart);
  // Plot the mean of the monthly precip at the roi
  var pChart2 = ui.Chart.image.seriesByRegion(byYearMonth, point, ee.Reducer.mean(), 'precipitation', 1000, 'date', null)
      .setChartType('ScatterChart')
      .setOptions({
        title: 'mean monthly precipitation at roi (mm)',
        lineWidth: 1,
        pointSize: 3
      });
  panel.widgets().set(7, pChart2);
});
Map.style().set('cursor', 'crosshair');
//for (var i = 0; i < names.length; i++) {
  //panel.add(makeRow(palette[i], names[i]));
  //panel.widgets().set(makeRow(palette[i], names[i]));
//}