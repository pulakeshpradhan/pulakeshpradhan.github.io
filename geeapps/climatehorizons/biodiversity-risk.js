/**
 * Introduction: 
 * An APP to examine the three metrics of biodiversity risk under the two senarios: RCP2.6 and RCP8.5.
 * 
 * Updated on: 4/3/2020.
 */
/**
 * Map layer configuration.
 */
// Work directory.
var wd = 'users/climatehorizons/Combined_Rasters/';
// Globe.
var globe = ee.Image(wd + 'globe');
// Land.
var land = ee.Image(wd + 'land');
// Ocean.
var ocean = ee.Image(wd + 'ocean');
// Visualization parameters.
var magma = ["#000004FF", "#07071DFF", "#160F3BFF", "#29115AFF", "#400F73FF", 
  "#56147DFF", "#6B1D81FF", "#802582FF", "#952C80FF", "#AB337CFF", 
  "#C03A76FF", "#D6456CFF", "#E85362FF", "#F4685CFF", "#FA815FFF", 
  "#FD9A6AFF", "#FEB37BFF", "#FECC8FFF", "#FDE4A6FF", "#FCFDBFFF"];
// Set the opacity of displayed layers.
var opa = 0.75;
var visTim = {
  min: 2006,
  max: 2100,
  palette: magma,
  opacity: opa
};
var visMag = {
  min: 0,
  max: 100,
  palette: magma,
  opacity: opa
};
var visAbr = {
  min: 0,
  max: 100,
  palette: magma,
  opacity: opa
};
// Color selection.
var col1 = '#400F73FF';
var col2 = '#AB337CFF';
// Dataset names.
var tim26Name = 'Timing (RCP 2.6)';
var mag26Name = 'Magnitude (RCP 2.6)';
var abr26Name = 'Abruptness (RCP 2.6)';
var tim85Name = 'Timing (RCP 8.5)';
var mag85Name = 'Magnitude (RCP 8.5)';
var abr85Name = 'Abruptness (RCP 8.5)';
// Metric names.
var timName = 'Timing';
var magName = 'Magnitude';
var abrName = 'Abruptness';
//// Layer generation.
// RCP 2.6.
var tim26Lyr = ui.Map.Layer(globe.select('timingRCP26').visualize(visTim))
  .setName(tim26Name + ' -- Globe');
var mag26Lyr = ui.Map.Layer(globe.select('magnitudeRCP26').visualize(visMag))
  .setName(mag26Name + ' -- Globe');
var abr26Lyr = ui.Map.Layer(globe.select('abruptnessRCP26').visualize(visAbr))
  .setName(abr26Name + ' -- Globe');
var tim26landLyr = ui.Map.Layer(land.select('timingRCP26land').visualize(visTim))
  .setName(tim26Name + ' -- Land');
var mag26landLyr = ui.Map.Layer(land.select('magnitudeRCP26land').visualize(visMag))
  .setName(mag26Name + ' -- Land');
var abr26landLyr = ui.Map.Layer(land.select('abruptnessRCP26land').visualize(visAbr))
  .setName(abr26Name + ' -- Land');
var tim26oceanLyr = ui.Map.Layer(ocean.select('timingRCP26ocean').visualize(visTim))
  .setName(tim26Name + ' -- Ocean');
var mag26oceanLyr = ui.Map.Layer(ocean.select('magnitudeRCP26ocean').visualize(visMag))
  .setName(mag26Name + ' -- Ocean');
var abr26oceanLyr = ui.Map.Layer(ocean.select('abruptnessRCP26ocean').visualize(visAbr))
  .setName(abr26Name + ' -- Ocean');
// RCP 8.5.
var tim85Lyr = ui.Map.Layer(globe.select('timingRCP85').visualize(visTim))
  .setName(tim85Name + ' -- Globe');
var mag85Lyr = ui.Map.Layer(globe.select('magnitudeRCP85').visualize(visMag))
  .setName(mag85Name + ' -- Globe');
var abr85Lyr = ui.Map.Layer(globe.select('abruptnessRCP85').visualize(visAbr))
  .setName(abr85Name + ' -- Globe');
