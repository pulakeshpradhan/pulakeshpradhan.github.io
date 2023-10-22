var gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    gaul0 = ui.import && ui.import("gaul0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    malaysia_rice = ui.import && ui.import("malaysia_rice", "image", {
      "id": "users/rudiyanto/malaysia_paddy_sentinel/mosaic_paddy_mly5"
    }) || ee.Image("users/rudiyanto/malaysia_paddy_sentinel/mosaic_paddy_mly5"),
    asiarice = ui.import && ui.import("asiarice", "image", {
      "id": "users/rudiyanto/asiaricemaps10m/SoutheastAsia2019_2"
    }) || ee.Image("users/rudiyanto/asiaricemaps10m/SoutheastAsia2019_2");
print('gaul0 contries',gaul0 .aggregate_array('ADM0_NAME').sort())
var select_country= ['Malaysia'];
var select_state= ['Kedah','Kelantan','Melaka','Kuala Lumpur',
'Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Selangor',
'Terengganu','Johor'];
var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', select_country)).sort('ADM0_CODE'))
var shp_adm1 = (gaul1.filter(ee.Filter.inList('ADM1_NAME', select_state)).sort('ADM1_CODE'))
print('list of selected contries',shp_adm1.aggregate_array('ADM1_NAME'))
Map.addLayer(asiarice.updateMask(asiarice).clip(shp_adm1),{min:0,max:1,palette:['white','red']},'NESEA-Rice10 2019')
Map.addLayer(malaysia_rice, {'palette': 'green'},'Malaysia Rice 2019-2020')
var ad0Border = ee.Image().byte().paint({featureCollection: shp_adm0 , color: 1, width: 1});
Map.addLayer(ad0Border, {'palette': 'black'}, "Malaysia border")
Map.centerObject(shp_adm1,7)
var ad0Border = ee.Image().byte().paint({featureCollection: shp_adm1 , color: 1, width: 1});
Map.addLayer(ad0Border, {'palette': 'blue'}, "State border")
/**
 * Define UI components.
 */
var comp = {};
// Title.
comp.title = {};
comp.title.label = ui.Label('Malaysia-Rice10 2019-2020; email: rudiyanto@umt.edu.my', null, 
  'https://www.umt.edu.my');
/**
 * Compose the components.
 */
Map.add(comp.title.label);
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
var palette =['00ff00', 'ff0000', '0000ff'];
// name of the legend
var names = ['Malaysia-Rice10','NESEA-Rice10','State border'];
// Add color and and names
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);