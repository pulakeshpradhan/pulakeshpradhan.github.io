//=================================================== DADOS DE ENTRADA ==============================================================
var Inicio = 2000;
var Fim = 2020;
// Mapas de Cobertura e Uso da terra do Brasil em grade 2000-2010-2012-2014-2016-2018-2020 - IBGE
// Dados convertidos para raster a partir do original (em formato vetorial) disponível em: 
// https://geoftp.ibge.gov.br/informacoes_ambientais/cobertura_e_uso_da_terra/monitoramento/grade_estatistica/Brasil/Cobertura_uso_da_terra_Brasil.zip
var cobUso2000 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2000_grade_ALBERS').rename('Cod');
var cobUso2010 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2010_grade_ALBERS').rename('Cod');
var cobUso2012 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2012_grade_ALBERS').rename('Cod');
var cobUso2014 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2014_grade_ALBERS').rename('Cod');
var cobUso2016 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2016_grade_ALBERS').rename('Cod');
var cobUso2018 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2018_grade_ALBERS').rename('Cod');
var cobUso2020 = ee.Image('users/ricardogeo/IBGE/UsoCob_grade_revisada/BR_2020_grade_ALBERS').rename('Cod');
//=============================================== PARAMETROS DE VISUALIZAÇÃO ==============================================================
var CobUso_Palette = ['#D20404','#EAE529','#D27C21','#D4E885','#409059','#73A804','#BEB9F5','#E2B57C','#885B00','#8CFFFF','#00B1E1','#888888'];
var Degradacao_Palette = ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'];
var Expansao_Palette = ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'];
var Recuperacao_Palette = ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c'];
var visCobUso = {min: 1, max: 14, palette: CobUso_Palette};
var visDegradacao = {min: 1, max: 6, palette: Degradacao_Palette};
var visExpansao = {min: 1, max: 6, palette: Expansao_Palette};
var visRecuperacao = {min: 1, max: 6, palette: Recuperacao_Palette};
//======================================================== FUNÇÕES ==============================================================
// Organizar imagens como uma coleção (ee.ImageCollection)
// Criação da lista de anos na forma 'aaaa' e na forma de data 'aaaa-mm-dd'
var anos = ee.List([2000,2010,2012,2014,2016,2018,2020]);
var datas = anos.map(function(list){return ee.String(list).cat(ee.String('-01-01'))});
// Geração da ImageCollection
var cobUso_periodo_col = ee.ImageCollection([
  cobUso2000, cobUso2010, cobUso2012, cobUso2014, cobUso2016, cobUso2018, cobUso2020])
  .map(function(img){
            var index = ee.Number.parse(img.get('system:index'));
            var dateStr = datas.get(index);
            var d = ee.Date(dateStr);
            var date = d.format('yyyy-MM-dd');
            var millis = ee.Date(date).millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y,'date':date,'system:time_start':millis}); // Insere as propriedades de ano e data
  });
// Organizar imagens como Bandas de uma só imagem (ee.Image) 
var cobUso_periodo = ee.Image.cat([cobUso2000,cobUso2010,cobUso2012,cobUso2014,cobUso2016,cobUso2018,cobUso2020])
  .rename(['2000','2010','2012','2014','2016','2018','2020']);
// Geração de uma máscara para toda a abrangência dos dados
var BR_mask = cobUso2000.clamp(1,1);
// Conversão da máscara para polígono
var BR_Scene = BR_mask.reduceToVectors({
  scale: 1000,
  geometry: cobUso_periodo_col.geometry().dissolve(), 
  geometryType:'polygon', 
  eightConnected: false,
  bestEffort:true});
