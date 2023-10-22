/*
 * First, create an NDVI harmonic model and plot chart on click
 */ 
// Load a collection of Landsat TOA reflectance images.
var landsatCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Set the region of interest to a point.
// var roi = ee.Geometry.Point([23.873617, 52.760160]); // Coigue
var roi = ee.Geometry.Point([-73.00124, -37.81279]); // Ñirre
// The dependent variable we are modeling.
var dependent = 'NDVI';
// The number of cycles per year to model.
var harmonics = 1;
// Make a list of harmonic frequencies to model.
// These also serve as band name suffixes.
var harmonicFrequencies = ee.List.sequence(1, harmonics);
// Function to get a sequence of band names for harmonic terms.
var constructBandNames = function(base, list) {
  return ee.List(list).map(function(i) {
    return ee.String(base).cat(ee.Number(i).int());
  });
};
// Construct lists of names for the harmonic terms.
var cosNames = constructBandNames('cos_', harmonicFrequencies);
var sinNames = constructBandNames('sin_', harmonicFrequencies);
// Independent variables.
var independents = ee.List(['constant', 't'])
  .cat(cosNames).cat(sinNames);
// Function to mask clouds in Landsat 8 imagery.
var maskClouds = function(image) {
  var score = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = score.lt(10);
  return image.updateMask(mask);
};
// Function to add an NDVI band, the dependent variable.
var addNDVI = function(image) {
  return image
    .addBands(image.normalizedDifference(['B5', 'B4'])
    .rename('NDVI'))
    .float();
};
// Function to add a time band.
var addDependents = function(image) {
  // Compute time in fractional years since the epoch.
  var years = image.date().difference('1970-01-01', 'year');
  var timeRadians = ee.Image(years.multiply(2 * Math.PI)).rename('t');
  var constant = ee.Image(1);
  return image.addBands(constant).addBands(timeRadians.float());
};
// Function to compute the specified number of harmonics
// and add them as bands.  Assumes the time band is present.
var addHarmonics = function(freqs) {
  return function(image) {
    // Make an image of frequencies.
    var frequencies = ee.Image.constant(freqs);
    // This band should represent time in radians.
    var time = ee.Image(image).select('t');
    // Get the cosine terms.
    var cosines = time.multiply(frequencies).cos().rename(cosNames);
    // Get the sin terms.
    var sines = time.multiply(frequencies).sin().rename(sinNames);
    return image.addBands(cosines).addBands(sines);
  };
};
    // Filter to the area of interest, mask clouds, add variables.
    var harmonicLandsat = landsatCollection
      //.filterBounds(roi)
      .map(maskClouds)
      .map(addNDVI)
      .map(addDependents)
      .map(addHarmonics(harmonicFrequencies));
    // The output of the regression reduction is a 4x1 array image.
    var harmonicTrend = harmonicLandsat
      .select(independents.add(dependent))
      .reduce(ee.Reducer.linearRegression(independents.length(), 1));
    print(harmonicTrend);
    // Turn the array image into a multi-band image of coefficients.
    var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
      .arrayProject([0])
      .arrayFlatten([independents]);
    // Compute fitted values.
    var fittedHarmonic = harmonicLandsat.map(function(image) {
      return image.addBands(
        image.select(independents)
          .multiply(harmonicTrendCoefficients)
          .reduce('sum')
          .rename('Harmonic'));
    });
    // Plot the fitted model and the original data at the ROI.
    print(ui.Chart.image.series(fittedHarmonic.select(['Harmonic','NDVI']), roi, ee.Reducer.mean(), 30)
        .setOptions({
          title: 'NDVI Harmonic model for one pixel: original and fitted values - Site: Nahuelbuta NP - Pure N. antarctica forest',
          lineWidth: 1,
          pointSize: 3,
          colors: ["#3B528B", "#DE4968"]
    }));
