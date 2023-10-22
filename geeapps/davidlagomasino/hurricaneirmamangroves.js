var irmaImages_surge = ui.import && ui.import("irmaImages_surge", "image", {
      "id": "users/dailja21/IrmaApp/irmaImages_surge"
    }) || ee.Image("users/dailja21/IrmaApp/irmaImages_surge"),
    maxSurgev3 = ui.import && ui.import("maxSurgev3", "image", {
      "id": "users/dailja21/IrmaApp/maxSurgev3"
    }) || ee.Image("users/dailja21/IrmaApp/maxSurgev3"),
    irmaTrackv2 = ui.import && ui.import("irmaTrackv2", "image", {
      "id": "users/dailja21/IrmaApp/irmaTrackv2"
    }) || ee.Image("users/dailja21/IrmaApp/irmaTrackv2");
var Dark = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
// Map.setOptions('mapStyle', {mapStyle: mapStyle});
var mangroveExtent2017 = ee.Image('users/davidlagomasino/Everglades/SoFlorida_MangroveExtent_RandomForest_2017_V1_DL')
var hurrIrmaMaxStSurge_SFlordia = ee.FeatureCollection('users/davidlagomasino/Everglades/HurricaneIrma_Max_Elevation_Surge')
var hourlyWindSpeed = ee.ImageCollection('users/davidlagomasino/Hurricane_Irma/HourlyWindSpeed')
var hurrIrmaMaxStSurge  = ee.FeatureCollection('users/davidlagomasino/Hurricane_Irma/maxelev')
var mangResilience = ee.Image('projects/mangrovescience/Florida/Hurricane_Irma/allResilience_V1')
var NDVIAnomaly = ee.Image('projects/mangrovescience/Florida/NDVI_anomaly_Irma_V0')
var canopyHeightLoss = ee.Image('projects/mangrovescience/Florida/Hurricane_Irma/chmLossBins_HotSpots_V0')
var fVegCoverLoss = ee.Image('projects/mangrovescience/Florida/Hurricane_Irma/fCover_diff_V0')
var estRecovTime = ee.Image('projects/mangrovescience/Florida/Hurricane_Irma/recover_Time_V1')
var maxWindSpeed = hourlyWindSpeed.max()//ee.Image('projects/mangrovescience/Florida/Hurricane_Irma/maxWinds_V0') //1000m
var irma = ee.FeatureCollection('users/davidlagomasino/Everglades/Irma_track')
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var irmatracks = empty.paint({
  featureCollection: irma,
  color: 'SS',
  width: 10
});
// // Max surge south florida reduce to image
// var minImage = hurrIrmaMaxStSurge_SFlordia.reduceToImage(['min_ft'], ee.Reducer.min()).rename('min_ft');
// // Map.addLayer(minImage, {}, 'min');
// var maxImage = hurrIrmaMaxStSurge_SFlordia.reduceToImage(['max_ft'], ee.Reducer.max()).rename('max_ft');
// // Map.addLayer(maxImage, {}, 'max');
// var maxSurgeSouthFl = minImage.addBands(maxImage);
// //Max surge reduce to image
// var minImage1 = hurrIrmaMaxStSurge.reduceToImage(['min_ft'], ee.Reducer.min()).rename('min_ft');
// // Map.addLayer(minImage1, {}, 'min');
// var maxImage1 = hurrIrmaMaxStSurge.reduceToImage(['max_ft'], ee.Reducer.max()).rename('max_ft')
// // Map.addLayer(maxImage, {}, 'max');
// var maxSurge = minImage1.addBands(maxImage1)
// // Map.addLayer(maxSurgeSouth, {}, 'tota')
// // irma track reduce to image
// var ssTrackImage = hurrIrmaTrack.reduceToImage(['SS'], ee.Reducer.first()).rename('SS');
// // Map.addLayer(ssTrackImage, {}, 'ss');
// Create an empty image
var empty = ee.Image().byte();
// add all layers as bands on the fly
var irmaImages = NDVIAnomaly.rename('NDVI')
                // .addBands(maxWindSpeed.rename('MaxWindSpeed'))
                .addBands(estRecovTime.rename('recoveryTime'))
                .addBands(fVegCoverLoss.rename('vegCoverLoss'))
                .addBands(canopyHeightLoss.selfMask().rename('CanopyHeightLoss'))
                .addBands(mangResilience.rename('MangResilience'))
                .addBands(mangroveExtent2017.rename('mangExtent2017').updateMask(mangroveExtent2017.eq(1)))
                // .addBands(maxSurgev3.rename('maxSurgev3').multiply(0.3048))
                // .addBands(irmaTrackv2.rename('irmaTrackv2'))
                .addBands(empty.rename('empty'));
