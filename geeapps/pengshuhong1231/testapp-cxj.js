var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "USDA/NAIP/DOQQ"
    }) || ee.ImageCollection("USDA/NAIP/DOQQ"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -121.89511299133301,
                38.98496606984683
              ],
              [
                -121.89511299133301,
                38.909335196675435
              ],
              [
                -121.69358253479004,
                38.909335196675435
              ],
              [
                -121.69358253479004,
                38.98496606984683
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-121.89511299133301, 38.98496606984683],
          [-121.89511299133301, 38.909335196675435],
          [-121.69358253479004, 38.909335196675435],
          [-121.69358253479004, 38.98496606984683]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -108.34304809570307,
                36.66975278349341
              ],
              [
                -108.34225416183466,
                36.66977859999848
              ],
              [
                -108.34226489067072,
                36.67042400981031
              ],
              [
                -108.34308028221125,
                36.670380982657925
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-108.34304809570307, 36.66975278349341],
          [-108.34225416183466, 36.66977859999848],
          [-108.34226489067072, 36.67042400981031],
          [-108.34308028221125, 36.670380982657925]]]),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "USDA/NASS/CDL"
    }) || ee.ImageCollection("USDA/NASS/CDL"),
    cdl2016 = ui.import && ui.import("cdl2016", "image", {
      "id": "USDA/NASS/CDL/2016"
    }) || ee.Image("USDA/NASS/CDL/2016");
Map.centerObject(geometry)
Map.addLayer(ee.Image(1), {palette: "white"})
cdl2016 = cdl2016.select(0).clip(geometry)
// Normalize the CDL palette so we can reuse it in multiple places.
var palette = ee.List.sequence(0, 254).map(function(n) {
  var index = ee.List(cdl2016.get("cropland_class_values")).indexOf(n)
  return ee.Algorithms.If(ee.Algorithms.IsEqual(index, -1), 
      "000000", 
      ee.List(cdl2016.get("cropland_class_palette")).get(index))
}).getInfo()
function erode(img, distance) {
  var d = (img.not().unmask(1)
       .fastDistanceTransform(30).sqrt()
       .multiply(ee.Image.pixelArea().sqrt()))
  return img.updateMask(d.gt(distance))
}
function dilate(img, distance) {
  var d = (img.fastDistanceTransform(30).sqrt()
       .multiply(ee.Image.pixelArea().sqrt()))
  return d.lt(distance)
}
function expandSeeds(seeds) {
  seeds = seeds.unmask(0).focal_max()
  return seeds.updateMask(seeds)
}
var bands = ["R", "G", "B", "N"]
var img = imageCollection
    .filterDate('2015-01-01', '2017-01-01')
    .filterBounds(geometry)
    .mosaic()
img = ee.Image(img).clip(geometry).divide(255).select(bands)
Map.addLayer(img, {gamma: 0.8}, "RGBN", false)
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(36);
// Build and train a classifer using point values from the seed locations.
var points = img.addBands(cdl2016).updateMask(seeds).sample(geometry, 5)
var classifier = ee.Classifier.randomForest(10).train(points, "cropland")
Map.addLayer(img.classify(classifier), {min:0, max:254, palette: palette}, "Classified image", false)
// Apply a softening.
var kernel = ee.Kernel.gaussian(3)
img = img.convolve(kernel)
Map.addLayer(img, {gamma: 0.8}, "RGBN blur", false)
// Compute and display NDVI, NDVI slices and NDVI gradient.
var ndvi = img.normalizedDifference(["N", "R"])
// print(ui.Chart.image.histogram(ndvi, geometry, 10))
Map.addLayer(ndvi, {min:0, max:1, palette: ["black", "tan", "green", "darkgreen"]}, "NDVI", false)
Map.addLayer(ndvi.gt([0, 0.2, 0.40, 0.60, 0.80, 1.00]).reduce('sum'), {min:0, max: 6}, "NDVI steps", false)
var ndviGradient = ndvi.gradient().pow(2).reduce('sum').sqrt()
Map.addLayer(ndviGradient, {min:0, max:0.01}, "NDVI gradient", false)
// print(ui.Chart.image.histogram(ndviGradient, geometry, 10))
// Compute spectralGradients.
var gradient3 = ee.Image.cat(
  img.spectralGradient('sam'),
  img.spectralGradient('sid'),
  img.spectralGradient('sed'))
