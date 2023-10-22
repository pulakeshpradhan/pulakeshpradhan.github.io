var fmask = ui.import && ui.import("fmask", "image", {
      "id": "users/avvaler/PKraiForestMask"
    }) || ee.Image("users/avvaler/PKraiForestMask"),
    pkBorders = ui.import && ui.import("pkBorders", "table", {
      "id": "users/avvaler/PermKraiBorders"
    }) || ee.FeatureCollection("users/avvaler/PermKraiBorders"),
    pkLX = ui.import && ui.import("pkLX", "table", {
      "id": "users/avvaler/PermKraiLX"
    }) || ee.FeatureCollection("users/avvaler/PermKraiLX");
var GRAYMAP = [
{
// stylers: [ { saturation: -100 } ]
stylers: [ { invert_lightness: true } ]
},{ 
stylers: [ { saturation: -80 } ]
// stylers: [ { invert_lightness: true } ]
},{
elementType: 'labels',
stylers: [ { lightness: -30 } ]
},{
featureType: 'road',
elementType: 'geometry',
stylers: [ { 'lightness': -10 } ]
},{
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.drawingTools().setShown(false);
Map.setOptions('Тёмная', {'Тёмная': GRAYMAP});
//////////////////////
function forestMask (image) {
  var masked = image.updateMask(fmask);
  return masked;
}
var dataset = ee.ImageCollection('MODIS/006/MOD17A3HGF')
              // .mosaic();
              .map(forestMask);
var vis = {
  // bands: ['Npp'],
  min: 3000,
  max: 5000,
  palette: ['bbe029', '0a9501', '074b03']
};
Map.centerObject(pkBorders,7);
Map.addLayer(dataset.select('Npp'), vis, 'NPP, чистая первичная продукция');
// Map.addLayer(pkBorders.draw({color: '006600', strokeWidth: 5}),{},'Границы Пермского края');
// Map.addLayer(pkLX,{},'Границы лесничеств');
var emptyb = ee.Image().byte();
var outline = emptyb.paint({
  featureCollection: pkBorders,
  color: 1,
  width: 4
});
Map.addLayer(outline, {palette: 'ff80ff'}, 'Границы Пермского края');
var emptylx = ee.Image().byte();
var outlinelx = emptylx.paint({
  featureCollection: pkLX,
  color: 1,
  width: 1
});
Map.addLayer(outlinelx, {palette: '000000'}, 'Границы лесничеств');
/////////////////////////////
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'NPP',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
var legendImage = gradient.visualize(vis);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(vis['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(vis['min'])
],
});
legend.add(panel);
Map.add(legend);
// Create a panel to hold the chart.
var chartPanel = ui.Panel();
chartPanel.style().set({
  width: '500px',
  position: 'bottom-right'
});
// Create legend title
var title1 = ui.Label({
value: 'АНО ВО "УНИВЕРСИТЕТ ИННОПОЛИС"',
style: {
// fontWeight: 'bold',
fontSize: '12px',
width: '100%',
margin: '10px 0 10px 0',
padding: '0',
textAlign: 'center',
fontFamily: 'monospace',
}
});
var title2 = ui.Label({
value: 'КАРТА-СХЕМА',
style: {
fontWeight: 'bold',
fontSize: '24px',
width: '100%',
margin: '0',
padding: '0',
textAlign: 'center'
}
});
var title3 = ui.Label({
value: 'среднегодового депонирования углерода',
style: {
fontWeight: 'bold',
fontSize: '14px',
width: '100%',
margin: '0 0 20px 0',
padding: '0',
textAlign: 'center'
}
});
// Add the title to the panel
chartPanel.add(title1);
chartPanel.add(title2);
chartPanel.add(title3);
// Map.add(chartPanel);
// Register a function to draw a chart when a user clicks on the map.
// Map.onClick(function(coords) {
//   panel.clear();
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   var chart = ui.Chart.image.regions(dataset.mean(), point, null, 100);
//   chart.setOptions({title: 'Band values'});
//   panel.add(chart);
// });
// Create a time series chart.
var NPPTimeSeries = ui.Chart.image.seriesByRegion(
    dataset, pkLX, ee.Reducer.mean(), 'Npp', 1000, 'system:time_start', 'LX_NAME')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Чистая первичная продукция\n по лесничествам',
          vAxis: {title: 'NPP, кг/кв.м'},
          lineWidth: 1,
          curveType: 'function',
          pointSize: 1,
          // series: {
          //   0: {color: 'FF0000'}, // urban
          //   1: {color: '00FF00'}, // forest
          //   2: {color: '0000FF'}  // desert
          // }
        });
chartPanel.add(NPPTimeSeries);
Map.add(chartPanel);