var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    bounds = ui.import && ui.import("bounds", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.26778492894071,
                31.216976202347443
              ],
              [
                34.319232058913734,
                31.251127486206222
              ],
              [
                34.34282722959846,
                31.27234046258199
              ],
              [
                34.371583849094904,
                31.29296124975862
              ],
              [
                34.37530694858764,
                31.305950415351642
              ],
              [
                34.373965361522885,
                31.31593332674501
              ],
              [
                34.370478452097366,
                31.35143213641185
              ],
              [
                34.366624659246845,
                31.36058215831259
              ],
              [
                34.369980603538025,
                31.36680049286326
              ],
              [
                34.388371473882636,
                31.39184121190225
              ],
              [
                34.46098827863199,
                31.454726071617912
              ],
              [
                34.46602482971126,
                31.461240352983804
              ],
              [
                34.4735513545368,
                31.467900753727257
              ],
              [
                34.48438469213536,
                31.47964821295247
              ],
              [
                34.511961007946965,
                31.497102210332844
              ],
              [
                34.51474799373252,
                31.500041542954204
              ],
              [
                34.5263759540738,
                31.502468192337698
              ],
              [
                34.55045007833692,
                31.51277093049075
              ],
              [
                34.56163262273835,
                31.528276968364374
              ],
              [
                34.57384807798799,
                31.539611857630497
              ],
              [
                34.55192064644957,
                31.552632271466244
              ],
              [
                34.53204663047349,
                31.568721201640706
              ],
              [
                34.492451440428866,
                31.597671393234055
              ],
              [
                34.46042340376226,
                31.55647605890126
              ],
              [
                34.42910701134611,
                31.524049324126945
              ],
              [
                34.353168066578846,
                31.44540749024361
              ],
              [
                34.2177244371329,
                31.320527704161787
              ],
              [
                34.2261168315426,
                31.30968185945279
              ],
              [
                34.25623043723361,
                31.248802657593814
              ]
            ]
          ],
          "geodesic": true,
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
        [[[34.26778492894071, 31.216976202347443],
          [34.319232058913734, 31.251127486206222],
          [34.34282722959846, 31.27234046258199],
          [34.371583849094904, 31.29296124975862],
          [34.37530694858764, 31.305950415351642],
          [34.373965361522885, 31.31593332674501],
          [34.370478452097366, 31.35143213641185],
          [34.366624659246845, 31.36058215831259],
          [34.369980603538025, 31.36680049286326],
          [34.388371473882636, 31.39184121190225],
          [34.46098827863199, 31.454726071617912],
          [34.46602482971126, 31.461240352983804],
          [34.4735513545368, 31.467900753727257],
          [34.48438469213536, 31.47964821295247],
          [34.511961007946965, 31.497102210332844],
          [34.51474799373252, 31.500041542954204],
          [34.5263759540738, 31.502468192337698],
          [34.55045007833692, 31.51277093049075],
          [34.56163262273835, 31.528276968364374],
          [34.57384807798799, 31.539611857630497],
          [34.55192064644957, 31.552632271466244],
          [34.53204663047349, 31.568721201640706],
          [34.492451440428866, 31.597671393234055],
          [34.46042340376226, 31.55647605890126],
          [34.42910701134611, 31.524049324126945],
          [34.353168066578846, 31.44540749024361],
          [34.2177244371329, 31.320527704161787],
          [34.2261168315426, 31.30968185945279],
          [34.25623043723361, 31.248802657593814]]]),
    coh_ts = ui.import && ui.import("coh_ts", "imageCollection", {
      "id": "users/coscher510/gaza_2021"
    }) || ee.ImageCollection("users/coscher510/gaza_2021"),
    vis = ui.import && ui.import("vis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -5,
        "max": 0,
        "palette": [
          "d20000",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-5,"max":0,"palette":["d20000","ffffff"]},
    control = ui.import && ui.import("control", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.09663301218698,
                31.628269876061236
              ],
              [
                34.09663301218698,
                31.04942994961596
              ],
              [
                35.079222733866665,
                31.04942994961596
              ],
              [
                35.079222733866665,
                31.628269876061236
              ]
            ]
          ],
          "geodesic": false,
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
        [[[34.09663301218698, 31.628269876061236],
          [34.09663301218698, 31.04942994961596],
          [35.079222733866665, 31.04942994961596],
          [35.079222733866665, 31.628269876061236]]], null, false),
    confirmed = ui.import && ui.import("confirmed", "table", {
      "id": "users/coscher510/Airstrikes_may27"
    }) || ee.FeatureCollection("users/coscher510/Airstrikes_may27"),
    v = ui.import && ui.import("v", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -4,
        "max": 0,
        "palette": [
          "cc0000",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-4,"max":0,"palette":["cc0000","ffffff"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            34.53521665894917,
            31.276702255363507
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Point([34.53521665894917, 31.276702255363507]),
    s2_vis = ui.import && ui.import("s2_vis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "may_10_B5",
          "may_15_B5",
          "may_20_B5"
        ],
        "min": 486.8,
        "max": 4357.2,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["may_10_B5","may_15_B5","may_20_B5"],"min":486.8,"max":4357.2,"gamma":1},
    zVis = ui.import && ui.import("zVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -10,
        "max": 0,
        "palette": [
          "ff0000",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-10,"max":0,"palette":["ff0000","ffffff"]},
    gaza_city = ui.import && ui.import("gaza_city", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.44324231972986,
                31.53293313013651
              ],
              [
                34.44324231972986,
                31.48522265048754
              ],
              [
                34.492337473538456,
                31.48522265048754
              ],
              [
                34.492337473538456,
                31.53293313013651
              ]
            ]
          ],
          "geodesic": false,
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
        [[[34.44324231972986, 31.53293313013651],
          [34.44324231972986, 31.48522265048754],
          [34.492337473538456, 31.48522265048754],
          [34.492337473538456, 31.53293313013651]]], null, false),
    s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
