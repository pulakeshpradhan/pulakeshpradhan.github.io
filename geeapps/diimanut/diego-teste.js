/** this script uses landsat (5,7 and 8) satellite images and a  harmonic function 
 * to produce a time series from 2010 to 2018 of a polygon of interest using the NDVI 
 * index for the microregion named PARAGOMINAS, in the state of Pará, Brazil.
 * Based on this index, forest detection is calculated. 
 * The NDVI median result layer for the first five months of 2018 can help to understand 
 * the changes that have occurred in the graphs that were generated
 * 
/**
 * @name fit-harmonic-function
 * @description 
 * @author Diego SIlva
 * @version 1
 */
//-----------------------------------------------------------------------------
// enter name of microregion
//-----------------------------------------------------------------------------
var nameMicro = "PARAGOMINAS";
//-----------------------------------------------------------------------------
// enter index ('VI' ou 'NDVI')
//-----------------------------------------------------------------------------
var index = 'NDVI';
//-----------------------------------------------------------------------------
// enter the time period to filter the collection (used in the harmonic function)
//-----------------------------------------------------------------------------
var t0 = '2010-01-01';
var t1 = '2018-05-31';
//-----------------------------------------------------------------------------
// enter the time period for the index median
//-----------------------------------------------------------------------------
var t0_median = '2018-01-01';
var t1_median = '2018-05-31';
//-----------------------------------------------------------------------------
// enter the parameter for forest detection
//-----------------------------------------------------------------------------
var paramForest = 0.70;
//******************************************************************************
//******************************************************************************
//-----------------------------------------------------------------------------
// User defined parameters
//-----------------------------------------------------------------------------
var geometryPolygon = geometry;
//-----------------------------------------------------------------------------
// Project parameters
//-----------------------------------------------------------------------------
var asset = "users/diegosilva/alguns-municipios-PA";
var fincas_ftc = ee.FeatureCollection(asset)
                .filterMetadata("NM_MICRO", "equals", nameMicro);
fincas_ftc = ee.FeatureCollection(fincas_ftc);
var geometry = fincas_ftc
                .geometry();
var timeField = 'system:time_start';
//-----------------------------------------------------------------------------
// Defined functions
//-----------------------------------------------------------------------------
/**
 * @function  add variables
 * @param {*} image 
 * Use this function to add variables for NDVI, time and a constant
 */
var addVariables = function (image) {
  image = ee.Image(image);
  var date = ee.Date(image
    .get(timeField));
  var years = date
    .difference(ee.Date(t0), 'year');
  image = image.addBands(getImageIndex(index, image)).float()
    .addBands(ee.Image(years).rename('t').float())
    .addBands(ee.Image.constant(1));
  return image;  
};
/**
 * @function  maskImageLandsat8 
 * @param {*} image 
 */
var maskImageLandsat8 = function (image) {
  var bqa = ee.Image(image).select(['pixel_qa']);
  image = ee.Image(image).mask(bqa.eq(322));
  return image;
};
/**
 * @function  maskImageLandsat5 
 * @param {*} image 
 */
var maskImageLandsat5 = function (image) {
  var bqa = ee.Image(image).select(['pixel_qa']);
  image = ee.Image(image).mask(bqa.eq(66));
  return image;
};
/**
 * @function  getLandsat5
 * @param {*} geometry, date_start, date_end 
 */
var getLandsat5 = function (geometry, date_start, date_end) {
  var sr = {
    'id': 'LANDSAT/LT05/C01/T1_SR',
    'bandNames': ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],
    'newNames': ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa']
  };
  geometry = ee.Feature(geometry)
    .geometry()
    .buffer(1000)
    .bounds();
  var collection1 = ee.ImageCollection(sr.id)
    .filterDate(date_start, date_end)
    .filterBounds(geometry)
    .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  collection1 = collection1.select(sr.bandNames, sr.newNames);
  var collection2 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
    .filterDate(date_start, date_end)
    .filterBounds(geometry)
    .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa']);
  collection2 = collection2.select(sr.bandNames, sr.newNames);
  var collection = collection1.merge(collection2)
    .sort('DATE_ACQUIRED');
  return collection;
};
/**
 * @function  getLandsat8
 * @param {*} geometry, date_start, date_end 
 */
