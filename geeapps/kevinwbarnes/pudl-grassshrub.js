var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-kevinbarnes/assets/PUDLmask_PUDLgrsshrb"
    }) || ee.Image("projects/ee-kevinbarnes/assets/PUDLmask_PUDLgrsshrb");
Map.addLayer(image, {min:1, max:3, palette:['YellowGreen', 'DarkGreen', 'Indigo']}, 'PUDL Grass/Shrub')
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Classified Cover in PUDL',
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
var palette =['9ACD32', '006400', '4B0082'];
// name of the legend
var names = ['Pot. Undist. Grass','Pot. Dist. Grass','Shrub'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);