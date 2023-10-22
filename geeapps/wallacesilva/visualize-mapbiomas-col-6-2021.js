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
 * Objetivo: Gerar gifs e PNG's dos dados de Agua do MapBiomas Agua, para auxiliar a equipe e jornalistas gerar imagens com os dados
 * 
 * Desenvolvimento: Instituto de Pesquisa Ambiental da Amazônia - IPAM
 *                  Vera Arruda e Wallace Silva 
 * 
 * contato: wallace.silva@ipam.org.br
 *
*/
// --- --- DICIONARIO COM PARAMETROS DE START DO CODIGO E MEMORIA CACHE DO CODIGO
var options = {
  year:'2020', // string com o ano (1985 - 2020)
  region:'Brasil',// recortar os dados -> 'Brasil','Amazônia','Caatinga','Cerrado','Mata Atlântica','Pampa','Pantanal',
  limitThumb:'Brasil', // linhas de limite na thumbnail -> 'Brasil','Biomas','Estados','Municipios','Áreas Protegidas','Bacias 1','Bacias 2','Tela'
  // -nota: parametro de estilo de ui, não é um parametro para este dicionario -> [ ] construir um dicionario para os parametros de visualização
  vis:{
        palette:['b01717'],
  },
  visName: 'MapBiomas Coleção 6', //'Anual','Frequência','Transições','MapBiomas Coleção 6'
  gifOrPng:'gif', // 'gif','png'
  clearPanel:'true', //'false','true'
  sizeThumbnail:'512px', //'64px','128px','256px','512px','1024px','2048px'
  backgroundColor:'fafafa', // valores RGB em hexadecimal
};
// --- --- DICIONARIO COM PARAMETROS DE VISUALIZAÇÃO DE DOS DADOS
var visParams = {
  mosaic:{
    //falseColor
    bands:['swir1_median','nir_median','red_median'],
    min:138,
    max:4540,
  },
  standart:{
    palette:['0000ff'],
    forceRgbOutput:true,
  },
  landcover:{
    min:0,
    max:49,
    palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
    forceRgbOutput:true,
  },
  frequencia:{
    min:0,
    max:35,
    palette:['00ffff', '008eff', '0037ff', '0000ff', '0000a3']
  },
  transicao:{
        min: -6000,
        max: 6000,
        palette: ['red', 'white', 'green']
    }
};
// --- --- FABRICAS DE DADOS
function getAnual(year){
  return ee.ImageCollection('projects/mapbiomas-workspace/TRANSVERSAIS/AGUA5-FT')
    .filterMetadata('version','equals', '11')
    .filterMetadata('cadence','equals', 'annual')
    .filterMetadata('year','equals', year)
    .mosaic()
    .rename('classification_'+year);
}
function getFrequency(year){
  return ee.Image('users/diegocosta/gt_agua/acumulated_water')
      .rename('2020').int();
}
function getTransitions (year){
  var ind_kendall = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/GTAGUA/mann_kendall_trend_test_watter_sazonal_co');//.clip(geom_grade)
  var p_value_img = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/GTAGUA/mann_kendall_trend_test_p_value_cor').select('min');
  var valor_significativo = 0.025;
  var mask_signif = p_value_img.lte(valor_significativo);
  var valor_sign_kendal = ind_kendall.updateMask(mask_signif);
  return valor_sign_kendal.rename('2020');
}
function getLandcover (year){
  var landcover = 'projects/mapbiomas-workspace/COLECAO6/mapbiomas-collection60-integration-v0-12';
  return ee.ImageCollection(landcover).mosaic()
    .select('classification_' + year);
}
// - função desatualizada - [ ] adequar ela a consulta do dicionario options
function getMosaic (year,biome){
  biome = biome || 'Cerrado';
  return ee.ImageCollection('projects/nexgenmap/MapBiomas2/LANDSAT/mosaics')
      .filterMetadata('biome', 'equals', biome)
      .filterMetadata('version', 'equals', '2')
      .filterMetadata('year', 'equals', year);
}
// --- --- FUNÇÕES DA INTERFACE DO USUARIO
function setLayout (){
  // reorganizando o root
  options.mapp = ui.root.widgets().get(0);
  options.panel = ui.Panel({
      // widgets:,
      layout:ui.Panel.Layout.Flow('horizontal',true),
      style:{
      // width:'',
      // height:'200px',
      }
    });
  options.thumbParams = ui.Panel({
      widgets:
      ui.Label({
        value:options.vis,
        style:{
          // height:'200px',
          // width:'70px',
          // position:'',
          backgroundColor:'ffffff00',
          // fontSize:'12px',
        }
      }),
      // layout:,
      style:{
        // height:'200px',
        // width:'70px',
        position:'bottom-left',
        backgroundColor:'ffffff00',
        // fontSize:'20px',
      }});
  options.panelPrincipal = ui.Panel({
      widgets:[options.thumbParams,options.panel],
      layout:ui.Panel.Layout.Flow('vertical'/*,true*/),
      style:{
      // width:'',
      // height:'200px',
      }
    });
  var splitPanel = ui.SplitPanel({
    firstPanel:options.mapp,
    secondPanel:options.panelPrincipal,
    orientation:'horizontal',
    // wipe:true, 
    style:{
      // width:'',
      // height:'30px',
    }
    });
  // ui.root.widgets().reset([options.mapp, options.panel]);
  ui.root.widgets().reset([splitPanel]);
  // ui.root.setLayout(ui.Panel.Layout.Flow('vertical',true));
  options.yearPanel = ui.Label({
      value:options.year,
      style:{
        // height:'200px',
        // width:'70px',
        // position:'',
        padding:'0px 15px 0px 15px',
        backgroundColor:'ffffffdd',
        fontSize:'42px',
        position:'bottom-right'
      }
  });
  options.regionPanel = ui.Panel({
    widgets:
    ui.Label({
      value:options.region,
      style:{
        // height:'200px',
        // width:'70px',
        // position:'',
        backgroundColor:'ffffff00',
        // fontSize:'12px',
      }
    }),
    // layout:,
    style:{
      // height:'200px',
      // width:'70px',
      position:'bottom-left',
      backgroundColor:'ffffff00',
      // fontSize:'20px',
    }});
  options.visPanel = ui.Panel({
    widgets:
    ui.Label({
      value:options.vis,
      style:{
        // height:'200px',
        // width:'70px',
        // position:'',
        backgroundColor:'ffffff00',
        // fontSize:'12px',
      }
    }),
    // layout:,
    style:{
      // height:'200px',
      // width:'70px',
      position:'bottom-left',
      backgroundColor:'ffffff00',
      // fontSize:'20px',
    }});
  options.mapp.add(ui.Label({
    value:'Last Update 25-08-2021 \ncode-source',
    style:{
      margin:'0px 0px 0px 0px',
      position:'bottom-right',
      fontSize:'10px',
      backgroundColor:'ffffffdd',
      whiteSpace:'pre',
      textAlign:'center'
    },
    // targetUrl:'https://code.earthengine.google.com/167fe9b483919c6aec6779ee97279e0f'
    // targetUrl:'https://code.earthengine.google.com/46316a0f8b04fca3e6c120e7950d621b' // atualização 10 ago 2021 - painel de thumb direita
    // targetUrl:'https://code.earthengine.google.com/a7166a6e4046329d713d9ff25b52db3c' // atualização 11 ago 2021 - usuario pode escolher image da yhumbs
    // targetUrl:'https://code.earthengine.google.com/d588d826e86bfed84c1083d8f48a58b6' // atualização 14 ago 2021 - implementações para aderir possibilidade de gif e os dados de frequencia e acumulado
    // targetUrl:'https://code.earthengine.google.com/4594a3f975abc3c05c42812b7d648dd5' // atualização 20 ago 2021 -  adptado para o dado de agua - Vera
    // targetUrl:'https://code.earthengine.google.com/fcff5c8c46fcd1737305513e9f2f1a02' // atualização 20 ago 2021 -  adptado para o dado de agua - Wallace
    // targetUrl:'https://code.earthengine.google.com/fcff5c8c46fcd1737305513e9f2f1a02' // atualização 20 ago 2021 - adicionado opção de escolher municipios, bacias 1, bacias 2 e areas protegidas no
    // targetUrl:'https://code.earthengine.google.com/35c118dc1ccf250752b8da2247635050' // atualização 20 ago 2021 - concerto de bugs e adicionada logica do caso de estudo
    targetUrl:'https://code.earthengine.google.com/5fab2108cfd7f02d50b4233055e287a0' // atualização 25 ago 2021 - app para uso e cobertura
    }));
  options.mapp.add(options.yearPanel);
  options.mapp.add(options.regionPanel);
  options.mapp.add(options.visPanel);
  options.panel.add(ui.Label('thumbnails'));
}
function setThumbs (){
  // esta função é responsavel por construir os mapas
  // e setar eles  no painel da direita (options.panel) 
  // como thumbnails 'png' de cada ano ou um 'gif' com todos os anos 
  // --- limpar painel - enquanto true limpa o painel a cada interação - enquanto false acumula as thumbnails no painel
  if (options.clearPanel === 'true'){
    options.panel.clear();
  }
  // --- preparando variaveis para consumir no loop 
  var blank = ee.Image(0).mask(0);
  // --- linhas adicionadas nos mapas da thumbnail
  var line = {
    'Brasil':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/brasil_2km'),'vazio',1.5),
    'Biomas':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas-2019'),'vazio',1.5),
    'Estados':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017'),'vazio',1.5),
    'Municipios':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/municipios-2020'),'vazio',1.5),
    'Áreas Protegidas':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas'),'vazio',1.5),
    'Bacias 1':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/bacias-nivel-1'),'vazio',1.5),
    'Bacias 2':blank.paint(ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/bacias-nivel-2'),'vazio',1.5),
    'Tela':blank.paint(options.geometry.geometry().bounds(),'vazio',1.5)
  };
  line = line[options.limitThumb];
  // --- definindo escala e limite do mapa
  var scale = options.mapp.getScale();
  var geom = options.geometry.geometry().bounds().buffer(ee.Number(scale));
  // preparando texto
  var text = require('users/gena/packages:text');
  var text_position = text.getLocation(geom,'right', '3%', '18%');
  var textVis = { // ! parametros de visualização do texto 
    fontSize: 16,
    textColor: 'ffffff',
    outlineColor: '000000',
    outlineWidth: 2.5,
    outlineOpacity: 0.6
  };
  // preparando escala e norte
  var style = require('users/gena/packages:style');
  // caixa de fundo da escala e do norte
  var scaleBar_north = {
    lat:{
      0:'97%',
      1:'97.5%',
    },
    long: {
      0:'38%',
      1:'9%',
    }
  };
  scaleBar_north = {
    'a':text.getLocation(geom,'right', scaleBar_north.lat[0], scaleBar_north.long[0]),
    'b':text.getLocation(geom,'right', scaleBar_north.lat[1], scaleBar_north.long[1]),
  };
  var geom_scaleBar_north = ee.Geometry.LineString([scaleBar_north.a,scaleBar_north.b]).bounds();
  // caixa do norte e escala
  var scale_bar = {
    lat:{
      0:'96%',
      1:'97%',
    },
    long: {
      0:'5%',
      1:'80%',
    }
  };
  scale_bar = {
    'a':text.getLocation(geom_scaleBar_north,'right', scale_bar.lat[0], scale_bar.long[0]),
    'b':text.getLocation(geom_scaleBar_north,'right', scale_bar.lat[1], scale_bar.long[1]),
  };
  scale_bar = ee.Geometry.LineString([scale_bar.a,scale_bar.b]).bounds();
  scale_bar = style.Scalebar.draw(scale_bar, {
    steps:3, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.0f', units: 'km',text:{
      fontSize:12,
      textColor: '000000',
      outlineColor: 'ffffff',
      outlineWidth: 2,
      outlineOpacity: 0.6 
    }
  });
  // preparando norte
  north_arrow = text.getLocation(geom_scaleBar_north,'right', '40%', '97%');
  var north_arrow = style.NorthArrow.draw(north_arrow, ee.Number(scale).multiply(0.3), 1, 0.1);
  // unindo elementos
  scaleBar_north = scale_bar
    .blend(north_arrow);
  // --- preparando fundo do gif
  var backgrondColor = options.backgroundColor;
  yearsList = ee.List.sequence(1985,2020,1).getInfo();
  if (options.visName !== 'Anual'){
    yearsList = [2020];
  }
  if (options.visName === 'MapBiomas Coleção 6'){
      var yearsList = ee.List.sequence(1985,2020,1).getInfo();
  }
  var colGif = yearsList.map(function(year){
      var mapa = {
        'Anual':getAnual(year).visualize(visParams.standart),
        'Frequência':getFrequency(year).visualize(visParams.frequencia),
        'Transições':getTransitions(year).visualize(visParams.transicao),
        'MapBiomas Coleção 6':getLandcover(year).visualize(visParams.landcover),
      };
      var label = text.draw(''+year, text_position, scale, textVis);
      // com plano de fundo
      var image = ee.Image(1).visualize({palette:[backgrondColor]})
        .blend(mapa[options.visName].clip(options.geometry))
        .blend(line)
        // .blend(scaleBar_north)
        .blend(scale_bar)
        .blend(north_arrow)
        .blend(label);
      // sem plano de fundo
      // var image = mapa[options.visName].clip(options.geometry)
      //   .blend(line)
      //   .blend(label);
      image = image;
      if (options.gifOrPng !== 'gif'){
        var thumbFire = ui.Thumbnail({
          image:image,
          params:{
            crs: 'EPSG:3857', 
            dimensions: 850, 
            region:geom.buffer(scale),
            format:'png'
          },
          onClick:function(){
            if(options.year === ''+year){
              return ;
            }
            options.year = ''+year;
            aktualizer(''+year);
            var obj = {
              eeObject:image,
              name: 'Thumbnail',
              visParams:{},
              shown:true,
              opacity:1
            };
            plotLayer(obj,0);
            return ;
          }, 
          style:{
            width:options.sizeThumbnail,
            height:options.sizeThumbnail,
            backgroundColor:backgrondColor,
          }
        });
      options.panel.add(thumbFire);
      }
      return image;
  });
  if (options.gifOrPng === 'gif'){
    var thumbFire = ui.Thumbnail({
        image:ee.ImageCollection(colGif),
        params:{
          crs: 'EPSG:3857', 
          dimensions: 850, 
          region: geom.buffer(scale),
          framesPerSecond: 2, // frames por segundo || [ ] - colocar como opção para o usuario
          format: 'gif' 
        },
        style:{
          width:options.sizeThumbnail,
          height:options.sizeThumbnail,
          backgroundColor:backgrondColor,
        }
        });
    options.panel.add(thumbFire);
  }
}
function setSelectRegion (){
  var regions = ['Brasil','Amazônia','Caatinga','Cerrado','Mata Atlântica','Pampa','Pantanal','Tela', 'Study Case'];
  var color = '0000ff';
  var buttoms = regions.map(function(region){
    if (region !== options.region){
      color = '000000';
    }
    return ui.Button({
      label:region,
      onClick:function(){
        if (options.region === region && region !== 'Tela'){
          return ;
        }
        options.region = region;
        setGeometry();
        setThumbs(region);
        aktualizer(options.year);
        options.regionPanel.widgets().get(0).widgets().forEach(function(buttom){
          var color_b = '0000ff';
          if (buttom.getLabel() !== options.region){
            color_b = '000000';
          }
          buttom.style().set('color',color_b);
        });
      },
      // disabled:,
      style:{
        color:color,
        margin:'0px 0px 0px 0px',
        fontSize:'10px',
        width:'125px'
      }
      });
  });
  var panelButtons = ui.Panel({
    widgets:buttoms,
    layout:ui.Panel.Layout.Flow('vertical',true),
    style:{
    }
    });
  options.regionPanel.clear();
  options.regionPanel.add(panelButtons);
}
function setSelectVis (){
  var viss_names = ['Anual','Frequência','Transições','MapBiomas Coleção 6'];
  var mapa = [3,2,1,0];  
  var color = '0000ff';
  var buttoms = mapa.map(function(int){
    var visName = viss_names[int];
      color = '000000';
    return ui.Button({
      label:visName,
      onClick:function(){
        options.visName = visName;
        setGeometry();
        switchLayer(int);
        setThumbs(options.region);
        options.visPanel.widgets().get(0).widgets().forEach(function(buttom){
          var color_b = '0000ff';
          if (visName !== options.visName){
            color_b = '000000';
          }
          buttom.style().set('color',color_b);
        });
      },
      // disabled:,
      style:{
        color:color,
        margin:'0px 0px 0px 0px',
        fontSize:'10px',
        width:'125px'
      }
      });
  });
  var panelButtons = ui.Panel({
    widgets:buttoms,
    layout:ui.Panel.Layout.Flow('vertical',true),
    style:{
    }
    });
  options.visPanel.clear();
  options.visPanel.add(panelButtons);
}
function setThumbsParams (){
  //  gif
  // clearPanel
  // sizeThumbnail
  // backgroundColor
  // gif or png's -> select
  var styleLabel = {
    margin:'14px 0px 0px 4px',
    // fontSize:'1.px'
  };
    var gifOrPng = ui.Select({
    items:['gif','png'],
    placeholder:'thumbs gif or png',
    value:options.gifOrPng,
    onChange:function(value){
      options.gifOrPng = value;
      setThumbs(options.region);
    },
    // disabled:,
    style:{}
    });
    gifOrPng = ui.Panel({
    widgets:[ui.Label('formato',styleLabel),gifOrPng],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
  // clear panel -> checkBox
    var clearPanel = ui.Select({
    items:['true','false'],
    placeholder:'clear thumbnail',
    value:options.clearPanel,
    onChange:function(value){
        options.clearPanel = value;
        // setThumbs(options.region);
    },
    // disabled:,
    style:{}
    });
    clearPanel = ui.Panel({
    widgets:[ui.Label('clear thumb',styleLabel),clearPanel],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
    //----------------------------------
    var limitThumb = ui.Select({
    items:['Brasil','Biomas','Estados','Municipios','Áreas Protegidas','Bacias 1','Bacias 2','Tela','Study Case'],
    // placeholder:'clear thumbnail',
    value:options.limitThumb,
    onChange:function(value){
        options.limitThumb = value;
        setThumbs(options.region);
    },
    // disabled:,
    style:{}
    });
    limitThumb = ui.Panel({
    widgets:[ui.Label('Limites',styleLabel),limitThumb],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
  // size thumbnail -> select
    var sizeThumbnail = ui.Select({
    items:['64px','128px','256px','512px','1024px','2048px'],
    placeholder:'thumbs gif or png',
    value:options.sizeThumbnail,
    onChange:function(value){
      options.sizeThumbnail = value;
      setThumbs(options.region);
    },
    // disabled:,
    style:{}
    });
    sizeThumbnail = ui.Panel({
    widgets:[ui.Label('size thumb',styleLabel),sizeThumbnail],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
  // backgroundColor -> textbox
  var backgroundColor = ui.Textbox({
    placeholder:'Background color Thumbnail',
    value:options.backgroundColor,
    onChange:function(value){
      options.backgroundColor = value;
      setThumbs(options.region);
    },
    // disabled:,
    style:{
      width:'65px',
      height:'20px',
    }
    });
    backgroundColor = ui.Panel({
    widgets:[ui.Label('background color (RGB)',styleLabel),backgroundColor],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
  var thumbParams = ui.Panel({
    widgets:[clearPanel,gifOrPng,sizeThumbnail,limitThumb,backgroundColor,],
    layout:ui.Panel.Layout.Flow('horizontal',true),
    style:{
    }
    });
  options.thumbParams.clear();
  options.thumbParams.add(thumbParams);
}
function setGeometry (){
  options.geometry = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas-2019')
    .filter(ee.Filter.eq('Bioma',options.region));
  if (options.region === 'Brasil'){
    options.geometry = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/brasil_2km');
  }
  if (options.region === 'Tela'){
    options.geometry = ee.FeatureCollection(ee.Feature(ee.Geometry.Rectangle(options.mapp.getBounds())));
  }
 if (options.region === 'Study Case'){
    // limite do Mato Grosso do Sul e Mato Grosso
    // opções de casos de estudo
    var study_case = {
      'mt_ms':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017')
        .filter(ee.Filter.inList('NM_ESTADO',['MATO GROSSO','MATO GROSSO DO SUL'])),
      'estado':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017')
        .filter(ee.Filter.eq('NM_ESTADO','AMAZONAS')),
      'regiao_sul':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017')
        .filter(ee.Filter.eq('NM_REGIAO','SUL')),
      'petrolina_juazeiro':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/municipios-2020')
        .filter(ee.Filter.inList('SIGLA_UF',['PE','BA'])).filter(ee.Filter.inList('NM_MUN',['Petrolina','Juazeiro'])),
      'PNCV':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas')
        .filter(ee.Filter.eq('NomeUC','PARNA da Chapada dos Veadeiros')),
      'xingu':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas')
        .filter(ee.Filter.eq('NomeUC','PARNA da Chapada dos Veadeiros')),
      'filterBounds':ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas')
        .filterBounds(filter_bounds),
    } 
  // caso de estudo selecionado
  options.geometry = study_case['mt_ms'];
  options.mapp.centerObject(options.geometry)
 }
    var line = ee.Image(1).paint(options.geometry,'000000',0.5);
    line = line.updateMask(line.neq(1));
    var obj = {
      eeObject:line,
      name: 'limite ' + options.region,
      visParams:{},
      shown:true,
      opacity:1
    };
  options.mapp.centerObject(options.geometry)
  plotLayer(obj,5,options.mapp); 
}
function switchLayer (int){
  return // função inutilizada 
  var layers = options.mapp.layers();
  var listLayers = [layers.get(0),layers.get(1),layers.get(2),layers.get(3),layers.get(4)];
  if (int !== null){
    listLayers.forEach(function(layer){
      layer.setOpacity(0);
    });
    listLayers[int].setOpacity(1);
    return ;
  }
  var layerOn;
  listLayers.forEach(function(layer){
    var opacity = layer.getOpacity();
    if (opacity === 1){
      layerOn = layers.indexOf(layer);
    }
  });
  if (layers.get(0).getOpacity() === 0 && layers.get(1).getOpacity() === 0 && layers.get(2).getOpacity() === 0 && layers.get(3).getOpacity() === 0 && layers.get(4).getOpacity() === 0){
    layers.get(0).setOpacity(1);
    position = 2;
  }
  var position = layerOn +1;
  if (position === 3){
    position = 0;
  }  
  [0,1].forEach(function(i){
    layers.get(i).setOpacity(0);
    if (i === position){
      layers.get(i).setOpacity(1);
      layers.get(i).setShown(true);
    }
  });
}
// --- --- FUNÇÕES DA MAPP
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
    visParams:  obj.visParams ||  layer.getVisParams(),
    name:       obj.name      ||  layer.getName(),
    shown:      obj.shown     ||  layer.getShown(),
    opacity:    obj.opacity   ||  layer.getOpacity(),
  });
  mapp.layers().set(position, layerObject);
}
function aktualizer (year){
  var yearNumber = ee.Number.parse(year).getInfo();
  var mapa = {
    'Anual':getAnual(yearNumber).clip(options.geometry),
    'Frequência':getFrequency(year).clip(options.geometry),
    'Transições':getTransitions(year).clip(options.geometry),
    'MapBiomas Coleção 6':getLandcover(year).clip(options.geometry),
  };
    var obj = {
      eeObject:mapa['Anual'],
      name: 'Superficie de água em ' + year,
      visParams:visParams.standart,
      // shown:true
    };
  var position = 1
  plotLayer(obj,position,options.mapp);
  obj = {
      eeObject:mapa['Frequência'],
      name: 'Frequência de 1985 à 2020',
      visParams:visParams.frequencia,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj,position,options.mapp);
  obj = {
      eeObject:mapa['Transições'],
      name: 'Transições',
      visParams:visParams.transicao,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj,position,options.mapp);
  obj = {
      eeObject:mapa['MapBiomas Coleção 6'],
      name: 'MapBiomas Coleção 6',
      visParams:visParams.landcover,
      // shown:true
    };
  position = position + 1;
  plotLayer(obj,position,options.mapp);
  options.yearPanel.setValue(''+year);
}
// --- --- FUNÇÃO DE START
function init (){
  options.firstRound = true;
  setLayout();
  setSelectRegion();
  setSelectVis();
  setThumbsParams();
  options.mapp.addLayer(ee.Image().select(),{},'',true,1);
  options.mapp.addLayer(ee.Image().select(),{},'',false,1);
  options.mapp.addLayer(ee.Image().select(),{},'',false,1);
  options.mapp.addLayer(ee.Image().select(),{},'',false,1);
  options.mapp.addLayer(ee.Image().select(),{},'',true,1);
  setGeometry();
  aktualizer(options.year);
  setGeometry();
  options.mapp.centerObject(center_object);
  options.panel.clear();
  setThumbs();
}
// --- --- INICIANDO CODIDO
init();
print(options);