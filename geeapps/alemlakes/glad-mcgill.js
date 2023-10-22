/**
 * @license
 * Copyright 2020 Justin Braaten
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @note
 * The drawing tool is a modification from code that was originally
 * developed by Gennadii Donchyts.
 * See: https://code.earthengine.google.com/82b08b69bd596ada4747cb4bb7ea9526)
 */
// #############################################################################
// ### Clear the root and add a new map, set map properties ###
// #############################################################################
ui.root.clear();
var theMap = ui.Map();
theMap.setOptions('HYBRID');
Map.setControlVisibility(null, null, false, false, false);
// #############################################################################
// ### Import FeatureCollection and add it to the map ###
// #############################################################################
// var polys = ee.FeatureCollection("WCMC/WDPA/current/polygons"); // for demo use
var polys = ee.FeatureCollection("users/gena/HydroLAKES_polys_v10"); // HydroLAKES from Gena 
theMap.addLayer(polys, {color: '0598f5'}, 'HydroLAKES');
// #############################################################################
// ### Set up the UI elements ###
// #############################################################################
// Control panel.
var controlPanel = ui.Panel({
  style: {width: '350px', position: 'bottom-left'} //, backgroundColor: 'rgba(255, 255, 255, 0)'
});
var clearButton = ui.Button({label: 'Clear', style:{stretch: 'horizontal'}});
var clearButtonPanel = ui.Panel([clearButton], null, {shown: false});
var instructionsLabel= ui.Label('HydroLAKES Download', {fontWeight: 'bold'});
var instructions= ui.Label(
  "This app allows you to download a regional\n"+
  "subset of the HydroLAKES polygon dataset\n"+
  "in GeoJSON format.\n\n"+
  "1. Zoom to an area of interest\n"+
  "2. Wait for the HydroLAKES layer to load fully\n"+
  "3. Click 5 points to close a rectangle (go slow)\n"+
  "4. Click the URL that appears below\n"
  , {whiteSpace:'pre'}
);
var instructionsPanel = ui.Panel([instructionsLabel,instructions]);
var url = ui.Label({
  value: 'Click to download data',
  style: {shown: false}});
controlPanel.add(instructionsPanel);
controlPanel.add(url);
controlPanel.add(clearButtonPanel);
// Add a link to the Cardille Lab.
var CardilleLink = ui.Label({
  value: 'Cardille Lab',
  style: {position:'bottom-right'} 
});
CardilleLink.setUrl('http://www.cardillelab.com/');
// Add elements to the map.
theMap.add(CardilleLink);
theMap.add(controlPanel);
ui.root.add(theMap);
// #############################################################################
// ### Functions ###
// #############################################################################
// Get the points geometry envelope.
function getlims(geom) {
  var coords = ee.List(geom.coordinates().get(0));
  var x = coords.map(function(pt) {
    return  ee.List(pt).get(0);
  });
  var y = coords.map(function(pt) {
    return  ee.List(pt).get(1);
  });
  return {
    xmin: ee.Number(x.reduce(ee.Reducer.min())),
    xmax: ee.Number(x.reduce(ee.Reducer.max())),
    ymin: ee.Number(y.reduce(ee.Reducer.min())),
    ymax: ee.Number(y.reduce(ee.Reducer.max()))
  };
}
// Display the selected features that intersect the drawn polygon envelope.
var displaySelected = function() {
  var selectionPolys = polys.filterBounds(finalGeom);
  theMap.addLayer(selectionPolys, {color: 'f5001a'}, 'Selected HydroLAKES');
  var theLink = selectionPolys.getDownloadURL({
    format: 'json',
    filename: 'HydroLAKES_subset'});
  url.setUrl(theLink).style().set('shown', true);
  dirty = true;
  clearButtonPanel.style().set('shown', true);
};
// Define clear button handler.
var dirty = false;
clearButton.onClick(function(){
  if(dirty === true){
    theMap.remove(theMap.layers().get(1));
    theMap.remove(theMap.layers().get(1));
    clearButtonPanel.style().set('shown', false);
    url.style().set('shown', false);
    tool = new DrawAreaTool(theMap);
    tool.startDrawing();
    tool.onFinished(function(geometry) {
      finalGeom = geometry;
      displaySelected();
    });
  }
});
// Define the drawing tool.
// Based on Gena's examples: https://code.earthengine.google.com/82b08b69bd596ada4747cb4bb7ea9526
var DrawAreaTool = function(map) {
  var drawingToolLayer = ui.Map.Layer({name: 'Area Selection Tool', visParams: {palette:'fbe950', color:'fbe950' }});
  this.map = map;
  this.selection = null;
  this.active = false;
  this.points = [];
  this.area = null;
  this.listeners = [];
  var tool = this;
  this.initialize = function() {
    this.map.onClick(this.onMouseClick);
    map.layers().set(1, drawingToolLayer);
  };
  this.startDrawing = function() {
    this.active = true;
    this.points = [];
    this.map.style().set('cursor', 'crosshair');
    drawingToolLayer.setShown(true);
  };
  this.stopDrawing = function() {
    tool.active = false;
    tool.map.style().set('cursor', 'hand');
    if(tool.points.length < 2) {
      return;
    }
    var closedPoints = tool.points.slice(0,-1);
    tool.area = ee.Geometry.Polygon(closedPoints).bounds();
    var empty = ee.Image().byte();
    var test = empty.paint({
      featureCollection: ee.FeatureCollection(tool.area),
      color: 1,
      width: 4
    });
    drawingToolLayer.setEeObject(test);
    tool.listeners.map(function(listener) {
      listener(tool.area);
    });
  };
  this.onMouseClick = function(coords) {
    if(!tool.active) {
      return;
    }
    tool.points.push([coords.lon, coords.lat]);
    var geom = tool.points.length > 1 ? ee.Geometry.LineString(tool.points) : ee.Geometry.Point(tool.points[0]);
    drawingToolLayer.setEeObject(geom);
    //var l = ee.Geometry.LineString([tool.points[0], tool.points[tool.points.length-1]]).length(1).getInfo();
    //print('l/scale: '+(l / theMap.getScale()).toString());
    //if(tool.points.length > 2 && l / theMap.getScale() < 5) {
    //  tool.stopDrawing();
    //}
    if(tool.points.length > 4) {
      tool.stopDrawing();
    }
  };
  this.onFinished = function(listener) {
    tool.listeners.push(listener);
  };
  this.initialize();
};
var tool = new DrawAreaTool(theMap);
var finalGeom;
tool.onFinished(function(geometry) {
  finalGeom = geometry;
  displaySelected();
});
tool.startDrawing();