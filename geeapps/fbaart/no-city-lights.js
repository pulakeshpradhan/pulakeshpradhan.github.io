var dmsp = ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"),
    dmspCalibrated = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4"),
    viirs = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    ged181 = ee.FeatureCollection("users/rogersckw9/ged181"),
    population = ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    population2015 = ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015"),
    light2018 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG/20180901"),
    fitCache = ee.Image("users/fbaart/viirs/fit"),
    offshore = ee.FeatureCollection("users/fbaart/prio/offshore"),
    onshore = ee.FeatureCollection("users/fbaart/prio/onshore");
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
style.SetMapStyleDark()
/*
We have two data sets at our disposal
NOAA/DMSP-OLS/NIGHTTIME_LIGHTS (1992-2013)
NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4 (1996-2011)
NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG (2014-2018)
We can use one of the following for population mapping
JRC/GHSL/P2016/BUILT_LDS_GLOBE_V1
We have conflicts here..,  Note that Syria is excluded, too much conflict, too low quality data 
users/rogersckw9/ged181, downloaded UCDP GED 18.1
*/
var circleLayer = ui.Map.Layer(
  null, 
  {
    color: '#a1f5ff'
  }, 
  'selection'
)
Map.layers().add(circleLayer)
// Let's start with the lights of september 2018
Map.addLayer(
  light2018.updateMask(
    light2018
      // first 0, 10 is gradual transparent.
      .unitScale(0, 10)
      .clamp(0, 1)
  ), 
  {
    bands: 'avg_rad'
    // todo  add light pallette
  }, 
  'light-2018',
  false
)
// Now a bit more difficult, compute the linear trend through the VIIRS dataset
// TODO: add anual cycle (see sealevel examples)
var viirsEquations = viirs.map(function(i) {
  // var logRad = i.select('avg_rad').log().rename('log-avg-rad')
  var constant = ee.Image.constant(1).rename('constant')
  // Convert dates to years, so we have year as a unit
  var t = i.date().millis()
  // ms -> s -> m -> hr -> day -> year
  var years = ee.Image.constant(t)
      .divide(1e3 * 60 * 60 * 24 * 365.25)
      .float()
      .rename('time')
  // seasonal cycle
  var timeRadians = ee.Image.constant(t)
      .divide(1e3 * 60 * 60 * 24 * 365.25)
      .multiply(2 * Math.PI)
      .float()
      .rename('time-radians')      
  var cosTime = timeRadians.cos().rename('cos')
  var sinTime = timeRadians.sin().rename('sin')
  return i.resample('bicubic')
  .addBands(
    years
  ).addBands(
    cosTime
  ).addBands(
    sinTime
  ).addBands(
    constant
  )
})
// The regression function (OLS)
function regression(collection, dependent, independent, robust) {
  var allVars = independents.concat(dependent)
  var reducer = ee.Reducer.linearRegression(independents.length, 1)
  // or use robust version
  if (robust) {
    reducer = ee.Reducer.robustLinearRegression(independents.length, 1)
  }
  var fit = collection.select(allVars)
    .reduce(reducer)
    .select('coefficients')
    .arrayProject([0])
    .arrayFlatten([independents])  
  return fit
}
// Define the equations
var independents = ['constant', 'time', 'cos', 'sin']
var dependent = ['avg_rad']
var fitRobust = regression(viirsEquations, dependent, independents, true)
var fit = regression(viirsEquations, dependent, independents, true)
// Visualization parameters:
// 0 light transparent
// little bit of light -> black
// more light -> blueish
// less light -> redish
// lots more light -> whitish
var viirsCacheLayer =  Map.addLayer(
  fitCache
    .updateMask(
      fitCache
        .abs()
        // limit to 0.3 is transparent
        .unitScale(0, 2)
        .clamp(0, 1)
        // make lowest 0.2 ~ 0.6  transparent
        // up to 0.5 ~ 1.5is gradual less transparent
        .unitScale(0.2, 0.5)
        .clamp(0, 1)
    ), 
  {
  bands: ['time'],
  // black -> color -> 95% -l in hsl
  palette: ['#FEEEE6', '#fc8d59','#000000','#91bfdb', '#ECF4F9'],
  min: -3.0,
  max: 3
}, 'viirs-cached')
var viirsLayer = Map.addLayer(
  fit
    .updateMask(
      fit
        .abs()
        // limit to 0.3 is transparent
        .unitScale(0, 2)
        .clamp(0, 1)
        // make lowest 0.2 ~ 0.6  transparent
        // up to 0.5 ~ 1.5is gradual less transparent
        .unitScale(0.2, 0.5)
        .clamp(0, 1)
    ), 
  {
  bands: ['time'],
  // black -> color -> 95% -l in hsl
  palette: ['#FEEEE6', '#fc8d59','#000000','#91bfdb', '#ECF4F9'],
  min: -3.0,
  max: 3,
}, 'viirs')
viirsLayer.setOpacity(0)
Map.addLayer(
  fit.updateMask(
      fit
        .abs()
        .unitScale(0, 0.05)
        .clamp(0, 1)
    ),
  {
    bands: ['time', 'sin', 'cos']
  },
  'viirs-fit',
  false
)
Map.addLayer(
  fitRobust.updateMask(
      fitRobust
        .abs()
        .unitScale(0, 0.05)
        .clamp(0, 1)
    ),
  {
    bands: ['time', 'sin', 'cos']
  },
  'viirs-fit-robust',
  false
)
// Conflict database
var ged181Selected = ged181.filter(
    ee.Filter.gte('year', 2015)
  )
