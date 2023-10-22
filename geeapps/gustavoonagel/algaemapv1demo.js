var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setCenter(-54.355357524029195, -25.789668935919924, 6)
var logo = ee.Image('users/gustavoonagel/Logo_AlgaeMap').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        format: 'png'
        },
    style: {stretch: 'horizontal', height: '63px', width: '150px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb);
///////////////////// TESTES PARA INSERIR A DATA DINÂMICA /////////////////
var selDateFake = ui.Button({
    label: "Select a date",
    onClick: Mensagem,
  })
var buttonFake = ui.Button({
  label: "Display Image",
  onClick: Mensagem,
})
function Mensagem() {
    var LABEL_STYLE1 = {
    color: '#ff0000',
    position: 'top-right',
    fontSize: '15px',
  };
  var Warning = ui.Label('Please, select the Region ---> ', LABEL_STYLE1)
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var dataset = JRC.select('occurrence').eq(90)
  var visualization = {
    palette: ['00BFFF	']
  };
  Map.clear()
  Map.add(Warning)
  Map.add(selDateFake)
  Map.add(buttonFake)
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  Map.addLayer(dataset.clipToCollection(Reservatorios), visualization, 'Water Bodies');
}
Map.add(selDateFake)
Map.add(buttonFake)
///////////// Define the coordinates /////////////////////////////////////////////
var lon = ui.Textbox({
  placeholder: 'Longitude',
  style: {maxWidth: 10, width: 10, whiteSpace: 'pre'},
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
var lat = ui.Textbox({
  placeholder: 'Latitude',
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
var Lo;
var La;
var buttonCoord = ui.Button({
  label: 'Zoom',
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La, 15);
    var point = ee.Geometry.Point([Lo, La]);
    Map.addLayer(point, {},'Point')
  }
});
////////////////////////////////////////// Shows an inicial image ////////////////////////////////
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Gray', {'Gray': GRAYMAP});
/////////////////////////////////////// Download Feature Collections //////////////////////////////
                       //// Regions
var col = ee.ImageCollection('projects/ee-algalbloom-gee4geo/assets/NDCI_daily')     //// NDCI
///// Pre Processing of the NDCI ImageCollection
var primeira = col.first();
var comdata = primeira.set('eedate', ee.Date.fromYMD(primeira.get('year'),primeira.get('month'),primeira.get('day')));
function DATA(image) {
  var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
   return image_data.select('NDCIn_mean');
} 
function FACTOR(image) {
   return image.select('NDCIn_mean').divide(1000).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']  );
} 
var col_data = col.map(DATA).map(FACTOR);
////////////////////////////////////////////////////// Define a Interest Region  //////////////
var ugrhs = ee.FeatureCollection('users/gustavoonagel/UGRHI') 
var reservatorio = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_SP_2019_Tiet') 
var reservatorio1 = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_71_2019') 
var Bacia = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Sub_bacias_17_all')
var AltoTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 6])));
var ParaibaSul = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 2])));
var TieteSorocaba = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 10])));
var PCJ = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 5])));
var RioGrande = Bacia.filter(ee.Filter.inList('fid', ee.List([ 257])));
var Paranaíba = Bacia.filter(ee.Filter.inList('fid', ee.List([ 258])));
var Paranapanema = Bacia.filter(ee.Filter.inList('fid', ee.List([ 251])));
var Itaipu = Bacia.filter(ee.Filter.inList('fid', ee.List([ 250])));
var Iguaçu = Bacia.filter(ee.Filter.inList('fid', ee.List([ 249])));
var ItaGuaçu = Itaipu.merge(Iguaçu)
var BaixoTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 19])));
var MedioTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 16])));
var AltoTiete0 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 13])));
var AltoTiete1 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 10])));
var AltoTiete2 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 5])));
var Tiete = BaixoTiete.merge(MedioTiete).merge(AltoTiete0).merge(AltoTiete1).merge(AltoTiete2)
// Rio Alto Tietê
var Billings = reservatorio.filter(ee.Filter.inList('gid', ee.List([38060])))
var Guarapiranga = reservatorio.filter(ee.Filter.inList('gid', ee.List([42615])))
var taiaçupeba = reservatorio.filter(ee.Filter.inList('gid', ee.List([60600])))
var RioJundia = reservatorio.filter(ee.Filter.inList('gid', ee.List([20232])))
var Henry = reservatorio1.filter(ee.Filter.inList('gid', ee.List([62798])))
var Paiva = reservatorio1.filter(ee.Filter.inList('gid', ee.List([159])))
var Ponte = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61734])))
// Paraíba do Sul
var Paraibuna1 = reservatorio.filter(ee.Filter.inList('gid', ee.List([61838])))
var Paraibuna2 = reservatorio.filter(ee.Filter.inList('gid', ee.List([241755])))
var SantaBranca = reservatorio.filter(ee.Filter.inList('gid', ee.List([13716])))
var Jaguari = reservatorio.filter(ee.Filter.inList('gid', ee.List([61660])))
var FunilRJ = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61857])))
// Tiete
var TresIsmaos = reservatorio.filter(ee.Filter.inList('gid', ee.List([26014])))
var NovaAvanhandava = reservatorio.filter(ee.Filter.inList('gid', ee.List([61750])))
var Promissao = reservatorio.filter(ee.Filter.inList('gid', ee.List([56441])))
var Ibitinga = reservatorio.filter(ee.Filter.inList('gid', ee.List([11638])))
var Bariri = reservatorio.filter(ee.Filter.inList('gid', ee.List([51649])))
var BarraBonita = reservatorio.filter(ee.Filter.inList('gid', ee.List([987])))
var Ituparanga = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61946])))
// PCJ
var Jacareí = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241712]))) // tá com problema
var RioCachoeira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61913])))
var RioAtibainha = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61664])))
// RIO GRANDE
var Camargos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([40841])))
var Funil = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241659])))
var Furnas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61269])))
var Caconde = reservatorio1.filter(ee.Filter.inList('gid', ee.List([10080])))
var Mascarenhas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241722])))
var Estreito = reservatorio1.filter(ee.Filter.inList('gid', ee.List([3793])))
var Jaguara = reservatorio1.filter(ee.Filter.inList('esp_cd', ee.List([3793])))    ///// Rever
var VoltaGrande = reservatorio1.filter(ee.Filter.inList('gid', ee.List([58363])))
var PortoColombia = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42064])))
var Igarapava = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61791])))
var Marimbondo = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61368])))
var AguaVermelha = reservatorio1.filter(ee.Filter.inList('gid', ee.List([50605])))
// RIO PARANAÍBA
var NovaPonte = reservatorio1.filter(ee.Filter.inList('gid', ee.List([56763])))
var Emborcação = reservatorio1.filter(ee.Filter.inList('gid', ee.List([11402])))
var SerradoFacão = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41800])))
var Miranda = reservatorio1.filter(ee.Filter.inList('gid', ee.List([9916])))
var AmadorAguiarI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([31579])))
var AmadorAguiarII = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61057])))
var Itumbiara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([45804])))
var CorumbáI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([1048])))
var CachoeiraDourada = reservatorio1.filter(ee.Filter.inList('gid', ee.List([23514])))
var SãoSimão = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61180])))
var IlhaSolteira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([687])))
// Paranapanema
var GovJaimeCanet = reservatorio1.filter(ee.Filter.inList('gid', ee.List([26145])))
var Jurumirim = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42174])))
var Chavantes = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61492])))
var CanoasII = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241717])))
var CanoasI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241718])))
var Capivara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([990])))
var Taquaruçu = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241233])))
var Rosana = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241780])))
// ITAIPU AND IGUAÇU
var ItaipuBinacional = reservatorio1.filter(ee.Filter.inList('gid', ee.List([53479])))
var GovernadorBentoMunhoz = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41764])))
var GovernadorNeyAminthas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([18706])))
var SaltoSantiago = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61853])))
var SaltoOsório = reservatorio1.filter(ee.Filter.inList('gid', ee.List([6269])))
var SaltoCaxias = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61922])))
var BaixoIguaçu = reservatorio1.filter(ee.Filter.inList('gid', ee.List([242711])))
// Região Sul
var RS = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/RS_UY') 
var LagosdosPatos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([671])))
var LagoaMirim = reservatorio1.filter(ee.Filter.inList('gid', ee.List([412])))
var LagoaMangueira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([83])))
var SantaBárbara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([8824])))
var Chasqueiro = reservatorio1.filter(ee.Filter.inList('gid', ee.List([24855])))
var List = {
  '....... Reserv. Billings': Billings,
  '....... Reserv. Guarapiranga': Guarapiranga,
};
///////////////// Create a Panel ////////////////////////////////
var Reservatorios = ee.FeatureCollection(reservatorio.merge(reservatorio1))
var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
var JRC = JRC.select('occurrence')
JRC = JRC.updateMask(JRC.gte(50));
var agua1 = JRC.clipToCollection(Reservatorios)
var agua = JRC
var visualization = {
  palette: ['00BFFF	']
};
Map.addLayer(agua1, visualization, 'Water Bodies');
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
var panel = ui.Panel({
  style:{width:"460px",backgroundColor:"white", border:"2px solid black"} })
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Algae Bloom Monitoring System - Latin America',
    style: {fontSize: '18px', fontWeight: 'bold'}
  }),
  ui.Label('         ')]);
