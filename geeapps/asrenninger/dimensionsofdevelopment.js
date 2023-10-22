var GRAY = [
  {  
    stylers: [ { saturation: -100 } ]
  },
  { 
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },
  { 
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [ { visibility: 'off' } ]
  },
  { 
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'off' } ]
  },
  {
    featureType: 'land',
    elementType: 'geometry.fill',
    stylers: [{color: '#000000'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#000000'}]
  }
];
//Change base map
var map = ui.Map()
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: true, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map 
ui.root.add(map)
map.setOptions('Base', {'Base': GRAY});
var pop = ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1")
              .filterDate('2014-01-01', '2016-01-01')
              .select('population_count')
              .qualityMosaic('population_count')
var blt = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1")
              .select('built')
              .gt(8)
var blt = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global")
              .select('urban-coverfraction')
              .qualityMosaic('urban-coverfraction')
var lit = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
              .filterDate('2010-01-01', '2020-01-01')
              .select('stable_lights')
              .qualityMosaic('stable_lights')
var pop = pop.unitScale(0, 1.6 * (10^6))
var lit = lit.unitScale(0, 63)
var blt = blt.unitScale(0, 100)
var composite1 = pop.addBands(blt).addBands(lit).float()
var pop = ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1")
              .filterDate('1999-01-01', '2001-01-01')
              .select('population_count')
              .qualityMosaic('population_count')
var blt = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global")
              .select('urban-coverfraction')
              .qualityMosaic('urban-coverfraction')
var lit = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
              .filterDate('1995-01-01', '2005-01-01')
              .select('stable_lights')
              .qualityMosaic('stable_lights')
var pop = pop.unitScale(0, 1.6 * (10^6))
var lit = lit.unitScale(0, 63)
var blt = blt.unitScale(0, 100)
var composite2 = pop.addBands(blt).addBands(lit).float()
map.addLayer(composite2, {bands: ['population_count', 'urban-coverfraction', 'stable_lights'], min: .1, max: 1, gamma: 5}, "2000");
map.addLayer(composite1, {bands: ['population_count', 'urban-coverfraction', 'stable_lights'], min: .1, max: 1, gamma: 5}, "2015");
map.setControlVisibility([composite2, composite1])
map.add(ui.Label("Population | Impervious Surface | Stable Lights (as red, green, and blue)"));
var description = ui.Panel({style: {width: '12%', position: 'bottom-left'}});
var intro = ui.Panel([
  ui.Label({
    value: 'A Trivariate Map of Development',
    style: {fontSize: '10px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'A tool for exploring where three measures of development align—or do not—by blending them as colors. Red areas have high population, low light (perhaps under-electrified); green areas have high percentages of impervious surface, and low population (maybe over-built); blue areas tend to be gas fields, flaring excess fuel with few people. White hot is bright, built, and populous. (For information on the research by this, contact Francisco Rowe (fcorowe@liverpool.ac.uk) at Liverpool University or Andrew Renninger (arenn@design.upenn.edu) at University of Pennsylvania for information on the methodology behind this application.',
    style: {fontSize: '10px'}
  })
]);
description.add(intro);
map.add(description)
var image = ee.Image('users/asrenninger/ternary_final').visualize();
// Print a thumbnail to the console.
var legend = ui.Panel({style: {width: '275px', height: '290px', position: 'bottom-right'}})
var image = ui.Thumbnail({
  image: image,
  style: {height: '250px', width: '250px'}
});
legend.add(image);
map.add(legend)
map.setCenter({lat: 0, lon: 0, zoom: 3})
/*
var aoi = ee.Geometry.Polygon(
  [[[-179.0, 78.0], [-179.0, -58.0], [179.0, -58.0], [179.0, 78.0]]], null,
  false);
*/