var transect = ui.import && ui.import("transect", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              6.01565288548727,
              53.52009969563908
            ],
            [
              6.0749803734909165,
              53.4254029956657
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.LineString(
        [[6.01565288548727, 53.52009969563908],
         [6.0749803734909165, 53.4254029956657]]),
    emodnet = ui.import && ui.import("emodnet", "image", {
      "id": "users/gena/EMODNET"
    }) || ee.Image("users/gena/EMODNET"),
    ahn = ui.import && ui.import("ahn", "image", {
      "id": "AHN/AHN2_05M_RUW"
    }) || ee.Image("AHN/AHN2_05M_RUW"),
    gebco = ui.import && ui.import("gebco", "image", {
      "id": "users/gena/GEBCO_2014_2D"
    }) || ee.Image("users/gena/GEBCO_2014_2D"),
    coastline = ui.import && ui.import("coastline", "table", {
      "id": "users/gena/eo-bathymetry/osm-coastline"
    }) || ee.FeatureCollection("users/gena/eo-bathymetry/osm-coastline"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    vaklodingen = ui.import && ui.import("vaklodingen", "imageCollection", {
      "id": "users/gena/vaklodingen"
    }) || ee.ImageCollection("users/gena/vaklodingen");
print(vaklodingen)
Map.addLayer(vaklodingen, {}, 'vaklodingen', false)
Map.centerObject(vaklodingen, 10)
function app() {
  var bathymetryMin = -5
  print(Palettes.water)
  Map.addLayer(gebco, {min:5, max:bathymetryMin, palette: Palettes.water}, 'GEBCO', false)
  Map.addLayer(hillshadeit(gebco.visualize({min:5, max:bathymetryMin, palette: Palettes.water}), 
    gebco, 1.5, 30, 0, 315), {}, 'GEBCO (hillshade)', false)
  Map.addLayer(emodnet, {min:5, max:bathymetryMin, palette: Palettes.water}, 'EMODNET', false)
  Map.addLayer(hillshadeit(emodnet.visualize({min:5, max:bathymetryMin, palette: Palettes.water}), 
    emodnet, 1.5, 30, 0, 315), {}, 'EMODNET (hillshade)', false)
  // load Dutch bathymetry (vaklodingen, measured annually)
  var images = ee.ImageCollection('users/gena/vaklodingen')
    .filterDate('1900-01-01', '2018-01-01');
  images = images.sort('system:time_start', false);
  var bathymetry = images.reduce(ee.Reducer.firstNonNull()).divide(1000);
  var bathymetryCount = images.count();
  Map.addLayer(bathymetry, {min:5, max:bathymetryMin, palette: Palettes.water}, 'bathymetry, RWS', false)
  Map.addLayer(hillshadeit(bathymetry.visualize({min:5, max:bathymetryMin, palette: Palettes.water}), 
    bathymetry.reproject('EPSG:3857', null, 20), 1.5, 30, 0, 315), {}, 'bathymetry, RWS (hillshade)', true)
  Map.addLayer(bathymetryCount, {min:0, max:10}, 'bathymetry, count', false)
  // Dutch LiDAR topogrpahy (0.5m)
  Map.addLayer(ahn, {min:5, max:bathymetryMin, palette: Palettes.water}, 'AHN', false);
  Map.addLayer(hillshadeit(ahn.visualize({min:5, max:bathymetryMin, palette: Palettes.water}), 
    ahn, 1.5, 30, 0, 315), {}, 'AHN (hillshade)', true)
  // global coastline (OpenStreetMap - large)
  Map.addLayer(ee.Image().paint(coastline,1,1), {palette:['ffff00']}, 'coastline', false)
   var deepWater = gebco.lt(-5)
    .focal_min({radius: 3, kernelType: 'circle', iterations: 3})
    //.focal_max({radius: 5, kernelType: 'circle', iterations: 2})
    .reproject(gebco.projection())
  var lowLand = srtm.unmask().lt(5)
    .focal_min({radius: 3, kernelType: 'circle', iterations: 3})
    .reproject(srtm.projection())
  Map.setOptions('SATELLITE')
  // compute 50 locations along the transect  
  var distances = ee.List.sequence({start: 0, end: transect.length(), count: 50})
  var lines = transect.cutLines(distances).geometries()
  var locations = lines.map(function(g) { return ee.Feature(ee.Geometry(g).centroid()) })
  locations = ee.FeatureCollection(locations)
  Map.addLayer(locations, {}, 'transect locations', false)
  print(locations)
  // plot chart
  var combined = ee.Image([ahn.rename('AHN'), bathymetry.rename('RWS')]).unmask()
  var features = combined.unmask().reduceRegions(locations, ee.Reducer.first())
  // TODO: plot a new chart showing values of Vaklodingen and AHN along the transect geometry, use features generated along the line as locations
  // TODO, ADVANCED: plot offsets in meters along the x axis
}
function radians(img) { 
  return img.toFloat().multiply(3.1415927).divide(180); 
}
function hillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
function hillshadeit(image, elevation, weight, height_multiplier, azimuth, zenith) {
  var hsv  = image.unitScale(0, 255).rgbToHsv();
  var terrain = ee.Algorithms.Terrain(elevation.multiply(height_multiplier));
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect'])).resample('bicubic');
  var hs = hillshade(azimuth, zenith, slope, aspect).resample('bicubic');
  var intensity = hs.multiply(weight).multiply(hsv.select('value'));
  var huesat = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
var Palettes = {
  water: ['f7fbff', 'deebf7', 'c6dbef', '9ecae1', '6baed6', '4292c6', '2171b5', '08519c', '08306b']
};
app();