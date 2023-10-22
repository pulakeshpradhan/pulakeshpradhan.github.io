/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var archetype = ee.Image("users/wesleydbell/App_hardeveld_HC/HC_archetype"),
    landTenure = ee.Image("users/wesleydbell/App_hardeveld_HC/LandTenure"),
    elevation = ee.Image("users/wesleydbell/App_hardeveld_HC/elevation"),
    angle = ee.Image("users/wesleydbell/App_hardeveld_HC/slope"),
    aspect = ee.Image("users/wesleydbell/App_hardeveld_HC/aspect"),
    rainTrend = ee.Image("users/wesleydbell/PhD/CHIRPS_rainTrend/RainfallTrend3"),
    natural = ee.FeatureCollection("users/wesleydbell/PhD/natural_AS");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * UI Pattern Template 
 *  
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 *  
 * @author Tyler Erickson (tylere@google.com)
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
var tenure = landTenure.select('b1').rename('tenure').clip(natural); 
var arch = archetype.select('b1').rename('arch').clip(natural);
var rain = rainTrend.select('scale').rename('rain').clip(natural);
var asp = aspect.select('b1').rename('asp').clip(natural);
var ang = angle.select('b1').rename('ang').clip(natural);
var elev = elevation.select('b1').rename('elev').clip(natural);
var images = {
  'Habitat condition archetype':ee.Image(arch),
  'Land Tenure':ee.Image(tenure),
  'Slope aspect':ee.Image(asp),
  'Elevation':ee.Image(elev),
  'Slope angle':ee.Image(ang),
  'Rainfall Trend':ee.Image(rain)
};
// Create a JSON object for storing the data model.
var m = {};
m.col = ee.Image.cat([arch, tenure, asp, elev, ang, rain]);
m.imgInfo = {
  bands: {
    'Habitat condition archetype': {
      bname: 'arch',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 1,
        palette: ['ffcc99', '009900'] 
      }
    },
    'Land tenure regime': {
      bname: 'tenure',
      color: 'd2cdc0',
      vis: {
        min: 1,
        max: 3,
        palette: ['d5ff80', '006600', '008080']
      }
    },
    'Slope aspect': {
      bname: 'asp',
      color: 'ca9146',
      vis: {
        min: -1,
        max: 1,
        palette: ['006600', 'ffd9b3']
      }
    },
    'Elevation': {
      bname: 'elev',
      color: '85c77e',
      vis: {
        min: 0,
        max: 1000,
        palette: ['00b300', 'ffd9b3']
      }
    },
    'Slope angle': {
      bname: 'ang',
      color: 'fbf65d',
      vis: {
        min: 0,
        max: 80,
        palette: ['ffe699', '0000cc']
      }
    },
    'Rainfall trend': {
      bname: 'rain',
      color: '38814e',
      vis: {
        min: -0.04,
        max: 0.004,
        palette: ['e60000', 'ffe6e6']
      }
    }
  }
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
// Create a JSON object for storing UI components.
var c = {};
c.controlPanel = ui.Panel();
c.map = ui.Map();
c.info = {};
c.info.titleLabel = ui.Label('Hardeveld Habitat Condition Inspector');
c.info.aboutLabel = ui.Label(
  'Product to display habitat condition archetype values for the'+
  'Hardeveld bioregion of the Succulent Karoo biome in South Africa. Values'+
  'for five potential drivers of change for the region can also be displayed.');
