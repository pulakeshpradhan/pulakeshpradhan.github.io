var color7 = ui.import && ui.import("color7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 7,
        "palette": [
          "040404",
          "c00e05",
          "ff4c4c",
          "ffc3a6",
          "fffdcf",
          "c7ff9c",
          "4cf507",
          "2f9904"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":7,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]},
    LSIBs = ui.import && ui.import("LSIBs", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    TrajectCalNDVI_MK_Sen_7clas_2000_2018 = ui.import && ui.import("TrajectCalNDVI_MK_Sen_7clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"),
    TrajectCalESPI_MK_Sen_7clas_2000_2018_v1 = ui.import && ui.import("TrajectCalESPI_MK_Sen_7clas_2000_2018_v1", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"),
    SWATI_Cal7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"),
    SWATI_Cal_ESPI7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal_ESPI7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"),
    SWATIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"),
    LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013"),
    SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"),
    UpperSakarya = ui.import && ui.import("UpperSakarya", "table", {
      "id": "users/cesarnon/Sakarya/UpperSakarya_edge_final"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/UpperSakarya_edge_final"),
    Ankara_beypazari = ui.import && ui.import("Ankara_beypazari", "table", {
      "id": "users/cesarnon/Sakarya/Micro_Ankara_beypazari"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/Micro_Ankara_beypazari"),
    Nasreddin_Hoca = ui.import && ui.import("Nasreddin_Hoca", "table", {
      "id": "users/cesarnon/Sakarya/Micro_Eskisehir_Nasreddin_Hoca"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/Micro_Eskisehir_Nasreddin_Hoca"),
    Porsuk_Cayi = ui.import && ui.import("Porsuk_Cayi", "table", {
      "id": "users/cesarnon/Sakarya/Micro_Eskisehir_Porsuk_Cayi"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/Micro_Eskisehir_Porsuk_Cayi"),
    kutahya_merkez = ui.import && ui.import("kutahya_merkez", "table", {
      "id": "users/cesarnon/Sakarya/Micro_kutahya_merkez"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/Micro_kutahya_merkez");
var microbasin= ee.FeatureCollection([Ankara_beypazari, Nasreddin_Hoca, Porsuk_Cayi,kutahya_merkez])
//Map.addLayer(LSIB,{},'LSIB')
//var zona = LSIB.filterMetadata('name', 'equals', 'NICARAGUA')
//var zona = LSIB.filterMetadata('region', 'equals', 'ASIA')
var zona = UpperSakarya
var centroide = zona.geometry().centroid().coordinates().getInfo()
//print(centroide,'centroide')
var zonaLat= centroide[0]
var zonaLong= centroide[1]
//print(zonaLat,'zonaLat')
var SWATIslope_ESPI_2001_2018 = SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)     
var SWATIslope_NDVI_2001_2018 = SWATIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)    
var SWATI_ESPI_2001_2018 = SWATI_Cal_ESPI7Clas_2000_2018.clip(zona)    
var SWATI_NDVI_2001_2018 = SWATI_Cal7Clas_2000_2018.clip(zona)    
var ESPI_MKSen_2001_2018 = TrajectCalESPI_MK_Sen_7clas_2000_2018_v1.clip(zona)    
var NDVI_MKSen_2001_2018 = TrajectCalNDVI_MK_Sen_7clas_2000_2018.clip(zona)   
Map.addLayer(SWATIslope_ESPI_2001_2018,color7,'SWATIslope_ESPI_2001_2018',false)    
Map.addLayer(SWATIslope_NDVI_2001_2018,color7,'SWATIslope_NDVI_2001_2018',false)    
Map.addLayer(SWATI_ESPI_2001_2018,color7,'SWATI_ESPI_2001_2018',false)    
Map.addLayer(SWATI_NDVI_2001_2018,color7,'SWATI_NDVI_2001_2018',false)    
Map.addLayer(ESPI_MKSen_2001_2018,color7,'ESPI_MKSen_2001_2018', false)    
Map.addLayer(NDVI_MKSen_2001_2018,color7,'NDVI_MKSen_2001_2018',false)    
/*
var reclas = function (ima){
  var ima2 = ee.Image(0)
      .where (ima.eq(1),-3)
      .where (ima.eq(2),-2)
      .where (ima.eq(3),-1)
      .where (ima.eq(4),0)
      .where (ima.eq(5),1)
      .where (ima.eq(6),2)
      .where (ima.eq(7),3)
      .mask(ima.neq(0))
  return ima2
  }
  *
var SWATIslope_ESPI_2001_2018r = reclas(SWATIslope_ESPI_2001_2018)    
var SWATIslope_NDVI_2001_2018r = reclas(SWATIslope_NDVI_2001_2018)  
var SWATI_ESPI_2001_2018r = reclas(SWATI_ESPI_2001_2018)  
var SWATI_NDVI_2001_2018r = reclas(SWATI_NDVI_2001_2018)
var ESPI_MKSen_2001_2018r = reclas(ESPI_MKSen_2001_2018)
var NDVI_MKSen_2001_2018r = reclas(NDVI_MKSen_2001_2018)
*/
var consensus = SWATIslope_ESPI_2001_2018
  .add(SWATIslope_NDVI_2001_2018)
  .add(SWATI_ESPI_2001_2018)
  .add(SWATI_NDVI_2001_2018)
  .add(ESPI_MKSen_2001_2018)
  .add(NDVI_MKSen_2001_2018)
  .divide(6)
  .round()
//var color7n = {"opacity":1,"bands":["constant"],"min":-3,"max":3,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]}
Map.addLayer(consensus,color7,'consensus')    
//
//
var yrStart = 2000;
var yrEnd = 2018; 
//make a list for calendar year computation / year 2000 is not complete so I added a +1
var years = ee.List.sequence(yrStart+1, yrEnd);
//print(years, 'years for calendar analysis')
//Load NDVI collection
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2000-07-01', '2018-12-31');
//print(modis, 'collection to process');
var modisFilter =ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2001-01-01', '2018-12-31')
.select('NDVI');
var months2 = ee.List.sequence(1, 12);
var years2 = ee.List.sequence(2001, 2018);
var byMonthYear = ee.ImageCollection.fromImages(
  years2.map(function(y) {
    return months2.map(function (m) {
      return modisFilter
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('system:time_start',ee.Date.fromYMD(y,m,01))
        //.set('month', m).set('year', y);
  });
}).flatten());
//print(byMonthYear,'byMonthYear')
var byMonthYear2 = byMonthYear.select('NDVI')
//Load water cover from same sensor
//make a mask for more permanent water bodies
var modiswater = ee.ImageCollection('MODIS/006/MOD44W').select('water_mask')
var waterMask = modiswater.sum().gte(12)// limit set on 12 years
var waterSum = modiswater.sum().reproject('SR-ORG:6974', null, 250)
//Map.addLayer(waterSum,{},'waterMask',false)
//create a variable for band naming
var nn = ee.String('ndvi_')
// Get the NDVI, EVI and ESPI Annual mean for every calendar Year 
// and replace bad quality pixels with anual mean
var byYear = ee.ImageCollection.fromImages(
      years.map(function (y) {
        //get the subset for the target year
        var modisYear = modis.filter(ee.Filter.calendarRange(y, y, 'year'))
        //get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean()
        // Make a funtion to replace bad pixels with the mean
        var maskQAYear = function(image) {
          var image2 = image.select('NDVI');
          var image2 = image2.where(image.select("SummaryQA").gte(2),modisYearMean);
        return image2.rename('NDVI');
        }
        var ModisYearCorrected = modisYear.map(maskQAYear)
        var ModisYearCorrmean = ModisYearCorrected.mean()//.reproject('SR-ORG:6974', null, 250)
                        .set('year', y)
                        .set('system:time_start',ee.Date.fromYMD(y,01,01))
                        //.rename(nn.cat(ee.String(ee.Number(y).toInt()))); // to name each band like "NDVI_yyyy"
        // Make a funtion to calculate ESPI
        var ModisYearmeanNDVI = ModisYearCorrmean.select('NDVI')
        var ModisYearstdDeNDVI = ModisYearCorrected.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVIs')
        var ModisYearcvNDVI = ModisYearstdDeNDVI.divide(ModisYearmeanNDVI).rename('NDVIcv')
        var uno = ee.Image(1)
        var ipse = ModisYearmeanNDVI.multiply(uno.subtract(ModisYearcvNDVI)).rename('ESPI')
        //add ESPI to corrected NDVI and EVI and return
        return ModisYearCorrmean.addBands(ipse)
}));
//print(byYear,'Colection of calendar year means');
///---------------------------------------------------------------
//-------------------------------------------------------------------------
// -------Create User Interface portion-----
// **  Also taken from a GEE example : 'Two Chart Inspector'
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
// Create an NDVI phenology year chart.
  var phenoChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  phenoChart.setOptions({
    title: 'MODIS NDVI calendar year (January to December)- North Hemisphere',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Cal_Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(2, phenoChart);
// Create an NDVI calendar yearchart.
var calChart = ui.Chart.image.series(byMonthYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS NDVI Monthly (January to December)- North Hemisphere',
    vAxis: {title: 'Index * 10000'},
    hAxis: {title: 'Calendar_Year', format: 'yyyy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, calChart);
});
Map.style().set('cursor', 'crosshair');
////****
// Create the panel for the legend items.
var color = ['040404','c00e05','ff4c4c','ffc3a6',
'fffdcf','c7ff9c','4cf507','2f9904']
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = ['NoData - Water','Strong Negative trend', 'Medium Negative trend',
'Light Negative trend', 'No significative Trend', 
'Light Possitive trend', 'Medium Possitive trend',
'Strong Possitive trend']
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(color[i], names[i]));
  }
Map.add(legend);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
    // Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: zona,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#0409b1'}, 'UpperSakaryaLimits');
var outlinekutahya_merkez = empty.paint({
  featureCollection: kutahya_merkez,
  color: 1,
  width: 1
});
Map.addLayer(outlinekutahya_merkez, {palette: '#0409b1'}, 'kutahya_merkez');
var outlinePorsuk_Cayi = empty.paint({
  featureCollection: Porsuk_Cayi,
  color: 1,
  width: 1
});
Map.addLayer(outlinePorsuk_Cayi, {palette: '#0409b1'}, 'Porsuk_Cayi');
var outlineNasreddin_Hoca = empty.paint({
  featureCollection: Nasreddin_Hoca,
  color: 1,
  width: 1
});
Map.addLayer(outlineNasreddin_Hoca, {palette: '#0409b1'}, 'Nasreddin_Hoca');
var outlineAnkara_beypazari = empty.paint({
  featureCollection: Ankara_beypazari,
  color: 1,
  width: 1
});
Map.addLayer(outlineAnkara_beypazari, {palette: '#0409b1'}, 'Ankara_beypazari');
Map.setCenter(zonaLat,zonaLong,8)
//Export to drive
/*
Export.image.toDrive({
  image: SWATIslope_ESPI_2001_2018,
  description: 'SWATIslope_ESPI_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATIslope_NDVI_2001_2018,
  description: 'SWATIslope_AM_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_ESPI_2001_2018,
  description: 'SWATI_ESPI_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_NDVI_2001_2018,
  description: 'SWATI_AM_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: ESPI_MKSen_2001_2018,
  description: 'LTT_ESPI-NDVI_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: NDVI_MKSen_2001_2018,
  description: 'LTT_AM-NDVI_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: consensus,
  description: 'ConsensusModel_2001_2018_UpperSakarya_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
*/