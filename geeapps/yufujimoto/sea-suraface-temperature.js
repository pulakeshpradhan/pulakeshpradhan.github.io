var nino_area = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-96.86992187499999, 1.9644627711973017],
          [-96.86992187499999, -6.109479175134549],
          [-84.56523437499999, -6.109479175134549],
          [-84.56523437499999, 1.9644627711973017]]], null, false),
    dataset = ee.ImageCollection("NOAA/CDR/OISST/V2"),
    typhoon = ee.FeatureCollection("users/yufujimoto/App/cy_tracks");
//============================================================
//      UIをリセットする
//============================================================
ui.root.clear();
// 左右に表示するMapオブジェクトをインスタンス化する
var map_left = ui.Map();
var map_right = ui.Map();
//============================================================
//      関数の定義
//============================================================
// 左側のマップビューに指定された年月の地図を表示させるための関数を定義する
var showLeftLayer = function() {
  // コールバック関数の定義.
  function showValue(meanValue) {
    lbl_ins_val_l.setValue(meanValue);
  }
  // マップビューに追加されたレイヤをリセットする
  map_left.layers().reset();
  // スライダで指定された年月を取得する
  var year = sld_yr_l.getValue();
  var month = "";
  switch(sel_mn_l.getValue()) {
    case "1月": month = ee.Number(1);break;
    case "2月": month = ee.Number(2);break;
    case "3月": month = ee.Number(3);break;
    case "4月": month = ee.Number(4);break;
    case "5月": month = ee.Number(5);break;
    case "6月": month = ee.Number(6);break;
    case "7月": month = ee.Number(7);break;
    case "8月": month = ee.Number(8);break;
    case "9月": month = ee.Number(9);break;
    case "10月": month = ee.Number(10);break;
    case "11月": month = ee.Number(11);break;
    case "12月": month = ee.Number(12);break;
    default:month = ee.Number(1);break;
  }
  // ダミーの取得日付を使って指定した年月イメージを取り出す
  var qDate_s = ee.Date.fromYMD(year, month, 14);
  var qDate_e = ee.Date.fromYMD(year, month, 16);
  var image = byMonthYear.filterDate(qDate_s, qDate_e).first();
  // レイヤーを追加する
  map_left.addLayer(image, visParam, 'Sea Surface Temperature');
  map_left.addLayer({eeObject:nino_area, opacity:0.5, name: 'Nino Area'});
  map_left.addLayer(typhoon.filter(ee.Filter.eq('year', year)), {color:"white"});
  // 指定海域の平均海水温度を計算する
  var meanValue = ee.Number(image.reduceRegion({
    reducer:ee.Reducer.mean(), 
    geometry:samples,
    scale:120, 
    bestEffort: true
    })
  .get('sst')).divide(100);
  // サーバーオブジェクトを変換する
  meanValue.evaluate(showValue);
};
var showRightLayer = function() {
  // コールバック関数の定義.
  function showValue(meanValue) {
    lbl_ins_val_r.setValue(meanValue);
  }
  // マップビューに追加されたレイヤをリセットする
  map_right.layers().reset();
  lbl_ins_val_r.setValue("計算中…");
  // スライダで指定された年月を取得する
  var year = sld_yr_r.getValue();
  var month = "";
  // セレクタで選択されている値から数値に変換する
  switch(sel_mn_r.getValue()) {
    case "1月": month = ee.Number(1);break;
    case "2月": month = ee.Number(2);break;
    case "3月": month = ee.Number(3);break;
    case "4月": month = ee.Number(4);break;
    case "5月": month = ee.Number(5);break;
    case "6月": month = ee.Number(6);break;
    case "7月": month = ee.Number(7);break;
    case "8月": month = ee.Number(8);break;
    case "9月": month = ee.Number(9);break;
    case "10月": month = ee.Number(10);break;
    case "11月": month = ee.Number(11);break;
    case "12月": month = ee.Number(12);break;
    default:month = ee.Number(1);break;
  }
  // ダミーの取得日付を使って指定した年月イメージを取り出す
  var qDate_s = ee.Date.fromYMD(year, month, 14);
  var qDate_e = ee.Date.fromYMD(year, month, 16);
  var image = byMonthYear.filterDate(qDate_s, qDate_e).first();
  // レイヤーを追加する
  map_right.addLayer(image, visParam, 'Sea Surface Temperature');
  map_right.addLayer({eeObject:nino_area, opacity:0.5, name: 'Nino Area'});
  map_right.addLayer(typhoon.filter(ee.Filter.eq('year', year)),{color:"white"});
  // 指定海域の平均海水温度を計算する
  var meanValue = ee.Number(image.reduceRegion({
    reducer:ee.Reducer.mean(), 
    geometry:samples,
    scale:120, 
    bestEffort: true
    })
  .get('sst')).divide(100);
  // サーバーオブジェクトを変換する
  meanValue.evaluate(showValue);
};
//============================================================
//      データの準備
//============================================================
var seaSurfaceTemperature = dataset.select('sst');
var visParam = {
  min: -180.0,
  max: 3000.0,
  palette:[
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ]
};
// 日単位のデータを月平均高度に変換する
var years = ee.List.sequence(1981, 2018); // 年でスライスするための配列を準備する
var months = ee.List.sequence(1, 12);     // 月でスライスするための配列を準備する
// 平均海水温を取得するためのサンプリングポイントをランダムに作成する
var samples = ee.FeatureCollection.randomPoints(nino_area, 100).map(function(f){
  return f.set({class: 0})
});
// イメージコレクションの画像を年と月でスライスする
var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return seaSurfaceTemperature
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .median()
        .set('system:time_start', ee.Date.fromYMD(y,m,15));
  });
}).flatten());
//============================================================
//      凡例パネルの準備
//============================================================
// セレクタ用に辞書型の月リストを作成する
var dct_months = {
  "1月":1, "2月":2, "3月":3, "4月":4, "5月":5, "6月":6, 
  "7月":7, "8月":8, "9月":9, "10月":10, "11月":11, "12月":12
};
// 凡例用のイメージを作成する。
var img_vertical = ee.Image.pixelLonLat().select('latitude');
var img_grad = img_vertical.multiply((visParam.max-visParam.min)/100.0).add(visParam.min);
var img_leg = img_grad.visualize(visParam);
var thumb_l = ui.Thumbnail({image: img_leg, params: {bbox:'0,0,10,100', dimensions:'30x50'}});
var thumb_r = ui.Thumbnail({image: img_leg, params: {bbox:'0,0,10,100', dimensions:'30x50'}});
// 左側のマップに平均海水温度を表示させるためのパネルを作成し、ウィジェットを追加する
var pnl_ins_l = ui.Panel();
var lbl_ins_ttl_l = ui.Label({value: '平均海面温度:', style: {fontWeight: 'bold', stretch: 'vertical',}});
var lbl_ins_val_l = ui.Label("", {stretch: 'vertical'});
pnl_ins_l.add(lbl_ins_ttl_l);
pnl_ins_l.add(lbl_ins_val_l);
// 右側のマップに平均海水温度を表示させるためのパネルを作成し、ウィジェットを追加する
var pnl_ins_r = new ui.Panel();
var lbl_ins_ttl_r = ui.Label({value: '平均海面温度:', style: {fontWeight: 'bold', stretch: 'vertical',}});
var lbl_ins_val_r = ui.Label("", {stretch: 'vertical'});
pnl_ins_r.add(lbl_ins_ttl_r);
pnl_ins_r.add(lbl_ins_val_r);
// 左側のパネルに凡例を表示させるためのウィジェットを作成する
var lbl_yr_l = ui.Label('凡例');
var sld_yr_l = ui.Slider({
  min: 1981, 
  max: 2018, 
  step: 1, 
  onChange: function() {showLeftLayer();},
  style: {stretch: 'horizontal'}
});
var sel_mn_l = ui.Select({
  items: Object.keys(dct_months),
  placeholder:"月",
  onChange: function() {showLeftLayer();},
  style: {width: "100px"}
});
// 右側のパネルに表示させるためのウィジェットを作成する
var lbl_yr_r = ui.Label('凡例');
var sld_yr_r = ui.Slider({
  min: 1981, 
  max: 2018, 
  step: 1, 
  onChange: function() {showRightLayer();},
  style: {
    stretch: 'horizontal'}
});
var sel_mn_r = ui.Select({
  items: Object.keys(dct_months),
  placeholder:"月",
  onChange: function() {showRightLayer();},
  style: {width: "100px"}
});
// 左側のマップに表示させるためのパネルを作成し、ウィジェットを追加する
var lbl_leg_l = ui.Label({
  value: '平均海面温度 (℃)',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '20px 0 0 0',
    padding: '0'
  }
});
// 右側のマップに表示させるためのパネルを作成し、ウィジェットを追加する
var lbl_leg_r = ui.Label({
  value: '平均海面温度 (℃)',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '20px 0 0 0',
    padding: '0'
  }
});
// 左側の凡例ラベルを準備する
var lbl_max_l = ui.Panel({widgets: [ui.Label(visParam['max']/100)],});
var lbl_min_l = ui.Panel({widgets: [ui.Label(visParam['min']/100)],});
// 右側の凡例ラベルを準備する
var lbl_max_r = ui.Panel({widgets: [ui.Label(visParam['max']/100)],});
var lbl_min_r = ui.Panel({widgets: [ui.Label(visParam['min']/100)],});
// 左側のマップに表示させるためのパネルを作成し、ウィジェットを追加する
var pnl_l = ui.Panel({
  widgets: [lbl_yr_l, sld_yr_l, sel_mn_l, lbl_leg_l, lbl_max_l, thumb_l, lbl_min_l],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '150px',
    position: 'bottom-left',
    padding: '7px'
  }
});
// 右側のマップに表示させるためのパネルを作成し、ウィジェットを追加する
var pnl_r = ui.Panel({
  widgets: [lbl_yr_r, sld_yr_r, sel_mn_r, lbl_leg_r, lbl_max_r, thumb_r, lbl_min_r],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '150px',
    position: 'bottom-left',
    padding: '7px'
  }
});
// 平均海水温パネルを左右のマップに追加する
map_left.add(pnl_ins_l);
map_right.add(pnl_ins_r);
// 凡例パネルを左右のマップに追加する
map_left.add(pnl_l);
map_right.add(pnl_r);
// 複数のマップオブジェクトを格納するための空の配列を定義する。
var maps = [];
// 左右のMapを配列に追加する。
maps.push(map_left);
maps.push(map_right);
// それぞれのMapにレイヤー・マネージャーを追加する。
map_left.setControlVisibility(true);
map_right.setControlVisibility(true);
// マップ・リンカーオブジェクトを作って、複数のマップを連動させる
var linker = ui.Map.Linker(maps);
// UIをリセットする。
ui.root.widgets().reset(maps);
// 地図の中心をひとつ目のマップのオブジェクトの衛星画像に設定する。
maps[0].centerObject(nino_area, 4);
// 左側のマップには2018年1月をデフォルトとして表示する
sld_yr_l.setValue(2011);
sel_mn_l.setValue("11月", true);
// 右側のマップには1997年12月をデフォルトとして表示する
sld_yr_r.setValue(1997);
sel_mn_r.setValue("11月", true);
// 初期値で初期化する
showLeftLayer();
showRightLayer();