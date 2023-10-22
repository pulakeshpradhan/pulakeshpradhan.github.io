var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-statgis-javascript/assets/blog-ndvi-mallorquin/cv"
    }) || ee.Image("projects/ee-statgis-javascript/assets/blog-ndvi-mallorquin/cv"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-statgis-javascript/assets/blog-ndvi-mallorquin/data"
    }) || ee.FeatureCollection("projects/ee-statgis-javascript/assets/blog-ndvi-mallorquin/data");
var geom = ee.Geometry.Point([-74.851037832872,11.04129590754719]);
var palette = ['green', 'yellow', 'red'];
var vis = {min: 0.0, max: 2.0, palette: palette};
table = table.sort('system:time_start');
// CREATE CHARTS
var raw = ui.Chart.feature.byFeature({
  features: table.select('NDVI', 'system:time_start'),
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Raw data',
  titlePosition: 'none',
  vAxis: {
    title: 'NDVI [Raw Data]', 
    titleTextStyle: {italic: false, bold: true}, 
    viewWindow: {min: 0.0, max: 1.0}
  },
  hAxis: {},
  legend: {position: 'none'},
  colors: ['green']
});
var predicted = ui.Chart.feature.byFeature({
  features: table.select('predicted', 'system:time_start'),
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Linear Trend',
  titlePosition: 'none',
  vAxis: {
    title: 'NDVI [Linear Trend]', 
    titleTextStyle: {italic: false, bold: true}, 
    viewWindow: {min: 0.0, max: 1.0}
  },
  hAxis: {},
  legend: {position: 'none'},
  colors: ['green']
});
var seasonal = ui.Chart.feature.byFeature({
  features: table.select('stational', 'system:time_start'),
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Seasonal Variation',
  titlePosition: 'none',
  vAxis: {
    title: 'NDVI [Variation]', 
    titleTextStyle: {italic: false, bold: true}, 
    viewWindow: {min: 0.0, max: 1.0}
  },
  hAxis: {},
  legend: {position: 'none'},
  colors: ['green']
});
var anomalies = ui.Chart.feature.byFeature({
  features: table.select('anomaly', 'system:time_start'),
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Anomalies',
  titlePosition: 'none',
  vAxis: {
    title: 'NDVI [Anomalies]', 
    titleTextStyle: {italic: false, bold: true}, 
    viewWindow: {min: -0.75, max: 0.25}
  },
  hAxis: {title: 'Time [Y]', titleTextStyle: {italic: false, bold: true}},
  legend: {position: 'none'},
  colors: ['green']
});
// COLORBAR
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
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max-vis.min) / 2+vis.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Relative Standard Deviation of NDVI',
  style: {fontWeight: 'bold'}
});
// ADD WIDGETS
ui.root.setLayout(ui.Panel.Layout.absolute());
var title = ui.Panel({style: {position: 'top-left'}})
              .add(ui.Label({
                value: 'Time Series Analysis of Mangrove Forest in Mallorquin Swamp', 
                style: {fontWeight: 'bold', fontSize: '14pt'}
              }));
var legendPanel = ui.Panel({style: {position: 'bottom-left'}})
                    .add(legendTitle)
                    .add(colorBar)
                    .add(legendLabels);
var charts = ui.Panel({style: {width: '35%', height: '95%', position: 'middle-right'}})
              .add(ui.Label({value: 'Time Series of NDVI in Mangrove Forest', style: {fontWeight: 'bold'}}))
              .add(raw)
              .add(predicted)
              .add(seasonal)
              .add(anomalies);
ui.root.add(title);
ui.root.add(charts);
ui.root.add(legendPanel);
// MAP
Map.addLayer(image, vis, 'CV of Mangrove Forest');
Map.centerObject(geom, 13);
Map.setOptions('SATELLITE');
Map.setControlVisibility(false);