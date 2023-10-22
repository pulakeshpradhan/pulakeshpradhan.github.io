var AOI = ee.FeatureCollection("users/jespavon/SUGARCANE"),
    Img0213 = ee.Image("users/jespavon/2019_02_13"),
    Img0218 = ee.Image("users/jespavon/2019_02_18"),
    Img0223 = ee.Image("users/jespavon/2019_02_23"),
    Img0228 = ee.Image("users/jespavon/2019_02_28"),
    vs1 = {"opacity":1,"bands":["y_erase"],"min":0.19754364462591723,"max":0.9479738284831493,"palette":["ff4d09","ffdb5a","34ff60","319fff","1123ff"]},
    vs2 = {"opacity":1,"bands":["y_erase"],"min":0.3754919541677554,"max":0.7526946710744779,"palette":["ff4319","ffcf4a","6bff5a","6dc9ff","3632ff"]},
    vs3 = {"opacity":1,"bands":["y_erase"],"min":0.37826726558759816,"max":0.7957367166791162,"palette":["ff1a0f","ffc238","64ff48","5ac9ff","171eff"]},
    vs4 = {"opacity":1,"bands":["y_erase"],"min":0.37898665193436,"max":0.7777812294497229,"palette":["ff451b","ffe04a","7dff66","54a0ff","1b41ff"]},
    VIS_NDVI1 = {"opacity":1,"bands":["NDVI"],"min":0.1536178557086335,"max":0.8799908519189302,"palette":["ff2f0d","ffe177","52ff57","40afff","2f52ff"]},
    VIS_NDVI2 = {"opacity":1,"bands":["NDVI"],"min":0.09567896920422969,"max":0.8862905664225172,"palette":["ff2913","ffd950","86ff3a","4eb5ff","2939ff"]},
    VIS_NDVI3 = {"opacity":1,"bands":["NDVI"],"min":0.09567896920422969,"max":0.8862905664225172,"palette":["ff3717","ffce60","9cff52","46c3ff","114fff"]},
    VIS_NDVI4 = {"opacity":1,"bands":["NDVI"],"min":0.17110027234647007,"max":0.8728602148825124,"palette":["ff3507","ffe773","5cff48","5ccaff","232aff"]},
    geometry = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-78.49358626356491, -9.27499221123723],
          [-78.49251337995895, -9.275161628299452],
          [-78.49255629530319, -9.276559315941025],
          [-78.48556109419235, -9.274526313894327],
          [-78.48551817884811, -9.273848643927552],
          [-78.48568984022506, -9.27058733890898],
          [-78.48513194074997, -9.269697886826384],
          [-78.48530360212692, -9.266860096070369],
          [-78.48474570265182, -9.265081170767822],
          [-78.48646231642135, -9.264361127012297],
          [-78.48689146986374, -9.264488193664656],
          [-78.4866339777983, -9.265038815293648],
          [-78.48710604658493, -9.265547080646574],
          [-78.48852225294479, -9.265462369805501],
          [-78.4886509989775, -9.266267121970754],
          [-78.4888655756987, -9.267495424351669],
          [-78.48993845930465, -9.267622489869995],
          [-78.49204131117233, -9.271265015173432],
          [-78.49354334822067, -9.273806289511167]]]),
    geometry2 = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-78.48671973035192, -9.264534863651086],
          [-78.48679751441335, -9.264622221936309],
          [-78.48680287883138, -9.26468840244095],
          [-78.48672777697897, -9.26476517181071],
          [-78.48664731070852, -9.264762524591347],
          [-78.48658499787604, -9.26483061003928],
          [-78.48656354020392, -9.264989443135237],
          [-78.48655281136786, -9.26526475366473],
          [-78.48663864205633, -9.265434175421783],
          [-78.48682103226935, -9.265518886269662],
          [-78.48701415131842, -9.265571830539201],
          [-78.48717508385931, -9.265624774800761],
          [-78.48731455872809, -9.265635363652116],
          [-78.48758277962958, -9.265518886269662],
          [-78.48788318703924, -9.26546594199212],
          [-78.48806557725226, -9.265434175421783],
          [-78.4883981711701, -9.26549770855961],
          [-78.48852691720282, -9.265931851360458],
          [-78.48843035767828, -9.26611186163267],
          [-78.48854403822787, -9.2663563591275],
          [-78.48855476706393, -9.266896389014558],
          [-78.48867278426059, -9.267235230872613],
          [-78.48875861494906, -9.267457595664258],
          [-78.48901610701449, -9.267531717230186],
          [-78.48963837950595, -9.267722315470715],
          [-78.48973493903048, -9.267849380906933],
          [-78.49000315993197, -9.267881147258805],
          [-78.49019627898105, -9.26835764219194],
          [-78.4907649072922, -9.269321218858366],
          [-78.49102239935763, -9.269638880915993],
          [-78.4917734178818, -9.27096246972861],
          [-78.49202018111117, -9.271460137831047],
          [-78.49250735411476, -9.27227616392322],
          [-78.49282921919655, -9.272572646023301],
          [-78.49306525358986, -9.273038545960212],
          [-78.49332274565529, -9.273292672937826],
          [-78.4935587800486, -9.274097407152741],
          [-78.49360169539284, -9.275029202358983],
          [-78.49323691496681, -9.27505037949399],
          [-78.49267901549172, -9.275262150773878],
          [-78.49257172713112, -9.276553952812867],
          [-78.48978222975563, -9.275812755503312],
          [-78.48684789309334, -9.275045085210376],
          [-78.48557652602028, -9.27462683655077],
          [-78.48557116160225, -9.274182115910119],
          [-78.48566235670876, -9.2740338755713],
          [-78.48566235670876, -9.273837986456098],
          [-78.48564729195641, -9.273067263257753],
          [-78.48563656312035, -9.272807841799521],
          [-78.48560437661217, -9.272416062090935],
          [-78.48563115044664, -9.272125418770736],
          [-78.48588327809404, -9.272072475489486],
          [-78.48586986704896, -9.271680694959974],
          [-78.48569284125398, -9.271683342127188],
          [-78.48572502776216, -9.271537747901128],
          [-78.48567093620466, -9.270814229718738],
          [-78.485552919008, -9.27035362118363],
          [-78.48538125763105, -9.270115375152422],
          [-78.48520423183606, -9.269919483850094],
          [-78.48523641834424, -9.269744769893629],
          [-78.48547494762829, -9.268842726313169],
          [-78.4855661427348, -9.268519769153086],
          [-78.4855661427348, -9.268265638719901],
          [-78.48556077831677, -9.267683255783433],
          [-78.48548786678003, -9.26722381844778],
          [-78.48543422259974, -9.26678967724413],
          [-78.4854288581817, -9.26660966731935],
          [-78.48528938331293, -9.266334357844148],
          [-78.48528938331293, -9.266111992341228],
          [-78.48526166483617, -9.265888875289853],
          [-78.4852133850739, -9.265796222896556],
          [-78.4851946096108, -9.265759161932378],
          [-78.48515437647558, -9.265708864903333],
          [-78.48490493103719, -9.265462674078265],
          [-78.48477350279546, -9.265356785498286],
          [-78.48462598129964, -9.265250896886375],
          [-78.48467426106191, -9.265216483080632],
          [-78.48466085001684, -9.265184716487726],
          [-78.48476813837743, -9.26513971380952],
          [-78.48518119856573, -9.264978233563777],
          [-78.48560800983881, -9.26481122694255],
          [-78.48582795097803, -9.264731810363248],
          [-78.48601302340006, -9.264652393765997],
          [-78.48611360623812, -9.264600772968148],
          [-78.48621418907618, -9.264553122994185],
          [-78.48630538418269, -9.264517385509455],
          [-78.48649045660471, -9.264455175805164],
          [-78.48658701612925, -9.264444586918225],
          [-78.48666209959401, -9.264503918244255]]]);
