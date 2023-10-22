// https://ecodata.nrel.colostate.edu/gdpe-gee-remote-sensing-lessons/module10.html#introduction
Map.setOptions('hybrid');
var cuenca = ee.FeatureCollection("projects/ee-jorgerdzuaslp11/assets/Cuenca_26389/Cuenca_Seco")
var dataset99 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
  .filterDate('1999-01-01', '1999-01-30')
  .select('SR_B1','SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7')
  .filterBounds(cuenca)
  .filter(ee.Filter.lt('CLOUD_COVER', 15))
             .map(function (imagen){
             var ndvi = imagen.normalizedDifference(["SR_B4", "SR_B3"])
             .rename(['NDVI'])
            // .rename(['NDVI'])
            // var ndbi = bandas_op.normalizedDifference(["SR_B6", "SR_B5"])
            // .rename(['NDBI'])
            // var ndwi = bandas_op.normalizedDifference(["SR_B5", "SR_B6"])
            // .rename(['NDWI'])
            // var mndwi = bandas_op.normalizedDifference(["SR_B3", "SR_B6"])
                          return imagen.addBands(ndvi).clip(cuenca)
             .copyProperties(imagen, ["system:time_start", "system:index"])
           })
Map.centerObject(cuenca,11);
var listOfImages = dataset99.toList(dataset99.size());
print('List:',listOfImages);
var cu_99  = ee.Image(listOfImages.get(3));
Map.addLayer(dataset99, {bands:["SR_B5", "SR_B4", "SR_B3"], min: 8380,
             max: 19638}, 'Cunca 26389')
var estilo_99 = {
  bands: ['SR_B5', 'SR_B4', 'SR_B3'],
  min: 8380, 
  max: 19638,
  gamma: 1, 
}
var estilo_09 = {
  bands: ['SR_B5', 'SR_B4', 'SR_B3'],
  min: 8609, 
  max: 18487,
  gamma: 1, 
}
var cuenca_12526 = cuenca.style({
         color:"black",
         width: 2,
         fillColor:"00000000",
})
/**********************************************************************/
// Imagen del 2009
var dataset09 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
  .filterDate('2010-02-01', '2010-02-28')
  .filterBounds(cuenca)
  .filter(ee.Filter.lt('CLOUD_COVER', 5))
             .map(function (imagen){
             var ndvi = imagen.normalizedDifference(["SR_B4", "SR_B3"])
             .rename(['NDVI'])
            // .rename(['NDVI'])
            // var ndbi = bandas_op.normalizedDifference(["SR_B6", "SR_B5"])
            // .rename(['NDBI'])
            // var ndwi = bandas_op.normalizedDifference(["SR_B5", "SR_B6"])
            // .rename(['NDWI'])
            // var mndwi = bandas_op.normalizedDifference(["SR_B3", "SR_B6"])
                          return imagen.addBands(ndvi).clip(cuenca)
             .copyProperties(imagen, ["system:time_start", "system:index"])
           })
var derecha = ui.Map()
var izquierda = ui.Map()
var cuenca_99 = ui.Map.Layer(dataset99, estilo_99)
var cuenca_vector = ui.Map.Layer(dataset99, cuenca_12526)
var cuenca_09 = ui.Map.Layer(dataset09, estilo_09)
var cuenca_vector = ui.Map.Layer(dataset99, cuenca_12526)
var cuenca_99_capa = izquierda.layers()
var cuenca_vector_cap1 = izquierda.layers()
var cuenca_09_capa = derecha.layers()
var cuenca_vector_cap2 = derecha.layers()
cuenca_99_capa.add(cuenca_99)
cuenca_vector_cap1.add(cuenca_12526)
cuenca_09_capa.add(cuenca_09)
cuenca_vector_cap2.add(cuenca_12526)
var cuenca_etiqueta_99 = ui.Label({
    value:"Imagen LANDSAT 5 de 1999 para la cuenca del Río Verde",
    style:{
      fontSize: "18px",
      color: "indigo",
      backgroundColor: "yellow"  }
  })
cuenca_etiqueta_99.style().set("position", "bottom-left")
var cuenca_etiqueta_09 = ui.Label({
  value: "Imagen LANDSAT 5 de 2010 para la cuenca del Río Verde",
      style:{
      fontSize: "18px",
      color: "indigo",
      backgroundColor: "yellow"  }
  })
cuenca_etiqueta_09.style().set("position", "bottom-right")
var boton = ui.Label({
    value:"Proyecto de Tesis Jorge Rodríguez. MCIMRN",
    style:{
      fontSize: "10px",
      color: "indigo",
      backgroundColor: "yellow",
      position: "bottom-left"}
  })
izquierda.add(cuenca_etiqueta_99)
izquierda.add(boton)
derecha.add(cuenca_etiqueta_09)
var panel = ui.SplitPanel({
  firstPanel: izquierda,
  secondPanel: derecha,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear();
ui.root.add(panel);
var union = ui.Map.Linker([izquierda, derecha])
derecha.setCenter(-99.878, 21.8585, 12)
izquierda.setCenter(-99.878, 21.8585, 12)