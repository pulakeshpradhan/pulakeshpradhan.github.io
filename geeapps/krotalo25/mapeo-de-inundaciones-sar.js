var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/krotalo25/QuintanaRoo"
    }) || ee.FeatureCollection("users/krotalo25/QuintanaRoo");
/*===========================================================================================
            MAPEO DE INUNDACIONES SAR UTILIZANDO UN ENFOQUE DE DETECCIÓN DE CAMBIOS
  ===========================================================================================
  Dentro de este script, SAR Sentinel-1 se utiliza para generar un mapa de extensión de 
  inundaciones. Se eligió un enfoque de detección de cambios, donde se comparará una imagen
  de evento antes y después de la inundación. Se están utilizando imágenes de Sentinel-1 GRD.
  Las imágenes de Ground Range Detected incluyen los siguientes pasos de preprocesamiento: 
  Eliminación de ruido térmico, calibración radiométrica, corrección de terreno, por lo que 
  solo es necesario aplicar un filtro Speckle en el preprocesamiento.  
  ===========================================================================================
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                                   EJECUTAR UNA DEMO (opcional)
  Si desea ejecutar un ejemplo de mapeo de una extensión de inundación, puede usar la 
  geometría predefinida a continuación, así como otras configuraciones de parámetros 
  predefinidas. El código lo llevará a Beira, Mosambique, donde un ciclón provocó una gran
  inundación costera en marzo de 2019, que afectó a más de 200.000 personas. 
   --> Elimina el símbolo de comentario (//) a continuación para que Google Earth Engine 
   reconozca el polígono.*/
//var geometry = ee.Geometry.Polygon([[[35.53377589953368, -19.6674648789114],[34.50106105578368, -18.952058786515526],[33.63314113390868, -19.87423907259203],[34.74825343859618, -20.61123742951084]]]);
/* ¡Ahora presiona Ejecutar para comenzar la demostración! 
  ¡No olvide eliminar/descomentar esta geometría antes de crear una nueva!
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  *******************************************************************************************
                                SELECCIONE SU PROPIA ÁREA DE ESTUDIO  
  Utilice la herramienta polígono en la esquina superior izquierda del panel del mapa para 
  dibujar la forma de su área de estudio. Un solo clic agrega vértices, un doble clic completa
  el polígono.
  ** CUIDADO **: En 'Geometry Imports' (arriba a la izquierda en el panel de mapa) desmarque 
  la casilla de geometría, para que no bloquee la vista de las imágenes más adelante.
  *******************************************************************************************
                                       FIJAR PERIODO DE TIEMPO
  Establezca las fechas de inicio y finalización de un período ANTES de la inundación. 
  Asegúrese de que sea lo suficientemente largo para que Sentinel-1 adquiera una imagen 
  (tasa de repetición = 6 días). Ajuste estos parámetros, si sus ImageCollections (ver Consola)
  no contienen ningún elemento.*/
var before_start= '2020-03-01';
var before_end='2020-03-10';
// Ahora configure los mismos parámetros para DESPUÉS de la inundación..
var after_start='2020-11-01';
var after_end='2020-11-30';
/********************************************************************************************
                     CONFIGURAR PARÁMETROS SAR (se puede dejar por defecto)*/
var polarization = "VH"; /*or 'VV' --> VH es principalmente la polarización preferida para el
                           mapeo de inundaciones. Sin embargo, siempre depende de su área de 
                           estudio, también puede seleccionar 'VV'.*/ 
var pass_direction = "DESCENDING"; /* o 'ASCENDING' cuando se comparan imágenes, utilice solo
                           una dirección de paso. Considere cambiar este parámetro, si su 
                           colección de imágenes está vacía. En algunas áreas existen más 
                           imágenes ascendentes que descendentes o al revés.*/
var difference_threshold = 1.25; /*threshodl que se aplicará en la imagen de diferencia 
                           (después de la inundación - antes de la inundación). Ha sido elegido
                           por ensayo y error. En caso de que el resultado de la extensión de 
                           la inundación muestre muchas señales falsas positivas o negativas,
                           ¡considere cambiarlo! */
//var relative_orbit = 79; 
                          /*Si conoce la órbita relativa de su área de estudio, puede filtrar
                          su colección de imágenes aquí, para evitar errores causados al 
                          comparar diferentes órbitas relativas.*/
