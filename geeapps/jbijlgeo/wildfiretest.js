var LANDSAT_8 = ui.import && ui.import("LANDSAT_8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    Area = ui.import && ui.import("Area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -120.437330078125,
                38.108224436363194
              ],
              [
                -120.437330078125,
                37.74968134878902
              ],
              [
                -119.58726293945313,
                37.74968134878902
              ],
              [
                -119.58726293945313,
                38.108224436363194
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-120.437330078125, 38.108224436363194],
          [-120.437330078125, 37.74968134878902],
          [-119.58726293945313, 37.74968134878902],
          [-119.58726293945313, 38.108224436363194]]], null, false),
    Burned = ui.import && ui.import("Burned", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -119.9256135046831,
                37.83209719028377
              ],
              [
                -119.9256135046831,
                37.81962276342902
              ],
              [
                -119.9091340124956,
                37.81962276342902
              ],
              [
                -119.9091340124956,
                37.83209719028377
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-119.9256135046831, 37.83209719028377],
          [-119.9256135046831, 37.81962276342902],
          [-119.9091340124956, 37.81962276342902],
          [-119.9091340124956, 37.83209719028377]]], null, false),
    Burned2 = ui.import && ui.import("Burned2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -119.92234594726563,
                37.91481748755827
              ],
              [
                -119.92234594726563,
                37.897480663027046
              ],
              [
                -119.90586645507813,
                37.897480663027046
              ],
              [
                -119.90586645507813,
                37.91481748755827
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-119.92234594726563, 37.91481748755827],
          [-119.92234594726563, 37.897480663027046],
          [-119.90586645507813, 37.897480663027046],
          [-119.90586645507813, 37.91481748755827]]], null, false),
    NotBurned = ui.import && ui.import("NotBurned", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -120.0629426062456,
                37.78381487626427
              ],
              [
                -120.0629426062456,
                37.770789522708576
              ],
              [
                -120.04577646855029,
                37.770789522708576
              ],
              [
                -120.04577646855029,
                37.78381487626427
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-120.0629426062456, 37.78381487626427],
          [-120.0629426062456, 37.770789522708576],
          [-120.04577646855029, 37.770789522708576],
          [-120.04577646855029, 37.78381487626427]]], null, false),
    VP_LS = ui.import && ui.import("VP_LS", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Red",
          "Green",
          "Blue"
        ],
        "min": 6000,
        "max": 20000,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["Red","Green","Blue"],"min":6000,"max":20000,"gamma":1};
