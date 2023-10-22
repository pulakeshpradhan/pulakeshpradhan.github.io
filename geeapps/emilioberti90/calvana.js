var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                11.066824131878734,
                44.02127742762206
              ],
              [
                11.066824131878734,
                43.84424990773081
              ],
              [
                11.24947183695686,
                43.84424990773081
              ],
              [
                11.24947183695686,
                44.02127742762206
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[11.066824131878734, 44.02127742762206],
          [11.066824131878734, 43.84424990773081],
          [11.24947183695686, 43.84424990773081],
          [11.24947183695686, 44.02127742762206]]], null, false);
var wdpa = ee.FeatureCollection("users/emilioberti90/calvana-wdpa");
var displayArea = ee.Feature(wdpa.first()).buffer(1000);
var camera = ee.FeatureCollection("users/emilioberti90/camera");
Map.centerObject(camera, 12);
// urban areas ---------------------------------------------
// Urban footprint as vector geometry
var urban = ee.Image("DLR/WSF/WSF2015/v1")
  .addBands(ee.Image("DLR/WSF/WSF2015/v1"))
  .reduceToVectors({
    geometry: roi,
    scale: 10,
    geometryType: "polygon",
    reducer: ee.Reducer.max()
});
// distance from urban as raster
var urbanDistance = urban.distance().clip(roi);
var pal = ["#A50F15", "#DE2D26", "#FB6A4A", "#FCAE91", "#FEE5D9"];
Map.addLayer(urbanDistance, {min: 0, max: 3320, palette: pal}, "Distance from urban area", false, 0.5);
// DEM --------------------------
var dem = ee.Image("NASA/NASADEM_HGT/001").select("elevation").clip(roi);
var pal = ["#dcfffc", "#c5e3be", "#e3ff00", "#ffcc78", "#fff8eb"];
Map.addLayer(dem, {min: 0, max: 1000, palette: pal},"Elevation (m)", false, 0.75);
// slope
var terrain = ee.Algorithms.Terrain(dem);
var slope = terrain.select("slope");
var aspect = terrain.select("aspect");
// vegetation classification ------------------
function prepSrL8(image) { // scale and mask Landsat 8 surface reflectance images.
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0); //remove clouds
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // scale bands
  var getFactorImg = function(factorNames) {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var scaleImg = getFactorImg([
    'REFLECTANCE_MULT_BAND_.|TEMPERATURE_MULT_BAND_ST_B10']);
  var offsetImg = getFactorImg([
    'REFLECTANCE_ADD_BAND_.|TEMPERATURE_ADD_BAND_ST_B10']);
  var scaled = image.select('SR_B.|ST_B10').multiply(scaleImg).add(offsetImg);
  // Replace original bands with scaled bands and apply masks.
  return image.addBands(scaled, null, true)
    .updateMask(qaMask).updateMask(saturationMask);
}
// Make a cloud-free Landsat 8 surface reflectance composite.
var image = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterDate('2022-05-01', '2022-07-31')
  .map(prepSrL8)
  .median()
  .clip(roi);
// Use these bands for prediction.
var bands = ['SR_B2', //blue
             'SR_B3', //green
             'SR_B4', //red
             'SR_B5', //NIR
             'SR_B6', //shortwave IR 1
             'SR_B7', //shortwave IR 2
             'ST_B10'];
Map.addLayer(image, {min: 0, max: 0.21, bands: ['SR_B4', 'SR_B3', 'SR_B2']}, "Landsat RGB", false);
// combine all featurescollections
var clip = function(feature) {
  return (feature.intersection(displayArea));
};
var lc = ee.FeatureCollection("users/emilioberti90/lc-geoscopio");
var lc_rast = ee.Image("users/emilioberti90/geoscopio-lc").clip(roi);
var pal = ["#8DD3C7", "#FFFFB3", "#BEBADA", "#FB8072", "#80B1D3",
           "#FDB462", "#B3DE69", "#FCCDE5", "#D9D9D9", "#BC80BD",
           "#CCEBC5"];
var geoscopio_names = ["agriculture", "broadleaves", "conifers", "grassland", "human",
                       "mixed forest", "new forest", "roads", "rocks", "sparse vegetation",
                       "water"];
