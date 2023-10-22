var geometry = /* color: #98ff00 */ee.Geometry.Point([-40.903225, -9.246154]);
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 6.0,
  opacity: 0.40,
  palette: [
    'FFFFFF', '000088','008800','777700', '880000'
  ],
};
var date = ee.Date(Date.now());
  print(date)
  var date100 = date.format("YYYY-MM-dd");
  date100 =date100.getInfo();
var date01 = ee.Date(Date.now()).advance(-31,'day');
  print(date01)
  var date1 = date01.format("YYYY-MM-dd");
  date1 =date1.getInfo();
  var date02 = ee.Date(Date.now()).advance(-30,'day');
  print(date02)
  var date2 = date02.format("YYYY-MM-dd");
  date2 =date2.getInfo();
  var date03 = ee.Date(Date.now()).advance(-29,'day');
  print(date03)
  var date3 = date03.format("YYYY-MM-dd");
  date3 =date3.getInfo();
   var date04 = ee.Date(Date.now()).advance(-28,'day');
  print(date04)
  var date4 = date04.format("YYYY-MM-dd");
  date4 =date4.getInfo();
   var date05 = ee.Date(Date.now()).advance(-27,'day');
 // print(date05)
  var date5 = date05.format("YYYY-MM-dd");
  date5 =date5.getInfo();
    var date06 = ee.Date(Date.now()).advance(-26,'day');
 // print(date06)
  var date6 = date06.format("YYYY-MM-dd");
  date6 =date6.getInfo();
   var date07 = ee.Date(Date.now()).advance(-25,'day');
 // print(date07)
  var date7 = date07.format("YYYY-MM-dd");
  date7 =date7.getInfo();
    var date08 = ee.Date(Date.now()).advance(-24,'day');
 // print(date07)
  var date8 = date08.format("YYYY-MM-dd");
  date8 =date8.getInfo();
    var date09 = ee.Date(Date.now()).advance(-23,'day');
 // print(date07)
  var date9 = date09.format("YYYY-MM-dd");
  date9 =date9.getInfo();
    var date010 = ee.Date(Date.now()).advance(-22,'day');
 // print(date07)
  var date10 = date010.format("YYYY-MM-dd");
  date10 =date10.getInfo();
    var date011 = ee.Date(Date.now()).advance(-21,'day');
 // print(date07)
  var date11 = date011.format("YYYY-MM-dd");
  date11 =date11.getInfo();
    var date012 = ee.Date(Date.now()).advance(-20,'day');
 // print(date07)
  var date12 = date012.format("YYYY-MM-dd");
  date12 =date12.getInfo();
    var date013 = ee.Date(Date.now()).advance(-19,'day');
 // print(date07)
  var date13 = date013.format("YYYY-MM-dd");
  date13 =date13.getInfo();
    var date014 = ee.Date(Date.now()).advance(-18,'day');
 // print(date07)
  var date14 = date014.format("YYYY-MM-dd");
  date14 =date14.getInfo();
    var date015 = ee.Date(Date.now()).advance(-17,'day');
 // print(date07)
  var date15 = date015.format("YYYY-MM-dd");
  date15 =date15.getInfo();
   var date016 = ee.Date(Date.now()).advance(-16,'day');
 // print(date07)
  var date16 = date016.format("YYYY-MM-dd");
  date16 =date16.getInfo();
   var date017 = ee.Date(Date.now()).advance(-15,'day');
 // print(date07)
  var date17 = date017.format("YYYY-MM-dd");
  date17 =date17.getInfo();
   var date018 = ee.Date(Date.now()).advance(-14,'day');
 // print(date07)
  var date18 = date018.format("YYYY-MM-dd");
  date18 =date18.getInfo();
   var date019 = ee.Date(Date.now()).advance(-13,'day');
 // print(date07)
  var date19 = date019.format("YYYY-MM-dd");
  date19 =date19.getInfo();
   var date020 = ee.Date(Date.now()).advance(-12,'day');
 // print(date07)
  var date20 = date020.format("YYYY-MM-dd");
  date20 =date20.getInfo();
   var date021 = ee.Date(Date.now()).advance(-11,'day');
 // print(date07)
  var date21 = date021.format("YYYY-MM-dd");
  date21 =date21.getInfo();
   var date022 = ee.Date(Date.now()).advance(-10,'day');
 // print(date07)
  var date22 = date022.format("YYYY-MM-dd");
  date22 =date22.getInfo();
   var date023 = ee.Date(Date.now()).advance(-9,'day');
 // print(date07)
  var date23 = date023.format("YYYY-MM-dd");
  date23 =date23.getInfo();
   var date024 = ee.Date(Date.now()).advance(-8,'day');
 // print(date07)
  var date24 = date024.format("YYYY-MM-dd");
  date24 =date24.getInfo();
   var date025 = ee.Date(Date.now()).advance(-7,'day');
 // print(date07)
  var date25 = date025.format("YYYY-MM-dd");
  date25 =date25.getInfo();
   var date026 = ee.Date(Date.now()).advance(-6,'day');
 // print(date07)
  var date26 = date026.format("YYYY-MM-dd");
  date26 =date26.getInfo();
   var date027 = ee.Date(Date.now()).advance(-5,'day');
 // print(date07)
  var date27 = date027.format("YYYY-MM-dd");
  date27 =date27.getInfo();
   var date028 = ee.Date(Date.now()).advance(-4,'day');
 // print(date07)
  var date28 = date028.format("YYYY-MM-dd");
  date28 =date28.getInfo();
   var date029 = ee.Date(Date.now()).advance(-3,'day');
 // print(date07)
  var date29 = date029.format("YYYY-MM-dd");
  date29 =date29.getInfo();
   var date030 = ee.Date(Date.now()).advance(-2,'day');
 // print(date07)
  var date30 = date030.format("YYYY-MM-dd");
  date30 =date30.getInfo();
   var date031 = ee.Date(Date.now()).advance(-1,'day');
 // print(date07)
  var date31 = date031.format("YYYY-MM-dd");
  date31 =date31.getInfo();
