var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1},
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/perchoctristan/ventouxtot"
    }) || ee.FeatureCollection("users/perchoctristan/ventouxtot");
var ventoux= (roi.geometry());
// Define a function to calculate indices and create legends
function calculateIndicesAndLegends(roi) {
  // Load Sentinel-2 images for 2022
  var collection2022 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(roi)
    .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 5))
    .filterDate('2023-07-20', '2023-08-09');
  // Calculate the Normalized Difference Vegetation Index (NDVI) for 2022
  var ndvi2022 = collection2022.map(function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi);
  });
  // Calculate the Normalized Difference Temperature Index (NDTI) for 2022
  var ndti2022 = collection2022.map(function(image) {
    var ndti = image.normalizedDifference(['B11', 'B12']).rename('NDTI');
    return image.addBands(ndti);
  });
  // Calculate the mean of the Normalized Difference Vegetation Index (NDVI) for 2022
  var meanNDVI2022 = ndvi2022.mean().clip(roi);
  // Calculate the mean of the Normalized Difference Temperature Index (NDTI) for 2022
  var meanNDTI2022 = ndti2022.mean().clip(roi);
  // Calculate the Water Index (WI) using NDVI
  var waterIndex2022 = meanNDVI2022.expression('(b("NDVI") - 0.1) / (0.3 - 0.1)').rename('WaterIndex');
  // Load Sentinel-2 images for 2023
  var collection2023 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(roi)
    .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 5))
    .filterDate('2022-07-20', '2022-08-09');
  // Calculate the Normalized Difference Vegetation Index (NDVI) for 2023
  var ndvi2023 = collection2023.map(function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi);
  });
  // Calculate the mean of the Normalized Difference Vegetation Index (NDVI) for 2023
  var meanNDVI2023 = ndvi2023.select('NDVI').mean().clip(roi);
  // Calculate the difference between the mean NDVI of 2023 and 2022
  var ndviDifference = meanNDVI2022.divide(meanNDVI2023);
  // Create legends
  var legends = [
    {layer: meanNDVI2022.select('NDVI'), title: 'Indice de végétation', min: 0.18, max: 0.44, palette: ['#8c510a','#d8b365',  '#c7eae5','#5ab4ac','#01665e']},
    {layer: meanNDTI2022.select('NDTI'), title: 'Indice de température', min: 0.06, max: 0.19, palette: ['#ca0020','#f4a582', '#f7f7f7', '#92c5de', '#0571b0']},
    {layer: waterIndex2022, title: "Indice d'humidité", min: 0.9, max: 1.64, palette: ['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']},
    {layer: ndviDifference.select('NDVI'), title: 'Evolution / 2022', min: 0.8, max: 1.2, palette: ['#d53e4f','#fc8d59','#fee08b','#e6f598','#99d594','#3288bd']}
  ];
  // Create a map
  var map = ui.Map({style: {width: '1600px', height: '600px'}});
map.setOptions('HYBRID'); // Changer le fond de carte en satellite
  map.centerObject(roi, 10);
  // Add layers and legends to the map
  legends.forEach(function(legend) {
    map.addLayer(legend.layer, {min: legend.min, max: legend.max, palette: legend.palette}, legend.title);
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: {
        bbox: [legend.min, 0, legend.max, 1],
        dimensions: '200x20',
        format: 'png',
        min: legend.min,
        max: legend.max,
        palette: legend.palette
      },
      style: {stretch: 'horizontal', margin: '0px 8px'}
    });
    var legendPanel = ui.Panel({
      widgets: [
        ui.Label(legend.title, {fontWeight: 'bold'}),
        colorBar
      ],
      style: {position: 'bottom-right'}
    });
    map.add(legendPanel);
  });
  // Create a panel for the map
  var mapPanel = ui.Panel({style: {width: '1600px', height: '600px'}});
  mapPanel.add(map);
  // Add the map panel to the UI
  ui.root.clear();
  ui.root.add(mapPanel);
}
var coord= [[5.106140943815816,44.24729957770049],[5.067688795378316,44.219748515284834],[4.990784498503316,44.062066449702094], [5.100647779753316,43.85843070845509]
,[5.523621412565816,43.832679508727075]
,[5.622498365690816,43.93561760611692]
, [5.452210279753316,43.959347290777075]
, [5.224243971159566,43.9830675019824]
, [5.328614088347066,44.00282710778314]
, [5.202271314909566,44.237461393228266]
, [5.106140943815816,44.24729957770049]]
var roi = ee.Geometry.Polygon(coord);
// Calculate indices and create legends for the given ROI
calculateIndicesAndLegends(roi);