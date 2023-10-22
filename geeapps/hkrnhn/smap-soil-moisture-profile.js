// SMAP10km_soil_moisture_app
// 土壌の有効水分
var app = {}; //空のオブジェクト生成
// UIパネル作成開始
app.createPanels = function() {
  // 検索条件指定パネル
  app.filters = {
    closeButton: ui.Button({
      label: '閉じる',
      style: {margin: '0 0 0 3em'},
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
        value: '土壌の有効水分',
        style: {
          fontWeight: 'bold',
          fontSize: '1em',
          margin: '0.4em 0'},
      }),
      ui.Label({
        value: 'NASA-USDA SMAP衛星による10kmメッシュ推定値',
        style: {fontSize: '0.85em'},
      }),
      ui.Label('1. 開始年・月', app.HEADER_TEXT_STYLE),
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
  // 検索結果撮影日のセレクタ
  app.picker = {
    select: ui.Select({
      placeholder: '検索待ち',
      onChange: function(key) {
        app.legendDate.setValue(key);
        app.imageDateStr = key;
        app.refreshMapLayer();
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
  // 主題図レイヤの表示設定
  app.visTmap = {
    checkMap: ui.Checkbox({ // レイヤ表示ON/OFF
      value:true,
      onChange: function(checked) {
        Map.layers().get(0).setShown(checked);
        Map.widgets().get(1).style().set('shown', checked);
      },
      style: {margin: '0.2em'},
    }),
    select: ui.Select({ // データの選択
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function(key) {
        var option = app.VIS_OPTIONS[key];
        app.visTmap.dataLabel.setValue(option.description);
        app.refreshMapLayer();
      },
      style: app.WIDGETS_STYLE,
    }),
    dataLabel: ui.Label({style: {fontSize: '0.75em', whiteSpace: 'pre-wrap'}}),
    selectColorScheme: ui.Select({
      items: Object.keys(app.colorSchemes),
      placeholder: 'レイヤ配色の変更',
      onChange: function(key) {
        app.colorRamp = app.colorSchemes[key];
        var currentVisParams = Map.layers().get(0).getVisParams();
        currentVisParams.palette = app.colorRamp;
        Map.layers().get(0).setVisParams(currentVisParams);
        app.legendPanel.clear();
        app.setLegend();
      },
      style: app.WIDGETS_STYLE,
    }),
    checkAdBounds: ui.Checkbox({ // 市町村界描画
      label: '市町村界',
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked);
      },
      style: app.WIDGETS_STYLE,
      // style: {fontSize: '0.85em'}
    }),
  };
  app.visTmap.panel = ui.Panel({
    widgets: [
      ui.Label('3. データの選択', app.HEADER_TEXT_STYLE),
      ui.Panel([
        app.visTmap.checkMap,
        app.visTmap.select
      ], ui.Panel.Layout.flow('horizontal')),
      app.visTmap.dataLabel,
      app.visTmap.selectColorScheme,
      app.visTmap.checkAdBounds,
    ],
    style: app.SECTION_STYLE
  });
  // データ選択の初期値
  app.visTmap.select.setValue(app.visTmap.select.items().get(0));
  // チャート用パネル
  app.charts = {
    drawChartButton: ui.Button({
      label: '時系列チャート',
      onClick: app.drawChart,
      style: app.WIDGETS_STYLE,
    }),
    hideChartButton: ui.Button({
      label: 'チャートクリア',
      onClick:function() {
        app.dispChartPanel.style().set('shown', false)},
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
    // setDrawingButton: ui.Button({
    //   label: '領域設定',
    //   onClick: app.setDrawingTools,
    //   style: {stretch: 'horizontal'},
    // }),
    // clearDrawingButton: ui.Button({
    //   label: 'クリア',
    //   onClick: function(){
    //     Map.drawingTools().clear();
    //     Map.drawingTools().setShown(false);
    //     Map.setControlVisibility({
    //       layerList: true,
    //       mapTypeControl: true
    //     });
    //     app.dispChartPanel.clear();
    //     app.dispChartPanel.style().set('shown', false);
    //   },
    // }),
    // drawChartButton: ui.Button({
    //   label: 'チャート作成',
    //   onClick: app.drawChart,
    //   style: {stretch: 'horizontal'},
    // }),
  };
  app.charts.panel = ui.Panel({
    widgets: [
      ui.Label('4. マーカー地点', app.HEADER_TEXT_STYLE),
      app.charts.markerDispButton,
      app.charts.drawChartButton,
      app.charts.hideChartButton,
      ui.Label('Credit', app.HEADER_TEXT_STYLE),
      ui.Label(
        'NASA-USDA SMAP Global Soil Moisture Data',
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
      app.filters.selectYear,
      app.filters.selectMonth,
      app.filters.applyButton,
      app.picker.select,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  // 指定条件による検索実行
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var startY = app.filters.selectYear.getValue();
    var startM = app.filters.selectMonth.getValue();
    var startD = ee.Date(startY + '-' + startM + '-01');
    var filtered = app.imgCollection
          .filterDate(startD, startD.advance(2, 'month'))
          .sort('system:time_start')
          .limit(app.IMAGE_COUNT_LIMIT);
    // 検索条件を満たす撮影日リストを出力
    var computeDates = 
      ee.List(filtered.aggregate_array('system:time_start'))
      .map(function(d) { return ee.Date(d).format('YYYY-MM-dd')});
    computeDates.evaluate(function(ids) {
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids); // セレクタリスト更新
      // セレクタにリスト先頭の日付をセット
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
};　// 補助機能設定終了
// マップ画面の更新
app.refreshMapLayer = function() {
  var imageDateStr = app.picker.select.getValue();
  if (app.imageDateStr) {
    var imgDate = ee.Date(app.imageDateStr);
    var dateRange = ee.DateRange(imgDate, imgDate.advance(1, 'day'));
    var smimg = app.imgCollection
      .filterDate(dateRange)
      .first();
    // 海岸沿いの異常値を除去 smpのマスクをssmに反映
    var maskSmp = smimg.select('smp').gte(0.0);
    smimg = smimg.updateMask(maskSmp);
    // 画像の表示
    var visOption = app.VIS_OPTIONS[app.visTmap.select.getValue()];
    visOption.visParams.palette = app.colorRamp;
    var bands = visOption.visParams.bands;
    app.legendBands.setValue(bands);
    var visMin = visOption.visParams.min;
    var visMax = visOption.visParams.max;
    var visAve = Math.round((visMin + visMax) * 100 / 2) / 100;
    app.legendMin.setValue(visMin);
    app.legendMax.setValue(visMax);
    app.legendAve.setValue(visAve);
    var imgname = bands + app.imageDateStr;
    var imgCheck = app.visTmap.checkMap.getValue();
    var ColorComposit = ui.Map.Layer(smimg, visOption.visParams, imgname, imgCheck);
    Map.layers().set(0, ColorComposit);
  }
}; // マップ画面の更新終了
// 時系列チャート描画関数
app.drawChart = function() {
  if (Map.drawingTools().layers().get(0)) {
  var aoi = Map.drawingTools().layers().get(0).toGeometry();
  var aoiCent = aoi.centroid().coordinates().getInfo();
  var lonlat = ('領域重心 E' + aoiCent[0].toFixed(6) + ', N' + aoiCent[1].toFixed(6));
    // 時系列チャート用のイメージコレクション
    var yearS = app.filters.selectYear.getValue();
    var dateStart = ee.Date(yearS + '-03-01').advance(-1, 'year');
    var dateEnd = ee.Date(yearS + '-11-30');
    var chartCollection = app.imgCollection
      .filterDate(dateStart, dateEnd);
      // .filter(ee.Filter.dayOfYear(60, 334));
    // 時系列チャート
        var chart1 = ui.Chart.image.series({
          imageCollection: chartCollection.select('ssm', 'smp'),
          region: aoi,
          reducer: ee.Reducer.mean(),
          scale: 5000,
        });
        var chartOptions1 = {
          title: '土壌有効水分の経時変化: ' + lonlat,
          vAxes: {
            0: {title: 'ssm:表層の有効水分(mm)'},
            1: {title: 'smp:根域の有効水分割合', baselineColor: 'transparent'}
          },
          hAxis: {title: 'Date', format: 'yyyy-MM-dd'},
          interpolateNulls: true,
          lineWidth: 1,
          pointsVisible: true,
          pointSize: 4,
          series: {
            0: {color: 'blue', targetAxisIndex: 1},
            1: {color: 'red', targetAxisIndex: 0},
          },
          legend: {position: 'top'},
        };
        chart1.setOptions(chartOptions1);
        // app.charts.panel.widgets().set(3, chart1);
        app.dispChartPanel.style().set('shown', true);
        app.dispChartPanel.widgets().set(0, chart1);
  } // end of if
}; // 時系列チャート描画終了
// メインパネルの表示切り替え
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
    style: {position: 'top-left', 'padding': 0},
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
  Map.add(app.openButton);
  app.openButton.style().set('shown', false);
};
// 初期設定
app.initialSetup = function() {
  //衛星データセットの指定
  app.imgCollection = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture');
   // 市町村境界（国土数値情報、北海道分）
  app.adminLayer = ui.Map.FeatureViewLayer({
    assetId: 'users/hkrnhn/adminHokkaido-featureview',
    name: '市町村境界',
    shown: false,
  });
  var adminVisParams = {
    color: 'purple',
    polygonFillOpacity: 0,
    width: 1,
  };
  app.adminLayer.setVisParams(adminVisParams);
  // マップレイヤー初期設定、市町村境界表示
  Map.clear();
  Map.drawingTools().setShown(false);
  Map.drawingTools().setLinked(false);
  var urlLon = ui.url.get('lon', 142.506); // URLから経度取得
  var urlLat = ui.url.get('lat', 43.566); // URLから緯度取得
  var urlZoom = ui.url.get('zoom', 7); // URLからZoom倍率取得
  Map.setCenter(urlLon, urlLat, urlZoom);
  Map.layers().set(0, ui.Map.Layer({shown: false}));
  Map.layers().set(1, app.adminLayer); // 市町村境界
  Map.drawingTools().clear();
  var mapCenter = Map.getCenter();
  var layer = ui.Map.GeometryLayer({geometries: [mapCenter], color:'magenta'});
  Map.drawingTools().layers().set(0, layer);
  // マップ中心座標・ズーム倍率をURLに反映
  Map.onChangeCenter(ui.util.debounce(function() {
    var mapCenter = Map.getCenter();
    var layer = ui.Map.GeometryLayer({geometries: [mapCenter], color:'magenta'});
    Map.drawingTools().layers().set(0, layer);
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
  app.IMAGE_COUNT_LIMIT = 15; // 検索データ数の上限
  // 検索開始年・月リストの生成
  app.today = new Date();
  app.thisYear = app.today.getFullYear();
  app.startDate = new Date(app.today.setMonth(app.today.getMonth() - 1));
  app.startYear = app.startDate.getFullYear().toFixed();
  app.startMonth = ("00" + (app.startDate.getMonth() + 1)).slice(-2);
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
      start: 2015, // データセットの初年目
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
  // ジオメトリツール起動用関数
  app.setDrawingTools = function() {
    Map.setControlVisibility({
      layerList: false,
      mapTypeControl: false
    });
    Map.drawingTools().clear();
    Map.drawingTools().setShown(true);
    Map.drawingTools().setLinked(false);
    var mapCenter = [Map.getCenter()];
    Map.drawingTools().addLayer({geometries: mapCenter, color:'magenta'});
    Map.drawingTools().setDrawModes(['point', 'line', 'polygon']);
    //Map.drawingTools().draw(); // Enter drawing mode.
  };
  // 主題図レイヤのカラーパレット
  // パレットライブラリ https://github.com/gee-community/ee-palettes
  var palettes = require('users/gena/packages:palettes');
  app.colorSchemes = {
    '赤～黄～緑':palettes.colorbrewer.RdYlGn[11],
    '茶～青緑':palettes.colorbrewer.BrBG[11],
    '緑（淡～濃）':palettes.colorbrewer.Greens[9],
    '虹色':palettes.kovesi.rainbow_bgyr_35_85_c73[7].reverse(),
    '赤-黄-緑-水-青':['#0000cd','#87ceeb','#008000','#ffd700','#dc143c'].reverse(),
  };
  app.colorRamp = app.colorSchemes['赤～黄～緑'];
  app.VIS_OPTIONS = {
    '根域の有効水分割合(smp)': {
      description: '全有効水分容量に対する割合' +
        '（適正範囲：0.5-0.8）',
      visParams: {
        'bands': ['smp'],
        'min': 0,'max':1.0,
        'opacity': 0.8,
      }
    },
    '表層の有効水分(ssm)': {
      description: '10mm以下：出芽・初期生育に悪影響、15-20mm：適正、' +
        '20-25mm：過湿・機械作業に支障・出芽には適す',
      visParams: {
        'bands': ['ssm'],
        'min': 0,'max': 25,
        'opacity': 0.8,
      }
    },
  }; // End of app.VIS_OPTIONS.
  // マップ画面にクレジットを表示
  // app.creditPanel = ui.Panel({
  //   widgets: [
  //     ui.Label(
  //       'NASA-USDA SMAP Global Soil Moisture Data',
  //       {fontSize: '0.6em'}),
  //   ],
  // });
  // app.creditPanel.style().set({
  //   'position': 'bottom-center',
  //   'margin': '-2.5em',
  //   'padding': '0'
  // });
  // Map.widgets().set(0, app.creditPanel);
  // チャート表示用パネル
  app.dispChartPanel = ui.Panel({
    style: {
      position: 'bottom-left',
      // width: '600px',
      shown: false
    },
  });
  Map.widgets().set(0, app.dispChartPanel);
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
      app.visTmap.panel,
      app.charts.panel
    ],
    style: {width: '10em', padding: '0.4em'}
  });
  app.mainPanelControl();
  ui.root.insert(0, app.main);
};
app.boot();