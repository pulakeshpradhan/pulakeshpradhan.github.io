// S2_SplitPanel
// Sentinel-2画像検索・植生指数オーバーレイSplitPanel
var app = {}; //空のオブジェクト生成
var linkedMap = ui.Map(); // 分割パネルの右側マップ
// UIパネル作成開始
app.createPanels = function() {
  // 検索条件指定パネル
  app.filters = {
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0 0 0 6em'},
    }),
    dataSetSelect: ui.Select({
      items: Object.keys(app.dataset),
      onChange: function(key) {
        var dOption = app.dataset[key];
        app.imgCollection = 
          ee.ImageCollection(dOption.name);
        app.dataStartYear = dOption.startYear;
        app.setYear();
      },
      style: app.WIDGETS_STYLE,
    }),
    sArea: ui.Select({
      items: Object.keys(app.places),
      placeholder: '地域選択',
      onChange: function(key) {
        Map.setCenter(app.places[key][0], app.places[key][1], 10);
      },
      style: app.WIDGETS_STYLE,
    }),
    geoButton: ui.Button({
      label: '現在地',
      onClick: function() {
        ui.util.getCurrentPosition(
          function(position) {
            Map.centerObject(position,14);
          }
        );
      },
      style: app.WIDGETS_STYLE,
    }),
    selectYear: ui.Select({
      placeholder: '年選択',
      style: app.WIDGETS_STYLE
      }),
    selectMonth: ui.Select({
      placeholder: '月選択',
      style: app.WIDGETS_STYLE
      }),
    selectYear2: ui.Select({
      placeholder: '年選択',
      style: app.WIDGETS_STYLE
      }),
    selectMonth2: ui.Select({
      placeholder: '月選択',
      style: app.WIDGETS_STYLE
      }),
    cloudcover: ui.Slider({
      min: 10,
      max: 100,
      value: app.cloudCover,
      step: 10,
      onChange: function(value) {
        app.cloudCover = value;
      },
      style: app.SLIDER_STYLE
    }),
    applyButton: ui.Button({
      label: '検索実行',
      onClick: app.applyFilters,
      style: {
        stretch: 'horizontal',
        margin: '0.2em',
        fontSize: '0.85em',
        border: '1px solid black'
      },
      // style: app.WIDGETS_STYLE,
    }),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  app.filters.panel = ui.Panel({
    widgets: [
      app.filters.closeButton,
      ui.Label({
        value: 'Sentinel-2画像比較',
        style: {
          fontWeight: 'bold',
          fontSize: '1em',
          margin: '0.4em 0'},
      }),
      ui.Label('1. 検索条件', app.HEADER_TEXT_STYLE),
      app.filters.dataSetSelect,
      ui.Panel([
        app.filters.sArea,
        app.filters.geoButton
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('雲量の上限(%)', app.HELPER_TEXT_STYLE),
      app.filters.cloudcover,
      ui.Label('開始年・月（左パネル）', app.HELPER_TEXT_STYLE), 
      ui.Panel([
        app.filters.selectYear,
        app.filters.selectMonth
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('開始年・月（右パネル）', app.HELPER_TEXT_STYLE), 
      ui.Panel([
        app.filters.selectYear2,
        app.filters.selectMonth2
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
  });
  // データセットの初期値セット
  app.filters.dataSetSelect.setValue(app.filters.dataSetSelect.items().get(0));
  // 検索開始年・月リストのセット
  app.setMonth();
  // 左パネル表示設定
  app.vis = {
    selectDate: ui.Select({
      placeholder: '観測日選択',
      onChange: app.refreshMapLayer,
      style: app.WIDGETS_STYLE,
    }),
    checkColorComp: ui.Checkbox({ // 表示ON/OFF
      value:true,
      onChange: function(checked) {
        Map.layers().get(0).setShown(checked);}
    }),
    select: ui.Select({ // カラー合成の選択
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        var visMin = option.visParams.min;
        var visMax = option.visParams.max;
        var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
        app.leftPanel.legendMin.setValue(visMin);
        app.leftPanel.legendMax.setValue(visMax);
        app.leftPanel.legendAve.setValue(visAve);
        app.leftPanel.legendBands.setValue(option.description);
        app.refreshMapLayer();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisButton: ui.Button({
      label: '調整',
      onClick: function() {app.setVisMinMax(Map, app.imgLeft, app.leftPanel)},
      style: app.WIDGETS_STYLE,
    }),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      onChange: app.refreshMapLayer,
      style: app.WIDGETS_STYLE,
    }),
  };
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('2. 左パネル表示', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.vis.checkColorComp,
        app.vis.selectDate,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis.select,
        app.vis.setVisButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis.selectMask,
    ],
  });
  // セレクタ初期値に先頭アイテムをセット
  app.vis.select.setValue(app.vis.select.items().get(0));
  app.vis.selectMask.setValue(app.vis.selectMask.items().get(0));
  // 凡例を表示
  app.dispLegend(app.leftPanel);
  app.leftPanel.legendPanel.style().set({position: 'bottom-left'});
  Map.widgets().set(1, app.leftPanel.legendPanel);
  // 右パネル表示設定
  app.vis2 = {
    selectDate: ui.Select({
      placeholder: '観測日選択',
      onChange: app.refreshMapLayer2,
      style: app.WIDGETS_STYLE,
    }),
    checkColorComp: ui.Checkbox({ // 表示ON/OFF
      value:true,
      onChange: function(checked) {
        linkedMap.layers().get(0).setShown(checked);}
    }),
    select: ui.Select({ // カラー合成の選択
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        var visMin = option.visParams.min;
        var visMax = option.visParams.max;
        var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
        app.rightPanel.legendMin.setValue(visMin);
        app.rightPanel.legendMax.setValue(visMax);
        app.rightPanel.legendAve.setValue(visAve);
        app.rightPanel.legendBands.setValue(option.description);
        app.refreshMapLayer2();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisButton: ui.Button({
      label: '調整',
      onClick: function() {app.setVisMinMax(linkedMap, app.imgRight, app.rightPanel)},
      style: app.WIDGETS_STYLE,
    }),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      onChange: app.refreshMapLayer2,
      style: app.WIDGETS_STYLE,
    }),
  };
  app.vis2.panel = ui.Panel({
    widgets: [
      ui.Label('3. 右パネル表示', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.vis2.checkColorComp,
        app.vis2.selectDate,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis2.select,
        app.vis2.setVisButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis2.selectMask,
    ],
  });
  // セレクタ初期値に先頭アイテムをセット
  app.vis2.select.setValue(app.vis2.select.items().get(0));
  app.vis2.selectMask.setValue(app.vis2.selectMask.items().get(0));
  // 凡例を表示
  app.dispLegend(app.rightPanel);
  app.rightPanel.legendPanel.style().set({position: 'bottom-right'});
  linkedMap.widgets().set(0, app.rightPanel.legendPanel);
  // その他設定
  app.misc = {
    checkSync: ui.Checkbox({
      label:'左右の抽出を同期',
      onChange: function() {
        app.refreshMapLayer();
        app.refreshMapLayer2();
      },
      style: app.WIDGETS_STYLE,
    }),
    // checkFudeBounds: ui.Checkbox({ // 筆ポリゴン描画
    //   label: '筆ポリゴン表示',
    //   onChange: function(checked) {
    //     if (checked) {
    //       Map.setLocked(false, 13);
    //     } else {
    //       Map.setLocked(false);
    //     }
    //     Map.layers().get(1).setShown(checked);
    //     linkedMap.layers().get(1).setShown(checked);
    //   },
    //   style: app.WIDGETS_STYLE,
    // }),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      onChange: function(key) {
        app.colorRamp = app.colorSchemes[key];
        var ColorBarParams = app.makeColorBarParams(app.colorRamp);
        app.leftPanel.colorBar.setParams(ColorBarParams);
        app.rightPanel.colorBar.setParams(ColorBarParams);
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        if (visOption.legend) {
          visOption.visParams.palette = app.colorRamp;
          Map.layers().get(0).setVisParams(visOption.visParams);
        }
        var visOption2 = app.VIS_OPTIONS[app.vis2.select.getValue()];
        if (visOption2.legend) {
          visOption2.visParams.palette = app.colorRamp;
          linkedMap.layers().get(0).setVisParams(visOption2.visParams);
        }
      },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.misc.panel = ui.Panel({
    widgets: [
      ui.Label('4. 表示設定その他', app.HEADER_TEXT_STYLE),
      app.misc.checkSync,
      // app.misc.checkFudeBounds,
      ui.Label('植生指数の配色', app.HELPER_TEXT_STYLE), 
      app.misc.selectColorScheme,
    ],
  });
  app.misc.selectColorScheme
    .setValue(app.misc.selectColorScheme.items().get(0));
  // データダウンロード設定パネル
  app.dataDL = {
    setDrawingButton: ui.Button({
      label: '領域設定',
      onClick: app.setDrawingTools,
      style: app.WIDGETS_STYLE,
    }),
    clearDrawingButton: ui.Button({
      label: 'クリア',
      onClick: function(){
        Map.drawingTools().clear();
        Map.drawingTools().layers().reset();
        Map.drawingTools().setShown(false);
        Map.setControlVisibility({
          mapTypeControl: true
        });
        app.dispLinkPanel.clear();
        app.dispLinkPanel.style().set('shown', false);
        app.userSetting.userAoi.setValue('');
        if (app.showUrlPanel){
          app.showUrlPanel.clear();
          app.showUrlPanel.style().set('shown', false);
        }
        if (Map.layers().get(1)){
          Map.layers().get(1).setShown(false);
          linkedMap.layers().get(1).setShown(false);
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    aoiDataButton: ui.Button({
      label: '領域平均データ',
      onClick: app.aoiData,
      style: app.WIDGETS_STYLE,
    }),
    setGridButton: ui.Button({
        label: 'グリッド地点発生',
      onClick: app.setPoints,
      style: app.WIDGETS_STYLE,
    }),
    gridSpacing: ui.Slider({
      min: 10,
      max: 50,
      value: 20,
      step: 5,
      style: app.SLIDER_STYLE
    }),
    gridDataButton: ui.Button({
      label: 'グリッド地点データ',
      onClick: app.gridData,
      style: app.WIDGETS_STYLE,
    }),
  };
  app.dataDL.panel = ui.Panel({
    widgets: [
      ui.Label('5. データダウンロード', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.dataDL.setDrawingButton,
        app.dataDL.clearDrawingButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.dataDL.setGridButton,
      ui.Label('グリッド間隔(m)', app.HELPER_TEXT_STYLE),
      app.dataDL.gridSpacing,
      app.dataDL.aoiDataButton,
      app.dataDL.gridDataButton,
      // ui.Label(
      //   'Contains modified Copernicus Sentinel data (2021)',
      //   {margin: '0.2em', fontSize: '0.6em'})
    ],
  });
  app.userSetting = {
    aoiToJsonButton: ui.Button({
        label: '領域GeoJSON出力',
      onClick: app.aoiToGeoJson,
      style: app.WIDGETS_STYLE,
    }),
    userAoi: ui.Textbox({
      placeholder: '領域GeoJSON入力',
      onChange: function(text) {
        if (text) {
          app.setDrawingTools();
          var aoiGeometry = ee.Geometry(JSON.parse(text));
          var layer = ui.Map.GeometryLayer([aoiGeometry], 'my_geometry', 'red');
          Map.drawingTools().layers().set(0, layer);
          Map.centerObject(aoiGeometry);
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    userPlaces: ui.Textbox({
      placeholder: '地点リスト入力',
      onChange: function(text) {
        app.places = JSON.parse(text);
        app.filters.sArea.items().reset(Object.keys(app.places)); // 地点リスト更新
        app.filters.sArea.setValue(app.filters.sArea.items().get(0));
      },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.userSetting.panel = ui.Panel({
    widgets: [
      ui.Label('6. ユーザー設定入出力', app.HEADER_TEXT_STYLE),
      app.userSetting.aoiToJsonButton,
      app.userSetting.userAoi,
      app.userSetting.userPlaces,
      ui.Label('Credit', app.HEADER_TEXT_STYLE),
      ui.Label(
        'Contains modified Copernicus Sentinel data (2021)',
        {margin: '0.2em', fontSize: '0.6em'})
    ],
    style: app.SECTION_STYLE
  });
  // パネル終り
}; 
// UIパネル作成終了
// 補助機能設定
app.createHelpers = function() {
  // 検索実行に合わせて入力ウィジエットを無効化・有効化
  app.setLoadingMode = function(enabled) {
    app.filters.loadingLabel.style().set('shown', enabled);
    var loadDependentWidgets = [
      app.filters.dataSetSelect,
　　　app.filters.sArea,
      app.filters.geoButton,
      app.filters.cloudcover,
      app.filters.selectYear,
      app.filters.selectMonth,
      app.filters.selectYear2,
      app.filters.selectMonth2,
      app.filters.applyButton,
      app.vis.selectDate,
      app.vis2.selectDate,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  // 指定条件による検索実行
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = app.imgCollection
          .filterBounds(Map.getCenter())
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', app.cloudCover));
    // 左パネル用検索
    var startY = app.filters.selectYear.getValue();
    var startM = app.filters.selectMonth.getValue();
    var startD = ee.Date(startY + '-' + startM + '-01');
    var filteredLeft = filtered
          .filterDate(startD, startD.advance(2, 'year'))
          .sort('system:time_start')
          .limit(app.IMAGE_COUNT_LIMIT);
    // 検索条件を満たす撮影日リストを出力
    var computeDatesLeft = 
      ee.List(filteredLeft.aggregate_array('system:time_start'))
      .map(function(d) { return ee.Date(d).format('YYYY-MM-dd')})
      .distinct() // 重複日付を除去
      .slice(0, app.IMAGE_LIST_LIMIT); // リスト先頭から指定件数を得る
    computeDatesLeft.evaluate(function(ids) {
      app.vis.selectDate.items().reset(ids); // セレクタリスト更新
      // セレクタにリスト先頭の日付をセット
      app.vis.selectDate.setValue(app.vis.selectDate.items().get(0));
    });
    // 右パネル用検索
    var startY2 = app.filters.selectYear2.getValue();
    var startM2 = app.filters.selectMonth2.getValue();
    var startD2 = ee.Date(startY2 + '-' + startM2 + '-01');
    var filteredRight = filtered
          .filterDate(startD2, startD2.advance(2, 'year'))
          .sort('system:time_start')
          .limit(app.IMAGE_COUNT_LIMIT);
    var computeDatesRight = 
      ee.List(filteredRight.aggregate_array('system:time_start'))
      .map(function(d) { return ee.Date(d).format('YYYY-MM-dd')})
      .distinct() // 重複日付を除去
      .slice(0, app.IMAGE_LIST_LIMIT); // リスト先頭から指定件数を得る
    computeDatesRight.evaluate(function(ids) {
      // app.setLoadingMode(false);
      app.vis2.selectDate.items().reset(ids); // セレクタリスト更新
      app.vis2.selectDate.setValue(app.vis2.selectDate.items().get(0));
    });
    app.setLoadingMode(false);
  }; // app.applyFilters終了
};　// app.createHelpers終了
// マップ左画面の更新
app.refreshMapLayer = function() {
  var imageDateStr = app.vis.selectDate.getValue();
  if (imageDateStr) {
    Map.setLocked(false);
    app.leftPanel.legendDate.setValue(imageDateStr);
    // 衛星画像の加工とモザイク
    var imgDate = ee.Date(imageDateStr);
    var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
    app.imgColLeft = app.imgCollection
      .filterDate(dateRange)
      .map(app.ScaleResample);
    // print(app.imgColLeft);
    app.imgLeft = app.imgColLeft.mean();
    var imgLeftAg = app.imgLeft.clipToCollection(app.fudePoly); // 農地の切り出し
    var imgLeftPaddy2021 = app.imgLeft.clipToCollection(app.fudePaddy2021); // 水田2021
    var vegMask = app.imgLeft.select('EVI2').gt(0.25); // 植生の切り出し
    var imgLeftAgVeg = imgLeftAg.updateMask(vegMask);
    var bareMask = app.imgLeft.select('EVI2').lt(0.2) // 裸地の切り出し
      .and(app.imgLeft.select('B11').gt(0.16));
    var imgLeftAgBare = imgLeftAg.updateMask(bareMask);
    var waterMask = app.imgLeft.select('EVI2').lt(0.25) // 湛水箇所の切り出し
      .and(app.imgLeft.select('B11').lt(0.16));
    var imgLeftAgWater = imgLeftAg.updateMask(waterMask);
    var maskOption = app.MASK_OPTIONS[app.vis.selectMask.getValue()];
    if (maskOption.clipFude) { 
      app.imgLeft = imgLeftAg;
      Map.setLocked(false, 13);
    }
    if (maskOption.maskClass == 'veg') {
      app.imgLeft = imgLeftAgVeg;
    }
    if (maskOption.maskClass == 'bare') {
      app.imgLeft = imgLeftAgBare;
    }
    if (maskOption.maskClass == 'paddy') {
      app.imgLeft = imgLeftAgWater;
    }
    if (maskOption.maskClass == 'paddy2021') {
      app.imgLeft = imgLeftPaddy2021;
    }
    app.imgLeftMask = app.imgLeft.select('B4').mask();
    var checkSyncValue = app.misc.checkSync.getValue();
    if (checkSyncValue && app.imgRightMask) {
      // 右パネル抽出条件を反映
        app.imgLeft = app.imgLeft.updateMask(app.imgRightMask);
    }
    // 画像の表示
    var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    if (visOption.legend) {
          visOption.visParams.palette = app.colorRamp;}
    var imgName = 'Image:' + imageDateStr;
    var imgCheck = app.vis.checkColorComp.getValue();
    var imgLeftDisp = ui.Map.Layer(app.imgLeft, visOption.visParams, imgName, imgCheck);
    Map.layers().set(0, imgLeftDisp);
    // 筆ポリゴン境界の表示
    // var fudeBoundsCheck = app.misc.checkFudeBounds.getValue();
    // var Fude = ui.Map.Layer(app.fudeOutline, {palette: '#808080'}, 'Fude polygon', fudeBoundsCheck);
    // Map.layers().set(1, Fude);
    // 凡例の表示
    Map.widgets().get(1).style().set('shown', true);
    app.leftPanel.colorBar.style().set('shown', visOption.legend);
    app.leftPanel.legendLabels.style().set('shown', visOption.legend);
  }
}; // マップ左画面の更新終了
// マップ右画面の更新
app.refreshMapLayer2 = function() {
  var imageDateStrR = app.vis2.selectDate.getValue();
  if (imageDateStrR) {
    app.rightPanel.legendDate.setValue(imageDateStrR);
    // 衛星画像の加工とモザイク
    var imgDateR = ee.Date(imageDateStrR);
    var dateRangeR = ee.DateRange(imgDateR, imgDateR.advance(1, 'day'));
    app.imgColRight = app.imgCollection
      .filterDate(dateRangeR)
      .map(app.ScaleResample);
    app.imgRight = app.imgColRight.mean();
    var imgRightAg = app.imgRight.clipToCollection(app.fudePoly); // 農地の切り出し
    var imgRightPaddy2021 = app.imgRight.clipToCollection(app.fudePaddy2021); // 水田2021
    var vegMask = app.imgRight.select('EVI2').gt(0.25); // 植生の切り出し
    var imgRightAgVeg = imgRightAg.updateMask(vegMask);
    var bareMask = app.imgRight.select('EVI2').lt(0.2) // 裸地の切り出し
      .and(app.imgRight.select('B11').gt(0.16));
    var imgRightAgBare = imgRightAg.updateMask(bareMask);
    var waterMask = app.imgRight.select('EVI2').lt(0.25) // 湛水箇所の切り出し
      .and(app.imgRight.select('B11').lt(0.16));
    var imgRightAgWater = imgRightAg.updateMask(waterMask);
    var maskOption = app.MASK_OPTIONS[app.vis2.selectMask.getValue()];
    if (maskOption.clipFude) { 
      app.imgRight = imgRightAg;
    }
    if (maskOption.maskClass == 'veg') {
      app.imgRight = imgRightAgVeg;
    }
    if (maskOption.maskClass == 'bare') {
      app.imgRight = imgRightAgBare;
    }
    if (maskOption.maskClass == 'paddy') {
      app.imgRight = imgRightAgWater;
    }
    if (maskOption.maskClass == 'paddy2021') {
      app.imgRight = imgRightPaddy2021;
    }
    app.imgRightMask = app.imgRight.select('B4').mask();
    var checkSyncValue = app.misc.checkSync.getValue();
    if (checkSyncValue && app.imgLeftMask) {
      // 左パネル抽出条件を反映
        app.imgRight = app.imgRight.updateMask(app.imgLeftMask);
    }
    // 画像の表示
    var visOptionR = app.VIS_OPTIONS[app.vis2.select.getValue()];
    if (visOptionR.legend) {
          visOptionR.visParams.palette = app.colorRamp;}
    var imgNameR = 'Image:' + imageDateStrR;
    var imgCheckR = app.vis2.checkColorComp.getValue();
    var imgRightDisp = ui.Map.Layer(app.imgRight, visOptionR.visParams, imgNameR, imgCheckR);
    linkedMap.layers().set(0, imgRightDisp);
    // 筆ポリゴン境界の表示
    // var fudeBoundsCheck = app.misc.checkFudeBounds.getValue();
    // var Fude = ui.Map.Layer(app.fudeOutline, {palette: '#808080'}, 'Fude polygon', fudeBoundsCheck);
    // linkedMap.layers().set(1, Fude);
    // 凡例の表示
    linkedMap.widgets().get(0).style().set('shown', true);
    app.rightPanel.colorBar.style().set('shown', visOptionR.legend);
    app.rightPanel.legendLabels.style().set('shown', visOptionR.legend);
  }
}; // マップ右画面の更新終了
// サンプル地点発生関数
app.setPoints = function() {
  if (Map.drawingTools().layers().get(0)) {
    var aoi = Map.drawingTools().layers().get(0).toGeometry();
    var alosDsm = ee.Image('JAXA/ALOS/AW3D30/V2_2').select('AVE_DSM').rename('Elevation');
    app.samplePoints = alosDsm.sample({
      region: aoi,
      geometries: true,
      scale: app.dataDL.gridSpacing.getValue(),
    });
　　Map.layers().set(1, ui.Map.Layer(app.samplePoints, {color: 'FF0000'}, 'samplePoints'));
　　linkedMap.layers().set(1, ui.Map.Layer(app.samplePoints, {color: 'FF0000'}, 'samplePoints'));
  } // end of if
};
// ダウンロードUrl表示関数
app.showUrl = function(aoiFC, aoiType) {
  // 左右画面データをFeature Collectionに集計
  var reduceRegionsArg = {
    collection: aoiFC,
    reducer: ee.Reducer.mean(),
    scale: 10,
  };
  var sampleLeftFC = app.imgLeft.reduceRegions(reduceRegionsArg);
  var sampleRightFC = app.imgRight.reduceRegions(reduceRegionsArg);
  // Feature Collectionに日付属性追加
  var dateLeft = app.vis.selectDate.getValue();
  var dateRight = app.vis2.selectDate.getValue();
  var setDateLeft = function(feature) {
    return feature.set({date: dateLeft});
  };
  sampleLeftFC = sampleLeftFC.map(setDateLeft);
  var setDateRight = function(feature) {
    return feature.set({date: dateRight});
  };
  sampleRightFC = sampleRightFC.map(setDateRight);
  // 左右のFCをマージ
  var sampleFC = sampleLeftFC.merge(sampleRightFC);
  // ダウンロードUrl生成・表示
  var dlUrl = function(formatNam) {
    return sampleFC.getDownloadURL({format: formatNam, filename: 'aoi'});
  };
  var dlUrlCSV = dlUrl('CSV');
  var dlUrlKML = dlUrl('kml');
  var dlUrlJSON = dlUrl('json');
  var dlLabel = ui.Label(aoiType + 'ダウンロード', app.HELPER_TEXT_STYLE);
  var dateLabel = ui.Label(dateLeft + ', ' + dateRight, app.LEGEND_TEXT_STYLE);
  var dlLabelCSV = ui.Label('CSV形式', app.LEGEND_TEXT_STYLE)
    .setUrl(dlUrlCSV);
  var dlLabelKML = ui.Label('KML形式', app.LEGEND_TEXT_STYLE)
    .setUrl(dlUrlKML);
  var dlLabelJSON = ui.Label('GeoJSON形式', app.LEGEND_TEXT_STYLE)
    .setUrl(dlUrlJSON);
  app.showUrlPanel = ui.Panel({
    widgets: [
      dlLabel,
      dateLabel,
      dlLabelCSV,
      dlLabelKML,
      dlLabelJSON,
    ],
    style: {position: 'middle-left'},
  });
  app.dispLinkPanel.clear();
  app.dispLinkPanel.style().set('shown', true);
  app.dispLinkPanel.widgets().set(0, app.showUrlPanel);
};
// 領域データDL関数
app.aoiData = function() {
  if (Map.drawingTools().layers().get(0)) {
    var aoiGeo = Map.drawingTools().layers().get(0).toGeometry();
    app.showUrl(ee.FeatureCollection(aoiGeo), '領域平均');
  }
};
// グリッドデータDL関数
app.gridData = function() {
  if (app.samplePoints) {
    app.showUrl(app.samplePoints, 'グリッドデータ');
  }
};
// メインパネルの表示切り替え
app.mainPanelControl = function() {
  app.filters.closeButton.onClick(function() {
    app.main.style().set('shown', false);
    // app.creditPanel.style().set('shown', false);
    app.openButton.style().set('shown', true);
    Map.setControlVisibility({
      // layerList: false,
      mapTypeControl: false
    });
  });
  app.openButton = ui.Button({
    label: '設定',
    style: {position: 'top-left', 'padding': 0},
    onClick: function() {
      app.openButton.style().set('shown', false);
      app.main.style().set('shown', true);
      // app.creditPanel.style().set('shown', true);
      Map.setControlVisibility({
        // layerList: true,
        mapTypeControl: true
      });
    }
  });
  Map.add(app.openButton);
  app.openButton.style().set('shown', false);
};
// 初期設定
app.initialSetup = function() {
  // // マップ画面の初期化
  // Map.clear();
  // Map.drawingTools().setShown(false);
  // Map.drawingTools().layers().reset();
  // // Map.setControlVisibility({layerList: false});
  // // linkedMap.setControlVisibility({layerList: false});
  // Map.setCenter(142.506, 43.566, 7);
  // 衛星データセット
  app.dataset = {
    '大気補正あり': {
       name: 'COPERNICUS/S2_SR_HARMONIZED',
       startYear: 2018,
    },
    '大気補正なし': {
       name: 'COPERNICUS/S2_HARMONIZED',
       startYear: 2015,
    },
  };
  //農水省筆ポリゴン（北海道分） 
  app.fudePoly = ee.FeatureCollection('users/hkrnhn/fude2023/Hokkaido');
  // 湛水筆ポリゴン2021
  app.fudePaddy2021 = ee.FeatureCollection('users/hkrnhn/fude2021/paddyHokkaidoRF');
  // app.fudeOutline = ee.Image().byte()
  //   .paint({
  //     featureCollection: app.fudePoly,
  //     color: 1,
  //     width: 1
  //   });
  // マップレイヤー初期設定
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.drawingTools().setLinked(false);
  // Map.setOptions('SATELLITE');
  var urlLon = ui.url.get('lon', 142.506); // URLから経度取得
  var urlLat = ui.url.get('lat', 43.566); // URLから緯度取得
  var urlZoom = ui.url.get('zoom', 7); // URLからZoom倍率取得
  Map.setCenter(urlLon, urlLat, urlZoom);
  // Map.layers().set(0, ui.Map.Layer({shown: false}));
  // linkedMap.layers().set(0, ui.Map.Layer({shown: false}));
  // var Admin = ui.Map.Layer(app.Admindivline, {palette: '#ffd700'}, 'Admin division', false);
  // Map.layers().set(1, Admin);
  // linkedMap.layers().set(1, Admin);
  // マップ中心座標・ズーム倍率をURLに反映
  Map.onChangeCenter(ui.util.debounce(function() {
    var mapCenter = Map.getCenter();
    var centerCoords = mapCenter.coordinates();
    centerCoords.evaluate(function(coords) {
      var centerLon = coords[0].toFixed(6);
      var centerLat = coords[1].toFixed(6);
      ui.url.set('lon', centerLon);
      ui.url.set('lat', centerLat);
    });
  }, 200));
  Map.onChangeZoom(ui.util.debounce(function() {
    var zoom = Map.getZoom();
    ui.url.set('zoom', zoom);
  }, 200));
  // スタイル設定
  app.WIDGETS_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em',
    fontSize: '0.85em',
  };
  app.SLIDER_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em 0 0.2em 0.2em',
    fontSize: '0.75em',
  };
  app.HEADER_TEXT_STYLE = {
      margin: '0.2em',
      fontSize: '0.85em',
      fontWeight: 'bold'
  };
  app.HELPER_TEXT_STYLE = {
      margin: '0.3em 0 0 0.3em',
      fontSize: '0.85em',
      // fontWeight: 'bold'
  };
  app.LEGEND_TEXT_STYLE = {
      margin: '0 0 0 0.5em',
      fontSize: '0.85em',
  };
  // 左パネル凡例用ラベル
  app.leftPanel = {
    legendDate: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendBands: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendMin: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendMax: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendAve: ui.Label({
      style: {
        fontSize: '0.85em',
        margin: '0 0 0 0.3em',
        textAlign: 'center',
        stretch: 'horizontal'}
    }),
  };
  // 右パネル凡例用ラベル
  app.rightPanel = {
    legendDate: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendBands: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendMin: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendMax: ui.Label({style: app.LEGEND_TEXT_STYLE}),
    legendAve: ui.Label({
      style: {
        fontSize: '0.85em',
        margin: '0 0 0 0.3em',
        textAlign: 'center',
        stretch: 'horizontal'}
    }),
  };
  app.IMAGE_COUNT_LIMIT = 60; // 検索画像数の上限
  app.IMAGE_LIST_LIMIT = 13; // 検索結果リストの上限数
  app.cloudCover = 50; // 検索条件の雲量初期値
  // 地域リスト
  app.places = {
    '空知': [141.766, 43.197],
    '石狩': [141.345, 43.064],
    '後志': [140.756, 42.902],
    '胆振': [140.971, 42.320],
    '日高': [142.768, 42.172],
    '渡島': [140.753, 41.819],
    '檜山': [140.127, 41.859],
    '上川': [142.439, 43.807],
    '留萌': [141.655, 43.934],
    '宗谷': [141.700, 45.397],
    'オホーツク': [144.260, 44.026],
    '十勝': [143.208, 42.929],
    '釧路': [144.384, 42.976],
    '根室': [145.584, 43.330],
    '実証農場': [143.698787, 43.743359],
  };
  // 検索開始年・月リストの生成
  app.today = new Date();
  app.thisYear = app.today.getFullYear();
  app.startDate = new Date(app.today.setMonth(app.today.getMonth() - 2));
  app.startYear = app.startDate.getFullYear().toFixed();
  app.startMonth = ("00" + (app.startDate.getMonth() + 1)).slice(-2);
  app.dataStartYear = app.dataset['大気補正あり'].startYear;
  // 検索開始月リストのセット関数
  app.setMonth = function() {
    var monthList = ee.List.sequence({
      start: 1,
      end: 12,
      step: 1
    })
    .map(function(m) {
      return ee.Number(m).format('%02d');
  });
  monthList.evaluate(function(ids){
    app.filters.selectMonth.items().reset(ids);
    app.filters.selectMonth.setValue(app.startMonth);
    app.filters.selectMonth2.items().reset(ids);
    app.filters.selectMonth2.setValue(app.startMonth);
  });
  };
  // 検索開始年リストのセット関数
  app.setYear = function() {
    var yearList = ee.List.sequence({
      start: app.dataStartYear, // データセットの初年目
      end: app.thisYear,
      step: 1
    })
    .map(function(y) {
      return ee.Number(y).format('%04d');
    });
    yearList.evaluate(function(ids){
      app.filters.selectYear.items().reset(ids);
      app.filters.selectYear.setValue(app.startYear);
      app.filters.selectYear2.items().reset(ids);
      app.filters.selectYear2.setValue(app.startYear);
    });
  };
  // 植生指数バンドの計算
  app.calcNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4'])
          .rename('NDVI');
    return ndvi;
  };
  // app.calcNDRE = function(image) {
  //   var ndvi = image.normalizedDifference(['B8', 'B5'])
  //         .rename('NDRE');
  //   return ndvi;
  // };
  app.calcEVI2 = function(image) {
    var evi2 = image.expression(
      '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 10000))', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      }).rename('EVI2');
    return evi2;
  };
  app.calcWDRVIre = function(image) { //レッドエッジWDRVI
    var wdrvire = image.expression(
      '(0.1 * NIR - RE1) / (0.1 * NIR + RE1) + 0.818', {
      'NIR': image.select('B8'),
      'RE1': image.select('B5'),
      }).rename('WDRVIre');
    return wdrvire;
  };
  app.calcWDRVIgreen = function(image) { //greenWDRVI
    var wdrvigreen = image.expression(
      '(0.1 * NIR - GREEN) / (0.1 * NIR + GREEN) + 0.818', {
      'NIR': image.select('B8'),
      'GREEN': image.select('B3'),
      }).rename('WDRVIgreen');
    return wdrvigreen;
  };
  // マップ表示用：植生指数付加、スケール変換、リサンプル
  app.ScaleResample = function(image) {
    var ndvi = app.calcNDVI(image);
    // var ndre = app.calcNDRE(image);
    var evi2 = app.calcEVI2(image);
    var WDRVIgreen = app.calcWDRVIgreen(image);
    return image.select('B[2-8]', 'B8A', 'B11', 'B12').divide(10000)
      .addBands(ndvi).addBands(evi2).addBands(WDRVIgreen)
      .resample('bilinear')
      .copyProperties(image, ['system:time_start']);
  };
  // ジオメトリツール起動用関数
  app.setDrawingTools = function() {
    Map.setControlVisibility({
      // layerList: false,
      mapTypeControl: false
    });
    Map.drawingTools().clear();
    Map.drawingTools().layers().reset();
    Map.drawingTools().setShown(true);
    Map.drawingTools().setLinked(false);
    // Map.drawingTools().setLinked(true);
    linkedMap.drawingTools().setLinked(true);
    // var mapCenter = [Map.getCenter()];
    // Map.drawingTools().addLayer({geometries: mapCenter, color:'magenta'});
    Map.drawingTools().setDrawModes(['point', 'line', 'polygon']);
    // Map.drawingTools().draw(); // Enter drawing mode.
  };
  // 主題図レイヤのカラーパレット
  // パレットライブラリ https://github.com/gee-community/ee-palettes
  var palettes = require('users/gena/packages:palettes');
  app.colorSchemes = {
    '赤～黄～緑':palettes.colorbrewer.RdYlGn[11],
    '茶～青緑':palettes.colorbrewer.BrBG[11],
    '緑（淡～濃）':palettes.colorbrewer.Greens[9],
    '茶～黄':palettes.colorbrewer.YlOrBr[5].reverse(),
    '虹色':palettes.kovesi.rainbow_bgyr_35_85_c73[7],
    '青-水-緑-黄-赤':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'],
    // '虹色（原色）':['#0000ff','#00ffff','#00ff00','#ffff00','#ff0000'],
  };
  app.colorRamp = app.colorSchemes['赤～黄～緑']; // パレット初期値
  app.VIS_OPTIONS = {
    'トゥルーカラー': {
      description: 'RGB=B4/B3/B2',
      visParams: {
        gamma: 1.1,
        min: 0.01,
        max: 0.19,
        bands: ['B4', 'B3', 'B2']
      },
      legend: false,
    },
    'フォールスカラー': {
      description: 'RGB=B11/B8/B4',
      visParams: {
        gamma: 1.1,
        min: 0.02,
        max: 0.5,
        bands: ['B11', 'B8', 'B4']
      },
      legend: false,
    },
    'NDVI': {
      description: 'NDVI',
      visParams: {
        min: 0.2,
        max: 1.0,
        bands: ['NDVI'],
      },
      legend: true,
    },
    'EVI2': {
      description: 'EVI2',
      visParams: {
        min: 0.3,
        max: 1.0,
        bands: ['EVI2'],
      },
      legend: true,
    },
    'WDRVIgreen': {
      description: 'WDRVIgreen',
      visParams: {
        bands: ['WDRVIgreen'],
        min: 0.1,
        max:0.9,
      },
      legend: true,
    },
  };
  // 農地抽出マスク設定  
  app.MASK_OPTIONS = {
    '抽出なし': {
      clipFude: false,
      maskClass: '',
    },
    '農地': {
      clipFude: true,
      maskClass: '',
    },
    '農地・植生': {
      clipFude: true,
      maskClass: 'veg',
    },
    '農地・裸地畑': {
      clipFude: true,
      maskClass: 'bare',
    },
    '農地・湛水': {
      clipFude: true,
      maskClass: 'paddy',
    },
    '水田2021': {
      clipFude: false,
      maskClass: 'paddy2021',
    },
  };
  // ダウンロードリンク表示用パネル
  app.dispLinkPanel = ui.Panel({
    style: {
      position: 'middle-left',
      shown: false
    },
  });
  Map.widgets().set(1, app.dispLinkPanel);
  // 凡例関係関数
  app.makeColorBarParams = function(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  };
  app.makeColorBar = function() {
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: app.makeColorBarParams(app.colorRamp),
      style: {
        stretch: 'horizontal',
        margin: '0 0.3em',
        maxHeight: '1.7em',
      },
    });
    return colorBar;
  };
  app.dispLegend = function(panelName) {
    panelName.colorBar = app.makeColorBar();
    panelName.legendLabels = ui.Panel({
      widgets: [
        panelName.legendMin,
        panelName.legendAve,
        panelName.legendMax,
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
    });
    panelName.legendPanel = ui.Panel([
      panelName.legendDate,
      panelName.legendBands,
      panelName.colorBar,
      panelName.legendLabels,
    ]);
    panelName.legendPanel.style().set({
      padding: '0.2em',
      shown: false
    });
  };
  // 凡例関数終了
  // 画像の明るさ自動調整
  app.setVisMinMax = function(mapNam, imgNam, panelNam) {
    var mapBounds = ee.Geometry.Rectangle(mapNam.getBounds());
    var currentVisParams = mapNam.layers().get(0).getVisParams();
    var reduceScale = mapNam.getScale() * 10;
    var imgStats;
    if (currentVisParams.bands.length == 3) {
      var bandR = currentVisParams.bands[0];
      var bandG = currentVisParams.bands[1];
      var bandB = currentVisParams.bands[2];
      imgStats = imgNam
        .select([bandR, bandG, bandB])
        .reduceRegion({
          reducer: ee.Reducer.percentile([2,98]),
          geometry: mapBounds,
          scale: reduceScale,
        });
      imgStats.evaluate(function(stats) {
        var visminR = stats[bandR + '_p2'];
        var visminG = stats[bandG + '_p2'];
        var visminB = stats[bandB + '_p2'];
        var vismaxR = stats[bandR + '_p98'];
        var vismaxG = stats[bandG + '_p98'];
        var vismaxB = stats[bandB + '_p98'];
        currentVisParams.min = Math.min(visminR, visminG, visminB);
        currentVisParams.max = Math.max(vismaxR, vismaxG, vismaxB);
        mapNam.layers().get(0).setVisParams(currentVisParams);
      });
    }
    var band = currentVisParams.bands[0];
    imgStats = imgNam
      .select([band])
      .reduceRegion({
        reducer: ee.Reducer.percentile([20,98]),
        geometry: mapBounds,
        scale: reduceScale,
      });
    imgStats.evaluate(function(stats) {
      var visMin = stats[band + '_p20'];
      var visMax = stats[band + '_p98'];
      visMin = Math.round(Math.max(visMin, 0) * 100) / 100;
      visMax = Math.round(visMax * 100) / 100;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      currentVisParams.min = visMin;
      currentVisParams.max = visMax;
      panelNam.legendMin.setValue(visMin);
      panelNam.legendMax.setValue(visMax);
      panelNam.legendAve.setValue(visAve);
      mapNam.layers().get(0).setVisParams(currentVisParams);
    });
  };
  // 設定領域をGeoJson形式で出力
  app.aoiToGeoJson = function() {
    if (Map.drawingTools().layers().get(0)) {
      var aoiGeo = Map.drawingTools().layers().get(0).toGeometry();
      var geoStr = aoiGeo.toGeoJSONString();
      var geoLabel = ui.Label(geoStr);
      var geoPanel = ui.Panel({widgets: [geoLabel]});
      app.dispLinkPanel.clear();
      app.dispLinkPanel.style().set('shown', true);
      app.dispLinkPanel.widgets().set(0, geoPanel);
    }
  };
}; // 初期設定終了
// アプリケーション立ち上げ
app.boot = function() {
  app.initialSetup();
  app.createHelpers();
  app.createPanels();
  app.main = ui.Panel({
    widgets: [
      app.filters.panel,
      app.vis.panel,
      app.vis2.panel,
      app.misc.panel,
      app.dataDL.panel,
      app.userSetting.panel
    ],
    style: {width: '14em', padding: '0.4em'}
  });
  app.mainPanelControl();
  app.linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
  app.splitPanel = ui.SplitPanel({
    firstPanel: app.linker.get(0),
    secondPanel: app.linker.get(1),
    orientation: 'horizontal',
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().reset([app.splitPanel]);
  ui.root.insert(0, app.main);
};
app.boot();