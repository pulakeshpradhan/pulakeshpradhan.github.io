var l8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    l8toa = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var animation = require('users/gena/packages:animation')
var utils = require('users/gena/packages:utils')
var palettes = require('users/gena/packages:palettes')
var limit = function(i){
  var mask = i.gte(5)
  var p = i.updateMask(mask)
  return p
}
// add GOES images to map
var goes = utils.getFolderImages('users/ylfeng/Campfire24hr') 
print(goes, 'goes')
// add white background
//Map.addLayer(ee.Image(0), {min: 0, max: 1}, 'black', true, 0.5)
goes = goes.map(function(i) {
  i = i.resample('bicubic')
  i = i.updateMask(i.unitScale(5, 10))
  i = i.set({ label: ee.String(i.get('system:id')).slice(52) })
  return i
})
// var images = goes.map(function(i) {
//   var burnRate = ee.Number(i.get('burnRate'))
//   return i.set({ burnRate: burnRate.format('Burn rate: %.2f km\xB2/min') }) 
// })
//print(images)
// var collection = images.map(limit)
//The animation package is from Gennadii Donchyts, gennadiy.donchyts@gmail.com
// animation.animate(collection, {label: 'burnRate',
//   vis: { min: 5, max: 10, palette: ['FFFF00', 'FF0000'],opacity: 0.4}
// })
animation.animate(goes.map(limit), {
  vis: { min: 5, max: 20, palette: palettes.cb.YlOrRd[9].slice(0).reverse(), opacity: 0.8 },
  label: 'label',
  maxFrames: goes.size()
})
//Landsat 8 raw image on 11/08/2018 10:47am
var im = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_044032_20181108');                      
var LT2 = ee.Algorithms.Landsat.simpleComposite({
  collection: im,
  asFloat: true
});
//Landsat 8 raw image on 12/10/2018
// var i2 = ee.Image("LANDSAT/LC08/C01/T1_RT/LC08_044032_20181210");
// var post = ee.Algorithms.Landsat.simpleComposite({
//   collection: i2,
//   asFloat: true
// });
// Map.addLayer(post, {bands: ['B6', 'B5', 'B4'], max: 0.5}, 'SWIR-NIR-R-2');
//Map.addLayer(LT2, {bands: ['B6', 'B5', 'B4'], max: 0.5}, 'SWIR-NIR-R-2');
//Export (change dimensions or scale for higher quality).
// Export.video.toDrive({
//   collection: collection,
//   description: 'campfire',
//   dimensions: 720,
//   framesPerSecond: 12,
//   region: polygon
// });
Map.setCenter(-121.7146, 39.7592,11)
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle1 = ui.Label({
  value: 'Animation will start when all layers load after',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
Map.addLayer(LT2, {bands: ['B6', 'B5', 'B4'], max: 0.5}, 'SWIR-NIR-R-2').setShown(false);
var legendTitle2 = ui.Label({
  value: 'a few minutes. Please press play to start.',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var checkbox = ui.Checkbox( 'Show Landsat layer',false);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox.style({
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
  })
legend.add(legendTitle1).add(legendTitle2)
legend2.add(checkbox)
Map.add(legend).add(legend2)
Map.setOptions('satellite');