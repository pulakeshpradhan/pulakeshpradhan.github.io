var app = {};
var ncapas=0;
//variables
 var nmap=0;
 var ncadastre=0;
 var nanp=0;
 var ncfores=0;
 var nianpm=0;
 var nicfm=0;
 var mineria_collection;
//cargando shape
var shape_peru=ee.FeatureCollection('users/canal/peru');
var peru=ee.FeatureCollection('users/canal/peru').geometry();
var cuenca_amazonica=ee.FeatureCollection('users/canal/limite').geometry();
var CMI_WGS84_17S =ee.FeatureCollection('users/canal/CMI_WGS84_17S');
var CMI_WGS84_18S =ee.FeatureCollection('users/canal/CMI_WGS84_18S');
var CMI_WGS84_19S =ee.FeatureCollection('users/canal/CMI_WGS84_19S');
var ANP=ee.FeatureCollection('users/canal/ANP');
var concesionesForestalesSerfor=ee.FeatureCollection('users/canal/concesiones_forestales_serfor');
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
  var  anaranjado='ff6600';
  var paletteLegend =[ amarillo,azul,verde,negro,rojo,anaranjado];
  var namesLegend=['Áreas Naturales Protegidas','Catastro Minero','Concesiones Forestales',
                   'Cuenca Amazónica y punto de interés','Intersección entre Área Natural Protegida y Minería',
                    'Intersección entre Concesiones Forestales y Minería'];
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
                                    ui.Label('1) Mapa de cambio de 1999 al 2019 ',
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
                                      ui.Panel
                                    ([
                                           app.info.titleAnp,
                                           app.info.anp
                                    ]
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
                                    ui.Label('3) Catastro Minero',
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
                                    ui.Label('2) Áreas naturales protegidas',
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
                                    ui.Label('4) Concesiones Forestales',
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
            var collectionLT=collectionLandsatAnual_1985.map(function(imagen){
            var ndvi_LT05= imagen.normalizedDifference(['B4', 'B3'])
                          .rename('NDVI');
            return imagen.addBands(ndvi_LT05).select('NDVI');
          });
           var collectionLC=collectionLandsatAnual_2019.map(function(imagen){
              var ndvi_LC08= imagen.normalizedDifference(['B5', 'B4'])
                            .rename('NDVI');
              return imagen.addBands(ndvi_LC08).select('NDVI');
          });
          var median_2019 = collectionLC.reduce(ee.Reducer.median());
           var median_1985 = collectionLT.reduce(ee.Reducer.median());
          var diferenciaNDVI = median_2019.subtract( median_1985).rename('Diferencia_NDVI');
          var degradadoParams = {min: -1, max: 1, palette: ['blue','red', 'white', 'green']};
          Map.addLayer(shape_peru,{},'Delimitación territorial del Perú');
          Map.addLayer(diferenciaNDVI.select('Diferencia_NDVI').clip(peru),degradadoParams,'Mapa de Cambio de 1999 al 2019');
          Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
          diferenciaNDVI.evaluate(function(){
             app.setLoadingModeMap(false);
          });
       }
       else{
         alert('El mapa de cambio de 1999 al 2019 ya ha sido agregado.');
         return;
       }
       nmap=1;
     };
    app.applyClear=function(){
      Map.clear();
      nmap=0;
      ncadastre=0;
      nanp=0;
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
           Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
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
          Map.addLayer(ANP,{color:'ffff00'},'Áreas naturales protegidas');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
            app.setLoadingModeAnp(false);
       }
       else{
         alert('El shape de áreas naturales protegida ya ha sido agregado.');
         return;
       }
       nanp=1;
     };
      app.applyClearAnp=function(){
            app.removeLayer('Áreas naturales protegidas');
            nanp=0;
      };
      app.applyConcesionesForestales=function(){
       if( ncfores===0){
          app.setLoadingModeConcesionesForestales(true);
          Map.addLayer(concesionesForestalesSerfor,{color: '54ff1c'},'Concesiones Forestales');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
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
          Map.addLayer(cruce_mineria_anp,{color: 'ff0000'},'Intersección entre Área Natural Protegida y Catastro Minero');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
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
          Map.addLayer(cruce_mineria_forestales,{color: 'ff6600'},'Intersección entre Concesión Forestal y Catastro Minero');
           app.removeLayer('Cuenca amazónica');
           Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
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
      app.start=function() {
      app.applyMap();
      app.applyAnp();
      app.applyCadastre();
      app.applyConcesionesForestales();
      app.applyInterseccionAnpMineria();
      app.applyInterseccionCForestalMineria();
      app.removeLayer('Cuenca amazónica');
      Map.addLayer(cuenca_amazonica,{},'Cuenca amazónica');
          // Add color and and names
          for (var i = 0; i <paletteLegend.length; i++) {
            legend.add(app.makeRow(paletteLegend[i], namesLegend[i]));
            }  
           Map.add(legend);
    };
    Map.onClick( function(coords){
      var delimitacionDepa_first;
      app.setLoadingModeInfo(true);
      app.info.titleLongitud.setValue('Longitud:').style().set('fontWeight', 'bold');
      app.info.longitud.setValue(coords.lon.toFixed(6));
      app.info.titleLatitud.setValue('Latitud:').style().set('fontWeight', 'bold');
      app.info.latitud.setValue(coords.lat.toFixed(6));
      var circulo_interes=ee.Geometry.Point(ee.Number.parse(coords.lon.toFixed(3)),
                                            ee.Number.parse(coords.lat.toFixed(3))).buffer(5000);
      var delimitacionDepa=shape_peru.filterBounds(circulo_interes).limit(1);
       var delimitacionAnp=ANP.filterBounds(circulo_interes).limit(1);
      if(delimitacionDepa.size().getInfo()>0){
          delimitacionDepa_first=delimitacionDepa.first();
          Map.addLayer(circulo_interes,{color: '000000'},'Punto de interes');
           app.info.titleDepartamento.setValue('Departamento:').style().set('fontWeight', 'bold');
          app.info.departamento.setValue(delimitacionDepa_first.get('DEPARTAMEN').getInfo());
       }else{
           app.info.titleDepartamento.setValue('');
           app.info.departamento.setValue('');
       }
        if(delimitacionAnp.size().getInfo()>0){
         var delimitacionAnp_first=delimitacionAnp.first();
         delimitacionAnp_first.evaluate(function(){
            app.setLoadingModeInfo(false);
         });
          app.info.titleAnp.setValue('Área natural protegida:').style().set('fontWeight', 'bold');
          app.info.anp.setValue(delimitacionAnp_first.get('anp_cate').getInfo()+' '+
          delimitacionAnp_first.get('anp_nomb').getInfo());
       }else{
          delimitacionDepa_first.evaluate(function(){
               app.setLoadingModeInfo(false);
          });
          app.info.titleAnp.setValue('');
          app.info.anp.setValue('');
       }
   } );
    /** Refreshes the current map layer based on the UI widget states. */
    app.refreshMapLayer = function() {
    };
};
/** Creates the app constants. */
app.createConstants = function() {};
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
       app.intro.panel,
       app.info.panel,
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
  app.start();
};
app.boot();