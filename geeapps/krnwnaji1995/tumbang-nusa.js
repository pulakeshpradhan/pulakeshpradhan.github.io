var table = ui.import && ui.import("table", "table", {
      "id": "users/krnwnaji1995/AOI_Target_PL"
    }) || ee.FeatureCollection("users/krnwnaji1995/AOI_Target_PL"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS"),
    KHDTK_Tumbang_Nusa = ui.import && ui.import("KHDTK_Tumbang_Nusa", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                114.00281780691927,
                -2.3463919715536297
              ],
              [
                114.09620159598177,
                -2.473309021663233
              ],
              [
                114.17722576590364,
                -2.4527286869071663
              ],
              [
                114.10444134207552,
                -2.3607993630998423
              ],
              [
                114.02959698172396,
                -2.2942497013515983
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Feature",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Feature(
        ee.Geometry.Polygon(
            [[[114.00281780691927, -2.3463919715536297],
              [114.09620159598177, -2.473309021663233],
              [114.17722576590364, -2.4527286869071663],
              [114.10444134207552, -2.3607993630998423],
              [114.02959698172396, -2.2942497013515983]]]),
        {
          "system:index": "0"
        }),
    Lokasi_Terbakar = ui.import && ui.import("Lokasi_Terbakar", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            113.82847865292388,
            -2.368873162323681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.1924007720645,
            -2.289288089633419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.307757217377,
            -2.3935710553656477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            113.96615469223698,
            -2.7212829172956603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.10073721176823,
            -2.386533212343586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            113.80127986133955,
            -2.219127072756204
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffec08",
      "mode": "Feature",
      "shown": true,
      "locked": false
    }) || /* color: #ffec08 */ee.Feature(
        ee.Geometry.MultiPoint(
            [[113.82847865292388, -2.368873162323681],
             [114.1924007720645, -2.289288089633419],
             [114.307757217377, -2.3935710553656477],
             [113.96615469223698, -2.7212829172956603],
             [114.10073721176823, -2.386533212343586],
             [113.80127986133955, -2.219127072756204]]),
        {
          "system:index": "0"
        });
//aoi SM Sugihan
var table = ee.FeatureCollection("users/krnwnaji1995/AOI_Target_PL");
var aoi = table.filter(ee.Filter.eq('Keterangan','Tumbang Nusa'))
// function luas(a){
//   return a/10000
// }
var areas = KHDTK_Tumbang_Nusa.area();
print ('luas',areas);
// This example demonstrates the use of the Landsat 4, 5, 7 Collection 2,
// Level 2 QA_PIXEL band (CFMask) to mask unwanted pixels.
function maskL457sr(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Unused
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBand, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
// Image L2 untuk pasu tahun 1977
var l2 = ee.ImageCollection('LANDSAT/LM02/C02/T2')
    .filterDate('1975-01-01', '1982-12-31')
    .filterBounds(aoi)
    .sort('CLOUD_COVER',true);
//.filterMetadata("CLOUD_COVER","greater_than",10);
//firms hotspot
var dataset = firms.filter(
    ee.Filter.date('2015-01-01', '2015-12-30'));
var fires = dataset.select('T21').sum().clip(aoi);
var firesVis = {
  min: 325,
  max: 6000,
  palette: ['red', 'orange', 'yellow'],
};
// var medianFirms = dataset.median()
// image L5
var l5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
    .filterDate('1984-06-01', '2012-01-01')
    .filterBounds(aoi)
    .map(maskL457sr)
    .map(function(a){
      return a.set('year',ee.Image(a).date().get('year'))
    });
// image l7    
var l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2")
    .filterDate('2015-01-01', '2022-09-01')
    .filterBounds(aoi)
    .map(maskL457sr)
    .map(function(a){
      return a.set('year',ee.Image(a).date().get('year'))
    });
print(l7);
var list = ee.List([])
for (var a = 1984;a <= 2022;a++){
  if(a < 2012){
    var filL5 = l5.filterMetadata('year','equals',a).median();
    var finalL5 = filL5.set('year',a)
                      .set('product','L05')
    list = list.add(finalL5)
  } else {
    var filL7 = l7.filterMetadata('year','equals',a).median();
    var finalL7 = filL7.set('year',a)
                      .set('product','L07')
    list = list.add(finalL7)
  }
}
// creating a list
var finalCol = ee.ImageCollection(list)
              .map(function(a){
                return a.set('bands',ee.Image(a).bandNames().length())
              })
              .filterMetadata('bands','greater_than',0);
print('final',finalCol);
var imageVisParam2 = {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],"min":0.010668699999999991,"max":0.43132630000000005,"gamma":1};
// display 1977
// var l2NIR = l2.select('B6','B5','B4')
// var smL21977 = l2NIR.min().clip(aoi);
// Map.addLayer(smL21977,{},'Tahun 1977',false)
// for adding historical data
// for (var a = 1984;a <= 2022;a++){
//   Map.addLayer(finalCol.filterMetadata('year','equals',a)
//                       .median()
//                       .clip(aoi)
//                       ,imageVisParam2,'Tahun '+a,false)
// }
Map.addLayer(finalCol.filterMetadata('year','equals',2015)
                      .median()
                      .clip(aoi)
                      ,imageVisParam2,'Tahun 2015',false)
Map.addLayer(finalCol.filterMetadata('year','equals',2016)
                      .median()
                      .clip(aoi)
                      ,imageVisParam2,'Tahun 2016',true)
Map.addLayer(finalCol.filterMetadata('year','equals',2021)
                      .median()
                      .clip(aoi)
                      ,imageVisParam2,'Tahun 2021',false)                      
// export each images also converting from imageCollection to image
for (var a = 1984;a <= 2022;a++){
  Export.image.toDrive({
    image : finalCol.filterMetadata('year','equals',a)
                    .select("SR_B5","SR_B4","SR_B3")
                    .median()
                    .clip(aoi),
    fileNamePrefix : 'Kalteng_'+a,
    description : 'Kalteng_'+a,
    folder : 'GEE/COBA',
    maxPixels: 100000000,
    scale : 100
  })
}
Map.addLayer(fires,firesVis,'hotspot tahun 2015')
// Map.addLayer(aoi,{},'batas kajian',false);
Map.centerObject(aoi,8)