var DMDP = ee.FeatureCollection("users/salitchakma/DMDP_GCS_WGS84_disolv");
//var center = ee.Geometry.Point([90.39889975769927,23.80840892627679]);
Map.centerObject(DMDP, 11);
var palette = ['sienna', '#FFFF66', 'limegreen', 'darkgreen']; //'#c2e699', '#78c679','red'];
// -----------------     ADD BOUNDARY LINES TO DISPLAY     -----------------
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var outLn_dmdp = empty.paint({
  featureCollection: DMDP,
  color: 0,
  width: 1.5 
});
Map.addLayer(outLn_dmdp, {palette: 'black'}, 'DMDP');
var L5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                  .filterDate('2008-12-01', '2008-12-15')
                  .filterBounds(DMDP);
//print(L5);
var ndvi2008 = L5.map(function(image){
  return image.normalizedDifference(['B4', 'B3']).rename('ndvi');
});
//print(ndvi2008);
//--- ERROR -------//
//--- Error encountered since I did not check which layer was being used for map generation, 
  // instead of ndvi00, I was using ndvi2008 - which is actually image collection ----//
//var ndvi00 = ndvi2008.median()
//var ndvi00 = ndvi2008.mosaic();
//var ndvi00 = ndvi2008.qualityMosaic('ndvi08');
//Map.addLayer(ndvi2008, {min:-1, max: 1, palette: ['blue', 'white', 'green'] }, '2008')
// ---- END of ERROR ---//
var ndvi00 = ndvi2008.qualityMosaic('ndvi').clip(DMDP);
var zones00 = ndvi00.gte(0.2).add(ndvi00.gte(0.4)).add(ndvi00.gte(0.6));
// Image collection from landsat 8 
var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                  .filterDate('2018-12-01', '2018-12-31')
                  .filterBounds(DMDP);
var ndvi2018 = L8.map(function(image){
  return image.normalizedDifference(['B5', 'B4']).rename('ndvi');
});
var ndvi11 = ndvi2018.qualityMosaic('ndvi').clip(DMDP);
var zones11 = ndvi11.gte(0.2).add(ndvi11.gte(0.4)).add(ndvi11.gte(0.6));
//------- User Interface --------------
// --- Create panel to display lat-long of mouse clicks and charts at that point----
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '200px');
// Create an intro panel with labels.
var intro = ui.Panel(
  [ui.Label({
    value: '10 Years Challenge!',
    style: {fontSize: '18px', fontWeight: 'bold'}
    }),
  ui.Label(''),
  ui.Label('# Use checkboxes (top-right) to view desired NDVI map.'),
  ui.Label('# Image used: Landsat 5 (2008) & Landsat 8 (2018).'),
  ui.Label('# Images were collected from month of December.'),
  ui.Label('# Please wait for maps to be loaded before you check or uncheck the checkboxes.'),
  ui.Label(''),
  ui.Label({
    value: '^-.-^ Enjoy!', 
    style: {color: 'orangered',fontSize: '15px', fontWeight: 'bold'}
  })]
  );
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add the panel to the ui.root.
ui.root.insert(0, panel);
////-------------    ADD LEGENDS    -----------------------------------------
// CREATE LEGEND FOR DMDP MAP
var legend0 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '5px 15px'
  }
});
// Create legend title
var legendTitle0 = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '8px',
    color: '264d08'
    }
});
// Add the title to the panel
legend0.add(legendTitle0);
// Creates and styles 1 row of the legend.
var makeRow0 = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          border: '1px solid black',
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
        fontSize: '12.5px'
        }
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// legend0.add(colorBox0).add(description0);
legend0.add(makeRow0('ffffff00', 'DMDP'));
Map.add(legend0);
// CREATE LEGEND FOR NDVI MAPS
// Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '7px 10px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '8px',
    color: '264d08'
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
          border: '1px solid black',
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
        fontSize: '12.5px'
        }
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette1 =['ffffff00','sienna', '#FFFF66', 'limegreen', 'darkgreen'];
// Name of each legend value
var names = ['DMDP',
            'No vegetation', 
            'NDVI: 0.2 - 0.4', 
            'NDVI: 0.4 - 0.6', 
            'NDVI: 0.6 - 1.0'];
// Add color and and names to legend
for (var i = 0; i < 5; i++) {     // For loop in cliend side process
  legend.add(makeRow(palette1[i], names[i])); 
  }
// Function to remove layer
// Remove Layer
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  } else {
    print('Layer '+name+' not found');
  }
};
// ---------------------     CHECKBOXES    ---------------------------------
// Set position of panel
var chkBox = ui.Panel({
  style: {
    position: 'top-right',
    padding: '7px 5px'
  }
});
// Create checkbox title
var chkBoxTitle = ui.Label({
  value: 'Select to display on map',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    color: 'black'
    }
});
// Add the title to the panel
chkBox.add(chkBoxTitle);
// 2008 NDVI checkbox
var ndvi00_chk = ui.Checkbox('2008 NDVI', false); 
ndvi00_chk.onChange(function(checked){
   if(checked){
    //Map.remove(legend0);
    //removeLayer('DMDP');
    Map.addLayer(zones00, {min:0, max:3, palette: palette }, '2008');
    Map.add(legend);
  }else {
    Map.remove(legend); // Removes legends
    removeLayer('2008');
    //Map.add(legend0);
    //Map.addLayer(outLn_dmdp, {palette: 'red'}, 'DMDP');
  }  
});
var ndvi11_chk = ui.Checkbox('2018 NDVI', false); 
ndvi11_chk.onChange(function(checked){
   if(checked){
    //Map.remove(legend0);
    //removeLayer('DMDP');
    Map.addLayer(zones11, {min:0, max:3, palette: palette }, '2018');
    Map.add(legend);
  }else {
    Map.remove(legend); // Removes legends
    removeLayer('2018');
    //Map.add(legend0);
    //Map.addLayer(outLn_dmdp, {palette: 'red'}, 'DMDP');
  }  
});
// Add checkboxes to the panel
chkBox.add(ndvi00_chk).add(ndvi11_chk);
// Add checkbox panel to display
Map.add(chkBox);