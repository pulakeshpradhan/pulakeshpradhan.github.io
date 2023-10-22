var roi1 = ui.import && ui.import("roi1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.11330494475757,
                40.53674440396192
              ],
              [
                115.11330494475757,
                40.21032336476568
              ],
              [
                115.55825123382007,
                40.21032336476568
              ],
              [
                115.55825123382007,
                40.53674440396192
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[115.11330494475757, 40.53674440396192],
          [115.11330494475757, 40.21032336476568],
          [115.55825123382007, 40.21032336476568],
          [115.55825123382007, 40.53674440396192]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/740352779/1200px"
    }) || ee.FeatureCollection("users/740352779/1200px"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.36226065744951,
            40.39589169135253
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
    ee.Geometry.Point([115.36226065744951, 40.39589169135253]);
Map.addLayer(table,'','1200px');
//var roi = /* color: #d63000 */ee.Geometry.Point([121.68, 29.20])
var imageVisParam = {"opacity":1,"bands":["Blue","Green","Red"],"min":550.7692985063155,"max":1135.1300763676509,"gamma":1};
//Map.addLayer(roi1);
// var roi = 
//     /* color: #99ff99 */
//     /* shown: false */
//     ee.Geometry.Point([115.3055722,37.80723889]);
// //115.5123389, 40.35239167 grape
//115.3055722	37.80723889石家庄玉米 SHIJIAZHUANGyumixiaomai
Map.addLayer(roi);
Map.addLayer(roi1);
var targetdate = ee.Date.fromYMD(2020,5,22);
//Map.addLayer();
var outputbands = ee.List(['Blue','Green','Red','NIR']);
// Names of the independent variables.
var independents = ee.List(['c0','c1','c2','c3','c4','c5','c6','c7','c8','c9',
'c10','c11','c12','c13','c14','c15','c16','c17','c18','c19','c20','c21','c22','c23']);
//,'c24','c25','c26','c27','c28','c29','c30','c31','c32','c33','c34','c35',
//'c36','c37','c38','c39','c40','c41','c42','c43','c44','c45']);
var numindependents=independents.length();
//roi1=ee.Geometry(roi1).bounds();
//Map.addLayer(roi1,'','roi1')
// Names of the dependent variables.
var alldependents = ee.List(['NDVI','Blue','Green','Red','NIR','SWIR1','SWIR2']);
var dependents = alldependents;
var numdependents=dependents.length();
var allvariables=independents.cat(dependents);
var constraintimage=ee.Image.constant(ee.List.repeat(0,allvariables.length())).float().rename(allvariables);
var U=ee.Array(ee.List.sequence(0,numindependents.subtract(1)));
var S=4;
var internal_h_1sqrt_4685=ee.Number(
  4.685*Math.sqrt((1-Math.sqrt(1+Math.sqrt(1+16*S))/Math.sqrt(2)/Math.sqrt(1+16*S))));
var Lambda= U.multiply(Math.PI).divide(numindependents).cos().multiply(2).add(-2);
var invGamma=Lambda.multiply(Lambda).multiply(S).add(1).divide(numindependents.sqrt().multiply(10));
invGamma[0]=0;
var iter0=ee.List.sequence(1,numindependents.subtract(1));
var constraintlist=ee.List([]);
var builtconstraint = function(i_obj, first){
  var i = ee.Number(i_obj);
  return ee.List(first).add(constraintimage.addBands(ee.Image.constant(invGamma.get([i])).float()
    .rename([independents.get(i)]),null,true));
}
var constraintlist1 = ee.List(iter0.iterate(builtconstraint,constraintlist));
//var i=0;
//for(i=1;i<46;i++){
//  constraintlist=constraintlist.add(constraintimage.addBands(ee.Image.constant(invGamma.get([i])).float()
//    .rename([independents.get(i)]),[independents.get(i)],true));
//}
//print(constraintlist);
var constraintcollection=ee.ImageCollection(constraintlist1);
dependents = ee.List(['NDVI']);
numdependents = dependents.length();
allvariables=independents.cat(dependents);
var timeField = 'system:time_start';
Map.centerObject(roi, 13);
// Use this function to add variables for NDVI, time and a constant
// to remote sensing imagery.
var dctbase00=ee.Number(2.0).divide(numindependents).sqrt();
var addVariables = function(image) {
    // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
//  var fractionyear = date.difference(ee.Date('2016-01-01'), 'year');
//  fractionyear=fractionyear.subtract(fractionyear.floor());
  var fractionyear=date.getFraction('year');
  var timeRadians = fractionyear.add(ee.Number(0.5).divide(numindependents)).multiply(Math.PI);
  var dctbase0=U.multiply(timeRadians).cos().multiply(ee.Number(2.0).divide(numindependents).sqrt());
//  dctbase0[0]=dctbase00;
  var dctbase=ee.List(dctbase0);
  return image.addBands(
    ee.Image.constant(dctbase).arrayProject([0]).arrayFlatten([independents])
    .float());
};
//print(s2surf.first());
var maskCloudsSentinel2 = function(image) {
//  return image;
  var mask = image.select('QA60').eq(0);
//  var mask = image.select('MSK_CLDPRB').lt(30);
  return image.updateMask(mask);
};
var AddCommonBandsSentinel2 = function(image) {
  var date = ee.Date(image.get(timeField));
  var commonimg = image.select(['B2','B3','B4','B8','B11','B12']).float().divide(10000)
    .rename(['Blue','Green','Red','NIR','SWIR1','SWIR2']);
  var weightimg = ee.Image.constant(date.difference(targetdate,'year').float()
    .abs().lte(0.5).float().add(0.2));
  return image.addBands(commonimg.addBands(
    commonimg.normalizedDifference(['NIR', 'Red']).rename('NDVI'))
    .addBands(weightimg.rename('Weit0'))
    .addBands(ee.Image.constant(1).rename('Weit1')).float());
//  return image.addBands(image.select(['B2','B3','B4','B8','B11','B12'])
//    .rename(['Blue','Green','Red','NIR','SWIR1','SWIR2']).float());
}
var s2surf = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterDate(targetdate.advance(-1.0,'year'),targetdate.advance(1.0,'year'))
  .filterBounds(roi1).filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',80)
  .map(AddCommonBandsSentinel2).map(addVariables).map(maskCloudsSentinel2);
var inputseries=s2surf;
// Plot a time series of NDVI at a single location.
var l8Chart = ui.Chart.image.series(inputseries.select('NDVI'), roi)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Raw NDVI time series at ROI',
      lineWidth: 1,
      pointSize: 3,
    });
