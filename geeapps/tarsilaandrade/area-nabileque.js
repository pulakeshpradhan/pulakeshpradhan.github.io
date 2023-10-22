/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry2 = ee.FeatureCollection("users/tarsilaandrade/area_cuiaba_sl"),
    geometry = ee.FeatureCollection("users/tarsilaandrade/area_negro_aquidauana");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * 
 * utilize o dicionario options para definir os parametros iniciais
 * utilize o dicionario visParams para alterar a composição dos mosaicos
 * altere o tamanho das thumbnails nos parametros widht e heigth na função
'setThumbnails()', estes parametros estão entre as linha 53 e 56
 * 
 * 
*/
// O objeto options contem os parametros de input para o usuario, e tambem serve de memoria cache
// para as operações na logica deste codigo
var options = {
  start:'2021',
};
// O objeto visParams, contem outros objetos com parametros de visualição dos mapas deste codigo
var visParams = {
  landcover:{
    palette:require('users/mapbiomas/modules:Palettes.js').get('classification5'),
    min:0,
    max:45,
  },
};
// --- --- FUNFÕES
// --- fabrica de imagens de cobertura do solo do mapbiomas coleção 5 | 1985 a 2019
/* DOC
@year | obrigatorio -> string ou int referente ao ano do dado de cobertura,
*/
function getLandcover(year){
  return ee.Image('projects/mapbiomas-workspace/public/collection7/mapbiomas_collection70_integration_v2')
    .select('classification_' + year);
}
// --- função para adicionar thumbnails ao painel inferior
/* DOC
O painel inferior é reservado para essa função adicionar um painel 
com um cabeçalho referente ao ano, e um ou mais mapas apresentados como
ui,Thumbnails 
thumbnails, no caso imagens .png, 
*/
function setThumbs (){
  var panelThumbs = options.panelThumbs
  var yearsList = ee.List.sequence(2000,2021,1).getInfo();
  yearsList.forEach(function(year){
      var backgrondColor = 'f9eac3';
      var landcover = getLandcover(year);
      var geometria = landcover.clip(options.geometry);
      var geometria_buffer = landcover.clip(options.buffer)
        // .updateMask();
      var thumb_geometria = ui.Thumbnail({
        image:landcover
          .clip(options.geometry)
          .visualize(visParams.landcover)
          .blend(options.line),
          // .blend(options.lineBuffer),
        params:{
          region:options.geometry.bounds(),
          dimensions:1000,
        },
        onClick:function(){
          var position = 0
          if ( options.mapp.layers().get(position).getShown() === false){
            options.mapp.layers().get(position).setShown(true);
          } else {
            options.mapp.layers().get(position).setShown(false);
          }
          if (''+year === options.year){
            return 
          } 
          options.year = ''+year;
          aktualizer(''+year);
          options.mapp.layers().get(position).setShown(true);
             }, 
        style:{
          // width:'90px',
          height:'256px',
          backgroundColor:backgrondColor,
          margin:'2px 2px 2px 2px'
        }
        });
      var mask = ee.Image(1).paint(options.geometry);
      // var thumb_geometria_buffer = ui.Thumbnail({
      //   image:landcover
      //     .clip(options.buffer)
      //     .updateMask(mask.eq(1))
      //     .visualize(visParams.landcover)
      //     .blend(options.line)
      //     .blend(options.lineBuffer),
      //   params:{
      //     region:options.buffer.bounds().buffer(10000)
      //   },
      //   onClick:function(){
      //     var position = 1
      //     if ( options.mapp.layers().get(position).getShown() === false){
      //       options.mapp.layers().get(position).setShown(true);
      //     } else {
      //       options.mapp.layers().get(position).setShown(false);
      //     }
      //     if (''+year === options.year){
      //       return 
      //     } 
      //     options.year = ''+year;
      //     aktualizer(''+year);
      //     options.mapp.layers().get(position).setShown(true);
      //   }, 
      //   style:{
      //     width:'90px',
      //     height:'90px',
      //     backgroundColor:backgrondColor,
      //   }
      //   });
      var thumbs = ui.Panel({
        widgets:[
          thumb_geometria,
          // thumb_geometria_buffer,
          ],
        layout:ui.Panel.Layout.flow('vertical'),
        // style:{}
        });
      var label = ui.Label({
        value:''+year,
        style:{
          margin:'2px 2px 2px 2px'
        },
        // targetUrl:
        })
      var panel = ui.Panel({
        widgets:[label,thumbs],
        layout:ui.Panel.Layout.Flow('vertical'),
        style:{}
      });
      panelThumbs.add(panel);
  });
    options.panel.add(panelThumbs);
}
// --- função para substituição de uma layer em qualquer posição da pilha de layers 
/* DOC
a pilha de layers são é o painel de controle das layers no canto superior direito 
do mapa no code editor
@obj | obrigatorio -> ui.Map.Layer({eeObject, visParams, name, shown, opacity})
@position | opcional -> posição da layer que se quer substituir na lista de layers, caso não seja definido um parametro
uma layer vazia é adicionada
@mapp | opcional -> ui.Map(), caso não seja definida é utilizado a Map default do code editor
*/
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
// --- função principal para o controle de eventos no objeto options.mapp
/* DOC
@year | obrigatorio -> string ou int referente ao ano do dado de cobertura,
*/
function aktualizer (year){
  var landcover = getLandcover(year);
  var mask = ee.Image(0).clip(options.geometry);
  var obj = {
    eeObject:landcover.updateMask(mask.eq(0)),
    name: 'cobertura do solo ' + year + ' - col 5',
    visParams:visParams.landcover,
    // shown:true
  };
  plotLayer(obj,0,options.mapp);
  var maskBuffer = ee.Image(1).clip(options.buffer)
    .blend(mask)
    .selfMask();
  // obj = {
  //   eeObject:landcover.updateMask(maskBuffer),
  //   name: 'buffer - cobertura do solo ' + year + ' - col 5',
  //   visParams:visParams.landcover,
  //   // shown:true
  // };
  // plotLayer(obj,1,options.mapp);
  options.mapp.widgets().get(0).clear();
  options.mapp.widgets().get(0).add(ui.Label({
    value:''+year,
    style:{
      backgroundColor:'ffffff00'
    },
    // targetUrl:
  }));
}
// --- função de redesenho do layout no canvas
function setLayout (){
  // reorganizando o root
  options.mapp = ui.Map();
  options.panel = ui.Panel({
      // widgets:,
      layout:ui.Panel.Layout.Flow('vertical',true),
      style:{
      // width:'',
      // height:'200px',
      }
    });
  options.title = ui.Panel({
    // widgets:,
    layout:ui.Panel.Layout.Flow('vertical',true),
    style:{
      // maxHeight:'220px',
    }
  });
  options.panel.add(options.title);
  options.panelThumbs = ui.Panel({
    // widgets:,
    layout:ui.Panel.Layout.Flow('vertical',true),
    style:{
      // maxHeight:'220px',
    }
  });
  // var splitPanel = ui.SplitPanel({
  //   firstPanel:options.mapp,
  //   secondPanel:options.panel,
  //   orientation:'vertical',
  //   // wipe:, 
  //   style:{
  //     // width:'',
  //     // height:'30px',
  //   }
  //   });
  ui.root.widgets().reset([options.mapp, options.panel]);
  ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));
  var yearPanel = ui.Panel({
    widgets:
    ui.Label({
      value:options.start,
      style:{
        // height:'200px',
        // width:'70px',
        // position:'',
        backgroundColor:'ffffff00',
        // fontSize:'12px',
      }
    }),
    // layout:,
    style:{
      // height:'200px',
      // width:'70px',
      position:'top-right',
      backgroundColor:'ffffffdd',
      // fontSize:'20px',
    }});
  options.mapp.add(yearPanel);
}
// --- FUNÇÃO PRINCIPAL, define os parametros do objeto options
function init (){
  // -salvando principais objetos em memoria cache para serem utilizadas de forma recursiva
  options.geometry = ee.FeatureCollection("users/tarsilaandrade/area_nabileque")
    .geometry();
  // var parknames = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/areas-protegidas').aggregate_array('NomeUC')
  // print('nome de parques validos',parknames),
  options.buffer = options.geometry
    .buffer(50000);
  // -construndo image com as linhas do ver das geometrias
  var line = ee.Image(1).paint(options.geometry,'000000',1);
  options.line = line.updateMask(line.neq(1)).visualize({palette:'000000'});
  var lineBuffer = ee.Image(1).paint(options.buffer,'000000',1);
  options.lineBuffer = line.updateMask(lineBuffer.neq(1)).visualize({palette:'000000'});
  // var geometria = ee.FeatureCollection('users/wallacesilva/PN_Araguaia');
  // var buffer = ee.FeatureCollection('users/wallacesilva/PN_Araguaia_Buffer_50km');
  // -alterando layout do ui.root.widgets
  setLayout();
  // -disparando a primeira rodada dos eventos na map do painel superior,
  // o argumento de ano utilizado esta definido pelo usuario no dicionario options
  aktualizer(options.start);
  // -adicionando thumbnails no painel inferior
  setThumbs();
  // -centralizando map do painel superior
  options.mapp.centerObject(options.geometry);
  options.mapp.addLayer(options.line,{},'Limite Área 1 - Caceres');
  // options.mapp.addLayer(options.lineBuffer,{},'buffer de 50 km da subbacia do rio São João da Barra');
  // -ligando layers que precisam estar ligadas
  options.mapp.layers().get(0).setShown(true);
  options.mapp.layers().get(1).setShown(true);
  // options.mapp.layers().get(2).setShown(true);
  // options.mapp.layers().get(3).setShown(true);
}
// --- dando inicio a logica programada
init();
// acesse o codigo https://code.earthengine.google.com/139668d72b8470e1fd44a3585e8cc6b3?noload=1
options.title.add(
  ui.Panel(
  [
    ui.Label({
    value:'clique nos mapas para alterar o ano',
    style:{fontSize:'10px'},
    // targetUrl:'https://code.earthengine.google.com/68271aac527450c156e5b8dc237d476d?noload=1'
  }),
    ui.Label({
  value:'clique aqui para acessar o código',
    style:{fontSize:'10px'},
  targetUrl:'https://code.earthengine.google.com/e7b5ea82dc926006e9c7d4e0fb532751?noload=true'
})
  ],
  ui.Panel.Layout.Flow('vertical')))
