// display human modification maps
var lse = require('users/DavidTheobald8/modules:lse')
var mask = ee.Image("users/DavidTheobald8/gHM/landLakeResOcean300m")
//user variables 
var PAs = ee.FeatureCollection('WCMC/WDPA/current/polygons')
var H = ee.Image("users/DavidTheobald8/gHM/gHMv1_2015_300_60s").multiply(mask.remap([1,3],[1,1]))
var H2015c = ee.Image("users/DavidTheobald8/gHM/gHMv1_2015_300_60c").multiply(mask.remap([1,3],[1,1]))
var H1990c = ee.Image("users/DavidTheobald8/gHM/gHMv1_1990_300_60c").multiply(mask.remap([1,3],[1,1]))
var gHM = ee.Image("users/DavidTheobald8/gHM/gHM_all_ave_20171018").reproject({crs: 'EPSG:4326', scale: 1000})
var HFP = ee.Image("users/DavidTheobald8/HFP/HFP2009")
var HFP = HFP.reproject({crs: 'EPSG:4326', scale: 1000}).divide(50.0) // max normalize
var PAs = ee.Image().byte().paint({
  featureCollection: PAs,
  color: 2,
  width: 1
})
var HMad = ee.Image("users/DavidTheobald8/gHM/AnnualizedDifferenceHM")
var HFad = ee.Image("users/DavidTheobald8/gHM/AnnualizedDifferenceHF") //.reproject({crs: 'EPSG:4326', scale: 1000})
var THPIad = ee.Image("users/DavidTheobald8/gHM/AnnualizedDifferenceTHPI") //.reproject({crs: 'EPSG:4326', scale: 1000})
var rgb = ee.Image(1).visualize({
          "min": [1.0],
          "max": [1.0],
          "palette": ["ffffff"]
        });
var imageBackground = ee.ImageCollection([rgb]).mosaic()
var palette = lse.colorPalette('viridisMagma', 10) // 'colorBrewerRdYlGn',
var rgb = H.visualize({
          "min": [0.0],
          "max": [1.0],
          "palette": palette //["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
        });
var imageH = ee.ImageCollection([rgb]).mosaic()
var rgb = H2015c.visualize({
          "min": [0.0],
          "max": [1.0],
          "palette": palette //["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
        });
var imageH2015c = ee.ImageCollection([rgb]).mosaic()
var rgb = H1990c.visualize({
          "min": [0.0],
          "max": [1.0],
          "palette": palette //["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
        });
var imageH1990c = ee.ImageCollection([rgb]).mosaic()
var rgb = gHM.visualize({
          "min": [0.0],
          "max": [1.0],
          "palette": palette //["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
        });
var imageGHM = ee.ImageCollection([rgb]).mosaic()
var rgb = HFP.visualize({
          "min": [0.0],
          "max": [1.0],
          "palette": palette //["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
        });
var imageHFP = ee.ImageCollection([rgb]).mosaic()
var rgb = HMad.visualize({
          "min": [-0.01],
          "max": [0.01],
          "palette": ["061dc4","f1f1eb","ab0000"]
        });
var imageHMad = ee.ImageCollection([rgb]).mosaic()
var rgb = HFad.visualize({
          "min": [-0.01],
          "max": [0.01],
          "palette": ["061dc4","f1f1eb","ab0000"]
        });
var imageHFad = ee.ImageCollection([rgb]).mosaic()
var rgb = THPIad.visualize({
          "min": [-0.01],
          "max": [0.01],
          "palette": ["061dc4","f1f1eb","ab0000"]
        });
var imageTHPIad = ee.ImageCollection([rgb]).mosaic()
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Global':        {lon: 0.0, lat: 25.0, zoom: 3},
  'Africa':        {lon: 22.65, lat: 7.88, zoom: 4},
  'Asia':          {lon: 88.29, lat: 48.61, zoom: 4},
  'Europe':        {lon: 14.36, lat: 48.66, zoom: 5},
  'North America': {lon: -102.58, lat: 44.4, zoom: 4},
  'Oceania':       {lon: 144.42, lat: -20.08, zoom: 4},
  'South America': {lon: -58.01, lat: -12.4, zoom: 4},
  'Australia':        {lon: 134.098, lat: -23.953, zoom: 5},
  'Bhutan':        {lon: 90.4451, lat: 27.348, zoom: 6},
  'Cabinda':        {lon: 12.4153, lat: -4.9679, zoom: 9},
  'Costa Rica, Osa':        {lon: -89.495, lat: 8.5499, zoom: 9},
  'Ethiopia':        {lon: 38.818, lat: 8.99, zoom: 7},
  'Indonesia':        {lon: 120.02, lat: -2.628, zoom: 6},
  'Moldova':        {lon: 45.5108, lat: 39.2926, zoom: 9},
  'Uruguay':        {lon: -56.043, lat: -32.777, zoom: 6},
  'Zimbabwe':        {lon: 29.931, lat: -19.17, zoom: 7},
};
/*
 * Map panel configuration
 */
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Global'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
mapPanel.add(ui.Map.Layer(imageBackground, {}, 'Background', true));
mapPanel.add(ui.Map.Layer(imageTHPIad, {}, 'THPI_annDiff', false));
mapPanel.add(ui.Map.Layer(imageHFad, {}, 'HF_annDiff', false));
mapPanel.add(ui.Map.Layer(imageHMad, {}, 'HM_annDiff', false));
mapPanel.add(ui.Map.Layer(imageHFP, {}, 'HF_2009', false));
mapPanel.add(ui.Map.Layer(imageGHM, {}, 'HM1k_2016', false));
mapPanel.add(ui.Map.Layer(imageH1990c, {}, 'HM_1990c',false));
mapPanel.add(ui.Map.Layer(imageH2015c, {}, 'HM_2015c',false));
mapPanel.add(ui.Map.Layer(imageH, {}, 'HM_2017',true));
mapPanel.add(ui.Map.Layer(PAs, {palette: ['def2ce']}, 'WDPA', false));
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Human Modification 300 m', {fontSize: '22px', color: '141414'});
var text = ui.Label(
    'The degree of human modification measures the spatial extent and intensity of land modified by humans (i.e. HM_2017, HM_2015c, HM_1990c).',
    {fontSize: '14px'});
