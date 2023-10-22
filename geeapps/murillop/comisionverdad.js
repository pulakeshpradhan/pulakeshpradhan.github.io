var sen = ui.import && ui.import("sen", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "nir",
          "swir1",
          "red"
        ],
        "min": 218.54000000000002,
        "max": 3844.46,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["nir","swir1","red"],"min":218.54000000000002,"max":3844.46,"gamma":1},
    water = ui.import && ui.import("water", "image", {
      "id": "JRC/GSW1_0/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    sentinel = ui.import && ui.import("sentinel", "image", {
      "id": "users/murillop/Amazon-Andes/sentinel2018"
    }) || ee.Image("users/murillop/Amazon-Andes/sentinel2018"),
    PA5 = ui.import && ui.import("PA5", "table", {
      "id": "users/murillop/COL_cartography/PA_5"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/PA_5"),
    s = ui.import && ui.import("s", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir2",
          "nir",
          "green"
        ],
        "min": 509.48,
        "max": 3316.52,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["swir2","nir","green"],"min":509.48,"max":3316.52,"gamma":1},
    muni = ui.import && ui.import("muni", "table", {
      "id": "users/murillop/COL_cartography/municipios"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/municipios"),
    depa = ui.import && ui.import("depa", "table", {
      "id": "users/murillop/COL_cartography/departamentos"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/departamentos"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/murillop/CH3/Colombia_1998_2008"
    }) || ee.Image("users/murillop/CH3/Colombia_1998_2008"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/murillop/CH3/Colombia_2005_2018"
    }) || ee.Image("users/murillop/CH3/Colombia_2005_2018"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    st = ui.import && ui.import("st", "table", {
      "id": "users/murillop/Amazon-Andes/study_Area_final"
    }) || ee.FeatureCollection("users/murillop/Amazon-Andes/study_Area_final"),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/murillop/CH3/Colombia_1984_1994"
    }) || ee.Image("users/murillop/CH3/Colombia_1984_1994"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/murillop/CH3/Colombia_1991_2001"
    }) || ee.Image("users/murillop/CH3/Colombia_1991_2001"),
    ucdp = ui.import && ui.import("ucdp", "table", {
      "id": "users/murillop/CH2/UCDP"
    }) || ee.FeatureCollection("users/murillop/CH2/UCDP"),
    control = ui.import && ui.import("control", "table", {
      "id": "users/murillop/Amazon-Andes/FARC2013_WGS84"
    }) || ee.FeatureCollection("users/murillop/Amazon-Andes/FARC2013_WGS84"),
    ZRC = ui.import && ui.import("ZRC", "table", {
      "id": "users/murillop/CH2/ZRC_constituidas"
    }) || ee.FeatureCollection("users/murillop/CH2/ZRC_constituidas"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.94670405499915,
                2.9635573717676675
              ],
              [
                -75.52415906269766,
                2.206241320055651
              ],
              [
                -75.63670314079718,
                2.034712049698138
              ],
              [
                -76.07876199149439,
                1.6709894303534178
              ],
              [
                -76.69903081137255,
                2.069022328503492
              ],
              [
                -77.06162193131365,
                1.3166421832881452
              ],
              [
                -77.71527471486911,
                0.7207570714224131
              ],
              [
                -77.52573245295866,
                0.36789706665262495
              ],
              [
                -77.00662792800807,
                0.2347441091420465
              ],
              [
                -76.60562475426099,
                0.17432655860988056
              ],
              [
                -76.26779659247177,
                0.2649652300755995
              ],
              [
                -75.42459277413741,
                -0.16074792685047623
              ],
              [
                -75.13345713410848,
                -0.13877643462083675
              ],
              [
                -74.85330300697763,
                -0.3694822791820482
              ],
              [
                -74.38638388176639,
                -0.5946915406854928
              ],
              [
                -73.81509619487491,
                -0.44638109500535694
              ],
              [
                -73.40037739203365,
                -0.5851220171980359
              ],
              [
                -72.9691621536976,
                -0.6798891459026304
              ],
              [
                -72.62995346281684,
                -0.7142033846550466
              ],
              [
                -72.24130812882015,
                -0.6551136974052111
              ],
              [
                -72.10259860769884,
                -0.4597711937786727
              ],
              [
                -71.9886114910172,
                -0.34682256230273734
              ],
              [
                -71.68923521094399,
                -0.24176714495469562
              ],
              [
                -71.59036560192993,
                -0.05912257197555785
              ],
              [
                -71.21820323390085,
                0.03975416776133811
              ],
              [
                -71.41732890763211,
                0.2265209271802034
              ],
              [
                -71.6755065315561,
                0.34462259512259164
              ],
              [
                -71.95703269838748,
                0.6851745919020752
              ],
              [
                -71.46676207355597,
                1.0806454544558861
              ],
              [
                -71.42557460342033,
                1.4609396323267594
              ],
              [
                -71.20583095140586,
                1.660006253017549
              ],
              [
                -70.86526643490953,
                1.8631713945674442
              ],
              [
                -70.56861911554932,
                1.8878598695365465
              ],
              [
                -70.11133722807358,
                2.0416002814920824
              ],
              [
                -69.92865818198044,
                2.1678289963533497
              ],
              [
                -70.01737080295408,
                2.316581621516338
              ],
              [
                -70.13631685916937,
                2.306145001514965
              ],
              [
                -70.38521380480341,
                2.3071876906657702
              ],
              [
                -70.59189807027053,
                2.369602285513398
              ],
              [
                -70.67023746762789,
                2.5273408385608374
              ],
              [
                -70.87966543636003,
                2.612389555757206
              ],
              [
                -70.47110509065959,
                2.790717969441385
              ],
              [
                -70.49445148887946,
                2.8620542033729324
              ],
              [
                -71.80458312660983,
                2.958071343901126
              ],
              [
                -72.26853069315911,
                2.8886607816474297
              ],
              [
                -72.69935731374596,
                2.6873783234126982
              ],
              [
                -72.78102455846135,
                2.833423527342249
              ],
              [
                -73.24655292390162,
                3.001961831508368
              ],
              [
                -73.65305116200875,
                3.0239042532577267
              ],
              [
                -73.94419250419844,
                3.402339697088871
              ],
              [
                -74.24082682393032,
                3.432498020679129
              ],
              [
                -74.52098068729288,
                3.243302413692388
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-74.94670405499915, 2.9635573717676675],
          [-75.52415906269766, 2.206241320055651],
          [-75.63670314079718, 2.034712049698138],
          [-76.07876199149439, 1.6709894303534178],
          [-76.69903081137255, 2.069022328503492],
          [-77.06162193131365, 1.3166421832881452],
          [-77.71527471486911, 0.7207570714224131],
          [-77.52573245295866, 0.36789706665262495],
          [-77.00662792800807, 0.2347441091420465],
          [-76.60562475426099, 0.17432655860988056],
          [-76.26779659247177, 0.2649652300755995],
          [-75.42459277413741, -0.16074792685047623],
          [-75.13345713410848, -0.13877643462083675],
          [-74.85330300697763, -0.3694822791820482],
          [-74.38638388176639, -0.5946915406854928],
          [-73.81509619487491, -0.44638109500535694],
          [-73.40037739203365, -0.5851220171980359],
          [-72.9691621536976, -0.6798891459026304],
          [-72.62995346281684, -0.7142033846550466],
          [-72.24130812882015, -0.6551136974052111],
          [-72.10259860769884, -0.4597711937786727],
          [-71.9886114910172, -0.34682256230273734],
          [-71.68923521094399, -0.24176714495469562],
          [-71.59036560192993, -0.05912257197555785],
          [-71.21820323390085, 0.03975416776133811],
          [-71.41732890763211, 0.2265209271802034],
          [-71.6755065315561, 0.34462259512259164],
          [-71.95703269838748, 0.6851745919020752],
          [-71.46676207355597, 1.0806454544558861],
          [-71.42557460342033, 1.4609396323267594],
          [-71.20583095140586, 1.660006253017549],
          [-70.86526643490953, 1.8631713945674442],
          [-70.56861911554932, 1.8878598695365465],
          [-70.11133722807358, 2.0416002814920824],
          [-69.92865818198044, 2.1678289963533497],
          [-70.01737080295408, 2.316581621516338],
          [-70.13631685916937, 2.306145001514965],
          [-70.38521380480341, 2.3071876906657702],
          [-70.59189807027053, 2.369602285513398],
          [-70.67023746762789, 2.5273408385608374],
          [-70.87966543636003, 2.612389555757206],
          [-70.47110509065959, 2.790717969441385],
          [-70.49445148887946, 2.8620542033729324],
          [-71.80458312660983, 2.958071343901126],
          [-72.26853069315911, 2.8886607816474297],
          [-72.69935731374596, 2.6873783234126982],
          [-72.78102455846135, 2.833423527342249],
          [-73.24655292390162, 3.001961831508368],
          [-73.65305116200875, 3.0239042532577267],
          [-73.94419250419844, 3.402339697088871],
          [-74.24082682393032, 3.432498020679129],
          [-74.52098068729288, 3.243302413692388]]]),
    ZRC2 = ui.import && ui.import("ZRC2", "table", {
      "id": "users/murillop/CH2/ZRC_2"
    }) || ee.FeatureCollection("users/murillop/CH2/ZRC_2");
