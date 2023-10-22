var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//Indeks Kekeringan Tanamman 
//Input Data NDDI
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
            .map(function(image){return image})
var NDDI = dataset.map(function(image) {
  var NDDI2 = image.expression(
    '(((band5 -  band4)/(band5 + band4))-((band5 -  band6)/(band5 + band6)))/(((band5 -  band4)/(band5 + band4))+((band5 -  band6)/(band5 + band6)))', {
      'band4': image.select('SR_B4'),
      'band6': image.select('SR_B6'),
      'band5': image.select('SR_B5')
})//.rename('NDDI1');
var NDDI3 = NDDI2.focal_median(1000, 'circle', 'meters')
.rename('NDDI1');
return image.addBands(NDDI3);
});
//visualisasi rata-rata NDDI 2019-2020
var NDDI_Vis = NDDI
.filterDate('2019-01-01','2020-01-31')
// .filterBounds(geometry)
.select('NDDI1')
.mean();
//Pembuatan inspector tool Pemanggil data Time Series
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
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {
    point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Pilih Titik.'),
      ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
//Pembuatan Data Tampilan Grafik Time Series
var chartPanel = ui.Panel({
  style:
      {height: '250px', width: '450px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNDDITimeSeries() {
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
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: NDDI,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDDI1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Indeks Kekeringan Tanaman',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Indeks Kekeringan Tanaman'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNDDITimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNDDITimeSeries, 500));
//Judul Aplikasi
 var legendTitle1 = ui.Label({
  value: 'Monitoring Indeks Kekeringan Tanaman',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
Map.add(legendTitle1);
//Simbologi Peta Tampilan
var nddiVis = {
  min: -1,
  max: 1,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(NDDI_Vis, nddiVis,"NDDI Rata-rata");
//Membuat tampilan simbologi di peta
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(nddiVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(nddiVis.min, {margin: '4px 8px'}),
    ui.Label(
        (nddiVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(nddiVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Rata-rata NDDI ',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
  width: '200px',
  position: 'top-left'
});
Map.add(legendPanel);