var sen = {"opacity":1,"bands":["nir","swir1","red"],"min":218.54000000000002,"max":3844.46,"gamma":1},
    water = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    sentinel = ee.Image("users/murillop/Amazon-Andes/sentinel2018"),
    image = ee.Image("users/murillop/CODED/picatinimaca_1987_2018"),
    PA5 = ee.FeatureCollection("users/murillop/COL_cartography/PA_5"),
    s = {"opacity":1,"bands":["swir2","nir","green"],"min":509.48,"max":3316.52,"gamma":1};
var parks = PA5.filter(ee.Filter.inList('nombre', ['Cordillera de los Picachos', 'Tinigua', 'Sierra de la Macarena']))
var parks_union = parks.union()
var parks_union = parks_union.geometry().simplify(100)
var pica = PA5.filter(ee.Filter.inList('nombre', ['Cordillera de los Picachos'])).geometry().simplify(100)
var tini = PA5.filter(ee.Filter.inList('nombre', ['Tinigua'])).geometry().simplify(100)
var maca = PA5.filter(ee.Filter.inList('nombre', ['Sierra de la Macarena'])).geometry().simplify(100)
Map.centerObject(parks_union,10)
///////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var park_border = empty.paint({
  featureCollection: parks_union,
  color: 'path',
  width: 1
});
Map.addLayer(park_border, {}, 'Parques');
var sentinel2= sentinel.clip(parks_union)
Map.addLayer(sentinel2, s,  'Sentinel2-2018').setShown(0)
//Fires FIRMS
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-01-01', '2019-02-18'));
var fires = dataset.select('T21');
var f = fires.map(function(img) { 
   var img = img.clip(parks_union)
  return img
})
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
Map.addLayer(f, firesVis, 'Fuego: Enero 1 - Feb 18 (2019)').setShown(0);
//Create RGB combination and clipped - Paulo function!
// Algorithm parameters
var params = ee.Dictionary({
     'cloud_score': 80,
     'cfThreshold': .05,
     'consec': 3,
     'thresh': 5,
     'minRMSE': .015, 
     'start': '1987-01-01',
     'end': '2018-12-31',
     'iteration': 1,
     'soil': [2000, 3000, 3400, 5800, 6000, 5800],
     'gv': [500, 900, 400, 6100, 3000, 1000],
     'npv': [1400, 1700, 2200, 3000, 5500, 3000],
     'shade': [0, 0, 0, 0, 0, 0],
     'cloud': [9000, 9600, 8000, 7800, 7200, 6500],
     'forestLabel': 1,
     'minPatch': 10
      })
function makeMask(input, minSize) {
  // Return a mask for patches greater than minSize
  var minPatches = input.connectedPixelCount(minSize, true)
                      .gte(minSize)
  return minPatches
}
// Make a mask where patches are greater than minSize
var minSize = ee.Number.parse(params.get('minPatch'))
//print(minSize)
var minSizeMask = makeMask(image.select('dist_1').gt(0), minSize)
// Change magnitude
  var changeMag = image.select('mag_1')
                      .updateMask(minSizeMask).updateMask(image.select('mag_1').gt(10))
// Dates of change
var changeDate = image.select('dist_1')
                    .updateMask(minSizeMask).updateMask(changeMag)
// loos total
  var loss = changeMag.lt(10).updateMask(changeMag).lt(10)
  //Map.addLayer(loss, {}, 'loss')
  var lossAreaImage = loss.multiply(ee.Image.pixelArea()).divide(10000);
 //Map.addLayer(lossAreaImage, {}, 'loss1')
///////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_pica= lossAreaImage.addBands(changeDate).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: pica,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_pica = ee.List(lossByYear_pica.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_pica = ee.Dictionary(statsFormatted_pica.flatten());
//print(statsDictionary);
//////////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_tini= lossAreaImage.addBands(changeDate).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: tini,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_tini = ee.List(lossByYear_tini.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_tini = ee.Dictionary(statsFormatted_tini.flatten());
//////////////////////////////////////////////////////////////////////////////////////////
var lossByYear_maca= lossAreaImage.addBands(changeDate).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: maca,
  scale: 30,
  maxPixels: 1e9
});
//print(lossByYear);
var statsFormatted_maca = ee.List(lossByYear_maca.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("%01d"), d.get('sum')];
  });
