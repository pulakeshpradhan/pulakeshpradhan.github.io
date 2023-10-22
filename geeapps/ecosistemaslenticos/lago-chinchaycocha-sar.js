var app={};
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Lago Chinchaycocha',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación te permite filtrar imágenes, ' +
               'de la colección Sentinel 1 SAR .')
    ])
  };
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
   app.filters = {
     selectYr: ui.Textbox({placeholder: 'Year',  value: '2020',style: {width: '100px'}}),
     select: ui.Select({
       items: app.selectItemsMensual,
      placeholder: 'Selecciona un mes ',
      value: app.selectItemsMensual[0],
     onChange: app.refreshMapLayer
    }),
    applyButton: ui.Button('Aplicar filtro', app.applyFilters),
    centerButton: ui.Button('Centrar Mapa', app.centerMap),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'red', shown: false}
    }),
    checkBox_1_15:ui.Checkbox('1 al 15', false),
    checkBox_15_fin:ui.Checkbox('15 a fin de mes ',false),
   fecha_ad:ui.Label({
      value:'' ,
    })
  };
   /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Coloque el año ', {fontWeight: 'bold'}),
      ui.Label('Desde Mayo desde el 2017', app.HELPER_TEXT_STYLE), 
      ui.Panel([
        app.filters.selectYr,
         app.filters.select
        ],ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
      app.filters.centerButton,
       ui.Label('Mosaico del: ',{fontWeight: 'bold'}),
       ui.Panel([
        app.filters.checkBox_1_15,
        app.filters.checkBox_15_fin,
      ], ui.Panel.Layout.flow('horizontal')),
        ui.Label('Fecha de adquisicion: ',{fontWeight: 'bold'}),app.filters.fecha_ad
    ],
    style: app.SECTION_STYLE_true
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
app.anios=ee.List.sequence(2017,2020);
app.dias=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17',
          '18','19','20','21','22','23','24','25','26','27','28','29','30','31']
