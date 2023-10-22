var nlcdFull = ui.import && ui.import("nlcdFull", "imageCollection", {
      "id": "USGS/NLCD_RELEASES/2019_REL/NLCD"
    }) || ee.ImageCollection("USGS/NLCD_RELEASES/2019_REL/NLCD");
//Chapter F6.1, Basic UI and Apps
//Hanna Petroski
//Get an NLCD image by year
var getNLCD = function(year) {
  //import NLCD collection
  var nlcdFull = ee.ImageCollection('USGS/NLCD_RELEASES/2019_REL/NLCD')
  //filter data collection by year
  var nlcd = nlcdFull.filter(ee.Filter.eq('system:index', year)).first();
  //select land cover band
  var landcover = nlcd.select('landcover');
  return ui.Map.Layer(landcover, {}, year);
}
//create dictionary with each year as key, corresponding NLCD image layer as value
var images = {
  '2001': getNLCD('2001'),
  '2004': getNLCD('2004'),
  '2006': getNLCD('2006'),
  '2008': getNLCD('2008'),
  '2011': getNLCD('2011'),
  '2013': getNLCD('2013'),
  '2016': getNLCD('2016'),
  '2019': getNLCD('2019'),
};
//create left map and have it display first layer
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//create right map and have it display last layer
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 6, 'top-right');
//add layer selection widget to given map to allow users to change which image is displayed in associated map
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select a year:');
  //this function changes given map to show selected image
  function updateMap(selection) {
    //mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(0, images[selection]);
  }
  //configure selection dropdown to allow user to choose between images
  //set map to update when user makes selection
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//set legend title
var title = 'NLCD Land Cover Classification';
//set legend position
var position = 'bottom-right';
//define dictionary used to make legend
var dict = {
  names: [
    "11   Open Water",
    "12   Perennial Ice/Snow",
    "21   Developed, Open Space",
    "22   Developed, Low Intensity",
    "23   Developed, Medium Intensity",
    "24   Developed, High Intensity",
    "31   Barren Land (Rock/Clay/Sand",
    "41   Deciduous Forest",
    "42   Evergreen Forest",
    "43   Mixed Forest",
    "51   Dwarf Scrub",
    "52   Shrub/Scrub",
    "71   Grassland/Herbaceous",
    "72   Sedge/Herbaceous",
    "73   Lichens",
    "74   Moss",
    "81   Pasture/Hay",
    "82   Cultivated Crops",
    "90   Woody Wetlands",
    "95   Emergent Herbaceous Wetlands",
    ],
    colors: [
      '#466b9f', '#d1def8', '#dec5c5', '#d99282', '#eb0000', '#ab0000',
      '#b3ac9f', '#68ab5f', '#1c5f2c', '#b5c58f', '#af963c', '#ccb879',
      '#dfdfc2', '#d1d182', '#a3cc51', '#82ba9e', '#dcd939', '#ab6c28',
      '#b8d9eb', '#6c9fb8',
      ]
};
//create panel to hold legend widget
var legend = ui.Panel({
  style: {
    position: position,
    padding: '8px 15px'
  }
});
//function to generate legend
function addCategoricalLegend(panel, dict, title) {
  //create and add legend title
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '4px 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  //creates and styles 1 row of legend
  var makeRow = function(color, name) {
    //create label that is actually the colored box
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        //use padding to give box height and width
        padding: '8px',
        margin: '0 0 4px 6px'
      }
    });
    //create label filled with description text
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.flow('horizontal')
    });
  };
  //get list of palette colors and class names from image
  var palette = dict.colors;
  var names = dict.names;
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  rightMap.add(panel);
}
addCategoricalLegend(legend, dict, title);
//create a SplitPanel to hold adjacent, linked maps
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
//set SplitPanel as only thing in UI root
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-100, 40, 4);