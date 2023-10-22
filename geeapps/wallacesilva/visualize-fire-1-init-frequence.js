/**
 * 
 * SCRIPT: Visualize Coleção 1.0 v1
 * 
 * 
 * Objetivo: visualizar resultados Coleção 1.0 
 * 
 * Desenvolvimento: Vera Arruda e Wallace Silva - IPAM - GT/Fogo
 * Fevereiro de 2021
 * 
 * 
*/
// --- --- --- --- --- --- --- --- --- --- --- START CODE --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- OBJECT-ORIENTATION PROGRAMMING
// --- --- --- --- --- --- --- APLICATION 
// --- initial options
var options = {
// --- initial options
  year: 2020,
  region:'Brasil', //'Brasil' 'Amazônia','Caatinga','Cerrado','Mata Atlântica', 'Pampa', 'Pantanal
  nRegion:'0',
  cloudMask:'bqaHigh', //'bqa' - 'bqaHigh' - 'maskMapbiomas' - 'noMask'
  firstRound:true,
  // TESTES -> [x]-'Colecao_fogo_beta', [x]-'Colecao_fogo_v1_0', [x]-'Colecao_fogo_v4_0', [x]-'Colecao_fogo_v5_0', [x]-'Colecao_fogo_v6_0', [x]-'MCD64A1', [x]-'FIRMS' or  [x]-'FireCCI'
  fire_1: 'colecao 1 mask', // 'colecao beta', 'colecao 1','colecao 1 mask' 'MCD64A1', 'FIRMS' or 'FireCCI'.
  fire_2: 'colecao 1', // 'colecao beta', 'colecao 1 v1', 'colecao 1 v4', 'colecao 1 v5', 'colecao 1 v6', 'MCD64A1', 'FIRMS' or 'FireCCI'.
  fires:[
    'colecao beta',
    'colecao 1',
    'colecao 1 mask',
    'MCD64A1',
    'FIRMS',
    'FireCCI',
    ],
  dictYears:{
    'colecao beta':{
      start:2000,
      end:2019
    },
    'colecao 1':{
      start:1985,
      end:2020
    },
    'colecao 1 mask':{
      start:1985,
      end:2020
    },    
    'MCD64A1':{
      start:2001,
      end:2020
    },
    'FIRMS':{
      start:2001,
      end:2020
    },
    'FireCCI':{
      start:2001,
      end:2019
    },
    'focos':{
      start:1996,
      end:2020,
    }
  }
};
// --- dataset
var dataset = {
  // raster:{
    l5:'LANDSAT/LT05/C01/T1_SR', //1984-01-01T00:00:00 - 2012-05-05T00:00:00
    l7:'LANDSAT/LE07/C01/T1_SR', //1999-01-01T00:00:00 - 2021-01-31T00:00:00
    l8:'LANDSAT/LC08/C01/T1_SR', //2013-04-11T00:00:00 - 2021-01-22T00:00:00
    mapbiomas:'projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1', // Brasil - 1985 à 2019
    'colecao beta':'projects/mapbiomas-workspace/FOGO1/monthly-coverage-collection-beta',// Brasil - 2000 à 2019
    'colecao 1':'projects/mapbiomas-workspace/FOGO1/monthly-coverage-collection-1', // 1985 - 2020
    'colecao 1 mask':'projects/mapbiomas-workspace/FOGO1/monthly-coverage-collection-1-v9',// 1985 - 2020
    MCD64A1:'projects/mapbiomas-workspace/FOGO1/monthly-coverage-mcd64a1',//2000 - 2020
    FIRMS:'projects/mapbiomas-workspace/FOGO1/monthly-coverage-firms', //2001 - 2021
    FireCCI: "projects/mapbiomas-workspace/FOGO1/monthly-coverage-firecci", //2001 - 2019,
    srtm:'USGS/SRTMGL1_003',
  // },
  // vector:{
    gridLandsat:'users/geomapeamentoipam/AUXILIAR/grid_landsat',
    focos:'users/geomapeamentoipam/AUXILIAR/focos/brasil/Focos_',
    brasil:'projects/mapbiomas-workspace/AUXILIAR/brasil_2km',
    biomas:'projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil',
    regions:'users/geomapeamentoipam/AUXILIAR/regioes_biomas',
    sulAmerica:'projects/mapbiomas-workspace/AUXILIAR/America_do_Sul_BR2005',
    fireUFA:'users/wallacesilva/vetor/sonaira/LabGAMA_IncendiosFlorestais_'
  // }
};
// --- visParams
var visParams = {
  line: {
    palette:['000000'],
  },
  lines: {  // blank,  amaz,    caat,   cerr,     matl,   pamp,     pant     
    palette:['000000','00ff00','0000ff','ff0000','dddd00','ee8050','dd00dd'],
    min:0,
    max:6,
  },
  months_pallete: {   
    palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
    // bands:['month'],
    min:1,
    max:12,
  },
  dem:{
      bands:['aspect'],
      opacity:0.25,
      palette:['000000','ffffff'],
    },
  //landsat
  landsat: {
    bands:['swir1','nir','red'],
    min:300,
    max:4000
  },
  landsatDelta: {
    bands:['swir1','nir','red'],
    min:-1000,
    max:1500
  },
  timeFlag: {
    bands:['monthOfYear'],
    min:1,
    max:12,
    palette:[
      'a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'
      ],
    // palette:[
    //   '000000', 'ffffff'
    //   ]
  },
  //
  fire_1: { // visualização padrão, (inclui coleção 1)
    min:1,
    max:0,
    palette:['000000'],
  },
  fire_2: { // coleção 2
    min:1,
    max:0,
    palette:['ff0000'],
  },
  convergencia: { // coleção 2
    min:1,
    max:0,
    palette:['00ff00'],
  },
  'colecao beta_other':{
    palette:['5f0f40'],
  },
  'colecao 1_other':{
    palette:['38040e'],
  },
  'colecao 1 mask_other':{
    palette:['f25c54'],
  },    
  'MCD64A1_other':{
    palette:['e36414'],
  },
  'FIRMS_other':{
    palette:['0f4c5c'],
  },
  'FireCCI_other':{
    palette:['fb8b24'],
  },
  grayScale: {
    bands:['-nbr',],
    min:30,
    max:100,
    // palette:[
    //   '190D0D',
    //   '4D0709',
    //   '810004',
    //   '9F360B',
    //   'BD6C12',
    //   'DAA118',
    //   'F8D71F',
    //   'FFFF00',
    //   'FFFFFF',
    //],
    palette:['000000', 'ffffff']
  },
  frequenceFire_1: {
      palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
      min:0,
      max:options.dictYears[options.fire_1].end - options.dictYears[options.fire_1].start
    },
  frequenceFire_2: {
      palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
      min:0,
      max:options.dictYears[options.fire_2].end - options.dictYears[options.fire_2].start
    },
  mapbiomas:{
    palette:require('users/mapbiomas/modules:Palettes.js').get('classification5'),
    min:0,
    max:45,
  },
};
// --- --- modules
var Mapp = require('users/joaovsiqueira1/packages:Mapp.js');
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function nbr (image) {
var exp = '( b("nir") - b("swir2") ) / ( b("nir") + b("swir2") )';
  var maximoNBR = image
    .expression(exp)
    .rename("maximo nbr")
    .add(1)
    .multiply(1000)
    // .subtract(1000)
    .int16();
  var minimoNBR = maximoNBR
    .multiply(-1)
    .rename("minimo nbr");
  return image
    .addBands(maximoNBR)
    .addBands(minimoNBR);
}
function getFocos (year,buffer) {
  buffer = buffer || 500;
  var focos = ee.FeatureCollection(dataset.focos + year)
    .map(function(feature){
      return feature
      .buffer(buffer);
    });
    var focos_image = focos
      .map(function(feature) {
        var datahora = feature.getString('datahora').split('/');
        var day = ee.String(datahora.get(2)).slice(0,2);
        day = ee.Number.parse(day);
        day = ee.Image(day)
          .rename('day').byte();
        var month = datahora.get(1);
        month = ee.Number.parse(month);
        month = ee.Image(month)
          .rename('month').byte();
        var year = datahora.get(0);
        year = ee.Number.parse(year);
        year = ee.Image(year)
          .rename('year').int();
        return year
          .addBands(month)
          .addBands(day)
          .clip(feature.geometry())
          .copyProperties(feature);
          // .set({
          //   'mês':mes,
          // });
      });
  return ee.ImageCollection(focos_image);
}  
function  timeFlag (image) {
  var sensor = ee.String(image.get('SATELLITE'));
  sensor = sensor.slice(-1);
  sensor = ee.Number.parse(sensor);
  var path = ee.Number.parse(image.get('WRS_PATH'));
  var row = ee.Number.parse(image.get('WRS_ROW'));
  /* 
  // Symbol  Meaning                      Presentation  Examples
  // ------  -------                      ------------  -------
  // G       era                          text          AD
  // C       century of era (>=0)         number        20
  // Y       year of era (>=0)            year          1996
  // x       weekyear                     year          1996
  // w       week of weekyear             number        27
  // e       day of week                  number        2
  // E       day of week                  text          Tuesday; Tue
  // y       year                         year          1996
  // D       day of year                  number        189
  // M       month of year                month         July; Jul; 07
  // d       day of month                 number        10
  // a       halfday of day               text          PM
  // K       hour of halfday (0~11)       number        0
  // h       clockhour of halfday (1~12)  number        12
  // H       hour of day (0~23)           number        0
  // k       clockhour of day (1~24)      number        24
  // m       minute of hour               number        30
  // s       second of minute             number        55
  // S       fraction of second           number        978
  // z       time zone                    text          Pacific Standard Time; PST
  // Z       time zone offset/id          zone          -0800; -08:00; America/Los_Angeles
  // '       escape for text              delimiter
  // ''      single quote                 literal       '
  //*/    
  var dayOfYear = ee.Number.parse(ee.Date(image.get('system:time_start')).format('D'));
  var monthOfYear = ee.Number.parse(ee.Date(image.get('system:time_start')).format('M'));
  var year = ee.Number.parse(ee.Date(image.get('system:time_start')).format('Y'));
  var dayOfMonth = ee.Number.parse(ee.Date(image.get('system:time_start')).format('d'));
  // images: {
    dayOfYear = ee.Image(dayOfYear)
      .rename('dayOfYear')
      .int16();
    monthOfYear = ee.Image(monthOfYear)
      .rename('monthOfYear')
      .int16();
    year = ee.Image(year)
      .rename('year')
      .int16();
    dayOfMonth = ee.Image(dayOfMonth)
      .rename('dayOfMonth')
      .int16();
   sensor = ee.Image(sensor)
      .rename('sensor')
      .byte();
   path = ee.Image(path)
      .rename('path')
      .byte();
   row = ee.Image(row)
      .rename('row')
      .byte();
  // }
  return image
    .addBands(sensor)
    .addBands(dayOfYear)
    .addBands(monthOfYear)
    .addBands(year)
    .addBands(dayOfMonth)
    .addBands(path)
    .addBands(row);
    // .set({'string':string});
}
function getCollection (year){
  var landsatYears = {   // Correlation dictionary
    // -reference
    // 'LANDSAT/LT05/C01/T1_SR', //1984-01-01T00:00:00 - 2012-05-05T00:00:00
    // 'LANDSAT/LE07/C01/T1_SR', //1999-01-01T00:00:00 - 2021-01-24T00:00:00 // -> use until 2012 //Scanner broker failure on May 31, 2003, causing loss of 22% of the total image 
    // 'LANDSAT/LC08/C01/T1_SR', //2013-04-11T00:00:00 - 2021-01-22T00:00:00
    // 'lx' for Landsat 5 merge Landsat 7 and 'ly' for Landsat 7 merge Landsat 8
    1985:'l5',  1986:'l5',  1987:'l5',  1988:'l5',  1989:'l5',
    1990:'l5',  1991:'l5',  1992:'l5',  1993:'l5',  1994:'l5',
    1995:'l5',  1996:'l5',  1997:'l5',  1998:'l5',
    1999:'l7',  2000:'l7',  2001:'l7',  2002:'l7',
    2003:'l5',  2004:'l5',  2005:'l5',  2006:'l5',  2007:'l5',  2008:'l5',
    2009:'l5',  2010:'l5',  2011:'l5',
    2012:'l7',
    2013:'l8',  2014:'l8',  2015:'l8',  2016:'l8',  2017:'l8',
    2018:'l8',  2019:'l8',  2020:'l8',
  };
  // --- options
  var collectionID = landsatYears[year];
  var dateStart = ''+year+'-01-01';
  var dateEnd = ''+(year + 1)+'-01-01';
  var cloudCover = 70;
  var blockList = require('users/geomapeamentoipam/GT_Fogo_MapBiomas:2_Colecao_1.0_2021/module-blockList').blockList();
  var cloudMask = 'bqaHigh'; //'bqaHigh','bqa','noMask';
  // --- 
  // --- bands edit
  var bns = require('users/mapbiomas/mapbiomas-mosaics:modules/BandNames.js');
  var bands = {
    'l5': bns.get('l5'),
    'l7': bns.get('l7'),
    'l8': bns.get('l8'),
  };
  // --- 
  // --- processings
  // 'lx' for Landsat 5 merge Landsat 7 and 'ly' for Landsat 7 merge Landsat 8
  if (collectionID === 'lx'){
    var bandsL5 = bns.get('l5');
    var bandsL7 = bns.get('l7');
    var collectionL5 = ee.ImageCollection(dataset['l5'])
        .filterDate(dateStart,dateEnd)
        .select(bands['l5'].bandNames, bands['l5'].newNames);
    var collectionL7 = ee.ImageCollection(dataset['l7'])
        .filterDate(dateStart,dateEnd)
        .select(bands['l5'].bandNames, bands['l5'].newNames);
    var collection = collectionL5.merge(collectionL7);
  } else { 
    // print(collectionID)
    collection = ee.ImageCollection(dataset[collectionID])
        .filterDate(dateStart,dateEnd)
        .select(bands[collectionID].bandNames, bands[collectionID].newNames);
  }
  if (collectionID === 'ly'){
    collectionL5 = ee.ImageCollection(dataset['l5'])
        .filterDate(dateStart,dateEnd)
        .select(bands['l5'].bandNames, bands['l5'].newNames);
    var collectionL8 = ee.ImageCollection(dataset['l8'])
        .filterDate(dateStart,dateEnd)
        .select(bands['l8'].bandNames, bands['l8'].newNames);
    collection = collectionL7.merge(collectionL8);
  }
    // --- cloudMasks
  var cloudMasks = {
    'bqa': function (image){
      // Bits 3 and 5 are cloud shadow and cloud, respectively.
      var cloudShadowBitMask = ee.Number(2).pow(3).int();
      var cloudsBitMask = ee.Number(2).pow(5).int();
      // Get the pixel QA band.
      var qa = image.select('pixel_qa');
      // Both flags should be set to zero, indicating clear conditions.
      var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0) && (qa.bitwiseAnd(cloudsBitMask).eq(0));
      // Return the masked image, scaled to [0, 1].
      return image.updateMask(mask);
  },
    'bqaHigh': function (image) {
       var qa = image.select('pixel_qa');
       // If the cloud bit (5) is set and the cloud confidence (7) is high
       // or the cloud shadow bit is set (3), then it's a bad pixel.
       var cloud = qa.bitwiseAnd(1 << 5)
       .and(qa.bitwiseAnd(1 << 7))
       .or(qa.bitwiseAnd(1 << 3));
       // Remove edge pixels that don't occur in all bands
       var mask2 = image.mask().reduce(ee.Reducer.min());
       return image.updateMask(cloud.not()).updateMask(mask2)
  },
    'noMask': function(image){ 
      return image;
    },
  };
  // ---
  // --- return   
  return collection
    .filter(ee.Filter.inList('system:index', blockList).not())
    .map(cloudMasks[cloudMask])
    .map(timeFlag)
    .map(nbr);
  }
