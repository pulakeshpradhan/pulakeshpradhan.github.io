var Belmar = ui.import && ui.import("Belmar", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -105.08341823752271,
                39.712996873665254
              ],
              [
                -105.08341823752271,
                39.70520540638174
              ],
              [
                -105.07200275595532,
                39.70520540638174
              ],
              [
                -105.07200275595532,
                39.712996873665254
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-105.08341823752271, 39.712996873665254],
          [-105.08341823752271, 39.70520540638174],
          [-105.07200275595532, 39.70520540638174],
          [-105.07200275595532, 39.712996873665254]]], null, false);
//Chapter F6.1
//Sharing Work in Earth Engine: Basic UI and Apps
//2022.02.15
var dataset = ee.ImageCollection('USGS/NLCD_RELEASES/2016_REL');
//Create a GIF
//select the land cover band 
var NLCD_lc = dataset.select('landcover');
//Filter NLCD collection to 2001
var NLCD_2001 = NLCD_lc.filter(ee.Filter.eq('system:index', '2001')).first();
var NLCD_01_Bel = NLCD_2001.clip(Belmar);
//Map.addLayer(NLCD_01_Bel, {}, 'NLCD 2001');
//Filter NLCD collection to 2004
var NLCD_2004 = NLCD_lc.filter(ee.Filter.eq('system:index', '2004')).first();
var NLCD_04_Bel = NLCD_2004.clip(Belmar);
//Map.addLayer(NLCD_04_Bel, {}, 'NLCD 2004');
//Filter NLCD collection to 2011
var NLCD_2011 = NLCD_lc.filter(ee.Filter.eq('system:index', '2011')).first();
var NLCD_11_Bel = NLCD_2011.clip(Belmar);
//Map.addLayer(NLCD_11_Bel, {}, 'NLCD 2011');
//Create collection for target years
var collection = ee.ImageCollection([NLCD_01_Bel, NLCD_04_Bel, NLCD_11_Bel]);
var gifParams = {
  bands: ['landcover'],
  region: Belmar,
  framesPerSecond: 4,
  format: 'gif'
};
//Render the GIF animation in the console
//print('Change in Belmar footprint from 2001-2004 and 2004-2011:', ui.Thumbnail(collection, gifParams));
var thumb = ui.Thumbnail({
  // Specifying a collection for "image" animates the sequence of images.
  image: collection, 
  params: gifParams,
  style: {
    position: 'bottom-left',
    width: '320px'
  }});
  print(thumb.style());
//Practicum Code
//------------------------------------------------------
// Get an NLCD image by year.
var getNLCD = function(year) {
  // Import the NLCD collection.
  // Filter the collection by year.
  var nlcd = dataset.filter(ee.Filter.eq('system:index', year)).first();
  // Select the land cover band.
  var landcover = nlcd.select('landcover');
  return ui.Map.Layer(landcover, {}, year);  
};
// Create a dictionary with each year as the key 
// and its corresponding NLCD image layer as the value.
var images = {
  '2001': getNLCD('2001'),
  '2004': getNLCD('2004'),
  '2006': getNLCD('2006'),
  '2008': getNLCD('2008'),
  '2011': getNLCD('2011'),
  '2013': getNLCD('2013'),
  '2016': getNLCD('2016'),
};
print(images);
// Create the left map, and have it display the first layer.
var leftMap = ui.Map().add(thumb)//.add(title);
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display the last layer.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 6, 'top-right');
// Adds a layer selection widget to the given map, to allow users to 
// change which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select a year:');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    // mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(0, images[selection]);
  }
  // Configure a selection dropdown to allow the user to choose
  // between images, and set the map to update when a user 
  // makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Set the legend title.
var title = 'NLCD Land Cover Classification';
// Set the legend position.
var position = 'bottom-right';
// Define a dictionary that will be used to make a legend
var dict = {
  names: [
    "11	Open Water",
    "12	Perennial Ice/Snow",
    "21	Developed, Open Space",
    "22	Developed, Low Intensity",
    "23	Developed, Medium Intensity", 
    "24	Developed, High Intensity",
    "31	Barren Land (Rock/Sand/Clay)",
    "41	Deciduous Forest",
    "42	Evergreen Forest",
    "43	Mixed Forest",
    "51	Dwarf Scrub",
    "52	Shrub/Scrub",
    "71	Grassland/Herbaceous", 
    "72	Sedge/Herbaceous",
    "73	Lichens",
    "74	Moss",
    "81	Pasture/Hay",
    "82	Cultivated Crops",
    "90	Woody Wetlands",
    "95	Emergent Herbaceous Wetlands", 
  ],
  colors: [
    '#466b9f', '#d1def8', '#dec5c5', '#d99282', '#eb0000', '#ab0000',
    '#b3ac9f', '#68ab5f', '#1c5f2c', '#b5c58f', '#af963c', '#ccb879',
    '#dfdfc2', '#d1d182', '#a3cc51', '#82ba9e', '#dcd939', '#ab6c28',
    '#b8d9eb', '#6c9fb8',
    ]
};
// Create a panel to hold the legend widget.
var legend = ui.Panel({
  style: {
    position: position,
    padding: '8px 15px'
  }
});
// Function to generate the legend.
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict.colors;
  var names = dict.names;
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  rightMap.add(panel);
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-105.07832536655292, 39.70909, 14);
addCategoricalLegend(legend, dict, title);