confirmed = confirmed.map(function(feature){return feature.buffer(40)})
// Notes from Nick
/*
Need a true positive and true negative for validation
Look at coherence between known bombing dates and dates prior
Tall buildings probably move in the wind
We are in NYC -- can compare to buildings here. What is an aspect of th ebuilt environment that is expressed in something
quantifiable to is expressed in some type of structural impact.
See if I can filter these urban signals from some type of stable baseline
Try to aggregate the data up a little higher if there is some baseline noise I can't get over. 
Make an InSAR time series for the whole data record. There is some level of background noise that we should investigate
*/
s1 = s1.filterBounds(bounds).filterDate("2020-05-01", "2021-06-03").filterMetadata("relativeOrbitNumber_start", "equals", 87);
print(s1)
// NDVI mask
var s2_may10 = s2.filterBounds(bounds).filterDate('2021-05-10', '2021-05-11').first()
s2_may10 = s2_may10.addBands(s2_may10.normalizedDifference(['B8', 'B4']));
var ndvi_median = s2_may10.select(['nd']).reduceNeighborhood(ee.Reducer.median(), ee.Kernel.square(4)).lt(0.1)
//Map.addLayer(ndvi_median);
var start2021 = '2021-04-01';
var stop2021 = '2021-05-06';
var start2020 = '2021-03-01';
var stop2020 = '2021-05-06';
var startFull = '2020-05-01';
var stopFull= '2021-05-06';
var threshold = -5;
var addTimes = function(im){
  var start = ee.Date.parse("yyyyMMdd'T'HHmmss", ee.String(im.get('system:index')).split('_').get(0))
  var stop = ee.Date.parse("yyyyMMdd'T'HHmmss", ee.String(im.get('system:index')).split('_').get(1))
  return im.set({'system:time_start': start, 'system:time_stop': stop})
};
coh_ts = coh_ts.map(addTimes);
var stdDev_2021 = coh_ts.filterDate(start2021, stop2021).reduce(ee.Reducer.stdDev());
var mean_2021 = coh_ts.filterDate(start2021, stop2021).mean();
var stdDev_2020 = coh_ts.filterDate(start2020, stop2020).reduce(ee.Reducer.stdDev());
var mean_2020 = coh_ts.filterDate(start2020, stop2020).mean();
var stdDev_full = coh_ts.filterDate(startFull, stopFull).reduce(ee.Reducer.stdDev());
var mean_full = coh_ts.filterDate(startFull, stopFull).mean();
var pre_stdDev = coh_ts.filterDate("2021-03-01", "2021-05-06").reduce(ee.Reducer.stdDev());
var pre_mean = coh_ts.filterDate("2021-03-01", "2021-05-06").mean();
var mask = stdDev_full.lt(0.1);
var calcZ = function(image){
  image = ee.Image(image)
  var z = image.subtract(mean_full).divide(stdDev_full)
  return z
};
var calcNormDif = function(image){
  image = ee.Image(image).addBands([pre_mean]).rename(['t1', 'mean']);
  var nd = image.normalizedDifference(['mean', 't1'])
  return nd
};
var postImages = coh_ts.filterDate('2021-05-07', '2021-05-30');
print(postImages)
postImages = postImages.toList(postImages.size());
print('images acquired during and after airstrikes: ', ee.String(postImages.size()))
var may13 = ee.Image(calcZ(postImages.get(0))).clip(bounds)//.updateMask(ndvi_median)
var may19 = ee.Image(calcZ(postImages.get(1))).clip(bounds)//.updateMask(ndvi_median)
var may25 = ee.Image(calcZ(postImages.get(2))).clip(bounds)//.updateMask(ndvi_median)
var may2020 = ee.Image(calcZ(coh_ts.filterDate("2020-05-01", "2020-05-31").min()))//.updateMask(mask)
var min = ee.ImageCollection([may13, may19, may25]).min().lt(threshold);
min = min.updateMask(mask).clip(bounds);
var vectors = min.sample({
  region: bounds,
  geometries: true,
  scale: 40
});
//Map.addLayer(vectors)
var hist_wapo = ui.Chart.image.histogram({image: min, region: confirmed, scale: 40});
hist_wapo.setOptions({title: 'minimum z-score over WaPo points (May 07 - May 25)'})
var hist_full = ui.Chart.image.histogram({image: min, region: bounds, scale: 40});
hist_full.setOptions({title: 'histogram of z score in gaza'})
//print(hist_wapo)
//print(hist_full)
/*
Map.addLayer(may13, v, 'may 13')
Map.addLayer(may19, v, 'may 19')
Map.addLayer(may25, v, 'may 25')
Map.addLayer(min, v, 'min')
Map.addLayer(confirmed, {'color': 'blue'})
Map.addLayer(stdDev_2020, {}, "2020 stdDev");
Map.addLayer(stdDev_2021, {}, "2021 stdDev");
Map.addLayer(stdDev_full, {}, "full stdDev");
*/
var total_im = may13.addBands(may19).addBands(may25).rename(['may13', 'may19', 'may25']).updateMask(mask);
//print(total_im)
var hist_min2021 = ui.Chart.image.histogram({image: min.updateMask(mask), region: bounds, scale: 40})
var hist_mean2020 = ui.Chart.image.histogram({image: may2020.updateMask(mask), region: bounds, scale: 40})
var hist_may25 = ui.Chart.image.histogram({image: may25, region: bounds, scale: 40})
//print(hist_min2021.setOptions({title: 'minimum z score may 2021'}));
//print(hist_mean2020.setOptions({title: 'mean z score may 2020'}));
//print("may 25 histogram", hist_may25);
//Map.addLayer(stdDev, {}, 'stdDev')
//Map.addLayer(may13, vis, 'may13')
//Map.addLayer(may19, vis, 'may19')
// Set threshold for decrease in normalized difference of coherence
// z score image
var may13_decrease = may13.lt(threshold);
var may19_decrease = may19.lt(threshold);
var may25_decrease = may25.lt(threshold);
may13_decrease = may13_decrease.updateMask(may13_decrease.neq(0))
may19_decrease = may19_decrease.updateMask(may19_decrease.neq(0))
may25_decrease = may25_decrease.updateMask(may25_decrease.neq(0))
// Make a connected components image
var con_may13 = may13_decrease.connectedComponents(ee.Kernel.square(1), 100);
var con_may19 = may19_decrease.connectedComponents(ee.Kernel.square(1), 100);
var con_may25 = may25_decrease.connectedComponents(ee.Kernel.square(1), 100);
// Reduce the conected components image to vectors
var v_may13 = con_may13.reduceToVectors({scale: 40, geometry: control, reducer: ee.Reducer.count()})
              //.filterMetadata('count', 'greater_than', 1);
