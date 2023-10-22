var roi = ui.import && ui.import("roi", "table", {
      "id": "users/erollero/IGN/departamentos"
    }) || ee.FeatureCollection("users/erollero/IGN/departamentos"),
    Frutales = ui.import && ui.import("Frutales", "table", {
      "id": "users/estimacionesmagyp/CITIRICOSCOMPLETO"
    }) || ee.FeatureCollection("users/estimacionesmagyp/CITIRICOSCOMPLETO"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/estimacionesmagyp/cartoforestley25080"
    }) || ee.FeatureCollection("users/estimacionesmagyp/cartoforestley25080");
Map.setCenter(-62.97, -29.73, 6)
var epoca1="MNC_verano2020_V1"
var epoca2="MNC_invierno2019_V1"
var mapa_invierno = ee.ImageCollection("users/deabelle/MNC_invierno2020_V1/RF_V1_FT2E_remap_JSS_M_JV_SB");
var mapa_verano   = ee.ImageCollection("users/deabelle/MNC_verano2021_V1/RF_V1_FT2E_remap_JSS_M_JV_SB");
// var palette_MNC_INV=[
//   '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff',
//   '#339820'   ,'#955f20',    '#612517',    '#fcc1b3',     '#dcdfe3',    '#fbff05',   '#646b63','#fcc1b3','#e6f0c2','#000000',
//   '#94d200'   ,'#94d200',     '#000000',    '#94d200',     '#000000',
// ]
var palette_MNCi=[
  '#42f4ce', '#ffffff', '#ffffff',  '#ffffff',  '#ffffff',  '#646b63', '#ec7d74', '#ffffff', '#ffffff', '#ffffff',
  '#0042ff', '#339820', '#955f20', '#fcc1b3',  '#612517',  '#dcdfe3',  '#dcdfe3', '#fbff05', '#646b63', '#fcc1b3',
  '#e6f0c2', '#000000', '#94d200', '#94d200',  '#D54B01',  '#e6f0c2'
 ]
Map.addLayer(mapa_invierno, {min:0, max:25, palette: palette_MNCi}, 'Invierno 2020',0);
var palette_MNCv=[
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#955f20', '#612517', '#ffffff', '#ffffff', '#ffffff',
  '#0042ff', '#339820', '#a41de2', '#f022db', '#fcc1b3', '#b7b9bd', '#fbff05', '#1d1e33', '#1e0f6b', '#a32102',
  '#000000', '#646b63', '#e6f0c2', '#612517', '#94d200', '#ffffff', '#FF5050', '#ffffff', '#a39264', '#ffffff',
  '#ffffff', '#e6f0c2'
 ]
