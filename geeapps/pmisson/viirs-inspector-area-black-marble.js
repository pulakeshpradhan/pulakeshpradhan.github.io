var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP46A2"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP46A2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var imageCollection = ee.ImageCollection("NOAA/VIIRS/001/VNP46A2"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-18.976809365018, 29.561167373546432],
          [-18.976809365018, 27.33970222999687],
          [-13.132082802518001, 27.33970222999687],
          [-13.132082802518001, 29.561167373546432]]], null, false),
    geometry2 = /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[-4.1231297175359245, 38.646892732393084],
         [-3.5658811730690254, 40.49202331782798],
         [2.0757242776500995, 41.3480605907527],
         [2.0712610818493182, 41.291334002103326],
         [1.8961664773571307, 41.4955757390708],
         [-0.4699529596594587, 39.48331102154268],
         [-0.37553920233523996, 39.48463590829743],
         [2.728802128983321, 39.547493549021745],
         [-4.489274272132537, 36.67567733212196],
         [-5.898540825243239, 37.42295117959593],
         [-3.6878171252032743, 40.45443567498671],
         [-4.420888617634935, 36.699865354478476],
         [-8.496133798531277, 42.910008781483235],
         [-8.423825394656408, 42.89714755042274],
         [-8.169447023697177, 43.40841880049167],
         [-5.96550126148355, 43.34533659847694],
         [-6.073330355839062, 43.38632941720991],
         [-5.7312851569598795, 43.52342322103589],
         [-3.1310516939966315, 43.121337594616946],
         [-1.6523682830914943, 42.48384541238909],
         [-1.676744198618838, 42.52497517257873],
         [-1.6442377861210922, 42.81114935183652],
         [-0.41026284344695574, 42.12975653905591],
         [1.1547819958946448, 41.08339341073566],
         [-0.23243408600588156, 39.82492315143551],
         [-0.553502975051634, 38.28356762997399],
         [-0.8445524876954869, 38.433128388601524],
         [-0.9897711466931458, 38.357599067401146],
         [-1.12726133569933, 37.810091135855146],
         [-1.3674471234672536, 37.73333004242502],
         [-1.8982896967540497, 36.98006219427096],
         [-2.2926696477464814, 37.34125900538947],
         [-3.612202081400495, 39.07011440688389],
         [-2.9457034838664287, 39.39959595278342],
         [-3.9448288211150384, 39.800311480885924],
         [-3.669927357943892, 40.12846913102321],
         [-4.113671578754334, 40.055110825226954],
         [-7.906893425197638, 38.56480906923747],
         [-8.468116601598277, 38.676792702990134],
         [-5.577260861909958, 42.59786945714379],
         [-3.0918852265137975, 39.1277455039295],
         [-3.3414871338129526, 38.97160846527295],
         [-2.2022681140614897, 39.40922083040841],
         [-1.62412533737045, 39.47078491933898],
         [-2.686415587865252, 42.851364126700766],
         [-8.417956772450891, 43.37204784159268],
         [-5.049743003554365, 50.15452387133105],
         [9.277633536029061, 45.45583514227081],
         [9.253770833238306, 45.40316880477909],
         [12.775294561165538, 41.68752695365252],
         [12.454549685868717, 41.9336633252543],
         [12.542581948617766, 41.97385502571861],
         [15.04890312658054, 37.47098002043572],
         [24.0150665582034, 38.13804714427356],
         [24.142282442055826, 35.537637198100846],
         [20.87694715125494, 43.64872615815569]]);
