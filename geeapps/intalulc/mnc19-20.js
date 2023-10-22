Map.setCenter(-62.97, -29.73, 6)
var epoca1="MNC_verano2020_V1"
var epoca2="MNC_invierno2019_V1"
var mapa_invierno = ee.ImageCollection("users/deabelle/MNC_invierno2019_V1/RF_V1GREM");
var mapa_verano   = ee.ImageCollection("users/deabelle/MNC_verano2020_V1/RF_V1GREM");
var palette_MNC_INV=[
  '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#955f20',    '#612517',    '#fcc1b3',     '#dcdfe3',    '#fbff05',   '#646b63','#fcc1b3','#e6f0c2','#000000',   
  '#94d200'   ,'#94d200',     '#000000',    '#94d200',     '#000000',
 ]
Map.addLayer(mapa_invierno, {min:0, max:25, palette: palette_MNC_INV}, 'Invierno 2019',true);
var palette_MNC_VER=[
  '#ffffff',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#955f20',    '#612517','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#a41de2',     '#f022db',    '#fcc1b3',     '#b7b9bd',    '#fbff05',   '#034300','#1e0f6b','#a32102','#000000',   
  '#646b63'   ,'#e6f0c2',     '#000000',    '#94d200',     '#000000',
 ]
// Map.addLayer(mnc2.mask(mnc2.neq(25)), {min:0, max:25, palette: palette_MNC}, 'MNC ver 20 V1G Mask',true);
Map.addLayer(mapa_verano, {min:0, max:25, palette: palette_MNC_VER}, 'Verano 2020',true);
//------------------------------- Leyenda invierno
var cfg = {
 palette: [
  '#42f4ce',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#646b63',    '#ec7d74','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#955f20',    '#612517',    '#fcc1b3',     '#dcdfe3',    '#fbff05',   '#646b63','#fcc1b3','#e6f0c2','#000000',   
  '#94d200'   ,'#94d200',     '#000000',    '#94d200',     '#000000',
 ],
 flagviz: [1, 0, 0, 0, 0,0 , 1, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
           0, 0, 0, 0, 0
           ],
 label: [
    'Cereales de invierno', //0
    '', 
    '', 
    '', 
    '', 
    '', //5 
    'Otros cultivos de invierno', // nueva
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
    'Barbecho', // nueva
    'Caña de azucar', 
    'No agrícola',
    '', //20
    '', 
    '', 
    '',
    '', 
    '' //25
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
            cfg.label[i] + " (ID: " + i+")"
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
var logo = ee.Image("users/deabelle/MNC_verano2020_V1/logo_180");
var Titulo = ui.Label("Mapa Nacional de Cultivos", {fontSize: "24px", fontWeight: 'bold',margin: "0% 0% 4% 15%"})
var subTitulo = ui.Label("Campaña 2019/2020", {fontSize: "16px",margin: "0 0% 4% 30%"})
var texto_footer1 = ui.Label("El Informe Técnico con los detalles metodológicos y", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer2 = ui.Label(" resultados puede leerse ", {fontSize: "14px", margin: "0px 0px 0px 10px"})
var texto_footer_link = ui.Label({
  value: 'aquí',
  style: {fontSize: "14px", border: '0px solid black',fontWeight: 'bold', margin: "0px 0px 0px 2px"},
  targetUrl: 'https://earthengine.google.com/'
});
var img_logo = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'80px',height:'80px',margin: "4% 4% 4% 35%"}});
var header = ui.Panel(
  [img_logo, Titulo, subTitulo], 
  ui.Panel.Layout.Flow("vertical"), {textAlign: "center"})
var panel = null;
//-------------------- Leyenda verano
var cfg2 = {
 palette: [
  '#ffffff',    '#ffffff'   ,'#ffffff',     '#ffffff',     '#ffffff',    '#955f20',    '#612517','#ffffff','#ffffff','#ffffff', '#0042ff', 
  '#339820'   ,'#a41de2',     '#f022db',    '#fcc1b3',     '#b7b9bd',    '#fbff05',   '#1d1e33','#1e0f6b','#a32102','#000000',   
  '#646b63'   ,'#e6f0c2',     '#000000',    '#94d200',     '#000000',
 ],
 flagviz: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
           1, 1, 0, 0, 0
           ],
 label: [
    '', //0
    '', 
    '', 
    '', 
    '', 
    '', //5 --Nueva
    '', 
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
    '' //25
    ],
};  
/**
 * Se agregan los paneles
 * 
 * **/
var panel_legend = ui.Panel(
  {widgets: [get_legend("Invierno 2019", cfg), get_legend("Verano 2020", cfg2)], 
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