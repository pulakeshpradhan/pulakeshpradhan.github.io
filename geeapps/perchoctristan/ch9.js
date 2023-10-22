// Define a function to calculate indices and create legends
function calculateIndicesAndLegends(roi) {
  // Load Sentinel-2 images for 2022
  var collection2022 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(roi)
    .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 5))
    .filterDate('2023-06-25', '2023-07-10');
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
    .filterDate('2022-06-20', '2022-07-10');
  // Calculate the Normalized Difference Vegetation Index (NDVI) for 2023
  var ndvi2023 = collection2023.map(function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi);
  });
  // Calculate the mean of the Normalized Difference Vegetation Index (NDVI) for 2023
  var meanNDVI2023 = ndvi2023.select('NDVI').mean().clip(roi);
  // Calculate the difference between the mean NDVI of 2023 and 2022
  var ndviDifference = meanNDVI2023.divide(meanNDVI2022);
  // Create legends
  // Create legends
  var legends = [
    {layer: meanNDVI2022.select('NDVI'), title: 'Indice de végétation', min: 0.07, max: 0.31, palette: ['#8c510a','#d8b365',  '#c7eae5','#5ab4ac','#01665e']},
    {layer: meanNDTI2022.select('NDTI'), title: 'Indice de température', min: 0.003, max: 0.16, palette: ['white','#ca0020','#f4a582', '#f7f7f7', '#92c5de', '#0571b0']},
    {layer: waterIndex2022, title: "Indice d'humidité", min: 0.0, max: 1.59, palette: ['red','#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#2c7fb8','#253494']},
    {layer: ndviDifference.select('NDVI'), title: 'Evolution / 2022', min: 0.56, max: 0.97, palette: ['#b2182b','#ef8a62','#fddbc7','#d1e5f0','#67a9cf','#2166ac']}
  ];
  // Create a map
  var map = ui.Map({style: {width: '1500px', height: '600px'}});
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
var coord = [[4.841130630822219,43.996792324445806],[4.867223160119094,44.01210305115737],[4.884389297814407,44.03876391219237]
,[4.887822525353469,44.05603769526415]
,[4.886449234337844,44.06343920307403]
, [4.873402969689407,44.0920496608845]
, [4.878896133751907,44.096487974807985]
, [4.876149551720657,44.11670274521387]
, [4.858983414025344,44.11670274521387]
, [4.839070694298782,44.12261795561271]
, [4.837010757775344,44.10980091794022]
, [4.811604873986282,44.11473087681402]
, [4.804051773400344,44.10881487681572]
, [4.782634718390519,44.08653047491905]
, [4.797054274054582,44.068278870847465]
, [4.799800856085832,44.05939767652354]
, [4.825206739874894,44.037188861644076]
, [4.840312941046769,44.02089710507112]
, [4.847179396124894,44.00953959626123]
, [4.841130630822219,43.996792324445806]]
var roi = ee.Geometry.Polygon(coord);
// Calculate indices and create legends for the given ROI
calculateIndicesAndLegends(roi);