alert('This app is only as visualization tool and should not be used for scientific analisys. The data has not been not been filtred with quality flags.');
var VIIRS201204 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120401");
var VIIRS201205 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120501");
var VIIRS201206 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120601");
var VIIRS201207 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120701");
var VIIRS201208 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120801");
var VIIRS201209 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120901");
var VIIRS201210 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121001");
var VIIRS201211 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121101");
var VIIRS201212 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121201");
var VIIRS201301 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130101");
var VIIRS201302 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130201");
var VIIRS201303 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130301");
var VIIRS201304 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130401");
var VIIRS201305 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130501");
var VIIRS201306 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130601");
var VIIRS201307 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130701");
var VIIRS201308 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130801");
var VIIRS201309 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130901");
var VIIRS201310 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131001");
var VIIRS201311 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131101");
var VIIRS201312 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131201");
var VIIRS201401 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140101");
var VIIRS201402 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140201");
var VIIRS201403 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140301");
var VIIRS201404 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140401");
var VIIRS201405 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140501");
var VIIRS201406 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140601");
var VIIRS201407 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140701");
var VIIRS201408 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140801");
var VIIRS201409 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140901");
var VIIRS201410 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141001");
var VIIRS201411 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141101");
var VIIRS201412 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141201");
var VIIRS201501 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150101");
var VIIRS201502 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150201");
var VIIRS201503 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150301");
var VIIRS201504 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150401");
var VIIRS201505 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150501");
var VIIRS201506 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150601");
var VIIRS201507 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150701");
var VIIRS201508 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150801");
var VIIRS201509 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150901");
var VIIRS201510 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151001");
var VIIRS201511 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151101");
var VIIRS201512 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151201");
var VIIRS201601 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160101");
var VIIRS201602 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160201");
var VIIRS201603 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160301");
var VIIRS201604 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160401");
var VIIRS201605 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160501");
var VIIRS201606 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160601");
var VIIRS201607 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160701");
var VIIRS201608 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160801");
var VIIRS201609 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160901");
var VIIRS201610 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161001");
var VIIRS201611 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161101");
var VIIRS201612 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161201");
var VIIRS201701 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170101");
var VIIRS201702 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170201");
var VIIRS201703 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170301");
var VIIRS201704 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170401");
var VIIRS201705 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170501");
var VIIRS201706 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170601");
var VIIRS201707 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170701");
var VIIRS201708 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170801");
var VIIRS201709 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170901");
var VIIRS201710 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171001");
var VIIRS201711 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171101");
var VIIRS201712 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171201");
var VIIRS201801 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180101");
var VIIRS201802 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180201");
var VIIRS201803 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180301");
var VIIRS201804 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180401");
var VIIRS201805 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180501");
var VIIRS201806 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180601");
var VIIRS201807 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180701");
var VIIRS201808 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180801");
var VIIRS201809 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180901");
var VIIRS201810 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181001");
var VIIRS201811 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181101");
var VIIRS201812 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181201");
var VIIRS201901 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190101");
var VIIRS201902 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190201");
var VIIRS201903 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190301");
var VIIRS201904 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190401");
var VIIRS201905 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190501");
var VIIRS201906 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190601");
var VIIRS201907 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190701");
var VIIRS201908 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190801");
var VIIRS201909 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190901");
var VIIRS201910 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191001");
var VIIRS201911 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191101");
var VIIRS201912 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191201");
var VIIRS202001 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200101");
var VIIRS202002 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200201");
var VIIRS202003 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200301");
var VIIRS202004 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200401");
var VIIRS202005 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200501");
var VIIRS202006 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200601");
var VIIRS202007 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200701");
var VIIRS202008 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200801");
var VIIRS202009 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200901");
var VIIRS202010 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20201001");
var VIIRS202011 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20201101");
var VIIRS202012 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20201201");
var VIIRS202101 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210101");
var VIIRS202102 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210201");
var VIIRS202103 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210301");
var VIIRS202104 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210401");
var VIIRS202105 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210501");
var VIIRS202106 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210601");
var VIIRS202107 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210701");
var VIIRS202108 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210801");
var VIIRS202109 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20210901");
var VIIRS202110 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20211001");
var VIIRS202111 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20211101");
var VIIRS202112 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20211201");
var VIIRS202201 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220101");
var VIIRS202202 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220201");
var VIIRS202203 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220301");
var VIIRS202204 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220401");
var VIIRS202205 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220501");
var VIIRS202206 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220601");
var VIIRS202207 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220701");
var VIIRS202208 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220801");
var VIIRS202209 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20220901");
var VIIRS202210 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20221001");
var VIIRS202211 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20221101");
//var VIIRS202212 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20221201");
var collectionFromConstructor = ee.ImageCollection([
//VIIRS201204 
/*, VIIRS201205 
, VIIRS201206
, VIIRS201207
, VIIRS201208
, VIIRS201209
*/VIIRS201210
/*
, VIIRS201211 
, VIIRS201212
, VIIRS201301
, VIIRS201302
, VIIRS201303
, VIIRS201304
, VIIRS201305 
, VIIRS201306
, VIIRS201307
, VIIRS201308
, VIIRS201309
*/
, VIIRS201310
/*
, VIIRS201311 
, VIIRS201312
, VIIRS201401
, VIIRS201402
, VIIRS201403
, VIIRS201404
, VIIRS201405 
, VIIRS201406
, VIIRS201407
, VIIRS201408
, VIIRS201409
*/
, VIIRS201410
/*
, VIIRS201411 
, VIIRS201412
, VIIRS201501 
, VIIRS201502 
, VIIRS201503
, VIIRS201504
, VIIRS201505
, VIIRS201506
, VIIRS201507
, VIIRS201508
, VIIRS201509
*/
, VIIRS201510
/*
, VIIRS201511
, VIIRS201512
, VIIRS201601
, VIIRS201602
, VIIRS201603
, VIIRS201604
, VIIRS201605
, VIIRS201606
, VIIRS201607
, VIIRS201608
, VIIRS201609
*/
, VIIRS201610
/*
, VIIRS201611
, VIIRS201612
, VIIRS201701//.subtract(0.17)
, VIIRS201702//.subtract(0.17)
, VIIRS201703//.subtract(0.17)
, VIIRS201704//.subtract(0.17)
, VIIRS201705
, VIIRS201706
, VIIRS201707
, VIIRS201708//.subtract(0.17)
, VIIRS201709//.subtract(0.17)
*/
, VIIRS201710//.subtract(0.17)
/*
, VIIRS201711//.subtract(0.17)
, VIIRS201712//.subtract(0.17)
, VIIRS201801//.subtract(0.17)
, VIIRS201802//.subtract(0.17)
, VIIRS201803//.subtract(0.17)
, VIIRS201804//.subtract(0.17)
, VIIRS201805
, VIIRS201806
, VIIRS201807
, VIIRS201808//.subtract(0.17)
, VIIRS201809//.subtract(0.17)
*/
, VIIRS201810//.subtract(0.17)
/*
, VIIRS201811//.subtract(0.17)
, VIIRS201812//.subtract(0.17)
, VIIRS201901//.subtract(0.17)
, VIIRS201902//.subtract(0.17)
, VIIRS201903//.subtract(0.17)
, VIIRS201904//.subtract(0.17)
, VIIRS201905
, VIIRS201906
, VIIRS201907
, VIIRS201908//.subtract(0.17)
, VIIRS201909//.subtract(0.17)
*/
, VIIRS201910//.subtract(0.17)
/*
, VIIRS201911//.subtract(0.17)
, VIIRS201912//.subtract(0.17)
, VIIRS202001//.subtract(0.17)
, VIIRS202002//.subtract(0.17)
, VIIRS202003//.subtract(0.17)
, VIIRS202004//.subtract(0.17)
, VIIRS202005
, VIIRS202006
, VIIRS202007
, VIIRS202008//.subtract(0.17)
, VIIRS202009//.subtract(0.17)
*/
, VIIRS202010//.subtract(0.17)
/*
, VIIRS202011//.subtract(0.17)
, VIIRS202012//.subtract(0.17)
, VIIRS202101//.subtract(0.17)
, VIIRS202102//.subtract(0.17)
, VIIRS202103//.subtract(0.17)
, VIIRS202104//.subtract(0.17)
, VIIRS202105
, VIIRS202106
, VIIRS202107
, VIIRS202108//.subtract(0.17)
, VIIRS202109//.subtract(0.17)
*/
, VIIRS202110//.subtract(0.17)
/*
, VIIRS202111//.subtract(0.17)
, VIIRS202112//.subtract(0.17)
, VIIRS202201//.subtract(0.17)
, VIIRS202202//.subtract(0.17)
, VIIRS202203//.subtract(0.17)
, VIIRS202204//.subtract(0.17)
, VIIRS202205//.subtract(0.17)
, VIIRS202206
, VIIRS202207
, VIIRS202208
, VIIRS202209
*/
, VIIRS202210
//, VIIRS202211
//, VIIRS202212
]);
var vizParams2 = {
  bands: ['avg_rad'],
  min: 0.0,
  max: 150,
  gamma: 3.0,
};
var F=0
var T=1
Map.setCenter(-3.7353515625,40.463666324587685, 6);
/*
Map.addLayer(VIIRS201401, vizParams2, 'VIIRS201401',F);
Map.addLayer(VIIRS201402, vizParams2, 'VIIRS201402',F);
Map.addLayer(VIIRS201403, vizParams2, 'VIIRS201403',F);
Map.addLayer(VIIRS201404, vizParams2, 'VIIRS201404',F);
Map.addLayer(VIIRS201405, vizParams2, 'VIIRS201405',F);
Map.addLayer(VIIRS201406, vizParams2, 'VIIRS201406',F);
Map.addLayer(VIIRS201407, vizParams2, 'VIIRS201407',F);
Map.addLayer(VIIRS201408, vizParams2, 'VIIRS201408',F);
Map.addLayer(VIIRS201409, vizParams2, 'VIIRS201409',F);
Map.addLayer(VIIRS201410, vizParams2, 'VIIRS201410',F);
Map.addLayer(VIIRS201411, vizParams2, 'VIIRS201411',F);
Map.addLayer(VIIRS201412, vizParams2, 'VIIRS201412',F);
Map.addLayer(VIIRS201501, vizParams2, 'VIIRS201501',F);
Map.addLayer(VIIRS201502, vizParams2, 'VIIRS201502',F);
Map.addLayer(VIIRS201503, vizParams2, 'VIIRS201503',F);
Map.addLayer(VIIRS201504, vizParams2, 'VIIRS201504',F);
Map.addLayer(VIIRS201505, vizParams2, 'VIIRS201505',F);
Map.addLayer(VIIRS201506, vizParams2, 'VIIRS201506',F);
Map.addLayer(VIIRS201507, vizParams2, 'VIIRS201507',F);
Map.addLayer(VIIRS201508, vizParams2, 'VIIRS201508',F);
Map.addLayer(VIIRS201509, vizParams2, 'VIIRS201509',F);
Map.addLayer(VIIRS201510, vizParams2, 'VIIRS201510',F);
Map.addLayer(VIIRS201511, vizParams2, 'VIIRS201511',F);
Map.addLayer(VIIRS201512, vizParams2, 'VIIRS201512',F);
Map.addLayer(VIIRS201601, vizParams2, 'VIIRS201601',F);
Map.addLayer(VIIRS201602, vizParams2, 'VIIRS201602',F);
Map.addLayer(VIIRS201603, vizParams2, 'VIIRS201603',F);
Map.addLayer(VIIRS201604, vizParams2, 'VIIRS201604',F);
Map.addLayer(VIIRS201605, vizParams2, 'VIIRS201605',F);
Map.addLayer(VIIRS201606, vizParams2, 'VIIRS201606',F);
Map.addLayer(VIIRS201607, vizParams2, 'VIIRS201607',F);
Map.addLayer(VIIRS201608, vizParams2, 'VIIRS201608',F);
Map.addLayer(VIIRS201609, vizParams2, 'VIIRS201609',F);
Map.addLayer(VIIRS201610, vizParams2, 'VIIRS201610',F);
Map.addLayer(VIIRS201611, vizParams2, 'VIIRS201611',F);
Map.addLayer(VIIRS201612, vizParams2, 'VIIRS201612',F);
Map.addLayer(VIIRS201701, vizParams2, 'VIIRS201701',F);
Map.addLayer(VIIRS201702, vizParams2, 'VIIRS201702',F);
Map.addLayer(VIIRS201703, vizParams2, 'VIIRS201703',F);
Map.addLayer(VIIRS201704, vizParams2, 'VIIRS201704',F);
Map.addLayer(VIIRS201705, vizParams2, 'VIIRS201705',F);
Map.addLayer(VIIRS201706, vizParams2, 'VIIRS201706',F);
Map.addLayer(VIIRS201707, vizParams2, 'VIIRS201707',F);
Map.addLayer(VIIRS201708, vizParams2, 'VIIRS201708',F);
Map.addLayer(VIIRS201709, vizParams2, 'VIIRS201709',F);
Map.addLayer(VIIRS201710, vizParams2, 'VIIRS201710',F);
Map.addLayer(VIIRS201711, vizParams2, 'VIIRS201711',F);
Map.addLayer(VIIRS201712, vizParams2, 'VIIRS201712',F);
Map.addLayer(VIIRS201801, vizParams2, 'VIIRS201801',F);
Map.addLayer(VIIRS201802, vizParams2, 'VIIRS201802',F);
Map.addLayer(VIIRS201803, vizParams2, 'VIIRS201803',F);
Map.addLayer(VIIRS201804, vizParams2, 'VIIRS201804',F);
Map.addLayer(VIIRS201805, vizParams2, 'VIIRS201805',F);
Map.addLayer(VIIRS201806, vizParams2, 'VIIRS201806',F);
Map.addLayer(VIIRS201807, vizParams2, 'VIIRS201807',F);
Map.addLayer(VIIRS201808, vizParams2, 'VIIRS201808',F);
Map.addLayer(VIIRS201809, vizParams2, 'VIIRS201809',F);
Map.addLayer(VIIRS201810, vizParams2, 'VIIRS201810',F);
Map.addLayer(VIIRS201811, vizParams2, 'VIIRS201811',F);
Map.addLayer(VIIRS201812, vizParams2, 'VIIRS201812',F);
*/
var med=collectionFromConstructor.filterDate('2020-01-01', '2022-05-30').select('avg_rad').reduce(ee.Reducer.median());
var mask1=med.gt(5)
var diff=VIIRS201210.select('avg_rad').subtract(med).divide(med).mask(mask1);
var diff2=VIIRS202210.select('avg_rad').subtract(med).divide(med).mask(mask1);
diff.unmask(0)
Map.addLayer(VIIRS201901, vizParams2, 'VIIRS201901',F);
Map.addLayer(VIIRS201902, vizParams2, 'VIIRS201902',F);
Map.addLayer(VIIRS201903, vizParams2, 'VIIRS201903',F);
Map.addLayer(VIIRS201904, vizParams2, 'VIIRS201904',F);
Map.addLayer(VIIRS201905, vizParams2, 'VIIRS201905',F);
Map.addLayer(VIIRS201906, vizParams2, 'VIIRS201906',F);
Map.addLayer(VIIRS201907, vizParams2, 'VIIRS201907',F);
Map.addLayer(VIIRS201908, vizParams2, 'VIIRS201908',F);
Map.addLayer(VIIRS201909, vizParams2, 'VIIRS201909',F);
Map.addLayer(VIIRS201910, vizParams2, 'VIIRS201910',F);
Map.addLayer(VIIRS201911, vizParams2, 'VIIRS201911',F);
Map.addLayer(VIIRS201912, vizParams2, 'VIIRS201912',F);
Map.addLayer(VIIRS202001, vizParams2, 'VIIRS202001',F);
Map.addLayer(VIIRS202002, vizParams2, 'VIIRS202002',F);
Map.addLayer(VIIRS202003, vizParams2, 'VIIRS202003',F);
Map.addLayer(VIIRS202004, vizParams2, 'VIIRS202004',F);
Map.addLayer(VIIRS202005, vizParams2, 'VIIRS202005',F);
var vis = {min: 1, max: -1, palette: ['#27ff00','#fff700','#ff0606']}
Map.addLayer(diff, vis, 'diff',T);
//Map.addLayer(diff2, vis, 'diff2',T);
/*
var Image= VIIRS201901.select('avg_rad');
Export.image.toDrive({
  image: Image,
  description: 'VIIRS_DNB_Canaryislands201901',
  scale: 500,
  region: geometry,
  fileFormat: 'GeoTIFF'
}); 
*/
//var geo=geometry.visualize({color: 'FF0000'});
var geoLayer = ui.Map.Layer(geometry, {color: '000000'}, 'Anomaly locations').setName('Anomaly locations');
var composite=diff.visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('April 2020 VIIRS Anomaly');
//layers.add(diff2, 'May 2020');
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'April 2020');
var modisOceanColor = collectionFromConstructor.filterDate('2012-01-01', '2022-06-30').select('avg_rad')
var sst= modisOceanColor.select(['avg_rad']).filterDate('2012-01-01', '2022-06-30');
mapPanel.setOptions('SATELLITE');
mapPanel.layers().set(2, geoLayer );
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
/*
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'VIIRS Radiance - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series radiance')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
*/
/*
 * Chart setup
 */
