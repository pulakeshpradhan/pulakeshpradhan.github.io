//var recorte = ee.FeatureCollection('users/arlestaboada/Peru').geometry();
var recorte=ee.Geometry.Polygon( [[-75.58235724103929,-11.792806015819995],
[-75.46837408674241,-11.792806015819995],
[-75.46837408674241,-11.70406757472895],
[-75.58235724103929,-11.70406757472895],
 [-75.58235724103929,-11.792806015819995]]
);
 var removeLayerSearch = function(name) {
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
  var palette =[ 'b2ffff','ffff00','808000','00FF00', '0047e6','e60094','e62c00'];
  var precipCollection = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
  var precipMensual=[];
  var collectionprecipMensual;
   var TotalPrecipMensual_Recorte;
  //.filterDate('2018-01-01', '2018-12-30');
 var anioInicial=2013;
  var anioFinal=2018;
  for(var j=anioInicial;j<=anioFinal;j++){
     for(var i=1;i<=12;i++){
     var collectionMensual;
        if(i===2){
           collectionMensual=ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
                                .filterDate(j+'-'+i+'-01',j+'-'+i+'-28');
        }
        else if(i===4||i===6||i===9||i===11){
            collectionMensual=ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
                                .filterDate(j+'-'+i+'-01',j+ '-'+i+'-30');
        }
        else{
            collectionMensual=ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
                                .filterDate(j+'-'+i+'-01', j+'-'+i+'-31');
        }
     // TotalPrecipMensual_Recorte = collectionMensual.reduce(ee.Reducer.sum()).clip(recorte);
       TotalPrecipMensual_Recorte = collectionMensual.reduce(ee.Reducer.sum()).rename('sumaPrecipitacion').clip(recorte);
       var cuadrados= TotalPrecipMensual_Recorte.expression('precipitacionMensual**2',{
         precipitacionMensual:TotalPrecipMensual_Recorte.select('sumaPrecipitacion')
       }).rename('cuadradosPrecipitacionMensual');
   //  var bandsAnio=ee.Image(j).rename('anio');
     //.addBands(bandsAnio)
     var precMensualCuadrados=TotalPrecipMensual_Recorte.addBands(cuadrados).set({anio:j});
     precipMensual.push(precMensualCuadrados);
     Map.addLayer(precMensualCuadrados,{},'Mes de '+j+':'+i);
    }
  }
  collectionprecipMensual=ee.ImageCollection(precipMensual);
  Map.onClick(function(coords) {
   var resultado=[];
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    for(var a=anioInicial;a<=anioFinal;a++){
        var filterMensual= collectionprecipMensual.filter(ee.Filter.eq('anio',a));
         Map.addLayer(filterMensual)
       var filterMensualAnual =filterMensual.reduce(ee.Reducer.sum()).clip(recorte);
        var punto_inspeccion_cuadrados=filterMensualAnual.sample(point,30);
        var sumaPrecipitacionCuadrados= punto_inspeccion_cuadrados.first().get('cuadradosPrecipitacionMensual_sum').getInfo();
        var precipitacionAnual= punto_inspeccion_cuadrados.first().get('sumaPrecipitacion_sum').getInfo();
        var mfi=sumaPrecipitacionCuadrados/precipitacionAnual;
        print(a+':'+mfi);
    }
    removeLayerSearch('Punto de interes');
     Map.addLayer(point,{},'Punto de interes');
  });
  Map.centerObject(recorte);
  Map.style().set('cursor', 'crosshair');