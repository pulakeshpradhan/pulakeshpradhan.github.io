var manzanas_1 = ee.FeatureCollection("users/jmadrigal1leccion/Manzanas"),
    Cuencas_1 = ee.FeatureCollection("users/jmadrigal1leccion/Cuencas"),
    Red__hidrica_La_Rafita_1 = ee.FeatureCollection("users/jmadrigal1leccion/Red__hidrica_La_Rafita"),
    pacifico = ee.FeatureCollection("users/jmadrigal1leccion/ElPacificook");
	Map.setCenter (-75.54, 6.25, 16)
	// Configure un fondo satelital
Map.setOptions('Satellite')
// Cambie el estilo del cursor a 'crosshair’ (retículo)
Map.style().set('cursor', 'crosshair');
// Representamos los datos del vector
//Map.addLayer(manzanas_1, {color: 'grey', opacity:0.5},'Manzanas')
Map.addLayer(Cuencas_1, {color: 'blue'},'Cuencas' )
Map.addLayer(Red__hidrica_La_Rafita_1, {color: 'yellow'},'Red_hidrica Rafita')
Map.addLayer(pacifico, {color: 'pink'},'El Pacifico' )
// ///////////////////////////////////////////////////////////////
// //      3) Set up panels and widgets for display             //
// ///////////////////////////////////////////////////////////////
// //3.1) Set up title and summary widgets
// //App title
var header = ui.Label('Proyecto Hidrico México - Colombia', 
            {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// //App summary
var text = ui.Label(
  'Este el el Mapa Hidrológico de la Cuenca donde se encuentra el barrio EL Pacifico en color amarillo en azul la cuenca y los principales afluentes ',
    {fontSize: '15px'});
// //3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
// //3.3) Create variable for additional text and separators
// //This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '___________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
// //Add this new panel to the larger panel we created 
panel.add(intro)
// //3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
// ///////////////////////////////////////////////////////////////
// //         4) Add checkbox widgets and legends               //
// ///////////////////////////////////////////////////////////////
// //4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'CAPAS',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// //4.2) Add checkboxes to our display
// //Create checkboxes that will allow the user to view the extent map for different years
// //Creating the checkbox will not do anything yet, we add functionality further 
// // in the code
var extCheck = ui.Checkbox('Cuencas').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('Red Hidrica').setValue(false);// 
var extCheck3 = ui.Checkbox('El Pacifico').setValue(false);
// //4.3) Create legends
// //The following code creates legends we can add to the panel
// //Extent Legend
// ///////////////
// // Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// // Name of each legend value
var namesa = ['Cuenca','2010','2020'];