// This script is used to show the annual coastal maps in Zhoushan, East China
// Created by Wenting Cao (cwt@zju.edu.cn)
var annualmaps = ee.Image("users/cwt3100101983/CoastalDynamics/CoastalCoverTypeStackV12");
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
annualmaps = annualmaps.toInt8()
/*
 * Configure layers and locations
 */
var legends = [{'land': '#23ff5c'}, {'tidal flat': '#f0ff13'}, {'water': '#1b2cff'}]
var visParams =  {"min": 1, "max": 3, "palette": ["#23ff5c", "#f0ff13", "#1b2cff"]}
var layerProperties = {
  '1985': {
    name: 'b1',
    visParams: visParams,
    legend:legends,
    defaultVisibility: true
  },
  '1986': {
    name: 'b2',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1987': {
    name: 'b3',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1988': {
    name: 'b4',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1989': {
    name: 'b5',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1990': {
    name: 'b6',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1991': {
    name: 'b7',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1992': {
    name: 'b8',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1993': {
    name: 'b9',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1994': {
    name: 'b10',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1995': {
    name: 'b11',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1996': {
    name: 'b12',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1997': {
    name: 'b13',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1998': {
    name: 'b14',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '1999': {
    name: 'b15',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2000': {
    name: 'b16',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2001': {
    name: 'b17',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2002': {
    name: 'b18',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2003': {
    name: 'b19',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2004': {
    name: 'b20',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2005': {
    name: 'b21',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2006': {
    name: 'b22',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2007': {
    name: 'b23',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2008': {
    name: 'b24',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2009': {
    name: 'b25',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2010': {
    name: 'b26',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2011': {
    name: 'b27',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2012': {
    name: 'b28',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2013': {
    name: 'b29',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2014': {
    name: 'b30',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2015': {
    name: 'b31',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2016': {
    name: 'b32',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  },
  '2017': {
    name: 'b33',
    visParams: visParams,
    legend:legends,
    defaultVisibility: false
  }
};
/** Map panel configuration*/
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
mapPanel.setCenter(122, 30.3, 10);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = annualmaps.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
/*
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Annual Coastal Cover Type', {fontSize: '36px', color: 'black'});
var text = ui.Label(
    'Results from analysis of Landsat images characterizing coastal dynamics in Zhoushan Archipelago.',
    {fontSize: '14px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
/*
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Science paper by Hansen, Potapov, Moore, Hancher et al.', {},
    'http://science.sciencemag.org/content/342/6160/850');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
*/ 
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('View Different Years', {'font-size': '24px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 10px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 8px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
/*
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Visit Example Locations', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);
*/