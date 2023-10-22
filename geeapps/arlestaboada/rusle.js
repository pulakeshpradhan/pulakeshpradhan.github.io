var geometry  = ee.Geometry.Polygon([[-75.52453360665146,-14.571779756828096],
[-73.63488516915146,-14.571779756828096],
[-73.63488516915146,-13.591423641529314],
[-75.52453360665146,-13.591423641529314],
[-75.52453360665146,-14.571779756828096],])
var app = {};
var legendColor;
var legendInit=true;
/** Creates the UI panels. */
app.createPanels = function() {
    // Create an intro panel with labels.
 app.intro = ui.Panel([
  ui.Label({
    value: 'Rusle',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
app.coordenadas={
  longitud:ui.Textbox
    ({
       placeholder: 'Longitud',
       value: '',
       style: {width: '130px'}
     }),
  latitud:ui.Textbox
    ({
       placeholder: 'latitud',
       value: '',
       style: {width: '130px'}
     }),
  btnAplicar:ui.Button
             ('Aplicar filtro', 
              app.aplicandoFiltroLtLg
             ),
   loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'red', shown: false}
    }),
};
app.coordenadas.panel=ui.Panel({
  widgets: [
        ui.Panel([
        app.coordenadas.longitud,
        app.coordenadas.latitud,
      ], ui.Panel.Layout.flow('horizontal')),
      app.coordenadas.btnAplicar,
      app.coordenadas.loadingLabel,
      ],
});
    app.inspector={
      lon:ui.Label(),
      lat:ui.Label(),
    };
  app.inspector.panel=ui.Panel({
    widgets: [
         ui.Label('Haga clic en un punto en el mapa para inspeccionar.'),
        ui.Panel([
        app.inspector.lon,
        app.inspector.lat,
      ], ui.Panel.Layout.flow('horizontal')),
      ],
    });
  app.factores={
    fcvMedianLabel:ui.Label(),
    flowTopoLabel:ui.Label(),
    dgLabel:ui.Label(),
    mfiMediaLabel:ui.Label(),
  };
  app.factores.panel=ui.Panel(
    {
      widgets: [
         ui.Label('Factores', {fontWeight: 'bold'}),
         app.factores.fcvMedianLabel,
         app.factores.flowTopoLabel,
         app.factores.dgLabel,
         app.factores.mfiMediaLabel,
        ],
    }
    );
  app.vis={
     select: ui.Select({
      items: Object.keys(app.vis_options),
      onChange: function() {
        var name=app.vis.select.getValue();
        var option=app.vis_options[name];
       //app.vis.select.getValue()
       app.activateLayer(name);
       if(legendInit){
          legendColor=app.makeLegend(name,option.low, option.mid, option.high, option.palette,option.bbox);
          legendInit=false;
           Map.add( legendColor);
       }
       else{
         legendColor.clear();
         legendColor.add(app.makeLegend(name,option.low, option.mid, option.high, option.palette,option.bbox));
       }
      }
    })
  };
  app.vis.select.setValue(app.vis.select.items().get(3));
   app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('Seleccionar una capa', {fontWeight: 'bold'}),
      app.vis.select,
    ],
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  app.ColorBar=function(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: { position: 'bottom-right', margin: '0px 8px'},
  });
};
  app.makeLegend=function(name,low, mid, high, palette,bbox){
    var legend=ui.Panel();
    var legendTitle=ui.Label
                ({
                    value:name,
                });
     legend.add(legendTitle);
      var labelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal')
      );
       legend.add(labelPanel);
        return ui.Panel([app.ColorBar(palette), legend]);
  };
  app.activateLayer = function(name) {
              var layers = Map.layers();
              // list of layers names
              var names = [];
              layers.forEach(function(lay) {
                var lay_name = lay.getName();
                lay.setShown(false);
                names.push(lay_name);
              });
              // get index
              var index = names.indexOf(name);
              if (index > -1) {
                // if name in names
                var layer = layers.get(index);
                layer.setShown(true);
              } else {
                if(name==='Mediana de FCV'){
                  alert('Genera la capa de Mediana de FCV haciendo click en el mapa en la zona de interés.');
                }
                return;
              }
            };
  app.removeLayerSearch = function(name) {
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
                return;
              }
            };
  app.calculateFCV=function(punto){
     Map.addLayer(punto,{color:'7d2181'},'Punto de interes');
     var punto_inspeccion_fcv= valMedianaL8ToaAnualFCV.sample(punto,30);
     var fcv_median=punto_inspeccion_fcv.first().get('FCV_median').getInfo();
     //fcvMedianLabel.setValue('Mediana de FCV: '+fcv_median);
     app.factores.fcvMedianLabel.setValue('Mediana de FCV: '+fcv_median);
  };
  app.calculateFlowTopo=function(punto){
    var punto_inspeccion_flowTopo=app.flowTopo.sample(punto,30);
    var flowTopoAve= punto_inspeccion_flowTopo.first().get('AVE').getInfo();
     app.factores.flowTopoLabel.setValue('Flujo topográfico: '+flowTopoAve);
    //flowTopoLabel.setValue('Flujo topografico: '+flowTopoAve);
  };
  app.calculateDG=function(punto){
   var dg_1=app.bdg.sample(punto,30).first().get('dg').getInfo();
    //dgLabel.setValue('Dg(mm): '+dg_1);
  app.factores.dgLabel.setValue('DG: '+dg_1);
};
app.calculateMFI=function(punto){
   var punto_inspeccion=app.mfiMedia.sample(punto,30);
   var mfiMedia_1981_2018= punto_inspeccion.first().get('MFI_mean').getInfo();
   //mfiMediaLabel.setValue('Media de MFI de 1981-2018: '+mfiMedia_1981_2018);
    app.factores.mfiMediaLabel.setValue('Media de MFI de 1981-2018: '+mfiMedia_1981_2018);
   app.setLoadingModeCoordenadas(false);
};
Map.onClick(function(coords) {
   app.setLoadingModeCoordenadas(true);
   app.inspector.lon.setValue('lon: ' + coords.lon.toFixed(6));
   app.inspector.lat.setValue('lat: ' + coords.lat.toFixed(6));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  app.calculateFCV(point);
  app.calculateFlowTopo(point);
  app.calculateDG(point);
  app.calculateMFI(point);
});
  app.home=function(){
    Map.addLayer(app.flowTopo.select('AVE').clip(app.peru),app.vizDEM,'Flujo topográfico',false);
    Map.addLayer(app.bdg.clip(app.peru),app.vizDG,'DG',false);
    Map.addLayer(app.mfiMedia.clip(app.peru),app.vizMFI,'Media de MFI de 1981-2018');
     //app.calculateFCV(app.peru);
  };
  app.aplicandoFiltroLtLg=function(){
    app.setLoadingModeCoordenadas(true);
    var nlon=app.coordenadas.longitud.getValue();
    var nlat=app.coordenadas.latitud.getValue();
    app.inspector.lon.setValue('lon: ' +  nlon);
    app.inspector.lat.setValue('lat: ' + nlat);
    var point = ee.Geometry.Point([ee.Number.parse(nlon),ee.Number.parse(nlat)]);
    app.calculateFCV(point);
    app.calculateFlowTopo(point);
    app.calculateDG(point);
    app.calculateMFI(point);
  };
   app.setLoadingModeCoordenadas = function(enabled) {
     app.coordenadas.loadingLabel.style().set('shown', enabled);
   };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.addNDVI=function(imagen){
    var NIR='B5';
    var RED='B4';
  var ndvi= imagen.normalizedDifference([NIR, RED]).rename('NDVI');
  return imagen.addBands(ndvi).select('NDVI');
};
app.addFCV=function(image){
 var fcv= (image.subtract(ee.Number(0.1265))).divide((ee.Number(0.63)).subtract(ee.Number(0.1265))).rename('FCV');
  return image.addBands(fcv);
};
  app.puna=ee.FeatureCollection('users/sam20048130/PUNA_HEXAGONS/Puna_central_recortshp').geometry();
  app.vis_options={
    'DG':{
      low:0,
      mid:0.5,
      high:1,
      palette: ['404040' ,'a05000','800000'],
      bbox: [0, 0, 1, 0.1],
    },
    'Flujo topográfico':{
      low:0,
      mid:10500,
      high:21000,
      palette: ['00A600','E6E600','E9BD3A','ff0000','804000'],
      bbox: [0,5250, 10500, 15750],
    },
    'Mediana de FCV':{
      low:0,
      mid:0.5,
      high:1,
      palette: [ 'ff0000','ff6600','ffff00','008f39'],
      bbox: [0, 0, 1, 0.1],
    },
    'Media de MFI de 1981-2018':{
      low:0,
      mid:200,
      high:400,
      palette: ['008f39','f9ff5a','ff0000','0000ff'],
      bbox: [0, 100, 200,300 ],
    },
  };
  app.peru=ee.FeatureCollection('users/canal/peru').geometry();
  app.peru= app.puna;
  //alos
  var DEM = ee.Image('JAXA/ALOS/AW3D30_V1_1');
  var slope =  ee.Terrain.slope (DEM);
  var aspect =  ee.Terrain.aspect (DEM);
  var DEM10=DEM.multiply(10);
  var pow1=DEM10.pow(1.6);
  var slopeRadian=slope.multiply(3.14).divide(180);
  var pendienteSIN=slopeRadian.sin().multiply(0.01745);
  var pow2=pendienteSIN.pow(1.6);
  app.flowTopo=pow1.multiply(pow2);
  app.vizDEM={
               min: 0,
               max: 21000,
               //verde oscuro,amarillo,Bright orange, rojo, marron
               palette: ['00A600','E6E600','E9BD3A','ff0000','804000']
            };
  //DG
  var clay=ee.Image('users/arlestaboada/clyppt_151').select(['b1'],['clay']);
  var silt=ee.Image('users/arlestaboada/sltppt_151').select(['b1'],['silt']);
  var sand=ee.Image('users/arlestaboada/sndppt_151').select(['b1'],['sand']);
  var integracion=ee.Image.cat([clay,silt,sand]);
  var bclay=integracion.select('clay');
  var bsilt=integracion.select('silt');
  var bsand=integracion.select('sand');
  app.bdg= ((bclay.multiply(ee.Number(0.001).log())
           .add(bsilt.multiply(ee.Number(0.026).log()))
           .add(bsand.multiply(ee.Number(1.025).log())))
           .multiply(0.01)).exp().rename('dg');
  app.vizDG= {
                   min: 0, 
                   max: 1, 
                 palette: ['404040' ,'a05000','800000']
             };  
  //MFI
  app.vizMFI={
               min: 0,
              max: 400,
              palette: ['008f39','f9ff5a','ff0000','0000ff']
              };
  var startYear = 1981;
  var endYear = 2018;
  var years = ee.List.sequence(startYear, endYear);
  var months = ee.List.sequence(1,12);
  var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
  var mfiAnual=ee.ImageCollection.fromImages(years.map(function(y){
  var yearCollection = chirps.filter(ee.Filter.calendarRange(y, y, 'year'));
  var byYear=months.map(function(m) {
     var collectionMensual=yearCollection.filter(ee.Filter.calendarRange(m, m, 'month'));
      var TotalPrecipMensual= collectionMensual.reduce(ee.Reducer.sum()).rename('sumaPrecipitacion');
      var cuadrados= TotalPrecipMensual.expression('precipitacionMensual**2',{
       precipitacionMensual:TotalPrecipMensual.select('sumaPrecipitacion')
     }).rename('cuadradosPrecipitacionMensual');
      return TotalPrecipMensual.addBands(cuadrados);
  });
  var parametros= ee.ImageCollection.fromImages(byYear).reduce(ee.Reducer.sum());
  return parametros.expression('sumaCuadradosPrecipitacionMensual/sumaPrecipitacionAnual',{
    sumaCuadradosPrecipitacionMensual:parametros.select('cuadradosPrecipitacionMensual_sum'),
    sumaPrecipitacionAnual:parametros.select('sumaPrecipitacion_sum'),
  }).rename('MFI').set({anio:y});
  }));
  app.mfiMedia=mfiAnual.reduce(ee.Reducer.mean());
  app.flowTopo.evaluate(function(){
      app.proj = app.flowTopo.clip(app.peru).projection().getInfo();
      app.crs = app.proj['crs'];
    app.mfiMedia.evaluate(function(){
      app.mfiMedia=app.mfiMedia.clip(app.peru);
       app.mfiMedia_30m = app.mfiMedia.resample('bilinear').reproject({'crs': app.crs, 'scale': 30.0});
      Map.addLayer( app.mfiMedia_30m.clip(app.peru),app.vizMFI,'MFI MEDIA 30m');
    });
  });
 //FCV
   app.maskClouds = function(image) {  
    var scored = ee.Algorithms.Landsat.simpleCloudScore(image); 
    return image.mask(scored.select(['cloud']).lt(25));
  };
  app.vizFCV = {
                   min: 0, 
                   max: 1, 
                 palette: [ 'ff0000','ff6600','ffff00','008f39']
             };  
  app.anioInicial=2013;
  app.anioFinal=2019;
    var l8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
              .filterBounds(app.peru)
             .map(app.maskClouds);
    var l8ToaAnual=l8toa.filterDate(app.anioInicial+'-05-01',app.anioFinal+'-11-30');
    var l8ToaAnualNDVI= l8ToaAnual.map(app.addNDVI);
    var l8ToaAnualFCV=l8ToaAnualNDVI.map(app.addFCV);
    var medianaL8ToaAnualFCV=l8ToaAnualFCV.reduce(ee.Reducer.median()).clip(app.peru).select('FCV_median');
    var valMedianaL8ToaAnualFCV = medianaL8ToaAnualFCV.expression(
      "(b('FCV_median') > 1) ? 1" +
        ": (b('FCV_median') <0) ? 0" +
            ": b('FCV_median')"
    );
   //  app.removeLayerSearch('FCV');
   Map.addLayer(valMedianaL8ToaAnualFCV,app.vizFCV,'Mediana de FCV');
};
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
     app.intro,
     app.vis.panel,
     app.inspector.panel,
     app.coordenadas.panel,
     app.factores.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.centerObject(app.peru,5);
  Map.style().set('cursor', 'crosshair');
  ui.root.insert(0, main);
  app.home();
};
app.boot();