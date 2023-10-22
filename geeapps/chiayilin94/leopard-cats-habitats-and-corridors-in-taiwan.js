var corridor = ui.import && ui.import("corridor", "image", {
      "id": "users/chiayilin94/taiwan_leopardcat_corridor_20180125"
    }) || ee.Image("users/chiayilin94/taiwan_leopardcat_corridor_20180125"),
    leopardcat_critical_habitats = ui.import && ui.import("leopardcat_critical_habitats", "table", {
      "id": "users/chiayilin94/leopardcat_critical_habitats"
    }) || ee.FeatureCollection("users/chiayilin94/leopardcat_critical_habitats"),
    leopardcat_potential_habitats = ui.import && ui.import("leopardcat_potential_habitats", "table", {
      "id": "users/chiayilin94/leopardcat_potential_habitats"
    }) || ee.FeatureCollection("users/chiayilin94/leopardcat_potential_habitats");
/** 
 * 製作台灣石虎棲地及生態廊道的互動式地圖
 * 作者：林佳怡 Joanna Lin
 * E-mail: chiayilin94@gmail.com
 * 石虎廊道、棲地、路殺資料及描述取自於東海大學熱帶生態學與生物多樣性
 * 研究中心、野聲環境生態顧問有限公司、林務局保育組、特有生物研究保育
 * 中心及台灣石虎保育協會等報告，以下為資料及報告下載網址：
 * https://conservation.forest.gov.tw/0002035
 * https://conservation.forest.gov.tw/File.aspx?fno=68780
 * https://conservation.forest.gov.tw/File.aspx?fno=72052
 */
var styles = require('users/chiayilin94/module:styles');
var legend = require('users/chiayilin94/module:legend');
var potential_habitats_color = '#009900';
var potential_habitats = leopardcat_potential_habitats.draw(
  {color: potential_habitats_color, strokeWidth: 0});
var critical_habitats_color = '#003300';
var critical_habitats = leopardcat_critical_habitats.draw(
  {color: critical_habitats_color, strokeWidth: 0});
// Extracted from the table in the report.
var roadkill = ee.FeatureCollection(
  'users/northerncat/leopard-cat-roadkill-geometry');
var opacityVis = {opacity: 0.8,};
var roadkillVis = {color: '#ff1a1a', opacity: '1'};
var togglePanelVis = {position: 'bottom-right'};
var toggleLabelVis = {};
var isLegendCollapsed = false;
var map = ui.Map();
/** 
 * 石虎的核心活動範圍半徑178m加以擴充涵蓋可能遺漏的棲地，但扣除湖泊水
 * 庫以及人工建物的環境。另外，國土利用圖層並非隨時更新，有時無法反應
 * 真實的土地利用型態而影響分析而導致將適合棲地剔除，或者將不適合棲地
 * 納入，因此使用解釋上，請考量一定程度的不確定性，以較大面積的尺度，
 * 考慮周遭重要棲地分布，適度以現地棲地實況進行判釋上的調整。例如，預
 * 測為不適合棲地，但周遭皆為石虎重要棲地，且植被與土地利用型態上有足
 * 夠的自然度(如森林、草原、河床或者農地)，則很有可能仍是石虎的重要棲
 * 地。
 */
map.addLayer(potential_habitats, opacityVis, '石虎潛在棲地', false);
map.addLayer(critical_habitats, opacityVis, '石虎重要棲地', false);
/**
 * 廊道分析圖，淺綠色是預測出現機率較高且面積較大或是廊道中途重要的
 * 關鍵棲地，由黃到紅，表示廊道的適合度，越紅表示阻力越小的廊道。
 * 同樣是以較大尺度，以及棲地適合度的分析，某些石虎個體可能選擇穿越
 * 危險的道路或是住宅區，以達到較短距離、較快遷徙的目的，如貓羅溪是
 * 南投個體要移動到八卦山區的最短距離廊道，但因為中間一區較密集的市
 * 鎮或是國道，卻有較高的風險，就不一定會在最小阻力廊道中顯現出此廊
 * 道，因此最小阻力廊道分析未呈現出之廊道，不一定代表就不是重要的交
 * 流廊道。
 */
