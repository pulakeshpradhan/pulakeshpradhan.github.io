//Autor: Evelyn Schibber
//Trabajo final para Especialización TelySIG 
//Contacto: eschibber@agro.uba.ar
//Fecha última modificación: 2022-04-30 
//Graficar PPNA con EUR variable según estación del año, uso del suelo y región agroecológica
//Desarrollado para Uruguay
//potreros: cargar el shape de potreros que se quiere estudiar. Tener en cuenta que si son muchos produce un error al graficar
// usos_potreros: CSV con el historial de usos del suelo extraído de FOCUS.
//Instructivo para cargar los usos del suelo en https://docs.google.com/document/d/1YUtqkyKoOBkXaff2diQwY9gGMbIKrJRxFYb85rlYZvQ/edit?usp=sharing
//Fecha fin debe coincidir con la última fecha en la cuál se tienen datos de usos del suelo en "usos_potrero"
// A veces se genera un error "internal error" genérico, volver a correr o refrescar la página.
//VARIACIONES EXTRAS:
//FILTRO MANUAL DE IMAGENES DE MALA CALIDAD
//CAMBIO ECUACION PPNA (VALOR MINIMO DE PPNA)
// Agrego vector desde Fusion Table	
var potreros = ee.FeatureCollection('users/mabrigo/gyc-extension/omar-muniz-conventos');
var usos_potrero = ee.FeatureCollection('users/mabrigo/gyc-extension/tabla-usos-omar-muniz-S2');
{
var enmascarar = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[-54.26900992630123, -32.34562345231828],
           [-54.268881180268515, -32.34559625999107],
           [-54.268655874598394, -32.34556000366479],
           [-54.26847080228924, -32.3454874906005],
           [-54.26830584623326, -32.3454127118106],
           [-54.26817039464438, -32.345396849626695],
           [-54.26807115299124, -32.34535606099093],
           [-54.26799068687557, -32.345378721079165],
           [-54.26771978349634, -32.34528354775141],
           [-54.267636635285605, -32.34517251183598],
           [-54.267695643919744, -32.34510339765109],
           [-54.26777611015438, -32.345079604221226],
           [-54.26794090175355, -32.34509320048994],
           [-54.2680018398926, -32.34521216751213],
           [-54.26810837564744, -32.34519290617771],
           [-54.26832027015961, -32.345251823139],
           [-54.26857776222504, -32.34526995142706],
           [-54.268749423601996, -32.345288079711494],
           [-54.26896400032319, -32.34532433626947],
           [-54.269154437163245, -32.345360592812895]]],
         [[[-54.26916541988168, -32.345632341351944],
           [-54.2692592971972, -32.345625543271574],
           [-54.2693129413775, -32.3456980561025],
           [-54.26922174627099, -32.345732046471994],
           [-54.26916541988168, -32.34571618430117],
           [-54.26914396220956, -32.3456765288522]]],
         [[[-54.269180072455136, -32.34595447670163],
           [-54.26931418290588, -32.34589329417778],
           [-54.26939464917633, -32.3459204864157],
           [-54.269453657774655, -32.346002063080476],
           [-54.26955558171722, -32.34604285138528],
           [-54.26963873019668, -32.346104033808],
           [-54.26973797193023, -32.34609496974798],
           [-54.269815755991665, -32.34607457560962],
           [-54.26990158668014, -32.34604738341801],
           [-54.26998205295059, -32.34607230959397],
           [-54.27000887504074, -32.34614708808067],
           [-54.27004374375793, -32.3462082704329],
           [-54.27016980758163, -32.34624679263345],
           [-54.27015371432754, -32.34633290102243],
           [-54.27011616340133, -32.346473393481126],
           [-54.2699659596965, -32.34655496964734],
           [-54.26990695109817, -32.34657762968047]]],
         [[[-54.26820956864746, -32.343392789249926],
           [-54.26815592443049, -32.34332480670291],
           [-54.26813446679504, -32.343216034619246],
           [-54.26807545815533, -32.34302115068992],
           [-54.268055341614534, -32.34292257570129],
           [-54.26808886924179, -32.34285572603356],
           [-54.268225661901546, -32.3427718804336],
           [-54.26840805211456, -32.342767348236805],
           [-54.26855289140136, -32.34274921944731],
           [-54.26881574788482, -32.342812670194654],
           [-54.269207350401, -32.34298489342738],
           [-54.269035689024044, -32.34354235059081]]]]);
          }
