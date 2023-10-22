var app={};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Lago Chinchaycocha',
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
      ], ui.Panel.Layout.flow('horizontal'))
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
  };
  /* The panel for the picker section with corresponding widgets. */
  app.pickerMensual.panel = ui.Panel({
    widgets: [
      ui.Label('Selecciona un mes', {fontWeight: 'bold'}),
      ui.Panel([
        app.pickerMensual.select,
      ], ui.Panel.Layout.flow('horizontal')),
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
  };
  app.calcularInundacionTotal.panel=ui.Panel({
    widgets: [
      ui.Label('4) Calcular Inundación Total', {fontWeight: 'bold'}),
      app.calcularInundacionTotal.btnCalcularInuncacionTotal,
      app.calcularInundacionTotal.inundacion,
      app.calcularInundacionTotal.fecha,
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
      }
    }),
     btnInundacion: ui.Button('Calcular', app.calcularPorComunidad),
     comunidad: ui.Label(),
     inundacion: ui.Label(),
     fecha: ui.Label(),
  };
   app.selectorComunidades.panel = ui.Panel({
    widgets: [
      ui.Label('5) Seleccione una comunidad campesina', {fontWeight: 'bold'}),
       app.selectorComunidades.select,
       app.selectorComunidades.btnInundacion,
       app.selectorComunidades.comunidad,
       app.selectorComunidades.inundacion,
       app.selectorComunidades.fecha,
    ],
    style: app.SECTION_STYLE
  });
   app.selectorComunidades.select.setValue(app.selectorComunidades.select.items().get(0));
  app.clasificacion={
     btnClasificar: ui.Button('Aplicar filtro', app.aplicarClasificacion),
  };
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
                                                      ui.Label('6) Inspector de cambios', {fontWeight: 'bold'}),
                                                      ui.Label('Haga clic en un punto en el mapa para obtener coordenada.'),
                                                      app.changeInspector.lon,
                                                      app.changeInspector.lat,
                                                      app.changeInspector.loadingLabel,
                                                    ],
                                                    style: app.SECTION_STYLE
                                       });
  app.clasificacion.panel=ui.Panel({
    widgets: [
      ui.Label('5) Clasificación digital de la Reserva Nacional de Junin', {fontWeight: 'bold'}),
      app.clasificacion.btnClasificar,
    ],
    style: app.SECTION_STYLE
  });
};
//crear funciones 
app.createHelpers = function() {
  var year;
  var anio_1984=ee.Number.parse('1984');
  var anio_anterior;
  /** Applies the selection filters currently selected in the UI. */
  app.crearLeyenda=function(titulo,paleta,nombres){
    var legend=ui.Panel({
          style: app.LEGEND_STYLE
        });
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
    //layerProperties[layerSelect.getValue()].legend
    var sMes= app.pickerMensual.select.getValue();
    var nMes=parseInt(app.layerPropertiesMensual[sMes].name);
    var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA');
    var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
    var IC_1 = L5coll.merge(L8coll);
    var pn= app.pickerPeriodo.selectPn.getValue();
    if(pn) pn=ee.Number.parse(pn);
    app.ICfilter =ee.ImageCollection(IC_1)
                    .filterBounds(app.bounds)
                    .filter(ee.Filter.calendarRange( nMes, nMes, 'month'))
                    .filterMetadata('CLOUD_COVER','Less_than',pn);
     if(app.ICfilter.size().getInfo()===0){
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
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
  };
   app.applyFilters = function() {
     var IC;
    //app.setLoadingMode(true);
   if(app.contador!==0){
         anio_anterior= app.selectYr;
     }
    // Filtrar variables
    app.selectYr = app.filters.selectYr.getValue();
    app.contador++;
    if (app.selectYr) year = ee.Number.parse(app.selectYr);
    if(year>= anio_1984){
      IC = ee.Algorithms.If(
                year.eq(ee.Number(2012)),ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA'),
                ee.Algorithms.If(year.gt(ee.Number(2012)),
                ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'),
                ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')));
    } else if(app.selectYr<anio_1984){
        alert('EL año debe ser mayor o igual a 1984.');
        app.selectYr=anio_anterior;
        return;
    }               
      var pn= app.pickerPeriodo.selectPn.getValue();
     if(pn) pn=ee.Number.parse(pn);
     app.ICfilter = ee.ImageCollection(IC)
                  .filterBounds( app.bounds)
                  .filter(ee.Filter.dayOfYear(1,365))
                  .filter(ee.Filter.calendarRange(year,year,'year'))
                  .filterMetadata('CLOUD_COVER','Less_than',pn);
       if(app.ICfilter.size().getInfo()===0){
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
      //app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
   app.crearLeyendaComunidad=function(nameComunidad,paleta,etiquetas){
      var legend=ui.Panel({
          style:app.LEGEND_STYLE_comunidad
        });
        var legendDate=ui.Label({
          value: app.picker.fecha_ad.getValue(),
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
          legend.add(app.makeLegendComunidad(palette[i],names[i]));
        }
        Map.add(legend);
        app.leyendaAnterior=legend;
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
              } else {
              }
            };
   app.refreshComunidad=function(){
      if(app.aBETIQUETAS){
            Map.remove(app.leyendaAnterior);
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
     Map.addLayer(scc,{}, nombreLayer,1);
         var layerCC = app.comunidades[nameCC];
         app.aBETIQUETAS= layerCC.bEtiquetas;
         var listaMuestreo=layerCC.capas;
          if(listaMuestreo){
              app.crearLeyendaComunidad(nameCC,layerCC.palette,layerCC.etiquetas);
           for (var key in listaMuestreo){
              Map.addLayer(listaMuestreo[key][0],listaMuestreo[key][1],
              listaMuestreo[key][2], listaMuestreo[key][3]);
           }
               app.comunidadAnteriorLayer=listaMuestreo;
          }
           app.layerAnterior=nombreLayer;
           app.calcularPorComunidad();
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
    app.refreshComunidad();
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
        app.refreshComunidad();
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
    var srtm;
    var swir_1;
    var slope;
    var anio_2012=ee.Number.parse('2012');
  app.recogerCoordenadas();
    if(app.contador!==0){
       app.calcularInundacionTotal.inundacion.setValue('');
           app.calcularInundacionTotal.fecha.setValue('');
         app.selectorComunidades.comunidad.setValue('');
         app.selectorComunidades.inundacion.setValue('');
           app.selectorComunidades.fecha.setValue('');
    }
    app.contador++;
    var yr= app.selectYr;
    if(yr) yr=ee.Number.parse(yr);
    var imageId = app.picker.select.getValue();
    //slope
     srtm=ee.Image('USGS/SRTMGL1_003');
     slope = ee.Terrain.slope(srtm);
    if (imageId) {
      var coincidenciaLC08=ee.String(imageId).index('LC08').getInfo();
       var coincidenciaLT05=ee.String(imageId).index('LT05').getInfo();
       if(coincidenciaLC08>-1){
        COLLECTION_ID='LANDSAT/LC08/C01/T1_TOA';
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
      }else if(coincidenciaLT05>-1){
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
      }else if(yr.eq(anio_2012)){
          COLLECTION_ID='LANDSAT/LE07/C01/T1_TOA';
          visParams={min:0.0241,max: 0.141,gamma:1,opacity:1,bands:['B3','B2','B1']};
        }
      // If an image id is found, create an image.
      var image = ee.Image(COLLECTION_ID + '/' + imageId).clip(app.cuenca_junin_sanjuan);
     var date_ad= ee.Date(image.get('system:time_start')).format("dd-MM-YYYY    HH:mm:ss");
     app.picker.fecha_ad.setValue(date_ad.getInfo());
      if(opcion_vis.valor<2){
         Map.addLayer(image,visParams, imageId);
         app.refreshComunidad();
      }else if( opcion_vis.valor===2){
        if(menor_2012){
            swir_1=image.select('B5') ;
            app.layerOpcionDos(image,swir_1,visParams_I,slope,imageId);
        }else if(mayor_2012){
           swir_1=image.select('B6') ;
           app.layerOpcionDos(image,swir_1,visParams_I,slope,imageId,imageId);
        }
      }else if(opcion_vis.valor===3){
          if(menor_2012){
             var B3_B1= image.expression(
               '(RED/BLUE)', {
                'RED': image.select('B3'),
                'BLUE': image.select('B1'),
            });
            app.layerOpcionTres(image,['B2', 'B4'],B3_B1,slope,imageId,visParams_N);
        }else if( mayor_2012){
           var B4_B2= image.expression(
          '(RED/BLUE)', {
          'RED': image.select('B4'),
          'BLUE': image.select('B2'),
          });
          app.layerOpcionTres(image,['B3', 'B5'],B4_B2,slope,imageId,visParams_N);
        }
        app.crearLeyenda('Leyenda de Turbidez del Agua',['ff0000','ffff00','0000ff'],
                        ['Agua con alta turbidez','Agua con baja turbidez','Agua clara']);
       }
       else if(opcion_vis.valor===4){
          if(menor_2012){
          }
          else if( mayor_2012){
          }
       }
    }
  };
  app.aplicarClasificacion=function(){
  };
  //inicio funcion de mascara agua
  app.LayerMascaraAgua=function(imagenND,bandsND,Delimitacion,bandsViz,intDelimitacion){
    //0:app.unionRL  1:reservaComunidad    
     var ndwi;
     var agua;
     var mascara_agua;
     var inundacion;
     var mascara_inundacion;
     var area_inundacion;
     var InundacionArea;
     var date_ad;
     var mosaic;
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
                    date_ad= ee.Date(imagenND.get('system:time_start'))
                               .format("dd-MM-YYYY")
                               .getInfo();
            if(intDelimitacion===0){
               app.calcularInundacionTotal.inundacion.setValue
              ('Inundación: '+InundacionArea.toFixed(2)+' ha');
                 app.calcularInundacionTotal.fecha.setValue
              ('Fecha de adquisicion: '+date_ad);
            }
            else if(intDelimitacion===1){
              app.selectorComunidades.comunidad.setValue('Comunidad: '+app.selectorComunidades.select.getValue());
               app.selectorComunidades.inundacion.setValue
               ('Inundación: '+InundacionArea.toFixed(2)+' ha');
               app.selectorComunidades.fecha.setValue
               ('Fecha de adquisicion: '+date_ad);
            }
             mosaic = ee.ImageCollection
                    ([
                         mascara_agua.visualize(app.ndwiViz),
                ]).mosaic();
               //aqui 
              Map.addLayer(imagenND,{min:0,max:0.3,gamma:1.3,bands:bandsViz},'Infrarrojo');
              Map.addLayer(mosaic,{},'Mascara de agua');
              Map.addLayer(app.lago,{color:'green'},'Lago Chinchaycocha');
};
 //fin funcion de mascara agua
 app.btnCalcularInundacionTotal=function(){
    Map.clear();
     app.bLayer=false;
    app.aBETIQUETAS=false;
     var imageId = app.picker.select.getValue();
      var area = ee.Image
            .pixelArea()
            .divide(10000);
    if (imageId) {
      var coincidenciaLC08I=ee.String(imageId).index('LC08').getInfo();
       var coincidenciaLT05I=ee.String(imageId).index('LT05').getInfo();
       if(coincidenciaLC08I>-1){
         var imag_2=ee.Image('LANDSAT/LC08/C01/T1_TOA/'+imageId).clip(app.unionRL);
         app.LayerMascaraAgua(imag_2,['B3', 'B5'],app.unionRL,['B5','B4','B3'],0);
         app.refreshComunidad();
       }
       else if(coincidenciaLT05I>-1){
         var imag_1=ee.Image('LANDSAT/LT05/C01/T1_TOA/'+imageId).clip(app.unionRL);
          app.LayerMascaraAgua(imag_1,['B2', 'B4'],app.unionRL,['B4','B3','B2'],0);
          app.refreshComunidad();
       }
    }
 };
 app.calcularPorComunidad=function(){
    Map.clear();
    app.bLayer=false;
    app.aBETIQUETAS=false;
    app.recogerCoordenadas();
     var nameCC=app.selectorComunidades.select.getValue();
     var geometriaComunidadCampesina=app.cc.filter(ee.Filter.eq('Comunidad',nameCC)).geometry();
     var reservaComunidad=app.nationalReserveJunin.intersection(geometriaComunidadCampesina, ee.ErrorMargin(1));
     var imageId = app.picker.select.getValue();
     var ndwi;
     var agua;
     var mascara_agua;
     var inundacion;
     var mascara_inundacion;
     var area_inundacion;
     var InundacionArea;
     var date_ad;
     var mosaic;
    var area_agua;
    if (imageId) {
      var coincidenciaLC08I=ee.String(imageId).index('LC08').getInfo();
       var coincidenciaLT05I=ee.String(imageId).index('LT05').getInfo();
       if(coincidenciaLC08I>-1){
         var imag_2=ee.Image('LANDSAT/LC08/C01/T1_TOA/'+imageId).clip(app.unionRL);
         app.LayerMascaraAgua(imag_2,['B3', 'B5'],reservaComunidad,['B5','B4','B3'],1);
         app.refreshComunidad();
       }
       else if(coincidenciaLT05I>-1){
          var imag_1=ee.Image('LANDSAT/LT05/C01/T1_TOA/'+imageId).clip(app.unionRL);
          app.LayerMascaraAgua(imag_1,['B2', 'B4'],reservaComunidad,['B4','B3','B2'],1);
          app.refreshComunidad();
       }
    }
 };
};
///crear constantes
app.createConstants = function() {
  app.ICfilter;
  app.mascara_sst;
  app.selectYr;
  app.area = ee.Image
            .pixelArea()
            .divide(10000);
 app.contador=0;
//cuenca
 app.shapeCC=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas');
 app.cuenca_junin_sanjuan = ee.FeatureCollection('users/ecosistemaslenticos/cuenca_san_juan_junin');
 app.nationalReserveJunin=ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin')
                             .geometry();
  app.cc=ee.FeatureCollection('users/canal/cartografia/lch/ComunidadesCampesinas');  
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
    app.layerAnterior;
    app.comunidadAnteriorLayer;
    app.aBETIQUETAS=false;
    app.bLayer=false;
    app.leyendaAnterior;
    app.bounds=ee.Geometry.Polygon([[
    [-76.13650861216763,-11.008342201611137],
    [-76.14268842173794,-11.0332795451385],
    [-76.09530988169888,-11.053497459611842],
    [-76.08157697154263,-11.021822109261194]
  ]]);
  app.LEGEND_STYLE_comunidad={position:'bottom-right',padding:'8px 15px'};
  app.SECTION_STYLE_true={margin: '0px 0 0 0'};
  app.SECTION_STYLE_false={margin: '0px 0 0 0',shown:false};
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.LEGEND_STYLE={position:'bottom-left',padding:'8px 15px'};
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
     // visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
     'Infrarrojo Color ': {
      description: 'La vegetación saludable tiende a una aparicencia de rojo brillante. ' +
                   '.',
      valor:1,
      },
      'Presencia de agua': {
      description: 'Es útil para ver cuerpos de agua ' +
                   'y zonas temporalmente inundada. Las sombras de nube '+
                   'o del terreno puede malinterpretarse como agua en la superficie.',
      valor:2,
      },
      'Temperatura': {
      description: 'Es útil para calcular la temperatura ' +
                   'superficial de las diferentes coberturas terrestre.',
      valor:4,
      },
      'Turbidez del agua':{
        description:'Es útil para ver el grado de transparencia que pierde el agua por la presencia de'+
                    ' particulas en suspensión.Las nubes pueden malinterpretarse como agua turbia.',
        valor:3,
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
      app.clasificacion.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
   ui.root.insert(0, main);
  app.applyFilters();
  Map.centerObject( app.bounds,10);
  Map.style().set('cursor', 'crosshair');
};
app.boot();