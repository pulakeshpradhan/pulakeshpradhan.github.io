Map.setOptions('SATELLITE')
Map.setCenter(0, 20, 2.5)
// var drivers = ee.Image('projects/ee-gfw-drivers-1km/assets/drivers-1km-v0-sample').selfMask()
var old_drivers = ee.Image('projects/ee-gfw-drivers-1km/assets/output/drivers-1km-v0-sample').selfMask()
var drivers = ee.ImageCollection('projects/ee-gfw-drivers-1km/assets/output/drivers-1km-v01-sample')
var curtis = ee.Image('projects/ee-gfw-drivers-1km/assets/curtis_2021')
var tcl = ee.Image("UMD/hansen/global_forest_change_2021_v1_9").select('lossyear')
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
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
var palette = ['FF0800', 'FFFF00', '228B22', '8B0000', 'A020F0'];
// name of the legend
var names = ['commodity-driven', 'shifting ag', 'forestry', 'wildfire', 'urbanization'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
}  
var drivers_viz = {
  min: 1,
  max: 5,
  opacity: 1,
  palette: palette
}
var curtis_viz = {
  min: 1,
  max: 5,
  opacity: 0.3,
  palette: palette
}
Map.addLayer(curtis, curtis_viz, 'curtis')
Map.addLayer(old_drivers, drivers_viz, 'old-drivers-1km', false)
Map.addLayer(drivers, drivers_viz, 'drivers-1km')
Map.addLayer(tcl, {palette: 'pink'}, 'tcl', false)
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);