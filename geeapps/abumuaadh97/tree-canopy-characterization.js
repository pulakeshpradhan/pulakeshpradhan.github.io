var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            144.7417305861779,
            -35.844482943620726
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([144.7417305861779, -35.844482943620726]);
// Wyperfield National Park
var dataset = ee.FeatureCollection('WCMC/WDPA/current/polygons');
var murraynp = dataset.filter(ee.Filter.eq('ORIG_NAME', "Murray - Sunset"));
var hattahnp = dataset.filter(ee.Filter.eq("ORIG_NAME", "Hattah - Kulkyne"));
var wypernp = dataset.filter(ee.Filter.eq("ORIG_NAME", "Wyperfeld"))
var murray = ee.ImageCollection("NASA/MEASURES/GFCC/TC/v3")
              .filterDate("2015-01-01", "2015-12-31")
              .filterBounds(murraynp)
              .select("tree_canopy_cover")
              .reduce("mean")
              .clip(murraynp)
var hattah = ee.ImageCollection("NASA/MEASURES/GFCC/TC/v3")
              .filterDate("2015-01-01", "2015-12-31")
              .filterBounds(hattahnp)
              .select("tree_canopy_cover")
              .reduce("mean")
              .clip(hattahnp)
var wyper = ee.ImageCollection('NASA/MEASURES/GFCC/TC/v3')
                  .filterDate('2015-01-01', '2015-12-31')
                  .filterBounds(wypernp)
                  .select('tree_canopy_cover')
                  .reduce('mean')
                  .clip(wypernp);
var mapcenter = geometry
Map.centerObject(mapcenter, 6.9)
//Map.addLayer(murraynp, {}, "Murray Sunset")
//Map.addLayer(hattahnp, {}, "Hattah Kulkyne")
//Map.addLayer(wypernp, {}, "Wyperfeld")
var visparam = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800']
};
Map.addLayer(murray, visparam, "Murray Tree Canopy Cover")
Map.addLayer(hattah, visparam, "Hattah Tree Canopy Cover")
Map.addLayer(wyper, visparam, "Wyperfeld Tree Canopy Cover")
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
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  } 
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);