/**************************************************************************************************
  ---->>> ¡NO EDITE EL GUIÓN DESPUÉS DE ESTE PUNTO! (a menos que sepa lo que está haciendo) <<<---
  ------------->>> ¡Ahora presiona 'RUN' en la parte superior del codigo! <<<------------------
  -----> El producto de inundación final estará listo para descargar a la derecha (en tareas) <-----
  ******************************************************************************************/
//--------------------------- Traducción de las entradas del usuario -----------------------//
//--------------------------- SELECCIÓN Y PREPROCESAMIENTO DE DATOS ------------------------//
// cambiar el nombre de la función de geometría seleccionada
var aoi = ee.FeatureCollection(geometry);
// Cargar y filtrar datos de Sentinel-1 GRD por parámetros predefinidos
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(aoi)
  .select(polarization);
// Seleccionar imágenes por fechas predefinidas
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
// Imprimir mosaicos seleccionados en la consola
      // Extraer la fecha de los metadatos
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      // imprimir fechas de imágenes anteriores a la consola
      var before_count = before_collection.size();
      print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);
      // imprimir fechas de imágenes posteriores a la consola
      var after_count = before_collection.size();
      print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);
// Crear un mosaico de mosaicos seleccionados y córtarlos al área de estudio
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
// Aplicar reducir el ruido del radar por metodo de suavizado  
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
//------------------------------- CÁLCULO DEL ALCANCE DE LA INUNDACIÓN -------------------------------//
// Calcule la diferencia entre las imágenes de antes y después
var difference = after_filtered.divide(before_filtered);
// Aplicar el umbral de diferencia predefinido ('difference-threshold') y crear la máscara de extensión de inundación
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
// Refinar el resultado de la inundación utilizando conjuntos de datos adicionales
      // Incluir una capa del JCR sobre la estacionalidad del agua superficial para enmascarar los 
      // píxeles de inundación de las áreas de agua "permanente" (donde hay agua> 10 meses del año).
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      // Capa inundada donde a los cuerpos de agua perennes (agua> 10 meses / año) se les asigna un valor 0
      var flooded_mask = difference_binary.where(swater_mask,0);
      // área inundada final sin píxeles en masas de agua perennes
      var flooded = flooded_mask.updateMask(flooded_mask);
      // Calcula la conectividad de píxeles para eliminar aquellos conectados a 8 vecinos o menos
      // Esta operación reduce el ruido del producto de extensión de inundación. 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      // Enmascare las áreas con una pendiente superior al 5 por ciento utilizando un modelo de elevación digital 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
// Calcula el área de extensión de la inundación
// Crea una capa ráster que contiene la información del área de cada píxel 
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
// Suma las áreas de píxeles inundados que el valor predeterminado es 'bestEffort: true' 
// para reducir el tiempo de cálculo, para obtener un resultado más preciso, establezca bestEffort en falso y 
// aumente 'maxPixels'.
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // native resolution 
  //maxPixels: 1e9,
  bestEffort: true
  });
// Convierte la extensión de la inundación a hectáreas (los cálculos de área se dan originalmente en metros)  
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
//------------------------------  EVALUACIÓN DE DAÑOS  ----------------------------------//
//--------------------------- Densidad de población expuesta ----------------------------//
// Cargar la capa de densidad de población de los asentamientos humanos globales JRC
// Resolución: 250m. Se indica el número de personas por celda.
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(aoi);
// Calcula la cantidad de población expuesta y obtiene la proyección GHSL
var GHSLprojection = population_count.projection();
// Reproyecte la capa de inundación a escala GHSL
var flooded_res1 = flooded
    .reproject({
    crs: GHSLprojection
  });
// Crea un ráster que muestra la población expuesta utilizando solo la capa de inundación remuestreada
var population_exposed = population_count
  .updateMask(flooded_res1)
  .updateMask(population_count);
// Suma de los valores de píxeles del ráster de población expuesta 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 250,
  maxPixels:1e9 
});
// Redondea el número de personas expuestas como un número entero
var number_pp_exposed = stats.getNumber('population_count').round();
//----------------------------- Affected agricultural land ----------------------------//
// Usando MODIS Land Cover Type Anual Global 500m se filtra la colección de imágenes 
// por el producto MODIS Land Cover más actualizado
var LC = ee.ImageCollection('MODIS/006/MCD12Q1')
  .filterDate('2014-01-01',after_end)
  .sort('system:index',false)
  .select("LC_Type1")
  .first()
  .clip(aoi);
