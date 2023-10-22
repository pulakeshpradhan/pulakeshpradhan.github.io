var GlobalPotential = ee.Image("users/crowtherlab/forest_potential"); 
var RestorationAreas = ee.Image("users/crowtherlab/restoration_potential_masked"); 
var FutureTreeCoverImage = ee.Image("users/shared/GlobalTreeRestorationPotential/190808_stacked_FutureTreeCover")
var Mask = ee.Image("users/shared/Composite/20190218_30ArcSec_Composite").select("Annual_Mean_Temperature").gt(-320)
// Rename the Future Climate Scenarios 
var FutureTreeCoverImage = FutureTreeCoverImage.select(
  ['classification','classification_1','classification_2','classification_3','classification_4','classification_5','classification_6','classification_7','classification_8','classification_9','classification_10','classification_11','classification_12','classification_13','classification_14','classification_15','classification_16','classification_17','classification_18','classification_19','classification_20','classification_21','classification_22','classification_23'],
  ['cesm1bgc_rcp45_2030', 'cesm1bgc_rcp45_2050', 'cesm1bgc_rcp45_2070', 'cesm1bgc_rcp45_2080', 'cesm1bgc_rcp85_2030', 'cesm1bgc_rcp85_2050', 'cesm1bgc_rcp85_2070', 'cesm1bgc_rcp85_2080', 'cesm1cam5_rcp45_2030', 'cesm1cam5_rcp45_2050', 'cesm1cam5_rcp45_2070', 'cesm1cam5_rcp45_2080', 'cesm1cam5_rcp85_2030', 'cesm1cam5_rcp85_2050', 'cesm1cam5_rcp85_2070', 'cesm1cam5_rcp85_2080', 'hadgem2es_rcp45_2030', 'hadgem2es_rcp45_2050', 'hadgem2es_rcp45_2070', 'hadgem2es_rcp45_2080', 'hadgem2es_rcp85_2030', 'hadgem2es_rcp85_2050', 'hadgem2es_rcp85_2070', 'hadgem2es_rcp85_2080']
);
// Function that transforms a multiband image into an image collection
var BandsToCollection = function(image){
  var collection = ee.ImageCollection.fromImages(image.bandNames().map(function(bandName){
    return image.select(ee.String(bandName)).float().set('system:id', bandName).select([bandName], ['Band']);
  }));
  return collection;
};
// Convert the image bands into an image collection 
var FutureTreeCoverIC = BandsToCollection(FutureTreeCoverImage);
// Compute the mean for the RCP 4.5 scenarios 
var RCP45_2030 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp45')
  .filterMetadata('system:id','contains','2030')
  .mean();
var RCP45_2050 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp45')
  .filterMetadata('system:id','contains','2050')
  .mean();
var RCP45_2070 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp45')
  .filterMetadata('system:id','contains','2070')
  .mean();
/*var RCP45_2080 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp45')
  .filterMetadata('system:id','contains','2080')
  .mean();  */
// Compute the mean for the RCP 8.5 scenarios 
var RCP85_2030 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp85')
  .filterMetadata('system:id','contains','2030')
  .mean();
var RCP85_2050 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp85')
  .filterMetadata('system:id','contains','2050')
  .mean();
var RCP85_2070 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp85')
  .filterMetadata('system:id','contains','2070')
  .mean();
/*var RCP85_2080 = FutureTreeCoverIC
  .filterMetadata('system:id','contains','rcp85')
  .filterMetadata('system:id','contains','2080')
  .mean();  */
