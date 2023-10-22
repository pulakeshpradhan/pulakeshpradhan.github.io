// #########################################################################
// Ref: https://medium.com/eelab/how-to-rank-the-most-polluted-water-body-in-city-using-sentinel-2-satellite-imagery-via-google-792685105bfd
// #########################################################################
/*
var roi = ee.Geometry.Polygon(
        [[[105.72, 21.12],
          [105.72, 20.93],
          [105.93, 20.93],
          [105.93, 21.12]]]);
*/
var roi = ee.Geometry.Polygon(
        [[[101.12294338698032,14.270171582717596],
[101.201049313494,14.270171582717596],
[101.201049313494,14.308099521401118],
[101.12294338698032,14.308099521401118],
[101.12294338698032,14.270171582717596]]]);
var IMG = ee.ImageCollection("COPERNICUS/S2_SR")
            .filterDate('2020-01-01','2020-01-08' )          
            .filterBounds(roi)
            .sort('CLOUDY_PIXEL_PERCENTAGE',true)
            .first()
            .clip(roi);
print(IMG)
var IMG_water = ndwi_f(IMG)
var IMG_NDCI = ndci_f(IMG_water)
// print(IMG.get('CLOUDY_PIXEL_PERCENTAGE'))
var viz = {min:0.1,max:0.4,palette:['cyan','orange','red']}
Map.setCenter(101.165, 14.290, 14); // roi = CRMA
Map.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG')
//Map.addLayer(IMG_water.select('NDWI'),{palette:['blue']},"IMG_water")
Map.addLayer(IMG_NDCI.select('NDCI'),viz,"IMG_NDCI")
function ndwi_f(img){
  //water mask
  var ndwi = img.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return img.addBands(ndwi)
  .updateMask(ndwi.gt(0))
}
function ndci_f(img){
  //water mask
  var ndci = img.normalizedDifference(['B5', 'B4']).rename('NDCI');
  return img.addBands(ndci)
}
///////////////////////////////////////////
// ####################################################################
//
/////////////Legend///////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  // value: 'chl-a \n (mg/m3)',
  value: 'Chl-a Levels (mg/L)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add legend to maps
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
var pallete = ['51f1e3', 'ffd761', 'ff6437', 'ff0414'];
// name of the legend
var names = ['Below 50 (normal)', '50 - 100', '100-200', 'Above 200 (polluted)'];
// Add color and and names
for (var i = pallete.length; i > 0; i--) {
  legend.add(makeRow( pallete[i-1], names[i-1]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
/////////////////////////////////////////////////////
// Load an image of the Santa Rosa, California 2017 fires.
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG');
linkedMap.addLayer(IMG_water.select('NDWI'),{palette:['blue']},"IMG_water");
//linkedMap.addLayer(IMG_NDCI.select('NDCI'),viz,"IMG_NDCI");
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//linkedMap.setCenter(101.015, 14.313, 20);
// #############################################################################