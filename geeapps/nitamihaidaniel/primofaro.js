var change = ui.import && ui.import("change", "image", {
      "id": "users/nitamihaidaniel/romania/change_2019"
    }) || ee.Image("users/nitamihaidaniel/romania/change_2019"),
    B432 = ui.import && ui.import("B432", "image", {
      "id": "users/nitamihaidaniel/romania/s2_ro_natural_2019"
    }) || ee.Image("users/nitamihaidaniel/romania/s2_ro_natural_2019"),
    judete = ui.import && ui.import("judete", "table", {
      "id": "users/nitamihaidaniel/Administrative_unite_2nd_Order_wgs"
    }) || ee.FeatureCollection("users/nitamihaidaniel/Administrative_unite_2nd_Order_wgs"),
    B1184 = ui.import && ui.import("B1184", "image", {
      "id": "users/nitamihaidaniel/romania/s2_false_2019_romania"
    }) || ee.Image("users/nitamihaidaniel/romania/s2_false_2019_romania"),
    NDVI = ui.import && ui.import("NDVI", "image", {
      "id": "users/nitamihaidaniel/romania/ndvi_2019_romania"
    }) || ee.Image("users/nitamihaidaniel/romania/ndvi_2019_romania"),
    primofaro = ui.import && ui.import("primofaro", "image", {
      "id": "users/nitamihaidaniel/romania/primofaro_4326"
    }) || ee.Image("users/nitamihaidaniel/romania/primofaro_4326"),
    image = ui.import && ui.import("image", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                19.6389414178908,
                48.53172986465679
              ],
              [
                19.6389414178908,
                43.2138137663588
              ],
              [
                30.4494882928908,
                43.2138137663588
              ],
              [
                30.4494882928908,
                48.53172986465679
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
        [[[19.6389414178908, 48.53172986465679],
          [19.6389414178908, 43.2138137663588],
          [30.4494882928908, 43.2138137663588],
          [30.4494882928908, 48.53172986465679]]], null, false),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/nitamihaidaniel/romania/potapov1980_2012"
    }) || ee.Image("users/nitamihaidaniel/romania/potapov1980_2012"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/nitamihaidaniel/romania/historical_cuts55_75"
    }) || ee.Image("users/nitamihaidaniel/romania/historical_cuts55_75");
var s1 = ['#ff54d2', '#e7ff64', '#4cff41', '#06ba1c'];
//Map.addLayer(B432, {min:450, max:1650, opacity: 0.5}, 'Natural color', false);
Map.addLayer(primofaro, {min:0, max:255}, 'Primofaro EuroNatur Foundation', false);
//Map.addLayer(NDVI, { min: 0.5456162441635737, max: 0.8597981653099009, palette: ['#ffded2','#ca9c6d','#edff56','#4dff6b','#2bc60f','#316a3b'] }, 'NDVI', false);
//Map.addLayer(B1184, {min:300, max:4000}, 'False color', false);
var hansen = ['red'];
var corona = ['blue'];
var potapov =['#674EA7', '#674EA7','red','red'];
var hansen_img = image.clip(geometry.buffer(500));
// Display NDVI and NDWI results on map
Map.centerObject(geometry, 8);
var loss = image.select('loss');
var PotapovMask = image2.gt(0);
var HansenMask = loss.gt(0);
//Select the datamask band from the Hansen data
var treecover = image.select('treecover2000');
// Create a binary mask. For this band, 0=No Data, 1=Land, and 2=Water
var TreeMask = treecover.gt(50);
Map.addLayer(change.updateMask(TreeMask), {bands: 'VV', min: 0.5, max: 1.5, palette: s1 }, 'Taieri 2019');
Map.addLayer(image.updateMask(HansenMask), {min:0, max:1, opacity: 1, palette: hansen, bands: ['loss']}, 'Taieri 2000 - 2018 (Hansen)');
Map.addLayer(image2.updateMask(PotapovMask), {min:1, max:4, opacity: 1, palette: potapov, bands: ['b1']}, 'Taieri 1980 - 2012 (Potapov)');
Map.addLayer(image3, {min:0, max:1, opacity: 1, palette: corona, bands: ['b1']}, 'Taieri 1955-1975 (Corona+Fotograme)');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var outlines = empty.paint({
  featureCollection: judete,
  color: 'habitate',
  width: 1
});
var palette = ['black', 'black', 'black'];
Map.addLayer(outlines, {palette: palette, max: 14}, 'Limite judete');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
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
var palette =['250ed7', '674ea7', 'd7250e', 'ff54d2'];
// name of the legend
var names = ['Taieri 1955-1975 Sursa Corona+Forograme', 'Taieri 1985-1990 Sursa Potapov', 'Taieri 1990-2018 Sursa Potapov+Hansen', 'Taieri 2019 Sursa Sentinel1'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);