var wetland = ui.import && ui.import("wetland", "image", {
      "id": "users/lexisgis/Crawling_input/Wetlands_RF_Multidate_2017-2020"
    }) || ee.Image("users/lexisgis/Crawling_input/Wetlands_RF_Multidate_2017-2020"),
    SA = ui.import && ui.import("SA", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -112.86394915776852,
                50.81090302961364
              ],
              [
                -112.25764117437008,
                50.79875284291856
              ],
              [
                -112.22948870854977,
                51.36039847185858
              ],
              [
                -112.83511004644039,
                51.371973391963394
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-112.86394915776852, 50.81090302961364],
                  [-112.25764117437008, 50.79875284291856],
                  [-112.22948870854977, 51.36039847185858],
                  [-112.83511004644039, 51.371973391963394]]]),
            {
              "system:index": "0"
            })]),
    amwi = ui.import && ui.import("amwi", "image", {
      "id": "users/lexisgis/Crawling_input/AMWI_Raster"
    }) || ee.Image("users/lexisgis/Crawling_input/AMWI_Raster");
// // Map colur scheme - Swamp, Marsh, Open Water
// var Apal =['2e7d32','E53935', '0000ff'];
// //Add layers to Map
// // set styling
// var styling = {color: 'F5F5F5', fillColor: '00000000', width: 1.5};
// // {lineWidth: 7, color: '1D6B99', lineDashStyle: [4, 4]}
// // lineDashStyle
// Map.addLayer(SA.style(styling),{},'Study Area');
// Map.centerObject(SA,10.4);
// Map.addLayer(wetland, {min:1, max:3, palette:Apal}, 'Wetland Inventory');
// //Set Satellite image as reference base
// Map.setOptions('HYBRID');
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
// Map.centerObject(SA,10.4);
//-----------------------------------------------------------------------------------------------------------------------------------
// Google Earth Engine App to Display Crawling Lake Wetland Classification
// Prepared by Alex O. Onojeghuo
// Date - April 3, 2021
//-----------------------------------------------------------------------------------------------------------------------------------
// Map colur scheme - Swamp, Marsh, Open Water
var Apal =['2e7d32','E53935', '0000ff'];
//Add layers to Map
// set styling
var styling = {color: 'F5F5F5', fillColor: '00000000', width: 1.5};
// {lineWidth: 7, color: '1D6B99', lineDashStyle: [4, 4]}
// lineDashStyle
Map.addLayer(SA.style(styling),{},'Study Area');
Map.centerObject(SA,10.4);
Map.addLayer(wetland, {min:1, max:3, palette:Apal}, 'Wetland Inventory');
//Set Satellite image as reference base
Map.setOptions('HYBRID');
//-----------------------------------------------------------------------------------------------------------------------------------
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Wetland Mapping in the Grassland Natural Region of Alberta', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    'For this study, we have developed a workflow that utilizes freely available high-resolution and temporally dense S1 (SAR) and S2 (optical) data fused with LiDAR-derived TWI for wetland mapping (10-m spatial resolution). The supervised pixel-based RF machine learning classifier and Sentinel open-access satellite data on the GEE geospatial platform provided a powerful and user-friendly medium for wetland classification. This study utilized seasonal radar and optical data from the Sentinel satellite images acquired in the spring/summer (May-August) and fall (September-November) months of 2017 to 2020.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link = ui.Label(
    '(B8+B11+VH)-2017-2020 + TWI ',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Input variables used for RF model', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var link = ui.Label(
    'Overall Accuracy (%) = 76%, Overall Kappa = 0.7, F-Scores: Swamp=0.75. Marsh=0.61. Open Water=0.82.',{fontSize: '12px'});
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
var palette =['2e7d32','E53935', '0000ff'];
// Name of the legend
var names = ['Swamp', 'Marsh', 'Open Water'];
// Add color and and names
for (var i = 0; i < 3; i++) {
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