var sentinel2_all = ee.ImageCollection("COPERNICUS/S2"),
    sitios = ee.FeatureCollection("users/diegopons06/eea_manfredi"),
    imageVisParam = {"opacity":1,"bands":["NDVI"],"min":0.07119275717209199,"max":0.16069754076783105,"palette":["fff4e9","ffe10b","0dff09","0dff6e","15ffff","171eff","9a15ff","fb11ff","ff0757"]};
var sentinel2 = sentinel2_all.filterDate('2018-10-01', '2018-12-15').filterBounds(sitios);
//funcion de NDVI con sentinel
print (sentinel2,'sentinel2');
var QBs = function(image) {
var newImage = image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
return (newImage);
};  
//La mapeo en toda la coleccion
var S2_ndvi = sentinel2.map(QBs).select('NDVI').mean();
print (S2_ndvi,'S2_ndvi');
var ndvi = sentinel2.map(QBs).select('NDVI');
Map.addLayer(S2_ndvi, imageVisParam , 'S2_ndvi')
Map.addLayer(sitios, {min:0, max:300} , 'sitios')
Map.centerObject(sitios,14);
var tempTimeSeries_NDVI1 = ui.Chart.image.seriesByRegion(
    ndvi,sitios, ee.Reducer.mean(), 'NDVI', 200, 'system:time_start', 'Name')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'NDVI Sentinel 2 2018',
          vAxis: {title: 'NDVI'},
          lineWidth: 1,
          pointSize: 4,
          series: {
            0: {color: 'FF0000'}, // urban
            1: {color: '00FF00'}, // forest
            2: {color: '0000FF'}  // desert
}});
print(tempTimeSeries_NDVI1);