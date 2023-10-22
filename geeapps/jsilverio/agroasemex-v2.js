/*Variables para las colecciones.*/
//Area de interes
var Mexico = ee.FeatureCollection("USDOS/LSIB/2013")
              .filter(ee.Filter.or(ee.Filter.eq('name', 'MEXICO'))),
    Estado = ee.FeatureCollection("users/pbarrera/Tabasco_Mun_WGS84");
// Imagenes de modis promedio NDVI 2001-2020
var PROM_001 = ee.Image('users/jsilverio/NDVI_PROM_001');
var PROM_017 = ee.Image('users/jsilverio/NDVI_PROM_017');
var PROM_033 = ee.Image('users/jsilverio/NDVI_PROM_033');
var PROM_049 = ee.Image('users/jsilverio/NDVI_PROM_049');
var PROM_065 = ee.Image('users/jsilverio/NDVI_PROM_065');
var PROM_081 = ee.Image('users/jsilverio/NDVI_PROM_081');
var PROM_097 = ee.Image('users/jsilverio/NDVI_PROM_097');
var PROM_113 = ee.Image('users/jsilverio/NDVI_PROM_113');
var PROM_129 = ee.Image('users/jsilverio/NDVI_PROM_129');
var PROM_145 = ee.Image('users/jsilverio/NDVI_PROM_145');
var PROM_161 = ee.Image('users/jsilverio/NDVI_PROM_161');
var PROM_177 = ee.Image('users/jsilverio/NDVI_PROM_177');
var PROM_193 = ee.Image('users/jsilverio/NDVI_PROM_193');
var PROM_209 = ee.Image('users/jsilverio/NDVI_PROM_209');
var PROM_225 = ee.Image('users/jsilverio/NDVI_PROM_225');
var PROM_241 = ee.Image('users/jsilverio/NDVI_PROM_241');
var PROM_257 = ee.Image('users/jsilverio/NDVI_PROM_257');
var PROM_273 = ee.Image('users/jsilverio/NDVI_PROM_273');
var PROM_289 = ee.Image('users/jsilverio/NDVI_PROM_289');
var PROM_305 = ee.Image('users/jsilverio/NDVI_PROM_305');
var PROM_321 = ee.Image('users/jsilverio/NDVI_PROM_321');
var PROM_337 = ee.Image('users/jsilverio/NDVI_PROM_337');
var PROM_353 = ee.Image('users/jsilverio/NDVI_PROM_353');
// Creando la colección de imágenes MODIS NDVI promedio 2001-2020
var ColeccionModis = ee.ImageCollection([PROM_001, PROM_017, PROM_033, PROM_049, PROM_065, PROM_081, PROM_097, PROM_113, PROM_129, PROM_145,
                                        PROM_161, PROM_177, PROM_193, PROM_209, PROM_225, PROM_241, PROM_257, PROM_273,  PROM_289, PROM_305,
                                        PROM_321, PROM_337, PROM_353]);
//Capa de predios.             
var Predios = ee.FeatureCollection('users/jsilverio/VERSION_FINAL_16_03_ACTUAL'); //users/jsilverio/VERSION_SEGUIMIENTO_SIOF  //users/jsilverio/20_21_NL_y_TAMPS
//Colección de imágenes Sentinel-2, Mosaico para la capa
var S2_Layer = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterDate('2021-01-01', '2021-04-05')   //'2021-03-01', '2021-03-18'    //
                //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
                .filterBounds(Mexico)
                .map(function(image) {
                    return image.addBands(image.metadata('system:time_start','system:time_end'));
                  })
                .mosaic()
                .clip(Mexico);
//Colección de imágenes Sentinel-2, para el NDVI
var S_2 = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterDate('2021-01-01', '2021-04-05')
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                .filterBounds(Mexico);
//Colección de imágenes Sentinel-2, para RGB, Vegetación y Agricultura
var S2_RGB = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(Mexico)
                  .filterDate('2021-01-01', '2021-04-05')
                  //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start','system:time_end'));
                  })
                  .mosaic()
                  .clip(Mexico);