var getLandsat8 = function (geometry, date_start, date_end) {
  var sr = {
    'id': 'LANDSAT/LC08/C01/T1_SR',
    'bandNames': ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'pixel_qa'],
    'newNames': ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'thermal', 'pixel_qa']
  };
  geometry = ee.Feature(geometry)
    .geometry()
    .buffer(1000)
    .bounds();
  var collection = ee.ImageCollection(sr.id)
    .filterDate(date_start, date_end)
    .filterBounds(geometry);
  collection = collection.select(sr.bandNames, sr.newNames);
  return collection;
};
/**
 * @function  get_collection
 * @param {*} geometry, date_start, date_end 
 */
var get_collection = function (geometry, date_start, date_end) {
  var collection = ee.ImageCollection
    .fromImages([]);
  if (date_start < '2013-01-01') {
    var imc = getLandsat5(geometry, date_start, date_end);
    imc = imc.map(maskImageLandsat5);
    collection = collection.merge(imc);
  }
  if (date_end > '2013-05-01') {
    imc = getLandsat8(geometry, date_start, date_end);
    imc = imc.map(maskImageLandsat8);
    collection = collection.merge(imc);
  }
  collection = ee.ImageCollection(collection)
    .sort('DATE_ACQUIRED');
  collection = collection.filterMetadata("CLOUD_COVER_LAND", "less_than", 90);
  collection = ee.ImageCollection(collection);
  return collection;
};
/**
 * @function  getImageIndex 
 * @param {*} index, image
 */
var getImageIndex = function (index, image) {
  image = ee.Image(image);
  if (index === 'NDVI') {
    image = image.expression('float(b("nir") - b("red")) / (b("nir") + b("red"))')
      .rename("NDVI");
  }
  else if (index === 'VI') {
    image = image.expression("(b('nir') - b('swir2')) / (b('nir') + b('swir2'))")
      .rename("VI");
  }
  return image;
};
/**
 * @function painel
*/
var painel = ui.Panel([],
  ui.Panel.Layout.flow('vertical'),
  {
    position: 'bottom-left',
    height: '710px',
    width: '520px'
  }
);
/**
 * @function clickPLot
 * @params {*} coords
 * this function receive coordinates and plot graphs
*/
var landsat = get_collection(geometry, t0, t1);
var filteredLandsat = landsat
    .filterDate(t0, t1)
    .filterBounds(geometryPolygon)
    .map(addVariables);
  try{
     var imageMedian =  landsat.filterDate(t0_median, t1_median);
  }
  catch (error){
    print("could not create median for " + String(t0_median)+ "_" + String(t1_median));
  }
imageMedian = imageMedian.filterBounds(fincas_ftc.geometry())
                  .map(addVariables)
                  .select(index)
                  .median()
                  .clip(fincas_ftc.geometry()); 
var forest = imageMedian
                .gte(paramForest);
forest = forest
              .mask(forest);
