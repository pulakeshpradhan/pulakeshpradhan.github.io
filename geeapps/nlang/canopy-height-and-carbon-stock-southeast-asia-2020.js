// Setup display
Map.setCenter(117, 5, 4.5); // lon, lat, zoom
//Map.setOptions('Map')
// Map.setOptions('Satellite')
///////////////////////////////////////////////////////////////
//      Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//Title
var header = ui.Label('Canopy top height and indicative high carbon stock, 2020', {fontSize: '21px', fontWeight: 'bold', color: '000000'});
// Description text
var text = ui.Label(
  'Canopy top height and indicative high carbon stock maps for Indonesia, Malaysia, and Philippines. The provided land cover maps follow the high carbon stock approach (HCSA) stratifying vegetation based on the estimated carbon density (aboveground biomass). A deep convolutional neural network was trained to estimate canopy top height from Sentinel-2 optical satellite images using reference data derived from GEDI lidar waveforms. Carbon density and high carbon stock classes were derived from these dense canopy height maps using calibration data from an airborne lidar campaign in Sabah, Borneo. The resulting maps have a ground sampling distance (GSD) of 10 m and are based on images between 1st of September 2020 and 1st of March 2021.',
    {fontSize: '15px'});
// Download 
var text_download = ui.Label(
  'Download maps as geotifs: ',
    {fontSize: '15px'});
var text_download_link = ui.Label(
  'http://doi.org/10.5281/zenodo.5012448',
    {fontSize: '15px'});
text_download_link.setUrl('http://doi.org/10.5281/zenodo.5012448')
var download_panel = ui.Panel({
  widgets:[text_download, text_download_link],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Article link
var text_manuscript = ui.Label(
  'Research paper: ',
    {fontSize: '15px'});
var text_manuscript_link = ui.Label(
  'https://arxiv.org/abs/2107.07431: ',
    {fontSize: '15px'});
text_manuscript_link.setUrl('https://arxiv.org/abs/2107.07431')
var manuscript_panel = ui.Panel({
  widgets:[text_manuscript, text_manuscript_link],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Citation
var citation_title = ui.Label(
  'Citation: ',
    {fontSize: '15px', fontWeight: 'bold'});
var citation = ui.Label(
  'Lang, N., Schindler, K., & Wegner, J. D. (2021). High carbon stock mapping at large scale with optical satellite imagery and spaceborne LIDAR. arXiv preprint arXiv:2107.07431.',
    {fontSize: '15px'});
var citation_panel = ui.Panel({
  widgets:[citation_title, citation],
  layout: ui.Panel.Layout.flow('vertical')
});
//Add all text labels to the right side Panel
var panel = ui.Panel({
  widgets:[header, text, manuscript_panel, download_panel, citation_panel],//Adds header and text
  style:{width: '600px',position:'middle-right'}});
//This creates another panel to house a line separator and instructions for the user
var separator = ui.Panel([
  ui.Label({
    value: '______________________________________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ]);
//Add this new panel to the larger panel we created 
panel.add(separator)
//Add our main panel to the root of our GUI
ui.root.insert(1,panel)
// ************************************************************************
// ******** Load canopy top height (Lang et al., 2021) ********
// Define a color palette ("inferno") for canopy heights ranging from 0 m to 60 m
var canopy_vis = {
  min: 0.0,
  max: 50.0,
  palette: ['#010005', '#150b37', '#3b0964', '#61136e', '#85216b', '#a92e5e', '#cc4248', '#e75e2e', '#f78410', '#fcae12', '#f5db4c', '#fcffa4'],
};
var ID_PH_MY_canopy_top = ee.ImageCollection('users/nlang/canopy_top_height_2020_ID_PH_MY')
Map.addLayer(ID_PH_MY_canopy_top, canopy_vis, 'canopy_top_height_2020');
// ************************************************************************
// ******** Load indicative high carbon stock map (Lang et al., 2021) ********
// Define the color palette
var palette = ['#440154', '#404387', '#29788e', '#22a884', '#7ad251', '#fde725', '#fcffa4', '#a4feff', '#fa0000'];
var hcs_map_vis = {
  min: 0,
  max: 8,
  palette: palette,
};
var hcs_map = ee.Image('users/nlang/indicative_HCS_2020_ID_PH_MY');
// For visualization reclassify the labels to be in the range 0 to 8
var hcs_map = hcs_map
          .where(hcs_map.eq(10), 6)
          .where(hcs_map.eq(11), 7)
          .where(hcs_map.eq(50), 8)
//We set each layer to "false" so the user can turn them on later
var hcs_layer = ui.Map.Layer(hcs_map, hcs_map_vis, 'indicative_HCS_2020',true)
//Add these layers to our map. They will be added but not displayed
Map.add(hcs_layer)
// ************************************************************************
// ******** Add a legends to the map (side panel) ********
// legend names
var names = ['Open land', 'Scrub', 'Young regenerating forest', 'Low density Forest', 'Medium density forest', 'High density forest', 'Oil palm', 'Coconut', 'Urban'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Indicative HCS classification',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 10px 0',
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Add color and and names
for (var i = 0; i < palette.length; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map or panel 
//Map.add(legend);
//panel.add(legend);
//Height Legend
///////////////
// set position of panel
var legend_height = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 40px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Canopy top height',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend_height.add(legendTitle)
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2 (cmap, legend_panel) {
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((cmap.max-cmap.min)/100.0).add(cmap.min);
  var legendImage = gradient.visualize(cmap);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,8,100', dimensions:'20x180'},  
    style: {position: 'bottom-center'}
  });
  var tick_labels = ui.Panel({
    widgets: [
      ui.Label('>50 m'), 
      ui.Label({style: {stretch: 'vertical'}}), 
      ui.Label('0 m')
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {stretch: 'vertical', maxHeight: '180', padding: '0px 0px 0px 10px'}
  });
  var colorbar_panel = ui.Panel({
    widgets:[thumb, tick_labels],
    layout: ui.Panel.Layout.flow('horizontal')
    });
  return legend_panel.add(colorbar_panel);
}
var legends_panel = ui.Panel({
  widgets:[legend, makeLegend2(canopy_vis, legend_height)],
  layout: ui.Panel.Layout.flow('horizontal')
});
panel.add(legends_panel)
// Usage text
var text_usage = ui.Label(
  'Usage: Map layers can be turned on and off in the "Layers" panel. Map navigation (zooming, panning) works like on Google Maps.',
    {fontSize: '15px'});
panel.add(text_usage)
// Code for Earth Engine assets
var assets_title = ui.Label(
  'Earth Engine Assets: ',
    {fontSize: '15px', fontWeight: 'bold'});
var text_asset_canopy_height = ui.Label(
    "var canopy_top_height = ee.ImageCollection('users/nlang/canopy_top_height_2020_ID_PH_MY’);",
    {fontSize: '13px', fontFamily: 'monospace', backgroundColor: '#E6E6E6'});
var text_asset_hcs = ui.Label(
    "var indicative_hcs = ee.Image('users/nlang/indicative_HCS_2020_ID_PH_MY');",
    {fontSize: '13px', fontFamily: 'monospace', backgroundColor: '#E6E6E6'});
var assets_panel = ui.Panel({
  widgets:[assets_title, text_asset_canopy_height, text_asset_hcs],
  layout: ui.Panel.Layout.flow('vertical')
}); 
panel.add(assets_panel)