print(l8Chart);
var applyweight = function(image){
  return image.select(allvariables).multiply(
  image.select('Weit0').multiply(image.select('Weit1')));
}
var iter=ee.List([1,2,3,4,5,6]);
var first1 = ee.List([inputseries,[]]);
//  Map.addLayer(ee.ImageCollection(ee.List(first1).get(0)).first());  
//  var newcollection=ee.ImageCollection(ee.List(first1).get(0))
//    .map(function(image) {
//      return image.select(allvariables).multiply(
//      image.select('Weit0').multiply(image.select('Weit1')))
//      .addBands(image.select(['Weit0','Weit1']));
//    });
var iterrativefit = function(dummy,first1){
  var obscollection=ee.ImageCollection(ee.List(first1).get(0));
  var weightedcollection=obscollection.map(applyweight);
  var dctcomposition = weightedcollection.merge(constraintcollection).select(allvariables)
    .reduce(ee.Reducer.linearRegression(numindependents, numdependents));
// Compute fitted values.
  var meanweit = weightedcollection.select('c0').reduce(ee.Reducer.mean()).divide(dctbase00);
  var rms=dctcomposition.select('residuals').arrayProject([0])
    .arrayFlatten([['RMS_NDVI']]).divide(meanweit).add(0.0001).float();
  var coef = dctcomposition.select('coefficients').matrixTranspose();
  var applyfit = function(image) {
    var fitresult= coef.matrixMultiply(image.select(independents).toArray().toArray(1)).float()
      .arrayProject([0]).arrayFlatten([['fitNDVI']]);
    var err=image.select('NDVI').subtract(fitresult.select('fitNDVI')).abs().rename('err').float();
    var threshold=rms.multiply(internal_h_1sqrt_4685).float();
    var weit=err.divide(threshold).pow(2).add(-1).pow(2)
      .multiply(err.lt(threshold).float())
      .rename('Weit1').float();
    return image.addBands(weit.addBands(fitresult).addBands(threshold).addBands(err),null,true);
  }
  var fittedcollection = obscollection.map(applyfit);
  return ee.List([fittedcollection]);
}
var finalresult = iter.iterate(iterrativefit,ee.List([inputseries]));
var fittedseries=ee.ImageCollection(ee.List(finalresult).get(0));
print(ui.Chart.image.series(
  fittedseries.select(['NDVI','fitNDVI','Weit1','RMS_NDVI','err']), roi, ee.Reducer.mean(), 10)
    .setSeriesNames(['NDVI','fitNDVI','Weit1','err_threshold','err'])
    .setOptions({
      title: 'DCT filter: NDVI, fitNDVI, Weight, threshold, err',
      lineWidth: 0.5,
      pointSize: 2,
}));
var weightedcollection=fittedseries.map(applyweight);
var dctcomposition = weightedcollection.merge(constraintcollection).select(allvariables)
    .reduce(ee.Reducer.linearRegression(numindependents, numdependents));
var coefimg = dctcomposition.select('coefficients')
  .arrayFlatten([independents, dependents])
  .multiply(5000).short();
