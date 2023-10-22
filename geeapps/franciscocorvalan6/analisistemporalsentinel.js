/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Infraestructuras = ee.FeatureCollection("users/franciscocorvalan6/BQ2/NE");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Demonstrates before/after imagery comparison with a variety of dates.
var Periodo_Inicio = ee.Date('2020-01-01')
var Periodo_Finalizacion = ee.Date(new Date().getTime())
var collection = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterDate(Periodo_Inicio, Periodo_Finalizacion);
var _01_a_10_Enero = ee.Image(collection.filterDate('2020-01-01','2020-01-10').mosaic());
var _10_a_20_Enero = ee.Image(collection.filterDate('2020-01-10','2020-01-20').mosaic());
var _20_a_30_Enero = ee.Image(collection.filterDate('2020-01-20','2020-01-30').mosaic());
var _01_a_10_Marzo = ee.Image(collection.filterDate('2020-03-01','2020-03-10').mosaic());
var _10_a_20_Marzo = ee.Image(collection.filterDate('2020-03-10','2020-03-20').mosaic());
var _20_a_30_Marzo = ee.Image(collection.filterDate('2020-03-20','2020-03-30').mosaic());
var _01_a_10_Junio = ee.Image(collection.filterDate('2020-06-01','2020-06-10').mosaic());
var _10_a_20_Junio = ee.Image(collection.filterDate('2020-06-10','2020-06-20').mosaic());
var _20_a_30_Junio = ee.Image(collection.filterDate('2020-06-20','2020-06-30').mosaic());
var _01_a_10_Agosto = ee.Image(collection.filterDate('2020-08-01','2020-08-10').mosaic());
var _10_a_20_Agosto = ee.Image(collection.filterDate('2020-08-10','2020-08-20').mosaic());
var _20_a_30_Agosto = ee.Image(collection.filterDate('2020-08-20','2020-08-30').mosaic());
var _01_a_10_Agosto = ee.Image(collection.filterDate('2020-08-01','2020-08-10').mosaic());
var _10_a_20_Agosto = ee.Image(collection.filterDate('2020-08-10','2020-08-20').mosaic());
var _20_a_30_Agosto = ee.Image(collection.filterDate('2020-08-20','2020-08-30').mosaic());
var _01_a_10_Septiembre = ee.Image(collection.filterDate('2020-09-01','2020-09-10').mosaic());
var _10_a_20_Septiembre = ee.Image(collection.filterDate('2020-09-10','2020-09-20').mosaic());
var _20_a_30_Septiembre = ee.Image(collection.filterDate('2020-09-20','2020-09-30').mosaic());
var _01_a_10_Octubre= ee.Image(collection.filterDate('2020-10-01','2020-10-10').mosaic());
var _10_a_20_Octubre= ee.Image(collection.filterDate('2020-10-10','2020-10-20').mosaic());
var _20_a_30_Octubre = ee.Image(collection.filterDate('2020-10-20','2020-10-30').mosaic());
var _01_a_10_Noviembre = ee.Image(collection.filterDate('2020-11-01','2020-11-10').mosaic());
var _10_a_20_Noviembre = ee.Image(collection.filterDate('2020-11-10','2020-11-20').mosaic());
var _20_a_30_Noviembre  = ee.Image(collection.filterDate('2020-11-20','2020-11-30').mosaic());
var _01_a_10_Diciembre = ee.Image(collection.filterDate('2020-12-01','2020-12-10').mosaic());
var _10_a_20_Diciembre = ee.Image(collection.filterDate('2020-12-10','2020-12-20').mosaic());
var _20_a_30_Diciembre  = ee.Image(collection.filterDate('2020-12-20','2020-12-30').mosaic())
// Demonstrates before/after imagery comparison with a variety of dates.
var images = {
'0 a 10 Enero':_01_a_10_Enero,
'10 a 20 Enero':_10_a_20_Enero,
'20 a 30 Enero':_20_a_30_Enero,
'0 a 10 Marzo':_01_a_10_Marzo,
'10 a 20 Marzo':_10_a_20_Marzo,
'20 a 30 Marzo':_20_a_30_Marzo,
'0 a 10 Junio':_01_a_10_Junio,
'10 a 20 Junio':_10_a_20_Junio,
'20 a 30 Junio':_20_a_30_Junio,
'0 a 10 Septimbre': _01_a_10_Septiembre,
'10 a 20 Septimbre': _10_a_20_Septiembre,
'20 a 30 Septimbre': _20_a_30_Septiembre,
'0 a 10 Octubre': _01_a_10_Octubre,
'10 a 20 Octubre': _10_a_20_Octubre,
'20 a 30 Octubre': _20_a_30_Octubre,
'0 a 10 Noviembre': _01_a_10_Noviembre,
'10 a 20 Noviembre': _10_a_20_Noviembre,
'20 a 30 Noviembre': _20_a_30_Noviembre,
'0 a 10 Diciembre': _01_a_10_Diciembre,
'10 a 20 Diciembre': _10_a_20_Diciembre,
'20 a 30 Diciembre': _20_a_30_Diciembre
} 
var colorizedVis = {bands: ['B4', 'B3', 'B2'], max: 5000};
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
leftMap.addLayer(Infraestructuras,{},'Infraestructuras'); 
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, colorizedVis);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 19, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Elegir el Año para visualizar');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],colorizedVis));
    mapToChange.layers().set(1, ui.Map.Layer(Infraestructuras,{},'Infraestructuras'));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-69.26056128662705,-20.9909739498841, 12);
rightMap.Map.addLayer(Infraestructuras,{},'Infraestructuras');
/////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
 // Add the title to the panel
rightMap.add(createLegend2());
leftMap.add(createLegend2())
legend.add(panel);
leftMap.add(legend);
rightMap.add(legend);
rightMap.addLayer(Infraestructuras,{},'Infraestructuras'); 
//////// Firma del autor ///
function createLegend2() {
    var legend2 = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '0px 0px',
      color: 'grey',
      backgroundColor : "blue"
    }
  })
  // Create legend title
  var legendTitle2 = ui.Label({
  value: 'Francisco Martín Corvalán'+'\n'+
  'francisco.corvalan6@gmail.com',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 0px 0',
    padding: '0',
    backgroundColor : ('white')
    }
});
   // Add the title to the panel
  legend2.add(legendTitle2); 
  return legend2
}
Map.addLayer(Infraestructuras,{},'Infraestructuras');