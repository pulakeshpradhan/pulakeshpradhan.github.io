var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                10.426451479281118,
                43.80918678741802
              ],
              [
                10.426451479281118,
                43.681206537010674
              ],
              [
                10.63587835916393,
                43.681206537010674
              ],
              [
                10.63587835916393,
                43.80918678741802
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[10.426451479281118, 43.80918678741802],
          [10.426451479281118, 43.681206537010674],
          [10.63587835916393, 43.681206537010674],
          [10.63587835916393, 43.80918678741802]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.MultiPoint();
var imgExtent = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[10.426451479281118, 43.80918678741802],
          [10.426451479281118, 43.681206537010674],
          [10.63587835916393, 43.681206537010674],
          [10.63587835916393, 43.80918678741802]]], null, false);
var clippa = 
    /* color: #0b4a8b */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[10.162858678044895, 43.931320929003554],
          [10.162858678044895, 43.65276110703283],
          [10.83165140265427, 43.65276110703283],
          [10.83165140265427, 43.931320929003554]]], null, false);
Map.centerObject(imgExtent, 13);
var s2 = ee.ImageCollection("COPERNICUS/S2").filterBounds(imgExtent).filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",10).map(function(image){return image.clip(clippa)});
//s2 = s2a.map(lambda f: f.intersection(clippa))
var s2imgs = s2.sort('system:time_start', false).limit(50);
//print('s2imgs:', s2imgs);
var durante = s2.filterDate('2018-09-26', '2018-09-27').mean();
//Map.addLayer(durante, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'Durante');
var prima = s2.filterDate('2018-09-10', '2018-09-13').mean();
//Map.addLayer(prima, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'Prima');
var dopo3mesi  = s2.filterDate('2018-12-01', '2018-12-31').mean();
//Map.addLayer(dopo3mesi, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'dopo3mesi');
var dopo6mesi  = s2.filterDate('2019-03-01', '2019-03-30').mean();
//Map.addLayer(dopo6mesi, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'dopo6mesi');
var dopo1anno  = s2.filterDate('2019-09-01', '2019-09-30').mean();
//Map.addLayer(dopo1anno, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'dopo1anno');
var dopo2anni  = s2.filterDate('2020-09-01', '2020-09-30').mean();
//Map.addLayer(dopo2anni, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, 'dopo2anni');
var leftMap = ui.Map();
var rightMap = ui.Map();
var leftImg = ee.Image.constant(0);
var rightImg = ee.Image.constant(1);
var style = {min:0, max:1, opacity:0.6};
leftMap.addLayer(prima, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1}, 'Prima', true);
/*rightMap.addLayer(durante, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.2}, '2 giorni dopo l\'incendio', true);
rightMap.addLayer(dopo3mesi, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, 'a 3 mesi dall\'incendio', false);
rightMap.addLayer(dopo6mesi, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, 'a 6 mesi dall\'incendio', false);
rightMap.addLayer(dopo2anni, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, 'a 2 anni dall\'incendio', false);
*/
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
var images = {
  '2gg dopo l\'incendio': durante,
  '3 mesi dopo l\'incendio': dopo3mesi,
  '6 mesi dopo l\'incendio': dopo6mesi,
  '1 anno dopo l\'incendio': dopo1anno,
  '2 anni dopo l\'incendio': dopo2anni,
};
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Scegli la mappa da visualizzare');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],{bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.2}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
var fireName = ui.Label('Incendio di Monte Serra, PI (IT)', {fontWeight:'italic', fontSize:'10px'});
//var fireExplorerLabel = ui.Label('Fire Explorer', {fontWeight:'italic', fontSize:'16px',fontFamily: 'serif'});
fireName.setUrl('https://twitter.com/hashtag/MonteSerra?src=hash');
//var fireExplorerLabel = ui.Label('Fire Explorer', {fontWeight:'bold', fontSize:'',fontFamily: 'serif'});
/*
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
//Map.setOptions('satellite',styles);
*/
leftMap.setCenter(10.54,43.71, 12);
var infoLabel = ui.Label(
  '- Fai scorrere le frecce per visualizzare i cambiamenti.\
'+
  '- La mappa a sinistra mostra l\'area prima dell\'incendio.\
'+
  '- Usa il menù \"Layers\" per selezionare altre date post evento.\
'+
  '- Usa zoom and pan per navigare la mappa map.\
'+
  '\n * composizione a falsi colori utilizzando le bande  B11(SWIR1), B8(NiR), B3(Red) del Sentinel2.\
',  {whiteSpace:'pre',fontWeight:'italic', fontSize:'4px',fontFamily: 'serif'});
var autore  = ui.Label('Realizzazione a cura di Lorenzo Arcidiaco', {fontWeight:'italic', fontSize:'10px',fontFamily: 'serif',color:'green'});
autore.setUrl('https://twitter.com/larcidiaco');
var infoPanel = ui.Panel([fireName, autore], null, {position: 'bottom-left'});
//var infoPanel = ui.Panel(autore, null, {position: 'bottom-left'});
//var infoPanel1 = ui.Panel(fireName, null, {position: 'bottom-left'});
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(infoPanel);
//leftMap.setOptions(prima,styles);