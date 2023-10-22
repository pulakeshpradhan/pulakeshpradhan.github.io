var SSTA = ui.import && ui.import("SSTA", "imageCollection", {
      "id": "NOAA/CDR/OISST/V2"
    }) || ee.ImageCollection("NOAA/CDR/OISST/V2"),
    CHLA = ui.import && ui.import("CHLA", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "correlation"
        ],
        "min": -0.35,
        "max": 0.35,
        "palette": [
          "0000ff",
          "ffffff",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["correlation"],"min":-0.35,"max":0.35,"palette":["0000ff","ffffff","ff0000"]},
    GSMD = ui.import && ui.import("GSMD", "imageCollection", {
      "id": "NASA_USDA/HSL/soil_moisture"
    }) || ee.ImageCollection("NASA_USDA/HSL/soil_moisture"),
    GLDAS = ui.import && ui.import("GLDAS", "imageCollection", {
      "id": "NASA/GLDAS/V021/NOAH/G025/T3H"
    }) || ee.ImageCollection("NASA/GLDAS/V021/NOAH/G025/T3H"),
    FLDAS = ui.import && ui.import("FLDAS", "imageCollection", {
      "id": "NASA/FLDAS/NOAH01/C/GL/M/V001"
    }) || ee.ImageCollection("NASA/FLDAS/NOAH01/C/GL/M/V001"),
    chirps = ui.import && ui.import("chirps", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    grace = ui.import && ui.import("grace", "imageCollection", {
      "id": "NASA/GRACE/MASS_GRIDS/LAND"
    }) || ee.ImageCollection("NASA/GRACE/MASS_GRIDS/LAND"),
    nilebasin = ui.import && ui.import("nilebasin", "table", {
      "id": "users/wenzhaoli1989/nileBasin"
    }) || ee.FeatureCollection("users/wenzhaoli1989/nileBasin");
// Import GEE feature collection 
var mekong_basin = ee.FeatureCollection('projects/ee-juntakut37/assets/lower_mekong')
                 //.filter(ee.Filter.inList("HYBAS_ID",["4020015090"]));
Map.centerObject(mekong_basin, 5);
Map.addLayer(mekong_basin)
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// Using the randomPoints() to reduce computing time
var countryNames = ['Thailand']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,300).geometry();
var mekong_THAILAND = ee.Feature(intersection, {label: 'Thailand'});
var countryNames = ['Laos']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,300).geometry();
var mekong_LAOS = ee.Feature(intersection, {label: 'Laos'});
var countryNames = ['Vietnam']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,300).geometry();
var mekong_VIETNAM = ee.Feature(intersection, {label: 'Vietnam'});
var countryNames = ['Cambodia']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,300).geometry();
var mekong_CAMBODIA = ee.Feature(intersection, {label: 'Cambodia'});
var countryNames = ['Burma']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,200).geometry();
var mekong_BURMA = ee.Feature(intersection, {label: 'Burma'});
var countryNames = ['China']; 
var matchCountry = countries.filter(ee.Filter.inList('country_na', countryNames));
var roi= matchCountry.geometry();
var intersection = roi.intersection(mekong_basin,ee.ErrorMargin(1));
// var sample = ee.FeatureCollection.randomPoints(intersection,200).geometry();
var mekong_CHINA = ee.Feature(intersection, {label: 'China'});
var mekongCountries = ee.FeatureCollection(
  [mekong_THAILAND, mekong_LAOS, mekong_VIETNAM,
   mekong_CAMBODIA, mekong_BURMA, mekong_CHINA]);
var roi = mekongCountries;
Map.addLayer(roi)
Map.setOptions('HYBRID');
////////////////////////////////////////////
//defines period of interest
var startyear = 2002; 
var endyear = 2017; 
var startmonth =1;
var endmonth= 12;
// var startdate = ee.Date.fromYMD(startyear, startmonth, 1);
// var enddate = ee.Date.fromYMD(endyear+1 , endmonth, 31);
var years = ee.List.sequence(startyear, endyear);
var months = ee.List.sequence(startmonth,endmonth);
/////
var filtereq = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start',
});
var join = ee.Join.saveFirst({
    matchKey: 'match',
});
//////
var month = ee.List.sequence(1,12,1);
var startDate = ee.Date('2002-04-01'); // set start time for analysis
var endDate = ee.Date('2017-01-07'); // set end time for analysis
////////
chirps = chirps.filterDate(startDate,endDate)
var monthly_prec =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
    //print(m)
      var w = chirps.select(['precipitation'])
      .filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
