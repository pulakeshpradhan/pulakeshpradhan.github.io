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
var Numancia = ee.FeatureCollection("users/pbaldass/Numancia_campo")
Map.setOptions("SATELLITE")
Map.setCenter(-71.423, -45.602, 10)
var blank = ee.Image(0).mask(0);
var outline = blank.paint(Numancia, 'AA0000', 2); 
var visPar = {'palette':'#ff0000','opacity': 0.6};
Map.addLayer(outline, visPar, "Numancia", true);
var TV = ee.FeatureCollection("users/pbaldass/Numancia_tiposveg")
var blank2 = ee.Image(0).mask(0);
var outline2 = blank2.paint(TV, 'AA0000', 3); 
var visPar2 = {'palette':'#22e74c','opacity': 0.6};
Map.addLayer(outline2, visPar2, "Tipos de Vegetacion", true);
var TVs = TV.aggregate_array("Name")
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
    var myCounty = TV.filterMetadata("Name","equals",names)
    // Helper Function to remove all previous layers of the map
    function removeLayersFromMap(layer){
      Map.remove(layer)
    }
    Map.layers().map(removeLayersFromMap)  // map the function to the Map.layers() object
    Map.addLayer(myCounty,{},"Tipo Vegetacion seleccionado") 
    var blank = ee.Image(0).mask(0);
    var outline = blank.paint(Numancia, 'AA0000', 2); 
    var visPar = {'palette':'#ff0000','opacity': 0.6};
    Map.addLayer(outline, visPar, "Numancia", true);
    var area = myCounty
    // Add the new layer to the map
var bandas = ee.Image("users/pbaldass/bandas_Numancia_pre").clip(area)
//---------------------------------------------------------------------------------------------------
//------------------------ DEFINIR EL NUMERO INICIAL DE CLASES --------------------------------------
//---------------------------------------------------------------------------------------------------
// MUESTREAR LA IMAGEN PARA DEFNIR LOS CLUSTERS
var training = bandas.sample({
  region: area,
  scale: 231.65635826395828,
  numPixels: 50,
  seed: 200
});
//print(training,"training")
var numclas = 20
// ENTRENA UN CLASIFICADOR CON EL ALGORITMO K-MEANS
var clusterer = ee.Clusterer.wekaKMeans({nClusters: numclas,maxIterations: 100,seed: 123}).train(training);
// CLASIFICAR LA IMAGEN
var ClasNosup = bandas.cluster(clusterer);
var Clasificacion = ClasNosup.remap(ee.List.sequence(0,numclas-1), ee.List.sequence(1,numclas)).int8()
Map.addLayer(Clasificacion.randomVisualizer(), {},"Clasificacion 20 clases")
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
Map.addLayer(Clasificacion.randomVisualizer(), {},"Clasificacion 20 clases")
///
var numclas2 = 4
// ENTRENA UN CLASIFICADOR CON EL ALGORITMO K-MEANS
var clusterer2 = ee.Clusterer.wekaKMeans({nClusters: numclas2,maxIterations: 100,seed: 123}).train(training);
// CLASIFICAR LA IMAGEN
var ClasNosup2 = bandas.cluster(clusterer2);
var Clasificacion2 = ClasNosup2.remap(ee.List.sequence(0,numclas2-1), ee.List.sequence(1,numclas2)).int8()
var mask1b = Clasificacion2.eq(1)
var clase_select1b = ui.Map.Layer(Clasificacion2.multiply(mask1b), imageVisParam, "Grupo A",false)
var mask2b = Clasificacion2.eq(2)
var clase_select2b = ui.Map.Layer(Clasificacion2.multiply(mask2b), imageVisParam, "Grupo B",false)
var mask3b = Clasificacion2.eq(3)
var clase_select3b = ui.Map.Layer(Clasificacion2.multiply(mask3b), imageVisParam, "Grupo C",false)
var mask4b = Clasificacion2.eq(4)
var clase_select4b = ui.Map.Layer(Clasificacion2.multiply(mask4b), imageVisParam, "Grupo D",false)
Map.add(clase_select4b)
Map.add(clase_select3b)
Map.add(clase_select2b)
Map.add(clase_select1b)
Map.addLayer(Clasificacion2.randomVisualizer(), {},"Clasificacion 4 clases")
//}
//
var areaImage = ee.Image.pixelArea().addBands(
      Clasificacion)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: area,
    scale: 231,
    maxPixels: 1e10
    }); 
