var imageCollection = ee.ImageCollection("MODIS/006/MOD09GQ");
var cultivated = ee.Image('USDA/NASS/CDL/2019').select(['cultivated']);
var emergedThreshold = 0.5; // .45
var doySpan=14; 
var doyStep=14;
var classScale = 30;
var now = Date.now();
var end = ee.Date(now).format();
var YYYY = 2020; 
var doyEnd=1;
var RoI="blank";
var emergedShown=false;
var stateName = ' ';
var countyName = ' ';
var listCounties = ' ';
var stateFIPS = ' ';
var countyFIPS = ' ';
var TIGER18States = ee.FeatureCollection("TIGER/2018/States")
.map(function(feature){
    var num = ee.Number.parse(feature.get('DIVISION'));
    return feature.set('DIVISION', num);
  })
.map(function(feature){
    var num = ee.Number.parse(feature.get('STATEFP'));
    return feature.set('STATEFP', num);
  });
var listCONUS = TIGER18States.filter(ee.Filter.gt('DIVISION',0));
var listStates = listCONUS.aggregate_array("NAME").sort().getInfo(); 
var TIGER18Counties = ee.FeatureCollection("TIGER/2018/Counties")
.map(function(feature){
    var num = ee.Number.parse(feature.get('COUNTYFP'));
    return feature.set('COUNTYFP', num);
  })
.map(function(feature){
    var num = ee.Number.parse(feature.get('STATEFP'));
    return feature.set('STATEFP', num);
  });
