// Explore Landsat Data
/* Documentation here */
// ---------------------------------------------------------------
// Predefined Variables:
var visParams = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1400};
var studyPeriod = ee.Dictionary({
     'start': '1990-01-01',
     'end': '2020-04-01',
      });
var stretches = {
    Stretch_321: {bands: ['B3', 'B2', 'B1'], min: 0, max: 1400},
    Stretch_543: {bands: ['B5', 'B4', 'B3'], min: 0, max: 5000}
  };
var enterFor = 0;
var listener = 0;
// ---------------------------------------------------------------
// UIs:
// Panel for displaying time series
var resetButton = ui.Button('Reset');
var clickButton = ui.Button('Click to get TS');
var clickSet = ui.Panel([clickButton, resetButton], 
                        ui.Panel.Layout.Flow('horizontal'));
var stretchSelect = ui.Select({
  items: Object.keys(stretches),
  placeholder: 'Select Stretch'
});
var tsUISet = ui.Panel([ui.Label('Time Series'), clickSet, stretchSelect]);
var tsPanel = ui.Panel({
  widgets: [tsUISet],
  style: {width: '600px'}
});
// ---------------------------------------------------------------
// Runtime Functions:
clickButton.onClick(function(){
  if (listener == 1) {
    clickButton.setLabel('Click to get TS');
    listener = 0;
  } else if (listener === 0) {
    clickButton.setLabel('Cancel');
    listener = 1;
  } else {
    messager.setValue('Something else is working.');
  }
});
stretchSelect.onChange(function(key){
  visParams = stretches[key];
});
resetButton.onClick(function(){
  if (listener === 0 || listener == 1) {
    tsPanel.clear();
    tsPanel.add(tsUISet);
    removeLayer('Clicked');
    removeLayer('_L.0._');
  } else {
    messager.setValue('Cannot reset.');
  }
});
Map.onClick(function(coords){
  if (listener == 1) {
    // Click on the map and load a new time series
    tsPanel.clear();
    tsPanel.add(tsUISet);
    removeLayer('Clicked');
    removeLayer('_L.0._');
    var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);
    // Create or update the location label
    var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' +
                   'Lat: ' + coords.lat.toFixed(2);
    var landsatData = getLandsatTS(pgeo, studyPeriod);
    addPixel(coords, 0.000135, '0000FF', 'Clicked (Landsat)');
    plotLandsat(landsatData, pgeo, 'BT', 2000, 3500);
    plotLandsat(landsatData, pgeo, 'Red', 0, 3000);
    plotLandsat(landsatData, pgeo, 'NIR', 0, 5000);
    plotLandsat(landsatData, pgeo, 'SWIR1', 0, 3000);
    plotLandsat(landsatData, pgeo, 'EVI', -0.5, 1);
    plotLandsat(landsatData, pgeo, 'NDVI', -0.5, 1);
  }
});
// ---------------------------------------------------------------
// Functions:
var getLandsatImage = function(region, date) {
  // Get Landsat image at a given date and location
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region);
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region);
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region);
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region);
  var col4NoClouds = collection4.map(mask457);
  var col5NoClouds = collection5.map(mask457);
  var col7NoClouds = collection7.map(mask457);
  var col8NoClouds = collection8.map(mask8);
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds);
  var imDate = ee.Date(date);
  var befDate = imDate.advance(-1, 'day');
  var aftDate = imDate.advance(1, 'day');
  var selectedImage = colNoClouds.filterDate(befDate, aftDate).first();
  var image_id = selectedImage.get('system:index').getInfo();
  Map.addLayer(ee.Image(selectedImage), visParams, image_id);
  return selectedImage;
};
var getLandsatTS = function(region, params) {
  // Get Landsat time series for a given location
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region).filterDate(params.get('start'), params.get('end'));
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region).filterDate(params.get('start'), params.get('end'));
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region).filterDate(params.get('start'), params.get('end'));
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region).filterDate(params.get('start'), params.get('end'));
  var col4NoClouds = collection4.map(mask457);
  var col5NoClouds = collection5.map(mask457);
  var col7NoClouds = collection7.map(mask457);
  var col8NoClouds = collection8.map(mask8);
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds);
  var colIndices = ee.ImageCollection(doIndices(colNoClouds));
  return colIndices;
};
var plotLandsat = function(iCol, region, bandName, ymin, ymax) {
  // Make time series plot from image collection
  var chart = ui.Chart.image.series(ee.ImageCollection(iCol).select(bandName), region, ee.Reducer.mean(), 30)
                .setOptions({
                  title: 'Landsat ' + bandName,
                  vAxis: {title: bandName, viewWindow: {min: ymin, max: ymax}},
                  lineWidth: 0,
                  pointSize: 4,
                 });
  chart.onClick(
    function(date) {
      if (date === null) {
        removeLayer('_L.0._');
      } else {
        getLandsatImage(region, date);
      }
    }
  );
  tsPanel.add(chart); 
};
var addPixel = function(coords, pixelSize, color, name) {
  var pixel = ee.Geometry.Rectangle([coords.lon-pixelSize, coords.lat-pixelSize, 
                                      coords.lon+pixelSize, coords.lat+pixelSize]);
  Map.addLayer(pixel, {color: color}, name);
};
var removeLayer = function(name) {
  var layers = Map.layers();
  var nLayer = layers.length();
  for (var i = nLayer-1; i >= 0; i--) {
    var layer = layers.get(i);
    if (layer.getName().match(name)) {
      layers.remove(layer);
    }
  }
};
var mask457 = function(img){
  /*  Cloud mask for Landsat 4, 5 and 7  */
  var mask = img.select(['pixel_qa']).eq(66)
              .or(img.select(['pixel_qa']).eq(68))
              .and(img.select('B1').gt(ee.Image(0)))
  return img.updateMask(mask).select(['B1','B2', 'B3','B4','B5','B7','B6'])
};
var mask8 = function(img){
  /*  Cloud mask for Landsat 8  */
  var mask = img.select(['pixel_qa']).eq(322)
               .or(img.select(['pixel_qa']).eq(324))
               .and(img.select('B1').gt(ee.Image(0)))
  return ee.Image(img).updateMask(mask).select(['B2', 'B3','B4','B5','B6','B7','B10']).rename(['B1','B2','B3','B4','B5','B7','B6'])
};
var doIndices = function(iCol){
  // Calculate spectral indices for all bands in collection
  var iColIndices = iCol.map(function(image) {
                        var NDVI =  calc_NDVI(image)
                        var NBR = calc_NBR(image)
                        var EVI = calc_EVI(image)
                        var EVI2 = calc_EVI2(image)
                        var TC = tc_trans(image)
                        var imageIndices = image.rename(['Blue','Green','Red','NIR','SWIR1','SWIR2','BT'])
                                            .addBands([NDVI, NBR, EVI, EVI2, TC])
                        return imageIndices
                    })
   return iColIndices
};
var calc_NDVI = function(image){
   var ndvi = ee.Image(image).normalizedDifference(['B4', 'B3']).rename('NDVI');
   return ee.Image(image).addBands(ndvi).rename(['B1','B2','B3','B4','B5','B7','B6','NDVI']).select('NDVI');
};
var calc_NBR = function(image){
  var nbr = ee.Image(image).normalizedDifference(['B4', 'B7']).rename('NBR');
  return ee.Image(image).addBands(nbr).rename(['B1','B2','B3','B4','B5','B7','B6','NBR']).select('NBR');
  //return ee.Image(image).addBands(nbr);
};
var calc_EVI = function(image){
  var evi = ee.Image(image).expression(
          'float(2.5*(((B4/10000) - (B3/10000)) / ((B4/10000) + (6 * (B3/10000)) - (7.5 * (B1/10000)) + 1)))',
          {
              'B4': ee.Image(image).select(['B4']),
              'B3': ee.Image(image).select(['B3']),
              'B1': ee.Image(image).select(['B1'])
          }).rename('EVI');    
  return ee.Image(image).addBands(evi).rename(['B1','B2','B3','B4','B5','B7','B6','EVI']).select('EVI');
};
var calc_EVI2 = function(image){
  var evi2 = ee.Image(image).expression(
        'float(2.5*(((B4/10000) - (B3/10000)) / ((B4/10000) + (2.4 * (B3/10000)) + 1)))',
        {
            'B4': image.select('B4'),
            'B3': image.select('B3')
        });
  return ee.Image(image).addBands(evi2).rename(['B1','B2','B3','B4','B5','B7','B6','EVI2']).select('EVI2');
};
var tc_trans = function(image){
// Tassel Cap coefficients from Crist 1985
    // Calculate tasseled cap transformation
    var brightness = image.expression(
        '(L1 * B1) + (L2 * B2) + (L3 * B3) + (L4 * B4) + (L5 * B5) + (L6 * B6)',
        {
            'L1': image.select('B1'),
            'B1': 0.2043,
            'L2': image.select('B2'),
            'B2': 0.4158,
            'L3': image.select('B3'),
            'B3': 0.5524,
            'L4': image.select('B4'),
            'B4': 0.5741,
            'L5': image.select('B5'),
            'B5': 0.3124,
            'L6': image.select('B7'),
            'B6': 0.2303
        });
    var greenness = image.expression(
        '(L1 * B1) + (L2 * B2) + (L3 * B3) + (L4 * B4) + (L5 * B5) + (L6 * B6)',
        {
            'L1': image.select('B1'),
            'B1': -0.1603,
            'L2': image.select('B2'),
            'B2': -0.2819,
            'L3': image.select('B3'),
            'B3': -0.4934,
            'L4': image.select('B4'),
            'B4': 0.7940,
            'L5': image.select('B5'),
            'B5': -0.0002,
            'L6': image.select('B7'),
            'B6': -0.1446
        });
    var wetness = image.expression(
        '(L1 * B1) + (L2 * B2) + (L3 * B3) + (L4 * B4) + (L5 * B5) + (L6 * B6)',
        {
            'L1': image.select('B1'),
            'B1': 0.0315,
            'L2': image.select('B2'),
            'B2': 0.2021,
            'L3': image.select('B3'),
            'B3': 0.3102,
            'L4': image.select('B4'),
            'B4': 0.1594,
            'L5': image.select('B5'),
            'B5': -0.6806,
            'L6': image.select('B7'),
            'B6': -0.6109
        });
    var bright =  ee.Image(brightness);
    var green = ee.Image(greenness);
    var wet = ee.Image(wetness);
    var tasseled_cap = ee.Image(image).addBands(bright).addBands(green).addBands(wet);
    return tasseled_cap.rename(['B1','B2','B3','B4','B5','B7','B6','Brightness','Greenness','Wetness']).select(['Brightness','Greenness','Wetness']);
};
// ---------------------------------------------------------------
// Initialization:
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
Map.setCenter(-71.042532, 42.249432, 15);
ui.root.add(tsPanel);
// ---------------------------------------------------------------
// End