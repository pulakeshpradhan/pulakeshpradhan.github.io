var rec_18 = ui.import && ui.import("rec_18", "image", {
      "id": "users/yxflovexh/project/house_rec18"
    }) || ee.Image("users/yxflovexh/project/house_rec18"),
    rec_19 = ui.import && ui.import("rec_19", "image", {
      "id": "users/yxflovexh/project/house_rec"
    }) || ee.Image("users/yxflovexh/project/house_rec"),
    sd_town = ui.import && ui.import("sd_town", "table", {
      "id": "users/yxflovexh/project/sd_country"
    }) || ee.FeatureCollection("users/yxflovexh/project/sd_country");
//-------------------------------------------------------------------------------------------添加地图控件UI.map-------------------------------------------------------------
//首先设置Map图层属性
var pg_18 = rec_18.rename("18year");
var pg_19 = rec_19.rename("19year");
var rec = pg_18.addBands(pg_19);
var layerProperties = {
  'Greenhouses in shandong province in 2018': {
    name: '18year',
    visParams: {min:1,max:9,palette:[ 
  'fffff7 ',//裸土,白色
  'fffff7' ,//不透水面,白色
  'fffff7',//水体,白色
  'fffff7',//稀疏植被,白色
  'fffff7',//林地,白色
  'fffff7',//露天农田,白色
  '23ffa4',//塑料大棚,浅蓝色
  '0c0300',//黑色大棚,黑色
  'ff8145'//白色大棚,浅红色
]},
    legend: [
      {'Other cover types': 'fffff7'}, {'Colorless greenhouse': '23ffa4'}, {'Black greenhouses': '0c0300'},
      {'White greenhouses': 'ff8145'}
    ],
    defaultVisibility: true
  },
  'Greenhouses in shandong province in 2019': {
    name: '19year',
    visParams: {min:1,max:9,palette:[ 
  'fffff7 ',//裸土,白色
  'fffff7' ,//不透水面,白色
  'fffff7',//水体,白色
  'fffff7',//稀疏植被,白色
  'fffff7',//林地,白色
  'fffff7',//露天农田,白色
  '23ffa4',//塑料大棚,浅蓝色
  '0c0300',//黑色大棚,黑色
  'ff8145'//白色大棚,浅红色
]},
    legend: [
      {'Other cover types': 'fffff7'}, {'Colorless greenhouse': '23ffa4'}, {'Black greenhouses': '0c0300'},
      {'White greenhouses': 'ff8145'}
    ],
    defaultVisibility: false
  },
};
//两个典型区域位置显示（寿光市和莘县）
var locationDict = {
  'Greenhouse in shouguang': {lon: 118.80541126489923, lat: 36.85878902232039, zoom: 12},
  'Greenhouse in shenxian': {lon: 115.6712818102243, lat: 36.23225529285458, zoom: 12}
};
//设置UI地图属性
var mapPanel = ui.Map();
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
var defaultLocation = locationDict['Greenhouse in shouguang'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
//将地图图层设置为最底层
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = rec.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
//------------------------------------------------------------------------------------------增加其他控件---------------------------------------------------------
//添加APP说明
var header = ui.Label('Shandong GreenHouse Explorer', {fontWeight: 'bold', fontSize: '30px', color: 'black'});
var text = ui.Label(
    'This app shows agricultural greenhouses in shandong province, China.Use the search bar to find interesting cities in the map bar.Click anywhere within the county limits, and the monitoring areas of the corlorless greenhouses, white greenhouses, and black greenhouses in the unit in a given year are listed in the panel.',
    {fontSize: '15px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
//添加选择年份下拉框
var selectItems = Object.keys(layerProperties);
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
toolPanel.add(ui.Label('View Different years', {'font-size': '20px'}));
toolPanel.add(layerSelect);
//添加图例
var legendPanel = ui.Panel({
  style:
      {fontSize: '15px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      padding: '8px',
      margin: '0'
    });
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
setLegend(layerProperties[layerSelect.getValue()].legend);
//添加透明度滑块
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    layerSelect.setDisabled(!value);
  }
});
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
//添加区域选择模块
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Visit Example Locations', {'font-size': '20px'}), locationSelect
]);
toolPanel.add(locationPanel);
Map.addLayer(sd_town);