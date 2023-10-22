/**
 * Projeto MapBiomasFogo- GT FOGO Mapbiomas
 * 
 * Analisar da cobertura e frequencia das classificações de cicatrizes de fogo
 * do MapBiomas-Fogo e Modis-BurnDate
 * 
 * Instituto de Pesquisa Ambiental da Amazônia
 * Wallace Vieira da Silva - Geografia - estagiario
 * contato wallce.silva@ipam.org.br
 * 24 de novembro de 2020 Brasilia-DF/Brasil
 * 
*/
var app={
};
app.tables = {
  // estados:'projects/mapbiomas-workspace/AUXILIAR/estados-2017',
  // municipios:'projects/mapbiomas-workspace/AUXILIAR/municipios-2016',
  biomas:'projects/mapbiomas-workspace/AUXILIAR/biomas-2019',
  // baciasNivel1:'projects/mapbiomas-workspace/AUXILIAR/bacias-nivel-1',
  // baciasNivel2:'projects/mapbiomas-workspace/AUXILIAR/bacias-nivel-2',
  // areasProtegidas:'projects/mapbiomas-workspace/AUXILIAR/areas-protegidas',
  brasil:'projects/mapbiomas-workspace/AUXILIAR/brasil_2km',
};
app.rasters = {
  modis:'MODIS/006/MCD64A1',
  mapbiomasFogo:'projects/mapbiomas-workspace/FOGO/cobertura-anual-queimada-ft',
  mapbiomasIntegration:'projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1',
};
app.options = {
  year:2017,
  region:'Cerrado',
  geometry: null,
  vis:{
    fireCover: {
      palette:require('users/mapbiomas/modules:Palettes.js').get('classification5'),
      min:0,
      max:45
    },
    fireFrequence: {
      palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
      min:0,
      max:20
    },
    mapbiomas: {
      palette:'#800000',
    },
    modis: {
      palette:'#000000'
    },
    convergencia: {
      palette:'#808000'
    },
  },
  visPanels:{
    padrao:{
  // height:
  // width:,
  margin:'0px',
  backgroundColor:'ffffff00',
  // border:,
  fontSize:'13px',
  // fontWeight:,
  //fontFamily:'monospace', //'serif')
  textAlign:'center',
  // position:'bottom-right'
    },
    principal:{
  // height:'140px',
  // width:'240px',
  // padding:,
  backgroundColor:'ffffff',
  // border:,
  // fontSize:'10px',
  // fontWeight:,
  fontFamily:'monospace', //'serif')
  // textAlign:,
  position:'bottom-left'
    }
  }
};
app.geometryAdj = function(region){
  var geometry;
  if (region === 'Brasil'){
    geometry = ee.FeatureCollection(app.tables.brasil).geometry();
  } else {
        geometry = ee.FeatureCollection(app.tables.biomas)
      .filter(ee.Filter.eq('Bioma',region))
      .geometry()
  }
  app.options.geometry = geometry;
  app.options.mask = ee.Image(1).clip(geometry);
};
app.imageAdj = function(year){
  var mapbiomasFogo = ee.ImageCollection(app.rasters.mapbiomasFogo)
    .filter(ee.Filter.eq('year',year))
    .mosaic();
  var modis = ee.ImageCollection(app.rasters.modis)
    .filterDate(''+year+'-01-01',''+(year+1)+'-01-01')
    .mosaic()
    .select('BurnDate');
  var mapbiomasIntegration = ee.Image(app.rasters.mapbiomasIntegration)
    .select(ee.String('classification_' + year));
  mapbiomasFogo = mapbiomasIntegration
    .updateMask(mapbiomasFogo).rename('MapBiomas-Fogo - '+year);
  modis = mapbiomasIntegration
    .updateMask(modis).rename('Modis-BurnDate - '+year);
  return mapbiomasFogo.addBands(modis);
};
app.fireCoverYear = function(year,listPosition){
var imageAdj = app.imageAdj(year)
  // .clip(app.options.geometry);
  .updateMask(app.options.mask);
// --------------------------------------------------------
var modisCover = ui.Map.Layer({
    eeObject:imageAdj.select('Modis-BurnDate - '+year),
    visParams:app.options.vis.fireCover,
    name:'Modis-BurnDate '+year+ ' - Cobertura',
    shown:Map.layers().get(listPosition[0]).getShown(),
    opacity:1
  });
var mapBiomasCover = ui.Map.Layer({
    eeObject:imageAdj.select('MapBiomas-Fogo - '+year),
    visParams:app.options.vis.fireCover,
    name:'MapBiomas-Fogo '+year+ ' - Cobertura',
    shown:Map.layers().get(listPosition[1]).getShown(),
    opacity:1
  });
var convergenciaCover = imageAdj.select('MapBiomas-Fogo - '+year).updateMask(imageAdj.select('Modis-BurnDate - '+year));
convergenciaCover = ui.Map.Layer({
    eeObject:convergenciaCover,
    visParams:app.options.vis.fireCover,
    name:'Convergencia '+year+ ' - Cobertura',
    shown:Map.layers().get(listPosition[2]).getShown(),
    opacity:1
  });
// --------------------------------------------------------
var modis = ui.Map.Layer({
    eeObject:imageAdj.select('Modis-BurnDate - '+year),
    visParams:app.options.vis.modis,
    name:'Modis-BurnDate '+year,
    shown:Map.layers().get(listPosition[3]).getShown(),
    opacity:1
  });
var mapBiomas = ui.Map.Layer({
    eeObject:imageAdj.select('MapBiomas-Fogo - '+year),
    visParams:app.options.vis.mapbiomas,
    name:'MapBiomas-Fogo '+year,
    shown:Map.layers().get(listPosition[4]).getShown(),
    opacity:1
  });
var convergencia = imageAdj.select('MapBiomas-Fogo - '+year).updateMask(imageAdj.select('Modis-BurnDate - '+year));
convergencia = ui.Map.Layer({
    eeObject:convergencia,
    visParams:app.options.vis.convergencia,
    name:'Convergencia '+year,
    shown:Map.layers().get(listPosition[5]).getShown(),
    opacity:1
  });
// --------------------------------------------------------
var list = [mapBiomasCover,modisCover,convergenciaCover,
            mapBiomas,modis,convergencia];
return list;
};
app.fireFrequence = function(listPosition){
  var list = [
    2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
    2010,2011,2012,2013,2014,2015,2016,2017,2018,2019
    ];
  var frequenceMapBiomas = list.map(function(year){
  return ee.Image(1)
    .updateMask(
      ee.ImageCollection(app.rasters.mapbiomasFogo)
      .filter(ee.Filter.eq('year',year))
      .mosaic()
    );
  });  
  var frequenceModis = list.map(function(year){
  return ee.Image(1)
    .updateMask(
      ee.ImageCollection(app.rasters.modis)
        .filterDate(''+year+'-01-01',''+(year+1)+'-01-01')
       .mosaic()
       .select('BurnDate')
    );
  });
  frequenceMapBiomas = ee.ImageCollection(frequenceMapBiomas)
    .sum()
     // .clip(app.options.geometry);
    .updateMask(app.options.mask);
print('app.options.geometry',app.options.geometry)
  frequenceModis = ee.ImageCollection(frequenceModis)
    .sum()
     // .clip(app.options.geometry);
    .updateMask(app.options.mask);
  frequenceMapBiomas = ui.Map.Layer({
    eeObject:frequenceMapBiomas,
    visParams:app.options.vis.fireFrequence,
    name:"MapBiomas-Fogo - frequencia (2000 à 2019)",
    shown:Map.layers().get(listPosition[0]).getShown(),
    opacity:1
  });
  frequenceModis = ui.Map.Layer({
    eeObject:frequenceModis,
    visParams:app.options.vis.fireFrequence,
    name:"Modis-BurnDate - frequencia (2000 à 2019)",
    shown:Map.layers().get(listPosition[1]).getShown(),
    opacity:1
  });
  var returnList = [frequenceMapBiomas,frequenceModis];
return returnList;
};
app.selectFunction = function(value){
      app.options.year = value;
      var positionModisCover = 2
      var positionMapbiomasCover = 3
      var positionConvergenciaCover = 4
      var positionModis = 5
      var positionMapbiomas = 6
      var positionConvergencia = 7
      var positionList = [positionModisCover,positionMapbiomasCover,positionConvergenciaCover,
          positionModis,positionMapbiomas,positionConvergencia
        ];
      var classification = app.fireCoverYear(value,positionList);
//----------------------------------------------------------------------
      Map.remove(Map.layers().get(positionModisCover));
      Map.layers().insert(positionModisCover, classification[1]);
      Map.remove(Map.layers().get(positionMapbiomasCover));
      Map.layers().insert(positionMapbiomasCover, classification[0]);
      Map.remove(Map.layers().get(positionConvergenciaCover));
      Map.layers().insert(positionConvergenciaCover, classification[2]);
//----------------------------------------------------------------------
      Map.remove(Map.layers().get(positionModis));
      Map.layers().insert(positionModis, classification[4]);
      Map.remove(Map.layers().get(positionMapbiomas));
      Map.layers().insert(positionMapbiomas, classification[3]);
      Map.remove(Map.layers().get(positionConvergencia));
      Map.layers().insert(positionConvergencia, classification[5]);
//----------------------------------------------------------------------
    }
