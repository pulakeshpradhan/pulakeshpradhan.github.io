var volnm='Fuego_volcano_subset_'; // Fuego
var blat=14.474567; // Fuego
var blon=-90.880813; // Fuego
// var b=ee.Geometry.Rectangle([-91.00, 14.53, -90.79, 14.20]); // Fuego
var b=ee.Geometry.Rectangle([-92.50, 13.5, -89, 16]); // Fuego
// var b=ee.Geometry.Rectangle([-94, 12, -86, 18]); // Fuego
// var b=ee.Geometry.Rectangle([-100, 40, -80, 50]); // Michigan UP
// var b=ee.Geometry.Rectangle([-95, 12, -70, 24]); // Hurricane sector
// var d1='2018-06-03T18:00:00';
// // var d2='2018-06-04T00:00:00';
// // var d2='2018-06-03T23:00:00';
// var d2='2018-06-03T20:00:00';
// var d1='2018-06-03T14:00:00';
// var d2='2018-06-04T00:00:00';
// var d1='2018-11-19T00:00:00';
// var d2='2018-11-19T18:00:00';
// // var d2='2018-11-19T02:00:00';
// var d1='2018-02-01T00:00:00';
// var d2='2018-02-01T18:00:00';
// var d1='2019-10-15T16:00:00';
// var d2='2019-10-16T10:00:00';
// var d1='2019-10-07T04:00:00';
// var d2='2019-10-07T22:00:00';
// var d1='2018-05-15T18:00:00';
// var d2='2018-05-16T06:00:00';
// var d1='2019-08-02T21:00:00';
// var d2='2019-08-03T06:00:00';
// var d1='2019-10-15T16:00:00';
// var d2='2019-10-16T09:00:00';
// var d1='2019-10-16T07:00:00';
// var d2='2019-10-16T20:00:00';
// var d1='2018-09-24T19:00:00';
// var d2='2018-09-25T07:00:00';
// var d1='2018-10-16T18:00:00';
// var d2='2018-10-17T10:00:00';
// var d1='2018-11-02T23:00:00';
// var d2='2018-11-03T12:00:00';
// var d1='2019-08-16T19:00:00';
// var d2='2019-08-17T04:00:00';
// var d1='2019-09-13T19:00:00';
// var d2='2019-09-14T06:00:00';
// var d1='2019-10-07T17:00:00';
// var d2='2019-10-08T05:00:00';
// var d1='2020-07-20T13:00:00';
// var d2='2020-07-20T20:12:00';
// var d1='2020-01-05T06:00:00';
// var d2='2020-01-05T12:00:00';
// var d1='2020-01-05T11:00:00';
// var d2='2020-01-05T12:00:00';
// var d1='2018-01-31T00:00:00';
// var d2='2018-02-03T00:00:00';
// var d1='2018-01-31T00:00:00';
// var d2='2018-02-01T00:00:00';
// var d1='2018-02-01T00:00:00';
// var d2='2018-02-02T00:00:00';
// var d1='2018-02-02T00:00:00';
// var d2='2018-02-03T00:00:00';
// var d1='2018-06-02T00:00:00';
// var d2='2018-06-03T00:00:00';
// var d1='2018-06-03T00:00:00';
// var d2='2018-06-04T00:00:00';
// var d1='2018-06-04T00:00:00';
// var d2='2018-06-05T00:00:00';
// var d1='2018-11-16T00:00:00';
// var d2='2018-11-17T00:00:00';
// var d1='2018-11-17T00:00:00';
// var d2='2018-11-18T00:00:00';
// var d1='2018-11-18T00:00:00';
// var d2='2018-11-19T00:00:00';
// var d1='2018-11-19T00:00:00';
// var d2='2018-11-20T00:00:00';
// var d1='2018-11-20T00:00:00';
// var d2='2018-11-21T00:00:00';
// var d1='2018-11-21T00:00:00';
// var d2='2018-11-22T00:00:00';
// var d1='2018-11-19T00:00:00';
// var d2='2018-11-20T00:00:00';
// var d1='2018-06-16T22:00:00';
// var d2='2018-06-17T18:00:00';
// var d1='2018-06-05T18:00:00';
// var d2='2018-06-06T06:00:00';
// // var d2='2018-06-05T10:00:00';
// var d1='2018-06-05T20:00:00';
// var d2='2018-06-05T23:00:00';
// var d1='2018-05-29T21:00:00';
// var d2='2018-05-30T01:00:00';
// var d1='2018-06-03T16:00:00';
// var d2='2018-06-03T20:00:00';
// var d1='1982-09-18T00:00:00';
// var d2='1982-09-22T00:00:00';
// var d1='1987-09-28T00:00:00';
// var d2='1987-10-03T00:00:00';
// var d1='1995-08-08T00:00:00';
// var d2='1995-08-11T00:00:00';
// var d1='1998-08-26T00:00:00';
// var d2='1998-08-27T12:00:00';
// var d1='1998-10-28T00:00:00';
// var d2='1998-11-02T12:00:00';
// var d1='1998-05-20T12:00:00';
// var d2='1998-05-21T18:00:00';
// var d1='1999-05-21T00:00:00';
// var d2='1999-05-22T18:00:00';
// var d1='2000-01-16T15:00:00';
// var d2='2000-01-17T12:00:00';
// var d1='2005-10-01T00:00:00';
// var d2='2005-10-06T00:00:00';
// var d1='2010-05-27T00:00:00';
// var d2='2010-05-30T00:00:00';
var d1='2015-08-05T18:00:00';
var d2='2015-08-07T00:00:00';
// var ah=6 // Number of hours prior to today that we want to include in seach
// var d1 = new Date();
// // print(d1.toISOString())
// d1.setHours(d1.getHours() - ah);
// var d1=d1.toISOString()
// print(d1)
// var d2='2100-12-31';
// if (ah>=48){
//   throw "too many hours! Take it easy and choose a smaller time interval..."
// }
var a=ee.ImageCollection("NOAA/CDR/GRIDSAT-B1/V2").filterBounds(ee.Geometry.Point(blon,blat)).filterDate(d1,d2);
// var a=ee.ImageCollection("NOAA/GOES/17/MCMIPF").filterBounds(ee.Geometry.Point(blon,blat)).filterDate(d1,d2);
var a0=a.toList(2000);
print(a0)
var bds='irwin_cdr';
// var bds='satid_ir1';
// var bds='irwin_2';
// var bds='irwin_3';
// var bds='irwvp';
// var bds='vschn';
// var a2=a0.get(0)
// var a4=ee.Image(a2).select('CMI_C'+bds);
// var a5=a4.id()
// // print(a5)
// var d1a=a5.getInfo();
// var a6=a4.getNumber('CMI_C'+bds+'_offset')
// var a7=a4.getNumber('CMI_C'+bds+'_scale')
// var a8=a4.multiply(a7).add(a6).subtract(273.15)
// var GOES_m=a8;
var n1=a0.length()
var i1
// for (i1=1; i1<n1.getInfo(); i1++){
for (i1=0; i1<n1.getInfo(); i1++){
  var a2=a0.get(i1)
  // print(a2)
  var a4=ee.Image(a2).select(bds);
  var a5=a4.id()
  // var a6=a4.getNumber('CMI_C'+bds+'_offset')
  // var a7=a4.getNumber('CMI_C'+bds+'_scale')
  // // var a5=a4.getString('LANDSAT_PRODUCT_ID'); print(a5) // Landsat
  // var a8=a4.multiply(a7).add(a6).subtract(273.15)
  // // var a8=a4.multiply(a7).add(a6)
  var a6=a4.multiply(0.01).add(200).subtract(273.15)
  // var a6=a4.multiply(0.00004).add(1)
  print(a5)
  Map.addLayer(a6,
      // {'min': 2500, 'max': 7000},a5.getInfo(),0); // band 7
      // {'min': 2500, 'max': 10000},a5.getInfo(),0); // band 7 
      // {'min': 1750, 'max': 3250},a5.getInfo(),0); // band 14
      // {'min': -0, 'max': 0.01},a5.getInfo(),0); // band 6
      // {'min': -20, 'max': 25},a5.getInfo(),0); // band 14
      // {'min': -70, 'max': 25,
      {'min': -80, 'max': 10,
      // {'min': 0, 'max': 6,
      // {'min': 0, 'max': 0.75,
      // {'min': -20, 'max': 25,
      // {'min': 0, 'max': 40,
      // {'min': 0, 'max': 0.01,
        // palette: ['black','white']
        // palette: ['0000FF','00FF00','FFFF00']
        // palette: ['blue','green','yellow','brown']
        palette: ['blue','yellow','brown']
      },a5.getInfo()+'_GOES_NOAA_GRIDSAT_B1_',0,0.75); // band 14
      // {'min': 0, 'max': 1500},a5.getInfo(),0); // band 4 
  Map.setCenter(blon, blat, 7);
  // var GOES_1=a8;
  // var GOES_m2=GOES_m.addBands(GOES_1)
  // GOES_m=GOES_m2
}
// Map.addLayer(deptos)
var a9=ee.Image().byte();
var a10=a9.paint({
  featureCollection: deptos,
  color: 1,
  width: 1
});
// Map.addLayer(a10, {palette: '0000AA'}, 'Departamentos',1,0.5);
Map.addLayer(a10, {palette: '000000'}, 'Departamentos',1,0.5);
// var d2a=a5.getInfo();
// // print(GOES_m)
// var GOES_z=GOES_m.reproject('EPSG:4326',null,2000);
// print(GOES_z)
// var nm='GOES_16_band_'+bds+'_'+d1a+'_'+d2a
// Export.image.toDrive({image: GOES_z, description: nm, 
//   folder: 'output_earthengine', fileNamePrefix: nm, scale: 2000, region: b
// });
// Export.table.toDrive({
//   collection: a,
//   description:'metadata_'+nm,
//   folder: 'output_earthengine', 
//   fileNamePrefix: 'metadata_'+nm,
//   fileFormat: 'CSV'
// });