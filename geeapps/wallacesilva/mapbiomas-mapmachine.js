var center_object = ui.import && ui.import("center_object", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -72.19152123034286,
            4.0914536223121205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.320427480342865,
            -33.241167464603464
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[-72.19152123034286, 4.0914536223121205],
         [-39.320427480342865, -33.241167464603464]]),
    filter_bounds = ui.import && ui.import("filter_bounds", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -48.00825750206489,
            -15.699904703440906
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([-48.00825750206489, -15.699904703440906]);
/**
 * 
 * Objetivo: Gerar gifs e PNG's dos dados de Uso e Cobertura, Cicatrizes de Fogo e Superficie de Agua
 * das coleções MapBiomas de 2021.
 * 
 * Intenção: Desenvolver Ferramenta que permita visualisar e analisar espacialmente diferentes séries 
 * de dados, de forma que seja util tanto para a equipe técnica, com acesso ao GEE, quanto para 
 * jornalistas e consultores, sem acesso ao GEE.
 * 
 * Desenvolvimento: Instituto de Pesquisa Ambiental da Amazônia - IPAM
 *                  Vera Arruda e Wallace Silva 
 * 
 * contato: wallace.silva@ipam.org.br
 *
*/
// --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
// --- --- --- --- --- --- DICIONARIOS
// --- --- dicionario com diario de versões do codigoc
var sourceCode = [
  ['versão','yyy-mm-dd','comit','getlink'],
  ['v0.5','2021-09-03','Adicionado fonte no dado e reformulado adicição de elementos a thumbnail, sendo implementado o dicionario layout','https://code.earthengine.google.com/155ff1b5e2c8576b27ae7db57d103924'],
  ['v0.4','2021-09-02','adicionados label de "fonte: mapbiomas nas thumbnails','https://code.earthengine.google.com/45e1df9ad94d17100c9fa2abf2c636b4'],
  ['v0.3','2021-09-01','adicionados opções para escolher a posição do ano nas thumbnails','https://code.earthengine.google.com/45e1df9ad94d17100c9fa2abf2c636b4'],
  ['v0.2','2021-08-26','adicionados dados da mineração','https://code.earthengine.google.com/717b41d434edfbda2279f4a5c1bfd5db'],
  ['v0.1','2021-08-26','primeira versão (versão do desenvolvedor)','https://code.earthengine.google.com/717b41d434edfbda2279f4a5c1bfd5db'],
  ['v0.0.1','2021-08-26','primeira versão (inacabada)','https://code.earthengine.google.com/7212f8bbeeecab61b8a1ae24d1ad2f3b'],
  ['referencia','ref','2021-08-25','aplicativo de visualização de gifs e pngs','https://code.earthengine.google.com/5fab2108cfd7f02d50b4233055e287a0'],
];
var actualVersion = 'v2.3';
// --- --- dicionario com parametros de start e uso para memoria cache do codigo
var options = {
  year:2020,
  maskLayer:'Brasil -U',
  geometry:null,
  // imprimir mensagens com o tempo de cada função
  automatedMessages:false, // true, false
  // limpar panel de thumbnails a cada interação
  maskColor:'fdfdfd',
  backgroundColor:'808080',
  clearPanelThumbs:true,// 'true','false'
  gif:true,
  png:false,
  frames:'2',
  clickMap:true,
  // - lista com as chaves dos datasets utilizados
  vectors:[
    'Biomas -U',
    'Estados -U',
    // 'Regiões -U',
    'Municipios -U',
    'Áreas Protegidas -U',
    'Macro Bacias -U',
    'Bacias Nível 1 -U',
    'Bacias Nível 2 -U',
    'Brasil -U',
    'América do Sul -U',
    'Grid Landsat -U',
  ],
  // - lista com as chaves dos datasets utilizados para compor as imagens
  rasters:[  
    // 'Cobertura do Solo (MapBiomas col.5)',
    'Cobertura do Solo (MapBiomas col.6) -S',
    'Cicatrizes de Anuais (MapBiomas Fogo col.1) -S',
    'Cobertura de Cicatrizes Anual (MapBiomas Fogo col.1) -S',
    'Cicatrizes de Mensais (MapBiomas Fogo col.1) -S',
    'Superficie de Agua Anual (MapBiomas Água col.1) -S',
    'Frequência de Cicatrizes (MapBiomas Fogo col.1) -S',
    'Frequência de Agua Anual (MapBiomas Água col.1) -U',
    'Tendencia de superficie de água (MapBiomas Água col.1) -U',
    'Mineração (MapBiomas col.6) -S',
  ],
};
var layoutMap = {
  'Fator de escala':2,
  'Ano':{ // - posição de uma label 
    label:'',
    lat:'2%',
    long:'2%',
    params: { // ! parametros de visualização do texto 
      fontSize: 16,
      textColor: 'ffffff',
      outlineColor: '000000',
      outlineWidth: 2.5,
      outlineOpacity: 0.6
    }
  },
  'Fonte':{
    label:'MapBiomas (2021)',
    lat:'95%',
    long:'2%',
    params: { // ! parametros de visualização do texto 
      fontSize: 12,
      textColor: 'ffffff',
      outlineColor: '000000',
      outlineWidth: 2.5,
      outlineOpacity: 0.6
    },
  },
  'Norte':{
    lat:'97%',
    long:'70%',
    size:0.4
  },
  'Escala':{
    top:'97%',
    bottom:'97.75%',
    left:'25%',
    right:'9%',
    params:{
      steps:3, 
      palette: ['5ab4ac', 'f5f5f5'],
      // multiplier: 1000, 
      format: '%.0f',
      units: 'km',
        text:{
          fontSize:12,
          textColor: '000000',
          outlineColor: 'ffffff',
          outlineWidth: 2,
          outlineOpacity: 0.6 
      }
    },
  },
};
// --- --- dicionario com parametros de estilização da interface de usuario
var styles = {
  selectRegion:{
    position:'bottom-left',
    backgroundColor:'ffffff00',
    margin:'0px 0px 0px 0px '
  },
  buttons:{
    margin:'0px 0px 0px 0px',
    width:'100px'
  },
  buttons2:{
    // margin:'0px 0px 0px 0px',
    // width:'100px'
  },
  thumbnails:{
    // width:options.size,
    height:'512px',
  },
  subtitles2:{
    margin:'12px 0px 0px 0px'
  },
  panelLabels:{
    margin:'0px 0px 0px 0px '
  },
  panelButtons:{
    // margin:'0px 0px 0px 0px '
  },
  textbox:{
    // margin:'0px 0px 0px 0px ',
    width:'55px',
  },
  textbox2:{
    // margin:'0px 0px 0px 0px ',
    width:'40px',
  },
  select:{
    // margin:'0px 0px 0px 0px ',
  },
  checkbox:{
    margin:'12px 0px 0px 5px ',
  },
  subtitles:{
    fontSize:'11px',
    margin:'0px 0px 0px 0px',
  },
};
// --- --- dicionario com os datasets utilizados
/* --- Nessa sessão os dados são organizados como imagens multibandas
    O trecho do codigo anterior a declaração do dicionario dataset é reservado
  para padronizar dados no mesmo formato dos dados publicos do MapBiomas, ou seja
  séries temporais de imagens armazenadas como imagens multibandas, onde a
  sintaxe padrão do nome das bandas termina com um "_" seguido do ano de referencia
  do dado 
  Exemplo: 
     "classification_2020"
*/
// --- adequando outros dados para o dicionario do dataset
var years = [
  1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,
  2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
  2015,2016,2017,2018,2019,2020
];
// - mineração
var mineracao = ee.Image().select();
years.forEach(function(year){
  var data = ee.Image('projects/mapbiomas-workspace/TRANSVERSAIS/MINERACAO6-FT/' + year + '-5')
    .rename('classification_'+year);
  mineracao = mineracao.addBands(data);
});
// - tendencia de supercies de agua
var ind_kendall = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/GTAGUA/mann_kendall_trend_test_watter_sazonal_co');//.clip(geom_grade)
var p_value_img = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/GTAGUA/mann_kendall_trend_test_p_value_cor').select('min');
var valor_significativo = 0.025;
var mask_signif = p_value_img.lte(valor_significativo);
var valor_sign_kendal = ind_kendall.updateMask(mask_signif);
var tendencia_agua = valor_sign_kendal.rename('classification_2020');
// --- dicionario com os datasets utilizados
var dataset = {
  // raster:{
  'Cobertura do Solo (MapBiomas col.5) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1'),
    band:'classification_',
    visParams:'',
  },
  'Cobertura do Solo (MapBiomas col.6) -S':{
    data:ee.ImageCollection('projects/mapbiomas-workspace/COLECAO6/mapbiomas-collection60-integration-v0-12').mosaic(),
    band:'classification_',
    visParams:{
      min:0,
      max:49,
      palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
      forceRgbOutput:true,
    },
  },
  'Cicatrizes de Anuais (MapBiomas Fogo col.1) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-annual-burned-coverage-1'),
    band:'burned_coverage_',
    visParams:{
      min:0,
      max:0,
      palette:['ff0000']
    },
  },
  'Cobertura de Cicatrizes Anual (MapBiomas Fogo col.1) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-annual-burned-coverage-1'),
    band:'burned_coverage_',
    visParams:{
      min:0,
      max:49,
      palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
      forceRgbOutput:true,
    },
  },
  'Cicatrizes de Mensais (MapBiomas Fogo col.1) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-monthly-burned-coverage-1').divide(100).int(),
    band:'burned_coverage_',
    visParams:{
      min:1,
      max:12,
      palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00']
    },
  },
  'Superficie de Agua Anual (MapBiomas Água col.1) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-water-collection1-annual-water-coverage-1'),
    band:'water_coverage_',
    visParams:{
      min:0,
      max:1,
      palette:['0000ff']
    },
  },
  'Frequência de Cicatrizes (MapBiomas Fogo col.1) -S':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-fire-frequency-1').divide(100).int(),
    band:'fire_frequency_1985_',
    visParams:{
      min:1,
      max:35,
      palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
    },
  },
  'Frequência de Agua Anual (MapBiomas Água col.1) -U':{
    data:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-water-collection1-water-frequency-1'),
    band:'water_frequency_1985_',
    visParams:{
      min:1,
      max:36,
      palette:['00ffff', '008eff', '0037ff', '0000ff', '0000a3'],
    },
  },
  'Tendencia de superficie de água (MapBiomas Água col.1) -U':{
    data:tendencia_agua,
    band:'classification_',
    visParams:{
        min: -6000,
        max: 6000,
        palette: ['red', 'white', 'green']
    },
  },
  'Mineração (MapBiomas col.6) -S':{
    data:mineracao,
    band:'classification_',
    visParams:{
      palette:['#AF2A2B'],
    },
  },
  // }
  // vetor:{
  'Biomas -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas-2019'),
    paint:{
      width:1.5,
      name:'Bioma',
      color:'CD_Bioma'
    },
  },
  'Estados -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017').map(function(feat){return feat.set('CD_GEOCUF',ee.Number.parse(feat.get('CD_GEOCUF')))}),
    paint:{
      width:1.5,
      name:'NM_ESTADO',
      color:'CD_GEOCUF',
    },
  },
  'Regiões -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017').map(function(feat){return feat.set('CD_GEOCUF',ee.Number.parse(feat.get('CD_GEOCUF')).divide(10).int())}),
    paint:{
      width:1.5,
      name:'NM_REGIAO',
      color:'CD_GEOCUF' // dividir por dez
    },
  },
  'Municipios -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/municipios-2020').map(function(feat){return feat.set('CD_MUN',ee.Number.parse(feat.get('CD_MUN')))}),
    paint:{
      width:1.5,
      name:'NM_MUN',
      color:'CD_MUN'
    },
  },
  'Macro Bacias -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/bacias-nivel-1'),
    paint:{
      width:1.5,
      name:'NVEL_1',
      color:'ID_NIVEL1'
    },
  },
  'Bacias Nível 1 -U':{
    data:ee.FeatureCollection('projects/ee-wallacesilva/assets/GEOFT_PNRH_SUB1'),
    paint:{
      width:1.5,
      name:'PS1_NM',
      color:'PS1_CD'
    },
  },
  'Bacias Nível 2 -U':{
    data:ee.FeatureCollection('projects/ee-wallacesilva/assets/GEOFT_PNRH_SUB2'),
    paint:{
      width:1.5,
      name:'PS2_NM',
      color:'PS2_CD'
    },
  },
  'Áreas Protegidas -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas'),
    paint:{
      width:1.5,
      name:'name',
      color:'featureid'
    },
  },
  'Brasil -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/brasil_2km'),
    paint:{
      width:1.5,
      name:'AREA',
      color:'AFTOSA',
    },
  },
  'América do Sul -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/America_do_Sul'),
    paint:{
      width:1.5,
      string:'NOME',
      color:'BRASIL_ID'
    },
  },
  'Grid Landsat -U':{
    data:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/cenas-landsat').map(function(feat){return feat.set('TILE',ee.Number.parse(feat.get('TILE')))}),
    paint:{
      width:1.5,
      name:'SPRNOME',
      color:'TILE'
    },
  },
  // }
};
// --- * --- * --- * --- * --- * --- * --- * --- * --- * --- * 
// --- --- --- --- --- --- FUNÇÕES
// --- --- mensagens automatizadas -> printa no console o momento de cada interação, funcional para monitorar a eficiencia dos processos
function automatedMessages(string){
  if (options.automatedMessages === false){
    return ;
  }
  string = string || '';
  print(string, ee.Date(Date.now()));
}
// --- --- adequando layout da root para receber o app
function setLayout (){
  automatedMessages('start-setLayout()');
  options.mapp = ui.root.widgets().get(0);
  options.panel = ui.Panel({
    // widgets:,
    layout:ui.Panel.Layout.flow('vertical'/*,true*/),
    // style:{}
    })
  options.splitPanel = ui.SplitPanel({
    firstPanel:options.mapp,
    secondPanel:options.panel,
    orientation:'horizontal',
    wipe:false,
    style:{}
  });
  ui.root.widgets().reset([options.splitPanel]);
  options.thumbParams = ui.Panel({
      widgets:ui.Label('thumbParams'),
      // layout:ui.Panel.Layout.Flow('horizontal',true),
      style:styles.thumbParams
  });
  options.panelThumbs = ui.Panel({
      // widgets:ui.Label('panelThumbs'),
      layout:ui.Panel.Layout.Flow('horizontal',true),
      style:styles.panelThumbs
    });
  options.panel.add(options.thumbParams);
  options.panel.add(options.panelThumbs);
  options.selectRegion = ui.Panel({
      // widgets:ui.Label('panelThumbs'),
      layout:ui.Panel.Layout.Flow('vertical',true),
      style:styles.selectRegion
    });
  options.mapp.add(options.selectRegion);
  var Mapp = require('users/joaovsiqueira1/packages:Mapp.js');
  options.mapp.setOptions({
    'styles': {
      'Dark': Mapp.getStyle('Dark')
    }
  });
  var opensource = ui.Label({
    value:'MapBiomas Machine - ' + sourceCode[1][0] + '\nLast Update ' + sourceCode[1][1] +  '\ncode-source' ,
    style:{
      margin:'0px 0px 0px 0px',
      position:'bottom-right',
      fontSize:'10px',
      backgroundColor:'ffffffdd',
      whiteSpace:'pre',
      textAlign:'center'
    },
    targetUrl:sourceCode[1][3]
    });
    options.mapp.add(opensource);
  automatedMessages('end-setLayout()');
}
// --- --- definindo layers na Map
function setLayers (){
  automatedMessages('start-setLayers()');
  options.mapp.addLayer(ee.Image(0).select(0),{},'Imagens construidas',true);
  options.mapp.addLayer(ee.Image(1),{palette:options.backgroundColor},'BackGround -U',true);
  options.rasters.forEach(function(data){
    var image = dataset[data].data;
    var vis = dataset[data].visParams;
    vis['bands'] = dataset[data].band + options.year;
    options.mapp.addLayer(image,vis,data,false);
  });
  var maskLayer = ee.Image(1).paint(options.geometry);
  maskLayer = maskLayer.updateMask(maskLayer.eq(1)); 
  options.mapp.addLayer(maskLayer,{palette:options.maskColor},'mask layer (intermediate) -U',true);
  var blank = ee.Image(0).mask(0);
  options.vectors.forEach(function(data){
    var line = blank
      .paint(dataset[data].data,'vazio',dataset[data].paint.width);
    options.mapp.addLayer(line,{},data,false);
  });
  options.mapp.addLayer(maskLayer,{palette:options.maskColor},'mask layer (top) -U',false);
  options.mapp.addLayer(ee.Image().select(),{},'options',false);
  automatedMessages('end-setLayers()');
  options.mapp.onClick(function(value){
    if (options.clickMap === true){
    // coords =  value
    var point = ee.Geometry.Point([value.lon,value.lat]);
    var featureCollection = options.featureCollection.data.filterBounds(point);
    options.geometry = featureCollection.geometry();
    var line = ee.Image(0).mask(0).paint(featureCollection,'vazio',1.5);
    print(featureCollection.get(options.featureCollection.paint.name));
    options.clickMap = false;
    options.mapp.layers ().filter(function(item){
      return item.getName() === 'options';
    })[0].setEeObject(line);
    var maskLayer = ee.Image(1).paint(options.geometry);
    maskLayer = maskLayer.updateMask(maskLayer.eq(1)); 
    options.mapp.layers ().filter(function(item){
      return item.getName() === 'mask layer (intermediate) -U';
    })[0].setEeObject(maskLayer);
    options.mapp.layers ().filter(function(item){
      return item.getName() === 'mask layer (top) -U';
    })[0].setEeObject(maskLayer);
    }
  });
}
function label (text,panel){
  panel = panel || ui.Label();
  text = ui.Label({
    value:text,
    style:styles.subtitles2,
    // targetUrl:
    });
  return ui.Panel({
    // widgets:[text,panel],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:styles.panelLabels
  }).add(text).add(panel);
}
function setThumbParams (){
  automatedMessages('start-setThumbParams()');
  options.thumbParams.clear();
  var generateByMask = ui.Button({
    label:'Usar área da mascara',
    onClick:function(){
      automatedMessages('click in Button "Usar área da mascara"');
      setBounds();
      setThumbs();
    },
    // disabled:,
    style:styles.buttons2
    });
  generateByMask = label('Escolha o recorte dos mapas:',generateByMask);
  var generateByScreen = ui.Button({
    label:'Usar área da tela',
    onClick:function(){
      automatedMessages('click in Button "Usar área da tela"');
      setBounds('screen');
      setThumbs();
    },
    // disabled:,
    style:styles.buttons2
    });
    var clearPanelThumbs = ui.Checkbox({
    label:'Limpar painel dos mapas',
    value:options.clearPanelThumbs,
    onChange:function(value){
      options.clearPanelThumbs = value;
      if (value === false){
        return ;
      }
      setThumbs();
    },
    // disabled:,
      style:styles.checkbox
    });
  var png = ui.Checkbox({
    label:'Mapas anuais (.png)',
    value:options.png, 
    onChange:function(value){
      options.png = value;
      setThumbs();
    },
    // disabled:,
    style:styles.checkbox
    });
  // png = label('Cor da mascara',png);
  var gif = ui.Checkbox({
    label:'Animação ano a ano .gif',
    value:options.gif, 
    onChange:function(value){
      options.gif = value;
      setThumbs();
    },
    // disabled:,
    style:styles.checkbox
    });
  // gif = label('Cor da mascara',gif);
  var panelFirst = ui.Panel({
    widgets:[generateByMask,generateByScreen,png,gif,clearPanelThumbs],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:styles.panelButtons
  });
  // --- --- ---
  var maskColor = ui.Textbox({
      // placeholder:,
      value:options.maskColor,
      onChange:function(value){
        options.maskColor = value;
      options.mapp.layers ().filter(function(item){
        return item.getName() === 'mask layer (intermediate) -U';
      })[0].setVisParams({palette:value});
      options.mapp.layers ().filter(function(item){
        return item.getName() === 'mask layer (top) -U';
      })[0].setVisParams({palette:value});
        setThumbs();
      },
      // disabled:,
      style:styles.textbox
    });
  maskColor = label('cor da mascara:',maskColor);
  var backgroundColor = ui.Textbox({
      // placeholder:,
      value:options.backgroundColor,
      onChange:function(value){
        options.backgroundColor = value;
      options.mapp.layers ().filter(function(item){
        return item.getName() === 'BackGround -U';
      })[0].setVisParams({palette:value});
        setThumbs();
      },
      // disabled:,
      style:styles.textbox
    });
  backgroundColor = label('fundo:',backgroundColor);
  var frames = ui.Select({
    items:[
      '0.25','0.36','0.5','1','2','3','4','5','6','7','8','9','10','36'
    ],
    // placeholder:,
    value:options.frames,
    onChange:function(value){
      options.frames = value
      setThumbs();
    },
    // disabled:,
    style:styles.select
    })
  frames = label('frames/s',frames);
  var size = ui.Select({
    items:['64px','128px','256px','512px','1024px','2048px'],
    // placeholder:,
    value:styles.thumbnails.height,
    onChange:function(value){
      styles.thumbnails.height = value
      setThumbs();
    },
    // disabled:,
    style:styles.select
    })
  size = label('altura',size);
  var key = 'Fator de escala'
  var widget = ui.Textbox({
    placeholder:layoutMap[key],
    value:layoutMap[key],
    onChange:function(value){
      layoutMap[key] = value;
        setBounds('scale');
        setThumbs();
    },
    // disabled:,
    style:styles.textbox2
  });
  var distance = label(key,widget);
  var panelOptions = ui.Panel({
    widgets:[maskColor,backgroundColor,distance,frames,size,
    ],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:styles.panelButtons
    });
  // --- --- --- 
  var key_title = 'Ano'
  var key_titleLat = 'lat'
  var titleLat = ui.Textbox({
      placeholder:layoutMap[key_title][key_titleLat],
      value:layoutMap[key_title][key_titleLat],
      onChange:function(value){
        print(layoutMap[key_title][key_titleLat])
        layoutMap[key_title][key_titleLat] = value;
        print(layoutMap[key_title][key_titleLat])
        setThumbs();
      },
      style:styles.textbox2
    });
  titleLat = label(key_titleLat + ':',titleLat);
  var key_titleLong = 'long';
  var titleLong = ui.Textbox({
      placeholder:layoutMap[key_title][key_titleLong],
      value:layoutMap[key_title][key_titleLong],
      onChange:function(value){
        layoutMap[key_title][key_titleLong] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  titleLong = label(key_titleLong + ':',titleLong);
  var key_titleLabel = 'label';
  var titleLabel = ui.Textbox({
      placeholder:'YYYY',
      value:layoutMap[key_title][key_titleLabel],
      onChange:function(value){
        layoutMap[key_title][key_titleLabel] = value;
        setBounds('first');
        setThumbs();
      },
      // disabled:,
      style:styles.textbox
    });
  titleLabel = label('Título: ',titleLabel);
  var titlePanel = ui.Panel({
  widgets:[titleLabel,titleLat,titleLong],
  layout:ui.Panel.Layout.Flow('horizontal'/*,true*/),
  style:styles.panelButtons
  });
  // --- --- --- 
/*  var key_scale = 'Escala'
  var key_scaleTop = 'top'
  var scaleTop = ui.Textbox({
      placeholder:layoutMap[key_scale]['top'],
      value:layoutMap[key_scale]['top'],
      onChange:function(value){
        layoutMap[key_scale]['top'] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  scaleTop = label('top' + ':',scaleTop);
  var key_scaleBottom = 'bottom';
  var scaleBottom = ui.Textbox({
      placeholder:layoutMap[key_scale][key_scaleBottom],
      value:layoutMap[key_scale][key_scaleBottom],
      onChange:function(value){
        layoutMap[key_scale][key_scaleBottom] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  scaleBottom = label(key_scaleBottom + ':',scaleBottom);
  var key_scaleLeft = 'left';
  var scaleLeft = ui.Textbox({
      placeholder:layoutMap[key_scale][key_scaleLeft],
      value:layoutMap[key_scale][key_scaleLeft],
      onChange:function(value){
        layoutMap[key_scale][key_scaleLeft] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  scaleLeft = label(key_scaleLeft + ':',key_scale);
  var key_scaleRight = 'right';
  var scaleRight = ui.Textbox({
      placeholder:layoutMap[key_scale][key_scaleRight],
      value:layoutMap[key_scale][key_scaleRight],
      onChange:function(value){
        layoutMap[key_scale][key_scaleRight] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  scaleRight = label(key_scaleRight + ':',scaleRight);
  scaleTop = label('Escala gráfica:  ' ,scaleTop);
  var scalePanel = ui.Panel({
  widgets:[scaleTop,scaleBottom,scaleLeft,scaleRight],
  layout:ui.Panel.Layout.Flow('horizontal'),
  style:styles.panelButtons
  });
  print(scalePanel)
  // --- --- --- 
  var key_north = 'Norte'
  var key_northLat = 'lat'
  northLat = ui.Textbox({
      placeholder:layoutMap[key_north][key_northLat],
      value:layoutMap[key_nort][key_northLat],
      onChange:function(value){
        layoutMap[key_north][key_northLat] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  var northLat = label(key_northLat + ':',northLat);
  var key_northLong = 'long';
  var northLong = ui.Textbox({
      placeholder:layoutMap[key_north][key_northLong],
      value:layoutMap[key_north][key_northLong],
      onChange:function(value){
        layoutMap[key_north][key_northLong] = value;
        setThumbs();
      },
      style:styles.textbox2
    });
  northLong = label(key_northLong + ':',northLong);
  var key_northSize = 'size';
  var northSize = ui.Textbox({
      placeholder:layoutMap[key_north][key_northSize],
      value:layoutMap[key_north][key_northSize],
      onChange:function(value){
        layoutMap[key_north][key_northSize] = value;
        setThumbs();
      },
      // disabled:,
      style:styles.textbox2
    });
  northSize = label('Norte: ' +key_northSize + ':',northSize);
  var norhtPanel = ui.Panel({
  widgets:[northSize,northLat,northLong],
  layout:ui.Panel.Layout.Flow('horizontal'),
  style:styles.panelButtons
  });
*/
  var panel = ui.Panel({
    widgets:[panelFirst,panelOptions,titlePanel/*,norhtPanel*//*,scalePanel*/],
    layout:ui.Panel.Layout.Flow('vertical',true),
    style:styles.panelButtons
    });
  options.thumbParams.add(panel);
  automatedMessages('end-setThumbParams()');
}
function setThumbs(){
  automatedMessages('start-setThumbs()');
  // --- limpar painel - enquanto true limpa o painel a cada interação - enquanto false acumula as thumbnails no painel
  // --- nessa seção são utilizados oo modulos text e style do Gennadii Donchyts
  // - o modulo text foi usado para georreferenciar pontos e escrever textos como o titulo e a fonte
  var text = require('users/gena/packages:text');
  // - o modulo styles foi utilizado para plotar elementos cartograficos como o norte e a escala (ainda
  // é possivel explorar rotulos no mapa e barras de cor com este módulo)
  var style = require('users/gena/packages:style');
  if (options.clearPanelThumbs === true){
    options.panelThumbs.clear();
  }
  // a escala utilizada é a armazenada no momento do click nos botões de recorte 
  var scale = options.scale;
  var text_position = text.getLocation(options.bounds,'left','' + layoutMap['Ano']['lat'] + '%','' + layoutMap['Ano']['long'] + '%');
  var font_position = text.getLocation(options.bounds,'left',layoutMap['Fonte']['lat'],layoutMap['Fonte']['long']);
  var fontLabel = text.draw(layoutMap['Fonte']['label'], font_position, scale, layoutMap['Fonte']['params']);
  // preparando norte
  north_arrow = text.getLocation(options.bounds,'left', layoutMap['Norte']['lat'], layoutMap['Norte']['long']);
  var north_arrow = style.NorthArrow.draw(north_arrow, scale * layoutMap['Norte']['size'], 1, 0.1);
  var a = text.getLocation(options.bounds,'right', layoutMap['Escala']['top'], layoutMap['Escala']['left']);
  var b = text.getLocation(options.bounds,'right', layoutMap['Escala']['bottom'], layoutMap['Escala']['right']);
  var scaleBar = ee.Geometry.LineString([a,b]).bounds();
  scaleBar = style.Scalebar.draw(scaleBar, layoutMap['Escala']['params']);
  // unindo elementos fixos
  var elements = scaleBar
    .blend(north_arrow);
  // --- elemetos dinamicos nos mapas
  var years = [
    1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,
    2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,2020
  ];
  var layers = options.mapp.layers().filter(function(item){
    return item.getShown() === true;
  });
  var collection = years.map(function(year){
    var image = ee.Image(0).mask(0);
    layers.forEach(function(item){
      var opacity = item.getOpacity();
      var visParams = item.getVisParams();
      visParams['opacity'] = opacity;
      var name = item.getName();
      var codigo = name.split('-')[1];
      if(codigo === 'S'){
        var band = visParams.bands.slice(0,-4);
        band = band+year;
        visParams['bands'] = band;
      }
      var eeObject = item.getEeObject()
        .visualize(visParams);
      image = image.blend(eeObject); 
    });
    var label = text.draw(layoutMap['Ano']['label']+ ' '+ year, text_position, scale, layoutMap['Ano']['params']);
    return image
      .blend(elements)
      .blend(label)
      .blend(fontLabel);
  });
  if (options.gif === true){
    var gif = ui.Thumbnail({
        image:ee.ImageCollection(collection),
        params:{
          crs: 'EPSG:3857', 
          dimensions: 850, 
          region: options.bounds,
          framesPerSecond: options.frames, // frames por segundo || [ ] - colocar como opção para o usuario
          format: 'gif' 
        },
        style:styles.thumbnails
        });
    options.panelThumbs.add(gif);
  }
    if (options.png === true){
    collection.map(function(img){
      var png = ui.Thumbnail({
        image:img,
        params:{
          crs: 'EPSG:3857', 
          dimensions: 1100, 
          region: options.bounds,
          onClick:function (){
            print()
            options.mapp.layers().get(0).setEeObject(img);
          },
          format: 'png' 
        },
        style:styles.thumbnails
        });
      options.panelThumbs.add(png);
    });
  }
  automatedMessages('end-setThumbs()');
}
function setBounds(area){
  automatedMessages('start-setBounds()');
  options.bounds = options.geometry.bounds();
  if (area === 'screen'){
    options.bounds = ee.Geometry.Rectangle(options.mapp.getBounds());
  }
  if (area === 'first'){
      options.bounds = dataset[options.maskLayer].data.geometry().bounds();
  }
  if (area === 'scale'){
      options.scale = options.scale * layoutMap['Fator de escala'];
      options.bounds = dataset[options.maskLayer].data.geometry().bounds().buffer(options.scale);
  }
  options.mapp.centerObject(options.bounds);
  options.scale = options.mapp.getScale();
  automatedMessages('start-setBounds()');
}
function selectRegion(geometry){
  var optionsLayer = options.mapp.layers ().filter(function(item){
    return item.getName() === 'options';
  });
  var text = ui.Label({
    value:'Altere a mascara',
    style:styles.subtitles,
    // targetUrl:
    })
  options.selectRegion.add(text);
  optionsLayer = optionsLayer[0];
  options.vectors.map(function(data){
    var featureCollection = dataset[data].data;
    var layer = ee.Image(0).mask(0)
      .paint(featureCollection,dataset[data].paint.color)
      .randomVisualizer();
    var button = ui.Button({
      label:data.split('-')[0],
      onClick:function(){
        optionsLayer.setShown(true);
        optionsLayer.setEeObject(layer);
        options.clickMap = true;
        options.featureCollection = dataset[data];
      },
      // disabled:,
      style:styles.buttons
    });
    options.selectRegion.add(button);
  });
}
function init (){
  automatedMessages('start-init()');
  options.geometry = dataset[options.maskLayer].data.geometry();
  setLayout();
  setLayers();
  setThumbParams();
  selectRegion();
  options.mapp.layers().get(2).setShown(true);
  options.mapp.layers().get(11).setShown(true);
  Map.centerObject(center_object);
  automatedMessages('end-init()');
}
Map.centerObject(center_object);
init();
Map.centerObject(center_object);