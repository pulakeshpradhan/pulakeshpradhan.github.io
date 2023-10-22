var mangroves = ui.import && ui.import("mangroves", "table", {
      "id": "projects/ee-grettelvargas/assets/Mangroves"
    }) || ee.FeatureCollection("projects/ee-grettelvargas/assets/Mangroves"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -86.4335493049693,
                11.360271048471356
              ],
              [
                -86.4335493049693,
                7.829420949236042
              ],
              [
                -81.8632368049693,
                7.829420949236042
              ],
              [
                -81.8632368049693,
                11.360271048471356
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-86.4335493049693, 11.360271048471356],
          [-86.4335493049693, 7.829420949236042],
          [-81.8632368049693, 7.829420949236042],
          [-81.8632368049693, 11.360271048471356]]], null, false);
var fecha_inicio_1 = '2015-05-01'; 
var fecha_final_1 = '2015-05-30';
var fecha_inicio_2 = '2017-05-01'; 
var fecha_final_2 = '2017-05-30';
var fecha_inicio_3 = '2020-05-01'; 
var fecha_final_3 = '2020-05-30';
///Cargar el shapefile de 
var roi = ee.FeatureCollection(geometry);
////Visualizar el Shapefile 
//Map.addLayer(roi, {color: 'gray'}, 'Areas de interes',0);
// Cargar Sentinel-1 C-band Primer Periodo SAR Ground Range collection (log scale)
var S1collection_1 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.filterDate(fecha_inicio_1, fecha_final_1)
.select('VV', 'VH');
print(S1collection_1, 'S1_1 Collection'); 
// Cargar Sentinel-1 Segundo Periodo C-band SAR Ground Range collection (log scale)
var S1collection_2 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.filterDate(fecha_inicio_2, fecha_final_2)
.select('VV', 'VH');
print(S1collection_2, 'S1_2 Collection'); 
// Cargar Sentinel-1 C-band Tercer Periodo SAR Ground Range collection (log scale)
var S1collection_3 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.filterDate(fecha_inicio_3, fecha_final_3)
.select('VV', 'VH');
print(S1collection_3, 'S1_3 Collection'); 
//Crear compuesto de imagenes de Sentinel-1
var S1_1_median = S1collection_1.median();
var S1_2_median = S1collection_2.median();
var S1_3_median = S1collection_3.median();
//var S1_1_median = S1collection_1.median().clip(roi);
//var S1_2_median = S1collection_2.median().clip(roi);
//var S1_3_median = S1collection_3.median().clip(roi);
//Aplicar filtro para reducir el moteado
var SMOOTHING_RADIUS = 30;
var S1_antes_fil = S1_1_median.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var S1_desp_fil  = S1_1_median.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//var PALSAR_3_filtered = PALSAR_3.select('HH', 'HV').focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//Map.addLayer(S1_antes_fil.clip(mangroves), {min:-15,max:0}, 'S1_antes_fil-2015',0);
//Map.addLayer(S1_desp_fil.clip(mangroves), {min:-15,max:0}, 'S1_despues_filt-2015',0);
//Visualizar las Imagenes
Map.addLayer(S1_1_median.clip(mangroves), {min:-15,max:0}, 'S1-2015',0);
Map.addLayer(S1_2_median.clip(mangroves), {min:-15,max:0}, 'S1-2017',0);
Map.addLayer(S1_3_median.clip(mangroves), {min:-15,max:0}, 'S1-2020',0);
var S1_VV_RGB = ee.Image.cat(S1_1_median.select('VV'), S1_2_median.select('VV'), S1_3_median.select('VV'));
var S1_VH_RGB = ee.Image.cat(S1_1_median.select('VH'), S1_2_median.select('VH'), S1_3_median.select('VH'));
Map.addLayer(S1_VV_RGB.clip(mangroves), {min:-20,max:0}, 'S1-VV-RGB', 0);
Map.addLayer(S1_VH_RGB.clip(mangroves), {min:-25,max:0}, 'S1-VH-RGB', 0);
//Cargar las imagenes Palsar
var PALSAR_1 = ee.Image('JAXA/ALOS/PALSAR/YEARLY/SAR/2015').clip(mangroves);
var PALSAR_2 = ee.Image('JAXA/ALOS/PALSAR/YEARLY/SAR/2017').clip(mangroves);
var PALSAR_3 = ee.Image('JAXA/ALOS/PALSAR/YEARLY/SAR/2020').clip(mangroves);
//Aplicar filtro para reducir el moteado
var SMOOTHING_RADIUS = 30;
var PALSAR_1_filtered = PALSAR_1.select('HH', 'HV').focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var PALSAR_2_filtered = PALSAR_2.select('HH', 'HV').focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var PALSAR_3_filtered = PALSAR_3.select('HH', 'HV').focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//Convertir los valores a dB:𝛾0 =10log10〈𝐷𝑁2〉+𝐶𝐹
//CF= calibration factor. CF=-83.0 para PALSAR 
var Palsardb_1 = PALSAR_1_filtered.pow(2).log10().multiply(10).add(-83.0);
var Palsardb_2 = PALSAR_2_filtered.pow(2).log10().multiply(10).add(-83.0);
var Palsardb_3 = PALSAR_3_filtered.pow(2).log10().multiply(10).add(-83.0);
//Visualizar las imagenes
Map.addLayer(Palsardb_1, {min:-15,max:0}, 'Palsar-2015',0);
Map.addLayer(Palsardb_2, {min:-15,max:0}, 'Palsar-2017',0);
Map.addLayer(Palsardb_3, {min:-15,max:0}, 'Palsar-2020',0);
var P1_HH_RGB = ee.Image.cat(Palsardb_1.select('HH'), Palsardb_2.select('HH'), Palsardb_3.select('HH'));
var P1_HV_RGB = ee.Image.cat(Palsardb_1.select('HH'), Palsardb_2.select('HH'), Palsardb_3.select('HH'));
Map.addLayer(P1_HH_RGB, {min:-20,max:0}, 'P-HH-RGB', 0);
Map.addLayer(P1_HV_RGB, {min:-25,max:0}, 'P-HV-RGB', 0);
//Exportar la imagen.
// Export.image.toDrive({
//   image: P1_HH_RGB,
//  description: 'PALSAR_MultiFecha_RGB',
//   scale: 25,
//    fileFormat: 'GeoTIFF',
// });