//Map.addLayer(coefimg);
Export.image.toDrive({
   image:coefimg.clip(roi1),
   description: "finalroiNDVIcoef_",
   region: roi1,
   crs:'EPSG:32649',
   folder:'huailai',
   scale: 10,
   maxPixels:1e13
});
dependents = outputbands;
numdependents = dependents.length();
allvariables=independents.cat(dependents);
var weightedcollection=fittedseries.map(applyweight);
var dctcomposition = weightedcollection.merge(constraintcollection).select(allvariables)
    .reduce(ee.Reducer.linearRegression(numindependents, numdependents));
//Map.addLayer(fittedLandsat.first().clip(roi1));
//Map.addLayer(fittedLandsat.first().clip(roi1),{bands: ["NDVI","fitted","NDVI"],
//gamma: 1,max: 0.7112845647353884,min: 0.1506877640214842,opacity: 1});
//Map.addLayer(dctcomposition.clip(roi1),{show: false});
var coefimg = dctcomposition.select('coefficients')
  .arrayFlatten([independents, dependents])
  .multiply(5000).short();
//Map.addLayer(coefimg);
Export.image.toDrive({
   image:coefimg.clip(roi1),
   description: "finalroidctcoef_",
   region: roi1,
   folder:'huailai',
   scale: 10,
   crs:'EPSG:32649',
   maxPixels:1e13
});
var targetdate1=ee.Date.fromYMD(2020,5,02);
var fractionyear=targetdate1.getFraction('year');
var timeRadians = fractionyear.add(ee.Number(0.5).divide(numindependents)).multiply(Math.PI);
var dctbase0=U.multiply(timeRadians).cos().multiply(ee.Number(2.0).divide(numindependents).sqrt());
var dctbase=ee.List(dctbase0);
var simuimage=dctcomposition.select('coefficients').matrixTranspose()
    .matrixMultiply(ee.Image.constant(dctbase).toArray(1)).float()
    .arrayProject([0]).arrayFlatten([outputbands]);
var ndvi = simuimage.normalizedDifference(['NIR', 'Red']).rename('NDVI');
simuimage=simuimage.addBands(ndvi);
Map.addLayer(simuimage.clip(roi1),'','simu');
Export.image.toDrive({
   image:simuimage.clip(roi1),
   description: "0502simu_",
   region: roi1,
   folder:'huailai',
   scale: 10,
   crs:'EPSG:32649',
   maxPixels:1e13
});
// Export.image.toDrive({
//   image:simuimage.select('Red').clip(roi1),
//   description: "04227simu_red",
//   region: roi1,
//   folder:'smallroi',
//   scale: 10,
//   crs:'EPSG:4326',
//   maxPixels:1e13
// });
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
//var imageVisParam = {"opacity":1,"bands":["Blue","Green","Red"],"min":550.7692985063155,"max":1135.1300763676509,"gamma":1}
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
/*function maskS2clouds(image) {
  var bands=['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12'];
 var img=image.select(bands)
  return img.divide(10000);
}
*/
function divide(image) {
  var img= image.divide(10000);
  return img;
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-12-31')
                  .sort('CLOUD_COVERAGE_ASSESSMENT')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(roi)
                  .map(divide)
                  .map(addNDVI)
                  ;
print(dataset);
//var CA = dataset.sort('CLOUD_COVERAGE_ASSESSMENT').toList(1000);
var CA = dataset.toList(1000);
print(CA,'CA');
for(var i=0;i<CA.length().getInfo();i++)
{
var img1 = ee.Image(CA.get(i));
var id=img1.id();
print(id);
Export.image.toDrive({
  image:img1.clip(roi1).select(['B2','B3','B4','B8','NDVI']),
  description: "huailairgb"+id.getInfo(),
  region: roi1,
  folder:'huailai',
  scale: 10,
  crs:'EPSG:32649',
  maxPixels:1e13
    })
// Export.image.toDrive({
//   image:img1.clip(roi1).select(['B2','B3','B4','B8']),
//   description: "USLB1"+id.getInfo(),
//   region: roi1,
//   folder:'sentinel',
//   scale: 10,
//   crs:'EPSG:4326',
//   maxPixels:1e13
//     })
// 
// Export.image.toDrive({
//   image:img1.clip(roi1).select(['B4']),
//   description: "red"+id.getInfo(),
//   region: roi1,
//   folder:'smallroi',
//   scale: 10,
//   maxPixels:1e13
//     })
var visParams = {bands: ['B4', 'B3', 'B2'],min:0, max: 0.4};
//Map.addLayer(img1.select(['B2','B3','B4','B8','NDVI']),visParams, 'huailai622'+id.getInfo());
Map.addLayer(img1.clip(roi1),visParams, 'huailai622'+id.getInfo());
}
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.centerObject(roi1,5);
var roi2=ee.FeatureCollection(roi1)
Export.table.toDrive({
  collection:roi2,
   description: "huailaii",
   folder:'shp',
   fileFormat:"SHP"
})
/*Map.addLayer(dataset.median(), visualization, 'RGB');*/