//Carga en el mapa la FeatureCollection de los potreros
//Map.addLayer(potreros);
//Imprime en la pantalla la FeactureCollection de los potreros
//print('potreros',potreros);
//rasterizar potreros para obtener ID 
var potreros_raster = ee.Image(potreros.reduceToImage({
                                properties:['IDLOTE'],
                                reducer: ee.Reducer.first()
                              })).rename('IDLOTE');
//Carga en el mapa el raster de los potreros 
//Map.addLayer(potreros_raster,{}, 'potreros raster', false);
//Imprime en la consola el raster de los potreros
//print('potreros raster', potreros_raster)	
//Carga el shape de zonas agroecologicas
var zonas_agroecologicas = ee.FeatureCollection('projects/ee-eschibber/assets/zonas_agroecologicas');
var tajamares = ee.FeatureCollection('projects/ee-eschibber/assets/Tajamares_Uruguay').filterBounds(potreros);
//Carga en el mapa el raster de de areas agroecologicas
//Map.addLayer(zonas_agroecologicas, {}, 'Areas Agroecologicas', false)
//.addLayer(tajamares, {}, 'Areas Agroecologicas', false)
//Carga la tabla de EUR. Esta tabla es fija. 
var EUR_tabla = ee.FeatureCollection('projects/ee-eschibber/assets/EUR_GEE_fija'); //tabla general, no modificar
//print('EUR tabla',EUR_tabla)
// FILTRO MANUAL DE IMAGENES CON NUBOSIDAD
var filtro1 = ee.Filter.date('2018-12-01', '2019-02-24');//filtra por fechas inicio y fin
var filtro2 = ee.Filter.date('2019-02-25', '2022-04-30');//filtro extra por nubosidad
var allfilter = ee.Filter.or(filtro1, filtro2); // Create joint Filter
// // Importa la Coleccion Sentinel SR (2A) y aplica filtros	
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')	
    .filter(allfilter)
  //.filterDate('2018-12-01', '2022-03-28')	//filtra por fechas inicio y fin
    .filterBounds(potreros)	//seleciona por los potreros
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1));	//prefiltro por porcentaje de nubes
//print('S2',S2);//imprime en la consola
// FILTRO MANUAL DE IMAGENES CON NUBOSIDAD
var filtro3 = ee.Filter.date('2017-07-01', '2017-11-16');//filtra por fechas inicio y fin
var filtro4 = ee.Filter.date('2017-11-17', '2018-01-10');//filtro extra por nubosidad
var filtro5 = ee.Filter.date('2018-01-11', '2018-02-24');//filtro extra por nubosidad
var filtro6 = ee.Filter.date('2018-02-25', '2018-11-30');//filtro extra por nubosidad
var allfilter2 = ee.Filter.or(filtro3, filtro4,filtro5,filtro6); // Create joint Filter
// // Importa la Coleccion Sentinel nivel 1C aplica filtros y la función de enmascarar nubes	
var S2_TOA = ee.ImageCollection('COPERNICUS/S2')	
    .filter(allfilter2)
  //.filterDate('2017-07-01', '2018-11-30')	//filtra por fechas inicio y fin. Quedan fijas, no modificar
    .filterBounds(potreros)	//seleciona por los potreros
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));	//prefiltro por porcentaje de nubes
//print('S2_TOA',S2_TOA);//imprime en la consola
 /// Importar imágenes de PAR (radiación incidente)
var radiacion = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
                .filter(ee.Filter.date('1981-01-01', '2022-04-28')).select(['surface_net_solar_radiation']);
