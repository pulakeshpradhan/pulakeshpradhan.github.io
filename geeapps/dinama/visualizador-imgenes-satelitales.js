var app = {}; 
app.funciones = require('users/dinama/eetools:funciones_interesantes/aquafunc');
/** Crear constantes */
app.createConstants = function() {
  app.leftMap = ui.Map();
  app.leftMap.setOptions('HYBRID');
  /*el segundo parametro es el control para las capas*/
  app.leftMap.setControlVisibility(false,true,false,false,false,false);
  app.rightMap = ui.Map();
  app.rightMap.setOptions('HYBRID');
  /*el segundo parametro es el control para las capas*/
  app.rightMap.setControlVisibility(false,true,false,false,false,false);
  app.collGeom = null;
  //app.fechaLimite = app.funciones.getLastWeek();
  app.fechaLimite = app.funciones.getLast3Month();
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
  app.COLLECTIONS = {
    'Sentinel 2': {
      base_collection: ee.ImageCollection('COPERNICUS/S2_SR'),
    },
    'Landsat 8': {
      base_collection: ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'),
    },
    'Sentinel 1 - SAR GRD': {
      base_collection: ee.ImageCollection('COPERNICUS/S1_GRD'),
    }
  };
  app.VISUALIZACION = {
    'Sentinel 2':{
      vis_options: {
        'Color Real (B4/B3/B2)':{
          opciones: {
            'min': {
              visParams: {bands: 'B4,B3,B2', min:0, max:5000}
            },
            'median': {
              visParams: {bands: 'B4,B3,B2', min:380, max:5000}
            },
            'max': {
              visParams: {bands: 'B4,B3,B2', min:0, max:10}
            }
          }
        },
        'Tierra/Agua (B8/B11/B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'B8,B11,B4', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B8,B11,B4', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B8,B11,B4', min:0, max:10}
            }
          }
        },
        'Color Infrarrojo (B8/B4/B3)':{
          opciones:{
            'min': {
              visParams: {bands: 'B8,B4,B3', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B8,B4,B3', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B8,B4,B3', min:0, max:10}
            }
          }
        },
        'Vegetacion (B12/B11/B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'B12,B12,B4', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B12,B12,B4', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B12,B12,B4', min:0, max:10}
            }
          }
        },
        'NDVI (NormDif B8, B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            },
            'median': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            },
            'max': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            }
          }
        }
      }
    },
    'Landsat 8':{
      vis_options: {
        'Color Real (B4/B3/B2)':{
          opciones: {
            'min': {
              visParams: {bands: 'B4,B3,B2', min:0, max:5000}
            },
            'median': {
              visParams: {bands: 'B4,B3,B2', min:380, max:5000}
            },
            'max': {
              visParams: {bands: 'B4,B3,B2', min:0, max:10}
            }
          }
        },
        'Tierra/Agua (B5/B6/B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'B5,B6,B4', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B5,B6,B4', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B5,B6,B4', min:0, max:10}
            }
          }
        },
        'Color Infrarrojo (B5/B4/B3)':{
          opciones:{
            'min': {
              visParams: {bands: 'B5,B4,B3', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B5,B4,B3', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B5,B4,B3', min:0, max:10}
            }
          }
        },
        'Vegetacion (B7/B7/B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'B7,B7,B4', min:0, max:3000}
            },
            'median': {
              visParams: {bands: 'B7,B7,B4', min:0, max:3000}
            },
            'max': {
              visParams: {bands: 'B7,B7,B4', min:0, max:10}
            }
          }
        },
        'NDVI (NormDif B5, B4)':{
          opciones:{
            'min': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            },
            'median': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            },
            'max': {
              visParams: {bands: 'ndvi', min:0, max:1, palette:['blue','green','red']}
            }
          }
        },
        'Clorofila A':{
          opciones:{
            'min': {
              visParams: {bands: 'clorofila', min:0.5, max:25, palette:['blue','green','yellow','orange','red','#8b0000','#580000','#3f0000']}
            },
            'median': {
              visParams: {bands: 'clorofila', min:0.5, max:25, palette:['blue','green','yellow','orange','red','#8b0000','#580000','#3f0000']}
            },
            'max': {
              visParams: {bands: 'clorofila', min:0.5, max:25, palette:['blue','green','yellow','orange','red','#8b0000','#580000','#3f0000']}
            }
          }
        }
      }
    },
    'Sentinel 1 - SAR GRD':{
      vis_options: {
        'Radar Single co-polarization VV':{
          opciones: {
            'min': {
              visParams: {bands: 'VV', min:-30, max:0}
            },
            'median': {
              visParams: {bands: 'VV', min:-30, max:0}
            },
            'max': {
              visParams: {bands: 'VV', min:-30, max:0}
            }
          }
        }
      }
    }
  };
  app.MAP_PARAMS = {
    'Sentinel 2':{
      opciones:{
        'Color Real (B4/B3/B2)':'Color Real (B4/B3/B2)',
        'Tierra/Agua (B8/B11/B4)':'Tierra/Agua (B8/B11/B4)',
        'Color Infrarrojo (B8/B4/B3)':'Color Infrarrojo (B8/B4/B3)',
        'Vegetacion (B12/B11/B4)':'Vegetacion (B12/B11/B4)',
        'NDVI (NormDif B8, B4)':'NDVI (NormDif B8, B4)'
      }
    },
    'Landsat 8':{
      opciones:{
        'Color Real (B4/B3/B2)':'Color Real (B4/B3/B2)',
        'Tierra/Agua (B5/B6/B4)':'Tierra/Agua (B5/B6/B4)',
        'Color Infrarrojo (B5/B4/B3)':'Color Infrarrojo (B5/B4/B3)',
        'Vegetacion (B7/B7/B4)':'Vegetacion (B7/B7/B4)',
        'NDVI (NormDif B5, B4)':'NDVI (NormDif B5, B4)', 
        'Clorofila A':'Clorofila A'
      }
    },
    'Sentinel 1 - SAR GRD':{
      opciones:{
        'Radar Single co-polarization VV':'Radar Single co-polarization VV'
      }
    }
  };
  app.VIEWS = {
    'Rincón del Bonete': {
      lon: -56.413062757534306,
      lat: -32.8203358202547,
      zoom: 14,
      description: 'Embalse de la represa de Rincón del Bonete, '
        + 'sobre el Río Negro.'
    },
    'Baygorria': {
      lon: -56.80350655941419,
      lat: -32.86722377007929,
      zoom: 15,
      description: 'Embalse de la represa de Baygorria, '
        + 'sobre el Río Negro.'
    },
    'Palmar': {
      lon: -57.44434692103533,
      lat: -33.06747267376291,
      zoom: 14,
      description: 'Embalse de la represa de Palmar, '
        + 'sobre el Río Negro.'
    },
    'Laguna del Sauce': {
      lon: -55.05661025474018,
      lat: -34.81840244190304,
      zoom: 13,
      description: 'La Laguna del Sauce está ubicada en Uruguay, dentro del departamento de Maldonado. '
        + 'Se encuentra aproximadamente a unos 15 km de Punta del Este.' 
    },
    'Laguna de Rocha': {
      lon: -54.28825393149799,
      lat: -34.628777475116316,
      zoom: 12,
      description: 'La laguna de Rocha es un extenso espejo de agua de escasa profundidad '
        +'separado del mar por una barrera arenosa, ubicado en el departamento de Rocha.'
    }
  };
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      color: 'gray',
      stretch: 'horizontal'
  };
  app.WATER_MASK = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').neq(1);
};
app.createPanels = function() {
  var collection_names = Object.keys(app.COLLECTIONS);
  var mapas_names = Object.keys(app.MAPAS);
  var visualizacion_names = Object.keys(app.MAP_PARAMS['Sentinel 2'].opciones);
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Explorador de imágenes satelitales',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label({
        value: 'versión alpha',
        style: {color: 'grey', fontSize: '10px',margin:'0 auto'}
      }),
      ui.Label('Esta aplicación permite filtrar imágenes ' +
               'de varias grandes colecciones ' +
               'de satélites.')
    ])
  };
  app.filters = {
    collectionSelect: ui.Select({
      items: collection_names,
      value: 'Sentinel 2',
      onChange: app.changeVisualizaciones
    }),
    visualizacionSelect: ui.Select({
      items: visualizacion_names,
      value: 'Color Real (B4/B3/B2)'
    }),
    cloudPerSelect: ui.Select({
      items: ['5','10','15','20','25','30','35','45','45','50','55','60','65','70','75','80','85','90','95','100'],
      value: '30'
    }),
    startDate: ui.DateSlider({
        start: '1960-01-01',
        end: app.funciones.getToday(),
        value: app.fechaLimite,
        onChange: app.refreshDate,
        style: {width: '96%'}
    }),
    endDate: ui.DateSlider({
        start: app.fechaLimite,
        end: app.funciones.getToday(),
        value: app.funciones.getToday(),
        style: {width: '96%'}
    }),
    selectReducer: ui.Select({
      items: ['min', 'median', 'max'],
      value: 'median',
    }),
    selectMapa: ui.Select({
      items: mapas_names,
      value: 'Izquierda',
    }),
    selectStretch: ui.Select({
      items: ['No','Si'],
      value: 'No',
    }),
    visMin: ui.Textbox({
      style: {width: '50px'}
    }),
    visMax: ui.Textbox({
      style: {width: '50px'}
    }),
    selectMask: ui.Select({
      items: ['sin mascara', 'mascara tierra', 'mascara agua'],
      value: 'sin mascara',
    }),
    applyButton: ui.Button({
      label: 'Aplicar filtros',
      onClick: app.applyFilters,
      disabled: false,
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
  app.views = {
    selectView: ui.Select({
      items: Object.keys(app.VIEWS),
      placeholder: 'Selecccione una vista...', 
      onChange: app.refreshView
    }),
    labelView: ui.Label('')
  };
  app.views.panel = ui.Panel({
    widgets: [
      ui.Label('4) Seleccione una vista predefinida', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Lista de vistas:', app.HELPER_TEXT_STYLE), app.views.selectView
      ]),
      app.views.labelView
    ],
    style: app.SECTION_STYLE
  });
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Seleccione una colección', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Colecciones:', app.HELPER_TEXT_STYLE), app.filters.collectionSelect
      ]),
      ui.Label('2) Seleccione visualización', {fontWeight: 'bold'}),
      app.HorizontalPanel([
        ui.Label('Visualización:', app.HELPER_TEXT_STYLE), app.filters.visualizacionSelect
      ]),
      ui.Label('3) Seleccione filtros y parámetros de visualización', {fontWeight: 'bold'}), 
      ui.Label('Período:', app.HELPER_TEXT_STYLE),
      ui.Label('Desde:', app.HELPER_TEXT_STYLE),
      app.filters.startDate,
      ui.Label('Hasta:', app.HELPER_TEXT_STYLE),
      app.filters.endDate,
      app.HorizontalPanel([
        ui.Label('Reductor:', app.HELPER_TEXT_STYLE), app.filters.selectReducer
      ]),
      app.HorizontalPanel([
        ui.Label('Porcentaje de nubes menor a:', app.HELPER_TEXT_STYLE), app.filters.cloudPerSelect
      ]),
      app.HorizontalPanel([
        ui.Label('Lista de máscaras:', app.HELPER_TEXT_STYLE), app.filters.selectMask
      ]),
      app.HorizontalPanel([
        ui.Label('Mapa', app.HELPER_TEXT_STYLE), app.filters.selectMapa  
      ]),
      app.HorizontalPanel([
        ui.Label('Auto stretch (consume tiempo)', app.HELPER_TEXT_STYLE), app.filters.selectStretch  
      ]),
      app.HorizontalPanel([
        app.filters.applyButton,
        app.filters.loading
      ])
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
  app.refreshDate = function(r){
    var ini = app.filters.startDate.getValue();
    app.fechaLimite = ini[1];
    app.filters.endDate.setStart(app.fechaLimite);
  }
  app.getFiltered = function() {
    var ds_name = app.filters.collectionSelect.getValue();
    if (ds_name) {
      app.active_collection = app.COLLECTIONS[ds_name];
      var filtered = app.active_collection.base_collection.filterBounds(app.BOUNDS);
      var nubes = app.filters.cloudPerSelect.getValue();
      if(ds_name == 'Landsat 8'){
        filtered = filtered.filterMetadata("CLOUD_COVER","less_than",ee.Number.parse(nubes));
      }
      if(ds_name == 'Sentinel 2'){
        filtered = filtered.filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",ee.Number.parse(nubes));
      }
      if(ds_name == 'Sentinel 1 - SAR GRD'){
        filtered = filtered.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV');
      }
      var start = app.filters.startDate.getValue();
      start = ee.Date(start[1]);
      var end = app.filters.endDate.getValue();
      end = ee.Date(end[1]);
      filtered = filtered.filterDate(start, end);
      return filtered;
    }
  };
  app.changeVisualizaciones = function(){
    var ds_name = app.filters.collectionSelect.getValue();
    app.filters.visualizacionSelect.items().reset(Object.keys(app.MAP_PARAMS[ds_name].opciones));
    var item = app.filters.visualizacionSelect.items();
    app.filters.visualizacionSelect.setValue(item.get(0));
  }
  app.applyFilters = function() {
    if(app.filters.selectStretch.getValue() == 'Si'){
      alert('Stretch activado: Por favor sea paciente, el proceso puede tardar entre 30 y 40 segundos...');
    }
    app.refreshMapLayer();
  };
  app.addLayerSelector = function(mapToChange, mapaOption, imagen, vis_params) {
      var ds_name = app.filters.collectionSelect.getValue();
      var visualizacionOption = app.filters.visualizacionSelect.getValue();
      mapToChange.layers().set(0, ui.Map.Layer(imagen).setVisParams(vis_params));
      var label = mapToChange.widgets();
      if(mapaOption == 'Izquierda'){
        if(label.length() === 0){
          mapToChange.add(ui.Label(ds_name+' '+visualizacionOption,{position:'bottom-left'}));
        }else{
          label.reset();
          mapToChange.add(ui.Label(ds_name+' '+visualizacionOption,{position:'bottom-left'}));
        }
      }else{
        if(label.length() === 0){
          mapToChange.add(ui.Label(ds_name+' '+visualizacionOption,{position:'bottom-right'}));
        }else{
          label.reset();
          mapToChange.add(ui.Label(ds_name+' '+visualizacionOption,{position:'bottom-right'}));
        }
      }
  }
  app.refreshMapLayer = function() {
    var reducerOption = app.filters.selectReducer.getValue();
    var mapaOption = app.filters.selectMapa.getValue();
    var visualizacionOption = app.filters.visualizacionSelect.getValue();
    var ds_name = app.filters.collectionSelect.getValue();
    var collection = app.getFiltered();
    var masking = app.filters.selectMask.getValue();
    var stretch = app.filters.selectStretch.getValue();
    app.collGeom = collection.geometry();
    if(ds_name == 'Sentinel 2'){
      collection = collection.map(app.funciones.filtroNubesSentinel);
      if(visualizacionOption  === 'NDVI (NormDif B8, B4)'){
        collection = collection.map(app.funciones.ndviSentinel);
      }
    }else if(ds_name == 'Landsat 8'){
      collection = collection.map(app.funciones.filtroNubesLandsat); 
      if(visualizacionOption  === 'NDVI (NormDif B5, B4)'){
        collection = collection.map(app.funciones.ndviLandsat);
      }
      if(visualizacionOption  === 'Clorofila A'){
        collection = collection.map(app.funciones.clorofilaALandsat);
      }
    }
    if (collection) {
      var bandnames = ee.Image(collection.first()).bandNames();
      var reduced_image = collection.reduce(reducerOption).rename(bandnames);
      var visOption = app.VISUALIZACION[ds_name].vis_options[visualizacionOption].opciones[reducerOption].visParams;
      /*CALCULO EN FUNCION DE MEDIA Y DESVIO*/
      /*var s = app.funciones.stretch_std(reduced_image, app.collGeom);
      var bandas_img = visOption.bands.split(',');
      if(bandas_img.length == 3){
        visOption.min = ee.List([s.vmin[bandas_img[0]], s.vmin[bandas_img[1]], s.vmin[bandas_img[2]]]).reduce(ee.Reducer.mean()).getInfo();
        visOption.max = ee.List([s.vmax[bandas_img[0]], s.vmax[bandas_img[1]], s.vmax[bandas_img[2]]]).reduce(ee.Reducer.mean()).getInfo();
      }*/
      /*CALCULO EN FUNCION DE PERCENTILES 95 Y 5*/
      if(stretch == 'Si'){
        var bandas_img = visOption.bands.split(',');
        var mapa = app.MAPAS[mapaOption].description;
        var nuevo = app.funciones.stretcher(reduced_image,mapa.getBounds(true));
        var t = nuevo.get('stats');
        if(bandas_img.length == 3){
          visOption.min = ee.List([ee.Dictionary(t).get(bandas_img[0]+'_p5'), ee.Dictionary(t).get(bandas_img[1]+'_p5'), ee.Dictionary(t).get(bandas_img[2]+'_p5')]).reduce(ee.Reducer.mean()).getInfo();
          visOption.max = ee.List([ee.Dictionary(t).get(bandas_img[0]+'_p95'), ee.Dictionary(t).get(bandas_img[1]+'_p95'), ee.Dictionary(t).get(bandas_img[2]+'_p95')]).reduce(ee.Reducer.mean()).getInfo();
        }
      }
      if (masking == 'mascara agua') {
        reduced_image = reduced_image.updateMask(app.WATER_MASK);
      } else if (masking == 'mascara tierra') {
        reduced_image = reduced_image.updateMask(app.WATER_MASK.not());
      }
      app.addLayerSelector(app.MAPAS[mapaOption].description,mapaOption,reduced_image,visOption);
    }
  };
  app.refreshView = function() {
    var view = app.VIEWS[app.views.selectView.getValue()];
    app.leftMap.setCenter(view.lon, view.lat, view.zoom);
    app.views.labelView.setValue(view.description);
    app.refreshMapLayer();
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
      app.views.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  var splitPanel = ui.SplitPanel({
    firstPanel: app.leftMap,
    secondPanel: app.rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().reset();
  ui.root.insert(0,main);
  ui.root.insert(1,splitPanel);
  var linker = ui.Map.Linker([app.leftMap, app.rightMap]);
  app.leftMap.setCenter(-56.207721732467696, -32.71766050719053, 10);
};
app.boot();