app.ui = {
  start:function(){
  app.geometryAdj(app.options.region)
  var positionFrequenceMapbiomas = 1
  var positionFrequenceModis = 0
  var positionList = [positionFrequenceMapbiomas,positionFrequenceModis]
  var frequence = app.fireFrequence(positionList)
  Map.remove(Map.layers().get(positionFrequenceMapbiomas));
  Map.layers().insert(positionFrequenceMapbiomas, frequence[0]);
  Map.remove(Map.layers().get(positionFrequenceModis));
  Map.layers().insert(positionFrequenceModis, frequence[1]);
  app.selectFunction(app.options.year)
  Map.centerObject(app.options.geometry)
  print(app)
  },
  slider:ui.Slider({
    min:2000,
    max:2019,
    value:app.options.year,
    step:1,
    onChange:function(value){
      app.selectFunction(value);
    },
    style:app.options.visPanels.padrao
  }),
  select:ui.Select({
    items:[
      {label:'Brasil',value:'Brasil'},
      {label:'Amazônia',value:'Amazônia'},
      {label:'Caatinga',value:'Caatinga'},
      {label:'Cerrado',value:'Cerrado'},
      {label:'Mata Atlântica',value:'Mata Atlântica'},
      {label:'Pampa',value:'Pampa'},
      {label:'Pantanal',value:'Pantanal'},
    ],
    placeholder:app.options.region,
    value:app.options.region,
    onChange:function(value){
      app.options.region = value
      app.ui.start()
    },
    // disabled:,
    style:app.options.visPanels.padrao,
  }),
  legend:function(){
    var lists = [
      ['Limite dos Biomas',8],
      ['MapBiomas-Fogo',6],
      ['MapBiomas-Fogo-Cobertura',3],
      ['Frequencia-MapBiomas-Fogo',1],      
      ['Modis-BurnedArea',5],
      ['Modis-BurnedArea-Cobertura',2],
      ['Frequencia-Modis-BurnedArea',0],
      ['Convergencia',7],
      ['Convergencia-Cobertura',4],
      ];
    var listCheckbox = lists.map(function(list){
      return ui.Checkbox({
        label:list[0],
        value:Map.layers().get(list[1]).getShown(),
        onChange:function(value){
          Map.layers().get(list[1]).setShown(value)
        },
        // disabled,
       style:app.options.visPanels.padrao
      })
    })
    return ui.Panel({
      widgets:listCheckbox,
      layout:ui.Panel.Layout.Flow('vertical'),
     style:app.options.visPanels.padrao
    })
  },
  panelHorizontal:ui.Panel({
      layout:ui.Panel.Layout.Flow('horizontal'),
      style:app.options.visPanels.padrao
    }),
  panelVertical:ui.Panel({
      layout:ui.Panel.Layout.Flow('vertical'),
      style:app.options.visPanels.principal
    }),
  colorBar: ui.Thumbnail({
          image: ee.Image.pixelLonLat().select(0),
          params: {
            bbox: [0, 0, 1, 0.1],
            dimensions: '100x10',
            format: 'png',
            min: 0,
            max: 1,
            palette: app.options.vis.fireFrequence.palette,
          },
          style: {
            stretch: 'horizontal',
            maxHeight: '10px',
            margin:app.options.visPanels.padrao.margin,
            backgroundColor:app.options.visPanels.padrao.backgroundColor
          },
        }),
}
app.start = function (){
  Map.addLayer(ee.Image().select(),{},'',false) // frequencia modis
  Map.addLayer(ee.Image().select(),{},'',true)  // frequencia mapbiomas
  Map.addLayer(ee.Image().select(),{},'',false) // modis cobertura
  Map.addLayer(ee.Image().select(),{},'',false) // mapbiomas cobertura
  Map.addLayer(ee.Image().select(),{},'',false) // convergencia cobertura
  Map.addLayer(ee.Image().select(),{},'',false) // modis
  Map.addLayer(ee.Image().select(),{},'',false) // mapbiomas
  Map.addLayer(ee.Image().select(),{},'',false) // convergencia
  var biomaLine = ee.FeatureCollection(app.tables.biomas)
  biomaLine = ee.Image(1).paint(biomaLine,'000000',0.5)
  biomaLine = biomaLine.updateMask(biomaLine.lt(1))
  Map.addLayer(biomaLine,{palette:'000000'},'Limite dos Biomas')
  var panelPrincipal = app.ui.panelVertical
    .add(app.ui.panelHorizontal
          .add(app.ui.slider)
          .add(app.ui.select))
    .add(app.ui.legend())
    .add(app.ui.colorBar);
  Map.add(panelPrincipal)
  app.ui.start()
}
var Mapp = require('users/joaovsiqueira1/packages:Mapp.js');
Map.setOptions({
    'styles': {
        'Dark': Mapp.getStyle('Dark')
    }
});
app.start();