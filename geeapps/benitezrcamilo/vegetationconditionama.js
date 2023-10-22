var roi = ui.import && ui.import("roi", "table", {
      "id": "users/benitezrcamilo/carbono_ama/espacios_verdes_publico_privado"
    }) || ee.FeatureCollection("users/benitezrcamilo/carbono_ama/espacios_verdes_publico_privado");
Map.centerObject(roi, 12)
var spectral = require("users/dmlmont/spectral:spectral");
var dataset = "COPERNICUS/S2_SR_HARMONIZED";
// //Print all indexes
// print(spectral.indices)
// //Print bands required
// print(spectral.indices.EVI2.bands);
// //Check parameters description
// print(spectral.constants);
// //Check index formula
// print(spectral.indices.EVI2.formula)
//Function to mask clouds in S2 dataset
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = ee.Number(2).pow(10).int();
var cirrusBitMask = ee.Number(2).pow(11).int();
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
// FUNCTION TO MAP OVER AN IMAGE COLLECTION
function addIndices(img) {
  // REQUIRED PARAMETERS ACCORDING TO THE REQUIRED BANDS
  var parameters = {
    "N": img.select("B8"),
    "N2":img.select("B8A"),
    "R": img.select("B4"),
    "g": 2.5,
    "RE1": img.select("B5"),
    "L": 1
  };
  // SCALE THE IMAGE
  img = spectral.scale(img,dataset);
  // COMPUTE THE NDVI, GNDVI and SeLI
  return spectral.computeIndex(img,["EVI2","NDVI","SeLI"],parameters);
}
/////////////////
var ESA = ee.ImageCollection("ESA/WorldCover/v200").first();
// Clip the land cover to the boundary
var ESA_LC_2021 = ESA.clip(roi);
// Extract forest areas from the land cover
var mask = ESA_LC_2021.updateMask(
  ESA_LC_2021.neq(50)// Only keep pixels where class equals 2
);
  mask = mask.updateMask(mask.neq(80))
Map.addLayer(mask,{},"ESA Land Cover 2021",false)
// DATASET TO USE: SENTINEL-2 SR
var S2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(roi)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 5)
  .sort('CLOUDY_PIXEL_PERCENTAGE')
  .map(maskS2clouds)
  .map(addIndices)// Mapping indices;
  //.filterDate('2018-01-01','2022-01-01')
    S2 = S2.map(function(img) {
      var pixel = img;
      return pixel.mask(mask)})
//Map.addLayer(S2.first())
  //Proj
var projection = ee.Image(S2.first().select("B3")).projection()
  //Get crs transformation
  var transf = projection.getInfo().transform
// Filter S2 images to summer months between Jan and Apr 2000-2019,
// Add observation year as an image property.
var s2Summer = S2.filter(ee.Filter.calendarRange(5,8, 'month'))
  .filter(ee.Filter.calendarRange(2016, 2022, 'year'))
  .map(function(img) {
    return img.set('year', img.date().get('year'))
  });
//print(s2Summer)
// Generate lists of images from the year using a join.
var s2SummerAnnualJoin = ee.Join.saveAll('same_year').apply({
  primary: s2Summer.distinct('year'),
  secondary: s2Summer,
  condition: ee.Filter.equals({leftField: 'year', rightField: 'year'})
});
// Calculate annual max EVI composite images from the "same year" join lists.
// Return an image with two bands for use in time series slope calculation;
// year as band 1, max EVI as band 2.
var summerStats = ee.ImageCollection(s2SummerAnnualJoin.map(function(img) {
  var year = img.get('year');
  var yearCol = ee.ImageCollection.fromImages(img.get('same_year'));
  var max = yearCol.select('EVI2').max();
  var yr = ee.Image.constant(ee.Number(year)).toShort();
  return ee.Image.cat(yr, max).rename(['year', 'max']).set('year', year);
}));
// Calculate time series slope using sensSlope().
var sens = summerStats.reduce(ee.Reducer.sensSlope());
// Define a function to calculate a histogram of slope values to be calculated
// for each park; defining a custom histogram function instead of using
// ui.Chart.image.histogram because it does not allow baseline to be set as 0,
// which is important when evaluating positive and negative slope frequency.
function getHistogram(sensImg, geometry, title) {
  // Calculate histogram as an ee.Array table.
  var hist = sensImg.select('slope').reduceRegion({
    reducer: ee.Reducer.autoHistogram(),
    geometry: geometry,
    scale: 10,
    maxPixels: 1e13,
  });
  // Get the array and extract the bin column and pixel count columns.
  var histArray = ee.Array(hist.get('slope'));
  var binBottom = histArray.slice(1, 0, 1);
  var nPixels = histArray.slice(1, 1, null);
  // Chart the two arrays using the `ui.Chart.array.values` function.
  var histColumnFromArray =
    ui.Chart.array.values({array: nPixels, axis: 0, xLabels: binBottom})
      .setChartType('LineChart')
      .setOptions({
        title: title + ' - forest condition trend histogram',
        hAxis: {title: 'Slope'},
        vAxis: {title: 'Pixel count'},
        pointSize: 0,
        lineSize: 2,
        colors: ['1b7837'],
        legend: {position: 'none'}
      });
  return histColumnFromArray;
}
// Get the slope histogram charts and print them to the console per park.
// print(getHistogram(
//   sens, roi.filter(ee.Filter.eq('cartodb_id', 2)), 'Jardín Botánico'));
// print(getHistogram(
//   sens, roi.filter(ee.Filter.eq('cartodb_id', 41)),
//   'Bahía de Asunción'));
var histo1 = getHistogram(sens, roi.filter(ee.Filter.eq('cartodb_id', 2)), 'Jardín Botánico');
var histo2 = getHistogram(sens, roi.filter(ee.Filter.eq('cartodb_id', 41)), 'Bahía de Asunción');
// Infer pixel-wise vegetation condition based on sign of the slope.
var cond = ee.Image.cat(sens.select('slope').gt(0).rename('greening'),
                        sens.select('slope').lt(0).rename('browning'));
