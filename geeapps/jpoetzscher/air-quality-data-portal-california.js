// #############################################################################
// ### 0 NOTES ###
// #############################################################################
// #############################################################################
// ### 1 VARIABLES & PARAMETERS ###
// #############################################################################
// ### USER-DEFINED ###
var aoi = "06"; 
// aoi
if (aoi > 50) {
  var aoi = ee.FeatureCollection("TIGER/2018/States");
  var states = aoi;
  var defaultZoom = 3;
  var imageOpacity = 0.5;
} else {
  var aoi = ee.FeatureCollection("TIGER/2018/Counties")
  .filterMetadata("STATEFP", "equals", aoi); // Filtering to California
  var counties = aoi;
  var defaultZoom = 6;
  var imageOpacity = 0.5;
}
var defaultCenterPoint = [-119.52655155207282, 37.15243410485415];  // Lon, Lat
// misc
var titleText = 'Air Quality Data Portal';
var subText = 'By James Poetzscher';
var descriptionText = 'This Earth Engine app uses Sentinel-5P satellite data to display average air pollution levels, greenhouse gas levels and other atmospheric data in California over a selected time period. Toggle the select dataset drop down menu to choose between air pollutants, greenhouse gases and other data. Then use the time slider to set the date range of interest. This will then return a map of the average value for that dateset over the selected period of time. Click anywhere on the map to view the value of the data at a point.';
var disclaimerText = 'Disclaimer: Satellites measure column-integrated quantities, which are not necessarily indicative of pollutant concentrations at the surface. Nevertheless, satellite maps may be useful for exploring spatial patterns in air pollution, and identifying potential pollution hotspots.';
var image;
// ABOUT PANEL about_Panel_visible
// true to start visible
// false to start collapsed
var aboutPanel_visible = true;
// styling and display
var stateOpacity = 0.5;
var countryOpacity = 0.6;
var aoi_style = {color: '00000050', width: 1, fillColor: 'FF000000'};
var query_point_style = {color: 'red'};
// Define vis palettes:
var magma = ['000005','080616','110B2D','1E0848','300060','43006A','57096E','6B116F','81176D','981D69','B02363','C92D59','E03B50','ED504A','F66B4D','FA8657','FBA368','FBC17D','FCDF96', 'FCFFB2'];
var viridris = ['440154', '46085c', '471063', '481769', '481d6f', '482475', '472a7a', '46307e', '453781', '433d84', '414287', '3f4889', '3d4e8a', '3a538b', '38598c', '355e8d', '33638d', '31688e', '2e6d8e', '2c718e', '2a768e', '297b8e', '27808e', '25848e', '23898e', '218e8d', '20928c', '1f978b', '1e9c89', '1fa188', '21a585', '24aa83', '28ae80', '2eb37c', '35b779', '3dbc74', '46c06f', '50c46a', '5ac864', '65cb5e', '70cf57', '7cd250', '89d548', '95d840', 'a2da37', 'b0dd2f', 'bddf26', 'cae11f', 'd8e219', 'e5e419', 'f1e51d', 'fde725'];
var AI = ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'];
var CH4 = ['purple','blue', 'cyan', 'yellow', 'orange', 'red'];
var CLOUD = ['ffffff', 'fdfdfd', 'f7fbff', 'deebf7', 'c6dbef', '9ecae1', '6baed6', '4292c6', '2171b5', '08519c', '08306b'];
// var compare = ['blue', 'cyan', 'green', 'yellow', 'red'];
// ### GENERAL ###
// Define data options.
var dataInfo = {
  'Nitrogen dioxide (NO2)': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_NO2',
    Offline: 'COPERNICUS/S5P/OFFL/L3_NO2',
    colId: 'COPERNICUS/S5P/NRTI/L3_NO2',
    band: 'tropospheric_NO2_column_number_density',
    cloudBand: 'cloud_fraction',
    maskVal: 0.00007,
    scalar: 1e6,
    legendLabel: 'NO2 tropospheric vertical column density (μmol/m²)',
    unitsLabel: 'Tropospheric NO2 (μmol/m²)',
    visParams: {
      palette: magma,
      min: 0.0,
      max: 100.0,
    },
  },
  'Carbon monoxide (CO)': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_CO',
    Offline: 'COPERNICUS/S5P/OFFL/L3_CO',
    colId: 'COPERNICUS/S5P/NRTI/L3_CO',
    band: 'CO_column_number_density',
    cloudBand: '',
    maskVal: 0,
    scalar: 1e6,
    legendLabel: 'CO vertical column density (μmol/m²)',
    unitsLabel: 'CO (mol/m²)',
    visParams: {
      palette: viridris,
      min: 0.0,
      max: 50000,
    },
  },
  'Sulphur Dioxide (SO2)': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_SO2',
    Offline: 'COPERNICUS/S5P/OFFL/L3_SO2',
    colId: 'COPERNICUS/S5P/NRTI/L3_SO2',
    band: 'SO2_column_number_density',
    cloudBand: 'cloud_fraction',
    maskVal: 0,
    scalar: 1e6,
    legendLabel: 'SO2 vertical column density (μmol/m²)',
    unitsLabel: 'SO2 (μmol/m²)',
    visParams: {
      palette: magma,
      min: 0.0,
      max: 1000.0,
    },
  },
  'Methane': {
  'Near-real-time': 'COPERNICUS/S5P/OFFL/L3_CH4',
    Offline: 'COPERNICUS/S5P/OFFL/L3_CH4',
    colId: 'COPERNICUS/S5P/OFFL/L3_CH4',
    band: 'CH4_column_volume_mixing_ratio_dry_air',
    cloudBand: '',
    maskVal: 1750,
    scalar: 1,
    legendLabel: 'Methane column averaged dry air mixing ratio (ppbV)',
    unitsLabel: 'Methane (ppbV)',
    visParams: {
      palette: CH4,
      min: 1700.0,
      max: 1950.0,
    },
  },
    'Formaldehyde (HCHO)': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_HCHO',
    Offline: 'COPERNICUS/S5P/OFFL/L3_HCHO',
    colId: 'COPERNICUS/S5P/NRTI/L3_HCHO',
    band: 'tropospheric_HCHO_column_number_density',
    cloudBand: '',
    maskVal: 0,
    scalar: 1e6,
    legendLabel: 'HCHO tropospheric column density (μmol/m²)',
    unitsLabel: 'Tropospheric HCHO (μmol/m²)',
    visParams: {
      palette: AI,
      min: 0,
      max: 300,
    },
  },
    'Ozone (O3)': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_O3',
    Offline: 'COPERNICUS/S5P/OFFL/L3_O3',
    colId: 'COPERNICUS/S5P/NRTI/L3_O3',
    band: 'O3_column_number_density',
    cloudBand: '',
    maskVal: 0,
    scalar: 1e6,
    legendLabel: 'O3 column density (μmol/m²)',
    unitsLabel: 'O3 (μmol/m²)',
    visParams: {
      palette: AI,
      min: 120000,
      max: 180000,
    },
  },
    'Cloud': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_CLOUD',
    Offline: 'COPERNICUS/S5P/OFFL/L3_CLOUD',
    colId: 'COPERNICUS/S5P/NRTI/L3_CLOUD',
    band: 'cloud_fraction',
    cloudBand: '',
    maskVal: 0,
    scalar: 1,
    legendLabel: 'Retrieved effective radiometric cloud fraction',
    unitsLabel: 'Cloud fraction',
    visParams: {
      palette: AI,
      min: 0,
      max: 1.0,
    },
  },
  'Aerosol Index': {
    'Near-real-time': 'COPERNICUS/S5P/NRTI/L3_AER_AI',
    Offline: 'COPERNICUS/S5P/OFFL/L3_AER_AI',
    colId: 'COPERNICUS/S5P/NRTI/L3_AER_AI',
    band: 'absorbing_aerosol_index',
    cloudBand: '',
    maskVal: 0,
    scalar: 1,
    legendLabel: 'Absorbing aerosol index',
    unitsLabel: 'Absorbing aerosol index',
    visParams: {
      palette: AI,
      min: -2.0,
      max: 1.0,
    },
  }
};
// var comparisonInfo = 
//   {
//     band: 'meanValue',
//     unitsLabel: '',
//     visParams: {
//       palette: compare,
//     }
// };
// system
var aoiLayerIndex = 0;
var imageLayerIndex = 1;
var scale = 50000; // higher numbers speed calculation, smaller numbers make it slower and may result in computation errors
var imageOpacity = countryOpacity;
var initialRefresh = true;
// dates
var defaultStartDate = '2020-08-16'; // will be reset in the code
var defaultEndDate = '2020-08-24'; // will be reset in the code
var dateInfo = {
  start: {selected: ''},
  end: {selected: ''}
};
var dataSelector = ui.Select({
  items: Object.keys(dataInfo),
  style: {width: '45%'}
});
var colSelector = ui.Select({
  items: ['Near-real-time', 'Offline'],
  style: {width: '45%'}
});
// var modeCheckbox = ui.Checkbox('Comparison Mode', false);
// var countryMeanLabel = ui.Label('', {whiteSpace: 'pre'});
// var downloadButton = ui.Button({label: 'Export', style: {width: '95%'}}).setDisabled(true);
// var downloadUrlLabel = ui.Label({value: 'Download', style: {shown: false}});
// var meanMultiplierSlider = ui.Slider({min: 0.2, max: 10, step: 0.2, style: {width: '60%'}});
// Get data information - used globally in functions.
var datasetUrl = ui.url.get('dataset', 'Nitrogen dioxide (NO2)');
ui.url.set('dataset', datasetUrl); // need to set in case this is the initial load.
var thisData = dataInfo[datasetUrl];
dataSelector.set({placeholder: datasetUrl, value: datasetUrl});
// Set the datatype.
var dataTypeUrl = ui.url.get('datatype', 'Near-real-time');
ui.url.set('datatype', dataTypeUrl);
thisData.colId = thisData[dataTypeUrl];
colSelector.set({placeholder: dataTypeUrl, value: dataTypeUrl});
// // Get initial map bounds from the url parameter.
// var initPoint = ee.Geometry.Point(defaultCenterPoint).toGeoJSONString();
// var center = ui.url.get('center', initPoint);
// ui.url.set('center', center);
// var zoom = ui.url.get('zoom', defaultZoom);
// ui.url.set('zoom', zoom);
// var startSliderDateUrl = ui.url.get('startdate', defaultStartDate);
// ui.url.set('startdate', startSliderDateUrl);
// var endSliderDateUrl = ui.url.get('enddate', defaultEndDate);
// ui.url.set('enddate', endSliderDateUrl);
// dateInfo.start.selected = startSliderDateUrl;
// dateInfo.end.selected = endSliderDateUrl;
thisData.visParams.min = ui.url.get('min', 0);
thisData.visParams.max = ui.url.get('max', 100);
// var meanMultiplier = ui.url.get('meanMultiplier', 2); // country average multiplier for diff. color stretch
// ui.url.set('meanMultiplier', meanMultiplier); // need to set in case this is the initial load.
// meanMultiplierSlider.setValue(meanMultiplier, false);
var currentImage; // global variable to store current image
// var compareImage;
// var comparisonMode = false;
// #############################################################################
// ### 2 FUNCTIONS ###
// #############################################################################
// ## UI
// This needs to be run on load and each time a dataset changes.
function initalizeMap() {
  var dateRange = getMinMaxDate(); // min/max date for selected collection
  var collStartDate = ee.Date(dateRange.get('firstDate'));
  var collEndDate = ee.Date(dateRange.get('lastDate'));
  ee.Dictionary({
    collStartDate: collStartDate.format('YYYY-MM-dd'),
    collEndDate: collEndDate.format('YYYY-MM-dd'),
    periodStartDate: collEndDate.advance(-10, 'day').format('YYYY-MM-dd'),
    periodEndDate: collEndDate.advance(1, 'day').format('YYYY-MM-dd')
  }).evaluate(function(dates){
    // sliders
    var startDateSelector = ui.DateSlider({
      start: dates.collStartDate,
      end: dates.collEndDate,
      value: dates.periodStartDate,
      period: 1,
      style: {stretch: 'horizontal'},
      onChange: startDateHandler
    });
    startDatePanel.widgets().set(1, startDateSelector);
    var endDateSelector = ui.DateSlider({
      start: dates.collStartDate,
      end: dates.collEndDate,
      value: dates.periodEndDate,
      period: 1,
      style: {stretch: 'horizontal'},
      onChange: endDateHandler
    });
    endDatePanel.widgets().set(1, endDateSelector);  
    // dict and uri
    dateInfo.start.selected = dates.periodStartDate;
    dateInfo.end.selected = dates.periodEndDate;
    ui.url.set('startdate', dates.periodStartDate); // update date in url
    ui.url.set('enddate', dates.periodEndDate); // update date in url
  refreshMap();
  });
}
// ### MAP LEGEND SETUP ###
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {bbox: [0, 0, 1, 0.1], dimensions: '100x10', format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
function makeLegend(params) {
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(params.visParams.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
  });
  var minValLabel, maxValLabel, medValLabel;
  // if (comparisonMode) { // custom legend style for comparison mode
  //   minValLabel = '< ' + params.visParams.min;
  //   maxValLabel = '> ' + '+' + params.visParams.max;
  //   medValLabel = params.visParams.mean + (' (region mean)');
  // } else { // default legend style
    minValLabel = thisData.visParams.min;
    maxValLabel = params.visParams.max;
    medValLabel = (thisData.visParams.min + ((params.visParams.max -  params.visParams.min) / 2 ));
  // }
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(minValLabel, {margin: '4px 8px', fontSize: '12px'}), //
      ui.Label(medValLabel, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '12px'}),
      ui.Label(maxValLabel, {margin: '4px 8px', fontSize: '12px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: params.legendLabel,// + " mean",// + ' n-day mean',
    style: {fontWeight: 'bold', fontSize: '12px'}
  });
  var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
  controlPanel.widgets().set(legendIndex, legendPanel);
}
function clearValueAtPointInfo() {
  Map.layers().set(imageLayerIndex + 1, null);
  placeHolder.style().set('shown', true);
  placeHolder.setValue('Click a point to get value');
  latLabel.style().set({'shown': false});
  lonLabel.style().set({'shown': false});
  meanLabel.style().set({'shown': false});
  // diffLabel.style().set({'shown': false});
}
function createPanelBreaks() { // dynamically create panel breaks for info panel
  var panelBreaks = [];
  for (var i = 0; i <= 6; ++i) {
      panelBreaks[i] = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: 'bbb', margin: '8px 0px 8px 0px'});
  }
  return panelBreaks;
}
// # UI Handlers
function dataSelectorHandler(e) {
  // downloadUrlLabel.style().set({shown: false});
  // if (comparisonMode) { // turn comparison mode off when changing datasets
  //   modeCheckbox.setValue(false, false);
  //   comparisonMode = false;
  //   countryMeanLabel.setValue('');
  //   compareModePanel.style().set({shown: false});
  //   downloadUrlLabel.style().set({shown: false});
  // }
  var datasetFromClick = dataSelector.getValue();
  var dataTypeFromClick = colSelector.getValue();
  ui.url.set('dataset', datasetFromClick);
  ui.url.set('datatype', dataTypeFromClick);
  thisData = dataInfo[datasetFromClick];
  thisData.colId = thisData[dataTypeFromClick];
  ui.url.set('min', thisData.visParams.min);
  ui.url.set('max', thisData.visParams.max);
  // Update map data
  initalizeMap();
  // Update legend elements
  makeLegend(thisData);
  // Reset "Value at point"
  clearValueAtPointInfo();
}
function refreshMap () { // toDo: use a global image and only clip it to aoi
  var startDate = dateInfo.start.selected;
  var endDate = dateInfo.end.selected;
  currentImage = compositeImages(startDate, endDate);
  Map.layers().set(aoiLayerIndex, ui.Map.Layer(aoi.style(aoi_style)));
  // if (comparisonMode) {
  //   makeComparison();
  // } else {
  Map.layers().set(imageLayerIndex, ui.Map.Layer(currentImage, thisData.visParams, null, true, imageOpacity));
  // }
}
function updateDate(startOrEnd) {
  var panel, dateUrlTag, dateInfoDate;
  if (startOrEnd == 'start date') {
    panel = startDatePanel;
    dateUrlTag = 'startdate';
  } else if (startOrEnd == 'end date') {
    panel = endDatePanel;
    dateUrlTag = 'enddate';
  }
  var selectedDate = ee.Date(ee.List(panel.widgets().get(1).getValue()).get(0));
  selectedDate.format('YYYY-MM-dd').evaluate(function(date) {
    ui.url.set(dateUrlTag, date);
    if (startOrEnd == 'start date') {dateInfo.start.selected = date} 
    else {dateInfo.end.selected = date}
    var startDate = dateInfo.start.selected;
    var endDate = dateInfo.end.selected;
    currentImage = compositeImages(startDate, endDate);
    // if (comparisonMode) {
    //   makeComparison();
    // } else {
    Map.layers().set(imageLayerIndex, ui.Map.Layer(currentImage, thisData.visParams, null, true, imageOpacity));
    // }
  }); 
}
function startDateHandler() {
  updateDate('start date');
  // downloadUrlLabel.style().set({shown: false});
}
function endDateHandler() {
  updateDate('end date');
  // downloadUrlLabel.style().set({shown: false});
}
// function modeCheckboxHandler(checked) {
//   comparisonMode = !comparisonMode;
//   print('Comparison: ' + comparisonMode);
//   if (checked) {
//     compareModePanel.style().set({shown: true});
//     makeComparison();
//   } else {
//     // dataSelectorHandler();
//     refreshMap();
//     countryMeanLabel.setValue('');
//     compareModePanel.style().set({shown: false});
//     downloadUrlLabel.style().set({shown: false});
//   }
//   clearValueAtPointInfo();
// }
// function meanMultiplierHandler(value) {
//   meanMultiplier = value;
//   comparisonInfo.visParams.min = (-1 * meanMultiplier * comparisonInfo.visParams.mean).toFixed(1);
//   comparisonInfo.visParams.max =  (1 * meanMultiplier * comparisonInfo.visParams.mean).toFixed(1);
//   makeLegend(comparisonInfo);
//   Map.layers().set(imageLayerIndex, ui.Map.Layer(compareImage, comparisonInfo.visParams, null, true, imageOpacity));
// }
// function exportButtonHandler() {
//   downloadUrlLabel.style().set({fontWeight: 'bold', color: 'green', shown: true});
//   downloadUrlLabel.setValue('Preparing export...').setUrl('');
//   computeExports();
// }
Map.onClick(function(coords) {
  clearValueAtPointInfo();
  placeHolder.style().set('shown', true);
  placeHolder.setValue('Getting value...');
  var latitude = 'Latitude: ' + coords.lat.toFixed(4);
  var longitude = 'Longitude: ' + coords.lon.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(imageLayerIndex + 1, ui.Map.Layer(click_point, query_point_style));
  //We need the layer casted to image to be able to use reduceRegion on it
  var mapValue = currentImage.reduceRegion(ee.Reducer.mean(), click_point, 100)
    .get(thisData.band + "_mean")//.aside(print)
    //Asynchronous Event for the query
    .evaluate(function(val) {
      if (val === null) {val = 'no valid measurements'} else {val = val.toFixed(4)}
      var mapvalueText = thisData.unitsLabel + ": " + val;
      placeHolder.style().set('shown', false);
      latLabel.setValue(latitude).style().set({'shown': true});
      lonLabel.setValue(longitude).style().set({'shown': true});
      meanLabel.setValue(mapvalueText).style().set({'shown': true});
    });
    // if (comparisonMode) {
    //   var diffValue = compareImage.reduceRegion(ee.Reducer.mean(), click_point, 100)
    //   .get('difference')//.aside(print)
    //   //Asynchronous Event for the query
    //   .evaluate(function(val) {
    //     if (val === null) {val = 'no valid measurements'} else {val = val.toFixed(4)}
    //     var diffValueText = 'Difference from region mean: ' + val;
    //     diffLabel.setValue(diffValueText).style().set({'shown': true});
    //   });
    // }
});
// MAP CLICK END
// ## DATA
// get min and max dates for dataset.
function getMinMaxDate() {
  var col = ee.ImageCollection(thisData.colId);
    // .filterBounds(aoi);
  var dataDateRange = ee.Dictionary(col.reduceColumns(
    {reducer: ee.Reducer.minMax(), selectors: ['system:time_start']}));
  var firstDate = ee.Date(dataDateRange.get('min'));
  var lastDate = ee.Date(dataDateRange.get('max'));
  return ee.Dictionary({firstDate: firstDate, lastDate: lastDate});
}
function compositeImages(startDate, endDate) {
  var dateFilter = ee.Filter.date(startDate, endDate);
  var col = ee.ImageCollection(thisData.colId).filter(dateFilter);
  return col.select(thisData.band).reduce(ee.Reducer.mean())
                                  .multiply(thisData.scalar)
                                  .clip(aoi);
}
// function getRegionMean(img, bandName, aoi, scale) {
//   var regionMeanValue = img.reduceRegion({
//     reducer: ee.Reducer.mean(), 
//     geometry: aoi, 
//     scale: scale, 
//   }).get(bandName + '_mean');
//   return regionMeanValue;
// }
// function makeComparison() {
//   countryMeanLabel
//     .setValue('Computing...')
//     .style().set({fontWeight: 'bold', color: 'green'});
//   meanMultiplierSlider.setDisabled(true); // while (re)computing mean
//   var regionMean = getRegionMean(currentImage, thisData.band, aoi, scale);
//   regionMean.evaluate(function(val) {
//     var meanImage = ee.Image(currentImage).rename('difference');
//     compareImage = meanImage.subtract(ee.Image(val)).updateMask(currentImage.mask());
//     comparisonInfo.visParams.min = (-1 * meanMultiplier * val).toFixed(1);
//     comparisonInfo.visParams.max =  (1 * meanMultiplier * val).toFixed(1);
//     comparisonInfo.visParams.mean =  val.toFixed(1);
//     comparisonInfo.legendLabel = thisData.legendLabel + '\n relative to region mean';
//     makeLegend(comparisonInfo);
//     Map.layers().set(imageLayerIndex, ui.Map.Layer(compareImage, comparisonInfo.visParams, null, true, imageOpacity));
//     // countryMeanLabel
//     //   .setValue('Region mean: ' + val.toFixed(1))
//     //   .style().set({fontWeight: 'normal', color: 'black'});
//     // meanMultiplierSlider.setDisabled(false);
//   });
// }
// function aggregateStats(localMeanImage, differenceImage) {
//   var exportImage = localMeanImage.reproject('EPSG:4326', null, scale);//.clip(aoi);
//   var exportCompareImage = differenceImage.reproject('EPSG:4326', null, scale);//.clip(aoi);
//   // generate a new image containing lat/lon of the pixel and reproject it to NO2 projection
//   var coordsImage = ee.Image.pixelLonLat().reproject(exportImage.projection());//.clip(geom);
//   var joinedImage = coordsImage.addBands(exportImage).addBands(exportCompareImage);
//   var valuesList = joinedImage.reduceRegion({
//     reducer: ee.Reducer.toList(4),
//     scale: scale,
//     geometry: aoi,
//     maxPixels: 1e13,
//   }).values().get(0); 
//   valuesList = ee.List(valuesList); // Cast valuesList
//   var diffLabel = 'difference: ' + thisData.unitsLabel;
//   var meanLabel = 'mean: ' + thisData.unitsLabel;
//   var exportFeatures = ee.FeatureCollection(valuesList.map(function(el){
//     el = ee.List(el); // cast every element of the list
//     var geom =ee.Geometry.Point([ee.Number(el.get(0)), ee.Number(el.get(1))]);
//     var attributes = {};
//     attributes[diffLabel] = ee.Number(el.get(3));
//     attributes[meanLabel] = ee.Number(el.get(2));
//     attributes['latitude'] = ee.Number(el.get(1)).format('%.2f');
//     attributes['longitude'] = ee.Number(el.get(0)).format('%.2f');
//     return ee.Feature(geom, attributes);
//   }));
//   return exportFeatures;
// }
// function computeExports() {
//   var regionMeanValue = getRegionMean(currentImage, thisData.band, aoi, scale);
//   var regionMeanImage = ee.Image(ee.Number(regionMeanValue));
//   var differenceImage = currentImage.subtract(regionMeanImage);
//   var exportFeatures = ee.FeatureCollection(aggregateStats(currentImage, differenceImage))
//     .select(['.*'], null, false); // drop .geo column with geometry
//   // returns download URL of the image for the aoi.
//   exportFeatures.getDownloadURL({
//     format: 'csv', 
//     // selectors: , 
//     filename: [dataSelector.getValue(), colSelector.getValue(), ui.url.get('startdate'), '-' , ui.url.get('enddate')].join('_'),
//     callback: setDownloadUrl // pass url to setDownloadUrl when result is ready
//   });
// }
// function setDownloadUrl(url) {
//   downloadUrlLabel.setValue('Download');
//   downloadUrlLabel.setUrl(url);
// }
// #############################################################################
// ### 3 VISUALIZATION ###
// #############################################################################
// UI
// Create an introduction panel.
var introPanel = ui.Panel([
  ui.Label({
    value: titleText,
    style: {fontSize: '20px', fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal',}
  }),
  ui.Label({
    value: subText,
    style: {fontSize: '13px', fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal',}
  }),
   ui.Label({
    value: descriptionText,
    style: {fontSize: '13px', textAlign: 'center', stretch: 'horizontal'}
  }),
  ui.Label({
    value: disclaimerText,
    style: {fontSize: '13px', fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}
  }),
]);
var dataSelectPanel = ui.Panel({
  widgets: [
    ui.Label({value: 'Select dataset:'}),
    ui.Panel([dataSelector, colSelector], ui.Panel.Layout.flow('horizontal'), {stretch: 'horizontal'})
    ],
});
dataSelector.onChange(dataSelectorHandler);
colSelector.onChange(dataSelectorHandler);
// modeCheckbox.onChange(modeCheckboxHandler);
// meanMultiplierSlider.onChange(meanMultiplierHandler);
// downloadButton.onClick(exportButtonHandler);
var dateSliderLabelWidth = '50px';
var startDateLabel = ui.Label({value: 'START: ', style: {width: dateSliderLabelWidth, color: '000', fontWeight: 'bold', padding: '25px 0px 0px 0px'}});
var startSliderDate = ui.DateSlider({
  period: 1,
  style: {stretch: 'horizontal', shown: true}});
  startSliderDate.setDisabled(true);
var endDateLabel = ui.Label({value: 'END: ', style: {width: dateSliderLabelWidth, color: '000', fontWeight: 'bold', padding: '25px 0px 0px 0px'}});
var endSliderDate = ui.DateSlider({
  period: 1,
  style: {stretch: 'horizontal', shown: true}});
  endSliderDate.setDisabled(true); 
var startDatePanel = ui.Panel({
  widgets: [startDateLabel, startSliderDate],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'}
});
var endDatePanel = ui.Panel({
  widgets: [endDateLabel, endSliderDate],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'}
});
var datesPanel = ui.Panel({
  widgets: [
    ui.Label({value: 'Select dates:'}),
    ui.Panel({widgets: [startDatePanel, endDatePanel], style: {stretch: 'horizontal'}})
    ]
});
// var modeSelectPanel = ui.Panel({
//   widgets: [modeCheckbox, countryMeanLabel],//scaleSelector],
//   layout: ui.Panel.Layout.flow('horizontal'), style: {stretch: 'horizontal'}
// });
// var meanMultiplierPanel = ui.Panel({
//   widgets: [
//     ui.Label('Stretch,  X * mean: '),
//     meanMultiplierSlider,
//     ],
//   layout: ui.Panel.Layout.flow('horizontal'), style: {stretch: 'horizontal'}
// });
// var exportPanel = ui.Panel({
//   widgets: [downloadButton, downloadUrlLabel],
//   layout: ui.Panel.Layout.flow('vertical'), style: {stretch: 'horizontal'}
// });
// var compareModePanel = ui.Panel({
//   widgets: [
//     meanMultiplierPanel
//     ],
//   layout: ui.Panel.Layout.flow('vertical'), style: {stretch: 'horizontal', shown: false}
// });
//INSPECTOR PANEL START
var inspectorPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
var inspectorTitle = ui.Label({
  value: 'Value at Point',
  style: {margin: '4px 8px', fontWeight: 'bold', fontSize: '13px'}
});
inspectorPanel.add(inspectorTitle);
 var placeHolder = ui.Label({
    value: 'Click a point to get value',
    style: {margin: '4px 8px', fontSize: '13px'},
    });
inspectorPanel.add(placeHolder);
var latLabel = ui.Label({style: {fontSize: '13px', shown: false}});
var lonLabel = ui.Label({style: {fontSize: '13px', shown: false}});
var meanLabel = ui.Label({style: {fontSize: '13px', shown: false}});
var diffLabel = ui.Label({style: {fontSize: '13px', shown: false}});
var pointInfoPanel = ui.Panel({
  widgets: [latLabel, lonLabel, meanLabel, diffLabel],
});
inspectorPanel.add(pointInfoPanel);
//INSPECTOR PANEL END
var panelCloseButton = ui.Button({
  label: 'Close',
  onClick: function() {
    panelOpenButton.style().set('shown', true);
    controlPanel.style().set('shown', false);
  },
style: {width: '95%'},
});
var panelBreaks = createPanelBreaks();
var legendIndex = 6;
var controlPanel = ui.Panel({
  widgets: 
  [ 
    introPanel,
    panelBreaks[1],
    dataSelectPanel,
    // panelBreaks[2],
    // modeSelectPanel,
    // compareModePanel,
    panelBreaks[2],
    datesPanel,
    panelBreaks[3],
    ui.Panel(null, null), // legend placeholder
    inspectorPanel,
    // panelBreaks[5],
    // exportPanel,
    panelBreaks[4],
    panelCloseButton,
  ],
  style: {width: '23%', margin: '10px', 'shown': aboutPanel_visible}
});
var panelOpenButton = ui.Button({
  label: 'Open Control Panel',
  onClick: function() {
    panelOpenButton.style().set('shown', false);
    controlPanel.style().set('shown', true);
  },
  style: {position: 'bottom-left', 'shown': !aboutPanel_visible}
});
// #############################################################################
// ### 4 CUSTOM MAP STYLE ###
// #############################################################################
function darkMap() {
return [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "gamma": "0.00"
            },
            {
                "lightness": "74"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
];
}
function cobaltMap() {
return [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#29446b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
];
}
function greyMap() {
  return [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#737373"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3d3d3"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#737373"
            }
        ]
    }
];
}
// Map
// Set map properties
Map.setOptions({
  mapTypeId: 'Map',
  styles: {"Map": greyMap()}, 
  types: ['Map']
});
Map.setControlVisibility({all: false, mapTypeControl: true});
Map.style().set('cursor', 'crosshair');
Map.centerObject(aoi, defaultZoom);
// Set url params for map bounds.
Map.onChangeBounds(function(e) {
  ui.url.set('center', ee.Geometry.Point(e.lon, e.lat).toGeoJSONString());
  ui.url.set('zoom', e.zoom);
});
ui.root.insert(0, controlPanel);
Map.add(panelOpenButton);
// Update map data
initalizeMap();
// downloadButton.setDisabled(false); // mean image is ready, so enable export
// Update legend elements
makeLegend(thisData);
// add AOI
// Map.layers().set(aoiLayerIndex, ui.Map.Layer(aoi.style(aoi_style)));