// Pull out the three bands we're going to visualize.
var sin = harmonicTrendCoefficients.select('sin_1');
var cos = harmonicTrendCoefficients.select('cos_1');
// Do some math to turn the first-order Fourier model into
// hue, saturation, and value in the range[0,1].
var magnitude = cos.hypot(sin).multiply(5);
// var phase = sin.atan2(cos).unitScale(-Math.PI, Math.PI);
// var val = harmonicLandsat.select('NDVI').reduce('mean');
// Turn the HSV data into an RGB image and add it to the map.
// var seasonality = ee.Image.cat(phase, magnitude, val).hsvToRgb();
Map.centerObject(roi, 10);
// Map.addLayer(seasonality, {}, 'Seasonality');
//Map.addLayer(roi, {}, 'ROI');
//Map.addLayer(phase, {band: 0}, 'Phase');
//Map.addLayer(magnitude, {band: 0}, 'Magnitude');
//Map.addLayer(val, {band: 0}, 'Value');
// viridis palette
var pal = ["#440154FF", "#481568FF", "#482677FF", "#453781FF", "#3F4788FF", "#39558CFF",
"#32648EFF", "#2D718EFF", "#287D8EFF", "#238A8DFF", "#1F968BFF", "#20A386FF",
"#29AF7FFF", "#3CBC75FF", "#56C667FF", "#74D055FF", "#94D840FF", "#B8DE29FF",
"#DCE318FF", "#FDE725FF"];
// Mask by forest layer ----
// Load or import the Hansen et al. forest change dataset.
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
// Select the land/water mask.
Map.addLayer(hansenImage, {min:1, max: 120}, 'Cubierta arbórea');
var mask = hansenImage.select('treecover2000').gte(1);
// Create a binary mask.
// var mask = datamask.eq(1);
// Update the composite mask with the water mask.
var maskedMagnitude = magnitude.updateMask(mask);
// Plantations mask
var Plantations = ee.Image('users/gerardosoto/Conaf_raster_plant');//.filter('b1', 'equals', 9);
Plantations = Plantations.gte(2);
maskedMagnitude = maskedMagnitude.updateMask(Plantations);  
// **Calculate PSRI ----
// Load Sentinel-2 imagery.
var collection = ee.ImageCollection('COPERNICUS/S2') 
  .sort('COUDY_PIXEL_PERCENTAGE')
  .filterDate('2017-06-24', '2018-06-24');
