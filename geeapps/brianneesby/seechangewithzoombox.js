// Select MODIS vegetation composites from 2018.
var collection = ee.ImageCollection('users/deepakna/w210_results')
// Add the first image to the map, just as a preview.
var im = ee.Image(collection.first());
// Visualization parameters.
var args = {
    crs: 'EPSG:3857',  // Maps Mercator
    min: 0,
    max: 0.85,
    opacity: 0.8,
    palette: '#a5a831, #edf3a4, #a4ba4a, #bdd002, #a8d681, #4f8901, #416129, #1d3c02, #122d17',
};
Map.addLayer(im, args, "first image");
function refreshMap(lon, lat) {
  var lon1 = lon - 22.5;
  var lat1 = lat - 17;
  var lon2 = lon + 22.5;
  var lat2 = lat + 17;
  removeLayer()
  // The region of interest - a planar rectangle around Australia.
  var rect = ee.Geometry.Rectangle({
    coords: [[lon1, lat1], [lon2, lat2]],
    geodesic: false
  });
  Map.addLayer(rect,'', 'rect');
  Map.centerObject(rect, 3);
  // Visualization parameters.
  var args = {
    crs: 'EPSG:3857',  // Maps Mercator
    dimensions: '300',
    region: rect,
    min: 0,
    max: 0.85,
    opacity: 0.8,
    palette: '#a5a831, #edf3a4, #a4ba4a, #bdd002, #a8d681, #4f8901, #416129, #1d3c02, #122d17',
    framesPerSecond: 2,
  };
  // Create a video thumbnail and add it to the map.
  var thumb = ui.Thumbnail({
    // Specifying a collection for "image" animates the sequence of images.
    image: collection,
    params: args,
    style: {
      position: 'bottom-right',
      width: '500px'
    }});
  Map.add(thumb, 'thumb');
}
var removeLayer = function() {
  var layers = Map.layers()
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    if(lay_name == 'rect') {
      Map.remove(lay)
    }
  })
  var thumbnails =  Map.widgets()
  thumbnails.forEach(function(wi) {
    Map.remove(wi)
  })
}
Map.onClick(function(coords) {
  refreshMap(coords.lon, coords.lat)
});
refreshMap(130,-28.5)