// // --- --- EXPORTANDO ESTATISTICAS
// var poligonoInterno = ee.Image(1).clip(options.geometry);
// var poligonoExterno = ee.Image(2).clip(options.buffer);
// var territory = ee.Image(0)
//   .blend(poligonoExterno)
//   .blend(poligonoInterno)
//   .selfMask();
// options.mapp.addLayer(territory);
// var territoryReference = 'region';
// var mapbiomas = ee.Image('projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1').selfMask();
// var years = mapbiomas.bandNames().getInfo().forEach(function(bandName){
//   return bandName.slice(-4);
// });
// var years = mapbiomas.bandNames().getInfo().map(function(bandName){return bandName.slice(-4)});
// // Image area in km2
// var pixelArea = ee.Image.pixelArea().divide(1000000);
// // Geometry to export
// var geometry = options.buffer;
// /**
// * Convert a complex ob to feature collection
// * @param obj 
// */
// var convert2table = function (obj) {
//     obj = ee.Dictionary(obj);
//     var territory = obj.get('territory');
//     var classesAndAreas = ee.List(obj.get('groups'));
//     var tableRows = classesAndAreas.map(
//         function (classAndArea) {
//             classAndArea = ee.Dictionary(classAndArea);
//             var classId = classAndArea.get('class');
//             var area = classAndArea.get('sum');
//             var tableColumns = ee.Feature(null)
//                 .set('territory', territory)
//                 .set('class', classId)
//                 .set('area', area)
//             return tableColumns;
//         }
//     );
//     return ee.FeatureCollection(ee.List(tableRows));
// };
// /**
// * Calculate area crossing a cover map (deforestation, mapbiomas)
// * and a region map (states, biomes, municipalites)
// * @param image 
// * @param territory 
// * @param geometry
// */
// var calculateArea = function (image, territory, geometry) {
//     var reducer = ee.Reducer.sum().group(1, 'class').group(1, 'territory');
//     var territotiesData = pixelArea.addBands(territory).addBands(image)
//         .reduceRegion({
//             reducer: reducer,
//             geometry: geometry,
//             scale: 30,
//             maxPixels: 1e12
//         });
//     print(territotiesData)
//     territotiesData = ee.List(territotiesData.get('groups'));
//     print(territotiesData)
//     var areas = territotiesData.map(convert2table);
//     print(areas)
//     areas = ee.FeatureCollection(areas).flatten();
//     return areas;
// };
// var areas = years.map(
//     function (year) {
//         var image = mapbiomas.select('classification_' + year);
//         var areas = calculateArea(image, territory, geometry);
//         // set additional properties
//         areas = areas.map(
//             function (feature) {
//                 return feature.set('year', year);
//             }
//         );
//         return areas;
//     }
// );
// areas = ee.FeatureCollection(areas).flatten();
// print('exemplo de feature',areas.first());
// Export.table.toDrive({
//     collection: areas,
//     description: 'cobertura-do-solo-araguaia',
//     folder: 'exports',
//     fileNamePrefix: 'cobertura-do-solo-araguaia-',
//     fileFormat: 'CSV'
// });