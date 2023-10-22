//Script frequência queimada MapBiomas
var app = {};
app.asset = {
  collectionLandsat:require('users/wallacesilva/GEETools_Wsilva:collectionAllLandsat').collectionAllLandsat(),
  colectionBurnData: ee.ImageCollection("MODIS/006/MCD64A1").select('BurnDate'),
  fireCollection: ee.ImageCollection('projects/mapbiomas-workspace/TRANSVERSAIS/FOGO5-FT'),
  protectArea:ee.Image('users/wallacesilva/raster/areaprotegida/areas-protegidas-raster'),
  biomaFeature: ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas-2019'),
};
app.ponteiro = {
  stringBioma: 'Brasil',
  intYear: 2019,
  originalClasses: [3, 4,  5,  9,  11, 12, 13, 15, 18, 19, 20, 21, 23, 24, 25, 27, 29, 30, 31, 32, 33],
  aggregateClasses:[3, 3,  3,  21, 3,  3,  3,  21, 21, 21, 21, 21, 23, 23, 23, 23, 21, 23, 33, 3,  33] ,
  bandSelect:["B6","B5","B4"],
};
app.funcoes = {
  maskcenasr: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/GEETools').maskcenasr(),
  areaM2: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/GEETools').areaM2(),
  makeColorBarParams: function (palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x10',
        format: 'png',
        min: 0,
        max: 1,
        palette: palette,
      };
    }
};
app.STYLE= {
  // VIZPARMS_SCAR_FREQUENCE_YEAR:{
  //   min:0,
  //   max:16,
  //   palette: ['ff0080','ee0077','cd0067','8b0046','4a0025'],
  // },
  VIZPARMS_SCAR_FREQUENCE_ACCUMULATED:{
    min:0,
    max:20,
    palette: ['F8D71F','DAA118','BD6C12','9F360B','810004','4D0709','190D0D'],
  },
  VIZPARMS_MODIS:{
   palette:'000000'
  },
  VIZPARMS_MAPBIOMAS:{
    palette:'ff0000'
  },
  STYLE_PANEL_PRINCIPAL: {
    // height:'350px',
    // width:'270px',
    position:'bottom-left',
    stretch:'horizontal',
    textAlign:'center',
  },
  STYLE_TITLE: {
    fontWeight: 'bold',
    fontSize: '22px',
    position:'top-center',
    textAlign:'center',
    width:'200px',
    // margin:'1x',
  },
  STYLE_SELECT:{
    width: '100px',
    height: '35px',
    padding: '7px',
    //fontFamily: 'serif',
    textAlign: 'left'
  },
  STYLE_SLIDER:{
    width: '250px',
    height: '35px',
    padding: '7px',
    //fontFamily: 'serif',
    textAlign: 'left'
  },
};
app.loadLayers = function(){
  var stringBioma = app.ponteiro.stringBioma;
  var yearSelect = app.ponteiro.intYear;
  function biomaSelect (string){
    var featureBioma;
    if (string == "Brasil"){
      featureBioma = app.asset.biomaFeature;
      return featureBioma;
    } else {
      featureBioma = app.asset.biomaFeature.filter(ee.Filter.eq('Bioma',string));
    return featureBioma;
    }
  }
  var biomaFeature = biomaSelect(stringBioma);
  var collectionLandsat = app.asset.collectionLandsat
  var fireCollection = app.asset.fireCollection.map(function(image){
        var stringBioma = image.get('biome');
        var clipBioma = biomaFeature.filter(ee.Filter.eq('Bioma',stringBioma));
      return image.updateMask(image.gt(1)).clip(clipBioma).set('year',image.get('year'));
      });
  var  scarFrequencyAccumulatedFogo = fireCollection.map(function(image){
    return image.where(ee.Image(1), ee.Image(1))
  })
  var loads = {};
  //coverageLine
  loads.mapbiomas = fireCollection.filterDate(''+yearSelect+'-01-01',''+yearSelect+'-12-31').sum();
  loads.modis = app.asset.colectionBurnData.select('BurnDate').filterDate(''+yearSelect+'-01-01',+yearSelect+'-12-31').reduce(ee.Reducer.sum()).clip(biomaFeature);
  loads.scarFrequencyAccumulatedFogo = scarFrequencyAccumulatedFogo.filterDate('2000-01-01',''+yearSelect+'-12-31').reduce(ee.Reducer.sum());
  loads.bioma_abr_1 = collectionLandsat.filterDate(''+yearSelect+'-04-01', ''+yearSelect+'-04-15').map(app.funcoes.maskcenasr);
  loads.bioma_abr_2 = collectionLandsat.filterDate(''+yearSelect+'-04-16', ''+yearSelect+'-04-30').map(app.funcoes.maskcenasr);
  loads.bioma_mai_1 = collectionLandsat.filterDate(''+yearSelect+'-05-01', ''+yearSelect+'-05-15').map(app.funcoes.maskcenasr);
  loads.bioma_mai_2 = collectionLandsat.filterDate(''+yearSelect+'-05-16', ''+yearSelect+'-05-31').map(app.funcoes.maskcenasr);
  loads.bioma_jun_1 = collectionLandsat.filterDate(''+yearSelect+'-06-01', ''+yearSelect+'-06-15').map(app.funcoes.maskcenasr);
  loads.bioma_jun_2 = collectionLandsat.filterDate(''+yearSelect+'-06-16', ''+yearSelect+'-06-30').map(app.funcoes.maskcenasr);
  loads.bioma_jul_1 = collectionLandsat.filterDate(''+yearSelect+'-07-01', ''+yearSelect+'-07-15').map(app.funcoes.maskcenasr);
  loads.bioma_jul_2 = collectionLandsat.filterDate(''+yearSelect+'-07-16', ''+yearSelect+'-07-31').map(app.funcoes.maskcenasr);
  loads.bioma_ago_1 = collectionLandsat.filterDate(''+yearSelect+'-08-01', ''+yearSelect+'-08-15').map(app.funcoes.maskcenasr);
  loads.bioma_ago_2 = collectionLandsat.filterDate(''+yearSelect+'-08-16', ''+yearSelect+'-08-30').map(app.funcoes.maskcenasr);
  loads.bioma_set_1 = collectionLandsat.filterDate(''+yearSelect+'-09-01', ''+yearSelect+'-09-15').map(app.funcoes.maskcenasr);
  loads.bioma_set_2 = collectionLandsat.filterDate(''+yearSelect+'-09-16', ''+yearSelect+'-09-30').map(app.funcoes.maskcenasr);
  loads.bioma_out_1 = collectionLandsat.filterDate(''+yearSelect+'-10-01', ''+yearSelect+'-10-15').map(app.funcoes.maskcenasr);
  loads.bioma_out_2 = collectionLandsat.filterDate(''+yearSelect+'-10-16', ''+yearSelect+'-10-31').map(app.funcoes.maskcenasr);
  loads.bioma_nov_1 = collectionLandsat.filterDate(''+yearSelect+'-11-01', ''+yearSelect+'-11-15').map(app.funcoes.maskcenasr);
  loads.bioma_nov_2 = collectionLandsat.filterDate(''+yearSelect+'-11-16', ''+yearSelect+'-11-30').map(app.funcoes.maskcenasr);
  loads.bioma_dez_1 = collectionLandsat.filterDate(''+yearSelect+'-12-01', ''+yearSelect+'-12-15').map(app.funcoes.maskcenasr);
  loads.bioma_dez_2 = collectionLandsat.filterDate(''+yearSelect+'-12-16', ''+yearSelect+'-12-31').map(app.funcoes.maskcenasr);
  //Lines
  loads.biomaLine = ee.Image(1).paint(biomaFeature,null,0.5);
  loads.protectArea = app.asset.protectArea.clip(biomaFeature);
  // print(loads);
  Map.addLayer(loads.bioma_dez_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'dez_2',0)
  Map.addLayer(loads.bioma_dez_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'dez_1',0)
  Map.addLayer(loads.bioma_nov_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'nov_1',0)
  Map.addLayer(loads.bioma_nov_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'nov_2',0)
  Map.addLayer(loads.bioma_out_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'out_2',0)
  Map.addLayer(loads.bioma_out_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'out_1',0)
  Map.addLayer(loads.bioma_set_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'set_2',0)
  Map.addLayer(loads.bioma_set_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'set_1',0)
  Map.addLayer(loads.bioma_ago_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'ago_2',0)
  Map.addLayer(loads.bioma_ago_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'ago_1',0)
  Map.addLayer(loads.bioma_jul_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'jul_2',0)
  Map.addLayer(loads.bioma_jul_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'jul_1',0)
  Map.addLayer(loads.bioma_jun_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'jun_2',0)
  Map.addLayer(loads.bioma_jun_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'jun_1',0)
  Map.addLayer(loads.bioma_mai_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'mai_2',0)
  Map.addLayer(loads.bioma_mai_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'mai_1',0)
  Map.addLayer(loads.bioma_abr_2,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'abr_2',0)
  Map.addLayer(loads.bioma_abr_1,{ min:0, max:0.6, bands: app.ponteiro.bandSelect},'abr_1',0)
  Map.addLayer(loads.scarFrequencyAccumulatedFogo,app.STYLE.VIZPARMS_SCAR_FREQUENCE_ACCUMULATED,'Freq. Acumulada-Mapbiomas Fogo',1);
  Map.addLayer(loads.modis,app.STYLE.VIZPARMS_MODIS,'MODIS BurnDate - '+yearSelect,0);
  Map.addLayer(loads.mapbiomas,app.STYLE.VIZPARMS_MAPBIOMAS,'Mapbioma Fogo - '+yearSelect,0);
  Map.addLayer(loads.biomaLine.updateMask(loads.biomaLine.lt(1)),{},'biomaLine',1);
  Map.addLayer(loads.protectArea,{palette:['00ffff']},'protectArea',1,0.2);
};
app.loadPanel = function(){
  // conjuno de paineis
  var widgets = [], control0 = [],control1 = [],control2 = [], control3 = [],control4 = [],control5 = [],control6 = [];
    widgets[0] = ui.Label('Painel de Controle', app.STYLE.STYLE_TITLE);
     //seletor bioma e ano
      control0[0] = ui.Label('')
      control0[1] = ui.Slider({
      min:2000,
      max:2019,
      value:app.ponteiro.intYear,
      step:1,
      onChange:function(value){
        app.ponteiro.intYear = value
        Map.clear()
        app.loadLayers()
        app.loadPanel()
      },
      // direction:,
      // disabled:,
      style:app.STYLE.STYLE_SLIDER
    })
    widgets[1] = ui.Panel(control0,ui.Panel.Layout.flow('horizontal'));
      //seletor composição
      control1[0] = ui.Select({
    items: [
      { label: "Falsa cor", value:0 },
      { label: "Cor natural", value:1 },
      { label: "Atmosférica", value:2 },
    ],
    placeholder:'RGB-Landsat',
    // value:,
    onChange:function(value){
      var bands = [['B6', 'B5', 'B4'],['B4', 'B3', 'B2'],['B7', 'B6', 'B5']]
      app.ponteiro.bandSelect = bands[value]
      print(app.ponteiro.bandSelect)
      Map.clear()
      app.loadLayers()
      app.loadPanel()
    },
    // disabled:,
    style:app.STYLE.STYLE_SELECT
    })
      control1[1] = ui.Select({
    items: [
      { label: "Amazônia", value:'Amazônia' },
      { label: "Caatinga", value:'Caatinga' },
      { label: "Cerrado", value:'Cerrado' },
      { label: "Mata Atlântica", value:'Mata Atlântica'},
      { label: "Pampa", value:'Pampa' },                    
      { label: "Pantanal", value:'Pantanal' },
      { label: "Todos os Biomas", value:'Brasil' }
    ],
    placeholder:'Bioma',
    // value:,
    onChange:function(value){
      app.ponteiro.stringBioma = value
      Map.clear()
      function biomaSelect (string){
        var featureBioma;
        if (string == "Brasil"){
         featureBioma = app.asset.biomaFeature;
          return featureBioma;
        } else {
         featureBioma = app.asset.biomaFeature.filter(ee.Filter.eq('Bioma',string));
        return featureBioma;
        }
      }
      Map.centerObject(biomaSelect(value))
      app.loadLayers()
      app.loadPanel()
    },
    // disabled:,
    style:app.STYLE.STYLE_SELECT
    })
    widgets[2] = ui.Panel(control1,ui.Panel.Layout.flow('horizontal'));
      //linha do bioma
      control2[0] = ui.Label('─',{color:'000000',fontSize: '16px',margin:'4px'});
      control2[1] = ui.Checkbox({
    label: app.ponteiro.stringBioma,
    value:true,
    onChange:function(value){
      Map.layers().get(21).setShown(value);
    },
    // disabled:,
    style:{fontSize: '12px'}
  })
    widgets[3] = ui.Panel(control2,ui.Panel.Layout.flow('horizontal'));
      //areas de proteção
      control3[0] = ui.Label('◈',{color:'00ffff',fontSize: '16px',margin:'4px'});
      control3[1] = ui.Checkbox({
    label:"Áreas Protegidas",
    value:true,
    onChange:function(value){
      Map.layers().get(22).setShown(value);
    },
    // disabled:,
    style:{fontSize: '12px'}
  })
    widgets[4] = ui.Panel(control3,ui.Panel.Layout.flow('horizontal'));
      control4[0] = ui.Label('◈',{color:app.STYLE.VIZPARMS_SCAR_FREQUENCE_ACCUMULATED.palette[3],fontSize: '16px',margin:'4px'});
      control4[1] = ui.Checkbox({
     label:"MapBiomas cicatrizes de queimadas",
     value:false,
     onChange:function(value){
      Map.layers().get(20).setShown(value);
     },
    // disabled:,
    style:{fontSize: '12px'}
   })
    widgets[5] = ui.Panel(control4,ui.Panel.Layout.flow('horizontal'));
      control5[0] = ui.Label('◈',{color:app.STYLE.VIZPARMS_MAPBIOMAS.palette,fontSize: '16px',margin:'4px'});
      control5[1] = ui.Checkbox({
     label:"MODIS Burned Area",
     value:false,
     onChange:function(value){
      Map.layers().get(19).setShown(value);
     },
    // disabled:,
    style:{fontSize: '12px'}
   })
    widgets[6] = ui.Panel(control5,ui.Panel.Layout.flow('horizontal'));
  //frequencia acumulada
      control6[0] =  ui.Label('◈',{color:app.STYLE.VIZPARMS_MODIS.palette,fontSize: '16px',margin:'4px'});
      control6[1] = ui.Checkbox({
       label:'Frequencia Acumulada de 2000 a '+ app.ponteiro.intYear,
       value:true,
       onChange:function(value){
        Map.layers().get(18).setShown(value);
       },
      // disabled:,
      style:{fontSize: '12px'}
     })
      var colorBar = ui.Thumbnail({
          image: ee.Image.pixelLonLat().select(0),
          params: app.funcoes.makeColorBarParams(app.STYLE.VIZPARMS_SCAR_FREQUENCE_ACCUMULATED.palette),
          style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
        });
      var legendLabels = ui.Panel({
          widgets: [
            ui.Label(0, {margin: '4px 8px'}),
            ui.Label(((20)/2),{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
            ui.Label((20), {margin: '4px 8px'})
          ],
          layout: ui.Panel.Layout.flow('horizontal')
        });
      var colorBarPanel = ui.Panel([ui.Panel(control6,ui.Panel.Layout.flow('horizontal')), colorBar, legendLabels]);
    widgets[7] = ui.Panel(colorBarPanel);
  var panelPrincipal = ui.Panel(widgets, ui.Panel.Layout.flow('vertical'), app.STYLE.STYLE_PANEL_PRINCIPAL);
  Map.add(panelPrincipal); 
}
app.iniciar = function(){
  print('Ínicio da rotina');
  app.loadLayers();
  app.loadPanel();
};
app.iniciar();