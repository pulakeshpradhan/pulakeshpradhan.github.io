var Arg = ui.import && ui.import("Arg", "table", {
      "id": "users/geocastellanosg/Vectores/argen"
    }) || ee.FeatureCollection("users/geocastellanosg/Vectores/argen"),
    Rivers_sa = ui.import && ui.import("Rivers_sa", "table", {
      "id": "users/geocastellanosg/Rivers_SAmerica_wwf"
    }) || ee.FeatureCollection("users/geocastellanosg/Rivers_SAmerica_wwf"),
    hydroLakes = ui.import && ui.import("hydroLakes", "table", {
      "id": "users/geocastellanosg/HydroLake_NaturalEarth"
    }) || ee.FeatureCollection("users/geocastellanosg/HydroLake_NaturalEarth"),
    Dams = ui.import && ui.import("Dams", "table", {
      "id": "users/geocastellanosg/Dams_GE-AquaStat"
    }) || ee.FeatureCollection("users/geocastellanosg/Dams_GE-AquaStat"),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_0/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    RiversOSM = ui.import && ui.import("RiversOSM", "table", {
      "id": "users/geocastellanosg/Rivers_OSM_v2sin_canales"
    }) || ee.FeatureCollection("users/geocastellanosg/Rivers_OSM_v2sin_canales"),
    RiverPolygon = ui.import && ui.import("RiverPolygon", "table", {
      "id": "users/geocastellanosg/Rivers_P_OSM"
    }) || ee.FeatureCollection("users/geocastellanosg/Rivers_P_OSM"),
    SW = ui.import && ui.import("SW", "table", {
      "id": "users/geocastellanosg/SW_OSM"
    }) || ee.FeatureCollection("users/geocastellanosg/SW_OSM"),
    AltaGracia = ui.import && ui.import("AltaGracia", "table", {
      "id": "users/geocastellanosg/Ap_AltaGracia"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_AltaGracia"),
    CarlosPaz = ui.import && ui.import("CarlosPaz", "table", {
      "id": "users/geocastellanosg/Ap_CarlosPaz"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_CarlosPaz"),
    CruzEje = ui.import && ui.import("CruzEje", "table", {
      "id": "users/geocastellanosg/Ap_CruzDelEje"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_CruzDelEje"),
    JesusMaria = ui.import && ui.import("JesusMaria", "table", {
      "id": "users/geocastellanosg/Ap_JesusMaria"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_JesusMaria"),
    MarcosJuarez = ui.import && ui.import("MarcosJuarez", "table", {
      "id": "users/geocastellanosg/Ap_MarcosJuarez"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_MarcosJuarez"),
    Molinos = ui.import && ui.import("Molinos", "table", {
      "id": "users/geocastellanosg/Ap_Molinos_Cord_Cap"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_Molinos_Cord_Cap"),
    RioCuarto = ui.import && ui.import("RioCuarto", "table", {
      "id": "users/geocastellanosg/Ap_RioCuarto"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_RioCuarto"),
    SanRoque = ui.import && ui.import("SanRoque", "table", {
      "id": "users/geocastellanosg/Ap_SanRoque"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_SanRoque"),
    VillaDolores = ui.import && ui.import("VillaDolores", "table", {
      "id": "users/geocastellanosg/Ap_villaDolores"
    }) || ee.FeatureCollection("users/geocastellanosg/Ap_villaDolores"),
    OUTMJ = ui.import && ui.import("OUTMJ", "table", {
      "id": "users/geocastellanosg/ConOUT_MJ"
    }) || ee.FeatureCollection("users/geocastellanosg/ConOUT_MJ"),
    CordobaLimite = ui.import && ui.import("CordobaLimite", "table", {
      "id": "users/geocastellanosg/Cordoba"
    }) || ee.FeatureCollection("users/geocastellanosg/Cordoba"),
    FlowAcc = ui.import && ui.import("FlowAcc", "image", {
      "id": "users/geocastellanosg/Flow_acc-180mCordoba"
    }) || ee.Image("users/geocastellanosg/Flow_acc-180mCordoba"),
    Censo = ui.import && ui.import("Censo", "table", {
      "id": "users/geocastellanosg/censo2015"
    }) || ee.FeatureCollection("users/geocastellanosg/censo2015"),
    Urbano = ui.import && ui.import("Urbano", "table", {
      "id": "users/geocastellanosg/planta_Urbana"
    }) || ee.FeatureCollection("users/geocastellanosg/planta_Urbana"),
    POB20k = ui.import && ui.import("POB20k", "table", {
      "id": "users/geocastellanosg/pob_20k"
    }) || ee.FeatureCollection("users/geocastellanosg/pob_20k"),
    Vis_flow = ui.import && ui.import("Vis_flow", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 139,
        "max": 585,
        "palette": [
          "001fff",
          "6aacff",
          "22cbff",
          "13ffb5",
          "1dff84",
          "6fff68",
          "a5ff91",
          "a7ff7e",
          "ffe7b4"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":139,"max":585,"palette":["001fff","6aacff","22cbff","13ffb5","1dff84","6fff68","a5ff91","a7ff7e","ffe7b4"]};
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
    eeObject: FlowAcc,
    name: "Flow_Acc a 180m",
    visParams:Vis_flow
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CUENCAS
///////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.centerObject(Arg,6);
Map.addLayer(AltaGracia.style({color: '#FE5446', width: 1, fillColor: '#FAD0CC'}), {}, 'Alata Gracia' )
Map.addLayer(CarlosPaz.style({color: '#C1D51F', width: 2, fillColor: '00000020'}), {}, 'Villa Carlos Paz' )
Map.addLayer(CruzEje.style({color: '#C1D51F', width: 2, fillColor: '00000020'}), {}, 'Cruz del Eje' )
Map.addLayer(JesusMaria.style({color: '#C1D51F', width: 2, fillColor: '00000020'}), {}, 'Jesus Maria' )
Map.addLayer(MarcosJuarez.style({color: '#C1D51F', width: 0.5, fillColor: '00000020'}), {}, 'Marcos Juarez' )
Map.addLayer(Molinos.style({color: '#C1D51F', width: 0.5, fillColor: '00000020'}), {}, 'Los Molinos' )
Map.addLayer(RioCuarto.style({color: '#C1D51F', width: 0.5, fillColor: '00000020'}), {}, 'Rio Cuarto' )
Map.addLayer(SanRoque.style({color: '#C1D51F', width: 0.5, fillColor: '00000020'}), {}, 'Dique san Roque' )
Map.addLayer(VillaDolores.style({color: '#C1D51F', width: 0.5, fillColor: '00000020'}), {}, 'Villa Dolores' )
Map.addLayer(Urbano.style({color: '#119F33', width: 1, fillColor: '#3FD764'}), {}, 'Urbano' )
Map.addLayer(occurrence.updateMask(occurrence.gt(10)),vis_ocurrencia,"Water Occurrence (1984-2019)", false);
Map.addLayer(RiversOSM.style({color: '#3498DB', width: 0.5}), {}, 'Rivers (OSM)')
Map.addLayer(OUTMJ.style({color: '#FF0000 ', width: 2}), {}, 'OUTMJ')
Map.addLayer(Dams.style({color: '#FBFF00', width: 2}), {}, 'Dams Aquastat+Grand')
Map.addLayer(POB20k.style({color: '#D600FF ', width: 5}), {}, 'Pob > 20k')
//land_cover = land_cover.map(function (img) {return img.clip(cuenca_s)})
//Map.addLayer(land_cover,{},"land_cover COPERNICUS-CORINE", false);
//Map.addLayer(RiverPolygon.style({color: '#85C1E9', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(SW.style({color: '#A9CCE3', width: 1}), {}, 'Cuencas Nivel 6')
//Map.addLayer(glaciar.style({color: '#D4E6F1', width: 1}), {}, 'Cuencas Nivel 6')
/*
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
      ui.Label('Source: Donchyts, D.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Housspanossian,J.', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Castellanos,G.', LEGEND_FOOTNOTE_STYLE),
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
*/