/**
 * GEE app for the submitted manuscript "Quantifying Uncertainty in High 
 * Resolution Biophysical Variable Retrieval with Machine Learning"
 * @author Laura Martínez-Ferrer (laura.martinez-ferrer@uv.es) 
 * 
 * Based on the GEE app example of:
 * Tyler Erickson (tylere@google.com)
 * Justin Braaten (braaten@google.com)
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
var bioNet= require('users/ispguv/BioNet:Code/bioNet_nested.js').bioNet;
var eeuu = ee.FeatureCollection('projects/KalmanGFwork/Table_data/conus');
//The errors are scalled between 0-255 (byte) which corresponds with  0-5000 to reduce storage needs
var scaleLandsat=function(img){
   var scaled=img.select(['P.*']).toFloat().divide(255).multiply(5000); //to scale the error of kongthe bands
   var refl=img.select(['B.*']).toFloat()//.divide(10000);
   var y=img.get('year');
   var m=img.get('month');
   var d = ee.Date.fromYMD(y,m,15);
   var doy= d.getRelative('day', 'year');
   return refl.addBands(scaled,null,true).set({'month':m,'year':y,'DOY':doy});
};
var GFLandsat = ee.ImageCollection("projects/KalmanGFwork/GFLandsat_V1");
GFLandsat=GFLandsat.map(scaleLandsat);
// Define a JSON object for storing model info (app data).
var m = {};
// Define info about the bands in this collection that the app will present.
m.imgInfo = {
  bands: {
    'LAI': {
      bnameprimary: 'LAI',
      bname: 'LAI',
      color: '85c77e',
      vis: {
        min: 0,
        max: 6,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    'LAI uncertainty': {
      bnameprimary: 'LAI',
      bname: 'LAItotal',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 0.9,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'FAPAR': {
      bnameprimary: 'FAPAR',
      bname: 'FAPAR',
      color: '85c77e',
      vis: {
        min: 0,
        max: 1,
        palette: ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c']
      }
    },
    'FAPAR uncertainty': {
      bnameprimary: 'FAPAR',
      bname: 'FAPARtotal',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 0.1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'FVC': {
      bnameprimary: 'FVC',
      bname: 'FVC',
      color: '85c77e',
      vis: {
        min: 0,
        max: 1,
        palette: ['#ffffcc','#c2e699','#78c679','#31a354','#006837']
      }
    },
    'FVC uncertainty': {
      bnameprimary: 'FVC',
      bname: 'FVCtotal',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 0.15,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'CWC': {
      bnameprimary: 'CWC',
      bname: 'CWC',
      color: '85c77e',
      vis: {
        min: 0,
        max: 0.2,
        palette: ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']
      }
    },
    'CWC uncertainty': {
      bnameprimary: 'CWC',
      bname: 'CWCtotal',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 0.1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    }
  },
  years: {
    '2009': {
      name: '2009',
      val: 2009
    },
    '2010': {
      name: '2010',
      val: 2010
    },
    '2011': {
      name: '2011',
      val: 2011
    },
    '2012': {
      name: '2012',
      val: 2012
    },
    '2013': {
      name: '2013',
      val: 2013
    },
    '2014': {
      name: '2014',
      val: 2014
    },
    '2015': {
      name: '2015',
      val: 2015
    },
    '2016': {
      name: '2016',
      val: 2016
    },
    '2017': {
      name: '2017',
      val: 2017
    },
    '2018': {
      name: '2018',
      val: 2018
    },
    '2019': {
      name: '2019',
      val: 2019
    }
  },
  months: {
    '1': {
      name: 'January',
      val: 1
    },
    '2': {
      name: 'February',
      val: 2
    },
    '3': {
      name: 'March',
      val: 3
    },
    '4': {
      name: 'April',
      val: 4
    },
    '5': {
      name: 'May',
      val: 5
    },
    '6': {
      name: 'June',
      val: 6
    },
    '7': {
      name: 'July',
      val: 7
    },
    '8': {
      name: 'August',
      val: 8
    },
    '9': {
      name: 'September',
      val: 9
    },
    '10': {
      name: 'October',
      val: 10
    },
    '11': {
      name: 'November',
      val: 11
    },
    '12': {
      name: 'December',
      val: 12
    }
  },
  startYear: 2009,
  endYear: 2019,
  startMonth: 1,
  endMonth: 12,
};
/*******************************************************************************
 * Components *
 * 
 * A section to define the widgets that will compose your app.
 * 
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize them in the initialization section.
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
// Define the main interactive map.
c.map = ui.Map();
// Define an app info widget group.
c.info = {};
c.info.titleLabel = ui.Label('Estimating biophysical parameters and realistic uncertainties with BioNet');
c.info.aboutLabel = ui.Label(
  'BioNet computes high spatial resolution products (30 m) of several key parameters to quantify the terrestrial biosphere: LAI, FAPAR, FVC, and CWC.'+
  ' Artificial neural networks (ANN) were trained on radiative transfer model inversion to predict biophysical variables at 30 meters spatial resolution along with their associated realistic uncertainty bars.' +
  'It consists of a general and scalable approach to combine epistemic (model) and aleatoric (input) uncertainties by exploiting Monte Carlo (MC) dropout techniques and propagating input uncertainties through the model.'+
  'This app relies on gap-free reflectance data computed with the HISTARFM algorithm to provide continuous reflectances and and their associated uncertainties.'
)
c.info.paperLabel = ui.Label({
  value: 'For further details read the RSE paper by Martínez-Ferrer et al. (2022)',
  targetUrl: 'https://www.sciencedirect.com/science/article/pii/S0034425722003091'
});
c.info.websiteLabel = ui.Label({
  value: 'Image and Signal Processing Group',
  targetUrl: 'https://isp.uv.es/'
});
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel,
  c.info.paperLabel, c.info.websiteLabel
]);
// Define a data year selector widget group.
c.selectYear = {};
c.selectYear.label = ui.Label('Year');
c.selectYear.selector = ui.Select(Object.keys(m.imgInfo.years));
c.selectYear.panel = ui.Panel([c.selectYear.label, c.selectYear.selector]);
// Define a data month selector widget group.
c.selectMonth = {};
c.selectMonth.label = ui.Label('Month');
c.selectMonth.slider = ui.Slider({
  min: m.imgInfo.startMonth,
  max: m.imgInfo.endMonth,
  step: 1
});
c.selectMonth.panel = ui.Panel([c.selectMonth.label, c.selectMonth.slider]);
c.selectData = {};
c.selectData.panel = ui.Panel([c.selectYear.panel, c.selectMonth.panel], ui.Panel.Layout.Flow('horizontal'));
// Define a data band selector widget group.
c.selectBand = {};
c.selectBand.label = ui.Label('Select layer');
c.selectBand.selector = ui.Select(Object.keys(m.imgInfo.bands));
c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
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
// c.chart = {};
// c.chart.shownButton = ui.Button('Hide chart');
// c.chart.container = ui.Panel();  // will hold the dynamically generated chart. 
// c.chart.chartPanel = ui.Panel([c.chart.shownButton, c.chart.container]);
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
c.controlPanel.add(c.selectData.panel);
c.map.add(c.legend.panel);
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
// Define CSS-like class style properties for widgets; reusable styles.
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
c.selectYear.selector.style().set(s.stretchHorizontal);
c.selectYear.label.style().set(s.widgetTitle);
c.selectMonth.slider.style().set(s.stretchHorizontal);
c.selectMonth.label.style().set(s.widgetTitle);
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
 * 2. For single-use callbacks, define them just prior to assignment. If multiple
 *    callbacks are required for a widget, add them consecutively to maintain
 *    order; single-use followed by multi-use.
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
  c.legend.title.setValue(c.selectBand.selector.getValue());
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
  var year  = c.selectYear.selector.getValue();
  var month = c.selectMonth.slider.getValue();
  var band  = c.selectBand.selector.getValue();
  // var img = m.col.filter(ee.Filter.eq('year', parseInt(year, 10))).filter(ee.Filter.eq('month', parseInt(month, 10)))
  //   .select(m.imgInfo.bands[band].bname);
  var img=bioNet.bioNetcompute(GFLandsat
  .filter(ee.Filter.eq('year', parseInt(year, 10)))
  .filter(ee.Filter.eq('month', parseInt(month, 10))),m.imgInfo.bands[band].bnameprimary)
  .select([m.imgInfo.bands[band].bname]);  
  // .filter(ee.Filter.eq('year', parseInt(year, 10)))
  // .filter(ee.Filter.eq('month', parseInt(month, 10))),'LAI');  
  var layer = ui.Map.Layer(
    img.first().clip(eeuu), m.imgInfo.bands[band].vis, band + ', ' + year + ', ' + month);
  c.map.layers().set(0, layer);
}
//Update year
function updateUrlParamYear(newValue) {
  var bands = getPropertyValueList(m.imgInfo.years, 'val');
  ui.url.set('year', m.imgInfo.years[newValue].bname);
}
c.selectYear.selector.onChange(updateUrlParamYear);
c.selectYear.selector.onChange(updateMap);
//Update month
function updateUrlParamMonth(newValue) {
  var bands = getPropertyValueList(m.imgInfo.months, 'val');
  ui.url.set('month', m.imgInfo.months[newValue].bname);
}
c.selectMonth.slider.onChange(updateUrlParamMonth);
c.selectMonth.slider.onChange(updateMap);
//Update band
function updateUrlParamBand(newValue) {
  var bands = getPropertyValueList(m.imgInfo.bands, 'bname');
  ui.url.set('band', m.imgInfo.bands[newValue].bname);
}
c.selectBand.selector.onChange(updateUrlParamBand);
c.selectBand.selector.onChange(updateMap);
c.selectBand.selector.onChange(updateLegend);
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
// c.map.onClick(drawChart);
c.map.onClick(updateUrlParamChart);
/*******************************************************************************
 * Initialize *
 * 
 * A section to initialize the app state on load.
 * 
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initialize the state of the app.
 ******************************************************************************/
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
  lon: ui.url.get('lon', -95.0),
  lat: ui.url.get('lat', 39.0),
  zoom: ui.url.get('zoom', 5)
});
c.selectYear.selector.setValue(
  findKey(m.imgInfo.years, 'val', ui.url.get('year', 2016)), 
  false);
c.selectMonth.slider.setValue(
  findKey(m.imgInfo.months, 'val', ui.url.get('month', 7)), 
  false);  
c.selectBand.selector.setValue(
  findKey(m.imgInfo.bands, 'bname', ui.url.get('band', 'LAI')), 
  false);
// Render the map and legend.
updateMap();
updateLegend();
// Render the chart if applicable (chart_lon exists as URL param).
// drawChart({lon: ui.url.get('chart_lon'), lat: ui.url.get('chart_lat')});