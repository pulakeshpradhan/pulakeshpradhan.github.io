var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -89.27943756360683,
                17.60240221632771
              ],
              [
                -89.27943756360683,
                12.104050771928618
              ],
              [
                -75.67836334485683,
                12.14701565134616
              ],
              [
                -75.65639068860683,
                14.743277894676375
              ],
              [
                -75.61244537610683,
                17.64428505976362
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
        [[[-89.27943756360683, 17.60240221632771],
          [-89.27943756360683, 12.104050771928618],
          [-75.67836334485683, 12.14701565134616],
          [-75.65639068860683, 14.743277894676375],
          [-75.61244537610683, 17.64428505976362]]], null, false),
    HN = ui.import && ui.import("HN", "table", {
      "id": "users/leofabiop120/Limite_HN"
    }) || ee.FeatureCollection("users/leofabiop120/Limite_HN"),
    Boundaries = ui.import && ui.import("Boundaries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    Location = ui.import && ui.import("Location", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -87.1582340880414,
            14.10524863691784
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0000ff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.Geometry.Point([-87.1582340880414, 14.10524863691784]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -89.91520066261293,
                24.020277720906265
              ],
              [
                -89.91520066261293,
                9.680794658783514
              ],
              [
                -66.18473191261293,
                9.680794658783514
              ],
              [
                -66.18473191261293,
                24.020277720906265
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
        [[[-89.91520066261293, 24.020277720906265],
          [-89.91520066261293, 9.680794658783514],
          [-66.18473191261293, 9.680794658783514],
          [-66.18473191261293, 24.020277720906265]]], null, false);
//Panel 1: Izquierda
var panel1 = ui.Panel();
panel1.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '450px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
ui.root.insert(0, panel1);
//Panel 2. Deracha
var panel2 = ui.Panel();
panel2.style().set('width', '300px');
ui.root.insert(2, panel2);
//Visualización de imagenes satelitales
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate("2020-11-05","2020-11-10")
                      .filterBounds(geometry)
                      .mosaic()
                      .divide(10000);
sentinel2 = ee.ImageCollection(sentinel2.clip(geometry));
var viz = {min: 0,  max: 0.3,
  bands: ['B4', 'B3', 'B2'],}; //Color Natural
Map.addLayer(sentinel2, viz, "Sentinel-2 Natural ( RGB )",false);
// Load Sentinel-1 images to map Flooding 
// This script was adapted based upon a script originally written by Simon Ilyushchenko (GEE team)
// Next steps will look at better delination of flood water from rice paddy + usual flood waters during rainy season
var pt = HN//geometry//ee.Geometry.Point(106.83889,-6.1361); // Beira, Mozambique
// Load Sentinel-1 C-band SAR Ground Range collection (log scaling, VV co-polar)
var collection = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(pt)
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.select('VV');
// Filter by date
var before = collection.filterDate('2019-12-01', '2019-12-12').mosaic();//early March
var after = collection.filterDate('2020-11-01', '2020-11-12').mosaic();//after cyclone
// remove the mountains from the data
var hydrosheds = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(hydrosheds);
var slope = terrain.select('slope');
// Threshold smoothed radar intensities to identify "flooded" areas.
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var diff_smoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var diff_thresholded = diff_smoothed.lt(DIFF_UPPER_THRESHOLD);
// remove all slopes greater then 2 degrees
var diff_thresholded_noslope = diff_thresholded.updateMask(slope.lt(2));
// Display map
Map.centerObject(HN,8);
Map.addLayer(before, {min:-30,max:0}, 'Antes de Inundación', 0);
Map.addLayer(after, {min:-30,max:0}, 'Despues de Inundación', 0);
//Map.addLayer(after.subtract(before), {min:-10,max:10}, 'After - before', 0);
Map.addLayer(diff_smoothed, {min:-10,max:10,}, 'Diferencia Suavizada', 0);
Map.addLayer(diff_thresholded_noslope.updateMask(diff_thresholded_noslope),
{palette:"Aqua"},'Área de Inundación',1);
/*
diff_thresholded_noslope.clip(HN);
var area = diff_thresholded_noslope.multiply(ee.Image.pixelArea().divide(10000));
var stats_fire1 = area.reduceRegion({reducer: ee.Reducer.sum(),geometry: HN, scale: 500, bestEffort : true, maxPixels: 1e13, tileScale: 16});
print('Área Inundada (Ha): ', stats_fire1);
*/
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: diff_thresholded_noslope,
  description:'Inundacion_HN_KML',
  fileFormat: 'KML'
});
Export.image.toDrive
({image: diff_thresholded_noslope.clip(HN),
 description: 'Inundacion_HN_raster',
 fileNamePrefix: 'Inundacion_HN_raster',
 scale:10,
 region: HN.geometry().bounds(),//.getInfo(),
 maxPixels: 1e12,});
