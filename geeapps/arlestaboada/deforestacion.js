var app = {};
var ncapas=0;
//variables
 var nmap=0;
 var ncadastre=0;
 var nanp=0;
 var ncfores=0;
 var nianpm=0;
 var nicfm=0;
 var ndepainteres=0;
 var mineria_collection;
 var landsatCollection;
//cargando shape
var shape_peru=ee.FeatureCollection('users/canal/peru');
var peru=ee.FeatureCollection('users/canal/peru').geometry();
var cuenca_amazonica=ee.FeatureCollection('users/canal/limite').geometry();
var CMI_WGS84_17S =ee.FeatureCollection('users/canal/CMI_WGS84_17S');
var CMI_WGS84_18S =ee.FeatureCollection('users/canal/CMI_WGS84_18S');
var CMI_WGS84_19S =ee.FeatureCollection('users/canal/CMI_WGS84_19S');
var ANP=ee.FeatureCollection('users/canal/ANP');
var concesionesForestalesSerfor=ee.FeatureCollection('users/canal/concesiones_forestales_serfor');
//animacion
var fecha = new Date();
var anioActual = fecha.getFullYear();
var capaSeleccionada='Áreas Naturales Protegidas';
var arrayListMosaic=[];
var shape=ANP;
//leyenda
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Leyenda de Capas',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
  var verde='00FF00'; var celeste='b2ffff'; var oliva='808000';
  var amarillo='ffff00'; var azul='0047e6';var rosado='e60094'; var rojo='e62c00'; var negro='000000';
  var  anaranjado='ff6600'; var cafe='4b3621';  var crema='ffffbf';
  var paletteLegend =[ amarillo,azul,verde,crema,anaranjado,cafe,rojo];
  var namesLegend=['Áreas Naturales Protegidas','Catastro Minero','Concesiones Forestales',
                   'Cuenca Amazónica y punto de interés','Intersección entre Área Natural Protegida y Minería',
                    'Intersección entre Concesiones Forestales y Minería',
                    ' Pérdida de cobertura forestal'];
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Deforestación',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación utiliza información del estado ' +
               'e imágenes sateliatles para generar información.')
    ])
  };
  app.mapa={
       applyButton:ui.Button
                             ('Agregar', 
                              app.applyMap
                             ),
       applyButtonClear:ui.Button
                             ('Limpiar mapa', 
                              app.applyClear
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red',
                                  shown:false,
                               }
                           })
  };
  app.mapa.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('1) Mapa de cambio del 2000 al 2018-Hansen Global Forest Change(USGS/NASA) ',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.mapa.applyButton,
                                        app.mapa.applyButtonClear,
                                        app.mapa.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
    app.info={
      titleLongitud:ui.Label({value:'',}),
      longitud:ui.Label({value:'',}),
      titleLatitud:ui.Label({value:'',}),
      latitud:ui.Label({value:'',}),
      titleDepartamento:ui.Label({value:'',}),
      departamento:ui.Label({value:'',}),
      titleAnp:ui.Label({value:'',}),
      anp:ui.Label({value:''}),
      loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red',
                                  shown:false
                               }
                           })
    };
    app.info.panel=ui.Panel(
      {
                                widgets: 
                                [
                                    ui.Label('Inspector ',
                                              {fontWeight: 'bold'}),
                                     ui.Label('Haga clic en un punto en el mapa para inspeccionar.'),
                                      ui.Panel
                                    ([     app.info.loadingLabel, 
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    ),
                                    ui.Panel
                                    ([   
                                           app.info.titleLongitud,
                                           app.info.longitud
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    ),
                                     ui.Panel
                                    ([
                                           app.info.titleLatitud,
                                           app.info.latitud
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    ),
                                     ui.Panel
                                    ([
                                           app.info.titleDepartamento,
                                           app.info.departamento
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    ),
                                ],
                                style: app.SECTION_STYLE
                            }
      );
      //catastro minero
      app.cadastre={
       applyButton:ui.Button
                             ('Agregar', 
                              app.applyCadastre
                             ),
       applyButtonDelete:ui.Button
                             ('Quitar', 
                              app.applyClearCadastre
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red', 
                                  shown: false,
                               }
                           })
  };
  app.cadastre.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('3) Catastro Minero-INGEMMET',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.cadastre.applyButton,
                                        app.cadastre.applyButtonDelete,
                                        app.cadastre.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
     //area natural protegida                       
      app.anp={
       applyButton:ui.Button
                             ('Agregar', 
                              app.applyAnp
                             ),
       applyButtonDelete:ui.Button
                             ('Quitar', 
                              app.applyClearAnp
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red', 
                                  shown: false,
                               }
                           })
  };
  app.anp.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('2) Áreas naturales protegidas-SERNANP',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.anp.applyButton,
                                        app.anp.applyButtonDelete,
                                        app.anp.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
      //Concesiones forestales 
        app.concesionesForestales={
        applyButton:ui.Button
                             ('Agregar', 
                              app.applyConcesionesForestales
                             ),
       applyButtonDelete:ui.Button
                             ('Quitar', 
                              app.applyClearConcesionesForestales
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red', 
                                  shown: false,
                               }
                           })
  };
  app.concesionesForestales.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('4) Concesiones Forestales-OSINFOR-SERFOR',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.concesionesForestales.applyButton,
                                        app.concesionesForestales.applyButtonDelete,
                                        app.concesionesForestales.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
       //Intersección entre area natural protegida y mineria 
         app.interseccionAnpMineria={
        applyButton:ui.Button
                             ('Agregar', 
                              app.applyInterseccionAnpMineria
                             ),
       applyButtonDelete:ui.Button
                             ('Quitar', 
                              app.applyClearInterseccionAnpMineria
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red', 
                                  shown: false,
                               }
                           })
  };
  app.interseccionAnpMineria.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('5) Intersección entre Área Natural Protegida y Minería',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.interseccionAnpMineria.applyButton,
                                        app.interseccionAnpMineria.applyButtonDelete,
                                        app.interseccionAnpMineria.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
    //Intersección entre concesion forestal y mineria 
         app.interseccionCForestalMineria={
        applyButton:ui.Button
                             ('Agregar', 
                              app.applyInterseccionCForestalMineria
                             ),
       applyButtonDelete:ui.Button
                             ('Quitar', 
                              app.applyClearInterseccionCForestalMineria
                             ),
        loadingLabel: ui.Label
                          ({
                              value: 'Cargando...',
                              style:
                              {
                                  stretch: 'vertical', 
                                  color: 'red', 
                                  shown: false,
                               }
                           })
  };
  app.interseccionCForestalMineria.panel=ui.Panel
                            ({
                                widgets: 
                                [
                                    ui.Label('6) Intersección entre Concesiones Forestales y Minería',
                                              {fontWeight: 'bold'}),
                                    ui.Panel
                                    ([
                                        app.interseccionCForestalMineria.applyButton,
                                        app.interseccionCForestalMineria.applyButtonDelete,
                                        app.interseccionCForestalMineria.loadingLabel
                                    ]
                                      ,ui.Panel.Layout.flow('horizontal')
                                    )
                                ],
                                style: app.SECTION_STYLE
                            });
                        app.selector={
                          // Create a select with a function that reacts to the "change" event.
                          select: ui.Select({
                            items:  app.selectItems,
                            value:  app.selectItems[1],
                            onChange: function(selected) {
                                    for (var key in app.layerProperties) {
                                      var layer = app.layerProperties[key];
                                      app.removeLayerSearch(layer.nombreCompleto);
                                      if(selected===layer.nombreCompleto){
                                       // removeLayerSearch('Área de interes');
                                        capaSeleccionada=layer.nombreCompleto;
                                        shape=ee.FeatureCollection(layer.ruta);
                                        Map.addLayer(shape, {color:layer.color},layer.nombreCompleto);
                                      }
                                    }
                              }
                            })
                        }  ;
                        app.selector.panel = ui.Panel({
                                          widgets: [
                                            ui.Label('Generar Animación', {fontWeight: 'bold'}),
                                            app.selector.select,
                                          ],
                                          style: app.SECTION_STYLE
                                        });
                      app.shapeInspector = ui.Panel({
                                              layout: ui.Panel.Layout.flow('horizontal')
                                            });
                                            app.txtAnioInicio=ui.Textbox
                                                            ({
                                                               placeholder: 'Año Inicio',
                                                               value: '2010',
                                                               style: {width: '100px'}
                                                             });
                                              app.txtAnioFin=ui.Textbox
                                                  ({
                                                     placeholder: 'Año Fin',
                                                     value:  anioActual,
                                                     style: {width: '100px'}
                                                   });
                                                app.panelFilter= ui.Panel([
                                                  ui.Label({
                                                    value: 'Desde 1985',
                                                  }),
                                                ]);
};
/** Creates the app helper functions. */
app.createHelpers = function() {
   var collectionLandsatAnual_1985;
   var collectionLandsatAnual_2019;
    /** Applies the selection filters currently selected in the UI. */
    app.applyFilters = function() {
       collectionLandsatAnual_1985=ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                                      .filterBounds(peru)
                                      .filterDate('1998-01-01','1999-12-31')
                                      .filterMetadata('CLOUD_COVER', 'less_than', 20);
       collectionLandsatAnual_2019=ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                                      .filterBounds(peru)
                                      .filterDate('2017-01-01','2019-12-31')
                                      .filterMetadata('CLOUD_COVER', 'less_than', 20);
    };
    app.setLoadingModeMap = function(enabled)
                      {
                             app.mapa.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
  app.setLoadingModeCadastre = function(enabled)
                      {
                             app.cadastre.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
  app.setLoadingModeAnp = function(enabled)
                      {
                             app.anp.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
  app.setLoadingModeConcesionesForestales = function(enabled)
                      {
                             app.concesionesForestales.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
  app.setLoadingModeInterseccionAnpMineria = function(enabled)
                      {
                             app.interseccionAnpMineria.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
  app.setLoadingModeInterseccionCForestalMineria= function(enabled)
                      {
                             app.interseccionCForestalMineria.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
   app.setLoadingModeInfo= function(enabled)
                      {
                             app.info.loadingLabel
                                        .style()
                                        .set('shown',enabled);
                             //app.makeLoadDependentWidgets(enabled);
                      };
     app.applyMap=function(){
       if(nmap===0){
           app.setLoadingModeMap(true);
           var hansen = ee.Image('UMD/hansen/global_forest_change_2018_v1_6');
           var imageLoss = hansen.select('loss');
           var visParamsLoss={min: 0, max: 1, palette: [negro, rojo]};
           Map.addLayer(imageLoss.clip(peru), visParamsLoss,'Mapa de cambio del 2000 al 2018');
          Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
          imageLoss.evaluate(function(){
             app.setLoadingModeMap(false);
          });
       }
       else{
         alert('El mapa de cambio del 2000 al 2018 ya ha sido agregado.');
         return;
       }
       nmap=1;
     };
    app.applyClear=function(){
      Map.clear();
      nmap=0;
      ncadastre=0;
      nanp=0;
      ndepainteres=0;
      Map.add(app.shapeInspector);
      app.onclickMap();
    };
     app.removeLayer = function(name) {
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
       app.removeLayerSearch = function(name) {
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
     app.applyCadastre=function(){
       if(ncadastre===0){
           app.setLoadingModeCadastre(true);
           var mineria_array = [
              ee.Feature(CMI_WGS84_17S.geometry(), {name: 'Catastro minero'}),
              ee.Feature(CMI_WGS84_18S.geometry(), {name: 'Catastro minero'}),
              ee.Feature(CMI_WGS84_19S.geometry(), {name: 'Catastro minero'}),
            ];
          mineria_collection=ee.FeatureCollection( mineria_array);
          Map.addLayer(mineria_collection,{color: '0000ff'},'Catastro minero');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
           mineria_collection.evaluate(function(){
              app.setLoadingModeCadastre(false);
           });
       }
       else{
         alert('El shape de castastro minero ya ha sido agregado.');
         return;
       }
       ncadastre=1;
     };
      app.applyClearCadastre=function(){
            app.removeLayer('Catastro minero');
            ncadastre=0;
      };
       app.applyAnp=function(){
       if(nanp===0){
           app.setLoadingModeAnp(true);
          Map.addLayer(ANP,{color:'ffff00'},'Áreas Naturales Protegidas');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
            app.setLoadingModeAnp(false);
       }
       else{
         alert('El shape de áreas naturales protegida ya ha sido agregado.');
         return;
       }
       nanp=1;
     };
      app.applyClearAnp=function(){
            app.removeLayer('Áreas Naturales Protegidas');
            nanp=0;
      };
      app.applyConcesionesForestales=function(){
       if( ncfores===0){
          app.setLoadingModeConcesionesForestales(true);
          Map.addLayer(concesionesForestalesSerfor,{color: '54ff1c'},'Concesiones Forestales');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
            app.setLoadingModeConcesionesForestales(false);
       }
       else{
         alert('El shape de concesiones forestales protegida ya ha sido agregado.');
         return;
       }
        ncfores=1;
     };
      app.applyClearConcesionesForestales=function(){
            app.removeLayer('Concesiones Forestales');
             ncfores=0;
      };
      app.applyInterseccionAnpMineria=function(){
       if( nianpm===0){
          app.setLoadingModeInterseccionAnpMineria(true);
          var cruce_mineria_anp = mineria_collection.geometry().intersection(ANP.geometry(), ee.ErrorMargin(1));
          Map.addLayer(cruce_mineria_anp,{color:anaranjado},'Intersección entre Área Natural Protegida y Catastro Minero');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
            cruce_mineria_anp.evaluate(function(){
                app.setLoadingModeInterseccionAnpMineria(false);
            });
       }
       else{
         alert('La intersección entre área natural protegida y catastro minero ya ha sido agregado.');
         return;
       }
        nianpm=1;
     };
      app.applyClearInterseccionAnpMineria=function(){
            app.removeLayer('Intersección entre Área Natural Protegida y Catastro Minero');
             nianpm=0;
      };
       app.applyInterseccionCForestalMineria=function(){
       if( nicfm===0){
         app.setLoadingModeInterseccionCForestalMineria(true);
          var cruce_mineria_forestales = mineria_collection.geometry().intersection(concesionesForestalesSerfor.geometry(), ee.ErrorMargin(1));
          Map.addLayer(cruce_mineria_forestales,{color:cafe},'Intersección entre Concesión Forestal y Catastro Minero');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
            cruce_mineria_forestales.evaluate(function(){
                app.setLoadingModeInterseccionCForestalMineria(false);
            });
       }
       else{
         alert('La intersección entre concesión forestal y catastro minero ya ha sido agregado.');
         return;
       }
        nicfm=1;
     };
      app.applyClearInterseccionCForestalMineria=function(){
            app.removeLayer('Intersección entre Concesión Forestal y Catastro Minero');
             nicfm=0;
      };
      // Creates and styles 1 row of the legend.
      app.makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
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
   app.cargar= function(){
         app.shapeInspector.clear();
         app.shapeInspector.style().set('shown', true);
        app.shapeInspector.add(ui.Label('Loading...', {color: 'gray'}));
     } ;   
  app.generarAnimacion=function(gAreaInteres,name,ubi,cUicn){
  var collectionMedian;
  var arregloMedian=[];
  var median;
  var collectionLandsat;
  var anioInc;
  var collectionIndices;
  var collectionMosaic;
   var inicio= app.txtAnioInicio.getValue();
   var fin= app.txtAnioFin.getValue();
   arregloMedian=[];
   anioInc=inicio;
landsatCollection.evaluate(function(){
  while(anioInc>= inicio && anioInc<=fin){
   collectionLandsat=  landsatCollection
                             .filterDate( anioInc+'-01-01',anioInc+'-12-31')
                             .filterMetadata('CLOUD_COVER', 'less_than', 20)
                             .filterBounds(gAreaInteres)
               //              .map(maskClouds);
    // collectionLandsat=collectionLandsat.map(maskClouds) 
    median= collectionLandsat.reduce(ee.Reducer.median());
     if(median.bandNames().size().getInfo()>0){
      arregloMedian.push(median);
     }
    //arregloMedian= arregloMedian.push(median);
   anioInc++;
 }
 collectionMedian=ee.ImageCollection(arregloMedian);
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
                  app.shapeInspector.clear();
                  app.shapeInspector.add(thumb);
                  var btncerrar=ui.Button({
                  label: 'Cerrar',
                  onClick: function() {
                    app.shapeInspector.style().set('shown', false);
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
                 app.shapeInspector.add(panelDerecho);
                //shapeInspector.add(labelFilmstrip);
                  });
        });
  });
});
};
      app.start=function() {
        // Add a label to the panel.
      app.shapeInspector.add(ui.Label('Hacer clip en el mapa'));
      Map.add(app.shapeInspector);
      app.applyMap();
      app.applyAnp();
      app.applyCadastre();
      app.applyConcesionesForestales();
      app.applyInterseccionAnpMineria();
      app.applyInterseccionCForestalMineria();
      app.removeLayer('Cuenca amazónica');
      Map.addLayer(cuenca_amazonica,{color:crema},'Cuenca amazónica');
          // Add color and and names
          for (var i = 0; i <paletteLegend.length; i++) {
            legend.add(app.makeRow(paletteLegend[i], namesLegend[i]));
            }  
           Map.add(legend);
    };
     app.onclickMap=function(){
     Map.onClick( function(coords){
      app.cargar();
      var delimitacionDepa_first;
      app.setLoadingModeInfo(true);
      app.info.titleLongitud.setValue('Longitud:').style().set('fontWeight', 'bold');
      app.info.longitud.setValue(coords.lon.toFixed(6));
      app.info.titleLatitud.setValue('Latitud:').style().set('fontWeight', 'bold');
      app.info.latitud.setValue(coords.lat.toFixed(6));
      var circulo_interes=ee.Geometry.Point(ee.Number.parse(coords.lon.toFixed(3)),
                                            ee.Number.parse(coords.lat.toFixed(3))).buffer(500);
      var delimitacionDepa=shape_peru.filterBounds(circulo_interes).limit(1);
      if(delimitacionDepa.size().getInfo()>0){
          delimitacionDepa_first=delimitacionDepa.first();
          Map.addLayer(circulo_interes,{color: '000000'},'Punto de interes');
           app.info.titleDepartamento.setValue('Departamento:').style().set('fontWeight', 'bold');
          app.info.departamento.setValue(delimitacionDepa_first.get('DEPARTAMEN').getInfo());
           app.setLoadingModeInfo(false);
       }else{
           app.info.titleDepartamento.setValue('');
           app.info.departamento.setValue('');
            app.setLoadingModeInfo(false);
       }
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
          app.removeLayerSearch('Área de interes');
          app.removeLayerSearch('Punto de interes');
          }
          Map.addLayer(areaInteres,{color: 'ff0080'},'Área de interes');
           Map.addLayer(circulo_interes,{color: '000000'},'Punto de interes');
         ndepainteres=1;
          app.generarAnimacion(areaInteres,nombre,ubicacion,uicn);
       }
   } );
  }
      app.iniciando= function(){
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
    /** Refreshes the current map layer based on the UI widget states. */
    app.refreshMapLayer = function() {
    };
};
/** Creates the app constants. */
app.createConstants = function() {
app.layerProperties = {
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
                app.selectItems = Object.keys(app.layerProperties);
};
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
       app.intro.panel,
       app.info.panel,
       app.selector.panel,
       app.panelFilter,
       ui.Panel
      ([
        app.txtAnioInicio,
        app.txtAnioFin,
      ]
        ,ui.Panel.Layout.flow('horizontal')
      ),
       app.mapa.panel,
       app.anp.panel,
       app.cadastre.panel,
       app.concesionesForestales.panel,
       app.interseccionAnpMineria.panel,
       app.interseccionCForestalMineria.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.centerObject(peru,5);
  Map.style().set('cursor', 'crosshair');
  ui.root.insert(0, main);
  app.applyFilters();
  app.iniciando(),
  app.start();
  app.onclickMap();
};
app.boot();