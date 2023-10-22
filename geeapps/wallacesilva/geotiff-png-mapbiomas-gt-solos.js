/**
 *
 * App de visualização e download de mapas de atributos dos solos do GT Solos do MapBiomas
 * 
 * Desenvolvimento iniciado em 2021-11-11
 * Última atualização 2021-11-12
 * 
 * by: Raul Poppiel e Wallace Silva
 * 
 * wallace.silva@ipam.org.br
 * 
 * Referencia: https://code.earthengine.google.com/595ecae4a424cfecb575685ef405cd01
 * 
 */
// ---  --- --- OPTIONS
// - options
var options = {
  'region-bounds':null
};
// --- --- --- EXTERNAL MODULES
var palettes = require('users/gena/packages:palettes');
// --- --- --- DATASET
var dataset = {
  // --- --- principal
  Clay_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_clay_mean'),
    visparams:{
      palette:palettes.niccoli.linearlhot[7].slice(2,6).reverse(),
      min:100,
      max:600
    },
    shown:true
  },
  Silt_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_silt_mean'),
    visparams:{
      palette:palettes.crameri.buda[50].slice().reverse(),
      min:25,
      max:250
    },
    shown:false
  },
  Sand_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_sand_mean'),
    visparams:{
      palette:palettes.niccoli.linearlhot[7].slice(2,6),
      min:275,
      max:835
    },
    shown:false
  },
  SOC_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_SOC_mean'),
    visparams:{
      palette:["#d6d099","#FBB41A","#EC6824","#BB3654","#781B6C","#320A5A","#210100"],
      min:6,
      max:30
    },
    shown:false
  },
  Soc_stock_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_soc_stock_mean'),
    visparams:{
      palette:["#d6d099","#FBB41A","#EC6824","#BB3654","#781B6C","#320A5A","#210100"],
      min:2,
      max:7
    },
    shown:false
  },
  CEC_mean:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_CEC_mean'),
    visparams:{
      palette:["#004c00","#4DA910","#B3C120","#FCC228","#FF8410","#FD3000","#860000"].reverse(),
      min:27,
      max:95
    },
    shown:false
  },
  Fe2O3_mean_gkg:{
    image:ee.Image('users/rrpoppiel/SoilQualityBrazil/brazil_Fe2O3_mean_gkg'),
    visparams:{
      palette:palettes.niccoli.linearlhot[7].slice(2,6),
      min:20,
      max:230
    },
    shown:false
  },
  // --- --- auxiliar
  // - vector
  Brasil:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/brasil_2km')
      .map(function(feature){return feature.set('ESTADOS_ID',ee.Number.parse(feature.get('ESTADOS_ID')))}),
    propertie:'ESTADOS_ID'
  },
  Biomas:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
      .map(function(feature){return feature.set('CD_Bioma',ee.Number.parse(feature.get('CD_Bioma')))}),
    propertie:'CD_Bioma'
  },
  Estados:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017')
      .map(function(feature){return feature.set('CD_GEOCUF',ee.Number.parse(feature.get('CD_GEOCUF')))}),
    propertie:'CD_GEOCUF'
  },
  Municipios:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/municipios-2020')
      .map(function(feature){return feature.set('CD_MUN',ee.Number.parse(feature.get('CD_MUN')))}),
    propertie:'CD_MUN'
  },
  UC:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ucs-2019')
      .map(function(feature){return feature.set('ID',ee.Number.parse(feature.get('ID')))}),
    propertie:'ID'
  },
  // Bacias_n1:ee.FeatureCollection(''),
  // Bacias_n2:ee.FeatureCollection(''),
  // Bacias_n3:ee.FeatureCollection(''),
  Landsat_tile:{
    feature:ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/cenas-landsat')
      .map(function(feature){return feature.set('TILE',ee.Number.parse(feature.get('TILE')))}),
    propertie:'TILE'
  }
};
var styles = {
  panel_principal:{
    width:'250px',
  },
  panel_default:{
    stretch:'horizontal',
    margin:'0px 0px 0px 0px',
  },
  logo:{
    stretch:'horizontal',
    margin:'0px 0px 0px 0px',
  },
  label_gtsolos:{
    stretch:'horizontal',
    textAlign :'center',
    position:'top-center',
    backgroundColor:'cccccc',
    fontWeight:'bold',
    margin:'0px 0px 0px 0px',
  },
  sub_label:{
    stretch:'horizontal',
    textAlign :'center',
    position:'top-center',
    backgroundColor:'cccccc',
    fontWeight:'bold',
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
    height:'24px',
  },
  sub_button:{
    stretch:'horizontal',
    textAlign :'center',
    position:'top-center',
    backgroundColor:'cccccc',
    fontWeight:'bold',
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
    height:'24px',
  },
  check:{
    fontSize:'14px',
    height:'20px',
    width:'140px',
    margin:'0px 0px 0px 0px',
  },
  opacity_slider:{
    fontSize:'8px',
    stretch:'horizontal',
    margin:'0px 0px 0px 0px',
  },
  open_button:{
    fontSize:'8px',
    // width:'30px',
    height:'20px',
    stretch:'vertical',
    whiteSpace:'nowrap',
    textAlign:'left',
    margin:'0px 0px 0px 0px',
  },
  mask_select:{
    stretch:'horizontal',
    margin:'0px 0px 0px 0px',
  }
};
function setDevOptions(){
  options.principal = [
    'Clay_mean','Silt_mean','Sand_mean','SOC_mean','Soc_stock_mean','CEC_mean','Fe2O3_mean_gkg',
  ];
   options.auxiliar = [
    'Brasil','Biomas','Estados','Municipios','UC','Landsat_tile',
  ];
}
function makeColorBar(palette,listLabels,title) {
  var params = {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: params,
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '5px'},
  });  
}
function setLayout(){
  // --- basic layout
  options.panel = ui.Panel({
    // widgets:,
    // layout:,
    style:styles.panel_principal
  });
  options.mapp = ui.root.widgets().get(0);
  options.mapp_auxiliar = ui.Map();
  ui.root.widgets().reset([options.panel,options.mapp]);
  // --- complementar
  // - logo
  var logo = ee.Image('projects/mapbiomas-workspace/new-logo');
  logo = ui.Thumbnail({
    image:logo.updateMask(logo.neq(0)).visualize({}),
    // params:,
    // onClick:,
    style:styles.logo
  });
  var label_gtsolos = ui.Label('GT-SOLOS', styles.label_gtsolos, 'https://mapbiomas.org/');
  options.panel.add(logo);
  options.panel.add(label_gtsolos);
  // - select mask
  options.select = ui.Panel({
    widgets:[],
    // layout:,
    style:styles.panel_default
  });
  options.panel.add(options.select);
  // - subtitle
  options.subtitle = ui.Panel({
    widgets:ui.Label('LEGENDA'),
    // layout:,
    style:styles.panel_default
  });
  options.panel.add(options.subtitle);
}
// --- --- 
function cartographElements (geometry) {
          // File: style-test-gradientbar
        // Package sources: https://code.earthengine.google.com/?accept_repo=users/gena/packages
        var style = require('users/gena/packages:style')
        var text = require('users/gena/packages:text')
        var point = function (pt, x, y) {
          var ab = ee.Number(pt.get(0)).subtract(x)
          var cd = ee.Number(pt.get(1)).subtract(y)
          return ee.Geometry.Point(ee.List([x1, y1]))
        }
        var box_p1 = text.getLocation(geometry, 'left', '97.5%', '60%');
        var box_p2 = text.getLocation(geometry, 'left', '98%', '10%');
        var box = ee.Geometry.LineString([box_p1,box_p2]).bounds();
        var textProperties = { fontSize:16, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 }
        // add a scale bar
        var scale = style.ScaleBar.draw(box, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.0f', units: 'km', text: textProperties
        })
  return scale
}
// --- --- --- USER INTERFACE WIDGETS PRINCIPAL
function setSubtitle (){
  options.principal.forEach(function(data){
    // --- layer
    // - mask's
    var hansen_2016 = ee.Image('UMD/hansen/global_forest_change_2016_v1_4').select('datamask');
    var hansen_2016_wbodies = hansen_2016.neq(1).eq(0);
    var waterMask = hansen_2016.updateMask(hansen_2016_wbodies);
    var brasil = ee.Image(0).mask(0).paint(dataset['Brasil']['feature']);
    options['region-mask'] = brasil;
    options['region-bounds'] = dataset['Brasil']['feature'].geometry().bounds();
    options.mapp.centerObject(options['region-bounds']);
    // - layer principal
    var image = dataset[data]['image']
      .updateMask(waterMask)
      .updateMask(brasil.neq(1))
      .divide(10);
    var visparams = dataset[data]['visparams'];
    var palette = visparams['palette'];
    var shown = dataset[data]['shown'];
    // - layer
    var layer = ui.Map.Layer({
      eeObject:image,
      visParams:visparams,
      name:data,
      // shown:,
      // opacity:
    });
    // --- logical interface
    // - panels
    var firstPanel = ui.Panel([], ui.Panel.Layout.Flow('horizontal'), styles.panel_default);
    var globalPanel = ui.Panel(firstPanel, ui.Panel.Layout.Flow('vertical'), styles.panel_default);
    options.panel.add(globalPanel);
    // - add and remove layer
    if(shown === true){
      options.mapp.add(layer);
    }
    var check = ui.Checkbox({
      label:data,
      value:shown, 
      onChange:function(value){
        if(value === true){
          options.mapp.add(layer);
        } else {
          options.mapp.remove(layer);
        }
      }, 
      // disabled:, 
      style:styles.check
      });
    var opacity = ui.Slider({
      min:0,
      max:1,
      value:1,
      step:0.1,
      onChange:function(value){
        layer.setOpacity(value);
      },
      // direction:,
      // disabled:,
      style:styles.opacity_slider
      });
    // open/close
    options['open-'+data] = '>';
    var colorbar;
    var panel_region;
    var panel_canvas;
    var button = ui.Button({
      label:options['open-'+data],
      onClick:function(){
        if (options['open-'+data] === '>'){
          // - colorbar
          colorbar = makeColorBar(palette);
          globalPanel.add(colorbar);
          // - region
          var label_region = ui.Label('Região:',styles.sub_label);
          var geotiff_region = ui.Button({
            label:'GEOTIFF',
            onClick:function(){
              Export.image.toDrive({
                image:image
                  .updateMask(options['region-mask'].neq(1)),
                description:'toDrive-'+data,
                folder:'mapbiomas-solos',
                fileNamePrefix:'mapbiomas-solos-'+data,
                // dimensions:,
                region:options['region-bounds'],
                scale:30,
                // crs:,
                // crsTransform:,
                maxPixels:1e13,
                // shardSize;,
                // fileDimensions:,
                // skipEmptyTiles:,
                fileFormat:'GeoTIFF', 
                // formatOptions:
              });
            },
            // disabled:,
            style:styles.sub_button
          });
          // - elementos cartograficos da região
          var cartograph_elements = cartographElements(options['region-bounds']);
          // Map.addLayer(cartograph_elements,{},'cartograph_elements')
          var thumb_region = image
            .updateMask(options['region-mask'].neq(1))
            .visualize(visparams)
            .blend(cartographElements(options['region-bounds']))
            .getThumbURL({
              dimensions:1000,
              region:options['region-bounds'],
              format:'png'
            });
          thumb_region = ui.Label('JPG', styles.sub_label, thumb_region);          
          panel_region = ui.Panel([label_region,geotiff_region,thumb_region], ui.Panel.Layout.Flow('horizontal'), styles.panel_default);
          globalPanel.add(panel_region);
          // - canvas
          var label_canvas = ui.Label('Tela:',styles.sub_label);
          var geotiff_canvas = ui.Button({
            label:'GEOTIFF',
            onClick:function(){
              Export.image.toDrive({
                image:image
                  .blend(cartographElements(ee.Geometry.Rectangle(options.mapp.getBounds()))),
                description:'toDrive-'+data,
                folder:'mapbiomas-solos',
                fileNamePrefix:'mapbiomas-solos-'+data,
                // dimensions:,
                region:ee.Geometry.Rectangle(options.mapp.getBounds()),
                scale:30,
                // crs:,
                // crsTransform:,
                maxPixels:1e13,
                // shardSize;,
                // fileDimensions:,
                // skipEmptyTiles:,
                fileFormat:'GeoTIFF', 
                // formatOptions:
              });
            },
            // disabled:,
            style:styles.sub_button
          });
          var thumb_canvas = image
            .visualize(visparams)
            .getThumbURL({
              dimensions:1000,
              region:ee.Geometry.Rectangle(options.mapp.getBounds()),
              format:'png'
            });
          thumb_canvas = ui.Label('JPG', styles.sub_label, thumb_canvas);          
          panel_canvas = ui.Panel([label_canvas,geotiff_canvas,thumb_canvas], ui.Panel.Layout.Flow('horizontal'), styles.panel_default);
          globalPanel.add(panel_canvas);
          options['open-'+data] = 'v';
          button.setLabel('v');
          return ;
        }
        if (options['open-'+data] === 'v'){
          globalPanel.remove(colorbar);
          globalPanel.remove(panel_region);
          globalPanel.remove(panel_canvas);
          options['open-'+data] = '>';
          button.setLabel('>');
          return ;
        }
      },
      // disabled, 
      style:styles.open_button
      });
      firstPanel
        .add(button)
        .add(check)
        .add(opacity);     
    // - colorbar
    //
  });
}
function setSelect(){
  var label = ui.Label({
    value:'Escolha uma região para download dos dados',
    style:styles.sub_label,
    // targetUrl:
    });
  var layer_choice;
  var layer_line;
  var select = ui.Select({
    items:options.auxiliar, 
    // placeholder:,
    value:options.auxiliar[0],
    onChange:function(value){
      var feature = dataset[value]['feature'];
      var propertie = dataset[value]['propertie'];
      var choice = ee.Image(0).mask(0)
        .paint(feature,propertie)
        .randomVisualizer();
      var line = ee.Image(0).mask(0)
        .paint(feature,'null',0.3);
      var message = ui.Label({
        value:'ESCOLHA A REGIÃO CLICANDO SOBRE ELA NO MAPA',
        style:styles.sub_label,
        // targetUrl:
      });
      if (options.firstChoice === false){
        options.mapp.remove(layer_choice);
        options.mapp.remove(layer_line);
      }
      layer_choice = ui.Map.Layer({
        eeObject:choice,
        // visParams:,
        name:'region',
        // shown:,
        // opacity:
      });
      layer_line = ui.Map.Layer({
        eeObject:line,
        // visParams:,
        name:'line',
        // shown:,
        // opacity:
      });
      options.mapp.add(message);
      options.mapp.add(layer_choice);
      options.mapp.add(layer_line);
      options.mapp.onClick(function(obj){
        var lon = obj['lon'];
        var lat = obj['lat'];
        var point = ee.Geometry.Point([lon,lat]);
        var chosen = feature.filterBounds(point);
        options['region-bounds'] = chosen.geometry().bounds();
        options['region-mask'] = ee.Image(0).mask(0).paint(chosen);
        var inverse_polygon = ee.Image(2)
          .blend(options['region-mask'])
        inverse_polygon = inverse_polygon
          .updateMask(inverse_polygon.neq(0))
          .visualize({palette:'ffffff'});
        layer_choice
          .setEeObject(inverse_polygon);
        options.firstChoice = false;
        options.mapp.remove(message);
        options.mapp.centerObject(chosen);
        options.mapp.onClick(function(value){return ;});
      });
    },
    // disabled:,
    style:styles.mask_select
  });
  options.select
    .add(label)
    .add(select);
}
function start(){
  print('start');
  setDevOptions();
  setLayout();
  setSubtitle();
  setSelect();
  print('options',options);
  print('dataset',dataset);
}
start();