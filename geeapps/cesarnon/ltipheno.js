var color7 = {"opacity":1,"bands":["constant"],"max":7,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]},
    LSIBs = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    TrajectCalNDVI_MK_Sen_7clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"),
    TrajectCalESPI_MK_Sen_7clas_2000_2018_v1 = ee.Image("users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"),
    SWATI_Cal7Clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"),
    SWATI_Cal_ESPI7Clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"),
    SWATIslope_Cal_perc_7clas_nosig_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"),
    LSIB = ee.FeatureCollection("USDOS/LSIB/2013"),
    SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018");
//Map.addLayer(LSIB,{},'LSIB')
var zona = LSIB.filterMetadata('name', 'equals', 'ETHIOPIA')
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
Map.addLayer(ESPI_MKSen_2001_2018,color7,'ESPI_MKSen_2001_2018')    
Map.addLayer(NDVI_MKSen_2001_2018,color7,'NDVI_MKSen_2001_2018')    
//
var yrStart = 2000;
var yrEnd = 2018; /// ---Important: SWATI and SWATIsope only work in 2000-2018 calculation
//make a list for calendar year computation / year 2000 is not complete so I added a +1
var years = ee.List.sequence(yrStart+1, yrEnd);
//print(years, 'years for calendar analysis')
//Load NDVI collection
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2000-07-01', '2018-12-31');
//print(modis, 'collection to process');
//Load water cover from same sensor
//make a mask for more permanent water bodies
var modiswater = ee.ImageCollection('MODIS/006/MOD44W').select('water_mask')
var waterMask = modiswater.sum().gte(12)// limit set on 12 years
var waterSum = modiswater.sum().reproject('EPSG:4326', null, 250)
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
        var modisYearMean = modisYear.select('NDVI','EVI').mean()
        // Make a funtion to replace bad pixels with the mean
        var maskQAYear = function(image) {
          var image2 = image.select('NDVI','EVI');
          var image2 = image2.where(image.select("SummaryQA").gte(2),modisYearMean);
        return image2.rename('NDVI','EVI');
        }
        var ModisYearCorrected = modisYear.map(maskQAYear)
        var ModisYearCorrmean = ModisYearCorrected.mean()//.reproject('EPSG:4326', null, 250)
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
//Get the NDVI Annual mean for every Callogical/hydrological year.
//Also replace bad quality pixels with the average of the half a year that is analyzed 
//results are saved into a collection and a stack of bands
// This is a client side computation - Server side is momentarily out of my league (does not work)
//create empty image and empty collection
var Stacker = ee.Image()//.clip(zona)//.reproject('EPSG:4326', null, 250)
var stackcoll = ee.ImageCollection.fromImages([Stacker])
// Do this FOR all years
// consider yrEnd-1 because it takes the first half of that year but adds it to the previous 2nd half
for (var yr= yrStart; yr <= yrEnd-1; yr = yr + 1) {
//Make a subset for the first half of the phenology 
  var fHalf = modis.filter(ee.Filter.calendarRange(yr, yr, 'year'))
                    .filter(ee.Filter.calendarRange(7, 12, 'month'))
// Get the mean of the first half
  var fHalfMean = fHalf.select('NDVI','EVI').mean()
//Make a funtion to replace bad_quality pixels for the mean in the fhalf colection
  var maskQA_Fyear = function(image) {
      var image2 = image.select('NDVI','EVI');
      var image2 = image2.where(image.select("SummaryQA").gte(2),fHalfMean);
      return image2.rename('NDVI','EVI');
      }
//Use the function and get the corrected the First Half
  var fHalfCorr = fHalf.map(maskQA_Fyear)//.mean()//.reproject('EPSG:4326', null, 250)
//The same structure but for the Second Half of the phenological year
  var sHalf = modis.filter(ee.Filter.calendarRange(yr+1, yr+1, 'year'))
                    .filter(ee.Filter.calendarRange(1, 6, 'month'))
// Get the mean of the second half
  var sHalfMean = sHalf.select('NDVI','EVI').mean()
//Use and apply the fuction to correct the second half and get the mean
  var maskQA_Syear = function(image) {
      var image2 = image.select('NDVI','EVI');
      var image2 = image2.where(image.select("SummaryQA").gte(2),sHalfMean);
      return image2.rename('NDVI','EVI');
      }
  var sHalfCorr = sHalf.map(maskQA_Syear) 
  var fyear = fHalfCorr.merge(sHalfCorr)
  //make the result for the image stack
  var fyearForStack = fyear.mean().select('NDVI')
                 .rename(nn.cat(ee.String(ee.Number(yr).toInt())))
                 .set('year', yr)
  //Make the result for the collection
  var fyearForColl = fyear.mean()
                 .set('year', yr)
                 .set('system:time_start',ee.Date.fromYMD(yr,07,01))
 ///Calculate ESPI for Calyear
        var fyearMeanNDVI = fyear.mean().select('NDVI')
        var fyearstdDeNDVI = fyear.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVIs')
        var fyearcvNDVI = fyearstdDeNDVI.divide(fyearMeanNDVI).rename('NDVIcv')
        var unof = ee.Image(1)
        var ipsef = fyearMeanNDVI.multiply(unof.subtract(fyearcvNDVI)).rename('ESPI')
// Make the Return for this loop
// make the band stack for NDVI
var Stacker = Stacker.addBands(fyearForStack)
// Make the collection for NDVI, EVI and ESPI
var stackcoll = stackcoll.merge(fyearForColl.addBands(ipsef))
}
//Correct the results from the loop
//make final collection removing first blanck image
var byYearCal = stackcoll.filterMetadata('year', 'greater_than', 1999)
//print (byYearCal,'collection of phenological years mean')
//remove first band (constant) by selecting all others
var band_names = Stacker.bandNames().remove('constant')
var Stacker = Stacker.select(band_names)
//print (Stacker,'Stack_IMAGE_PHENO')
//Option 2 the server side approach to CalYear  - Tried many thing none works :-(
/*
var byYearGR = ee.ImageCollection.fromImages(
      years.map(function (y) {
        var primera = modis.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(7, 12, 'month'))
                    .select('NDVI').mean()
        //print (y,'y')
        var yyy = y
        print (yyy,'yyy')
        var segunda = modis.filter(ee.Filter.calendarRange(yyy, yyy, 'year'))
                    .filter(ee.Filter.calendarRange(1, 6, 'month'))
                    .select('NDVI').mean()
        var devolver = primera.add(segunda)//.divide(2)
        return devolver.set('year', y).rename(nn.cat(ee.String(ee.Number(y).toInt())));
}));
*/
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
  var phenoChart = ui.Chart.image.series(byYearCal, point, ee.Reducer.mean(), 250);
  phenoChart.setOptions({
    title: 'MODIS NDVI phenological year (July to June) - South Hemisphere',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Cal_Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(2, phenoChart);
// Create an NDVI calendar yearchart.
var calChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS NDVI calendar year (January to December)- North Hemisphere',
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
Map.setCenter(zonaLat,zonaLong,6)
//Export to drive
/*
Export.image.toDrive({
  image: SWATIslope_ESPI_2001_2018,
  description: 'SWATIslope_ESPI_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATIslope_NDVI_2001_2018,
  description: 'SWATIslope_NDVI_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_ESPI_2001_2018,
  description: 'SWATI_ESPI_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_NDVI_2001_2018,
  description: 'SWATI_NDVI_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: ESPI_MKSen_2001_2018,
  description: 'ESPI_MKSen_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: NDVI_MKSen_2001_2018,
  description: 'NDVI_MKSen_2001_2018_ETHIOPIA_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LTI_country_exports',
  maxPixels: 1e13
});
*/