var irmaImages2 = //NDVIAnomaly.rename('NDVI')
                maxWindSpeed.rename('MaxWindSpeed').updateMask(maxWindSpeed.gte(20))
                // .addBands(estRecovTime.rename('recoveryTime'))
                // .addBands(fVegCoverLoss.rename('vegCoverLoss'))
                // .addBands(canopyHeightLoss.selfMask().rename('CanopyHeightLoss'))
                // .addBands(mangResilience.rename('MangResilience'))
                // .addBands(mangroveExtent2017.rename('mangExtent2017').updateMask(mangroveExtent2017.eq(1)))
                .addBands(maxSurgev3.rename('maxSurgev3').multiply(0.3048))
                .addBands(irmatracks.rename('irmaTrackv2'))//.focal_max(1000, 'circle','meters'))
                .addBands(empty.rename('empty'));
// Export.image.toAsset({
//   image: irmaImages, 
//   description: "Merged_Image", 
//   assetId: "IrmaApp/" + 'AppimagesMergedV3'
// });
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
//////TO DO //////////
// [ ] Fix/adjust all min/max layers
// [ ] Estimated recover time - don't see dark color in legend - maybe diff. min/max layers will fix
// [ ] cant get max wind speed to 30 m
// [ ] can't remove mangrove extent background
// [ ] can't get irma track to one band without losing part of the track around miami and eastwards
// [ ] mangrove resilience doesn't look great - for some reason intermediate and low aren't showing
// [ ] do you want the hourly wind speed? - if so that will need to be a separate dropdown box
// [ ] add link to article
// [ ] can probably do 3 dropdowns if you want - what layers do you want in which categories - what are category names?
// [ ] add dark mode
/////******* Min/max layers need adjustment ****************////////////
/*
 * Configure layers and locations
 */
