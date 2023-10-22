var Whitman = ui.import && ui.import("Whitman", "table", {
      "id": "users/atstahl/WhitmanCo"
    }) || ee.FeatureCollection("users/atstahl/WhitmanCo"),
    Garfield = ui.import && ui.import("Garfield", "table", {
      "id": "users/atstahl/GarfieldCo"
    }) || ee.FeatureCollection("users/atstahl/GarfieldCo"),
    update = ui.import && ui.import("update", "image", {
      "id": "projects/ee-atstahl/assets/ClassifiedImages/WC2022Update"
    }) || ee.Image("projects/ee-atstahl/assets/ClassifiedImages/WC2022Update");
// This script is for an app that displays the outcome of a cover change  
    // classification to compare 2020-2021 to previous VSP reporting for Whitman & Garfield Counties.
    // *** The lines below set up the map. ***
    // Center map on Whitman County.
    Map.setCenter(-117.5755, 46.6678, 9);
    // Color palette for cover classes.
      var palette = 
              ['yellow', // 0 = areas of change
              'tan', // 1 = all years brown veg
              'green', // 2 = all years green veg
              'black', // 3 = all years nonVeg
              'magenta', // 4 = all flipping green/brown
              'red', // 5 = green in baseline but not in 2020-2021
              'cyan', // 6 = brown in baseline, green in 2020 or 2021
              'gray']; // 7 = nonVeg sometimes in all years
    // Display imported raster.
    Map.addLayer(update, {min: 0, max: 7, opacity: 0.6, palette: palette}, 'Changes in 2020 or 2021 compared to 2016-2019 baseline');
  //Create county outline and display.
  var empty = ee.Image().byte();
  var WCOutline = empty.paint({
    featureCollection: Whitman,
    color: 1,
    width: 2
  });
    var GCOutline = empty.paint({
    featureCollection: Garfield,
    color: 1,
    width: 2
  });
  Map.addLayer(WCOutline, {}, "Whitman Co.");
  Map.addLayer(GCOutline, {}, "Garfield Co.");
  // set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Change classes',
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
var palette =['FFFF00', 'fae5d3', '2ecc71', '17202a', 'f633ff', 'ff3c33', '33fffc','d8dbdb'];
// name of the legend
var names = ['other areas of change','brown vegetation all yrs','green vegetation all yrs', 
            'non-vegetated all yrs','consistently green or brown','green in 2016-2019 but not in 2020 or 2021', 
            'brown in 2016-2019, green in 2020 or 2021', 'occasionally classified as non-vegetated'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);