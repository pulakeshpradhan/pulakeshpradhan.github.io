//// Mapstyle settings
var Darkmode = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#404040"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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
         "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
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
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
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
        "color": "#E0E0E0"
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
//// Hide standard drawing tool and zoom buttons
Map.setControlVisibility({
  zoomControl: false, 
  layerList: false, 
  scaleControl: false, 
  drawingToolsControl: false});
//// Load and visualize maps
// Color palette (https://github.com/gee-community/ee-palettes)
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.viridis[7];
// Load disturbance image collection and mosaic
var disturbance_maps = ee.ImageCollection("users/corneliussenf/european_disturbance_maps").mosaic();
// Define visualization parameters and display.
Map.setOptions({
  styles: {Darkmode: Darkmode}
});
Map.setCenter(9, 57, 4);
var vis_disturbance = {min: 1986, max: 2020, palette: palette};
Map.addLayer(disturbance_maps, vis_disturbance, 'Disturbance year');
//// Title, reference and download
// Title
var title = ui.Label({
  value: 'European forest disturbance map',
  style: {
    fontWeight: 'bold',
    fontSize: '16px'
  }
});
var version = ui.Label({
  value: 'Version 1.1.1',
  style: {
    fontSize: '12px'
  }
});
var reference = ui.Label({
  value: 'Data source: Senf and Seidl (2021) Mapping the\nforest disturbance regimes of Europe. Nature\nSustainability. DOI: 10.1038/s41893-020-00609-y\n',
  style: {
    whiteSpace: 'pre',
    fontSize: '12px'
  }
});
// Data download link/button
var download = ui.Button({
  label: 'Download the maps!',
  onClick: function() {
    var win = window.open('https://zenodo.org/record/4570157#.YD5S2C337OQ', '_blank');
  win.focus();
  }
});
download.style().set('backgroundColor', 'white');
//// Legend
// Colorbar
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis_disturbance.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '12px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis_disturbance.min, {margin: '4px 8px', fontSize: '12px'}),
    ui.Label((vis_disturbance.max - 15), {margin: '4px 8px', fontSize: '12px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis_disturbance.max, {margin: '4px 8px', fontSize: '12px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle = ui.Label({
  value: 'Disturbance year',
  style: {
    fontSize: '12px'
  }
});
// Clicker for extracting values
var clickExample = ui.Label({
  value: 'Click on the map for the exact disturbance year!',
  style: {fontSize: '12px'}
});
var legendPanel = ui.Panel([title, version, legendTitle, colorBar, legendLabels, clickExample, reference, download]);
legendPanel.style().set({
  width: '300px',
  position: 'bottom-left'
});
Map.onClick(function(coords) {
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var dist_year = disturbance_maps.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var dist_year = 'Disturbance year: ' + val.b1;
    legendPanel.widgets().set(5, ui.Label({value: dist_year, style: {fontSize: '12px'}}));
  });
});
// Add the legend panel
Map.add(legendPanel);
////////////