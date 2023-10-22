var images = {
  '2000': ee.Image('projects/ee-gerardosoto/assets/fracCov2000_int16').divide(100),
  '2001': ee.Image('projects/ee-gerardosoto/assets/fracCov2001_int16').divide(100),
  '2002': ee.Image('projects/ee-gerardosoto/assets/fracCov2002_int16').divide(100),
  '2003': ee.Image('projects/ee-gerardosoto/assets/fracCov2003_int16').divide(100),
  '2004': ee.Image('projects/ee-gerardosoto/assets/fracCov2004_int16').divide(100),
  '2005': ee.Image('projects/ee-gerardosoto/assets/fracCov2005_int16').divide(100),
  '2006': ee.Image('projects/ee-gerardosoto/assets/fracCov2006_int16').divide(100),
  '2007': ee.Image('projects/ee-gerardosoto/assets/fracCov2007_int16').divide(100),
  '2008': ee.Image('projects/ee-gerardosoto/assets/fracCov2008_int16').divide(100),
  '2009': ee.Image('projects/ee-gerardosoto/assets/fracCov2009_int16').divide(100),
  '2010': ee.Image('projects/ee-gerardosoto/assets/fracCov2010_int16').divide(100),
  '2011': ee.Image('projects/ee-gerardosoto/assets/fracCov2011_int16').divide(100),
  '2012': ee.Image('projects/ee-gerardosoto/assets/fracCov2012_int16').divide(100),
  '2013': ee.Image('projects/ee-gerardosoto/assets/fracCov2013_int16').divide(100),
  '2014': ee.Image('projects/ee-gerardosoto/assets/fracCov2014_int16').divide(100),
  '2015': ee.Image('projects/ee-gerardosoto/assets/fracCov2015_int16').divide(100),
  '2016': ee.Image('projects/ee-gerardosoto/assets/fracCov2016_int16').divide(100),
  '2017': ee.Image('projects/ee-gerardosoto/assets/fracCov2017_int16').divide(100),
  '2018': ee.Image('projects/ee-gerardosoto/assets/fracCov2018_int16').divide(100),
  '2019': ee.Image('projects/ee-gerardosoto/assets/fracCov2019_int16').divide(100),
  '2020': ee.Image('projects/ee-gerardosoto/assets/fracCov2020_int16').divide(100), 
  '2021': ee.Image('projects/ee-gerardosoto/assets/fracCov2021_int16').divide(100), 
  '2022': ee.Image('projects/ee-gerardosoto/assets/fracCov2022_int16').divide(100)  
};
var viz = {bands: ['BG','PV','NPV'], min: 0, max: 100}
Map.setOptions('SATELLITE')
Map.centerObject(images['2000'], 6)
Map.style().set('cursor', 'crosshair');
// This function changes the given map to show the selected image.
function updateMap(selection) {
  Map.layers().set(0, ui.Map.Layer(images[selection], viz, 'FC'));
}
var select = ui.Select({items: Object.keys(images), onChange: updateMap});
// print(select)
select.setValue(Object.keys(images)[0], true);
select.style().set('shown', true);
// Get data to put into panel
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'Location: lon = ' + coords.lon.toFixed(2) + ', ' +
                'lat = ' + coords.lat.toFixed(2);
  panel.widgets().set(5, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'location'));
  var sample = images[Object.keys(images)[0]].sample(point, 30);
  var computedValueBg = ee.Number(sample.first().get('BG')).round();
  var computedValuePv = ee.Number(sample.first().get('PV')).round();
  var computedValueNpv = ee.Number(sample.first().get('NPV')).round();
  // Request the value from the server.
  computedValueBg.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(6, ui.Label({
      value: 'Bare ground = ' + result + ' %',
    }));
  });
  computedValuePv.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(7, ui.Label({
      value: 'Photosynthetic Veg. = ' + result + ' %',
    }));
  });
  computedValueNpv.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(8, ui.Label({
      value: 'non-Photosynthetic Veg. = ' + result + ' %',
    }));
  });
  select.style().set('shown', true);  /// not working, disappearing
}) 
// Create an empty panel in which to arrange widgets.
var titulo = ui.Label('Vegetation Fractional Cover Viewer')
titulo.style().set({'fontWeight': 'bold'})
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '300px'}})
    .add(titulo)
    .add(ui.Label('Data is stored in annual rasters containing three layers each, corresponding to the components: Photosynthetic vegetation (PV, green), Non-photosynthetic vegetation (NPV, blue), and Bare ground (BG, red). If you need access to this data, please contact: gerardo.soto@uach.cl'))
    .add(ui.Label('Select a year:'))
    .add(select)
    .add(ui.Label('Click on the map to show pixel values of Fractional Cover'))
    // .add(location)
// Add the panel to the ui.root.
ui.root.add(panel);