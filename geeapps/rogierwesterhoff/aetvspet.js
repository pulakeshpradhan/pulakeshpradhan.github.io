// +++ COLOR PALETTES +++ // see https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');
var colorPalette = palettes.kovesi.rainbow_bgyrm_35_85_c69[7].reverse();
var vizEt = {min: 100, max: 1200, palette: colorPalette}; // et
// PLOT AET
var et = ee.Image("users/rogierwesterhoff/etNzWesterhoff2019Int");
var roi = et.geometry();
Map.centerObject(roi,10);
print('et (mm/day): ',et);
var aet = et.select('aet').toFloat();
var pet = et.select('pet').toFloat();
// Map.addLayer(aet,
//         {min: 100, max: 1200, palette: colorPalette},
//         'AET (mm/yr)',true);  
// Map.addLayer(pet,
//         {min: 100, max: 1200, palette: colorPalette},
//         'PET (mm/yr)',true);  
// ++++ Make SplitPanel ++++ https://developers.google.com/earth-engine/ui_widgets
var leftMap = ui.Map();
leftMap.add(createLegend());
leftMap.addLayer(aet, vizEt, 'aet');
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.addLayer(pet, vizEt, 'pet');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true
});
var linker = ui.Map.Linker([leftMap, rightMap]);
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
leftMap.centerObject(roi,8);
// ++++ Histogram ++++ 
// Options for charts: https://developers.google.com/chart/interactive/docs/gallery/histogram
// Pre-define some customization options.
var options = {
//  title: 'AET and PET',
  legend: {position: 'top', maxLines: 2},
  colors: ['green', 'red'],
  fontSize: 20,
  hAxis: {title: 'ET (mm/yr)',
          ticks: [100,200,300,400,500,600,700,800,900,1000,1100,1200]},
  vAxis: {title: 'count'},
  series: {
    0: {color: 'green'},
    1: {color: 'red'}}
};
// Make the histogram, set the options.
var histogram = ui.Chart.image.histogram(et,roi,1000)
    .setSeriesNames(['pet', 'aet'])
    .setOptions(options);
// Display the histogram.
print(histogram);
/*// export as Geotiff and Asset. See https://developers.google.com/earth-engine/exporting
Export.image.toDrive({
  image: aet.multiply(365).toInt(),//toFloat(),
  description: 'meanActualEvapotranspirationInt',
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  scale: 10,
  region: roi,
  maxPixels: 25e9
});
Export.image.toAsset({
  image: pet.addBands(aet).multiply(365).toInt(),
  description: 'meanEvapotranspirationInt',
  assetId: 'etNzWesterhoff2019Int',
  scale: 10,
  region: roi,
  maxPixels: 25e9,
  pyramidingPolicy: {
    'pet': 'mean',
    'aet': 'mean'
  }
});*/
function createLegend() {
    var viz = vizEt;
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'ET\n(mm/yr)',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0',
      whiteSpace: 'pre'
      }
  });
   // Add the title to the panel
  legend.add(legendTitle); 
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  legend.add(panel);
  return legend
}