// Map.addLayer(mnc2.mask(mnc2.neq(25)), {min:0, max:25, palette: palette_MNC}, 'MNC ver 20 V1G Mask',true);
Map.addLayer(mapa_verano, {min:0, max:31, palette: palette_MNCv}, 'Verano 2021',true);
//------------------------------- Leyenda invierno
var cfg = {
palette:  palette_MNCi,
// [
//   '#42f4ce', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#646b63', '#ec7d74', '#ffffff', '#ffffff', '#ffffff',
//   '#0042ff', '#339820', '#955f20', '#612517', '#955f20', '#dcdfe3', '#fbff05', '#000000', '#646b63', '#fcc1b3',
//   '#e6f0c2', '#94d200', '#94d200', '#000000', '#D54B01', '#e6f0c2'
// ],
 flagviz: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
           0, 0, 0, 0, 1, 1
           ],
 label: [
    'Cereales de invierno', //0
    '',
    '',
    '',
    '',
    '', //5
    'Garbanzo', // nueva
    '',
    '',
    '',
    '', // 10
    '', //11
    '',
    '',
    '',
    '', //15
    '',
    '', // nueva
    'Barbecho',
    'Caña de azucar',
    'No agrícola', //20 (no se muestra)
    '',
    '',
    '',
    'Arveja',
    'No agrícola' //25
    ],
};
// Legend code /
var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
var get_legend = function(title, cfg){
  var legend = ui.Panel({
      style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  legend.add(legendTitle);
  for(var i = 0; i < cfg.label.length; i++ ){
    if(cfg.flagviz[i]){
      legend.add(
          makeRow(
            cfg.palette[i],
            cfg.label[i] //+ " (ID: " + i+")"
          )
      );
    }
  }
  return legend;
}
/**
 * Configuración de la interfaz
 *
 *
 * *****/
// var logo = ee.Image("users/deabelle/MNC_verano2020_V1/logo_180");
var logo = ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia");
// var Titulo = ui.Label("Mapa Nacional de ", {fontSize: "24px", fontWeight: 'bold',margin: "0% 0% 4% 16%"})
// var Titulo2 = ui.Label("Cultivos Extensivos", {fontSize: "24px", fontWeight: 'bold',margin: "0% 1% 0% 15%"})
var subTitulo = ui.Label("Campaña 2020/2021", {fontSize: "16px",margin: "0 0% 4% 30%"})
var texto_footer1 = ui.Label("El Informe Técnico", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer2 = ui.Label(" capas utilizadas ", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer_link = ui.Label({
  value: 'aquí',
  style: {fontSize: "14px", border: '0px solid black',fontWeight: 'bold', margin: "0px 0px 0px 2px"},
  targetUrl: 'https://www.magyp.gob.ar/sitio/areas/estimaciones/'
});
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Global Forest Change', {fontSize: '10px', color: 'red'});
var text = ui.Label(
    'Results from analysis of Landsat images characterizing forest extent and change.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '100px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Science paper by Hansen, Potapov, Moore, Hancher et al.', {},
    'https://glad.earthengine.app/view/global-forest-change');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var img_logo = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'250px',margin: "4% 4% 4% 20%"}});
var header = ui.Panel(
  [img_logo,  subTitulo],
  ui.Panel.Layout.Flow("vertical"), {textAlign: "center"})
var panel = null;
//-------------------- Leyenda verano
var cfg2 = {
// palette: [
//   '#ffffff',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#955f20',    '#612517','#ffffff','#ffffff','#ffffff', '#0042ff',
//   '#339820'   ,'#a41de2',     '#f022db',    '#fcc1b3',     '#b7b9bd',    '#fbff05',   '#1d1e33','#1e0f6b','#a32102','#000000',
//   '#646b63'   ,'#e6f0c2',     '#000000',    '#94d200',     '#000000',
// ],
// flagviz: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1,
//           1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
//           1, 1, 0, 0, 0
//           ],
// label: [
//     '', //0
//     '',
//     '',
//     '',
//     '',
//     '', //5 --Nueva
//     '',
//     '',
//     '',
//     '',
//     'Maíz', // 10
//     'Soja', //11
//     'Girasol',
//     'Poroto',
//     'Caña de azucar',
//     'Algodón', //15
//     'Maní',
//     'Arroz', //nueva
//     'Sorgo', //nueva
//     'Girasol-CV',
//     '', //20
//     'Barbecho', //nueva
//     'No agrícola',
//     '',
//     '',
//     '' //25
//     ],
 palette: palette_MNCv,
// [
//   '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#955f20', '#612517', '#ffffff', '#ffffff', '#ffffff',
//   '#0042ff', '#339820', '#a41de2', '#f022db', '#fcc1b3', '#b7b9bd', '#fbff05', '#1d1e33', '#1e0f6b', '#a32102',
//   '#000000', '#646b63', '#e6f0c2', '#612517', '#94d200', '#ffffff', '#FF5050', '#ffffff', '#e0d8b0', '#ffffff',
//   '#ffffff', '#e6f0c2'
// ],
 flagviz: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
           0, 1
           ],
 label: [
    '', //0
    '',
    '',
    '',
    '',
    '',//'Furtales y arbustivas', //5 --Nueva
    'Forestales y Frutales',
    '',
    '',
    '',
    'Maíz', // 10
    'Soja', //11
    'Girasol',
    'Poroto',
    'Caña de azucar',
    'Algodón', //15
    'Maní',
    'Arroz', //nueva
    'Sorgo GR', //nueva
    'Girasol-CV',
    '', //20
    'Barbecho', //nueva
    'No agrícola', //22
    '',
    '',
    '',
    'Papa',
    '',
    'Verdeo de Sorgo',
    '',
    '',
    'No agrícola' //31
    ]
};
/**
 * Se agregan los paneles
 *
 * **/
