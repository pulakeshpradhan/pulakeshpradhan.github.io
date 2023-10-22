var app = ui.import && ui.import("app", "imageVisParam", {
      "params": {}
    }) || {},
    targetClassifiedResult = ui.import && ui.import("targetClassifiedResult", "image", {
      "id": "projects/ee-crop/assets/F_Xinghua_2021_wheat_"
    }) || ee.Image("projects/ee-crop/assets/F_Xinghua_2021_wheat_"),
    targetAOI = ui.import && ui.import("targetAOI", "table", {
      "id": "projects/ee-crop/assets/xinghua/F_xinghua_Bounds"
    }) || ee.FeatureCollection("projects/ee-crop/assets/xinghua/F_xinghua_Bounds"),
    targetSamples = ui.import && ui.import("targetSamples", "table", {
      "id": "projects/ee-crop/assets/xinghua/xinghua_samples_2"
    }) || ee.FeatureCollection("projects/ee-crop/assets/xinghua/xinghua_samples_2");
var targetAssetID = 'users/legendzhw/CropWatch';
var targetBucket  = 'bigdatabase';
// http://47.96.172.235/landcover.html
///////////////////////////////////////////////////////// General
function addZomeLevel(name){
  var zoomLabel = ui.Label({value:'', style:{fontWeight:'bold', fontSize:'15px'}});
  Map.add(zoomLabel); 
  function changeZoom(){   
    var getZoom = Map.getZoom(); 
    zoomLabel.setValue(name + ' @ Zoom level: ' + getZoom);
  }
  Map.onChangeZoom(changeZoom);
}
addZomeLevel('Crop Classifier');
Map.centerObject(targetAOI.geometry().coordinates(),10);
Map.addLayer(targetAOI.style({color:'red',fillColor:'00000000'}),{},'XH');
///////////////////////////////////////////////////////// Main classifier
var FSouthAsia             = ee.FeatureCollection("users/legendzhw/F_southasia");
var F_paddy_samples        = ee.FeatureCollection("projects/ee-crop/assets/rice/F_paddy_samples");
var aoi                    = targetAOI;
var GFSAD30_SouthAsia      = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_SouthAsia");
var GFSAD30_SoutheastAsia  = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_SoutheastAsia");
var GFSAD30_Africa         = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_Africa");
var GFSAD30_Australia      = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_Australia");
var GFSAD30_China          = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_China");
var GFSAD30_Europe         = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_Europe");
var GFSAD30_NorthAmerica   = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_NorthAmerica");
var GFSAD30_Pacificislands = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_Pacificislands");
var GFSAD30_SouthAmerica   = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_SouthAmerica");
var GFSAD30_SouthAsia      = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_SouthAsia");
var GFSAD30_SoutheastAsia  = ee.Image("users/zhangmiao046/Cropland/GFSAD30/GFSAD30_SoutheastAsia");
var cropland = ee.ImageCollection.fromImages([GFSAD30_SouthAsia,GFSAD30_SoutheastAsia,GFSAD30_Africa,GFSAD30_Australia,
                                              GFSAD30_China,GFSAD30_Europe,GFSAD30_NorthAmerica,
                                              GFSAD30_Pacificislands,GFSAD30_SouthAmerica,GFSAD30_SouthAsia,GFSAD30_SoutheastAsia]);