c.info.refLabel = ui.Label('For accompanying publication, see:');
c.info.refLabel2 = ui.Label('Bell, W.D., Hoffman, M.T., Visser, V., 2021. Regional land ' + 
  'degradation assessment for dryland environments: The Namaqualand Hardeveld bioregion of '+
  'the Succulent Karoo biome as a case-study. L. Degrad. Dev. 32, 2287–2302. '+
  'https://doi.org/10.1002/ldr.3900');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
]);
c.info.panel2 = ui.Panel([
  c.info.refLabel, c.info.refLabel2
]);
c.selectBand = {};
c.selectBand.label = ui.Label('Select a layer to display:');
c.selectBand.selector = ui.Select(Object.keys(m.imgInfo.bands), null, 'Habitat condition archetype');
c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
c.clickMap = {};
c.clickMap.label = ui.Label('Click on an area of interest on the map');
c.clickMap.HC = ui.Panel([ui.Label('')]);
c.clickMap.LT = ui.Panel([ui.Label('')]);
c.clickMap.SAn = ui.Panel([ui.Label('')]);
c.clickMap.SAs = ui.Panel([ui.Label('')]);
c.clickMap.El = ui.Panel([ui.Label('')]);
c.clickMap.RT = ui.Panel([ui.Label('')]);
c.clickMap.panel = ui.Panel([c.clickMap.label,c.clickMap.HC,c.clickMap.LT,c.clickMap.SAn,c.clickMap.SAs,c.clickMap.El,c.clickMap.RT]);
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
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
c.map.setCenter(17.947913, -30.172441, 8.5);
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectBand.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.clickMap.panel);
c.controlPanel.add(c.dividers.divider3);
c.controlPanel.add(c.info.panel2);
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
// Create a JSON object for defining CSS-like class style properties.
var s = {};  
s.aboutText = {
  fontSize: '14px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
// s.stretchHorizontal = {
//   stretch: 'horizontal'
// };
s.divider = { 
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
c.controlPanel.style().set({
  width: '400px'
});
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.info.aboutLabel.style().set(s.aboutText);
c.selectBand.label.style().set(s.widgetTitle);
// c.selectBand.selector.style().set(s.stretchHorizontal);
c.clickMap.label.style().set(s.widgetTitle);
c.info.refLabel.style().set(s.widgetTitle);
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
c.map.style().set({
  cursor: 'crosshair'
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
function updateMap() {
  var band = c.selectBand.selector.getValue();
  var img = m.col.select(m.imgInfo.bands[band].bname);
  var layer = ui.Map.Layer({
    eeObject: img,
    visParams: m.imgInfo.bands[band].vis,
    name: band
  });
  c.map.layers().set(0, layer);
}
c.selectBand.selector.onChange(updateMap);
function getValues(coords) {
  c.clickMap.HC.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  c.clickMap.LT.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  c.clickMap.SAn.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  c.clickMap.SAs.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  c.clickMap.El.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  c.clickMap.RT.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the habitat condition value.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var HC = arch.select('arch');
  var sampleHC = HC.sample(point, 30);
  var computedHC = sampleHC.first().get('arch');
  // Request the value from the server.
  computedHC.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.HC.widgets().set(0, ui.Label({
      value: 'Habitat condition value: ' + result.toFixed(2) + ' (0 = most degraded, 1 = least degraded)',
    }));
  });
  // Determine the land tenure.
  var LT = tenure.select('tenure');
  var sampleLT = LT.sample(point, 30);
  var computedLT = sampleLT.first().get('tenure');
  // Request the value from the server.
  computedLT.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.LT.widgets().set(0, ui.Label({
      value: 'Land tenure: ' + result.toFixed(0) + ' (1 = Private, 2 = Protected, 3 = Communal)',
    }));
  });
  // Determine the slope angle.
  var SAn = ang.select('ang');
  var sampleSAn = SAn.sample(point, 30);
  var computedSAn = sampleSAn.first().get('ang');
  // Request the value from the server.
  computedSAn.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.SAn.widgets().set(0, ui.Label({
      value: 'Slope angle: ' + result.toFixed(1) + ' degrees',
    }));
  });
  // Determine the slope aspect.
  var SAs = asp.select('asp');
  var sampleSAs = SAs.sample(point, 30);
  var computedSAs = sampleSAs.first().get('asp');
  // Request the value from the server.
  computedSAs.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.SAs.widgets().set(0, ui.Label({
      value: 'Slope aspect: ' + result.toFixed(2) + ' (-1 = South, 1 = North)',
    }));
  });
  // Determine the elevation.
  var El = elev.select('elev');
  var sampleEl = El.sample(point, 30);
  var computedEl = sampleEl.first().get('elev');
  // Request the value from the server.
  computedEl.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.El.widgets().set(0, ui.Label({
      value: 'Elevation: ' + result.toFixed(0) + ' metres',
    }));
  });
  // Determine the rainfall trend.
  var RT = rain.select('rain');
  var sampleRT = RT.sample(point, 30);
  var computedRT = sampleRT.first().get('rain');
  // Request the value from the server.
  computedRT.evaluate(function(result) {
    // When the server returns the value, show it.
    c.clickMap.RT.widgets().set(0, ui.Label({
      value: 'Rainfall trend: ' + result.toFixed(6) + ' mm/yr',
    }));
  });
}
c.map.onClick(getValues);
/*******************************************************************************
* Initialize *
* 
* A section to initialize the app state on load.
* 
* Guidelines:
* 1. At the top, define any helper functions.
* 2. As much as possible, use URL params to initial the state of the app.
******************************************************************************/
updateMap();