var stream = ui.import && ui.import("stream", "table", {
      "id": "users/kaihu/TaiwanChi"
    }) || ee.FeatureCollection("users/kaihu/TaiwanChi"),
    approx_boundary = ui.import && ui.import("approx_boundary", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                119.86757135010528,
                25.389228287088798
              ],
              [
                119.86757135010528,
                21.76514655062741
              ],
              [
                122.05385064698028,
                21.76514655062741
              ],
              [
                122.05385064698028,
                25.389228287088798
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[119.86757135010528, 25.389228287088798],
          [119.86757135010528, 21.76514655062741],
          [122.05385064698028, 21.76514655062741],
          [122.05385064698028, 25.389228287088798]]], null, false);
var palettes = require('users/gena/packages:palettes'); //import the palettes from ee-palettes
var palette = palettes.colorbrewer.Spectral[11].reverse(); //pick your colorbar
var empty = ee.Image().byte();
var stream_chi = empty.paint({
  featureCollection: stream,
  color: 'chi',
  width: 2,
});
var viz = {min: 0, max: 28, palette: palette}
Map.centerObject(stream, 8)
Map.setOptions('TERRAIN')
Map.addLayer(stream_chi, viz)
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'χ (m)',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend);