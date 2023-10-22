//Parcelas centrales
var parcelas = ee.FeatureCollection('ft:11DvHLk2KnQXTkLsViB-bdiqYqzt0Yy7w6MhOOd6v');
//Parcelas externas
var parcelasBuffer = ee.FeatureCollection('ft:1vCQS62EE3PLsEtn7Vd8Vjcc6-Wh6ZABy5EadrjvU');
// Tocones
var tocones = ee.FeatureCollection('ft:1VOM2pmWncUV0rh2i6rZI6RyM60ie9UxfJxMXA1X5');
// Direccion de derribe de arbol
var derribe = ee.FeatureCollection('ft:1qLAvVr0pbfxfzQ6w7hUM5nmiFwTDTD6-iS46PNWt');
print(parcelas)
Map.addLayer(parcelas,{},'Parcelas')
Map.addLayer(parcelasBuffer,{},'Parcelas Buffer')
Map.addLayer(tocones,{},'Parcelas')
Map.addLayer(derribe,{},'Derribe arbol')
Map.centerObject(parcelas,10)