// Forest mask function
var forestMask = function(image){
  var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
  var mask = hansenImage.select('treecover2000').gte(1);
  mask = mask.eq(1);
  return image.updateMask(mask);
};
// Cloud masking function
var clouds = function(image){
  // Cloud masking 
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  var qa = image.select('QA60');
  function maskS2clouds(image) {
    var qa = image.select('QA60');
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
               qa.bitwiseAnd(cirrusBitMask).eq(0));
    return image.updateMask(mask);
  }
  return ee.ImageCollection(image.map(maskS2clouds));
};
// PSRI function
var addPSRI = function(image) {
  return image
    .addBands((image.select('B4').subtract(image.select('B2'))).divide(image.select('B6'))
    .rename('PSRI'))
    .float();
};
collection = clouds(collection);  
var PSRI = collection.map(forestMask).map(addPSRI);
PSRI = PSRI.select('PSRI');
var PSRIb = PSRI.select('PSRI');
//Map.addLayer(PSRIb, {}, 'psrib');
// Mask by forest layer ----
// Load the Hansen et al. forest change dataset.
//var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
//var mask = hansenImage.select('treecover2000').gte(1);
// Create a binary mask.
//var mask = mask.eq(1);
// Update the composite mask with the water mask.
//PSRI = PSRI.updateMask(mask);
//var Plantations = ee.Image('users/gerardosoto/Conaf_raster_plant');
//Plantations = Plantations.gte(2);
PSRI = PSRI.mosaic().updateMask(Plantations);  
// DRAW CHART for NDVI----
// Create a panel to hold the chart.
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  var panel = ui.Panel();
  panel.style().set({
    width: '500px',
    position: 'middle-right'
  });
  panel.clear();
  var ndviTag = ui.Label({value: 'Valores de productividad - NDVI', 
  style: {color: 'black', 
    fontSize: '20px',
    fontFamily: 'arial',
  }});
  panel.add(ndviTag);
  var coordinates = ui.Label({value: ['Para coordenadas: ', coords.lon, coords.lat], 
  style: {color: 'black', 
    fontSize: '10px',
    fontFamily: 'arial',
  }});
  panel.add(coordinates);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.series(fittedHarmonic.select(['Harmonic','NDVI']), point, ee.Reducer.mean(), 30)
        .setOptions({
          title: 'Serie de tiempo de valores de NDVI',
          lineWidth: 1,
          pointSize: 3,
          colors: ["#3B528B", "#DE4968"]
    });
  panel.add(chart);
  // botón para cerrar el panel
  var cerrar = ui.Button({
    label: 'Cerrar este gráfico',
    onClick: function() {panel.style().set('shown', false)}
  }
  );
  panel.add(cerrar);
  toolPanel.add(panel);
});
// DRAW CHART for PSRI----
// Create a panel to hold the chart.
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  var panelP = ui.Panel();
  panelP.style().set({
    width: '500px',
    position: 'bottom-right'
  });
  panelP.clear();
  var psriTag = ui.Label({value: 'Valores de decaimiento - PSRI:', 
  style: {color: 'black', 
    fontSize: '20px',
    fontFamily: 'arial',
  }});
  panelP.add(psriTag);
  //toolPanel.add(psriTag);
  var coordinates = ui.Label({value: ['Para coordenadas: ', coords.lon, coords.lat], 
  style: {color: 'black', 
    fontSize: '10px',
    fontFamily: 'arial',
  }});
  panelP.add(coordinates);
  //toolPanel.add(coordinates);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.series(PSRIb, point)
    .setOptions({
      title: 'Serie de tiempo de valores de PSRI',
      lineWidth: 1,
      pointSize: 3,
      color: '#DE4968'
  });
  panelP.add(chart);
  //toolPanel.add(chart);
  // botón para cerrar el panel
  var cerrar = ui.Button({
    label: 'Cerrar este gráfico',
    onClick: function() {panelP.style().set('shown', false)}
  }
  );
  panelP.add(cerrar);
  toolPanel.add(panelP);
});
// Add National Park features ----
Map.onClick(function(coords) {
  var panel2 = ui.Panel();
  panel2.style().set({
    width: '400px',
    position: 'top-left'
  });
  Map.add(panel2);
  panel2.clear();
  var parkName = ui.Label({value: 'Parque Nacional Nahuelbuta', 
  style: {color: 'black', 
    fontSize: '20px',
    fontFamily: 'arial',
  }});
  panel2.add(parkName);
  var titulo = ui.Label({value: 'Información sobre el Carpintero Negro (Campephilus magellanicus):',
    style: {
      color: 'black', 
      fontSize: '16px',
      fontFamily: 'arial',
    }
  });
  panel2.add(titulo);
  var mawo = ui.Label({value: '- Población local: 16 familias (approx. 48 individuos).',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    }
  });
  panel2.add(mawo);
  var mawo1 = ui.Label({value: '- Habitat de nidificación: approx. 1266 ha (18.6% del total del parque)',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    }
  });
  panel2.add(mawo1);
  var mawo2 = ui.Label({value: '- Habitat de alimentación: approx. 6143 ha (90.2% del total del parque)',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    }
  });
  panel2.add(mawo2);
  var ref = ui.Label({value: 'Fuente: Soto et al. Datos no publicados.',
    style: {
      color: 'black', 
      fontSize: '12px',
      fontFamily: 'arial',
    }
  });
  panel2.add(ref);
  var sp = ui.Label(' ');
  panel2.add(sp);
  var wiki = ui.Label({value: 'Información en Wikipedia',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    },
    targetUrl: 'https://es.wikipedia.org/wiki/Parque_nacional_Nahuelbuta'
  });
  panel2.add(wiki);
  var conaf = ui.Label({value: 'Información oficial en CONAF',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    },
    targetUrl: 'http://www.conaf.cl/parques/parque-nacional-nahuelbuta/'
  });
  panel2.add(conaf);
  var eBird = ui.Label({value: 'Avistamientos de aves - eBird',
    style: {
      color: 'black', 
      fontSize: '14px',
      fontFamily: 'arial',
    },
    targetUrl: 'https://ebird.org/hotspot/L1123343?yr=all&m=&rank=mrec'
  });
  panel2.add(eBird);
  // botón para cerrar el panel
  var cerrar = ui.Button({
    label: 'cerrar',
    onClick: function() {panel2.style().set('shown', false)}
  }
  );
  panel2.add(cerrar);
});
// Incluir ayuda para el usuario ----
// Create a panel, initially hidden.
var panelA = ui.Panel({
  style: {
    width: '400px',
    shown: false
  },
  widgets: [
    ui.Label({value: 'Información sobre la aplicación:', style: {fontSize: '18px', fontWeight: 'bold'
    }}),
    ui.Label({value: 'Esta aplicación ha sido diseñada para explorar diferentes características del bosque nativo Chileno con el objetivo de aportar al conocimiento y la conservación de estos ecosistemas a través del uso de la tecnología más reciente.',
      style: {fontSize: '16px'}}),
    ui.Label({value: 'Hasta el momento es posible acceder a información actualizada sobre los valores de productividad (NDVI) y decaimiento de los árboles (PSRI), calculados en base a imágenes satelitáles provistas por la NASA (National Aeronautics and Space Administration - USA) y ESA (European Space Agency - UE). Además la aplicación contiene links de interés sobre las áreas protegidas del Sistema Nacional de Áreas Silvestres Protegdas del Estado (SNASPE) administrado por CONAF.',
      style: {fontSize: '16px'}}),
    ui.Label({value: 'Esta aplicación ha sido creada gracias a la API de Google Earth Engine.',
      style: {fontSize: '16px'}}),
    ui.Label(' '),
    ui.Label(' '),
    ui.Label('Autor: Gerardo E. Soto - Cornell Lab of Ornithology & Department of Natural Resources - Cornell University. Contacto: gerardo.soto@usach.cl / ges234@cornell.edu'),
    ui.Label({value:'Gerardo E. Soto en Google Académico',
      targetUrl: 'https://scholar.google.com/citations?user=2cRi1MgAAAAJ'
    }),
    ui.Label('Licencia de uso: CC-BY-SA'),
    ui.Button({
      label: 'Cerrar panel de información',
      onClick: function() {panelA.style().set('shown', false)}
      })
  ]
});
//panelA.style().set('shown', false);
//Map.add(panelA);
ui.root.widgets().add(panelA);
// *Map Layers ----
// Menores valores son rojos y corresponden a Coihue, y deciduo en azul
Map.addLayer(maskedMagnitude, {min: 0, max: 1, palette: pal}, 'Valores de productividad - NDVI'); 
Map.addLayer(PSRI, {min:-0.450, max:-0.135, palette: pal}, "Valores de decaimiento - PSRI");  // dominio para Nahuelbuta
var nahuel = ee.FeatureCollection('users/gerardosoto/nahuel');
Map.addLayer(nahuel, {}, 'Parque Nacional Nahuelbuta');
/*
 * Native forests next to plantations ----
 */
