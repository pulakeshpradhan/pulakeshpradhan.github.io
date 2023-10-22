/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #bf04c2 */ee.Geometry.MultiPoint(
        [[-57.623553074468326, -12.749377059124248],
         [-58.07809823522384, -12.804483200715248],
         [-58.07810358949846, -12.804134312046106]]),
    geometry2 = 
    /* color: #ff0000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.044528713021826, -12.643735297201527],
          [-58.10251237222965, -12.673511094921253],
          [-58.12997819254215, -12.715191315727024],
          [-58.14218492576892, -12.747935309687808],
          [-58.157443845216584, -12.801507225587224],
          [-58.145236944351744, -12.932412875625666],
          [-58.12387449065263, -12.97999790106643],
          [-58.090305303726744, -13.030546939145726],
          [-57.96518327066715, -13.063249720778726],
          [-57.888889176343035, -13.051358434317061],
          [-57.824802150521826, -13.030546939145726],
          [-57.71799088785465, -13.021627307847158],
          [-57.67221429714973, -13.021627307847158],
          [-57.632541408334326, -13.04243938984368],
          [-57.58371346959884, -13.060276993652215],
          [-57.504367691968035, -13.066222575415775],
          [-57.467746486459326, -13.057304230745988],
          [-57.36398690709884, -12.968102456494844],
          [-57.284641129468035, -12.852092548878911],
          [-57.28769281277473, -12.786627313696773],
          [-57.293796514664244, -12.759841197329896],
          [-57.31515863308723, -12.655646066030592],
          [-57.33346906820352, -12.584173294392413],
          [-57.339572770093035, -12.50076329364209],
          [-57.34567613670642, -12.453088357646426],
          [-57.37009027371223, -12.396462962574846],
          [-57.40671147922094, -12.357712230856523],
          [-57.458591436539244, -12.321937157801475],
          [-57.49826432535465, -12.301066144831102],
          [-57.559299332593035, -12.267967227387068],
          [-57.58066178629215, -12.259020921758493],
          [-57.632541408334326, -12.256038725116479],
          [-57.67221429714973, -12.259020921758493],
          [-57.70273180076892, -12.28884086812953],
          [-57.72104257116134, -12.324620455674618],
          [-57.73019762108142, -12.378280639980131],
          [-57.72104257116134, -12.437890150209116],
          [-57.70547838280017, -12.542173809568988],
          [-57.70547838280017, -12.574939993123397],
          [-57.708530401382994, -12.592810740602498],
          [-57.82449704924638, -12.61068007938402],
          [-57.97098153600509, -12.634504142884794],
          [-58.001499039624285, -12.634504142884794]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var fc = geometry2;
var removerBorda = function(image){
  var box = image.geometry ();
  return image.clip(box.buffer(-500.00));
};
// função para mascarar nuvens
  var appTM1 = function(image) {
   var scored = ee.Algorithms.Landsat.simpleCloudScore(image);
 var imageSemNuvem =  image.updateMask(scored.select(['cloud']).lt(10));
  return image
};
var appTM = function (image) {
var ndvi = image.normalizedDifference(['B4', 'B3']);
image = image.addBands(ndvi.rename('NDVI'));
var evi = image.expression( // aqui foi buscado do proprio google, sempre rever o codigo
    '2.5 * (nir - red) / (nir + 6 * red - 7.5 * blue + 1)',
    {
        red: image.select('B3'),    // 620-670nm, RED
        nir: image.select('B4'),    // 841-876nm, NIR
        blue: image.select('B1')    // 459-479nm, BLUE
    });
image = image.addBands(evi.rename('EVI'));
var savi = image.expression( // aqui foi buscado do proprio google, sempre rever o codigo
    '1.5 * (nir - red) / (nir + red  + 0.5)',
    {
        red: image.select('B3'),    // 620-670nm, RED
        nir: image.select('B4'),    // 841-876nm, NIR
         });
image = image.addBands(savi.rename('SAVI'));
return  appTM1 (image);
};
// Use the normalizedDifference(A, B) to compute (A - B) / (A + B)
//programa principal
var TM = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
      .filterMetadata('CLOUD_COVER', 'less_than',100)
        .filterDate('1984-01-01','2013-04-01')
          .filterBounds(fc)
            .map(appTM);
        // colorindo o mapa
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//GRAFICOS
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '60%');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) 
    {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
 var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  //Map.layers().set(6, dot);
  // Create an NDVI chart.
  var ndvichart = ui.Chart.image.series(TM.select('NDVI'), point,  ee.Reducer.mean(), 500);
  ndvichart.setOptions({
    title: 'NDVI',
    vAxis: {title: 'band value'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
 panel.widgets().set(2, ndvichart);
   // Create EVI.
  var evichart = ui.Chart.image.series(TM.select('EVI'), point);
    evichart.setOptions({
        title: 'EVI',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });
   panel.widgets().set(3, evichart);
  // Create an NDVI chart.
  var savichart = ui.Chart.image.series(TM.select('SAVI'), point);
  savichart.setOptions({
    title: 'SAVI',
    vAxis: {title: 'indice'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
 panel.widgets().set(4, savichart);   
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//chart.style().set({
//  position: 'bottom-right',
//  width: '500px',
//  height: '300px'
//})
//Map.add(chart);
Map.setCenter(-57.623553074468326,-12.749377059124248, 9);
Map.addLayer(TM, {min: 0, max: 0.6, bands:['B5','B4','B3']}, 'Landsat5');
Map.addLayer(TM, {min: 0, max: 1, bands: ['EVI'], palette: palette}, 'EVI');
Map.addLayer(TM, {min: 0, max: 1, bands: ['NDVI'], palette: palette}, 'NDVI');
Map.addLayer(TM, {min: 0, max: 1, bands: ['SAVI'], palette: palette}, 'SAVI');
Map.addLayer(fc,{}, 'Terra indígena MANOKI');
//