Map.addLayer(
  // pinkish hue
  ged181Selected.draw('F5A3A3', 2, 0), 
  {
    opacity: 0.8
  }, 
  'ged181',
  false
)
Map.addLayer(
  offshore, 
  {
    opacity: 0.3,
    color: 'C5A646'
  },
  'offshore',
  false
)
Map.addLayer(
  onshore,
  {
    opacity: 0.3,
    color: 'C5A646'
  },
  'onshore',
  false
)
// Add the latest population database
Map.addLayer(
  population2015.updateMask(
    population2015
      .unitScale(0, 100)
      .clamp(0, 1)
  ),
  {
    palette: palettes.colorbrewer.Greens[9],
    min: 0, 
    max: 1000
  }, 
  'population 2015', 
  false
)
var circle = ee.Kernel.circle({
  radius: 1000, 
  units: 'meters', 
  normalize: true
});
// Expected light -> enough people + 1km blur
// 0 - 20 population -> transparent, 20 - 100 -> brighter
var expectedLight = population2015
  .unitScale(0, 100)
  .clamp(0, 1)
  .convolve(circle);
expectedLight = expectedLight.updateMask(
  expectedLight
    .unitScale(0, 0.2)
    .clamp(0, 1)
)
Map.addLayer(expectedLight, {
  palette: ['000000', 'ffffdd'],
  min: 0,
  max: 1
}, 'expectedLight 2015', false)
var nocityFit = fit.updateMask(
  ee.Image(1).subtract(
    expectedLight
      .mask()
  ).min(
    fit
      .abs()
      // limit to 0.3 is transparent
      .unitScale(0, 2)
      .clamp(0, 1)
      // make lowest 0.2 ~ 0.6  transparent
      // up to 0.5 ~ 1.5is gradual less transparent
      .unitScale(0.2, 0.5)
      .clamp(0, 1)
  )
)
Map.addLayer(
  nocityFit, 
  {
    bands: ['time'],
  // black -> color -> 95% -l in hsl
    palette: ['#FEEEE6', '#fc8d59','#000000','#91bfdb', '#ECF4F9'],
    min: -3.0,
    max: 3
  },
  'viirs-nocity',
  false
)
// interactivity
var panel = ui.Panel()
var label = ui.Label('Select a point')
var button = ui.Button('X', function(evt) {
  Map.remove(panel)
})
panel.add(label)
panel.add(button)
panel.style().set({
  width: '400px',
  position: 'bottom-left'
});
Map.add(panel);
Map.onChangeZoom(function(zoom, widget) {
  var scale = Map.getScale()
  if (scale < 500) {
    viirsLayer.setOpacity(1)
    viirsCacheLayer.setOpacity(0)
  } else {
    viirsLayer.setOpacity(0)
    viirsCacheLayer.setOpacity(1)
  }
  return ''
})
Map.onClick(function(coords){
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var bounds = Map.getBounds()
  var width = bounds[2] - bounds[0]
  var scale = Map.getScale() * 22
  var circle = point.buffer(scale, scale/32)  
  circleLayer.setEeObject(circle)
  var viirsWithTime = viirs.map(function(i) {
    var t = i.date().millis()
    i = i.set('t', t)
    return i
  }).sort('system:time_start')
   // fastest way to lookup values
  var lightList = viirsWithTime.map(function(i) {
    var iMean = i.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: circle, 
      scale: Map.getScale() * 10, 
      crs: 'EPSG:4326'  
    })
    return i.set({v: iMean.get('avg_rad')})
  })
  // Add chart
  var chart = ui.Chart.feature.byFeature(
    lightList, 
    'system:time_start', 
    ['v']
  )
  chart.setOptions({
    title: 'Light',
    vAxis: {title: 'Light [nW/cm2/sr]'},
    hAxis: {title: 'Time [year]'},
    lineWidth: 0,
    pointSize: 2,
    trendlines: {0: {}},
    label: 'VIIRS'
  });
  panel.clear();
  panel.add(chart);
})
var borders = {'Borders': [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "0.75"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#192133"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f5ff"
            },
            {
                "weight": "0.5"
            }
        ]
    }
]
}
Map.setOptions('Borders', borders)
// Export.image.toCloudStorage({
//   image: fit, 
//   description: 'viirs-linear-fit', 
//   bucket: 'slr', 
//   fileNamePrefix: 'viirs-fit'
// })