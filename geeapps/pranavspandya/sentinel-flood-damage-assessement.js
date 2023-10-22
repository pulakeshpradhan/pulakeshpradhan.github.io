var image2 = ui.import && ui.import("image2", "image", {
      "id": "COPERNICUS/S2/20190630T100031_20190630T100212_T32TQM"
    }) || ee.Image("COPERNICUS/S2/20190630T100031_20190630T100212_T32TQM"),
    SentinelCollection = ui.import && ui.import("SentinelCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
var POI=ee.Geometry.Point([83.2707937519165,23.65997218660174])
Map.centerObject(POI,13)
var BeforeDate=['2020-01-01','2020-01-31']
var AfterDate=['2020-01-01','2020-12-31']
//Creating Objects for getting Image from Sentinel Collection & Sharpening it
var image=(SentinelCollection
.filterDate('2020-01-01', '2020-12-31')
.filterDate(BeforeDate[0],BeforeDate[1])
.filterBounds(POI)
.sort('CLOUDY_PIXEL_PERCENTAGE')
.first())
// print(ee.Date(image.get('DATATAKE_IDENTIFIER'))['4:-20'])
//PanSharpening Reference
var sharpened = panSharpen({
  image: image,
  bestEffort: true
});
// Map.remove()
// Map.addLayer(sharpened, visParams, 'sharpened')
// Map.centerObject(POI, 16)
// leftMap.centerObject(POI, 16)
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
//----------------------------------------------------------
// Split Pane Slider Comparison
//----------------------------------------------------------
var Compare = ui.Button({
  label: 'Damage Assessment (Comparison)',
    style: {position: 'top-right',fontSize: '20px', fontWeight: 'bold',backgroundColor: 'blue',Color:'red'},
  onClick: function() {
var images = {
  'Jan - Before Flood': getWeeklySentinelComposite('2019-01-1'),
  'Feb - Before Flood': getWeeklySentinelComposite('2020-02-1'),
  'Mar - Before Flood': getWeeklySentinelComposite('2020-03-1'),
  'April - Heavy Rainfall': getWeeklySentinelComposite('2020-05-1'),
  'May - After Flood': getWeeklySentinelComposite('2020-06-1')
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                      .filterBounds(POI)
                      .filterDate(date, date.advance(30, 'days'))
                      .sort('CLOUDY_PIXEL_PERCENTAGE')
                      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
                      .first();
var vis={max: 1700, min: 1160, bands:'B3',palette:['black','aqua']}                  
  //For Sharpening Image
  var sentinel1 = panSharpen({
  image: sentinel1,
  bestEffort: true
})
  return sentinel1.visualize(vis);
}
// Map.centerObject(POI,16)
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 3, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose The Date of your observation');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
// print(images)
var vis={max: 1405.9738214015126, min: 1000, bands:'B3'}                  
// Map.addLayer(images['2020-07-21'],{},'2')
leftMap.centerObject(POI, 14)
  }
});
Map.add(Compare);
/** MetaInformation - PanSharpening
 * Pansharpens a Sentinel 2 image.
 * 
 * Arguments:
 * 
 * params - a client-side object containing:
 *  
 *    image (Image, required) 
 *        The image to pansharpen
 * 
 *    geometry (Geometry, default: image.geometry()) 
 *        The region to pansharpen
 * 
 *    crs (Projection, default: projection of image's first band)
 *        The projection to work in.
 * 
 *    maxPixels (Long, default: 10000000)
 *        The maximum number of pixels to reduce.
 * 
 *    bestEffort (Boolean, default: false)
 *        If the geometry would contain more pixels than maxPixels, 
 *        compute and use a larger scale which would allow the operation to succeed.
 * 
 *    tileScale (Float, default: 1)
 *        A scaling factor used to reduce aggregation tile size; 
 *        using a larger tileScale (e.g. 2 or 4) may enable computations 
 *        that run out of memory with the default.
 */
 //------------------------------------------------------------------
 // Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Critical Infrastructure Damage Detection Using Satellite Images and Crowd Sourcing',
    style: {fontSize: '20px', fontWeight: 'bold',Color:'black'}
  }),
  ui.Label({
    value:'A Case Study of Bihar Floods (2020)'})
    // style:{fontAlign:'center'})
]);
Map.add(intro);
//------------------------------------------------------------
var lon = ui.Textbox({
  placeholder: 'Enter longitude here...',
  style: {position: 'top-right'},
  onChange: function(value) {
    return(value);
  }
});
Map.add(lon);
var lat = ui.Textbox({
  placeholder: 'Enter latitude here...',
  style: {position: 'top-right'},
  onChange: function(value) {
    return(value);
  }
});
Map.add(lat);
var Lo = ee.Number.parse(lon);
var La = ee.Number.parse(lat);
var button = ui.Button({
  label: 'Accept Coordinates',
    style: {position: 'top-right',fontSize: '20px', fontWeight: 'bold',Color:'blue'},
  onClick: function() {
    Map.setCenter(Lo,La,14);
  }
});
Map.add(button);
//Visual Definition
//-------------------------------------------------------------------
//Different Visualization Patterns
var visParams = {bands: 'B4,B3,B2', min: 600, max: 1800} //True Colour Visible RGB 
    Map.addLayer(image,visParams,'True Colour BG');
