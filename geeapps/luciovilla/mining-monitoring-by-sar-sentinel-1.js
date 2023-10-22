var RNTB = ui.import && ui.import("RNTB", "table", {
      "id": "users/luciovilla/RNTB"
    }) || ee.FeatureCollection("users/luciovilla/RNTB"),
    LaPampa = ui.import && ui.import("LaPampa", "table", {
      "id": "users/luciovilla/LaPampa"
    }) || ee.FeatureCollection("users/luciovilla/LaPampa"),
    Example = ui.import && ui.import("Example", "table", {
      "id": "users/luciovilla/Area_Example_LaPampa"
    }) || ee.FeatureCollection("users/luciovilla/Area_Example_LaPampa"),
    MINAM = ui.import && ui.import("MINAM", "table", {
      "id": "users/luciovilla/AREAS_MINERIA_2019"
    }) || ee.FeatureCollection("users/luciovilla/AREAS_MINERIA_2019"),
    mining2019 = ui.import && ui.import("mining2019", "image", {
      "id": "users/luciovilla/Mining_Feb_Jun_2019"
    }) || ee.Image("users/luciovilla/Mining_Feb_Jun_2019"),
    CCNN = ui.import && ui.import("CCNN", "table", {
      "id": "users/luciovilla/CCNN_TresIslas"
    }) || ee.FeatureCollection("users/luciovilla/CCNN_TresIslas");
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $    AUGUST -AUTOMATED GEOPROCESSING ENVIRONMENT CLOUD-BASED  $
// $ =========================================================== $
// $ @tool     : GIS/RS Tool - PROCESSING Sentinel-1 Data        $
// $ @autor    : Lucio Villa                                     $
// $ @e-mail   : luciovilla60@gmail.com                          $
// $ @blog     : luciovilla.blogspot.pe                          $
// $ @revision : Based in AUGUST v3.2 - 21/05/2018               $
// $                                                             $
// $ (c) 2019 Lucio Villa.                                       $
// $ ............................................................$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// API KEY:lvrAIzaSyBQ4H4D9IC_W3ZF5jmn6x1QReGRkwDlTxMgee
// -----------------------------------------------------------
//
//*******************************************************************************************
// 1. Area of Interest (AOI)
//*******************************************************************************************
var MDD = ee.FeatureCollection('users/luciovilla/Madre_de_Dios');
var RNTB_ZA_AoI = ee.FeatureCollection('users/luciovilla/RNTB_ZA_AoI');
//var Mining_Detected = ee.Geometry.Point([-69.978056, -13.038333]);
// var Mining_Detected = ee.Geometry.Point([-69.979042, -13.038254]);
var ROI_Mining =  ee.Geometry.Polygon(
        [[[-70.67383617719487, -12.670947124759973],
          [-70.67383617719487, -13.148817900694334],
          [-69.73725170453862, -13.148817900694334],
          [-69.73725170453862, -12.670947124759973]]], null, false);
// ee.Geometry.Polygon(
//             [[[-69.94260819064152, -12.970755048676025],
//               [-69.94260819064152, -13.024279328172486],
//               [-69.84853775607121, -13.024279328172486],
//               [-69.84853775607121, -12.970755048676025]]], null, false);
//
// var AoI_MDD =  ee.Geometry.Polygon(
        // [[[-70.86541027387457, -12.530896755501852],
        //   [-70.86541027387457, -13.275160681080592],
        //   [-69.40834850629645, -13.275160681080592],
        //   [-69.40834850629645, -12.530896755501852]]], null, false);
var AOI_MDD = ee.Geometry.MultiPolygon(
        [[[[-70.38637257604276, -10.786840249811108],
           [-70.38637257604276, -13.20458943885783],
           [-68.59560109166776, -13.20458943885783],
           [-68.59560109166776, -10.786840249811108]]],
         [[[-68.59560109166776, -10.819215113099355],
           [-68.59560109166776, -10.819215113099355],
           [-68.59560109166776, -10.819215113099355],
           [-68.59560109166776, -10.819215113099355]]]], null, false);
