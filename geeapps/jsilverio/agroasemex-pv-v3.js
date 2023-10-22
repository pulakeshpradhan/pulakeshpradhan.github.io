/*Variables para las colecciones.*/
//Area de interes
var NomEdoSeleccionado = ee.FeatureCollection('users/jsilverio/Estados_Republica')
                .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', '28'))); //01
var MunicipiosxEstado = ee.FeatureCollection('users/jsilverio/MUNICIPIOS_2018')
                .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', '28'))); //01                
//print(MunicipiosxEstado.limit(100));
//Capa de predios.             //users/jsilverio/VERSION_FINAL_16_03_ACTUAL    //users/jsilverio/VERSION_FINAL_15_04_ACTUAL   //users/jsilverio/SIOF_20_04_TABLERO_FINAL
var Predios = ee.FeatureCollection('users/jsilverio/VGeoOperacionPV_2021_2021')
              .filter(ee.Filter.or(ee.Filter.eq('Cve_EdoGeo', '28')))
              .filter(ee.Filter.or(ee.Filter.eq('ClaveAseg', '0554')));   //0611
//print('Predios', Predios);
var Mexico = ee.FeatureCollection("USDOS/LSIB/2013")
              .filter(ee.Filter.or(ee.Filter.eq('name', 'MEXICO')));
var   Estado = ee.FeatureCollection("users/pbarrera/Tabasco_Mun_WGS84");
// Imagenes de modis promedio NDVI 2001-2020
var PROM_001 = ee.Image('users/jsilverio/NDVI_PROM_001');
var PROM_017 = ee.Image('users/jsilverio/NDVI_PROM_017');
var PROM_033 = ee.Image('users/jsilverio/NDVI_PROM_033');
var PROM_049 = ee.Image('users/jsilverio/NDVI_PROM_049');
var PROM_065 = ee.Image('users/jsilverio/NDVI_PROM_065');
var PROM_081 = ee.Image('users/jsilverio/NDVI_PROM_081');
var PROM_097 = ee.Image('users/jsilverio/NDVI_PROM_097');
var PROM_113 = ee.Image('users/jsilverio/NDVI_PROM_113');
var PROM_129 = ee.Image('users/jsilverio/NDVI_PROM_129');
var PROM_145 = ee.Image('users/jsilverio/NDVI_PROM_145');
var PROM_161 = ee.Image('users/jsilverio/NDVI_PROM_161');
var PROM_177 = ee.Image('users/jsilverio/NDVI_PROM_177');
var PROM_193 = ee.Image('users/jsilverio/NDVI_PROM_193');
var PROM_209 = ee.Image('users/jsilverio/NDVI_PROM_209');
var PROM_225 = ee.Image('users/jsilverio/NDVI_PROM_225');
var PROM_241 = ee.Image('users/jsilverio/NDVI_PROM_241');
var PROM_257 = ee.Image('users/jsilverio/NDVI_PROM_257');
var PROM_273 = ee.Image('users/jsilverio/NDVI_PROM_273');
var PROM_289 = ee.Image('users/jsilverio/NDVI_PROM_289');
var PROM_305 = ee.Image('users/jsilverio/NDVI_PROM_305');
var PROM_321 = ee.Image('users/jsilverio/NDVI_PROM_321');
var PROM_337 = ee.Image('users/jsilverio/NDVI_PROM_337');
var PROM_353 = ee.Image('users/jsilverio/NDVI_PROM_353');
// Creando la colección de imágenes MODIS NDVI promedio 2001-2020
var ColeccionModis = ee.ImageCollection([PROM_001, PROM_017, PROM_033, PROM_049, PROM_065, PROM_081, PROM_097, PROM_113, PROM_129, PROM_145,
                                        PROM_161, PROM_177, PROM_193, PROM_209, PROM_225, PROM_241, PROM_257, PROM_273,  PROM_289, PROM_305,
                                        PROM_321, PROM_337, PROM_353]);
// Imagenes de modis promedio menos una desviación NDVI 2001-2020
var PROM_001_1 = ee.Image('users/jsilverio/NDVI_PD_001_WGS84').rename('NDVI2');
var PROM_017_1 = ee.Image('users/jsilverio/NDVI_PD_017_WGS84').rename('NDVI2');
var PROM_033_1 = ee.Image('users/jsilverio/NDVI_PD_033_WGS84').rename('NDVI2');
var PROM_049_1 = ee.Image('users/jsilverio/NDVI_PD_049_WGS84').rename('NDVI2');
var PROM_065_1 = ee.Image('users/jsilverio/NDVI_PD_065_WGS84').rename('NDVI2');
var PROM_081_1 = ee.Image('users/jsilverio/NDVI_PD_081_WGS84').rename('NDVI2');
var PROM_097_1 = ee.Image('users/jsilverio/NDVI_PD_097_WGS84').rename('NDVI2');
var PROM_113_1 = ee.Image('users/jsilverio/NDVI_PD_113_WGS84').rename('NDVI2');
var PROM_129_1 = ee.Image('users/jsilverio/NDVI_PD_129_WGS84').rename('NDVI2');
var PROM_145_1 = ee.Image('users/jsilverio/NDVI_PD_145_WGS84').rename('NDVI2');
var PROM_161_1 = ee.Image('users/jsilverio/NDVI_PD_161_WGS84').rename('NDVI2');
var PROM_177_1 = ee.Image('users/jsilverio/NDVI_PD_177_WGS84').rename('NDVI2');
var PROM_193_1 = ee.Image('users/jsilverio/NDVI_PD_193_WGS84').rename('NDVI2');
var PROM_209_1 = ee.Image('users/jsilverio/NDVI_PD_209_WGS84').rename('NDVI2');
var PROM_225_1 = ee.Image('users/jsilverio/NDVI_PD_225_WGS84').rename('NDVI2');
var PROM_241_1 = ee.Image('users/jsilverio/NDVI_PD_241_WGS84').rename('NDVI2');
var PROM_257_1 = ee.Image('users/jsilverio/NDVI_PD_257_WGS84').rename('NDVI2');
var PROM_273_1 = ee.Image('users/jsilverio/NDVI_PD_273_WGS84').rename('NDVI2');
var PROM_289_1 = ee.Image('users/jsilverio/NDVI_PD_289_WGS84').rename('NDVI2');
var PROM_305_1 = ee.Image('users/jsilverio/NDVI_PD_305_WGS84').rename('NDVI2');
var PROM_321_1 = ee.Image('users/jsilverio/NDVI_PD_321_WGS84').rename('NDVI2');
var PROM_337_1 = ee.Image('users/jsilverio/NDVI_PD_337_WGS84').rename('NDVI2');
var PROM_353_1 = ee.Image('users/jsilverio/NDVI_PD_353_WGS84').rename('NDVI2');
// Creando la colección de imágenes MODIS menos una desviación NDVI promedio 2001-2020
var ColeccionModisM1Desv = ee.ImageCollection([PROM_001_1, PROM_017_1, PROM_033_1, PROM_049_1, PROM_065_1, PROM_081_1, PROM_097_1, PROM_113_1, 
                                               PROM_129_1, PROM_145_1, PROM_161_1, PROM_177_1, PROM_193_1, PROM_209_1, PROM_225_1, PROM_241_1,
                                               PROM_257_1, PROM_273_1, PROM_289_1, PROM_305_1, PROM_321_1, PROM_337_1, PROM_353_1]);
var StartTime = '2021-01-01';
var EndTime = '2021-07-07';
var Dias = 20;
var DiasAntes = 15;  //Para determinar la fecha Despues (para la composición) = FechaFin - 15 días.
var DiasAntesInicio = 35;  //Para determinar la fecha Inicio (para la composición) = FechaFin - 35 días.
//var ValNDVI = 0.4;
//*********************    *************************************************************************************
var FechaFinal = ee.Date(EndTime);
FechaFinal = FechaFinal.advance(-Dias, 'day');
//print(FechaFinal);
var ModisM1Desv = ColeccionModisM1Desv
                  .filterDate(StartTime, FechaFinal)
                  .filterBounds(NomEdoSeleccionado)
                  .map(function(image) {
                        return image.addBands(image.metadata('system:time_start'));
                      })
                    .mosaic()
                    .select("NDVI2")
                    .clip(NomEdoSeleccionado);