function getFire (col_address, year) {
  var colFire = ee.ImageCollection(dataset[col_address])
    .mosaic()
    .select('monthly_'+year);
  return colFire
    .set({
      address:col_address,
      year:year
    });
}
function setRegions(){
  var biomas = ee.FeatureCollection(dataset.biomas);
  var regions = ee.FeatureCollection(dataset.regions);
  var image = ee.Image(1);
  var lineSize = 0.25;
  biomas = image.paint(biomas,'000000',lineSize + 1.75);
  biomas = biomas.updateMask(biomas.eq(0));
  regions = image.paint(regions,'000000',lineSize);
  regions = regions.updateMask(regions.eq(0));
  return biomas.blend(regions);
}
function frequence (fire){
  var dictYears = options.dictYears;
  // if (dictYears['noContinued'] === true){
  //   return ee.Image().select()
  // }
  var listYears = ee.List.sequence(dictYears[fire].start, dictYears[fire].end,1).getInfo();
  // var listYears = ee.List.sequence(2001, 2002,1).getInfo();
  listYears = listYears.map(function(y){
    return ee.Image(1).updateMask(getFire(fire, y).rename('frequence'));
  });
  return ee.ImageCollection(listYears).sum();
}
function colorBar (palette,listStrings,title){
  // Create the color bar for the legend.
  var colorbar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {
      stretch: 'horizontal',
      maxHeight: '6px',
      fontSize:'12px',
      fontWeight: 'bold',
      margin:'0px 0px 0px 0px',
      backgroundColor:'ffffff00',
    },
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(listStrings[0], {  backgroundColor:'ffffff00', fontSize:'10px',  margin:'0px 0px 0px 0px',}),
      ui.Label(listStrings[1], {  backgroundColor:'ffffff00', fontSize:'10px', textAlign: 'center', stretch: 'horizontal', margin:'0px 0px 0px 0px',}),
      ui.Label(listStrings[2], {  backgroundColor:'ffffff00', fontSize:'10px',  margin:'0px 0px 0px 0px',})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
    },
  });
  var titleColorBar = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize:'12px',
      margin:'0px 0px 0px 0px',
      backgroundColor:'ffffff00'
    }
  });
  return ui.Panel({
    widgets:[titleColorBar, colorbar, legendLabels],
    layout:ui.Panel.Layout.flow('vertical'),
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'320px'
    }
  });
}
function setSlider (){
  return ui.Slider({
    min:1985,
    max:2020,
    value:options.year,
    step:1,
    onChange:function(year){
      options.year = year;
      aktualizer(options.nRegion);
    },
    direction:'horizontal',
    // disabled:,
    style:{
      fontSize:'14px',
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'325px',
      // height:'25px',
    }
  });
}
function setSelctRegion (mapp){
  mapp = mapp || Map;
  var regions = ee.FeatureCollection(dataset.regions);
  var names = regions
    .aggregate_array('bioma')
    .distinct()
    .getInfo();
  names = names.map(function(name){
    var list = regions
      .filter(ee.Filter.eq('bioma',name))
      .aggregate_array('id')
      .distinct();
    if (name !== 'Pantanal'){
      list = list.add(0);
    }
    return list.map(function(id){
      return ee.String(name + '-').cat(id);
    });
  });
  names = ee.List(names).flatten().sort().getInfo();
  names[names.length] = 'Brasil-0';
  return ui.Select({
    items:names,
    // placeholder:,
    value:options.region + '-' + options.nRegion,
    onChange:function(value){
      value = value.split('-');
      options.region = value[0];
      options.nRegion = value[1];
      aktualizer(options.nRegion);
      mapp.centerObject(mapp.layers().get(0).getEeObject());
    },
    // disabled:,
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'320px',
      // height:'20px',
    }
  });
}
function setLabel (title, panel) {
  panel = panel || ui.Panel();
    var label = ui.Label({
        value:title,
        style:{
          fontSize:'12px',
          backgroundColor:'ffffff00',
          margin:'0px 0px 0px 0px',
        },
      });
  return ui.Panel({
    widgets:[label,panel],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
    }
  });
}
function setControl (mapp) {
  mapp = mapp || Map;
  var labelsLayer = ui.Panel({
  widgets:ui.Label('subtitles'),
  layout:ui.Panel.Layout.Flow('vertical'),
  style:{
      backgroundColor:'ffffff00',
      maxHeight:'200px',
      // width:'200px',
    }
  });
  var colorBarTimeFlag = colorBar(visParams.timeFlag.palette,         ['jan','jun','dez'],  'Composição do mosaico NBR (Meses)');
  var colorBarFrequence = colorBar(visParams.frequenceFire_2.palette, ['min','---','max'],  'Frequência de area queimada');
  var dataStudio = ui.Label({
    value:'code-source',
    style:{
      fontSize:'11px',
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px ',
      // position:'center'
    },
    targetUrl:'https://code.earthengine.google.com/5203b166f35f8769ec91852941773e12'
  });
  var panel = ui.Panel({
  widgets:[ 
      setLabel('Escolha um ano:',setSlider()),
      setLabel('Escolha uma região:',setSelctRegion()),
      setLabel('Escolha o produto de fogo 1:',setSelectFire_1()),
      setLabel('Escolha o produto de fogo 2:',setSelectFire_2()),
      labelsLayer,  
      colorBarTimeFlag,
      colorBarFrequence,
      dataStudio
    ],
  layout:ui.Panel.Layout.Flow('vertical'),
  style:{
      backgroundColor:'ffffff00',
      // height:'200px',
      // width:'200px',
    }
  });
  return panel;
}
function setSelectFire_1 (){
  return ui.Select({
    items:options.fires,
    // placeholder:,
    value:options.fire_1,
    onChange:function(value){
      options.fire_1 = value;
      aktualizer(options.nRegion);
    },
    // disabled:,
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'320px',
      // height:'20px',
    }
  });
}
function setSelectFire_2 (){
  return ui.Select({
    items:options.fires,
    // placeholder:,
    value:options.fire_2,
    onChange:function(value){
      options.fire_2 = value;
      aktualizer(options.nRegion);
    },
    // disabled:,
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'320px',
      // height:'20px',
    }
  });
}
function subTitles (mapp){
  mapp = mapp || Map;
  var layers = mapp.layers();
  var labels = ee.List(layers.map(function(layer){
    return ee.String(layer.getName().split(' | ')[0]);
  }))
  .distinct()
  .sort()
  .getInfo();
  labels = labels.filter(function(item){
    return item !== '99-não incluir';
    });
  var labelsLayer = labels.map(function(label){
    var layerBox = layers.filter(function(item){
    return item.get('name').split(' | ')[0] === label;
    });
    layerBox = layerBox.map(function(layer){
      if (label !== '6-Background 🛰️'){
        var tag = ui.Label({
        value:'▇',
        style:{
          fontSize:'12px',
          color:layer.get('visParams')['palette'][0],
          backgroundColor:'ffffff00',
          margin:'0px 4px 0px 4px',
        },
      });
        if ('5-Auxiliar' === label){
          tag = ui.Label({
            value:'⌗',
            style:{
              fontSize:'12px',
              color:layer.get('visParams')['palette'][0],
              backgroundColor:'ffffff00',
              margin:'0px 4px 0px 4px',
            },
          });
        }
      } else {
        tag = ui.Label({
          value:'▤',
          style:{
            fontSize:'12px',
            margin:'0px 3px 0px 3px',
            color:'000000',
            backgroundColor:'ffffff00',
          },
        });
      }
      if (layer.getName().split(' || ')[1].split(' ')[0] === 'Cobertura' || layer.getName().split(' || ')[1].split(' ')[2] === 'cobertura'){
        tag = ui.Label({
        value:'❖',
        style:{
          fontSize:'14px',
          color: '129912',
          backgroundColor:'ffffff00',
          margin:'0px 4px 0px 4px',
        },
      });
      }
      var checkbox = ui.Checkbox({
        label:layer.getName().split(' || ')[1],
        value:layer.getShown(),
        onChange:function(value){
          layer.setShown(value);
        },
        // disabled:,
        style:{
          backgroundColor:'ffffff00',
          margin:'0px 0px 0px 0px',
          fontSize:'12px',
          width:'220px',
        }
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
        style:{
          backgroundColor:'ffffff00',
          margin:'0px 0px 0px 0px',
          width:'75px',
          fontSize:'10px'
        }
      });
      return ui.Panel({
        widgets:[tag, checkbox, opacity],
        layout:ui.Panel.Layout.Flow('horizontal'),
        style:{
          backgroundColor:'ffffff00',
          margin:'0px 0px 0px 0px',
        }
      });
    });
    var title = ui.Label({
        value:label,
        style:{
          fontSize:'15px',
          backgroundColor:'ffffff00',
          margin:'0px 0px 0px 0px',
        },
      });
    layerBox = ui.Panel({
    widgets:layerBox.reverse(),
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{
        backgroundColor:'ffffff00',
        margin:'0px 0px 0px 0px',
      }
    });
    return ui.Panel({
    widgets:[title,layerBox],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{
        backgroundColor:'ffffff00',
        margin:'0px 0px 0px 0px',
      }
    });
  });
  return ui.Panel({
  widgets:labelsLayer,
  layout:ui.Panel.Layout.Flow('vertical'),
  style:{
      backgroundColor:'ffffff00',
      maxHeight:'200px',
      // width:'200px',
    }
  });
}
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
function aktualizer (nregion,mapp){
  mapp = mapp || Map;
  var region = ee.FeatureCollection(dataset.regions)
    .filter(ee.Filter.eq('bioma',options.region))
    .filter(ee.Filter.eq('id',ee.Number.parse(options.nRegion)))
    .geometry();
  if (nregion === '0') {
    region = ee.FeatureCollection(dataset.biomas)
      .filter(ee.Filter.eq('Bioma',options.region))
      .geometry();
  }
  if (options.region === 'Brasil') {
    region = ee.FeatureCollection(dataset.brasil)
      .geometry();
  }
  var preNames = {
    back:'6-Background 🛰️',
    fire_1:'1-Produto de fogo 1',
    fire_2:'2-Produto de fogo 2',
    convergencia:'3-Convergencia da area queimada',
    referencia:'4-Dados de Refêrencia',
    auxiliar:'5-Auxiliar',
    noData:'99-não incluir',
  };
  // --- --- background
  var collection = getCollection(options.year)
    .filterBounds(region);
  var qualityMosaic = collection.qualityMosaic('minimo nbr').clip(region);
  var obj = {};
  var position = 0;
  obj = {
    eeObject:qualityMosaic,
    name: preNames['back'] + ' | ' + options.year +' || Mosaico do minimo NBR',
    visParams:visParams.landsat
  };
  plotLayer(obj,position);
  var median = collection.median().clip(region);
  position = position + 1;
  obj = {
    eeObject:median,
    name:preNames['back'] + ' | ' + options.year +' || Mosaico da mediana',
    visParams:visParams.landsat
  };
  plotLayer(obj,position);
  var delta = qualityMosaic.subtract(median).clip(region);
  position = position + 1;
  obj = {
    eeObject:delta,
    name:preNames['back'] + ' | ' + options.year +' || Delta (minimo NBR - mediana)',
    visParams:visParams.landsat
  };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
    eeObject:qualityMosaic,
    name:preNames['back'] + ' | ' + options.year +' || Flag temporal (minimo NBR)',
    visParams:visParams.timeFlag
  };
  plotLayer(obj,position);
  var mapbiomas = ee.Image(dataset.mapbiomas)
    .select('classification_' + (options.year - 1))
    .clip(region);
  var name_mapbiomas = preNames['back'] + ' | ' + (options.year-1) +' || Cobertura Mapbiomas col 5 '+ (options.year-1)
  if (options.year === 1985){
    mapbiomas = ee.Image(dataset.mapbiomas)
      .select('classification_' + (options.year))
      .clip(region);
  }
  position = position + 1;
  obj = {
    eeObject:mapbiomas,
    name:name_mapbiomas,
    visParams:visParams.mapbiomas
  };
  plotLayer(obj,position);
  // --- --- area queimada 1
  var frequence_1 = frequence(options.fire_1).clip(region);
  position = position + 1;
  obj = {
    eeObject:frequence_1,
    name: preNames['fire_1'] + ' | ' + options.year +' || Frequência ' + options.fire_1 + '('+ options.dictYears[options.fire_1].start + '-' + options.dictYears[options.fire_1].end + ')',
    visParams:visParams.frequenceFire_1
  };
  if (options.firstRound === true){
  obj = {
    eeObject:frequence_1,
    name: preNames['fire_1'] + ' | ' + options.year +' || Frequência ' + options.fire_1 + '('+ options.dictYears[options.fire_1].start + '-' + options.dictYears[options.fire_1].end + ')',
    visParams:visParams.frequenceFire_1,
    shown:true
  };
  }
  plotLayer(obj,position);
  var fire_1 = ee.Image().select();
  var name_fire1 = preNames['noData'] + ' | '+' || ' + ' não há dados ' + options.fire_1 + ' p/ '+ options.year;
  var name_months_fire1 = preNames['noData'] + ' | '+' || ' + ' não há dados ' + options.fire_1 + ' p/ '+ options.year;
  if (options.year >= options.dictYears[options.fire_1].start){
    // print('entrou no primeiro if')  ;
    if (options.year <= options.dictYears[options.fire_1].end ) {
      // print('entrou no segundo if');
      fire_1 = getFire(options.fire_1, options.year).clip(region);
      name_fire1 = preNames['fire_1'] + ' | ' + options.year +' || Cicatrizes de fogo ' + options.fire_1;
      name_months_fire1 = preNames['fire_1'] + ' | ' + options.year +' || Cicatrizes Mensais ' + options.fire_1;
    }
  } 
  var name_mapbiomas_fire1 = preNames['fire_1'] + ' | ' + (options.year-1) +' || Cobertura de cicatrizes ' + options.fire_1;
  var mapbiomas_fire1 = mapbiomas.updateMask(fire_1);
  position = position + 1;
  obj = {
    eeObject:mapbiomas_fire1,
    name: name_mapbiomas_fire1,
    visParams:visParams.mapbiomas
  };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
    eeObject: fire_1,
    name: name_months_fire1,
    visParams: visParams.months_pallete,
  };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
    eeObject: fire_1,
    name: name_fire1,
    visParams: visParams.fire_1
  };
  plotLayer(obj,position);
  // --- --- area queimada 2
  var frequence_2 = frequence(options.fire_2).clip(region);
  position = position + 1;
  obj = {
    eeObject:frequence_2,
    name: preNames['fire_2'] + ' | ' + options.year +' || Frequência ' + options.fire_2 + '('+ options.dictYears[options.fire_2].start + '-' + options.dictYears[options.fire_2].end + ')',
    visParams:visParams.frequenceFire_2
  };
  plotLayer(obj,position);
  var fire_2 = ee.Image().select();
  var name_fire2 =preNames['noData'] + ' | '+' || ' + ' não há dados ' + options.fire_2 + ' p/ '+ options.year;
  var name_months_fire2 =preNames['noData'] + ' | '+' || ' + ' não há dados ' + options.fire_2 + ' p/ '+ options.year;
  if (options.year >= options.dictYears[options.fire_2].start){
    // print('entrou no primeiro if')  ;
    if (options.year <= options.dictYears[options.fire_2].end ) {
      // print('entrou no segundo if');
      fire_2 = getFire(options.fire_2, options.year).clip(region);
      name_fire2 = preNames['fire_2'] + ' | ' + options.year +' || Cicatrizes de fogo ' + options.fire_2;
      name_months_fire2 = preNames['fire_2'] + ' | ' + options.year +' || Cicatrizes Mensais ' + options.fire_2;
    }
  } 
  var name_mapbiomas_fire2 = preNames['fire_2'] + ' | ' + (options.year-1) +' || Cobertura de cicatrizes ' + options.fire_2;
  var mapbiomas_fire2 = mapbiomas.updateMask(fire_2);
    mapbiomas_fire2 = ee.Image().select();
  position = position + 1;
  obj = {
    eeObject:mapbiomas_fire2,
    name: name_mapbiomas_fire2,
    visParams:visParams.mapbiomas
  };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
    eeObject:fire_2,
    name: name_months_fire2,
    visParams:visParams.months_pallete,
  };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
    eeObject:fire_2,
    name: name_fire2,
    visParams:visParams.fire_2
  };
  plotLayer(obj,position);
  //  convergencia da area queimada
  var convergencia = ee.Image().select();
  var name_convergencia = preNames['convergencia'] +' | ' + options.year +' || não foi possivel observar convergencia';  
    if (options.year >= options.dictYears[options.fire_1].start){
      if (options.year <= options.dictYears[options.fire_1].end ) {
        if (options.year >= options.dictYears[options.fire_2].start){
          if (options.year <= options.dictYears[options.fire_2].end ) {
            convergencia = fire_1.updateMask(fire_2);
            convergencia = ee.Image(1)
              .updateMask(convergencia)
              .rename('FireYear_'+options.year)
              .set({
                address_1:options.fire_1,
                address_2:options.fire_2,
                year:options.year
              });
            name_convergencia = preNames['convergencia'] +' | ' + options.year +' || Convergencia das cicatrizes';  
          }
        }
      }
    }
  position = position + 1;
  obj = {
      eeObject:convergencia,
      name: name_convergencia,
      visParams:visParams.convergencia
    };
  plotLayer(obj,position);
  options.fires.forEach(function(fire){
    var fireName =  preNames['noData'] + ' | '+' || ' + ' não há dados ' + fire + ' p/ '+ options.year;
    var fireImage = ee.Image().select();
    if (options.year >= options.dictYears[fire].start){
      if (options.year <= options.dictYears[fire].end ) {
        fireName = preNames['referencia'] + ' | ' + options.year +' || Cicatrizes de fogo ' + fire;
        fireImage = getFire(fire, options.year).clip(region);
      }
    }
    position = position + 1;
    obj = {
        eeObject: fireImage,
        name: fireName,
        visParams:visParams[fire + '_other']
      };
    plotLayer(obj,position);
  });
  // dados auxiliares
  var gridLandsat = ee.FeatureCollection(dataset.gridLandsat)
    .filterBounds(region);
  gridLandsat = ee.Image(1).paint(gridLandsat,'000000',0.5);
  gridLandsat = gridLandsat.updateMask(gridLandsat.eq(0));
  position = position + 1;
  obj = {
      eeObject: gridLandsat,
      name: preNames['auxiliar'] + ' | || Grid Landsat ',
      visParams: visParams.lines,
    };
  plotLayer(obj,position);
  position = position + 1;
  obj = {
      eeObject: setRegions().clip(region),
      name: preNames['auxiliar'] + ' | || Limite da região',
      visParams: visParams.line,
    };
  if (options.firstRound === true){
    obj = {
      eeObject: setRegions().clip(region),
      name: preNames['auxiliar'] + ' | || Limite da região',
      visParams: visParams.line,
      shown:true
    };
  }
  plotLayer(obj,position);
  position = position + 1;
  obj = {
      eeObject: setRegions(),
      name: preNames['auxiliar'] + ' | || Regiões do Brasil',
      visParams: visParams.line,
    };
  plotLayer(obj,position);
  var dem = ee.Image(dataset.srtm)
    .select('elevation')
    .clip(region);
  dem = ee.Terrain.aspect(dem);
  dem = dem.updateMask(dem.neq(0));
  position = position + 1;
  obj = {
      eeObject: dem,
      name: preNames['auxiliar'] + ' | || Relevo',
      visParams: visParams.dem,
    };
  plotLayer(obj,position);  
    var focosName =  preNames['noData'] + ' | '+' || ' + ' não há dados de focos de calor p/ '+ options.year;
    var focosImage_max = ee.Image().select();
    var focosImage_min = ee.Image().select();
    if (options.year >= options.dictYears['focos'].start){
      if (options.year <= options.dictYears['focos'].end ) {
        focosName = preNames['auxiliar'] + ' | || Focos de Calor';
        focosImage_max = getFocos(options.year).max().select('month').clip(region);
        focosImage_min = getFocos(options.year).min().select('month').clip(region);
      }
    }
  obj = {
      eeObject: focosImage_max,
      name: focosName + ' - max',
      visParams: visParams.months_pallete,
    };
  position = position + 1;
  plotLayer(obj,position);
  obj = {
      eeObject: focosImage_min,
      name: focosName + ' - min',
      visParams: visParams.months_pallete,
    };
  position = position + 1;
  plotLayer(obj,position);
  mapp.widgets().get(0)
    .widgets().get(0)
    .widgets().get(4)
    .clear()
    .add(subTitles());
}
function init (mapp) {
  mapp = mapp || Map;
  mapp.setOptions({
    'styles': {
      'Dark': Mapp.getStyle('Dark')
    }
  });
  // mapp.setOptions('TERRAIN');
  // plotMaps(mapp);
  var panel = ui.Panel({
    widgets:[],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{
      backgroundColor:'ffffffcc',
      position:'bottom-left',
    }
  });
  panel.add(setControl());
  mapp.add(panel);
  aktualizer(options.nRegion);
  options.firstRound = false;
  mapp.centerObject(mapp.layers().get(0).getEeObject());
}
print('inicio');
init();
print('fim');