var necoast = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-74.02587890625, 41.06231485732392],
          [-73.01513671875, 40.429747919609724],
          [-69.521484375, 41.16164344037809],
          [-70.02685546875, 42.552619913667606],
          [-70.29052734375, 42.955965122403214],
          [-69.27978515625, 43.56401874374831],
          [-67.412109375, 44.30767946955783],
          [-66.73095703125, 44.55871811691956],
          [-67.34619140625, 45.057559971566114],
          [-69.98291015625, 44.59002212257727],
          [-71.3671875, 43.579938131822814],
          [-71.4990234375, 42.341843351631155],
          [-72.685546875, 41.57389377874231]]]),
    imageVisParamz = {"opacity":1,"bands":["z"],"max":4,"palette":["00100b","08242f","0b3445","0d3e52","166585","1e89b4","239dce","2bc3ff"]},
    RI = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-72.03977734081292, 40.82789751454926],
          [-70.74339062206292, 40.96077368527267],
          [-70.99058300487542, 42.11610928923018],
          [-72.12766796581292, 42.09573221731934]]]),
    Secchi = ee.Image("users/nateme16/median_secchi");
//This is awesome Josh! Lets scheme some ways to use it and get it out. 
imageVisParamz = {"opacity":1,"bands":["z"],"max":4,"palette":["00100b","08242f","0b3445","0d3e52","166585","1e89b4","239dce","2bc3ff"]};
//var yearpick = 2018;
//Time window
var startyear = 2013;
var endyear = 2019;
var startmonth = 6;
var endmonth = 10;
var resultmedian=Secchi
//print(resultmedian,"result median")
var mapPanel = ui.Map();
mapPanel.addLayer(resultmedian,imageVisParamz,"Secchi model")
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
/*
* Left panel configuration
*/
var inspectorPanel = ui.Panel({
  style: {
    width: '20%',
    padding: '20px'
  }
});
var intro = ui.Panel([
  ui.Label({
    value: 'Clarity / Secchi Depth Map',
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  }),
  ui.Label('Click to get median secchi depth in meters '+'(June-September 2013-2019)')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the results and legend.
inspectorPanel.add(ui.Label(''));
inspectorPanel.add(ui.Label('[Legend]'));
mapPanel.setCenter(-71.33577786547232, 41.55985489192897, 11);
function getSecchiDepth(coords) {
  // Show the loading label.
  inspectorPanel.widgets().set(2, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  var sample = resultmedian.sample(point, 30);
  var computedValue = sample.first().get('z');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // Update the lon/lat panel with values from the click event.
    lon.setValue('lon: ' + coords.lon.toFixed(4));
    lat.setValue('lat: ' + coords.lat.toFixed(4));
    if (result) {
      // When the server returns the value, show it.
      inspectorPanel.widgets().set(2, ui.Label({
        value: 'Secchi (m): ' + result.toFixed(2),
      }));
    } else {
      // write an error message if result is undefined
      inspectorPanel.widgets().set(2, ui.Label({
        value: 'Undefined or invalid secchi depth!',
        style: {
          fontWeight: 'bold',
          color: '#FF0000'
        }
      }));
    }
  });
}
// register the onClick callback
mapPanel.onClick(getSecchiDepth);
/*
* Legend setup
*/
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
  params: makeColorBarParams(imageVisParamz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(imageVisParamz.min, {margin: '4px 8px'}),
    ui.Label(
        (imageVisParamz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(imageVisParamz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'secchi depth in meters',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
/*
* Initialize the app
*/
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
// Export the image, specifying scale and region.
Export.image.toAsset({
  image: resultmedian,
  description: 'median_secchi',
  scale: 30,
  maxPixels: 1e9,
  region: RI
});