//*********************    *************************************************************************************
/* Para NDVI MODIS         */
var MOD_NDVI = ee.ImageCollection("MODIS/006/MOD13Q1")
                .filterBounds(NomEdoSeleccionado) 
                .filterDate(StartTime, EndTime) 
                .select("NDVI");
var MODIS_NDVI = MOD_NDVI.map( function(img){
  return img.multiply(0.0001)
  .copyProperties(img,['system:time_start','system:time_end']);
});
var MODIS_NDVI_LAYER = MODIS_NDVI
                      .map(function(image) {
                        return image.addBands(image.metadata('system:time_start'));
                      })
                    .mosaic()
                    .select("NDVI")
                    .clip(NomEdoSeleccionado);
                    //ee.Image(MODIS_NDVI.median());   //Otra opción.
/*FIN  Para NDVI MODIS         */
//Colección de imágenes Sentinel-2, Mosaico para la capa
var S2_Layer = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterDate(StartTime, EndTime)   //'2021-03-01', '2021-03-18'    //
                //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
                .filterBounds(NomEdoSeleccionado)
                .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                .mosaic()
                .clip(NomEdoSeleccionado);
//Colección de imágenes Sentinel-2, para el NDVI
var S_2 = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterDate(StartTime, EndTime)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                .filterBounds(NomEdoSeleccionado);
//********************************* Para Comparativo Sentinel-Modis ********************************************
var S_2_Predio = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterDate(StartTime, FechaFinal)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                .filterBounds(NomEdoSeleccionado)
                .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                .mosaic()
                .clip(NomEdoSeleccionado);
//********************************* Para Comparativo Sentinel-Modis ********************************************
//Colección de imágenes Sentinel-2, para RGB, Vegetación y Agricultura
var S2_RGB = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(NomEdoSeleccionado)
                  .filterDate(StartTime, EndTime)
                  //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                  .mosaic()
                  .clip(NomEdoSeleccionado);
//Colección de imágenes Sentinel-1, para Áreas inundadas y Composición.
  var FechaFin = ee.Date(EndTime);
  var BfInicio = FechaFin.advance(-DiasAntesInicio, 'day');
  var BfFin = FechaFin.advance(-DiasAntes, 'day');
  var AfInicio = FechaFin.advance(-DiasAntes, 'day');//.advance(20, 'day');
  var AfFin = FechaFin;
  //print(BfInicio);
  //print(BfFin);
  //print(AfInicio);
  //print(AfFin);
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(ee.Filter.eq('instrumentMode', 'IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                    .filterMetadata('resolution_meters', 'equals' , 10)
                    .filterBounds(NomEdoSeleccionado)
                    .select('VH');
var beforeVH = collectionVH.filterDate(BfInicio, BfFin).mosaic();
var afterVH = collectionVH.filterDate(AfInicio, AfFin).mosaic();
//Map.addLayer(beforeVH.addBands(afterVH).addBands(beforeVH), {min: -25, max: -8}, 'BVH/AVV/AVH Composición', 0);
//Apply filter to reduce speckle
var SMOOTHING_RADIUS = 50;
var beforeVH_filtered = beforeVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var afterVH_filtered = afterVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
// Calculate difference between before and after
var differenceVH = afterVH_filtered.divide(beforeVH_filtered);
//Apply Threshold
var DIFF_UPPER_THRESHOLD = 1.25;
var differenceVH_thresholded = differenceVH.gt(DIFF_UPPER_THRESHOLD);
//Map.addLayer(beforeVH.addBands(afterVH).addBands(beforeVH), {min: -25, max: -8}, 'BVH/AVV/AVH Composición', 0);
//Map.addLayer(differenceVH_thresholded.updateMask(differenceVH_thresholded), {palette:"0000FF"}, 'Áreas Inundadas', 0);
//Funcion para quitar los Map Layars
var removeLayer = function(name) {
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
    //print('Layer '+name+' not found');
  }
};
//Función para ocultar la simbología de temperatura.
function LayersCargados() 
{
  Map.layers().forEach(function(layer) {
    if (layer.getName() === 'Temp de la Superficie Terrestre')
    {
      if(layer.getShown() === 0)
      {
          Leyenda.style().set('shown', false);
      } 
      else
      {
        Leyenda.style().set('shown', true);
      }
    }
  });
}
// Function to calculate and add an NDVI band para la gráfica
var ndvi_ = S_2.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
});
var ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));    //NDVI de la capa ee.Image('users/jsilverio/Predio_20202021_0762_3_1'); //
var CapaNDVI = ndvi_;   //NDVI para gráfica
var unionNDVI = MODIS_NDVI.merge(ColeccionModis);
var NDVI_MODIS2 = CapaNDVI.merge(unionNDVI);   //Union del ndvi para la gráfica
var NDVI_MODIS = NDVI_MODIS2.merge(ColeccionModisM1Desv); 
////Diferencias de NDVI entre sentinel y Modis - una desviación ************************************************************
var ndvi_predio = S_2_Predio.select().addBands(S_2_Predio.normalizedDifference(['B8', 'B4']));
var PrediosVigentes = Predios
  .map(function(feature){
    var FechaFin = ee.Date(feature.get('FinVigen_1'));
    FechaFin = ee.Number(FechaFin);
    return feature.set('FechaFin', FechaFin);
    //}
  });
  //FinVigen_1  //InicioVi_1
  //print('PrediosVigentes', PrediosVigentes);
PrediosVigentes = PrediosVigentes.filter(ee.Filter.gte('FechaFin', FechaFin));   //01
//print('ndvi_predio', ndvi_predio);
//***************************************************Comentado para agilizar los filtros.***********************
//var PrediosNDVI = ndvi_predio.reduceRegions({
//  collection: PrediosVigentes,
//  reducer: ee.Reducer.mean(),
//  scale: 10
//});
//
//PrediosNDVI = PrediosNDVI
//  .map(function(feature){
//    var NDVISentinel = ee.Number.parse(feature.get('mean'));
//    return feature.set('NDVISentinel', NDVISentinel);
//  });
//
//PrediosNDVI = ModisM1Desv.reduceRegions({
//  collection: PrediosNDVI,
//  reducer: ee.Reducer.mean(),
//  scale: 10
//});
//
//var PrediosARevisar = PrediosNDVI
//                      .map(function(feature){
//                        return ee.Algorithms.If(ee.Number.parse(feature.get('NDVISentinel')).lt(ee.Number.parse(feature.get('mean'))),
//                                feature.set('Valor', 1), feature.set('Valor', 0)
//                                );
//                      });
//
//PrediosNDVI = PrediosARevisar.filter(ee.Filter.eq('Valor', 1));
//***************************************************Comentado para agilizar los filtros.***********************
//FIN Diferencias de NDVI entre sentinel y Modis - una desviación ************************************************************
//*******************Cálculo de Superficies totales**************************
//print(Predios.limit(5));
var SupTotalPredios = Predios.aggregate_sum('Superficie');  //SEPERFICIE
var SumaAsegTotalPredios = Predios.aggregate_sum('PrimaRease');  //PRIMA_REAS
var SupTotalPrediosVigentes = PrediosVigentes.aggregate_sum('Superficie');
var SumaAsegTotalPrediosVigentes = PrediosVigentes.aggregate_sum('PrimaRease');
//***************************************************Comentado para agilizar los filtros.***********************
//var SupTotalPrediosSeguimiento = PrediosNDVI.aggregate_sum('Superficie');
//var SumaAsegTotalPrediosSeguimiento = PrediosNDVI.aggregate_sum('PrimaRease');
//***************************************************Comentado para agilizar los filtros.***********************
//*******************FIN Cálculo de Superficies totales**************************
//**********Colección de imágenes de temperatura. *************************
var temp = ee.ImageCollection('MODIS/006/MOD11A1')
    .filterBounds(NomEdoSeleccionado)
    .filterDate(StartTime, EndTime)
    .select("LST_Day_1km")
    .map(function(img){
      var mulitplied = img.multiply(0.02);
      mulitplied = mulitplied.subtract(273.15);
      //mulitplied = mulitplied - 273.15;
      var unmasked = img.gt(-999).reduceRegion(ee.Reducer.count(), NomEdoSeleccionado, 1000);
      return mulitplied.set('count', unmasked.get('LST_Day_1km'))
      .copyProperties(img,['system:time_start','system:time_end']);
    });