var clickPLot = function (coords,filteredLandsat) {
  painel.clear();
  // Linear trend ----------------------------------------------------------------
  // List of the independent variable names
  var independents = ee.List(['constant', 't']);
  // Name of the dependent variable.
  var dependent = ee.String(index);
  // Compute a linear trend.  This will have two bands: 'residuals' and 
  // a 2x1 band called coefficients (columns are for dependent variables).
  var trend = filteredLandsat
    .select(independents.add(dependent))
    .reduce(ee.Reducer
      .linearRegression(
      independents.length(), 1));
  // Map.addLayer(trend, {}, 'trend array image');
  // Flatten the coefficients into a 2-band image
  var coefficients = trend
    .select('coefficients')
    .arrayProject([0])
    .arrayFlatten([independents]);
  // Compute a de-trended series.
  var detrended = filteredLandsat.map(function (image) {
    image = image.select(dependent)
      .subtract(image
        .select(independents)
        .multiply(coefficients).reduce('sum'))
      .rename(dependent)
      .copyProperties(image, [timeField]);
    return image;
  });
  // Harmonic trend ----------------------------------------------------------------
  // Use these independent variables in the harmonic regression.
  var harmonicIndependents = ee.List(['constant', 't', 'cos', 'sin']);
  // Add harmonic terms as new image bands.
  var harmonicLandsat = filteredLandsat
    .map(function (image) {
      var timeRadians = image.select('t')
        .multiply(2 * Math.PI);
      image = image.addBands(timeRadians.cos()
        .rename('cos'))
        .addBands(timeRadians.sin()
          .rename('sin'));
      return image;
    });
  // The output of the regression reduction is a 4x1 array image.
  var harmonicTrend = harmonicLandsat
    .select(harmonicIndependents
      .add(dependent))
    .reduce(ee.Reducer
      .linearRegression
      (harmonicIndependents.length(), 1));
  // Turn the array image into a multi-band image of coefficients.
  var harmonicTrendCoefficients = harmonicTrend
    .select('coefficients')
    .arrayProject([0])
    .arrayFlatten([harmonicIndependents]);
  // Compute fitted values.
  var fittedHarmonic = harmonicLandsat.map(function (image) {
    image = image.addBands(
      image.select(harmonicIndependents)
        .multiply(harmonicTrendCoefficients)
        .reduce('sum')
        .rename('fitted'));
    return image;
  });
  // Plot a time series of NDVI at a single location.
  var l8Chart = ui.Chart.image.series(filteredLandsat.select(index), coords)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat  ' + index + ' time series at POLYGON OF INTEREST',
      trendlines: {
        0: {
          color: 'CC0000'
        }
      },
      lineWidth: 1,
      pointSize: 3,
    });
  painel.insert(0, l8Chart);
  // Plot the detrended results.
  var detrendedChart = ui.Chart.image.series(detrended, coords, null, 30)
    .setOptions({
      title: 'Detrended Landsat time series at POLYGON OF INTEREST',
      lineWidth: 1,
      pointSize: 3,
    });
  // Map.add(detrendedChart);
  painel.insert(1, detrendedChart);
  // Plot the fitted model and the original data at the ROI.
  var teste = ui.Chart.image.series(
    fittedHarmonic.select(['fitted', index]), coords, ee.Reducer.mean(), 30)
    .setSeriesNames([index, 'fitted'])
    .setOptions({
      title: 'Harmonic model: original and fitted values',
      lineWidth: 1,
      pointSize: 3,
    });
  painel.insert(2, teste);
};
clickPLot(geometryPolygon,filteredLandsat);
Map.add(painel);
/**
 * @function  ImageVis
 * @param {*} index, image
 */
var ImageVis = function(index, image){
  var vis = {
      min: 0.3,
      max: 1,
      palette: [
        'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
        '74A901', '66A000', '529400', '3E8601', '207401', '#2b7a11',
        '004C00', '023B01', '609406', '2e8a17', '1b570c'
      ]
  };
  image = ee.Image(image);
  if (index === 'NDVI'){
   Map.addLayer(image,vis,index + " median " + t0_median +  "_to_" +  t1_median ,false);
  }
  else if (index === 'VI'){
        Map.addLayer(image,vis,index + " median " + t0_median +  "_to_" +  t1_median ,false);
  }
  else if (index === 'TREECOVER'){
     vis = {
      min: 0,
      max: 100,
      palette: [
        'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
        '74A901', '66A000', '529400', '3E8601', '207401', '056201',
        '004C00', '023B01', '012E01', '011D01', '011301'
      ]
    };
    Map.addLayer(image,vis,index);
  }
};
ImageVis(index, imageMedian);  
var empty = ee.Image()
  .byte();
var outline = empty.paint(
  {
    featureCollection: fincas_ftc,
    color: 1,
    width: 3
  });
Map.centerObject(fincas_ftc, 8);
Map.addLayer(outline, {palette: 'FF0000'}, 'microregion');
Map.addLayer(geometryPolygon, {color: '#7B68EE'}, 'region of interest');  
Map.addLayer(forest,
              {
                min: 0,
                max: 1,
                palette: 'FFFFFF,00FF00'
              },
              'forest detected ( >= ' + String(paramForest) + " )" + " for the median " , false);