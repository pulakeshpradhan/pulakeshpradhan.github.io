var gdpRegression = ui.import && ui.import("gdpRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/GDP_PPP_Regression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/GDP_PPP_Regression"),
    hdiRegression = ui.import && ui.import("hdiRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/HDI_Regression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/HDI_Regression"),
    builtRegression = ui.import && ui.import("builtRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/built_Regression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/built_Regression"),
    cropRegression = ui.import && ui.import("cropRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/crop_Regression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/crop_Regression"),
    elevation = ui.import && ui.import("elevation", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaElevation250m"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/javaElevation250m"),
    hazardRegression = ui.import && ui.import("hazardRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaFloodHazardRegression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/javaFloodHazardRegression"),
    rainRegression = ui.import && ui.import("rainRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaRainRegression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/javaRainRegression"),
    tpi = ui.import && ui.import("tpi", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaTPI250"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/javaTPI250"),
    popRegression = ui.import && ui.import("popRegression", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/popRegression"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/popRegression"),
    mask = ui.import && ui.import("mask", "image", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaMask"
    }) || ee.Image("projects/ee-ramiqcom-skripsi/assets/javaMask"),
    java = ui.import && ui.import("java", "table", {
      "id": "projects/ee-ramiqcom-skripsi/assets/javaFeature"
    }) || ee.FeatureCollection("projects/ee-ramiqcom-skripsi/assets/javaFeature"),
    gaul2 = ui.import && ui.import("gaul2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1");
Map.setControlVisibility({
  drawingToolsControl: false
});
// ROI for center bounds
var roi = java.geometry().bounds();
Map.centerObject(roi, 7);
// Application UI
var panel = ui.Panel([], ui.Panel.Layout.flow('vertical'), { position: 'top-right', padding: '1%', width: '400px' });
ui.root.add(panel);
// Title
var titleLabel = ui.Label('Dynamic Flood Risk Model for Java Island', { color: 'dodgerblue', fontSize: '30px', fontWeight: 'bold', stretch: 'horizontal' });
panel.add(titleLabel);
// Select analysis to model
var analysisLabel = ui.Label('Select analysis', { stretch: 'horizontal' });
panel.add(analysisLabel);
// Analysis select
var analysisSelect = ui.Select(
  ['Flood hazard', 'Flood exposure', 'Flood vulnerability', 'Flood risk'],
  'Select analysis',
  'Flood risk',
  null,
  false,
  { stretch: 'horizontal' }
);
panel.add(analysisSelect);
// Select year to model
var dateLabel = ui.Label('Select year to model', { stretch: 'horizontal' });
panel.add(dateLabel);
// Year for prediction
var dateRange = ui.DateSlider(
  '2023-01-01', '2100-01-01', '2030-01-01', 365,
  null,
  false, 
  { stretch: 'horizontal' });
panel.add(dateRange);
// Select visualization
var visualLabel = ui.Label('Select visualization', { stretch: 'horizontal' });
panel.add(visualLabel);
// Analysis select
var visualSelect = ui.Select(
  ['Dasymetric', 'Province', 'City/regency'],
  'Select analysis',
  'Dasymetric',
  null,
  false,
  { stretch: 'horizontal' }
);
panel.add(visualSelect);
// Push the button to execute
var buttonLabel = ui.Label('Push the button to execute', { stretch: 'horizontal' });
panel.add(buttonLabel);
// Button to model
var modelButton = ui.Button('Show the model', model, false, { stretch: 'horizontal'} );
panel.add(modelButton);
// Add empty legend panel
var legendPanelMap = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      position: 'bottom-left',
      stretch: 'horizontal',
      maxWidth: '100px',
    }
  });