var Temp = temp;
//print(temp)
var ModisImagen = ee.Image(temp.median());
var TempModis = ModisImagen.clip (NomEdoSeleccionado);
//**********FIN Colección de imágenes de temperatura. *************************
//*****************Propiedades del predio. ******************************
var Ciclo;
var ClaveAseg;
var ClaveTipoP;
var Constancia;
var Cve_EdoGeo;
var CveMunicip;
var CveRegionP;
var EdoGeo;
var FechaAcept;
var FinVigenci;
var HAS_POLY;
var ID_AGROASE;
var Inciso;
var InicioVige;
var MunicipioP;
var NomTipoCon;
var NombreCult;
var NombreFond;
var NombreMone;
var NombreSoci;
var NombreSubR;
var PRIMA_FOND;
var PRIMA_REAS;
var PRIMA_TOTA;
var Ramo;
var RegionPred;
var SEPERFICIE;
var SUMAASEGTO;
var Shape_Area;
var Shape_Leng;
var UnidadRies;
var VERT;
var fechaPago;
var FechaAceptacion;
var InicioVigencia;
var FinVigencia;
var DatosPredio;   //Variable para agregar los datos al panel.
var SuperficiesTotales;
//**************** Constants used to visualize the data on the map.******************
var NDVI_STYLE = {  min: -1,   max: 1,   palette: ['FF0000', 'FFFF00', '0B6121'] };
var RGB_STYLE = {  min:0,   max: 3000,  bands: ['B4', 'B3', 'B2'] };
var VEGETACION_STYLE = {  min:0,   max: 3000,  bands: ['B8', 'B4', 'B3'] };
var AGRICULTURA_STYLE = {  min:0,   max: 3000,  bands: ['B11', 'B8A', 'B2'] };
var POPULATION_STYLE = {  min: 0,  max: 1,  palette: ['lightyellow', 'steelblue', 'darkblue'] };
var Predios_STYLE = {color: '003727', fillColor: '00000000'};
var Municipios_STYLE = {color: 'GRAY', fillColor: '00000000'};
var Estados_STYLE = {color: 'BLACK', fillColor: '00000000'};
var PrediosVigentes_STYLE = {color: 'GREEN', fillColor: '00000000'};
var PrediosNDVI_STYLE = {color: 'c41a0e', fillColor: 'RED'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: 'BLUE'};
var Temp_STYLE = {  min: -5,  max: 35,  palette: [
        //'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
        //'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
        //'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
        //'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
        //'ff0000', 'de0101', 'c21301', 'a71001', '911003'
        'd1f2ff', '89ddec', '4384d4', '0602ff', '006847', '1dcc00', 'f39703', 'ff0000'
      ],
    };
// Configure our map with a minimal set of controls.*******
Map.setControlVisibility(true);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
//Map.setCenter(-98.4933, 26.0822, 4);
var centre = Predios.geometry().centroid().coordinates();
Map.setCenter(ee.Number(centre.get(0)).getInfo(), 
              ee.Number(centre.get(1)).getInfo(), 12);
