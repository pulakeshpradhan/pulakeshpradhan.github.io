var table = ee.FeatureCollection("users/canal/concesiones_forestales_serfor");
var CMI_WGS84_17S =ee.FeatureCollection('users/canal/CMI_WGS84_17S');
var CMI_WGS84_18S =ee.FeatureCollection('users/canal/CMI_WGS84_18S');
var CMI_WGS84_19S =ee.FeatureCollection('users/canal/CMI_WGS84_19S');
var ANP=ee.FeatureCollection('users/canal/ANP');
var cuenca_amazonas=ee.FeatureCollection('users/canal/limite');
var geobosques=ee.FeatureCollection('users/canal/concesiones_forestales_geobosques');
var serfor=ee.FeatureCollection('users/canal/concesiones_forestales_serfor');
Map.addLayer(CMI_WGS84_17S,{color: '0000ff'},'Catastro minero 17S');
Map.addLayer(CMI_WGS84_18S,{color: '0000ff'},'Catastro minero 18S');
Map.addLayer(CMI_WGS84_19S,{color: '0000ff'},'Catastro minero 19S');
Map.addLayer(ANP,{},'Area naturales protegidas');
Map.addLayer(cuenca_amazonas,{},'Cuenca amazonica');
Map.addLayer(geobosques,{color: '008f39'},'Conseciones forestales geobosques');
Map.addLayer(serfor,{color: '54ff1c'},'Conseciones forestales serfor');
var mineria_array = [
  ee.Feature(CMI_WGS84_17S.geometry(), {name: 'Catastro minero'}),
  ee.Feature(CMI_WGS84_18S.geometry(), {name: 'Catastro minero'}),
  ee.Feature(CMI_WGS84_19S.geometry(), {name: 'Catastro minero'}),
];
var mineria_collection=ee.FeatureCollection( mineria_array)
var cruce_mineria_anp = mineria_collection.geometry().intersection(ANP.geometry(), ee.ErrorMargin(1));
Map.addLayer(cruce_mineria_anp, {color: 'ff0000'}, 'Intersección entre area natural protegida y mineria');
var cruce_mineria_forestales = mineria_collection.geometry().intersection(geobosques.geometry(), ee.ErrorMargin(1));
Map.addLayer(cruce_mineria_forestales, {color: 'ff6600'}, 'Intersección entre concesión forestal y mineria');
var cruce_mineria_forestales = mineria_collection.geometry().intersection(serfor.geometry(), ee.ErrorMargin(1));
Map.addLayer(cruce_mineria_forestales, {color: 'ff6600'}, 'Intersección entre concesión forestal y mineria');
Map.centerObject(ee.Geometry.Point([-76.233, -11.072]),5);