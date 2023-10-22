var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var table = ee.FeatureCollection("projects/ee-fernandotentor/assets/JRGJohnson_WestWharmley")
var grid = ee.FeatureCollection("projects/ee-fernandotentor/assets/Agreed/JRGJohnson_cuadr_10k_3857");
///////////////////  S2
var stardate = '2017-01-01';
var enddate = Date.now();
var start = ee.Date(stardate);
var end = ee.Date(enddate);
var timedelta = end.difference(start, 'day');
var aggregation = 1;
var timeunit = 'month'; //'day' or 'month'
var scale = 100;
var imageCollection = ee.ImageCollection("COPERNICUS/S2_SR");
//////////////// LEFT SIZE PANEL //////////////////////
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '600px',
    backgroundColor: '#bedef6'
  }, }).add(ui.Label('Click on Field',{
  margin  :'8px auto',
  backgroundColor: '#bedef6',
  fontWeight: '800'
}));
//////////  SELECT FUNCTION
function select (table , point) {
  var field = table.filterBounds(point);
  return field;
}
function is_farm (point) {
  var size = table.filterBounds(point).size();
  return size;
}
///////////// Cloud mask
function cloudmask (image) {
  var mask = image.select('SCL').gte(8).and(image.select('SCL').neq(11));
  return image.mask(mask.neq(1));
}
////////////////  function Sentinel 2 NDVI
function add_ndvi (image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('ndvi');
  return image.addBands(ndvi);
}
////////////////  function Sentinel 2 NDMI
function add_ndmi (image){
  var ndvi = image.normalizedDifference(['B8','B11']).rename('ndmi');
  return image.addBands(ndvi);
}
////////////////  function Sentinel 2 BSI
function add_bsi (image){
  var bsi = image.expression(
    '((B11+B4)-(B8+B2))/((B11+B4)+(B8+B2))',
    {   B11: image.select('B11').multiply(0.0001),
        B4: image.select('B4').multiply(0.0001),
        B8: image.select('B8').multiply(0.0001),
        B2: image.select('B2').multiply(0.0001)
    }).rename('bsi');
  return image.addBands(bsi);
}
function add_bsi_mil (image){
  var bsi = image.expression(
    '((B11+B4)-(B8+B2))/((B11+B4)+(B8+B2))',
    {   B11: image.select('B11').multiply(0.0001),
        B4: image.select('B4').multiply(0.0001),
        B8: image.select('B8').multiply(0.0001),
        B2: image.select('B2').multiply(0.0001)
    }).rename('bsi').multiply(10000);
  return image.addBands(bsi);
}
function S2_index_chart (table) {
  var S2 = imageCollection
    .filterDate('2015-06-01', Date.now())
    // .filter(ee.Filter.calendarRange(5, 7, 'month'))
    .filterBounds(table)
    .map(cloudmask)
    .map(add_ndvi)
    .map(add_ndmi)
    .map(add_bsi)
    .select(['ndvi','bsi','ndmi']);
  // Aggregation
  var S2_list = ee.List.sequence(0, timedelta.int(),aggregation)
                .map(function(count) {return start.advance(count, timeunit)})
                .map(function(date){ var images_g = S2.filterDate(date,ee.Date(date).advance(aggregation,timeunit));
                return images_g.mean().set('system:time_start',ee.Date(date)).set('system:date',ee.Date(date));
                });
  // Check missing values
  var S2_list_clean = S2_list.map(function (image) {
    return ee.Algorithms.If(ee.Image(image).bandNames(), ee.Image(image));
    }, true);
  var S2_ndmi_Chart = ui.Chart.image.series(ee.ImageCollection(S2_list_clean).select(['ndmi']), table, ee.Reducer.mean(), scale)
      .setOptions({
      animation : {startup : true, duration:2000,easing:'out'},
      curveType:'function',
      // legend:{position:'none'},
      title: 'S2 NDMI',
      vAxis: {title: 'N D M I',
      textStyle: {
              color: '#000000',
                fontSize: 11,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 14,
                bold: true
              }},
      hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
      textStyle: {
              color: '#000000',
                fontSize: 10,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 12,
                bold: true
              }
            },
            backgroundColor: '#f6eee4',
            colors: ['#1a237e'],
          series: {
            0: {
              lineWidth: 3
            }
          },
            explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
            trendlines: {  0: {type: 'polynomial',degree: 1,color: 'green',lineWidth: 3,opacity: 0.3,
              showR2: false, visibleInLegend: false}}
      }
    );
  // print (S2_bsi_Chart.setChartType('LineChart'))
  panel.widgets().set(1, S2_ndmi_Chart.setChartType('LineChart'));  
  ////// NDVI
    var S2_ndvi_Chart = ui.Chart.image.series(ee.ImageCollection(S2_list_clean).select(['ndvi']), table, ee.Reducer.mean(), scale)
      .setOptions({
      animation : {startup : true, duration:2000,easing:'out'},
      curveType:'function',
      // legend:{position:'none'},
      title: 'S2 NDVI',
      vAxis: {title: 'N D V I',
      textStyle: {
              color: '#000000',
                fontSize: 11,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 14,
                bold: true
              }},
      hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
      textStyle: {
              color: '#000000',
                fontSize: 10,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 12,
                bold: true
              }
            },
            backgroundColor: '#f6eee4',
            colors: ['#1a237e'],
          series: {
            0: {
              lineWidth: 3
            }
          },
            explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
            trendlines: {  0: {type: 'polynomial',degree: 1,color: 'green',lineWidth: 3,opacity: 0.3,
              showR2: false, visibleInLegend: false}}
      }
    );
  // print (S2_bsi_Chart.setChartType('LineChart'))
  panel.widgets().set(2, S2_ndvi_Chart.setChartType('LineChart'));  
  return S2_list_clean;
}
/////////// soil Moisture Chart
function SM_chart (table) {
  var SMAP = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture')
    .filterDate('2015-06-01', Date.now())
    // .filter(ee.Filter.calendarRange(5, 7, 'month'))
    .filterBounds(table);
  // Aggregation
  var SMAP_list = ee.List.sequence(0, timedelta.int(),aggregation)
                .map(function(count) {return start.advance(count, timeunit)})
                .map(function(date){ var images_g = SMAP.filterDate(date,ee.Date(date).advance(aggregation,timeunit));
                return images_g.mean().set('system:time_start',ee.Date(date)).set('system:date',ee.Date(date));
                });
  // Check missing values
  var SMAP_list_clean = SMAP_list.map(function (image) {
    return ee.Algorithms.If(ee.Image(image).bandNames(), ee.Image(image));
    }, true);
  var SMAP_list_Chart = ui.Chart.image.series(ee.ImageCollection(SMAP_list_clean).select(['ssm','susm']), table, ee.Reducer.mean(), scale)
      .setOptions({
      animation : {startup : true, duration:2000,easing:'out'},
      curveType:'function',
      // legend:{position:'none'},
      title: 'Soil Moisture',
      vAxis: {title: 'S M',
      textStyle: {
              color: '#000000',
                fontSize: 11,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 14,
                bold: true
              }},
      hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
      textStyle: {
              color: '#000000',
                fontSize: 10,
                bold: true
              },
              titleTextStyle: {
              color: '#000000',
                fontSize: 12,
                bold: true
              }
            },
            backgroundColor: '#f6eee4',
            colors: ['#1a237e'],
          series: {
            0: {
              lineWidth: 3
            }
          },
            explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
            trendlines: {  0: {type: 'polynomial',degree: 1,color: 'green',lineWidth: 3,opacity: 0.3,
              showR2: false, visibleInLegend: false}}
      }
    );
  // print (S2_bsi_Chart.setChartType('LineChart'))
  panel.widgets().set(3, SMAP_list_Chart.setChartType('LineChart'));
  return SMAP_list_clean;
}
////////////////  smap DATA
function SM_data (table) {
  var SMAP = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture')
    .filterDate('2015-06-01', Date.now())
    // .filter(ee.Filter.calendarRange(5, 7, 'month'))
    .filterBounds(table)
    .select(['smp']);
  // Aggregation
  var SMAP_list = ee.List.sequence(0, timedelta.int(),aggregation)
                .map(function(count) {return start.advance(count, timeunit)})
                .map(function(date){ var images_g = SMAP.filterDate(date,ee.Date(date).advance(aggregation,timeunit));
                return images_g.mean().set('system:time_start',ee.Date(date)).set('system:date',ee.Date(date));
                });
  // Check missing values
  var SMAP_list_clean = SMAP_list.map(function (image) {
    var img = ee.Image(image).multiply(100).copyProperties(image,['system:time_start']);
    return ee.Algorithms.If(ee.Image(image).bandNames(), img);
    }, true);
  return ee.ImageCollection(SMAP_list_clean);
}
Map.onClick(function(coords) {
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var stat_table = ee.Algorithms.If(is_farm(point),table , grid);
    var selected_table = select(ee.FeatureCollection(stat_table) , point);
    var S2_Coll = ee.ImageCollection(S2_index_chart(selected_table));
    var SMAP_list_clean = SM_chart(selected_table);
    // print(Map.layers().length());
    if (Map.layers().length() > 3) {Map.remove(Map.layers().get(3))}
    Map.addLayer(selected_table, {color: 'yellow'}, 'Selected field');
});
/////////// TREND ANALYSIS
var coll = SM_data(table);
var afterFilter = ee.Filter.lessThan({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
var joined = ee.ImageCollection(ee.Join.saveAll('after').apply({
  primary: coll,
  secondary: coll,
  condition: afterFilter
}));
var sign = function(i, j) { // i and j are images
  return ee.Image(j).neq(i) // Zero case
      .multiply(ee.Image(j).subtract(i).clamp(-1, 1)).int();
};
var kendall = ee.ImageCollection(joined.map(function(current) {
  var afterCollection = ee.ImageCollection.fromImages(current.get('after'));
  return afterCollection.map(function(image) {
    // The unmask is to prevent accumulation of masked pixels that
    // result from the undefined case of when either current or image
    // is masked.  It won't affect the sum, since it's unmasked to zero.
    return ee.Image(sign(current, image)).unmask(0);
  });
  // Set parallelScale to avoid User memory limit exceeded.
}).flatten()).reduce('sum', 2);
// var minmax = kendall.reduceRegion(ee.Reducer.minMax(),grid ,1000).getInfo()
var minmax = {smp_sum_min :-151 , smp_sum_max : 151 };
print (minmax.smp_sum_min ,minmax.smp_sum_max);
var palette = ['red', 'white', 'green'];
Map.addLayer(kendall,{'min':minmax.smp_sum_min,'max':minmax.smp_sum_max,'palette':palette}, 'Soil Moisture Trend');
ui.root.insert(0,panel);
Map.addLayer(ee.Image().paint(table,0,2),{},'Farm');
Map.addLayer(ee.Image().paint(grid,0,2),{},'Grid 10000 m');
// var label = ui.Label('Trends BSI Index')
// Map.add(label)
Map.setCenter(-2.19062, 54.99404,12);
Map.setOptions('SATELLITE');
Map.style().set({ cursor: 'crosshair' });
//////////////////////////////////
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
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  // var chart = ui.Chart.image
  //                 .seriesByRegion({
  //                   imageCollection: ee.ImageCollection('MODIS/006/MOD13A2'),
  //                   regions: aoi,
  //                   reducer: ee.Reducer.mean(),
  //                   band: 'NDVI',
  //                   scale: scale,
  //                   xProperty: 'system:time_start'
  //                 })
  //                 .setOptions({
  //                   titlePostion: 'none',
  //                   legend: {position: 'none'},
  //                   hAxis: {title: 'Date'},
  //                   vAxis: {title: 'NDVI (x1e4)'},
  //                   series: {0: {color: '23cba7'}}
  //                 });
  // // Replace the existing chart in the chart panel with the new chart.
  // panel.widgets().reset([chart]);
  S2_index_chart(aoi)
  SM_chart(aoi)
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
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
Map.add(controlPanel);