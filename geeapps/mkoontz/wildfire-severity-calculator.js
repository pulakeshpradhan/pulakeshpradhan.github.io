var sn = ee.FeatureCollection("users/mkoontz/SierraEcoregion_Jepson");
var perim = ee.FeatureCollection("users/mkoontz/fire17_1");
// var perim = ee.FeatureCollection("users/mkoontz/fire20_1_sn_ypmc");
var mixed_conifer = ee.Image("users/mkoontz/mixed_conifer");
var elev = ee.Image("USGS/SRTMGL1_003");
var gridmet = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET");
var l4sr = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR");
var l5sr = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR");
var l7sr = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR");
var l8sr = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
// HELPER FUNCTIONS
// Generally for gathering and masking imagery, and not for
// calculating modeling variables
// This function appends a 'tag' string to a list (for instance band names) and returns a new list
// Example use is adding "_post" after all default bandnames for a post fire image
var paste = function(list1, tag) {
  return list1.map(function(x) {return ee.String(x).cat(ee.String('_')).cat(ee.String(tag))});
};
// The mask_cloud_water_snow() function masks any clouds in the images by only using
// pixels that meet the pixel_qa criteria (determined using bitwise AND
// operations-- 32 because a 1 in the 32's place means it's a cloud and
// 8 because a 1 in the 8's place means it's a cloud shadow)
// Note it returns a function, which returns an image.
var mask_cloud_water_snow = function(resample_method)
{ // Use the "closure in JavaScript technique to pass arguments to a mapped function
  // mentioned here: https://groups.google.com/d/msg/google-earth-engine-developers/jB342iaPeX4/KXJYReksDQAJ
  // demonstrated here: https://code.earthengine.google.com/80b35b7e358e94664dc6107e75a4a43a
  return function(img) {
    // Each pixel gets a 1 if it is NOT a cloud, and a 0 if it IS a cloud
    var cloudMask = img.select('pixel_qa').bitwiseAnd(32).eq(0);
    // Each pixel gets a 1 if it is NOT a cloud shadow, and a 0 if it IS a cloud shadow
    var cloudShadowMask = img.select('pixel_qa').bitwiseAnd(8).eq(0);
    // Each pixel gets a 1 if it is NOT water, and a 0 if it IS water
    var waterMask = img.select('pixel_qa').bitwiseAnd(4).eq(0);
    // Each pixel gets a 1 if it is NOT snow, and a 0 if it IS snow
    var snowMask = img.select('pixel_qa').bitwiseAnd(16).eq(0);
    // For the combined mask (1 is a pixel we want to keep, and a 0 is one we want to mask),
    // the pixel must both NOT be a cloud AND NOT be a cloud shadow (a 1 for both of the
    // above masks) in order to be a valid pixel.
    var mask = cloudMask.and(cloudShadowMask).and(waterMask).and(snowMask);
    // Return an interpolated image with all cloud and cloud shadow pixels masked.
    // Use interpolation because CBI on-the-ground plots are unlikely to
    // lie exactly at the center of a pixel. See Cansler MSc thesis (2011)
    // and Parks et al. (2014)
    // Interpolate (resample) for on-the-ground data (cbi plot) validation
    // Don't interpolate for analyses with only remote-sensed variables
    var export_img = ee.Algorithms.If(resample_method === 'none',
                                        img.updateMask(mask),
                                        img.resample(resample_method).updateMask(mask));     
    return(export_img);
  };
};
//
// END mask_cloud_water_snow()
//
// merge_collections() returns an ImageCollection of merged Surface Reflectance Landsat products
// including Landsat 4, 5, 7, and 8 for continuous coverage from August 22, 1982 to present
// Spatial and temporal filtering happens per fire perimeter to reduce computation load
// That is, for each fire perimeter (with its associated alarm date), the 4 individual collections
// are heavily subsetted prior to merging. Often, this should result in some of those individual
// collections having no images (for instance, Landsat 8 imagery doesn't begin until April 11, 2013 so
// fires prior to this date will work with a mega Image Collection that doesn't have any images from
// Landsat 8.
// Additionally, Landsat 8 images will have their bands renamed so they match up with the wavelengths
// from the L4, 5, and 7 sensors
// From the Google Earth Engine metadata:
// This dataset is the atmospherically corrected surface reflectance from the Landsat 5 ETM sensor.
// These data have been atmospherically corrected using LEDAPS, and includes a cloud, shadow, water 
// and snow mask produced using CFMASK, as well as a per-pixel saturation mask.
var merge_collections = function(start, end, bounds, sats) {
  // As of 2018-01-24, data are available between 
  //  August 22, 1982 and December 14, 1993
  // https://explorer.earthengine.google.com/#detail/LANDSAT%2FLT04%2FC01%2FT1_SR
  // l4 is the Landsat 4 SR product filtered around the feature's 
  // alarm date IF Landsat 4 is part of the desired final product
  // If not, a blank image collection will be returned
  var l4 = ee.Algorithms.If(sats.contains('4'),
          l4sr
            .filterDate(start, end)
            .filterBounds(bounds)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa']),
          ee.ImageCollection([]));
  // Explicit cast to Image Collection
  l4 = ee.ImageCollection(l4);
  // As of 2018-01-24, data are available between 
  //  January 1, 1984 to May 5, 2012
  // https://explorer.earthengine.google.com/#detail/LANDSAT%2FLT05%2FC01%2FT1_SR
  // l5 is the Landsat 5 SR product filtered around the feature's 
  // alarm date IF Landsat 5 is part of the desired final product
  // If not, a blank image collection will be returned
  var l5 = ee.Algorithms.If(sats.contains('5'),
          l5sr
            .filterDate(start, end)
            .filterBounds(bounds)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa']),
          ee.ImageCollection([]));
  // Explicit cast to Image Collection
  l5 = ee.ImageCollection(l5);
  // As of 2018-01-24, data are available between 
  //  January 1, 1999 and December 21, 2017
  // https://explorer.earthengine.google.com/#detail/LANDSAT%2FLE07%2FC01%2FT1_SR
  // l7 is the Landsat 7 SR product filtered around the feature's 
  // alarm date IF Landsat 7 is part of the desired final product
  // If not, a blank image collection will be returned
  // Original band names
  // Name	Scale Factor	Description
  // B1	0.0001	Band 1 (blue) surface reflectance, 0.45-0.52 μm
  // B2	0.0001	Band 2 (green) surface reflectance, 0.52-0.60 μm
  // B3	0.0001	Band 3 (red) surface reflectance, 0.63-0.69 μm
  // B4	0.0001	Band 4 (near infrared) surface reflectance, 0.77-0.90 μm
  // B5	0.0001	Band 5 (shortwave infrared 1) surface reflectance, 1.55-1.75 μm
  // B6	0.1	Band 6 brightness temperature (Kelvin), 10.40-12.50 μm
  // B7	0.0001	Band 7 (shortwave infrared 2) surface reflectance, 2.08-2.35 μm
  // sr_atmos_opacity	0.001	Atmospheric opacity; < 0.1 = clear; 0.1 - 0.3 = average; > 0.3 = hazy
  // sr_cloud_qa		Cloud quality attributes, see SR Cloud QA table. Note: pixel_qa is likely to present more accurate results than sr_cloud_qa for cloud masking. See page 23 in the LEDAPS product guide.
  // pixel_qa		Pixel quality attributes generated from the CFMASK algorithm, see Pixel QA table
  // radsat_qa		Radiometric saturation QA, see Radiometric Saturation QA table
  var l7 = ee.Algorithms.If(sats.contains('7'),
          l7sr
            .filterDate(start, end)
            .filterBounds(bounds)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa']),
          ee.ImageCollection([]));
  // Explicit cast to Image Collection
  l7 = ee.ImageCollection(l7);
  // As of 2018-01-24, data are available between 
  //  April 11, 2013 and January 3, 2018
  // https://explorer.earthengine.google.com/#detail/LANDSAT%2FLC08%2FC01%2FT1_SR
  // l8 is the Landsat 8 SR product filtered around the feature's 
  // alarm date IF Landsat 8 is part of the desired final product
  // If not, a blank image collection will be returned
  // Original band names
  // Name	Scale Factor	Description
  // B1	0.0001	Band 1 (Ultra Blue) surface reflectance, 0.435-0.451 μm
  // B2	0.0001	Band 2 (Blue) surface reflectance, 0.452-0.512 μm
  // B3	0.0001	Band 3 (Green) surface reflectance, 0.533-0.590 μm
  // B4	0.0001	Band 4 (Red) surface reflectance, 0.636-0.673 μm
  // B5	0.0001	Band 5 (Near Infrared) surface reflectance, 0.851-0.879 μm
  // B6	0.0001	Band 6 (Shortwave Infrared 1) surface reflectance, 1.566-1.651 μm
  // B7	0.0001	Band 7 (Shortwave Infrared 2) surface reflectance, 2.107-2.294 μm
  // B10	0.1	Band 10 brightness temperature (Kelvin), 10.60-11.19 μm
  // B11	0.1	Band 11 brightness temperature (Kelvin), 11.50-12.51 μm
  // sr_aerosol		Aerosol attributes, see Aerosol QA table
  // pixel_qa		Pixel quality attributes, see Pixel QA table
  // radsat_qa		Radiometric saturation QA, see Radsat QA table
  var l8 = ee.Algorithms.If(sats.contains('8'),
          l8sr
            .filterDate(start, end)
            .filterBounds(bounds)
            .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']),
          ee.ImageCollection([]));
  // Explicit cast to Image Collection
  l8 = ee.ImageCollection(l8);
  var raw = ee.ImageCollection(l4.merge(l5.merge(l7.merge(l8))));
  return raw;
};
// create_kernel() returns an equally-weighted square ee.kernel with the specified number of pixel radius
//
// Create a kernel of a given pixel radius (number of concentric rings around focal pixel)
// Importantly, we also give 0 weight to the focal pixel.
// A radius of 1 pixel yields a 3x3 pixel kernel with a weight of 0 at the center pixel and
// a weight of 1/8 at every other pixel
// A radius of 2 pixels yields a 5x5 pixel kernel with a weight of 0 at the center pixel and
// a weight of 1/24 at every other pixel
var create_kernel = function(pixel_radius) {
  var pixel_diameter = pixel_radius.multiply(2).add(1);
  var weight_val = ee.Number(1).divide(pixel_diameter.pow(2).subtract(ee.Number(1)));
  var weights = ee.List.repeat(ee.List.repeat(weight_val, pixel_diameter), pixel_diameter);
  var mid_row = ee.List.repeat(weight_val, pixel_radius)
    .cat([0])
    .cat(ee.List.repeat(weight_val, pixel_radius));
  weights = weights.set(pixel_radius, mid_row);
  var kernel = ee.Kernel.fixed({
    height: pixel_diameter,
    width: pixel_diameter,
    weights: weights
  });
  return kernel;
};
// map_resample applies the user-specified resampling method to each
// image in a collection. It must be called via 'map'
// The function returns a function, which returns an image
// I just use this for resampling the GridMet collection because I already include
// resampling in the cloud mask function which is called on the raw Landsat
// images.
var map_resample = function(resample_method) {
  return function(img) {
    return img.resample(resample_method);
  };
};
// get_preFireGridmet() returns a collection of raw daily GRIDMET images for gridmet_timeWindow number
// of days before the fire. This collection can then be used to calculate ERC just before the fire
// and temperature/precipitation accumulation for a bit longer before the fire
var get_preFireGridmet = function(feature, gridmet_timeWindow, resample_method) {
  var fireDate = ee.Date(feature.get('alarm_date'));
  var firePerim = feature.geometry();
  // Prefire image collection derivecd by gathering all images 
  // "gridmet_timeWindow" days before the fire. 
  // These variables define the time period to grab those images. 
  var prestart = fireDate.advance(gridmet_timeWindow * -1, 'day');
  var preend = fireDate.advance(-1, 'day');
  // Here is where we subset the Gridmet imagery. We filter the whole collection
  // to just the images that were taken between "gridmet_timeWindow" days before the 
  // fire started and 1 day before the fire started.
  var preFireGridmetCol = 
    gridmet
      .filterDate(prestart, preend)
      .filterBounds(firePerim);
  preFireGridmetCol = ee.Algorithms.If(resample_method === 'none',
                                        preFireGridmetCol,
                                        preFireGridmetCol.map(map_resample(resample_method)));
  // Return the preFire image collection
  return ee.ImageCollection(preFireGridmetCol);
};
// get_preFireRaw() will take in a feature (which has the fire perimeter
// and the fire date) and will return the collection of pre-fire images
// to use for calculating all pre-fire metrics
var get_preFireRaw = function(feature, timeWindow, resample_method, sats) {
  var fireDate = ee.Date(feature.get('alarm_date'));
  var firePerim = feature.geometry();
  // Prefire image collection derivecd by gathering all images "timeWindow"
  // (a global variable) days before the fire. 
  // These variables define the time period to grab those images. 
  var preend = fireDate.advance(-1, 'day');
  var prestart = preend.advance(timeWindow * -1, 'day');
  var preFireCollection = merge_collections(prestart, preend, firePerim, sats);
  // We apply the cloud mask over each of those images
  var preFire = preFireCollection.map(mask_cloud_water_snow(resample_method));
  // Return the preFire image collection
  return ee.ImageCollection(preFire);
};
// get_postFireRaw() returns a post fire raw image collection. This time we look 1 year after the 
// prefire image collection.
var get_postFireRaw = function(feature, timeWindow, resample_method, sats) {
  var fireDate = ee.Date(feature.get('alarm_date'));
  var firePerim = feature.geometry();
  // Need to get pre fire reference date in order to advance to 1 year later
  var preend = fireDate.advance(-1, 'day');
  var prestart = preend.advance(timeWindow * -1, 'day');
  // Post fire image comes from median of images exactly 1 year after pre-fire images
  var poststart = prestart.advance(1, 'year');
  var postend = preend.advance(1, 'year');
  var postFireCollection = merge_collections(poststart, postend, firePerim, sats);
   // We apply the cloud mask over each of those images
  var postFire = 
    postFireCollection.map(mask_cloud_water_snow(resample_method));
  return ee.ImageCollection(postFire);
};
// This function returns the median values for pre fire bands 1 through 7
var get_preFireRaw_median = function(feature, timeWindow, resample_method, sats) {
  var preFraw_median = get_preFireRaw(feature, timeWindow, resample_method, sats)
                  .median();
  preFraw_median = ee.Algorithms.If( preFraw_median.bandNames(),
                                    ee.Image(preFraw_median)
                                      .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], paste(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], 'pre')), 
                                    null);
  return ee.Image(preFraw_median);
};
// This function returns the median values for post fire bands 1 through 7
var get_postFireRaw_median = function(feature, timeWindow, resample_method, sats) {
  var postFraw_median = get_postFireRaw(feature, timeWindow, resample_method, sats)
                    .median();
  postFraw_median = ee.Algorithms.If(postFraw_median.bandNames(),
                                    ee.Image(postFraw_median)
                                      .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], paste(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], 'post')), 
                                    null);
  return ee.Image(postFraw_median);
};
///////////////////
/* NDVI */
///////////////////
// get_NDVI() returns the normalized difference vegetation index (NDVI) for each pixel of an image
var get_NDVI = function(img) {
  var ndvi = img.normalizedDifference(['B4', 'B3']).rename('ndvi');
  return ee.Image(ndvi);
};
// get_preFndvi() maps over the collection of pre-fire images, calculates NDVI on each, and takes the median for each pixel
var get_preFndvi = function(feature, timeWindow, resample_method, sats) {
  var preFndvi = get_preFireRaw(feature, timeWindow, resample_method, sats)
                  .map(get_NDVI)
                  .median();
  preFndvi = ee.Algorithms.If( preFndvi.bandNames(),
                                    ee.Image(preFndvi), 
                                    null);
  return ee.Image(preFndvi);
};
// get_postFndvi() maps over the collection of post-fire images, calculates NDVI on each, and takes the median for each pixel
var get_postFndvi = function(feature, timeWindow, resample_method, sats) {
  var postFndvi = get_postFireRaw(feature, timeWindow, resample_method, sats)
                    .map(get_NDVI)
                    .median();
  postFndvi = ee.Algorithms.If( postFndvi.bandNames(),
                                    ee.Image(postFndvi), 
                                    null);
  return ee.Image(postFndvi);
};
///////////////////
/* NBR */
///////////////////
// get_NBR() returns the normalized burn ratio (NBR) for each pixel of an image
var get_NBR = function(img) {
  var nbr = img.normalizedDifference(['B4', 'B7']).rename('nbr');
  return ee.Image(nbr);
};
// get_preFnbr() maps over the collection of pre-fire images, calculates NBR on each, and takes the median for each pixel
var get_preFnbr = function(feature, timeWindow, resample_method, sats) {
  var preFnbr = get_preFireRaw(feature, timeWindow, resample_method, sats)
                  .map(get_NBR)
                  .median();
  preFnbr = ee.Algorithms.If( preFnbr.bandNames(),
                                    ee.Image(preFnbr), 
                                    null);
  return ee.Image(preFnbr);
};
// get_postFnbr() maps over the collection of post-fire images, calculates NBR on each, and takes the median for each pixel
var get_postFnbr = function(feature, timeWindow, resample_method, sats) {
  var postFnbr = get_postFireRaw(feature, timeWindow, resample_method, sats)
                  .map(get_NBR)
                  .median();
  postFnbr = ee.Algorithms.If( postFnbr.bandNames(),
                                    ee.Image(postFnbr), 
                                    null);
  return ee.Image(postFnbr);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  END HELPER FUNCTIONS    /////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// DEPENDENT/RESPONSE VARIABLES
// Calculation of dependent variables for the remote-sensing-resistance
// study. 
//
// Variables of interest: dNBR, RdNBR, dNBR2, RdNBR2, dNDVI, RdNDVI, dEVI, RdEVI
//
// get_dNBR() returns the difference in NBR between just before the fire and 1 year later
var get_dNBR = function(feature, timeWindow, resample_method, sats) {
  var preFire_nbr = get_preFnbr(feature, timeWindow, resample_method, sats);
  var postFire_nbr = get_postFnbr(feature, timeWindow, resample_method, sats);
  var dNBR = ee.Algorithms.If( preFire_nbr,
                                ee.Algorithms.If( postFire_nbr, 
                                                  preFire_nbr.subtract(postFire_nbr).rename('dnbr'), 
                                                  null),
                                null);
  return ee.Image(dNBR);
};
// get_RdNBR() returns the relative differenced normalized burn ratio for each pixel within the fire perimeter
// For calcuations, see Miller and Thode (2007)
var get_RdNBR = function(feature, timeWindow, resample_method, sats) {
  var preFire_nbr = get_preFnbr(feature, timeWindow, resample_method, sats);
  var delta_nbr = get_dNBR(feature, timeWindow, resample_method, sats);
  var RdNBR = ee.Algorithms.If( delta_nbr,
                                  delta_nbr.divide((preFire_nbr.abs().divide(1000)).sqrt()).rename('rdnbr'), 
                                  null);
  return ee.Image(RdNBR);
};
// get_dNDVI() returns the raw difference in NDVI between pre- and post-fire images
var get_dNDVI = function(feature, timeWindow, resample_method, sats) {
  var preFire_ndvi = get_preFndvi(feature, timeWindow, resample_method, sats);
  var postFire_ndvi = get_postFndvi(feature, timeWindow, resample_method, sats);
  var dNDVI = ee.Algorithms.If( preFire_ndvi.bandNames(),
                                ee.Algorithms.If( postFire_ndvi.bandNames(), 
                                                  preFire_ndvi.subtract(postFire_ndvi).rename('dndvi'), 
                                                  null),
                                null);
  return ee.Image(dNDVI);
};
// get_RdNDVI() returns the relative differenced normalized difference vegetation index for each pixel within a fire perimeter
// Same math as in Miller and Thode (2007), but using NDVI instead of NBR
var get_RdNDVI = function(feature, timeWindow, resample_method, sats) {
  var preFire_ndvi = get_preFndvi(feature, timeWindow, resample_method, sats);
  var delta_ndvi = get_dNDVI(feature, timeWindow, resample_method, sats);
  var RdNDVI = ee.Algorithms.If( delta_ndvi,
                                  delta_ndvi.divide((preFire_ndvi.abs().divide(1000)).sqrt()).rename('rdndvi'), 
                                  null);
  return ee.Image(RdNDVI);
};
// get_RBR() returns the relative burn ratio from Parks et al. 2015. Remote Sensing of the Environment))
var get_RBR = function(feature, timeWindow, resample_method, sats) {
  var preFire_nbr = get_preFnbr(feature, timeWindow, resample_method, sats);
  var delta_nbr = get_dNBR(feature, timeWindow, resample_method, sats);
  var RBR = ee.Algorithms.If( delta_nbr,
                                delta_nbr.divide(preFire_nbr.add(1.001)).rename('rbr'), 
                                null);
  return ee.Image(RBR);
};
// get_RBR() returns the relative burn ratio from Parks et al. 2015. Remote Sensing of the Environment))
var get_RBR_simple = function(feature) {
  var fireDate = ee.Date(feature.get('alarm_date'));
  var firePerim = feature.geometry();
  var timeWindow = 48;
  // Prefire image collection derivecd by gathering all images "timeWindow"
  // (a global variable) days before the fire. 
  // These variables define the time period to grab those images. 
  var preend = fireDate.advance(-1, 'day');
  var prestart = preend.advance(timeWindow * -1, 'day');
  // Post fire image comes from median of images exactly 1 year after pre-fire images
  var poststart = prestart.advance(1, 'year');
  var postend = preend.advance(1, 'year');
  var l4pre = l4sr
            .filterDate(prestart, preend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l5pre = l5sr
            .filterDate(prestart, preend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l7pre = l7sr
            .filterDate(prestart, preend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l8pre = l8sr
            .filterDate(prestart, preend)
            .filterBounds(firePerim)
            .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var preFireCollection = ee.ImageCollection(l4pre.merge(l5pre.merge(l7pre.merge(l8pre))))
  .map(function(img) {
    // Each pixel gets a 1 if it is NOT a cloud, and a 0 if it IS a cloud
    var cloudMask = img.select('pixel_qa').bitwiseAnd(32).eq(0);
    // Each pixel gets a 1 if it is NOT a cloud shadow, and a 0 if it IS a cloud shadow
    var cloudShadowMask = img.select('pixel_qa').bitwiseAnd(8).eq(0);
    // Each pixel gets a 1 if it is NOT water, and a 0 if it IS water
    var waterMask = img.select('pixel_qa').bitwiseAnd(4).eq(0);
    // Each pixel gets a 1 if it is NOT snow, and a 0 if it IS snow
    var snowMask = img.select('pixel_qa').bitwiseAnd(16).eq(0);
    // For the combined mask (1 is a pixel we want to keep, and a 0 is one we want to mask),
    // the pixel must both NOT be a cloud AND NOT be a cloud shadow (a 1 for both of the
    // above masks) in order to be a valid pixel.
    var mask = cloudMask.and(cloudShadowMask).and(waterMask).and(snowMask);
    return img.updateMask(mask);
  });
  var l4post = l4sr
            .filterDate(poststart, postend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l5post = l5sr
            .filterDate(poststart, postend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l7post = l7sr
            .filterDate(poststart, postend)
            .filterBounds(firePerim)
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var l8post = l8sr
            .filterDate(poststart, postend)
            .filterBounds(firePerim)
            .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  var postFireCollection = ee.ImageCollection(l4post.merge(l5post.merge(l7post.merge(l8post))))
  .map(function(img) {
    // Each pixel gets a 1 if it is NOT a cloud, and a 0 if it IS a cloud
    var cloudMask = img.select('pixel_qa').bitwiseAnd(32).eq(0);
    // Each pixel gets a 1 if it is NOT a cloud shadow, and a 0 if it IS a cloud shadow
    var cloudShadowMask = img.select('pixel_qa').bitwiseAnd(8).eq(0);
    // Each pixel gets a 1 if it is NOT water, and a 0 if it IS water
    var waterMask = img.select('pixel_qa').bitwiseAnd(4).eq(0);
    // Each pixel gets a 1 if it is NOT snow, and a 0 if it IS snow
    var snowMask = img.select('pixel_qa').bitwiseAnd(16).eq(0);
    // For the combined mask (1 is a pixel we want to keep, and a 0 is one we want to mask),
    // the pixel must both NOT be a cloud AND NOT be a cloud shadow (a 1 for both of the
    // above masks) in order to be a valid pixel.
    var mask = cloudMask.and(cloudShadowMask).and(waterMask).and(snowMask);
    return img.updateMask(mask);
  });
  // var preFireCollection = ee.ImageCollection(merged_and_masked_landsat
  //             .filterDate(prestart, preend)
  //             .filterBounds(firePerim));
  // var postFireCollection = ee.ImageCollection(merged_and_masked_landsat
  //             .filterDate(poststart, postend)
  //             .filterBounds(firePerim));
  var preFnbr = preFireCollection
                  .map(function(img) {return img.normalizedDifference(['B4', 'B7']).rename('nbr')})
                  .median();
  var postFnbr = postFireCollection
                  .map(function(img) {return img.normalizedDifference(['B4', 'B7']).rename('nbr')})
                  .median();
  var delta_nbr = ee.Algorithms.If(preFnbr.bandNames(),
                                    ee.Algorithms.If(postFnbr.bandNames(),
                                                      preFnbr.subtract(postFnbr).rename('dnbr'),
                                                      null),
                                    null);
  var rbr = ee.Algorithms.If(delta_nbr,
                              ee.Image(delta_nbr).divide(preFnbr.add(1.001)).rename('rbr').clip(firePerim),
                              null);
  // var delta_nbr = preFnbr.subtract(postFnbr).rename('dnbr');
  // var rbr = ee.Image(delta_nbr).divide(preFnbr.add(1.001)).rename('rbr').clip(firePerim);
  return ee.Image(rbr);
};
//
// INDEPENDENT/PREDICTOR VARIABLES
// Calculation of independent variables for the remote-sensing-resistance
// study. Calculation of each predictor variable is broken into two
// separate functions (similar to the framework for response variables) 
// so that we can check to make sure the pre-fire
// and post-fire image collections exist prior to trying to do 
// calculations on them. The "_internal" function does the calculations,
// and the "get_" function checks the imagery. Without the checks, errors
// are returned when trying to use the .normalizedDifference() method on
// non-existant imagery.
//
// Variables of interest: 
// + Neighborhood window sizes of 3, 5, 7, and 9 pixels in diameter
// + Focal NDVI, EVI, NDWI
// + Neighborhood NDVI, EVI, NDWI
//
// HETEROGENEITY COVARIATES
//
/* Heterogeneity of NDVI */
// get_hetNDVI() returns the heterogeneity of NDVI within a given pixel radius for each pixel in an image
var get_hetNDVI = function(feature, pixel_radius, timeWindow, resample_method, sats) {
  var pixel_radius_number = ee.Number.parse(ee.String(pixel_radius));
  var kernel = create_kernel(pixel_radius_number);
  var preFireCol_ndvi = get_preFireRaw(feature, timeWindow, resample_method, sats)
                          .map(get_NDVI);
  var het = preFireCol_ndvi.map(function (img) {
          return img.reduceNeighborhood(ee.Reducer.stdDev(), kernel);
        });
 het = ee.Algorithms.If( het.median().bandNames(),
                              het.median().rename(ee.String('het_ndvi_').cat(ee.String(pixel_radius))),
                              null);
  return ee.Image(het);
};
//
// FOCAL MEAN COVARIATES
//
// get_focal_mean_NDVI() returns the neighborhood mean of the NDVI for a given pixel radius
// Could be valuable to account for this if using the neighborhood standard deviation at the same pixel radius
var get_focal_mean_NDVI = function(feature, pixel_radius, timeWindow, resample_method, sats) {
  var pixel_radius_number = ee.Number.parse(ee.String(pixel_radius));
  var kernel = create_kernel(pixel_radius_number);
  var preFireCol_ndvi = get_preFireRaw(feature, timeWindow, resample_method, sats)
                          .map(get_NDVI);
  var focal_mean = preFireCol_ndvi.map(function (img) {
          return img.reduceNeighborhood(ee.Reducer.mean(), kernel);
        });
  focal_mean = ee.Algorithms.If( focal_mean.median().bandNames(),
                                  focal_mean.median().rename(ee.String('nbhd_ndvi_').cat(ee.String(pixel_radius))),
                                  null);
  return ee.Image(focal_mean);
};
// Topographic characteristics
var get_slope = function(feature) {
  var terrain = ee.Algorithms.Terrain(elev);
  var slope = terrain.select('slope');
  return(slope);
};
var get_aspect = function(feature) {
  var terrain = ee.Algorithms.Terrain(elev);
  var aspect = terrain.select('aspect');
  return(aspect);
};
// Topographic roughness values
// get_roughness returns the standard deviation of elevation within a given pixel radius for each pixel in an image
var get_roughness = function(feature, pixel_radius, resample_method) 
{
  var pixel_radius_number = ee.Number.parse(ee.String(pixel_radius));
  var kernel = create_kernel(pixel_radius_number);
  var local_elev =  ee.Algorithms.If(resample_method === 'none',
                                      elev,
                                      elev.resample(resample_method));
  var roughness = ee.Image(local_elev).reduceNeighborhood(ee.Reducer.stdDev(), kernel);
  roughness = ee.Algorithms.If( roughness.bandNames(),
                                roughness.rename(ee.String('topo_roughness_').cat(ee.String(pixel_radius))),
                                null);
  return ee.Image(roughness);
};
// // Weather/fuel condition variables
var get_erc = function(img) {
  var erc =  ee.Image(img.select(['erc']));
  return ee.Image(erc);
};
var get_preFerc = function(feature, gridmet_timeWindow, resample_method) {
  var erc = get_preFireGridmet(feature, gridmet_timeWindow, resample_method)
              .map(get_erc)
              .median();
  erc = ee.Algorithms.If( erc.bandNames(),
                                    ee.Image(erc), 
                                    null);
  return ee.Image(erc);
};
var get_fm100 = function(img) {
  var fm100 =  ee.Image(img.select(['fm100']));
  return ee.Image(fm100);
};
var get_preFfm100 = function(feature, gridmet_timeWindow, resample_method) {
  var fm100 = get_preFireGridmet(feature, gridmet_timeWindow, resample_method)
                  .map(get_fm100)
                  .median();
  fm100 = ee.Algorithms.If( fm100.bandNames(),
                                    ee.Image(fm100), 
                                    null);
  return ee.Image(fm100);
};
var get_tempMax = function(img) {
  var tempMax =  ee.Image(img.select(['tmmx'])).subtract(273.15);
  return ee.Image(tempMax);
};
var get_preFcumulativeTempMax = function(feature, gridmet_timeWindow, resample_method) {
  var cumulativeTempMax = get_preFireGridmet(feature, gridmet_timeWindow, resample_method)
                            .map(get_tempMax)
                            .sum();
  cumulativeTempMax = ee.Algorithms.If( cumulativeTempMax.bandNames(),
                                            ee.Image(cumulativeTempMax),
                                            null);
  return ee.Image(cumulativeTempMax);
};
var get_precip = function(img) {
  var precip =  ee.Image(img.select(['pr']));
  return ee.Image(precip);
};
var get_preFcumulativePrecip = function(feature, gridmet_timeWindow, resample_method) {
  var cumulativePrecip = get_preFireGridmet(feature, gridmet_timeWindow, resample_method)
                          .map(get_precip)
                          .sum();
  cumulativePrecip = ee.Algorithms.If( cumulativePrecip.bandNames(),
                                            ee.Image(cumulativePrecip),
                                            null);
  return ee.Image(cumulativePrecip);
};
var get_variables = function(feature, timeWindow, resample_method, sats) {   
    var geo = feature.geometry();
    // Static features of this particular dataset
    // var satellite = ee.Image(sat);
    // Static features of the point itself
    var lonLat = ee.Image.pixelLonLat();
    var slope =  ee.Image(ee.Algorithms.If(resample_method === 'none',
                                      get_slope(geo),
                                      get_slope(geo).resample(resample_method)));
    var aspect =  ee.Image(ee.Algorithms.If(resample_method === 'none',
                                      get_aspect(geo),
                                      get_aspect(geo).resample(resample_method)));
    var local_elev =  ee.Image(ee.Algorithms.If(resample_method === 'none',
                                        elev,
                                        elev.resample(resample_method)));
    var conifer = mixed_conifer.select('b1').int().rename('ypmc');
    // Not dependent on neighborhood size, but derived from the fire information
    var date = ee.Image(
      ee.Number(
        feature.get('alarm_date'))).rename('alarm_date');
    var ordinal_day = ee.Image(
      ee.Number(
        ee.Date(
          feature
          .get('alarm_date'))
        .getRelative('day', 'year'))).rename('ordinal_day');
    var day = ee.Image(ee.Number(ee.Date(feature.get('alarm_date')).get('day'))).rename('day');
    var month = ee.Image(ee.Number(ee.Date(feature.get('alarm_date')).get('month'))).rename('month');
    var year = ee.Image(ee.Number(ee.Date(feature.get('alarm_date')).get('year'))).rename('year');
    var preFraw = get_preFireRaw_median(feature, timeWindow, resample_method, sats);
    var postFraw = get_postFireRaw_median(feature, timeWindow, resample_method, sats);
    var preFnbr = get_preFnbr(feature, timeWindow, resample_method, sats);
    var postFnbr = get_postFnbr(feature, timeWindow, resample_method, sats);
    // var rdnbr = get_RdNBR(feature, timeWindow, resample_method, sats);
    // // var preFnbr2 = get_preFnbr2(feature, timeWindow, resample_method, sats);
    // // var postFnbr2 = get_postFnbr2(feature, timeWindow, resample_method, sats);
    // // var dnbr2 = get_dNBR2(feature, timeWindow, resample_method, sats);
    // // var rdnbr2 = get_RdNBR2(feature, timeWindow, resample_method, sats);
    var preFndvi = get_preFndvi(feature, timeWindow, resample_method, sats);
    var postFndvi = get_postFndvi(feature, timeWindow, resample_method, sats);
    // // var dndvi = get_dNDVI(feature, timeWindow, resample_method, sats);
    // var rdndvi = get_RdNDVI(feature, timeWindow, resample_method, sats);
    // var preFevi = get_preFevi(feature, timeWindow, resample_method, sats);
    // var postFevi = get_postFevi(feature, timeWindow, resample_method, sats);
    // var devi = get_dEVI(feature, timeWindow, resample_method, sats);
    // var rdevi = get_RdEVI(feature, timeWindow, resample_method, sats);
    var rbr = get_RBR(feature, timeWindow, resample_method, sats);
    // var rvi = get_RVI(feature, timeWindow, resample_method, sats);
    // var preFndwi = get_preFndwi(feature, timeWindow, resample_method, sats);
    // var postFndwi = get_postFndwi(feature, timeWindow, resample_method, sats);
    // // Variables that depend on neighborhood window size AND on fire information
    // // Radius of 1 pixel = 3x3 window = 90m x 90m = 8100 m^2 = 0.81 ha
    var het_ndvi_1 = get_hetNDVI(feature, '1', timeWindow, resample_method, sats);
    // // var het_ndwi_1 = get_hetNDWI(feature, 1, timeWindow, resample_method, sats);
    // // var het_evi_1 = get_hetEVI(feature, 1, timeWindow, resample_method, sats);
    var focal_mean_ndvi_1 = get_focal_mean_NDVI(feature, '1', timeWindow, resample_method, sats);
    // // var focal_mean_ndwi_1 = get_focal_mean_NDWI(feature, 1, timeWindow, resample_method, sats);
    // // var focal_mean_evi_1 = get_focal_mean_EVI(feature, 1, timeWindow, resample_method, sats);
    var rough1 = get_roughness(feature, '1', resample_method);
    // // var texture1 = get_texture(feature, '1', timeWindow, resample_method, sats);
    // // var gearys1 = get_gearys_c(feature, 1, timeWindow, resample_method, sats);
    // // Radius of 2 pixels = 5x5 window = 150m x 150m = 22500 m^2 = 2.25 ha
    var het_ndvi_2 = get_hetNDVI(feature, '2', timeWindow, resample_method, sats);
    // // var het_ndwi_2 = get_hetNDWI(feature, 2, timeWindow, resample_method, sats);
    // // var het_evi_2 = get_hetEVI(feature, 2, timeWindow, resample_method, sats);
    var focal_mean_ndvi_2 = get_focal_mean_NDVI(feature, '2', timeWindow, resample_method, sats);
    // // var focal_mean_ndwi_2 = get_focal_mean_NDWI(feature, 2, timeWindow, resample_method, sats);
    // // var focal_mean_evi_2 = get_focal_mean_EVI(feature, 2, timeWindow, resample_method, sats);
    var rough2 = get_roughness(feature, '2', resample_method);
    // // var texture2 = get_texture(feature, '2', timeWindow, resample_method, sats);
    // // var gearys2 = get_gearys_c(feature, 2, timeWindow, resample_method, sats);
    // // Radius of 3 pixels = 7x7 window = 210m x 210m = 44100 m^2 = 4.41 ha
    var het_ndvi_3 = get_hetNDVI(feature, '3', timeWindow, resample_method, sats);
    // // var het_ndwi_3 = get_hetNDWI(feature, 3, timeWindow, resample_method, sats);
    // // var het_evi_3 = get_hetEVI(feature, 3, timeWindow, resample_method, sats);
    var focal_mean_ndvi_3 = get_focal_mean_NDVI(feature, '3', timeWindow, resample_method, sats);
    // // var focal_mean_ndwi_3 = get_focal_mean_NDWI(feature, 3, timeWindow, resample_method, sats);
    // // var focal_mean_evi_3 = get_focal_mean_EVI(feature, 3, timeWindow, resample_method, sats);
    var rough3 = get_roughness(feature, '3', resample_method);
    // // var texture3 = get_texture(feature, '3', timeWindow, resample_method, sats);
    // // var gearys3 = get_gearys_c(feature, 3, timeWindow, resample_method, sats);
    // // Radius of 4 pixels = 9x9 window = 270m x 270m = 72900 m^2 = 7.29 ha
    var het_ndvi_4 = get_hetNDVI(feature, '4', timeWindow, resample_method, sats);
    // // var het_ndwi_4 = get_hetNDWI(feature, 4, timeWindow, resample_method, sats);
    // // var het_evi_4 = get_hetEVI(feature, 4, timeWindow, resample_method, sats);
    var focal_mean_ndvi_4 = get_focal_mean_NDVI(feature, '4', timeWindow, resample_method, sats);
    // // var focal_mean_ndwi_4 = get_focal_mean_NDWI(feature, 4, timeWindow, resample_method, sats);
    // // var focal_mean_evi_4 = get_focal_mean_EVI(feature, 4, timeWindow, resample_method, sats);
    var rough4 = get_roughness(feature, '4', resample_method);
    // // var texture4 = get_texture(feature, '4', timeWindow, resample_method, sats);
    // // var gearys4 = get_gearys_c(feature, 4, timeWindow, resample_method, sats);
    // // weather/fuel condition variables
    // var erc = get_preFerc(feature, 4, resample_method); // Take the median ERC for the 3 days prior to the fire
    var fm100 = get_preFfm100(feature, 4, resample_method); // Take the median 100 hour fuel moisture for 3 days prior to the fire
    // var cumulativeTempMax = get_preFcumulativeTempMax(feature, 31, resample_method); // Get sum of max temperature for 30 days before the fire (degrees C)
    // var cumulativePrecip = get_preFcumulativePrecip(feature, 31, resample_method); // Get sum of precip for 30 days before the fire (mm)
    // var export_weatherFuel =
    //   ee.Algorithms.If(erc,
    //       erc
    //         .addBands(fm100)
    //         .addBands(cumulativeTempMax)
    //         .addBands(cumulativePrecip),
    //       null);
    // Create export image
    // If the rdnbr variable isn't null, then all other images should have been
    // created, since the rdnbr algorithm checks both prefire and postfire imagery
    // and returns a null if either aren't present
    var export_img =   
      ee.Algorithms.If(rbr, 
        rbr
        .addBands(preFnbr)
        .addBands(postFnbr)
        // .addBands(rdnbr)
        // .addBands(dnbr2)
        // .addBands(preFnbr2)
        // .addBands(postFnbr2)
        // .addBands(rdnbr2)
        // .addBands(dndvi)
        // .addBands(rdndvi)
        // .addBands(devi)
        // .addBands(rdevi)
        // .addBands(rvi)
        .addBands(preFndvi)
        .addBands(postFndvi)
        // .addBands(preFndwi)
        // .addBands(postFndwi)
        // .addBands(preFevi)
        // .addBands(postFevi)
        .addBands(het_ndvi_1)
        // .addBands(het_ndwi_1)
        // .addBands(het_evi_1)
        .addBands(focal_mean_ndvi_1)
        // .addBands(focal_mean_ndwi_1)
        // .addBands(focal_mean_evi_1)
        .addBands(het_ndvi_2)
        // .addBands(het_ndwi_2)
        // .addBands(het_evi_2)
        .addBands(focal_mean_ndvi_2)
        // .addBands(focal_mean_ndwi_2)
        // .addBands(focal_mean_evi_2)
        .addBands(het_ndvi_3)
        // .addBands(het_ndwi_3)
        // .addBands(het_evi_3)
        .addBands(focal_mean_ndvi_3)
        // .addBands(focal_mean_ndwi_3)
        // .addBands(focal_mean_evi_3)
        .addBands(het_ndvi_4)
        // .addBands(het_ndwi_4)
        // .addBands(het_evi_4)
        .addBands(focal_mean_ndvi_4)
        // .addBands(focal_mean_ndwi_4)
        // .addBands(focal_mean_evi_4)
        // .addBands(satellite)
        // .addBands(date)
        .addBands(ordinal_day)
        .addBands(year)
        .addBands(month)
        .addBands(day)
        .addBands(lonLat)
        .addBands(conifer)
        .addBands(slope)
        .addBands(aspect)
        .addBands(rough1)
        .addBands(rough2)
        .addBands(rough3)
        .addBands(rough4)
        .addBands(local_elev)
        .addBands(preFraw)
        .addBands(postFraw)
        .addBands(fm100)
        .clip(geo),
      null);
    // export_img = ee.Algorithms.If(export_img,
    //                 ee.Algorithms.If(export_weatherFuel,
    //                       ee.Image(export_img)
    //                         .addBands(export_weatherFuel)
    //                         .copyProperties(feature),
    //                       null),
    //                     null);
    return ee.Image(export_img);
};
var assess_whole_fire = function(args) {
  var timeWindow = args.timeWindow;
  var resample_method = args.resample_method;
  var sats = args.sats;
  return function(feature) {
    var geo = feature.geometry();
    var var_img = get_variables(feature, timeWindow, resample_method, sats);
    var export_img = ee.Algorithms.If(var_img, 
                                      ee.Image(var_img).float().clip(geo), 
                                      null);
    return ee.Image(export_img);
  };
};
var RBR_viz = { bands: 'rbr', min: 0.041191844, max: 0.2836425, 
                palette:['008000', 'ffff00',  'ffA500', 'ff0000']};
// Use a DateSlider to create annual composites of the fire perimeter collection.
// Use the start of the collection and now to bound the slider.
var start = ee.Date('1984-01-01').format();
var end = ee.Date('2017-12-31').format();
// var end = ee.Date('2020-12-31').format();
var now = Date.now();
var button = ui.Button({
  label: 'Get severity for fires shown in map view',
  onClick: function() {
    Map.layers().get(2).setShown(true);
  },
  style: {'position': 'bottom-center'}
});
// Run this function on a change of the dateSlider.
var showFRAP = function(range) {
  var collection = perim
                      .filterBounds(sn)
                      .filter(ee.Filter.gte('alarm_date', range.start().millis()))
                      .filter(ee.Filter.lt('alarm_date', range.end().millis()));
  var severity = collection .map(assess_whole_fire({'timeWindow':48, 
                                                  'resample_method': 'bicubic', 
                                                  'sats': ee.List(['4', '5', '7', '8'])}), 
                            true);
  // var severity = collection.map(get_RBR_simple, true);
  // var severity_mosaic = ee.ImageCollection(severity.map(function (img) {return ee.Image(img).multiply(1)})).mosaic(); 
  var severity_mosaic = ee.ImageCollection(severity.toList(severity.size())).mosaic(); 
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var sev_layer = ui.Map.Layer(severity_mosaic, RBR_viz, "FRAP-derived Relative Burn Ratio: " + name + " fires").setShown(false);
    var perimeter_layer = ui.Map.Layer(collection, {}, "FRAP Fire Perimeters").setOpacity(0.6);
    var heterogeneity_layer = ui.Map.Layer(severity_mosaic.select('het_ndvi_1'), {'bands': 'het_ndvi_1', 'min': 0, 'max': 0.1}, 'Heterogeneity of vegetation in a 90m x 90m window').setShown(false);
    Map.layers().set(2, sev_layer);
    Map.layers().set(3, perimeter_layer);
    Map.layers().set(4, heterogeneity_layer);
    Map.centerObject(collection);
    Map.add(button);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showFRAP,
    style: {'width': '500px'}
  });
  Map.add(dateSlider);
});
// Configure the map.
Map.addLayer(mixed_conifer.updateMask(mixed_conifer).rename('ypmc'), {'palette': '440154ff'}, 'Sierra Nevada yellow pine/mixed-conifer forest').setOpacity(0.5);
Map.addLayer(sn, {}, 'Sierra Nevada outline (derived from Jepson)').setOpacity(0.2);
Map.centerObject(sn, 8);