var v_may19 = con_may19.reduceToVectors({scale: 40, geometry: control, reducer: ee.Reducer.count()})
              //.filterMetadata('count', 'greater_than', 1);
var v_may25 = con_may25.reduceToVectors({scale: 40, geometry: control, reducer: ee.Reducer.count()})
              //.filterMetadata('count', 'greater_than', 1);
var outlineCol = v_may13.merge(v_may19).merge(v_may25);
print('number of PAAs', outlineCol.size());
print('wapo points in -5 stddev outlines', confirmed.filterBounds(outlineCol))
Export.table.toDrive(outlineCol)
s2 = s2.filterBounds(bounds).filterDate("2021-05-10", "2021-05-25");
s2 = s2.toList(s2.size()); 
print(s2)
var may_10_s2 = ee.Image(s2.get(0)).select(['B5'])
var may_15_s2 = ee.Image(s2.get(2)).select(['B5'])
var may_20_s2 = ee.Image(s2.get(4)).select(['B5'])
Map.addLayer(may_10_s2.addBands(may_15_s2).addBands(may_20_s2)
              .rename(['may_10_B5', 'may_15_B5', 'may_20_B5']),
              s2_vis, "False-color basemap (Sentinel-2)")
Map.addLayer(v_may13, {'color':'yellow', 'opacity': 0.6}, "Potentially affected areas (May 13)");
Map.addLayer(v_may19, {'color':'orange', 'opacity': 0.6}, "Potentially affected areas (May 19)");
Map.addLayer(v_may25, {'color':'red', 'opacity': 0.6}, "Potentially affected areas (May 25)");
//Map.addLayer(min.updateMask(mask), zVis, "min may 2021")
//Map.addLayer(may2020.updateMask(mask), zVis, "may 2020")
//Map.addLayer(confirmed, {'color': 'blue'}, 'wapo')
Map.centerObject(bounds, 11)
var panel = ui.Panel();
panel.style().set('width', '400px');
//Add a per pixel time series inspector ------------------------------------------------------------------
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Gaza Bombing Map Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('This map shows sites of potential damage following Israeli airstrikes in Gaza in May of 2021. Regions were automatically detected using time series analysis of 64 multi-temporal Sentinel-1 SAR coherence images produced from repeat-pass interferometry.'),
  ui.Label('These methods mirror operational techniques to map structural damage following earthquakes. Similar techniques have been applied to map building destruction as a result of military airstrike campaigns elsewhere in the past.'),
  ui.Label({
    value: 'Links',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label("Data sourced from the Sentinel-1 constellation").setUrl('https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1'),
  ui.Label("Methodological basis").setUrl("https://www.mdpi.com/2072-4292/10/8/1272/htm#versions-div"),
  ui.Label('Application to post-war urban damage mapping').setUrl('https://www.mdpi.com/2220-9964/10/3/140'),
  ui.Label({
    value: "All data are preliminary and this remains a work in progress as of June 4, 2021. Please send questions or comments to: ",
    style: {fontSize: '15px', fontWeight: 'bold'}}),
  ui.Label("Corey Scher @borderwater").setUrl('https://twitter.com/borderwater'),
]);
panel.widgets().set(0,intro);
// Set visualization parameters for the total damage layer
var VisJ = {forceRgbOutput: true, max: 0, opacity: 0.8, palette: ['000000']};
// Add the panel to the ui.root.
ui.root.insert(0, panel);