var guajira = ui.import && ui.import("guajira", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -77.50047627422339,
                13.127394446755824
              ],
              [
                -77.50047627422339,
                7.9229950882446945
              ],
              [
                -71.01854268047339,
                7.9229950882446945
              ],
              [
                -71.01854268047339,
                13.127394446755824
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
        [[[-77.50047627422339, 13.127394446755824],
          [-77.50047627422339, 7.9229950882446945],
          [-71.01854268047339, 7.9229950882446945],
          [-71.01854268047339, 13.127394446755824]]], null, false);
//Hernando Hernandez Hamon 2019. 
var visParams = {
  palette : ['D50000','FD2D04', 'FD6C11', 'FDB223', 'FCFC35', '85FF36', '00FF52',
               '24F1FF', '2A74FC', '2B00FB', '3D00C9', '62009C', '8A0073'],
};
// averaging MODIS Aqua data for a given time period.
var modisOceanColor = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI');
var chla =
    modisOceanColor.select(['chlor_a']).filterDate('2016-01-01', '2018-10-01')
var sst =
    modisOceanColor.select(['sst']).filterDate('2016-01-01', '2018-10-01')
var composite = chla.mean().visualize(visParams).clip(guajira);
var compositeLayer = ui.Map.Layer(composite).setName('Chl-a Composite')
/* Create UI Panels */
var panel = ui.Panel({style: {width:'300px'}});
ui.root.insert(0,panel);
//intro
var intro = ui.Label('MAPA DE PRODUCTIVIDAD MARINA : ZONAS DE SURGENCIA DEL CARIBE COLOMBIANO', 
{fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
var subtitle = ui.Label('Concentración de clorofila "a" mg/L Promedios Mensuales Para el Caribe Colombiano',
  {margin: '0 0 0 12px',fontSize: '12px',color: 'gray'});
panel.add(intro).add(subtitle);
Map.setCenter(-74.486129, 10.159041, 7.1); 
var YEARS = {'2013': 2013, '2014': 2014, '2015': 2015, '2016': 2016, '2017': 2017, '2018': 2018,'2019': 2019};
var MES = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,'7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12};
//Seleccione el año
var selectYear = ui.Select({
  items: Object.keys(YEARS),
});
selectYear.setPlaceholder('Seleccione un año...');
panel.add(ui.Label('1. Seleccione un año...')).add(selectYear); 
var selectMes = ui.Select({
  items: Object.keys(MES),
});
selectMes.setPlaceholder('Seleccione numero de mes...');
panel.add(ui.Label('2. Seleccione el promedio de clorofila para el mes....')).add(selectMes); 
//Cree el mapa
var mapbutton = ui.Label('3.Cree el Mapa Mensual de Clorofilas mg/lt');
panel.add(mapbutton);
panel.add(ui.Button("Genere el Mapa",landMap));
var additional_directions = ui.Label
  ('Imagen compuesta Mensual podria tardar uno minutos en ser creada . Click tasks to export classified image to drive. Click layers to flip from composite to classified image.', 
  {margin: '0 0 0 12px',fontSize: '12px',color: 'gray'});
panel.add(additional_directions);
//
var visParams = {
  palette : ['D50000','FD2D04', 'FD6C11', 'FDB223', 'FCFC35', '85FF36', '00FF52',
               '24F1FF', '2A74FC', '2B00FB', '3D00C9', '62009C', '8A0073'],
};
function landMap(){
 var yearNum = (ee.Number.parse(selectYear.getValue()));
 var MesNum = (ee.Number.parse(selectMes.getValue()));
 var startDate = ee.Date.fromYMD(yearNum,MesNum,1);
 var endDate = ee.Date.fromYMD(yearNum,MesNum,28);
//ee.ImageCollection(modisOceanColor)
var modisOceanColor = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI')
.filterBounds(guajira)
.filterDate(startDate,endDate)
.select('chlor_a')
.map(function(image) {
      return image.clip(guajira);
    });
print(modisOceanColor)
var mediaocenacolor = modisOceanColor.median()
Map.addLayer(mediaocenacolor, 
     visParams, 'Año');
var vis = {min: 0, max: 3, palette: ['D50000','FD2D04', 'FD6C11', 'FDB223', 'FCFC35', '85FF36', '00FF52',
               '24F1FF', '2A74FC', '2B00FB', '3D00C9', '62009C', '8A0073'],};
//compositeLayer = ui.Map.Layer(mediaocenacolor).setName('Mapa Mensual').visualize(vis)
compositeLayer = ui.Map.Layer(mediaocenacolor,vis,'Mapa Promedio Mensual')
// * Chart setup
// Generates a new time series chart of chl-a for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'ffff00'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(8, dot);
  // Make a chart from the time series.
  var chlaChart = ui.Chart.image.series(chla, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  chlaChart.setOptions({
    title: 'Clorofila a: serie de tiempo',
    vAxis: {title: 'Concentración mg/L'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  panel.widgets().set(9, chlaChart);
  };
//var inspectorPanel = ui.Panel({style: {width: '30%'}});
//compositeLayer
// Create the main map and set the chl-a layer.
//var mapPanel1 = ui.Map();
//var layers = mapPanel.layers();
//layers.add(mediaocenacolor, 'Composite2')
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer,visParams,'con2');
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
panel.add(ui.Label('[Chart]'));
panel.add(ui.Label('[Legend]'));
// * Chart setup
// Generates a new time series chart of chl-a for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'ffff00'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(8, dot);
  // Make a chart from the time series.
  var chlaChart = ui.Chart.image.series(chla, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  chlaChart.setOptions({
    title: 'Chl-a: time series',
    vAxis: {title: 'chl-a level'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  panel.widgets().set(9, chlaChart);
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
// Create a scale panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Leyenda: Clorofia "a" media mg/L',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.widgets().set(10, legendPanel);
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-72.367355, 12.082469);
mapPanel.centerObject(guajira, 8);
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(panel,mapPanel));
//ui.root.add(ui.SplitPanel(panel,mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
}