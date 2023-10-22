var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "projects/mapbiomas-workspace/TRANSVERSAIS/FOGO5-FT"
    }) || ee.ImageCollection("projects/mapbiomas-workspace/TRANSVERSAIS/FOGO5-FT"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil"
    }) || ee.FeatureCollection("projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil");
var app = {};
app.dados = {
  bioma:'Caatinga',
   ano:2019,
   maiorQue:1,
  regraMatematica:'maiorQue',
   palette:  ['F8D71F','DAA118','BD6C12','9F360B','810004','4D0709','190D0D'],
}
app.iniciar = function(){
    function makeColorBarParams(palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x10',
        format: 'png',
        min: 0,
        max: 1,
        palette: palette,
      };
    }
      // Create the color bar for the legend.
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: makeColorBarParams(app.dados.palette),
      style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '12px'},
    });
    // Create a panel with three numbers for the legend.
    var legendLabels = ui.Panel({
      widgets: [
        ui.Label(app.dados.maiorQue, {
          margin: '4px 8px',
          backgroundColor:'ffffff00' 
        }),
        ui.Label((app.dados.maiorQue + 13) / 2,{
          margin: '4px 8px',
          textAlign: 'center',
          stretch: 'horizontal',
          backgroundColor:'ffffff00' 
        }),
        ui.Label(13, {
          margin: '4px 8px',
          backgroundColor:'ffffff00' 
        })
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
      style:{backgroundColor:'ffffff50'} 
    });
    var titleColorBar = ui.Label({
      value: 'gradiente',
      style: {
        fontWeight: 'bold',
        backgroundColor:'ffffff00' 
      }
    });
    var colorBarPanel = ui.Panel({
      widgets: [titleColorBar, colorBar],
      style:{
        position:'bottom-right',
        height:'100px',
        width:'300px',
        backgroundColor:'ffffff00' 
      }
    });
  var sliderAno = ui.Slider({
    min:2000,
    max:2019, 
    value:app.dados.ano,
    step:1,
    onChange:function(value){
      app.dados.ano = value
      Map.clear();
      iniciar();
    },
    direction:'vertical',
    // disabled:,
    style:{
      width:'45px',
      height: '150px',
      position:'top-right',
      // margin: '7px 0px 0px 0px',
      padding: '7px',
      backgroundColor:'ffffff50'
    }
  })
  var sliderMascara = ui.Slider({
    min:0,
    max:13, 
    value:app.dados.maiorQue,
    step:1,
    onChange:function(value){
      app.dados.maiorQue = value;
      Map.clear();
      iniciar();
    },
    // direction:,
    // disabled:,
    style:{
      width:'200px',
      height: '45px',
      position:'top-right',
      // margin: '7px 0px 0px 0px',
      padding: '7px',
      backgroundColor:'ffffff00'
    }
  })
  var selectBioma = ui.Select({
      items:[ 
        {label:'Amazônia',value:'Amazônia'},
        {label:'Caatinga',value:'Caatinga'},
        {label:'Cerrado',value:'Cerrado'},
        {label:'Mata Atlântica',value:'Mata Atlântica'},
        {label:'Pampa',value:'Pampa'},
        {label:'Pantanal',value:'Pantanal'}],
      placeholder:'Escolha um Bioma',
    value:app.dados.bioma,
    onChange:function(value){
      app.dados.bioma = value;
      Map.clear();
      iniciar();
      // print(Map.layers().get(0).get('eeObject'));
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    },
    // disabled,
    // style
  });  
  var selectMatematico = ui.Select({
      items:[ 
        {label:'Maior que',value:'maiorQue'},
        {label:'Menor que',value:'menorQue'},
        {label:'Igual a',value:'igual'},],
      placeholder:'Escolha uma regra',
    value:app.dados.regraMatematica,
    onChange:function(value){
      app.dados.regraMatematica = value;
      Map.clear();
      iniciar();
      // print(Map.layers().get(0).get('eeObject'));
    },
    // disabled,
    // style
  });  
  var panelMatematico = ui.Panel([selectBioma,sliderMascara,selectMatematico],ui.Panel.Layout.Flow('horizontal'),{backgroundColor:'ffffff50'});
  function iniciar (){
    var layer = imageCollection.filter(ee.Filter.eq('biome',app.dados.bioma))
      .filter(ee.Filter.eq('year',app.dados.ano)).first();
      if (app.dados.regraMatematica === "maiorQue"){
        layer = layer.updateMask(layer.gte(app.dados.maiorQue))
      }
      if (app.dados.regraMatematica === "menorQue"){
        layer = layer.updateMask(layer.lte(app.dados.maiorQue)).updateMask(layer.gte(1))
      }
      if (app.dados.regraMatematica === "igual"){
        layer = layer.updateMask(layer.eq(app.dados.maiorQue))
      }
    var lineBioma = ee.Image(1).paint(table,'000000',0.5)
    lineBioma = lineBioma.updateMask(lineBioma.lt(1))    
    Map.addLayer(layer, {palette:app.dados.palette, min:app.dados.maiorQue,max:13}, app.dados.bioma + app.dados.ano)
    Map.addLayer(lineBioma,{},'Limite do ' + app.dados.bioma)
    Map.add(colorBarPanel)
    Map.add(panelMatematico)
    Map.add(sliderAno)
  }
  iniciar();
};
app.iniciar();
Map.centerObject(Map.layers().get(0).get('eeObject'))