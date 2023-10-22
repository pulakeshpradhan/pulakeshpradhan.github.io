var imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification_2000"
        ],
        "min": 3009,
        "max": 3009,
        "palette": [
          "ff190e"
        ]
      }
    }) || {"opacity":1,"bands":["classification_2000"],"min":3009,"max":3009,"palette":["ff190e"]};
/***
 * Mapas de transiciones 2000 a 2019
 *
 * */
var regiones = ee.FeatureCollection("users/pbaldass/MapBTrinac_RegionesARGyPRY_PF7_buf10km_rec") .filterMetadata("OBJECTID","less_than",7);
var regions = regiones.union()
var lulc = ee.Image("projects/mapbiomas_af_trinacional/public/mapbiomas_atlantic_forest_collection1_integration_v0").clip(regions)
var clasificacion_1 = lulc.select(0);
var clasificacion_2 = lulc.select(19);
var tran = clasificacion_1.multiply(1000).add(clasificacion_2)
print(tran)
/////CLASSIFICATION VISUALIZATION
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 36,
    'palette': palettes.get('classification3')
};
Map.addLayer(clasificacion_1, vis, "Clasificacion_AF-2000")
Map.addLayer(clasificacion_2, vis, "Clasificacion_AF-2019")
/*
  print(tran.reduceRegion(
    {reducer: ee.Reducer.histogram, 
     geometry: ROI_UY, 
     scale: 30, 
     maxPixels: 1e13}));
*/
var mask = tran.eq(3009)
var Transicion_foresttoplant = tran.updateMask(mask)
Map.addLayer(Transicion_foresttoplant, imageVisParam2, "Transicion_foresttoplant")