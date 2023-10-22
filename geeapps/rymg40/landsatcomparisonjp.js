/******************************************************************************
 * Purpos : Comparison of 2 periods LANDSAT data
 * DataSet : Google Earthe Engine LANDSAT data Catalog
 *           https://developers.google.com/earth-engine/datasets/catalog/landsat?hl=en
 * Auther : FutureBase R.Yamaguchi
 * update : 2022-06-24
 *****************************************************************************/
var lastEdit = '2022-10-18'
// Initial map Location
Map.setCenter(137.225691, 36.973971,8);
/*****  MAPS SETTING. *****/
// Create map panels.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Configure UI controls for both maps.
leftMap.setControlVisibility({fullscreenControl:false});
rightMap.setControlVisibility({fullscreenControl:false});
leftMap.setCenter(137.225691, 36.973971,8);
rightMap.setCenter(137.225691, 36.973971,8);
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    orientation: 'horizontal',
    wipe: true
});
// Add these to the interface.
ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
/*                          */
/**** LANDSAT DISPLAY Function*******/
/*                          */
// Applies scaling factors.
function applyScaleFactors89(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
// Applies scaling factors.
function applyScaleFactors75(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}
// Cloud mask
function prepSrL8(image) {
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var getFactorImg = function(factorNames) {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var scaleImg = getFactorImg([
    'REFLECTANCE_MULT_BAND_.|TEMPERATURE_MULT_BAND_ST_B10']);
  var offsetImg = getFactorImg([
    'REFLECTANCE_ADD_BAND_.|TEMPERATURE_ADD_BAND_ST_B10']);
  var scaled = image.select('SR_B.|ST_B10').multiply(scaleImg).add(offsetImg);
  // Replace original bands with scaled bands and apply masks.
  return image.addBands(scaled, null, true)
    .updateMask(qaMask).updateMask(saturationMask);
}
// LANDSAT image data draw to MAP.
var leftInfo = ui.Panel();
var rightInfo = ui.Panel();
var comparisonLANDSAT = function() { // Draw LANDSAT Data to MAP
  // param data get from UI
  var point = leftMap.getCenter();
  //print(point);
  //  left side
  var lefLandsat = filterLandsatType1.TARGET_LANDSAT.getValue();
  var leftStartTime = filterTime1.START_DATE.getValue();
  var leftEndTime = filterTime1.END_DATE.getValue();
  // right side
  var rightLandsat = filterLandsatType2.TARGET_LANDSAT.getValue();
  var rightStartTime = filterTime2.START_DATE.getValue();
  var rightEndTime = filterTime2.END_DATE.getValue();
  var makeRectangle = function(point, xDistance, yDistance, proj){
                        var geometry =
                        ee.Geometry.Rectangle(
                        [point[0] - xDistance,
                         point[1] - yDistance,
                         point[0] + xDistance,
                         point[1] + yDistance], proj, false);
                        return geometry
                     }
  //print(point)
  var xDistance = 100000;
  var yDistance = 100000;
  var rectangle = makeRectangle(point, xDistance, yDistance,'EPSG:32632')
  //print(rectangle);
  leftMap.centerObject(point,10) // 2022-07-04
  //leftMap.setCenter(Map.getCenter())
  //rightMap.setCenter(Map.getCenter())
  // Target data information.
  leftMap.remove(leftInfo);
  leftInfo = ui.Panel({
    // Change word from "REFERENCE" to "BEFORE" on 2021.01.04
    widgets:[ui.Label('期間: ' + lefLandsat ,{fontWeight:'bold',fontSize:'24px',margin:'0px'}),
             ui.Label(leftStartTime+' ～ '+ leftEndTime,{fontSize:'24px',margin:'0px'})],
    layout:'flow',
    style:{textAlign:'left',position:'bottom-left',border:'5px solid black',margin:'0px'}
  })
  leftMap.add(leftInfo);
  rightMap.remove(rightInfo);
  rightInfo = ui.Panel({
    // Change word from "TARGET" to "AFTER" on 2021.01.04
    widgets:[ui.Label('期間: ' + rightLandsat,{fontWeight:'bold',fontSize:'24px',margin:'0px'}),
             ui.Label(rightStartTime +' ～ '+ rightEndTime,{fontSize:'24px',margin:'0px'})],
    layout:'flow',
    style:{textAlign:'right',position:'bottom-right',border:'5px solid black',margin:'0px'}
  });
  rightMap.add(rightInfo);
  // Draw left map 2022/07/01
  switch(lefLandsat) {
    case 'LANDSAT1':
      initial_startDate = ee.Date('1972-07-26');
      initial_endDate = ee.Date('1978-01-06');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT2':
      initial_startDate = ee.Date('1975-01-31');
      initial_endDate = ee.Date('1982-02-03');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT3':
      initial_startDate = ee.Date('1978-06-03');
      initial_endDate = ee.Date('1983-02-23');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'ランドサット4':
      var dataset1 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                           min: 0.0,
                           max: 0.3,
                         };
    break;
    case 'ランドサット5':
      var dataset1 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
    break;
    case 'ランドサット7':
      var dataset1 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
    break;
    case 'ランドサット8':
      var dataset1 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                           min: 0.0,
                           max: 0.3,
                          };
    break;
    case 'ランドサット9':
      var dataset1 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                       bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                       min: 0.0,
                       max: 0.3,
                      };
    break;
  }
  leftMap.addLayer(dataset1, visualization, lefLandsat);
  // Draw right map 2022/07/01
  switch(rightLandsat) {
    case 'LANDSAT1':
      initial_startDate = ee.Date('1972-07-26');
      initial_endDate = ee.Date('1978-01-06');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT2':
      initial_startDate = ee.Date('1975-01-31');
      initial_endDate = ee.Date('1982-02-03');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT3':
      initial_startDate = ee.Date('1978-06-03');
      initial_endDate = ee.Date('1983-02-23');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'ランドサット4':
      var dataset2 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                           min: 0.0,
                           max: 0.3,
                         };
      break;
    case 'ランドサット5':
      var dataset2 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
      break;
    case 'ランドサット7':
      var dataset2 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                           min: 0.0,
                           max: 0.3,
                          };
    break;
    case 'ランドサット8':
      var dataset2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                         bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                         min: 0.0,
                         max: 0.3,
                        };
    break;
    case 'ランドサット9':
      var dataset2 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                         bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                         min: 0.0,
                         max: 0.3,
                        };
    break;
  }
  rightMap.addLayer(dataset2, visualization, rightLandsat);
  //ui.root.widgets().insert(0,mainPanel);
}
// Function for Apply button.
var getOutput = function () {
  // Remove input commands panel.
  //ui.root.remove(mainPanel);
  // Call functions.
  //var point2 = Map.getCenter();
  //print(point2);
  comparisonLANDSAT();
};
//+++++++++++ Main Panel ++++++++++++++++++++/
// Configure UI controls for LANDSAT processing.
// Add time filter .
var initial_startDate = ee.Date('2019-01-01');
var initial_endDate = ee.Date('2019-12-31');
Map.setControlVisibility({fullscreenControl:true});
// Add a title and some explanatory text to the main panel.
var header = ui.Label({
                     value: 'ランドサット画像比較',
                     style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 8px'}});
var version = ui.Label({
                     value: ' バージョン ('+lastEdit+')',
                     style: {fontSize:'12px',color:'Red',margin:'0px 8px'}});
var mainPanel = ui.Panel([header, version], 'flow', {width:'350',padding:'8px',border:'5px solid black'});
ui.root.widgets().insert(0,mainPanel);
// Legend LANDSAT data
var landsat_legend_panel = ui.Panel({
     widgets: [
      ui.Label({value : 'ランドサット号数　　　 開始日　　　終了日',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Blue',margin:'0px 8px'}
               }),
      //ui.Label({value : 'LANDSAT 1　　　1972-07-26 1978-01-06',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      //ui.Label({value : 'LANDSAT 2　　　1975-01-31 1982-02-03',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      //ui.Label({value : 'LANDSAT 3　　　1978-06-03 1983-02-23',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      ui.Label({value : 'ランドサット 4　　　　1982-08-22 1993-06-24',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'ランドサット 5　　　　1984-03-16 2012-05-05',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'ランドサット 7　　　　1999-05-28 2022-04-06',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'ランドサット 8　　　　2013-03-18 運用中',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'ランドサット 9　　　　2021-10-31 運用中',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
     ]
});
landsat_legend_panel.style().set({border: '5px solid darkgray'});
mainPanel.add(landsat_legend_panel);
// Select LANDSAT type
// Add target area filter.
//var targetLANDSAT_list = ['LANDSAT9', 'LANDSAT8', 'LANDSAT7', 'LANDSAT5', 'LANDSAT4', 'LANDSAT3', 'LANDSAT2', 'LANDSAT1'];
var targetLANDSAT_list1 = ['ランドサット4', 'ランドサット5', 'ランドサット7', 'ランドサット8', 'ランドサット9'];
var targetLANDSAT_list2 = ['ランドサット9', 'ランドサット8', 'ランドサット7', 'ランドサット5', 'ランドサット4'];
var filterLandsatType1 = {
    TARGET_LANDSAT: ui.Select({
      items: targetLANDSAT_list1,
      placeholder:  'ランドサット選択...',
      onChange: function(value) { // SET date term
        switch(value) {
          case 'LANDSAT1':
            initial_startDate = ee.Date('1972-07-26');
            initial_endDate = ee.Date('1978-01-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT2':
            initial_startDate = ee.Date('1975-01-31');
            initial_endDate = ee.Date('1982-02-03');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT3':
            initial_startDate = ee.Date('1978-06-03');
            initial_endDate = ee.Date('1983-02-23');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット4':
            initial_startDate = ee.Date('1982-08-22');
            initial_endDate = ee.Date('1993-06-24');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット5':
            initial_startDate = ee.Date('1984-03-16');
            initial_endDate = ee.Date('2012-05-05');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット7':
            initial_startDate = ee.Date('1999-05-28');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット8':
            initial_startDate = ee.Date('2013-03-18');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット9':
            initial_startDate = ee.Date('2021-10-31');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
        }
      }
    })
  };
  var filterTargetLANDSAT_panel1 = ui.Panel({
      widgets: [
        ui.Label('① ランドサットを選択', {fontWeight: 'bold'}),
        ui.Panel([
          ui.Label('ランドサット号数:'), filterLandsatType1.TARGET_LANDSAT
        ], ui.Panel.Layout.flow('horizontal')),
      ]
    });
  mainPanel.add(filterTargetLANDSAT_panel1);
var text = ui.Label('Fill in Target Term Start and End.' ,{fontWeight: 'bold',color:'Gray'});
// STRAT and END
var filterTime1 = {
     START_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_startDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
     END_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_endDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
   };
var filterTime_panel1 = ui.Panel({
     widgets: [
       ui.Label('② 開始、終了日の入力', {fontWeight: 'bold'}),
       ui.Panel([
         ui.Label('開始：年月日 :'), filterTime1.START_DATE
       ], ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
         ui.Label('終了：年月日  :'), filterTime1.END_DATE
       ], ui.Panel.Layout.flow('horizontal')),]});
mainPanel.add(filterTime_panel1);
var separator = ui.Label('++++++++++++++++++++++++++++++++++++++' ,{fontWeight: 'bold',color:'Gray'});
mainPanel.add(separator);
var filterLandsatType2 = {
    TARGET_LANDSAT: ui.Select({
      items: targetLANDSAT_list2,
      placeholder:  'ランドサット選択...',
      onChange: function(value) { // SET date term
        switch(value) {
          case 'LANDSAT1':
            initial_startDate = ee.Date('1972-07-26');
            initial_endDate = ee.Date('1978-01-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT2':
            initial_startDate = ee.Date('1975-01-31');
            initial_endDate = ee.Date('1982-02-03');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT3':
            initial_startDate = ee.Date('1978-06-03');
            initial_endDate = ee.Date('1983-02-23');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット4':
            initial_startDate = ee.Date('1982-08-22');
            initial_endDate = ee.Date('1933-06-24');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット5':
            initial_startDate = ee.Date('1984-03-16');
            initial_endDate = ee.Date('2012-05-05');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット7':
            initial_startDate = ee.Date('1999-05-28');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット8':
            initial_startDate = ee.Date('2013-03-18');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
          case 'ランドサット9':
            initial_startDate = ee.Date('2021-10-31');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
        }
      }
    })
  };
  var filterTargetLANDSAT_panel2 = ui.Panel({
      widgets: [
        ui.Label('③ 比較するランドサット', {fontWeight: 'bold'}),
        ui.Panel([
          ui.Label('ランドサット号数:'), filterLandsatType2.TARGET_LANDSAT
        ], ui.Panel.Layout.flow('horizontal')),
      ]
    });
  mainPanel.add(filterTargetLANDSAT_panel2);
var text = ui.Label('Fill in Target Term Start and End.' ,{fontWeight: 'bold',color:'Gray'});
// Add time filter .
//var initial_startDate = ee.Date('2019-01-01');
//var initial_endDate = ee.Date('2019-12-31');
// STRAT and END
var filterTime2 = {
     START_DATE: ui.Textbox({
       placeholder: '年-月-日',
       value: initial_startDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
     END_DATE: ui.Textbox({
       placeholder: '年-月-日',
       value: initial_endDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
   };
var filterTime_panel2 = ui.Panel({
     widgets: [
       ui.Label('④ 開始、終了日の入力', {fontWeight: 'bold'}),
       ui.Panel([
         ui.Label('開始：年月日:'), filterTime2.START_DATE
       ], ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
         ui.Label('終了：年月日:'), filterTime2.END_DATE
       ], ui.Panel.Layout.flow('horizontal')),]});
mainPanel.add(filterTime_panel2);
/********** SECTION D : Apply button configuration. **********/
// Add apply button.
var applyButton = {
    clickRun: ui.Button({
      label: '実行',
      style: {border: '1px solid black',
              height: '30px',
              width: '100px',
      },
      onClick: getOutput,
  }),
};
var applyButton_panel = ui.Panel({
    widgets:[
      ui.Panel([
        ui.Label('実行ボタンを押し、システムを動作させる', {fontWeight: 'bold'}),
        applyButton.clickRun,
      ]),
    ]
  });
mainPanel.add(applyButton_panel);