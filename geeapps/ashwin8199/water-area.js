var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#dcdcdc",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #dcdcdc */
    /* shown: false */
    ee.Geometry.MultiPoint();
// final water extent with index code..
// add greater than and less than feature in the data..
///////////Add Assets -- wetland shape file//////////////
// var table = ee.FeatureCollection("users/ashwin8199/color/final_wetlands");
///////////////////Plot Wetlands/////////////////////
Map.setCenter(77,22,4);
////////////// add map panel////////////////////
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '#dcdcdc',shown:false});
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
var header = ui.Label('Comparison of the performance of multiple remote sensing indices in delineating surface water extent.', 
    {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// app summary
var Author = ui.Label(
  'Authors: Ashwin Gujrati, Vibhuti Bhushan Jha, RamaRao Nidamanuri , R. P. Singh',
{fontSize: '15px'});
var Text = ui.Label(
  'This GEE app help to visualize in identification of most suitable multi-spectral remote sensing index and corresponding threshold value',
    {fontSize: '20px'});
// create panel
var panel = ui.Panel({
  widgets:[header,Author,Text],//Adds header and text
  style:{width:'25%',position:'middle-right'}});
// add panel to root of gui
ui.root.insert(1,panel);
// panel for data date range
var Daterange = ui.Panel(ui.Label('Select year and month',{fontSize:'15px'}));
var year_list = [
    {label: '2013', value: 2013},
    {label: '2014', value: 2014},
    {label: '2015', value: 2015},
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
panel.add(Daterange).add(datePanel)
var Indextype = ui.Panel(ui.Label('Choose the index and thresold',{fontSize:'15px'}));
var Index_list = [
    {label: 'NDVI', value: 'NDVI'},
    {label: 'NDWI', value: 'NDWI'},
    {label: 'MNDWI', value: 'MNDWI'},
    {label: 'NDMI', value: 'NDMI'},
    {label: 'NDTI', value: 'NDTI'},
    {label: 'AWEI', value: 'AWEI'},
    {label: 'MBWI', value: 'MBWI'},
    {label: 'SWI', value: 'SWI'}
    ];
var Index = ui.Select({items: Index_list, placeholder: 'Select a Index', value: 'NDVI'});
var thres = ui.Slider({min:-1,max:1,value:0,step:0.01,
onChange: function(value){thres.setValue(value);return(value)},
 style:  {width: '400px'}});
var Index_panel=ui.Panel({widgets:[Index,thres],
          layout: ui.Panel.Layout.Flow('horizontal')});
panel.add(Indextype).add(Index_panel)
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
var  geometry, startDate, endDate;
///////////////////////////////////
/////////// main code /////////////
///////////////////////////////////
function geoProg(){
var geometry = drawingTools.layers().get(0).getEeObject();
return geometry;
}
var NDVI = function(image) {
  return image.addBands(image.normalizedDifference(['B5','B4']).rename('NDVI'));
};
var NDWI = function(image) {
  return image.addBands(image.normalizedDifference(['B3','B5']).rename('NDWI'));
};
var NDMI = function(image) {
  return image.addBands(image.normalizedDifference(['B5','B6']).rename('NDMI'));
};
var MNDWI = function(image) {
  return image.addBands(image.normalizedDifference(['B3','B6']).rename('MNDWI'));
};
var NDTI = function(image) {
  return image.addBands(image.normalizedDifference(['B4','B3']).rename('NDTI'));
};
var AWEI = function(image) {
  return image.addBands(((image.select('B3').subtract(image.select('B6'))).multiply(4))
  .subtract((image.select('B3').multiply(0.25)).add(image.select('B7').multiply(2.75))).rename('AWEI'));
};
var SWI =function(image){
var hsv = image.select(['B4', 'B3', 'B2']).rgbToHsv();
return image.addBands((hsv.select('saturation').subtract(image.select('B5').multiply(7))).divide((hsv.select('saturation').add(image.select('B5').multiply(7)))).rename('SWI'));
};
var MBWI = function(image) {
  return image.addBands((image.select('B3').multiply(2)).subtract(image.select('B4')
  .add(image.select('B5')).add(image.select('B6')).add(image.select('B7'))).rename('MBWI'));
};
var waterHa=function(image){
  return image.addBands(image.select(['water']).eq(1).multiply(ee.Image.pixelArea()).divide(10000).rename('waterA'));
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
var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
Map.centerObject(geometry);
var yy = year.getValue();
var mm = month.getValue();
// select data set based on user AOI and dates
var dataset = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filter(ee.Filter.calendarRange({start: yy, field: 'year'}))
.filter(ee.Filter.calendarRange({start: mm, field: 'month'}))
.filterBounds(geometry)
.select(['B.+']);
dataset = dataset.map(function(img) {return img.clip(geometry)});
// get water pixels
var ind=Index.getValue();
dataset=dataset.map(NDVI);dataset=dataset.map(NDWI);dataset=dataset.map(MNDWI);
dataset=dataset.map(NDMI);dataset=dataset.map(NDTI);dataset=dataset.map(AWEI);
dataset=dataset.map(SWI);dataset=dataset.map(MBWI);
var thresV=thres.getValue();
dataset = dataset.map(function(image){
  return image.addBands(image.select(ind).gt(thresV).rename('water'));
});
dataset = dataset.map( function(image){
    return image.updateMask(image.select('water'));
  });
dataset=dataset.map(waterHa);
var imageC=dataset.mosaic()
var stats = imageC.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  });
print(stats.get('waterA'));
// data vizualization
removeLayer('satellite image')
var vizParams = {bands: ['B5', 'B4', 'B3'],min: 0,max: 4000,gamma: [0.95, 1.1, 1]};
Map.addLayer(dataset,vizParams,'satellite image');
removeLayer('water extent')
var waterViz = {bands: ['waterA'],palette: ['0000FF']};
Map.addLayer(imageC,waterViz,'water extent');
inspector.widgets().set(0, ui.Label({
    value: 'Area: '+ stats.get('waterA').getInfo().toFixed(2)+' ha',
  }));
}