radiacion = radiacion.map(function(x){
  var mes = x.set({'MONTH': x.date().format('M')});
  return mes;
});
//print ('Radiacion',radiacion)
// Promedio mensual histórico de PAR
var months = ee.List.sequence(1,12,1); //lista con los meses
//print(months)
var PARpromedioMensual = months.map(function(j) {
  var imagen = radiacion.select('surface_net_solar_radiation')
      .filter(ee.Filter.calendarRange(j, ee.Number(j).add(1), 'MONTH')).first();
  return radiacion.select('surface_net_solar_radiation')
      .filter(ee.Filter.calendarRange(j, ee.Number(j).add(1), 'MONTH'))
      .reduce(ee.Reducer.mean())
      .rename('PAR').divide(1000000).multiply(0.60) //se divide para convertir de joule a Megajoule y se multiplica por 0.6 para usar solo radiación fotosinteticamente activa
      .clip(potreros).copyProperties(imagen, ['MONTH']);
});
var Historico_PAR = ee.ImageCollection.fromImages(PARpromedioMensual);
//print('Promedio mensual histórico de PAR', Historico_PAR);
//Map.addLayer(Historico_PAR .first())
//////////////////////////////////////////////////////////
//////// CORREGIR COLECCION DE IMAGENES SENTINEL//////////
/////////////////////////////////////////////////////////
/// Importar función SIAC para corregir atmosfericamente las S2_TOA (paso de TOA a BOA)
var siac = require('users/marcyinfeng/utils:SIAC'); //https://github.com/MarcYin/SIAC
//Función para corregir con modelo SIAC
var boa_siac = function(image){
  var bandas = image.select(['QA60']);
   var boa = siac.get_sur(image);
      boa = boa.multiply(10000).toInt();
return boa.addBands(bandas).set('system:time_start', image.get('system:time_start')).clip(potreros);
};
//Aplico la función siac para corregir las sentines TOA a BOA
var S2_BOA = S2_TOA.map(boa_siac);
// Funcion para enmascarar Nubes usando la banda de calidad (QA) de Sentinel-2 
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Los Bits 10 y 11 son Nubes y Cirrus respectivamente
  // Operadores a nivel de bits
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Los dos flags deben setearse en cero indicando condiciones sin nube
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).set('system:time_start', image.get('system:time_start')).clip(potreros);
}
// Funcion para enmascarar Nubes usando la banda de calidad (QA) de Sentinel-2 
function maskS2clouds_SR(image) {
  var qa = image.select('QA60');
  // Los Bits 10 y 11 son Nubes y Cirrus respectivamente
  // Operadores a nivel de bits
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Los dos flags deben setearse en cero indicando condiciones sin nube
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
     mask = mask.multiply(image.select(['MSK_CLDPRB']).lt(1));
  return image.updateMask(mask).divide(10000).set('system:time_start', image.get('system:time_start'));
}
// aplica filtros y la función de enmascarar nubes
S2_BOA = S2_BOA.map(maskS2clouds);
//print('S2_BOA con máscara de nubes', S2_BOA);
S2 = S2.map(maskS2clouds_SR);
//print('S2 con máscara de nubes', S2);
//Merge entre ambas colecciones para obtener una sola serie temporal
S2 = S2_BOA.merge(S2);
S2 = S2.map(function(x){
  var mes = x.set({'MONTH': x.date().format('M')});
  return mes;
});
//print('S2 MONTH', S2)
//Función para enmascarar usando polígonos. El objetivo es enmascarar agua, parches de árboles y los casos de estancia.
//Crear una sola geometría con todos los polígonos
 var enmascarar = ee.FeatureCollection(enmascarar);
 enmascarar = enmascarar.merge(tajamares);
 //Para poder mostrar en el mapa los polígonos con borde naranja
 var empty = ee.Image().byte()	;
 var mascara = empty.paint({	
  featureCollection: enmascarar,	
color: 1,	
width: 2	
})	;
//Map.addLayer(mascara, {palette:['orange']}, 'enmascarar', false);
var maskInside = function(image, enmascarar) {
  var mask = ee.Image.constant(1).clip(geometry).mask().not();
  //mask = mask.updateMask(tajamares)
  return image.updateMask(mask);
};
var tools = require('users/fitoprincipe/geetools:tools'); //https://github.com/fitoprincipe/geetools-code-editor
//https://github.com/fitoprincipe/geetools-code-editor/wiki
S2 = S2.map(function(image){
  var masked = tools.geometry.maskInside(image, enmascarar);
  var fecha_imagen = ee.Image(image).date().format("YYYY M");
  return masked.set({'fecha': fecha_imagen});
});
//print ('Merge S2',S2)
/////////////AGREGAR LA ZONA AGROECOLOGICA A LOS POTREROS ///////////
// Iterar lote por lote del campo
var potrero_con_zona = potreros.map(function(feat){
  //feat = ee.Feature(feat);
  var point = feat.geometry(); 
  // now map over the polygons
  var mappedPolys = zonas_agroecologicas.map(function(poly){
    var intersects = poly.intersects(point, ee.ErrorMargin(1));
    // check if the point intersected with the polygon
    var property = ee.String(ee.Algorithms.If(intersects, poly.get('REGION_N'), 'FALSE'));
    // set a property to each individual feature
    return feat.set('zona_agro',  ee.String(property));
                //.set('pointID', ee.String('id').cat(ee.String(feat.get('system:index'))));
  });
  // devuelve los poligonos que intersectan con una propiedad llamada FALSE'
  return ee.Feature(mappedPolys);
})
  // Flatten the collection of collections and filter out the 'FALSE' properties
  .flatten().filter(ee.Filter.neq('zona_agro', 'FALSE'));
