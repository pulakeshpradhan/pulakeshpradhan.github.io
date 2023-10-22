var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "projects/planet-nicfi/assets/basemaps/africa"
    }) || ee.ImageCollection("projects/planet-nicfi/assets/basemaps/africa");
var image = imageCollection.select(['R', 'G', 'B', 'N']).map(function(i) { return i.resample('bicubic') }).reduce(ee.Reducer.percentile([15])).rename(['R', 'G', 'B', 'N'])
var composite = image
var water = composite.normalizedDifference(['G', 'N']).unitScale(-0.1, 0.1).selfMask()
Map.addLayer(composite, { min: 250, max: 1700, bands: ['R', 'G', 'B']})
Map.addLayer(water, { palette: ['00ffff'] })