var statsDictionary_maca = ee.Dictionary(statsFormatted_maca.flatten());
//////////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(changeMag.clip(parks_union), {min: 0, 
                            max: 50, 
                            palette: ['#008000','#6a7900', '#a46a00','#d15300','#ff0000']}, 
                            'Magnitud disturbio')//.setShown(0)
Map.addLayer(changeDate.clip(parks_union), {min: 1987, 
                            max: 2018, 
                           // palette: ['#0000ff','#392cf7','#4f43ee','#5c57e6','#6569dd','#6b7ad4','#6f8ccb','#709bc2',
                           //'#6eacb8','#6abdaf','#61cea4','#55de99','#3fee8c','#00ff7f']}, 'Change date').setShown(0);
                            palette: ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99']}, 
                            'Año disturbio')//.setShown(0)
Export.image.toDrive(changeDate)
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
//panel.style().set({position: 'bottom-right'});
//panel.style().set('backgroundColor', '#fa9fb5');
panel.style().set('width', '650px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Parques Naturales de Colombia',
    style: {fontSize: '20px', fontWeight: 'bold', color: '7a0177', position: 'bottom-right' }//) , backgroundColor: '#225ea8'}
  }),
  ui.Label({
    value: 'Disturbios (degradacion+deforestacion) 1990-2018',
    style: {fontSize: '12px', fontWeight: 'bold', color: '7a0177', position: 'bottom-right'}//, backgroundColor: '#225ea8'}
  })
]);
panel.add(intro);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var chart_pica = ui.Chart.array.values({
  array: statsDictionary_pica.values(),
  axis: 0,
  xLabels: statsDictionary_pica.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Picachos',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(2, chart_pica);  
//print(chart);
var chart_tini = ui.Chart.array.values({
  array: statsDictionary_tini.values(),
  axis: 0,
  xLabels: statsDictionary_tini.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Tinigua',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(3, chart_tini);  
//print(chart);
var chart_maca = ui.Chart.array.values({
  array: statsDictionary_maca.values(),
  axis: 0,
  xLabels: statsDictionary_maca.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Macarena',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (Hectareas)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  panel.widgets().set(4, chart_maca);  
//print(chart);
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Legend
var legend = ui.Panel({style: {shown: false, width: '150px'}});
legend.style().set({position: 'bottom-right'});
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});
legendMaps.style().set({position: 'bottom-right'});
legendMaps.add(ui.Label('Año disturbio'));
legendMaps.add(makeRow('#e66101', '1990'));
legendMaps.add(makeRow('#5e3c99', '2018'));
legendMaps.add(ui.Label('Magnitud disturbio'));
legendMaps.add(makeRow('#008000', 'bajo'));
legendMaps.add(makeRow('#ff0000', 'alto'));
legendMaps.add(ui.Label('Incendios'));
legendMaps.add(makeRow('#e66101', 'Fuego-1Km'));
// Set up display
Map.style().set('cursor', 'crosshair');
Map.setOptions('TERRAIN');
// Add the panels to the ui.root.
Map.add(legend)
Map.add(legendMaps)
  //Map.addLayer(image, {}, 'Full Image').setShown(0)
  // var h = ui.Chart.image.histogram(changeDate)
  // print('Years distrubution:',h)
  // var h1 = ui.Chart.image.histogram(changeMag)
  // print('Magnitude of change:',h1)
//   // Compute the histogram of the disturbance date
// var histogram = changeDate.reduceRegion({
//   reducer: ee.Reducer.histogram({minBucketWidth: 1, maxRaw:30}),
//   scale: 30,
//   geometry: geometry,
//   maxPixels: 1e13
// });
// print(histogram, 'histogram')
// var h1 = ui.Chart.image.histogram(changeDate, geometry, 30);
// print (h1)
// var h = ee.Dictionary(histogram.get('dist_1')).get('histogram')
// print (h,'h')
// //var h2 = ee.Dictionary()
// var x = ee.Dictionary(histogram.get('dist_1')).get('bucketMeans')
// x = ee.List(x).map(function(v) {return ee.String(v)})
// var c = ui.Chart.array.values(h, 0, x)
//                 .setChartType('ColumnChart')
// print(c)