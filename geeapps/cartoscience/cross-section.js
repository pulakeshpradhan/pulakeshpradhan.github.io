var us = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filterMetadata('country_co','equals','US');
var ned = ee.Image('USGS/NED').clip(us);
var hillshade = ee.Terrain.hillshade(ned);
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
    width: '315px',
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
var startColor = '#E84A8E';
var endColor = '#42B3FF';
var lineColor = 'white';
var empty = ee.Image().byte();
var labels = ui.Panel([
    ui.Label('Low', {margin: '0 10px 10px 10px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'}),
    ui.Label('High', {margin: '0 225px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'})
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
  series: {0: { color: lineColor }}
};
ui.root.insert(0,panel);
panel.widgets().set(0,ui.Label('Elevation cross section viewer', {fontWeight: 'bold', fontSize: '20px', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(1,ui.Label('Click two points to generate elevation profile', {fontWeight: 'bold', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(2,colorBar(bar.palette));
panel.widgets().set(3,labels);
panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
panel.widgets().set(6,ui.Label('Distance: ',{color: 'e8e8e8', backgroundColor: '202020'}));
//panel.widgets().set(7,ui.Label('Average: ',{color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(7,ui.Label('© 2019 Cartoscience', {fontSize: '10px', color: 'e8e8e8', backgroundColor: '202020'}));
panel.widgets().set(8,panelCoordSave);
Map.setOptions('basemap',basemap).setCenter(-86.46, 40.83, 5.5);
Map.layers().set(0, ui.Map.Layer(hillshade.resample('bilinear'), {min: 175, max: 185}, 'hillshade'));
Map.layers().set(1, ui.Map.Layer(ned.resample('bilinear'), {min: 100, max: 700, opacity: 0.7}, 'elevation'));
Map.layers().set(2, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
Map.layers().set(3, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
Map.layers().set(4, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
Map.onClick(function(coords) {
  var lon = coords.lon;
  var lat = coords.lat;
  var point = ee.Geometry.Point(lon, lat);
  if (Map.layers().get(4).get('name') === 'placeholder') {
    Map.layers().set(4, ui.Map.Layer(ee.FeatureCollection(point).style({color: startColor, fillColor: startColor}), {}, 'start'));
    panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
    var coordSave = ui.Label({value: lon+','+lat, style: {color: '00000000', backgroundColor: '00000000'}});
    panelCoordSave.widgets().set(0, coordSave);
  } else if (Map.layers().get(3).get('name') === 'placeholder') {
      var p = ee.List(panelCoordSave.widgets().get(0).get('value').split(','));
      var p1 = ee.Geometry.Point(ee.Number.parse(p.get(0)),ee.Number.parse(p.get(1)));
      var line = ee.Geometry.LineString([p1, point], null, false);
      Map.layers().set(2, ui.Map.Layer(line, {color: lineColor}, 'line'));
      Map.layers().set(3, ui.Map.Layer(ee.FeatureCollection(point).style({color: endColor, fillColor: endColor}), {}, 'end'));
    var xList = ee.List.sequence(p1.coordinates().get(0), lon, null, 500);
      var yList = ee.List.sequence(p1.coordinates().get(1), lat, null, 500);
      var points = ee.FeatureCollection(xList.map(function(xCoord){
        var yCoord = yList.get(xList.indexOf(xCoord));
        return ee.Feature(ee.Geometry.Point([xCoord, yCoord]));
      }));
      var profile = ned.reduceRegions(points, ee.Reducer.first(), 10);
      var rename = profile.map(function(each) {
        return each.select(['first'],['Elevation profile (m)']);
      });
      print(profile);
      panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
      panel.widgets().set(6,ui.Label('Distance: '+ee.Feature(line).length(1).multiply(0.001).getInfo().toFixed(3)+' km',{color: 'e8e8e8', backgroundColor: '202020'}));
      //panel.widgets().set(7,ui.Label('Average: '+profile.aggregate_mean('first').getInfo().toFixed(3)+' m',{color: 'e8e8e8', backgroundColor: '202020'}));
      panel.widgets().set(8,ui.Chart.feature.byFeature(rename).setOptions(chartDisplay));
    } else if (Map.layers().get(2).get('name') === 'line') {
        Map.layers().set(2, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        Map.layers().set(3, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        Map.layers().set(4, ui.Map.Layer(ee.Image(0),{opacity:1e-100},'placeholder'));
        var coordSaveTwo = ui.Label({value: lon+','+lat, style: {color: '00000000', backgroundColor: '00000000'}});
        panelCoordSave.widgets().set(0, coordSaveTwo);
        Map.layers().set(4, ui.Map.Layer(ee.FeatureCollection(point).style({color: startColor, fillColor: startColor}), {}, 'start'));
        panel.widgets().set(4,ui.Panel([ui.Label({value: 'Start',style: {fontWeight: 'bold', color: startColor, backgroundColor: '202020'}}),ui.Label(' lon: '+lon.toFixed(3)+', lat: '+lat.toFixed(3),{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
        panel.widgets().set(5,ui.Panel([ui.Label({value: 'End',style: {fontWeight: 'bold', color: endColor, backgroundColor: '202020'}}),ui.Label('',{margin: '8px 0 0 -1px', color: 'e8e8e8', backgroundColor: '202020'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: '202020'}));
        panel.widgets().set(6,ui.Label('Distance: ',{color: 'e8e8e8', backgroundColor: '202020'}));
        //panel.widgets().set(7,ui.Label('Average: ',{color: 'e8e8e8', backgroundColor: '202020'}));
        panel.remove(panel.widgets().get(8));
    }
});