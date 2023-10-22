var aoi = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-71.22001887182579, -52.06356017822381],
          [-71.22001887182579, -53.58362744884622],
          [-68.07792902807579, -53.58362744884622],
          [-68.07792902807579, -52.06356017822381]]], null, false);
// Map options
Map.setOptions('SATELLITE')
// Visualization
var visualization = {
  bands: ['EVI'],
  min: -0.03,
  max: 0.70,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]
};
// Application
Map.setCenter(-69.7215, -52.6149, 10)
var coll = ee.Image('projects/ee-gerardosoto/assets/EVI-Magallanes')
Map.addLayer(coll.select('EVI'), visualization, 'NDVI_2022/2023', 1);
// Export.image.toAsset({image: coll.select('EVI'), 
//   description: 'EVI-Magallanes', 
//   assetId: 'EVI-Magallanes', 
//   region: aoi, 
//   scale: 30, 
//   maxPixels: 1e11})