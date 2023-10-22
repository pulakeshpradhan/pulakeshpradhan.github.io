var Arg = ee.FeatureCollection("users/geocastellanosg/Vectores/argen"),
    Rivers_sa = ee.FeatureCollection("users/geocastellanosg/Rivers_SAmerica_wwf"),
    hydroLakes = ee.FeatureCollection("users/geocastellanosg/HydroLake_NaturalEarth"),
    Dams = ee.FeatureCollection("users/geocastellanosg/Dams_GE-AquaStat"),
    gsw = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    RiversOSM = ee.FeatureCollection("users/geocastellanosg/Rivers_OSM_v2sin_canales"),
    RiverPolygon = ee.FeatureCollection("users/geocastellanosg/Rivers_P_OSM"),
    SW = ee.FeatureCollection("users/geocastellanosg/SW_OSM"),
    glaciar = ee.FeatureCollection("users/geocastellanosg/Lagos_Glaciares_OSM"),
    atlas2010 = ee.FeatureCollection("users/geocastellanosg/cuencas_atlas2010"),
    srtm = ee.Image("USGS/SRTMGL1_003"),
    Cuencas_f = ee.FeatureCollection("users/geocastellanosg/Cuencas_F");
var style =require('users/gena/packages:style');
style.SetMapStyleDark();
var occurrence = gsw.select('occurrence');
//Map.addLayer(occurrence, Name = "ocurrencia");
var occurrence= occurrence.clip(Arg);
var vis_ocurrencia = {
  min:1,
  max:100,
  palette: ['#9EFF90', '#0989AC']
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CUENCAS
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.centerObject(Arg,6);
var hydro = require('users/gena/packages:hydro')
// get catchments (all of level 6 and given an outlet)
var catchments3 = hydro.getCatchments({level: 3})
var catchments5 = hydro.getCatchments({level: 6})
//var catchmentsSelected = hydro.getCatchments({outlet: geometry, level: 6}) //a partir de un punto mostrar la zona de aportes
var Arg_basis3 = catchments3.filterBounds(Arg) //.geometryBoundaries) 
var Arg_basis5 = catchments5.filterBounds(Arg) //.geometryBoundaries) 
//Map.addLayer(Arg_basis5.style({color: '#FF8117', width: 1, fillColor: '00000030'}), {}, 'Cuencas Nivel 6')
//Map.addLayer(srtm,{}, 'srtm')
//Map.addLayer(atlas2010.style({color: '#2AD531', width: 2, fillColor: '00000050'}), {}, 'atlas2010')
Map.addLayer(Cuencas_f.style({color: '#FE5555', width: 2, fillColor: '00000020'}), {}, 'Cuencas Hidrográficas')
Map.addLayer({
    eeObject: occurrence.updateMask(occurrence.gt(20)),
    name: "Water Occurrence (1984-2015)",
    visParams:vis_ocurrencia
});
//Map.addLayer(RiverPolygon.style({color: '#85C1E9', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(SW.style({color: '#A9CCE3', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(glaciar.style({color: '#D4E6F1', width: 1}), {}, 'Cuencas Nivel 6')
Map.addLayer(RiversOSM.style({color: '#3498DB', width: 0.5}), {}, 'Rivers (OSM)')
Map.addLayer(Dams.style({color: '#FBFF00', width: 1}), {}, 'Dams Aquastat+Grand')
//Map.addLayer(srtm,{}, 'srtm')
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
var W_VIS_MAX_VALUE = 100;
var W_VIS_NONLINEARITY = 1;
function undoColorStretch(val) {
  return Math.pow(val, W_VIS_NONLINEARITY) * W_VIS_MAX_VALUE;
}
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
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(vis_ocurrencia.palette), labelPanel]);
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
      ui.Label('Frecuencia del Agua Superficial', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label('Source -Gennadii Donchyts.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('-JRC Global Surface Water Mapping Layers.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('-Open Street Map.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('-Dams: AquaStat.', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));