var dataset_MODIS_Burned = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date('2013-08-01', '2013-10-30'));
var burnedArea = dataset_MODIS_Burned.select('BurnDate');
var burnedAreaVis = {
  min: 30.0,
  max: 341.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
var NBR_VIS = {
  min: -1,
  max: 1,
  //palette: ["red","orange","yellow","green","darkgreen"],
};
Map.setCenter(-119.899, 37.859, 10);
Map.addLayer(burnedArea, burnedAreaVis, 'Burned Area');
var dataset_Landsat8 = LANDSAT_8
print(dataset_Landsat8.first())
function renameOLI(img) {
  return img.select(
		['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'QA_PIXEL'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
	);
}
function calcNBR(img) {
  var NBR = img.normalizedDifference(['NIR','SWIR1']).rename('NBR');
  return NBR.toDouble();
}
function calcNDVI(img) {
  var NDVI = img.normalizedDifference(['NIR','Red']).rename('NDVI');
  return NDVI.toDouble();
}
function calcEVI(img) {
  var EVI = img.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': img.select('NIR'),
      'RED': img.select('Red'),
      'BLUE': img.select('Blue')
      });
  return EVI;
}
function fmask(img) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = img.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask);
}
// Define a collection filter.
var colFilter = ee.Filter.and(
  ee.Filter.bounds(Area),
  ee.Filter.calendarRange(2013,2021,'year'),
  ee.Filter.lt('CLOUD_COVER', 20),
  ee.Filter.lt('GEOMETRIC_RMSE_MODEL', 10),
  ee.Filter.or(
    ee.Filter.gt('IMAGE_QUALITY', 5),
    ee.Filter.gt('IMAGE_QUALITY_OLI', 5)
  )
);
// Define function to prepare OLI images.
function prepOLI(img) {
  var orig = img;
  img = renameOLI(img);
  img = fmask(img);
  // indices
  var NDVI = calcNDVI(img);
  var NBR = calcNBR(img);
  var EVI = calcEVI(img);
  return img
    .addBands(ee.Image(NDVI).rename('NDVI'))
    .addBands(ee.Image(NBR).rename('NBR'))
    .addBands(ee.Image(EVI).rename('EVI'))
    ;
}
var oliCol = dataset_Landsat8.filter(colFilter).map(prepOLI); 
print(oliCol.first(),'olicolfirst')
var prefire_img = oliCol.filterDate('2013-07-01','2013-08-01').mosaic();
var postfire_img = oliCol.filterDate('2013-10-01','2013-11-01').mosaic();
var postfire_1yr =  oliCol.filterDate('2014-07-01','2014-11-01').mosaic();
var postfire_2yr =  oliCol.filterDate('2015-07-01','2015-11-01').mosaic();
var postfire_3yr =  oliCol.filterDate('2016-07-01','2016-11-01').mosaic();
var postfire_4yr =  oliCol.filterDate('2017-07-01','2017-11-01').mosaic();
var postfire_7yr =  oliCol.filterDate('2020-07-01','2020-11-01').mosaic();
Map.addLayer(prefire_img,VP_LS,'prefire',false)
Map.addLayer(postfire_img,VP_LS,'postfire',false)
Map.addLayer(postfire_1yr,VP_LS,'postfire 1 year',false)
Map.addLayer(postfire_2yr,VP_LS,'postfire 2 year',false)
Map.addLayer(postfire_3yr,VP_LS,'postfire 3 year',false)
Map.addLayer(postfire_4yr,VP_LS,'postfire 4 year',false)
Map.addLayer(postfire_7yr,VP_LS,'postfire 7 year',false)
var NBR_0yr = postfire_img.select('NBR').subtract(prefire_img.select('NBR'))
var NBR_1yr = postfire_1yr.select('NBR').subtract(prefire_img.select('NBR'))
var NBR_2yr = postfire_2yr.select('NBR').subtract(prefire_img.select('NBR'))
var NBR_3yr = postfire_3yr.select('NBR').subtract(prefire_img.select('NBR'))
var NBR_4yr = postfire_4yr.select('NBR').subtract(prefire_img.select('NBR'))
var NBR_7yr = postfire_7yr.select('NBR').subtract(prefire_img.select('NBR'))
Map.addLayer(NBR_0yr,NBR_VIS,'NBR - t = 0')
Map.addLayer(NBR_1yr,NBR_VIS,'NBR - t = 1')
Map.addLayer(NBR_2yr,NBR_VIS,'NBR - t = 2')
Map.addLayer(NBR_3yr,NBR_VIS,'NBR - t = 3')
Map.addLayer(NBR_4yr,NBR_VIS,'NBR - t = 4')
Map.addLayer(NBR_7yr,NBR_VIS,'NBR - t = 7')
/*
var postfire_nbr = 
var prefire_nbr = 
var postfire_img_1year_nbr = 
var dnbr_0years = 
var dnbr_1years = 
*/
var COLOR = {
  Burned: 'ff0000',
  NotBurned: '0000ff',
  Burned2: '00ff00'
};
// Plot a time series of a band's value in regions of the American West.
var COLOR = {
  Burned: 'ff0000',
  Burned2: '0000ff',
  NotBurned: '00ff00'
};
var Burned = ee.Feature(Burned, {label: 'Burned'});
var Burned2 = ee.Feature(Burned2, {label: 'Burned2'});
var NotBurned = ee.Feature(NotBurned, {label: 'NotBurned'});
var areas = new ee.FeatureCollection([Burned, Burned2, NotBurned]);
// Get brightness temperature data for 1 year.
var NBRTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: oliCol,
  regions: areas,
  reducer: ee.Reducer.mean(),
  band: 'NBR',
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
NBRTimeSeries.setChartType('ScatterChart');
NBRTimeSeries.setOptions({
  title: 'NBR over time in regions of the American West',
  vAxis: {
    title: 'NBR (Normalized Burned Ratio)'
  },
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: COLOR.Burned},
    1: {color: COLOR.Burned2},
    2: {color: COLOR.NotBurned}
  }
});
print(NBRTimeSeries);
Map.addLayer(oliCol.select('Red','Green','Blue'),VP_LS,'Landsat, .. True Color',false);
Map.addLayer(oliCol.select('NBR').first(),{},'Landsat, NBR',false)
//Map.addLayer(Burned, {color: COLOR.Burned},,'burned',false);
//Map.addLayer(Burned2, {color: COLOR.Burned2},'burned',false);
//Map.addLayer(NotBurned, {color: COLOR.NotBurned},'NotBurned',false);
var COLOR = {
  Burned: 'ff0000',
  NotBurned: '0000ff',
  Burned2: '00ff00'
};
// Get brightness temperature data for 1 year.
var EVITimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: oliCol,
  regions: areas,
  reducer: ee.Reducer.mean(),
  band: 'NDVI',
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
EVITimeSeries.setChartType('ScatterChart');
EVITimeSeries.setOptions({
  title: 'EVI over time in regions of the American West',
  vAxis: {
    title: 'EVI (Vegetation health)'
  },
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: COLOR.Burned},
    1: {color: COLOR.Burned2},
    2: {color: COLOR.NotBurned}
  }
});
print(EVITimeSeries);