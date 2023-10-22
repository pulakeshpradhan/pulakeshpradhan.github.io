var hansen = ee.Image('UMD/hansen/global_forest_change_2018_v1_6');
var peru=ee.FeatureCollection('users/canal/peru').geometry();
var fecha = new Date();
var anioActual = fecha.getFullYear();
var landsatCollection;
 var visParamsLoss={min: 0, max: 1, palette: ['black', 'red']};
 var imageLoss = hansen.select('loss');
 var capaSeleccionada='Áreas Naturales Protegidas';
 var arrayListMosaic=[];
Map.addLayer(imageLoss.clip(peru), visParamsLoss,'Mapa de cambio del 2000 al 2018');
var layerProperties = {
  'Área de Conservación Regional': {
    name: 'acr',
    nombreCompleto:'Área de Conservación Regional',
    ruta:'users/arlestaboada/ACR',
    color:'51d1f6',
    defaultVisibility: false
  },
  'Áreas Naturales Protegidas': {
    name: 'anp',
    nombreCompleto:'Áreas Naturales Protegidas',
    ruta:'users/canal/ANP',
    color:'ffff00',
    defaultVisibility: true
  },
  'Distritos': {
    name: 'distritos',
    nombreCompleto:'Distritos',
    ruta:'users/arlestaboada/distritos',
    color:'ffffbf',
    defaultVisibility: false
  }
};
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[1],
  onChange: function(selected) {
     for (var key in layerProperties) {
    var layer = layerProperties[key];
    removeLayerSearch(layer.nombreCompleto);
    if(selected===layer.nombreCompleto){
      removeLayerSearch('Área de interes');
      capaSeleccionada=layer.nombreCompleto;
      shape=ee.FeatureCollection(layer.ruta);
      Map.addLayer(shape, {color:layer.color},layer.nombreCompleto);
    }
  }
  }
});
var desSelector=ui.Label('Generar animación de', {'font-size': '20px','fontWeight': 'bold'});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  Map.layers().forEach(function(element, index) {
    if(element.getName()==='Mapa de cambio del 2000 al 2018')
    {
       element.setOpacity(value);
    }
  });
});
var desOpacity=ui.Label({
    value: 'Opacidad',
  });
var viewOpacity =
    ui.Panel([desOpacity, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
  var iniciando= function(){
       // Landat 5 surface reflection data
     var L7coll = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
                .select(['B2','B4','B3','BQA']);
     var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                .select(['B2','B4','B3','BQA']);
    // Landat 8 surface reflection data, rename the band names. See USGS pages for more info
     var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .map(function(image){
      return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'BQA']);
    })
    .select(['B2','B4','B3','BQA']);
     landsatCollection =ee.ImageCollection(L5coll.merge(L7coll.merge(L8coll)));
  };
 iniciando();
