var Arg = ee.FeatureCollection("users/geocastellanosg/Vectores/argen"),
    Rivers_sa = ee.FeatureCollection("users/geocastellanosg/Rivers_SAmerica_wwf"),
    hydroLakes = ee.FeatureCollection("users/geocastellanosg/HydroLake_NaturalEarth"),
    Dams = ee.FeatureCollection("users/geocastellanosg/Dams_GE-AquaStat"),
    gsw = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    RiversOSM = ee.FeatureCollection("users/geocastellanosg/Rivers_OSM_v2sin_canales"),
    RiverPolygon = ee.FeatureCollection("users/geocastellanosg/Rivers_P_OSM"),
    SW = ee.FeatureCollection("users/geocastellanosg/SW_OSM"),
    selected = /* color: #d63000 */ee.Geometry.LineString(
        [[-62.551167637237484, -30.23044857216753],
         [-63.116963535674984, -29.199975978507908],
         [-63.32454734940126, -28.653758823378407],
         [-63.66787010330751, -28.533178752846265],
         [-64.53206043297507, -27.677357236306552],
         [-65.27913074547507, -27.716267271181042],
         [-65.20222644860007, -27.348503096732077],
         [-65.38075428063132, -27.104275726613864]]),
    geometry = /* color: #98ff00 */ee.Geometry.Point([-62.64300100235516, -30.423552698383975]),
    flood_p = ee.Image("users/jhouspa/first_flood_map_paraguay"),
    flood_c = ee.Image("users/jhouspa/first_flood_map"),
    Bandera = /* color: #0b4a8b */ee.Geometry.Point([-62.26302240239261, -28.88662601137719]),
    Winifreda = /* color: #ffc82d */ee.Geometry.Point([-64.23442445209963, -36.22485894643548]),
    l8_t = ee.Image("users/geocastellanosg/frecuenciaL8_Tucu"),
    l8_s = ee.Image("users/geocastellanosg/frecuenciaL8_Santiago"),
    l8_sf = ee.Image("users/geocastellanosg/frecuenciaL8_SF"),
    l8_p = ee.Image("users/geocastellanosg/frecuenciaL8_Pampa"),
    l8_er = ee.Image("users/geocastellanosg/frecuenciaL8_ER"),
    l8_c = ee.Image("users/geocastellanosg/frecuenciaL8_Cordoba"),
    l8_ba = ee.Image("users/geocastellanosg/frecuenciaL8_BsAs"),
    l5_f = ee.Image("users/geocastellanosg/frecuenciaL5_BsAs0012"),
    land_cover = ee.ImageCollection("COPERNICUS/CORINE/V18_5_1/100m");
var l8_f = ee.ImageCollection([l8_t,l8_s,l8_sf,l8_p,l8_er,l8_c,l8_ba,])
var style =require('users/gena/packages:style');
style.SetMapStyleDark();
var occurrence = gsw.select('occurrence');
//Map.addLayer(occurrence, Name = "ocurrencia");
var occurrence= occurrence.clip(Arg);
var vis_flood = {
  min:0,
  max:100,
  palette: ['#FF0000','#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD']
};
Map.addLayer({
    eeObject: flood_p,
    name: "flood_p",
    visParams:vis_flood
});
Map.addLayer({
    eeObject: flood_c,
    name: "flood_c",
    visParams:vis_flood
});
var vis_ocurrencia = {
  min:0,
  max:100,
  palette: ['#FEF5E7', '#D32F2F']
};
var vis_frecuencia = {
  min:1,
  max:4,
  palette: ['#FEF5E7', '#D32F2F']
};
Map.addLayer({
    eeObject: l8_f,
    name: "Frecuencia Landsat 8",
    visParams:vis_frecuencia
});
Map.addLayer({
    eeObject: l5_f,
    name: "Frecuencia Landsat 5(2000-2012)",
    visParams:vis_frecuencia
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CUENCAS
///////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.centerObject(Arg,6);
var hydro = require('users/gena/packages:hydro')
// get catchments (all of level 6 and given an outlet)
var catchments6 = hydro.getCatchments({level: 6})
var cuenca_s = catchments6.filterBounds(selected)
var catchmentsSelected = hydro.getCatchments({outlet: geometry, level: 6}) //a partir de un punto mostrar la zona de aportes
Map.addLayer(cuenca_s.style({color: '#C1D51F', width: 1, fillColor: '00000020'}), {}, 'Cuencas dulce' )
land_cover = land_cover.map(function (img) {return img.clip(cuenca_s)})
Map.addLayer(occurrence.updateMask(occurrence.gt(20)),vis_ocurrencia,"Water Occurrence (1984-2015)", false);
Map.addLayer(land_cover,{},"land_cover COPERNICUS-CORINE", false);
//Map.addLayer(RiverPolygon.style({color: '#85C1E9', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(SW.style({color: '#A9CCE3', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(glaciar.style({color: '#D4E6F1', width: 1}), {}, 'Cuencas Nivel 6')
Map.addLayer(RiversOSM.style({color: '#3498DB', width: 1.5}), {}, 'Rivers (OSM)')
Map.addLayer(Dams.style({color: '#FBFF00', width: 2}), {}, 'Dams Aquastat+Grand')
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
//-----------------------------------------------------------------------------------------
var W_VIS_MAX_VALUEa = 100;
var W_VIS_NONLINEARITYa = 1;
function undoColorStretcha(val) {
  return Math.pow(val, W_VIS_NONLINEARITYa) * W_VIS_MAX_VALUEa;
}
function ColorBara(palettea) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palettea,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegenda() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretcha(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretcha(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretcha(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBara(vis_flood.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLEa = {
  fontSize: '10px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '3px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLEa = {
  fontSize: '8px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '3px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('"Ola de primera Inudacion"', LEGEND_TITLE_STYLEa), makeLegenda(),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));