var cropland_suelo = ui.import && ui.import("cropland_suelo", "image", {
      "id": "users/mbujan/cropland_suelo_low"
    }) || ee.Image("users/mbujan/cropland_suelo_low"),
    sum_pxl = ui.import && ui.import("sum_pxl", "image", {
      "id": "users/mbujan/sum_pixels_low"
    }) || ee.Image("users/mbujan/sum_pixels_low"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.04581455013155,
                -36.95838899099774
              ],
              [
                -57.2353287102878,
                -36.78480901360541
              ],
              [
                -57.6912613274753,
                -36.88153513433318
              ],
              [
                -57.7077408196628,
                -37.11624463032281
              ],
              [
                -57.55118564388155,
                -37.24098078198525
              ],
              [
                -57.1364517571628,
                -37.24316729674006
              ],
              [
                -57.03482822200655,
                -37.140332555668124
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Polygon(
        [[[-57.04581455013155, -36.95838899099774],
          [-57.2353287102878, -36.78480901360541],
          [-57.6912613274753, -36.88153513433318],
          [-57.7077408196628, -37.11624463032281],
          [-57.55118564388155, -37.24098078198525],
          [-57.1364517571628, -37.24316729674006],
          [-57.03482822200655, -37.140332555668124]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 0.99,
        "bands": [
          "b1"
        ],
        "max": 81.56694793701172,
        "palette": [
          "ffffff",
          "91ff00",
          "81e200",
          "639500"
        ]
      }
    }) || {"opacity":0.99,"bands":["b1"],"max":81.56694793701172,"palette":["ffffff","91ff00","81e200","639500"]};
/*******************************************************************************
 * Layers *
 ******************************************************************************/
// Load a collections
var current = ee.FeatureCollection('projects/ee-mbujan1/assets/current_season');
var next = ee.FeatureCollection('projects/ee-mbujan1/assets/next_season');
var last = ee.FeatureCollection('projects/ee-mbujan1/assets/last_season');
print(current)
print(next)
print(last)
// Create the image current crop
var corn_cs = current
  .filter(ee.Filter.notNull(['currentCor']))
  .reduceToImage({
    properties: ['currentCor'],
    reducer: ee.Reducer.first()
});
var soybean_cs = current
  .filter(ee.Filter.notNull(['currentSoy']))
  .reduceToImage({
    properties: ['currentSoy'],
    reducer: ee.Reducer.first()
});
var wheat_cs = current
  .filter(ee.Filter.notNull(['currentWhe']))
  .reduceToImage({
    properties: ['currentWhe'],
    reducer: ee.Reducer.first()
});
var sunflower_cs = current
  .filter(ee.Filter.notNull(['currentSun']))
  .reduceToImage({
    properties: ['currentSun'],
    reducer: ee.Reducer.first()
});
var sorghum_cs = current
  .filter(ee.Filter.notNull(['currentSor']))
  .reduceToImage({
    properties: ['currentSor'],
    reducer: ee.Reducer.first()
});
var barley_cs = current
  .filter(ee.Filter.notNull(['currentBar']))
  .reduceToImage({
    properties: ['currentBar'],
    reducer: ee.Reducer.first()
});
var current_season = corn_cs.rename('corn').addBands(soybean_cs.rename('soybean')).addBands(wheat_cs.rename('wheat'))
.addBands(sunflower_cs.rename('sunflower')).addBands(sorghum_cs.rename('sorghum')).addBands(barley_cs.rename('barley'))
// Create the image next crop
var corn_ns = next
  .filter(ee.Filter.notNull(['nextCorn']))
  .reduceToImage({
    properties: ['nextCorn'],
    reducer: ee.Reducer.first()
});
var soybean_ns = next
  .filter(ee.Filter.notNull(['nextSoy']))
  .reduceToImage({
    properties: ['nextSoy'],
    reducer: ee.Reducer.first()
});
var wheat_ns = next
  .filter(ee.Filter.notNull(['nextWheat']))
  .reduceToImage({
    properties: ['nextWheat'],
    reducer: ee.Reducer.first()
});
var sunflower_ns = next
  .filter(ee.Filter.notNull(['nextSunflo']))
  .reduceToImage({
    properties: ['nextSunflo'],
    reducer: ee.Reducer.first()
});
var sorghum_ns = next
  .filter(ee.Filter.notNull(['nextSorghu']))
  .reduceToImage({
    properties: ['nextSorghu'],
    reducer: ee.Reducer.first()
});
var barley_ns = next
  .filter(ee.Filter.notNull(['nextBarley']))
  .reduceToImage({
    properties: ['nextBarley'],
    reducer: ee.Reducer.first()
});
var next_season = corn_ns.rename('corn').addBands(soybean_ns.rename('soybean')).addBands(wheat_ns.rename('wheat'))
.addBands(sunflower_ns.rename('sunflower')).addBands(sorghum_ns.rename('sorghum')).addBands(barley_ns.rename('barley'))
// Create the image last crop
var corn_ls = last
  .filter(ee.Filter.notNull(['lastCorn']))
  .reduceToImage({
    properties: ['lastCorn'],
    reducer: ee.Reducer.first()
});
var soybean_ls = last
  .filter(ee.Filter.notNull(['lastSoy']))
  .reduceToImage({
    properties: ['lastSoy'],
    reducer: ee.Reducer.first()
});
var wheat_ls = last
  .filter(ee.Filter.notNull(['lastWheat']))
  .reduceToImage({
    properties: ['lastWheat'],
    reducer: ee.Reducer.first()
});
var sunflower_ls = last
  .filter(ee.Filter.notNull(['lastSunflo']))
  .reduceToImage({
    properties: ['lastSunflo'],
    reducer: ee.Reducer.first()
});
var sorghum_ls = last
  .filter(ee.Filter.notNull(['lastSorghu']))
  .reduceToImage({
    properties: ['lastSorghu'],
    reducer: ee.Reducer.first()
});
var barley_ls = last
  .filter(ee.Filter.notNull(['lastBarley']))
  .reduceToImage({
    properties: ['lastBarley'],
    reducer: ee.Reducer.first()
});
var last_season = corn_ls.rename('corn').addBands(soybean_ls.rename('soybean')).addBands(wheat_ls.rename('wheat'))
.addBands(sunflower_ls.rename('sunflower')).addBands(sorghum_ls.rename('sorghum')).addBands(barley_ls.rename('barley'))
/*******************************************************************************
 * Model *
 ******************************************************************************/
var coll_cs = current_season
var cs_prod = coll_cs.multiply(cropland_suelo).divide(sum_pxl).set({'system:time_start' : 1577836800000})
  .set({'system:index' : '2022-23'});
print(cs_prod,'cs_prod')
var coll_ls = last_season
var ls_prod = coll_ls.multiply(cropland_suelo).divide(sum_pxl).set({'system:time_start' : 1546300800000})
  .set({'system:index' : '2021-22'});
print(ls_prod,'ls_prod')
var coll_ns = next_season
var ns_prod = coll_ns.multiply(cropland_suelo).divide(sum_pxl).set({'system:time_start' : 1514764800000})
  .set({'system:index' : '2023-24'});
print(ns_prod,'ns_prod')
var coll_all = ee.ImageCollection([cs_prod, ls_prod, ns_prod]);
print(coll_all,'coll_all')
/*******************************************************************************
 * Components *
 ******************************************************************************/
Map.centerObject(cropland_suelo,5)
Map.addLayer(cropland_suelo, imageVisParam,'Crop Land')
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  style:
      {position: 'bottom-left'},
  layout: null,}
);
var tittle = ui.Label('Producción en el area de interés',{fontSize:'24px', fontWeight:'bold'});
var step1 = ui.Label('1. Seleccione una geometria.');
var button_rect = ui.Button({
      label: symbol.rectangle + ' Rectángulo',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    });