monthly_prec = monthly_prec.filterDate(startDate,endDate)
grace = grace.filterDate(startDate,endDate)
var monthly_grace =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
    //print(m)
      var w = grace.select(['lwe_thickness_jpl'])
      .filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .filter(ee.Filter.calendarRange(1, 1, 'day_of_month'))
                    .mean();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1))
              ;
    });
  }).flatten()
);
print(monthly_grace)
var toMM = function(image) {
  return image
    .addBands(image.select('lwe_thickness_jpl').rename('LWE').multiply(10)).float()
};
// var monthly_grace_mm = monthly_grace.map(toMM).filterDate(startDate,endDate)
var monthly_fldas =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
    //print(m)
      var w = FLDAS.select(['Evap_tavg', 'Qsb_tavg', 'Qs_tavg'])
      .filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .filter(ee.Filter.calendarRange(1, 1, 'day_of_month'))
                    .mean().multiply(2592000).float();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
var renameET = function(image) {
  return image
    .addBands(image.select('Evap_tavg').rename('ET'))
};
monthly_fldas = monthly_fldas.filterDate(startDate,endDate).map(renameET)
var totalRunoff = function(image) {
  return image
    .addBands(image.select('Qsb_tavg').add(image.select('Qs_tavg'))
    .rename('Runoff'))
};
////
var monthly_ssm =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
    //print(m)
      var w = GSMD.select(['ssm'])
      .filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
///////
var temp = ee.ImageCollection(join.apply(monthly_prec, monthly_fldas, filtereq))
  .map(function(image) {
    return image.addBands(image.get('match'));
  });
var toPETR = function(image) {
  return image
    .addBands(image.select('precipitation').subtract(image.select('Qsb_tavg'))
    .subtract(image.select('Qs_tavg')).subtract(image.select('Evap_tavg'))
    .rename('P-ET-R'))
};
var temp2 = temp.map(toPETR).map(totalRunoff)
/////// To fill the missing GRACE data
var toFill = function(image) {
  return ee.Algorithms.If(image.bandNames().contains('lwe_thickness_jpl'),
  image, image.addBands(ee.Image().rename('lwe_thickness_jpl')))
};
var grace_new = monthly_grace.map(toFill, true)
grace_new = grace_new.map(toMM)
print('grace_new',grace_new)
var final = ee.ImageCollection(join.apply(temp2, grace_new, filtereq))
  .map(function(image) {
    return image.addBands(image.get('match'));
  });
// var final = ee.ImageCollection(join.apply(final, monthly_ssm, filtereq))
//   .map(function(image) {
//     return image.addBands(image.get('match'));
//   });
print('final', final)
//////
var imageVisParam9 = {"opacity":1,"bands":["slope"],"min":-1,"max":1,"palette":["0000ff","ffffff","ff0000"]};
var independents = ee.List(['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']);
var imageVisParam8 = {"opacity":1,"bands":
  ["p-value"],"min":0,"max":0.05,"palette":["0000ff","ffffff","ff0000"]};
