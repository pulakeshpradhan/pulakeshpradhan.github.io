var class16 = ui.import && ui.import("class16", "image", {
      "id": "users/atstahl/Late16classified_100trees"
    }) || ee.Image("users/atstahl/Late16classified_100trees"),
    class17 = ui.import && ui.import("class17", "image", {
      "id": "users/atstahl/Late17classified_100trees"
    }) || ee.Image("users/atstahl/Late17classified_100trees"),
    class18 = ui.import && ui.import("class18", "image", {
      "id": "users/atstahl/Late18classified_100trees"
    }) || ee.Image("users/atstahl/Late18classified_100trees"),
    class19 = ui.import && ui.import("class19", "image", {
      "id": "users/atstahl/Late19classified_100trees"
    }) || ee.Image("users/atstahl/Late19classified_100trees"),
    county = ui.import && ui.import("county", "table", {
      "id": "users/atstahl/WhitmanCo"
    }) || ee.FeatureCollection("users/atstahl/WhitmanCo"),
    stability = ui.import && ui.import("stability", "image", {
      "id": "users/atstahl/StabilityClass_ROI"
    }) || ee.Image("users/atstahl/StabilityClass_ROI");
// This script is for an app that displays the outcome of the cover 
    // classification in Stahl et al. (in press) for Whitman County.
    // *** The lines below set up the map. ***
    // Center map on Whitman County.
    Map.setCenter(-117.5, 46.87, 10);
    // Color palette for cover classes.
    var ClassParam = {min: 0, max: 2, palette: ["373e8d","ffc772","20b82c"]};
      var StabParam = {min: 0, max: 6, 
        palette: ['FFFFFF', // 0 = not classified
                '000000',  // 1 = "other" in all 4 years
                'FFFF00', // 2 = "senesced" in all 4 years
                '006400', // 3 = "evergreen" in all 4 years
                'FF00FF', // 4 = "evergreen" in at least 1 year, "senesced" in at least one year
                'gray', // 5 = "other" in at least 1 year, "senesced" or "other" in other years
                'gray']}; // 6 = "other" in at least 1 year, "evergreen" in other years
    // Display imported rasters.
    Map.addLayer(class16, ClassParam, '2016 late season cover', false);
     Map.addLayer(class17, ClassParam, '2017 late season cover', false);
      Map.addLayer(class18, ClassParam, '2018 late season cover', false);
       Map.addLayer(class19, ClassParam, '2019 late season cover', false);
        Map.addLayer(stability, StabParam, '2016-2019 stability classes', false);
  //Create county outline and display.
  var empty = ee.Image().byte();
  var countyOutline = empty.paint({
    featureCollection: county,
    color: 1,
    width: 2
  });
  Map.addLayer(countyOutline, {}, "Whitman Co.");
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
var palette =['000000', 'FFFF00', '006400', 'FF00FF'];
// name of the legend
var names = ['non-vegetated','brown vegetation','green vegetation', 'areas of brown/green change'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);