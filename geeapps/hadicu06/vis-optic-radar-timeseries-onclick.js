/*
AN APP TO INTERACTIVELY PLOT TIME SERIES OF SEVERAL CLASSES SELECTED, IN ONE PLOT
UI/UX:
Version 1 (MVP):
1) User can draw a polygon (one polygon at a time) [OR, multiple polygons allowed?]
    ...yeah multiple polygons allowed sound better, so users can specify beforehand the classes..
2) The app will do reduceRegion() [OR, reduceRegions()? this will make time series for different polygons]
3) ... so the time series mean will be plotted by feature collection "class" property
EE Chart API:
ui.Chart.image.seriesByRegion()
https://developers.google.com/earth-engine/guides/charts_image_collection#uichartimageseriesbyregion
// Todo:
a) Update S2 now TOA -> SR with s2cloudless mask
b) 
*/
Map.setCenter(-48.7593804758667, -25.537574481208093, 16)
Map.setOptions('SATELLITE')
///////////////////////////////////////
// Global params
var app = {}
app.ts = {}
app.ts.startDate = "2019-01-01"
app.ts.endDate = "2021-01-01"
app.ts.extractScale = 100
app.ts.selTsVar = "ndmi"
/////////////////////////
// Import utils
// var utils = require('users/hadicu06/IIASA:utils');
///////////////////////////////////////////////////////////////////////////////////////
// Get satellite time series
///////////////////////////////////////////////////////////////////////////////////////
// Create a panel to hold our widgets.
var panelStyle = {
    position: 'bottom-left',
    height: '200px',
    width: '400px',
}
var panel1 = ui.Panel();
panel1.style().set(panelStyle)
var panel2 = ui.Panel();
panel2.style().set(panelStyle)
var panel3 = ui.Panel();
panel3.style().set(panelStyle)
var panel4 = ui.Panel();
panel4.style().set({
    position: 'bottom-right',
    height: '200px',
    width: '600px',
})
// Add the panel to the ui.root.
Map.add(panel1)
Map.add(panel2)
Map.add(panel3)
Map.add(panel4)
Map.onClick(function(coords) {
  // Add a red dot for the point clicked on.
  app.pgeo = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(app.pgeo, {color: 'FF0000'}, 'Clicked point');
  Map.layers().set(0, dot);
// print("app", app)
  ///////////////////////////////////////// Get Landsat data 
  var landsatCol = getLandsatData(app.pgeo, app.ts.startDate, app.ts.endDate);                     // Dates
  // print("landsatCol", landsatCol)
  ///////////////////////////////////////// Get Sentinel-1 data 
  var S1Col = getS1Data(app.pgeo, app.ts.startDate, app.ts.endDate);
  // print("S1Col", S1Col)
  ///////////////////////////////////////// Get Sentinel-2 data
  var S2Col = getS2Data_SR_s2cloudless(app.pgeo, app.ts.startDate, app.ts.endDate);
  // print("S2Col", S2Col)
   ///////////////////////////////////////// Get Landsat data for all time
  var landsatColAllTime = getLandsatData(app.pgeo, "1970-01-01", app.ts.endDate);                     // Dates
  /////////////////////////////////////////////////// Get dates to set the same range for chart
  var landsatColDates = ee.List(landsatCol.aggregate_array('system:time_start'));
  var chartStyle = {
          position: 'top-left',
          width: '380px',
          height: '180px',
          margin: '0px',
          padding: '0px'
      }
    ///////////////////////////////////////////////////// Chart Landsat
  var chart_ts_landsat = ui.Chart.image.series(ee.ImageCollection(landsatCol).select([app.ts.selTsVar]), app.pgeo, ee.Reducer.mean(), app.ts.extractScale)
          .setOptions({
            title: 'Landsat SR',
            // vAxis: {title: app.sel_tsVar, viewWindow: {min: -0.3, max: 0.6}, ticks: [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]},
            vAxis: {'title': app.ts.selTsVar, viewWindow: {min: -0.2, max: 0.8}}, // y-axis range fixed
            // vAxis: {'title': [app.ts.selTsVar]}, // y-axis range not fixed
            hAxis: {viewWindow: {min: landsatColDates.get(1).getInfo(),           
                          max: landsatColDates.get(-1).getInfo()}},    
            series: {
              0: {lineWidth: 0, pointSize: 3} // Observed
            },
            explorer: {}
          });
  chart_ts_landsat.style().set(chartStyle);  
  // Insert the chart widget into the panel          
  panel1.widgets().set(0, chart_ts_landsat);
  ///////////////////////////////////////////////////// Chart Sentinel-2
  var chart_ts_S2 = ui.Chart.image.series(ee.ImageCollection(S2Col).select([app.ts.selTsVar]), app.pgeo, ee.Reducer.mean(), app.ts.extractScale)
          .setOptions({
            title: 'Sentinel-2 SR',
            // vAxis: {title: app.sel_tsVar, viewWindow: {min: -0.3, max: 0.6}, ticks: [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]},
            vAxis: {'title': app.ts.selTsVar, viewWindow: {min: -0.2, max: 0.8}}, // y-axis range not fixed
            // vAxis: {'title': [app.ts.selTsVar]}, // y-axis range not fixed
            hAxis: {viewWindow: {min: landsatColDates.get(1).getInfo(),           
                          max: landsatColDates.get(-1).getInfo()}},    
            series: {
              0: {lineWidth: 0, pointSize: 3} // Observed
            },
            explorer: {}
          });
  chart_ts_S2.style().set(chartStyle);  
  // Insert the chart widget into the panel          
  panel2.widgets().set(0, chart_ts_S2);
  ////////////////////////////////////////////////////// Chart Sentinel-1
  var chart_ts_S1 = ui.Chart.image.series(ee.ImageCollection(S1Col), app.pgeo, ee.Reducer.mean(), app.ts.extractScale)  // make same as Landsat resolution
        .setOptions({
          title: 'Sentinel-1',
          vAxis: {title: 'VH (dB)', viewWindow: {min: -30, max: -5}},
          // vAxis: {title: 'VH (dB)'},
          hAxis: {viewWindow: {min: landsatColDates.get(1).getInfo(),                
                        max: landsatColDates.get(-1).getInfo()}},
          series: {
            0: {lineWidth: 0, pointSize: 3} // Observed
          },
          explorer: {}
        });
  chart_ts_S1.style().set(chartStyle);  
   // Insert the chart widget into the panel          
  panel3.widgets().set(0, chart_ts_S1);
    ///////////////////////////////////////////////////// Chart Landsat all time
  var chart_ts_landsatAllTime = ui.Chart.image.series(ee.ImageCollection(landsatColAllTime).select([app.ts.selTsVar]), app.pgeo, ee.Reducer.mean(), app.ts.extractScale)
          .setOptions({
            title: 'Landsat SR (all time)',
            // vAxis: {title: app.sel_tsVar, viewWindow: {min: -0.3, max: 0.6}, ticks: [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]},
            vAxis: {'title': app.ts.selTsVar, viewWindow: {min: -0.2, max: 0.8}}, // y-axis range fixed
            // vAxis: {'title': [app.ts.selTsVar]}, // y-axis range not fixed
            // hAxis: {viewWindow: {min: landsatColDates.get(1).getInfo(),           
            //               max: landsatColDates.get(-1).getInfo()}},    
            series: {
              0: {lineWidth: 0, pointSize: 3} // Observed
            },
            explorer: {}
          });
  chart_ts_landsatAllTime.style().set( {
          position: 'top-left',
          width: '580px',
          height: '180px',
          margin: '0px',
          padding: '0px'
      });  
  // Insert the chart widget into the panel          
  panel4.widgets().set(0, chart_ts_landsatAllTime);
  }
)
///////////////////////////////////////////////////////////////////////////////////////
// UI
///////////////////////////////////////////////////////////////////////////////////////
// Drawing tools
// Later.. for now just clicking a pixel
////////////////////////////////////////////////////////////////////////////////////////////////  
//*******************************************************************************************
// FUNCTIONS
//*******************************************************************************************
/////////////////////////////////////////////////////////////
// Function to get Landsat time series for a given location
function getLandsatData(region, start, end) {                
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region)
       .filterDate(start, end)
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var col4NoClouds = collection4.map(maskL457)            // or maskL457_unscaled() if faster
  var col5NoClouds = collection5.map(maskL457)
  var col7NoClouds = collection7.map(maskL457)
  var col8NoClouds = collection8.map(maskL8)              // or _unscaled() if faster
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds)
  var indicesImage = ee.ImageCollection(addOpticIndices_addSavi(colNoClouds))   // HH adds
  return indicesImage                                                              // HH adds
}  
/////////////////////////////////////////////////////////////
// Function to get Sentinel-1 time series for a given location
function getS1Data(region, start, end) { 
  var S1Collection = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        //.filter(ee.Filter.eq('resolution_meters', 10))   // Only 10m available, no 25 or 40
        .select(['VH'])
        // Need to also filter orbit pass 
        .filterDate(start, end)
        .filterBounds(region);
  // Speckle filter not applied
  return S1Collection;
}
/////////////////////////////////////////////////////////////
//  Function to get Sentinel-2 time series for a given location
function getS2Data(region, start, end) {
  var S2Collection = ee.ImageCollection('COPERNICUS/S2')
              .filterDate(start, end)               
              .filterBounds(region);
  var S2CollectionNoClouds = S2Collection.map(maskS2);              
  var indicesImage = ee.ImageCollection(addOpticIndices_addSavi(S2CollectionNoClouds));
  return indicesImage;
};
////////////////////////// Sentinel-2 SR with s2cloudless
function getS2Data_SR_s2cloudless(region, start, end) {
  var CLOUD_FILTER = 100              // change 60 to 100 to use all available scenes
  var CLD_PRB_THRESH = 50
  var NIR_DRK_THRESH = 0.15
  var CLD_PRJ_DIST = 1
  var BUFFER = 50
  var s2cloudless_params = {
    's2_product': "sr",             // "toa" or "sr"         // ****************************************
    'more_aggresive': false,
    'projectShadow': false,
    'morphologyFilter': false,
    'sr_useJRCwater': true     // only in effect if 's2_product': "sr", whether to use JRC yearly water instead of scene classification (SCL) that comes with the s2 sr product
  }
  var s2_cld_col = get_s2_cld_col(region, start, end)
  var jrc_year = ee.Date(start).get('year').getInfo()
  var not_water_jrc_mask = get_JRC_water(jrc_year)
  // Function to apply the cloud mask to each image in the collection
  function apply_cld_shdw_mask(img){
    // Subset the cloudmask band and invert it so clouds/shadow are 0, else 1.
    var not_cld_shdw = img.select('cloudmask').not()
    // Subset reflectance bands and update their masks, return the result.
    return img.select('B.*').updateMask(not_cld_shdw)
  }
  // Process the collection
  var s2_masked = s2_cld_col.map(add_cld_shdw_mask)
                            .map(apply_cld_shdw_mask)
                            .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
                                    ['blue', 'green', 'red', 'redEdge1', 'redEdge2', 'redEdge3', 'nirNarrow', 'nir', 'swir1', 'swir2']);
  // Add indices                             
  var s2_masked_addIndices = ee.ImageCollection(addOpticIndices_addSavi(s2_masked));
  return s2_masked_addIndices;                                           // ***** returned from the function ****
     /////////////////////////////////////////////////////////
  //******************************* Functions to build Sentinel-2 collection
  function get_s2_cld_col(aoi, start_date, end_date) {
    // Import and filter S2 SR. Now also implement if TOA.
    if(s2cloudless_params.s2_product === "sr") {
       var s2_col = ee.ImageCollection('COPERNICUS/S2_SR')  // TOA collection 'COPERNICUS/S2' doesn't come with 'SCL' band to get water, so in this case need to rely on external water mask
                    .filterBounds(aoi)
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', CLOUD_FILTER))
    } else if(s2cloudless_params.s2_product === "toa") {
       var s2_col = ee.ImageCollection('COPERNICUS/S2')  // TOA collection 'COPERNICUS/S2' doesn't come with 'SCL' band to get water, so in this case need to rely on external water mask
                .filterBounds(aoi)
                .filterDate(start_date, end_date)
                .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', CLOUD_FILTER))
    }
    // Import and filter s2cloudless.
    var s2_cloudless_col = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
                           .filterBounds(aoi)
                           .filterDate(start_date, end_date)
    // Join the two collections, by the 'system:index' property
    var joined = ee.ImageCollection(ee.Join.saveFirst('s2cloudless').apply({
      'primary': s2_col,
      'secondary': s2_cloudless_col,
      'condition': ee.Filter.equals({
        'leftField': 'system:index',
        'rightField': 'system:index'
      })
    }))
    return joined
  }
  // Cloud components
  function add_cloud_bands(img){
    var cld_prb = ee.Image(img.get('s2cloudless')).select('probability')
    var is_cloud = cld_prb.gt(CLD_PRB_THRESH).rename('clouds')
    return img.addBands(ee.Image([cld_prb, is_cloud]))
  }
  // Cloud shadow components
  // Define a function to add dark pixels, cloud projection, and identified shadows
  // Input is output of add_cloud_bands()
  //==============================================================                 
  // Use yearly JRC water, especially for early years when s2 sr is not available
  // Yearly JRC adapts to START_DATE: https://code.earthengine.google.com/1a5301429333f39f5d675753c00f3da4
  function get_JRC_water(jrc_year){
    if(jrc_year > 2018){
      jrc_year = 2018
    } else if(jrc_year < 1984){
      jrc_year = 1984
    }
    var jrc_start_date = jrc_year + '-01' + '-01'
    var jrc_end_date = jrc_year + '-12' + '-31'
    var water_jrc = ee.ImageCollection("JRC/GSW1_2/YearlyHistory")
                    .filterDate(jrc_start_date, jrc_end_date)
                    .first()
    // a. Masked (0) area in the JRC product is NOT WATER
    var water_jrc_fromMask = water_jrc.mask()  // 0 is "not water"
                        .not()                // 1 is "not water"
    water_jrc_fromMask = water_jrc_fromMask.selfMask()
    // b. doc says value 1 Not water, 2 Seasonal water, 3 Permanent water, but they seem less than ideal, thus also use the mask (a)  
    var water_jrc_val_1 = water_jrc.eq(1)     // 1 is "not water"
    water_jrc_val_1 = water_jrc_val_1.selfMask()
    // Mosaic a & b
    var not_water_jrc = ee.ImageCollection.fromImages([water_jrc_fromMask, water_jrc_val_1])
                        .mosaic()
    var not_water_jrc_mask = not_water_jrc.mask()   
    return not_water_jrc_mask
  }
    //==============================================================                 
  function add_shadow_bands(img){
    if(s2cloudless_params.s2_product === "sr"){
      if(s2cloudless_params.sr_useJRCwater){ // use JRC yearly water
        var not_water = not_water_jrc_mask
      } else { // use SCL
        var not_water = img.select('SCL').neq(6)
      }
    } else if(s2cloudless_params.s2_product === "toa"){   // if sr toa i.e. early years no s2 sr available, thus no scl layer, hence use JRC water
      var not_water = not_water_jrc_mask
    }
    // Dark NIR pixels that are not water (potential cloud shadow pixels)
    var R_BAND_SCALE = 1e4
    var dark_pixels = img.select('B8').lt(NIR_DRK_THRESH * R_BAND_SCALE).multiply(not_water).rename('dark_pixels')
     // print('not_water', not_water)
    if(s2cloudless_params.projectShadow) {
      // Direction to project cloud shadow from clouds (assumes UTM projection)
      var shadow_azimuth = ee.Number(90).subtract(ee.Number(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')))
      var cld_proj = img.select('clouds').directionalDistanceTransform(shadow_azimuth, CLD_PRJ_DIST * 10)
            .reproject({
              'crs': img.select(0).projection(),
              'scale': 100
            })
            .select('distance')
            .mask()
            .rename('cloud_transform')
      // Intersection of dark pixels with cloud shadow projection
      var shadows = cld_proj.multiply(dark_pixels).rename('shadows')
    } else {
      var shadows = dark_pixels.rename('shadows')
    }
    return img.addBands(ee.Image([dark_pixels, cld_proj, shadows]))
  }
  // Assemble the final cloud-shadow mask
  function add_cld_shdw_mask(img){
    var img_cloud = add_cloud_bands(img)
    var img_cloud_shadow = add_shadow_bands(img_cloud)
    // Set cloud and shadow as value 1
    var is_cld_shdw = img_cloud_shadow.select('clouds').add(img_cloud_shadow.select('shadows')).gt(0)
    if(s2cloudless_params.morphologyFilter){
      // Remove small cloud-shadow patches and dilate remaining pixels by BUFFER input.
      // 20 m scale is for speed, and assumes clouds don't require 10 m precision.
      is_cld_shdw = is_cld_shdw.focal_min(2).focal_max(BUFFER * 2 / 20)
          .reproject({'crs': img.select([0]).projection(), 'scale': 20})
          .rename('cloudmask')
    } else {
      is_cld_shdw = is_cld_shdw.rename('cloudmask')
    }
    return img_cloud_shadow.addBands(is_cld_shdw)
    // return img.addBands(is_cld_shdw) // if only the final cloud/cloud shadow mask along with the original image bands
  }
}
//////////////////////////////////////////////////////////Functions from script "utils"
//******************************************************
// Cloud masking
//******************************************************
function maskL457(img) {
  /*  Keep 'clear' and 'water' pixels for Landsat 4, 5 and 7  
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/LSDS-1370_L4-7_Surface%20Reflectance-LEDAPS-Product-Guide.pdf 
  or
  https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1370_L4-7_SurfaceReflectance-LEDAPS_ProductGuide-v2.pdf */
  var mask = img.select(['pixel_qa']).eq(66)
              .or(img.select(['pixel_qa']).eq(68))
              .and(img.select('B1').gt(ee.Image(0)))
              // Add filter for band values < 10,000 i.e. 100% reflectance
              .and(img.select('B1').lte(ee.Image(10000)))
              .and(img.select('B2').lte(ee.Image(10000)))
              .and(img.select('B3').lte(ee.Image(10000)))
              .and(img.select('B4').lte(ee.Image(10000)))
              .and(img.select('B5').lte(ee.Image(10000)))
              .and(img.select('B7').lte(ee.Image(10000)))
  var masked = img.updateMask(mask)
         .select(['B1','B2', 'B3','B4','B5','B7'],
                 ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])
  var scaled = ee.Image(masked).divide(ee.Image(10000))
               .copyProperties(masked, masked.propertyNames());
  return scaled;
}
function maskL457_unscaled(img) {
  /*  Keep 'clear' and 'water' pixels for Landsat 4, 5 and 7  
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/LSDS-1370_L4-7_Surface%20Reflectance-LEDAPS-Product-Guide.pdf
  or
  https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1370_L4-7_SurfaceReflectance-LEDAPS_ProductGuide-v2.pdf*/
  var mask = img.select(['pixel_qa']).eq(66)
              .or(img.select(['pixel_qa']).eq(68))
              .and(img.select('B1').gt(ee.Image(0)))
              // Add filter for band values < 10,000 i.e. 100% reflectance
              .and(img.select('B1').lte(ee.Image(10000)))
              .and(img.select('B2').lte(ee.Image(10000)))
              .and(img.select('B3').lte(ee.Image(10000)))
              .and(img.select('B4').lte(ee.Image(10000)))
              .and(img.select('B5').lte(ee.Image(10000)))
              .and(img.select('B7').lte(ee.Image(10000)))
  var masked = img.updateMask(mask)
         .select(['B1','B2', 'B3','B4','B5','B7'],
                 ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])
  var out = ee.Image(masked)
               .copyProperties(masked, masked.propertyNames());
  return out;
}
function maskL8(img) {
    /*  Keep 'clear' and 'water' pixels for Landsat 8
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/LSDS-1368_%20L8_Surface-Reflectance-Code-LASRC-Product-Guide.pdf 
  or
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1368_L8_SurfaceReflectanceCode-LASRC_ProductGuide-v2.pdf*/
  var mask = img.select(['pixel_qa']).eq(322)
               .or(img.select(['pixel_qa']).eq(324))
               .and(img.select('B2').gt(ee.Image(0)))
              // Add filter for band values < 10,000 i.e. 100% reflectance           
              .and(img.select('B3').lte(ee.Image(10000)))
              .and(img.select('B4').lte(ee.Image(10000)))
              .and(img.select('B5').lte(ee.Image(10000)))
              .and(img.select('B6').lte(ee.Image(10000)))
              .and(img.select('B7').lte(ee.Image(10000)))
  var masked = ee.Image(img).updateMask(mask)
                      .select(['B2', 'B3','B4','B5','B6','B7'],
                              ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']);
  var scaled = ee.Image(masked).divide(ee.Image(10000))
               .copyProperties(masked, masked.propertyNames());
  return scaled;
};
function maskS2(img) { 
  var qa = img.select('QA60');   
  // Bits 10 and 11 are clouds and cirrus, respectively
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  // Both flags should be set to zero, indicating clear conditions
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
    qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Apply mask  
  var masked = ee.Image(img).updateMask(mask)
              .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
              ['blue', 'green', 'red', 'redEdge1', 'redEdge2', 'redEdge3', 'nirNarrow', 'nir', 'swir1', 'swir2']);
  var scaled = ee.Image(masked).divide(ee.Image(10000))
               .copyProperties(masked, masked.propertyNames());
  return scaled;
};
//******************************************************
// Compute spectral indices
//******************************************************
function addOpticIndices_addSavi(collection) {
  /* Utility function for calculating spectral indices */
  return collection.map(function(image) {
    var ndvi = ee.Image(image).normalizedDifference(['nir', 'red']).rename('ndvi');
    var nbr = ee.Image(image).normalizedDifference(['nir', 'swir2']).rename('nbr');
    var ndmi = ee.Image(image).normalizedDifference(['nir', 'swir1']).rename('ndmi');          
    var evi = ee.Image(image).expression(
      '2.5 * (NIR - R) / (NIR + 6*R - 7.5*B + 1)', {
        R: image.select('red'),     
        NIR: image.select('nir'),     
        B: image.select('blue')
      }).rename('evi');    
    var savi = ee.Image(image).expression(
      '(1 + L) * float(nir - red)/(nir + red + L)', {
        'nir': image.select('nir'),
        'red': image.select('red'),
        'L': 0.9
    }).rename('savi');
    return ee.Image(image)
          .addBands([ndvi, evi, ndmi, nbr, savi])
          .select(['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'ndvi', 'evi', 'ndmi', 'nbr', 'savi']);   // copyProperties?
    });
  };