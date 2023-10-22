var Globaltraits = ui.import && ui.import("Globaltraits", "imageCollection", {
      "id": "users/almoma153/Global_leaf_traits_v2"
    }) || ee.ImageCollection("users/almoma153/Global_leaf_traits_v2");
var pkg_vis = require('users/almoma153/default:packagesothers/pkg_vis.js');
print(Globaltraits)
///////////////      Leaf dry matter content LDMC (g/g)            ////////////
//let's mask unprocessed data
var LDMC=ee.Image('users/almoma153/Global_leaf_traits_v2/LDMC_1km_v1').select([0],['LDMC']);
var maskgood1=LDMC.gt(0);
var vis_vi1 = {min:0.20 , max: 0.40, palette:pkg_vis.colors.YlOrBr[9]};
var lg_vi1  = pkg_vis.grad_legend(vis_vi1  , 'LDMC (g/g)', false); 
//Map.addLayer(LDMC.mask(maskgood1), vis_vi1,  'LDMC (mm2 / mg)',true)
///////////////      Leaf dry matter content SLA (g/g)            ////////////
//let's mask unprocessed data
var SLA=ee.Image('users/almoma153/Global_leaf_traits_v2/SLA_1km_v1').select([0],['SLA']);
var maskgood2=SLA.gt(0);
var vis_vi2 = {min:7 , max: 22, palette:pkg_vis.colors.YlGnBu[9]};
var lg_vi2  = pkg_vis.grad_legend(vis_vi2  , 'SLA (mm2/g)', false); 
//Map.addLayer(SLA.mask(maskgood2), vis_vi2,  'SLA (mm2 / mg)',true)
///////////////      LNC (mg/g)            ////////////
//let's mask unprocessed data
var LNC=ee.Image('users/almoma153/Global_leaf_traits_v2/LNC_1km_v1').select([0],['LNC']);
var maskgood3=LNC.gt(0);
var vis_vi3 = {min:10 , max: 25, palette:pkg_vis.colors.BuPu[9]};
var lg_vi3  = pkg_vis.grad_legend(vis_vi3  , 'LNC (mg/g)', false); 
//Map.addLayer(LNC.mask(maskgood3), vis_vi3,  'LNC (mg / g)',true)
///////////////      LPC (mg/g)            ////////////
//let's mask unprocessed data
var LPC=ee.Image('users/almoma153/Global_leaf_traits_v2/LPC_1km_v1').select([0],['LPC']);
var maskgood4=LPC.gt(0);
var vis_vi4 = {min:0.7 , max: 1.7, palette:pkg_vis.colors.PuBuGn[9]};
var lg_vi4  = pkg_vis.grad_legend(vis_vi4  , 'LPC (mg/g)', false); 
var alltraits=SLA.mask(maskgood2)
.addBands(LDMC.mask(maskgood1))
.addBands(LNC.mask(maskgood3))
.addBands(LPC.mask(maskgood4)).reduceResolution('median',true,128);
//print(lg_vi2)
var layerProperties = {
  'SLA': {
    name: 'SLA',
    visParams: vis_vi2,
    legend: lg_vi2,
    defaultVisibility: true
  },
  'LDMC': {
    name: 'LDMC',
    visParams: vis_vi1,
    legend: lg_vi1,
    defaultVisibility: false
  },
  'LNC': {
    name: 'LNC',
    visParams: vis_vi3,
    legend: lg_vi3,
    defaultVisibility: false
  },
    'LPC': {
    name: 'LPC',
    visParams: vis_vi4,
    legend: lg_vi4,
    defaultVisibility: false
  }
};
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
//var defaultLocation = locationDict['Deforestation in Paraguay'];
mapPanel.setCenter(-30,22,3)
   // defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = alltraits.select(layer.name).visualize(layer.visParams);
  //var masked = addZeroAndWaterMask(image, alltraits.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Global Leaf trait estimates', {fontSize: '30px', color: 'black' , fontWeight: 'bold'});
var text = ui.Label(
    'We provide global maps of leaf traits at 1km spatial resolution. In particular, we present global maps of specific leaf area (SLA), leaf dry matter content (LDMC), leaf nitrogen content per dry mass (LNC),  and leaf phosphorus content per dry mass (LPC). The methodology combines MODIS and Landsat data, climatological data  (Worldclim), the largest traits database (TRY) and machine learning algorithms. Croplands and bare soil areas have been masked.',
    {fontSize: '13px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Remote Sensing of Environment paper by Moreno et al. (2018)', {},
    'https://doi.org/10.1016/j.rse.2018.09.006');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
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
//print(layerProperties['SLA'].legend)
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Leaf trait selection:', {'font-size': '18px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  keyPanel.add(legend);
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
var table = ui.Chart(
               [[ '<img src="https://i.ibb.co/L1LcVq9/logos.jpg" width=220px>']]
       ,'Table', {allowHtml: true});
var titlePanel = ui.Panel([table], 'flow', {width: '270px', padding: '0px', backgroundColor: 'white' });
//ui.root.insert(0, titlePanel);
var paneltemp1 = ui.Panel({style: {position: 'bottom-left'}});
//var headlat    = ui.Label('Main contributors',{fontSize: '14px', color: 'Black'});
paneltemp1.add(ui.Panel(titlePanel))
mapPanel.widgets().set(2, paneltemp1)