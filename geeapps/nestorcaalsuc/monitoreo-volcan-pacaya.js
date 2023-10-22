// ///////////////////////////////////////////////////////////////
// //                    1) Importar las capas de interes           //
// ///////////////////////////////////////////////////////////////
var simard = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-12-09', '2020-12-11') 
var datasett = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-12-09', '2020-12-11')
var datasettt = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-12-20', '2020-12-25')                  
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-06', '2021-01-10')
var dataset0 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-18', '2021-01-20')
var dataset1 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-23', '2021-01-25')
var dataset2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-02-02', '2021-02-04')
var dataset4 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-02-22', '2021-02-24')
var dataset5 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-03-04', '2021-03-06')
var dataset6 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-03-17', '2021-03-21')
var dataset7 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-03-24', '2021-03-26')
var dataset8 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-03-29', '2021-03-31')
var dataset9 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-03', '2021-04-06')
var dataset10 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-06', '2021-04-10')
var dataset11 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-15', '2021-04-20')
// // Mosaico de los datos en una imagen para que se pueda recortar luego
var hba = simard.mosaic()
// ///////////////////////////////////////////////////////////////
// //      2) Configuración la apariencia del mapa y las capas de la aplicación  //
// ///////////////////////////////////////////////////////////////
// //2.1) Configurar pantalla general
// //Configurar un fondo de satélite
Map.setOptions('Satellite')
//Centrar el mapa
Map.setCenter(-90.60581, 14.38437, 13);
//Cambiar el estilo del cursor a 'punto de mira'
Map.style().set('cursor', 'crosshair');
// //2.2) Configurar una paleta de colores para mostrar los datos 
var Bandas = {
  min: 0.0,
  max: 4000,
  bands: ['B11', 'B8A', 'B2'],
};
// //2.3) Crear variables para capas de GUI para cada capa
// // Establecemos cada capa en "falso" para que el usuario pueda activarlas más tarde
var simHBA = ui.Map.Layer(hba,Bandas,'BASE',false)
var datasettA = ui.Map.Layer(datasett,Bandas, '10 de Diciembre 2020',false)
var datasetttA = ui.Map.Layer(datasettt,Bandas, '25 de Diciembre 2020',false)
var datasetA =  ui.Map.Layer(dataset,Bandas, '09 de Enero 2021',false)
var dataset0A = ui.Map.Layer(dataset0,Bandas, '19 de Enero 2021',false)
var dataset1A = ui.Map.Layer(dataset1,Bandas, '24 de Enero 2021',false)
var dataset2A = ui.Map.Layer(dataset2,Bandas, '03 de Febrero 2021',false)
var dataset4A = ui.Map.Layer(dataset4,Bandas, '23 de Febrero 2021',false)
var dataset5A = ui.Map.Layer(dataset5,Bandas, '05 de Marzo 2021',false)
var dataset6A = ui.Map.Layer(dataset6,Bandas, '20 de Marzo 2021',false)
var dataset7A = ui.Map.Layer(dataset7,Bandas, '25 de Marzo 2021',false)
var dataset8A = ui.Map.Layer(dataset8,Bandas, '30 de Marzo 2021',false)
var dataset9A = ui.Map.Layer(dataset9,Bandas, '04 de Abril 2021',false)
var dataset10A = ui.Map.Layer(dataset10,Bandas, '09 de Abril 2021',false)
var dataset11A = ui.Map.Layer(dataset11,Bandas, '19 de Abril 2021',false)
// // Agrega  capas al mapa. Se agregarán pero no se mostrarán
Map.add(datasettA)
Map.add(datasetttA)
Map.add(datasetA)
Map.add(dataset0A)
Map.add(dataset1A)
Map.add(dataset2A)
Map.add(dataset4A)
Map.add(dataset5A)
Map.add(dataset6A)
Map.add(dataset7A)
Map.add(dataset8A)
Map.add(dataset9A)
Map.add(dataset10A)
Map.add(dataset11A)
// ////////////////////////////////////////////////// ///////////////
// // 3) Configurar paneles y widgets para su visualización //
// ////////////////////////////////////////////////// ///////////////
// //3.1) Configurar widgets de título y resumen
// // Título de la aplicación
var header = ui.Label('Monitoreo del Volcan Pacaya, Guatemala', 
            {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// //Resumen de la aplicación
var text = ui.Label(
  'Este visor está diseñado para el monitoreo activo del volcán de Pacaya.  ' + 
  'La información que se encuentra dispuesta inicia desde el 10 de diciembre del 2020.',
    {fontSize: '12px'});
// //3.2) Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '25%',position:'middle-left'}});
// //3.3) Crear variable para texto adicional y separadores
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro = ui.Panel([
  ui.Label({
    value: '___________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '18px', fontWeight: 'bold'}
  })]);
// //Agregue este nuevo panel al panel más grande que creamos
panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(1,panel)
///ui.root.clear();  ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
////////////////////////////////////////////////// ///////////////
// // 4) Agregar widgets de casilla de verificación y leyendas //
// ////////////////////////////////////////////////// ///////////////
// //4.1) Crea una nueva etiqueta para esta serie de casillas de verificación
var extLabel = ui.Label({value:'Fechas de Monitoreo',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// //4.2) Agregar casillas de verificación a nuestra pantalla
// // Cree casillas de verificación que permitan al usuario ver el mapa de extensión para diferentes años
// // Crear la casilla de verificación no hará nada todavía, agregamos más funcionalidad
// // en el código
var extCheck = ui.Checkbox('10 de Diciembre 2020').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('25 de Diciembre 2020').setValue(false);// 
var extCheck3 = ui.Checkbox('09 de Enero 2021').setValue(false);
var extCheck4 = ui.Checkbox('19 de Enero 2021').setValue(false);
var extCheck5 = ui.Checkbox('24 de Enero 2021').setValue(false);
var extCheck6 = ui.Checkbox('03 de Febrero 2021').setValue(false);
var extCheck8 = ui.Checkbox('23 de Febrero 2021').setValue(false);
var extCheck9 = ui.Checkbox('05 de Marzo 2021').setValue(false);
var extCheck10 = ui.Checkbox('20 de Marzo 2021').setValue(false);
var extCheck11 = ui.Checkbox('25 de Marzo 2021').setValue(false);
var extCheck12 = ui.Checkbox('30 de Marzo 2021').setValue(false);
var extCheck13 = ui.Checkbox('04 de Abril 2021').setValue(false);
var extCheck14 = ui.Checkbox('09 de Abril 2021').setValue(false);
var extCheck15 = ui.Checkbox('19 de Abril 2021').setValue(false);
// //4.3) Create legends
// //The following code creates legends we can add to the panel
// //Extent Legend
// ///////////////
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
// //4.4) Agregue estos nuevos widgets al panel en el orden en que desea que aparezcan.
panel.add(extLabel)
      .add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extCheck4)
      .add(extCheck5)
      .add(extCheck6)
      .add(extCheck8)
      .add(extCheck9)
      .add(extCheck10)
      .add(extCheck11)
      .add(extCheck12)
      .add(extCheck13) 
      .add(extCheck14)
      .add(extCheck15)
// ////////////////////////////////////////////////// ///////////////
// // 5) Agregar funcionalidad a los widgets //
// ////////////////////////////////////////////////// ///////////////
// // Para cada casilla de verificación creamos una función para que al hacer clic en la casilla de verificación
// // Activa capas de interés
// //Extent 10 de diciembre 2020
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  datasettA.setShown(checked)
  })
}
doCheckbox();
// //Extent 25 de diciembre 2020
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  datasetttA.setShown(checked)
  })
}
doCheckbox2();
// //Extent 09 de Enero 2021
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  datasetA.setShown(checked)
  })
}
doCheckbox3();      
// //Extent 19 de Enero 2021
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  dataset0A.setShown(checked)
  })
}
doCheckbox4();   
// //Extent 24 de Enero 2021
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  dataset1A.setShown(checked)
  })
}
doCheckbox5();   
// //Extent 03 de Febrero
var doCheckbox6 = function() {
  extCheck6.onChange(function(checked){
  dataset2A.setShown(checked)
  })
}
doCheckbox6();   
// //Extent 23 de Febrero
var doCheckbox8 = function() {
  extCheck8.onChange(function(checked){
  dataset4A.setShown(checked)
  })
}
doCheckbox8();   
// //Extent 05 de Marzo
var doCheckbox9 = function() {
  extCheck9.onChange(function(checked){
  dataset5A.setShown(checked)
  })
}
doCheckbox9(); 
// //Extent 20 de Marzo
var doCheckbox10 = function() {
  extCheck10.onChange(function(checked){
  dataset6A.setShown(checked)
  })
}
doCheckbox10();
// //Extent 25 de Marzo
var doCheckbox11 = function() {
  extCheck11.onChange(function(checked){
  dataset7A.setShown(checked)
  })
}
doCheckbox11();
// //Extent 30 de Marzo
var doCheckbox12 = function() {
  extCheck12.onChange(function(checked){
  dataset8A.setShown(checked)
  })
}
doCheckbox12();
var doCheckbox13 = function() {
  extCheck13.onChange(function(checked){
  dataset9A.setShown(checked)
  })
}
doCheckbox13();
var doCheckbox14 = function() {
  extCheck14.onChange(function(checked){
  dataset10A.setShown(checked)
  })
}
doCheckbox14();
var doCheckbox15 = function() {
  extCheck15.onChange(function(checked){
  dataset11A.setShown(checked)
  })
}
doCheckbox15();
// //Create a new label
var graphLabel = ui.Label({value:'Elaborado por:  Nestor Caal Suc',
style: {fontWeight: 'normal', fontSize: '12px', margin: '10px 5px'}
});
// //Add selecter and graph panel to main panel
panel.add(graphLabel)