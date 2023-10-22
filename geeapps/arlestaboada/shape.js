var app={};
 var recorte=ee.Geometry.Polygon([[
    [-76.27932038348422,-10.90156368794812],
    [-76.28756012957797,-10.932577753444415],
    [-76.0911795143436,-11.149584935659231],
    [-75.96826996844516,-11.08557777689444],
    [-76.07675995867953,-10.896843872546953]
  ]])
  var bounds=ee.Geometry.Point([-76.4444, -11.7644]);
//cuenca
var curicocha=ee.FeatureCollection('users/arlestaboada/curicocha').geometry();
var llamacocha=ee.FeatureCollection('users/arlestaboada/llamacocha').geometry();
var Ortho_Bofedal_Curicocha_10cm=ee.Image('users/arlestaboada/Ortho_Bofedal_Curicocha_10cm');
var Ortho_Llamacocha_10cm=ee.Image('users/arlestaboada/Ortho_Llamacocha_10cm');
var Ortophoto_Curicocha_JPEG=ee.Image('users/arlestaboada/Ortophoto_Curicocha_JPEG');
var ortho_llamacocha_II_15cm=ee.Image('users/arlestaboada/ortho_llamacocha_II_15cm');
//reserva nacional de junin
var reserva_nacional_junin = ee.FeatureCollection('users/arlestaboada/reserva_nacional_de_junin');
var area_de_interes=reserva_nacional_junin.geometry();
 //var styles = require('users/arlestaboada/estilos:Modules/style.js');
 var btnStyles={backgroundColor:'#1883ba',border:'2px solid #0016b0'};
