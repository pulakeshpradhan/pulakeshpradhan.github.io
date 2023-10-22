var clip = ui.import && ui.import("clip", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image"),
    geometryChina = ui.import && ui.import("geometryChina", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                109.33314574183999,
                36.10353491750952
              ],
              [
                109.33314574183999,
                33.59751326328055
              ],
              [
                117.96839964808999,
                33.59751326328055
              ],
              [
                117.96839964808999,
                36.10353491750952
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
        [[[109.33314574183999, 36.10353491750952],
          [109.33314574183999, 33.59751326328055],
          [117.96839964808999, 33.59751326328055],
          [117.96839964808999, 36.10353491750952]]], null, false),
    geometryExportNL1 = ui.import && ui.import("geometryExportNL1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                5.5975300427,
                50.717072939
              ],
              [
                6.402278619793731,
                50.71533390762023
              ],
              [
                6.394038873699981,
                51.36466780317605
              ],
              [
                5.600276624731237,
                51.36209544117896
              ],
              [
                5.5975300427,
                50.717072939
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[5.5975300427, 50.717072939],
          [6.402278619793731, 50.71533390762023],
          [6.394038873699981, 51.36466780317605],
          [5.600276624731237, 51.36209544117896],
          [5.5975300427, 50.717072939]]]),
    aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                15.083422547508727,
                54.833709642062644
              ],
              [
                12.813771142779542,
                54.679394854146935
              ],
              [
                12.930625724618036,
                55.01399317916025
              ],
              [
                4.972437338334321,
                55.59281097434796
              ],
              [
                4.705694652930591,
                54.585128479094976
              ],
              [
                2.600755835500269,
                54.39479908130383
              ],
              [
                1.2026629734857446,
                53.73944265567635
              ],
              [
                -0.7709894304450727,
                53.49622230521408
              ],
              [
                -3.7482325946430337,
                53.706577410611
              ],
              [
                -3.9585749093993843,
                52.90691407509458
              ],
              [
                -5.955285332653683,
                53.10515855604623
              ],
              [
                -7.033678125100276,
                48.61586683546483
              ],
              [
                -5.3259702602668675,
                48.43019961380409
              ],
              [
                -5.518425648513434,
                46.221658787915516
              ],
              [
                -4.659475744384283,
                46.12666829984169
              ],
              [
                -4.3649320540094845,
                45.07413223584241
              ],
              [
                -2.3794052626660203,
                45.32898831471905
              ],
              [
                -1.9373159638868205,
                43.706206089383336
              ],
              [
                0.06788153204198741,
                43.905786100638714
              ],
              [
                0.004699921711373485,
                43.25173708579592
              ],
              [
                1.9862794211070685,
                43.008171980766384
              ],
              [
                1.807888131030179,
                42.11784522721097
              ],
              [
                2.624767484274258,
                42.019450840069204
              ],
              [
                2.747576450875415,
                41.53752164066365
              ],
              [
                4.478211702488969,
                41.7738212523797
              ],
              [
                4.832675689810128,
                41.43133907177231
              ],
              [
                6.814563451557322,
                41.50114135424166
              ],
              [
                7.307809870585267,
                41.76123265762763
              ],
              [
                8.96544663650467,
                41.36450910996628
              ],
              [
                13.06617494595171,
                41.84334125473482
              ],
              [
                17.01642238002623,
                41.183098923123715
              ],
              [
                17.437620573058783,
                42.80243028327783
              ],
              [
                19.41895345077834,
                42.56429943340309
              ],
              [
                19.96624681260642,
                44.57322349051675
              ],
              [
                21.581523687785477,
                44.76305970547547
              ],
              [
                20.895357912493687,
                47.86771912508291
              ],
              [
                21.608394651995944,
                50.229659255252905
              ],
              [
                22.380544078021774,
                50.307208014800246
              ],
              [
                22.006342545782,
                51.86671255547095
              ],
              [
                20.100268279601494,
                51.944272087279224
              ],
              [
                20.574048801124242,
                53.37007158326913
              ],
              [
                19.47919630884492,
                53.74689828703972
              ],
              [
                15.322167109297062,
                53.92349631164213
              ],
              [
                15.083422547508727,
                54.833709642062644
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
        [[[15.083422547508727, 54.833709642062644],
          [12.813771142779542, 54.679394854146935],
          [12.930625724618036, 55.01399317916025],
          [4.972437338334321, 55.59281097434796],
          [4.705694652930591, 54.585128479094976],
          [2.600755835500269, 54.39479908130383],
          [1.2026629734857446, 53.73944265567635],
          [-0.7709894304450727, 53.49622230521408],
          [-3.7482325946430337, 53.706577410611],
          [-3.9585749093993843, 52.90691407509458],
          [-5.955285332653683, 53.10515855604623],
          [-7.033678125100276, 48.61586683546483],
          [-5.3259702602668675, 48.43019961380409],
          [-5.518425648513434, 46.221658787915516],
          [-4.659475744384283, 46.12666829984169],
          [-4.3649320540094845, 45.07413223584241],
          [-2.3794052626660203, 45.32898831471905],
          [-1.9373159638868205, 43.706206089383336],
          [0.06788153204198741, 43.905786100638714],
          [0.004699921711373485, 43.25173708579592],
          [1.9862794211070685, 43.008171980766384],
          [1.807888131030179, 42.11784522721097],
          [2.624767484274258, 42.019450840069204],
          [2.747576450875415, 41.53752164066365],
          [4.478211702488969, 41.7738212523797],
          [4.832675689810128, 41.43133907177231],
          [6.814563451557322, 41.50114135424166],
          [7.307809870585267, 41.76123265762763],
          [8.96544663650467, 41.36450910996628],
          [13.06617494595171, 41.84334125473482],
          [17.01642238002623, 41.183098923123715],
          [17.437620573058783, 42.80243028327783],
          [19.41895345077834, 42.56429943340309],
          [19.96624681260642, 44.57322349051675],
          [21.581523687785477, 44.76305970547547],
          [20.895357912493687, 47.86771912508291],
          [21.608394651995944, 50.229659255252905],
          [22.380544078021774, 50.307208014800246],
          [22.006342545782, 51.86671255547095],
          [20.100268279601494, 51.944272087279224],
          [20.574048801124242, 53.37007158326913],
          [19.47919630884492, 53.74689828703972],
          [15.322167109297062, 53.92349631164213],
          [15.083422547508727, 54.833709642062644]]]),
    geometryEU = ui.import && ui.import("geometryEU", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                3.4864403753939266,
                52.58582494295801
              ],
              [
                1.6324975043001766,
                52.734923476217965
              ],
              [
                -3.1506751031216984,
                51.11719150842488
              ],
              [
                -3.4294531792935734,
                48.13800812061429
              ],
              [
                -0.16410132540218392,
                45.677874037146005
              ],
              [
                3.0902642003641656,
                44.547058914537224
              ],
              [
                5.032264787090366,
                43.1050555679524
              ],
              [
                11.705169377328465,
                42.89636751849488
              ],
              [
                15.433738030066566,
                43.08944336306849
              ],
              [
                17.242445842960915,
                44.7376698194154
              ],
              [
                18.501837249605266,
                46.385708225543226
              ],
              [
                18.882322406249575,
                50.439261724034566
              ],
              [
                16.692006781643926,
                52.21211264070344
              ],
              [
                13.934438422268926,
                53.51814856250741
              ],
              [
                8.276479437893926,
                53.77173027225465
              ],
              [
                5.024526312893927,
                52.79890445991652
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
        [[[3.4864403753939266, 52.58582494295801],
          [1.6324975043001766, 52.734923476217965],
          [-3.1506751031216984, 51.11719150842488],
          [-3.4294531792935734, 48.13800812061429],
          [-0.16410132540218392, 45.677874037146005],
          [3.0902642003641656, 44.547058914537224],
          [5.032264787090366, 43.1050555679524],
          [11.705169377328465, 42.89636751849488],
          [15.433738030066566, 43.08944336306849],
          [17.242445842960915, 44.7376698194154],
          [18.501837249605266, 46.385708225543226],
          [18.882322406249575, 50.439261724034566],
          [16.692006781643926, 52.21211264070344],
          [13.934438422268926, 53.51814856250741],
          [8.276479437893926, 53.77173027225465],
          [5.024526312893927, 52.79890445991652]]], null, false);
