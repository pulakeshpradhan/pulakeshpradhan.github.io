var app={};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Visor del Lago Chinchaycocha-VICHI',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación te permite filtrar y exportar imágenes, ' +
               'de la colección Landsat .')
    ])
  };
app.layerPropertiesPeriodo = {
  'Anual': {
    name: '01',
  },
  'Mensual': {
    name: '02',
  },
};
app.selectItemsPeriodo = Object.keys( app.layerPropertiesPeriodo);
 app.pickerPeriodo = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
       items: app.selectItemsPeriodo ,
      placeholder: 'Selecciona un periodo ',
      value: app.selectItemsPeriodo[0],
     onChange: app.refreshMapLayerPeriodo
    }),
    labelPeriodo:ui.Label('Período',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'}),
    labelPorcentaje:ui.Label('Porcentaje de nube(0-100)',
  {margin: '0 0 0 28px',fontSize: '12px',color: 'gray'}),
   selectPn:ui.Textbox({placeholder: 'Porcentaje de Nube',  
              value: '23',style: {width: '150px'}}),
  };
  /* The panel for the picker section with corresponding widgets. */
  app.pickerPeriodo.panel = ui.Panel({
    widgets: [
      ui.Label('1) Selecciona un período', {fontWeight: 'bold'}),
       ui.Panel([
          app.pickerPeriodo.labelPeriodo,
          app.pickerPeriodo.labelPorcentaje,
         ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.pickerPeriodo.select,
         app.pickerPeriodo.selectPn,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE,
  });
  /* The collection filter controls. */
  app.filters = {
     selectYr: ui.Textbox({placeholder: 'Year',  value: '2020',style: {width: '100px'}}),
    applyButton: ui.Button('Aplicar filtro', app.applyFilters),
    centerButton: ui.Button('Centrar Mapa', app.centerMap),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'red', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Coloque el año ', {fontWeight: 'bold'}),
      ui.Label('Desde 1984', app.HELPER_TEXT_STYLE), app.filters.selectYr,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
       app.filters.centerButton,
    ],
    style: app.SECTION_STYLE_true
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
   onChange: app.refreshMapLayer
    }),
    fecha_ad:ui.Label({
      value:'' ,
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Selecciona una imagen', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Fecha de adquisicion:',{fontWeight: 'bold'}),app.picker.fecha_ad
    ],
    style: app.SECTION_STYLE
  });
  app.layerPropertiesMensual = {
  'Enero': {
    name: '01',
  },
  'Febrero': {
    name: '02',
  },
  'Marzo': {
    name: '03',
  },
  'Abril': {
    name: '04',
  },
  'Mayo': {
    name: '05',
  },
  'Junio': {
    name: '06',
  },
  'Julio': {
    name: '07',
  },
  'Agosto': {
    name: '08',
  },
  'Septiembre': {
    name: '09',
  },
  'Octubre': {
    name: '10',
  },
  'Noviembre': {
    name: '11',
  },
  'Diciembre': {
    name: '12',
  },
};
 app.selectItemsMensual = Object.keys( app.layerPropertiesMensual);
   /* The image picker section. */
  app.pickerMensual = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
       items: app.selectItemsMensual,
       placeholder: 'Selecciona un mes ',
       value: app.selectItemsMensual[0],
       onChange: app.applyFiltersMensual
    }),
      applyButton: ui.Button('Aplicar filtro', app.applyFiltersMensual),
      loadingLabel: ui.Label
                  ({
                      value: 'Cargando...',
                      style:
                      {
                          stretch: 'vertical', 
                          color: 'red', 
                          shown: false,
                       }
                   }),
                    centerButton: ui.Button('Centrar Mapa', app.centerMap),
  };
  /* The panel for the picker section with corresponding widgets. */
  app.pickerMensual.panel = ui.Panel({
    widgets: [
      ui.Label('Selecciona un mes', {fontWeight: 'bold'}),
      ui.Panel([
        app.pickerMensual.select,
      ], ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
        app.pickerMensual.applyButton,
        app.pickerMensual.loadingLabel,
      ], ui.Panel.Layout.flow('horizontal')),
       app.pickerMensual.centerButton
    ],
    style: app.SECTION_STYLE_false
  });
/* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Seleccione una visualización', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
    app.calcularInundacionTotal={
     btnCalcularInuncacionTotal: ui.Button('Calcular', app.btnCalcularInundacionTotal),
      inundacion: ui.Label(),
      fecha: ui.Label(),
      loadingLabel: ui.Label
                  ({
                      value: 'Cargando...',
                      style:
                      {
                          stretch: 'vertical', 
                          color: 'red', 
                          shown: false,
                       }
                   }),
  };
  app.calcularInundacionTotal.panel=ui.Panel({
    widgets: [
      ui.Label('4) Calcular Inundación Total', {fontWeight: 'bold'}),
       ui.Panel([
         app.calcularInundacionTotal.btnCalcularInuncacionTotal,
        app.calcularInundacionTotal.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
     // app.calcularInundacionTotal.inundacion,
     // app.calcularInundacionTotal.fecha,
    ],
    style: app.SECTION_STYLE
  });
   app.selectorComunidades = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.comunidades),
      onChange: function() {
        app.refreshComunidad(false);
        app.actDesCheckBox();
      }
    }),
     checkBox_capa:ui.Checkbox('Capa', false),
     btnInundacion: ui.Button('Calcular', app.calcularPorComunidad),
     comunidad: ui.Label(),
     inundacion: ui.Label(),
     fecha: ui.Label(),
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
   app.selectorComunidades.panel = ui.Panel({
    widgets: [
      ui.Label('5) Seleccione una comunidad campesina', {fontWeight: 'bold'}),
       ui.Panel([
          app.selectorComunidades.select,
           app.selectorComunidades.checkBox_capa,
        ], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([
          app.selectorComunidades.btnInundacion,
          app.selectorComunidades.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
      // app.selectorComunidades.comunidad,
      // app.selectorComunidades.inundacion,
       //app.selectorComunidades.fecha,
    ],
    style: app.SECTION_STYLE
  });
   app.selectorComunidades.select.setValue(app.selectorComunidades.select.items().get(0));
      app.changeInspector=
                                  {
                                     lon :ui.Label(),
                                     lat :ui.Label(),
                                     loadingLabel:ui.Label
                                                ({
                                                    value: 'Cargando...',
                                                    style: {
                                                             stretch: 'vertical', 
                                                             color: 'red',
                                                             shown: false
                                                            }
                                                })
                                  };
              app.changeInspector.panel=ui.Panel
                                       ({
                                          widgets: [
                                                      ui.Label('6) Inspector', {fontWeight: 'bold'}),
                                                      ui.Label('Haga clic en un punto en el mapa para obtener coordenada.'),
                                                      app.changeInspector.lon,
                                                      app.changeInspector.lat,
                                                      app.changeInspector.loadingLabel,
                                                    ],
                                                    style: app.SECTION_STYLE
                                       });
           app.clasificacion=
                      {
                        btnClasificar:ui.Button('Aplicar filtro',
                                      app.aplicarClasificacion),
                         fecha: ui.Label(),             
                         loadingLabel:ui.Label
                                      ({
                                          value: 'Cargando...',
                                          style: {
                                                   stretch: 'vertical', 
                                                   color: 'red',
                                                   shown: false
                                                  }
                                      })
                      };
           app.clasificacion.panel=ui.Panel
                                     ({
                                        widgets: 
                                        [
                                          ui.Label('7) Clasificación de cobertura',
                                                  {fontWeight: 'bold'}),
                                          ui.Panel(
                                                    [
                                                      app.clasificacion.btnClasificar,
                                                      app.clasificacion.loadingLabel
                                                    ],
                                                    ui.Panel.Layout.flow('horizontal')
                                                 ),
                                           //app.clasificacion.fecha,
                                        ],
                                        style: app.SECTION_STYLE
                                      });
           app.clasificacionReserva=
                                       {
                                            btnClasificarReserva:ui.Button('Aplicar filtro', 
                                                                 app.aplicarClasificacionReserva),
                                            descripcion:  ui.Label('',
                                                          {fontWeight: 'bold'}),
                                            fecha: ui.Label(),              
                                            vegetacion: ui.Label(),
                                            bofedal: ui.Label(),
                                            agua: ui.Label(),
                                            suelo:ui.Label(),
                                            loadingLabel:ui.Label
                                                        ({
                                                            value: 'Cargando...',
                                                            style: {
                                                                     stretch: 'vertical', 
                                                                     color: 'red',
                                                                     shown: false
                                                                    }
                                                        })
                                        };
              app.clasificacionReserva.panel=ui.Panel
                                            ({
                                                  widgets: 
                                                  [
                                                        ui.Label('8) Clasificación de cobertura en la Reserva Nacional de Junín', 
                                                                {fontWeight: 'bold'}),
                                                        ui.Panel(
                                                                  [
                                                                    app.clasificacionReserva.btnClasificarReserva,
                                                                    app.clasificacionReserva.loadingLabel
                                                                  ],
                                                                  ui.Panel.Layout.flow('horizontal')
                                                               ),
                                                            /*  
                                                                app.clasificacionReserva.descripcion,
                                                                 app.clasificacionReserva.fecha,
                                                                app.clasificacionReserva.vegetacion,
                                                                app.clasificacionReserva.bofedal,
                                                                app.clasificacionReserva.agua,
                                                                app.clasificacionReserva.suelo,
                                                                */
                                                    ],
                                                  style: app.SECTION_STYLE
                                            });
        app.waterChartDescription={
                                      description:ui.Label('9) Cambio de cobertura de cuerpo de agua en la Reserva Nacional de Junín', 
                                                                          {fontWeight: 'bold'}),
                                                 };   
                      app.waterChartDescription.panel= ui.Panel({
                                         widgets: [
                                                        ui.Panel(
                                                                  [
                                                                      app.waterChartDescription.description,
                                                                  ]
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });
           app.waterChartLandsat05={
                                   btnWaterChart:ui.Button(
                                                           'Generar gráfico', 
                                                            app.makeChartWaterLandsat05
                                                           ),
                                   loadingLabel:ui.Label
                                                        ({
                                                            value: 'Cargando...',
                                                            style: {
                                                                     stretch: 'vertical', 
                                                                     color: 'red',
                                                                     shown: false
                                                                    }
                                                        })
                                };
                app.waterChartLandsat05.panel= ui.Panel
                                      ({
                                         widgets: [
                                                      ui.Label('9.1) De 1984 al 2011', {fontWeight: 'bold'}),
                                                      ui.Panel(
                                                                  [
                                                                     app.waterChartLandsat05.btnWaterChart,
                                                                     app.waterChartLandsat05.loadingLabel,
                                                                  ],
                                                                  ui.Panel.Layout.flow('horizontal')
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });
                      app.waterChartLandsat08={
                                   btnWaterChart:ui.Button(
                                                           'Generar gráfico', 
                                                            app.makeChartWaterLandsat08
                                                           ),
                                   loadingLabel:ui.Label
                                                        ({
                                                            value: 'Cargando...',
                                                            style: {
                                                                     stretch: 'vertical', 
                                                                     color: 'red',
                                                                     shown: false
                                                                    }
                                                        })
                                };
                app.waterChartLandsat08.panel= ui.Panel
                                      ({
                                         widgets: [
                                                      ui.Label('9.2) Del 2013 a la actualidad', {fontWeight: 'bold'}),
                                                      ui.Panel(
                                                                  [
                                                                     app.waterChartLandsat08.btnWaterChart,
                                                                     app.waterChartLandsat08.loadingLabel,
                                                                  ],
                                                                  ui.Panel.Layout.flow('horizontal')
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });
                    app.bofedalChartDescription={
                                                    description:ui.Label('10) Cambio de cobertura de bofedales y pastizales húmedos en la Reserva Nacional de Junín', 
                                                                          {fontWeight: 'bold'}),
                                                 } ;       
                      app.bofedalChartDescription.panel= ui.Panel({
                                         widgets: [
                                                        ui.Panel(
                                                                  [
                                                                       app.bofedalChartDescription.description,
                                                                  ]
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });
                 app.bofedalChartL08=
                                 {
                                   btnBofedalChart:ui.Button(
                                                           'Generar gráfico', 
                                                            app.makeChartBofedalL08
                                                           ),
                                   loadingLabel:ui.Label
                                                        ({
                                                            value: 'Cargando...',
                                                            style: {
                                                                     stretch: 'vertical', 
                                                                     color: 'red',
                                                                     shown: false
                                                                    }
                                                        })
                                };  
                   app.bofedalChartL08.panel=ui.Panel
                                      ({
                                         widgets: [
                                                    ui.Label('10.2) Del 2013 a la actualidad', {fontWeight: 'bold'}),
                                                      ui.Panel(
                                                                  [
                                                                     app.bofedalChartL08.btnBofedalChart,
                                                                     app.bofedalChartL08.loadingLabel,
                                                                  ],
                                                                  ui.Panel.Layout.flow('horizontal')
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });
                app.bofedalChartL05=
                                 {
                                   btnBofedalChart:ui.Button(
                                                           'Generar gráfico', 
                                                            app.makeChartBofedalL05
                                                           ),
                                   loadingLabel:ui.Label
                                                        ({
                                                            value: 'Cargando...',
                                                            style: {
                                                                     stretch: 'vertical', 
                                                                     color: 'red',
                                                                     shown: false
                                                                    }
                                                        })
                                };
                app.bofedalChartL05.panel=ui.Panel
                                      ({
                                         widgets: [
                                                    ui.Label('10.1) De 1984 al 2011', {fontWeight: 'bold'}),
                                                      ui.Panel(
                                                                  [
                                                                     app.bofedalChartL05.btnBofedalChart,
                                                                     app.bofedalChartL05.loadingLabel,
                                                                  ],
                                                                  ui.Panel.Layout.flow('horizontal')
                                                               ),
                                                  ],
                                                      style: app.SECTION_STYLE
                                    });                  
};
//crear funciones 
app.createHelpers = function() {
  var year;
  var anio_anterior;
  app.actDesCheckBox=function(){
     var bCheckBox=app.selectorComunidades.checkBox_capa.getValue();
     if(bCheckBox){
          Map.layers().get(Map.layers().length()-1).setShown(bCheckBox);
     }
     else{
        Map.layers().get(Map.layers().length()-1).setShown(bCheckBox);
     }
    if(app.intRCheckBox>1){
      app.selectorComunidades.checkBox_capa.onChange(function(checked){
          var indexLayerComunidad= app.indexLayer(app.layerAnterior);
          var indexLayerARNJ= app.indexLayer("Intersección de la comunidad y la RNJ ");
        if ( indexLayerComunidad > -1) {
                 Map.layers().get(indexLayerComunidad).setShown(checked);
              } 
         if ( indexLayerARNJ > -1) {
                 Map.layers().get(indexLayerARNJ).setShown(checked);
              } 
     });
    }
  };
  /** Applies the selection filters currently selected in the UI. */
     app.makeLoadDependentWidgets=function(enabled)
                                 {
                                     var loadDependentWidgets = 
                                                        [
                                                            app.vis.select,
                                                            app.filters.selectYr,
                                                            app.filters.applyButton,
                                                            app.filters.centerButton,
                                                            app.picker.select,
                                                            app.pickerPeriodo.select,
                                                            app.pickerPeriodo.selectPn,
                                                            app.clasificacion.btnClasificar,
                                                            app.clasificacionReserva.btnClasificarReserva,
                                                            app.waterChartLandsat05.btnWaterChart,
                                                            app.waterChartLandsat08.btnWaterChart,
                                                            app.calcularInundacionTotal.btnCalcularInuncacionTotal,
                                                            app.selectorComunidades.btnInundacion,
                                                            app.bofedalChartL05.btnBofedalChart,
                                                            app.bofedalChartL08.btnBofedalChart,
                                                         ];
                                      loadDependentWidgets.forEach(function(widget)
                                      {
                                         widget.setDisabled(enabled);
                                      });
                                 };
        app.setLoadingMode = function(enabled)
                            {
                                   app.filters.loadingLabel
                                              .style()
                                              .set('shown',enabled);
                                   app.makeLoadDependentWidgets(enabled);
                            };
         app.setLoadingInundacionTotal = function(enabled)
                            {
                                   app.calcularInundacionTotal.loadingLabel
                                              .style()
                                              .set('shown',enabled);
                                   app.makeLoadDependentWidgets(enabled);
                            };
         app.setLoadingInundacion = function(enabled)
                            {
                                   app.selectorComunidades.loadingLabel
                                              .style()
                                              .set('shown',enabled);
                                   app.makeLoadDependentWidgets(enabled);
                            };
          app.setLoadingModeChartWaterLandsat05=function(enabled) 
                                                    {
                                                         app.waterChartLandsat05.loadingLabel
                                                                                .style()
                                                                                .set('shown', enabled);
                                                        app.makeLoadDependentWidgets(enabled);
                                                    }; 
          app.setLoadingModeChartWaterLandsat08=function(enabled) 
                                  {
                                       app.waterChartLandsat08.loadingLabel
                                                              .style()
                                                              .set('shown', enabled);
                                      app.makeLoadDependentWidgets(enabled);
                                  };  
          app.setLoadingModeClassification=function(enabled) 
                                            {
                                                app.clasificacion.loadingLabel
                                                                        .style()
                                                                        .set('shown', enabled);
                                                app.makeLoadDependentWidgets(enabled);
                                            };
          app.setLoadingModeReserva = function(enabled) 
                                                        {
                                                            app.clasificacionReserva.loadingLabel
                                                                                    .style()
                                                                                    .set('shown', enabled);
                                                            app.makeLoadDependentWidgets(enabled);
                                                        };
            app.setLoadingModeChartBofedalL05=function(enabled) 
                                                    {
                                                         app.bofedalChartL05.loadingLabel
                                                                                .style()
                                                                                .set('shown', enabled);
                                                        app.makeLoadDependentWidgets(enabled);
                                                    }; 
         app.setLoadingModeChartBofedalL08=function(enabled) 
                                {
                                     app.bofedalChartL08.loadingLabel
                                                            .style()
                                                            .set('shown', enabled);
                                    app.makeLoadDependentWidgets(enabled);
                                }; 
  app.centerMap=function(){
      Map.centerObject(app.bounds,10);
  };
  app.crearLeyenda=function(titulo,paleta,nombres){
    var legend=ui.Panel({
          style: app.LEGEND_STYLE
        });
        var legendDate=ui.Label({
          value: app.imageDate,
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendDate);
        var legendTitle=ui.Label({
          value:titulo,
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendTitle);
        var palette=paleta;
        var names=nombres;
        for(var i=0;i<palette.length;i++){
          legend.add(app.makeLegend(palette[i],names[i]));
        }
        Map.add(legend);
  };
  app.applyFiltersMensual = function() {
     app.disabled=true;
     app.setLoadingMode(true);
    //layerProperties[layerSelect.getValue()].legend
    var sMes= app.pickerMensual.select.getValue();
    var nMes=parseInt(app.layerPropertiesMensual[sMes].name);
    var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA');
    var L8coll = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA');
    var IC_1 = L5coll.merge(L8coll);
    var pn= app.pickerPeriodo.selectPn.getValue();
    if(isNaN(pn)){
        alert('El valor ingresado para porcentaje de nube no es un número');
        if(app.disabled){
          app.setLoadingMode(false);
          app.disabled=false;
        }
        app.pickerPeriodo.selectPn.setValue('23');
          return;
    }
     else if(pn) {
             pn=ee.Number.parse(pn);
             var npn=ee.Number.parse(app.pickerPeriodo.selectPn.getValue()).getInfo();
             if(npn<0 || npn>100){
              if(app.disabled){
                app.setLoadingMode(false);
                app.disabled=false;
                }
               alert('El valor ingresado para porcentaje de nube debe estar en el rango de 0 a 100');
               return;
             }
        }
    app.ICfilter =ee.ImageCollection(IC_1)
                    .filterBounds(app.bounds)
                    .filter(ee.Filter.calendarRange( nMes, nMes, 'month'))
                    .filterMetadata('CLOUD_COVER','Less_than',pn);
     if(app.ICfilter.size().getInfo()===0){
        if(app.disabled){
            app.setLoadingMode(false);
            app.disabled=false;
          }
          alert('No hay imágenes disponible para este mes y porcentaje de nube.'
                +'Elige otro mes e ingresa otro porcentaje de nube .');
          return;
        }
    // Get the list of computed ids.
    var computedIds =  app.ICfilter
                 .map(function(image){
                   var nSi=ee.String(image.get('system:index')).slice(2);
                   return image.set('nSi',nSi);
                 })  
                .limit(app.IMAGE_COUNT_LIMIT)
                .reduceColumns(ee.Reducer.toList(), ['nSi'])
                .get('list')
                ;
     app.picker.select.items().reset(computedIds.getInfo());
     app.picker.select.setValue(app.picker.select.items().get(0));
       app.setLoadingMode(false);
  };
   app.applyFilters = function() {
     app.disabled=true;
      app.setLoadingMode(true);
     var IC;
   if(app.bContador){
         anio_anterior= app.selectYr;
     }
    // Filtrar variables
    app.selectYr = app.filters.selectYr.getValue();
    app.bContador=true;
   if(isNaN( app.selectYr)){
    if(app.disabled){
      app.setLoadingMode(false);
      app.disabled=false;
    }
    alert('El valor ingresado para el año no es un número');
    return;
   }
   else if(app.selectYr){ 
      if (app.selectYr) year = ee.Number.parse(app.selectYr);
       var nyear=year.getInfo();
     if(nyear===2012){
       if(app.disabled){
            app.setLoadingMode(false);
            app.disabled=false;
          }
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
    }
     else if(nyear>= 1984){
      IC = ee.Algorithms.If(
                year.eq(ee.Number(2012)),ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA'),
                ee.Algorithms.If(year.gt(ee.Number(2012)),
                ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA'),
                ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')));
    } else if(nyear<1984){
        if(app.disabled){
        app.setLoadingMode(false);
         app.disabled=false;
        }
        alert('EL año debe ser mayor o igual a 1984.');
        app.selectYr=anio_anterior;
        return;
    }           
   }
      var pn= app.pickerPeriodo.selectPn.getValue();
       if(isNaN(pn)){
        alert('El valor ingresado para porcentaje de nube no es un número');
        if(app.disabled){
          app.setLoadingMode(false);
          app.disabled=false;
        }
        app.pickerPeriodo.selectPn.setValue('23');
          return;
    }
     else if(pn) {
             pn=ee.Number.parse(pn);
             var npn=ee.Number.parse(app.pickerPeriodo.selectPn.getValue()).getInfo();
             if(npn<0 || npn>100){
              if(app.disabled){
                app.setLoadingMode(false);
                app.disabled=false;
                }
               alert('El valor ingresado para porcentaje de nube debe estar en el rango de 0 a 100');
               return;
             }
        }
     app.ICfilter = ee.ImageCollection(IC)
                  .filterBounds( app.bounds)
                  .filter(ee.Filter.dayOfYear(1,365))
                  .filter(ee.Filter.calendarRange(year,year,'year'))
                  .filterMetadata('CLOUD_COVER','Less_than',pn);
       if(app.ICfilter.size().getInfo()===0){
           if(app.disabled){
            app.setLoadingMode(false);
            app.disabled=false;
          }
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
    // Get the list of computed ids.
    var computedIds =  app.ICfilter
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
     if(app.disabled){
          app.setLoadingMode(false);
          app.disabled=false;
        }
    });
  };
   app.crearLeyendaComunidad=function(sLeyenda,nameComunidad,paleta,etiquetas,bComunidad,bTotal){
      var legend=ui.Panel({
          style:app.LEGEND_STYLE_comunidad
        });
        var legendDate=ui.Label({
          value: app.picker.fecha_ad.getValue(),
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendDate);
          if(bComunidad){
             var legendRNJ=ui.Label({
            value: "*ARNJ:Área dentro de la Reserva Nacional de Junín",
            style:app.LEGEND_TITLE_STYLE
          });
          legend.add(legendRNJ);
          var legendPorcentaje=ui.Label({
            value: "*Porcentaje:(Inundación/ARNJ)X100%",
            style:app.LEGEND_TITLE_STYLE
          });
          legend.add(legendPorcentaje);
        }
        else if(bTotal){
           var legendRNJTotal=ui.Label({
            value: "*RNJ:Reserva Nacional de Junín",
            style:app.LEGEND_TITLE_STYLE
          });
          legend.add(legendRNJTotal);
             var legendPorcentajeTotal=ui.Label({
            value: "*Porcentaje:(Inundación/RNJ)X100%",
            style:app.LEGEND_TITLE_STYLE
          });
          legend.add(legendPorcentajeTotal);
        }
        var legendTitle=ui.Label({
          value:sLeyenda+nameComunidad,
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendTitle);
        var palette=paleta;
        var names=etiquetas;
        for(var i=0;i<palette.length;i++){
          legend.add(app.makeLegendComunidad(palette[i],names[i]));
        }
        Map.add(legend);
        //app.leyendaAnterior=legend;
        return legend;
   };
  app.makeLegendComunidad=function(color,name){
        var colorBox=ui.Label({
          style:{
            backgroundColor:color,
            padding:'8px',
            margin:'0 0 4px 0'
          }
        });
      var description=ui.Label({
        value:name,
        style:{margin:'0 0 4px 6 px'}
      });
      return ui.Panel(
        {
          widgets:[colorBox,description],
          layout:ui.Panel.Layout.flow('horizontal')
        }
      );
  };
   app.makeLegend=function(color,name){
    var colorBox=ui.Label({
      style:{
        backgroundColor:'#'+color,
        padding:'8px',
        margin:'0 0 4px 0'
      }
    });
    var description=ui.Label({
      value:name,
      style:{margin:'0 0 4px 6 px'}
    });
    return ui.Panel(
      {
        widgets:[colorBox,description],
        layout:ui.Panel.Layout.flow('horizontal')
      }
    );
  };
  app.refreshMapLayerPeriodo=function(){
    var periodo= app.pickerPeriodo.select.getValue();
    if(periodo=="Mensual"){
       app.filters.panel.style().set('shown',false);
         app.pickerMensual.panel.style().set('shown',true);
        app.applyFiltersMensual();
    }
    else if(periodo=="Anual"){
       app.filters.panel.style().set('shown',true);
        app.pickerMensual.panel.style().set('shown',false);
        app.applyFilters();
    }
  };
  app.recogerCoordenadas=function(){
      Map.onClick(function(coords)
              {
                    app.changeInspector.lon.setValue
                    ('longitud: ' + coords.lon.toFixed(6));
                    app.changeInspector.lat.setValue
                    ('latitud: ' + coords.lat.toFixed(6));
                    var coordinates=ee.Geometry.Point
                                    (coords.lon,  coords.lat);
                    var dot= ui.Map.Layer(coordinates,{color:'ff0000'});
                    Map.layers().set(8, dot);
              }
            );
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
              } 
            };
  app.indexLayer = function(name) {
              var layers = Map.layers();
              // list of layers names
              var names = [];
              layers.forEach(function(lay) {
                var lay_name = lay.getName();
                names.push(lay_name);
              });
              // get index
              var index = names.indexOf(name);
             return index;
            };
   app.refreshComunidad=function(bARNJ){
     if(app.leyendaAnteriorComunidad){
       Map.remove(app.leyendaAnteriorComunidad);
     }
      if(app.aBETIQUETAS){
            Map.remove(app.leyendaAnteriorCampo);
         }
      if(app.bLayer){
         app.removeLayer(app.layerAnterior);
       if(app.aBETIQUETAS){
             if(app.comunidadAnteriorLayer){
                for (var llave in app.comunidadAnteriorLayer){
                 app.removeLayer(app.comunidadAnteriorLayer[llave][2]);
               }
             }
        }
      }
      app.bLayer=true;
     var nameCC=app.selectorComunidades.select.getValue();
     var scc=app.shapeCC.filter(ee.Filter.eq('Comunidad',nameCC));
     var nombreLayer='Comunidad Campesina de '+nameCC;
       Map.addLayer(scc,{color:'grey'}, nombreLayer,1);
     app.removeLayer("Intersección de la comunidad y la RNJ ");   
     if(bARNJ){
       var comunidadRNJ= scc.geometry().intersection(app.nationalReserveJunin);
        Map.addLayer(comunidadRNJ,{color:'orange'},"Intersección de la comunidad y la RNJ ");
     }
         var layerCC = app.comunidades[nameCC];
         app.aBETIQUETAS= layerCC.bEtiquetas;
         var listaMuestreo=layerCC.capas;
          if(listaMuestreo){
             app.leyendaAnteriorCampo= app.crearLeyendaComunidad('Leyenda de datos de campo de ',nameCC,layerCC.palette,layerCC.etiquetas,false,false);
           for (var key in listaMuestreo){
              Map.addLayer(listaMuestreo[key][0],listaMuestreo[key][1],
              listaMuestreo[key][2], listaMuestreo[key][3]);
           }
               app.comunidadAnteriorLayer=listaMuestreo;
          }
           if(app.intRCheckBox>1){
             Map.centerObject(scc,11);
           }
          app.intRCheckBox++;
           app.layerAnterior=nombreLayer;
   };
   app.layerOpcionDos=function(imageDos,swirDos,vizDos,slopeDos,imageIdDos){
    var inundado_encharcado;
    var mascara_inundado_encharcado;
    var mosaico;
    inundado_encharcado=swirDos.lt(0.145).and(slopeDos.lt(10));
    mascara_inundado_encharcado=inundado_encharcado.updateMask(inundado_encharcado);
    mosaico = ee.ImageCollection([
    mascara_inundado_encharcado.visualize({palette: ['0000ff']}),
    ]).mosaic();          
    Map.addLayer(imageDos,vizDos, imageIdDos);
    Map.addLayer(mosaico,{}, 'Presencia de agua');
    app.refreshComunidad(false);
    app.actDesCheckBox();
  };
  app.layerOpcionTres=function(imageTres,bandasNDWI,cociente,slopeTres,imageIdTres,visTres){
       var ndwi;
       var mosaico;
        ndwi = imageTres.normalizedDifference(bandasNDWI);
        app.mascara_sst=  cociente.updateMask(cociente.gte(0).and(ndwi.gt(0)).and(slopeTres.lt(10)));
        mosaico = ee.ImageCollection([
                  app.mascara_sst.visualize({min:0,max:1,palette:[ 'b2ffff',"0000ff",'ffff00',"ff0000"]})
                 ]).mosaic();
        Map.addLayer(imageTres,visTres, imageIdTres);
        Map.addLayer(mosaico,{}, 'Turbidez del agua');
        app.refreshComunidad(false);
         app.actDesCheckBox();
   };
   app.layerOpcionCuatro=function(bandasNDVI,imageIdCuatro,bLT05){
     var imageCuatro;
     var TOA;
     var ln;
     var BT;
     var pv;
     var ε;
     var ndvi;
     var ndviMax=0.7;
     var ndviMin=-0.4;
     var dLST;
     var lst;
     if(bLT05){
          imageCuatro=ee.Image('LANDSAT/LT05/C01/T1/'+imageIdCuatro).clip(app.cuencasComunidades);
      //TOA  (L?) = ML * Qcal + AL
        ndvi=imageCuatro.normalizedDifference(bandasNDVI);
      //Pv = Square((“NDVI” – 0.216901) / (0.632267 – 0.216901))
       pv=((ndvi.add(ndviMin)).divide(ee.Image(ndviMax).add(ndviMin))).pow(2);
      //ε = 0.004 * Pv + 0.986
       ε =ee.Image(0.004).multiply(pv).add(0.986);
      //var TOA=ee.Image(ML).multiply(Qcal).add(ee.Image(AL)).rename('L');
       TOA=imageCuatro.expression('((0.05537499859929085*Qcal)+1.1824300289154053)',{
      'Qcal':imageCuatro.select('B6'),
      });
      // var Lλ=[(LMAXλ-LMINλ)/(QCALMAX-QCALMIN) ] *(QCAL-QCALMIN)-LMINλ
       //LMINλ=1,2378    LMAXλ=15,3032        Sensor TM (Qcalmin=1 y Qcalmax=255)
      var Lλ=imageCuatro.expression('((15.3032 -1.2378)/(255-1))*(Qcal-1)-1.2378',{
        'Qcal':imageCuatro.select('B6'),
      });
      //var ln=((ee.Image(k1).divide(TOA)).add(ee.Image(1))).log();
      var k1=607.76;
      var k2=1260.56;
      ln=((ee.Image(k1).divide(TOA).add(1))).log();
      //var BT=((ee.Image(k2).divide(ln)).subtract(ee.Image(273.15))).rename('BT');
      BT=((ee.Image(k2).divide(ln)).subtract(273.15)).rename('BT');
      //LST = (BT / (1 + (0.00115 * BT / 1.4388) * Ln(ε)))
      dLST=ee.Image(0.00115).multiply(BT).divide(1.4388);
        lst=BT.divide((dLST.multiply(ε.log())).add(1)).rename('lst');
     }
     else{
         imageCuatro=ee.Image('LANDSAT/LC08/C01/T1/'+imageIdCuatro).clip(app.cuencasComunidades);
        //TOA  (L?) = ML * Qcal + AL
        TOA=imageCuatro.expression('((0.00033420001273043454*Qcal)+0.10000000149011612)',{
                                'Qcal':imageCuatro.select('B10'),
                              });
        //var ln=((ee.Image(k1).divide(TOA)).add(ee.Image(1))).log();
           ln=((ee.Image(774.89).divide(TOA).add(ee.Image(1)))).log();
           //var BT=((ee.Image(k2).divide(ln)).subtract(ee.Image(273.15))).rename('BT');
            BT=((ee.Image(1321.08).divide(ln)).subtract(ee.Image(273.15))).rename('BT');
            ndvi=imageCuatro.normalizedDifference(bandasNDVI);
             //Pv = Square((“NDVI” – 0.216901) / (0.632267 – 0.216901))
           pv=((ndvi.add(ndviMin)).divide(ee.Image(ndviMax).add(ndviMin))).pow(2);
      //ε = 0.004 * Pv + 0.986
           ε =ee.Image(0.004).multiply(pv).add(0.986);
            dLST=ee.Image(0.00115).multiply(BT).divide(1.4388);
           lst=BT.divide((dLST.multiply(ε.log())).add(1)).rename('lst');
     }
     Map.addLayer(lst,{max:30,min:-3,palette:['white','grey','black','blue','violet','purple','cyan',
                                              'green','yellow','orange','pink','red']},imageIdCuatro);
       app.crearLeyenda('Leyenda de temperatura superficial',['ff0000','ffc0cb', 'ffa500','ffff00',
                                                             '008000','00ffff','800080','ee82ee',
                                                              '0000ff','000000', '808080','ffffff'],
                                                             ['30 °C','27 °C','24 °C','21 °C',
                                                             '18 °C','15 °C','12 °C','9 °C',
                                                              '6   °C','3   °C','0   °C','-3   °C']);
        app.refreshComunidad(false);
         app.actDesCheckBox();
     };
   app.refreshMapLayer = function() {
    Map.clear();
    app.aBETIQUETAS=false;
    app.bLayer=false;
    var opcion_vis=app.VIS_OPTIONS[app.vis.select.getValue()];
    var COLLECTION_ID;
    var visParams;
    var visParams_I;
    var visParams_N;
    var menor_2012;
    var mayor_2012;
    var swir_1;
    var anio_2012=ee.Number.parse('2012');
  app.recogerCoordenadas();
    if(app.bContador){
       app.calcularInundacionTotal.inundacion.setValue('');
           app.calcularInundacionTotal.fecha.setValue('');
           app.selectorComunidades.comunidad.setValue('');
           app.selectorComunidades.inundacion.setValue('');
           app.selectorComunidades.fecha.setValue('');
           app.clasificacionReserva.descripcion.setValue(''),
           app.clasificacionReserva.fecha.setValue("");
           app.clasificacionReserva.vegetacion.setValue("");
           app.clasificacionReserva.bofedal.setValue("");
           app.clasificacionReserva.agua.setValue("");
           app.clasificacionReserva.suelo.setValue("");
           app.clasificacion.fecha.setValue("");
    }
    app.bContador=true;
    app.yr= app.selectYr;
    if(app.yr) app.yr=ee.Number.parse(app.yr);
    app.imageId = app.picker.select.getValue();
    if (app.imageId) {
      app.coincidenciaLC08=ee.String(app.imageId).index('LC08').getInfo();
      app.coincidenciaLT05=ee.String(app.imageId).index('LT05').getInfo();
       if(app.coincidenciaLC08>-1){
        COLLECTION_ID='LANDSAT/LC08/C02/T1_TOA';
       if(opcion_vis.valor===0){
           visParams={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']};
         }else if(opcion_vis.valor===1){
             visParams={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']};
         } else if(opcion_vis.valor===2){
            visParams_I={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']};
            mayor_2012=true;
         }else if(opcion_vis.valor===3){
           visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']};
            mayor_2012=true;
         }
         else if(opcion_vis.valor===4){
            mayor_2012=true;
         }
      }else if(app.coincidenciaLT05>-1){
          COLLECTION_ID='LANDSAT/LT05/C01/T1_TOA';
           if(opcion_vis.valor===0){
           visParams={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']};
         }else if(opcion_vis.valor===1){
             visParams={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']};
         } else if(opcion_vis.valor===2){
            visParams_I={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']};
            menor_2012=true;
         }else if(opcion_vis.valor===3){
            visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']};
            menor_2012=true;
         }
         else if(opcion_vis.valor===4){
            menor_2012=true;
         }
      }else if(app.yr.eq(anio_2012)){
           alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
      // If an image id is found, create an image.
      app.image = ee.Image(COLLECTION_ID + '/' + app.imageId).clip(app.cuencasComunidades);
     app.imageDate= ee.Date(app.image.get('system:time_start')).format("dd-MM-YYYY    HH:mm:ss").getInfo();
     app.picker.fecha_ad.setValue(app.imageDate);
      if(opcion_vis.valor<2){
         Map.addLayer(app.image,visParams, app.imageId);
          app.refreshComunidad(false);
          app.actDesCheckBox();
      }else if( opcion_vis.valor===2){
        if(menor_2012){
            swir_1=app.image.select('B5') ;
            app.layerOpcionDos(app.image,swir_1,visParams_I,app.slope,app.imageId);
        }else if(mayor_2012){
           swir_1=app.image.select('B6') ;
           app.layerOpcionDos(app.image,swir_1,visParams_I,app.slope,app.imageId);
        }
      }else if(opcion_vis.valor===3){
          if(menor_2012){
             var B3_B1= app.image.expression(
               '(RED/BLUE)', {
                'RED': app.image.select('B3'),
                'BLUE': app.image.select('B1'),
            });
            app.layerOpcionTres(app.image,['B2', 'B4'],B3_B1,app.slope,app.imageId,visParams_N);
        }else if( mayor_2012){
           var B4_B2= app.image.expression(
          '(RED/BLUE)', {
          'RED': app.image.select('B4'),
          'BLUE': app.image.select('B2'),
          });
          app.layerOpcionTres(app.image,['B3', 'B5'],B4_B2,app.slope,app.imageId,visParams_N);
        }
        app.crearLeyenda('Leyenda de Turbidez del Agua',['ff0000','ffff00','0000ff'],
                        ['Agua con alta turbidez','Agua con baja turbidez','Agua clara']);
       }
       else if(opcion_vis.valor===4){
          if(menor_2012){
           app.layerOpcionCuatro(['B4','B3'],app.imageId,true);
          }
          else if( mayor_2012){
              app.layerOpcionCuatro(['B5','B4'],app.imageId,false);
          }
       }
    }
            var legend=ui.Panel({
                  style: app.LEGEND_STYLE
                });
         var legendDate=ui.Label({
                  value: app.imageDate,
                  style:app.LEGEND_TITLE_STYLE
                });
                legend.add(legendDate);
          var legendFiltro=ui.Label({
                  value:"Filtro de visualización: ",
                  style:app.LEGEND_TITLE_STYLE
                });
                legend.add(legendFiltro);
           var legendDescripcion=ui.Label({
                  value: opcion_vis.name,
                });
                legend.add(legendDescripcion);
         Map.add(legend);
  };
   app.areaRegionsReserveJunin=function(mascara_vegetacion,mascara_agua,
                                      mascara_suelo,mascara_bofedal,
                                      mascara_suelo_2){
                                 var area = ee.Image.pixelArea().divide(1000000);
                            /* areas de cobertura */
                            var area_vegetacion = mascara_vegetacion.multiply(area)
                                                                .select([0],['vegetacion']);
                            var area_agua=  mascara_agua.multiply(area)
                                                    .select([0],['agua']);
                            var area_suelo=  mascara_suelo.multiply(area)
                                                        .select([0],['suelo']);
                            var area_bofedal= mascara_bofedal.multiply(area)
                                                            .select([0],['bofedal']);
                            var area_suelo_2=mascara_suelo_2.multiply(area)
                                                            .select([0],['suelo_2']);
                            /* reducir region */
                            var reserveJunin=ee.Image().addBands(area_vegetacion)
                                                        .addBands(area_agua)
                                                        .addBands(area_suelo)
                                                        .addBands(area_bofedal)
                                                        .addBands(area_suelo_2);
                            var regionsReserveJunin= reserveJunin.reduceRegion
                                        (
                                            {
                                            reducer:ee.Reducer.sum(),
                                            geometry:app.nationalReserveJunin,
                                            scale: 30,
                                            maxPixels:1e9
                                            }
                                        );                         
                            var vegetationArea;
                            var bofedalArea;
                            var waterArea;
                            var gorundArea;
                            var areaVegetacion;
                            var areaBofedal;
                            var areaAgua;
                            var areaSuelo;
                            var suelo_1;
                            var suelo_2;
                            regionsReserveJunin.evaluate
                            (
                                function()
                                {
                                    vegetationArea=regionsReserveJunin.get('vegetacion').getInfo();
                                    bofedalArea=regionsReserveJunin.get('bofedal').getInfo();
                                    waterArea=regionsReserveJunin.get('agua').getInfo();
                                    suelo_1=regionsReserveJunin.get('suelo').getInfo();
                                    suelo_2=regionsReserveJunin.get('suelo_2').getInfo();
                                    gorundArea= suelo_1+
                                                suelo_2;
                                    areaVegetacion=vegetationArea.toFixed(3)+" km^2";
                                    areaBofedal=bofedalArea.toFixed(3)+" km^2";
                                    areaAgua=waterArea.toFixed(3)+" km^2";
                                    areaSuelo=gorundArea.toFixed(3)+" km^2";
                                /*
                                    app.clasificacionReserva.descripcion.setValue
                                    ('Cuantificación de la cobertura en Kilometros cuadrados');
                                     app.clasificacionReserva.fecha.setValue
                                    ('Fecha:'+ app.imageDate);
                                    app.clasificacionReserva.vegetacion.setValue
                                    ('Vegetación:'+areaVegetacion);
                                    app.clasificacionReserva.bofedal.setValue
                                    ('Bofedal:'+ areaBofedal);
                                    app.clasificacionReserva.agua.setValue
                                    ('Agua:'+ areaAgua);
                                    app.clasificacionReserva.suelo.setValue
                                    ('Suelo:'+areaSuelo);
                                    */
                                    app.setLoadingModeReserva(false);
              app.crearLeyenda('Leyenda de cobertura Reserva Nacional de Junín',
                                              ['00FF00','ffff00','0000ff','804000','AAAAAA'],
                                              ['Césped de Puna, Totoral, Juncal: '+areaVegetacion,
                                               'Bofedal, Pajonal Húmedo: '+ areaBofedal,
                                               'Cuerpo de agua, Sombra de nube: ' +areaAgua,
                                               'Suelo desnudo o con escasa vegetación, Nube, Sombra de nube: '+suelo_1.toFixed(3)+" km^2",
                                               'Suelo desnudo, Roca, Nube, Sombra de nube: '+suelo_2.toFixed(3)+" km^2"
                                       ]);
                                }
        );
        };
  app.clasesCoberturaReserve=function(iTCG,minTCGBofedal,
                                      minTCGGraminea,
                                      maxTCGGraminea,
                                      iNdvi,iNdwi,iNdsi,iBandsL){
                                    var bofedal;
                                    var agua;
                                    var vegetacion_bofedal;
                                    var vegetacion;
                                    var suelo;
                                    var suelo_2;
                                    var mascara_agua;
                                    var mascara_bofedal;
                                    var mascara_vegetacion;
                                    var mascara_suelo;
                                    var mascara_suelo_2;
                                    var mosaic ;
                                    var visParams_N;
                                    var ndviViz_alto;
                                    var ndviViz_medio;
                                    var ndwiViz;
                                     ndviViz_alto ={
                                                          min: minTCGBofedal, 
                                                          max: 1,
                                                          palette: ['ffff40', 'ffff00']
                                                      };
                                    ndviViz_medio={
                                                          min: minTCGGraminea, 
                                                          max: maxTCGGraminea, 
                                                          palette: ['FF0000', '00FF00']
                                                       };
                                   ndwiViz={
                                                  min:0, 
                                                  max: 1, 
                                                  palette: [ '0000FF']
                                                };
                                      visParams_N=
                                                      {
                                                          min:0,
                                                          max:0.3,
                                                          gamma:1.3,
                                                          bands:iBandsL
                                                      };
                               /* clases */
                                      agua=iNdwi.gt(0);
                                     bofedal=iTCG.gte(minTCGBofedal);
                                      vegetacion=iTCG.gt(minTCGGraminea)
                                                                .and(iTCG.lt(maxTCGGraminea));
                                      suelo=iTCG.lt(minTCGGraminea)
                                                .and(iNdwi.lt(0)).and(iNdsi.gte(-0.3));
                                      suelo_2=iTCG.lt(minTCGGraminea)
                                                  .and(iNdwi.lte(0));
                                       /* mascara */
                                          mascara_agua= agua.updateMask(agua)
                                                            .and(app.slope.lt(10));
                                          mascara_bofedal= bofedal
                                                          .updateMask(bofedal);
                                          mascara_vegetacion=vegetacion
                                                              .updateMask(vegetacion);
                                          mascara_suelo=suelo.updateMask(suelo);
                                          mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
                                         /* mosaico */
                                           mosaic = ee.ImageCollection
                                                  ([
                                                       mascara_vegetacion.visualize(ndviViz_medio),
                                                       mascara_bofedal.visualize(ndviViz_alto),
                                                       mascara_agua.visualize(ndwiViz),
                                                      mascara_suelo.visualize({palette: ['804000']}),
                                                      mascara_suelo_2.visualize({palette: ['AAAAAA']}),
                                                  ]).mosaic();
                                         Map.addLayer(app.image.clip(app.nationalReserveJunin),visParams_N, app.imageId);
                                        Map.addLayer(mosaic.clip(app.nationalReserveJunin),{},'Mosaico');   
                                        //aqui
                                         app.areaRegionsReserveJunin(mascara_vegetacion,mascara_agua,
                                                                     mascara_suelo,mascara_bofedal,
                                                                     mascara_suelo_2);
  };
  app.clasesCobertura=function(iTCG,minTCGBofedal,
                                 minTCGGraminea,
                                 maxTCGGraminea,
                                 iNdvi,iNdwi,iNdsi,iBandsL)
                                {
                                    var agua;
                                    var vegetacion_ndvi_alto;
                                    var vegetacion_ndvi_medio;
                                    var suelo;
                                    var suelo_2;
                                    var mascara_agua;
                                    var mascara_vegetacion_ndvi_alto;
                                    var mascara_vegetacion_ndvi_medio;
                                    var mascara_suelo;
                                    var mascara_suelo_2;
                                    var mosaic ;
                                    var visParams_N;
                                    var ndviViz_alto;
                                    var ndviViz_medio;
                                    var ndwiViz;
                                     ndviViz_alto ={
                                                          min: minTCGBofedal, 
                                                          max: 1,
                                                          palette: ['ffff40', 'ffff00']
                                                      };
                                    ndviViz_medio={
                                                          min: minTCGGraminea, 
                                                          max: maxTCGGraminea, 
                                                          palette: ['FF0000', '00FF00']
                                                       };
                                   ndwiViz={
                                                  min:0, 
                                                  max: 1, 
                                                  palette: [ '0000FF']
                                                };
                                      visParams_N=
                                                      {
                                                          min:0,
                                                          max:0.3,
                                                          gamma:1.3,
                                                          bands:iBandsL
                                                      };
                               /* clases */
                                      agua=iNdwi.gt(0);
                                      vegetacion_ndvi_alto=iTCG.gte(minTCGBofedal);
                                      vegetacion_ndvi_medio=iTCG.gt(minTCGGraminea)
                                                                .and(iTCG.lt(maxTCGGraminea));
                                      suelo=iTCG.lt(minTCGGraminea)
                                                .and(iNdwi.lt(0)).and(iNdsi.gte(-0.3));
                                      suelo_2=iTCG.lt(minTCGGraminea)
                                                  .and(iNdwi.lte(0));
                                       /* mascara */
                                          mascara_agua= agua.updateMask(agua)
                                                            .and(app.slope.lt(10));
                                          mascara_vegetacion_ndvi_alto= vegetacion_ndvi_alto
                                                                        .updateMask(vegetacion_ndvi_alto);
                                          mascara_vegetacion_ndvi_medio=vegetacion_ndvi_medio
                                                                        .updateMask(vegetacion_ndvi_medio);
                                          mascara_suelo=suelo.updateMask(suelo);
                                          mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
                                         /* mosaico */
                                           mosaic = ee.ImageCollection
                                                  ([
                                                       mascara_vegetacion_ndvi_medio.visualize(ndviViz_medio),
                                                       mascara_vegetacion_ndvi_alto.visualize(ndviViz_alto),
                                                       mascara_agua.visualize(ndwiViz),
                                                      mascara_suelo.visualize({palette: ['804000']}),
                                                      mascara_suelo_2.visualize({palette: ['AAAAAA']}),
                                                  ]).mosaic();
                                                  mosaic.evaluate(function(){
                                                      app.setLoadingModeClassification(false);
                                                  });
                                            app.clasificacion.fecha.setValue(app.imageDate);
                                          Map.addLayer(app.image,visParams_N, app.imageId);
                                          Map.addLayer(mosaic,{},'Mosaico');
                            };
    app.makeMosaicClassification=function(spectralIndexes,bandsL,bandsL05)
                              {
                                  /* attributes */
                                    var addSpectralIndexes;
                                    var ndvi;
                                    var ndwi;
                                    var ndii;
                                    var ndsi;
                              Map.onClick(function(coords)
                                            {
                                                  app.changeInspector.lon.setValue
                                                  ('longitud: ' + coords.lon.toFixed(6));
                                                  app.changeInspector.lat.setValue
                                                  ('latitud: ' + coords.lat.toFixed(6));
                                                  var coordinates=ee.Geometry.Point
                                                                  (coords.lon,  coords.lat);
                                                  var dot= ui.Map.Layer(coordinates,{color:'ff0000'});
                                                  Map.layers().set(2, dot);
                                            }
                                          );
                                  /* indices espectrales */
                                    addSpectralIndexes=spectralIndexes(app.image);
                                    ndvi =addSpectralIndexes.select('NDVI');
                                    ndwi =addSpectralIndexes.select('NDWI');
                                    ndii=addSpectralIndexes.select('NDII');
                                    ndsi=addSpectralIndexes.select('NDSI');
                                    var TCG;
                                    if(bandsL05){
                                       //TCG = 0;284(Blue)􀀀0;243(Green)􀀀0;543(Red)+0;724(NIR)+0;084(SWIRI)􀀀0;180(SWIRII)
                                      //humedales=>0.1132 a 0.2910  vegetacion graminea:0.0080 a 0.1132 
                                      TCG=addSpectralIndexes.expression('-0.284*BLUE-0.243*GREEN-0.543*RED+0.724*NIR+0.084*SWIRI-0.18*SWIRII',{
                                        BLUE:addSpectralIndexes.select('B1'),
                                        GREEN:addSpectralIndexes.select('B2'),
                                        RED:addSpectralIndexes.select('B3'),
                                        NIR:addSpectralIndexes.select('B4'),
                                        SWIRI:addSpectralIndexes.select('B5'),
                                        SWIRII:addSpectralIndexes.select('B7'),
                                      });
                                    app.clasesCobertura(TCG,0.1132, 0.0080 ,0.1132 ,ndvi,ndwi, ndsi,bandsL);
                                    }else{
                                      //humedales=>0.120 a 0.2967   vegetacion graminea:0.011 a 0.12
                                        TCG=addSpectralIndexes.expression('-0.2941*BLUE-0.243*GREEN-0.5424*RED+0.7276*NIR+0.0713*SWIRI-0.1608*SWIRII',{
                                        BLUE:addSpectralIndexes.select('B2'),
                                        GREEN:addSpectralIndexes.select('B3'),
                                        RED:addSpectralIndexes.select('B4'),
                                        NIR:addSpectralIndexes.select('B5'),
                                        SWIRI:addSpectralIndexes.select('B6'),
                                        SWIRII:addSpectralIndexes.select('B7'),
                                      });
                                       app.clasesCobertura(TCG,0.120, 0.011,0.12,ndvi,ndwi, ndsi,bandsL);
                                    }
                                    app.clasificacion.fecha.setValue("Fecha:"+app.imageDate);
                                   app.crearLeyenda('Leyenda de cobertura',['00FF00','ffff00','0000ff','804000','AAAAAA'],
                                                    ['Vegetación con menor vigor','Vegetación vigorosa y densa',
                                                     'Cuerpo de agua, Sombra de nube','Suelo desnudo o con escasa vegetación, Nube, Sombra de nube',
                                                     'Suelo desnudo, Roca, Nube, Sombra de nube'
                                                     ]);
                    };
  app.aplicarClasificacion=function(){
    app.setLoadingModeClassification(true);
    var spectralIndexes;
    app.coincidenciaLC08=ee.String(app.imageId).index('LC08').getInfo();
    app.coincidenciaLT05=ee.String(app.imageId).index('LT05').getInfo();
    if(app.coincidenciaLC08>-1)
    {
            Map.clear();
           spectralIndexes=function(imagen)
                             {
                                  var ndvi =imagen.normalizedDifference(['B5', 'B4'])
                                                  .rename('NDVI');
                                  var ndwi =imagen.normalizedDifference(['B3', 'B5'])
                                                  .rename('NDWI');
                                  var ndii =imagen.normalizedDifference(['B5', 'B7'])
                                                  .rename('NDII');
                                  var ndsi = imagen.normalizedDifference(['B7', 'B5'])
                                                  .rename('NDSI');
                                  return imagen.addBands(ndvi)
                                               .addBands(ndwi)
                                               .addBands(ndii)
                                               .addBands(ndsi);
                              };
            app.makeMosaicClassification(spectralIndexes,['B4','B3','B2'],false);
    }
    else if(app.coincidenciaLT05>-1)
    {
         Map.clear();
         spectralIndexes=function(imagen)
                         {
                                var ndvi = imagen.normalizedDifference(['B4', 'B3'])
                                                 .rename('NDVI');
                                var ndwi = imagen.normalizedDifference(['B2', 'B4'])
                                                 .rename('NDWI');
                                var ndii = imagen.normalizedDifference(['B4', 'B7'])
                                                 .rename('NDII');
                                var ndsi = imagen.normalizedDifference(['B7', 'B4'])
                                                .rename('NDSI');
                                  return imagen.addBands(ndvi)
                                               .addBands(ndwi)
                                               .addBands(ndii)
                                               .addBands(ndsi);
                          };
                         app.makeMosaicClassification(spectralIndexes,['B3','B2','B1'], true);
    }
  };
  //inicio funcion de mascara agua
  app.LayerMascaraAgua=function(imagenND,bandsND,Delimitacion,bandsViz,
                                intDelimitacion,setLoadingInundacionTotal,bComunidad){
    //0:app.unionRL  1:reservaComunidad    
     var ndwi;
     var agua;
     var mascara_agua;
     var inundacion;
     var mascara_inundacion;
     var area_inundacion;
     var InundacionArea;
     var vPaleta;
     var nombresEtiquetas=[];
     var shapeComunidad;
     var comunidadRNJ;
     var areaHasComunidad;
     var porcentaje;
     var sInundacion;
     var nInundacionArea;
     var areaRNJ=app.nationalReserveJunin.area()
            .divide(10000)
            .getInfo()
            .toFixed(2);
     var areaHasLago=app.shapeCC.filter(ee.Filter.eq("Comunidad","Chinchaycocha"))
                                                    .first()
                                                    .get("Area_has")
                                                    .getInfo()
                                                    .toFixed(2);
     var mosaic;
      var sNombreComunidad=app.selectorComunidades.select.getValue();
      if(sNombreComunidad==="Villa Junín"){
         shapeComunidad=app.shapeCC.filter(ee.Filter.eq("Comunidad",sNombreComunidad));
          comunidadRNJ=shapeComunidad.geometry().intersection(app.nationalReserveJunin);
           areaHasComunidad=8721.05;
      }
      else{
         shapeComunidad=app.shapeCC.filter(ee.Filter.eq("Comunidad",sNombreComunidad))
                                                    .first();
         comunidadRNJ=shapeComunidad.geometry().intersection(app.nationalReserveJunin);
           areaHasComunidad= shapeComunidad 
                            .get("Area_has")
                            .getInfo()
                            .toFixed(2);
      }
      var areaComunidadRNJ=comunidadRNJ.area().divide(10000).getInfo().toFixed(2);
     ndwi= imagenND.normalizedDifference(bandsND)
                .rename('NDWI');   
     agua=ndwi.select('NDWI').gt(0);
     mascara_agua= agua.updateMask(agua);
     inundacion=agua.subtract(app.imagelch);
     mascara_inundacion= agua.updateMask(inundacion);    
     area_inundacion=  mascara_inundacion.multiply(app.area).select([0],['inundacion']);
     InundacionArea=  area_inundacion.reduceRegion
                    ({
                     reducer:ee.Reducer.sum(),
                     //aqui
                     geometry:Delimitacion,
                     scale: 30,
                     maxPixels:1e13
                    }).get('inundacion').getInfo();
                   app.imageDate= ee.Date(imagenND.get('system:time_start'))
                               .format("dd-MM-YYYY")
                               .getInfo();
            if(intDelimitacion===0){
               nInundacionArea=InundacionArea.toFixed(2);
               sInundacion='Inundación: '+nInundacionArea+' ha';
               app.calcularInundacionTotal.inundacion.setValue
              (sInundacion);
                 app.calcularInundacionTotal.fecha.setValue
              ('Fecha de adquisicion: '+app.imageDate);
                nombresEtiquetas.push("Lago Chinchaycocha "+": "+ areaHasLago+" ha");
                nombresEtiquetas.push("Reserva Nacional de Junín "+": "+areaRNJ+" ha");
                porcentaje=((nInundacionArea/areaRNJ)*100).toFixed(2);    
                 nombresEtiquetas.push(sInundacion);
                nombresEtiquetas.push("Porcentaje :"+porcentaje+" %");
            }
            else if(intDelimitacion===1){
              nInundacionArea=InundacionArea.toFixed(2);
               sInundacion='Inundación: '+nInundacionArea+' ha';
               porcentaje=((nInundacionArea/areaComunidadRNJ)*100).toFixed(2);
              if(isNaN(porcentaje)){
                porcentaje=0;
              }
              var sFecha='Fecha de adquisicion: '+app.imageDate;
              app.selectorComunidades.comunidad.setValue('Comunidad: '+sNombreComunidad);
               app.selectorComunidades.inundacion.setValue
               ( sInundacion);
               app.selectorComunidades.fecha.setValue
               (sFecha);
                nombresEtiquetas.push("Lago Chinchaycocha "+": "+ areaHasLago+" ha");
                nombresEtiquetas.push("Reserva Nacional de Junín "+": "+areaRNJ+" ha");
                nombresEtiquetas.push(sNombreComunidad+": "+areaHasComunidad+" ha");
                nombresEtiquetas.push("ARNJ "+": "+areaComunidadRNJ+" ha");
                nombresEtiquetas.push(sInundacion);
                nombresEtiquetas.push("Porcentaje :"+porcentaje+" %");
            }
             mosaic = ee.ImageCollection
                    ([
                         mascara_agua.visualize(app.ndwiViz),
                ]).mosaic();
                mosaic.evaluate(function(){
                      setLoadingInundacionTotal(false);
                });
               Map.addLayer(app.nationalReserveJunin,{color:'yellow'},'Reserva Nacional de Junín');
               //aqui 
              Map.addLayer(imagenND,{min:0,max:0.3,gamma:1.3,bands:bandsViz},'Infrarrojo');
              if(bComunidad){
                 app.refreshComunidad(true);
                 vPaleta= ['green','yellow','grey','orange','blue','white'];
                  app.leyendaAnteriorComunidad=app.crearLeyendaComunidad('Leyenda de la comunidad de ', sNombreComunidad,
                                                                         vPaleta,nombresEtiquetas,true,false);
              }
              else{
                 vPaleta= ['green','yellow','blue','white'];
                 app.leyendaAnteriorComunidad=app.crearLeyendaComunidad('Leyenda de la  ', "Reserva Nacional de Junín",
                                                                         vPaleta,nombresEtiquetas,false,true);
              }
              Map.addLayer(mosaic,{},'Mascara de agua');
              Map.addLayer(app.lago,{color:'green'},'Lago Chinchaycocha');
};
 //fin funcion de mascara agua
 app.btnCalcularInundacionTotal=function(){
    Map.clear();
    app.setLoadingInundacionTotal(true);
    app.bLayer=false;
    app.aBETIQUETAS=false;
     app.imageId = app.picker.select.getValue();
      var area = ee.Image
            .pixelArea()
            .divide(10000);
    if (app.imageId) {
      app.coincidenciaLC08=ee.String(app.imageId).index('LC08').getInfo();
       app.coincidenciaLT05=ee.String(app.imageId).index('LT05').getInfo();
       if(app.coincidenciaLC08>-1){
         var imag_2=ee.Image('LANDSAT/LC08/C02/T1_TOA/'+app.imageId).clip(app.unionRL);
         app.LayerMascaraAgua(imag_2,['B3', 'B5'],app.unionRL,['B5','B4','B3'],0, app.setLoadingInundacionTotal,false);
       }
       else if(app.coincidenciaLT05>-1){
         var imag_1=ee.Image('LANDSAT/LT05/C01/T1_TOA/'+app.imageId).clip(app.unionRL);
          app.LayerMascaraAgua(imag_1,['B2', 'B4'],app.unionRL,['B4','B3','B2'],0,app.setLoadingInundacionTotal,false);
       }
    }
 };
 app.calcularPorComunidad=function(){
     Map.clear();
     app.setLoadingInundacion(true);
     app.bLayer=false;
     app.aBETIQUETAS=false;
     app.recogerCoordenadas();
     var nameCC=app.selectorComunidades.select.getValue();
     var geometriaComunidadCampesina=app.cc.filter(ee.Filter.eq('Comunidad',nameCC)).geometry();
     var gReservaComunidad=app.unionRL.union(geometriaComunidadCampesina);
     var reservaComunidad=app.nationalReserveJunin.intersection(geometriaComunidadCampesina, ee.ErrorMargin(1));
     app.imageId = app.picker.select.getValue();
     var ndwi;
     var agua;
     var mascara_agua;
     var inundacion;
     var mascara_inundacion;
     var area_inundacion;
     var InundacionArea;
     var mosaic;
    var area_agua;
    if (app.imageId) {
      app.coincidenciaLC08=ee.String(app.imageId).index('LC08').getInfo();
      app.coincidenciaLT05=ee.String(app.imageId).index('LT05').getInfo();
       if(app.coincidenciaLC08>-1){
         var imag_2=ee.Image('LANDSAT/LC08/C02/T1_TOA/'+app.imageId).clip(gReservaComunidad);
         app.LayerMascaraAgua(imag_2,['B3', 'B5'],reservaComunidad,['B5','B4','B3'],1,app.setLoadingInundacion,true);
       }
       else if(app.coincidenciaLT05>-1){
          var imag_1=ee.Image('LANDSAT/LT05/C01/T1_TOA/'+app.imageId).clip(gReservaComunidad);
          app.LayerMascaraAgua(imag_1,['B2', 'B4'],reservaComunidad,['B4','B3','B2'],1,app.setLoadingInundacion,true);
       }
    }
    app.selectorComunidades.checkBox_capa.setValue(true);
 };
 app.addChart=function(myColeccionFecha
                      ,myColeccionList,titulo,waterChartLandsat,setLoadingModeChartWaterLandsat)
            {
              var squareKilometers=[];
              var Dates=[];
                myColeccionFecha.evaluate(function(fechas)
                {
                var j=0;
                myColeccionList.evaluate(function(lists)
                {
                    lists.map(function(list)
                {
                        if(list>128)
                        {
                        squareKilometers=ee.List(squareKilometers).add(list);
                        Dates=ee.List(Dates).add(ee.Date(fechas[j]).format("dd-MM-YYYY"));
                        }
                        j++;
                });
                var yValues = squareKilometers;
                var xValues = Dates;
                var chart = ui.Chart.array.values(yValues, 0, xValues)
                .setOptions
                ({
                    title: titulo,
                    hAxis: {'title': 'Fechas'},
                    vAxis: {'title': 'Kilómetros cuadrados'},
                    pointSize: 3,
                })
                .setSeriesNames(['Fecha,KM^2']);
                waterChartLandsat.panel.add(chart);   
                setLoadingModeChartWaterLandsat(false);
                });
                });
          };
  app.calculateWaterArea=function(collection,idCollection)
                                                  { 
                                                     var ndwi;
                                                     var collectionWater=collection.map(function(image){
                                                       if(idCollection=='LANDSAT/LT05/C01/T1_TOA')
                                                     {
                                                         ndwi = image
                                                                .normalizedDifference(['B2', 'B4'])
                                                                .rename('NDWI');
                                                     }
                                                     else if(idCollection=='LANDSAT/LC08/C02/T1_TOA')
                                                     {
                                                          ndwi = image
                                                                 .normalizedDifference(['B3', 'B5'])
                                                                 .rename('NDWI');
                                                      }
                                                     var water=ndwi.gt(0)
                                                              .and(app.slope.lt(10));
                                                     var waterMask= water
                                                                    .updateMask(water);
                                                     var area = ee.Image
                                                                .pixelArea()
                                                                .divide(1000000);
                                                     var  waterArea=waterMask
                                                                    .multiply(area)
                                                                    .select([0],['agua']);
                                                     return image.set
                                                            (waterArea.reduceRegion
                                                            ({
                                                             reducer:ee.Reducer.sum(),
                                                             geometry:app.nationalReserveJunin,
                                                             scale: 30,
                                                             maxPixels:1e13
                                                            })
                                                            );
                                                     });
                                                     return collectionWater;
                                                  };
 app.AreaWater=function(collection,idCollection)
                                 {
                                      //Begin attributes
                                       var myCollectionL08;
                                       var myCollectionL05;
                                       var ndwi;
                                      //End attributes
                                       if(idCollection=='LANDSAT/LT05/C01/T1_TOA')
                                         {
                                            collection.evaluate(function()
                                            {
                                                myCollectionL05=app.calculateWaterArea(collection,idCollection);
                                                var myColeccion_L05_list=myCollectionL05
                                                                   .reduceColumns(ee.Reducer.toList(), ['agua'])
                                                                   .get('list');
                                                var myColeccion_L05_fecha=myCollectionL05
                                                                  .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
                                                                  .get('list');
                                                app.addChart(myColeccion_L05_fecha,
                                                            myColeccion_L05_list,
                                                            'Gráfico de cambio de cuerpo de agua en el tiempo de 1984 al 2011',
                                                            app.waterChartLandsat05, 
                                                            app.setLoadingModeChartWaterLandsat05);
                                            });
                                         }
                                         else if(idCollection=='LANDSAT/LC08/C02/T1_TOA')
                                         {
                                                collection.evaluate(function()
                                                                    {
                                                                        myCollectionL08=app.calculateWaterArea(collection,idCollection);
                                                                        var myColeccion_L08_list=myCollectionL08
                                                                                                  .reduceColumns(ee.Reducer.toList(), ['agua'])
                                                                                                  .get('list');
                                                                        var myColeccion_L08_fecha=myCollectionL08
                                                                                                  .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
                                                                                                  .get('list');
                                                                          app.addChart(myColeccion_L08_fecha,
                                                                                    myColeccion_L08_list,
                                                                                    'Gráfico de cambio de cuerpo de agua en el tiempo del 2013 a la actualidad',
                                                                                    app.waterChartLandsat08,
                                                                                    app.setLoadingModeChartWaterLandsat08);      
                                                                    });
                                         }
                                    };
 app.makeChartWaterLandsat05=function()
                            {
                                if(app.contadorGraficoWaterL05)
                                {
                                  alert('El gráfico ya ha sido generado.');
                                  return;
                                }
                               app.setLoadingModeChartWaterLandsat05(true);
                               var collectionL05=ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                                                   .filterBounds(app.bounds)
                                                   .filterMetadata('CLOUD_COVER','Less_than',23)
                                                   .select(['B2','B4']);
                               var idCollectionL05='LANDSAT/LT05/C01/T1_TOA';
                               app.AreaWater(collectionL05,idCollectionL05);
                               app.contadorGraficoWaterL05=true;
                            };   
      app.makeChartWaterLandsat08=function()
                                            {
                                                if(app.contadorGraficoWaterL08)
                                                {
                                                  alert('El gráfico ya ha sido generado.');
                                                  return;
                                                }
                                               app.setLoadingModeChartWaterLandsat08(true);
                                               var collectionL08=ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                                                                   .filterBounds(app.bounds)
                                                                   .filterMetadata('CLOUD_COVER','Less_than',23)
                                                                   .select(['B3','B5']);
                                              var idCollectionL08='LANDSAT/LC08/C02/T1_TOA';
                                               app.AreaWater(collectionL08,idCollectionL08);
                                               app.contadorGraficoWaterL08=true;
                                            };
       app.makeMosaicReserve=function(spectralIndexes,bandsL,bandsL05)
                                                    {
                                                          /* attributes */  
                                                              var ndvi;
                                                              var ndwi;
                                                              var ndii;
                                                              var ndsi;
                                                              var addSpectralIndexes;
                                                          Map.onClick(function(coords)
                                                                        {
                                                                              app.changeInspector.lon.setValue
                                                                              ('longitud: ' + coords.lon.toFixed(6));
                                                                              app.changeInspector.lat.setValue
                                                                              ('latitud: ' + coords.lat.toFixed(6));
                                                                              var coordinates=ee.Geometry.Point
                                                                                              (coords.lon,  coords.lat);
                                                                              var dot= ui.Map.Layer(coordinates,{color:'ff0000'});
                                                                              Map.layers().set(2, dot);
                                                                        }
                                                                      );
                                                           /* indices espectrales */
                                                               addSpectralIndexes=spectralIndexes(app.image);
                                                               ndvi =addSpectralIndexes.select('NDVI');
                                                               ndwi =addSpectralIndexes.select('NDWI');
                                                               ndii=addSpectralIndexes.select('NDII');
                                                               ndsi=addSpectralIndexes.select('NDSI');
                                                               var TCG;
                                                            if(bandsL05){
                                                           //TCG = 0;284(Blue)􀀀0;243(Green)􀀀0;543(Red)+0;724(NIR)+0;084(SWIRI)􀀀0;180(SWIRII)
                                                          //humedales=>0.1132 a 0.2910  vegetacion graminea:0.0080 a 0.1132 
                                                          TCG=addSpectralIndexes.expression('-0.284*BLUE-0.243*GREEN-0.543*RED+0.724*NIR+0.084*SWIRI-0.18*SWIRII',{
                                                            BLUE:addSpectralIndexes.select('B1'),
                                                            GREEN:addSpectralIndexes.select('B2'),
                                                            RED:addSpectralIndexes.select('B3'),
                                                            NIR:addSpectralIndexes.select('B4'),
                                                            SWIRI:addSpectralIndexes.select('B5'),
                                                            SWIRII:addSpectralIndexes.select('B7'),
                                                       });
                                                     app.clasesCoberturaReserve(TCG,0.1132, 0.0080 ,0.1132 ,ndvi,ndwi, ndsi,bandsL);
                                    }else{
                                              //humedales=>0.120 a 0.2967   vegetacion graminea:0.011 a 0.12
                                                TCG=addSpectralIndexes.expression('-0.2941*BLUE-0.243*GREEN-0.5424*RED+0.7276*NIR+0.0713*SWIRI-0.1608*SWIRII',{
                                                BLUE:addSpectralIndexes.select('B2'),
                                                GREEN:addSpectralIndexes.select('B3'),
                                                RED:addSpectralIndexes.select('B4'),
                                                NIR:addSpectralIndexes.select('B5'),
                                                SWIRI:addSpectralIndexes.select('B6'),
                                                SWIRII:addSpectralIndexes.select('B7'),
                                              });
                                               app.clasesCoberturaReserve(TCG,0.120, 0.011,0.12,ndvi,ndwi, ndsi,bandsL);
                                    }
            };
               app.aplicarClasificacionReserva= function()
                                                              {
                                                                  app.setLoadingModeReserva(true);
                                                                  var  spectralIndexes;
                                                                app.coincidenciaLC08=ee.String(app.imageId).index('LC08').getInfo();
                                                                 app.coincidenciaLT05=ee.String(app.imageId).index('LT05').getInfo();
                                                                  if(app.coincidenciaLC08>-1)
                                                                  {
                                                                            Map.clear();
                                                                            spectralIndexes=function(imagen)
                                                                                           {
                                                                                                var ndvi =imagen.normalizedDifference(['B5', 'B4'])
                                                                                                                .rename('NDVI');
                                                                                                var ndwi =imagen.normalizedDifference(['B3', 'B5'])
                                                                                                                .rename('NDWI');
                                                                                                var ndii =imagen.normalizedDifference(['B5', 'B7'])
                                                                                                                .rename('NDII');
                                                                                                var ndsi = imagen.normalizedDifference(['B7', 'B5'])
                                                                                                                .rename('NDSI');
                                                                                                return imagen.addBands(ndvi)
                                                                                                             .addBands(ndwi)
                                                                                                             .addBands(ndii)
                                                                                                             .addBands(ndsi);
                                                                                            };
                                                                               app.makeMosaicReserve(spectralIndexes,['B4','B3','B2'],false) ;           
                                                                  }
                                                                  else if( app.coincidenciaLT05>-1)
                                                                  {
                                                                           Map.clear();
                                                                           spectralIndexes=function(imagen)
                                                                                           {
                                                                                                  var ndvi = imagen.normalizedDifference(['B4', 'B3'])
                                                                                                                   .rename('NDVI');
                                                                                                  var ndwi = imagen.normalizedDifference(['B2', 'B4'])
                                                                                                                   .rename('NDWI');
                                                                                                  var ndii = imagen.normalizedDifference(['B4', 'B7'])
                                                                                                                   .rename('NDII');
                                                                                                  var ndsi = imagen.normalizedDifference(['B7', 'B4'])
                                                                                                                  .rename('NDSI');
                                                                                                    return imagen.addBands(ndvi)
                                                                                                                 .addBands(ndwi)
                                                                                                                 .addBands(ndii)
                                                                                                                 .addBands(ndsi);
                                                                                            };
                                                                             app.makeMosaicReserve(spectralIndexes,['B3','B2','B1'],true) ;  
                                    }
                              };
                                 app.calculateBofedalArea=function(collection,idCollection,minTCGBofedal)
                                                            {
                                                                var bofedal;
                                                                var TCG;
                                                               var collectionBofedal=collection.map(function(image){
                                                                 if(idCollection=='LANDSAT/LT05/C01/T1_TOA')
                                                               {
                                                                 TCG=image.expression('-0.284*BLUE-0.243*GREEN-0.543*RED+0.724*NIR+0.084*SWIRI-0.18*SWIRII',{
                                                                          BLUE:image.select('B1'),
                                                                          GREEN:image.select('B2'),
                                                                          RED:image.select('B3'),
                                                                          NIR:image.select('B4'),
                                                                          SWIRI:image.select('B5'),
                                                                          SWIRII:image.select('B7'),
                                                                    });
                                                               }
                                                               else if(idCollection=='LANDSAT/LC08/C02/T1_TOA')
                                                               {
                                                                  TCG=image.expression('-0.2941*BLUE-0.243*GREEN-0.5424*RED+0.7276*NIR+0.0713*SWIRI-0.1608*SWIRII',{
                                                                                      BLUE:image.select('B2'),
                                                                                      GREEN:image.select('B3'),
                                                                                      RED:image.select('B4'),
                                                                                      NIR:image.select('B5'),
                                                                                      SWIRI:image.select('B6'),
                                                                                      SWIRII:image.select('B7'),
                                                                                    });
                                                                }
                                                                bofedal=TCG.gte(minTCGBofedal);
                                                               var bofedalMask= bofedal
                                                                              .updateMask(bofedal);
                                                               var area = ee.Image
                                                                          .pixelArea()
                                                                          .divide(1000000);
                                                               var  bofedalArea=bofedalMask
                                                                              .multiply(area)
                                                                              .select([0],['bofedal']);
                                                               return image.set
                                                                      (bofedalArea.reduceRegion
                                                                      ({
                                                                       reducer:ee.Reducer.sum(),
                                                                       geometry:app.nationalReserveJunin,
                                                                       scale: 30,
                                                                       maxPixels:1e13
                                                                      })
                                                                      );
                                                               });
                                                              return collectionBofedal;
                                                            };
                              app.AreaBofedal=function(collection,idCollection)
                              {
                                  /* Begin attributes */
                                     var Dates=[];
                                     var myCollectionL08;
                                     var myCollectionL05;
                                     var squareKilometers=[];
                                      if(idCollection=='LANDSAT/LT05/C01/T1_TOA')
                                        {
                                          collection.evaluate(function()
                                          {
                                            myCollectionL05=app.calculateBofedalArea(collection,idCollection,0.1132);
                                            var myColeccion_L05_list=myCollectionL05
                                                                 .reduceColumns(ee.Reducer.toList(), ['bofedal'])
                                                                 .get('list');
                                             var myColeccion_L05_fecha=myCollectionL05
                                                                .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
                                                                .get('list');
                                             myColeccion_L05_fecha.evaluate(function(fechas)
                                              {
                                                var i=0;
                                                var forDates;
                                                 myColeccion_L05_list.evaluate(function(lists)
                                                 {
                                                          lists.map(function(list)
                                                     {
                                                       if(list>80)
                                                       {
                                                         forDates=ee.Date(fechas[i]).format("MM").getInfo();
                                                           squareKilometers=ee.List(squareKilometers)
                                                                              .add(list);
                                                           Dates=ee.List(Dates)
                                                                    .add(ee.Date(fechas[i])
                                                                    .format("dd-MM-YYYY"));
                                                       }
                                                       i++;
                                                     });
                                                      var yValues = squareKilometers;
                                                      var xValues = Dates;
                                                      var bofedalchart = ui.Chart.array.values(yValues, 0, xValues)
                                                                    .setOptions
                                                                    ({
                                                                      title: 'Gráfico de cambio de bofedales y pastizales húmedos en el tiempo de 1984 al 2011',
                                                                       hAxis: {'title': 'Fechas'},
                                                                       vAxis: {'title': 'Kilometros cuadrados'},
                                                                       pointSize: 3,
                                                                      })
                                                                      .setSeriesNames(['Fecha,KM^2']);
                                                                      app.bofedalChartL05.panel.add(bofedalchart);   
                                                                     app.setLoadingModeChartBofedalL05(false);
                                                 });
                                              });
                                          });
                                        }
                                       else if(idCollection=='LANDSAT/LC08/C02/T1_TOA')
                                        {
                                           collection.evaluate(function()
                                          {
                                               myCollectionL08=app.calculateBofedalArea(collection,idCollection,0.120);
                                               var myColeccion_L08_list=myCollectionL08
                                                                          .reduceColumns(ee.Reducer.toList(), ['bofedal'])
                                                                          .get('list');
                                                var myColeccion_L08_fecha=myCollectionL08
                                                                          .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
                                                                          .get('list');
                                               myColeccion_L08_fecha.evaluate(function(fechas)
                                                 {
                                                    var j=0;
                                                    var forDates;
                                                    myColeccion_L08_list.evaluate(function(lists)
                                                     {
                                                       lists.map(function(list)
                                                       {
                                                         if(list>80)
                                                         {
                                                          forDates=ee.Date(fechas[j]).format("MM").getInfo();
                                                            squareKilometers=ee.List(squareKilometers).add(list);
                                                            Dates=ee.List(Dates).add(ee.Date(fechas[j]).format("dd-MM-YYYY"));
                                                         }
                                                         j++;
                                                       });
                                                       var yValues = squareKilometers;
                                                      var xValues = Dates;
                                                      var bofedalchart = ui.Chart.array.values(yValues, 0, xValues)
                                                                    .setOptions
                                                                    ({
                                                                      title: 'Gráfico de cambio de bofedales y pastizales húmedos en el tiempo de 2013 a la actualidad',
                                                                       hAxis: {'title': 'Fechas'},
                                                                       vAxis: {'title': 'Kilometros cuadrados'},
                                                                       pointSize: 3,
                                                                      })
                                                                      .setSeriesNames(['Fecha,KM^2']);
                                                                      app.bofedalChartL08.panel.add(bofedalchart);   
                                                                     app.setLoadingModeChartBofedalL08(false);
                                                     });
                                                 });
                                          });
                                        }
                              };
              app.makeChartBofedalL05=function()
                                                    {
                                                       if( app.contadorGraficoBofedalL05)
                                                      {
                                                          alert('El gráfico ya ha sido generado.');
                                                          return;
                                                      }
                                                          app.setLoadingModeChartBofedalL05(true);
                                                          var collectionL05=ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                                                                       .filterBounds(app.bounds)
                                                                       .filterMetadata('CLOUD_COVER','Less_than',23)
                                                                       //.select(['B2','B3','B4','B7']);
                                                          var idCollectionL05='LANDSAT/LT05/C01/T1_TOA';
                                                          app.AreaBofedal(collectionL05,idCollectionL05);
                                                            app.contadorGraficoBofedalL05=true;
                                                    };
                             app.makeChartBofedalL08=function()
                                                    {
                                                       if(app.contadorGraficoBofedalL08)
                                                      {
                                                          alert('El gráfico ya ha sido generado.');
                                                          return;
                                                      }
                                                          app.setLoadingModeChartBofedalL08(true);
                                                           var collectionL08=ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                                                                       .filterBounds(app.bounds)
                                                                       .filterMetadata('CLOUD_COVER','Less_than',23)
                                                                       //.select(['B3','B4','B5','B7']);
                                                          var idCollectionL08='LANDSAT/LC08/C02/T1_TOA';
                                                          app.AreaBofedal(collectionL08,idCollectionL08);
                                                           app.contadorGraficoBofedalL08=true;
                                                    };
};
///crear constantes
app.createConstants = function() {
  app.intRCheckBox=0;
  app.disabled=true;
  app.contadorGraficoBofedalL08=false;
  app.contadorGraficoBofedalL05=false;
  app.imageDate;
  app.coincidenciaLC08;
  app.coincidenciaLT05;
  app.imageId;
  app.image;
  app.yr;
  app.srtm=ee.Image('USGS/SRTMGL1_003');
  app.slope = ee.Terrain.slope(app.srtm);
  app.contadorGraficoWaterL05=false;
  app.contadorGraficoWaterL08=false;
  app.ICfilter;
  app.mascara_sst;
  app.selectYr;
  app.area = ee.Image
            .pixelArea()
            .divide(10000);
 app.bContador=false;
//cuenca
 app.shapeCC=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas');
 app.cuenca_junin_sanjuan = ee.FeatureCollection('users/ecosistemaslenticos/cuenca_san_juan_junin').geometry();
 app.nationalReserveJunin=ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin')
                             .geometry();
  app.cc=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas');  
  app.cuencasComunidades=app.cuenca_junin_sanjuan.union(app.cc.geometry());
  app.lago=app.cc.filter(ee.Filter.eq('Condición','Chinchaycocha'));
  app.unionRL=app.nationalReserveJunin.union(app.lago.geometry());
  app.imageModelo=ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_007068_19860505');
  app.diferencia=app.nationalReserveJunin.difference(app.lago.geometry());
   app.imagelch=app.imageModelo.addBands(0).select(['constant'],['NDWI']).clip(app.diferencia);
   app.ndwiViz = {
               min: 0, 
               max: 1, 
             palette: [ '0000FF']
            };
    app.layerAnterior="";
    app.comunidadAnteriorLayer;
    app.aBETIQUETAS=false;
    app.bLayer=false;
    app.leyendaAnteriorComunidad;
    app.leyendaAnteriorCampo;
    app.bounds=ee.Geometry.Point(-76.1273, -11.0174);
  app.LEGEND_STYLE_comunidad={position:'bottom-right',padding:'8px 15px'};
  app.SECTION_STYLE_true={margin: '0px 0 0 0'};
  app.SECTION_STYLE_false={margin: '0px 0 0 0',shown:false};
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  //bottom-left
  app.LEGEND_STYLE={position:'bottom-right',padding:'8px 15px'};
  app.LEGEND_TITLE_STYLE={
            fontWeight:'bold',
            fontSize:'18 px',
            margin:'0 0 4px 0',
            padding:'0'
          };
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 50;
  app.VIS_OPTIONS = {
    'Color Natural': {
      description: 'Percepción de la tierra con nuestros ojos desde el espacio' +
                   '.Las aguas claras y profundas se ven de color azul oscuro o negro.'+
                   'El agua con un alto contenido de clorofila se ve verde.',
      valor:0,
      name:'Color Natural',
     // visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
     'Infrarrojo Color ': {
      description: 'La vegetación saludable tiende a una aparicencia de rojo brillante. ' +
                   '.',
      valor:1,
      name:"Infrarrojo Color"
      },
      'Presencia de agua': {
      description: 'Es útil para ver cuerpos de agua, zonas húmedas  ' +
                   'y zonas temporalmente inundada. Las sombras de nube '+
                   'o del terreno puede malinterpretarse como agua en la superficie.',
      valor:2,
      name:"Presencia de agua"
      },
      'Temperatura': {
      description: 'Es útil para calcular la temperatura ' +
                   'superficial de las diferentes coberturas terrestre.',
      valor:4,
      name:"Temperatura"
      },
      'Turbidez del agua':{
        description:'Es útil para ver el grado de transparencia que pierde el agua por la presencia de'+
                    ' particulas en suspensión.Las nubes pueden malinterpretarse como agua turbia.',
        valor:3,
        name:"Turbidez del agua"
      }
  };
  app.comunidades={
    'Carhuamayo':{
      valor:1
    },
    'Cochamarca':{
       valor:2
    },
    'Huayre':{
       valor:3
    },
    'Matacancha':{
       valor:4
    },
    'Ninacaca':{
       valor:5
    },
    'Ondores':{
       valor:6
    },
    'San Pedro de Atoc Conoc':{
       valor:7,
       palette:['green','yellow','purple'],
       etiquetas:['Punto de inundación de marzo del 2020','Límite de la inundación ','Zona que se inundaba'],
       bEtiquetas:true,
       capas:{
         p1:[ee.Geometry.Point(-76.049786,-10.941977),{color:'red'},'Linea férrea',0],
         p2:[ee.Geometry.Point(-76.054195,-10.943851),{color:'red'},'Canal',0],
         p3:[ee.Geometry.Point(-76.072130,-10.956033),{color:'red'},'Blanco',0],
         p4:[ee.Geometry.Point(-76.057146,-10.945515),{color:'red'},'Inundación por lluvia',0],
         p5:[ee.Geometry.Point(-76.061099,-10.947767),{color:'purple'},'Zona que se inundaba',1],
         p6:[ee.Geometry.Point(-76.071908,-10.955869),{color:'red'},'Ave muerta',0],
         p7:[ee.Geometry.Point(-76.061696,-10.948078),{color:'purple'},'Zona que se inundaba',1],
         p8:[ee.Geometry.Point(-76.062297,-10.948418),{color:'red'},'Drenaje',0],
         p9:[ee.Geometry.Point(-76.064265,-10.949554),{color:'red'},'Canal',0],
         p10:[ee.Geometry.Point(-76.071672,-10.955695),{color:'red'},'Inundación por el embalse',0],
         p11:[ee.Geometry.Point(-76.065254,-10.950088),{color:'red'},'Hasta aquí se inunda actualmente',0],
         p12:[ee.Geometry.Point(-76.072635,-10.956547),{color:'green'},'Adentrándonos en la inundación del lago',1],
         p13:[ee.Geometry.Point(-76.072639,-10.956471),{color:'green'},'Adentro de la inundación del lago',1],
         p14:[ee.Geometry.Point(-76.070943,-10.955086),{color:'yellow'},'Parte alta de la inundación',1],
         p15:[ee.Geometry.Point(-76.067646,-10.952172),{color:'red'},'Zonas dañadas de pastizales',0],
         p16:[ee.Geometry.Point(-76.072183,-10.956193),{color:'green'},'Nivel de agua unos 40 cm',1],
         p17:[ee.Geometry.Point(-76.072265,-10.956301),{color:'green'},'Nivel de agua unos 50 cm ',1],
         p18:[ee.Geometry.Point(-76.072568,-10.956508),{color:'green'},'Inundacion considerable más de 50 cm ',1],
         p19:[ee.Geometry.Point(-76.072715,-10.956553),{color:'green'},'Zonas dañadas de pastizales',0],
       },
    },
    'San Pedro de Pari':{
       valor:8
    },
    'Santa Clara de Chuiroc':{
       valor:9
    },
    'Vicco':{
       valor:10
    },
    'Villa Junín':{
       valor:11,
       palette:['green','yellow','purple'],
       etiquetas:['Punto de inundación de marzo del 2020','Límite de la inundación','Zona que se inundaba hasta 1994'],
       bEtiquetas:true,
       capas:{
          //SANTA MARIA DE LLACTA 
         p1:[ee.Geometry.Point(-76.017268,-11.097555),{color:'green'},'SMLL inundacion considerable más de 50 cm 1'],
         p2:[ee.Geometry.Point(-76.018185,-11.100608),{color:'green'},'SMLL inundacion considerable más de 50 cm 2'],
         p3:[ee.Geometry.Point(-76.01532,-11.10097),{color:'green'},'SMLL inundacion considerable más de 50 cm 3'],
         p4:[ee.Geometry.Point(-76.0151949,-11.0990379),{color:'yellow'},'Limite de la inundación, sedimento de color blanco'],
         p5:[ee.Geometry.Point(-76.0121824,-11.0959370),{color:'purple'},'Se inundaba hasta 1994'],
       },
    },
  };
};
//bot
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.pickerPeriodo.panel,
      app.filters.panel,
      app.pickerMensual.panel,
      app.picker.panel,
      app.vis.panel,
      app.calcularInundacionTotal.panel,
      app.selectorComunidades.panel,
      app.changeInspector.panel,
      app.clasificacion.panel,
      app.clasificacionReserva.panel,
       app.waterChartDescription.panel,
      app.waterChartLandsat05.panel,
      app.waterChartLandsat08.panel,
      app.bofedalChartDescription.panel,
      app.bofedalChartL05.panel,
      app.bofedalChartL08.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
   ui.root.insert(0, main);
  app.applyFilters();
  Map.centerObject( app.bounds,10);
  Map.style().set('cursor', 'crosshair');
};
app.boot();