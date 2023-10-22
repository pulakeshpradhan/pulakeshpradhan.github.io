var fxns = require('users/mmacander/boreal_viz:fxns'); // Load module
var vizPublic = require('users/mmacander/public:functions/viz'); // Load module
var dod_sites = ee.FeatureCollection("users/masseyr44/shapefiles/DoD_AK_sites");
var dod_sites_fill = ee.Image().toByte().paint(dod_sites, 1, 2)
//Map layer configuration
var pftTS = ee.ImageCollection(
  ee.List.sequence(1985,2020,5).map(function(year) {return fxns.getPftYearStack(fxns.pftMaps, year)}));
pftTS = pftTS.select('cTree_cover','bTree_cover','allDecShrub_cover','allEvShrub_cover','graminoid_cover','allForb_cover','tmlichen_light2_cover');
var startYear = 1985;
var endYear = 2020;
var changePft = 'allDecShrub';
var pftChange = fxns.getPftYearStack(fxns.pftMaps, endYear).subtract(fxns.getPftYearStack(fxns.pftMaps, startYear))
  .select('cTree_cover','bTree_cover','allDecShrub_cover','allEvShrub_cover','graminoid_cover','allForb_cover','tmlichen_light2_cover');
print(pftTS);
var vis = {min: 0, max: 80};
var composite = pftTS.filter(ee.Filter.calendarRange(2020,2020,'year')).first().visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('PFT Composite');
var change = pftChange.select(changePft+'_cover').visualize(fxns.changeViz);
var changeLayer = ui.Map.Layer(change).setName('PFT Change');
// Create the main map and set the TS layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(changeLayer, '2020 Composite');
layers.add(ui.Map.Layer(dod_sites_fill, {palette:'ff0000'}).setName('DOD'));
print(mapPanel.layers())
// widget for selecting location
var select_location = ui.Select({
  items: Object.keys(fxns.places),
  onChange: function(key) {
    mapPanel.setCenter(fxns.places[key][0], fxns.places[key][1]);
    mapPanel.setZoom(fxns.places[key][2])},
  style: {
    //'stretch': 'horizontal',
    'background-color': 'white',
    'margin': '12px',
    'shown': true,
    // 'textAlign': 'center',
    'fontWeight': 'bold',
    //'position': 'top-center',
    'fontSize': '24px',
    'textAlign': 'left'
  }
});
// widget for selecting PFT
var select_pft = ui.Select({
  items: Object.keys(fxns.pftDict),
  onChange: function(key) {
    // coverViz = {
    //   bands: fxns.pftDict[key][0] + '_cover',
    //   min: 0,
    //   max: fxns.pftDict[key][1],
    //   palette: vizPublic.glcf_tree_cover_palette_zeroGray};
    var pftChange_ = pftChange.select(fxns.pftDict[key][0] + '_cover')
    print(pftChange_);
    // mapTitles[1] = 'PFT Cover ('+fxns.pftDict[key][0];
    // print(mapPanel.widgets());
    // mapPanel.remove(mapPanel.widgets().get(0));
    // mapPanel.add(ui.Label({value:key+' Top Cover (%)', style:{fontWeight: 'bold', fontSize: '22px'}}))
    var change_layer_new = ui.Map.Layer(pftChange_, fxns.changeViz, 'PFT Change');
    // var change = pftChange.select(changePft+'_cover').visualize(fxns.changeViz);
    // var changeLayer = ui.Map.Layer(change).setName('PFT Change');
    mapPanel.layers().set(0, change_layer_new);
    print(change_layer_new)},
    // map1.setCenter(fxns.places[key][0], fxns.places[key][1]);
    // map1.setZoom(fxns.places[key][2])},
  style: {
    //'stretch': 'horizontal',
    'background-color': 'white',
    'margin': '12px',
    'shown': true,
    // 'textAlign': 'center',
    'fontWeight': 'bold',
    //'position': 'top-center',
    'fontSize': '24px',
    'textAlign': 'left'
  }
});
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Plant Functional Type Top Cover - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of PFT Top Cover.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
inspectorPanel.add(select_location.setValue('Fort Greely'))
inspectorPanel.add(select_pft.setValue('Deciduous Shrub'))
// https://groups.google.com/g/google-earth-engine-developers/c/GZRY2HOU8Rw/m/kTbHnCJpBwAJ
// https://gis.stackexchange.com/questions/331842/adding-a-logo-to-a-panel-on-an-app-in-google-earth-engine
var logo = ee.Image('users/mmacander/viz/pft_legend_wide').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '554x175',
        format: 'png'
        },
    style: {height: '88px', width: '277px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb);//, 'flow', {width: '300px'});
inspectorPanel.add(toolPanel);
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
// inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot);
  // Make a chart from the time series.
  var tsChart = ui.Chart.image.series(pftTS, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  tsChart.setOptions({
    title: 'PFT Top Cover Time-series',
    vAxis: {title: 'Top Cover (%)'},
    hAxis: {title: 'Date', format: 'yyyy', gridlines: {count: 7}},
    height: '50%',
    series: {
      0: {color: 'red', labelInLegend: 'Deciduous Shrubs'},
      1: {color: 'purple', labelInLegend: 'Evergreen Shrubs'},
      2: {color: 'pink', labelInLegend: 'Forbs'},
      3: {color: 'lightgreen', labelInLegend: 'Broadleaf Trees'},
      4: {color: 'darkgreen', labelInLegend: 'Conifer Trees'},
      5: {color: 'brown', labelInLegend: 'Graminoids'},
      6: {color: 'goldenrod', labelInLegend: 'Lichen'}
      },
    // lineWidth: 0,
    pointsVisible: true,
    pointSize: 3,
    legend: {position: 'none'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(5, tsChart);
};
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
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
// var legendLabels = ui.Panel({
//   widgets: [
//     ui.Label(vis.min, {margin: '4px 8px'}),
//     ui.Label(
//         (vis.max / 2),
//         {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
//     ui.Label(vis.max, {margin: '4px 8px'})
//   ],
//   layout: ui.Panel.Layout.flow('horizontal')
// });
// var legendTitle = ui.Label({
//   value: 'Map Legend: median 2017 ocean temp (C)',
//   style: {fontWeight: 'bold'}
// });
// var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
// inspectorPanel.widgets().set(4, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-145.73, 63.91);
// mapPanel.centerObject(initialPoint, 4);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
print(inspectorPanel.widgets())