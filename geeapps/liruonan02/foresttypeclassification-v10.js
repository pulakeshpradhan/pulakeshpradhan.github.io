/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var L1_test = ee.FeatureCollection("users/liruonan02/forestTypeClassification/sample/L1_test"),
    L1_train = ee.FeatureCollection("users/liruonan02/forestTypeClassification/sample/L1_train"),
    L2_test = ee.FeatureCollection("users/liruonan02/forestTypeClassification/sample/L2_test"),
    L2_train = ee.FeatureCollection("users/liruonan02/forestTypeClassification/sample/L2_train"),
    XGLL = ee.FeatureCollection("users/liruonan02/forestTypeClassification/ROI/region_XGLL"),
    mask_L1 = ee.Image("users/liruonan02/forestTypeClassification/sample/L1_mask"),
    forest2010 = ee.Image("users/liruonan02/forestTypeClassification/otherForestProducts/forest2010"),
    fromglc2015 = ee.Image("users/liruonan02/forestTypeClassification/otherForestProducts/fromglc2015"),
    glc_fcs2015_L2 = ee.Image("users/liruonan02/forestTypeClassification/otherForestProducts/glc_fcs2015_L2"),
    glc_fcs2020_L2 = ee.Image("users/liruonan02/forestTypeClassification/otherForestProducts/glc_fcs2020_L2"),
    mcd12q1 = ee.Image("users/liruonan02/forestTypeClassification/otherForestProducts/mcd12q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**===============================require========================================== **/
var preProcess = require("users/liruonan02/App:ForestTypeClassification/Function/a_preProcess.js");
var minCloudImgSelect = require("users/liruonan02/App:ForestTypeClassification/Function/b_minCloudImgSelect.js");
var l8SR_seasonImg = require("users/liruonan02/App:ForestTypeClassification/Function/c_seasonImg.js");
var seasonImgCol = require("users/liruonan02/App:ForestTypeClassification/Function/d_seasonImgCol.js");
var classify = require("users/liruonan02/App:ForestTypeClassification/Function/e_classify.js");
var confuMat = require("users/liruonan02/App:ForestTypeClassification/Function/f_confusionMatrix.js");
var dataAccess = require("users/liruonan02/App:ForestTypeClassification/Function/a_dataAccess.js");
/**===============================app========================================== **/
var app = {};
app.createHelpers = function(){
  app.setLoadingMode = function(enabled) {
        // Set each of the widgets to the given enabled mode.
        var loadDependentWidgets = [
            app.roi.select,
            app.dateFilter.startDate,
            app.dateFilter.endDate,
            app.dateFilter.applyButton,
            app.feaPicker.Ref.select,
            app.feaPicker.VI.select,
            app.RFclass.classifyRF.button,
            app.show.showCompositeRef,
            app.show.showCompositeVI,
            app.show.showClassifyResult,
            app.show.showFeaImpS,
            app.show.showConfMatrix,
        ];
        loadDependentWidgets.forEach(function(widget) {
            widget.setDisabled(enabled);
        });
    };
  app.applyCompositeImg = function(){
      app.setLoadingMode(true);
      var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
      var start = app.dateFilter.startDate.getValue();
      if (start) start = ee.Date(start);
      var end = app.dateFilter.endDate.getValue();
      if (end) end = ee.Date(end);
      var bandsCol = seasonImgCol.main(region,start,end,"bands","median");
      var indexCol = seasonImgCol.main(region,start,end,"index","median");
      //get season list:[spring,summer,autumn,winter]
      var computedIds = bandsCol.reduceColumns(ee.Reducer.toList(), ['season'])
                              .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.feaPicker.Ref.select.items().reset(ids);
      app.feaPicker.VI.select.items().reset(ids);
      // Default the image picker to the first id.
      app.feaPicker.Ref.select.setValue(app.feaPicker.Ref.select.items().get(0));
      app.feaPicker.VI.select.setValue(app.feaPicker.VI.select.items().get(0));
    });
    return bandsCol.merge(indexCol);
  }
  app.getFeature = function(){
    var refImg = [];
    var viImg = [];
    var seasonRef = app.feaPicker.Ref.select.getValue();
    var seasonVI = app.feaPicker.VI.select.getValue();
    if (app.feaPicker.Ref.applyAll.getValue() && app.feaPicker.VI.applyAll.getValue()){
      print('-------------------all ref and all vi-------------------------')
      refImg = app.applyCompositeImg().filterMetadata('setName','equals', "bands")
                                      .toBands();
      viImg = app.applyCompositeImg().filterMetadata('setName','equals', "index")
                                      .toBands();
    } 
    else if (app.feaPicker.Ref.applyAll.getValue()){
      print('-------------------all ref and 1-vi-------------------------')
      refImg = app.applyCompositeImg().filterMetadata('setName','equals', "bands")
                                      .toBands();
      viImg = app.applyCompositeImg().filterMetadata('setName','equals', "index")
                                     .filterMetadata('season','equals', seasonVI)
                                     .first();
    }
    else if (app.feaPicker.VI.applyAll.getValue()){
      print('-------------------1-ref and all vi-------------------------')
      refImg = app.applyCompositeImg().filterMetadata('setName','equals', "bands")
                                        .filterMetadata('season','equals', seasonRef)
                                        .first();
      viImg = app.applyCompositeImg().filterMetadata('setName','equals', "index")
                                      .toBands();
    }
    else{
      refImg = app.applyCompositeImg().filterMetadata('setName','equals', "bands")
                                      .filterMetadata('season','equals', seasonRef)
                                      .first();
      viImg = app.applyCompositeImg().filterMetadata('setName','equals', "index")
                                      .filterMetadata('season','equals', seasonVI)
                                      .first();
    }
    // select Ref VI
    var classImg = ee.Image([refImg,viImg]);
    /***************** environment factors ********************************/
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    var start = app.dateFilter.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.dateFilter.endDate.getValue();
    if (end) end = ee.Date(end);
    var terrain = dataAccess.DEM(region);
    var preci = dataAccess.monthPrecip(region);
    var temp = dataAccess.monthTemperatureMean(start,end,region);
    if(app.feaPicker.applyDEM.getValue()) classImg = classImg.addBands(terrain);
    if(app.feaPicker.applyTemp.getValue()) classImg = classImg.addBands(temp);
    if(app.feaPicker.applyPrecip.getValue()) classImg = classImg.addBands(preci);
    var bands = classImg.bandNames();
    // print(bands);
    return classImg;
  }
  /** classify and visualization*/
  function appImgShow(imgCol, mapNames, region, vis, legend) {
    var maps = [];
    var options = {fullscreenControl: true,mapTypeControl:false,zoomControl: false,layerList:true};
    var seasonBands = ['spring', 'summer', 'autumn', 'winter'];
    seasonBands.forEach(function(name,index){
      var map = ui.Map();
      map.centerObject(region,6);
      map.setControlVisibility(options);
      maps.push(map)
    })
    var linker = ui.Map.Linker(maps);
    var mapGrid = ui.Panel(
            [
              ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
              ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
            ],
            ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
        );
    maps.forEach(function(value,index) {
            var str = mapNames[index]; 
            var lab_style = {fontWeight:'bold', fontSize :10, color:'red'};
            maps[index].widgets().set(index, ui.Label(str, lab_style));
            var season = seasonBands[index]
            var img = imgCol.filterMetadata('season', 'equals',season).first()
            var layer = ui.Map.Layer(img, vis, mapNames[index]);
            maps[index].layers().set(index, layer);
            // Paint all the polygon edges with the same number and width, display.
            var empty = ee.Image().byte();
            var outline = empty.paint({featureCollection: region,color:'pink',width:1});
            maps[index].addLayer(outline,{},'ROI');
        });
      maps[0].add(legend)
      ui.root.widgets().set(1, mapGrid);
    }
  var addColor = function(color, name) {
        // Create the label that is actually the colored box.
        var colorBox = ui.Label({style: {backgroundColor: color,padding: '9px',margin: '1 0 4px 0'}});
        // Create the label filled with the description text.
        var description = ui.Label({value:name,style: {margin: '0 0 4px 6px' }});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
    };
  app.classifyRF = function(){
    //==========classify================
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    var mask = app.mask_OPTIONS.L1;
    var train = app.sample_OPTIONS.L2.trainSample;
    var classImg = app.getFeature();
    classImg = classImg.updateMask(mask.eq(2)).clipToCollection(region);
    var nTree = app.nTree_OPTIONS[app.RFclass.nTree.select.getValue()].n;
    var minLeaf = app.minLeaf_OPTIONS[app.RFclass.minLeaf.select.getValue()].m;
    var classResult = classify.RF(classImg,train,region,nTree,minLeaf).rename("classification");
    app.RFclass.classifyRF.label.setValue('Classification is finished!')
    return classResult;
  }
  app.showCompositeRef = function(){
        Map.clear();
        app.result.panel.clear();
        var bandsCol = app.applyCompositeImg().filterMetadata('setName','equals', "bands");
        var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
        var legend = ui.Panel({style: {position: 'bottom-left',padding: '8px 15px'}});
        legend.add(addColor('red','SWIR1')).add(addColor('green','NIR'))
              .add(addColor('blue','Red'))
        var visRef = {bands:['swir1','nir','red'],min:0.3,max:2,gamma:0.3};
        var mapNames = ['(a)Ref_Spring', '(b)Ref_Summer', '(c)Ref_Autumn', '(d)Ref_Winter'];
        appImgShow(bandsCol, mapNames, region, visRef, legend)
  }
  app.showCompositeVI = function(){
        Map.clear();
        app.result.panel.clear();
        var indexCol = app.applyCompositeImg().filterMetadata('setName','equals', "index").select('NDVI');
        var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
        //==========legend===============
        var lc_names = ['0.2','','','','','','','','0.8'];
        var lc_colors=['ffffe5','f7fcb9','d9f0a3','addd8e','78c679','41ab5d','238443','006837','004529'];
        var legend = ui.Panel({style: {position: 'bottom-left',padding: '8px 15px'}});
        legend.add(addColor('ffffe5','0.2')).add(addColor('f7fcb9','')).add(addColor('d9f0a3','')).add(addColor('addd8e',''))
              .add(addColor('78c679','')).add(addColor('41ab5d','')).add(addColor('238443','')).add(addColor('006837','')).add(addColor('004529','0.8'))
        var vis_VI = {min:0.2,max: 0.8, palette: lc_colors};
        var mapNames = ['(a)NDVI_Spring', '(b)NDVI_Summer', '(c)NDVI_Autumn', '(d)NDVI_Winter'];
        appImgShow(indexCol, mapNames, region, vis_VI, legend)
  }
  app.showClassifyResult = function(){
    Map.clear();
    app.result.panel.clear();
    var map = ui.Map();
    ui.root.widgets().set(1,map);
    var forest_names = ['ENF',  'DNF','EBF', 'DBF', 'MF'];
    var forest_colors=['097611','26a916','8dff10','fbff0e','ff9c21'];
    var vis = {min: 1,max: 5, palette: forest_colors};
    var legend = ui.Panel({style: {position: 'bottom-left',padding: '8px 15px'}});
    legend.add(addColor('097611','ENF')).add(addColor('26a916','DNF'))
          .add(addColor('8dff10','EBF')).add(addColor('fbff0e','DBF'))
          .add(addColor('ff9c21','MF'));
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    var classResult = app.classifyRF();
    map.add(ui.Label('Classification Result'))
        .add(legend);
    map.centerObject(region, 7);
    map.addLayer(region, {}, 'ROI');
    map.addLayer(classResult,vis,'classification Result');
    print("finished")
  }
  app.showFeaImpS = function(){
    var _trainImg = app.getFeature();
    var bands = _trainImg.bandNames();
    //==========classify================
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    var mask = app.mask_OPTIONS.L1;
    var train = app.sample_OPTIONS.L2.trainSample;
    var test = app.sample_OPTIONS.L2.testSample;
    var training = _trainImg.sampleRegions({
      collection: train,
      properties: ['class'], 
      scale: 30,
      tileScale :16
    });
  _trainImg = _trainImg.updateMask(mask.eq(2)).clipToCollection(region);
  var classifier = ee.Classifier.smileRandomForest({numberOfTrees:200,minLeafPopulation:3,})
                    .train({features: training,classProperty:'class',inputProperties:bands})
                    .explain();
    // get featureImportance score list
  var variable_importance = ee.Feature(null, ee.Dictionary(classifier).get('importance'));
  var chart =
  ui.Chart.feature.byProperty(variable_importance)
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Feature Importance Score',
      legend: {position: 'none'},
      hAxis: {title: 'features'},
      vAxis: {title: 'Importance Score'}
    });
  chart.style().set({
           textAlign:'center',
               position:'top-center',
               fontFamily:'serif',
               fontSize:'16px',
               fontWeight:'bold',
      width: '400px',
      height: '250px'
    });
  app.result.panel.clear().add(chart)
  return variable_importance;
  }
  app.showConfMatrix = function(){
    var classResult = app.classifyRF();
    var test = app.sample_OPTIONS.L2.testSample;
    //caculate confusionMatrix
    var validData = classResult.sampleRegions({
      collection: test, 
      properties: ['class'],
      scale: 30});
    var confuMatrix = validData.errorMatrix('class', 'classification');
    var errorMatrix = confuMatrix.array();
    errorMatrix = errorMatrix.slice(0,1,6)
    errorMatrix = errorMatrix.slice(1,1,6)
    print(errorMatrix)
    var UA = confuMatrix.consumersAccuracy().project([1]);
    var PA = confuMatrix.producersAccuracy().project([0]);
    var Kappa = confuMatrix.kappa();
    var OA = confuMatrix.accuracy();
    PA = ee.Array(PA.slice(0,1,6));
    UA = ee.Array(UA.slice(0,1,6));
    var PA_value = ee.Array([[PA.get([0]),PA.get([1]),PA.get([2]),PA.get([3]),PA.get([4])]]).multiply(100);
    var UA_value = ee.Array([[UA.get([0]),PA.get([1]),UA.get([2]),UA.get([3]),UA.get([4])]]).multiply(100);
    var array = ee.Array.cat([errorMatrix,PA_value,UA_value],0);
    var chart = ui.Chart.array.values(array,0, ["ENF","DNF",'EBF','DBF','MF','PA(%)','UA(%)'])
              .setSeriesNames(["ENF","DNF",'EBF','DBF','MF'])
              .setChartType("Table")
              .setOptions({
                title: 'matrix',
                vAxis: {title: "predicted value"},
                hAxis: {title: 'true value'}
                });
    chart.style().set({stretch: 'both'});
     var titleLabel1 = ui.Label({
        value:'Confusion Matrix',
        style:{textAlign:'center',
               width:'300px',
               position:'top-center',
               fontFamily:'serif',
               fontSize:'16px',
               fontWeight:'bold'}
    });
    var titleLabel2 = ui.Label({
        value:'True Classes',
        style:{textAlign:'center',
               width:'300px',
               position:'top-center',
               fontFamily:'serif',
               fontWeight:'bold'}
    });
     var label = ui.Panel({
        widgets: [
          ui.Panel([
            ui.Label({value:'Kappa',
                      style:{textAlign:'center',position:'top-center'}}),
            ui.Label({value:ee.Number(Kappa).float().format("%.3f").getInfo()}),
                      ],
            ui.Panel.Layout.flow('horizontal')),
          ui.Panel([
            ui.Label({value:'OA(%)',style:{textAlign:'center',position:'top-center'}}),
            ui.Label({value:ee.Number.parse(ee.Number(OA).multiply(100).format("%.2f")).getInfo()}),],
            ui.Panel.Layout.flow('horizontal'))
        ],
        style: app.SECTION_STYLE
    })
    app.result.panel.clear().add(titleLabel1).add(titleLabel2).add(chart).add(label)
    var id = classResult.getString('id');
    var accuracyTable =ee.FeatureCollection([
    ee.Feature(null,{
      "errorMatrix":errorMatrix,
      "UA": UA,
      "PA": PA,
      "KAP":Kappa,
      "OA": OA,
    }).set("id",id)]);
    return accuracyTable;
  }
  /**compare */
  app.compare = function(){
    app.result.panel.clear();
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    var forest_names = ['ENF',  'DNF','EBF', 'DBF', 'MF'];
    var forest_colors=['097611','26a916','8dff10','fbff0e','ff9c21'];
    var vis = {min: 1,max: 5, palette: forest_colors};
    var legend = ui.Panel({style: {position: 'bottom-left',padding: '8px 15px'}});
    legend.add(addColor('097611','ENF')).add(addColor('26a916','DNF'))
          .add(addColor('8dff10','EBF')).add(addColor('fbff0e','DBF'))
          .add(addColor('ff9c21','MF'));
    var maps = [];
    var options = {all:false,fullscreenControl: true,mapTypeControl:false,zoomControl: false,layerList:true};
    var product_OPTIONS = {
      'This study':{classification:app.classifyRF()},
      'Forest2010':{classification:forest2010},
      'FROMGLC2015':{classification:fromglc2015},
      'GLC_FCS2015':{classification:glc_fcs2015_L2},
      'GLC_FCS2020':{classification:glc_fcs2020_L2},
      'MCD12Q1':{classification:mcd12q1.select('mcd12_2017')}
      }
    var productName = Object.keys(product_OPTIONS)
    productName.forEach(function(name,index){
      var map = ui.Map();
      map.centerObject(region,6);
      map.setControlVisibility(options);
      maps.push(map);
    });
    var linker = ui.Map.Linker(maps);
    var mapGrid = ui.Panel(
            [
              ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
              ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
              ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
            ],
            ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
        );
    maps.forEach(function(value,index) {
            var str = productName[index]; 
            var lab_style = {fontWeight:'bold', fontSize :10, color:'red'};
            maps[index].widgets().set(index, ui.Label(str, lab_style));
            var name = productName[index]
            var img = product_OPTIONS[name].classification;
            var layer = ui.Map.Layer(img, vis, productName[index]);
            maps[index].layers().set(index, layer);
            // Paint all the polygon edges with the same number and width, display.
            var empty = ee.Image().byte();
            var outline = empty.paint({featureCollection: region,color:'pink',width:1});
            maps[index].addLayer(outline,{},'ROI');
        });
      maps[0].add(legend)
      ui.root.widgets().set(1, mapGrid);
  }
  /** export **/
  app.exportComposite = function(){
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    //export composite
    var seasonRef = app.feaPicker.Ref.select.getValue();
    var refImg = app.applyCompositeImg().filterMetadata('setName','equals', "bands")
                                        .filterMetadata('season','equals', seasonRef)
                                        .first();
        Export.image.toDrive({
      image: refImg.clipToCollection(region),
      description: 'Composite_Ref_'+app.img_OPTIONS[seasonRef].description,
      scale: 30,
      region: region,
      crs:'EPSG:4326'
      });
    var seasonVI = app.feaPicker.VI.select.getValue();
    var viImg = app.applyCompositeImg().filterMetadata('setName','equals', "index")
                                        .filterMetadata('season','equals', seasonVI)
                                        .first();
        Export.image.toDrive({
      image: viImg.clipToCollection(region),
      description: 'Composite_VI_'+app.img_OPTIONS[seasonVI].description,
      scale: 30,
      region: region,
      crs:'EPSG:4326'
      });
  }
  app.exportFeaImpS = function (){
    var chart = app.showFeaImpS();
    Export.table.toDrive({
    collection: chart,
    description: "featureImportanceScore",
    fileFormat:'CSV'
  });
  }
  app.exportClassification = function(){
    var classResult = app.classifyRF();
    var region = app.ROI_OPTIONS[app.roi.select.getValue()].roi;
    // Palette 
    var classResultParams = {
        min: 1,
       max: 5,
        palette: ['097611','26a916','8dff10','fbff0e','ff9c21']
    }
    Export.image.toDrive({
      image: classResult.clipToCollection(region).visualize(classResultParams),
      description: 'classification result',
      scale: 30,
      region: region,
      crs:'EPSG:4326'
      });
  }
  app.exportConfusionMatrix = function(){
    var confusionMatrix = app.showConfMatrix();
    Export.table.toDrive({
    collection: confusionMatrix,
    description: "confusionMatrix",
    fileFormat:'CSV'
  });
  }
}
app.createPanels = function(){
  /** **/
    app.intro = {
        panel: ui.Panel([
            ui.Label({
                value: 'Forest Type Classification Apps',
                style: {
                    fontWeight: 'bold',
                    fontSize: '20px',
                    margin: '5px 5px 1px 5px',
                    textAlign:'center',
                    position:'top-center',
                    color:'red',
                    shown: true
                }
            }),
            ui.Label('This app allows you to apply median-based multi-seasonal image composite method to classify forest types.',
            {fontSize: '12px',color:'grey',fontFamily:'serif'})
        ])
    };
    app.roi = {
        label: ui.Label(),
        // Create a select with a function that reacts to the "change" event.
        select: ui.Select({
            items: Object.keys(app.ROI_OPTIONS),
            placeholder:'Select area of study...',
            onChange: function() {
                // Update the label's value with the select's description.
                var option = app.ROI_OPTIONS[app.roi.select.getValue()];
                app.roi.label.setValue(option.description);
            }
        })
    }
    app.roi.panel = ui.Panel({
        widgets: [
            ui.Label({value:'1. Please Select a Study Area (case in Shangri-La)',style:app.labelStyle}),
            app.roi.select,
        ],
        style: app.SECTION_STYLE
    })
    app.roi.select.setValue(app.roi.select.items().get(0));
    app.dateFilter = {
        startDate: ui.Textbox('YYYY-MM-DD', '2017-01-01',app.HELPER_TEXT_STYLE),
        endDate: ui.Textbox('YYYY-MM-DD', '2017-12-31',app.HELPER_TEXT_STYLE),
        applyButton: ui.Button('Generate Four Seasonal Composites', app.applyCompositeImg),
        loadingLabel: ui.Label({
            value: 'Loading...',
            style: {
                stretch: 'vertical',
                color: 'gray',
                shown: false
            }
        })};
    app.dateFilter.panel = ui.Panel({
        widgets: [
            ui.Label({value:'2. Filter images and generate four seasonal composites',style:app.labelStyle}),
            ui.Panel([ui.Label('Start date', app.HELPER_TEXT_STYLE),app.dateFilter.startDate,],ui.Panel.Layout.flow('horizontal')),
            ui.Panel([ui.Label('End date', app.HELPER_TEXT_STYLE),app.dateFilter.endDate,],ui.Panel.Layout.flow('horizontal')),
            ui.Panel([ui.Label('Apply filter and image composite *', app.HELPER_TEXT_STYLE),
                      app.dateFilter.applyButton,app.dateFilter.loadingLabel],ui.Panel.Layout.flow('vertical')),
        ],
        style: app.SECTION_STYLE
    });
    app.feaPicker = {
      Ref:{
        label:ui.Label(),
        select:ui.Select({
          placeholder:'Select composite Ref',
          onChange:function(){
            var imageId = app.feaPicker.Ref.select.getValue();
            app.feaPicker.Ref.label.setValue(app.img_OPTIONS[imageId].description);
          }}),
        applyAll:ui.Checkbox({label:'Select all seasonal spectral composites',value:false,style:app.HELPER_TEXT_STYLE}),
      },
      VI:{
        label:ui.Label(),
        select:ui.Select({
          placeholder:'Select composite VI',
          onChange:function(){
            var imageId = app.feaPicker.VI.select.getValue();
            app.feaPicker.VI.label.setValue(app.img_OPTIONS[imageId].description);
          }}),
        applyAll:ui.Checkbox({label:'Select all seasonal VI composites',value:false,style:app.HELPER_TEXT_STYLE}),
      },
      applyDEM : ui.Checkbox({label:'Terrian(Elevation/Slope/Aspect)',value:false,style:app.HELPER_TEXT_STYLE}),
      applyTemp: ui.Checkbox({label:'Temperature',value:false,style:app.HELPER_TEXT_STYLE}),
      applyPrecip: ui.Checkbox({label:'Precipitation',value:false,style:app.HELPER_TEXT_STYLE}),
      // classifyButton: ui.Button({label:'Classify using RF classifier',onClick:function(){app.classifyRF();}}),
      }
    app.feaPicker.panel = ui.Panel({
      widgets:[
        ui.Label({value:'3. Feature Selection for classification',style:app.labelStyle}),
        ui.Panel([ui.Label('Spectral Composite Image',app.HELPER_TEXT_STYLE),app.feaPicker.Ref.select,],ui.Panel.Layout.flow('horizontal')),
        ui.Panel([ui.Label('VI Composite Image',app.HELPER_TEXT_STYLE),app.feaPicker.VI.select,],ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.feaPicker.Ref.applyAll,app.feaPicker.VI.applyAll,app.feaPicker.applyDEM,app.feaPicker.applyTemp,app.feaPicker.applyPrecip],ui.Panel.Layout.flow('vertical')),
        // ui.Panel([app.feaPicker.applyDEM,app.feaPicker.applyTemp,app.feaPicker.applyPrecip],ui.Panel.Layout.flow('vertical')),
      ],
      style:{margin:'5px 2px 1px 1px',fontFamily:'monospace',position:'middle-left',height:'210px'}
    })
    app.RFclass = {
      nTree:{
        label:ui.Label(),
        select:ui.Select({
          items:Object.keys(app.nTree_OPTIONS),
          onChange:function(){
            var option = app.nTree_OPTIONS[app.RFclass.nTree.select.getValue()];
            app.RFclass.nTree.label.setValue(option.description);
          }
          })
      },
      minLeaf:{
        label:ui.Label(),
        select:ui.Select({
          items:Object.keys(app.minLeaf_OPTIONS),
          onChange:function(){
            var option = app.minLeaf_OPTIONS[app.RFclass.minLeaf.select.getValue()];
            app.RFclass.minLeaf.label.setValue(option.description);
          }
          })
      },
      classifyRF:{
        label:ui.Label(),
        button:ui.Button({label:'RF classifier',onClick:function(){app.classifyRF();}}),
      }
    }
    app.RFclass.panel = ui.Panel({
      widgets:[
        ui.Label({value:'4. Random Forest classification',style:app.labelStyle}),
        ui.Panel([
                ui.Label('nTree', app.HELPER_TEXT_STYLE), app.RFclass.nTree.select,
                ui.Label('minLeaf', app.HELPER_TEXT_STYLE), app.RFclass.minLeaf.select,
            ], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([ui.Label('Classify *', app.HELPER_TEXT_STYLE),
          app.RFclass.classifyRF.button,app.RFclass.classifyRF.label],ui.Panel.Layout.flow('horizontal'))
        ],
      style:app.SECTION_STYLE
    })
    app.RFclass.nTree.select.setValue(app.RFclass.nTree.select.items().get(0));
    app.RFclass.minLeaf.select.setValue(app.RFclass.minLeaf.select.items().get(0));
     /*** visulaization**/
    app.show = {
       showCompositeRef:ui.Button({label:'Spectral Reflectance Composite',onClick:function(){app.showCompositeRef();}}),
       showCompositeVI:ui.Button({label:'VI Composite',onClick:function(){app.showCompositeVI();}}),
       showClassifyResult:ui.Button({label:'Classification Result',onClick:function(){app.showClassifyResult();}}),
       showFeaImpS:ui.Button({label:'Feature Importance Score',onClick:function(){app.showFeaImpS();}}),
       showConfMatrix:ui.Button({label:'Confusion Matrix',onClick:function(){app.showConfMatrix();}})
     }
    app.show.panel = ui.Panel({
       widgets:[
         ui.Label({value:'5. Display Classification Result and Composites',style:app.labelStyle}),
         ui.Label({value:'Show classification result',style:app.HELPER_TEXT_STYLE}),
         app.show.showClassifyResult,
         ui.Label({value:'ENF means evergreen needleleaf forest; DNF means deciduous needleleaf forest; EBF means ever-green broadleaf forest; DBF means deciduous broadleaf forest; MF means mixed forest',
                   style:{fontSize:'12px',color:'grey',fontFamily:'serif'}}),
         ui.Label({value:'Show Seasonal Spectral Composites',style:app.HELPER_TEXT_STYLE}),
         app.show.showCompositeRef,
         ui.Label({value:'Show Seasonal VI Composites',style:app.HELPER_TEXT_STYLE}),
         app.show.showCompositeVI,
         ui.Label({value:'Show Feature Importance Score',style:app.HELPER_TEXT_STYLE}),
         app.show.showFeaImpS,
         ui.Label({value:'Show Confusion Matrix',style:app.HELPER_TEXT_STYLE}),
         app.show.showConfMatrix,
         ],
       style:app.SECTION_STYLE,
     })
    app.result = {}
    app.result.panel = ui.Panel({
      style: {position: 'bottom-left'}});
    /** Compare with other five public products**/
    app.compareResult = {
      compare:ui.Button({label:'Show other public products',onClick:function(){app.compare();}})
    }
    app.compareResult.panel = ui.Panel({
      widgets:[
        ui.Label({value:'6. Comparisons to Other Products',style:app.labelStyle}),
        app.compareResult.compare,
        ],
      style:app.SECTION_STYLE
    })
    /** export **/
    app.export = {
      buttonComposite:ui.Button({label:'Multi-seasonal Composites',onClick:function(){app.exportComposite();}}),
      buttonClassify:ui.Button({label:'Classification Result',onClick:function(){app.exportClassification();}}),
      buttonConfMatrix:ui.Button({label:'Confusion Matrix', onClick:function(){app.exportConfusionMatrix();}}),
      }
    app.export.panel = ui.Panel({
      widgets:[
        ui.Label({value:'7. Export',style:app.labelStyle}),
        ui.Label({value:'(This function is only available in Earth Engine Coder Editor.)',
                  style:{fontSize:'12px',color:'grey',fontFamily:'serif'}}),
        ui.Label({value:'Export Seasonal Composites',style:app.HELPER_TEXT_STYLE}),
        app.export.buttonComposite,
        ui.Label({value:'Export Classification Result',style:app.HELPER_TEXT_STYLE}),
        app.export.buttonClassify,
        ui.Label({value:'Export Confusion Matrix',style:app.HELPER_TEXT_STYLE}),
        app.export.buttonConfMatrix,
        ],
      style:app.SECTION_STYLE
    })
}
app.createConstants = function(){
  app.labelStyle = {
        margin: '1px 10px 1px 10px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold'
        };
  app.SECTION_STYLE = {
                  // border:'1px solid black', 
                  margin:'5px 2px 1px 1px',
                  fontFamily:'monospace',
                  position:'middle-left',
};
  app.ROI_OPTIONS = {
        'XGLL': {nameR: 'XGLL',abre: 'XGLL',roi: XGLL}
    };
  app.mask_OPTIONS = {L1:mask_L1};
  app.sample_OPTIONS = {
    L1:{trainSample:L1_train,testSample:L1_test},
    L2:{trainSample:L2_train,testSample:L2_test},
  }
  app.img_OPTIONS = {
    'spring':{description:'spring'},
    'summer':{description:'summer'},
    'autumn':{description:'autumn'},
    'winter':{description:'winter'},
  };
  app.nTree_OPTIONS = {
    '100':{description:'Using 100 nTrees',n:100},
    '200':{description:'Using 200 nTrees',n:200},
    '300':{description:'Using 300 nTrees',n:300},
    '500':{description:'Using 500 nTrees',n:500},
  };
  app.minLeaf_OPTIONS = {
    '1':{description:'Using 1 minLeaf',m:1},
    '3':{description:'Using 3 minLeaf',m:3},
    '5':{description:'Using 5 minLeaf',m:5},
    '7':{description:'Using 7 minLeaf',m:7},
  }; 
  app.HELPER_TEXT_STYLE = {
        margin: '5px 0 0 5px',
        fontSize: '12px',
        color: 'black',
        // fontWeight:'bold'
    };
}
/** Creates the application interface. **/
app.boot = function() {
    app.createConstants();
    app.createHelpers();
    app.createPanels();
    var main = ui.Panel({
        widgets: [
            app.intro.panel,
            app.roi.panel,
            app.dateFilter.panel,
            app.feaPicker.panel,
            app.RFclass.panel,
            app.show.panel,
            app.compareResult.panel,
            app.export.panel,
        ],
        style:{width:'30%',border:'1px solid black',fontFamily:'monospace',position:'middle-left'},
    });
    var result = ui.Panel({style:{position:'middle-left'}});
    result.add(app.result.panel)
    Map.setCenter(99, 29, 7);
    ui.root.insert(0, main);
    ui.root.add(result)
};
app.boot();