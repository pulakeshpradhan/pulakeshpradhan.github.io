var LogoGeo = ui.import && ui.import("LogoGeo", "image", {
      "id": "users/madridyesi2000/h"
    }) || ee.Image("users/madridyesi2000/h");
var Sedimentos = ee.ImageCollection ('COPERNICUS/S2')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20)
  .reduce(ee.Reducer.median());
var B2 = Sedimentos.select ('B2_median').multiply(3);
var B4 = Sedimentos.select ('B4_median').multiply(5);
var B8 = Sedimentos.select ('B8_median').multiply (2);
var Composicion = B4.addBands(B8).addBands(B2);
Map.addLayer (Sedimentos, {bands:['B4_median', 'B8_median', 'B2_median'], max: 4000.0, min: 500, gamma: 1.0},'RGB 482');
Map.addLayer (Composicion, {max: 5000.0, min: 300, gamma: 1.0},'RGB 482 multiply');
Map.setCenter (-110.3228, 24.16966, 10); 
var subset = Map.getBounds(true)
var Start_period = ee.Date('2020-01-01')
var End_period = ee.Date(new Date().getTime())
var sentinel_dataset = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterBounds(subset)
    .filterDate(Start_period, End_period)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
var collection = sentinel_dataset.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4'])).rename('NDVI')
});
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 15, // Every 15 days
    onChange: renderDateRange
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  var vis = {min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
    '056201', '004C00', '023B01', '012E01', '011301'
  ]}  
  var layer = ui.Map.Layer(image, vis, 'NDVI')
  Map.layers().reset([layer])
}
var logo = ee.Image("users/madridyesi2000/h").visualize({
    bands:  ['b1', 'b2', 'b3'], 
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '600x291',
        format: 'png'
        },
    style: {height: '120px', width: '180px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var header = ui.Label('Sedimentos disueltos en La Paz, Baja California');
print(header);
//Definir el titulo
var TituloMapa = ui.Label({
  value: 'Sedimentos disueltos en La Paz, Baja California', // Titulo del mapa
  style: {position: 'top-left', // Posicion
  fontWeight: 'bold', // Negrita
  fontSize: '30px'}}); // TamaÃ±o de fuente
Map.add(TituloMapa);