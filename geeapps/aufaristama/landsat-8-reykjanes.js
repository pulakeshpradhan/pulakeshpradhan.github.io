var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -22.19090354327946,
            63.93194599566735
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([-22.19090354327946, 63.93194599566735]),
    RT = ui.import && ui.import("RT", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT");
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Time Series-Surface Temperature and Radiant Flux (Reykjanes, Iceland)',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
   ui.Label('This app is designed for monitor the eruption activity around Reykjanes. The Data derived from LANDSAT-8-TIRS satellite images. There are three parameters were derived from this app, Temperature, Area covered by thermal anomalies and Radiant flux. In case of extreme temperature from eruption the temperature will be saturated to around 94-100 C due to limitation of the satelite. The app will create automatic eruption area with a layer called "hotspot". This is a beta app, any comments or suggestions to improve this app can be sent to m.aufaristama@utwente.nl')
]);
inspectorPanel.add(intro);
inspectorPanel.add(ui.Label('[Chart]'));
Map.centerObject(geometry);
var aoi = geometry.buffer(35000);
var l8 = RT.filterDate('2014-01-01','2021-12-31').filterBounds(geometry);
var l8r= l8.map(function(image) {
  return ee.Algorithms.Landsat.calibratedRadiance(image).copyProperties(image, ['system:time_start']);
})
function addindices(image) {
  var NHISWIR = image.normalizedDifference(['B7', 'B6']).rename(['NHISWIR'])
  var NHISWNIR = image.normalizedDifference(['B6', 'B5']).rename(['NHISWNIR']);
  return image.addBands(NHISWIR).addBands(NHISWNIR)
}
var l8= l8.map(function(image) {
  return ee.Algorithms.Landsat.TOA(image).copyProperties(image, ['system:time_start']);
})
var l8c = l8.map(function(image) {
  return image
    .subtract(273.15)
    .copyProperties(image, ['system:time_start']);
});
var l8r = l8r.map(function(image) {
  return image
    .multiply(1)
    .copyProperties(image, ['system:time_start']);
});
var l8r = l8r.map(addindices)
var Threshold = 50; 
Map.centerObject(geometry, 10);
// mask function:
var maskfunction = function(image){
  //get pixels above the threshold
var thermal01 = image.select(['B10']).subtract(273.15).gt(Threshold);
  //mask those pixels from the image
  image = image.updateMask(thermal01)
  var area = ee.Image.pixelArea();
  var thermalArea = thermal01.multiply(area).rename('thermalArea');
image = image.addBands(thermalArea);
  var stats = thermalArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: geometry, 
    scale: 30,
});
 return image.set(stats);
};
// mask function:
var maskfunction2 = function(image){
  //get pixels above the threshold
  var thermal02 = image.select(['NHISWIR']).gt(0);
  //mask those pixels from the image
  image = image.updateMask(thermal02)
  var area = ee.Image.pixelArea();
   var thermalArea2 = thermal02.multiply(area).rename('thermalArea2');
image = image.addBands(thermalArea2);
  var stats2 = thermalArea2.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: geometry, 
    scale: 30,
});
 return image.set(stats2);
};
var maskfunction3 = function(image){
  //get pixels above the threshold
  var thermal03 = image.select(['B10'])
  //mask those pixels from the image
  image = image.updateMask(thermal03)
  var area = ee.Image.pixelArea();
   //var thermalArea3 = thermal03.multiply(thermal03).multiply(thermal03).multiply(thermal03).multiply(area).multiply(0.000000056703).multiply(0.97).rename('Flux');
var thermalArea3 = thermal03.pow(4).multiply(area).multiply(0.000000056703).multiply(0.97).rename('Flux');
image = image.addBands(thermalArea3);
  var stats3 = thermalArea3.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: geometry, 
    scale: 30,
});
 return image.set(stats3);
};
var collection = l8.map(maskfunction);
print(collection);
var collection2 = l8r.map(maskfunction2);
print(collection2);
var collection3 = l8c.map(maskfunction3);
print(collection3);
// Create a time series chart of maximum temperature detected.
var FlagTemp = ui.Chart.image.seriesByRegion(
    l8c, aoi, ee.Reducer.max(), 'B10', 30, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Temperature over time in regions',
          vAxis: {title: 'Temperature (C)'},
          hAxis: {title: 'Date'},
          lineWidth: 1,
          pointSize: 2,
          series: {
            0: {color: 'FF0000'}
}});
//print(FlagTemp);
  inspectorPanel.widgets().set(1, FlagTemp);
var chart = ui.Chart.image.series({
  imageCollection: collection.select('thermalArea'), 
  region: aoi,
  reducer: ee.Reducer.sum(),
  scale: 30,
})
        .setOptions({
          title: 'Area covered by thermal anomaly',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Area (m2)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          curveType: 'line'
        });
//print(chart);
inspectorPanel.widgets().set(2, chart);
/*var chart2 = ui.Chart.image.series({
  imageCollection: collection2.select('thermalArea2'), 
  region: aoi,
  reducer: ee.Reducer.sum(), 
  scale: 30,
})
        .setOptions({
          title: 'Area covered by thermal anomaly',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Area (m2)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          curveType: 'line'
        });
print(chart2);*/
var chart3 = ui.Chart.image.series({
  imageCollection: collection3.select('Flux'), 
  region: aoi,
  reducer: ee.Reducer.max(),
  scale: 30,
})
        .setOptions({
          title: 'Radiant Flux',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Flux (W)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          curveType: 'line'
        });
//print(chart);
inspectorPanel.widgets().set(3, chart3);
//ui.root.clear();
ui.root.add(inspectorPanel)
Map.addLayer(l8r.max().select(['B7', 'B6', 'B5']).clip(aoi), {min: 0, max: 91}, 'Radiance');
Map.addLayer(l8c.select(['B10']).max().clip(aoi), {min: 0, max: 100}, 'Temperature Max (C)');
//Map.addLayer(collection3.select(['Flux']).max().clip(aoi), {min: 0, max: 100}, 'Flux (W)');
var hotspots = l8c.select(['B10']).max().gt(Threshold)
  .selfMask()
  .rename('hotspots');
/*var radiance = l8r.select(['NHISWNIR']).max().gt(0)
  .selfMask()
  .rename('radiance');*/
// Display the thermal hotspots on the Map.
Map.addLayer(hotspots, {palette: 'FF0000'}, 'Hotspots');
//Map.addLayer(radiance, {palette: 'FF0000'}, 'radiance');