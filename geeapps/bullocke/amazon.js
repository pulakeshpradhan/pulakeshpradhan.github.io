var imageStack3 = ee.Image("users/bullocke/amazon/model_output_v6/v6_yearly_disturbances_300m_3"),
    hansen = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"),
    countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    extent = ee.FeatureCollection("users/bullocke/amazon/shapefiles/amazon_extent2_lines"),
    imageStack4 = ee.Image("users/bullocke/amazon/model_output_v6/v6_yearly_disturbances_300m_mode_2"),
    biomass = ee.Image("WHRC/biomass/tropical"),
    strata = ee.Image("users/bullocke/amazon/public/Bullock_Amazon_Strata"),
    image = ee.Image("users/bullocke/amazon/public/Bullock_Amazon_Raw"),
    image2 = ee.Image("users/bullocke/amazon/model_output_v6/v6_yearly_disturbances_300m_mode_sept15_2");
// Code for animation showing yearly disturbances in Amazon Biome
// Thank you to Gennadii Donchyts for the various tools for awesome visualization
Map.addLayer(image2.unmask().reduce(ee.Reducer.max()))
Map.centerObject(extent, 4.5)
var image_masked = image2
// Turn image into collection
var image_stack = ee.ImageCollection(image_masked.select(0).rename('1990'))
for (var i = 1; i <28; i++) {
  var newName = String(1990+i)
  image_stack = image_stack.merge(
    ee.ImageCollection(image_masked.select(i).rename(newName)))
}
print(image_stack)
// Add new property that's date but a string
var stackWithDate = image_stack.map(function(i){
  // Get image date in milliseconds since epoch
  // var epoch = ee.Image(i).get('system:time_start')
  // // Convert to ee.Date and then String
  // var readableDate = ee.Date(epoch).format('YYYY-MM-DD')
  var bandName = ee.Image(i).bandNames().get(0)
  var readableDate = ee.String('Year: ').cat(ee.String(bandName))
  // .cat(ee.Number.parse(ee.String(bandName).slice(7,11)).subtract(1))
  // Set to new property
  return i.set('dateReadable',readableDate)
})
// Set the background style
// var style = require('users/gena/packages:style')
var style = require('users/bullocke/amazon:figures/style')
style.SetMapStyleDracula2()
// Load the animation package
// var animation = require('users/gena/packages:animation')
var animation = require('users/bullocke/amazon:figures/animationCopyGena')
print(stackWithDate)
// Set non-forest and non-water to black
var brown = '#8b4513'
Map.addLayer(strata.updateMask(strata.eq(2)), {min: 1, max: 7, palette: [brown,brown,brown,brown,brown,brown,brown]},'strata')
// Water mask according Hansen dataset - turn to black
var waterMask = hansen.select('datamask').eq(2)
waterMask = waterMask.updateMask(waterMask)
Map.addLayer(waterMask.clip(extent), {palette: ['#6495ed']}, 'waterMask')
// Vis parameters for animation
var vis = {min: 1, max: 4, palette: ['#00ffff','#ff073a','#00ffff','#ff073a'], opacity: .8 }
// var vis = {min: 1, max: 4, palette: ['black',brown,'black',brown], opacity: 1 }
//ff0000
// Do the animation
animation.animate(stackWithDate, { 
  vis: vis, 
  position: 'top-center', 
  maxFrames: 50, 
  width: '500px',
  label: 'dateReadable',
  timeStep: 300
})
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline_countries = empty.paint({
  featureCollection: countries,
  color: 1,
  width: .5
}); 
// Add country outline
Map.addLayer(outline_countries, {palette: ['white'], opacity: .5}, 'countries')
// Add amazon extent
Map.addLayer(extent, {color: '#009700'}, 'amazon')
// Add legend
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var legend = ui.Panel({style: {shown: true, width: '200px'}});
legend.style().set({position: 'bottom-left'});
// legend.add(ui.Label('Forest Disturbance in Amazon Ecoregion  1990-2017'))
legend.add(makeRow(brown, 'Non-Forest in 1990'))
legend.add(makeRow('#ff073a','Deforestation'))
legend.add(makeRow('#00ffff', 'Forest Degradation'))
Map.add(legend)