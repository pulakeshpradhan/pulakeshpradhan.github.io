var area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -82.10429687500002,
                -0.6320327192876249
              ],
              [
                -80.17070312500002,
                -8.510730939246985
              ],
              [
                -70.76640625000002,
                -14.706142410171049
              ],
              [
                -66.10820312500002,
                -14.876098719703553
              ],
              [
                -58.28593750000001,
                -15.13078185555212
              ],
              [
                -50.72734375000001,
                -11.453432088204371
              ],
              [
                -48.35429687500001,
                -7.64054908594611
              ],
              [
                -45.36601562500001,
                -4.406990573764494
              ],
              [
                -46.42070312500001,
                -2.1256983446821627
              ],
              [
                -48.26640625000001,
                1.3893026746324695
              ],
              [
                -51.51835937500001,
                7.171421526323513
              ],
              [
                -60.57109375000001,
                11.420477385426926
              ],
              [
                -80.34648437500002,
                1.4771657944126853
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-82.10429687500002, -0.6320327192876249],
          [-80.17070312500002, -8.510730939246985],
          [-70.76640625000002, -14.706142410171049],
          [-66.10820312500002, -14.876098719703553],
          [-58.28593750000001, -15.13078185555212],
          [-50.72734375000001, -11.453432088204371],
          [-48.35429687500001, -7.64054908594611],
          [-45.36601562500001, -4.406990573764494],
          [-46.42070312500001, -2.1256983446821627],
          [-48.26640625000001, 1.3893026746324695],
          [-51.51835937500001, 7.171421526323513],
          [-60.57109375000001, 11.420477385426926],
          [-80.34648437500002, 1.4771657944126853]]]);