//Map.addLayer(st)
print ('UCDP',ucdp.limit(10))
var legui = muni.filter(ee.Filter.inList('NOMBRE_ENT', ['PUERTO LEGUÍZAMO'])) 
var asis = muni.filter(ee.Filter.inList('NOMBRE_ENT', ['PUERTO ASÍS']))
var guzman = muni.filter(ee.Filter.inList('NOMBRE_ENT', ['PUERTO GUZMÁN'])).geometry().simplify(100);
var putu = depa.filter(ee.Filter.inList('DEPARTAMEN', ['PUTUMAYO'])).geometry().simplify(100);
var paya = PA5.filter(ee.Filter.inList('nombre', ['La Paya'])).geometry().simplify(100)
var laperla= ZRC.filter(ee.Filter.inList('NomZonResC', ['PERLA AMAZONICA'])).geometry().simplify(100)
var guaviare = depa.filter(ee.Filter.inList('DEPARTAMEN', ['GUAVIARE'])).geometry().simplify(100)
var pato_balsillas = ZRC2.filter(ee.Filter.inList('NOMBRE',['PATO BALSILLAS'])).geometry().simplify(100)
var losada = ZRC2.filter(ee.Filter.inList('NOMBRE',['LOSADA - PERDIDO'])).geometry().simplify(100)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Zona1 = ee.Geometry.Point([-72.6377, 1.9361]);
var Zona1 = Zona1.buffer(15000) //Calamar
var Zona2 = ee.Geometry.Point([-74.35489, 3.24098]);
var Zona2 = Zona2.buffer(5000) //Uribe
var Zona3 = ee.Geometry.Point([-74.3629, 2.6168]);
var Zona3 = Zona3.buffer(15000) //pICACHOS
var Zona4 = ee.Geometry.Point([-74.9284, 0.2132]);
var Zona4 = Zona4.buffer(15000) //pt LEGUIZAMO
var Zona5 = ee.Geometry.Point([-74.4141, 1.2366]);
var Zona5 = Zona5.buffer(15000)  //yARI
var Zona6 = ee.Geometry.Point([-74.3189, 0.683]);
var Zona6 = Zona6.buffer(15000) //rEMOLINOS
var Zona7 = ee.Geometry.Point([-75.9414, 0.7726]);
var Zona7 = Zona7.buffer(15000) //pT gUZMAN
var Zona8 = ee.Geometry.Point([-74.21604, 2.98965]);
var Zona8 = Zona8.buffer(5000)  //lA JULIA
var Zona9 = legui;
var Zona10 = paya;
var Zona11 = geometry //st;
var Zona12 = laperla;
var Zona13= guaviare
var Zona14 = pato_balsillas
var Zona15 = losada
var countries_PCC3 = countries.filter(ee.Filter.inList('country_na', ['Colombia', 'El Salvador' ,'Nepal', 'Angola', 'Liberia', 'Sierra Leone', 'Indonesia', 'Peru','Sri Lanka', 'Ivory Coast']));
var colombian_poly = countries.filter(ee.Filter.inList('country_na', ['Colombia']));
//Map.addLayer(Zona15)
Map.setCenter(-73.72, 1.257, 7)
var z = ee.FeatureCollection(Zona1).merge(Zona3).merge(Zona4).merge(Zona5).merge(Zona6).merge(Zona7) 
//var z2 = ee.FeatureCollection(Zona5).merge(Zona6).merge(Zona7)
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte()
// Paint the edges with different colors, display.
var zones = empty.paint({
  featureCollection: z,
  color: 'blue',
  width: 2
});
// var zones2 = empty.paint({
//   featureCollection: z2,
//   color: 'blue',
//   width: 2
// });
var park_border = empty.paint({
  featureCollection: guzman,
  color: 'path',
  width: 1
});
var control_FARC = empty.paint({
  featureCollection: control,
  color: 'path',
  width: 1
});
//Map.addLayer(park_border, {}, 'Puerto Guzman');
var sentinel2= sentinel.clip(guzman)
//Map.addLayer(sentinel2, s,  'Sentinel2-2018').setShown(0)
// Algorithm parameters
var params = ee.Dictionary({
     'cloud_score': 80,
     'cfThreshold': .05,
     'consec': 3,
     'thresh': 5,
     'minRMSE': .015,
     'start': '1987-01-01', 
     'end': '2018-12-31',
     'iteration': 1,
     'soil': [2000, 3000, 3400, 5800, 6000, 5800],
     'gv': [500, 900, 400, 6100, 3000, 1000],
     'npv': [1400, 1700, 2200, 3000, 5500, 3000],
     'shade': [0, 0, 0, 0, 0, 0],
     'cloud': [9000, 9600, 8000, 7800, 7200, 6500],
     'forestLabel': 1,
     'minPatch': 10
      })
