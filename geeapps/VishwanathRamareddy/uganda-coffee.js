/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul1 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1"),
    table = ee.FeatureCollection("users/VishwanathRamareddy/Uganda_regions"),
    gps = ee.FeatureCollection("users/VishwanathRamareddy/Uganada_GPS"),
    lulc = ee.Image("users/VishwanathRamareddy/Uganda_classification");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var country = gaul1.filter(ee.Filter.eq('ADM0_NAME', 'Uganda'))
var startRange = 2010 // [2]
var endRange = 2021 // [3]
var startSeasonMonth = 1 // [4]
var startSeasonMonthMinT = 1
var startSeasonMonthMaxT = 1
var endSeasonMonth = 12 // [6]
var endSeasonMonthMinT = 2
var endSeasonMonthMaxT = 2
var startSeasonDay = 1 // [5]
var endSeasonDay = 31 // [7]
var endSeasonDayMinT = 28
var endSeasonDayMaxT = 28
var precipMin = 900 // [8]
var precipMax = 1700 // [9]
var temprMin = 15 // [10]
var temprMax = 38 // [11]
var slopeMax = 45
var elevMin = 800
var elevMax = 1500
// Access precipitation and temperature ImageCollections and a global countries FeatureCollection
var region = country
var precip = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').select('precipitation')
// var precip = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational').select('hourlyPrecipRateGC')
var temp = ee.ImageCollection('MODIS/006/MOD11A2').select(['LST_Day_1km','LST_Night_1km'])
var ndvi = ee.ImageCollection('MODIS/006/MOD13Q1').select(['NDVI'])
var srtm = ee.Image('USGS/SRTMGL1_003')
// Create layers for masking to agriculture and masking out water bodies
var coffeeMask = lulc.neq(1)
var waterMask = lulc.neq(6)
var cultivated = lulc.neq(2)
var grass = lulc.neq(3)
var forestMask = lulc.neq(4)
var flood_vegMask = lulc.neq(5)
var builtupMask = lulc.neq(7)
var agMask = lulc.updateMask(waterMask).updateMask(flood_vegMask).updateMask(builtupMask).updateMask(forestMask).updateMask(coffeeMask)
var Coffee = lulc.updateMask(waterMask).updateMask(flood_vegMask).updateMask(builtupMask).updateMask(forestMask).updateMask(grass).updateMask(cultivated)
// Modify user input options for processing with raw data
var years = ee.List.sequence(startRange,endRange)
var bounds = region.geometry().bounds()
var tMinMod = (tempMin+273.15)/0.02
var tMaxMod = (tempMax+273.15)/0.02
// This expression is used to account for growing seasons that overlap the from one year to the next (e.g., Nov-Apr)
var yearMod = ee.Algorithms.If(endSeasonMonth-startSeasonMonth<0,1,0)
var yearModMinT = ee.Algorithms.If(endSeasonMonthMinT-startSeasonMonthMinT<0,1,0)
var yearModMaxT = ee.Algorithms.If(endSeasonMonthMaxT-startSeasonMonthMaxT<0,1,0)
// Calculate seasonal rainfall (sum) and average temperature/NDVI
var bySeason = ee.ImageCollection(years.map(function (y) {
  var startSeason = ee.Date.fromYMD(y, startSeasonMonth,startSeasonDay)
  var startSeasonMinT = ee.Date.fromYMD(y, startSeasonMonthMinT,startSeasonDay)
  var startSeasonMaxT = ee.Date.fromYMD(y, startSeasonMonthMaxT,startSeasonDay)
  var endSeason = ee.Date.fromYMD(ee.Number(y).add(yearMod),endSeasonMonth,endSeasonDay)
  var endSeasonMinT = ee.Date.fromYMD(ee.Number(y).add(yearModMinT),endSeasonMonthMinT,endSeasonDayMinT)
  var endSeasonMaxT = ee.Date.fromYMD(ee.Number(y).add(yearModMaxT),endSeasonMonthMaxT,endSeasonDayMaxT)
  var p = precip.filterDate(startSeason,endSeason).sum().rename('p')
  var tDay = temp.select('LST_Day_1km').filterDate(startSeasonMaxT,endSeasonMaxT).max().rename('tDay')
  var tNight = temp.select('LST_Night_1km').filterDate(startSeasonMinT,endSeasonMinT).min().rename('tNight')
  var tMean = tDay.add(tNight).divide(2).rename('t')
  // NDVI is used for data presentation/export only and is not used in the suitability determination
  var nMean = ndvi.mean().rename('n')
  return p.addBands(tDay).addBands(tNight).addBands(tMean).addBands(nMean).set('start_date',startSeason).set('end_date',endSeason)
}))
// Average the seasonal data across the temporal range selected
var bySeasonMean = bySeason.mean()
var precipitation = bySeasonMean.select('p').rename('precip_mean').clip(region)
var tempMin = bySeasonMean.select('tNight').multiply(0.02).subtract(273.15).rename('temp_min').clip(region);
var tempMax = bySeasonMean.select('tDay').multiply(0.02).subtract(273.15).rename('temp_max').clip(region);
var tempMean = bySeasonMean.select('t').multiply(0.02).subtract(273.15).rename('temp_mean').clip(region);
var ndviMean = bySeasonMean.select('n').rename('ndvi_mean').clip(region)
var elevation = srtm.select('elevation').clip(region)
var slope = ee.Terrain.slope(elevation).clip(region);
// var precipitationVis = {min:0.0,max:1500.0, palette:['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],};
// var temperatureVis = {min:0.0,max:30.0, palette:['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],};
// var ndviVis = {min:0,max:8000, palette:['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],};
// Map.addLayer(precipitation, precipitationVis, 'Precipitation');
// Map.addLayer(tempMin, temperatureVis, 'tempMin');
// Map.addLayer(tempMax, temperatureVis, 'tempMax');
// Map.addLayer(tempMean, temperatureVis, 'tempMean');
// Map.addLayer(ndviMean, ndviVis, 'ndviMean');
// Map.addLayer(elevation, {min:0, max: 2000, palette: ['90EE90','FFFF00','FF0000']}, 'Raw SRTM');
// Map.addLayer(slope, {min:0, max:45, pallete: ['90EE90','FFFF00','FF0000']},'Slope');
// Mask out the out of range precipitation areas.
var minP = precipitation.gt(precipMin);
var maxP = precipitation.lt(precipMax);
var precipfilter = precipitation.updateMask(minP).updateMask(maxP);
// Map.addLayer(precipfilter, precipitationVis, 'Precipitation_filter');
// Mask out the out of range Temperature areas.
var minT = tempMin.gt(temprMin);
var maxT = tempMax.lt(temprMax);
var mintempfilter = tempMin.updateMask(minT);
var maxtempfilter = tempMax.updateMask(maxT);
// Map.addLayer(mintempfilter, temperatureVis, 'minTemperature_filter');
// Map.addLayer(maxtempfilter, temperatureVis, 'maxTemperature_filter');
// Mask out the out of range slope areas.
var elemin = elevation.gt(elevMin);
var elemax = elevation.lt(elevMax);
var elefilter = elevation.updateMask(elemin).updateMask(elemax);
// Map.addLayer(elefilter, {min:0, max: 2000, palette: ['90EE90','FFFF00','FF0000']}, 'elevation_filter');
// Mask out the out of range slope areas.
var slopemask = slope.lt(slopeMax);
var slopefilter = slope.updateMask(slopemask);
// Map.addLayer(slopefilter, {min:0, max:45, pallete: ['90EE90','FFFF00','FF0000']},'Slope_filter');
var coffeeNiche = agMask.updateMask(elefilter).updateMask(slopefilter).updateMask(mintempfilter).updateMask(maxtempfilter).updateMask(precipfilter)
var viz1 = {min: 1, max: 7, palette: ['#ca0021','#00c202','#00c202','#00c202',"#b6beb7","#b6beb7","#b6beb7"]}
Map.addLayer(coffeeNiche,viz1,'Suitable for Coffee Plantations',true)
var viz = {min: 1, max: 7, palette: ["#d63000","#d6b807","#a8d607","#0fbe08","#b6beb7","#b6beb7","#b6beb7"]}          
Map.addLayer(Coffee,viz, 'Existing Coffee plantations',true)
var empty = ee.Image().byte();
var outline = empty.paint({featureCollection: table,color: 1,width: 3});
Map.addLayer(outline, {palette: '000000'}, 'Uganda');
var samples = gps
Map.addLayer(samples, {color: 'black'}, 'CroptourSamples');
Map.setCenter(32.356, 0.7818, 9);