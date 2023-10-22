var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.76125112323764,
                -33.08501014748141
              ],
              [
                -64.76125112323764,
                -36.10051612823558
              ],
              [
                -62.01466909198764,
                -36.10051612823558
              ],
              [
                -62.01466909198764,
                -33.08501014748141
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-64.76125112323764, -33.08501014748141],
          [-64.76125112323764, -36.10051612823558],
          [-62.01466909198764, -36.10051612823558],
          [-62.01466909198764, -33.08501014748141]]], null, false);
var jrcDataset = ee.ImageCollection('JRC/GSW1_1/MonthlyHistory');
var countriesLayer = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
var jrcDataset1 = jrcDataset.filter(ee.Filter.calendarRange(1,12,'month'));
// Define start and end date
var startDate = '1999-01-01';
var endDate = '2018-12-31';
// Define palette
var palette = ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF'];
var filteredJRCDataset = jrcDataset1.filterBounds(geometry).filterDate(startDate, endDate);
var validFilteredJRCDataset = filteredJRCDataset.map(function (img) {
  var valid = img.gt(0);
  return valid.set('system:time_start', img.get('system:time_start'));
});
var waterJRCDataset = filteredJRCDataset.map(function (img) {
  var waterImage = img.select('water').eq(2);
  return waterImage.set('system:time_start', img.get('system:time_start'));
});
var totalValidJRCDataset = validFilteredJRCDataset.sum().toFloat();
var totalWaterJRCDataset = waterJRCDataset.sum().toFloat();
var totalWaterPercentJRCDataset = totalWaterJRCDataset.divide(totalValidJRCDataset).multiply(100);
var maskedWaterImage = totalWaterPercentJRCDataset.gt(0);
var waterPercentImage = totalWaterPercentJRCDataset.updateMask(maskedWaterImage);
waterPercentImage = waterPercentImage.clip(geometry);
Map.centerObject(geometry);
//Map.addLayer(waterPercentImage, {'min': '0', 'max': '100', 'bands': 'water', 'palette': palette}, 'filtered');
var link = waterPercentImage.getDownloadURL({
  'name': 'Oeste_9918',
  'scale': 125
});
print(link);
// Define arbitrary thresholds on the 6-bit nightlights image.
var zones = waterPercentImage.gt(0).add(waterPercentImage.gt(5)).add(waterPercentImage.gt(10)).add(waterPercentImage.gt(25)).add(waterPercentImage.gt(50)).add(waterPercentImage.gt(75)).add(waterPercentImage.gt(100));
zones = zones.updateMask(zones.neq(0));
// Convert the zones of the thresholded nightlights to vectors.
var vectors = zones.addBands(waterPercentImage).reduceToVectors({
  geometry: geometry,
  crs: waterPercentImage.projection(),
  scale: 55,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});
// Display the thresholds.
Map.addLayer(zones, {min: 1, max: 6, palette: ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF']}, 'Riesgo Hídrico');
// Make a display image for the vectors, add it to the map.
var display = ee.Image(0).updateMask(0).paint(vectors, '00FF00', 1);
//Map.addLayer(display, {palette: ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF']}, 'vectors');
Export.table.toDrive({
  collection: vectors,
  description: 'Oeste_9918',
  fileFormat: 'KML'
});
print(zones);
// Define a boxcar or low-pass kernel.
var boxcar = ee.Kernel.gaussian({
  radius: 10, units: 'pixels', normalize: true
});
// Smooth the image by convolving with the boxcar kernel.
var smooth = zones.convolve(boxcar);
//Map.addLayer(smooth, {min: 1, max: 6, palette: ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF', '0000FF']}, 'Riesgo Hídrico');
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Frecuencia de anegamiento (1999-2018)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
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
var pale = ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF', '0000FF'];
// name of the legend
var names = ['0.1-5%','5-10%','10-25%', '25-50%','50-75%', '75-100%'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(pale[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var geometry = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});