var select = ui.Select({
  items:Object.keys(List),
  onChange: getDate,
  placeholder: "Select a Region of Interest",
  style: {stretch: 'horizontal', maxHeight: '24px'},})
var button = ui.Button({
  label: "Calculate Time-Series",
  onClick: updateMap,     ////////////////// Quero colocar getDate junto
  style: {stretch: 'horizontal', maxHeight: '24px'}
})
/////////////////////////////// Choose the interest months ////////////////////////////
var Meses = {
  'January' : 1,
  'February' : 2,
  'March' : 3,
  'April': 4, 
  'May': 5, 
  'June': 6,
  'July': 7, 
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12};
var Mes1 = ui.Select({
  placeholder: "Jan - Dec",
  items: Object.keys(Meses),})
var Mes2 = ui.Select({
  placeholder: "Jan - Dec",
  items: Object.keys(Meses),})
/////////////////////////////// Choose the Interest Year //////////////////////////////
var Anos = {
  '2015' : 2015,
  '2016' : 2016,
  '2017' : 2017,
  '2018': 2018, 
  '2019': 2019, 
  '2020': 2020,
  '2021': 2021
};
var Ano1 = ui.Select({
  placeholder: "2015 - 2020",
  items: Object.keys(Anos),})
var Ano2 = ui.Select({
  placeholder: "2015 - 2020",
  items: Object.keys(Anos),})
