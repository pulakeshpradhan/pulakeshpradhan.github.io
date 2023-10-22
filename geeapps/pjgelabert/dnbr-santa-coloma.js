var area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                1.3474529193958595,
                41.54732181948946
              ],
              [
                1.3474529193958595,
                41.49308357629113
              ],
              [
                1.558253090294297,
                41.49308357629113
              ],
              [
                1.558253090294297,
                41.54732181948946
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
        [[[1.3474529193958595, 41.54732181948946],
          [1.3474529193958595, 41.49308357629113],
          [1.558253090294297, 41.49308357629113],
          [1.558253090294297, 41.54732181948946]]], null, false);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
Map.centerObject(area)
var dataset_post = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-07-30', '2021-08-15')
                  .filterBounds(area)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .sort('CLOUDY_PIXEL_PERCENTAGE')
                  .filter(ee.Filter.eq('MGRS_TILE',"31TCF"))
                  .map(maskS2clouds);
var visualization_RGB = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var visualization_SNR = {
  min: 0.0,
  max: 0.3,
  bands: ['B12', 'B8', 'B4'],
};
var dataset_pre = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-07-20', '2021-07-23')
                  .filterBounds(area)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .sort('CLOUDY_PIXEL_PERCENTAGE')
                  .filter(ee.Filter.eq('MGRS_TILE',"31TCF"))
                  .map(maskS2clouds);
Map.centerObject(area)
Map.addLayer(dataset_pre.first().clip(area), visualization_RGB, 'RGB_pre 21/07/2021');
Map.addLayer(dataset_post.first().clip(area), visualization_RGB, 'RGB_post 13/08/2021');
Map.addLayer(dataset_pre.first().clip(area), visualization_SNR, 'SNR_pre 21/07/2021');
Map.addLayer(dataset_post.first().clip(area), visualization_SNR, 'SNR_post 13/08/2021');
var nbr_pre = dataset_pre.first().clip(area).normalizedDifference(['B8', 'B12']).rename('NBR_pre');
var nbr_post = dataset_post.first().clip(area).normalizedDifference(['B8', 'B12']).rename('NBR_post');
var dNBR= (nbr_pre.subtract(nbr_post)).multiply(1000)
Map.addLayer(dNBR.clip(area), {}, 'dNBR Greyscale');
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
//==========================================================================================
//                                    ADD A LEGEND
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
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var IMG_pre= dataset_pre.toBands().clip(area)
var IMG_post= dataset_post.toBands().clip(area)
Export.image.toDrive({
  image: IMG_pre,
  description: 'S2_21072021_preFire',
  scale: 20,
  region: area
});
Export.image.toDrive({
  image: IMG_post,
  description: 'S2_13082021_postFire',
  scale: 20,
  region: area
});