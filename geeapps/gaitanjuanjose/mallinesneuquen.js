var image1 = ui.import && ui.import("image1", "image", {
      "id": "users/gaitanjuanjose/mallines_nqn"
    }) || ee.Image("users/gaitanjuanjose/mallines_nqn"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.00085194135511,
                -35.958351345981086
              ],
              [
                -72.00085194135511,
                -40.94496714676456
              ],
              [
                -67.93591053510511,
                -40.94496714676456
              ],
              [
                -67.93591053510511,
                -35.958351345981086
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-72.00085194135511, -35.958351345981086],
          [-72.00085194135511, -40.94496714676456],
          [-67.93591053510511, -40.94496714676456],
          [-67.93591053510511, -35.958351345981086]]], null, false);
//Imagen para SENTINEL 2
var IMGSentinel= ee.ImageCollection ('COPERNICUS/S2') 
  .filterDate ('2019-01-01', '2019-12-31') //fechas disponibles ('2015-07-01' - actualidad)
  .filterBounds (geometry) 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30);
var SentinelFiltro = ee.Image(IMGSentinel.median());
var SentinelClip = SentinelFiltro.clip (geometry);
Map.addLayer (SentinelClip, {
  max: 2000, 
  min: 0.0, 
  gamma: 1.0,
  bands: ['B3','B3','B3']}, 
  'Imagen_Sentinel_2_media_2019_10m_resolucion',true);
Map.addLayer (image1, {max: 12, min: 1, palette: ['0412f4', '057701', '0bc201', '11f900', 'fdfa03', 'ffff0e', '0eefff', 'ffb300', 'ff0800', 'e707e4','a815f7','90110a']},'Mallines_NQN',true); 
// Configure the map.
Map.setCenter(-70.6564, -39.43918, 10);
Map.style().set('cursor', 'crosshair');
// Create the title label.
var title = ui.Label('Mallines pcia. de Neuquén');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.regions(image, point, null, 30);
  chart.setOptions({title: 'Band values'});
  panel.add(chart);
});
var textbox = ui.Textbox({
  placeholder: 'Enter text here...',
  onChange: function(text) {
    print('So what you are saying is ' + text + '?');
  }
});
print(textbox);