var alos = ui.import && ui.import("alos", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/gena/w50545_s10"
    }) || ee.Image("users/gena/w50545_s10");
Map.setOptions('HYBRID')
var layerAlos = ui.Map.Layer(ee.Terrain.hillshade(alos.map(function(i) { return i.select('DSM').resample('bicubic') }).mosaic().reproject(ee.Projection('EPSG:3857').atScale(30)), 0, 25).resample('bicubic'), { min: 50, max: 255 })
Map.layers().add(layerAlos)
var layerDem = ui.Map.Layer(ee.Terrain.hillshade(image, 0, 25).resample('bicubic'), { min: 50, max: 255 })
// Map.layers().add(layerDem)
var palettes = require('users/gena/packages:palettes')
var layerDiff1 = ui.Map.Layer(alos.map(function(i) { return i.select('DSM').resample('bicubic') }).mosaic().select('DSM').subtract(image.resample('bicubic')), { min: -10, max: 10, palette: palettes.crameri.roma[50] }, 'diff', false, 0)
var layerDiff2 = ui.Map.Layer(alos.map(function(i) { return i.select('DSM').resample('bicubic') }).mosaic().select('DSM').subtract(image.resample('bicubic')), { min: -10, max: 10, palette: palettes.crameri.roma[50] }, 'diff', false, 0)
Map.layers().add(layerDiff1)
var sliderOpacity = ui.Slider(0, 1)
sliderOpacity.setValue(1, true)
sliderOpacity.onSlide(function(o) {
  layerAlos.setOpacity(o)
  layerDem.setOpacity(o)
})
Map.add(sliderOpacity)
sliderOpacity.style().set({ position: 'middle-left', width: '300px'})
var sliderOpacityDiff = ui.Slider(0, 1)
sliderOpacityDiff.setValue(0, true)
sliderOpacityDiff.onSlide(function(o) {
  layerDiff1.setOpacity(o)
  layerDiff2.setOpacity(o)
  if(o == 0) {
    layerDiff1.setShown(false)
    layerDiff2.setShown(false)
  } else {
    layerDiff1.setShown(true)
    layerDiff2.setShown(true)
  }
})
Map.add(sliderOpacityDiff)
sliderOpacityDiff.style().set({ position: 'middle-left', width: '300px'})
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map()
linkedMap.setOptions('HYBRID')
linkedMap.layers().add(layerDem)
linkedMap.layers().add(layerDiff2)
Map.addLayer(alos.mosaic().select('DSM').subtract(image), { min: -10, max: 10, palette: palettes.crameri.roma[50] }, 'diff', false, 0)
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
Map.setCenter(8.62032, 45.72522, 14)