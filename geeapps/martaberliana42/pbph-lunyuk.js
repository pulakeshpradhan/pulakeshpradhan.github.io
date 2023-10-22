var SUMBAWA = ui.import && ui.import("SUMBAWA", "table", {
      "id": "projects/ee-martaberliana42/assets/PBPH"
    }) || ee.FeatureCollection("projects/ee-martaberliana42/assets/PBPH");
var shp = ee.FeatureCollection(SUMBAWA); 
Map.setCenter (117.20502023228069,-8.970456346697238);
print (shp);
var text = require('users/gena/packages:text');
var styling= {color:'black',fillColor:'#ffffff00'};
var Scale = Map.getScale()*2;
var labels = shp.map(function(feat){
  feat = ee.Feature(feat);
  var name = ee.String (feat.get("NAME_1"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid,Scale,{
    fontSize: 10,
    textColor:'black',
    OutlineWidth:2,
    OutlineColor:'red' 
  });
  return t;
});
var Labels_Final = ee.ImageCollection(labels);
Map.addLayer(shp.style(styling),{},"Batas PBPH");