//===============================================================================================================
//  Inputs
//===============================================================================================================
var region_nopaint = ee.Image().paint(AOI, 0, 2);
//Map.addLayer(AOI,{},'ROI')
Map.centerObject(geometry2,13);
function red_lab(red_lab_text){
  var label = ui.Label(red_lab_text);
  label.style().set('color','red');
  label.style().set('fontWeight','bold');
  print (label)
}
// selection image spectral sentinel2
var start_date = ee.Date.fromYMD(2018,9,30);
var end_date = ee.Date.fromYMD(2019,03,10);
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(geometry2)
                .filterDate(ee.Date(start_date),ee.Date(end_date)));
                //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)));
// NOT PUT MASK CLOUDS STANDAR BUT CALCULE NDVI
var addNDVI = function (image){
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    //Map.addLayer(ndvi.clip(ROI))
    return image.addBands(ndvi)
}
// ADD BAND NDVI AT COLLECTION DE SENTINEL2
var ndvis = (Sentinel2.map(addNDVI))
function getImageByIndex(ndvis, index) {
  return ee.Image(ndvis.toList(1, index).get(0))
}
var vis1 = getImageByIndex(ndvis,27);
var NDVI1 = vis1.select('NDVI');
var NDVI0213 = NDVI1.clip(geometry2);
var vis2 = getImageByIndex(ndvis,28);
var NDVI2 = vis2.select('NDVI');
var NDVI0218 = NDVI1.clip(geometry2);
var vis3 = getImageByIndex(ndvis,29);
var NDVI3 = vis3.select('NDVI');
var NDVI0223 = NDVI1.clip(geometry2);
var vis4 = getImageByIndex(ndvis,30);
var NDVI4 = vis4.select('NDVI');
var NDVI0228 = NDVI1.clip(geometry2);
var img0213 = ee.Image('COPERNICUS/S2/20190213T152641_20190213T153201_T17LQK');
var img0218 = ee.Image('COPERNICUS/S2/20190218T152639_20190218T153311_T17LQK');
var img0223 = ee.Image('COPERNICUS/S2/20190223T152641_20190223T152820_T17LQK')
var img0228 = ee.Image('COPERNICUS/S2/20190223T152641_20190223T152820_T17LQK')
//var img0213NDVI = img0213.select("NDVI")
//print(img0213);
//print(NDVI0228);
//Map.addLayer(NDVI0228,{},'test4');
//Map.addLayer(NDVI0218,{},'test1');
//Map.addLayer(Img0223,{},'test2');
//Map.addLayer(Img0228,{},'test3');
// This function adds a time band to the image.
var createTimeBand = function(image) {
  // Scale milliseconds by a large constant.
  return image.addBands(image.metadata('system:time_start'));
};
//Img0213,Img0218,Img0223,Img0228,
var im_collection = ee.ImageCollection.fromImages([img0213,img0218,img0223,img0228]);
var im_collectionTime = im_collection.map(createTimeBand)
var rgb_vis = {min:0, max:3000, bands:['B4','B3','B2']};
//===============================================================================================================
//  Split Panel and Selection
//===============================================================================================================
// Image Input
var split_images = {
  'img0213': img0213
  .visualize(rgb_vis),
  'img0218': img0218
  .visualize(rgb_vis),
  'img0223': img0223
  .visualize(rgb_vis),
  'img0228': img0228
  .visualize(rgb_vis),
   'Img0213': Img0213
  .visualize(vs1),
  'Img0218': Img0213
  .visualize(vs2),
  'Img0223': Img0223
  .visualize(vs3),
  'Img0228': Img0228
  .visualize(vs4),
  'NDVI0213': NDVI0213
  .visualize(VIS_NDVI1),
   'NDVI0218': NDVI0218
  .visualize(VIS_NDVI2),
 'NDVI0223': NDVI0223
  .visualize(VIS_NDVI3), 
  'NDVI0228': NDVI0228
  .visualize(VIS_NDVI4), 
};
// Map creation
var leftMap = ui.Map();
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position){
  var label = ui.Label('Choose image to display');
  function updateMap(selection){
    mapToChange.layers().set(0, ui.Map.Layer(split_images[selection]));
  }
  var select = ui.Select({items: Object.keys(split_images), onChange: updateMap});
  select.setValue(Object.keys(split_images)[defaultValue],true);
  var controlPanel =
    ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
leftMap.setControlVisibility({zoomControl:true});
//Link Maps
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create Split Panel
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
ui.root.widgets().reset([splitPanel]);
leftMap.centerObject(geometry2,13);
//===============================================================================================================
//  Chart 
//===============================================================================================================
// Chart function
var fChart = (function(coords){
  // Update lon/lat  with click event values
  var lon = ui.Label();
  var lat = ui.Label();
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add clickpoint
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'Point');
  var layersize = leftMap.layers().length();
  var layers = leftMap.layers();
  // (b) Remove and add version:
  var e = 0;
  function layernames(){
    leftMap.layers().forEach(function(mapLayer){
      var n = mapLayer.getName();
      if (n == 'Point'){
        var i = layers.get(e);
        leftMap.remove(i);
        e ++;
      }
      else {
        e ++;
      }
    });
  }
  var u = layernames(layers);
  leftMap.addLayer(point,{color: 'FF0000'},'Point');
    // Chart calculation
    var chart = ui.Chart.image.series(im_collectionTime, point);
    chart.style().set({
      position: 'bottom-left',
      width: '450px',
      height: '300px'
    });
  // Add and update chart
  leftMap.widgets().reset([chart]);
});
// Add chart-function to map
leftMap.onClick(fChart);
leftMap.style().set('cursor','crosshair');
red_lab('Clicking into the left side of the map will display the chart, each new click updates the point and the chart')
red_lab('"Choose image to displays" - widget gets reseted because of the <leftMap.widgets().reset([chart]>')
red_lab('Problem: Line 124 - widgets().reset()')