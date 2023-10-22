var esa = ui.import && ui.import("esa", "imageCollection", {
      "id": "ESA/WorldCover/v200"
    }) || ee.ImageCollection("ESA/WorldCover/v200"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/LearningIIT/Hathni_okhla_buffer5km"
    }) || ee.FeatureCollection("users/LearningIIT/Hathni_okhla_buffer5km"),
    green = ui.import && ui.import("green", "table", {
      "id": "users/LearningIIT/Hathni_okla_GreenBelt"
    }) || ee.FeatureCollection("users/LearningIIT/Hathni_okla_GreenBelt");
// Remove icons. 
var iconChange = [
  { 
    // Change map saturation.
    stylers: [{gamma: 0.2}]
  },
  {
    // Change label properties.
    elementType: 'labels',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road properties.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'on'}]
  },
  {
    // Change icon properties.
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    // Change POI options.
    featureType: 'poi',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{visibility: 'off'}]
  }
];
// Enhanced road network visualization.
var roadNetwork = [
  {stylers: [{saturation: -100}]}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{color: '#000055'}, {weight: 2.5}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#000000'}, {weight: 2}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#FF0000'}, {weight: 1.8}]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{color: '#00FF55'}, {weight: 1.5}]
  }
];
var styling = {color: 'green', fillColor: '00000000', width: 3};
Map.setOptions(
    'roadNetwork', {iconChange: iconChange, roadNetwork: roadNetwork});
Map.addLayer(roi,{},"ROI")
var dataset = ee.ImageCollection('ESA/WorldCover/v200').first();
Export.image.toDrive({
image: dataset.clip(roi),
description:"ESA_2021_roi",
folder:'GEE',
scale: 10,
crs:'EPSG:32643',
region:roi,
maxPixels:3e10
});
var visualization = {
  bands: ['remapped'],
};
Map.centerObject(roi,10);
var dataset=dataset.remap([10,20,30,40,50,60,70,80,90,95,100],[1,2,3,4,5,6,7,8,9,10,11])
Map.addLayer(dataset.clip(roi), {palette:['#006400','#ffbb22','#ffff4c','#f096ff','#fa0000','#b4b4b4','#f0f0f0','#0064c8','#0096a0','#00cf75','#fae6a0']}, "Landcover");
Map.addLayer(green.style(styling),{},"Grenbelt")
var areaChart= ui.Chart.image.byClass({ 
  image: ee.Image.pixelArea().divide(1000000).addBands(dataset.clip(roi)),
  classBand: 'remapped', 
  classLabels:
["None",
"Tree cover",
"Shrubland",
"Grassland",
"Cropland",
"Built-up",
"Bare / sparse vegetation",
"Snow and ice",
"Permanent water bodies",
"Herbaceous wetland",
"Mangroves",
"Moss and lichen"
  ],
  region: roi,
  scale: 30,
  reducer: ee.Reducer.sum(),
}).setOptions({
  hAxis: {title: 'Landcover Classes'},
  vAxis: {title: 'Area sq. km.'},
  title: 'Area by class of Year===',
series: {
  0: { color: '#006400' },
  1: { color: '#ffbb22' },
  2: { color: '#ffff4c' },
  3: { color: '#f096ff' },
  4: { color: '#fa0000' },
  5: { color: '#b4b4b4' },
  6: { color: '#f0f0f0' },
  7: { color: '#0064c8' },
  8: { color: '#0096a0' },
  9: { color: '#00cf75' },
 10: { color: '#fae6a0' }
}
});
//print('Area Chart For the Year==',areaChart);
//Map.add(areaChart)
// This is palette has '#000000' for value 3 and 6.
var palette = [
    "#006400",
"#ffbb22",
'#000000',
"#ffff4c",
"#f096ff",
'#000000',
"#fa0000",
"#b4b4b4",
"#f0f0f0",
"#0064c8",
"#0096a0",
"#00cf75",
"#fae6a0",
  ];
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var dict = {
  "names": [
"Tree cover",
"Shrubland",
"Grassland",
"Cropland",
"Built-up",
"Bare sparse vegetation",
"Snow and ice",
"Permanent water bodies",
"Herbaceous wetland",
"Mangroves",
"Moss and lichen"
  ],
  "colors": [
"#006400",
"#ffbb22",
"#ffff4c",
"#f096ff",
"#fa0000",
"#b4b4b4",
"#f0f0f0",
"#0064c8",
"#0096a0",
"#00cf75",
"#fae6a0",
  ]};
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
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
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  Map.add(panel);
  var mainPanel = ui.Panel({
  style: {width: '500px', position:  'top-right'}
});
Map.add(mainPanel);
mainPanel.add(areaChart)
}
// Add the legend to the map
addCategoricalLegend(legend, dict, '10m Global Land Cover: Impact Observatory');