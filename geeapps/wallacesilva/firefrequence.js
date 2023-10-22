var app = {};
// print(require('users/mapbiomas/modules:Palettes.js').get('classification2'))
app.start = function(){
  app.ui.initiar();
};
app.asset = {
  fireCollection:ee.ImageCollection('projects/mapbiomas-workspace/TRANSVERSAIS/FOGO5-FT'),
  modisCollection:ee.ImageCollection("MODIS/006/MCD64A1"),
  protectArea:ee.Image('users/wallacesilva/raster/areaprotegida/areas-protegidas-raster'),
  coverageImage:ee.Image('projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1'),
  biomaFeature: ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas-2019'),
  biomaSelect: 'Brasil',
  yearSelect: 2017
};
app.style = {
  //vizParams plots
  ORIGINAL_CLASSES: [3, 4,  5,  9,  11, 12, 13, 15, 18, 19, 20, 21, 23, 24, 25, 27, 29, 30, 31, 32, 33],
  AGGREGATE_CLASSES:[3, 3,  3,  21, 3,  3,  3,  21, 21, 21, 21, 21, 23, 23, 23, 23, 21, 23, 33, 3,  33] ,
  VIZPARAMS_COVERAGE: {
    min:0,
    max:34,
    palette: require('users/mapbiomas/modules:Palettes.js').get('classification2'),
  },
  VIZPARAMS_SCAR_FREQUENCE_YEAR:{
    min:0,
    max:12,
    palette: ['ff0080','ee0077','cd0067','8b0046','4a0025'],
  },
  VIZPARAMS_SCAR_FREQUENCE_ACCUMULATED:{
    min:0,
    max:120,
    palette: ['ffbaba','ff7b7b','ff5252','ff0000','a70000'],
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
    fontSize: '14px',
    position:'top-center',
    textAlign:'center',
    width:'200px',
    // margin:'1x',
  },
  STYLE_SELECT:{
    width: '80px',
    height: '35px',
    padding: '7px',
    //fontFamily: 'serif',
    textAlign: 'left'
  },
  STYLE_SLIDER:{
    width: '150px',
    height: '35px',
    padding: '7px',
    //fontFamily: 'serif',
    textAlign: 'left'
  },
};
app.loadLayers = function () {
  //selectors
  var biomaString = app.asset.biomaSelect;
  var yearSelect = app.asset.yearSelect;
  var start = yearSelect+'-01-01';
  var end = yearSelect+'-12-31';
  var start2 = '2000-01-01'; 
  var fireCollection = app.asset.fireCollection;
  var coverageImage = app.asset.coverageImage;
  var biomaFeature = function(string){
    var biomeSelect;
    if (string == "Brasil"){
     biomeSelect = app.asset.biomaFeature;
      fireCollection = app.asset.fireCollection.map(function(image){
        var stringBioma = image.get('biome');
        var clipBioma = biomeSelect.filter(ee.Filter.eq('Bioma',stringBioma));
        return image.updateMask(image.gt(1)).clip(clipBioma);
      });
      Map.centerObject(biomeSelect,5);
      return biomeSelect;
    } else {
     biomeSelect = app.asset.biomaFeature.filter(ee.Filter.eq('Bioma',string));
      fireCollection = fireCollection.map(function(image){
    return image.updateMask(image.gt(1)).clip(biomeSelect);
    });
    Map.centerObject(biomeSelect);
    return biomeSelect;
    }
  };
  biomaFeature = biomaFeature(biomaString);
  var protectArea = app.asset.protectArea.clip(biomaFeature);
  var loads = {};
  //coverage
  loads.coverage = coverageImage.select('classification_' + yearSelect).clip(biomaFeature).remap(app.style.ORIGINAL_CLASSES, app.style.AGGREGATE_CLASSES);
  loads.coverageAdd = coverageImage.select('classification_' + (yearSelect+1)).clip(biomaFeature).remap(app.style.ORIGINAL_CLASSES, app.style.AGGREGATE_CLASSES);
  loads.coverageSubtract = coverageImage.select('classification_' + (yearSelect-1)).clip(biomaFeature).remap(app.style.ORIGINAL_CLASSES, app.style.AGGREGATE_CLASSES);
  //coverageLine
  loads.scarFrequencyYear = fireCollection.filter(ee.Filter.eq('year', yearSelect)).sum();
  loads.scarFrequencyAccumulated = fireCollection.filter(ee.Filter.lt('year', yearSelect)).sum();
  // loads.modisCollection = app.asset.modisCollection.select('BurnDate').filterDate(yearSelect+'01-01',yearSelect+'12-31');
  //Lines
  loads.biomaLine = ee.Image(1).paint(biomaFeature,null,0.5);
  loads.protectArea = protectArea;
  // print(loads);
  //plots baseados no objeto loads
  Map.addLayer(loads.coverageAdd,app.style.VIZPARAMS_COVERAGE,'coverage '+(yearSelect+1), 0);
  Map.addLayer(loads.coverage,app.style.VIZPARAMS_COVERAGE,'coverage '+ yearSelect, 0);
  Map.addLayer(loads.coverageSubtract,app.style.VIZPARAMS_COVERAGE,'coverage '+ (yearSelect-1), 0);
  Map.addLayer(loads.scarFrequencyAccumulated,app.style.VIZPARAMS_SCAR_FREQUENCE_ACCUMULATED,'frequencyAccumulated',0);
  Map.addLayer(loads.scarFrequencyYear,app.style.VIZPARAMS_SCAR_FREQUENCE_YEAR,'frequencyYear',1);
  Map.addLayer(loads.biomaLine.updateMask(loads.biomaLine.lt(1)),{},'biomaLine');
  Map.addLayer(loads.protectArea,{palette:['00ffff']},'protectArea',1,0.2);
};
app.loadPanel = function(){
  var widgets = [];//painel principal
  var control0 = [];//controle espaço e tempo
  var control1 = [];//controle landsat view
  var control2 = [];//controle areas publicas protegidas
  var control3 = [];//controle frequencia ano
  var control4 = [];//control frequencia acumulada
  var control5 = [];//legenda cobertura
  var control6 = [];
  var control7 = [];
  var control8 = [];
  widgets[0] = ui.Label('Painel de Controle', app.style.STYLE_TITLE);
  control0[0] = ui.Select({
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
    app.asset.biomaSelect = value
    Map.clear()
    app.loadLayers()
    app.loadPanel()
  },
  // disabled:,
  style:app.style.STYLE_SELECT
  })
  control0[1] = ui.Slider({
    min:2000,
    max:2019,
    value:app.asset.yearSelect,
    step:1,
    onChange:function(value){
      app.asset.yearSelect = value
      Map.clear()
      app.loadLayers()
      app.loadPanel()
    },
    // direction:,
    // disabled:,
    style:app.style.STYLE_SLIDER
  })
  widgets[1] = ui.Panel(control0,ui.Panel.Layout.flow('horizontal'));
  // control1[0] = ui.Select({
  // items: [
  //   { label: "Falsa cor", value:0 },
  //   { label: "Cor natural", value:1 },
  //   { label: "Atmosférica", value:2 },
  // ],
  // placeholder:'RGB/Landsat',
  // // value:,
  // onChange:function(value){
  //   var bands = [["B6","B5","B4"],["B4","B3","B2"],["B7","B6","B5"]]
  //   app.asset.bandsSelect = bands[value]
  //   Map.clear()
  //   app.loadLayers()
  //   app.loadPanel()
  // },
  // // disabled:,
  // style:app.style.STYLE_SELECT
  // })
  // control1[1] = ui.Slider({
  //   min:2000,
  //   max:2019,
  //   value:2017,
  //   step:1,
  //   onChange:function(value){
  //     app.asset.biomaSelect = value
  //     Map.clear()
  //     app.loadLayers()
  //     app.loadPanel()
  //   },
  //   // direction:,
  //   // disabled:,
  //   style:app.style.STYLE_SLIDER
  // })
  // widgets[2] = ui.Panel(control1,ui.Panel.Layout.flow('horizontal'));
  control2[0] = ui.Label('◈',{color:'00ffff',fontSize: '16px',margin:'4px'});
  control2[1] = ui.Checkbox({
   label:"Áreas Publicas Protegidas",
   value:true,
   onChange:function(value){
    Map.layers().get(6).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[2] = ui.Panel(control2,ui.Panel.Layout.flow('horizontal'));
  control3[0] = ui.Label('─',{color:'000000',fontSize: '16px',margin:'4px'});
  control3[1] = ui.Checkbox({
   label:"Bioma ->" + app.asset.biomeSelect,
   value:true,
   onChange:function(value){
    Map.layers().get(5).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[3] = ui.Panel(control3,ui.Panel.Layout.flow('horizontal'));
  control4[0] = ui.Label('✿',{color:'000000',fontSize: '16px',margin:'4px'});
  control4[1] = ui.Checkbox({
   label:"Freq. acumulada -> 2000/" + app.asset.yearSelect,
   value:false,
   onChange:function(value){
    Map.layers().get(3).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[4] = ui.Panel(control4,ui.Panel.Layout.flow('horizontal'));
  control5[0] = ui.Label('✿',{color:'000000',fontSize: '16px',margin:'4px'});
  control5[1] = ui.Checkbox({
   label:"Freq. anual ->" + app.asset.yearSelect,
   value:true,
   onChange:function(value){
    Map.layers().get(4).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[5] = ui.Panel(control5,ui.Panel.Layout.flow('horizontal'));
  control6[0] = ui.Label('✿',{color:'000000',fontSize: '16px',margin:'4px'});
  control6[1] = ui.Checkbox({
   label:"Cobertura no ano " + (app.asset.yearSelect - 1),
   value:false,
   onChange:function(value){
    Map.layers().get(2).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[6] = ui.Panel(control6,ui.Panel.Layout.flow('horizontal'));
  control7[0] = ui.Label('✿',{color:'000000',fontSize: '16px',margin:'4px'});
  control7[1] = ui.Checkbox({
   label:"Cobertura no ano " + app.asset.yearSelect,
   value:false,
   onChange:function(value){
    Map.layers().get(1).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[7] = ui.Panel(control7,ui.Panel.Layout.flow('horizontal'));
  control8[0] = ui.Label('✿',{color:'000000',fontSize: '16px',margin:'4px'});
  control8[1] = ui.Checkbox({
   label:"Cobertura no ano " + (app.asset.yearSelect + 1),
   value:false,
   onChange:function(value){
    Map.layers().get(0).setShown(value);
   },
  // disabled:,
  style:{fontSize: '12px'}
 })
  widgets[8] = ui.Panel(control8,ui.Panel.Layout.flow('horizontal'));
  var panelPrincipal = ui.Panel(widgets, ui.Panel.Layout.flow('vertical'), app.style.STYLE_PANEL_PRINCIPAL);
  Map.add(panelPrincipal);
}
app.ui = {
  initiar: function(){
    app.loadLayers();
    app.loadPanel();
  }
}
print(app)
// Map.setCenter(-53,-10,8);
app.start()