var tim85landLyr = ui.Map.Layer(land.select('timingRCP85land').visualize(visTim))
  .setName(tim85Name + ' -- Land');
var mag85landLyr = ui.Map.Layer(land.select('magnitudeRCP85land').visualize(visMag))
  .setName(mag85Name + ' -- Land');
var abr85landLyr = ui.Map.Layer(land.select('abruptnessRCP85land').visualize(visAbr))
  .setName(abr85Name + ' -- Land');
var tim85oceanLyr = ui.Map.Layer(ocean.select('timingRCP85ocean').visualize(visTim))
  .setName(tim85Name + ' -- Ocean');
var mag85oceanLyr = ui.Map.Layer(ocean.select('magnitudeRCP85ocean').visualize(visMag))
  .setName(mag85Name + ' -- Ocean');
var abr85oceanLyr = ui.Map.Layer(ocean.select('abruptnessRCP85ocean').visualize(visAbr))
  .setName(abr85Name + ' -- Ocean');
// Create the main map and set the default layer list.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
/**
 * Style setup.
 */
// Major title.
var majorTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '8px 0px 4px 0px',
  color: col1,
  stretch: 'horizontal'
};
// Map panel titles.
var mapPanelTitleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left',
  color: col1
};
// Inspector panel titles.
var inspectorPanelTitleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left',
  padding: '4px',
  color: col1
};
// Introduction text.
var introTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left',
  padding: '4px',
  color: col2
};
// Button label.
var buttonLabelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left',
  color: col2
};
// Button.
var buttonStyle = {
  stretch: 'horizontal'
};
// Legend panel.
var legendPanelStyle = {
  position: 'bottom-left'
};
// Define the style of legend labels.
var legendLabelStyle = {margin: '4px 0px', textAlign: 'center', stretch: 'horizontal'};
// Shift the first label of the timing legend leftward to make its first interval larger.
var legendLabelStyleTimFirst = {margin: '4px 0px', textAlign: 'left', stretch: 'horizontal'};
/**
 * Legend setup.
 */
