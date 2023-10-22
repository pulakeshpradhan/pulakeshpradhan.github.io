var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "tree_canopy_cover_mean"
        ],
        "max": 100,
        "palette": [
          "ffffff",
          "afce56",
          "5f9c00",
          "0e6a00",
          "003800"
        ]
      }
    }) || {"opacity":1,"bands":["tree_canopy_cover_mean"],"max":100,"palette":["ffffff","afce56","5f9c00","0e6a00","003800"]};
// Wyperfield National Park
var dataset = ee.FeatureCollection('WCMC/WDPA/current/polygons');
var hattanp = dataset.filter(ee.Filter.eq('ORIG_NAME', "Murray - Sunset"));
print(hattanp)
var hattahfire = ee.ImageCollection('NASA/MEASURES/GFCC/TC/v3')
                  .filterDate('2015-01-01', '2015-12-31')
                  .filterBounds(hattanp)
                  .select('tree_canopy_cover')
                  .reduce('mean')
                  .clip(hattanp);
// var hattahfire = hattahfire.clip(hattanp);
var chart = ui.Chart.image.histogram({image: hattahfire, region: hattanp, scale: 500})
        .setOptions({
          title: 'HK-NP Forest Tree Canopy Cover (2015) Histogram',
          hAxis: {
            title: 'Reflectance ',
            titleTextStyle: {italic: false, bold: true},
          },
          vAxis:
              {title: 'Count', titleTextStyle: {italic: false, bold: true}},
          colors: ['cf513e', '1d6b99', 'f0af07']
        });
print(chart)
print(hattahfire)
var treeCanopyCoverVis = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800'],
};
/*var visParams = {
  palette: ['2ed033', '5aff05', '67b9ff', '5844ff', '0a7618', '2c05ff'],
  min: 0.0,
  max: 1550000.0,
  opacity: 0.8,
};*/
Map.centerObject(hattanp, 9);
Map.addLayer(hattahfire, treeCanopyCoverVis, "Wyperfield National Park");
// Legend
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
var palette =["ffffff","afce56","5f9c00","0e6a00","003800"];
// name of the legend
var names = ['Very low','Low','Moderate', 'High', 'Very High'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  } 
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Visualize FireCCI51 for one year
/* var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filterDate('2020-01-01', '2020-12-31');
var burnedArea = dataset.select('BurnDate');
// Use a circular palette to assign colors to date of first detection
var baVis = {
  min: 1,
  max: 366,
  palette: [
    'ff0000', 'fd4100', 'fb8200', 'f9c400', 'f2ff00', 'b6ff05',
    '7aff0a', '3eff0f', '02ff15', '00ff55', '00ff99', '00ffdd',
    '00ddff', '0098ff', '0052ff', '0210ff', '3a0dfb', '7209f6',
    'a905f1', 'e102ed', 'ff00cc', 'ff0089', 'ff0047', 'ff0004'
  ]
};
var maxBA = burnedArea.max();
Map.setCenter(0, 18, 2.1);
Map.addLayer(maxBA, baVis, 'Burned Area'); */