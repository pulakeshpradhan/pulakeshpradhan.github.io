var esri_lulc10 = ui.import && ui.import("esri_lulc10", "imageCollection", {
      "id": "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008"
    }) || ee.FeatureCollection("users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008");
//Time series  Define a dictionary which will be used to make legend and visualize image on map
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
addCategoricalLegend(legend, dict, '10m Land Cover of Ethiopia');
Map.centerObject(table, 10)
// Add image to the map
Map.addLayer(esri_lulc10.filterDate('2017-01-01','2017-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo 2017 LULC 10m')
Map.addLayer(esri_lulc10.filterDate('2018-01-01','2018-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo 2018 LULC 10m')
Map.addLayer(esri_lulc10.filterDate('2019-01-01','2019-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo  2019 LULC 10m')
Map.addLayer(esri_lulc10.filterDate('2020-01-01','2020-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo 2020 LULC 10m')
Map.addLayer(esri_lulc10.filterDate('2021-01-01','2021-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo 2021 LULC 10m')
Map.addLayer(esri_lulc10.filterDate('2022-01-01','2022-12-31').mosaic().clip(table), {min:1, max:10, palette:dict['colors']}, 'Eth afo 2022 LULC 10m')