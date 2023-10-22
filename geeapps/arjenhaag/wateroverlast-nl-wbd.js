// Wateroverlast polders NL - app
/*
Copyright (c) 2022 Deltares.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
Authors: Gennadii Donchyts (gennadii.donchyts@deltares.nl)
         Kymo Slager (kymo.slager@deltares.nl)
         Arjen Haag (arjen.haag@deltares.nl)
*/
// NOTES:
/*
- Cleaned up version of 'users/gena/eo-floods/app-flood-fill-nl.js' (and it's various other versions)
- Is AHN already (perhaps by default) referenced to NAP?
- Go through all lines commented with 'NOTE'
- How 'isolated' are these areas really? Taking my own area as an example, it doesn't seem quite right...
- gebruiker zomer/winterpeil laten kiezen (ook waarde van gebied laten zien)
- Visualisatie waterdiepte nu tussen 0-1 meter, dynamisch maken?
- loading mssg bij start up?
- berekening/visualisatie van (overstroomde) objecten binnen peilgebied:
  - waarschijnlijk beter met vaste (hoge resolutie) schaal, dan huidige dynamische?
  - totaal al doen voor chart klikken (zelfde geldt voor oppervlakte gekozen gebied)
  - check if all things are properly cleared when new area is clicked or cleared
- handmatige invoer is nu beperkt tot waardes in grafiek (fix?)
- duidelijker zichtbaar dat je handmatig of grafiek gebruikt heb (puntje op grafiek verschuiven bij handmatig?)
- object iconen opslaan als png/thumbnail oid om zo in legenda weer te geven
  (dan kunnen de objecten standaard in kleurschaling weergegeven worden)
- van te voren bepaalde waardes laten uitrekenen voor alle gebieden inclusief objecten
  (elke 5mm tot 150 en ook nog 300)
  [zowel zomer- als winterpeil]
- validatie?!
See also:
- https://kymoslager.users.earthengine.app/view/wateroverlast
- https://gena.users.earthengine.app/view/flood-nl
*/
// modules
var palettes = require('users/gena/packages:palettes');
var style = require('users/gena/packages:style');
var utils = require('users/gena/packages:utils');
// defaults
var default_info_str = '<< Klik op een peilgebied in de kaart om analyse te starten >>';
var palette_flooded_objects = ['1a9850', 'fc8d59', 'd73027'];
// define app and add functions
function App() { }
App.run = function() {
  App.setupMap();
  App.setupUI();
  App.subscribeEvents();
  App.addMapLayers();
  App.setupUrlHandling();
};
// initializing / setting up the map
App.setupMap = function() {
  // GEE assets containing relevant data
  var ahn_dsm = ee.Image("users/gena/AHN3_DSM").rename('elevation');
  var ahn_dtm = ee.Image("users/gena/AHN3_DTM").rename('elevation');  // trees removed, buildings masked
  var ahn_merged = ahn_dtm.unmask(ahn_dsm);  // trees removed, buildings included
  var floodWaterAreas_Noordezijlvest = ee.FeatureCollection('users/kymoslager/Noorderzijlvestpeilvakken_3857');
  var floodWaterAreas_Delfland = ee.FeatureCollection('users/kymoslager/Delfland_peilgebied');
  var floodWaterAreas_Rijnland = ee.FeatureCollection('users/kymoslager/Rijnland');
  var floodWaterAreas_Waternet = ee.FeatureCollection('users/kymoslager/Waternet');
  var floodWaterAreas_HHNK = ee.FeatureCollection('users/kymoslager/HHNK');
  var floodWaterAreas_WSHD = ee.FeatureCollection('users/kymoslager/HollandseDelta');
  var floodWaterAreas_HHSK = ee.FeatureCollection('users/kymoslager/Peilgebieden_HHSK');
  // var floodWaterAreas_WBD = ee.FeatureCollection('users/kymoslager/WBD_3857');
  var floodWaterAreas_WBD = ee.FeatureCollection('users/deurloothomas/peilbesluit_wbd');
  // print(floodWaterAreas_WBD.size());
  // print(floodWaterAreas_WBD.filterMetadata('WS_ZOMERPE', 'not_equals', null).size());
  var floodWaterAreas_NL = ee.FeatureCollection('users/kymoslager/peilgebieden_NL');
  // floodWaterAreas_WBD = floodWaterAreas_WBD.map(function(f) {
  //   return f.set('area', f.geometry().area());
  // });
  // print(floodWaterAreas_WBD.sort('area', false).first());
  // Map.addLayer(ee.Feature(floodWaterAreas_WBD.sort('area', false).first()));
  // var electricity = ee.FeatureCollection('users/kymoslager/Liander_LS-kast_3857');
  var electricity = ee.FeatureCollection('users/kymoslager/electra_WBD_3857');
  var ied_installaties = ee.FeatureCollection('users/kymoslager/ied_installaties');
  var kwetsbareobjecten = ee.FeatureCollection('users/kymoslager/kwetsbaar_objecten');
  // inspection of data
  // print(floodWaterAreas_WBD.first());
  // print(floodWaterAreas_WBD.aggregate_array('WS_MAXIMUM'));
  // print(floodWaterAreas_WBD.aggregate_array('WS_MINIMUM'));
  // print(floodWaterAreas_WBD.aggregate_array('WS_WINTERP'));
  // print(floodWaterAreas_WBD.aggregate_array('WS_ZOMERPE'));
  // Map.addLayer(floodWaterAreas_WBD.filter(ee.Filter.notNull(['WS_WINTERP'])));
  // Map.addLayer(floodWaterAreas_WBD.filter(ee.Filter.notNull(['WS_ZOMERPE'])));
  // merge peilgebieden
  // App.floodWaterAreas = floodWaterAreas_Noordezijlvest.merge(floodWaterAreas_Delfland).merge(floodWaterAreas_Rijnland).merge(floodWaterAreas_Waternet).merge(floodWaterAreas_HHNK).merge(floodWaterAreas_WSHD).merge(floodWaterAreas_HHSK).merge(floodWaterAreas_WBD);
  // App.floodWaterAreas = floodWaterAreas_NL
  App.floodWaterAreas = floodWaterAreas_WBD;
  // get only objects within peilgebieden
  electricity = electricity.filterBounds(App.floodWaterAreas.geometry());
  ied_installaties = ied_installaties.filterBounds(App.floodWaterAreas.geometry());
  kwetsbareobjecten = kwetsbareobjecten.filterBounds(App.floodWaterAreas.geometry());
  // merge AHN versions (to allow extraction of a specific type based on user selection)
  App.ahns = ee.ImageCollection([ahn_dsm.set('type','DSM'), ahn_dtm.set('type','DTM'), ahn_merged.set('type','merged')]);
  // add to app object
  App.ahn_dsm = ahn_dsm;
  App.ahn_dtm = ahn_dtm;
  App.ahn_merged = ahn_merged;
  App.ahn = ahn_merged;
  App.electricity = electricity;
  App.ied_installaties = ied_installaties;
  App.kwetsbareobjecten = kwetsbareobjecten;
  App.selection = ee.FeatureCollection([]);
  // map style
  // style.SetMapStyleDark(Map);  // alternative: SetMapStyleGrey
  // Map.setOptions('HYBRID');
  Map.style().set({cursor: 'crosshair'});
  // map center
  Map.centerObject(App.floodWaterAreas);
};
// add event(s) to app
App.subscribeEvents = function() {
  // click on map functionality
  Map.onClick(function(pt) {
    // initialize panels
    App.infoPanel.widgets().reset([ui.Label('Analyseren van het gekozen gebied, even geduld a.u.b. ...')]);
    App.infoPanel2.widgets().reset([]);
    // App.infoPanel3.widgets().reset([]);
    App.infoPanel3.style().set('shown', true);
    App.infoPanel3_kwetsbaar_1.setValue('');
    App.infoPanel3_kwetsbaar_2.setValue('');
    App.infoPanel3_kwetsbaar_3.setValue('');
    App.infoPanel3_electra_1.setValue('');
    App.infoPanel3_electra_2.setValue('');
    App.infoPanel3_electra_3.setValue('');
    App.infoPanel3_milieu_1.setValue('');
    App.infoPanel3_milieu_2.setValue('');
    App.infoPanel3_milieu_3.setValue('');
    App.chartPanel1.widgets().reset([]);
    App.chartPanel2.widgets().reset([]);
    // initialize water level map layer
    App.waterLevelImageLayer.setEeObject(ee.Image());
    // add clicked point to current list of points
    pt = ee.Geometry.Point([pt.lon, pt.lat]);
    App.selectionClickedPoints.push(pt);
    var currentlyClickedPoints = ee.FeatureCollection(App.selectionClickedPoints);
    // filter floodWaterAreas (peilgebieden) for clicked points
    App.selection = App.floodWaterAreas.filterBounds(ee.FeatureCollection(App.selectionClickedPoints));
    App.selectionLayer.setEeObject(App.selection.style({ color: 'ffff00', pointSize: 6, fillColor: 'ffff0000' }));  // alternative fillColor: '#B3E5E5'
    // update charts based on filtered floodWaterAreas (peilgebieden)
    App.updateSelection(App.selection);
  });
};
// check if charts should be updated based on current selection, using asynchronous retrieval from server
App.updateSelection = function(feature) {
  feature.size().evaluate(function(s) {
    // show warning if no areas are returned (user clicked outside of all available areas)
    if(!s) {
      print('No area selected');
      return;
    }
    // otherwise, create/update the charts based on the returned area(s)
    App.updateCharts(feature);
  });
};
// update functionality
App.updateApp = function(feature) {
  // derive area of feature(s)
  // var geom = feature.geometry();
  var geom = App.geom;
  var area = geom.area(1);  // set a maxError / ErrorMargin on area calculation to prevent memory issues
  // convert area to string and show in app 
  var areaStr = area.divide(1e6).format('%.3f').cat(' km2');
  areaStr.evaluate(function(area) {
    App.infoPanel.widgets().reset([
      ui.Label('Extra informatie:', {fontWeight: 'bold', margin:'10px 0px 0px 8px'}),
      ui.Label('Oppervlakte gekozen peilgebied: ' + area, {fontSize: '11px'})
    ]);
  });
  //// Compute volume and depth as a function of water level
  // get scale
  var scale = Math.max(Math.min(Map.getScale(), 20), 2);
  // get preset waterlevels
  // print('Number of features at clicked point:', feature.size());
  var winterp = feature.first().get('WS_WINTERP');
  var zomerp = feature.first().get('WS_ZOMERPE');
  var feature_p = zomerp;
  // print('clicked region peil:', feature_p);
  // compute AHN statistics within this area
  var stat = App.ahn.reduceRegion(ee.Reducer.percentile([0, 98]), geom, scale);
  // var p1 = ee.Number(-4.68)  // NOTE: what's this?!
  var p1 = ee.Number(stat.get('elevation_p0'));
  var p98 = ee.Number(stat.get('elevation_p98'));
  // var p1Image = ee.Image.constant(p1);
  var p98Image = ee.Image.constant(p98);
  // print('clicked region p1:', p1);
  // use preset waterlevels, or if not available use AHN p1
  // var feature_p1 = p1;  // FOR TESTING ONLY (compare with using winter-/zomerpeil)
  var p1_options = ee.Dictionary({winterpeil: winterp, zomerpeil: zomerp, AHN: p1});
  var choice = ee.Algorithms.If(App.p1_choice, App.p1_choice, 'zomerpeil');
  var feature_p1 = ee.Number(ee.Algorithms.If(p1_options.get(choice), p1_options.get(choice), p1));
  // var feature_p1 = ee.Number(ee.Algorithms.If(feature_p, feature_p, p1));
  var p1Image = ee.Image.constant(feature_p1);
  // print('clicked region final peil:', feature_p1);
  App.feature_p1 = feature_p1;
  // clamp (mask) DEM
  var dem = App.ahn.unmask(p1Image).updateMask(App.ahn.unmask(p1Image).lt(p98Image));
  // create histogram of AHN within this area
  var chart = ui.Chart.image.histogram(dem, geom, scale, 100).setChartType('SteppedAreaChart');
  chart = chart.setOptions({ height: '150px' });
  // update chart shown in UI
  App.chartPanel1.widgets().reset([chart]);
  return feature_p1;
};
// construct water levels
App.getWaterLevels = function(feature_p1) {
  return ee.List.sequence(feature_p1, feature_p1.add(2), 0.02)  // NOTE: why between p1 and p1+1?
};
// function to update water depth layer and download link
App.updateWaterDepthMap = function(z, label) {
  // get water levels
  var waterLevels = App.getWaterLevels(App.feature_p1);
  // derive water depth from water level
  var p1Image = ee.Image.constant(App.feature_p1);
  var waterLevel = ee.Image.constant(z);
  var floodMask = App.ahn.unmask(p1Image).lte(waterLevel);
  var waterDepth = waterLevel.subtract(App.ahn.unmask(p1Image)).updateMask(floodMask);
  waterDepth = waterDepth.clip(App.geom);
  waterLevel = waterDepth.add(App.ahn.unmask(p1Image));
  // update download link(s)
  label.evaluate(function(label) {
    label = ui.Label(label, { fontSize: '11px' });
    var label2 = ui.Label('Downloads (low-res GeoTIFF):', {fontWeight: 'bold', margin:'5px 0px 0px 8px'});
    var labelDownload1 = ui.Label('Waterstanden', {fontSize: '11px', margin:'5px 0px 0px 8px'}, waterLevel.getDownloadURL({region: App.geom.bounds(1), scale: 10, format: 'GEO_TIFF'}));
    var labelDownload2 = ui.Label('Waterdieptes', {fontSize: '11px', margin:'5px 0px 5px 8px'}, waterDepth.getDownloadURL({region: App.geom.bounds(1), scale: 10, format: 'GEO_TIFF'}));
    App.infoPanel2.widgets().reset([label, label2, labelDownload1, labelDownload2]);
  });
  // update water depth map layer NOTE: why is this done with min/max that seem to be unused?
  var zMin = waterLevels.get(0);
  var zMax = waterLevels.get(-1);
  var vis = { min: 0, max: 1, palette: palettes.cb.Blues[9]};
  ee.List([zMin, zMax]).evaluate(function(minMax) {
    waterDepth = waterDepth.visualize(vis);
    App.waterLevelImageLayer.setEeObject(waterDepth);
  });
  // obtain flooded objects
  function calcFloodedObjects(objects) {
    var flooded_objects = objects.filterBounds(App.geom).map(function(f) {
      var flood_depth_point = ee.Number(waterDepth.unmask(0).reduceRegion({
        reducer:ee.Reducer.first(),
        geometry: f.geometry(),
        scale: Math.max(Math.min(Map.getScale(), 5), 2)
        // scale: 1
      }).values().get(0));
      var index_flood_depth = flood_depth_point.gt(0).add(flood_depth_point.gt(0.2));
      return f.set('flood_depth', flood_depth_point, 'style_flood', {'color': ee.List(palette_flooded_objects).get(index_flood_depth)});
    });
    // print(flooded_objects);
    return flooded_objects;
  }
  var flooded_objects_kwetsbaar = calcFloodedObjects(App.kwetsbareobjecten);
  var flooded_objects_electra = calcFloodedObjects(App.electricity);
  var flooded_objects_milieu = calcFloodedObjects(App.ied_installaties);
  // update objects info panel
  flooded_objects_kwetsbaar.size().evaluate(function(n) {
    App.infoPanel3_kwetsbaar_1.setValue(n);
  });
  flooded_objects_kwetsbaar.filter(ee.Filter.and(ee.Filter.gt('flood_depth', 0), ee.Filter.lte('flood_depth', 0.2))).size().evaluate(function(n) {
    App.infoPanel3_kwetsbaar_2.setValue(n);
  });
  flooded_objects_kwetsbaar.filter(ee.Filter.gt('flood_depth', 0.2)).size().evaluate(function(n) {
    App.infoPanel3_kwetsbaar_3.setValue(n);
  });
  flooded_objects_electra.size().evaluate(function(n) {
    App.infoPanel3_electra_1.setValue(n);
  });
  flooded_objects_electra.filter(ee.Filter.and(ee.Filter.gt('flood_depth', 0), ee.Filter.lte('flood_depth', 0.2))).size().evaluate(function(n) {
    App.infoPanel3_electra_2.setValue(n);
  });
  flooded_objects_electra.filter(ee.Filter.gt('flood_depth', 0.2)).size().evaluate(function(n) {
    App.infoPanel3_electra_3.setValue(n);
  });
  flooded_objects_milieu.size().evaluate(function(n) {
    App.infoPanel3_milieu_1.setValue(n);
  });
  flooded_objects_milieu.filter(ee.Filter.and(ee.Filter.gt('flood_depth', 0), ee.Filter.lte('flood_depth', 0.2))).size().evaluate(function(n) {
    App.infoPanel3_milieu_2.setValue(n);
  });
  flooded_objects_milieu.filter(ee.Filter.gt('flood_depth', 0.2)).size().evaluate(function(n) {
    App.infoPanel3_milieu_3.setValue(n);
  });
  // update on map
  App.kwetsbareObjectenFloodedLayer.setEeObject(flooded_objects_kwetsbaar.style({color: '3cba6e', pointSize: 3, pointShape: 'square', styleProperty:'style_flood'}), {}, 'Kwetsbare objecten binnen gebied', false);
  App.electricityFloodedLayer.setEeObject(flooded_objects_electra.style({color: 'ffd000', pointSize: 3, pointShape: 'circle', styleProperty:'style_flood'}), {}, 'Electriciteitskastjes binnen gebied', false);
  App.ied_installatiesFloodedLayer.setEeObject(flooded_objects_milieu.style({color: 'eaff00', pointSize: 3, pointShape: 'triangle', styleProperty:'style_flood'}), {}, 'Objecten met milieurisico binnen gebied', false);
}
// function to update calculated values shown in UI
App.getLabelSelectedParameters = function(z, z_mm, v) {
  z = ee.Number(z).format('%.2f').cat(' m');
  z_mm = ee.Number(z_mm).format('%.0f').cat(' mm');
  v = ee.Number(v).format('%.0f').cat(' m3');
  return ee.String('Hoogte (mNAP): ').cat(z).cat(', Geborgen volume: ').cat(v).cat(', of waterschijf: ').cat(z_mm);
}
// create/update charts
App.updateCharts = function(feature) {
  // derive area of feature(s)
  var geom = feature.geometry();
  var area = geom.area(1);  // set a maxError / ErrorMargin on area calculation to prevent memory issues
  App.geom = geom;
  //// Compute volume and depth as a function of water level
  // get scale
  var scale = Math.max(Math.min(Map.getScale(), 20), 2);
  // get preset or calculated base water level
  var feature_p1 = App.updateApp(feature);
  var p1Image = ee.Image.constant(feature_p1);
  // get (potential) water levels
  var waterLevels = App.getWaterLevels(feature_p1);
  // calculate water depths (depth = level - surface [AHN])
  var depth = waterLevels.map(function(z) {
    var waterLevel = ee.Image.constant(z);
    var floodMask = App.ahn.unmask(p1Image).lte(waterLevel);
    var waterDepth = waterLevel.subtract(App.ahn.unmask(p1Image)).updateMask(floodMask);
    return waterDepth.set({ waterLevel: z });
  });
  // calculate water volumes (volume = depth * area)
  var volume = depth.map(function(z) {
    return ee.Image(z).multiply(ee.Image.pixelArea()).reduceRegion(ee.Reducer.sum(), geom, scale).values().get(0);
  });
  // convert volume to mm by spreading it over the total area
  var waterDepth_mm = volume.map(function(v) {
    return ee.Number(v).divide(area).multiply(1000);  // multiply by 1000 to go from m to mm
  });
  //// Update charts
  // create chart of volume (x-axis=volume, y-axis=water level)
  var chart2 = ui.Chart.array.values(waterLevels, 0, volume).setChartType('AreaChart');
  chart2 = chart2.setOptions({ title: 'Geborgen volume beneden x (mNAP), in m3', height: '150px' });
  // create chart of mm (x-axis=mm, y-axis=water level)
  var chart2mm = ui.Chart.array.values(waterLevels, 0, waterDepth_mm).setChartType('AreaChart');
  chart2mm = chart2mm.setOptions({ title: 'Geborgen waterschijf beneden x (mNAP), in mm', height: '150px'});
  // update charts shown in UI
  // App.chartPanel1.widgets().reset([chart]);
  App.chartPanel2.widgets().reset([]);
  App.chartPanel2.widgets().add(chart2);
  App.chartPanel2.widgets().add(chart2mm);
  //// Add on-click functionality to both the volume and mm charts
  // click on volume chart functionality
  chart2.onClick(function(v) {
    // get relevant variables
    var index = volume.indexOf(v);
    App.z = waterLevels.get(index);
    var z_mm = ee.Number(waterDepth_mm.get(index));
    // update values shown in UI and water depth layer on map
    App.label = App.getLabelSelectedParameters(App.z, z_mm, v);
    App.updateWaterDepthMap(App.z, App.label);
  });
  // click on mm chart functionality
  chart2mm.onClick(function(z_mm) {
    // get relevant variables
    var index = waterDepth_mm.indexOf(z_mm);
    App.z = ee.Number(waterLevels.get(index));
    var v = ee.Number(volume.get(index));
    // update values shown in UI and water depth layer on map
    App.label = App.getLabelSelectedParameters(App.z, z_mm, v);
    App.updateWaterDepthMap(App.z, App.label);
  });
  // activate relevant UI elements
  App.invoer_mm.setDisabled(false);
};
// initializing / setting up the UI
App.setupUI = function() {
  App.p1_choice = 'zomerpeil';
  App.log = ui.Label('', {
      shown: false,
      backgroundColor: '#00000066',
      color: 'ffffff',
      fontSize: '11px',
      position: 'top-center',
      margin: '2px', 
      padding: '0px'
  });
  Map.widgets().add(App.log);
  // title of the app
  var titleMain = ui.Label({ value: 'Wateroverlast in polders van Nederland', style: { fontSize: '20px', fontWeight: 'bold', margin: '6px 0px 0px 6px' }});
  // short text below title
  var textInfo = ui.Label({
    value: 'Met deze tool kan een indruk worden verkregen welke delen van de polder mogelijk onder water komen te staan bij extreme neerslag. ',
    style: { fontSize: '13px' }
  });
  // function for control of map layers within UI
  function addLayerControls(layerPanel, shown, opacity, getLayer, url) {
    // checkbox to turn map layers on/off
    var layerShownCheckbox = ui.Checkbox('', shown, function(s) {
      getLayer().setShown(s);
    });
    layerShownCheckbox.style().set({ margin: '2px', padding: '0px', border: '0px' });
    // slider to control map layer opacity
    var layerOpacitySlider = ui.Slider(0, 1, opacity, 0.05);
    layerOpacitySlider.onSlide(function(v) {
      getLayer().setOpacity(v);
    });
    layerOpacitySlider.style().set({ margin: '0px', padding: '0px', border: '0px', width: '50px' });
    // add checkbox and opacity controls together in a panel
    var layerControls = ui.Panel([layerShownCheckbox, layerOpacitySlider], ui.Panel.Layout.flow('horizontal'));
    layerControls.style().set({ position: 'top-right', margin: '0px 0px 0px 0px', padding: '0px' });
    // option for extra information panel
    if(url) {
      var infoBox = ui.Label('ℹ️', { margin: '0px', padding: '0px 4px 0px 0px' }, url);
      layerControls.widgets().insert(0, infoBox);
    }
    // add all controls to the UI panel for this map layer
    layerPanel.widgets().add(layerControls);
    layerPanel.controls = [layerShownCheckbox, layerOpacitySlider];
  }
  // water control areas (peilvakken)
  var mapLayerPanelFloodWaterAreas = ui.Panel([
    ui.Panel([
      ui.Label('Peilgebieden', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
      ui.Panel([
        createLegendItem('00ffff10', 'peilgebied', ''),
      ], null, { position: 'bottom-left', margin: '10px 0px 0px 10px' })
    ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
    ui.Label('', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
  ], ui.Panel.Layout.absolute(), { height: '70px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerPanelFloodWaterAreas, true, 0.9, function() { return App.floodWaterAreasLayer });
  // vulnerable object (kwetsbare objecten)
  var mapLayerPanelKwetsbareobjecten = ui.Panel([
    ui.Panel([
      ui.Label('Kwetsbare objecten', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
      ui.Panel([
        createLegendItem('3cba6e', 'Kwetsbare objecten', ''),
      ], null, { position: 'bottom-left', margin: '10px 0px 0px 10px' })
    ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
    ui.Label('', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
  ], ui.Panel.Layout.absolute(), { height: '70px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerPanelKwetsbareobjecten, false, 0.9, function() { return App.kwetsbareObjectenLayer});
  // electrical boxes (electriciteitskastjes)
  var mapLayerPanelelectricity = ui.Panel([
    ui.Panel([
      ui.Label('Electriciteitskastjes', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
      ui.Panel([
        createLegendItem('ffd000', 'Electriciteitskastjes', ''),
      ], null, { position: 'bottom-left', margin: '10px 0px 0px 10px' })
    ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
    ui.Label('', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
  ], ui.Panel.Layout.absolute(), { height: '70px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerPanelelectricity, false, 0.9, function() { return App.electricityLayer});
  // IED installations (IED installaties)
  var mapLayerPaneliedinstallaties = ui.Panel([
    ui.Panel([
      ui.Label('Objecten met milieurisico', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
      ui.Panel([
        createLegendItem('eaff00', 'Objecten met milieurisico', ''),
      ], null, { position: 'bottom-left', margin: '10px 0px 0px 10px' })
    ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
    ui.Label('', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
  ], ui.Panel.Layout.absolute(), { height: '70px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerPaneliedinstallaties, false, 0.9, function() { return App.ied_installatiesLayer});
  var nSteps = 50;
  var vis = { min: 0, max: 1, palette: palettes.cb.Blues[9]};
  // Creates a color bar thumbnail image for use in legend from the given color palette
  function makeColorBarParams(palette) {
    return {
      bbox: [0, 0, nSteps, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: nSteps,
      palette: palette,
    };
  }
  // Create the colour bar for the legend
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0).int(),
    params: makeColorBarParams(vis.palette),
    style: {width: '200px', stretch: 'horizontal', margin: '0px 0px', maxHeight: '24'},
  });
  // Create a panel with three numbers for the legend
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 8px'}),
      ui.Label(
          ((vis.max-vis.min) / 2+vis.min),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 8px'})
    ],
        layout: ui.Panel.Layout.flow('horizontal'), 
        style: {width: '200px'}
      });
  var mapLayerWaterDepthLegend = ui.Panel([
  ui.Panel([
    ui.Label('Waterdiepte (m)', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' })
  ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
  ui.Panel({widgets: [colorBar, legendLabels], style:{position: 'bottom-left'}})
  ], ui.Panel.Layout.absolute(), { height: '100px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerWaterDepthLegend, true, 0.9, function() { return App.waterLevelImageLayer});
  // update AHN on map (and relevant charts if an area has been selected)
  function updateAHN(value) {
    App.ahn = ee.Image(App.ahns.filter(ee.Filter.eq('type', value)).first());
    var dem = App.visualizeDEM(App.ahn);
    Map.layers().forEach(function(layer) {
      if (layer.getName() == 'AHN') {
        layer.setEeObject(dem);
      }
    });
    App.updateSelection(App.selection);
  }
  // AHN DEM
  var mapLayerPaneldem = ui.Panel([
    ui.Panel([
      ui.Label('Hoogte', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
      ui.Select({items: ['DSM', 'DTM', 'merged'], value:'merged', onChange:updateAHN}),
      ui.Panel([
        createLegendItem('808080', 'AHN', ''),
      ], null, { position: 'bottom-left', margin: '10px 0px 0px 10px' })
    ], ui.Panel.Layout.flow('vertical'), { margin: '10px 0px 0px 0px' }),
    ui.Label('', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
  ], ui.Panel.Layout.absolute(), { height: '120px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'});
  addLayerControls(mapLayerPaneldem, false, 0.9, function() { return App.DEMLayer});
  // function to create legend
  function createLegendItem(color_hex, text, smallText) {
    var color = ui.Label({style: { backgroundColor: '#' + color_hex, padding: '8px', margin: '0 0 4px 8px', border: '1px solid black' } });
    var description = ui.Label({ value: text, style: { margin: '0 0 4px 6px', fontSize: '13px' } });
    var descriptionSmall = ui.Label({ value: smallText, style: { margin: '0px 0px 0px 4px', padding: '0px', color: 'grey', fontSize: '11px'} });
    return ui.Panel({
      widgets: [color, description, descriptionSmall],
      layout: ui.Panel.Layout.Flow('horizontal'),
      style: { margin: '0px', padding: '0px', border: '0px' }
    });
  }
  // user settings
  function findClosestMatch(values_list, to_match_val) {
    var tmp_diffs = ee.List(values_list).map(function(i) {
      return ee.Number(i).divide(to_match_val).subtract(1).abs();
    });
    var diff_min = tmp_diffs.reduce(ee.Reducer.min());
    var closest_match_idx = tmp_diffs.indexOf(diff_min);
    return closest_match_idx;
  }
  function updateManual(z_mm) {
    z_mm = ee.Number.parse(z_mm);
    // get dataTables from charts
    var dataTable_v = ee.Dictionary(App.chartPanel2.widgets().get(0).getDataTable()).get('rows');
    var dataTable_z = ee.Dictionary(App.chartPanel2.widgets().get(1).getDataTable()).get('rows');
    // convert data to lists
    var volumes_mm = ee.List(dataTable_v).map(function(i) {
      var data_i = ee.List(ee.Dictionary(i).get('c'));
      return ee.List([ee.Dictionary(data_i.get(0)).get('v'), ee.Dictionary(data_i.get(1)).get('v')]);
    }).unzip();
    var waterlevels_mm = ee.List(dataTable_z).map(function(i) {
      var data_i = ee.List(ee.Dictionary(i).get('c'));
      return ee.List([ee.Dictionary(data_i.get(0)).get('v'), ee.Dictionary(data_i.get(1)).get('v')]);
    }).unzip();
    // get relevant data only
    var volumes     = ee.List(volumes_mm.get(0));
    var waterdepths = ee.List(waterlevels_mm.get(0));
    var waterlevels = ee.List(waterlevels_mm.get(1));
    // get closest matching water level and volume from user-defined depth
    var index = findClosestMatch(waterdepths, z_mm);
    App.z = ee.Number(waterlevels.get(index));
    var v = ee.Number(volumes.get(index));
    App.label = App.getLabelSelectedParameters(App.z, z_mm, v);
    App.updateWaterDepthMap(App.z, App.label);
  }
  function updatePeil(value) {
    App.p1_choice = value;
    App.updateSelection(App.selection);
    // App.updateWaterDepthMap(App.z, App.label));
  }
  var selectie_peil = ui.Select({items:['zomerpeil', 'winterpeil', 'AHN'], onChange:updatePeil, value:'zomerpeil'});
  var panel_selectie_peil = ui.Panel([ui.Label('Basisniveau waterstand:', {padding: '6px 80px 0px 4px'}), selectie_peil], ui.Panel.Layout.Flow('horizontal'));
  var invoer_mm = ui.Textbox({placeholder:'enter value', onChange:updateManual, disabled:true, style:{width:'85px'}});
  App.invoer_mm = invoer_mm;
  var panel_invoer_mm = ui.Panel([ui.Label('Handmatige invoer waterschijf (mm):', {padding: '4px 0px 0px 4px'}), invoer_mm], ui.Panel.Layout.Flow('horizontal'));
  var user_settings = ui.Panel({
    widgets: [
      ui.Label('Gebruikersinstellingen [WORK-IN-PROGRESS]:', {fontWeight: 'bold'}),
      panel_selectie_peil,
      panel_invoer_mm
    ],
    style: {border:'1px solid black', margin: '6px 0px 0px 6px', padding: '0px'}
  });
  // acknowledgement label
  var labelAcknowledgement = ui.Label({
    value: 'Deltares ©2021',
    style: {
      'backgroundColor': '#00000066',
      'color': 'white',
      'fontSize': '12px',
      // 'fontWeight': 'bold',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 12px 0px'
    }
  });
  Map.add(ui.Panel({ widgets: [labelAcknowledgement], style: { padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px',  position: 'bottom-center', 'backgroundColor': '#00000000' } }));
  // UI panels containing charts and text
  var chartPanel1 = ui.Panel([]);
  chartPanel1.style().set({ position: 'bottom-center' });
  App.chartPanel1 = chartPanel1;
  var chartPanel2 = ui.Panel([]);
  chartPanel2.style().set({ position: 'bottom-center' });
  App.chartPanel2 = chartPanel2;
  var infoPanel = ui.Panel([ui.Label(default_info_str)]);
  infoPanel.style().set({ position: 'bottom-center' });
  App.infoPanel = infoPanel;
  var infoPanel2 = ui.Panel([]);
  infoPanel2.style().set({ position: 'bottom-center' });
  App.infoPanel2 = infoPanel2;
  var infoPanel3_kwetsbaar_1 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_kwetsbaar_2 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_kwetsbaar_3 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_electra_1 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_electra_2 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_electra_3 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_milieu_1 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_milieu_2 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3_milieu_3 = ui.Label('', {fontSize: '11px', width: '80px', textAlign: 'center', margin:'0px'});//, border:'1px solid black'});
  var infoPanel3 = ui.Panel([
    ui.Label('Objecten binnen peilgebied:', {'fontWeight': 'bold'}),
    ui.Panel([
      ui.Label('totaal', {fontSize: '11px', margin:'0px 0px 0px 100px', backgroundColor:palette_flooded_objects[0]}),
      ui.Label('0 - 20 cm', {fontSize: '11px', margin:'0px 0px 0px 45px', backgroundColor:palette_flooded_objects[1]}),
      ui.Label('> 20 cm', {fontSize: '11px', margin:'0px 0px 0px 35px', color:'ffffff', backgroundColor:palette_flooded_objects[2]}),
    ], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([
      ui.Label('Kwetsbaar:', {fontSize: '11px', margin:'0px 10px 0px 10px'}), 
      infoPanel3_kwetsbaar_1,
      infoPanel3_kwetsbaar_2,
      infoPanel3_kwetsbaar_3
    ], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([
      ui.Label('Electriciteit:', {fontSize: '11px', margin:'0px 7px 0px 10px'}),
      infoPanel3_electra_1,
      infoPanel3_electra_2,
      infoPanel3_electra_3
    ], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([
      ui.Label('Milieurisico:', {fontSize: '11px', margin:'0px 5px 0px 10px'}),
      infoPanel3_milieu_1,
      infoPanel3_milieu_2,
      infoPanel3_milieu_3
    ], ui.Panel.Layout.Flow('horizontal'))
  ]);
  infoPanel3.style().set({position: 'bottom-center', shown:false});
  App.infoPanel3 = infoPanel3;
  App.infoPanel3_kwetsbaar_1 = infoPanel3_kwetsbaar_1;
  App.infoPanel3_kwetsbaar_2 = infoPanel3_kwetsbaar_2;
  App.infoPanel3_kwetsbaar_3 = infoPanel3_kwetsbaar_3;
  App.infoPanel3_electra_1 = infoPanel3_electra_1;
  App.infoPanel3_electra_2 = infoPanel3_electra_2;
  App.infoPanel3_electra_3 = infoPanel3_electra_3;
  App.infoPanel3_milieu_1 = infoPanel3_milieu_1;
  App.infoPanel3_milieu_2 = infoPanel3_milieu_2;
  App.infoPanel3_milieu_3 = infoPanel3_milieu_3;
  // list of all UI elements
  var widgetsMain = [
    titleMain,
    textInfo,
    mapLayerPanelFloodWaterAreas,
    mapLayerPanelKwetsbareobjecten,
    mapLayerPanelelectricity,
    mapLayerPaneliedinstallaties,
    mapLayerWaterDepthLegend,
    mapLayerPaneldem,
    user_settings,
    chartPanel1,
    chartPanel2,
    infoPanel3,
    infoPanel,
    infoPanel2
  ];
  // add everything to a single UI panel and add that to the UI root
  var panel = ui.Panel([
    ui.Panel(widgetsMain, ui.Panel.Layout.flow('vertical'), { stretch: 'vertical',  margin: '0px 6px 0px 6px', padding: '0px 0px 0px 0px'/*, stretch: 'vertical'*/ }),
  ], ui.Panel.Layout.flow('vertical'), { stretch: 'vertical', margin: '0px 0px 0px -7px', padding: '0px 0px 0px 0px' });
  panel.style().set({ width: '450px' });
  ui.root.insert(0, panel);
  // button to clear currently selected area(s), add to map area
  var clearSelectionButton = ui.Button('Clear Selection', function() { 
    App.selectionClickedPoints = [];
    App.selectionLayer.setEeObject(ee.Image());
    App.infoPanel.widgets().reset([ui.Label(default_info_str)]);
    App.infoPanel2.widgets().reset([]);
    // App.infoPanel3.widgets().reset([]);
    App.infoPanel3.style().set('shown', false);
    App.infoPanel3_kwetsbaar_1.setValue('');
    App.infoPanel3_kwetsbaar_2.setValue('');
    App.infoPanel3_kwetsbaar_3.setValue('');
    App.infoPanel3_electra_1.setValue('');
    App.infoPanel3_electra_2.setValue('');
    App.infoPanel3_electra_3.setValue('');
    App.infoPanel3_milieu_1.setValue('');
    App.infoPanel3_milieu_2.setValue('');
    App.infoPanel3_milieu_3.setValue('');
    App.chartPanel1.widgets().reset([]);
    App.chartPanel2.widgets().reset([]);
    App.invoer_mm.setValue(null, false);
    App.invoer_mm.setDisabled(true);
  });
  clearSelectionButton.style().set({ position: 'bottom-right'});
  Map.widgets().add(clearSelectionButton);
  App.clearSelectionButton = clearSelectionButton;
};
// adds current lat/lon coordinates and zoom level to URL (for easy sharing of exactly the same area)
App.setupUrlHandling = function() {
  // function to parse current URL
  function parseUrlParameters() {
    var lon = ui.url.get('lon', -999);
    var lat = ui.url.get('lat', -999);
    var zoom = ui.url.get('zoom', 9);
    if(lon !== -999 && lat !== -999) {
      Map.setCenter(lon, lat, zoom);
    } else {
      Map.centerObject(App.floodWaterAreas);
    }
  }
  // parse current URL
  parseUrlParameters();
  // update values when map view changes
  Map.onChangeBounds(function(o) {
    ui.url.set('lon', o.lon);
    ui.url.set('lat', o.lat);
    ui.url.set('zoom', o.zoom);
  });
};
App.visualizeDEM = function(dem) {
  // default value(s)
  if (typeof dem == 'undefined') dem = App.ahn;//.convolve(ee.Kernel.gaussian(0.5, 0.25, 'meters'));
  // palette
  var palette = palettes.crameri.lisbon[25];
  // palettes.showPalette('lisbon', palette)
  // var palette = palettes.crameri.oleron[50]
  // palettes.showPalette('oleron', palette)
  // var palette = palettes.crameri.nuuk[50]
  // palettes.showPalette('oleron', palette)
  // var palette = palettes.crameri.roma[25].slice(0).reverse()
  // palettes.showPalette('roma', palette)
  var weight = 0.4;  // wegith of Hillshade vs RGB intensity (0 - flat, 1 - HS)
  var exaggeration = 5;  // vertical exaggeration
  var azimuth = 315;  // Sun azimuth
  var zenith = 20;  // Sun elevation
  var brightness = 0.15;  // 0 - default
  var contrast = 0.05;  // 0 - default
  var saturation = 0.2; // 1 - default
  var castShadows = false;
  var demMin = -500;
  var demMax = 500;
  var demRGB = dem.visualize({ min: demMin, max: demMax, palette: palette });
  var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows);
  return rgb;
};
// adds map layers
App.addMapLayers = function() {
  App.selectionClickedPoints = [];
  // add as map layers
  App.DEMLayer = ui.Map.Layer(App.visualizeDEM(), {}, 'AHN', false);
  Map.layers().add(App.DEMLayer);
  App.floodWaterAreasLayer = ui.Map.Layer(App.floodWaterAreas.style({ color: '00ffffaa', width: 1, fillColor: '00ffff00' }), {}, 'Peilgebieden', true);
  Map.layers().add(App.floodWaterAreasLayer);
  App.selectionLayer = ui.Map.Layer(ee.Image(), {}, 'Geselecteerd gebied');
  Map.layers().add(App.selectionLayer);
  App.waterLevelImageLayer = ui.Map.Layer(ee.Image(), {}, 'Waterdiepte', true);
  Map.layers().add(App.waterLevelImageLayer);
  App.kwetsbareObjectenLayer = ui.Map.Layer(App.kwetsbareobjecten.style({color: '3cba6e', pointSize: 3, pointShape: 'square'}), {}, 'Kwetsbare objecten', false);
  Map.layers().add(App.kwetsbareObjectenLayer);
  App.electricityLayer = ui.Map.Layer(App.electricity.style({color: 'ffd000', pointSize: 3, pointShape: 'circle'}), {}, 'Electriciteitskastjes', false);
  Map.layers().add(App.electricityLayer);
  App.ied_installatiesLayer = ui.Map.Layer(App.ied_installaties.style({color: 'eaff00', pointSize: 3, pointShape: 'triangle'}), {}, 'Objecten met milieurisico', false);
  Map.layers().add(App.ied_installatiesLayer);
  App.kwetsbareObjectenFloodedLayer = ui.Map.Layer(ee.Image(), {}, 'Kwetsbare objecten binnen gebied', false);
  Map.layers().add(App.kwetsbareObjectenFloodedLayer);
  App.electricityFloodedLayer = ui.Map.Layer(ee.Image(), {}, 'Electriciteitskastjes binnen gebied', false);
  Map.layers().add(App.electricityFloodedLayer);
  App.ied_installatiesFloodedLayer = ui.Map.Layer(ee.Image(), {}, 'Objecten met milieurisico binnen gebied', false);
  Map.layers().add(App.ied_installatiesFloodedLayer);
};
// run app
App.run();
// additional settings
var hideLabels = true;
var mapStyle = [
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
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": hideLabels ? "off" : "on"
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
                "visibility": hideLabels ? "off" : "on"
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
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": hideLabels ? "off" : "on"
            },
            {
                "lightness": "32"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "2.28"
            },
            {
                "saturation": "-33"
            },
            {
                "lightness": "24"
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
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "69"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "63"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2d2d2d"
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
                "color": "#000000"
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
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3182bd"
            },
            {
                "lightness": 1
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#6baed6"
            },
            {
                "gamma": "1.5"
            }
        ]
/*
        "stylers": [
            {
                "lightness": "-100"
            },
            {
                "gamma": "0.00"
            }
        ]
*/        
    }
];
Map.setOptions('Dark', { Dark: mapStyle} )