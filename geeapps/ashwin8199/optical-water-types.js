var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.49401411751981,
            15.268792976973042
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([74.49401411751981, 15.268792976973042]);
// Code for OWT of hydrolakes
// final code for APP
var table = ee.FeatureCollection("users/ashwin8199/color/final_wetlands");
///////////////////Plot Wetlands/////////////////////
Map.setCenter(77,22,4);
Map.onChangeBounds(plotwet);
function plotwet(){
  var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  }
};
removeLayer('WetLands');
var zom=Map.getZoom();
var extn=Map.getBounds();
var areaz = ee.Number(zom).pow(-9).multiply(60000000000);
var extge=ee.Geometry.Rectangle(extn);
var areafeature = table.filterMetadata('AREAHA','greater_than',areaz).filterBounds(extge);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: areafeature,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '000000'}, 'WetLands');
}
////////////// add map panel////////////////////
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
 drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
 // label for data used
 function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {marker: '📍'};
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: symbol.marker + ' Marker',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('1. Place the marker in a Wetland.'),
    ui.Label('2. Set the date range.'),
    ui.Label('3. Click the button for plot.'),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
// panel widgets
// app title
var header = ui.Label('Optical Water Type', 
    {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// app summary
var text = ui.Label(
  'This toolbox display OWT of water.' +
  'Use the tool to explore.',
    {fontSize: '15px'});
// create panel
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width:'33%',position:'middle-right'}});
// add panel to root of gui
ui.root.insert(1,panel);
// panel for data date range
var Daterange = ui.Panel(ui.Label('Select month and year'));
panel.add(Daterange);
var year_list = [
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019},
    {label: '2020', value: 2020},
    {label: '2021', value: 2021}
  ];
var month_list = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March',value: 3},
    {label: 'April',value:  4},
    {label: 'May',value:  5},
    {label: 'June',value:  6},
    {label: 'July',value:  7},
    {label: 'August',value:  8},
    {label: 'September',value: 9},
    {label: 'October',value: 10},
    {label: 'November',value: 11},
    {label: 'December',value: 12}
  ];
var year = ui.Select({items: year_list, placeholder: 'Select a month', value: 2020});
var month = ui.Select({items: month_list, placeholder: 'Select a month', value: 10});
var datePanel = ui.Panel({
          widgets: [year,month],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
panel.add(datePanel);
drawingTools.onDraw(ui.util.debounce(geoProg, 500));
drawingTools.onEdit(ui.util.debounce(geoProg, 500));
var wextnt = ui.Button({label: 'Show OWT'});
var Mwextnt = ui.Button({label: 'Daily OWT'});
var plotPanel = ui.Panel({
          widgets: [wextnt,Mwextnt],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
panel.add(plotPanel);
wextnt.onClick(OWTplot);
Mwextnt.onClick(OWTMplot);
//////////////// legend panel ///////////////
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'OWT Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['0000ff','0070ff','00dcff','00ffd4','00ff64','87ff00','d1ff00','f0ff00','ffec00','ffbd00','ff8b00','ff6400','ff0000'];
// name of the legend
var names = ['OWT 01','OWT 02','OWT 03','OWT 04','OWT 05','OWT 06','OWT 07','OWT 08','OWT 09','OWT 10','OWT 11','OWT 12','OWT 13'];
// Add color and and names
for (var i = 0;i < 13; i++) {
  legend.add(makeRow(palette[i], names[i]));
  } 
Map.add(legend)
////////// add chart panel in info panel///////////////////
var chartPanel = ui.Panel({
  style:{position: 'bottom-right', shown: false}
});
panel.add(chartPanel);
/////////////////// Global variables////////////////
var  geometry, startDate, endDate;
///////////////////////////////////
/////////// main code /////////////
///////////////////////////////////
function geoProg(){
var geometry = drawingTools.layers().get(0).getEeObject();
return geometry;
}
var nq01 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.446).and(data.select('B1_1_1').lt(0.509))).add(data.select('B2_1_1').gt(0.433).and(data.select('B2_1_1').lt(0.480))).add(data.select('B3_1_1').gt(0.458).and(data.select('B3_1_1').lt(0.520)))
  .add(data.select('B4_1_1').gt(0.267).and(data.select('B4_1_1').lt(0.303))).add(data.select('B5_1_1').gt(0.250).and(data.select('B5_1_1').lt(0.289))).add(data.select('B6_1_1').gt(0.199).and(data.select('B6_1_1').lt(0.233)))
.add(data.select('B7_1_1').gt(0.196).and(data.select('B7_1_1').lt(0.230))).add(data.select('B8_1_1').gt(0.168).and(data.select('B8_1_1').lt(0.201))).add(data.select('B8A_1_1').gt(0.165).and(data.select('B8A_1_1').lt(0.197)))).rename('OWT01'));};
var nq02 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.399).and(data.select('B1_1_1').lt(0.438))).add(data.select('B2_1_1').gt(0.392).and(data.select('B2_1_1').lt(0.422))).add(data.select('B3_1_1').gt(0.413).and(data.select('B3_1_1').lt(0.453)))
  .add(data.select('B4_1_1').gt(0.299).and(data.select('B4_1_1').lt(0.323))).add(data.select('B5_1_1').gt(0.303).and(data.select('B5_1_1').lt(0.331))).add(data.select('B6_1_1').gt(0.265).and(data.select('B6_1_1').lt(0.290)))
