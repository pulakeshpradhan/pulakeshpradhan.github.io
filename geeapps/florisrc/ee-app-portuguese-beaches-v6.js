// EE App to compare 5-year composites of continental Portuguese beaches 
// Load final beach mask
var finalBeachMask = ee.FeatureCollection('users/florisrc/finalBeachMask')
// Create dictionary with images
var images = {
  'Beach 1984-89': ee.Image('users/florisrc/mosaicBeach1'),
  'Beach 1989-94': ee.Image('users/florisrc/mosaicBeach2'),
  'Beach 1994-99': ee.Image('users/florisrc/mosaicBeach3'),
  'Beach 1999-04': ee.Image('users/florisrc/mosaicBeach4'),
  'Beach 2004-09': ee.Image('users/florisrc/mosaicBeach5'),
  'Beach 2009-14': ee.Image('users/florisrc/mosaicBeach6'),
  'Beach 2014-19': ee.Image('users/florisrc/mosaicBeach7'),
  'Sand Gain/Loss 1984-89 vs 2014-19': ee.Image('users/florisrc/change1984vs2014'),
  'Sand Gain/Loss Complete 1984-89 vs 2014-19': ee.Image('users/florisrc/change1984vs2014complete'),
  'Shore- and Coastlines': ee.Image('users/florisrc/mosaicShoreAndCoastLines'),
};
// Dictionary for legend
var dict = {
  '1984-89': '0e1583',
  '1989-94': '23aed1',
  '1994-99': '18f21b',
  '1999-04': 'ccf808',
  '2004-09': 'f8f819',
  '2009-14': 'f89608',
  '2014-19': 'f80808'
};
var dict2 = {
  'Unchanged': 'FFFF00',
  'Gain': '008000',
  'Loss': 'FF0000'
};
// Create two maps.
var leftMap = ui.Map();
//leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
//rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]))
}
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0px', position: position}});
  mapToChange.add(controlPanel);
  // Add legend for 
  var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '9px',
          margin: '1 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
      });
  };
   // Add legend sand gain/loss
  var secondaryLegend = ui.Panel({
    widgets: [ui.Label({value: 'Sand changes', style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0px' }})],
    style: {width: '160px', padding: '8px', position: 'bottom-left'}
  })
  Object.keys(dict2).map(function(key) {
  var value = dict2[key]
  return secondaryLegend.add(makeRow(value, key));
  })
  mapToChange.add(secondaryLegend);
    var mainLegend = ui.Panel({
    widgets: [ui.Label({value: 'Beaches/shore- and coastlines', style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0px' }})],
    style: {width: '160px', padding: '8px', position: 'bottom-left'}
  })
  Object.keys(dict).map(function(key) {
  var value = dict[key]
  return mainLegend.add(makeRow(value, key));
  })
  mapToChange.add(mainLegend);
}
leftMap.setControlVisibility({zoomControl: true});
leftMap.setCenter(-9.2, 40, 6.3)
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
var app = {}
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Continental Portuguese Beach Change Explorer ',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This application can be used to explore ' +
               'how continental Portuguese beaches ' +
               'evolved over the last decades.'),
      ui.Label('The slider can be used to compare different ' +
               'images. Slide it to one side to ' + 
               'analyse individual images. ')
    ])
  };
}
app.createPanels()
var main = ui.Panel({
    widgets: [
      app.intro.panel,
      // app.filters.panel,
      // app.views.panel
    ],
    style: {width: '320px', padding: '8px'}
});
ui.root.widgets().reset();
ui.root.insert(0,main);
ui.root.insert(1,splitPanel);