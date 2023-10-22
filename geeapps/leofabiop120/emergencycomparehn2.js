// Created by Alfonso Sanchez-Paus
// If you improve it please share the code!
// Improvements from the example on ui.SplitPanel
var compare = require("users/leofabiop120/Smart_Fire:EmergencyCompareInternal_v2");
var init = function(){
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([compare.getSplitPanel( true, true) ]);
};
init();
// When everything is loaded focus on the default area
// FOR TESTING 
//var geoJson = ui.url.get('geoJson', '{"type":"MultiLineString","coordinates":[[[12.872637555545191,42.23772842054682],[12.87418250793777,42.23768870441539],[12.87418250793777,42.238050120290154],[12.873227641528468,42.23811167993061],[12.87328933233581,42.23821891270935],[12.873013064807276,42.238308273219054],[12.872637555545191,42.23772842054682]]]}');
var geoJson = ui.url.get('geoJson');
if ( geoJson ){
  var zoom = ui.url.get('zoom', 12);
  var obj = JSON.parse(geoJson);
  var preselected_geometry = ee.Geometry( obj );
  compare.preselectImageryOnGeometry( obj , 1);
  compare.drawPolygon( preselected_geometry, zoom );
}else{
  //var selectedArea = ui.url.get('selectedArea', '{"location":[-95.2,34.8],"zoomLevel":12,"before":{"source":{"name":"Sentinel-2 False 20 m (nir-swir1-red)"},"date":"2017-2-10"},"after":{"source":{"name":"Sentinel-1 SAR Radar"},"date":"2019-1-11"}}');
  var selectedArea = ui.url.get('selectedArea' );
  if ( selectedArea ){
    compare.usePredefinedObject( JSON.parse(selectedArea) ); 
  }else{
    compare.setArea( compare.DEFAULT_AREA );
  }
}