var text2 = ui.Label(
    'Stressors for 2017 include: built-up, crop/pasturelands, grazing, oil & gas production, mining & quarrying, power generation, roads, railways, powerlines, electrical infrastructure, logging, human intrusions, reservoirs, and air pollution.',
    //, and integrates stressors on human settlement, agriculture, transportation, mining, energy production, and electrical infrastructure.',
    {fontSize: '12px'});
var text3 = ui.Label(
    'Stressors for 1990 and 2015 (change) include the stressors in 2017, except for grazing, oil & gas production, and powerlines.',
    //, and integrates stressors on human settlement, agriculture, transportation, mining, energy production, and electrical infrastructure.',
    {fontSize: '12px'});
var text4 = ui.Label(
    'Other maps at >= 1 km resolution are provided for comparison: HM1k_2016 (Kennedy et al. 2019); HF_2009 (Venter et al. 2016), and annualized difference maps for HM, HF, and THPI (Geldmann et al. 2019).',
    //, and integrates stressors on human settlement, agriculture, transportation, mining, energy production, and electrical infrastructure.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text, text2, text3, text4], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '11px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
/*
var legendTitle = ui.Label(
    'Degree of human modification',
    {fontWeight: 'regular', fontSize: '14px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
*/
//
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
//  keyPanel.clear();
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
// colorBrewerRdYlGn
/* setLegend([
  {'1.0 (max)': 'a50026'}, 
  {'0.9': 'd73027'}, 
  {'0.8': 'f46d43'}, 
  {'0.7': 'fdae61'}, 
  {'0.6': 'fee08b'},
  {'0.5': 'd9ef8b'},
  {'0.4': 'a6d96a'}, 
  {'0.3': '66bd63'}, 
  {'0.2': '1a9850'},
  {'0.0-0.1 (min)': '006837'}
]);
// colorBrewerRdYlBu
setLegend([
  {'1.0 (max)': 'a50026'}, 
  {'0.9': 'd73027'}, 
  {'0.8': 'f46d43'}, 
  {'0.7': 'fdae61'}, 
  {'0.6': 'fee090'},
  {'0.5': 'e0f3f8'},
  {'0.4': 'abd9e9'}, 
  {'0.3': '74add1'}, 
  {'0.2': '4575b4'},
  {'0.0-0.1 (min)': '313695'}
]);
// viridisViridis
setLegend([
  {'1.0 (max)': 'FDE725'}, 
  {'0.9': 'B4DE2C'}, 
  {'0.8': '6DCD59'}, 
  {'0.7': '35B779'}, 
  {'0.6': '1F9E89'},
  {'0.5': '26828E'},
  {'0.4': '31688E'}, 
  {'0.3': '3E4A89'}, 
  {'0.2': '482878'},
  {'0.0-0.1 (min)': '440154'}
]);
*/
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
// viridisMagma
setLegend([
  {'1.0 (max)': 'FCFDBF'}, 
  {'0.9': 'FEC98D'}, 
  {'0.8': 'FD9567'}, 
  {'0.7': 'F1605D'}, 
  {'0.6': 'CD4071'},
  {'0.5': '9F2F7F'},
  {'0.4': '721F81'}, 
  {'0.3': '451077'}, 
  {'0.2': '180F3E'},
  {'0.0-0.1 (min)': '000004'}
]);
// set up legend for annualized difference layers
setLegend([
  {'': 'ab000000'}, 
  {'Increase (0.01)': 'ab0000'}, 
  {'No change': 'f1f1eb'}, 
  {'Decrease (-0.01)': '061dc4'}
  ]);
/*
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  style:
      {fontSize: '12px'},
  onChange: function(value) {
    var layer = mapPanel.layers().get(0);
    layer.setShown(!layer.getShown());
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
*/
/*
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
*/
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
  ui.Label('Zoom to:', {'font-size': '12px'}), locationSelect
]);
toolPanel.add(locationPanel);
/*
var text2x = ui.Label(text2);
var text2Panel = ui.Panel(
    [ui.Label('', {fontSize: 10, fontWeight: 'regular'}), text2x]);
toolPanel.add(text2Panel);
var text3x = ui.Label(text3);
var text3Panel = ui.Panel(
    [ui.Label('', {fontSize: 10, fontWeight: 'regular'}), text3x]);
toolPanel.add(text3Panel);
*/