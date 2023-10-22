var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -70.10148386918559,
                -12.922598207814342
              ],
              [
                -70.10148386918559,
                -13.025642137791856
              ],
              [
                -69.85978465043559,
                -13.025642137791856
              ],
              [
                -69.85978465043559,
                -12.922598207814342
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.10148386918559, -12.922598207814342],
                  [-70.10148386918559, -13.025642137791856],
                  [-69.85978465043559, -13.025642137791856],
                  [-69.85978465043559, -12.922598207814342]]], null, false),
            {
              "system:index": "0"
            })]);
//Rodri Load Sentinel-1 C-band SAR Ground Range collection (log scale, VH, descending)
var roi = geometry
var zoom = 12
var Fecha_inicial='2017-03-01'
var Fecha_intermedia='2018-06-01'
var Fecha_final='2019-09-01'
//------------------------------------------
function sumarDias(fecha){
  fecha.setDate(fecha.getDate() + 10);
  return fecha;
}
var Fecha_inicial_add = new Date(Fecha_inicial);
var Fecha_intermedia_add = new Date(Fecha_intermedia);
var Fecha_final_add = new Date(Fecha_final);
sumarDias(Fecha_inicial_add)
sumarDias(Fecha_intermedia_add)
sumarDias(Fecha_final_add)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VH');
print(collectionVH, 'Collection VH');
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VV');
print(collectionVH, 'Collection VV');
//Filter by date
var Fecha_inicial_VV = collectionVV.filterDate(Fecha_inicial, sumarDias(Fecha_inicial_add)).mosaic();
var Fecha_intermedia_VV = collectionVV.filterDate(Fecha_intermedia, sumarDias(Fecha_intermedia_add)).mosaic();
var Fecha_final_VV = collectionVV.filterDate(Fecha_final, sumarDias(Fecha_final_add)).mosaic();
var Fecha_inicial_VH = collectionVH.filterDate(Fecha_inicial, sumarDias(Fecha_inicial_add)).mosaic();
var Fecha_intermedia_VH = collectionVH.filterDate(Fecha_intermedia, sumarDias(Fecha_intermedia_add)).mosaic();
var Fecha_final_VH = collectionVH.filterDate(Fecha_final, sumarDias(Fecha_final_add)).mosaic();
var Fecha_inicial_VV_clip = Fecha_inicial_VV.clipToCollection(roi)
var Fecha_intermedia_VV_clip = Fecha_intermedia_VV.clipToCollection(roi)
var Fecha_final_VV_clip = Fecha_final_VV.clipToCollection(roi)
var Fecha_inicial_VH_clip = Fecha_inicial_VH.clipToCollection(roi)
var Fecha_intermedia_VH_clip = Fecha_intermedia_VH.clipToCollection(roi)
var Fecha_final_VH_clip = Fecha_final_VH.clipToCollection(roi)
// Display map
Map.centerObject(roi, zoom);
Map.addLayer(Fecha_inicial_VV_clip, {min:-15,max:0}, 'Fecha_inicial VV', 0);
Map.addLayer(Fecha_intermedia_VV_clip, {min:-15,max:0}, 'Fecha_intermedia VV', 0);
Map.addLayer(Fecha_final_VV_clip, {min:-15,max:0}, 'Fecha_final VV', 0);
Map.addLayer(Fecha_inicial_VH_clip, {min:-25,max:0}, 'Fecha_inicial VH', 0);
Map.addLayer(Fecha_intermedia_VH_clip, {min:-25,max:0}, 'Fecha_intermedia VH', 0);
Map.addLayer(Fecha_final_VH_clip, {min:-25,max:0}, 'Fecha_final VH', 0);
Map.addLayer(Fecha_inicial_VH_clip.addBands(Fecha_intermedia_VH_clip).addBands(Fecha_final_VH_clip), {min: -25, max: -9}, 'Inicial/Intermedio/Final composite', 0);
//Aplicacion de filtro para reducir el ruido o speckle
var SMOOTHING_RADIUS = 50;
var Fecha_inicial_VV_clip_filtered = Fecha_inicial_VV_clip.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var Fecha_inicial_VH_clip_filtered = Fecha_inicial_VH_clip.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var Fecha_intermedia_VV_clip_filtered = Fecha_intermedia_VV_clip.focal_mean(SMOOTHING_RADIUS, 'circle','meters');
var Fecha_intermedia_VH_clip_filtered = Fecha_intermedia_VH_clip.focal_mean(SMOOTHING_RADIUS, 'circle','meters');
var Fecha_final_VV_clip_filtered = Fecha_final_VV_clip.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var Fecha_final_VH_clip_filtered = Fecha_final_VH_clip.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//Display filtered images
Map.addLayer(Fecha_inicial_VV_clip_filtered, {min:-15,max:0}, '2016 VV Filtered',0);
Map.addLayer(Fecha_inicial_VH_clip_filtered, {min:-27,max:0}, '2016 VH Filtered',0);
Map.addLayer(Fecha_intermedia_VV_clip_filtered, {min:-15,max:0}, '2018 VV Filtered',0);
Map.addLayer(Fecha_intermedia_VH_clip_filtered, {min:-27,max:0}, '2018 VH Filtered',0);
Map.addLayer(Fecha_final_VV_clip_filtered, {min:-15,max:0}, '2019 VV Filtered',0);
Map.addLayer(Fecha_final_VH_clip_filtered, {min:-27,max:0}, '2019 VH Filtered',0);
Map.addLayer(Fecha_inicial_VH_clip_filtered.addBands(Fecha_intermedia_VH_clip_filtered).addBands(Fecha_final_VH_clip_filtered), {min: -25, max: -8}, 'Inicial/Intermedio/Final HV filtered RGB', 1);
// Calcular la variacion entre dos fechas
var ratio_inicial_intermedio_VH= Fecha_inicial_VH_clip_filtered.subtract(Fecha_intermedia_VH_clip_filtered);
var ratio_inicial_intermedio_VV= Fecha_inicial_VV_clip_filtered.subtract(Fecha_intermedia_VV_clip_filtered);
var ratio_intermedio_final_VH= Fecha_intermedia_VH_clip_filtered.subtract(Fecha_final_VH_clip_filtered);
var ratio_intermedio_final_VV= Fecha_intermedia_VV_clip_filtered.subtract(Fecha_final_VV_clip_filtered);
// Visualizar imagenes ratio
Map.addLayer(ratio_inicial_intermedio_VH, {min: -9,max:9}, 'Ratio VH 2016/2018', 0);
Map.addLayer(ratio_inicial_intermedio_VV, {min: -9,max:9}, 'Ratio VV 2016/2018', 0);
Map.addLayer(ratio_intermedio_final_VH, {min: -9,max:9}, 'Ratio VH 2018/2019', 0);
Map.addLayer(ratio_intermedio_final_VV, {min: -9,max:9}, 'Ratio VV 2018/2019', 0);
//Calculo de histogramas para cada imagen
print(ui.Chart.image.histogram({image:ratio_inicial_intermedio_VH, region:roi, scale:300}));
print(ui.Chart.image.histogram({image:ratio_intermedio_final_VH, region:roi, scale:300}));
// Combinar el promedio y reductor para la desviacion estandart.
var reducers = ee.Reducer.mean().combine({
reducer2: ee.Reducer.stdDev(),
sharedInputs: true
});
//Calculate the mean and standard deviation for each ratio image
var stats_inicial_intermedio_VH = ratio_inicial_intermedio_VH.reduceRegion({
reducer: reducers,
geometry: roi,
scale: 10,
});
var stats_intermedio_final_VH = ratio_intermedio_final_VH.reduceRegion({
reducer: reducers,
geometry: roi,
scale: 10,
});
//Print the mean and stdv for each ratio image
print('Estadisticas:', stats_inicial_intermedio_VH, stats_intermedio_final_VH)
//Apply Thresholds based on < stdvx1.5 to create a vegetation regrowth mask
//stdDev*1.5+mean
var RATIO_UPPER_THRESHOLD_inicial_intermedio = 4.46;
var RATIO_UPPER_THRESHOLD_intermedio_final = 4.47;
var ratio_inicial_intermedio_VH_thresholded = ratio_inicial_intermedio_VH.gt(RATIO_UPPER_THRESHOLD_inicial_intermedio);
var ratio_intermedio_final_VH_thresholded = ratio_intermedio_final_VH.gt(RATIO_UPPER_THRESHOLD_intermedio_final);
//Display Masks
Map.addLayer(ratio_inicial_intermedio_VH_thresholded.updateMask(ratio_inicial_intermedio_VH_thresholded),{palette:"FF0000"},'Vegetation Loss 16/18',0);
Map.addLayer(ratio_intermedio_final_VH_thresholded.updateMask(ratio_intermedio_final_VH_thresholded),{palette:"FF0000"},'Vegetation Loss 18/19',1);
//----------------------PANEL
var label = ui.Label('AIDER');
print(label);
// Make a button widget.
var button = ui.Button('AIDER!');
// Set a callback function to run when the
// button is clicked.
button.onClick(function() {
  print('http://www.aider.com.pe/');
});
// Display the button in the console.
print(button);