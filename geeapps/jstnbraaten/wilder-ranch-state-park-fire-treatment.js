var s2Col = ee.ImageCollection('COPERNICUS/S2_SR');
var aoi = ee.Geometry.Polygon(
      [[[-122.11764720939046, 37.0049677392288],
        [-122.11764720939046, 36.94188207026782],
        [-122.00023082755452, 36.94188207026782],
        [-122.00023082755452, 37.0049677392288]]], null, false);
var visParams = {
  bands: ['B11', 'B8', 'B3'],
  min: 0,
  max: 3500
};
var t1 = '2021-10-16';
var t2 = '2021-10-31';
var mapT1 = ui.Map();
var mapT2 = ui.Map();
var linkedMaps = ui.Map.Linker([mapT1, mapT2]);
var splitMap = ui.SplitPanel(
  linkedMaps.get(0), linkedMaps.get(1), 'horizontal', true);
var t1Date = ui.Label(t1);
var t2Date = ui.Label(t2);
var infoTitle = ui.Label(
  'Wilder Ranch State Park Fire Treatment (October, 2021)');
var infoLabel = ui.Label(
  'This app shows fire-treated regions within Wilder Ranch State Park, ' +
  'Santa Cruz, CA. ' +
  'The treatment occurred late October, 2021. The affected regions can ' +
  'be seen by moving the app slider back and forth and noting the area in the ' +
  'center of the map that turns from orange to brown. The image data are ' +
  'provided by the Copernicus Sentinel-2 satellite monitoring system, displayed ' +
  'as semi-true color, enhanced by shortwave and near-infrared reflectance.');
var infoPanel = ui.Panel([infoTitle, infoLabel]);
mapT1.add(t1Date);
mapT2.add(t2Date);
mapT1.add(infoPanel);
mapT1.setCenter(-122.10165, 36.97891, 14);
t1Date.style().set(
  {fontSize: '36px', fontWeight: 'bold', position: 'bottom-left'});
t2Date.style().set(
  {fontSize: '36px', fontWeight: 'bold', position: 'bottom-right'});
infoTitle.style().set(
  {fontSize: '16px', fontWeight: 'bold'});
infoPanel.style().set(
  {width: '320px', position: 'top-left'});
function makeVisComp(imgCol, aoi, startDate, visParams) {
  var endDate = ee.Date(ee.Date(startDate).advance(1, 'day'));
  return imgCol.filterBounds(aoi)
                   .filterDate(startDate, endDate)
                   .mosaic()
                   .visualize(visParams);
}
var imgT1 = makeVisComp(s2Col, aoi, t1, visParams);
var imgT2 = makeVisComp(s2Col, aoi, t2, visParams);
mapT1.addLayer(imgT1, null, t1);
mapT2.addLayer(imgT2, null, t2);
ui.root.clear();
ui.root.add(splitMap);