var panel_legend = ui.Panel(
  {widgets: [get_legend("Invierno 2020", cfg), get_legend("Verano 2021", cfg2)],
   layout:  ui.Panel.Layout.Flow("horizontal"),
   style:   {}})
var panel_texto_footer1 = ui.Panel(
  {widgets: [texto_footer2, texto_footer_link],
   layout:  ui.Panel.Layout.Flow("horizontal"),
   style:   {width: "80%"}})
panel = ui.Panel({
  // Agrego Leyenda invierno y TS abajo
  widgets: [header, panel_legend ,  texto_footer1, panel_texto_footer1],
  style:   { margin: "0px", padding: "0px"}
})
ui.root.add(panel)
///////////////////////////////
var dataset = ee.Image('UMD/hansen/global_forest_change_2020_v1_8');
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 1,
  max: 100,
  palette: ['white', '#A0522D']
};
var dataset1 = dataset.clip(roi);
var dataset12 = dataset1.updateMask(dataset1.gte(1));
// Display the result.
Map.addLayer(dataset12, treeCoverVisParam,'tree cover > 5 mts.',0);
//Map.addLayer(dataset.clip(roi), treeCoverVisParam, 'tree cover > 5 mts.',0);
/**********MASCARA ALTURA DE BOSQUE*****************/
var gedi = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAM_v27');
print(gedi);
var gedia = gedi.clip(roi);
var gedimk = gedia.updateMask(gedia.gte(1));
// Display the result.
Map.addLayer(gedimk, {palette: ['#A0522D', '#000000']},'Bosque > 1 mt. 2019 GEDI',1);
///////////////////////////////// Cartografía forestal 
var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
/// Estilos borde cartografía 
var empty = ee.Image().byte();
//Map.addLayer(cartografia_plantaciones.draw({color: '330033', strokeWidth: 1}), {}, 'macizos');
var palette2 = ['FED90D'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 'FED90D',
});
Map.addLayer(fills, {palette: palette2, max: 14}, 'Macizos');
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var Frutales= ee.FeatureCollection('users/estimacionesmagyp/CITIRICOSCOMPLETO');
var palette = ['ff8eaa'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: Frutales,
  color: 'ff8eaa',
});
Map.addLayer(fills, {palette: palette, max: 14}, 'Cítricos');
// Cartografía forestal Cortinas
/// Estilos borde cartografía 
var cartografia_plantaciones_cortinas = ee.FeatureCollection( 'users/mgaute/cortinas_mapa_fina')
//Map.addLayer(cartografia_plantaciones_cortinas.draw({color: '330066', strokeWidth: 1}), {}, 'cortinas');
var palette1 = ['#f5cf00'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones_cortinas,
  color: '#f5cf00',
});
Map.addLayer(fills, {palette: palette1, max: 14}, 'Cortinas');
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: table,
  color: '#f5cf00',
});
Map.addLayer(fills, {palette: palette1, max: 14}, 'Carto Forestal 25.080');
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 20,
  palette: ['yellow', 'orange', 'red', 'cyan']
};
Map.addLayer(dataset.clip(roi), treeLossVisParam, 'tree loss year, umd.edu',1);
Map.setOptions("HYBRID")
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: roi,
  color: 1,
  width: 1.5
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '15px', color: 'green'});
var descr = ui.Label("Color - Año de Pérdidas ",{fontWeight: 'bold', fontSize: '10px', color: 'black'});
legend.add(title);
legend.add(descr);
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
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('00FFFF', '2020'));
legend.add(makeRow('FF0000', '...'));
legend.add(makeRow('FFA500', '...'));
legend.add(makeRow('FFFF00', '2000'));
legend.add(makeRow('A0522D', 'Bosque'));
legend.add(makeRow('f5cf00', 'Carto Forestal 25.080'));
Map.add(legend);