/*
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(sst, point, ee.Reducer.median(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Radiance of VIIRS',
    vAxis: {title: 'nw/cm2/sr'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
};
*/
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
/*
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min*100*-1, {margin: '4px 8px'}),
    ui.Label(
        (0),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max*100*-1, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: Variation rate(%)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
  inspector1.style().set({
  width: '200px',
  position: 'bottom-right'});
// Add a label to the panel.
inspectorPanel.add(ui.Label('Tool provided by the EMISSI@N project and SkyQuality IAA-CSIC'));
inspectorPanel.add(ui.Label('Grants: AYA2017-89637-R, NERC grant NE/P01156X/1; SEV- 2017-0709'));
inspectorPanel.add(ui.Label('Institutions:'));
inspectorPanel.add(ui.Label('University of Exeter/U. Complutense de Madrid/IAA-CSIC'));
inspectorPanel.add(ui.Label('Source images from Earth Observation Group (EOG) Colorado School of Mines and SNPP/VIIRS-DNB'));
inspectorPanel.add(ui.Label('Cite and credit of current version: Bustamante-Calabria, M., Sánchez de Miguel, A., Martín-Ruiz, S., Ortiz, J. L., Vílchez, J. M., Pelegrina, A., ... & Gaston, K. J. (2021). Effects of the COVID-19 lockdown on urban light emissions: ground and satellite comparison. Remote Sensing, 13(2), 258.'));
//Map.add(inspector1);
*/
/*
 * Map setup
 */
