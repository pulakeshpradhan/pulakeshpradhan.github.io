var parks = ui.import && ui.import("parks", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons");
var today = new Date();
//today.
var prueba = ee.Date.fromYMD(2000,1,1);
print(" prueba: "+today.toLocaleDateString());
//today = moment(today).format();
var hace_n_dias = new Date();
var ayer =new Date(hace_n_dias.setDate(hace_n_dias.getDate()-1));
hace_n_dias = new Date(hace_n_dias.setDate(hace_n_dias.getDate()-2));
print("n dias "+hace_n_dias);
print("actual "+today);
//var collection = ee.ImageCollection('FIRMS').filterDate(ee.Filter.date('2018-08-01', '2018-08-10'));
var collection = ee.ImageCollection('FIRMS').filter(ee.Filter.date(hace_n_dias, ayer));
//var collection = ee.ImageCollection('FIRMS').filter(ee.Filter.dayOfYear());
var ConfianzaMaxima = collection.map(function(image){
  var confianza = image.select('confidence').gte(95);
  return confianza;
});
//imageCollection = imageCollection.fil
Map.addLayer(ConfianzaMaxima,{palette: ['yellow','red']},''+hace_n_dias.toLocaleDateString()+' hasta '+ayer.toLocaleDateString());
Map.setCenter( -63.840051,-17.646554, 7);
//Map.addLayer(collection);
var Tucabaca = (parks).filter(ee.Filter.eq("NAME", "Valle de Tucavaca"));
var Noel = (parks).filter(ee.Filter.eq("NAME", "Noel Kempff Mercado National Park"));
var Tunari = (parks).filter(ee.Filter.eq("NAME", "Tunari"));
Map.addLayer(Tucabaca,{},'TUCABCACA',true);
Map.addLayer(Tunari,{},'TUNARI',true);
Map.addLayer(Noel,{},'Noel Kempff',true);
Map.addLayer(parks,{},'Parques',false);