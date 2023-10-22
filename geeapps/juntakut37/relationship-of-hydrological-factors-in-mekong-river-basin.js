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
    }) || ee.ImageCollection("NASA/GRACE/MASS_GRIDS/LAND");
// Import GEE feature collection 
var mekong_basin = ee.FeatureCollection('projects/ee-juntakut37/assets/mekong')
                 //.filter(ee.Filter.inList("HYBAS_ID",["4020015090"]));
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
////////////////////////////////////////
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
              .set('flag', 'grace')
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
print('final', final)
// //// inner join, not use for it affects 'system:index',
// //// For example 3 -> 3_3, not good for future lag correlation
// var filter = ee.Filter.equals({
//   leftField: 'system:time_start',
//   rightField: 'system:time_start'
// });
// // Create the join.
// var simpleJoin = ee.Join.inner();
// // Inner join
// var innerJoin = ee.ImageCollection(simpleJoin.apply(temp2, monthly_grace, filter))
// print(innerJoin)
// var joined = innerJoin.map(function(feature) {
//   return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
// }, true)
// print('joined', joined)
// /////
//////////
var corr=function(joined_collection,band1,band2){
  var coll=ee.ImageCollection(joined_collection);
  var corr_img=coll.select([band1, band2])
  .reduce(ee.Reducer.pearsonsCorrelation());
  var te=corr_img
  // .select('correlation');
  // .select('p-value');
  var test=te.clip(roi);
  return test;
};
var imageVisParam7 = {"opacity":1,"bands":
  ["correlation"],"min":-0.9,"max":0.9,"palette":["0000ff","ffffff","ff0000"]};
var imageVisParam8 = {"opacity":1,"bands":
  ["p-value"],"min":0,"max":0.05,"palette":["0000ff","ffffff","ff0000"]};
var crr_PETR_grace=corr(final,'P-ET-R', 'LWE');
print('crr_PETR_grace',crr_PETR_grace)
Map.addLayer(crr_PETR_grace,imageVisParam7,'crr_PETR_grace corr');
Map.addLayer(crr_PETR_grace,imageVisParam8,'crr_PETR_grace pvalue');
////////// Legend
var m = {};
m.palette = {
  minRgb: [255, 0, 0],
  midRgb: [255, 255, 255],
  maxRgb: [0, 0, 255],
  minVal: -0.9,
  midVal: 0,
  maxVal: 0.9
};
// Define a legend widget group.
var c = {};
c.map = ui.Map();
c.legend = {};
c.legend.title = ui.Label();
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label(imageVisParam7['min']);
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label(imageVisParam7['max']);
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
  c.legend.title.setValue('Correlation');
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
/////////////////////////////////////////////////////////
////////// Lag correlation studies for months 1, 2, 3
var addprop = function(image) {
    var sum = ee.Number.parse(image.get('system:index')).add(1);
  return image.set({'sum': sum});
};
var temp2_new_prop=temp2.map(addprop)
var grace_new_prop=grace_new.map(addprop)
var filtereq_3mon = ee.Filter.maxDifference({
  difference:3,
  leftField: 'sum',
  rightField: 'sum',
});
var filtereq_2mon = ee.Filter.maxDifference({
  difference:2,
  leftField: 'sum',
  rightField: 'sum',
});
var filtereq_1mon = ee.Filter.maxDifference({
  difference:1,
  leftField: 'sum',
  rightField: 'sum',
});
var join = ee.Join.saveFirst({
    matchKey: 'match',
    ordering: 'system:time_start',
    ascending: false,
});
var PETR_grace_m1 = ee.ImageCollection(join.apply(temp2_new_prop,grace_new_prop,filtereq_1mon))
  .map(function(image) {
    return image.addBands(image.get('match'));
  });
print(PETR_grace_m1)
var PETR_grace_m2 = ee.ImageCollection(join.apply(temp2_new_prop,grace_new_prop,filtereq_2mon))
  .map(function(image) {
    return image.addBands(image.get('match'));
  });
print(PETR_grace_m2)
var PETR_grace_m3 = ee.ImageCollection(join.apply(temp2_new_prop,grace_new_prop,filtereq_3mon))
  .map(function(image) {
    return image.addBands(image.get('match'));
  });
print(PETR_grace_m3)
////
var crr_PETR_grace_m1=corr(PETR_grace_m1,'P-ET-R', 'LWE');
print('crr_PETR_grace_m1',crr_PETR_grace_m1)
Map.addLayer(crr_PETR_grace_m1,imageVisParam7,'crr_PETR_grace_m1 corr');
Map.addLayer(crr_PETR_grace_m1,imageVisParam8,'crr_PETR_grace_m1 pvalue');
//////
var crr_PETR_grace_m2=corr(PETR_grace_m2,'P-ET-R', 'LWE');
print('crr_PETR_grace_m2',crr_PETR_grace_m2)
Map.addLayer(crr_PETR_grace_m2,imageVisParam7,'crr_PETR_grace_m2 corr');
Map.addLayer(crr_PETR_grace_m2,imageVisParam8,'crr_PETR_grace_m2 pvalue');
//////
var crr_PETR_grace_m3=corr(PETR_grace_m3,'P-ET-R', 'LWE');
print('crr_PETR_grace_m3',crr_PETR_grace_m3)
Map.addLayer(crr_PETR_grace_m3,imageVisParam7,'crr_PETR_grace_m3 corr');
Map.addLayer(crr_PETR_grace_m3,imageVisParam8,'crr_PETR_grace_m3 pvalue');
/////
var crr_P_grace=corr(final,'precipitation', 'LWE');
print('crr_P_grace',crr_P_grace)
Map.addLayer(crr_P_grace,imageVisParam7,'crr_P_grace corr');
Map.addLayer(crr_P_grace,imageVisParam8,'crr_P_grace pvalue');
var crr_Runoff_grace=corr(final,'Runoff', 'LWE');
print('crr_Runoff_grace',crr_Runoff_grace)
Map.addLayer(crr_Runoff_grace,imageVisParam7,'crr_Runoff_grace corr');
Map.addLayer(crr_Runoff_grace,imageVisParam8,'crr_Runoff_grace pvalue');
var crr_ET_grace=corr(final,'ET', 'LWE');
print('crr_ET_grace',crr_ET_grace)
Map.addLayer(crr_ET_grace,imageVisParam7,'crr_ET_grace corr');
Map.addLayer(crr_ET_grace,imageVisParam8,'crr_ET_grace pvalue');