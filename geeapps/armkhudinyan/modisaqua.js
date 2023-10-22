var AQUA = ui.import && ui.import("AQUA", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -9.390136718750005,
            37.86016210232899
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-9.390136718750005, 37.86016210232899]);
// The region of interest (Hindu Kush Himalaya) 
var rect = ee.Geometry.Rectangle({
  coords: [[-20, 30], [1, 45]],
  geodesic: false
});
Map.centerObject(rect, 5); // Zooms to the study area at level 3
/*
 * Load MODIS-Aqua data
 */
// Collect Daily Global MODIS Aqua L3 product for the 2015 year
var MODIS_AQUA = ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI")
                   .filterDate('2019-07-01', '2019-07-31')
                   .filterBounds(rect);
var Aqua_Rrs =
    MODIS_AQUA
    .select(['Rrs_645', 'Rrs_555', 'Rrs_443'])
    .median()
    //.filterBounds(rect);
var Bands = ['Rrs_645', 'Rrs_555', 'Rrs_443']
var Rrs_Vis = {
  min: 0,
  max: 0.011,
};
// Add layers to map
//Map.addLayer(Aqua_Rrs.clip(rect), Rrs_Vis, 'Remote Sensing Reflectance');
//Map.addLayer(MODIS_AQUA.select('poc').median().clip(rect), {min:0, max:100, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}, 'POC', true);
//Map.addLayer(MODIS_AQUA.select('chlor_a').median().clip(rect), {min:0, max:10, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}, 'Chl_a', true);
//Map.addLayer(MODIS_AQUA.select('sst').median().clip(rect), {min:10, max:30, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}, 'SST', true);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Spectral Profiling // 
// make a dictionary containing the images
var images = {
  'Remote Sensing Reflectance': Aqua_Rrs.clip(rect).visualize(Rrs_Vis),
  'SST':   MODIS_AQUA.select('sst').median().clip(rect).visualize({min:10, max:30, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}),
  'Chl_a': MODIS_AQUA.select('chlor_a').median().clip(rect).visualize({min:0, max:10, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}),
  //'POC':   MODIS_AQUA.select('poc').median().clip(rect).visualize({min:0, max:100, palette: ['000080','0080FF','7BFF7B','FF9700','800000']}),
  'NFLH':   MODIS_AQUA.select('nflh').median().clip(rect).visualize({min:0, max:1, palette: ['000080', 'cyan', 'green', 'yellow']}),
};
//var ex = MODIS_AQUA.select('sst').median().clip(rect)
//var sampledPoint = ex.reduceRegion(ee.Reducer.mean(), geometry, 30).get('sst')
//print(sampledPoint)
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var map = ui.Map();
map.setControlVisibility(false);
var leftSelector = addLayerSelector(map, 0, 'top-left');
map.centerObject(rect, 6);
map.style().set('cursor', 'crosshair');
//var panel = ui.Panel({style: {width: '250px'}});
//ui.root.add(panel).add(map);
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {width: '250px', position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Set up the Click information
 */
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Click to get the pixel values'));
// Add the panel to the default map.
map.add(inspector);
// Register a callback on the map to be invoked when the map is clicked.
map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sst =   MODIS_AQUA.select('sst').median().clip(rect);
  var chl_a = MODIS_AQUA.select('chlor_a').median().clip(rect);
  var poc =   MODIS_AQUA.select('nflh').median().clip(rect);
  var sample = ee.Image.cat(sst, chl_a, poc).unmask(0).sample(point, 30).first().toDictionary();
  //var sst_show = sample.reduceRegion(ee.Reducer.mean(), point, 30).get(['sst', 'chlor_a', 'poc']);
  // Request the value from the server and use the results in a function.
  sample.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    //inspector.add(ui.Label({
    //  value: ['SST: ' + result.sst.toFixed(2) + '°C', 'Chl-a: ' + result.chlor_a.toFixed(2) + ' mg/m-3'],
    //  style: {stretch: 'vertical'}
    //}))
    inspector.add(ui.Label('SST: ' + result.sst.toFixed(2) + ' °C'));
    inspector.add(ui.Label('Chl-a: ' + result.chlor_a.toFixed(2) + ' mg/m-3'));
    //inspector.add(ui.Label('POC: ' + result.poc.toFixed(2) + ' mg/m-3'));
    inspector.add(ui.Label('NFLH: ' + result.nflh.toFixed(2) + ' mW cm-2 µm-1 sr-1'));
   // Add a button to hide the Panel.
      inspector.add(ui.Button({
        label: 'Close',
        onClick: function() {
          inspector.style().set('shown', false);
        }
    }));
  });
});
/*
 * Tie everything together
 */
ui.root.clear();
//var panel = ui.Panel({style: {width: '250px'}});
//var map = ui.Map();
ui.root.add(map);
//ui.root.add(panel).add(map);