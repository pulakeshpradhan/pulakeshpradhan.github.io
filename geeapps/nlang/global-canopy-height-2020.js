// ************************************************************
// Script to visualize assets in a GEE APP with a side panel
// ************************************************************
// NOTE: Part 3 of the below Training Material might be helpful to desing GEE Apps:
// "ARSET - Remote Sensing for Mangroves in Support of the UN Sustainable Development Goals"
// https://appliedsciences.nasa.gov/join-mission/training/english/arset-remote-sensing-mangroves-support-un-sustainable-development
// Setup display
Map.setCenter(0, 30, 2); // lon, lat, zoom
// OPTIONAL set the base layer (Default is Map)
//Map.setOptions('Map')
//Map.setOptions('Satellite')
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100}, {lightness: -70} ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'all',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Gray', {'Gray': GRAYMAP});
// ************************************************************
// Set up side panel and widgets for display
// ************************************************************
//Title
var header = ui.Label('Global Canopy Height 2020', {fontSize: '24px', fontWeight: 'bold', color: '000000'});
var authors = ui.Label('Nico Lang, Konrad Schindler, and Jan Dirk Wegner', {fontSize: '14px', color: '000000'});
var institution = ui.Label('EcoVision Lab, Photogrammetry and Remote Sensing, ETH Zürich', {fontSize: '14px', fontWeight: 'bold', color: '000000'});
// Description text
var text = ui.Label(
  'Global canopy top height for the year 2020 at 10 m ground sampling distance. A probabilistic deep learning model has been developed to retrieve canopy top height from Sentinel-2 images anywhere on Earth. This model, an ensemble of convolutional neural networks (CNN) is trained with sparse supervision from GEDI derived canopy top height data (i.e. estimated RH98 from Lang et al., 2022). Furthermore, the predictive uncertainty of these dense estimates is quantified. That approach reduces the saturation effect commonly encountered when estimating canopy height from optical satellite images allowing to resolve tall canopies with typically high carbon stocks. The global wall-to-wall map is based on Sentinel-2 images taken between May and September 2020.\nSee the project page for more resources and links to download data.',
    {fontSize: '14px'});