// CBookie
// Spatially explicit carbon bookkeeping model using remote sensing data
// Time Series Based Bookkeeping
// ---------------------------------------------------------------
// Imports and predefined variables:
var listener = 0;
var utCommon = require('users/xjtang/cbookie:Utilities/Common');
var utCarbon = require('users/xjtang/cbookie:Utilities/Carbon');
var utTS = require('users/xjtang/cbookie:Utilities/Time Series');
var utParams = require('users/xjtang/cbookie:Utilities/Parameters');
var select = ee.FeatureCollection('users/xjtang/cms/area/select');
var AGB_30 = ee.Image('users/mfarina/Biomass_Data_MapV1/Pantropical_Biomass_30m_MapV1');
var AGB_UC = ee.Image('users/mfarina/Biomass_Data_MapV1/Pantropical_Biomass_Uncertainty_30m_MapV1');
var AGB = AGB_30.addBands(AGB_30.multiply(AGB_UC.add(100)).divide(100)).rename(['AGB', 'UC']).clip(area);
var modelParams = ee.Dictionary(utParams.getModelParams);
var AGBParams = ee.Dictionary(utParams.getAGBParams);
var fluxParams = ee.Dictionary(utParams.getFluxParams);
var poolParams = ee.Dictionary(utParams.getPoolParams);
var fluxParamsUC = ee.Dictionary(utCommon.getFluxUC(fluxParams));
var poolParamsUC = ee.Dictionary(utCommon.getPoolUC(poolParams));
var bm_pal = '75322B, 8e562d, b47b3e, da8c19, ef9e0b, ffc011, ffdb2d, ffe215, e3ef46, d5e400, c9d800, becc00, b4c200, B7B95B, B2B659, AFB457, ABB156, A6AE53, A3AB52, A1AA51, 9FA950, 9EA850, 9CA74F, 9BA64E, 9AA54E, 99A44D, 95A24C, 92A04A, 909E49, 8C9C48, 8B9A47, 869745, 859745, 839544, 839543, 819443, 7E9241, 7A8F40, 778D3E, 758C3E, 758B3D, 728A3C, 71893C, 70883B, 6F873B, 6D863A, 6A8438, 678237, 648036, 627E37, 607D34, 5E7B33, 5A7831, 577630, 53742E, 50722D, 4F712C, 4E702C, 4C6F2B, 4A6D2A, 496D29, 486C29, 486C29, 476B29, 466A28, 426827, 3E6525, 3B6323, 3A6223, 396222, 386122, 355F21, 345E22, 315C1F, 305B1E, 2C591D, 2B581C, 28561B, 27551A, 255419, 245319, 235218, 225218, 225118, 215118, 205017, 1F4F17, 1C4E16, 1B4D15, 1A4C15, 194C14, 184A14, 164913, 154812, 124711, 114610, 114610, 114610, 114610'; 
var RdYlGn = 'a50026, d73027, f46d43, fdae61, fee08b, ffffbf, d9ef8b, a6d96a, 66bd63, 1a9850, 006837';
var lc_pal = 'black, green, cyan, blue, grey, white'; 
var bm_vis = {'max':400, 'min':0, 'palette': bm_pal};
var em_vis = {'max':-200, 'min':200, 'palette': RdYlGn};
var ut_vis = {'max':-200, 'min':200, 'palette': RdYlGn};
var nt_vis = {'max':-200, 'min':200, 'palette': RdYlGn};
var lc_vis = {'max':5, 'min':0, 'palette': lc_pal};
var plotStart = ee.Number(2001);
var plotEnd = ee.Number(modelParams.get('modelEnd'));
var modelEnd = ee.Number(2020);
var nSeg = ee.Number(modelParams.get('nSeg'));
var carbonScale = ee.Number(modelParams.get('carbonScale'));
var lc = utTS.getLC().clip(area);
var AGB_filled = utCarbon.getInitialAGB(AGB, lc.select('.*1'), AGBParams, modelParams);
var proj = lc.projection();
var pSize = proj.nominalScale();
var sizeScale = pSize.multiply(pSize).divide(30*30);
var ts = ee.Image(0);
var flux = ee.Image(0);
// ---------------------------------------------------------------
// Main functions:
var loadData = function() {
  var ccd = ee.ImageCollection('projects/CCDC/v2').filterMetadata('system:index', 'starts_with', 'z').mosaic(); 
  var ts = utTS.genTimeSeries(ccd, lc, nSeg);
  var lastClass = ee.Image(0).rename('lastClass');
  var whichSeg = ee.Image(0).rename('whichSeg');
  return ts.addBands(lastClass).addBands(whichSeg);
};
var plotbook = function(coords) {
  resetTSPanel();
  tsPanel.add(ui.Label('Booking...'));
  var proj = ee.Projection("EPSG:4326").atScale(30);
  var pixel = ee.Geometry.Point([coords.lon, coords.lat]);
  utCommon.addPixel(mapPanel, coords, 0.000135, '0000FF', 'Clicked');
  var tsPixel = ts;
  var dates = ee.List.sequence(plotStart, plotEnd, 1);
  var fluxTable = dates.map(function(t){
    t = ee.Number(t);
    var dateString = ee.Date.fromYMD(t.floor(), 1, 1).advance(t.subtract(t.floor()), 'year').format("YYYY-MM-dd");
    var pools = utCarbon.TStoPools(tsPixel, t, AGB_filled.select('AGB'), modelParams, fluxParams, poolParams); 
    var poolsUC = utCarbon.TStoPools(tsPixel, t, AGB_filled.select('AGBUC'), modelParams, fluxParamsUC, poolParamsUC); 
    var flux = utCarbon.getCarbonFlux(pools);
    var fluxUC = utCarbon.getCarbonFlux(poolsUC).subtract(flux);
    var fluxPixel = flux.reduceRegion({
      reducer: ee.Reducer.first(), 
      geometry: pixel, 
      crs: proj});
    var UCPixel = fluxUC.reduceRegion({
      reducer: ee.Reducer.first(), 
      geometry: pixel, 
      crs: proj});
    var emission = ee.Number(fluxPixel.get('Emission')).multiply(-1);
    var emissionCI1 = emission.add(ee.Number(UCPixel.get('Emission')));
    var emissionCI2 = emission.subtract(ee.Number(UCPixel.get('Emission')));
    var uptake = ee.Number(fluxPixel.get('Uptake')).multiply(-1);
    var uptakeCI1 = uptake.add(ee.Number(UCPixel.get('Uptake')));
    var uptakeCI2 = uptake.subtract(ee.Number(UCPixel.get('Uptake')));
    var net = ee.Number(fluxPixel.get('Net')).multiply(-1);
    var netCI1 = net.add(ee.Number(UCPixel.get('Net')));
    var netCI2 = net.subtract(ee.Number(UCPixel.get('Net')));
    return [dateString, emission, uptake, net, emissionCI1, emissionCI2, uptakeCI1, uptakeCI2, netCI1, netCI2];
  });
  fluxTable.evaluate(function(t, e) {
    var chart = utCommon.getChart(t, coords.lat, coords.lon);
    resetTSPanel();
    tsPanel.add(chart);
  });
};
var runBook = function(coords) {
  saveButton.setDisabled(false);
  var flux = ee.Image("users/xjtang/cbookie/amazon_carbon");
  var net = flux.select('Net').multiply(-1);
  net = net.updateMask(net.abs().gt(10));
  var emission = flux.select('Emission').multiply(-1);
  emission = emission.updateMask(emission.gt(10));
  var uptake = flux.select('Uptake').multiply(-1);
  uptake = uptake.updateMask(uptake.lt(-10));
  mapPanel.addLayer(emission, em_vis, "Emission (Mg/ha)");
  mapPanel.addLayer(uptake, ut_vis, "Uptake (Mg/ha)");
  mapPanel.addLayer(net, nt_vis, "Net (Mg/ha)");
  return flux;
};
var resetTSPanel = function() {
  tsPanel.clear();
  utCommon.removeLayer(mapPanel, 'Clicked');
};
var resetAll = function() {
  resetTSPanel();
  utCommon.removeLayer(mapPanel, 'Net');
  utCommon.removeLayer(mapPanel, 'Emission');
  utCommon.removeLayer(mapPanel, 'Uptake');
  bookButton.setDisabled(true);
  runButton.setDisabled(true);
  saveButton.setDisabled(true);
  loadButton.setDisabled(false);
  resetButton.setDisabled(true);
  flux = ee.Image(0);
  ts = ee.Image(0);
};
// ---------------------------------------------------------------
// UIs:
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setCenter(-71.98, 0.876, 6);
mapPanel.setOptions('SATELLITE');
  // menu panel
