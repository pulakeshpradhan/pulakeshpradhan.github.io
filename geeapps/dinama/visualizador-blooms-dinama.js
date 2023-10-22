var app = {}; 
app.funciones = require('users/dinama/eetools:2019/algas/monitoreo/aquafunc'); 
app.configs = require('users/dinama/eetools:2019/algas/monitoreo/visu_config');
app.correcciones = require('users/dinama/eetools:2019/algas/monitoreo/funciones'); 
app.poligonos = ee.FeatureCollection("users/dinama/puntos_monitoreo_clorofila_v2"); 
/** Crear constantes */
app.createConstants = function() { 
  app.zona = 0;
  app.departamento = 0;
  app.satelite = 0;
  app.mes = 0;
  app.nubes = 80;
  app.img_dates = {};
  app.IMAGE_COUNT_LIMIT = 400;
  app.IMAGE_COUNT_LIMIT_S3 = 60;
  app.monitorCollection = ee.Dictionary();
  app.leftMap = ui.Map();
  app.leftMap.setOptions('HYBRID');
  /*el segundo parametro es el control para las capas*/
  app.leftMap.setControlVisibility(false,true,false,false,false,false);
  app.leftMap.onClick(function(coords,i){
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      app.getData(click_point);
  });
  app.rightMap = ui.Map();
  app.rightMap.setOptions('HYBRID');
  /*el segundo parametro es el control para las capas*/
  app.rightMap.setControlVisibility(false,true,false,false,false,false);
  app.rightMap.onClick(function(coords,i){
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      app.getData(click_point);
  });
  app.collGeom = null;
  app.BOUNDS = ee.Geometry.Polygon(
        [[[-59.555017085129464, -29.697609522669897],
          [-59.555017085129464, -36.71247925939704],
          [-51.710778803879464, -36.71247925939704],
          [-51.710778803879464, -29.697609522669897]]]); 
  app.MAPAS = {
    'Izquierda': {
      description: app.leftMap
    },
    'Derecha': {
      description: app.rightMap
    }
  };
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      color: 'gray',
      stretch: 'horizontal'
  };
};
app.getEndDate = function(fecha){
  var today = null;
  if(typeof fecha === "undefined" || fecha === '' || fecha == null){
    today = new Date().toJSON().slice(0,10); 
  }else{
    var parts = fecha.split('-');
    today = new Date(parts[0], parts[1] - 1, parts[2]); 
  }
  return today;
};
app.getStartDate = function(fecha){
  var newdate = null;
  if(typeof fecha === "undefined" || fecha === '' || fecha == null){
    var date = new Date();
    newdate = new Date(date);
    newdate.setMonth(newdate.getMonth() - 3); 
  }else{
    var parts = fecha.split('-'); 
    newdate = new Date(parts[0], parts[1] - 1, parts[2]); 
    newdate.setMonth(newdate.getMonth() - 3);
  }
  return new Date(newdate).toJSON().slice(0,10);
};
app.getYearBefore = function(fecha){
  var newdate = null;
  if(typeof fecha === "undefined" || fecha === '' || fecha == null){
    var date = new Date();
    newdate = new Date(date);
    newdate.setYear(newdate.getYear() - 6); 
  }else{
    var parts = fecha.split('-');
    newdate = new Date(parts[0], parts[1] - 1, parts[2]); 
    newdate.setYear(newdate.getYear() - 6);
  }
  return new Date(newdate).toJSON().slice(0,10);
};
app.createPanels = function() {
  var departamentos_names = Object.keys(app.configs.DEPARTAMENTOS);
  var mapas_names = Object.keys(app.MAPAS);
  var zona_names = Object.keys(app.configs.DEPARTAMENTOS['Río Negro'].puntos);
  var satelites_names = Object.keys(app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].entrenamiento);
  var visualizacion_names = Object.keys(app.configs.MAP_PARAMS['Sentinel 2'].opciones);
  app.intro = {
    panel: ui.Panel([
      app.HorizontalPanel([
        ui.Button({
          label:'Ocultar',
          onClick: app.ocultar
        }),
        ui.Button({
          label:'Analizar territorio',
          onClick: app.ejecutar_proceso,
          style: {margin:'8px 0px 0px 95px' }
        })
      ]),
      ui.Label({
        value: 'Visualizador de Blooms',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label({
        value: 'versión beta1',
        style: {color: 'grey', fontSize: '10px',margin:'0 auto'}
      }),
      ui.Label('Esta aplicación permite visualizar imágenes ' +
               'de varios satélites aplicados al análisis ' +
               'de floraciones algales.')
    ])
  };
  app.graphPanel = ui.Panel([],'flow');
  app.activatePoligonos = function(active){
    if(active){
      var capa = ui.Map.Layer(app.poligonos);
      capa.setVisParams({color:'grey'})
      capa.setName('poligonos')
      var capa1 = ui.Map.Layer(app.poligonos);
      capa1.setVisParams({color:'grey'})
      capa1.setName('poligonos')
      app.leftMap.layers().set(1, capa);
      app.rightMap.layers().set(1, capa1);
    }else{
      var names = []
      var namesr = []
      app.leftMap.layers().forEach(function(lay) {
        var lay_name = lay.getName()
        names.push(lay_name)
      })
      app.rightMap.layers().forEach(function(lay) {
        var lay_name = lay.getName()
        namesr.push(lay_name)
      })
      var index = names.indexOf('poligonos')
      var layer = app.leftMap.layers().get(index)
      app.leftMap.layers().remove(layer);
      var indexr = namesr.indexOf('poligonos')
      var layerr = app.rightMap.layers().get(indexr)
      app.rightMap.layers().remove(layerr);
    }
  }
  app.monitoreo = ui.Panel({
                      widgets:[
                        ui.Label('procesando...'),
                        ui.Checkbox('Ver polígonos (click para ver nombre)', false, app.activatePoligonos),
                        ui.Button({
                          label:'Cerrar',
                          onClick: function(){app.monitoreo.style().set('shown',false)}, 
                          style:{position:'bottom-center',
                                 padding: 0,
                                 width: '300px',
                                 shown:true
                          }
                        }),
                        ui.Label('Si aparece el mensaje "Error generating chart...", vuelva a repetir el proceso hasta que aparezca el gráfico.')
                      ],
                      //layout:'flow',
                      style:{
                        position:'top-left',
                        width: '320px',
                        padding: 0,
                        shown:false
                      }});
  app.filters = {
    collectionSelect: ui.Select({
      items: departamentos_names,
      value: 'Río Negro',
      onChange: app.changeDepartamento
    }),
    zonaSelect: ui.Select({
      items: zona_names,
      value: 'Palmar',
      onChange: app.changeZona
    }),
    sateliteSelect: ui.Select({
      items: satelites_names,
      value: 'Sentinel 2',
      onChange: app.changeSatelites
    }),
    visualizacionSelect: ui.Select({
      items: visualizacion_names,
      value: 'Probabilidad de Bloom (solo bloom)',
      onChange: app.changeVisualizacion
    }),
    selectMapa: ui.Select({
      items: mapas_names,
      value: 'Izquierda',
    }),
    selectImagenes: ui.Select({
      //items: app.lista_defecto(),
      placeholder: 'Selecconar imagen...'
    }),
    selectStretch: ui.Select({
      items: ['No','Si'],
      value: 'No',
    }),
    applyButton: ui.Button({
      label: 'Visualizar imágenes',
      onClick: app.applyFilters,
      disabled: false,
    }),
    mostrarButton: ui.Button({
      label:'Mostrar',
      onClick: app.mostrar, 
      style:{position:'top-left',
             padding: 0,
             shown:false
      }
    }),
    loading: ui.Label({
      value: 'Cargando (puede demorar)...',
      style: { margin: '8px 0 -3px 8px',
               color: 'gray',
               stretch: 'horizontal',
               shown: false
      }
    })
  };
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Seleccione un departamento', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Departamentos:', app.HELPER_TEXT_STYLE), app.filters.collectionSelect
      ]),
      ui.Label('2) Seleccione zona', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Zona:', app.HELPER_TEXT_STYLE), app.filters.zonaSelect
      ]),
      ui.Label('3) Seleccione un satelite', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Satelites:', app.HELPER_TEXT_STYLE), app.filters.sateliteSelect
      ]),
      ui.Label('4) Seleccione una imagen (nubes <= '+app.nubes+'%)', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Imágenes:', app.HELPER_TEXT_STYLE), app.filters.selectImagenes
      ]),
      ui.Label('5) Seleccione visualización', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Visualización:', app.HELPER_TEXT_STYLE), app.filters.visualizacionSelect
      ]),
      ui.Label('6) Seleccione filtros y parámetros de visualización', {fontWeight: 'bold'}), 
      app.HorizontalPanel([
        ui.Label('Mapa', app.HELPER_TEXT_STYLE), app.filters.selectMapa  
      ]),
      app.HorizontalPanel([
        ui.Label('Auto stretch (consume tiempo)', app.HELPER_TEXT_STYLE), app.filters.selectStretch  
      ]),
      app.HorizontalPanel([
        app.filters.applyButton,
        app.filters.loading
      ]),
      app.graphPanel
    ],
    style: app.SECTION_STYLE
  });
};
app.createHelpers = function() {
  app.HorizontalPanel = function(widget_list) {
    return ui.Panel({
        widgets: widget_list,
        layout: ui.Panel.Layout.flow('horizontal')
      });
  };
  app.VerticalPanel = function(widget_list){
    return ui.Panel({
      widgets:widget_list,
      layout: ui.Panel.Layout.flow('vertical')
    });
  };
  app.ocultar = function(){
    app.main.style().set('shown',false);
    app.filters.mostrarButton.style().set('shown',true);
  };
  app.mostrar = function(){
    app.main.style().set('shown',true);
    app.filters.mostrarButton.style().set('shown',false);
  };
  app.getmax = function(feature){
    var image = ee.ImageCollection('COPERNICUS/S2')
                  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",ee.Number(app.nubes))
                  .filterBounds(feature.geometry())
                  .sort('system:time_start', false)
                  .first();
    var ndci = image.normalizedDifference(['B5','B4']).rename('ndci');
    var ndci_max = ndci.select("ndci").reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: feature.geometry(),
      scale: 10,
      maxPixels:1e9
    });
    var date = image.date().format()
    var nombre = ee.String(feature.get('Name')).cat(' - ').cat(date.slice(0,-9))
    return feature.set('ndci', ndci_max.get('ndci')).set('fecha', date).set('nombre',nombre)
  }
  app.correctandfix = function(imagen){
    imagen = app.correcciones.s2correctionForMap(imagen)
    return app.fixedBloomEvaluation(imagen)
  }
  app.getprob = function(feature){
    var imagen = ee.ImageCollection('COPERNICUS/S2')
                  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",ee.Number(app.nubes))
                  .filterBounds(feature.geometry())
                  .sort('system:time_start', false)
                  .first();
    var id = imagen.get('PRODUCT_ID');
    var prob = ee.Image();
    ee.Algorithms.If(app.monitorCollection.contains(id),
      prob = ee.Image(app.monitorCollection.get(id))
    ,
      prob = app.correctandfix(imagen)
    )  
    app.monitorCollection.set(id,prob)
    var prob_max = prob.select("bloom").reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: feature.geometry(),
      scale: 10,
      maxPixels:1e9
    });
    var date = imagen.date().format()
    var nombre = ee.String(feature.get('Name')).cat(' - ').cat(date.slice(0,-9))
    return feature.set('bloom', prob_max.get('bloom')).set('fecha', date).set('nombre',nombre)
  }
  app.ejecutar_proceso = function(){
    var quehago = false;
    quehago = confirm('Estas por comenzar un proceso de evaluación a nivel de todo el País. Esto puede tardar bastante tiempo e incluso llegar a colgar el navegador. ¿Estás seguro que quieres ejecutarlo?');
    if(quehago){
      app.monitoreo.style().set('shown',true);
      var fieldStats_list = app.poligonos.map(app.getprob);
      var chart = ui.Chart.feature.byFeature(fieldStats_list, 'nombre', ['bloom'])
      chart.setChartType('ColumnChart')
      var options = {
        title: 'Valor medio de abundancia relativa para los lugares monitoreados',
        vAxis: {
          title: 'Media de la abundancia relativa de bloom (el resto de las categorías no se grafican)',
          viewWindowMode: 'explicit',
          viewWindow: {
              max: 1,
              min: 0,
              interval: 0.1,
          }
        },
        legend: {position:'none'},
        hAxis: {
          title: 'Lugar y fecha'
        }
      };
      chart.setOptions(options)
      app.monitoreo.widgets().set(0,chart);
    }
  };
  app.refreshView = function(departamento,zona) {
    var view = app.configs.DEPARTAMENTOS[departamento].puntos[zona]; 
    app.leftMap.setCenter(view.longitud, view.latitud, view.zoom);
  };
  app.makeLegendRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 10px 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
  };
  app.makeColorBarParams = function(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '200x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
  app.createLegend = function(visparams,panelposition) {
    var sateliteOption = app.filters.sateliteSelect.getValue();
    var visualizacionOption = app.filters.visualizacionSelect.getValue();
    var visOption = app.configs.VISUALIZACION[sateliteOption].vis_options[visualizacionOption]
    var legend = ui.Panel({
      style: {
        position: panelposition,
        padding: '8px 15px'
      }
    })
    // Create legend title
    /*var legendTitle = ui.Label({
      value: visualizacionOption,
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
        }
    });*/
     // Add the title to the panel
    /*legend.add(legendTitle); */
    if(visOption.tipo == 'indice'){
      // Create the color bar for the legend.
      var colorBar = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: app.makeColorBarParams(visparams.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // add the thumbnail to the legend
      legend.add(colorBar);
      // create text on top of legend
      if(visOption.leyenda.length == 0 ){
        var legendLabels = ui.Panel({
          widgets: [
            ui.Label(visparams.min, {margin: '4px 8px'}),
            ui.Label(
                (visparams.max / 2),
                {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
            ui.Label(visparams.max, {margin: '4px 8px'})
          ],
          layout: ui.Panel.Layout.flow('horizontal')
        });
      }else{
        var legendLabels = ui.Panel({
          widgets: [
            ui.Label(visOption.leyenda[0], {margin: '4px 8px'}),
            ui.Label(
                (visOption.leyenda[1]),
                {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
            ui.Label(visOption.leyenda[2], {margin: '4px 8px'})
          ],
          layout: ui.Panel.Layout.flow('horizontal')
        });
      }
      legend.add(legendLabels);
    }else if(visOption.tipo == 'bandas'){
      if(visualizacionOption == 'Probabilidad de Bloom (bloom+solidos suspendidos)'){
        var palette =['FF0000', '22ff00', '1500ff'];
        var names = ['Sedimento + Nubes','Bloom','Agua'];
        for (var i = 0; i < 3; i++) {
          legend.add(app.makeLegendRow(palette[i], names[i]));
        }  
      }else{
        legend = null
      }
    }
    return legend
  }
  app.fixedBloomEvaluation = function(img){
    var full_training = img.select(['B3','B4','B5']);
    var full_constrained = full_training.unmix([[0.02274828, 0.029988068, 0.025465318], [0.026215678, 0.014511124, 0.034505127], [0.010306696, 0.011498137, 0.011136904]], true, true);
    full_constrained = full_constrained.rename(['sedimento', 'bloom', 'agua']);
    return full_constrained.set('system:time_start',img.get('system:time_start'));
  }
  app.probabilidadBloom = function(img){
    var zona = app.filters.zonaSelect.getValue();
    var departamento = app.filters.collectionSelect.getValue();
    var satelite = app.filters.sateliteSelect.getValue();
    var f = img.get('system:index').getInfo();
    f = f.substr(0,8);
    var mes = parseInt(f.substr(4,2));
    var full_training = img.select(['B3','B4','B5']);
    var full_constrained = full_training.unmix([app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].sedimento, app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].bloom, app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].agua], true, true);
    full_constrained = full_constrained.rename(['sedimento', 'bloom', 'agua']);
    return full_constrained.set('system:time_start',img.get('system:time_start'));
  }
  app.probabilidadBloomS3 = function(img){
    var zona = app.filters.zonaSelect.getValue();
    var departamento = app.filters.collectionSelect.getValue();
    var satelite = app.filters.sateliteSelect.getValue();
    var f = img.get('system:index').getInfo();
    f = f.substr(4,12);
    var mes = parseInt(f.substr(4,2));
    var full_training = img.select(['Oa11_radiance','Oa07_radiance','Oa06_radiance']);
    var full_constrained = full_training.unmix([app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].sedimento, app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].bloom, app.configs.DEPARTAMENTOS[departamento].puntos[zona].entrenamiento[satelite][mes].agua], true, true);
    full_constrained = full_constrained.rename(['sedimento', 'bloom', 'agua']);
    return full_constrained.set('system:time_start',img.get('system:time_start'));
  }
  app.mapBloom = function(img){
    var full_training = img.select(['B3','B4','B5']);
    var full_constrained = full_training.unmix([app.configs.DEPARTAMENTOS[app.departamento].puntos[app.zona].entrenamiento[app.satelite][app.mes].sedimento, app.configs.DEPARTAMENTOS[app.departamento].puntos[app.zona].entrenamiento[app.satelite][app.mes].bloom, app.configs.DEPARTAMENTOS[app.departamento].puntos[app.zona].entrenamiento[app.satelite][app.mes].agua], true, true);
    full_constrained = full_constrained.rename(['sedimento', 'bloom', 'agua']);
    return full_constrained.set('system:time_start',img.get('system:time_start'));
  };
  app.modisToCelcius = function(img){
    var renimg = img.rename('temperatura')
    var celcius = renimg.expression('(temp * 0.02) - 273.15',{
      temp: renimg.select('temperatura')
    });
    return ee.Image(celcius.copyProperties(img)).set('system:time_start', img.get('system:time_start'));
  }
  app.hycomToCelcius = function(img){
    var renimg = img.rename('temperatura');  
    var celcius = renimg.multiply(0.001).add(20);
    return ee.Image(celcius.copyProperties(img)).set('system:time_start', img.get('system:time_start'));
  }
  app.get_temperatura = function(fecha){
    var full_series_temperatura_a = ee.ImageCollection('MODIS/006/MYD11A1').filterDate(app.getStartDate(fecha), app.getEndDate(fecha));
    var sst_a = full_series_temperatura_a.select('LST_Day_1km');
    sst_a = sst_a.map(app.modisToCelcius);
    var full_series_temperatura_b = ee.ImageCollection('HYCOM/sea_temp_salinity').filterDate(app.getStartDate(fecha), app.getEndDate(fecha));
    var sst_b = full_series_temperatura_b.select('water_temp_0');
    sst_b = sst_b.map(app.hycomToCelcius);
    return sst_a.merge(sst_b);
  }
  app.divide1000 = function(img){
    return img.divide(1000).rename('salinidad').set('system:time_start',img.get('system:time_start'));
  }
  app.get_salinidad = function(fecha){
    var full_series_salinidad = ee.ImageCollection('HYCOM/sea_temp_salinity').filterDate(app.getStartDate(fecha), app.getEndDate(fecha));
    var seaWatersalinity = full_series_salinidad.select('salinity_0');
    seaWatersalinity = seaWatersalinity.map(app.divide1000);
    return seaWatersalinity;
  }
  app.getFiltered = function() {
    var ds_name = app.filters.sateliteSelect.getValue();
    var vi_name = app.filters.zonaSelect.getValue();
    var de_name = app.filters.collectionSelect.getValue();
    var sateliteOption = app.filters.sateliteSelect.getValue();
    if (ds_name) {
      app.active_collection = app.configs.COLLECTIONS[ds_name];
      var centro = ee.Geometry.Point(app.configs.DEPARTAMENTOS[de_name].puntos[vi_name].longitud, app.configs.DEPARTAMENTOS[de_name].puntos[vi_name].latitud);
      var filtered = null;
      if(sateliteOption == 'Sentinel 3'){
        filtered = app.active_collection.base_collection
                        .filterBounds(centro)
                        .filterDate(app.getStartDate(),app.getEndDate())
                        .sort('system:time_start',false)
      }else{
        filtered = app.active_collection.base_collection
                        .filterBounds(centro)
                        .filterDate(app.getYearBefore(),app.getEndDate())
                        .sort('system:time_start',false)
      }
      if(sateliteOption == 'Landsat 8'){
        filtered = filtered.filterMetadata("CLOUD_COVER","less_than",ee.Number(app.nubes));
      }
      if(sateliteOption == 'Sentinel 2'){
        filtered = filtered.filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",ee.Number(app.nubes));
      }
      //filtered = filtered.sort('system:time_start',false);
      return filtered;
    }
  };
  app.cargarImagenes = function(filtered){
    if(filtered == null){
      filtered = app.getFiltered();
    }
    print(filtered)
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
      computedIds.evaluate(function(ids) {
        app.filters.selectImagenes.items().reset(ids);
        // Default the image picker to the first id.
        app.filters.selectImagenes.setValue(app.filters.selectImagenes.items().get(0));
      });
  };
  app.changeDepartamento = function(){
    var ds_name = app.filters.collectionSelect.getValue();
    app.filters.zonaSelect.items().reset(Object.keys(app.configs.DEPARTAMENTOS[ds_name].puntos));
    var item = app.filters.zonaSelect.items();
    app.filters.zonaSelect.setValue(item.get(0));
    app.changeZona();
    //app.cargarImagenes()
  };
  app.changeZona = function(){
    var ds_name = app.filters.collectionSelect.getValue();
    var vs_name = app.filters.zonaSelect.getValue();
    //print(vs_name);
    app.filters.sateliteSelect.items().reset(Object.keys(app.configs.DEPARTAMENTOS[ds_name].puntos[vs_name].entrenamiento));
    var item = app.filters.sateliteSelect.items();
    app.filters.sateliteSelect.setValue(item.get(0));
    //app.cargarImagenes();
    app.changeSatelites();
  };
  app.changeSatelites = function(){
    var sat_name = app.filters.sateliteSelect.getValue();
    app.filters.visualizacionSelect.items().reset(Object.keys(app.configs.MAP_PARAMS[sat_name].opciones));
    var item = app.filters.visualizacionSelect.items();
    app.filters.visualizacionSelect.setValue(item.get(0));
    app.cargarImagenes();
  };
  app.changeVisualizacion = function(){
    return true;
  }
  app.applyFilters = function() {
    if(app.filters.selectStretch.getValue() == 'Si'){
      alert('Stretch activado: Por favor sea paciente, el proceso puede tardar entre 30 y 40 segundos...');
    }
    app.refreshMapLayer();
  };
  app.addLayerSelector = function(mapToChange, mapaOption, imagen, vis_params) {
    var sateliteOption = app.filters.sateliteSelect.getValue();
    var zonaOption = app.filters.zonaSelect.getValue();
    var visualizacionOption = app.filters.visualizacionSelect.getValue();
    var fechaOption = app.filters.selectImagenes.getValue();
    if(sateliteOption == 'Landsat 8'){
      fechaOption = fechaOption.slice(-8)
    }else if(sateliteOption == 'Sentinel 3'){
      fechaOption = fechaOption.slice(4, 12)
    }else{
      fechaOption = fechaOption.slice(0, 8)
    }
    mapToChange.layers().set(0, ui.Map.Layer(imagen).setVisParams(vis_params));
    var label = mapToChange.widgets();
    if(mapaOption == 'Izquierda'){
      if(label.length() === 0){
        mapToChange.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-left'}));
        mapToChange.add(app.createLegend(vis_params,'bottom-left'));
      }else{
        label.reset();
        mapToChange.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-left'}));
        mapToChange.add(app.createLegend(vis_params,'bottom-left'));
      }
    }else{
      if(label.length() === 0){
        mapToChange.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-right'}));
        mapToChange.add(app.createLegend(vis_params,'bottom-right'));
      }else{
        label.reset();
        mapToChange.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-right'}));
        mapToChange.add(app.createLegend(vis_params,'bottom-right'));
      }
    }
  }
  app.refreshMapLayer = function() {
    var mapaOption = app.filters.selectMapa.getValue();
    var zonaOption = app.filters.zonaSelect.getValue();
    var ds_name = app.filters.collectionSelect.getValue();
    var sateliteOption = app.filters.sateliteSelect.getValue();
    var visualizacionOption = app.filters.visualizacionSelect.getValue();
    var imagenOption = app.filters.selectImagenes.getValue();
    app.refreshView(ds_name,zonaOption)
    var imagen = ee.Image(app.configs.COLLECTIONS[sateliteOption].nombre + '/' + imagenOption);
    if(sateliteOption == 'Sentinel 2'){
      if(visualizacionOption != 'Color Real (B4/B3/B2)' && visualizacionOption != 'Color Infrarrojo (B8/B4/B3)'){
        imagen = app.correcciones.s2correction(imagen,app.getStartDate(),app.getEndDate());
      }
    }
    var mascara_landsat = app.funciones.waterMask();
    imagen = imagen.updateMask(mascara_landsat);
    var stretch = app.filters.selectStretch.getValue();
    app.collGeom = imagen.geometry();
    if(sateliteOption == 'Sentinel 2'){
      //collection = collection.map(app.funciones.filtroNubesSentinel);
      if(visualizacionOption  === 'NDVI (NormDif B8, B4)'){
        imagen = app.funciones.ndviSentinel(imagen);
      }
      if(visualizacionOption === 'Probabilidad de Bloom (bloom+solidos suspendidos)' || visualizacionOption === 'Probabilidad de Bloom (solo bloom)'){
        imagen = app.probabilidadBloom(imagen);
      }
      if(visualizacionOption == 'Clorofila (NormDif B3,B4,B5)'){
        imagen = app.funciones.clorofilaTriple(imagen);
      }
      if(visualizacionOption == 'NDCI - (NormDif B5,B4)'){
        imagen = app.funciones.ndciSentinel(imagen);
      }
      if(visualizacionOption == 'NDCI ajustado - Mishra (NormDif B5,B4)'){
        imagen = app.funciones.ndciSentinelPoly(imagen);
      }
    }else if(sateliteOption == 'Sentinel 3'){
      if(visualizacionOption === 'Probabilidad de Bloom (bloom+solidos suspendidos)' || visualizacionOption === 'Probabilidad de Bloom (solo bloom)'){
        imagen = app.probabilidadBloomS3(imagen);
      }
    } else if(sateliteOption == 'Landsat 8'){
      //collection = collection.map(app.funciones.filtroNubesLandsat);  
      if(visualizacionOption  === 'NDVI (NormDif B5, B4)'){
        imagen = app.funciones.ndviLandsat(imagen);
      }
      if(visualizacionOption  === 'Clorofila A'){
        imagen = app.funciones.clorofilaALandsat(imagen);
      }
    }
    if (imagen) { 
      var bandnames = imagen.bandNames();
      var visOption = app.configs.VISUALIZACION[sateliteOption].vis_options[visualizacionOption].opciones['median'].visParams;
      if(stretch == 'Si'){
        var bandas_img = visOption.bands.split(',');
        var mapa = app.MAPAS[mapaOption].description;
        var nuevo = app.funciones.stretcher2(imagen,mapa.getBounds(true));
        var t = nuevo.get('stats');
        if(bandas_img.length == 3){
          visOption.min = ee.List([ee.Dictionary(t).get(bandas_img[0]+'_p5'), ee.Dictionary(t).get(bandas_img[1]+'_p5'), ee.Dictionary(t).get(bandas_img[2]+'_p5')]).reduce(ee.Reducer.mean()).getInfo();
          visOption.max = ee.List([ee.Dictionary(t).get(bandas_img[0]+'_p95'), ee.Dictionary(t).get(bandas_img[1]+'_p95'), ee.Dictionary(t).get(bandas_img[2]+'_p95')]).reduce(ee.Reducer.mean()).getInfo();
        }
      }
      app.addLayerSelector(app.MAPAS[mapaOption].description,mapaOption,imagen,visOption);
    }
  };
  app.getData = function(coord){
    app.zona = app.filters.zonaSelect.getValue();
    app.departamento = app.filters.collectionSelect.getValue();
    app.satelite = app.filters.sateliteSelect.getValue();
    var f = app.getEndDate();
    app.mes = parseInt(f.substr(5,2));
    var full_series = ee.ImageCollection('COPERNICUS/S2')
                    .filterDate(app.getStartDate(), app.getEndDate()) 
                    .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",ee.Number(app.nubes))
                    .filterBounds(coord)
                    .sort('system:time_start',false);
    full_series = full_series.map(app.correcciones.s2correctionForMap);
    //full_series = full_series.map(app.correcciones.CSFFilter); 
    var bloom_sd = full_series.map(app.mapBloom);
    var temperatura = app.get_temperatura();
    var salinidad = app.get_salinidad();
    var mix = temperatura.merge(salinidad);
    var bloomTimeSeries = ui.Chart.image.series(
      bloom_sd, coord.buffer(20), ee.Reducer.mean())
          .setChartType('ScatterChart')
          //.setSeriesNames(['sedimento','bloom','agua'])
          .setOptions({
            title: 'Probabilidad media de que el pixel corresponda a la categoría (buffer 20mts radio)',
            vAxis: {title: 'Probabilidad'},
            lineWidth: 1,
            pointSize: 4,
            series:{
              0: {color: '0057e7'}, 
              1: {color: '008744'}, 
              2: {color: 'd62d20'},
              3: {color: '0087e2'}
            }
    });
    var mixSeries = ui.Chart.image.series(
      mix, coord.buffer(300), ee.Reducer.mean(), 50)
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Temperatura y Salinidad superficial estimadas',
            vAxis: {title: 'Temperatura °C - Salinidad psu/1000'},
            lineWidth: 1,
            pointSize: 4,
            series:{
              0: {color: '008744'}, 
              1: {color: 'd62d20'}
            }
    });
    app.graphPanel.clear();
    app.graphPanel.insert(0,bloomTimeSeries);
    app.graphPanel.insert(1,mixSeries);
    var pols = app.poligonos.filterBounds(coord);
    var pol = ee.Algorithms.If(ee.Number(pols.size()).gt(0),ee.Feature(pols.first()),ee.Feature(coord, {'Name':'No hay monitoreo automático sobre el punto seleccionado.'}))
    app.monitoreo.widgets().set(4,ui.Label('Polígono monitoreado:', {fontWeight: 'bold'}));
    app.monitoreo.widgets().set(5,ui.Label('Buscando...'));
    pol.evaluate(function(s,f){
      var nombre_poligono = ee.Feature(s).get('Name');
      print(nombre_poligono)
      app.monitoreo.widgets().set(5,ui.Label(nombre_poligono.getInfo()));
    })
  };
};
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  app.cargarImagenes();
  app.main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  app.leftMap.add(app.filters.mostrarButton);
  var splitPanel = ui.SplitPanel({
    firstPanel: app.leftMap,
    secondPanel: app.rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().reset();
  ui.root.insert(0,app.main);
  ui.root.insert(1,splitPanel);
  ui.root.insert(2,app.monitoreo);
  var linker = ui.Map.Linker([app.leftMap, app.rightMap]);
  app.leftMap.setCenter(app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].longitud, app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].latitud, app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].zoom);
};
app.boot();