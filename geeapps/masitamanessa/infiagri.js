var Sekadau = ui.import && ui.import("Sekadau", "table", {
      "id": "users/masitamanessa/Palm-Sekadau"
    }) || ee.FeatureCollection("users/masitamanessa/Palm-Sekadau"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.21483360162605,
            0.16306284997635495
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([111.21483360162605, 0.16306284997635495]),
    SDK = ui.import && ui.import("SDK", "table", {
      "id": "users/masitamanessa/SDK_OWL_Block"
    }) || ee.FeatureCollection("users/masitamanessa/SDK_OWL_Block");
Map.setOptions('HYBRID');
Map.addLayer(Sekadau);
Map.centerObject(Sekadau, 12);
var profilesOn = false; // status of analysis profiles
// ################################################################
// ### FUNCTIONS ###
// ################################################################
// Define coefficients supplied by Roy et al. (2016) for translating ETM+
// surface reflectance to OLI surface reflectance.
// Fun 01: Rename function
/// Define function to get and rename bands of interest from OLI.
function renameOLI(img) {
  return img.select(
		['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
	);
}
/// Define function to get and rename bands of interest from ETM+.
function renameETM(img) {
  return img.select(
		['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
  );
}
function renameS2(img) {
  return img.select(
		[ 'B2', 'B3', 'B4', 'B8', 'B11', 'B12','QA60'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
  );
}
// Fun 02: Define Coefficient 
var coefficients = {
  etm2oli_ols: {
    itcps: ee.Image.constant([0.0003, 0.0088, 0.0061, 0.0412, 0.0254, 0.0172]).multiply(10000),
    slopes: ee.Image.constant([0.8474, 0.8483, 0.9047, 0.8462, 0.8937, 0.9071])
  },
  oli2etm_ols: {
    itcps: ee.Image.constant([0.0183, 0.0123, 0.0123, 0.0448, 0.0306, 0.0116]).multiply(10000),
    slopes: ee.Image.constant([0.885, 0.9317, 0.9372, 0.8339, 0.8639, 0.9165])
  },
  rma: {
    itcps: ee.Image.constant([-0.0095, -0.0016, -0.0022, -0.0021, -0.0030, 0.0029]).multiply(10000),
    slopes: ee.Image.constant([0.9785, 0.9542, 0.9825, 1.0073, 1.0171, 0.9949])
  },
  s2oli: {
    itcps: ee.Image.constant([0.0107, 0.0026, 0.0015, 0.0033, 0.0065, 0.0046]).multiply(10000),
    slopes: ee.Image.constant([1.0946, 1.0043, 1.0524, 0.0895, 1.0049, 1.0002])
  }
};
// Fun 03: Harmonic function
/// Define function to apply OLS ETM+ to OLI transformation.
function etm2oli_ols(img) {
  return img.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2'])
    .multiply(coefficients.etm2oli_ols.slopes)
    .add(coefficients.etm2oli_ols.itcps)
    .round()
    .toShort()
    .addBands(img.select('pixel_qa')
  );
}
/// Define function to apply RMA ETM+ to OLI transformation.
function etm2oli_rma(img) {
  return ee.Image(
    img.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2'])
      .multiply(coefficients.rma.slopes)
      .add(coefficients.rma.itcps)
      .round()
      .toShort()
      .addBands(img.select('pixel_qa'))
      .copyProperties(img, ['system:time_start'])
  );
}
/// Define function to appl y S2 to OLI transformation.
function s2oli_rma(img) {
  return ee.Image(
    img.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2'])
      .multiply(coefficients.s2oli.slopes)
      .add(coefficients.s2oli.itcps)
      //.round()
      //.toShort()
      .addBands(img.select('pixel_qa'))
      .copyProperties(img, ['system:time_start'])
  );
}
// Fun 04: Define function to mask out clouds and cloud shadows.
function fmask(img) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = img.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask);
}
function maskS2clouds(image) {
  var qa = image.select('pixel_qa');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .copyProperties(image, ["system:time_start"]);
}
// Fun 05 Define function to calculate NDVI.
function calcNDVI(img) {
  return img.normalizedDifference(['NIR', 'Red']).rename('NDVI');
}
function calcNDVIs(img) {
  var ndvi = img.select('NDVI');
  var ndvis = ndvi.multiply(1.0654).subtract(0.093);
  return ndvis;
}
// Fun 06: Compiler function
/// Define function to prepare OLI images.
function prepOLI(img) {
  var orig = img;
  img = renameOLI(img);
  img = fmask(img);
  img = calcNDVI(img);
  img = calcNDVIs(img);
 return ee.Image(img.resample('bicubic').reproject({'crs': 'EPSG:32748', 'crsTransform': [10, 0.0, 0.799980, 0.0, -10, 900040]}).copyProperties(orig, orig.propertyNames()));
}
/// Define function to prepare ETM+ images.
function prepETM(img) {
  var orig = img;
  img = renameETM(img); // fun 01
  img = fmask(img); // fun 04
  img = etm2oli_ols(img); // fun 03
  img = calcNDVI(img); // fun 02
  img = calcNDVIs(img);
 return ee.Image(img.resample('bicubic').reproject({'crs': 'EPSG:32748', 'crsTransform': [10, 0.0, 0.799980, 0.0, -10, 900040]}).copyProperties(orig, orig.propertyNames()));
}
/// Define function to prepare ETM+ raw images.
function prepETMraw(img) {
  var orig = img;
  img = renameETM(img); // fun 01
  img = fmask(img); // fun 04
  img = calcNDVI(img); // fun 05
  img = calcNDVIs(img);
  return ee.Image(img.resample('bicubic').reproject({'crs': 'EPSG:32748', 'crsTransform': [10, 0.0, 0.799980, 0.0, -10, 900040]}).copyProperties(orig, orig.propertyNames()));
}
/// Define function to prepare S2 images.
function prepS2(img) {
  var orig = img;
  img = renameS2(img); // fun 01
  img = maskS2clouds(img); // fun 04
  return ee.Image(img.copyProperties(orig, orig.propertyNames()));
}
function prepS2s(img) {
  var orig = img;
  //img = s2oli_rma(img); // fun 03
  img = calcNDVI(img);
  //img = calcNDVIs(img);// fun 02
  return ee.Image(img.copyProperties(orig, orig.propertyNames()).set('SATELLITE','SENTINEL_2'));
}
var colFilter = ee.Filter.and(
  ee.Filter.calendarRange(0, 365, 'day_of_year'),
  ee.Filter.lt('CLOUD_COVER', 40),
  ee.Filter.lt('GEOMETRIC_RMSE_MODEL', 10),
  ee.Filter.or(
    ee.Filter.eq('IMAGE_QUALITY', 9),
    ee.Filter.eq('IMAGE_QUALITY_OLI', 9)
  ));
var S2colFilter = ee.Filter.and(
  ee.Filter.calendarRange(0, 365, 'day_of_year'),
  ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40));
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// ################################################################
// ### DATA ###
// ################################################################
var oliCol = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filter(colFilter).filterBounds(Sekadau).map(prepOLI);
var etmCol= ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').filter(colFilter).filterBounds(Sekadau).map(prepETM);
var tmCol = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filter(colFilter).filterBounds(Sekadau).map(prepETM);
var S2Colt = ee.ImageCollection('COPERNICUS/S2_SR').filter(S2colFilter).filterBounds(Sekadau).map(prepS2);
var S2Col = S2Colt.map(prepS2s);
var har   = oliCol.merge(etmCol).merge(tmCol).merge(S2Col);
var panel = ui.Panel({style: {width: '1300px',position: 'bottom-right'}})
    .add(ui.Label('Click on the map to explore'))
var places = { 
  '01. Sekadau' : ['Sekadau'],
  '02. SDK' : ['SDK']
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    if (key[0] == 'Sekadau'){
      var petak  = Sekadau;
    }else{
      var petak  = SDK;
    }
    Map.centerObject(petak, 11);
    Map.layers().set(2, ui.Map.Layer(petak, {color: 'FF0000'}));
    //print(petak)
  var allObsHar =har.map(function(img) {
  var obs = img.reduceRegion({
    geometry: petak,
    reducer: ee.Reducer.median(),
    scale: 30
    });
    return img.set('NDVI', obs.get('NDVI'));
    });
  var chart1 = ui.Chart.image.series(allObsHar, petak, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(2, chart1);  
  chart1.onClick(function (xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
        // Show the image for the clicked year.
        var image = ee.Image(har.filter(ee.Filter.equals('system:time_start', xValue)).first()).clip(petak);
        var layer = ui.Map.Layer(image, {
                min: 0.5,
                max: 1.0,
                palette: [
                  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                  '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                  '012E01', '011D01', '011301'
                ],
            bands: 'NDVI'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
    });
  }    
});
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var petak = Sekadau.filterBounds(click_point);
  Map.layers().set(1, ui.Map.Layer(click_point, {color: 'FF0000'}));
  Map.layers().set(2, ui.Map.Layer(petak, {color: 'FF0000'}));
  print(petak)
  var allObsHar =har.map(function(img) {
  var obs = img.reduceRegion({
    geometry: petak,
    reducer: ee.Reducer.median(),
    scale: 30
    });
    return img.set('NDVI', obs.get('NDVI'));
    });
  var chart1 = ui.Chart.image.series(allObsHar, petak, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(2, chart1);  
  chart1.onClick(function (xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
        // Show the image for the clicked year.
        var image = ee.Image(har.filter(ee.Filter.equals('system:time_start', xValue)).first()).clip(petak);
        var layer = ui.Map.Layer(image, {
                min: 0.5,
                max: 1.0,
                palette: [
                  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                  '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                  '012E01', '011D01', '011301'
                ],
            bands: 'NDVI'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
    });
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
panel.widgets().set(1, select);
Map.add(panel);