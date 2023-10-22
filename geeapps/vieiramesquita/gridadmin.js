var processPlotInfo = function( plot, start, end, lastYearsDate ){
var getChessTable = function(ring){
var xoff = (ring.coordinates().get(0)).getInfo()[1];
var yoff = (ring.coordinates().get(0)).getInfo()[0];
var xin = (ring.coordinates().get(2)).getInfo()[1];
var yin = (ring.coordinates().get(2)).getInfo()[0];
var xD = xoff - xin;
var yD = yoff - yin;
var chesstable = ee.Geometry.MultiLineString([[[(yD/3)+yin, xoff],[(yD/3)+yin, xin]],[[(yD/3)*2+yin, xoff],[(yD/3)*2+yin, xin]],
[[yoff, (xD/3)*2+xin],[yin, (xD/3)*2+xin]],[[yoff, (xD/3)+xin],[yin, (xD/3)+xin]]]);
return chesstable;
};
var pastureMaps = 'projects/mapbiomas-workspace/TRANSVERSAIS/PECUARIA3-FT/';
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
}
function imageCollection(map, year,comp,layerPos,idFeat,TSD_Filter){
  var applyCloudMask = function(img){
    var BQAValue = 672;
    if (year >2012){
      BQAValue = 2720;
    }
    var cloudMask = img.select(['BQA']).eq(BQAValue);
    return img.mask(cloudMask).clip(bounds);
  };
  var L8Comps = ee.Dictionary({
    False:['B5_mean','B6_mean','B4_mean'],
    Agri: ['B6_mean','B5_mean','B4_mean'],
    True: ['B4_mean','B3_mean','B2_mean'],
  });
  var L57Comps =  ee.Dictionary({
    False:['B4_mean','B5_mean','B3_mean'],
    Agri: ['B5_mean','B4_mean','B3_mean'],
    True: ['B3_mean','B2_mean','B1_mean'],
  });
  var bands;
  var min;
  var max;
  var collectionId;
  var gamma;
  var bounds = ee.Geometry(map.getBounds(true));
  if (year >2012){
    collectionId = "LANDSAT/LC08/C01/T1_TOA";
    bands = L8Comps.get(comp);
    //bands = ['B5_median','B6_median','B4_median']
    if (comp == 'False'){
      min = [0.120481,0.102069,0.044575];
      max = [0.480884,0.458253,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'Agri'){
      min = [0.102069,0.120481,0.044575];
      max = [0.458253,0.480884,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'True'){
      min = [0.055,0.055,0.055];
      max = [0.2,0.21,0.20];
      gamma = [1.35,1.6,1.15];
    }
   }
  else if (ee.List([2000,2001,2002,2012]).contains(year)===true){
    collectionId = "LANDSAT/LE07/C01/T1_TOA";
    bands = L57Comps.get(comp);
    //bands = ['B5_median','B6_median','B4_median']
    if (comp == 'False'){
      min = [0.150481,0.122069,0.064575];
      max = [0.320884,0.398253,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'Agri'){
      min = [0.122069,0.150481,0.064575];
      max = [0.398253,0.320884,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'True'){
      min = [0.055,0.055,0.055];
      max = [0.2,0.21,0.21];
      gamma = [1.35,1.6,1.15];
    }
  }
  else {
    collectionId = "LANDSAT/LT05/C01/T1_TOA";
    bands = L57Comps.get(comp);
    //bands = ['B4_median','B5_median','B3_median']
    if (comp == 'False'){
      min = [0.150481,0.122069,0.064575];
      max = [0.320884,0.398253,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'Agri'){
      min = [0.122069,0.150481,0.064575];
      max = [0.398253,0.320884,0.18995];
      gamma = [1.1,1.1,1.1];
    }
    else if (comp == 'True'){
      min = [0.06,0.06,0.06];
      max = [0.2,0.21,0.21];
      gamma = [1.35,1.6,1.15];
    }
  }
  var ring = ee.Geometry.LinearRing(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0));
  var buff = ee.Geometry.Polygon(ee.Geometry(ring.buffer(10000).geometries().get(0)).coordinates());
  var filterDateType = {
    '2Y': {1:(year-1) + "-07-01", 2:(year+1) + "-06-30"},
    '1Y': {1:(year) + "-01-01", 2:(year) + "-12-31"},
    '1T': {1:(year) + "-01-01", 2:(year) + "-03-31"},
    '2T': {1:(year) + "-04-01", 2:(year) + "-06-30"},
    '3T': {1:(year) + "-07-01", 2:(year) + "-09-30"},
    '4T': {1:(year) + "-10-01", 2:(year) + "-12-31"}
  };
  var imgMedian = ee.ImageCollection(collectionId)
    .filterBounds(bounds)
    .filterDate(filterDateType[TSD_Filter][1],filterDateType[TSD_Filter][2])
    .map(applyCloudMask)
    .reduce(ee.Reducer.mean());
  var imgVisualize = imgMedian.visualize(bands,null,null,min,max,gamma);
  map.layers().set(layerPos, imgVisualize.clip(buff));
}
function plotPasture(map, mapSt, year,idFeat){
  var ring = ee.Geometry.Polygon(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0));
  var pastureImage = ee.Image(pastureMaps+year).clip(ring);
  var pasture = pastureImage.visualize({palette:'#f4e242'});
  var notPastureImage = pastureImage.unmask(0).not();
  notPastureImage = notPastureImage.mask(notPastureImage).clip(ring);
  var notPasture = notPastureImage.visualize({palette:'#ffffff'});
  map.layers().set(1,pasture);
  mapSt.layers().set(1,notPasture);
}
var labelComp = ui.Label('Landsat Color Composition');
labelComp.style().set('margin', '15px 0px 0px 0px');
var colorComp = 'False';
var colorComps = {
'False Color': 'False',
'Agriculture Color': 'Agri',
'True Color': 'True'
};
var selectComp = function(map,mapPast,year,showMe) {
  //var colorComp = 'False';
  var Comp = ui.Select({
  items: Object.keys(colorComps),
  value: 'False Color',
  onChange: function(key) {
    colorComp = colorComps[key];
    imageCollection(map, year,colorComp,0,idFeat,TS_Date);
    imageCollection(mapPast, year,colorComp,0,idFeat,TS_Date);
    //if(showMe===true){plotPasture(map, mapPast,year,idFeat)}
  },
    style:{stretch: 'horizontal'},
  });
  return colorComp,Comp;
};
var showMe = true;
//var showMeGrid = true
var year = 1985;
var TS_Date = '2Y';
var sizeFt = plot.size().getInfo();
var idFeat = 1;
var gridInfo;
var gridArea;
var pastGridInfo;
var pastGridArea;
var ring;
function addPlotToMap(map, plot,featNumber,firstTime){
    var gridFtgeo = plot.geometry();
    gridInfo = (ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('ID')).getInfo();
    gridArea = ee.Number((ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('AREA_G'))).float();
    try {
      pastGridInfo = ee.Number(ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('Y'+year)).float()
      pastGridArea = (pastGridInfo.divide(gridArea)).multiply(100.0).getInfo().toFixed(3);
    }
    catch(err) {
      pastGridArea = 0;
    }
    ring = ee.Geometry.LinearRing(ee.Geometry(ee.Geometry.MultiPolygon(gridFtgeo.coordinates()).geometries().get(idFeat-1)).coordinates().get(0));
    var lineGrid= getChessTable(ring);
    map.centerObject(ring,13);
    if(firstTime===true){
    map.layers().set(2,lineGrid);
    map.layers().set(3,ring)}
    //map.centerObject(ring, 15 );
    // Center Object not working
    var center = ring.centroid();
    var latLong = center.coordinates().getInfo();
    map.setCenter( latLong[0], latLong[1], 13);
    //map.addLayer(lineGrid, {color:'f4c842'});
    map.addLayer(lineGrid, {color:'black'});
    map.addLayer(ring, {color:'#ffffff'});
    map.setControlVisibility(false);
    return map;
}
function createSliderMap(plot,year){
    var map = ui.Map();
    var mapPasture = ui.Map();
    //var colorComp = colorComps[(selectComp(map,mapPasture,year,showMe)).getValue()]
    //map.onChangeZoom(function(){imageCollection(map, year,colorComp,0,idFeat)});
    //mapPasture.onChangeZoom(function(){imageCollection(mapPasture, year,colorComp,0,idFeat);
    //if(showMe===true){plotPasture(map, mapPasture,year,idFeat)}});
    //mapPasture.setOptions("HYBRID")
    //map.setOptions("HYBRID")
    addPlotToMap(map, plot,idFeat,true);
    addPlotToMap(mapPasture, plot,idFeat,true);
    var link = ui.Map.Linker([map,mapPasture]);
    // Add the plot polygon to the map
    return [map,mapPasture,colorComp];
}
var pastureMap = createSliderMap(plot,year);
////////////////////////////////////////////////////////
var labelGridHeader = ui.Label('GRID ASSESSMENT');
labelGridHeader.style().set({
  fontSize:'50',
  fontWeight :'bold',
  textAlign : 'center',
  padding: '0px 0px 0px 33%'
  //position: 'top-right'
});
var labelGridNumber = ui.Label('GRID Nº ' + gridInfo + ' - ' + year);
labelGridNumber.style().set({
  fontSize:'50',
  //fontWeight :'bold',
  textAlign : 'center',
  padding: '0px 0px 0px 30%'
  //position: 'top-right'
});
var labelGridFID = ui.Label('FID ' +idFeat );
labelGridFID.style().set({
  fontSize:'50',
  fontWeight :'bold',
  textAlign : 'center',
  padding: '4px 0px 0px 33%'
  //position: 'top-right'
});
var labelObs = ui.Label('Observações');
labelObs.style().set({
  fontSize:'25',
  fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var textObs = ui.Textbox('Escreva aqui suas observações');
var textFIDValue = ui.Textbox('Escreva a FID desejada');
textFIDValue.style().set({shown:false});
var buttonCancelFID = ui.Button('Cancelar',function(){
  textFIDValue.style().set({shown:false});
  buttonChangeFID.style().set({shown:true});
  buttonCancelFID.style().set({shown:false});
  buttonModifyFID.style().set({shown:false});
  labelGridFID.style().set({padding: '0%'});
});
buttonCancelFID.style().set({shown:false});
var buttonChangeFID = ui.Button({
  label: 'Mudar de FID',
  onClick: function(){
    labelGridFID.style().set({padding: ''});
    textFIDValue.style().set({shown:true});
    buttonChangeFID.style().set({shown:false});
    buttonCancelFID.style().set({shown:true});
    buttonModifyFID.style().set({shown:true});
  }
});
var buttonModifyFID = ui.Button({
  label: 'Modificar',
  onClick: function(){
    textFIDValue.style().set({shown:false});
    buttonChangeFID.style().set({shown:true});
    buttonCancelFID.style().set({shown:false});
    buttonModifyFID.style().set({shown:false});
    textFIDValue.setPlaceholder('Escreva a FID desejada');
    textFIDValue.style().set({color:'black'});
    idFeat = ee.Number(ee.String(textFIDValue.getValue()).decodeJSON()).getInfo();
    //print(idFeat,sizeFt,idFeat <= sizeFt)
    if (typeof(idFeat)==='number' && idFeat > 0  && idFeat <= sizeFt){
      labelGridFID.style().set({padding: '4px 0px 0px 33%'});
      TS_Date = '2Y';
      selectDateF.setValue('2 Anos (Mapbiomas)');
      selectDateF = selectDate(pastureMap[0], pastureMap[1],year);
      panelFDate.clear();
      panelFDate.add(labelFDate);
      panelFDate.add(selectDateF);
      addPlotToMap(pastureMap[0], plot,idFeat);
      addPlotToMap(pastureMap[1], plot,idFeat);
      gridInfo = (ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('ID')).getInfo();
      gridArea = ee.Number((ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('AREA_G'))).float();
      try {
        pastGridInfo = ee.Number(ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('Y'+year)).float()
        pastGridArea = (pastGridInfo.divide(gridArea)).multiply(100.0).getInfo().toFixed(3);
      }
      catch(err) {
        pastGridArea = 0;
      }
      if(year >=2017){
      buttonNextY.style().set({shown:true});
      buttonNextGrid.style().set({shown:false});
      }
      storeYearData = [];
      year = 1985;
      var compInfo;
      if(colorComp==='False'){compInfo='False Color'}else if(colorComp==='Agri'){compInfo='Agriculture Color'}
      else if (colorComp==='True'){compInfo='True Color'}
      selectCompY = selectComp(pastureMap[0],pastureMap[1],year,checkPastureMap.getValue()).setValue(compInfo);
      panelComp.clear();
      panelComp.add(labelComp);
      panelComp.add(selectCompY);
      checkPastureMap.setValue(true);
      var featCoords = ee.Geometry.LinearRing(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0)).centroid().coordinates().getInfo();
      labelGridFID.setValue('FID ' +idFeat );
      labelGridCoords.setValue('Coords: ' + featCoords[1].toFixed(6) + ', ' + featCoords[0].toFixed(6));
      labelGridNumber.setValue('GRID Nº ' + gridInfo + ' - ' + year);
      labelPastPerc.setValue('Percentual do Grid mapeado como pastagem: ' + pastGridArea + '%');
      imageCollection(pastureMap[0], year,colorComp,0,idFeat,TS_Date);
      imageCollection(pastureMap[1], year,colorComp,0,idFeat,TS_Date);
      if(checkPastureMap.getValue()===true){plotPasture(pastureMap[0], pastureMap[1],year,idFeat)}
      textFIDValue.setValue('');
    }
    else{
      textFIDValue.setValue('');
      textFIDValue.setPlaceholder('Insira um valor válido');// positivo até ' + sizeFt);
      textFIDValue.style().set({shown:true,color:'red'});
      buttonChangeFID.style().set({shown:false});
      buttonCancelFID.style().set({shown:true});
      buttonModifyFID.style().set({shown:true});
    }
  }
});
buttonModifyFID.style().set({shown:false});
var panelChangeFID = ui.Panel([labelGridFID,textFIDValue,buttonChangeFID,buttonModifyFID,buttonCancelFID],ui.Panel.Layout.Flow('horizontal'));
var featCoords = ee.Geometry.LinearRing(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0)).centroid().coordinates().getInfo();
var labelGridCoords = ui.Label('Coords: ' + featCoords[1].toFixed(6) + ', ' + featCoords[0].toFixed(6));
labelGridFID.style().set({
  fontSize:'50',
  fontWeight :'bold',
  textAlign : 'center',
  padding: '0px 0px 0px 30%'
  //position: 'top-right'
});
var perInfo = {
  '0%':0,'5%':5,'10%':10,'20%':20,'30%':30,'40%':40,'50%':50,
  '60%':60,'70%':70,'80%':80,'90%':90,'100%':100
};
var labelPastPerc = ui.Label('Percentual do Grid mapeado como pastagem: ' + pastGridArea + '%');
labelPastPerc.style().set({
  fontSize:'25',
  //fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
//var selectPastPerc = ui.Select({
  //value: 0, 
  //items: Object.keys(perInfo),
  //style:{stretch: 'horizontal'},
//});
//selectPastPerc.setPlaceholder('Escolha o percentual de área total de pastagem classificada...');
var labelGridOmission = ui.Label('Percentual de área omitida:');
labelGridOmission.style().set({
  fontSize:'25',
  //fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var selectPercentOmi = ui.Select({
  //value: 0, 
  items: Object.keys(perInfo),
  style:{stretch: 'horizontal'},
});
selectPercentOmi.setPlaceholder('Escolha o percentual de área omitido pela classificação...');
var labelGridComission = ui.Label('Percentual de área comitida:');
labelGridOmission.style().set({
  fontSize:'25',
  //fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var selectPercentCom = ui.Select({
  //value: 0, 
  items: Object.keys(perInfo),
  style:{stretch: 'horizontal'},
});
selectPercentCom.setPlaceholder('Escolha o percentual de área comitido pela classificação...');
var difInter = {
    'Baixa 😂':'Baixa',
    'Média 🤔':'Média',
    'Alta 🤯':'Alta'};
var labelGridInterDif = ui.Label('Complexidade de interpretação do Grid:');
labelGridInterDif.style().set({
  fontSize:'25',
  //fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var selectGridInterDif = ui.Select({
  //value: 0, 
  items: Object.keys(difInter),
  style:{stretch: 'horizontal'},
});
selectGridInterDif.setPlaceholder('Escolha o nível de complexidade do Grid...');
var SpatCon = {
    'Ruim 🙀':'Ruim',
    'Boa 🐶':'Boa'
};
var labelGridSpatCon = ui.Label('Consistência espacial do mapeamento:');
labelGridSpatCon.style().set({
  fontSize:'25',
  //fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var selectGridSpatCon = ui.Select({
  //value: 0, 
  items: Object.keys(SpatCon),
  style:{stretch: 'horizontal'},
});
selectGridSpatCon.setPlaceholder('Informe a consistência espacial do mapeamento neste Grid...');
var labelConfPasture = ui.Label('Problemas observados');
labelConfPasture.style().set({
  fontSize:'25',
  fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var checkConfAgri= ui.Checkbox({
  label:'Confusão com Agricultura',
  value: false,
  onChange:function(checked){
    //if(checked){print('You are seeing crazy things BRO 😱')}
    //else{print('Oh! It\'s only a mistake 😓')}
  },
});
var checkConfUrb= ui.Checkbox({
  label:'Confusão com Área Urbana',
  value: false,
  onChange:function(checked){
    //if(checked){print('You are seeing crazy things BRO 😱')}
    //else{print('Oh! It\'s only a mistake 😓')}
  },
});
var checkConfVeg= ui.Checkbox({
  label:'Confusão com Vegetação Nativa',
  value: false,
  onChange:function(checked){
    //if(checked){print('You are seeing crazy things BRO 😱')}
    //else{print('Oh! It\'s only a mistake 😓')}
  },
});
var checkBadMosaic= ui.Checkbox({
  label:'Mosaico de imagens ruim/Sem imagens',
  //color:'red',
  value: false,
  onChange:function(checked){
    //if(checked){print('You are seeing crazy things BRO 😱')}
    //else{print('Oh! It\'s only a mistake 😓')}
  },
});
var labelOtherConfigs= ui.Label('Outras configurações');
labelOtherConfigs.style().set({
  fontSize:'25',
  fontWeight :'bold',
  textAlign : 'left',
  padding: '4px 0px 0px 1%'
  //position: 'top-right'
});
var checkPastureMap = ui.Checkbox({
  label:'Show Pasture Map / Mask',
  value: true,
  onChange:function(checked){
    if (checked){
    pastureMap[0].layers().get(1).setShown(checked);
    pastureMap[1].layers().get(1).setShown(checked);
    showMe = true}
    else{
    pastureMap[0].layers().get(1).setShown(false);
    pastureMap[1].layers().get(1).setShown(false);
    showMe = false}
  },
});
var checkGridMinor = ui.Checkbox({
  label:'Show Minor Grid',
  value: true,
  onChange:function(checked){
    if (checked){
    pastureMap[0].layers().get(((pastureMap[1].layers()).length()-2)).setShown(checked);
    pastureMap[1].layers().get(((pastureMap[1].layers()).length()-2)).setShown(checked);
    //showMeGrid = true
    }
    else{
    pastureMap[0].layers().get(((pastureMap[1].layers()).length()-2)).setShown(false);
    pastureMap[1].layers().get(((pastureMap[1].layers()).length()-2)).setShown(false);
    //showMeGrid = false
    }
  },
});
var buttonSave=ui.Button({
  label: 'Salvar',
  onClick: function() {},
  style: {
     //margin: '0px 0px 0px 33%',
  }
});
var buttonCenterView = ui.Button({
  label: 'Grid Center',
  onClick:function(){
    pastureMap[0].centerObject(ring,13);
    pastureMap[1].centerObject(ring,13);
  },
  //style: {margin: '0px 0px 0px 33%'//}
});
var saveData = {};
var storeYearData = [];
var buttonNextGrid = ui.Button({
  label:'Próximo Grid',
  onClick: function(){
    buttonNextY.style().set({shown:true});
    buttonNextGrid.style().set({shown:false});
    var vectorGeo = ee.Geometry.Polygon(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0));
    print(saveData);
    print(vectorGeo);
    var feat2Exp = ee.FeatureCollection(ee.Feature(vectorGeo, {'GEE_DATA':saveData['GEE.DATA']}));
    print(feat2Exp);
    var exportData = ee.Serializer.toJSON(feat2Exp);
    var params = {
    json: exportData,
    type: 'EXPORT_FEATURES',
    driveFolder:'LAPIG_GRID_INSPECTION_2018',
    description: 'ID_'+gridInfo,
    driveFileNamePrefix: 'ID_'+gridInfo + '_' +inspetor,
    format: 'GeoJSON'
    };
    var taskId = ee.data.newTaskId(1);
    ee.data.startProcessing(taskId, params);
    storeYearData = [];
    idFeat++;
    if (idFeat <= sizeFt){
      //print(idFeat);
      addPlotToMap(pastureMap[0], plot,idFeat);
      addPlotToMap(pastureMap[1], plot,idFeat);
      }
    else{
      //print(idFeat)
      idFeat = 1;
      addPlotToMap(pastureMap[0], plot,idFeat);
      addPlotToMap(pastureMap[1], plot,idFeat);
    }
    year = 1985;
    TS_Date = '2Y';
    selectDateF.setValue('2 Anos (Mapbiomas)');
    selectDateF = selectDate(pastureMap[0], pastureMap[1],year);
    panelFDate.clear();
    panelFDate.add(labelFDate);
    panelFDate.add(selectDateF);
    gridInfo = (ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('ID')).getInfo();
    gridArea = ee.Number((ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('AREA_G'))).float();
    try {
      pastGridInfo = ee.Number(ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('Y'+year)).float()
      pastGridArea = (pastGridInfo.divide(gridArea)).multiply(100.0).getInfo().toFixed(3);
    }
    catch(err) {
      pastGridArea = 0;
    }
    var compInfo;
    if(colorComp==='False'){compInfo='False Color'}else if(colorComp==='Agri'){compInfo='Agriculture Color'}
    else if (colorComp==='True'){compInfo='True Color'}
    selectCompY = selectComp(pastureMap[0],pastureMap[1],year,checkPastureMap.getValue()).setValue(compInfo);
    panelComp.clear();
    panelComp.add(labelComp);
    panelComp.add(selectCompY);
    checkPastureMap.setValue(true);
    checkGridMinor.setValue(true);
    var featCoords = ee.Geometry.LinearRing(ee.Geometry(ee.Geometry.MultiPolygon(plot.geometry().coordinates()).geometries().get(idFeat-1)).coordinates().get(0)).centroid().coordinates().getInfo();
    labelGridFID.setValue('FID ' +idFeat );
    labelGridCoords.setValue('Coords: ' + featCoords[1].toFixed(6) + ', ' + featCoords[0].toFixed(6));
    labelGridNumber.setValue('GRID Nº ' + gridInfo + ' - ' + year);
    labelPastPerc.setValue('Percentual do Grid mapeado como pastagem: ' + pastGridArea + '%');
    imageCollection(pastureMap[0], year,colorComp,0,idFeat,TS_Date);
    imageCollection(pastureMap[1], year,colorComp,0,idFeat,TS_Date);
    if(checkPastureMap.getValue()===true){plotPasture(pastureMap[0], pastureMap[1],year,idFeat)}
  }
});
buttonNextGrid.style().set({shown:false});
var buttonNextY =ui.Button({
  label: 'Próximo ano',
  onClick: function() {
  if(selectPercentOmi.getValue() === null){selectPercentOmi.setValue('0%')}
  if(selectPercentCom.getValue() === null){selectPercentCom.setValue('0%')}
  if(selectGridInterDif.getValue() === null){selectGridInterDif.setValue('Baixa 😂')}
  if(selectGridSpatCon.getValue() === null){selectGridSpatCon.setValue('Boa 🐶')}
  if(textObs.getValue() === null || textObs.getValue() === undefined){textObs.setValue('')}
  storeYearData.push(['FID'+idFeat,'ID'+gridInfo,year,{
      'Percentual_do_Grid_mapeado_como_pastagem': pastGridArea,
      'Percentual_de_Omissao': perInfo[selectPercentOmi.getValue()],
      'Percentual_de_Comissao':perInfo[selectPercentCom.getValue()],
      'Complexidade_de_interpretacao_do_Grid':difInter[selectGridInterDif.getValue()],
      'Consistencia_espacial_do_mapeamento':SpatCon[selectGridSpatCon.getValue()],
      'Confusao_com_Agricultura':checkConfAgri.getValue(),
      'Confusao_com_area_Urbana':checkConfUrb.getValue(),
      'Confusao_com_Vegetacao_Nativa':checkConfVeg.getValue(),
      'Mosaico_de_imagens_ruim_Sem_imagens':checkBadMosaic.getValue(),
      'Observacoes': textObs.getValue()
  }]); 
  //if(checkBadMosaic.getValue()===true){storeYearData.push(['FID'+idFeat,'ID'+gridInfo,year,'Bad mosaic'])}
  if (year === 1985){
    saveData['GEE.DATA'] = storeYearData;
  }
  //selectPastPerc.setPlaceholder('Escolha o percentual de área total de pastagem classificada...');
  //selectPercentOmi.setPlaceholder('Escolha o percentual de área omitido pela classificação...');
  //selectPercentCom.setPlaceholder('Escolha o percentual de área comitido pela classificação...');
  selectPercentOmi.setValue('0%');
  selectPercentCom.setValue('0%');
  selectGridInterDif.setValue('Baixa 😂');
  selectGridSpatCon.setValue('Boa 🐶');
  textObs.setValue('');
  checkBadMosaic.setValue(false);
  checkConfAgri.setValue(false);
  checkConfUrb.setValue(false);
  checkConfVeg.setValue(false);
  year = year + 2;
  TS_Date = '2Y';
  selectDateF.setValue('2 Anos (Mapbiomas)');
  selectDateF = selectDate(pastureMap[0], pastureMap[1],year);
  panelFDate.clear();
  panelFDate.add(labelFDate);
  panelFDate.add(selectDateF);
  var compInfo;
  if(colorComp==='False'){compInfo='False Color'}else if(colorComp==='Agri'){compInfo='Agriculture Color'}
  else if (colorComp==='True'){compInfo='True Color'}
  selectCompY = selectComp(pastureMap[0],pastureMap[1],year,checkPastureMap.getValue()).setValue(compInfo);
  panelComp.clear();
  panelComp.add(labelComp);
  panelComp.add(selectCompY);
  //gridInfo = (ee.Feature(plot.toList(1).get(0)).toDictionary().get('ID')).getInfo()
  gridArea = ee.Number((ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('AREA_G'))).float();
  try {
    pastGridInfo = ee.Number(ee.Feature(plot.toList(idFeat).get(idFeat-1)).toDictionary().get('Y'+year)).float();
    pastGridArea = (pastGridInfo.divide(gridArea)).multiply(100.0).getInfo().toFixed(3);
  }
  catch(err) {
    pastGridArea = 0;
  }
  labelGridNumber.setValue('GRID Nº ' + gridInfo + ' - ' + year);
  labelPastPerc.setValue('Percentual do Grid mapeado como pastagem: ' + pastGridArea + '%');
  imageCollection(pastureMap[0], year,colorComp,0,idFeat,TS_Date);
  imageCollection(pastureMap[1], year,colorComp,0,idFeat,TS_Date);
  plotPasture(pastureMap[0], pastureMap[1],year,idFeat);
  if(checkPastureMap.getValue()===false){
    pastureMap[0].layers().get(1).setShown(false);
    pastureMap[1].layers().get(1).setShown(false);
  }
  //}
  if(year >=2017){
    buttonNextY.style().set({shown:false});
    buttonNextGrid.style().set({shown:true});
    buttonNextGrid;
  }
  },
  style: {
     //margin: '0px 0px 0px 15px',
  }
});
var selectCompY = selectComp(pastureMap[0],pastureMap[1],year,checkPastureMap.getValue());
var panelComp = ui.Panel({
  widgets: [labelComp,selectCompY],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-center',
    padding: '7px'
  }
});
var labelFDate = ui.Label('Tempo de Filtragem da Série');
labelFDate.style().set('margin', '15px 0px 0px 0px');
var dateFilters = {
'2 Anos (Mapbiomas)': '2Y',
'1 ano': '1Y',
'1º Trimestre': '1T',
'2º Trimestre': '2T',
'3º Trimestre': '3T',
'4º Trimestre': '4T'
};
var selectDate = function(map,mapPast,year) {
  //var colorComp = 'False';
  var Date = ui.Select({
  items: Object.keys(dateFilters),
  value: '2 Anos (Mapbiomas)',
  onChange: function(key) {
    TS_Date = dateFilters[key];
    imageCollection(map, year,colorComp,0,idFeat,TS_Date);
    imageCollection(mapPast, year,colorComp,0,idFeat,TS_Date);
  },
    style:{stretch: 'horizontal'},
  });
  return Date;
};
var selectDateF = selectDate(pastureMap[0], pastureMap[1],year);
var panelFDate = ui.Panel({
  widgets: [labelFDate,selectDateF],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-center',
    padding: '3px'
  }
});
var panelJumpW = ui.Panel({
  widgets:[buttonCenterView,buttonNextY,buttonNextGrid],
  layout: ui.Panel.Layout.Flow('horizontal'),
  style:{
    //position: 'bottom-left',
    //padding: '0px 0px 0px 0px',
    //border: '2px solid black'
    }
  ,});
var panelgridInfo = ui.Panel(
  [//labelGridHeader,
  labelGridNumber,panelChangeFID,labelGridCoords,
  labelPastPerc,
  labelGridOmission,selectPercentOmi,
  labelGridComission,selectPercentCom,
  labelGridInterDif,selectGridInterDif,
  labelGridSpatCon,selectGridSpatCon,
  labelObs,textObs,
  labelConfPasture,checkConfAgri,checkConfUrb,checkConfVeg,checkBadMosaic,
  labelOtherConfigs,checkPastureMap,checkGridMinor,
  panelComp,panelFDate,panelJumpW]);
panelgridInfo.style().set({
  width: '20%',
  position: 'top-right'
});
var mapGrid = ui.Panel([pastureMap[0],pastureMap[1],panelgridInfo],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
pastureMap[0].onChangeZoom(function(){imageCollection(pastureMap[0], year,colorComp,0,idFeat,TS_Date)});
pastureMap[1].onChangeZoom(function(){imageCollection(pastureMap[1], year,colorComp,0,idFeat,TS_Date);
if(checkPastureMap.getValue()===true){plotPasture(pastureMap[0], pastureMap[1],year,idFeat)}});
// Enable zooming on the top-left map.
pastureMap[0].setControlVisibility({zoomControl: true, fullscreenControl:true});
pastureMap[1].setControlVisibility({zoomControl: true, fullscreenControl:true});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
};
//var plot = ee.Geometry.LinearRing([
// The placemark variable has an array called shape that contains the locations of the corners of the polygon
//[104.02598152553826, 12.484863520596718],[104.02662547524402, 12.484863519828016],[104.02662547524402, 12.48423075824283],[104.02598152553826, 12.484230759011533],[104.02598152553826, 12.484863520596718],]);
//var gridFt = ee.FeatureCollection('ft:1MAw6gVj4P82DdyyTlDJOpOmHJElH2OMQ-in9dfRz');
var gridFt = ee.FeatureCollection('ft:1LG6UOmUWguNON_oax1cw_snAoXyVVoLBAw3BOg76'); //PADRÃO - 210 grids
var inspetor = 'ADMIN'
//var gridFt = ee.FeatureCollection('ft:1YdKAy-jPbhsOGJFzjT8VbgM8gIdqq_mEPEqJwiQf') //ANA_MATOS - 70 Grids
//var inspetor = 'ana_matos'
//var gridFt = ee.FeatureCollection('ft:1P9fimkvp_rV0MSvnKckiUuJlVek9-uqdsyZbnKxp') //FLÁVIA_BATISTA - 70 Grids
//var inspetor = 'flavia_batista'
//var gridFt = ee.FeatureCollection('ft:1JIJBWRwbfVVL62GrDiFfuYK0_dNlxgWdQrmGc0jC') //VINICIUS_MESQUITA - 70 Grids
//var inspetor = 'vinicius_mesquita'
//var plot = ee.Geometry.LinearRing([[-47.91598152553826, -15.784863520596718],[-47.91662547524402, -15.784863519828016],[-47.91662547524402, -15.78423075824283],[-47.91598152553826, -15.784230759011533],[-47.91598152553826, -15.784863520596718],]);
processPlotInfo(gridFt);