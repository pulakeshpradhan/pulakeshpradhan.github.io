var ndvi = ui.import && ui.import("ndvi", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_32DAY_NDVI"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_32DAY_NDVI"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 315.7995832901511,
        "max": 320.0663306017856,
        "palette": [
          "1946e9",
          "3dffe4",
          "dbff49",
          "ffc174",
          "ff6419",
          "ff370a",
          "b641ff",
          "e71fff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":315.7995832901511,"max":320.0663306017856,"palette":["1946e9","3dffe4","dbff49","ffc174","ff6419","ff370a","b641ff","e71fff"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 317.51906081257334,
        "max": 318.41327087879813,
        "palette": [
          "1946e9",
          "3dffe4",
          "dbff49",
          "ffc174",
          "ff6419",
          "ff370a",
          "b641ff",
          "e71fff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":317.51906081257334,"max":318.41327087879813,"palette":["1946e9","3dffe4","dbff49","ffc174","ff6419","ff370a","b641ff","e71fff"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 29115.595139933554,
        "max": 29898.947987310166,
        "palette": [
          "1946e9",
          "3dffe4",
          "dbff49",
          "fdff68",
          "ff6419",
          "ff370a",
          "b641ff",
          "e71fff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":29115.595139933554,"max":29898.947987310166,"palette":["1946e9","3dffe4","dbff49","fdff68","ff6419","ff370a","b641ff","e71fff"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 29.12844394148921,
        "max": 29.871853707197026,
        "palette": [
          "1946e9",
          "3dffe4",
          "dbff49",
          "ffc174",
          "ff6419",
          "ff370a",
          "b641ff",
          "e71fff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":29.12844394148921,"max":29.871853707197026,"palette":["1946e9","3dffe4","dbff49","ffc174","ff6419","ff370a","b641ff","e71fff"]},
    ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/jespavon/nogal"
    }) || ee.FeatureCollection("users/jespavon/nogal"),
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 26.24583330892641,
        "max": 26.800045122563485,
        "palette": [
          "1946e9",
          "3dffe4",
          "dbff49",
          "ffc174",
          "ff6419",
          "ff370a",
          "b641ff",
          "e71fff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":26.24583330892641,"max":26.800045122563485,"palette":["1946e9","3dffe4","dbff49","ffc174","ff6419","ff370a","b641ff","e71fff"]},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 26.18744658877807,
        "max": 26.785755296639504,
        "palette": [
          "1451ff",
          "45b2ff",
          "50ffc7",
          "d4ff4e",
          "ffa331",
          "ff2f0e",
          "eb41ff",
          "de29ff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":26.18744658877807,"max":26.785755296639504,"palette":["1451ff","45b2ff","50ffc7","d4ff4e","ffa331","ff2f0e","eb41ff","de29ff"]},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TOCtemp"
        ],
        "min": 11.187446588776998,
        "max": 11.785755296640561,
        "palette": [
          "143bff",
          "2bceff",
          "adff70",
          "ffbe49",
          "ff1f08",
          "bd52ff",
          "e510ff"
        ]
      }
    }) || {"opacity":1,"bands":["TOCtemp"],"min":11.187446588776998,"max":11.785755296640561,"palette":["143bff","2bceff","adff70","ffbe49","ff1f08","bd52ff","e510ff"]};
/*
 var refpoly = ee.Geometry.Polygon(
        [[[-115.9112548828125, 33.04090311724091],
           [-115.32073974609375, 33.03169299978312],
           [-115.3125, 33.22949814144951],
           [-115.9222412109375, 33.23179557851464]]]);
*/
/* Based on: Jimenez-Munoz, J.C.; Cristobal, J.; Sobrino, J.A.; Soria, G.; Ninyerola, M.; Pons, X.; Pons, X., 
             "Revision of the Single-Channel Algorithm for Land Surface Temperature Retrieval 
             From Landsat Thermal-Infrared Data," 
             Geoscience and Remote Sensing, 
             IEEE Transactions on , vol.47, no.1, pp.339,349, Jan. 2009
             doi: 10.1109/TGRS.2008.2007125 */
//---------------------------------------------------------------------------------------------------------
//---------------------------------------Joining Collections-----------------------------------------------
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
//var layers = mapPanel.layers();
//layers.add(compositeLayer, '2020 Composite');
mapPanel.centerObject(ROI, 13);
function filterCollection(imgcoll, start_date, end_date, ROI){
  return imgcoll.filterDate(start_date, end_date)
                .filterBounds(ROI); //using the polygon only would go bananas
                // .filter(ee.Filter.lt('CLOUD_COVER', 10));
}
// Return a Landsat 8 calibrated radiance collection with only thermal (radiative temp).
// Collection is filtered by given dates and by given polygon.
function getLandsatRAD(startdate, enddate, ROI){
  var radcoll = filterCollection(ee.ImageCollection("LANDSAT/LC08/C01/T1"), start_date, end_date, ROI);
  return radcoll.map(function(img){
        return ee.Algorithms.Landsat.calibratedRadiance(img)
                .select(['B10'], ['B11'])
                .set({'system:time_start':img.get('system:time_start')});
                });
}
// Return a Landsat 8 TOA collection with only thermal (brightness temp)
// and cloud score band. Collection is filtered by given dates and
// by given polygon.
function getLandsatTOA(startdate, enddate, ROI){
  var l8toas = filterCollection(ee.ImageCollection('LANDSAT/LC08/C01/T1'), start_date, end_date, ROI)
  return ee.ImageCollection(l8toas);
}
//Return a Landsat 8 SR collection of surface reflectance and 
//quality bands. Collection is filtered by given dates and
//by given polygon. 
// note that we are getting the USGS SR data and not the GEE LEDAPS data
function getLandsatSR(startdate, enddate, ROI){
  var bnames = ["B1","B2","B3","B4","B5","B6","B7"];
  var bnumbers = [0,1,2,3,4,5,6];
  var l8s = filterCollection(ee.ImageCollection('LANDSAT/LC08/C01/T1'), start_date, end_date, ROI)
            .select(bnumbers, bnames);
  return ee.ImageCollection(l8s);
}
// get NCEP atmospheric data for the dates of landsat image
function getNCEP(srImg) {
      // grab the date of SR image and advance by 1 day
      var bdate = ee.Date(srImg.get('system:time_start')).format('YYYY-MM-dd')
      var edate = ee.Date(bdate).advance(1, 'day')
      // grab the surface temperature variable from NCEP
      // note that each observation during day is a collection
      // there are 4 observations per day
      var tairColl = ee.ImageCollection('NCEP_RE/surface_temp')
        .filterDate(bdate, edate)
      // convert each time of observations from a collection to bands        
      var size = tairColl.size();
      var list = tairColl.toList(size)
      var tair = ee.Image(list.get(0)).select([0], ['SRTAIR00'])
        .addBands(ee.Image(list.get(1)).select([0], ['SRTAIR06']))
        .addBands(ee.Image(list.get(2)).select([0], ['SRTAIR12']))
        .addBands(ee.Image(list.get(3)).select([0], ['SRTAIR18']))
      // grab the surface water vapor variable from NCEP
      // note that each observation during day is a collection
      // there are 4 observations per day
      var tairColl = ee.ImageCollection('NCEP_RE/surface_wv')
        .filterDate(bdate, edate)
      // convert each time of observations from a collection to bands        
      var size = tairColl.size();
      var list = tairColl.toList(size)
      var wv = ee.Image(list.get(0)).select([0], ['SRWVAP00'])
        .addBands(ee.Image(list.get(1)).select([0], ['SRWVAP06']))
        .addBands(ee.Image(list.get(2)).select([0], ['SRWVAP12']))
        .addBands(ee.Image(list.get(3)).select([0], ['SRWVAP18']))
      return srImg.addBands(tair).addBands(wv);
}
var start_date = ee.Date.fromYMD(2019,4,1); 
var end_date = ee.Date.fromYMD(2019,5,27);
var Necp = ee.ImageCollection('NCEP_RE/surface_wv')
              .filterDate(start_date,end_date)
print('Necp',Necp)
//Stick atmospheric metadata to image as bands.
function addAtmosBands(srimg){
  // var ozone = ee.Image(srimg.get('ozone')).select([0], ['OZONE']);
  var tair = ee.Image(ee.List(srimg.get('surface_temp')).get(0))
              .select([0], ['SRTAIR00'])
            .addBands(ee.Image(ee.List(srimg.get('surface_temp')).get(1))
              .select([0], ['SRTAIR06']))
            .addBands(ee.Image(ee.List(srimg.get('surface_temp')).get(2))
              .select([0], ['SRTAIR12']))
            .addBands(ee.Image(ee.List(srimg.get('surface_temp')).get(3))
              .select([0], ['SRTAIR18']));
  var wv = ee.Image(ee.List(srimg.get('surface_wv')).get(0))
              .select([0], ['SRWVAP00'])
            .addBands(ee.Image(ee.List(srimg.get('surface_wv')).get(1))
              .select([0], ['SRWVAP06']))
            .addBands(ee.Image(ee.List(srimg.get('surface_wv')).get(2))
              .select([0], ['SRWVAP12']))
            .addBands(ee.Image(ee.List(srimg.get('surface_wv')).get(3))
              .select([0], ['SRWVAP18']));
  return srimg.addBands(tair).addBands(wv);
}
//Join Landsat collections based on system:time_start
function joinLandsatCollections(coll1, coll2){
  var eqfilter = ee.Filter.equals({'rightField':'system:time_start',
                                   'leftField':'system:time_start'});
  var join = ee.Join.inner();
  var joined = ee.ImageCollection(join.apply(coll1, coll2, eqfilter));
  //Inner join returns a FeatureCollection with a primary and secondary set of 
  //properties. Properties are collapsed into different bands of an image.
  return joined.map(function(element){
                      return ee.Image.cat(element.get('primary'), element.get('secondary'));
                    })
          .sort('system:time_start');
}
//Compute NDVI from a Landsat image.
// function addNDVI(lndstimg){
//   var ndvi =  lndstimg.normalizedDifference(['B4', 'B3']);
//   return lndstimg.addBands(ndvi.select([0],['NDVI']));
// }
function addNDVI(lndstimg){
  var ndvi =  lndstimg.normalizedDifference(['B5', 'B4']);
  return lndstimg.addBands(ndvi.select([0],['NDVI']));
}
//---------------------------------------------------------------------------------------------------------
//-----------------------------------------------Thermal---------------------------------------------------
//Compute emissivity from NDVI
//Note: NDVImin, NDVImax should be actually extracted from the image histogram.
//      Esoil, Eveg can be found in the literature.
function coreEmissivity(reflimg, NDVImin, NDVImax, Esoil, Eveg){
  var ndvi_min = ee.Image(ee.Number(NDVImin));
  var ndvi_max = ee.Image(ee.Number(NDVImax));
//  var ndvi = reflimg.normalizedDifference(["B4", "B3"]);
  var ndvi = reflimg.normalizedDifference(["B5", "B4"]);
  var fvc =  ndvi.subtract(ndvi_min)
             .divide(ndvi_max.subtract(ndvi_min))
             .pow(ee.Image(2));
  var e = ee.Image(Esoil).multiply(ee.Image(1).subtract(fvc)).add(ee.Image(Eveg).multiply(fvc));
  return e.select([0], ['emissivity']);
}
//Convenience function for mapping emissivity computation over collection
function getEmissivity(reflimg){
  return coreEmissivity(reflimg, 0.18, 0.85, 0.97, 0.99); 
}
//Compute psi functions
function getPsis(joinedimg){
  // WTR in NCEP data is in kg/m^2, 
  // LST method needs g/cm^2: 1 kg/m2 = 10^-1 g/cm^2
  // NCEP values need to be unpacked first:
  //      + offset = 277.65 
  //      + scale =0.01 for all images.
  var wv = joinedimg.select('SRWVAP18') //CAREFUL: TIME OF DAY HARDCODED (SHOULD TAKE AVERAGE?)
           .multiply(0.01) //scale
           //.add(277.65) //offset
           .multiply(ee.Image(0.1)); //conversion to g/cm2
  var psi1 = ee.Image(0.14714).multiply(wv.pow(ee.Image(2)))
            .add(ee.Image(-0.15583).multiply(wv))
            .add(ee.Image(1.1234));
  var psi2 = ee.Image(-1.1836).multiply(wv.pow(ee.Image(2)))
            .add(ee.Image(-0.37607).multiply(wv))
            .add(ee.Image(-0.52894));
  var psi3 = ee.Image(-0.04554).multiply(wv.pow(ee.Image(2)))
            .add(ee.Image(1.8719).multiply(wv))
            .add(ee.Image(-0.39071));
  return ee.Image.cat([wv, psi1, psi2, psi3])
        .select([0,1,2,3], ["wv_gcm-2", "psi1", "psi2", "psi3"])
        .set({'system:time_start':joinedimg.get('system:time_start')});
}
//Compute surface temperature (output in degrees Kelvin)
function getSurfaceTemp(joinedimg){
  var brightemp = joinedimg.select('B10');
  var radtemp = joinedimg.select('B11');
  var c1 = ee.Image(1.19104*1e8); // W um^4 m^-2
  var c2 = ee.Image(14387.7); // um K
  var lambda = ee.Image(11.457); //um (effective wavelength of TM B6)
  var beta = ee.Image(1256); //K
  var gamma = radtemp.multiply(c2).divide(brightemp.pow(2))
              .multiply(radtemp.multiply(lambda.pow(4)).divide(c1)
                        .add(lambda.pow(-1)))
              .pow(-1);
  var delta = brightemp.subtract(radtemp.multiply(gamma));
  var psis = getPsis(joinedimg);
  var e = getEmissivity(joinedimg);
  var toctemp = gamma.multiply(psis.select('psi1').multiply(radtemp)
                                .add(psis.select('psi2'))
                                .divide(e)
                                .add(psis.select('psi3')))
                .add(delta)
                .multiply(0.001)
                .add(ee.Image(-15));
  var sigma = 5.67e-8; //W/m2/K4
  var tocrad = ee.Image(sigma).multiply(e)
                    .multiply(toctemp.pow(ee.Image(4)))
                    .divide(ee.Image(Math.PI));
  return ee.Image.cat(toctemp, brightemp, e, tocrad, radtemp)
            .select([0,1,2,3,4], ['TOCtemp', 'TOAtemp', 'emiss', 'TOCrad', 'TOArad'])
            .set({
              'DATE_ACQUIRED':joinedimg.get('DATE_ACQUIRED'),
              'LANDSAT_SCENE_ID':joinedimg.get('LANDSAT_SCENE_ID'),
              'SUN_AZIMUTH':joinedimg.get("SUN_AZIMUTH"),
              'SUN_ELEVATION':joinedimg.get("SUN_ELEVATION"),
              'system:time_start':joinedimg.get('system:time_start'),
            });
}
//---------------------------------------------------------------------------------------------------------
//----------------------------------------------Testing----------------------------------------------------
//-------------Initialize base collections
var start_date = ee.Date.fromYMD(2019,2,1); 
var end_date = ee.Date.fromYMD(2019,3,27);
var jcoll = joinLandsatCollections(getLandsatTOA(start_date, end_date , ROI), 
                                   getLandsatSR(start_date, end_date, ROI)
                                   .map(getNCEP));
// var jcoll = joinLandsatCollections(getLandsatTOA(start_date, end_date , refpoly), 
//                                   getLandsatSR(start_date, end_date, refpoly)
//                                   .map(addAtmosBands));
jcoll = joinLandsatCollections(jcoll, getLandsatRAD(start_date, end_date , ROI));
var tcoll = jcoll.map(function(jimg){return getSurfaceTemp(jimg)});
print(jcoll)
//---Test single image
var jimg = ee.Image(jcoll.mean());
var timg = ee.Image(tcoll.mean());
//var timgclip = timg.clip(QuezonCity);
var timgclip = timg.clip(ROI);
var timgfull = timg;
// print(jimg);
print(timg);
var layer = timgclip.visualize(imageVisParam7)
//MapPanel
var layers = mapPanel.layers();
layers.add(layer, '2019 Composite')
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
var precChart = ui.Chart.image.histogram(timgclip.select('TOCtemp'), ROI, 60)
precChart.setOptions({
    title: 'Histograma',
    vAxis: {title:  'Number'},
    hAxis: {title: 'Tª (c)'},
    colors: ['#EF851C']
  })
  inspectorPanel.widgets().set(2, precChart)
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Temperatura de alta resolución',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Histograma de las frecuencias de la Temperatura')
]);
inspectorPanel.add(intro)
//---Visualization
Map.centerObject(ROI, 9);
//var thpalette = ["000066", "00FFFF","FFFF00", "FF0000"];
//var empalette = ['000000', 'FFD700', 'F0FFFF'];
//Map.addLayer(timgclip.select('emiss'),{min:0.968, max:0.985, palette:empalette},"Surface Emissivity");
//Map.addLayer(timgclip.select('TOCtemp'), imageVisParam5, "Surface Temperature (Cº)");
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
//print("Approximate Surface temperature in K",
//      ui.Chart.image.histogram(timgclip.select('TOCtemp'), ROI, 60));