Map.addLayer(gradient3, {min:[0.1, 0.1, 0.01], max:[0.3, 0.3, 0.1]}, "gradient3", false)
var gradient = img.spectralErosion().spectralGradient('emd')
Map.addLayer(gradient, {min:0, max: 0.3}, "emd", false)
// Try to create seeds in important places by finding points that are local minima/maxima in the gradient.
// This didn't work out too great.
var d1 = gradient.lt(0.2).fastDistanceTransform().sqrt().aside(Map.addLayer, {}, "d1", false)
var d2 = gradient.gt(0.2).fastDistanceTransform().sqrt().aside(Map.addLayer, {}, "d2", false)
var minima = d1.gt(3).and(d1.eq(d1.focal_max())).rename("seeds")
minima = minima.updateMask(minima).aside(Map.addLayer, {palette: "red"}, "minima", false)
var maxima = d2.gt(10).and(d2.eq(d2.focal_max())).rename("seeds")
maxima = maxima.updateMask(maxima).aside(Map.addLayer, {palette: "cyan"}, "maxima", false)
// Combine the minima and maxima to produce a layer of seeds.
var plusSeeds = ee.ImageCollection([minima, maxima]).mosaic()
plusSeeds = erode(dilate(plusSeeds, 30), 30)
// Run SNIC on the regular square grid.
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: img, 
  size: 32,
  compactness: 5,
  connectivity: 8,
  neighborhoodSize:256,
  seeds: seeds
}).select(["R_mean", "G_mean", "B_mean", "N_mean", "clusters"], ["R", "G", "B", "N", "clusters"])
var clusters = snic.select("clusters")
Map.addLayer(clusters.randomVisualizer(), {}, "clusters")
Map.addLayer(snic, {bands: ["R", "G", "B"], min:0, max:1, gamma: 0.8}, "means", false)
// Build and train a classifer using the seed points.
var points2 = snic.select(bands).addBands(cdl2016).updateMask(seeds).sample(geometry, 5)
var classifier2 = ee.Classifier.randomForest(10).train(points2, "cropland")
Map.addLayer(snic.classify(classifier2), {min:0, max:254, palette: palette}, "Classified clusters", false)
Map.addLayer(expandSeeds(seeds), {palette: "white"}, "seeds")
// Compute per-cluster stdDev.
var stdDev = img.addBands(clusters).reduceConnectedComponents(ee.Reducer.stdDev(), "clusters", 256)
Map.addLayer(stdDev, {min:0, max:0.1}, "StdDev")
// Display outliers as transparent
var outliers = stdDev.reduce('sum').gt(0.25)
Map.addLayer(outliers.updateMask(outliers.not()), {}, "Outliers", false)
// Within each outlier, find most distant member.
var distance = img.select(bands).spectralDistance(snic.select(bands), "sam").updateMask(outliers)
var maxDistance = distance.addBands(clusters).reduceConnectedComponents(ee.Reducer.max(), "clusters", 256)
Map.addLayer(distance, {min:0, max:0.3}, "max distance")
Map.addLayer(expandSeeds(expandSeeds(distance.eq(maxDistance))), {palette: ["red"]}, "second seeds")
var newSeeds = seeds.unmask(0).add(distance.eq(maxDistance).unmask(0))
newSeeds = newSeeds.updateMask(newSeeds)
// Run SNIC again with both sets of seeds.
var snic2 = ee.Algorithms.Image.Segmentation.SNIC({
  image: img, 
  size: 32,
  compactness: 5,
  connectivity: 8,
  neighborhoodSize: 256,
  seeds: newSeeds
}).select(["R_mean", "G_mean", "B_mean", "N_mean", "clusters"], ["R", "G", "B", "N", "clusters"])
var clusters2 = snic2.select("clusters")
Map.addLayer(clusters2.randomVisualizer(), {}, "clusters 2")
Map.addLayer(snic2, {bands: ["R", "G", "B"], min:0, max:1, gamma: 0.8}, "means", false)
// Compute outliers again.
var stdDev2 = img.addBands(clusters2).reduceConnectedComponents(ee.Reducer.stdDev(), "clusters", 256)
Map.addLayer(stdDev2, {min:0, max:0.1}, "StdDev 2")
var outliers2 = stdDev2.reduce('sum').gt(0.25)
outliers2 = outliers2.updateMask(outliers2.not())
Map.addLayer(outliers2, {}, "Outliers 2", false)
// Show the final set of seeds.
Map.addLayer(expandSeeds(newSeeds), {palette: "white"}, "newSeeds")
Map.addLayer(expandSeeds(distance.eq(maxDistance)), {palette: ["red"]}, "second seeds")
// Area, Perimeter, Width and Height (using snic1 for speed)
var area = ee.Image.pixelArea().addBands(clusters).reduceConnectedComponents(ee.Reducer.sum(), "clusters", 256)
Map.addLayer(area, {min:50000, max: 500000}, "Cluster Area")
var minMax = clusters.reduceNeighborhood(ee.Reducer.minMax(), ee.Kernel.square(1))
var perimeterPixels = minMax.select(0).neq(minMax.select(1)).rename('perimeter');
Map.addLayer(perimeterPixels, {min: 0, max: 1}, 'perimeterPixels');
var perimeter = perimeterPixels.addBands(clusters)
    .reduceConnectedComponents(ee.Reducer.sum(), 'clusters', 256);
Map.addLayer(perimeter, {min: 100, max: 400}, 'Perimeter size', false);
var sizes = ee.Image.pixelLonLat().addBands(clusters).reduceConnectedComponents(ee.Reducer.minMax(), "clusters", 256)
var width = sizes.select("longitude_max").subtract(sizes.select("longitude_min"))
var height = sizes.select("latitude_max").subtract(sizes.select("latitude_min"))
Map.addLayer(width, {min:0, max:0.02}, "Cluster width")
Map.addLayer(height, {min:0, max:0.02}, "Cluster height")