var enableFeature = {
  precipitation: false,
  composite: false,
  std: false,
  imagesS2: false,
  imagesL8: false,
  imagesL7: false
}
var geometry = geometryEU
// var geometry = geometryChina
var animation = require('users/gena/packages:animation')
var palettes = require('users/gena/packages:palettes')
var utils = require('users/gena/packages:utils')
var minVV = -25
var maxVV = -2
var minVisS1 = [-18.62, -18.62, -24.119]
var maxVisS1 = [2.13, 2.13, -2.63]
var ahn = ee.Image("users/gena/AHN3_DSM").rename('elevation')
var alos = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2").select('DSM')
// var palette = palettes.crameri.lisbon[25]
// palettes.showPalette('lisbon', palette)
var palette = palettes.crameri.oleron[50]
// palettes.showPalette('oleron', palette)
// var palette = palettes.crameri.nuuk[50]
// palettes.showPalette('oleron', palette)
// var palette = palettes.crameri.roma[25].slice(0).reverse()
// palettes.showPalette('roma', palette)
var weight = 0.4 // wegith of Hillshade vs RGB intensity (0 - flat, 1 - HS)
var exaggeration = 5 // vertical exaggeration
var azimuth = 315 // Sun azimuth
var zenith = 20 // Sun elevation
var brightness = -0.05 // 0 - default
var contrast = 0.05 // 0 - default
var saturation = 0.8 // 1 - default
var castShadows = false
var paletteHand = ['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'];
var hand = ee.Image("users/gena/GlobalHAND/30m/hand-1000").resample('bicubic')
var demMin = -500
var demMax = 500
// DEM GLOBAL
var dem = alos.mosaic().blend(ee.Image(0).updateMask(land.mask().not())).reproject(ee.Projection('EPSG:3857').atScale(Map.getScale()))
var demRGB = dem.visualize({ min: demMin, max: demMax, palette: palette })
var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
var mapLayerDEM = ui.Map.Layer(rgb, {}, 'DEM', false)
Map.layers().add(mapLayerDEM)
var rgb = utils.hillshadeRGB(hand.visualize({min: 0, max: 100, palette: paletteHand}), dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, false)
var mapLayerHAND = ui.Map.Layer(rgb, {}, 'HAND', false)
Map.layers().add(mapLayerHAND)
// DEM NL
var dem = ahn //.convolve(ee.Kernel.gaussian(0.5, 0.25, 'meters'))
var demRGB = dem.visualize({ min: demMin, max: demMax, palette: palette })
var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
Map.addLayer(rgb, {}, 'DEM (NL)', false)
// var castShadows = true
// var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
// Map.addLayer(rgb, {}, 'DEM (NL, with shadows)', false)
// Map.addLayer(dem, {}, 'DEM (raw)', false)
var rgb = utils.hillshadeRGB(hand.visualize({min: 0, max: 100, palette: paletteHand}), dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, false)
Map.addLayer(rgb, {}, 'HAND (NL)', false)
Map.addLayer(ee.Image(1), {}, 'black', false, 0.5)
var smoothingRadius = 30
var imagesAll = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterDate('2019-01-01', '2021-08-01')
  .filterBounds(geometry)
  // .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  // .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  // .select(['VV', 'VH'])
  .select([0, 1], ['VV', 'VH'])
var imagesAllJuly = imagesAll
  .filterDate('2018-01-01', '2021-08-01')
  .filter(ee.Filter.dayOfYear(150, 200))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  // .filterDate('2020-07-01', '2021-07-13')
  .map(function(i) { return i.resample('bicubic')})
var imagesAllJulyASC = imagesAll
  // .filterDate('2020-01-01', '2021-09-01')
  .filter(ee.Filter.dayOfYear(150, 200))
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  // .filterDate('2020-07-01', '2021-07-13')
  .map(function(i) { return i.resample('bicubic')})
  .select([0, 1], ['VV_mean', 'VH_mean'])
var imagesAllJulyDSC = imagesAll
  .filterDate('2018-01-01', '2021-08-01')
  .filter(ee.Filter.dayOfYear(150, 200))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  // .filterDate('2020-07-01', '2021-07-13')
  .map(function(i) { return i.resample('bicubic')})
  .select([0, 1], ['VV_mean', 'VH_mean'])
// print(imagesAllJuly.size())  3414
imagesAllJuly = imagesAllJuly
  .mean()
  .rename(['VV_mean', 'VH_mean'])
var imagesAllJulyNoResampling = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterDate('2020-01-01', '2021-08-01')
  .select([0, 1], ['b0', 'b1'])
  .filter(ee.Filter.dayOfYear(150, 200))
