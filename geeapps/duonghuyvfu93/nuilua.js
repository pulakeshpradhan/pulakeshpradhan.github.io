var geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -18.07221275794227,
                28.88209812934849
              ],
              [
                -18.07221275794227,
                28.419324910970744
              ],
              [
                -17.61078697669227,
                28.419324910970744
              ],
              [
                -17.61078697669227,
                28.88209812934849
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
        [[[-18.07221275794227, 28.88209812934849],
          [-18.07221275794227, 28.419324910970744],
          [-17.61078697669227, 28.419324910970744],
          [-17.61078697669227, 28.88209812934849]]], null, false);
//-------------Khai bao khu vuc nghien cuu----------------------------
var khuvuc = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-18.07221275794227, 28.88209812934849],
          [-18.07221275794227, 28.419324910970744],
          [-17.61078697669227, 28.419324910970744],
          [-17.61078697669227, 28.88209812934849]]], null, false);
Map.centerObject(khuvuc,10);
//Map.setCenter(-17.919583504718126,28.676503782787318, 12);
//------------ Khai bao anh sentinel 5P - S02 before
var collection_before = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2021-09-01', '2021-09-18');
var band_viz = {
  min: 0.0,
  max: 0.04,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var img_before = collection_before.mean().clip(khuvuc)
Map.addLayer(img_before, band_viz, 'S5P SO2');
// Xac dinh gia tri min - max
var min = ee.Number(img_before.reduceRegion({
reducer: ee.Reducer.min(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, ' Giá trị nhỏ nhất nong do SO2 truoc');
var max = ee.Number(img_before.reduceRegion({
reducer: ee.Reducer.max(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'Giá trị lớn nhất nong do SO2 truoc')//
//------------ Khai bao anh sentinel 5P - S02 after
var collection_after = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2021-09-19', '2021-10-30');
var band_viz = {
  min: 0.0,
  max: 0.05,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var img_after = collection_after.mean().clip(khuvuc)
Map.addLayer(img_after, band_viz, 'S5P SO2 after');
// Xac dinh gia tri min - max
var min = ee.Number(img_after.reduceRegion({
reducer: ee.Reducer.min(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, ' Giá trị nhỏ nhất nong do SO2 after');
var max = ee.Number(img_after.reduceRegion({
reducer: ee.Reducer.max(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'Giá trị lớn nhất nong do SO2 after')//
//--------------tạo chú thích-------
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',// vị trí
    padding: '8px 15px'  }
});
 // Create legend title
var legendTitle = ui.Label({
  value: 'SO2 (mol/m^2)',// tên chú thích 
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage = gradient.visualize(band_viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(band_viz['max'])
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
      ui.Label(band_viz['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
//