//print('potrero_agregar_zona', potrero_con_zona);
//Map.addLayer(potrero_con_zona)
//////////////////////////////////////////
////JOIN ENTRE LA TABLA DE USOS DEL POTRERO Y EL POTRERO CON ZONAS
//// DE ESTA FORMA TENDREMOS LA ZONA AGRO EN LA TABLA DE USOS PARA LUEGO BUSCAR LA EUR QUE LE CORRESPONDE
///OBTENEMOS LA TABLA DE USOS PERO CON LA ZONA AGROECOLOGICA DE CADA LOTE
var ft3=ee.Filter.and(
  ee.Filter.equals({
    leftField: 'campo',
    rightField: 'CAMPO',
  }),
  ee.Filter.equals({
    leftField: 'lote',
    rightField: 'LOTE'
  })
);
var joined_zona = ee.Join.saveFirst('join').apply({
  primary: usos_potrero,
  secondary: potrero_con_zona,
  condition: ft3
});
//print('join zona',joined_zona);
var usos_zona = joined_zona.map(function(k){
  var zona_extract = ee.Feature(k.get('join')).get('zona_agro');
  return k.set('join',null).set('Area_agro',ee.String(zona_extract));
});
//print('usos_zona',usos_zona); 
/////////// DEFINIR EL JOIN PARA LA TABLA DE EUR Y ASIGNAR UNA PENDIENTE Y ORDENADA SEGÚN CORRESPONDA
var ft4 = ee.Filter.and(
  ee.Filter.equals({
    leftField: 'estacion',
    rightField: 'Estacion',
  }),
  ee.Filter.equals({
    leftField: 'uso',
    rightField: 'Uso'
  }),
  ee.Filter.equals({
    leftField: 'Area_agro',
    rightField: 'Zona'
  })
);
var joined_eur = ee.Join.saveFirst('EUR').apply({
  primary: usos_zona,
  secondary: EUR_tabla,
  condition: ft4
});
//print('joined_eur',joined_eur);
var usos_eur1 = joined_eur.map(function(e){
  var prop_pend= ee.Feature(e.get('EUR')).get('Pendiente_EUR');
  var prop_orde= ee.Feature(e.get('EUR')).get('Ordenada_EUR');
  return e.set('EUR',null).set('Pendiente_eur',prop_pend,'Ordenada_eur',prop_orde);
});
//print('usos_eur1',usos_eur1); 
//Map.addLayer(usos_eur1, {},'usos_eur1')
// crear colección de imágenes a partir de csv de usos de suelo. Se le agrega la geometría del shape potreros
var usos = (ee.FeatureCollection(usos_eur1)).toList(10000);
//print('usos', usos)
/////Función para agregar la geometría de los lotes a la lista de usos
var usos_geo = usos.map(function(k){
  var name = potreros.filterMetadata('IDLOTE','equals',ee.Feature(k).get('IDLOTE'));
  return ee.Feature(k).setGeometry(name.geometry());
});
//print('usos_geo',usos_geo);
//Convertir usos_geo a FeatureCollection
var usos_geo_ft = ee.FeatureCollection(usos_geo);
//print('usos_geo_ft',usos_geo_ft);
//Función para rasterizar los usos para cada lote.
var usos_geo_raster = ee.ImageCollection(usos_geo_ft.map(function(x){
   var mes =  (ee.FeatureCollection(x).reduceToImage({
                                properties:['mes'],
                                reducer: ee.Reducer.first()
                              })).rename('mes');
    var IDLOTE =  (ee.FeatureCollection(x).reduceToImage({
                                properties:['IDLOTE'],
                                reducer: ee.Reducer.first()
                              })).rename('IDLOTE'); 
    var pendiente_eur =  (ee.FeatureCollection(x).reduceToImage({
                                properties:['Pendiente_eur'],
                                reducer: ee.Reducer.first()
                              })).rename('Pendiente_eur'); 
    var ordenada_eur =  (ee.FeatureCollection(x).reduceToImage({
                                properties:['Ordenada_eur'],
                                reducer: ee.Reducer.first()
                              })).rename('Ordenada_eur'); 
    var fecha =  (ee.Feature(x).get('fecha'))      
                              ;                            
                              return ee.Image(IDLOTE).addBands([ordenada_eur,pendiente_eur]) 
                              .set({'mes':ee.Feature(x).get('mes'),'anio':ee.Feature(x).get('anio'), 'IDLOTE':ee.Feature(x).get('IDLOTE'), 'fecha': fecha });
}) );
//imprimir en la consola la colección y agregar al mapa
//print('usos_geo_raster', usos_geo_raster);
//Map.addLayer(usos_geo_raster,{}, 'usos_geo_raster')
//Función para iterar la lista de fechas únicas y armar un mosaico de usos por lote para la misma fecha
var mosaico = (function(lista_fechas_unicas, newlist) {
 newlist = ee.List(newlist);
  // Filtro por fecha
  var filtered = usos_geo_raster.filterMetadata('fecha','equals',lista_fechas_unicas);
   // Hago el mosaico
  var image = ee.Image(filtered.mosaic()).set({'fecha':lista_fechas_unicas});
  // Agrega el mosaico a una lista sólo si está esa fecha en la colección de imágenes
  return ee.List(ee.Algorithms.If(filtered.size(), newlist.add(image), newlist));
});
//Crear lista de fechas únicas a partir de la colección de imágenes s2_cortadas
 var lista_fechas = S2.toList(S2.size());
