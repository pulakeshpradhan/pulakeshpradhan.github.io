// S2Gallery
// Sentinel-2画像ギャラリー
var app = {}; //空のオブジェクト生成
// UIパネル作成開始
app.createPanels = function() {
  // 画像表示設定の選択
  app.vis = {
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        app.vis.label.setValue(option.description);
        app.refreshMapLayer();
      },
      style: {stretch: 'horizontal', margin: 0},
    }),
    label: ui.Label({style: {fontSize: '0.75em', whiteSpace: 'pre-wrap'}}),
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0'},
    }),
  };
  app.vis.panel = ui.Panel({
    widgets: [
      // ui.Label('3. カラー合成', app.HEADER_TEXT_STYLE),
      app.vis.select,
      app.vis.label,
      app.vis.closeButton,
    ],
    style: {
      position: 'top-left',
      width: '300px',
    },
  });
  Map.widgets().set(1, app.vis.panel);
  // 画像表示設定の初期値
  app.vis.select.setValue(app.vis.select.items().get(0));
}; 
// UIパネル作成終了
// マップ画面の更新
app.refreshMapLayer = function() {
    // 衛星画像の加工とモザイク
    Map.setLocked(false);
    var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    var imgDate = ee.Date(visOption.date);
    var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
    var mosaicimg = visOption.dataset
      .filterDate(dateRange)
      .map(app.ScaleResample).mosaic();
    if (visOption.clipFude) { // 農地の切り出し
      mosaicimg = mosaicimg.clipToCollection(app.Fudepoly);
      Map.setLocked(false, 13);
    }
    if (visOption.maskBare) { // 裸地の切り出し
      var bareMask = mosaicimg.select('EVI2').lt(0.25);
      mosaicimg = mosaicimg.updateMask(bareMask);
    }
    if (visOption.maskVeg) { // 植生の切り出し
      var vegMask = mosaicimg.select('EVI2').gt(0.25);
      mosaicimg = mosaicimg.updateMask(vegMask);
    }
    // 画像の表示
    var centerCoords = visOption.coords;
    Map.setCenter(centerCoords[0], centerCoords[1], centerCoords[2]);
    var mainImg = ui.Map.Layer(mosaicimg, visOption.visParams, 'MosaicImg');
    Map.layers().set(0, mainImg);
    // 筆ポリゴン境界の表示
    var fudeDisp = visOption.fude;
    var Fude = ui.Map.Layer(app.Fudeoutline, {palette: '#808080'}, 'Fude polygon', fudeDisp);
    Map.layers().set(1, Fude);
}; // マップ画面の更新終了
// 初期設定
app.initialSetup = function() {
  // マップ画面の初期化
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.setControlVisibility({
      layerList: false,
      mapTypeControl: false,
      // fullscreenControl : false,
  });
  // Map.setOptions('SATELLITE');
  Map.setCenter(142.506, 43.566, 7);
  // 衛星データセット
  app.S2 = ee.ImageCollection('COPERNICUS/S2');
  app.S2_SR = ee.ImageCollection('COPERNICUS/S2_SR');
  //農水省筆ポリゴン（北海道分） 
  app.Fudepoly = ee.FeatureCollection('users/hkrnhn/fude2019/HokkaidoS2');
  app.Fudeoutline = ee.Image().byte()
    .paint({
      featureCollection: app.Fudepoly,
      color: 1,
      width: 1
    });
  // 植生指数バンドの計算
  app.calcNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4'])
          .rename('NDVI');
    return ndvi;
  };
  app.calcEVI2 = function(image) {
    var evi2 = image.expression(
      '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 10000))', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      }).rename('EVI2');
    return evi2;
  };
  // マップ表示用：植生指数付加、スケール変換、リサンプル
  app.ScaleResample = function(image) {
    var ndvi = app.calcNDVI(image);
    var evi2 = app.calcEVI2(image);
    return image.select('B[2-8]', 'B8A', 'B11', 'B12').divide(10000)
      .addBands(ndvi)
      .addBands(evi2)
      .resample('bilinear');
  };
  // カラーパレット
  app.colorRamp1 = ['#762a83','#af8dc3','#e7d4e8','#d9f0d3','#7fbf7b','#1b7837']; // 紫～緑
  app.colorRamp2 = ['#ffffcc','#d9f0a3','#addd8e','#78c679','#31a354','#006837']; // 黄～緑
  app.colorRamp3 = ['#8c510a','#d8b365','#f6e8c3','#c7eae5','#5ab4ac','#01665e']; // 茶～青緑
  app.colorRamp4 = ['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4']; // 赤～黄～青
  // 画像表示設定
  app.VIS_OPTIONS = {
    '北海道中央部': {
      description: '1.機能\n' +
        '表示する画像を上部のリストから選択すると、' +
        'Sentinel-2データをクラウドから呼び出し、' +
        'リアルタイムで画像を生成・表示します。' +
        '画像の拡大や移動ができます。' +
        '画面の左半分がSentinel-2画像、右がGoogle Mapとなっており、' +
        '画面中央のハンドルを左右にドラッグすることで、画像とマップを比較できます。\n' +
        '2.画像の説明\n' +
        '・2020年6月1日\n' +
        '・フォールスカラー: RGB=中間赤外/近赤外/赤\n' +
        '植生は緑、湛水した水田は暗色、裸地状態の畑地は赤茶色。' +
        '大雪山系・十勝連峰の残雪が水色に見える。',
      dataset: app.S2_SR,
      date: '2020-06-01',
      coords: [142.219, 43.525, 8],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:0.02,
        max:0.5,
        bands: ['B11', 'B8', 'B4']
      }
    },
    '秋の東日本': {
      description: '・2019年10月10日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        'Sentinel-2は、地方時で10:30頃に東西の幅290kmで北から南へ観測を行う。' +
        '2機体制で、5日周期、解像度10mで世界の陸域をカバーしている。',
      dataset: app.S2_SR,
      date: '2019-10-10',
      coords: [140.582, 39.326, 6],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.3,
        min:[0.01, 0.01, 0.01],
        max:[0.17, 0.17, 0.17],
        bands: ['B4', 'B3', 'B2']
      }
    },
    'オホーツク地域、春の強風': {
      description: '・2019年5月20日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '強い南風により畑地の表土が飛散。' +
        '土煙がオホーツク海沖合まで流れている。' +
        '観測時のアメダス小清水の最大瞬間風速は24m/s。',
      dataset: app.S2_SR,
      date: '2019-05-20',
      coords: [144.682, 44.091, 10],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.1,
        min:[0.01, 0.01, 0.01],
        max:[0.21, 0.21, 0.21],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '美唄市（空知総合振興局）、開花期のなたね': {
      description: '・2020年6月1日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '5月中旬～6月上旬の開花時期には、鮮やかな黄色の圃場が見える。',
      dataset: app.S2_SR,
      date: '2020-06-01',
      coords: [141.823, 43.324, 14],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 0.8,
        min:[0.01, 0.01, 0.01],
        max:[0.17, 0.17, 0.17],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '音更町（十勝総合振興局）': {
      description: '・2019年5月23日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '5月下旬、秋まき小麦以外の畑地は裸地状態であり、' +
        '地点による土色の違いが目立つ。',
      dataset: app.S2_SR,
      date: '2019-05-23',
      coords: [143.1698, 43.0143, 14],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 0.9,
        min:[0.0, 0.0, 0.0],
        max:[0.16, 0.16, 0.16],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '音更町、畑地の土色': {
      description: '・2019年5月23日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '農水省の筆ポリゴンで農地を切り出し、さらに裸地を抽出。' +
        '土壌が乾燥した状態では、土色の濃淡は主に腐植の多少を反映',
      dataset: app.S2_SR,
      date: '2019-05-23',
      coords: [143.1698, 43.0143, 14],
      clipFude: true,
      maskBare: true,
      maskVeg: false,
      fude: true,
      visParams: {
        gamma: 0.9,
        min:[0.0, 0.0, 0.0],
        max:[0.16, 0.16, 0.16],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '音更町、農地の植生指数': {
      description: '・2019年5月23日\n' +
        '・2バンド拡張植生指数(EVI2)\n' +
        '・EVI2=2.5*(NIR-RED)/(NIR+2.4*RED+1)\n' +
        '・色分け：植生量（小～大）が（茶～青緑）に対応\n' +
        '農水省の筆ポリゴンで農地を切り出し、さらに植生を抽出。' +
        '植生は主に秋まき小麦・草地',
      dataset: app.S2_SR,
      date: '2019-05-23',
      coords: [143.1698, 43.0143, 14],
      clipFude: true,
      maskBare: false,
      maskVeg: true,
      fude: true,
      visParams: {
        min:[0.25],
        max:[0.6],
        bands: ['EVI2'],
        palette: app.colorRamp3,
      }
    },
    '別海町（根室振興局）': {
      description: '・2020年6月3日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '白い箇所はマルチフィルムによる被覆で、' +
        '主に飼料用とうもろこしとみられる。',
      dataset: app.S2_SR,
      date: '2020-06-03',
      coords: [144.8037, 43.4191, 14],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:[0.01, 0.01, 0.01],
        max:[0.17, 0.17, 0.17],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '別海町、農地の植生指数': {
      description: '・2020年6月3日\n' +
        '・2バンド拡張植生指数(EVI2)\n' +
        '・EVI2=2.5*(NIR-RED)/(NIR+2.4*RED+1)\n' +
        '・色分け：植生量（小～大）が（茶～青緑）に対応\n' +
        '農水省の筆ポリゴンで農地を切り出し、さらに植生（主に草地）を抽出。' +
        '6月上旬の一番草収穫前は、牧草生育が年間で最大となる時期。',
      dataset: app.S2_SR,
      date: '2020-06-03',
      coords: [144.8037, 43.4191, 14],
      clipFude: true,
      maskBare: false,
      maskVeg: true,
      fude: true,
      visParams: {
        min:[0.25],
        max:[0.8],
        bands: ['EVI2'],
        palette: app.colorRamp3,
      }
    },
    '訓子府町（オホーツク総合振興局）、晩秋': {
      description: '・2020年11月8日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '畑作物の収穫がほぼ終了し、濃い緑は秋まき小麦、明るい緑は草地。' +
        '耕地防風林のカラマツが黄金色となっている。',
      dataset: app.S2_SR,
      date: '2020-11-08',
      coords: [143.7893, 43.7579, 14],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:[0.01, 0.01, 0.01],
        max:[0.14, 0.14, 0.14],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '帯広空港周辺、早春': {
      description: '・2020年3月18日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '農地はまだ積雪下。融雪剤を散布した箇所がグレーに見える。',
      dataset: app.S2_SR,
      date: '2020-03-18',
      coords: [143.2332, 42.7426, 14],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.1,
        min:[0.03, 0.03, 0.03],
        max:[0.98, 0.98, 0.98],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '知床半島と流氷': {
      description: '・2019年2月9日\n' +
        '・赤外カラー: RGB=近赤外/赤/緑\n' +
        'オホーツク海では、主に1月半ばから3月末まで流氷が見られる。' +
        '世界で最も低緯度に現れる流氷である。',
      dataset: app.S2_SR,
      date: '2019-02-09',
      coords: [144.682, 44.091, 10],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.1,
        min:[0.03, 0.03, 0.03],
        max:[0.98, 0.98, 0.98],
        bands: ['B8', 'B4', 'B3']
      }
    },
    '米国アイダホ州のかんがい農地': {
      description: '・2020年7月9日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '円形のセンターピボット圃場のサイズは半径約400m、面積50ha',
      dataset: app.S2_SR,
      date: '2020-07-09',
      coords: [-112.575, 44.019, 13],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:[0.01, 0.01, 0.01],
        max:[0.17, 0.17, 0.17],
        bands: ['B4', 'B3', 'B2']
      }
    },
    '米国オレゴン州の森林火災': {
      description: '・2020年9月9日\n' +
        '・フォールスカラー: RGB=中間赤外/近赤外/赤\n' +
        '2020年8月から9月にかけて西海岸で発生した大規模な森林火災の一部',
      dataset: app.S2,
      date: '2020-09-09',
      coords: [-121.994, 45.081, 9],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:0.02,
        max:0.5,
        bands: ['B11', 'B8', 'B4']
      }
    },
    'アフガニスタン東部、クナール川流域': {
      description: '・2020年9月10日\n' +
        '・トゥルーカラー: 肉眼視に近い色づけ\n' +
        '2003年から国際NGOペシャワール会による「マルワリード用水路」が建設されている',
      dataset: app.S2_SR,
      date: '2020-09-10',
      coords: [70.604, 34.588, 12],
      clipFude: false,
      maskBare: false,
      maskVeg: false,
      fude: false,
      visParams: {
        gamma: 1.0,
        min:[0.01, 0.01, 0.01],
        max:[0.24, 0.24, 0.24],
        bands: ['B4', 'B3', 'B2']
      }
    },
  }; // 画像表示設定終了
  // マップ画面にクレジットを表示
  app.creditPanel = ui.Panel({
    widgets: [
      ui.Label(
        'Contains modified Copernicus Sentinel data (2020)',
        {fontSize: '0.6em'}),
    ],
  });
  app.creditPanel.style().set({
    'position': 'bottom-center',
    'margin': '-2.5em',
    'padding': '0'
  });
  Map.widgets().set(0, app.creditPanel);
}; // 初期設定終了
// 設定パネルの表示切り替え
app.panelControl = function() {
  app.vis.closeButton.onClick(function() {
    app.vis.panel.style().set('shown', false);
    app.creditPanel.style().set('shown', false);
    app.openButton.style().set('shown', true);
  });
  app.openButton = ui.Button({
    label: '設定',
    style: {position: 'top-left', 'padding': 0},
    onClick: function() {
      app.openButton.style().set('shown', false);
      app.vis.panel.style().set('shown', true);
      app.creditPanel.style().set('shown', true);
    }
  });
  Map.add(app.openButton);
  app.openButton.style().set('shown', false);
};
// アプリケーション立ち上げ
app.boot = function() {
  app.initialSetup();
  app.createPanels();
  app.panelControl();
  app.linkedMap = ui.Map(); // 分割画面の設定開始
  app.linker = ui.Map.Linker([ui.root.widgets().get(0), app.linkedMap]);
  app.splitPanel = ui.SplitPanel({
    firstPanel: app.linker.get(0),
    secondPanel: app.linker.get(1),
    orientation: 'horizontal',
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().reset([app.splitPanel]); // 分割分割画面の設定終了
};
app.boot();