// Create the application title bar.
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '20px', fontWeight: '500', margin: '8px 8px 1px 8px',textAlign: 'center'};
// Notes panel.
var notesPanel = ui.Panel({
  widgets: [
  ui.Label({value:'Inundaciones en Honduras 2020', style: noteStyle}),
  ui.Label({value:'Huracán ETA', style: noteStyle}),
  ],
  style: {shown: true, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500',textAlign: 'center'}
});
Map.add(notesPanel) 
var notesShow = false;
function notesButtonHandler() {
  if(notesShow){
    notesShow = false;
    notesPanel.style().set('shown', false);
    notesPanel.style().set('width', '83px');
    notesButton.setLabel('Ver Nota');
  } else {
    notesShow = true;
    notesPanel.style().set('shown', true);
    notesPanel.style().set('width', '290px');
    notesButton.setLabel('Ocultar Nota');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton = ui.Button({label: 'Ver Nota', onClick: notesButtonHandler, style: {margin: '0px'}});
// Notes panel.
var notesPanel = ui.Panel({
  widgets: [
  ui.Label({value:'Inundaciones Provocadas por el Huracan ETA en Honduras', style: noteStyle}),
  ui.Label({value:'El análisis de inundación refleja el impacto del Huracancan 2 días despues del evento de lluvias', style: noteStyle}),
  ui.Label({value:'La información implicita esta app expresa una estimación no validada en terreno', style: noteStyle}),
  ui.Label({value:'Esta app carga imágenes de Sentinel-1 para mapear Inundaciones', style: noteStyle}),
  ui.Label({value:'Este guión fue adaptado con base a un guión escrito originalmente por Simon Ilyushchenko (equipo GEE)', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'Fuente de Datos:', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'* Análisis del Clima en tiempo real: Windy', style: noteStyle, targetUrl:'https://www.windy.com/es/-Mostrar---a%C3%B1adir-m%C3%A1s-capas/overlays?cosc,14.404,-86.716,9'}),
  ui.Label({value:'* Sentinel-1 SAR GRD: C-band Synthetic Aperture Radar Ground Range Detected, log scaling', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/'}),
  ui.Label({value:'* GSMaP Operational: Global Satellite Mapping of Precipitation', style: noteStyle, targetUrl: 'https://sharaku.eorc.jaxa.jp/GSMaP/'}),
  ui.Label({value:'Temporada de Emergencia: 01-05 de Noviembre de 2020', style: noteStyle}),
  ui.Label({value:'Referemcia Sugerida', style: noteStyle}),
  ui.Label({value:'Casco, F. y Calderon, J. 2020. Aplicativo sobre el monitoreo de inunandaciones provocado por el Huracán ETA en Honduras', style: noteStyle}),
  ui.Label({value:'Contacto: Fabio Casco: 32852656, leofabiop120@hotmail.com', style: noteStyle}),
  ui.Label({value:'Contacto: Jorge Calderón: 9789-6183, georgverlbt.com@gmail.com', style: noteStyle}),
  ui.Label({value:'Si desea reportar una emergencia, llame al 911', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer = ui.Panel({widgets: [notesButton, notesPanel],
  style: {position: 'bottom-left', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
Map.add(notesContainer);
var button_location = ui.Button({
    label: 'Obtener tu Localización',
    onClick: function () {
        ui.util.getCurrentPosition(function (pt) {
            pt.evaluate(function (pt) {
                if (!pt) {
                    return
                }
                print("Printing coords: ", pt);
                var drawingTools = Map.drawingTools();
                var layer = ui.Map.GeometryLayer([pt], 'Location', 'red');
                drawingTools.layers().add(layer);
            })
        });
    }
});
panel2.add(button_location)
//-------------------------------------------Construir Gráfico de Serie Temporal----------------------------------------------------//
var Fecha_1 = "2020-01-01";
var Fecha_2 = "2020-12-31";
// Create panels to hold lon/lat values.
/*
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
*/
//Precipitación
var GSMaP = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational")
var CHIRPS= ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
var precip = GSMaP.filterDate('2010-01-01', '2020-12-31').select("hourlyPrecipRateGC")
  .sort('system:time_start', false)
  .filterBounds(HN);
//var precip = GSMaP.filterBounds(HN).filterDate(Fecha_1,Fecha_2).select("hourlyPrecipRateGC")
//  .sort('system:time_start', false)
  //.filterBounds(point);
//calculating monthly precipitation for the region
var years = ee.List.sequence(2020, 2020);
var months = ee.List.sequence(1, 12);
var monthlyPrecip =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = precip.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
Map.onClick(function(coords) {
  var lon = ui.Label();
  var lat = ui.Label();
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Point');
  //Map.layers().set(10, dot);
var latLabel = ui.Label({
    value: 'Latitude: ' + Math.round(coords.lat * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'black'}
    });
 var lonLabel = ui.Label({
    value: 'Longitude: ' + Math.round(coords.lon * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'black'}
    });   
var SRTM = ee.Image("USGS/SRTMGL1_003");
var mean_value = SRTM.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 100
  })
var value_results_eleva = ee.Number(mean_value.get('elevation').getInfo());  
var Pendiente= ee.Algorithms.Terrain(SRTM)
              .select("slope")
              //.clip(HN);
var mean_value_slope = Pendiente.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 100
  })             
var value_results_slope = ee.Number(mean_value_slope.get('slope').getInfo());  
var Elevacion_label = ui.Label(
  {value: "Elevación:"+ " "+value_results_eleva.getInfo()+ " "+"m.s.n.m",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
var slope_label = ui.Label(
  {value: "Pendiente:"+ " "+value_results_slope.getInfo()+ " "+"Grados",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
   //CHART MONTHLY PRECIPITACIÓN
    // Precipitación
var Preci_Chart = ui.Chart.image.series({
   imageCollection: monthlyPrecip,
   region: point,
   reducer: ee.Reducer.mean(),
   scale: 3000,
   xProperty: 'system:time_start'
});
Preci_Chart .setOptions({
  title: "Precipitación media mensual ",
  hAxis: {title: 'Fecha', format: 'MMM-YY'},
  vAxis: {title: 'Precipitación (mm)'},
  colors: ['MediumBlue'],
  pointSize: 3,
}).setChartType('ColumnChart');
panel2.widgets().set(2, latLabel);
panel2.widgets().set(3, lonLabel);
panel2.widgets().set(4, Elevacion_label); 
panel2.widgets().set(5, slope_label);
panel2.widgets().set(6, Preci_Chart);
//panel2.add(Elevacion_label);
//panel2.add(slope_label); 
panel2.style().set({shown: true});
});
//****************************************************************************************************************
//***************************************************************************************************************
var title1 = ui.Label('Simulación del Huracán ETA');
title1.style().set({
  'position':  'top-left',
  'fontSize': '15px'
  });
panel1.add(title1)
//****************************************************************************************************************
//***************************************************************************************************************
var Collection_VIII= ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational");
var text = require('users/gena/packages:text'); 
var centralAmCol = Boundaries;
var centralAmAoi = geometry2;
var prepFil = Collection_VIII.filterDate("2020-11-01", "2020-11-11")
                           .limit(90)
                           .select('hourlyPrecipRate');
var visArgs = {
  min: 0.0,
  max: 14.0,
  palette: ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};
var prepFilVis = prepFil.map(function(img) {
  return img.visualize(visArgs);
});
var pt = text.getLocation(centralAmAoi, 'right', '2%', '35%');
var empty = ee.Image().byte();
var centralAmOutline = empty
  .paint({featureCollection: centralAmCol, color: 1, width: 1})
  .visualize({palette: 'ffffff'});
//NUEVO-----------------------------------------------------------------------------//
var text = require('users/gena/packages:text')
var style = require('users/gena/packages:style')
var palette = ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']
var scale = 2500 // TODO: compute scale from region width / 600 instead of fixing
var textProperties = { fontSize: 32, textColor: 'ffffff' }
// gradient bar
var labels = ee.List.sequence(8, 20, 6)
var pt1 = text.getLocation(geometry2, 'left', '90%', '5%')
var pt2 = text.getLocation(geometry2, 'right', '85%', '35%')
var rect = ee.Geometry.Rectangle([pt1, pt2], 'EPSG:4326', false)
var gradientBar = style.GradientBar.draw(rect, {
  min: 8, max: 20, palette: palette, labels: labels, 
  format: '%d', text: textProperties, scale: scale
})
//-----------------------------------------------------------------------------------
var prepColOutline = prepFilVis.map(function(img) {
  var scale = 1500;
  var textVis = {fontType: 'Arial', fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 };
  var label = text.draw(img.get('system:index'), pt, scale, textVis);
  //var label = text.draw(img.date().format('YYYY-MM-dd'), pt, scale, textProperties)
  return img.blend(centralAmOutline).unmask(0).blend(label).blend(gradientBar);
});
var Thumbnail = {
  dimensions: 550,
  region: centralAmAoi,
  framesPerSecond: 7,
  crs: 'EPSG:3857'
};
var Animation = ui.Thumbnail( {
              image: (prepColOutline),
              params: Thumbnail,
              style: {
                      position: 'bottom-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}}); 
panel1.add(Animation, Thumbnail);
//****************************************************************************************************************
//***************************************************************************************************************
var title2 = ui.Label('Simulación del Huracán IOTA');
title2.style().set({
  'position':  'top-left',
  'fontSize': '15px'
  });
panel1.add(title2)
//****************************************************************************************************************
//***************************************************************************************************************
var Collection_VIII= ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational");
var text = require('users/gena/packages:text'); 
var centralAmCol = Boundaries;
var centralAmAoi = geometry2;
var prepFil = Collection_VIII.filterDate("2020-11-14", "2020-11-20")
                           .limit(90)
                           .select('hourlyPrecipRate');
var visArgs = {
  min: 0.0,
  max: 14.0,
  palette: ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};
var prepFilVis = prepFil.map(function(img) {
  return img.visualize(visArgs);
});
var pt = text.getLocation(centralAmAoi, 'right', '2%', '35%');
var empty = ee.Image().byte();
var centralAmOutline = empty
  .paint({featureCollection: centralAmCol, color: 1, width: 1})
  .visualize({palette: 'ffffff'});
//NUEVO-----------------------------------------------------------------------------//
var text = require('users/gena/packages:text')
var style = require('users/gena/packages:style')
var palette = ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']
var scale = 2500 // TODO: compute scale from region width / 600 instead of fixing
var textProperties = { fontSize: 32, textColor: 'ffffff' }
// gradient bar
var labels = ee.List.sequence(8, 20, 6)
var pt1 = text.getLocation(geometry2, 'left', '90%', '5%')
var pt2 = text.getLocation(geometry2, 'right', '85%', '35%')
var rect = ee.Geometry.Rectangle([pt1, pt2], 'EPSG:4326', false)
var gradientBar = style.GradientBar.draw(rect, {
  min: 8, max: 20, palette: palette, labels: labels, 
  format: '%d', text: textProperties, scale: scale
})
//-----------------------------------------------------------------------------------
var prepColOutline = prepFilVis.map(function(img) {
  var scale = 1500;
  var textVis = {fontType: 'Arial', fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 };
  var label = text.draw(img.get('system:index'), pt, scale, textVis);
  //var label = text.draw(img.date().format('YYYY-MM-dd'), pt, scale, textProperties)
  return img.blend(centralAmOutline).unmask(0).blend(label).blend(gradientBar);
});
var Thumbnail = {
  dimensions: 550,
  region: centralAmAoi,
  framesPerSecond: 7,
  crs: 'EPSG:3857'
};
var Animation = ui.Thumbnail( {
              image: (prepColOutline),
              params: Thumbnail,
              style: {
                      position: 'bottom-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}}); 
panel1.add(Animation, Thumbnail);
//****************************************************************************************************************
//***************************************************************************************************************
var title3 = ui.Label('Dinámica y Nubosidad del Huracán ETA: 02/11/2020');
title3.style().set({
  'position':  'top-left',
  'fontSize': '15px'
  });
panel1.add(title3)
//****************************************************************************************************************
//***************************************************************************************************************
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Generate a GOES-17 time-lapse video of cumulative fire pixels (yellow),
 * active fires pixels (orange), and smoke. Note that there is a limitation
 * on the total number of pixels composing an animation; adjust observation
 * duration, max video dimension, and geometry region as necessary to meet
 * size constraint.
 */
// #############################################################################
// ### USER INPUTS ###
// #############################################################################
var Hora1 = "T08:00:00"
var Hora2 = "T19:00:00"
// Define observation start and end time. 
var START_TIME = "2020-11-02"+Hora1;
var END_TIME = "2020-11-02"+Hora2;
var TIME_ZONE = 'America/Los_Angeles';
// Add outline.
var OUTLINE = Boundaries;
// Define video parameters.
var VID_PARAMS = {
  dimensions: 350, // Max dim.
  region: geometry,  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 10,
  crs: 'EPSG:4326',
};
// #############################################################################
// Band aliases.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
// 16 pairs of CMI and DQF followed by Bah 2018 synthetic green.
// Band numbers in the EE asset, 0-based.
var NUM_BANDS = 33;
// Skipping the interleaved DQF bands.
var BLUE_BAND_INDEX = (1 - 1) * 2;
var RED_BAND_INDEX = (2 - 1) * 2;
var VEGGIE_BAND_INDEX = (3 - 1) * 2;
var GREEN_BAND_INDEX = NUM_BANDS - 1;
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0,
  max: 0.42,
  gamma: 1.3,
};
// Function to scale the imagery and get green vis band.
var applyScaleAndOffset = function(image) {
  image = ee.Image(image);
  var bands = new Array(NUM_BANDS);
  for (var i = 1; i < 17; i++) {
    var bandName = 'CMI_C' + (100 + i + '').slice(-2);
    var offset = ee.Number(image.get(bandName + '_offset'));
    var scale =  ee.Number(image.get(bandName + '_scale'));
    bands[(i-1) * 2] = image.select(bandName).multiply(scale).add(offset);
    var dqfName = 'DQF_C' + (100 + i + '').slice(-2);
    bands[(i-1) * 2 + 1] = image.select(dqfName);
  }
  // Bah, Gunshor, Schmit, Generation of GOES-16 True Color Imagery without a
  // Green Band, 2018. https://doi.org/10.1029/2018EA000379
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var green1 = bands[RED_BAND_INDEX].multiply(0.45);
  var green2 = bands[VEGGIE_BAND_INDEX].multiply(0.10);
  var green3 = bands[BLUE_BAND_INDEX].multiply(0.45);
  var green = green1.add(green2).add(green3);
  bands[GREEN_BAND_INDEX] = green.rename(GREEN);
  return ee.Image(ee.Image(bands).copyProperties(image, image.propertyNames()));
};
// Paint state features to an image.
var outlineVis = ee.Image().byte()
  .paint({featureCollection: OUTLINE, color: 1, width: 1})
  .visualize({palette: 'FFFFFF', opacity: 0.5});
// Function to make cumulative fire image.
var cumulativeFire = function(currectTime) {
  var imgs = fire.filterDate(START_TIME, currectTime)
    .map(function(img) {
      return img.select('DQF').eq(0).selfMask();
    });
  return imgs.mosaic().visualize({palette: 'yellow', opacity: 0.6});
};
// Function to overlay the state line image.
var applyVis = function(image) {
  // Fire visualization.
  var endDate = image.date().advance(30, 'second');
  var startDate = endDate.advance(-2, 'hour');
  var fireImg = fire.filterDate(startDate, endDate)
    .sort('system:time_start', false).first();
  var currentFireVis = fireImg.select('DQF').eq(0).selfMask()
    .visualize({palette: 'red', opacity: 0.4});
  var cumulativeFireVis = cumulativeFire(endDate);
  // Put it all together.
  return image.resample('bicubic')
    .reproject({crs: VID_PARAMS.crs, scale:1000})
    .visualize(GOES_RGB_VIS)
    .blend(cumulativeFireVis)
    .blend(currentFireVis)
    .blend(outlineVis)
    .set('system:time_start', image.get('system:time_start'));
};
// Get collections.
//var vis = ee.ImageCollection('NOAA/GOES/17/MCMIPC')//EEUU
var vis =ee.ImageCollection("NOAA/GOES/17/MCMIPF") //A.C
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)); 
//var fire = ee.ImageCollection('NOAA/GOES/17/FDCC');//EUU
var fire =ee.ImageCollection("NOAA/GOES/17/FDCF");//A.C
// Assemble the visualization collection.
var col = vis
  .map(applyScaleAndOffset)
  .map(applyVis)
  .sort('system:time_start');
// Render the video.
print('N Frames Clima Hoy:', col.size());
var Clima_ETA = ui.Thumbnail( {
              image: (col),
              params: VID_PARAMS,
              style: {
                      position: 'top-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
panel1.add(Clima_ETA)
//****************************************************************************************************************
//***************************************************************************************************************
var title4 = ui.Label('Dinámica y Nubosidad del Huracán IOTA: 15/11/2020');
title4.style().set({
  'position':  'top-left',
  'fontSize': '15px'
  });
panel1.add(title4)
//****************************************************************************************************************
//***************************************************************************************************************
//****************************************************************************************************************
//***************************************************************************************************************
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Generate a GOES-17 time-lapse video of cumulative fire pixels (yellow),
 * active fires pixels (orange), and smoke. Note that there is a limitation
 * on the total number of pixels composing an animation; adjust observation
 * duration, max video dimension, and geometry region as necessary to meet
 * size constraint.
 */
// #############################################################################
// ### USER INPUTS ###
// #############################################################################
var Hora1 = "T08:00:00"
var Hora2 = "T19:00:00"
// Define observation start and end time.
var START_TIME = "2020-11-15"+Hora1;
var END_TIME = "2020-11-15"+Hora2;
var TIME_ZONE = 'America/Los_Angeles';
// Add outline.
var OUTLINE = Boundaries;
// Define video parameters.
var VID_PARAMS = {
  dimensions: 350, // Max dim.
  region: geometry,  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 10,
  crs: 'EPSG:4326',
};
// #############################################################################
// Band aliases.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
// 16 pairs of CMI and DQF followed by Bah 2018 synthetic green.
// Band numbers in the EE asset, 0-based.
var NUM_BANDS = 33;
// Skipping the interleaved DQF bands.
var BLUE_BAND_INDEX = (1 - 1) * 2;
var RED_BAND_INDEX = (2 - 1) * 2;
var VEGGIE_BAND_INDEX = (3 - 1) * 2;
var GREEN_BAND_INDEX = NUM_BANDS - 1;
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0,
  max: 0.42,
  gamma: 1.3,
};
// Function to scale the imagery and get green vis band.
var applyScaleAndOffset = function(image) {
  image = ee.Image(image);
  var bands = new Array(NUM_BANDS);
  for (var i = 1; i < 17; i++) {
    var bandName = 'CMI_C' + (100 + i + '').slice(-2);
    var offset = ee.Number(image.get(bandName + '_offset'));
    var scale =  ee.Number(image.get(bandName + '_scale'));
    bands[(i-1) * 2] = image.select(bandName).multiply(scale).add(offset);
    var dqfName = 'DQF_C' + (100 + i + '').slice(-2);
    bands[(i-1) * 2 + 1] = image.select(dqfName);
  }
  // Bah, Gunshor, Schmit, Generation of GOES-16 True Color Imagery without a
  // Green Band, 2018. https://doi.org/10.1029/2018EA000379
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var green1 = bands[RED_BAND_INDEX].multiply(0.45);
  var green2 = bands[VEGGIE_BAND_INDEX].multiply(0.10);
  var green3 = bands[BLUE_BAND_INDEX].multiply(0.45);
  var green = green1.add(green2).add(green3);
  bands[GREEN_BAND_INDEX] = green.rename(GREEN);
  return ee.Image(ee.Image(bands).copyProperties(image, image.propertyNames()));
};
// Paint state features to an image.
var outlineVis = ee.Image().byte()
  .paint({featureCollection: OUTLINE, color: 1, width: 1})
  .visualize({palette: 'FFFFFF', opacity: 0.5});
// Function to make cumulative fire image.
var cumulativeFire = function(currectTime) {
  var imgs = fire.filterDate(START_TIME, currectTime)
    .map(function(img) {
      return img.select('DQF').eq(0).selfMask();
    });
  return imgs.mosaic().visualize({palette: 'yellow', opacity: 0.6});
};
// Function to overlay the state line image.
var applyVis = function(image) {
  // Fire visualization.
  var endDate = image.date().advance(30, 'second');
  var startDate = endDate.advance(-2, 'hour');
  var fireImg = fire.filterDate(startDate, endDate)
    .sort('system:time_start', false).first();
  var currentFireVis = fireImg.select('DQF').eq(0).selfMask()
    .visualize({palette: 'red', opacity: 0.4});
  var cumulativeFireVis = cumulativeFire(endDate);
  // Put it all together.
  return image.resample('bicubic')
    .reproject({crs: VID_PARAMS.crs, scale:1000})
    .visualize(GOES_RGB_VIS)
    .blend(cumulativeFireVis)
    .blend(currentFireVis)
    .blend(outlineVis)
    .set('system:time_start', image.get('system:time_start'));
};
// Get collections.
//var vis = ee.ImageCollection('NOAA/GOES/17/MCMIPC')//EEUU
var vis =ee.ImageCollection("NOAA/GOES/17/MCMIPF") //A.C
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)); 
//var fire = ee.ImageCollection('NOAA/GOES/17/FDCC');//EUU
var fire =ee.ImageCollection("NOAA/GOES/17/FDCF");//A.C
// Assemble the visualization collection.
var col = vis
  .map(applyScaleAndOffset)
  .map(applyVis)
  .sort('system:time_start');
// Render the video.
print('N Frames Clima Hoy:', col.size());
var Clima_IOTA = ui.Thumbnail( {
              image: (col),
              params: VID_PARAMS,
              style: {
                      position: 'top-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
panel1.add(Clima_IOTA)
//****************************************************************************************************************
//***************************************************************************************************************
var title5 = ui.Label('Pronóstico los próximos 6 días');
title5.style().set({
  'position':  'top-left',
  'fontSize': '15px'
  });
panel1.add(title5)
//****************************************************************************************************************
//***************************************************************************************************************
//RAINFALL FORECAST
var Collection_V= ee.ImageCollection("NOAA/GFS0P25");
var text = require('users/gena/packages:text'); 
var pt = text.getLocation(geometry2, 'left', '90%', '5%');
var centralAmCol = Boundaries;
var centralAmAoi = geometry2;
var empty = ee.Image().byte();
var centralAmOutline = empty
  .paint({featureCollection: centralAmCol, color: 1, width: 1})
  .visualize({palette: 'ffffff'});
var today      = ee.Date(new Date().toISOString().split('T')[0]);
var Filter_RFF = Collection_V.select('total_precipitation_surface')
                             .filterDate(today.advance(-1, 'day'), today.advance(6, 'day'))
                             .sort('system:time_start', false);
var Forecasts =  ee.ImageCollection([1,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,
                                    75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,123,126,129,132,135,
                                    138,141,144].map(Vorhersage));
function Vorhersage(hours) {
  var image = Filter_RFF
    .filterMetadata('forecast_hours', 'equals', hours)
    .first();
  var date = image.date().advance(hours, 'hours');
  return image
    .set('date', date.format())}
var ForvisArgs = {
  min: 0,
  max: 175,
  palette: ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};
var ForprepFilVis = Forecasts.map(function(img) {
  return img.visualize(ForvisArgs);
});
var Fortext = 'Forecast';
var ForprepColOutline = ForprepFilVis.map(function(img) {
  var scale = 2500;
  var textVis = {fontType: 'Arial', fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 };
  var label = text.draw(img.get('system:index'), pt, scale, textVis);
  return img.blend(centralAmOutline).unmask(0).blend(label);
});
var ForThumbnail = {
  dimensions: 550,
  region: centralAmAoi,
  framesPerSecond: 4.5,
  crs: 'EPSG:3857'
};
var ForAnimation = ui.Thumbnail( {
              image: (ForprepColOutline),
              params: ForThumbnail,
              style: {
                      position: 'bottom-center',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
panel1.add(ForAnimation)
//Agragar estilo
//Estilo Oscuro
var style = require('users/gena/packages:style')
//Agregar estilo de mapa Oscuro (Darck)
style.SetMapStyleDark()