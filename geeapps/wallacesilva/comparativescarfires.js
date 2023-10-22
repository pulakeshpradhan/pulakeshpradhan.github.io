var app = {};
app.assets = {
  //constantes
  beta1: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/00 ASSETS').collectionMapbiomas(),
  beta2: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/00 ASSETS V2').collectionMapbiomas(),
  colectionBurnData: ee.ImageCollection("MODIS/006/MCD64A1").select('BurnDate'),
  collectionLandsat:ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'),
  gridLandsat: ee.FeatureCollection('users/geomapeamentoipam/AUXILIAR/grid_landsat'),
  collectionBiomas:ee.FeatureCollection('users/geomapeamentoipam/AUXILIAR/biomas_IBGE_250mil'),
  //Funçoes auxiliares
  maskcenasr: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/GEETools').maskcenasr(),
  areaM2: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:Resultado_Biomas/GEETools').areaM2(),
  //palette
  palette: ['#00876c','#379469','#58a066','#78ab63',
  '#98b561','#b8bf62','#dac767','#deb256','#e09d4b',
  '#e18745','#e06f45','#dc574a','#d43d51'],
  //referencia: beta1,beta2,convergencia,burndate,lineBiome,
  palette2:   ['c61503', 'ff8c00','00ffff','606060','000000'],
  //Ponteiros
  year:2018,
  biomaSelect:'Pampa'
};
app.ui = {
  iniciar:function(){
    app.ui.loadLayer()
  },
  loadLayer:function(){
    var ano = app.assets.year
    var biomaSelect = app.assets.biomaSelect;
    var gridLandsat = app.assets.gridLandsat;
    var maskcenasr = app.assets.maskcenasr
    var areaM2 = app.assets.areaM2
    var palette2 = app.assets.palette2
    var featureBioma = app.assets.collectionBiomas.filter(ee.Filter.eq('Bioma',biomaSelect));
    var featureGrid = app.assets.gridLandsat.filterBounds(featureBioma);
    var collection = app.assets.collectionLandsat.filterBounds(featureBioma);
    var beta1 = app.assets.beta1.filter(ee.Filter.eq('year',ano))
      .filter(ee.Filter.eq('bioma',biomaSelect)).select('yearBand')
      .first();
    var beta2 = app.assets.beta2.filter(ee.Filter.eq('year',ano))
      .filter(ee.Filter.eq('bioma',biomaSelect)).select('yearBand')
      .first();
    var burnDate = app.assets.colectionBurnData.filterDate(''+ano+'-01-01', ''+ano+'-12-31')
      .sum()
      .clip(featureBioma);
    var densitGrid = featureGrid.map(function(feature){
    // var areaQueimadaBurnDate = areaM2(burnDate,feature.geometry(),30).divide(1e6);
    var areaQueimadaBeta1 = areaM2(beta1,feature.geometry(),30).divide(1e6);
    var areaQueimadaBeta2 = areaM2(beta2,feature.geometry(),30).divide(1e6);
    var convergenciaBeta1Beta2 = beta1.updateMask(beta2);
    var areaConvergenciaBeta1Beta2 = areaM2(convergenciaBeta1Beta2,feature.geometry(),30).divide(1e6);
    // var convergenciaBeta1BurnDate = beta1.updateMask(burnDate);
    // var areaConvergenciaBeta1BurnDate = areaM2(convergenciaBeta1BurnDate,feature.geometry(),30).divide(1e6);
    // var convergenciaBeta2BurnDate = beta2.updateMask(burnDate);
    // var areaConvergenciaBeta2BurnDate = areaM2(convergenciaBeta2BurnDate,feature.geometry(),30).divide(1e6);
    return feature.set({
      // 'areaQueimadaBurnDate':areaQueimadaBurnDate,
      'areaQueimadaBeta1':areaQueimadaBeta1,
      'areaQueimadaBeta2':areaQueimadaBeta2,
      'areaConvergenciaBeta1Beta2':areaConvergenciaBeta1Beta2,
      // 'areaConvergenciaBeta1BurnDate':areaConvergenciaBeta1BurnDate,
      // 'areaConvergenciaBeta2BurnDate':areaConvergenciaBeta2BurnDate,
    });
  });
    var max =  densitGrid.aggregate_max('areaConvergenciaBeta1Beta2')
    print(max)
    max =  densitGrid.aggregate_array('areaConvergenciaBeta1Beta2')
    print(max)
    var image = ee.Image(0).toDouble().paint(densitGrid, 'areaConvergenciaBeta1Beta2')
    var vizParams = {
      max: max.max , 
      min: 0, 
      palette: app.assets.palette
    };
    Map.addLayer(image.updateMask(image.gt(0)),vizParams,'areaConvergenciaBeta1Beta2',1);
    // Map.addLayer(densitGrid)
    print(areaM2(beta2,featureGrid.geometry(),30));
    print(densitGrid);
    var bioma_abr_1 = collection.filterDate(''+ano+'-04-01', ''+ano+'-04-15').map(maskcenasr);
    var bioma_abr_2 = collection.filterDate(''+ano+'-04-16', ''+ano+'-04-30').map(maskcenasr);
    var bioma_mai_1 = collection.filterDate(''+ano+'-05-01', ''+ano+'-05-15').map(maskcenasr);
    var bioma_mai_2 = collection.filterDate(''+ano+'-05-16', ''+ano+'-05-31').map(maskcenasr);
    var bioma_jun_1 = collection.filterDate(''+ano+'-06-01', ''+ano+'-06-15').map(maskcenasr);
    var bioma_jun_2 = collection.filterDate(''+ano+'-06-16', ''+ano+'-06-30').map(maskcenasr);
    var bioma_jul_1 = collection.filterDate(''+ano+'-07-01', ''+ano+'-07-15').map(maskcenasr);
    var bioma_jul_2 = collection.filterDate(''+ano+'-07-16', ''+ano+'-07-31').map(maskcenasr);
    var bioma_ago_1 = collection.filterDate(''+ano+'-08-01', ''+ano+'-08-15').map(maskcenasr);
    var bioma_ago_2 = collection.filterDate(''+ano+'-08-16', ''+ano+'-08-30').map(maskcenasr);
    var bioma_set_1 = collection.filterDate(''+ano+'-09-01', ''+ano+'-09-15').map(maskcenasr);
    var bioma_set_2 = collection.filterDate(''+ano+'-09-16', ''+ano+'-09-30').map(maskcenasr);
    var bioma_out_1 = collection.filterDate(''+ano+'-10-01', ''+ano+'-10-15').map(maskcenasr);
    var bioma_out_2 = collection.filterDate(''+ano+'-10-16', ''+ano+'-10-31').map(maskcenasr);
    var bioma_nov_1 = collection.filterDate(''+ano+'-11-01', ''+ano+'-11-15').map(maskcenasr);
    var bioma_nov_2 = collection.filterDate(''+ano+'-11-16', ''+ano+'-11-30').map(maskcenasr);
    var bioma_dez_1 = collection.filterDate(''+ano+'-12-01', ''+ano+'-12-15').map(maskcenasr);
    var bioma_dez_2 = collection.filterDate(''+ano+'-12-16', ''+ano+'-12-31').map(maskcenasr);
    var bands = ['B6','B5','B4'];
    Map.addLayer(bioma_abr_1, {bands: bands,  min: 0, max:0.3}, 'abr1_'+ano, false);
    Map.addLayer(bioma_abr_2, {bands: bands,  min: 0, max:0.3}, 'abr2_'+ano, false);
    Map.addLayer(bioma_mai_1, {bands: bands,  min: 0, max:0.3}, 'mai1_'+ano, false);
    Map.addLayer(bioma_mai_2, {bands: bands,  min: 0, max:0.3}, 'mai2_'+ano, false);
    Map.addLayer(bioma_jun_1, {bands: bands,  min: 0, max:0.3}, 'jun1_'+ano, false);
    Map.addLayer(bioma_jun_2, {bands: bands,  min: 0, max:0.3}, 'jun2_'+ano, false);
    Map.addLayer(bioma_jul_1, {bands: bands,  min: 0, max:0.3}, 'jul1_'+ano, false);
    Map.addLayer(bioma_jul_2, {bands: bands,  min: 0, max:0.3}, 'jul2_'+ano, false);
    Map.addLayer(bioma_ago_1, {bands: bands,  min: 0, max:0.3}, 'ago1_'+ano, false);
    Map.addLayer(bioma_ago_2, {bands: bands,  min: 0, max:0.3}, 'ago2_'+ano, false);
    Map.addLayer(bioma_set_1, {bands: bands,  min: 0, max:0.3}, 'set1_'+ano, false);
    Map.addLayer(bioma_set_2, {bands: bands,  min: 0, max:0.3}, 'set2_'+ano, false); 
    Map.addLayer(bioma_out_1, {bands: bands,  min: 0, max:0.3}, 'out1_'+ano, false);
    Map.addLayer(bioma_out_2, {bands: bands,  min: 0, max:0.3}, 'out2_'+ano, false);
    Map.addLayer(bioma_nov_1, {bands: bands,  min: 0, max:0.3}, 'nov1_'+ano, false);
    Map.addLayer(bioma_nov_2, {bands: bands,  min: 0, max:0.3}, 'nov2_'+ano, false);
    Map.addLayer(bioma_dez_1, {bands: bands,  min: 0, max:0.3}, 'dez1_'+ano, false);
    Map.addLayer(bioma_dez_2, {bands: bands,  min: 0, max:0.3}, 'dez2_'+ano, false);
    Map.addLayer(burnDate, {palette:palette2[3]}, 'Queimada '+ biomaSelect +' '+ ano +' Modis (BurnedArea)', true);
    // var maskBeta1 = beta1.gte(1)//.clip(biomaSelect);
    Map.addLayer(beta1, {palette:palette2[0]}, 'Queimada '+ biomaSelect +' '+ ano +' V1', true);
    // var maskBeta2 = beta2.gte(1)//.clip(biomaSelect);
    Map.addLayer(beta2, {palette:palette2[1]}, 'Queimada '+ biomaSelect +' '+ ano +' V2', true);
    var convergia = beta1.updateMask(beta2);
    Map.addLayer(convergia, {palette:palette2[2]}, 'Queimada '+ biomaSelect +' '+ ano +' Convergencia', true);
    var lineBioma = ee.Image(1).paint(featureBioma,null,0.5)
    Map.addLayer(lineBioma.updateMask(lineBioma.lt(1)),{palette:palette2[4]},biomaSelect)
    //LEGENDA
    var legend = ui.Panel({
      style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }});
    var legendTitle = ui.Label({
      value: 'LEGENDA',
      style: {fontWeight: 'bold',
        fontSize: '18px',
        margin: '0px',
        padding: '2px'
      }
    });
    legend.add(legendTitle);
    var makeRow = function(color, name) {
      var colorBox = ui.Label({
        value:'◉',
        style: {
          color: color,
          padding: '2px',
          margin: '0px'
        }});
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
    var palette =app.assets.palette2 ;
    var names = [
      'Queimada '+ biomaSelect +' '+ ano +' V1',
      'Queimada '+ biomaSelect +' '+ ano +' V2',
      'Queimada '+ biomaSelect +' '+ ano +' Convergencia',
      'Queimada '+ biomaSelect +' '+ ano +' Modis (BurnedArea)',
      ];
    for (var i = 0; i < 4; i++) {
      legend.add(makeRow(palette[i], names[i]));
    }  
    legend.add(ui.Panel([ui.Label('━', {
        color: '000000',
        padding: '2px',
        margin: '0px'
      }),
      ui.Label('Limite do '+biomaSelect,{
        margin:'0 0 4px 6px'
      })
    ], ui.Panel.Layout.Flow('horizontal')))
    function makeColorBarParams(palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x10',
        format: 'png',
        min: 0,
        max: 1,
        palette: app.assets.palette,
      };
    }
    // Create the color bar for the legend.
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: makeColorBarParams(app.assets.palette),
      style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
    });
    // Create a panel with three numbers for the legend.
    var legendLabels = ui.Panel({
      widgets: [
        ui.Label(0, {margin: '4px 8px'}),
        ui.Label(
            (0.5),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(1, {margin: '4px 8px'})
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var titleColorBar = ui.Label({
      value: 'Map Legend: area Density',
      style: {fontWeight: 'bold'}
    });
    var colorBarPanel = ui.Panel([titleColorBar, colorBar, legendLabels]);
    legend.add(colorBarPanel);
    Map.add(legend);
    Map.add(app.ui.panelControle.select);
    Map.add(app.ui.panelControle.slider);
  },
  panelControle:{
    slider: ui.Slider({
      min:2000,
      max:2018,
      value:2018,
      step:1,
      onChange:function(value){
        Map.clear()
        app.assets.year = value
        app.ui.loadLayer()
      },
      style:{
        width:'400px'
      }
    }),
    select: ui.Select({
      items:[ 
        {label:'Amazônia',value:'Amazônia'},
        {label:'Caatinga',value:'Caatinga'},
        {label:'Cerrado',value:'Cerrado'},
        {label:'Mata Atlântica',value:'Mata Atlântica'},
        {label:'Pampa',value:'Pampa'},
        {label:'Pantanal',value:'Pantanal'}],
      placeholder:'Escolha um Bioma',
      value:app.assets.biomaSelect,
      onChange:function(value){
        Map.clear()
        app.assets.biomaSelect = value
        var centerObject = app.assets.collectionBiomas.filter(ee.Filter.eq('Bioma',app.assets.biomaSelect))
        Map.centerObject(centerObject)
        app.ui.loadLayer()        
      },
      style:{
        width: '175px',
        height: '45px',
        padding: '7px',
        textAlign: 'center',
        stretch:'horizontal'
      }
    })
  }
}
app.iniciar = function () {
  print('Iniciando Rotina...🔥🔥🔥');
  app.ui.iniciar()
};
app.iniciar();