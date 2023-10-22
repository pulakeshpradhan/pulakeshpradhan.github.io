var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "detections"
        ],
        "min": 1,
        "max": 556,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["detections"],"min":1,"max":556,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -61.09473975510359,
            -31.859760852133228
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([-61.09473975510359, -31.859760852133228]);
// JRC Monthly Water Recurrence,
var dataset = ee.ImageCollection('JRC/GSW1_3/MonthlyRecurrence');
var visualization = {
  bands: ['monthly_recurrence'],
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'ffbbbb', '0000ff']
};
//monthly_recurrence	%	0	100	
// The recurrence value expressed as a percentage for this month.
Map.addLayer(dataset, visualization, 'Recurrencia Mensual');
//////// JRC Global Surface Water Metadata, v1.3
// https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_3_Metadata#bands
// detections	0*	2007*	
// The number of water detections in the study period.
// valid_obs	0*	2076*	
// The number of valid observations in the study period.
// total_obs	0*	2417*	
// The total number of available observations (i.e. scenes) in the study period.
var dataset = ee.Image('JRC/GSW1_3/Metadata');
var visualization = {
  bands: ['detections', 'valid_obs', 'total_obs'],
  min: 100.0,
  max: 900.0,
};
///////  WATER CLASS
//JRC Yearly Water Classification History
Map.addLayer(dataset.mask(dataset), visualization, 'Detecciones/Observaciones');
Map.addLayer(dataset.mask(dataset), imageVisParam, 'Detecciones');
var dataset = ee.ImageCollection('JRC/GSW1_3/YearlyHistory');
// 0	cccccc	No data
// 1	ffffff	Not water
// 2	99d9ea	Seasonal water
// 3	0000ff	Permanent water
var visualization = {
  bands: ['waterClass'],
  min: 0.0,
  max: 3.0,
  palette: ['cccccc', 'ffffff', '99d9ea', '0000ff']
};
Map.addLayer(dataset, visualization, 'Clases (no agua, estacional y permanente');
/// JRC Monthly Water History
var dataset = ee.ImageCollection('JRC/GSW1_3/MonthlyHistory');
var visualization = {
  bands: ['water'],
  min: 0.0,
  max: 2.0,
  palette: ['ffffff', 'fffcb8', '0905ff']
};
Map.addLayer(dataset, visualization, 'Agua',0);
/// JRC Global Surface Water Mapping Layers
// occurrence	%	0	100	
// The frequency with which water was present.
// change_abs	%	-100	100	
// Absolute change in occurrence between two epochs: 1984-1999 vs 2000-2019.
// change_norm	%	-100	100	
// Normalized change in occurrence. (epoch1-epoch2)/(epoch1+epoch2) * 100
// seasonality		0	12	
// Number of months water is present.
// recurrence	%	0	100	
// The frequency with which water returns from year to year.
// transition				
// Categorical classification of change between first and last year.
// max_extent				
// Binary image containing 1 anywhere water has ever been detected.
// 0	ffffff	No change
// 1	0000ff	Permanent
// 2	22b14c	New permanent
// 3	d1102d	Lost permanent
// 4	99d9ea	Seasonal
// 5	b5e61d	New seasonal
// 6	e6a1aa	Lost seasonal
// 7	ff7f27	Seasonal to permanent
// 8	ffc90e	Permanent to seasonal
// 9	7f7f7f	Ephemeral permanent
// 10	c3c3c3	Ephemeral seasonal
var dataset = ee.Image('JRC/GSW1_3/GlobalSurfaceWater');
var visualization = {
  bands: ['occurrence'],
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'ffbbbb', '0000ff']
};
Map.addLayer(dataset, visualization, 'Ocurrencia',0);
Map.setOptions('SATELLITE')
//////////////   DRAWING TOOLS
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNdviTimeSeries() {
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var aoi = drawingTools.layers().get(0).getEeObject();
  drawingTools.setShape(null);
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: ee.ImageCollection('JRC/GSW1_3/YearlyHistory'),
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'waterClass',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'waterClass'},
                    series: {0: {color: '23cba7'}}
                  }).setChartType('ColumnChart');
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Selecciona modo de dibujo.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangulo',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Poligono',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Punto',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Dibuja una geometria.'),
    ui.Label('3. Espera el grafico.'),
    ui.Label(
        '4. Repite 1-3 o edita/mueve\nla geometria para un nuevo chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
Map.setCenter(-60.614, -31.848, 10);