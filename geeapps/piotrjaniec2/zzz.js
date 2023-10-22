var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    geom = ui.import && ui.import("geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                135.58029950188046,
                68.12550464501516
              ],
              [
                135.58029950188046,
                67.86204160890482
              ],
              [
                136.41526043938046,
                67.86204160890482
              ],
              [
                136.41526043938046,
                68.12550464501516
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[135.58029950188046, 68.12550464501516],
          [135.58029950188046, 67.86204160890482],
          [136.41526043938046, 67.86204160890482],
          [136.41526043938046, 68.12550464501516]]], null, false);
Map.addLayer(geom, {}, 'Borders');
Map.centerObject(geom)
var rgb_vis = {min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']};
var ndvi = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
var nbr = {min: -1, max: 1, palette: ['blue', 'green', 'red']};
var grey = ['white', 'black'];
var year = 2014;
var StartFire = (year) + '-06-01';
var EndFire = (year) + '-10-01';
var StartBeforeFire = (year-1) + '-06-01';
var EndBeforeFire = (year-1) + '-09-01';
var StartAfterFire = (year+1) + '-06-01';
var EndAfterFire = (year+1) + '-09-01';
var FIRMS = ee.ImageCollection('FIRMS')
 .filterBounds(geom)
 .filterDate(StartFire, EndFire);
var T21 = FIRMS.mosaic()
 .clip(geom)
 .select('T21');
var zones = T21.gt(0);
zones = zones.updateMask(zones.neq(0));
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
Map.addLayer(T21, firesVis, 'Fires');
var vectors = zones.addBands(T21).reduceToVectors({
 geometry: geom,
 crs: T21.projection(),
 scale: 500,
 geometryType: 'polygon',
 eightConnected: false,
 labelProperty: 'zone',
 reducer: ee.Reducer.mean()});
 var buffer = function(feature) {
 return feature.buffer(3000);};
 var bounds = vectors.map(buffer);
 Map.addLayer(bounds, {}, 'Fires_Buffer');
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var waterBitMask = 1 << 2;
  var snowBitMask = 1 << 4;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
      .and(qa.bitwiseAnd(waterBitMask).eq(0))
      .and(qa.bitwiseAnd(snowBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
var getNDVI = function(image) {
  return image.normalizedDifference(['B5', 'B4']);
};
var getNBR = function(image) {
  return image.normalizedDifference(['B5', 'B7']);
};
var imagebefore = ee.ImageCollection(L8  // Filter by dates.
    // Filter by dates.
    // Filter by dates.
    // Filter by dates.
  // Filter by dates.
   // Filter by dates.
  // Filter by dates.
    // Filter by dates.
    .filterDate(StartBeforeFire, EndBeforeFire)
    // Filter by location.
    .filterBounds(geom).sort('CLOUD_COVER',false)
    );
var before = imagebefore.map(maskL8sr).mosaic().clip(bounds);
var ndvi_before = getNDVI(before);
var nbr_before = getNBR(before);
var imageafter = ee.ImageCollection(L8  // Filter by dates.
    // Filter by dates.
    // Filter by dates.
    // Filter by dates.
  // Filter by dates.
   // Filter by dates.
  // Filter by dates.
    // Filter by dates.
    .filterDate(StartAfterFire, EndAfterFire)
    // Filter by location.
    .filterBounds(geom).sort('CLOUD_COVER',false)
    );
var after = imageafter.map(maskL8sr).mosaic().clip(bounds);
var ndvi_after = getNDVI(after);
var nbr_after = getNBR(after);
var dNBR_unscaled = nbr_before.subtract(nbr_after);
var dNBR = dNBR_unscaled.multiply(1000);
Map.addLayer(before, rgb_vis, "True-colour image before");
Map.addLayer(after, rgb_vis, "True-colour image after");
Map.addLayer(ndvi_before, ndvi, 'NDVI image before');
Map.addLayer(ndvi_after, ndvi, 'NDVI image after');
Map.addLayer(nbr_before, nbr, 'NBR image before')
Map.addLayer(nbr_after, nbr, 'NBR image after');
Map.addLayer(dNBR_unscaled, grey, 'dNBR');
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
Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
var bounds = ee.Image(0).updateMask(0).paint(bounds, '000000',2);
Map.addLayer(bounds,{palette:'#000000'},'Fires_Buffer');
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
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var boxcar = ee.Kernel.square({
  radius: 5, units: 'pixels', magnitude: 1
});
var dNBR = dNBR.convolve(boxcar);
var burned_area = dNBR.gt(270);
burned_area = burned_area.updateMask(burned_area.eq(1));
Map.addLayer(burned_area);
var vector_burned = burned_area.addBands(dNBR).reduceToVectors({
  geometry: geom,
  crs: dNBR.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean(),
  maxPixels: 50000000000
});
var display = ee.Image(0).updateMask(0).paint(vector_burned, '000000', 3);
Map.addLayer(display, {palette: '000000'}, 'vector_burned');
var filtered = L8.filterDate('2014-06-01', '2019-09-01')
                  //.filter(ee.Filter.calendarRange(7, 8, 'month'))
                  .map(maskL8sr);
var NDVI = filtered.map(
    function(img) {
         return img.normalizedDifference(['B5','B4'])
                  .rename('NDVI')
                  .copyProperties(img, ['system:time_start']);
    });
var l8Chart = ui.Chart.image.series(NDVI, vector_burned, ee.Reducer.mean(), 250)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 NDVI time series at burned area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 1,
      pointSize: 3,
    });
print(l8Chart);
var scaleforTestArea = 30;
var img = ee.Image.pixelArea().divide(1000000);
var area = img.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: vector_burned,
  crs: 'EPSG:32645', // WGS Zone N 45
  scale: scaleforTestArea,
  maxPixels: 1E13
});
// gives an area of 147134.49 km2
print('area of fire: ', ee.Number(area.get('area')).getInfo() + ' km2');