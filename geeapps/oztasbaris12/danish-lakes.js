/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table2 = ee.FeatureCollection("users/oztasbaris12/Danish_lakes/Mask_shapefile/danish_samples"),
    mask = ee.FeatureCollection("users/oztasbaris12/Danish_lakes/Mask_shapefile/updated_mask"),
    l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    glombak_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/glombak_base"),
    glombak_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/glombak_point_30m"),
    glombak_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/glombak_side"),
    harboore_fjord_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/harboore_fjord_base"),
    harboore_fjord_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/harboore_fjord_point_30m"),
    harboore_fjord_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/harboore_fjord_side"),
    hovedso_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/hovedso_base"),
    hovedso_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/hovedso_point_30m"),
    hovedso_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/hovedso_side"),
    hygum_nor_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/hygum_nor_base"),
    hygum_nor_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/hygum_nor_point_30m"),
    hygum_nor_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/hygum_nor_side"),
    mellemvese_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/mellemvese_base"),
    mellemvese_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/mellemvese_point_30m"),
    mellemvese_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/mellemvese_side"),
    noret_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/noret_base"),
    noret_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/noret_point_30m"),
    noret_side = ee.FeatureCollection("users/oztasbaris12/base_lakes/noret_side"),
    keldsnor_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/keldsnor_base"),
    keldsnor_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/keldsnor_point_buffer_30m"),
    kilen_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/kilen_base"),
    kilen_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/kilen_point_buffer_30m"),
    ulvedybet_nord_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/ulvedybet_nord_base"),
    ulvedybet_nord_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/ulvedybet_nord_point_buffer_30m"),
    vearn_sande_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/vearn_sande_base"),
    vearn_sande_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/vearn_sande_point_buffer_30m"),
    ferring_so_base = ee.FeatureCollection("users/oztasbaris12/base_lakes/ferrring_so_base"),
    ferring_so_point = ee.FeatureCollection("users/oztasbaris12/base_lakes/ferrring_so_point_buffer_30m");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = l5.filterBounds(ferring_so_base).filterMetadata("CLOUD_COVER_LAND","less_than", 5)
var lake_names =[glombak_base, glombak_point, 
glombak_side, harboore_fjord_base, harboore_fjord_point, 
harboore_fjord_side, hovedso_base, hovedso_point, hovedso_side, 
hygum_nor_base, hygum_nor_point, hygum_nor_side, mellemvese_base, 
mellemvese_point, mellemvese_side, noret_base, noret_point, noret_side, 
keldsnor_base, keldsnor_point, kilen_base, kilen_point, ulvedybet_nord_base, ulvedybet_nord_point, 
vearn_sande_base, vearn_sande_point, ferring_so_base, ferring_so_point]
var lake_strings = ['glombak_base','glombak_point','glombak_side',
'harboore_fjord_base','harboore_fjord_point','harboore_fjord_side',
'hovedso_base','hovedso_point','hovedso_side','hygum_nor_base',
'hygum_nor_point','hygum_nor_side','mellemvese_base','mellemvese_point',
'mellemvese_side','noret_base','noret_point','noret_side','keldsnor_base',
'keldsnor_point','keldsnor_side','kilen_base','kilen_point','kilen_side',
'ulvedybet_nord_base','ulvedybet_nord_point','ulvedybet_nord_side','vearn_sande_base',
'vearn_sande_point','vearn_sande_side','ferring_so_base','ferring_so_point',
'ferring_so_side']
var select = ui.Select({
  items: lake_strings,
  onChange: function(key) {
    Map.setCenter(lake_names[key]["geometry"])
  }
});
select.setPlaceholder('Choose a location...');
//Map.add(select)
Map.addLayer(ferring_so_base)
Map.centerObject(ferring_so_base)
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label);
function CalculateSalinity_l5(image){
  var Salinity = image.normalizedDifference(['B7','B4']).rename('Salinity Index');
  return Salinity.set({'system:time_start':image.get("system:time_start"),'Salinity':'Salinity'});  
}
var salinity = collection.map(CalculateSalinity_l5)
print(salinity)
var chart = ui.Chart.image.seriesByRegion({
  imageCollection: salinity,
  band:"Salinity Index",
  regions: ferring_so_base,
  reducer: ee.Reducer.median(),
  seriesProperty:'Salinity',
  scale: 30
});
chart.style().set({
  position: 'bottom-right',
  width: '750px',
  height: '500px'
});
Map.add(chart);
chart.onClick(function(xValue, yValue, seriesName) {
  if (!xValue) return;  // Selection was cleared.
  // Show the image for the clicked date.
  var equalDate = ee.Filter.equals('system:time_start', xValue);
  var image = ee.Image(salinity.filter(equalDate).first());
  var requested_salinity = ui.Map.Layer(image, {
    "opacity":1,"bands":["Salinity Index"],"palette":["ff0000","00ff08","0400ff"]
  });
  Map.layers().reset([requested_salinity, ferring_so_base]);
  // Show a label with the date on the map.
  label.setValue((new Date(xValue)).toUTCString());
});
var vis =  {"opacity":1,"bands":["Salinity"],"palette":["ff0000","00ff08","0400ff"]}
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(-1, {margin: '4px 8px'}),
    ui.Label(
        (0),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(1, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: Salinity Index',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle,colorBar, legendLabels]);
Map.add(legendPanel);