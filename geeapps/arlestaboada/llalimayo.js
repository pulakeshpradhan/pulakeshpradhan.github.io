var app={
};
var bounds=ee.Geometry.Polygon([[
    [-70.92477679973058,-15.024033678888417],
    [-70.92477679973058,-15.22024258030936],
    [-70.75448871379308,-15.209641344027293],
  ]])
var Llalimayo=ee.FeatureCollection('users/arlestaboada/Llalimayo')
var cuenca_pucara=ee.FeatureCollection('users/arlestaboada/Cuenca_alto_Pucara').geometry();
var BD_ANA=ee.FeatureCollection('users/arlestaboada/BD_ANA_LLALLIMAYO_integrado')
var centro_poblado=ee.FeatureCollection('users/arlestaboada/centro_poblado').filterBounds(cuenca_pucara)
var ICfilter;
var ndwi;
var mascara_sst;
var selectYr;
var contador=0;
var contador_poblado=0;
var yr;
var imageId 
var image;
var slope;
var srtm;
srtm=ee.Image('USGS/SRTMGL1_003').clip(cuenca_pucara);
slope = ee.Terrain.slope(srtm);
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Llalimayo ',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación te permite filtrar y exportar imágenes, ' +
               'de la colección Landsat .')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
     selectYr: ui.Textbox({placeholder: 'Year',  value: '2018',style: {width: '100px'}}),
    applyButton: ui.Button('Aplicar filtro', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'red', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Coloque el año ', {fontWeight: 'bold'}),
      ui.Label('Desde 1984', app.HELPER_TEXT_STYLE), app.filters.selectYr,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
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
  app.clasificacion={
     btnClasificar: ui.Button('Aplicar filtro', app.aplicarClasificacion),
  }
  app.clasificacion.panel=ui.Panel({
    widgets: [
      ui.Label('4) Clasificación de cobertura', {fontWeight: 'bold'}),
      app.clasificacion.btnClasificar,
    ],
    style: app.SECTION_STYLE
  });
   app.inspector={
     lon :ui.Label(),
     lat :ui.Label(),
     cp:ui.Label('', {fontWeight: 'bold'}),
     ncp:ui.Label(),
     ndis:ui.Label(),
     nprov:ui.Label(),
     ndep:ui.Label(),
   }
  app.inspector.panel=ui.Panel({
    widgets: [
      ui.Label('5) Inspector', {fontWeight: 'bold'}),
      ui.Label('Haga clic en un punto en el mapa para inspeccionar.'),
      app.inspector.lon,
      app.inspector.lat,
      app.inspector.cp,
      app.inspector.ncp,
      app.inspector.ndis,
      app.inspector.nprov,
      app.inspector.ndep,
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
   app.applyFilters = function() {
    //app.setLoadingMode(true);
   if(contador!==0){
         anio_anterior= selectYr;
     }
    // Filtrar variables
    selectYr = app.filters. selectYr.getValue();
    contador++;
    if (selectYr) year = ee.Number.parse(selectYr);
    if(year>= anio_1984){
    var IC = ee.Algorithms.If(
                year.eq(ee.Number(2012)),ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA'),
                ee.Algorithms.If(year.gt(ee.Number(2012)),
                    ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'),
                    ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')));
    } else if(selectYr<anio_1984){
        alert('EL año debe ser mayor o igual a 1984.');
        selectYr=anio_anterior;
        return;
    }               
     ICfilter = ee.ImageCollection(IC)
                        .filterBounds(bounds)
                        .filter(ee.Filter.dayOfYear(1,365))
                      .filter(ee.Filter.calendarRange(year,year,'year'))
                     .filterMetadata('CLOUD_COVER','Less_than',21);
       if(ICfilter.size().getInfo()===0){
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
    // Get the list of computed ids.
    var computedIds =  ICfilter
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
   app.makeLegend=function(color,name){
    var colorBox=ui.Label({
      style:{
        backgroundColor:'#'+color,
        padding:'8px',
        margin:'0 0 4px 0'
      }
    })
    var description=ui.Label({
      value:name,
      style:{margin:'0 0 4px 6 px'}
    })
    return ui.Panel(
      {
        widgets:[colorBox,description],
        layout:ui.Panel.Layout.flow('horizontal')
      }
    )
  }
   app.refreshMapLayer = function() {
    Map.clear();
     Map.centerObject(bounds,10);
    if(contador_poblado!==0){
       app.inspector.cp.setValue('')
       app.inspector.ncp.setValue('')
       app.inspector.ndis.setValue('')
       app.inspector.nprov.setValue('')
       app.inspector.ndep.setValue('')
    }
    Map.onClick( function(coords){
      app.inspector.lon.setValue('longitud: ' + coords.lon.toFixed(6));
      app.inspector.lat.setValue('latitud: ' + coords.lat.toFixed(6));
      var circulo_interes=ee.Geometry.Point(ee.Number.parse(coords.lon.toFixed(3)),ee.Number.parse(coords.lat.toFixed(3))).buffer(100)
       var cp=centro_poblado.filterBounds(circulo_interes).limit(1);
       if(cp.size().getInfo()>0){
         var cp_first=cp.first();
        Map.addLayer(circulo_interes,{color: 'FF0000'},'Punto de interes');
          app.inspector.cp.setValue('Centro Poblado'),
          app.inspector.ncp.setValue('Nombre: '+cp_first.get('NOMCP').getInfo()),
          app.inspector.ndis.setValue('Distrito: '+cp_first.get('DIST').getInfo()),
          app.inspector.nprov.setValue('Provincia: '+cp_first.get('PROV').getInfo()),
          app.inspector.ndep.setValue('Departamento: '+cp_first.get('DEP').getInfo()),
          contador_poblado++
       }else{
          app.inspector.cp.setValue(''),
          app.inspector.ncp.setValue(''),
          app.inspector.ndis.setValue('')
          app.inspector.nprov.setValue('')
          app.inspector.ndep.setValue('')
         alert('La coordenada no tiene un centro poblado.Acerca mas a un punto del mapa para saber que poblado es. ')
       }
   } )
    var opcion_vis=app.VIS_OPTIONS[app.vis.select.getValue()];
    var COLLECTION_ID;
    var visParams;
    var visParams_I;
    var visParams_N;
    var menor_2012;
    var mayor_2012;
    var swir_1;
    var inundado_encharcado;
    var mascara_inundado_encharcado;
    var mosaic;
    var anio_2012=ee.Number.parse('2012');
    yr= selectYr;
    if(yr) yr=ee.Number.parse(yr);
    imageId = app.picker.select.getValue();
    //slope
    if (imageId) {
       if(yr>anio_2012){
        COLLECTION_ID='LANDSAT/LC08/C01/T1_TOA';
       if(opcion_vis.valor===0){
           visParams={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
         }else if(opcion_vis.valor===1){
             visParams={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']}
         } else if(opcion_vis.valor===2){
            visParams_I={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']}
            mayor_2012=true;
         }else if(opcion_vis.valor===3){
           visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
            mayor_2012=true;
         }
      }else if(yr<anio_2012){
          COLLECTION_ID='LANDSAT/LT05/C01/T1_TOA'
           if(opcion_vis.valor===0){
           visParams={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
         }else if(opcion_vis.valor===1){
             visParams={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
         } else if(opcion_vis.valor===2){
            visParams_I={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
            menor_2012=true;
         }else if(opcion_vis.valor===3){
            visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
            menor_2012=true;
         }
      }else if(yr.eq(anio_2012)){
          COLLECTION_ID='LANDSAT/LE07/C01/T1_TOA'
           visParams={min:0.0241,max: 0.141,gamma:1,opacity:1,bands:['B3','B2','B1']}
        }
      // If an image id is found, create an image.
      image = ee.Image(COLLECTION_ID + '/' + imageId).clip(cuenca_pucara);
     var date_ad= ee.Date(image.get('system:time_start')).format("dd-MM-YYYY    HH:mm:ss");
     app.picker.fecha_ad.setValue(date_ad.getInfo())
      if(opcion_vis.valor<2){
         Map.addLayer(image,visParams, imageId);
      }else if( opcion_vis.valor===2){
        if(menor_2012){
            swir_1=image.select('B5') ;
            inundado_encharcado=swir_1.lt(0.145).and(slope.lt(10));
            mascara_inundado_encharcado=inundado_encharcado.updateMask(inundado_encharcado);
           mosaic = ee.ImageCollection([
           mascara_inundado_encharcado.visualize({palette: ['0000ff']}),
          ]).mosaic();
          Map.addLayer(image,visParams_I, imageId);
          Map.addLayer(mosaic,{}, 'Presencia de agua');
        }else if(mayor_2012){
           swir_1=image.select('B6') ;
           inundado_encharcado=swir_1.lte(0.145).and(slope.lt(10));
           mascara_inundado_encharcado=inundado_encharcado.updateMask(inundado_encharcado);
           mosaic = ee.ImageCollection([
           mascara_inundado_encharcado.visualize({palette: ['0000ff']}),
          ]).mosaic();
          Map.addLayer(image,visParams_I, imageId);
          Map.addLayer(mosaic,{}, 'Presencia de agua');
        }
      }else if(opcion_vis.valor===3){
          if(menor_2012){
             var B3_B1= image.expression(
               '(RED/BLUE)', {
                'RED': image.select('B3'),
                'BLUE': image.select('B1'),
            });
            ndwi = image.normalizedDifference(['B2', 'B4']);
             mascara_sst=  B3_B1.updateMask( B3_B1.gte(0).and(ndwi.gt(0)));
            mosaic = ee.ImageCollection([
            mascara_sst.visualize({min:0,max:1,palette:[ 'b2ffff',"0000ff",'ffff00',"ff0000"]})
            ]).mosaic();
             Map.addLayer(image,visParams_N, imageId);
             Map.addLayer(mosaic,{}, 'Turbidez del agua');
        }else if( mayor_2012){
           var B4_B2= image.expression(
          '(RED/BLUE)', {
          'RED': image.select('B4'),
          'BLUE': image.select('B2'),
          });
        ndwi = image.normalizedDifference(['B3', 'B5']);
        mascara_sst=  B4_B2.updateMask( B4_B2.gte(0).and(ndwi.gt(0)));
        mosaic = ee.ImageCollection([
            mascara_sst.visualize({min:0,max:1,palette:[ 'b2ffff',"0000ff",'ffff00',"ff0000"]})
            ]).mosaic();
             Map.addLayer(image,visParams_N, imageId);
             Map.addLayer(mosaic,{}, 'Turbidez del agua');
        }
        var legend=ui.Panel({
          style: app.LEGEND_STYLE
        })
        var legendTitle=ui.Label({
          value:'Leyenda de Turbidez del Agua',
          style:app.LEGEND_TITLE_STYLE
        })
        legend.add(legendTitle)
        var palette=['ff0000','ffff00','0000ff']
        var names=['Agua con alta turbidez','Agua con baja turbidez','Agua clara']
        for(var i=0;i<3;i++){
          legend.add(app.makeLegend(palette[i],names[i]))
        }
        Map.add(legend)
       }else if(opcion_vis.valor===4){
          visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
          Map.addLayer(image,visParams_N, imageId);
           Map.addLayer(srtm,{min:3800,max:5000,palette:[ '008000',"0000ff",'ffff00',"ff0000"]},'Altura')
           //
        var legend_alt=ui.Panel({
          style: app.LEGEND_STYLE
        })
        var legendTitle_alt=ui.Label({
          value:'Leyenda de Altura',
          style:app.LEGEND_TITLE_STYLE
        })
        legend_alt.add(legendTitle_alt)
        var palette_alt=['ff0000','ffff00','0000ff','008000']
        var names_alt=['4700-5000','4400-4700','4100-4400','3800-4100']
        for(var j=0;j<4;j++){
          legend_alt.add(app.makeLegend(palette_alt[j],names_alt[j]))
        }
        Map.add(legend_alt)
        //
       }
        Map.addLayer(Llalimayo,{},'Llalimayo',false)
           Map.addLayer(centro_poblado,{},'centros poblados')
        Map.addLayer(BD_ANA,{},'Base de datos ana',false)
    }
  };
  app.aplicarClasificacion=function(){
     var ndvi;
    var ndwi;
    var ndii;
    var ndsi;
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
    var addNDVI;
    var addNDWI;
    var addNDII;
    var addNDSI;
    var ndviViz_alto = {min: 0.43, max: 1, palette: ['ffff40', 'ffff00']};
    var ndviViz_medio = {min: 0, max: 0.43, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0, max: 1, palette: [ '0000FF']};
    if(yr.getInfo()>2012){
      Map.clear()
       addNDVI = function(imagen) {
        var ndvi = imagen.normalizedDifference(['B5', 'B4']).rename('NDVI');
        return imagen.addBands(ndvi);
      };
      addNDWI = function(imagen) {
        var ndwi = imagen.normalizedDifference(['B3', 'B5']).rename('NDWI');
       return image.addBands(ndwi);
      };
     addNDII = function(imagen) {
        var ndii = imagen.normalizedDifference(['B5', 'B7']).rename('NDII');
        return image.addBands(ndii);
     };
    addNDSI = function(image) {
      var ndsi = image.normalizedDifference(['B7', 'B5']).rename('NDSI');
      return image.addBands(ndsi);
    };
      //indices espectrales
       ndvi = addNDVI(image).select('NDVI');
       ndwi = addNDWI(image).select('NDWI');
      ndii=addNDII(image).select('NDII');
      ndsi=addNDSI (image).select('NDSI');
      //clases
      agua=ndwi.gt(0);
      vegetacion_ndvi_alto=ndvi.gte(0.43);
      vegetacion_ndvi_medio=ndvi.gt(0.2).and(ndvi.lt(0.43));
      suelo=ndvi.gte(0).and(ndvi.lt(0.2)).and(ndwi.lt(0)).and(ndsi.gte(-0.3));
      suelo_2=ndvi.gte(-1).and(ndvi.lte(0.2)).and(ndwi.lte(0));
      //mascara
      mascara_agua= agua.updateMask(agua).and(slope.lt(10));
      mascara_vegetacion_ndvi_alto= vegetacion_ndvi_alto.updateMask(vegetacion_ndvi_alto);
       mascara_vegetacion_ndvi_medio=vegetacion_ndvi_medio.updateMask(vegetacion_ndvi_medio);
      mascara_suelo=suelo.updateMask(suelo);
      mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
      //mosaico
       mosaic = ee.ImageCollection([
      // vegetaccion
         mascara_vegetacion_ndvi_medio.visualize(ndviViz_medio),
         mascara_vegetacion_ndvi_alto.visualize(ndviViz_alto),
     // agua
        mascara_agua.visualize(ndwiViz),
        //suelo
        mascara_suelo.visualize({palette: ['804000']}),
        mascara_suelo_2.visualize({palette: ['AAAAAA']}),
        ]).mosaic();
     visParams_N={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
    }else if(yr.getInfo()<2012){
       Map.clear()
       addNDVI = function(imagen) {
        var ndvi = imagen.normalizedDifference(['B4', 'B3']).rename('NDVI');
        return imagen.addBands(ndvi);
      };
     addNDWI = function(imagen) {
        var ndwi = imagen.normalizedDifference(['B2', 'B4']).rename('NDWI');
       return image.addBands(ndwi);
      };
      addNDII = function(imagen) {
        var ndii = imagen.normalizedDifference(['B4', 'B7']).rename('NDII');
        return image.addBands(ndii);
     };
     addNDSI = function(image) {
      var ndsi = image.normalizedDifference(['B7', 'B4']).rename('NDSI');
      return image.addBands(ndsi);
    };
      //indices espectrales
       ndvi = addNDVI(image).select('NDVI');
       ndwi = addNDWI(image).select('NDWI');
      ndii=addNDII(image).select('NDII');
      ndsi=addNDSI (image).select('NDSI');
      //clases
      agua=ndwi.gt(0);
      vegetacion_ndvi_alto=ndvi.gte(0.43);
      vegetacion_ndvi_medio=ndvi.gt(0.2).and(ndvi.lt(0.43));
      suelo=ndvi.gte(0).and(ndvi.lt(0.2)).and(ndwi.lt(0)).and(ndsi.gte(-0.3));
      suelo_2=ndvi.gte(-1).and(ndvi.lte(0.2)).and(ndwi.lte(0));
      //mascara
      mascara_agua= agua.updateMask(agua).and(slope.lt(10));
      mascara_vegetacion_ndvi_alto= vegetacion_ndvi_alto.updateMask(vegetacion_ndvi_alto);
       mascara_vegetacion_ndvi_medio=vegetacion_ndvi_medio.updateMask(vegetacion_ndvi_medio);
      mascara_suelo=suelo.updateMask(suelo);
      mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
      //mosaico
       mosaic = ee.ImageCollection([
      // vegetaccion
         mascara_vegetacion_ndvi_medio.visualize(ndviViz_medio),
         mascara_vegetacion_ndvi_alto.visualize(ndviViz_alto),
     // agua
        mascara_agua.visualize(ndwiViz),
        //suelo
        mascara_suelo.visualize({palette: ['804000']}),
        mascara_suelo_2.visualize({palette: ['AAAAAA']}),
        ]).mosaic();
     visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
    }
    Map.addLayer(image,visParams_N, imageId);
    Map.addLayer(mosaic,{},'Mosaico')
    var legend=ui.Panel({
          style: app.LEGEND_STYLE
        })
        var legendTitle=ui.Label({
          value:'Leyenda de cobertura',
          style:app.LEGEND_TITLE_STYLE
        })
        legend.add(legendTitle)
        var palette=['00FF00','ffff00','0000ff','804000','AAAAAA']
        var names=['Vegetacion ','Vegetacion vigorosa y densa','Cuerpo de agua, Sombra de nube',
                  'Suelo desnudo o con escasa vegetación, Nube','Suelo desnudo, Roca']
        for(var i=0;i<5;i++){
          legend.add(app.makeLegend(palette[i],names[i]))
        }
        Map.add(legend)
      Map.addLayer(Llalimayo,{},'Llalimayo')
      Map.addLayer(BD_ANA,{},'Base de datos ana',false)
  }
};
///crear constantes
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.LEGEND_STYLE={position:'bottom-left',padding:'8px 15px'}
  app.LEGEND_TITLE_STYLE={
            fontWeight:'bold',
            fontSize:'18 px',
            margin:'0 0 4px 0',
            padding:'0'
          }
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 20;
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
                   'o del terreno puede malinterpretarse como agua en la superficie',
      valor:2,
      },
      'Turbidez del agua':{
        description:'Es útil para ver el grado de transparencia que pierde el agua por la presencia de'+
                    ' particulas en suspensión.Las nubes pueden malinterpretarse como agua turbia.',
        valor:3,
      },
      'Altura':{
        description:'Es útil para ver la altura del terreno'+
                    ' .',
        valor:4,
      }
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
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.clasificacion.panel,
      app.inspector.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
   ui.root.insert(0, main);
  app.applyFilters();
  Map.centerObject(cuenca_pucara);
  Map.style().set('cursor', 'crosshair');
};
app.boot();