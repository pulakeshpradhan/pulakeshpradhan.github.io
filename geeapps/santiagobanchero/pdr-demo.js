/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var heladas = ee.Image("users/santiagobanchero/convenio_parana/heladas10a042012a2020"),
    radares = ee.ImageCollection("users/santiagobanchero/convenio_parana/radar-acumulados"),
    anegamiento = ee.Image("JRC/GSW1_1/GlobalSurfaceWater"),
    limite = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-66.41614716997447, -41.55452400760846],
          [-55.07034296103586, -41.488305598196334],
          [-55.40300840771795, -23.423377871045492],
          [-64.59073957033985, -23.56416393476414],
          [-64.66372030216684, -25.754069631796625],
          [-65.6317900551457, -27.308018052300167],
          [-65.71546766319705, -28.463445754198414],
          [-66.2872304046814, -28.844021767844357]]]),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-66.59117102627074, -34.85553387742435],
          [-66.59117102627074, -39.17374603793951],
          [-56.55790686611449, -39.17374603793951],
          [-56.55790686611449, -34.85553387742435]]], null, false),
    PDR = ee.FeatureCollection("users/santiagobanchero/convenio_parana/PDR/puntos-pdr-2020-lof");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * Título: Extraer Puntos PDR (Demo)
 * Por: Banchero, Santiago
 * Acuerdo: INTA-Paraná
 * Año: 2020
 * 
 * Data:
 * 
 * */
var scale_factor_radar = 5*365; 
var radio_km = 240;
var area_ang = ee.Geometry.Point([-63.990067, -36.539684]).buffer(radio_km*1000);
var area_par = ee.Geometry.Point([-60.537289, -31.848438]).buffer(radio_km*1000);
var area_per = ee.Geometry.Point([-60.5625, -33.946098]).buffer(radio_km*1000);
var radares = ee.ImageCollection.fromImages(
                [ee.Image(radares.filterMetadata("radar", "equals", "ANG").first()).clip(area_ang),
                ee.Image(radares.filterMetadata("radar", "equals", "PAR").first()).clip(area_par),
                ee.Image(radares.filterMetadata("radar", "equals", "PER").first()).clip(area_per)]
                ).max().multiply(scale_factor_radar).rename("granizo");