//Agregamos las capas de información al mapa
Map.addLayer(NomEdoSeleccionado.style(Estados_STYLE), {}, 'Estado', 0); 
Map.addLayer(MunicipiosxEstado.style(Municipios_STYLE), {}, 'Municipios', 0); 
Map.addLayer((beforeVH.addBands(afterVH).addBands(beforeVH)).clip(NomEdoSeleccionado), {min: -25, max: -8}, 'BVH/AVV/AVH Composición', 0);
Map.addLayer((differenceVH_thresholded.updateMask(differenceVH_thresholded)).clip(NomEdoSeleccionado), {palette:"0000FF"}, 'Áreas Inundadas', 0);
Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), RGB_STYLE,'RGB_SENTINEL2', 0);
Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), VEGETACION_STYLE, 'Vegetación_SENTINEL2', 0);
Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), AGRICULTURA_STYLE, 'Agricultura_SENTINEL2', 0);
Map.addLayer(ndvi_Layer.clip(NomEdoSeleccionado), NDVI_STYLE, 'NDVI_SENTINEL2', 0);   
Map.addLayer(MODIS_NDVI_LAYER.clip(NomEdoSeleccionado), NDVI_STYLE, 'NDVI_MODIS', 0);
Map.addLayer(TempModis.clip(NomEdoSeleccionado), Temp_STYLE, 'Temp de la Superficie Terrestre', 0);
Map.addLayer(Predios.style(Predios_STYLE), {}, 'PV 2021/2021 AGROASEMEX', 1); //PrediosTODOS
Map.addLayer(PrediosVigentes.style(PrediosVigentes_STYLE), {}, 'PV 2021/2021 AGROASEMEX VIGENTES', 0);
//Map.addLayer(PrediosNDVI.style(PrediosNDVI_STYLE), {}, 'PV 2021/2021 AGROASEMEX SEGUIMIENTO', 0);
// Create the application title bar.
//Map.add(ui.Label('EXPLORACIÓN NDVI', {fontWeight: 'bold', fontSize: '24px'}));
/*              *******************PANEL IZQUIERDO**************************                     */
//Create a panel to hold our widgets.
var panel = ui.Panel();
//ESTADOS
panel.ESTADOS = {
  "Selecciona un estado":{ Nombre: 'Selecciona un estado', CveEdo: '00', Coord: [24.2910115597328, -98.640894391325]},
  "Aguascalientes":     { Nombre: 'Aguascalientes', CveEdo: '01', Coord: [22.006, -102.3619]},
  "Baja California":    { Nombre: 'Baja California', CveEdo: '02', Coord: [30.5837450116453, -115.110019168663]},
  "Baja California Sur":{ Nombre: 'Baja California Sur', CveEdo: '03', Coord: [25.9253227553422, -112.078921514132]},
  "Campeche":           { Nombre: 'Campeche', CveEdo: '04', Coord: [18.8402984747382, -90.3602582194405]},
  "Coahuila":           { Nombre: 'Coahuila', CveEdo: '05', Coord: [27.2954429748556, -102.04403868233]},
  "Colima":             { Nombre: 'Colima', CveEdo: '06', Coord: [19.1409936912956, -103.913372977784]},
  "Chiapas":            { Nombre: 'Chiapas', CveEdo: '07', Coord: [16.4852398660796, -92.472911819264]},
  "Chihuahua":          { Nombre: 'Chihuahua', CveEdo: '08', Coord: [28.8085380501111, -106.468939535164]},
  "Ciudad de México":   { Nombre: 'Ciudad de México', CveEdo: '09', Coord: [19.276889636548, -99.1394111886253]},
  "Durango":            { Nombre: 'Durango', CveEdo: '10', Coord: [24.9236104011588, -104.913398569489]},
  "Guanajuato":         { Nombre: 'Guanajuato', CveEdo: '11', Coord: [20.9054320440463, -101.01261435267]},
  "Guerrero":           { Nombre: 'Guerrero', CveEdo: '12', Coord: [17.6680108718196, -99.9218252516674]},
  "Hidalgo":            { Nombre: 'Hidalgo', CveEdo: '13', Coord: [20.4795566791773, -98.8871130679931]},
  "Jalisco":            { Nombre: 'Jalisco', CveEdo: '14', Coord: [20.5807840709853, -103.613210997185]},
  "México":             { Nombre: 'México', CveEdo: '15', Coord: [19.3559570441337, -99.6453738063359]},
  "Michoacán":          { Nombre: 'Michoacán', CveEdo: '16', Coord: [19.2070960823163, -101.878113286647]},
  "Morelos":            { Nombre: 'Morelos', CveEdo: '17', Coord: [18.7420779450166, -99.0749623272703]},
  "Nayarit":            { Nombre: 'Nayarit', CveEdo: '18', Coord: [21.8041401702672, -104.840853461615]},
  "Nuevo Leon":         { Nombre: 'Nuevo Leon', CveEdo: '19', Coord: [25.5725902806682, -99.9689699164252]},
  "Oaxaca":             { Nombre: 'Oaxaca', CveEdo: '20', Coord: [16.961446823539, -96.4301309572653]},
  "Puebla":             { Nombre: 'Puebla', CveEdo: '21', Coord: [19.0060693373887, -97.9000945497052]},
  "Querétaro":          { Nombre: 'Querétaro', CveEdo: '22', Coord: [20.8551760567896, -99.8457964069208]},
  "Quintana Roo":       { Nombre: 'Quintana Roo', CveEdo: '23', Coord: [19.5904421988879, -88.1271556851786]},
  "San Luis Potosi":    { Nombre: 'San Luis Potosi', CveEdo: '24', Coord: [22.5854598218149, -100.416508698507]},
  "Sinaloa":            { Nombre: 'Sinaloa', CveEdo: '25', Coord: [25.0014657647422, -107.509116806931]},
  "Sonora":             { Nombre: 'Sonora', CveEdo: '26', Coord: [29.6923909612983, -110.798908021187]},
  "Tabasco":            { Nombre: 'Tabasco', CveEdo: '27', Coord: [17.9376914025206, -92.5939869781394]},
  "Tamaulipas":         { Nombre: 'Tamaulipas', CveEdo: '28', Coord: [24.2910115597328, -98.640894391325]},
  "Tlaxcala":           { Nombre: 'Tlaxcala', CveEdo: '29', Coord: [19.4285756076831, -98.1685494270701]},
  "Veracruz":           { Nombre: 'Veracruz', CveEdo: '30', Coord: [19.3929510769528, -96.4185563348002]},
  "Yucatan":            { Nombre: 'Yucatan', CveEdo: '31', Coord: [20.7470975002581, -88.9211093413518]},
  "Zacatecas":          { Nombre: 'Zacatecas', CveEdo: '32', Coord: [23.2890189109144, -102.660557257437]},
};
var CveEdoSeleccionado;
var NombreEstado;
var CveFondo;
var Constancia;
var Inciso;
//Valiables 
panel.style().set('width', '300px');
panel.SECTION_STYLE = {margin: '5px 0 0 0'};
panel.SECTION_STYLE_FONDO = {margin: '2px 0 0 0'};
panel.SECTION_PREDIOS_STYLE = {fontWeight: 'bold', margin: '2px 0 0 7px'};
panel.HELPER_TEXT_STYLE = {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'gray'};
panel.TEXT_STYLE = {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'gray', width: '25%'}; //, position : 'bottom-center'
//Variable de imágenes Sentinel2
panel.COLLECTION_ID =  'COPERNICUS/S2_SR';
panel.COLLECTION_ID_TEMP =  'MODIS/006/MOD11A1';
panel.COLLECTION_ID_NDVI_MODIS =  'MODIS/006/MOD13Q1';
panel.IMAGE_COUNT_LIMIT = 100;
panel.COLLECTION_ID_EDOS = 'users/jsilverio/Estados_Republica';
panel.COLLECTION_ID_MUN = 'users/jsilverio/MUNICIPIOS_2018';
panel.COLLECTION_ID_Predios = 'users/jsilverio/VGeoOperacionPV_2021_2021';
panel.COLLECTION_ID_Comparativo =  'COPERNICUS/S2_SR';
var filtered; //Filtro NDVI Sentinel 2
var filtroRGB; //Filtro RGB Sentinel 2
var filtroTEMP; //Filtro Temperatura MODIS
var filtroNDVI_MOD; //Filtro Temperatura MODIS
var ModisPredio;
var SentinelPredio;
//var NomEdoSeleccionado;
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Sentinel 2',
    style: {fontWeight: 'bold', fontSize: '24px', margin: '5px 5px'}
  }),
  ui.Label('Permite realizar filtros por estado, y fechas de inicio ' +
               'y fin para las imágenes Sentinel-2 ' +
               'y Modis.')
]);
panel.add(intro);
 /* The image picker section. */
  panel.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Selecciona un estado.',
      items: Object.keys(panel.ESTADOS),
      //onChange: panel.refreshMapLayer()
    onChange: function() {
        // Refresh the map layer.
         var option = panel.ESTADOS[panel.picker.select.getValue()];
         CveEdoSeleccionado = option.CveEdo;
         NombreEstado = option.Nombre;
         //print('CveEdoSeleccionado', CveEdoSeleccionado);
         Map.setCenter(option.Coord[1], option.Coord[0], 10);
        //panel.refreshMapLayer();
      }
    }),
  };//
  var Selecciona_Estado = ui.Panel({
    widgets: [
      ui.Label('Selecciona un estado:', {fontWeight: 'bold'}),
      ui.Panel([
        panel.picker.select,
       //panel.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE
  });
  panel.add(Selecciona_Estado);
panel.picker.select.setValue(panel.picker.select.items().get(0));
panel.Filtro_Fondo = {
    Clave_Fondo: ui.Textbox('0000', '0554'),  //, {width: '50%'}   //0611
    Label_Fondo: ui.Label('Clave Fondo: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
  };
 panel.Filtro_Fondo.Clave_Fondo.style().set('width', '30%');
  /* The panel for the filter control widgets. */ // 2   *****************
  var FiltroFondo = ui.Panel({
    widgets: [
      ui.Label('Selecciona un Fondo:', {fontWeight: 'bold'}),
      ui.Panel([
        panel.Filtro_Fondo.Label_Fondo,
        panel.Filtro_Fondo.Clave_Fondo,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE_FONDO
  });
  panel.add(FiltroFondo);
  panel.Filtro_Constancia = {
    Constancia: ui.Textbox('', ''),  //, {width: '50%'}
    Label_Constancia: ui.Label('Constancia: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
  };
 panel.Filtro_Constancia.Constancia.style().set('width', '30%');
 //
  /* The panel for the filter control widgets. */ // 2   *****************
  var FiltroConstancia = ui.Panel({
    widgets: [
      //ui.Label('Selecciona :', {fontWeight: 'bold'}),
      ui.Panel([
        panel.Filtro_Constancia.Label_Constancia,
        panel.Filtro_Constancia.Constancia,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE_FONDO
  });
  panel.add(FiltroConstancia);
  panel.Filtro_Inciso = {
    Inciso: ui.Textbox('', ''),  //, {width: '50%'}
    Label_Inciso: ui.Label('Inciso: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
  };
 panel.Filtro_Inciso.Inciso.style().set('width', '30%');
 panel.Filtro_Inciso.Inciso.style().set('position', 'bottom-right');
  /* The panel for the filter control widgets. */ // 2   *****************
  var FiltroInciso = ui.Panel({
    widgets: [
      //ui.Label('Selecciona un Ffghf:', {fontWeight: 'bold'}),
      ui.Panel([
        panel.Filtro_Inciso.Label_Inciso,
        panel.Filtro_Inciso.Inciso,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE_FONDO
  });
  panel.add(FiltroInciso);
panel.filters = {
    mapCenter: ui.Checkbox({label: 'Aplicar filtro en el mapa.', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2021-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2021-07-07'),
    applyButton: ui.Button('Aplicar filtro', applyFilters),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */ // 2   *****************
  var filtros = ui.Panel({
    widgets: [
      ui.Label('Selecciona las fechas:', {fontWeight: 'bold'}),
      ui.Label('Fecha Inicio', panel.HELPER_TEXT_STYLE), panel.filters.startDate,
      ui.Label('Fecha Fin', panel.HELPER_TEXT_STYLE), panel.filters.endDate,
      panel.filters.mapCenter,
      ui.Panel([
        panel.filters.applyButton,
        panel.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE
  });
  panel.add(filtros);
  // 2   *************************************************************
 function applyFilters() {
    panel.setLoadingMode(true);
    filtered = ee.ImageCollection(panel.COLLECTION_ID);
    filtroRGB = ee.ImageCollection(panel.COLLECTION_ID);
    filtroTEMP = ee.ImageCollection(panel.COLLECTION_ID_TEMP);
    filtroNDVI_MOD = ee.ImageCollection(panel.COLLECTION_ID_NDVI_MODIS);
    ModisPredio = ColeccionModisM1Desv;
    SentinelPredio = ee.ImageCollection(panel.COLLECTION_ID);
    //print('NomEdoSeleccionado', CveEdoSeleccionado);
    var Fondo = panel.Filtro_Fondo.Clave_Fondo.getValue();
    var Constancia = panel.Filtro_Constancia.Constancia.getValue();
    var Inciso = panel.Filtro_Inciso.Inciso.getValue();
    var centre;
    //Validamos si hay un estado seleccionado o dejamos el area de interes que se tiene por default.
    if (CveEdoSeleccionado === '00') {CveEdoSeleccionado = '28';}
    print('CveEdoSeleccionado', CveEdoSeleccionado);
    if(CveEdoSeleccionado !== '00'){
      print('Entro en el filtro');
      NomEdoSeleccionado = ee.FeatureCollection(panel.COLLECTION_ID_EDOS)
                  .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', CveEdoSeleccionado)));
      MunicipiosxEstado = ee.FeatureCollection(panel.COLLECTION_ID_MUN)
                .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', CveEdoSeleccionado))); //01                    
      Predios = ee.FeatureCollection(panel.COLLECTION_ID_Predios)
                .filter(ee.Filter.or(ee.Filter.eq('Cve_EdoGeo', CveEdoSeleccionado)));
    }
    print('Fondo', Fondo);
    if(Fondo !== ''){
      Predios = Predios
                .filter(ee.Filter.or(ee.Filter.eq('ClaveAseg', Fondo)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
     if(Predios.size().getInfo() !== 0)
      {
      centre = Predios.geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
      }
    }
    if(Fondo !== '' && Constancia !== ''){
      Predios = Predios
                .filter(ee.Filter.or(ee.Filter.eq('Constancia', Constancia)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
      if(Predios.size().getInfo() !== 0)
      {
      centre = Predios.geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 12);
      }
    }
    if(Fondo !== '' && Constancia !== '' && Inciso !== ''){
      Predios = Predios
                .filter(ee.Filter.or(ee.Filter.eq('Inciso', ee.Number.parse(Inciso.slice(0,2)))));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
      if(Predios.size().getInfo() !== 0)
      {
      centre = Predios.geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 14);
      }
    }
    // Filter bounds to the map if the checkbox is marked.
    if (panel.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(NomEdoSeleccionado);
      filtroRGB = filtroRGB.filterBounds(NomEdoSeleccionado);
      filtroTEMP = filtroTEMP.filterBounds(NomEdoSeleccionado);
      filtroNDVI_MOD = filtroNDVI_MOD.filterBounds(NomEdoSeleccionado);
      ModisPredio = ModisPredio.filterBounds(NomEdoSeleccionado);
      SentinelPredio = SentinelPredio.filterBounds(NomEdoSeleccionado);
    }
    // Set filter variables.
    var start = panel.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = panel.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    if (start) filtroRGB = filtroRGB.filterDate(start, end);
    if (start) filtroTEMP = filtroTEMP.filterDate(start, end);
    if (start) filtroNDVI_MOD = filtroNDVI_MOD.filterDate(start, end);
    //if (start) ModisPredio = ModisPredio.filterDate(start, end);
    if (start) SentinelPredio = SentinelPredio.filterDate(start, end);
    // Get the list of computed ids. ColeccionModisM1Desv
    var computedIds = filtered
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    // Get the list of computed ids.
    var computedIdsRGB = filtroRGB
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIdsRGB.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    // Get the list of computed ids.   MODIS TEMPERATURA
    var computedIdsTEMP = filtroTEMP
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIdsTEMP.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    // Get the list of computed ids.   MODIS NDVI
    var computedIdsNDVI = filtroNDVI_MOD
        .limit(panel.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIdsNDVI.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      panel.setLoadingMode(false);
    });
    panel.refreshMapLayer();
  }
panel.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    panel.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      panel.filters.startDate,
      panel.filters.endDate,
      panel.filters.applyButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
panel.refreshMapLayer = function() {
   removeLayer('Estado FILTROS');
   removeLayer('Estado');
   removeLayer('Municipios FILTROS');
   removeLayer('Municipios');
   removeLayer('BVH/AVV/AVH Composición FILTROS');
   removeLayer('BVH/AVV/AVH Composición');
   removeLayer('Áreas Inundadas FILTROS');
   removeLayer('Áreas Inundadas');
   removeLayer('Predio seleccionado');
   removeLayer('PV 2021/2021 AGROASEMEX');
   removeLayer('NDVI_SENTINEL2');
   removeLayer('NDVI_SENTINEL2 FILTROS');
   removeLayer('NDVI_MODIS');
   removeLayer('NDVI_MODIS FILTROS');
   removeLayer('RGB_SENTINEL2');
   removeLayer('RGB_SENTINEL2 FILTROS');
   removeLayer('Vegetación_SENTINEL2');
   removeLayer('Vegetación_SENTINEL2 FILTROS');
   removeLayer('Agricultura_SENTINEL2');
   removeLayer('Agricultura_SENTINEL2 FILTROS');
   removeLayer('Temp de la Superficie Terrestre');
   removeLayer('Temp de la Superficie Terrestre FILTROS');
   removeLayer('PV 2021/2021 AGROASEMEX SEGUIMIENTO');
   removeLayer('PV 2021/2021 AGROASEMEX VIGENTES');
  //NDVI
   var S2 = filtered
            .filterBounds(NomEdoSeleccionado)
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30);
   var S2_Layer = filtered
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                .mosaic()
                .clip(NomEdoSeleccionado);
   var ndvi = S2.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
   });
   ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));
   //print('ColeccionModis', ColeccionModis);
   CapaNDVI = ndvi;   //NDVI para gráfica
   /* Para NDVI MODIS         */
    var MOD_NDVI = filtroNDVI_MOD
                    .select("NDVI");
    var MODIS_NDVI = MOD_NDVI.map( function(img){
      return img.multiply(0.0001)
      .copyProperties(img,['system:time_start','system:time_end']);
    });
    var MODIS_NDVI_LAYER = MODIS_NDVI
                          .map(function(image) {
                            return image.addBands(image.metadata('system:time_start'));
                          })
                        .mosaic()
                        .select("NDVI")
                        .clip(NomEdoSeleccionado);
                        //ee.Image(MODIS_NDVI.median());
    var unionNDVI = MODIS_NDVI.merge(ColeccionModis);
    var NDVI_MODIS2 = CapaNDVI.merge(unionNDVI);   //Union del ndvi para la gráfica
    NDVI_MODIS = NDVI_MODIS2.merge(ColeccionModisM1Desv); 
    /*FIN NDVI MODIS    */
   //RGB
   var S2_RGB = filtroRGB
                  //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                  .mosaic()
                  .clip(NomEdoSeleccionado);
   //FIN RGB
    //TEMPERATURA
    var modis = filtroTEMP
              .select("LST_Day_1km")
              .map(function(img){
                var mulitplied = img.multiply(0.02);
                mulitplied = mulitplied.subtract(273.15);
                //mulitplied = mulitplied - 273.15;
                var unmasked = img.gt(-999).reduceRegion(ee.Reducer.count(), NomEdoSeleccionado, 1000);
                return mulitplied.set('count', unmasked.get('LST_Day_1km'))
                .copyProperties(img,['system:time_start','system:time_end']);
              });
    Temp = modis;
    var ModisImagen = ee.Image(modis.median());
    TempModis = ModisImagen.clip(NomEdoSeleccionado);
    // FIN TEMPERATURA
    var start = panel.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = panel.filters.endDate.getValue();
    if (end) end = ee.Date(end); 
    var FechaFin = end;
    var FechaPrediosSeguimiento = FechaFin.advance(-Dias,"day");
    //Diferencias de NDVI entre sentinel y Modis - una desviación ************************************************************
    var ModisM1Desv = ModisPredio
                  .filterDate(start, FechaPrediosSeguimiento)
                  .map(function(image) {
                        return image.addBands(image.metadata('system:time_start'));
                      })
                    .mosaic()
                   .select("NDVI2")
                    .clip(NomEdoSeleccionado);
    var S_2_Predio = ee.ImageCollection(panel.COLLECTION_ID_Comparativo)
                .filterBounds(NomEdoSeleccionado)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                .filterDate(start, FechaPrediosSeguimiento)
                .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                .mosaic()
                .clip(NomEdoSeleccionado);
    var ndvi_predio = S_2_Predio.select().addBands(S_2_Predio.normalizedDifference(['B8', 'B4']));
    PrediosVigentes = Predios
                            .map(function(feature){
                              var FechaFin = ee.Date(feature.get('FinVigen_1'));
                              FechaFin = ee.Number(FechaFin);
                              return feature.set('FechaFin', FechaFin);
                              //}
                            });
  //FinVigen_1  //InicioVi_1
  PrediosVigentes = PrediosVigentes.filter(ee.Filter.gte('FechaFin', FechaFin));   //01
  //***************************************************Comentado para agilizar los filtros.***********************
 // PrediosNDVI = ndvi_predio.reduceRegions({
 //   collection: PrediosVigentes,
 //   reducer: ee.Reducer.mean(),
 //   scale: 10
 // });
 // 
 // PrediosNDVI = PrediosNDVI
 // .map(function(feature){
 //   var NDVISentinel = ee.Number.parse(feature.get('mean'));
 //   return feature.set('NDVISentinel', NDVISentinel);
 // });
 // 
 // PrediosNDVI = ModisM1Desv.reduceRegions({
 //   collection: PrediosNDVI,
 //   reducer: ee.Reducer.mean(),
 //   scale: 10
 // });
//
 // var PrediosARevisar = PrediosNDVI
 //                       .map(function(feature){
 //                         return ee.Algorithms.If(ee.Number.parse(feature.get('NDVISentinel')).lt(ee.Number.parse(feature.get('mean'))),
 //                                 feature.set('Valor', 1), feature.set('Valor', 0)
 //                                 );
 //                       });
//
 // PrediosNDVI = PrediosARevisar.filter(ee.Filter.eq('Valor', 1));
 //***************************************************Comentado para agilizar los filtros.***********************
    //FIN Diferencias de NDVI entre sentinel y Modis - una desviación ************************************************************
  //*******************Cálculo de Superficies totales**************************
  SupTotalPredios = Predios.aggregate_sum('Superficie');   //SEPERFICIE
  SumaAsegTotalPredios = Predios.aggregate_sum('PrimaRease');  //PRIMA_REAS
  SupTotalPrediosVigentes = PrediosVigentes.aggregate_sum('Superficie');   //SEPERFICIE
  SumaAsegTotalPrediosVigentes = PrediosVigentes.aggregate_sum('PrimaRease');   //PRIMA_REAS
  //SupTotalPrediosSeguimiento = PrediosNDVI.aggregate_sum('Superficie');    //SEPERFICIE
  //SumaAsegTotalPrediosSeguimiento = PrediosNDVI.aggregate_sum('PrimaRease');   //PRIMA_REAS
  //*******************FIN Cálculo de Superficies totales**************************
  //******************* Nuevas capas de Sentinel 1, Áreas inundadas y Composición.*******************
  var BfInicio = FechaFin.advance(-DiasAntesInicio, 'day');
  var BfFin = FechaFin.advance(-DiasAntes, 'day');
  var AfInicio = FechaFin.advance(-DiasAntes, 'day');//.advance(20, 'day');
  var AfFin = FechaFin;
  var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                      .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                      .filterMetadata('resolution_meters', 'equals' , 10)
                      .filterBounds(NomEdoSeleccionado)
                      .select('VH');
  var beforeVH = collectionVH.filterDate(BfInicio, BfFin).mosaic();
  var afterVH = collectionVH.filterDate(AfInicio, AfFin).mosaic();
  //Map.addLayer(beforeVH.addBands(afterVH).addBands(beforeVH), {min: -25, max: -8}, 'BVH/AVV/AVH Composición', 0);
  //Apply filter to reduce speckle
  var SMOOTHING_RADIUS = 50;
  var beforeVH_filtered = beforeVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
  var afterVH_filtered = afterVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
  // Calculate difference between before and after
  var differenceVH = afterVH_filtered.divide(beforeVH_filtered);
  //Apply Threshold
  var DIFF_UPPER_THRESHOLD = 1.25;
  var differenceVH_thresholded = differenceVH.gt(DIFF_UPPER_THRESHOLD);
  //*******************Limpiamos y agregamos los valores del estado**************************
  clearResults();
  panel.remove(DatosPredio);
  DatosPredio = '';
  inspector.style().set('shown', false);
  ValoresSuperficie();
  //*******************FIN Limpiamos y agregamos los valores del estado**************************
    Map.addLayer(NomEdoSeleccionado.style(Estados_STYLE), {}, 'Estado FILTROS', 0); 
    Map.addLayer(MunicipiosxEstado.style(Municipios_STYLE), {}, 'Municipios FILTROS', 0);
    Map.addLayer((beforeVH.addBands(afterVH).addBands(beforeVH)).clip(NomEdoSeleccionado), {min: -25, max: -8}, 'BVH/AVV/AVH Composición FILTROS', 0);
    Map.addLayer((differenceVH_thresholded.updateMask(differenceVH_thresholded)).clip(NomEdoSeleccionado), {palette:"0000FF"}, 'Áreas Inundadas FILTROS', 0);
    Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), RGB_STYLE, 'RGB_SENTINEL2 FILTROS', 0);
    Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), VEGETACION_STYLE, 'Vegetación_SENTINEL2 FILTROS', 0);
    Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), AGRICULTURA_STYLE, 'Agricultura_SENTINEL2 FILTROS', 0);
    Map.addLayer(ndvi_Layer.clip(NomEdoSeleccionado), NDVI_STYLE, 'NDVI_SENTINEL2 FILTROS', 0);
    Map.addLayer(MODIS_NDVI_LAYER.clip(NomEdoSeleccionado), NDVI_STYLE, 'NDVI_MODIS FILTROS', 0);
    Map.addLayer(TempModis.clip(NomEdoSeleccionado), Temp_STYLE, 'Temp de la Superficie Terrestre FILTROS', 0);
    Map.addLayer(Predios.style(Predios_STYLE), {}, 'PV 2021/2021 AGROASEMEX', 1); //PrediosVigentes
    Map.addLayer(PrediosVigentes.style(PrediosVigentes_STYLE), {}, 'PV 2021/2021 AGROASEMEX VIGENTES', 0);
    //Map.addLayer(PrediosNDVI.style(PrediosNDVI_STYLE), {}, 'PV 2021/2021 AGROASEMEX SEGUIMIENTO', 0);
    if (panel.filters.mapCenter.getValue() === false) {
     // print('Entro aqui en false..');
      removeLayer('Estado FILTROS');
      removeLayer('Municipios FILTROS');
      removeLayer('BVH/AVV/AVH Composición FILTROS');
      removeLayer('Áreas Inundadas FILTROS');
      removeLayer('Predio seleccionado');
      removeLayer('NDVI_SENTINEL2 FILTROS');
      removeLayer('NDVI_MODIS FILTROS');
      removeLayer('RGB_SENTINEL2 FILTROS');
      removeLayer('Vegetación_SENTINEL2 FILTROS');
      removeLayer('Agricultura_SENTINEL2 FILTROS');
      removeLayer('Temp de la Superficie Terrestre FILTROS');
      removeLayer('PV 2021/2021 AGROASEMEX SEGUIMIENTO');
      removeLayer('PV 2021/2021 AGROASEMEX VIGENTES');
      removeLayer('PV 2021/2021 AGROASEMEX');
    }
  };
var NombreEstado = 'Tamaulipas'; //Agregamos nombre del estado por default...
/** Creates the application interface. */
panel.boot = function() {
  panel.createHelpers();
  var main = ui.Panel({
    widgets: [
      panel.filters.panel,
    ],
    style: {position: 'top-right', width: '320px', padding: '8px'}
  });
  panel.applyFilters();
};
//Agregamos el panel creado...
ui.root.insert(0, panel);
ValoresSuperficie();  //Llamamos función para información del estado seleccionado
//*******************FIN PANEL IZQUIERDO***************************
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of VGeoOperacion the user has selected.
function getSelectedPredios() {
  var predio = Predios.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
  return predio;
}
// Makes a bar chart of the given FeatureCollection of VGeoOperacion by name.
function makeResultsBarChart(getSelectedPredios) {
  var chart;
  if(getSelectedPredios.name()==='FeatureCollection')
  {
      var titulo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');  //ID_AGROASE ID_AGROASE
      //var properties = getSelectedPredios.propertyNames();
      Ciclo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Ciclo']).get('list');
      ClaveAseg = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveAseg']).get('list');
      ClaveTipoP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveTipoP']).get('list');
      Constancia = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Constancia']).get('list');
      //CveEstadoP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveEstadoP']).get('list');
      //CveMunicip = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveMunicip']).get('list');
      //CveRegionP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['CveRegionP']).get('list');
      EdoGeo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['EstadoPred']).get('list');    //EdoGeo
      FechaAcept = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FechaAcept']).get('list');    //NO esta en la linda de atributos
      FinVigenci = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FinVigenci']).get('list');
      HAS_POLY = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['HAS_PRE']).get('list');   //HAS_POLY
      ID_AGROASE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');  //ID_AGROASE
      Inciso = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Inciso']).get('list');
      InicioVige = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['InicioVige']).get('list');
      MunicipioP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['MunicipioP']).get('list');
      //NomTipoCon = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NomTipoCon']).get('list');
      NombreCult = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreCult']).get('list');
      NombreFond = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreFond']).get('list');
      //NombreMone = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreMone']).get('list');
      //NombreSoci = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreSoci']).get('list');
      //NombreSubR = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreSubR']).get('list');
      //PRIMA_FOND = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_FOND']).get('list');
      //PRIMA_REAS = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_REAS']).get('list');
      //PRIMA_TOTA = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['PRIMA_TOTA']).get('list');
      //Ramo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Ramo']).get('list');
      //RegionPred = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['RegionPred']).get('list');
      SEPERFICIE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Superficie']).get('list');  //SEPERFICIE
      //SUMAASEGTO = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['SUMAASEGTO']).get('list');
      //Shape_Area = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Shape_Area']).get('list');
      //Shape_Leng = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Shape_Leng']).get('list');
      //UnidadRies = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['UnidadRies']).get('list');
      //VERT = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['VERT']).get('list');
      //fechaPago = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['fechaPago']).get('list');
      ValoresPredio();
  //var datos = getSelectedPredios.get('system:id'); //], ['EstadoPred'], ['NombreCult'], ['HAS_POLY']).get('list');
  //print('datos',datos); //
  chart = ui.Chart.image.series({
                                        imageCollection: NDVI_MODIS, //NDVI_MODIS,  //CapaNDVI //  //imagentif  //ndvi_Layer
                                        region: getSelectedPredios, 
                                        reducer: ee.Reducer.mean(), 
                                        scale: 10
                                      })
                                      .setSeriesNames(['NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'])  //, , 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'
                                      .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
                                      //.setChartType('ColumnChart')
                                      .setOptions({
                                        title: titulo.getInfo(0) + '',
                                        titleTextStyle: {italic: false, bold: true},
                                        legend: {position: 'right'},
                                        vAxis: {title: 'NDVI'},
                                        hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
                                        pointSize: 5,
                                        series: {
                                          0: {color: 'BLACK'},  //Personalizar colores de las lineas //Verde
                                          1: {color: 'RED'}, //Azul
                                          2: {color: 'GREEN'},  //rojo
                                          3: {color: 'BLUE'}  //amarillo
                                        },
                                        curveType: 'function'
                                      });
  chart.style().set({stretch: 'both'});
  }else
  {
    chart = ui.Chart.image.series({
                                        imageCollection: NDVI_MODIS, //NDVI_MODIS,  //CapaNDVI //  //imagentif  //ndvi_Layer
                                        region: getSelectedPredios, 
                                        reducer: ee.Reducer.mean(), 
                                        scale: 10
                                      })
                                      .setSeriesNames(['NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'])  //, , 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'
                                      .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
                                      //.setChartType('ColumnChart')
                                      .setOptions({
                                        title: 'NDVI',
                                        titleTextStyle: {italic: false, bold: true},
                                        legend: {position: 'right'},
                                        vAxis: {title: 'NDVI'},
                                        hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
                                        pointSize: 5,
                                        series: {
                                          0: {color: 'BLACK'},  //Personalizar colores de las lineas //Verde
                                          1: {color: 'RED'}, //Azul
                                          2: {color: 'GREEN'},  //rojo
                                          3: {color: 'BLUE'}  //amarillo
                                        },
                                        curveType: 'function'
                                      });
  chart.style().set({stretch: 'both'});
  }
    return chart; 
}
// Makes a table of the given FeatureCollection of VGeoOperacion by name.
function makeResultsTable(Predios) {
  var table = ui.Chart.feature.byFeature(Predios, 'ID_AGROASE');  //VGeoOperacion, 'ID_AGR'
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected VGeoOperacion.
function updateOverlay() {
  var overlay = getSelectedPredios().style(HIGHLIGHT_STYLE);
  Map.layers().set(12, ui.Map.Layer(overlay, {}, 'Predio seleccionado'));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var d = getSelectedPredios().size();
  var punto = getSelectedPoint();
  var filtered = NomEdoSeleccionado.filter(ee.Filter.bounds(punto));
  if(d.getInfo() === 1){
    var chart = chartBuilder(getSelectedPredios());
    //print('Entro aqui donde se dio clic dentro de un predio');
    resultsPanel.clear().add(chart).add(buttonPanel);
  }
  else
  if(filtered.size().getInfo() === 1)
  {
    var  chartPixel = chartBuilder(getSelectedPoint());
    clearResults();
    resultsPanel.clear().add(chartPixel).add(buttonPanel);
  }
  else
  {
    clearResults();
  }
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  removeLayer('Predio seleccionado');
  panel.remove(DatosPredio);                      //Limpiamos datos del predio al limpiar la gráfica.
  DatosPredio = '';
  Map.layers().remove(Map.layers().get(12));
  var instructionsLabel = ui.Label('Selecciona un predio para ver su NDVI.');
  instructionsLabel.style().set('color', 'green');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints = [];  //Limpiamos los predios seleccionados, para solo graficar uno.
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
Map.onClick(ValoresPixel);
//Map.onClick(ValoresPredio);
//ui.root.insert(0, panel);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Mostrar resultado en tabla',
        value: makeResultsBarChart,
      },
      {
        label: 'Mostrar resultado en gráfica',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Limpiar', clearResults)], //chartTypeToggleButton   //Quitamos el boton de mostrar resultado en tabla.
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('NDVI: ', {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'} ));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
//Map.onClick(function(coords) {
function getSelectedPoint() 
  {
    var Coo = selectedPoints[0];
    var lon = Coo[0];
    var lat = Coo[1];
    var point = ee.Geometry.Point(lon, lat);
    //print('point', point);
    return point;
  }
  function ValoresPixel(coords) 
  {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true); //true
  inspector.add(ui.Label('Leyendo...', {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //print('coords.lon', coords.lon);
  //print('coords.lat', coords.lat);
  var temporalMean = ndvi_Layer.reduce(ee.Reducer.mean());     //TempModis
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 1);
 // var computedValue = sampledPoint.get('mean');
  var tempMean = TempModis.reduce(ee.Reducer.mean());     //TempModis
  var sampPoint = tempMean.reduceRegion(ee.Reducer.mean(), point, 1);
  var computedValue = [sampledPoint.get('mean'), sampPoint.get('mean')];
  var temperatura;
  var ndvi;
  //print('recomputedValue[0]s', computedValue[0].getInfo());
  if(computedValue[0].getInfo() === null)
  {
    inspector.clear();
    inspector.add(ui.Label({
          value: ['NDVI: ' + 'Sin información', '  Temperatura: ' + 'Sin información'],
          style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'}
        }));
       //Add a button to hide the Panel.
       inspector.add(ui.Button({
          label: 'Cerrar',
          style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'},
          onClick: function() {
            inspector.style().set('shown', false);
          }
        }));
    }else
    {
      // Request the value from the server and use the results in a function.
      computedValue[0].evaluate(function(result) {
        ndvi = result;
        computedValue[1].evaluate(function(result) {
        inspector.clear();
        //print('res', result);
        temperatura = result;
            //Add a label with the results from the server.
            inspector.add(ui.Label({
              value: ['NDVI: ' + ndvi.toFixed(2), '  Temperatura: ' + temperatura.toFixed(2) + ' °C'],
              style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'}
            }));
           //Add a button to hide the Panel.
           inspector.add(ui.Button({
              label: 'Cerrar',
              style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'},
              onClick: function() {
                inspector.style().set('shown', false);
              }
            }));
        }); 
      });
    }
}
//Agregamos widget para mostrar información de superficies totales ****************************************
function ValoresSuperficie() {
  //print(SuperficiesTotales);
  panel.remove(SuperficiesTotales);
  SuperficiesTotales = '';
  //print('PrediosVigentes.size()', PrediosVigentes.size());
  SuperficiesTotales = ui.Panel({
    widgets: [
      ui.Label('... ', {color: 'white', margin: '10px 0 0 7px'}),
      ui.Label('INFORMACIÓN DEL ESTADO: ' + NombreEstado, {color: 'black', margin: '10px 0 10px 7px'}),// ui.Label('Estado: ' + EdoGeo.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Total de Predios: ' + Predios.size().format("%,d").getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Asegurada: ' + SupTotalPredios.format("%,.2f").getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Superficie Asegurada: ' + SupTotalPredios.format("%,d").getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      ui.Label('Suma Asegurada: $ ' + SumaAsegTotalPredios.format("%,.2f").getInfo(0), panel.SECTION_PREDIOS_STYLE),    //.format("%,.f") //Para dos puntos decimales. y coma de separador de miles
      ui.Label('... ', {color: 'white', fontSize: '7px', margin: '0 0 0 7px'}),
      ui.Label('Predios Vigentes: ' + PrediosVigentes.size().format("%,d").getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Asegurada: ' + SupTotalPrediosVigentes.format("%,.2f").getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      ui.Label('Suma Asegurada: $ ' + SumaAsegTotalPrediosVigentes.format("%,.2f").getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('... ', {color: 'white', fontSize: '7px', margin: '0 0 0 7px'}),
      //***************************************************Comentado para agilizar los filtros.***********************
      //ui.Label('Predios con alerta: ' + PrediosNDVI.size().format("%,d").getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Superficie Asegurada: ' + SupTotalPrediosSeguimiento.format("%,.2f").getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Suma Asegurada: $ ' + SumaAsegTotalPrediosSeguimiento.format("%,.2f").getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Panel([
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {color: 'green', fontWeight: 'bold', fontSize: '14px'} //panel.SECTION_PREDIOS_STYLE
  });
  panel.add(SuperficiesTotales);
  //print(SuperficiesTotales.getInfo());
}
//FIN Agregamos widget para mostrar información de superficies totales ****************************************
 /*Función para mostrar los valores del predio... */ // 2   *****************  
 function ValoresPredio() {
   panel.remove(DatosPredio);
   DatosPredio = '';
   FechaAceptacion = FechaAcept.getInfo(0);
   InicioVigencia = InicioVige.getInfo(0);
   FinVigencia = FinVigenci.getInfo(0);
   var FA = FechaAceptacion.map(function (number) { return ee.String(number); });
   var IV = InicioVigencia.map(function (number) { return ee.String(number); });
   var FV = FinVigencia.map(function (number) { return ee.String(number); });
   FechaAceptacion = FA[0];
   InicioVigencia = IV[0];
   FinVigencia = FV[0];
   if(FechaAcept.getInfo(0).length > 0)
   {
     FechaAceptacion = FechaAceptacion.slice(0,10);  //var eeString = ee.String(aString);
     InicioVigencia = InicioVigencia.slice(0,10);
     FinVigencia = FinVigencia.slice(0,10);
     FechaAceptacion = ee.String(FechaAceptacion);
     InicioVigencia = ee.String(InicioVigencia);
     FinVigencia = ee.String(FinVigencia);
     FechaAceptacion = ee.List([FechaAceptacion]);
     InicioVigencia = ee.List([InicioVigencia]);
     FinVigencia = ee.List([FinVigencia]);
     FechaAceptacion = FechaAceptacion.getInfo(0);
     InicioVigencia = InicioVigencia.getInfo(0);
     FinVigencia = FinVigencia.getInfo(0);
   }else{
     FechaAceptacion = '';
     InicioVigencia = '';
     FinVigencia = '';
   }
  DatosPredio = ui.Panel({
    widgets: [
      ui.Label('... ', {color: 'white', margin: '10px 0 0 7px'}),
      ui.Label('INFORMACIÓN DEL PREDIO. ', {color: 'black', margin: '10px 0 10px 7px'}),
      ui.Label('ID AGROASEMEX: ' + ID_AGROASE.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Cultivo: ' + NombreCult.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Modalidad: ' + ClaveTipoP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Ciclo: ' + Ciclo.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Clave Fondo: ' + ClaveAseg.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Constancia: ' + Constancia.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Inciso: ' + Inciso.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Poligonal: ' + HAS_POLY.getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),
      ui.Label('Superficie Asegurada: ' + SEPERFICIE.getInfo(0) + ' ha.', panel.SECTION_PREDIOS_STYLE),    //SEPERFICIE
      ui.Label('Estado: ' + EdoGeo.getInfo(0), panel.SECTION_PREDIOS_STYLE),  //EdoGeo
      ui.Label('Municipio: ' + MunicipioP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('Fecha Aceptación: ' + FechaAceptacion, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Inicio Vigencia: ' + InicioVigencia, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Fin Vigencia: ' + FinVigencia, panel.SECTION_PREDIOS_STYLE),
      ui.Label('Nombre Fondo: ' + NombreFond.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Label('... ', {color: 'white', margin: '10px 0 0 7px'}),
      //ui.Label('CveEstadoP: ' + CveEstadoP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('CveMunicip: ' + CveMunicip.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('CveRegionP: ' + CveRegionP.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('ID_AGROASE: ' + ID_AGROASE.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Tipo Contrato: ' + NomTipoCon.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Moneda: ' + NombreMone.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Nombre Socio: ' + NombreSoci.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_FOND: ' + '$' + PRIMA_FOND.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_REASEGURO: ' + '$' + PRIMA_REAS.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('PRIMA_TOTAL: ' + '$' + PRIMA_TOTA.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Ramo: ' + Ramo.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Subramo: ' + NombreSubR.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Region Predeterminada: ' + RegionPred.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('SUMA ASEG TOTAL: ' + '$' + SUMAASEGTO.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Shape_Area: ' + Shape_Area.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Shape_Leng: ' + Shape_Leng.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Unidad Riesgo: ' + UnidadRies.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('VERT: ' + VERT.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      //ui.Label('Fecha Pago: ' + fechaPago.getInfo(0), panel.SECTION_PREDIOS_STYLE),
      ui.Panel([
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {color: 'green', fontWeight: 'bold', fontSize: '14px'} //panel.SECTION_PREDIOS_STYLE
  });
  panel.add(DatosPredio);
 }
// Para mostrar el panel de simbología de temperatura
var Etiquetas = [
  ' < 0 °C',          //1
  '0 - 5 °C',         //2
  '5 - 10 °C',        //3
  '10 - 15 °C',       //4
  '15 - 20 °C',       //5
  '20 - 25 °C',       //6
  '25 - 30 °C',       //7
  '> 30 °C',];        //8
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Niveles de temperatura', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['d1f2ff', '89ddec', '4384d4', '0602ff', '006847', '1dcc00', 'f39703', 'ff0000'];  //'040274', '0602ff', '4384d4', '89ddec', '006847', '1dcc00', 'f39703', 'ff0000'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 8; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
Map.add(Leyenda);
LayersCargados();
//Check box para habilitar o deshabilitar la simbología de temperatura.
// Define a UI widget and add it to the map.
var Simbologia = ui.Checkbox({label: 'Ver simbología de la temperatura', style: {fontSize: '16px', width: '200px', position: 'bottom-left', padding: '5px 5px'}});  //style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Map.add(Simbologia);
// ActiveDictionaries are mutable; set a style property.
Simbologia.style().set('color', 'green');
// Define the UI widget's style ActiveDictionary as a variable.
var widgetStyle = Simbologia.style();
// Set the UI widget's style properties from the ActiveDictionary variable.
//widgetStyle.set({border: '5px solid darkgreen'});
Simbologia.onChange(function(checked) {
  if(checked)
      {
          Leyenda.style().set('shown', true);
      } 
      else
      {
        Leyenda.style().set('shown', false);
      }
});
var centre = Predios.geometry().centroid().coordinates();
Map.setCenter(ee.Number(centre.get(0)).getInfo(), 
              ee.Number(centre.get(1)).getInfo(), 10);