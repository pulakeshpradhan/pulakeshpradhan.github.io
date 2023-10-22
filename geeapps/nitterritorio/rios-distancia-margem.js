var utils = require('users/nitterritorio/massasdagua:utils-distancia');  
// LANDSAT/LE07/C01/T2_TOA 1999-01-01 mas dificil de achar imagem valida
var satellite = 
  {
    /*
      https://custom-scripts.sentinel-hub.com/custom-scripts/sentinel-2/ndwi/
      https://developers.google.com/earth-engine/guides/image_visualization
    */
    "sentinel2":{"collection":'COPERNICUS/S2',"bands":["B3","B8"], "startdate":'2015-06-23',"cut_from":0.2, "cut_to":1, "natural":['B4', 'B3', 'B2'], "buffer":10, "sat_range":[0,2000]},
    "landsat7":{"collection":"LANDSAT/LE07/C01/T1_RT_TOA","bands": ["B2","B4"], "startdate":'1999-01-01', "cut_from":0,"cut_to":1,"natural":["B3","B2","B1"],"buffer":30, "sat_range":[0.0,0.4]},
    "landsat8":{"collection":"LANDSAT/LC08/C01/T1_RT_TOA","bands": ["B3","B5"], "startdate":'2013-04-11', "cut_from":0,"cut_to":1,"natural":["B4","B3","B2"],"buffer":30, "sat_range":[0.0,0.4]},
  };
/*criando panel da app*/
var panel_direita_root = ui.Panel({
  style: { width: '360px', padding: '8px 20px 8px 60px', position: 'top-right'}
});
var panel_esquerda_root = ui.Panel({
  style: { width: '360px', padding: '8px', position: 'top-left'}
});
var label_chats = ui.Label('Gráficos');
panel_esquerda_root.add(label_chats);
var label_config = ui.Label('Configurações');
var button_send = ui.Button({
  label: 'Enviar',
  onClick: function() {
    panel_esquerda_root.clear();
    map.clear();
    // Add the legend to the map.
    map.add(legend);
    print(select_config.getValue());
    if(select_config.getValue()!==null && dateSlider1.getValue()!==null 
    && dateSlider2.getValue()!==null && select_river.getValue()!==null && dateSlider2.getValue()[1] > dateSlider1.getValue()[1]){
      var satellite_info = satellite[select_config.getValue()];
      print(satellite_info.collection, satellite_info.bands);
      /*
       * pode adicionar no painel outros elementos para pegar as datas e o poligono e etc 
       * aqui adicionado de forma estatica a critério de exemplo
      */
      var poligoncollection = ee.FeatureCollection("users/odraitaipu/Poligono_LAGO");
      var poligon = ee.Feature(poligoncollection.first()).set({'nome':'lagoItaipu'});
      var range = ee.DateRange(dateSlider1.getValue()[1], dateSlider2.getValue()[1]);
      var dateIni = range.start();
      var dateFim = range.end();
      var ponto_ref = ee.Geometry.Point([-54.37355589142384, -24.970526438831058]);
      /*Poderia ter um select e ver por rio*/
      var selectRiver = selectedRiver[select_river.getValue()]
      var area_selected = utils.getArea(selectRiver["area"]);
      var chart_distance = utils.calcDistance(satellite_info.collection, satellite_info.bands, dateIni, dateFim, select_config.getValue(), area_selected, selectRiver["river"],
      satellite_info.cut_from, satellite_info.cut_to, satellite_info.natural, satellite_info.buffer, satellite_info.sat_range);
      panel_esquerda_root.add(chart_distance);
      var info = ui.Label('PI - Ponto Inicial, PF - Ponto Final, M1 primeira margem, M2 segunda margem');
      var info2 = ui.Label('PI-PF Corresponde ao valor constante da distância entre PI e PF');
      panel_esquerda_root.add(info);
      panel_esquerda_root.add(info2);
    }else{
      var error_config = ui.Label('Selecione imagem de satélite, datas inicial, data final e  rio.');
      panel_esquerda_root.add(error_config);
    }
  }
});
var init_start_range = Date.now() - (365 * 24 * 60 * 60 * 1000);
var start_range = init_start_range;
var label_select_config = ui.Label('Selecione o sensor/satellite');
var select_config = ui.Select({
  placeholder: "selecione ...",
  items: ["sentinel2", "landsat7", "landsat8"],
  onChange: function(key) {
    var satellite_info = satellite[key];
    start_range = satellite_info.startdate;
    dateSlider1.setStart(start_range);
    dateSlider2.setStart(start_range);
    dateSlider1.setValue(init_start_range);
    dateSlider2.setValue(end_range);
  }
});
var selectedRiver = {
  "Iguatemi":{"area":'ESTRADA IGUATEMI', "river":'iguatemi'}, 
  "Florida":{"area":'FLORIDA', "river":'florida'}, 
  "Ivinhema":{"area":'IVINHEMA', "river":'ivinhema'}, 
  "Porto São José":{"area":'PORTO  SAO  JOSE OFICIAL', "river":'sj_oficial'}, 
  "Porto São José - Planice de Inundação":{"area":'PORTO  SAO  JOSE ESTUDOS', "river":'sj_estudos'}
};
var label_select_river = ui.Label('Selecione o rio');
var select_river = ui.Select({
  placeholder:"selecione...",
  items: ["Iguatemi", "Florida", "Ivinhema", "Porto São José", "Porto São José - Planice de Inundação"],
});
var end_range = Date.now();
var label_dateSlider1 = ui.Label('Data Inicial');
var dateSlider1 = ui.DateSlider({
    start: start_range,
    end: end_range,
    value: null,
    period: 1,
  });
var label_dateSlider2 = ui.Label('Data Final');
var dateSlider2 = ui.DateSlider({
    start: start_range,
    end: end_range,
    value: end_range,
    period: 1,
  });
var buffer_config = ui.Textbox({
  placeholder: "buffer em metros",
  value: 10
});
// panel_direita_root.add(label_config);
panel_direita_root.add(label_select_config);
panel_direita_root.add(select_config);
panel_direita_root.add(label_dateSlider1);
panel_direita_root.add(dateSlider1);
panel_direita_root.add(label_dateSlider2);
panel_direita_root.add(dateSlider2);
panel_direita_root.add(label_select_river);
panel_direita_root.add(select_river);
// panel_direita_root.add(buffer_config);
panel_direita_root.add(button_send);
utils.createMap();
ui.root.clear();
ui.root.add(panel_direita_root);
var map = utils.getMap();
ui.root.add(map);
ui.root.add(panel_esquerda_root);
/************************ legend ****************************/
var names = [
  'PI',
  'PF',
  'Água'
  ];
var elevationPalette = ['e73538','00FF00', '55c2ff'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legenda ',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
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
    style: {margin: '0 0 4px 6px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(elevationPalette[i], names[i]));
  }