var dataset0d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-32,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-31,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));  
var dataset00d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-32,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-31,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m1 = dataset00d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX11 = UmidityAboveGround3m1.gte(80).divide(UmidityAboveGround3m1.gte(80)).multiply(80);
var UmidadeAboveGroundX12 = UmidityAboveGround3m1.updateMask(UmidityAboveGround3m1.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX14 = UmidadeAboveGroundX12.unmask(UmidadeAboveGroundX11);
var TERRACLIMATE0d = dataset0d.select( 'temperature_2m_above_ground');
var dia0d = (TERRACLIMATE0d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset01d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-31,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-30,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m11d = dataset01d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX111d = UmidityAboveGround3m11d.gte(80).divide(UmidityAboveGround3m11d.gte(80)).multiply(80);
var UmidadeAboveGroundX121d = UmidityAboveGround3m11d.updateMask(UmidityAboveGround3m11d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX141d = UmidadeAboveGroundX121d.unmask(UmidadeAboveGroundX111d);
var dataset1d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-31,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-30,'day').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-50,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE1d = dataset1d.select( 'temperature_2m_above_ground');
var dia1d = (TERRACLIMATE1d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX141d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset02d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-30,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-29,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m12d = dataset02d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX112d = UmidityAboveGround3m12d.gte(80).divide(UmidityAboveGround3m12d.gte(80)).multiply(80);
var UmidadeAboveGroundX122d = UmidityAboveGround3m12d.updateMask(UmidityAboveGround3m12d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX142d = UmidadeAboveGroundX122d.unmask(UmidadeAboveGroundX112d);
var dataset2d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-30,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-29,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-28,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE2d = dataset2d.select( 'temperature_2m_above_ground');
var dia2d = (TERRACLIMATE2d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX142d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset03d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-29,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-28,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m13d = dataset03d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX113d = UmidityAboveGround3m13d.gte(80).divide(UmidityAboveGround3m13d.gte(80)).multiply(80);
var UmidadeAboveGroundX123d = UmidityAboveGround3m13d.updateMask(UmidityAboveGround3m13d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX143d = UmidadeAboveGroundX123d.unmask(UmidadeAboveGroundX113d);
var dataset3d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-29,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-28,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-76,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE3d = dataset3d.select( 'temperature_2m_above_ground');
var dia3d = (TERRACLIMATE3d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX143d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset04d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-28,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-27,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m14d = dataset04d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX114d = UmidityAboveGround3m14d.gte(80).divide(UmidityAboveGround3m14d.gte(80)).multiply(80);
var UmidadeAboveGroundX124d = UmidityAboveGround3m14d.updateMask(UmidityAboveGround3m14d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX144d = UmidadeAboveGroundX124d.unmask(UmidadeAboveGroundX114d);
var dataset4d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-28,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-27,'day').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-7,'day'), ee.Date(Date.now()).advance(0,'hour')));
var UmidityAboveGround4d = dataset4d.select('relative_humidity_2m_above_ground');
var TERRACLIMATE4d = dataset4d.select( 'temperature_2m_above_ground');
var dia4d = (TERRACLIMATE4d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX144d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset05d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-27,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-26,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m15d = dataset05d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX115d = UmidityAboveGround3m15d.gte(80).divide(UmidityAboveGround3m11d.gte(80)).multiply(80);
var UmidadeAboveGroundX125d = UmidityAboveGround3m15d.updateMask(UmidityAboveGround3m15d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX145d = UmidadeAboveGroundX125d.unmask(UmidadeAboveGroundX115d);
var dataset5d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-27,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-26,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-14,'day'), ee.Date(Date.now()).advance(-7,'day')));
var TERRACLIMATE5d = dataset5d.select( 'temperature_2m_above_ground');
var dia5d = (TERRACLIMATE5d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX145d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset06d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-26,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-25,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m16d = dataset06d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX116d = UmidityAboveGround3m16d.gte(80).divide(UmidityAboveGround3m16d.gte(80)).multiply(80);
var UmidadeAboveGroundX126d = UmidityAboveGround3m16d.updateMask(UmidityAboveGround3m16d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX146d = UmidadeAboveGroundX126d.unmask(UmidadeAboveGroundX116d);
var dataset6d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-26,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-25,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-21,'day'), ee.Date(Date.now()).advance(-14,'day')));
var TERRACLIMATE6d = dataset6d.select( 'temperature_2m_above_ground');
var dia6d = (TERRACLIMATE6d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX146d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset07d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-25,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-24,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m17d = dataset07d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX117d = UmidityAboveGround3m17d.gte(80).divide(UmidityAboveGround3m17d.gte(80)).multiply(80);
var UmidadeAboveGroundX127d = UmidityAboveGround3m17d.updateMask(UmidityAboveGround3m17d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX147d = UmidadeAboveGroundX127d.unmask(UmidadeAboveGroundX117d);
var dataset7d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-25,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-24,'day').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-30,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE7d = dataset7d.select( 'temperature_2m_above_ground');
var dia7d = (TERRACLIMATE7d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX147d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset08d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-24,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-23,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m18d = dataset08d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX118d = UmidityAboveGround3m18d.gte(80).divide(UmidityAboveGround3m18d.gte(80)).multiply(80);
var UmidadeAboveGroundX128d = UmidityAboveGround3m18d.updateMask(UmidityAboveGround3m18d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX148d = UmidadeAboveGroundX128d.unmask(UmidadeAboveGroundX118d);
var dataset8d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-24,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-23,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE8d = dataset8d.select( 'temperature_2m_above_ground');
var dia8d = (TERRACLIMATE8d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX148d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset09d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-23,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-22,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m19d = dataset09d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX119d = UmidityAboveGround3m19d.gte(80).divide(UmidityAboveGround3m19d.gte(80)).multiply(80);
var UmidadeAboveGroundX129d = UmidityAboveGround3m19d.updateMask(UmidityAboveGround3m19d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX149d = UmidadeAboveGroundX129d.unmask(UmidadeAboveGroundX119d);
var dataset9d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-23,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-22,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE9d = dataset9d.select( 'temperature_2m_above_ground');
var dia9d = (TERRACLIMATE9d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX149d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset010d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-22,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-21,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m110d = dataset010d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1110d = UmidityAboveGround3m110d.gte(80).divide(UmidityAboveGround3m110d.gte(80)).multiply(80);
var UmidadeAboveGroundX1210d = UmidityAboveGround3m110d.updateMask(UmidityAboveGround3m110d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1410d = UmidadeAboveGroundX1210d.unmask(UmidadeAboveGroundX1110d);
var dataset10d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-22,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-21,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE10d = dataset10d.select( 'temperature_2m_above_ground');
var dia10d = (TERRACLIMATE10d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1410d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset011d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-21,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-20,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m111d = dataset011d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1111d = UmidityAboveGround3m111d.gte(80).divide(UmidityAboveGround3m111d.gte(80)).multiply(80);
var UmidadeAboveGroundX1211d = UmidityAboveGround3m111d.updateMask(UmidityAboveGround3m111d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1411d = UmidadeAboveGroundX1211d.unmask(UmidadeAboveGroundX1111d);
var dataset11d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-21,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-20,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE11d = dataset11d.select( 'temperature_2m_above_ground');
var dia11d = (TERRACLIMATE11d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1411d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset012d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-20,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-19,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m112d = dataset012d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1112d = UmidityAboveGround3m112d.gte(80).divide(UmidityAboveGround3m112d.gte(80)).multiply(80);
var UmidadeAboveGroundX1212d = UmidityAboveGround3m112d.updateMask(UmidityAboveGround3m112d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1412d = UmidadeAboveGroundX1212d.unmask(UmidadeAboveGroundX1112d);
var dataset12d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-20,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-19,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE12d = dataset12d.select( 'temperature_2m_above_ground');
var dia12d = (TERRACLIMATE12d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1412d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset013d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-19,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-18,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m113d = dataset013d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1113d = UmidityAboveGround3m113d.gte(80).divide(UmidityAboveGround3m113d.gte(80)).multiply(80);
var UmidadeAboveGroundX1213d = UmidityAboveGround3m113d.updateMask(UmidityAboveGround3m113d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1413d = UmidadeAboveGroundX1213d.unmask(UmidadeAboveGroundX1113d);
var dataset13d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-19,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-18,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE13d = dataset13d.select( 'temperature_2m_above_ground');
var dia13d = (TERRACLIMATE13d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1413d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset014d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-18,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-17,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m114d = dataset014d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1114d = UmidityAboveGround3m114d.gte(80).divide(UmidityAboveGround3m114d.gte(80)).multiply(80);
var UmidadeAboveGroundX1214d = UmidityAboveGround3m114d.updateMask(UmidityAboveGround3m114d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1414d = UmidadeAboveGroundX1214d.unmask(UmidadeAboveGroundX1114d);
var dataset14d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-18,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-17,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE14d = dataset14d.select( 'temperature_2m_above_ground');
var dia14d = (TERRACLIMATE14d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1414d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset015d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-17,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-16,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m115d = dataset015d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1115d = UmidityAboveGround3m115d.gte(80).divide(UmidityAboveGround3m115d.gte(80)).multiply(80);
var UmidadeAboveGroundX1215d = UmidityAboveGround3m115d.updateMask(UmidityAboveGround3m115d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1415d = UmidadeAboveGroundX1215d.unmask(UmidadeAboveGroundX1115d);
var dataset15d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-17,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-16,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE15d = dataset15d.select( 'temperature_2m_above_ground');
var dia15d = (TERRACLIMATE15d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1415d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset016d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-16,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-15,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m116d = dataset016d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1116d = UmidityAboveGround3m116d.gte(80).divide(UmidityAboveGround3m116d.gte(80)).multiply(80);
var UmidadeAboveGroundX1216d = UmidityAboveGround3m116d.updateMask(UmidityAboveGround3m116d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1416d = UmidadeAboveGroundX1216d.unmask(UmidadeAboveGroundX1116d);
var dataset16d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-16,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-15,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE16d = dataset16d.select( 'temperature_2m_above_ground');
var dia16d = (TERRACLIMATE16d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1416d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset017d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-15,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-14,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m117d = dataset017d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1117d = UmidityAboveGround3m117d.gte(80).divide(UmidityAboveGround3m117d.gte(80)).multiply(80);
var UmidadeAboveGroundX1217d = UmidityAboveGround3m117d.updateMask(UmidityAboveGround3m117d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1417d = UmidadeAboveGroundX1217d.unmask(UmidadeAboveGroundX1117d);
var dataset17d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-15,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-14,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE17d = dataset17d.select( 'temperature_2m_above_ground');
var dia17d = (TERRACLIMATE17d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1417d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset018d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-14,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-13,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m118d = dataset018d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1118d = UmidityAboveGround3m118d.gte(80).divide(UmidityAboveGround3m118d.gte(80)).multiply(80);
var UmidadeAboveGroundX1218d = UmidityAboveGround3m118d.updateMask(UmidityAboveGround3m118d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1418d = UmidadeAboveGroundX1218d.unmask(UmidadeAboveGroundX1118d);
var dataset18d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-14,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-13,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE18d = dataset18d.select( 'temperature_2m_above_ground');
var dia18d = (TERRACLIMATE18d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1418d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset019d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-13,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-12,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m119d = dataset019d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1119d = UmidityAboveGround3m119d.gte(80).divide(UmidityAboveGround3m119d.gte(80)).multiply(80);
var UmidadeAboveGroundX1219d = UmidityAboveGround3m119d.updateMask(UmidityAboveGround3m119d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1419d = UmidadeAboveGroundX1219d.unmask(UmidadeAboveGroundX1119d);
var dataset19d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-13,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-12,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE19d = dataset19d.select( 'temperature_2m_above_ground');
var dia19d = (TERRACLIMATE19d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1419d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset020d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-12,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-11,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m120d = dataset020d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1120d = UmidityAboveGround3m120d.gte(80).divide(UmidityAboveGround3m120d.gte(80)).multiply(80);
var UmidadeAboveGroundX1220d = UmidityAboveGround3m120d.updateMask(UmidityAboveGround3m120d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1420d = UmidadeAboveGroundX1220d.unmask(UmidadeAboveGroundX1120d);
var dataset20d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-12,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-11,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE20d = dataset20d.select( 'temperature_2m_above_ground');
var dia20d = (TERRACLIMATE20d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1420d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset021d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-11,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-10,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m121d = dataset021d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1121d = UmidityAboveGround3m121d.gte(80).divide(UmidityAboveGround3m121d.gte(80)).multiply(80);
var UmidadeAboveGroundX1221d = UmidityAboveGround3m121d.updateMask(UmidityAboveGround3m121d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1421d = UmidadeAboveGroundX1221d.unmask(UmidadeAboveGroundX1121d);
var dataset21d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-10,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-9,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE21d = dataset21d.select( 'temperature_2m_above_ground');
var dia21d = (TERRACLIMATE21d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1421d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset022d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-10,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-9,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m122d = dataset020d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1122d = UmidityAboveGround3m122d.gte(80).divide(UmidityAboveGround3m122d.gte(80)).multiply(80);
var UmidadeAboveGroundX1222d = UmidityAboveGround3m122d.updateMask(UmidityAboveGround3m122d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1422d = UmidadeAboveGroundX1222d.unmask(UmidadeAboveGroundX1122d);
var dataset22d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-10,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-9,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE22d = dataset22d.select( 'temperature_2m_above_ground');
var dia22d = (TERRACLIMATE22d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1422d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset023d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-9,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-8,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m123d = dataset023d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1123d = UmidityAboveGround3m123d.gte(80).divide(UmidityAboveGround3m123d.gte(80)).multiply(80);
var UmidadeAboveGroundX1223d = UmidityAboveGround3m123d.updateMask(UmidityAboveGround3m123d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1423d = UmidadeAboveGroundX1223d.unmask(UmidadeAboveGroundX1123d);
var dataset23d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-9,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-8,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE23d = dataset23d.select( 'temperature_2m_above_ground');
var dia23d = (TERRACLIMATE23d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1423d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset024d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-8,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-7,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m124d = dataset024d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1124d = UmidityAboveGround3m124d.gte(80).divide(UmidityAboveGround3m124d.gte(80)).multiply(80);
var UmidadeAboveGroundX1224d = UmidityAboveGround3m124d.updateMask(UmidityAboveGround3m124d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1424d = UmidadeAboveGroundX1224d.unmask(UmidadeAboveGroundX1124d);
var dataset24d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-8,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-7,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE24d = dataset24d.select( 'temperature_2m_above_ground');
var dia24d = (TERRACLIMATE24d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1424d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset025d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-7,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-6,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m125d = dataset025d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1125d = UmidityAboveGround3m125d.gte(80).divide(UmidityAboveGround3m125d.gte(80)).multiply(80);
var UmidadeAboveGroundX1225d = UmidityAboveGround3m125d.updateMask(UmidityAboveGround3m125d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1425d = UmidadeAboveGroundX1225d.unmask(UmidadeAboveGroundX1125d);
var dataset25d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-7,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-6,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE25d = dataset25d.select( 'temperature_2m_above_ground');
var dia25d = (TERRACLIMATE25d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1425d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset026d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-6,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-5,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m126d = dataset026d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1126d = UmidityAboveGround3m126d.gte(80).divide(UmidityAboveGround3m126d.gte(80)).multiply(80);
var UmidadeAboveGroundX1226d = UmidityAboveGround3m126d.updateMask(UmidityAboveGround3m126d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1426d = UmidadeAboveGroundX1226d.unmask(UmidadeAboveGroundX1126d);
var dataset26d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-6,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-5,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE26d = dataset26d.select( 'temperature_2m_above_ground');
var dia26d = (TERRACLIMATE26d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1426d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset027d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-5,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-4,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m127d = dataset027d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1127d = UmidityAboveGround3m127d.gte(80).divide(UmidityAboveGround3m127d.gte(80)).multiply(80);
var UmidadeAboveGroundX1227d = UmidityAboveGround3m127d.updateMask(UmidityAboveGround3m127d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1427d = UmidadeAboveGroundX1227d.unmask(UmidadeAboveGroundX1127d);
var dataset27d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-5,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-4,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE27d = dataset27d.select( 'temperature_2m_above_ground');
var dia27d = (TERRACLIMATE27d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1427d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset028d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-4,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-3,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m128d = dataset028d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1128d = UmidityAboveGround3m128d.gte(80).divide(UmidityAboveGround3m128d.gte(80)).multiply(80);
var UmidadeAboveGroundX1228d = UmidityAboveGround3m128d.updateMask(UmidityAboveGround3m128d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1428d = UmidadeAboveGroundX1228d.unmask(UmidadeAboveGroundX1128d);
var dataset28d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-4,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-3,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE28d = dataset28d.select( 'temperature_2m_above_ground');
var dia28d = (TERRACLIMATE28d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1428d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset029d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-3,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-2,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m129d = dataset029d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1129d = UmidityAboveGround3m129d.gte(80).divide(UmidityAboveGround3m129d.gte(80)).multiply(80);
var UmidadeAboveGroundX1229d = UmidityAboveGround3m129d.updateMask(UmidityAboveGround3m129d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1429d = UmidadeAboveGroundX1220d.unmask(UmidadeAboveGroundX1129d);
var dataset29d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-3,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-2,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE29d = dataset29d.select( 'temperature_2m_above_ground');
var dia29d = (TERRACLIMATE29d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1429d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset030d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-2,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-1,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m130d = dataset030d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1130d = UmidityAboveGround3m130d.gte(80).divide(UmidityAboveGround3m130d.gte(80)).multiply(80);
var UmidadeAboveGroundX1230d = UmidityAboveGround3m130d.updateMask(UmidityAboveGround3m130d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1430d = UmidadeAboveGroundX1230d.unmask(UmidadeAboveGroundX1130d);
var dataset30d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-2,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-1,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE30d = dataset30d.select( 'temperature_2m_above_ground');
var dia30d = (TERRACLIMATE30d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1430d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset031d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-1,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-0,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m131d = dataset031d.select('relative_humidity_2m_above_ground').mean();
var UmidadeAboveGroundX1131d = UmidityAboveGround3m131d.gte(80).divide(UmidityAboveGround3m131d.gte(80)).multiply(80);
var UmidadeAboveGroundX1231d = UmidityAboveGround3m131d.updateMask(UmidityAboveGround3m131d.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX1431d = UmidadeAboveGroundX1231d.unmask(UmidadeAboveGroundX1131d);
var dataset31d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-1,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE31d = dataset31d.select( 'temperature_2m_above_ground');
var dia31d = (TERRACLIMATE31d.mean().multiply(2.1)).multiply((((((UmidadeAboveGroundX1431d)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
Map.setCenter(-40.903225, -9.246154, 4)
Map.addLayer(dia1d.resample(), visParams, 'Acumulado 1 dia', false);
Map.addLayer(dia2d.resample(), visParams, 'Acumulado 2 dia', false);
Map.addLayer(dia2d.resample(), visParams, 'Acumulado 2 dia', false);
Map.addLayer(dia3d.resample(), visParams, 'Acumulado 3 dia', false);
Map.addLayer(dia3d.resample(), visParams, 'Acumulado 3 dia', false);
Map.addLayer(dia4d.resample(), visParams, 'Acumulado 4 dia', false);
Map.addLayer(dia5d.resample(), visParams, 'Acumulado 5 dia', false);
Map.addLayer(dia6d.resample(), visParams, 'Acumulado 6 dia', false);
Map.addLayer(dia7d.resample(), visParams, 'Acumulado 7 dia', false);
Map.addLayer(dia8d.resample(), visParams, 'Acumulado 8 dia', false);
Map.addLayer(dia9d.resample(), visParams, 'Acumulado 9 dia', false);
Map.addLayer(dia10d.resample(), visParams, 'Acumulado 10 dia', false);
Map.addLayer(dia11d.resample(), visParams, 'Acumulado 11 dia', false);
Map.addLayer(dia12d.resample(), visParams, 'Acumulado 12 dia', false);
Map.addLayer(dia13d.resample(), visParams, 'Acumulado 13 dia', false);
Map.addLayer(dia14d.resample(), visParams, 'Acumulado 14 dia', false);
Map.addLayer(dia15d.resample(), visParams, 'Acumulado 15 dia', false);
Map.addLayer(dia16d.resample(), visParams, 'Acumulado 16 dia', false);
Map.addLayer(dia17d.resample(), visParams, 'Acumulado 17 dia', false);
Map.addLayer(dia18d.resample(), visParams, 'Acumulado 18 diq', false);
Map.addLayer(dia19d.resample(), visParams, 'Acumulado 19 dia', false);
Map.addLayer(dia20d.resample(), visParams, 'Acumulado 20 dia', false);
Map.addLayer(dia21d.resample(), visParams, 'Acumulado 21 dia', false);
Map.addLayer(dia22d.resample(), visParams, 'Acumulado 22 dia', false);
Map.addLayer(dia23d.resample(), visParams, 'Acumulado 23 dia', false);
Map.addLayer(dia24d.resample(), visParams, 'Acumulado 24 dia', false);
Map.addLayer(dia25d.resample(), visParams, 'Acumulado 25 dia', false);
Map.addLayer(dia26d.resample(), visParams, 'Acumulado 26 dia', false);
Map.addLayer(dia27d.resample(), visParams, 'Acumulado 27 dia', false);
Map.addLayer(dia28d.resample(), visParams, 'Acumulado 28 dia', false);
Map.addLayer(dia29d.resample(), visParams, 'Acumulado 29 dia', false);
Map.addLayer(dia30d.resample(), visParams, 'Acumulado 30 dia', false);
Map.addLayer(dia31d.resample(), visParams, 'Acumulado 31 dia');
Map.style().set('cursor', 'crosshair', true);
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
.add(ui.Label('OBSERVATÓRIO AGROCLIMÁTICO POMARTEC '))
    .add(ui.Label('Clique no mapa para ver os valores Evapotranspiração ETo por dia nos últimos 31 dias'));
// Create an inspector panel with a horizontal layout.
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector0.add(ui.Label('Acumulados'));
var inspector00 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector00.add(ui.Label('Acumulados'));
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      }
});
// Add a label to the panel.
inspector1.add(ui.Label(''));
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      }
});
// Add a label to the panel.
inspector2.add(ui.Label(''));
// Add the panel to the default map.
var inspector3 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      }
});
// Add a label to the panel.
inspector3.add(ui.Label(''));
var inspector4 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      }
});
// Add a label to the panel.
inspector4.add(ui.Label(''));
var inspector5 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector5.add(ui.Label(''));
var inspector6 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector6.add(ui.Label(''));
var inspector7 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector7.add(ui.Label(''));
var inspector8 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector8.add(ui.Label(''));
var inspector9 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector9.add(ui.Label(''));
var inspector10 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector10.add(ui.Label(''));
var inspector11 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
      } });
// Add a label to the panel.
inspector11.add(ui.Label(''));
var inspector20 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector5.add(ui.Label('Acumulados'));
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector00.clear();
  inspector0.clear();
  inspector.clear();
  inspector2.clear();
  inspector3.clear();
  inspector4.clear();
  inspector5.clear();
  inspector6.clear();
  inspector7.clear();
  inspector8.clear();
  inspector9.clear();
  inspector10.clear();
  inspector11.clear();
  panel.clear();
  // Create or update the location label (the second widget in the panel)
  var location1 = 'Painel Meteorológico. Consulta realizada em: '+ date100 ;
   var location =   'Evapotranspiração ETo em mm/m²'+ 
                  ' da amostra para cada dia analisada nas Coordenadas : lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
 inspector.widgets().set(1, ui.Label(location));
  inspector0.widgets().set(1, ui.Label(location1));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.903225, -9.246154]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
  var sampledPoint1d = dia1d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue1d = sampledPoint1d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue1d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector1.widgets().set(1, ui.Label({
      value: 'Dia 1, ' + date1 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint2d = dia2d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue2d = sampledPoint2d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue2d.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector1.widgets().set(2, ui.Label({
      value: 'Dia 2, ' + date2 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint3d = dia3d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue3d = sampledPoint3d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue3d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector1.widgets().set(3, ui.Label({
      value: 'Dia 3, ' + date3 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint4d = dia4d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue4d = sampledPoint4d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue4d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector2.widgets().set(1, ui.Label({
      value: 'Dia 4, ' + date4 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint5d = dia5d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue5d = sampledPoint5d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue5d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector2.widgets().set(2, ui.Label({
      value: 'Dia 5, ' + date5 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint6d = dia6d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue6d = sampledPoint6d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue6d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector2.widgets().set(3, ui.Label({
      value: 'Dia 6, ' + date6 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint7d = dia7d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue7d = sampledPoint7d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue7d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector3.widgets().set(1, ui.Label({
      value: 'Dia 7, ' + date7 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint8d = dia8d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue8d = sampledPoint8d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue8d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Dia 8, ' + date8 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint9d = dia9d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue9d = sampledPoint9d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue9d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector3.widgets().set(3, ui.Label({
      value: 'Dia 9, ' + date9 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint10d = dia10d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue10d = sampledPoint10d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue10d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector4.widgets().set(1, ui.Label({
      value: 'Dia 10, ' + date10 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint11d = dia11d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue11d = sampledPoint11d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue11d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector4.widgets().set(2, ui.Label({
      value: 'Dia 11, ' + date11 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint12d = dia12d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue12d = sampledPoint12d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue12d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector4.widgets().set(3, ui.Label({
      value: 'Dia 12, ' + date12 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint13d = dia13d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue13d = sampledPoint13d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue13d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector5.widgets().set(1, ui.Label({
      value: 'Dia 13, ' + date13 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint14d = dia14d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue14d = sampledPoint14d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue14d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector5.widgets().set(1, ui.Label({
      value: 'Dia 14, ' + date14 +' ETo: '  + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint15d = dia15d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue15d = sampledPoint15d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue15d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector5.widgets().set(2, ui.Label({
      value: 'Dia 15, ' + date15 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint16d = dia16d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue16d = sampledPoint16d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue16d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector6.widgets().set(1, ui.Label({
      value: 'Dia 16, ' + date16 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint17d = dia17d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue17d = sampledPoint17d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue17d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector6.widgets().set(2, ui.Label({
      value: 'Dia 17, ' + date17 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint18d = dia18d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue18d = sampledPoint18d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue18d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector6.widgets().set(3, ui.Label({
      value: 'Dia 18, ' + date18 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint19d = dia19d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue19d = sampledPoint19d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue19d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector7.widgets().set(1, ui.Label({
      value: 'Dia 19, ' + date19 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint20d = dia20d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue20d = sampledPoint20d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue20d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector7.widgets().set(2, ui.Label({
      value: 'Dia 20, ' + date20 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint21d = dia15d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue21d = sampledPoint21d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue21d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector7.widgets().set(3, ui.Label({
      value: 'Dia 21, ' + date21 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint22d = dia22d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue22d = sampledPoint22d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue22d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector8.widgets().set(1, ui.Label({
      value: 'Dia 22, ' + date22 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint23d = dia23d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue23d = sampledPoint23d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue23d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector8.widgets().set(2, ui.Label({
      value: 'Dia 23, ' + date23 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint24d = dia24d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue24d = sampledPoint24d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue24d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector8.widgets().set(3, ui.Label({
      value: 'Dia 24, ' + date24 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint25d = dia25d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue25d = sampledPoint25d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue25d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector9.widgets().set(1, ui.Label({
      value: 'Dia 25, ' + date25 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint26d = dia26d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue26d = sampledPoint26d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue26d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector9.widgets().set(2, ui.Label({
      value: 'Dia 26, ' + date26 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint27d = dia27d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue27d = sampledPoint27d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue27d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector9.widgets().set(3, ui.Label({
      value: 'Dia 27, ' + date27 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint28d = dia28d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue28d = sampledPoint28d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue28d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector10.widgets().set(1, ui.Label({
      value: 'Dia 28, ' + date15 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint29d = dia29d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue29d = sampledPoint29d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue29d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector10.widgets().set(2, ui.Label({
      value: 'Dia 29, ' + date29 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint30d = dia30d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue30d = sampledPoint30d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue30d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector10.widgets().set(3, ui.Label({
      value: 'Dia 30, ' + date30 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint31d = dia31d.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue31d = sampledPoint31d.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue31d.evaluate(function(result) {
       // Add a label with the results from the server.
    inspector11.widgets().set(2, ui.Label({
      value: 'Dia 31, ' + date31 +' ETo: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var panel2 = ui.Panel({style: {width: '65%'}})
    .add(ui.Label('Fontes:  Global Forecast System - GFS do National Centers for Environmental Prediction (NCEP): Sistema de previsão global de dados de atmosfera de 384 horas. OBS.: Se não alinhar os dados clique novamente' )); 
Map.centerObject(geometry, 16);
panel.widgets().set(1, inspector0).set(2, inspector).set(3, inspector1).set(4, inspector2).set(5, inspector3).set(6, inspector4).set(7, inspector5).set(8, inspector6).set(9, inspector7).set(10, inspector8).set(11, inspector9).set(12, inspector10).set(13, inspector11).set(20, panel2);
});
Map.setOptions('HYBRID');
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.903225, -9.246154]);
Map.centerObject(geometryyy, 14);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);