var chePora = ui.import && ui.import("chePora", "table", {
      "id": "users/reginoa579/ReginoData/LimPozoDulce"
    }) || ee.FeatureCollection("users/reginoa579/ReginoData/LimPozoDulce"),
    SIAM7725 = ui.import && ui.import("SIAM7725", "table", {
      "id": "users/reginoa579/ReginoData/7725_SIAM"
    }) || ee.FeatureCollection("users/reginoa579/ReginoData/7725_SIAM"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -59.286042056126924,
            -22.71554787681072
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-59.286042056126924, -22.71554787681072]);
Map.centerObject(geometry,15);
var landsat5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA").filterBounds(chePora);
var collection_86_87 = landsat5.filterDate('1986-10-1','1987-07-28')
                               .filter(ee.Filter.lte('CLOUD_COVER',10));
print('Colección landsat 5 1986/7',collection_86_87);
var img86a = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19861118');
var img87b = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19870716');
var collection_90 = landsat5.filterDate('1990-01-01','1990-12-31')
                            .filter(ee.Filter.lte('CLOUD_COVER',10));
print('Colección landsat 5 1990',collection_90);
var img90a = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19900403');
var img90b = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19900809');
var collection_94 = landsat5.filterDate('1994-01-01','1994-12-31')
                          .filter(ee.Filter.lte('CLOUD_COVER',10));
print('Colección landsat 5 1994',collection_94);
var img94a = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19900129');
var img94b = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_19940617');
var collection_2000 = landsat5.filterDate('2000-01-01','2000-12-31')
                              .filter(ee.Filter.lte('CLOUD_COVER',10));
print('Colección Landsat 5 2000',collection_2000);
var img00a = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_20000210');
var img00b = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_20000820');
var collection_2005 = landsat5.filterDate('2005-01-01','2005-12-31')
                              .filter(ee.Filter.lte('CLOUD_COVER',10));
print('Colección Landsat 5 2005',collection_2005);
var img05a = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_20050207');
var img05b = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_227076_20050701');
Map.addLayer(img86a,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 18/11/86',true);
Map.addLayer(img87b,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 16/07/87',true);
Map.addLayer(img90a,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 03/04/90',true);
Map.addLayer(img90b,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 09/08/90',true);
Map.addLayer(img94a,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 24/01/94',true);
Map.addLayer(img94b,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 17/06/94',true);
Map.addLayer(img00a,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 10/02/00',false);
Map.addLayer(img00b,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 20/08/00',false);
Map.addLayer(img05a,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 07/02/05',false);
Map.addLayer(img05b,{"opacity":1,"bands":["B3","B2","B1"],"min":0.053917787969112396,"max":0.16276389360427856,"gamma":1},'imagen 01/07/05',false);
var vacio = ee.Image().byte();
var PD_vacio = vacio.paint({
  featureCollection: chePora,
  color: 1,
  width: 2
});
Map.addLayer(PD_vacio,{"opacity":1,"bands":["constant"],"palette":["00ffe7"]},'Límite Pozo Dulce');
Map.addLayer(SIAM7725,{"opacity":1,"bands":["constant"],"palette":["00ffe7"]},'observaciones')