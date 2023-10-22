var app = ui.import && ui.import("app", "imageVisParam", {
      "params": {}
    }) || {},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
////////////////////////////////////////////////
function addZomeLevel(name){
  var zoomLabel = ui.Label({value:'', style:{fontWeight:'bold', fontSize:'15px'}});
  Map.add(zoomLabel);
  Map.centerObject(ee.Geometry.Point(110,38),5);
  function changeZoom(){
    var getZoom = Map.getZoom();
    zoomLabel.setValue(name + ' @ Zoom level: ' + getZoom);
  }
  Map.onChangeZoom(changeZoom);
}
addZomeLevel('Downscaling of Precipitation');
var drawingTools = Map.drawingTools();
while (drawingTools.layers().length() > 0){
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry = ui.Map.GeometryLayer({geometries:null, name:'geometry', color:'23cba7'});
drawingTools.layers().add(dummyGeometry); 
function clearGeometry() {
  drawingTools.stop();
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//////////////////////////////////////////////// Requirements
var d = require('users/Elnashar/FD:Data');
var f = require('users/Elnashar/FD:Functions');
//////////////////////////////////////////////// General
var crs    = 'EPSG:4326';
var fScale = 926.625433056;
//////////////////////////////////////////////// Functions
function DownScalerInputs(stDate, enDate, SV, YY, MM, Responce, region){
  // Monthly and annually responce
  function getResponce(Responce){
    var cScale = null;  
    var mmResp = null;
    var yyResp = null;
    if (Responce === 'TRMM'){
      cScale = 27829.87269831839; 
      mmResp = d.mmTRMM.filter(ee.Filter.date(stDate, enDate));
      yyResp = d.yyTRMM.filter(ee.Filter.date(stDate, enDate));
    }
    if (Responce === 'GPM'){
      cScale = 11131.949079327358;
      mmResp = d.mmGPM.filter(ee.Filter.date(stDate, enDate));
      yyResp = d.yyGPM.filter(ee.Filter.date(stDate, enDate));
    }
    if (Responce === 'CHIRPS'){
      cScale = 5565.974622603162; 
      mmResp = d.mmCHIRPS.filter(ee.Filter.date(stDate, enDate));
      yyResp = d.yyCHIRPS.filter(ee.Filter.date(stDate, enDate));
    }
    return [cScale, mmResp, yyResp];
  }
  // Export static variables
  function export_SV(x, region){
    if (x !== 0){
      var dd = '00';
      var mm = '00';
      var yy = '0000';
      var ID = yy + mm + dd;
      Export.image.toDrive({image:cEle, description:'Ele_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:cSlo, description:'Slo_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:cAsp, description:'Asp_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:cLon, description:'Lon_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:cLat, description:'Lat_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:cMas, description:'Mas_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'02_coarseStaticPredictors'});
      Export.image.toDrive({image:fEle, description:'Ele_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
      Export.image.toDrive({image:fSlo, description:'Slo_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
      Export.image.toDrive({image:fAsp, description:'Asp_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
      Export.image.toDrive({image:fLon, description:'Lon_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
      Export.image.toDrive({image:fLat, description:'Lat_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
      Export.image.toDrive({image:fMas, description:'Mas_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'04_fineStaticPredictors'});
    }
  }
  // Export annual dynamic variables
  function export_YY(x, region){
    function export_MM(x, region){
      if (x !== 0){
        for (var yy=Number(stDate.slice(0, 4)); yy<=Number(enDate.slice(0, 4)); yy++){
          for (var mm=1; mm<=12; mm++){
            var Resp = mmResp.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
            var dd = '00';
            mm = f.str2(mm, 2);
            var ID = yy + mm + dd;
            Export.image.toDrive({image:Resp, description:Responce+'_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'01_mmPredicate'});
          }
        }
      }
    }
    if (x !== 0){
      export_MM(x, region);
      for (var yy=Number(stDate.slice(0, 4)); yy<=Number(enDate.slice(0, 4)); yy++){
        var dd = '00';
        var mm = '00';
        var ID = yy + mm + dd;
        var Resp  = yyResp.filterMetadata('yy', 'equals',yy).first();
        var cNDVI = yycNDVI.filterMetadata('yy', 'equals',yy).first();
        var cEVI  = yycEVI.filterMetadata('yy', 'equals',yy).first();
        var cLAI  = yycLAI.filterMetadata('yy', 'equals',yy).first();
        var cETa  = yycETa.filterMetadata('yy', 'equals',yy).first();
        var cCLF  = yycCLF.filterMetadata('yy', 'equals',yy).first();
        var cLSTD = yycLSTD.filterMetadata('yy', 'equals',yy).first();
        var cLSTN = yycLSTN.filterMetadata('yy', 'equals',yy).first();
        var fNDVI = yyfNDVI.filterMetadata('yy', 'equals',yy).first();
        var fEVI  = yyfEVI.filterMetadata('yy', 'equals',yy).first();
        var fLAI  = yyfLAI.filterMetadata('yy', 'equals',yy).first();
        var fETa  = yyfETa.filterMetadata('yy', 'equals',yy).first();
        var fCLF  = yyfCLF.filterMetadata('yy', 'equals',yy).first();
        var fLSTD = yyfLSTD.filterMetadata('yy', 'equals',yy).first();
        var fLSTN = yyfLSTN.filterMetadata('yy', 'equals',yy).first();
        Export.image.toDrive({image:Resp,  description:Responce+'_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'01_Predicate'});
        Export.image.toDrive({image:cNDVI, description:'NDVI_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cEVI,  description:'EVI_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cLAI,  description:'LAI_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cETa,  description:'ETa_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cCLF,  description:'CLF_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cLSTD, description:'LSTD_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:cLSTN, description:'LSTN_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
        Export.image.toDrive({image:fNDVI, description:'NDVI_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fEVI,  description:'EVI_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fLAI,  description:'LAI_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fETa,  description:'ETa_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fCLF,  description:'CLF_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fLSTD, description:'LSTD_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        Export.image.toDrive({image:fLSTN, description:'LSTN_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
      }
    }
  } 
  // Export monthly dynamic variables
  function export_MM(x, region){
    if (x !== 0){
      for (var yy=Number(stDate.slice(0, 4)); yy<=Number(enDate.slice(0, 4)); yy++){
        for (var mm=1; mm<=12; mm++){
          var Resp  = mmResp.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cNDVI = mmcNDVI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cEVI  = mmcEVI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cLAI  = mmcLAI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cETa  = mmcETa.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cCLF  = mmcCLF.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var cLSTD = mmcLSTD.filterMetadata('yy', 'equals',yy).filterMetadata('mm', 'equals', mm).first();
          var cLSTN = mmcLSTN.filterMetadata('yy', 'equals',yy).filterMetadata('mm', 'equals', mm).first();
          var fNDVI = mmfNDVI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var fEVI  = mmfEVI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var fLAI  = mmfLAI.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var fETa  = mmfETa.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var fCLF  = mmfCLF.filterMetadata('yy', 'equals', yy).filterMetadata('mm', 'equals', mm).first();
          var fLSTD = mmfLSTD.filterMetadata('yy', 'equals',yy).filterMetadata('mm', 'equals', mm).first();
          var fLSTN = mmfLSTN.filterMetadata('yy', 'equals',yy).filterMetadata('mm', 'equals', mm).first();
          var dd = '00';
          mm = f.str2(mm, 2);
          var ID = yy + mm + dd;
          Export.image.toDrive({image:Resp,  description:Responce+'_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'01_Predicate'});
          Export.image.toDrive({image:cNDVI, description:'NDVI_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cEVI,  description:'EVI_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cLAI,  description:'LAI_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cETa,  description:'ETa_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cCLF,  description:'CLF_'+ID,  region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cLSTD, description:'LSTD_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:cLSTN, description:'LSTN_'+ID, region:region, scale:cScale, crs:crs, maxPixels:1e13, folder:'03_coarseDynamicPredictors'});
          Export.image.toDrive({image:fNDVI, description:'NDVI_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fEVI,  description:'EVI_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fLAI,  description:'LAI_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fETa,  description:'ETa_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fCLF,  description:'CLF_'+ID,  region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fLSTD, description:'LSTD_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
          Export.image.toDrive({image:fLSTN, description:'LSTN_'+ID, region:region, scale:fScale, crs:crs, maxPixels:1e13, folder:'05_fineDynamicPredictors'});
        }
      }
    }
  }
  //////////////////////////////////////////////// Data preparation
  // Monthly and annually responce
  var cScale = getResponce(Responce)[0];
  var mmResp = getResponce(Responce)[1];
  var yyResp = getResponce(Responce)[2];
  // Static variables
  var DEM = ee.Image('CGIAR/SRTM90_V4').select('elevation');
  var Slo = ee.Terrain.slope(DEM).clamp(0, 90);
  var Asp = ee.Terrain.aspect(DEM).clamp(0, 360);
  var PLL = ee.Image.pixelLonLat();
  var Lon = PLL.select('longitude');
  var Lat = PLL.select('latitude');
  // Daynamic variables
  // Monthly environmental features
  var mmNDVI = d.mmNDVI1km.filter(ee.Filter.date(stDate, enDate));
  var mmEVI  = d.mmEVI1km.filter(ee.Filter.date(stDate, enDate));
  var mmLAI  = d.mmLAI500m.filter(ee.Filter.date(stDate, enDate));
  var mmETa  = d.mmSET16.filter(ee.Filter.date(stDate, enDate));
  var mmCLF  = d.mmCLF.filter(ee.Filter.date(stDate, enDate));
  var mmLSTD = d.mmLSTD1km.filter(ee.Filter.date(stDate, enDate));
  var mmLSTN = d.mmLSTN1km.filter(ee.Filter.date(stDate, enDate));
  // Annually environmental features
  var yyNDVI = d.yyNDVI1km.filter(ee.Filter.date(stDate, enDate));
  var yyEVI  = d.yyEVI1km.filter(ee.Filter.date(stDate, enDate));
  var yyLAI  = d.yyLAI500m.filter(ee.Filter.date(stDate, enDate));
  var yyETa  = d.yySET16.filter(ee.Filter.date(stDate, enDate));
  var yyCLF  = d.yyCLF.filter(ee.Filter.date(stDate, enDate));
  var yyLSTD = d.yyLSTD1km.filter(ee.Filter.date(stDate, enDate));
  var yyLSTN = d.yyLSTN1km.filter(ee.Filter.date(stDate, enDate));
   // Original scale
  var sDEM = ee.Number(DEM.projection().nominalScale());
  var sSlo = ee.Number(Slo.projection().nominalScale());
  var sAsp = ee.Number(Asp.projection().nominalScale());
  var sNDVI = ee.Number(mmNDVI.first().projection().nominalScale());
  var sEVI  = ee.Number(mmEVI.first().projection().nominalScale());
  var sLAI  = ee.Number(mmLAI.first().projection().nominalScale());
  var sETa  = ee.Number(mmETa.first().projection().nominalScale());
  var sCLF  = ee.Number(mmCLF.first().projection().nominalScale());
  var sLSTD = ee.Number(mmLSTD.first().projection().nominalScale());
  var sLSTN = ee.Number(mmLSTN.first().projection().nominalScale());
  // Fine static variables
  var fEle = DEM.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sDEM, fScale)}).rename('fEle');
  var fSlo = Slo.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sSlo, fScale)}).rename('fSlo');
  var fAsp = Asp.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sAsp, fScale)}).rename('fAsp');
  var fLon = Lon.reproject({crs:crs, scale:fScale}).rename('fLon');
  var fLat = Lat.reproject({crs:crs, scale:fScale}).rename('fLat');
  // Coarse static variables
  var cEle = DEM.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sDEM, cScale)}).rename('cEle');
  var cSlo = Slo.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sSlo, cScale)}).rename('cSlo');
  var cAsp = Asp.reduceResolution({reducer:ee.Reducer.mean(), bestEffort:true, maxPixels:f.gMP(sAsp, cScale)}).rename('cAsp');
  var cLon = Lon.reproject({crs:crs, scale:cScale}).rename('cLon');
  var cLat = Lat.reproject({crs:crs, scale:cScale}).rename('cLat');
  // Fine monthly environmental features
  var mmfNDVI = f.upscaling(mmNDVI, 'mean', true, f.gMP(sNDVI, fScale));
  var mmfEVI  = f.upscaling(mmEVI,  'mean', true, f.gMP(sEVI, fScale));
  var mmfLAI  = f.upscaling(mmLAI,  'mean', true, f.gMP(sLAI, fScale));
  var mmfETa  = f.upscaling(mmETa,  'mean', true, f.gMP(sETa, fScale)); 
  var mmfCLF  = f.upscaling(mmCLF,  'mean', true, f.gMP(sCLF, fScale));
  var mmfLSTD = f.upscaling(mmLSTD, 'mean', true, f.gMP(sLSTD, fScale));
  var mmfLSTN = f.upscaling(mmLSTN, 'mean', true, f.gMP(sLSTN, fScale));
  // Fine annually environmental features
  var yyfNDVI = f.upscaling(yyNDVI, 'mean', true, f.gMP(sNDVI, fScale));
  var yyfEVI  = f.upscaling(yyEVI,  'mean', true, f.gMP(sEVI, fScale)); 
  var yyfLAI  = f.upscaling(yyLAI,  'mean', true, f.gMP(sLAI, fScale)); 
  var yyfETa  = f.upscaling(yyETa,  'mean', true, f.gMP(sETa, fScale));
  var yyfCLF  = f.upscaling(yyCLF,  'mean', true, f.gMP(sCLF, fScale));
  var yyfLSTD = f.upscaling(yyLSTD, 'mean', true, f.gMP(sLSTD, fScale)); 
  var yyfLSTN = f.upscaling(yyLSTN, 'mean', true, f.gMP(sLSTN, fScale)); 
  // Coarse monthly environmental features
  var mmcNDVI = f.upscaling(mmNDVI, 'mean', true, f.gMP(sNDVI, cScale));
  var mmcEVI  = f.upscaling(mmEVI,  'mean', true, f.gMP(sEVI, cScale));
  var mmcLAI  = f.upscaling(mmLAI,  'mean', true, f.gMP(sLAI, cScale));
  var mmcETa  = f.upscaling(mmETa,  'mean', true, f.gMP(sETa, cScale));
  var mmcCLF  = f.upscaling(mmCLF,  'mean', true, f.gMP(sCLF, cScale));
  var mmcLSTD = f.upscaling(mmLSTD, 'mean', true, f.gMP(sLSTD, cScale));
  var mmcLSTN = f.upscaling(mmLSTN, 'mean', true, f.gMP(sLSTN, cScale));
  // Coarse annually environmental features
  var yycNDVI = f.upscaling(yyNDVI, 'mean', true, f.gMP(sNDVI, cScale));
  var yycEVI  = f.upscaling(yyEVI,  'mean', true, f.gMP(sEVI, cScale));
  var yycLAI  = f.upscaling(yyLAI,  'mean', true, f.gMP(sLAI, cScale));
  var yycETa  = f.upscaling(yyETa,  'mean', true, f.gMP(sETa, cScale));
  var yycCLF  = f.upscaling(yyCLF,  'mean', true, f.gMP(sCLF, cScale)); 
  var yycLSTD = f.upscaling(yyLSTD, 'mean', true, f.gMP(sLSTD, cScale));
  var yycLSTN = f.upscaling(yyLSTN, 'mean', true, f.gMP(sLSTN, cScale));
  // Fine and coarse land cover
  var LC = ee.ImageCollection('MODIS/006/MCD12Q1').select('LC_Type1').filterDate(stDate, enDate);
      LC = LC.mode().reproject({crs:LC.first().projection()});
      LC = ee.Image(1).reproject({crs:LC.projection()}).where(LC.eq(13), 0).where(LC.eq(15), 0).where(LC.eq(17), 0).rename('LC');
  var sMas = ee.Number(LC.projection().nominalScale()); 
  var fMas = LC.reduceResolution({reducer:ee.Reducer.mode(), bestEffort:true, maxPixels:f.gMP(sMas, fScale)}).rename('fMas');
  var cMas = LC.reduceResolution({reducer:ee.Reducer.mode(), bestEffort:true, maxPixels:f.gMP(sMas, cScale)}).rename('cMas');
  //////////////////////////////////////////////// Data exporting
  export_SV(SV, region);
  export_YY(YY, region);
  export_MM(MM, region);
 }
///////////////////////////////////////////////////////// GUI
var downscalerLable = ui.Label({
  'value':'Precipitation Downscaling Data Module',
  'targetUrl':'https://www.mdpi.com/2072-4292/12/23/3860'
});
var rainfallLable = ui.Label({
  'value':'Rainfall Source'
});
var aoilLable = ui.Label({
  'value':'Area of Interest'
});
var uaoilLable = ui.Label({
  'value':'User-defined AOI'
});
var MLList = ['GPM', 'TRMM', 'CHIRPS'];
var rainfallSource = ui.Select({placeholder:MLList[0], value:MLList[0], items:MLList});
var aoiLList = ['Drawing-tools','User-defined'];
var aoiSource = ui.Select({placeholder:aoiLList[0], value:aoiLList[0], items:aoiLList});
var aoiTextbox = ui.Textbox({
  placeholder:"",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'left', margin:'left'},
  disabled:true,
});
aoiSource.onChange(
  function(){
  if (aoiSource.getValue() === 'User-defined'){
    drawingTools.setShown(false);
    aoiTextbox.setDisabled(false);
  }
  else{
    drawingTools.setShown(true);
    aoiTextbox.setDisabled(true);
  }
}
);
var staticVariableLabel = ui.Checkbox({
  'label':'Static Variables', 
});
var annualLable = ui.Checkbox({
  'label':'Annual Dynamic Variables', 
});
var monthlyLable = ui.Checkbox({
  'label':'Monthly Dynamic Variables', 
});
var dateLable = ui.Label({
  'value':'Start and end dates: YYYY-MM-DD'
});
var startDate = ui.Textbox({
  value:"2020-01-01",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'left', margin:'left'},
}); 
var endDate = ui.Textbox({
  value:"2020-12-31",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'left', margin:'left'},
});
var LocText = ui.Button({
  label:'Download'    ,
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'center'},
});
var NewText = ui.Button({
  label:'Clear geometry'    ,
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'center'},
});
var path0 = ui.Label({'value':'Data will be downloaded into:'});
var path1 = ui.Label({'value':'......01_Predicate'});
var path2 = ui.Label({'value':'......02_coarseStaticPredictors'});
var path3 = ui.Label({'value':'......03_coarseDynamicPredictors'});
var path4 = ui.Label({'value':'......04_fineStaticPredictors'});
var path5 = ui.Label({'value':'......05_fineDynamicPredictors'});
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'},
  widgets:[
    downscalerLable,
    ui.Panel([rainfallLable, rainfallSource],ui.Panel.Layout.flow('horizontal')),
    ui.Panel([aoilLable, aoiSource],ui.Panel.Layout.flow('horizontal')),
    ui.Panel([uaoilLable, aoiTextbox],ui.Panel.Layout.flow('horizontal')),
    staticVariableLabel,
    annualLable,
    monthlyLable,
    dateLable,
    startDate,
    endDate,
    ui.Panel([LocText, NewText],ui.Panel.Layout.flow('horizontal')),
    path0, path1, path2, path3, path4, path5,
  ],
});
var SV = null;
var YY = null;
var MM = null;
var region = null;
LocText.onClick(function(){
  var stDate = startDate.getValue();
  var enDate = endDate.getValue();
  //control the download of static variables, SV=1(download), SV=0(can't download)
  if (staticVariableLabel.getValue() === true){ SV = 1; }else{ SV = 0; }  
  //control the download of annually variables, YY=1(download), YY=0(can't download)
  if (annualLable.getValue() === true){ YY = 1; } else{ YY = 0; } 
  //control the download of monthly variables, MM = 1(download), MM=0(can't download)
  if (monthlyLable.getValue() === true){ MM = 1; } else{ MM = 0; } 
  //control the rainfall data sources
  var Responce = rainfallSource.getValue();
  //control the AOI, use the drawing tool of map to draw the AOI
  if (aoiSource.getValue() === 'Drawing-tools'){
    region = drawingTools.layers().get(0).getEeObject().bounds().buffer(10000);
  }
  //upload the AOI file from Assets 
  if ((aoiSource.getValue() === 'User-defined') & (aoiTextbox.getValue() !== "")){
    region = ee.FeatureCollection(aoiTextbox.getValue()).geometry().bounds().buffer(10000);
  }
  Map.clear();
  Map.centerObject(region, 5);
  Map.addLayer(region, {}, 'AOI', 1, 1);
  print(stDate, enDate, SV, YY, MM, Responce, region);
  DownScalerInputs(stDate, enDate, SV, YY, MM, Responce, region);
});
NewText.onClick(function(){
  Map.clear();
  clearGeometry();
});
ui.root.insert(0, panel);