var EPR_LS = ui.import && ui.import("EPR_LS", "table", {
      "id": "users/lucasterres/EPR_leftside"
    }) || ee.FeatureCollection("users/lucasterres/EPR_leftside"),
    EPR_RS = ui.import && ui.import("EPR_RS", "table", {
      "id": "users/lucasterres/EPR_rightside"
    }) || ee.FeatureCollection("users/lucasterres/EPR_rightside"),
    BRUUN = ui.import && ui.import("BRUUN", "table", {
      "id": "users/lucasterres/bruun_results"
    }) || ee.FeatureCollection("users/lucasterres/bruun_results"),
    BRUUN_W = ui.import && ui.import("BRUUN_W", "table", {
      "id": "users/lucasterres/bruun_wline"
    }) || ee.FeatureCollection("users/lucasterres/bruun_wline"),
    AW3D30_45 = ui.import && ui.import("AW3D30_45", "table", {
      "id": "users/lucasterres/AW3D30_rcp45_2100"
    }) || ee.FeatureCollection("users/lucasterres/AW3D30_rcp45_2100"),
    AW3D30_85 = ui.import && ui.import("AW3D30_85", "table", {
      "id": "users/lucasterres/AW3D30_rcp85_2100"
    }) || ee.FeatureCollection("users/lucasterres/AW3D30_rcp85_2100"),
    LINHA_1992 = ui.import && ui.import("LINHA_1992", "table", {
      "id": "users/lucasterres/1990_1992_LINHA"
    }) || ee.FeatureCollection("users/lucasterres/1990_1992_LINHA"),
    LINHA_2016 = ui.import && ui.import("LINHA_2016", "table", {
      "id": "users/lucasterres/2014_2016_LINHA"
    }) || ee.FeatureCollection("users/lucasterres/2014_2016_LINHA"),
    AW3D30R_45 = ui.import && ui.import("AW3D30R_45", "image", {
      "id": "users/lucasterres/MDT_45_Final"
    }) || ee.Image("users/lucasterres/MDT_45_Final"),
    AW3D30R_85 = ui.import && ui.import("AW3D30R_85", "image", {
      "id": "users/lucasterres/MDT_85_Final"
    }) || ee.Image("users/lucasterres/MDT_85_Final");
Map.setCenter(-50.877, -31.3094, 7)
var empty = ee.Image().byte();
// Load an image.
// create vizualization parameters
var viz = {min:0, max:90, palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff']};
// add the map
Map.addLayer(AW3D30R_45, viz);
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Rainfall (mm)',
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
params: {bbox:'0,0,10,100', dimensions:'10x200'},
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
legend.add(panel);
Map.add(legend);
// Create an NDWI image, define visualization parameters and display.
var AW3D30R_85viz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};
Map.addLayer(AW3D30R_45, AW3D30R_85viz, 'AW3D30R_85', false);
////////////////////// AW3D30 //////////////////////////
// Paint the edges with different colors, display.
var outlines = empty.paint({
  featureCollection: AW3D30_45,
  color: 'DN',
  width: 1.5
});
var palette = ['#08fe00', '#ffa601', '#ff3c01'];
Map.addLayer(outlines, {palette: palette, min:0, max: 100}, 'AW3D30 DTM - RCP 4.5 - 2100',0);
// Paint the edges with different colors, display.
var outlines = empty.paint({
  featureCollection: AW3D30_85,
  color: 'DN',
  width: 1.5
});
var palette = ['#08fe00', '#ffa601', '#ff3c01'];
Map.addLayer(outlines, {palette: palette, min:0, max: 100}, 'AW3D30 DTM - RCP 8.5 - 2100',0);
/////////////////// BRUUN //////////////////////
// Paint the edges with different colors, display.
var outlines = empty.paint({
  featureCollection: BRUUN,
  color: 'RCP_2',
  width: 2
});
var palette = ['#08fe00', '#ffa601', '#ff3c01'];
Map.addLayer(outlines, {palette: palette, min:1, max: 3}, 'Bruun Rule Results - 2100',0);
Map.addLayer(BRUUN_W.draw({color: 'FFFFFF', strokeWidth: 5}), {}, 'Bruun Rule - W',0);
//////////////////// EPR //////////////////////////////
Map.addLayer(EPR_LS.draw({color: '#1be7ff', strokeWidth: 1}), {}, 'EPR Shoreline Forward - 2100',0);
Map.addLayer(EPR_RS.draw({color: '#e31a1c', strokeWidth: 1}), {}, 'EPR Shoreline Retreat - 2100',0);
Map.addLayer(LINHA_1992.draw({color: '#e15989', strokeWidth: 1}), {}, 'Shoreline 1992',0);
Map.addLayer(LINHA_2016.draw({color: '#987db7', strokeWidth: 1}), {}, 'Shoreline 2016',0);