// var appImagesMerged = ee.Image('users/dailja21/IrmaApp/AppimagesMerged');
var layerProperties = {
  'Choose Mangrove Response Layer': {/////////
    name: 'empty',
    visParams: {},
    legend: [
    ],
    defaultVisibility: true
  },
  'Mangrove Resilience': {
    name: 'MangResilience',
    visParams: {min: 4, max: 1, palette:['#edf8b1','#7fcdbb','#2c7fb8']},
    legend: [
      {'Low': '#2c7fb8'}, {'Intermediate': '#7fcdbb'}, {'High': '#edf8b1'},
      ],
    defaultVisibility: true
  },
  'NDVI Anomaly': {/////////
    name: 'NDVI',
    visParams: {min: -0.4, max: 0.4, palette: ['red','black', 'green']},
    legend: [
      {'-0.4': 'red'}, {'no change': 'black'}, {'0.4': 'green'}
    ],
    defaultVisibility: false
  },
  'Canopy Height Loss': {/////
    name: 'CanopyHeightLoss',
    visParams: {min: 1, max: 4, palette: ['green', 'lightgreen', 'goldenrod', 'brown']},
    legend:
        [{'<1 m': 'green'}, {'1-2 m': 'lightgreen'}, {'2-3 m': 'goldenrod'}, {'>4 m': 'brown'}],
    defaultVisibility: false
  },
  'Frational Vegetation Cover Loss': {///////
    name: 'vegCoverLoss',
    visParams: {min: 0, max: 2, palette: ['#fde0dd','#fa9fb5','#c51b8a']},
    legend: [
      {'0-20%': '#fde0dd'}, {'20-40%': '#fa9fb5'}, {'40-60%%': '#c51b8a'}],
    defaultVisibility: false
  },
  'Estimated Recovery Time': {/////// don't see dark color
    name: 'recoveryTime',
    visParams: {min: 0, max: 5, palette: ['#f7fcb9','#addd8e','#31a354']},
    legend: [
      {'<1 year': '#f7fcb9'}, {'1-5 years': '#addd8e'}, {'>5 years': '#31a354'},
    ],
    defaultVisibility: false
  },
  // 'Max Wind Speed': {///change to 30m
  //   name: 'MaxWindSpeed',
  //   visParams: {min: 23, max: 52, palette: []},
  //   legend: [
  //     {'75-100%': '#00ff00'}, {'50-75%': '#00aa00'}, {'25-50%': '#005500'},
  //     {'0-25%': '#000000'}, {'Water or no data': '#404040'}
  //   ],
  //   defaultVisibility: false
  // },
  // 'Mangrove Extent 2017': {
  //   name: 'mangExtent2017',
  //   visParams: {min: 1, max: 2, palette: ['black', 'green']},
  //   legend: [
  //     {'75-100%': '#00ff00'}, {'50-75%': '#00aa00'}, {'25-50%': '#005500'},
  //     {'0-25%': '#000000'}, {'Water or no data': '#404040'}
  //   ],
  //   defaultVisibility: false
  // },
  // 'Irma Track': {
  //   name: 'irmaTrackv2',
  //   visParams: {min: 0, max: 5, palette: ['blue', 'red']},
  //   legend: [],
  //   defaultVisibility: false
  // },
  // 'Max Surge (m)': { ///maxSurgev3 works when just displaying as a layer but not here for some reason
  //   name: 'maxSurgev3',
  //   visParams: {min: 0.0, max: 3, palette: ['azure', 'CornflowerBlue', 'blue', 'darkblue']},
  //   legend: [
  //     {'0.0 m': 'azure'}, {'0.75 m': 'CornflowerBlue'}, {'1.5 m': 'blue'},
  //     {'2.75 m': 'darkblue'}
  //   ],
  //   defaultVisibility: false
  // },
};
var layerProperties2 = {
  'Choose Hurricane Layer': {/////////
    name: 'empty',
    visParams: {},
    legend: [
    ],
    defaultVisibility: true
  },
   'Max Surge (m)': { ///maxSurgev3 works when just displaying as a layer but not here for some reason
    name: 'maxSurgev3',
    visParams: {min: 0.0, max: 3, palette: ['azure', 'CornflowerBlue', 'blue', 'darkblue']},
    legend: [
      {'0.0 m': 'azure'}, {'0.75 m': 'CornflowerBlue'}, {'1.5 m': 'blue'},
      {'2.75 m': 'darkblue'}
    ],
    defaultVisibility: true
  },
  'Max Wind Speed': {
    name: 'MaxWindSpeed',
    visParams: {min: 20, max: 52, palette: ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15']},
    legend: [
      {'20-26 m/sec': '#fee5d9'}, {'27-33 m/sec': '#fcae91'}, {'33-39 m/sec': '#fb6a4a'},
      {'40-46 m/sec': '#de2d26'}, {'47-53': '#a50f15'}
    ],
    defaultVisibility: false
  },
  // 'Mangrove Resilience': {
  //   name: 'MangResilience',
  //   visParams: {min: 0, max: 3},
  //   legend: [
  //     {'75-100%': '#00ff00'}, {'50-75%': '#00aa00'}, {'25-50%': '#005500'},
  //     {'0-25%': '#000000'}, {'Water or no data': '#404040'}
  //   ],
  //   defaultVisibility: false
  // },
    'Irma Track': {
    name: 'irmaTrackv2',
    visParams: {min: 0, max: 5, palette: ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']},
    legend: [{'TS': '#ffffb2'},{'Cat 1': '#fed976'},{'Cat 2': '#feb24c'}, {'Cat 3': '#fd8d3c'}, {'Cat 4': '#f03b20'},{'Cat 5': '#bd0026'}],
    defaultVisibility: false
  },
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Ten Thousand Islands': {lon: -81.49766011642257, lat: 25.854681569972556, zoom: 11},
  'Cape Sable/Flamingo': {lon: -81.09998351203226, lat: 25.194268533538274, zoom: 11},
  'Gopher Key': {lon: -81.24225780811771, lat: 25.615598340376405, zoom: 11}
};
/*
 * Map panel configuration
 */
// Create the left map, and have it display layer 0.
var mapPanel = ui.Map();
mapPanel.setControlVisibility(false).setOptions('Dark', {Dark: Dark});
// var mapPanel = addLayerSelector(mapPanel, 0, 'top-left');
// Create the right map, and have it display layer 1.
var mapPanel2 = ui.Map();
mapPanel2.setControlVisibility(false).setOptions('Dark', {Dark: Dark});
// var mapPanel2 = addLayerSelector(mapPanel2, 1, 'top-right');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: mapPanel2,
  secondPanel: mapPanel,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([mapPanel, mapPanel2]);
// leftMap.setCenter(96.7846, 17.6623, 12);
// Now let's do some overall layout.
// Create a map panel.
// var mapPanel = ui.Map();
// var mapPanel2 = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Cape Sable/Flamingo'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
// ui.root.widgets().reset([mapPanel]);
// ui.root.widgets().reset([splitPanel]);
// ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = irmaImages.select(layer.name).visualize(layer.visParams);
  // var masked = addZeroAndWaterMask(image, appImagesMerged.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
for (var key2 in layerProperties2) {
  var layer2 = layerProperties2[key2];
  var image2 = irmaImages2.select(layer2.name).visualize(layer2.visParams);
  // var masked = addZeroAndWaterMask(image, appImagesMerged.select(layer.name));
  mapPanel2.add(ui.Map.Layer(image2, {}, key2, layer2.defaultVisibility));
}
// print(key2)
// // Draws black and gray overlays for nodata/water/zero values.
// function addZeroAndWaterMask(visualized, original) {
//   // Places where there is nodata or water are drawn in gray.
//   var water =
//       hansen.select('datamask').neq(1).selfMask().visualize({palette: 'gray'});
//   // Places where the underlying value is zero are drawn in black.
//   var zero = original.eq(0).selfMask().visualize({palette: 'black'});
//   // Stack the images, with the gray on top, black next, and the original below.
//   return ee.ImageCollection([visualized, zero, water]).mosaic();
// }
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Storm surge and ponding explain mangrove dieback in southwest Florida following Hurricane Irma', {fontSize: '24px', color: 'black'});
var text = ui.Label(
    'In September 2017, Hurricane Irma made landfall in South Florida with winds in excess of 115 kph and storm surge as high as 3 meters. Mangrove forests along the southwest coast experienced the full strength of the storm. The combination of powerful winds and high storm surge altered the physical structure and threatens the long-term stability of mangrove ecosystems. We combined airborne and satellite remote sensing data to estimate mangrove damage and recovery in the year following Hurricane Irma. Lidar data from NASA Goddard’s Lidar, Hyperspectral, and Thermal (G-LiHT) Airborne Imager collected before (April 2017) and after (December 2017) the storm provided high-resolution estimates vertical changes in vegetation structure. We used time series of Landsat satellite data to track the recovery of coastal ecosystems that suffered differing degrees of structural damage, exposure to maximum hurricane winds,storm surge, differences in mangrove species, and forest elevation. Together, these data provided an unprecedented look at the spatial and temporal patterns of mangrove damage and recovery following a major hurricane.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '350px'});
ui.root.widgets().add(toolPanel);
// // Create a panel to hold the chart.
// // Create a panel with vertical flow layout.
// var panel = ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical'),
//   style: {width: '300px'}
// });
// // Add a bunch of buttons.
// for (var i=0; i<30; i++) {
//   panel.add(ui.Button({label: 'Button ' + i, style: {stretch: 'horizontal'}}));
// }
// // ui.root.clear();
// ui.root.add(panel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'See full article in Nature Communications: Lagomasino et al., 2021', {},
    'https://www.nature.com/articles/s41467-021-24253-y');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
var spacer = ui.Panel([
  ui.Label({
    value: '_____________________________________________________',
    style: {fontWeight: 'bold',  color: 'black'},
  })
]);
toolPanel.add(linkPanel)
          .add(spacer);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
var selectItems2 = Object.keys(layerProperties2);
print(selectItems)
print(selectItems2)
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[1],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
var layerSelect2 = ui.Select({
  items: selectItems2,
  value: selectItems2[1],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel2.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend2(layerProperties2[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('View Mangrove and Cyclone Layers', {'font-size': '18px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '12px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Mangrove Responses - Right Panel',
    {fontWeight: 'bold', fontSize: '12px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define a panel for the legend and give it a tile.
var legendPanel2 = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '12px', margin: '0 0 0 8px', padding: '0'}
});
var legendTitle2 = ui.Label(
    'Storm Variables - Left Panel',
    {fontWeight: 'bold', fontSize: '12px', margin: '0 0 4px 0', padding: '0'});
legendPanel2.add(legendTitle2);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
var keyPanel2 = ui.Panel();
legendPanel2.add(keyPanel2);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity - Right Panel',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
function setLegend2(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel2.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel2.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
setLegend2(layerProperties2[layerSelect2.getValue()].legend);
print(layerProperties2)
toolPanel.add(layerSelect2);
toolPanel.add(legendPanel2);
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox2 = ui.Checkbox({
  label: 'Opacity - Left Panel',
  value: true,
  onChange: function(value) {
    var selected = layerSelect2.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel2.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect2.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider2 = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider2.onSlide(function(value) {
  mapPanel2.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel2 =
    ui.Panel([checkbox2, opacitySlider2], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel2);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Mangrove dieback hotspots', {'font-size': '18px'}), locationSelect
]);
toolPanel.add(locationPanel);