// ee.Geometry.Polygon(
//         [[[-70.39903517995131, -12.47964545364022],
//           [-70.39903517995131, -13.090337300989678],
//           [-69.04771682057631, -13.090337300989678],
//           [-69.04771682057631, -12.47964545364022]]], null, false);
//*******************************************************************************************
// 2. Adding features/polygons (AOI)
//*******************************************************************************************
//
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var LaPampa_Border = empty.paint({
  featureCollection: LaPampa,
  color: 1,
  width: 2
});
var ROI_Border = empty.paint({
  featureCollection: RNTB,
  color: 1,
  width: 3
});
//
var Border_Mining = empty.paint({
  featureCollection: CCNN,
  color: 1,
  width: 3
});
var MINAM_Border = empty.paint({
  featureCollection: MINAM,
  color: 1,
  width: 2
});
/*var Mining_FebJul2019 = empty.paint({
  featureCollection: mining2019,
  color: 1,
  width: 3
});*/
//
//*******************************************************************************************
// 3. Adding Legend
//*******************************************************************************************
//
var Mining_point = /* color: #d63000 */ee.Geometry.Point([-69.977972,-13.038251]);
// List of values
var palette = ee.List([
  "FF0000", 
  "000000",
  "0FFF00"
  //"D1D544",
  //"737369"
])
var names = ee.List([
  2019,
  2019,
  2019
  //20,
  //75
]);
var namez = ee.List([
  "Mining Feb-Jun 2019",
  "La Pampa",
  "Tambopata National Reserve"
  //"2017",
  //"2016"
]);
//print(palette);
//print(names);
//print(namez);
// set position of panel
//############################# PANELS LEGEND ########
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
legend.style().set('width', '245px');
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
//######################################################
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: 'Updated: Dec 25, 2021 (ACCA)',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    color: 'red',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
// var visTitle = {
//   fontWeight: 'bold', 
//   fontSize: '11px', 
//   width: '130px',
//   padding: '2px 2px 2px 2px',
//   border: '1px solid 418F5D',
//   color: 'white',
//   // backgroundColor: 'FFBB00',
//   backgroundColor: '418F5D',
//   textAlign: 'center'
//   };
var visTitle = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '200px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'black',
  // backgroundColor: 'FFBB00',
  backgroundColor: 'orange',
  textAlign: 'center'
  };
// var logo = ee.Image("users/luciovilla/UNALM/UNALM");
// var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'80%',height:'80%',stretch: 'horizontal', textAlign:'center', padding:'0px 0px 0px 25px' }});
var logo = ee.Image("users/luciovilla/UNALM/ACCA");
// var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'80%',height:'80%', padding:'0px 0px 0px 25px'}});
// legend.add(ui.Label('MAAP INITIATIVE',visTitle));
// legend.add(branding);
legend.add(legendTitle);
// legend.add(legendTitle2);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',fontSize: '12px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Add color and and names
for (var i = 0; i < 3; i++) {
   var myPercentage = ee.Number(names.get(i).getInfo());
   var myName = ee.String(namez.get(i).getInfo());
   var txt = myName//.cat(" (").cat(myPercentage.toInt()).cat(")");
   legend.add(makeRow(palette.get(i).getInfo(),txt.getInfo() ));
  } /* */
