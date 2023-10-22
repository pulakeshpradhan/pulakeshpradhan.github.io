var SA = ui.import && ui.import("SA", "table", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_aoi"
    }) || ee.FeatureCollection("users/lexisgis/NigerDelta/NigerDelta_aoi"),
    wetland2019 = ui.import && ui.import("wetland2019", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2019_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2019_RF_GEE"),
    wetland2018 = ui.import && ui.import("wetland2018", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2018_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2018_RF_GEE"),
    wetland2020 = ui.import && ui.import("wetland2020", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2020_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2020_RF_GEE"),
    wetland2021 = ui.import && ui.import("wetland2021", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2021_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2021_RF_GEE"),
    wetland2017 = ui.import && ui.import("wetland2017", "image", {
      "id": "users/lexisgis/RF2017_wgs84"
    }) || ee.Image("users/lexisgis/RF2017_wgs84");
//-----------------------------------------------------------------------------------------------------------------------------------
// Google Earth Engine App to Display Crawling Lake Wetland Classification
// Prepared by Alex O. Onojeghuo
// Date - April 3, 2021
//-----------------------------------------------------------------------------------------------------------------------------------
// Define a palette for the 8 distinct land cover classes. 
var Apal = [
  '#AAFF00', // Wetlands
  '#FF0000', //Mangroves
  '#FFFF73', // Agriculture
  '#FFFFFF', // Bare surface
  '#00734C', // Forest
  '#828282', // Urban
  '#E65078', // Woodland/Shrub/Grasslands 
  '#005CE6', // Water
];
//Add layers to Map
// set styling
var styling = {color: 'F5F5F5', fillColor: '00000000', width: 1.5};
// {lineWidth: 7, color: '1D6B99', lineDashStyle: [4, 4]}
// lineDashStyle
Map.centerObject(SA,8.5);
// Map.addLayer(wetland2021, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2021)');
// Map.addLayer(wetland2020, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2020)');
// Map.addLayer(wetland2019, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2019)');
// Map.addLayer(wetland2018, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2018)');
Map.addLayer(wetland2017, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2017)');
Map.addLayer(SA.style(styling),{},'Study Area');
//Set Satellite image as reference base
Map.setOptions('HYBRID');
//-----------------------------------------------------------------------------------------------------------------------------------
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Wetland Monitoring System for the Niger Delta: A GEE cloud-based multi-sensor approach', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    'For this study, we have developed a workflow that utilizes freely available high-resolution and temporally dense S1 (SAR) and S2 (optical) data fused with ALOS-DEM elevation data for wetland mapping (10-m spatial resolution). The supervised pixel-based RF machine learning classifier and Sentinel open-access satellite data on the GEE geospatial platform provided a powerful and user-friendly medium for wetland classification. This study utilized seasonal radar and optical data from the Sentinel satellite images acquired in the dry months (October to April) of 2017 to 2020.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link = ui.Label(
    'Sentinel-1 & Elevation variables: VH polarization, ALOS DEM,Sentinel-2 variables: PCA layer3 (visible & near infrared bands (10)), NDSI, & CMSI',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Input variables used for RF model', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var link = ui.Label(
    'Overall Accuracy = 83.4% (2017), 86.4% (2018), 86.3% (2019), 85.9% (2020), & 85.7% (2021)',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Accuracy assessment results (summary)', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
//-----------------------------------------------------------------------------------------------------------------------------------
//Add legend of Prediction to Map Layout
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Legend palette with the colors
var palette = [
  'AAFF00', // Wetlands
  'FF0000', //Mangroves
  'FFFF73', // Agriculture
  'FFFFFF', // Bare surface
  '00734C', // Forest
  '828282', // Urban
  'E65078', // Woodland/Shrub/Grasslands 
  '005CE6', // Water
];
// var palette =['2e7d32','E53935', '0000ff'];
// Name of the legend
var names = ['Wetlands', 'Mangroves', 'Agriculture', 'Bare surface','Forest','Urban','Woodland/Shrub/Grasslands','Water'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
//-----------------------------------------------------------------------------------------------------------------------------------
// Map.setOptions('Gray', {'Gray map': GRAYMAP})
var GRAYMAP = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'on'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{saturation: -100 }]
  },
  { // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#eaeaea'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{color: '#434343'}, {visibility: 'on'}]
  }
];
Map.setOptions(
    'Gray', {'Gray Basemap': GRAYMAP});
//-----------------------------------------------------------------------------------------------------------------------------------
// var leftMap = ui.Map();
// var rightMap = ui.Map();
// var wetland_img = ui.Map.Layer(wetland, {min:1, max:3, palette:Apal});
// var amwi_img = ui.Map.Layer(amwi, {min:1, max:3, palette:Apal});
// var wetland_layer = leftMap.layers();
// var amwi_layer = rightMap.layers();
// wetland_layer.add(wetland_img);
// amwi_layer.add(amwi_img);
// var splitPanel = ui.SplitPanel({
//   firstPanel: leftMap,
//   secondPanel: rightMap,
//   orientation: 'horizontal',
//   wipe: true
// });
// ui.root.clear();
// ui.root.add(splitPanel);
// var linkPanel = ui.Map.Linker([leftMap, rightMap]);
//-----------------------------------------------------------------------------------------------------------------------------------