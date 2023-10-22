var study_area = ui.import && ui.import("study_area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                122.55156014308677,
                10.828975352707147
              ],
              [
                122.55156014308677,
                10.759839549635286
              ],
              [
                122.65910599574791,
                10.759839549635286
              ],
              [
                122.65910599574791,
                10.828975352707147
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[122.55156014308677, 10.828975352707147],
          [122.55156014308677, 10.759839549635286],
          [122.65910599574791, 10.759839549635286],
          [122.65910599574791, 10.828975352707147]]], null, false),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.62445808061698,
            10.775766235270595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.6464231134545,
            10.783186056174582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.63663841496817,
            10.777579049310045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.65472651101273,
            10.776017934212183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.64764547921341,
            10.796632762623537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.63246190507154,
            10.76847322515397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.60830673554275,
            10.777100222802984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.64213171462026,
            10.807125514234253
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": "water"
      },
      "color": "#44fbff",
      "mode": "Feature",
      "shown": true,
      "locked": true
    }) || 
    /* color: #44fbff */
    /* locked: true */
    ee.Feature(
        ee.Geometry.MultiPoint(
            [[122.62445808061698, 10.775766235270595],
             [122.6464231134545, 10.783186056174582],
             [122.63663841496817, 10.777579049310045],
             [122.65472651101273, 10.776017934212183],
             [122.64764547921341, 10.796632762623537],
             [122.63246190507154, 10.76847322515397],
             [122.60830673554275, 10.777100222802984],
             [122.64213171462026, 10.807125514234253]]),
        {
          "class": "water",
          "system:index": "0"
        }),
    forest = ui.import && ui.import("forest", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.60948982272697,
            10.807893664669116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61747207675529,
            10.803509607583457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.56586309715925,
            10.807366226198727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.57433879567276,
            10.763633388340581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.63971609349258,
            10.807156997145537
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#60ac13",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #60ac13 */
    /* locked: true */
    ee.Geometry.MultiPoint(
        [[122.60948982272697, 10.807893664669116],
         [122.61747207675529, 10.803509607583457],
         [122.56586309715925, 10.807366226198727],
         [122.57433879567276, 10.763633388340581],
         [122.63971609349258, 10.807156997145537]]),
    builtup = ui.import && ui.import("builtup", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.58233156351838,
            10.787842880393484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.59035673289094,
            10.786409542349523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.58194532542024,
            10.766426412651736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.57688131480012,
            10.76136718214159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61103785713611,
            10.822919837937668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61198199470935,
            10.82232970970242
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#f61ba4",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #f61ba4 */
    /* locked: true */
    ee.Geometry.MultiPoint(
        [[122.58233156351838, 10.787842880393484],
         [122.59035673289094, 10.786409542349523],
         [122.58194532542024, 10.766426412651736],
         [122.57688131480012, 10.76136718214159],
         [122.61103785713611, 10.822919837937668],
         [122.61198199470935, 10.82232970970242]]),
    rice = ui.import && ui.import("rice", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.58631861885486,
            10.792147317744494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.58603966911731,
            10.795203633754621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.59765576715485,
            10.799612572036253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.60608863229767,
            10.80056106366096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.57947480119311,
            10.801365907573917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.5773290339812,
            10.798098877011887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.58432423509204,
            10.798119954742296
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffdb0b",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #ffdb0b */
    /* locked: true */
    ee.Geometry.MultiPoint(
        [[122.58631861885486, 10.792147317744494],
         [122.58603966911731, 10.795203633754621],
         [122.59765576715485, 10.799612572036253],
         [122.60608863229767, 10.80056106366096],
         [122.57947480119311, 10.801365907573917],
         [122.5773290339812, 10.798098877011887],
         [122.58432423509204, 10.798119954742296]]),
    grassland = ui.import && ui.import("grassland", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.59829406340312,
            10.794031969785193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.59878758986186,
            10.792408958136253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61456030999626,
            10.790948603542766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61754292642082,
            10.790063316466792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.61203888144719,
            10.800169840007516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.6191060900263,
            10.822427528704578
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ef82ff",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #ef82ff */
    /* locked: true */
    ee.Geometry.MultiPoint(
        [[122.59829406340312, 10.794031969785193],
         [122.59878758986186, 10.792408958136253],
         [122.61456030999626, 10.790948603542766],
         [122.61754292642082, 10.790063316466792],
         [122.61203888144719, 10.800169840007516],
         [122.6191060900263, 10.822427528704578]]),
    baresoil = ui.import && ui.import("baresoil", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.5910687125295,
            10.781241074678215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.59240939827728,
            10.799689853226065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.57421329232025,
            10.782321392865736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.5685484668808,
            10.795221364654562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.58636020517693,
            10.779002112225836
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#a8ff0f",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #a8ff0f */
    /* locked: true */
    ee.Geometry.MultiPoint(
        [[122.5910687125295, 10.781241074678215],
         [122.59240939827728, 10.799689853226065],
         [122.57421329232025, 10.782321392865736],
         [122.5685484668808, 10.795221364654562],
         [122.58636020517693, 10.779002112225836]]);
/* ************************************************************************ /
 *                                                                          *
 *            GISCI 341                                                     *
 *            TIME SERIES ANALYSIS IN GOOGLE EARTH ENGINE                   *
 *                                                                          *
 * Purpose: Supervised Classification using Time-Series Sentinel-2 Imagery  *
 * Authors: Daniel Marc G. dela Torre & Jay Gao                             *
 * Date:    25 Nov 2020                                                     *
 *                                                                          *
 * ************************************************************************ */
// NOTE: YOU WILL NEED TO CHANGE SEVERAL PARTS OF THE CODE, THIS WILL BE 
// PRECEDED BY 'CHANGE THE VARIABLES' HERE AND FOLLOWED BY 'END'
// Purpose: Process Sentinel-2 Imagery and Plot Time Series for Farm Points
// Author: Daniel dela Torre
// Date: 01 Feb 2020
//-------------------------------------------------------------------------------
/** Equation for NDVI (Tucker, 1979)
 * @param   {ee.Image} Sentinel-2 image
 * @return  {ee.Image} Sentinel-2 image with additional NDVI band
 */
function ndvi(image){
  var vi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  return image.addBands(vi).copyProperties(image, ['system:time_start']);
}
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//-------------------------------------------------------------------------------
// Start Date
var startDate = '2019-01-01';
// End Date
var endDate = '2020-01-01';
/**
 * Function to aggregate into n-day composites
 */
function getWeeklySentinelComposite(date) {
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2') // Select the Data Collection
                      .filterBounds(study_area) // Set the geographical bounds for filtering
                      .filterDate(date, date.advance(daysToAdvance, 'day')) // select days to advance
  // Function  to map gcvi and cloud masking
  var vi = sentinel2.map(maskS2clouds).map(ndvi);
  // Select the max
  // var composite = vi.select(['GCVI','LSWI','NDVI']).max()
  var composite = vi.select(['NDVI']).max()
                      .set(   // Set some properties info...
                        'system:time_start', date.millis(), 
                        'dateYMD', date.format('YYYY-MM-dd'), 
                        'numbImages', sentinel2.size());
  return composite;
}
var daysToAdvance = 30.4;
// Generate list of weeks/days to iterate over
var weekDifference = ee.Date(startDate).advance(daysToAdvance, 'day').millis().subtract(ee.Date(startDate).millis());
// var weekDifference = ee.Date(startDate).advance(daysToAdvance, 'month').millis().subtract(ee.Date(startDate).millis());
var listMap = ee.List.sequence(ee.Date(startDate).millis(), ee.Date(endDate).millis(), weekDifference);
// Create ImageCollection from images from listMap
var sentinel2_IC = ee.ImageCollection.fromImages(listMap.map(function(dateMillis){
  var date = ee.Date(dateMillis);
  return getWeeklySentinelComposite(date);
}));
// print('Sentinel2-IC',sentinel2_IC);
// ==== ONLY FOR RGB VIS====
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate, endDate)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 0.2,
  bands: ['B4', 'B3', 'B2'],
  //gamma: [0.9, 1.1, 1]
};
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '350px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Chart Inspector',
    style: {fontSize: '32px', fontWeight: 'bold', color: 'red'}
  }),
  ui.Label({
    value: 'UOA GISCI 341',
    style: {fontWeight: 'bold'}
  }),
  ui.Label('Click on the map to plot the NDVI Time-Series of a pixel.'),
  ui.Label('You can choose to add an NDVI satellite image for additional reference.')
]);
panel.add(intro);
// Make a button widget for NDVI.
var checkbox = ui.Checkbox({
  label: 'Show Median Sentinel NDVI Image',
  value: false,
  onChange: function(checked) {
    Map.layers().get(0).setShown(checked);}
});
panel.add(checkbox);
// Make a button widget for RGB.
var checkbox1 = ui.Checkbox({
  label: 'Show Median Sentinel True Colour Image',
  value: false,
  onChange: function(checked) {
    Map.layers().get(1).setShown(checked);}
});
panel.add(checkbox1);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(5)),
  lat.setValue('lat: ' + coords.lat.toFixed(5));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an VI chart of monthly aggregates.
  var viChart = ui.Chart.image.series(
    sentinel2_IC.select(['NDVI']), 
    point, ee.Reducer.mean(), 
    10);
  viChart.setChartType('LineChart');
  viChart.setOptions({
      title: 'Monthly',
      vAxis: {title: 'NDVI', viewWindow: {min:-0.2, max: 1.0}},
      hAxis: {title: 'Date', format: 'MMM', gridlines: {count: 12}},
    });
    panel.widgets().set(4, viChart);
  });
Map.style().set('cursor', 'crosshair');
// Add NDVI Layer
Map.addLayer(
        sentinel2_IC.median().clip(study_area),
        {min: -0.1, max: 1, palette:['blue','yellow','green']},
        'NDVI', 
        false);
// Add RGB Layer
Map.addLayer(
  dataset.median().clip(study_area), 
  rgbVis, 
  'True Colour', 
  false);
// Take all tools off the map except the zoom and mapTypeControl tools.
Map.setControlVisibility(
    {all: true, drawingToolsControl: true, zoomControl: true, mapTypeControl: true, layerList:true});
// Center the map
Map.setCenter(122.606,10.79534,13);
// Draw Study area bounds and center screen on study area
Map.addLayer(ee.Image().paint(study_area, 0, 2), {palette:['red']}, "Study Area", true); // Draw boundary
Map.setOptions('HYBRID'); // Select a HYBRID satellite/road basemap
// Add the panel to the ui.root.
ui.root.insert(0, panel);
/* ==== END  OF SCRIPT ================================================= */