function addIndependentVariables1(image) {
  var date = ee.Date(image.get('system:time_start'));
  // var time = image.date().difference(ee.Date('2000-01-01'), 'year');
  var time = date.difference(ee.Date('2000-01-01'), 'year');
  var sin = time.multiply(2 * Math.PI).sin();
  var cos = time.multiply(2 * Math.PI).cos();
  var sin2 = time.multiply(4 * Math.PI).sin();
  var cos2 = time.multiply(4 * Math.PI).cos();
  // Assemble the four independent variables as image bands.
  var independent = ee.Image([sin, cos, sin2, cos2, time, 1]).double()
    .rename(['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']);
  return image.addBands(independent);
  // image.double().reproject('EPSG:4326')
  // return independent.addBands(image);
}
function addIndependentVariables2(image) {
  var date = ee.Date(image.get('system:time_start'));
  // var time = image.date().difference(ee.Date('2000-01-01'), 'year');
  var time = date.difference(ee.Date('2000-01-01'), 'year');
  var sin = time.multiply(2 * Math.PI).sin();
  var cos = time.multiply(2 * Math.PI).cos();
  var sin2 = time.multiply(4 * Math.PI).sin();
  var cos2 = time.multiply(4 * Math.PI).cos();
  // Assemble the four independent variables as image bands.
  var independent = ee.Image([sin, cos, sin2, cos2, time, 1]).double()
    .rename(['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']);
  return independent.addBands(image);
}
var c = final.select('precipitation');
var regression = c.map(addIndependentVariables2)
  .reduce(ee.Reducer.linearRegression(6))
  .aside(print)
  .select('coefficients')
  .arrayProject([0])
  .arrayFlatten([['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']])
  // .divide(10000) // EVI
  .divide(1) // others
  ;
Map.addLayer(regression.clip(roi), imageVisParam9, 'precipitation Trend');
var visualization = regression.clip(roi).visualize(imageVisParam9);
var desc = 'image_' + 'precipitation_Trend'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
////
var dataHarmonic = c.map(addIndependentVariables1);
print(dataHarmonic);
var fittedHarmonic = dataHarmonic.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(regression)
      .reduce('sum')
      .rename('fitted'));
});
// print(fittedHarmonic);
var PC = fittedHarmonic.filterBounds(roi)
  .select(['precipitation','fitted'])
  .reduce(ee.Reducer.pearsonsCorrelation());
print(PC)
//Map.addLayer(PC.clip(roi),imageVisParam8,'crr_precipitation pvalue');
var visualization = PC.clip(roi).visualize(imageVisParam8);
var desc = 'image_' + 'precipitation_P_value'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
///////
var c = final.select('LWE');
var regression = c.map(addIndependentVariables2)
  .reduce(ee.Reducer.linearRegression(6))
  .aside(print)
  .select('coefficients')
  .arrayProject([0])
  .arrayFlatten([['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']])
  // .divide(10000) // EVI
  .divide(1) // others
  ;
Map.addLayer(regression.clip(roi), imageVisParam9, 'LWE Trend');
var visualization = regression.clip(roi).visualize(imageVisParam9);
var desc = 'image_' + 'LWE_Trend'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
////
var dataHarmonic = c.map(addIndependentVariables1);
print(dataHarmonic);
var fittedHarmonic = dataHarmonic.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(regression)
      .reduce('sum')
      .rename('fitted'));
});
// print(fittedHarmonic);
var PC = fittedHarmonic.filterBounds(roi)
  .select(['LWE','fitted'])
  .reduce(ee.Reducer.pearsonsCorrelation());
print(PC)
 Map.addLayer(PC.clip(roi),imageVisParam8,'crr_LWE pvalue');
//Map.addLayer(ee.Image(0.01).clip(roi),{},'crr_LWE pvalue');
var visualization = PC.clip(roi).visualize(imageVisParam8);
var desc = 'image_' + 'LWE_P_value'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
///////
var c = final.select('Runoff');
var regression = c.map(addIndependentVariables2)
  .reduce(ee.Reducer.linearRegression(6))
  .aside(print)
  .select('coefficients')
  .arrayProject([0])
  .arrayFlatten([['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']])
  // .divide(10000) // EVI
  .divide(1) // others
  ;
Map.addLayer(regression.clip(roi), imageVisParam9, 'Runoff Trend');
var visualization = regression.clip(roi).visualize(imageVisParam9);
var desc = 'image_' + 'Runoff_Trend'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
////
var dataHarmonic = c.map(addIndependentVariables1);
print(dataHarmonic);
var fittedHarmonic = dataHarmonic.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(regression)
      .reduce('sum')
      .rename('fitted'));
});
// print(fittedHarmonic);
var PC = fittedHarmonic.filterBounds(roi)
  .select(['Runoff','fitted'])
  .reduce(ee.Reducer.pearsonsCorrelation());
