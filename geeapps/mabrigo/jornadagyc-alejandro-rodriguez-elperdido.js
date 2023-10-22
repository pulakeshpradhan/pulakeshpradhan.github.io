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
//VARIACIONES EXTRAS:
//FILTRO MANUAL DE IMAGENES DE MALA CALIDAD
//CAMBIO ECUACION PPNA (VALOR MINIMO DE PPNA)
var potreros = ee.FeatureCollection('users/mabrigo/gyc-extension/alejandro-rodriguez-el-perdido');
var usos_potrero = ee.FeatureCollection('users/mabrigo/gyc-extension/tabla-usos-alejandro-rodriguez');
var enmascarar = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.11794195333974, -34.29842028228168],
                  [-55.11944399038808, -34.29836710282568],
                  [-55.11932200723987, -34.295702413511776],
                  [-55.119525855125005, -34.29548082505361],
                  [-55.11971897438689, -34.29534787146986],
                  [-55.11969751650196, -34.29506423716992],
                  [-55.11992282205921, -34.29455901079439],
                  [-55.11991209322315, -34.294293100955265],
                  [-55.12001669937473, -34.29382332484924],
                  [-55.120200182454084, -34.29354710487156],
                  [-55.120404030339216, -34.29342079628156],
                  [-55.12052741206597, -34.293221361260436],
                  [-55.12054886962602, -34.29305959698501],
                  [-55.12053298110516, -34.29292756020752],
                  [-55.120109294652515, -34.29281611477852],
                  [-55.120034295928086, -34.29274012416532],
                  [-55.119873775757235, -34.29256911987487],
                  [-55.120131267822664, -34.29241400223032],
                  [-55.120451791033474, -34.292665514702],
                  [-55.12090106180994, -34.29274861279181],
                  [-55.12130473437929, -34.292713157713024],
                  [-55.12153406313745, -34.292555824087984],
                  [-55.12212414912073, -34.29177136893776],
                  [-55.12234811374563, -34.291731481344065],
                  [-55.12254525593607, -34.291633977733994],
                  [-55.12273032857202, -34.29154755412615],
                  [-55.12293954066126, -34.29147442637671],
                  [-55.12309644982885, -34.29152539441008],
                  [-55.12329895666925, -34.291589657942914],
                  [-55.123305662401016, -34.29175918067744],
                  [-55.12323726616892, -34.29189324762983],
                  [-55.12320507935373, -34.29206831044936],
                  [-55.12346123011915, -34.29219572889365],
                  [-55.123454524792116, -34.292274396105384],
                  [-55.122772944736816, -34.29204918834297],
                  [-55.12259830354143, -34.291959153113105],
                  [-55.12245614646364, -34.291910401615546],
                  [-55.12230862496782, -34.291959153113105],
                  [-55.121954573377856, -34.29222507033944],
                  [-55.121887078884924, -34.2924061232307],
                  [-55.121854892376746, -34.2925745366758],
                  [-55.121849527958716, -34.29270306249889],
                  [-55.121651044491614, -34.29286704343599],
                  [-55.121140462378904, -34.29301349520994],
                  [-55.12071130893652, -34.29310213326655],
                  [-55.12064655750992, -34.293380649156326],
                  [-55.12051781147721, -34.293504741867075],
                  [-55.120303234756015, -34.29373519927219],
                  [-55.12021203964951, -34.29412298674818],
                  [-55.120072564780735, -34.294960601587405],
                  [-55.12004037824937, -34.29513898132208],
                  [-55.12002428501847, -34.29528412254349],
                  [-55.1202281329036, -34.29545474610755],
                  [-55.12003615828535, -34.29561196478654],
                  [-55.11952117415449, -34.2957980988401],
                  [-55.11963919135115, -34.2963919523493],
                  [-55.119725022039624, -34.29662240183413],
                  [-55.11977866621992, -34.296994665051095],
                  [-55.11962846251509, -34.29724283961256],
                  [-55.119735750875684, -34.297455560081666],
                  [-55.12013271780989, -34.297526466785],
                  [-55.119950327596875, -34.29772145991053],
                  [-55.11978939505598, -34.29765941669242],
                  [-55.11960700484297, -34.2976682800121],
                  [-55.11960700484297, -34.29784554620928],
                  [-55.11992063094154, -34.29823968933225],
                  [-55.120124478826675, -34.29819537302597],
                  [-55.12016202975288, -34.298368206488256],
                  [-55.120387335310134, -34.298722735554385],
                  [-55.12031223345772, -34.29879364118804],
                  [-55.12004401255623, -34.29889113633659],
                  [-55.119893808851394, -34.29898863137197],
                  [-55.119872351179275, -34.29911714738207],
                  [-55.11972384930752, -34.29918891537432],
                  [-55.11975551909323, -34.29947148872262],
                  [-55.11962140864249, -34.29955568840534],
                  [-55.1195516712081, -34.2997329506194],
                  [-55.11962677306052, -34.30010520005122],
                  [-55.118156922520356, -34.30033120782993]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.12968732095468, -34.29330169602785],
                  [-55.12966586328256, -34.293673973960104],
                  [-55.12966049886453, -34.29398863616401],
                  [-55.12949956632364, -34.29407284134263],
                  [-55.129301082856536, -34.29392659018892],
                  [-55.12927426076639, -34.29369170143954],
                  [-55.129322540528655, -34.29348340331992],
                  [-55.12939227796304, -34.29331055980731],
                  [-55.129558574921965, -34.29326624090064]]]),
            {
              "system:index": "1"
            })]);
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
var filtro1 = ee.Filter.date('2018-12-01', '2019-02-25');//filtra por fechas inicio y fin
var filtro2 = ee.Filter.date('2019-02-26', '2019-04-30');//filtro extra por nubosidad
var filtro3 = ee.Filter.date('2019-02-05', '2020-08-29');//filtro extra por nubosidad
var filtro4 = ee.Filter.date('2020-08-31', '2022-04-30');//filtro extra por nubosidad
var allfilter = ee.Filter.or(filtro1,filtro2,filtro3,filtro4); // Create joint Filter
// // Importa la Coleccion Sentinel SR (2A) y aplica filtros	
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')	
    .filter(allfilter)
  //.filterDate('2018-12-01', '2022-03-28')	//filtra por fechas inicio y fin
    .filterBounds(potreros)	//seleciona por los potreros
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1));	//prefiltro por porcentaje de nubes
//print('S2',S2);//imprime en la consola
// FILTRO MANUAL DE IMAGENES CON NUBOSIDAD
var filtro5 = ee.Filter.date('2017-07-01', '2017-11-16');//filtra por fechas inicio y fin
var filtro6 = ee.Filter.date('2017-11-18', '2018-01-10');//filtro extra por nubosidad
var filtro7 = ee.Filter.date('2018-01-12', '2018-03-03');//filtro extra por nubosidad
var filtro8 = ee.Filter.date('2018-03-05', '2018-03-18');//filtro extra por nubosidad
var filtro9 = ee.Filter.date('2018-03-20', '2018-10-12');//filtro extra por nubosidad
var filtro10 = ee.Filter.date('2018-10-14', '2018-11-30');//filtro extra por nubosidad
var allfilter2 = ee.Filter.or(filtro5,filtro6,filtro7,filtro8,filtro9,filtro10); // Create joint Filter
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
      var f = image.expression('min(max(((-1.06*(EVI**2))+2.28*EVI-0.26),0.20),0.95)', {	
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
value: 'Predio de Alejandro Rodriguez: Tasa de crecimiento del forraje (Kg/ha*dia)',
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