app.selectItemsMensual = Object.keys( app.layerPropertiesMensual);
app.anios=app.anios.map(function(anio){
  return ee.String(anio).slice(0,4);
});
  app.selectItemsAnios =app.anios.getInfo() ;
  app.selectItemsDias =app.dias ;
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
      ui.Label('2) Seleccione una visualización', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
    app.vis.select.setValue(app.vis.select.items().get(0));
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    selectAnioAntes: ui.Select({
      placeholder: 'Selecciona un año',
      items: app.selectItemsAnios,
      value: app.selectItemsAnios[0],
    }),
    selectMesAntes: ui.Select({
      placeholder: 'Selecciona un mes',
      items: app.selectItemsMensual,
      value: app.selectItemsMensual[0],
    }),
    selectDiaAntes: ui.Select({
      placeholder: 'Selecciona un dia',
      items: app.selectItemsDias,
      value: app.selectItemsDias[0],
    }),
     selectAnioDespues: ui.Select({
      placeholder: 'Selecciona un año',
      items: app.selectItemsAnios,
      value: app.selectItemsAnios[0],
      style: {margin: '10px 0 0 60px'}
    }),
    selectMesDespues: ui.Select({
      placeholder: 'Selecciona un mes',
      items: app.selectItemsMensual,
      value: app.selectItemsMensual[0],
       style: {margin: '10px 0 0 60px'}
    }),
    selectDiaDespues: ui.Select({
      placeholder: 'Selecciona un dia',
        items: app.selectItemsDias,
      value: app.selectItemsDias[0],
       style: {margin: '10px 0 0 70px'}
    }),
     btnVerInuncacion: ui.Button('Aplicar Filtro', app.btnVerInundacion),
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('3) Selecciona una fecha antes y después de la inundación:', {fontWeight: 'bold'}),
      ui.Panel([
         ui.Label('Antes', {fontWeight: 'bold',margin: '0 0 0 10px'}),
         ui.Label('Después', {fontWeight: 'bold',margin: '0 0 0 80px'}),
      ],ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.picker.selectAnioAntes,
        app.picker.selectAnioDespues,
      ],ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
        app.picker.selectMesAntes,
        app.picker.selectMesDespues,
      ],ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
        app.picker.selectDiaAntes,
        app.picker.selectDiaDespues,
      ],ui.Panel.Layout.flow('horizontal')),
       app.picker.btnVerInuncacion
    ],
    style: app.SECTION_STYLE
  });
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
                                              ui.Label('3) Inspector de cambios', {fontWeight: 'bold'}),
                                              ui.Label('Haga clic en un punto en el mapa para obtener coordenada.'),
                                              app.changeInspector.lon,
                                              app.changeInspector.lat,
                                              app.changeInspector.loadingLabel,
                                            ],
                                            style: app.SECTION_STYLE
                               });
   app.selectorComunidades = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.comunidades),
      onChange: function() {
        app.refreshComunidad();
        app.actDesCheckBoxComunidad();
      }
    }),
     checkBox_capa:ui.Checkbox('Capa', false),
     btnInundacion: ui.Button('Aplicar Filtro', app.calcularPorComunidad),
  };
   app.selectorComunidades.panel = ui.Panel({
    widgets: [
      ui.Label('4) Seleccione una comunidad campesina', {fontWeight: 'bold'}),
      ui.Panel([
       app.selectorComunidades.select,
        app.selectorComunidades.checkBox_capa,
        ], ui.Panel.Layout.flow('horizontal')),
       app.selectorComunidades.btnInundacion,
    ],
    style: app.SECTION_STYLE
  });
   app.selectorComunidades.select.setValue(app.selectorComunidades.select.items().get(0));
};
app.createHelpers = function() {
  app.crearLeyendaMosaico=function(fecha){
     var opcion_vis=app.VIS_OPTIONS[app.vis.select.getValue()];
    if(app.leyendaAnteriorMosaico){
          Map.remove(app.leyendaAnteriorMosaico);
        }
                  var legend=ui.Panel({
                  style: app.LEGEND_STYLE
                });
               var legendDate=ui.Label({
                        value: fecha,
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
             app.leyendaAnteriorMosaico=legend;
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
   app.actDesCheckBoxComunidad=function(){
     if(app.selectorComunidades){
      var bCheckBox=app.selectorComunidades.checkBox_capa.getValue();
     if(bCheckBox){
          Map.layers().get(Map.layers().length()-1).setShown(bCheckBox);
     }
     else{
        Map.layers().get(Map.layers().length()-1).setShown(bCheckBox);
     }
      app.selectorComunidades.checkBox_capa.onChange(function(checked){
          var indexLayerComunidad= app.indexLayer(app.layerAnterior);
        if ( indexLayerComunidad > -1) {
                 Map.layers().get(indexLayerComunidad).setShown(checked);
              } 
     });
     }
  };
  app.makeLegend=function(color,name){
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
  app.actDesCheckBox=function(){
     app.filters.checkBox_1_15.onChange(function(checked){
       app.filters.checkBox_15_fin.setValue(0);
        app.filters.checkBox_1_15.setValue(checked);
        if(app.aFecha_1_15){
            app.activeLayer(app.aFecha_1_15,checked);
        }
        if(checked){
          app.filters.fecha_ad.setValue(app.aFecha_1_15);
                app.refreshComunidad();
        }
        app.crearLeyendaMosaico(app.aFecha_1_15);
     });
     app.filters.checkBox_15_fin.onChange(function(checked){
        app.filters.checkBox_1_15.setValue(0);
         app.filters.checkBox_15_fin.setValue(checked);
         if(app.aFecha_15_fin){
           app.activeLayer(app.aFecha_15_fin,checked);
         }
         if(checked){
          app.filters.fecha_ad.setValue(app.aFecha_15_fin);
          app.refreshComunidad();
          app.actDesCheckBoxComunidad();
        }
              app.crearLeyendaMosaico(app.aFecha_15_fin);
     });
  };
  app.calcularCoordenadas=function(){
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
 app.btnVerInundacion= function() {
   Map.clear();
    app.ICfilter_1=  app.ICfilter.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
    var collectionVV=app.ICfilter_1.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
                           .select('VV');
    var collectionVH=app.ICfilter_1.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
                           .select('VH');
      var anioAntes=app.picker.selectAnioAntes.getValue();
      var mesAntes=app.picker.selectMesAntes.getValue();
      var nMesAntes=parseInt(app.layerPropertiesMensual[mesAntes].name);
      var diaAntes=app.picker.selectDiaAntes.getValue();
       var anioDespues=app.picker.selectAnioDespues.getValue();
      var mesDespues=app.picker.selectMesDespues.getValue();
      var nMesDespues=parseInt(app.layerPropertiesMensual[mesDespues].name);
      var diaDespues=app.picker.selectDiaDespues.getValue();
      app.diaYearAntes=ee.Date(anioAntes+'-'+nMesAntes+'-'+diaAntes).getRelative('day','year');
      app.diaYearDespues=ee.Date(anioDespues+'-'+nMesDespues+'-'+diaDespues).getRelative('day','year');
         var beforeVH=collectionVH.filter(ee.Filter.calendarRange(ee.Number.parse(anioAntes),ee.Number.parse(anioAntes),'year'))
                                .filter(ee.Filter.dayOfYear( app.diaYearAntes.subtract(15),app.diaYearAntes))
                                 .mosaic();
      var afterVH=collectionVH.filter(ee.Filter.calendarRange(ee.Number.parse(anioDespues),ee.Number.parse(anioDespues),'year'))
                               .filter(ee.Filter.dayOfYear(app.diaYearDespues, app.diaYearDespues.add(15)))
                               .mosaic();
      var SMOOTHING_RADIUS=50;
      var  beforeVH_filtered=beforeVH.focal_mean( SMOOTHING_RADIUS,'circle','meters');
      var  afterVH_filtered=afterVH.focal_mean( SMOOTHING_RADIUS,'circle','meters');
      var diferenceVH=afterVH_filtered.divide(beforeVH_filtered);
      Map.clear();      
      Map.addLayer( diferenceVH.clip( app.cuencasComunidades),{min:0,max:2},'Zonas inundadadas en blanco',1);
      var diff_upper_treshold=1.2;
      var differenceVH_tresholded=diferenceVH.gt(diff_upper_treshold);
      Map.addLayer(differenceVH_tresholded.updateMask(differenceVH_tresholded).clip( app.cuencasComunidades),
                    {palette:"3b83bd"},'Areas inundadas en azul');
      Map.addLayer(app.delta,{color:'red'},'Remediación del de Delta Upamayo'); 
      app.calcularCoordenadas();
      app.actDesCheckBox();
    // Map.centerObject(app.bound,10);
 };
  app.applyFilters= function() {
        app.refreshMapLayer() ;        
  };
  app.centerMap=function(){
      Map.centerObject(app.bound,10);
  };
  app.cambiarCheckBox=function(sFechaCheckBox,bCheckBox_1_15,bCheckBox_15_fin){
    app.activeLayer(sFechaCheckBox,1);
    app.filters.checkBox_1_15.setValue(bCheckBox_1_15);
    app.filters.checkBox_15_fin.setValue(bCheckBox_15_fin);
    app.filters.fecha_ad.setValue(sFechaCheckBox);
    app.crearLeyendaMosaico(sFechaCheckBox);
  };
  app.LayerOpcionUno=function(compositeOptions,sFechaOptions)
  {
      var azul;
      var rojo;
      var verde;
      var mosaic;
     rojo=compositeOptions.select('VV').rename('BRED');
     verde=compositeOptions.select('VH').rename('BGREEN');   
     azul=rojo.divide(verde).rename("BBLUE");
     mosaic=compositeOptions.addBands(rojo).addBands(verde).addBands(azul);
     mosaic= mosaic.select(['BRED','BGREEN','BBLUE']);
     //app.cuencasComunidades
     //app.RNJComunidades
     Map.addLayer(mosaic.clip(app.cuencasComunidades),{min: [-25, -20, -25], max: [-10, -10, -15]},sFechaOptions,0);
  };
   app.refreshMapLayer =function() {
     app.bLayer=false;
     app.aBETIQUETAS=false;
     var intCheck=0;
     var agua;
     var mascara_agua;
     var opcion_vis=app.VIS_OPTIONS[app.vis.select.getValue()];
     var sFecha="";
     app.filters.fecha_ad.setValue(sFecha);
     app.ICfilterR1;
     app.ICfilterR2;
     var nFin;
     app.selectYr = app.filters. selectYr.getValue();
     app.sMes= app.filters.select.getValue();
     app.nMes=parseInt(app.layerPropertiesMensual[app.sMes].name);
     if(isNaN( app.selectYr)){
        alert('El valor ingresado para el año no es un número');
        return;
      }
      if (app.selectYr) app.year = ee.Number.parse(app.selectYr);
      if(app.nMes==1 ||app.nMes==3 || app.nMes==5 ||app.nMes==7 || app.nMes==8 ||app.nMes==10 ||app.nMes==12){
            nFin=31;
        app.ICfilterR1=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 1, 15, 'day_of_month'));
         app.ICfilterR2=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 15, nFin, 'day_of_month'));
          if(app.ICfilterR1.size().getInfo()===0 && app.ICfilterR2.size().getInfo()===0){
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
      }
       if(app.nMes==02){
            nFin=28;
        app.ICfilterR1=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 1, 15, 'day_of_month'));
         app.ICfilterR2=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 15, nFin, 'day_of_month'));
          if(app.ICfilterR1.size().getInfo()===0 && app.ICfilterR2.size().getInfo()===0){
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
      }
       if(app.nMes==4 ||app.nMes==6 || app.nMes==9 ||app.nMes==11 ){
            nFin=30;
        app.ICfilterR1=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 1, 15, 'day_of_month'));
         app.ICfilterR2=app.ICfilter.filter(ee.Filter.calendarRange(app.year,app.year,'year'))
                    .filter(ee.Filter.calendarRange( app.nMes, app.nMes, 'month'))
                    .filter(ee.Filter.calendarRange( 15, nFin, 'day_of_month'));
          if(app.ICfilterR1.size().getInfo()===0 && app.ICfilterR2.size().getInfo()===0 ){
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
          }
      }
      // Filter to get images from different look angles.
      var vhAscendingR1 = app.ICfilterR1.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
      var vhDescendingR1= app.ICfilterR1.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
     var vhAscendingR2 = app.ICfilterR2.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
     var vhDescendingR2= app.ICfilterR2.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
      var nVhAscendingR1=vhAscendingR1.size().getInfo();
      var nVhDescendingR1=vhDescendingR1.size().getInfo();
      var nVhAscendingR2=vhAscendingR2.size().getInfo();
      var nVhDescendingR2=vhDescendingR2.size().getInfo();
        if((nVhAscendingR1===0 || nVhDescendingR1===0) && (nVhAscendingR2===0 || nVhDescendingR2===0)){
            alert('No hay suficientes imágenes disponible para originar el mosaico. Elige otro mes.');
            return;
          }
           Map.clear();
      if(nVhAscendingR1!==0 && nVhDescendingR1!==0)
      {
         app.filters.checkBox_1_15.style().set('shown', true);
            // Create a composite from means at different polarizations and look angles.
          var compositeR1 = ee.Image.cat([
            vhAscendingR1.select('VH').mean(),
            ee.ImageCollection(vhAscendingR1.select('VV').merge(vhDescendingR1.select('VV'))).mean(),
            vhDescendingR1.select('VH').mean()
          ]).focal_median();
          sFecha='Mosaico del '+'1 al 15 de '+app.sMes+' del año '+ app.selectYr;
           app.aFecha_1_15=sFecha;
           if(opcion_vis.valor===0){
            // Display as a composite of polarization and backscattering characteristics.
                 Map.addLayer(compositeR1.clip( app.cuencasComunidades), {min: [-25, -20, -25], max: [0, 10, 0]}, 
                    sFecha,0);
                 app.refreshComunidad();
                 app.actDesCheckBoxComunidad(); 
           }    
          if(opcion_vis.valor===1){
             app.LayerOpcionUno(compositeR1,sFecha);
                 app.refreshComunidad();
                 app.actDesCheckBoxComunidad(); 
          }
           if(intCheck===0){
             app.cambiarCheckBox(sFecha,1,0);
           }
          intCheck=intCheck+1;
      }
      else{
         app.filters.checkBox_1_15.style().set('shown', false);
      }
      if(nVhAscendingR2 !==0 && nVhDescendingR2 !==0){
         app.filters.checkBox_15_fin.style().set('shown', true);
          // Create a composite from means at different polarizations and look angles.
          var compositeR2 = ee.Image.cat([
            vhAscendingR2.select('VH').mean(),
            ee.ImageCollection(vhAscendingR2.select('VV').merge(vhDescendingR2.select('VV'))).mean(),
            vhDescendingR2.select('VH').mean()
          ]).focal_median();
        sFecha='Mosaico del 15 al  '+nFin+' de '+app.sMes+' del año '+ app.selectYr;
        app.aFecha_15_fin=sFecha;
       // Display as a composite of polarization and backscattering characteristics.
        if(opcion_vis.valor===0){
            Map.addLayer(compositeR2.clip( app.cuencasComunidades), {min: [-25, -20, -25], max: [0, 10, 0]}, 
                                sFecha,0);
                 app.refreshComunidad();
                 app.actDesCheckBoxComunidad(); 
        }
           if(opcion_vis.valor===1){
              app.LayerOpcionUno(compositeR2,sFecha);
                 app.refreshComunidad();
                 app.actDesCheckBoxComunidad(); 
           }
            if(intCheck===0){
                 app.cambiarCheckBox(sFecha,0,1);
           }
           intCheck=intCheck+1;
      }
      else{
         app.filters.checkBox_15_fin.style().set('shown', false);
      }
      Map.addLayer(app.delta,{color:'red'},'Remediación del de Delta Upamayo');   
        app.calcularCoordenadas();
        app.actDesCheckBox();
   };
   app.crearLeyendaComunidad=function(nameComunidad,paleta,etiquetas){
      var legend=ui.Panel({
          style: app.LEGEND_STYLE
        });
        var legendDate=ui.Label({
          value:app.filters.fecha_ad.getValue(),
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendDate);
        var legendTitle=ui.Label({
          value:'Leyenda de datos de campo de '+nameComunidad,
          style:app.LEGEND_TITLE_STYLE
        });
        legend.add(legendTitle);
        var palette=paleta;
        var names=etiquetas;
        for(var i=0;i<3;i++){
          legend.add(app.makeLegend(palette[i],names[i]));
        }
        Map.add(legend);
        app.leyendaAnterior=legend;
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
              }
            };
      app.activeLayer = function(name,booleano) {
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
                  layer.setShown(booleano);
              } else {
              }
            };
    app.aloneLegend=function(){
      if(app.aBETIQUETAS){
            Map.remove(app.leyendaAnterior);
         }
      if(app.selectorComunidades){
       app.nameCC=app.selectorComunidades.select.getValue();
       var scc=app.shapeCC.filter(ee.Filter.eq('Comunidad',app.nameCC));
       //var opacity = 0.5;
       var nombreLayer='Comunidad Campesina de '+app.nameCC;
       Map.addLayer(scc,{color:'grey'}, nombreLayer,1);
         app.layerCC = app.comunidades[app.nameCC];
         app.aBETIQUETAS= app.layerCC.bEtiquetas;
         var listaMuestreo=app.layerCC.capas;
          if(listaMuestreo){
              app.crearLeyendaComunidad(app.nameCC,app.layerCC.palette,app.layerCC.etiquetas);
              for (var key in listaMuestreo){
              Map.addLayer(listaMuestreo[key][0],listaMuestreo[key][1],
              listaMuestreo[key][2],listaMuestreo[key][3]);
           }
          app.comunidadAnteriorLayer=listaMuestreo;
          }
           app.layerAnterior=nombreLayer;
        /*
          scc.evaluate(function(){
             Map.centerObject(scc,11);
          });
         */
      }
    } ;
   app.refreshComunidad=function(){
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
      app.aloneLegend();
   };
   app.calcularPorComunidad=function(){
     app.refreshComunidad();
    app.selectorComunidades.checkBox_capa.setValue(true);
     app.actDesCheckBoxComunidad();
   };
};
app.createConstants = function() {
   app.leyendaAnteriorMosaico;
   app.shapeCC=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas');
   app.cc=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas'); 
   app.nationalReserveJunin=ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin').geometry();
   app.cuenca_junin_sanjuan = ee.FeatureCollection('users/ecosistemaslenticos/cuenca_san_juan_junin').geometry();
   app.cuencasComunidades=app.cuenca_junin_sanjuan.union(app.cc.geometry());
   var contornoExtraccionDelta=[[-76.26934631036154,-10.929861919666537],
                              [-76.24891860650412,-10.903567354260222],
                              [-76.27449615167014,-10.900533216245623],
                              [-76.26934631036154,-10.929861919666537],];
    var gContornoExtraccionDelta= ee.Geometry.Polygon(contornoExtraccionDelta);
    app.granDelta= gContornoExtraccionDelta.difference(app.cc.geometry());
    app.RNJComunidades= app.nationalReserveJunin.union(app.cc.geometry()).union(app.granDelta);
   app.comunidadAnteriorLayer;
    app.aFecha_15_fin;
   app.aFecha_1_15;
   app.layerAnterior;
   app.bLayer=false;
   app.aBETIQUETAS=false;
   app.leyendaAnterior;
   app.nameCC;
   app.layerCC;
    app.LEGEND_TITLE_STYLE={
            fontWeight:'bold',
            fontSize:'18 px',
            margin:'0 0 4px 0',
            padding:'0'
          };
   app.LEGEND_STYLE={position:'bottom-right',padding:'8px 15px'};
  app.VIS_OPTIONS = {
    'Color Natural': {
      description: 'Percepción de la tierra con nuestros ojos desde el espacio' +
                   '.Las aguas claras y profundas se ven de color azul oscuro o negro.'+
                   'El agua con un alto contenido de clorofila se ve verde.',
      valor:0,
      name:"Color Natural"
     // visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
     'AGUA ': {
      description: 'Nos permite ver presencia de agua.' +
                   '.',
      valor:1,
       name:"AGUA"
      },
  };
   app.year;
   app.ICfilter;
   app.sMes;
   app.nMes;
  app.selectYr;
  app.bound=ee.Geometry.Point(-76.1188, -11.0096);
  app.IMAGE_COUNT_LIMIT=30;
   app.ICfilter = ee.ImageCollection('COPERNICUS/S1_GRD')
              .filterBounds(app.bound)
               .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
               .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                .filter(ee.Filter.eq('instrumentMode', 'IW'))
                  .filterMetadata('resolution_meters','equals',10);
  var contorno=[ [-76.26732994144987,-10.907503459434109],
                   [-76.26835990971159,-10.90977901251122],
                   [-76.26938987797331,-10.911296038218683],
                   [-76.26964737003874,-10.913318727117113],
                   [-76.2687032324655,-10.914667178734122],
                   [-76.26827407902312,-10.916184179488225],
                   [-76.26741577213835,-10.915931346567117],
                   [-76.26690078800749,-10.913150170234733],
                    [-76.26604248112272,-10.912813056183136],
                   [-76.26484085148405,-10.911801711733883],
                   [-76.26492668217253,-10.910537526332764],
                   [-76.2635533911569,-10.911043201138455],
                   [-76.26235176151823,-10.909863291920304],
                    [-76.2635533911569,-10.90902049675417] ,
                   [-76.26406837528776,-10.907334899254066],
                   [-76.26492668217253,-10.906492096920424],
                   [-76.26732994144987,-10.907503459434109],
            ]   ;   
  app.delta=ee.Geometry.LinearRing(contorno);
  app.deltaArea=ee.Geometry.Polygon(contorno);
    app.comunidades={
    'Carhuamayo':{
      valor:1,
      bEtiquetas:false,
    },
    'Cochamarca':{
       valor:2,
       bEtiquetas:false,
    },
    'Huayre':{
       valor:3,
       bEtiquetas:false,
    },
    'Matacancha':{
       valor:4,
       bEtiquetas:false,
    },
    'Ninacaca':{
       valor:5,
       bEtiquetas:false,
    },
    'Ondores':{
       valor:6,
       bEtiquetas:false,
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
       valor:8,
       bEtiquetas:false,
    },
    'Santa Clara de Chuiroc':{
       valor:9,
       bEtiquetas:false,
    },
    'Vicco':{
       valor:10,
       bEtiquetas:false,
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
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.vis.panel,
     // app.picker.panel,
      app.changeInspector.panel,
      app.selectorComunidades.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
   ui.root.insert(0, main);
   app.applyFilters();
  Map.centerObject(app.bound,10);
   Map.style().set('cursor', 'crosshair');
};
app.boot();