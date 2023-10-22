var styles = {
  'default':{
    margin:'0px 0px 0px 0px',
    stretch:'horizontal'
  }
}
var acre_state = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/estados-2017--')
      .filter(ee.Filter.eq('NM_ESTADO','ACRE'));
var cache = {};
cache['mask'] = ee.Image().paint(acre_state, 'vazio');
cache['geometry'] = acre_state.geometry();
var l_1 = ui.Label('');
var l_2 = ui.Label('');
var widgets = [l_1,l_2];
var tumbnails = ui.Panel();
var mapp = ui.root.widgets().get(0);
widgets = ui.Panel(widgets)
var shapeSelect, elementSelect;
function aktualizer_thumbnail (){
  tumbnails.clear();
  var years = [
    1995, 2000, 2005, 2010, 2015, 2020
    ]
  years.forEach(function(year){
    var landcover_year = ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas_collection60_integration_v1')
      .select('classification_'+year)
      .updateMask(cache['mask'].gte(0))
      .visualize({
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
      });
    var line = ee.Image().paint(acre_state,'vazio',0.25);
    landcover_year = landcover_year.blend(line);
    var thumbs = ui.Panel();
    var check = ui.Checkbox({
      label:'Uso e cobertura em ' + year,
      value:false,
      // onChange:,
      // disabled:,
      style:{}
    })
    check.onChange(function(value){
          if(value === true){
          mapp.layers().get(3)
            .setShown(true)
            .setEeObject(landcover_year)
            .setName('Uso e cobertura em ' + year);
            tumbnails.widgets().forEach(function(panel_){
              if (panel_.widgets().get(0).getLabel() !== 'Uso e cobertura em ' + year){
                panel_.widgets().get(0).setValue(false)
                mapp.layers().get(3)
                  .setShown(true);
              }
            })
          } 
          if(value === false){
            mapp.layers().get(3)
            .setShown(false);
          }
      });
    thumbs.add(check);
    thumbs.add(ui.Thumbnail({
      image:landcover_year,
      params:{
        region:cache['geometry'].bounds(),
        dimensions: 1000
      },
      onClick:{},
      style:{
        margin:'0px 0px 0px 0px',
        width:'360px'
      }
    }))
    tumbnails.add(thumbs);
  });
}
mapp.addLayer(ee.Image().select(),{},'');
mapp.addLayer(ee.Image().select(),{},'');
mapp.addLayer(ee.Image().select(),{},'');
mapp.addLayer(ee.Image().select(),{},'');
aktualizer_thumbnail();
function aktualizer_1(){
  // print(cache)
  mapp.clear();
  mapp.addLayer(cache[cache['label']]['featureCollection'],{},cache['label'] + '-featureCollection');
  mapp.addLayer(ee.Image().select(),{},'');
  mapp.addLayer(ee.Image().select(),{},'');
  mapp.addLayer(ee.Image().select(),{},'');
  aktualizer_thumbnail();
}
function aktualizer_2(){
  mapp.layers().get(0).setShown(false);
  mapp.layers().get(1)
    .setEeObject(cache[cache['label']]['image'].randomVisualizer())
    .setName(cache['label'] + '-image')
  mapp.layers().get(2)
    .setShown(false)
    .setEeObject(ee.Image().select())
    .setName('');
  //////////////////////////
  mapp.centerObject(cache['geometry'].bounds());
  aktualizer_thumbnail();
}
function aktualizer_3(){
  mapp.layers().get(0).setShown(false);
  mapp.layers().get(1).setShown(false);
  mapp.layers().get(2)
    .setShown(true)
    .setEeObject(cache[cache['label']]['image-element'])
    .setName(cache['label'] + '-image-element')
  mapp.centerObject(cache['geometry'].bounds());
  aktualizer_thumbnail();
}
widgets.insert(0,ui.Label({
  value:'Painel de controle',
  style:styles.default,
  // targetUrl:,
  // imageUrl:
  }));
