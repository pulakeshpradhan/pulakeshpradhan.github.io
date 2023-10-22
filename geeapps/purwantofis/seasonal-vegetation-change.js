////////////////////////////////////////////////////////////////////////////////
///Create graphical user interface for vegetation monthly and seasonal change///
///////////////////////////////////////////////////////////////////////////////
// Create style
// Fonts and colors
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA', 'dark': '#080c16'};
var TITLE_STYLE = {
  fontWeight      : 'bold',
  fontSize        : '20px',
  padding         : '1px',
  color           : '#cc0000',
  textAlign       : 'center',
  backgroundColor : colors.transparent,
};
var SUBTITLE_STYLE = {
  fontWeight      : '350',
  fontSize        : '12px',
  padding         : '8px',
  color           : '#e8e8e8',
  textAlign       : 'center',
  //maxWidth: '450px',
  backgroundColor : colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize        : '12px',
  fontWeight      : '50',
  color           : '#e8e8e8',
  padding         : '8px',
  maxWidth        : '500px',
  backgroundColor : colors.transparent,
};
var BUTTON_STYLE = {
  fontSize        : '14px',
  fontWeight      : '100',
  color           : '#5b5b5b',
  padding         : '8px',
  backgroundColor : colors.transparent,
};
var SELECT_STYLE = {
  fontSize        : '14px',
  fontWeight      : '50',
  color           : '#5b5b5b',
  padding         : '2px',
  backgroundColor : colors.transparent,
  width           : '115px'
};
var LABEL_STYLE = {
  fontWeight      : '50',
  textAlign       : 'center',
  fontSize        : '12px',
  color           : '#eeeeee',
  padding         : '2px',
  backgroundColor : colors.transparent,
};
// Create a panel---------------------------------------------------------------------
// Create control panel
var ctrlPanel = ui.Panel({
  style: {
    position  : 'top-left', 
    width     : '190px',
    maxHeight : '50%'
  }
});
// Create chart panel
var holdChartPanel = ui.Panel({
  style: {
    position  : 'top-right', 
    width     : '75px',
    maxHeight : '70%'
  }
});
// Create the info elements in description panel
var infoElements = ui.Panel({
  style: {
    shown : false,
    margin: '0px -9px 0px -9px'
  }
});
// Create the elements in control panel
var ctrlElements = ui.Panel({
  style: {
    shown : false,
    margin: '0px -9px 0px -9px' 
  }
});
// Create the elements in holder chart panel
var chartElements = ui.Panel({
  style: {
    shown : false,
    margin: '0px -9px 0px -9px' 
  }
});
// Create instruction panel
var insPanel = ui.Label('Klik panel di bawah ini:',
  {fontSize : '15px',
   color    : '#303030',
   margin   : '0px 0px 7px 0px'}
);
// Create show/hide info panel button
var infoButton = ui.Button(
  {label: 'Deskripsi ❯', style: {margin: '0px 4px 0px 0px'}}
);
// Create show/hide control button panel
var ctrlButton = ui.Button(
  {label: 'Pengaturan ❯', style: {margin: '0px 0px 0px 0px'}}
);
// Create show/hide holder chart button panel
var chartButton = ui.Button(
  {label: 'Chart ❯', style: {margin: '0px 0px 0px 0px'}}
);
// Holder chart button panel
var chartButtonPanel = ui.Panel(
  [chartButton],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal',margin: '0px 0px 0px 0px'}
);
// Info/control button panel
var buttonPanel = ui.Panel(
  [infoButton, ctrlButton],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal', margin: '0px 0px 0px 0px'});
// Description label
var insLabel = ui.Label('Deskripsi',
  {fontSize  :'16px',
   color     :'#808080',
   margin    : '16px 8px 0px 8px'
  }
);
// Equation label
var eqLabel = ui.Label('Rumus NDVI',
  {fontSize  :'16px',
   color     :'#808080',
   margin    : '16px 8px 0px 8px'
  }
);
// Options label
var ctrlLabel = ui.Label('Pengaturan',
  {fontSize  :'16px',
   color     :'#808080',
   margin    : '16px 8px 0px 8px'
  }
);
ctrlLabel.style().set('margin','16px 8px 2px 8px');
// Description text
var descLabel = ui.Label(
  'Aplikasi ini menampilkan tentang komparasi kondisi vegetasi yang dilihat ' +
  'dari musiman, yakni musim kemarau dan musim penghujan. Citra Landsat 8 ' +
  'digunakan dalam aplikasi ini dengan memilih tahun 2018 dan 2019. Indeks ' +
  'vegetasi, yakni NDVI diaplikasikan untuk mengetahui kondisi vegetasi musiman ' +
  'berdasarkan nilai indeksnya. Umumnya, nilai indeks yang lebih rendah menunjukkan ' +
  'rendahnya kehijauan pada vegetasi, artinya dedaunan dalam kondisi kering, kerapatan ' +
  'vegetasi rendah. Begitu pula sebaliknya pada nilai indeks yang lebih tinggi yang ' +
  'berarti vegetasi dalam kondisi sehat ataupun kerapatan vegetasi yang tinggi. ' +
  'Nilai indeks dibawah 0 menunjukkan objek yang berbeda, seperti lahan terbuka, ' +
  'bangunan, pertanian, air, dan objek lainnya.',
  {fontSize: '10px'});
// Equation text
var eqDescLabel = ui.Label('NDVI = ((NIR-RED))/((NIR+RED))')
/*// Panel to hold the main and chart
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(),
    style : {
      stretch         : 'horizontal',
      position        : 'bottom-left',
      height          : '100%',
      width           : '350px',
      backgroundColor : colors.dark
    }
});*/
// Create date panel and graph panel for side panel---------------------------------
var datePanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}}); 
var graphPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
// Adding the text for title
var titlePanel = ui.Panel({
  style: {
    position  : 'top-left',
    padding   : '0px',
    maxWidth  : '700px',
    maxHeight : '50%',
  }
});
titlePanel.add(ui.Label(' PERUBAHAN SPASIO-TEMPORAL VEGETASI (MUSIMAN)', TITLE_STYLE));
// Adding the text for drawing instruction
var drawTitle = ui.Panel({
  style: {
    position  : 'top-left',
    padding   : '0px',
    maxWidth  : '225px',
    maxHeight : '50%',
  }
});
drawTitle.add(ui.Label('DIGITASI DI PANEL MAP KIRI', {fontSize: '14px', color: '#f50707'}));
// Call Landsat-8----------------------------------------------------------------------------------------------------
// Function for Cloud Masking
function fmask(img) {
  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask = 1 << 3;
  var qa = img.select('QA_PIXEL');
  var ra = img.select('QA_RADSAT').eq(0);
  var mask = qa.bitwiseAnd(cloudShadowBitMask)
                 .eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask)
          .updateMask(ra)
          .toFloat();
}
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA');
// Visualize chart seasonal image------------------------------------------------------------------------------------
var yearlist = [
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
var year_selector = ui.Select({items        : yearlist,
                               placeholder  : 'Pilih Tahun',
                               style        : SELECT_STYLE,
                               onChange     : redraw
});
datePanel.add(year_selector);
var addNDVI = function (img) {
    var ndvi = img.normalizedDifference(['B5','B4']).rename('NDVI');
       return img.addBands(ndvi); 
    };
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
                   '74A901', '66A000', '529400', '3E8601', '207401', '056201',
                   '004C00', '023B01', '012E01', '011D01', '011301']
