var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.40414232435856,
            22.388080757343044
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([73.40414232435856, 22.388080757343044]);
// final app code for water  color  of lakes in INDIA
///////////Add Assets -- wetland shape file//////////////
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
var symbol = {marker: '📍'}
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
var header = ui.Label('Changing color of Lakes and Rivers of India', 
    {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// app summary
var Author = ui.Label('Ashwin Gujrati, RamaRao Nidamanuri, R. P. Singh, Vibhuti Bhushan Jha'
    );
var text = ui.Label(
  'This Google earth engine app aids in ploting time series water color Lakes of India.' +
  'Zoom at desired location to see the lakes in the database.',
    {fontSize: '15px'});
// create panel
var panel = ui.Panel({
  widgets:[header,Author,text],//Adds header and text
  style:{width:'33%',position:'middle-right'}});
var inspector = ui.Panel([ui.Label('Use the Marker')]);
Map.add(inspector);
var inspector1 = ui.Panel({
  widgets: [ui.Label('Name: '),
            ui.Label('Description: ')
            ],
  style: {position: 'bottom-right'}
});
Map.add(inspector1);  
// add panel to root of gui
ui.root.insert(1,panel);
// panel for data date range
var Daterange = ui.Panel(ui.Label('Enter date range'));
var startyear=ui.Textbox({
  placeholder: 'Enter Start Year...',
  // onChange: function(value){startyear.setValue(value);return(value)},
  style: {stretch: 'horizontal'}
});
var endyear=ui.Textbox({
  placeholder: 'Enter End Year...',
  // onChange: function(value){endyear.setValue(value);return(value)},
  style: {stretch: 'horizontal'}
});
var yearPanel = ui.Panel({
          widgets: [startyear, endyear],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
var startmonth=ui.Textbox({
  placeholder: 'Enter Start Month...',
  // onChange: function(value){startmonth.setValue(value);return(value)},
  style: {stretch: 'horizontal'}
});
var endmonth=ui.Textbox({
  placeholder: 'Enter End Month...',
  // onChange: function(value){endmonth.setValue(value);return(value)},
  style: {stretch: 'horizontal'}
});
var monthPanel = ui.Panel({
          widgets: [startmonth, endmonth],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
panel.add(Daterange)
      .add(yearPanel)
      .add(monthPanel);
drawingTools.onDraw(ui.util.debounce(geoProg, 500));
drawingTools.onEdit(ui.util.debounce(geoProg, 500));
var color=ui.Button({label: 'Plot Color'});
var plotPanel = ui.Panel({
          widgets: [color],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
panel.add(plotPanel);
color.onClick(watercolor);
////////// add chart panel in info panel///////////////////
var chartPanel = ui.Panel({
  style:{position: 'bottom-right', shown: false}
});
panel.add(chartPanel);
/////////////////// Global variables////////////////
var first_year, last_year,table, first_month, last_month, geometry, wetland,startDate, endDate;
///////////////////////////////////
/////////// main code /////////////
///////////////////////////////////
function geoProg(){
var geometry = drawingTools.layers().get(0).getEeObject();
return geometry;
}
var waterL8 = function(image) {
  var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
                  return image.updateMask(mask);
};
var waterL57 = function(image) {
  var mask = image.select(['pixel_qa']).eq(68);
                  return image.updateMask(mask);
};
var water=function(image){
  return image.addBands(image.select(['pixel_qa']).gt(0).multiply(ee.Image.pixelArea()).divide(10000).rename('water'));
};
//////////////////////////////////////////////////////
/////////////// water color //////////////////////////
//////////////////////////////////////////////////////
function watercolor(){
    if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var wetland=table.filterBounds(geometry);
var WetlandName = wetland.first().get('WETNAME').getInfo();
var WetlandDes = wetland.first().get('DESCR').getInfo();
var first_year = startyear.getValue();
var last_year = endyear.getValue();
var first_month = startmonth.getValue();
var last_month = endmonth.getValue();
var startDate = ee.Date(first_year+'-'+first_month+'-'+'01');
var endDate = ee.Date(last_year+'-'+last_month+'-'+'28');
///////// add wetland boundary and images //////////
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
removeLayer('selected_wetland');
var empty = ee.Image().byte();
var outlineW = empty.paint({
  featureCollection: wetland,
  color: 1,
  width: 2
});
Map.centerObject(wetland);
Map.addLayer(outlineW,{palette:'FF0000'},'selected_wetland');
// select data set based on user AOI and dates
var data5=ee.ImageCollection("LANDSAT/LT05/C01/T1_SR");
var data7=ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").filterDate('2000-01-01','2013-03-25');
var data57=data5.merge(data7);
// var data57=data5;
var dataset57=data57
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland)
.select(['B1','B2','B3','pixel_qa']);
// get water pixels
dataset57=dataset57.map(waterL57);
dataset57=dataset57.map(function (image){
  return image.addBands(image.multiply(0.0001));
});
dataset57=dataset57.map(function (image){
  return image.addBands(((image.select('B1_1').multiply(13.104))
                     .add(image.select('B2_1').multiply(53.791))
                     .add(image.select('B3_1').multiply(31.304))).rename('CIEX'));});
dataset57=dataset57.map(function (image){
  return image.addBands(((image.select('B1_1').multiply(24.097))
                     .add(image.select('B2_1').multiply(65.801))
                     .add(image.select('B3_1').multiply(15.883))).rename('CIEY'));});
dataset57=dataset57.map(function (image){
  return image.addBands(((image.select('B1_1').multiply(63.845))
                     .add(image.select('B2_1').multiply( 2.142))
                     .add(image.select('B3_1').multiply( 0.013))).rename('CIEZ'));});
dataset57=dataset57.map(function (image){
  return image.addBands((image.select('CIEX').divide(image.select('CIEX').add(image.select('CIEY'))
  .add(image.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));});
dataset57=dataset57.map(function (image){
return image.addBands((image.select('CIEY').divide(image.select('CIEX').add(image.select('CIEY'))
  .add(image.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));});
dataset57=dataset57.map(function (image){
    return image.addBands((((image.select('CIEx').atan2(image.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));});
dataset57=dataset57.map(function (image){
  return image.addBands((image.select('Hue').divide(100)).rename('Huer'));});
dataset57=dataset57.map(function (image){
  return image.addBands((image.select('Hue').add((image.select('Huer').pow(5).multiply(-84.94)).add(image.select('Huer').pow(4).multiply(594.17))
  .add(image.select('Huer').pow(3).multiply(-1559.86)).add(image.select('Huer').pow(2).multiply(1852.5)).add(image.select('Huer').multiply(-918.11))
  .add(151.49))).rename('HueC'));});
dataset57=dataset57.map(function (image){
  return image.addBands(((image.select('HueC').multiply(-0.6067)).add(602.6)).rename('DomWav'));});
var dataset8=ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland)
.select(['B1','B2','B3','B4','pixel_qa']);
// get water pixels
dataset8=dataset8.map(waterL8);
dataset8=dataset8.map(function (image){
  return image.addBands(image.multiply(0.0001));
});
dataset8=dataset8.map(function (data){
return data.addBands(((data.select('B1_1').multiply(11.053)).add(data.select('B2_1').multiply(6.950)).add(data.select('B3_1').
multiply(51.135)).add(data.select('B4_1').multiply(34.457))).rename('CIEX'));});
dataset8=dataset8.map(function (data){
return data.addBands(((data.select('B1_1').multiply(1.320)).add(data.select('B2_1').multiply(21.053)).add(data.select('B3_1').
multiply(66.023)).add(data.select('B4_1').multiply(18.034))).rename('CIEY'));});
dataset8=dataset8.map(function (data){
  return data.addBands(((data.select('B1_1').multiply(58.038)).add(data.select('B2_1').multiply(34.931)).add(data.select('B3_1').
multiply(2.606)).add(data.select('B4_1').multiply(0.016))).rename('CIEZ'));});
dataset8=dataset8.map(function (data){
  return data.addBands((data.select('CIEX').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));});
dataset8=dataset8.map(function (data){  
  return data.addBands((data.select('CIEY').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));});
dataset8=dataset8.map(function (data){  
    return data.addBands((((data.select('CIEx').atan2(data.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));});
dataset8=dataset8.map(function (data){  
  return data.addBands((data.select('Hue').divide(100)).rename('Huer'));});
dataset8=dataset8.map(function (data){  
 return data.addBands((data.select('Hue').add((data.select('Huer').pow(5).multiply(-52.16)).add(data.select('Huer').pow(4).multiply(373.81))
  .add(data.select('Huer').pow(3).multiply(-981.83)).add(data.select('Huer').pow(2).multiply(1134.19)).add(data.select('Huer').multiply(-533.61))
  .add(76.72))).rename('HueC'));});  
dataset8=dataset8.map(function (data){  
 return data.addBands(((data.select('HueC').multiply(-0.6067)).add(602.6)).rename('DomWav'));});   
var dataset=dataset57.merge(dataset8);
var Wdataset=ee.ImageCollection(dataset).select('DomWav');      
// make monthly composite 
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1984, 2021);
var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return Wdataset
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .median()
        .set('month', m).set('year', y)
        .set('system:time_start',ee.Date.fromYMD(y,m,15));
  });
}).flatten());
var listOfImages = byMonthYear.toList(byMonthYear.size());
var newList = listOfImages.map(function comprobeBandsNumber(ele){
  var new_list = ee.List([]); 
  var count = ee.Image(ele).bandNames().size();
  var comp = ee.Algorithms.If(count.eq(1), ele, 0);
  new_list = new_list.add(comp);
  return new_list;
}).flatten();
//removing zeroes in new list
newList = newList.removeAll([0]);
var MIC = ee.ImageCollection(newList);
/////////////// plot hist ////////////////////
var hist = ui.Chart.image.series(MIC,wetland,ee.Reducer.median(),30)
.setOptions({title: 'Wetland water Color',
  hAxis: {title: 'Date'},
  vAxis: {title: 'Dominat Wavelength'}})
  // .setChartType('ColumnChart')
;
removeLayer('Color');
var dateLabel = ui.Label();
  hist.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    //Find image coresponding with clicked data and clip water classification to roi 
    var selcImage = ee.Image(MIC.filterDate(xValue).first()).clip(wetland); 
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(selcImage, {
      bands: ['DomWav'],
      max: 600,
      min: 460
    });
    Map.layers().reset([S1Layer]);
    var visParams = {min: 460, max: 600, palette: ["4161BF","3f6bbf","3fa6b2","3fbf52","66bf3f","beb93f","bf863f"]};
    Map.addLayer(selcImage,visParams,'Color');
    // dateLabel.setValue((new Date(xValue)).toUTCString());
    // dateLabel.style().set({position: 'bottom-left'});
  });
  Map.add(dateLabel)
  // Map.unlisten(watercolor);
// panel.add(hist);
chartPanel.widgets().reset([hist]);
inspector1.widgets().set(0, ui.Label({
    value: 'Name: '+ WetlandName,
  }));
inspector1.widgets().set(1, ui.Label({
    value: 'Description: '+ WetlandDes,
  }));
}