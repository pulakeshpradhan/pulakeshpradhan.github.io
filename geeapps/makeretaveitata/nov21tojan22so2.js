var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            179.1440582267287,
            -17.358363089365703
          ]
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
    ee.Geometry.Point([179.1440582267287, -17.358363089365703]);
//-----------------------------------------------------------------------------------
//                             F I J I
//-----------------------------------------------------------------------------------
//Displays S5 S02 mosaics pre and post Hunga Tonga volcano eruption
    //on Saturday 15/01/2022 near Fiji
var pre = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_SO2")
  .select('SO2_column_number_density')
  .filterDate('2021-11-01', '2021-12-18')
  .filterBounds(geometry);
var post = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_SO2")
  .select('SO2_column_number_density')
  .filterDate('2021-12-20', '2022-01-22')
  .filterBounds(geometry);
print (pre);
print (post);
var vis = {
  min: 0.0,
  max: 0.0005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  opacity: 0.65,
};
var pre_tsunami = pre.mean();
var post_tsunami = post.mean();
/*
 * Set up the maps and control widgets
 */
// Show the composite image for pre tsunmai
Map.addLayer(pre_tsunami, vis, 'PRE S5P SO2',true);
// Split Panels
// Map 2
var map2 = ui.Map();
// Show the composite image for post tsunami
map2.addLayer(post_tsunami, vis, 'POST S5P SO2',true);
// Show the classification result for November 2019
// Link the two panels
var linker = ui.Map.Linker([ui.root.widgets().get(0), map2]);
// Create the split panels
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the split panels to ui roots
ui.root.widgets().reset([splitPanel]);
// Set the view center
linker.get(0).setCenter(178.979, -17.704, 6);
//Legend on bottom left
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px',position:'bottom-left'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'SO2 Concentration [mol/m2]',
  style: {fontWeight: 'bold'}
});
//set main legend panel on the left
var mainPanel = ui.Panel({
  widgets: [legendTitle, colorBar, legendLabels],
  style: {position: 'bottom-left', width: '300px'}
});
Map.add(mainPanel);
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Atmospheric Sulphur Dioxide Concentrations', {fontSize: '15px', color: 'red'});
var text = ui.Label(
    'Sulphur dioxide presence in the atmosphere pre and post Tonga volcanic activity\
    near Fiji. Using Sentinel-5P. Left mosaic (pre) and Right mosaic (post) disaster.\
    GEE app creation date: 20/01/22. Time it took to finish this simple app: way too long',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '120px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'App Creator', {},
    'https://www.linkedin.com/in/makereta-veitata-7a8b691b9/');
var linkPanel = ui.Panel(
    [ui.Label('Contact:', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);