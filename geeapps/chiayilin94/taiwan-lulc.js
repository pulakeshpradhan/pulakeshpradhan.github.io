var MODIS_LANDCOVER = ui.import && ui.import("MODIS_LANDCOVER", "imageCollection", {
      "id": "MODIS/006/MCD12Q1"
    }) || ee.ImageCollection("MODIS/006/MCD12Q1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                119.36724204923098,
                25.52861487205777
              ],
              [
                119.36724204923098,
                21.96959145833678
              ],
              [
                122.37749595548098,
                21.96959145833678
              ],
              [
                122.37749595548098,
                25.52861487205777
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[119.36724204923098, 25.52861487205777],
          [119.36724204923098, 21.96959145833678],
          [122.37749595548098, 21.96959145833678],
          [122.37749595548098, 25.52861487205777]]], null, false);
var legend = require('users/chiayilin94/module:legend');
// Display a legend explaining the colors assigned to a MODIS land cover
// classification image.
var BAND_NAME = 'LC_Type1';
var image1 = MODIS_LANDCOVER
            .filterDate('2019-01-01', '2019-12-31')
            .median()
            .select(BAND_NAME);
var map1 = ui.Map();
var image2 = MODIS_LANDCOVER
            .filterDate('2001-01-01', '2001-12-31')
            .median()
            .select(BAND_NAME);
var map2 = ui.Map();
// Create the panel for the legend items.
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: '土地覆蓋類型',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0',
  }
});
legendPanel.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legendPanel.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(name, color) {
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// The list of palette colors and class names from the image.
var lc_names = [
  '常綠針葉林', // Evergreen Needleleaf Forests  LC_Type: 1
  '常綠闊葉林', // Evergreen Broadleaf Forests
  '落葉針葉林', // Deciduous Needleleaf Forests
  '落葉闊葉林', // Deciduous Broadleaf Forests
  '混合林', // Mixed Forests
  '封閉灌木叢', // Closed Shrublands  6
  '開放灌木叢', // Open Shrublands
  '多樹草原', // Woody Savannas
  '稀樹草原', // Savannas
  '草原', // Grasslands
  '永久濕地', // Permanent Wetlands  11
  '作物', // Croplands
  '都市和建地', // Urban and Built-up Lands
  '作物和自然植被', // Cropland/Natural Vegetation Mosaics
  '雪和冰', // Permanent Snow and Ice
  '低植被覆蓋地', // Barren  16
  '水體', // Water Bodies
];
var palette = [
  '043708', // 1
  '1d5722',
  '366a3a',
  '507c53',
  '698f6c', // Mixed Forests
  '9e8c36', // 6
  'b29e3d',
  'cbb756',
  'd7c77c',
  'dccf8e', // Grasslands
  '4b86b4', // 11
  'ffdf00',
  'c4cace',
  '86eb03',
  '69fff8',
  'edc9af', // 16
  'ddf3ff',
];
// Common land cover types in Taiwan.
var commonTypes = [1, 2, 8, 9, 11, 12, 13, 14, 16];
// Make legends.
for (var i = 0; i < lc_names.length; i++) {
  // if (commonTypes.indexOf(i+1) > -1 ) {
  //   var row = makeRow(lc_names[i], palette[i]);
  //   legendPanel.add(row);
  // }
  var row = makeRow(lc_names[i], palette[i]);
  legendPanel.add(row);
}
// legendPanel.insert(lc_names.length - discardTypes.length, urbanRow);
legendPanel.add(legend.makeFootnote(
  'Source: MODIS, NASA LP DAAC', 
  'https://lpdaac.usgs.gov/products/mcd12q1v006/')
);
var isLegendCollapsed = true;
var buttonPanel = ui.Panel([
  ui.Button({
  label: '縮小圖例',
  style: {
    margin: '0 0 0 14px',
  },
  onClick: function() {
    isLegendCollapsed = true;
    map2.remove(legendPanel);
    map2.add(expandLegendButton);
  },
  }),
  ui.Button({
    label: '觀看全世界',
    style: {
      margin: '0 0 0 14px',
    },
    onClick: function() {
      map1.setCenter(-16.83, 36.13, 2);
      map2.setCenter(-16.83, 36.13, 2);
    },
  })], 
  ui.Panel.Layout.flow('horizontal'));
legendPanel.add(buttonPanel);
var expandLegendButton = ui.Button({
  label: '打開圖例',
  style: {
    position: 'bottom-right', 
    shown: isLegendCollapsed ? true : true,
    margin: '0',
    padding: '0'
  },
  onClick: function() {
    isLegendCollapsed = false;
    map2.add(legendPanel);
    map2.remove(expandLegendButton);
  },
});
loading.style().set('shown', false);
function addImageToMap(map, image, desc, labelPosition) {
  map.setControlVisibility(false);
  map.addLayer(
    image,
    {min: 1, max: 17, palette: palette, opacity: 1}, 
    'IGBP Land Cover');
  map.setCenter(112.7, 12.66, 4);
  var label = ui.Label(desc);
  var labelPanel =
      ui.Panel({
        widgets: [label], 
        style: {position: labelPosition, padding: '0'}});
  map.add(labelPanel);
  map.setOptions('Custom', {
    'Custom' : [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#ddf3ff"}]}
    ]}
  );
  // Display the land cover type on UI label.
  map.onClick(function(detail) {
    // Remove the old points from map.
    var oldPoint1 = map1.layers().get(1);
    var oldPoint2 = map2.layers().get(1);
    if (oldPoint1) {
      map1.remove(oldPoint1);
    }
    if (oldPoint2) {
      map2.remove(oldPoint2);
    }
    // Display the new clicked point.
    var point = ee.FeatureCollection(
      ee.Geometry.Point([detail.lon, detail.lat]));
    map.addLayer(point.draw({color: 'red', pointRadius: 5}));
    // Update the land cover label.
    var lc_type = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: point,
      scale: 500,
      maxPixels: 1
    }).get(BAND_NAME);
    var lc_name = lc_names[lc_type.getInfo() - 1];
    lc_label.setValue(lc_name);
  });
}
var lc_label = ui.Label({
  value: '點地圖看土地類型',
  style: {position: 'bottom-left'}
});
map1.add(lc_label);
// Add image and label to each map.
addImageToMap(map1, image1, '2019年', 'top-left');
addImageToMap(map2, image2, '2001年', 'top-right');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
  style: {stretch: 'both'}
});
var linker = ui.Map.Linker([map1, map2]);
ui.root.widgets().reset([splitPanel]);
map2.add(expandLegendButton);
// // Pixel count for each land cover type.
// for (var landuse = 1; landuse <= 17; landuse++ ) {
//   var landuseMask = image1.eq(landuse);
//   var maskedLU = image1.mask(landuseMask);
//   var stats = maskedLU.reduceRegion({
//     reducer: ee.Reducer.count(),
//     geometry: geometry,
//     scale: 30,
//     maxPixels: 1e9
//   });
//   print ('LU ' + landuse, stats.get(BAND_NAME));
// }