var ICfilter;
var ndwi;
var mascara_sst;
var selectYr;
var contador=0;
var cont_refresh=0;
var image;
var yr;
var imageId ;
var slope;
var srtm;
var computedIds;
//slope
srtm=ee.Image('USGS/SRTMGL1_003');
slope = ee.Terrain.slope(srtm);
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Curicocha-llamacocha',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación te permite filtrar imágenes, ' +
               'de la colección Landsat .')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
     selectYr: ui.Textbox({placeholder: 'Year',  value: '2018',style: {width: '100px'}}),
    applyButton: ui.Button('Aplicar filtro', app.applyFilters,{},btnStyles),
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
   app.clasificacionReserva={
     btnClasificarReserva: ui.Button('Aplicar filtro', app.aplicarClasificacionReserva,{},btnStyles),
    descripcion:  ui.Label('', {fontWeight: 'bold'}),
    vegetacion: ui.Label(),
    bofedal: ui.Label(),
    agua: ui.Label(),
    suelo:ui.Label(),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'red', shown: false}
    })
  }
  app.clasificacionReserva.panel=ui.Panel({
    widgets: [
      ui.Label('5) Clasificación de cobertura en la Reserva Nacional de Junín', {fontWeight: 'bold'}),
      ui.Label('Para una mejor clasificación del bofedal la fecha indicada es en los meses de junio a setiembre los que presentan un volumen mínimo de lluvias'),
       ui.Panel([
         app.clasificacionReserva.btnClasificarReserva,
        app.clasificacionReserva.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
      app.clasificacionReserva.descripcion,
      app.clasificacionReserva.vegetacion,
      app.clasificacionReserva.bofedal,
      app.clasificacionReserva.agua,
      app.clasificacionReserva.suelo,
    ],
    style: app.SECTION_STYLE
  });
};
//crear funciones 
app.createHelpers = function() {
  app.setLoadingMode = function(enabled) {
     app.filters.loadingLabel.style().set('shown', enabled);
     var loadDependentWidgets = [
      app.vis.select,
      app.filters.selectYr,
      app.filters.applyButton,
     // app.filters.mapCenter,
      app.picker.select,
      app.clasificacion.btnClasificar,
      app.clasificacionReserva.btnClasificarReserva,
     // app.picker.centerButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  }
   app.setLoadingModeReserva = function(enabled) {
     app.clasificacionReserva.loadingLabel.style().set('shown', enabled);
     var loadDependentWidgets = [
      app.vis.select,
      app.filters.selectYr,
      app.filters.applyButton,
     // app.filters.mapCenter,
      app.picker.select,
      app.clasificacion.btnClasificar,
      app.clasificacionReserva.btnClasificarReserva,
     // app.picker.centerButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  }
  var year;
  var anio_anterior;
  /** Applies the selection filters currently selected in the UI. */
   app.applyFilters = function() {
    app.setLoadingMode(true);
   if(contador!==0){
         anio_anterior= selectYr;
     }
    // Filtrar variables
    selectYr = app.filters. selectYr.getValue();
    contador++;
    if (selectYr) year = ee.Number.parse(selectYr);
    if(year.getInfo()>= 1984){
    var IC = ee.Algorithms.If(
                year.eq(ee.Number(2012)),ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA'),
                ee.Algorithms.If(year.gt(ee.Number(2012)),
                    ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'),
                    ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')));
    } else if(year.getInfo()<1984){
        app.setLoadingMode(false);
        alert('EL año debe ser mayor o igual a 1984.');
        selectYr=anio_anterior;
        return;
    }               
     ICfilter = ee.ImageCollection(IC)
                        .filterBounds(bounds)
                        .filter(ee.Filter.dayOfYear(1,365))
                      .filter(ee.Filter.calendarRange(year,year,'year'))
                     .filterMetadata('CLOUD_COVER','Less_than',20);
       if(ICfilter.size().getInfo()===0){
          app.setLoadingMode(false);
          alert('No hay imágenes disponible para este año. Ingresa otro año.');
          return;
        }
    // Get the list of computed ids.
     computedIds =  ICfilter
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
       app.setLoadingMode(false);
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
    Map.centerObject(bounds,11);
   if(cont_refresh!==0){
    app.clasificacionReserva.descripcion.setValue('')
     app.clasificacionReserva.vegetacion.setValue('')
    app.clasificacionReserva.bofedal.setValue('')
    app.clasificacionReserva.agua.setValue('')
    app.clasificacionReserva.suelo.setValue('')
   }
   cont_refresh++;
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
     imageId 
     yr= selectYr;
    if(yr) yr=ee.Number.parse(yr);
   imageId = app.picker.select.getValue();
    if (imageId) {
       if(yr.getInfo()>2012){
        COLLECTION_ID='LANDSAT/LC08/C01/T1_TOA';
       if(opcion_vis.valor===0){
           visParams={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
         }else if(opcion_vis.valor===1){
             visParams={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']}
         } else if(opcion_vis.valor===2){
            visParams_I={min:0,max:0.3,gamma:1.3,bands:['B5','B4','B3']}
            mayor_2012=true;
         }else if(opcion_vis.valor===3){
           visParams_N={min:0,max:0.3,gamma:1.3,bands:['B4','B3','B2']}
            mayor_2012=true;
         }
      }else if(yr.getInfo()<2012){
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
      }else if(yr.getInfo()==2012){
          COLLECTION_ID='LANDSAT/LE07/C01/T1_TOA'
           visParams={min:0.0241,max: 0.141,gamma:1,opacity:1,bands:['B3','B2','B1']}
        }
      // If an image id is found, create an image.
       image = ee.Image(COLLECTION_ID + '/' + imageId);
     var date_ad= ee.Date(image.get('system:time_start')).format("dd-MM-YYYY    HH:mm:ss");
     app.picker.fecha_ad.setValue(date_ad.getInfo())
      if(opcion_vis.valor<2){
          Map.addLayer(image.clip(curicocha),visParams, imageId);
          Map.addLayer(image.clip(llamacocha),visParams, imageId);
          Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
          Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
          Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
          Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
      }else if( opcion_vis.valor===2){
        if(menor_2012){
            swir_1=image.select('B5') ;
            inundado_encharcado=swir_1.lt(0.145).and(slope.lt(10));
            mascara_inundado_encharcado=inundado_encharcado.updateMask(inundado_encharcado);
           mosaic = ee.ImageCollection([
           mascara_inundado_encharcado.visualize({palette: ['0000ff']}),
          ]).mosaic();
         Map.addLayer(image.clip(curicocha),visParams, imageId);
         Map.addLayer(image.clip(llamacocha),visParams, imageId);
          Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
          Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
          Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
          Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
          Map.addLayer(mosaic.clip(curicocha),{}, 'Presencia de agua de curicocha');
          Map.addLayer(mosaic.clip(llamacocha),{}, 'Presencia de agua de llamacocha');
        }else if(mayor_2012){
           swir_1=image.select('B6') ;
           inundado_encharcado=swir_1.lte(0.145).and(slope.lt(10));
           mascara_inundado_encharcado=inundado_encharcado.updateMask(inundado_encharcado);
           mosaic = ee.ImageCollection([
           mascara_inundado_encharcado.visualize({palette: ['0000ff']}),
          ]).mosaic();
          Map.addLayer(image.clip(curicocha),visParams, imageId);
          Map.addLayer(image.clip(llamacocha),visParams, imageId);
          Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
          Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
          Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
          Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
          Map.addLayer(mosaic.clip(curicocha),{}, 'Presencia de agua de curicocha');
          Map.addLayer(mosaic.clip(llamacocha),{}, 'Presencia de agua de llamacocha');
        }
      }else if(opcion_vis.valor===3){
          if(menor_2012){
             var B3_B1= image.expression(
               '(RED/BLUE)', {
                'RED': image.select('B3'),
                'BLUE': image.select('B1'),
            });
            ndwi = image.normalizedDifference(['B2', 'B4']);
             mascara_sst=  B3_B1.updateMask( B3_B1.gte(0).and(ndwi.gt(0)).and(slope.lt(10)));
            mosaic = ee.ImageCollection([
            mascara_sst.visualize({min:0,max:1,palette:[ 'b2ffff',"0000ff",'ffff00',"ff0000"]})
            ]).mosaic();
             Map.addLayer(image.clip(curicocha),visParams, imageId);
             Map.addLayer(image.clip(llamacocha),visParams, imageId);
             Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
             Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
             Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
             Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
             Map.addLayer(mosaic.clip(curicocha),{}, 'Turbidez del agua de curicocha');
             Map.addLayer(mosaic.clip(llamacocha),{}, 'Turbidez del agua de llamacocha');
        }else if( mayor_2012){
           var B4_B2= image.expression(
          '(RED/BLUE)', {
          'RED': image.select('B4'),
          'BLUE': image.select('B2'),
          });
        ndwi = image.normalizedDifference(['B3', 'B5']);
        mascara_sst=  B4_B2.updateMask( B4_B2.gte(0).and(ndwi.gt(0)).and(slope.lt(10)));
        mosaic = ee.ImageCollection([
            mascara_sst.visualize({min:0,max:1,palette:[ 'b2ffff',"0000ff",'ffff00',"ff0000"]})
            ]).mosaic();
             Map.addLayer(image.clip(curicocha),visParams, imageId);
             Map.addLayer(image.clip(llamacocha),visParams, imageId);
             Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
             Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
             Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
             Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
             Map.addLayer(mosaic.clip(curicocha),{}, 'Turbidez del agua de curicocha');
             Map.addLayer(mosaic.clip(llamacocha),{}, 'Turbidez del agua de llamacocha');
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
       }
    }
  };
  //clasificar cobertura
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
    Map.addLayer(image.clip(curicocha),visParams_N, imageId);
    Map.addLayer(image.clip(llamacocha),visParams_N, imageId);
     Map.addLayer(mosaic.clip(curicocha),{},'Mosaico curicocha')
    Map.addLayer(mosaic.clip(llamacocha),{},'Mosaico llamacocha')
    Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
   Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
   Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
   Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");
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
  }
  //clasificar Reserva
 app.cargando=function(){
   print("joder")
 }
  app.aplicarClasificacionReserva= function(){
    app.setLoadingModeReserva(true);
   function despues(){
    var ndvi;
    var ndwi;
    var ndii;
    var ndsi;
    var agua;
    var bofedal;
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
    var addNDVI;
    var addNDWI;
    var addNDII;
    var addNDSI;
    var ndviViz_bofedales = {min: 0.43, max: 1, palette: ['ffff40', 'ffff00']};
    var ndviViz_pastizales = {min: 0, max: 0.43, palette: ['FF0000', '00FF00']};
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
      bofedal=ndvi.gt(0.43).and(ndvi.lte(0.899)).and(ndii.gte(0.02)).and(ndii.lte(0.76)).and(ndwi.gte(-0.8));
      vegetacion=ndvi.gt(0.2);
      suelo=ndvi.gte(0).and(ndvi.lt(0.2)).and(ndwi.lt(0)).and(ndsi.gte(-0.3));
      suelo_2=ndvi.gte(-1).and(ndvi.lte(0.2)).and(ndwi.lte(0));
      //mascara
      mascara_agua= agua.updateMask(agua).and(slope.lt(10));
      mascara_bofedal=  bofedal.updateMask( bofedal);
      mascara_vegetacion=vegetacion.updateMask(vegetacion.and(bofedal.not()));
      mascara_suelo=suelo.updateMask(suelo);
      mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
      //mosaico
       mosaic = ee.ImageCollection([
      // vegetaccion
        mascara_bofedal.visualize(ndviViz_bofedales),
        mascara_vegetacion.visualize(ndviViz_pastizales),
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
      bofedal=ndvi.gte(0.43).and(ndvi.lte(0.899)).and(ndii.gte(0.02)).and(ndii.lte(0.76)).and(ndwi.gte(-0.8));
      vegetacion=ndvi.gt(0.2);
      suelo=ndvi.gte(0).and(ndvi.lt(0.2)).and(ndwi.lt(0)).and(ndsi.gte(-0.3));
      suelo_2=ndvi.gte(-1).and(ndvi.lte(0.2)).and(ndwi.lte(0));
      //mascara
      mascara_agua= agua.updateMask(agua).and(slope.lt(10));
      mascara_bofedal=  bofedal.updateMask( bofedal);
      mascara_vegetacion=vegetacion.updateMask(vegetacion.and(bofedal.not()));
      mascara_suelo=suelo.updateMask(suelo);
      mascara_suelo_2=suelo_2.updateMask(suelo_2.and(suelo.not()));
      //mosaico
       mosaic = ee.ImageCollection([
      // vegetaccion
        mascara_bofedal.visualize(ndviViz_bofedales),
        mascara_vegetacion.visualize(ndviViz_pastizales),
     // agua
        mascara_agua.visualize(ndwiViz),
        //suelo
        mascara_suelo.visualize({palette: ['804000']}),
        mascara_suelo_2.visualize({palette: ['AAAAAA']}),
        ]).mosaic();
     visParams_N={min:0,max:0.3,gamma:1.3,bands:['B3','B2','B1']}
    }
      Map.addLayer(image.clip(area_de_interes),visParams_N, imageId);
      Map.addLayer(mosaic.clip(area_de_interes),{},'Mosaico')
      Map.addLayer(recorte,{},'Recorte',false)
    var legend=ui.Panel({
          style: app.LEGEND_STYLE
        })
        var legendTitle=ui.Label({
          value:'Leyenda de cobertura Reserva Nacional de Junín',
          style:app.LEGEND_TITLE_STYLE
        })
        legend.add(legendTitle)
        var palette=['00FF00','ffff00','0000ff','804000','AAAAAA']
        var names=['Vegetacion ','Bofedal','Cuerpo de agua, Sombra de nube',
                  'Suelo desnudo o con escasa vegetación, Nube','Suelo desnudo, Roca,Nube']
        for(var i=0;i<5;i++){
          legend.add(app.makeLegend(palette[i],names[i]))
        }
        Map.add(legend)
        //area de pixel
         var area = ee.Image.pixelArea().divide(1000000);
        //areas de cobertura
      var area_vegetacion = mascara_vegetacion.multiply(area).select([0],['vegetacion']);
      var area_agua=  mascara_agua.multiply(area).select([0],['agua']);
      var area_suelo=  mascara_suelo.multiply(area).select([0],['suelo']);
      var area_bofedal= mascara_bofedal.multiply(area).select([0],['bofedal']);
      var area_suelo_2=mascara_suelo_2.multiply(area).select([0],['suelo_2']);
       //reducir region
      var area_v = area_vegetacion.reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: area_de_interes,
      scale: 30,
      maxPixels:1e9
    })
    var area_a = area_agua.reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: area_de_interes,
      scale: 30,
      maxPixels:1e9
    })
    var area_s = area_suelo.reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: area_de_interes,
      scale: 30,
      maxPixels:1e9
    })
    var area_b = area_bofedal.reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: area_de_interes,
      scale: 30,
      maxPixels:1e9
    })
    var area_s2 = area_suelo_2.reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: area_de_interes,
      scale: 30,
      maxPixels:1e9
    })
     var suma_suelo=area_s.get('suelo').getInfo()+area_s2.get('suelo_2').getInfo()
    app.clasificacionReserva.descripcion.setValue('Cuantificación de la cobertura en Kilometros cuadrados');
    app.clasificacionReserva.vegetacion.setValue('Vegetación:'+area_v.get('vegetacion').getInfo())
    app.clasificacionReserva.bofedal.setValue('Bofedal:'+area_b.get('bofedal').getInfo())
    app.clasificacionReserva.agua.setValue('Agua:'+area_a.get('agua').getInfo())
    app.clasificacionReserva.suelo.setValue('Suelo:'+suma_suelo)
    var stop=area_a.get('agua');
    stop.evaluate(function(){
      app.setLoadingModeReserva(false);
    });
    }
    despues()
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
      }
  };
};
//bot
app.boot = function() {
   var button1 = ui.Button({
        style: {position: 'middle-left',shown:true},
        label: 'Mostrar panel',
        onClick: function() {
          // Hide the button.
         Map.remove( button1);
          // Display the panel.
          main.style().set('shown',true);
          //button.style().set('shown', true);
        }
    });
   var button = ui.Button({
        style: {position: 'top-right'},
        label: 'Ocultar panel',
        onClick: function() {
          // Hide the button.
          //button.style().set('shown', false);
          // Display the panel.
          main.style().set('shown', false);
           Map.add(button1);
        }
    });
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    style: {width: '320px', padding: '8px',shown:true},
    widgets: [
      button,
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.clasificacion.panel,
    ],
  });
  ui.root.insert(0,main);
  app.applyFilters();
  Map.centerObject(bounds,11);
};
app.boot();