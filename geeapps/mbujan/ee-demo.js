var nc_barley = ui.import && ui.import("nc_barley", "image", {
      "id": "users/mbujan/nc_barley_raster"
    }) || ee.Image("users/mbujan/nc_barley_raster"),
    nc_corn = ui.import && ui.import("nc_corn", "image", {
      "id": "users/mbujan/nc_corn_raster"
    }) || ee.Image("users/mbujan/nc_corn_raster"),
    nc_sflow = ui.import && ui.import("nc_sflow", "image", {
      "id": "users/mbujan/nc_sflow_raster"
    }) || ee.Image("users/mbujan/nc_sflow_raster"),
    nc_sorghum = ui.import && ui.import("nc_sorghum", "image", {
      "id": "users/mbujan/nc_sorghum_raster"
    }) || ee.Image("users/mbujan/nc_sorghum_raster"),
    nc_soy = ui.import && ui.import("nc_soy", "image", {
      "id": "users/mbujan/nc_soy_raster"
    }) || ee.Image("users/mbujan/nc_soy_raster"),
    nc_wheat = ui.import && ui.import("nc_wheat", "image", {
      "id": "users/mbujan/nc_wheat_raster"
    }) || ee.Image("users/mbujan/nc_wheat_raster"),
    cropland_suelo = ui.import && ui.import("cropland_suelo", "image", {
      "id": "users/mbujan/cropland_suelo_low"
    }) || ee.Image("users/mbujan/cropland_suelo_low"),
    sum_pxl = ui.import && ui.import("sum_pxl", "image", {
      "id": "users/mbujan/sum_pixels_low"
    }) || ee.Image("users/mbujan/sum_pixels_low"),
    oc_barley = ui.import && ui.import("oc_barley", "image", {
      "id": "users/mbujan/oc_barley_raster"
    }) || ee.Image("users/mbujan/oc_barley_raster"),
    oc_corn = ui.import && ui.import("oc_corn", "image", {
      "id": "users/mbujan/oc_corn_raster"
    }) || ee.Image("users/mbujan/oc_corn_raster"),
    oc_sflow = ui.import && ui.import("oc_sflow", "image", {
      "id": "users/mbujan/oc_sflow_raster"
    }) || ee.Image("users/mbujan/oc_sflow_raster"),
    oc_sorghum = ui.import && ui.import("oc_sorghum", "image", {
      "id": "users/mbujan/oc_sorghum_raster"
    }) || ee.Image("users/mbujan/oc_sorghum_raster"),
    oc_soy = ui.import && ui.import("oc_soy", "image", {
      "id": "users/mbujan/oc_soy_raster"
    }) || ee.Image("users/mbujan/oc_soy_raster"),
    oc_wheat = ui.import && ui.import("oc_wheat", "image", {
      "id": "users/mbujan/oc_wheat_raster"
    }) || ee.Image("users/mbujan/oc_wheat_raster"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.49,
        "bands": [
          "b1"
        ],
        "max": 84.81573486328125,
        "palette": [
          "ffffff",
          "91ff00",
          "218500"
        ]
      }
    }) || {"opacity":0.49,"bands":["b1"],"max":84.81573486328125,"palette":["ffffff","91ff00","218500"]};
/*******************************************************************************
 * Model *
 ******************************************************************************/
Map.centerObject(cropland_suelo,5)
var coll_nc = ee.ImageCollection([nc_barley,nc_corn
,nc_sflow,nc_sorghum,nc_soy,nc_wheat]).toBands().rename(
  ['barley','corn','sflow','sorghum','soy','wheat']);
var nc_prod = coll_nc.multiply(cropland_suelo).divide(sum_pxl).set({'system:time_start' : 1577836800000})
  .set({'system:index' : '2021'});
print(nc_prod,'nc_prod')
var coll_oc = ee.ImageCollection([oc_barley,oc_corn
,oc_sflow,oc_sorghum,oc_soy,oc_wheat]).toBands().rename(
  ['barley','corn','sflow','sorghum','soy','wheat']);
var oc_prod = coll_oc.multiply(cropland_suelo).divide(sum_pxl).set({'system:time_start' : 1546300800000})
  .set({'system:index' : '2020'});
print(oc_prod,'oc_prod')
var coll_all = ee.ImageCollection([nc_prod, oc_prod]);
print(coll_all,'coll_all')
Map.addLayer(cropland_suelo, imageVisParam2,'Crop Land')
//.set({'system:index' : 'Barley'});
/*******************************************************************************
 * Components *
 ******************************************************************************/
var map = ui.Map();
var panel = ui.Panel();
var title = ui.Label({
  value: 'Productions',
  style: {'fontSize': '24px'}
});
var info = ui.Label(
  'Dibujar sobre el mapa un poligono' +
  ' para obtener la producción');
/*******************************************************************************
 * Composition *
 ******************************************************************************/
panel.add(title)
panel.add(info)
ui.root.add(panel);
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/
var drawingTools = Map.drawingTools();
drawingTools.setLinked(false);
drawingTools.setDrawModes(["polygon"]);
drawingTools.addLayer([], "roi", "ff0000");
drawingTools.setShape("polygon");
drawingTools.draw();
var getTemperature = ui.util.debounce(function(geom, layer, widget) {
var polygons = layer.toGeometry();
var chart = ui.Chart.image.series({
  imageCollection: coll_all,
  region: polygons,
  reducer: ee.Reducer.sum(),
  xProperty: 'system:index',
  scale:948.6832980505
  })
  .setSeriesNames(['Barley', 'Corn', 'SFlower', 'Sorghum', 'Soybean', 'Wheat'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Crops production in polygon',
      legend: {position: 'none'},
      hAxis: {title: 'Crops', titleTextStyle: {italic: false, bold: true},},
      vAxis: {title: 'Production (MMT)', titleTextStyle: {italic: false, bold: true}},
      series: {
        0: {color: '8F5DC6'},
        1: {color: 'F29004'},
        2: {color: 'EFF51C'},
        3: {color: 'EE4308'},
        4: {color: '25B718'},
        5: {color: '1C84F5'},
      }
      });
    panel.clear();
    panel.add(chart);
}, 500);
drawingTools.onEdit(getTemperature);
drawingTools.onDraw(getTemperature);
drawingTools.onErase(getTemperature);