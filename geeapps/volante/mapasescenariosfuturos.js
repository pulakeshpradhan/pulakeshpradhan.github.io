var sudamerica = ui.import && ui.import("sudamerica", "table", {
      "id": "users/volante/VARIOS/Sudamerica"
    }) || ee.FeatureCollection("users/volante/VARIOS/Sudamerica"),
    bau = ui.import && ui.import("bau", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_BAU"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_BAU"),
    baja = ui.import && ui.import("baja", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_BAJA"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_BAJA"),
    alta = ui.import && ui.import("alta", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_GChaco_2049_ALTO__3"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_GChaco_2049_ALTO__3"),
    AFOLU2009 = ui.import && ui.import("AFOLU2009", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/AFOLU_2009"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/AFOLU_2009"),
    AFOLU2019 = ui.import && ui.import("AFOLU2019", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/AFOLU_2019"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/AFOLU_2019"),
    legal5 = ui.import && ui.import("legal5", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_legal5cls"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_legal5cls"),
    legal6 = ui.import && ui.import("legal6", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250mSimulacion_legal_6cls"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250mSimulacion_legal_6cls"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 1,
        "max": 5,
        "palette": [
          "61a759",
          "a3ed8b",
          "b5b5b5",
          "ff76db",
          "eced9b"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":1,"max":5,"palette":["61a759","a3ed8b","b5b5b5","ff76db","eced9b"]},
    alta1 = ui.import && ui.import("alta1", "image", {
      "id": "users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_GChaco_2049_ALTO__4"
    }) || ee.Image("users/volante/EUROCLIMA/ESCENARIOS_2050_250m/Simulacion_GChaco_2049_ALTO__4"),
    dptos = ui.import && ui.import("dptos", "table", {
      "id": "users/volante/Deptos_GranChaco"
    }) || ee.FeatureCollection("users/volante/Deptos_GranChaco");
//******************************************************************************
//                      Definición de Paneles
//******************************************************************************
ui.root.clear();
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var TITLE_STYLE = {
  fontSize: '18px',
  padding: '8px',
  color: 'black',
  fontWeight: 'bold',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '16px',
  fontWeight: '50',
  color: 'black',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var mapPanel = ui.Map();
mapPanel.setControlVisibility({layerList: true, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true})
mapPanel.setCenter(-64,-27.5,8).setOptions('HYBRID').style().set('cursor', 'crosshair');
// Use un SplitPanel para que sea posible cambiar el tamaño de los dos paneles.
var mainPanel = ui.Panel({ 
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {
    stretch: 'horizontal',
    height: '60%',
    width: '500px',
    backgroundColor: colors.gray,
    border: BORDER_STYLE,
    position: 'top-left'
  }
});
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var table = ui.Chart(
  [
  ['<img src=https://user-images.githubusercontent.com/9141391/112570076-22b00700-8dc4-11eb-9487-cd6dc278a310.PNG width=450px height=140px>']
],
'Table', {allowHtml: true});
// Añadir el logo y el título de la APP
var logo = ee.Image('users/euroclimacomponente2/Zonificacion/Logos/LogoEuroChaco32720').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
  });
var thumb = ui.Thumbnail({
  image: logo,
  params: {
      dimensions: '1497x464',
      format: 'png'
      },
  style: {height: '127px', width: '408px',padding :'0'}
  });
var titlePanel = ui.Panel(thumb, 'flow', {width: '450px'});
  //***************************************************
//var titlePanel = ui.Panel([table], 'flow', {width: '500px', height:'180px', padding: '0 0 0 0', margin: '0 0 0 0'});
mainPanel.insert(0, titlePanel);
var titleLabel = ui.Label("ESCENARIOS FUTUROS DEL SECTOR AGRICULTURA, GANADERÍA Y OTROS USOS DE LA TIERRA (AFOLU, de siglas en ingles)", TITLE_STYLE);
// añadir la descripcion de la app
var descriptionText =
'"Escenarios Futuros" del Gran Chaco Americano, de acuerdo a distintos escenarios al 2050. (Elaborado en contexto del Proyecto Vivir y Producir en el Bosque Chaqueño; liderado por Mosciaro, M.J; Calamari, N. y Col. En prensa)'
var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
mainPanel.add(titleLabel);
mainPanel.add(descriptionLabel);
//Map.setOptions("SATELLITE")
mapPanel.addLayer(AFOLU2009, imageVisParam, "AFOLU 2009");
mapPanel.addLayer(AFOLU2019, imageVisParam, "AFOLU 2019", false);
mapPanel.addLayer(baja, imageVisParam, "TASAS DEFORESTACION BAJAS HISTORICAS", false);
mapPanel.addLayer(bau, imageVisParam, "TASAS DEFORESTACION IGUALES 2009-19", false);
//mapPanel.addLayer(alta, imageVisParam, "TASAS DEFORESTACION ALTAS HISTORICAS", false);
mapPanel.addLayer(alta1, imageVisParam, "TASAS DEFORESTACION ALTAS HISTORICAS", false);
mapPanel.addLayer(legal5, imageVisParam, "APLICACIÓN LEGAL 2050", false);
//mapPanel.addLayer(legal6, imageVisParam, "APLICACION LEGAL y MBGI 2050");
//Map.addLayer(alta, imageVisParam, "AFOLU ALTA EXPANSION 2050");
//////////////////////LEYENDA///////////////////////////////              
var colors = [
              '61a759',// leñosas
              "a3ed8b",// pastizales
              "b5b5b5",
              "ff76db", // cultivos
              "eced9b",// pasturas
                        ]; 
var names = [ "1.	Tierras Forestales y Otras Tierras Forestales (árboles y arbustos)",
              "2.	Pastizales (herbáceas naturales)",
              "3.	Suelo sin vegetación (suelo desnudo natural y artificial, agua, etc.)",
              "4.	Cultivos agrícolas",
              "5.	Cultivos de pasturas" ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'AGRICULTURA, GANADERIA, BOSQUES Y OTROS USOS DE LA TIERRA',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
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
mainPanel.add(legend)
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: sudamerica,
  color: 1,
  width: 2});
var outline1 = empty.paint({
  featureCollection: dptos,
  color: 1,
  width: 1  });
mapPanel.addLayer(outline, {}, 'Límites');
mapPanel.addLayer(outline1, {}, 'Provincias / Departamentos');
mapPanel.centerObject(AFOLU2009,5)