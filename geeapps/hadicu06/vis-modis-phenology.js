// MCD12Q2.006 Land Cover Dynamics Yearly Global 500m
var palettes = require('users/gena/packages:palettes')
var imCol = ee.ImageCollection("MODIS/006/MCD12Q2")
// print(imCol)
var im2018 = imCol.filterDate("2018-01-01", "2018-12-31")
            .first()
// print(im2018.projection().crs())
var qa_1 = im2018.select('QA_Overall_1')
var qa_2 = im2018.select('QA_Overall_2')
// Map.addLayer(qa_1, {}, "qa_1")
// Map.addLayer(qa_2, {}, "qa_2")
// Map.addLayer(qa_1.randomVisualizer(), {}, "qa_1")   // mostly 0 i.e. best
// Map.addLayer(qa_2.randomVisualizer(), {}, "qa_2")   // mostly 0 i.e. best
var qa_1_best = qa_1.eq(0)
var qa_2_best = qa_2.eq(0)
var numCycles = im2018.select('NumCycles').updateMask(qa_1_best)
var cyclePalettes = ['#e69f00', "#56b4e9", "#009e73"]
Map.addLayer(numCycles, {min:1, max:3, palette:cyclePalettes}, "NumCycles (2018)")
// Peak_* Days since Jan 1, 1970 -> convert to days since Jan 1, 2018
var peak1 = im2018.select('Peak_1').subtract(ee.Image(17532)).updateMask(qa_1_best) 
var peak2 = im2018.select('Peak_2').subtract(ee.Image(17532)).updateMask(qa_2_best) 
Map.addLayer(peak1, {min:0, max:365, palette:palettes.colorbrewer.Spectral[11].reverse()}, "Peak_1 (2018)")
Map.addLayer(peak2, {min:0, max:365, palette:palettes.colorbrewer.Spectral[11].reverse()}, "Peak_2 (2018)")
Map.setOptions('TERRAIN')
Map.add(continuousLegendMap("Peak_1; Peak_2", palettes.colorbrewer.Spectral[11].reverse(), 0, 365, 'DOY', 10, 210))
//////////////////////////////////////////////////
var text = ui.Label("Data: MCD12Q2.006 Land Cover Dynamics Yearly Global 500m provided by NASA LP DAAC at the USGS EROS Center", {'position':'bottom-right'})
    .setUrl('https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MCD12Q2#description')
Map.add(text)
//////////////////////////////////////////////////
// Show values by clicking a point.
var inspector = ui.Panel([ui.Label('Click a pixel to show values')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
   // Get raster value at clicked point
  var rst_val = ee.Image.cat(numCycles, peak1, peak2).reduceRegion({
    reducer: ee.Reducer.mean(), 
    geometry: click_point, 
    scale: 500,
    crs: im2018.projection().crs()
  })
  // print('rst_val', rst_val)
  rst_val.evaluate(function(result) {
      inspector.widgets().set(0, ui.Label({
        value: 'NumCycles: ' + result['NumCycles'] + ' ; ' + 
         'Peak_1: ' + result['Peak_1'] + ' ; ' + 
         'Peak_2: ' + result['Peak_2'],
      }))
  });
});
//////////////////////////////////////////////////////////
// Discrete legends
// Make land cover legend
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px', fontSize: '14px'}      // 10px -> 12px
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});  // 420
legendMaps.style().set({position: 'bottom-left'});
legendMaps.add(ui.Label('NumCycles (limited to 3)', {fontWeight: 'bold', fontSize: '16px'}));
legendMaps.add(makeRow(cyclePalettes[0], '1 cycle'))
legendMaps.add(makeRow(cyclePalettes[1], '2 cycles'))
legendMaps.add(makeRow(cyclePalettes[2], '3 cycles'))
Map.add(legendMaps)
/////////////////////////////////////////////////////////////////////////
// Function to create continuous legend (source: https://code.earthengine.google.com/?accept_repo=users/tl2581/FIRECAM)
function continuousLegendMap(title, colPal, minVal,
  maxVal, units, stretchFactor, maxValPos) {
  var continuousLegendPanel = ui.Panel({
    style: {
      padding: '0px 0px 5px 8px',
      position: 'bottom-left'
    }
  });
  var legendTitle = ui.Label(title, {fontWeight: 'bold', fontSize: '16px', margin: '0 0 6px 8px'});
  continuousLegendPanel.add(legendTitle);
  continuousLegendPanel.add(ui.Label(units,{margin: '-6px 0 6px 8px'}));
  var makeRow = function(colPal) {
    var colorBox = ui.Label('', {
        backgroundColor: colPal,
        padding: '8px' + ' ' + stretchFactor + 'px',
        margin: '0 0 4px 0px',
    });
    return ui.Panel({widgets: [colorBox], layout: ui.Panel.Layout.Flow('vertical')});
  };
  var colPalWidget = []; var labelWidget = [];
  for (var i = 0; i < colPal.length; i++) {
    colPalWidget[i] = makeRow(colPal[i]);
  }
  continuousLegendPanel.add(ui.Panel({widgets: colPalWidget, layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin: '0 0 6px 8px'}}));
  continuousLegendPanel.add(ui.Label(minVal,{margin: '-6px 0px 0px 8px'}));
  continuousLegendPanel.add(ui.Label(maxVal,{margin: '-17px 5px 0px ' + maxValPos + 'px', textAlign: 'right'}));
  return continuousLegendPanel;
};
Map.setCenter(114.14110871389344, -0.3950360047726164, 6)