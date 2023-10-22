var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    geometry_s = ui.import && ui.import("geometry_s", "table", {
      "id": "users/agronservice/sub_axa"
    }) || ee.FeatureCollection("users/agronservice/sub_axa"),
    geometry_c = ui.import && ui.import("geometry_c", "table", {
      "id": "users/agronservice/citri_axa"
    }) || ee.FeatureCollection("users/agronservice/citri_axa"),
    geometry_h = ui.import && ui.import("geometry_h", "table", {
      "id": "users/agronservice/horti_axa"
    }) || ee.FeatureCollection("users/agronservice/horti_axa"),
    geometry_i = ui.import && ui.import("geometry_i", "table", {
      "id": "users/agronservice/inver_axa"
    }) || ee.FeatureCollection("users/agronservice/inver_axa"),
    limit = ui.import && ui.import("limit", "table", {
      "id": "users/agronservice/limite_axa"
    }) || ee.FeatureCollection("users/agronservice/limite_axa");
// compute composite for all images aquired in the last 3 days
//var now = ee.Date(Date.now());
var composite = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-02-03','2020-02-04')
  .mosaic()
  .divide(10000)
  .clip(geometry_s);
var composite1 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-03-04','2020-03-05')
  .mosaic()
  .divide(10000)
  .clip(geometry_s);
var composite2 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-02-03','2020-02-04')
  .mosaic()
  .divide(10000)
  .clip(geometry_h);
var composite3 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-03-04','2020-03-05')
  .mosaic()
  .divide(10000)
  .clip(geometry_h);
var composite4 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-02-03','2020-02-04')
  .mosaic()
  .divide(10000)
  .clip(geometry_c);
var composite5 = s2
  //.filterDate(now.advance(-3, 'day'), now)
  .filterDate ('2020-03-04','2020-03-05')
  .mosaic()
  .divide(10000)
  .clip(geometry_c);
// compute NDVI using fluent API
var ndvi = composite.normalizedDifference(['B8', 'B4']);
var ndvi1 = composite1.normalizedDifference(['B8', 'B4']);
var ndvi2 = composite2.normalizedDifference(['B8', 'B4']);
var ndvi3 = composite3.normalizedDifference(['B8', 'B4']);
var ndvi4 = composite4.normalizedDifference(['B8', 'B4']);
var ndvi5 = composite5.normalizedDifference(['B8', 'B4']);
var ndviPalette = ['b5b1ae', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
// compute NDWI using fluent API
var ndwi = composite.normalizedDifference(['B8A', 'B11']);
var ndwi1 = composite1.normalizedDifference(['B8A', 'B11']);
var ndwi2 = composite2.normalizedDifference(['B8A', 'B11']);
var ndwi3 = composite3.normalizedDifference(['B8A', 'B11']);
var ndwi4 = composite4.normalizedDifference(['B8A', 'B11']);
var ndwi5 = composite5.normalizedDifference(['B8A', 'B11']);
var ndwiPalette = //['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594', '#002556'];//todoazul
//amarilloazul['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'];//amarilloazul
//['d1e5f0','92c5de','4393c3','2166ac', 'fde0ef','f1b6da','de77ae', 'c51b7d'];//violetaazul
['a50026','d73027','f46d43','fdae61','fee090', 'ffffbf','e0f3f8','abd9e9','74add1', '4575b4','313695'];//azulrojo
//Map.centerObject(geometry);
var vcultivo = {
  'Subtropical 03/02/2020': ndvi.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Subtropical 04/03/2020': ndvi1.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Hortícola 03/02/2020': ndvi2.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Hortícola 04/03/2020': ndvi3.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Cítrico 03/02/2020': ndvi4.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Cítrico 04/03/2020': ndvi5.visualize({min: -0.5, max: 0.9, palette: ndviPalette}),
  'Invernaderos': geometry_i,
};
var ehidrico = {
  'Subtropical 03/02/2020': ndwi.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Subtropical 04/03/2020': ndwi1.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Hortícola 03/02/2020': ndwi2.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Hortícola 04/03/2020': ndwi3.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Cítrico 03/02/2020': ndwi4.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Cítrico 04/03/2020': ndwi5.visualize({min: -0.2, max: 0.5, palette: ndwiPalette}),
  'Invernaderos': geometry_i,
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
var label = ui.Label('Developed by AGRON - agtech');
  label.style().set({
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
var label2 = ui.Label('En colaboración con la Cátedra de Geotecnologías UMA');
  label2.style().set({
    position:('bottom-left'),
    fontFamily:('monospace'),
    color:('#f08326'),
    backgroundColor:('#C7CFD9'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('10px'),
    //whiteSpace:('pre'),
    border:('1px solid black'),
    //shown: (false)
    });
//Add text to the map
var label3 = ui.Label('CULTIVOS EN LA AXARQUÍA');
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
var label4 = ui.Label('CULTIVOS EN LA AXARQUÍA');
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
var vizndwi = {min:[0], max:[1], palette:['a50026','d73027','f46d43','fdae61',
'fee090', 'ffffbf','e0f3f8','abd9e9','74add1', '4575b4','313695']};
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
rightMap.add(label);
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
leftMap.setCenter(-4.094156082253676, 36.78176811053717, 12);
//Display the Limit geometry
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: limit,
  color: 1,
  width: 3
});
rightMap.addLayer(outline, {palette: '#262626'}, 'edges');
leftMap.addLayer(outline, {palette: '#262626'}, 'edges');
//rightMap.addLayer(geometry_i, {palette: '#FFFFFF'});
//leftMap.addLayer(geometry_i, {palette: '#FFFFFF'});
leftMap.add(label3);
rightMap.add(label4);