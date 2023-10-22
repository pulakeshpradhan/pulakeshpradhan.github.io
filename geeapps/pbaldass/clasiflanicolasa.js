var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 0,
        "max": 1,
        "palette": [
          "000000",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":0,"max":1,"palette":["000000","ff0000"]};
var Lanico = ee.FeatureCollection("users/pbaldass/LaNicolasa")
Map.setOptions("SATELLITE")
Map.setCenter(-65.96, -38.85, 10)
var blank = ee.Image(0).mask(0);
var outline = blank.paint(Lanico, 'AA0000', 2); 
var visPar = {'palette':'#ff0000','opacity': 0.6};
Map.addLayer(outline, visPar, "La Nicolasa", true);
var TV = ee.FeatureCollection("users/pbaldass/tipo_veg_lanicolasa")
var blank2 = ee.Image(0).mask(0);
var outline2 = blank2.paint(TV, 'AA0000', 3); 
var visPar2 = {'palette':'#22e74c','opacity': 0.6};
Map.addLayer(outline2, visPar2, "Tipos de Vegetacion", true);
var TVs = TV.aggregate_array("Tipo_Veg")
function onNameChanged(name) {
  print('Update map for ' + name)
}
TVs.evaluate(function(TVs) {
  print(TVs);
  var currentName = ui.Select({
    items: TVs, 
    placeholder: 'Seleccionar Tipo de Vegetacion', 
    onChange: redraw,
  });
  var panel = ui.Panel([currentName]);
  Map.widgets().add(panel);
});
var layers = [
  ui.Map.Layer(TV),
];
// The new value is passed as a parameter to the select onChange callback.
function redraw(names) {
    // FILTER THE COLLECTION TO ONLY CONTAIN SELECTED FEATURE
    var myCounty = TV.filterMetadata("Tipo_Veg","equals",names)
    // Helper Function to remove all previous layers of the map
    function removeLayersFromMap(layer){
      Map.remove(layer)
    }
    Map.layers().map(removeLayersFromMap)  // map the function to the Map.layers() object
    Map.addLayer(myCounty,{},"Tipo Vegetacion seleccionado") 
    var blank = ee.Image(0).mask(0);
    var outline = blank.paint(Lanico, 'AA0000', 2); 
    var visPar = {'palette':'#ff0000','opacity': 0.6};
    Map.addLayer(outline, visPar, "La Nicolasa", true);
    var area = myCounty
    // Add the new layer to the map
var bandas = ee.Image("users/pbaldass/bandas_LaNicolasa").clip(area)
//---------------------------------------------------------------------------------------------------
//------------------------ DEFINIR EL NUMERO INICIAL DE CLASES --------------------------------------
//---------------------------------------------------------------------------------------------------
// MUESTREAR LA IMAGEN PARA DEFNIR LOS CLUSTERS
var training = bandas.sample({
  region: area,
  scale: 231.65635826395828,
  numPixels: 50,
});
//print(training,"training")
var numclas = 20
// ENTRENA UN CLASIFICADOR CON EL ALGORITMO K-MEANS
var clusterer = ee.Clusterer.wekaKMeans({nClusters: numclas,maxIterations: 100,seed: 123}).train(training);
// CLASIFICAR LA IMAGEN
var ClasNosup = bandas.cluster(clusterer);
var Clasificacion = ClasNosup.remap(ee.List.sequence(0,numclas-1), ee.List.sequence(1,numclas)).int8()
var mask1 = Clasificacion.eq(1)
var clase_select1 = ui.Map.Layer(Clasificacion.multiply(mask1), imageVisParam, "Clase 1",false)
var mask2 = Clasificacion.eq(2)
var clase_select2 = ui.Map.Layer(Clasificacion.multiply(mask2), imageVisParam, "Clase 2",false)
var mask3 = Clasificacion.eq(3)
var clase_select3 = ui.Map.Layer(Clasificacion.multiply(mask3), imageVisParam, "Clase 3",false)
var mask4 = Clasificacion.eq(4)
var clase_select4 = ui.Map.Layer(Clasificacion.multiply(mask4), imageVisParam, "Clase 4",false)
var mask5 = Clasificacion.eq(5)
var clase_select5 = ui.Map.Layer(Clasificacion.multiply(mask5), imageVisParam, "Clase 5",false)
var mask6 = Clasificacion.eq(6)
var clase_select6 = ui.Map.Layer(Clasificacion.multiply(mask6), imageVisParam, "Clase 6",false)
var mask7 = Clasificacion.eq(7)
var clase_select7 = ui.Map.Layer(Clasificacion.multiply(mask7), imageVisParam, "Clase 7",false)
var mask8 = Clasificacion.eq(8)
var clase_select8 = ui.Map.Layer(Clasificacion.multiply(mask8), imageVisParam, "Clase 8",false)
var mask9 = Clasificacion.eq(9)
var clase_select9 = ui.Map.Layer(Clasificacion.multiply(mask9), imageVisParam, "Clase 9",false)
var mask10 = Clasificacion.eq(10)
var clase_select10 = ui.Map.Layer(Clasificacion.multiply(mask10), imageVisParam, "Clase 10",false)
var mask11 = Clasificacion.eq(11)
var clase_select11 = ui.Map.Layer(Clasificacion.multiply(mask11), imageVisParam, "Clase 11",false)
var mask12 = Clasificacion.eq(12)
var clase_select12 = ui.Map.Layer(Clasificacion.multiply(mask12), imageVisParam, "Clase 12",false)
var mask13 = Clasificacion.eq(13)
var clase_select13 = ui.Map.Layer(Clasificacion.multiply(mask13), imageVisParam, "Clase 13",false)
var mask14 = Clasificacion.eq(14)
var clase_select14 = ui.Map.Layer(Clasificacion.multiply(mask14), imageVisParam, "Clase 14",false)
var mask15 = Clasificacion.eq(15)
var clase_select15 = ui.Map.Layer(Clasificacion.multiply(mask15), imageVisParam, "Clase 15",false)
var mask16 = Clasificacion.eq(16)
var clase_select16 = ui.Map.Layer(Clasificacion.multiply(mask16), imageVisParam, "Clase 16",false)
var mask17 = Clasificacion.eq(17)
var clase_select17 = ui.Map.Layer(Clasificacion.multiply(mask17), imageVisParam, "Clase 17",false)
var mask18 = Clasificacion.eq(18)
var clase_select18 = ui.Map.Layer(Clasificacion.multiply(mask18), imageVisParam, "Clase 18",false)
var mask19 = Clasificacion.eq(19)
var clase_select19 = ui.Map.Layer(Clasificacion.multiply(mask19), imageVisParam, "Clase 19",false)
var mask20 = Clasificacion.eq(20)
var clase_select20 = ui.Map.Layer(Clasificacion.multiply(mask20), imageVisParam, "Clase 20",false)
Map.add(clase_select20)
Map.add(clase_select19)
Map.add(clase_select18)
Map.add(clase_select17)
Map.add(clase_select16)
Map.add(clase_select15)
Map.add(clase_select14)
Map.add(clase_select13)
Map.add(clase_select12)
Map.add(clase_select11)
Map.add(clase_select10)
Map.add(clase_select9)
Map.add(clase_select8)
Map.add(clase_select7)
Map.add(clase_select6)
Map.add(clase_select5)
Map.add(clase_select4)
Map.add(clase_select3)
Map.add(clase_select2)
Map.add(clase_select1)
Map.addLayer(Clasificacion.randomVisualizer(), {},"clasificacion")
//}
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({
  style: {width: '300px'}})
      .add(ui.Label('Click en el mapa'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(6) + ' ' +
                 'lat: ' + coords.lat.toFixed(6);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
});
// Add the panel to the ui.root.
ui.root.add(panel);
}