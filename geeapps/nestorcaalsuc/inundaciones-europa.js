var Inundado = 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[6.597541776192601, 51.635364319552934],
                  [6.600245354412739, 51.63802781028992],
                  [6.601404157174047, 51.63951934629994],
                  [6.602262464058812, 51.64383377885177],
                  [6.5996875434045155, 51.642928314698985],
                  [6.597885098946508, 51.637388610906434]]]),
            {
              "Class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[6.599788890781166, 51.64742432392439],
                  [6.598072277011635, 51.65080607109947],
                  [6.594124065341713, 51.65219065069289],
                  [6.591892467441323, 51.65040666528028],
                  [6.596312747897866, 51.648862263000744]]]),
            {
              "Class": 2,
              "system:index": "1"
            })]),
    Agua = 
    /* color: #004aff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[6.511155445447923, 51.6607448648929],
                  [6.51988861886288, 51.6608510472184],
                  [6.52074692978415, 51.66255476952366],
                  [6.511820616645885, 51.66207591177528],
                  [6.5037523731844304, 51.66215547323895],
                  [6.503280300769112, 51.660558221878325]]]),
            {
              "Class": 1,
              "system:index": "0"
            })]),
    No_Agua = 
    /* color: #ffcd02 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[6.373718930977494, 51.6530237907714],
                  [6.373718930977494, 51.606138446583614],
                  [6.461437894600541, 51.606138446583614],
                  [6.461437894600541, 51.6530237907714]]], null, false),
            {
              "Class": 0,
              "system:index": "0"
            })]);
Map.setOptions('satellite')
var geometry =  ee.Geometry.Polygon(
        [[[4.66270777778051, 51.47630854845985],
          [4.66270777778051, 49.3459878774504],
          [8.99132105903051, 49.3459878774504],
          [8.99132105903051, 51.47630854845985]]], null, false);
Map.setCenter (6.4676, 51.6809, 13); 
// Cargando Sentinel-1 C-band SARRecolección de rango de tierra (escala logarítmica, VV, descendente)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')) .filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(geometry)
//.map(function (image){return image.clip(geometry);})
.select('VH');
//print(collectionVV, 'Collection VV'); 
//Filtrar por dia
var antes = collectionVV.filterDate('2021-06-01', '2021-06-30');
var despues = collectionVV.filterDate('2021-07-15', '2021-07-17');
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
        .select('VH')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var R = imgVV.filterDate('2021-07-15', '2021-07-17').mosaic();
var G = imgVV.filterDate('2021-07-05', '2021-07-10').mosaic();
var B = imgVV.filterDate('2021-07-01', '2021-07-05').mosaic();
//Aplicar filtro de speckle
var SMOOTHING_RADIUS = 50;
var B_F = B.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var G_F = G.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var R_F = R.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var comB = B_F
var BMask = comB.select('VH').lte(-22).rename('B1');
var comG = G_F
var GMask = comG.select('VH').lte(-22).rename('B2');
var comR = R_F
var RMask = comR.select('VH').lte(-22).rename('B3');
var indice = BMask.multiply(GMask).add(RMask)
var indiceMask = indice.select('B1').gt(0);
var indiceF = indice.updateMask(indiceMask)
var imageVisParam = {min: 1, max: 2,"bands":["B1"],"palette":["C0FFFD","0009ff"]};
var descChange = ee.Image.cat(GMask,BMask,RMask); 
//Unir las colecciones
var newfc = Agua.merge(Inundado).merge(No_Agua);
var final = ee.Image.cat(descChange)
var bands = ['B1','B2','B3'];
var training = final.select(bands).sampleRegions({
collection: newfc,
properties: ['Class'],
scale: 30 });
//Train the classifier
var classifier = ee.Classifier.smileCart().train({
features: training,
classProperty: 'Class',
inputProperties: bands
});
//Clasificación
var classified = final.select(bands).classify(classifier);
// Crear variables para capas de GUI para cada capa
var A = ui.Map.Layer(antes, {min:-25,max:0}, 'Sentinel-1 SAR Antes', false);
var B = ui.Map.Layer(despues, {min:-25,max:0}, 'Sentinel-1 SAR Despues', false)
var C = ui.Map.Layer(classified, {min: 0, max: 2, palette: ["ffffff","1667fa","00efe3"]}, 'SAR Classification',false);
var D = ui.Map.Layer(descChange, {}, 'RGB', false);
var E = ui.Map.Layer(indiceF, imageVisParam, 'Zonas', false);
Map.add(A)
Map.add(B)
Map.add(C)
Map.add(D)
Map.add(E)
var header = ui.Label('Visor de Inundaciones', 
            { fontSize: '20px', fontWeight: 'bold', color: '0000ff'});
// Resumen de la aplicación
var text = ui.Label(
  'Este visor ha sido diseñado para ver las zonas inundadas por las lluvias ' + 'en Belgica y Alemania. ',
    {fontSize: '12px'});
 var text2 = ui.Label(
  'La información que se encuentra dispuesta inicia desde el 15 al 17 de julio del 2021.'+ 
  'Debe tenerse en cuenta que las imágenes SAR para el cálculo de las zonas inundadas '+ 
  'son obtenidas de la aplicación de Machine Learning de resolución de 10 metros; con lo que, '+
  'el modelamiento en zonas urbanas, genera estimaciones con ruido proveniente de la reflectancia variada del lugar',
    {fontSize: '12px'});   
// Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text, text2],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(1,panel)
////////////////////////////////////////////////// ///////////////
// // 4) Agregar widgets de casilla de verificación y leyendas //
// ////////////////////////////////////////////////// ///////////////
// //4.1) Crea una nueva etiqueta para esta serie de casillas de verificación
var extLabel = ui.Label({value:'Fechas de Monitoreo',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var extCheckA = ui.Checkbox('Sentinel-1 SAR Antes de la Inundación').setValue(false);
var extCheckB = ui.Checkbox('Sentinel-1 SAR Despues de la Inundación').setValue(false); 
var extCheckC = ui.Checkbox('SAR Classification').setValue(false); 
var extCheckD = ui.Checkbox('Imagen RGB').setValue(false); 
var extCheckE = ui.Checkbox('Indice Calculado').setValue(false); 
// // Establecer la posición del panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // Lo siguiente crea y aplica estilo a 1 fila de la leyenda.
var makeRowa = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Crea una etiqueta con el texto de descripción.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
            // Devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// // Activa capas de interés  
var doCheckboxA = function() {
  extCheckA.onChange(function(checked){
  A.setShown(checked)
  })
}
doCheckboxA();   
var doCheckboxB = function() {
  extCheckB.onChange(function(checked){
  B.setShown(checked)
  })
}
doCheckboxB();     
var doCheckboxC = function() {
  extCheckC.onChange(function(checked){
  C.setShown(checked)
  })
}
doCheckboxC();     
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxC();   
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxD(); 
var doCheckboxE = function() {
  extCheckE.onChange(function(checked){
  E.setShown(checked)
  })
}
doCheckboxE(); 
// Agregue estos nuevos widgets al panel en el orden en que desea que aparezcan.
panel.add(extCheckA)
     .add(extCheckB)
     .add(extCheckC)
     .add(extCheckD)
     .add(extCheckE)
// Crea una paleta para mostrar las clases
var palette =[
  "C0FFFD",
  "0009ff",
];
// Creando Leyenda
var labels = ['Zona Inundada','Agua Permanente'];
var add_legend = function(title, lbl, pal) {
 var legend = ui.Panel({style: {position: 'top-left'}}), entry;
 legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin:
'0 0 4px 0', padding: '0px' } }));
 for (var x = 0; x < lbl.length; x++){
 entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '0 0 4px0'}, value: '██'}),
 ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
 legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
 } Map.add(legend);
 }; add_legend('Leyenda', labels, palette);