// https://ecodata.nrel.colostate.edu/gdpe-gee-remote-sensing-lessons/module10.html#introduction
Map.setOptions('hybrid');
var cuenca = ee.FeatureCollection("users/jorgerdzuaslp11/Cuenca_26453")
var dataset99 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('1999-01-01', '1999-01-30')
  .select('B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7')
  .filterBounds(cuenca)
  .filter(ee.Filter.lt('CLOUD_COVER', 15))
             .map(function (imagen){
             var ndvi = imagen.normalizedDifference(["B4", "B3"])
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
Map.addLayer(cu_99, {bands:["B5", "B4", "B3"], min: 0.043663278222084045,
             max: 0.3746223449707031}, 'Cunca 12526 Calibrar')
var estilo_99 = {
  bands: ['B5', 'B4', 'B3'],
  min: 0.043663278222084045, 
  max: 0.3746223449707031,
  gamma: 1, 
}
var estilo_09 = {
  bands: ['B5', 'B4', 'B3'],
  min: 0.05700619891285896, 
  max: 0.4171964228153229,
  gamma: 1, 
}
var cuenca_12526 = cuenca.style({
         color:"black",
         width: 2,
         fillColor:"00000000",
})
/**********************************************************************/
// Imagen del 2009
var dataset09 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('2009-10-01', '2009-11-30')
  .filterBounds(cuenca)
  .filter(ee.Filter.lt('CLOUD_COVER', 5))
             .map(function (imagen){
             var ndvi = imagen.normalizedDifference(["B4", "B3"])
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
    value:"Imagen LANDSAT 5 de 1999 para la cuenca 26453",
    style:{
      fontSize: "18px",
      color: "indigo",
      backgroundColor: "yellow"  }
  })
cuenca_etiqueta_99.style().set("position", "bottom-left")
var cuenca_etiqueta_09 = ui.Label({
  value: "Imagen LANDSAT 5 de 2009 para la cuenca 26453",
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
derecha.setCenter(-99.3247, 21.8021,12)