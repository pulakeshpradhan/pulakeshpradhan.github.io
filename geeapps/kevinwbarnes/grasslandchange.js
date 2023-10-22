var imageCollection = ee.ImageCollection("USDA/NASS/CDL");
var ic= imageCollection.filterDate('2008', '2019');
print(ic);
//get grass, shrub, wetlands
//other hay non-alfalfa 37, shrubland 64, 152, wetlands 87,  190, 195, grass 176 
//get crop and development
//1-36, 38-61, 66-77, 82, 121-124, 204-254
var gogetit = function(image){
  var cropland = image.select('cropland');
  var total = cropland.eq(37).or(cropland.eq(64)).or(cropland.eq(152))
  .or(cropland.eq(87)).or(cropland.eq(195)).or(cropland.eq(190)).or(cropland.eq(176));
  var cropdev = cropland.gte(1).and(cropland.lte(36))
  .or(cropland.gte(38).and(cropland.lte(61)))
  .or(cropland.gte(66).and(cropland.lte(77))).or(cropland.eq(82))
  .or(cropland.gte(121).and(cropland.lte(124)))
  .or(cropland.gte(204).and(cropland.lte(254)));
  var total_fm = total.focal_mode(75, 'square', 'meters');
  var cropdev_fm = cropdev.focal_mode(75, 'square', 'meters');
  return total_fm.addBands(cropdev_fm).rename(['total', 'cropdev'])
  .set('system:time_start', image.get('system:time_start'));
};
var ic2 = ic.map(gogetit);
var total08 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2008').first().select('total'));
var total09 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2009').first().select('total'));
var total10 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2010').first().select('total'));
var total11 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2011').first().select('total'));
var total12 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2012').first().select('total'));
var total13 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2013').first().select('total'));
var total14 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2014').first().select('total'));
var total15 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2015').first().select('total'));
var total16 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2016').first().select('total'));
var total17 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2017').first().select('total'));
var total18 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2018').first().select('total'));
var cropdev08 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2008').first().select('cropdev').eq(0));
var cropdev09 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2009').first().select('cropdev').eq(0));
var cropdev10 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2010').first().select('cropdev').eq(0));
var cropdev11 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2011').first().select('cropdev').eq(0));
var cropdev12 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2012').first().select('cropdev').eq(0));
var cropdev13 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2013').first().select('cropdev').eq(0));
var cropdev14 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2014').first().select('cropdev').eq(0));
var cropdev15 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2015').first().select('cropdev').eq(0));
var cropdev16 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2016').first().select('cropdev').eq(0));
var cropdev17 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2017').first().select('cropdev').eq(0));
var cropdev18 = ee.Image(ic2.filterMetadata('system:index', 'equals', '2018').first().select('cropdev').eq(0));
//undisturbed
var undist08 = total08.updateMask(total08).unmask(0).rename('undist');
Map.addLayer(undist08.updateMask(undist08),{palette:['red']},'Undisturbed grass 2008');
var undist09 = undist08.updateMask(cropdev09).unmask(0).rename('undist');
var undist10 = undist09.updateMask(cropdev10).unmask(0).rename('undist');
var undist11 = undist10.updateMask(cropdev11).unmask(0).rename('undist');
var undist12 = undist11.updateMask(cropdev12).unmask(0).rename('undist');
var undist13 = undist12.updateMask(cropdev13).unmask(0).rename('undist');
var undist14 = undist13.updateMask(cropdev14).unmask(0).rename('undist');
var undist15 = undist14.updateMask(cropdev15).unmask(0).rename('undist');
var undist16 = undist15.updateMask(cropdev16).unmask(0).rename('undist');
var undist17 = undist16.updateMask(cropdev17).unmask(0).rename('undist');
var undist18 = undist17.updateMask(cropdev18).unmask(0).rename('undist');
Map.addLayer(undist18.updateMask(undist18), {palette:['green']}, 'Undisturbed grass 2018');
// //combine one image multipe bands
var all =  ee.ImageCollection([
total08.addBands(undist08),
total09.addBands(undist09),
total10.addBands(undist10),
total11.addBands(undist11),
total12.addBands(undist12),
total13.addBands(undist13),
total14.addBands(undist14),
total15.addBands(undist15),
total16.addBands(undist16),
total17.addBands(undist17),
total18.addBands(undist18)]);
print(all);
//convert to area
var prep = function(image){
return image.multiply(ee.Image.pixelArea().divide(1000000)).set('Year', ee.Number.parse(image.date().format('Y')));
};
var ic2 = all.map(prep);
print(ic2);
var vizthatcollection = function(im){
  return im.add(undist08).visualize({
  bands: ['undist'],
  min: 0,
  max: 2,
  palette: ['yellow', 'red','green']
})};
var ic3 = all.map(vizthatcollection);
print(ic3);
// var undistchange0818 = undist08.subtract(undist18);
// var conundist = undistchange0818.convolve(ee.Kernel.square({radius:800, units:'meters', normalize:true}));
// Map.addLayer(conundist.updateMask(conundist), {min:0, max:1, palette:['green', 'yellow', 'orange', 'red']}, 'loss');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('The map shows 2008 grasslands in red with 2018 undisturbed grasslands overlaid in green (undisturbed = never been classified as crop or developed). Click on the map to inspect grassland change within a 10 mile radius area. The two charts below show the change in total and undisturbed grasslands from 2008-2018 and give beta estimates for km2 change per year, and the percent change per year.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var mi10 = point.buffer(16093.4);
  print(mi10)
  //maps
  var dot = ui.Map.Layer(mi10, {color: '#d6d6d6'}, '10 mi radius');
  Map.layers().set(2, dot);
  Map.centerObject(mi10, 10);
  // Create an NDVI chart.
//line chart for two landcovers with trendlines
  var chartit = new ui.Chart.image.series(ic2, mi10, ee.Reducer.sum(), 30, 'Year')
  .setOptions({
      title: 'Total Grass vs. Undisturbed Grass',
      hAxis: {'title': 'Year'},
      vAxis: {'title': 'Area (KM2)'//,
      //'scaleType': 'log'
      },
      pointSize: 1,
      lineWidth: 1,
      series: {
        0: {color: 'blue'},
        1: {color: 'green'}
      },
      trendlines: { 0: {showR2: true, visibleInLegend: true, pointsVisible: false} , 
                    1: {showR2: true, visibleInLegend: true, pointsVisible: false}}
                    });
  panel.widgets().set(2, chartit);
  var chartit2 = new ui.Chart.image.series(ic2, mi10, ee.Reducer.sum(), 30, 'Year')
  .setOptions({
      title: 'Log scale: Total Grass vs. Undisturbed Grass',
      hAxis: {'title': 'Year'},
      vAxis: {'title': 'Area (KM2)',
      'scaleType': 'log'
      },
      pointSize: 1,
      lineWidth: 1,
      series: {
        0: {color: 'blue'},
        1: {color: 'green'}
      },
      trendlines: { 0: {showR2: true, visibleInLegend: true, pointsVisible: false} , 
                    1: {showR2: true, visibleInLegend: true, pointsVisible: false}}
                    });
  panel.widgets().set(3, chartit2);
  var vid = new ui.Thumbnail({
  image: ic3,
  params: {
    dimensions: '360x360',
    region: mi10,
    format: 'gif',
    framesPerSecond: 1
  },
  style: {height: '365px', width: '365px'}
});
panel.widgets().set(4, vid);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);