.add(data.select('B7_1_1').gt(0.260).and(data.select('B7_1_1').lt(0.287))).add(data.select('B8_1_1').gt(0.229).and(data.select('B8_1_1').lt(0.256))).add(data.select('B8A_1_1').gt(0.226).and(data.select('B8A_1_1').lt(0.255)))).rename('OWT02'));};
var nq03 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.273).and(data.select('B1_1_1').lt(0.345))).add(data.select('B2_1_1').gt(0.376).and(data.select('B2_1_1').lt(0.441))).add(data.select('B3_1_1').gt(0.639).and(data.select('B3_1_1').lt(0.705)))
  .add(data.select('B4_1_1').gt(0.320).and(data.select('B4_1_1').lt(0.410))).add(data.select('B5_1_1').gt(0.261).and(data.select('B5_1_1').lt(0.339))).add(data.select('B6_1_1').gt(0.073).and(data.select('B6_1_1').lt(0.130)))
.add(data.select('B7_1_1').gt(0.076).and(data.select('B7_1_1').lt(0.129))).add(data.select('B8_1_1').gt(0.054).and(data.select('B8_1_1').lt(0.105))).add(data.select('B8A_1_1').gt(0.042).and(data.select('B8A_1_1').lt(0.090)))).rename('OWT03'));};
var nq04 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.339).and(data.select('B1_1_1').lt(0.402))).add(data.select('B2_1_1').gt(0.437).and(data.select('B2_1_1').lt(0.491))).add(data.select('B3_1_1').gt(0.586).and(data.select('B3_1_1').lt(0.637)))
  .add(data.select('B4_1_1').gt(0.284).and(data.select('B4_1_1').lt(0.333))).add(data.select('B5_1_1').gt(0.241).and(data.select('B5_1_1').lt(0.291))).add(data.select('B6_1_1').gt(0.145).and(data.select('B6_1_1').lt(0.185)))
.add(data.select('B7_1_1').gt(0.149).and(data.select('B7_1_1').lt(0.186))).add(data.select('B8_1_1').gt(0.128).and(data.select('B8_1_1').lt(0.164))).add(data.select('B8A_1_1').gt(0.119).and(data.select('B8A_1_1').lt(0.155)))).rename('OWT04'));};
var nq05 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.371).and(data.select('B1_1_1').lt(0.412))).add(data.select('B2_1_1').gt(0.410).and(data.select('B2_1_1').lt(0.446))).add(data.select('B3_1_1').gt(0.497).and(data.select('B3_1_1').lt(0.544)))
  .add(data.select('B4_1_1').gt(0.308).and(data.select('B4_1_1').lt(0.335))).add(data.select('B5_1_1').gt(0.292).and(data.select('B5_1_1').lt(0.328))).add(data.select('B6_1_1').gt(0.222).and(data.select('B6_1_1').lt(0.246)))