Map.widgets().set(0, legendPanelMap);
// Function for modelling
function model(){
  var analysis = analysisSelect.getValue();
  var year = new Date(dateRange.getValue()[0]).getFullYear();
  var visual = visualSelect.getValue();
  var modelDict = {
    'Flood hazard': hazard,
    'Flood exposure': exposure,
    'Flood vulnerability': vulnerability,
    'Flood risk': risk
  };
  var name = analysis + ' ' + year;
  var modelData = modelDict[analysis](year);
  // Condition for aggregate
  modelData = visual !== 'Dasymetric' ? aggr(modelData, visual) : modelData;
  modelData = modelData.rename(analysis);
  var palette = ['purple', 'blue', 'cyan', 'green', 'yellow', 'red'];
  var vis = { min: 0, max: 1, palette: palette };
  var layer = ui.Map.Layer(modelData, vis, name);
  Map.layers().set(0, layer);
  // Legend
  legendPanel(name, vis, legendPanelMap);
  // Click panel
  click(modelData, analysis);
  // Download panel
  download(modelData, analysis, name);
}
// Aggregate
function aggr(data, visual){
  var dict = {
    'Province': gaul1.filterBounds(java),
    'City/regency': gaul2.filterBounds(java)
  };
  var features = data.reduceRegions({
    collection: dict[visual],
    reducer: ee.Reducer.mean(),
    scale: 250,
  });
  var paint = ee.Image().toFloat().paint(features, 'mean');
  return paint;
}
// Legend
function legendPanel(title, visual, legend){
  // Clear all the widget
  legend.clear();
  // Create legend title
  var legendTitle = ui.Label({
    value: title,
    style: {
    fontWeight: 'bold',
    fontSize: '15px',
    textAlign: 'center',
    stretch: 'horizontal'
    }
  });
  // Add the title to the panel
  legend.add(legendTitle);
  // create the legend image
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((visual.max-visual.min)/100.0).add(visual.min);
  var legendImage = gradient.visualize(visual);
  // create text on top of legend
  var max = ui.Label({
    value: visual.max,
    style: {textAlign: 'center', stretch: 'horizontal'}
  });
  legend.add(max);
  // create thumbnail from the image
  var thumbnail = ui.Thumbnail({
    image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'10x50'},
    style: {textAlign: 'center', stretch: 'horizontal', height: '150px'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on bottom of legend
  var min = ui.Label({
    value: visual.min,
    style: {textAlign: 'center', stretch: 'horizontal'}
  });
  legend.add(min);
  return legend;
}
// Function to add click map to know the value
function click(data, analysis){
  var clickLabel = ui.Label('Click to see value!', { color: 'blue' });
  var attributeLabel = ui.Label(analysis + ': ');
  var valueLabel = ui.Label(' ');
  var smallPanel = ui.Panel([attributeLabel, valueLabel], ui.Panel.Layout.flow('horizontal'));
  var panel = ui.Panel([clickLabel, smallPanel], ui.Panel.Layout.flow('vertical'), { position: 'bottom-right'});
  Map.widgets().set(1, panel);
  Map.style().set('cursor', 'crosshair');
  Map.onClick(function(coord){
    valueLabel.setValue('...Loading');
    coord = ee.Dictionary(coord);
    var point = ee.Geometry.Point([coord.get('lon'), coord.get('lat')]);
    var value = data.reduceRegion({
      geometry: point,
      reducer: ee.Reducer.first(),
      scale: 30,
      bestEffort: true
    });
    var key = value.keys().get(0);
    ee.Number(value.get(key)).evaluate(function(text){
      valueLabel.setValue(text);
    });
  });
}
// Download panel
function download(data, analysis, name){
  var buttonDownload = ui.Button('Click to generate download link', function(){
    downloadUrl.setValue('...Loading');
    data.getDownloadURL({
      name: name,
      bands: [analysis],
      crs: 'EPSG:4326',
      scale: 250,
      region: roi,
      format: 'GeoTIFF'
    }, function(url, err){
      err ? downloadUrl.setValue(err) : downloadUrl.setValue('Link ready!').setUrl(url);
    });
  });
  var downloadUrl = ui.Label(' ');
  var panel = ui.Panel([buttonDownload, downloadUrl], ui.Panel.Layout.flow('vertical'), { position: 'bottom-center' });
  Map.widgets().set(2, panel);
}
// Function to predict flood risk
function risk(year){
  var floodHazard = hazard(year);
  var floodExposure = exposure(year);
  var floodVulnerability = vulnerability(year);
  var floodRisk =  floodHazard.multiply(floodExposure).multiply(floodVulnerability).rename('constant');
  var minMax = floodRisk.reduceRegion({
    reducer: ee.Reducer.percentile([0.1, 99.9]),
    scale: 250,
    geometry: roi,
    bestEffort: true
  });
  var min = ee.Number(minMax.get('constant_p0'));
  var max = ee.Number(minMax.get('constant_p100'));
  var scaled = floodRisk.clamp(min, max).unitScale(min, max)
    .updateMask(mask).clip(roi).rename('flood_risk');
  return scaled;
}
// Function to predict flood hazard
function hazard(year){
  var bandMap = {
    R: hazardRegression.select('residuals'),
    rTPI: hazardRegression.select('tpi'),
    rELEV: hazardRegression.select('elevation'),
    rRAIN: hazardRegression.select('rain'),
    rYEAR: hazardRegression.select('year'),
    TPI: tpi,
    ELEV: elevation,
    RAIN: rainRegression.select('scale').multiply(year).add(rainRegression.select('offset')),
    YEAR: year
  };
  var formula = 'R + (rTPI * TPI)  + (rELEV * ELEV) + (rRAIN * RAIN) + (rYEAR * YEAR)';
  var flood = ee.Image().expression(formula, bandMap)
    .focalMean(1, 'square')
    .reproject('EPSG:4326', null, 250)
    .updateMask(mask)
    .selfMask().clip(roi).rename('flood');
  var minMax = flood.reduceRegion({
    reducer: ee.Reducer.percentile([0.1, 99.9]),
    scale: 250,
    geometry: roi,
    bestEffort: true
  });
  var min = ee.Number(minMax.get('flood_p0'));
  var max = ee.Number(minMax.get('flood_p100'));
  var scaled = flood.clamp(min, max).unitScale(min, max);
  return scaled.rename('flood_hazard');
}
// Function to generate flood exposure
function exposure(year){
  var data = [
    {data: popRegression, name: 'pop'},
    {data: gdpRegression, name: 'gdp'},
    {data: builtRegression, name: 'built'},
    {data: cropRegression, name: 'crop'},
  ];
  var scaledVar = ee.Image(data.map(function(dict){
    var name = dict.name;
    var regression = dict.data;
    var predict = regression.select('scale').multiply(year).add(regression.select('offset')).rename(name);
    var minMax = predict.reduceRegion({
      reducer: ee.Reducer.percentile([0.1, 99.9]),
      scale: 250,
      geometry: roi,
      bestEffort: true
    });
    var min = ee.Number(minMax.get(name + '_p0'));
    var max = ee.Number(minMax.get(name + '_p100'));
    var scaled = predict.clamp(min, max).unitScale(min, max).rename(name);
    return scaled;
  }));
  var bandMap = {
    POP: scaledVar.select('pop'),
    GDP: scaledVar.select('gdp'),
    BUILT: scaledVar.select('built'),
    CROP: scaledVar.select('crop')
  };
  var exposureFlood = scaledVar.expression('(POP + GDP + BUILT + CROP) / 4', bandMap)
    .updateMask(mask).clip(roi).rename('flood_exposure');
  return exposureFlood;
}
// Function to generate flood vulnerabilitu
function vulnerability(year){
  var predict = hdiRegression.select('scale').multiply(year).add(hdiRegression.select('offset')).rename('HDI');
  var calculated = ee.Image(1).divide(predict);
  var minMax = calculated.reduceRegion({
    reducer: ee.Reducer.percentile([0.1, 99.9]),
    scale: 250,
    geometry: roi,
    bestEffort: true
  });
  var min = ee.Number(minMax.get('constant_p0'));
  var max = ee.Number(minMax.get('constant_p100'));
  var scaled = calculated.clamp(min, max).unitScale(min, max)
    .updateMask(mask).clip(roi).rename('flood_vulnerability');
  return scaled;
}