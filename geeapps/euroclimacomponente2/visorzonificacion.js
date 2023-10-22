var zonasImag = ui.import && ui.import("zonasImag", "image", {
      "id": "users/euroclimacomponente2/Zonificacion/Resultados/cluster_WC_128_0_4"
    }) || ee.Image("users/euroclimacomponente2/Zonificacion/Resultados/cluster_WC_128_0_4"),
    zonasVec = ui.import && ui.import("zonasVec", "table", {
      "id": "users/euroclimacomponente2/Zonificacion/Resultados/cluster_seg_vector"
    }) || ee.FeatureCollection("users/euroclimacomponente2/Zonificacion/Resultados/cluster_seg_vector");
var L_GChaco = ee.FeatureCollection('users/euroclimacomponente2/Zonificacion/General/L_GChaco_WWF');//Limite del Gran Chaco (Fuente: WMF)
var uniPaisajes = ee.Image(zonasImag);
var uniPaisajesVec = ee.FeatureCollection(zonasVec);
//******************************************************************************
//                      Definiciones de estilos
//******************************************************************************
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontSize: '18px',
  padding: '8px',
  color: 'black',
  fontWeight: 'bold',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontSize: '14px',
  fontWeight: '80',
  color: 'black',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '16px',
  fontWeight: '50',
  color: 'black',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: 'black',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
//******************************************************************************
//                      Definición de Paneles
//******************************************************************************
ui.root.clear();
var mapPanel = ui.Map();
mapPanel.setControlVisibility({layerList: true, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true})
mapPanel.setCenter(-64,-26,5.5).setOptions('ROADMAP').style().set('cursor', 'crosshair');
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
  firstPanel: mapPanel,
  secondPanel: mainPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Panel principal
var titleLabel = ui.Label('Grandes Unidades de Paisajes del Gran Chaco Americano', TITLE_STYLE);
// añadir la descripcion de la app
var descriptionText = 'EUROCLIMA+ '+
  'Componente Bosques, Biodiversidad y Ecosistemas';
var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
var masInfo = ui.Label('Más Información', SUBPARAGRAPH_STYLE);  
var urlAyuda = ui.Label({
  value: 'Manejo y restauración de bosques en entornos productivos',
  style: {fontSize: "14px", backgroundColor:'00000000'},
  targetUrl: 'https://euroclimaplus.org/proyectos-bosques/vivir-y-producir-en-el-bosque-chaqueno'
});
var table = ui.Chart(
  [
  ['<img src=https://user-images.githubusercontent.com/9141391/122321598-7c732980-cefa-11eb-859b-d3f592dbceba.PNG width=450px height=380px>']
  ],
  'Table', {allowHtml: true});
var titlePanel = ui.Panel([table], 'flow', {width: '480px', height:'450px', padding: '0 0 0 0', margin: '0 0 0 0'});
mainPanel.add(titleLabel);
mainPanel.add(descriptionLabel);
mainPanel.add(masInfo);
mainPanel.add(urlAyuda);
mainPanel.add(titlePanel);
//mainPanel.add(firstSubParagraph);
//Visualización de resultados
var blank = ee.Image(0).mask(0);
var outline_Gch = blank.paint(L_GChaco, 'ff001d', 2);
var outline_gupasVec = blank.paint(uniPaisajesVec, 'ff001d', 1);
//var outline_gupasVec = blank.paint(GUPasVec, 'ff001d', 1);
var visParpGupasVec = {'palette':'grey','opacity': 1};
var visParp = {'palette':'black','opacity': 1};
var GChacoLayer = ui.Map.Layer(outline_Gch, visParp, "Bioma del Gran Chaco", true);
var uniPaisVecLayer = ui.Map.Layer(outline_gupasVec, visParpGupasVec, "Límites de la zonificación", true);
var GUPasLayer  = ui.Map.Layer(uniPaisajes.randomVisualizer(), {}, 'Zonificación').setOpacity(0.8);
mapPanel.layers().add(GUPasLayer);
mapPanel.layers().add(uniPaisVecLayer);
mapPanel.layers().add(GChacoLayer);