var esri_lulc10 = ui.import && ui.import("esri_lulc10", "imageCollection", {
      "id": "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"),
    departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/AmericaSur"
    }) || ee.FeatureCollection("users/erollero/AmericaSur"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/erollero/HDIChile/Chileregiones"
    }) || ee.FeatureCollection("users/erollero/HDIChile/Chileregiones"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/erollero/LimitesDepartamentales"
    }) || ee.FeatureCollection("users/erollero/LimitesDepartamentales");
Map.setCenter(-62.328, -31.439, 4);
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "No Data",
    "Water",
    "Trees",
    "Grass",
    "Flooded Vegetation",
    "Crops",
    "Scrub/Shrub",
    "Built Area",
    "Bare Ground",
    "Snow/Ice",
    "Clouds"
  ],
  "colors": [
    "#FFFFFF",
    "#1A5BAB",
    "#358221",
    "#99ff33",
    "#87D19E",
    "#ffff1a",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF",
    "#C8C8C8"
  ]};
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Function to generate the legend
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
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  Map.add(panel);
}
/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover');
// Add image to the map
Map.addLayer(esri_lulc10.mosaic(), {min:0, max:10, palette:dict['colors']}, 'ESRI LULC 10m')
//Indicar depto.
var roi1 = departamentos.filterMetadata("LINK","equals","6217");
var roi2 = departamentos.filterMetadata("LINK","equals","06466");
var roi = roi1.merge(roi2);
var datasets = esri_lulc10.mosaic().clip(roi);
//Map.addLayer(datasets, {min:0, max:10, palette:dict['colors']}, 'ESRI LULC 10m deptos')
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '001327'}, 'Deptos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table2,
  color: 1,
  width: 0.05
});
Map.addLayer(outline, {palette: '001327'}, 'Regiones Chile');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table3,
  color: 1,
  width: 0.05
});
Map.addLayer(outline, {palette: '001327'}, 'Deptos Geosur');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'white'}, 'Paises');