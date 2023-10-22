var landsat = ui.import && ui.import("landsat", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.92000378376433,
                -8.107030579993665
              ],
              [
                112.92000378376433,
                -8.119436435996988
              ],
              [
                112.932191741528,
                -8.119436435996988
              ],
              [
                112.932191741528,
                -8.107030579993665
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[112.92000378376433, -8.107030579993665],
          [112.92000378376433, -8.119436435996988],
          [112.932191741528, -8.119436435996988],
          [112.932191741528, -8.107030579993665]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.83269243233596,
                -8.121886925005647
              ],
              [
                112.83269243233596,
                -8.191216266900723
              ],
              [
                112.9610951422969,
                -8.191216266900723
              ],
              [
                112.9610951422969,
                -8.121886925005647
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[112.83269243233596, -8.121886925005647],
          [112.83269243233596, -8.191216266900723],
          [112.9610951422969, -8.191216266900723],
          [112.9610951422969, -8.121886925005647]]], null, false),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.91603103345305,
                -8.08786770968646
              ],
              [
                112.89749160474211,
                -8.104182957800788
              ],
              [
                112.90641799634368,
                -8.124576087528057
              ],
              [
                112.93560043042571,
                -8.138170931859463
              ],
              [
                112.95654311841399,
                -8.12491596425198
              ],
              [
                112.9459001130429,
                -8.095685515205817
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[112.91603103345305, -8.08786770968646],
          [112.89749160474211, -8.104182957800788],
          [112.90641799634368, -8.124576087528057],
          [112.93560043042571, -8.138170931859463],
          [112.95654311841399, -8.12491596425198],
          [112.9459001130429, -8.095685515205817]]]),
    geometry22 = ui.import && ui.import("geometry22", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.90246978467376,
                -8.11577595610404
              ],
              [
                112.90864959424407,
                -8.11101754750668
              ],
              [
                112.91620269483,
                -8.117645315493753
              ],
              [
                112.92066589063079,
                -8.117135491068316
              ],
              [
                112.9213525361386,
                -8.12070424845674
              ],
              [
                112.91345611279876,
                -8.127671730980286
              ],
              [
                112.93354049390227,
                -8.137358030006308
              ],
              [
                112.95276656812102,
                -8.116795607758572
              ],
              [
                112.9462434357968,
                -8.095722281427651
              ],
              [
                112.91534438794524,
                -8.08739461451934
              ],
              [
                112.89697662061126,
                -8.104049776168225
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[112.90246978467376, -8.11577595610404],
          [112.90864959424407, -8.11101754750668],
          [112.91620269483, -8.117645315493753],
          [112.92066589063079, -8.117135491068316],
          [112.9213525361386, -8.12070424845674],
          [112.91345611279876, -8.127671730980286],
          [112.93354049390227, -8.137358030006308],
          [112.95276656812102, -8.116795607758572],
          [112.9462434357968, -8.095722281427651],
          [112.91534438794524, -8.08739461451934],
          [112.89697662061126, -8.104049776168225]]]),
    geometry4 = ui.import && ui.import("geometry4", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            112.92457845983736,
            -8.113058493719064
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([112.92457845983736, -8.113058493719064]),
    geometry5 = ui.import && ui.import("geometry5", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.92032256787688,
                -8.106149611049482
              ],
              [
                112.92203918164641,
                -8.116686139089337
              ],
              [
                112.92907729810149,
                -8.116006371421957
              ],
              [
                112.92701736157805,
                -8.105129932393542
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[112.92032256787688, -8.106149611049482],
          [112.92203918164641, -8.116686139089337],
          [112.92907729810149, -8.116006371421957],
          [112.92701736157805, -8.105129932393542]]]),
    geometry6 = ui.import && ui.import("geometry6", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.81172338038171,
                -8.325072724560021
              ],
              [
                113.62202623994114,
                -8.502546387007333
              ],
              [
                113.71815661103489,
                -8.045925029917901
              ],
              [
                112.86393153998489,
                -7.84740690808661
              ],
              [
                112.21302965790989,
                -7.743944469858597
              ],
              [
                112.10865954072239,
                -8.168285998579824
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[112.81172338038171, -8.325072724560021],
          [113.62202623994114, -8.502546387007333],
          [113.71815661103489, -8.045925029917901],
          [112.86393153998489, -7.84740690808661],
          [112.21302965790989, -7.743944469858597],
          [112.10865954072239, -8.168285998579824]]]),
    landsat2 = ui.import && ui.import("landsat2", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    geometry7 = ui.import && ui.import("geometry7", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.91740432446868,
                -8.102732683877148
              ],
              [
                112.91740432446868,
                -8.122870978540398
              ],
              [
                112.93877616589934,
                -8.122870978540398
              ],
              [
                112.93877616589934,
                -8.102732683877148
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
        [[[112.91740432446868, -8.102732683877148],
          [112.91740432446868, -8.122870978540398],
          [112.93877616589934, -8.122870978540398],
          [112.93877616589934, -8.102732683877148]]], null, false),
    geometry8 = ui.import && ui.import("geometry8", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.92000378376433,
                -8.107030579993665
              ],
              [
                112.92000378376433,
                -8.119436435996988
              ],
              [
                112.932191741528,
                -8.119436435996988
              ],
              [
                112.932191741528,
                -8.107030579993665
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[112.92000378376433, -8.107030579993665],
          [112.92000378376433, -8.119436435996988],
          [112.932191741528, -8.119436435996988],
          [112.932191741528, -8.107030579993665]]], null, false);