var listCounties = TIGER18Counties.aggregate_array("NAME").sort().getInfo();
var emergedYYYYaCultivated = "blank";
var emergedYYYYbCultivated = "blank";
var emergedYYYYcCultivated = "blank";
var emergedXXXXaCultivated = "blank";
var emergedXXXXbCultivated = "blank";
var emergedXXXXcCultivated = "blank";
var MAP_ARRAY = {'A': [],'B': [], 'C': [], 'AA': [],'BB': [], 'CC': []};
var maps = [];
Object.keys(MAP_ARRAY).forEach(function(name) {
  var map = ui.Map();
  map.setControlVisibility(false,false,true,true,false,true);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
var ndviParams = {min: 0.2, max: 0.8, palette:['663300','EAEAAE','93DB70','2F4F2F']};
var ndviRamp = ['663300','EAEAAE','93DB70','2F4F2F'];
/////////////////////
function runIt(){
maps[0].clear();
maps[0].setControlVisibility(false,false,true,true,false,true);
maps[1].clear();
maps[1].setControlVisibility(false,false,true,true,false,true);
maps[2].clear();
maps[2].setControlVisibility(false,false,true,true,false,true);
maps[3].clear();
maps[3].setControlVisibility(false,false,true,true,false,true);
maps[4].clear();
maps[4].setControlVisibility(false,false,true,true,false,true);
maps[5].clear();
maps[5].setControlVisibility(false,false,true,true,false,true);
var doyStart=doyEnd.getInfo()-(doyStep*3)+1;
var doyAs=doyStart;
var doyAe=doyAs+doySpan-1;
var doyBs=doyAs+doyStep;
var doyBe=doyAe+doyStep;
var doyCs=doyBs+doyStep;
var doyCe=doyBe+doyStep;
var MMDDs='-01-01';
var MMDDe='-12-31';
var selectCounty = TIGER18Counties.filter(ee.Filter.and(
  ee.Filter.eq('STATEFP', stateFIPS),
  ee.Filter.eq('NAME', countyName)
));
var region = selectCounty;
var collectionArea = imageCollection.filterBounds(region); 
var YYMMDDs = YYYY.format().cat(MMDDs);
var YYMMDDe = YYYY.format().cat(MMDDe);
var Y1MMDDs = YYYY.subtract(1).format().cat(MMDDs);
var Y1MMDDe = YYYY.subtract(1).format().cat(MMDDe);
var Y2MMDDs = YYYY.subtract(2).format().cat(MMDDs);
var Y2MMDDe = YYYY.subtract(2).format().cat(MMDDe);
var Y3MMDDs = YYYY.subtract(3).format().cat(MMDDs);
var Y3MMDDe = YYYY.subtract(3).format().cat(MMDDe);
var Y4MMDDs = YYYY.subtract(4).format().cat(MMDDs);
var Y4MMDDe = YYYY.subtract(4).format().cat(MMDDe);
var Y5MMDDs = YYYY.subtract(5).format().cat(MMDDs);
var Y5MMDDe = YYYY.subtract(5).format().cat(MMDDe);
var collectionYYYYa = collectionArea.filterDate(YYMMDDs, YYMMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYYYb = collectionArea.filterDate(YYMMDDs, YYMMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYYYc = collectionArea.filterDate(YYMMDDs, YYMMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var collectionYYm1a = collectionArea.filterDate(Y1MMDDs, Y1MMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYm1b = collectionArea.filterDate(Y1MMDDs, Y1MMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYm1c = collectionArea.filterDate(Y1MMDDs, Y1MMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var collectionYYm2a = collectionArea.filterDate(Y2MMDDs, Y2MMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYm2b = collectionArea.filterDate(Y2MMDDs, Y2MMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYm2c = collectionArea.filterDate(Y2MMDDs, Y2MMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var collectionYYm3a = collectionArea.filterDate(Y3MMDDs, Y3MMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYm3b = collectionArea.filterDate(Y3MMDDs, Y3MMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYm3c = collectionArea.filterDate(Y3MMDDs, Y3MMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var collectionYYm4a = collectionArea.filterDate(Y4MMDDs, Y4MMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYm4b = collectionArea.filterDate(Y4MMDDs, Y4MMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYm4c = collectionArea.filterDate(Y4MMDDs, Y4MMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var collectionYYm5a = collectionArea.filterDate(Y5MMDDs, Y5MMDDe).filter(ee.Filter.calendarRange(doyAs, doyAe, 'day_of_year')); 
var collectionYYm5b = collectionArea.filterDate(Y5MMDDs, Y5MMDDe).filter(ee.Filter.calendarRange(doyBs, doyBe, 'day_of_year')); 
var collectionYYm5c = collectionArea.filterDate(Y5MMDDs, Y5MMDDe).filter(ee.Filter.calendarRange(doyCs, doyCe, 'day_of_year')); 
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI');
  return image.addBands(ndvi);
};
var YYYYaNDVI = collectionYYYYa.map(addNDVI);
var YYYYbNDVI = collectionYYYYb.map(addNDVI);
var YYYYcNDVI = collectionYYYYc.map(addNDVI);
var YYm1aNDVI = collectionYYm1a.map(addNDVI);
var YYm1bNDVI = collectionYYm1b.map(addNDVI);
var YYm1cNDVI = collectionYYm1c.map(addNDVI);
var YYm2aNDVI = collectionYYm2a.map(addNDVI);
var YYm2bNDVI = collectionYYm2b.map(addNDVI);
var YYm2cNDVI = collectionYYm2c.map(addNDVI);
var YYm3aNDVI = collectionYYm3a.map(addNDVI);
var YYm3bNDVI = collectionYYm3b.map(addNDVI);
var YYm3cNDVI = collectionYYm3c.map(addNDVI);
var YYm4aNDVI = collectionYYm4a.map(addNDVI);
var YYm4bNDVI = collectionYYm4b.map(addNDVI);
var YYm4cNDVI = collectionYYm4c.map(addNDVI);
var YYm5aNDVI = collectionYYm5a.map(addNDVI);
var YYm5bNDVI = collectionYYm5b.map(addNDVI);
var YYm5cNDVI = collectionYYm5c.map(addNDVI);
var greenestYYYYa = YYYYaNDVI.qualityMosaic('NDVI');
var greenestYYYYb = YYYYbNDVI.qualityMosaic('NDVI');
var greenestYYYYc = YYYYcNDVI.qualityMosaic('NDVI');
var greenestYYm1a = YYm1aNDVI.qualityMosaic('NDVI');
var greenestYYm1b = YYm1bNDVI.qualityMosaic('NDVI');
var greenestYYm1c = YYm1cNDVI.qualityMosaic('NDVI');
var greenestYYm2a = YYm2aNDVI.qualityMosaic('NDVI');
var greenestYYm2b = YYm2bNDVI.qualityMosaic('NDVI');
var greenestYYm2c = YYm2cNDVI.qualityMosaic('NDVI');
var greenestYYm3a = YYm3aNDVI.qualityMosaic('NDVI');
var greenestYYm3b = YYm3bNDVI.qualityMosaic('NDVI');
var greenestYYm3c = YYm3cNDVI.qualityMosaic('NDVI');
var greenestYYm4a = YYm4aNDVI.qualityMosaic('NDVI');
var greenestYYm4b = YYm4bNDVI.qualityMosaic('NDVI');
var greenestYYm4c = YYm4cNDVI.qualityMosaic('NDVI');
var greenestYYm5a = YYm5aNDVI.qualityMosaic('NDVI');
var greenestYYm5b = YYm5bNDVI.qualityMosaic('NDVI');
var greenestYYm5c = YYm5cNDVI.qualityMosaic('NDVI');
var stackXXXXa_NDVI = ee.ImageCollection([greenestYYm1a.select('NDVI'),greenestYYm2a.select('NDVI'),greenestYYm3a.select('NDVI'),greenestYYm4a.select('NDVI'),greenestYYm5a.select('NDVI')]);
var stackXXXXb_NDVI = ee.ImageCollection([greenestYYm1b.select('NDVI'),greenestYYm2b.select('NDVI'),greenestYYm3b.select('NDVI'),greenestYYm4b.select('NDVI'),greenestYYm5b.select('NDVI')]);
var stackXXXXc_NDVI = ee.ImageCollection([greenestYYm1c.select('NDVI'),greenestYYm2c.select('NDVI'),greenestYYm3c.select('NDVI'),greenestYYm4c.select('NDVI'),greenestYYm5c.select('NDVI')]);
var meanGreenestXXXXa = stackXXXXa_NDVI.mean();
var meanGreenestXXXXb = stackXXXXb_NDVI.mean();
var meanGreenestXXXXc = stackXXXXc_NDVI.mean();
function dateFromDOY(year, doy){
  var date = new Date(year, 0); 
  return new Date(date.setDate(doy)); 
}
var dateAs = dateFromDOY(YYYY.getInfo(),doyAs);
var dateAsMM = dateAs.getMonth()+1;
var dateAsDD = dateAs.getDate()+1-1;
var dateAe = dateFromDOY(YYYY.getInfo(),doyAe);
var dateAeMM = dateAe.getMonth()+1;
var dateAeDD = dateAe.getDate()+1-1;
var dateBs = dateFromDOY(YYYY.getInfo(),doyBs);
var dateBsMM = dateBs.getMonth()+1;
var dateBsDD = dateBs.getDate()+1-1;
var dateBe = dateFromDOY(YYYY.getInfo(),doyBe);
var dateBeMM = dateBe.getMonth()+1;
var dateBeDD = dateBe.getDate()+1-1;
var dateCs = dateFromDOY(YYYY.getInfo(),doyCs);
var dateCsMM = dateCs.getMonth()+1;
var dateCsDD = dateCs.getDate()+1-1;
var dateCe = dateFromDOY(YYYY.getInfo(),doyCe);
var dateCeMM = dateCe.getMonth()+1;
var dateCeDD = dateCe.getDate()+1-1;
maps[0].centerObject(region);
maps[0].add(ui.Label(YYYY.getInfo()+": "+dateAsMM+"/"+dateAsDD+" - "+dateAeMM+"/"+dateAeDD,{position:'top-center', fontWeight: 'bold'}));
maps[1].add(ui.Label(YYYY.getInfo()+": "+dateBsMM+"/"+dateBsDD+" - "+dateBeMM+"/"+dateBeDD,{position:'top-center', fontWeight: 'bold'}));
maps[2].add(ui.Label(YYYY.getInfo()+": "+dateCsMM+"/"+dateCsDD+" - "+dateCeMM+"/"+dateCeDD,{position:'top-center', fontWeight: 'bold'}));
maps[3].add(ui.Label("Prior 5-year Average",{position:'top-center', fontWeight: 'bold'}));
maps[4].add(ui.Label("Prior 5-year Average",{position:'top-center', fontWeight: 'bold'}));
maps[5].add(ui.Label("Prior 5-year Average",{position:'top-center', fontWeight: 'bold'}));
var cropmask = cultivated.eq(2);
var greenestYYYYaCultivated = greenestYYYYa.updateMask(cropmask);
var greenestYYYYbCultivated = greenestYYYYb.updateMask(cropmask);
var greenestYYYYcCultivated = greenestYYYYc.updateMask(cropmask);
var meanGreenestXXXXaCultivated = meanGreenestXXXXa.updateMask(cropmask);
var meanGreenestXXXXbCultivated = meanGreenestXXXXb.updateMask(cropmask);
var meanGreenestXXXXcCultivated = meanGreenestXXXXc.updateMask(cropmask);
emergedYYYYaCultivated = greenestYYYYaCultivated.select('NDVI').gt(emergedThreshold).selfMask();
emergedYYYYbCultivated = greenestYYYYbCultivated.select('NDVI').gt(emergedThreshold).selfMask();
emergedYYYYcCultivated = greenestYYYYcCultivated.select('NDVI').gt(emergedThreshold).selfMask();
emergedXXXXaCultivated = meanGreenestXXXXaCultivated.select('NDVI').gt(emergedThreshold).selfMask();
emergedXXXXbCultivated = meanGreenestXXXXbCultivated.select('NDVI').gt(emergedThreshold).selfMask();
emergedXXXXcCultivated = meanGreenestXXXXcCultivated.select('NDVI').gt(emergedThreshold).selfMask();
maps[0].addLayer(greenestYYYYaCultivated.select('NDVI'), ndviParams, 'NDVI image');
maps[1].addLayer(greenestYYYYbCultivated.select('NDVI'), ndviParams, 'NDVI image');
maps[2].addLayer(greenestYYYYcCultivated.select('NDVI'), ndviParams, 'NDVI image');
maps[3].addLayer(meanGreenestXXXXaCultivated.select('NDVI'), ndviParams, 'NDVI image');
maps[4].addLayer(meanGreenestXXXXbCultivated.select('NDVI'), ndviParams, 'NDVI image');
maps[5].addLayer(meanGreenestXXXXcCultivated.select('NDVI'), ndviParams, 'NDVI image');
var blank1 = ee.Image(0).mask(0);
var region1 = blank1.paint(region, 'ff00ff', 2); 
maps[0].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
maps[1].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
maps[2].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
maps[3].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
maps[4].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
maps[5].addLayer(region1, {'palette': 'ff00ff','opacity': 0.5},"study region",1);
return(region);
}
///////////////////////////////
function showEmerged(){
var emergedParams = {min: 0, max: 1, palette: ['red', 'red']};
if (emergedShown){
  var layers0 = maps[0].layers();
  var layers1 = maps[1].layers();
  var layers2 = maps[2].layers();
  var layers3 = maps[3].layers();
  var layers4 = maps[4].layers();
  var layers5 = maps[5].layers();
  var layer0_2 = layers0.get(2);
  var layer1_2 = layers1.get(2);
  var layer2_2 = layers2.get(2);
  var layer3_2 = layers3.get(2);
  var layer4_2 = layers4.get(2);
  var layer5_2 = layers5.get(2);
  layers0.remove(layer0_2);
  layers1.remove(layer1_2);
  layers2.remove(layer2_2);
  layers3.remove(layer3_2);  
  layers4.remove(layer4_2);  
  layers5.remove(layer5_2);  
  emergedShown = false
} else {
  maps[0].addLayer(emergedYYYYaCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  maps[1].addLayer(emergedYYYYbCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  maps[2].addLayer(emergedYYYYcCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  maps[3].addLayer(emergedXXXXaCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  maps[4].addLayer(emergedXXXXbCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  maps[5].addLayer(emergedXXXXcCultivated.clip(RoI),emergedParams, "Emerged", 1, .75);
  emergedShown = true
}
}
/////////////////////////////
function calcPercent(){
var widgets0 = maps[0].widgets();
var widgets1 = maps[1].widgets();
var widgets2 = maps[2].widgets();
var widgets3 = maps[3].widgets();
var widgets4 = maps[4].widgets();
var widgets5 = maps[5].widgets();
var widget0_1 = widgets0.get(1);
var widget1_1 = widgets1.get(1);
var widget2_1 = widgets2.get(1);
var widget3_1 = widgets3.get(1);
var widget4_1 = widgets4.get(1);
var widget5_1 = widgets5.get(1);
widgets0.remove(widget0_1);
widgets1.remove(widget1_1);
widgets2.remove(widget2_1);
widgets3.remove(widget3_1); 
widgets4.remove(widget4_1);
widgets5.remove(widget5_1);
// Calculate acreage below
// Some issues with scaling when less than ~60 or less and timing out. tileScale seems to help. 
function getArea(crop,classification,roi){
  var cover = classification.eq(crop);
  var classificationMask = classification.updateMask(cover);
  var areaImage = classificationMask.multiply(ee.Image.pixelArea().divide(10000).divide(crop).multiply(2.471));
  var stats = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: roi,
    scale: classScale,
    maxPixels: 1e15,
    bestEffort:false,
    tileScale:2
  });
  return(stats);
}
var percentLabel0 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[0].add(percentLabel0);
var percentLabel1 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[1].add(percentLabel1);
var percentLabel2 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[2].add(percentLabel2);
var percentLabel3 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[3].add(percentLabel3);
var percentLabel4 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[4].add(percentLabel4);
var percentLabel5 = ui.Label("calculating % area...",{position:'bottom-center'});
maps[5].add(percentLabel5);
var region=RoI;
var cultivatedArea = getArea (2,cultivated,region);
var cultivatedAreaNum = cultivatedArea.get("cultivated");
var YYYYaEmergedArea = getArea (1,emergedYYYYaCultivated,region);
var YYYYbEmergedArea = getArea (1,emergedYYYYbCultivated,region);
var YYYYcEmergedArea = getArea (1,emergedYYYYcCultivated,region);
var XXXXaEmergedArea = getArea (1,emergedXXXXaCultivated,region);
var XXXXbEmergedArea = getArea (1,emergedXXXXbCultivated,region);
var XXXXcEmergedArea = getArea (1,emergedXXXXcCultivated,region);
var YYYYaEmergedAreaNum = YYYYaEmergedArea.get("NDVI");
var YYYYbEmergedAreaNum = YYYYbEmergedArea.get("NDVI");
var YYYYcEmergedAreaNum = YYYYcEmergedArea.get("NDVI");
var XXXXaEmergedAreaNum = XXXXaEmergedArea.get("NDVI");
var XXXXbEmergedAreaNum = XXXXbEmergedArea.get("NDVI");
var XXXXcEmergedAreaNum = XXXXcEmergedArea.get("NDVI");
var YYYYaEmergedPercent = ee.Number(YYYYaEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
var YYYYbEmergedPercent = ee.Number(YYYYbEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
var YYYYcEmergedPercent = ee.Number(YYYYcEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
var XXXXaEmergedPercent = ee.Number(XXXXaEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
var XXXXbEmergedPercent = ee.Number(XXXXbEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
var XXXXcEmergedPercent = ee.Number(XXXXcEmergedAreaNum).multiply(100).divide(ee.Number(cultivatedAreaNum));
YYYYaEmergedPercent.evaluate(function(result){
  percentLabel0.setValue(Math.round(result)+"% verdant");
});
YYYYbEmergedPercent.evaluate(function(result){
  percentLabel1.setValue(Math.round(result)+"% verdant");
});
YYYYcEmergedPercent.evaluate(function(result){
  percentLabel2.setValue(Math.round(result)+"% verdant");
});
XXXXaEmergedPercent.evaluate(function(result){
  percentLabel3.setValue(Math.round(result)+"% verdant");
});
XXXXbEmergedPercent.evaluate(function(result){
  percentLabel4.setValue(Math.round(result)+"% verdant");
});
XXXXcEmergedPercent.evaluate(function(result){
  percentLabel5.setValue(Math.round(result)+"% verdant");
});
}
////////////
var legendNDVI = ui.Panel({
  style: {position: 'bottom-right'}
});
var legendTitleNDVI = ui.Label({
  value: 'Normalized Difference Vegetation Index',
  style: {fontWeight: 'bold', fontSize: '12px'}
});
legendNDVI.add(legendTitleNDVI);
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0.2,
    max: 0.8,
    palette: ndviRamp
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ndviParams),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legendNDVI.add(colorBar);
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(.2, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'}),
    ui.Label(
        ((.8 + .2) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px'}),
    ui.Label(.8, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legendNDVI.add(legendLabels);
var NASSlabel = ui.Label({
    value: 'NASS Cropland Verdancy Viewer',
    style: {fontSize: '16px', fontWeight: 'bold', padding: '6px 0 0 0', margin:'0', color: "#003082"}
});
var demoLabel = ui.Label({
    value: doySpan+'-day cadence',
    style: {fontSize: '12px', padding: '9px 0px 0 0', margin:'0', color: "#005440", fontWeight: 'bold'}
});
var centerDivider = ui.Label({
    value: ' ',
    style: {color: 'd3d3d3', fontSize: '16px', padding: '6px 10px 0 10px', margin:'0'}
});
var stateLabel = ui.Label({
    value: 'State:',
    style: {fontSize: '12px', padding: '9px 6px 0 0', margin:'0', fontWeight: 'bold'}
});
var countyLabel = ui.Label({
    value: 'County:',
    style: {fontSize: '12px', padding: '9px 6px 0 0', margin:'0', fontWeight: 'bold'}
});  
var stateSelect = ui.Select({
  items: listStates,
  placeholder: "Choose state...",
  style: {padding: '6px 0 0 0', margin: '0px', width: '150px'},
  onChange:function(key) {
    stateName = key;
    updateCounty();
    calcButton.setDisabled(true);
    emergedButton.setDisabled(true)
    countySelect.setDisabled(false);
}});
var countySelect = ui.Select({
  items: listCounties,
  placeholder: "Choose county...",
  style: {padding: '6px 0 0 0', margin: '0px', width: '150px'},
  disabled: true,
  onChange:function(key) {
    countyName = key;
    calcButton.setDisabled(true);
    emergedButton.setDisabled(true);
}});
function updateCounty(){
  var selectState = TIGER18States.filter(ee.Filter.eq('NAME',stateName));
  stateFIPS = selectState.first().get('STATEFP');
  var stateTIGER18Counties = TIGER18Counties.filter(ee.Filter.eq('STATEFP',stateFIPS));
  listCounties = stateTIGER18Counties.aggregate_array("NAME").sort().getInfo();
  countySelect.items().reset(listCounties);
}
 var selectDate = ui.Label({
    value: 'Analysis End Date:',
    style: {fontSize: '12px', padding: '9px 6px 0 0', margin:'0', fontWeight: 'bold'}
}); 
var startSlider = imageCollection.first().date().format();
var dateSlider = ui.DateSlider({
    start: startSlider.getInfo(),
    end: now,
    onChange: function(range) {
      YYYY = range.start().get('year').add(0);
      doyEnd = range.start().getRelative('day', 'year').add(1)
      updateButton.setDisabled();
      calcButton.setDisabled(true);
      emergedButton.setDisabled(true);
    }
  });
var blankLabel1 = ui.Label({
    value: ' ',
    style: {fontSize: '12px', padding: '9px 0px 0 0', margin:'0', color: "#005440"}
});
var updateButton = ui.Button({
  label: 'Go To County-Dates',
  style: {padding: '0px 0 0 0', margin: '0px', width: '150px'},
  disabled: true, 
  onClick: function() {
    RoI = runIt();
    calcButton.setDisabled();
    emergedButton.setDisabled();
  }
});
var blankLabel2 = ui.Label({
    value: ' ',
    style: {fontSize: '12px', padding: '9px 0px 0 0', margin:'0', color: "#005440"}
});
var emergedButton = ui.Button({
  label: 'Show Verdant Cropland',
  style: {padding: '0px 0 0 0', margin: '0px', width: '150px'},
  disabled: true,
  onClick: function() {
   showEmerged();
  }
})
var blankLabel3 = ui.Label({
    value: ' ',
    style: {fontSize: '12px', padding: '9px 0px 0 0', margin:'0', color: "#005440"}
});
var blankLabel4 = ui.Label({
    value: ' ',
    style: {fontSize: '12px', padding: '63px 0px 0 0', margin:'0', color: "#005440"}
});
var blankLabel5 = ui.Label({
    value: ' ',
    style: {fontSize: '12px', padding: '9px 0px 0 0', margin:'0', color: "#005440"}
});
var calcButton = ui.Button({
  label: 'Calculate % Verdant',
  style: {padding: '0px 0 0 0', margin: '0px', width: '150px', color: '2F4F2F'},
  disabled: true,
  onClick: function() {
   calcPercent()
  }
})
var legendVerdant = ui.Panel({
  style: { position: 'bottom-left', padding: '6px 9px'}
});
var makeLine = function(color, name) {
  var colorBox = ui.Label({
    style: { backgroundColor: '#' + color , height: '3px', width: '12px' , margin: '6px 0px 3px 0px'}
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0px 0px 3px 6px',fontSize: '11px', fontWeight: 'bold',position: 'top-center' }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: { backgroundColor: '#' + color, padding: '6px',  margin: '0 0 4px 0'  }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 3px 6px',fontSize: '11px', fontWeight: 'bold' }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legendVerdant.add(makeLine('ff00ff', 'County Boundary'));
legendVerdant.add(makeRow('ffffff', ''));
legendVerdant.add(makeRow('FF0000', 'Verdant Cropland'));
var infoPanel = ui.Panel({
  widgets: [NASSlabel, demoLabel, centerDivider, stateLabel, stateSelect, countyLabel, countySelect, selectDate, dateSlider, blankLabel1, updateButton, blankLabel2, emergedButton, blankLabel3, calcButton, blankLabel4, legendVerdant, blankLabel5, legendNDVI],
  layout: ui.Panel.Layout.flow('vertical'),
  style: { padding: '10px'},
})
var wrapper = ui.Panel({
  widgets: [infoPanel],
  layout: ui.Panel.Layout.absolute(),
  style: {width: '170px', backgroundColor: "#005440", padding: "10px"},
})
var mapGrid = ui.Panel(
    [
  ui.Panel([maps[0],maps[3]] , null, {stretch: 'both', border:'2px solid black'}),
  ui.Panel([maps[1],maps[4]] , null, {stretch: 'both', border:'2px solid black'}),
  ui.Panel([maps[2],maps[5]] , null, {stretch: 'both', border:'2px solid black'}),
    ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
ui.root.widgets().reset([mapGrid]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.insert(1, wrapper);