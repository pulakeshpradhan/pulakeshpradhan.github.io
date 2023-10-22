var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#c823cb",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #c823cb */ee.Geometry.MultiPoint();
     /* JLSA 11-08-2021
        Esta aplicación nos permite explorar dentro de una zona de interes, diferentes índices calculados a partir de difetentes productos, por ejemplo: Sentinel 2 y Modis
     */ 
                          /*Variables para las colecciones.*/
  //Area de interes capa de estados
  var NomEdoSeleccionado = ee.FeatureCollection('users/jsilverio/Estados_Republica')
                  .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', '28'))); //01
  //capa de municipios
  var MunicipiosxEstado = ee.FeatureCollection('users/jsilverio/MUNICIPIOS_2018')
                  .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', '28'))); //01                
  //Capa de predios. //users/jsilverio/VERSION_FINAL_16_03_ACTUAL    //users/jsilverio/VERSION_FINAL_15_04_ACTUAL   //users/jsilverio/SIOF_20_04_TABLERO_FINAL
  var Predios = ee.FeatureCollection('users/jsilverio/VGeoOperacionPV_2021_2021')
                .filter(ee.Filter.or(ee.Filter.eq('Cve_EdoGeo', '28')));
                //.filter(ee.Filter.or(ee.Filter.eq('ClaveAseg', '0554')));   //0611
  //Variable con capa de estados para agregarlos al combo que se presenta en el panel //20.582177757596064, -100.39787710802239
  var Estados = ee.FeatureCollection('users/jsilverio/Estados_Republica');
  //Colección para la relación cultivos por estado.
  var Predios_Cultivos = ee.FeatureCollection('users/jsilverio/VGeoOperacionPV_2021_2021');              
  //Capa de paises
  var Mexico = ee.FeatureCollection("USDOS/LSIB/2013")
                .filter(ee.Filter.or(ee.Filter.eq('name', 'MEXICO')));
  //Estado de tabasco.            
  //var Estado = ee.FeatureCollection("users/pbarrera/Tabasco_Mun_WGS84");
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
  // Imagenes de modis promedio menos una desviación NDVI 2001-2020 y renombramos la banda a NDVI2
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
  var cargaInicial = 0;  //variable para validar si termino la carga inicial o no, cambia a 1 cuando termina de cargarse la página
  var StartTime = '2021-01-01';
  var EndTime = '2021-08-09';
  var Dias = 20;  //Dias para la fecha final, esto para mostrar
  var DiasAntes = 15;  //Para determinar la fecha Despues (para la composición) = FechaFin - 15 días.
  var DiasAntesInicio = 35;  //Para determinar la fecha Inicio (para la composición) = FechaFin - 35 días.
  //var ValNDVI = 0.4;
  //*********************  Modis menos una desviación  *************************************************************************************
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
    return img.multiply(0.0001).copyProperties(img,['system:time_start','system:time_end']);
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
   /* Para EVI MODIS         */
  var MOD_EVI = ee.ImageCollection("MODIS/006/MOD13Q1")
                  .filterBounds(NomEdoSeleccionado) 
                  .filterDate(StartTime, EndTime) 
                  .select("EVI");
  var MODIS_EVI = MOD_EVI.map( function(img){
    return img.multiply(0.0001).copyProperties(img,['system:time_start','system:time_end']);
  });
  var MODIS_EVI_LAYER = MODIS_EVI
                        .map(function(image) {
                          return image.addBands(image.metadata('system:time_start'));
                        })
                      .mosaic()
                      .select("EVI")
                      .clip(NomEdoSeleccionado);
                      //ee.Image(MODIS_NDVI.median());   //Otra opción.
  /*FIN  Para EVI MODIS         */
  //Colección de imágenes Sentinel-2, Mosaico para la capa
  var S2_Layer = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(StartTime, EndTime)   //'2021-03-01', '2021-03-18'    //
                  //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
                  .filterBounds(NomEdoSeleccionado)
                  .map(function(image) {
                      return image.multiply(0.0001).addBands(image.metadata('system:time_start'));
                    })
                  .mosaic()
                  .clip(NomEdoSeleccionado);
  //Colección de imágenes Sentinel-2, para el NDVI
  var S2_NDVI = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(StartTime, EndTime)
                  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                  .filterBounds(NomEdoSeleccionado);
   //función para agregar los indices ya calculados.
  var addQualityBands = function(image) {
    return image
        .addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'))
        .addBands(image.expression ('float ((NIR - RED) / (NIR + RED + L))* (1+L)',
        {
          'L': 0.428, // Cobertura vegetacion 0-1
          'NIR': image.select ('B8').multiply(0.0001),
          'RED': image.select ('B4').multiply(0.0001)
        }).rename('SAVI'))
        .addBands(image.expression 
        (
          'float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))',   //2.5 * (NIR - RED) / ((NIR + 6 * RED - 7.5 * BLUE) + 1)
          {                                                                   //2.5 * (B8 – B4) / ((B8 + 6 * B4 – 7.5 * B2) + 1))
            'NIR': image.select ('B8').multiply(0.0001),  
            'RED': image.select ('B4').multiply(0.0001),
            'BLUE': image.select ('B2').multiply(0.0001)
          }).rename('EVI'))
        .addBands(image.normalizedDifference(['B8A', 'B11']).rename('NDMI')) //(B8A-B11)/(B8A+B11);
      // time in days
      .addBands(image.metadata('system:time_start'));
  };
   //Colección de imágenes Sentinel-2, para el NDVI
    var S_2 = ee.ImageCollection('COPERNICUS/S2_SR')
                    .filterDate(StartTime, EndTime)
                    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                    .filterBounds(NomEdoSeleccionado)
                    .map(addQualityBands);
  var NDVI_EVI_NDMI_SAVI = S_2.select(['NDMI', 'SAVI', 'NDVI', 'EVI']);
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
  //Colección de imágenes Sentinel-2, SAVI, EVI y NDWI
  var Col_SAVI = ee.ImageCollection('COPERNICUS/S2_SR')
                    .filterBounds(NomEdoSeleccionado)
                    .filterDate(StartTime, EndTime)
                    //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 15)
                    .map(function(image) {
                      return image.addBands(image.metadata('system:time_start'));
                    })
                    .mosaic()
                    .clip(NomEdoSeleccionado);
  var SAVI = Col_SAVI.expression ('float ((NIR - RED) / (NIR + RED + L))* (1+L)',
      {
        'L': 0.428, // Cobertura vegetacion 0-1
        'NIR': Col_SAVI.select ('B8').multiply(0.0001),
        'RED': Col_SAVI.select ('B4').multiply(0.0001)
      });
  // EVI (Enhanced Vegetation Index)
  var EVI = Col_SAVI.expression 
    ('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', 
      {
          'NIR': Col_SAVI.select ('B8').multiply(0.0001),  
          'RED': Col_SAVI.select ('B4').multiply(0.0001),
          'BLUE': Col_SAVI.select ('B2').multiply(0.0001)
      }
    );
  // FIN  EVI (Enhanced Vegetation Index)
  var NDWI = Col_SAVI.normalizedDifference(['B8A', 'B11']); //(B8A-B11)/(B8A+B11);
  //FIN Colección de imágenes Sentinel-2, SAVI, EVI y NDWI
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
  var beforeVH = collectionVH.filterDate(BfInicio, BfFin)
                    .map(function(image) {
                      return image.addBands(image.metadata('system:time_start'));
                    })
                    .mosaic()
                    .clip(NomEdoSeleccionado);//.mosaic();
  var afterVH = collectionVH.filterDate(AfInicio, AfFin)
                    .map(function(image) {
                      return image.addBands(image.metadata('system:time_start'));
                    })
                    .mosaic()
                    .clip(NomEdoSeleccionado);//.mosaic();
  //print('beforeVH', beforeVH);
  //print('beforeVH', beforeVH.select('system:time_start'));
  //print('afterVH', afterVH.select('system:time_start'));
  var FechabeforeVH = ee.Date(1624278816000);
  var FechaafterVH = ee.Date(1625315617000);
  //print('FechabeforeVH', FechabeforeVH);
  print('FechaafterVH', FechaafterVH);
  //Map.addLayer(beforeVH.addBands(afterVH).addBands(beforeVH), {min: -25, max: -8}, 'BVH/AVV/AVH Composición', 0);
  //Map.addLayer(beforeVH, {}, 'beforeVH', 0);
  //Map.addLayer(afterVH, {}, 'afterVH', 0);   
  beforeVH = beforeVH.select('VH');
  afterVH = afterVH.select('VH');
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
  //Funcion para quitar los Map Layers
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
      if (layer.getName() === 'TEMP DE LA SUPERFICIE TERRESTRE')
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
//  // Function to calculate and add an NDVI band para la gráfica
  var ndvi_ = S2_NDVI.map(function(image) {
    return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
  });
  var ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));    //NDVI de la capa ee.Image('users/jsilverio/Predio_20202021_0762_3_1'); //
  //Para gráficas NDVI
  var CapaNDVI = ndvi_;     //NDVI para gráfica
  var unionNDVI = MODIS_NDVI.merge(ColeccionModis);
  var NDVI_MODIS2 = CapaNDVI.merge(unionNDVI);   //Union del ndvi para la gráfica   MODIS_EVI
  var NDVI_MODIS = NDVI_MODIS2.merge(ColeccionModisM1Desv);
  var EVI_NDVI_MODIS = NDVI_MODIS.merge(MODIS_EVI);
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
      .select("LST_Day_1km");
      //.map(function(img) {
      //  return img
      //    .multiply(0.02)
      //    .subtract(273.15)
      //    .copyProperties(img, ['system:time_start']);
      //});
  var FuncTemp =  temp.map(function(img){
        var mulitplied = img.multiply(0.02);
        mulitplied = mulitplied.subtract(273.15);
        //mulitplied = mulitplied - 273.15;
        var unmasked = img.gt(-999).reduceRegion(ee.Reducer.count(), NomEdoSeleccionado, 1000);
        return mulitplied.set('count', unmasked.get('LST_Day_1km'))
        .copyProperties(img,['system:time_start']); //,'system:time_end'
      });
  //print('FuncTemp', FuncTemp);      
  //var prueba = FuncTemp.filter(ee.Filter.gt('count', 40000));
  //print('prueba', prueba);      
  var temperature = FuncTemp;
  var ModisImagen = ee.Image(FuncTemp.reduce(ee.Reducer.last()));   //ee.Image(FuncTemp.median()); 
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
          'd1f2ff', '89ddec', '4384d4', '0602ff', '006847', '1dcc00', 'f39703', 'ff0000'
        ],
      };
  var SAVI_STYLE = {min: 0, max: 1,
      palette: ['#0000ff', 'DF923D', 'F1B555',
      'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
      '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
  //var palettes = require('users/gena/packages:palettes');
  //var palet = palettes.misc.jet[7].reverse();    //4,5,6, 7    RdBu   3,4,5,6,7,8,9,10,11
  var NDWI_STYLE = 
     {min: -1, max: 0.5, // IMPORTANTE variar rangos en funcion del indice
     palette: ['red', 'yellow', 'green', 'blue']};
      //['RED', 'BLUE']};
  // Configure our map with a minimal set of controls.*******
  Map.setControlVisibility(true);
  Map.setControlVisibility({scaleControl: true, zoomControl: true});
  Map.style().set({cursor: 'crosshair'});
  var centre = Predios.geometry().centroid().coordinates();
  Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 12);
  //Agregamos las capas de información al mapa
  Map.addLayer(NomEdoSeleccionado.style(Estados_STYLE), {}, 'ESTADO', 0); 
  Map.addLayer(MunicipiosxEstado.style(Municipios_STYLE), {}, 'MUNICIPIOS', 0); 
  Map.addLayer((beforeVH.addBands(afterVH).addBands(beforeVH)).clip(NomEdoSeleccionado), {min: -25, max: -8}, 'BVH/AVV/AVH COMPOSICIÓN', 0);
  Map.addLayer((differenceVH_thresholded.updateMask(differenceVH_thresholded)).clip(NomEdoSeleccionado), {palette:"0000FF"}, 'ÁREAS INUNDADAS', 0);
  Map.addLayer(SAVI.clip(NomEdoSeleccionado), SAVI_STYLE,'SAVI_SENTINEL2', 0);  //NDWI
  Map.addLayer(EVI.clip(NomEdoSeleccionado), SAVI_STYLE,'EVI_SENTINEL2', 0);
  Map.addLayer(NDWI.clip(NomEdoSeleccionado), NDWI_STYLE,'NDWI_SENTINEL2', 0);
  Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), RGB_STYLE,'RGB_SENTINEL2', 0);
  Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), VEGETACION_STYLE, 'VEGETACIÓN_SENTINEL2', 0);
  Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), AGRICULTURA_STYLE, 'AGRICULTURA_SENTINEL2', 0);
  Map.addLayer(ndvi_Layer.clip(NomEdoSeleccionado), SAVI_STYLE, 'NDVI_SENTINEL2', 0);   
  Map.addLayer(MODIS_NDVI_LAYER.clip(NomEdoSeleccionado), SAVI_STYLE, 'NDVI_MODIS', 0);
  Map.addLayer(MODIS_EVI_LAYER.clip(NomEdoSeleccionado), SAVI_STYLE, 'EVI_MODIS', 0);
  Map.addLayer(TempModis.clip(NomEdoSeleccionado), Temp_STYLE, 'TEMP DE LA SUPERFICIE TERRESTRE', 0);
  Map.addLayer(Predios.style(Predios_STYLE), {}, 'PV 2021/2021 AGROASEMEX', 1); //PrediosTODOS
  Map.addLayer(PrediosVigentes.style(PrediosVigentes_STYLE), {}, 'PV 2021/2021 AGROASEMEX VIGENTES', 0);
  //Map.addLayer(PrediosNDVI.style(PrediosNDVI_STYLE), {}, 'PV 2021/2021 AGROASEMEX SEGUIMIENTO', 0);
  /*              *******************PANEL IZQUIERDO**************************                     */
  //Create a panel to hold our widgets.
  var panel = ui.Panel();
  panel.MODALIDAD = {
    "Selecciona Modalidad": { Nombre: 'Selecciona Modalidad', CveMod: '00'},
    "HUMEDAD":              { Nombre: 'HUMEDAD', CveMod: '02'},
    "MEDIO RIEGO":          { Nombre: 'MEDIO RIEGO', CveMod: '03'},
    "PUNTEADO":             { Nombre: 'PUNTEADO', CveMod: '04'},
    "RIEGO":                { Nombre: 'RIEGO', CveMod: '05'},
    "TEMPORAL":             { Nombre: 'TEMPORAL', CveMod: '08'},
  };
  var CveEdoSeleccionado;
  var NombreEstado;
  var CveFondo;
  var Constancia;
  var Inciso;
  var Modalidad;
  var Cultivo;
  var point;
  panel.TEXT = {width: '30%'};
  var clave = 0;
  var EstadosNames = Estados.aggregate_array('NOM_ENT');
  var EstadosOrdenados = EstadosNames.sort();
  var getCounties = function(Estado) {
    // Given a Estado get all counties
    var NombreEstado = ee.Feature(Estados.filterMetadata('NOM_ENT', 'equals', Estado).first());
    CveEdoSeleccionado = NombreEstado.get('CVE_ENT');
    var filteredCounties = Predios_Cultivos.filterMetadata('Cve_EdoGeo', 'equals', NombreEstado.get('CVE_ENT'));
    var filteredCountiesNames = filteredCounties.aggregate_array('NombreCult').distinct();
    return ee.List(filteredCountiesNames);
  };
  // Empty Dropdowns
  var label = ui.Label('Selecciona un estado:', {fontWeight: 'bold'});
  var EstadosDD = ui.Select([], 'Cargando...');
  var CultivosDD = ui.Select([], 'Esperando selección de un estado.');
  CultivosDD.style().set('width', '30%');
  // Load Estados
    EstadosOrdenados.evaluate(function(Estados){
    EstadosDD.items().reset(Estados);
    EstadosDD.setPlaceholder('Selecciona un estado');
    EstadosDD.onChange(function(Estado){
      // once you select a Estado (onChange) get all counties and fill the dropdown
      CultivosDD.setPlaceholder('Cargando...');
      var Cultivos = getCounties(Estado);
      NombreEstado = Estado;
      //Agregamos las coordenadas centricas de cada estado.
      if(NombreEstado ===  'Aguascalientes'){
        Map.setCenter(-102.3619, 22.006, 10);
      }
      if(NombreEstado ===  'Baja California'){
        Map.setCenter(-115.110019168663, 30.5837450116453, 10);
      }
      if(NombreEstado ===  'Baja California Sur'){
        Map.setCenter(-112.078921514132, 25.9253227553422, 10);
      }
      if(NombreEstado ===  'Campeche'){
        Map.setCenter(-90.3602582194405, 18.8402984747382, 10);
      }
      if(NombreEstado ===  'Chiapas'){
        Map.setCenter(-92.472911819264, 16.4852398660796, 10);
      }
      if(NombreEstado ===  'Chihuahua'){
        Map.setCenter(-106.468939535164, 28.8085380501111, 10);
      }
      if(NombreEstado ===  'Ciudad de México'){
        Map.setCenter(-99.1394111886253, 19.276889636548, 10);
      }
      if(NombreEstado ===  'Coahuila de Zaragoza'){
        Map.setCenter(-102.04403868233, 27.2954429748556, 10);
      }
      if(NombreEstado ===  'Colima'){
        Map.setCenter(-103.913372977784, 19.1409936912956, 10);
      }
      if(NombreEstado ===  'Durango'){
        Map.setCenter(-104.913398569489, 24.9236104011588, 10);
      }
      if(NombreEstado ===  'Guanajuato'){
        Map.setCenter(-101.01261435267, 20.9054320440463, 10);
      }
      if(NombreEstado ===  'Guerrero'){
        Map.setCenter(-99.9218252516674, 17.6680108718196, 10);
      }
      if(NombreEstado ===  'Hidalgo'){
        Map.setCenter(-98.8871130679931, 20.4795566791773, 10);
      }
      if(NombreEstado ===  'Jalisco'){
        Map.setCenter(-103.613210997185, 20.5807840709853, 10);
      }
      if(NombreEstado ===  'México'){
        Map.setCenter(-99.6453738063359, 19.3559570441337, 10);
      }
      if(NombreEstado ===  'Michoacán de Ocampo'){
        Map.setCenter(-101.878113286647, 19.2070960823163, 10);
      }
      if(NombreEstado ===  'Morelos'){
        Map.setCenter(-99.0749623272703, 18.7420779450166, 10);
      }
      if(NombreEstado ===  'Nayarit'){
        Map.setCenter(-104.840853461615, 21.8041401702672, 10);
      }
      if(NombreEstado ===  'Nuevo León'){
        Map.setCenter(-99.9689699164252, 25.5725902806682, 10);
      }
      if(NombreEstado ===  'Oaxaca'){
        Map.setCenter(-96.4301309572653, 16.961446823539, 10);
      }
      if(NombreEstado ===  'Puebla'){
        Map.setCenter(-97.9000945497052, 19.0060693373887, 10);
      }
      if(NombreEstado ===  'Querétaro'){
        Map.setCenter(-99.8457964069208, 20.8551760567896, 10);
      }
      if(NombreEstado ===  'Quintana Roo'){
        Map.setCenter(-88.1271556851786, 19.5904421988879, 10);
      }
      if(NombreEstado ===  'San Luis Potosí'){
        Map.setCenter(-100.416508698507, 22.5854598218149, 10);
      }
      if(NombreEstado ===  'Sinaloa'){
        Map.setCenter(-107.509116806931, 25.0014657647422, 10);
      }
      if(NombreEstado ===  'Sonora'){
        Map.setCenter(-110.798908021187, 29.6923909612983, 10);
      }
      if(NombreEstado ===  'Tabasco'){
        Map.setCenter(-92.5939869781394, 17.9376914025206, 10);
      }
      if(NombreEstado ===  'Tamaulipas'){
        Map.setCenter(-98.640894391325, 24.2910115597328, 10);
      }
      if(NombreEstado ===  'Tlaxcala'){
        Map.setCenter(-98.1685494270701, 19.4285756076831, 10);
      }
      if(NombreEstado ===  'Veracruz de Ignacio de la Llave'){
        Map.setCenter(-96.4185563348002, 19.3929510769528, 10);
      }
      if(NombreEstado ===  'Yucatán'){
        Map.setCenter(-88.9211093413518, 20.7470975002581, 10);
      }
      if(NombreEstado ===  'Zacatecas'){
        Map.setCenter(-102.660557257437, 23.2890189109144, 10);
      }
      Cultivos.evaluate(function(NombreCultivo)
      {
        CultivosDD.items().reset(NombreCultivo);
        CultivosDD.setPlaceholder('Selecciona un cultivo');
        CultivosDD.onChange(function(CultivoSeleccionado)
        {
          var option = CultivoSeleccionado;
          Cultivo = option;
        });
      });
    });
  });
  //Variables 
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
  var lon = ui.Label();  //{style: {fontWeight: 'bold'}}
  var lat = ui.Label();  //{style: {fontWeight: 'bold'}}
  panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
  //var Mensaje = ui.Label({style: {Color:'red', fontWeight: 'bold', fontSize: '16px'}});  //{style: {fontWeight: 'bold'}}
  ////var lat = ui.Label();  //{style: {fontWeight: 'bold'}}
  //panel.add(ui.Panel(Mensaje, ui.Panel.Layout.flow('horizontal')));
  var Selecciona_Estado = ui.Panel({
    widgets: [
      ui.Label('Selecciona un estado:', {fontWeight: 'bold'}),
      ui.Panel([
        //panel.picker.select,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: panel.SECTION_STYLE
  });
  panel.add(label);
  panel.add(EstadosDD);
  /* Seleccion de FONDO. */
    panel.Filtro_Fondo = {
      Clave_Fondo: ui.Textbox('0000', ''),  //, {width: '50%'}   //0611
      Label_Fondo: ui.Label('Clave Fondo: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
    };
    panel.Filtro_Fondo.Clave_Fondo.style().set('width', '30%');
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
  /* Seleccion de CONSTANCIA. */
    panel.Filtro_Constancia = {
      Constancia: ui.Textbox('', ''),  //, {width: '50%'}
      Label_Constancia: ui.Label('Constancia: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
    };
    panel.Filtro_Constancia.Constancia.style().set('width', '30%');
    var FiltroConstancia = ui.Panel({
      widgets: [
        ui.Panel([
          panel.Filtro_Constancia.Label_Constancia,
          panel.Filtro_Constancia.Constancia,
        ], ui.Panel.Layout.flow('horizontal'))
      ],
      style: panel.SECTION_STYLE_FONDO
    });
    panel.add(FiltroConstancia);
  /* Seleccion de INCISO. */
    panel.Filtro_Inciso = {
      Inciso: ui.Textbox('', ''),  //, {width: '50%'}
      Label_Inciso: ui.Label('Inciso: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
    };
   panel.Filtro_Inciso.Inciso.style().set('width', '30%');
   panel.Filtro_Inciso.Inciso.style().set('position', 'bottom-right');
    var FiltroInciso = ui.Panel({
      widgets: [
        ui.Panel([
          panel.Filtro_Inciso.Label_Inciso,
          panel.Filtro_Inciso.Inciso,
        ], ui.Panel.Layout.flow('horizontal'))
      ],
      style: panel.SECTION_STYLE_FONDO
    });
    panel.add(FiltroInciso);
  //********* Cultivo
  panel.Filtro_Cultivo = {
      Label_Cultivo: ui.Label('Cultivo: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
      select: ui.Select({
        items: Object.keys(CultivosDD),
      onChange: function() {
        }
      }),
    };
   panel.Filtro_Cultivo.select.style().set('width', '30%');
    var FiltroCultivo = ui.Panel({
      widgets: [
        ui.Panel([
          panel.Filtro_Cultivo.Label_Cultivo,
          CultivosDD,
        ], ui.Panel.Layout.flow('horizontal'))
      ],
      style: panel.SECTION_STYLE_FONDO
    });
    panel.add(FiltroCultivo);
  //*********Fin Cultivo
  //********* Modalidad
  panel.Filtro_Modalidad = {
      Label_Modalidad: ui.Label('Modalidad: ', panel.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
      select: ui.Select({
        items: Object.keys(panel.MODALIDAD),
      onChange: function() {
           var option = panel.MODALIDAD[panel.Filtro_Modalidad.select.getValue()];
           Modalidad = option.Nombre;
        }
      }),
    };
   panel.Filtro_Modalidad.select.style().set('width', '30%');
    /* The panel for the filter control widgets. */ // 2   *****************
    var FiltroModalidad = ui.Panel({
      widgets: [
        ui.Panel([
          panel.Filtro_Modalidad.Label_Modalidad,
          panel.Filtro_Modalidad.select,
        ], ui.Panel.Layout.flow('horizontal'))
      ],
      style: panel.SECTION_STYLE_FONDO
    });
    panel.add(FiltroModalidad);
    panel.Filtro_Modalidad.select.setValue(panel.Filtro_Modalidad.select.items().get(0));
  //*********Fin Modalidad
  panel.filters = {
      mapCenter: ui.Checkbox({label: 'Aplicar filtro en el mapa.', value: true, disabled: true}),
      startDate: ui.Textbox('YYYY-MM-DD', '2021-01-01'),
      endDate: ui.Textbox('YYYY-MM-DD', '2021-08-09'),
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
      var Fondo = panel.Filtro_Fondo.Clave_Fondo.getValue();
      var Constancia = panel.Filtro_Constancia.Constancia.getValue();
      var Inciso = panel.Filtro_Inciso.Inciso.getValue();
      var centre;
      //Validamos si hay un estado seleccionado o dejamos el area de interes que se tiene por default.
      if (CveEdoSeleccionado === undefined) {CveEdoSeleccionado = '28';}
      if(CveEdoSeleccionado !== undefined){
        NomEdoSeleccionado = ee.FeatureCollection(panel.COLLECTION_ID_EDOS)
                    .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', CveEdoSeleccionado)));
        MunicipiosxEstado = ee.FeatureCollection(panel.COLLECTION_ID_MUN)
                  .filter(ee.Filter.or(ee.Filter.eq('CVE_ENT', CveEdoSeleccionado))); //01                    
        Predios = ee.FeatureCollection(panel.COLLECTION_ID_Predios)
                  .filter(ee.Filter.or(ee.Filter.eq('Cve_EdoGeo', CveEdoSeleccionado)));
      }
      if(Fondo !== ''){
        Predios = Predios.filter(ee.Filter.or(ee.Filter.eq('ClaveAseg', Fondo)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
       if(Predios.size().getInfo() !== 0)
        {
          centre = Predios.geometry().centroid().coordinates();
          Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
        }
      }
      if(Fondo !== '' && Constancia !== ''){
        Predios = Predios.filter(ee.Filter.or(ee.Filter.eq('Constancia', Constancia)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
        if(Predios.size().getInfo() !== 0)
        {
          centre = Predios.geometry().centroid().coordinates();
          Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 12);
        }
      }
      if(Fondo !== '' && Constancia !== '' && Inciso !== ''){
        Predios = Predios.filter(ee.Filter.or(ee.Filter.eq('Inciso', ee.Number.parse(Inciso.slice(0,2)))));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
        if(Predios.size().getInfo() !== 0)
        {
          centre = Predios.geometry().centroid().coordinates();
          Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 14);
        }
      }
      //Cultivo
      if(Cultivo !== undefined){
        print('entro en cultivo', Cultivo);
        Predios = Predios.filter(ee.Filter.or(ee.Filter.eq('NombreCult', Cultivo)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
        if(Predios.size().getInfo() !== 0)
        {
          centre = Predios.geometry().centroid().coordinates();
          Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
        }
      }
      //Modalidad
      if(Modalidad !== 'Selecciona Modalidad'){
        Predios = Predios.filter(ee.Filter.or(ee.Filter.eq('ClaveTipoP', Modalidad)));  //ee.Number.parse(CveEdoSeleccionado.slice(0,2))
        if(Predios.size().getInfo() !== 0)
        {
          centre = Predios.geometry().centroid().coordinates();
          Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
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
     removeLayer('ESTADO');
     //removeLayer('ESTADO');
     //removeLayer('Municipios FILTROS');
     removeLayer('MUNICIPIOS');
     //removeLayer('BVH/AVV/AVH Composición FILTROS');
     removeLayer('BVH/AVV/AVH COMPOSICIÓN');
     //removeLayer('Áreas Inundadas FILTROS');
     removeLayer('ÁREAS INUNDADAS');
     removeLayer('SAVI_SENTINEL2');
     //removeLayer('SAVI_SENTINEL2 FILTROS');
     //removeLayer('EVI_SENTINEL2 FILTROS');
     removeLayer('EVI_SENTINEL2');
     //removeLayer('NDWI_SENTINEL2 FILTROS');
     removeLayer('NDWI_SENTINEL2');
     removeLayer('PREDIO SELECCIONADO');
     removeLayer('PUNTO BUSCADO');
     removeLayer('PUNTO SELECCIONADO');
     removeLayer('PV 2021/2021 AGROASEMEX');
     removeLayer('NDVI_SENTINEL2');
     //removeLayer('NDVI_SENTINEL2 FILTROS');
     removeLayer('NDVI_MODIS');
     removeLayer('EVI_MODIS');
     //removeLayer('NDVI_MODIS FILTROS');
     removeLayer('RGB_SENTINEL2');
     //removeLayer('RGB_SENTINEL2 FILTROS');
     removeLayer('VEGETACIÓN_SENTINEL2');
     //removeLayer('Vegetación_SENTINEL2 FILTROS');
     removeLayer('AGRICULTURA_SENTINEL2');
     //removeLayer('Agricultura_SENTINEL2 FILTROS');
     removeLayer('TEMP DE LA SUPERFICIE TERRESTRE');
     //removeLayer('Temp de la Superficie Terrestre FILTROS');
     removeLayer('PV 2021/2021 AGROASEMEX SEGUIMIENTO');
     removeLayer('PV 2021/2021 AGROASEMEX VIGENTES');
    //NDVI
    var addQualityBands = function(image) {
      return image
        .addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'))
        .addBands(image.expression ('float ((NIR - RED) / (NIR + RED + L))* (1+L)',
        {
          'L': 0.428, // Cobertura vegetacion 0-1
          'NIR': image.select ('B8').multiply(0.0001),
          'RED': image.select ('B4').multiply(0.0001)
        }).rename('SAVI'))
        .addBands(image.expression 
        (
          'float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))',   
          {                                                                   
            'NIR': image.select ('B8').multiply(0.0001),  
            'RED': image.select ('B4').multiply(0.0001),
            'BLUE': image.select ('B2').multiply(0.0001)
          }).rename('EVI'))
        .addBands(image.normalizedDifference(['B8A', 'B11']).rename('NDMI')) 
      // time in days
      .addBands(image.metadata('system:time_start'));
    };
   //Colección de imágenes Sentinel-2, para el NDVI
    var S_2 = filtered
                 .filterBounds(NomEdoSeleccionado)
                 .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30)
                 .map(addQualityBands);
    NDVI_EVI_NDMI_SAVI = S_2.select(['NDMI', 'SAVI', 'NDVI', 'EVI']);
     var S2_NDVI = filtered
              .filterBounds(NomEdoSeleccionado)
              .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 30);
     var S2_Layer = filtered
                    .map(function(image) {
                      return image.addBands(image.metadata('system:time_start'));
                    })
                  .mosaic()
                  .clip(NomEdoSeleccionado);
     var ndvi = S2_NDVI.map(function(image) {
        return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
     });
     ndvi_Layer = S2_Layer.select().addBands(S2_Layer.normalizedDifference(['B8', 'B4']));
     CapaNDVI = ndvi;   //NDVI para gráfica
     /* Para NDVI MODIS         */
      var MOD_NDVI = filtroNDVI_MOD.select("NDVI");
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
      /* Para EVI MODIS         */
      var MOD_EVI = filtroNDVI_MOD.select("EVI");
      var MODIS_EVI = MOD_EVI.map( function(img){
        return img.multiply(0.0001)
        .copyProperties(img,['system:time_start','system:time_end']);
      });
      var MODIS_EVI_LAYER = MODIS_EVI
                            .map(function(image) {
                              return image.addBands(image.metadata('system:time_start'));
                            })
                          .mosaic()
                          .select("EVI")
                          .clip(NomEdoSeleccionado);
      var unionNDVI = MODIS_NDVI.merge(ColeccionModis);
      var NDVI_MODIS2 = CapaNDVI.merge(unionNDVI);   //Union del ndvi para la gráfica
      NDVI_MODIS = NDVI_MODIS2.merge(ColeccionModisM1Desv); 
      //var NDVI_MODIS = NDVI_MODIS2.merge(ColeccionModisM1Desv);
      EVI_NDVI_MODIS = NDVI_MODIS.merge(MODIS_EVI);
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
     //SAVI
     var SAVI_Coll = filtered
                    .map(function(image) {
                      return image.addBands(image.metadata('system:time_start'));
                    })
                  .mosaic()
                  .clip(NomEdoSeleccionado);
      var SAVI = SAVI_Coll.expression (
        'float (((NIR - RED) / (NIR + RED + L))* (1+L))',
        {
          'L': 0.5, // Cobertura vegetacion 0-1
          'NIR': SAVI_Coll.select ('B8').multiply(0.0001),
          'RED': SAVI_Coll.select ('B4').multiply(0.0001)
        });                
      //FIN SAVI
      // EVI (Enhanced Vegetation Index)
      var EVI = SAVI_Coll.expression (
        'float (2.5 * ((NIR - RED) / (NIR + (6 * RED) - (7.5 * BLUE) + 1)))', 
        {
          'NIR': SAVI_Coll.select ('B8').multiply(0.0001),  
          'RED': SAVI_Coll.select ('B4').multiply(0.0001),
          'BLUE': SAVI_Coll.select ('B2').multiply(0.0001)
        });
      // FIN  EVI (Enhanced Vegetation Index)
      var NDWI = SAVI_Coll.normalizedDifference(['B8A', 'B11']); //(B8A-B11)/(B8A+B11);
      //TEMPERATURA
      temp = filtroTEMP
                .select("LST_Day_1km");
                //.map(function(img) {
                //  return img
                //    .multiply(0.02)
                //    .subtract(273.15)
                //    .copyProperties(img, ['system:time_start']);
                //});
      var modis = temp.map(function(img){
                  var mulitplied = img.multiply(0.02);
                  mulitplied = mulitplied.subtract(273.15);
                  var unmasked = img.gt(-999).reduceRegion(ee.Reducer.count(), NomEdoSeleccionado, 1000);
                  return mulitplied.set('count', unmasked.get('LST_Day_1km'))
                  .copyProperties(img,['system:time_start','system:time_end']);
                });
      //Temp = modis;
      //var ModisImagen = ee.Image(modis.median());
      //TempModis = ModisImagen.clip(NomEdoSeleccionado);
      temperature = FuncTemp;
      var ModisImagen = ee.Image(modis.reduce(ee.Reducer.last()));   //ee.Image(FuncTemp.median()); 
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
    //Apply filter to reduce speckle   PAra las área inundadas
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
    message.style().set('shown', false);
    ValoresSuperficie();
    //*******************FIN Limpiamos y agregamos los valores del estado**************************
      Map.addLayer(NomEdoSeleccionado.style(Estados_STYLE), {}, 'ESTADO', 0); 
      Map.addLayer(MunicipiosxEstado.style(Municipios_STYLE), {}, 'MUNICIPIOS', 0);
      Map.addLayer((beforeVH.addBands(afterVH).addBands(beforeVH)).clip(NomEdoSeleccionado), {min: -25, max: -8}, 'BVH/AVV/AVH COMPOSICIÓN', 0);
      Map.addLayer((differenceVH_thresholded.updateMask(differenceVH_thresholded)).clip(NomEdoSeleccionado), {palette:"0000FF"}, 'ÁREAS INUNDADAS', 0);
      Map.addLayer(SAVI.clip(NomEdoSeleccionado), SAVI_STYLE,'SAVI_SENTINEL2', 0);
      Map.addLayer(EVI.clip(NomEdoSeleccionado), SAVI_STYLE,'EVI_SENTINEL2', 0);
      Map.addLayer(NDWI.clip(NomEdoSeleccionado), NDWI_STYLE,'NDWI_SENTINEL2', 0);
      Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), RGB_STYLE, 'RGB_SENTINEL2', 0);
      Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), VEGETACION_STYLE, 'VEGETACIÓN_SENTINEL2', 0);
      Map.addLayer(S2_RGB.clip(NomEdoSeleccionado), AGRICULTURA_STYLE, 'AGRICULTURA_SENTINEL2', 0);
      Map.addLayer(ndvi_Layer.clip(NomEdoSeleccionado), SAVI_STYLE, 'NDVI_SENTINEL2', 0);
      Map.addLayer(MODIS_NDVI_LAYER.clip(NomEdoSeleccionado), SAVI_STYLE, 'NDVI_MODIS', 0);
      Map.addLayer(MODIS_EVI_LAYER.clip(NomEdoSeleccionado), SAVI_STYLE, 'EVI_MODIS', 0);
      Map.addLayer(TempModis.clip(NomEdoSeleccionado), Temp_STYLE, 'TEMP DE LA SUPERFICIE TERRESTRE', 0);
      Map.addLayer(Predios.style(Predios_STYLE), {}, 'PV 2021/2021 AGROASEMEX', 1); //PrediosVigentes
      Map.addLayer(PrediosVigentes.style(PrediosVigentes_STYLE), {}, 'PV 2021/2021 AGROASEMEX VIGENTES', 0);
      //Map.addLayer(PrediosNDVI.style(PrediosNDVI_STYLE), {}, 'PV 2021/2021 AGROASEMEX SEGUIMIENTO', 0);
      if (panel.filters.mapCenter.getValue() === false) {
        removeLayer('ESTADO');
        removeLayer('MUNICIPIOS');
        removeLayer('BVH/AVV/AVH COMPOSICIÓN');
        removeLayer('ÁREAS INUNDADAS');
        removeLayer('SAVI_SENTINEL2');
        removeLayer('EVI_SENTINEL2');
        removeLayer('NDWI_SENTINEL2');
        removeLayer('PREDIO SELECCIONADO');
        removeLayer('PUNTO BUSCADO');
        removeLayer('PUNTO SELECCIONADO');
        removeLayer('NDVI_SENTINEL2');
        removeLayer('NDVI_MODIS');
        removeLayer('EVI_MODIS');
        removeLayer('RGB_SENTINEL2');
        removeLayer('VEGETACIÓN_SENTINEL2');
        removeLayer('AGRICULTURA_SENTINEL2');
        removeLayer('TEMP DE LA SUPERFICIE TERRESTRE');
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
        Ciclo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Ciclo']).get('list');
        ClaveAseg = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveAseg']).get('list');
        ClaveTipoP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ClaveTipoP']).get('list');
        Constancia = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Constancia']).get('list');
        EdoGeo = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['EstadoPred']).get('list');    //EdoGeo
        FechaAcept = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FechaAcept']).get('list');    //NO esta en la linda de atributos
        FinVigenci = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['FinVigenci']).get('list');
        HAS_POLY = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['HAS_PRE']).get('list');   //HAS_POLY
        ID_AGROASE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');  //ID_AGROASE
        Inciso = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Inciso']).get('list');
        InicioVige = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['InicioVige']).get('list');
        MunicipioP = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['MunicipioP']).get('list');
        NombreCult = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreCult']).get('list');
        NombreFond = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['NombreFond']).get('list');
        SEPERFICIE = getSelectedPredios.reduceColumns(ee.Reducer.toList(), ['Superficie']).get('list');  
        ValoresPredio();
    chart = ui.Chart.image.series(
      {
        imageCollection: EVI_NDVI_MODIS, 
        region: getSelectedPredios, 
        reducer: ee.Reducer.mean(), 
        scale: 10
      })
      .setSeriesNames(['EVI_MODIS', 'NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'])
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
          0: {color: 'ORANGE'},
          1: {color: 'BLACK'},  
          2: {color: 'RED'}, 
          3: {color: '#4ea93b'},  
          4: {color: '#005c00'}
        },
        curveType: 'function'
      });
    chart.style().set({stretch: 'both'});
    }else
    {
      chart = ui.Chart.image.series(
        {
          imageCollection: EVI_NDVI_MODIS, 
          region: getSelectedPredios, 
          reducer: ee.Reducer.mean(), 
          scale: 10
        })
        .setSeriesNames(['EVI_MODIS', 'NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL']) 
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
            0: {color: 'ORANGE'},
            1: {color: 'BLACK'},  
            2: {color: 'RED'}, 
            3: {color: '#4ea93b'},  
            4: {color: '#005c00'}
          },
          curveType: 'function'
        });
    chart.style().set({stretch: 'both'});
    }
      return chart; 
  }
  function getSelectedPrediosSAVI() {
    var predio = Predios.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
    return predio;
  }
  //FUNCIÓN PARA GENERAR OTRA GRÁFICA.
  function makeResultsChartSAVI(getSelectedPrediosSAVI) {
    var chartInd;
    if(getSelectedPrediosSAVI.name()==='FeatureCollection')
    {
        var titulo = getSelectedPrediosSAVI.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');  //ID_AGROASE ID_AGROASE
        chartInd = ui.Chart.image.series(
          {
            imageCollection: NDVI_EVI_NDMI_SAVI, 
            region: getSelectedPrediosSAVI, 
            reducer: ee.Reducer.mean(),
            scale: 10,
            xProperty: 'system:time_start'
          })
          //.setSeriesNames(['SAVI', 'NDMI', 'EVI', 'NDVI'])  
          .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
          //.setChartType('ColumnChart')
          .setOptions({
            title: titulo.getInfo(0) + '',
            titleTextStyle: {italic: false, bold: true},
            legend: {position: 'right'},
            vAxis: {title: ''},  
            hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
            pointSize: 5,
            series: {
              0: {color: 'RED'},  
              1: {color: '#4ea93b'}, 
              2: {color: '#005c00'},  
              3: {color: '#692d18'}  
            },
            curveType: 'function'
          });
        }else
        {
          chartInd = ui.Chart.image.series(
            {
              imageCollection: NDVI_EVI_NDMI_SAVI, 
              region: getSelectedPrediosSAVI, 
              reducer: ee.Reducer.mean(),
              scale: 10,
              xProperty: 'system:time_start'
            })
            //.setSeriesNames(['SAVI', 'NDMI', 'EVI', 'NDVI'])  
            .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
            //.setChartType('ColumnChart')
            .setOptions(
            {
              title: 'ÍNDICES',
              titleTextStyle: {italic: false, bold: true},
              legend: {position: 'right'},
              vAxis: {title: ''},  
              hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
              pointSize: 5,
              series: {
                0: {color: 'RED'},  
                1: {color: '#4ea93b'}, 
                2: {color: '#005c00'},  
                3: {color: '#692d18'}  
              },
              curveType: 'function'
            });
        }
        chartInd.style().set({stretch: 'both'});
        return chartInd; 
  }
  //FIN Grafica Indices
  //*************Grafica temperatura
  function getSelectedPrediosTEMP() {
    var predio = Predios.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
    return predio;
  }
  //FUNCIÓN PARA GENERAR GRÁFICA DE TEMPERATURA.
  function makeResultsChartTEMP(getSelectedPrediosTEMP) {
    var chart;
    var FuncTemperatura = temp.map(function(img){
        var mulitplied = img.multiply(0.02);
        mulitplied = mulitplied.subtract(273.15);
        var unmasked = img.gt(0).reduceRegion(ee.Reducer.count(), getSelectedPrediosTEMP, 10);
        return mulitplied.set('count', unmasked.get('LST_Day_1km'))
        .copyProperties(img,['system:time_start']); //,'system:time_end'
      });
    var TemperaturaGrafica = FuncTemperatura.filter(ee.Filter.gt('count', 0));
    if(getSelectedPrediosTEMP.name()==='FeatureCollection')
    {
        var titulo = getSelectedPrediosTEMP.reduceColumns(ee.Reducer.toList(), ['ID_AGROASE']).get('list');  //ID_AGROASE ID_AGROASE
        chart = ui.Chart.image.series(
          {
            imageCollection: temperature, 
            region: getSelectedPrediosTEMP, 
            reducer: ee.Reducer.mean(),
            scale: 1000,
            xProperty: 'system:time_start'
          })
          .setSeriesNames(['LST_Diario_1km'])  
            .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
            //.setChartType('ColumnChart')
            .setOptions({
               title: titulo.getInfo(0) + '',
               titleTextStyle: {italic: false, bold: true},
               //legend: {position: 'right'},
               vAxis: {title: '°C'},
               hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
               pointSize: 4,
                series: {
                  0: {color: 'blue'}
                },
                curveType: 'function'
            });
        }else
        {
          chart = ui.Chart.image.series(
          {
            imageCollection: temperature, // TemperaturaGrafica, 
            region: getSelectedPrediosTEMP, 
            reducer: ee.Reducer.mean(),
            scale: 1000,
            xProperty: 'system:time_start'
          })
          .setSeriesNames(['LST_Diario_1km'])  
            .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
            //.setChartType('ColumnChart')
            .setOptions({
               title: 'TEMPERATURA',  //title: titulo.getInfo(0) + '',
               titleTextStyle: {italic: false, bold: true},
               //legend: {position: 'right'},
               vAxis: {title: '°C'},
               hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
               pointSize: 4,
                series: {
                  0: {color: 'blue'}
                },
                curveType: 'function'
            });
        }
        chart.style().set({stretch: 'both'});
        return chart; 
  }
   // FIN Gráfica temperatura
  // Updates the map overlay using the currently-selected VGeoOperacion.
  function updateOverlay() {
    var overlay = getSelectedPredios().style(HIGHLIGHT_STYLE);
    Map.layers().set(17, ui.Map.Layer(overlay, {}, 'PREDIO SELECCIONADO'));
  }
  // Updates the chart using the currently-selected charting function,
  function updateChart() {
    var chartBuilder = chartTypeToggleButton.value;
    var chartBuilderG = chartTypeToggle.value;
    var chartBuilderTemp = chartTypeToggleTemp.value;
    var d = getSelectedPredios().size();
    var punto = getSelectedPoint();
    var filtered = NomEdoSeleccionado.filter(ee.Filter.bounds(punto));
    if(d.getInfo() === 1){                //Dentro de un predio
      var chart = chartBuilder(getSelectedPredios());
      var chart2 = chartBuilderG(getSelectedPrediosSAVI());
      var chartTemp = chartBuilderTemp(getSelectedPrediosTEMP());
      resultsPanel.clear().add(chart).add(buttonPanel);
      resultPanelGraficaSAVI.clear().add(chart2).add(PanelGraficaSAVI);
      resultPanelGraficaTEMP.clear().add(chartTemp).add(PanelGraficaTEMP);
    }
    else
    if(filtered.size().getInfo() === 1)         //Fuera de un predio, pero dentro del estado de interés
    {
      var  chartPixel = chartBuilder(getSelectedPoint());
      var  chartPixel2 = chartBuilderG(getSelectedPoint());
      var  chartPixelTemp = chartBuilderTemp(getSelectedPoint());
      removeLayer('PREDIO SELECCIONADO');
      resultsPanel.clear().add(chartPixel).add(buttonPanel);
      resultPanelGraficaSAVI.clear().add(chartPixel2).add(PanelGraficaSAVI);
      resultPanelGraficaTEMP.clear().add(chartPixelTemp).add(PanelGraficaTEMP);
    }
    else
    {                                           //Fuera del estado de interés
      clearResults();
    }
  }
  // Clears the set of selected points and resets the overlay and results
  // panel to their default state.
  function clearResults() {
    selectedPoints = [];
    removeLayer('PREDIO SELECCIONADO');
    removeLayer('PUNTO BUSCADO');
    removeLayer('PUNTO SELECCIONADO');
    //message.style().set('shown', false);
    //Limpiamos si hay alguna figura dibujada
    if(cargaInicial == 1){
        clearGeometry();
        chartPanel.style().set('shown', false);
        chartPanelSAVI.style().set('shown', false);
        chartPanelTemperatura.style().set('shown', false);
        message.style().set('shown', false);
    }
    //FIN Limpiamos si hay alguna figura dibujada
    panel.remove(DatosPredio);                      //Limpiamos datos del predio al limpiar la gráfica.
    DatosPredio = '';
    Map.layers().remove(Map.layers().get(17));
    Map.layers().remove(Map.layers().get(18));
    Map.layers().remove(Map.layers().get(19));
    var instructionsLabel = ui.Label('Selecciona un predio para ver su NDVI.');   //resultsPanelGrafica2
    instructionsLabel.style().set('color', 'green');
    resultsPanel.widgets().reset([instructionsLabel]);
    resultPanelGraficaSAVI.widgets().reset();
    resultPanelGraficaTEMP.widgets().reset();
  }
  // Register a click handler for the map that adds the clicked point to the
  // list and updates the map overlay and chart accordingly.
  function handleMapClick(location) {
    clearResults();
    selectedPoints = [];  //Limpiamos los predios seleccionados, para solo graficar uno.
    selectedPoints.push([location.lon, location.lat]);
    updateOverlay();
    updateChart();
  }
  Map.onClick(handleMapClick);
  Map.onClick(ValoresPixel);
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
        }
      ],
      updateChart);
  var chartTypeToggle = ToggleButton(
      [
        {
          label: 'Mostrar resultado en tabla',
          value: makeResultsChartSAVI,
        }
      ],
      updateChart);
  var chartTypeToggleTemp = ToggleButton(
      [
        {
          label: 'Mostrar resultado en tabla',
          value: makeResultsChartTEMP,
        }
      ],
      updateChart);
  // A panel containing the two buttons .
  var buttonPanel = ui.Panel(
      [ui.Button('Limpiar', clearResults)], //chartTypeToggleButton   //Quitamos el boton de mostrar resultado en tabla.
      ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px', color: 'green'});
  // A panel containing the two buttons .
  var PanelGraficaSAVI = ui.Panel(
      [/*ui.Button('Limpiar', clearResults)*/], //chartTypeToggleButton   //Quitamos el boton de mostrar resultado en tabla.
      ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
  var PanelGraficaTEMP = ui.Panel(
      [/*ui.Button('Limpiar', clearResults)*/], //chartTypeToggleButton   //Quitamos el boton de mostrar resultado en tabla.
      ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
  var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
  var resultPanelGraficaSAVI = ui.Panel({style: {position: 'bottom-right'}});
  var resultPanelGraficaTEMP = ui.Panel({style: {position: 'middle-left'}});
  Map.add(resultsPanel);
  Map.add(resultPanelGraficaSAVI);
  Map.add(resultPanelGraficaTEMP);
  clearResults();
  //Agregamos panel para buscar coordenadas
  var panelCoordenadas = ui.Panel();
  //panelCoordenadas.TEXT = {width: '30%'};
  //Variables 
  panelCoordenadas.style().set('width', '365px');
  panelCoordenadas.style().set('position', 'top-center');
  panelCoordenadas.SECTION_STYLE = {margin: '0 0 0 0'};
  panelCoordenadas.SECTION_STYLE_FONDO = {margin: '0 0 0 0'};
  panelCoordenadas.TEXT_STYLE = {color: 'green', fontWeight: 'bold', fontSize: '12px', padding: '0px 2px 0px 0px'}; //, position : 'bottom-center'
  /* Capturar coordenadas. */
    panelCoordenadas.Filtro_Coord = {
      Clave_Lon: ui.Textbox('-100.39787844912692', ''),  //, {width: '50%'}   //0611 //20.582179013096415, -100.39787844912692
      Label_Lon: ui.Label('Lon: ', panelCoordenadas.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
      Clave_Lat: ui.Textbox('20.582179013096415', ''),  //, {width: '50%'}   //0611
      Label_Lat: ui.Label('Lat: ', panelCoordenadas.TEXT_STYLE),//, panel.Filtro_Fondo.Clave_Fondo
      boton: ui.Button({
          label: 'Buscar',
            style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'},
            onClick: function() {
              //inspector.style().set('shown', false);
              if(panelCoordenadas.Filtro_Coord.Clave_Lon.getValue() !== '' && panelCoordenadas.Filtro_Coord.Clave_Lat.getValue() !== '')
              {
                try{
                  //the same code you have now
                  var Longitud = ee.Number.parse(panelCoordenadas.Filtro_Coord.Clave_Lon.getValue());
                  var Latitud = ee.Number.parse(panelCoordenadas.Filtro_Coord.Clave_Lat.getValue());
                  var coorde = ee.Geometry.Point(Longitud, Latitud);  //-100.38806, 20.58806
                  //ee.Geometry.Point(lon, lat);
                  var PuntoBuscado = ui.Map.Layer(coorde, {color: 'BLUE'}, 'PUNTO BUSCADO');
                  Map.layers().set(19, PuntoBuscado);
                  Map.centerObject(coorde, 20);
                  //Mensaje.setValue('');
                }
                catch(error){
                  //print('error: ', error);
                  removeLayer('PUNTO BUSCADO');
                  message.clear();
                  message.style().set('shown', true); //true
                  message.add(ui.Label({
                        value: ['Las coordenadas que ingresó no son correctas.'],
                        style: {color: 'red', fontWeight: 'bold', fontSize: '12px', padding: '0px 0px 0px 0px'}
                      }));
                     //Add a button to hide the Panel.
                  message.add(ui.Button({
                     label: 'Cerrar',
                     style: {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'},
                     onClick: function() {
                       message.style().set('shown', false);
                     }
                   }));
                  //Mensaje.setValue('Las coordenadas son incorrectas');
                    //anything you want to do in the event of an error 
                    //if you leave it blank, nothing will execute here and
                    //i will increase and the loop will go on like nothing ever happenned
                }
              }
            }
        })
    };
    panelCoordenadas.Filtro_Coord.Clave_Lon.style().set('width', '25%');
    panelCoordenadas.Filtro_Coord.Clave_Lat.style().set('width', '25%');
    var FiltroFondo = ui.Panel({
      widgets: [
        //ui.Label('Selecciona un Fondo:', {fontWeight: 'bold'}),
        ui.Panel([
          panelCoordenadas.Filtro_Coord.Label_Lon,
          panelCoordenadas.Filtro_Coord.Clave_Lon,
          panelCoordenadas.Filtro_Coord.Label_Lat,
          panelCoordenadas.Filtro_Coord.Clave_Lat,
          panelCoordenadas.Filtro_Coord.boton,
        ], ui.Panel.Layout.flow('horizontal')),
      ],
      style: panelCoordenadas.SECTION_STYLE_FONDO
    });
    panelCoordenadas.add(FiltroFondo);
  Map.add(panelCoordenadas);
  //Creamos el apartado del mensaje para cuando las coordenadas no sean correctas:
  var message = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  message.style().set('position', 'bottom-center');
  message.style().set('shown', false);
  // Add a label to the panel.
  message.add(ui.Label('', {color: 'green', fontWeight: 'bold', fontSize: '15px'/*, padding: '0px 0px 0px 0px'*/} ));
  // Add the panel to the default map.
  Map.add(message);
  // Create an inspector panel with a horizontal layout.
  var inspector = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  inspector.style().set('position', 'bottom-center');
  inspector.style().set('shown', false);
  // Add a label to the panel.
  inspector.add(ui.Label('', {color: 'green', fontWeight: 'bold', fontSize: '15px'/*, padding: '0px 0px 0px 0px'*/} ));
  // Add the panel to the default map.
  Map.add(inspector);
  // Set the default map's cursor to a "crosshair".
  Map.style().set('cursor', 'crosshair');
  // Register a callback on the map to be invoked when the map is clicked.
  function getSelectedPoint() 
    {
      var Coo = selectedPoints[0];
      var lon = Coo[0];
      var lat = Coo[1];
      var punto = ee.Geometry.Point(lon, lat);
      return punto;
    }
    function ValoresPixel(coords) 
    {
    // Clear the panel and show a loading message.
    inspector.clear();
    inspector.style().set('shown', true); //true
    inspector.add(ui.Label('Leyendo...', {color: 'green', fontWeight: 'bold', fontSize: '15px', padding: '0px 0px 0px 0px'}));
    // Compute the mean NDVI; a potentially long-running server operation.
    lon.setValue('Lon: ' + coords.lon.toFixed(2)),
    lat.setValue('Lat: ' + coords.lat.toFixed(2));
    point = ee.Geometry.Point(coords.lon, coords.lat);
    var PuntoSeleccionado = ui.Map.Layer(point, {color: 'FF0000'}, 'PUNTO SELECCIONADO');
    Map.layers().set(18, PuntoSeleccionado);
    var temporalMean = ndvi_Layer.reduce(ee.Reducer.mean());     //TempModis
    var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 1);
    var tempMean = TempModis.reduce(ee.Reducer.mean());     //TempModis
    var sampPoint = tempMean.reduceRegion(ee.Reducer.mean(), point, 1000);
    var computedValue = [sampledPoint.get('mean'), sampPoint.get('mean')];
    var temperatura;
    var ndvi;
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
    panel.remove(SuperficiesTotales);
    SuperficiesTotales = '';
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
  var CajaLeyenda = ui.Label(
  {
    style: {backgroundColor: '#' + simbolo,
    padding: '15px', // TamaÃ±o del simbolo
    margin: '0px 0px 6px 0px'}
  }); // Posicion en la separacion de los simbolos
  //Representacion de leyenda en el visor
  return ui.Panel(
  {
    widgets: [CajaLeyenda, TextoLeyenda],
    layout: ui.Panel.Layout.Flow('horizontal')});
  };
  for (var i = 0; i < 8; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
  Map.add(Leyenda);
  LayersCargados();
  //Check box para habilitar o deshabilitar la simbología de temperatura.
  // Define a UI widget and add it to the map.
  var Simbologia = ui.Checkbox({label: 'Ver simbología de la temperatura', style: {fontSize: '16px', width: '200px', position: 'bottom-left', padding: '5px 5px'}});  //style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
  Map.add(Simbologia);
  // ActiveDictionaries are mutable; set a style property.
  Simbologia.style().set('color', 'green');
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
  //**************Panel para dibujar un polígono. ********************************************************
  var drawingTools = Map.drawingTools();
  drawingTools.setShown(false);
  while (drawingTools.layers().length() > 0) {
    var layer = drawingTools.layers().get(0);
    drawingTools.layers().remove(layer);
  }
  var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'c823cb'/*, fillColor: '00000000'*/});
  drawingTools.layers().add(dummyGeometry);
  function clearGeometry() {
    var layers = drawingTools.layers();
    layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
    if(cargaInicial == 1){
      message.style().set('shown', false);
      chartPanel.style().set('shown', false);
      chartPanelSAVI.style().set('shown', false);
      chartPanelTemperatura.style().set('shown', false);
    }
  }
  function drawRectangle() {
    clearGeometry();
    drawingTools.setShape('rectangle');
    drawingTools.draw();
  }
  function drawPolygon() {
    clearGeometry();
    drawingTools.setShape('polygon');
    drawingTools.draw();
  }
  function drawPoint() {
    clearGeometry();
    drawingTools.setShape('point');
    drawingTools.draw();
  }
  var chartPanel = ui.Panel(
    [ui.Button('Limpiar', clearGeometry())],
    ui.Panel.Layout.Flow('horizontal'),
    {width: '500px', margin: '0 0 0 auto', position: 'bottom-right', shown: false}
  );
  Map.add(chartPanel);
  var chartPanelSAVI = ui.Panel({
    style:{width: '500px', margin: '0 0 0 auto', position: 'bottom-right', shown: false}
  });
  Map.add(chartPanelSAVI);
  var chartPanelTemperatura = ui.Panel({
    style:{width: '500px', margin: '0 0 0 auto', position: 'middle-left', shown: false}
  });
  Map.add(chartPanelTemperatura);
  //Creamos la gráfica para EVI_MODIS', 'NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL al terminar de dibujar.
  function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);  //true
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  var area = aoi.area({'maxError': 1}).divide(100 * 100);    //Calculamos el area en ha.
  inspector.clear();
  inspector.style().set('shown', true);  //true
  inspector.add(ui.Label({
        value: ['Área: ' + area.getInfo(0).toFixed(2) + ' ha.'],
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
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Chart NDVI time series for the selected area of interest.
    var chart = ui.Chart.image.series(
      {
        imageCollection: EVI_NDVI_MODIS, 
        region: aoi, 
        reducer: ee.Reducer.mean(), 
        scale: 10
      })
      .setSeriesNames(['EVI_MODIS', 'NDVI_MODIS', 'NDVI_DESVIACIÓN', 'NDVI_NORMAL', 'NDVI_ACTUAL'])  
      .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
      //.setChartType('ColumnChart')
      .setOptions({
        title: 'ÍNDICES NDVI',
        titleTextStyle: {italic: false, bold: true},
        //legend: {position: 'right'},
        vAxis: {title: 'NDVI'},
        hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
        pointSize: 5,
        lineWidth : 1,
        series: {
          0: {color: 'ORANGE'},
          1: {color: 'BLACK'},  
          2: {color: 'RED'}, 
          3: {color: '#4ea93b'},  
          4: {color: '#005c00'}  
        },
        curveType: 'function'
      });
    // Replace the existing chart in the chart panel with the new chart.
    chart.style().set({stretch: 'both'});
    chartPanel.widgets().reset([chart]);
  }
      //Prueba agregar check box en la gráfica
  //var checkbox = ui.Checkbox('NDVI_MODIS', false);
    //checkbox.onChange(function(checked) {
    //  if (checked) {
    //    //ui.root.widgets().reset([splitPanel]);
    //  } else {
    //    //ui.root.widgets().reset([singleMap]);
    //  }
    //});
      //FIN Prueba agregar check box en la gráfica
  function chartNdviTimeSeriesSAVI() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanelSAVI.style().get('shown')) {
    chartPanelSAVI.style().set('shown', true);  //true
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
      var chart = ui.Chart.image.series(
            {
              imageCollection: NDVI_EVI_NDMI_SAVI, 
              region: aoi, 
              reducer: ee.Reducer.mean(),
              scale: 10,
              xProperty: 'system:time_start'
            })
            //.setSeriesNames(['SAVI', 'NDMI', 'EVI', 'NDVI'])  
            .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
            //.setChartType('ColumnChart')
            .setOptions(
            {
              title: 'ÍNDICES',
              titleTextStyle: {italic: false, bold: true},
              legend: {position: 'right'},
              vAxis: {title: ''},  
              hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
              pointSize: 5,
              lineWidth : 1,
              series: {
                0: {color: 'RED'},  
                1: {color: '#4ea93b'}, 
                2: {color: '#005c00'},  
                3: {color: '#692d18'}  
              },
              curveType: 'function'
            });
    // Replace the existing chart in the chart panel with the new chart.
    chart.style().set({stretch: 'both'});
    chartPanelSAVI.widgets().reset([chart]);
  }
  function chartTimeSeriesTemp() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanelTemperatura.style().get('shown')) {
    chartPanelTemperatura.style().set('shown', true);  //true
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  var FuncTemperatura = temp.map(function(img){
        var mulitplied = img.multiply(0.02);
        mulitplied = mulitplied.subtract(273.15);
        //mulitplied = mulitplied - 273.15;
        var unmasked = img.gt(0).reduceRegion(ee.Reducer.count(), aoi, 10);
        return mulitplied.set('count', unmasked.get('LST_Day_1km'))
        .copyProperties(img,['system:time_start']); //,'system:time_end'
      });
    var TemperaturaGrafica = FuncTemperatura.filter(ee.Filter.gt('count', 0));
      var chart = ui.Chart.image.series(
            {
              imageCollection: temperature, //TemperaturaGrafica, 
              region: aoi, 
              reducer: ee.Reducer.mean(),
              scale: 1000,
              xProperty: 'system:time_start'
            })
            .setSeriesNames(['LST_Diario_1km'])  
            .setChartType('LineChart')    // 'ScatterChart', 'LineChart', and 'ColumnChart'.
            //.setChartType('ColumnChart')
            .setOptions({
               title: 'TEMPERATURA',
               titleTextStyle: {italic: false, bold: true},
               //legend: {position: 'right'},
               vAxis: {title: '°C'},
               hAxis: {title: 'FECHA', format: 'dd/MM', gridlines: {count: 12}},
               pointSize: 4,
                series: {
                  0: {color: 'blue'}
                },
                curveType: 'function'
            });
    // Replace the existing chart in the chart panel with the new chart.
    chart.style().set({stretch: 'both'});
    chartPanelTemperatura.widgets().reset([chart]);
  }
  drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
  drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
  drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeriesSAVI, 500));
  drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeriesSAVI, 500));
  drawingTools.onDraw(ui.util.debounce(chartTimeSeriesTemp, 500));
  drawingTools.onEdit(ui.util.debounce(chartTimeSeriesTemp, 500));
  var symbol = {
    rectangle: '⬛',
    polygon: '🔺',
    point: '📍',
  };
  var controlPanel = ui.Panel({
    widgets: [
      ui.Label('Selecciona una opción.'),
      ui.Button({
        label: symbol.rectangle + ' Rectángulo',
        onClick: function() {
          clearResults();
          drawRectangle();
          },
        style: {stretch: 'horizontal'}
      }),
      ui.Button({
        label: symbol.polygon + ' Polígono',
        style: {stretch: 'horizontal'},
        onClick: function() {
          clearResults();
          chartPanel.style().set('shown', false);
          chartPanelSAVI.style().set('shown', false);
          chartPanelTemperatura.style().set('shown', false);
          drawPolygon();
        }
      }),
      ui.Button({
        label: symbol.point + ' Punto',
        style: {stretch: 'horizontal'},
        onClick: function() {
          clearResults();
          chartPanel.style().set('shown', false);
          chartPanelSAVI.style().set('shown', false);
          chartPanelTemperatura.style().set('shown', false);
          drawPoint();
          //controlPanel.ui.Button.style().set('backgroundColor', 'blue');
          }
      }),
      ui.Button({
        label: ' Limpiar',
        style: {stretch: 'horizontal', color: 'green'},
        onClick: function() {
          clearResults();
          chartPanel.style().set('shown', false);
          chartPanelSAVI.style().set('shown', false);
          chartPanelTemperatura.style().set('shown', false);
          clearGeometry();
          //drawPoint();
          }
      }),
    ],
    style: {position: 'bottom-left'},
    layout: null,
  });
  Map.add(controlPanel);
  controlPanel.style().set('shown', false);
  var OpcionDibujo = ui.Checkbox({label: 'Dibujar polígono', style: {fontSize: '16px', width: '175px', position: 'bottom-left', padding: '5px 5px'}});  //style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
  Map.add(OpcionDibujo);
  OpcionDibujo.style().set('color', 'green');
  OpcionDibujo.onChange(function(checked) {
    if(checked)
        {
            message.style().set('shown', false);
            controlPanel.style().set('shown', true);
        } 
        else
        {
          clearGeometry();
          chartPanel.style().set('shown', false);
          chartPanelSAVI.style().set('shown', false);
          chartPanelTemperatura.style().set('shown', false);
          controlPanel.style().set('shown', false);
          message.style().set('shown', false);
        }
  });
  //FIN Panel para dibujar un polígono.
  //Variable para validar carga inicial
  cargaInicial = 1;
  //ui.util.setInterval(Mensaje, 20);
  var centre = Predios.geometry().centroid().coordinates();
  Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);