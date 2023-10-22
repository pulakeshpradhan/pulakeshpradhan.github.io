var PRP = ee.FeatureCollection("users/bagnato/InventariosVeg/PRP")
Map.setOptions("SATELLITE")
Map.setCenter(-59.95, -33.686, 6)
var landcover = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
                .filterDate('2019-01-01', '2019-12-31')
                .select("discrete_classification").first()
//Map.addLayer(landcover.randomVisualizer(), {}, 'Land use ');
var pastizales_mask = landcover.eq(30)
var pastizales = landcover.updateMask(pastizales_mask).clip(PRP)
//print(pastizales, "pastizales")
Map.addLayer(pastizales,null,  'Pastizales RP');
////////////////////////////////////////////
//Estimación área quemada histórica
var area_quemada = ee.ImageCollection("ESA/CCI/FireCCI/5_1")
                  .filterDate('2001-01-01', '2020-12-31')
                  .select(['BurnDate'])
                  .map(function(img) {return img.updateMask(pastizales)});
//función para identificar fuego/no fuego
function mask_filter(image) {
  var mask = image.gt(0).copyProperties(image, ['system:time_start', 'system:time_end'])
  return mask;
}
var datase = area_quemada.map(mask_filter)
/////////////////////////////////////////////////////////
//Funciones para calcular estadisticas por año/mes
var years = ee.List.sequence(2001,2019)
var months = ee.List.sequence(1, 12);
//Por año y por mes
var TS_fire =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
      var w = datase.filter(ee.Filter.calendarRange(y, y, 'year'))
                                  .filter(ee.Filter.calendarRange(m, m, 'month'))
                                  .sum()
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
print(TS_fire,"TS_fire")
var chartbyYear = ui.Chart.image.seriesByRegion({
  imageCollection: TS_fire, 
  regions: PRP,
  reducer: ee.Reducer.count(),
  band: 'BurnDate',
  scale: 250,
  seriesProperty: 'Nan',
  xProperty: 'system:time_start'
}).setOptions({title: 'Fire count',
lineWidth: 1,
pointSize: 3})
  .setChartType('ColumnChart');
print(chartbyYear);
//Por mes
var Monthly_fire =  ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = TS_fire.filter(ee.Filter.eq('month', m)).mean();
    return w.set('month', m)
            .set('system:time_start',ee.Date.fromYMD(1, m, 1)); 
  }).flatten()
);
print(Monthly_fire,"Monthly_fire")
var title = {
  title: 'Fuegos promedio por mes 2001-2020 ',
  hAxis: {title: 'Mes'},
  vAxis: {title: 'Cantidad de pixeles'},
};
var chartMonthly = ui.Chart.image.seriesByRegion({
  imageCollection: Monthly_fire, 
  regions: PRP,
  reducer: ee.Reducer.count(),
  band: 'BurnDate',
  scale: 250,
  seriesProperty: 'Nan',
  xProperty: 'month'
}).setOptions(title)
  .setChartType('ColumnChart');
print(chartMonthly);
//Por año --------------------------------------
var annualfire = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = TS_fire
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
var title = {
  title: 'Fuegos por año (2001-2020) ',
  hAxis: {title: 'Año'},
  vAxis: {title: 'Cantidad de pixeles'},
};
var chartYaerly = ui.Chart.image.seriesByRegion({
  imageCollection: annualfire, 
  regions: PRP,
  reducer: ee.Reducer.count(),
  band: 'BurnDate',
  scale: 250,
  seriesProperty: 'Nan',
  xProperty: 'year'
}).setOptions(title)
  .setChartType('ColumnChart');
print(chartYaerly);
var Fuegos_totales = annualfire.sum().clip(PRP)
var area = Fuegos_totales.multiply(ee.Image.pixelArea().divide(10000))
var areafuego = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: PRP,
  scale: 250,
  crs: "EPSG:4326",
  maxPixels: 1e12
})
var areatotal = ee.Number(areafuego)
print(areatotal,"Area fuego (ha)")
var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area().divide(100 * 100)});
};
var area_region_interes = PRP.map(addArea)
print('area PRP (ha): ', area_region_interes);
var visparams3 = {
    max: 141,
    min: 1,
    opacity: 1,
    palette: ["#ffffff","#ff0000"]}
Map.addLayer(Fuegos_totales, visparams3, 'fuegos totales');