//Funcion para quitar los Map Layars
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  } else {
    //print('Layer '+name+' not found');
  }
};
// Function to calculate and add an NDVI band para la gráfica
var ndvi_ = S_2.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
});
var ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));    //NDVI de la capa
var CapaNDVI = ndvi_;   //NDVI para gráfica
var NDVI_MODIS = CapaNDVI.merge(ColeccionModis);   //Union del ndvi para la gráfica
//*****************Propiedades del predio. ******************************
var Ciclo;
var ClaveAseg;
var ClaveTipoP;
var Constancia;
var CveEstadoP;
var CveMunicip;
var CveRegionP;
var EstadoPred;
var FechaAcept;
var FinVigenci;
var HAS_POLY;
var ID_AGROASE;
var Inciso;
var InicioVige;
var MunicipioP;
var NomTipoCon;
var NombreCult;
var NombreFond;
var NombreMone;
var NombreSoci;
var NombreSubR;
var PRIMA_FOND;
var PRIMA_REAS;
var PRIMA_TOTA;
var Ramo;
var RegionPred;
var SEPERFICIE;
var SUMAASEGTO;
var Shape_Area;
var Shape_Leng;
var UnidadRies;
var VERT;
var fechaPago;
var FechaAceptacion;
var InicioVigencia;
var FinVigencia;
var DatosPredio;   //Variable para agregar los datos al panel.
//**************** Constants used to visualize the data on the map.******************
var NDVI_STYLE = {  min: -1,   max: 1,   palette: ['FF0000', 'FFFF00', '0B6121'] };
var RGB_STYLE = {  min:0,   max: 3000,  bands: ['B4', 'B3', 'B2'] };
var VEGETACION_STYLE = {  min:0,   max: 3000,  bands: ['B8', 'B4', 'B3'] };
var AGRICULTURA_STYLE = {  min:0,   max: 3000,  bands: ['B11', 'B8A', 'B2'] };
var POPULATION_STYLE = {  min: 0,  max: 1,  palette: ['lightyellow', 'steelblue', 'darkblue'] };
var POPULATION_VIS_MAX_VALUE = 1200;
var POPULATION_VIS_NONLINEARITY = 4;
var Predios_STYLE = {color: '26458d', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: 'BLUE'};
// Configure our map with a minimal set of controls.*******
Map.setControlVisibility(true);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
Map.setCenter(-98.4933, 26.0822, 12);
//Agregamos las capas de información al mapa
Map.addLayer(S2_RGB.clip(Mexico), RGB_STYLE,'RGB_SENTINEL2', 0);
Map.addLayer(S2_RGB.clip(Mexico), VEGETACION_STYLE, 'Vegetación_SENTINEL2');
Map.addLayer(S2_RGB.clip(Mexico), AGRICULTURA_STYLE, 'Agricultura_SENTINEL2', 0);
Map.addLayer(ndvi_Layer.clip(Mexico), NDVI_STYLE, 'NDVI_SENTINEL2', 0);
Map.addLayer(Predios.style(Predios_STYLE), {}, 'OI 2020/2021 SEGUIMIENTO AGROASEMEX');
// Create the application title bar.
Map.add(ui.Label('EXPLORACIÓN NDVI', {fontWeight: 'bold', fontSize: '24px'}));
/*              *******************PANEL IZQUIERDO**************************                     */
//Create a panel to hold our widgets.
var panel = ui.Panel();
//Valiables 
panel.style().set('width', '300px');
panel.SECTION_STYLE = {margin: '5px 0 0 0'};
panel.SECTION_PREDIOS_STYLE = {fontWeight: 'bold', margin: '2px 0 0 7px'};
panel.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
//Variable de imágenes Sentinel2
panel.COLLECTION_ID =  'COPERNICUS/S2_SR';
panel.IMAGE_COUNT_LIMIT = 100;
var filtered; //Filtro NDVI Sentinel 2
var filtroRGB; //Filtro RGB Sentinel 2
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Sentinel 2',
    style: {fontWeight: 'bold', fontSize: '24px', margin: '5px 5px'}
  }),
  ui.Label('Permite realizar filtros de fechas de inicio ' +
               'y fin para de las imágenes Sentinel-2.')
]);
panel.add(intro);
 /* The image picker section. */
  panel.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      onChange: panel.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Centrar mapa', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
