var initialPoint = ui.import && ui.import("initialPoint", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -16.43980640337991,
            64.10960213483894
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-16.43980640337991, 64.10960213483894]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "R_median",
          "G_median",
          "B_median"
        ],
        "min": 0.1,
        "gamma": 2.71
      }
    }) || {"opacity":1,"bands":["R_median","G_median","B_median"],"min":0.1,"gamma":2.71};
//var initialPoint = ee.Geometry.Point(-46.8493,61.0308); //QAS_L
if (ui.url.get("lat")) {
  initialPoint = ee.Geometry.Point(ui.url.get('lon'),ui.url.get('lat'));
}
var initialZoom = 11;
if (ui.url.get("zoom")) {
  initialZoom = ui.url.get('zoom')
}
var deltat =1
if (ui.url.get("deltat")) {
  deltat = ui.url.get('deltat')
}
//initialPoint = ee.Geometry.Point(-153.937225342,61.544967651);
var geometry = initialPoint.buffer(10000);
Map.centerObject(initialPoint, initialZoom);
////
function cloudMaskL457(image) {
  var qa = image.select('pixel_qa');
  var cloud = qa.bitwiseAnd(1 << 5).and(qa.bitwiseAnd(1 << 7)).or(qa.bitwiseAnd(1 << 3)).spectralDilation('sam');
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2).copyProperties(image, ["system:time_start"]);
}
function copyGreen(image) {
  var R = image.select('B3').rename(['R']);
  var G = image.select('B2').rename(['G']);
  var B = image.select('B1').rename(['B']);
  var threshold = 0.7
  return image
    .addBands(R.where(R.gt(threshold),G), ['R'])
    .addBands(B.where(B.gt(threshold),G), ['B'])
    .select(['R','B2','B']).rename(['R','G','B']);
}
function maskL8sr(image) {
  var mask = image.select('pixel_qa').bitwiseAnd((1 << 3) + (1 << 5)).eq(0);
  return image.updateMask(mask.spectralDilation('sam')).divide(10000).copyProperties(image, ["system:time_start"]);
}
/// Based on a script by Andrew Cutts
//  https://raw.githubusercontent.com/acgeospatial/GoogleEarthEngineJs/master/animation_script.js
// Landat 5 surface reflection data
var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
.filter(ee.Filter.lt('CLOUD_COVER_LAND',45))
//.map(cloudMaskL457)
.filterBounds(geometry)
.map(copyGreen)
// Landat 7 surface reflection data, fill in the gaps! See USGS pages for more info
var L7coll = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
.filter(ee.Filter.lt('CLOUD_COVER_LAND',45))
.filterDate('1900-1-1T00:00:00','2013-1-1T00:00:00')
//.map(cloudMaskL457)
.filterBounds(geometry)
.map(copyGreen)
.map(function(image){
    var filled1a = image.focal_mean(1, 'square', 'pixels', 2);
    return filled1a.blend(image).copyProperties(image, ["system:time_start"]);
  });
// Landat 8 surface reflection data, rename the band names. See USGS pages for more info
var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
.filter(ee.Filter.lt('CLOUD_COVER_LAND',45))
.select(['B4', 'B3', 'B2'])
.filterBounds(geometry) 
.map(function(image){
  //var mask = image.select('pixel_qa').bitwiseAnd((1 << 3) + (1 << 5)).eq(0)
  return image.rename(['R', 'G', 'B']).copyProperties(image, ["system:time_start"]);
})
;
// merge L5, L7 & L8
var collection_merge = ee.ImageCollection(L5coll.merge(L7coll.merge(L8coll)));
var lat0 = initialPoint.coordinates().get(1).getInfo()
if (lat0>15) {
  collection_merge=collection_merge.filter(ee.Filter.calendarRange(7, 9, 'month'));
} else if (lat0<-15) {
  collection_merge=collection_merge.filter(ee.filter.or(ee.Filter.calendarRange(12, 12, 'month'),ee.Filter.calendarRange(1, 2, 'month')));
}
// create a list of years to be iterated over next..
var years = ee.List.sequence(1984, 2020);
//print (years)
// create a collection with 1 image for each year
var collectYear = ee.ImageCollection(years
  .map(function(y) {
    var start = ee.Date.fromYMD(y, 1, 1).advance((deltat-1)*12/2, 'month');
    var end = start.advance(12*deltat, 'month');
    return collection_merge.filterDate(start, end).reduce(ee.Reducer.median()).set('yr',y);
}));
// count number of bands in each image, if 0 remove from image collection
var nullimages = collectYear
    .map(function(image) {
      return image.set('count', image.bandNames().length()).copyProperties(image, ["yr"]);
    })
    .filter(ee.Filter.eq('count', 3));
/*
// visualise the collection
var finalCollection = nullimages.map(function(image){
  return image.visualize({bands: ['R_median', 'G_median', 'B_median'], min: 300, max: 8800});
});
// Export the collection to video based on the geometry region
Export.video.toDrive({
  collection: finalCollection,
  description: 'yearly',
  dimensions: 1080,
  framesPerSecond: 1,
  region: geometry
});*/
//add all images as a layer
function addImageToLayers(img) { // display each image in collection
  //var id = image.id
  var year = img.properties['yr']
  var image = nullimages.filter(ee.Filter.eq('yr', year)).first();
  Map.addLayer({
    eeObject: image,
    visParams: {bands:['R_median', 'G_median', 'B_median'],
      min: 0.05, max: 1, gamma:2.5,
    },
    name: String(year),
    shown: year == 2019
  });
}
nullimages.evaluate(function(nullimages) {  // use map on client-side
  nullimages.features.map(addImageToLayers)
})
var firstyear = ee.Number.parse(nullimages.first().get('yr')).getInfo()
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  var layers = Map.layers().getJsArray();
  for (var i = 0; i < layers.length; i++) { 
    var layer = layers[i];
    //layeryr = ee.Number.parse(layer.eeObject.properties['yr'])
    layer.setShown( layer.getName() == year );
  }
};
// Create a label and slider.
var slider = ui.Slider({
  min: firstyear, max: 2020,
  value:2019,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-right',
    padding: '3px', width: '25%'
  }
});
// Add the panel to the map.
Map.add(panel);