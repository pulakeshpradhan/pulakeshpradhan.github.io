var Sekadau = ui.import && ui.import("Sekadau", "table", {
      "id": "users/masitamanessa/Palm-Sekadau"
    }) || ee.FeatureCollection("users/masitamanessa/Palm-Sekadau"),
    S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    SDK = ui.import && ui.import("SDK", "table", {
      "id": "users/masitamanessa/SDK_OWL_Block"
    }) || ee.FeatureCollection("users/masitamanessa/SDK_OWL_Block"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
var batch = require('users/fitoprincipe/geetools:batch');
var petak = Sekadau.merge(SDK);
Map.addLayer(petak);
Map.centerObject(petak);
var profilesOn = false; // status of analysis profiles
var S = ee.ImageCollection('COPERNICUS/S1_GRD').filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select(['VV','VH']).filterDate('2020-01-01','2021-03-30').filterBounds(petak);
var addNRPB = function(image) {
  var VH = image.select(['VH']);
  var VV = image.select(['VV']);
  var NRPB = VH.subtract(VV).divide(VH.add(VV)).rename('NRPB');
  return image.addBands(NRPB);
};
// create function to crop with table boundaries
var table_bounds = function(image) {
  return image.clip(petak);
};
var SClipped = S.map(table_bounds).map(addNRPB).select(['NRPB']);
var chart1 = ui.Chart.image.series(SClipped, petak, ee.Reducer.mean(), 10)
      .setOptions({
        title: 'NRPB Over Time',
        vAxis: {title: 'NRPB'},
        lineWidth: 1,
        pointSize: 3
      });
var panel = ui.Panel({style: {width: '1300px',position: 'bottom-right'}})
    .add(ui.Label('Click on the map to explore'))
var places = { 
  '01. Sekadau' : ['Sekadau'],
  '02. SDK' : ['SDK']
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    if (key[0] == 'Sekadau'){
      var petak  = Sekadau;
    }else{
      var petak  = SDK;
    }
    Map.centerObject(petak, 11);
    Map.layers().set(2, ui.Map.Layer(petak, {color: 'FF0000'}));
    //print(petak)
var allObsHar =SClipped.map(function(img) {
  var obs = img.reduceRegion({
    geometry: petak,
    reducer: ee.Reducer.median(),
    scale: 30
    });
    return img.set('NRPB', obs.get('NRPB'));
    });
  var chart1 = ui.Chart.image.series(allObsHar, petak, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NRPB Over Time',
        vAxis: {title: 'NRPB'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(2, chart1);  
  chart1.onClick(function (xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
        // Show the image for the clicked year.
        var image = ee.Image(SClipped.filter(ee.Filter.equals('system:time_start', xValue)).first()).clip(petak);
        var layer = ui.Map.Layer(image, {
                min: 0.01,
                max: 1.0,
                palette: [
                  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                  '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                  '012E01', '011D01', '011301'
                ],
            bands: 'NRPB'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
    });
  }    
});
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var petak = Sekadau.filterBounds(click_point);
  Map.layers().set(1, ui.Map.Layer(click_point, {color: 'FF0000'}));
  Map.layers().set(2, ui.Map.Layer(petak, {color: 'FF0000'}));
  print(petak)
  var allObsHar = SClipped.map(function(img) {
  var obs = img.reduceRegion({
    geometry: petak,
    reducer: ee.Reducer.median(),
    scale: 30
    });
    return img.set('NRPB', obs.get('NRPB'));
    });
  var chart1 = ui.Chart.image.series(allObsHar, petak, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NRPB Over Time',
        vAxis: {title: 'NRPB'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(2, chart1);  
  chart1.onClick(function (xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
        // Show the image for the clicked year.
        var image = ee.Image(SClipped.filter(ee.Filter.equals('system:time_start', xValue)).first()).clip(petak);
        var layer = ui.Map.Layer(image, {
                min: 0.01,
                max: 1.0,
                palette: [
                  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                  '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                  '012E01', '011D01', '011301'
                ],
            bands: 'NRPB'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
    });
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
panel.widgets().set(1, select);
Map.add(panel);