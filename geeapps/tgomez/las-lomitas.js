/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/tgomez/Biotermica/punto_planta_utm"),
    table2 = ee.FeatureCollection("users/tgomez/Biotermica/buffer_100km"),
    image = ee.Image("users/tgomez/Biotermica/RF_2018_v1"),
    buff = ee.Image("users/tgomez/Biotermica/buff50"),
    nsr = ee.Image("users/tgomez/Biotermica/nir-swir-red");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//// leyenda
print (image2)
/*
// Create and add the legend title.
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Leyenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
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
}
//'339820', 'e6f0c2','ff5e4e','75d2ff'
legend.add(makeRow('2daf52', 'Leñosas'));
legend.add(makeRow('ffd24e', 'No Leñosas'));
legend.add(makeRow('adaaa9', 'Area no vegetada'));
legend.add(makeRow('60a9e5', 'Cuerpos de agua '));
var mapClasses = ui.Map();
Map.add(legend)
*/
//var classified_2clases=classified.remap([2,9,12,13,15,18,22,26],[2,1,1,1,1,1,3,4]); 
//Map.addLayer(image, {min:1, max:4, palette:['ffd24e','2daf52','adaaa9','60a9e5' ]}, 'Clasificacion'); 
// buffers
var polygons = table;
var bufferPoly20 = function(feature) {
  return feature.buffer(20000);   
};
var bufferPoly40 = function(feature) {
  return feature.buffer(40000);   
};
var bufferPoly50 = function(feature) {
  return feature.buffer(50000);   
};
var bufferPoly60 = function(feature) {
  return feature.buffer(60000);   
};
var bufferPoly80 = function(feature) {
  return feature.buffer(80000);   
};
var bufferedPolys20 = polygons.map(bufferPoly20);
var bufferedPolys40 = polygons.map(bufferPoly40);
var bufferedPolys50 = polygons.map(bufferPoly50);
var bufferedPolys60 = polygons.map(bufferPoly60);
var bufferedPolys80 = polygons.map(bufferPoly80);
Map.addLayer(bufferedPolys20, {},'buffer20')
Map.addLayer(bufferedPolys40, {},'buffer40')
Map.addLayer(bufferedPolys60, {},'buffer60')
Map.addLayer(bufferedPolys80, {},'buffer80')
Map.addLayer(table2, {},'buffer100')
//////////////////////////////
var image1 = image;
var lossImage = image1.eq(2);
//Map.addLayer (lossImage,{},'leñosa')
print(lossImage,'leñosa' )
// Sum the values of loss pixels
var stats = lossImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry:bufferedPolys20,
  scale: 30
});
print(stats, "stats");
var areaImage = lossImage.multiply(ee.Image.pixelArea());
//Map.addLayer (areaImage,{},'areaImage')
print(areaImage,"areaImage")
// Sum the values of loss pixels en metros cuadrados
var area_buffer20 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bufferedPolys20,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer20, "area_buffer20")
//var stats_km2= divide(1000000)
//print(stats_km2, "area_bosque_buffer20")
var area_buffer40 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bufferedPolys40,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer40, "area_buffer40")
var area_buffer50 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bufferedPolys50,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer50, "area_buffer50")
var area_buffer60 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bufferedPolys60,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer60, "area_buffer60")
var area_buffer80 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bufferedPolys80,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer80, "area_buffer80")
var area_buffer100 = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: table2,
  scale: 30,
  maxPixels: 1e9
});
print(area_buffer100, "area_buffer100")
var stack=image.addBands(areaImage).addBands(nsr).addBands(buff)
//.addBands(area_buffer20).addBands(area_buffer40).addBands(area_buffer60).addBands(area_buffer80).addBands(area_buffer100)
print(stack, "stack")
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
/*
 * Configure layers and locations
 */