// Get bound box for collections
var AOI = cobUso_periodo_col.geometry().dissolve();
// Funcoes para mapeamento de mudanças Nivel II (Ajustado para a nova legenda)
// Legenda:
// 1 = Área Artificial
// 2 = Área Agrícola
// 3 = Pastagem com Manejo
// 4 = Mosaico de Ocupações em Área Florestal
// 5 = Silvicultura
// 6 = Vegetação Florestal
// 9 = Área Úmida
// 10 = Vegetação Campestre
// 11 = Mosaico de Ocupações em Área Campestre 
// 12 = Corpo d´água Continental
// 13 = Corpo d´água Costeiro
// 14 = Área Descoberta
var LegendaUso = [
  'Área Artificial',
  'Área Agrícola',
  'Pastagem com Manejo',
  'Mosaico de Ocupações em Área Florestal',
  'Silvicultura',
  'Vegetação Florestal',
  'Área Úmida',
  'Vegetação Campestre',
  'Mosaico de Ocupações em Área Campestre',
  'Corpo d´água Continental',
  'Corpo d´água Costeiro',
  'Área Descoberta'
];
// Geração das funções para mapeamento das mudanças
var getSemMudanca = function(image1,image2){return (image1.eq(1).and(image2.eq(1).or(image2.eq(14))))
  .or(image1.eq(2).and(image2.eq(2)))
  .or(image1.eq(3).and(image2.eq(3)))
  .or(image1.eq(4).and(image2.eq(4)))
  .or(image1.eq(5).and(image2.eq(5)))
  .or(image1.eq(6).and(image2.eq(6)))
  .or(image1.eq(9).and(image2.eq(9).or(image2.eq(10))))
  .or(image1.eq(10).and(image2.eq(10).or(image2.eq(9))))
  .or(image1.eq(11).and(image2.eq(11)))
  .or(image1.eq(12).and(image2.eq(12).or(image2.eq(13))))
  .or(image1.eq(13).and(image2.eq(13).or(image2.eq(12))))
  .or(image1.eq(14).and(image2.eq(14)));};
var getDesflorestamento = function(image1,image2){return (image1.eq(6))
  .and(image2.eq(1).or(image2.eq(2)).or(image2.eq(3)).or(image2.eq(4)).or(image2.eq(5)).or(image2.eq(14)))};
var getExpansaoAgro = function(image1,image2){return (image2.eq(2))
  .and(image1.eq(3).or(image1.eq(4)).or(image1.eq(5)).or(image1.eq(11)).or(image1.eq(14)))};
var getExpPastagem = function(image1,image2){return (image2.eq(3))
  .and(image1.eq(2).or(image1.eq(4)).or(image1.eq(5)).or(image1.eq(11)).or(image1.eq(14)))};
var getExpSilvicultura = function(image1,image2){return (image2.eq(5))
  .and(image1.eq(2).or(image1.eq(3)).or(image1.eq(4)).or(image1.eq(11)).or(image1.eq(14)))};
var getRecupCamp = function(image1,image2){return (image1.eq(2)).and(image2.eq(9).or(image2.eq(10)).or(image2.eq(11)))
  .or(image1.eq(11)).and(image2.eq(9).or(image2.eq(10)))
  .or(image1.eq(5)).and(image2.eq(9).or(image2.eq(10)).or(image2.eq(11)))
  .or(image1.eq(3)).and(image2.eq(9).or(image2.eq(10)).or(image2.eq(11)))};
var getRecupFlor = function(image1,image2){return (image2.eq(4))
  .and(image1.eq(2).or(image1.eq(3)).or(image1.eq(5)))
  .or(image2.eq(6)).and(image1.eq(2).or(image1.eq(3)).or(image1.eq(4)).or(image1.eq(5)))};
