// Landsat-8&9_app
// Landsat-8&9 画像検索（地表面反射率）
// USGS Landsat 8&9 Level 2, Collection 2対応
var app = {}; //空のオブジェクト生成
// UIメインパネル作成開始
app.createPanels = function() {
  // 画像検索パネル1
  app.filters = {
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0 0 0 6em'},
    }),
    dataSetSelect: ui.Select({
      items: Object.keys(app.dataset),
      value: Object.keys(app.dataset)[0],
      onChange: function(key) {
        app.imgCollection = app.dataset[key].collection;
        app.filters.selectYear.items().reset(app.dataset[key].yearList);
      },
      style: app.WIDGETS_STYLE,
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
    selectYear: ui.Select({ // 検索開始年選択
      items: app.dataset[Object.keys(app.dataset)[0]].yearList,
      value: app.startYear,
      placeholder: '年選択',
      style: app.WIDGETS_STYLE,
    }),
    selectMonth: ui.Select({ // 検索開始月選択
      items: app.monthList,
      value: app.startMonth,
      style: app.WIDGETS_STYLE,
    }),
    cloudcover: ui.Slider({ // 雲量上限設定
      min: 10,
      max: 100,
      value: 50,
      step: 10,
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
    }),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  app.filters.panel = ui.Panel({
    widgets: [
      app.filters.closeButton,
      ui.Label('Landsat-8 & 9', app.HEADER_TEXT_STYLE),
      ui.Label('1. 画像検索', app.HEADER_TEXT_STYLE),
      app.filters.dataSetSelect,
      ui.Panel([
        app.filters.sArea,
        app.filters.geoButton
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('開始年・月', app.HELPER_TEXT_STYLE), 
      ui.Panel([
        app.filters.selectYear,
        app.filters.selectMonth
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('雲量の上限(%)', app.HELPER_TEXT_STYLE),
      app.filters.cloudcover,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  // 観測日選択パネル
  app.picker = {
    select: ui.Select({
      placeholder: '検索待ち',
      onChange: function(key) {
        app.legendDate.setValue(key);
        app.imageDateStr = key;
        app.refreshMapLayer0();
        app.refreshMapLayer1();
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
  // 画像表示パネル1
  app.vis = {
    checkColorComp: ui.Checkbox({ // 表示ON/OFF
      value:true,
      onChange: function(checked) {
        Map.layers().get(0).setShown(checked);},
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // カラー合成の選択
      items: Object.keys(app.VIS_OPTIONS),
      value: Object.keys(app.VIS_OPTIONS)[0],
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        app.vis.label.setValue(option.description);
        app.refreshMapLayer0();
      },
      style: app.WIDGETS_STYLE,
    }),
    label: ui.Label( // カラー合成説明
      app.VIS_OPTIONS[Object.keys(app.VIS_OPTIONS)[0]]
      .description, app.HELPER_TEXT_STYLE),
    setVisButton: ui.Button({ // コントラスト調整
      label: '調整',
      onClick: app.setVisMinMax,
      style: app.WIDGETS_STYLE,
    }),
    checkAdBounds: ui.Checkbox({ // 市町村界描画
      label: '町村界',
      onChange: function(checked) {
        Map.layers().get(2).setShown(checked);
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
        Map.layers().get(3).setShown(checked);
      },
      style: app.WIDGETS_STYLE
    }),
  };
  app.vis.panel = ui.Panel({
    widgets: [
      // ui.Label('3. マップ表示', app.HEADER_TEXT_STYLE),
      ui.Label('●カラー合成画像', app.SUBHEADER_TEXT_STYLE),
      ui.Panel([
        app.vis.checkColorComp,
        app.vis.select,
        app.vis.setVisButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis.label,
      ui.Panel([
      app.vis.checkAdBounds,
      app.vis.checkFudeBounds,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
  // 画像表示パネル2
  app.visTmap = {
    checkVI: ui.Checkbox({ // レイヤ表示ON/OFF
      value:false,
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked);
        app.legendPanel.style().set('shown', checked);
      },
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // 植生指数の選択
      items: Object.keys(app.VIS_OPTIONS2),
      value: Object.keys(app.VIS_OPTIONS2)[0],
      onChange: function(key) {
        var option2 = app.VIS_OPTIONS2[key];
        app.visTmap.label.setValue(option2.description);
        app.refreshMapLayer1();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisTmapButton: ui.Button({
      label: '調整', // コントラスト自動調整
      onClick: app.setVisTmapMinMax,
      style: app.WIDGETS_STYLE,
    }),
    label: ui.Label(
      app.VIS_OPTIONS2[Object.keys(app.VIS_OPTIONS2)[0]]
      .description, app.HELPER_TEXT_STYLE),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      value: Object.keys(app.MASK_OPTIONS)[0],
      placeholder: '画像抽出',
      onChange: app.refreshMapLayer1,
      style: app.WIDGETS_STYLE,
    }),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      placeholder: '表示配色',
      onChange: function(key) {
        app.colorRamp = app.colorSchemes[key];
        var currentVisParams = Map.layers().get(1).getVisParams();
        currentVisParams.palette = app.colorRamp;
        Map.layers().get(1).setVisParams(currentVisParams);
        app.legendPanel.clear();
        app.setLegend();
        var viCheck = app.visTmap.checkVI.getValue();
        app.legendPanel.style().set('shown', viCheck);
      },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.visTmap.panel = ui.Panel({
    widgets: [
      ui.Label('●植生指数・反射率など', app.SUBHEADER_TEXT_STYLE),
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
    ],
    style: app.SECTION_STYLE
  });
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
        // app.clearAoi();
        // Map.drawingTools().clear();
        Map.drawingTools().setShown(true);
      },
      style: app.WIDGETS_STYLE,
    }),
    setMapCenterButton: ui.Button({
      label: 'マップ中心', // マップ中心にマーカーセット
      onClick: function() {
        // app.clearAoi();
        Map.drawingTools().clear();
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
    importButton: ui.Button({
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
      label: '作業領域',
      onClick: function() {
        if (app.aoiFc) {
          app.dispAoiData(app.aoiFc, '作業領域');
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
    otherFuncLabel: ui.Label('4. その他', app.HEADER_TEXT_STYLE),
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
    gsiLabel: ui.Label('地理院地図（外部リンク）', app.WIDGETS_STYLE),
    soilMapLabel: ui.Label('日本土壌インベントリー', app.WIDGETS_STYLE),
    geojsonIOLabel: ui.Label('geojson.io（外部リンク）', app.WIDGETS_STYLE),
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
      app.data.importButton,
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
      ui.Label('●外部リンク', app.SUBHEADER_TEXT_STYLE),
      app.data.gsiLabel,
      app.data.soilMapLabel,
      app.data.geojsonIOLabel,
    ],
    style: app.SECTION_STYLE
  });
  app.data.checkExFunc.setValue(false);
  // クレジット表示パネル
  app.miscPanel = ui.Panel({
    widgets: [
      ui.Label('Credit', app.SUBHEADER_TEXT_STYLE),
      ui.Label(
        'Landsat image courtesy of the U.S. Geological Survey',
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
      app.filters.dataSetSelect,
　　　app.filters.sArea,
      app.filters.geoButton,
      app.filters.selectYear,
      app.filters.selectMonth,
      app.filters.cloudcover,
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
          .filterBounds(Map.getCenter())
          .filterDate(startD, startD.advance(2, 'year'))
          .filter(ee.Filter.lt('CLOUD_COVER',
            app.filters.cloudcover.getValue()))
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
        app.picker.select.setValue(ids[0]);
      }
    });
  };
};　// 補助機能設定終了
// 初期設定
app.initialSetup = function() {
  // 衛星データセット
  app.collectionL8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
  app.collectionL9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2');
  app.collectionL8and9 = (app.collectionL8).merge(app.collectionL9);
  app.dataset = {
    'Landsat-8 & 9': {
      collection: app.collectionL8and9,
      since: 2013,
      yearList: [],
    },
    'Landsat-8': {
      collection: app.collectionL8,
      since: 2013,
      yearList: [],
    },
    'Landsat-9': {
      collection: app.collectionL9,
      since: 2021,
      yearList: [],
    },
  };
  app.imgCollection = //イメージコレクション初期値セット
    app.dataset[Object.keys(app.dataset)[0]].collection;
  // 検索開始年・月リスト
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
  app.dataset[Object.keys(app.dataset)[0]].yearList = 
    serialNumber(app.dataset[Object.keys(app.dataset)[0]].since, app.thisYear);
  app.dataset[Object.keys(app.dataset)[1]].yearList = 
    serialNumber(app.dataset[Object.keys(app.dataset)[1]].since, app.thisYear);
  app.dataset[Object.keys(app.dataset)[2]].yearList = 
    serialNumber(app.dataset[Object.keys(app.dataset)[2]].since, app.thisYear);
  // 土壌腐植推定値(g/kg)
  app.soilOM = ee.Image("users/hkrnhn/soilOM/soilOMmedian").resample();
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
  Map.layers().set(1, ui.Map.Layer({name:'Thematic Map', shown: false}));
  Map.layers().set(2, app.adminLayer); // 市町村境界
  Map.layers().set(3, Fude); // 筆ポリゴン
  Map.layers().set(4, ui.Map.Layer({name:'aoiImg', shown: false}));
  Map.layers().set(5, ui.Map.Layer({name:'aoiBounds', shown: false}));
  // データ・チャート表示用パネル
  app.dataPanel = ui.Panel({
    style: {
      position: 'bottom-left',
      shown: false
    },
  });
  Map.widgets().set(0, app.dataPanel);
  app.dPanelCloseButton = ui.Button({
    label: '閉じる',
    onClick: function() {
      app.dataPanel.clear();
      app.dataPanel.style().set('shown', false);
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
      margin: '0.1em 0 0 0.5em',
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
  // 植生指数バンドの計算
  app.calcNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B5', 'B4'])
          .rename('NDVI');
    return ndvi;
  };
  app.calcGNDVI = function(image) {
    var gndvi = image.normalizedDifference(['B5', 'B3'])
          .rename('GNDVI');
    return gndvi;
  };
  app.calcEVI2 = function(image) {
    var evi2 = image.expression(
      '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 1))', {
      'NIR': image.select('B5'),
      'RED': image.select('B4'),
      }).rename('EVI2');
    return evi2;
  };
  app.calcWDRVIg = function(image) { //greenWDRVI
    var WDRVIg = image.expression(
      '(0.1 * NIR - GREEN) / (0.1 * NIR + GREEN) + 0.818', {
      'NIR': image.select('B5'),
      'GREEN': image.select('B3'),
      }).rename('WDRVIg');
    return WDRVIg;
  };
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
  // カラー合成画像の表示オプション
  app.VIS_OPTIONS = {
    'トゥルーカラー(B4/B3/B2)': {
      description: '肉眼視に近い色づけ',
      visParams: {
        gamma: 1.3,
        min: 0.02,
        max: 0.18,
        bands: ['B4', 'B3', 'B2']
      }
    },
    'フォールスカラー(B6/B5/B4)': {
      description: 'RGB=中間赤外1/近赤外/赤',
      visParams: {
        gamma: 1.3,
        min: [0.102, 0.192, 0.026],
        max: [0.254, 0.442, 0.126],
        bands: ['B6', 'B5', 'B4']
      }
    },
     'フォールスカラー(B6/B5/B7)': {
      description: 'RGB=中間赤外1/近赤外/中間赤外2',
      visParams: {
        gamma: 1.3,
        min: [0.102, 0.192, 0.069],
        max: [0.250, 0.442, 0.203],
        bands: ['B6', 'B5', 'B7']
      }
    },
  };
  // 主題図レイヤのカラーパレット
  // パレットライブラリ https://github.com/gee-community/ee-palettes
  var palettes = require('users/gena/packages:palettes');
  app.colorSchemes = {
    '赤～黄～緑':palettes.colorbrewer.RdYlGn[11],
    '茶～青緑':palettes.colorbrewer.BrBG[11],
    '緑（淡～濃）':palettes.colorbrewer.Greens[9],
    '茶～黄':palettes.colorbrewer.YlOrBr[5].reverse(),
    // '虹色（青～赤）':palettes.kovesi.rainbow_bgyr_35_85_c73[7],
    // '虹色（赤～青）':palettes.kovesi.rainbow_bgyr_35_85_c73[7].reverse(),
    '青-水-緑-黄-赤':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'],
    '赤-黄-緑-水-青':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'].reverse(),
    '黒-白':['#111111','#EEEEEE'],
    '白-黒':['#EEEEEE','#111111'],
  };
  app.colorRamp = app.colorSchemes['赤～黄～緑']; // パレット初期値
  app.VIS_OPTIONS2 = {
    'NDVI': {
      description: 'NDVI=(NIR-RED)/(NIR+RED)',
      visParams: {
        'bands': ['NDVI'],
        'min': 0.2,'max':1.0,
      },
    },
    'GNDVI': {
      description: 'GNDVI=(NIR-GREEN)/(NIR+GREEN)',
      visParams: {
        'bands': ['GNDVI'],
        'min': 0.2,'max':0.9,
      },
    },
    'EVI2': {
      description: 'EVI2=2.5*(NIR-RED)/(NIR+2.4*RED+1)',
      visParams: {
        'bands': ['EVI2'],
        'min': 0.2,'max': 0.9,
      },
    },
    'WDRVIg': {
      description: 'WDRVIg=(0.1*NIR-G)/(0.1*NIR+G)+0.818',
      visParams: {
        'bands': ['WDRVIg'],
        'min': 0.1,'max':0.9,
      },
    },
    '赤波長域': {
      description: 'Band4 (655nm)',
      visParams: {
        'bands': ['B4'],
        'min': 0.05,'max':0.30,
      },
    },
    '中間赤外域1': {
      description: 'Band6 (1610nm)',
      visParams: {
        'bands': ['B6'],
        'min': 0.15,'max':0.35,
      },
    },
    '中間赤外域2': {
      description: 'Band7 (2200nm)',
      visParams: {
        'bands': ['B7'],
        'min': 0.15,'max':0.35,
      },
    },
    '表面温度': {
      description: 'Band10摂氏換算値(度)',
      visParams: {
        'bands': ['Temp'],
        'min': 20.0,'max': 40.0,
      },
    },
    '腐植含量': {
      description: '腐植推定値(g/kg)',
      visParams: {
        'bands': ['OM'],
        'min': 10,'max':120,
      },
    },
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
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: app.makeColorBarParams(app.colorRamp),
      style: {
        stretch: 'horizontal',
        margin: '0.05em 0.3em',
        maxHeight: '0.8em',
        // margin: '0 0.3em',
        // maxHeight: '1.7em',
      },
    });
    return colorBar;
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
    // app.setColorBar();
    app.legendPanel = ui.Panel({
      widgets: [
        app.legendDate,
        app.legendBands,
        app.setColorBar(),
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
  app.legendPanel.style().set('shown', false);
  // データ集計用バンドリスト
  app.bandsDic = {
    'NDVI': 'NDVI',
    'GNDVI':  'GNDVI',
    'EVI2': 'EVI2',
    'WDRVIg': 'WDRVIg',
    'B3(Green)': 'B3',
    'B4(Red)':  'B4',
    'B5(NIR)': 'B5',
    'B6(SWIR1)': 'B6',
    'B7(SWIR2)': 'B7',
    '表面温度(deg C)': 'Temp',
    '腐植含量(g/kg)': 'OM'
  };
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
  };
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
  // カラー合成画像の表示
  app.refreshMapLayer0 = function() {
    if (app.imageDateStr) {
      var imgDate = ee.Date(app.imageDateStr);
      var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
      app.mosaicimg = app.imgCollection
        .filterDate(dateRange)
        .map(app.ScaleResample).mean();
      app.mosaicimg = ee.Image.cat([app.mosaicimg, app.soilOM]); // 腐植マップを結合
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      var imgname = 'Image:' + app.imageDateStr;
      var imgCheck = app.vis.checkColorComp.getValue();
      var ColorComposit = ui.Map.Layer(app.mosaicimg, visOption.visParams, imgname, imgCheck);
      Map.layers().set(0, ColorComposit);
    }
  }; // カラー合成画像の表示終了
  // 主題図レイヤの表示
  app.refreshMapLayer1 = function() {
    if (app.mosaicimg) {
      var option2 = app.VIS_OPTIONS2[app.visTmap.select.getValue()];
      option2.visParams.palette = app.colorRamp;
      var bands = option2.visParams.bands;
      if (bands == 'OM') { // 腐植については凡例に日付を表示せず
        app.legendDate.style().set({'shown': false});
        app.legendBands.setValue(bands + ' (g/kg)');
      } else {
        app.legendDate.style().set({'shown': true});
        app.legendBands.setValue(bands);
      }
      var visMin = option2.visParams.min;
      var visMax = option2.visParams.max;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      var mapImg = app.mosaicimg;
      var mapImgname = bands + ':' + app.imageDateStr;
      var mapImgCheck = app.visTmap.checkVI.getValue();
      var mapImgAg = mapImg.clipToCollection(app.Fudepoly); // 農地の切り出し
      var mapImgPaddy2021 = mapImg.clipToCollection(app.fudePaddy2021); // 湛水農地2021
      var vegMask = mapImg.select('EVI2').gt(0.25); // 植生の切り出し
      var mapImgAgVeg = mapImgAg.updateMask(vegMask);
      var bareMask = mapImg.select('EVI2').lt(0.2) // 裸地の切り出し
        .and(mapImg.select('B6').gt(0.16));
      var mapImgAgBare = mapImgAg.updateMask(bareMask);
      var waterMask = mapImg.select('EVI2').lt(0.25) // 湛水箇所の切り出し
        .and(mapImg.select('B6').lt(0.16));
      var mapImgAgWater = mapImgAg.updateMask(waterMask);
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
      if (maskOption.maskClass == 'veg') {
        app.visTmapImg = mapImgAgVeg;
      }
      if (maskOption.maskClass == 'bare') {
        app.visTmapImg = mapImgAgBare;
      }
      if (maskOption.maskClass == 'paddy') {
        app.visTmapImg = mapImgAgWater;
      }
      if (maskOption.maskClass == 'paddy2021') {
        app.visTmapImg = mapImgPaddy2021;
      }
      var VImap = ui.Map.Layer(app.visTmapImg, option2.visParams, mapImgname, mapImgCheck);
      Map.layers().set(1, VImap);
    }
  }; // 主題図レイヤの更新終了
  // 画像のパーセンタイル取得
  app.imgPercentile = function(img, bands, pList, geo, rScale) {
    var stats = img // 対象画像
      .select(bands) // バンドリスト
      .reduceRegion({
        reducer: ee.Reducer.percentile(pList), // パーセンタイルリスト
        geometry: geo,
        scale: rScale,
        bestEffort: true,
      });
    return stats;
  };
  // カラー合成画像の明るさ自動調整
  app.setVisMinMax = function() {
    var img = app.mosaicimg;
    var currentVisParams = Map.layers().get(0).getVisParams();
    var bands = currentVisParams.bands;
    var pList = [1,99];
    var geo = ee.Geometry.Rectangle(Map.getBounds());
    var rScale = Map.getScale() * 30;
    var bandsPmin = bands.map(function(band){return band + '_p1';});
    var bandsPmax = bands.map(function(band){return band + '_p99';});
    var imgStats = app.imgPercentile(img, bands, pList, geo, rScale);
    imgStats.evaluate(function(stats) {
      var bandsMin = bandsPmin.map(function(band){return stats[band];});
      var bandsMax = bandsPmax.map(function(band){return stats[band];});
      // print(bands); print(bandsMax);
      if (bands[0] == 'B4'){ // トゥルーカラーはRGBバランスを保持
        currentVisParams.min = Math.min.apply(null, bandsMin);
        currentVisParams.max = Math.max.apply(null, bandsMax);
      } else { // RGB個別ストレッチ
        currentVisParams.min = bandsMin;
        currentVisParams.max = bandsMax;
      }
      Map.layers().get(0).setVisParams(currentVisParams);
    });
  };
  // 主題図レイヤのMinMax自動調整
 app.setVisTmapMinMax = function() {
    var img = app.visTmapImg;
    var currentVisParams = Map.layers().get(1).getVisParams();
    var bands = currentVisParams.bands;
    var pList = [20,99];
    var geo = ee.Geometry.Rectangle(Map.getBounds());
    var rScale = Map.getScale() * 30;
    var imgStats = app.imgPercentile(img, bands, pList, geo, rScale);
    imgStats.evaluate(function(stats) {
      var visMin = stats[bands[0] + '_p20'];
      var visMax = stats[bands[0] + '_p99'];
      visMin = Math.round(Math.max(visMin, 0) * 100) / 100;
      visMax = Math.round(visMax * 100) / 100;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      currentVisParams.min = visMin;
      currentVisParams.max = visMax;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      Map.layers().get(1).setVisParams(currentVisParams);
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
      var zoom = Map.getZoom();
      ui.url.set('zoom', zoom);
      var gsiMapUrl = 'https://maps.gsi.go.jp/#'
        + zoom + '/' + centerLat +  '/' + centerLon;
      app.data.gsiLabel.setUrl(gsiMapUrl);
      var soilMapUrl = 'https://soil-inventory.rad.naro.go.jp/figure.html?lat='
        + centerLat + '&lng=' + centerLon +  '&zoom=' + zoom;
      app.data.soilMapLabel.setUrl(soilMapUrl);
      var geoIOUrl = 'https://geojson.io/#map='
        + zoom + '/' + centerLat +  '/' + centerLon;
      app.data.geojsonIOLabel.setUrl(geoIOUrl);
    });
  }, 200));
  // 拡張機能ウィジエットの表示ON/OFF
  app.setExFunc = function(shown) {
    var exFuncWidgets = [
      app.data.importButton,
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
      // app.data.otherFuncLabel,
      // app.data.userPlaces,
    ];
    exFuncWidgets.forEach(function(widget) {
      widget.style().set('shown', shown);
    });
  };
  // 領域バッファ生成関数
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
  // GeoJSONインポート関数
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
      Map.layers().set(4, aoiImgLayer);
　　  Map.layers().set(5, {shown: false});
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
    // 入力パネル設定
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
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, importPanel);
    app.dataPanel.add(app.dPanelCloseButton);
  }; // GeoJSONインポート関数終了
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
　　  Map.layers().set(5, aoiBoundsLayer);
      Map.layers().set(4, {shown: false});
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
　　  Map.layers().set(5, aoiBoundsLayer);
      Map.layers().set(4, {shown: false});
    } // end of if
  };
  // 領域設定クリア関数
  app.clearAoi = function(){
    Map.drawingTools().clear();
    // Map.drawingTools().setShown(false);
    // app.dataPanel.clear();
    // app.dataPanel.style().set('shown', false);
    if (app.aoiFc){
      app.aoiFc = null;
    }
    if (app.aoiGrid){
      app.aoiGrid = null;
    }
    Map.layers().set(4, {shown: false});
    Map.layers().set(5, {shown: false});
    app.data.fcBuffer.setValue(0, false);
  };
  // 領域保存関数
  app.fcExport = function() {
    var title = ui.Label('領域保存', app.SUBHEADER_TEXT_STYLE);
    var title2 = ui.Label('（リンクをクリックしてダウンロード）', app.LEGEND_TEXT_STYLE);
    var subtitleJson = ui.Label('● GeoJson (FeatureCollection)', app.LEGEND_TEXT_STYLE);
    var labelDrawJson = ui.Label('描画領域, ', app.LEGEND_TEXT_STYLE);
    var labelFcJson = ui.Label('作業領域, ', app.LEGEND_TEXT_STYLE);
    var labelGridJson = ui.Label('グリッド ', app.LEGEND_TEXT_STYLE);
    var urlPanelJson = ui.Panel({
      widgets: [
        labelDrawJson,
        labelFcJson,
        labelGridJson,
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var subtitleCsv = ui.Label('● CSV', app.LEGEND_TEXT_STYLE);
    var labelDrawCsv = ui.Label('描画領域, ', app.LEGEND_TEXT_STYLE);
    var labelFcCsv = ui.Label('作業領域, ', app.LEGEND_TEXT_STYLE);
    var urlPanelCsv = ui.Panel({
      widgets: [
        labelDrawCsv,
        labelFcCsv,
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var dlPanel = ui.Panel({widgets: [
      title, title2, subtitleJson, urlPanelJson,
      subtitleCsv, urlPanelCsv, 
      ]});
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, dlPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
    // ダウンロードリンクセット
    var dlUrl = function(aoi, format, fileNam) {
      return aoi
        .getDownloadURL({format: format, filename: fileNam});
    };
    if (Map.drawingTools().layers().get(0)) {
      var aoiDraw = (Map.drawingTools()).toFeatureCollection('layer');
      labelDrawJson.setUrl(dlUrl(aoiDraw, 'geojson', 'draw'));
      labelDrawCsv.setUrl(dlUrl(aoiDraw.union(0.5), 'csv', 'draw'));
    }
    if (app.aoiFc) {
      var aoiFc = app.aoiFc;
      labelFcJson.setUrl(dlUrl(aoiFc, 'geojson', 'aoi'));
      labelFcCsv.setUrl(dlUrl(aoiFc.union(0.5), 'csv', 'aoi'));
    }
    if (app.aoiGrid) {
      labelGridJson.setUrl(dlUrl(app.aoiGrid, 'geojson', 'grid'));
    }
  }; // 領域保存関数終了
  // ゾーニング関数（領域内を5段階区分）
  app.aoiZoning = function(aoiFc) {
    // ゾーン設定関数
    var setZones = function(){
      dateLabel.setValue('Loading...');
      var visBand = app.bandsDic[bandSelect.getValue()];
      var obsDate = app.imageDateStr;
      var dlName = 'zones_' + visBand + '_' + obsDate;
      // 領域内パーセンタイル算出
      var visImg = app.visTmapImg.select([visBand]).clip(aoi);
      visImg = visImg.focal_median({ // 平滑化
        radius: 10,
        units: 'meters',
        iterations: 1,
      }).mask(visImg.gte(-1.0));
      var currentScale = Map.getScale();
      var statsDic = visImg.reduceRegion({ 
        reducer: ee.Reducer.percentile([20, 40, 50, 60, 80]),
        scale: currentScale,
        bestEffort: true,
      });
      // 領域をパーセンタイルで5分割
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
　　    Map.layers().set(4, zonesLayer, 'zones');
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
　　    Map.layers().set(5, zonesFCLayer);
　　    // 凡例数値セット
        dateLabel.setValue(obsDate + ', ' + visBand);
        if (visBand == 'OM') {dateLabel.setValue('腐植含量(g/kg)')}
        p20.setValue(th1.toFixed(2));
        p40.setValue(th2.toFixed(2));
        p60.setValue(th3.toFixed(2));
        p80.setValue(th4.toFixed(2));
        // ダウンロードリンクセット
        var dlUrl = function(formatNam) {
          return zonesFC.getDownloadURL({format: formatNam, filename: dlName});
        };
        dlLabelCSV.setUrl(dlUrl('CSV'));
        dlLabelKML.setUrl(dlUrl('kml'));
        dlLabelJSON.setUrl(dlUrl('geojson'));
        resultPanel.style().set('shown', true);
      });
    };// setZones終わり
    // データパネルの設定
    var aoi = aoiFc.geometry();
    if (Map.drawingTools().layers().get(0)) {
　　  Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
　　}
    var bandSelect = ui.Select({
      items: Object.keys(app.bandsDic),
      value: Object.keys(app.bandsDic)[0],
      style: app.WIDGETS_STYLE,
    });
    var runButton = ui.Button({
        label: '実行',
        onClick: setZones,
        style: app.WIDGETS_STYLE,
    });
　  var dateLabel = ui.Label('', app.LEGEND_TEXT_STYLE);
　  var pcLabel = ui.Label('パーセンタイル(0, 20, 40, 60, 80)', app.LEGEND_TEXT_STYLE);
　  var Label_STYLE = {
      margin: '0 0 0 0.5em',
      fontSize: '0.85em',
      stretch: 'horizontal',
    };
　  var p0 = ui.Label('0', Label_STYLE);
　  var p20 = ui.Label('', Label_STYLE);
　  var p40 = ui.Label('', Label_STYLE);
　  var p60 = ui.Label('', Label_STYLE);
　  var p80 = ui.Label('', Label_STYLE);
　  var pcValLabel = ui.Panel({
      widgets: [p0, p20, p40, p60, p80],
      layout: ui.Panel.Layout.flow('horizontal'),
    });
    var dlLabelCSV = ui.Label('CSV, ', app.LEGEND_TEXT_STYLE);
    var dlLabelKML = ui.Label('KML, ', app.LEGEND_TEXT_STYLE);
    var dlLabelJSON = ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE);
    var resultPanel = ui.Panel([
      pcLabel, pcValLabel,
      app.setColorBar(),
      ui.Panel([
        dlLabelCSV, dlLabelKML, dlLabelJSON,
      ], ui.Panel.Layout.flow('horizontal')),
    ]);
    resultPanel.style().set('shown', false);
    var zoningPanel = ui.Panel({
      widgets: [
        ui.Label('ゾーニング：対象となる変数を指定', app.LEGEND_TEXT_STYLE),
        ui.Panel([bandSelect, runButton],
          ui.Panel.Layout.flow('horizontal')),
        dateLabel,
        resultPanel
      ],
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, zoningPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // ゾーニング終了
  // 領域ヒストグラム
  app.aoiHistogram = function(aoiFc) {
    // チャート描画関数
    var dispPlot = function(){
      var obsDate = app.imageDateStr;
      var band = app.bandsDic[bandSelect.getValue()];
      var currentScale = Math.max(Map.getScale(), 30);
      var chartTitle = obsDate;
      var chart = ui.Chart.image.histogram({
        image: app.visTmapImg.select(band),
        region: aoiFc,
        scale: currentScale,
        maxBuckets: 20,
      });
      var chartOptions = {
        title: chartTitle,
        vAxis: {title: '頻度'},
        hAxis: {title: bandSelect.getValue()},
      };
      chart.setOptions(chartOptions);
      chartPanel.widgets().set(2, chart);
    };
    // パネル設定
    var bandSelect = ui.Select({
      items: Object.keys(app.bandsDic),
      value: Object.keys(app.bandsDic)[0],
      style: app.WIDGETS_STYLE,
    });
    var plotButton = ui.Button({
        label: '描画実行',
        onClick: dispPlot,
        style: app.WIDGETS_STYLE,
      });
    var chartPanel = ui.Panel({
      widgets: [
        ui.Label('ヒストグラム描画：対象となる変数を指定', app.WIDGETS_STYLE),
        ui.Panel([bandSelect, plotButton],
        ui.Panel.Layout.flow('horizontal'))],
      style: {width: '30em'}
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, chartPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // 領域ヒストグラム終了     
  // 領域散布図
  app.aoiScatterPlot = function(aoiFc) {
    var bandSelectX = ui.Select({
      items: Object.keys(app.bandsDic),
      placeholder: 'X軸変数',
      style: app.WIDGETS_STYLE,
    });
    var bandSelectY = ui.Select({
      items: Object.keys(app.bandsDic),
      placeholder: 'y軸変数',
      style: app.WIDGETS_STYLE,
    });
    var dispPlot = function(){
      var obsDate = app.imageDateStr;
      var currentScale = Math.max(Map.getScale()*5, 30);
      var pixelVals = (app.visTmapImg).reduceRegion({
      reducer: ee.Reducer.toList(),
      geometry: aoiFc.geometry(),
      scale: currentScale});
      var bandX = app.bandsDic[bandSelectX.getValue()];
      var bandY = app.bandsDic[bandSelectY.getValue()];
      var xVals = ee.List(pixelVals.get(bandX));
      var yVals = ee.List(pixelVals.get(bandY));
      var chart = ui.Chart.array.values({
        array: yVals,
        axis: 0,
        xLabels: xVals})
        .setOptions({
          title: obsDate,
          // colors: ['cf513e'],
          hAxis: {title: bandSelectX.getValue()},
          vAxis: {title: bandSelectY.getValue()},
          pointSize: 4,
          // legend: {position: 'none'},
          trendlines: {
            0: {  // add a trend line to the 1st series
            type: 'linear',  // or 'polynomial', 'exponential'
            labelInLegend: '線形近似',
            showR2: true,
            visibleInLegend: true,
            color: 'green',
            lineWidth: 3,
            opacity: 0.4,
            }
          }
      });
      chartPanel.widgets().set(2, chart);
    };
    var plotButton = ui.Button({
      label: '描画実行',
      onClick: dispPlot,
      style: app.WIDGETS_STYLE,
    });
    var chartPanel = ui.Panel({
      widgets: [
        ui.Label('散布図描画：X軸・Y軸の変数を指定', app.WIDGETS_STYLE),
        ui.Panel([bandSelectX, bandSelectY, plotButton],
        ui.Panel.Layout.flow('horizontal'))],
      style: {width: '30em'}
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, chartPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // 領域散布図終了  
  // 領域一括集計関数
  app.showFcMeanUnion = function(aoiFc, aoiGeo) {
    // 集計関数
    var sumUpData = function(){
      dateLabel.setValue('Loading...');
      var obsDate = app.imageDateStr;
      var setDate = function(feature) {
        return feature.set({date: obsDate, idName: feature.id()});
      };
      aoiFc = aoiFc.map(setDate); // FCに日付とidを属性として追加
      var fcReducer = ee.Reducer.mean();
      var bandsList = ['NDVI', 'GNDVI','EVI2', 'OM']; // 画面表示用リリスト 
      if (reducerSelect.getValue() == '平均・標準偏差') {
        fcReducer = ee.Reducer.mean().combine({
          reducer2: ee.Reducer.stdDev(),
          sharedInputs: true});
        bandsList = ['NDVI_mean', 'GNDVI_mean','EVI2_mean', 'OM_mean'];
      }
      var currentScale = Math.max(Map.getScale(), 30);
      var sampleFC = app.visTmapImg.reduceRegions({
        collection: aoiFc,
        reducer: fcReducer,
        scale: currentScale,
      });
      // ダウンロードリンクのセット
      var dlUrl = function(formatNam) {
        return sampleFC.getDownloadURL({format: formatNam, filename: 'aoi' + obsDate});
      };
      dlLabelCSV.setUrl(dlUrl('CSV'));
      dlLabelKML.setUrl(dlUrl('kml'));
      dlLabelJSON.setUrl(dlUrl('geojson'));
      // 平均値表示
      var sampleDic = sampleFC.first().toDictionary(bandsList);
      sampleDic.evaluate(function(stats) {
        dateLabel.setValue(obsDate);
        NDVI_Label.setValue('●NDVI:' + (Math.round(stats[bandsList[0]] * 1000) / 1000));
        GNDVI_Label.setValue('●GNDVI:' + (Math.round(stats[bandsList[1]] * 1000) / 1000));
        EVI2_Label.setValue('●EVI2:' + (Math.round(stats[bandsList[2]] * 1000) / 1000));
        OM_Label.setValue('●腐植(g/kg):' + Math.round(stats[bandsList[3]]));
        resultPanel.style().set('shown', true);
      });
    };// 集計関数終わり
    // データパネルの設定
    var reducerSelect = ui.Select({
      items: ['平均', '平均・標準偏差'],
      value: '平均',
      style: app.WIDGETS_STYLE,
    });
    var runButton = ui.Button({
        label: '実行',
        onClick: sumUpData,
        style: app.WIDGETS_STYLE,
    });
    var dateLabel = ui.Label('', app.LEGEND_TEXT_STYLE);
    var NDVI_Label = ui.Label('', app.LEGEND_TEXT_STYLE);
    var GNDVI_Label = ui.Label('', app.LEGEND_TEXT_STYLE);
    var EVI2_Label = ui.Label('', app.LEGEND_TEXT_STYLE);
    var OM_Label = ui.Label('', app.LEGEND_TEXT_STYLE);
    var dlLabelCSV = ui.Label('CSV, ', app.LEGEND_TEXT_STYLE);
    var dlLabelKML = ui.Label('KML, ', app.LEGEND_TEXT_STYLE);
    var dlLabelJSON = ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE);
    var resultPanel = ui.Panel([
      NDVI_Label, GNDVI_Label, EVI2_Label, OM_Label,
      ui.Panel([dlLabelCSV, dlLabelKML, dlLabelJSON], 
        ui.Panel.Layout.flow('horizontal'),
        {margin: '0.2em'})
    ]);
    resultPanel.style().set('shown', false);
    var showUrlPanel = ui.Panel({
      widgets: [
        ui.Label('領域一括集計：集計方法を指定', app.LEGEND_TEXT_STYLE),
        ui.Panel([reducerSelect, runButton],
          ui.Panel.Layout.flow('horizontal')),
        dateLabel,
        resultPanel,
      ],
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, showUrlPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // 領域一括集計関数終了
  // 複数領域集計関数
  app.showFcMean = function(aoiFc, aoiGeo) {
    // 集計関数
    var sumUpData = function(){
      dateLabel.setValue('Loading...');
      var obsDate = app.imageDateStr;
      var band = app.bandsDic[bandSelect.getValue()];
      var setDate = function(feature) {
        return feature.set({date: obsDate, idName: feature.id()});
      };
      aoiFc = aoiFc.map(setDate); // FCに日付とidを属性として追加
      var fcReducer = ee.Reducer.mean();
      var imgProperties = [band];
      if (reducerSelect.getValue() == '平均・標準偏差') {
        fcReducer = ee.Reducer.mean().combine({
          reducer2: ee.Reducer.stdDev(),
          sharedInputs: true});
        imgProperties = [band + '_mean'];
      }
      var currentScale = Math.max(Map.getScale(), 10);
      var sampleFC = app.visTmapImg.reduceRegions({
        collection: aoiFc,
        reducer: fcReducer,
        scale: currentScale,
      });
      // ダウンロードリンクのセット
      var dlUrl = function(formatNam) {
        return sampleFC.getDownloadURL({format: formatNam, filename: 'aoi' + obsDate});
      };
      dlLabelCSV.setUrl(dlUrl('CSV'));
      dlLabelKML.setUrl(dlUrl('kml'));
      dlLabelJSON.setUrl(dlUrl('geojson'));
      var aoiImg = sampleFC
        .reduceToImage({
          properties: imgProperties,
          reducer: ee.Reducer.first()
      });
　　  var aoiBounds = ee.Image().byte().paint({
        featureCollection: sampleFC,
        color: 1,
        width: 1
      });
　　  var aoiBoundsLayer = ui.Map.Layer(aoiBounds, {palette: '#000000'}, 'aoiBounds');
　　  Map.layers().set(5, aoiBoundsLayer);
      // 領域内の統計量に基づく画像表示
      var img = app.visTmapImg;
      var pList = [5,50,95];
      var rScale = Math.max(Map.getScale()*5, 10);
      var imgStats = app.imgPercentile(img, [band], pList, aoiGeo, rScale);
      imgStats.evaluate(function(stats) {
        dateLabel.setValue(obsDate + ', ' + band);
        if (band == 'OM') {dateLabel.setValue('腐植含量(g/kg)')}
        var visMin = stats[band + '_p5'];
        var visMed = stats[band + '_p50'];
        var visMax = stats[band + '_p95'];
        visMinLabel.setValue(visMin.toFixed(3));
        visMedLabel.setValue(visMed.toFixed(3));
        visMaxLabel.setValue(visMax.toFixed(3));
        var visParams = {bands:'first', min: visMin, max: visMax, palette: app.colorRamp};    
        var aoiImgLayer = ui.Map.Layer(aoiImg, visParams, 'aoiImg', true);
　　    Map.layers().set(4, aoiImgLayer);
　　    resultPanel.style().set('shown', true);
      });
    };// 集計関数終わり
    // データパネルの設定
    if (Map.drawingTools().layers().get(0)) {
　　  Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
　　}
    var bandSelect = ui.Select({
      items: Object.keys(app.bandsDic),
      value: Object.keys(app.bandsDic)[0],
      style: app.WIDGETS_STYLE,
    });
    var reducerSelect = ui.Select({
      items: ['平均', '平均・標準偏差'],
      value: '平均',
      style: app.WIDGETS_STYLE,
    });
    var runButton = ui.Button({
        label: '実行',
        onClick: sumUpData,
        style: app.WIDGETS_STYLE,
    });
    var dateLabel = ui.Label('', app.LEGEND_TEXT_STYLE);
    var visMinLabel = ui.Label('', app.LEGEND_TEXT_STYLE);
    var visMedLabel = ui.Label('', {
      margin: '0.1em 0 0 0.5em',
      fontSize: '0.85em',
      textAlign: 'center',
      stretch: 'horizontal'});
    var visMaxLabel = ui.Label('', app.LEGEND_TEXT_STYLE);
    var legendLabels = ui.Panel({
        widgets: [visMinLabel, visMedLabel, visMaxLabel],
        layout: ui.Panel.Layout.flow('horizontal')
    });
    var dlLabelCSV = ui.Label('CSV, ', app.LEGEND_TEXT_STYLE);
    var dlLabelKML = ui.Label('KML, ', app.LEGEND_TEXT_STYLE);
    var dlLabelJSON = ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE);
    var resultPanel = ui.Panel([
      app.setColorBar(),
      legendLabels,
      ui.Panel([dlLabelCSV, dlLabelKML, dlLabelJSON], 
      ui.Panel.Layout.flow('horizontal'),
        {margin: '0.2em'})
    ]);
    resultPanel.style().set('shown', false);
    var showUrlPanel = ui.Panel({
      widgets: [
        ui.Label('複数領域集計：変数・集計方法を指定', app.LEGEND_TEXT_STYLE),
        ui.Panel([bandSelect, reducerSelect, runButton],
          ui.Panel.Layout.flow('horizontal')),
        dateLabel,
        resultPanel,
      ],
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, showUrlPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // 複数領域集計関数終了
  // 時系列チャート用関数：雲マスク、植生指数付加、スケール変換
  app.MaskS2clouds = function(image) {
    var scaledImg = image
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'], // old names
       ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']) // new names
      .multiply(0.0000275).subtract(0.2);
    var brTemp = image
      .select(['ST_B10'], ['Temp'])
      .multiply(0.00341802).add(149).subtract(273.15); // 輝度温度(℃)に変換
    var ndvi = app.calcNDVI(scaledImg);
    var gndvi = app.calcGNDVI(scaledImg);
    var evi2 = app.calcEVI2(scaledImg);
    var wdrvig = app.calcWDRVIg(scaledImg);
    var qa = image.select('QA_PIXEL');
    // Bits 4 and 3 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = (1 << 4);
    var cloudsBitMask = (1 << 3);
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return scaledImg.addBands(brTemp)
      .addBands(ndvi).addBands(gndvi).addBands(evi2).addBands(wdrvig)
      .updateMask(mask).copyProperties(image, ['system:time_start']);
  };
  // 時系列チャート用画像コレクション作成関数
  app.setChartCollection = function() {
    var startYear = app.filters.selectYear.getValue();
    var startMonth = app.filters.selectMonth.getValue();
    var startDate = ee.Date(startYear + '-' + startMonth + '-01');
    app.chartCollection = app.imgCollection
       .filterBounds(Map.getCenter())
       .filterDate(startDate, startDate.advance(1, 'year'))
       .filter(ee.Filter.lt('CLOUD_COVER',
         app.filters.cloudcover.getValue()))
       .map(app.MaskS2clouds);
  };
  // 領域一括チャート
  app.aoiChart = function(aoiFc) {
      var datasetName = app.filters.dataSetSelect.getValue();
      var currentScale = Math.max(Map.getScale(), 30);
      app.setChartCollection(); // 画像コレクション作成
      var chartTitle = '反射率・植生指数・表面温度推移: '
           + datasetName + ', 雲量上限' 
          + app.filters.cloudcover.getValue() + '%';
      var chart = ui.Chart.image.series({
        imageCollection: app.chartCollection,
        region: aoiFc,
        reducer: ee.Reducer.mean(),
        scale: currentScale,
      });
      var chartOptions = {
        title: chartTitle,
        series: {
          9: {targetAxisIndex: 1},
        },
        vAxes: {
          0: {title: '反射率・植生指数', viewWindow: {min: 0, max: 1.0}},
          1: {title: '表面温度(deg C)', viewWindow: {min: 0, max: 50}},
          // gridlines: {count: 0}
        },
        hAxis: {
          title: 'Date',
          format: 'yyyy-MM-dd',
        },
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
      app.dataPanel.clear();
      app.dataPanel.style().set('shown', true);
      app.dataPanel.widgets().set(0, chartPanel);
      app.dataPanel.add(app.dPanelCloseButton);
  }; // 領域一括チャート終了  
  // 複数領域時系列チャート  
    app.seriesByRegionChart = function(aoiFc) {
    // チャート描画関数
    var setChart = function(){
      var band = app.bandsDic[bandSelect.getValue()];
      var currentScale = Math.max(Map.getScale(), 10);
      var datasetName = app.filters.dataSetSelect.getValue();
      var chart = ui.Chart.image.seriesByRegion({
        imageCollection: app.chartCollection,
        regions: aoiFc,
        reducer: ee.Reducer.mean(),
        band: band,
        scale: currentScale,
        seriesProperty: 'system:index'
      });
      var chartOptions = {
        title: band + '推移: ' + datasetName
          + ', 雲量上限' 
          + app.filters.cloudcover.getValue() + '%',
        vAxis: {title: bandSelect.getValue()},
        hAxis: {title: 'Date', format: 'yyyy-MM-dd'},
        interpolateNulls: true,
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 4,
      };
      chart.setOptions(chartOptions);
      chartPanel.widgets().set(2, chart);
    };
    // パネル設定
    app.setChartCollection('VI'); // チャート用画像コレクション作成
    var bandsList = (Object.keys(app.bandsDic)).slice(0, -1); // バンドリストの最後(OM)を削除
    var bandSelect = ui.Select({
      items: bandsList,
      value: bandsList[0],
      placeholder: '変数選択',
      style: app.WIDGETS_STYLE,
    });
    var plotButton = ui.Button({
      label: '描画実行',
      onClick: setChart,
      style: app.WIDGETS_STYLE,
    });
    var chartPanel = ui.Panel({
      widgets: [
        ui.Label('複数領域時系列チャート：対象となる変数を指定', app.WIDGETS_STYLE),
        ui.Panel([bandSelect, plotButton],
        ui.Panel.Layout.flow('horizontal'))
      ],style: {width: '30em'}
    });
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, chartPanel);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
  }; // 複数領域時系列チャート終了
  // データ表示メニュー関数
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
      label: '集計',
      onClick: function() {app.showFcMeanUnion(aoiFcUnion, aoiGeo);},
      style: app.WIDGETS_STYLE,
    });
    var chartButton1 = ui.Button({
      label: '時系列チャート',
      onClick: function() {app.aoiChart(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var histogramButton = ui.Button({
      label: 'ヒストグラム',
      onClick: function() {app.aoiHistogram(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var scatterPlotButton = ui.Button({
      label: '散布図',
      onClick: function() {app.aoiScatterPlot(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var zoningButton = ui.Button({
      label: 'ゾーニング',
      onClick: function() {app.aoiZoning(aoiFcUnion);},
      style: app.WIDGETS_STYLE,
    });
    var panel1 = ui.Panel({
      widgets: [
        subtitle1,
        statsButton1,
        chartButton1,
        histogramButton,
        scatterPlotButton,
        zoningButton
      ],
    });
    var subtitle2 = ui.Label('・複数領域を個別に', app.LEGEND_TEXT_STYLE);
    var statsButton2 = ui.Button({
      label: '集計',
      onClick: function() {app.showFcMean(aoiFc, aoiGeo);},
      style: app.WIDGETS_STYLE,
    });
    var chartButton2 = ui.Button({
      label: '時系列チャート',
      onClick: function() {app.seriesByRegionChart(aoiFc)},
      style: app.WIDGETS_STYLE,
    });
    var panel2 = ui.Panel({
      widgets: [
        subtitle2,
        statsButton2,
        chartButton2,
      ],
    });
    var panel3 = ui.Panel({
      widgets: [title, panel1, panel2],
      style: {width: '10em'}
      // style: {width: '30em'}
    });
    if (titleText == 'グリッド'){
      panel1.style().set('shown', false);
    } else {
      panel1.style().set('shown', true);
    }
    app.dataPanel.clear();
    app.dataPanel.style().set('shown', true);
    app.dataPanel.widgets().set(0, panel3);
    app.dataPanel.widgets().set(1, app.dPanelCloseButton);
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
      app.vis.panel,
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