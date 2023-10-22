var ahn = ui.import && ui.import("ahn", "image", {
      "id": "AHN/AHN2_05M_RUW"
    }) || ee.Image("AHN/AHN2_05M_RUW"),
    ahn3 = ui.import && ui.import("ahn3", "image", {
      "id": "users/gena/AHN3_DSM"
    }) || ee.Image("users/gena/AHN3_DSM");
var emodnet = ee.Image("users/gena/EMODNET"),
    gebco = ee.Image("users/gena/GEBCO_2014_2D");
Map.setCenter(5.813032031596322, 53.382676085001734, 7)
Map.setOptions('HYBRID')
var palette = ["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","08519c","08306b"].slice(2).reverse()
var min = -25, max = 5
var weight = 1.3
var exaggregation = 2000
var azimuth = 315
var elevation = 45
var shadows = false
//var shadows = true
// Load EDMODNET
emodnet = emodnet//.resample('bilinear')
var emodnetRGB =  hillshadeRGB(
        emodnet.visualize({min:min, max:max, palette: palette}),  // style
        emodnet, 
        weight, 200, azimuth, elevation, shadows)
Map.addLayer(emodnet, {}, 'EMODNET (RAW)', false)
Map.addLayer(emodnetRGB, {}, 'EMODNET', false)
// Load GEBCO
gebco = gebco.resample('bilinear')
var gebcoRGB = hillshadeRGB(
        gebco.visualize({min:min, max:max, palette: palette}),  // style
        gebco, 
        weight, 200, azimuth, elevation, shadows)
Map.addLayer(gebcoRGB, {}, 'GEBCO', false)
// sub-tidal experiments
function getImages(hillshade) { 
  var images = ee.ImageCollection('users/gena/eo-bathymetry/depth-subtidal-uncalibrated')
  return images.map(function(i) {
    //i = i.reduceNeighborhood(ee.Reducer.median(), ee.Kernel.circle(3))
    // y = -6.3242x4 + 33.965x3 - 72.483x2 + 74.831x - 29.659R² = 0.9156 (NL coast)
    var a = [-6.3242, 33.965, -72.483, 74.831, -29.659]
    var z = i.pow(4).multiply(a[0])
      .add(i.pow(3).multiply(a[1]))
      .add(i.pow(2).multiply(a[2]))
      .add(i.multiply(a[3]))
      .add(a[4])
    if(!hillshade) {
      return z.visualize({min:min, max:max, palette: palette})
    }
    var rgb = hillshadeRGB(
        z.visualize({min:min, max:max, palette: palette}),  // style
        i, // elevation // reproject may not be needed for non-computed image
        weight, exaggregation, azimuth, elevation, shadows)
    //rgb = rgb.updateMask(i.mask().focal_min(Map.getScale(), 'square', 'meters'))
    return rgb//.updateMask(gebco.unitScale(-100, -50).clamp(0, 1))
  })
}
var image = getImages(false).mosaic()
Map.addLayer(image, {}, 'inverse-depth', false)
image = getImages(true).mosaic()
Map.addLayer(image, {}, 'inverse-depth (hillshade)', false)
var Zrws = ee.ImageCollection('users/gena/vaklodingen')
  //.filterDate('2010-01-01', '2020-01-01')
  .sort('system:time_start')
  .map(function(i) { return i.resample('bilinear') })
