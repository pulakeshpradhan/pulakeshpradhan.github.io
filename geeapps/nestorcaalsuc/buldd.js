var Cambios = ui.import && ui.import("Cambios", "image", {
      "id": "projects/ee-nestorcaalsuc/assets/Cambio_de_tres_colores"
    }) || ee.Image("projects/ee-nestorcaalsuc/assets/Cambio_de_tres_colores");
var Sechaj = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-90.37293089990285, 16.060568561923212],
          [-90.37293089990285, 15.870442626317383],
          [-90.05020751123098, 15.870442626317383],
          [-90.05020751123098, 16.060568561923212]]], null, false);
Map.setOptions ("HYBRID")
var header1 = ui.Label('Equipo de trabajo', 
            { fontSize: '20px', fontWeight: 'bold', color: '1FAB09'});
var textA = ui.Label(
  '  Danna de la Cruz',
  {fontSize: '12px', margin: '0px 10px'});
var textB = ui.Label(
  '  Victor Manuel Lobos Morales',
  {fontSize: '12px', margin: '0px 10px'});
var textC = ui.Label(
  '  Nestor Caal Suc',
  {fontSize: '12px', margin: '0px 10px'});
var textD = ui.Label(
  '  Ezequiel López Bautista',
  {fontSize: '12px', margin: '0px 10px'});
var panelA = ui.Panel({
  widgets:[header1, textA, textB, textC, textD],
  style:{width: '20%', position: 'middle-right'}}
);
var logo1 = ee.Image('projects/ee-nestorcaalsuc/assets/Logo11').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb1 = ui.Thumbnail({
    image: logo1,
    params: {
        dimensions: '1500x350',
       format: 'png'},
    style: {height: '100px', width: '240px',padding :'0'}
    });
var header = ui.Label('Franja Transversal del Norte', 
            { fontSize: '22px', fontWeight: 'bold', color: '1FAB09'});
// Resumen de la aplicación
var text = ui.Label(
  'Este visor ha sido diseñado para el "Curso Detección de Deforestación y Degradación Forestal en Series de Tiempo" ',
    {fontSize: '14px', fontWeight: 'bold'});
 var text2 = ui.Label(
   'La zona que más pérdida de bosque ha sufrido se encuentra entre los municipios de Raxruhá y Chisec, en un valle ubicado al sur de la sierra de Chinajá.',
    {fontSize: '12px'});   
 var text3 = ui.Label(
   'Objetivo',
    {fontSize: '14px', fontWeight: 'bold'});  
 var text4 = ui.Label(
   'Revisar visualmente resultados de identificación de cambio de BULC-D con datos independientes de mayor resolución espacial de años respectivos de cambio para el período 2014-2017',
    {fontSize: '12px'});  
// Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text, text2, text3, text4],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
/*var intro = ui.Panel([
  ui.Label({
    value: '_________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })]);*/
  // //Agregue este nuevo panel al panel más grande que creamos
//panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(0,panel)
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var introA = ui.Panel([
  ui.Label({
    value: '_________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
var logo = ee.Image('projects/ee-nestorcaalsuc/assets/Logo23').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '600x420',
       format: 'png'},
    style: {height: '100px', width: '250px',padding :'0'}
    });
ui.root.insert(2,panelA)
panelA.add(thumb1)
      .add(introA)
      .add(thumb)
var FTN2 = ee.Image().byte().paint({featureCollection:Sechaj, color:1, width:2}).visualize({palette:"cyan"});
Map.addLayer(FTN2,{},"Sechaj",1);
Map.centerObject(Sechaj,11);
var palette =[
 'ffff00',// Banano 0 (Amarillo)
 'ff0000',//Bosque latifoliado 1 (Rojo)
];
// Creando Leyenda
var labels = ['Baja prob. de Pérdida','Alta prob. de Pérdida'];
var add_legend = function(title, lbl, pal) {
 var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
 legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin:
'0 0 4px 0', padding: '0px' } }));
 for (var x = 0; x < lbl.length; x++){
 entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '0 0 4px0'}, value: '██'}),
 ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
 legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
 } Map.add(legend);
 }; add_legend('Leyenda', labels, palette);
Map.addLayer (Cambios, {min: 1, max: 2, palette:["red","yellow"]}, 'Áreas de Cambio');