// for (var i = 0; i < 3; i++) {
//   var myPercentage = ee.Number(names.get(i).getInfo());
//   var myName = ee.String(namez.get(i).getInfo());
//   var txt = myName.cat(" (").cat(myPercentage.toInt()).cat(")");
//   legend.add(makeRow(palette.get(i).getInfo(),txt.getInfo() ));
//   } /* */
//
//
//*******************************************************************************************
// 4. Selection Dates: Period of study
//*******************************************************************************************
//
var date2017_1 = ['2017-02-06', '2017-02-07'];
//var date2017_2 = ['2017-05-13', '2017-05-14'];
var date2017_2 = ['2017-06-18', '2017-06-19'];
var date2018_1 = ['2018-02-01', '2018-02-03']; 
//var date2018_2 = ['2018-05-08', '2018-05-09'];
var date2018_2 = ['2018-06-25', '2018-06-26'];
var date2019_1 = ['2019-02-08', '2019-02-09'];
//var date2019_2 = ['2019-05-15', '2019-05-16'];
var date2019_2 = ['2019-06-20', '2019-06-21'];
var date2019_3 = ['2019-08-08', '2019-08-09'];
var date2019_S2_1 = ['2019-03-08', '2019-03-09'];
var date2019_S2_2 = ['2019-06-24', '2019-06-25'];
var date2019_4 = ['2019-09-01', '2019-09-02'];
var date2019_S2_3 = ['2019-09-02', '2019-09-03'];
var date2019_S2_4 = ['2019-10-14', '2019-10-15'];
//var date2019_5 = ['2019-09-01', '2019-09-02'];
//var date2019_6 = ['2019-09-01', '2019-09-02'];
var date2019_7 = ['2019-10-19', '2019-10-20'];
var date2019_8 = ['2019-11-24', '2019-11-25'];
var date2020_0 = ['2020-02-27', '2020-02-28'];
var date2020_1 = ['2020-04-03', '2020-04-04'];
var date2020_2 = ['2020-04-27', '2020-04-28'];
var date2020_S2_0 = ['2020-03-02','2020-03-03'];
var date2020_S2_1 = ['2020-04-21','2020-04-22'];
var date2020_S2_2 = ['2020-05-11','2020-05-12'];
//
var date2020_S1_01oct2020 = ['2020-10-01', '2020-10-02'];//A
var date2020_S1_12oct2020 = ['2020-10-12', '2020-10-13'];//D
var date2020_S1_13oct2020 = ['2020-10-13', '2020-10-14'];//A
var date2020_S1_09feb2021 = ['2021-02-09', '2021-02-10'];//D
var date2020_S1_21feb2021 = ['2021-02-21', '2021-02-22']; //D
//
var date2020_S2_01oct2020 = ['2020-10-01', '2020-10-07'];
var date2020_S2_06oct2020 = ['2020-10-06', '2020-10-07'];
var date2020_S2_11oct2020 = ['2020-10-11', '2020-10-12'];
var date2020_S2_16oct2020 = ['2020-10-16', '2020-10-17'];
/*var S1_images = {
  '06-feb-2017': S1_Selection(date2017_1),
  '13-may-2017': S1_Selection(date2017_2),
  '01-feb-2018': S1_Selection(date2018_1),
  '08-may-2018': S1_Selection(date2018_2),
  '08-feb-2019': S1_Selection(date2019_1),
  '15-may-2019': S1_Selection(date2019_2)
};*/
var S1_images = {
  'S1: 21-Feb-2021': S1_Selection_D(date2020_S1_21feb2021),
  'S1: 09-Feb-2021': S1_Selection_D(date2020_S1_09feb2021),
  'S1: 13-Oct-2020': S1_Selection_A(date2020_S1_13oct2020),
  'S1: 12-Oct-2020': S1_Selection_D(date2020_S1_12oct2020),
  'S1: 01-Oct-2020': S1_Selection_A(date2020_S1_01oct2020),
  // 'S1: 27-feb-2020': S1_Selection_D(date2020_0),
  // 'S1: 24-nov-2019': S1_Selection_A(date2019_8),
  // 'S1: 20-jun-2019': S1_Selection_D(date2019_2),
  // 'S1: 08-feb-2019': S1_Selection_D(date2019_1),
  // 'S1: 25-jun-2018': S1_Selection_D(date2018_2),
  // 'S1: 01-feb-2018': S1_Selection_D(date2018_1),
  // 'S1: 18-jun-2017': S1_Selection_D(date2017_2),
  // 'S1: 06-feb-2017': S1_Selection_D(date2017_1),
  'S2: 16-Oct-2020': S2_Selection(date2020_S2_16oct2020),
  'S2: 11-Oct-2020': S2_Selection(date2020_S2_11oct2020),
  'S2: 06-Oct-2020': S2_Selection(date2020_S2_06oct2020),
  'S2: 01-Oct-2020': S2_Selection(date2020_S2_01oct2020),
  // 'S2: 11-may-2020': S2_Selection(date2020_S2_2),
  // 'S2: 21-apr-2020': S2_Selection(date2020_S2_1),
  // 'S2: 03-mar-2020': S2_Selection(date2020_S2_0),
  // 'S2: 14-oct-2019': S2_Selection(date2019_S2_4),
  // //'S2: 02-sep-2019': S2_Selection(date2019_S2_3),
  // 'S2: 24-jun-2019': S2_Selection(date2019_S2_2),
  // //'S1: 08-aug-2019': S1_Selection_A(date2019_3),
  // 'S2: 08-mar-2019': S2_Selection(date2019_S2_1),
  //'S1: 01-sep-2019': S1_Selection_A(date2019_4),
};
//
//*******************************************************************************************
// 5. Defining Functions
//*******************************************************************************************
//
function cloudfunction_S2(image){
  //use add the cloud likelihood band to the image
  var quality = image.select("QA60").unmask();
  //get pixels above the threshold
  var cloud01 = quality.gt(0);
  //create a mask from high likelihood pixels
  var cloudmask = image.mask().and(cloud01.not());
  //mask those pixels from the image
  return image.updateMask(cloudmask).divide(10000);
                  }
