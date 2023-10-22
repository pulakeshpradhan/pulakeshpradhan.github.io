var RF_zonas_V7_FT = ee.ImageCollection("projects/mapbiomas-chaco/COLECAO1/RF_Zonas_V7_FT");
var gridFeatureCollection = ee.FeatureCollection('users/MapBiomasAR/Zonas/zonas_mapbiomas');
Map.centerObject(gridFeatureCollection)
var vizParams = {
    "bands": ['class_2010'],
    "min": 0,
    "max": 27,
    "palette": "d5d5e5,129912,1f4423,006400,00ff00," +
               "687537,76a5af,29eee4,77a605,935132,ff9966,45c2a5," +
               "b8af4f,f1c232,ffffb2,f6b26b,f6b26b,a0d0de," +
               "e974ed,d5a6bd,c27ba0,FBF3C7,d0670f," +
               "dd7e6b,b7b7b7,ff99ff," +
               "0000ff,d5d5e5",
    "format": "png"
  }
var zonas = ["zona_1",
  "zona_2",
  "zona_3",
  "zona_4",
  "zona_5",
  "zona_6",
  "zona_7",
  "zona_8",
  "zona_10",
  "zona_11"];
var ZonasRF = ee.ImageCollection([]);
for(var i = 0;i<zonas.length; i++){
  var zona = zonas[i];
  var limite = gridFeatureCollection.filterMetadata('zonas', "equals", zona);
  ZonasRF = ZonasRF.merge(
    RF_zonas_V7_FT.filterMetadata("system:index", "equals", zona  + "-10a17FT").map(
      function(i){return i.clip(limite)})
    );  
}
var anos = ['2010','2011','2012','2013','2014','2015','2016','2017'];
for(var anio=2010;anio<=2017;anio++){
  vizParams.bands[0] = "class_" + anio
  Map.addLayer(ZonasRF, vizParams, "FT_"+anio);
}