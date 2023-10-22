/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var srtm = ee.Image("USGS/SRTMGL1_003"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[108.39647063052064, -6.025548099285605],
          [108.39647063052064, -8.325349287746572],
          [111.76927336489564, -8.325349287746572],
          [111.76927336489564, -6.025548099285605]]], null, false),
    table = ee.FeatureCollection("users/ardian20001/INDONESIA_PROP");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dt_id = table.filter(ee.Filter.eq('Propinsi', 'JAWA TENGAH'));
//Mengimport data landsat Collection 1 Tier 1 TOA Reflectance
var imageL8 = ee.ImageCollection ('LANDSAT/LC08/C01/T1_TOA')
              .filterBounds (geometry);
//Fungsi untuk masking cloud
var maskL8 = function(imageL8) {
  var qa = imageL8.select('BQA');
    var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return imageL8.updateMask(mask);
}
// menerapkan reducer median
var image = imageL8
    .filterDate('2019-01-01', '2019-12-31')
    .map (maskL8)
    .median ();
//Mengambil data-data band yang diperlukan
var nir = image.select('B5');
var swir = image.select('B6');
var ndbi = (swir.subtract(nir)).divide(swir.add(nir));
var colorizedVis = {min: -1, max: 1, palette: ['blue','cyan','green','yellow','red','red','black','black','black']};
Map.addLayer(ndbi.clip(geometry).clip(dt_id),colorizedVis);
//see the information of the data
print (srtm);
//displaying the data in interactive map
//Map.addLayer(srtm, {min:0, max: 300, 
//palette: ['90EE90','FFFF00','FF0000']}, 'Raw SRTM'); //Light green, yellow, red
var slope = ee.Terrain.slope(srtm);
var lstparams1 = ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301','white'];
var sld_intervals1 =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#FFFFFF" quantity="0" label="Water"/>' +
    '<ColorMapEntry color="#C0C0C0" quantity="2" label="Evergreen Needleleaf Forest"/>' +
    '<ColorMapEntry color="#808080" quantity="4" label="Evergreen Broadleaf Forest"/>' +
    '<ColorMapEntry color="#FF0000" quantity="8" label="Deciduous Needleleaf Forest"/>' +
    '<ColorMapEntry color="#800000" quantity="16" label="Deciduous Broadleaf Forest"/>' +
    '<ColorMapEntry color="#FFFF00" quantity="35" label="Mixed Deciduous Forest"/>' +
    '<ColorMapEntry color="#808000" quantity="55" label="Closed Shrubland"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
Map.addLayer(slope.clip(geometry).clip(dt_id).sldStyle(sld_intervals1));
print(slope);
var slope1 = ((slope.subtract(45.0)).divide(45.0)).add(0.25)
var ndbi1 = ((ndbi.subtract(0.448)).divide(0.67175)).add(1)
var pemb1 = (slope1.add(ndbi1)).divide(2)
var pemb = ((pemb1.subtract(0.382)).divide(0.691)).add(1)
var sld_intervals =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#FFFFFF" quantity="-1" label="Water"/>' +
    '<ColorMapEntry color="#C0C0C0" quantity="-0.9" label="Evergreen Needleleaf Forest"/>' +
    '<ColorMapEntry color="#808080" quantity="-0.8" label="Evergreen Broadleaf Forest"/>' +
    '<ColorMapEntry color="#FF0000" quantity="-0.7" label="Deciduous Needleleaf Forest"/>' +
    '<ColorMapEntry color="#800000" quantity="-0.6" label="Deciduous Broadleaf Forest"/>' +
    '<ColorMapEntry color="#FFFF00" quantity="-0.5" label="Mixed Deciduous Forest"/>' +
    '<ColorMapEntry color="#808000" quantity="-0.4" label="Closed Shrubland"/>' +
    '<ColorMapEntry color="#00FF00" quantity="-0.3" label="Open Shrubland"/>' +
    '<ColorMapEntry color="#008000" quantity="-0.2" label="Woody Savanna"/>' +
    '<ColorMapEntry color="#00FFFF" quantity="-0.1" label="Savanna"/>' +
    '<ColorMapEntry color="#008080" quantity="0.0" label="Grassland"/>' +
    '<ColorMapEntry color="#0000FF" quantity="0.1" label="Permanent Wetland"/>' +
    '<ColorMapEntry color="#000080" quantity="0.2" label="Cropland"/>' +
    '<ColorMapEntry color="#FF00FF" quantity="0.3" label="Urban"/>' +
    '<ColorMapEntry color="#800080" quantity="0.4" label="Crop, Natural Veg. Mosaic"/>' +
    '<ColorMapEntry color="#d7cdcc" quantity="0.5" label="Permanent Snow, Ice"/>' +
    '<ColorMapEntry color="#f7e084" quantity="0.6" label="Barren, Desert"/>' +
    '<ColorMapEntry color="#6f6f6f" quantity="0.7" label="Tundra"/>' +
    '<ColorMapEntry color="#FF7C00" quantity="0.8" label="Tundra"/>' +
    '<ColorMapEntry color="#FF0000" quantity="0.9" label="Tundra"/>' +
    '<ColorMapEntry color="#000000" quantity="1.0" label="Tundra"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
Map.addLayer(pemb.clip(geometry).clip(dt_id).sldStyle(sld_intervals));
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'Besar Slope',
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
var palette =['FFFFFF','C0C0C0','808080','FF0000','800000','FFFF00','808000'];
// name of the legend
var names = ['0','2','4','8','16','35','55'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
//print(legend);
Map.add(legend);
var min = ee.Number(pemb.reduceRegion({
reducer: ee.Reducer.min(),
geometry: geometry,
scale: 200,
maxPixels: 1e15
}).values().get(0));
//Menentukan nilai terbesar ndvi
var max = ee.Number(pemb.reduceRegion({
reducer: ee.Reducer.max(),
geometry: geometry,
scale: 200,
maxPixels: 1e15
}).values().get(0));
print(max)
print(min)