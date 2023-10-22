var image2 = ui.import && ui.import("image2", "image", {
      "id": "COPERNICUS/S2/20190630T100031_20190630T100212_T32TQM"
    }) || ee.Image("COPERNICUS/S2/20190630T100031_20190630T100212_T32TQM"),
    SentinelCollection = ui.import && ui.import("SentinelCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    POI = ui.import && ui.import("POI", "table", {
      "id": "users/pranavspandya/PuneCityComplete"
    }) || ee.FeatureCollection("users/pranavspandya/PuneCityComplete"),
    Pune3D = ui.import && ui.import("Pune3D", "table", {
      "id": "users/pranavspandya/Pune_Buildings"
    }) || ee.FeatureCollection("users/pranavspandya/Pune_Buildings"),
    City_A = ui.import && ui.import("City_A", "table", {
      "id": "users/pranavspandya/AnandCity"
    }) || ee.FeatureCollection("users/pranavspandya/AnandCity");
Map.centerObject(POI,11)
var image=(SentinelCollection
.filterDate('2020-01-01', '2020-12-31')
.filterBounds(POI)
.sort('CLOUDY_PIXEL_PERCENTAGE')
// .clip(POI)
.first()
)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-04-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset.mean(), visualization, 'True Colour RGB');
// var visParams = {bands: 'B4,B3,B2', min: 600, max: 1800} //True Colour Visible RGB 
//     Map.addLayer(image,visParams,'True Colour BG');
// print(ee.Date(image.get('DATATAKE_IDENTIFIER'))['4:-20'])
//PanSharpening Reference
// var sharpened = panSharpen({
//   image: image,
//   bestEffort: true
// });
//----------------------------------------------------------
// Split Pane Slider Comparison
//----------------------------------------------------------
// var Compare = ui.Button({
//   label: 'Compare Garbage Waste',
//     style: {position: 'top-right',fontSize: '20px', fontWeight: 'bold',backgroundColor: 'blue',Color:'red'},
//   onClick: function() {
// var images = {
//   'Jan - Before Flood': getWeeklySentinelComposite('2019-01-1'),
//   'Feb - Before Flood': getWeeklySentinelComposite('2020-02-1'),
//   'Mar - Before Flood': getWeeklySentinelComposite('2020-03-1'),
//   'April - Heavy Rainfall': getWeeklySentinelComposite('2020-05-1'),
//   'May - After Flood': getWeeklySentinelComposite('2020-06-1')
// };
// // Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// // given date.
// function getWeeklySentinelComposite(date) {
//   var date = ee.Date(date);
//   // Only include the VV polarization, for consistent compositing.
//   var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
//                       .filterBounds(POI)
//                       .filterDate(date, date.advance(30, 'days'))
//                       .sort('CLOUDY_PIXEL_PERCENTAGE')
//                       .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
//                       .first();
// var vis={max: 1700, min: 1160, bands:'B3',palette:['black','aqua']}                  
//   //For Sharpening Image
//   var sentinel1 = panSharpen({
//   image: sentinel1,
//   bestEffort: true
// })
//   return sentinel1.visualize(vis);
// }
// // Map.centerObject(POI,16)
// // Create the left map, and have it display layer 0.
// var leftMap = ui.Map();
// leftMap.setControlVisibility(true);
// var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// // Create the right map, and have it display layer 1.
// var rightMap = ui.Map();
// rightMap.setControlVisibility(true);
// var rightSelector = addLayerSelector(rightMap, 3, 'top-right');
// // Adds a layer selection widget to the given map, to allow users to change
// // which image is displayed in the associated map.
// function addLayerSelector(mapToChange, defaultValue, position) {
//   var label = ui.Label('Choose The Date of your observation');
//   // This function changes the given map to show the selected image.
//   function updateMap(selection) {
//     mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
//   }
//   // Configure a selection dropdown to allow the user to choose between images,
//   // and set the map to update when a user makes a selection.
//   var select = ui.Select({items: Object.keys(images), onChange: updateMap});
//   select.setValue(Object.keys(images)[defaultValue], true);
//   var controlPanel =
//       ui.Panel({widgets: [label, select], style: {position: position}});
//   mapToChange.add(controlPanel);
// }
// var splitPanel = ui.SplitPanel({
//   firstPanel: leftMap,
//   secondPanel: rightMap,
//   wipe: true,
//   style: {stretch: 'both'}
// });
// // Set the SplitPanel as the only thing in the UI root.
// ui.root.widgets().reset([splitPanel]);
// var linker = ui.Map.Linker([leftMap, rightMap]);
// // print(images)
// var vis={max: 1405.9738214015126, min: 1000, bands:'B3'}                  
// // Map.addLayer(images['2020-07-21'],{},'2')
// leftMap.centerObject(POI, 14)
//   }
// });
// Map.add(Compare);
 //------------------------------------------------------------------
 // Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Intelligent Garbage Detection Framework for Pune City',
    style: {fontSize: '20px', fontWeight: 'bold',Color:'black'}
  }),
  ui.Label({
    value:'A Geo-Intelligence Model for Garbage Detection'})
    // style:{fontAlign:'center'})
]);
Map.add(intro);
//------------------------------------------------------------
var lon = ui.Textbox({
  placeholder: 'Enter longitude here...',
  style: {position: 'top-right'},
  onChange: function(value) {
    return(value);
  }
});
Map.add(lon);
var lat = ui.Textbox({
  placeholder: 'Enter latitude here...',
  style: {position: 'top-right'},
  onChange: function(value) {
    return(value);
  }
});
Map.add(lat);
var Lo = ee.Number.parse(lon);
var La = ee.Number.parse(lat);
var button = ui.Button({
  label: 'Accept Coordinates',
    style: {position: 'top-right',fontSize: '20px', fontWeight: 'bold',Color:'blue'},
  onClick: function() {
    Map.setCenter(Lo,La,14);
  }
});
Map.add(button);
//-------------------------------------------------------------------
//Mini Buttons
var CART = ui.Button({
  label: 'Garbage Detection with CART Classifier',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function(){UrbanClassification(POI,'Pune Garbage 2020')}
  // function() {
  //   var visParams = {bands: 'B4,B3,B2', min: 600, max: 1800} //True Colour Visible RGB 
  //   Map.addLayer(sharpened.clip(POI),visParams,'TCC');}
});
Map.add(CART)
// var FCC = ui.Button({
//   label: 'Flase Colour Composite',
//     style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
//   onClick: function() {
//     var visParams = {bands: 'B8,B4,B3', min: 600, max: 1800} //True Colour Visible RGB 
//     Map.addLayer(sharpened.clip(POI),visParams,'FCC');
//   }
// });
// Map.add(FCC);
var ByTexture = ui.Button({
  label: 'Garbage Detection from Texture',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: Texture
});
Map.add(ByTexture);
var Buildings3D = ui.Button({
  label: 'Pune 3D Buildings',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function() {
// var visParams = {bands: ['B3'], min: 600, max: 1800} // B3
    // Map.addLayer(sharpened,visParams,'Panchromatic');
    Map.addLayer(Pune3D,{color:'orange'},"Pune Buildings")
  }
});
Map.add(Buildings3D);
//-------------------------------------------------------------------------
// function panSharpen(params) {
//   if (params && !(params.image instanceof ee.Image))
//     throw Error('panSharpen(params): You must provide an params object with an image key.')
//   var image = params.image
//   var geometry = params.geometry || image.geometry()
//   var crs = params.crs || image.select(0).projection()
//   var maxPixels = params.maxPixels
//   var bestEffort = params.bestEffort || false
//   var tileScale = params.tileScale || 1
//   image = image.clip(POI)
//   var bands10m = ['B2', 'B3', 'B4', 'B8']
//   var bands20m = ['B5', 'B6', 'B7', 'B8A', 'B11', 'B12']
//   var panchromatic = image
//     .select(bands10m)
//     .reduce(ee.Reducer.mean())
//   // var image20m = image.select(bands20m)
//   // var image20mResampled = image20m.resample('bilinear')
//   var image10m = image.select(bands10m)
//   var image10mResampled = image10m.resample('bilinear')
//     var stats10m = image10m
//     .reduceRegion({
//       reducer: ee.Reducer.stdDev().combine(
//         ee.Reducer.mean(), null, true
//       ),
//       geometry: geometry,
//       scale: 10,
//       crs: crs, 
//       bestEffort: bestEffort, 
//       maxPixels: maxPixels, 
//       tileScale: tileScale
//     })
//     .toImage()
//     var mean10m = stats10m
//     .select('.*_mean')
//     .regexpRename('(.*)_mean', '$1')
//   var stdDev10m = stats10m
//     .select('.*_stdDev')
//     .regexpRename('(.*)_stdDev', '$1')
//   var kernel = ee.Kernel.fixed({
//     width: 5,
//     height: 5, 
//     weights: [
//       [-1, -1, -1, -1, -1],
//       [-1, -1, -1, -1, -1],
//       [-1, -1, 24, -1, -1],
//       [-1, -1, -1, -1, -1],
//       [-1, -1, -1, -1, -1]
//     ], 
//     // width: 3,
//     // height: 3,
//     // weights: [
//     //   [-1,-1,-1],
//     //   [-1,24,-1],
//     //   [-1,-1,-1]
//     // ], 
//     x: -3, 
//     y: -3, 
//     normalize: false
//   })
//   var highPassFilter = panchromatic
//     .convolve(kernel)
//     .rename('highPassFilter')
//   var stdDevHighPassFilter = highPassFilter
//     .reduceRegion({
//       reducer: ee.Reducer.stdDev(),
//       geometry: geometry,
//       scale: 10,
//       crs: crs, 
//       bestEffort: bestEffort, 
//       maxPixels: maxPixels, 
//       tileScale: tileScale
//     })
//     .getNumber('highPassFilter')
//   function calculateOutput(bandName) {
//     bandName = ee.String(bandName)
//     var W = ee.Image().expression(
//       'stdDev10m / stdDevHighPassFilter * modulatingFactor', {
//         stdDev10m: stdDev10m.select(bandName),
//         stdDevHighPassFilter: stdDevHighPassFilter,
//         modulatingFactor: 0.75 //Ratio of Sharpness
//       }
//     )
//     return ee.Image()
//       .expression(
//         'image10mResampled + (HPF * W)', {
//           image10mResampled: image10mResampled.select(bandName),
//           HPF: highPassFilter,
//           W: W
//       }
//     )
//     .uint16()
//   }
//   var output = ee.ImageCollection(
//       // bands10m.map(calculateOutput)
//       bands10m.map(calculateOutput)
//     )
//     .toBands()
//     .regexpRename('.*_(.*)', '$1')
//   var statsOutput = output
//     .reduceRegion({
//       reducer: ee.Reducer.stdDev().combine(
//         ee.Reducer.mean(), null, true
//       ),
//       geometry: geometry,
//       scale: 10,
//       crs: crs, 
//       bestEffort: bestEffort, 
//       maxPixels: maxPixels, 
//       tileScale: tileScale
//     })
//     .toImage()
//   var meanOutput = statsOutput
//     .select('.*_mean')
//     .regexpRename('(.*)_mean', '$1')
//   var stdDevOutput = statsOutput
//     .select('.*_stdDev')
//     .regexpRename('(.*)_stdDev', '$1')
//   var sharpened = ee.Image()
//     .expression(
//       '(output - meanOutput) / stdDevOutput * stdDev10m + mean10m', {
//         output: output,
//         meanOutput: meanOutput,
//         stdDevOutput: stdDevOutput,
//         stdDev10m: stdDev10m,
//         mean10m: mean10m
//       }
//     )
//     .uint16() 
//   return image
//     .addBands(sharpened, null, true)
//     .select(image.bandNames())
// }  
//---------------------------------------------------------------------
//Functions List
function UrbanClassification(POI,title){
var landfill = /* color: #ff0000 */ee.FeatureCollection([
ee.Feature(ee.Geometry.Point([73.9122033351, 18.5112578488]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122107328, 18.5112677277]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912217196, 18.5112841869]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912221207, 18.5112974109]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122316736, 18.5113074871]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122426507, 18.511314288]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122541202, 18.511317788]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122690478, 18.5113180194]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91228398, 18.5113182511]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122989164, 18.5113184828]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123108687, 18.5113186682]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123228238, 18.5113188535]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123347817, 18.511319039]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123493288, 18.5113225943]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123601066, 18.5113327768]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123717115, 18.5113363054]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123867202, 18.5113365406]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123987304, 18.5113367288]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124137472, 18.5113369642]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912431773, 18.5113372467]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124467996, 18.5113374822]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124618305, 18.5113377178]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124768658, 18.5113379534]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124888972, 18.5113381419]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125042509, 18.5113350312]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125144888, 18.5113218261]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125300801, 18.511315409]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125396484, 18.5113089137]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125494752, 18.51129913]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125622524, 18.511289426]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125747216, 18.5112830353]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125844569, 18.5112732888]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125942024, 18.5112634109]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126096181, 18.5112568463]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126192858, 18.5112470304]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126341562, 18.5112470304]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126465032, 18.5112405069]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126615706, 18.5112372513]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126711047, 18.5112275089]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126808058, 18.5112145757]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126873125, 18.5112049179]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126939886, 18.5111920969]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127033798, 18.5111825227]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127127361, 18.5111729842]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127222328, 18.5111603209]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127315141, 18.5111508644]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127407612, 18.5111414427]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127498171, 18.5111351809]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912761907, 18.511125817]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127711967, 18.511113385]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127745186, 18.5111041008]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127837379, 18.5110917748]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912790034, 18.5110795084]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127904264, 18.5110703477]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912796806, 18.5110551536]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128082641, 18.5110551536]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128225866, 18.5110551535]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128309688, 18.51106122]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128362945, 18.5110733974]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128387642, 18.511085634]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128383569, 18.51109793]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128378452, 18.511113385]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128317305, 18.5111227031]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128197763, 18.5111320557]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9128078998, 18.5111383099]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127958649, 18.51114772]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127839225, 18.5111540126]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127720946, 18.5111571649]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912762877, 18.5111666447]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127562501, 18.5111825227]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127471178, 18.5111889015]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912740578, 18.5112017066]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127310501, 18.5112145756]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127218293, 18.5112210342]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127151854, 18.5112339998]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91270275, 18.5112437667]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126902677, 18.5112535703]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126781507, 18.5112568464]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126660185, 18.5112601266]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126536494, 18.5112666994]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126412492, 18.5112732888]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126316119, 18.5112830485]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126247336, 18.5112960269]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126124977, 18.5112992811]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126027312, 18.5113092584]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912589872, 18.5113194306]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912577272, 18.5113261368]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125644317, 18.5113359724]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125515468, 18.5113458423]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125389068, 18.5113523777]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125265362, 18.5113555552]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125165665, 18.5113655408]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125008161, 18.511372072]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124910929, 18.5113787152]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124779836, 18.5113887333]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124682054, 18.5113954151]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124560504, 18.5113952177]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124489298, 18.5114053923]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124573749, 18.5114124127]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124685578, 18.5114229534]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124801166, 18.5114300716]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124947711, 18.5114372607]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912503647, 18.5114408882]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912518058, 18.5114515964]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125297498, 18.5114587941]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125380957, 18.5114694711]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125427964, 18.511487202]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125419112, 18.5114978318]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125435386, 18.5115156928]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125423536, 18.511530021]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125439917, 18.5115480902]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125527945, 18.5115554957]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125644744, 18.5115666142]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912570473, 18.5115703682]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125856695, 18.5115778316]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912591204, 18.5115887287]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125996781, 18.5116033035]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126050008, 18.5116180107]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126100902, 18.5116365311]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126154707, 18.5116514095]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126238468, 18.5116700853]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126230862, 18.5116814593]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126215558, 18.5117043435]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126202712, 18.5117235541]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126127132, 18.5117391431]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126018422, 18.5117548824]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912587911, 18.5117668587]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125716051, 18.5117667537]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125553497, 18.5117664309]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125491539, 18.5117624033]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125412713, 18.5117389312]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125325126, 18.5117271727]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912520891, 18.5117115706]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125083491, 18.5117074974]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124997078, 18.5116958701]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124917793, 18.5116767194]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124832193, 18.5116652188]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124845872, 18.5116501967]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912485948, 18.511635253]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124999656, 18.5116206207]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9125075964, 18.5116059451]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124991086, 18.5115947292]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124836901, 18.5115907719]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124714423, 18.5115868781]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124588596, 18.5115866501]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91244628, 18.5115864222]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124305599, 18.5115861373]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124148447, 18.5115858525]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9124022761, 18.5115856248]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123873691, 18.5115780316]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123791733, 18.5115669363]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123647639, 18.5115557742]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123531119, 18.5115483219]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123379507, 18.5115444379]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123294728, 18.5115370727]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123139203, 18.5115367982]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122983725, 18.5115365238]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122863984, 18.5115327133]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122819023, 18.5115434445]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122795738, 18.5115615135]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122808302, 18.511576109]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122820933, 18.511590781]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122896568, 18.5116056454]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122986405, 18.5116095041]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123107898, 18.5116134267]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123283886, 18.5116248798]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123452011, 18.5116438401]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123534375, 18.5116552434]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123612852, 18.5116704603]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91236598, 18.5116856995]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123739047, 18.5117010825]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123854969, 18.5117127839]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123935137, 18.5117283162]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123886564, 18.5117436798]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123757415, 18.5117434257]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123596023, 18.511743108]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123434684, 18.5117427906]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91232779, 18.5117386122]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123130563, 18.5117267454]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122951774, 18.5117148672]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122865046, 18.5117070388]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122746577, 18.5116991711]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912267011, 18.5116838082]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122616108, 18.5116761279]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122503603, 18.5116645866]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122381532, 18.5116605904]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122279998, 18.5116416484]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122168892, 18.5116302506]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122100087, 18.5116115717]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121963798, 18.5115965691]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121859538, 18.5115817053]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121781712, 18.5115706099]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121610751, 18.5115593923]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121440508, 18.5115482219]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121321818, 18.5115443985]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121146973, 18.511536879]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121034539, 18.5115294905]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121026667, 18.511515153]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121217565, 18.5115119165]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121341034, 18.5115121319]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121464533, 18.5115123472]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121588062, 18.5115125627]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121716937, 18.5115092202]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121712637, 18.5114914449]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121697784, 18.5114808133]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121662951, 18.5114631676]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121587161, 18.5114525419]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121552863, 18.511435078]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121543806, 18.5114212173]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121540121, 18.5114040023]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121525831, 18.5113937058]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121492095, 18.5113766153]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121488601, 18.5113596804]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121444552, 18.5113495039]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121430586, 18.5113394133]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121427308, 18.5113227108]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121418749, 18.5113094139]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912138587, 18.5112928516]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121412321, 18.5112764816]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121374383, 18.5112633689]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912136605, 18.5112503652]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121352485, 18.5112406433]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912130154, 18.5112180697]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121229819, 18.5112083825]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121198141, 18.5111924431]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121185033, 18.5111829343]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121153645, 18.5111671499]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121145996, 18.5111546154]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912112551, 18.5111328152]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121083984, 18.5111234837]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912108187, 18.5111080968]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9121017394, 18.5110957694]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120992357, 18.5110774842]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120990533, 18.5110623709]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120864922, 18.5110531847]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120780038, 18.511053075]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120610312, 18.5110528557]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120508741, 18.5110617439]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120486343, 18.5110737904]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.91204923, 18.5110859311]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120515571, 18.5111042702]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120550266, 18.5111165956]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120579512, 18.5111320668]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120677718, 18.5111415057]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120770768, 18.5111540931]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120806431, 18.5111666623]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120836749, 18.5111824399]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120843686, 18.5111951064]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120815939, 18.5112109736]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120799211, 18.5112205399]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120800508, 18.5112366041]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912077241, 18.5112527229]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120744142, 18.5112689399]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120721402, 18.5112819847]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912063929, 18.5112950026]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120532442, 18.5112882603]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120561453, 18.511271928]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120549333, 18.5112621322]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120507871, 18.5112523289]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120478169, 18.5112361291]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120407807, 18.5112263801]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912037856, 18.5112103403]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120366916, 18.5112007718]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912036694, 18.5111849297]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120390107, 18.5111723574]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912042465, 18.5111536113]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120447542, 18.5111411881]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120412933, 18.5111287453]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120407117, 18.5111164016]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120338485, 18.5111070959]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120304368, 18.511094818]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120293114, 18.5110856672]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120310298, 18.5110765865]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122033351, 18.5112578488]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390509499, 18.4804142343]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390608789, 18.4804141681]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390822988, 18.4804245109]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391043621, 18.4804313734]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391198309, 18.4804382962]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391381095, 18.480448744]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391475454, 18.4804522118]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391641891, 18.480452098]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391841583, 18.4804519615]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9391874861, 18.4804519387]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392141056, 18.4804517567]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392240864, 18.4804516884]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392440452, 18.4804515519]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.939260675, 18.4804514382]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392739771, 18.4804513472]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392872777, 18.4804512562]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9392977067, 18.480447655]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9393180828, 18.4804439906]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.939334682, 18.4804438776]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9393517001, 18.480440241]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9393748789, 18.4804401738]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9393847998, 18.4804401736]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.939401335, 18.4804401737]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9394178699, 18.4804401734]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9394340345, 18.4804436936]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9394505794, 18.4804436934]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9394737423, 18.480443693]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9394866395, 18.4804472176]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395028651, 18.4804507464]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.93951943, 18.4804507462]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395356852, 18.4804542792]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395456301, 18.480454279]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395613219, 18.4804649042]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395773564, 18.4804720089]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9395903788, 18.4804755677]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9396100748, 18.4804791307]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9396231327, 18.480482698]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9396397879, 18.4804826978]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9396528718, 18.4804862695]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.939666204, 18.4804862693]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9396828694, 18.4804862692]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397028676, 18.4804862688]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397128669, 18.4804862687]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397395313, 18.4804862684]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397561966, 18.4804862683]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397728618, 18.480486268]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9397961931, 18.4804862676]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398128584, 18.4804862675]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398295237, 18.4804862674]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398428559, 18.4804862672]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398595211, 18.480486267]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398728534, 18.4804862668]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398861857, 18.4804862667]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9398961848, 18.4804862665]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9399195162, 18.4804862663]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9399361814, 18.480486266]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9399528468, 18.4804862659]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.939966179, 18.4804862657]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9399827634, 18.4804934222]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9399960794, 18.480497007]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400127526, 18.480500596]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400327894, 18.4805041894]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400461603, 18.4805077872]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400595522, 18.4805148351]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400696098, 18.4805183026]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9400863805, 18.4805216783]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9401031342, 18.4805214391]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9401165746, 18.480524865]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9401333297, 18.4805246256]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.94015008, 18.480524386]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9401668972, 18.4805277662]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9401836479, 18.480527526]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402003951, 18.4805273006]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402171487, 18.4805271814]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402338998, 18.4805270621]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402506485, 18.4805269427]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402673947, 18.4805268234]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.940277577, 18.4805303481]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9402944752, 18.4805338285]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403049879, 18.480544582]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403394271, 18.4805624657]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404033825, 18.4805620001]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404235716, 18.4805618533]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.940437493, 18.4805690319]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.940454818, 18.4805762023]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404557921, 18.4805908417]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404536261, 18.4806092655]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404405362, 18.480616758]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404274132, 18.4806242695]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9404108533, 18.480631826]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403972379, 18.4806319292]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403836208, 18.4806320324]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403696148, 18.4806247057]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403622462, 18.4806136455]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9403554564, 18.4806136965]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390509499, 18.4804142343]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9516209664, 18.4690526029]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9516205115, 18.469064471]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9516097541, 18.4691233835]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9515918469, 18.469145834]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9515813708, 18.4691934104]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9515542462, 18.4692275576]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9515103719, 18.4692488165]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9514841052, 18.4692591141]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9514406883, 18.4692679916]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9514050741, 18.4692900955]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9513693392, 18.4693122741]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9513163166, 18.4693330717]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9512536752, 18.4693658504]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9512269946, 18.4693763218]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9511976467, 18.4694236549]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9511690626, 18.4694584002]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9511557385, 18.4695203317]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9511524489, 18.4695615314]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9511402751, 18.4696030311]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9510959738, 18.4696030315]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.951074656, 18.4696448347]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9510698188, 18.4697010506]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9510637051, 18.4697720992]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9510329343, 18.4698150988]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509970167, 18.4698139515]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509611112, 18.4698128049]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509575728, 18.4697553816]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509807314, 18.4696993601]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509846701, 18.4696572802]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509911709, 18.4695878254]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509700356, 18.4695320567]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509464411, 18.4695039796]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9509142531, 18.4694757786]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9508853085, 18.4695021165]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9508547827, 18.4695422516]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9508298615, 18.4696105867]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9508061687, 18.4696657337]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9508000375, 18.4697219711]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507759702, 18.4697781914]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507515425, 18.4698356118]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507267407, 18.4698942772]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507107841, 18.4699536909]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506781609, 18.4699983087]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506379646, 18.4700279369]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505956679, 18.4700729664]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505479351, 18.4700867077]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505221756, 18.4700717266]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.950546442, 18.4700264032]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505887557, 18.469981729]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506216681, 18.4699372408]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506651661, 18.4698784435]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506812499, 18.4698197948]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506971711, 18.4697617363]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507055461, 18.4696907207]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507121177, 18.4696347971]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507218567, 18.4695519204]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9507298658, 18.4694837648]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506966736, 18.4694691762]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506585526, 18.4694952061]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9506342986, 18.4695492293]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505940032, 18.4695894039]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505514224, 18.4696445481]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9505210171, 18.4696725576]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9504825293, 18.4697582771]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9504695711, 18.4697871376]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9504344536, 18.4698451475]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503984358, 18.469844559]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503645826, 18.4698293085]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503752913, 18.4697565497]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503858657, 18.4696847031]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503921469, 18.4696420256]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9504004489, 18.4695856177]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.950399911, 18.469529632]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503993783, 18.4694741996]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503449732, 18.4694872072]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503297851, 18.4695288217]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503189633, 18.469598873]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9503080053, 18.4696698043]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9502901918, 18.4697271954]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9502275609, 18.4697271978]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9502120041, 18.4697127959]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501720949, 18.4696841019]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501638262, 18.4696271435]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501668273, 18.4695567418]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501650976, 18.4695149205]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501458842, 18.46947341]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9501021429, 18.4694734105]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9500584012, 18.4694734117]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9500358977, 18.4695010526]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9500107355, 18.4695427713]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9499677129, 18.4695848029]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9499464863, 18.469556748]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9499306578, 18.4695010555]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9499062596, 18.4694459123]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9516209664, 18.4690526029]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9374919636, 18.4813428766]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375086125, 18.4813430276]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375234154, 18.4813431618]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937538222, 18.4813432961]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375493293, 18.4813433968]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375567354, 18.481343464]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375690187, 18.4813479272]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375820013, 18.4813480455]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375894069, 18.4813481446]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9375986463, 18.4813483114]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376060398, 18.481348445]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376149839, 18.4813507683]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937626088, 18.481350969]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937639048, 18.4813512035]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937648029, 18.4813535318]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376533137, 18.4813557965]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376644463, 18.4813559987]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376774395, 18.4813562348]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9376867239, 18.4813564034]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937697869, 18.4813566059]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377071596, 18.4813567747]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377164531, 18.4813569435]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377238901, 18.4813570786]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377350489, 18.4813572813]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377480727, 18.4813575179]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.937753656, 18.4813576193]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377611021, 18.4813577546]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377722747, 18.4813579576]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377761985, 18.4813558556]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377855074, 18.4813560244]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9377948191, 18.481356193]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378059971, 18.4813563957]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378153151, 18.4813565647]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378227717, 18.4813567]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378358251, 18.4813569366]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378432867, 18.4813570719]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378507502, 18.4813572073]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378619489, 18.4813574103]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378712843, 18.4813575796]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378787547, 18.481357715]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378880953, 18.4813578844]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9378937011, 18.481357986]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379049158, 18.4813581894]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379161346, 18.4813583927]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379236161, 18.4813585284]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379309997, 18.4813608411]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379384897, 18.4813609772]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379440168, 18.4813632597]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379494638, 18.4813677318]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379586032, 18.4813744803]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379641685, 18.4813767824]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379753957, 18.4813791925]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379828685, 18.4813815366]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379902326, 18.4813882549]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9379959173, 18.4813882021]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380015463, 18.481390367]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380128723, 18.4813924816]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380185179, 18.4813946518]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380299034, 18.4813945451]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380374606, 18.4813966998]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380449995, 18.4814010885]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380526017, 18.4814010169]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380601855, 18.4814031792]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380677906, 18.4814031074]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380715929, 18.4814030715]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9380944011, 18.4814028562]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381115016, 18.4814026946]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381228993, 18.4814025871]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381418906, 18.4814024076]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381532826, 18.4814023001]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381608761, 18.4814022282]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381703666, 18.4814021386]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381836506, 18.4814020132]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9381931375, 18.4814019236]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382026229, 18.4814018341]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.93821021, 18.4814017624]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938221589, 18.481401655]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382310699, 18.4814015655]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382405493, 18.481401476]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382500271, 18.4814013865]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382595037, 18.481401297]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382689785, 18.4814012075]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382765575, 18.481401136]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382803465, 18.4814011002]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9382955004, 18.4814009571]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383049698, 18.4814008678]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938308757, 18.4814008319]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383220106, 18.4814007068]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383352824, 18.4814006775]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383447664, 18.4814006774]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383542506, 18.4814006773]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383637346, 18.4814006773]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383732186, 18.4814006772]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383845995, 18.4814006771]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9383940837, 18.4814006772]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384035677, 18.481400677]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384130518, 18.481400677]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384225358, 18.4814006769]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384358136, 18.4814006769]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384434008, 18.4814006769]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384512185, 18.4814028877]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384590462, 18.4814051014]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384668842, 18.4814073181]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384747316, 18.4814095373]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384847444, 18.4814139843]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9384928763, 18.4814184427]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.93849695, 18.4814206762]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938508396, 18.4814206756]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385127534, 18.4814251513]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385225816, 18.4814273933]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385321382, 18.4814273932]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385422755, 18.4814318858]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385540562, 18.4814341364]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385677683, 18.4814363898]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385779772, 18.4814409054]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9385920545, 18.4814454325]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386000677, 18.4814477004]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386080914, 18.4814499714]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386203174, 18.4814545218]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386299478, 18.4814545218]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386399332, 18.4814568012]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386518598, 18.4814590844]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386622426, 18.4814636585]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386742072, 18.4814659497]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9386880558, 18.4814681134]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938698459, 18.481472607]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387023108, 18.4814725686]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387455103, 18.4814767459]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387532177, 18.4814766691]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387609241, 18.4814765921]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387744079, 18.4814764575]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387821109, 18.4814763812]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9387994402, 18.4814762084]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388119834, 18.4814714786]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388215948, 18.4814713823]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388326473, 18.481468975]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388441691, 18.4814688608]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388556888, 18.4814687467]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938863367, 18.4814686704]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388748829, 18.4814685561]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388863967, 18.4814684416]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388979084, 18.4814683275]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389099453, 18.4814705039]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389162349, 18.4814727401]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389258357, 18.4814726445]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389384473, 18.4814771243]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389461355, 18.4814770475]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389519008, 18.4814769898]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389634297, 18.4814768745]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389697603, 18.4814791178]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389793715, 18.4814790214]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389870587, 18.4814789454]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389985882, 18.48147883]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390074562, 18.4814833617]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390098312, 18.4814926151]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9390019585, 18.4814996847]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389967486, 18.4815020742]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389851436, 18.4815021926]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389793403, 18.4815022518]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389677321, 18.4815023701]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389580567, 18.4815024688]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389572474, 18.4815071603]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389581316, 18.4815189126]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389559378, 18.4815260293]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389498311, 18.4815332152]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389436999, 18.4815404303]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389389456, 18.4815452634]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389305573, 18.4815429587]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389235886, 18.4815382547]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.938914684, 18.4815335828]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9389072178, 18.4815265363]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388939416, 18.4815195762]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388856371, 18.4815173023]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388763168, 18.481510337]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9388724334, 18.4815103769]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9374919636, 18.4813428766]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7994922769, 18.5082829789]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7994973596, 18.5082830179]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995075258, 18.5082830956]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995304038, 18.508283271]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995354887, 18.5082833099]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995532879, 18.5082834463]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995660038, 18.5082835437]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995761778, 18.5082836216]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7995918348, 18.5082809889]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996049355, 18.5082783391]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996154831, 18.5082756726]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996281869, 18.5082757693]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799641624, 18.5082703859]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996496009, 18.5082677079]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996626422, 18.508265071]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996727881, 18.5082651477]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996858128, 18.508262513]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7996937562, 18.5082598428]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997064293, 18.5082599382]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799711499, 18.5082599764]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997292453, 18.5082601098]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997396986, 18.5082574606]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997498365, 18.5082575367]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997602753, 18.5082548899]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.79977041, 18.5082549659]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997808341, 18.5082523215]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997909655, 18.5082523972]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998041821, 18.5082470593]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998143051, 18.5082471347]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998269606, 18.5082472289]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998373431, 18.5082445918]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998499949, 18.5082446859]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998601177, 18.508244761]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998730099, 18.5082421449]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998805997, 18.5082422012]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998934766, 18.5082395874]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999061225, 18.508239681]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999164539, 18.5082370508]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999240391, 18.5082371068]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999370863, 18.508231798]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999446649, 18.5082318538]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999572974, 18.5082319467]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999699317, 18.5082320396]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999826044, 18.5082319848]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999956261, 18.5082264953]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000108241, 18.5082263839]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000209547, 18.5082263097]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000310841, 18.5082262355]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000437442, 18.5082261427]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.800053871, 18.5082260685]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000665279, 18.5082259757]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.800079183, 18.5082258831]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000893057, 18.5082258089]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001019575, 18.5082257162]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001095478, 18.5082256606]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001219947, 18.5082309589]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001294946, 18.508233603]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001420714, 18.5082362122]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001495886, 18.5082388615]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001621872, 18.5082414759]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001722601, 18.5082441116]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001848817, 18.5082467311]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001923098, 18.508254833]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002049673, 18.508257463]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002072925, 18.5082683748]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002094667, 18.5082876007]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002091969, 18.5083014388]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002089256, 18.508315354]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8002035488, 18.5083265829]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001955001, 18.5083407008]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001875391, 18.5083492351]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001794078, 18.5083634825]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.800173986, 18.5083720743]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001632483, 18.5083836045]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001552479, 18.5083894113]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001496672, 18.5084009787]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001363785, 18.5084068699]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001282077, 18.5084156343]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.800117484, 18.5084215385]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8001065067, 18.5084332998]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000958392, 18.5084363162]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000849053, 18.5084452069]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000739324, 18.5084541293]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000631998, 18.5084571715]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000551053, 18.5084601945]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000416935, 18.5084632673]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000306032, 18.5084722548]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000196384, 18.5084782953]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8000086471, 18.5084843504]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999976291, 18.5084904201]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999867688, 18.508493508]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999760857, 18.5084936022]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799965036, 18.5084995613]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999515136, 18.5085024441]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999406435, 18.5085053529]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999297621, 18.5085082647]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999164261, 18.5085081457]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7999057587, 18.5085080506]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998924263, 18.5085079318]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799882251, 18.5085018288]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998718502, 18.5084987357]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998614627, 18.5084956465]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998516111, 18.508486589]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998444442, 18.5084775871]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998399472, 18.5084686397]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998357346, 18.5084567736]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998315416, 18.5084449622]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998250149, 18.5084302632]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998118917, 18.5084301519]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998077752999, 18.5084184636]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998091835, 18.5084039827]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998105839, 18.5083895832]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998119763, 18.5083752647]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799813361, 18.5083610264]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998118799, 18.5083496721]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7998075498, 18.5083411642]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997949419, 18.5083382458]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997872112, 18.5083381842]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997717516, 18.508338061]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7997588708, 18.5083379584]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.799753719, 18.5083379174]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7994922769, 18.5082829789]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7712075582, 18.6726910173]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7712616803, 18.6726295876]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7713827966, 18.6726303211]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7714796947, 18.6726309055]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7715790199, 18.672601345]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7716855329, 18.6724797479]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7717871553, 18.6724169524]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7718664842, 18.6723248958]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7719691252, 18.6722351511]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7720452447, 18.6721757057]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7721667332, 18.672147896]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7722899379, 18.6720904543]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7723852585, 18.6720927691]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7725044459, 18.6720956632]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7726729271, 18.6720862827]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728172106, 18.6720780893]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730092957, 18.6720679986]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731291903, 18.6720621846]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731974623, 18.6721494862]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731673499, 18.6723018901]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731152761, 18.6723958688]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730845251, 18.6725513162]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.773079227, 18.6726757789]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730707686, 18.6728691481]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730648517, 18.6730017585]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730835021, 18.6731350287]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731255566, 18.6733027638]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731443234, 18.6734415119]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.773161698, 18.6736173669]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7731822141, 18.6737235788]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7732263739, 18.6738678537]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7732933833, 18.6740848075]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7733135397, 18.6742257494]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734075925, 18.6744420696]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.77342839, 18.6745855625]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734760777, 18.674695528]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734692552, 18.6749132785]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734622438, 18.6751357482]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734563377, 18.6753231535]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734487206, 18.6755584864]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7734211945, 18.6755972316]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7733192706, 18.6755122748]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7732162801, 18.6754674437]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7730919243, 18.6753112019]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7729665519, 18.6751984493]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728178066, 18.6750491479]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727217931, 18.6749014905]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7726777155, 18.674756966]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7726870811, 18.6745773825]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727202659, 18.674432142]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727787685, 18.6742860689]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727864686, 18.6741389232]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727939932, 18.6739941095]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728056949, 18.6737569674]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.772814211, 18.6735869804]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728233838, 18.6734110529]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728322156, 18.6732392603]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7728144452, 18.6731052047]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7727472465, 18.6729780261]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7726520787, 18.672920495]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7725043707, 18.6729290869]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7724519, 18.672990995]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7723728353, 18.6730845901]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7723404729, 18.6732119976]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7723325582, 18.673340759]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7722668077, 18.673600674]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7722582392, 18.6737346122]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7721884046, 18.6740391655]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.772160813, 18.6740744983]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7720552505, 18.6741431362]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7719102942, 18.6740633903]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7717654708, 18.6739876911]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7716953533, 18.6739199511]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7717055989, 18.6737871945]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7717406459, 18.6736556838]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7718002412, 18.6735254]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7718840763, 18.6733967441]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7718935294, 18.673267634]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7719052553, 18.6731074761]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7718389504, 18.6730106259]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7717582453, 18.673105031]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7716771163, 18.6732000361]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7715903443, 18.6733600821]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7715577191, 18.6734570196]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7714698478, 18.6736192499]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7714089806, 18.6737501645]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7713698559, 18.6739155761]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7712506152, 18.6738474327]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7712433151, 18.6736494062]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7711835983, 18.6734856033]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7711737173, 18.6733236338]),{"landcover": 0,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.7712075582, 18.6726910173]),{"landcover": 0,"system:index": "0"}),
]);
var notlandfill = /* color: #3b8b00 */ee.FeatureCollection([
ee.Feature(ee.Geometry.Point([73.9082384538, 18.5015680683]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9082394779, 18.5015298215]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9084496168, 18.5013772012]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9085344515, 18.5013009915]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9087833652, 18.5011868152]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9091152602, 18.5009966283]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9093216197, 18.5008825693]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9094852887, 18.5008446571]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9096488926, 18.5008067593]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9099362022, 18.5007311506]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9103069892, 18.5005799279]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9106344138, 18.5005427266]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9112096508, 18.5003929091]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9117079906, 18.5003210821]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9122895721, 18.5001756053]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.912738858, 18.5001786537]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9130629837, 18.5001801402]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9135452891, 18.5002187808]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9137845133, 18.5002939214]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9139426476, 18.5004063785]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9140601456, 18.5005186328]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9141784002, 18.5005934475]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9142534889, 18.5008564612]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9143275988, 18.501119814]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9143209126, 18.5013839037]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9143171164, 18.5015352368]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9143122735, 18.5017248076]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9142655554, 18.5019528934]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9142569748, 18.5022581809]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9141721765, 18.5024112986]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9141702298, 18.5025262676]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9141242086, 18.5028334227]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9140387396, 18.503064337]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9140353021, 18.5032571071]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9139923228, 18.5034114143]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.913907402, 18.5036431786]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9139038296, 18.5039138755]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9138596615, 18.5041849089]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9137743637, 18.504456474]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9137295894, 18.504728615]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9136455827, 18.5048842886]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9136017987, 18.5050791517]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9134755344, 18.5053519094]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9133094907, 18.5054693168]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.913061459, 18.5055866867]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9127746646, 18.5055864565]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9126929124, 18.5055862841]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9123248085, 18.5055856947]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9120781966, 18.5055860103]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9117908782, 18.5055474276]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9116271342, 18.5055085724]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9114625838, 18.5055088142]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9112996923, 18.5054308739]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9110545847, 18.5053530735]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9108104428, 18.5052362459]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9105252753, 18.5051195399]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9102818845, 18.5050026484]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9101616171, 18.5048858054]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9099184503, 18.5047690806]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.909351099, 18.5044971425]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9091076786, 18.5043808231]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9089446826, 18.5043034821]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9089054734, 18.5042259273]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9082384538, 18.5015680683]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8775357993, 18.4967064234]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8780327991, 18.4968945136]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8785307496, 18.4968945813]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8790303551, 18.4968946434]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8794316918, 18.4968006979]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8798361448, 18.4965188966]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8801399829, 18.4961432779]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.880640324, 18.4958616885]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8810430878, 18.4955802762]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.881545697, 18.495299057]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.882146057, 18.4951117613]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8828455853, 18.4949245743]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8831458708, 18.4948310254]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8836464427, 18.4947377289]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8841452046, 18.49473809]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8844412529, 18.4949255707]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8846329303, 18.4953940892]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8848236819, 18.4960505614]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8848188909, 18.4966136417]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8848164233, 18.4968952758]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8848095347, 18.4973648781]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8846031742, 18.4978348133]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8844936356, 18.4984932698]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8841829851, 18.4991525807]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8840729312, 18.4997183071]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8837649901, 18.5001902566]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8832641098, 18.500284863]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8827667242, 18.500284746]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8820689233, 18.5001907038]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8813720096, 18.500002339]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8807768399, 18.4997195558]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8800817189, 18.4994368628]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8791947062, 18.4988712049]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8785043459, 18.4984001801]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8778089872, 18.4980236626]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8772154395, 18.4977411948]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8775357993, 18.4967064234]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8647554579, 18.5112493982]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.865164333, 18.5110569097]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.865578253, 18.5106726181]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8659867935, 18.5104803172]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8664960121, 18.5102879634]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.866699693, 18.510192027]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8672018257, 18.510192087]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8677053864, 18.5101916394]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8682162983, 18.5099986294]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8687213739, 18.5099026397]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8692233055, 18.5099026957]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8697252404, 18.509902753]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8705314298, 18.5099016822]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8711405577, 18.5098991404]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8718508934, 18.5098961723]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8723545405, 18.5098954426]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8728555405, 18.509895743]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8734542382, 18.5099920293]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8737498911, 18.5101841145]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8743488399, 18.5102804534]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8747449839, 18.5104726967]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8750385878, 18.5107609989]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.875432524, 18.5110495652]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8757261041, 18.5113383151]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8757165928, 18.5117231344]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.875704702, 18.5122995847]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8756961983, 18.5127795563]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8754851461, 18.5133556831]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8754797438, 18.5136441349]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8753719261, 18.5140288789]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8751615975, 18.5145100557]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8747516425, 18.5148951593]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8743452344, 18.5150877456]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8739406235, 18.5151840161]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.873637625, 18.5151845003]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.873031506, 18.5151855158]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8723242663, 18.5151866982]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8716174048, 18.5151876225]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8709107343, 18.5151884006]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8703075537, 18.5150924403]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8697057915, 18.5149005212]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8693038289, 18.5148047572]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.868800765, 18.5147091799]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8684014101, 18.5145169378]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8678012746, 18.5142292097]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8673000273, 18.5140376479]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8669052828, 18.5137483689]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8662100819, 18.5133634201]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8647554579, 18.5112493982]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8937689805, 18.5280470446]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8939741078, 18.5278498592]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.894280129, 18.527462112]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8945868698, 18.527168479]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.894996567, 18.5267745744]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8955089568, 18.5263766288]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8957152134, 18.5260788874]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8960213976, 18.5257855411]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8964281401, 18.525590695]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8967346253, 18.5251998915]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8970398123, 18.5250049258]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.897448139, 18.5245159919]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8981603604, 18.5241227523]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8984648807, 18.524120763]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8991736317, 18.5239314721]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8995791055, 18.5237392304]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9000860454, 18.5236421194]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9004912919, 18.5236425826]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9012010849, 18.5234480344]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.901809019, 18.5234480347]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9022143926, 18.5234474577]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9029238013, 18.5234456478]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9034304664, 18.5234443576]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.904038194, 18.5236383335]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9044434314, 18.5237350709]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9048485236, 18.524127304]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9051524935, 18.5245192737]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.905253819, 18.5250079063]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9052537715, 18.5253989325]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9052537288, 18.5258882959]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9052536301, 18.5264777321]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9049488715, 18.5271614847]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9048471743, 18.5275527932]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9046437691, 18.5280423322]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9043382013, 18.5289283872]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9039306091, 18.5296203714]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9036246477, 18.5305001264]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9033186404, 18.5310883875]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9031142996, 18.5314841468]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9027058199, 18.5318834708]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9022977554, 18.531985575]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9014818582, 18.5319915005]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.9005640272, 18.5318989814]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8996480809, 18.5316975035]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8990378327, 18.5315946755]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8981215197, 18.5312060176]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8973092984, 18.5310015381]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8960875589, 18.530614806]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8951704812, 18.5305201806]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8945618179, 18.5302238198]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8941561938, 18.5300263154]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8937689805, 18.5280470446]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8658844771, 18.4825834795]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8659873144, 18.4824922613]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8663820895, 18.4822144165]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8668983966, 18.4818527629]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8671175527, 18.4814906213]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8677218508, 18.4811262457]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8682231788, 18.4806674822]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8686240263, 18.4803006712]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8689195385, 18.4801160669]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8695153928, 18.4796565792]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8698098978, 18.4795643337]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8701923607, 18.4794671278]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8706709086, 18.4794615909]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8712507568, 18.4794575705]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8719316609, 18.4794549818]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8726173445, 18.4794548914]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.873309816, 18.479458367]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8738039169, 18.4794606849]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8746908265, 18.4794636387]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8753797191, 18.4795582173]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8760739014, 18.4796559593]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8765657623, 18.479935348]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8769617642, 18.480123278]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8771521823, 18.4805835083]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8774382376, 18.481320699]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8777355321, 18.4816934279]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8779291216, 18.4820629916]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8779100437, 18.4827020915]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8779018602, 18.4829762579]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8778882089, 18.4834335655]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8778745449, 18.4838913235]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8778535541, 18.4844391683]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8776387335, 18.4850820324]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8775280773, 18.4854490191]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8773147377, 18.4860008877]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.877196668, 18.4866455222]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8767860275, 18.4871988509]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8764646625, 18.4880299914]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8760441395, 18.4888626212]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8754218167, 18.4897893502]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.875017873, 18.490161305]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8747108078, 18.4906266714]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8740091671, 18.4910925176]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8737062995, 18.4913721188]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8732018924, 18.4916512101]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8728876353, 18.4921167063]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8721817278, 18.4924895659]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.87187753, 18.4927697574]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8714787779, 18.4928631128]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8709759582, 18.493143412]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8702696388, 18.4936108634]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8698705047, 18.4937043447]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8691774335, 18.4937042854]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8682888032, 18.4937044217]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8674990439, 18.4937045408]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8669989464, 18.4937040971]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8664015288, 18.4936099397]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8660099307, 18.4934227351]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8657213027, 18.4931421506]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8651518068, 18.4923010275]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8648744209, 18.4916475957]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8643204545, 18.4903426103]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8639618392, 18.4890395549]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8633163659, 18.4877405829]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8630608537, 18.4866296969]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8630978291, 18.4854268199]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8631240321, 18.4845023028]),{"landcover": 1,"system:index": "0"}),
ee.Feature(ee.Geometry.Point([73.8658844771, 18.4825834795]),{"landcover": 1,"system:index": "0"}),
]);
var composite=(ee.ImageCollection("COPERNICUS/S2_SR")
.filterBounds(POI)
.filterDate('2019-01-01', '2019-12-31')
// .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',7))
.sort('CLOUDY_PIXEL_PERCENTAGE')
// .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
.mean()
.clip(POI))
// Merge the three geometry layers into a single FeatureCollection.
var newfc = landfill.merge(notlandfill);
// Use these bands for classification.
var bands = ['B4', 'B5', 'B6','B8'];
// The name of the property on the points storing the class label.
var classProperty = 'landcover';
// Sample the composite to generate training data.  Note that the
// class label is stored in the 'landcover' property.
var training = composite.select(bands).sampleRegions({
  collection: newfc,
  properties: [classProperty],
  scale: 30
});
// Train a CART classifier.
var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: classProperty,
});
// Print some info about the classifier (specific to CART).
print('CART, explained', classifier.explain());
// Map.addLayer(landfill,{},"Landfill training points");
// Classify the composite.
var classified = composite.classify(classifier).clip(POI);
// Map.centerObject(newfc);
Map.addLayer(classified, {min: 0, max: 2, palette: ['red', 'green', 'blue']},"classified");
// Optionally, do some accuracy assessment.  Fist, add a column of
// random uniforms to the training dataset.
var withRandom = training.randomColumn('random');
// We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.7;  // Roughly 70% training, 30% testing.
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
// Trained with 70% of our data.
var trainedClassifier = ee.Classifier.gmoMaxEnt().train({
  features: trainingPartition,
  classProperty: classProperty,
  inputProperties: bands
});
// Classify the test FeatureCollection.
var test = testingPartition.classify(trainedClassifier);
// Print the confusion matrix.
var confusionMatrix = test.errorMatrix(classProperty, 'classification');
var OA = confusionMatrix.accuracy()
var CA = confusionMatrix.consumersAccuracy()
var Kappa = confusionMatrix.kappa()
var Order = confusionMatrix.order()
var PA = confusionMatrix.producersAccuracy()
print(confusionMatrix,'Confusion Matrix')
print(OA,'Overall Accuracy')
print(CA,'Consumers Accuracy')
print(Kappa,'Kappa')
print(Order,'Order')
print(PA,'Producers Accuracy')
print("-----------------------------------------------------")
}
function Texture(){
var PuneCity=POI
var img=ee.ImageCollection('COPERNICUS/S2_SR')
var sorted_p1=(img
.filterDate('2020-01-01', '2020-12-31')
.filterBounds(PuneCity)
.sort('CLOUDY_COVER')
.first())
var sorted_p2 = img.sort('CLOUD_COVER').filterBounds(PuneCity).first();
var scene = sorted_p1.add(sorted_p2);
print(scene)
var nir = scene.select("B3");
nir=nir.int32()
// Define a neighborhood with a kernel.
var square = ee.Kernel.circle({radius: 1});
// Compute entropy and display.
var entropy = nir.entropy(square);
Map.addLayer(entropy.clip(PuneCity),
             {min: 1.576, max: 1.635, palette: ['#ffffff','#000000','#000000']},
             'entropy');
}
// Map.addLayer(POI,{},"Pune City")