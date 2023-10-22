var bare_frequency = ee.Image('users/geocis/BareSurfaces/BF_1980_2019');
var magmaPalette = {bands: ['SF'], palette: ['6e40aa', '963db3', 'bf3caf',
                                             'e3419e', 'fe4b83', 'ff5e64',
                                             'ff7747', 'fb9633', 'e2b72f',
                                             'c7d63c', 'c7d63c'],
                   min: 0, max: 10000};
Map.addLayer(bare_frequency, magmaPalette, 'Frequency of Bare Surfaces');
Map.setCenter(0,0,3);
var bare_surface = ee.Image('users/geocis/BareSurfaces/BS_1980_2019');
var rgbTrueColor = {bands: ['red', 'green', 'blue'], min: 500, max: 3500, gamma: 1.25};
Map.addLayer(bare_surface, rgbTrueColor, 'Reflectance of Bare Surfaces');
var BF1 = ee.Image('users/geocis/BareFrequency/BF_1985-01-01_1987-12-31').divide(ee.Number(100));
var BF2 = ee.Image('users/geocis/BareFrequency/BF_1988-01-01_1990-12-31').divide(ee.Number(100));
var BF3 = ee.Image('users/geocis/BareFrequency/BF_1991-01-01_1993-12-31').divide(ee.Number(100));
var BF4 = ee.Image('users/geocis/BareFrequency/BF_1994-01-01_1996-12-31').divide(ee.Number(100));
var BF5 = ee.Image('users/geocis/BareFrequency/BF_1997-01-01_1999-12-31').divide(ee.Number(100));
var BF6 = ee.Image('users/geocis/BareFrequency/BF_2000-01-01_2002-12-31').divide(ee.Number(100));
var BF7 = ee.Image('users/geocis/BareFrequency/BF_2003-01-01_2005-12-31').divide(ee.Number(100));
var BF8 = ee.Image('users/geocis/BareFrequency/BF_2006-01-01_2008-12-31').divide(ee.Number(100));
var BF9 = ee.Image('users/geocis/BareFrequency/BF_2009-01-01_2011-12-31').divide(ee.Number(100));
var BF10 = ee.Image('users/geocis/BareFrequency/BF_2012-01-01_2014-12-31').divide(ee.Number(100));
var collection = BF1.addBands(BF2).addBands(BF3).addBands(BF4).addBands(BF5)
                .addBands(BF6).addBands(BF7).addBands(BF8).addBands(BF9).addBands(BF10);
//print(collection);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '540px'}});
var title = ui.Label('Bare Surfaces of the Earth');
title.style().set('color', 'blue');
title.style().set('fontWeight', 'bold');
title.style().set({
  fontSize: '24px',
  padding: '30px'
});
var blank = ui.Label('');
var checkboxBF = ui.Checkbox('Show Bare Frequency layer', true);
checkboxBF.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
var checkboxBS = ui.Checkbox('Show Bare Surface layer', true);
checkboxBS.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
var subtitle = ui.Label('Click on a point to see the spectral and frequency plots');
subtitle.style().set('color', 'black');
subtitle.style().set('fontWeight', 'bold');
subtitle.style().set({
  fontSize: '18px',
  padding: '30px'
});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'Data from lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(0, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var point2 = ee.Feature(ee.Geometry.Point(coords.lon, coords.lat), {'BSF': 'BSF'});
  Map.layers().set(2, ui.Map.Layer(point, {color: 'FF0000'}).setName('Clicked point'));
  // Define customization options.
  var options1 = {
    title: 'Bare Surface Reflectance',
    hAxis: {title: 'Wavelength (nm)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 2,
    pointSize: 4,
    series: {0: {color: 'FF0000'}}
  };
  // Define a list of Landsat 8 wavelengths for X-axis labels.
  var wavelengths = [485, 560, 660, 830, 1650, 2215];
  // Define a list of years
  var years = ['1986', '1989', '1992', '1995', '1998', '2001', '2004', '2007', '2010', '2013'];
  // Creating the chart of spectral reflectance
  var chart1 = ui.Chart.image.regions(
    bare_surface.divide(ee.Number(10000)), point, ee.Reducer.mean(), 250, 'name', wavelengths)
        .setChartType('ScatterChart')
        .setOptions(options1);
  // Creating the chart of bare surface frequency
  var chart2 = ui.Chart.image.byRegion(
    bare_frequency.divide(ee.Number(100)), point2, ee.Reducer.mean(), 250, 'BSF')
        .setChartType('ColumnChart')
        .setOptions({
    title: 'Bare Surface Frequency',
    vAxis: {title: 'Frequency (%)', minValue: 0, maxValue: 100},
    hAxis: {title: ''},
    legend: {position: 'none'},
    series: {0: {color: 'blue'}}
  });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(1, chart1);
  panel.widgets().set(2, chart2);
});
// Bare Frequency LEGEND
var magmaPaletteLegend = {palette: ['6e40aa', '963db3', 'bf3caf',
                                             'e3419e', 'fe4b83', 'ff5e64',
                                             'ff7747', 'fb9633', 'e2b72f',
                                             'c7d63c', 'c7d63c'],
                   min: 0, max: 100};
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
    padding: '30x 30px',
    color: '000000'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Bare Frequency (%)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 0 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('longitude');
var gradient = lon.multiply((magmaPaletteLegend.max-magmaPaletteLegend.min)/100.0).add(magmaPaletteLegend.min);
var legendImage = gradient.visualize(magmaPaletteLegend);
// create text on top of legend
var max = ui.Label(magmaPaletteLegend['min']);
legend.add(max);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
    params: {bbox:'0,0,100,10', dimensions:'200x20'},  
    style: {padding: '1px', position: 'bottom-center'},
  });
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var min = ui.Label(magmaPaletteLegend['max']);
legend.add(min);
// P A N E L
var side_panel = ui.Panel({
  widgets: [title, checkboxBS, checkboxBF, blank, legend, subtitle, panel],
});
ui.root.add(side_panel);