function makeMask(input, minSize) {
  // Return a mask for patches greater than minSize
  var minPatches = input.connectedPixelCount(minSize, true)
                      .gte(minSize)
  return minPatches
}
// Make a mask where patches are greater than minSize
var minSize = ee.Number.parse(params.get('minPatch'))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 1988-1994
var minSizeMask = makeMask(image.select('dist_1').gt(0), minSize)
//Map.addLayer(minSizeMask, {palette: ['green']}, 'size')
// Change magnitude
var changeMag = image.select('mag_1')
                      .updateMask(minSizeMask).updateMask(image.select('mag_1').gt(13))
// Dates of change
var changeDate = image.select('dist_1')
                    .updateMask(minSizeMask).updateMask(changeMag)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 1995-2004
var minSizeMask2 = makeMask(image2.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag2 = image2.select('mag_1')
                      .updateMask(minSizeMask2).updateMask(image2.select('mag_1').gt(13))
// Dates of change
var changeDate2 = image2.select('dist_1')
                    .updateMask(minSizeMask2).updateMask(changeMag2)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 2002-2008
var minSizeMask3 = makeMask(image3.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag3= image3.select('mag_1')
                      .updateMask(minSizeMask3).updateMask(image3.select('mag_1').gt(13))
// Dates of change
var changeDate3 = image3.select('dist_1')
                    .updateMask(minSizeMask3).updateMask(changeMag3)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 2009-2018
var minSizeMask4 = makeMask(image4.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag4= image4.select('mag_1')
                      .updateMask(minSizeMask4).updateMask(image4.select('mag_1').gt(13))
// Dates of change
var changeDate4 = image4.select('dist_1')
                    .updateMask(minSizeMask4).updateMask(changeMag4)//.updateMask(occurrence.neq(1))
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Water 
var dataset = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = dataset.select('occurrence');
var occurrenceVis = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', '6a5acd', '523ae6', '0000ff'],
};
Map.addLayer(occurrence.clip(st), occurrenceVis, 'Rios');
////////////////////////////////////////////////////////////////////////////////////////////////////////
var colombia = changeDate.addBands(changeDate2).addBands(changeDate3).addBands(changeDate4)
colombia = ee.ImageCollection([changeDate,changeDate2,changeDate3,changeDate4])
var colombia_combo = colombia.max().updateMask(occurrence.unmask().lt(1)).clip(geometry);
//finds all of the connected pixels in an 8-way connections
var patches = colombia_combo.connectedPixelCount(1024, true);
//assignes each connected patch (by a square kernal) a unique ID
var connected = patches.connectedComponents(ee.Kernel.square(3), 256);
//selects the connected patches that have more than 22 pixels (22 pixels x 900m2 = 19,800 m2, 200m2 short of 2ha)
var forest_connected_twotwo = connected.select('dist_1').gte(11);
//REMOVE UNNEEDED PIXELS!!!! vectorizing will take forever if you don't mask out the unused pixels
var change_1988_2018 = colombia_combo.updateMask(forest_connected_twotwo);
// loos total
var loss = change_1988_2018.lt(1988).updateMask(change_1988_2018).lt(1988)
//Map.addLayer(loss, {}, 'loss')
var lossAreaImage = loss.multiply(ee.Image.pixelArea()).divide(10000);
//Map.addLayer(lossAreaImage, {}, 'loss1')
Map.addLayer(colombia_combo, {min: 1988, 
                            max: 2018, 
                          // palette: ['#0000ff','#392cf7','#4f43ee','#5c57e6','#6569dd','#6b7ad4','#6f8ccb','#709bc2','#6eacb8','#6abdaf','#61cea4','#55de99','#3fee8c','#00ff7f']}, 'Change date').setShown(0);
                            palette: ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99']}, 'Perturbaciones 1988-2018');                         
// Map.addLayer(change_1988_2018, {min: 1988, 
//                             max: 2018, 
//                           // palette: ['#0000ff','#392cf7','#4f43ee','#5c57e6','#6569dd','#6b7ad4','#6f8ccb','#709bc2','#6eacb8','#6abdaf','#61cea4','#55de99','#3fee8c','#00ff7f']}, 'Change date').setShown(0);
//                             palette: ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99']}, 'Disturbance 1988-2018 [filtered but slow]');                          
Map.addLayer(zones, {palette:'green'}, 'Zonas en detalle');
//Map.addLayer(zones2, {palette:'red'}, 'Zonas in process... (dangerous)');
var ucdp_col = ucdp.filter(ee.Filter.inList('country',['Colombia']))
//Map.addLayer(ucdp_col, {palette:'blue'}, 'Battles-UCDP')
Map.addLayer(control_FARC, {}, 'FARC Control Territorial en 2013')
Export.image.toDrive({
  image: change_1988_2018,
  description: 'coded_4departments',
  scale: 30,
  maxPixels: 1e13,
  folder:'coded',
  })
///////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona1= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona1,
  scale: 30,
  maxPixels: 1e9
});
var statsFormatted_Zona1 = ee.List(lossByYear_Zona1.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona1 = ee.Dictionary(statsFormatted_Zona1.flatten());
//print(statsDictionary);
//////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona3= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona3,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_Zona3 = ee.List(lossByYear_Zona3.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona3 = ee.Dictionary(statsFormatted_Zona3.flatten());
//////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona4= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona4,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_Zona4 = ee.List(lossByYear_Zona4.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona4 = ee.Dictionary(statsFormatted_Zona4.flatten());
//////////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona5= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona5,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_Zona5 = ee.List(lossByYear_Zona5.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona5 = ee.Dictionary(statsFormatted_Zona5.flatten());
///////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona6= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona6,
  scale: 30,
  maxPixels: 1e9
});
var statsFormatted_Zona6 = ee.List(lossByYear_Zona6.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona6 = ee.Dictionary(statsFormatted_Zona6.flatten());
//////////////////////////////////////////////////////////////////////////////
var lossByYear_Zona7= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona7,
  scale: 30,
  maxPixels: 1e9
});
var statsFormatted_Zona7 = ee.List(lossByYear_Zona7.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona7 = ee.Dictionary(statsFormatted_Zona7.flatten());
//////////////////////////////////////////////////////////////////////////
//Todo el area
var lossByYear_Zona11= lossAreaImage.addBands(change_1988_2018).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Zona11,
  scale: 30,
  maxPixels: 1e9
});
var statsFormatted_Zona11 = ee.List(lossByYear_Zona11.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_Zona11= ee.Dictionary(statsFormatted_Zona11.flatten());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map.addLayer(Zona1, {color:'green'}, 'Zona 1', true, 0.8)
// Map.addLayer(Zona2, {color:'green'}, 'Zona 2', true, 0.8)
// Map.addLayer(Zona3, {color:'green'}, 'Zona 3', true, 0.8)
// Map.addLayer(Zona4, {color:'green'}, 'Zona 4', true, 0.8)
// Map.addLayer(Zona5, {color:'green'}, 'Zona 1', true, 0.8)
// Map.addLayer(Zona6, {color:'green'}, 'Zona 2', true, 0.8)
// Map.addLayer(Zona7, {color:'green'}, 'Zona 3', true, 0.8)
// Map.addLayer(Zona8, {color:'green'}, 'Zona 4', true, 0.8)
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
//panel.style().set({position: 'bottom-right'});
//panel.style().set('backgroundColor', '#fa9fb5');
panel.style().set('width', '650px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Zonas a visitar',
    style: {fontSize: '20px', fontWeight: 'bold', color: '7a0177', position: 'bottom-right' }//) , backgroundColor: '#225ea8'}
  }),
  ui.Label({
    value: 'Deforestacion 1988-2018',
    style: {fontSize: '12px', fontWeight: 'bold', color: '7a0177', position: 'bottom-right'}//, backgroundColor: '#225ea8'}
  })
]);
panel.add(intro);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var chart_Zona1 = ui.Chart.array.values({
  array: statsDictionary_Zona1.values(),
  axis: 0,
  xLabels: statsDictionary_Zona1.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Guavire-Calamar',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},  
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(2, chart_Zona1);  
//print(chart);
// var chart_Zona2 = ui.Chart.array.values({
//   array: statsDictionary_Zona2.values(),
//   axis: 0,
//   xLabels: statsDictionary_Zona2.keys()
// }).setChartType('ColumnChart')
//   .setOptions({
//     title: 'La uribe-PA',
//     hAxis: {title: 'Año', format: '####'},
//     vAxis: {title: 'Area (Hectareas)'},
//     legend: { position: "none" },
//     lineWidth: 1,
//     pointSize: 3
//   });
//   panel.widgets().set(3, chart_Zona2);  
// //print(chart);
var chart_Zona3 = ui.Chart.array.values({
  array: statsDictionary_Zona3.values(),
  axis: 0,
  xLabels: statsDictionary_Zona3.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Picachos',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(4, chart_Zona3);  
//print(chart);
var chart_Zona4 = ui.Chart.array.values({
  array: statsDictionary_Zona4.values(),
  axis: 0,
  xLabels: statsDictionary_Zona4.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Pt Leguizamo',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(5, chart_Zona4);  
//print(chart);
var chart_Zona5 = ui.Chart.array.values({
  array: statsDictionary_Zona5.values(),
  axis: 0,
  xLabels: statsDictionary_Zona5.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Candilejas- Sabanas del Yari',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(6, chart_Zona5);
var chart_Zona6 = ui.Chart.array.values({
  array: statsDictionary_Zona6.values(),
  axis: 0,
  xLabels: statsDictionary_Zona6.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Remolinos del Caguan',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(7, chart_Zona6);
var chart_Zona7 = ui.Chart.array.values({
  array: statsDictionary_Zona7.values(),
  axis: 0,
  xLabels: statsDictionary_Zona7.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Pt Guzman',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(8, chart_Zona7);
//Toda el area  
var chart_Zona11 = ui.Chart.array.values({
  array: statsDictionary_Zona11.values(),
  axis: 0,
  xLabels: statsDictionary_Zona11.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Toda el area AATB',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(9, chart_Zona11);  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Legend
var legend = ui.Panel({style: {shown: false, width: '150px'}});
legend.style().set({position: 'bottom-right'});
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});
legendMaps.style().set({position: 'bottom-right'});
legendMaps.add(ui.Label('Año disturbio'));
legendMaps.add(makeRow('#e66101', '1988'));
legendMaps.add(makeRow('#5e3c99', '2018'));
// Set up display
// Map.setOptions('Aubergine', {'Aubergine': Aubergine}).setControlVisibility(false, true, true, true, true, false)
// Map.setOptions('Aubergine', {'Aubergine': Aubergine}).setControlVisibility(false, true, true, true, true, false)
Map.style().set('cursor', 'crosshair');
//Map.setOptions('TERRAIN');
// Add the panels to the ui.root.
Map.add(legend)
Map.add(legendMaps)
// Compute the histogram of the disturbance date 1984-2018
var h_hansen = hansen.select('lossyear')
                  .updateMask(hansen.select('lossyear').gt(0))
var h_hansen = h_hansen.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: Zona13,
  maxPixels: 1e13
});
//print(h_hansen, 'Hansen 1987-2018')
var h4 = ee.Dictionary(h_hansen.get('lossyear')).get('histogram')
var x4 = ee.Dictionary(h_hansen.get('lossyear')).get('bucketMeans')
x4 = ee.List(x4).map(function(v) {return ee.String(v)}) 
var c4 = ui.Chart.array.values(h4, 0, x4)
                .setChartType('ColumnChart')
print(c4)