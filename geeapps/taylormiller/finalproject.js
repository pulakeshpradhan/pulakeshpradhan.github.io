var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8"
        ],
        "min": 6314,
        "max": 13960,
        "gamma": 1.423
      }
    }) || {"opacity":1,"bands":["B8"],"min":6314,"max":13960,"gamma":1.423},
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    table = ui.import && ui.import("table", "table", {
      "id": "TIGER/2018/Counties"
    }) || ee.FeatureCollection("TIGER/2018/Counties"),
    mangrove2000 = ui.import && ui.import("mangrove2000", "imageCollection", {
      "id": "LANDSAT/MANGROVE_FORESTS"
    }) || ee.ImageCollection("LANDSAT/MANGROVE_FORESTS"),
    ccdcFromAsset = ui.import && ui.import("ccdcFromAsset", "image", {
      "id": "users/taylormiller/GEOL_7600_CCDC_V1"
    }) || ee.Image("users/taylormiller/GEOL_7600_CCDC_V1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// Load a Landsat 8 image, select the panchromatic band.
//var image = ee.Image('LANDSAT/LC08/C02/T1/LC08_044034_20140318').select('B8');
Map.setCenter(-80.898651, 25.286615, 8)
var mapTools = require('users/fitoprincipe/geetools:tools')
//why isn't it working
var floridaImage = imageCollection.select('SR_B5', 'SR_B4')
    .filterDate('2020-06-01', '2022-02-01')
    .filter(ee.Filter.lte('CLOUD_COVER', 25))//filtering for cloud cover metadata =< 25%
    .median();
var ndvi = floridaImage.normalizedDifference(['SR_B5','SR_B4']) 
                .rename('NDVI'); 
//print(ndvi)
Map.addLayer(ndvi, {min:0, max:1, palette:['blue', 'tan', 'green']}, 'NDVI Image',false)  //min and max == range of NDVI 
Map.addLayer(mangrove2000, [], "Mangrove", false)
//print(mangrove2000)
//Map.addLayer(image, imageVisParam, "image")
/*
==========================Canny Edge testing
// Perform Canny edge detection and display the result.
var canny1 = ee.Algorithms.CannyEdgeDetector({
  image: ndvi, threshold: 1, sigma: 2
});
var canny10 = ee.Algorithms.CannyEdgeDetector({
  image: ndvi, threshold: 10, sigma: 1
});
var canny100 = ee.Algorithms.CannyEdgeDetector({
  image: image, threshold: 100, sigma: 2
});
var canny500_1 = ee.Algorithms.CannyEdgeDetector({
  image: image, threshold: 500, sigma: 1
});
var canny500_2 = ee.Algorithms.CannyEdgeDetector({
  image: image, threshold: 500, sigma: 1.5
});
var canny1000 = ee.Algorithms.CannyEdgeDetector({
  image: image, threshold: 1000, sigma: 2
});
//Map.setCenter(-122.054, 37.7295, 10);
//Map.addLayer(canny, {}, 'canny');
Map.addLayer(canny1, {}, 'canny1', false);
Map.addLayer(canny10, {}, 'canny10', false);
Map.addLayer(canny100, {}, 'canny100', false);
Map.addLayer(canny500_1, {}, 'canny500_1', false);
Map.addLayer(canny500_2, {}, 'canny500_2', false);
Map.addLayer(canny1000, {}, "canny1000", false);
// Perform Hough transform of the Canny result and display.
var hough = ee.Algorithms.HoughTransform(canny10, 256, 600, 100);
Map.addLayer(hough, {}, 'hough');
*/
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
var removeLayer = function(ndvi) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(ndvi)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
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
/*
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
*/
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var floridaImage = imageCollection.select('SR_B5', 'SR_B4')
    .filterDate('2020-06-01', '2022-02-01')
    .filter(ee.Filter.lte('CLOUD_COVER', 25))//filtering for cloud cover metadata =< 25%
    .median();
  var ndvi = floridaImage.normalizedDifference(['SR_B5','SR_B4']) 
                .rename('NDVI');
  var CCDCfromAsset = ccdcFromAsset.selfMask()
Map.addLayer(CCDCfromAsset.select('tBreak'), {min:2000,max:2021,palette:['blue','orange','red']}, "Max Time Loss - from Asset")
//Chart of Time Break
var chart = ui.Chart.image.histogram({
  image: CCDCfromAsset.select('tBreak'),
  region: aoi,
  scale: 30,
  maxBuckets: 22,
  minBucketWidth: 1,
  //maxRaw: ,
  //maxPixels
})
  .setSeriesNames(['Year of Loss'])
  .setOptions({
    title: 'Annual Loss in Woody Wetlands',
    hAxis: {title: 'Year of Loss'},
    vAxis: {title: 'Count'}
})
  function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  }
  var ndviPolygon = ndvi.clip(aoi)
  /*
  function clp(img) {
  return img.clip(mangrove2000)
  }
  var clippedMangrove = mangrove2000.map(clp)
  */
  //var mangrovePolygon = mangrove2000.map(function(mangrove2000){return image.clip(aoi)});
  Map.addLayer(ndviPolygon, {min:0, max:1, palette:['blue', 'tan', 'green']}, "Image")
  //Map.addLayer(mangrove2000, ['red'], "Mangrove Forest Extent (2000)")
  clearGeometry()
  // Chart NDVI time series for the selected area of interest.
  /*
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: ndvi,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: "NDVI",
                    scale: scale,
                    //xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI (x1e4)'},
                    series: {0: {color: '23cba7'}}
                  });
*/
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  //point: '📍',
};
var checkbox = ui.Checkbox('Show Mangrove 2000 layer', true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
Map.addLayer(mangrove2000);
print(checkbox);
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
/*    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),*/
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label('4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);