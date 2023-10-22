var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -8.930179218815438,
                38.595828235094224
              ],
              [
                -8.930179218815438,
                38.32161090375982
              ],
              [
                -8.525058369206063,
                38.32161090375982
              ],
              [
                -8.525058369206063,
                38.595828235094224
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-8.930179218815438, 38.595828235094224],
          [-8.930179218815438, 38.32161090375982],
          [-8.525058369206063, 38.32161090375982],
          [-8.525058369206063, 38.595828235094224]]], null, false);
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// Select the bands for water detection
var POL = 'VV'; // // Only include the VV polarization, for consistent compositing.
var BANDS = ['B2', 'B3','B4','B8', 'B11', 'NDVI', 'NDWI', 'DBSI'];
var BANDS_viz = [ 'B4', 'B3', 'B2'];
var vizParams = {'bands': 'B4,B3,B2', 'min': 0, 'max': 3000};
// This function adds vegetation, soil and water index bands to images.
// for NDWI, see www.mdpi.com/2072-4292/8/4/354/pdf
var addIndexBands = function(image) {
  // Calculate Bare Soil Index
  var DBSI = image.expression(
    '((SWIR-GREEN)/(SWIR+GREEN)) - ((NIR-RED)/(NIR+RED))', {
     'RED': image.select('B4'),
     'GREEN': image.select('B3'),
     'SWIR': image.select('B11'),
     'NIR': image.select('B8')
  }).rename('DBSI');
  return image
    // NDVI, NDWI, BSI
    .addBands(image.normalizedDifference(['B8',  'B4']).rename('NDVI')) //Normalized Difference Vegetation Index
    //.addBands(image.normalizedDifference(['B8', 'B12']).multiply(10000).int16().rename('NDWI')) //Normalized Difference Water Index
    .addBands(image.normalizedDifference(['B3', 'B8']).rename('NDWI')) //Normalized Difference Water Index
    .addBands(DBSI) //Bare Soil Index
};
// Load Sentinel 2 image collections
var SENTINEL_2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  //.filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 37))
                  .filter(ee.Filter.eq('MGRS_TILE', '29SNC'))
                  .filterBounds(AOI)
                  //.select(BANDS)
                  .map(addIndexBands)
                  .select(BANDS)
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  'RGB-high-Tide': getSentinel_2_RGB('2020-02-19')[1],
  //'RGB-mid-Tide': getSentinel_2_RGB('2020-03-15')[1],
  'RGB-low-Tide':  getSentinel_2_RGB('2020-03-10')[1],
  'NDWI-high-Tide': getSentinel_2_NDWI('2020-02-19')[1],
  //'NDWI-mid-Tide':  getSentinel_2_NDWI('2020-03-15')[1],
  'NDWI-low-Tide':  getSentinel_2_NDWI('2020-03-10')[1],
  'NDVI-high-Tide': getSentinel_2_NDVI('2020-02-19')[1],
  //'NDVI-mid-Tide':  getSentinel_2_NDVI('2020-03-15')[1],
  'NDVI-low-Tide':  getSentinel_2_NDVI('2020-03-10')[1],
  'DBSI-high-Tide': getSentinel_2_DBSI('2020-02-19')[1],
  //'DBSI-mid-Tide': getSentinel_2_BSI('2020-03-15')[1],
  'DBSI-low-Tide':  getSentinel_2_DBSI('2020-03-10')[1],
};
//================================================================
var data = {
  //'RGB-high-Tide': getSentinel_2_RGB('2020-02-19')[0],
  'NDWI-high-Tide': getSentinel_2_NDWI('2020-02-19')[0],
  'NDWI-low-Tide':  getSentinel_2_NDWI('2020-03-10')[0],
  'NDVI-high-Tide': getSentinel_2_NDVI('2020-02-19')[0],
  'NDVI-low-Tide':  getSentinel_2_NDVI('2020-03-10')[0],
  'DBSI-low-Tide':  getSentinel_2_DBSI('2020-03-10')[0],
  'DBSI-high-Tide': getSentinel_2_DBSI('2020-02-19')[0],
};
// Composeite of Sentinel 2 images
function getSentinel_2_RGB(date) {
  var date = ee.Date(date);
  var sentinel2 = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .mean(); 
  return  [sentinel2, sentinel2.clip(AOI).visualize({'bands': 'B4,B3,B2', 'min': 0, 'max': 3000})];
}
// Sentinel 2 NDWI
function getSentinel_2_NDWI(date) {
  var date = ee.Date(date);
  var sentinel2_NDWI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('NDWI')
                  .mean();
  var water = sentinel2_NDWI//.gt(-0.05)
  return  [water, water.clip(AOI).visualize({min: -1, max: 1,palette:['white','4285F4']})]; // ffff00
}
// Sentinel 2 NDVI
function getSentinel_2_NDVI(date) {
  var date = ee.Date(date);
  var sentinel2_NDVI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('NDVI')
                  .mean();
  var vegetation = sentinel2_NDVI//.gt(0.31)
  return  [vegetation, vegetation.clip(AOI).visualize({palette:['white','59b300']})]; //4285F4
}
// Sentinel 2 DBSI
function getSentinel_2_DBSI(date) {
  var date = ee.Date(date);
  var sentinel2_DBSI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('DBSI')
                  .mean();
  var bare_soil = sentinel2_DBSI//.gt(0.1)
  return  [bare_soil, bare_soil.clip(AOI).visualize({ min:-2, max: 2, palette: ['white','gray', 'red']})]; //4285F4
}
//==========================================================================================================
// Interactive exploration of population and elevation.
// Allows filtering based on constraints and a popup info window.
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(-8.73, 38.50,  12);
//map.style().set('cursor', 'crosshair');
// Define some constants.
var RGB_high_Tide = 'RGB-high-Tide' 
var RGB_low_Tide = 'RGB-low-Tide' 
var NDWI_HIGH = 'NDWI-high-Tide' //'Elevation';
var NDWI_LOW =  'NDWI-low-Tide'
var NDVI_HIGH = 'NDVI-high-Tide'     //'Slope';
var NDVI_LOW = 'NDVI-low-Tide'
var DBSI_HIGH = 'DBSI-high-Tide';
var DBSI_LOW = 'DBSI-low-Tide';
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
// Create an empty list of filter constraints.
var constraints = [];
// Load the WorldPop 2015 UN-adjusted population density estimates.
// (Note that these are only available for some countries, e.g. not the US.)
var rgb_high_viz = images['RGB-high-Tide' ]
var rgb_low_viz = images['RGB-low-Tide' ]
var ndwi_high = data[NDWI_HIGH] 
var ndwi_high_viz = images[NDWI_HIGH] //ndwi_high.visualize({min: -1, max: 1,palette:['white','4285F4']});
var ndwi_low = data[NDWI_LOW] 
var ndwi_low_viz = images[NDWI_LOW]
var ndvi_high = data[NDVI_HIGH]
var ndvi_high_viz = ndvi_high.visualize({min: -1, max: 1,palette:['white','green']});
var ndvi_low = data[NDVI_LOW]
var ndvi_low_viz = ndvi_low.visualize({min: -1, max: 1,palette:['white','green']});
var dbsi_high = data[DBSI_HIGH]
var dbsi_high_viz = images[DBSI_HIGH] //dbsi_high.visualize({min:-2, max:2, palette: ['white','gray', 'red']});
var dbsi_low = data[DBSI_LOW]
var dbsi_low_viz = images[DBSI_LOW] //dbsi_high.visualize({min:-2, max:2, palette: ['white','gray', 'red']});
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [RGB_high_Tide, RGB_low_Tide, NDWI_HIGH, NDWI_LOW, NDVI_HIGH, NDVI_LOW, DBSI_HIGH, DBSI_LOW],
  value: RGB_high_Tide,
  onChange: redraw,
});
panel.add(ui.Label('Display Value:')).add(select);
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({style: {shown: false}});
map.add(inspector);
// Add a label and select to enable adding a new filter.
panel.add(ui.Label('Filter by Value:'));
var constraint = ui.Select({
  items: [NDWI_HIGH, NDWI_LOW,  NDVI_HIGH, NDVI_LOW, DBSI_HIGH, DBSI_LOW],
  placeholder: '[Choose a Variable...]',
  onChange: selectConstraint,
});
panel.add(constraint);
// Create a function that configures a new constraint.
function addConstraint(name, image, defaultValue) {
  panel.add(ui.Label('Filter by ' + name + ':'));
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  // Create a greater-than / less-than selector.
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN],
    value: GREATER_THAN,
    onChange: redraw,
  });
  subpanel.add(mode);
  // Create a textbox for the filter threshold.
  var input = ui.Textbox({
    value: defaultValue,
    style: {width: '100px'},
    onChange: redraw,
  });
  subpanel.add(input);
  panel.add(subpanel);
  // Add this constraint to the global list so we can access the
  // constraints from the redraw() function in the future.
  constraints.push({
    image: image,
    mode: mode,
    value: input,
  });
  redraw();
}
// Create a function that adds a constraint of the requested type.
function selectConstraint(name) {
  if (name == DBSI_HIGH) {
    addConstraint(name, dbsi_high, -2);
  } else if (name  == DBSI_LOW) {
    addConstraint(name, dbsi_low, -2);
  } else if (name == NDWI_HIGH) {
    addConstraint(name, ndwi_high, -1);
  } else if (name == NDWI_LOW) {
    addConstraint(name, ndwi_low, -1);
  } else if (name == NDVI_HIGH) {
    addConstraint(name, ndvi_high, -1);
  //}  else if (name == NDVI_LOW) {
  //  addConstraint(name, ndvi_low, -1);
  }
  constraint.setValue(null);
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == NDWI_HIGH) {
    image = ndwi_high_viz;
  } else if (layer == NDWI_LOW) {
    image = ndwi_low_viz;
  } else if (layer == NDVI_HIGH) {
    image = ndvi_high_viz;
  //}  else if (layer == NDVI_LOW) {
  //  image = ndvi_low_viz;
  } else if (layer == DBSI_HIGH) {
    image = dbsi_high_viz;
  } else if (layer == DBSI_LOW) {
    image = dbsi_low_viz;
  } else if (layer == RGB_high_Tide) {
    image = rgb_high_viz
  } else if (layer == RGB_low_Tide) {
    image = rgb_low_viz
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
  map.addLayer(image, {}, layer);
}
// Invoke the redraw function once at start up to initialize the map.
redraw();