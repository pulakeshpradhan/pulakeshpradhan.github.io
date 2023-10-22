// Import region
var region = table.geometry()
var geometry = region.buffer(30);
// Collect data and filter by total dates
var modNDVI1 = ee.ImageCollection('MODIS/006/MOD13Q1').select('NDVI');
//clip images by study area
var modNDVI = modNDVI1 .map(function(image) { return image.clip(region); });
//change unit of NDVI to range 0-1
var toNDVI = function(image){
var time = image.get('system:time_start')
var nNDVI = image.multiply(0.0001) // scale factor
.rename("nNDVI")
.set('system:time_start',time)
return nNDVI;
};
var nNDVI = modNDVI.map(toNDVI)
// Select dates for collections
var collection10 = ee.ImageCollection( nNDVI.filterDate('2001-01-01', '2020-01-31'));
var collection01 = ee.ImageCollection( nNDVI.filterDate('2019-01-01', '2019-12-31'));
var collection001 = ee.ImageCollection(nNDVI.filterDate('2015-07-01', '2015-07-30'));
var collection002 = ee.ImageCollection(nNDVI.filterDate('2015-01-01', '2015-01-31'));
//Clip to Specified Region
var clipped10 = collection10.mean().clip(region);
var clipped01 = collection01.mean().clip(region);
//unit transformation
// convert LST to celciusvar 
//toCelsius = function(image){var time = image.get('system:time_start')var celsius = image.multiply(0.02), 
//scale factor.subtract(273.15), 
//from kelvin to C.rename("Celcius").set('system:time_start',time)return celsius;};
// Charts //
//Long‐Term Time Series
var TS5 = Chart.image.seriesByRegion(collection10, region, ee.Reducer.mean(),'nNDVI',
500, 'system:time_start').setOptions({
title: 'NDVI Long‐Term Time Series',
vAxis: {title: 'NDVI'},
});
print(TS5);
//Short‐Term Time Series
var TS1 = Chart.image.seriesByRegion(collection01, region, ee.Reducer.mean(),'nNDVI',
500, 'system:time_start').setOptions({
title: 'NDVI Short‐Term Time Series',
vAxis: {title: 'NDVI'},
});
print(TS1);
//Set Center of Map and Add Clipped Image Layer
Map.centerObject(geometry, 10);
Map.addLayer (geometry, {min: 0.0, max: 9000, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00', '009900','006600','000000']}, 'Area of interest');
Map.addLayer(collection001,{min: 0.0, max: 9000, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00','009900','006600','000000']},'NDVIglobal_summer', false);
Map.addLayer(collection002,{min: 0.0, max: 9000, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00','009900','006600','000000']},'NDVIglobal_winter', false);