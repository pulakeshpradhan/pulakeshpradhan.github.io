Map.setCenter(-43.96, -19.93, 5);
var dt_hoje = new Date() //data de hoje
var dt_u7d = new Date((new Date()).valueOf() - 7000*3600*24); //data de 7 dias atrás
var dt_u30d = new Date((new Date()).valueOf() - 30000*3600*24); //data de 30 dias atrás
var rmbh = ee.Geometry.Polygon(-44.535394,-20.520391,-44.689525,-20.345556,-44.517644,-20.055106,-44.581949,-19.969682,-44.505335,-19.799411,-44.524813,-19.646514,-44.392910,-19.554024,-44.143943,-19.494748,-44.000839,-19.370380,-44.049448,-19.295842,-43.872123,-19.156645,-43.861912,-19.027913,-43.704420,-19.061773,-43.732607,-19.200719,-43.617498,-19.316797,-43.497020,-19.321584,-43.457004,-19.458936,-43.509085,-19.578547,-43.489675,-19.931446,-43.661097,-20.064907,-43.640912,-20.140983,-44.111993,-20.369818,-44.161496,-20.264568)
var rmbh_buf = ee.Geometry.Point(-43.96, -19.93).buffer(45000)
//----->Coleções
var collection1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2') // coleção para a série histórica OFF de 30 dias
var st30d_no2 = collection1.filterBounds(rmbh)
  .select('tropospheric_NO2_column_number_density')
  .filterDate(dt_u30d, dt_hoje);
var collection2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2') // coleção para a série histórica NRT de 7 dias
  .select('tropospheric_NO2_column_number_density')
  .filterBounds(ee.Geometry.Point(-43.96, -19.93))
  .filterDate(dt_u7d, dt_hoje)
  .mean();
var band_viz = {
  min: 0.0000010980873178027706,
  max: 0.00015172170421796582,
  opacity:0.710000000000000,
  palette: ["9b99ff","06ffff","efff00","ffd025","ff0000","c00303"]
};
//----->Gráficos
var tempTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: st30d_no2,
  regions: rmbh,
  reducer: ee.Reducer.mean(),
  band: 'tropospheric_NO2_column_number_density',
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
//----->Painel
var panel = ui.Panel();
panel.style().set({
  height: '600px',
  width: '400px',
  position: 'top-right'
});
//----->Sentinel-2
var collection3 = ee.ImageCollection('COPERNICUS/S2') // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-06-01' ,'2020-07-30') //... chooses only pixels between the dates you define here
  .filterBounds(rmbh) // ... that are within your aoi
var medianpixels = collection3.median() // This finds the median value of all the pixels which meet the criteria. 
var medianpixelsclipped = medianpixels.clip(rmbh).divide(10000) // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1      
//----->Add
Map.add(panel);
panel.add(tempTimeSeries)
//Map.addLayer(rmbh_buf)
//Map.addLayer(rmbh)
Map.addLayer(medianpixelsclipped, {bands: ['B12', 'B11', 'B4'], min: 0, max: 1, gamma: 1.5}, 'Sentinel_2A RGB')
Map.addLayer(collection2, band_viz, 'Média Móvel 7d');