.add(data.select('B7_1_1').gt(0.217).and(data.select('B7_1_1').lt(0.243))).add(data.select('B8_1_1').gt(0.191).and(data.select('B8_1_1').lt(0.216))).add(data.select('B8A_1_1').gt(0.183).and(data.select('B8A_1_1').lt(0.210)))).rename('OWT05'));};
var nq06 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.304).and(data.select('B1_1_1').lt(0.352))).add(data.select('B2_1_1').gt(0.370).and(data.select('B2_1_1').lt(0.406))).add(data.select('B3_1_1').gt(0.536).and(data.select('B3_1_1').lt(0.584)))
  .add(data.select('B4_1_1').gt(0.348).and(data.select('B4_1_1').lt(0.399))).add(data.select('B5_1_1').gt(0.343).and(data.select('B5_1_1').lt(0.395))).add(data.select('B6_1_1').gt(0.190).and(data.select('B6_1_1').lt(0.224)))
.add(data.select('B7_1_1').gt(0.190).and(data.select('B7_1_1').lt(0.227))).add(data.select('B8_1_1').gt(0.161).and(data.select('B8_1_1').lt(0.196))).add(data.select('B8A_1_1').gt(0.143).and(data.select('B8A_1_1').lt(0.180)))).rename('OWT06'));};
var nq07 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.318).and(data.select('B1_1_1').lt(0.363))).add(data.select('B2_1_1').gt(0.362).and(data.select('B2_1_1').lt(0.395))).add(data.select('B3_1_1').gt(0.462).and(data.select('B3_1_1').lt(0.503)))
  .add(data.select('B4_1_1').gt(0.321).and(data.select('B4_1_1').lt(0.358))).add(data.select('B5_1_1').gt(0.334).and(data.select('B5_1_1').lt(0.377))).add(data.select('B6_1_1').gt(0.257).and(data.select('B6_1_1').lt(0.282)))
.add(data.select('B7_1_1').gt(0.258).and(data.select('B7_1_1').lt(0.285))).add(data.select('B8_1_1').gt(0.226).and(data.select('B8_1_1').lt(0.257))).add(data.select('B8A_1_1').gt(0.219).and(data.select('B8A_1_1').lt(0.255)))).rename('OWT07'));};
var nq08 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.231).and(data.select('B1_1_1').lt(0.286))).add(data.select('B2_1_1').gt(0.312).and(data.select('B2_1_1').lt(0.356))).add(data.select('B3_1_1').gt(0.496).and(data.select('B3_1_1').lt(0.564)))
  .add(data.select('B4_1_1').gt(0.432).and(data.select('B4_1_1').lt(0.484))).add(data.select('B5_1_1').gt(0.420).and(data.select('B5_1_1').lt(0.472))).add(data.select('B6_1_1').gt(0.169).and(data.select('B6_1_1').lt(0.220)))
.add(data.select('B7_1_1').gt(0.170).and(data.select('B7_1_1').lt(0.226))).add(data.select('B8_1_1').gt(0.135).and(data.select('B8_1_1').lt(0.184))).add(data.select('B8A_1_1').gt(0.102).and(data.select('B8A_1_1').lt(0.150)))).rename('OWT08'));};
var nq09 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.238).and(data.select('B1_1_1').lt(0.296))).add(data.select('B2_1_1').gt(0.283).and(data.select('B2_1_1').lt(0.333))).add(data.select('B3_1_1').gt(0.413).and(data.select('B3_1_1').lt(0.465)))
  .add(data.select('B4_1_1').gt(0.345).and(data.select('B4_1_1').lt(0.414))).add(data.select('B5_1_1').gt(0.418).and(data.select('B5_1_1').lt(0.472))).add(data.select('B6_1_1').gt(0.266).and(data.select('B6_1_1').lt(0.304)))
