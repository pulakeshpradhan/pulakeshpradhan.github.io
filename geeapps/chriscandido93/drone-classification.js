var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-seagrasscover/assets/2B102421_2_3"
    }) || ee.Image("projects/ee-seagrasscover/assets/2B102421_2_3"),
    F03MAS092422 = ui.import && ui.import("F03MAS092422", "image", {
      "id": "projects/ee-seagrasscover/assets/F03MAS092422"
    }) || ee.Image("projects/ee-seagrasscover/assets/F03MAS092422"),
    S03BOL23 = ui.import && ui.import("S03BOL23", "image", {
      "id": "projects/ee-seagrasscover/assets/S03BOL102422_2_3"
    }) || ee.Image("projects/ee-seagrasscover/assets/S03BOL102422_2_3"),
    S03BOL24 = ui.import && ui.import("S03BOL24", "image", {
      "id": "projects/ee-seagrasscover/assets/S03BOL102422_2_4"
    }) || ee.Image("projects/ee-seagrasscover/assets/S03BOL102422_2_4"),
    F03SOR102422 = ui.import && ui.import("F03SOR102422", "image", {
      "id": "projects/ee-seagrasscover/assets/F03SOR10072022"
    }) || ee.Image("projects/ee-seagrasscover/assets/F03SOR10072022");
var generatePC = require('users/chriscandido93/droneImageClassification:pca');
var generateGrid = require('users/chriscandido93/droneImageClassification:generateGrid');
// Constants
var region = F03SOR102422.geometry(); // Drone image region
var bands = ['b1', 'b2', 'b3']; // Drone image bands
var scale = F03SOR102422.projection().nominalScale(); // Drone image scale
var scale02 = ee.Number(scale);
print (region.coordinates())
// Drone image conversion to byte
var img = F03SOR102422.select(bands).toByte(); // Convert to byte
print(img);
Map.addLayer(img, {}, 'Drone Image');
// PCA
var pc = generatePC.principalComponent(img, region, scale);
var pc1 = pc.select(['pc1']);
// Normalize PCA to [0, 255]
var minMax = pc1.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: region,
  scale: scale,
  maxPixels: 1e13
});
var min = ee.Image.constant(minMax.get('pc1_min'));
var max = ee.Image.constant(minMax.get('pc1_max'));
var scale = pc1.expression(
  '(oldval - min)*(255/(max - min))',
  {
    'oldval':pc1,
    'min': min,    
    'max': max
}).rename('scaledPC1').toByte();
Map.addLayer(scale, {}, 'PC1 Band');
// GLCM Textures 
var glcmBands = ['scaledPC1_asm', 'scaledPC1_contrast', 'scaledPC1_corr', 'scaledPC1_savg', 'scaledPC1_svar',
                'scaledPC1_var', 'scaledPC1_diss', 'scaledPC1_inertia'];
var glcm = scale.glcmTexture({size: 3}).select(glcmBands);
var glcmScaled = ee.ImageCollection.fromImages(glcm.bandNames().map(function(name){
    name = ee.String(name);
    var band = glcm.select(name);
    var minMaxBand = band.reduceRegion({
        reducer: ee.Reducer.minMax(),
        geometry: region,
        scale: 0.5,
        maxPixels: 1e13
    });
    var minStr = name.cat('_min');
    var minBand = ee.Image.constant(minMaxBand.get(minStr));
    var maxStr = name.cat('_max')
    var maxBand = ee.Image.constant(minMaxBand.get(maxStr));
    var scaledBand = band.expression(
      '(oldval - min)*(255/(max - min))',
      {
          'oldval':band,
          'min': minBand,    
          'max': maxBand
    }).toByte();
    return scaledBand;
})).toBands().rename(glcm.bandNames());
print('Scaled GLCM', glcmScaled);
// Generate image composite from orig image, glcm bands, and pca band
var composite = img.addBands(glcmScaled).addBands(scale);
print (composite);
// training region is the full image
var training = composite.sample({
  region: region,
  scale: 0.75,
  tileScale: 16,
  numPixels: 1e13 
});
// train cluster on image
var clusterer = ee.Clusterer.wekaXMeans(5, 30, 10, 1500, 1500, true, 0, 'Euclidean', 42).train(training);
// cluster the complete image
var result = composite.cluster(clusterer);
print (result);
var grid = generateGrid.createGrid(F03SOR102422, '2022-01-01', '2022-12-31');
print (grid);
// Display the clusters with random colors.
Map.addLayer(grid, {}, 'Grid');
Map.addLayer(result.randomVisualizer(), {}, 'clusters');
// Export Image
Export.image.toDrive({
  image: result,
  description: 'Drone Image',
  region: region,
  fileFormat: 'GeoTIFF',
  scale: scale,
  maxPixels:1e13,
  formatOptions: {
    cloudOptimized: true
  }
});
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: grid,
  description:'BolinaoGrid',
  fileFormat: 'SHP'
});