var stack = radares.addBands(heladas).addBands(anegamiento.select(["occurrence","seasonality","recurrence"]).unmask(255))
var ROI = ee.FeatureCollection([ee.Feature(area_ang.union(area_par).union(area_per))])
Map.addLayer(ROI.style({fillColor:"00000000"}),{},"Área con Datos")
Map.centerObject(ROI)
Map.setOptions("HYBRID")
var scale_factor = 1000; // Distancias en KM
var app = {};
app.fc_points = ee.FeatureCollection([])
app.max_distance = 1500 * scale_factor;
app.createDistancePanels = function() {
    app.distancia = {
        header: ui.Label('Extracción de valores para PDR', {fontWeight: 'bold', fontSize: '24px'}),
        title: ui.Label('1) Distancia Mínima (KM)', {fontWeight: 'bold'}),
        box: ui.Textbox('Distancia (KM)'),
        apply: ui.Button({
            label: 'Guardar',
        })
    };
    app.distancia.apply.onClick(function () {
              app.distancia_km = parseInt(app.distancia.box.getValue());
              //app.distancia.box.setDisabled(true);
              //print(app.distancia_km)
            });
    app.distancia.panel = ui.Panel({
        widgets: [app.distancia.header,app.distancia.title, app.distancia.box, app.distancia.apply],
        layout: ui.Panel.Layout.flow('vertical'),
        style: {
            position: 'top-center',
            padding: '8px'
        }
    });
};
app.AggregatePointsPanels = function(){
    app.aggregateClass = {
        title: ui.Panel([
            ui.Label({
                value: '2) Administrar Puntos',
                style: {fontWeight: 'bold'}
            })
        ]),
        aggregate_activate: ui.Checkbox("Agregar",false),
        remove_activate: ui.Checkbox("Eliminar",false),
        map: Map
    };
    app.aggregateClass.aggregate_activate.onChange(
      function(checked){
        app.enable_aggr = checked
        app.enable_remove = !checked
        app.aggregateClass.remove_activate.setValue(!checked)
      }) 
    app.aggregateClass.remove_activate.onChange(
      function(checked){
        app.enable_remove = checked
        app.enable_aggr = !checked
        app.aggregateClass.aggregate_activate.setValue(!checked)
      })
    app.aggregateClass.map.onClick(
      function(point){
        print(point)
        if(app.enable_aggr){
          app.aggregateClass.add(point)
          app.aggregateClass.refresh()
        }else{
          if(app.enable_remove){
            app.aggregateClass.remove(point)
            app.aggregateClass.refresh()
          }else{
            print("NA")
          }  
        }
      });
    app.aggregateClass.add = function(point){
      app.fc_points = app.fc_points.merge(
       ee.FeatureCollection(
         [ee.Feature(
           ee.Geometry.Point([point.lon, point.lat]),{dist: 0})]));
    }
    app.aggregateClass.remove = function(point){
      var fcp = ee.Geometry.Point([point.lon, point.lat])
      app.fc_points = app.fc_points.filter(ee.Filter.bounds(fcp.buffer(100)).not());
      print(app.fc_points)
    }
    app.aggregateClass.refresh = function(){
      var n_points = app.fc_points.size().getInfo();
      var lyr = ui.Map.Layer(ee.FeatureCollection(app.fc_points), {color: "red"}, "Puntos a extraer (" + n_points + ")")
      app.aggregateClass.map.layers().remove(app.aggregateClass.map.layers().get(1))
      app.aggregateClass.map.layers().insert(1, lyr)
    }
    app.aggregateClass.aggregate_panel = ui.Panel({
        widgets:[
            app.aggregateClass.title,
            app.aggregateClass.aggregate_activate,
            app.aggregateClass.remove_activate,
            ],
        layout: ui.Panel.Layout.flow('vertical'),
        style: {
            position: 'top-center',
            padding: '8px'
        }
    });
}
app.CalculateDistances = {
  get_n_points_warm: function(){
    app.fc_points = app.fc_points.map(function(f){
      return f.set({
        n_warn: app.fc_points.filter(ee.Filter.bounds(f.geometry().buffer(app.distancia_km*1000, ee.ErrorMargin(10)))).size().subtract(1),
      });
    });
    //app.fc_points = app.fc_points.select(["n_warn"])
    return app.fc_points.filterMetadata("n_warn", "greater_than", 0).size().getInfo()
  },
  get_avg_dist: function(){
    // Max search distance is 5 km.
    var spatialFilter = ee.Filter.withinDistance({
      distance: app.max_distance,
      leftField: '.geo',
      rightField: '.geo',
      maxError: 100
    })
    // Join the points to themselves.
    var joined = ee.Join.saveAll({
      matchesKey: 'neighbors', 
      measureKey: 'distance',
      ordering: 'distance'
    }).apply({
      primary: app.fc_points, 
      secondary: app.fc_points, 
      condition: spatialFilter
    });
    var hasNearest = joined.map(function(f) {
      var neighsSize = ee.List(f.get('neighbors')).size();
      return f.set('neighsSize', neighsSize);
    }).filter(ee.Filter.gt('neighsSize', 1));
    // Get distance to nearest point.
    var withNearestDist = hasNearest.map(function(f) {
      var nearestDist = ee.Feature(ee.List(f.get('neighbors')).get(1))
          .get('distance');
      return f.set('distance', nearestDist);
    });
    var min_d = ee.Number(withNearestDist.aggregate_min("distance")).divide(scale_factor).format('%.2f').getInfo()
    var max_d = ee.Number(withNearestDist.aggregate_max("distance")).divide(scale_factor).format('%.2f').getInfo()
    var avg_d = withNearestDist.aggregate_mean("distance").divide(scale_factor).format('%.2f').getInfo()
    app.fc_points = withNearestDist.map(function(f){
      return f.set({
        min_dist: min_d,
        max_dist: max_d,
        avg_dist: avg_d
      })
    }).select(["distance", "min_dist", "max_dist", "avg_dist"])
    return avg_d; 
  }
};
app.ExtractValues = {
  apply: function(){
    app.fc_points = stack.sampleRegions({
      collection: app.fc_points, 
      properties: ["distance", "min_dist", "max_dist", "avg_dist", "n_warn"], 
      scale: 30, 
      tileScale: 2,
      geometries: true
    });
  }
}
app.createCalculatePanels = function() {
    app.calculate = {
        title: ui.Label('3) Calcular Distancias', {fontWeight: 'bold'}),
        //box: ui.Textbox('Distancia (KM)'),
        avg_dist: ui.Label('Distancia Promedio: ', {}),
        n_points_warn: ui.Label('# Puntos (< mín.): ', {}),
        apply: ui.Button({
            label: 'Calcular',
        })
    };
    app.calculate.apply.onClick(function () {
      app.calculate.avg_dist.setValue('Distancia Promedio (km): ' + app.CalculateDistances.get_avg_dist());
      app.calculate.n_points_warn.setValue('# Puntos (< mín.): ' + app.CalculateDistances.get_n_points_warm());
    });
    app.calculate.panel = ui.Panel({
        widgets: [app.calculate.title, app.calculate.apply, app.calculate.avg_dist, app.calculate.n_points_warn],
        layout: ui.Panel.Layout.flow('vertical'),
        style: {
            position: 'top-center',
            padding: '8px'
        }
    });
};
app.createExportsPanels = function() {
    app.export = {
        title: ui.Label('4) Exportar Puntos', {fontWeight: 'bold'}),
        apply: ui.Button({
            label: 'Exportar',
        }),
        link: ui.Label('Link Descarga', {shown: false})
    };
    app.export.apply.onClick(function () {
      app.ExtractValues.apply();
      app.export.exportarPuntos();
    });
    app.export.exportarPuntos = function() {
      var downloadArgsGeom = {
        format: 'GeoJSON'
      };
      if(app.fc_points.size().getInfo() > 0) {
        app.export.link.setUrl(app.fc_points.getDownloadURL(downloadArgsGeom));
        app.export.link.style().set({shown: true});
      }
    }
    app.export.panel = ui.Panel({
        widgets: [app.export.title, app.export.apply, app.export.link],
        layout: ui.Panel.Layout.flow('vertical'),
        style: {
            position: 'top-center',
            padding: '8px'
        }
    });
};
app.start = function(){
  app.createDistancePanels();
  app.AggregatePointsPanels();
  app.createCalculatePanels();
  app.createExportsPanels();
  var initpan = ui.Panel({
        widgets: [
            // app.gridintro.panel,
            app.distancia.panel,
            app.aggregateClass.aggregate_panel,
            app.calculate.panel,
            app.export.panel,
        ],
        layout: ui.Panel.Layout.flow('vertical'),
        style: {width: '320px', padding: '8px', position:'bottom-left'}
    });
    ui.root.insert(0, initpan);
    Map.addLayer(app.fc_points, {color: "red"}, "Puntos a extraer")
}
app.start()