panel.filters = {
    mapCenter: ui.Checkbox({label: 'Aplicar filtro en el mapa.', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2021-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2021-04-05'),
    applyButton: ui.Button('Aplicar filtro', applyFilters),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */ // 2   *****************
  var filtros = ui.Panel({
    widgets: [
      ui.Label('Selecciona las fechas', {fontWeight: 'bold'}),
      ui.Label('Fecha Inicio', panel.HELPER_TEXT_STYLE), panel.filters.startDate,
      ui.Label('Fecha Fin', panel.HELPER_TEXT_STYLE), panel.filters.endDate,
      panel.filters.mapCenter,
      ui.Panel([
        panel.filters.applyButton,
        panel.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE
  });
  panel.add(filtros);
  // 2   *************************************************************
 function applyFilters() {
    panel.setLoadingMode(true);
    filtered = ee.ImageCollection(panel.COLLECTION_ID);
    filtroRGB = ee.ImageCollection(panel.COLLECTION_ID);
    // Filter bounds to the map if the checkbox is marked.
    if (panel.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(Mexico);
      filtroRGB = filtroRGB.filterBounds(Mexico);
    }
    // Set filter variables.
    var start = panel.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = panel.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    if (start) filtroRGB = filtroRGB.filterDate(start, end);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    // Get the list of computed ids.
    var computedIdsRGB = filtroRGB
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIdsRGB.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    panel.refreshMapLayer();
  }
panel.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    panel.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      panel.filters.startDate,
      panel.filters.endDate,
      panel.filters.applyButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
panel.refreshMapLayer = function() {
   removeLayer('Predio seleccionado');
   removeLayer('OI 2020/2021 SEGUIMIENTO AGROASEMEX');
   removeLayer('NDVI_SENTINEL2');
   removeLayer('NDVI_SENTINEL2 FILTROS');
   removeLayer('RGB_SENTINEL2');
   removeLayer('RGB_SENTINEL2 FILTROS');
   removeLayer('Vegetación_SENTINEL2');
   removeLayer('Vegetación_SENTINEL2 FILTROS');
   removeLayer('Agricultura_SENTINEL2');
   removeLayer('Agricultura_SENTINEL2 FILTROS');
  //NDVI
   var S2 = filtered
            .filterBounds(Mexico)
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30);
   var S2_Layer = filtered
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                .mosaic()
                .clip(Mexico);
   var ndvi = S2.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
   });
   var ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));
   //print('ColeccionModis', ColeccionModis);
   CapaNDVI = ndvi;   //NDVI para gráfica
   NDVI_MODIS = CapaNDVI.merge(ColeccionModis);
   //print('NDVI_MODIS', NDVI_MODIS.limit(10));
   //FIN NDVI
   //RGB
   var S2_RGB = filtroRGB
                  //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                  .mosaic()
                  .clip(Mexico);
   //FIN RGB
    Map.addLayer(S2_RGB.clip(Mexico), RGB_STYLE, 'RGB_SENTINEL2 FILTROS', false);
    Map.addLayer(S2_RGB.clip(Mexico), VEGETACION_STYLE, 'Vegetación_SENTINEL2 FILTROS');
    Map.addLayer(S2_RGB.clip(Mexico), AGRICULTURA_STYLE, 'Agricultura_SENTINEL2 FILTROS', 0);
    Map.addLayer(ndvi_Layer.clip(Mexico), NDVI_STYLE, 'NDVI_SENTINEL2 FILTROS', false);
    Map.addLayer(Predios.style(Predios_STYLE), {}, 'OI 2020/2021 SEGUIMIENTO AGROASEMEX');
    if (panel.filters.mapCenter.getValue() === false) {
     // print('Entro aqui en false..');
      removeLayer('Predio seleccionado');
      removeLayer('NDVI_SENTINEL2 FILTROS');
      removeLayer('RGB_SENTINEL2 FILTROS');
      removeLayer('Vegetación_SENTINEL2 FILTROS');
      removeLayer('Agricultura_SENTINEL2 FILTROS');
    }
  };
/** Creates the application interface. */
panel.boot = function() {
  panel.createHelpers();
  var main = ui.Panel({
    widgets: [
      panel.filters.panel,
    ],
    style: {position: 'top-right', width: '320px', padding: '8px'}
  });
  panel.applyFilters();
};
//Agregamos el panel creado...
ui.root.insert(0, panel);
//*******************FIN PANEL IZQUIERDO***************************
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of VGeoOperacion the user has selected.
function getSelectedPredios() {
  var predio = Predios.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
  //var datos = predio.getInfo(0).features;
  //print('datos', datos);   //im1.getInfo()
  //print('datos.properties', datos);   //im1.getInfo()
  return predio;
}
// Makes a bar chart of the given FeatureCollection of VGeoOperacion by name.
function makeResultsBarChart(getSelectedPredios) {
  //print('getSelectedPredios', getSelectedPredios); //Para ver los campos que contiene el predio.
  var titulo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');
  //var properties = getSelectedPredios.propertyNames();
      Ciclo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Ciclo']).get('list');
      //ClaveAseg = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveAseg']).get('list');
      ClaveTipoP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveTipoP']).get('list');
      Constancia = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Constancia']).get('list');
      //CveEstadoP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveEstadoP']).get('list');
      //CveMunicip = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveMunicip']).get('list');
      //CveRegionP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveRegionP']).get('list');
      EstadoPred = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['EstadoPred']).get('list');
      FechaAcept = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FechaAcept']).get('list');
      FinVigenci = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FinVigenci']).get('list');
      HAS_POLY = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['HAS_POLY']).get('list');
      ID_AGROASE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');
      Inciso = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Inciso']).get('list');
      InicioVige = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['InicioVige']).get('list');
      MunicipioP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['MunicipioP']).get('list');
      //NomTipoCon = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NomTipoCon']).get('list');
      NombreCult = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreCult']).get('list');
      NombreFond = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreFond']).get('list');
      //NombreMone = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreMone']).get('list');
      //NombreSoci = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreSoci']).get('list');
      //NombreSubR = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreSubR']).get('list');
      //PRIMA_FOND = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_FOND']).get('list');
      //PRIMA_REAS = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_REAS']).get('list');
      //PRIMA_TOTA = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_TOTA']).get('list');
      //Ramo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Ramo']).get('list');
      //RegionPred = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['RegionPred']).get('list');
      SEPERFICIE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['SEPERFICIE']).get('list');
      //SUMAASEGTO = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['SUMAASEGTO']).get('list');
      //Shape_Area = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Shape_Area']).get('list');
      //Shape_Leng = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Shape_Leng']).get('list');
      //UnidadRies = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['UnidadRies']).get('list');
      //VERT = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['VERT']).get('list');
      //fechaPago = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['fechaPago']).get('list');
      ValoresPredio();
  //var datos = getSelectedPredios.get('system:id'); //], ['EstadoPred'], ['NombreCult'], ['HAS_POLY']).get('list');
   //print('datos',datos); //
  var chart = ui.Chart.image.series({
                                        imageCollection: NDVI_MODIS,  //CapaNDVI //NDVI_MODIS  //imagentif
                                        region: getSelectedPredios, 
                                        reducer: ee.Reducer.mean(), 
                                        scale: 10
                                      })
                                      .setSeriesNames(['NDVI_NORMAL', 'NDVI_ACTUAL'])
                                      .setChartType('LineChart')
                                      .setOptions({
                                        title: titulo.getInfo(0) + '',
                                        titleTextStyle: {italic: false, bold: true},
                                        legend: {position: 'right'},
                                        vAxis: {title: 'NDVI'},
                                        hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
                                        pointSize: 5,
                                        //series: {
                                        //  0: {color: '00FF00'},  //Personalizar colores de las lineas
                                        //  1: {color: '0000FF'}
                                        //}
                                      });
    chart.style().set({stretch: 'both'});
    return chart; 
}
// Makes a table of the given FeatureCollection of VGeoOperacion by name.
function makeResultsTable(Predios) {
  var table = ui.Chart.feature.byFeature(Predios, 'ID_AGROASE');  //VGeoOperacion, 'ID_AGR'
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected VGeoOperacion.
function updateOverlay() {
  var overlay = getSelectedPredios().style(HIGHLIGHT_STYLE);
  Map.layers().set(5, ui.Map.Layer(overlay, {}, 'Predio seleccionado'));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedPredios());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  removeLayer('Predio seleccionado');
  Map.layers().remove(Map.layers().get(5));
  var instructionsLabel = ui.Label('Selecciona un predio para ver su NDVI.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints = [];  //Limpiamos los predios seleccionados, para solo graficar uno.
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
Map.onClick(ValoresPixel);
//Map.onClick(ValoresPredio);
//ui.root.insert(0, panel);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Mostrar resultado en tabla',
        value: makeResultsBarChart,
      },
      {
        label: 'Mostrar resultado en gráfica',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Limpiar', clearResults)], //chartTypeToggleButton   //Quitamos el boton de mostrar resultado en tabla.
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('NDVI: ', {color: 'green', fontWeight: 'bold', fontSize: '15px'}));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
//Map.onClick(function(coords) {
  function ValoresPixel(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true); //true
  inspector.add(ui.Label('Leyendo...', {color: 'green', fontWeight: 'bold', fontSize: '15px'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = ndvi_Layer.reduce(ee.Reducer.mean());     //TempModis
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 1);
  var computedValue = sampledPoint.get('mean');
  // Request the value from the server and use the results in a function.
computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: ['NDVI: ' + result.toFixed(2)],
      style: {color: 'green', fontWeight: 'bold', fontSize: '15px'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Cerrar',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
}
 /* The panel for the filter control widgets. */ // 2   *****************
 function ValoresPredio() {
   panel.remove(DatosPredio);
   DatosPredio = '';
   FechaAceptacion = FechaAcept.getInfo(0);
   InicioVigencia = InicioVige.getInfo(0);
   FinVigencia = FinVigenci.getInfo(0);
   var FA = FechaAceptacion.map(function (number) { return ee.String(number); });
   var IV = InicioVigencia.map(function (number) { return ee.String(number); });
   var FV = FinVigencia.map(function (number) { return ee.String(number); });
   FechaAceptacion = FA[0];
   InicioVigencia = IV[0];
   FinVigencia = FV[0];
   if(FechaAcept.getInfo(0).length > 0)
   {
     FechaAceptacion = FechaAceptacion.slice(0,10);  //var eeString = ee.String(aString);
     InicioVigencia = InicioVigencia.slice(0,10);
     FinVigencia = FinVigencia.slice(0,10);
     FechaAceptacion = ee.String(FechaAceptacion);
     InicioVigencia = ee.String(InicioVigencia);
     FinVigencia = ee.String(FinVigencia);
     FechaAceptacion = ee.List([FechaAceptacion]);
     InicioVigencia = ee.List([InicioVigencia]);
     FinVigencia = ee.List([FinVigencia]);
     FechaAceptacion = FechaAceptacion.getInfo(0);
     InicioVigencia = InicioVigencia.getInfo(0);
     FinVigencia = FinVigencia.getInfo(0);
   }else{
     FechaAceptacion = '';
     InicioVigencia = '';
     FinVigencia = '';
   }
  DatosPredio = ui.Panel({
    widgets: [
      ui.Label('... ', {color: 'white', margin: '10px 0 0 7px'}),
      ui.Label('INFORMACIÓN DEL PREDIO. ', {color: 'black', margin: '10px 0 10px 7px'}),
      ui.Label('ID AGROASEMEX: ' + ID_AGROASE.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Cultivo: ' + NombreCult.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Modalidad: ' + ClaveTipoP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Ciclo: ' + Ciclo.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Constancia: ' + Constancia.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Inciso: ' + Inciso.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Poligonal: ' + HAS_POLY.getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Asegurada: ' + SEPERFICIE.getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      ui.Label('Estado: ' + EstadoPred.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Municipio: ' + MunicipioP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Fecha Aceptación: ' + FechaAceptacion, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Inicio Vigencia: ' + InicioVigencia, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Fin Vigencia: ' + FinVigencia, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Nombre Fondo: ' + NombreFond.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('ClaveAseg: ' + ClaveAseg.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('CveEstadoP: ' + CveEstadoP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('CveMunicip: ' + CveMunicip.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('CveRegionP: ' + CveRegionP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('ID_AGROASE: ' + ID_AGROASE.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Tipo Contrato: ' + NomTipoCon.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Moneda: ' + NombreMone.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Nombre Socio: ' + NombreSoci.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_FOND: ' + '$' + PRIMA_FOND.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_REASEGURO: ' + '$' + PRIMA_REAS.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_TOTAL: ' + '$' + PRIMA_TOTA.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Ramo: ' + Ramo.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Subramo: ' + NombreSubR.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Region Predeterminada: ' + RegionPred.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('SUMA ASEG TOTAL: ' + '$' + SUMAASEGTO.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Shape_Area: ' + Shape_Area.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Shape_Leng: ' + Shape_Leng.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Unidad Riesgo: ' + UnidadRies.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('VERT: ' + VERT.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Fecha Pago: ' + fechaPago.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Panel([
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {color: 'green', fontWeight: 'bold', fontSize: '14px'} //panel.SECTION_PREDIOS_STYLE
  });
  panel.add(DatosPredio);
  //print('despues de agregar');
  //panel.remove(DatosPredio);
  //print('volvio a remover');
 }