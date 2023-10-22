var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -6.607542440047498,
                37.28271365011595
              ],
              [
                -6.607542440047498,
                36.77071084963494
              ],
              [
                -6.008787557234998,
                36.77071084963494
              ],
              [
                -6.008787557234998,
                37.28271365011595
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-6.607542440047498, 37.28271365011595],
          [-6.607542440047498, 36.77071084963494],
          [-6.008787557234998, 36.77071084963494],
          [-6.008787557234998, 37.28271365011595]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "nd"
        ],
        "palette": [
          "ffffff",
          "12d3ff",
          "3908ff"
        ]
      }
    }) || {"opacity":1,"bands":["nd"],"palette":["ffffff","12d3ff","3908ff"]};
// Acordaros de que hay que crear la geometría con la zona que queremos y también hará falta definirle la visualización
//test l8 newCLOUDMask
 function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Load Landsatcollections
var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
  .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'], ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'])
  //.rename(['B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
  .filterMetadata("CLOUD_COVER_LAND", "less_than", 15)
  .filter(ee.Filter.or(
    ee.Filter.and(ee.Filter.eq('WRS_PATH', 202),         
                  ee.Filter.eq('WRS_ROW', 34))))
var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'], ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'])
    .filterMetadata("CLOUD_COVER_LAND", "less_than", 15)
    .filter(ee.Filter.or(
      ee.Filter.and(ee.Filter.eq('WRS_PATH', 202),         
                    ee.Filter.eq('WRS_ROW', 34))))
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'])
    .filterMetadata("CLOUD_COVER_LAND", "less_than", 15)
    .filter(ee.Filter.or(
      ee.Filter.and(ee.Filter.eq('WRS_PATH', 202),         
                    ee.Filter.eq('WRS_ROW', 34))))
// NDWI
function ndwi(image) {
  return image.select().addBands(image.normalizedDifference(['B3', 'B5']))
}
var merge = l8.merge(l7).merge(l5)
  .map(maskL8sr)
  .map(ndwi)
  .map(function(image){return image.clip(geometry)});
// PERIODO 1 1984-1994
var merge_p1 = merge
    .filterDate('1984-01-01', '2000-12-31')
print(merge_p1.size())
//var maxp1 = merge.reduce(ee.Reducer.percentile([95]))
var maxp1 = merge_p1.max()
//var ndwiSum = merge.reduce(ee.Reducer.sum())
var ndwiMaskedp1 = maxp1.updateMask(maxp1.gte(0.05))
//Map.addLayer(maxp1, {}, 'Max')
//Map.addLayer(ndwiSum, {}, 'NDWI Sum')
//Map.addLayer(ndwiMaskedp1, imageVisParam, 'NDWI Masked P1')
//PERIODO 2 1995-2005
var merge_p2 = merge
    .filterDate('2001-01-01', '2011-12-31')
print(merge_p2.size())
//var maxp2 = merge.reduce(ee.Reducer.percentile([95]))
var maxp2 = merge_p2.max()
//var ndwiSum = merge.reduce(ee.Reducer.sum())
var ndwiMaskedp2 = maxp2.updateMask(maxp2.gte(0.05))
//Map.addLayer(ndwiMaskedp2, imageVisParam, 'NDWI Masked P2')
//PERIODO 3 2005-2015
var merge_p3 = merge
    .filterDate('2012-01-01', '2022-12-31')