//**
//**
function S1_Selection_A(date) {
  var S1 = ee.ImageCollection('COPERNICUS/S1_GRD');
  //var polarization = 'VV';
  var sentinel1 = S1
  // Filter to get images with VV and VH dual polarization
                  .filterDate(date[0],date[1])
                  //.filterDate(date, date.advance(1, 'week'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  // Filter to get images collected in interferometric wide swath mode
                  .filter(ee.Filter.eq('instrumentMode', 'IW'))
                  // Filter to get images collected with same pass direction
                  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
                  .filter(ee.Filter.eq('relativeOrbitNumber_start', 149))
                  // Filter to limit extent
                  //.select(["VH"])
                  //.select(polarization);
                  .filterBounds(MDD);
                  //.mosaic();
                  //.mean();
  // Remover los bordes negros
  var maskAngle = function(image) {
                    var ia = image.select('angle');
                  return image.updateMask(ia.gte(31).and(ia.lte(45)));
                  };
  var S1subClean =  sentinel1.map(maskAngle);
  //print('List S1 Images',S1subClean);
  // ..............................................
  // Definir un Filtro - boxcar or low-pass kernel.
  var boxcar = ee.Kernel.square(33, 'meters'); // kernel size
  var smooth = function(image) {
                    var natimg = ee.Image(10.0).pow(image.divide(10.0));  // revert to power
                    var filtered = natimg.convolve(boxcar); // filter
                return filtered.log10().multiply(10.0) // convert to backscatter coefficient
                  .set('system:time_start', image.get('system:time_start'))
                  .set('cycleNumber', image.get('cycleNumber'))
                  .float();
                };
  // Smooth Filtro
  var S1subSmooth = S1subClean.map(smooth);
  // print('S1subSmooth:', S1subSmooth);
  // ..............................................
  // Ratio entre 2 bandas de radar de diferentes polarizacion
  var addRatio = function(image) {
                    //var VVdivVH = image.select('VV').divide(image.select('VH'))
                    var VVsubtVH = image.select('VV').subtract(image.select('VH'))
                    .float()
                    .rename('ratio');
                  return image.addBands(VVsubtVH);
                  };
  var S1subSmoothRatio = S1subSmooth.map(addRatio);
  // print('S1subSmoothRatio:', S1subSmoothRatio);
  var S1_singleDate = S1subSmoothRatio.mosaic();
  return S1_singleDate.visualize( {bands: ['VV', 'VH', 'ratio'],min: [-18, -23, 3], max: [-4, -11, 15]});
}
//**
//**
function S1_Selection_D(date) {
  var S1 = ee.ImageCollection('COPERNICUS/S1_GRD');
  //var polarization = 'VV';
  var sentinel1 = S1
  // Filter to get images with VV and VH dual polarization
                  .filterDate(date[0],date[1])
                  //.filterDate(date, date.advance(1, 'week'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  // Filter to get images collected in interferometric wide swath mode
                  .filter(ee.Filter.eq('instrumentMode', 'IW'))
                  // Filter to get images collected with same pass direction
                  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                  .filter(ee.Filter.eq('relativeOrbitNumber_start', 127))
                  // Filter to limit extent
                  //.select(["VH"])
                  //.select(polarization);
                  .filterBounds(AOI_MDD);
                  //.mosaic();
                  //.mean();
  // Remover los bordes negros
  var maskAngle = function(image) {
                    var ia = image.select('angle');
                  return image.updateMask(ia.gte(31).and(ia.lte(45)));
                  };
  var S1subClean =  sentinel1.map(maskAngle);
  //print('List S1 Images',S1subClean);
  // ..............................................
  // Definir un Filtro - boxcar or low-pass kernel.
  var boxcar = ee.Kernel.square(33, 'meters'); // kernel size
  var smooth = function(image) {
                    var natimg = ee.Image(10.0).pow(image.divide(10.0));  // revert to power
                    var filtered = natimg.convolve(boxcar); // filter
                return filtered.log10().multiply(10.0) // convert to backscatter coefficient
                  .set('system:time_start', image.get('system:time_start'))
                  .set('cycleNumber', image.get('cycleNumber'))
                  .float();
                };
  // Smooth Filtro
  var S1subSmooth = S1subClean.map(smooth);
  // print('S1subSmooth:', S1subSmooth);
  // ..............................................
  // Ratio entre 2 bandas de radar de diferentes polarizacion
  var addRatio = function(image) {
                    //var VVdivVH = image.select('VV').divide(image.select('VH'))
                    var VVsubtVH = image.select('VV').subtract(image.select('VH'))
                    .float()
                    .rename('ratio');
                  return image.addBands(VVsubtVH);
                  };
  var S1subSmoothRatio = S1subSmooth.map(addRatio);
  // print('S1subSmoothRatio:', S1subSmoothRatio);
  var S1_singleDate = S1subSmoothRatio.mosaic();
  return S1_singleDate.visualize( {bands: ['VV', 'VH', 'ratio'],min: [-18, -23, 3], max: [-4, -11, 15]});
}
//**
//**
function S2_Selection(date) {
  var producto = ee.ImageCollection('COPERNICUS/S2');
  var bandas = ['B2','B3','B4','B8'];
  var sentinel2= producto
    .filterDate(date[0],date[1])
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    // .map(cloudfunction_S2)
    .filterBounds(AOI_MDD);
  //print("S2 Imagenes",S2_RTMDD);
  sentinel2 = sentinel2.select(bandas);
  var mosaic_S2 = sentinel2.median();
  //var mosaic_S2_ROI = S2_ROI.mosaic();
  //print('mosaic_S2_RTMDD:', mosaic_S2_RTMDD);
  // var S1_singleDate = S1subSmoothRatio.mosaic();
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
  // return mosaic_S2.visualize({bands: ['B4', 'B3', 'B2'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
  return mosaic_S2.visualize({bands: ['B4', 'B3', 'B2'],min: 0, max: 3000, gamma: [0.95, 1.1, 1]});
}
//print('List S1 Images Final',S1_images);
//
//*******************************************************************************************
// 5. Defining Widgets/Panels
//*******************************************************************************************
//
// Create the LEFT map, and have it display layer 1.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 1, 'top-left');
// Create the RIGHT map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 0, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  //var label = ui.Label('SAR SENTINEL-1');
  var label0 = ui.Label({
  value: 'SAR/MS Monitoring',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  //var label1 = ui.Label();
  var label1 = ui.Label({
  value: 'Sentinel-1/2 (ESA)',
  style: {
    fontWeight: 'bold',
    fontSize: '17px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  var label2 = ui.Label({
  value: 'Updated: Feb, 2021',
  style: {
    fontWeight: 'bold',
    //fontStyle: 'italic',
    color: 'red',
    fontSize: '11px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  /*var label3 = ui.Label({
  value: 'Updated: Aug 14, 2019 (ACCA)',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }*/
  });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(S1_images[selection].clip(AOI_MDD)));
    mapToChange.layers().set(1, ui.Map.Layer(ROI_Border,{palette: '0FFF00'}, 'RNTB'));
    mapToChange.layers().set(2, ui.Map.Layer(LaPampa_Border,{palette: 'FF0000'}, 'LaPampa'));
    // mapToChange.layers().set(2, ui.Map.Layer(MINAM_Border,{palette: 'FF00FF'}, 'LaPampa'));
    // mapToChange.layers().set(3, ui.Map.Layer(Border_Mining,{palette: '000000', opacity: 0.8}, 'ROI Mining'));
    // mapToChange.layers().set(4, ui.Map.Layer(mining2019,{palette: 'FF0000'}, 'Mining Feb-Jul 2019'));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(S1_images), onChange: updateMap});
  select.setValue(Object.keys(S1_images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label0, label1 ,label2, select], style: {position: position}}); /// Deactivate
      // ui.Panel({widgets: [select], style: {position: position}});
  mapToChange.add(controlPanel);
  /*Map.addLayer(RNTB,{'color':'b227b0'} ,'RNTB');
  Map.addLayer(PNBS,{'color':'b227b0'} ,'PNBS');*/
}
// Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
//###########  LEGEND ########
leftMap.add(legend);
//############################
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//leftMap.setCenter(-70.031418, -12.984309, 12);
//
// leftMap.setCenter(-69.979042, -13.038254, 11);
//
// leftMap.setCenter(-69.5074, -12.66901, 13);
leftMap.setOptions('hybrid')
rightMap.setOptions('hybrid')
leftMap.setCenter(-70.2281, -12.9545,11);