// Function to create a color bar.
function createColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: magma,
    },
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
}
//// Create color bars for the three metrics under the two scenarios.
// RCP 2.6.
var colorBarTim1 = createColorBar();
var colorBarMag1 = createColorBar();
var colorBarAbr1 = createColorBar();
// RCP 8.5.
var colorBarTim2 = createColorBar();
var colorBarMag2 = createColorBar();
var colorBarAbr2 = createColorBar();
//// Create a list of legend labels for each metric.
var labelListTim = [2006, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
var labelListMag = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var labelListAbr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
//// Create legend labels for the each metric.
// Timing. 
var legendLabelsTim1 = ui.Panel(ui.Label(labelListTim[0], legendLabelStyleTimFirst))
  .setLayout(ui.Panel.Layout.flow('horizontal'));
var legendLabelsTim2 = ui.Panel(ui.Label(labelListTim[0], legendLabelStyleTimFirst))
  .setLayout(ui.Panel.Layout.flow('horizontal'));
for (var i = 1; i <= 9; i ++) { // Add all labels except the first one.
  legendLabelsTim1.add(ui.Label(labelListTim[i], legendLabelStyle));
  legendLabelsTim2.add(ui.Label(labelListTim[i], legendLabelStyle));
}
// Magnitude.
var legendLabelsMag1 = ui.Panel().setLayout(ui.Panel.Layout.flow('horizontal'));
var legendLabelsMag2 = ui.Panel().setLayout(ui.Panel.Layout.flow('horizontal'));
for (var i = 0; i <= 10; i ++) {
  legendLabelsMag1.add(ui.Label(labelListMag[i], legendLabelStyle));
  legendLabelsMag2.add(ui.Label(labelListMag[i], legendLabelStyle));
}
// Abruptness.
var legendLabelsAbr1 = ui.Panel().setLayout(ui.Panel.Layout.flow('horizontal'));
var legendLabelsAbr2 = ui.Panel().setLayout(ui.Panel.Layout.flow('horizontal'));
for (var i = 0; i <= 10; i ++) {
  legendLabelsAbr1.add(ui.Label(labelListAbr[i], legendLabelStyle));
  legendLabelsAbr2.add(ui.Label(labelListAbr[i], legendLabelStyle));
}
// A list of legend titles.
var legendTitles = [
  'Magnitude (% species exposed) -- RCP 2.6',
  'Abruptness (% of species exposure times in decade of highest exposure) -- RCP 2.6',
  'Timing (median year when species are exposed) -- RCP 2.6',
  'Magnitude (% species exposed) -- RCP 8.5',
  'Abruptness (% of species exposure times in decade of highest exposure) -- RCP 8.5',
  'Timing (median year when species are exposed) -- RCP 8.5',
];
// Function to create a legend.
function createLegend(index, colorBar, labels) {
  var legendTitle = ui.Label({
    value: legendTitles[index], 
    style: mapPanelTitleStyle
  });
  var legend = ui.Panel({
    widgets: [legendTitle, colorBar, labels], 
    layout: ui.Panel.Layout.flow('vertical'),
    style: legendPanelStyle
  });
  return legend;
}
// Create a panel to show the legend (use magnitude for the RCP 8.5 scenario for the land as the default layer.).
var legendPanel = createLegend(3, colorBarMag1, legendLabelsMag1);
/**
 * Button setup.
 */
function createButtons(layer1, layer2, layer3, index, colorBar, labels) {
  var newLegend = createLegend(index, colorBar, labels);
  // Create a button for each domain.
  var button1 = ui.Button({
    label: 'Globe',
    onClick: function() {
      layers.set(0, layer1);
      legendPanel.clear();
      legendPanel.add(newLegend);
    },
    style: buttonStyle
  });
  var button2 = ui.Button({
    label: 'Land',
    onClick: function() {
      layers.set(0, layer2);
      legendPanel.clear();
      legendPanel.add(newLegend);
    },
    style: buttonStyle
  });
  var button3 = ui.Button({
    label: 'Ocean',
    onClick: function() {
      layers.set(0, layer3);
      legendPanel.clear();
      legendPanel.add(newLegend);
    },
    style: buttonStyle
  });
  // Create a panel for all the buttons.
  var buttonPanel = ui.Panel({
    widgets: [button1, button2, button3], 
    layout: ui.Panel.Layout.flow('horizontal')
  });
  return buttonPanel;
}
/**
 * Thumbnail setup.
 */
// Create a thumbnail for each metric based on locally generated thumbnails.
var thumbnailTim = ui.Chart(
  [
    ['<img src=https://i.ibb.co/zV04vwN/Timing-thumbnail.png height=150px>'], // width=100% height=100%
  ],
  'Table', {allowHtml: true});
var thumbnailMag = ui.Chart(
  [
    ['<img src=https://i.ibb.co/rdfbdRk/Magnitude-thumbnail.png height=150px>'],
  ],
  'Table', {allowHtml: true});
var thumbnailAbr = ui.Chart(
  [
    ['<img src=https://i.ibb.co/1R0RrFL/Abruptness-thumbnail.png height=150px>'],
  ],
  'Table', {allowHtml: true});
// Function to create a thumbnail panel for each metric.
function createThumbnail(caption, thumbnail, layerRCP85_1, layerRCP85_2, layerRCP85_3, index85,
  layerRCP26_1, layerRCP26_2, layerRCP26_3, index26, colorBar1, labels1, colorBar2, labels2) {
  // Create a thumbnail title.
  var thumbnailTitle = ui.Label({
    value: caption,
    style: inspectorPanelTitleStyle
  });
  // Create three buttons for each scenario.
  var buttonsRCP85 = createButtons(layerRCP85_1, layerRCP85_2, layerRCP85_3, index85, colorBar1, labels1);
  var buttonsRCP26 = createButtons(layerRCP26_1, layerRCP26_2, layerRCP26_3, index26, colorBar2, labels2);
  // Create a label for each set of buttons.
  var buttons85label = ui.Label({
    value: 'RCP 8.5 scenario:',
    style: buttonLabelStyle
  });
  var buttons26label = ui.Label({
    value: 'RCP 2.6 scenario:',
    style: buttonLabelStyle
  });
  // Combine all the widgets.
  var thumbnailPanel = ui.Panel({
    widgets: [thumbnailTitle, thumbnail, buttons85label, buttonsRCP85, buttons26label, buttonsRCP26],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      margin: "4px 8px",
      border: '2px solid ' + col2}
  });
  return thumbnailPanel;
}
/**
 * Map setup.
 */
