var aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/ee-yqx09031/assets/erds/erds_shp"
    }) || ee.FeatureCollection("projects/ee-yqx09031/assets/erds/erds_shp"),
    Silt = ui.import && ui.import("Silt", "image", {
      "id": "projects/ee-yqx09031/assets/erds/SILT"
    }) || ee.Image("projects/ee-yqx09031/assets/erds/SILT");
Map.centerObject(aoi)
function RUSLE_Model(range){
// Map.clear()
var start_time =range.start()
var end_time = range.end()
var year_ = start_time.get('year').getInfo()
//====== R-factor=============//
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
    .filterDate(start_time, end_time)
    .sum()
var year_fall = chirps.clip(aoi)
var R_factor = year_fall.multiply(0.053).pow(1.6548)
//====== C-factor=============//
var Landsat5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR");
var Landsat7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR");
var Landsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
//----------------FUNCTIONS---------------------------
//Mask Landsat 5,7
var cloudMaskL457 = function(image) {
    var qa = image.select('pixel_qa');
    // If the cloud bit (5) is set and the cloud confidence (7) is high
    // or the cloud shadow bit is set (3), then it's a bad pixel.
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
    // Remove edge pixels that don't occur in all bands
    var mask2 = image.mask().reduce(ee.Reducer.min());
    return image.updateMask(cloud.not()).updateMask(mask2);
};
//Mask Landsat 8
var cloudMaskL8 = function (image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
//Calculate NDVI
var findndvi_l8 = function(image){return image.addBands(image.normalizedDifference(['SR_B5', 'SR_B4']).rename('ndvi'));}
//Calculate NDVI
var findndvi_l57 = function(image){return image.addBands(image.normalizedDifference(['B4', 'B3']).rename('ndvi'));}
// map 
Landsat5 =Landsat5.map(cloudMaskL457).map(findndvi_l57)
Landsat7 =Landsat7.map(cloudMaskL457).map(findndvi_l57)
Landsat8 =Landsat8.map(applyScaleFactors)
// merge Landsat5,7,8
var dataset = Landsat5.merge(Landsat7).merge(Landsat8)
var img_ann=Landsat8.filterDate(start_time,end_time).filterBounds(aoi).median();
var rgbvis = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
Map.addLayer(img_ann,rgbvis,year_+'LandSat8',false)
img_ann = findndvi_l8(img_ann).select('ndvi')
var C_factor = ((img_ann.multiply(-2)).divide(img_ann.multiply(-1).add(1))).exp();
// P_factor 
// 0->1 1->1 2->1 3->0.35 4->0 7->0
var Landsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
var lc = ee.Image("ESA/WorldCover/v100/2020")
var img =Landsat8
.filterDate(start_time,end_time)
.filterBounds(aoi)
.median()
.clip(aoi)
.select('SR_B.*');
// ESA WorldCover land cover map, used as label source in classifier training.
var classValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
var remapValues = ee.List.sequence(0, 10);
var label = 'lc';
lc = lc.remap(classValues, remapValues).rename(label).toByte().clip(aoi);
// var sample = img.addBands(lc).stratifiedSample({
//   numPoints: 1000,
//   classBand: label,
//   region: aoi,
//   scale: 30,
//   geometries: true
// });
// sample = sample.randomColumn();
// var trainingSample = sample.filter('random <= 0.8');
// var validationSample = sample.filter('random > 0.8');
// // Train a 10-tree random forest classifier from the training sample.
// var trainedClassifier = ee.Classifier.smileRandomForest(10).train({
//   features: trainingSample,
//   classProperty: label,
//   inputProperties: img.bandNames()
// });
// var imgClassified = img.classify(trainedClassifier);
var classValues1 = ee.List.sequence(0, 10);
// var remapValues1 = [1,1,1,0.24,0,1,1,0,0]
var remapValues1 = [1, 1, 1, 0.24, 0, 1, 1, 0, 1, 1, 1];
// var P_factor=imgClassified.remap(classValues, remapValues);
var P_factor = lc.remap(classValues1, remapValues1);
// //////////////////////////
var Sand = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02").select(0);
// var Silt =  ee.Image("ISDASOIL/Africa/v1/silt_content").select(0);
var Clay = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02").select(0);
var C =ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02").select(0)
var Sn1 = ee.Image(0).expression('1-Sand/100',{'Sand':Sand})
var K_factor1= ee.Image(0).expression(
  '0.2+0.3*exp(-0.0256*Sand*(1-(Silt/100)))',{
    'Sand':Sand,
    'Silt':Silt
  }
  )
var K_factor2 =  ee.Image(0).expression(
  'pow((Silt/(Silt+Clay)),0.3)',{
    'Clay':Clay,
    'Silt':Silt
  }
  )
var K_factor3 = ee.Image(0).expression(
  '1-((0.25*C)/(C+exp(3.72-2.95*C)))',{
    'C':C
  }
  )
var K_factor4 = ee.Image(0).expression(
  '1-((0.7*Sn1)/(Sn1+exp(-5.51+22.9*Sn1)))',{
    'Sn1':Sn1
  }
  )
var K_factor = K_factor1.multiply(K_factor2.multiply(K_factor3.multiply(K_factor4)))
////////////////////////////////
var DEMdataset = ee.Image("MERIT/Hydro/v1_0_1")
var DEM  = DEMdataset.select('elv')
var slope = ee.Terrain.slope(DEM);
// S factor
var S_factor = slope.where(slope.lt(5),slope.sin().multiply(10.8).add(0.03)).where(slope.gte(5).lte(10),slope.sin().multiply(16.8).add(-0.5)).where(slope.gt(10),slope.sin().multiply(21.9).add(-0.96))
var flow_dir = DEMdataset.select('dir')
var dirValues =[1,2,4,8,16,32,64,128]
var remapValues = [1,1,1,1,1.41,1.41,1.41,1.41]
flow_dir = flow_dir.remap(dirValues, remapValues);
// Map.addLayer(flow_dir)
var flow_acc = DEMdataset.select('upg').multiply(flow_dir).multiply(0.9277) 
// Map.addLayer(flow_acc)
var beta = ee.Image(0).expression(
  '(a/0.0896)/(3*pow(a,0.8)+0.56)',{
    'a': slope.multiply(Math.PI/180).sin()
  }
  )
var m =   beta.divide(beta.add(1)).rename('m')
var L_factor = flow_acc.divide(22.13).pow(m)
var LS_factor = L_factor.multiply(S_factor).rename('LS')
////////////////////////////////////////////////////////////////////////////////////////////////////////
var RULSE = R_factor.multiply(K_factor).multiply(LS_factor).multiply(C_factor).multiply(P_factor)
// remap 
var RULSE_remap = RULSE
                    .where(RULSE.lt(5),0)
                    .where(RULSE.lt(25).and(RULSE.gte(5)),1)
                    .where(RULSE.lt(50).and(RULSE.gte(25)),2)
                    .where(RULSE.lt(80).and(RULSE.gte(50)),3)
                    .where(RULSE.lt(150).and(RULSE.gte(80)),4)
                    .where(RULSE.gte(150),5)
///
range.start().get('year').evaluate(function(name) {
  // var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
  // var layer = ui.Map.Layer(mosaic, visParams, name + ' composite');
  // Map.layers().set(0, layer);
  var layer_p =ui.Map.Layer(P_factor.clip(aoi),{
  min: 0,
  max: 1,
  palette: ['2c7400','fffc09','fd2300']
  },year_+'P',false)
  var layer_k =ui.Map.Layer(K_factor.clip(aoi), {
  min: 0.13,
  max: 0.3,
  palette: ['014a01' ,'67a404', 'fbfc00', 'fff701', 'fd7b01', 'fe0002']
},year_+'K',false)
  var layer_LS =ui.Map.Layer(LS_factor.clip(aoi), {
  min: 0,
  max: 60,
  palette: ['014a01' ,'67a404', 'fbfc00', 'fff701', 'fd7b01', 'fe0002']
  },year_+'LS',false)
  var layer_C =ui.Map.Layer(C_factor.clip(aoi), {
  min: 0.5,
  max: 1,
  palette: ['014a01' ,'67a404', 'fbfc00', 'fff701', 'fd7b01', 'fe0002']
},year_+'C',false)
  var layer_R =ui.Map.Layer(R_factor.clip(aoi), {
  min: 50,
  max: 200,
  palette: ['blue', 'darkblue', 'red', 'purple'] 
},year_+'R',false)
  var layer_RULSE_remap =ui.Map.Layer(RULSE_remap,{
  min: 0,
  max: 5,
  palette: ['014a01' ,'67a404', 'fbfc00', 'fff701', 'fd7b01', 'fe0002']
},year_+'RULSE_class')
  var b1 =ui.Map.Layer(ee.Image(0),{
  min: 0,
  max: 1,
  palette: ['white']
  },'bg1')
  var b2 =ui.Map.Layer(ee.Image(0).clip(aoi),{
  min: 0,
  max: 1,
  palette: ['014a01']
  },'bg2')
  // Map.addLayer(,{max:1,min:0, palette:['white']},'bg1',false)
  // Map.addLayer(ee.Image(0).clip(aoi),{max:1,min:0, palette:['014a01']},'bg2',false)
  Map.layers().set(0, b1);
  Map.layers().set(1, b2);
  Map.layers().set(2, layer_p);
  Map.layers().set(3, layer_k);
  Map.layers().set(4, layer_LS);
  Map.layers().set(5, layer_C);
  Map.layers().set(6, layer_R);
  Map.layers().set(7, layer_RULSE_remap);
});
var area = RULSE.reduceRegion({reducer:ee.Reducer.sum(), geometry:aoi, scale:100, maxPixels:1e10})
// area = area.get('b1').divide(100)
print(year_+'年度总侵蚀量(mh^2-a)',area.get('precipitation'))
// Map.addLayer(ee.Image.pixelArea().updateMask(RULSE_remap.eq(0)))
// //  计算各个种类的面积
for (var i=0;i<6;i++){
  var realCount = ee.Image.pixelArea().updateMask(RULSE_remap.eq(i)).reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: aoi,
    scale: 100,
    maxPixels: 10e15,
});
print('第 '+i+' 类面积(m^2)',realCount.get('area'))
}
}
var start = ee.Date('2013-01-01');
var now = ee.Date('2013-01-01');
var end = ee.Date('2022-01-01');
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: RUSLE_Model,
    style:{position: 'bottom-left', padding: '10px 20px',width: '400px'}
  });
  Map.add(dateSlider.setValue(now));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
var label = [
  '微度侵蚀 0 - 5 t/(hm^2*a)   ',
  '轻度侵蚀 5 - 25 t/(hm^2*a)  ',
  '中度侵蚀 25 - 50 t/(hm^2*a) ',
  '强度侵蚀 50 - 80 t/(hm^2*a) ',
  '极强侵蚀 80 - 150 t/(hm^2*a)',
  '剧烈侵蚀 >150 t/(hm^2*a)',
  ]
var Titulo = ui.Label({
  value: '侵蚀强度', // 图例标签
  style: {fontWeight: 'bold', fontSize: '20px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
var Simbologia = ['014a01' ,'67a404', 'fbfc00', 'fff701', 'fd7b01', 'fe0002'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // Tama帽o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 6; i++) {Leyenda.add(Simbolos(Simbologia[i], label[i]));} 
Map.add(Leyenda);