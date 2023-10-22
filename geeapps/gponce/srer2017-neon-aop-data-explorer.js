var neon_srer_hs = ui.import && ui.import("neon_srer_hs", "imageCollection", {
      "id": "users/gponce/usda_ars/image_collections/neon_srer_2017_hs"
    }) || ee.ImageCollection("users/gponce/usda_ars/image_collections/neon_srer_2017_hs"),
    rgb10cm = ui.import && ui.import("rgb10cm", "imageCollection", {
      "id": "users/gponce/usda_ars/image_collections/neon_srer_2017_rgb"
    }) || ee.ImageCollection("users/gponce/usda_ars/image_collections/neon_srer_2017_rgb"),
    ltar_sites = ui.import && ui.import("ltar_sites", "table", {
      "id": "users/gponce/usda_ars/shapefiles/LTAR/ltar_boundaries"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/LTAR/ltar_boundaries"),
    ws = ui.import && ui.import("ws", "table", {
      "id": "users/gponce/usda_ars/shapefiles/SRER/SRER_ARS_Watershed"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/SRER/SRER_ARS_Watershed"),
    ws_polys = ui.import && ui.import("ws_polys", "table", {
      "id": "users/gponce/usda_ars/shapefiles/SRER/SRER_ARS_watersheds_polygons"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/SRER/SRER_ARS_watersheds_polygons");
//# *** NEON-SRER-2017 hyperspectral data explorer *** 
//# USDA-ARS-SWRC, 2018
//# Contact info: 
//# Guillermo Ponce <geponce@arizona.edu>
// Center and zoom
//Map.setCenter(-110.495, 31.8308,11)
Map.setCenter(-110.8175, 31.8523,12)
// Get SRER boundaries
var srer = ltar_sites.filter(ee.Filter.eq('acronym','SRER'))
// Load 10cm image for reference
var rgb_10cm_SRER_2017 = rgb10cm.mosaic()
rgb_10cm_SRER_2017 = rgb_10cm_SRER_2017.updateMask(rgb_10cm_SRER_2017.neq(0))
// Set hyperspectral bands to use
var falseColor_NIR = ['b90','b34','b19']  
var naturalColor = ['b58','b33','b19']
var ndvi_bands = ['b90','b58']
// Get NDVI
var ndvi = neon_srer_hs.map(function (img) {
          return img.select(ndvi_bands)
        }).mosaic().divide(10000).normalizedDifference(ndvi_bands)
// Create FalseColor-NIR
var map_nirfc = neon_srer_hs.map(function (img) {
          return img.select(falseColor_NIR)
  }).mosaic().divide(10000)
// Create RGB
var map_rgb= neon_srer_hs.map(function (img) {
          return img.select(naturalColor)
  }).mosaic().divide(10000)
// Create image with all bands to create plot
var blist = ee.List.sequence(1,426)
var bd = blist.map(function (e) {
      return ee.String("b").cat(ee.String(ee.Number(e).toInt()))
  })  
var img_all = neon_srer_hs.map(function (img) {
          return img.select(bd).divide(10000)
  }).mosaic()
// Set chart options
var wavelengths = [381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,522,527,532,537,542,547,552,557,562,567,572,577,582,587,592,597,602,607,612,617,622,627,632,637,642,647,652,657,662,667,672,677,682,687,692,697,702,707,712,717,722,727,732,737,742,747,752,757,762,767,772,777,782,787,792,797,802,807,812,817,822,827,832,837,842,847,852,857,862,867,872,877,882,887,892,897,902,907,912,917,922,927,932,937,942,947,952,957,962,967,972,977,982,987,992,997,1002,1007,1012,1017,1022,1027,1032,1037,1042,1047,1052,1057,1062,1067,1072,1077,1082,1087,1092,1097,1102,1107,1112,1117,1122,1127,1132,1138,1143,1148,1153,1158,1163,1168,1173,1178,1183,1188,1193,1198,1203,1208,1213,1218,1223,1228,1233,1238,1243,1248,1253,1258,1263,1268,1273,1278,1283,1288,1293,1298,1303,1308,1313,1318,1323,1328,1333,1338,1343,1348,1353,1358,1363,1368,1373,1378,1383,1388,1393,1398,1403,1408,1413,1418,1423,1428,1433,1438,1443,1448,1453,1458,1463,1468,1473,1478,1483,1488,1493,1498,1503,1508,1513,1518,1523,1528,1533,1538,1543,1548,1553,1558,1563,1568,1573,1578,1583,1588,1593,1598,1603,1608,1613,1618,1623,1628,1633,1638,1643,1648,1653,1658,1663,1668,1673,1678,1683,1688,1693,1698,1703,1708,1713,1718,1723,1728,1733,1738,1743,1748,1754,1759,1764,1769,1774,1779,1784,1789,1794,1799,1804,1809,1814,1819,1824,1829,1834,1839,1844,1849,1854,1859,1864,1869,1874,1879,1884,1889,1894,1899,1904,1909,1914,1919,1924,1929,1934,1939,1944,1949,1954,1959,1964,1969,1974,1979,1984,1989,1994,1999,2004,2009,2014,2019,2024,2029,2034,2039,2044,2049,2054,2059,2064,2069,2074,2079,2084,2089,2094,2099,2104,2109,2114,2119,2124,2129,2134,2139,2144,2149,2154,2159,2164,2169,2174,2179,2184,2189,2194,2199,2204,2209,2214,2219,2224,2229,2234,2239,2244,2249,2254,2259,2264,2269,2274,2279,2284,2289,2294,2299,2304,2309,2314,2319,2324,2329,2334,2339,2344,2349,2354,2359,2364,2370,2375,2380,2385,2390,2395,2400,2405,2410,2415,2420,2425,2430,2435,2440,2445,2450,2455,2460,2465,2470,2475,2480,2485,2490,2495,2500,2505,2510]
var classNames = ['381','386','391','396','401','406','411','416','421','426','431','436','441','446','451','456','461','466','471','476','481','486','491','496','501','506','511','516','522','527','532','537','542','547','552','557','562','567','572','577','582','587','592','597','602','607','612','617','622','627','632','637','642','647','652','657','662','667','672','677','682','687','692','697','702','707','712','717','722','727','732','737','742','747','752','757','762','767','772','777','782','787','792','797','802','807','812','817','822','827','832','837','842','847','852','857','862','867','872','877','882','887','892','897','902','907','912','917','922','927','932','937','942','947','952','957','962','967','972','977','982','987','992','997','1002','1007','1012','1017','1022','1027','1032','1037','1042','1047','1052','1057','1062','1067','1072','1077','1082','1087','1092','1097','1102','1107','1112','1117','1122','1127','1132','1138','1143','1148','1153','1158','1163','1168','1173','1178','1183','1188','1193','1198','1203','1208','1213','1218','1223','1228','1233','1238','1243','1248','1253','1258','1263','1268','1273','1278','1283','1288','1293','1298','1303','1308','1313','1318','1323','1328','1333','1338','1343','1348','1353','1358','1363','1368','1373','1378','1383','1388','1393','1398','1403','1408','1413','1418','1423','1428','1433','1438','1443','1448','1453','1458','1463','1468','1473','1478','1483','1488','1493','1498','1503','1508','1513','1518','1523','1528','1533','1538','1543','1548','1553','1558','1563','1568','1573','1578','1583','1588','1593','1598','1603','1608','1613','1618','1623','1628','1633','1638','1643','1648','1653','1658','1663','1668','1673','1678','1683','1688','1693','1698','1703','1708','1713','1718','1723','1728','1733','1738','1743','1748','1754','1759','1764','1769','1774','1779','1784','1789','1794','1799','1804','1809','1814','1819','1824','1829','1834','1839','1844','1849','1854','1859','1864','1869','1874','1879','1884','1889','1894','1899','1904','1909','1914','1919','1924','1929','1934','1939','1944','1949','1954','1959','1964','1969','1974','1979','1984','1989','1994','1999','2004','2009','2014','2019','2024','2029','2034','2039','2044','2049','2054','2059','2064','2069','2074','2079','2084','2089','2094','2099','2104','2109','2114','2119','2124','2129','2134','2139','2144','2149','2154','2159','2164','2169','2174','2179','2184','2189','2194','2199','2204','2209','2214','2219','2224','2229','2234','2239','2244','2249','2254','2259','2264','2269','2274','2279','2284','2289','2294','2299','2304','2309','2314','2319','2324','2329','2334','2339','2344','2349','2354','2359','2364','2370','2375','2380','2385','2390','2395','2400','2405','2410','2415','2420','2425','2430','2435','2440','2445','2450','2455','2460','2465','2470','2475','2480','2485','2490','2495','2500','2505','2510'];
var bands_no = [];
for (var i = 1; i < 427; ++i) bands_no.push(i)
// Create a panel to hold widgets.
var panel = ui.Panel();
panel.style().set('width', '800px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NEON-SRER-2017 Hyperspectral Data Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({value: ' NEON (National Ecological Observatory Network):',
            style: {fontSize: '12px' }}),
  ui.Label({value: '- High-resolution orthorectified camera imagery mosaic, RELEASE-2021 (DP3.30010.001). https://doi.org/10.48443',
            style: {fontSize: '10px' }}),
  ui.Label({value: '- Spectrometer orthorectified surface directional reflectance - mosaic, RELEASE-2021 (DP3.30006.001). https://doi.org/10.48443/qeae-3x15',
            style: {fontSize: '10px'}}),          
  ui.Label('Click on the image area for pixel inspection.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(5, dot);
  // Create spectral by wavelength chart.
  var hsChart = ui.Chart.image.regions({
    image: img_all,
    regions: point,
    reducer: ee.Reducer.mean(),
    scale: 1,
    xLabels: wavelengths
    }).setSeriesNames(['Spectral signature for pixel Lon:'+coords.lon.toFixed(2)+' Lat:'+coords.lat.toFixed(2)]);
  hsChart.setOptions({
    title: 'NEON SRER-2017 Hyperspectral (λ)',
    vAxis: {title: 'Reflectance',
            viewWindow: {
                min: 0,
                max: 1}
           },
    hAxis: {title: 'λ(nm)', 
            gridlines: {count: 10},
    }
  });
  panel.widgets().set(2, hsChart);
  var hsChart2 = ui.Chart.image.regions({
    image: img_all,
    regions: point,
    reducer: ee.Reducer.mean(),
    scale: 1,
    xLabels: bands_no
    }).setSeriesNames(['Spectral signature for pixel Lon:'+coords.lon.toFixed(2)+' Lat:'+coords.lat.toFixed(2)]);
  hsChart2.setOptions({
    title: 'NEON SRER-2017 Hyperspectral (band #)',
    vAxis: {title: 'Reflectance',
            viewWindow: {
                min: 0,
                max: 1}
           },
    hAxis: {title: 'Bands', 
            gridlines: {count: 10}
    }
  });
  panel.widgets().set(3, hsChart2);
});
Map.style().set('cursor', 'crosshair');
// Adding Maps
var palette_ndvi = "61150D,6A2515,74361D,7E4625,87572D,916835,9B783D,A58945,AE9A4D,B8AA55,C2BB5D,CCCC66,BABF5E,A9B356,98A74E,879A46,768E3E,658237,54762F,436927,325D1F,215117,104510"; //From ESRI
// Display RGB 10cm
Map.addLayer(rgb_10cm_SRER_2017,{},'CameraRGB_10cm',true)
// Display NDVI from Hyperspectral 1m
Map.addLayer(ndvi, {min:0, max:0.8, palette:palette_ndvi}, 'NDVI_1m_HS',false)
// Display false-color NIR from Hyperspectral 1m
Map.addLayer(map_nirfc.visualize({min: [0, 0, 0], max: [0.3, 0.2, 0.2], gamma:1.6}),{},'FalseColor-NIR_1m_HS',false)
// Display natural-color RGB from Hyperspectral 1m
Map.addLayer(map_rgb, {bands: naturalColor, min:0, max:0.3, gamma:1.6},'NaturalColor-RGB_1m_HS',false);
// Add SRER Boundary
Map.addLayer(srer.style({
                    color: "FFFF00",  // Line color
                    width: 3,
                    fillColor: "FFFF0000"}),{},'SRER')
Map.addLayer(ws.style({
                    color: "FF0000",  // Line color
                    width: 3,
                    fillColor: "FFFF0000"}),{},'Watersheds_pts')
Map.addLayer(ws_polys.style({
                    color: "FF0000",  // Line color
                    width: 3,
                    fillColor: "FFFF0000"}),{},'Watersheds_polys')
// Enable the left panel
ui.root.insert(0, panel);