var imagesAllJulyNoResamplingDES = imagesAllJulyNoResampling.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
Map.addLayer(imagesAllJulyNoResamplingDES.mean(), { gamma: 1.4, min: minVisS1, max: maxVisS1, bands: ['b0', 'b0', 'b1']}, 'Mean of June-July, 2020-2021 DSC', false)
var imagesAllJulyNoResamplingASC = imagesAllJulyNoResampling.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
Map.addLayer(imagesAllJulyNoResamplingASC.mean(), { gamma: 1.4, min: minVisS1, max: maxVisS1, bands: ['b0', 'b0', 'b1']}, 'Mean of June-July, 2020-2021 ASC', false)
var minVisS1Std = [0.47332469279782463, 0.47332469279782463, 0.45692174962618787]
var maxVisS1Std = [ 4.27974461581159,  4.27974461581159,  3.558490083637368]
if(enableFeature.std) {
  var imagesAllJulyNoResamplingDES = imagesAllJulyNoResampling.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  Map.addLayer(imagesAllJulyNoResamplingDES.reduce(ee.Reducer.stdDev()).rename(['b0', 'b1']), { gamma: 1.4, min: minVisS1Std, max: maxVisS1Std, bands: ['b0', 'b0', 'b1']}, 'StdDev of June-July, 2020-2021 DSC', false)
}
// var minMax = imagesAllJulyNoResamplingDES.reduce(ee.Reducer.stdDev()).rename(['b0', 'b1']).reduceRegion({
//   reducer: ee.Reducer.percentile([1,99]),
//   geometry: Map.getBounds(true), 
//   scale: Map.getScale()
// })
// print(minMax)
if(enableFeature.std) {
  var imagesAllJulyNoResamplingASC = imagesAllJulyNoResampling.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  Map.addLayer(imagesAllJulyNoResamplingASC.reduce(ee.Reducer.stdDev()).rename(['b0', 'b1']), { gamma: 1.4, min: minVisS1Std, max: maxVisS1Std, bands: ['b0', 'b0', 'b1']}, 'StdDev of June-July, 2020-2021 ASC', false)
}
var dateStart = '2021-07-01'
var dateStop = '2021-08-01'
// var aoi = imagesAll.filterDate(dateStart, dateStop).filterBounds(geometry)
// aoi = aoi.geometry().dissolve().simplify(50000)
var aoiVis = ee.FeatureCollection(aoi).style({ color: 'yellow', width: 2, fillColor: '00000000' })
geometry = aoi
var dates = imagesAll.filterBounds(geometry.centroid(1).buffer(300000, 50000)).filterDate(dateStart, dateStop).aggregate_array('system:time_start')  
// print(dates.map(function(t) { return ee.Date(t) }))
var days = dates.map(function(t) { return ee.Date(t).format('YYYY-MM-dd') }).distinct()
days = days.sort()
// for now, only flood map for a few images
var floodDates = ['2021-07-14', '2021-07-15', '2021-07-16', '2021-07-17', '2021-07-18', '2021-07-19', '2021-07-20', '2021-07-21', '2021-07-22', '2021-07-23', '2021-07-24', '2021-07-25', '2021-07-26', '2021-07-27'/*, '2021-07-28', '2021-07-29', '2021-07-30'*/]
// var floodDates = ['2021-07-19']
var floodMapsExported = ['2021-07-14', '2021-07-15', '2021-07-16', '2021-07-17', '2021-07-18', '2021-07-19', '2021-07-20', '2021-07-21', '2021-07-22', '2021-07-23', '2021-07-24', '2021-07-25', '2021-07-26', '2021-07-27']
var floodImagesCoarse = []
var floodImages = []
var precipitationImages = []
var precipitationLayers = []
var imageLayers = []
var imageLayersS2 = []
var imageLayersL8 = []
var imageLayersL7 = []
var compositeLayers = []
var floodLayers = []
var floodLayersCoarse = []
Map.addLayer(ee.Image(), {}, '---------------------', false)
days = days.getInfo()
var currentDate = ui.url.get('date', '2021-07-15')
var imageOpacity = ui.url.get('imageOpacity', 100) / 100
var floodOpacity = ui.url.get('floodOpacity', 100) / 100
var floodMaxOpacity = ui.url.get('floodMaxOpacity', 0) / 100
var imageOpacityS2 = ui.url.get('imageOpacityS2', 0) / 100
var imageOpacityL8 = ui.url.get('imageOpacityL8', 0) / 100
var imageOpacityL7 = ui.url.get('imageOpacityL7', 0) / 100
var precipitationOpacity = ui.url.get('precipitationOpacity', 0) / 100
var gsmap = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational").select('hourlyPrecipRate') // 'hourlyPrecipRateGC'
var checkboxS1 = ui.Checkbox('Sentinel-1', 1)
var checkboxS2 = ui.Checkbox('Sentinel-2', 0)
var checkboxL8 = ui.Checkbox('Landsat 8', 0)
var checkboxL7 = ui.Checkbox('Landsat 7', 0)
days.map(function(d) {
  var visibility = false
  if(d === currentDate) {
    visibility = true
  }
  var dateStart1 = ee.Date(d)
  var dateStop1 = dateStart1.advance(1, 'day')
  var images = imagesAll.filterDate(dateStart1, dateStop1).map(function(i) { return i.resample('bicubic').updateMask(i.mask().reduce(ee.Reducer.allNonZero()).focal_min(30, 'square', 'meters')) })
  // Map.addLayer(images.geometry(), {}, 'outline 15', false)
  var imagesAllVis = ee.ImageCollection("COPERNICUS/S1_GRD").filterDate(dateStart1, dateStop1).select([0, 1], ['b0', 'b1'])
  var imageLayer = ui.Map.Layer(imagesAllVis, { min: minVisS1, max: maxVisS1, bands: ['b0', 'b0', 'b1']}, 'Sentinel-1 image ' + d, imageOpacity == 0 ? false : visibility, imageOpacity)
  Map.layers().add(imageLayer)
  imageLayers.push(imageLayer)
  if(enableFeature.imagesS2) {
    var imagesAllVisS2 = ee.ImageCollection("COPERNICUS/S2").filterDate(dateStart1, dateStop1).select(['B12', 'B8', 'B3'])
    var imageLayerS2 = ui.Map.Layer(imagesAllVisS2, { min: 500, max: 4500 }, 'Sentinel-2 image ' + d, imageOpacityS2 == 0 ? false : visibility, imageOpacityS2)
    Map.layers().add(imageLayerS2)
    imageLayersS2.push(imageLayerS2)
  }
  if(enableFeature.imagesL8) {
    var imagesAllVisL8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA").filterDate(dateStart1, dateStop1).select(['B6', 'B5', 'B3']).merge(ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA").filterDate(dateStart1, dateStop1).select(['B6', 'B5', 'B3']))
    var imageLayerL8 = ui.Map.Layer(imagesAllVisL8, { min: 0.05, max: 0.45 }, 'Landsat 8 image ' + d, imageOpacityL8 == 0 ? false : visibility, imageOpacityL8)
    Map.layers().add(imageLayerL8)
    imageLayersL8.push(imageLayerL8)
  }
  if(enableFeature.imagesL7) {
    var imagesAllVisL7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_RT_TOA").filterDate(dateStart1, dateStop1).select(['B5', 'B4', 'B2']).merge(ee.ImageCollection("LANDSAT/LE07/C01/T2_TOA").filterDate(dateStart1, dateStop1).select(['B5', 'B4', 'B2']))
    var imageLayerL7 = ui.Map.Layer(imagesAllVisL7, { min: 0.05, max: 0.45 }, 'Landsat 7 image ' + d, imageOpacityL7 == 0 ? false : visibility, imageOpacityL7)
    Map.layers().add(imageLayerL7)
    imageLayersL7.push(imageLayerL7)
  }
  var imagesASC = images.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  var imagesDSC = images.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  var compositeASC = imagesASC.map(function(i) {
    var orbit = i.get('relativeOrbitNumber_start')
    i = i.focal_mean(smoothingRadius, 'circle', 'meters')
    var imagesAllJulyASC2 = imagesAllJulyASC.filter(ee.Filter.eq('relativeOrbitNumber_start', orbit))
    imagesAllJulyASC2 = imagesAllJulyASC2.mean()
    // imagesAllJulyASC2 = imagesAllJulyASC2.reduce(ee.Reducer.percentile([10])).rename(['VV_mean', 'VH_mean'])
    return i.addBands(imagesAllJulyASC2).select(['VV', 'VV_mean']).rename(['b1', 'b2']).unitScale(-18, -2)
            .add(i.addBands(imagesAllJulyASC2).unitScale(minVV, maxVV).select('VH', 'VH_mean').rename(['b1', 'b2'])).multiply(0.5)
  })
  var compositeDSC = imagesDSC.map(function(i) {
    var orbit = i.get('relativeOrbitNumber_start')
    i = i.focal_mean(smoothingRadius, 'circle', 'meters')
    var imagesAllJulyDSC2 = imagesAllJulyDSC.filter(ee.Filter.eq('relativeOrbitNumber_start', orbit))
    imagesAllJulyDSC2 = imagesAllJulyDSC2.mean()
    // imagesAllJulyDSC2 = imagesAllJulyDSC2.reduce(ee.Reducer.percentile([10])).rename(['VV_mean', 'VH_mean'])
    return i.addBands(imagesAllJulyDSC2).select(['VV', 'VV_mean']).rename(['b1', 'b2']).unitScale(-18, -2)
            .add(i.addBands(imagesAllJulyDSC2).unitScale(minVV, maxVV).select('VH', 'VH_mean').rename(['b1', 'b2'])).multiply(0.5)
  })
  var composite = compositeASC.merge(compositeDSC).mosaic()
  // var image = images.mosaic().focal_mean(smoothingRadius, 'circle', 'meters')
  // var composite = image.addBands(imagesAllJuly).select(['VV', 'VV_mean']).rename(['b1', 'b2']).unitScale(-18, -2)
  //   .add(image.addBands(imagesAllJuly).unitScale(minVV, maxVV).select('VH', 'VH_mean').rename(['b1', 'b2'])).multiply(0.5)
  if(enableFeature.composite) {
    var compositeLayer = ui.Map.Layer(composite, { bands: ['b1', 'b1', 'b2'], min: [0, 0, 0], max: [1, 1, 1] }, 'Composite, ' + d, false)
    Map.layers().add(compositeLayer)
    compositeLayers.push(compositeLayer)
  }
  // composite S2
  /*
  var compositeS2 = ee.ImageCollection('COPERNICUS/S2').filterDate(dateStart1, dateStop1).filterBounds(Map.getBounds(true)).map(function(i) {
    i = i.resample('bicubic')
    i = i.updateMask(i.multiply(-1).unitScale(-2500, -2000)).normalizedDifference(['B3', 'B8']).rename('ndwi').addBands(imagesAllJulyS2)
    return i
  })
  var compositeLayerS2 = ui.Map.Layer(compositeS2, { bands: ['ndwi', 'ndwi', 'ndwi_p20'], min: -0.1, max: 0.25 }, 'Composite, S2, ' + d, false)
  Map.layers().add(compositeLayerS2)
  */
  // comput stretch  
  // var minMax = composite.reduceRegion({
  //   reducer: ee.Reducer.percentile([1,99]),
  //   geometry: Map.getBounds(true), 
  //   scale: Map.getScale()
  // })
  // print(minMax)
  if(floodDates.indexOf(d) > -1) {
    // var exportImages = true
    var exportImages = false
    composite = composite.updateMask(composite.mask().reduce(ee.Reducer.allNonZero())/*.focal_min(60, 'square', 'meters')*/)
    var p1 = composite.select('b1').multiply(-1).unitScale(-0.09, 0.1)
    var refineRadius = 60
    if(exportImages) {
      refineRadius = 90
    } 
    p1 = composite.updateMask(p1.gt(0.01).focal_max(refineRadius, 'circle', 'meters')).select('b1').multiply(-1).unitScale(-0.25, 0.1)
    // Map.addLayer(p1, {}, 'p1', false)
    var p2 = composite.select('b2').unitScale(-0.2, 0.2) // excludes permanent water
    // Map.addLayer(p2, {}, 'p2', false)
    // sometimes does not work
    // p2 = p2.multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1))
    // Map.addLayer(p2, {}, 'p2 + hand', false)
    var flood = p1.multiply(p2) // .multiply(ee.Image(1).paint(clip, 0).byte())
    floodImages.push(flood)
    var maskFlood = imagesAllVis.filterBounds(geometry).select(0).mosaic().mask().selfMask()
    var floodRGB = maskFlood.visualize({palette: ['black'], opacity: 0.25}).blend(flood.selfMask().visualize({ palette: ['00ffff'] }))
    var layer = ui.Map.Layer(floodRGB, {}, 'Flood water, ' + d, false)
    floodLayers.push(layer)
    Map.layers().add(layer)
    // var p1 = composite.select('b1').multiply(-1).unitScale(-0.02, 0.1)
    // var p2 = composite.select('b2').unitScale(-0.2, 0.2) // excludes permanent water
    // var flood = p1.multiply(p2).multiply(ee.Image(1).paint(clip, 0).byte())
    var upscaleSourceScale = 10
    if(!exportImages) {
      var upscaleSourceScale = Map.getScale() / 6   // real-time version
    }
    var floodUpscaled = flood
      .reproject(ee.Projection('EPSG:3857').atScale(upscaleSourceScale))
      .reduceResolution({reducer: ee.Reducer.percentile([95]), bestEffort: false, maxPixels: 10000})
    floodUpscaled = floodUpscaled.selfMask() // updateMask(floodUpscaled.unitScale(0.1, 0.5))
    if(exportImages) {
      Export.image.toAsset({
        image: floodUpscaled,
        description: 'flood-eu-2021-' + d, 
        assetId: 'projects/deltares-rws/flood-2021-07/flood-eu-' + d + '',
        region: aoi, 
        maxPixels: 1e12,
        scale: 150, 
        crs: 'EPSG:3857'
      })
    }
    if(floodMapsExported.indexOf(d) > -1) {
      floodUpscaled = ee.Image('projects/deltares-rws/flood-2021-07/flood-eu-' + d)
      // if(d !== '2021-07-15' && d !== '2021-07-20') {
      //   floodUpscaled = ee.Image('projects/deltares-rws/flood-2021-07/flood-eu-' + d/* + '_'*/)
      // } 
      // if(d === '2021-07-15') {
      //   floodUpscaled = ee.Image('projects/deltares-rws/flood-2021-07/flood-eu-' + d + '_')
      // }
      // Export.image.toCloudStorage({
      //   image: floodUpscaled, 
      //   description: 'flood-eu-upscaled-sentinel1-' + d, 
      //   bucket: 'global-water-watch',
      //   fileNamePrefix: 'floods-eu-' + d, 
      //   region: floodUpscaled.geometry().getInfo(), 
      //   scale: floodUpscaled.projection().nominalScale().getInfo(),
      //   maxPixels: 1e13,
      //   crs: 'EPSG:3857'
      // })
      // floodUpscaled = floodUpscaled.unmask(0)
      // floodUpscaled = floodUpscaled.multiply(floodUpscaled.gt(0.01))
      // floodUpscaled = floodUpscaled.reduceResolution({reducer: ee.Reducer.percentile([95]), bestEffort: false, maxPixels: 10000}).selfMask()
    }
    floodUpscaled = floodUpscaled.unmask()
    floodUpscaled = floodUpscaled.mask(floodUpscaled.unitScale(0.7, 1.5))
    // floodUpscaled = floodUpscaled.updateMask(floodUpscaled.mask().multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1)))
    // .mask(rgb.unitScale(0.4, 1).multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1)))
    var floodRGBUpscaled = maskFlood.visualize({palette: ['black'], opacity: 0.25}).blend(floodUpscaled.visualize({ palette: ['000000', '00ffff'], min: 0.6, max: 1.5}))
    layer = ui.Map.Layer(floodRGBUpscaled, {}, 'Flood water, ' + d + ', max upscaled', floodOpacity == 0 ? false : visibility, floodOpacity)
    floodLayersCoarse.push(layer)
    Map.layers().add(layer)
    floodImagesCoarse.push(floodUpscaled)
  } else {
    floodLayers.push(null)
    floodLayersCoarse.push(null)
    floodImagesCoarse.push(null)
  }
  // P  
  if(enableFeature.precipitation) {
    var colors = ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
    var p = ee.Image(gsmap.filterDate(dateStart1.advance(-0.5, 'day'), dateStop1).map(function(i) { return i.resample('bicubic') }).reduce(ee.Reducer.sum())).multiply(24)
    var maxP = 10
    var pRGB = p.mask(p.divide(24 * maxP / 3)).visualize({min:0, max: 24 * maxP * 5, palette: palettes.crameri.batlow[50]})
    var layer = ui.Map.Layer(pRGB, {}, 'Precipitation, ' + d, precipitationOpacity > 0 && visibility, precipitationOpacity)
    precipitationLayers.push(layer)
    Map.layers().add(layer)
  }
  Map.addLayer(ee.Image(1), { palette:['000000'] }, '---------------------', false, 0.5)
})  
var floodImagesValid = floodImages.filter(function(i) { return i })
// var maxFlood = ee.Image(floodImagesValid.map(function(i) { return i.unmask(0, false)})).reduce(ee.Reducer.max())
// rgb = maxFlood.mask(maxFlood.unitScale(0, 1)) ///.multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1)))
var maxFlood = ee.Image(floodImagesValid).reduce(ee.Reducer.max())
rgb = maxFlood.mask(maxFlood.unitScale(0.3, 1.2)) ///.multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1)))
var floodMaxLayer = ui.Map.Layer(rgb, { palette: ['000000', '00ffff']}, 'max (high zoom-only)', floodMaxOpacity > 0 ? true : false, floodMaxOpacity)
Map.layers().add(floodMaxLayer)
var floodImagesCoarseValid = floodImagesCoarse.filter(function(i) { return i })
var maxFloodCoarse = ee.Image(floodImagesCoarseValid.map(function(i) { return i.unmask(0, false)})).reduce(ee.Reducer.max())
rgb = maxFloodCoarse.mask(maxFloodCoarse.unitScale(1, 1.5))//.multiply(hand.multiply(-1).unitScale(-50, -30).clamp(0, 1)))
var floodMaxLayerCoarse = ui.Map.Layer(rgb, { palette: ['000000', '00ffff']}, 'max', floodMaxOpacity > 0 ? true : false, floodMaxOpacity)
Map.layers().add(floodMaxLayerCoarse)
addRivers({maxFA: 5, layer: { name: 'HydroRIVERS (FA>500)', opacity: 0.5, visible: false } })
// addRiversFromMapTiles()
var jrc = ee.Image("JRC/GSW1_2/GlobalSurfaceWater")
var waterOccurrence = jrc.select('occurrence').unmask(0, false).resample('bicubic').divide(100)
var showWaterOccurrence = ui.url.get('showWaterOccurrence', false)
var waterOccurrenceLayer = ui.Map.Layer(waterOccurrence.mask(waterOccurrence.unitScale(0, 0.5)), { min: 0.1, max: 0.5, palette: palettes.cb.Blues[7].slice(2, 7) }, 'water occurrence', showWaterOccurrence, 1)
Map.layers().add(waterOccurrenceLayer)
var waterOccurrenceRGB = waterOccurrence.mask(waterOccurrence.unitScale(0, 0.2)).visualize({ min: 0.1, max: 0.5, palette: ['000000', 'ffffff'] })
  .blend(land.mask().not().selfMask().visualize({palette: ['ffffff']}))
