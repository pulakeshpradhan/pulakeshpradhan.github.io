var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                75.42251316463164,
                24.71383539820597
              ],
              [
                75.60928074275664,
                24.721320218236524
              ],
              [
                75.65734592830351,
                24.758737564258215
              ],
              [
                75.63537327205351,
                24.868430073088795
              ],
              [
                75.56808201228789,
                24.93444797414212
              ],
              [
                75.55297581111601,
                24.814842455432807
              ],
              [
                75.33050266658476,
                24.75125499593992
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffffff */ee.Geometry.Polygon(
        [[[75.42251316463164, 24.71383539820597],
          [75.60928074275664, 24.721320218236524],
          [75.65734592830351, 24.758737564258215],
          [75.63537327205351, 24.868430073088795],
          [75.56808201228789, 24.93444797414212],
          [75.55297581111601, 24.814842455432807],
          [75.33050266658476, 24.75125499593992]]]);
Map.setCenter(77,22,4);
////////////// add map panel////////////////////
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '#ffffff',shown:false});
 drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
var inspector = ui.Panel([ui.Label('Use marker to draw')]);
Map.add(inspector);
 // label for data used
 function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
var symbol = {marker: '📍'};
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: symbol.marker + 'Marker',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('1. Draw the polygon around the water Body.'),
    ui.Label('2. Set the date range.'),
    ui.Label('3. Click the button for Area.'),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
// panel widgets
// app title
var header = ui.Label('Aquatic vegetation', 
    {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// app summary
var text = ui.Label(
  'This toolbox plots Extent of Aquatic vegetation using multiple Index.' +
  'Use the tools to explore.',
    {fontSize: '15px'});
// create panel
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width:'33%',position:'middle-right'}});
// add panel to root of gui
ui.root.insert(1,panel);
// panel for data date range
var Daterange = ui.Panel(ui.Label('Enter date range'));
var DaterangeD = ui.Panel(ui.Label('insert Landsat 8 data range'));
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
panel.add(Daterange).add(DaterangeD)
      .add(yearPanel)
      .add(monthPanel);
drawingTools.onDraw(ui.util.debounce(geoProg, 500));
drawingTools.onEdit(ui.util.debounce(geoProg, 500));
var wextnt = ui.Button({label: 'Plot Extent'});
var plotPanel = ui.Panel({
          widgets: [wextnt],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
panel.add(plotPanel);
wextnt.onClick(waterextent);
////////// add chart panel in info panel///////////////////
var chartPanel = ui.Panel({
  style:{position: 'bottom-right', shown: false}
});
panel.add(chartPanel);
/////////////////// Global variables////////////////
var  geometry, first_year, last_year, first_month, last_month;
///////////////////////////////////
/////////// main code /////////////
///////////////////////////////////
function geoProg(){
var geometry = drawingTools.layers().get(0).getEeObject();
return geometry;
}
var index8= function(data){
  var ndvi = data.normalizedDifference(['B5', 'B4']).rename('ndvi');
  var lswi = data.normalizedDifference(['B5', 'B6']).rename('lswi');
  var mndwi = data.normalizedDifference(['B3', 'B6']).rename('mndwi');
  var ndavi = data.normalizedDifference(['B5', 'B2']).rename('ndavi');
  var evsi = data.normalizedDifference(['B4', 'B6']).rename('evsi');
  var gari = (data.select('B5').subtract(data.select('B3').subtract(data.select('B2').subtract(data.select('B4'))))).divide((data.select('B5').subtract(data.select('B3').add(data.select('B2').subtract(data.select('B4')))))).rename('gari');
  var fai = data.select('B5').subtract(data.select('B4').add(data.select('B6').subtract(data.select('B4'))).multiply(0.1717)).multiply(0.0001).rename('fai');
  var mai = data.select('B3').add(data.select('B4')).subtract(data.select('B6').add(data.select('B2').subtract(data.select('B6'))).multiply(0.9356)).multiply(0.0001).rename('mai');
  return data.addBands([ndvi,lswi,mndwi,ndavi,evsi,gari,fai,mai]);
};
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var waterClass = function(img){
  var land=img.select('B2').gt(750).rename('land');
  var OW=img.select('B2').lt(750).and(img.select('ndvi').lt(-0.2)).rename('OW');
  var EV=img.select('B2').lt(750).and(img.select('ndvi').gt(-0.2)).and(img.select('evsi').lt(-0.2)).rename('EV');
  var SAV =img.select('B2').lt(750).and(img.select('ndvi').gt(-0.2)).and(img.select('evsi').gt(-0.2)).and(img.select('mai').gt(0.05)).rename('SAV');
  var FV =img.select('B2').lt(750).and(img.select('ndvi').gt(-0.2)).and(img.select('evsi').gt(-0.2)).and(img.select('mai').lt(0.05)).rename('FV');
  return img.addBands([land,OW,EV,SAV,FV]);
};
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
function waterextent(){
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
Map.centerObject(geometry);
var first_year = startyear.getValue();
var last_year = endyear.getValue();
var first_month = startmonth.getValue();
var last_month = endmonth.getValue();
var startDate = ee.Date(first_year+'-'+first_month+'-'+'01');
var endDate = ee.Date(last_year+'-'+last_month+'-'+'28');
// select data set based on user AOI and dates
var data8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(geometry)
.map(maskL8sr);
data8=data8.map(index8);
data8 = data8.map(function(img) {return img.clip(geometry)});
// get water pixels
var ltw = data8.select('mndwi').reduce(ee.Reducer.percentile([95]));
var waterPix = function(image){
  var test = image.select('mndwi');
  var water=test.gt(ltw.abs().subtract(test.abs())).rename('water');
  return image.addBands([water]);
};
data8=data8.map(waterPix);
data8=data8.map(waterClass);
var classimg = data8.select(['land','OW','EV','SAV','FV']);
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1984, 2021);
var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return classimg
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('month', m).set('year', y)
        .set('system:time_start',ee.Date.fromYMD(y,m,15));
  });
}).flatten());
var listOfImages = byMonthYear.toList(byMonthYear.size());
var newList = listOfImages.map(function comprobeBandsNumber(ele){
  var new_list = ee.List([]); 
  var count = ee.Image(ele).bandNames().size();
  var comp = ee.Algorithms.If(count.gt(1), ele, 0);
  new_list = new_list.add(comp);
  return new_list;
}).flatten();
//removing zeroes in new list
newList = newList.removeAll([0]);
var MIC = ee.ImageCollection(newList);
// data vizualization
removeLayer('FCC');
var vizParams = {bands: ['B5', 'B4', 'B3'],min: 0,max: 4000,gamma: [0.95, 1.1, 1]};
Map.addLayer(data8.first(),vizParams,'FCC');
removeLayer('TCC');
var vizParams1 = {bands: ['B4', 'B3', 'B2'],min: 0,max: 2000,gamma: [0.95, 1.1, 1]};
Map.addLayer(data8.first(),vizParams1,'TCC');
var hist = ui.Chart.image.series(MIC,geometry,ee.Reducer.sum(),30)
.setSeriesNames(['Land', 'Open_water', 'Emergent_vegetation', 'Submerged_vegetation', 'Floating_vegetation'])
.setChartType('ColumnChart')
.setOptions({
    title: 'Wetland water extent',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Water Area (ha)'},
    colors: ['B02C0F', '2960E7', '0B8006', '0AEFB4', '0DEF0A'],
    isStacked: 'absolute',
  });
chartPanel.widgets().reset([hist]);
}