//date lists : 
//2021-09-20 good (true negative)
//2021-10-06
//2021-10-22 good (true negative)
//2021-11-7
//2021-11-23 
//2021-12-9 good (best true positive)
//2021-12-25 bad
//2021-09-20 good
//2021-08-19
//2022-01-26 bad
//2022-02-27 bad
//2022-03-15 bad
//2022-03-31 bad
//2022-05-18 good positive
//2022-05-10 good positive
//2022-05-02 good
//2022-04-24 good
//2022-03-31 good
var start = ("2021-10-07");
var end = ("2022-09-30");
var image2 = ee.Image(landsat
.filterDate(start, end)
.filterBounds(geometry2)
//.sort("CLOUD_COVER")
.select(["B2", "B3", "B4", "B6","B10"])
.first()
);
var reflectance = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
//.select(["ST_URAD", "ST_EMIS", "ST_ATRAN"])
.filterDate(start, end)
.filterBounds(geometry2);
var radiance = ee.ImageCollection("LANDSAT/LC08/C02/T1")
.filterDate(start, end)
.filterBounds(geometry2);
//.select(["B6", "B10"])
//.first()
var image = radiance.combine(reflectance, false);
var date = ee.Date(image.first().get('DATE_PRODUCT_GENERATED'));
print('radiance date', date);
var ref_date = ee.Date(reflectance.first().get('DATE_PRODUCT_GENERATED'));
print('reflectance date', ref_date);
//RGB VISUALIZATION
var R = image2.select(["B4"]).multiply(ee.Number(image2.get("RADIANCE_MULT_BAND_4"))).add(ee.Number(image2.get("RADIANCE_ADD_BAND_4")));
var G = image2.select(["B3"]).multiply(ee.Number(image2.get("RADIANCE_MULT_BAND_3"))).add(ee.Number(image2.get("RADIANCE_ADD_BAND_3")));
var B = image2.select(["B2"]).multiply(ee.Number(image2.get("RADIANCE_MULT_BAND_2"))).add(ee.Number(image2.get("RADIANCE_ADD_BAND_2")));
var SWIR = image2.select(["B6"]).multiply(ee.Number(image2.get("RADIANCE_MULT_BAND_6"))).add(ee.Number(image2.get("RADIANCE_ADD_BAND_6"))).divide(0.7*0.63);
var TIR = image2.select(["B10"]).multiply(ee.Number(image2.get("RADIANCE_MULT_BAND_10"))).add(ee.Number(image2.get("RADIANCE_ADD_BAND_10"))).divide(0.7*0.63);
var R = R.addBands(G);
var RGB = R.addBands(B);
var RGBS = RGB.addBands(SWIR);
var RGBST = RGBS.addBands(TIR);
print("RGB' : ",RGBST);
var TEIPLOT = function(image) {
  var URAD = image.select(["ST_URAD"]).multiply(0.001);
  var emissivity = image.select(["ST_EMIS"]).multiply(0.0001);
  var transmissivity = image.select(["ST_ATRAN"]).multiply(0.0001);
  var reflected = image.select(["SR_B6"]); 
  var divider = emissivity.multiply(transmissivity);
  var B6M = ee.Number(image.get("RADIANCE_MULT_BAND_6"));
  var B10M = ee.Number(image.get("RADIANCE_MULT_BAND_10"));
  var B6A = ee.Number(image.get("RADIANCE_ADD_BAND_6"));
  var B10A = ee.Number(image.get("RADIANCE_ADD_BAND_10"));
  //Konversi DN ke radiance
  var B6 = image.select(["B6"]).multiply(B6M).add(B6A);
  var B10 = image.select(["B10"]).multiply(B10M).add(B10A);
 //GEOMETRY6
  var B6C = B6.divide(divider).rename('B6C');
  var B10C = B10.subtract(URAD).divide(divider).rename('B10C');
  var maxReducer = ee.Reducer.max();
  var maxswir = B6.reduceRegion(maxReducer, geometry6);
  var TEI = image.expression(
  '((SWIR - (TIR**2) / (10 * maxSWIR)) / (SWIR + (TIR**2) / (10 * maxSWIR))) * ((TIR**2)/((maxSWIR/3)**2)) ',
  {
    'SWIR': B6C.clip(geometry7), //B6C, //Band 6
    'maxSWIR' : ee.Number(maxswir.get("B6")),
    'TIR': B10C.clip(geometry7)//B10C //Band 7
  }).rename('TEI');
  var myimage1 = B6C.addBands(B10C);
  var myimage2 = myimage1.addBands(TEI);
  return image.addBands(myimage2);
};
var data = image;
var TEI = data.map(TEIPLOT);
//print('TEI', TEI);
var singleBandVis = {
  min: 0,
  max: 1,
  palette: ['blue', 'yellow', 'orange','red']
};
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min : 5000,
  max : 12000,
  gamma: 1
};
var chartStyle = {
  title: 'TEI Pixel Detected',
  hAxis: {
    title: 'Date',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    title: 'Pixel Counted',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  series: {
    0: {lineWidth: 3, color: 'E37D05', pointSize: 7},
    1: {lineWidth: 7, color: '1D6B99', lineDashStyle: [4, 4]}
  },
  chartArea: {backgroundColor: 'EBEBEB'}
};
//print(TEI);
print(ui.Chart.image.series(TEI.select('TEI'), geometry4));
Map.setCenter(112.92118087476165, -8.109997881192907, 14);
var eruption = ee.Image(TEI.select(['TEI']).filterDate("2021-12-08", "2021-12-10").first());
//Count pixel within range value 
var pixelcount = function(image) {
  var count = image.select(['TEI']).gt(0.2).selfMask().reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry8,
  //crs: projection.crs,
  maxPixels:1e9,
  scale: 30,
  }).values().get(0);
  return image.set('pixel_count', count); 
};
var teipixel = TEI.select(['TEI']);
var pixelplot = teipixel.map(pixelcount);
var pixellist = ee.List(pixelplot.aggregate_array('pixel_count'));
var datelist = pixelplot.aggregate_array('DATE_ACQUIRED');
print('pixel : ', pixellist);
print('TEI', TEI);
print('Date : ', datelist);
var chart = ui.Chart.array.values(pixellist, 0, datelist);
var chartPanel = ui.Panel(chart);
chartPanel.style().set({
  width: '500px',
  position: 'bottom-left'
});
chart.setOptions(chartStyle);
Map.add(chartPanel);
//Map.addLayer(count);
//Map.addLayer(RGBST, visParams);
//Map.addLayer(reflectance.select('ST_ATRAN').first());
//Map.addLayer(image2.clip(geometry2), visParams);
Map.addLayer(eruption.select('TEI').clip(geometry8), singleBandVis);
// export image
var projection = eruption.select('TEI').projection().getInfo();
print(projection);