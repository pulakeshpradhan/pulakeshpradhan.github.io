var sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    arjuno = ui.import && ui.import("arjuno", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.53535031464844,
                -7.671644186855507
              ],
              [
                112.53535031464844,
                -7.820647329264021
              ],
              [
                112.66993283417969,
                -7.820647329264021
              ],
              [
                112.66993283417969,
                -7.671644186855507
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[112.53535031464844, -7.671644186855507],
          [112.53535031464844, -7.820647329264021],
          [112.66993283417969, -7.820647329264021],
          [112.66993283417969, -7.671644186855507]]], null, false);
// Display the region of interest
Map.centerObject(arjuno);
//Create buffer zone as study area
var geom = ee.Geometry.Point(112.59, -7.75).buffer(10000);
// Load a pre-computed Sentinel composite for input.
var input = ee.Image('COPERNICUS/S2/20190625T022551_20190625T024403_T49MFM');
var input2 = ee.Image('COPERNICUS/S2/20191021T023729_20191021T025654_T49MFM');
//Visualize datasets in true colour
var trueColour1 = {
        bands: ["B12", "B11", "B4"],
        min: 0,
        max: 3000
        };
var trueColour2 = {
        bands: ["B12", "B11", "B4"],
        min: 0,
        max: 3000
        };
  // Add the image to the map, using the visualization parameters.
  Map.addLayer(input, trueColour1, "True-colour image of 25 June 2019", false);
  Map.addLayer(input2, trueColour2, "True-colour image of 21 Oct 2019", false);
  //Define variable NBR from equation
    var BurntIndices = input.expression(
        "(NIR - SWIR2) / (NIR + SWIR2)",
        {
          SWIR2: input.select("B12"),    //  SWIR2
          NIR: input.select("B8"),    // NIR
        });
    Map.addLayer(BurntIndices, {min: -1, max: 1}, "Burnt Indices 25 June 2019", false);
    var BurntIndices2 = input.expression(
        "(NIR - SWIR2) / (NIR + SWIR2)",
        {
          SWIR2: input2.select("B12"),    //  SWIR2
          NIR: input2.select("B8"),    // NIR
        });
    Map.addLayer(BurntIndices2, {min: -1, max: 1}, "Burnt Indices 21 Oct 2019", false);
    //Clip data
var BeforeBurntclip = BurntIndices.clip(geom);
var AfterBurntclip = BurntIndices2.clip(geom);
//Visualize the data
Map.addLayer(BeforeBurntclip, {min: -1, max: 1}, "BeforeBurnt", false);
Map.addLayer(AfterBurntclip, {min: -1, max: 1}, "AfterBurnt", false);
//Calculate dNBR
var dNBR_unscaled = BeforeBurntclip.subtract(AfterBurntclip);
// Scale product to USGS standards
var dNBR = dNBR_unscaled.multiply(1000);
print("Difference Normalized Burn Ratio: ", dNBR);
Map.addLayer(dNBR, {min: -1000, max: 1000}, "Difference Normalized Burn Ratio", false);
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Add the image to the map using both the color ramp and interval schemes.
Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
// Seperate result into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// count number of pixels in entire layer
var allpix =  classified.updateMask(classified);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: geom,
  scale: 10
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
// create an empty list to store area values in
var arealist = [];
// create a function to derive extent of one burn severity class
// arguments are class number and class name
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: geom,
  scale: 10
  });
var pix =  ee.Number(stats.get('sum'));
var hect = pix.multiply(100).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
};
// severity classes in different order
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// execute function for each class
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
// Add legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'dNBR Classes',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
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
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// name of the legend
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//Create histogram
var options = {
  title: 'Histogram of dNBR using buffer area',
  fontSize: 20,
  hAxis: {title: 'dNBR'},
  vAxis: {title: 'Frequency'},
  series: {
    0: {color: '7a8737'},
    1: {color: 'acbe4d'},
    2: {color: '0ae042'},
    3: {color: 'fff70b'},
    4: {color: 'ffaf38'},
    5: {color: 'ff641b'},
    6: {color: 'a41fd6'},
    7: {color: 'ffffff'}}};
var histogram = ui.Chart.image.histogram({
  image: dNBR,
  region: geom,
  scale: 200,
  minBucketWidth: 300
});
histogram.setOptions({
  title: 'Burnt'
});
print(histogram);
//Stack all layers & create histogram
var stacked = AfterBurntclip.addBands(BeforeBurntclip);
var options = {
  title: 'Histogram of NDVI Before and After Burnt',
  fontSize: 20,
  hAxis: {title: 'NDVI'},
  vAxis: {title: 'Frequency'},
  series: {
    0: {color: 'red'},
    1: {color: 'green'}}};
var histogram = ui.Chart.image.histogram(stacked, geom, 30)
    .setSeriesNames(['After', 'Before'])
    .setOptions(options);
print(histogram);
//Create side panel information
var header = ui.Label('Burn Severity of Mount Arjuno Forest Fire 2019', {fontSize: '25px', color: 'darkSlateGrey', fontWeight: 'bold'});
var text_1 = ui.Label('This map shows the difference Normalized Burnt Ratio (dNBR) of Mount Arjuno of year 2019. Before burnt image was acquired on 25 June 2019, while after burnt image was acquired on 21 Oct 2019',{fontSize: '15px'});
var text_2 = ui.Label('Processed by: Setiani, Devianto, and Ramdani, 2020. Universitas Brawijaya & University of Tsukuba', {fontSize: '12px'});
var toolPanel = ui.Panel([header, text_1, text_2], 'flow', {width: '350px'});
ui.root.widgets().add(toolPanel);
//var table = ui.Chart(
//    [
//      ['<h2>dNBR of Arjuno Mountain 2019</h2>'],
//      ['<img src=https://upload.wikimedia.org/wikipedia/commons/b/bb/Logo_Universitas_Brawijaya.svg width=150px>']
//    ],
//    'Table', {allowHtml: true});
//var titlePanel = ui.Panel([table], 'flow', {width: '300px', padding: '8px'});
//ui.root.insert(0, titlePanel);
// Export a cloud-optimized GeoTIFF.
Export.image.toDrive({
  image: dNBR,
  description: 'dNBR2019',
  scale: 10,
  region: geom,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});