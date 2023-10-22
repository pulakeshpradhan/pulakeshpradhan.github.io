var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/agronservice/PIORNINO2"
    }) || ee.FeatureCollection("users/agronservice/PIORNINO2");
// compute composite for all images aquired in the last 3 days
//var now = ee.Date(Date.now());
var composite2 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-05-19','2020-05-20')
  .mosaic()
  .divide(10000)
  .clip(geometry) ;
var composite3 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2017-05-25','2017-05-27')
  .mosaic()
  .divide(10000)
  .clip(geometry);
// compute NDVI using fluent API
var ndvi2 = composite2.normalizedDifference(['B8', 'B4']);
var ndvi3 = composite3.normalizedDifference(['B8', 'B4']);
var ndviPalette = ['b5b1ae', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
// compute NDWI using fluent API
var ndwi2 = composite2.normalizedDifference(['B8A', 'B11']);
var ndwi3 = composite3.normalizedDifference(['B8A', 'B11']);
var ndwiPalette = ['a50026','d73027','f46d43','fdae61','fee090', 'ffffbf'
,'e0f3f8','abd9e9','74add1', '4575b4','313695'];//azulrojo
// Definir un boxcar(vehícolo cuadrado) o low-pass kernel (Genera un núcleo booleano de forma cuadrada)
var boxcarndvi = ee.Kernel.square({
  radius: 3, units: 'pixels', normalize: true
});
var boxcarndwi = ee.Kernel.square({
  radius: 5, units: 'pixels', normalize: true
});
// Suavizamos la imagen convolucionando cada banda de una imagen con el núcleo dado (kernel).
// esto se utilizará para la mejora en el apartado de visualización (Interface Manager).
var smoothndvi2 = ndvi2.convolve(boxcarndvi);
var smoothndvi3 = ndvi3.convolve(boxcarndvi);
var smoothndwi2 = ndwi2.convolve(boxcarndwi);
var smoothndwi3 = ndwi3.convolve(boxcarndwi);
var vcultivo = {
  '20 de mayo 2020': smoothndvi2.visualize({min: 0, max: 0.9, palette: ndviPalette}),
  '27 de mayo 2020': smoothndvi3.visualize({min: 0, max: 0.9, palette: ndviPalette}),
};
var ehidrico = {
  '20 de abril 2020': smoothndwi2.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  '27 de mayo 2020': smoothndwi3.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//MEJORAS PARA LA APP and visualization
// Set position of new panel2 for legend and title of map
/*
var legendlogo = ui.Panel({
style: {
position: 'bottom-right',
padding: '0px 0px',
backgroundColor:('00963911')
}
});
//Add AGRON logo
var logo = ee.Image(logo);
//Add logo to panel2 we create
var branding = ui.Thumbnail({
  image:logo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'100px',height:'50px',backgroundColor:('#00963911'), padding:('0px 0px 0px 0px' )}});
legendlogo.add(branding);
*/
//Add text to the map
var label1 = ui.Label('Developed by AGRON - agtech');
  label1.style().set({
    position:('bottom-right'),
    fontFamily:('monospace'),
    color:('#009639'),
    //backgroundColor:('#DBDBDB'),
    backgroundColor:('#C7CFD9'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('12px'),
    //whiteSpace:('pre'),
    border:('1px solid black'),
    //shown: (false)
    });
//Add text to the map
var label2 = ui.Label('Developed by AGRON - agtech');
  label2.style().set({
    position:('bottom-left'),
    fontFamily:('monospace'),
    color:('#009639'),
    //backgroundColor:('#DBDBDB'),
    backgroundColor:('#C7CFD9'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('12px'),
    //whiteSpace:('pre'),
    border:('1px solid black'),
    //shown: (false)
    });
//Add text to the map
var label3 = ui.Label('Almendros PIORNIÑO');
  label3.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#000000'),
    backgroundColor:('#FFFFFF88'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('20px'),
    //whiteSpace:('pre'),
    border:('1.5px solid black'),
    //shown: (false)
    });
//Add text to the map
var label4 = ui.Label('Almendros PIORNIÑO');
  label4.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#000000'),
    backgroundColor:('FFFFFF88'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('20px'),
    //whiteSpace:('pre'),
    border:('1.5px solid black'),
    //shown: (false)
    });
// Set position of new panel2 for legend and title of map
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '0px 0px',
backgroundColor:('#FFFFFF88')
}
});
/*
// Create legend title for panel2
var legendTitle = ui.Label({
value: 'V.Cultivo',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
*/
// Add the title to the panel2
//legend.add(legendTitle);
var maxIzq= "+ Óptimo";
var minIzq= "- Óptimo";
// create vizualization parameters of the panel2
var viz = {min:0, max:1, palette:['b5b1ae', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301']};
// create the legend image of panel2
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((1)/100.0).add(0);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(maxIzq)/*.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#2A558C'),
    backgroundColor:('#D5E5F2'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('25px'),
    //whiteSpace:('pre'),
    border:('1.5px solid black'),
    //shown: (false)
    })*/
],
});
legend.add(panel1);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '0.5px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(minIzq)
],
});
legend.add(panel1);
//////////////////////////////////////////////////////////////////////////////
// Set position of new panel2 for legend and title of map
var legendndwi = ui.Panel({
style: {
position: 'bottom-right',
padding: '0px 0px',
backgroundColor:('#FFFFFF88')
}
});
/*
// Create legend title for panel2
var legendTitlendwi = ui.Label({
value: 'E.Hídrico',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel2
legendndwi.add(legendTitlendwi);
*/
var max= "- Estrés";
var min= "+ Estrés";
// create vizualization parameters of the panel2
var vizndwi = {min:[0], max:[1], palette:ndwiPalette};
// create the legend image of panel2
var lonndwi = ee.Image.pixelLonLat().select('latitude');
var gradientndwi = lonndwi.multiply((vizndwi.max-vizndwi.min)/100.0).add(vizndwi.min);
var legendImagendwi = gradientndwi.visualize(vizndwi);
// create text on top of legend
var panel1ndwi = ui.Panel({
widgets: [
ui.Label(max)
],
});
legendndwi.add(panel1ndwi);
// create thumbnail from the image
var thumbnailndwi = ui.Thumbnail({
image: legendImagendwi,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '0.5px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legendndwi.add(thumbnailndwi);
// create text on top of legend
var panel1ndwi = ui.Panel({
widgets: [
ui.Label(min)
],
});
legendndwi.add(panel1ndwi);
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setOptions('SATELLITE');
leftMap.add(label2);
leftMap.add(legend);
var leftSelector = addLayerSelectorleft(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setOptions('SATELLITE');
rightMap.add(label1);
rightMap.add(legendndwi);
//rightMap.add(legendlogo);
var rightSelector = addLayerSelectorright(rightMap, 0, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelectorleft(mapToChange, defaultValue, position) {
  var label = ui.Label('Vigorosidad del Cultivo');
  label.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#000000'),
    backgroundColor:('#FFFFFF'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('15px'),
    //whiteSpace:('pre'),
    //border:('0.5px solid black'),
    //shown: (false)
    });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(vcultivo[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(vcultivo), onChange: updateMap});
  select.setValue(Object.keys(vcultivo)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position, backgroundColor:('#FFFFFF88')}});
  mapToChange.add(controlPanel);
}
function addLayerSelectorright(mapToChange, defaultValue, position) {
  var label = ui.Label('Estrés Hídrico');
  label.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#000000'),
    backgroundColor:('#FFFFFF'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('15px'),
    //whiteSpace:('pre'),
    //border:('0.5px solid black'),
    //shown: (false)
    });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(ehidrico[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(ehidrico), onChange: updateMap});
  select.setValue(Object.keys(ehidrico)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position, backgroundColor:('#FFFFFF88')}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
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
leftMap.centerObject(geometry,15);
leftMap.add(label3);
rightMap.add(label4);