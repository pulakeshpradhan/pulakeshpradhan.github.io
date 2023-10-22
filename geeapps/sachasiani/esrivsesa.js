var esri_lulc10 = ui.import && ui.import("esri_lulc10", "imageCollection", {
      "id": "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -86.52555414114542,
            39.16717983729972
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-86.52555414114542, 39.16717983729972]);
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
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
    "#1A5BAB",
    "#358221",
    "#A7D282",
    "#87D19E",
    "#FFDB5C",
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
function addCategoricalLegend(panel, dict, title, the_map) {
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
  the_map.add(panel);
}
/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover', Map);
// Add image to the map
Map.addLayer(esri_lulc10.mosaic(), {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m')
// Now let's do all of this for ESA
var Map_esa = ui.Map();
// Legend at Bottom Right
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// The dataset
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first();
// The dictionary to create the legend for ESA
var esa_dict = {
  "names": dataset.get("Map_class_names").getInfo(),
  "colors": dataset.get("Map_class_palette").getInfo()
};
// Create the legend
addCategoricalLegend(legend2, esa_dict, 'ESA 10m WorldCover', Map_esa);
// Add the dataset to the map
Map_esa.addLayer(dataset, {bands: ['Map']}, "Landcover");
// Link the maps
var linker = ui.Map.Linker([ui.root.widgets().get(0), Map_esa]);
// Create the split panel
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Reset and zoom!
ui.root.widgets().reset([splitPanel]);
Map_esa.setCenter(-86.5256,39.1678,15);