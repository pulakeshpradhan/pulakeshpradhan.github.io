var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                8.55708340975013,
                43.53255910706926
              ],
              [
                8.55708340975013,
                42.69448649680012
              ],
              [
                10.06221036287513,
                42.69448649680012
              ],
              [
                10.06221036287513,
                43.53255910706926
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
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[8.55708340975013, 43.53255910706926],
          [8.55708340975013, 42.69448649680012],
          [10.06221036287513, 42.69448649680012],
          [10.06221036287513, 43.53255910706926]]], null, false);
/////////////////////////////////
/// Coleções de dados ///////////
/////////////////////////////////
var ini= '2018-10-01'
var fim= '2018-10-20'
var CHLORA = ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI")
            .select('chlor_a')
            .filterDate(ini,fim)
//var GER = ee.ImageCollection("COPERNICUS/S1_GRD")
//print(GER.limit(10))
//SEntinel 1
//var SHH = ee.ImageCollection("COPERNICUS/S1_GRD")
//            //.select('HH')
//            .filterDate(ini,fim)
////print(SHH.limit(10))
//var SHV = ee.ImageCollection("COPERNICUS/S1_GRD")
//            //.select('HV')
//            .filterDate(ini,fim)
////print(SHV.limit(10))
var SVV = ee.ImageCollection("COPERNICUS/S1_GRD")
            .select('VV')
            .filterDate(ini,fim)
//print(SVV.limit(10))
//
//
var SVH = ee.ImageCollection("COPERNICUS/S1_GRD")
            .select('VH')
            .filterDate(ini,fim)
//print(SVH.limit(10))
//Sea Surface Elevation
//var SSE = ee.ImageCollection("HYCOM/sea_surface_elevation")
//            .select('surface_elevation')
//            .filterDate(ini,fim)
//print(SSE.limit(10))
//Water Velocity
var WVEL = ee.ImageCollection("HYCOM/sea_water_velocity")
             .select('velocity_u_0')
             .filterDate(ini,fim)
//Temperature
var TEMP = ee.ImageCollection("NOAA/CDR/OISST/V2")
             .select('sst')
             .filterDate(ini,fim)
////Temperature anomaly
//var TEMPANORM = ee.ImageCollection("NOAA/CDR/OISST/V2")
//                  .select('anom')
//                  .filterDate(ini,fim)
//
////ice
//var ICE = ee.ImageCollection("NOAA/CDR/OISST/V2")
//                  .select('ice')
//                  .filterDate(ini,fim)
//
// Salinidade
var SAL = ee.ImageCollection("HYCOM/sea_temp_salinity")
            .select('salinity_0')
            .filterDate(ini,fim)
//filteredLandsat
/////////////////////////////////
/////Inclui Logo ////////////////
/////////////////////////////////
//var logos = require('users/CartasSol/package:Arida/EXEINI').Aridas;
//var logos = require('users/rnvuefsppgm/proantar:logoproantar').Aridas;
var logos = require('users/rnvuefsppgm/proantar:broil').Aridas;
//users/rnvuefsppgm/proantarlogo/broil_georef
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';
/////////////////////////////////
/////Funcao add dados ///////////
/////////////////////////////////
// Use this function to add variables, time and a constant
// Sentinel 1 HH.
//var addVariablesSHH = function(image) {
//  // Compute time in fractional years since the epoch.
//  var date = ee.Date(image.get(timeField));
//  var years = date.difference(ee.Date('1970-01-01'), 'year');
//  // Return the image with the added bands.
//  return image
//    // Add an SSE band scaled.
//    //.addBands(image.select("HH").multiply(1).rename('HH_1')).float()
//    // Add a time band.
//    .addBands(ee.Image(years).rename('t').float())
//    // Add a constant band.
//    .addBands(ee.Image.constant(1));
//};
//
//// Use this function to add variables, time and a constant
//// Sentinel 1 HV.
//var addVariablesSHV = function(image) {
//  // Compute time in fractional years since the epoch.
//  var date = ee.Date(image.get(timeField));
//  var years = date.difference(ee.Date('1970-01-01'), 'year');
//  // Return the image with the added bands.
//  return image
//    // Add an SSE band scaled.
//    //.addBands(image.select("HV").multiply(1).rename('HV_1')).float()
//    // Add a time band.
//    .addBands(ee.Image(years).rename('t').float())
//    // Add a constant band.
//    .addBands(ee.Image.constant(1));
//};
// Use this function to add variables, time and a constant
// Sentinel 1 VV.
var addVariablesCHLORA = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an SSE band scaled.
    //.addBands(image.multiply(0.001).rename('SSE')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables, time and a constant