/////////////////////////////////////// FUNCTION TO PROCESS TIME SERIES ////////////////
function updateMap(region3, selection, fromDate, toDate, Month1, Month2) {
  Map.clear()
  region3 = List[select.getValue()]
  /////// Extract the Year and Month
  var Ano11 = Ano1.getValue()
  fromDate = Anos[Ano11]
  var Ano22 = Ano2.getValue()
  toDate = Anos[Ano22]
  var Mes11 = Mes1.getValue()
  Month1 = Meses[Mes11]
  var Mes22 = Mes2.getValue()
  Month2 = Meses[Mes22]
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');    
  var JRC = JRC.select('occurrence')
  var BB_mask = JRC.updateMask(JRC.gte(50));
  var recorte = function(image) {                                                 //// Clip the region
    return image.clipToCollection(region3).copyProperties(image);
  };
  var collection1 = col_data                                                        //// Filter the Dates
                    .filterMetadata("year","less_than",toDate + 1)
                    .filterMetadata("year","greater_than",fromDate - 1)
                    .filterMetadata("month","less_than",Month2 + 1)
                    .filterMetadata("month","greater_than",Month1 - 1)
  var decision_tree = function(image){                                              //// Calculate the Chla 
    var NDCI = image.select('NDCIn_mean').updateMask(JRC.gte(50))
    var Bloom = NDCI.gte(0.025).rename('Bloom')
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {    // 18.45 * ((NDCI + 1) ** 9.23
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla');
    return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
  };
  var chla = collection1.map(decision_tree)
  var BloomFreq = chla.select('Bloom').sum().divide(chla.select('Bloom').count()).updateMask(JRC.gte(50));                                            //// Calculate the Bloom Frequency
  var centre = List[select.getValue()].geometry().centroid().coordinates();                     ///// Define the image center
  Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
  var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
  var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for Bloom
  var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for Bloom
  var palettes = require('users/gena/packages:palettes');                                       //// Color Scale for Bloom
  var vis1 = {min:0, max:1, palette: palettes.cmocean.Balance[7]};                                     //// Color Scale for Bloom
  Map.addLayer(BloomFreq.clip(region3), vis1, 'Bloom Frequency', false);//// Add the mean Chla Image; 
  Map.addLayer(chla.select('Chla').mean().clip(region3).updateMask(JRC.gte(50)), vis, 'Chl-a Temporal MEAN')
  Map.addLayer(chla.select('Chla').min().clip(region3).updateMask(JRC.gte(50)), vis, 'Chl-a Temporal MINIMUM', false)
  Map.addLayer(chla.select('Chla').max().clip(region3).updateMask(JRC.gte(50)), vis, 'Chl-a Temporal MAXIMUM', false);
  Map.addLayer(chla.select('NDCIn_mean').mean().clip(region3).updateMask(JRC.gte(50)), visNDCI, 'NDCI Temporal MEAN', false)
  Map.addLayer(chla.select('NDCIn_mean').max().clip(region3).updateMask(JRC.gte(50)), visNDCI, 'NDCI Temporal MAXIMUM', false);
  Map.addLayer(chla.select('NDCIn_mean').min().clip(region3).updateMask(JRC.gte(50)), visNDCI, 'NDCI Temporal MINIMUM', false)
  var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) ///// nagel
  var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
  var dataset = ee.Image(chla.mean().clip(region3))
  var dataset1 = ee.Image(BloomFreq.clip(region3))
  Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                     'lat: ' + coords.lat.toFixed(4);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Mean Chla: ' + val.Chla.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      var demValue2 = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val2){
        var demText2 = 'Mean NDCI: ' + val2.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(3, ui.Label(demText2));
      });
      var demValue1 = dataset1.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val1){
        var demText1 = 'Bloom Frequency: ' + val1.Bloom.toFixed(2);
        toolPanel.widgets().set(4, ui.Label(demText1));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."))
      toolPanel.widgets().set(3, ui.Label("loading..."))
      toolPanel.widgets().set(4, ui.Label("loading..."));
      Map.add(toolPanel);
    });
  //////// Legend for Chla 
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
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 8px'}),
      ui.Label(
          (vis.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: 'Chla Temporal (min, max, mean)',
    style: {fontWeight: 'bold'}
  }); 
  /////// Legend for Algal Bloom
  var palettes = require('users/gena/packages:palettes');
  var vis1 = {min:0, max:1, palette: palettes.cmocean.Balance[7]};
  function makeColorBarParams1(palette) {
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
  var colorBar1 = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams1(vis1.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels1 = ui.Panel({
    widgets: [
      ui.Label(vis1.min, {margin: '4px 8px'}),
      ui.Label(
          (vis1.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis1.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle1 = ui.Label({
    value: 'Bloom Frequency',
    style: {fontWeight: 'bold'}
  });
  var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
  });
  ////////// NDCI Legend
  function makeColorBarParams2(palette) {
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
  var colorBar2 = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams2(visNDCI.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels2 = ui.Panel({
    widgets: [
      ui.Label(visNDCI.min, {margin: '4px 8px'}),
      ui.Label(
          (visNDCI.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(visNDCI.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle2 = ui.Label({
    value: 'NDCI',
    style: {fontWeight: 'bold'}
  });
  var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }
  });
  var legend = legend.add(legendTitle2).add(colorBar2).add(legendLabels2).add(legendTitle).add(colorBar).add(legendLabels).add(legendTitle1).add(colorBar1).add(legendLabels1)
  Map.add(legend);
  var GRAYMAP = [
  {   // Dial down the map saturation.
  stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
  elementType: 'labels',
  stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
  featureType: 'road',
  elementType: 'geometry',
  stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
  featureType: 'road',
  elementType: 'labels',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
  elementType: 'labels.icon',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
  featureType: 'poi',
  elementType: 'all',
  stylers: [ { visibility: 'off' }]
  }
  ];
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  /////// Add Chla Download button
  var img = chla.select('Chla').mean().clip(region3)
  function downloadImg() {
    var downloadArgs = {
      name: 'Chla_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url = img.getDownloadURL(downloadArgs);
   urlLabel.setUrl(url);
   urlLabel.style().set({shown: true});
  }
  var downloadButton = ui.Button('Download Mean Chl-a', downloadImg);
  var urlLabel = ui.Label('Download', {shown: false});
  var panel = ui.Panel([downloadButton, urlLabel]);
  //Map.add(panel);
  /////// Add Chla Download button
  var img1 = chla.select('NDCIn_mean').mean().clip(region3)
  function downloadImg1() {
    var downloadArgs1 = {
      name: 'NDCI_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url1 = img1.getDownloadURL(downloadArgs1);
   urlLabel1.setUrl(url1);
   urlLabel1.style().set({shown: true});
  }
  var downloadButton1 = ui.Button('Download Mean NDCI', downloadImg1);
  var urlLabel1 = ui.Label('Download', {shown: false});
  var panel1 = ui.Panel([downloadButton1, urlLabel1]);
  //Map.add(panel1);
  /////// Add Bloom Download button
  var img2 = BloomFreq.clip(region3)
  function downloadImg2() {
    var downloadArgs2 = {
      name: 'Bloom_Frequency',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url2 = img2.getDownloadURL(downloadArgs2);
   urlLabel2.setUrl(url2);
   urlLabel2.style().set({shown: true});
  }
  var downloadButton2 = ui.Button('Download Bloom Frequency', downloadImg2);
  var urlLabel2 = ui.Label('Download', {shown: false});
  var panel2 = ui.Panel([downloadButton2, urlLabel2]);
  //Map.add(panel2);
  var legendDownload = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
    });
  var legend = legendDownload.add(panel).add(panel1).add(panel2)
  Map.add(legend);
  ////////////////////// Repetir o código do Single Image Analysis
  region3 = List[select.getValue()]
  var clipe = region3.geometry()
  var visualization = {
  bands: ['occurrence'],
  min: 90,
  max: 100,
  palette: ['00BFFF	']
  };
  var collection11 = ee.ImageCollection('COPERNICUS/S2')
        .select(['B2'])
        .filterBounds(region3)
        // Pre-filter to get less cloudy granules.
        .filter(ee.Filter.neq('system:band_names', []));
  var Meses1 = collection11
    .map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})
    })
    .distinct('date')
    .aggregate_array('date')
  var selDate11 = ui.Select({
    placeholder: "Select a date",
  })
  var dateList1 = Meses1
  var selDate1 = ui.Select({placeholder: "Select a date", items: dateList1.getInfo()})
  var button1 = ui.Button({
  label: "Display Image",
  onClick: updateMap1
  })
  var panelSingleChla = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
  })
  //ui.root.add(panelSingleChla.add(selDate1).add(button1))
  Map.add(selDate1)
  Map.add(button1)
  function updateMap1(region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
      Map.clear()
      Map.add(selDate1)
      Map.add(button1)
      var fromDateSentinel = ee.Date(selDate1.getValue()).advance(-1,"day").format("yyyy-MM-dd");
      var toDateSentinel = ee.Date(selDate1.getValue()).advance(+3,"day").format("yyyy-MM-dd");
      var Sentinel = ee.ImageCollection('COPERNICUS/S2')
        .filterDate(fromDateSentinel, toDateSentinel)
        .select(['B4', 'B3', 'B2'])
        .filterBounds(region3)
      var rgbVis = {
        min: 300,
        max: 1300,
        bands: ['B4', 'B3', 'B2'],
      };
      Map.addLayer(Sentinel, rgbVis, 'Sentinel RGB')  
      fromDate1Year = ee.Date(selDate1.getValue()).format("yyyy"); 
      fromDate1Month = ee.Date(selDate1.getValue()).format("MM");  
      fromDate1Day = ee.Date(selDate1.getValue()).format("dd");          ////////// Colocar Equal
      region1 = List[select.getValue()]
        ////////// Threshold para detect just information within Pekel polygons //////////////////////////////
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');    
      var JRC = JRC.select('occurrence')
      var BB_mask = JRC.updateMask(JRC.gte(50));
        ///////////////////////////// IMAGE SENTINEL ///////////////////////////
      var collection2 = col_data                                                        //// Filter the Dates
                        .filterMetadata("year","equals", ee.Number.parse(fromDate1Year))
                        .filterMetadata("month","equals", ee.Number.parse(fromDate1Month))
                        .filterMetadata("day","equals", ee.Number.parse(fromDate1Day))
      //mvar Filter = ee.Filter.and(ee.Filter.eq('month', fromDate1Month), ee.Filter.eq('year', fromDate1Year), ee.Filter.eq('day', fromDate1Day));
      // var collection2 = collection2.filter(Filter)
      //////////Função para calcular o Chla
      var decision_tree = function(image){                                              //// Calculate the Chla 
        var NDCI = image.select('NDCIn_mean').updateMask(JRC.gte(50))
        var Bloom = NDCI.gte(0.025).rename('Bloom')
        var chla = image.expression(
          '(24.49 * ((NDCI + 1) ** 7.48))', {
            'NDCI': image.select('NDCIn_mean'),
          });
        var chla = chla.rename('Chla');
        return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
      };
      var chla1 = collection2.map(decision_tree).mean()
      // Definir o centro da imagem
      var centre1 = List[select.getValue()].geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
      var VisParamWar1 = {"bands":["Chla"],"min":0,"max":100, palette: ['blue','green','Yellow','red']};
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
      var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for Bloom
      var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for Bloom
      var vis1 = {min:0, max:1, palette: ['000000', '00FF00']}; 
      collection2 = collection2.mean()
      var slice = collection2.expression(
            "(b('NDCIn_mean') > 0.1265) ? 5" +
            ": (b('NDCIn_mean') > 0.0245) ? 4" +
            ": (b('NDCIn_mean') > -0.0934) ? 3" +
            ": (b('NDCIn_mean') > -0.13) ? 2" +
            ": (b('NDCIn_mean') > -0.30) ? 1" +
            ": -99" );
      var mask2 = slice.neq(-99)
      var slicename = slice.rename(['NDCI_class']).updateMask(mask2);
      var visIET = {min:1, max:5, palette: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000']}; // Arrumado
      Map.addLayer(slicename.select('NDCI_class').clip(region1), visIET, 'TSI Classes', false)
      Map.addLayer(chla1.select('Bloom').clip(region1), vis1, 'BLOOM', false)
      Map.addLayer(chla1.select('Chla').clip(region1), vis, 'Chl-a Concentration')
      Map.addLayer(chla1.select('NDCIn_mean').clip(region1), visNDCI, 'NDCI value', false)
      ///////////////Create a legend
      // Creates a color bar thumbnail image for use in legend from the given color
      // palette.
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};
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
        params: makeColorBarParams(vis.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendLabels = ui.Panel({
        widgets: [
          ui.Label(vis.min, {margin: '4px 8px'}),
          ui.Label(
              (vis.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(vis.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var legendTitle = ui.Label({
        value: 'Concentration of Chla',
        style: {fontWeight: 'bold'}
      });
      // Add the legendPanel to the map.
      /////// Legend for Algal Bloom
      function makeColorBarParams1(palette) {
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
      var colorBar1 = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams1(vis1.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legend1 = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '8px 15px'
      }
      });
      // Creates and styles 1 row of the legend.
      var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          // Create the label filled with the description text.
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          // return the panel
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle1 = ui.Label({
        value: 'Bloom',
        style: {fontWeight: 'bold'}
      });
      var palette = ['000000', '00FF00'];
      // name of the legend
      var names = ['Non-Bloom','Bloom'];
      // Add color and and names
      for (var i = 0; i < 2; i++) {
        legend1.add(makeRow(palette[i], names[i]));
        }  
       /////// Legend for classes IET
      function makeColorBarParamsIET(palette) {
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
      var colorBarIET = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParamsIET(visIET.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendIET = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '8px 15px'
      }
      });
      // Creates and styles 1 row of the legend.
    var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          // Create the label filled with the description text.
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          // return the panel
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitleIET = ui.Label({
        value: 'TSI Classes',
        style: {fontWeight: 'bold'}
      });
      var paletteIET = ['0000FF', '00FFFF', '008000', 'FFBF00', 'FF0000'];  // arrumado
      // name of the legend
      var namesIET = ['Oligo','Meso', 'Eutrophic','Super', 'Hyper'];
      // Add color and and names
      for (var i = 0; i < 5; i++) {
        legendIET.add(makeRow(paletteIET[i], namesIET[i]));
        }  
      ////////// NDCI Legend
      function makeColorBarParams2(palette) {
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
      var colorBar2 = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams2(visNDCI.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendLabels2 = ui.Panel({
        widgets: [
          ui.Label(visNDCI.min, {margin: '4px 8px'}),
          ui.Label(
              (visNDCI.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(visNDCI.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var legendTitle2 = ui.Label({
        value: 'NDCI',
        style: {fontWeight: 'bold'}
      });
      var legend = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      var legend = legend.add(legendTitle2).add(colorBar2).add(legendLabels2).add(legendTitle).add(colorBar).add(legendLabels).add(legendTitle1).add(legend1).add(legendTitleIET).add(legendIET)
      Map.add(legend);
      var GRAYMAP = [
      {   // Dial down the map saturation.
      stylers: [ { saturation: -100 } ]
      },{ // Dial down the label darkness.
      elementType: 'labels',
      stylers: [ { lightness: 20 } ]
      },{ // Simplify the road geometries.
      featureType: 'road',
      elementType: 'geometry',
      stylers: [ { visibility: 'simplified' } ]
      },{ // Turn off road labels.
      featureType: 'road',
      elementType: 'labels',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all icons.
      elementType: 'labels.icon',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all POIs.
      featureType: 'poi',
      elementType: 'all',
      stylers: [ { visibility: 'off' }]
      }
      ];
      Map.setOptions('Gray', {'Gray': GRAYMAP});
      /////// Add Chla Download button
      var mask = ee.Image.constant(1).clip(region1.geometry()).mask().not()
      var img = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg() {
        var downloadArgs = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url = img.getDownloadURL(downloadArgs);
       urlLabel.setUrl(url);
       urlLabel.style().set({shown: true});
      }
      var downloadButton = ui.Button('Download Chl-a', downloadImg);
      var urlLabel = ui.Label('Download', {shown: false});
      var panel = ui.Panel([downloadButton, urlLabel]);
      //Map.add(panel);
      /////// Add Chla Download button
      var img1 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg1() {
        var downloadArgs1 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url1 = img1.getDownloadURL(downloadArgs1);
       urlLabel1.setUrl(url1);
       urlLabel1.style().set({shown: true});
      }
      var downloadButton1 = ui.Button('Download NDCI', downloadImg1);
      var urlLabel1 = ui.Label('Download', {shown: false});
      var panel1 = ui.Panel([downloadButton1, urlLabel1]);
      //Map.add(panel1);
      /////// Add Bloom Download button
      var img2 = chla1.select('Bloom').clip(region1)
      function downloadImg2() {
        var downloadArgs2 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url2 = img2.getDownloadURL(downloadArgs2);
       urlLabel2.setUrl(url2);
       urlLabel2.style().set({shown: true});
      }
      var downloadButton2 = ui.Button('Download Bloom Class', downloadImg2);
      var urlLabel2 = ui.Label('Download', {shown: false});
      var panel2 = ui.Panel([downloadButton2, urlLabel2]);
      //Map.add(panel2);
      /////// Add IET Download button
      var img3 = chla1.select('NDCI_class').clip(region1)
      function downloadImg3() {
        var downloadArgs3 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url3 = img3.getDownloadURL(downloadArgs3);
       urlLabel3.setUrl(url3);
       urlLabel3.style().set({shown: true});
      }
      var downloadButton3 = ui.Button('Download TSI Class', downloadImg3);
      var urlLabel3 = ui.Label('Download', {shown: false});
      var panel3 = ui.Panel([downloadButton3, urlLabel3]);
      //Map.add(panel3);
      var legendDownload = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
          position: 'bottom-left',
          padding: '8px 15px'
        }
        });
      var legend = legendDownload.add(panel).add(panel1).add(panel2).add(panel3)
      Map.add(legend);
    var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) ///// nagel
    var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
    var dataset = ee.Image(chla1.clip(region1))
    Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                     'lat: ' + coords.lat.toFixed(4);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Chla: ' + val.Chla.toFixed(2) + '   ' + 'NDCI: ' + val.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."));
      Map.add(toolPanel);
    });
          } /////////////////////////////////////
}
/////////////////////////////// OME IMAGE ANALYSIS ////////////////////////////
/////////// FUNÇÃO TESTE PARA CALCULAR A LISTA DE DATAS /////////////////////////////////////
function getDate(region3, region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
  Map.clear()
  var GRAYMAP = [
  {   // Dial down the map saturation.
  stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
  elementType: 'labels',
  stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
  featureType: 'road',
  elementType: 'geometry',
  stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
  featureType: 'road',
  elementType: 'labels',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
  elementType: 'labels.icon',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
  featureType: 'poi',
  elementType: 'all',
  stylers: [ { visibility: 'off' }]
  }
  ];
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  var centre1 = List[select.getValue()].geometry().centroid().coordinates();
  Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
  region3 = List[select.getValue()]
  var clipe = region3.geometry()
  var visualization = {
  bands: ['occurrence'],
  min: 90,
  max: 100,
  palette: ['00BFFF	']
  };
  Map.addLayer(agua.clip(clipe), visualization, 'Water Bodies');
  var collection11 = ee.ImageCollection('COPERNICUS/S2')
        .select(['B2'])
        .filterBounds(region3)
        // Pre-filter to get less cloudy granules.
        .filter(ee.Filter.neq('system:band_names', []))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',90));
  var Meses1 = collection11
    .map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})
    })
    .distinct('date')
    .aggregate_array('date')
  var selDate11 = ui.Select({
    placeholder: "Select a date",
  })
  var dateList1 = Meses1
  var selDate1 = ui.Select({placeholder: "Select a date", items: dateList1.getInfo()})
  var button1 = ui.Button({
  label: "Display Image",
  onClick: updateMap1
  })
  var panelSingleChla = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
  })
  //ui.root.add(panelSingleChla.add(selDate1).add(button1))
  Map.add(selDate1)
  Map.add(button1)
  function updateMap1(region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
      Map.clear()
      Map.add(selDate1)
      Map.add(button1)
      var fromDateSentinel = ee.Date(selDate1.getValue()).advance(-1,"day").format("yyyy-MM-dd");
      var toDateSentinel = ee.Date(selDate1.getValue()).advance(+3,"day").format("yyyy-MM-dd");
      var Sentinel = ee.ImageCollection('COPERNICUS/S2')
        .filterDate(fromDateSentinel, toDateSentinel)
        .select(['B4', 'B3', 'B2'])
        .filterBounds(region3)
      var rgbVis = {
        min: 300,
        max: 1300,
        bands: ['B4', 'B3', 'B2'],
      };
      Map.addLayer(Sentinel, rgbVis, 'Sentinel RGB')    
      fromDate1Year = ee.Date(selDate1.getValue()).format("yyyy"); 
      fromDate1Month = ee.Date(selDate1.getValue()).format("MM");  
      fromDate1Day = ee.Date(selDate1.getValue()).format("dd");          ////////// Colocar Equal
      region1 = List[select.getValue()]
        ////////// Threshold para detect just information within Pekel polygons //////////////////////////////
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');    
      var JRC = JRC.select('occurrence')
      var BB_mask = JRC.updateMask(JRC.gte(50));
        ///////////////////////////// IMAGE SENTINEL ///////////////////////////
      var collection2 = col_data                                                        //// Filter the Dates
                        .filterMetadata("year","equals", ee.Number.parse(fromDate1Year))
                        .filterMetadata("month","equals", ee.Number.parse(fromDate1Month))
                        .filterMetadata("day","equals", ee.Number.parse(fromDate1Day))
      //mvar Filter = ee.Filter.and(ee.Filter.eq('month', fromDate1Month), ee.Filter.eq('year', fromDate1Year), ee.Filter.eq('day', fromDate1Day));
      // var collection2 = collection2.filter(Filter)
      //////////Função para calcular o Chla
      var decision_tree = function(image){                                              //// Calculate the Chla 
        var NDCI = image.select('NDCIn_mean').updateMask(JRC.gte(50))
        var Bloom = NDCI.gte(0.025).rename('Bloom')
        var chla = image.expression(
          '(24.49 * ((NDCI + 1) ** 7.48))', {
            'NDCI': image.select('NDCIn_mean'),
          });
        var chla = chla.rename('Chla').updateMask(JRC.gte(50));
        return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
      };
      var chla1 = collection2.map(decision_tree).mean().updateMask(JRC.gte(50))
      // Definir o centro da imagem
      var centre1 = List[select.getValue()].geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
      var VisParamWar1 = {"bands":["Chla"],"min":0,"max":100, palette: ['blue','green','Yellow','red']};
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
      var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for Bloom
      var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for Bloom
      var vis1 = {min:0, max:1, palette: ['000000', '00FF00']}; 
      collection2 = collection2.mean()
      var slice = collection2.expression(
            "(b('NDCIn_mean') > 0.1265) ? 5" +
            ": (b('NDCIn_mean') > 0.0245) ? 4" +
            ": (b('NDCIn_mean') > -0.0934) ? 3" +
            ": (b('NDCIn_mean') > -0.13) ? 2" +
            ": (b('NDCIn_mean') > -0.30) ? 1" +
            ": -99" );
      var mask2 = slice.neq(-99)
      var slicename = slice.rename(['NDCI_class']).updateMask(mask2);
      var visIET = {min:1, max:5, palette: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000']}; // Arrumado
      Map.addLayer(slicename.select('NDCI_class').clip(region1), visIET, 'TSI Classes', false)
      Map.addLayer(chla1.select('Bloom').clip(region1), vis1, 'BLOOM', false)
      Map.addLayer(chla1.select('Chla').clip(region1), vis, 'Chl-a Concentration')
      Map.addLayer(chla1.select('NDCIn_mean').clip(region1), visNDCI, 'NDCI value', false)
      ///////////////Create a legend
      // Creates a color bar thumbnail image for use in legend from the given color
      // palette.
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};
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
        params: makeColorBarParams(vis.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendLabels = ui.Panel({
        widgets: [
          ui.Label(vis.min, {margin: '4px 8px'}),
          ui.Label(
              (vis.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(vis.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var legendTitle = ui.Label({
        value: 'Concentration of Chla',
        style: {fontWeight: 'bold'}
      });
      // Add the legendPanel to the map.
      var legend = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      /////// Legend for Algal Bloom
      function makeColorBarParams1(palette) {
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
      var colorBar1 = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams1(vis1.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legend1 = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      // Creates and styles 1 row of the legend.
      var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          // Create the label filled with the description text.
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          // return the panel
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle1 = ui.Label({
        value: 'Bloom',
        style: {fontWeight: 'bold'}
      });
      var palette = ['000000', '00FF00'];
      // name of the legend
      var names = ['Non-Bloom','Bloom'];
      // Add color and and names
      for (var i = 0; i < 2; i++) {
        legend1.add(makeRow(palette[i], names[i]));
        }  
       /////// Legend for classes IET
      function makeColorBarParamsIET(palette) {
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
      var colorBarIET = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParamsIET(visIET.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendIET = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      // Creates and styles 1 row of the legend.
    var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          // Create the label filled with the description text.
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          // return the panel
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitleIET = ui.Label({
        value: 'TSI Classes',
        style: {fontWeight: 'bold'}
      });
      var paletteIET = ['0000FF', '00FFFF', '008000', 'FFBF00', 'FF0000']; // Arrumado
      // name of the legend
      var namesIET = ['Oligo','Meso', 'Eutrophic','Super', 'Hyper'];
      // Add color and and names
      for (var i = 0; i < 5; i++) {
        legendIET.add(makeRow(paletteIET[i], namesIET[i]));
        }  
      ////////// NDCI Legend
      function makeColorBarParams2(palette) {
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
      var colorBar2 = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams2(visNDCI.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendLabels2 = ui.Panel({
        widgets: [
          ui.Label(visNDCI.min, {margin: '4px 8px'}),
          ui.Label(
              (visNDCI.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(visNDCI.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var legendTitle2 = ui.Label({
        value: 'NDCI',
        style: {fontWeight: 'bold'}
      });
      var legend = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      var legend = legend.add(legendTitle2).add(colorBar2).add(legendLabels2).add(legendTitle).add(colorBar).add(legendLabels).add(legendTitle1).add(legend1).add(legendTitleIET).add(legendIET)
      Map.add(legend);
      var GRAYMAP = [
      {   // Dial down the map saturation.
      stylers: [ { saturation: -100 } ]
      },{ // Dial down the label darkness.
      elementType: 'labels',
      stylers: [ { lightness: 20 } ]
      },{ // Simplify the road geometries.
      featureType: 'road',
      elementType: 'geometry',
      stylers: [ { visibility: 'simplified' } ]
      },{ // Turn off road labels.
      featureType: 'road',
      elementType: 'labels',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all icons.
      elementType: 'labels.icon',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all POIs.
      featureType: 'poi',
      elementType: 'all',
      stylers: [ { visibility: 'off' }]
      }
      ];
      Map.setOptions('Gray', {'Gray': GRAYMAP});
      /////// Add Chla Download button
      var mask = ee.Image.constant(1).clip(region1.geometry()).mask().not()
      var img = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg() {
        var downloadArgs = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url = img.getDownloadURL(downloadArgs);
       urlLabel.setUrl(url);
       urlLabel.style().set({shown: true});
      }
      var downloadButton = ui.Button('Download Chl-a', downloadImg);
      var urlLabel = ui.Label('Download', {shown: false});
      var panel = ui.Panel([downloadButton, urlLabel]);
      //Map.add(panel);
      /////// Add Chla Download button 
      var img1 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg1() {
        var downloadArgs1 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url1 = img1.getDownloadURL(downloadArgs1);
       urlLabel1.setUrl(url1);
       urlLabel1.style().set({shown: true});
      }
      var downloadButton1 = ui.Button('Download NDCI', downloadImg1);
      var urlLabel1 = ui.Label('Download', {shown: false});
      var panel1 = ui.Panel([downloadButton1, urlLabel1]);
      //Map.add(panel1);
      /////// Add Bloom Download button
      var img2 = chla1.select('Bloom').clip(region1)
      function downloadImg2() {
        var downloadArgs2 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url2 = img2.getDownloadURL(downloadArgs2);
       urlLabel2.setUrl(url2);
       urlLabel2.style().set({shown: true});
      }
      var downloadButton2 = ui.Button('Download Bloom Class', downloadImg2);
      var urlLabel2 = ui.Label('Download', {shown: false});
      var panel2 = ui.Panel([downloadButton2, urlLabel2]);
      //Map.add(panel2);
      /////// Add IET Download button
      var img3 = chla1.select('NDCI_class').clip(region1)
      function downloadImg3() {
        var downloadArgs3 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url3 = img3.getDownloadURL(downloadArgs3);
       urlLabel3.setUrl(url3);
       urlLabel3.style().set({shown: true});
      }
      var downloadButton3 = ui.Button('Download TSI Class', downloadImg3);
      var urlLabel3 = ui.Label('Download', {shown: false});
      var panel3 = ui.Panel([downloadButton3, urlLabel3]);
      //Map.add(panel3);
      var legendDownload = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
          position: 'bottom-left',
          padding: '8px 15px'
        }
        });
      var legend = legendDownload.add(panel).add(panel1).add(panel2).add(panel3)
      Map.add(legend);
    var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) ///// nagel
    var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
    var dataset = ee.Image(chla1.clip(region1))
    Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(3) + ' ' +
                     'lat: ' + coords.lat.toFixed(3);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Chla: ' + val.Chla.toFixed(2) + '   ' + 'NDCI: ' + val.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."));
      Map.add(toolPanel);
    });
          } /////////////////////////////////////
        }
  // This function changes the given map to show the selected image.
///////////////////// ADICIONAR GEOMETRIA  ////////////////////////////////////////////////////
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
function chartNdviTimeSeries(Buf, Sca, fromDate, toDate, Month1, Month2) {
  //panelChart2 = panelChart2
  Buf = parseFloat(buffer.getValue())
  Sca = parseFloat(scaleNumber.getValue())
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');    
  var JRC = JRC.select('occurrence')
  var BB_mask = JRC.updateMask(JRC.gte(50));
  var Ano11 = Ano1.getValue()
  fromDate = Anos[Ano11]
  var Ano22 = Ano2.getValue()
  toDate = Anos[Ano22]
  var Mes11 = Mes1.getValue()
  Month1 = Meses[Mes11]
  var Mes22 = Mes2.getValue()
  Month2 = Meses[Mes22]
  // Make the chart panel visible the first time a geometry is drawn.
  if (!panel.style().get('shown')) {
    panel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  aoi = aoi.buffer(Buf + 1)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  ///////////// Aplicar as funções em imagens Sentinel  
  var collection1 = col_data
                    //// Filter the Dates
                    .filterMetadata("year","less_than",toDate + 1)
                    .filterMetadata("year","greater_than",fromDate - 1)
                    .filterMetadata("month","less_than",Month2 + 1)
                    .filterMetadata("month","greater_than",Month1 - 1)
                    .filter(ee.Filter.neq('system:band_names', []));
  //////////Função para calcular o Chla
  var decision_tree = function(image){                                              //// Calculate the Chla 
    var NDCI = image.select('NDCIn_mean').updateMask(JRC.gte(50))
    var Bloom = NDCI.gte(0.025).rename('Bloom')
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla');
    return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
  };
  var chla = collection1.map(decision_tree)
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image.series(chla.select(['Chla']).filter(ee.Filter.neq('system:band_names', [])), aoi,ee.Reducer.mean(),
   Sca, 'eedate').setChartType('ScatterChart')
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Chla'},
                    series: {0: {color: '23cba7'}},
                    trendlines: { 0: {showR2: false, visibleInLegend: true, color: 'blue'} , 
                    1: {showR2: false, visibleInLegend: true, color: 'blue'}} 
                  });
  var chartNDCI = ui.Chart.image.series(chla.select(['NDCIn_mean']).filter(ee.Filter.neq('system:band_names', [])), aoi,ee.Reducer.mean(),
   Sca, 'eedate').setChartType('ScatterChart')
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDCI'},
                    series: {0: {color: '23cba7'}},
                    trendlines: { 0: {showR2: false, visibleInLegend: true, color: 'blue'} , 
                    1: {showR2: false, visibleInLegend: true, color: 'blue'}} 
                  });
  var months = ee.List.sequence(Month1, Month2);
  var years = ee.List.sequence(fromDate, toDate);
  var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return collection1
        .filterMetadata("month","equals", m)
        .filterMetadata("year","equals", y)
        .mean()
        .set('month', m).set('year', y)
        .set('Date', ee.Date.fromYMD(y, m, 1, null))
  });
  }).flatten());
  // Cria uma série de dados anuais
  function NDCI_class(image) {
  var slice = image.select('NDCIn_mean')
  var Hyper = slice.gte(0.1265).rename('E - Hyper')
  var Super = slice.gte(0.0245).and(slice.lt(0.1265)).rename('D - Super')
  var Eutrofico = slice.gte(-0.0934).and(slice.lt(0.0245)).rename('C - Eutrophic')
  var Meso = slice.gte(-0.13).and(slice.lt(-0.0934)).rename('B - Meso')
  var Oligo = slice.gte(-0.30).and(slice.lt(-0.13)).rename('A - Oligo')
  return image.addBands([Oligo, Meso, Eutrofico, Super, Hyper])}
  var classe = byMonthYear.map(NDCI_class)
  var classeDaily = chla.map(NDCI_class).select(['A - Oligo', 'B - Meso', 'C - Eutrophic', 'D - Super', 'E - Hyper'])
  var classes = classe.select(['A - Oligo', 'B - Meso', 'C - Eutrophic', 'D - Super', 'E - Hyper'])
  var chart1 = ui.Chart.image.series(classes.filter(ee.Filter.neq('system:band_names', [])), aoi, ee.Reducer.sum(), Sca, 'Date')
        .setChartType('ColumnChart')
        .setOptions({
          bestEffort: true,
          maxPixels: 1e13,
          isStacked: 'relative', 
          title: 'TSI',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Classes percentage (relative)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          colors: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000'], // Arrumado
          curveType: 'function',
          bar: {groupWidth: '1000%'}
        });
  var chart2 = ui.Chart.image.series(classeDaily.filter(ee.Filter.neq('system:band_names', [])), aoi, ee.Reducer.sum(), Sca, 'eedate')
        .setChartType('ColumnChart')
        .setOptions({
          bestEffort: true,
          maxPixels: 1e13,
          isStacked: 'absolute', 
          title: 'TSI',
          hAxis: {title: 'Date (Daily Images)', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Pixel Count (absolute)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          colors: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000'], // Arrumado
          curveType: 'function',
          bar: {groupWidth: '1000%'}
        });
  byMonthYear = byMonthYear.filter(ee.Filter.neq('system:band_names', []))
  // Define GIF visualization parameters.
  var decision_tree1 = function(image){                                              //// Calculate the Chla 
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla').updateMask(JRC.gte(50));
    return chla.copyProperties(image); 
  };
  var ChlaMonth = byMonthYear.map(decision_tree1).filter(ee.Filter.neq('system:band_names', []))
  var visParams = {
  min: 0,
  max: 100,
  palette: ['blue','green','Yellow','red'],
  };
  // Create RGB visualization images for use as animation frames.
  var rgbVis = ChlaMonth.map(function(img) {
    return img.visualize(visParams);
  });
  var gifParams = {
    'region': aoi,
    'dimensions': 600,
    'crs': 'EPSG:3857',
    'framesPerSecond': 2
  };
  // Print the GIF URL to the console.
  var URL = ui.Label(rgbVis.getVideoThumbURL(gifParams)); //ui.Label.setUrl
  var URL = (ui.Label('Link to the video').setUrl(rgbVis.getVideoThumbURL(gifParams)))
  var thumb = ui.Thumbnail(rgbVis, gifParams);
  var checkBox_chart = ui.Checkbox({
  label: "Show mean Chla",
  onChange: addChart
        })
   var checkBox_chartNDCI = ui.Checkbox({
  label: "Show mean NDCI",
  onChange: addChartNDCI
        })
  var checkBox_chart1 = ui.Checkbox({
  label: "Show monthly TSI",
  onChange: addChart1
        })
  var checkBox_chart2 = ui.Checkbox({
  label: "Show daily TSI",
  onChange: addChart2
        })
  var checkBox_Thumbnail = ui.Checkbox({
  label: "Show Video",
  onChange: addChartThumbnail
        })
  function addChart (ifChecked){
    if (ifChecked) {  panelChart.add(chart)}
    else {panelChart.clear()}
  }
   function addChartNDCI (ifChecked){
      if (ifChecked) {  panelChart.add(chartNDCI)}
      else {panelChart.clear()}
    }
   function addChart1 (ifChecked){
    if (ifChecked) {  panelChart.add(chart1)}
    else {panelChart.clear()}
  }
   function addChart2 (ifChecked){
    if (ifChecked) {  panelChart.add(chart2)}
    else {panelChart.clear()}
  }
  function addChartThumbnail (ifChecked){
    if (ifChecked) {  panelChart.add(URL).add(thumb)}
    else {panelChart.clear()}
  }
  // Replace the existing chart in the chart panel with the new chart.
  Map.addLayer(aoi, {}, 'Draw Geometry (with buffer)')
  panelChart.clear()
  panelChart2.clear()
  panelChart2.add(ui.Panel([checkBox_chart, checkBox_chart1, checkBox_chart2], ui.Panel.Layout.flow('horizontal'))).add(ui.Panel([checkBox_chartNDCI, checkBox_Thumbnail], ui.Panel.Layout.flow('horizontal')))
} //////////////////////////////////////
// Definir o buffer das geometrias
var buffer = ui.Textbox({
  placeholder: 'Buffer (m)',
  onChange: function(valueBuffer) {
    // set value with a dedicated method
    buffer.setValue(valueBuffer);
    return(valueBuffer);
  }
});
var Buf
var scaleNumber = ui.Textbox({
  placeholder: 'Scale (30m, 100m, 500m)',
  onChange: function(valueScale) {
    // set value with a dedicated method
    scaleNumber.setValue(valueScale);
    return(valueScale);
  }
});
var Sca
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var LABEL_STYLE = {
  fontWeight: '300',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
};
var LABEL_STYLE1 = {
  fontWeight: '300',
  textAlign: 'center',
  fontSize: '20px',
  padding: '2px',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Draw Time Series', LABEL_STYLE),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'vertical'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'vertical'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'vertical'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: ui.Panel.Layout.flow('horizontal'),
});
Map.add(chartPanel);
///////////////////////////////////// Adicionar os Widgets /////////////////////////////
///////////////////////////////////// Labels do App /////////////////////////////////////
var panel1 = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
var panelChart = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
var panelChart2 = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
var Temporal_analysis = ui.Label('Temporal Analysis', LABEL_STYLE1)
var Single_analysis_label = ui.Label('Select the Sentinel image', LABEL_STYLE)
var Nothing = ui.Label('                         ', LABEL_STYLE)
var Nothing1 = ui.Label('                         ', LABEL_STYLE)
var Region_interest_label = ui.Label('Select the region of interest', LABEL_STYLE)
var season_1_name = ui.Label('Select the year interval', LABEL_STYLE)
var season_2_name = ui.Label('Select the month interval', LABEL_STYLE)
var Variables = ui.Label('Graph Analysis (enter buffer and scale and then draw your area)', LABEL_STYLE)
var tutorial = ui.Label('https://wp.ufpel.edu.br/geotechidrica/algaemap-4/', LABEL_STYLE)
var link = ui.Label('https://wp.ufpel.edu.br/geotechidrica/algaemap-4/', LABEL_STYLE)
var link = (ui.Label('App Tutorial').setUrl('https://wp.ufpel.edu.br/geotechidrica/algaemap-4/'))
ui.root.add(panel.add(ui.Panel([toolPanel], ui.Panel.Layout.flow('horizontal'))).add(link).add(Region_interest_label)
  .add(ui.Panel(select)).add(ui.Panel([lon, lat, buttonCoord], ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel(Temporal_analysis)).add(ui.Panel([season_1_name, Ano1, Ano2], ui.Panel.Layout.flow('horizontal'))).add(ui.Panel([season_2_name, Mes1, Mes2], ui.Panel.Layout.flow('horizontal'))).add(ui.Panel([button], ui.Panel.Layout.flow('horizontal')))
  .add(Nothing).add(Variables).add(ui.Panel([buffer, scaleNumber], ui.Panel.Layout.flow('horizontal'))).add(controlPanel).add(panelChart2).add(panelChart))