.add(data.select('B7_1_1').gt(0.274).and(data.select('B7_1_1').lt(0.312))).add(data.select('B8_1_1').gt(0.235).and(data.select('B8_1_1').lt(0.276))).add(data.select('B8A_1_1').gt(0.202).and(data.select('B8A_1_1').lt(0.252)))).rename('OWT09'));};
var nq10 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.321).and(data.select('B1_1_1').lt(0.373))).add(data.select('B2_1_1').gt(0.341).and(data.select('B2_1_1').lt(0.375))).add(data.select('B3_1_1').gt(0.374).and(data.select('B3_1_1').lt(0.419)))
  .add(data.select('B4_1_1').gt(0.299).and(data.select('B4_1_1').lt(0.334))).add(data.select('B5_1_1').gt(0.325).and(data.select('B5_1_1').lt(0.353))).add(data.select('B6_1_1').gt(0.303).and(data.select('B6_1_1').lt(0.324)))
.add(data.select('B7_1_1').gt(0.306).and(data.select('B7_1_1').lt(0.330))).add(data.select('B8_1_1').gt(0.276).and(data.select('B8_1_1').lt(0.304))).add(data.select('B8A_1_1').gt(0.280).and(data.select('B8A_1_1').lt(0.310)))).rename('OWT10'));};
var nq11 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.250).and(data.select('B1_1_1').lt(0.304))).add(data.select('B2_1_1').gt(0.276).and(data.select('B2_1_1').lt(0.318))).add(data.select('B3_1_1').gt(0.333).and(data.select('B3_1_1').lt(0.374)))
  .add(data.select('B4_1_1').gt(0.287).and(data.select('B4_1_1').lt(0.340))).add(data.select('B5_1_1').gt(0.346).and(data.select('B5_1_1').lt(0.397))).add(data.select('B6_1_1').gt(0.330).and(data.select('B6_1_1').lt(0.357)))
.add(data.select('B7_1_1').gt(0.341).and(data.select('B7_1_1').lt(0.373))).add(data.select('B8_1_1').gt(0.306).and(data.select('B8_1_1').lt(0.348))).add(data.select('B8A_1_1').gt(0.312).and(data.select('B8A_1_1').lt(0.355)))).rename('OWT11'));};
var nq12 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.188).and(data.select('B1_1_1').lt(0.249))).add(data.select('B2_1_1').gt(0.209).and(data.select('B2_1_1').lt(0.250))).add(data.select('B3_1_1').gt(0.262).and(data.select('B3_1_1').lt(0.292)))
  .add(data.select('B4_1_1').gt(0.248).and(data.select('B4_1_1').lt(0.310))).add(data.select('B5_1_1').gt(0.323).and(data.select('B5_1_1').lt(0.360))).add(data.select('B6_1_1').gt(0.364).and(data.select('B6_1_1').lt(0.388)))
.add(data.select('B7_1_1').gt(0.387).and(data.select('B7_1_1').lt(0.416))).add(data.select('B8_1_1').gt(0.365).and(data.select('B8_1_1').lt(0.409))).add(data.select('B8A_1_1').gt(0.389).and(data.select('B8A_1_1').lt(0.425)))).rename('OWT12'));};
var nq13 = function (data){
  return data.addBands(((data.select('B1_1_1').gt(0.136).and(data.select('B1_1_1').lt(0.194))).add(data.select('B2_1_1').gt(0.157).and(data.select('B2_1_1').lt(0.200))).add(data.select('B3_1_1').gt(0.208).and(data.select('B3_1_1').lt(0.240)))
  .add(data.select('B4_1_1').gt(0.182).and(data.select('B4_1_1').lt(0.229))).add(data.select('B5_1_1').gt(0.273).and(data.select('B5_1_1').lt(0.317))).add(data.select('B6_1_1').gt(0.391).and(data.select('B6_1_1').lt(0.416)))
.add(data.select('B7_1_1').gt(0.426).and(data.select('B7_1_1').lt(0.455))).add(data.select('B8_1_1').gt(0.410).and(data.select('B8_1_1').lt(0.460))).add(data.select('B8A_1_1').gt(0.439).and(data.select('B8A_1_1').lt(0.471)))).rename('OWT13'));};
var nref = function (image){
  return image.addBands(image.select('B.+').divide(image.select('B.+').multiply(image.select('B.+')).reduce('sum').sqrt()))};
