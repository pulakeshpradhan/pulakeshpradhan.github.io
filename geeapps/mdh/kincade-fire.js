var image = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2019-10-27', '2019-10-28').mosaic();
var fires = image.select('B12','B11','B10')
  .updateMask(image.select('B12').unitScale(8000, 12000))
  .visualize({min:0, max:[17200, 14600, 1270]});
var MAP_PARAMS = {
  'Natural Color (B4/B3/B2)': image.visualize({bands:['B4','B3','B2'], min:0, max:4000}),
  'False Color (B8/B4/B3)': image.visualize({bands:['B8','B4','B3'], min:0, max:4000}),
  'Shortwave IR (B12/B11/B10)': image.visualize({bands:['B12','B11','B10'], min:0, max:[17200,14600,1270]}),
  'SWIR Overlay on Google Base Map': fires,
};
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(MAP_PARAMS[name], null, name);
  map.setOptions('HYBRID');
  map.setControlVisibility(false);
  map.setControlVisibility({zoomControl: true, scaleControl: true});
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[2]], null, {stretch: 'both'}),
      ui.Panel([maps[1], maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
maps[0].setCenter(-122.769, 38.641, 11);
var title = ui.Label('Kincade Fire, Sentinel-2, 27 October 2019, 12:03pm Local Time', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));