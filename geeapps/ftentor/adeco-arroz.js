var imageCollection = ee.ImageCollection("COPERNICUS/S2"),
    table = ee.FeatureCollection("users/ftentor/adeco/oscuro");
var geometry = ee.Geometry.Point([-58.58009786102093, -29.127277308146645]);
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VH')
        .map(function(image) {
          var edge = image.lt(-40.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var nov = ee.Filter.date('2018-11-21', '2018-11-30');
var spring = ee.Filter.date('2018-12-01', '2018-12-10');
var lateSpring = ee.Filter.date('2018-12-11', '2018-12-20');
var summer = ee.Filter.date('2018-12-21', '2018-12-31');
var enero = ee.Filter.date('2019-01-01', '2019-01-13');
//Map.centerObject(geometry,12);
//Map.addLayer(desc.filter(nov).min().paint(table,'black',1), {min: -21, max: -10}, '21-30/11', false);
Map.addLayer(desc.filter(spring).min().paint(table,'black',1), {min: -21, max: -10}, '01-10/12/2018', false);
Map.addLayer(desc.filter(lateSpring).min().paint(table,'black',1), {min: -21, max:-10}, '11-20/12/2018', true);
Map.addLayer(desc.filter(summer).min().paint(table,'black',1), {min: -21, max: -10}, '21-30/12/2018', false);
Map.addLayer(desc.filter(enero).min().paint(table,'black',1), {min: -21, max: -10}, '01-10/01/2019', false);
/////////////////// RADAR
var s21= imageCollection.filterDate('2018-12-10','2018-12-20')
                        .filterBounds(geometry)
                        .first()
var s22= imageCollection.filterDate('2018-12-25','2018-12-30')
                        .filterBounds(geometry)
                        .first()
var s23= imageCollection.filterDate('2018-12-01','2018-12-10')
                        .filterBounds(geometry)
                        .first()
var s24= imageCollection.filterDate('2019-01-01','2019-01-10')
                        .filterBounds(geometry)
                        .first()
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(s23.normalizedDifference(['B8','B4']).visualize(vis).paint(table,'black',1),{},'s2_ndvi 01-10/12/2018',false);
linkedMap.addLayer(s21.normalizedDifference(['B8','B4']).visualize(vis).paint(table,'black',1),{},'s2_ndvi 10-20/12/2018',true);
// Add a thermal image to the map.
linkedMap.addLayer(s22.normalizedDifference(['B8','B4']).visualize(vis).paint(table,'black',1),{},'s2_ndvi 20-30/12/2018',false);
linkedMap.addLayer(s24.normalizedDifference(['B8','B4']).visualize(vis).paint(table,'black',1),{},'s2_ndvi 01-10/01/2019',false)
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
linkedMap.centerObject(geometry, 12);