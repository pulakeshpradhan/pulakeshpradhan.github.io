var degradacion = ee.Image('users/gaitanjuanjose/chaco_pasturas/Indice_Degradacion_Pasturas_3clases');
var L_GChaco = ee.FeatureCollection('users/gaitanjuanjose/limites_gran_chaco');
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
    width: '520px',
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
//Panel principal
var titleLabel = ui.Label('Mapa del estado de degradación de las pasturas del Gran Chaco Americano', TITLE_STYLE);
var urlAyuda = ui.Label({
  value: 'Link al informe',
  style: {fontSize: "14px", backgroundColor:'00000000'},
  targetUrl: 'https://docs.google.com/document/d/177eRQ-xShIdBgRBImSNvy1Ck3ECwyEbN/edit?usp=sharing&ouid=101538554450753718923&rtpof=true&sd=true'
});
var table = ui.Chart(
  [
  ['<img src=https://github.com/lopezjuana/Proyectos_SIG/blob/master/LogosPasturas1.PNG?raw=true width=480px height=85px>']
  ],
  'Table', {allowHtml: true});
var titlePanel = ui.Panel([table], 'flow', {width: '520px', height:'130px', padding: '0 0 0 0', margin: '0 0 0 0'});
//https://github.com/lopezjuana/Proyectos_SIG/blob/master/LogosPasturas1.PNG?raw=true
mainPanel.add(titlePanel);
mainPanel.add(titleLabel);
mainPanel.add(urlAyuda);
//Visualización de resultados
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: L_GChaco,
  color: 1,
  width: 2
});
mapPanel.addLayer(outline, {palette: 'grey'}, 'edges');
mapPanel.addLayer(degradacion,{ min:1, max:3, palette: ['ff9517', 'fdfd00','33a02c']},"Indice_Degradacion_Pasturas", true);
//////////////////////LEYENDA///////////////////////////////              
var colors = [
              'ff9517',//2
              'fdfd00',//3
              '33a02c'//5
             // '33a02c'//6
              ]; 
var names = [ "1  Pasturas Degradación Alta",
             // "2  Pasturas Degradación Moderada",
              "2  Pasturas Degradación Baja",
              "3  Pasturas No Degradadas"
           ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Indice de Degradación de Pasturas',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
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
mapPanel.add(legend)  
/*
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
*/