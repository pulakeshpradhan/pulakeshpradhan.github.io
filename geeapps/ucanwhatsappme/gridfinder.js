var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
var lon = ui.Textbox({
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    lon.setValue(value);
    return(value);
  }
});
Map.add(lon);
var lat = ui.Textbox({
  placeholder: 'Enter latitude here...',
  onChange: function(value) {
    lat.setValue(value);
    return(value);
  }
});
Map.add(lat);
var Lo;
var La;
var button = ui.Button({
  label: 'Go to Location',
  onClick: function() {
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La,13);
    var geom = ee.Geometry.Point(Lo, La);
    Map.addLayer(geom);
    var features = ee.FeatureCollection([
    ee.Feature(ee.Geometry.Point(Lo, La), {name: 'Voronoi'}),
     ]);
     Export.table.toDrive({
      collection: features,
      description:'vectorsToDriveExample',
      fileFormat: 'CSV'
      });
    var downloadUrl = features.getDownloadURL({
  format: 'CSV',
  filename: 'Location'
});
    print('URL for downloading FeatureCollection as CSV', downloadUrl);
// make a function to export on command
//var button = ui.Button('Click to Export', downloadUrl);
//Map.add(button)
  }
});
Map.add(button);
/*
var button3 = ui.Button({
  label: 'Generate Download Link',
  onClick: function() {
    //Map.clear()
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    var features = ee.FeatureCollection([
    ee.Feature(ee.Geometry.Point(Lo, La), {name: 'Voronoi'}),
     ]);
    var downloadUrl = features.getDownloadURL({
  format: 'CSV',
  filename: 'Location'
});
    //print('URL for downloading FeatureCollection as CSV', downloadUrl);
    //Map.add(ui.Label(downloadUrl));
    //Map.add(ui.Label(downloadUrl));
    //Map.add(ui.Label(downloadUrl));
  }
});
//Map.add(button3);
*/
//ee.reset()
//var resetButton = ui.Button('Reset Map',  ee.reset());
//Map.add(resetButton);
//var newMap = ui.root.widgets().get(0)
   // var refresh = ui.Button({
  //label: 'refresh', 
  //onClick: function () {
  //Map.remove(button3)
 // }
///});
//Map.add(refresh);