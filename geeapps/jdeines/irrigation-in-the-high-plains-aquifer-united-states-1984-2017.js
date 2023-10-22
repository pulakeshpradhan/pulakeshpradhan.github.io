/*
AIM-HPA: Exploratory Visualization, Total # of years irrigated, 1984-2017
j deines
27 August 2019
*/
// load aim viz and maps
var mapFolder = 'projects/h2yo/IrrigationMaps/AIM/AIM-HPA/';
var aim = ee.Image(mapFolder + 'AIM-HPA_Deines_etal_rse_Viz-IrrFreq');
var aimMaps = ee.Image(mapFolder + 'AIM-HPA_Deines_etal_RSE_v01_1984-2017');
var aoi = ee.FeatureCollection('projects/h2yo/IrrigationMaps/AIM/AIM-HPA/vector_aimhpa_minBound');
// depletion timeframe map
var depletion = ee.Image('users/jdeines/ancillaryData/AIM_HPA/DepleteHorizon_2012_haacker');
var depletion2100 = depletion.updateMask(depletion.lt(2100))
// end user vars ------------------------------------------------------------------------
var center = ee.Feature(ee.Geometry.Point([-102.2051, 35.8848]));
Map.centerObject(center,12);
Map.addLayer(aim.clip(aoi), {}, 'total years irrigated, 1984-2017');
Map.addLayer(depletion2100, {min:2013, max: 2100, palette:['red','orange','yellow']}, 'depletion 2100', false);
// Create User Interface portion --------------------------------------------------
// add a dummy class band name
var aimMaps = aimMaps.addBands(ee.Image.constant(0).rename('class'));
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Annual Irrigation History',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
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
var viridis = ["#440154ff", "#472775ff", "#3e4887ff", "#31668dff", "#26828dff", "#249d88ff", "#37b578ff",
              "#6dcc58ff", "#b0dd31ff", "#fde725ff"]
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(viridis),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(2, {margin: '4px 8px'}),
    ui.Label(
        (34 / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(34, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: # of Years Irrigated (1984-2017)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.widgets().set(2, legendPanel);
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an MODIS EVI chart.
  var aimChart = ui.Chart.image.byClass({
    image:aimMaps,
    classBand: 'class',
    region: point,
    reducer: ee.Reducer.first(),
    scale: 30
  });
  aimChart.setOptions({
    title: 'Irrigation History',
    vAxis: {title: '1 = Irrigated', maxValue: 1.2, minValue: 0},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, aimChart);
});  
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);