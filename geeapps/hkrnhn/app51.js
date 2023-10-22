// ALOS_AVNIR2_app
// ALOS/AVNIR-2 オルソ補正画像
var app = {}; //空のオブジェクト生成
// UIメインパネル作成開始
app.createPanels = function() {
  // 検索条件指定パネル
  app.filters = {
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0 0 0 4em'},
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
        value: 'ALOS/AVNIR-2 オルソ補正画像',
        style: {
          fontWeight: 'bold',
          fontSize: '0.9em',
          margin: '0.4em 0'},
      }),
      ui.Label('1. 検索条件', app.HEADER_TEXT_STYLE),
      app.filters.geoButton,
      ui.Label('開始年・月', app.HELPER_TEXT_STYLE), 
      app.filters.selectYear,
      app.filters.selectMonth,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
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
      value: Object.keys(app.VIS_OPTIONS)[0],
      onChange: function(key) {
        app.refreshMapLayer0();
      },
      style: app.WIDGETS_STYLE,
    }),
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
  };
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3. カラー合成', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.vis.checkColorComp,
        app.vis.select,
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis.setVisButton,
      app.vis.checkAdBounds,
    ],
    style: app.SECTION_STYLE
  });
  // 主題図レイヤの表示設定
  app.visTmap = {
    checkVI: ui.Checkbox({ // レイヤ表示ON/OFF
      value:false,
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked);
        app.legendPanel.style().set('shown', checked);
        // Map.widgets().get(1).style().set('shown', checked);
      },
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // 植生指数の選択
      items: Object.keys(app.VIS_OPTIONS2),
      value: Object.keys(app.VIS_OPTIONS2)[0],
      onChange: function(key) {
        app.refreshMapLayer1();
      },
      style: app.WIDGETS_STYLE,
    }),
    setVisTmapButton: ui.Button({
      label: '調整',
      onClick: app.setVisTmapMinMax,
      style: app.WIDGETS_STYLE,
    }),
    selectMask: ui.Select({ // 画像抽出条件の選択
      items: Object.keys(app.MASK_OPTIONS),
      value: Object.keys(app.MASK_OPTIONS)[0],
      onChange: app.refreshMapLayer1,
      style: app.WIDGETS_STYLE,
    }),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      placeholder: '配色変更',
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
    markerDispButton: ui.Button({
      label: 'ON/OFF',
      onClick:function() {
        if (Map.drawingTools().layers().get(0).getShown()) {
          Map.drawingTools().layers().get(0).setShown(false);
        }else
          Map.drawingTools().layers().get(0).setShown(true);
        },
      style: app.WIDGETS_STYLE,
    }),
    dispDataButton: ui.Button({
      label: 'データ表示',
      onClick: app.dispMarkerData,
      style: app.WIDGETS_STYLE,
    }),
    gsiLabel: ui.Label('地理院地図', app.WIDGETS_STYLE),
  };
  app.visTmap.panel = ui.Panel({
    widgets: [
      ui.Label('4. 植生指数など', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.visTmap.checkVI,
        app.visTmap.select,
      ], ui.Panel.Layout.flow('horizontal')),
      app.visTmap.setVisTmapButton,
      app.visTmap.selectMask,
      app.visTmap.selectColorScheme,
      ui.Label('5. マーカー地点', app.HEADER_TEXT_STYLE),
      app.visTmap.markerDispButton,
      app.visTmap.dispDataButton,
      ui.Label('6. 外部リンク', app.HEADER_TEXT_STYLE),
      app.visTmap.gsiLabel,
      ui.Label('Credit', app.HEADER_TEXT_STYLE),
      ui.Label(
        'ALOS/AVNIR-2 オルソ補正画像プロダクト(JAXA)',
        {margin: '0.2em', fontSize: '0.6em'})
    ],
    style: app.SECTION_STYLE
  });
}; // UIパネル作成終了
// 補助機能設定
app.createHelpers = function() {
  // 検索実行に合わせて入力ウィジエットを無効化・有効化
  app.setLoadingMode = function(enabled) {
    app.filters.loadingLabel.style().set('shown', enabled);
    var loadDependentWidgets = [
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
    var filtered = app.imgCollection
          .filterBounds(Map.getCenter())
          .filterDate(startD, startD.advance(3, 'year'))
          // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', app.cloudCover))
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
  app.imgCollection = ee.ImageCollection('JAXA/ALOS/AVNIR-2/ORI');
  // 土壌腐植推定値(g/kg)
  // app.soilOM = ee.Image("users/hkrnhn/soilOM/soilOMmedian").resample();
  //農水省筆ポリゴン（北海道分） 
  app.Fudepoly = ee.FeatureCollection('users/hkrnhn/fude2023/Hokkaido');
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
  // app.cloudCover = 50; // 画像検索の雲量上限
  // マップレイヤー初期設定、市町村境界表示
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.drawingTools().setLinked(false);
  Map.setControlVisibility({layerList: false, fullscreenControl: false});
  var urlLon = ui.url.get('lon', 142.506); // URLから経度取得
  var urlLat = ui.url.get('lat', 43.566); // URLから緯度取得
  var urlZoom = ui.url.get('zoom', 7); // URLからZoom倍率取得
  var urlDic = {lon:urlLon, lat:urlLat, zoom:urlZoom};
  ui.url.set(urlDic);
  Map.setCenter(urlLon, urlLat, urlZoom);
  Map.layers().set(0, ui.Map.Layer({shown: false}));
  Map.layers().set(1, ui.Map.Layer({shown: false}));
  Map.layers().set(2, app.adminLayer); // 市町村境界
  Map.drawingTools().clear();
  var mapCenter = Map.getCenter();
  var layer = ui.Map.GeometryLayer({geometries: [mapCenter], color:'magenta'});
  Map.drawingTools().layers().set(0, layer);
  // スタイル設定
  app.SECTION_STYLE = {margin: '0.2em 0 0 0'};
  app.WIDGETS_STYLE = {
    stretch: 'horizontal',
    margin: '0.2em',
    fontSize: '0.75em',
  };
  app.HEADER_TEXT_STYLE = {
      margin: '0',
      fontSize: '0.8em',
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
      fontSize: '0.8em',
  };
  // 検索開始年・月リストの生成
  app.today = new Date();
  // app.thisYear = app.today.getFullYear();
  // app.startDate = new Date(app.today.setMonth(app.today.getMonth() - 2));
  // app.startYear = app.startDate.getFullYear().toFixed();
  // app.startMonth = ("00" + (app.startDate.getMonth() + 1)).slice(-2);
  app.startYear = '2006';
  app.startMonth = '05';
  app.monthList = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  // 観測年リスト発生関数
  var serialNumber = function(start, end) {
    var result = [];
    var i = start;
    while (i <= end) result.push((i++).toFixed(0));
    return result;
  };
  app.yearList = serialNumber(2006, 2011);
  // 植生指数バンドの計算
  app.calcNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B4', 'B3'])
          .rename('NDVI');
    return ndvi;
  };
  app.calcGNDVI = function(image) {
    var gndvi = image.normalizedDifference(['B4', 'B2'])
          .rename('GNDVI');
    return gndvi;
  };
  // app.calcEVI2 = function(image) {
  //   var evi2 = image.expression(
  //     '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 1))', {
  //     'NIR': image.select('B4'),
  //     'RED': image.select('B3'),
  //     }).rename('EVI2');
  //   return evi2;
  // };
  // app.calcWDRVIg = function(image) { //greenWDRVI
  //   var WDRVIg = image.expression(
  //     '(0.1 * NIR - GREEN) / (0.1 * NIR + GREEN) + 0.818', {
  //     'NIR': image.select('B4'),
  //     'GREEN': image.select('B3'),
  //     }).rename('WDRVIg');
  //   return WDRVIg;
  // };
  // マップ用関数：スケール変換、植生指数付加、リサンプル
  app.ScaleResample = function(image) {
    var scaledImg = image.select('B[1-4]')
      .divide(255);
    var ndvi = app.calcNDVI(scaledImg);
    var gndvi = app.calcGNDVI(scaledImg);
    // var evi2 = app.calcEVI2(scaledImg);
    // var WDRVIg = app.calcWDRVIg(scaledImg);
    return scaledImg.addBands(ndvi).addBands(gndvi)
      // .addBands(evi2)
      .resample('bilinear');
  };
  // カラー合成画像の表示オプション
  app.VIS_OPTIONS = {
    'トゥルーカラー(B3/B2/B1)': {
      description: '肉眼視に近い色づけ',
      visParams: {
        gamma: 1.3,
        min: 0.02,
        max: 0.74,
        bands: ['B3', 'B2', 'B1']
      }
    },
    '赤外カラー(B4/B3/B2)': {
      description: 'RGB=近赤外/赤/緑',
      visParams: {
        gamma: 1.3,
        min: 0.02,
        max: 0.7,
        bands: ['B4', 'B3', 'B2']
      }
    },
    // 'フォールスカラー(B11/B8/B12)': {
    //   description: 'RGB=中間赤外1/近赤外/中間赤外2',
    //   visParams: {
    //     gamma: 1.3,
    //     min: [0.028,0.085,0.019],
    //     max: [0.239, 0.399, 0.190],
    //     bands: ['B11', 'B8', 'B12']
    //   }
    // },
  };
  // 主題図レイヤのカラーパレット
  // パレットライブラリ https://github.com/gee-community/ee-palettes
  var palettes = require('users/gena/packages:palettes');
  app.colorSchemes = {
    '赤～黄～緑':palettes.colorbrewer.RdYlGn[11],
    '茶～青緑':palettes.colorbrewer.BrBG[11],
    '緑（淡～濃）':palettes.colorbrewer.Greens[9],
    '茶～黄':palettes.colorbrewer.YlOrBr[5].reverse(),
    // '虹色':palettes.kovesi.rainbow_bgyr_35_85_c73[7],
    '青-水-緑-黄-赤':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'],
    '赤-黄-緑-水-青':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'].reverse(),
    // '虹色（原色）':['#0000ff','#00ffff','#00ff00','#ffff00','#ff0000'],
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
        'min': 0.2,'max': 0.9,
      },
    },
    // 'EVI2': {
    //   description: 'EVI2=2.5*(NIR-RED)/(NIR+2.4*RED+1)',
    //   visParams: {
    //     'bands': ['EVI2'],
    //     'min': 0.2,'max': 0.9,
    //   },
    // },
    // 'WDRVIg': {
    //   description: 'WDRVIg=(0.1*NIR-G)/(0.1*NIR+G)+0.818',
    //   visParams: {
    //     'bands': ['WDRVIg'],
    //     'min': 0.1,'max':0.9,
    //   },
    // },
    '赤波長域': {
      description: 'Band3',
      visParams: {
        'bands': ['B3'],
        'min': 0.05,'max':0.30,
      },
    },
    // '腐植含量': {
    //   description: '腐植推定値(g/kg)',
    //   visParams: {
    //     'bands': ['OM'],
    //     'min': 10,'max':120,
    //   },
    // },
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
    '農地・裸地畑': {
      clipFude: true,
      maskClass: 'bare',
    },
    '水田2021': {
      clipFude: false,
      maskClass: 'paddy2021',
    },
  };  
  // メインパネルの表示切り替え関数
  app.mainPanelControl = function() {
    app.filters.closeButton.onClick(function() {
      app.main.style().set('shown', false);
      app.openButton.style().set('shown', true);
      Map.setControlVisibility({
        // layerList: false,
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
        // layerList: true,
        mapTypeControl: true
      });
    }
  });
  Map.widgets().set(0, app.openButton);
  app.openButton.style().set('shown', false);
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
  // カラー合成画像の表示
  app.refreshMapLayer0 = function() {
    if (app.imageDateStr) {
      var imgDate = ee.Date(app.imageDateStr);
      var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
      app.mosaicimg = app.imgCollection
        .filterDate(dateRange)
        .map(app.ScaleResample).mean();
      // app.mosaicimg = ee.Image.cat([app.mosaicimg, app.soilOM]); // 腐植マップを結合
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
      // if (bands == 'OM') { // 腐植については凡例に日付を表示せず
      //   app.legendDate.style().set({'shown': false});
      //   app.legendBands.setValue(bands + ' (g/kg)');
      // } else {
        app.legendDate.style().set({'shown': true});
        app.legendBands.setValue(bands);
      // }
      var visMin = option2.visParams.min;
      var visMax = option2.visParams.max;
      var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
      app.legendMin.setValue(visMin);
      app.legendMax.setValue(visMax);
      app.legendAve.setValue(visAve);
      // var mapImg = app.mosaicimg.select('NDVI', 'GNDVI','EVI2', 'WDRVIg');
      var mapImgname = bands + ':' + app.imageDateStr;
      var mapImgCheck = app.visTmap.checkVI.getValue();
      var mapImgAg = app.mosaicimg.clipToCollection(app.Fudepoly); // 農地の切り出し
      var mapImgPaddy2021 = app.mosaicimg.clipToCollection(app.fudePaddy2021); // 水田2021
      var vegMask = app.mosaicimg.select('EVI2').gt(0.25); // 植生の切り出し
      var mapImgAgVeg = mapImgAg.updateMask(vegMask);
      var bareMask = app.mosaicimg.select('EVI2').lt(0.2) // 裸地の切り出し
        .and(app.mosaicimg.select('B11').gt(0.16));
      var mapImgAgBare = mapImgAg.updateMask(bareMask);
      var maskOption = app.MASK_OPTIONS[app.visTmap.selectMask.getValue()];
      app.visTmapImg = app.mosaicimg;
      if (maskOption.clipFude) { 
        app.visTmapImg = mapImgAg;
      }
      if (maskOption.maskClass == 'veg') {
        app.visTmapImg = mapImgAgVeg;
      }
      if (maskOption.maskClass == 'bare') {
        app.visTmapImg = mapImgAgBare;
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
      // if (bands[0] == 'B3'){ // トゥルーカラーはRGBバランスを保持
      //   currentVisParams.min = Math.min.apply(null, bandsMin);
      //   currentVisParams.max = Math.max.apply(null, bandsMax);
      // } else {
      // RGB個別ストレッチ
        currentVisParams.min = bandsMin;
        currentVisParams.max = bandsMax;
      // }
      // print(currentVisParams);
      Map.layers().get(0).setVisParams(currentVisParams);
    });
  };  
  // 主題図レイヤのMinMax自動調整
 app.setVisTmapMinMax = function() {
    var img = app.visTmapImg;
    var currentVisParams = Map.layers().get(1).getVisParams();
    var bands = currentVisParams.bands;
    var pList = [20,98];
    var geo = ee.Geometry.Rectangle(Map.getBounds());
    var rScale = Map.getScale() * 50;
    var imgStats = app.imgPercentile(img, bands, pList, geo, rScale);
    imgStats.evaluate(function(stats) {
      var visMin = stats[bands[0] + '_p20'];
      var visMax = stats[bands[0] + '_p98'];
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
  // マップ中心にマーカーセット
  Map.onChangeBounds(ui.util.debounce(function() {
    var mapCenter = Map.getCenter();
    var layer = ui.Map.GeometryLayer({geometries: [mapCenter], color:'magenta'});
    Map.drawingTools().layers().set(0, layer);
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
      app.visTmap.gsiLabel.setUrl(gsiMapUrl);
    });
  }, 200));
  // マーカー地点情報表示関数
  app.dispMarkerData = function() {
    Map.widgets().set(2, ui.Label({
      value: 'Loading...',
      style: {color: 'gray', position: 'bottom-left'}
    }));
    var aoi = Map.drawingTools().layers().get(0).toGeometry();
    // 領域平均データ取得
    var aoiFC = ee.FeatureCollection(aoi);
    var obsDate = app.picker.select.getValue();
    var setDate = function(feature) {
      return feature.set({date: obsDate});
    };
    aoiFC = aoiFC.map(setDate);
    var sampleFC = (app.mosaicimg).reduceRegions({
      collection: aoiFC,
      reducer: ee.Reducer.mean(),
      scale: 10,
    });
    var sampleDic = sampleFC.first().toDictionary(['NDVI', 'GNDVI']);
    sampleDic.evaluate(function(stats) {
      var NDVIstr = '●NDVI:' + (Math.round(stats.NDVI * 1000) / 1000);
      // var EVI2str = '●EVI2:' + (Math.round(stats.EVI2 * 1000) / 1000);
      var GNDVIstr = '●GNDVI:' + (Math.round(stats.GNDVI * 1000) / 1000);
      // var OMstr = '●腐植(g/kg):' + Math.round(stats.OM);
      var timeStr = (new Date()).toJSON().slice(10,19);
      var fileNam = 'aoi' + obsDate + timeStr; // ファイル名に作成時刻情報
      var dlUrlJSON = sampleFC.getDownloadURL({format: 'geojson', filename: fileNam});
      var dlUrlKML = sampleFC.getDownloadURL({format: 'kml', filename: fileNam});
      app.dispData.dateLabel.setValue(obsDate);
      app.dispData.NDVI_Label.setValue(NDVIstr);
      // app.dispData.EVI2_Label.setValue(EVI2str);
      app.dispData.GNDVI_Label.setValue(GNDVIstr);
      // app.dispData.OM_Label.setValue(OMstr);
      app.dispData.dlLabelJSON.setUrl(dlUrlJSON);
      app.dispData.dlLabelKML.setUrl(dlUrlKML);
      app.dispData.panel.style().set('shown', true);
      Map.widgets().set(2, app.dispData.panel);
    });
  }; // マーカー地点情報表示終了
  // データ・チャート表示用パネル
  app.dispData = {
    closeButton: ui.Button({
      label: '閉じる',
      onClick: function() {
        app.dispData.panel.style().set('shown', false);
      },
      style: app.WIDGETS_STYLE,
    }),
    refreshButton: ui.Button({
      label: '更新',
      onClick: app.dispMarkerData,
        style: app.WIDGETS_STYLE,
    }),
    dateLabel: ui.Label({style:app.LEGEND_TEXT_STYLE}),
    NDVI_Label: ui.Label({style:app.LEGEND_TEXT_STYLE}),
    EVI2_Label: ui.Label({style:app.LEGEND_TEXT_STYLE}),
    GNDVI_Label: ui.Label({style:app.LEGEND_TEXT_STYLE}),
    OM_Label: ui.Label({style:app.LEGEND_TEXT_STYLE}),
    dlLabelJSON: ui.Label('GeoJSON', app.LEGEND_TEXT_STYLE),
    dlLabelKML: ui.Label('KML', app.LEGEND_TEXT_STYLE),
  };
  app.dispData.panel = ui.Panel({
    widgets: [
      ui.Panel([
        app.dispData.closeButton,
        app.dispData.refreshButton,
      ], ui.Panel.Layout.flow('horizontal')),
      app.dispData.dateLabel,
      app.dispData.NDVI_Label,
      app.dispData.EVI2_Label,
      app.dispData.GNDVI_Label,
      app.dispData.OM_Label,
      ui.Panel([
        app.dispData.dlLabelJSON,
        app.dispData.dlLabelKML,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: {
      position: 'bottom-left',
      margin: '0.2em 0 0 0',
      shown: false
    },
  });
  // Map.widgets().set(2, app.dispData.panel);
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
    ],
    style: {width: '10em', padding: '0.2em'}
  });
  ui.root.insert(0, app.main);
  app.mainPanelControl();
};
app.boot();