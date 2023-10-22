var today = new Date();
var hace_un_mes = new Date();
hace_un_mes = new Date(hace_un_mes.setMonth(hace_un_mes.getMonth()-1));
print(hace_un_mes);
print(today);
var collection = ee.ImageCollection('FIRMS').filterDate(hace_un_mes,today);
var ConfianzaMaxima = collection.map(function(image){
  var confianza = image.select('confidence').gte(90);
  return confianza;
});
//imageCollection = imageCollection.fil
Map.addLayer(ConfianzaMaxima,{palette: ['yellow','red']},'incendios forestales desde '+hace_un_mes+' hasta '+today);
Map.setCenter( -66.148913,-17.578244, 7);