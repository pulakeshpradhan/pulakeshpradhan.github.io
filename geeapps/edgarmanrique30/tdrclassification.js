/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var collection_m = ee.ImageCollection("users/edgarmanrique30/comunities"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[-72.88612246513367, -7.6192716737477655],
           [-72.88640141487122, -7.619808696024546],
           [-72.88609027862549, -7.619973524509094],
           [-72.88598567247391, -7.619960231891727],
           [-72.88591057062149, -7.619994792696028],
           [-72.88596153259277, -7.620162279631226],
           [-72.88559138774872, -7.6204201562129095],
           [-72.88562089204788, -7.620558399264929],
           [-72.88528561592102, -7.620789690425242],
           [-72.88550019264221, -7.6212894915863965],
           [-72.88494229316711, -7.621555343030177],
           [-72.88480550050735, -7.621512806810271],
           [-72.8845962882042, -7.621560660057379],
           [-72.88397669792175, -7.620481302183727]]],
         [[[-73.15387666225433, -3.4445135753767286],
           [-73.15402686595917, -3.444615315183268],
           [-73.15419852733612, -3.445691614575819],
           [-73.15422534942627, -3.4461146373869163],
           [-73.15419852733612, -3.4465108864317657],
           [-73.15364599227905, -3.446580497733414],
           [-73.15312027931213, -3.446650109029974],
           [-73.15283060073853, -3.4467304297504393],
           [-73.15228343009949, -3.4467464938937167],
           [-73.1520688533783, -3.4467518486080864],
           [-73.15182745456696, -3.4467464938937167],
           [-73.1518167257309, -3.4463663090966947],
           [-73.15149486064911, -3.446077154360612],
           [-73.15149486064911, -3.4456969692961184],
           [-73.15124273300171, -3.445530972952718],
           [-73.15122127532959, -3.445402459634706],
           [-73.15131783485413, -3.445193625455927],
           [-73.15164506435394, -3.445188270732804],
           [-73.15172553062439, -3.4449955006798727],
           [-73.15203130245209, -3.4450115648524355],
           [-73.15219759941101, -3.444749183333191]]],
         [[[-73.06606650352478, -3.359664176567541],
           [-73.06646347045898, -3.3602586034061543],
           [-73.06652247905731, -3.361415324865002],
           [-73.06649565696716, -3.361913357292955],
           [-73.06532084941864, -3.361961553966026],
           [-73.0644142627716, -3.3619669091517794],
           [-73.0644303560257, -3.360199696258144],
           [-73.06453227996826, -3.360162209889357],
           [-73.0645751953125, -3.3596588213691536]]],
         [[[-73.06433379650116, -3.3578005657540744],
           [-73.06505531072617, -3.358483354611569],
           [-73.06571513414383, -3.3585315514540612],
           [-73.06586802005768, -3.358930514114401],
           [-73.06581974029541, -3.359230405402765],
           [-73.06539326906204, -3.359139366985681],
           [-73.06499361991882, -3.359225050201986],
           [-73.06434452533722, -3.359211662199937],
           [-73.06422650814056, -3.358984066136935],
           [-73.06407362222672, -3.3588903500955825],
           [-73.06414738297462, -3.358725677601098],
           [-73.06415811181068, -3.3585931363049006],
           [-73.06425333023071, -3.358551633471066],
           [-73.06423857808113, -3.358218271935361]]],
         [[[-73.0614772439003, -3.3578594730468767],
           [-73.06219607591629, -3.35791034752416],
           [-73.06224167346954, -3.357993353244563],
           [-73.0624669790268, -3.3579210579400933],
           [-73.06273519992828, -3.35803083969663],
           [-73.06275129318237, -3.3584405129718142],
           [-73.06268960237503, -3.358453900984436],
           [-73.06267887353897, -3.358807344451436],
           [-73.06272983551025, -3.358836798067908],
           [-73.06275397539139, -3.3589278365131974],
           [-73.06296855211258, -3.3590295853537846],
           [-73.06284785270691, -3.3594017718118767],
           [-73.06253671646118, -3.3593616078124464],
           [-73.0624669790268, -3.3594820998058004],
           [-73.06239187717438, -3.359391061412189],
           [-73.06220144033432, -3.359313411010932],
           [-73.06223899126053, -3.359152754988722],
           [-73.06238651275635, -3.3590028093441395],
           [-73.06263327598572, -3.35897871093482],
           [-73.06265473365784, -3.3588716068862277],
           [-73.06250989437103, -3.358812699654492],
           [-73.06234896183014, -3.3587752132324495],
           [-73.06220412254333, -3.3587966340452216],
           [-73.06228190660477, -3.3590081645461143],
           [-73.06222558021545, -3.3590938477739583],
           [-73.06212365627289, -3.359067071766069],
           [-73.06198954582214, -3.359208984599509],
           [-73.0619814991951, -3.359364285412455],
           [-73.06195199489594, -3.3595302965989817],
           [-73.0619466304779, -3.359629367777478],
           [-73.06206732988358, -3.3596186573802833],
           [-73.06209415197372, -3.359902482866152],
           [-73.06205660104752, -3.359956034835342],
           [-73.06208074092865, -3.3600711715591913],
           [-73.06130290031433, -3.3599721004255416],
           [-73.06135386228561, -3.35943122541041],
           [-73.06128948926926, -3.359374995812435],
           [-73.0613699555397, -3.3592518262055497],
           [-73.06161940097809, -3.359230405402765],
           [-73.06162476539612, -3.3590965253746914],
           [-73.06148529052734, -3.3589974541421137],
           [-73.06141018867493, -3.3590295853537846],
           [-73.06130290031433, -3.3590643941652343],
           [-73.06132167577744, -3.3587725356308265],
           [-73.06135922670364, -3.358510130635475],
           [-73.06137263774872, -3.3581004573895012],
           [-73.06147456169128, -3.3580442277148745]]],
         [[[-73.21945935487747, -3.491984717961869],
           [-73.22064757347107, -3.492022199167611],
           [-73.22064757347107, -3.4923943339148713],
           [-73.22056174278259, -3.4927450506999382],
           [-73.22037935256958, -3.4928119813692255],
           [-73.22022914886475, -3.4931412801925945],
           [-73.22020769119263, -3.493358135452211],
           [-73.22005480527878, -3.493374198802791],
           [-73.22001457214355, -3.493516091720883],
           [-73.21994483470917, -3.4936017629063456],
           [-73.21956664323807, -3.493465224450826],
           [-73.21961224079132, -3.4933152998493524],
           [-73.2192850112915, -3.4931412801925945],
           [-73.21922868490219, -3.4929271021092227],
           [-73.21921795606613, -3.4924050428262885]]],
         [[[-73.22932183742523, -3.4964074899066926],
           [-73.22916895151138, -3.4968947431678417],
           [-73.22887390851974, -3.497039312768033],
           [-73.2288658618927, -3.4971999456310083],
           [-73.22817385196686, -3.4970486830191234],
           [-73.228108137846, -3.4971972684168406],
           [-73.2278560101986, -3.49711829059577],
           [-73.22786808013916, -3.496910806457852],
           [-73.22794049978256, -3.4964181987722966],
           [-73.22803437709808, -3.4963700088761227],
           [-73.22812557220459, -3.4960581130993],
           [-73.22900399565697, -3.496296385418837]]],
         [[[-73.31795543432236, -3.4475389912920007],
           [-73.31818878650665, -3.4477237287662885],
           [-73.31798762083054, -3.448111945080807],
           [-73.31798762083054, -3.448534966815515],
           [-73.31788569688797, -3.4488883772343764],
           [-73.31674039363861, -3.4487197040963107],
           [-73.3167564868927, -3.448834830209664],
           [-73.31680208444595, -3.4489392469050655],
           [-73.31652581691742, -3.449153434962313],
           [-73.31642121076584, -3.449279270423444],
           [-73.31614762544632, -3.449220368720301],
           [-73.31481456756592, -3.448706317338037],
           [-73.31475019454956, -3.4485911912091236],
           [-73.31452757120132, -3.4485804818010695],
           [-73.31443101167679, -3.448470710361604],
           [-73.31439077854156, -3.448243135385756],
           [-73.31449538469315, -3.4482056524433427],
           [-73.31455171108246, -3.447849564416623],
           [-73.3146670460701, -3.447445283863781],
           [-73.3148843050003, -3.447445283863781],
           [-73.31501305103302, -3.447619311937393],
           [-73.31530004739761, -3.44764608548436],
           [-73.3159652352333, -3.447833500291985],
           [-73.31606984138489, -3.4477879852706685],
           [-73.31618249416351, -3.4474078008899176],
           [-73.31633269786835, -3.447281965181124],
           [-73.31676989793777, -3.44734889907085],
           [-73.31720173358917, -3.447439929153316],
           [-73.31741899251938, -3.447439929153316]]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//----------------------------------------------------------------------------------------------------
//High-accuracy detection of malaria vector larval habitats using drone-based multispectral imagery
//----------------------------------------------------------------------------------------------------
//
//Random Forest 3 approach classification
//Input data
var VB = ee.Image('users/gcarrasco/VB')
var ML_1 = ee.Image('users/gcarrasco/ML_1')
var ML_2 = ee.Image('users/gcarrasco/ML_2')
var ML_3 = ee.Image('users/gcarrasco/ML_3')
var SL = ee.Image('users/gcarrasco/SL')
var UM = ee.Image('users/gcarrasco/UM')
var LI = ee.Image('users/gcarrasco/LI')
//functions
// This functions mask the value with no data in the images, for visualization purposes
var __maskvaluesmulti__ = function(img){
  var mask = img.neq(0);
  return img.mask(mask)
};
var __maskvaluesrgb__ = function(img){
  var mask = img.neq(255);
  return img.mask(mask)
};
// Calculates the NDVI using the bands of the MS-camera
var addndvi = function(img) {
  var ndvi = img.expression('(NIR-RED)/(NIR+RED)', {
              'NIR': img.select('NIR'),
              'RED': img.select('red_m')
              }).rename('NDVI');
  return img.addBands(ndvi);
  };
//pre processing images
var collection_rgb = ee.ImageCollection([VB,ML_1,ML_2,ML_3,SL,UM,LI])
//masking values
collection_rgb = collection_rgb.map(__maskvaluesrgb__)
collection_m = collection_m.map(__maskvaluesmulti__)
//clipping extent
var __clip_col__ = function (img){return img.clip(geometry)}
collection_rgb = collection_rgb.map(__clip_col__)
collection_m = collection_m.map(__clip_col__)
//renaming bands
var __renameBandsRGB__ = function (img){return img.rename(['red','green','blue','mask'])}
var __renameBandsMulti__ = function (img){return img.rename(['red_m','green_m','Edge Red','NIR'])}
collection_rgb = collection_rgb.map(__renameBandsRGB__)
collection_m = collection_m.map(__renameBandsMulti__)
//converting collection to images
collection_rgb = collection_rgb.median()
collection_m = collection_m.median()
//getting a new image with all the bands
var image = collection_rgb.select(['red', 'green', 'blue']).addBands(collection_m, ['red_m','green_m','Edge Red','NIR'])
image = addndvi(image)
// init map 
function initMap(map) {
  map.centerObject(ee.Geometry.Point(-73.15280206002365, -3.445699917300257), 17);
}
// Initialize
initMap(Map);
// function to create map 1
function createMap1() {
var map = new ui.Map();
//roi
var roi = ee.FeatureCollection('users/edgarmanrique30/TDRDrones/roi_app1_final'); //1st approach only peru
var polygons= ee.FeatureCollection(roi,"geometry");
var classifier = ee.Classifier.smileRandomForest({
	numberOfTrees: 20,
});
var bands = ['red', 'green', 'blue', 'red_m','green_m','Edge Red','NIR','NDVI'];
//extract values
var regionsOfInterest = image.select(bands).sampleRegions({
	collection: polygons,
	properties: ['class', 'random'],
	scale: 2
});
//classification app1
var fullClassifier = classifier.train(regionsOfInterest, 'class', bands);
var image_class = image.classify(fullClassifier);
var palette =['EEEA88', '6eea1c', '215101', '6c706a', '435ebf'];
map.addLayer(image_class,{min: 0, max: 4, palette: palette},'classified image app1');
 //Adding a legend to the display
 // set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette2 =['EEEA88', '6eea1c', '215101', '435ebf', 'bf4343','4387bf', '6c706a'];
// name of the legend
var names = ['Bare Soil','Low Vegetation','High Vegetation', 'Water','Water positive', 'water negative', 'Urban'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette2[i], names[i]));
  }  