// Download 
var text_download = ui.Label('Download data: ', {fontSize: '14px'});
var text_download_link = ui.Label('TODO SET ZENODO URL', {fontSize: '14px'});
text_download_link.setUrl('TODO SET ZENODO URL')
var download_panel = ui.Panel({
  widgets:[text_download, text_download_link],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Article link
var text_manuscript = ui.Label('Research paper: ', {fontSize: '14px'});
var text_manuscript_link = ui.Label('doi.org/10.1038/s41559-023-02206-6', {fontSize: '14px'});
text_manuscript_link.setUrl('https://doi.org/10.1038/s41559-023-02206-6') 
var manuscript_panel = ui.Panel({
  widgets:[text_manuscript, text_manuscript_link],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Project website link
var text_website = ui.Label('Project page: ', {fontSize: '14px'});
var text_website_link = ui.Label('langnico.github.io/globalcanopyheight', {fontSize: '14px'});
text_website_link.setUrl('https://langnico.github.io/globalcanopyheight/') 
var website_panel = ui.Panel({
  widgets:[text_website, text_website_link],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Citation
var citation_title = ui.Label(
  'Citation: ',
    {fontSize: '14px', fontWeight: 'bold'});
var citation = ui.Label(
  'Lang, N., Jetz, W., Schindler, K., & Wegner, J. D. (2023). A high-resolution canopy height model of the Earth. Nature Ecology & Evolution, 1-12.',
    {fontSize: '14px'});
var citation_panel = ui.Panel({
  widgets:[citation_title, citation],
  layout: ui.Panel.Layout.flow('vertical')
});
//Add all text labels to the right side Panel
// TODO ADD ALL WIDGETS 
// widgets:[header, authors, institution, text, manuscript_panel, download_panel, citation_panel]
var panel = ui.Panel({
  widgets:[header, institution, text, manuscript_panel, website_panel, citation_panel],//Adds header and text
  style:{width: '450px',position:'middle-right'}});
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
// ************************************************************
// ******** Load canopy top height (Lang et al., 2021) ********
// Define a color palette ("inferno") for canopy heights ranging from 0 m to 50 m
var canopy_vis = {
  min: 0.0,
  max: 50.0,
  palette: ['#010005', '#150b37', '#3b0964', '#61136e', '#85216b', '#a92e5e', '#cc4248', '#e75e2e', '#f78410', '#fcae12', '#f5db4c', '#fcffa4'],
};
// Define a color palette ("mako") for standard deviation ranging from 0 m to 15 m
var sd_vis = {
  min: 0.0,
  max: 15.0,
  palette: ['#0d0406', '#241628', '#36274d', '#403a76', '#3d5296', '#366da0', '#3488a6', '#36a2ab', '#44bcad', '#6dd3ad', '#aee3c0', '#def5e5'],
};
var standard_deviation = ee.Image('users/nlang/ETH_GlobalCanopyHeightSD_2020_10m_v1');
Map.addLayer(standard_deviation, sd_vis, 'Standard deviation');
var canopy_height = ee.Image('users/nlang/ETH_GlobalCanopyHeight_2020_10m_v1');
Map.addLayer(canopy_height, canopy_vis, 'Canopy top height');
// *******************************************************
// ******** Add a legends to the map (side panel) ********
// This function constructs a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeColorbar (cmap, title, max_tick) {
  // set position of panel
  var legend_panel = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 40px'
    }
  });
  // Create legend title
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  legend_panel.add(legendTitle)
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((cmap.max-cmap.min)/100.0).add(cmap.min);
  var legendImage = gradient.visualize(cmap);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,8,100', dimensions:'20x130'},  
    style: {position: 'bottom-center'}
  });
  var tick_labels = ui.Panel({
    widgets: [
      ui.Label(max_tick), 
      ui.Label({style: {stretch: 'vertical'}}), 
      ui.Label('0 m')
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {stretch: 'vertical', maxHeight: '130', padding: '0px 0px 0px 0px'}
  });
  var colorbar_panel = ui.Panel({
    widgets:[thumb, tick_labels],
    layout: ui.Panel.Layout.flow('horizontal')
    });
  return legend_panel.add(colorbar_panel);
}
var cbar_canopy_height = makeColorbar(canopy_vis, 'Canopy top height', '>50 m')
var cbar_standard_deviation = makeColorbar(sd_vis, 'Standard deviation', '>15 m')
var legends_panel = ui.Panel({
  widgets:[cbar_canopy_height, cbar_standard_deviation],
  layout: ui.Panel.Layout.flow('horizontal')
});
panel.add(legends_panel)
// OPTIONAL add legend to map or panel 
//Map.add(legends_panel);
//panel.add(legend);
// Usage text (Optional)
var text_usage = ui.Label(
  'Usage: Map layers can be turned on and off in the "Layers" panel. Map navigation (zooming, panning) works like on Google Maps.',
    {fontSize: '14px'});
//panel.add(text_usage)
// Code for Earth Engine assets
var assets_title = ui.Label(
  'Earth Engine Assets: ',
    {fontSize: '14px', fontWeight: 'bold'});
var text_asset_canopy_height = ui.Label(
    "var canopy_height = ee.Image('users/nlang/ETH_GlobalCanopyHeight_2020_10m_v1');",
    {fontSize: '13px', fontFamily: 'monospace', backgroundColor: '#E6E6E6'});
var text_asset_hcs = ui.Label(
    "var standard_deviation = ee.Image('users/nlang/ETH_GlobalCanopyHeightSD_2020_10m_v1');",
    {fontSize: '13px', fontFamily: 'monospace', backgroundColor: '#E6E6E6'});
var assets_panel = ui.Panel({
  widgets:[assets_title, text_asset_canopy_height, text_asset_hcs],
  layout: ui.Panel.Layout.flow('vertical')
}); 
panel.add(assets_panel)