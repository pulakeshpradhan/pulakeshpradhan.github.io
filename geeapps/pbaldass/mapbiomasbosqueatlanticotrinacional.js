Map.setOptions("SATELLITE")
Map.setCenter(-56.19, -25.50, 6)
var limite = ee.FeatureCollection('projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/limite-MA-trinacional-v4').union()
//Map.addLayer(limite, null, 'Atlantic Forest_col.1', true);
/////CLASSIFICATION VISUALIZATION
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 45,
    'palette': palettes.get('chaco')
};
var Ar_Py_col1_2000 = ee.Image("projects/mapbiomas_af_trinacional/public/mapbiomas_atlantic_forest_collection1_integration_v0")
                 .select(0).clip(limite)
Ar_Py_col1_2000 = Ar_Py_col1_2000.remap(
                  [3, 4, 5, 9,11,12,13,15,18,19,20,39,41,21,22,23,24,25,26,29,30,31,32,33,32,36,39],
                  [3, 4, 3, 9,11,12,13,15,18,18,18,18,18,21,22,22,22,22,33,29,22,33,13,33,12,18,18])
//Map.addLayer(Ar_Py_col1_2000, vis, 'Ar_Py_col1', true);
var yearbrasil = 2000 //del 2000 al 2018
var BR_col5_2000 = ee.Image('projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1').clip(limite)
BR_col5_2000 = BR_col5_2000.select('classification_'+yearbrasil).remap(
                  [3, 4, 5, 9,11,12,13,15,18,19,20,39,41,21,22,23,24,25,26,29,30,31,32,33,32,36,39],
                  [3, 4, 3, 9,11,12,13,15,18,18,18,18,18,21,22,22,22,22,33,29,22,33,13,33,12,18,18])
//Map.addLayer(BR_col5, vis, 'Brasil_'+yearbrasil+"_col.5", true);
var clas_union_2000  = ee.ImageCollection.fromImages(
  [ee.Image(Ar_Py_col1_2000), 
   ee.Image(BR_col5_2000),
   ]).min()
//Map.addLayer(clas_union_2000, vis, 'MapBiomas-Bosque Atlántico_2000', true);
var Ar_Py_col1_2019 = ee.Image("projects/mapbiomas_af_trinacional/public/mapbiomas_atlantic_forest_collection1_integration_v0")
                 .select(19).clip(limite)
Ar_Py_col1_2019 = Ar_Py_col1_2019.remap(
                  [3, 4, 5, 9,11,12,13,15,18,19,20,39,41,21,22,23,24,25,26,29,30,31,32,33,32,36,39],
                  [3, 4, 3, 9,11,12,13,15,18,18,18,18,18,21,22,22,22,22,33,29,22,33,13,33,12,18,18])
//Map.addLayer(Ar_Py_col1_2000, vis, 'Ar_Py_col1', true);
var yearbrasil = 2019 //del 2000 al 2018
var BR_col5_2019 = ee.Image('projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1').clip(limite)
BR_col5_2019 = BR_col5_2019.select('classification_'+yearbrasil).remap(
                  [3, 4, 5, 9,11,12,13,15,18,19,20,39,41,21,22,23,24,25,26,29,30,31,32,33,32,36,39],
                  [3, 4, 3, 9,11,12,13,15,18,18,18,18,18,21,22,22,22,22,33,29,22,33,13,33,12,18,18])
//Map.addLayer(BR_col5, vis, 'Brasil_'+yearbrasil+"_col.5", true);
var clas_union_2019  = ee.ImageCollection.fromImages(
  [ee.Image(Ar_Py_col1_2019), 
   ee.Image(BR_col5_2019),
   ]).min()
//Map.addLayer(clas_union_2019, vis, 'MapBiomas-Bosque Atlántico_2019', true);
////////////////////////////////////////////
//TRANSICIONES
var tran = clas_union_2000.multiply(1000).add(clas_union_2019)
//print(tran)
var Listaoriginal = [11003,11004,11009,11011,11012,11015,11019,11021,11022,11033,11036,
          12003,12004,12009,12011,12012,12015,12019,12021,12022,12033,12036,15003,15004,
          15009,15011,15012,15015,15019,15021,15022,15033,19003,19004,19009,19011,19012,
          19015,19019,19021,19022,19033,19036,21003,21004,21009,21011,21012,21015,21019,
          21021,21022,21033,21036,22003,22004,22009,22011,22012,22015,22019,22021,22022,
          22033,22036,3003,3004,3009,3011,3012,3015,3019,3021,3022,3033,3036,33003,33004,
          33009,33011,33012,33015,33019,33021,33022,33033,33036,36003,36004,36009,36011,
          36012,36019,36021,36022,36033,36036,4003,4004,4009,4011,4012,4015,4019,4021,4022,
          4033,4036,9003,9004,9009,9011,9012,9015,9019,9021,9022,9033,9036]
var Listaresumida = [3,2,2,1,2,2,2,2,2,2,2,3,2,2,2,1,2,2,2,2,2,2,3,2,2,2,2,1,2,2,2,2,3,2,2,
                     2,2,2,1,2,2,2,2,3,2,2,2,2,2,2,1,2,2,2,3,2,2,2,2,2,2,2,1,2,2,1,4,4,4,4,
                     4,4,4,4,4,4,3,2,2,2,2,2,2,2,2,1,2,3,2,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,
                     2,2,2,3,2,1,2,2,2,2,2,2,2,2]
var imageVisParam5 = {
    "bands": ["remapped"],
    'min': 3,
    'max': 4,
    "opacity": 1, 
    'palette': ["1f04ff","ff0000"]
};
var Clasificacion = tran.remap(Listaoriginal,Listaresumida)
//Map.addLayer(Clasificacion, imageVisParam5, "clasif")
var mask2 = Clasificacion.gt(2)
var clasifi3 = Clasificacion.updateMask(mask2)
//Map.addLayer(clasifi3, imageVisParam5, "clasif3")
////////////////////////////////////////////////////////////
var legendf = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitlef = ui.Label({
  value: 'MAPBIOMAS BOSQUE ATLÁNTICO',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legendf.add(legendTitlef);
Map.add(legendf)
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "006400",//3
              "32cd32",//4
              "935132",//9
              "45c2a5",//11
              "b8af4f",//12
              "ffd966",//15
              "d5a6bd",//19
              "ffefc3",//21
              "EA9999",//22
              "0000ff",//33
              // "dd497f",//36
              ];
var names = [
              "[03] Natural Forest",
              "[04] Savanna Formation",
              "[09] Forest Plantation",
              "[11] Wetlands",
              "[12] Grassland",
              "[15] Pasture",
              "[18] Crops",
              "[21] Mosaic_agriculture_pasture",
              "[22] Non vegetated area",
              "[33] Water",
              // "[36] Perennial crops"
            ];
var legend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'References',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend)
////////////////////////////////////
var colors2 = ["1f04ff",//"1b894c",//3
              "ff0000",//4
               ];
var names2 = [
              "Ganancia de bosque",
              "Pérdida de bosque",
               ];
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'Transición',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
var makeRow2 = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names2.length; i++){
legend2.add(makeRow2(colors2[i], names2[i]));
}
Map.add(legend2)
////////////////////////////////////////////////
Map.addLayer(clasifi3, imageVisParam5, "Transición bosque_2000-2019")
Map.addLayer(clas_union_2019, vis, 'MapBiomas-Bosque Atlántico_2019', true);
Map.addLayer(clas_union_2000, vis, 'MapBiomas-Bosque Atlántico_2000', true);
Map.addLayer(limite, null, 'Ecorregión Bosque Atlántico', true);