var GlobalPotential2030_RCP45 = RCP45_2030.mask(Mask);
var Diff2030_RCP45 = GlobalPotential2030_RCP45.subtract(GlobalPotential);
var GlobalPotential2050_RCP45 = RCP45_2050.mask(Mask);
var Diff2050_RCP45 = GlobalPotential2050_RCP45.subtract(GlobalPotential);
var GlobalPotential2070_RCP45 = RCP45_2070.mask(Mask);
var Diff2070_RCP45 = GlobalPotential2070_RCP45.subtract(GlobalPotential);
/*var GlobalPotential2080_RCP45 = RCP45_2080.mask(Mask);
var Diff2080_RCP45 = GlobalPotential2080_RCP45.subtract(GlobalPotential);*/
var GlobalPotential2030_RCP85 = RCP85_2030.mask(Mask);
var Diff2030_RCP85 = GlobalPotential2030_RCP85.subtract(GlobalPotential);
var GlobalPotential2050_RCP85 = RCP85_2050.mask(Mask);
var Diff2050_RCP85 = GlobalPotential2050_RCP85.subtract(GlobalPotential);
var GlobalPotential2070_RCP85 = RCP85_2070.mask(Mask);
var Diff2070_RCP85 = GlobalPotential2070_RCP85.subtract(GlobalPotential);
/*var GlobalPotential2080_RCP85 = RCP85_2080.mask(Mask);
var Diff2080_RCP85 = GlobalPotential2080_RCP85.subtract(GlobalPotential);
*/
Map.addLayer(GlobalPotential, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential today', false);
//Map.addLayer(RestorationAreas, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Potential Restoration Areas', false);
//Map.addLayer(GlobalPotential2030_RCP45, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2030', false);
Map.addLayer(Diff2030_RCP45, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP4.5 - Difference between today and 2030', false);
//Map.addLayer(GlobalPotential2050_RCP45, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2050', false);
Map.addLayer(Diff2050_RCP45, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP4.5 - Difference between today and 2050', false);
//Map.addLayer(GlobalPotential2070_RCP45, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2070', false);
Map.addLayer(Diff2070_RCP45, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP4.5 - Difference between today and 2070', false);
//Map.addLayer(GlobalPotential2080_RCP45, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2080', false);
//Map.addLayer(Diff2080_RCP45, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP4.5 - Difference between today and 2080', false);
//Map.addLayer(GlobalPotential2030_RCP85, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2030', false);
Map.addLayer(Diff2030_RCP85, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP8.5 - Difference between today and 2030', false);
//Map.addLayer(GlobalPotential2050_RCP85, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2050', false);
Map.addLayer(Diff2050_RCP85, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP8.5 - Difference between today and 2050', false);
//Map.addLayer(GlobalPotential2070_RCP85, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2070', false);
Map.addLayer(Diff2070_RCP85, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP8.5 - Difference between today and 2070', false);
//Map.addLayer(GlobalPotential2080_RCP85, {min:0, max:100, palette: ['FFFFFF','0E644A']}, 'Global Tree Restoration Potential in 2080', false);
//Map.addLayer(Diff2080_RCP85, {min:-100, max:100, palette: ['FF0000','FFFF00','0E644A']}, 'RCP8.5 - Difference between today and 2080', false);
// --- Add Legend --- // 
// create vizualization parameters
var viz = {min:0, max:100, palette:['FF0000','FFFF00','0E644A']};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 30px',
width: '180px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Tree Cover Change (%)',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(-100)
],
});
legend.add(panel);
// --- Second own --- // 
// create vizualization parameters
var viz1 = {min:0, max:100, palette:['FFFFFF','0E644A']};
// set position of panel
var legend1 = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 30px',
width: '180px'
}
});
// Create legend title
var legendTitle1 = ui.Label({
value: 'Tree Cover (%)',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend1.add(legendTitle1);
// create the legend image
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient1 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage1 = gradient1.visualize(viz1);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend1.add(panel1);
// create thumbnail from the image
var thumbnail1 = ui.Thumbnail({
image: legendImage1,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend1.add(thumbnail1);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['min'])
],
});
legend1.add(panel1);
Map.add(legend);
Map.add(legend1);
// Crowther Lab Sign 
// set position of panel
var legend2 = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 30px',
}
});
/*
Map.add(legend2);
function addLogo(image, position) {
  var thumb = ui.Thumbnail({ 
    image: image,
    style: { backgroundColor: '#00000000', position: position, width: width, height: height }
  })
  Map.add(thumb)  
}
var image = ee.Image('users/gena/animation-test-images/d1')
image = image.mask(image.lt(250))
var position = 'bottom-right'
var width = '200px'
var height = '200px'
addLogo(image, position, width, height)
*/
/*
// Create second panel 
var panel1 = ui.Panel({style: {width: '400px'}});
// new viz parameters
var viz1 = {min:0, max:100, palette:['FF0000','FFFF00','0000FF']};
// create the legend image
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient1 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage1 = gradient1.visualize(viz1);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend.add(panel1);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
*/