var TCC = ui.Button({
  label: 'True Colour Composite',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function() {
    var visParams = {bands: 'B4,B3,B2', min: 600, max: 1800} //True Colour Visible RGB 
    Map.addLayer(sharpened,visParams,'TCC');
  }
});
Map.add(TCC);
var FCC = ui.Button({
  label: 'Flase Colour Composite',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function() {
    var visParams = {bands: 'B8,B4,B3', min: 600, max: 1800} //True Colour Visible RGB 
    Map.addLayer(sharpened,visParams,'FCC');
  }
});
Map.add(FCC);
var SWIR = ui.Button({
  label: 'Short Wave InfraRed',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function() {
var visParams = {bands: 'B12,B8,B4', min: 600, max: 1800} // SWIR - Water Inundation
    Map.addLayer(sharpened,visParams,'SWIR');
  }
});
Map.add(SWIR);
var Panchromatic = ui.Button({
  label: 'Main - Panchromatic B3',
    style: {position: 'top-left',fontSize: '20px', fontWeight: 'bold',Color:'green'},
  onClick: function() {
var visParams = {bands: 'B3', min: 600, max: 1800} // B3
    Map.addLayer(sharpened,visParams,'Panchromatic');
  }
});
Map.add(Panchromatic);
//-------------------------------------------------------------------------
function panSharpen(params) {
  if (params && !(params.image instanceof ee.Image))
    throw Error('panSharpen(params): You must provide an params object with an image key.')
  var image = params.image
  var geometry = params.geometry || image.geometry()
  var crs = params.crs || image.select(0).projection()
  var maxPixels = params.maxPixels
  var bestEffort = params.bestEffort || false
  var tileScale = params.tileScale || 1
  image = image.clip(geometry)
  var bands10m = ['B2', 'B3', 'B4', 'B8']
  var bands20m = ['B5', 'B6', 'B7', 'B8A', 'B11', 'B12']
  var panchromatic = image
    .select(bands10m)
    .reduce(ee.Reducer.mean())
  // var image20m = image.select(bands20m)
  // var image20mResampled = image20m.resample('bilinear')
  var image10m = image.select(bands10m)
  var image10mResampled = image10m.resample('bilinear')
     var stats10m = image10m
    .reduceRegion({
      reducer: ee.Reducer.stdDev().combine(
        ee.Reducer.mean(), null, true
      ),
      geometry: geometry,
      scale: 10,
      crs: crs, 
      bestEffort: bestEffort, 
      maxPixels: maxPixels, 
      tileScale: tileScale
    })
    .toImage()
     var mean10m = stats10m
    .select('.*_mean')
    .regexpRename('(.*)_mean', '$1')
  var stdDev10m = stats10m
    .select('.*_stdDev')
    .regexpRename('(.*)_stdDev', '$1')
  var kernel = ee.Kernel.fixed({
    width: 5,
    height: 5, 
    weights: [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, 24, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ], 
    // width: 3,
    // height: 3,
    // weights: [
    //   [-1,-1,-1],
    //   [-1,24,-1],
    //   [-1,-1,-1]
    // ], 
    x: -3, 
    y: -3, 
    normalize: false
  })
  var highPassFilter = panchromatic
    .convolve(kernel)
    .rename('highPassFilter')
  var stdDevHighPassFilter = highPassFilter
    .reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: geometry,
      scale: 10,
      crs: crs, 
      bestEffort: bestEffort, 
      maxPixels: maxPixels, 
      tileScale: tileScale
    })
    .getNumber('highPassFilter')
  function calculateOutput(bandName) {
    bandName = ee.String(bandName)
    var W = ee.Image().expression(
      'stdDev10m / stdDevHighPassFilter * modulatingFactor', {
        stdDev10m: stdDev10m.select(bandName),
        stdDevHighPassFilter: stdDevHighPassFilter,
        modulatingFactor: 0.75 //Ratio of Sharpness
      }
    )
    return ee.Image()
      .expression(
        'image10mResampled + (HPF * W)', {
          image10mResampled: image10mResampled.select(bandName),
          HPF: highPassFilter,
          W: W
      }
    )
    .uint16()
  }
  var output = ee.ImageCollection(
      // bands10m.map(calculateOutput)
      bands10m.map(calculateOutput)
    )
    .toBands()
    .regexpRename('.*_(.*)', '$1')
  var statsOutput = output
    .reduceRegion({
      reducer: ee.Reducer.stdDev().combine(
        ee.Reducer.mean(), null, true
      ),
      geometry: geometry,
      scale: 10,
      crs: crs, 
      bestEffort: bestEffort, 
      maxPixels: maxPixels, 
      tileScale: tileScale
    })
    .toImage()
  var meanOutput = statsOutput
    .select('.*_mean')
    .regexpRename('(.*)_mean', '$1')
  var stdDevOutput = statsOutput
    .select('.*_stdDev')
    .regexpRename('(.*)_stdDev', '$1')
  var sharpened = ee.Image()
    .expression(
      '(output - meanOutput) / stdDevOutput * stdDev10m + mean10m', {
        output: output,
        meanOutput: meanOutput,
        stdDevOutput: stdDevOutput,
        stdDev10m: stdDev10m,
        mean10m: mean10m
      }
    )
    .uint16() 
  return image
    .addBands(sharpened, null, true)
    .select(image.bandNames())
}