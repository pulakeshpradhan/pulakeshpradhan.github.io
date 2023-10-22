var app = {}; 
app.funciones = require('users/dinama/eetools:2019/algas/monitoreo/aquafunc'); 
app.configs = require('users/dinama/eetools:2019/algas/monitoreo/visu_config_dummie');
app.correcciones = require('users/dinama/eetools:2019/algas/monitoreo/funciones'); 
app.poligonos = ee.FeatureCollection("users/dinama/puntos_monitoreo_clorofila");  
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
  app.onlyMap = ui.Map()
  app.onlyMap.setOptions('HYBRID');
  app.onlyMap.setControlVisibility(false,true,false,false,false,false);
  app.collGeom = null;
  app.BOUNDS = ee.Geometry.Polygon(
        [[[-59.555017085129464, -29.697609522669897],
          [-59.555017085129464, -36.71247925939704],
          [-51.710778803879464, -36.71247925939704],
          [-51.710778803879464, -29.697609522669897]]]); 
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
    newdate.setMonth(newdate.getMonth() - 1); 
  }else{
    var parts = fecha.split('-'); 
    newdate = new Date(parts[0], parts[1] - 1, parts[2]); 
    newdate.setMonth(newdate.getMonth() - 1);
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
      ui.Label('5) Seleccione visualización', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Visualización:', app.HELPER_TEXT_STYLE), app.filters.visualizacionSelect
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
  app.refreshView = function(departamento,zona) {
    var view = app.configs.DEPARTAMENTOS[departamento].puntos[zona]; 
    app.onlyMap.setCenter(view.longitud, view.latitud, view.zoom);
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
  app.changeDepartamento = function(){
    var ds_name = app.filters.collectionSelect.getValue();
    app.filters.zonaSelect.items().reset(Object.keys(app.configs.DEPARTAMENTOS[ds_name].puntos));
    var item = app.filters.zonaSelect.items();
    app.filters.zonaSelect.setValue(item.get(0));
    app.changeZona();
  };
  app.changeZona = function(){
    var ds_name = app.filters.collectionSelect.getValue();
    var vs_name = app.filters.zonaSelect.getValue();
    //print(vs_name);
    app.filters.sateliteSelect.items().reset(Object.keys(app.configs.DEPARTAMENTOS[ds_name].puntos[vs_name].entrenamiento));
    var item = app.filters.sateliteSelect.items();
    app.filters.sateliteSelect.setValue(item.get(0));
    app.changeSatelites();
  };
  app.changeSatelites = function(){
    var sat_name = app.filters.sateliteSelect.getValue();
    app.filters.visualizacionSelect.items().reset(Object.keys(app.configs.MAP_PARAMS[sat_name].opciones));
    var item = app.filters.visualizacionSelect.items();
    app.filters.visualizacionSelect.setValue(item.get(0));
  };
  app.changeVisualizacion = function(){
    return true;
  }
  app.applyFilters = function() {
    app.refreshMapLayer();
  };
  app.addLayerSelector = function(imagen, vis_params) {
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
    app.onlyMap.layers().set(0, ui.Map.Layer(imagen).setVisParams(vis_params));
    var label = app.onlyMap.widgets();
    if(label.length() === 0){
      app.onlyMap.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-right'}));
      app.onlyMap.add(app.createLegend(vis_params,'bottom-right'));
    }else{
      label.reset();
      app.onlyMap.add(ui.Label(sateliteOption+' - '+zonaOption+' - '+visualizacionOption+' - '+fechaOption,{position:'bottom-right'}));
      app.onlyMap.add(app.createLegend(vis_params,'bottom-right'));
    }
  }
  app.refreshMapLayer = function() {
    var zonaOption = app.filters.zonaSelect.getValue();
    var ds_name = app.filters.collectionSelect.getValue();
    var sateliteOption = app.filters.sateliteSelect.getValue();
    var visualizacionOption = app.filters.visualizacionSelect.getValue();
    app.refreshView(ds_name,zonaOption)
    var i_col = ee.ImageCollection(app.configs.COLLECTIONS[sateliteOption].nombre)
                          .filterDate(app.getStartDate(),app.getEndDate())
                          .sort('system:time_start',false);
    var imagen = i_col.first();
    print('veo imagen')
    print(imagen)
    if(sateliteOption == 'Sentinel 2'){
      if(visualizacionOption != 'Color Real (B4/B3/B2)' && visualizacionOption != 'Color Infrarrojo (B8/B4/B3)'){
        imagen = app.correcciones.s2correction(imagen,app.getStartDate(),app.getEndDate());
      }
    }
    var mascara_landsat = app.funciones.waterMask();
    imagen = imagen.updateMask(mascara_landsat);
    app.collGeom = imagen.geometry();
    if(sateliteOption == 'Sentinel 2'){
      if(visualizacionOption === 'Probabilidad de Bloom (solo bloom)'){
        imagen = app.probabilidadBloom(imagen);
      }
    }else if(sateliteOption == 'Sentinel 3'){
      if(visualizacionOption === 'Probabilidad de Bloom (solo bloom)'){
        imagen = app.probabilidadBloomS3(imagen);
      }
    } else if(sateliteOption == 'Landsat 8'){
      if(visualizacionOption  === 'Clorofila A'){
        imagen = app.funciones.clorofilaALandsat(imagen);
      }
    }
    if (imagen) { 
      var bandnames = imagen.bandNames();
      var visOption = app.configs.VISUALIZACION[sateliteOption].vis_options[visualizacionOption].opciones['median'].visParams;
      app.addLayerSelector(imagen,visOption);
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
    var bloom_sd = full_series.map(app.mapBloom);
    var temperatura = app.get_temperatura();
    var salinidad = app.get_salinidad();
    var mix = temperatura.merge(salinidad);
    var bloomTimeSeries = ui.Chart.image.series(
      bloom_sd, coord.buffer(20), ee.Reducer.mean())
          .setChartType('ScatterChart')
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
            title: 'Temperatura y Salinidad superficial',
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
  app.main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  app.onlyMap.add(app.filters.mostrarButton);
  ui.root.widgets().reset();
  ui.root.insert(0,app.main);
  ui.root.insert(1,app.onlyMap);
  app.onlyMap.setCenter(app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].longitud, app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].latitud, app.configs.DEPARTAMENTOS['Río Negro'].puntos['Palmar'].zoom);
};
app.boot();