//var cero = Plantations.updateMask(Plantations.eq(0)).subtract(1);
var cero = Plantations.subtract(1);
// var unos = Plantations.updateMask(Plantations.eq(1));
var unos = Plantations.eq(1);
var cross = cero.add(unos).zeroCrossing();
Map.addLayer(cross.updateMask(cross), {}, 'Zonas de contacto entre Nativo/Exóticas');
// Distance from edges 
// This distance is masked by exotic plantations in order to visualize the amount of native forest 
// in risk of fire due to proximity to exotic plantations
var d = cross.distance(ee.Kernel.euclidean(8), false);
Map.addLayer(d, {}, 'Distancia');
// DRAW CHART for Climate ----
// Create a panel to hold the chart.
// Register a function to draw a chart when a user clicks on the map.
// Map.onClick(function(coords) {
//   var panelC = ui.Panel();
//   panelC.style().set({
//     width: '500px',
//     position: 'top-right'
//   });
//   Map.add(panelC);
//   panelC.clear();
//   var clim = ui.Label({value: 'Proyecciones climáticas', 
//   style: {color: 'black', 
//     fontSize: '20px',
//     fontFamily: 'arial',
//   }});
//   panelC.add(clim);
//   var roi = ee.Geometry.Point(coords.lon, coords.lat);
//   // Use the NASA NEX-DCP30 dataset to create a visualization of projected
//   // https://cds.nccs.nasa.gov/wp-content/uploads/2014/04/NEX-DCP30_Tech_Note_v0.pdf
//   // http://www.nasa.gov/content/nasa-supercomputer-generates-closer-look-at-future-climate-conditions-in-us
//   var geometry1 = /* color: #98ff00 */ee.Geometry.MultiPoint();
//   var base_collection = ee.ImageCollection('NASA/NEX-DCP30_ENSEMBLE_STATS')
//       .select(['tasmax_median', 'tasmax_quartile25', 'tasmax_quartile75'])
//       .filterDate('2010-01-01', '2100-01-01');
//   var january = base_collection.filter(ee.Filter.calendarRange({
//     start: 7,
//     field: 'month'
//   }));
//   // Convert temperature to Celsius.
//   january = january.map(function(image) {
//     return image.subtract(273.15)
//         .copyProperties(image, ['system:time_start', 'scenario']);
//   });
//   var rcp26 = january.filterMetadata('scenario', 'equals', 'rcp26');
//   var rcp45 = january.filterMetadata('scenario', 'equals', 'rcp45');
//   var rcp60 = january.filterMetadata('scenario', 'equals', 'rcp60');
//   var rcp85 = january.filterMetadata('scenario', 'equals', 'rcp85');
//   var forest = ee.Feature(
//       ee.Geometry.Rectangle(-121, 39.4, -120.8, 39.8),
//       {label: 'Tahoe National Forest'});
//   var options = {
//     title: 'Daily Maximum Near-Surface Air Temperature',
//     vAxis: {
//       title: 'Daily Maximum Near-Surface Air Temperature [Celsius]'
//     },
//     lineWidth: 1,
//     pointSize: 4
//   };
//   var chartScenario = function(scenario, name) {
//     var chart = ui.Chart.image.series({
//       imageCollection: scenario,
//       region: roi,
//       reducer: ee.Reducer.mean(),
//       scale: 200,
//       xProperty: 'system:time_start'
//     }).setChartType('LineChart')
//       .setOptions({
//         title: 'tasmax median value over time (scenario ' + name + ')',
//         vAxis: {
//           title: 'tasmax value'
//         },
//         intervals: {'style': 'area'},
//         lineWidth: 1,
//         curveType:'function',
//         legend: {position: 'none'}
//     }).transform(function(chartArgs) {
//       var newChartArgs = JSON.parse(JSON.stringify(chartArgs));
//       newChartArgs.dataTable.cols[1] = {
//         type: 'number',
//         id: 'tasmax_median',
//         label: 'tasmax_median'
//       };
//       newChartArgs.dataTable.cols[2] = {
//         type: 'number',
//         id: 'tasmax_quartile25',
//         label: 'tasmax_quartile25',
//         role: 'interval'
//       };
//       newChartArgs.dataTable.cols[3] = {
//         type: 'number',
//         id: 'tasmax_quartile75',
//         label: 'tasmax_quartile75',
//         role: 'interval'
//       };
//       return newChartArgs;
//     });
//     print(chart);
//   };
//   var labelBands = function(collection, scenario) {
//     return collection.select(
//       ['tasmax_median', 'tasmax_quartile25', 'tasmax_quartile75'],
//       ['rcp' + scenario + '_tasmax_median',
//       'rcp' + scenario + '_tasmax_quartile25',
//       'rcp' + scenario + '_tasmax_quartile75']);
//   };
//   var combined = labelBands(rcp26, '26').merge(labelBands(rcp85, '85'));
//   var chart = ui.Chart.image.series({
//     imageCollection: combined,
//     region: roi,
//     reducer: ee.Reducer.mean(),
//     scale: 200,
//     xProperty: 'system:time_start'
//   }).setChartType('LineChart')
//     .setOptions({
//     title: 'Predicted January Temperature',
//     vAxis: {
//       title: 'Daily Maximum Near-Surface Air Temperature [Celsius]'
//     },
//     interval: {
//       rcp26_tasmax_quartile: {'style':'area'},
//       rcp85_tasmax_quartile: {'style':'area'},
//     },
//     lineWidth: 1,
//     curveType:'function',
//     interpolateNulls: true
//   });
//   chart = chart.setSeriesNames('RPC2.6', 0);
//   chart = chart.setSeriesNames('RPC8.5', 3);
//   panelC.add(chart);
//   // botón para cerrar el panel
//   var cerrar = ui.Button({
//     label: 'cerrar',
//     onClick: function() {panelC.style().set('shown', false)}
//   }
//   );
//   panelC.add(cerrar);
// });
/*
 * Create side panel with the labels
 */ 
// Create app labels ----------------
var hagaClick = ui.Label({value: 'Haga click en una zona de interés', 
  style: {color: 'white', 
    backgroundColor: '#0000009D',
    fontSize: '20px',
    fontFamily: 'Lucida Grande',
    position: 'top-center'
  }});
Map.add(hagaClick);
var title = ui.Label({value: 'Visor interactivo del Bosque Nativo Chileno', 
  style: {color: 'black', 
    fontSize: '30px',
    position: 'bottom-left',
    padding: '30px 10px',
    textAlign: 'top'
  }});
var subtitle = ui.Label({value: 'Autor: Gerardo.Soto@usach.cl / ges234@cornell.edu', 
  style: {color: 'black', 
    backgroundColor: '#00000000',
    fontSize: '15px',
    position: 'bottom-left'
  }});
var toolPanel = ui.Panel([title, subtitle], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'Más información sobre la aplicación',
  onClick: function() {
    // Hide the button.
    //button.style().set('shown', false);
    // Display the panel.
    panelA.style().set('shown', true);
}});
// Add the button to the map and the panel to root.
toolPanel.add(button);
//ui.root.insert(0, panelA);