// var empty = ee.Image().byte();
// var fills = empty.paint({
//   featureCollection: lc,
//   color: 'lc_id',
// });
// Map.addLayer(fills, {palette: pal, min: 1, max: 11}, "Geoscopio land-cover 2013", false);
// add legend
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px',
    width: '300 px'
  }
});
var legendTitle = ui.Label({
  value: ' Geoscopio land-cover 2013',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
      });
};
legend.add(legendTitle);
for (var i = 0; i < 11; i++) {
  legend.add(makeRow(pal[i], geoscopio_names[i]));
}
Map.add(legend);
Map.addLayer(lc_rast, {min: 1, max: 11, palette: pal}, "Geoscopio land-cover 2013", false);
// // Random Forest classifier ----------------
// var training = ee.FeatureCollection("users/emilioberti90/lc-training");
// var training = image.select(bands).sampleRegions({
//   collection: training,
//   properties: ['lc_id'],
//   scale: 30
// });
// var testing = ee.FeatureCollection("users/emilioberti90/lc-testing");
// var testing = image.select(bands).sampleRegions({
//   collection: testing,
//   properties: ['lc_id'],
//   scale: 30
// });
// var classifier = ee.Classifier.smileRandomForest(100).train({
//   features: training,
//   classProperty: 'lc_id',
//   inputProperties: bands
// });
// // Classify the input imagery.
// var classified = image.select(bands)
//   .clip(roi)
//   .classify(classifier);
// // Define a palette for the Land Use classification.
// Map.addLayer(classified.clip(displayArea), {min: 1, max: 11, palette: pal}, "Classified vegetation", false);
// // // Get a confusion matrix representing resubstitution accuracy.
// var validation = testing.classify(classifier);
// var validationAccuracy = validation.errorMatrix('lc_id', 'classification');
// print('Training error matrix: ', classifier.confusionMatrix());
// print('Training accuracy: ', classifier.confusionMatrix().accuracy());
// print('Validation error matrix', validationAccuracy);
// print('Validation accuracy', validationAccuracy.accuracy());
// extract values for cameras -----------
function bufferPoints(radius, bounds) {
  return function(pt) {
    pt = ee.Feature(pt);
    return bounds ? pt.buffer(radius).bounds() : pt.buffer(radius);
  };
}
function zonalStats(ic, fc, params) {
  // Initialize internal params dictionary.
  var _params = {
    reducer: ee.Reducer.mean(),
    scale: null,
    crs: null,
    bands: null,
    bandsRename: null,
    imgProps: null,
    imgPropsRename: null,
    datetimeName: 'datetime',
    datetimeFormat: 'YYYY-MM-dd HH:mm:ss'
  };
  // Replace initialized params with provided params.
  if (params) {
    for (var param in params) {
      _params[param] = params[param] || _params[param];
    }
  }
  // Set default parameters based on an image representative.
  var imgRep = ic.first();
  var nonSystemImgProps = ee.Feature(null)
    .copyProperties(imgRep).propertyNames();
  if (!_params.bands) _params.bands = imgRep.bandNames();
  if (!_params.bandsRename) _params.bandsRename = _params.bands;
  if (!_params.imgProps) _params.imgProps = nonSystemImgProps;
  if (!_params.imgPropsRename) _params.imgPropsRename = _params.imgProps;
  // Map the reduceRegions function over the image collection.
  var results = ic.map(function(img) {
    // Select bands (optionally rename), set a datetime & timestamp property.
    img = ee.Image(img.select(_params.bands, _params.bandsRename))
      .set(_params.datetimeName, img.date().format(_params.datetimeFormat))
      .set('timestamp', img.get('system:time_start'));
    // Define final image property dictionary to set in output features.
    var propsFrom = ee.List(_params.imgProps)
      .cat(ee.List([_params.datetimeName, 'timestamp']));
    var propsTo = ee.List(_params.imgPropsRename)
      .cat(ee.List([_params.datetimeName, 'timestamp']));
    var imgProps = img.toDictionary(propsFrom).rename(propsFrom, propsTo);
    // Subset points that intersect the given image.
    var fcSub = fc.filterBounds(img.geometry());
    // Reduce the image by regions.
    return img.reduceRegions({
      collection: fcSub,
      reducer: _params.reducer,
      scale: _params.scale,
      crs: _params.crs
    })
    // Add metadata to each feature.
    .map(function(f) {
      return f.set(imgProps);
    });
  }).flatten().filter(ee.Filter.notNull(_params.bandsRename));
  return results;
}
if (false) {
  var pts = camera.map(bufferPoints(15, false));
  var rasters = ee.ImageCollection(ee.Image.cat(dem,
                                                slope,
                                                urbanDistance,
                                                lc_rast));
  var params = {
    bands: [0, 1, 2, 3],
    bandsRename: ['elevation', 'slope', 'distance_urban_areas', 'landcover']
  };
  // Extract zonal statistics per point per image.
  var ptStats = zonalStats(rasters, pts, params);
  // Export to drive
  Export.table.toDrive({
    collection: ptStats,
    description: 'calvana-camera',
    fileFormat: 'CSV',
    selectors: ['SITO', 'GPS_X', 'GPS_Y',
                'elevation',
                'slope',
                'distance_urban_areas',
                'landcover']
  });
}
// // add vector geometries on map
// Map.addLayer(urban, {}, "Urban footprint", false, 0.5);
Map.addLayer(urban, {}, "Urban areas", false, 0.8);
Map.addLayer(wdpa, {color: "blue"}, "Protected area", false, 0.5);
camera = camera.map(bufferPoints(50, false));
Map.addLayer(camera, {color: "purple"}, "Cameras", true, 0.5);