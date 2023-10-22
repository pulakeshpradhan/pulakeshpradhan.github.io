// Sentinel-1_app
var app = {}; //空のオブジェクト生成
// UIメインパネル作成開始
app.createPanels = function() {
  app.filters = {
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0 0 0 6em'},
    }),
    sArea: ui.Select({
      items: Object.keys(app.places),
      placeholder: '地域選択',
      onChange: function(key) {
        Map.setCenter(app.places[key][0], app.places[key][1]);
      },
      style: app.WIDGETS_STYLE,
    }),
    geoButton: ui.Button({
      label: '現在地',
      onClick: function() {
        ui.util.getCurrentPosition(
          function(position) {Map.centerObject(position,14);}
        );
      },
      style: app.WIDGETS_STYLE,
    }),
    selectYear: ui.Select({
      items: app.yearList,
      value: app.startYear,
      placeholder: '年選択',
      style: app.WIDGETS_STYLE,
    }),
    selectMonth: ui.Select({ // 検索開始月選択
      items: app.monthList,
      value: app.startMonth,
      style: app.WIDGETS_STYLE,
    }),
    sOrbit: ui.Select({
      items: Object.keys(app.orbitPass),
      placeholder: '軌道進行方向',
      onChange: function(key) {
        app.orbitDirection = app.orbitPass[key];
      },
      style: app.WIDGETS_STYLE,
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
    }),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  app.filters.panel = ui.Panel({
    widgets: [
      app.filters.closeButton,
      ui.Label('Sentinel-1 SAR画像', app.HEADER_TEXT_STYLE),
      ui.Label('1. 画像検索', app.HEADER_TEXT_STYLE),
      // app.filters.dataSetSelect,
      ui.Panel([
        app.filters.sArea,
        app.filters.geoButton
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('開始年・月', app.HELPER_TEXT_STYLE),
      ui.Panel([
        app.filters.selectYear,
        app.filters.selectMonth
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('軌道進行方向', app.HELPER_TEXT_STYLE),
      app.filters.sOrbit,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  // 軌道進行方向の初期値セット
  app.filters.sOrbit.setValue(app.filters.sOrbit.items().get(0));
  // 検索開始年・月リストのセット
  // app.setYear();
  // app.setMonth();
  // 画像検索パネル2
  app.picker = {
    select: ui.Select({
      placeholder: '検索待ち',
      onChange: function(key) {
        app.legendDate.setValue(key);
        app.imageDateStr = key;
        app.refreshMapLayer();
        // app.refreshMapLayer1();
        },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2. 画像表示', app.HEADER_TEXT_STYLE),
      ui.Label('●観測日を選択', app.SUBHEADER_TEXT_STYLE),
      app.picker.select,
    ],
    style: app.SECTION_STYLE
  });
  // // 画像表示パネル1
  // app.vis = {
  //   checkColorComp: ui.Checkbox({ // 表示ON/OFF
  //     value:true,
  //     onChange: function(checked) {
  //       Map.layers().get(0).setShown(checked);},
  //     style: {margin: '0.2em'},
  //   }),
  //   select: ui.Select({ // カラー合成の選択
  //     items: Object.keys(app.VIS_OPTIONS),
  //     onChange: function(key) {
  //       var option = app.VIS_OPTIONS[key];
  //       app.vis.label.setValue(option.description);
  //       app.refreshMapLayer0();
  //     },
  //     style: app.WIDGETS_STYLE,
  //   }),
  //   label: ui.Label({style: app.HELPER_TEXT_STYLE}),
  //   setVisButton: ui.Button({
  //     label: '調整',
  //     onClick: app.setVisMinMax,
  //     style: app.WIDGETS_STYLE,
  //   }),
  //   checkAdBounds: ui.Checkbox({ // 市町村界描画
  //     label: '町村界',
  //     onChange: function(checked) {
  //       Map.layers().get(2).setShown(checked);
  //     },
  //     style: app.WIDGETS_STYLE
  //   }),
  //   checkFudeBounds: ui.Checkbox({ // 筆ポリゴン描画
  //     label: '筆ポリゴン',
  //     onChange: function(checked) {
  //       if (checked) {
  //         Map.setLocked(false, 14);
  //       } else {
  //         Map.setLocked(false);
  //       }
  //       Map.layers().get(3).setShown(checked);
  //     },
  //     style: app.WIDGETS_STYLE
  //   }),
  // };
  // app.vis.panel = ui.Panel({
  //   widgets: [
  //     // ui.Label('3. マップ表示', app.HEADER_TEXT_STYLE),
  //     ui.Label('●カラー合成画像', app.SUBHEADER_TEXT_STYLE),
  //     ui.Panel([
  //       app.vis.checkColorComp,
  //       app.vis.select,
  //       app.vis.setVisButton,
  //     ], ui.Panel.Layout.flow('horizontal')),
  //     app.vis.label,
  //     ui.Panel([
  //     app.vis.checkAdBounds,
  //     app.vis.checkFudeBounds,
  //     ], ui.Panel.Layout.flow('horizontal')),
  //   ],
  //   style: app.SECTION_STYLE
  // });
  // // カラー合成選択の初期値
  // app.vis.select.setValue(app.vis.select.items().get(0));
  // 画像表示パネル2
  app.visTmap = {
    checkVI: ui.Checkbox({ // レイヤ表示ON/OFF
      value:true,
      onChange: function(checked) {
        Map.layers().get(0).setShown(checked);
        Map.widgets().get(1).style().set('shown', checked);
      },
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // 偏波の選択
      items: Object.keys(app.VIS_OPTIONS2),
      onChange: function(key) {
        var option2 = app.VIS_OPTIONS2[key];
        app.visTmap.label.setValue(option2.description);
        app.refreshMapLayer();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisTmapButton: ui.Button({
      label: '調整', // コントラスト自動調整
      onClick: app.setVisTmapMinMax,
      style: app.WIDGETS_STYLE,
    }),
    label: ui.Label({style: app.HELPER_TEXT_STYLE}),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      placeholder: '画像抽出',
      onChange: app.refreshMapLayer,
      style: app.WIDGETS_STYLE,
    }),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      placeholder: '表示配色',
      onChange: function(key) {
        app.colorRamp = app.colorSchemes[key];
        var currentVisParams = Map.layers().get(0).getVisParams();
        currentVisParams.palette = app.colorRamp;
        Map.layers().get(0).setVisParams(currentVisParams);
        app.legendPanel.clear();
        app.setLegend();
        var viCheck = app.visTmap.checkVI.getValue();
        app.legendPanel.style().set({'shown': viCheck});
      },
      style: app.WIDGETS_STYLE,
    }),
    checkAdBounds: ui.Checkbox({ // 市町村界描画
      label: '町村界',
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked);
      },
      style: app.WIDGETS_STYLE
    }),
    checkFudeBounds: ui.Checkbox({ // 筆ポリゴン描画
      label: '筆ポリゴン',
      onChange: function(checked) {
        if (checked) {
          Map.setLocked(false, 14);
        } else {
          Map.setLocked(false);
        }
        Map.layers().get(2).setShown(checked);
      },
      style: app.WIDGETS_STYLE
    }),
  };
  app.visTmap.panel = ui.Panel({
    widgets: [
      ui.Label('●偏波選択', app.SUBHEADER_TEXT_STYLE),
      ui.Panel([
        app.visTmap.checkVI,
        app.visTmap.select,
        app.visTmap.setVisTmapButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.visTmap.label,
      ui.Panel([
        app.visTmap.selectMask,
        app.visTmap.selectColorScheme,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.visTmap.checkAdBounds,
        app.visTmap.checkFudeBounds,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
  // 偏波選択の初期値
  app.visTmap.select.setValue(app.visTmap.select.items().get(0));
  app.visTmap.selectMask.setValue(app.visTmap.selectMask.items().get(0));
  // 解析パネル
  app.data = {
    titleLabel: ui.Label('3. 解析', app.HEADER_TEXT_STYLE),
    checkExFunc: ui.Checkbox({ // 拡張機能表示ON/OFF
      label: '拡張機能',
      value:true,
      onChange: function(checked) {
        app.setExFunc(checked);},
      style: app.WIDGETS_STYLE,
    }),
    setAoiLabel: ui.Label('●領域設定', app.SUBHEADER_TEXT_STYLE),
    setDrawingButton: ui.Button({
      label: '図形描画', // 描画ツール表示
      onClick: function() {
        app.clearAoi();
        // Map.drawingTools().clear();
        Map.drawingTools().setShown(true);
      },
      style: app.WIDGETS_STYLE,
    }),
    setMapCenterButton: ui.Button({
      label: 'マップ中心', // マップ中心にマーカーセット
      onClick: function() {
        app.clearAoi();
        // Map.drawingTools().clear();
        Map.drawingTools().setShown(true);         
        var mapCenter = [Map.getCenter()];
        Map.drawingTools().addLayer({geometries: mapCenter, color:'magenta'});
      },
      style: app.WIDGETS_STYLE,
    }),
    fcBufferLabel: ui.Label(
      '領域バッファ(m)', // 描画図形に対するバッファ設定
      app.HELPER_TEXT_STYLE),
    fcBuffer: ui.Slider({
      min: -30,
      max: 50,
      value: 0,
      onChange: app.setAoiBuffer,
      step: 10,
      style: app.SLIDER_STYLE
    }),
    geojsonImportButton: ui.Button({
        label: '領域インポート',  // 領域GeoJSON取込み
      onClick: app.geojsonImport,
      style: app.WIDGETS_STYLE,
    }),
    fudeFcButton: ui.Button({
      label: '筆ポリゴン抽出', // 描画図形で筆ポリゴン選択
      onClick: app.setFudeFc,
      style: app.WIDGETS_STYLE,
    }),
    setGridLabel: ui.Label('●グリッド生成', app.SUBHEADER_TEXT_STYLE),
    gridSpacingLabel:  ui.Label('サイズ(m)', app.HELPER_TEXT_STYLE),
    setGridButton: ui.Button({
        label: '生成実行', // 領域内にグリッド発生
      onClick: app.setGrid,
      style: app.WIDGETS_STYLE,
    }),
    gridSpacing: ui.Slider({
      min: 20, // グリッドサイズ指定
      max: 100,
      value: 20,
      step: 5,
      style: app.SLIDER_STYLE
    }),
    aoiOpeLabel: ui.Label('●領域操作', app.SUBHEADER_TEXT_STYLE),
    clearAoiButton: ui.Button({
      label: 'クリア',  // 領域クリア
      onClick: function() {
        app.clearAoi();
        // Map.drawingTools().clear();
        Map.drawingTools().setShown(false);
      },
      style: app.WIDGETS_STYLE,
    }),
    fcExportButton: ui.Button({
        label: '保存', // 領域保存
      onClick: app.fcExport,
      style: app.WIDGETS_STYLE,
    }),
    dispDataLabel: ui.Label('●データ集計・チャート', app.SUBHEADER_TEXT_STYLE),
    dispDrawDataButton: ui.Button({
      label: '描画領域',
      onClick: function() {
        if (Map.drawingTools().layers().get(0)) {
          var aoiDraw = (Map.drawingTools())
            .toFeatureCollection('layer');
          app.dispAoiData(aoiDraw, '描画領域');
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    dispFcDataButton: ui.Button({
      label: 'バッファ・取込・抽出領域',
      onClick: function() {
        if (app.aoiFc) {
          app.dispAoiData(app.aoiFc, 'バッファ・取込・抽出領域');
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    dispGridDataButton: ui.Button({
      label: 'グリッド',
      onClick: function() {
        if (app.aoiGrid) {
          app.dispAoiData(app.aoiGrid, 'グリッド');
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    otherFuncLabel: ui.Label('●その他', app.SUBHEADER_TEXT_STYLE),
    userPlaces: ui.Textbox({
      placeholder: '地点リスト入力',
      onChange: function(text) {
        app.places = JSON.parse(text);
        app.filters.sArea.items().reset(Object.keys(app.places)); // 地点リスト更新
        app.filters.sArea.setValue(app.filters.sArea.items().get(0));
        app.misc.userPlaces.setValue('', false);
      },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.data.panel = ui.Panel({
    widgets: [
      app.data.titleLabel,
      app.data.checkExFunc,
      app.data.setAoiLabel,
      ui.Panel([
        app.data.setDrawingButton, // 描画
        app.data.setMapCenterButton, // マップ中心
      ], ui.Panel.Layout.flow('horizontal')),
      app.data.fcBufferLabel,
      app.data.fcBuffer,
      app.data.geojsonImportButton,
      app.data.fudeFcButton,
      app.data.setGridLabel,
      app.data.gridSpacingLabel,
      app.data.gridSpacing,
      app.data.setGridButton,
      app.data.aoiOpeLabel,
      ui.Panel([
        app.data.clearAoiButton, //  領域クリア
        app.data.fcExportButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.data.dispDataLabel,
      app.data.dispDrawDataButton,
      app.data.dispFcDataButton,
      app.data.dispGridDataButton,
      app.data.otherFuncLabel,
      app.data.userPlaces,
    ],
    style: app.SECTION_STYLE
  });
  app.data.checkExFunc.setValue(false);
  // クレジット表示パネル
  app.miscPanel = ui.Panel({
    widgets: [
      ui.Label('Credit', app.SUBHEADER_TEXT_STYLE),
      ui.Label(
        'Contains modified Copernicus Sentinel data (2022)',
        {margin: '0.2em', fontSize: '0.6em'})
    ],
    style: app.SECTION_STYLE
  });
}; 
// UIパネル作成終了
// 補助機能設定
app.createHelpers = function() {
  // 検索実行に合わせて入力ウィジエットを無効化・有効化
  app.setLoadingMode = function(enabled) {
    app.filters.loadingLabel.style().set('shown', enabled);
    var loadDependentWidgets = [
      // app.filters.dataSetSelect,
　　　app.filters.sArea,
      app.filters.geoButton,
      app.filters.selectYear,
      app.filters.selectMonth,
      app.filters.sOrbit,
      app.filters.applyButton,
      app.picker.select,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  // 画像検索実行
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var startY = app.filters.selectYear.getValue();
    var startM = app.filters.selectMonth.getValue();
    var startD = ee.Date(startY + '-' + startM + '-01');
    var filtered = app.imgCollection
      .filter(ee.Filter.eq('orbitProperties_pass', app.orbitDirection))
      .filterBounds(Map.getCenter())
      .filterDate(startD, startD.advance(1, 'year'))
      .sort('system:time_start')
      .limit(app.IMAGE_COUNT_LIMIT);
    // 検索条件を満たす観測日リストを出力
    var computeDates = 
      ee.List(filtered.aggregate_array('system:time_start'))
        .map(function(d) { return ee.Date(d).format('YYYY-MM-dd')})
        .distinct() // 重複日付を除去
        .slice(0, app.IMAGE_LIST_LIMIT); // リスト先頭から指定件数を得る
    computeDates.evaluate(function(ids) {
      app.setLoadingMode(false);
      if(ids.length) { // リストが空でなければ
        app.picker.select.items().reset(ids); // セレクタリスト更新
        // セレクタにリスト先頭の日付をセット
        app.picker.select.setValue(app.picker.select.items().get(0));
      }
    });
  };
};　// 補助機能設定終了
// 初期設定
app.initialSetup = function() {
  // 衛星データセット
  app.imgCollection = ee.ImageCollection('COPERNICUS/S1_GRD')
  // Filter to get images with VV and VH dual polarization.
  　　.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  　　.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  　　// Filter to get images collected in interferometric wide swath mode.
  　　.filter(ee.Filter.eq('instrumentMode', 'IW'));
  // 土壌腐植推定値(g/kg)
  // app.soilOM = ee.Image("users/hkrnhn/soilOM/soilOMmedian").resample();
  //農水省筆ポリゴン（北海道分） 
  app.Fudepoly = ee.FeatureCollection('users/hkrnhn/fude2023/Hokkaido');
  app.Fudeoutline = ee.Image().byte()
    .paint({
      featureCollection: app.Fudepoly,
      color: 1,
      width: 1
    });
  var Fude = ui.Map.Layer(app.Fudeoutline, {palette: '#808080'}, 'Fude polygon', false);
  // 湛水筆ポリゴン2021
  app.fudePaddy2021 = ee.FeatureCollection('users/hkrnhn/fude2021/paddyHokkaidoRF');
  // 市町村境界（国土数値情報、北海道分）
  app.adminLayer = ui.Map.FeatureViewLayer({
    assetId: 'users/hkrnhn/adminHokkaido-featureview',
    name: '市町村境界',
    shown: false,
  });
  var adminVisParams = {
    color: '#ffa500',
    polygonFillOpacity: 0,
    width: 2,
  };
  app.adminLayer.setVisParams(adminVisParams);
  app.IMAGE_COUNT_LIMIT = 60; // 検索画像数の上限
  app.IMAGE_LIST_LIMIT = 20; // 検索結果リストの上限数
  // app.cloudCover = 50; // 検索条件の雲量初期値
  // マップレイヤー初期設定、市町村境界・筆ポリゴン表示
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.drawingTools().setLinked(false);
  var urlLon = ui.url.get('lon', 142.506); // URLから経度取得
  var urlLat = ui.url.get('lat', 43.566); // URLから緯度取得
  var urlZoom = ui.url.get('zoom', 7); // URLからZoom倍率取得
  var urlDic = {lon:urlLon, lat:urlLat, zoom:urlZoom};
  ui.url.set(urlDic);
  Map.setCenter(urlLon, urlLat, urlZoom);
  Map.layers().set(0, ui.Map.Layer({name:'Color Composit', shown: false}));
  Map.layers().set(1, app.adminLayer); // 市町村境界
  Map.layers().set(2, Fude); // 筆ポリゴン
  Map.layers().set(3, ui.Map.Layer({name:'aoiImg', shown: false}));
  Map.layers().set(4, ui.Map.Layer({name:'aoiBounds', shown: false}));
  // データ・チャート表示用パネル
  app.dispDataPanel = ui.Panel({
    style: {
      position: 'bottom-left',
      shown: false
    },
  });
  Map.widgets().set(0, app.dispDataPanel);
  app.dispDataPanelCloseButton = ui.Button({
    label: '閉じる',
    onClick: function() {
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', false);
      // Map.layers().set(4, {shown: false});
      // Map.layers().set(5, {shown: false});
    },
    style: {
      fontSize: '0.7em',
    },
  });
  // スタイル設定
  app.SECTION_STYLE = {margin: '0.2em 0 0 0'};
  app.WIDGETS_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em',
    fontSize: '0.75em',
  };
  app.SLIDER_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em 0 0.2em 0.2em',
    fontSize: '0.75em',
  };
  app.HEADER_TEXT_STYLE = {
      margin: '0',
      fontSize: '1.1em',
      fontWeight: 'bold'
  };
  app.SUBHEADER_TEXT_STYLE = {
      margin: '0',
      fontSize: '0.9em',
      fontWeight: 'bold'
  };
  app.HELPER_TEXT_STYLE = {
      margin: '0 0 -0.1em 2em',
      fontSize: '0.75em',
      whiteSpace: 'pre-wrap',
      // fontWeight: 'bold'
  };
  app.LEGEND_TEXT_STYLE = {
      margin: '0 0 0 0.5em',
      fontSize: '0.85em',
  };
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
  app.monthList = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  // 観測年リスト発生関数
  var serialNumber = function(start, end) {
    var result = [];
    var i = start;
    while (i <= end) result.push((i++).toFixed(0));
    return result;
  };
  app.yearList = serialNumber(2014, app.thisYear);
  // 軌道進行方向orbitProperties_pass
  app.orbitPass = {
    '南行 Descending': 'DESCENDING',
    '北行 Ascending': 'ASCENDING',
  };
  // バンド比付加
  app.addBands = function(image) {
    var ratioVHVV = image.expression(
      'VH / VV', {
      'VH': image.select('VH'),
      'VV': image.select('VV')
      }).rename('VH/VV');
    return image.select('VH','VV')
       .addBands(ratioVHVV)
       .copyProperties(image, ['system:time_start']);
  };
  // // 植生指数バンドの計算
  // app.calcNDVI = function(image) {
  //   var ndvi = image.normalizedDifference(['B5', 'B4'])
  //         .rename('NDVI');
  //   return ndvi;
  // };
  // app.calcGNDVI = function(image) {
  //   var gndvi = image.normalizedDifference(['B5', 'B3'])
  //         .rename('GNDVI');
  //   return gndvi;
  // };
  // app.calcEVI2 = function(image) {
  //   var evi2 = image.expression(
  //     '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 1))', {
  //     'NIR': image.select('B5'),
  //     'RED': image.select('B4'),
  //     }).rename('EVI2');
  //   return evi2;
  // };
  // // app.calcWDRVIre = function(image) { //レッドエッジWDRVI
  // //   var wdrvire = image.expression(
  // //     '(0.1 * NIR - RE1) / (0.1 * NIR + RE1) + 0.818', {
  // //     'NIR': image.select('B8'),
  // //     'RE1': image.select('B5'),
  // //     }).rename('WDRVIre');
  // //   return wdrvire;
  // // };
  // app.calcWDRVIg = function(image) { //greenWDRVI
  //   var WDRVIg = image.expression(
  //     '(0.1 * NIR - GREEN) / (0.1 * NIR + GREEN) + 0.818', {
  //     'NIR': image.select('B5'),
  //     'GREEN': image.select('B3'),
  //     }).rename('WDRVIg');
  //   return WDRVIg;
  // };
  // マップ用関数：植生指数付加、スケール変換、リサンプル
  app.ScaleResample = function(image) {
    var scaledImg = image
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'], // old names
       ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']) // new names
      .multiply(0.0000275).subtract(0.2); // 反射率に変換
        // .select('B[2-8]', 'B8A', 'B11', 'B12')
        // .divide(10000);
    var brTemp = image
      .select(['ST_B10'], ['Temp'])
      .multiply(0.00341802).add(149).subtract(273.15); // 輝度温度(℃)に変換
    var ndvi = app.calcNDVI(scaledImg);
    var gndvi = app.calcGNDVI(scaledImg);
    var evi2 = app.calcEVI2(scaledImg);
    var WDRVIg = app.calcWDRVIg(scaledImg);
    return scaledImg.addBands(brTemp)
      .addBands(ndvi).addBands(gndvi)
      .addBands(evi2).addBands(WDRVIg)
      .resample('bilinear');
  };
  // // カラー合成画像の表示オプション
  // app.VIS_OPTIONS = {
  //   'トゥルーカラー': {
  //     description: 'RGB=B4/B3/B2',
  //     visParams: {
  //       gamma: 1.1,
  //       min:[0.01, 0.01, 0.01],
  //       max:[0.18, 0.18, 0.18],
  //       bands: ['B4', 'B3', 'B2']
  //     }
  //   },
  //   'フォールスカラー': {
  //     description: 'RGB=B6/B5/B4',
  //     visParams: {
  //       gamma: 1.1,
  //       min:[0.05, 0.05, 0.05],
  //       max:[0.50, 0.50, 0.50],
  //       bands: ['B6', 'B5', 'B4']
  //     }
  //   },
  // };
  // 主題図レイヤのカラーパレット
  // パレットライブラリ https://github.com/gee-community/ee-palettes
  var palettes = require('users/gena/packages:palettes');
  app.colorSchemes = {
    'グレースケール': ['black','white'],
    '赤～黄～緑':palettes.colorbrewer.RdYlGn[11],
    '茶～青緑':palettes.colorbrewer.BrBG[11],
    '緑（淡～濃）':palettes.colorbrewer.Greens[9],
    '茶～黄':palettes.colorbrewer.YlOrBr[5].reverse(),
    // '虹色（青～赤）':palettes.kovesi.rainbow_bgyr_35_85_c73[7],
    // '虹色（赤～青）':palettes.kovesi.rainbow_bgyr_35_85_c73[7].reverse(),
    '青-水-緑-黄-赤':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'],
    '赤-黄-緑-水-青':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'].reverse(),
    // '黒-白':['#111111','#EEEEEE'],
    // '白-黒':['#EEEEEE','#111111'],
  };
  app.colorRamp = app.colorSchemes['グレースケール']; // パレット初期値
  app.VIS_OPTIONS2 = {
    'VV偏波': {
      description: '',
      visParams: {
        'bands': ['VV'],
        'min': -20.0,'max':-5.0,
      }
    },
    'VH偏波': {
      description: '',
      visParams: {
        'bands': ['VH'],
        'min': -25.0,'max':-10.0,
      }
    },
    'VH/VV': {
      description: '',
      visParams: {
        'bands': ['VH/VV'],
        'min': 0.5,'max':2.5,
      }
    }
  }; // End of app.VIS_OPTIONS2.
  // 農地抽出マスク設定  
  app.MASK_OPTIONS = {
    '抽出なし': {
      clipFude: false,
      maskClass: '',
    },
    '描画領域': {
      clipFude: false,
      maskClass: 'draw',
    },
    '作業領域': {
      clipFude: false,
      maskClass: 'working',
    },
    '農地': {
      clipFude: true,
      maskClass: '',
    },
    // '農地・植生': {
    //   clipFude: true,
    //   maskClass: 'veg',
    // },
    // '農地・裸地畑': {
    //   clipFude: true,
    //   maskClass: 'bare',
    // },
    // '農地・湛水': {
    //   clipFude: true,
    //   maskClass: 'paddy',
    // },
    '水田2021': {
      clipFude: false,
      maskClass: 'paddy2021',
    },
  };  
  // 凡例用カラーバー作成
  app.setColorBar = function() {
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
    app.colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: app.makeColorBarParams(app.colorRamp),
      style: {
        stretch: 'horizontal',
        margin: '0 0.3em',
        maxHeight: '1.7em'},
    });
  };
  // 凡例表示
  app.legendMin = ui.Label({style: app.LEGEND_TEXT_STYLE});
  app.legendAve = ui.Label({
    style: {
      fontSize: '0.85em',
      margin: '0 0 0 0.3em',
      textAlign: 'center',
      stretch: 'horizontal'}
    });
  app.legendMax = ui.Label({style: app.LEGEND_TEXT_STYLE});
  app.legendDate = ui.Label({style: app.LEGEND_TEXT_STYLE});
  app.legendBands = ui.Label({style: app.LEGEND_TEXT_STYLE});
  app.legendLabels = ui.Panel({
    widgets: [
      app.legendMin,
      app.legendAve,
      app.legendMax,
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  app.setLegend = function() {
    app.setColorBar();
    app.legendPanel = ui.Panel({
      widgets: [
        app.legendDate,
        app.legendBands,
        app.colorBar,
        app.legendLabels
      ],
      style: {
        position: 'bottom-right',
        padding: '0.2em',
      }
    });
    Map.widgets().set(1, app.legendPanel);
  };
  app.setLegend(); // 凡例表示
  // app.legendPanel.style().set({'shown': true});
  // メインパネルの表示切り替え関数
  app.mainPanelControl = function() {
    app.filters.closeButton.onClick(function() {
      app.main.style().set('shown', false);
      app.openButton.style().set('shown', true);
      Map.setControlVisibility({
        layerList: false,
        mapTypeControl: false
      });
    });
    app.openButton = ui.Button({
      label: '設定',
      style: {position: 'top-left', padding: 0},
      onClick: function() {
        app.openButton.style().set('shown', false);
        app.main.style().set('shown', true);
        Map.setControlVisibility({
          layerList: true,
          mapTypeControl: true
        });
      }
    });
    Map.widgets().set(2, app.openButton);
    app.openButton.style().set('shown', false);
  };
  // カラー合成画像の表示
  // app.refreshMapLayer0 = function() {
  //   if (app.imageDateStr) {
  //     var imgDate = ee.Date(app.imageDateStr);
  //     var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
  //     app.mosaicimg = app.imgCollection
  //       .filterDate(dateRange)
  //       .map(app.ScaleResample).mean();
  //     app.mosaicimg = ee.Image.cat([app.mosaicimg, app.soilOM]); // 腐植マップを結合
  //     var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
  //     var imgname = 'Image:' + app.imageDateStr;
  //     var imgCheck = app.vis.checkColorComp.getValue();
  //     var ColorComposit = ui.Map.Layer(app.mosaicimg, visOption.visParams, imgname, imgCheck);
  //     Map.layers().set(0, ColorComposit);
  //   }
  // }; // カラー合成画像の表示終了
  // 主題図レイヤの表示
  app.refreshMapLayer = function() {
    // var imageDateStr = app.picker.select.getValue();
    if (app.imageDateStr) {
      var option2 = app.VIS_OPTIONS2[app.visTmap.select.getValue()];
      option2.visParams.palette = app.colorRamp;
      var bands = option2.visParams.bands;
      app.legendDate.style().set({'shown': true});
      app.legendBands.setValue(bands);
      var visMin = option2.visParams.min;
      var visMax = option2.visParams.max;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      // 衛星画像の加工とモザイク
      var imgDate = ee.Date(app.imageDateStr);
      var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
      var mosaicimg = app.imgCollection
        .filter(ee.Filter.eq('orbitProperties_pass', app.orbitDirection))
        .filterDate(dateRange)
        .map(app.addBands).mosaic();
      var mapImg = mosaicimg;
      var mapImgname = bands + ':' + app.imageDateStr;
      var mapImgCheck = app.visTmap.checkVI.getValue();
      var mapImgAg = mapImg.clipToCollection(app.Fudepoly); // 農地の切り出し
      var mapImgPaddy2021 = mapImg.clipToCollection(app.fudePaddy2021); // 湛水農地2021
      var maskOption = app.MASK_OPTIONS[app.visTmap.selectMask.getValue()];
      app.visTmapImg = mapImg;
      if (maskOption.maskClass == 'draw') {
        if (Map.drawingTools().layers().get(0)) {
          var aoiDraw = (Map.drawingTools())
            .toFeatureCollection('layer');
          app.visTmapImg = mapImg.clip(aoiDraw);
          Map.drawingTools().layers().get(0).setShown(false);
        }
      }
      if (maskOption.maskClass == 'working') {
        if (app.aoiFc) {
          app.visTmapImg = mapImg.clipToCollection(app.aoiFc);
        }
      }
      if (maskOption.clipFude) { 
        app.visTmapImg = mapImgAg;
      }
      if (maskOption.maskClass == 'paddy2021') {
        app.visTmapImg = mapImgPaddy2021;
      }
      var VImap = ui.Map.Layer(app.visTmapImg, option2.visParams, mapImgname, mapImgCheck);
      Map.layers().set(0, VImap);
    }
  }; // 主題図レイヤの更新終了
  // 主題図レイヤのMinMax自動調整
  app.setVisTmapMinMax = function() {
    var mapBounds = ee.Geometry.Rectangle(Map.getBounds());
    var currentVisParams = Map.layers().get(0).getVisParams();
    var band = currentVisParams.bands[0];
    var currentScale = Map.getScale() * 5;
    var imgStats = app.visTmapImg
      .select([band])
      .reduceRegion({
        reducer: ee.Reducer.percentile([2,98]),
        geometry: mapBounds,
        scale: currentScale,
      });
    imgStats.evaluate(function(stats) {
      var visMin = stats[band + '_p2'];
      var visMax = stats[band + '_p98'];
      visMin = Math.round(visMin * 100) / 100;
      visMax = Math.round(visMax * 100) / 100;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      currentVisParams.min = visMin;
      currentVisParams.max = visMax;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      Map.layers().get(0).setVisParams(currentVisParams);
    });
  };
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
  // 拡張機能ウィジエットの表示ON/OFF
  app.setExFunc = function(shown) {
    var exFuncWidgets = [
      app.data.geojsonImportButton,
　　　app.data.fudeFcButton,
      app.data.fcBufferLabel,
      app.data.fcBuffer,
      app.data.setGridLabel,
      app.data.gridSpacingLabel,
      app.data.gridSpacing,
      app.data.setGridButton,
      app.data.fcExportButton,
      app.data.dispFcDataButton,
      app.data.dispGridDataButton,
      app.data.otherFuncLabel,
      app.data.userPlaces,
    ];
    exFuncWidgets.forEach(function(widget) {
      widget.style().set('shown', shown);
    });
  };
  // 描画ジオメトリにバッファを適用し、FeatureCollectionを発生
  app.setAoiBuffer = function() {
    var drawingTools = Map.drawingTools();
    var aoiBuffSize = app.data.fcBuffer.getValue();
    var fcSetBuffer = function(feature) {
      return feature
        .setGeometry(feature.geometry().buffer(aoiBuffSize, 1.0));
    };
    if (drawingTools.layers().get(0)){
      app.aoiFc = drawingTools
        .toFeatureCollection()
        .map(fcSetBuffer);
      var aoiImg = (app.aoiFc).
        draw({color:'#FF44FF', pointRadius:3, strokeWidth:3});
      var aoiImgLayer = ui.Map.Layer(aoiImg, {}, 'aoiImg');
      Map.layers().set(4, aoiImgLayer);
    }
  };
  // GeoJSON入力関数
  app.geojsonImport = function() {
    // FC-FC入力関数
    var importFcFc = function(text) {
      app.clearAoi();
      // Map.drawingTools().clear();
      Map.drawingTools().setShown(false);
      app.aoiFc = ee.FeatureCollection(JSON.parse(text));
      Map.centerObject(app.aoiFc);
      var aoiImg = (app.aoiFc)
        .draw({color:'#FF44FF', pointRadius:5, strokeWidth:3});
      var aoiImgLayer = ui.Map.Layer(aoiImg, {}, 'aoiImg');
      Map.layers().set(3, aoiImgLayer);
　　  Map.layers().set(4, {shown: false});
      importFcFcBox.setValue('', false); //テキストボックスのクリア
    };
    // FC-Geo入力関数
    var importFcGeo = function(text) {
      app.clearAoi();
      Map.drawingTools().setShown(true);
      var aoiFc = ee.FeatureCollection(JSON.parse(text));
      Map.centerObject(aoiFc);
      var aoiGeo = aoiFc.union(0.5).geometry();
      aoiGeo.evaluate(function(geo) {
        Map.drawingTools().addLayer([geo], 'importGeo');
        importFcGeoBox.setValue('', false);
      });
    };
    // Geo-Geo入力関数
    var importGeoGeo = function(text) {
      app.clearAoi();
      Map.drawingTools().setShown(true);
      var aoiGeo = ee.Geometry(JSON.parse(text));
      Map.centerObject(aoiGeo);
      Map.drawingTools().addLayer([aoiGeo], 'importGeo');
      importGeoGeoBox.setValue('', false);
    };
    // パネル設定
    var title = ui.Label('GeoJSONのインポート', app.SUBHEADER_TEXT_STYLE);
    var subtitle = ui.Label('いずれかのボックス内にテキストを入力後[Enter]', app.LEGEND_TEXT_STYLE);
    var labelFcFc = ui.Label('● FeatureCollectionを取込領域に変換（属性を保持）',
      app.LEGEND_TEXT_STYLE);
    var importFcFcBox = ui.Textbox({
      placeholder: 'FeatureCollection',
      onChange: importFcFc,
      style: app.WIDGETS_STYLE,
    });
    var labelFcGeo = ui.Label('● FeatureCollectionを描画領域に変換', 
      app.LEGEND_TEXT_STYLE);
    var importFcGeoBox = ui.Textbox({
      placeholder: 'FeatureCollection',
      onChange: importFcGeo,
      style: app.WIDGETS_STYLE,
    });
    var labelGeoGeo = ui.Label('● Geometryを描画領域に変換', 
      app.LEGEND_TEXT_STYLE);
    var importGeoGeoBox = ui.Textbox({
      placeholder: 'GeometryCollection',
      onChange: importGeoGeo,
      style: app.WIDGETS_STYLE,
    });
    var importPanel = ui.Panel({
      widgets: [
        title,
        subtitle,
        labelFcFc,
        importFcFcBox,
        labelFcGeo,
        importFcGeoBox,
        labelGeoGeo,
        importGeoGeoBox,
      ],
    });
    app.dispDataPanel.clear();
    app.dispDataPanel.style().set('shown', true);
    app.dispDataPanel.widgets().set(0, importPanel);
    app.dispDataPanel.add(app.dispDataPanelCloseButton);
  }; //GeoJSON入力関数終了
  // グリッドFC発生関数
  app.setGrid = function() {
    app.aoiGridBounds = null;
    app.aoiGrid = null;
    var aoiFc;
    if (Map.drawingTools().layers().get(0)) {
      aoiFc = (Map.drawingTools()).toFeatureCollection('layer');
    }
    if (app.aoiFc) {
      aoiFc = app.aoiFc;
    }
    if (aoiFc) {
      var aoiGeo = aoiFc.geometry();
      // var fcBuffer = app.data.fcBuffer.getValue();
      var gridScale = app.data.gridSpacing.getValue();
      aoiGeo = aoiGeo.buffer(gridScale*(-0.9));
      app.aoiGridBounds = aoiGeo; // グリッド発生に用いた領域を保存
      app.aoiGrid = aoiGeo
        .coveringGrid({proj:'EPSG:3857', scale: gridScale});
      var aoiBounds = ee.Image().byte().paint({
        featureCollection: app.aoiGrid,
        color: 1,
        width: 1
      });
      var aoiBoundsLayer = ui.Map.Layer(aoiBounds, {palette: '#FF44FF'}, 'aoiBounds');
　　  Map.layers().set(4, aoiBoundsLayer);
      Map.layers().set(3, {shown: false});
    } // end of if
  };
  // 筆ポリゴンFC抽出関数
  app.setFudeFc = function() {
    if (Map.drawingTools().layers().get(0)) {
      var aoiGeo = Map.drawingTools().layers().get(0).toGeometry();
      app.aoiFc = app.Fudepoly.filterBounds(aoiGeo);
      var aoiBounds = ee.Image().byte().paint({
        featureCollection: app.aoiFc,
        color: 1,
        width: 2
      });
      var aoiBoundsLayer = ui.Map.Layer(aoiBounds, {palette: '#FF44FF'}, 'aoiBounds');
　　  Map.layers().set(4, aoiBoundsLayer);
      Map.layers().set(3, {shown: false});
    } // end of if
  };
  // 領域設定クリア関数
  app.clearAoi = function(){
    Map.drawingTools().clear();
    // Map.drawingTools().setShown(false);
    // app.dispDataPanel.clear();
    // app.dispDataPanel.style().set('shown', false);
    if (app.aoiFc){
      app.aoiFc = null;
    }
    if (app.aoiGrid){
      app.aoiGrid = null;
    }
    Map.layers().set(3, {shown: false});
    Map.layers().set(4, {shown: false});
    app.data.fcBuffer.setValue(0, false);
  };
  // 設定領域の保存
  app.fcExport = function() {
    var title = ui.Label('領域保存', app.SUBHEADER_TEXT_STYLE);
    var title2 = ui.Label('（リンクをクリックしてダウンロード）', app.LEGEND_TEXT_STYLE);
    var subtitle1 = ui.Label('● GeoJson (FeatureCollection)', app.LEGEND_TEXT_STYLE);
    var labelDraw = ui.Label('描画領域, ', app.LEGEND_TEXT_STYLE);
    var labelFc = ui.Label('バッファ・取込・抽出領域, ', app.LEGEND_TEXT_STYLE);
    var labelGrid = ui.Label('グリッド ', app.LEGEND_TEXT_STYLE);
    var urlPanel1 = ui.Panel({
      widgets: [
        labelDraw,
        labelFc,
        labelGrid,
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var subtitle2 = ui.Label('● CSV', app.LEGEND_TEXT_STYLE);
    var labelDraw2 = ui.Label('描画領域, ', app.LEGEND_TEXT_STYLE);
    var labelFc2 = ui.Label('バッファ・取込・抽出領域, ', app.LEGEND_TEXT_STYLE);
    var urlPanel2 = ui.Panel({
      widgets: [
        labelDraw2,
        labelFc2,
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var geoPanel = ui.Panel({widgets: [
      title, title2, subtitle1, urlPanel1,
      subtitle2, urlPanel2, 
      ]});
    var dlUrlJson = function(aoi, fileNam) {
      return aoi
        .getDownloadURL({format: 'json', filename: fileNam});
    };
    var dlUrlCsv = function(aoi, fileNam) {
      return aoi
        .getDownloadURL({format: 'csv', filename: fileNam});
    };
    if (Map.drawingTools().layers().get(0)) {
      var aoiDraw = (Map.drawingTools()).toFeatureCollection('layer');
      var urlDraw = dlUrlJson(aoiDraw, 'draw');
      var urlDraw2 = dlUrlCsv(aoiDraw.union(0.5), 'draw');
      labelDraw.setUrl(urlDraw);
      labelDraw2.setUrl(urlDraw2);
    }
    if (app.aoiFc) {
      var aoiFc = app.aoiFc;
      var urlFc = dlUrlJson(aoiFc, 'aoi');
      var urlFc2 = dlUrlCsv(aoiFc.union(0.5), 'aoi');
      labelFc.setUrl(urlFc);
      labelFc2.setUrl(urlFc2);
    }
    if (app.aoiGrid) {
      var urlGrid = dlUrlJson(app.aoiGrid, 'grid');
      labelGrid.setUrl(urlGrid);
    }
    app.dispDataPanel.clear();
    app.dispDataPanel.style().set('shown', true);
    app.dispDataPanel.widgets().set(0, geoPanel);
    app.dispDataPanel.add(app.dispDataPanelCloseButton);
  };
  // 領域内を5段階ゾーニング
  app.aoiZoning = function(aoiFc) {
    var aoi = aoiFc.geometry();
    var currentVisParams = Map.layers().get(0).getVisParams();
    var visBand = currentVisParams.bands[0];
    var visImg = app.visTmapImg.select([visBand]).clip(aoi);
    visImg = visImg.focal_median({ // 平滑化
      radius: 20,
      units: 'meters',
      iterations: 1,
    });
    var currentScale = Map.getScale();
    var statsDic = visImg.reduceRegion({ // 領域内パーセンタイル算出
      reducer: ee.Reducer.percentile([20, 40, 50, 60, 80]),
      scale: currentScale,
      bestEffort: true,
    });
    // 領域をパーセンタイルで５分割
    statsDic.evaluate(function(stats) {
      var th1 = stats[visBand + '_p20'];
      var th2 = stats[visBand + '_p40'];
      var th3 = stats[visBand + '_p60'];
      var th4 = stats[visBand + '_p80'];
      // 5分割画像
      var zones = visImg.gte(0)
        .add(visImg.gt(th1)).add(visImg.gt(th2))
        .add(visImg.gt(th3)).add(visImg.gt(th4));
      var visParams = {min: 1, max: 5, palette: app.colorRamp};
      var zonesName = 'Zones_' + visBand;
      var zonesLayer = ui.Map.Layer(zones, visParams, zonesName, true);
　　  Map.layers().set(3, zonesLayer, 'zones');
      // 5分割ポリゴン
      var zonesFC = zones.addBands(visImg).reduceToVectors({
        geometry: aoi,
        scale: currentScale,
        geometryType: 'polygon',
        eightConnected: false,
        labelProperty: 'zone',
        reducer: ee.Reducer.mean()
      });
　　  var zonesPolygon = ee.Image(0).updateMask(0).paint(zonesFC, '000000', 1);
　　  var zonesFCLayer = ui.Map.Layer(zonesPolygon, {palette: '000000'}, 'zonesPolygon', false);
　　  Map.layers().set(4, zonesFCLayer);
　　  if (Map.drawingTools().layers().get(0)) {
　　    Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
　　  }
　　  // パネル表示設定
      var obsDate = app.imageDateStr;
　　  var dlName = visBand + '_' + obsDate;
      var downloadArgs = {
        name: dlName,
        crs: 'EPSG:3857',
        scale: 10,
        region: aoi
      };
      var median = (stats[visBand + '_p50']).toFixed(3);
      var label1 = ui.Label(dlName + ', 中央値: ' + median, app.LEGEND_TEXT_STYLE);
      var label2 = ui.Label('パーセンタイル(0, 20, 40, 60, 80)', app.LEGEND_TEXT_STYLE);
      var Label_STYLE = {
        margin: '0 0 0 0.5em',
        fontSize: '0.85em',
        stretch: 'horizontal',
      };
      var label3 = ui.Panel({
        widgets: [
          ui.Label('0', Label_STYLE),
          ui.Label(th1.toFixed(3), Label_STYLE),
          ui.Label(th2.toFixed(3), Label_STYLE),
          ui.Label(th3.toFixed(3), Label_STYLE),
          ui.Label(th4.toFixed(3), Label_STYLE),
        ],
        layout: ui.Panel.Layout.flow('horizontal'),
      });
      var colorBar =  ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: app.makeColorBarParams(app.colorRamp),
        style: {
          stretch: 'horizontal',
          margin: '0 0.3em',
          maxHeight: '0.8em'},
      });
      var imgUrl = zones.getDownloadURL(downloadArgs);
      var dlUrl = function(formatNam) {
        return zonesFC.getDownloadURL({format: formatNam, filename: dlName});
      };
      var dlUrlCSV = dlUrl('CSV');
      var dlUrlKML = dlUrl('kml');
      var dlUrlJSON = dlUrl('json');
      var dlLabelGeoTIFF = ui.Label('GeoTIFF', app.LEGEND_TEXT_STYLE)
        .setUrl(imgUrl);
      var dlLabelCSV = ui.Label('CSV, ', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlCSV);
      var dlLabelKML = ui.Label('KML, ', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlKML);
      var dlLabelJSON = ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlJSON);
      var zoningPanel = ui.Panel({
        widgets: [
          label1, label2, label3,
          colorBar,
          dlLabelGeoTIFF,
          ui.Panel([
            dlLabelCSV, dlLabelKML, dlLabelJSON,
          ], ui.Panel.Layout.flow('horizontal')),
        ],
      });
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', true);
      app.dispDataPanel.widgets().set(0, zoningPanel);
      app.dispDataPanel.add(app.dispDataPanelCloseButton);
    });
  }; // ゾーニング終了
  // 領域ヒストグラム
  app.aoiHistogram = function(aoiFc) {
      var obsDate = app.imageDateStr;
      var currentVisParams = Map.layers().get(0).getVisParams();
      var visBand = currentVisParams.bands[0];
      var currentScale = Math.max(Map.getScale(), 10);
      var chartTitle = 'ヒストグラム: ' + obsDate;
      var chart = ui.Chart.image.histogram({
        image: app.visTmapImg.select(visBand),
        region: aoiFc,
        scale: currentScale,
        maxBuckets: 20,
      });
      var chartOptions = {
        title: chartTitle,
        vAxis: {title: '頻度'},
        hAxis: {title: visBand},
      };
      chart.setOptions(chartOptions);
      var chartPanel = ui.Panel({
        widgets: [chart],
        style: {width: '30em'}
      });
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', true);
      app.dispDataPanel.widgets().set(0, chartPanel);
      app.dispDataPanel.add(app.dispDataPanelCloseButton);
  }; // 領域ヒストグラム終了     
  // FC平均表示関数
  app.showFcMean = function(aoiFc, aoiGeo, title) {
    if (Map.drawingTools().layers().get(0)) {
　　  Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
　　}
    // FCに日付とidを属性として追加
    var obsDate = app.imageDateStr;
    var setDate = function(feature) {
      return feature.set({date: obsDate, idName: feature.id()});
    };
    aoiFc = aoiFc.map(setDate);
    var currentVisParams = Map.layers().get(0).getVisParams();
    var visBand = currentVisParams.bands[0];
    var dlLabel = ui.Label(obsDate + ', ' + visBand,
        app.LEGEND_TEXT_STYLE);
    var colorBar =  ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: app.makeColorBarParams(app.colorRamp),
      style: {
        stretch: 'horizontal',
        margin: '0 0.3em',
        maxHeight: '0.8em',
        minWidth: '10em'},
    });
    // FCによる画像集計
    var sampleFC = app.visTmapImg.reduceRegions({
      collection: aoiFc,
      reducer: ee.Reducer.mean(),
      scale: 10,
    });
    // 領域内画像の統計量に基づく画像表示
    var visImg = app.visTmapImg.select([visBand]);
    var currentScale = Map.getScale();
    var statsDic = visImg.reduceRegion({ // 領域内パーセンタイル算出
      reducer: ee.Reducer.percentile([5,50,95]),
      geometry:aoiGeo,
      scale: currentScale,
      bestEffort: true,
    });
    statsDic.evaluate(function(stats) {
      var visMin = stats[visBand + '_p5'];
      var visMed = stats[visBand + '_p50'];
      var visMax = stats[visBand + '_p95'];
      var legendLabels = ui.Panel({
        widgets: [
          ui.Label(visMin.toFixed(3), app.LEGEND_TEXT_STYLE),
          ui.Label(visMed.toFixed(3), {
            margin: '0 0 0 0.5em',
            fontSize: '0.85em',
            textAlign: 'center',
            stretch: 'horizontal'}),
          ui.Label(visMax.toFixed(3), app.LEGEND_TEXT_STYLE),
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var aoiImg = sampleFC
        .reduceToImage({
           properties: [visBand],
           reducer: ee.Reducer.first()});
      var visParams = {bands:'first', min: visMin, max: visMax, palette: app.colorRamp};    
      var aoiImgLayer = ui.Map.Layer(aoiImg, visParams, 'aoiImg', true);
　　  Map.layers().set(3, aoiImgLayer);
　　  var aoiBounds = ee.Image().byte().paint({
        featureCollection: sampleFC,
        color: 1,
        width: 1
      });
　　  var aoiBoundsLayer = ui.Map.Layer(aoiBounds, {palette: '#000000'}, 'aoiBounds');
　　  Map.layers().set(4, aoiBoundsLayer);
　　  // ダウンロードリンク、凡例の表示
      var dlUrl = function(formatNam) {
        return sampleFC.getDownloadURL({format: formatNam, filename: 'aoi' + obsDate});
      };
      var dlUrlCSV = dlUrl('CSV');
      var dlUrlKML = dlUrl('kml');
      var dlUrlJSON = dlUrl('json');
      var dlLabelCSV = ui.Label('CSV, ', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlCSV);
      var dlLabelKML = ui.Label('KML, ', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlKML);
      var dlLabelJSON = ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE)
        .setUrl(dlUrlJSON);
      var showUrlPanel = ui.Panel({
        widgets: [
          dlLabel,
          colorBar,
          legendLabels,
          ui.Panel([
            dlLabelCSV, dlLabelKML, dlLabelJSON,
          ], ui.Panel.Layout.flow('horizontal')),
        ],
      });
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', true);
      app.dispDataPanel.widgets().set(0, showUrlPanel);
      app.dispDataPanel.add(app.dispDataPanelCloseButton);
    });
  }; // FC平均表示関数終了
  // // 時系列チャート用マスク関数
  // app.maskS2 = function(image) {
  //   var qa = image.select('QA60');
  //   var cloudBitMask = 1 << 10;
  //   var cirrusBitMask = 1 << 11;
  //   var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
  //             qa.bitwiseAnd(cirrusBitMask).eq(0));
  //   return image.updateMask(mask);
  // };
  // app.maskS2_SR = function(image) {
  //   var cloudProb = image.select('MSK_CLDPRB');
  //   var snowProb = image.select('MSK_SNWPRB');
  //   var cloud = cloudProb.lt(5);
  //   var snow = snowProb.lt(5);
  //   var scl = image.select('SCL'); 
  //   var cirrus = scl.eq(10); // 10 = cirrus
  //   var mask = (cloud.and(snow)).and(cirrus.neq(1));
  //   return image.updateMask(mask);
  // };
  // // 時系列チャート用、植生指数付加、スケール変換
  // app.scaleVI = function(image) {
  //   var scaledImg = image.select('B[2-8]', 'B8A', 'B11', 'B12')
  //     .divide(10000);
  //   var ndvi = app.calcNDVI(scaledImg);
  //   var gndvi = app.calcGNDVI(scaledImg);
  //   var evi2 = app.calcEVI2(scaledImg);
  //   // var WDRVIre = app.calcWDRVIre(scaledImg);
  //   var WDRVIg = app.calcWDRVIg(scaledImg);
  //   return scaledImg.addBands(ndvi).addBands(gndvi)
  //     .addBands(evi2).addBands(WDRVIg)
  //     // .addBands(WDRVIre)
  //     .copyProperties(image, ['system:time_start']);
  // };
  // // チャート用画像コレクション
  // app.setChartCollection = function(chartData) {
  //   var yearS = app.filters.selectYear.getValue();
  //   var dateStart = ee.Date(yearS + '-03-01');
  //   var dateEnd = dateStart.advance(9, 'month');
  //   // var datasetName = app.filters.dataSetSelect.getValue();
  //   // if (datasetName == '大気補正あり') {
  //   //   app.imgMask = app.maskS2_SR;
  //   // } else {
  //   //   app.imgMask = app.maskS2;
  //   // }
  //   // if (chartData == 'VI') {
  //     app.chartCollection = app.imgCollection
  //       .filterBounds(Map.getCenter())
  //       .filterDate(dateStart, dateEnd)
  //       .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', app.cloudCover))
  //       .map(app.imgMask).map(app.scaleVI);
  //   // }
  //   // if (chartData == 'Cloud') {
  //   //   app.chartCollection = app.s2Clouds
  //   //     .filterBounds(Map.getCenter())
  //   //     .filterDate(dateStart, dateEnd);
  //   // }
  // }; 
  // // 時系列チャート用関数：雲マスク、植生指数付加、スケール変換
  // app.MaskS2clouds = function(image) {
  //   var scaledImg = image
  //     .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'], // old names
  //     ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']) // new names
  //     .multiply(0.0000275).subtract(0.2);
  //   var brTemp = image
  //     .select(['ST_B10'], ['Temp/100'])
  //     .multiply(0.0000341802).add(1.49).subtract(2.7315); // 輝度温度(℃)/100に変換
  //   var ndvi = app.calcNDVI(scaledImg);
  //   var gndvi = app.calcGNDVI(scaledImg);
  //   var evi2 = app.calcEVI2(scaledImg);
  //   var wdrvig = app.calcWDRVIg(scaledImg);
  //   var qa = image.select('QA_PIXEL');
  //   // Bits 4 and 3 are cloud shadow and cloud, respectively.
  //   var cloudShadowBitMask = (1 << 4);
  //   var cloudsBitMask = (1 << 3);
  //   // Both flags should be set to zero, indicating clear conditions.
  //   var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
  //               .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  //   return scaledImg.addBands(brTemp)
  //     .addBands(ndvi).addBands(gndvi).addBands(evi2).addBands(wdrvig)
  //     .updateMask(mask).copyProperties(image, ['system:time_start']);
  // };
  // 時系列チャート用画像コレクション作成関数
  app.setChartCollection = function() {
    var startYear = app.filters.selectYear.getValue();
    var startMonth = app.filters.selectMonth.getValue();
    var startDate = ee.Date(startYear + '-' + startMonth + '-01');
    app.chartCollection = app.imgCollection
      .filter(ee.Filter.eq('orbitProperties_pass', app.orbitDirection))
      .filterBounds(Map.getCenter())
      .filterDate(startDate, startDate.advance(1, 'year'))
      .map(app.addBands);
  };
  // 領域一括チャート
  app.aoiChart = function(aoiFc) {
      // var datasetName = app.filters.dataSetSelect.getValue();
      var currentScale = Math.max(Map.getScale(), 10);
      app.setChartCollection(); // 画像コレクション作成
      var chartTitle = '後方散乱係数推移' + app.orbitDirection;
      var chart = ui.Chart.image.series({
        imageCollection: app.chartCollection,
        region: aoiFc,
        reducer: ee.Reducer.mean(),
        scale: currentScale,
      });
      var chartOptions = {
      title: '後方散乱係数推移: ' + app.orbitDirection,
      vAxes: { // 注意!複数形Axes
        0: {title: 'VV, VH 後方散乱係数(dB)'},
        1: {title: 'VH/VV', baselineColor: 'transparent'}
      },
      hAxis: {title: 'Date', format: 'yyyy-MM-dd'},
      interpolateNulls: true,
      lineWidth: 1,
      pointsVisible: true,
      pointSize: 4,
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1},
        2: {targetAxisIndex: 0},
      },
      legend: {position: 'top'},
    };
      chart.setOptions(chartOptions);
      var chartPanel = ui.Panel({
        widgets: [chart],
        style: {width: '30em'}
      });
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', true);
      app.dispDataPanel.widgets().set(0, chartPanel);
      app.dispDataPanel.add(app.dispDataPanelCloseButton);
  }; // 領域一括チャート終了  
  // 領域個別チャート
  app.fcChart = function(aoiFc) {
    var currentVisParams = Map.layers().get(0).getVisParams();
    var visBand = currentVisParams.bands[0];
    var currentScale = Math.max(Map.getScale(), 10);
    // if (visBand != 'OM') {
      // var datasetName = app.filters.dataSetSelect.getValue();
      app.setChartCollection(); // チャート用画像コレクション作成
      var chart = ui.Chart.image.seriesByRegion({
        imageCollection: app.chartCollection,
        regions: aoiFc,
        reducer: ee.Reducer.mean(),
        band: visBand,
        scale: currentScale,
        seriesProperty: 'system:index'
      });
      var chartOptions = {
        title: visBand + '推移: ',
        vAxis: {title: visBand},
        hAxis: {title: 'Date', format: 'yyyy-MM-dd'},
        interpolateNulls: true,
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 4,
      };
      chart.setOptions(chartOptions);
      var chartPanel = ui.Panel({
        widgets: [chart],
        style: {width: '30em'}
      });
      app.dispDataPanel.clear();
      app.dispDataPanel.style().set('shown', true);
      app.dispDataPanel.widgets().set(0, chartPanel);
      app.dispDataPanel.add(app.dispDataPanelCloseButton);
    // } // end of if
  }; // 領域個別チャート終了
  // データ表示関数
  app.dispAoiData = function(aoiFc, titleText) {
    var aoiFcUnion;
    var aoiGeo;
    if (titleText != 'グリッド'){
      aoiFcUnion = aoiFc.union(0.5);
      aoiGeo = aoiFcUnion.geometry();
    } else {
      aoiGeo = app.aoiGridBounds; // 画像統計用の領域
    }
    var title = ui.Label(titleText + 'データ', app.SUBHEADER_TEXT_STYLE);
    var subtitle1 = ui.Label('・領域全体を一括', app.LEGEND_TEXT_STYLE);
    var statsButton1 = ui.Button({
      label: '集計（平均）',
      onClick: function() {app.showFcMean(aoiFcUnion, aoiGeo, '領域一括平均');},
      style: app.WIDGETS_STYLE,
    });
    var chartButton1 = ui.Button({
      label: '時系列チャート',
      onClick: function() {app.aoiChart(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var histogramButton1 = ui.Button({
      label: 'ヒストグラム',
      onClick: function() {app.aoiHistogram(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var zoningButton1 = ui.Button({
      label: 'ゾーニング',
      onClick: function() {app.aoiZoning(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var panel1 = ui.Panel({
      widgets: [
        subtitle1,
        ui.Panel([
          statsButton1,
          chartButton1,
          histogramButton1,
          zoningButton1
        ], ui.Panel.Layout.flow('horizontal')),
      ],
    });
    var subtitle2 = ui.Label('・複数領域を個別に', app.LEGEND_TEXT_STYLE);
    var statsButton2 = ui.Button({
      label: '集計（平均）',
      onClick: function() {app.showFcMean(aoiFc, aoiGeo, '領域個別平均');},
      style: app.WIDGETS_STYLE,
    });
    var chartButton2 = ui.Button({
      label: '時系列チャート',
      onClick: function() {app.fcChart(aoiFc)},
      style: app.WIDGETS_STYLE,
    });
    // var chartButton3 = ui.Button({
    //   label: '時系列雲確率',
    //   onClick: function() {app.cloudChart(aoiFc)},
    //   style: app.WIDGETS_STYLE,
    // });
    var panel2 = ui.Panel({
      widgets: [
        subtitle2,
        ui.Panel([
          statsButton2,
          chartButton2,
          // chartButton3,
        ], ui.Panel.Layout.flow('horizontal')),
      ],
    });
    var panel3 = ui.Panel({
      widgets: [title, panel1, panel2],
      style: {width: '30em'}
    });
    if (titleText == 'グリッド'){
      panel1.style().set('shown', false);
    } else {
      panel1.style().set('shown', true);
    }
    app.dispDataPanel.clear();
    app.dispDataPanel.style().set('shown', true);
    app.dispDataPanel.widgets().set(0, panel3);
    app.dispDataPanel.add(app.dispDataPanelCloseButton);
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
      app.picker.panel,
      // app.vis.panel,
      app.visTmap.panel,
      app.data.panel,
      app.miscPanel
    ],
    style: {width: '14em', padding: '0.4em'}
  });
  ui.root.insert(0, app.main);
  app.mainPanelControl();
};
app.boot();