// Sentinel 1 VV.
var addVariablesSVV = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an SSE band scaled.
    //.addBands(image.multiply(0.001).rename('SSE')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables, time and a constant
// Sentinel 1 VH.
var addVariablesSVH = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an SSE band scaled.
    //.addBands(image.multiply(0.001).rename('SSE')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
//// Use this function to add variables, time and a constant
//// HYCOM/sea_surface_elevation.
//var addVariablesSSE = function(image) {
//  // Compute time in fractional years since the epoch.
//  var date = ee.Date(image.get(timeField));
//  var years = date.difference(ee.Date('1970-01-01'), 'year');
//  // Return the image with the added bands.
//  return image
//    // Add an SSE band scaled.
//    .addBands(image.multiply(0.001).rename('SSE')).float()
//    // Add a time band.
//    .addBands(ee.Image(years).rename('t').float())
//    // Add a constant band.
//    .addBands(ee.Image.constant(1));
//};
// Use this function to add variables, time and a constant
// HYCOM/sea_water_velocity.
var addVariablesWVEL = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an WVEL band scaled.
    .addBands(image.multiply(0.001).rename('WVEL')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables, time and a constant
// NOAA/CDR/OISST/V2 Temperatura.
var addVariablesTEMP = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
     .addBands(image.multiply(0.001).rename('TEMP')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
//// Use this function to add variables, time and a constant
//// NOAA/CDR/OISST/V2 Temperature anomaly.
//var addVariablesTEMPANORM = function(image) {
//  // Compute time in fractional years since the epoch.
//  var date = ee.Date(image.get(timeField));
//  var years = date.difference(ee.Date('1970-01-01'), 'year');
//  // Return the image with the added bands.
//  return image
//    // Add an NDVI band.
//    .addBands(image.multiply(0.001).rename('TEMPANORM')).float()
//    // Add a time band.
//    .addBands(ee.Image(years).rename('t').float())
//    // Add a constant band.
//    .addBands(ee.Image.constant(1));
//};
//
//
//// Use this function to add variables, time and a constant
//// NOAA/CDR/OISST/V2 ICE.
//var addVariablesICE = function(image) {
//  // Compute time in fractional years since the epoch.
//  var date = ee.Date(image.get(timeField));
//  var years = date.difference(ee.Date('1970-01-01'), 'year');
//  // Return the image with the added bands.
//  return image
//    // Add an NDVI band.
//    .addBands(image.multiply(0.001).rename('ICE')).float()
//    // Add a time band.
//    .addBands(ee.Image(years).rename('t').float())
//    // Add a constant band.
//    .addBands(ee.Image.constant(1));
//};
// Use this function to add variables, time and a constant
// HYCOM/sea_temp_salinity.
var addVariablesSAL = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.multiply(0.001).rename('SAL')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
////////////////////////// GUI p/ ferramenta
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.add(logos);
panel.style().set({ 'width': '500px',
                   'padding': '2px'//,
                   //'stretch': 'horizontal'
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'BROIL-Inspetor',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label('Clique para inspeção')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(point,"point")
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
/////collection data
//print(SHH.limit(10),"SHH")
// add variables and filter to the area of interest surface_elevation.
//var filteredSHH = SHH
//  .filterBounds(point)
//  .map(addVariablesSHH)
//  .select("")
//  
//print(filteredSHH.limit(10),"filteredSHH")
//
//// add variables and filter to the area of interest surface_elevation.
//var filteredSHV = SHV
//  .filterBounds(point)
//  .map(addVariablesSHV)
//print(filteredSHV.limit(10),"filteredSHV")
// add variables and filter to the area of interest surface_elevation.
var filteredCHLORA = CHLORA
  .filterBounds(point)
  .map(addVariablesCHLORA);
print(filteredCHLORA.limit(10),"filteredSVV")
// add variables and filter to the area of interest surface_elevation.
var filteredSVV = SVV
  .filterBounds(point)
  .map(addVariablesSVV);
print(filteredSVV.limit(10),"filteredSVV")
// add variables and filter to the area of interest surface_elevation.
var filteredSVH = SVH
  .filterBounds(point)
  .map(addVariablesSVH);
print(filteredSVH.limit(10),"filteredSVH")
//
// add variables and filter to the area of interest surface_elevation.
//var filteredSSE = SSE
//  .filterBounds(point)
//  .map(addVariablesSSE);
//print(filteredSSE.limit(10),"filteredSSE")
//
// add variables and filter to the area of interest sea_water_velocit.
var filteredWVEL = WVEL
  .filterBounds(point)
  .map(addVariablesWVEL);
//print(filteredWVEL.limit(10),"filteredWVEL")
// add variables and filter to the area of interest temperature.
var filteredTEMP = TEMP
  .filterBounds(point)
  .map(addVariablesTEMP);
//print(filteredTEMP.limit(10),"filteredTEMP")
// add variables and filter to the area of interest temperature anormaly.
//var filteredTEMPANORM = TEMPANORM
//  .filterBounds(point)
//  .map(addVariablesTEMPANORM);
//print(filteredTEMPANORM.limit(10),"filteredTEMPANORM")  
//
//// add variables and filter to the area of interest ice.
//var filteredICE = ICE
//  .filterBounds(point)
//  .map(addVariablesICE);
//print(filteredICE.limit(10),"filteredICE")  
// add variables and filter to the area of interest salinity.
var filteredSAL = SAL
  .filterBounds(point)
  .map(addVariablesSAL);
//print(filteredSAL.limit(10),"filteredSAL")
//print(filteredLandsatS)
/////////////////////////////////////////////////
/////// Linear trend/////////////////////////////
/////////////////////////////////////////////////
var independents = ee.List(['constant', 't']);
//var dependentSHH = ee.String('HH');
//var trendSHH = filteredSHH.select(independents.add(dependentSHH))
//    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trendSHH, {}, 'trend array image trendSHH');
//
//
//var dependentSHV = ee.String('HV');
//var trendSHV = filteredSHV.select(independents.add(dependentSHV))
//    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
var dependentCHLORA = ee.String('chlor_a');
var trendCHLORA = filteredCHLORA.select(independents.add(dependentCHLORA))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
var dependentSVV = ee.String('VV');
var trendSVV = filteredSVV.select(independents.add(dependentSVV))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
var dependentSVH = ee.String('VH');
var trendSVH = filteredSVH.select(independents.add(dependentSVH))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
//// Compute a linear trend SSE.  This will have two bands: 'residuals' and 
//// a 2x1 band called coefficients (columns are for dependent variables).
//// Name of the dependent variable.
//var dependentSSE = ee.String('SSE');
//var trendSSE = filteredSSE.select(independents.add(dependentSSE))
//    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
//// Map.addLayer(trend, {}, 'trend array image');
//
// Compute a linear trend WVEL.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
// Name of the dependent variable.
var dependentWVEL = ee.String('WVEL');
var trendWVEL = filteredWVEL.select(independents.add(dependentWVEL))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend TEMP.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
// Name of the dependent variable.
var dependentTEMP = ee.String('TEMP');
var trendTEMP = filteredTEMP.select(independents.add(dependentTEMP))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
//// Compute a linear trend TEMPANORM.  This will have two bands: 'residuals' and 
//// a 2x1 band called coefficients (columns are for dependent variables).
//// Name of the dependent variable.
//var dependentTEMPANORM = ee.String('TEMPANORM');
//var trendTEMPANORM = filteredTEMPANORM.select(independents.add(dependentTEMPANORM))
//    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
//// Map.addLayer(trend, {}, 'trend array image');
//
//
//// Compute a linear trend ICE.  This will have two bands: 'residuals' and 
//// a 2x1 band called coefficients (columns are for dependent variables).
//// Name of the dependent variable.
//var dependentICE = ee.String('ICE');
//var trendICE = filteredICE.select(independents.add(dependentICE))
//    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
//// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend SAL.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
// Name of the dependent variable.
var dependentSAL = ee.String('SAL');
var trendSAL = filteredSAL.select(independents.add(dependentSAL))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
/////////////////////////////////////////////////
/////// Flatten the coefficients/////////////////
/////////////////////////////////////////////////
  // Flatten the coefficients into a 2-band image
//var coefficientsSHH = trendSHH.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([independents]);
//  
//  // Flatten the coefficients into a 2-band image
//var coefficientsSHV = trendSHV.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([independents]);
var coefficientsCHLORA = trendCHLORA.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents])
  // Flatten the coefficients into a 2-band image
var coefficientsSVV = trendSVV.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
  // Flatten the coefficients into a 2-band image
var coefficientsSVH = trendSVH.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
//var coefficientsSSE = trendSSE.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([independents]);
//  
  // Flatten the coefficients into a 2-band image
var coefficientsWVEL = trendWVEL.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
var coefficientsTEMP = trendTEMP.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
//var coefficientsTEMPANORM = trendTEMPANORM.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([independents]);
//  
//// Flatten the coefficients into a 2-band image
//var coefficientsICE = trendICE.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
var coefficientsSAL = trendSAL.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
/////////////////////////////////////////////////
/////// Trended series///////////////////////////
/////////////////////////////////////////////////
//filteredSSE
// Compute a de-trended series.
//var detrendedSHH = filteredSHH.map(function(image) {
//  return image.select(dependentSHH).subtract(
//          image.select(independents).multiply(coefficientsSHH).reduce('sum'))
//          .rename(dependentSHH)
//          .copyProperties(image, [timeField]);
//});
//
//// Compute a de-trended series.
//var detrendedSHV = filteredSHV.map(function(image) {
//  return image.select(dependentSHV).subtract(
//          image.select(independents).multiply(coefficientsSHV).reduce('sum'))
//          .rename(dependentSHV)
//          .copyProperties(image, [timeField]);
//});
// Compute a de-trended series.
var detrendedCHLORA = filteredCHLORA.map(function(image) {
  return image.select(dependentCHLORA).subtract(
          image.select(independents).multiply(coefficientsCHLORA).reduce('sum'))
          .rename(dependentCHLORA)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrendedSVV = filteredSVV.map(function(image) {
  return image.select(dependentSVV).subtract(
          image.select(independents).multiply(coefficientsSVV).reduce('sum'))
          .rename(dependentSVV)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrendedSVH = filteredSVH.map(function(image) {
  return image.select(dependentSVH).subtract(
          image.select(independents).multiply(coefficientsSVH).reduce('sum'))
          .rename(dependentSVH)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
//var detrendedSSE = filteredSSE.map(function(image) {
//  return image.select(dependentSSE).subtract(
//          image.select(independents).multiply(coefficientsSSE).reduce('sum'))
//          .rename(dependentSSE)
//          .copyProperties(image, [timeField]);
//});
// Compute a de-trended series.
var detrendedWVEL = filteredWVEL.map(function(image) {
  return image.select(dependentWVEL).subtract(
          image.select(independents).multiply(coefficientsWVEL).reduce('sum'))
          .rename(dependentWVEL)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrendedTEMP = filteredTEMP.map(function(image) {
  return image.select(dependentTEMP).subtract(
          image.select(independents).multiply(coefficientsTEMP).reduce('sum'))
          .rename(dependentTEMP)
          .copyProperties(image, [timeField]);
});
//// Compute a de-trended series.
//var detrendedTEMPANORM = filteredTEMPANORM.map(function(image) {
//  return image.select(dependentTEMPANORM).subtract(
//          image.select(independents).multiply(coefficientsTEMPANORM).reduce('sum'))
//          .rename(dependentTEMPANORM)
//          .copyProperties(image, [timeField]);
//});
//
//// Compute a de-trended series.
//var detrendedICE = filteredICE.map(function(image) {
//  return image.select(dependentICE).subtract(
//          image.select(independents).multiply(coefficientsICE).reduce('sum'))
//          .rename(dependentICE)
//          .copyProperties(image, [timeField]);
//});
// Compute a de-trended series.
var detrendedSAL = filteredSAL.map(function(image) {
  return image.select(dependentSAL).subtract(
          image.select(independents).multiply(coefficientsSAL).reduce('sum'))
          .rename(dependentSAL)
          .copyProperties(image, [timeField]);
});
/////////////////////////////////////////////////
/////// Harmonic trend //////////////////////////
////////////////////////////////////////////////
// Use these independent variables in the harmonic regression SSE.
//var harmonicIndependentsSHH = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression WVEL.
//var harmonicIndependentsSHV = ee.List(['constant', 't', 'cos', 'sin']);
//// Use these independent variables in the harmonic regression TEMP.
var harmonicIndependentsCHLORA = ee.List(['constant', 't', 'cos', 'sin']);
//// Use these independent variables in the harmonic regression TEMP.
var harmonicIndependentsSVV = ee.List(['constant', 't', 'cos', 'sin']);
//
//// Use these independent variables in the harmonic regression TEMP.
var harmonicIndependentsSVH = ee.List(['constant', 't', 'cos', 'sin']);
//// Use these independent variables in the harmonic regression SSE.
//var harmonicIndependentsSSE = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression WVEL.
var harmonicIndependentsWVEL = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression TEMP.
var harmonicIndependentsTEMP = ee.List(['constant', 't', 'cos', 'sin']);
//// Use these independent variables in the harmonic regression TEMPANORM.
//var harmonicIndependentsTEMPANORM = ee.List(['constant', 't', 'cos', 'sin']);
//
//// Use these independent variables in the harmonic regression ICE.
//var harmonicIndependentsICE = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression SAL
var harmonicIndependentsSAL = ee.List(['constant', 't', 'cos', 'sin']);
/////////////////////////////////////////////////
/////// Harmonic ADD BANDS///////////////////////
/////////////////////////////////////////////////
// Add harmonic terms as new image bands SSE.
//var harmonicSHH = filteredSHH.map(function(image) {
//  var timeRadians = image.select('t').multiply(2 * Math.PI);
//  return image
//    .addBands(timeRadians.cos().rename('cos'))
//    .addBands(timeRadians.sin().rename('sin'));
//});
//
//// Add harmonic terms as new image bands SSE.
//var harmonicSHV = filteredSHV.map(function(image) {
//  var timeRadians = image.select('t').multiply(2 * Math.PI);
//  return image
//    .addBands(timeRadians.cos().rename('cos'))
//    .addBands(timeRadians.sin().rename('sin'));
//});
// Add harmonic terms as new image bands SSE.
var harmonicCHLORA = filteredCHLORA.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands SSE.
var harmonicSVV = filteredSVV.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands SSE.
var harmonicSVH = filteredSVH.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
//// Add harmonic terms as new image bands SSE.
//var harmonicSSE = filteredSSE.map(function(image) {
//  var timeRadians = image.select('t').multiply(2 * Math.PI);
//  return image
//    .addBands(timeRadians.cos().rename('cos'))
//    .addBands(timeRadians.sin().rename('sin'));
//});
//
// Add harmonic terms as new image bands L7.
var harmonicWVEL = filteredWVEL.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands L7.
var harmonicTEMP = filteredTEMP.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
//// Add harmonic terms as new image bands Modis.
//var harmonicTEMPANORM = filteredTEMPANORM.map(function(image) {
//  var timeRadians = image.select('t').multiply(2 * Math.PI);
//  return image
//    .addBands(timeRadians.cos().rename('cos'))
//    .addBands(timeRadians.sin().rename('sin'));
//});
//
//// Add harmonic terms as new image bands Sentinel.
//var harmonicICE = filteredICE.map(function(image) {
//  var timeRadians = image.select('t').multiply(2 * Math.PI);
//  return image
//    .addBands(timeRadians.cos().rename('cos'))
//    .addBands(timeRadians.sin().rename('sin'));
//});
// Add harmonic terms as new image bands Sentinel.
var harmonicSAL = filteredSAL.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
////////////////////////////
//// LinearTrend /////////  
/////////////////////////// 
  // The output of the regression reduction is a 4x1 array image L7.
//var harmonicTrendSHH = harmonicSHH
//  .select(harmonicIndependentsSHH.add(dependentSHH))
//  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSHH.length(), 1));
//  
//  // The output of the regression reduction is a 4x1 array image L7.
//var harmonicTrendSHV = harmonicSHV
//  .select(harmonicIndependentsSHV.add(dependentSHV))
//  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSHV.length(), 1));
// 
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrendCHLORA = harmonicCHLORA
  .select(harmonicIndependentsCHLORA.add(dependentCHLORA))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsCHLORA.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrendSVV = harmonicSVV
  .select(harmonicIndependentsSVV.add(dependentSVV))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSVV.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrendSVH = harmonicSVH
  .select(harmonicIndependentsSVH.add(dependentSVH))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSVH.length(), 1));
// The output of the regression reduction is a 4x1 array image L8.
//var harmonicTrendSSE = harmonicSSE
//  .select(harmonicIndependentsSSE.add(dependentSSE))
//  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSSE.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrendWVEL = harmonicWVEL
  .select(harmonicIndependentsWVEL.add(dependentWVEL))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsWVEL.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrendTEMP = harmonicTEMP
  .select(harmonicIndependentsTEMP.add(dependentTEMP))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsTEMP.length(), 1));
//  // The output of the regression reduction is a 4x1 array image Modis.
//var harmonicTrendTEMPANORM = harmonicTEMPANORM
//  .select(harmonicIndependentsTEMPANORM.add(dependentTEMPANORM))
//  .reduce(ee.Reducer.linearRegression(harmonicIndependentsTEMPANORM.length(), 1));
//  
//  // The output of the regression reduction is a 4x1 array image Sentinel.
//var harmonicTrendICE = harmonicICE
//  .select(harmonicIndependentsICE.add(dependentICE))
//  .reduce(ee.Reducer.linearRegression(harmonicIndependentsICE.length(), 1));
 // The output of the regression reduction is a 4x1 array image Sentinel.
var harmonicTrendSAL = harmonicSAL
  .select(harmonicIndependentsSAL.add(dependentSAL))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsSAL.length(), 1));
///////////////////////////////////////
//// HarmonicTrend - COEFICIENT//////////  
///////////////////////////////////////  
// Turn the array image into a multi-band image of coefficients L5.
//var harmonicTrendCoefficientsSHH = harmonicTrendSHH.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([harmonicIndependentsSHH]);
//  
//// Turn the array image into a multi-band image of coefficients L5.
//var harmonicTrendCoefficientsSHV = harmonicTrendSHV.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([harmonicIndependentsSHV]);
//
// Turn the array image into a multi-band image of coefficients L5.
var harmonicTrendCoefficientsCHLORA = harmonicTrendCHLORA.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsCHLORA]);
// Turn the array image into a multi-band image of coefficients L5.
var harmonicTrendCoefficientsSVV = harmonicTrendSVV.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsSVV]);
// Turn the array image into a multi-band image of coefficients L5.
var harmonicTrendCoefficientsSVH = harmonicTrendSVH.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsSVH]);
//// Turn the array image into a multi-band image of coefficients L8.
//var harmonicTrendCoefficientsSSE = harmonicTrendSSE.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([harmonicIndependentsSSE]);
//  
// Turn the array image into a multi-band image of coefficients L5.
var harmonicTrendCoefficientsWVEL = harmonicTrendWVEL.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsWVEL]);
// Turn the array image into a multi-band image of coefficients L7.
var harmonicTrendCoefficientsTEMP = harmonicTrendTEMP.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsTEMP]);
//// Turn the array image into a multi-band image of coefficients Modis.
//var harmonicTrendCoefficientsTEMPANORM = harmonicTrendTEMPANORM.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([harmonicIndependentsTEMPANORM]);
//  
//// Turn the array image into a multi-band image of coefficients Sentinel.
//var harmonicTrendCoefficientsICE = harmonicTrendICE.select('coefficients')
//  .arrayProject([0])
//  .arrayFlatten([harmonicIndependentsICE]);
// Turn the array image into a multi-band image of coefficients Sentinel.
var harmonicTrendCoefficientsSAL = harmonicTrendSAL.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsSAL]);
////////////////////////////
//// FITTED MODEL//////////  
///////////////////////////
// Compute fitted values WVEL.
//var fittedHarmonicSHH = harmonicSHH.map(function(image) {
//  return image.addBands(
//    image.select(harmonicIndependentsSHH)
//      .multiply(harmonicTrendCoefficientsSHH)
//      .reduce('sum')
//      .rename('fitted'));
//});
//
//// Compute fitted values WVEL.
//var fittedHarmonicSHV = harmonicSHV.map(function(image) {
//  return image.addBands(
//    image.select(harmonicIndependentsSHV)
//      .multiply(harmonicTrendCoefficientsSHV)
//      .reduce('sum')
//      .rename('fitted'));
//});
//// Compute fitted values WVEL.
var fittedHarmonicCHLORA = harmonicCHLORA.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsCHLORA)
      .multiply(harmonicTrendCoefficientsCHLORA)
      .reduce('sum')
      .rename('fitted'));
});
//// Compute fitted values WVEL.
var fittedHarmonicSVV = harmonicSVV.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsSVV)
      .multiply(harmonicTrendCoefficientsSVV)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values WVEL.
