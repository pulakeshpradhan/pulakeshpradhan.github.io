var parks = ui.import && ui.import("parks", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons");
var today = new Date();
print(" prueba: "+today.toLocaleDateString());
//today = moment(today).format();
var hace_n_dias = new Date();
hace_n_dias = new Date(hace_n_dias.setDate(hace_n_dias.getDate()-1));
print("n dias "+hace_n_dias);
print("actual "+today);
//var collection = ee.ImageCollection('FIRMS').filterDate(ee.Filter.date('2018-08-01', '2018-08-10'));
var collection = ee.ImageCollection('FIRMS').filter(ee.Filter.date('2020-07-31', '2020-08-02'));
var ConfianzaMaxima = collection.map(function(image){
  var confianza = image.select('confidence').gte(95);
  return confianza;
});
//imageCollection = imageCollection.fil
Map.addLayer(ConfianzaMaxima,{palette: ['yellow','red']},''+hace_n_dias+' hasta '+today);
Map.setCenter( -63.840051,-17.646554, 7);
//Map.addLayer(collection);
var Tucabaca = (parks).filter(ee.Filter.eq("NAME", "Valle de Tucavaca"));
var Noel = (parks).filter(ee.Filter.eq("NAME", "Noel Kempff Mercado National Park"));
var Tunari = (parks).filter(ee.Filter.eq("NAME", "Tunari"));
Map.addLayer(Tucabaca,{},'TUCABCACA',true);
Map.addLayer(Tunari,{},'TUNARI',true);
Map.addLayer(Noel,{},'Noel Kempff',true);
Map.addLayer(parks,{},'Parques',false);