// Create a dark map style.
var darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
// Function to show the sample point on the map.
function showPointOnMap(point) {
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Sample point');
  // Add the point to the last layer of the map.
  layers.set(1, dot);
}
/**
 * Extract local metrics of biodiversity risk.
 */
// Function to extract local metrics at the sample point.
function extractResult(point) {
  var result = globe.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 100000, 
    crs: 'EPSG:4326'
  });
  return result;
}
// Function to show the label of each extracted result.
function showResultLabel(extracted, datasetName, bandName) {
  var label = ui.Label({
    value: datasetName + ':' ,
    style: {
      fontWeight: 'bold',
      color: col2
    }
  });
  var extractedValue = extracted.get(bandName).getInfo();
  var value;
  if (extractedValue === null && bandName === 'timingRCP26' || 
    extractedValue === null && bandName === 'timingRCP85') {
    value = ui.Label({
      value: "Not before 2100",
      style: {
        fontWeight: 'bold'
      }
    });
  } else if (extractedValue === null) {
    value = ui.Label({
      value: 0,
      style: {
        fontWeight: 'bold'
      }
    });
  } else {
    value = ui.Label({
      value: extractedValue.toFixed(0), // Rounding up the number to an integer.
      style: {
        fontWeight: 'bold'
      }
    });
  }
  return ui.Panel({
    widgets: [label, value],
    layout: ui.Panel.Layout.flow('horizontal')
  });
}
// Function to make a panel displaying local metrics.
function makeResultPanel(point) {
  var captionLabel = ui.Label({
    value: 'Biodiversity risk at the sample point',
    style: mapPanelTitleStyle
  });
  var result = extractResult(point);
  // RCP 8.5.
  var mag85Label = showResultLabel(result, mag85Name, "magnitudeRCP85");
  var abr85Label = showResultLabel(result, abr85Name, "abruptnessRCP85");
  var tim85Label = showResultLabel(result, tim85Name, "timingRCP85");
  // RCP 2.6.
  var mag26Label = showResultLabel(result, mag26Name, "magnitudeRCP26");
  var abr26Label = showResultLabel(result, abr26Name, "abruptnessRCP26");
  var tim26Label = showResultLabel(result, tim26Name, "timingRCP26");
  return ui.Panel({
    widgets: [captionLabel, 
      mag85Label, abr85Label, tim85Label, 
      mag26Label, abr26Label, tim26Label],
    layout: ui.Panel.Layout.flow('vertical')
  });
}
/** 
 * Initialize the widgets. 
 */