Map.addLayer(Zrws.mosaic().multiply(0.01), {min: min, max: max}, 'Z RWS', false)
Zrws = Zrws.map(function(i) {
  i = i.multiply(0.01)
  return hillshadeRGB(i.visualize({min:min, max:max, palette: palette}), i, 1.5, 50, azimuth, elevation)  
})
Map.addLayer(Zrws.mosaic(), {}, 'Z RWS (hillshade)', false)
// JRC
var jrc = ee.Image('JRC/GSW1_2/GlobalSurfaceWater')
var jrcWaterOccurrence = jrc.select('occurrence').divide(100)
var jrcWater = jrcWaterOccurrence.gt(0)
Map.addLayer(jrcWaterOccurrence, {palette: palette, min:1, max:0}, 'water occurrence (JRC)', false)
var intertidal = ee.ImageCollection('users/gena/eo-bathymetry/depth-intertidal-uncalibrated')
var ndwiMin = -0.1
var ndwiMax = 0.15
var intertidal = intertidal.map(function(i) { 
  i = i
    .where(i.lt(ndwiMin), ndwiMin)
    .unitScale(ndwiMin, ndwiMax)
  i = i
    //.updateMask(i.lt(0.99).and(i.gt(0.05)))
  return i
})
var intertidal3d = intertidal.map(function(i) {
  return hillshadeRGB(i.visualize({min:0, max:1, palette: palette.reverse()}), i, 1.5, 1000, azimuth-180, elevation)
})
Map.addLayer(intertidal3d.mosaic(), {}, 'intertidal (hillshade)', false)
/***
 * Clips and rescales image using a given range of values
 */ 
function rescale(img, exp, thresholds) {
  return img.expression(exp, { img: img }).subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
};
/*** 
 * Convet image from degrees to radians
 */
function radians(img) { return img.toFloat().multiply(3.1415927).divide(180); }
/***
 * Computes hillshade
 */
function hillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image.constant(az));
  var zenith = radians(ee.Image.constant(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
/***
 * Styles RGB image using hillshading, mixes RGB and hillshade using HSV<->RGB transform
 */
function hillshadeRGB(image, elevation, weight, height_multiplier, azimuth, zenith, castShadows) {
  weight = weight || 1.5
  height_multiplier = height_multiplier || 5
  azimuth = azimuth || 0
  zenith = zenith || 45
  var hsv = image.unitScale(0, 255).rgbToHsv();
  var z = elevation.multiply(ee.Image.constant(height_multiplier))
  var terrain = ee.Algorithms.Terrain(z)
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect'])).resample('bicubic');
  var hs = hillshade(azimuth, zenith, slope, aspect).resample('bicubic');
  if(castShadows) {
    var hysteresis = true
    var neighborhoodSize = 100
    var hillShadow = ee.Algorithms.HillShadow(z, azimuth, zenith, neighborhoodSize, hysteresis).float().not()
    // opening
    // hillShadow = hillShadow.multiply(hillShadow.focal_min(3).focal_max(6))    
    // cleaning
    hillShadow = hillShadow.focal_mode(3)
    // smoothing  
    hillShadow = hillShadow.convolve(ee.Kernel.gaussian(5, 3))
    // transparent
    hillShadow = hillShadow.multiply(0.4)
    hs = ee.ImageCollection.fromImages([
      hs.rename('shadow'), 
      hillShadow.mask(hillShadow).rename('shadow')
    ]).mosaic()
  }
  var intensity = hs.multiply(ee.Image.constant(weight)).multiply(hsv.select('value'));
  var huesat = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
ahn = ahn3.rename('elevation')
var palettes = require('users/gena/packages:palettes')
Map.style().set({
  cursor: 'crosshair'
})
Map.setCenter(5.936440068214548, 53.46360972039469, 14)
var ndwiMin = -0.1
var ndwiMax = 0.14
var ndwi = ee.ImageCollection('users/gena/eo-bathymetry/depth-intertidal-uncalibrated').map(function(i) { 
  return i
    .where(i.lt(ndwiMin), ndwiMin)
    .unitScale(ndwiMin, ndwiMax) 
})
ndwi =  ndwi.mosaic()
var palette = palettes.cb.Blues[9].slice(0)
palette[0] = '000000'
Map.addLayer(ndwi, { palette: palette }, 'water occurrence')
Map.addLayer(ahn, {min: -2, max: 5}, 'AHN', false)
Map.addLayer(ee.Terrain.hillshade(ahn.multiply(10), 315, 15), { min: 5, max: 240 }, 'AHN HS', false)
Map.addLayer(ee.Terrain.hillshade(ee.Image(1).float().subtract(ndwi).multiply(10).reproject(ee.Projection('EPSG:3857').atScale(10)), 315, 15).updateMask(ndwi.lt(0.95)), { min: 29, max: 86 }, 'water occurrence HS', false)
Map.addLayer(ahn.mask().multiply(ndwi), {}, 'AHN.mask x water occurrence', false)
var ndwiMask = ndwi.gt(0.05) // probably non-water
var image = ahn.addBands(ee.Image(1).float().subtract(ndwi).rename('water_score'))
var corr = image.reduceNeighborhood({
  reducer: ee.Reducer.spearmansCorrelation(), 
  kernel: ee.Kernel.circle(5)
})
var intertidalZone = ahn.lt(3).and(ndwiMask)
var palette = palettes.crameri.roma[50].slice(0).reverse()
Map.addLayer(corr.select('correlation').updateMask(intertidalZone), { min: -1, max: 1, palette: palette }, 'spearmans correlation')
// show correlation intertidal / subtidal
var subtidal = ee.ImageCollection('users/gena/eo-bathymetry/depth-subtidal-uncalibrated').mosaic()
var image2 = subtidal.rename('depth_uncalibrated').addBands(ee.Image(1).float().subtract(ndwi.updateMask(ndwi.lt(0.95))).rename('water_score'))
var corr2 = image2.reduceNeighborhood({
  reducer: ee.Reducer.spearmansCorrelation(), 
  kernel: ee.Kernel.circle(5)
}).updateMask(ndwi.gt(0.01))
var palette = palettes.crameri.roma[50].slice(0).reverse()
Map.addLayer(corr2.select('correlation'), { min: -1, max: 1, palette: palette }, 'spearmans correlation (intertidal/subtidal)')
Map.setOptions('HYBRID')
var aoiLayer = ui.Map.Layer(null, { color: 'blue' }, 'aoi')
Map.layers().add(aoiLayer)
var chart = ui.Label('Click on the map to show chart')
var panel = ui.Panel([chart])
panel.style().set({ position: 'bottom-left', width: '300px', height: '500px' })
Map.add(panel)
var chart2 = ui.Label('Click on the map to show chart')
var panel2 = ui.Panel([chart2])
panel2.style().set({ position: 'bottom-right', width: '300px', height: '500px' })
Map.add(panel2)
function showTimeSeriesIntertidalAHN(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var samplingArea = pt.buffer(Map.getScale() * 15)
  aoiLayer.setEeObject(samplingArea)
  var sample = image.sample({
    region: samplingArea, 
    scale: Map.getScale() / 2,
    numPixels: 3000,
    geometries: true
  })
  // linear regression
  var coefs = sample.map(function(f) { return f.set({ c: 1 })}).reduceColumns(ee.Reducer.robustLinearRegression(2, 1), ['c', 'water_score', 'elevation'])
  // print('coefs', coefs)
  var residuals = ee.Array(coefs.get('residuals')).toList().get(0)
  coefs = ee.List(ee.Array(coefs.get('coefficients')).transpose(0).toList().get(0))
  var intercept = ee.Number(coefs.get(0))
  var slope = ee.Number(coefs.get(1))
  var mean = sample.reduceColumns(ee.Reducer.mean(), ['elevation']).get('mean')
  // compute residuals manually
  sample = sample.map(function(f) {
    var y = ee.Number(f.get('elevation'))
    var y_hat = slope.multiply(f.get('water_score')).add(intercept)
    return f.set({ 
      residual: y_hat.subtract(y),
      tot: y.subtract(mean).pow(2),
      res: y.subtract(y_hat).pow(2),
    })
  })
  var ssTot = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['tot']).values().get(0))
  var ssRes = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['res']).values().get(0))
  var r2 = ee.Number(1).subtract(ssRes.divide(ssTot))
  var rmse = ssRes.divide(sample.size()).sqrt()
  // print('r2', r2)
  // print('RMSE', rmse)
  var chartOptions = {
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '300px',
    // legend: { position: 'right', alignment: 'start' },
    trendlines: { 0: { type: 'linear', showR2: true, visibleInLegend: true, color: 'red', pointSize: 0, lineWidth: 3 } },
    title: ''
  }
  // show chart
  var chart1 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: 'water_score', 
    yProperties: ['elevation'],
  }).setOptions(chartOptions)
  var chart2 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: 'water_score', 
    yProperties: ['residual'],
  }).setOptions({
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '100px',
    legend: { position: 'right', alignment: 'start' },
    vAxis: { viewWindow: { min: -0.5, max: 0.5 } },
    series: {
      0: { color: 'red' }
    }
  })
  ee.List([rmse, r2]).evaluate(function(o) {
    // EE bug
    if(typeof(o) === 'undefined') {
      return
    }
    chartOptions.title = 'depth ~ estimate, OLS RMSE: ' + o[0].toFixed(3) + 'm, r2: ' + o[1].toFixed(3)
    chart1.setOptions(chartOptions)
  })
  panel.clear()
  panel.widgets().add(chart1)
  panel.widgets().add(chart2)
}
function showTimeSeriesIntertidalSubtidal(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var samplingArea = pt.buffer(Map.getScale() * 15)
  var sample = image2.sample({
    region: samplingArea, 
    scale: Map.getScale() / 2,
    numPixels: 3000,
    geometries: true
  })
  // linear regression
  var coefs = sample.map(function(f) { return f.set({ c: 1 })}).reduceColumns(ee.Reducer.robustLinearRegression(2, 1), ['c', 'water_score', 'depth_uncalibrated'])
  // print('coefs', coefs)
  var residuals = ee.Array(coefs.get('residuals')).toList().get(0)
  coefs = ee.List(ee.Array(coefs.get('coefficients')).transpose(0).toList().get(0))
  var intercept = ee.Number(coefs.get(0))
  var slope = ee.Number(coefs.get(1))
  var mean = sample.reduceColumns(ee.Reducer.mean(), ['depth_uncalibrated']).get('mean')
  // compute residuals manually
  sample = sample.map(function(f) {
    var y = ee.Number(f.get('depth_uncalibrated'))
    var y_hat = slope.multiply(f.get('water_score')).add(intercept)
    return f.set({ 
      residual: y_hat.subtract(y),
      tot: y.subtract(mean).pow(2),
      res: y.subtract(y_hat).pow(2),
    })
  })
  var ssTot = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['tot']).values().get(0))
  var ssRes = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['res']).values().get(0))
  var r2 = ee.Number(1).subtract(ssRes.divide(ssTot))
  var rmse = ssRes.divide(sample.size()).sqrt()
  // print('r2', r2)
  // print('RMSE', rmse)
  var chartOptions = {
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '300px',
    // legend: { position: 'right', alignment: 'start' },
    trendlines: { 0: { type: 'linear', showR2: true, visibleInLegend: true, color: 'red', pointSize: 0, lineWidth: 3 } },
    title: ''
  }
  // show chart
  var chart1 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: 'water_score', 
    yProperties: ['depth_uncalibrated'],
  }).setOptions(chartOptions)
  var chart2 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: 'water_score', 
    yProperties: ['residual'],
  }).setOptions({
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '100px',
    legend: { position: 'right', alignment: 'start' },
    vAxis: { viewWindow: { min: -0.5, max: 0.5 } },
    series: {
      0: { color: 'red' }
    }
  })
  ee.List([rmse, r2]).evaluate(function(o) {
    // EE bug
    if(typeof(o) === 'undefined') {
      return
    }
    chartOptions.title = 'water_score ~ depth_uncalibrated, OLS RMSE: ' + o[0].toFixed(3) + 'm, r2: ' + o[1].toFixed(3)
    chart1.setOptions(chartOptions)
  })
  panel2.clear()
  panel2.widgets().add(chart1)
  panel2.widgets().add(chart2)
}
Map.onClick(showTimeSeriesIntertidalAHN)
Map.onClick(showTimeSeriesIntertidalSubtidal)