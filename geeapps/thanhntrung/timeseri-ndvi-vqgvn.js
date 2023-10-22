var lockbt = ui.import && ui.import("lockbt", "table", {
      "id": "users/thanhntrung/vuon_qgia"
    }) || ee.FeatureCollection("users/thanhntrung/vuon_qgia");
//khu bảo tồn vn
//var lockbt = ee.FeatureCollection('users/thanhntrung/vuon_qgia');
    //.filter(ee.Filter.eq('Kieu_BT', 'Vườn quốc gia'));  // Exactly the same as above.
    //.first()
    //.geometry();
var kbt = lockbt.aggregate_array('Ten')
var kbt_lst = ui.Select([], '...')
  kbt.evaluate(function(t){
  kbt_lst.items().reset(t)
  kbt_lst.setPlaceholder('Chọn vườn Quốc gia')
  kbt_lst.onChange(function(t){
    //print(kbt_lst.getValue())
    })
  })
//var AOI = table
/// Initialize the UI. 
//Clear the default UI since we're adding our own main and map panels.
ui.root.clear();
var mapPanel = ui.Map();
ui.root.widgets().reset([mapPanel]);
///////////MAIN PANEL//////////////////
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var style_title = {
  fontWeight: 'bold',
  fontSize: '33px',
  padding: '1px',
  color: 'green',
  backgroundColor: colors.transparent,
};
var paragraph_title = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'black',
  padding: '1px',
  backgroundColor: colors.transparent,
};
var style_paragraph = {
  fontSize: '15px',
  fontWeight: '60',
  color: 'grey',
  padding: '1px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '2px solid rgba(50, 5, 98, 10.05)';
  var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '60%',
      width: '400px',
      backgroundColor: colors.gray,
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
  // Add the app title to the side panel
  var titleLabel = ui.Label('Biến động NDVI tại các vườn Quốc gia từ ảnh Sentinel-2', style_title);
  mainPanel.add(titleLabel);
  // Add the app description to the main panel
  var descriptionText = 'NDVI các khu rừng Quốc gia Việt Nam';
  var descriptionLabel = ui.Label(descriptionText, style_paragraph);
  //mainPanel.add(descriptionLabel);
       var firstSubParagraph_text = '...';
   var firstSubParagraph = ui.Label(firstSubParagraph_text, style_paragraph);
   //mainPanel.add(firstSubParagraph);
      var secondSubParagraph_text = '...';
   var secondSubParagraph = ui.Label(secondSubParagraph_text, style_paragraph);
   //mainPanel.add(secondSubParagraph);
  var firstSubTitle_text = 'Khoảng thời gian để tính biến động NDVI';
  var firstSubTitle = ui.Label(firstSubTitle_text, paragraph_title);
  mainPanel.add(firstSubTitle);
   var secondSubParagraph_text = 'Nhập theo mẫu: YYYY-MM-DD';
   var secondSubParagraph = ui.Label(secondSubParagraph_text, SUBPARAGRAPH_STYLE);
   mainPanel.add(secondSubParagraph);
   ////////////////////////////////////////////////////////DATE SET UP//////////////////////////
   //Today´s date as the default end date of the regression. 
   var now = new Date();
   var nowStr = now.toLocaleDateString('en-CA'); 
   var endDate = ui.Textbox({
     value: nowStr,
     placeholder: '...',
     onChange: function(end) {
       endDate.setValue(end);
     }
    });
   //Get the starting date 5 years before today's day date.
   var dateNow = ee.Date(nowStr);
   var lastMonth = dateNow.advance(-12, 'month').format ("YYYY-MM-dd");
   var startDate = ui.Textbox({
     value: lastMonth.getInfo(),
     placeholder: '...',
     onChange: function(start) {
       startDate.setValue(start);
     }
    });
  mainPanel.add(startDate);
  mainPanel.add(endDate);
  mainPanel.add(kbt_lst);
// Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
/*
PROCESSING STARTS HERE
*/
mapPanel.setCenter (108,17,6);
var submit = ui.Button({
  label: 'Calculate NDVI',
  onClick: function() {
    mapPanel.clear()
    chartPanel.clear()
//mới thêm
   var kbt_name = kbt_lst.getValue();
   //var filter = ee.Filter.inList('Ten', [kbt_name]);
   var AOI = ee.FeatureCollection('users/thanhntrung/vuon_qgia')
    .filter(ee.Filter.eq('Ten', kbt_name))
    //.filter(ee.Filter.eq('Kieu_BT', 'Vườn quốc gia')) // Exactly the same as above.
    .first()
    .geometry();
   //print(kbt_lst.getValue());
   //var AOI = kbt.filter(filter);
//mapPanel.addLayer(AOI);
mapPanel.centerObject(AOI,11);
  //Define dates
  var date_start = startDate.getValue();
  var date_end= endDate.getValue();
  //Define a Cloud Threshold
  var cloud_threshold = 30;
  //Setup a function to caclulate the NDSI
  function CalculateNDVI(image) {
    var NDVI = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(NDVI);
        } 
  //Add a Time band.
  function TimeBand (image) {
  return image.addBands(image.metadata('system:time_start'));
}
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
  //Add Sentinel-2 Collection and filter using AOI, dates, cloud threshold.
  var S2 = ee.ImageCollection("COPERNICUS/S2_SR")
      .filterDate(date_start, date_end)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud_threshold))
      .sort('CLOUDY_PIXEL_PERCENTAGE')
      .sort('system:time_start')
      .filterBounds(AOI)
      .map(maskS2clouds) 
      .map(CalculateNDVI)
      .map(TimeBand)
      .select('NDVI');
  var nbr_images = S2.size().getInfo();
  //var nbr_images = S2.getInfo()['properties'];
  print (S2);
  print (nbr_images);
var col = S2.select('NDVI')
  .filterDate(date_start, date_end)
  .filterBounds(AOI)
  .map(function(image) {
    var date = ee.Date(image.get('system:time_start'));
    var yearOffset = date.difference(ee.Date(date_start), 'day');
    return ee.Image(1).addBands(yearOffset).float().addBands(image);
  });
var regression = col.select("constant_1","NDVI").reduce(ee.Reducer.sensSlope());
print(regression)
var NDVI_change = regression.clip(AOI).select('slope')
var NDVI_annual = NDVI_change.multiply(1)
  // Re-classification
var NDVI_annual_recl = NDVI_annual
      .where(NDVI_annual.gt(-0.001).and(NDVI_annual.lt(-0.0005)), 1)
      .where(NDVI_annual.gt(-0.0005).and(NDVI_annual.lt(-0.00001)), 2)
      .where(NDVI_annual.gt(-0.00001).and(NDVI_annual.lt(0.00001)), 3)
      .where(NDVI_annual.gt(0.00001).and(NDVI_annual.lt(0.0005)), 4)
      .where(NDVI_annual.gt(0.0005).and(NDVI_annual.lt(0.001)), 5);
print(NDVI_annual_recl)
  //Set the visualisation parameters.
  var BandCompViz = {
    min: 1,
    max: 5,
    palette: ['#b32a0b', '#e29810',"#19ff2b","#1db30b","blue"],
  };
  // Create a NDVI chart.
  var ndviChart = ui.Chart.image.series(S2, AOI, ee.Reducer.mean(), 15);
  ndviChart.setOptions({
    title: 'Giá trị TB NDVI',
    vAxis: {title: 'NDVI', maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  chartPanel.widgets().set(15, ndviChart);
 mapPanel.addLayer(NDVI_annual_recl.select("slope").clip(AOI),BandCompViz);
  }
});
mainPanel.add(submit);
  ///////////////// LEGEND //////////////////
var layerProperties = {   'Magnitude of change': {
    name: 'slope',
    visParams: {min: 1, max: 5, palette: ['#b32a0b', '#e29810',"#19ff2b","#1db30b","blue"]},
    legend: [
      {'High decrease': '#b32a0b'}, {'Decrease': '#e29810'}, {'No changes': '#19ff2b'},{'Increase': '#1db30b'},
    {'High increase': 'blue'},
    ],
    defaultVisibility: false
  }
};
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Biến động NDVI ', {fontSize: '30px', color: 'black',fontWeight: 'bold'});
var toolPanel = ui.Panel([header], 'flow', {width: '350px', border:BORDER_STYLE });
ui.root.widgets().add(toolPanel);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
  // Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '12px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Chú giải',
    {fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0', padding: '0',color: 'black'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
//var keyPanel = ui.Panel();
//legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
  // Create the panel for the chart.
// Define a panel for the legend and give it a tile.
var chartPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '50%',
      width: '350px',
      backgroundColor: colors.gray,
      position: 'bottom-right'
    }
  });
toolPanel.add(chartPanel);
var chartTitle = ui.Label(
    'NDVI',
    {fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0', padding: '0',color: 'black'});
legendPanel.add(chartTitle);
var keyPanel1 = ui.Panel();
chartPanel.add(keyPanel1);
/////////////SPLIT PANELS//////////////
////////////  CHART ///////////
///////// COLLECTION AGAIN ///////////
/*
  //Define dates
  var date_start = startDate.getValue();
  var date_end= endDate.getValue();
//Setup a function to caclulate the NDSI
  function CalculateNDVI(image) {
    var NDVI = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(NDVI);
        } 
  //Add a Time band.
  function TimeBand (image) {
  return image.addBands(image.metadata('system:time_start'));
}
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
  //Add Sentinel-2 Collection and filter using AOI, dates, cloud threshold.
  var S2 = ee.ImageCollection("COPERNICUS/S2_SR")
      .filterDate(date_start, date_end)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
      .sort('CLOUDY_PIXEL_PERCENTAGE')
      .sort('system:time_start')
      .filterBounds(AOI)
      .map(maskS2clouds) 
      .map(CalculateNDVI)
      .map(TimeBand)
      .select('NDVI');
print(S2, 'coll S2')
*/