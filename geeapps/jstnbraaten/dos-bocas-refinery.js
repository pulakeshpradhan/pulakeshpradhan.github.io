var site = ee.Geometry.Point([-93.19687981958913, 18.42495265645169]);
var s2Col = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(site);
var s2ColPre = s2Col
  .filterDate('2018-01-01', '2018-02-01')
  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
  .mosaic();
var s2ColPost = s2Col
  .filterDate('2020-01-01', '2020-02-01')
  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
  .mosaic();
var leftMap = ui.Map();
var rightMap = ui.Map();
var style = {bands:['B11', 'B8', 'B3'], min:500, max:3500};
leftMap.addLayer(s2ColPre, style, 'Pre-construction');
leftMap.add(ui.Label('January, 2018', {position: 'top-left'}));
rightMap.addLayer(s2ColPost, style,  'Mid-construction');
rightMap.add(ui.Label('January, 2020', {position: 'top-right'}));
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.clear();
ui.root.add(splitPanel);
leftMap.setControlVisibility({layerList: false, mapTypeControl: false});
rightMap.setControlVisibility({layerList: false, mapTypeControl: false});
leftMap.centerObject(site, 14);