// cloud mask, filterDate, filterBound, composite method, clip
function processImage(imageCol, year, aoi, zoom){
    var filterDry = ee.Filter.and(ee.Filter.lt('CLOUD_COVER',50),
                              ee.Filter.calendarRange({start: year, end: year, field: 'year'}),
                              ee.Filter.calendarRange(9,12, 'month'));
    var filterWet = ee.Filter.and(ee.Filter.lt('CLOUD_COVER',50),
                              ee.Filter.calendarRange({start: year, end: year, field: 'year'}), 
                              ee.Filter.calendarRange(4,7, 'month'));
    var LC8_dry   = imageCol.filter(filterDry)
                           .map(fmask)
                           .map(addNDVI);
    var LC8_wet   = imageCol.filter(filterWet)
                           .map(fmask)
                           .map(addNDVI);
    var compDry = LC8_dry.select('NDVI').mean();
    var compWet = LC8_wet.select('NDVI').mean();
    //print(compDry)
    var geo = ee.FeatureCollection("users/purwantofis/eastjava");
    var compDryband = ee.Image(compDry.select('NDVI'));
    compDryband = compDryband.clip(geo.geometry());
    var compWetband = ee.Image(compWet.select('NDVI'));
    compWetband = compWetband.clip(geo.geometry());
    //print(compWetband);
    // plot composite
    var ndviDry = compDryband.rename('ndvi');
    var ndviWet = compWetband.rename('ndvi');
    mapPanel1.setCenter(112.81997421653189,-7.907939966735457, 12);
    mapPanel2.setCenter(112.81997421653189,-7.907939966735457, 12);
    mapPanel1.addLayer(ndviDry, {min: 0, max: 1, palette: palette}, 'NDVI');
    mapPanel2.addLayer(ndviWet, {min: 0, max: 1, palette: palette}, 'NDVI');
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  mapPanel1.layers().reset();
  mapPanel2.layers().reset();
  // dates
  var year = year_selector.getValue();
  var imageCol = dataset;
  processImage(imageCol, year, 12);
  //generateChart(imageCol, year);
}
// Creates NDVI colorbar-----------------------------------------------------------------------------------
// Create the colorbar image.
var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {bbox: [0, 0, 1, 0.1], dimensions: '400x40', format: 'png', min: 0, max: 1, palette: palette},
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
//Create colorbar panel with numbers
var legendLabels = ui.Panel({
    widgets: [
      ui.Label(0),
      ui.Label(
          (1 / 2),
          {textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(1)
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//Create colorbar title
var legendTitle = ui.Label({
      value: 'Normalized Difference Vegetation Index',
      style: {fontWeight: 'bold', textAlign:'center', stretch: 'horizontal'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels], "flow",{padding: '0px', position: 'bottom-right'});
// Create the split map panel----------------------------------------------------------------------------------------
// Map widget
var mapPanel1 = ui.Map();
mapPanel1.add(ui.Panel({
  widgets : [ui.Label('Musim Kemarau')],
  style   : {position: 'bottom-left'}
}));
var mapPanel2 = ui.Map();
mapPanel2.add(ui.Panel({
  widgets : [ui.Label('Musim Penghujan')],
  style   : {position: 'bottom-right'}
}));
// NDVI visualization using a split map
var linker = ui.Map.Linker([mapPanel1,mapPanel2]);
var splitMap = ui.SplitPanel({
  firstPanel: mapPanel1,
  secondPanel: mapPanel2,
  wipe: true,
});
// Show/hide the info panel function
var infoShow = false;
function infoButtonHandler() {
  if(infoShow) {
    infoShow = false;
    infoElements.style().set('shown', false);
    infoButton.setLabel('Deskripsi ❯');
  } else {
    infoShow = true;
    infoElements.style().set('shown', true);
    infoButton.setLabel('Deskripsi ❮');
  }
  if(infoShow | ctrlShow) {
    ctrlPanel.style().set('width', '320px');
  } else {
    ctrlPanel.style().set('width', '190px');
  }
}
// Show/hide the control panel function
var ctrlShow = false;
function ctrlButtonHandler() {
  if(ctrlShow) {
    ctrlShow = false;
    ctrlElements.style().set('shown', false);
    ctrlButton.setLabel('Pengaturan ❯');
  } else {
    ctrlShow = true;
    ctrlElements.style().set('shown', true);
    ctrlButton.setLabel('Pengaturan ❮');
  }
  if(infoShow | ctrlShow) {
    ctrlPanel.style().set('width', '250px');
  } else {
    ctrlPanel.style().set('width', '190px');
  }
}
// Show/hide the holder chart panel function
var chartShow = false;
function chartButtonHandler() {
  if(chartShow) {
    chartShow = false;
    chartElements.style().set('shown', false);
    chartButton.setLabel('Chart ❯');
  } else {
    chartShow = true;
    chartElements.style().set('shown', true);
    chartButton.setLabel('Chart ❮');
  }
  if(chartShow) {
    holdChartPanel.style().set('width', '600px');
  } else {
    holdChartPanel.style().set('width', '75px');
  }
}
// Create interactive region reduction for generate the chart----------------------------------
var drawingTools = mapPanel1.drawingTools();
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
// Create drawing button
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
// Create regional time series
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'top-right', shown: false}
});
function chartNdviTimeSeries(imageCol, year) {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Landsat 8 time series
  var filtering = ee.Filter.and(ee.Filter.calendarRange({start: year_selector.getValue(), 
                                                         end: year_selector.getValue(), 
                                                         field: 'year'}));
  var LC8 = dataset.filter(filtering)
                    .map(fmask)
                    .map(addNDVI);
  //print(LC8);
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: LC8,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setChartType('LineChart')
                  .setOptions({
                    title: 'Pola NDVI Tahunan',
                    legend: {position: 'none'},
                    interpolateNulls: true,
                    curveType: 'function',
                    hAxis: {title: 'Date', format: 'YYYY-MMM', gridlines: {count: 13}},
                    vAxis: {title: 'NDVI'},
                    series: {0: {color: '#2ec21d'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
// UI for drawing tools------------------------------------------------------------------------------
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Pilih mode digitasi:'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    })
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
// Setup UI elements-------------------------------------------------------------
infoElements.add(insLabel)
            .add(descLabel);
ctrlElements.add(ctrlLabel)
            .add(datePanel)
            .add(controlPanel);
chartElements.add(chartPanel);
ctrlPanel.add(insPanel)
         .add(buttonPanel)
         .add(infoElements)
         .add(ctrlElements);
holdChartPanel.add(chartButtonPanel)
              .add(chartElements);
mapPanel1.add(titlePanel)
         .add(drawTitle)
         .add(ctrlPanel);
mapPanel2.add(legendPanel)
         .add(holdChartPanel);
infoButton.onClick(infoButtonHandler);
ctrlButton.onClick(ctrlButtonHandler);
chartButton.onClick(chartButtonHandler);
mapPanel1.setOptions('SATELLITE');
mapPanel2.setOptions('SATELLITE');
mapPanel1.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
mapPanel2.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
ui.root.clear();
ui.root.add(splitMap);