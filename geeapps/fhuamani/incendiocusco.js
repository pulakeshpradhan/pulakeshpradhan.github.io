var ANTES = ui.import && ui.import("ANTES", "image", {
      "id": "users/fhuamani/ANTES_FINAL"
    }) || ee.Image("users/fhuamani/ANTES_FINAL"),
    DESPUES = ui.import && ui.import("DESPUES", "image", {
      "id": "users/fhuamani/DESPUES_FINAL"
    }) || ee.Image("users/fhuamani/DESPUES_FINAL");
Map.setOptions('satellite');
// LLamada a la colección Sentinel y filtro de fechas y nubes
// Realizamos la composición RGB del mapa inicial
Map.addLayer(ANTES, {bands: ['b1', 'b2', 'b3'],gamma: 1,min: 7, max: 211,},'ANTES');
// Realizamos la composición RGB del segundo mapa
var MapasVinculados = ui.Map();
MapasVinculados.addLayer(DESPUES, {bands: ['b1', 'b2', 'b3'],  gamma: 1,  min: 7,  max: 211},  'INCENDIO');
//Map.setOptions('satellite')
// Vinculamos los mapas
var SWIPE = ui.Map.Linker([ui.root.widgets().get(0), MapasVinculados]);
// Integramos el efecto swipe creando una cortinilla horizontal o vertical
var SWIPE2 = ui.SplitPanel({
  firstPanel: SWIPE.get(0),
  secondPanel: SWIPE.get(1),
  orientation: 'horizontal', //'horizontal' o 'vertical'
  wipe: true,
  style: {stretch: 'both'}});
//Map.setOptions('satellite');
// Mostramos los mapas vinculados con efecto swipe, centramos en coordenada y asignamos zoom
ui.root.widgets().reset([SWIPE2]);
//MapasVinculados.setCenter(-24.366,14.945, 13);
Map.setCenter(-71.79,-13.54, 14)
///////////////////////// ETIQUETAS ///////////////////
var ETIQUETA1 = ui.Label({value:"COMPARACIÓN ANTES - DESPUES", 
                         style:{fontSize:'20px', 
                         color:'indigo', 
                         backgroundColor:'white',
                         position:'top-left'
                         }});
var ETIQUETA2 = ui.Label({value:"INCENDIO FORESTAL SATUARIO HISTORICO CUSCO - SETIEMBRE 2020", 
                         style:{fontSize:'15px', 
                         color:'indigo', 
                         backgroundColor:'white',
                         position:'bottom-left'
                         }});
Map.add(ETIQUETA1);
Map.add(ETIQUETA2);