//print(areas)
var classAreas = ee.List(areas.get('groups'))
var classAreaLists = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  var area = ee.Number(
    areaDict.get('sum')).divide(10000)
  return ee.List([classNumber, area])
})
var result = ee.Dictionary(classAreaLists.flatten())
//print(result)
//print(result.getNumber('10'))
var c1 = result.getNumber('1').toInt()
var c1b = c1.getInfo()
var c2 = result.getNumber('2').toInt()
var c2b = c2.getInfo()
var c3 = result.getNumber('3').toInt()
var c3b = c3.getInfo()
var c4 = result.getNumber('4').toInt()
var c4b = c4.getInfo()
var c5 = result.getNumber('5').toInt()
var c5b = c5.getInfo()
var c6 = result.getNumber('6').toInt()
var c6b = c6.getInfo()
var c7 = result.getNumber('7').toInt()
var c7b = c7.getInfo()
var c8 = result.getNumber('8').toInt()
var c8b = c8.getInfo()
var c9 = result.getNumber('9').toInt()
var c9b = c9.getInfo()
var c10 = result.getNumber('10').toInt()
var c10b = c10.getInfo()
var c11 = result.getNumber('11').toInt()
var c11b = c11.getInfo()
var c12 = result.getNumber('12').toInt()
var c12b = c12.getInfo()
var c13 = result.getNumber('13').toInt()
var c13b = c13.getInfo()
var c14 = result.getNumber('14').toInt()
var c14b = c14.getInfo()
var c15 = result.getNumber('15').toInt()
var c15b = c15.getInfo()
var c16 = result.getNumber('16').toInt()
var c16b = c16.getInfo()
var c17 = result.getNumber('17').toInt()
var c17b = c17.getInfo()
var c18 = result.getNumber('18').toInt()
var c18b = c18.getInfo()
var c19 = result.getNumber('19').toInt()
var c19b = c19.getInfo()
var c20 = result.getNumber('20').toInt()
var c20b = c20.getInfo()
//
var areaImage2 = ee.Image.pixelArea().addBands(
      Clasificacion2)
var areas2 = areaImage2.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: area,
    scale: 231,
    maxPixels: 1e10
    }); 
//print(areas)
var classAreas2 = ee.List(areas2.get('groups'))
var classAreaLists2 = classAreas2.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  var area = ee.Number(
    areaDict.get('sum')).divide(10000)
  return ee.List([classNumber, area])
})
var result2 = ee.Dictionary(classAreaLists2.flatten())
//print(result)
//print(result.getNumber('10'))
var g1 = result2.getNumber('1').toInt()
var g1b = g1.getInfo()
var g2 = result2.getNumber('2').toInt()
var g2b = g2.getInfo()
var g3 = result2.getNumber('3').toInt()
var g3b = g3.getInfo()
var g4 = result2.getNumber('4').toInt()
var g4b = g4.getInfo()
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({
  style: {width: '300px'}})
      .add(ui.Label('Coordenada'))
      .add(ui.Label('Click en el mapa'))
      .add(ui.Label('Área (ha) por clase'))
      .add(ui.Label("Clase 1: " + c1b +" ha"))
      .add(ui.Label("Clase 2: " + c2b +" ha"))
      .add(ui.Label("Clase 3: " + c3b +" ha"))
      .add(ui.Label("Clase 4: " + c4b +" ha"))
      .add(ui.Label("Clase 5: " + c5b +" ha"))
      .add(ui.Label("Clase 6: " + c6b +" ha"))
      .add(ui.Label("Clase 7: " + c7b +" ha"))
      .add(ui.Label("Clase 8: " + c8b +" ha"))
      .add(ui.Label("Clase 9: " + c9b +" ha"))
      .add(ui.Label("Clase 10: " + c10b +" ha"))
      .add(ui.Label("Clase 11: " + c11b +" ha"))
      .add(ui.Label("Clase 12: " + c12b +" ha"))
      .add(ui.Label("Clase 13: " + c13b +" ha"))
      .add(ui.Label("Clase 14: " + c14b +" ha"))
      .add(ui.Label("Clase 15: " + c15b +" ha"))
      .add(ui.Label("Clase 16: " + c16b +" ha"))
      .add(ui.Label("Clase 17: " + c17b +" ha"))
      .add(ui.Label("Clase 18: " + c18b +" ha"))
      .add(ui.Label("Clase 19: " + c19b +" ha"))
      .add(ui.Label("Clase 20: " + c20b +" ha"))
      .add(ui.Label("Grupo A: " + g1b +" ha"))
      .add(ui.Label("Grupo B: " + g2b +" ha"))
      .add(ui.Label("Grupo C: " + g3b +" ha"))
      .add(ui.Label("Grupo D: " + g4b +" ha"));
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