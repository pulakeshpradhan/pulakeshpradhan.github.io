var BelizeRGB = ui.import && ui.import("BelizeRGB", "image", {
      "id": "users/stcarp/Belize2021/Apps/S2A_20181213_L2W_RGB"
    }) || ee.Image("users/stcarp/Belize2021/Apps/S2A_20181213_L2W_RGB"),
    BelizeSPM = ui.import && ui.import("BelizeSPM", "image", {
      "id": "users/stcarp/Belize2021/Apps/S2A_20181213_L2W_SPM"
    }) || ee.Image("users/stcarp/Belize2021/Apps/S2A_20181213_L2W_SPM"),
    SeagrassCover = ui.import && ui.import("SeagrassCover", "image", {
      "id": "users/stcarp/Belize2021/Apps/Turneffe_SeagrassCover"
    }) || ee.Image("users/stcarp/Belize2021/Apps/Turneffe_SeagrassCover"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/stcarp/Belize2021/Apps/cme_logo"
    }) || ee.Image("users/stcarp/Belize2021/Apps/cme_logo");
/**
 * This script builds an Earth Engine Application to visualise, download and query 
 * the data from Carpenter et al., 2021 on seagrass in Turneffe Atoll
 *
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization.
 * 
 * The script requires the following imports:
 * 
 * BelizeRGB        = Sentinel-2 mosaic with Red, Green and Blue bands
 * BelizeSPM        = Suspended Particulate Matter Band
 * SeagrassCover    = Single layer raster of Seagrass cover
 * logo             = Branding logo from CME
 *
 * @created by Stephen Carpenter (National Oceanopgrahy Centre, Southampton)
 */
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
// Define the image
// Create a binary mask.
var mask = SeagrassCover.neq(0);
var masked =SeagrassCover.updateMask(mask) 
m.col = ee.ImageCollection(masked)
// Define info about the bands in this collection that the app will present.
m.imgInfo = {
  bands: {
    'Seagrass Cover': {
      bname: 'b1',
      color: '85c77e',
      vis: {
        min: 0,
        max: 100,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    }
  },
}
var BelizeRGBVisParams = {bands: ['b3', 'b2', 'b1'],
  min: 0.00392556469887495,
  max: 0.22656747698783875
}
var BelizeSPMVisParams = {bands: ['b1'],
  min: 0,
  max: 25
}
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
// Define a control panel for user input.
c.controlPanel = ui.Panel();
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
// Define the main interactive map.
c.map = ui.Map();
// Define an app info widget group.
c.info = {};
// Define Logo
var thumb = ui.Thumbnail({
  image: logo,
  params: {bands: ['b1', 'b2', 'b3'], min:0, max: 255},
});
c.info.titleLabel = ui.Label('Seagrass Cover Turneffe Atoll');
c.info.aboutLabel = ui.Label(
  'Seagrass percentage cover from Carpenter et\nal., 2022, ' +
  'derived from Sentinel-2 imagery\nfrom Turneffe Atoll in Dec 2019.\n\nExplore ' +
  'the data by selecting a point\nand buffer size to visualise ' +
  'seagrass cover\nstatistics within that zone.\n\nThis tool has been created ' + 
  'so that readers\nand coastal managers can integrate the\ndata and shows the ' +
  'potential of the\napplication for future seagrass monitoring\nefforts ' +
  'should numerous layers\nof seagrass be estimated.\n\nExpand the chart once drawning an\narea to ' + 
  'download chart data\n\nCreated by: Stephen Carpenter ', {whiteSpace: 'pre'});
c.info.paperLabel = ui.Label({
  value: 'Link to peer-reviewed paper',
  targetUrl: 'https://www.mdpi.com/2072-4292/14/3/477/htm',
  style: {color: '#00008B', textDecoration: 'underline'}
});
c.info.websiteLabel = ui.Label({
  value: 'Link to Commonwealth Marine Economies Website',
  targetUrl: 'https://projects.noc.ac.uk/cme-programme/',
  style: {color: '#00008B', textDecoration: 'underline'}
});
c.info.panel = ui.Panel([
  c.info.titleLabel, thumb, c.info.aboutLabel,
  c.info.paperLabel, c.info.websiteLabel
]);
// Define a data band selector widget group.
c.selectBand = {};
c.selectBand.label = ui.Label('Seagrass Cover Band');
c.selectBand.selector = ui.Select(Object.keys(m.imgInfo.bands));
c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
// Define a reduction region radius selector widget group (for charting).
c.selectRadius = {};
c.selectRadius.label = ui.Label('Select chart region radius (m)');
c.selectRadius.slider = ui.Slider({
  min: 100,
  max: 1000,
  step: 10
});
c.selectRadius.panel = ui.Panel([c.selectRadius.label, c.selectRadius.slider]);
// Add download links
c.download = {}
c.download.seagrassLabel = ui.Label({
    value: 'Download Seagrass Cover data (.tif, 48.7 MB)',
    targetUrl: 'https://drive.google.com/file/d/1tuyjFZZTp1FdG3tm1r6trKifRUEQS3h5/view?usp=sharing'});
c.download.rgbLabel = ui.Label({
    value: 'Download Sentinel-2 RGB Composite data (.tif, 176.1 MB)',
    targetUrl: 'https://drive.google.com/file/d/1Yl7Wqcu6okzdl9r8MqDXWYlEdg92HlLA/view?usp=sharing'});
c.download.spmLabel = ui.Label({
    value: 'Download Suspended Particulate Matter (SPM) data (.tif, 43.9 MB)',
    targetUrl: 'https://drive.google.com/file/d/1FwGzTI-EaNsoMMxR5JIwW_n8OKZBMMKK/view?usp=sharing'});
c.download.panel = ui.Panel([
  c.download.seagrassLabel, c.download.rgbLabel, c.download.spmLabel
]);
// Define a legend widget group.
c.legend = {};
c.legend.title = ui.Label();
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label('[min]');
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label('[max]');
c.legend.labelPanel = ui.Panel({
  widgets: [
    c.legend.leftLabel,
    c.legend.centerLabel,
    c.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
c.legend.panel = ui.Panel([
  c.legend.title,
  c.legend.colorbar,
  c.legend.labelPanel
]);
// Define a panel for displaying a chart.
c.chart = {};
c.chart.shownButton = ui.Button('Hide chart');
c.chart.container = ui.Panel();  // will hold the dynamically generated chart. 
c.chart.chartPanel = ui.Panel([c.chart.shownButton, c.chart.container]);
// Define a label for displaying the average value in chart.
c.chartAverage = {};
c.chart.shownButton = ui.Button('Hide chart');
c.chart.container = ui.Panel();  // will hold the dynamically generated chart. 
c.chart.chartPanel = ui.Panel([c.chart.shownButton, c.chart.container]);
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectBand.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.selectRadius.panel);
c.controlPanel.add(c.dividers.divider3);
c.controlPanel.add(c.download.panel);
c.map.add(c.legend.panel);
c.map.add(c.chart.chartPanel);
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.aboutText = {
  fontSize: '13px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
// Set widget style.
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.aboutText);
c.info.paperLabel.style().set(s.aboutText);
c.info.paperLabel.style().set(s.smallBottomMargin);
c.info.websiteLabel.style().set(s.aboutText);
c.info.websiteLabel.style().set(s.noTopMargin);
c.selectRadius.slider.style().set(s.stretchHorizontal);
c.selectRadius.label.style().set(s.widgetTitle);
c.selectBand.selector.style().set(s.stretchHorizontal);
c.selectBand.label.style().set(s.widgetTitle);
c.controlPanel.style().set({
  width: '275px',
  padding: '0px'
});
c.map.style().set({
  cursor: 'crosshair'
});
c.map.setOptions('HYBRID');
c.chart.chartPanel.style().set({
  position: 'bottom-right',
  shown: false
});
c.chart.chartPanel.style().set(s.opacityWhiteMed);
c.chart.shownButton.style().set({
  margin: '0px 0px',
});
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
});
c.legend.title.style().set(s.opacityWhiteNone);
c.legend.colorbar.style().set({
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
});
c.legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.leftLabel.style().set(s.opacityWhiteNone);
c.legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel.style().set(s.opacityWhiteNone);
c.legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.rightLabel.style().set(s.opacityWhiteNone);
c.legend.panel.style().set({
  position: 'bottom-left',
  width: '200px',
  padding: '0px'});
c.legend.panel.style().set(s.opacityWhiteMed);
c.legend.labelPanel.style().set(s.opacityWhiteNone);
c.legend.title.setValue(m.imgInfo.bands['Seagrass Cover']);
c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo.bands['Seagrass Cover'].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo.bands['Seagrass Cover'].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo.bands['Seagrass Cover'].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo.bands['Seagrass Cover'].vis.max);
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
function getPropertyValueList(dataModelDict, propertyName){
  // Get a list of values for a specified property name.
  var result = [];
  for (var key in dataModelDict) {
    result.push(dataModelDict[key][propertyName]);
  }
  return result;
}
// Handles drawing the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.selectBand.selector.getValue() + ' (%)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo.bands[c.selectBand.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.max);
}
// Handles year and band selection for new map layer display.
function updateMap() {
  var band = c.selectBand.selector.getValue();
  var img = m.col.select(m.imgInfo.bands[band].bname);
  // Add Seagrass Layer
  var layer = ui.Map.Layer(
    img, m.imgInfo.bands[band].vis, band);
  // Add SPM layer but not visualise  
  var BelizeSPMLayer = ui.Map.Layer(
    BelizeSPM, BelizeSPMVisParams, 'Sentinel-2 SPM' ).setShown(0);
  //Add RGB layer
  var BelizeRGBLayer = ui.Map.Layer(
    BelizeRGB, BelizeRGBVisParams, 'Sentinel-2 RGB' );
  c.map.layers().set(0, BelizeSPMLayer);
  c.map.layers().set(1, BelizeRGBLayer);
  c.map.layers().set(2, layer);
}
// Handles map clicks for charting.
function drawChart(coords) {
  // Get out if call to drawChart did not come from map click and the chart
  // has not been drawn previously.
  if (!coords.lon) {
    return null;
  }
// Get out if the clicked point intersects invalid data.
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  var validDataTest = m.col.first().select(0).reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale: m.col.first().projection().nominalScale()
  });
  if (!validDataTest.get(validDataTest.keys().get(0)).getInfo()) {
    return null;
  }
  // Show the chart panel if this is the first time a point is clicked.
  if (!c.chart.chartPanel.style().get('shown')) {
    c.chart.chartPanel.style().set('shown', true);
  }
  // Show chart if hidden; assuming user wants to see updates to chart.
  if (c.chart.shownButton.getLabel() == 'Show chart') {
    c.chart.container.style().set({shown: true});
    c.chart.shownButton.setLabel('Hide chart');
  }
  var radius = c.selectRadius.slider.getValue();
  var layer = ui.Map.Layer(
    point.buffer(radius), null, 'Chart region');
  c.map.layers().set(3, layer);
  var styleChartAxis = {
    italic: false,
    bold: true
  };
  var styleChartArea = {
    width: '600px',
    height: '255px',
    margin: '0px',
    padding: '0px'
  }; 
  var chart = ui.Chart.image.histogram({
    image: m.col.first().select(
      getPropertyValueList(m.imgInfo.bands, 'bname')),
    region: point.buffer(radius),
    scale: 10,
    minBucketWidth: 5,
    })
    .setSeriesNames(Object.keys(m.imgInfo.bands))
    .setOptions({
    title: 'Cover Statistic: Mean: ' + m.col.first().select(
      getPropertyValueList(m.imgInfo.bands, 'bname')).reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: point.buffer(radius)
      }).get('b1').getInfo() + ' Min: ' + m.col.first().select(
      getPropertyValueList(m.imgInfo.bands, 'bname')).reduceRegion({
      reducer: ee.Reducer.min(),
      geometry: point.buffer(radius)
      }).get('b1').getInfo() + ' Max: ' + m.col.first().select(
      getPropertyValueList(m.imgInfo.bands, 'bname')).reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: point.buffer(radius)
      }).get('b1').getInfo() + ' STD: ' + m.col.first().select(
      getPropertyValueList(m.imgInfo.bands, 'bname')).reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: point.buffer(radius)
      }).get('b1').getInfo(),
    colors: getPropertyValueList(m.imgInfo.bands, 'color'),
    hAxis: {
      title: 'Cover Value',
      titleTextStyle: styleChartAxis
    },
    vAxis: {
      title: 'Count (Pixels)',
      titleTextStyle: styleChartAxis,
    },
    legend: {maxLines: 2},
  });
  chart.style().set(styleChartArea);
  c.chart.container.widgets().reset([chart]);
}
// Handles example location selection.
function zoomToLoc(loc) {
  c.selectExample.descLabel.setValue(m.exLocInfo[loc].desc);
  c.map.setCenter(
    m.exLocInfo[loc].lon + 0.05,  // shift map left to avoid chart.
    m.exLocInfo[loc].lat,
    m.exLocInfo[loc].zoom);
  c.selectRadius.slider.setValue(300);
  var coords = {lon: m.exLocInfo[loc].lon, lat: m.exLocInfo[loc].lat};
  drawChart(coords);
  updateUrlParamChart(coords);
}
function showHideChart() {
  var shown = true;
  var label = 'Hide chart';
  if (c.chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  c.chart.container.style().set({shown: shown});
  c.chart.shownButton.setLabel(label);
}
c.chart.shownButton.onClick(showHideChart);
function updateUrlParamBand(newValue) {
  var bands = getPropertyValueList(m.imgInfo.bands, 'bname');
  ui.url.set('band', m.imgInfo.bands[newValue].bname);
}
c.selectBand.selector.onChange(updateUrlParamBand);
c.selectBand.selector.onChange(updateMap);
c.selectBand.selector.onChange(updateLegend);
function updateUrlParamRadius(newValue) {
  ui.url.set('radius', newValue);
}
c.selectRadius.slider.onChange(updateUrlParamRadius);
c.selectRadius.slider.onChange(function(value) {
  drawChart({lon: ui.url.get('chart_lon'), lat: ui.url.get('chart_lat')})});
function updateUrlParamMap(newMapParams) {
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);
}
c.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100));
function updateUrlParamChart(newChartParams) {
  ui.url.set('chart_lat', newChartParams.lat);
  ui.url.set('chart_lon', newChartParams.lon);
}
c.map.onClick(drawChart);
c.map.onClick(updateUrlParamChart);
// Define a function to generate a download URL of the image for the
// viewport region. 
function downloadImg() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs = {
    name: 'ee_image',
    crs: 'EPSG:5070',
    scale: 30,
    region: viewBounds.toGeoJSONString()
 };
 var url = m.col.getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
/* Example
// Selected year.
m.year = 2020;
*/
function findKey(dataModelDict, propertyName, propertyValue){
  // Find the first dictionary key for a specified property value.
  for (var key in dataModelDict) {
    if (dataModelDict[key][propertyName] == propertyValue) {
      return key;
    }
  }
  return null;
}
// Set model state based on URL parameters or default values.
c.map.setCenter({
  lon: ui.url.get('lon', -87.8712),
  lat: ui.url.get('lat', 17.3754),
  zoom: ui.url.get('zoom', 12)
});
c.selectBand.selector.setValue(
  findKey(m.imgInfo.bands, 'bname', ui.url.get('band', 'b1')), 
  false);
c.selectRadius.slider.setValue(ui.url.get('radius', 30), false);
// Render the map and legend.
updateMap();
updateLegend();
// Render the chart if applicable (chart_lon exists as URL param).
drawChart({lon: ui.url.get('chart_lon'), lat: ui.url.get('chart_lat')});