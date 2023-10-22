/*  Toolkit de mapas para o monitor da fiscalização do MapBiomas Alerta
Parceria entre IPAM & ICV
Objetivo: desenvolver aplicativo no Google Earth Engine, que explore
alguns conjuntos de alertas em mapas dinamicos,
palavras chave: 
- MapBiomas-Alerta; Alertas de desmatamento; MapBiomas-Brasil
- Programação orientada a objetos; programação orientada a listas; programação orientada a eventos
    Links externos
    monitor da fiscalização -> https://datastudio.google.com/u/0/reporting/edba4d53-ed1d-40e7-9da7-0ad4050d55c8/page/p_h4y14lp7qc 
    lista de desmatamento ilegal do Pará -> https://monitoramento.semas.pa.gov.br/ldi/consultaMapa/mapa
    plataforma mapbiomas alerta -> https://plataforma.alerta.mapbiomas.org/
    laudo "aleatorio" gerado na plataforma do mapbiomas alerta -> https://plataforma.alerta.mapbiomas.org/laudo/117656 // -> o numero
    final do endereço pode ser consultado na propriedade "CodeAlerta" presente nas featureCollections dos alertas
Solicitação: Ana Paula Valdiones e Vinícius Silgueiro
Desenvolvimento: Wallace Silva
    wallace.silva@ipam.org.br
dev start
  1.0 - primeira versão sistematizada -> https://code.earthengine.google.com/7a8076bf9f510d491cc664ed19dee349
  1.1 - versão com consideraçoes da Ana Paula e Vinicius. Na primeira versão os dados de alertas estão separados
  por secretaria, nessa segunda os dados são apresentados em conjunto para o Brasil todo, além de algumas 
  atualizações simples nos widgets e suas estilizações. -> https://code.earthengine.google.com/c6a013410af1d2cadf693ffa6c20f2f3
*/
// --- --- --- DICIONARIOS
// --- --- Objeto principal do codigo -> responsavel pelo armazenamento de propriedades e listas auxiliares para 
// a de inicialização da interface, servindo tambem de memoria cache de novas informações
var options ={
  start:'2022-01-01',
  end:'2019-01-01',
  // lista com as camadas de alertas nos datasets
  set_alerts:[
      'Alertas de desmatamento',
      'Com autorizacao obtida no SINAFLOR',
      'Com autorizacao da SEMA-MT',
      'Com autorizacao da SEMAS-PA',
      // [ ] dados com autorização da secretaria de meio ambiente de MG
      // [ ] dados com autorização do SEMAD-GO
      // [ ] dados com autorização da SIMA-SP
      'Com embargo do IBAMA',
      'Com embargo da SEMA-MT',
      'Com embargo da SEMAS-PA',
      'Com embargo da SEMAD-GO',
      'Com embargo da SIMA-SP'
      // [ ] dados de de embargo da secretaria de meio ambiente de MG
    ],
  set_auxiliar: [
    'Brasil','Biomas', 'Estados', 'Municipios', 
    'Amazônia legal', 'Lei da Mata Atlântica',  'Semiarido',
    'UC`s de Proteção Integral',  'UC`s de Uso Sustentavel',
    'Terras Indigenas', 'Territórios Quilombolas',
  ],
  set_selects: [
    'Brasil',
    'Biomas',
    'Estados',
    'Municipios',
  ],
  // - Para iniciar o script com uma determinada camada ligada, crie uma chave com o nome dela
  // e atribua o valor true, como no exemplo abaixo
  'Alertas de desmatamento':true,
};
// --- --- Objeto com datasets utilizados
var datasets = {
    // --- Camadas do mapbiomas alerta
    /* - padrão de cores
      -> Alertas MapBiomas -> amarelo 'ffff00'
      -> Alertas com autorização -> azul '0000ff'
      -> Alertas com embargo -> vermelho '0000ff'
    */
    // Dados do mapbiomas alerta
    'Alertas de desmatamento':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento'),
      visParams:{
          palette:'ffff00'
        },
      },
    // dados do Governo Federal
    'Com autorizacao obtida no SINAFLOR':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_autorizacao_obtida_no_SINAFLOR'),
      visParams:{
          palette:'0000ff'
      }
    },
    'Com embargo do IBAMA':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_embargo_do_IBAMA'),
      visParams:{
        palette:'ff007f'
      }
    },
    // dados do SEMA-PA
    'Com autorizacao da SEMAS-PA':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_autorizacao_da_SEMAS-PA'),
      visParams:{
        palette:'0000ff'
      },
    },
    'Com embargo da SEMAS-PA':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_embargo_da_SEMAS-PA'),
      visParams:{
        palette:'ff007f'
      },
  },
    // dados do SEMA-MT 
    'Com autorizacao da SEMA-MT':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_autorizacao_da_SEMA-MT'),
      visParams:{
        palette:'0000ff'
      },
    },
    'Com embargo da SEMA-MT':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_embargo_da_SEMA-MT'),
      visParams:{
        palette:'ff007f'
      },
    },
    // dados do SEMAD-GO
    // [ ] dados com autorização do SEMAD-GO
    'Com embargo da SEMAD-GO':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_embargo_da_SEMAD-GO'),
      visParams:{
        palette:'ff007f'
      },
    },
    // [ ] dados com autorização do SEMAD-GO
    'Com embargo da SIMA-SP':{
      feature:ee.FeatureCollection('projects/workspace-ipam/assets/ICV/Alertas_de_desmatamento_com_embargo_da_SIMA-SP'),
      visParams:{
        palette:'ff007f'
      },
    },
    // --- Camadas auxiliares
    'Brasil': {
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/country'),
      'visParams':{
        palette:'000000'
      }
    },
    'Biomas': {
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/biome'),
      'visParams':{
        palette:'000000'
      }
    },
    'Estados': {
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/state'),
      'visParams':{
        palette:'000000'
      }
    },
    'Municipios':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/city'),
      'visParams':{
        palette:'000000'
      }
    },
    'UC`s de Proteção Integral':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_integral_protection'),
      'visParams':{
        palette:'008000'
      }
    },
    'UC`s de Uso Sustentavel':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_sustainable_use'),
      'visParams':{
        palette:'00ff00'
      }
    },
    'Terras Indigenas':{  
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/indigenous_land'),
      'visParams':{
        palette:'ffa500'
      }
    },
    'Territórios Quilombolas':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/quilombo'),
      'visParams':{
        palette:'964b00'
      }
    },
    'Amazônia legal':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/legal_amazon'),
      'visParams':{
        palette:'000000'
      }
    },
    'Lei da Mata Atlântica':{
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/legal_amazon'),
      'visParams':{
        palette:'000000'
      }
    },
    'Semiarido': {
      'feature': ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/semiarid'),
      'visParams':{
        palette:'000000'
      }
    },
};
var styles = {
  comum:{
    margin: '0px 0px 0px 0px',
    textAlign: 'center',
    // stretch:'horizontal',
  },
  box:{
    margin: '1px 1px 1px 1px',
    textAlign: 'right',
    border:'1px solid black',
    fontSize:'12px',
    width:'60px',
    // stretch:'horizontal',
  },
  head_alerts_0:{
    margin: '1px 1px 1px 1px',
    textAlign: 'center',
    // border:'1px solid black',
    fontWeight:'bold',
    fontSize:'14px',
    // width:'60px',
    stretch:'horizontal',
  },
  head_alerts_1:{
    margin: '1px 1px 1px 1px',
    textAlign: 'right',
    // border:'1px solid black',
    fontSize:'12px',
    width:'60px',
    // stretch:'horizontal',
  },
  link_code:{
    margin: '1px 1px 1px 1px',
    position:'bottom-right',
    fontSize:'10px',
    backgroundColor:'ffffffff'
  },
  logo:{
    'background-color': 'white',
    // 'height': null',
    'margin': '8px',
    'padding': 0,
    'position': 'top-center',
    'shown': true,
    'stretch': 'horizontal',
    'text-align': 'center',
    'width': '370px',
  },
  thumbLabel:{
    margin: '1px 1px 1px 1px',
    textAlign: 'center',
    width:'13px',
    // stretch:'horizontal',
  },
  panelControl:{
    margin: '0px 0px 0px 0px',
    textAlign: 'center',
    stretch:'vertical',
  },
  check_mapLegend:{
    margin: '1px 0px 1px 0px',
    fontSize: '12px',
    stretch:'horizontal',
    width:'250px'
  },
  title:{
    margin: '1px 0px 1px 0px',
    fontSize:'22px',
    stretch:'horizontal',
    textAlign: 'center',
    // backgroundColor:'ddddff'
  },
  sub_title:{
    margin: '1px 0px 1px 0px',
    fontSize:'14px',
    stretch:'horizontal',
    textAlign: 'center',
    backgroundColor:'ddddff'
  },
  sub_title_2:{
    margin: '30px 0px 1px 0px',
    fontSize:'14px',
    stretch:'horizontal',
    textAlign: 'center',
    backgroundColor:'ddddff'
  },
  select:{
    margin: '1px 1px 1px 0px',
    fontSize:'14px',
    stretch:'horizontal',
    textAlign: 'center',
    backgroundColor:'ddddff'
  }
};
// --- --- --- FUNÇÕES
function start (){
  options.timeStart = ee.Date(Date.now());
  print('options',options);
  setLayout();
  clickMap();
  options.timeEnd = ee.Date(Date.now());
  print('options',options);
}
// --- --- Reorganizando canvas
function setLayout (){
  options.mapp = ui.root.widgets().get(0);
  options.panelControl = ui.Panel({
    // widgets: ,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.panelControl
  });
  options.inspect = ui.Panel({
    widgets:[ ui.Label({
      value:'Click sobre o alerta no mapa para inspecionar',
      style:styles.sub_title_2, 
      // targetUrl:,
      // imageUrl:
    }),ui.Label(''),ui.Label(''),ui.Label(''),ui.Label(''),],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.comum
  });
  options.panelLateral = ui.Panel({
    widgets:[options.panelControl,options.inspect],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.comum
  });
  // -> redesenhando canvas de fato
  ui.root.widgets().reset([options.panelLateral,options.mapp]);
  // -> head
  var logo = ee.Image('projects/workspace-ipam/assets/logos/MapBiomas_Alerta_georeferenced')
  logo = logo.updateMask(logo.select('b1').neq(0)) //-> mascarando fundo escuro -> comentar esta linha para deixar com fundo escuro
    .visualize({});
  logo = ui.Thumbnail({
    image:logo,
    params:{
      dimensions:1000,
      // region:region
    },
    // onClick,
    style:styles.logo
    })
    require('users/mapbiomas/modules:Logos.js')['mapbiomas'];
  var title = ui.Label({
      value:'Monitor da fiscalização',
      style:styles.title, 
      // targetUrl:,
      // imageUrl:
    });
  options.panelControl
    .add(logo)
    .add(title);
  /////////////////////////
  var line_select = ui.Panel({
    // widgets, 
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:styles.comum
  });
    options.set_selects.forEach(function(select){
      datasets[select]['feature'].aggregate_array('name_pt_br').evaluate(function(items){
        var ui_select = ui.Select({
          items:items,
          placeholder:select,
          // value:,
          onChange:function(value){
            options.geometry = datasets[select]['feature']
              .filter(ee.Filter.eq('name_pt_br',value)); 
            options.mapp.centerObject(options.geometry)
            options.line = ee.Image().paint(options.geometry,'vazio',1)
              .visualize({palette:'800000'}); 
            removeLayer('Limite selecionado');
            options.mapp.add(ui.Map.Layer({
              eeObject:options.line,
              // visParams:'',
              name:'Limite selecionado',
              shown:true,
              // opacity
              }));
            var mapLegend_1 = options.set_alerts
              .map(function(string_key){ return mapLegend_alert(string_key,'circle')});
            options.mapLegend_1.clear();
            options.mapLegend_1 = ui.Panel({
              widgets:mapLegend_1,
              layout:ui.Panel.Layout.Flow('vertical'),
              style:styles.comum
            });
            options.panelControl.widgets().set(4,options.mapLegend_1);
            options.legend_title.setValue(select + ' - ' + value)
          },
          // disabled:,
          style:styles.select
        });
        line_select.add(ui_select);
      })
    });
    options.panelControl
    .add(line_select)
  /////////////////////////
  options.legend_title = ui.Label('Brasil',styles.head_alerts_0);
  var head_alerts = ui.Panel([
    options.legend_title,
    ui.Label('Contagem',styles.head_alerts_1),
    ui.Label('Área ha',styles.head_alerts_1),
    ], ui.Panel.Layout.Flow('horizontal'), styles.comum);
  options.mapLegend_1 = options.set_alerts
    .map(function(string_key){ return mapLegend_alert(string_key,'line')});
  options.mapLegend_1 = ui.Panel({
    widgets:options.mapLegend_1,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.comum
  });
  options.panelControl
    .add(head_alerts)  
    .add(options.mapLegend_1);
  // -> set auxiliar subtitle
  var sub_title_2 = ui.Label({
      value:'Camadas Auxiliares',
      style:styles.sub_title, 
      // targetUrl:,
      // imageUrl:
    });
  options.mapLegend_2 = options.set_auxiliar
    .map(function(string_key){ return mapLegend_simple(string_key,'line')});
  options.mapLegend_2 = ui.Panel({
    widgets:options.mapLegend_2,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.comum
  });
  options.panelControl
    .add(sub_title_2)
    .add(options.mapLegend_2);
  options.mapp.setOptions({
    'styles': {
      'Dark': require('users/joaovsiqueira1/packages:Mapp.js').getStyle('Dark')
    }
  });
 options.mapp.setControlVisibility({
  // all:,
  // layerList:false,
  // zoomControl:,
  // scaleControl:,
  // mapTypeControl:,
  // fullscreenControl:,
   drawingToolsControl:false
  });
 var link_code = ui.Label({
   value:'acesse o codigo aqui',
   style:styles.link_code,
   targetUrl:'https://code.earthengine.google.com/c6a013410af1d2cadf693ffa6c20f2f3',
  // imageUrl:
  });
 options.mapp.add(link_code);
}
// ---- --- Legendas
function mapLegend_alert (string_key,simbol){
  var dataset = datasets[string_key];
  var feature = dataset['feature'];
  if (options.geometry !== undefined){
    removeLayer(string_key);
    feature = feature.filterBounds(options.geometry);
  }
  var ui_layer = ui.Map.Layer({
    eeObject:ee.Image().paint(feature,'vazio',0.25),
    visParams:dataset['visParams'],
    name: string_key,
    shown:true,
    // opacity:
  });
  // - condicional para que as layers ja venham ligadas
  if (options[string_key] === true){
    options.mapp.add(ui_layer);
  }
  var line = ui.Panel({
    // widgets:[ui.Label('')],
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:styles.comum
  });
  simbol = thumbSimbol(simbol,dataset['visParams']);
  line.add(simbol);
  // - check for legend  
  var check = ui.Checkbox({
    label:string_key,
    value:options[string_key] || false,
    onChange:function(value){
        options[string_key] = value;
        var SWITCH = {
          true:function(){options.mapp.add(ui_layer)},
          false:function(){options.mapp.remove(ui_layer)}
        };
        SWITCH[value]();
    },
    // disabled:,
    style:styles.check_mapLegend
  });
  line.add(check);
  var count_box = ui.Label('',styles.box)
    feature.aggregate_array('CodeAlerta').distinct().size().evaluate(function(a){
     count_box.setValue(a)
  });
  line.add(count_box);
  var area_box = ui.Label('',styles.box)
  var property;
  if (string_key === 'Alertas de desmatamento'){
    property = 'Area_ha'
  } else {
    property = 'AREA_X'
  }
    feature.aggregate_sum(property).round().evaluate(function(a){
     area_box.setValue(a)
  });
  line.add(area_box);
  return line;
}
function mapLegend_simple (string_key,simbol){
  var dataset = datasets[string_key];
  var ui_layer = ui.Map.Layer({
    eeObject:ee.Image().paint(dataset['feature'],'vazio',0.25).byte(),
    visParams:dataset['visParams'],
    name: string_key,
    shown:true,
    // opacity:
  });
  // - condicional para que as layers ja venham ligadas
  if (options[string_key] === true){
    options.mapp.add(ui_layer);
  }
  var line = ui.Panel({
    // widgets,
    layout:ui.Panel.Layout.Flow('horizontal'),
    style:styles.comum
  });
  if (simbol !== undefined){
    var label = thumbSimbol(simbol,dataset['visParams']);
    line.add(label);
  }
  // - check for legend  
  var check = ui.Checkbox({
    label:string_key,
    value:options[string_key] || false,
    onChange:function(value){
        options[string_key] = value;
        var SWITCH = {
          true:function(){options.mapp.add(ui_layer)},
          false:function(){options.mapp.remove(ui_layer)}
        };
        SWITCH[value]();
    },
    // disabled:,
    style:styles.check_mapLegend
  });
  return line
    .add(check);
}
function thumbSimbol (format,visParams){
  // - label: simbol for legend
  var point = ee.Geometry.Point([0,0]);
  var buffer = point.buffer(5000);
  var colum_buffer = ee.Geometry.LineString([[0,1],[0,-1]]).buffer(1000);
  var line_buffer = ee.Geometry.LineString([[1,0],[-1,0]]).buffer(1000);
  var perpendicular_line = ee.Geometry.LineString([[1,1],[-2,-2]]); 
  var buffer_bounds = buffer.bounds();
  var perpendicular_line_bounds = perpendicular_line.bounds();
  var circle = ee.Image(ee.Image()
    .paint(ee.FeatureCollection([ee.Feature(buffer)]),'vazio'))
    .visualize(visParams);
  var colum = ee.Image(ee.Image()
    .paint(ee.FeatureCollection([ee.Feature(colum_buffer)]),'vazio'))
    .visualize(visParams);
  var line = ee.Image(ee.Image()
    .paint(ee.FeatureCollection([ee.Feature(line_buffer)]),'vazio'))
    .visualize(visParams);
  var rectangle = ee.Image(ee.Image()
    .paint(ee.FeatureCollection([ee.Feature(perpendicular_line_bounds)]),'vazio'))
    .visualize(visParams)
  var square = ee.Image(ee.Image()
    .paint(ee.FeatureCollection([ee.Feature(buffer_bounds)]),'vazio'))
    .visualize(visParams);
  var SWITCH = {
    'circle':{
      image:circle,
      region:buffer_bounds,
    },
    'square':{
      image:square,
      region:buffer_bounds,
    },
    'rectangle':{
      image:rectangle,
      region:perpendicular_line_bounds,
    },
    'colum':{
      image:colum,
      region:buffer_bounds,
    },
    'line':{
      image:line,
      region:buffer_bounds,
    },
  };
  return ui.Thumbnail({
    image:SWITCH[format]['image'],
    params:{
      region:SWITCH[format]['region'],
      dimensions:100
    }, 
    // onClick, 
    style:styles.thumbLabel
    })
}
// --- --- clicar no mapa
function clickMap (){
  function onClick(value){
  print('aqui')
    var lat = value['lat'];
    var lon = value['lon'];
    var point = ee.Geometry.Point([lon,lat]);
    var alert = datasets['Alertas de desmatamento']['feature']
      .filterBounds(point);
    var secretarias_alert = options.set_alerts.slice(1).map(function(sec_alert){
      return datasets[sec_alert]['feature']
        .filterBounds(point).map(function(feature){
          return feature.set('Area_ha',feature.get('AREA_X'));
        });
    })
    secretarias_alert = ee.FeatureCollection(secretarias_alert)
      .flatten();
    removeLayer('Limite do Alerta inspecionado')
    options.inspect.widgets().set(1,ui.Label(''));
    options.inspect.widgets().set(2,ui.Label(''));
    options.inspect.widgets().set(3,ui.Label(''));
    options.inspect.widgets().set(4,ui.Label(''));
    var alert_size = alert.size().getInfo()
    print(alert_size)
    if (alert_size >= 1){
      print('alert.size() >= ee.Number(1)')
    var secretarias_alert_size = secretarias_alert.size().getInfo()
      if (secretarias_alert_size >= 1){
      print('secretarias_alert_size >= 1')
        alert = secretarias_alert
      }
    var alert_image = ee.Image().paint(alert,'vazio')
      .visualize({palette:'bbbbbb'});
    var ui_layer = ui.Map.Layer({
      eeObject:alert_image,
      // visParams:,
      name:'Limite do Alerta inspecionado',
      shown:true,
      // opacity:
    });
    alert.first().get('Area_ha').evaluate(function(area){
      area = ui.Label({
        value: 'Área ha: ' + area,
        style:styles.comum,
        // targetUrl: 'https://plataforma.alerta.mapbiomas.org/laudo/' + i,
        // imageUrl
      });
      options.inspect.widgets()
        .set(1,area)
    });
    alert.first().get('CodeAlerta').evaluate(function(CodeAlerta){
      CodeAlerta = ui.Label({
        value: 'Alerta: ' + CodeAlerta,
        style:styles.comum,
        // targetUrl: 'https://plataforma.alerta.mapbiomas.org/laudo/' + i,
        // imageUrl
      });
      options.inspect.widgets()
        .set(2,CodeAlerta);
    });
    alert.first().get('DataDetec').evaluate(function(DataDetec){
      DataDetec = ui.Label({
        value: 'Detectado em: ' + DataDetec,
        style:styles.comum,
        // targetUrl: 'https://plataforma.alerta.mapbiomas.org/laudo/' + i,
        // imageUrl
      });
      options.inspect.widgets()
        .set(3,DataDetec)
    });
    alert.first().get('Fonte').evaluate(function(Fonte){
      Fonte = ui.Label({
        value: 'Fonte: ' + Fonte,
        style:styles.comum,
        // targetUrl: 'https://plataforma.alerta.mapbiomas.org/laudo/' + i,
        // imageUrl
      });
      options.inspect.widgets()
        .set(4,Fonte)
    });
    options.mapp.add(ui_layer);
    }
  }
  options.mapp.onClick(onClick);
}
function removeLayer (name){
  options.mapp.layers().filter(function(layer){
      return layer.getName() === name;
    }).forEach(function(layer){
      options.mapp.layers().remove(layer);
    });
}
// --- --- --- INICIO
start();
Map.setCenter(-50.482, -13.327,4);