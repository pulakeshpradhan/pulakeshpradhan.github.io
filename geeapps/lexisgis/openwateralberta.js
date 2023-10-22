var AB = ee.FeatureCollection("users/lexisgis/Albertawide_Openwater/AB_boundary"),
    openwater = ee.Image("users/lexisgis/Albertawide_Openwater/OpenWater_Layer");
//Map.setCenter(-103.8881, 53.0371, 5);
//Map.addLayer(crop2017);
//var Apal = ['#08306b', '#006d2c', '#8c510a', '#b8e186', '#fdae61'];
//var Apal =['#08306b', '#b8e186', '#fdae61'];
//var Apal =['#0057e7', '#ffa700', '#a1a0a0'];
var Apal =['#4285F4'];
//var Apal2 =['#DD4B39'];
//var aci_ab = crop2017.clip(AB);  
//var pilot = crop2017.clip(Pilot); 
//Add layers to Map
Map.setCenter(-114.386189,55.227447, 6);
Map.addLayer(openwater, {min:1, max:1, palette:Apal}, 'Openwater Prediction');
Map.addLayer(AB, {}, 'Alberta Province');
//--------------------------------------------------------------------------------------------------
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Alberta-wide Open water Mapping', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    '10-meter High Resolution Open Water Map for Alberta (2018) generated using spatially enhanced Modified Normalized Difference Water Index.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link = ui.Label(
    'Sentinel-2 10-m SWIR-1 band (pan-sharpened), Green band (10-meter), and MNDWI (Xu 2006).',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Input layers used for analysis', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var link = ui.Label(
    'Overall Accuracy (%) = 91, Overall Kappa=0.8, F-Scores(%): Open Water=0.9. Non-open water=0.94.',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Accuracy assessment results (summary)', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
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
var palette =['4285F4', 'D3D3D3'];
// name of the legend
//var names = ['Openwater Prediction','Openwater (HR ref.)'];
var names = ['Openwater Prediction', 'Alberta province boundary'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);