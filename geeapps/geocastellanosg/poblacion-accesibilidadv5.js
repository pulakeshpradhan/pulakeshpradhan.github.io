var Arg = ee.FeatureCollection("users/geocastellanosg/Vectores/Arg_provincial_no_preciso"),
    ciudades = /* color: #8cd65e */ee.Geometry.MultiPoint(
        [[-68.83610519075972, -32.87601440260597],
         [-64.18888839388472, -31.40628136751024],
         [-60.651290737634724, -32.949798352179045],
         [-58.3798646121121, -34.6101862924135],
         [-57.95963756133085, -34.92155314701146],
         [-57.53866319365238, -38.004696198788174],
         [-65.23758967161791, -26.78089179210778],
         [-65.41337092161791, -24.72285015189515],
         [-60.69853779507798, -31.62243656072545],
         [-68.53954389257672, -31.53499991843036],
         [-66.31226810326143, -33.301904955820206],
         [-66.85440300569007, -29.428658707225505],
         [-65.7768843349723, -28.472966673533374],
         [-64.26586070443096, -27.78815488687035],
         [-58.18311890637693, -26.177989210894403],
         [-64.28385077543737, -36.63496873719053],
         [-68.06278838055164, -38.95375029994932],
         [-58.9839514969467, -27.45309663389633],
         [-65.09919514364947, -43.29859880535495],
         [-60.514890230818764, -31.743123552583366],
         [-65.30537314670579, -24.196620697328946],
         [-55.904585790925466, -27.36703010932367],
         [-63.00010542554355, -40.81973369904627],
         [-69.2179097361489, -51.6219485379709],
         [-68.31062058600378, -54.799333332234596]]),
    Accesibilidad = ee.Image("Oxford/MAP/accessibility_to_cities_2015_v1_0"),
    regiones = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    Limites_paises = ee.FeatureCollection("USDOS/LSIB/2013"),
    friction = ee.Image("Oxford/MAP/friction_surface_2015_v1_0");
var style =require('users/gena/packages:style');
style.SetMapStyleDark();
//var palettes = require('users/gena/packages:colorbrewer').Palettes
var utils = require('users/gena/packages:utils')
//======================================================================================================================
Accesibilidad = Accesibilidad.clip(Arg)
//Map.addLayer(Accesibilidad, {min:0, max: 1000, palette: palettes.cmocean}, 'image niccoli')
// Displays global population density and population totals by country in
// chart or table form
Map.centerObject(Arg, 6)
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
ghslPop = ghslPop.clip(Arg)
print(Arg)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constants used to visualize the data on the map.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette: ['#ABEBC6', '#43A047','#1B4F72']
};
var POPULATION_VIS_MAX_VALUE = 2000;
var POPULATION_VIS_NONLINEARITY = 3;
var COUNTRIES_STYLE = {color: '#000000', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
// Apply a non-linear stretch to the population data for visualization.
function colorStretch_p(image) {
  return image.divide(POPULATION_VIS_MAX_VALUE)
      .pow(1 / POPULATION_VIS_NONLINEARITY);
}
// Inverts the nonlinear stretch we apply to the population data for
// visualization, so that we can back out values to display in the legend.
// This uses ordinary JavaScript math functions, rather than Earth Engine
// functions, since we're going to call it from JS to compute label values.
function undoColorStretch_p(val) {
  return Math.pow(val, POPULATION_VIS_NONLINEARITY) * POPULATION_VIS_MAX_VALUE;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constants used to visualize the data on the map.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ACCES_STYLE = {
  min: 0,
  max: 0.1,
  palette: ['#FEF9E7','#F7DC6F','#FFC107', '#F4511E', '#D32F2F','#00548C']
};
var ACCES_VIS_MAX_VALUE = 50000;
var ACCES_VIS_NONLINEARITY = 2;
// Apply a non-linear stretch to the population data for visualization.
function colorStretch_a(image) {
  return image.divide(ACCES_VIS_MAX_VALUE)
      .pow(1 / ACCES_VIS_NONLINEARITY);
}
// Inverts the nonlinear stretch we apply to the population data for
// visualization, so that we can back out values to display in the legend.
// This uses ordinary JavaScript math functions, rather than Earth Engine
// functions, since we're going to call it from JS to compute label values.
function undoColorStretch_a(val) {
  return Math.pow(val, ACCES_VIS_NONLINEARITY) * ACCES_VIS_MAX_VALUE;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configure our map with a minimal set of controls.
Map.setControlVisibility(true);
Map.setControlVisibility({scaleControl: false, zoomControl: false, mapTypeControl:true });
Map.style().set({cursor: 'crosshair'});
//Map.setCenter(0, 20, 3);
// Add our two base layers to the map: global population density and countries.
Map.addLayer(colorStretch_a(Accesibilidad.updateMask(Accesibilidad.gt(0))), ACCES_STYLE,'Accesibilidad');
Map.addLayer(colorStretch_p(ghslPop.updateMask(ghslPop.gt(0.12))), POPULATION_STYLE,'GHSL');
Map.addLayer(Arg.style(COUNTRIES_STYLE),{},'Argentina Provincial');
// Create the application title bar.
//Map.add(ui.Label('Explorador Prueba_1', {fontWeight: 'bold', fontSize: '24px'}));
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of countries the user has selected.
function getSelectedCountries() {
  return Arg.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar_p(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 0.8, 0.1],
      dimensions: '80x8',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 5px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend_p() {
  var labelPanel_p = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_p(0)), {margin: '2px 6px'}),
        ui.Label(
            Math.round(undoColorStretch_p(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_p(1)), {margin: '2px 6px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar_p(POPULATION_STYLE.palette), labelPanel_p]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar_a(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 0.8, 0.1],
      dimensions: '80x8',
      format: 'png',
      min: 0,
      max: 0.80,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 5px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend_a() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_a(0)), {margin: '2px 6px'}),
        ui.Label(
            Math.round(undoColorStretch_a(0.5)),
            {margin: '2px 6px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_a(1)), {margin: '2px 6px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar_a(ACCES_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '15px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '3px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '8px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '3px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('Accesibilidad', LEGEND_TITLE_STYLE), makeLegend_a(),
      ui.Label('(Tiempo de viaje (minutos) a población cercana.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Densidad Poblacional', LEGEND_TITLE_STYLE), makeLegend_p(),
      ui.Label('(Miles de personas por Km2)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Source: Global Human Settlement Layer (JRC)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Country boundaries source: Natural Earth', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));
//Map.addLayer(hydoLake,({color: '#DCFC8C', width: 1, fillColor: '00000088'}), 'Hidro Lakes (Natural Earth',false)