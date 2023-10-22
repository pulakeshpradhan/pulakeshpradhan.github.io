var cimis = ui.import && ui.import("cimis", "table", {
      "id": "users/bwilder95/cimis_sites"
    }) || ee.FeatureCollection("users/bwilder95/cimis_sites"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// load epa eco regions L3
//var epa = ee.FeatureCollection('EPA/Ecoregions/2013/L3');
//Map.addLayer(epa,{},'EPA ecoregions L3 outlines');
//var palettes = require('users/gena/packages:palettes');
//var palette =  palettes.misc.jet[7];
//var visParams = {
//  palette: palette,
//  min: 23.0,
//  max: 3.57e+11,
//  opacity: 0.8,
//};
//var epa = ee.Image().float().paint(epa, 'shape_area');
Map.setCenter(-121.4, 38.5, 11);
//Map.addLayer(epa, visParams,'EPA ecoregions L3');
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// load state outlines
var stateDataset = ee.FeatureCollection('TIGER/2016/States');
var image = ee.Image().float().paint(stateDataset, 'STATEFP');
var stateOutlines = ee.Image().float().paint({
  featureCollection: stateDataset,
  color: 'black',
  width: 5
});
Map.addLayer(stateOutlines, {}, 'state outlines');
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// plot cimis data
// Define the visualization parameters.
var vizParams = {
  color: 'red',
};
Map.addLayer(cimis,vizParams,'CIMIS');
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
var text = require('users/gena/packages:text')
// scale text font relative to the current map scale
var scale = Map.getScale() * 2
var labels = cimis.map(function(feat) {
  feat = ee.Feature(feat)
  var name = ee.String(feat.get("Name"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid, scale, {
    fontSize:12, 
    textColor:'red',
    outlineWidth: 1,
    outlineColor: 'red'
  })
  return t
})
labels = ee.ImageCollection(labels)
var shown_labels = true
Map.addLayer(labels,{},'Labels',shown_labels)
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Gray', {'Gray': GRAYMAP});