widgets.insert(1,ui.Select({
  items:[     
    {label:'ZEE_ACRE_FUNDIARIO', value:'projects/workspace-ipam/assets/ZONAS-ACRE/ZEE_ACRE_FUNDIARIO'},
    {label:'mapa_gestao_zee_acre', value:'projects/workspace-ipam/assets/ZONAS-ACRE/mapa_gestao_zee_acre'},
    {label:'zona_de_getao_1_1', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_1_1'},
    {label:'zona_de_getao_1_2', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_1_2'},
    {label:'zona_de_getao_1_3', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_1_3'},
    {label:'zona_de_getao_2', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_2'},
    {label:'zona_de_getao_3', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_3'},
    {label:'zona_de_getao_4', value:'projects/workspace-ipam/assets/ZONAS-ACRE/zona_de_getao_4'},
    ],
  // placeholder:,
  value:cache['label'] || null,
  onChange:function(address){
    var label = address.split('/')[4];
    cache['label'] = label;
    if (cache[label] === undefined){
      cache[label] = {};
      cache[label]['label'] = label;
      cache[label]['featureCollection'] = ee.FeatureCollection(address);
      cache[label]['propertyNames'] = cache[label]['featureCollection'].first().propertyNames().getInfo();
    }
    cache['mask'] = ee.Image().paint(cache[label]['featureCollection'], 'vazio');
    cache['geometry'] = cache[label]['featureCollection'].geometry();
    var eeObject = cache[label]['featureCollection'];
    shapeSelect = ui.Select({
      items:cache[label]['propertyNames'],
      // placeholder:'',
      value: cache['shape'] || null,
      onChange:function(shape){
        cache[label]['shape'] = shape
        // if (cache[label]['shapeNames'] === undefined){
           cache[label]['shapeNames'] = cache[label]['featureCollection']
            .aggregate_array(shape)
            .distinct()
            .sort()
            // .getInfo();
         cache[label]['shapeNames-getInfo'] = cache[label]['shapeNames']
            .getInfo();
        // }
      cache[label]['featureCollection'] = cache[label]['featureCollection'].map(function(feature){
        return feature.set('index-'+shape,cache[label]['shapeNames'].indexOf(feature.get(shape)))
      })
      cache[label]['shapeNames']
      cache[label]['image'] = ee.Image().paint(cache[label]['featureCollection'],'index-'+shape);
      cache['mask'] = ee.Image().paint(cache[label]['featureCollection'], 'index-'+shape);
      cache['geometry'] = cache[label]['featureCollection'].geometry();
      aktualizer_2();
      /////////////////////////////
      elementSelect = ui.Select({
      items: cache[label]['shapeNames-getInfo'].map(function(i){return {label:''+i,value:i}}),
      // placeholder:'',
      // value: cache['shape'] || null,
      onChange:function(element){
        cache[label]['element'] = element
      cache[label]['feature-element'] = cache[label]['featureCollection']
        .filter(ee.Filter.eq(shape,element))
      cache[label]['image-element'] = ee.Image().paint(cache[label]['feature-element'], 'index-'+shape);
      cache['mask'] = ee.Image().paint(cache[label]['feature-element'], 'index-'+shape);
      cache['geometry'] = cache[label]['feature-element'].geometry();
      aktualizer_3();
      },
      // disabled:,
      style:styles.default
    });
      /////////////////////////////
      widgets.widgets().set(3,elementSelect)
      },
      // disabled:,
      style:styles.default
    });
    aktualizer_1();
    widgets.widgets().set(2,shapeSelect)
  },
  style:styles.default
}));
var link = ui.Label({
  value:'Acesse o codigo',
  style:styles.default,
  targetUrl:'https://code.earthengine.google.com/c408d296072e0f260298604762b896a8',
  // imageUrl:
  });
widgets.add(link)
ui.root.widgets().reset([widgets,mapp,tumbnails]);
mapp.setCenter(-70.43435385546596, -8.98419893031994, 7);