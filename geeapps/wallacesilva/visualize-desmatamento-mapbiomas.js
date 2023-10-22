/**
 * 
 * SCRIPT: Visualize Coleção Desmatamento 2021 para o GT - Desmatamento MapBiomas
 * OBJETIVO: Checagem de versões dos dados de desmatamento
 * 
 * Desenvolvimento: Felipe Lenti e Wallace Silva
 * Instituto de Pesquisa Ambiental da Amazônia - IPAM 
 * 
 * contato: wallace.silva@ipam.org.br
 * 
 * inicio do desenvolvimento: Julho de 2021
 * 
*/
// --- --- MODULOS
var palette = require('users/mapbiomas/modules:Palettes.js').get('classification6');
// --- --- DICIONARIOS DE CONSULTA
// --- dicionario de parametros iniciais do app. Tambem utilizado como memoria cache para lógica empregada neste código
var options = {
  // - initial params
  year:2017,
  region:'Brasil', // valid inputs 'Brasil','Amazônia','Cerrado','Caatinga','Mata Atlântica','Pampa,'Pantanal'
  version_deforestation:"c6-v0-12-2_3yr-filtered",
  // - others params
  versions_deforestation: [
    "c6-v0-12-2_3yr-filtered"
    // com filtro:
    // "c6-v0-12-1_3yr-9px-v1-1-lulc",
    // "c6-v0-12-1_5yr-9px-v1-1-corrected-lulc",
    // "c6-v0-12-1_7yr-9px-v1-1-corrected-lulc",
    // // sem filtro:
    // "c6-v0-12-1_3yr-lulc",
    // "c6-v0-12-1_5yr-lulc",
    // "c6-v0-12-1_7yr-lulc",
    ],
  deforestation_class:{
      1:'6 - Antrópico',
      2:'5 - Veg. Primária',
      3:'4 - Veg. Secundária',
      4:'1 - Supressão Veg. Primária',
      5:'2 - Recrescimento de Veg. Secundária',
      6:'3 - Supressão Veg. Secundária',
      7:'7 - Outras transições',
    },
  labels:{
    limites:'A - Limites || ',
    background:'D - Background || ',
    auxiliar:'E - Auxiliar || ',
    desmatamento:'B - Desmatamento || ',
    desmatamento_classe:'C ', /*Classes de Desmatamento ||*/
    ignorar:'99 - ignorar || ',
  },
  deforestation_subtitles:{
      1:['fff6bf','Antrópico'],
      2:['127622','Veg. Primária'],
      3:['56d117','Veg. Secundária'],
      4:['ea1c1c','Supressão Veg. Primária'],
      5:['6fc4b7','Recrescimento de Veg. Secundária'],
      6:['ffb66c','Supressão Veg. Secundária'],
      7:['8c8c8c','Outras transições'],
    },
  landcover_subtitles: {
    0: [palette[0], 'Ausência de dados'],
    1: [palette[1], 'Floresta'],
    3: [palette[3], 'Formação Florestal'],
    4: [palette[4], 'Formação Savânica'],
    5: [palette[5], 'Mangue'],
    6: [palette[6], 'Floresta Alagável/Várzea'],
    9: [palette[9], 'Silvicultura (monocultura)'],
    10: [palette[10], 'Formação Natural não Florestal'],
    11: [palette[11], 'Campo Alagado e Área Pantanosa'],
    12: [palette[12], 'Formação Campestre'],
    13: [palette[13], 'Outras Formações não Florestais'],
    14: [palette[14], 'Agropecuária'],
    15: [palette[15], 'Pastagem'],
    18: [palette[18], 'Agricultura'],
    19: [palette[19], 'Lavoura Temporária'],
    20: [palette[20], 'Cana'],
    21: [palette[21], 'Mosaico de Agricultura e Pastagem'],
    22: [palette[22], 'Área não vegetada'],
    23: [palette[23], 'Praia e Duna'],
    24: [palette[24], 'Área Urbanizada'],
    25: [palette[25], 'Outras Áreas não Vegetadas'],
    26: [palette[26], 'Corpos D´água'],
    27: [palette[27], 'Não observado'],
    29: [palette[29], 'Afloramento Rochoso'],
    30: [palette[30], 'Mineração'],
    31: [palette[31], 'Aquicultura'],
    32: [palette[32], 'Apicum'],
    33: [palette[33], 'Rios, Lagos e Oceano'],
    36: [palette[36], 'Lavoura Perene'],
    39: [palette[39], 'Soja'],
    40: [palette[40], 'Arroz'],
    41: [palette[41], 'Outras Lavouras Temporárias'],
    46: [palette[46], 'Café'],
    47: [palette[47], 'Citrus'],
    48: [palette[48], 'Outras Lavouras Perenes'],
    49: [palette[49], 'Restinga Arborizada'],
  },
};
// --- dicionario com parametros de visualização dos dados na Map
var visParams = {
    mosaic:{
    //-falseColor
    bands:[
      'swir1_median','nir_median','red_median'
      ],
    min:138,
    max:4540,
  },
  landcover:{
    //- cobertura do solo coleção 6 mapbiomas
    palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
    min:0,
    max:49,
  },
  deforestation:{
    min:1,
    max:7,
    palette:[
      // 1;Antrópico,2;Veg. Primária,3;Veg. Secundária,4;Supressão Veg. Primária,5;Recuperação para Veg. Secundária,6;Supressão Veg. Secundária,7;Outras transições,
      'fff6bf','127622','56d117','ea1c1c','6fc4b7','ffb66c','8c8c8c',
      ]
  }
};
// --- dicionario com parametros de estilo para usar nas ferramentas de interface
var styles = {
  width_panelControl:320,
  simbol_subtitle:{
    color:'000000',
    backgroundColor:'ffffff00',
    margin:'0px 4px 0px 4px',
    fontSize:'16px'
  },
  label_subtitle:{
    backgroundColor:'ffffff00',
    margin:'2px 4px 0px 0px',
    // width:'200px',
    fontSize:'12px'
  },
  checkbox_subtitle:{
    backgroundColor:'ffffff00',
    margin:'0px 4px 0px 4px',
    width:'200px',
    fontSize:'12px'
  },
  opacity_subtitle:{
    backgroundColor:'ffffff00',
    margin:'0px 0px 0px 0px',
    width:'50px',
    fontSize:'12px'
  },
  select_default:{
    backgroundColor:'ffffff00',
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
    width:'290px'
  },
  slider_default:{
    backgroundColor:'ffffff00',
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
    width:'285px'
  },
  titles_widgets:{
    backgroundColor:'ffffff00',
    margin:'5px 0px 5px 0px',
    fontSize:'14px',
    fontWeight:'bold',
    // position:'top-center',
    width:'285px',
    textAlign:'center'
  },
  subtitles_widgets:{
    backgroundColor:'ffffff00',
    margin:'4px 0px 2px 0px',
    fontSize:'13px',
    fontWeight:'bold'
  },
  panel_default:{
    backgroundColor:'ffffff00',
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
  },
};
// --- --- FUNÇOES
// --- INICIO - funções voltadas para o processamentos digital de imagem
//- requisição de mosaicos landsat do mapbiomas
function getMosaic (year){
  return ee.ImageCollection('projects/nexgenmap/MapBiomas2/LANDSAT/mosaics')
      .filterMetadata('version', 'equals', '2')
      .filterMetadata('year', 'equals', year);
}
//- requisição de dado de uso e cobertura (coleção 6)
function getLandcover (year){
  return ee.ImageCollection('projects/mapbiomas-workspace/COLECAO6/mapbiomas-collection60-integration-v0-12')
    .mosaic()
    .select('classification_'+ year);
}
//-requisição de dados de desmatamento conforme versão
function getDeforestation (year,version){
  version = version || "c6-v0-10-1_1yr";
  var image = ee.ImageCollection("projects/mapbiomas-workspace/COLECAO_DEV/GTdesmat")
    .filter(ee.Filter.eq("version", version)).toBands().selfMask();
  var oldBands = image.bandNames().getInfo();
  var newBands = oldBands.map(function(band){
    return band.slice(-12);
  });
  return image.select(oldBands, newBands);//.divide(100).int();
}
// --- FIM - funções voltadas para o processamento digital de imagem
// --------------------------------------------------------------------
// --- INICIO - funções voltadas para interface de usuario
//-função para reorganizar canvas
function setLayout(){
  options.mapp = ui.root.widgets().get(0);
  options.controlPanel = ui.Panel({
    // widgets:, 
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{
      // position:'bottom-left',
      backgroundColor:'ffffffdd',
      width: '' + styles.width_panelControl + 'px'
    }
  });
  options.mapp.setOptions({
    'styles': {
      'Dark': require('users/joaovsiqueira1/packages:Mapp.js').getStyle('Dark')
    }
  });
  options.titlePanel = ui.Panel({
    widgets:[
    ui.Label('Last updat: Set, 02. 2021||',{backgroundColor:'ffffff00',fontSize:'10px',margin:'0px 0px 0px 0px'}),
    ui.Label('code source',{backgroundColor:'ffffff00',fontSize:'10px',margin:'0px 0px 0px 0px'},
    // historico de versões
    // 'https://code.earthengine.google.com/910d5050b775560648e835009ab5cb62' // primeira versão, incompleto -> 21-07-2021
    // 'https://code.earthengine.google.com/b17311138960996099f905b9d9152f86' // primeira versão -> completa -> 23-07-2021
    // 'https://code.earthengine.google.com/2b88f0eac9a7cd622040650faa1552d1' // adicionado controle de versão e titulos nos controles -> 23-07-2021
    // 'https://code.earthengine.google.com/aa961e456b4bfbbbccf91158d4e509f9' // add legenda, organização dos tamanhos, exclusão das coberturas vs desmatamento nas classes antropico e outras transições -> 27-07-2021
    // 'https://code.earthengine.google.com/23caff7980d0c94bd0974412ee642ba2' // correções na requisição do mosaico do ano anterior e a na manutenção na função de requisição da cobertura do solo-> 27-07-2021
    // 'https://code.earthengine.google.com/de8fdf04eb61decddd54405b84c998d8' // add versões finais e titulo no painel de controle -> 28-07-2021
    // 'https://code.earthengine.google.com/407659e22c0b4bbac3623ac9ebf81fc2' // atualização da versão do dado beta de uso e cobertura, atual v-12 -> 9-08-2021
    // 'https://code.earthengine.google.com/d96b047af5fc9f661824effdc40d9944' // adicionando fundo dark -> 9-08-2021
    // 'https://code.earthengine.google.com/98f9ae5c13267363d384ddab785e1118' // atualizando versões - adequando função de getDeforestation para o novo dado -> 16-08-2021
    // 'https://code.earthengine.google.com/98f9ae5c13267363d384ddab785e1118' // atualizando versões - adequando função de getDeforestation para o novo dado -> 16-08-2021
    'https://code.earthengine.google.com/40e3ae3fa3d21b4d30ee65035b7152c1' // atualizando o dado para versão final - adequando função de getDeforestation para o novo dado -> 02-09-2021
    ),
    ],
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:{
      position:'bottom-right',
      backgroundColor:'ffffffdd',
    }
  });
  ui.root.widgets().reset([options.controlPanel,options.mapp]);
  options.mapp.add(options.titlePanel);
}
//- função para adicionar ou remover e inserir layers na mesma posição
function plotLayer(obj, position, mapp){
  mapp = mapp || Map;
  position = position || 0;
  var layer = mapp.layers().get(position);
  if (layer === undefined){
    mapp.addLayer(ee.Image().select(),{},''+position,false);
  }
  layer = mapp.layers().get(position);
  var layerObject = 
  ui.Map.Layer({  
    eeObject:   obj.eeObject  ||  layer.getEeObject(),
    visParams: obj.visParams  ||  layer.getVisParams(),
    name:       obj.name      ||  layer.getName(),
    shown:      obj.shown     ||  layer.getShown(),
    opacity:    obj.opacity   ||  layer.getOpacity(),
  });
  mapp.layers().set(position, layerObject);
}
//- função para adicionar 
function aktualizer_year (year, firstRound){
  firstRound = firstRound || false;
  // rotulos para identificão padronizada das layers
  var labels = options.labels;
  // - geometria
  var geometry = options.geometry;
  var year_previous = year - 1;
  if (year_previous === 1984){
    year_previous = 1985;
    name_landcover_previous = labels.ignorar + year_previous + ' Cobertura do solo';
  }
  // - mosaico landsat do ano corrente
  var mosaic = getMosaic(year)
    .mosaic()
    .clip(geometry);
  var obj = {
      eeObject:mosaic,
      name: labels.background + year + ' Mosaico landsat',
      visParams:visParams.mosaic,
      // shown:true
    };
  var position = 0;
  plotLayer(obj, position, options.mapp);
  // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
  // - mosaico landsat do ano anterior
  var mosaic_previous = getMosaic(year_previous)
    .mosaic()
    .clip(geometry);
  obj = {
      eeObject:mosaic_previous,
      name: labels.background + year_previous + ' Mosaico landsat',
      visParams:visParams.mosaic,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj, position, options.mapp);
  // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
  // - cobertura do solo do ano corrente
  var landcover = getLandcover(year)
  .clip(geometry);
  obj = {
      eeObject:landcover,
      name: labels.background + year + ' Cobertura do solo',
      visParams:visParams.landcover,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj, position, options.mapp);
  // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
  // - cobertura do solo do ano anterior
  var name_landcover_previous = labels.background + year_previous + ' Cobertura do solo';
  var landcover_previous = getLandcover(year_previous)
    .clip(geometry);
  obj = {
      eeObject:landcover_previous,
      name: name_landcover_previous,
      visParams:visParams.landcover,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj, position, options.mapp);
  // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
    // - desmatamento
    var deforestation = getDeforestation(year,options.version_deforestation)
      .clip(geometry)
      .select('product_'+year);
    obj = {
        eeObject:deforestation,
        name: labels.desmatamento + year + ' Desmat. ' + options.version_deforestation,
        visParams:visParams.deforestation,
        // shown:true
      };
    position = position + 1;
    plotLayer(obj, position, options.mapp);
    // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
    options.deforestation_class_list.forEach(function(classe){
    // - desmatamento
    var deforestation_classe = getDeforestation(year,options.version_deforestation)
      .clip(geometry)
      .select('product_'+year);
    var name_desmatamento_classe = options.deforestation_class[classe];
    classe = ee.Number.parse(classe);
    deforestation_classe = deforestation_classe.updateMask(deforestation_classe.eq(classe));
    obj = {
        eeObject:deforestation_classe,
        name: labels.desmatamento_classe + name_desmatamento_classe + ' || ' + year + ' ' + options.version_deforestation,
        visParams:visParams.deforestation,
        // shown:true
      };
    position = position + 1;
    plotLayer(obj, position, options.mapp);
  // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
  if (
      name_desmatamento_classe === options.deforestation_class[2] ||
      name_desmatamento_classe === options.deforestation_class[3] ||
      name_desmatamento_classe === options.deforestation_class[4] ||
      name_desmatamento_classe === options.deforestation_class[5] ||
      name_desmatamento_classe === options.deforestation_class[6]
    ){
    obj = {
        eeObject:landcover.updateMask(deforestation_classe),
        name: labels.desmatamento_classe + name_desmatamento_classe + ' || ' + year + ' cobertura ' + options.version_deforestation,
        visParams:visParams.landcover,
        // shown:true
      };
    position = position + 1;
    plotLayer(obj, position, options.mapp);
    // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
    var name_desmatamento_classe_year_previous = labels.desmatamento_classe + name_desmatamento_classe + ' || ' + year_previous + ' cobertura ' + options.version_deforestation;
    if (year_previous === 1985){
      name_desmatamento_classe_year_previous = labels.ignorar + name_desmatamento_classe + ' || ' + year_previous + ' cobertura ' + options.version_deforestation;
    }
    obj = {
        eeObject:landcover_previous.updateMask(deforestation_classe),
        name: name_desmatamento_classe_year_previous,
        visParams:visParams.landcover,
        // shown:true
      };
    position = position + 1;
    plotLayer(obj, position, options.mapp);
  }
    // --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
  });
  if (firstRound === false){
    subtitles();
  }
}
function aktualizer_region (region, firstRound) {
  options.region = region;
  setGeometry();
  options.mapp.centerObject(options.geometry);
  aktualizer_year(options.year, firstRound);
}
function setSlider_year (){
    var label = ui.Label({
    value:'Escolha um ano',
    style:styles.titles_widgets,
    // targetUrl:
    });
  var select = ui.Slider({
    min:1985,
    max:2020,
    value:options.year,
    step:1,
    onChange:function(value){
      // print(value);
      aktualizer_year(value);
    },
    // direction:,
    // disabled:,
    style:styles.slider_default
    });
  return ui.Panel({
    widgets:[label,select],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
}
function setSelect_region (){
    var label = ui.Label({
    value:'Escolha uma região',
    style:styles.titles_widgets,
    // targetUrl:
    });
  var select = ui.Select({
    items:['Brasil','Amazônia','Caatinga','Cerrado','Mata Atlântica','Pampa','Pantanal','Canvas'],
    // placeholder:,
    value:options.region,
    onChange:function(value){
      aktualizer_region(value);
    },
    // disabled:,
      style:styles.select_default
    });
  return ui.Panel({
    widgets:[label,select],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
}
function setSelect_version (){
  var label = ui.Label({
    value:'Escolha a versão do dado de desmatamento',
    style:styles.titles_widgets,
    // targetUrl:
    });
  var select = ui.Select({
    items:options.versions_deforestation,
    // placeholder:,
    value:options.version_deforestation,
    onChange:function(value){
      options.version_deforestation = value;
      aktualizer_year(options.year);
    },
    // disabled:,
    style:styles.select_default
    });
  return ui.Panel({
    widgets:[label,select],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
}
function subtitles (firstRound){
  firstRound =  firstRound || false;
  if (firstRound === true){
    var label = ui.Label({
      value:'Controle de layers',
      style:styles.titles_widgets,
      // targetUrl:
    });
    options.controlPanel.add(label);
    options.panelSubtitles = ui.Panel({
      // widgets:,
      layout:ui.Panel.Layout.Flow('vertical'),
      style:{
        backgroundColor:'ffffff00',
        width:'' + (styles.width_panelControl - 10) + 'px',
      }
    });
    options.controlPanel.add(options.panelSubtitles);
  }
  options.panelSubtitles.clear();
  var layers = options.mapp.layers();
  var labels = ee.List(layers.map(function(layer){
    return ee.String(layer.getName().split(' - ')[0]);
  }))
  .distinct()
  .sort()
  .getInfo();
  // print(labels);
  labels = labels.filter(function(item){
    return item !== '99';
  });
  var labelsLayers = labels.map(function(label){
    return layers.filter(function(item){
      return item.get('name').split(' - ')[0] === label;
    });
  });
 labelsLayers.forEach(function(labelsLayer){ 
  var titleLabel = labelsLayer[0].get('name').split(' - ')[1].split(' || ')[0];
  if (titleLabel === 'Background'){
    labelsLayer = labelsLayer.reverse();
  }
  var layerBox = labelsLayer.map(function(layer){
    var name = layer.get('name');
    var simbol = ui.Label({
      value: '▢', 
       style:styles.simbol_subtitle
      });
    var labelName = name.split(' - ')[1].split(' || ')[1];
    labelName = ui.Checkbox({
      label:labelName,
      value:layer.getShown(),
      onChange:function(value){
        layer.setShown(value);
      }, 
     style:styles.checkbox_subtitle
    });
    var opacity = ui.Slider({
      min:0,
      max:1,
      value:layer.getOpacity(),
      step:0.1,
      onChange:function(value){
        layer.setOpacity(value);
      },
      // direction:,
      // disabled:,
      style:styles.opacity_subtitle
    });
    return ui.Panel({
      widgets:[/*simbol,*/labelName,opacity],
      layout:ui.Panel.Layout.Flow('horizontal'),
      style:{
        backgroundColor:'ffffff00',
        margin:'0px 0px 0px 0px',
      }
      });
  });
    options.panelSubtitles
      .add(ui.Label(titleLabel,styles.subtitles_widgets));
    layerBox = ui.Panel({
      widgets:layerBox,
      layout:ui.Panel.Layout.Flow('vertical'),
      style:{
        backgroundColor:'ffffff00',
        margin:'0px 0px 0px 0px'
      },
    });
    options.panelSubtitles
      .add(layerBox);
  });
}
function label_subtitle (){
  var deforestation_subtitles_keys = ee.Dictionary(options.deforestation_subtitles).keys().getInfo();
  var deforestation_subtitles = deforestation_subtitles_keys.map(function(key){
    var list = options.deforestation_subtitles[key];
    var color = list[0];
    var label = list[1];
    var style = styles.simbol_subtitle;
    style['color'] = color;
    var simbol = ui.Label({
      value:'◉',
      style:style,
      // targetUrl:
    });
    label = ui.Label({
      value:'  (' + key + ') '+ label,
      style:styles.label_subtitle,
      // targetUrl:
    });
  return ui.Panel({
    widgets:[simbol,label],
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:styles.panel_default
    });
  });
  deforestation_subtitles = ui.Panel({
    widgets:deforestation_subtitles,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
  var landcover_subtitles_keys = ee.Dictionary(options.landcover_subtitles).keys().getInfo();
  var landcover_subtitles = landcover_subtitles_keys.map(function(key){
    var list = options.landcover_subtitles[key];
    var color = list[0];
    var label = list[1];
    var style = styles.simbol_subtitle;
    style['color'] = color;
    var simbol = ui.Label({
      value:'◉',
      style:style,
      // targetUrl:
    });
    label = ui.Label({
      value:'  (' + key + ') '+ label,
      style:styles.label_subtitle,
      // targetUrl:
    });
  return ui.Panel({
    widgets:[simbol,label],
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:styles.panel_default
    });
  });
  landcover_subtitles = ui.Panel({
    widgets:landcover_subtitles,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
  var title = ui.Label({
    value:'------------- LEGENDA ------------- ',
    style:styles.titles_widgets,
    // targetUrl:
    });
  var title_deforestation_subtitles = ui.Label({
    value:'Desmatamento',
    style:styles.subtitles_widgets,
    // targetUrl:
    });
  var title_landcover_subtitles = ui.Label({
    value:'Cobertura do solo - MapBiomas (Col 6)',
    style:styles.subtitles_widgets,
    // targetUrl:
    });
  return ui.Panel({
    widgets:[title,title_deforestation_subtitles,deforestation_subtitles,title_landcover_subtitles,landcover_subtitles],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panel_default
    });
// subtitles_landcover
}
// --- FIM - funções voltadas para interface de usuario
// --------------------------------------------------------------------
// --- INICIO - outras funções
function setGeometry (firstRound){
  firstRound = firstRound || false;
  options.geometry = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
    .filter(ee.Filter.eq('Bioma',options.region))
    .geometry();
  if (options.region === 'Brasil') {
    options.geometry = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/brasil_2km')
      .geometry();
  }
  if (options.region === 'Canvas') {
    options.geometry = ee.Geometry.Rectangle(options.mapp.getBounds());
  }
  if (firstRound !== true){
   var line = ee.Image(1).paint(options.geometry,'000000',0.5);
   line = line.updateMask(line.neq(1));
    var obj = {
        eeObject:line,
        name: 'A - Limites || limites da região',
        // visParams:visParams.line,
        shown:true
      };
    plotLayer(obj, options.position_geometry, options.mapp);
  }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// --- FIM - outras funções
// --------------------------------------------------------------------
// - Função de start do app
function init (){
  options.deforestation_class_list = ee.Dictionary(options.deforestation_class).keys().getInfo();
  setLayout();
  setGeometry(true);
  options.controlPanel.add(ui.Label({
      value:'-------- PAINEL DE CONTROLE -------- ',
      style:styles.titles_widgets,
      }));
  // options.controlPanel.add(setSelect_version());
  options.controlPanel.add(setSelect_region());
  options.controlPanel.add(setSlider_year());
  aktualizer_region(options.region,true);
  options.position_geometry = options.mapp.layers().length();
  setGeometry();
  subtitles(true);
  options.mapp.setCenter(-52.74, -13.18,4);
  options.controlPanel.add(label_subtitle());
  print(options);
}
// --- --- INICIANDO APP
print('inicio');
init();
print('fim');