// print('lista de fechas de colección Sentinel',lista_fechas)
  var lista_fechas_unicas = lista_fechas.map(function(im){
    return ee.Image(im).date().format("YYYY M");
  }).distinct();
//imprimir en la consola la lista
//print('Lista de fechas únicas', lista_fechas_unicas);
// Iterar la image collection por la lista de fechas para hacer un mosaico por fecha
var eur_por_lote = ee.ImageCollection(ee.List(lista_fechas_unicas.iterate(mosaico, ee.List([]))));
//print('EUR por lote', eur_por_lote);
//Map.addLayer(eur_por_lote,{},'eur por lote');
/////////AGREGAR LAS BANDAS ORDENADA Y PENDIENTE EUR A LA COLECCION DE IMAGENES 
var add_eur = S2.map(function(x){
  var fecha_coincidente = ee.Image(eur_por_lote.filterMetadata('fecha','equals',ee.Feature(x).get('fecha')).first());
  return x.addBands(fecha_coincidente);
});
//print('add_eur',add_eur);
//Map.addLayer(add_eur)
////////////////////////////////////////////////////////////	
// CALCULO PPNA	
////////////////////////////////////////////////////////////	
//se define la función addEVI para calcular EVI y aplicar la máscara de calidad	
var addEVI = function(image) {	
var evi = image.expression('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', {
      'NIR' : image.select('B8'),
      'RED' : image.select('B4'),
      'BLUE': image.select('B2')}).rename('EVI');
return image.addBands(evi).clip(potreros); //agrega la banda m que tiene el NDVI
}	;
//aplico la función addEVI en la variable EVI
var EVI = add_eur.map(addEVI).select(['EVI','Ordenada_eur','Pendiente_eur']); //selecciona únicamente la banda EVI
//print('Agregar EVI',EVI);
//Función para agregar la fecha a la colección	
var addDate = function(image){	
  var doy = image.date().getRelative('day', 'year');	
var doyBand = ee.Image.constant(doy).uint16().rename('doy');	
  return image.addBands(doyBand);	
}	;
//Aplico la función para agregar fecha
var EVI_DOY = EVI.map(addDate);	
//print('Agregar Day Of Year (DOY)',EVI_DOY);	
/////Función para cálcular PAR	
var ft_PAR = ee.Filter.equals({
    leftField: 'MONTH',
    rightField: 'MONTH'
    });