cropland = cropland.map(function(image){
  image  = image.eq(2);
  image  = image.updateMask(image);
  return image;
});
cropland = cropland.qualityMosaic('b1');
//==================================SAR Processing start============================================
// Functions to convert from/to dB
function toNatural(img) {
  return ee.Image(10.0).pow(img.select('..').divide(10.0)).copyProperties(img, ['system:time_start']);
}
function toDBmodif(img) {
  var todB = img.select('VV','VH').log10().multiply(10.0).rename('VV_db','VH_db');
  return img.addBands(todB,['VV_db','VH_db']).copyProperties(img, ['system:time_start']);
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0).copyProperties(img, ['system:time_start']);
}
// Remove edges
function maskEdge(img) {
  //connected component is giving a unique label to connected pixels of the same value and we are masking the ones bigger than 100px
 var mask = img.select(0).unitScale(-25, 5).multiply(255).toByte().connectedComponents(ee.Kernel.rectangle(1,1), 100);
 return img.updateMask(mask.select(0).abs());  
}
function S1VHVV (img) { 
  var ratio = img.select(['VH']).divide(img.select(['VV'])).rename('VHVV');
  return img.addBands(ratio,['VHVV']);
} 
// Convert ImageCollection to image stack
function stack(i1, i2){
  return ee.Image(i1).addBands(ee.Image(i2));
}
// OPTIONAL : Smooth the image by convolving with the boxcar kernel
var boxcar = ee.Kernel.square({
  radius: 3, units: 'pixels', normalize: true
});
//==================================SAR Processing end==============================================
var elevation =  ee.Image("USGS/SRTMGL1_003");
var slope     =  ee.Terrain.slope(elevation);
var aspect    =  ee.Terrain.aspect(elevation);
function maskS2clouds(image) {
  var qa              = image.select('QA60');
  var cloudBitMask    = ee.Number(2).pow(10).int();
  var cirrusBitMask   = ee.Number(2).pow(11).int();
  var mask            = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).multiply(0.0001).select("B.*").copyProperties(image, ["system:time_start"]); 
}
function addNDVI(image){
    return image.addBands(image.normalizedDifference(['B8','B4']).rename('NDVI')).copyProperties(image, ["system:time_start"]);
}
function addEVI(image){
  var EVI  = image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {'NIR': image.select('B8'),'RED': image.select('B4'),'BLUE': image.select('B3')}).select([0],['EVI']);
  return image.addBands(EVI).copyProperties(image, ["system:time_start"]);
}
function addNDBI(image){
  var NDBI = image.normalizedDifference(['B6', 'B5']).select([0],['NDBI']);
  return image.addBands(NDBI).copyProperties(image, ["system:time_start"]);
}
function addNDWI(image){
  var NDWI = image.normalizedDifference(['B3', 'B5']).select([0],['NDWI']);
  return image.addBands(NDWI).copyProperties(image, ["system:time_start"]);
}
function lswi_calc(img){
    var lswi = img.normalizedDifference(['B8', 'B11']).select([0],['LSWI']);
    var gcviimage = ee.Image(img).select('B8').divide(ee.Image(img).select('B3')).subtract(1).rename('GCVI');
    return img.addBands(lswi).addBands(gcviimage).set('system:time_start',img.get('system:time_start'));
}
function addVariables(image) {
  var DOY = image.date().getRelative('day', 'year');
  var year = image.date().get('year');
  image   =  image.clip(studyArea);
  return image
    .addBands(image.expression('2.5*((nir-red)/(nir+6*red-7.5*blue+1))', {'nir':image.select('nir'),'red':image.select('red'),'blue':image.select('blue')}).toDouble().rename('EVI'))
    .addBands(image.normalizedDifference(['nir','red']).toDouble().rename('NDVI'))
    .addBands(image.normalizedDifference(['nir','red1']).toDouble().rename('RENDVI1')) // Add S2 red-edge indices (Sen2-Agri) RENDVI = (nir-red2)/(nir+red2)
    .addBands(image.normalizedDifference(['nir','red2']).toDouble().rename('RENDVI2'))
    .addBands(image.normalizedDifference(['nir','red3']).toDouble().rename('RENDVI3'))
    .addBands(image.expression('nir/green-1',{'nir':image.select('nir'),'green':image.select('green'),}).toDouble().rename('GCVI')) // Add a GCVI: Green Chlorophyll Vegetation Index (Guan Kaiyu, Wang Sherrie)
    .addBands(image.expression('nir/red1-1',{'nir':image.select('nir'),'red1':image.select('red1'),}).toDouble().rename('REGCVI1'))    
    .addBands(image.expression('nir/red2-1',{'nir':image.select('nir'),'red2':image.select('red2'),}).toDouble().rename('REGCVI2')) 
    .addBands(image.expression('nir/red3-1',{'nir':image.select('nir'),'red3':image.select('red3'),}).toDouble().rename('REGCVI3')) 
    .addBands(image.normalizedDifference(['green','nir']).toDouble().rename('NDWI'))   // REP = {705+35*(0.5*(red3+red)-red1)/(red2-red1)}/1000; PSRI = (red-blue)/red1; CRE = red1/nir
    .addBands(image.normalizedDifference(['nir','swir1']).toDouble().rename('LSWI'))
    .addBands(image.expression('(705+35*(0.5*(red3+red)-red1)/(red2-red1))/1000',{'red3':image.select('red3'),'red2':image.select('red2'),'red1':image.select('red1'),'red':image.select('red'),}).toDouble().rename('S2REP'))// normalized differential senescent vegetation index (Zhong,2014)
    .addBands(image.normalizedDifference(['swir1','swir2']).toDouble().rename('NDTI')) // normalized differential tillage index, relates to residue cover (Zhong,2014)
    .addBands(image.normalizedDifference(['swir1','red']).toDouble().rename('NDSVI'))
    .addBands(ee.Image(DOY).rename('DOY').toDouble())
    .addBands(ee.Image(year).rename('Year').toDouble())
    .set('DOY', DOY);
}
function generateS2Collection(start, end, bounds){
    var s2collection =  ee.ImageCollection('COPERNICUS/S2').filterDate(start, end)
                              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40)).filterBounds(bounds)
                              .map(maskS2clouds).map(addNDVI).map(addEVI).map(lswi_calc);
    return s2collection.select('B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12','NDVI','EVI','LSWI','GCVI');
}
//============================================Landsat start===================================================
function lc8cloud(cloudimage) {
  var quality = ee.Algorithms.Landsat.simpleCloudScore(cloudimage);
  var maskedImage = cloudimage.mask().and(quality.select(['cloud']).lte(20));
  return cloudimage.updateMask(maskedImage).set('system:time_start',cloudimage.get('system:time_start')).select([1,2,3,4,5,6]);
}
function landsat8_index(img){
  var ndviimage = ee.Image(img).normalizedDifference(['B5', 'B4']).select([0],['NDVI']);
  var lswiimage = ee.Image(img).normalizedDifference(['B5', 'B6']).select([0],['LSWI']);
  var eviimage  = ee.Image(img).expression(
    '2.5*(NIR-RED)/(NIR+6*RED-7.5*BLUE+1)',{
      'NIR': ee.Image(img).select('B5'),
      'RED': ee.Image(img).select('B4'),
      'BLUE': ee.Image(img).select('B2')
    }).select([0],['EVI']).toFloat();
  var gcviimage = ee.Image(img).select('B5').divide(ee.Image(img).select('B3')).subtract(1).rename('GCVI');
  img = img.select([0,1,2,3,4,5]).set('system:time_start',img.get('system:time_start'));
   return img.addBands(ndviimage).addBands(lswiimage).addBands(eviimage).addBands(gcviimage).set('system:time_start',img.get('system:time_start'));
}
function generateL8Collection(start,end,bounds){
  var L8 = ee.ImageCollection('"LANDSAT/LC08/C01/T2_TOA"').filterDate(start,end)
               .filterBounds(bounds)
               .sort('system:time_start', true)
               .map(lc8cloud)
               .map(landsat8_index);
  return L8;
}
//============================================Landsat end===================================================
function table2Drive(accuracyReport, description, folder){
      var collection = ee.FeatureCollection([ee.Feature(null,{matrix:accuracyReport.array(),kappa:accuracyReport.kappa(),accuracy:accuracyReport.accuracy()})]);
      Export.table.toDrive({collection:collection, description:description, folder:folder,});
}
function table2Drive(accuracyReport, description, folder){
      var collection = ee.FeatureCollection([ee.Feature(null,{matrix:accuracyReport.array(),kappa:accuracyReport.kappa(),accuracy:accuracyReport.accuracy()})]);
      Export.table.toDrive({collection:collection, description:description, folder:folder,});
}
function table2Asset(accuracyReport, description, assetId){
      var collection = ee.FeatureCollection([ee.Feature(null, {matrix:accuracyReport.array(), kappa:accuracyReport.kappa(), accuracy:accuracyReport.accuracy()})]);
      Export.table.toAsset({collection:collection, description:description, assetId:assetId + '/' + description});
}
function image2Asset(image, description, region, scale, assetId){
      Export.image.toAsset({image:image, description:description, assetId:assetId + '/' + description, region:region, scale:scale, maxPixels:1e13});
}
function table2ACloudStorage(accuracyReport, description, bucket){
      var collection = ee.FeatureCollection([ee.Feature(null, {matrix:accuracyReport.array(), kappa:accuracyReport.kappa(), accuracy:accuracyReport.accuracy()})]);
      Export.table.toCloudStorage({collection:collection, description:description, bucket:bucket});
}
function image2CloudStorage(image, description, bucket, region, scale, fileName){
      Export.image.toCloudStorage({image:image, description:description, bucket:bucket, region:region, scale:scale, fileNamePrefix:fileName, maxPixels:1e13});
}
///////////////////////////////////////////////////////// Main classifier
var EOList = ['S1 + S2', 'S1 + L8', 'S1 + S2 + L8'];
var MLList = ['decisionTree', 'smileRandomForest', 'decisionTreeEnsemble', 'smileGradientTreeBoost'];
var palette = ['ffffff','ce7e45','fcd163','c6ca02','22cc04','99b718','207401','012e01'];
///////////////////////////////////////////////////////// Classifier App GUI
app.Panels = function(){
  var introValue = 'Crop classifier for CropWatch Cloud';
  var introLabel = ui.Label({value:introValue,style:{color:'black', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}});
  app.intro = {panel:ui.Panel([introLabel.setUrl('http://cloud.cropwatch.com.cn')])};
  var EOValue = 'Earth Observation Data';
  var EOLabel = ui.Label({value:EOValue,style:{color:'black', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}});
  app.EO = {panel:ui.Panel([EOLabel])};
  var WSValue = 'Working space';
  var WSLabel = ui.Label({value:WSValue,style:{color:'black', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}});
  app.WS = {panel:ui.Panel([WSLabel])};
  var MLValue = 'Machine Learning Algorithm';
  var MLLabel = ui.Label({value:MLValue,style:{color:'black', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}});
  app.ML = {panel:ui.Panel([MLLabel])};
  //////////////////////////////////////////////////////////  
  app.EOD = {
      selectEOD:ui.Label({value:'Select: ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      EOSelector:ui.Select({placeholder:EOList[0], value:EOList[0], items:EOList}),
      startFromEO:ui.Label({value:'From: ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      startToEO:ui.Label({value:'To    : ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      dateFromEO:ui.DateSlider({start:'2015-01-01', end:'2021-12-31', value:'2021-02-01', period:1}),
      dateToEO:  ui.DateSlider({start:'2015-01-01', end:'2021-12-31', value:'2021-05-31', period:1}),
      OI:ui.Label({value:'Optical Indices:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      checkboxNDVI: ui.Checkbox('NDVI', true),
      checkboxEVI: ui.Checkbox('EVI', true),
      checkboxLSWI: ui.Checkbox('LSWI', true),
      checkboxGCVI: ui.Checkbox('GCVI', true),
      SI:ui.Label({value:'SAR Indices:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      checkboxVVVH: ui.Checkbox('VV + VH', true), 
      TI:ui.Label({value:'Terrain Indices:',style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      checkboxEle:  ui.Checkbox('Elevation', true),
      checkboxSlop: ui.Checkbox('Slope', true),
      CropPhenology:ui.Label({value:'Crop phenology:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      startFromCP:ui.Label({value:'From: ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      startToCP:ui.Label({value:'To    : ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),  
      dateFromCP:ui.DateSlider({start:'2015-01-01', end:'2021-12-31', value:'2021-02-01', period:1}),
      dateToCP:  ui.DateSlider({start:'2015-01-01', end:'2021-12-31', value:'2021-05-31', period:1}),  
  };
  app.EOD.panel = ui.Panel({
      widgets:[
        ui.Panel([app.EOD.selectEOD, app.EOD.EOSelector], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.startFromEO, app.EOD.dateFromEO], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.startToEO, app.EOD.dateToEO], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.OI], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.checkboxNDVI,app.EOD.checkboxEVI,app.EOD.checkboxLSWI,app.EOD.checkboxGCVI], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.SI], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.checkboxVVVH], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.TI], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.checkboxEle,app.EOD.checkboxSlop], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.CropPhenology], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.startFromCP, app.EOD.dateFromCP], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.EOD.startToCP, app.EOD.dateToCP], ui.Panel.Layout.flow('horizontal')),
        ]
  });
  //////////////////////////////////////////////////////////
  app.MLA = {
      selectMLA:ui.Label({value:'Select: ', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      MLSelector:ui.Select({placeholder:MLList[0], value:MLList[1], items:MLList}),
  };
  app.MLA.panel = ui.Panel({
      widgets:[
        ui.Panel([app.MLA.selectMLA, app.MLA.MLSelector], ui.Panel.Layout.flow('horizontal')),]
  });  
  //////////////////////////////////////////////////////////
  app.WSA = {
      interAOI:ui.Label({value:'AOI:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      pathAOI:ui.Textbox({placeholder:'', value:"projects/ee-crop/assets/xinghua/F_xinghua_Bounds"}),
      interSamples:ui.Label({value:'Samples:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      pathSamples:ui.Textbox({placeholder:'', value:"projects/ee-crop/assets/xinghua/xinghua_samples_2"}),
      interAssetID:ui.Label({value:'Asset ID:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      pathAssetID:ui.Textbox({placeholder:'', value:"users/legendzhw/CropWatch"}),
      interBucket:ui.Label({value:'Cloud bucket:', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      pathBucket:ui.Textbox({placeholder:'', value:"bigdatabase"}),
      checkbox2AssetID: ui.Checkbox('', false),
      checkbox2Bucket: ui.Checkbox('', true),
      Run:ui.Button({label:'Run', onClick:function(){
        var staEO = ee.Date(app.EOD.dateFromEO.getValue()[0]);
        var endEO = ee.Date(app.EOD.dateToEO.getValue()[1]);
        var startDateEO = ee.Date.fromYMD(staEO.get('year'), staEO.get('month'), staEO.get('day'));
        var endDateEO   = ee.Date.fromYMD(endEO.get('year'), endEO.get('month'), endEO.get('day'));
        var staCP = ee.Date(app.EOD.dateFromCP.getValue()[0]);
        var endCP = ee.Date(app.EOD.dateToCP.getValue()[1]);
        var startDateCP = ee.Date.fromYMD(staCP.get('year'), staCP.get('month'), staCP.get('day'));
        var endDateCP   = ee.Date.fromYMD(endCP.get('year'), endCP.get('month'), endCP.get('day'));  
        var startDate = ee.List([startDateEO, startDateCP]).sort();
        var endDate = ee.List([endDateEO, endDateCP]).sort();
        startDate = startDate.get(0);
        endDate = endDate.get(1); 
        var AOI = '';
        if(AOI === app.WSA.pathAOI.getValue()){
          AOI = targetAOI;
        }else{
          AOI = ee.FeatureCollection(app.WSA.pathAOI.getValue());
        }
        var Samples = '';
        if(Samples === app.WSA.pathSamples.getValue()){
          Samples = targetSamples;
        }else{
          Samples = ee.FeatureCollection(app.WSA.pathSamples.getValue());
        }
        // var assetId  = app.WSA.pathAssetID.getValue();//.split('/').slice(-1)[0];
        var assetId = '';
        if(assetId === app.WSA.pathAssetID.getValue()){
          assetId = targetAssetID;
        }else{
          assetId = app.WSA.pathAssetID.getValue();
        }
        var bucket = '';
        if(bucket === app.WSA.pathBucket.getValue()){
          bucket = targetBucket
        }else{
          bucket  = app.WSA.pathBucket.getValue();
        }
        ///////////////////////////////////////////
        var data = '';
        var classifiedInputFeatures = '';
        var s1 = ee.ImageCollection('COPERNICUS/S1_GRD').filter(ee.Filter.eq('transmitterReceiverPolarisation', ["VV","VH"])).filterDate(startDate, endDate).filterBounds(AOI.geometry()).sort('system:time_start', true);
        //====================================================================================================================
        var maskEdgeFlag = 1;
        if(maskEdgeFlag === 1){
          s1  =  s1.map(maskEdge);
        }else{
          s1  =  s1.map(s.removeEdge);
          s1  =  s1.map(s.slope_correction); 
        }
        // Ratio and mean are made from natural (non-logarithmic) values 
        var step     =  30;
        var days     =  ee.List.sequence(0, ee.Date(endDate).difference(ee.Date(startDate), 'day'), step)
                          .map(function(d) { 
                             return ee.Date(startDate).advance(d, "day"); 
                          });
        //Pairs the elements of two lists to create a list of two-element lists.
        var dates    = days.slice(0,-1).zip(days.slice(1));
        print(days,'days');
        print(s1,'s1');
        var s1VVres  = dates.map(function(range){
            var dstamp = ee.Date(ee.List(range).get(0)).format('YYYYMMdd');
            var temp_collection = s1.filterDate(
                                    ee.List(range).get(0),
                                    ee.List(range).get(1)
                                  ).mean().select(['VV'],[ee.String('VV_').cat(dstamp)]);
            return temp_collection;
        });
        print(s1VVres,'s1VVres');
        var s1VHres  = dates.map(function(range){
            var dstamp = ee.Date(ee.List(range).get(0)).format('YYYYMMdd');
            var temp_collection = s1.filterDate(
                                    ee.List(range).get(0),
                                    ee.List(range).get(1)
                                  ).mean().select(['VH'],[ee.String('VH_').cat(dstamp)]);
            return temp_collection;
        });
        s1VVres = s1VVres.reverse();
        s1VHres = s1VHres.reverse();
        s1VVres = s1VVres.slice(1).iterate(stack,s1VVres.get(0));
        s1VHres = s1VHres.slice(1).iterate(stack,s1VHres.get(0));
        //transform back to DB
        Map.addLayer(s1,{},'s1 zeng');
        s1             = s1.map(S1VHVV);
        var s1resRatio = dates.map(function(range) {
          var dstamp          = ee.Date(ee.List(range).get(0)).format('YYYYMMdd');
          var temp_collection = s1.filterDate(ee.List(range).get(0),
          ee.List(range).get(1)).mean().select(['VHVV'], [ee.String('VHVV_').cat(dstamp)]);
          return temp_collection;
        });
        s1resRatio    = s1resRatio.reverse();
        s1resRatio    = s1resRatio.slice(1).iterate(stack,s1resRatio.get(0));
        var removeNoiseFlag = 0;
        if(removeNoiseFlag === 1){
          s1VVres        = ee.Image(s1VVres).convolve(boxcar);
          s1VHres        = ee.Image(s1VHres).convolve(boxcar);
          s1resRatio     = ee.Image(s1resRatio).convolve(boxcar);
        }
        s1VVres          = ee.Image(s1VVres).toFloat();
        s1VHres          = ee.Image(s1VHres).toFloat();
        s1resRatio       = ee.Image(s1resRatio).toFloat();
        var sar_features = s1VVres.addBands(s1VHres).addBands(s1resRatio);
        //====================================================================================================================
        if (app.EOD.EOSelector.getValue()  === 'S1 + S2'){
          data = generateS2Collection(startDate, endDate, aoi);
        }
        if (app.EOD.EOSelector.getValue()  === 'S1 + L8'){
          data = generateL8Collection(startDate, endDate, aoi);
        }
        if (app.EOD.EOSelector.getValue()  === 'S1 + S2 + L8'){
          data1 = generateL8Collection(startDate, endDate, aoi).select(['B2','B3','B4','B5','B6','B7','NDVI','EVI','LSWI','GCVI'],['blue','green','red','nir','swir1','swir2','NDVI','EVI','LSWI','GCVI']);
          data2 = generateS2Collection(startDate, endDate, aoi).select(['B2','B3','B4','B8','B11','B12','NDVI','EVI','LSWI','GCVI'],['blue','green','red','nir','swir1','swir2','NDVI','EVI','LSWI','GCVI']);
          data  = data1.merge(data2);
        }
        var inputFeaturers =  data.reduce(ee.Reducer.percentile([5, 25, 50, 75, 95]));
        if (app.EOD.checkboxVVVH.getValue() === false){
          classifiedInputFeatures = inputFeaturers.addBands(elevation).addBands(slope).clip(aoi);
          print(classifiedInputFeatures,'no_sar');
        } else {
          classifiedInputFeatures = inputFeaturers.addBands(sar_features).addBands(elevation).addBands(slope).clip(aoi);
          print(classifiedInputFeatures,'with_sar');
        }
        Map.addLayer(data.median().clip(AOI),{bands:['B4','B3','B2'],min:0.0832,max:0.1604},'realColor', 0, 1);
        Map.addLayer(data.median().clip(AOI),{bands:['B8','B4','B3'],min:0.0946,max:0.2103},'falseColor', 0, 1);
        //reduceRegion(reducer, geometry, scale, crs, crsTransform, bestEffort, maxPixels, tileScale)
        Map.addLayer(data.select('EVI').median().clip(AOI), {min:-0.05026337210075098, max:0.607481531932729, palette:palette}, 'EVI', 0, 1);
        Map.addLayer(data.select('NDVI').median().clip(AOI), {min:-0.1154818460345268, max:0.6090031862258911, palette:palette}, 'NDVI', 0, 1);
        Map.addLayer(data.select('LSWI').median().clip(AOI), {min:-0.1395834386348724, max:0.4093659818172455, palette:palette}, 'LSWI', 0, 1);
        Map.addLayer(data.select('GCVI').median().clip(AOI), {min:-0.39031003377946, max:2.0484171322160147, palette:palette}, 'GCVI', 0, 1);
        var classBandName   = 'Code';
        var objectBandNames =  classifiedInputFeatures.bandNames();
        var classProperty   =  classBandName; 
        if(app.EOD.checkboxEle.getValue() === false){
          objectBandNames =  objectBandNames.remove('elevation');
        }
        if(app.EOD.checkboxSlop.getValue() === false){
          objectBandNames =  objectBandNames.remove('slope');
        }
        if (app.EOD.checkboxNDVI.getValue() === false){
          objectBandNames =  objectBandNames.remove('NDVI_p5');
          objectBandNames =  objectBandNames.remove('NDVI_p25');
          objectBandNames =  objectBandNames.remove('NDVI_p50');
          objectBandNames =  objectBandNames.remove('NDVI_p75');
          objectBandNames =  objectBandNames.remove('NDVI_p95');
        }
        if (app.EOD.checkboxEVI.getValue()  === false){
          objectBandNames =  objectBandNames.remove('EVI_p5');
          objectBandNames =  objectBandNames.remove('EVI_p25');
          objectBandNames =  objectBandNames.remove('EVI_p50');
          objectBandNames =  objectBandNames.remove('EVI_p75');
          objectBandNames =  objectBandNames.remove('EVI_p95');
        }
        if (app.EOD.checkboxLSWI.getValue() === false){
          objectBandNames =  objectBandNames.remove('LSWI_p5');
          objectBandNames =  objectBandNames.remove('LSWI_p25');
          objectBandNames =  objectBandNames.remove('LSWI_p50');
          objectBandNames =  objectBandNames.remove('LSWI_p75');
          objectBandNames =  objectBandNames.remove('LSWI_p95');
        }
        if (app.EOD.checkboxGCVI.getValue() === false){
          objectBandNames =  objectBandNames.remove('GCVI_p5');
          objectBandNames =  objectBandNames.remove('GCVI_p25');
          objectBandNames =  objectBandNames.remove('GCVI_p50');
          objectBandNames =  objectBandNames.remove('GCVI_p75');
          objectBandNames =  objectBandNames.remove('GCVI_p95');
        }
        classifiedInputFeatures = classifiedInputFeatures.select(objectBandNames);
        print(classifiedInputFeatures,'classifiedInputFeatures');
        var samples              =  Samples.filterBounds(AOI);
        var subInputFeatures2020 =  classifiedInputFeatures.clip(AOI);
        var newcropland          =  cropland.clip(AOI);
        var training             =  subInputFeatures2020.sampleRegions({collection:samples,properties:[classProperty], scale:10, tileScale:4});
        var newTraining          =  training.randomColumn('random');
        var trainingPartition    =  newTraining.filter(ee.Filter.lt('random',  0.7));
        var testingPartition     =  newTraining.filter(ee.Filter.gte('random', 0.7));
        var classfier = '';
        if (app.MLA.MLSelector.getValue() === 'smileRandomForest'){
          classfier =  ee.Classifier.smileRandomForest(300, 5).train(trainingPartition, classProperty, objectBandNames);
        }
        if (app.MLA.MLSelector.getValue() === 'decisionTree'){ 
          classfier =  ee.Classifier.decisionTree(300).train(trainingPartition, classProperty, objectBandNames);
        }
        if (app.MLA.MLSelector.getValue() === 'decisionTreeEnsemble'){
          classfier =  ee.Classifier.decisionTreeEnsemble(300).train(trainingPartition, classProperty, objectBandNames);
        } 
        if (app.MLA.MLSelector.getValue() === 'smileGradientTreeBoost'){ 
          classfier =  ee.Classifier.smileGradientTreeBoost(300).train(trainingPartition, classProperty, objectBandNames);
        }
        var classifierResult   =  subInputFeatures2020.classify(classfier);
        classifierResult       =  classifierResult.updateMask(classifierResult);
        var trainAccuracy      =  classfier.confusionMatrix();
        var validated          =  testingPartition.classify(classfier);
        var errorMatrix        =  validated.errorMatrix(classBandName,'classification');
        var riceName           =  'F_Xinghua_2021'+'_wheat_';
        var final              =  classifierResult.eq(3).and(newcropland.eq(1));
        Map.addLayer(targetClassifiedResult.updateMask(targetClassifiedResult), {palette:'green'},'winterwheat', 0, 1);
        Map.centerObject(AOI,11);
        if (app.WSA.checkbox2AssetID.getValue() === true){
          image2Asset(final.unmask(0).clip(rsa), riceName, rsa, 10, assetId);
          table2Asset(errorMatrix, riceName+'_acc_2021_' + String(i), assetId);
        }
        if (app.WSA.checkbox2Bucket.getValue() === true){
          image2CloudStorage(final.unmask(0).clip(AOI), riceName, bucket, AOI, 10, riceName);
          table2ACloudStorage(errorMatrix, riceName+'_acc_2021_', bucket);
        }
      ///////////////////////////////////////////
      }}),
  };
  app.WSA.panel = ui.Panel({
      widgets:[
        ui.Panel([app.WSA.interAOI, app.WSA.pathAOI], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.WSA.interSamples, app.WSA.pathSamples], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.WSA.interAssetID, app.WSA.pathAssetID, app.WSA.checkbox2AssetID], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.WSA.interBucket, app.WSA.pathBucket, app.WSA.checkbox2Bucket], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.WSA.Run], ui.Panel.Layout.flow('horizontal'))
        ]
  });
  //////////////////////////////////////////////////////////
  app.Team = {
      forHelp:ui.Label({value:'For Help', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      drHongweiZang:ui.Label({value:'Dr. Hongwei Zeng', targetUrl:'https://orcid.org/0000-0002-9558-7304', style:{color:'green', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
      drHongweiZangMails:ui.Label({value:'zenghw@aircas.ac.cn', style:{color:'red', fontWeight:'bold', fontSize:'20px', margin:'10px 5px', whiteSpace:'pre'}}),
  };
  app.Team.panel = ui.Panel({
      widgets:[
        ui.Panel([app.Team.forHelp], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.Team.drHongweiZang], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.Team.drHongweiZangMails], ui.Panel.Layout.flow('horizontal')),
        ]
  });
};
///////////////////////////////////////////////////////// Launch classifier App GUI
app.boot = function(){
  app.Panels();
  var leftPanel = ui.Panel({widgets:[
    app.intro.panel,
    app.EO.panel,
    app.EOD.panel,
    app.ML.panel,
    app.MLA.panel,
    app.WS.panel,
    app.WSA.panel,
    app.Team.panel,
    ], style:{width:'360px'}});
  ui.root.insert(0, leftPanel);
};
app.boot();