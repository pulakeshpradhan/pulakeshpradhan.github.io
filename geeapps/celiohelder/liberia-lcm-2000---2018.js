var image = ui.import && ui.import("image", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2000"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2000"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2001"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2001"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2002"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2002"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2003"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2003"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2004"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2004"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2005"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2005"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2006"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2006"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2007"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2007"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2008"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2008"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2009"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2009"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2010"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2010"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2011"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2011"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2012"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2012"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2013"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2013"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2014"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2014"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2015"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2015"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2016"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2016"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2017"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2017"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/celiohelder/Liberia/LandCoverMaps/Annual/Y2018"
    }) || ee.Image("users/celiohelder/Liberia/LandCoverMaps/Annual/Y2018"),
    liberia = ui.import && ui.import("liberia", "table", {
      "id": "users/celiohelder/Liberia/LiberiaBorderBuffer"
    }) || ee.FeatureCollection("users/celiohelder/Liberia/LiberiaBorderBuffer");
var paletteNASA = [
  '006EFA', // Water Bodies
  'C896FF', // Mangroves and Wetlands
  'FF0000', // Artificial Surfaces
  '828282', // Bare Soil
  'FFAA00', // Woody Crops
  'A5FF73', // Grasslands
  '5C8944', // Primary Lowland Forests 
  '70A800', // Secondary Lowland Forests
  'EBFFBE', // Mixed Vegetation
];
// Create a legend for the map
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
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
legend.add(makeRow('006EFA', 'Water Bodies'));
legend.add(makeRow('C896FF', 'Mangroves and Wetlands'));
legend.add(makeRow('FF0000', 'Artificial Surfaces'));
legend.add(makeRow('828282', 'Bare Soil'));
legend.add(makeRow('FFAA00', 'Woody Crops'));
legend.add(makeRow('A5FF73', 'Grasslands'));
legend.add(makeRow('5C8944', 'Primary Lowland Forests'));
legend.add(makeRow('70A800', 'Secondary Lowland Forests'));
legend.add(makeRow('EBFFBE', 'Mixed Vegetation'));
// Add the legend to the map.
Map.add(legend);
// ==================== MAPS =====================
var Y2000 = image.clip(liberia)
var Y2001 = image2.clip(liberia)
var Y2002 = image3.clip(liberia)
var Y2003 = image4.clip(liberia)
var Y2004 = image5.clip(liberia)
var Y2005 = image6.clip(liberia)
var Y2006 = image7.clip(liberia)
var Y2007 = image8.clip(liberia)
var Y2008 = image9.clip(liberia)
var Y2009 = image10.clip(liberia)
var Y2010 = image11.clip(liberia)
var Y2011 = image12.clip(liberia)
var Y2012 = image13.clip(liberia)
var Y2013 = image14.clip(liberia)
var Y2014 = image15.clip(liberia)
var Y2015 = image16.clip(liberia)
var Y2016 = image17.clip(liberia)
var Y2017 = image18.clip(liberia)
var Y2018 = image19.clip(liberia)
Map.addLayer(Y2000, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2000');
Map.addLayer(Y2001, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2001');
Map.addLayer(Y2002, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2002');
Map.addLayer(Y2003, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2003');
Map.addLayer(Y2004, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2004');
Map.addLayer(Y2005, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2005');
Map.addLayer(Y2006, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2006');
Map.addLayer(Y2007, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2007');
Map.addLayer(Y2008, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2008');
Map.addLayer(Y2009, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2009');
Map.addLayer(Y2010, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2010');
Map.addLayer(Y2011, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2011');
Map.addLayer(Y2012, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2012');
Map.addLayer(Y2013, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2013');
Map.addLayer(Y2014, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2014');
Map.addLayer(Y2015, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2015');
Map.addLayer(Y2016, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2016');
Map.addLayer(Y2017, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2017');
Map.addLayer(Y2018, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2018');
Map.setCenter(-9.3556, 6.3778,9);
// Add the Layers to the Map
var linkedMap = new ui.Map();
linkedMap.addLayer(Y2000, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2000');
linkedMap.addLayer(Y2001, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2001');
linkedMap.addLayer(Y2002, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2002');
linkedMap.addLayer(Y2003, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2003');
linkedMap.addLayer(Y2004, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2004');
linkedMap.addLayer(Y2005, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2005');
linkedMap.addLayer(Y2006, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2006');
linkedMap.addLayer(Y2007, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2007');
linkedMap.addLayer(Y2008, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2008');
linkedMap.addLayer(Y2009, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2009');
linkedMap.addLayer(Y2010, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2010');
linkedMap.addLayer(Y2011, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2011');
linkedMap.addLayer(Y2012, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2012');
linkedMap.addLayer(Y2013, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2013');
linkedMap.addLayer(Y2014, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2014');
linkedMap.addLayer(Y2015, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2015');
linkedMap.addLayer(Y2016, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2016');
linkedMap.addLayer(Y2017, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2017');
linkedMap.addLayer(Y2018, {min: 1, max: 9, palette: paletteNASA}, 'Liberia LCM Year 2018');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
//var inset = ui.Map({style: {position: "bottom-right"}}).setControlVisibility(false);
//linkedMap.add(inset);
// // Register a function to the linked map to update the inset map.
// linkedMap.onChangeBounds(function() {
//   var bounds = ee.Geometry.Rectangle(Map.getBounds());
//   inset.centerObject(bounds);
//   inset.layers().set(0, bounds);
// });
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = new ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(-9.3556, 6.3778, 13);
// Remove UI controls from both maps, but leave zoom control on the left map.
linkedMap.setControlVisibility(false);
Map.setControlVisibility(false);
//========================== CREATE THE SELECTOR
// Names of the items we want to vizualize on the right map.
var selectorItems = ['Liberia LCM Year 2000', 
                     'Liberia LCM Year 2001',
                     'Liberia LCM Year 2002',
                     'Liberia LCM Year 2003',
                     'Liberia LCM Year 2004',
                     'Liberia LCM Year 2005',
                     'Liberia LCM Year 2006',
                     'Liberia LCM Year 2007',
                     'Liberia LCM Year 2008',
                     'Liberia LCM Year 2009',
                     'Liberia LCM Year 2010',
                     'Liberia LCM Year 2011',
                     'Liberia LCM Year 2012',
                     'Liberia LCM Year 2013',
                     'Liberia LCM Year 2014',
                     'Liberia LCM Year 2015',
                     'Liberia LCM Year 2016',
                     'Liberia LCM Year 2017',
                     'Liberia LCM Year 2018',
];
var selectorChanged = function(value, widget) {
  var selectorMap = {'Liberia LCM Year 2000': 0, 
                     'Liberia LCM Year 2001': 1, 
                     'Liberia LCM Year 2002': 2,
                     'Liberia LCM Year 2003': 3,
                     'Liberia LCM Year 2004': 4,
                     'Liberia LCM Year 2005': 5,
                     'Liberia LCM Year 2006': 6,
                     'Liberia LCM Year 2007': 7,
                     'Liberia LCM Year 2008': 8,
                     'Liberia LCM Year 2009': 9,
                     'Liberia LCM Year 2010': 10,
                     'Liberia LCM Year 2011': 11,
                     'Liberia LCM Year 2012': 12,
                     'Liberia LCM Year 2013': 13,
                     'Liberia LCM Year 2014': 14,
                     'Liberia LCM Year 2015': 15,
                     'Liberia LCM Year 2016': 16,
                     'Liberia LCM Year 2017': 17,
                     'Liberia LCM Year 2018': 18,
};
  var activeIndex = selectorMap[value];
  linkedMap.layers().forEach(function(element, index) {
    element.setShown(index === activeIndex);
  });
};
//========================== CREATE THE SELECTOR
// Names of the items we want to vizualize on the right map.
var selectorItems_L = ['Liberia LCM Year 2000', 
                     'Liberia LCM Year 2001',
                     'Liberia LCM Year 2002',
                     'Liberia LCM Year 2003',
                     'Liberia LCM Year 2004',
                     'Liberia LCM Year 2005',
                     'Liberia LCM Year 2006',
                     'Liberia LCM Year 2007',
                     'Liberia LCM Year 2008',
                     'Liberia LCM Year 2009',
                     'Liberia LCM Year 2010',
                     'Liberia LCM Year 2011',
                     'Liberia LCM Year 2012',
                     'Liberia LCM Year 2013',
                     'Liberia LCM Year 2014',
                     'Liberia LCM Year 2015',
                     'Liberia LCM Year 2016',
                     'Liberia LCM Year 2017',
                     'Liberia LCM Year 2018',
];
var selectorChanged_L = function(value, widget) {
  var selectorMap = {'Liberia LCM Year 2000': 0, 
                     'Liberia LCM Year 2001': 1, 
                     'Liberia LCM Year 2002': 2,
                     'Liberia LCM Year 2003': 3,
                     'Liberia LCM Year 2004': 4,
                     'Liberia LCM Year 2005': 5,
                     'Liberia LCM Year 2006': 6,
                     'Liberia LCM Year 2007': 7,
                     'Liberia LCM Year 2008': 8,
                     'Liberia LCM Year 2009': 9,
                     'Liberia LCM Year 2010': 10,
                     'Liberia LCM Year 2011': 11,
                     'Liberia LCM Year 2012': 12,
                     'Liberia LCM Year 2013': 13,
                     'Liberia LCM Year 2014': 14,
                     'Liberia LCM Year 2015': 15,
                     'Liberia LCM Year 2016': 16,
                     'Liberia LCM Year 2017': 17,
                     'Liberia LCM Year 2018': 18,
};
  var activeIndex = selectorMap[value];
  Map.layers().forEach(function(element, index) {
    element.setShown(index === activeIndex);
  });
};
// Define the selector to add to the right map, and add it.
var selectorright = ui.Select({
  items: selectorItems,
  value: selectorItems[1],
  onChange: selectorChanged,
  style: {'position': 'top-right'}
});
linkedMap.add(selectorright);
// Second Selector
var selectorleft = ui.Select({
  items: selectorItems_L,
  value: selectorItems_L[0],
  onChange: selectorChanged_L,
  style: {'position': 'top-left'}
});
Map.add(selectorleft);