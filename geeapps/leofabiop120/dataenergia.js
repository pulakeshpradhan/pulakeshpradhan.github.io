//Estilo Oscuro
var style = require('users/gena/packages:style')
//Agregar estilo de mapa Oscuro (Darck)
style.SetMapStyleDark()
//Map.setControlVisibility(true, true, true, true, true).setOptions("TERRAIN");
// Visualization for WRI/GPPD/power_plants
// https://code.earthengine.google.com/9efbd726e4a8ba9b8b56ba94f1267678
var table = ee.FeatureCollection("WRI/GPPD/power_plants");
// Get a color from a fuel
var fuelColor = ee.Dictionary({
  'Coal': '000000',
  'Oil': '593704',
  'Gas': 'BC80BD',
  'Hydro': '0565A6',
  'Nuclear': 'E31A1C',
  'Solar': 'FF7F00',
  'Waste': '6A3D9A',
  'Wind': '5CA2D1',
  'Geothermal': 'FDBF6F',
  'Biomass': '229A00'
});
// List of fuels to add to the map
var fuels = ['Coal', 'Oil', 'Gas', 'Hydro', 'Nuclear', 'Solar', 'Waste',
    'Wind', 'Geothermal', 'Biomass'];
/**
 * Computes size from capacity and color from fuel type.
 *
 * @param {!ee.Geometry.Point} pt A point
 * @return {!ee.Geometry.Point} Input point with added style dictionary.
 */
function addStyle(pt) {
  var size = ee.Number(pt.get('capacitymw')).sqrt().divide(10).add(2);
  var color = fuelColor.get(pt.get('fuel1'));
  return pt.set('styleProperty', ee.Dictionary({'pointSize': size, 'color': color}));
}
// Make a FeatureCollection out of the power plant data table
var pp = ee.FeatureCollection(table).map(addStyle);
print(pp.first());
/**
 * Adds power plants of a certain fuel type to the map.
 *
 * @param {string} fuel A fuel type
 */
function addLayer(fuel) {
  print(fuel);
  Map.addLayer(pp.filter(ee.Filter.eq('fuel1', fuel)).style({styleProperty: 'styleProperty', neighborhood: 50}), {}, fuel, true, 0.65);
}
// Apply `addLayer` to each record in `fuels`
fuelColor.keys().getInfo().map(addLayer);
//Agregar leyenda al mapa
var names = [
  'Coal',
  'Oil',
  'Gas',
  'Hydro',
  'Nuclear',
  'Solar',
  'Waste',
  'Wind',
  'Geothermal',
  'Biomass'
  ];
var values = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  ];
var elevationPalette = ['000000','593704', 'BC80BD','0565A6', 'E31A1C', 'FF7F00','6A3D9A','5CA2D1','FDBF6F','229A00'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Plantas de Energía',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white',margin: '0 0 4px 0',padding: '0'}
});
// Add the title to the panel
legend.add(legendTitle);
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
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white',margin: '0 0 4px 6px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
  });
};
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(elevationPalette[i], names[i]));
  }  
// Add the legend to the map.
//Map.add(legend);
//Fuente 
//Fuente de Datos
var notesShow2 = false;
function notesButtonHandler2() {
  if(notesShow2){
    notesShow2 = false;
    notesPanel2.style().set('shown', false);
    notesPanel2.style().set('width', '83px');
    notesButton2.setLabel('Fuente de Datos');
  } else {
    notesShow2 = true;
    notesPanel2.style().set('shown', true);
    notesPanel2.style().set('width', '350px');
    notesButton2.setLabel('Ocultar');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', color:'DimGrey', fontSize: '9px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton2 = ui.Button({label: 'Fuente de Datos', onClick: notesButtonHandler2, style: {margin: '0px'}});
var notesPanel2 = ui.Panel({
  widgets: [
  ui.Label({value:'* Fuente y Descripción de Datos', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'* Leer sobre los Datos de Energía Mundial', style: noteStyle, targetUrl:'https://datasets.wri.org/dataset/globalpowerplantdatabase'}),
  ui.Label({value: '• Consulte la descripción de los datos en el catálogo de datos de Earth Engine.',
        style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'}),
    ui.Label({value:'Desarrollado por: Fabio Casco', style: noteStyle}),
    ui.Label({value:'Referemcia Sugerida', style: noteStyle}),
    ui.Label({value:'Global Energy Observatory, Google, KTH Royal Institute of Technology in Stockholm, University of Groningen, World Resources Institute. 2018. Global Power Plant Database. Published on Resource Watch and Google Earth Engine; http://resourcewatch.org/ https://earthengine.google.com/ ', style: noteStyle}),
   // ui.Label({value:'Desarrollado por: Fabio Casco', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer2 = ui.Panel({widgets: [notesButton2, notesPanel2],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
Map.add(notesContainer2);
var panel = ui.Panel({
  style: {
    height: '400px',
    width: '300px',
    position: 'bottom-left',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  }
});
var panelTitle = ui.Label({
  value: 'Data-Energía',
  style: {fontWeight: 'bold', fontSize: '20px', backgroundColor: 'gray', color: 'white'}
});
  // Create the inspector panel, initially hiding it.
  var placeHolder = ui.Label({
    value: 'Data-Energía es un prototipo de aplicación para facilitar el uso de datos sobre ergía a nivel mudial',
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'gray', color: 'white'},
    });
   var inspector = ui.Panel({style: {shown: true, backgroundColor: 'gray', color: 'black'},  widgets: [
    placeHolder
  ]});
panel.add(panelTitle)
panel.add(placeHolder)
panel.add(legend)
Map.add(panel);
//-----------------------------------Agregar etiquedas el mapa---------------------------------------------------//
//**********************************-------------------------****************************************************//
//Base de datos que deseamos visulizar sus etiquetas
var lmopi = table//
var list = ee.FeatureCollection(lmopi) 
var label = new ui.Label({
  value: 'Clic para ver las Propiedades',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
var inspector = ui.Panel({
  style: {
    position: 'bottom-center',
    backgroundColor: 'grey', color: 'white'
  }
});
inspector.add(label)
function updateText(strings) {
  var labels = strings.map(function(s) {
    return ui.Label({
  value: s,
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
})
  })
  inspector.widgets().reset(labels)
}
// add a map layer to show selection
var selectionLayer = ui.Map.Layer(ee.Image(), { color: 'feb24c' }, 'Click')
Map.layers().add(selectionLayer)
function inspect(coords) {
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  // generated search geometry and update it
  var scale = Map.getScale()
  var searchRadius = 10
  var selection = point.buffer(scale * searchRadius, scale)
  selectionLayer.setEeObject(selection)
  // find the nearest feature (use 10 screen pixels as a search buffer)
  var nearestFeature = list.filterBounds(selection).first()
  // server -> client
  nearestFeature.evaluate(function(f) {
    if(f === null) {
      updateText(['No features found'])
      return
    }
    updateText([
      'País: ' + f.properties.country_lg,
      'Lat: ' + f.properties.latitude + ' Lon: ' + f.properties.longitude,
      //'Lon: ' + f.properties.longitude,
      'Capacidad : ' + f.properties.capacitymw + " MW",
      'Fuente de Energía : ' + f.properties.fuel1,
      'Propietario : ' + f.properties.owner,
     // 'Ubicación : ' + f.properties.src_latlon
      //comm_year
    ])
  })
}
//Map.addLayer(list)
Map.add(inspector);
Map.onClick(inspect)
Map.style().set({ cursor: 'crosshair' })