function init() {
  // Create an inspector panel to hold title, introduction text, and legend components.
  var inspectorPanel = ui.Panel({
    style: {
      width: '30%',
      border: '3px solid ' + col1,
    }
  });
  // Replace the root with a SplitPanel that contains the inspector and map.
  var splitPanel = ui.SplitPanel({
    firstPanel: inspectorPanel,
    secondPanel: mapPanel,
  });
  ui.root.clear();
  ui.root.add(splitPanel);
  var title = ui.Panel({
    widgets: ui.Label('Biodiversity risk from climate change', majorTitleStyle), 
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var instruction = ui.Panel({
    widgets: [
      ui.Label('(1) Please add datasets of interest to the map.'),
      ui.Label('(2) Click a point on the map to see local metrics of biodiversity risk.'),
    ],
    style: introTextStyle
  });
  // Create hyperlinks for further information.
  var hyperLink0 = ui.Label(
    'Trisos, Merow & Pigot 2020', {},
    'https://www.nature.com/articles/s41586-020-2189-9');
  var hyperLink1 = ui.Label(
    'here', {},
    'https://climaterisklab.com/');
  var hyperLink2 = ui.Label(
    'here', {},
    'https://alexpigot.weebly.com/');
  var hyperLink3 = ui.Label(
    'here', {},
    'https://cmerow.github.io/');
  var hyperLink4 = ui.Label(
    'Chenyang Wei', {},
    'http://www.acsu.buffalo.edu/~cwei5/');
  // Introduction text.
  var introduction = ui.Panel({
    widgets: [
      ui.Label('These maps show the % of native species at each location projected ' +
        'to be exposed to potentially dangerous climate conditions this century.'),
      ui.Label('They also show when and how abruptly this exposure is projected to occur.'),
      ui.Label('Projections are for RCP 2.6, a strong greenhouse gas reduction scenario ' +
        'limiting global warming below 2°C by 2100. ' +
        'And for RCP 8.5, a high emissions scenario with extreme warming >4°C by 2100.'),
      ui.Label('Species included are mammals, birds, amphibians, reptiles, ' +
        'marine fish, corals, cephalopods and seagrasses.'),
      ui.Label('Potentially dangerous climate conditions are defined as the year ' +
        'when mean annual temperatures at a location are projected to exceed ' +
        'the warmest temperature at which a species has been observed ' +
        'across its geographic range during recent history (1850-2005).'),
      ui.Label('Evidence from lab and field studies suggests this onset ' +
        'of unprecedented climate can result in local extinctions.'),
      ui.Label('Abruptness was only calculated when at least 5 species were exposed.'),
      ui.Panel([ui.Label('For further details see'), hyperLink0], 
        ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Information on further research'), hyperLink1,
        ui.Label(','), hyperLink2,
        ui.Label('and'), hyperLink3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Website built by'), hyperLink4], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {padding: '2px'}
  });
  inspectorPanel.add(title);
  inspectorPanel.add(instruction);
  inspectorPanel.add(introduction);
  // Magnitude.
  inspectorPanel.add(createThumbnail(magName, thumbnailMag, mag85Lyr, mag85landLyr, mag85oceanLyr, 3, 
    mag26Lyr, mag26landLyr, mag26oceanLyr, 0, colorBarMag1, legendLabelsMag1, colorBarMag2, legendLabelsMag2));
  // Abruptness.
  inspectorPanel.add(createThumbnail(abrName, thumbnailAbr, abr85Lyr, abr85landLyr, abr85oceanLyr, 4, 
    abr26Lyr, abr26landLyr, abr26oceanLyr, 1, colorBarAbr1, legendLabelsAbr1, colorBarAbr2, legendLabelsAbr2));
  // Timing.
  inspectorPanel.add(createThumbnail(timName, thumbnailTim, tim85Lyr, tim85landLyr, tim85oceanLyr, 5, 
    tim26Lyr, tim26landLyr, tim26oceanLyr, 2, colorBarTim1, legendLabelsTim1, colorBarTim2, legendLabelsTim2));
  //// Initialize the map panel.
  // Configure the map.
  mapPanel.setControlVisibility(false);
  mapPanel.setControlVisibility({layerList: true, scaleControl: true, zoomControl: true});
  mapPanel.style().set({cursor: 'crosshair'});
  mapPanel.setOptions('mapStyle', {mapStyle: darkMapStyle});
  // Load magnitude for the RCP 8.5 scenario for the land as the default layer.
  layers.set(0, mag85Lyr);
  // Initialize with a default sample point.
  var pt = ee.Geometry.Point(0, 0);
  mapPanel.centerObject(pt, 2);
  // Display the default sample point.
  showPointOnMap(pt);
  // Create a panel to show the extracted local metrics.
  var resultPanel = ui.Panel({
    style: {
      position: 'bottom-right',
      width: '280px'
    }
  });
  // Extract local metrics.
  resultPanel.add(makeResultPanel(pt));
  // Add the result and legend panels to the default map.
  mapPanel.add(resultPanel);
  mapPanel.add(legendPanel);
  // Display the clicked sample point and extract its spectral mixture information.
  mapPanel.onClick(function(coordinates) {
    var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
    showPointOnMap(point);
    resultPanel.clear();
    resultPanel.add(makeResultPanel(point));
  });
}
// Call the 'init' function.
init();