// var waterHa=function(image){
//   return image.addBands(image.select(['water']).eq(1).multiply(ee.Image.pixelArea()).divide(10000).rename('waterA'));
// };
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  }
};
///////////////////////////////////////////////////////
/////////////// water extent //////////////////////////
///////////////////////////////////////////////////////
function OWTplot(){
var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var wetland=table.filterBounds(geometry);
var yy = year.getValue();
var mm = month.getValue();
var zom = Map.getZoom();
Map.centerObject(wetland);
// select data set based on user AOI and dates
var dataset=ee.ImageCollection("COPERNICUS/S2_SR")
.filter(ee.Filter.calendarRange({start: yy, field: 'year'}))
.filter(ee.Filter.calendarRange({start: mm, field: 'month'}))
.filterBounds(wetland)
.select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','SCL'])
;
// mask data based on geometry and water SCL image
dataset = dataset.map(function(img) {return img.clip(wetland)});
dataset = dataset.map(function(img) {
                  var mask = img.select(['SCL']).eq(6);
                  return img.updateMask(mask);
                  });
dataset = ee.ImageCollection(dataset.mosaic());
// calculate remote sensing reflectance
var ref = function (image){
return image.addBands((image.select('B.+').multiply(0.00002)).divide(image.select('B.+').multiply(0.00002).multiply(1.7).add(0.52)));
};
dataset=dataset.map(ref);
var dataref=dataset.select(['B1_1','B2_1','B3_1','B4_1','B5_1','B6_1','B7_1','B8_1','B8A_1']);
var data=dataref.map(nref);
// map OWT
data=data.map(nq01);data=data.map(nq02);data=data.map(nq03);
data=data.map(nq04);data=data.map(nq05);data=data.map(nq06);
data=data.map(nq07);data=data.map(nq08);data=data.map(nq09);
data=data.map(nq10);data=data.map(nq11);data=data.map(nq12);data=data.map(nq13);
var media = data.select(['OWT01','OWT02','OWT03','OWT04','OWT05','OWT06','OWT07','OWT08','OWT09','OWT10','OWT11','OWT12','OWT13']);
media=media.toBands();
// print(media)
var t1=media.select('0_OWT01').set("system:id", "t1").rename('OWT').addBands(ee.Image(1).toFloat());
var t2=media.select('0_OWT02').set("system:id", "t2").rename('OWT').addBands(ee.Image(2).toFloat());
var t3=media.select('0_OWT03').set("system:id", "t3").rename('OWT').addBands(ee.Image(3).toFloat());
var t4=media.select('0_OWT04').set("system:id", "t4").rename('OWT').addBands(ee.Image(4).toFloat());
var t5=media.select('0_OWT05').set("system:id", "t5").rename('OWT').addBands(ee.Image(5).toFloat());
var t6=media.select('0_OWT06').set("system:id", "t6").rename('OWT').addBands(ee.Image(6).toFloat());
var t7=media.select('0_OWT07').set("system:id", "t7").rename('OWT').addBands(ee.Image(7).toFloat());
var t8=media.select('0_OWT08').set("system:id", "t8").rename('OWT').addBands(ee.Image(8).toFloat());
var t9=media.select('0_OWT09').set("system:id", "t9").rename('OWT').addBands(ee.Image(9).toFloat());
var t10=media.select('0_OWT10').set("system:id", "t10").rename('OWT').addBands(ee.Image(10).toFloat());
var t11=media.select('0_OWT11').set("system:id", "t11").rename('OWT').addBands(ee.Image(11).toFloat());
var t12=media.select('0_OWT12').set("system:id", "t12").rename('OWT').addBands(ee.Image(12).toFloat());
var t13=media.select('0_OWT13').set("system:id", "t13").rename('OWT').addBands(ee.Image(13).toFloat());
var all_calcs = ee.ImageCollection([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13]);
var names = ee.List(all_calcs.aggregate_array("system:id"));
// print(names);
// print(all_calcs)
// turn image collection into an array
var array = all_calcs.select(["OWT", "constant"]).toArray();
// print(array)
// sort array by the first band, keeping other bands
var axes = {image: 0, band: 1 };
var sort = array.arraySlice(axes.band, 0, 1);  // select bands from index 0 to 1 (NDVI_median)
var sorted = array.arraySort(sort);
// take the first image only (MAX NDVI)
var length = sorted.arrayLength(axes.image);
// for the max value sorted
var valuesMax = sorted.arraySlice(axes.image, length.subtract(1), length);
// for the min value sorted
// convert back to an image  
var max = valuesMax.arrayProject([axes.band]).arrayFlatten([['OWT', 'constant']]);
// get the min and max axis by selecting bands 0 and 1
var ndviMax = max.select(0); // get OWT QA
var timeMax = max.select(1); // get OWT
// add to map
// color palette from red (low) to green (high)
var palette = ["0000ff","0070ff","00dcff","00ffd4","00ff64","87ff00","d1ff00","f0ff00","ffec00","ffbd00","ff8b00","ff6400","ff0000"];
var palettebw = ["000000","555555","999999","bbbbbb","dddddd","ffffff"];
removeLayer('OWT QA value');
removeLayer('OWT type ');
Map.addLayer(ndviMax, {min: 0, max: 9, palettebw: palette}, 'OWT QA value',false);
Map.addLayer(timeMax, {min: 1, max: 13, palette: palette}, 'OWT type ');
}
//////////////////////////////////////////
/////////// monthly OWT //////////////////
//////////////////////////////////////////
function OWTMplot(){
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var wetland=table.filterBounds(geometry);
var yy = year.getValue();
// var mm = month.getValue();
var zom = Map.getZoom();
Map.centerObject(wetland);
// select data set based on user AOI and dates
var dataset=ee.ImageCollection("COPERNICUS/S2_SR")
.filter(ee.Filter.calendarRange({start: yy, field: 'year'}))
// .filter(ee.Filter.calendarRange({start: mm, field: 'month'}))
.filterBounds(wetland)
.select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','SCL'])
;
// mask data based on geometry and water SCL image
dataset = dataset.map(function(img) {return img.clip(wetland)});
dataset = dataset.map(function(img) {
                  var mask = img.select(['SCL']).eq(6);
                  return img.updateMask(mask);
                  });
// calculate remote sensing reflectance
var ref = function (image){
return image.addBands((image.select('B.+').multiply(0.00002)).divide(image.select('B.+').multiply(0.00002).multiply(1.7).add(0.52)));
};
dataset=dataset.map(ref);
var dataref=dataset.select(['B1_1','B2_1','B3_1','B4_1','B5_1','B6_1','B7_1','B8_1','B8A_1']);
var data=dataref.map(nref);
// map OWT
data=data.map(nq01);data=data.map(nq02);data=data.map(nq03);
data=data.map(nq04);data=data.map(nq05);data=data.map(nq06);
data=data.map(nq07);data=data.map(nq08);data=data.map(nq09);
data=data.map(nq10);data=data.map(nq11);data=data.map(nq12);data=data.map(nq13);
var media = data.select(['OWT01','OWT02','OWT03','OWT04','OWT05','OWT06','OWT07','OWT08','OWT09','OWT10','OWT11','OWT12','OWT13']);
var hist = ui.Chart.image.doySeries(media,wetland,ee.Reducer.sum(),30)
.setChartType('ColumnChart')
.setSeriesNames(['OWT 01', 'OWT 02', 'OWT 03', 'OWT 04', 'OWT 05', 'OWT 06', 'OWT 07', 'OWT 08', 'OWT 09', 'OWT 10',
          'OWT 11', 'OWT 12', 'OWT 13'])
.setOptions({title: 'Lake OWT water Fractional coverage',
  hAxis: {title: 'Days'},
  vAxis: {title: 'Fractional Area'},
  isStacked:'relative',
  colors: ["0000ff","0070ff","00dcff","00ffd4","00ff64","87ff00","d1ff00","f0ff00","ffec00","ffbd00","ff8b00","ff6400","ff0000"]
});
chartPanel.widgets().reset([hist]);
}