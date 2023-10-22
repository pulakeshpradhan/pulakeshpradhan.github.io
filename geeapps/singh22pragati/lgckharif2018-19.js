var imageCollection = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    aoi = ee.FeatureCollection("users/singh22pragati/command_area");
// Load a Landsat 8 image.
var startDate = '2018-08-01';
var endDate = '2018-10-30';
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
//var image2 = l8.median();
//Map.addLayer(l8.min(),{bands: ['B5', 'B4', 'B3'], max: 0.3}, 'Landsat image fcc')
function maskL8(image) {
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(Math.pow(2, 12)).neq(1).and(  // cirrus
             qa.bitwiseAnd(Math.pow(2, 13)).neq(1)).and( // cirrus
             qa.bitwiseAnd(Math.pow(2, 14)).neq(1)).and( // cloud
             qa.bitwiseAnd(Math.pow(2, 15)).neq(1));     // cloud
  return image.updateMask(mask);
}
var image1 = l8.filterDate(startDate, endDate)
                 .map(maskL8)
                  .mosaic();
var image = image1.clip(aoi);
// Create NDVI and NDWI spectral indices.
var ndvi = image.normalizedDifference(['B5', 'B4']);
//var ndwi = image.normalizedDifference(['B3', 'B5']);
// Create a binary layer using logical operations.
var bare = ndvi.gt(0.3).and(ndvi.lt(0.7));
//var forest = ndvi.gt(0.7).and(ndvi.lte(1));
// Mask and display the binary layer.
//Map.setCenter(-122.3578, 37.7726, 12);
var veg = bare.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg = veg.multiply(ee.Image.pixelArea()).divide(100*100);
var stat = area_veg.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
//LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Crop Classification',
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
var palette =['ffffff','00ca00'];
// name of the legend
var names = ['No value','Crop'];
// Add color and and names
for (var i = 0; i <2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
print ('Vegetation Area (in sq.km)', stat);
Map.add(legend);
Map.centerObject(aoi)
Map.setOptions('satellite');
//Map.addLayer(bare, {min: 0, max: 1, palette: ['ffffff','00ca00']}, 'crop');
Map.addLayer(image, {bands: ['B5', 'B4', 'B3'], max: 0.3}, 'Landsat image');
print(ndvi);
Map.addLayer(ndvi,  {palette: ['red', 'green', 'blue']},'NDVI')
Map.addLayer(bare, {min: 0, max: 1, palette: ['ffffff','00ca00']}, 'crop');
//Map.addLayer(forest.updateMask(forest), {}, 'forest');
var viz =  {min: 0, max: 1, palette: ['ffffff','00ca00']}
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel);
var ima =stat;
var inspector = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.add(inspector);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 30);
  var computedValue = stat.get('nd');
  print(computedValue)
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
// Add the panel to the ui.root.