var volnm='Alta_Verapaz_'; //
// var blat=15.659712; // 
// var blon=-91.429403; // 
// var blat=15.613462; // 
// var blon=-91.312248; // 
var blat=15.5595; // 
var blon=-90.1945; // 
var b=ee.Geometry.Rectangle([blon-0.5, blat+0.5, blon+0.5, blat-0.5]); // Fuego
var d1='2020-11-24';
var d2='2020-11-26';
var imcoll_2='COPERNICUS/S2';
var a_2=ee.ImageCollection(imcoll_2).filterBounds(ee.Geometry.Rectangle([blon-1.5,blat-1.5,blon+1.5,blat+1.5])).filterDate(d1,d2).mosaic();
Map.addLayer(a_2,
	{'min': [0,0,0], 'max': [4000,4000,2500],
//	{'min': [200,200,200], 'max': [1500,1500,1500],
	bands: ['B2', 'B8', 'B4']
//	bands: ['B4', 'B3', 'B2']
	},'Sentinel 2 del 25 de Nov',1); // Sentinel 2 
// var b=ee.Geometry.Rectangle([-91.10, 14.6, -90.6, 14.10]); // Fuego
// var b=ee.Geometry.Rectangle([-92.50, 15.5, -89.0, 13.5]); // Fuego
var b=ee.Geometry.Rectangle([-92.50, 17, -88.0, 13.5]); // Fuego
var a=ee.Image('USGS/SRTMGL1_003').select('elevation').clip(b);
// var a=ee.Image('JAXA/ALOS/AW3D30/V2_2').select('AVE_DSM').clip(b);
// // var n1=4
// var n1=7
// print(a)
// var a=a.reduceNeighborhood(ee.Reducer.mean(),ee.Kernel.circle(n1))
var a2=ee.Terrain.fillMinima(a,null,1000)
// var a2=ee.Terrain.fillMinima(a);
var a4=a2.subtract(a).reproject('EPSG:4326',null,30);
// // Map.addLayer(precip.focal_mean(7,'circle','pixels'),{
// Map.addLayer(a,{
//   min: 0,
//   // max: 0.005,
//   max: 3500,
//   palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']},
//   // 'forecast precipitation hour '+precip.getNumber('forecast_hours').getInfo(),0)
//   // 'DEM',0,0.5)
//   'DEM',1,0.5)
// Map.setCenter(-90.88, 14.48, 8);
var th1=5;
// Map.addLayer(a4.mask(a4.gt(th1)),{
Map.addLayer(a4.mask(a4.gt(th1)),{
  min: th1,
  // max: 0.005,
  max: 25,
  // palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']},
  // palette: ['red']},
  // palette: ['yellow','orange', 'red']},
  palette: ['orange', 'red']},
  'DEM_fill',1,0.5)
Map.setCenter(blon, blat, 12);
Map.setOptions('TERRAIN')