// add legend to map 
map.add(legend);
return map;
}
// function to create map 2
function createMap2() {
var map = new ui.Map();
//roi
var roi = ee.FeatureCollection('users/edgarmanrique30/TDRDrones/roi_app2_final') //2nd approach only peru
var polygons= ee.FeatureCollection(roi,"geometry");
//extract values
var classifier = ee.Classifier.smileRandomForest({
	numberOfTrees: 20,
});
var bands = ['red', 'green', 'blue', 'red_m','green_m','Edge Red','NIR', 'NDVI']
var regionsOfInterest = image.select(bands).sampleRegions({
	collection: polygons,
	properties: ['class', 'random'],
	scale: 2
});
//classification app 2
var fullClassifier = classifier.train(regionsOfInterest, 'class', bands);
var image_class = image.classify(fullClassifier);
var palette =['EEEA88', '6eea1c', '215101', '6c706a', 'bf4343','4387bf']; 
map.addLayer(image_class,{min: 0, max: 5, palette: palette},'classified image app2')
return map;
}
// function to create map 3
function createMap3() {
var map = new ui.Map();
//roi app1
var roi = ee.FeatureCollection('users/edgarmanrique30/TDRDrones/roi_app1_final') //1st approach only peru
var polygons1= ee.FeatureCollection(roi,"geometry");
var classifier = ee.Classifier.smileRandomForest({
	numberOfTrees: 20,
});
var bands = ['red', 'green', 'blue', 'red_m','green_m','Edge Red','NIR', 'NDVI']
//extract values app1
var regionsOfInterest1 = image.select(bands).sampleRegions({
	collection: polygons1,
	properties: ['class', 'random'],
	scale: 2
});
//classification app1
var fullClassifier = classifier.train(regionsOfInterest1, 'class', bands);
var image_app1 = image.classify(fullClassifier);
//water mask
var watermask = image_app1.eq(4)
var waterimage = image.updateMask(watermask)
//roi app3
var roi2 = ee.FeatureCollection('users/edgarmanrique30/TDRDrones/roi_app3_final');
var polygons2= ee.FeatureCollection(roi2,"geometry");
//extract values app3
var regionsOfInterest2 = waterimage.select(bands).sampleRegions({
	collection: polygons2,
	properties: ['class', 'random'],
	scale: 2
});
//classification app3
var fullClassifier2 = classifier.train(regionsOfInterest2, 'class', bands);
var image_app3 = waterimage.classify(fullClassifier2);
var palette = ['bf4343','4387bf']
map.addLayer(image, {bands: ['red', 'green', 'blue']})
map.addLayer(image_app3,{min:0, max:2, palette:palette},'only water classified - app3')
return map;
}
// add maps
function createMap(title) {
  var map = ui.Map();
  ui.Label(title, {position:'top-center'});
  map.add(title);
  return map;
}
function getMapSize() {
  var scale = Map.getScale();
  var bounds = ee.Geometry(Map.getBounds(true)).transform('EPSG:32648', scale).coordinates().get(0).getInfo();
  var ll = bounds[0];
  var ur = bounds[2];
  var width = (ur[0] - ll[0]) / scale;
  var height = (ur[1] - ll[1]) / scale;
  return { w: Math.floor(width), h: Math.floor(height) };
}
var maps = [createMap1(), createMap2(), createMap3()];
var height = getMapSize();
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '100vw', height: height + 'px'}
});
var linker = ui.Map.Linker(maps)
maps.map(function(map) { 
  initMap(map)
  map.setOptions('HYBRID')
  panel.add(map)
})
ui.root.clear();
ui.root.add(panel);