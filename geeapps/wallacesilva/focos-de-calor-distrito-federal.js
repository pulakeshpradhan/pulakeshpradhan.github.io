var options = {
  start_year:2017,
};
// --- dataset
var dataset = {
  // raster:{
    l5:'LANDSAT/LT05/C01/T1_SR', //1984-01-01T00:00:00 - 2012-05-05T00:00:00
    l7:'LANDSAT/LE07/C01/T1_SR', //1999-01-01T00:00:00 - 2021-01-31T00:00:00
    l8:'LANDSAT/LC08/C01/T1_SR', //2013-04-11T00:00:00 - 2021-01-22T00:00:00
    mapbiomas:'projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1', // Brasil - 1985 à 2019
    srtm:'USGS/SRTMGL1_003',
  // },
  // vector:{
    focos:'users/geomapeamentoipam/AUXILIAR/focos/brasil/Focos_',
    df:'users/wallacesilva/vetor/GEOPORTAL-DF_PropostaDeRegiosAdiministrativas',
  // }
};
var df = ee.FeatureCollection(dataset.df);
Map.centerObject(df.geometry());
var landcover = ee.Image(dataset.mapbiomas).clip(df.geometry());
function getFocos (year,buffer) {
  buffer = buffer || 1000;
  var focos = ee.FeatureCollection(dataset.focos + year)
    .filterBounds(df.geometry())
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
          .rename('year').byte();
        return ee.Image().select()
          // .addBands(year)
          .addBands(month)
          // .addBands(day)
          .clip(feature.geometry())
          .copyProperties(feature);
          // .set({
          //   'mês':mes,
          // });
      });
  return ee.ImageCollection(focos_image).max();
}  
function subTitle (){
  var list = [2,1,0];
  list = list.map(function(i){
    var lb = {
      0:['◈','00aa00'],
      1:['⬤','909090'],
      2:['―','000000'],
    };
    lb = lb[i];
    var layer = Map.layers().get(i);
    var label = ui.Label({value:lb[0],style:{color:lb[1],backgroundColor:'ffffff00',margin:'0px 0px 0px 0px',fontSize:'12px'}});
    var checkbox = ui.Checkbox({label:layer.getName(), value:layer.getShown(), onChange:function(value){layer.setShown(value)}, style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px',width:'220px',fontSize:'12px'}});
    var opacity = ui.Slider({min:0, max:1, value:layer.getOpacity(), step:0.1, onChange:function(value){layer.setOpacity(value)},style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px',fontSize:'12px',maxWidth:'80px'}});
    return ui.Panel({widgets:[label,checkbox,opacity], layout:ui.Panel.Layout.Flow('horizontal'), style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px'}});
  });
  return ui.Panel(list, ui.Panel.Layout.Flow('vertical'),{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px'});
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
      width:'300px'
    }
  });
}
function plot (){
  var image = getFocos(options.start_year);
  Map.layers().get(1)
    .setEeObject(image)
    .setName('Focos de Calor em '+options.start_year + ' - buffer 1km');
  Map.layers().get(0)
    .setEeObject(landcover.select('classification_'+options.start_year))
    .setName('Cobertura do solo em '+options.start_year);
}
var palette = ['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'];
var visParams  = {min:1,max:12,palette:palette};
var lines = ee.Image(1).paint(df,'000000',0.5);
lines = lines.updateMask(lines.neq(1));
var mapbiomas = {
  palette:require('users/mapbiomas/modules:Palettes.js').get('classification5'),
  min:0,
  max:45,
};
Map.addLayer(landcover.select('classification_'+options.start_year),mapbiomas,'Cobertura do solo em '+options.start_year,true,0.8);
Map.addLayer(ee.Image().select(),visParams,'vazio');
Map.addLayer(lines,{palette:'ffffff'},'Limites do DF');
// users interface
var panelPrincipal = ui.Panel({
  // widgets:,
  layout:ui.Panel.Layout.Flow('vertical'),
  style:{
    position:'bottom-left',
    backgroundColor:'ffffffcc',
    width:'355px'
  },
});
Map.add(panelPrincipal);
plot();
var label_year = ui.Label({
  value:'Selecione um ano de focos de calor',
  style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px',width:'270px'}
});
panelPrincipal.add(label_year);
var slider_year_1 = ui.Slider({
  min:2000,
  max:2020,
  value:options.start_year,
  step:1,
  onChange:function(value){
    options.start_year = value;
    plot();
    panelPrincipal.widgets().get(3).clear().add(subTitle());
  },
  // direction:,
  // disabled:,
  style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px',width:'320px'}
});
panelPrincipal.add(slider_year_1);
var colorBarTimeFlag = colorBar(palette,         ['jan','jun','dez'],  'Composição mensal');
panelPrincipal.add(colorBarTimeFlag);
var Mapp = require('users/joaovsiqueira1/packages:Mapp.js');
Map.setOptions({
  'styles': {
    'Dark': Mapp.getStyle('Dark')
  }
});
Map.setOptions('Dark');
var legenda = ui.Panel({
  // value:'legenda',
  style:{backgroundColor:'ffffff00',margin:'0px 0px 0px 0px'}
});
panelPrincipal.add(legenda);
print({'a':panelPrincipal.widgets().get(3)});
panelPrincipal.widgets().get(3).add(subTitle());