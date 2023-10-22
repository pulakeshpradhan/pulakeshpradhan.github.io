var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var nepal = countries.filterMetadata('country_na','equals','Nepal');
var nasadem = ee.Image("NASA/NASADEM_HGT/001").select('elevation')
var hillshade = ee.Terrain.hillshade(nasadem);
var clay = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02")
  .select('b0').rename('Clay')
var sand = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02")
  .select('b0').rename('Sand')
var silt = ee.Image(100).subtract(clay).subtract(sand).rename('Silt')
var combined = sand.addBands(silt).addBands(clay)
var mask = combined.select('Silt').mask().updateMask(nasadem)
var basemap = {
  'basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#202020' }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { color: '#303030' }
      ]
    },
    {
      featureType: 'administrative',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
var panel = ui.Panel({
  style: {
    width: '350px',
    backgroundColor: '202020',
    position: 'bottom-left'
  }
});
var panelCoordSave = ui.Panel({
  style: {
    width: '0',
    backgroundColor: '00000000',
    position: 'top-center'
  }
});
var panelCoordSaveTwo = ui.Panel({
  style: {
    width: '0',
    backgroundColor: '00000000',
    position: 'top-center'
  }
});
function colorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '300x15',
      format: 'png',
      palette: palette
    },
    style: {margin: '3px 10px 10px 10px', backgroundColor: '00000000'},
  });
}
var gamma = ['202020','white'];
var bar = {palette: gamma};
var startColor = '#fae039';
var endColor = '#ff5900';
var lineColor = 'white';
var empty = ee.Image().byte();
var labels = ui.Panel([
    ui.Label('0', {margin: '0 10px 10px 10px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'}),
    ui.Label('Elevation (m)', {margin: '0 95px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'}),
    ui.Label('3000', {margin: '0', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'})
  ], ui.Panel.Layout.flow('horizontal'), {backgroundColor: '202020'}
);
var chartDisplay = {
  fontSize: 11,
  curveType: 'function',
  format: 'short',
  backgroundColor: '202020',
  vAxis: { textStyle: { fontSize: 12, color: 'e8e8e8'}},
  hAxis: { textPosition: 'none' },
  legend: { textStyle: {color: 'e8e8e8'}},
  series: {0: { color: 'white' }}
};
var chartDisplay2 = {
  fontSize: 11,
  curveType: 'function',
  format: 'short',
  backgroundColor: '202020',
  vAxis: { textStyle: { fontSize: 12, color: 'e8e8e8'}, viewWindow: {max:100}},
  hAxis: { textPosition: 'none' },
  legend: { textStyle: {color: 'e8e8e8'}},
  series: {0: { color: 'ff6614' },
    1: { color: 'dbd28a' },
    2: { color: '995d3d' }
  }
};
ui.root.insert(0,panel);
panel.widgets().set(0,ui.Label('Soil fraction and elevation profiler', {fontWeight: 'bold', fontSize: '20px', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(1,ui.Label('Click two points to generate elevation and soil fraction profiles', {fontWeight: 'bold', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(2,colorBar(bar.palette));
panel.widgets().set(3,labels);
panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
panel.widgets().set(6,ui.Label('Distance: ',{color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(7,ui.Label('Start and end point must contain data - turn on the no data layer to visualize data gaps (depicted in crimson red). Soils data (sand/silt/clay fraction) from OpenLandMap and elevation data from NASADEM.', {fontSize: '12px', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(8,ui.Label('© 2021 Cartoscience. Created by Brad G. Peter and Zachary Yates, University of Alabama.', {fontSize: '10px', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(9,panelCoordSave);
panel.widgets().set(10,ui.Label(''))
panel.widgets().set(11,ui.Label(''))
panel.widgets().set(12,ui.Label(''))
panel.widgets().set(13,ui.Label(''))
var hollow = {color: endColor, width: 1, fillColor: '00000000'}
Map.setOptions('basemap',basemap)
Map.centerObject(nepal,5)
Map.layers().set(0, ui.Map.Layer(sand, {min: 0, max: 100}, 'Sand',false));
Map.layers().set(1, ui.Map.Layer(silt, {min: 0, max: 100}, 'Silt',false));
Map.layers().set(2, ui.Map.Layer(clay, {min: 0, max: 100}, 'Clay',false));
Map.layers().set(3, ui.Map.Layer(hillshade.resample('bilinear'), {min: 170, max: 190}, 'Hillshade'));
Map.layers().set(4, ui.Map.Layer(nasadem, {/*palette: ['abd7aa', 'd6e8b8', 'f9f7c6', 'faf4be', 'facbb7', 'd8bac9', 'f4e0e6', 'ffffff'],*/min: 100, max: 3000, opacity: 0.7}, 'Elevation'));
Map.layers().set(5, ui.Map.Layer(mask.updateMask(mask.eq(0)), {palette:'crimson'}, 'No data',false));
Map.layers().set(6, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
Map.layers().set(7, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
Map.layers().set(8, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
//Map.layers().set(9, ui.Map.Layer(nepal.style(hollow),{},'Nepal'));
Map.onClick(function(coords) {
  var lon = coords.lon;
  var lat = coords.lat;
  var point = ee.Geometry.Point(lon, lat);
  if (Map.layers().get(8).get('name') === 'placeholder') {
    Map.layers().set(8, ui.Map.Layer(ee.FeatureCollection(point).style({color: startColor, fillColor: startColor}), {}, 'start'));
    panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
    var coordSave = ui.Label({value: lon+','+lat, style: {color: '00000000', backgroundColor: '00000000'}});
    panelCoordSave.widgets().set(0, coordSave);
  } else if (Map.layers().get(7).get('name') === 'placeholder') {
      var p = ee.List(panelCoordSave.widgets().get(0).get('value').split(','));
      var p1 = ee.Geometry.Point(ee.Number.parse(p.get(0)),ee.Number.parse(p.get(1)));
      var line = ee.Geometry.LineString([p1, point], null, false);
      Map.layers().set(6, ui.Map.Layer(line, {color: lineColor}, 'line'));
      Map.layers().set(7, ui.Map.Layer(ee.FeatureCollection(point).style({color: endColor, fillColor: endColor}), {}, 'end'));
    var xList = ee.List.sequence(p1.coordinates().get(0), lon, null, 500);
      var yList = ee.List.sequence(p1.coordinates().get(1), lat, null, 500);
      var points = ee.FeatureCollection(xList.map(function(xCoord){
        var yCoord = yList.get(xList.indexOf(xCoord));
        return ee.Feature(ee.Geometry.Point([xCoord, yCoord]));
      }));
      var profile = nasadem.reduceRegions(points, ee.Reducer.first(), 10);
      var rename = profile.map(function(each) {
        return each.select(['first'],['Elevation profile (m)']);
      });
      var soilProfile = combined.reduceRegions(points, ee.Reducer.first(), 10);
      panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
      panel.widgets().set(6,ui.Label('Distance: '+ee.Feature(line).length(1).multiply(0.001).getInfo().toFixed(3)+' km',{color: 'e8e8e8', backgroundColor: '202020'}));
      panel.widgets().set(9,ui.Label('Sand, silt, clay fraction (%) at 0 cm depth',{color: 'e8e8e8', backgroundColor: '202020'}));
      panel.widgets().set(10,ui.Chart.feature.byFeature(soilProfile).setOptions(chartDisplay2));
      panel.widgets().set(11,ui.Chart.feature.byFeature(rename).setOptions(chartDisplay));
    } else if (Map.layers().get(6).get('name') === 'line') {
        Map.layers().set(6, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        Map.layers().set(7, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        Map.layers().set(8, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        var coordSaveTwo = ui.Label({value: lon+','+lat, style: {color: '00000000', backgroundColor: '00000000'}});
        panelCoordSave.widgets().set(0, coordSaveTwo);
        Map.layers().set(8, ui.Map.Layer(ee.FeatureCollection(point).style({color: startColor, fillColor: startColor}), {}, 'start'));
        panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
        panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
        panel.widgets().set(6,ui.Label('Distance: ',{color: 'e8e8e8', backgroundColor: '202020'}));
        panel.remove(panel.widgets().get(9));
        panel.remove(panel.widgets().get(9));
        panel.remove(panel.widgets().get(9));
    }
});