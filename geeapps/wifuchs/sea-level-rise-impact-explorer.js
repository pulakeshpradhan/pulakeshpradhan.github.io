var coastaldem = ui.import && ui.import("coastaldem", "image", {
      "id": "users/lucasterres/coastaldem_mosaic"
    }) || ee.Image("users/lucasterres/coastaldem_mosaic"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 1,
        "palette": [
          "00ad1d",
          "61ff00",
          "d7ff00",
          "ffc800",
          "ff8100",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":1,"palette":["00ad1d","61ff00","d7ff00","ffc800","ff8100","ff0000"]},
    RegionOfInterest = ui.import && ui.import("RegionOfInterest", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//var aw3d30x = ee.Image('users/lucasterres/DTM_PC');
var aw3d30x = coastaldem
var elevationVis = {
  min: 1,
  max: 100,
  palette: ['00ad1d', '61ff00', 'd7ff00', 'ffc800', 'ff8100','ff0000'],
};
var SEA_LEVEL_PROJECT = 0.68;
var SEA_LEVEL_RSME = 0.40;
var DEM_RSME = 4.1;
// Define a boxcar or low-pass kernel.
var boxcar = ee.Kernel.circle({
 radius: 5, units: 'pixels', normalize: true
});
// Smooth the image by convolving with the boxcar kernel.
var aw3d30 = aw3d30x.convolve(boxcar);
var customRemap = function(image, lowerLimit, newValue) {
  var mask = image.gte(lowerLimit);
  return mask.where(mask, newValue);
};
////////////////////////////////////////////////////////////////
var SL_ERROR_POS = SEA_LEVEL_PROJECT + (SEA_LEVEL_RSME/2);
var SL_ERROR_NEG = SEA_LEVEL_PROJECT - (SEA_LEVEL_RSME/2);
var DEM_ERROR_APPLY = DEM_RSME/2;
var uplimit = (-DEM_ERROR_APPLY+SL_ERROR_POS);
var half = ((((DEM_ERROR_APPLY+SL_ERROR_NEG)-(-DEM_ERROR_APPLY+SL_ERROR_POS))/2)+(-DEM_ERROR_APPLY+SL_ERROR_POS)); 
var lowerlimit = DEM_ERROR_APPLY+SL_ERROR_NEG;
var halflower = (((half)-(lowerlimit))/2)+lowerlimit;
var halfup = (((uplimit)-(half))/2)+half;
var halfup_2 = (((uplimit)-(halfup))/2)+halfup;
var halflower_2 = (((halflower)-(lowerlimit))/2)+lowerlimit;
///////////////////////////////
var map0 = customRemap(aw3d30,uplimit ,1);
var map12_5 = customRemap(aw3d30,(((uplimit)-(halfup))/2)+halfup,10);
var map25 = customRemap(aw3d30,halfup,100);
var map37_5 = customRemap(aw3d30,(((halfup)-(half))/2)+half,150);
var map50 = customRemap(aw3d30,half,175);
var map62_5 = customRemap(aw3d30,(((half)-(halflower))/2)+halflower,207);
var map75 = customRemap(aw3d30,halflower,502);
var map87_5 = customRemap(aw3d30,(((halflower)-(lowerlimit))/2)+lowerlimit,1000);
var map100 = customRemap(aw3d30, lowerlimit,3000);
var merge = map0.add(map12_5.add(map25.add(map37_5.add(map50.add(map62_5.add(map75.add(map87_5.add(map100))))))));
var remap = merge.remap([5145,2145,1145,643,436,261,111,11,1],
   [0,12.5,25,37.5,50,62.5,75,87.5,100]);
Map.addLayer(remap, elevationVis, 'Sea Level Impact Probability');
var discrete_probabilities = ee.Image(0)
                                .where(remap.gt(0), 25)
                                .where(remap.gt(25), 50)
                                .where(remap.gt(50), 75)
                                .where(remap.gt(75), 100)
                                .updateMask(remap.gte(0))
                                .rename("impact_probabilities");
var population = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density");
var population_filtered = population.filter(ee.Filter.date('2000-01-01', '2015-12-31')).select('population_density').mean();
var raster_vis = {
  "max": 1000.0,
  "palette": [
    "ffffe7",
    "FFc869",
    "ffac1d",
    "e17735",
    "f2552c",
    "9f0c21"
  ],
  "min": 200.0
};
// Map.centerObject(geometry);
Map.addLayer(population_filtered, raster_vis, 'Population Density');
//calculate based on region
// var stats = dataset.reduceRegion({
//   reducer: ee.Reducer.sum(),
//   geometry: geometry,
//   scale: 1000,
// })
// Result is a dictionary, Extract value + print
// print('people in region: ', stats.get('population_density'))
/////////////////////////////////////////////////////////////////////////////////
// Chart Generation
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartFloodImpact() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  var scale_factor = Math.round(Map.getScale());
  var classified_population = population_filtered.addBands(discrete_probabilities);
  print(classified_population)
  print("classpop",classified_population);
  var chart = ui.Chart.image
                  .byClass({
                    image: classified_population,
                    classBand: 'impact_probabilities',
                    reducer: ee.Reducer.sum(),
                    scale: 1000,
                    region: aoi,
                    //classLabels: ['0%', '0-25%', '25-50%', '50-75%', '75-100%'],
                    xLabels: [''],
                  })
                  .setChartType('ColumnChart')
                  .setOptions({
                    title: 'Sea Level Rise Impact (2081-2100)',
                    hAxis: {
                      title: 'Impact Probability',
                      titleTextStyle: {italic: false, bold: true},
                    },
                    vAxis: {
                      title: 'Population',
                      titleTextStyle: {italic: false, bold: true}
                    },
                    colors: ["00ad1d", "d7ff00", "ffc800", "ff8100", "ff0000"],
                    //colors: ["FFc869", "ffac1d", "e17735", "f2552c", "9f0c21"],
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
drawingTools.onDraw(ui.util.debounce(chartFloodImpact, 500));
drawingTools.onEdit(ui.util.debounce(chartFloodImpact, 500));
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
    ui.Label('Sea Level Rise Impact Explorer (2081-2100)', {'font-weight': 'bold'}),
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
Map.add(controlPanel);