/*
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-3.6053, 37.169);
mapPanel.centerObject(initialPoint, 8);
*/
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
/*
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
*/
alert('Imáges: VNP46A2 NASA/BlackMarble Procesado:A. Sánchez de Miguel Financiación: RALAN/UNA4CAREER Interface:Gabriel Marbán Paine,Alberto Jiménez González, A. Sánchez de Miguel Tutor del proyecto: Julio Galarón Touriño Cliente: A.Sánchez de Miguel/Cities at Night')
alert('Decrease in signal cannot be interpretated as light pollution reductions without spectral information. Please, ask to experts on the field.')
// Creación de timelapses en Google Earth Engine
// http://www.gisandbeers.com/crear-timelapses-en-google-earth-engine/
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
// Llamamos a la colección de imágenes y filtramos fechas de análisis
var MODIS = imageCollection2;
//print(MODIS)
// Componemos la imagen RGB o generamos un índice para el timelapse
var MODIS_ColorReal = MODIS.select([
  'DNB_BRDF_Corrected_NTL']);
  var vizParamsX2 = {
  min:[1],
  max:[150],
  gamma: [3],
  };  
// Creamos la animación con la colección de imagenes y parámetros del timelapses
var AnimaChart = ui.Panel({
  style:
      {height: 'auto', width: 'auto', position: 'middle-left', shown: false}
});
var DataChart = ui.Panel({
  style:
      {height: 'auto', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(AnimaChart);
Map.add(DataChart);
function AnimaChartTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!AnimaChart.style().get('shown') || !DataChart.style().get('shown')) {
    AnimaChart.style().set('shown', true);
    DataChart.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  print(MODIS_ColorReal)
// Define arguments for animation function parameters.
var videoArgs = {
  dimensions: 768,
  region: aoi,
  framesPerSecond: 7,
  crs: 'EPSG:3857',
};
 MODIS_ColorReal = MODIS.select([
  'DNB_BRDF_Corrected_NTL']);
var text = require('users/gena/packages:text');
var MODIS_ColorReal =  MODIS_ColorReal.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var end = ee.Date(image.get('system:time_end'));
  var label = start.format('YYYY-MM-dd').cat(' - ').cat(end.format('YYYY-MM-dd'));
  return image.visualize({
    forceRgbOutput: true,
    //palette: palettes.BrBG[9], //original palette was "000000", "fdbb84"
    //min: 0,
    //max: 1
  }).clip(aoi).set({label: label}); 
});
// annotate
var annotations = [
  {
    position: 'left', offset: '1%', margin: '1%', property: 'label', scale: Map.getScale() * 2
  }
]
MODIS_ColorReal = MODIS_ColorReal.map(function(image) {
  return text.annotateImage(image, {}, aoi, annotations)  
});
//print(ui.Thumbnail(MODIS_ColorReal, videoArgs)); //print gif 
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Definimos las coordenadas máximas y mínimas de visualización en el timelapse
  var ZonaAOI = aoi
// Parametrizamos el timelapse con proyección, resolución, AOI, valores de pixel y frames/seg
  var Timelapse = {
    crs: 'EPSG:4326',
    dimensions: '768',
    region: ZonaAOI,
    min:[0],
    max:[150],
    gamma: [1],
    framesPerSecond: 5,};
  // Chart NDVI time series for the selected area of interest.
  var Animacion = ui.Thumbnail({
  image: MODIS_ColorReal,
  params: Timelapse,
  style: {
    position: 'bottom-center', //'bottom-right','bottom-right'
    height: 'auto', width: 'auto', 'max-width': '500px', 'max-height': '500px'}});
  // Replace the existing chart in the chart panel with the new chart.
  // Chart
  var curIter = 1;
  var func = function(image, list){
    var reduce = image.select('DNB_BRDF_Corrected_NTL').reduceRegion({
      reducer: ee.Reducer.frequencyHistogram(),
      geometry: ZonaAOI,
      scale: 30,
      crs: 'EPSG: 4326',
      bestEffort: true
    });
    var values = ee.Dictionary(reduce.get('DNB_BRDF_Corrected_NTL')).keys();
    var toNumbers =  values.map(function(q){
      var number = ee.Number.parse(q);
      return number;
    });
    //print(toNumbers.reduce(ee.Reducer.sum()),"lightning");
    return ee.List(list).add(toNumbers.reduce(ee.Reducer.mean()));
  };
  //AnimaChart.widgets().reset([Animacion]);
  DataChart.widgets().reset();
  var panels = ee.List([]);
  var itemList = [];
  var dates = MODIS.aggregate_array("system:time_start");
  print(dates)
  for (var i = 1; i <= 3; i++) {
    var dataList = ee.List([]);
    var toAdd = ee.List(MODIS.iterate(func, dataList));
    itemList.push(toAdd);
    curIter++;
  }
  //Crea lalos features (las row de la tabla)
  //print( itemDates)
  var features = [
    ee.Feature(null, {'row': ee.List([1, itemList[0].get(0)])}),
    ee.Feature(null, {'row': ee.List([2, itemList[0].get(1)])}),
    ee.Feature(null, {'row': ee.List([3, itemList[0].get(2)])}),
    ee.Feature(null, {'row': ee.List([4, itemList[0].get(3)])}),
    ee.Feature(null, {'row': ee.List([5, itemList[0].get(4)])}),
    ee.Feature(null, {'row': ee.List([6, itemList[0].get(5)])}),
    ee.Feature(null, {'row': ee.List([7, itemList[0].get(6)])}),
    ee.Feature(null, {'row': ee.List([8, itemList[0].get(7)])}),
    ee.Feature(null, {'row': ee.List([9, itemList[0].get(8)])}),
    ee.Feature(null, {'row': ee.List([10, itemList[0].get(9)])}),
    ee.Feature(null, {'row': ee.List([11, itemList[0].get(10)])}),
    ee.Feature(null, {'row': ee.List([12, itemList[0].get(11)])}),
    ee.Feature(null, {'row': ee.List([13, itemList[0].get(12)])}),
    ee.Feature(null, {'row': ee.List([14, itemList[0].get(13)])}),
    ee.Feature(null, {'row': ee.List([15, itemList[0].get(14)])}),
    ee.Feature(null, {'row': ee.List([16, itemList[0].get(15)])}),
    ee.Feature(null, {'row': ee.List([17, itemList[0].get(16)])}),
    ee.Feature(null, {'row': ee.List([18, itemList[0].get(17)])}),
    ee.Feature(null, {'row': ee.List([19, itemList[0].get(18)])}),
    ee.Feature(null, {'row': ee.List([20, itemList[0].get(19)])}),
    ee.Feature(null, {'row': ee.List([21,itemList[0].get(20)])}),
    ee.Feature(null, {'row': ee.List([22, itemList[0].get(21)])}),
    ee.Feature(null, {'row': ee.List([23, itemList[0].get(22)])}),
    ee.Feature(null, {'row': ee.List([24, itemList[0].get(23)])}),
    ee.Feature(null, {'row': ee.List([25, itemList[0].get(24)])}),
    ee.Feature(null, {'row': ee.List([26, itemList[0].get(25)])}),
    ee.Feature(null, {'row': ee.List([27, itemList[0].get(26)])}),
    ee.Feature(null, {'row': ee.List([28, itemList[0].get(27)])}),
    ee.Feature(null, {'row': ee.List([29, itemList[0].get(28)])}),
    ee.Feature(null, {'row': ee.List([30, itemList[0].get(29)])}),
    ee.Feature(null, {'row': ee.List([31 ,itemList[0].get(30)])}),
    ee.Feature(null, {'row': ee.List([32, itemList[0].get(31)])}),
    ee.Feature(null, {'row': ee.List([33, itemList[0].get(32)])}),
    ee.Feature(null, {'row': ee.List([34, itemList[0].get(33)])}),
    ee.Feature(null, {'row': ee.List([35, itemList[0].get(34)])}),
    ee.Feature(null, {'row': ee.List([36, itemList[0].get(35)])}),
    ee.Feature(null, {'row': ee.List([37, itemList[0].get(36)])}),
    ee.Feature(null, {'row': ee.List([38, itemList[0].get(37)])}),
    ee.Feature(null, {'row': ee.List([39, itemList[0].get(38)])}),
    ee.Feature(null, {'row': ee.List([40, itemList[0].get(39)])}),
    ee.Feature(null, {'row': ee.List([41 ,itemList[0].get(40)])}),
    ee.Feature(null, {'row': ee.List([42, itemList[0].get(41)])}),
    ee.Feature(null, {'row': ee.List([43, itemList[0].get(42)])}),
    ee.Feature(null, {'row': ee.List([44, itemList[0].get(43)])}),
    ee.Feature(null, {'row': ee.List([45, itemList[0].get(44)])}),
    ee.Feature(null, {'row': ee.List([46, itemList[0].get(45)])}),
    ee.Feature(null, {'row': ee.List([47, itemList[0].get(46)])}),
    ee.Feature(null, {'row': ee.List([48, itemList[0].get(47)])}),
    ee.Feature(null, {'row': ee.List([49, itemList[0].get(48)])}),
    ee.Feature(null, {'row': ee.List([50, itemList[0].get(49)])}),
    ee.Feature(null, {'row': ee.List([51 ,itemList[0].get(50)])}),
    ee.Feature(null, {'row': ee.List([52, itemList[0].get(51)])}),
    ee.Feature(null, {'row': ee.List([53, itemList[0].get(52)])}),
    ee.Feature(null, {'row': ee.List([54, itemList[0].get(53)])}),
    ee.Feature(null, {'row': ee.List([55, itemList[0].get(54)])}),
    ee.Feature(null, {'row': ee.List([56, itemList[0].get(55)])}),
    ee.Feature(null, {'row': ee.List([57, itemList[0].get(56)])}),
    ee.Feature(null, {'row': ee.List([58, itemList[0].get(57)])}),
    ee.Feature(null, {'row': ee.List([59, itemList[0].get(58)])}),
    ee.Feature(null, {'row': ee.List([60, itemList[0].get(59)])}),
    ee.Feature(null, {'row': ee.List([61 ,itemList[0].get(60)])}),
    ee.Feature(null, {'row': ee.List([62, itemList[0].get(61)])}),
    ee.Feature(null, {'row': ee.List([63, itemList[0].get(62)])}),
    ee.Feature(null, {'row': ee.List([64, itemList[0].get(63)])}),
    ee.Feature(null, {'row': ee.List([65, itemList[0].get(64)])}),
    ee.Feature(null, {'row': ee.List([66, itemList[0].get(65)])}),
    ee.Feature(null, {'row': ee.List([67, itemList[0].get(66)])}),
    ee.Feature(null, {'row': ee.List([68, itemList[0].get(67)])}),
    ee.Feature(null, {'row': ee.List([69, itemList[0].get(68)])}),
    ee.Feature(null, {'row': ee.List([70, itemList[0].get(69)])}),
    ee.Feature(null, {'row': ee.List([71, itemList[0].get(70)])}),
    ee.Feature(null, {'row': ee.List([72, itemList[0].get(71)])}),
    ee.Feature(null, {'row': ee.List([73, itemList[0].get(72)])}),
    ee.Feature(null, {'row': ee.List([74, itemList[0].get(73)])}),
    ee.Feature(null, {'row': ee.List([75, itemList[0].get(74)])}),
    ee.Feature(null, {'row': ee.List([76, itemList[0].get(75)])}),
    ee.Feature(null, {'row': ee.List([77, itemList[0].get(76)])}),
    ee.Feature(null, {'row': ee.List([78, itemList[0].get(77)])}),
    ee.Feature(null, {'row': ee.List([79, itemList[0].get(78)])}),
    ee.Feature(null, {'row': ee.List([80, itemList[0].get(79)])}),
    ee.Feature(null, {'row': ee.List([81, itemList[0].get(80)])}),
    ee.Feature(null, {'row': ee.List([82, itemList[0].get(81)])}),
    ee.Feature(null, {'row': ee.List([83, itemList[0].get(82)])}),
    ee.Feature(null, {'row': ee.List([84, itemList[0].get(83)])}),
    ee.Feature(null, {'row': ee.List([85, itemList[0].get(84)])}),
    ee.Feature(null, {'row': ee.List([86, itemList[0].get(85)])}),
    ee.Feature(null, {'row': ee.List([87, itemList[0].get(86)])}),
    ee.Feature(null, {'row': ee.List([88, itemList[0].get(87)])}),
    ee.Feature(null, {'row': ee.List([89, itemList[0].get(88)])}),
    ee.Feature(null, {'row': ee.List([90, itemList[0].get(89)])}),
    ee.Feature(null, {'row': ee.List([91, itemList[0].get(90)])})
  ];
  // Create a FeatureCollection from the list and print it.
  var reductionTable = ee.FeatureCollection(features);
  // Aggregate the 'row' property from all features in the new feature collection
  // to make a server-side 2-D list (DataTable).
  var dataTableServer = reductionTable.aggregate_array('row');
  // Define column names and properties for the DataTable. The order should
  // correspond to the order in the construction of the 'row' property above.
  var columnHeader = ee.List([[
    {label: 'x', role: 'domain', type: 'number'},
    {label: 'DNB_BRDF_Corrected_NTL', role: 'data', type: 'number'},
  ]]);
  // Concatenate the column header to the table.
  dataTableServer = columnHeader.cat(dataTableServer);
  // Use 'evaluate' to transfer the server-side table to the client, define the
  // chart and print it to the console.
  dataTableServer.evaluate(function(dataTableClient) {
    var options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'nw cm^{-2} sr^{-1}',logScale: true
        },
        title: 'Mean Radiance',
        series: {
          0: {lineWidth: 0, color: 'red', pointSize: 3},
        },
        chartArea: {backgroundColor: 'EBEBEB'}
    };
    var chart = ui.Chart.image.series({imageCollection:MODIS.select('DNB_BRDF_Corrected_NTL'),region:ZonaAOI,reducer: ee.Reducer.mean(),scale:30, xProperty: 'system:time_start'}).setOptions(options);
      DataChart.widgets().add(ui.Panel({
        widgets: [chart],
        style:{width: 'auto', height: 'auto'}
      }));
  });
}
drawingTools.onDraw(ui.util.debounce(AnimaChartTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(AnimaChartTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
/*
// Adicionalmente visualizamos una imagen compuesta del timelapse sobre el visor
var MODIS_Composicion = ee.Image(MODIS_ColorReal.median());
Map.addLayer (MODIS_Composicion, {
  min:[0],
  max:[150],
  gamma: [3],
  bands: ['DNB_BRDF_Corrected_NTL']}, 
  'VIIRS');
*/  
//Map.centerObject(MODIS_Composicion, 2);
Map.setCenter(-3.701134, 40.417099, 5);
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
  inspector1.style().set({
  width: '200px',
  position: 'top-right'});
// Add a label to the panel.
inspector1.add(ui.Label('Tool provided by the'));
inspector1.add(ui.Label('Cities at night project').setUrl('https://citiesatnight.org'));
inspector1.add(ui.Label('Universidad Complutense de Madrid and University of Exeter'));
inspector1.add(ui.Label('Global trends using EOG Colorado School of Mines data, show that green indicates a decrease, yellow signifies stability, and red represents an increase between 2012 and 2022'));
inspector1.add(ui.Label('The daily trends data is courtesy of NASA\'s Black Marble.'));
inspector1.add(ui.Label('Please note that this tool has not yet incorporated quality flags, rendering it unsuitable for academic research. Furthermore, be aware that due to the limited spectral sensitivity of the instruments used, a reduction in signal could be attributed to various physical processes, not necessarily a reduction in light. We encourage you to explore the following articles and courses for more detailed information and references.'));
inspector1.add(ui.Label('NASA Black Marble').setUrl('https://blackmarble.gsfc.nasa.gov/'));
inspector1.add(ui.Label('Black Marble Training').setUrl('https://appliedsciences.nasa.gov/join-mission/training/english/arset-introduction-nasas-black-marble-night-lights-data'));
inspector1.add(ui.Label('Limitations').setUrl('https://citiesatnight.org/how-use-viirs-data/'));
inspector1.add(ui.Label('Alejandro Sánchez de Miguel, Gabriel Marbán Paine, Alberto Jiménez González, & Julio Galarón Touriño. (2023). VIIRS Inspector Area Black Marbel (0.1). Zenodo.').setUrl('https://doi.org/10.5281/zenodo.7946630'));
// Add the panel to the default map
Map.add(inspector1);