print(merge_p3.size())
//var maxp3 = merge.reduce(ee.Reducer.percentile([95]))
var maxp3 = merge_p3.max()
//var ndwiSum = merge.reduce(ee.Reducer.sum())
var ndwiMaskedp3 = maxp3.updateMask(maxp3.gte(0.05))
//Map.addLayer(ndwiMaskedp3, imageVisParam, 'NDWI Masked P3')
// BASEMAPS CHANGES
// Based on Google Maps Documentation:
// https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyle
// Change map saturation.
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
/*
Other options:
-hue: indicates the basic color
-lightness: indicates percentage change in brightness of element
-saturation: indicates percentage change in basic color of element
-gamma: Gamma correction of the element (0.01 and 10.0)
-invert_lightness: inverts the existing lightness
-visibility: changes visibility options for an element (on, off, or
  simplified)
-color: sets the color of elements (using RGB Hex Strings)
-weight: sets the weight of a feature in pixels
*/
// Remove icons.
var iconChange = [
  {
    // Change map saturation.
    stylers: [{gamma: 0.2}]
  },
  {
    // Change label properties.
    elementType: 'labels',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    // Change road properties.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    // Change road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]
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
/*
Here is a full list of features that you can modify:
-all: (default) selects all features.
-administrative: selects all administrative areas. Styling affects only the
  labels of administrative areas, not the geographical borders or fill.
-administrative.country: selects countries.
-administrative.land_parcel: selects land parcels.
-administrative.locality: selects localities.
-administrative.neighborhood: selects neighborhoods.
-administrative.province: selects provinces.
-landscape: selects all landscapes.
-landscape.man_made selects: structures built by humans.
-landscape.natural selects: natural features.
-landscape.natural.landcover: selects landcover features.
-landscape.natural.terrain: selects terrain features.
-poi: selects all points of interest.
-poi.attraction: selects tourist attractions.
-poi.business: selects businesses.
-poi.government: selects government buildings.
-poi.medical: selects emergency services, including hospitals, pharmacies,
  police, doctors, and others. 
-poi.park: selects parks. 
-poi.place_of_worship: selects places of worship, including churches, temples,
  mosques, and others.
-poi.school: selects schools.
-poi.sports_complex: selects sports complexes.
-road: selects all roads.
-road.arterial: selects arterial roads.
-road.highway: selects highways.
-road.highway.controlled_access: selects highways with controlled access.
-road.local: selects local roads.
-transit: selects all transit stations and lines.
-transit.line: selects transit lines.
-transit.station: selects all transit stations.
-transit.station.airport: selects airports.
-transit.station.bus: selects bus stops.
-transit.station.rail: selects rail stations.
-water: selects bodies of water.
Here is a full list of features that you can modify:
-all: (default) selects all elements of the specified feature.
-geometry: selects all geometric elements of the specified feature.
-geometry.fill: selects only the fill of the feature's geometry.
-geometry.stroke: selects only the stroke of the feature's geometry.
-labels: selects the textual labels associated with the specified feature.
-labels.icon: selects only the icon displayed within the feature's label.
-labels.text: selects only the text of the label.
-labels.text.fill: selects only the fill of the label. The fill of a label is
  typically rendered as a colored outline that surrounds the label text.
-labels.text.stroke: selects only the stroke of the label's text.
*/
// Examples from snazzy maps (https://snazzymaps.com/)
var snazzyBlack = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#eaeaea'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'simplified'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{color: '#434343'}, {visibility: 'on'}]
  }
];
var snazzyColor = [
  {elementType: 'labels', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#0F0919'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#E4F7F7'}]
  },
  {elementType: 'geometry.stroke', stylers: [{visibility: 'off'}]}, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#002FA7'}]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [{color: '#E60003'}]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{color: '#FBFCF4'}]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [{color: '#FFED00'}]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [{color: '#D41C1D'}]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry.fill',
    stylers: [{color: '#BF0000'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [{saturation: -100}]
  }
];
// Example from mapstyle (https://mapstyle.withgoogle.com/)
var mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#000040'}, {visibility: 'simplified'}]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{color: '#408080'}]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{color: '#800040'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{color: '#737c03'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{color: '#000040'}]
  },
  {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#dfd2ae'}]},
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#a5b076'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#b9d3c2'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
];
//LINKED MAPS
//Creación y linkeo entre mapas
var PanelMapas = [];
//Object.keys(ComposicionesRGB).forEach(function(name) {
var Map1 = ui.Map();
Map1.setOptions('roadNetwork', {
  'baseChange': baseChange,
  'iconChange': iconChange,
  'roadNetwork': roadNetwork,
  'snazzyBlack': snazzyBlack,
  'snazzyColor': snazzyColor,
  'mapStyle': mapStyle
});
Map1.add(ui.Label('PERIODO 1: 1984-2000'));
//Map1.addLayer(s2, rgbVis, 'S2 Image');
Map1.addLayer(ndwiMaskedp1, {min: 0, max: 0.7, palette:['FFFFFF', '0000FF']}, 'NDWI Masked P1');
Map1.setControlVisibility(false)
Map1.setOptions('snazzyColor');
PanelMapas.push(Map1);
var Map2 = ui.Map();
Map2.setOptions('roadNetwork', {
  'baseChange': baseChange,
  'iconChange': iconChange,
  'roadNetwork': roadNetwork,
  'snazzyBlack': snazzyBlack,
  'snazzyColor': snazzyColor,
  'mapStyle': mapStyle
});
Map2.add(ui.Label('PERIODO 2: 2001-2011'));
//Map2.addLayer(s2, rgbVis, 'S2 Image');
Map2.addLayer(ndwiMaskedp2, {min: 0, max: 0.7, palette:['FFFFFF', '0000FF']}, 'NDWI Masked P2');
Map2.setControlVisibility(false)
Map2.setOptions('snazzyColor');
PanelMapas.push(Map2);
var Map3 = ui.Map();
Map3.setOptions('roadNetwork', {
  'baseChange': baseChange,
  'iconChange': iconChange,
  'roadNetwork': roadNetwork,
  'snazzyBlack': snazzyBlack,
  'snazzyColor': snazzyColor,
  'mapStyle': mapStyle
});
Map3.add(ui.Label('PERIODO 3: 2012-2022'));
//Map3.addLayer(s2, rgbVis, 'S2 Image');
Map3.addLayer(ndwiMaskedp3, {min: 0, max: 0.7, palette:['FFFFFF', '0000FF']}, 'NDWI Masked P3');
Map3.setControlVisibility(false);
Map3.setOptions('snazzyColor')
PanelMapas.push(Map3);
/*
var Map4 = ui.Map();
Map4.add(ui.Label('PERIODO 4: 2016-2022'));
//Map4.addLayer(s2, rgbVis, 'S2 Image');
Map4.addLayer(ndwiMaskedp4, {min: 0, max: 0.7, palette:['FFFFFF', '00FF00']}, 'NDWI Masked P4')
Map4.setControlVisibility(false);
PanelMapas.push(Map4);
*/
var linker = ui.Map.Linker(PanelMapas);
//Configuración de la posición de los 4 mapas sobre la vista
var mapGrid = ui.Panel([
      ui.Panel([PanelMapas[0]], null, {stretch: 'both'}),
      ui.Panel([PanelMapas[1]], null, {stretch: 'both'}),
      ui.Panel([PanelMapas[2]], null, {stretch: 'both'}),],
      //ui.Panel([PanelMapas[3]], null, {stretch: 'both'}),],
      ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Controladores de título y escala-zoom para el primer mapa
PanelMapas[0].setControlVisibility({zoomControl: true});
PanelMapas[0].setControlVisibility({scaleControl: true});
var Titulo = ui.Label('Water Mask Periods', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '15 px'});
// Centrado del mapa en localización y carga de títulos y mapas en vertical
PanelMapas[0].setCenter(-6.4695, 37.28,  10);
ui.root.widgets().reset([Titulo, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));