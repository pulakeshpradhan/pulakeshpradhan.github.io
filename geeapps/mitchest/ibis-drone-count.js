var ortho = ee.Image("users/mitchest/drone-nest-count/eulimbah_ortho"),
    nest_classification = ee.Image("users/mitchest/drone-nest-count/eulimbah_nest_classification"),
    nests = ee.FeatureCollection("users/mitchest/drone-nest-count/eulimbah_manual_nests"),
    centre_point = /* color: #d63000 */ee.Geometry.Point([144.19501931385093, -34.54912801362985]);
/*var nest_map = ee.ImageCollection([nests_east, nests_west])
                  .mosaic()
                  .clip(geometry)
                  .selfMask()
var nest_map_out = nest_map.updateMask(nest_map.connectedPixelCount(9, false).gte(9)).selfMask()
Export.image.toAsset({
  image: nest_map_out, 
  description: "eulimbah_nest_classification",
  region: export_geo,
  scale: 0.1,
  maxPixels: 1e13
})
var nests = ee.FeatureCollection("ft:17r4vPjHR2_uv2Vv2dDfjlMyvykpAr6tJ4m_Jm_9i") //identified nests
Export.table.toAsset(nests, "eulimbah_manual_nests")*/
var calculate_predictors = function () {
  // Create a more normalised brightness image
  var white = ortho.select('b1').add(ortho.select('b2').divide(ortho.select('b3'))).rename('white')
  // Local image 'topography' through laplacian kernel
  var white_lapl8 = white.convolve(ee.Kernel.laplacian8())
  // metrics to try distinguish vegetation (awesome if you fly a multispec sensor)
  var grvi = ortho.expression(
    '(g - r) / (g + r)', {
      'g': ortho.select('b2'),
      'r': ortho.select('b1')
    }).rename('grvi')
  var gbri = ortho.expression(
    'g / (b + g + r)', {
      'b': ortho.select('b3'),
      'g': ortho.select('b2'),
      'r': ortho.select('b1')
    }).rename('gbri')
  // glcm metrics on the ortho image (can choose when to do on normalised image and/or ortho data)
  var white_glcm = white.toUint16().glcmTexture({ size: 1 }).select(1, 3, 4, 16)
  var blue_glcm = ortho.select('b3').glcmTexture({ size: 1 }).select(16)
  var boxcar = ee.Kernel.square({
    radius: 5, units: 'pixels', normalize: true
  })
  var blue_glcm_smooth = blue_glcm.convolve(boxcar).rename('blue_glcm')
  // add trianing data at this point together
  var train_composite = white.addBands([white_lapl8, grvi, gbri, white_glcm, blue_glcm_smooth])
  train_composite = train_composite.addBands(ortho)
  // This feature is about the stdDeviation in a circle around the point
  train_composite = train_composite.addBands([2, 7].map(
    function (r) {
      return train_composite.select(['gbri', 'white_shade']).reduceNeighborhood({
        reducer: ee.Reducer.stdDev(),
        kernel: ee.Kernel.circle(r)
      })// .rename('circle_r_' + r)
    }))
  //print(train_composite.bandNames())
  // try a difference of gaussians (dog) edge detection kernel on the white ortho image
  // this is the kernel
  var dog = ee.Kernel.gaussian(4, 3, "pixels", false).add(ee.Kernel.gaussian(3, 0.5, "pixels", false, -1))
  // apply
  var dog_1 = train_composite.select('white_shade_stdDev').convolve(dog).rename('dog1')
  // iterate the dog
  var dog_2 = dog_1.convolve(dog).rename('dog2')
  return train_composite.addBands([dog_1, dog_2])
}
var predictor_variables = calculate_predictors()
/*Map.centerObject(centre_point, 22)
Map.addLayer(ortho, {min: 80, max: 190}, "Drone image data", true)
Map.addLayer(nests, {color: 'fc9272'}, "Manually identified nests", true)
Map.addLayer(nest_classification, {palette: ['de2d26'], min: 1, max: 30}, "Nest classification", true)
Map.addLayer(predictor_variables, {}, "Predictor variables", true)*/
/*
Set up the split screen slider
*/
// Make the first map layer
Map.addLayer(ortho, {min: 80, max: 190}, "Drone image data", true)
Map.addLayer(nests, {color: 'fc9272'}, "Manually identified nests", true)
// Make another map and add same data to it
var linkedMap = ui.Map()
linkedMap.addLayer(predictor_variables, {bands: ['gbri_stdDev','white_shade_stdDev_1','white_shade_stdDev'], min: 228, max: 2467}, "Predictor variables", true)
linkedMap.addLayer(nest_classification, {palette: ['de2d26'], min: 1, max: 1}, "Nest classification", false)
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap])
/*// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}})
linkedMap.add(inset)
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds())
  inset.centerObject(bounds)
  inset.layers().set(0, bounds)
})*/
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
})
// Side panel setup
var colors = {'gray': '#F8F9FA'}
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '28px',
  padding: '10px',
  color: '#252525',
  backgroundColor: colors.gray,
}
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#525252',
  padding: '8px',
  backgroundColor: colors.gray,
}
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)'
function makeSidePanel(mapToUpdate) {
  // Create the base side panel, into which other widgets will be added
  var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '40%',
      width: '200px',
      backgroundColor: colors.gray,
      border: BORDER_STYLE,
    }
  })
  // Add the app title to the side panel
  var titleLabel = ui.Label('Birds, Drones, Mapping, Counting', TITLE_STYLE);
  mainPanel.add(titleLabel)
  // Add the app description to the main panel
  var descriptionText = 'Select & style the layers to view using the layers drop-down at the top right.';
  mainPanel.add(ui.Label(descriptionText, PARAGRAPH_STYLE))
  var codeText = 'Classification code available on Github';
  mainPanel.add(ui.Label(codeText, PARAGRAPH_STYLE, 'https://github.com/mitchest/bird-colony-count-drones'));
  var paperText = 'Academic paper: Lyons et al. 2019. Methods in Ecology and Evolution.';
  mainPanel.add(ui.Label(paperText, PARAGRAPH_STYLE, 'https://doi.org/10.1111/2041-210X.13194'));
  return mainPanel
}
// Set the SplitPanel as the only thing in root, with the info panel, and finish off
var infoPanel = makeSidePanel(Map)
ui.root.clear()
ui.root.add(ui.SplitPanel(infoPanel, ui.Panel([splitPanel])))
// centre on study site
//Map.centerObject(centre_point, 22)
linkedMap.centerObject(centre_point, 22)