var layerProperties = {
  'Clasificación': {
    name: 'remapped',
    visParams: {min:1, max:4, palette:['yellow','green','grey','blue' ]},
    legend: [
      {'Leñosas':'green'}, {'No Leñosas': 'yellow'}, {'Area no vegetada': 'grey'},
      {'Cuerpos de agua':'blue'}
    ],
    defaultVisibility:true
  },
  /*
  'Leñosas - Clasif Binaria': {
    name: 'remapped_1',
    visParams: {min: 0, max: 1, palette: ['black', 'green']},
    legend:
        [{'Leñosas': 'green'}, {'No leñosa': 'black'}],
    defaultVisibility: false
  },
  */
  /*
  'Buffer 50': {
    name: 'classification',
    visParams: {min:1, max:4, palette:['yellow','green','grey','blue' ]},
    legend: [
      {'Área de bosque (km2) 5455,577 ':'green'}, {'No Leñosas': 'yellow'}, {'Area no vegetada': 'grey'},
      {'Cuerpos de agua':'blue'}
    ],
    defaultVisibility:false
  },
  */
  'Mosaico Landsat': {
    name: ['nirmed_year','swir1med_year','redmed_year'],
    visParams: {min: 0, max: 4000},
    defaultVisibility: false
  },
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Las Lomitas': {lon:-60.4103, lat: -24.478, zoom: 8},
};
///
var buffer = bufferedPolys50
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Las Lomitas'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image2 = stack.select(layer.name).visualize(layer.visParams);
  //var masked = addZeroAndWaterMask(image2, image.select(layer.name));
  //mapPanel.add(ui.Map.Layer(image2, {bands: ['redmed_year','bluemed_year','greenmed_year'], min: 0, max: 4000}, key, layer.defaultVisibility));
  //mapPanel.add (ui.Map.Layer(rgb, {bands: ['redmed_year','bluemed_year','greenmed_year'], min: 0, max: 4000}, key, layer.defaultVisibility ));
  mapPanel.add(ui.Map.Layer(image2, {}, key, layer.defaultVisibility));
}
/*
// Draws black and gray overlays for nodata/water/zero values.
function addZeroAndWaterMask(visualized, original) {
  // Places where there is nodata or water are drawn in gray.
  var water =
      image.select('datamask').neq(1).selfMask().visualize({palette: 'gray'});
  // Places were the underyling value is zero are drawn in black.
  var zero = original.eq(0).selfMask().visualize({palette: 'black'});
  // Stack the images, with the gray on top, black next, and the original below.
  return ee.ImageCollection([visualized, zero, water]).mosaic();
}
*/
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Las Lomitas - Clasificación de leñosas y estimación de cobertura', {fontSize: '20px', color: 'red'});
var text = ui.Label(
    'Resultados del análisis de cobertura de leñosas a partir de imágenes Landsat.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
   'Área de bosque (km2) por radio de buffer', {}, 
   // 'Grupo INTA Clima y Agua (aguante la oficina 11!)', {},
  'https://docs.google.com/spreadsheets/d/16epzJeKepUGjVwWpKOalTyaI9aZBIQmiPBpXMNAZyFA/edit?usp=sharing');
   // 'https://www.lamentiraestaahifuera.com/wp-content/uploads/2018/02/scientific-bullshit.gif');
var linkPanel = ui.Panel(
    [ui.Label('Más información', {fontWeight: 'bold'}), link]);
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
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Tipos de clasificación', {'font-size': '24px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Leyenda',
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
  ui.Label('Ubicación', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);
///// tabla
/*
var text2 = ui.Label(
    'Resultados del análisis de cobertura de leñosas a partir de imágenes Landsat.',
    {fontSize: '11px'});
var toolPanel2 = ui.Panel([locationPanel, text2], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
*/ 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Export.table.toDrive({
    'collection': bufferedPolys50,
    'description': 'buffer50', 
    'folder': 'biotermica',
    'fileFormat': 'KML'}
    );
*/