print(PC)
//Map.addLayer(PC.clip(roi),imageVisParam8,'crr_precipitation pvalue');
var visualization = PC.clip(roi).visualize(imageVisParam8);
var desc = 'image_' + 'runoff_P_value'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
///////
var c = final.select('ET');
var regression = c.map(addIndependentVariables2)
  .reduce(ee.Reducer.linearRegression(6))
  .aside(print)
  .select('coefficients')
  .arrayProject([0])
  .arrayFlatten([['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']])
  // .divide(10000) // EVI
  .divide(1) // others
  ;
Map.addLayer(regression.clip(roi), imageVisParam9, 'ET Trend');
var visualization = regression.clip(roi).visualize(imageVisParam9);
var desc = 'image_' + 'ET_Trend'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
////
var dataHarmonic = c.map(addIndependentVariables1);
print(dataHarmonic);
var fittedHarmonic = dataHarmonic.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(regression)
      .reduce('sum')
      .rename('fitted'));
});
// print(fittedHarmonic);
var PC = fittedHarmonic.filterBounds(roi)
  .select(['ET','fitted'])
  .reduce(ee.Reducer.pearsonsCorrelation());
print(PC)
// Map.addLayer(PC.clip(roi),imageVisParam8,'crr_precipitation pvalue');
var visualization = PC.clip(roi).visualize(imageVisParam8);
var desc = 'image_' + 'ET_P_value'; 
// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: visualization,
  description: desc,
  scale: 2500,
  region: roi
});
///////
// var c = final.select('ssm');
// var regression = c.map(addIndependentVariables2)
//   .reduce(ee.Reducer.linearRegression(6))
//   .aside(print)
//   .select('coefficients')
//   .arrayProject([0])
//   .arrayFlatten([['sin', 'cos', 'sin2', 'cos2', 'slope', 'offset']])
//   // .divide(10000) // EVI
//   .divide(1) // others
//   ;
// Map.addLayer(regression.clip(roi), imageVisParam9, 'ssm Trend');
// var visualization = regression.clip(roi).visualize(imageVisParam9);
// var desc = 'image_' + 'ssm_Trend'; 
// // Create a task that you can launch from the Tasks tab.
// Export.image.toDrive({
//   image: visualization,
//   description: desc,
//   scale: 2500,
//   region: roi
// });
// ///////
////////// Legend
var m = {};
m.palette = {
  minRgb: [255, 0, 0],
  midRgb: [255, 255, 255],
  maxRgb: [0, 0, 255],
  minVal: -1.0,
  midVal: 0,
  maxVal: 1.0
};
// Define a legend widget group.
var c = {};
c.map = ui.Map();
c.legend = {};
c.legend.title = ui.Label();
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label(imageVisParam9['min']);
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label(imageVisParam9['max']);
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
Map.add(c.legend.panel);
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '14px',
  color: '383838'
});
c.legend.title.style().set(s.opacityWhiteNone);
c.legend.colorbar.style().set({
  stretch: 'vertical',
  margin: '0px 8px',
  maxHeight: '20px'
});
c.legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '14px'
});
c.legend.leftLabel.style().set(s.opacityWhiteNone);
c.legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '14px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel.style().set(s.opacityWhiteNone);
c.legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '14px'
});
c.legend.rightLabel.style().set(s.opacityWhiteNone);
c.legend.panel.style().set({
  position: 'top-center',
  width: '200px',
  padding: '0px'});
c.legend.panel.style().set(s.opacityWhiteMed);
c.legend.labelPanel.style().set(s.opacityWhiteNone);
// Adds legend to the map.
drawLegend();
function drawLegend(imgDate) {
  c.legend.title.setValue('Trend');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '200x20',
    format: 'png',
    min: 0,
    max: 1,
    palette: ['red', 'white', 'blue']
  });
  c.legend.leftLabel.setValue(m.palette.minVal);
  c.legend.centerLabel.setValue(m.palette.midVal);
  c.legend.rightLabel.setValue(m.palette.maxVal);
}
// Set map bounds based on URL params.
c.map.setCenter({
  lon: ui.url.get('lon', 101.01),
  lat: ui.url.get('lat', 13.15),
  zoom: ui.url.get('zoom', 5.6)
});