var fittedHarmonicSVH = harmonicSVH.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsSVH)
      .multiply(harmonicTrendCoefficientsSVH)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values SEE.
//var fittedHarmonicSSE = harmonicSSE.map(function(image) {
//  return image.addBands(
//    image.select(harmonicIndependentsSSE)
//      .multiply(harmonicTrendCoefficientsSSE)
//      .reduce('sum')
//      .rename('fitted'));
//});
// Compute fitted values WVEL.
var fittedHarmonicWVEL = harmonicWVEL.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsWVEL)
      .multiply(harmonicTrendCoefficientsWVEL)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values TEMP.
var fittedHarmonicTEMP = harmonicTEMP.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsTEMP)
      .multiply(harmonicTrendCoefficientsTEMP)
      .reduce('sum')
      .rename('fitted'));
});
//// Compute fitted values TEMPANORM.
//var fittedHarmonicTEMPANORM = harmonicTEMPANORM.map(function(image) {
//  return image.addBands(
//    image.select(harmonicIndependentsTEMPANORM)
//      .multiply(harmonicTrendCoefficientsTEMPANORM)
//      .reduce('sum')
//      .rename('fitted'));
//});
//
//// Compute fitted values ICE.
//var fittedHarmonicICE = harmonicICE.map(function(image) {
//  return image.addBands(
//    image.select(harmonicIndependentsICE)
//      .multiply(harmonicTrendCoefficientsICE)
//      .reduce('sum')
//      .rename('fitted'));
//});
// Compute fitted values SAL.
var fittedHarmonicSAL = harmonicSAL.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsSAL)
      .multiply(harmonicTrendCoefficientsSAL)
      .reduce('sum')
      .rename('fitted'));
});
////////////////////////////
////PLOTS FITTED MODEL////// 
///////////////////////////
//// Plot the fitted model and the original data at the ROI- Modis.
////print(
//    var ChartSHH= ui.Chart.image.series(
//      fittedHarmonicSHH.select(['fitted','HH']), point, ee.Reducer.mean(), 30)
//        .setSeriesNames(['HH', 'fitted'])
//        .setOptions({
//          trendlines: {0: {
//            color: 'CC0000'
//          }},
//          title: 'BANDA-HH',
//          lineWidth: 1,
//          //max: 750,
//          pointSize: 3,
//    });
//panel.widgets().set(2, ChartSHH);
//
//// Plot the fitted model and the original data at the ROI- Modis.
////print(
//    var ChartSHV= ui.Chart.image.series(
//      fittedHarmonicSHV.select(['fitted','HV']), point, ee.Reducer.mean(), 30)
//        .setSeriesNames(['HV', 'fitted'])
//        .setOptions({
//          trendlines: {0: {
//            color: 'CC0000'
//          }},
//          title: 'BANDA-HV',
//          lineWidth: 1,
//          //max: 750,
//          pointSize: 3,
//    });
//panel.widgets().set(3, ChartSHV);
// Plot the fitted model and the original data at the ROI- Modis.
//print(
    var ChartSVV= ui.Chart.image.series(
      fittedHarmonicSVV.select(['fitted','VV']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['VV', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'BANDA-VV',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(2, ChartSVV);
// Plot the fitted model and the original data at the ROI- Modis.
//print(
    var ChartSVH= ui.Chart.image.series(
      fittedHarmonicSVH.select(['fitted','VH']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['VH', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'BANDA-VH',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(3, ChartSVH);
//// Plot the fitted model and the original data at the ROI- Modis.
////print(
//    var ChartSSE= ui.Chart.image.series(
//      fittedHarmonicSSE.select(['fitted','SSE']), point, ee.Reducer.mean(), 30)
//        .setSeriesNames(['SSE', 'fitted'])
//        .setOptions({
//          trendlines: {0: {
//            color: 'CC0000'
//          }},
//          title: 'SSE',
//          lineWidth: 1,
//          //max: 750,
//          pointSize: 3,
//    });
//panel.widgets().set(2, ChartSSE);
// Plot the fitted model and the original data at the ROI - L8.
//print(
    var ChartWVEL= ui.Chart.image.series(
      fittedHarmonicWVEL.select(['fitted','WVEL']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['WVEL', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'WVEL',
          lineWidth: 1,
          pointSize: 3,
    });
panel.widgets().set(4, ChartWVEL);
// Plot the fitted model and the original data at the ROI - L7.
//print(
    var ChartTEMP= ui.Chart.image.series(
      fittedHarmonicTEMP.select(['fitted','TEMP']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['TEMP', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'TEMP',
          lineWidth: 1,
          pointSize: 3,
    });
panel.widgets().set(5, ChartTEMP);
//// Plot the fitted model and the original data at the ROI - L7.
////print(
//    var ChartTEMPANORM= ui.Chart.image.series(
//     // fittedHarmonicTEMPANORM.select(['fitted','TEMPANORM']), point, ee.Reducer.mean(), 30)
//      fittedHarmonicTEMPANORM.select('TEMPANORM'), point, ee.Reducer.mean(), 30)
//        //.setSeriesNames(['TEMPANORM', 'fitted'])
//        .setSeriesNames(['TEMPANORM'])
//        .setOptions({
//         //trendlines: {0: {
//         //  color: 'CC0000'
//         //}},
//          title: 'TEMPANORM',
//          lineWidth: 1,
//          pointSize: 3,
//    });
//panel.widgets().set(5, ChartTEMPANORM);
//
//
//// Plot the fitted model and the original data at the ROI- Modis.
////print(
//    var ChartICE= ui.Chart.image.series(
//      fittedHarmonicICE.select(['fitted','ICE']), point, ee.Reducer.mean(), 10)
//        .setSeriesNames(['ICE', 'fitted'])
//        .setOptions({
//          trendlines: {0: {
//            color: 'CC0000'
//          }},
//          title: 'ICE',
//          lineWidth: 1,
//          //max: 750,
//          pointSize: 3,
//    });
//panel.widgets().set(6, ChartICE);
// Plot the fitted model and the original data at the ROI- Modis.
//print(
    var ChartSAL= ui.Chart.image.series(
      fittedHarmonicSAL.select(['fitted','SAL']), point, ee.Reducer.mean(), 10)
        .setSeriesNames(['SAL', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'SAL',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(6, ChartSAL);
    var ChartCHLORA= ui.Chart.image.series(
      fittedHarmonicCHLORA.select(['fitted','chlor_a']), point, ee.Reducer.mean(), 10)
        .setSeriesNames(['chlor_a', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'chlor_a',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(7, ChartCHLORA);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//Map.setCenter(-17.63, -21.01, 3)
Map.setCenter(9.28, 43.31,12)
var SVix = ee.ImageCollection("COPERNICUS/S1_GRD")
             .filterBounds(geometry)
             .select('VV')
             .filterDate('2018-10-08','2018-10-09')
Map.addLayer(SVix.first(), {min: -25, max: 5}, 'Image', true);