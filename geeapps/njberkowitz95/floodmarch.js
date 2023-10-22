var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -99.19833228826589,
                40.68314227148352
              ],
              [
                -99.19833228826589,
                40.64928809712007
              ],
              [
                -98.95045325994558,
                40.64928809712007
              ],
              [
                -98.95045325994558,
                40.68314227148352
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
      "mode": "Geometry",
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
    ee.Geometry.Polygon(
        [[[-99.19833228826589, 40.68314227148352],
          [-99.19833228826589, 40.64928809712007],
          [-98.95045325994558, 40.64928809712007],
          [-98.95045325994558, 40.68314227148352]]], null, false);
// Zoom to regions of interest
Map.centerObject(aoi);
// import sentinel 1 and filter data series
var s1 =  ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterBounds(aoi)
//.filterBounds(Map.getBounds(true))
.filterDate('2019-03-01','2019-03-29')
.filter(ee.Filter.contains({leftField: ".geo", rightValue: aoi})) // Filter partial S1-Images of AOI
.map(function(image){return image.clip(Map.getBounds(true))})
.map(function(image){return image.addBands(image.select('VV').focal_median(parseFloat('50'),'circle','meters').rename('VV_smoothed'))}); // Smooth S1-Images
print(s1);
// Return the DN that maximizes interclass variance in S1-band (in the region).
var otsu = function(histogram) {
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
// Compute between sum of squares, where each mean partitions the data.
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
           bCount.multiply(bMean.subtract(mean).pow(2)));
  });
// Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
// return image with water mask as additional band
var add_waterMask = function(image){
  // Compute histogram
  var histogram = image.select('VV').reduceRegion({
    reducer: ee.Reducer.histogram(255, 2)
      .combine('mean', null, true)
      .combine('variance', null, true), 
    geometry: aoi, 
    scale: 10,
    bestEffort: true
  });
  // Calculate threshold via function otsu (see before)
  var threshold = otsu(histogram.get('VV_histogram'));
  // get watermask
  var waterMask = image.select('VV_smoothed').lt(threshold).rename('waterMask');
  waterMask = waterMask.updateMask(waterMask); //Remove all pixels equal to 0
  return image.addBands(waterMask);
};
s1 = s1.map(add_waterMask);
//Calculating water occurrence
var min_occurence = 10;
var water_sum = s1.select('waterMask').reduce(ee.Reducer.sum());
var water_frequency = water_sum.divide(s1.select('waterMask').size()).multiply(100);
var water_frequency_masked = water_frequency.updateMask(water_frequency.gt(min_occurence));
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '300x15',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 22px'},
  });
}
function makeLegend(lowLine, midLine, highLine,lowText, midText, highText, palette) {
  var  labelheader = ui.Label('Water occurrence during investigation period',{margin: '5px 17px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold'});
  var labelLines = ui.Panel(
      [
        ui.Label(lowLine, {margin: '-4px 21px'}),
        ui.Label(midLine, {margin: '-4px 0px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(highLine, {margin: '-4px 21px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
      var labelPanel = ui.Panel(
      [
        ui.Label(lowText, {margin: '0px 14.5px'}),
        ui.Label(midText, {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(highText, {margin: '0px 1px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
    return ui.Panel({
      widgets: [labelheader, ColorBar(palette), labelLines, labelPanel], 
      style: {position:'bottom-left'}});
}
Map.add(makeLegend('|', '|', '|', "0 %", '50 %', '100%', ['orange','yellow','lightblue','darkblue']));
// time-lapse animation
var timelapse = {
  bands: ["VV","VV","VV"],
  region: aoi,
  min: -20,
  max: 0,
  framesPerSecond: 5};
var animation = ui.Thumbnail({
  image: s1,
  params: timelapse,
  style: {
    position: 'bottom-left',
    width: '360px',
  }});
//Add layers ans animation to map
Map.addLayer(s1.median(),{bands: ['VV','VV','VV'],min: -20,max: 0,},'S1-image [median]');
Map.addLayer(water_frequency_masked,{min:min_occurence,max:100,palette:['orange','yellow','lightblue','darkblue']},'Percentage of annual water occurence');
Map.add(animation);
// Create and print a histogram chart
//Make time series of water pixels as area in km² within region
var ClassChart = ui.Chart.image.series({
  imageCollection: s1.select('waterMask'),
  region: aoi,
  reducer: ee.Reducer.sum(),
  scale: 100,
})
  .setOptions({
      title: 'Area of the identified water mask',
      vAxis: {'title': 'area'},
      lineWidth: 1.5,
      pointSize: 2
    });
ClassChart.style().set({
    position: 'bottom-right',
    width: '492px',
    height: '300px'
  });
Map.add(ClassChart);
//Create callback function that adds image to the map coresponding with clicked data point on chart
ClassChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Auswahl zurücksetzen
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data and clip water classification to aoi 
    var classification = ee.Image(s1.filter(equalDate).first()).clip(aoi).select('waterMask'); 
    var SARimage = ee.Image(s1.filter(equalDate).first());
        var date_string = new Date(xValue).toLocaleString('de-DE', {dateStyle: 'full', timeStyle: 'short' });
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(SARimage, {
      bands: ['VV'],
      max: 0,
      min: -20
    },'S1-Image ['+ new Date(xValue).toLocaleString('de-DE')+']');
    Map.layers().reset([S1Layer]);
    var visParamsS1Layer = {
      min: 0,
      max: 1,
      palette: ['#FFFFFF','#0000FF']
    };
    //Add water classification on top of SAR image
    Map.addLayer(classification,visParamsS1Layer,'water mask ['+date_string+']');
});// Export the image, specifying scale and region.
Export.image.toDrive({
  image: water_frequency_masked,
  description: 'April21',
  fileFormat: 'GeoTIFF',
  scale: 10,
  region: aoi,
});