var geometry = /* color: #d63000 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                27.746658325195312,
                -26.899415168090034
              ],
              [
                27.741851806640625,
                -26.942271666444004
              ],
              [
                27.784423828125,
                -26.949616859923932
              ],
              [
                27.796096801757812,
                -26.901252208964777
              ],
              [
                27.763137817382812,
                -26.89880281449142
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            27.769317626953125,
            -26.924518806384913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            27.612075805664062,
            -26.894516246341112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            27.646408081054688,
            -26.92023321461174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            27.628555297851562,
            -26.928192041193583
          ]
        }
      ],
      "coordinates": []
    });
// Adds two charts next to the map to interactively display a
// time-series of NDVI and reflectance for each click on the map.
var hoy = new Date();
// Filter collection to dates of interest.
var MOD = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate('2005-01-01', hoy);
// Create two collections to sample from, one for each plot.
var EVI = MOD.select(['EVI',]).map (function (image){ 
            var image2 = image.divide(10000)
            return image2.copyProperties(image,['system:time_start'])});
var EVI_ult = EVI.sort('system:time_start',false).first();
var fecha = ee.Date(EVI_ult.get('system:time_start')).format('dd-MM-yyyy').getInfo()
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
Map.addLayer(EVI_ult,vis,'EVI MODIS '+ fecha);
Map.setCenter(-60.4893, -31.7667, 10);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '500px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'MODIS MOD13Q1 EVI 01-01-2005 / '+ ee.Date(hoy).format('dd-MM-yyyy').getInfo(),
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Haga click en el mapa.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('vertical')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('long: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(EVI, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'Serie temporal MODIS EVI ',
    vAxis: {title: 'EVI'},
    hAxis: {title: 'date', format: 'MM-yyyy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);