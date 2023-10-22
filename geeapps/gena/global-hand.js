var hand30_100 = ui.import && ui.import("hand30_100", "imageCollection", {
      "id": "users/gena/global-hand/hand-100"
    }) || ee.ImageCollection("users/gena/global-hand/hand-100"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    hand30_1000 = ui.import && ui.import("hand30_1000", "image", {
      "id": "users/gena/GlobalHAND/30m/hand-1000"
    }) || ee.Image("users/gena/GlobalHAND/30m/hand-1000"),
    hand90_1000 = ui.import && ui.import("hand90_1000", "image", {
      "id": "users/gena/GlobalHAND/90m-global/hand-1000"
    }) || ee.Image("users/gena/GlobalHAND/90m-global/hand-1000"),
    hand30_5000 = ui.import && ui.import("hand30_5000", "image", {
      "id": "users/gena/GlobalHAND/30m/hand-5000"
    }) || ee.Image("users/gena/GlobalHAND/30m/hand-5000"),
    fa = ui.import && ui.import("fa", "image", {
      "id": "users/gena/GlobalHAND/90m-global/fa"
    }) || ee.Image("users/gena/GlobalHAND/90m-global/fa"),
    jrc = ui.import && ui.import("jrc", "image", {
      "id": "JRC/GSW1_0/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    HS_fa = ui.import && ui.import("HS_fa", "image", {
      "id": "WWF/HydroSHEDS/15ACC"
    }) || ee.Image("WWF/HydroSHEDS/15ACC"),
    HS_fa30 = ui.import && ui.import("HS_fa30", "image", {
      "id": "WWF/HydroSHEDS/30ACC"
    }) || ee.Image("WWF/HydroSHEDS/30ACC"),
    demUk = ui.import && ui.import("demUk", "image", {
      "id": "users/gena/HAND/test_uk_DSM"
    }) || ee.Image("users/gena/HAND/test_uk_DSM");
// GlobalHAND_classes.js
function radians(img) { return img.toFloat().multiply(3.1415927).divide(180); }
function hillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
function hillshadeit(image, elevation, weight, height_multiplier, azimuth, zenith) {
  var hsv  = image.unitScale(0, 255).rgbToHsv();
  var terrain = ee.call('Terrain', elevation.multiply(height_multiplier));
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect'])).resample('bicubic');
  var hs = hillshade(azimuth, zenith, slope, aspect).resample('bicubic');
  var intensity = hs.multiply(weight).multiply(hsv.select('value'));
  var huesat = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
var style_dem = '\
<RasterSymbolizer>\
  <ColorMap  type="intervals" extended="false" >\
    <ColorMapEntry color="#cef2ff" quantity="-200" label="-200m"/>\
    <ColorMapEntry color="#9cd1a4" quantity="0" label="0m"/>\
    <ColorMapEntry color="#7fc089" quantity="50" label="50m" />\
    <ColorMapEntry color="#9cc78d" quantity="100" label="100m" />\
    <ColorMapEntry color="#b8cd95" quantity="250" label="250m" />\
    <ColorMapEntry color="#d0d8aa" quantity="500" label="500m" />\
    <ColorMapEntry color="#e1e5b4" quantity="750" label="750m" />\
    <ColorMapEntry color="#f1ecbf" quantity="1000" label="1000m" />\
    <ColorMapEntry color="#e2d7a2" quantity="1250" label="1250m" />\
    <ColorMapEntry color="#d1ba80" quantity="1500" label="1500m" />\
    <ColorMapEntry color="#d1ba80" quantity="10000" label="10000m" />\
  </ColorMap>\
</RasterSymbolizer>';
var azimuth = 90;
var zenith = 10;
var hsWeight = 1.1;
var heightMultiplier = 3;
var colors_hand = ['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'];
// ----------------------------------------------------------------------------
print(hand30_100.size())
var demImages = [
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM1'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM2'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM3'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM4'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM5'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM6'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM7'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM8'),
  srtm
];
// smoothen HAND a bit, scale varies a little in the tiles
hand30_100 = hand30_100.mosaic().focal_mean(0.1) 
// fix cache
var dem = ee.ImageCollection(demImages).map(function(i) { return i.rename('elevation').add(0); })
// exclude SWBD water
var swbd = ee.Image('MODIS/MOD44W/MOD44W_005_2000_02_24').select('water_mask')
Map.addLayer(swbd, {}, 'swbd mask', false)
var swbdMask = swbd.unmask().not().focal_median(1)//.focal_max(5); // .add(0.2);
//hand = hand.updateMask(swbdMask)
//dem = dem.map(function(i) { return i.updateMask(swbdMask) })
/*
var hydrosheds = ee.Image('WWF/HydroSHEDS/30CONDEM');
var hydroshedsMask = hydrosheds.mask();
hand = hand.updateMask(hydroshedsMask)
dem = dem.map(function(i) { return i.updateMask(hydroshedsMask) })
*/
// render HAND
var handVis = function(hand, hsWeight, heightMultiplier, azimuth, zenith, resample) { return dem.map(function(i) { 
  var handRGB = hand.visualize({min:-1, max:50, palette:colors_hand});
  if(resample) {
    handRGB = handRGB.resample('bicubic')
  }
  return hillshadeit(handRGB, i, hsWeight, heightMultiplier, azimuth, zenith); 
}).mosaic()};
// add layers
Map.addLayer(hand30_100, {min: 0, max: 100}, 'HAND (raw)', false)
Map.addLayer(dem.mosaic(), {min:0, max:2000}, 'DEM (raw)', false)
var azimuth = 90;
var zenith = 20;
var hsWeight = 1.1;
var heightMultiplier = 4;
Map.addLayer(handVis(hand30_100, hsWeight, heightMultiplier, azimuth, zenith, false), {}, 'HAND 30m FA=100 (~0.1km2)', true)
Map.addLayer(handVis(hand30_1000, hsWeight, heightMultiplier, azimuth, zenith, true), {}, 'HAND 30m FA=1000 (~1km2)', false)
Map.addLayer(handVis(hand30_5000, hsWeight, heightMultiplier, azimuth, zenith, true), {}, 'HAND 30m FA=5000 (~5km2)', false)
// use 90m for 90m version
var dem90Images = [
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM1'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM2'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM3'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM4'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM5'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM6'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM7'),
  ee.Image('users/gena/ViewfinderpanoramaDEM/VFP_DEM8')
];
var dem90 = ee.ImageCollection(dem90Images).map(function(i) { return i.rename('elevation').add(0); })
var hand90Vis = function(hand, hsWeight, heightMultiplier, azimuth, zenith) { return dem90.map(function(i) { 
  var handRGB = hand.visualize({min:-1, max:50, palette:colors_hand}).resample('bicubic');
  return hillshadeit(handRGB, i, hsWeight, heightMultiplier, azimuth, zenith); 
}).mosaic()};
Map.addLayer(hand90Vis(hand90_1000, hsWeight, heightMultiplier, azimuth, zenith), {}, 'HAND 90m FA=1000 (~8km2)', false)
// render DEM
var demVis = function(hsWeight, heightMultiplier, azimuth, zenith) { return dem.map(function(i) { 
  var demRGB = i.sldStyle(style_dem);
  return hillshadeit(demRGB, i, hsWeight, heightMultiplier, azimuth, zenith).mask(HS_fa.mask()); 
}).mosaic()};
Map.addLayer(demVis(hsWeight, heightMultiplier, azimuth, zenith), {}, 'DEM 30m', false)
var demUkVis = function(hsWeight, heightMultiplier, azimuth, zenith) { 
  var demRGB = demUk.sldStyle(style_dem);
  return hillshadeit(demRGB, demUk, hsWeight, heightMultiplier, azimuth, zenith).mask(HS_fa.mask()); 
}
Map.addLayer(demUkVis(hsWeight, heightMultiplier, azimuth, zenith), {}, 'DEM UK (extruded)', false)
// render DEM 90m
var dem90Vis = function(hsWeight, heightMultiplier, azimuth, zenith) { return dem90.map(function(i) { 
  var demRGB = i.sldStyle(style_dem);
  return hillshadeit(demRGB, i, hsWeight, heightMultiplier, azimuth, zenith); 
}).mosaic()};
Map.addLayer(dem90Vis(hsWeight, heightMultiplier, azimuth, zenith), {}, 'DEM 90m', false)
// extruded (for zoom-out)
var azimuth = 60;
var zenith = 60;
var hsWeight = 1.8;
var heightMultiplier = 10;
Map.addLayer(handVis(hand30_100, hsWeight, heightMultiplier, azimuth, zenith), {}, 'HAND (extruded)', false)
Map.addLayer(demVis(hsWeight, heightMultiplier, azimuth, zenith), {}, 'DEM (extruded)', false)
Map.addLayer(srtm.mask().mask(srtm.mask()), {opacity: 0.6}, 'SRTM (mask)', false)
// Hough transform
var canny = ee.Algorithms.CannyEdgeDetector(hand30_100, 0.8, 2).multiply(255)
var hmask = hand30_100.gt(20).focal_max(10).not()
Map.addLayer(hmask.mask(hmask), {}, 'hmask', false)
canny = canny.mask(hmask)
var h = ee.Algorithms.HoughTransform(canny, 128, 10, 100, false);
Map.addLayer(canny.updateMask(canny.gt(0)), {min: 0, max: 1, palette: '00FF00'}, 'canny', false);
Map.addLayer(h.updateMask(h.gt(0)), {min: 0, max: 1, palette: 'FF0000'}, 'hough', false);
// potential water (valleys)
var thresholds = [0,1,2,5,10]
thresholds.map(function(th) {
  var water = hand30_100.lte(th)
    .focal_max(1)
    .focal_mode(2, 'circle', 'pixels', 5).mask(swbdMask)
  Map.addLayer(water.mask(water), {palette:['0020ff'], opacity:0.8}, 
    'water (HAND < ' + th + 'm)', false);
});
// var basinsMax4_ar = ee.FeatureCollection('ft:11jSm_oWFEAQzSIQe1U6G3KrR0LOS8m-fWgDg1DXw')
// var basinsMax4_na = ee.FeatureCollection('ft:1HAbBuf18oeZ1u9ywawDXHZSSx1aqPBvmjeSbOyQw')
// var basinsMax4_si = ee.FeatureCollection('ft:1bUKJR4Kt3p8MezYtZdRKw11PsDxnRBfv0SXsUO5S')
// var basinsMax4_eu = ee.FeatureCollection('ft:1MEAjk9ExAKNksJNjdmTfKPuPVtAj-ppE_PCP-qen')
// var basinsMax4_as = ee.FeatureCollection('ft:166Y2S94c9pZSqqCsyT5-n0d42CNuW5ixobWOwMxl')
// var basinsMax4_sa = ee.FeatureCollection('ft:1b8FEG5pjIRkj_SgkIzGEFG_ImTlqoqt0cgCpuFPP')
// var basinsMax4_au = ee.FeatureCollection('ft:1_KMK1vazXQzjH1GdYyQMFlCB9ZtF4YRKbliBs8NF')
// var basinsMax4_af = ee.FeatureCollection('ft:1L1nVdntijwLVmMMI7rqg2dkQ1epBVHhpWPosm1S-')
// var basinsMax4 = basinsMax4_ar.merge(basinsMax4_na).merge(basinsMax4_si).merge(basinsMax4_eu).merge(basinsMax4_as).merge(basinsMax4_sa).merge(basinsMax4_au).merge(basinsMax4_af)
// Map.addLayer(ee.Image().paint(basinsMax4, 0, 1), {palette:['ffff00']}, 'max 4', false)
// add global flow accumulation (reset at sub-catchment boundaries)
var palette_fa = ['deebf7', '9ecae1', '3182bd']
fa = fa.mask(fa.gt(1000))
Map.addLayer(fa, {min:1000, max: 100000, palette: palette_fa}, 'flow accumulation', false)
Map.addLayer(HS_fa.mask(HS_fa.gt(100)), {min:100, max: 1000, palette: palette_fa}, 'flow accumulation (HS 450m)', false)
Map.addLayer(HS_fa30.mask(HS_fa30.gt(50)), {min:50, max: 500, palette: palette_fa}, 'flow accumulation (HS 900m)', false)
var palette_fa = ['202000', 'ffff00']
Map.addLayer(fa, {min:1000, max: 100000, palette: palette_fa}, 'flow accumulation', false)
Map.addLayer(HS_fa.mask(HS_fa.gt(100)), {min:100, max: 1000, palette: palette_fa}, 'flow accumulation (HS 450m)', false)
Map.addLayer(HS_fa30.mask(HS_fa30.gt(50)), {min:50, max: 500, palette: palette_fa}, 'flow accumulation (HS 900m)', false)
Map.setOptions('SATELLITE')
// add HydroBASINS, author: rutgerhofste@gmail.com
// rasterized geometries on PFAF12 
var HydroBASINSimage = ee.Image("users/rutgerhofste/PCRGlobWB20V04/support/global_Standard_lev00_30sGDALv01");
var HydroBASINSimageProjection = HydroBASINSimage.projection();
var HydroBASINSimageNominalScale = HydroBASINSimageProjection.nominalScale();
Map.addLayer(HydroBASINSimage, {}, 'HydroBASINS RAW', false)
var Levels = {
  "Level 1": 1,
  "Level 2": 2,
  "Level 3": 3,
  "Level 4": 4,
  "Level 5": 5,
  "Level 6": 6,
  "Level 7": 7,
  "Level 8": 8,
  "Level 9": 9,
  "Level 10": 10,
  "Level 11": 11,
  "Level 12": 12,
};
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Select HydroBasins Level:'))
    .add(ui.Select({
        items: Object.keys(Levels),
        onChange: function(key) {
          var newBasinPFAFLevel =Levels[key]
          var newHydroBASINimage = HydroBASINSimage.divide(ee.Number(10).pow(ee.Number(12).subtract(newBasinPFAFLevel))).floor();
          newHydroBASINimage = newHydroBASINimage.unmask()//.focal_mode(600, 'circle', 'meters', 3)
            //.mask(l2India)
          var layers = Map.layers()
          var l1 = ui.Map.Layer(newHydroBASINimage.randomVisualizer(), {opacity: 1},"HydroBasins " + newBasinPFAFLevel, true, 0.7)
          var edge = ee.Algorithms.CannyEdgeDetector(newHydroBASINimage, 0.99, 0).focal_max(1)
          var l2 = ui.Map.Layer(edge.mask(edge), {opacity: 1},"HydroBasins " + newBasinPFAFLevel, true, 0.7)
          var l3 = ui.Map.Layer(newHydroBASINimage, {opacity: 1},"HydroBasins " + newBasinPFAFLevel + ' (raw)', false, 0.7)
          layers.insert(11, l1)
          layers.insert(11, l2)
          layers.insert(11, l3)
        }
    })
);
// ui.root.add(panel);
Map.setCenter(0, 0, 3)
var water = jrc.select('occurrence').divide(100).multiply(HS_fa.mask())
Map.addLayer(water.mask(water.multiply(2)), {palette:['000000', '2020aa']}, 'water', false)
function renderHandClasses() {
  var dem = ee.Image('USGS/SRTMGL1_003')
  //var terrain = ee.call('Terrain', dem);
  var gaussianKernel = ee.Kernel.gaussian(3, 2, 'pixels', true, 2);
  var terrain = ee.call('Terrain', dem.convolve(gaussianKernel));
  var slope = radians(terrain.select(['slope']))
    .lt(0.076)
  //Map.addLayer(slope.mask(slope), {palette:'000000'}, 'slope < 0.076', false)
  slope = slope
    .focal_max({radius: 50, units: 'meters'})
    //.focal_mode({radius: 55, units: 'meters', iterations:5})
    .focal_min({radius: 50, units: 'meters'})
  //Map.addLayer(slope.mask(slope), {palette:'000000'}, 'slope < 0.076 (smoothed)', false)
  var hand_class = hand30_1000.addBands(slope).expression(
    "(b(0) <= 5.3) ? 0 \
      : (b(0) <= 15 && b(0) > 5.3 ) ? 1 \
      : (b(0) > 15 && b(1) == 0 ) ? 2 \
      : (b(0) > 15 && b(1) == 1 ) ? 3 \
      : 0"
  );
  var style_hand_classes = '\
  <RasterSymbolizer>\
    <ColorMap  type="intervals" extended="false" >\
      <ColorMapEntry color="#000055" quantity="0" label="Waterlogged"/>\
      <ColorMapEntry color="#00ff00" quantity="1" label="Ecotone"/>\
      <ColorMapEntry color="#ffff00" quantity="2" label="Slope" />\
      <ColorMapEntry color="#ff0000" quantity="3" label="Plateau" />\
    </ColorMap>\
  </RasterSymbolizer>';
  var azimuth = 90;
  var zenith = 30;
  //var hand_class_vis = hand_class.visualize({palette: colors_hand_classes})
  var hand_class_vis = hand_class
    //.focal_mode({radius:30, units:'meters', iterations:5})
    //.focal_mode({radius:0.8, iterations:3})
    //.focal_max({radius: 30, units: 'meters'})
    //.focal_min({radius: 30, units: 'meters'})
    .sldStyle(style_hand_classes)
  return hillshadeit(hand_class_vis, dem, 1.1, 2, azimuth, zenith)
}
Map.addLayer(renderHandClasses(), {}, 'planforms', false)
var catchments1 = ee.FeatureCollection('ft:16kPC0ynt-oa_YUM6oMHFJLHSbOqOT2YB9GM_RV3z')
var catchments2 = ee.FeatureCollection('ft:1catWrC3K0NF5xUNOJJQyX2qUS3o0Z-cX0O7Oc6ZZ')
var catchments = catchments1.merge(catchments2)
// Map.addLayer(catchments.style({color: 'ffffff', width: 2, fillColor: 'ffffff00'}), {}, 'catchments')