// Sentinel-2_LAI_app
// Sentinel-2 LAI表示
var app = {}; //空のオブジェクト生成
// UIメインパネル作成開始
app.createPanels = function() {
  // 検索条件指定パネル
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
      placeholder: '年選択',
      style: app.WIDGETS_STYLE,
    }),
    selectMonth: ui.Select({
      placeholder: '月選択',
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
      ui.Label({
        value: 'Sentinel-2 葉面積指数',
        style: {
          fontWeight: 'bold',
          fontSize: '1em',
          margin: '0.4em 0'},
      }),
      ui.Label('1. 検索条件', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.filters.sArea,
        app.filters.geoButton
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('開始年・月', app.HELPER_TEXT_STYLE), 
      ui.Panel([
        app.filters.selectYear,
        app.filters.selectMonth
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  // 検索開始年月リストのセット
  app.setYear();
  app.setMonth();
  // 衛星観測日セレクタ
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
      ui.Label('2. 観測日を選択', app.HEADER_TEXT_STYLE),
      app.picker.select,
    ],
    style: app.SECTION_STYLE
  });
  // カラー合成画像の表示設定
  app.vis = {
    checkColorComp: ui.Checkbox({ // 表示ON/OFF
      value:true,
      onChange: function(checked) {
        Map.layers().get(0).setShown(checked);},
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // カラー合成の選択
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        app.vis.label.setValue(option.description);
        app.refreshMapLayer0();
      },
      style: app.WIDGETS_STYLE,
    }),
    label: ui.Label({style: app.HELPER_TEXT_STYLE}),
    setVisButton: ui.Button({
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
      ui.Label('3. カラー合成', app.HEADER_TEXT_STYLE),
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
  // カラー合成選択の初期値
  app.vis.select.setValue(app.vis.select.items().get(0));
  // 主題図レイヤの表示設定
  app.visTmap = {
    checkVI: ui.Checkbox({ // レイヤ表示ON/OFF
      value:false,
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked);
        Map.widgets().get(1).style().set('shown', checked);
      },
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // 植生指数の選択
      items: Object.keys(app.VIS_OPTIONS2),
      onChange: function(key) {
        var option2 = app.VIS_OPTIONS2[key];
        app.visTmap.label.setValue(option2.description);
        app.refreshMapLayer1();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisTmapButton: ui.Button({
      label: '調整',
      onClick: app.setVisTmapMinMax,
      style: app.WIDGETS_STYLE,
    }),
    label: ui.Label({style: app.HELPER_TEXT_STYLE}),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      onChange: app.refreshMapLayer1,
      style: app.WIDGETS_STYLE,
    }),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      placeholder: '表示配色の変更',
      onChange: function(key) {
        app.colorRamp = app.colorSchemes[key];
        var currentVisParams = Map.layers().get(1).getVisParams();
        currentVisParams.palette = app.colorRamp;
        Map.layers().get(1).setVisParams(currentVisParams);
        app.legendPanel.clear();
        app.setLegend();
      },
      style: app.WIDGETS_STYLE,
    }),
  };
  app.visTmap.panel = ui.Panel({
    widgets: [
      ui.Label('4. 葉面積指数・植生指数', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.visTmap.checkVI,
        app.visTmap.select,
        app.visTmap.setVisTmapButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.visTmap.label,
      app.visTmap.selectMask,
      app.visTmap.selectColorScheme,
    ],
    style: app.SECTION_STYLE
  });
  // 植生指数選択の初期値
  app.visTmap.select.setValue(app.visTmap.select.items().get(0));
  app.visTmap.selectMask.setValue(app.visTmap.selectMask.items().get(0));
  // データ取得・チャート用パネル
  app.charts = {
    setDrawingButton: ui.Button({
      label: '領域設定',
      onClick: app.setDrawingTools,
      style: app.WIDGETS_STYLE,
    }),
    setMapCenterButton: ui.Button({
      label: 'マップ中心',
      onClick: function() {
        app.setDrawingTools();            
        var mapCenter = [Map.getCenter()];
        Map.drawingTools().addLayer({geometries: mapCenter, color:'magenta'});
      },
      style: app.WIDGETS_STYLE,
    }),
    clearDrawingButton: ui.Button({
      label: 'クリア',
      onClick: function(){
        Map.drawingTools().clear();
        Map.drawingTools().setShown(false);
        Map.setControlVisibility({
          layerList: true,
          mapTypeControl: true
        });
        app.dispChartPanel.clear();
        app.dispChartPanel.style().set('shown', false);
        if (app.samplePoints){
          app.samplePoints = null;
        }
        if (Map.layers().get(4)){
          Map.layers().get(4).setShown(false);
        }
      },
      style: app.WIDGETS_STYLE,
    }),
    setGridButton: ui.Button({
        label: 'グリッド地点発生',
      onClick: app.setGridPoints,
      style: app.WIDGETS_STYLE,
    }),
    gridSpacing: ui.Slider({
      min: 10,
      max: 100,
      value: 20,
      step: 5,
      style: app.WIDGETS_STYLE
    }),
    zoningButton: ui.Button({
        label: '領域ゾーニング',
      onClick: app.areaZoning,
      style: app.WIDGETS_STYLE,
    }),
    aoiDataButton: ui.Button({
      label: '領域平均',
      onClick: app.aoiData,
      style: app.WIDGETS_STYLE,
    }),
    pointDataButton: ui.Button({
      label: '地点別データ',
      onClick: app.pointData,
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
  app.charts.panel = ui.Panel({
    widgets: [
      ui.Label('5. データ取得・チャート', app.HEADER_TEXT_STYLE),
      ui.Label('1) サンプリング設定', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.charts.setDrawingButton, // 領域設定
        app.charts.setMapCenterButton, //  領域クリア
      ], ui.Panel.Layout.flow('horizontal')),
      app.charts.clearDrawingButton,
      app.charts.setGridButton,
      ui.Label('グリッド間隔(m)', app.HELPER_TEXT_STYLE),
      app.charts.gridSpacing,
      app.charts.zoningButton,
      app.charts.aoiDataButton,
      app.charts.pointDataButton,
      ui.Label('6. ユーザー設定ロード', app.HEADER_TEXT_STYLE),
      app.charts.userPlaces,
      ui.Label('Credit', app.HEADER_TEXT_STYLE),
      ui.Label(
        'Contains modified Copernicus Sentinel data (2021)',
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
　　　app.filters.sArea,
      app.filters.geoButton,
      app.filters.selectYear,
      app.filters.selectMonth,
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
    var filtered = app.s2LAI
          .filterBounds(Map.getCenter())
          .filterDate(startD, startD.advance(2, 'year'))
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
      app.picker.select.items().reset(ids); // セレクタリスト更新
      // セレクタにリスト先頭の日付をセット
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
};　// 補助機能設定終了
// 初期設定
app.initialSetup = function() {
  // 衛星データセット
  app.imgCollection = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
  app.s2LAI = ee.ImageCollection("users/hkrnhn/S2LAI/S2LAI"); 
  //農水省筆ポリゴン（北海道分） 
  app.Fudepoly = ee.FeatureCollection('users/hkrnhn/fude2023/Hokkaido');
  app.Fudeoutline = ee.Image().byte()
    .paint({
      featureCollection: app.Fudepoly,
      color: 1,
      width: 1
    });
  // 湛水筆ポリゴン2021
  app.fudePaddy2021 = ee.FeatureCollection('users/hkrnhn/fude2021/paddyHokkaidoRF');
  // 市町村境界（国土数値情報、北海道分）
  app.Admindiv = ee.FeatureCollection('users/hkrnhn/adminHokkaido');
  app.Admindivline = ee.Image().byte()
    .paint({
       featureCollection: app.Admindiv,
       color: 1,
       width: 2
    });
  app.IMAGE_COUNT_LIMIT = 60; // 検索画像数の上限
  app.IMAGE_LIST_LIMIT = 20; // 検索結果リストの上限数
  app.cloudCover = 50; // 検索条件の雲量初期値
  // マップレイヤー初期設定、市町村境界・筆ポリゴン表示
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.drawingTools().setLinked(false);
  var urlLon = ui.url.get('lon', 142.506); // URLから経度取得
  var urlLat = ui.url.get('lat', 43.566); // URLから緯度取得
  var urlZoom = ui.url.get('zoom', 7); // URLからZoom倍率取得
  Map.setCenter(urlLon, urlLat, urlZoom);
  Map.layers().set(0, ui.Map.Layer({shown: false}));
  Map.layers().set(1, ui.Map.Layer({shown: false}));
  var Admin = ui.Map.Layer(app.Admindivline, {palette: '#ffa500'}, 'Admin division', false);
  Map.layers().set(2, Admin);
  var Fude = ui.Map.Layer(app.Fudeoutline, {palette: '#808080'}, 'Fude polygon', false);
  Map.layers().set(3, Fude);
  // データクレジット表示パネル
  // app.creditPanel = ui.Panel({
  //   widgets: [
  //     ui.Label(
  //       'Contains modified Copernicus Sentinel data (2021)',
  //       {fontSize: '0.6em'}),
  //   ],
  // });
  // app.creditPanel.style().set({
  //   position: 'bottom-center',
  //   margin: '-2.5em',
  //   padding: '0'
  // });
  // Map.widgets().set(0, app.creditPanel);
  // データ・チャート表示用パネル
  app.dispChartPanel = ui.Panel({
    style: {
      position: 'bottom-left',
      shown: false
    },
  });
  Map.widgets().set(0, app.dispChartPanel);
  // スタイル設定
  app.SECTION_STYLE = {margin: '0.2em 0 0 0'};
  app.WIDGETS_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em',
    fontSize: '0.75em',
  };
  app.HEADER_TEXT_STYLE = {
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
  app.dataStartYear = 2018; // データセットの初年目
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
    });
  };
  // 検索開始年リストのセット関数
  app.setYear = function() {
    var yearList = ee.List.sequence({
      start: app.dataStartYear,
      end: app.thisYear,
      step: 1
    })
    .map(function(y) {
      return ee.Number(y).format('%04d');
    });
    yearList.evaluate(function(ids){
      app.filters.selectYear.items().reset(ids);
      app.filters.selectYear.setValue(app.startYear);
    });
  };
  // 植生指数バンドの計算
  app.calcNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4'])
          .rename('NDVI');
    return ndvi;
  };
  app.calcEVI2 = function(image) {
    var evi2 = image.expression(
      '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 1))', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      }).rename('EVI2');
    return evi2;
  };
  app.calcWDRVIgreen = function(image) { //greenWDRVI
    var wdrvigreen = image.expression(
      '(0.1 * NIR - GREEN) / (0.1 * NIR + GREEN) + 0.818', {
      'NIR': image.select('B8'),
      'GREEN': image.select('B3'),
      }).rename('WDRVIgreen');
    return wdrvigreen;
  };
  // マップ用関数：植生指数付加、スケール変換、リサンプル
  app.ScaleResample = function(image) {
    var scaledImg = image.select('B[2-8]', 'B8A', 'B11', 'B12')
      .divide(10000);
    var ndvi = app.calcNDVI(scaledImg);
    var evi2 = app.calcEVI2(scaledImg);
    var WDRVIgreen = app.calcWDRVIgreen(scaledImg);
    return scaledImg.addBands(ndvi)
      .addBands(evi2).addBands(WDRVIgreen)
      .resample('bilinear');
  };
  app.laiResample = function(image) {
    var mask = image.select('b1').gt(0);
    return image.select('b1').rename('LAI')
      .updateMask(mask)
      // .copyProperties(image, ['system:time_start'])
      .resample('bilinear');
  };
  // ジオメトリツール起動用関数
  app.setDrawingTools = function() {
    Map.drawingTools().clear();
    Map.drawingTools().setShown(true);
    // Map.drawingTools().setLinked(false);
    Map.drawingTools().setDrawModes(['point', 'line', 'polygon']);
  };
  // カラー合成画像の表示オプション
  app.VIS_OPTIONS = {
    'トゥルーカラー': {
      description: '肉眼視に近い色づけ',
      visParams: {
        gamma: 1.3,
        min: 0.02,
        max: 0.18,
        bands: ['B4', 'B3', 'B2']
      }
    },
    'フォールスカラー': {
      description: 'RGB=中間赤外/近赤外/赤',
      visParams: {
        gamma: 1.3,
        min: 0.025,
        max: 0.47,
        bands: ['B11', 'B8', 'B4']
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
    '虹色':palettes.kovesi.rainbow_bgyr_35_85_c73[7],
    '青-水-緑-黄-赤':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'],
    // '虹色（原色）':['#0000ff','#00ffff','#00ff00','#ffff00','#ff0000'],
  };
  app.colorRamp = app.colorSchemes['赤～黄～緑']; // パレット初期値
  app.VIS_OPTIONS2 = {
    'LAI': {
      description: 'LAI',
      visParams: {
        'bands': ['LAI'],
        'min':0.0, 'max':6.0,
      },
    },
    'NDVI': {
      description: 'NDVI=(NIR-RED)/(NIR+RED)',
      visParams: {
        'bands': ['NDVI'],
        'min': 0.2,'max':1.0,
      },
    },
    'EVI2': {
      description: 'EVI2=2.5*(NIR-RED)/(NIR+2.4*RED+1)',
      visParams: {
        'bands': ['EVI2'],
        'min': 0.2,'max': 0.9,
      },
    },
    'WDRVIgreen': {
      description: 'WDRVIgreen=(0.1*NIR-G)/(0.1*NIR+G)+0.818',
      visParams: {
        'bands': ['WDRVIgreen'],
        'min': 0.1,'max':0.9,
      },
    },
  }; // End of app.VIS_OPTIONS2.
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
  app.legendPanel.style().set({'shown': false});
  // メインパネルの表示切り替え関数
  app.mainPanelControl = function() {
    app.filters.closeButton.onClick(function() {
      app.main.style().set('shown', false);
      // app.creditPanel.style().set('shown', false);
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
        // app.creditPanel.style().set('shown', true);
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
  app.refreshMapLayer0 = function() {
    if (app.imageDateStr) {
      var imgDate = ee.Date(app.imageDateStr);
      app.dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
      app.mosaicimg = app.imgCollection
        .filterDate(app.dateRange)
        .map(app.ScaleResample).mean();
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
      app.mosaicLaiImg = app.s2LAI
        .filterDate(app.dateRange)
        .map(app.laiResample).mean()
        .addBands(app.mosaicimg, ['EVI2', 'NDVI', 'WDRVIgreen']);
      var option2 = app.VIS_OPTIONS2[app.visTmap.select.getValue()];
      option2.visParams.palette = app.colorRamp;
      var bands = option2.visParams.bands;
      app.legendBands.setValue(bands);
      var visMin = option2.visParams.min;
      var visMax = option2.visParams.max;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      var mapImg = app.mosaicLaiImg;
      var mapImgname = bands + ':' + app.imageDateStr;
      var mapImgCheck = app.visTmap.checkVI.getValue();
      var mapImgAg = mapImg.clipToCollection(app.Fudepoly); // 農地の切り出し
      var mapImgPaddy2021 = mapImg.clipToCollection(app.fudePaddy2021); // 湛水農地2021
      var vegMask = mapImg.select('EVI2').gt(0.25); // 植生の切り出し
      var mapImgAgVeg = mapImgAg.updateMask(vegMask);
      var maskOption = app.MASK_OPTIONS[app.visTmap.selectMask.getValue()];
      app.visTmapImg = mapImg;
      if (maskOption.clipFude) { 
        app.visTmapImg = mapImgAg;
      }
      if (maskOption.maskClass == 'veg') {
        app.visTmapImg = mapImgAgVeg;
      }
      if (maskOption.maskClass == 'paddy2021') {
        app.visTmapImg = mapImgPaddy2021;
      }
      var VImap = ui.Map.Layer(app.visTmapImg, option2.visParams, mapImgname, mapImgCheck);
      Map.layers().set(1, VImap);
    }
  }; // 主題図レイヤの更新終了
  // カラー合成画像の明るさ自動調整
  app.setVisMinMax = function() {
    var mapBounds = ee.Geometry.Rectangle(Map.getBounds());
    var currentVisParams = Map.layers().get(0).getVisParams();
    var bandR = currentVisParams.bands[0];
    var bandG = currentVisParams.bands[1];
    var bandB = currentVisParams.bands[2];
    var currentScale = Map.getScale() * 5;
    var imgStats = app.mosaicimg
      .select([bandR, bandG, bandB])
      .reduceRegion({
        reducer: ee.Reducer.percentile([2,98]),
        geometry: mapBounds,
        scale: currentScale,
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
      Map.layers().get(0).setVisParams(currentVisParams);
    });
  };
  // 主題図レイヤのMinMax自動調整
  app.setVisTmapMinMax = function() {
    var mapBounds = ee.Geometry.Rectangle(Map.getBounds());
    var currentVisParams = Map.layers().get(1).getVisParams();
    var band = currentVisParams.bands[0];
    var currentScale = Map.getScale() * 5;
    var imgStats = app.visTmapImg
      .select([band])
      .reduceRegion({
        reducer: ee.Reducer.percentile([20,98]),
        geometry: mapBounds,
        scale: currentScale,
      });
    imgStats.evaluate(function(stats) {
      var visMin = stats[band + '_p20'];
      var visMax = stats[band + '_p98'];
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
    });
  }, 200));
  Map.onChangeZoom(ui.util.debounce(function() {
    var zoom = Map.getZoom();
    ui.url.set('zoom', zoom);
  }, 200));
  // ダウンロードリンク表示関数
  app.showUrl = function(aoiFC, dataType) {
    // FCに日付属性追加
    var obsDate = app.imageDateStr;
    var setDate = function(feature) {
      return feature.set({date: obsDate});
    };
    aoiFC = aoiFC.map(setDate);
    // FCによる画像集計
    var currentScale = Math.max(Map.getScale(), 10);
    var sampleFC = app.visTmapImg.reduceRegions({
      collection: aoiFC,
      reducer: ee.Reducer.mean(),
      scale: currentScale,
    });
    var dlUrl = function(formatNam) {
      return sampleFC.getDownloadURL({format: formatNam, filename: 'aoi' + obsDate});
    };
    var dlUrlCSV = dlUrl('CSV');
    var dlUrlKML = dlUrl('kml');
    var dlUrlJSON = dlUrl('json');
    var dlLabel = ui.Label(dataType + 'データ, ' + obsDate);
    var dlLabelCSV = ui.Label('CSV形式', app.LEGEND_TEXT_STYLE)
      .setUrl(dlUrlCSV);
    var dlLabelKML = ui.Label('KML形式', app.LEGEND_TEXT_STYLE)
      .setUrl(dlUrlKML);
    var dlLabelJSON = ui.Label('GeoJSON形式', app.LEGEND_TEXT_STYLE)
      .setUrl(dlUrlJSON);
    app.showUrlPanel = ui.Panel({
      widgets: [
        dlLabel,
        dlLabelCSV,
        dlLabelKML,
        dlLabelJSON,
      ],
    });
    app.dispChartPanel.clear();
    app.dispChartPanel.style().set('shown', true);
    app.dispChartPanel.widgets().set(0, app.showUrlPanel);
  }; // ダウンロードリンク表示関数終了
  // グリッド地点発生関数
  app.setGridPoints = function() {
    if (Map.drawingTools().layers().get(0)) {
      var aoi = Map.drawingTools().layers().get(0).toGeometry();
      var alosDsm = ee.Image('JAXA/ALOS/AW3D30/V2_2').select('AVE_DSM').rename('Elevation');
      app.samplePoints = alosDsm.sample({
        region: aoi,
        geometries: true,
        scale: app.charts.gridSpacing.getValue(),
      });
      var spLayer = ui.Map.Layer(app.samplePoints, {color: 'FF0000'}, 'samplePoints');
　　  Map.layers().set(4, spLayer);
　　  // Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
    } // end of if
  };
  // 領域内を5段階ゾーニング
  app.areaZoning = function() {
    var aoiGeo = '';
    if (Map.drawingTools().layers().get(0)) {
      aoiGeo = Map.drawingTools().layers().get(0).toGeometry();
      Map.drawingTools().layers().get(0).setShown(false); // 領域表示をOFF
    } else {
      aoiGeo = ee.Geometry.Rectangle(Map.getBounds());
    }
    var currentVisParams = Map.layers().get(1).getVisParams();
    var visBand = currentVisParams.bands[0];
    var visImg = app.visTmapImg.select([visBand]).clip(aoiGeo);
    // visImg = visImg.focal_median(1.5); // 平滑化
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
      var zones = visImg.gte(0)
        .add(visImg.gt(th1)).add(visImg.gt(th2))
        .add(visImg.gt(th3)).add(visImg.gt(th4));
      var visParams = {min: 1, max: 5, palette: app.colorRamp};
      var zonesName = 'Zones_' + visBand;
      var zonesLayer = ui.Map.Layer(zones, visParams, zonesName, true);
　　  Map.layers().set(4, zonesLayer);
　　  var obsDate = app.imageDateStr;
　　  var dlName = visBand + '_' + obsDate;
　　  var downloadArgs = {
        name: dlName,
        crs: 'EPSG:3857',
        scale: 10,
        region: aoiGeo
      };
      var imgUrl = zones.getDownloadURL(downloadArgs);
      var median = (stats[visBand + '_p50']).toFixed(2);
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
          ui.Label(th1.toFixed(2), Label_STYLE),
          ui.Label(th2.toFixed(2), Label_STYLE),
          ui.Label(th3.toFixed(2), Label_STYLE),
          ui.Label(th4.toFixed(2), Label_STYLE),
        ],
        layout: ui.Panel.Layout.flow('horizontal'),
      });
      var zone_colorBar =  ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: app.makeColorBarParams(app.colorRamp),
        style: {
          stretch: 'horizontal',
          margin: '0 0.3em',
          maxHeight: '0.8em'},
      });
      var dlLabelGeoTIFF = ui.Label('ダウンロードGeoTIFF', app.LEGEND_TEXT_STYLE)
        .setUrl(imgUrl);
      app.showUrlPanel = ui.Panel({
        widgets: [
          label1, label2, label3,
          zone_colorBar,
          dlLabelGeoTIFF
        ],
      });
      app.dispChartPanel.clear();
      app.dispChartPanel.style().set('shown', true);
      app.dispChartPanel.widgets().set(0, app.showUrlPanel);
    });
  };
  // 領域平均データ取得関数
  app.aoiData = function() {
    if (Map.drawingTools().layers().get(0)) {
      var aoiGeo = Map.drawingTools().layers().get(0).toGeometry();
      var aoiFC = ee.FeatureCollection(aoiGeo);
      app.showUrl(aoiFC, '領域平均');
    }
  };
  // 地点別データ取得関数
  app.pointData = function() {
    if (app.samplePoints) {
      app.showUrl(app.samplePoints, '地点別');
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
      app.picker.panel,
      app.vis.panel,
      app.visTmap.panel,
      app.charts.panel
    ],
    style: {width: '13em', padding: '0.4em'}
  });
  ui.root.insert(0, app.main);
  app.mainPanelControl();
};
app.boot();