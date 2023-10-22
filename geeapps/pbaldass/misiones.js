var Clas2008 = ui.import && ui.import("Clas2008", "image", {
      "id": "projects/nrefmisiones/assets/Clasificaciones/ClasSup2008iFo_fTemp_ummB"
    }) || ee.Image("projects/nrefmisiones/assets/Clasificaciones/ClasSup2008iFo_fTemp_ummB"),
    Clas2013 = ui.import && ui.import("Clas2013", "image", {
      "id": "projects/nrefmisiones/assets/Clasificaciones/ClasSup2013iFo_fTemp_ummB"
    }) || ee.Image("projects/nrefmisiones/assets/Clasificaciones/ClasSup2013iFo_fTemp_ummB"),
    Tr0813 = ui.import && ui.import("Tr0813", "image", {
      "id": "projects/nrefmisiones/assets/Clasificaciones/Tr08-13_fTemp_ummDyR_iUNSEF"
    }) || ee.Image("projects/nrefmisiones/assets/Clasificaciones/Tr08-13_fTemp_ummDyR_iUNSEF"),
    pvClas = ui.import && ui.import("pvClas", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "clasificacion"
        ],
        "palette": [
          "99c647",
          "512f1d",
          "ebb303",
          "f06e0a",
          "a80404",
          "910c6a",
          "000000",
          "0e5eb0",
          "e6e983"
        ]
      }
    }) || {"opacity":1,"bands":["clasificacion"],"palette":["99c647","512f1d","ebb303","f06e0a","a80404","910c6a","000000","0e5eb0","e6e983"]},
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "max": 3,
        "palette": [
          "159731",
          "d20000",
          "1b41ac"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"max":3,"palette":["159731","d20000","1b41ac"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B3",
          "SR_B2",
          "SR_B1"
        ],
        "min": 0.016432235131623,
        "max": 0.07872832027765221,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B3","SR_B2","SR_B1"],"min":0.016432235131623,"max":0.07872832027765221,"gamma":1},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B4",
          "SR_B3",
          "SR_B2"
        ],
        "min": 0.011417864876694711,
        "max": 0.08824888481741608,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":0.011417864876694711,"max":0.08824888481741608,"gamma":1},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 1,
        "palette": [
          "fff825",
          "3eff31",
          "d80303"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":1,"palette":["fff825","3eff31","d80303"]};
var Misiones = ee.FeatureCollection("projects/nrefmisiones/assets/Misiones/ProvMisiones")
Map.centerObject(Misiones,7)
Map.setOptions('satellite')
var clas08 = Clas2008.remap([1,3,9,12,15,19,21,22,33,36],[2,1,2,3,4,5,6,7,8,9]).rename('clasificacion')
var clas13 = Clas2013.remap([1,3,9,12,15,19,21,22,33,36],[2,1,2,3,4,5,6,7,8,9]).rename('clasificacion')
Map.addLayer(clas08, pvClas, 'Clasificacion 2008', false)
Map.addLayer(clas13, pvClas, 'Clasificacion 2013', false)
Map.addLayer(Tr0813.remap([11,12,21,22],[1,2,3,4]).updateMask(Tr0813.neq(22)).selfMask(), imageVisParam, 'Transiciones 08-13', false)
var L8v = ee.Image("projects/nrefmisiones/assets/Misiones/Mosaicos-EspAtr/L5c2_vis-IR_Verano2008-Misiones_buff5k_fillGap")
var L8v2014 = ee.Image("projects/nrefmisiones/assets/Misiones/Mosaicos-EspAtr/L8c2_vis-IR_Verano2014-Misiones_buff5k_fillGap")
Map.addLayer(L8v.clip(Misiones), imageVisParam2, 'Landsat Verano 2008', false);
Map.addLayer(L8v2014.clip(Misiones), imageVisParam3, "Landsat Verano 2013", false)
var MBB2008 = ee.Image("projects/nrefmisiones/assets/mascara_bosque_misiones_sin0607")
var Clas2008_umm = ee.Image("projects/nrefmisiones/assets/Clasificaciones/ClasSup2008iFo_fTemp_ummB")
var ClasBR_umm = Clas2008_umm.remap([3,4,9,11,12,15,19,21,22,33,36,37],[1,2,3,4,4,4,4,4,4,4,4,5])
// INTEGRACION CON FORESTACIONES
var Fo_p = ee.Image("projects/nrefmisiones/assets/Forestaciones_provincia")
var Fo_n = ee.Image("projects/nrefmisiones/assets/Forestaciones_nacion")
var Fo2008_prov = Fo_p.updateMask(Fo_p.neq(0)).lte(2008).selfMask()
var Fo2008_nac = Fo_n.updateMask(Fo_n.neq(0)).lte(2008).selfMask()
var Fo2008_prov2 = Fo_p.neq(0).and(Fo_p.lte(2008))
var Fo2008_nac2 = Fo_n.neq(0).and(Fo_p.lte(2008))
var Fo_provna = Fo2008_prov2.add(Fo2008_nac2).gte(1)
var Fo_provna2 = Fo_provna.updateMask(Fo_provna)
// COMPARACIONES CON CARTOGRAFÍA DE BASE
var MBB2008sFo = MBB2008.blend(Fo_provna2.remap([0,1],[0,5]))
var diffBosque = ClasBR_umm.lte(2).subtract(MBB2008sFo.lte(2))
var sumBosque = ClasBR_umm.lte(2).add(MBB2008sFo.lte(2))
var compBosque = diffBosque.add(sumBosque.eq(2).remap([0,1],[0,2]))
var compRec = compBosque.remap([-1,0,1,2],[1,0,3,2])
Map.addLayer(compRec.selfMask(), imageVisParam4, 'Comparacion Clas-MB2008', false)
//////////////////////LEYENDA///////////////////////////////  
var colors = ['99c647','512f1d','ebb303','f06e0a','a80404','910c6a','000000','0e5eb0','e6e983']
var names = [
              "[1] Bosque Nativo",
              "[2] Plantación Forestal",
              "[3] Pastizales",
              "[4] Pasturas",
              "[5] Cultivos Anuales",
              "[6] Mosaico de agricultura y pasturas",
              "[7] Area sin Vegetación",
              "[8] Agua",
              "[9] Cultivos Perennes"
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Clases',
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
//////////////////////////////////////////
var colors2 = ['d20000','159731','1b41ac']
var names2 = [
              "Deforestación",
              "Bosque estable",
              "Regeneración",
            ];
var legend2 = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'Transiciones 2008-2013',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
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
//////////////////////////////////////////
var colors3 = ['fff825','3eff31','d80303']
var names3 = [
              "Cartografia base",
              "Coincidencia",
              "Clasificación",
            ];
var legend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle3 = ui.Label({
  value: 'Coincidencia cartografia 2008',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend3.add(legendTitle3);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
var makeRow3 = function(color, name) {
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
for (var i = 0; i < names3.length; i++){
legend3.add(makeRow3(colors3[i], names3[i]));
}
Map.add(legend3)