var getReducVegCamp = function(image1,image2){return (image1.eq(9))
  .and(image2.eq(1).or(image2.eq(2)).or(image2.eq(3)).or(image2.eq(5)).or(image2.eq(11)).or(image2.eq(14)))
  .or(image1.eq(10)).and(image2.eq(1).or(image2.eq(2)).or(image2.eq(3)).or(image2.eq(5)).or(image2.eq(11)).or(image2.eq(14)))};
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 8px'}});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}});
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')});};
//============================================== GERAR AS CLASSES DE MUDANÇAS PARA CADA PAR DE ANOS =======================================================
// Geração das classes de mudanças (Nível II) para cada período.
// Valor do pixel: 1 = 2000-2010; 2 = 2010-2012; 3 = 2012-2014; 4 = 2014-2016; 5 = 2016-2018; 6 = 2018-2020
// Para o período 2000-2016 o valor do píxel é o código da mudança Nível II
// Sem mudança 2000 a 2020
var SemMudanca = ee.Image.cat([
  getSemMudanca(cobUso2000,cobUso2010).selfMask(),
  getSemMudanca(cobUso2010,cobUso2012).selfMask().multiply(2),
  getSemMudanca(cobUso2012,cobUso2014).selfMask().multiply(3),
  getSemMudanca(cobUso2014,cobUso2016).selfMask().multiply(4),
  getSemMudanca(cobUso2016,cobUso2018).selfMask().multiply(5),
  getSemMudanca(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var SemMudanca_2000_2020 = getSemMudanca(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Desflorestamento 2000 a 2020 
var Desflorestamento = ee.Image.cat([
  getDesflorestamento(cobUso2000,cobUso2010).selfMask(),
  getDesflorestamento(cobUso2010,cobUso2012).selfMask().multiply(2),
  getDesflorestamento(cobUso2012,cobUso2014).selfMask().multiply(3),
  getDesflorestamento(cobUso2014,cobUso2016).selfMask().multiply(4),
  getDesflorestamento(cobUso2016,cobUso2018).selfMask().multiply(5),
  getDesflorestamento(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var Desflorestamento_2000_2020 = getDesflorestamento(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Expansão Agrícola 2000 a 2020 
var ExpansaoAgricola = ee.Image.cat([
  getExpansaoAgro(cobUso2000,cobUso2010).selfMask(),
  getExpansaoAgro(cobUso2010,cobUso2012).selfMask().multiply(2),
  getExpansaoAgro(cobUso2012,cobUso2014).selfMask().multiply(3),
  getExpansaoAgro(cobUso2014,cobUso2016).selfMask().multiply(4),
  getExpansaoAgro(cobUso2016,cobUso2018).selfMask().multiply(5),
  getExpansaoAgro(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var ExpansaoAgricola_2000_2020 = getExpansaoAgro(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Expansão de Pastagem com manejo 2000 a 2020
var ExpansaoPastagem = ee.Image.cat([
  getExpPastagem(cobUso2000,cobUso2010).selfMask(),
  getExpPastagem(cobUso2010,cobUso2012).selfMask().multiply(2),
  getExpPastagem(cobUso2012,cobUso2014).selfMask().multiply(3),
  getExpPastagem(cobUso2014,cobUso2016).selfMask().multiply(4),
  getExpPastagem(cobUso2016,cobUso2018).selfMask().multiply(5),
  getExpPastagem(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var ExpansaoPastagem_2000_2020 = getExpPastagem(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Expansão de Silvicultura 2000 a 2020
var ExpansaoSilvicultura = ee.Image.cat([
  getExpSilvicultura(cobUso2000,cobUso2010).selfMask(),
  getExpSilvicultura(cobUso2010,cobUso2012).selfMask().multiply(2),
  getExpSilvicultura(cobUso2012,cobUso2014).selfMask().multiply(3),
  getExpSilvicultura(cobUso2014,cobUso2016).selfMask().multiply(4),
  getExpSilvicultura(cobUso2016,cobUso2018).selfMask().multiply(5),
  getExpSilvicultura(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var ExpansaoSilvicultura_2000_2020 = getExpSilvicultura(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Recuperação campestre 2000 a 2020
var RecuperacaoCampestre = ee.Image.cat([
  getRecupCamp(cobUso2000,cobUso2010).selfMask(),
  getRecupCamp(cobUso2010,cobUso2012).selfMask().multiply(2),
  getRecupCamp(cobUso2012,cobUso2014).selfMask().multiply(3),
  getRecupCamp(cobUso2014,cobUso2016).selfMask().multiply(4),
  getRecupCamp(cobUso2016,cobUso2018).selfMask().multiply(5),
  getRecupCamp(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var RecuperacaoCampestre_2000_2020 = getRecupCamp(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Recuperação florestal 2000 a 2020 
var RecuperacaoFlorestal = ee.Image.cat([
  getRecupFlor(cobUso2000,cobUso2010).selfMask(),
  getRecupFlor(cobUso2010,cobUso2012).selfMask().multiply(2),
  getRecupFlor(cobUso2012,cobUso2014).selfMask().multiply(3),
  getRecupFlor(cobUso2014,cobUso2016).selfMask().multiply(4),
  getRecupFlor(cobUso2016,cobUso2018).selfMask().multiply(5),
  getRecupFlor(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var RecuperacaoFlorestal_2000_2020 = getRecupFlor(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// Redução de vegetação campestre 2000 a 2020 
var ReducaoVegCampestre = ee.Image.cat([
  getReducVegCamp(cobUso2000,cobUso2010).selfMask(),
  getReducVegCamp(cobUso2010,cobUso2012).selfMask().multiply(2),
  getReducVegCamp(cobUso2012,cobUso2014).selfMask().multiply(3),
  getReducVegCamp(cobUso2014,cobUso2016).selfMask().multiply(4),
  getReducVegCamp(cobUso2016,cobUso2018).selfMask().multiply(5),
  getReducVegCamp(cobUso2018,cobUso2020).selfMask().multiply(6)
  ]).reduce(ee.Reducer.max()).rename('Cod');
var ReducaoVegCampestre_2000_2020 = getReducVegCamp(cobUso2000,cobUso2020).selfMask(); // Mudança de 2000 em relação à 2020
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
mapPanel.centerObject(cobUso_periodo_col,5);
mapPanel.setOptions("SATELLITE");  
mapPanel.style().set('cursor', 'crosshair');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '550px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Monitoramento da Cobertura e Uso da Terra do Brasil ('+Inicio+' à '+Fim+')',
    style: {fontSize: '16px', fontWeight: 'bold'}
  }),
  ui.Label('                        ')
]);
panel.add(intro);
//================================================= GERAR BOTÕES =======================================================
var TitleButtonLC = ui.Label({
  value: 'Cobertura e Uso da Terra (Selecione o ano para visualizar):',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 4px 4px 4px',
    padding: '4px',
    }
});
var TitleButtonMudanca = ui.Label({
  value: 'Mudanças na cobertura e uso da terra:',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 4px 4px 4px',
    padding: '4px',
    }
});
var LC2000 = ui.Button({
  label: '2000',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2000,visCobUso,'Cobertura e Uso Brasil 2000');
    var downloadLink = cobUso2000.getDownloadURL({name:'Cobertura_Uso_Brasil_2000',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2000').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2010 = ui.Button({
  label: '2010',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2010,visCobUso,'Cobertura e Uso Brasil 2010');
    var downloadLink = cobUso2010.getDownloadURL({name:'Cobertura_Uso_Brasil_2010',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2010').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2012 = ui.Button({
  label: '2012',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2012,visCobUso,'Cobertura e Uso Brasil 2012');
    var downloadLink = cobUso2012.getDownloadURL({name:'Cobertura_Uso_Brasil_2012',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2012').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2014 = ui.Button({
  label: '2014',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2014,visCobUso,'Cobertura e Uso Brasil 2014');
    var downloadLink = cobUso2014.getDownloadURL({name:'Cobertura_Uso_Brasil_2014',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2014').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2016 = ui.Button({
  label: '2016',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2016,visCobUso,'Cobertura e Uso Brasil 2016');
    var downloadLink = cobUso2016.getDownloadURL({name:'Cobertura_Uso_Brasil_2016',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2016').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2018 = ui.Button({
  label: '2018',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2018,visCobUso,'Cobertura e Uso Brasil 2018');
    var downloadLink = cobUso2018.getDownloadURL({name:'Cobertura_Uso_Brasil_2018',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2018').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var LC2020 = ui.Button({
  label: '2020',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var LC_Map = ui.Map.Layer(cobUso2020,visCobUso,'Cobertura e Uso Brasil 2020');
    var downloadLink = cobUso2020.getDownloadURL({name:'Cobertura_Uso_Brasil_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Cobertura 2020').setUrl(downloadLink);
    mapPanel.add(LC_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'60px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_Desfl = ui.Button({
  label: 'Desflorestamento',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(Desflorestamento,visDegradacao,'Desflorestamento 2000-2020');
    var downloadLink = Desflorestamento.getDownloadURL({name:'Desflorestamento_2000_2020',scale: 1000,region:region});
    var downloadLink2 = getDesflorestamento(cobUso2016,cobUso2020).selfMask().getDownloadURL({name:'Desflorestamento_2016_2020',scale: 1000,region:region});
    var downloadText = ui.Label({
      value: 'Download - Desflorestamento (2000-2020)',style: {position:'bottom-left'}}).setUrl(downloadLink);
    var downloadText2 = ui.Label({
      value: 'Download - Desflorestamento (2016-2020)',style: {position:'bottom-left'}}).setUrl(downloadLink2);
    mapPanel.add(Mud_Map);
    //mapPanel.add(downloadText2);
    mapPanel.add(downloadText);
  },
  style: {width:'110px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_RVC = ui.Button({
  label: 'Redução de vegetação campestre',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(ReducaoVegCampestre,visDegradacao,'Reducao Vegetação Campestre 2000-2020');
    var downloadLink = ReducaoVegCampestre.getDownloadURL({name:'ReducaoVegCampestre_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Redução de vegetação campestre').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'190px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_ExpAgro = ui.Button({
  label: 'Expansão agrícola',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(ExpansaoAgricola,visExpansao,'Expansao Agrícola 2000-2020');
    var downloadLink = ExpansaoAgricola.getDownloadURL({name:'ExpansaoAgricola_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Expansao Agrícola').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'110px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_ExpPast = ui.Button({
  label: 'Expansão de Pastagem com manejo',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(ExpansaoPastagem,visExpansao,'Expansão de Pastagem com manejo 2000-2020');
    var downloadLink = ExpansaoPastagem.getDownloadURL({name:'ExpansaoPastagem_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Expansão de Pastagem com manejo').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'200px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_ExpSilv = ui.Button({
  label: 'Expansão de silvicultura',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(ExpansaoSilvicultura,visExpansao,'Expansão de silvicultura 2000-2020');
    var downloadLink = ExpansaoSilvicultura.getDownloadURL({name:'ExpansaoSilvicultura_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Expansão de silvicultura').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'140px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_RecupCamp = ui.Button({
  label: 'Recuperação Campestre',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(RecuperacaoCampestre,visRecuperacao,'Recuperação Campestre 2000-2020');
    var downloadLink = RecuperacaoCampestre.getDownloadURL({name:'RecuperacaoCampestre_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Recuperação Campestre').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'140px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var BT_RecupFlor = ui.Button({
  label: 'Recuperação Florestal',
  onClick: function() {
    mapPanel.clear();
    var region = AOI.getInfo();
    var Mud_Map = ui.Map.Layer(RecuperacaoFlorestal,visRecuperacao,'Recuperação Florestal 2000-2020');
    var downloadLink = RecuperacaoFlorestal.getDownloadURL({name:'RecuperacaoFlorestal_2000_2020',scale: 1000,region:region});
    var downloadText = ui.Label('Download - Recuperação Florestal').setUrl(downloadLink);
    mapPanel.add(Mud_Map);
    mapPanel.add(downloadText);
  },
  style: {width:'140px',textAlign:'center',fontSize :'20px',fontWeight:'bold',color:'Black',position: 'top-center'}
  });
var TituloCobUso = ui.Panel({
  widgets: [
    ui.Label({
  value: 'Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '4px 4px 4px 4px',
    padding: '4px'}})
  ],
  layout: ui.Panel.Layout.flow('vertical')
});
// Add color and and names
for (var i = 0; i < 11; i++) {
  TituloCobUso.add(makeRow(CobUso_Palette[i], LegendaUso[i]));} 
// Button to refresh the Map
var ClearButton = ui.Button({
  label: 'LIMPAR MAPA',
  onClick: function() {
    mapPanel.clear();
    mapPanel.setOptions("TOPO");
    mapPanel.centerObject(cobUso_periodo_col,5);},
  style: {width:'480px',textAlign:'center',fontSize :'40px',fontWeight:'bold',color:'Red',position: 'top-center'}
});
//================================================ GERAR LEGENDAS =======================================================
// name of the legend
var names = ['2000-2010','2010-2012','2012-2014','2014-2016','2016-2018','2018-2020'];
var TituloDegrad = ui.Panel({
  widgets: [
    ui.Label({
  value: 'Degradação (D)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 20px 4px 4px',
    padding: '4px'}})
  ],
  style: {width:'160px',textAlign:'center'},
  layout: ui.Panel.Layout.flow('vertical')
});
var TituloExp = ui.Panel({
  widgets: [
    ui.Label({
  value: 'Expansão (E)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 20px 4px 4px',
    padding: '4px'}})
  ],
  style: {width:'160px',textAlign:'center'},
  layout: ui.Panel.Layout.flow('vertical')
});
var TituloRecup = ui.Panel({
  widgets: [
    ui.Label({
  value: 'Recuperação (R)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 20px 4px 4px',
    padding: '4px'}})
  ],
  style: {width:'160px',textAlign:'center'},
  layout: ui.Panel.Layout.flow('vertical')
});
//panel.add(ui.Panel([TituloCobUso], ui.Panel.Layout.flow('horizontal')));
// Add color and and names
for (var i = 0; i < 6; i++) {
  TituloDegrad.add(makeRow(Degradacao_Palette[i], names[i]));} 
for (var i = 0; i < 6; i++) {
  TituloExp.add(makeRow(Expansao_Palette[i], names[i]));} 
for (var i = 0; i < 6; i++) {
  TituloRecup.add(makeRow(Recuperacao_Palette[i], names[i]));} 
//================================================ ADICIONAR WIDGETS AO PAINEL =======================================================
panel.add(TitleButtonLC);
panel.add(ui.Panel([LC2000, LC2010, LC2012, LC2014, LC2016, LC2018, LC2020], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([TituloCobUso], ui.Panel.Layout.flow('horizontal')));
panel.add(TitleButtonMudanca);
panel.add(ui.Panel([BT_Desfl, BT_RVC, BT_ExpAgro], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([BT_ExpPast, BT_ExpSilv], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([BT_RecupCamp, BT_RecupFlor], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([TituloDegrad, TituloExp, TituloRecup], ui.Panel.Layout.flow('horizontal')));
panel.add(ClearButton);
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel));