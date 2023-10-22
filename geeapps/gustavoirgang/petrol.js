var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -125.90165064676296,
                60.44897234819396
              ],
              [
                -125.90165064676296,
                -59.9413765132342
              ],
              [
                53.39522435323704,
                -59.9413765132342
              ],
              [
                53.39522435323704,
                60.44897234819396
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
        [[[-125.90165064676296, 60.44897234819396],
          [-125.90165064676296, -59.9413765132342],
          [53.39522435323704, -59.9413765132342],
          [53.39522435323704, 60.44897234819396]]], null, false),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              -33.955996955228386,
              -5.272736279836493
            ],
            [
              -33.758243048978386,
              -5.119559810483688
            ],
            [
              -33.593448127103386,
              -4.988236444715911
            ],
            [
              -33.285830939603386,
              -4.91709193977653
            ],
            [
              -33.208926642728386,
              -4.91161896933588
            ]
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -33.887241880792885,
              -3.138061123405331
            ],
            [
              -32.39172796477726,
              -3.8672822053367795
            ],
            [
              -32.39172796477726,
              -3.8330274159328153
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiLineString(
        [[[-33.955996955228386, -5.272736279836493],
          [-33.758243048978386, -5.119559810483688],
          [-33.593448127103386, -4.988236444715911],
          [-33.285830939603386, -4.91709193977653],
          [-33.208926642728386, -4.91161896933588]],
         [[-33.887241880792885, -3.138061123405331],
          [-32.39172796477726, -3.8672822053367795],
          [-32.39172796477726, -3.8330274159328153]]]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -32.42997975873834,
            -2.6444053700107344
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-32.42997975873834, -2.6444053700107344]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/gustavoirgang/sismos"
    }) || ee.FeatureCollection("users/gustavoirgang/sismos"),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              -34.66279587336271,
              -6.875525013821833
            ],
            [
              -34.60511765070646,
              -7.112699350663673
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.LineString(
        [[-34.66279587336271, -6.875525013821833],
         [-34.60511765070646, -7.112699350663673]]),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/gustavoirgang/derrame_19_07"
    }) || ee.FeatureCollection("users/gustavoirgang/derrame_19_07");
  var table = ee.FeatureCollection("users/gustavoirgang/BLOCOS_EXPLORATORIOS_030417");
 var des = ee.FeatureCollection("users/gustavoirgang/wellshp_development");
  var  explo = ee.FeatureCollection("users/gustavoirgang/wellshp_exploration");
var campos = ee.FeatureCollection("users/gustavoirgang/Blocos_setores_campos");
 var bacias = ee.FeatureCollection("users/gustavoirgang/Bacias_Sedimentares");
 var  dutovias = ee.FeatureCollection("users/gustavoirgang/Dutovias");
    var cabotagem  = ee.FeatureCollection("users/gustavoirgang/LinhasCabotagem");
    var portos = ee.FeatureCollection("users/gustavoirgang/Portos");
     var sismos = ee.FeatureCollection("users/gustavoirgang/sismos2");
     var Navios = ee.FeatureCollection("users/gustavoirgang/Navios");
    var ZEE = ee.FeatureCollection("users/gustavoirgang/ZEE");
    var cenarios = ee.FeatureCollection("users/gustavoirgang/Cenarios");
    var rotas = ee.FeatureCollection("users/gustavoirgang/rotas");
    var derrame_1907 = ee.FeatureCollection("users/gustavoirgang/derrame_19_07");
    var geometry22 = /* color: #98ff00 */ee.Geometry.LineString(
        [[-36.40437869361739, -4.434399436111724],
         [-35.60031680396895, -4.760874965277091]]);
         var geometry3 = /* color: #d63000 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              -36.732648195359786,
              -4.303339099540569
            ],
            [
              -36.639264406297286,
              -4.337573812393465
            ],
            [
              -36.501935304734786,
              -4.390976861920584
            ],
            [
              -36.41541797075041,
              -4.404669337774724
            ],
            [
              -36.348126710984786,
              -4.448483562924844
            ],
            [
              -36.30006152543791,
              -4.469020585285324
            ],
            [
              -36.21766406450041,
              -4.505985773957756
            ],
            [
              -36.153119386766036,
              -4.547056000989697
            ],
            [
              -36.078961671922286,
              -4.593599426986808
            ],
            [
              -35.99793750200041,
              -4.620976495883699
            ],
            [
              -35.90455371293791,
              -4.6155011664877525
            ],
            [
              -35.842755617234786,
              -4.645614954096231
            ],
            [
              -35.76173144731291,
              -4.689414528958875
            ],
            [
              -35.655988039109786,
              -4.738685766657314
            ]
          ],
          "geodesic": true
        }
      ],
      "coordinates": []
    });
// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection('COPERNICUS/S1_GRD');
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
// Run this function on a change of the dateSlider.
/////////////////////------------ FUNCTIONS -------------//////////////////////
// Angle correction function
function sarAngleCorrection(image) {
return image.select('V.|H.').subtract(image.select('angle').multiply(Math.PI/180.0).pow(2).cos().log10().multiply(10.0));
}
// Backtransform to Digital Number (dn)
// note that multiplying it 10k is purely for human-readability but also for casting to interger
function toNatural (image){
return (ee.Image(10).pow(image.divide(10))).multiply(10000);
}
// function maskLowEntropy(image) {
// var bad = image.select(0).multiply(10000).toInt().entropy(ee.Kernel.circle(5)).lt(3.2)
// return image.updateMask(image.mask().multiply(bad.focal_max(5).not()))
// }
// function maskEdge(image) {
// var mask = image.select(0).unitScale(-25, 5).multiply(255).toByte().connectedComponents(ee.Kernel.rectangle(1,1), 100);
// return image.updateMask(mask.select(0));
// }
// function clipEdge(image){
// var geometry = image.geometry()
// var edgeClippedImage = image.clip(image.geometry().buffer(-3000))
// return edgeClippedImage
// }
//////////////////////------------ COMPOSITE -------------//////////////////////
//Create geometry object encompassing area of interest
// Function to filter out windy days using climate forecasts
//var pctWat = function(image){
// var d = image.date().format('Y-M-d');
 var wx = ee.ImageCollection('HYCOM/sea_water_velocity')
 .filterDate(range.start(), range.end());
// .filter(ee.Filter.eq('start_hour',06));
 var vWind = wx.select(['velocity_v_0']);
 var a = vWind.max();
 var uWind = wx.select(['velocity_u_0']);
 var b = uWind.max();
 var a = a.pow(2);
 var b = b.pow(2);
 var ab = a.add(b);
 var ws0 = ab.sqrt();
 var ws1 = ws0.multiply(3.6);
 var ws2 = ws1.select(['velocity_v_0']).gt(0);
 var ws = ws1.multiply(ws2);
// return image.updateMask(ws.lt(12));
//};
// Apply windy day filter to image collection
//var s1pol = s1pol.map(pctWat);
 var wy = ee.ImageCollection('HYCOM/sea_water_velocity')
 .filterDate(range.start(), range.end());
 var vWind = wy.select(['velocity_v_0']);
 var a = vWind.mode();
 var uWind = wy.select(['velocity_u_0']);
 var b = uWind.mode();
 var abT = b.atan2(a);
 var abD = abT.multiply((180/3.1416));
 // var abDd = abD.divide(180)
 var abDir = abD.add(180)
 var ws2 = abDir.select(['velocity_u_0']).gt(100);
  var ws = ws1.multiply(ws2);
var precipvis2 = {
  min: 0,
  max: 2000,
   opacity: 0.85,
  palette: ['000000', 'FFFFFF']
};
var precipvis = {
  min: 0,
  max: 360,
   opacity: 0.85,
  palette: ['000000','990000', 'FFFFFF', '0000FF']
};
// Display results in map window
range.start().get('month').evaluate(function(name) {
   var vhVizParam2 = {"opacity":0.8,"bands":['velocity_v_0'],palette: ['000000', 'FFFFFF'],"min": 0 ,"max": 2000}
//Map.addLayer(ws1, precipvis2,  name + "Velociade Corrente");
 var layer3 = ui.Map.Layer(ws1, vhVizParam2,  name + " Velociade da Corrente",false);
Map.layers().set(1, layer3)
 var vhVizParam3 = {"opacity":0.8,"bands":['velocity_u_0'],palette: ['FFFFFF','888800','880000', '000000', '000077','007777','FFFFFF'], "min": 0 ,"max": 360}
//Map.addLayer(abDir, precipvis,  name + "Rireção Corrente");
 var layer4 = ui.Map.Layer(abDir, vhVizParam3,  name + " Direção da Corrente",false);
Map.layers().set(2, layer4)
  });
  range.start().get('month').evaluate(function(name) {
var dataset3 = ee.ImageCollection('HYCOM/sea_surface_elevation')
                  .filterDate(range.start(), range.end())
                ;
var surfaceElevation = dataset.select('surface_elevation',false);
var surfaceElevationVis = {
  min: -2000.0,
  max: 2000.0,
  palette: ['blue', 'cyan', 'yellow', 'red'],
};
//Map.addLayer(surfaceElevation, surfaceElevationVis, 'Surface Elevation');  
var vhVizParam5 = {"opacity":0.8,"bands":['surface_elevation'],palette: ['blue', 'cyan', 'yellow', 'red'],"min": -2000 ,"max": 1500}
//Map.addLayer(ws1, precipvis2,  name + "Velociade Corrente");
 var layer6 = ui.Map.Layer(dataset3, vhVizParam5,  name + " Altura da Maré",false);
Map.layers().set(3, layer6)
  });  
//Imagen para SENTINEL 3
var IMGSentinel3= ee.ImageCollection ('COPERNICUS/S3/OLCI') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro = ee.Image(IMGSentinel3.min());
var Conversion = IMGSentinel3.select(['Oa07_radiance', 'Oa06_radiance', 'Oa03_radiance'])
              .min()
              .multiply(ee.Image([1, 1, 1]));
var Sentinel3Clip = Conversion.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam2 = {"opacity":1,"bands":['Oa07_radiance', 'Oa06_radiance', 'Oa03_radiance'],"min": -5 ,"max": 25,"gamma":0.4}
    var layer2 = ui.Map.Layer(Sentinel3Clip, vhVizParam2, name + ' Minimum Sentinel 3',false);
    Map.layers().set(4, layer2);
  });
var inputCollection = collection
.filterBounds(aoi)
.filterMetadata('instrumentMode', 'equals', 'IW')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('resolution','H'))
.filterDate(range.start(), range.end())
//.map(sarAngleCorrection) .map(toNatural)
.min() // note the median reducer is applied after angle corr. & DN functions applied
.int() // to save space
.select('VH','VV')
.clip(aoi)
print(inputCollection)
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('month').evaluate(function(name) {
    var vhVizParam = {"opacity":0.8,"bands":["VH"],"min": -30 ,"max": 0,"gamma":0.8}
 var vhVizParam9 = {"opacity":0.8,"bands":["VV"],"min": -30 ,"max": 0,"gamma":0.8}
    var layer = ui.Map.Layer(inputCollection, vhVizParam, name + ' Radar VH Minimum Composite',false);
    var layer9 = ui.Map.Layer(inputCollection, vhVizParam9, name + ' Radar VV Minimum Composite');
    Map.layers().set(5, layer).set(6, layer9);
  });
// Use a DateSlider to create annual composites of this collection.
var collection10 = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection10.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
  var mosaic10 = ee.Algorithms.Landsat.simpleComposite({
    collection: collection10.filterDate(range.start(), range.end())
  });
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('month').evaluate(function(name) {
    var visParams10 = {bands: ['B4', 'B3', 'B2'],min: -20 ,max: 40,gamma:1};
    var layer10 = ui.Map.Layer(mosaic10, visParams10, name + ' Landsat8 composite 30m',false);
    Map.layers().set(7, layer10);
  });
//Imagen para SENTINEL 3
var IMGSentinel11= ee.ImageCollection ('MODIS/006/MYD09GA') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro11 = ee.Image(IMGSentinel11.min());
var Conversion11 = IMGSentinel11.select(['sur_refl_b01', 'sur_refl_b02', 'sur_refl_b03'])
              .min()
              .multiply(ee.Image([1, 2, 1]));
var Sentinel3Clip11 = Conversion11.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam11 = {"opacity":1,"bands":['sur_refl_b01', 'sur_refl_b02', 'sur_refl_b03'],"min": -30 ,"max": 50,"gamma":1}
    var layer11 = ui.Map.Layer(Sentinel3Clip11, vhVizParam11, name + ' Aqua Surface Reflectance Daily 500m',false);
    Map.layers().set(9, layer11);
  });
//Imagen para MODIS/006/MYD09GQ
var IMGSentinel12= ee.ImageCollection ('MODIS/006/MYD09GQ') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro12 = ee.Image(IMGSentinel12.mean());
var Conversion12 = IMGSentinel12.select(['sur_refl_b02'])
              .mean()
              .multiply(ee.Image([1]));
var Sentinel3Clip12 = Conversion12.clip (aoi);//.focal_median(400, 'circle', 'meters');
 range.start().get('month').evaluate(function(name) {
 var vhVizParam12 = {"opacity":1,"bands":['sur_refl_b02'],"min": -20 ,"max": 50,"gamma":1}
    var layer12 = ui.Map.Layer(Sentinel3Clip12, vhVizParam12, name + ' Aqua Surface Reflectance Daily 250m',false);
    Map.layers().set(8, layer12);
  });
                   //Imagen para SENTINEL 2
var IMGSentinel13= ee.ImageCollection ('COPERNICUS/S2_SR') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro13 = ee.Image(IMGSentinel13.min());
var Conversion13 = IMGSentinel13.select(['TCI_R', 'TCI_G', 'TCI_B'])
              .min()
              .multiply(ee.Image([1, 1, 1]));
var Sentinel3Clip13 = Conversion13.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam13 = {"opacity":1,"bands":['TCI_R', 'TCI_G', 'TCI_B'],"min": -20 ,"max": 60,"gamma":1}
    var layer13 = ui.Map.Layer(Sentinel3Clip13, vhVizParam13, name + ' Sentinel 2 Surface Reflectance Daily 10m',false);
    Map.layers().set(10, layer13);
});
                 //Imagen para SENTINEL 2
var IMGSentinel14= ee.ImageCollection ('LANDSAT/LE07/C01/T1_SR') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro14 = ee.Image(IMGSentinel14.min());
var Conversion14 = IMGSentinel14.select(['B3', 'B2', 'B1'])
              .min()
              .multiply(ee.Image([0.1, 0.1, 0.1]));
var Sentinel3Clip14 = Conversion14.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam14 = {"opacity":0.8,"bands":['B3', 'B2', 'B1'],"min": -10 ,"max": 60,"gamma":1.6}
    var layer14 = ui.Map.Layer(Sentinel3Clip14, vhVizParam14, name + ' Landsat7 Surface Reflectance Daily 30m',false);
    Map.layers().set(11, layer14);
});
                 //Imagen para SENTINEL 2
var IMGSentinel15= ee.ImageCollection ('VITO/PROBAV/C1/S1_TOC_100M') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro15 = ee.Image(IMGSentinel15.min());
var Conversion15 = IMGSentinel15.select(['RED', 'SWIR','BLUE'])
              .min()
              .multiply(ee.Image([1, 1, 1]));
var Sentinel3Clip15 = Conversion15.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam15 = {"opacity":1,"bands":['RED','SWIR','BLUE'],"min": -10 ,"max": 60,"gamma":1.06}
    var layer15 = ui.Map.Layer(Sentinel3Clip15, vhVizParam15, name + ' VITO/PROBAV/C1/S1_TOC_100M',false);
    Map.layers().set(12, layer15);
});
                 //Imagen para SENTINEL 2
var IMGSentinel17= ee.ImageCollection ('NOAA/VIIRS/001/VNP09GA') 
  .filterDate(range.start(), range.end()); //fechas disponibles ('2016-10-18' - actualidad)
var Sentinel3Filtro17 = ee.Image(IMGSentinel17.min());
var Conversion17 = IMGSentinel17.select(['I2', 'I3', 'I1'])
              .min()
              .multiply(ee.Image([1, 1, 1]));
var Sentinel3Clip17 = Conversion17.clip (aoi);
 range.start().get('month').evaluate(function(name) {
 var vhVizParam17 = {"opacity":1,"bands":['I2', 'I3', 'I1'],"min": -10 ,"max": 300,"gamma":1.06}
    var layer17 = ui.Map.Layer(Sentinel3Clip17, vhVizParam17, name + ' NOAA/VIIRS/001/VNP09GA_500M', false);
    Map.layers().set(13, layer17);
});
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 1,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue( '2019-07-24')); //.setValue(now));
});
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
Map.addLayer(portos.draw('000000',5), {"opacity":0.5}, 'Portos',false)
var text = require('users/gena/packages:text')
// scale text font relative to the current map scale
var scale = Map.getScale() * 0.06
var sismo_data = sismos.map(function(feat) {
  feat = ee.Feature(feat)
  var name = ee.String(feat.get("ano"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid, scale, {
    fontSize:18, 
    textColor:'red',
    outlineWidth: 1,
    outlineColor: 'red'
  })
  return t
})
sismo_data = ee.ImageCollection(sismo_data)
//Map.addLayer(sismo_data)
Map.addLayer(sismos.draw('886600',2), {"opacity":0.7}, 'Sismos USP',false)
Map.addLayer(Navios.draw('775555',5), {"opacity":0.7}, 'Navios Vadios skytruth')
Map.addLayer(cabotagem.draw('555555',2), {"opacity":0.5}, 'Rota de Cabotagem',false)
Map.addLayer(dutovias.draw('000000',2), {"opacity":0.7}, 'Dutovias',false)
Map.addLayer(derrame_1907, {"opacity":0.7}, 'Derrame comprovado PB 19/07/2019 RADAR')
Map.addLayer(geometry22, {"opacity":0.7}, 'Derrame comprovado RN 24/07/2019 RADAR')
Map.addLayer(geometry3, {"opacity":0.7}, 'Derrame comprovado RN 24/07/2019 MODIS')
Map.addLayer(rotas.draw('005588',3), {"opacity":0.5}, 'Rotas Marítimas',false)
Map.addLayer(cenarios.draw('883333',1), {"opacity":0.6}, 'Cenários Origem ',false)
Map.addLayer(ZEE.draw('FFFF00',1), {"opacity":0.3}, 'Zone Econômica Exclusiva',false)
Map.addLayer(campos.draw('FFFF00',1), {"opacity":0.3}, 'Blocos Exploração Rodadas',false)
Map.addLayer(bacias.draw('00FFFF',1), {"opacity":0.2}, 'Bacias Sedimentares',false)
Map.addLayer(des.draw('0000FF',2), {"opacity":0.5}, 'Poços em desenvolvimento',false)
Map.addLayer(explo.draw('FF0000',2), {"opacity":0.5}, 'Poços em exploração',false)
Map.centerObject(cenarios, 6);
var dataset = ee.FeatureCollection('WCMC/WDPA/current/polygons');
var visParams = {
  palette: ['2ed033', '5aff05', '67b9ff', '5844ff', '0a7618', '2c05ff'],
  min: 0.0,
  max: 1550000.0,
  opacity: 0.6,
};
var image = ee.Image().float().paint(dataset, 'REP_AREA');
Map.addLayer(image, visParams, 'WCMC/WDPA/current/polygons',false);
var datasete = ee.Image('NOAA/NGDC/ETOPO1');
var elevation = dataset.select('bedrock');
var elevationVis = {
  min: -7000.0,
  max: 0.0,
  palette: ['000000', 'FFFFFF'],
};
//Map.addLayer(elevation, elevationVis, 'Elevation');
 var vhVizParam3 = {"opacity":0.8,"bands":['bedrock'], palette: ['000000', 'FFFFFF'], "min": -5000 ,"max": 0,}
    var layer4 = ui.Map.Layer(datasete, vhVizParam3, 'Batimetria',false);
Map.layers().set(0, layer4)
// Map.layers().set(0, elevation, elevationVis, 'Elevation')//.set(3, bacias).set(4, campos).set(5, cenarios).set(6, portos).set(7, cabotagem).set(8, rotas).set(9, dutovias).set(10, portos).set(11, des).set(12, explo);