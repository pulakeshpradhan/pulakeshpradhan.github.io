Map.setCenter(-62.97, -29.73, 6)
var epoca1="MNC_verano2020_V1"
var epoca2="MNC_invierno2019_V1"
var mapa_invierno = ee.ImageCollection("users/deabelle/MNC_invierno2021_V1/RF_V03_EM");
var mapa_verano   = ee.ImageCollection("users/deabelle/MNC_verano2022_V1/RF_V03_EM");
// var palette_MNC_INV=[
//   '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff', 
//   '#339820'   ,'#955f20',    '#612517',    '#fcc1b3',     '#dcdfe3',    '#fbff05',   '#646b63','#fcc1b3','#e6f0c2','#000000',   
//   '#94d200'   ,'#94d200',     '#000000',    '#94d200',     '#000000',
// ]
// invierno 2021
var epoca1="MNC_invierno2021_V1"
var palette_MNCi=[
  '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#955f20',        '#fcc1b3',  '#612517',   '#dcdfe3',  '#42f4ce',   '#ff8000',   '#646b63','#fcc1b3','#e6f0c2',
  '#663300',   '#94d200'   ,'#94d200',     '#D54B01',    '#ffffff',   '#FF5050',  // '#000000',  '#000000',  '#000000',  '#000000',
 //  '#ffffff',#FF5050
 ]
Map.addLayer(mapa_invierno, {min:0, max:26, palette: palette_MNCi}, 'Invierno 2021',true);
var palette_MNCv=[
  '#ffffff',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#955f20',    '#612517','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#a41de2',     '#f022db',    '#fcc1b3',     '#b7b9bd',    '#fbff05',   '#1d1e33','#1e0f6b','#a32102','#000000',   
  '#646b63'   ,'#e6f0c2',     '#612517',    '#94d200',     '#ffffff',     '#FF5050',     '#ffffff',     '#6699FF',     '#ffffff',     '#ffffff',
  '#000000', 
 ]
// Map.addLayer(mnc2.mask(mnc2.neq(25)), {min:0, max:25, palette: palette_MNC}, 'MNC ver 20 V1G Mask',true);
Map.addLayer(mapa_verano, {min:0, max:31, palette: palette_MNCv}, 'Verano 2022',true);
//------------------------------- Leyenda invierno
//En invierno falta agregar: Otros cultivos (ID 17, #ff8000), y Papa (ID: 26, #FF5050). En verano, verdeo de sorgo es color #6699FF (ID 28)
var cfg = {
 palette: [
  '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#955f20',    '#612517',    '#955f20',     '#dcdfe3',    '#42f4ce',   '#ff8000','#646b63','#fcc1b3','#e6f0c2',   
  '#663300'   ,'#94d200',     '#000000',    '#D54B01',     '#000000',   '#FF5050',
 ],
 flagviz: [0, 0, 0, 0, 0,0 , 1, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
           0, 0, 0, 1, 0,1
           ],
 label: [
    '', //0
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
    'Cereales de invierno',
    'Otros cultivos', // nueva
    'Barbecho', 
    'Caña de azucar',
    'No agrícola', //20
    '', 
    '', 
    '',
    'Arveja', 
    '', //25,
    'Papa'
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
var logo = ee.Image("users/intalulc/mnc-logo-inta");
// var Titulo = ui.Label("Mapa Nacional de ", {fontSize: "24px", fontWeight: 'bold',margin: "0% 0% 4% 16%"})
// var Titulo2 = ui.Label("Cultivos Extensivos", {fontSize: "24px", fontWeight: 'bold',margin: "0% 1% 0% 15%"})
var subTitulo = ui.Label("Campaña 2021/2022", {fontSize: "16px",margin: "0 0% 4% 30%"})
var texto_footer1 = ui.Label("El Informe Técnico con los detalles metodológicos y", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer2 = ui.Label(" resultados puede leerse ", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer_link = ui.Label({
  value: 'aquí',
  style: {fontSize: "14px", border: '0px solid black',fontWeight: 'bold', margin: "0px 0px 0px 2px"},
  targetUrl: 'https://inta.gob.ar/documentos/mapa-nacional-de-cultivos-campana-2020-21'
});
var img_logo = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'250px',margin: "4% 4% 4% 20%"}});
var header = ui.Panel(
  [img_logo,  subTitulo], 
  ui.Panel.Layout.Flow("vertical"), {textAlign: "center"})
var panel = null;
//-------------------- Leyenda verano
var cfg2 = {
palette: [
  '#ffffff',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#955f20',    '#612517','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#a41de2',     '#f022db',    '#fcc1b3',     '#b7b9bd',    '#fbff05',   '#1d1e33','#1e0f6b','#a32102','#000000',   
  '#646b63'   ,'#e6f0c2',     '#612517',    '#94d200',     '#ffffff',     '#FF5050',     '#ffffff',     '#6699FF',     '#ffffff',     '#ffffff',
  '#000000', 
 ],
 flagviz: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
           1, 1, 0, 0, 0, 1, 0, 1, 0, 0,
           0
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
    'Sorgo', //nueva
    'Girasol-CV',
    '', //20
    'Barbecho', //nueva
    'No agrícola', 
    '',
    '', 
    '',
    'Papa',
    '',
    'Verdeo de Sorgo',
    '',
    '',
    '' //31
    ],
};  
/**
 * Se agregan los paneles
 * 
 * **/
var panel_legend = ui.Panel(
  {widgets: [get_legend("Invierno 2021", cfg), get_legend("Verano 2022", cfg2)], 
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
Map.setOptions("HYBRID")