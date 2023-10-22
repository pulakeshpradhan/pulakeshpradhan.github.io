var table = ui.import && ui.import("table", "table", {
      "id": "users/aleszczuk/Provincias/Misiones"
    }) || ee.FeatureCollection("users/aleszczuk/Provincias/Misiones"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/aleszczuk/IGN_data/IGN_Municipios"
    }) || ee.FeatureCollection("users/aleszczuk/IGN_data/IGN_Municipios"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -53.941242602879626,
                -26.51570749878423
              ],
              [
                -53.94604528300111,
                -26.589970704731392
              ],
              [
                -53.84587259092419,
                -26.59487895800605
              ],
              [
                -53.83901131531059,
                -26.521846791278648
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-53.941242602879626, -26.51570749878423],
          [-53.94604528300111, -26.589970704731392],
          [-53.84587259092419, -26.59487895800605],
          [-53.83901131531059, -26.521846791278648]]]);
// Poligono de la provincia de Misiones
//Map.addLayer(table);
// Poligono de los deptos de misiones
var municipio = table2.filter(ee.Filter.eq('nam', 'San Pedro'));
//Map.addLayer(municipio);
// GFW 2021
var gfc2021= ee.Image("UMD/hansen/global_forest_change_2021_v1_9")
    .clip(municipio);
// vista como landsat falso color
Map.addLayer(
    gfc2021.clip(municipio), 
    {bands: ['last_b40', 'last_b50', 'last_b30']},
    'L7 Falso color');
// 
Map.addLayer(gfc2021.clip(municipio).mask(gfc2021.clip(municipio)), {
  bands: ['lossyear'],
  palette: ['000000','FF0000','0000FF'],
  max: 23
}, 'Mascara de cobertura forestal');
// Ganancia de bosques
var gainImage = gfc2021.select(['gain']);
Map.addLayer(gainImage.updateMask(gainImage),
            {palette: ['0000FF']}, 'Ganancia');
// Perdida de bosques 
var lossImage = gfc2021.select(['loss']);
Map.addLayer(lossImage.updateMask(lossImage),
            {palette: ['FF0000']}, 'Perdida');
// SRTM DEM
var dem = ee.Image('CGIAR/SRTM90_V4').clip(municipio);
var elevation = dem.select('elevation');
var slope = ee.Terrain.slope(elevation);
Map.addLayer(slope, {min: 0, max: 10}, 'Pendiente', false);
// APP
var checkbox = ui.Checkbox('Imagen Landsat 7', true);
var checkbox1 = ui.Checkbox('Máscara de cobertura vegetal', true);
var checkbox2 = ui.Checkbox('Ganancia', true);
var checkbox3 = ui.Checkbox('Perdida', true);
var checkbox4 = ui.Checkbox('DEM SRTM', false);
//var checkbox5 = ui.Checkbox('Pendiente', false);
checkbox.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
checkbox1.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
checkbox2.onChange(function(checked) {
  Map.layers().get(2).setShown(checked);
});
checkbox3.onChange(function(checked) {
  Map.layers().get(3).setShown(checked);
});
checkbox4.onChange(function(checked) {
  Map.layers().get(4).setShown(checked);
});
//print(checkbox);
Map.style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click para identificar el año \n en que hubo un cambio')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the year, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var lossYear = gfc2021;
  var sample = lossYear.sample(point, 30);
  var computedValue = sample.first().get('lossyear');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Año de cambio: '+ (result + 2001),
    }));
  });
});
// Make a little map.
var map = ui.Map();
// Make the little map display an inset of the big map.
var createInset = function() {
  var bounds = geometry;
  map.centerObject(bounds);
  map.clear();
  map.addLayer(bounds);
};
// Run it once to initialize.
createInset();
// Get a new inset map whenever you click on the big map.
Map.onClick(createInset);
// Display the inset map in the console.
//Map.add(map);
var map = ui.Map({
  style: {position: 'bottom-right', width: '400px'}
});
//ui.root.add(map);
var link = ('Multi-band GeoTIFF file',
  gfc2021.getDownloadURL({
    bands: ['loss', 'gain', 'lossyear'],
    region: geometry,
    scale: 30,
    format: 'GEO_TIFF'
  }));
var link = ui.Panel([ui.Label(link)]);
var panel = ui.Panel({style: {width: '400px'}})
     .add(ui.Label('Esta app esta creada en base a: "The Hansen et al. (2013) Global Forest Change dataset"'))
     .add(ui.Label('Seleccione la capa:'))
     .add(checkbox)
     .add(checkbox1)
     .add(checkbox2)
     .add(checkbox3)
     .add(ui.Label('Información adicional:'))
     .add(checkbox4)
     .add(link)
     ;
ui.root.add(panel);