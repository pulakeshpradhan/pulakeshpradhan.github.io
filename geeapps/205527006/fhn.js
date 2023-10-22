var china = ui.import && ui.import("china", "table", {
      "id": "users/suzh17234/city"
    }) || ee.FeatureCollection("users/suzh17234/city"),
    world = ui.import && ui.import("world", "table", {
      "id": "users/soybean/WB_countries_Admin0_10m"
    }) || ee.FeatureCollection("users/soybean/WB_countries_Admin0_10m");
//-----------------------------------------------设置UI地图属性--------------------------------------------
var mapPanel = ui.Map();
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
mapPanel.setCenter(
    103.834303, 36.061089, 4);
//---------------------------------将地图图层设置为最底层-------------------------------------------------------------------------------------------------------
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
//---------------------------添加APP标题------------------------------------------------------------------------------
var header = ui.Label('农情收集系统', {fontWeight: 'bold', fontSize: '30px', color: 'black'});
var toolPanel = ui.Panel([header], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
//---------------------------添加控件------------------------------------------------------------------------------
var Button = ui.Button({
  label:'上传',
  onClick:function(){
  var logo = ee.Image('users/<your_username>/<AssetID_for_logo>').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '642x291',
        format: 'png'
        },
    style: {height: '127px', width: '280px',padding :'0'}
    });  
var photos = ui.Panel(thumb, 'flow', {width: '300px'});
toolPanel.add(photos);
Export.image.toDrive({
  image: logo,
  description: 'imageToCOGeoTiff',
  folder:"Agricultural information collection system",
  scale: 30,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
  }
  });
toolPanel.add(Button,{'font-size': '20px'});
var link = ui.Label('存储数据库', {},'https://drive.google.com/drive/folders/1LmiLK197ZPzKkk_0DTab4Hr6O0wFrp_U');
toolPanel.add(link);
//---------------------------点击收集点位------------------------------------------------------------------------------
var lon = ui.Label();
var lat = ui.Label();
var information = ui.Button({
  label:'备注信息',
  onClick:function(){
//---------------------------输入信息------------------------------------------------------------------------------
  var information =('备注信息');
function set_information(inf){
  var information = ee.String(inf);
  // Map.addLayer(information);
}
var information_textbox = ui.Textbox({
  value: information,
  onChange: set_information,
  style: {position: 'top-center'}
});
ui.root.setLayout(ui.Panel.Layout.absolute());
ui.root.add(information_textbox); 
set_information(information);
  }
  });
var LonLatP=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
toolPanel.add(LonLatP);//显示点位
toolPanel.add(information);
var featureA=world;
var Clickpoint = function (coords) {
  lon.setValue('lon: ' + coords.lon.toFixed(2));//经度
  lat.setValue('lat: ' + coords.lat.toFixed(2));//纬度
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(point,'point');
  var dot = ui.Map.Layer(point, {color: '000000'});
  // 添加点作为第二层，使其显示在合成的顶部
  mapPanel.layers().set(0, dot);//1e13
  var Pl=featureA.filterBounds(point);
  var region = Pl;
};
mapPanel.onClick(Clickpoint);