var waterOccurrenceLayer = ui.Map.Layer(waterOccurrenceRGB, {}, 'water occurrence', false, 0.3)
Map.layers().add(waterOccurrenceLayer)
var dikesRegional = ee.FeatureCollection("projects/deltares-rws/flood-2021-07/infrastructuur_regionale_keringen")
var dikesPrimary = ee.FeatureCollection("projects/deltares-rws/flood-2021-07/infrastructuur_primaire_keringen")
var dikes = dikesRegional.merge(dikesPrimary)
var dikesRGB = dikes.style({ color: '000000aa', width: 6 }).blend(dikes.style({ color: 'orange', width: 2 }))
var dikesLayer = ui.Map.Layer(dikesRGB, {}, 'dikes', false)
Map.layers().add(dikesLayer)
function exportNL() {
  // Export.image.toCloudStorage({
  //   image: maxFlood, 
  //   description: 'floods-map-sentinel1-flood-max-nl1', 
  //   bucket: 'liwo',
  //   fileNamePrefix: 'floods-map-sentinel1/flood-max-nl1', 
  //   region: geometryExportNL1.getInfo(), 
  //   scale: 10,
  //   maxPixels: 1e13,
  //   crs: 'EPSG:3857'
  // })
  Export.image.toDrive({
    image: maxFlood, 
    description: 'floods-map-sentinel1-flood-max-nl1-10m', 
    // bucket: 'liwo',
    folder: 'liwo',
    fileNamePrefix: 'floods-map-sentinel1/flood-max-nl1-10m', 
    region: geometryExportNL1.getInfo(), 
    scale: 10,
    maxPixels: 1e13,
    crs: 'EPSG:3857'
  })  
  Export.image.toDrive({
    image: maxFloodCoarse, 
    description: 'floods-map-sentinel1-flood-max-nl1-100m', 
    // bucket: 'liwo',
    folder: 'liwo',
    fileNamePrefix: 'floods-map-sentinel1/flood-max-100m', 
    region: geometryExportNL1.getInfo(), 
    scale: 100,
    maxPixels: 1e13,
    crs: 'EPSG:3857'
  })  
}
// exportNL()
var zoomCoarse = 11
function updateLayerVisibility(z) {
  for(var i=0; i<floodLayers.length; i++) {
    var layerFlood = floodLayers[i]
    var layerFloodUpscaled = floodLayersCoarse[i]
    if(!layerFlood) {
      continue
    }
    if((!layerFlood.getShown()) && (!layerFloodUpscaled.getShown())) {
       continue
    }
    if(z > zoomCoarse) {
      if(!layerFlood.getShown()) {
        layerFlood.setShown(true)
      }
      if(layerFloodUpscaled.getShown()) {
        layerFloodUpscaled.setShown(false)
      }
    } else {
      if(layerFlood.getShown()) {
        layerFlood.setShown(false)
      }
      if(!layerFloodUpscaled.getShown()) {
        layerFloodUpscaled.setShown(true)
      }
    }
  }
  if(z > zoomCoarse) {
    if(!floodMaxLayer.getShown() && sliderOpacityWaterMax) {
      floodMaxLayer.setShown(sliderOpacityWaterMax.getValue() > 0)
    }
    if(floodMaxLayerCoarse.getShown()) {
      floodMaxLayerCoarse.setShown(false)
    }
  } else {
    if(floodMaxLayer.getShown()) {
      floodMaxLayer.setShown(false)
    }
    if(!floodMaxLayerCoarse.getShown() && sliderOpacityWaterMax) {
      floodMaxLayerCoarse.setShown(sliderOpacityWaterMax.getValue() > 0)
    }
  }
}
Map.onChangeZoom(function(z) {
  // print(z)
  if(z < 12) {
    var dikesRGB = dikes.style({ color: '000000aa', width: 2 }).blend(dikes.style({ color: 'orange', width: 1 }))
    dikesLayer.setEeObject(dikesRGB)
  } else {
    var dikesRGB = dikes.style({ color: '000000aa', width: 6 }).blend(dikes.style({ color: 'orange', width: 2 }))
    dikesLayer.setEeObject(dikesRGB)
  }
  updateLayerVisibility(z)
  // update imagecollection-based layers  
  var dem = alos.mosaic().blend(ee.Image(0).updateMask(land.mask().not())).reproject(ee.Projection('EPSG:3857').atScale(Map.getScale()))
  var demRGB = dem.visualize({ min: demMin, max: demMax, palette: palette })
  var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
  mapLayerDEM.setEeObject(rgb)
  var rgb = utils.hillshadeRGB(hand.visualize({min: 0, max: 100, palette: paletteHand}), dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, false)
  mapLayerHAND.setEeObject(rgb)
})
function floodFill() {
  var floodMask = flood.gt(0.1)
  // Map.addLayer(floodMask)
  var bounds = ee.Geometry(Map.getBounds(true))
  var chart = ui.Chart.image.histogram(ahn.updateMask(floodMask), bounds, Map.getScale(), 20)
  chart.style().set({ position: 'bottom-left', width: '300px', height: '150px' })
  Map.widgets().add(chart)
  // print(ui.Chart.image.histogram(hand, bounds, Map.getScale(), 150))
  var samples = ahn.updateMask(floodMask).sample({region: bounds, scale: Map.getScale(), numPixels: 10000, geometries: true }).select('elevation')
  var values = samples.reduceColumns({ reducer: ee.Reducer.percentile([90]), selectors: ['elevation'] })
  Map.addLayer(samples.draw('yellow'), {}, 'samples all')
  Map.addLayer(samples.filter(ee.Filter.gt('elevation', values.get('p90'))).draw('red'), {}, 'samples bad')
  samples = samples.filter(ee.Filter.lt('elevation', values.get('p90')))
  // interpolation
  var interpolated = samples.inverseDistance({
    range: 2500,
    propertyName: 'elevation',
    mean: samples.reduceColumns(ee.Reducer.mean(), ['elevation']).values().get(0),
    stdDev: samples.reduceColumns(ee.Reducer.stdDev(), ['elevation']).values().get(0),
    gamma: 0.3
  });
  Map.addLayer(interpolated, { min: 0, max: 150, palette: palette }, 'interpolated elevation sampled on water');
  Map.addLayer(interpolated.gt(ahn).selfMask(), { palette: ['8856a7'] }, 'water mask');
  // var waterLevels = hand.updateMask(floodMask).reduceRegion(ee.Reducer.percentile(ee.List.sequence(30, 70)), bounds, Map.getScale()).values()
  // var waterAlways = dem.mask().byte().not().focal_min(2).focal_max(2)
  // var water = waterLevels.map(function(y) {
  //   return hand.lt(ee.Image.constant(y)).add(waterAlways).selfMask()
  //   //return dem.unmask(0).lt(ee.Image.constant(y)).add(waterAlways).selfMask()
  //     .visualize({ opacity: 0.5, palette: ['00ffff'] })
  //     .set({ label: ee.Number(y).format('%f').cat(' m') })
  // })
  // water = ee.ImageCollection(water)
  // animation.animate(water, { maxFrames: water.size(), label: 'label' })
}
// floodFill()
Map.setOptions('HYBRID')
Map.style().set({ cursor: 'crosshair' })
var layerClicked = ui.Map.Layer(ee.Image(), {}, 'clicked AOI', false)
Map.layers().add(layerClicked)
// animation
var insetMap = null
var panelTimeLapse = ui.Panel([])
panelTimeLapse.style().set({ border: '1px solid white', width: '500px', 'height': '500px', margin: '0px', padding: '0px', position: 'bottom-right', 'background-color': '00000000', shown: false })
Map.add(panelTimeLapse)
function closeInsetMap() {
  if(insetMap != null) {
    ui.url.set('animate', false)
    insetMap.clear()
    panelTimeLapse.widgets().reset([])
    panelTimeLapse.style().set({ shown: false })
    insetMap = null
    layerClicked.setEeObject(ee.Image())
    layerClicked.setShown(false)
  }
}
function showAnimation(pt) {
  closeInsetMap()  
  var lon = pt.lon
  var lat = pt.lat
  var mapZoom = Map.getZoom()
  // print(pt)
  // animate images    
  var map = ui.Map({ lat: pt.lat, lon: pt.lon, zoom: mapZoom }, false, { 
    height: '497px', width: '497px', margin: '0px', padding: '0px'
  })
  map.setOptions('SATELLITE')
  map.setControlVisibility({fullscreenControl: true, all: false,/*, layerList: true*/ scaleControl: true})
  // map.setLocked(true)
  // add close button
  var closeMapButton = ui.Button('Close')
  closeMapButton.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-right' })
  map.add(closeMapButton)
  closeMapButton.onClick(function() {
    closeInsetMap()
  })
  insetMap = map
  var scale = Map.getScale()
  var center = ee.Geometry.Point([pt.lon, pt.lat])
  scale = Math.min(19.093, scale)
  var bounds = center.buffer(scale * 120).bounds(scale)
  layerClicked.setEeObject(ee.FeatureCollection([bounds]).style({ width: 2, color: 'ffff00', fillColor: 'ffff0011' }))
  layerClicked.setShown(true)
  var lon = pt.lon.toString().slice(0,7)
  var lat = pt.lon.toString().slice(0,7)
  var label = ui.Label('Center: ' + lon + ', ' + lat + ', Zoom: ' + Map.getZoom())
  label.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-left', 'background-color': '#00000033', 'color': 'ffffff'})
  // map.add(label)
  ui.url.set('lon', pt.lon)
  ui.url.set('lat', pt.lat)
  ui.url.set('zoom', Map.getZoom())
  ui.url.set('animate', true)
  if(waterOccurrenceLayer.getShown()) {
    ui.url.set('showWaterOccurrence', true)
  }
  if(urbanLayer.getShown()) {
    ui.url.set('showUrban', true)
  }
  // todo show progress    
  // map.onTileLoaded(function(v) {
  //   // var lectTilesPercent = .map(function())
  // })
  panelTimeLapse.widgets().reset([map])
  panelTimeLapse.style().set({ shown: true })
  var imagesRGB = ee.ImageCollection([])
  if(checkboxS1 && checkboxS1.getValue()) {
    var images = imagesAll
      .filterBounds(center)
      .filterDate(dateStart, dateStop)
      // .filter(ee.Filter.dayOfYear(150, 200))
      .sort('system:time_start')
      .map(function(i) {
      return i
        // .visualize({min: minVV, max: maxVV, bands: ['VV', 'VV', 'VH'] })
        .visualize({min: minVisS1, max: maxVisS1, bands: ['VV', 'VV', 'VH'], gamma: 1.4 })
        .set({ 
          label: i.date().format('YYYY-MM-dd HH:mm').cat(', S1'),
          // hasValues: i.select('VV').reduceRegion(ee.Reducer.anyNonZero(), bounds, scale * 10)
        })
    })
    imagesRGB = imagesRGB.merge(images)
  } 
  if(checkboxS1 && checkboxS2.getValue()) {
    var images = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(center)
      .filterDate(dateStart, dateStop)
      // .filter(ee.Filter.dayOfYear(150, 200))
      .map(function(i) {
        return i.resample('bicubic')
          .visualize({min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 })
          .set({ 
            label: i.date().format('YYYY-MM-dd HH:mm').cat(', S2'),
          })
    }).distinct('label')
    imagesRGB = imagesRGB.merge(images)
  }
  if(checkboxL8 && checkboxL8.getValue()) {
    var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA")
    var l8t2 = ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA")
    var images = l8.filterDate(dateStart, dateStop).filterBounds(center)
      .merge(l8t2.filterDate(dateStart, dateStop).filterBounds(center))
      .map(function(i) {
        return i.resample('bicubic')
          .visualize({min: 0.05, max: 0.45, bands: ['B6', 'B5', 'B3'], gamma: 1.4 })
          .set({ 
            label: i.date().format('YYYY-MM-dd HH:mm').cat(', L8'),
          })
      })
    imagesRGB = imagesRGB.merge(images)
  }
  if(checkboxL7 && checkboxL7.getValue()) {
    var l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_RT_TOA")
    var l7t2 = ee.ImageCollection("LANDSAT/LE07/C01/T2_TOA")
    var images = l7.filterDate(dateStart, dateStop).filterBounds(center)
      .merge(l7t2.filterDate(dateStart, dateStop).filterBounds(center))
      .map(function(i) {
        return i.resample('bicubic')
          .visualize({min: 0.05, max: 0.45, bands: ['B5', 'B4', 'B2'], gamma: 1.4 })
          .set({ 
            label: i.date().format('YYYY-MM-dd HH:mm').cat(', L7'),
          })
      })
    imagesRGB = imagesRGB.merge(images)
  }
  var images = ee.ImageCollection(imagesRGB.sort('label'))
  // print(images)
  map.centerObject(bounds)
  var a = animation.animate(images, { 
    map: map, 
    compact: true, 
    // hidePlay: true, 
    maxFrames: 100, 
    timeStep: 250,
    width: '400px',
    label: 'label',
    preloadCount: 5
  })
  a.then(function() {
    // make sure layers are hidden (for speed purposes) when the user zooms-in in the inset map
    map.onChangeZoom(function(i) {
      var sliderValue = a.panel.widgets().get(1).getValue()
      for(var i=0; i<map.layers().length(); i++) {
        if(i != sliderValue) {
          map.layers().get(i).setShown(false)
        }
      }
    })
    // map.addLayer(ee.FeatureCollection([bounds]).style({ width: 2, color: '00ffff', fillColor: '00ffff11' }), {}, 'bounds')
    // var edges = ee.Algorithms.CannyEdgeDetector(image.select('Alert').unmask(0, false).resample(resamplingMode), 0.1)
    // map.addLayer(edges.selfMask(), { palette: ['fd8d3c'], min: 0, max: 1 }, 'alert', true, 0.5)
    a.panel.style().set({ 'background-color': '#00000055' })
    a.panel.widgets().get(0).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(1).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(2).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(0).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ fontSize: 0 })
    a.panel.widgets().get(2).style().set({ 'color': '#ffffff' })
    // e properties of the main panel of animation controls
    // print(a.panel)
    // a.panel.widgets().reset([])
  })
}
Map.onClick(showAnimation)
// var textInfo = ui.Label('Click on the map to show a time-lapse of historical Sentinel-1 images for June-July 2020-2021 and the image acquired during the flood on July 15th')
// var infoPanel = ui.Panel([textInfo]);
// infoPanel.style().set({
//   position: 'bottom-right'
// })
// Map.widgets().add(infoPanel)
var landcover = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019");
var all = landcover.select('discrete_classification')
// Map.addLayer(all, {}, "Land Cover");
var urban = all.eq(50)
Map.addLayer(urban.selfMask(), { palette: ['fb6a4a']}, 'urban', false, 0.2)
var HRSL = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrslpop");
var HRSL_men = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_men");
var HRSL_women = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women");
var HRSL_youth = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_youth");
var HRSL_children_under_five = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_children_under_five");
var HRSL_women_reproductive_age = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women_reproductive_age");
var HRSL_elderly_over_sixty = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_elderly_over_sixty");
var urbanLayer = ui.Map.Layer(HRSL, { palette: ['fb6a4a']}, 'urban (Facebook)', false, 0.5)
Map.layers().add(urbanLayer)
function parseParameters() {
  var lon = ui.url.get('lon', -999)
  var lat = ui.url.get('lat', -999)
  var zoom = ui.url.get('zoom', 9)
  if(lon !== -999 && lat !== -999) {
    Map.setCenter(lon, lat, zoom)
    updateLayerVisibility(zoom)
    if(ui.url.get('animate', false)) {
      showAnimation({lon: lon, lat: lat})
    }
    var showUrban = ui.url.get('showUrban', false)
    if(showUrban) {
      urbanLayer.setShown(true)
    }
  } else {
    Map.centerObject(geometry, 7)
    updateLayerVisibility(9)
  }
}
parseParameters()
Map.onChangeBounds(function(o) {
  ui.url.set('lon', o.lon)
  ui.url.set('lat', o.lat)
  ui.url.set('zoom', o.zoom)
  if(urbanLayer.getShown()) {
    ui.url.set('showUrban', true)
  }
})
Map.onChangeZoom(function(z) {
  // hide other layers
  for(var i=0; i<floodLayers.length; i++) {
    if(i == currentTimeIndex) {
      continue
    }
    if(enableFeature.precipitation) {
      if(precipitationLayers[i]) {
        precipitationLayers[i].setShown(false)
      }
    }
    if(floodLayersCoarse[i]) {
      floodLayersCoarse[i].setShown(false)
    }
    if(floodLayers[i]) {
      floodLayers[i].setShown(false)
    }
    if(enableFeature.composite) {  
      compositeLayers[i].setShown(false)
    }
    imageLayers[i].setShown(false)
    if(enableFeature.imagesS2) {  
      imageLayersS2[i].setShown(false)
    }
    if(enableFeature.imagesL8) {  
      imageLayersL8[i].setShown(false)
    }
    if(enableFeature.imagesL7) {  
      imageLayersL7[i].setShown(false)
    }
  }
})
var labelAcknowledgement = ui.Label({
  value: 'Deltares ©2021',
  style: {
    'backgroundColor': '#00000055',
    'color': 'white',
    'fontSize': '18px',
    // 'fontWeight': 'bold',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 12px 0px'
  }
})
Map.add(ui.Panel({ widgets: [labelAcknowledgement], style: { padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px',  position: 'bottom-center', 'backgroundColor': '#00000000' } }))
var labelAcknowledgement2 = ui.Label({
  value: 'Data: Copernicus Sentinel-1',
  style: {
    'backgroundColor': '#00000055',
    'color': 'white',
    'fontSize': '14px',
    // 'fontWeight': 'bold',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 12px 0px'
  }
})
Map.add(ui.Panel({ widgets: [labelAcknowledgement2], style: { padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px',  position: 'bottom-right', 'backgroundColor': '#00000000' } }))
Map.addLayer(aoiVis, {}, 'aoi (flood analysis area)', false)
// UI =====================
var currentTimeIndex = days.indexOf(currentDate)
var sliderDates = ui.Slider(1, days.length, currentTimeIndex+1, 1)
var labelDate = ui.Label(days[currentTimeIndex])
var panelSliderDate = ui.Panel([sliderDates, labelDate], ui.Panel.Layout.flow('horizontal'))
if(enableFeature.precipitation) {
  var sliderOpacityPrecipitation = ui.Slider(0, 100, 100, 1)
  var labelOpacityPrecipitation = ui.Label('Precipitation')
  var panelSliderPrecipitation = ui.Panel([sliderOpacityPrecipitation, labelOpacityPrecipitation], ui.Panel.Layout.flow('horizontal'))
  sliderOpacityPrecipitation.setValue(ui.url.get('precipitationOpacity', 0), false)
  sliderOpacityPrecipitation.onSlide(function(opacity) {
    ui.url.set('precipitationOpacity', opacity)
    opacity = opacity / 100
    precipitationOpacity = opacity
    precipitationLayers[currentTimeIndex].setOpacity(opacity)
    if(opacity == 0) {
      precipitationLayers[currentTimeIndex].setShown(false)
    } else if(!precipitationLayers[currentTimeIndex].getShown()) {
      precipitationLayers[currentTimeIndex].setShown(true)
    }
  })
}  
var sliderOpacityWater = ui.Slider(0, 100, 100, 1)
var labelOpacityWater = ui.Label('Flooding')
var panelSliderWater = ui.Panel([sliderOpacityWater, labelOpacityWater], ui.Panel.Layout.flow('horizontal'))
sliderOpacityWater.setValue(ui.url.get('floodOpacity', 100), false)
sliderOpacityWater.onSlide(function(opacity) {
  ui.url.set('floodOpacity', opacity)
  opacity = opacity / 100
  opacityFloodCoarse = opacity
  opacityFlood = opacity
  if(floodLayersCoarse[currentTimeIndex]) {
    floodLayersCoarse[currentTimeIndex].setOpacity(opacity)
  }
  if(floodLayers[currentTimeIndex]) {
    floodLayers[currentTimeIndex].setOpacity(opacity)
  }
  if(opacity == 0) {
    if(floodLayersCoarse[currentTimeIndex]) {
      floodLayersCoarse[currentTimeIndex].setShown(false)
    }
    if(floodLayers[currentTimeIndex]) {
      floodLayers[currentTimeIndex].setShown(false)
    }
  } else {
    if(Map.getZoom() <= zoomCoarse) {
      if(floodLayersCoarse[currentTimeIndex] && !floodLayersCoarse[currentTimeIndex].getShown()) {
        floodLayersCoarse[currentTimeIndex].setShown(true)
      }
    } else {
      if(floodLayers[currentTimeIndex] && !floodLayers[currentTimeIndex].getShown()) {
        floodLayers[currentTimeIndex].setShown(true)
      }
    }
  }
})
var sliderOpacityWaterMax = ui.Slider(0, 100, 100, 1)
var labelOpacityWaterMax = ui.Label('Flooding (max)')
var panelSliderWaterMax = ui.Panel([sliderOpacityWaterMax, labelOpacityWaterMax], ui.Panel.Layout.flow('horizontal'))
sliderOpacityWaterMax.setValue(ui.url.get('floodMaxOpacity', 0), false)
sliderOpacityWaterMax.onSlide(function(opacity) {
  ui.url.set('floodMaxOpacity', opacity)
  opacity = opacity / 100
  opacityFloodMaxCoarse = opacity
  opacityFloodMax = opacity
  floodMaxLayerCoarse.setOpacity(opacity)
  floodMaxLayer.setOpacity(opacity)
  if(opacity == 0) {
    floodMaxLayerCoarse.setShown(false)
    floodMaxLayer.setShown(false)
  } else {
    if(Map.getZoom() <= zoomCoarse) {
      floodMaxLayerCoarse.setShown(true)
    } else {
      floodMaxLayer.setShown(true)
    }
  }
})
var animationLabel = ui.Label('Select missions and click on the map to animate recent satellite images:')
var animationPanel = ui.Panel([animationLabel, checkboxS1, checkboxS2, checkboxL8, checkboxL7])
var sliderOpacityImageS2 = ui.Slider(0, 100, 0, 1)
var labelOpacityImageS2 = ui.Label('Sentinel-2')
var panelSliderImageS2 = ui.Panel([sliderOpacityImageS2, labelOpacityImageS2], ui.Panel.Layout.flow('horizontal'))
sliderOpacityImageS2.setValue(ui.url.get('imageOpacityS2', 0), false)
sliderOpacityImageS2.onSlide(function(opacity) {
  ui.url.set('imageOpacityS2', opacity)
  opacity = opacity / 100
  opacityImageS2 = opacity
  imageLayersS2[currentTimeIndex].setOpacity(opacity)
  if(opacity == 0) {
    imageLayersS2[currentTimeIndex].setShown(false)
  } else if(!imageLayersS2[currentTimeIndex].getShown()) {
    imageLayersS2[currentTimeIndex].setShown(true)
  }
})
var sliderOpacityImageL7 = ui.Slider(0, 100, 0, 1)
var labelOpacityImageL7 = ui.Label('Landsat 7')
var panelSliderImageL7 = ui.Panel([sliderOpacityImageL7, labelOpacityImageL7], ui.Panel.Layout.flow('horizontal'))
sliderOpacityImageL7.setValue(ui.url.get('imageOpacityL7', 0), false)
sliderOpacityImageL7.onSlide(function(opacity) {
  ui.url.set('imageOpacityL7', opacity)
  opacity = opacity / 100
  opacityImageL7 = opacity
  imageLayersL7[currentTimeIndex].setOpacity(opacity)
  if(opacity == 0) {
    imageLayersL7[currentTimeIndex].setShown(false)
  } else if(!imageLayersL7[currentTimeIndex].getShown()) {
    imageLayersL7[currentTimeIndex].setShown(true)
  }
})
var sliderOpacityImageL8 = ui.Slider(0, 100, 0, 1)
var labelOpacityImageL8 = ui.Label('Landsat 8')
var panelSliderImageL8 = ui.Panel([sliderOpacityImageL8, labelOpacityImageL8], ui.Panel.Layout.flow('horizontal'))
sliderOpacityImageL8.setValue(ui.url.get('imageOpacityL8', 0), false)
sliderOpacityImageL8.onSlide(function(opacity) {
  ui.url.set('imageOpacityL8', opacity)
  opacity = opacity / 100
  opacityImageL8 = opacity
  imageLayersL8[currentTimeIndex].setOpacity(opacity)
  if(opacity == 0) {
    imageLayersL8[currentTimeIndex].setShown(false)
  } else if(!imageLayersL8[currentTimeIndex].getShown()) {
    imageLayersL8[currentTimeIndex].setShown(true)
  }
})
var sliderOpacityImage = ui.Slider(0, 100, 100, 1)
var labelOpacityImage = ui.Label('Sentinel-1')
var panelSliderImage = ui.Panel([sliderOpacityImage, labelOpacityImage], ui.Panel.Layout.flow('horizontal'))
sliderOpacityImage.setValue(ui.url.get('imageOpacity', 100), false)
sliderOpacityImage.onSlide(function(opacity) {
  ui.url.set('imageOpacity', opacity)
  opacity = opacity / 100
  opacityImage = opacity
  imageLayers[currentTimeIndex].setOpacity(opacity)
  if(opacity == 0) {
    imageLayers[currentTimeIndex].setShown(false)
  } else if(!imageLayers[currentTimeIndex].getShown()) {
    imageLayers[currentTimeIndex].setShown(true)
  }
})
var widgets = [panelSliderDate, panelSliderWaterMax, panelSliderWater]
if(enableFeature.precipitation) {
  widgets = widgets.push(panelSliderPrecipitation)
}
if(enableFeature.imagesS2) {
  widgets.push(panelSliderImageS2)
}
if(enableFeature.imagesL8) {
  widgets.push(panelSliderImageL8)
}
if(enableFeature.imagesL7) {
  widgets.push(panelSliderImageL7)
}
widgets.push(panelSliderImage)
widgets.push(animationPanel)
var panelSliderControls = ui.Panel(widgets)
var opacityPrecipitation = 0
var shownPrecipitation = false
var opacityFloodMax = 1
var shownFloodMax = false
var opacityFloodMaxCoarse = 1
var shownFloodMaxCorase = false
var opacityFlood = 1
var shownFlood = false
var opacityFloodCoarse = 1
var shownFloodCoarse = true
var opacityImageS2 = 1
var shownImageS2 = false
var opacityImageL8 = 1
var shownImageL8 = false
var opacityImageL7 = 1
var shownImageL7 = false
var opacityImage = 1
var shownImage = true
var opacityComposite = 1
var shownComposite = false
sliderDates.onSlide(function(t) {
  var newTimeIndex = t-1
  ui.url.set('date', days[newTimeIndex])
  if(enableFeature.precipitation) {
    opacityPrecipitation = precipitationLayers[currentTimeIndex].getOpacity()
    shownPrecipitation = precipitationLayers[currentTimeIndex].getShown()
  }
  // remember opacity and shown of current layers  
  if(floodLayersCoarse[currentTimeIndex]) {
    opacityFloodCoarse = floodLayersCoarse[currentTimeIndex].getOpacity()
    shownFloodCoarse = floodLayersCoarse[currentTimeIndex].getShown()
  }
  if(floodLayers[currentTimeIndex]) {
    opacityFlood = floodLayers[currentTimeIndex].getOpacity()
    shownFlood = floodLayers[currentTimeIndex].getShown()
  }
  if(enableFeature.imagesS2) {
    opacityImageS2 = imageLayersS2[currentTimeIndex].getOpacity()
    shownImageS2 = imageLayersS2[currentTimeIndex].getShown()
  }
  if(enableFeature.imagesL8) {
    opacityImageL8 = imageLayersL8[currentTimeIndex].getOpacity()
    shownImageL8 = imageLayersL8[currentTimeIndex].getShown()
  }
  if(enableFeature.imagesL7) {
    opacityImageL7 = imageLayersL7[currentTimeIndex].getOpacity()
    shownImageL7 = imageLayersL7[currentTimeIndex].getShown()
  }
  opacityImage = imageLayers[currentTimeIndex].getOpacity()
  shownImage = imageLayers[currentTimeIndex].getShown()
  if(enableFeature.composite) {  
    opacityComposite = compositeLayers[currentTimeIndex].getOpacity()
    shownComposite = compositeLayers[currentTimeIndex].getShown()
  }
  // set opacity for new layers
  if(enableFeature.precipitation) {
    precipitationLayers[newTimeIndex].setOpacity(precipitationLayers[currentTimeIndex].getOpacity())
  }
  if(floodLayersCoarse[newTimeIndex]) {
    floodLayersCoarse[newTimeIndex].setOpacity(opacityFloodCoarse)
  }
  if(floodLayers[newTimeIndex]) {
    floodLayers[newTimeIndex].setOpacity(opacityFlood)
  }
  if(enableFeature.composite) {  
    compositeLayers[newTimeIndex].setOpacity(compositeLayers[currentTimeIndex].getOpacity())
  }
  imageLayers[newTimeIndex].setOpacity(imageLayers[currentTimeIndex].getOpacity())
  if(enableFeature.imagesS2) {  
    imageLayersS2[newTimeIndex].setOpacity(imageLayersS2[currentTimeIndex].getOpacity())
  }
  if(enableFeature.imagesL8) {  
    imageLayersL8[newTimeIndex].setOpacity(imageLayersL8[currentTimeIndex].getOpacity())
  }
  if(enableFeature.imagesL7) {  
    imageLayersL7[newTimeIndex].setOpacity(imageLayersL7[currentTimeIndex].getOpacity())
  }
  // show new layers
  if(enableFeature.precipitation) {
    precipitationLayers[newTimeIndex].setShown(precipitationLayers[currentTimeIndex].getShown())
  }
  if(floodLayersCoarse[newTimeIndex]) {
    floodLayersCoarse[newTimeIndex].setShown(shownFloodCoarse)
  }
  if(floodLayers[newTimeIndex]) {
    floodLayers[newTimeIndex].setShown(shownFlood)
  }
  if(enableFeature.composite) {  
    compositeLayers[newTimeIndex].setShown(compositeLayers[currentTimeIndex].getShown())
  }
  imageLayers[newTimeIndex].setShown(imageLayers[currentTimeIndex].getShown())
  if(enableFeature.imagesS2) {  
    imageLayersS2[newTimeIndex].setShown(imageLayersS2[currentTimeIndex].getShown())
  }
  if(enableFeature.imagesL8) {  
    imageLayersL8[newTimeIndex].setShown(imageLayersL8[currentTimeIndex].getShown())
  }
  if(enableFeature.imagesL7) {  
    imageLayersL7[newTimeIndex].setShown(imageLayersL7[currentTimeIndex].getShown())
  }
  // set opacity for old layers
  if(enableFeature.precipitation) {
    precipitationLayers[currentTimeIndex].setOpacity(0)
  }
  if(floodLayersCoarse[currentTimeIndex]) {
    floodLayersCoarse[currentTimeIndex].setOpacity(0)
  }
  if(floodLayers[currentTimeIndex]) {
    floodLayers[currentTimeIndex].setOpacity(0)
  }
  if(enableFeature.composite) {  
    compositeLayers[currentTimeIndex].setOpacity(0)
  }
  imageLayers[currentTimeIndex].setOpacity(0)
  if(enableFeature.imagesS2) {  
    imageLayersS2[currentTimeIndex].setOpacity(0)
  }
  if(enableFeature.imagesL8) {  
    imageLayersL8[currentTimeIndex].setOpacity(0)
  }
  if(enableFeature.imagesL7) {  
    imageLayersL7[currentTimeIndex].setOpacity(0)
  }
  // update index  
  currentTimeIndex = newTimeIndex
  labelDate.setValue(days[newTimeIndex])
})
var slidersWidth = 150
labelDate.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
sliderDates.style().set({
  width: slidersWidth + 'px',
  'color': 'ffffff',
  'background-color': '#00000000'
})
panelSliderDate.style().set({
  'background-color': '#00000000',
})
if(enableFeature.precipitation) {
  // precipitation
  sliderOpacityPrecipitation.style().set({
    width: slidersWidth + 'px',
    'background-color': '#00000000',
  })
  labelOpacityPrecipitation.style().set({
    'background-color': '#00000000',
    'color': 'ffffff'
  })
  panelSliderPrecipitation.style().set({
    'background-color': '#00000000',
  })
}
// water max
sliderOpacityWaterMax.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityWaterMax.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderWaterMax.style().set({
  'background-color': '#00000000',
})
// water
sliderOpacityWater.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityWater.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderWater.style().set({
  'background-color': '#00000000',
})
// image S2
panelSliderImageS2.style().set({
  'background-color': '#00000000',
})
sliderOpacityImageS2.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityImageS2.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderImageS2.style().set({
  'background-color': '#00000000',
})
// image L8
panelSliderImageL8.style().set({
  'background-color': '#00000000',
})
sliderOpacityImageL8.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityImageL8.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderImageL8.style().set({
  'background-color': '#00000000',
})
// image L7
panelSliderImageL7.style().set({
  'background-color': '#00000000',
})
sliderOpacityImageL7.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityImageL7.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderImageL7.style().set({
  'background-color': '#00000000',
})
// image S1
panelSliderImage.style().set({
  'background-color': '#00000000',
})
sliderOpacityImage.style().set({
  width: slidersWidth + 'px',
  'background-color': '#00000000',
})
labelOpacityImage.style().set({
  'background-color': '#00000000',
  'color': 'ffffff'
})
panelSliderImage.style().set({
  'background-color': '#00000000',
})
panelSliderControls.style().set({
  'background-color': '#00000088',
  position: 'middle-left'
})
checkboxS1.style().set({
  'background-color': '#00000000',
  'color': 'ffffff',
  'width': '100px'
})
checkboxS2.style().set({
  'background-color': '#00000000',
  'color': 'ffffff',
  'width': '100px'
})
checkboxL8.style().set({
  'background-color': '#00000000',
  'color': 'ffffff',
  'width': '100px'
})
checkboxL7.style().set({
  'background-color': '#00000000',
  'color': 'ffffff',
  'width': '100px'
})
animationLabel.style().set({
  'background-color': '#00000000',
  'color': 'ffffff',
  'width': '200px'
})
animationPanel.style().set({
  'background-color': '#00000000',
})
Map.widgets().add(panelSliderControls)
/***
 * Configures layer options
 */
function getLayerOptions(options) {
  var layer = {
    visible: true,
    opacity: 1.0,
    name: '<layer name>'
  }  
  if(options && typeof(options.layer) !== 'undefined') {
    layer.visible = typeof(options.layer.visible) !== 'undefined' ? options.layer.visible : layer.visible
    layer.opacity = typeof(options.layer.opacity) !== 'undefined' ? options.layer.opacity : layer.opacity
    layer.name = typeof(options.layer.name) !== 'undefined' ? options.layer.name : layer.name
  }
  return layer
}
function addRivers(options) {
  var rivers = ee.FeatureCollection('users/gena/HydroRIVERS_v10')
  if(options && options.maxFA) {
    rivers = rivers.filter(ee.Filter.gte('DIS_AV_CMS', options.maxFA))
  }
  // rivers = rivers.map(function(f) { return f.set('DIS_AV_CMS_LOG', ee.Number(f.get('DIS_AV_CMS')).log10())})
  var riversImage = ee.Image().float();
  var scale = Map.getScale() * 8
  if(options && options.scale) {
    scale = options.scale
  }
  rivers = rivers.map(function(f) {
    return f.set({ style: {
        // color: '00bbaa',
        color: 'ffffff', 
        // color: '8a0303', // Halloween version
        gamma: 1.5,
        // width: ee.Number(f.get('DIS_AV_CMS_LOG')).divide(5)
        width: ee.Number(f.get('DIS_AV_CMS')).divide(100).add(0.3).min(2)
      } 
    })
  })
  riversImage = rivers.style({ styleProperty: 'style' })
  // for(var th=0; th<10; th+=1) {
  //   var segments = rivers.filter(ee.Filter.gt('DIS_AV_CMS_LOG', th))
  //   print(th, segments.size())
  //   print(ui.Chart.feature.histogram(segments, 'DIS_AV_CMS_LOG', 150))
  //   riversImage = riversImage.blend(segments.style({ color: '0099CC', width: ee.Number(100).multiply(th).divide(scale) }))
  // }
  if(options && options.large) {
    // Natural Earth
    rivers = ee.FeatureCollection('users/gena/ne_10m_rivers_lake_centerlines_scale_rank')
    riversImage = rivers.style({ color: '0099CC', width: 1 }).visualize()
  }
  if(options && options.region) {
    riversImage = riversImage.clip(options.region)
  }
  var layer = getLayerOptions(options)  
  var palette = ['ccffff']
  if(options && options.palette) {
    palette = options.palette
  }
    //riversImage = riversImage.visualize({palette:palette})
  var riversLayer = ui.Map.Layer(riversImage, {}, layer.name, layer.visible, layer.opacity)
  // exportMap(riversImage.visualize(), layer.name)
  // HACK
  if(options.maxFA) { // large rivers
    var path = 'rivers-large'
    var visibility = false
    var opacity = 1
  } else { // all rivers
    var path = 'rivers'
    var visibility = false
    var opacity = 0.25
  }
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'reservoir-monitor', 
    path: 'map-tiles/' + path, 
    maxZoom: 10, 
    name: path, // + '(cloud)', 
    shown: visibility, 
    opacity: opacity
  })
  // Map.layers().add(layer)
  Map.layers().add(riversLayer)
  var minZoom = 0
  var maxZoom = 25
  if(options) {
    if(options.minZoom) {
      minZoom = options.minZoom
    }
    if(options.maxZoom) {
      maxZoom = options.maxZoom
    }
  }
  function upateVisibility(layer, zoom, minZoom, maxZoom) {
    if(!(options && options.autoToggle)) {
      return
    }
    if(zoom < minZoom || zoom > maxZoom) {
      if(layer.getShown()) {
        layer.setShown(false)
      }
    } else {
      if(!layer.getShown()) {
        layer.setShown(true)
      }
    }
  }
  Map.onChangeZoom(function(zoom) {
    // upateVisibility(riversLayer, zoom, minZoom, maxZoom)
  })
  upateVisibility(riversLayer, Map.getZoom(), minZoom, maxZoom)
  return riversImage
}
function addRiversFromMapTiles() {
  var name = 'rivers-large-gte100' //if(['water-occurrence', 'reservoirs', 'dams', 'rivers-large-gte1', 'rivers-large-gte100'].indexOf(name) >= 0) {
    var maxZoom = 12
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'reservoir-monitor', 
    path: 'map-tiles-z12/' +name, 
    maxZoom: maxZoom, 
    name: name, // + '(cloud)', 
    shown: true, 
    opacity: 0.5
  })
  Map.layers().add(layer)
  var name = 'rivers-large-gte1' //if(['water-occurrence', 'reservoirs', 'dams', 'rivers-large-gte1', 'rivers-large-gte100'].indexOf(name) >= 0) {
  var maxZoom = 12
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'reservoir-monitor', 
    path: 'map-tiles-z12/' +name, 
    maxZoom: maxZoom, 
    name: name, // + '(cloud)', 
    shown: true, 
    opacity: 0.5
  })
  Map.layers().add(layer)
}