// Extracciòn de los píxeles de tierras de cultivo utilizando las clases de tierras de cultivo (> 60%) y Tierras de cultivo/Natural
// Mosaicos de vegetación: mosaicos de cultivo a pequeña escala 40-60% incl. Vegetación natural
var cropmask = LC
  .eq(12)
  .or(LC.eq(14))
var cropland = LC
  .updateMask(cropmask)
// obtener proyección MODIS
var MODISprojection = LC.projection();
// Reproyectar la capa de inundación a la escala MODIS
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
// Calcula las tierras de cultivo afectadas utilizando la capa de inundación remuestreada
var cropland_affected = flooded_res
  .updateMask(cropland)
// Obtiene el área de píxeles de la capa de tierra de cultivo afectada
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// suma de píxeles de la capa de tierra de cultivo afectada
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  maxPixels: 1e9
  });
// Convierte el area a hectareas
var crop_area_ha = crop_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
//-------------------------------- Área urbana afectada ------------------------------//
// Usando el mismo producto MODIS Land Cover
// Se filtran las áreas urbanas
var urbanmask = LC.eq(13)
var urban = LC
  .updateMask(urbanmask)
// Calcula las áreas urbanas afectadas utilizando la capa de inundación remuestreada
var urban_affected = urban
  .mask(flooded_res)
  .updateMask(urban);
// Obtiene el área de píxeles de la capa urbana afectada
var urban_pixelarea = urban_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// Suma de píxeles de la capa de tierra de cultivo afectada
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  bestEffort: true,
  });
// Convierte el area a hectareas
var urban_area_ha = urban_stats
  .getNumber('LC_Type1')
  .divide(10000)
  .round();
//------------------------------  VISUALIZACIÓN DE PRODUCTOS   ----------------------------------//
// Mosaico SAR antes y después de las inundaciones
Map.centerObject(aoi,8);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Antes de la inundación',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'Después de la inundación',1);
// Capa de diferencia
Map.addLayer(difference,{min:0,max:2},"Capa de diferencia",0);
// Zonas inundadas
Map.addLayer(flooded,{palette:"0000FF"},'Zonas inundadas');
// Densidad de población
var populationCountVis = {
  min: 0,
  max: 200.0,
  palette: ['060606','337663','337663','ffffff'],
};
Map.addLayer(population_count, populationCountVis, 'Densidad de población',0);
// Población expuesta
var populationExposedVis = {
  min: 0,
  max: 200.0,
  palette: ['yellow', 'orange', 'red'],
};
Map.addLayer(population_exposed, populationExposedVis, 'Población expuesta');
// Cobertura MODIS Land Cover
var LCVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(LC, LCVis, 'Cobertura',0);
// Tierras de cultivo
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
Map.addLayer(cropland, croplandVis, 'Tierras de cultivos',0)
// Tierras de cultivo afectadas
Map.addLayer(cropland_affected, croplandVis, 'Tierras de cultivos afectadas'); 
// Urbano
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['grey'],
};
Map.addLayer(urban, urbanVis, 'Áreas urbanas',0)
// Urbano afectado
Map.addLayer(urban_affected, urbanVis, 'Áreas urbanas afectadas'); 
//------------------------------------- EXPORTAR PRODUCTOS ------------------------------------//
// Exporta área inundada como archivo TIFF 
Export.image.toDrive({
  image: flooded, 
  description: 'Raster_extension_inundacion',
  fileNamePrefix: 'inundado',
  region: aoi, 
  maxPixels: 1e10
});
// Exporta el área inundada como shapefile (para un análisis más detallado en, por ejemplo, QGIS)
// Convierte ráster de inundación en polígonos
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Exporta polígonos de inundación como archivo ESRI shape 
Export.table.toDrive({
  collection:flooded_vec,
  description:'Vector_extension_inundacion',
  fileFormat:'SHP',
  fileNamePrefix:'inundado_vec'
});
// Exporta datos auxiliares como shp
// Densidad de población expuesta
Export.image.toDrive({
  image:population_exposed,
  description:'Poblacion_expuesta',
  scale: 250,
  fileNamePrefix:'poblacion_expuesta',
  region: aoi,
  maxPixels:1e10
});
//---------------------------------- GENERACIÓN DEL MAPA --------------------------------//
//-------------------------- Mostrar los resultados en el mapa -----------------------//
// Establecer la posición del panel donde se mostrarán los resultados
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
//Prepare the visualtization parameters of the labels 
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px', 
  'color':'bf0f19',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };
// Create lables of the results 
// Titel and time period
var title = ui.Label('Resultados', titleTextVis);
var text1 = ui.Label('Estado de inundación entre:',textVis);
var number1 = ui.Label(after_start.concat(" y ",after_end),numberVIS);
// Alternatively, print dates of the selected tiles
//var number1 = ui.Label('Please wait...',numberVIS); 
//(after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;
// Estimated flood extent 
var text2 = ui.Label('Extensión estimada de la inundación:',textVis);
var text2_2 = ui.Label('Espere por favor...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('basado en imágenes Senintel-1 '+val)});
var number2 = ui.Label('Espere por favor...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectareas')}),numberVIS;
// Estimated number of exposed people
var text3 = ui.Label('Número estimado de personas expuestas: ',textVis);
var text3_2 = ui.Label('basado en GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Espere por favor...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimated area of affected cropland 
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Estimación de tierras de cultivo afectadas:',textVis);
var text4_2 = ui.Label('Espere por favor', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('basado en cobertura MODIS '+val +' (500m)')}), subTextVis;
var number4 = ui.Label('Espere por favor...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' hectareas')}),numberVIS;
// Estimated area of affected urban
var text5 = ui.Label('Estimación de áreas urbanas afectadas:',textVis);
var text5_2 = ui.Label('Espere por favor', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('based on MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number5 = ui.Label('Espere por favor...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' hectareas')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Descargo de responsabilidad: Este producto se ha obtenido automáticamente sin datos de validación. Toda la información geográfica tiene limitaciones debido a la escala, resolución, fecha e interpretación de los materiales originales. El productor no asume ninguna responsabilidad sobre el contenido o el uso del mismo.',subTextVis)
// Produced by...
var text7 = ui.Label('Codigo producido por: ONU-SPIDER Diciembre de 2019, traducción Luis Antonio Mora Tembre', subTextVis)
// Add the labels to the panel 
results.add(ui.Panel([
        title,
        text1,
        number1,
        text2,
        text2_2,
        number2,
        text3,
        text3_2,
        number3,
        text4,
        text4_2,
        number4,
        text5,
        text5_2,
        number5,
        text6,
        text7]
      ));
// Add the panel to the map 
Map.add(results);
//----------------------------- Mostrar la simbología en el mapa --------------------------//
// Crear leyenda (* créditos para este sitio en Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// establecer la posición del panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
// Crear título de Simbología
var legendTitle = ui.Label('Simbología',titleTextVis);
// Agrega el título al panel
legend.add(legendTitle);
// Crea y aplica estilo a 1 fila de la Simbología.
var makeRow = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Usa relleno para dar la altura y el ancho de la caja.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Crea la etiqueta con relleno para el texto de descripción.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Paleta con los colores
var palette =['#0000FF', '#30b21c', 'grey'];
// Nombre de la simbología
var names = ['Áreas potencialmente inundadas','Tierras de cultivo afectadas','Urbano afectado'];
// Agrega color y nombres
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Crea un segundo título de leyenda para mostrar la densidad de población expuesta
var legendTitle2 = ui.Label({
value: 'Densidad de población expuesta',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
// Agrega un segundo título al panel
legend.add(legendTitle2);
// Crea la imagen de la simbología
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((populationExposedVis.max-populationExposedVis.min)/100.0).add(populationExposedVis.min);
var legendImage = gradient.visualize(populationExposedVis);
// Crea texto encima de la simbología
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(populationExposedVis['max']))
],
});
legend.add(panel);
// Crea una miniatura a partir de la imagen
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
// Agrega la miniatura a la simbología
legend.add(thumbnail);
// Crea texto encima de la simbología
var panel = ui.Panel({
widgets: [
ui.Label(populationExposedVis['min'])
],
});
legend.add(panel);
// Agrega simbología al mapa (alternativamente, también puede imprimir la leyenda en la consola).
Map.add(legend);