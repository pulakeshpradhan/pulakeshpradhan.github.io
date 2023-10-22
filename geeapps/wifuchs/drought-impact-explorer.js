var dataset = ui.import && ui.import("dataset", "imageCollection", {
      "id": "IDAHO_EPSCOR/TERRACLIMATE"
    }) || ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE"),
    population_old = ui.import && ui.import("population_old", "imageCollection", {
      "id": "JRC/GHSL/P2016/POP_GPW_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    waterDeficitVis = ui.import && ui.import("waterDeficitVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "def"
        ],
        "min": 0,
        "max": 2485.1388888888887,
        "palette": [
          "eeff62",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["def"],"min":0,"max":2485.1388888888887,"palette":["eeff62","ff0000"]},
    discreteDroughtVis = ui.import && ui.import("discreteDroughtVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "palette": [
          "f5ff5c",
          "ff6d41",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"palette":["f5ff5c","ff6d41","ff0000"]},
    unclippedWaterDeficitVis = ui.import && ui.import("unclippedWaterDeficitVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "def"
        ],
        "min": 0,
        "max": 3000,
        "palette": [
          "c4e7ff",
          "f8ff8f",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["def"],"min":0,"max":3000,"palette":["c4e7ff","f8ff8f","ff0000"]},
    population = ui.import && ui.import("population", "imageCollection", {
      "id": "CIESIN/GPWv411/GPW_Population_Density"
    }) || ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density"),
    populationVis = ui.import && ui.import("populationVis", "imageVisParam", {
      "params": {
        "max": 1000,
        "palette": [
          "ffffe7",
          "FFc869",
          "ffac1d",
          "e17735",
          "f2552c",
          "9f0c21"
        ],
        "min": 0
      }
    }) || {"max":1000,"palette":["ffffe7","FFc869","ffac1d","e17735","f2552c","9f0c21"],"min":0},
    RegionOfInterest = ui.import && ui.import("RegionOfInterest", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var classified_population;
var startDate = ui.Textbox({
  value: '2014',
  onChange: draw
});
var endDate = ui.Textbox({
        value: '2020',
        onChange: draw
      });
// var population_filtered = population_old.filter(ee.Filter.date('2000-01-01', '2015-12-31')).select('population_count').mean();
var population_filtered = population.filter(ee.Filter.date('2000-01-01', '2015-12-31')).select('population_density').mean();
/////////////////////////////////////////////////////////////////////////////////
// Chart Generation
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartDroughtImpact() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  var scale_factor = Math.round(Map.getScale());
  print("classpop",classified_population);
  var chart = ui.Chart.image
                  .byClass({
                    image: classified_population,
                    classBand: 'drought_severity',
                    reducer: ee.Reducer.sum(),
                    scale: 1000,
                    region: aoi,
                    classLabels: ['Normal', 'Moderate', 'Severe', 'Extreme'],
                  })
                  .setChartType('ColumnChart')
                  .setOptions({
                    title: 'Drought Impact',
                    hAxis: {
                      title: 'Drought Severity',
                      titleTextStyle: {italic: false, bold: true},
                    },
                    vAxis: {
                      title: 'Population',
                      titleTextStyle: {italic: false, bold: true}
                    },
                    colors: ['76b349', 'f0af07', 'ff0000'],
                    pointSize: 0,
                    lineSize: 5,
                    curveType: 'function'
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
//////////////////////////////////////////////////////////////////////////////////
// Geometry UI
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'RegionOfInterest', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
drawingTools.onDraw(ui.util.debounce(chartDroughtImpact, 500));
drawingTools.onEdit(ui.util.debounce(chartDroughtImpact, 500));
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
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
////////////////////////////////////////////////////////////////////////////////////
//Data Selection ui
var changepanel = ui.Panel({
  widgets: [ui.Label({
    value:'Select Years for TerraClimate Drought Map',
    style:{fontSize: '18px', fontWeight: 'bold'}
  })],
  style: {position: 'bottom-left'},
});
  var datasetRange_label2 = ui.Label('Start Year (1959 - )          ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
  var datasetRange_label3 = ui.Label('End Year (-2020)     ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var durRange_subtext2 = ui.Panel([
  datasetRange_label2, datasetRange_label3],
  ui.Panel.Layout.flow('horizontal'));
changepanel.add(durRange_subtext2);
changepanel.add(ui.Panel([startDate, endDate],ui.Panel.Layout.flow('horizontal') ))
////////////////////////////////////////////////////////////////////////////////////
// Main Draw
function draw() {
  // clear map and add all panels
  Map.clear();
  Map.add(changepanel);
  Map.add(controlPanel);
  Map.add(chartPanel);
  // filter date to user specified date range
  var start = startDate.getValue() + "-01-01";
  var end = endDate.getValue() + "-01-01";
  var dataset_filtered = dataset.filter(ee.Filter.date(start, end));
  var water_deficit = dataset_filtered.select('def').mean();
  Map.addLayer(water_deficit, unclippedWaterDeficitVis, 'Water Deficit');
  Map.addLayer(population_filtered, populationVis, "Population Density");
  var droughtMask = water_deficit.gte(1000);
  var drought_zones = ee.Image(0)
  .where(water_deficit.gt(1000), 1)
  .where(water_deficit.gt(2000), 2)
  .where(water_deficit.gt(3000), 3)
  .where(water_deficit.gt(4000), 4)
  var masked_population = population_filtered.updateMask(droughtMask);
  classified_population = population_filtered.addBands(drought_zones)
                            .rename(['population_count', 'drought_severity']);
  // var stats = masked_population.addBands(drought_zones).reduceRegion({
  //   reducer: ee.Reducer.sum().group(1),
  //   scale: 250,
  //   maxPixels: 1e9,
  //   geometry: whole_world,
  //   bestEffort: true
  // });
  // print(stats);
}
draw();