var joined_PAR= ee.Join.saveFirst('PAR').apply({
  primary: EVI_DOY,
  secondary: Historico_PAR,
  condition: ft_PAR
});
var addPAR = ee.ImageCollection(joined_PAR.map(function(x){
   var PAR =  x.get('PAR')
  return ee.Image(x).addBands(PAR).clip(potreros).set('PAR',null)
}));
//print('addPAR', addPAR)
//Función para cálcular fPAR	
var addfPAR = function(image){	
      //Gitelson 2019:
      var f = image.expression('min(max(((-1.06*(EVI**2))+2.28*EVI-0.26),0),0.95)', {	
             'EVI': image.select('EVI')
             }).rename('fPAR')	;
       return image.addBands(f)	;
}	;
//Aplico función fPAR
var fpar = addPAR.map(addfPAR)	;
//print('Agregar fPAR',fpar)	;
//Función para calcular PPNA
var addPPNA = function(image){	
var f = image.expression('max((((PAR*fPAR*pendiente_eur)+ordenada_eur)*10),0)', {	
      'fPAR': image.select('fPAR'),	
      'PAR': image.select('PAR'),
      'ordenada_eur': image.select('Ordenada_eur'),
      'pendiente_eur': image.select('Pendiente_eur')
  }).rename('PPNA');	
  return image.addBands(f).clip(potreros);	
};	
//Aplico función addPPNA
var PPNA = fpar.map(addPPNA)	;
print('Agregar PPNA',PPNA);	
////////////////////////////////////////////////////////////	
// MAPA y GRAFICO	
////////////////////////////////////////////////////////////	
var vis = {bands: 'EVI', min: 0, max: 1, palette: [	
'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',	
'056201', '004C00', '023B01', '012E01', '011301'	
]}	;
Map.addLayer(PPNA.first(), vis, 'EVI',false);	//cargo en el mapa la banda EVI de NDVIq
Map.centerObject(potreros);	//centro el mapa en los potreros
Map.addLayer(potreros.style({color: 'FFD700', fillColor:'FF000000'}), null, 'Potreros')
// Create a panel to hold our widgets.	
var panel = ui.Panel();	
panel.style().set('width', '600px');	
// Create an intro panel with labels.	
var intro = ui.Panel([	
  ui.Label({	
value: 'Predio de Omar Muniz: Tasa de crecimiento del forraje (Kg/ha*dia)',
style: {fontSize: '20px', fontWeight: 'bold'}	
  }),	
])	;
panel.add(intro);	
var intro = ui.Panel([	
  ui.Label({	
value: 'Estimada con información satelital de imagenes Sentinel',	
style: {fontSize: '15px', fontWeight: 'bold'}	
  }),	
])	;
panel.add(intro);
var tempTimeSeries = ui.Chart.image.seriesByRegion({	
                            imageCollection:PPNA,
                            regions:potreros,
                            reducer:ee.Reducer.mean(),
                            band:'PPNA',
                            scale:30,
                            xProperty:'system:time_start',
                            seriesProperty:'LOTE'
                            })
                    .setOptions({	
                            title: 'PPNA',	
                            vAxis: {title: 'PPNA (kg/ha/d)'},	
                            lineWidth: 0.5,	
                            pointSize: 2,	
                            series: {	
                                  1: {color: 'FF0000'}, // pix1	
                                  2: {color: '00FF00'}, // pix1	
                                  3: {color: '0000FF'}, // pix4	
                                  }})	;
//print(tempTimeSeries)	
panel.widgets().set(2, tempTimeSeries);
// Create panels to hold lon/lat values.	
var lon = ui.Label();	
var lat = ui.Label();	
/*
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')))	
Map.onClick(function(coords) {	
  // Update the lon/lat panel with values from the click event.	
lon.setValue('lon: ' + coords.lon.toFixed(2)),	
lat.setValue('lat: ' + coords.lat.toFixed(2))	
  // Add a red dot for the point clicked on.	
  var point = ee.Geometry.Point(coords.lon, coords.lat)	
  // Create an NDVI chart.	
var ndviChart = ui.Chart.image.series(PPNA.select(['PPNA']), point, ee.Reducer.mean(), 30)	
  ndviChart.setOptions({	
title: 'PPNA del punto ' + coords.lon.toFixed(2) + ' ' +  coords.lat.toFixed(2),	
    vAxis: {title: 'PPNA (kg/ha/d)'},	
hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},	
  })	
panel.widgets().set(3, ndviChart)	
})	
Map.style().set('cursor', 'crosshair')	
*/
// Add the panel to the ui.root.	
ui.root.insert(0, panel);	
Map.setOptions('SATELLITE');
var Metricas = PPNA.map(function(fecha){
  var indiceFecha = fecha.reduceRegions({
    collection: potreros.select(['LOTE']),
    reducer: ee.Reducer.mean()
    });
  return indiceFecha.map(function(i){
    return i.set({
      // 'system:time_start': fecha.get('system:time_start'),
      'AnioImg': fecha.date().get('year'),
      'MesImg' : fecha.date().get('month'),
      'DiaImg': fecha.date().get('day')
      });
    });
}).flatten();
/// Exportar métricas a CSV
/*
Export.table.toDrive({
  collection: Metricas,
  description: 'Metricas' + 'PPNA' +'-porLote',
  folder: 'PPNA_TFF',
  fileFormat: 'CSV'
})
*/