var button_poly = ui.Button({
      label: symbol.polygon + ' Polígono',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    });
//var button_point = ui.Button({
//      label: symbol.point + ' Punto',
//      onClick: drawPoint,
//      style: {stretch: 'horizontal'}
//    });
//var step2 = ui.Label('Si seleccionó punto, indique el radio en km');
//var radiusslider = ui.Slider({
//  min: 30,
//  max: 150,
//  step: 10
//});
var step3 = ui.Label('2. Dibuje el area de interés.');
var step4 = ui.Label('3. Espere que cargue el gráfico.');
var step5 = ui.Label('4. Repetir pasos 1-3 para una nueva consulta.');
var stackpanel = ui.Panel([
  tittle, step1, button_rect, button_poly,
  //button_point, step2, //radiusslider,
  step3, step4, step5
]);
controlPanel.add(tittle);
controlPanel.add(step1);
controlPanel.add(button_rect);
controlPanel.add(button_poly);
//controlPanel.add(button_point);
//controlPanel.add(step2);
//controlPanel.add(radiusslider);
controlPanel.add(step3);
controlPanel.add(step4);
controlPanel.add(step5);
Map.add(controlPanel);
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'red'});
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
  clearGeometry()
  drawingTools.setShape('point');
  drawingTools.draw();
}
//Trato de agregar el boton de hide como un componente más del panel
//chart
var shownbutton = ui.Button('Hide chart')
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
var chart_panel = ui.Panel([shownbutton, chartPanel]);
Map.add(chart_panel);
function showHideChart() {
  var shown = true;
  var label = 'Hide chart';
  if (shownbutton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  chartPanel.style().set({shown: shown});
  shownbutton.setLabel(label);
}
shownbutton.onClick(showHideChart);
/////////////////////////////////////////////////////////
//aca termina, si no volver a poner chartPanel en "map.add"
////////////////////////////////////////////////////////
var tablePanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'top-right', shown: false}
});
Map.add(tablePanel);
function chartprod() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Chart NDVI time series for the selected area of interest.
  var makechart = ui.Chart.image.series({
                    imageCollection: coll_all,
                    region: aoi,
                    reducer: ee.Reducer.sum(),
                    scale: 948.6832980505,
                    xProperty: 'system:index'
                  })
                  .setSeriesNames(['Barley', 'Corn', 'Sorghum', 'Soybean', 'SFlower', 'Wheat'])
                  .setChartType('ColumnChart')
                  .setOptions({
                    title: 'Producción en el area de intrés [MMT]',
                    legend: {position: 'top'},
                    hAxis: {title: 'Campaña', titleTextStyle: {italic: false, bold: true},},
                    vAxis: {title: 'Producción (MMT)', titleTextStyle: {italic: false, bold: true}},
                    series: {
                      0: {color: '8F5DC6'},
                      1: {color: 'F29004'},
                      2: {color: 'EE4308'},
                      3: {color: '25B718'},
                      4: {color: 'EFF51C'},
                      5: {color: '1C84F5'},
                      }
                      });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([makechart]);
}
drawingTools.onDraw(ui.util.debounce(chartprod, 500));
drawingTools.onEdit(ui.util.debounce(chartprod, 500));
/////////////////////
function tableprod() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!tablePanel.style().get('shown')) {
    tablePanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Chart NDVI time series for the selected area of interest.
  var maketable = ui.Chart.image.series({
                    imageCollection: coll_all,
                    region: aoi,
                    reducer: ee.Reducer.sum(),
                    scale: 948.6832980505,
                    xProperty: 'system:index'
                  })
                  .setSeriesNames(['Barley', 'Corn', 'Sorghum', 'Soybean', 'SFlower', 'Wheat'])
                  .setChartType('Table')
                  .setOptions({
                    title: 'Producción en el area de intrés [MMT]',
                    legend: {position: 'none'},
                    hAxis: {title: 'Campaña', titleTextStyle: {italic: false, bold: true},},
                    vAxis: {title: 'Producción (MMT)', titleTextStyle: {italic: false, bold: true}},
                      });
  // Replace the existing chart in the chart panel with the new chart.
  tablePanel.widgets().reset([maketable]);
}
drawingTools.onDraw(ui.util.debounce(tableNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(tableNdviTimeSeries, 500));