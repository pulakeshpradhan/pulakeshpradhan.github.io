// app example
// https://code.earthengine.google.com/fe714b3101c709f1d5ec82c3427778cc
// to add legend bar and download png
//https://code.earthengine.google.com/97bbb4be949f9b7332fb0a8ef691ab11
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// library for visualization
// load palettes and style modules
var palettes = require('users/gena/packages:palettes');
var style = require('users/gena/packages:style');
var text = require('users/gena/packages:text');
// Data import
// Vector
// insurnace zones
var izone = ee.FeatureCollection("users/anighosh/TZA_ag/vector/insurancezones");
//var izone = ee.FeatureCollection("users/anighosh/TZA_ag/vector/Satellite-Ground-Truthing-Plots");
Map.centerObject(izone, 8);
// Name of the individual zones
var izs = ee.List(izone.aggregate_array("Name")).getInfo();
// Set pixel size and padding
var fsize = '15px';
var psize = '10px';
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Prepare satellite data
//--------------------------------------------------------------------------------------
// MOD09GQ.006 Terra Surface Reflectance 8-Day Global 250m
var terra = ee.ImageCollection("MODIS/006/MOD09Q1"); 
// MYD09GQ.006 Aqua Surface Reflectance 8-Day Global 250m
var aqua = ee.ImageCollection("MODIS/006/MYD09Q1");
// make an array of the image collections
var collections = [terra, aqua];
// Image and ImageStatistics Choices
var collectionChoices = ['Terra Surface Reflectance 8-Day Global 250m',
                   'Aqua Surface Reflectance 8-Day Global 250m'];
var imageStatisticsChoices = ['median', 'mean', 'min', 'max'];                       
var exportChoices = ['composite (1 band)','timeseries (n bands)'];
var exportChoicesTS = ['median', 'mean', 'min', 'max', 'all'];
//---------------------------------------------------------------------------------------------
// Helper functions
// Cloud Masking
/**
 * Extract bitpacked flags
 * image - the band to extract the bits from.
 * start - the lowest bit to extract
 * end - the highest bit to extract
 * newName - a name for the output band.
 * 
 * example:   var cirrus = getQABits(mod09ga.select('state_1km'), 8, 9, 'cirrus')
 */
var getQABits = function(image, start, end, newName) {
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += 1 << i;
    }
    // Return a single band image of the extracted QA bits, giving the band a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};
var cloudMasking = function(image){
  // https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD09Q1
  // [bit 0-1]  cloud 0:clear 1:cloudy 2:mixed 3:not set, assumed clear
  // [bit 2]   Cloud shadow 0: no 1: yes
  var cloudQA = getQABits(image.select('State'),0,1,'cloud');
  var cloudShadowQA = getQABits(image.select('State'),2,2,'cloud_shadow');
  return image.mask(image.mask((cloudShadowQA.eq(0)).and(cloudQA.eq(0).or(cloudQA.eq(3)))));
};
// add NDVI to the collection
var addNDVI = function(image) {
       var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI');
       return image.addBands(ndvi); 
};
// cloud mask, filterDate, filterBound, composite method, clip
function processImage(izname, izone, imageCol, sDate, eDate, stat, zoom){
    // Find insurance zone
    var poly = izone.filter(ee.Filter.eq('Name', izname));
    //print(poly);
    // filter imageCollection
    var filteredCollection = imageCol 
                                  .filterDate(sDate, eDate)
                                  .map(cloudMasking)
                                  .map(addNDVI);
                                  // todo: cloud masking;
    var reducersCol = ee.Reducer.median()
                      .combine(ee.Reducer.mean(), null, true)
                      .combine(ee.Reducer.minMax(), null, true);
    var composite = filteredCollection.select('NDVI').reduce({
        reducer: reducersCol
    });
    //print(composite);
    var compositeband = ee.Image(composite.select('NDVI_'+ stat));
    //print(compositeband);
    compositeband = compositeband.clip(poly.geometry());
    //print(compositeband);
    // plot compositeband
    // visualization, will not impact the final result
    var ndvi = compositeband.rename('ndvi');
    // get 2nd stdev around ndvi mean for stretching
    var mean = ee.Number(ndvi.reduceRegion({reducer:ee.Reducer.mean(), scale:500, bestEffort:true, maxPixels:1e8}).get('ndvi'));
    var stdDev = ee.Number(ndvi.reduceRegion({reducer:ee.Reducer.stdDev(), scale:500, bestEffort:true, maxPixels:1e8}).get('ndvi')).multiply(2);
    var max = mean.add(stdDev);
    var min = mean.subtract(stdDev);
    // make ndvi visualization
    var palette = palettes.matplotlib.viridis[7];
    var vis = compositeband.visualize({min:min, max:max, palette:palette, forceRgbOutput:true});
    // TODO:
    // i) add a Map title
    // ii) mosaic the ndvi visualization and the gradient bar
    // Configure our map with a minimal set of controls.
    //Map.setOptions({mapTypeId:"hybrid"});
    // show the mosaic on the map
    Map.centerObject(poly, zoom);
    Map.addLayer(ee.Image().paint(poly, 0, 4), null, izname);
    Map.addLayer(vis, {}, 'NDVI_'+ stat +'-'+ izname);
}
//---------------------------------------------------------------------------------------------
// Front end design
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel();
panel.style().set('width', '20%');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Time Series Satellite Image Explorer',
    style: {fontSize: '30px', fontWeight: 'bold', textAlign: 'center',stretch: 'horizontal'}
  })
]);
var text = ui.Label(
    'Please change the following input options to generate maps and plots for desired insurance zone and the daterange',
    {fontSize: '15px'});
