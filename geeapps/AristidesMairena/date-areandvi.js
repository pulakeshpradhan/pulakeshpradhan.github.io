var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var mapPanel = ui.Map();
var layers = mapPanel.layers();
var drawingTools = mapPanel.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers2 = drawingTools.layers();
  layers2.get(0).geometries().remove(layers2.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
var count = 0;
function drawPolygon() {
  count+=1;
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
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
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left', width: '30%'},
  layout: null,
});
function clearAfterDraw(){
  clearGeometry()
}
//Map.add(controlPanel);
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '350px', position: 'bottom-right', shown: false}
});
//Map.add(chartPanel);
// set initial dates
var Start_period = ee.Date('2019-01-01')
//var Start_period = ee.Date(start)
var End_period = ee.Date('2020-07-31')
var count2 = 0;
var geometry;
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
  // Chart NDVI time series for the selected area of interest.
  var s2a = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(aoi)
                  .filterDate('2020-07-01', '2020-07-31')
                  .select('B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
  var s2a_median = s2a.median()
                      .clip(aoi);
  //Print your Image to your console tab to inspect it
  //print(s2a_median, 'Median reduced Image Sask July 2020');
  //Add your Image as a map layer
  var visParams = {'min': 400,'max': [4000,3000,3000],   'bands':'B8,B4,B3'};
  //layers.add(s2a_median, visParams, 'S2 Sask July 2020 Median');
  var s2medianvis = s2a_median.visualize(visParams);
  var s2medianLayer = ui.Map.Layer(s2medianvis).setName('S2 Sask July 2020 Median');
  layers.add(s2medianLayer, '2020 july s2 Median');
  //Step 4: Calculate the NDVI manually: NDVI = (B8 - B4) / (B8 + B4)
  var nir = s2a_median.select('B8');
  var red = s2a_median.select('B4');
  var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
  // Function to calculate and add an NDVI band
  var addNDVI = function(image) {
  return image.addBands(image.normalizedDifference(['B8', 'B4']));
  };
  // Add NDVI band to image collection
  var s2a = s2a.map(addNDVI);
  // Extract NDVI band and create NDVI median composite image
  var NDVI = s2a.select(['nd']);
  var NDVImed = NDVI.median(); //I just changed the name of this variable ;)
  // Display the result.
  var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
  //layers.add(ndvi, ndviParams, 'NDVI SASK July 2020');
  var ndviVis = ndvi.visualize(ndviParams);
  var ndviLayer = ui.Map.Layer(ndviVis).setName('S2 Sask July 2020 NDVI');
  layers.add(ndviLayer, '2020 july s2 NDVI');
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: s2a,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'nd',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  //chartPanel.widgets().reset([chart]);
  controlPanel.widgets().set(7, chart);
  //controlPanel.widgets().set(3, chartPanel);
  geometry = aoi;
  clearAfterDraw()
  //slider stuff
  if(count2 == 0){
    ee.Dictionary({start: Start_period, end: End_period})
    .evaluate(renderSlider) 
  }
  count2++;
  function renderSlider(dates) {
    var slider = ui.DateSlider({
      start: dates.start.value, 
      end: dates.end.value, 
      period: 30, // Every 30 days
      onChange: renderDateRange
    })
    mapPanel.add(slider)
  }
  function renderDateRange(dateRange) {
    print(dateRange.start())
    print(dateRange.end())
    s2a = ee.ImageCollection('COPERNICUS/S2_SR')
                    .filterBounds(geometry)
                    .filterDate(dateRange.start(), dateRange.end())
                    .select('B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12')
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
    //layers().reset() 
    //print(s2a, 'Image Collection saskatoon');
    //Map.centerObject(s2a,9)
    var s2a_median = s2a.median()
                      .clip(geometry);
     var s2medianvis = s2a_median.visualize(visParams);
      var s2medianLayer = ui.Map.Layer(s2medianvis).setName('S2 Sask Median');
      layers.add(s2medianLayer, '2020 july s2 Median');
    //layers.add(s2a_median, visParams, 'S2 Sask Median');
    //Step 4: Calculate the NDVI manually: NDVI = (B8 - B4) / (B8 + B4)
    var nir = s2a_median.select('B8');
    var red = s2a_median.select('B4');
    var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
    //layers.add(ndvi, ndviParams, 'NDVI SASK V1');
      var ndviVis = ndvi.visualize(ndviParams);
  var ndviLayer = ui.Map.Layer(ndviVis).setName('S2 Sask NDVI');
  layers.add(ndviLayer, '2020 july s2 NDVI');
    // Add NDVI band to image collection
    var s2a = s2a.map(addNDVI);
    // Extract NDVI band and create NDVI median composite image
    var NDVI = s2a.select(['nd']);
    //var NDVImed = NDVI.median(); //I just changed the name of this variable ;)
    var chart = ui.Chart.image
                      .seriesByRegion({
                        imageCollection: s2a,
                        regions: geometry,
                        reducer: ee.Reducer.mean(),
                        band: 'nd',
                        scale: scale,
                        xProperty: 'system:time_start'
                      })
                      .setOptions({
                        titlePostion: 'none',
                        legend: {position: 'none'},
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'NDVI'},
                        series: {0: {color: '23cba7'}}
                      });
      // Replace the existing chart in the chart panel with the new chart.
      //chartPanel.widgets().reset([chart]);
      controlPanel.widgets().set(7, chart);
      clearAfterDraw()
  }//close renderDateChange
}
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(controlPanel, mapPanel));