var gaul = ui.import && ui.import("gaul", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    coastalDEM = ui.import && ui.import("coastalDEM", "imageCollection", {
      "id": "projects/ee-ramiqcom/assets/coastalDEM90m"
    }) || ee.ImageCollection("projects/ee-ramiqcom/assets/coastalDEM90m");
// Indonesia map
var indonesia = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
// Zoom to current location or Indonesia
function current_position(point) {
  Map.centerObject(point, 12);
}
function oops(error) {
  Map.centerObject(indonesia,5);
}
ui.util.getCurrentPosition(current_position, oops);
// Elevation data
var elevation = coastalDEM.mosaic();
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {width: '350px', padding: '15px'}
});
ui.root.insert(11, mainPanel);
// Minimize button
var minimizeButton = ui.Button({
  label: '>',
  style: {padding: '0px 100px 0px 0px'},
  onClick: function(){
    mainPanel.style().set({shown: false});
    Map.add(maximizeButton);
  }
});
mainPanel.add(minimizeButton);
// Maximize button
var maximizeButton = ui.Button({
  label: '<',
  style: {padding: '0px', position: 'top-right'},
  onClick: function(){
    mainPanel.style().set({shown: true});
    Map.remove(maximizeButton);
  }
});
// App title
var titleLabel = ui.Label({
  value: 'Coastal Analysis',
  style: {fontSize: '25px', backgroundColor: 'DodgerBlue', color: 'white', fontWeight: 'bold', padding: '10px 56px'},
});
mainPanel.add(titleLabel);
// Analysis select
var analysisSelect = ui.Select({
  items: ['Sea rise risk', 'Coastline changes', 'Future land'],
  placeholder: 'Select analysis',
  style: {width: '300px'},
  onChange: function(value){
    if (value !== null) {
      showSeaYearSlider();
      analysis();
      clearButton.setDisabled(false);
    } else {
      removeSeaYearSlider();
    }
  }
});
mainPanel.add(analysisSelect);
// Sea rise label
var seaRiseLabel = ui.Label({
  value: 'Sea rise/year (mm)',
  style: {shown: false}
  });
mainPanel.add(seaRiseLabel);
// Sea rise slider
var seaRiseSlider = ui.Slider({
  min: 0,
  max: 100,
  step: 1,
  style: {width: '300px', shown: false},
  onChange: function(){
    analysis();
  }
});
mainPanel.add(seaRiseSlider);
// Year label
var yearLabel = ui.Label({
  value: 'Year',
  style: {shown: false}
});
mainPanel.add(yearLabel);
// Year slider
var yearSlider = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  style: {width: '300px', shown: false},
  onChange: function(){
    analysis();
  }
});
mainPanel.add(yearSlider);
// Add sea rise and year slider
function showSeaYearSlider() {
  seaRiseLabel.style().set({shown: true});
  seaRiseSlider.style().set({shown: true});
  yearLabel.style().set({shown: true});
  yearSlider.style().set({shown: true});
}
// Remove sea rise and year slider
function hideSeaYearSlider() {
  seaRiseLabel.style().set({shown: false});
  seaRiseSlider.style().set({shown: false});
  yearLabel.style().set({shown: false});
  yearSlider.style().set({shown: false});
}
// Analysis function
function analysis(){
  var analysisStatus = analysisSelect.getValue();
  if (analysisStatus == 'Sea rise risk') {
    seaRiseRisk();
  } else if (analysisStatus == 'Coastline changes') {
    coastlineChanges();
  } else if (analysisStatus == 'Future land') {
    futureLand();
  }
  Map.style().set({margin: '0px'});
}
// Legend tools to make legend panel
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Sea rise function
function seaRiseRisk(){
  Map.clear();
  var dem = elevation;
  var title = analysisSelect.getValue();
  var rise = seaRiseSlider.getValue()/100;
  var year = yearSlider.getValue();
  var calculation = rise*year;
  var drownDem = dem.subtract(calculation);
  var drownArea = ee.Image(0).where(dem.gt(0).and(drownDem.lte(0)), 1).selfMask();
  var layerTitle = title + ' with ' + rise*100 + ' mm/year' + ' in ' + year + ' years'; 
  var label = ['Drown area'];
  var color = ['red'];
  var count = 1;
  var vis = {palette: color};
  Map.addLayer(drownArea, vis, layerTitle, true, 0.6);
  var legendPanel = legendTool.legendDiscrete(layerTitle, label, color, 1, 'bottom-left');
  Map.add(legendPanel);
}
// Coastline changes function
function coastlineChanges(){
  Map.clear();
  var dem = elevation;
  var title = analysisSelect.getValue();
  var rise = seaRiseSlider.getValue()/100;
  var year = yearSlider.getValue();
  var calculation = rise*year;
  var drownDem = dem.subtract(calculation);
  var coastline = ee.Image(0)
    .where(dem.gt(0).and(drownDem.lte(0)), 1)
    .where(drownDem.gt(0), 2);
  var layerTitle = title + ' with ' + rise*100 + ' mm/year' + ' sea rise' + ' in ' + year + ' years'; 
  var label = ['Sea', 'Drown area', 'Dry area'];
  var color = ['blue', 'red', 'yellow'];
  var count = 3;
  var vis = {palette: color, min: 0, max: 2};
  Map.addLayer(coastline, vis, layerTitle, true, 0.6);
  var legendPanel = legendTool.legendDiscrete(layerTitle, label, color, count, 'bottom-left');
  Map.add(legendPanel);
  Map.setOptions('SATELLITE');
}
// Future elevation function
function futureLand(){
  Map.clear();
  var dem = elevation;
  var title = analysisSelect.getValue();
  var rise = seaRiseSlider.getValue()/100;
  var year = yearSlider.getValue();
  var calculation = rise*year;
  var drownDem = dem.subtract(calculation);
  var layerTitle = title + ' with ' + rise*100 + ' mm/year' + ' sea rise' + ' in ' + year + ' years'; 
  var label = ['Sea', 'Land'];
  var color = ['blue', 'green'];
  var count = 2;
  var vis = {palette: color, min: 0, max: 0.00001};
  Map.addLayer(drownDem, vis, layerTitle, true, 0.6);
  var legendPanel = legendTool.legendDiscrete(layerTitle, label, color, count, 'bottom-left');
  Map.add(legendPanel);
  Map.setOptions('SATELLITE');
}
// Clear map button
var clearButton = ui.Button({
  label: 'Clear map',
  style: {width: '300px', padding: '0px'},
  disabled: true,
  onClick: function(){
    Map.clear();
  }
});
mainPanel.add(clearButton);
// Add source
var sourceLabel = ui.Label({
  value: 'Source: CoastalDEM by Kulp & Strauss 2019',
  targetUrl: 'https://www.nature.com/articles/s41467-019-12808-z' 
});
mainPanel.add(sourceLabel);