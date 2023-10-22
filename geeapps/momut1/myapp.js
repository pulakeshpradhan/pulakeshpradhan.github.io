var lucas = ui.import && ui.import("lucas", "table", {
      "id": "JRC/LUCAS_HARMO/THLOC/V1"
    }) || ee.FeatureCollection("JRC/LUCAS_HARMO/THLOC/V1");
// Add the FC as a View 
var fvLayer = ui.Map.FeatureViewLayer('JRC/LUCAS_HARMO/THLOC/V1_FeatureView');
var visParams = {
  pointSize: 8,
  color: '808080',
  pointFillColor: {
    property: 'revisit',
    mode: 'linear',
    palette: ['eeeeee', 'dddddd', 'cccccc', 'bbbbbb', 'aaaaaa'],
    min: 0,
    max: 5
  }
};
fvLayer.setVisParams(visParams);
fvLayer.setName('LUCAS revisit');
Map.setCenter(3.8233, 40.609, 3);
Map.add(fvLayer);
//print(lucas.limit(5))
// Add the FC and filter on Belgium and a point revisit of 5
var lucas_filtered = lucas.filter('nuts0 == "BE"');
//var lucas_filtered = lucas.filter(ee.Filter.eq('nuts0', 'BE'));
var lucas_filtered = lucas_filtered.filter(ee.Filter.eq('revisit', 5));
// Display
//Map.addLayer(lucas_filtered, {}, 'LUCAS revisit 5 in Belgium');
Map.addLayer(lucas_filtered, {color: '000000'}, 'LUCAS revisit 5 in Belgium');
Map.setCenter(4.4765, 50.5011, 6);
// Get all the forests of Belgium in 2006
var lucas_C = lucas_filtered
  .filter("year== 2006")
  .filter("letter_group== 'C'");
//print(lucas_C);
// Display
//Map.addLayer(lucas_C, {}, 'Forests in Belgium in 2006');
Map.addLayer(lucas_C, {color: '008000'}, 'Forests in Belgium in 2006');
// Get all the cropland of Belgium in 2018
var lucas_B = lucas_filtered
  .filter("year== 2018")
  .filter("letter_group== 'B'");
//print(lucas_B);
//Map.addLayer(lucas_B, {}, 'Cropland in Beligum in 2018');
Map.addLayer(lucas_B, {color: 'FFFF00'}, 'Cropland in Beligum in 2018');
//simple join the two to get the intersection
var leftProperty = 'point_id';
var rightProperty = 'point_id';
var joinFilter = ee.Filter.equals(
        {leftField: leftProperty, rightField: rightProperty}); 
var join_CnB = ee.Join.simple().apply({
  primary: lucas_B,
  secondary: lucas_C,
  condition: joinFilter
});
//print(join_CnB);
//Map.addLayer(join_CnB, {}, 'Forests converted to cropland in Belgium');
Map.addLayer(join_CnB, {color: 'FF0000'}, 'Forests converted to cropland in Belgium');
// add the map stuff
// Configure the map.
Map.style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click to get the image for this point')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var f = lucas_filtered.filterBounds(point.buffer(100));
  print(f);
  /*
  var f_2006 = f.filter("year== 2006");
  print(f_2006.select('file_path_gisco_point').toList(1));
  var f_2018 = f.filter("year== 2018");
  print(f_2018.select('file_path_gisco_point').toList(1));
  */
  //print(f_2018.get('file_path_gisco_point'));
  //var f_giscoPoint = f.get('file_path_gisco_point');
  //print(f_giscoPoint);
  //var url_pointImage = lucas_B.select('file_path_gisco_point');
  //print(url_pointImage);
  /*// Request the value from the server.
  url_pointImage.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Mean NDVI: ' + result.toFixed(2),
    }));
  });*/
});