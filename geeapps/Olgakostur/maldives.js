var label = ui.Label('My GEE Label!');
print(label);
// To break up a label to different lines :
var label = ui.Label('This app\ncalculates area \nas well as parameter', {whiteSpace: 'pre'});
print(label);
var button = ui.Button({
  label: 'Zoom to Kolhumadulu',
  onClick: function() {
    Map.setCenter(73.22899822178088, 2.266393578083512, 10);
  }
});
print(button);
var image = ee.Image('users/Olgakostur/Surface5s')
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
Map.centerObject(image,10)
//////////////////
var legend3 = ui.Panel({
style: {
position: 'top-center',
padding: '8px 15px',
fontWeight: 'bold',
fontSize: '18px',
textAlign : 'center'
}
});
// Create legend title
var legendTitle2 = ui.Label({
value: 'Click to get the bathymetry at the location.',
style: {
fontWeight: 'normal',
fontSize: '13px',
margin: '0 0 4px 0',
padding: '8px 15px',
textAlign : 'center'
}
});
var title = 'Bathymetry of the shallow regions of the Maldives (Low Resolution 5 arc seconds)';
legend3.widgets().set(0, ui.Label(title));
Map.add(legend3);
var image2 = ee.FeatureCollection("users/Olgakostur/Islands_Maldives_Contours");
var image3 = ee.FeatureCollection('users/Olgakostur/Lagoons_Maldives');
image = image.clip(image3)
Map.addLayer(image2.draw({color: '006600', strokeWidth: 1}), {}, 'Land');
var tmax = image.select('b1');
// Get a palette: a list of hex strings
var palettes = require('users/gena/packages:palettes');
var palette = palettes.kovesi.linear_blue_5_95_c73[7];
//var palette = palettes.matplotlib.viridis[7]
var elevationVis = {
  min: -250,
  max: 0.0,
  palette: ['011de2', 'afafaf', '3603ff', 'fff477', 'b42109'],
};
//Map.addLayer(image, elevationVis, 'Bathymetry @ 5 arcseconds (Diverged colour scheme)');
// Display max temp with defined palette stretched between selected min and max
Map.addLayer(tmax, {min: -15, max: 0, palette: palette}, 'Bathymetry @ 5 arcseconds');
Map.addLayer(image2.draw({color: '006600', strokeWidth: 1}), {}, 'Land');
//////////////////////////////////
// set position of panel
var viz = {
  min: -15,
  max: 0.0,
  palette: palette,
};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Bathymetry (m)',
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
params: {bbox:'0,0,10,100', dimensions:'25x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [////////////////////
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend);
legend.add(legendTitle2);
////////////////////////////////
var legend2 = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var demValue = image.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var demText = 'Bathymetry Value: ' + val.b1;
    //legend2.widgets().set(0, ui.Label('aaaaaaaaaaaaaaaaaa'));
    legend2.widgets().set(0, ui.Label(demText));
  });
});
Map.add(legend2);