var intro = ui.Panel([
  ui.Label({
    value: 'Demo animación',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Imágenes que componen la animación.')
]);
var txtAnioInicio=ui.Textbox
    ({
       placeholder: 'Año Inicio',
       value: '2010',
       style: {width: '100px'}
     });
var panelAnioInicio= ui.Panel([
  ui.Label({
    value: 'Puedes comenzar a ver imágenes a partir de 1985',
  }),
  txtAnioInicio
]);
var txtAnioFin=ui.Textbox
    ({
       placeholder: 'Año Fin',
       value:  anioActual,
       style: {width: '100px'}
     });
var panelAnioFin= ui.Panel([
  ui.Label({
    value: 'Puedes ver imágenes hasta el año actual',
  }),
  txtAnioFin
]);
 var main = ui.Panel
            ( 
                {
                      widgets: 
                                [
                                    intro,
                                    panelAnioInicio,
                                    panelAnioFin,
                                    desSelector,
                                    layerSelect,
                                    viewOpacity
                                ],
                           style: {width: '320px', padding: '8px'}      
                }
            );
//onclick
// COMPUTE BITS
var computeQAbits = function(start, end, newName) {
  var pattern = ee.Number(0);
  start = ee.Number(start).toInt();
  end = ee.Number(end).toInt();
  newName = ee.String(newName);
  var seq = ee.List.sequence(start, end);
  var patt = seq.iterate(
    function(element, ini) {
      ini = ee.Number(ini);
      var bit = ee.Number(2).pow(ee.Number(element));
      return ini.add(bit);
    }, pattern);
  patt = ee.Number(patt).toInt();
  var wrap = function(image) {
    var good_pix = image.select([0], [newName]).bitwiseAnd(patt).rightShift(start);
    return good_pix.toInt();
  };
  return wrap;
};
var compute = function(image, mask_band, bits, options) {
  // cast params in case they are not EE objects
  var bits_dict = ee.Dictionary(bits);
  var opt = ee.List(options);
  image = ee.Image(image).select(mask_band);
  var first = ee.Image.constant(0); // init image
  // function for iterate over the options
  var for_iterate = function(option, ini) {
    var i = ee.Image(ini); // cast ini;
    // bits relation dict contains the option?
    var cond = bits_dict.contains(option);
    // get the mask for the option
    var mask = computeQAbits(ee.List(bits_dict.get(option)).get(0), 
                                   ee.List(bits_dict.get(option)).get(1), 
                                   option)(image);
    return ee.Image(ee.Algorithms.If(cond, 
                                     i.or(mask), 
                                     i));
  };
  var good_pix = ee.Image(opt.iterate(for_iterate, first));
  return good_pix.not();
};
var landsatTOA = function(options) {
  var bits = ee.Dictionary({'cloud': [4,4], 'shadow': [8,8], 'snow': [10,10]});
  //var bits = ee.Dictionary({'cloud': [14, 15], 'shadow': [6,7], 'snow': [10, 11]});
  var mask_band = 'BQA';
  // Parameters
  var opt = options || bits.keys();
  options = ee.List(opt);
  var wrap = function(image) {
    var good_pix = compute(image, mask_band, bits, options);
    return image.updateMask(good_pix);
  };
  return wrap;
};
var ndepainteres=0;
 //var shape=ee.FeatureCollection('users/canal/peru');
  var removeLayer = function(name) {
              var layers = Map.layers();
              // list of layers names
              var names = [];
              layers.forEach(function(lay) {
                var lay_name = lay.getName();
                names.push(lay_name);
              });
              // get index
              var index = names.indexOf(name);
              if (index > -1) {
                // if name in names
                var layer = layers.get(index);
                Map.remove(layer);
              } else {
               alert('La capa '+name+' no encontrado');
              }
            };
    var removeLayerSearch = function(name) {
              var layers = Map.layers();
              // list of layers names
              var names = [];
              layers.forEach(function(lay) {
                var lay_name = lay.getName();
                names.push(lay_name);
              });
              // get index
              var index = names.indexOf(name);
              if (index > -1) {
                // if name in names
                var layer = layers.get(index);
                Map.remove(layer);
              } else {
                return;
              }
            };
  var cargar= function(){
         ///Map.remove(inspector);
         inspector.clear();
         inspector.style().set('shown', true);
        inspector.add(ui.Label('Loading...', {color: 'gray'}));
        //Map.add(inspector);
     } ;    
 Map.onClick( function(coords){
   cargar();
  var circulo_interes=ee.Geometry.Point(ee.Number.parse(coords.lon.toFixed(3)),
                                            ee.Number.parse(coords.lat.toFixed(3))).buffer(500);
 var delimitacion=shape.filterBounds(circulo_interes).limit(1);
if(delimitacion.size().getInfo()>0){
       var delimitacion_first=delimitacion.first();
        var areaInteres=delimitacion_first.geometry();
        var nombre;
        var ubicacion;
        var uicn;
        if(capaSeleccionada==='Áreas Naturales Protegidas'){
           nombre=delimitacion_first.get('anp_cate').getInfo()+' '+delimitacion_first.get('anp_nomb').getInfo();
           ubicacion=delimitacion_first.get('anp_ubpo').getInfo();
           uicn=delimitacion_first.get('anp_uicn').getInfo();
        }
        else if(capaSeleccionada==='Área de Conservación Regional')
        {
          nombre=delimitacion_first.get('acr_nomb').getInfo();
          ubicacion=delimitacion_first.get('acr_ubpo').getInfo();
          uicn='';
        }
        else if(capaSeleccionada==='Distritos'){
           nombre=delimitacion_first.get('DISTRITO').getInfo();
           ubicacion=delimitacion_first.get('DEPARTAMEN').getInfo();
           uicn=delimitacion_first.get('PROVINCIA').getInfo();
        }
          if( ndepainteres!==0){
          removeLayerSearch('Área de interes');
          removeLayerSearch('Punto de interes');
          }
          Map.addLayer(areaInteres,{color: 'ff0080'},'Área de interes');
           Map.addLayer(circulo_interes,{color: '000000'},'Punto de interes');
         ndepainteres=1;
           generarAnimacion(areaInteres,nombre,ubicacion,uicn);
       }
});
var maskClouds =landsatTOA();
 //var shape=ee.FeatureCollection('users/arlestaboada/ACR');
//var shape=ee.FeatureCollection('users/canal/ANP');
//var shape=ee.FeatureCollection('users/canal/concesiones_forestales_serfor');
  var shape;
for (var key in layerProperties) {
  var layer = layerProperties[key];
  if(layer.defaultVisibility){
    shape=ee.FeatureCollection(layer.ruta);
    Map.addLayer(shape, {color:layer.color},layer.nombreCompleto);
    Map.centerObject(shape,5);   
  }
}
// Map.addLayer(shape,{color:'ffffbf'},'ANP');
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Hacer clip en el mapa'));
Map.add(inspector);
var generarAnimacion=function(gAreaInteres,name,ubi,cUicn){
  var collectionMedian;
  var arregloMedian=[];
  var median;
  var collectionLandsat;
  var anioInc;
  var collectionIndices;
  var collectionMosaic;
   var inicio= txtAnioInicio.getValue();
   var fin= txtAnioFin.getValue();
   arregloMedian=[];
   anioInc=inicio;
            // .filterDate( '1999-01-01','2012-12-31');
 while(anioInc>= inicio && anioInc<=fin){
   collectionLandsat=  landsatCollection
                             .filterDate( anioInc+'-01-01',anioInc+'-12-31')
                             .filterMetadata('CLOUD_COVER', 'less_than', 20)
                             .filterBounds(gAreaInteres)
                             .map(maskClouds);
    // collectionLandsat=collectionLandsat.map(maskClouds) 
    median= collectionLandsat.reduce(ee.Reducer.median());
     if(median.bandNames().size().getInfo()>0){
      arregloMedian.push(median);
     }
    //arregloMedian= arregloMedian.push(median);
   anioInc++;
 }
  collectionMedian=ee.ImageCollection( arregloMedian);
  collectionMedian.evaluate(function(){
             collectionIndices=collectionMedian.map(function(image){
            var ndvi= image.normalizedDifference(['B4_median', 'B3_median'])
                          .rename('NDVI');
            var ndwi= image.normalizedDifference(['B2_median', 'B4_median']).rename('NDWI');
            return image.addBands(ndvi).addBands(ndwi).select('NDVI','NDWI');
        });
        collectionIndices.evaluate(function(){
          collectionMosaic= collectionIndices.map(function(imagen){
           var agua=imagen.select('NDWI').gt(0);
           var vegetacion=imagen.select('NDVI');
           var mascara_agua= agua.updateMask(agua);
           var mascara_vegetacion= vegetacion
                             .updateMask(vegetacion);
          var aguaViz = {
                   min: 0, 
                   max: 1, 
                 palette: [ '0000FF']
                };  
          var vegetacionViz={
            min:-1,
            max:1,
           // palette: 'amarillo,verde claro,verde oscuro',
             palette: ['ff0000','ff0000','fff','00bb2d']
          };
         var mosaic = ee.ImageCollection
              ([
                   mascara_vegetacion.visualize(vegetacionViz),
                   mascara_agua.visualize(aguaViz),
              ]).mosaic();
              return mosaic;
        });
          collectionMosaic.evaluate(function(){
                     // Visualization parameters.
                var args = {
                  crs: 'EPSG:3857',  // Maps Mercator
                  dimensions: '400',
                  region: gAreaInteres,
                  framesPerSecond: 1,
                };
                var thumb;
                // Create a video thumbnail and add it to the map.
                  thumb = ui.Thumbnail({
                  // Specifying a collection for "image" animates the sequence of images.
                  image: collectionMosaic,
                  params: args,
                  style: {
                    position: 'top-right',
                    width: '400px'
                  }});
                  inspector.clear();
                  inspector.add(thumb);
                  var btncerrar=ui.Button({
                  label: 'Cerrar',
                  onClick: function() {
                    inspector.style().set('shown', false);
                  }
                });
                var descChart=ui.Label({
                  value:name,
                    style: {
                    fontWeight: 'bold',
                    }
                });
               var ubiPo;
               var desUicn;
               var labelFilmstrip=ui.Label('Ver',{},collectionMosaic.getFilmstripThumbURL(
                   {dimensions: '400x400',region: gAreaInteres, format: 'png','crs': 'EPSG:3857'}));
                var legendTitle = ui.Label(
                                'Leyenda',
                                {fontWeight: 'bold', fontSize: '20px', 
                                margin: '0 0 4px 0', padding: '0'});
                  var legendSecuencia = ui.Label(
                                'Secuencia de imágenes de animación',
                                {fontWeight: 'bold', fontSize: '18px', 
                                margin: '0 0 4px 0', padding: '0'});
                 var desSecuencia = ui.Label(
                                'Por cada año se origina una imagen',
                                { fontSize: '15px', 
                                margin: '0 0 4px 0', padding: '0'});
               var panelDerecho;
              if(capaSeleccionada==='Áreas Naturales Protegidas'){  
                    ubiPo=ui.Label('Ubicación Política: '+ubi);
                    desUicn=ui.Label('Categoría UICN: ' +cUicn);
                    panelDerecho=    ui.Panel
                                        ([
                                            btncerrar,
                                            descChart,
                                            ubiPo,
                                            desUicn,
                                            legendSecuencia,
                                            desSecuencia,
                                            labelFilmstrip,
                                            legendTitle,
                                        ]
                                          ,ui.Panel.Layout.flow('vertical')
                                        );
              }
              else if(capaSeleccionada==='Área de Conservación Regional'){
                    ubiPo=ui.Label('Ubicación Política: '+ubi);
                    panelDerecho=    ui.Panel
                                        ([
                                            btncerrar,
                                            descChart,
                                            ubiPo,
                                            legendSecuencia,
                                            desSecuencia,
                                            labelFilmstrip,
                                            legendTitle,
                                        ]
                                          ,ui.Panel.Layout.flow('vertical')
                                        );
              }
              else if(capaSeleccionada==='Distritos'){
                 ubiPo=ui.Label('Departamento: '+ubi);
                    desUicn=ui.Label('Provincia: ' +cUicn);
                    panelDerecho=    ui.Panel
                                        ([
                                            btncerrar,
                                            descChart,
                                            ubiPo,
                                            desUicn,
                                            legendSecuencia,
                                            desSecuencia,
                                            labelFilmstrip,
                                            legendTitle,
                                        ]
                                          ,ui.Panel.Layout.flow('vertical')
                                        );
              }
                             var names=['Vegetación vigorosa','Vegetacion poca vigorosa (Blanco)','Suelo desnudo','Agua','Nube'];
                             var colors=['00bb2d' ,'fff' ,'ff0000','0000ff','000'];
                            for(var z=0;z<names.length;z++){
                                   var colorBox = ui.Label('', {
                                 backgroundColor: colors[z],
                                // Use padding to give the box height and width.
                                padding: '8px',
                                margin: '0'
                              });        
                                var description = ui.Label(names[z], {margin: '0 0 4px 6px'}); 
                              panelDerecho.add( ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
                      }  
                 inspector.add(panelDerecho);
                //inspector.add(labelFilmstrip);
                  });
        });
  });
};
     Map.style().set('cursor', 'crosshair');  
     ui.root.insert(0, main);