var loadButton  = ui.Button('Load');
var resetButton = ui.Button('Reset');
var bookButton = ui.Button('Book');
var runButton = ui.Button('Run');
var saveButton = ui.Button('Save');
var menuSet = ui.Panel([loadButton, resetButton, bookButton, runButton, saveButton], 
                        ui.Panel.Layout.Flow('vertical'));
var menuPanel = ui.Panel({
  widgets: [ui.Label('Menu'), menuSet],
  layout: ui.Panel.Layout.Flow('vertical'),
  style: {width: '10%'}});
  // ts panel
var tsPanel = ui.Panel({
  widgets: [],
  style: {position: 'bottom-right', width: '90%'}});
  // ui panel
var controlPanel = ui.Panel({
  style: {height: '30%'},
  widgets:[ui.SplitPanel(tsPanel, menuPanel, 'horizontal', false)]});
var mapPanel2 = ui.Panel({
  style: {height: '70%'},
  widgets:[mapPanel]});
var uiPanel = ui.SplitPanel(mapPanel2, controlPanel, 'vertical');
// ---------------------------------------------------------------
// Runtime functions:
loadButton.onClick(function() {
  ts = loadData();
  resetButton.setDisabled(false);
  bookButton.setDisabled(false);
  runButton.setDisabled(false);
  loadButton.setDisabled(true);
});
bookButton.onClick(function() {
  if (listener == 1) {
    bookButton.setLabel('Book');
    listener = 0;
  } else {
    bookButton.setLabel('Cancel');
    listener = 1;
  }
});
mapPanel.onClick(function(coords) {
  if (listener == 1) {
    plotbook(coords);
  }
});
runButton.onClick(function() {
  flux = runBook();
});
saveButton.onClick(function() {
  Export.image.toDrive({
    image: flux, 
    description: 'SaveFlux', 
    region: area, 
    crs: ee.String(proj.crs()).getInfo(),
    scale: ee.Number(pSize).getInfo(),
    maxPixels: 80000000000});
});
resetButton.onClick(function() {
  resetAll();
});
// ---------------------------------------------------------------
// Initialization:
ui.root.clear();
ui.root.add(uiPanel);
resetButton.setDisabled(true);
bookButton.setDisabled(true);
runButton.setDisabled(true);
saveButton.setDisabled(true);
mapPanel.addLayer(AGB_filled.select('AGB'), bm_vis, "AGB (Mg/ha)");
mapPanel.addLayer(area, {color: 'red'}, 'Study Area');
mapPanel.addLayer(lc.select('.*1'), lc_vis, 'Land Cover');
// End