// Calculate area under greening and browning in each national park.
var npsRes = cond.multiply(ee.Image.pixelArea())
                 .reduceRegions(roi, ee.Reducer.sum(), 10);
// Format results of the greening and browning for use in a table; convert sq m
// to sq km and calculate fraction of each; add as feature properties.
npsRes = npsRes.map(function(feature) {
  var browningSqM = feature.getNumber('browning');
  var greeningSqM = feature.getNumber('greening');
  var forestSqM = feature.area();
  return feature.set({
    'Browning sq km': browningSqM.divide(1e6),
    'Browning fraction': browningSqM.divide(forestSqM),
    'Greening sq km': greeningSqM.divide(1e6),
    'Greening fraction': greeningSqM.divide(forestSqM),
  });
});
// Display area summary of vegetation condition as a table "chart".
// print(ui.Chart.feature.byFeature(npsRes.select(['cartodb_id', 'Browning sq km',
//     'Browning fraction', 'Greening sq km', 'Greening fraction']),
//     'cartodb_id')
//   .setChartType('Table'));
var chart1 = ui.Chart.feature.byFeature(npsRes.select(['cartodb_id', 'Browning sq km',
                                        'Browning fraction', 'Greening sq km', 'Greening fraction']),
                                        'cartodb_id').setChartType('Table');
// Prepare to display vegetation condition to the map; set map display options.
Map.setOptions('SATELLITE');
// Set visualisation parameters for greening and browning areas; display to map.
var visParams = {
  opacity: 1,
  bands: ['slope'],
  min: -0.3,
  max: 0.3,
  palette:
    ['8c510a', 'd8b365', 'f6e8c3', 'f5f5f5', 'd9f0d3', '7fbf7b', '1b7837']
};
Map.addLayer(sens.clipToCollection(roi), visParams, 'Sen\'s slope');
// Export.image.toAsset({image: sens.clipToCollection(roi), description: 'evi2_sens', 
//                       scale: 10,
//                       pyramidingPolicy: {'.default': 'mode'},
//                       crs: projection,
//                       crsTransform: transf,
//                       maxPixels: 1e13, 
//                       region: roi.geometry()});
// Export.image.toDrive({
//   image: sens.clipToCollection(roi),
//   description: 'evi2_sens',
//   crs: projection,
//   crsTransform: transf,
//   maxPixels:1e13,
//   skipEmptyTiles:true,
//   folder: "AMA",
//   region:roi.geometry()})
// Draw national park boundaries to the map.
var paimg = ee.Image().byte().paint(roi, 0, 2);
Map.addLayer(paimg, {palette: '000000'}, 'AMA Urban Parks');
// // Plot trend in EVI data by national park and year.
// print(ui.Chart.image
//           .seriesByRegion({
//             imageCollection: summerStats,
//             regions: roi,
//             reducer: ee.Reducer.median(),
//             band: 'max',
//             scale: 10,
//             xProperty: 'year',
//             seriesProperty: 'cartodb_id'
//           })
//           .setChartType('ScatterChart')
//           .setOptions({
//             title: 'Greening/browning trend in forest national parks',
//             vAxis: {title: 'Median of max. summer EVI2'},
//             hAxis: {title: 'Year', format: '####'},
//             lineWidth: 2,
//             pointSize: 0,
//             series: {0: {color: 'ff0000'}, 1: {color: '0000ff'}}
//           }));
var chart2 = ui.Chart.image
            .seriesByRegion({
            imageCollection: summerStats,
            regions: roi,
            reducer: ee.Reducer.median(),
            band: 'max',
            scale: 10,
            xProperty: 'year',
            seriesProperty: 'cartodb_id'
          })
            .setChartType('ScatterChart')
            .setOptions({
            title: 'Greening/browning trend in forest national parks',
            vAxis: {title: 'Median of max. summer EVI2'},
            hAxis: {title: 'Year', format: '####'},
            lineWidth: 2,
            pointSize: 0,
            series: {0: {color: 'ff0000'}, 1: {color: '0000ff'}}
          });
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
      .add(ui.Label('El mapa muestra los patrones de enverdecimiento/pardeamiento de la vegetación lo cual indica patrones de incremento o decrecimiento de la actividad fotosintética de la vegetación en un periodo establecido. Valores positivos indican un incremento mientras que los negativos una disminución, el O indica que no hubo variación'))
      .add(ui.Label('Histogramas de la condición de la cobertura vegetal del JBZA utilizando de base el indice de vegetación mejorado EVI2 para el periodo 2016-2022.'))
      .add(histo1)
      .add(ui.Label('Histogramas de la condición de la cobertura vegetal de la Bahía de Asunción utilizando de base el indice de vegetación mejorado EVI2 para el periodo 2016-2022.'))
      .add(histo2)
      .add(ui.Label('Tabla de datos obtenidos para todas las áreas verdes analizadas.'))
      .add(chart1);    
ui.root.add(panel);