map.addLayer(corridor, opacityVis, '石虎廊道');
/** 苗栗縣大尺度之路殺風險評估，附表一、全臺灣石虎路殺事件紀錄 */
map.addLayer(roadkill, roadkillVis, '石虎路殺地點');
map.setOptions('Grey', styles.getGrayBasemap());
map.setCenter(120.8047, 24.4608, 11);
/** User interface and event handling. */
var corridorLayerToggle = ui.Checkbox({
  label: '廊道及關鍵棲地 (Corridor and habitat)', 
  value: true, 
  onChange: function(checked) {
    map.layers().get(2).setShown(checked);
  },
  style: toggleLabelVis
});
var criticalLayerToggle = ui.Checkbox({
  label: '石虎重要棲地 (Important habitat)', 
  value: false, 
  onChange: function(checked) {
    map.layers().get(1).setShown(checked);
  },
  style: toggleLabelVis
});
var potentialLayerToggle = ui.Checkbox({
  label: '石虎潛在棲地 (Potential habitat)', 
  value: false, 
  onChange: function(checked) {
    map.layers().get(0).setShown(checked);
  },
  style: toggleLabelVis
});
var collapseLegendButton = ui.Button({
  label: '縮小圖例',
  style: {
  },
  onClick: function() {
    isLegendCollapsed = true;
    map.remove(legendPanel);
    map.add(expandLegendButton);
  },
});
var expandLegendButton = ui.Button({
  label: '打開圖例',
  style: {
    position: 'bottom-right', 
    shown: isLegendCollapsed ? true : true,
    margin: '0',
    padding: '0'
  },
  onClick: function() {
    isLegendCollapsed = false;
    map.add(legendPanel);
    map.remove(expandLegendButton);
  },
});
var legendPanel = ui.Panel({
  widgets: [
    legend.makeTitle('台灣石虎棲地及生態廊道'),
    legend.makeTitle('Leopard Cat Habitats & Corridors'),
    legend.makeLegendRound('石虎路殺地點 (Roadkill locations)', 'red'),
    corridorLayerToggle,
    legend.makeMinMaxColorBar(
      '廊道阻力 (Resistance)', ['#fe9f50', '#a3fcae'], '小', '大'),
    legend.makeLegendBox('關鍵棲地 (Critical habitat)', '#b4dd50'),
    criticalLayerToggle, 
    legend.makeLegendBox('重要棲地', '#3c563d'),
    potentialLayerToggle,
    legend.makeLegendBox('潛在棲地', '#438945'),
    legend.makeFootnote('Source 1: 苗栗縣大尺度之路殺風險評估'),
    legend.makeFootnote('Source 2: 重要石虎棲地保育評析'),
    legend.makeFootnote('下載手機版石虎路殺圖', 'https://www.google.com/maps/d/viewer?mid=1NVsw-36hT5Rv8HdX7RfEesg47qMgzgID&usp=sharing'),
    legend.makeFootnote('資料收集過程請點Medium文章', 'https://medium.com/@chiayilin94/%E4%B8%80%E8%B5%B7%E4%BE%86%E7%94%A8gis%E5%8F%8A%E5%9C%B0%E5%9C%96%E7%9C%8B%E6%87%82%E7%92%B0%E5%A2%83%E8%AD%B0%E9%A1%8C-ca3f6a68d0cd?source=friends_link&sk=3adc4abc5f25c0ad66e95c4c265314bb'),
    collapseLegendButton
  ], 
  style: togglePanelVis,
});
map.add(legendPanel);
map.setControlVisibility(false);
ui.root.widgets().reset([map]);