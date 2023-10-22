var pop = ui.import && ui.import("pop", "imageCollection", {
      "id": "JRC/GHSL/P2016/POP_GPW_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    gaul2 = ui.import && ui.import("gaul2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    gaul0View = ui.import && ui.import("gaul0View", "featureViewLayer", {
      "id": "FAO/GAUL/2015/level0_FeatureView",
      "name": "level0_FeatureView"
    }) || ui.Map.FeatureViewLayer("FAO/GAUL/2015/level0_FeatureView", null, "level0_FeatureView"),
    gaul1View = ui.import && ui.import("gaul1View", "featureViewLayer", {
      "id": "FAO/GAUL/2015/level1_FeatureView",
      "name": "level1_FeatureView"
    }) || ui.Map.FeatureViewLayer("FAO/GAUL/2015/level1_FeatureView", null, "level1_FeatureView"),
    gaul2View = ui.import && ui.import("gaul2View", "featureViewLayer", {
      "id": "FAO/GAUL/2015/level2_FeatureView",
      "name": "level2_FeatureView"
    }) || ui.Map.FeatureViewLayer("FAO/GAUL/2015/level2_FeatureView", null, "level2_FeatureView"),
    gaul0 = ui.import && ui.import("gaul0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1");
// Indonesia area as default
var indonesia = gaul0.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
// Zoom to current location or Indonesia
function current_position(point) {
  Map.centerObject(point, 10);
}
function oops(error) {
  Map.centerObject(indonesia,5);
}
ui.util.getCurrentPosition(current_position, oops);
// Function to control map view
function mapReset(){
  // Clear map
  Map.clear();
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true
  });
}
mapReset();
// Main panel
var appPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '350px', padding: '15px'}
});
ui.root.add(appPanel);
// Main label
var titleLabel = ui.Label({
  value: 'World Population Future Simulator',
  style: {fontSize: '25px', color: 'orange', fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal', margin: '15px'}
});
appPanel.add(titleLabel);
// Select area
var areaSelect = ui.Select({
  placeholder: 'Select area',
  items: ['World', 'Country', 'Province', 'City/regency'],
  value: 'World',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value == 'Country') {
      countryList();
      countrySelect.style().set({shown: true});
      provinceSelect.style().set({shown: false});
      citySelect.style().set({shown: false});
      showPredictionButton.setDisabled(true);
    } else if (value == 'Province') {
      countryList();
      countrySelect.style().set({shown: true});
      provinceSelect.style().set({shown: true});
      citySelect.style().set({shown: false});
      showPredictionButton.setDisabled(true);
    } else if (value == 'City/regency') {
      countryList();
      countrySelect.style().set({shown: true});
      provinceSelect.style().set({shown: true});
      citySelect.style().set({shown: true});
      showPredictionButton.setDisabled(true);
    } else if (value == 'World') {
      countrySelect.style().set({shown: false});
      provinceSelect.style().set({shown: false});
      citySelect.style().set({shown: false});
      showPredictionButton.setDisabled(false);
    } else if (value === null) {
      countrySelect.style().set({shown: false});
      provinceSelect.style().set({shown: false});
      citySelect.style().set({shown: false});
      showPredictionButton.setDisabled(true);
    }
    if (value == 'Country' && countrySelect.getValue() !== null) {
      showPredictionButton.setDisabled(false);
    } else if (value == 'Province' && provinceSelect.getValue() !== null) {
      showPredictionButton.setDisabled(false);
    } else if (value == 'City/regency' && citySelect.getValue() !== null) {
      showPredictionButton.setDisabled(false);
    }
  }
});
appPanel.add(areaSelect);
// Country list function
function countryList(){
  var admin = gaul2;
  var list = admin.aggregate_array('ADM0_NAME').distinct().sort().evaluate(function(value){
    countrySelect.items().reset(value);
  });
}
// Select country
var countrySelect = ui.Select({
  placeholder: 'Select country',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (value !== null) {
      provinceList();
      provinceSelect.setDisabled(false);
      citySelect.setDisabled(true);
    } else {
      provinceSelect.setDisabled(true);
      citySelect.setDisabled(true);
    }
    var areaStatus = areaSelect.getValue();
    if (areaStatus == 'Country' && value !== null) {
      showPredictionButton.setDisabled(false);
    } else {
      showPredictionButton.setDisabled(true);
    }
  }
});
appPanel.add(countrySelect);
// Province list function
function provinceList(){
  var admin = gaul2;
  var country = countrySelect.getValue();
  var province = admin.filter(ee.Filter.eq('ADM0_NAME', country));
  var list = province.aggregate_array('ADM1_NAME').distinct().sort().evaluate(function(value){
    provinceSelect.items().reset(value);
  });
}
// Select province
var provinceSelect = ui.Select({
  placeholder: 'Select province',
  style: {stretch: 'horizontal', shown: false},
  disabled: true,
  onChange: function(value){
    if (value !== null) {
      cityList();
      citySelect.setDisabled(false);
    } else {
      citySelect.setDisabled(true);
    }
    var areaStatus = areaSelect.getValue();
    if (areaStatus == 'Province' && value !== null) {
      showPredictionButton.setDisabled(false);
    } else {
      showPredictionButton.setDisabled(true);
    }
  }
});
appPanel.add(provinceSelect);
// City list function
function cityList(){
  var admin = gaul2;
  var province = provinceSelect.getValue();
  var city = admin.filter(ee.Filter.eq('ADM1_NAME', province));
  var list = city.aggregate_array('ADM2_NAME').distinct().sort().evaluate(function(value){
    citySelect.items().reset(value);
  });
}
// Select city/regency
var citySelect = ui.Select({
  placeholder: 'Select city/regency',
  style: {stretch: 'horizontal', shown: false},
  disabled: true,
  onChange: function(value){
    var areaStatus = areaSelect.getValue();
    if (areaStatus == 'City' && value !== null) {
      showPredictionButton.setDisabled(false);
    } else {
      showPredictionButton.setDisabled(true);
    }
  }
});
appPanel.add(citySelect);
// Year slider
var yearSlider = ui.Slider({
  min: 1975,
  max: 2100,
  value: 2050,
  step: 1,
  style: {stretch: 'horizontal'},
  onChange: function(){
  }
});
appPanel.add(yearSlider);
// Select prediction
var predictionSelect = ui.Select({
  items: ['Population count', 'Population changes'],
  placeholder: 'Select prediction',
  value: 'Population count',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value !== null) {
      showPredictionButton.setDisabled(false);
    } else {
      showPredictionButton.setDisabled(true);
    }
  }
});
appPanel.add(predictionSelect);
// Select visualization
var visualSelect = ui.Select({
  items: ['Dasymetric (raster)', 'Choropleth (vector)'],
  style: {stretch: 'horizontal'},
  value: 'Dasymetric (raster)',
  onChange: function(value){
  }
});
appPanel.add(visualSelect);
// Show prediction button
var showPredictionButton = ui.Button({
  label: 'Show prediction',
  style: {stretch: 'horizontal'},
  onClick: function(){
    runPredict();
  }
});
appPanel.add(showPredictionButton);
// Clear map button
var clearMapButton = ui.Button({
  label: 'Clear map',
  style: {stretch: 'horizontal'},
  onClick: function(){
    mapReset();
  }
});
appPanel.add(clearMapButton);
// Data source labek
var sourceLabel = ui.Label({
  value: 'Source: GHSL - Global Human Settlement Layers',
  targetUrl: 'https://publications.jrc.ec.europa.eu/repository/handle/JRC100523',
  style: {fontSize: '12px'}
});
appPanel.add(sourceLabel);
// Function to run prediction
function runPredict(){
  // Reset map condition
  mapReset();
  // Add pop info panel
  showPop();
  // Add population prediction map
  popPredict();
  // Add administrative boundary
  adminBorder();
}
// Legend tools to make legend panel
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Population prediciton function
function popPredict(){
  // Area limit for analysis
  var areaStatus = areaSelect.getValue();
  // Area limit if country
  var country = countrySelect.getValue();
  var countryFeature = gaul2.filter(ee.Filter.eq('ADM0_NAME', country));
  // Area limit if province
  var province = provinceSelect.getValue();
  var provinceFeature = gaul2.filter(ee.Filter.eq('ADM1_NAME', province));
  // Area limit if city
  var city = citySelect.getValue();
  var cityFeature = gaul2.filter(ee.Filter.eq('ADM2_NAME', city));
  // Zoom
  var zoom;
  // Algorthms to find the limit
  var area;
  var areaZoom;
  switch (areaStatus) {
    case 'Country':
      area = countryFeature;
      areaZoom = countryFeature;
      zoom = 6;
      break;
    case 'Province':
      area = provinceFeature;
      areaZoom = provinceFeature;
      zoom = 8;
      break;
    case 'City/regency':
      area = cityFeature;
      areaZoom = cityFeature;
      zoom = 11;
      break;
    case 'World':
      area = gaul0;
      areaZoom = ee.Geometry(Map.getBounds(true));
      zoom = Map.getZoom();
      break;
    case null:
      area = ee.Geometry(Map.getBounds(true));
      zoom = Map.getZoom();
  }
  // Zoom to area
  Map.centerObject(areaZoom, zoom);
  // GHSL population raster
  var imageCol = pop;
  // Pop raster clip with area limit
  var clipCol = ee.ImageCollection(ee.Algorithms.If({
    condition: areaStatus == 'World',
    trueCase: imageCol,
    falseCase: imageCol.map(function(img){
      return img.clip(area);
    })
  }));
  // Project clipped image to WGS 1984
  var projectedCol = clipCol.map(function(img){
    return img.reproject({
      crs:'EPSG:4326',
      scale: 250
    });
  });
  // Create a time band for each image
  var addTimeBand = projectedCol.map(function(obj){
    var timeBand = ee.Image(obj.metadata('system:time_start'));
    return obj.addBands(timeBand);
  });
  // Create a model
  var model = addTimeBand.select(['system:time_start', 'population_count']).reduce(ee.Reducer.linearFit());
  var scaleModel = model.select('scale');
  var offsetMode = model.select('offset');
  // Get value for year prediction
  var year = yearSlider.getValue();
  var yearMilis = ee.Date(year + '-01-01').millis();
  // Calculation for predicted population
  var col2015 = projectedCol.sort('system:time_start', false).first();
  var currentPop = col2015;
  var popCover = scaleModel.multiply(yearMilis).add(offsetMode).rename('population_count');
  // Calculation for pop changes
  var popChanges = popCover.subtract(col2015).rename('population_count');
   // Predicition type status
  var predictStatus = predictionSelect.getValue();
  // Algorithms to select which image to show
  var imageShow = ee.Image(ee.Algorithms.If({
    condition: predictStatus == 'Population count',
    trueCase: popCover.where(popCover.lt(0), 0),
    falseCase: popChanges
  }));
  // Visual choice
  var visualStatus = visualSelect.getValue();
  // Choropleth population
  var adminFeature;
  switch (areaStatus) {
    case 'Country':
      adminFeature = gaul1.filter(ee.Filter.eq('ADM0_NAME', country));
      break;
    case 'Province':
      adminFeature = gaul2.filter(ee.Filter.eq('ADM1_NAME', province));
      break;
    case 'City/regency':
      adminFeature = gaul2.filter(ee.Filter.eq('ADM2_NAME', city));
      break;
    case 'World':
      adminFeature = gaul0;
      break;
    case null:
      adminFeature = gaul2.filterBounds(ee.Geometry(Map.getBounds(true)));
  }
  // Choropleth population
  var adminPop = imageShow.reduceRegions({
    reducer: ee.Reducer.sum(),
    collection: adminFeature,
    scale: 250,
    crs: 'EPSG:4326'
  });
  // Visualization for feature collection
  var empty = ee.Image().byte();
  var fills = empty.paint({
    featureCollection: adminPop,
    color: 'sum',
  });
  // Algorithms to visualize in dasymetric or choropleth
  var visualShow;
  switch (visualStatus) {
    case 'Dasymetric (raster)':
      visualShow = imageShow;
      break;
    case 'Choropleth (vector)':
      visualShow = fills;
      break;
  }
  // Visual parameter min and max
  var minChanges = -200;
  var maxChanges = 200;
  var minCover = 0;
  var maxCover = 1000;
  // Algorithms to change min max for choropleth
  if (visualStatus == 'Choropleth (vector)' && areaStatus == 'Country') {
    minChanges = -5000000;
    maxChanges = 5000000;
    minCover = 0;
    maxCover = 20000000;
  } else if (visualStatus == 'Choropleth (vector)' && areaStatus == 'Province') {
    minChanges = -500000;
    maxChanges = 500000;
    minCover = 0;
    maxCover = 5000000;
  } else if (visualStatus == 'Choropleth (vector)' && areaStatus == 'City/regency') {
    minChanges = -50000;
    maxChanges = 50000;
    minCover = 0;
    maxCover = 1000000;
  }
  // Palette for visual
  var paletteChanges = ['red', 'maroon', 'black', 'green', 'lime'];
  var paletteCover = ['black', 'green', 'white'];
  // Palette algorithms
  if (visualStatus == 'Choropleth (vector)') {
    paletteChanges = ['red', 'white', 'green'];
    paletteCover = ['white', 'red'];
  }
  // Visual parameter for population changes
  var visChanges = {palette: paletteChanges, min: minChanges, max: maxChanges};
   // Visual parameter for population count
  var visCover = {palette: paletteCover, min: minCover, max: maxCover};
  // Value for visual
  var vis;
  switch (predictStatus) {
    case 'Population count':
      vis = visCover;
      break;
    case 'Population changes':
      vis = visChanges;
      break;
  }
  // Get value for title
  var admin;
  switch (areaStatus) {
    case 'World':
      admin = 'World';
      break;
    case 'Country':
      admin = country;
      break;
    case 'Province':
      admin = province;
      break;
    case 'City/regency':
      admin = city;
      break;
  }
  // Title for layer
  var title = admin + ' ' + predictStatus + ' in ' + year;
  // Add population cover to map
  Map.addLayer({
    eeObject: visualShow,
    visParams: vis,
    name: title});
  // Unit for choropleth or dasymetric
  var unit = ' per 250m^2';
  if (visualStatus == 'Choropleth (vector)') {
    unit = '';
  }
  // Add legend to map
  var legend = legendTool.legendGradient(title + unit, vis, 'bottom-left');
  Map.add(legend);
}
// Function to add admin border for view
function adminBorder(){
  // Country feature view
  var countryBorder = gaul0View;
  // Country name
  var countryName = countrySelect.getValue();
  // Province feature view
  var provinceBorder = gaul1View;
  // Province name
  var provinceName = provinceSelect.getValue();
  // City feature view
  var cityBorder = gaul2View;
  // City name
  var cityName = citySelect.getValue();
  // Line color
  var visualStatus = visualSelect.getValue();
  var lineColor = 'white';
  if (visualStatus == 'Choropleth (vector)') {
    lineColor = 'black';
  }
  // Visual parameter country
  var visParamCountry = {
    polygonStrokeWidth: 0.5,
    polygonStrokeColor: lineColor,
    polygonStrokeOpacity: 1,
    polygonFillOpacity: 0
  };
  // Visual parameter province
  var visParamProvince = {
    polygonStrokeWidth: 0.5,
    polygonStrokeColor: lineColor,
    polygonStrokeOpacity: 1,
    polygonFillOpacity: 0,
    rules: [{
      filter: ee.Filter.neq('ADM0_NAME', countryName),
      isVisible: false
    }]
  };
  // Visual parameter city
  var visParamCity = {
    polygonStrokeWidth: 0.5,
    polygonStrokeColor: lineColor,
    polygonStrokeOpacity: 1,
    polygonFillOpacity: 0,
    rules: [{
      filter: ee.Filter.neq('ADM1_NAME', provinceName),
      isVisible: false
    }]
  };
  // Area select choice
  var areaStatus = areaSelect.getValue();
  // Feature and visual parameter
  var feature;
  var vis;
  switch (areaStatus) {
    case 'World':
      feature = countryBorder;
      vis = visParamCountry;
      break;
    case 'Country':
      feature = provinceBorder;
      vis = visParamProvince;
      break;
    case 'Province':
    case 'City/regency':
      feature = cityBorder;
      vis = visParamCity;
      break;
  }
  // Set visual parameter of feature view
  var featureView = feature.setVisParams(vis);
  Map.add(featureView);
}
// Function to show population on panel
function showPop(){
  // Panel for the number
  var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', position: 'bottom-left'}
  });
  Map.add(infoPanel);
  // Title for panel
  var title;
  switch (predictionSelect.getValue()) {
    case 'Population count':
      title = 'population: ';
      break;
    case 'Population changes':
      title = 'population changes: ';
      break;
  }
  // Population pixel number
  var pxPopLabel = ui.Label({
    value: 'Pixel ' + title
  });
  infoPanel.add(pxPopLabel);
  // Population city number
  var cityPopLabel = ui.Label({
    value: 'City/regency ' + title
  });
  infoPanel.add(cityPopLabel);
  // Population province number
  var provincePopLabel = ui.Label({
    value: 'Province ' + title
  });
  infoPanel.add(provincePopLabel);
  // Population country number
  var countryPopLabel = ui.Label({
    value: 'Country ' + title
  });
  infoPanel.add(countryPopLabel);
  // Area choice
  var areaStatus = areaSelect.getValue();
  if (areaStatus == 'City/regency') {
    infoPanel.remove(provincePopLabel);
    infoPanel.remove(countryPopLabel);
  } else if (areaStatus == 'Province') {
    infoPanel.remove(countryPopLabel);
  }
  // Visual status
  var visualStatus = visualSelect.getValue();
  if (visualStatus == 'Choropleth (vector)' && areaStatus == 'City/regency') {
    infoPanel.remove(pxPopLabel);
    infoPanel.remove(provincePopLabel);
    infoPanel.remove(countryPopLabel);
  } else if (visualStatus == 'Choropleth (vector)' && areaStatus == 'Province') {
    infoPanel.remove(pxPopLabel);
    infoPanel.remove(provincePopLabel);
    infoPanel.remove(countryPopLabel);
  } else if (visualStatus == 'Choropleth (vector)' && areaStatus == 'Country') {
    infoPanel.remove(pxPopLabel);
    infoPanel.remove(cityPopLabel);
    infoPanel.remove(countryPopLabel);
  }
  // Info panel function for raster
  function rasterClick(value){
    // Lat lon to create a point for filter bounds
    var lat = value.lat;
    var lon = value.lon;
    var point = ee.Geometry.Point([lon, lat]);
    // Get the pop image for analysis
    var image = Map.layers().get(0).getEeObject();
    // Value for population
    var popValue = 'population_count';
    // Make pixel calculation
    var pixel = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: point,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(popValue);
    // Add pixel pop calculation to panel
    ee.Number(pixel).round().evaluate(function(value){
      var number = value;
      pxPopLabel.setValue('Pixel ' + title + number);
    });
    // Reducer for choropleth
    var reducerCity = ee.Reducer.sum();
    var reducerProvince = ee.Reducer.sum();
    var reducerCountry = ee.Reducer.sum();
    // City feature for aggregation calculation
    var cityFeature = gaul2.filterBounds(point);
    var cityName = cityFeature.first().get('ADM2_NAME');
    // City feature aggregation population calculation
    var cityPop = image.reduceRegion({
      reducer: reducerCity,
      geometry: cityFeature,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(popValue);
    // Add city population calculation to panel
    ee.Number(cityPop).round().evaluate(function(value){
      var name = cityName.getInfo();
      var number = value;
      cityPopLabel.setValue(name + ' (city/regency) ' + title + number);
    });
    // Province feature
    var provinceFeature = gaul1.filterBounds(point);
    var provinceName = provinceFeature.first().get('ADM1_NAME');
    // Province pop calculation
    var provincePop = image.reduceRegion({
      reducer: reducerProvince,
      geometry: provinceFeature,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(popValue);
    // Add province pop to panel
    ee.Number(provincePop).round().evaluate(function(value){
      var name = provinceName.getInfo();
      var number = value;
      provincePopLabel.setValue(name + ' (province) ' + title + number);
    });
    // Country feature for calculation
    var countryFeature = gaul0.filterBounds(point);
    var countryName = countryFeature.first().get('ADM0_NAME');
    // Country population calculation
    var countryPop = image.reduceRegion({
      reducer: reducerCountry,
      geometry: countryFeature,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(popValue);
    // Add country population to panel
    ee.Number(countryPop).round().evaluate(function(value){
      var name = countryName.getInfo();
      var number = value;
      countryPopLabel.setValue(name + ' (country) ' + title + number);
    });
  }
  // Info panel function for choropleth 
  function vectorClick(value){
    // Lat lon to create a point for filter bounds
    var lat = value.lat;
    var lon = value.lon;
    var point = ee.Geometry.Point([lon, lat]);
    // Get the pop image for analysis
    var image = Map.layers().get(0).getEeObject();
    // Value for population
    var popValue = 'constant';
    // Make pixel calculation
    var pixel = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: point,
      scale: 250,
      bestEffort: true,
      maxPixels: 10000000000
    }).get(popValue);
    // Admin name
    var name;
    var adminName;
    var adminFeature;
    var labelWidget;
    if (areaStatus == 'City/regency' || areaStatus == 'Province') {
      adminFeature = gaul2.filterBounds(point);
      adminName = ' (city/regency) ';
      name = adminFeature.first().get('ADM2_NAME');
      labelWidget = cityPopLabel;
    } else if (areaStatus == 'Country') {
      adminFeature = gaul1.filterBounds(point);
      adminName = ' (province) ';
      name = adminFeature.first().get('ADM1_NAME');
      labelWidget = provincePopLabel;
    } else if (areaStatus == 'World') {
      adminFeature = gaul0.filterBounds(point);
      adminName = ' (country) ';
      name = adminFeature.first().get('ADM0_NAME');
      labelWidget = countryPopLabel;
    }
    // Add pixel pop calculation to panel
    ee.Number(pixel).round().evaluate(function(value){
      var number = value;
      var nameLabel = name.getInfo();
      var adminNameLabel = adminName;
      labelWidget.setValue(nameLabel + adminNameLabel + title + number);
    });
  }
  // Function algorithms for click
  var clickFunction = rasterClick;
  if (visualStatus == 'Choropleth (vector)') {
    clickFunction = vectorClick;
  }
   // Click function to show the population
  Map.onClick(clickFunction);
}