// add items to panel
panel = panel.add(intro).add(text);
// function to make labels
/*
var labelMaking = function(textvalue, fontSize = '12px', textAlign = 'center', stretch = 'horizontal'){
  ui.Label(
    {
      value: textvalue,
      style: {fontSize: fontSize, textAlign: textAlign, stretch: stretch , padding:'10px'}
    }
 );
};
*/
//---------------------------------------------------------------------------------------------
// Add insurance zone choices
var selectZone = ui.Select({
  items: izs,
  value: izs[0],
  style: {textAlign:'center',stretch:'horizontal'},
  onChange: redraw
});
var lblselectZone = ui.Label(
  {
    value:'Select Insurance Zone',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
// add zones
panel = panel.add(lblselectZone).add(selectZone);
//---------------------------------------------------------------------------------------------
// Add dates
var startDate = ui.Textbox({
  value: '2018-01-01',
  style: {textAlign:'center',stretch:'horizontal'},
  onChange: redraw
});
var lblstartDate = ui.Label(
  {
    value:'Start Date (yyyy-mm-dd)',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
// add start date
panel = panel.add(lblstartDate).add(startDate);
//---------------------------------------------------------------------------------------------
var endDate = ui.Textbox({
  value: '2018-07-31',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  onChange: redraw
});
var lblendDate = ui.Label(
  {
    value:'End Date (yyyy-mm-dd)',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
// add end date
panel = panel.add(lblendDate).add(endDate);
//---------------------------------------------------------------------------------------------
// Add imageCollection choices
var selectImageCollection = ui.Select({
  items: collectionChoices,
  value: 'Terra Surface Reflectance 8-Day Global 250m',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  onChange: redraw
});
var lblselectImageCollection = ui.Label(
  {
    value:'Image Collection for analysis',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
panel = panel.add(lblselectImageCollection).add(selectImageCollection);
//---------------------------------------------------------------------------------------------
// Add composite statistics choices
var selectCompositeStatistics = ui.Select({
  items: imageStatisticsChoices,
  value: 'median',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  onChange: redraw
});
var lblselectCompositeStatistics = ui.Label(
  {
    value:'Statistics for Reducing Time Series',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
panel = panel.add(lblselectCompositeStatistics).add(selectCompositeStatistics);
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  Map.layers().reset();
  // get the name of the insurance zone
  var izname = selectZone.getValue();
  // dates
  var sDate = startDate.getValue();
  var eDate = endDate.getValue(); 
  var ic = selectImageCollection.getValue();
  var stat = selectCompositeStatistics.getValue();
  var exportOp = selectImageExportOption.getValue();
  var imageCol = collections[collectionChoices.indexOf(ic)];
  //print(imageCol.first());
  processImage(izname, izone, imageCol, sDate, eDate, stat, 12);
  generateChart(izname, izone, imageCol, sDate, eDate);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Add another panel for the plot
var outputPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var charting = ui.Panel([
  ui.Label({
    value: 'NDVI Time Series Plot',
    style: {fontSize: fsize, fontWeight: 'bold'}
  }),
  ui.Label('Select any insurance zone to plot the time series')
]);
outputPanel.add(charting);
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (izname, izone, imageCol, sDate, eDate) {
    // Find insurance zone
    var poly = izone.filter(ee.Filter.eq('Name', izname));
    // filter imageCollection
    var filteredCollection = imageCol 
                                  .filterDate(sDate, eDate)
                                  .map(cloudMasking)
                                  .map(addNDVI)
                                  .select('NDVI');
   // Make a chart from the time series.
   var tsChart = ui.Chart.image.series(filteredCollection, poly, ee.Reducer.mean(), 500);
  // Customize the chart.
  tsChart.setOptions({
    title: 'Mean NDVI time series for ' + izname,
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'darkgreen',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 4,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  //outputPanel.widgets().set(2, tsChart);
  charting.widgets().reset([tsChart]);
};
//---------------------------------------------------------------------------------------------
// Add image export choices
var selectImageExportOption = ui.Select({
  items: exportChoices,
  value: 'composite (1 band)',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  onChange: redraw,
  disabled: true
});
var lblselectImageExportOption = ui.Label(
  {
    value:'Export Image  (coming soon)',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
outputPanel = outputPanel.add(lblselectImageExportOption).add(selectImageExportOption);
//---------------------------------------------------------------------------------------------
// Add image export choices
var selectTimeSeriesExportOption = ui.Select({
  items: exportChoicesTS,
  value: 'mean',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  onChange: redraw,
  disabled: true
});
var lblselectTimeSeriesExportOption = ui.Label(
  {
    value:'Export time series for all zones (coming soon)',
    style: {fontSize: fsize, textAlign: 'center', stretch: 'horizontal', padding:psize}
  }
);
outputPanel = outputPanel.add(lblselectTimeSeriesExportOption).add(selectTimeSeriesExportOption);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Map.add(ui.Label(
    'MODIS NDVI', {fontWeight: 'bold', fontSize: '24px', position: 'bottom-center'}));
Map.add(ui.Label(
    'Place legend here', {fontWeight: 'bold', fontSize: '12px', position: 'bottom-right'}));
// Will this initialize the app?
redraw();
// Add the panels to the ui.root.
ui.root.insert(0, panel);
ui.root.insert(4, outputPanel);