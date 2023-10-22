//////////////// WESTERN BALKANS MAP//////////////////////
///////////////////////////////////////////////////////////////
//                    1) Import Layers of Interest           //
///////////////////////////////////////////////////////////////
ICI = ee.Image("users/ahokelsey/ICIRaster");
IWI = ee.Image("users/ahokelsey/IWIRaster");
///////////////////////////////////////////////////////////////
//      2) Set up map appearance and app layers             //
///////////////////////////////////////////////////////////////
Map.setCenter(19.237568, 42.867675, 7);
Map.setOptions('Satellite');
Map.style().set('cursor', 'crosshair');
//2.2) Set up a RdBu color pallete to display the raster data
var rdbu = {min: 0, max : 1,palette: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']};
//Set each layer to "false" so the user can turn them on later
var ICI = ui.Map.Layer(ICI,rdbu,'ICI');
var IWI = ui.Map.Layer(IWI, rdbu, 'IWI', false);
//Add these layers to the map. They will be added but not displayed
Map.add(ICI);
Map.add(IWI);
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//App title
var header = ui.Label('Western Balkan Index of Catchment and Watershed Integrity', {fontSize: '25px', fontWeight: 'bold', color: '4393c3'});
//App summary
var text = ui.Label('To turn toggle layers, click the drop-down options from the Layers botton in the top right corner of the map.', {fontSize: '15px', fontWeight: 'bold'});
var text2 = ui.Label('This tool maps catchment (local) and watershed (accumulated) integrity for 6 watershed functions: Hydrologicc Regulation (HYD), Chemical Regulation (CHEM), Sediment Regulation (SED), Connectivity (CONN), Temperature Regulation (TEMP), and Habitat Provision (HABT). \n \n For project methodology, see <a href="https://link.springer.com/article/10.1007/s00267-020-01280-x"> Aho et al. (2020)</a>. Data is available for download here: <a>https://edg.epa.gov/metadata/catalog/search/resource/details.page?uuid=%7BAF2E188E-D7B0-41BC-A4E4-74FA1FCEA21F%7D<a>.',
    {fontSize: '15px'});
//Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text, text2],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4393c3'},
  }),
  ui.Label({
    value:'Legend:',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel 
panel.add(intro);
//Add main panel to the root of our GUI
ui.root.insert(1,panel);
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 'max'.
function makeLegend2 (rdbu) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((rdbu.max-rdbu.min)/100.0).add(rdbu.min);
  var legendImage = gradient.visualize(rdbu);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('0'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('1')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add this widget to the panel
panel.add(makeLegend2(rdbu));