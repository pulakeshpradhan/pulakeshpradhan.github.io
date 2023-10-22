var dataset8 = ui.import && ui.import("dataset8", "image", {
      "id": "users/lexisgis/DataLayers_China/Dataset8"
    }) || ee.Image("users/lexisgis/DataLayers_China/Dataset8"),
    riceplots = ui.import && ui.import("riceplots", "table", {
      "id": "users/lexisgis/China/rice_plots"
    }) || ee.FeatureCollection("users/lexisgis/China/rice_plots"),
    SA = ui.import && ui.import("SA", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                132.44721709741054,
                47.423669185953834
              ],
              [
                132.44721709741054,
                46.983292351167144
              ],
              [
                132.98142730248867,
                46.983292351167144
              ],
              [
                132.98142730248867,
                47.423669185953834
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[132.44721709741054, 47.423669185953834],
          [132.44721709741054, 46.983292351167144],
          [132.98142730248867, 46.983292351167144],
          [132.98142730248867, 47.423669185953834]]], null, false),
    fcSA = ui.import && ui.import("fcSA", "table", {
      "id": "users/lexisgis/DataLayers_China/lcc_new"
    }) || ee.FeatureCollection("users/lexisgis/DataLayers_China/lcc_new");
var Apal =['#a1a0a0', '#ffa700', '	#adff00'];
//Add layers to Map
Map.centerObject(SA,11);
Map.addLayer(dataset8, {min:1, max:3, palette:Apal}, 'Paddy rice classification');
Map.addLayer(riceplots, {}, 'STB rice plots')
//--------------------------------------------------------------------------------------------------
// // Add a title and some explanatory text to a side panel.
// var header = ui.Label('Paddy Rice Mapping: Jiansanjiang province China', {fontSize: '36px', color: 'red'});
// var text = ui.Label(
//     'The study demonstrated the value of combining Sentinel-1A radar and Sentinel-2 optical indices, namely Normalized Difference Vegetation Index (NDVI), Enhanced Vegetation Index (EVI), and Land Surface Water Index (LSWI). The accuracy assessment results show that Dataset 8 (VH + (NDVI+EVI+LSWI)stdDev) had the best combination of F-score values and overall accuracy (F-score for built-up, paddy rice fields, and vegetated were 0.75, 0.91, and 0.78 respectively; overall accuracy = 84.2%) ',
//     {fontSize: '12px'});
// var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
// ui.root.widgets().add(toolPanel);
//----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Paddy Rice Mapping: Jiansanjiang province China', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    'The study demonstrates the value of combining multi-temporal radar and optical vegetation indices for paddy rice crop mapping. The Random Forest supervised classification was performed with Sentinel 1 radar (VH) and Sentinel-2 optical indices (NDVI, EVI, and LSWI) input variables.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link = ui.Label(
    'Mean monthly VH dual polarization bands, Sentinel-2 derived (NDVI+EVI+LSWI)stdDev',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Input variables used for RF model', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var link = ui.Label(
    'Overall Accuracy (%) = 84.2%, Overall Kappa = 0.74, F-Scores: Built-up=0.75. Paddy rice field=0.91. Vegetated=0.78.',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Accuracy assessment results (summary)', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------
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
//  Palette with the colors
//var palette =['FF0000', '22ff00', '1500ff'];
//var palette =['0057e7', 'ffa700', 'a1a0a0','AADAFF']; 
//var palette =['0057e7', 'ffa700', 'a1a0a0']; 
//var palette =['4285F4', 'DD4B39'];
var palette =['a1a0a0', 'ffa700', 'adff00'];
// name of the legend
//var names = ['Openwater Prediction','Openwater (HR ref.)'];
var names = ['Built-up', 'Paddy rice plots', 'Vegetated'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);