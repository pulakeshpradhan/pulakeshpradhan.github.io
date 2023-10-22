var mag_vis = ui.import && ui.import("mag_vis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -0.8956479430198669,
        "max": -0.07354098558425903,
        "palette": [
          "ff0000",
          "ffac44",
          "4cfeff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-0.8956479430198669,"max":-0.07354098558425903,"palette":["ff0000","ffac44","4cfeff"]},
    date_vis = ui.import && ui.import("date_vis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 1999366.25,
        "max": 2018109.5,
        "palette": [
          "ff2805",
          "ffb819",
          "29ff0f",
          "11ffde",
          "0781ff",
          "a413ff",
          "ff50a0"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":1999366.25,"max":2018109.5,"palette":["ff2805","ffb819","29ff0f","11ffde","0781ff","a413ff","ff50a0"]},
    date_bfast = ui.import && ui.import("date_bfast", "image", {
      "id": "users/murillop/date_filtered_0"
    }) || ee.Image("users/murillop/date_filtered_0"),
    mag_bfast = ui.import && ui.import("mag_bfast", "image", {
      "id": "users/murillop/magnitude_0"
    }) || ee.Image("users/murillop/magnitude_0"),
    wrs = ui.import && ui.import("wrs", "fusionTable", {
      "docId": "1_RZgjlcqixp-L9hyS6NYGqLaKOlnhSC35AB5M5Ll"
    }) || ee.FeatureCollection("ft:1_RZgjlcqixp-L9hyS6NYGqLaKOlnhSC35AB5M5Ll"),
    value_vis = ui.import && ui.import("value_vis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -0.5697118639945984,
        "max": -0.05,
        "palette": [
          "ff5725",
          "ffc933",
          "11ff65",
          "11fff4",
          "1f3aff",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-0.5697118639945984,"max":-0.05,"palette":["ff5725","ffc933","11ff65","11fff4","1f3aff","ffffff"]},
    table = ui.import && ui.import("table", "table", {
      "id": "users/murillop/COL_cartography/municipios"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/municipios"),
    departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/murillop/COL_cartography/departamentos"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/departamentos"),
    sentinel = ui.import && ui.import("sentinel", "image", {
      "id": "users/murillop/Amazon-Andes/sentinel2018"
    }) || ee.Image("users/murillop/Amazon-Andes/sentinel2018"),
    VIS = ui.import && ui.import("VIS", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "yod"
        ],
        "min": 2000,
        "max": 2018,
        "palette": [
          "ff792b",
          "d4ff2b",
          "3cff66",
          "348eff",
          "f22bff",
          "ff2154"
        ]
      }
    }) || {"opacity":1,"bands":["yod"],"min":2000,"max":2018,"palette":["ff792b","d4ff2b","3cff66","348eff","f22bff","ff2154"]},
    dates = ui.import && ui.import("dates", "image", {
      "id": "users/murillop/Amazon-Andes/date_full"
    }) || ee.Image("users/murillop/Amazon-Andes/date_full"),
    landtrendr_1987_2018 = ui.import && ui.import("landtrendr_1987_2018", "image", {
      "id": "users/murillop/LandTrendR/pica_lt_1987-2018"
    }) || ee.Image("users/murillop/LandTrendR/pica_lt_1987-2018"),
    coded = ui.import && ui.import("coded", "image", {
      "id": "users/murillop/CODED/picatinimaca_1987_2018"
    }) || ee.Image("users/murillop/CODED/picatinimaca_1987_2018"),
    landtrendr_1990_2018_ndmi = ui.import && ui.import("landtrendr_1990_2018_ndmi", "image", {
      "id": "users/murillop/LandTrendR/lt_disturbance_amazon_NDMI_1990_2018"
    }) || ee.Image("users/murillop/LandTrendR/lt_disturbance_amazon_NDMI_1990_2018"),
    PA5 = ui.import && ui.import("PA5", "table", {
      "id": "users/murillop/COL_cartography/PA_5"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/PA_5"),
    nita_date = ui.import && ui.import("nita_date", "image", {
      "id": "users/murillop/NITA/distdate_AMEN_"
    }) || ee.Image("users/murillop/NITA/distdate_AMEN_"),
    nita_mag = ui.import && ui.import("nita_mag", "image", {
      "id": "users/murillop/NITA/dist_mag_AMEN_"
    }) || ee.Image("users/murillop/NITA/dist_mag_AMEN_"),
    coca = ui.import && ui.import("coca", "table", {
      "id": "users/murillop/NITA_paper_Mike/coca_2009_2018_clip_AMEM"
    }) || ee.FeatureCollection("users/murillop/NITA_paper_Mike/coca_2009_2018_clip_AMEM"),
    pastures = ui.import && ui.import("pastures", "table", {
      "id": "users/murillop/NITA_paper_Mike/pastures_2018_CLC_AMEM"
    }) || ee.FeatureCollection("users/murillop/NITA_paper_Mike/pastures_2018_CLC_AMEM");
var Aubergine= 
[
  {
    "elementType": "geometry", 
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
var GRAYMAP = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
//COCA AND CATTLE
var pasture_CLC = ee.Image().byte().paint(pastures, "LEYENDA3N") 
pasture_CLC = pasture_CLC.remap([0],[2]).rename("class");
Map.addLayer(pasture_CLC,{palette:'blue'},'Pasture/Cattle in 2018');
//Sampling coca
var coca_per_year = ee.Image().byte().paint(coca, "ano").rename('year'); // stratified per year could be complicated because coca shape can 
var coca_all_years = coca_per_year.gt(2009).updateMask(coca_per_year.gt(2009)).rename('class'); // coca =1
Map.addLayer(coca_all_years,{palette:'black'},'coca 2010-2018');
/////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////Geometries///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
var color = ['a6cee3','1f78b4','b2df8a','33a02c','fb9a99','e31a1c','fdbf6f','ff7f00','2510d6']; 
var parks = PA5.filter(ee.Filter.inList('nombre', ['Cordillera de los Picachos', 'Tinigua', 'Sierra de la Macarena']))
////////////////////////////////////////////////////////////////////////////POLYGONS/////////////////////////////////////
//Map.addLayer(departamentos, {}, 'Departamentos')
// Define a spatial filter as geometries that intersect.
var spatialFilter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 10
});
// Define a save all join.
var saveAllJoin = ee.Join.saveAll({
  matchesKey: 'scenes',
});
// Apply the join.
var intersectJoined = saveAllJoin.apply(parks, wrs, spatialFilter);
// Get the result and display it.
var intersected = ee.FeatureCollection(ee.List(intersectJoined.first().get('scenes')));
//Map.centerObject(geometry);
//Map.addLayer(intersected, {}, 'WRS-2 polygons');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var tiles = empty.paint({
  featureCollection: intersected,
  color: 'path',
  width: 1
});
Map.addLayer(tiles, {}, 'tiles', false);
var parks_union = parks.union().geometry().simplify(1000)
Map.centerObject(parks_union,9)
var park_border = empty.paint({
  featureCollection: parks_union,
  color: 'path',
  width: 1
});
Map.addLayer(park_border, {}, 'Parks');
/////////////////////////////////////////////////////NITA OUTPUTS FOR 1985-2018 Landsat data////////////////////////
//VEGETATION INDEX INPUT = NDMI
//Detect disturbance: end
// //NITA
var nita_mag1=nita_mag.updateMask(nita_mag.lt(-0.20)).clip(parks_union)
//Map.addLayer(nita_mag1)
var nita_dates1 = nita_date.clip(parks_union).divide(1000).int()
var nita_dates1 = nita_dates1.updateMask(nita_dates1.gt(2009))
var nita_dates1 = nita_dates1.updateMask(nita_mag1.lt(-0.18))
Map.addLayer(nita_dates1,  {min:2010, max:2018, palette:color}, 'NITA_YoD_2010_2018');
////////////////////////////////////////////////////Landtrendr-NDMI 1987-2018/////////////////////////////////
var landt = landtrendr_1990_2018_ndmi.updateMask(landtrendr_1990_2018_ndmi.gt(2009)).clip(parks_union);
Map.addLayer(landt.select('yod'), {min:2010, max:2018, palette:color}, 'LANDTRENDR_YoD_2010_2018');
/////////////////////////////////////////////////////////BfastSpatial/////////////////////////////////////////////////
var b1 = ee.Image(dates.select('a').int().rename('first'))
var b2 = ee.Image(dates.select('b').int().rename('first'))
var b3 = ee.Image(dates.select('c').int().rename('first'))
var b4 = ee.Image(dates.select('d').int().rename('first'))
var b5 = ee.Image(dates.select('e').int().rename('first'))
var b6 = ee.Image(dates.select('f').int().rename('first'))
var b7 = ee.Image(dates.select('g').int().rename('first'))
var b8 = ee.Image(dates.select('h').int().rename('first'))
var b9 = ee.Image(dates.select('i').int().rename('first'))
var combo = ee.ImageCollection([b1,b2,b3,b4,b5,b6,b7,b8,b9])
var combo = combo.max().clip(parks_union)
Map.addLayer(combo, {min:2010, max:2018, palette:color}, 'BFAST_YoD_2010_2018')
/////////////////////////////////////////////////////CODED///////////////////////////////////////////////////
function makeMask(input, minSize) {
  // Return a mask for patches greater than minSize
  var minPatches = input.connectedPixelCount(10, true)
                      .gte(10)
  return minPatches
}
var minSizeMask = makeMask(coded.select('dist_1').gt(0), 10)
// Degradation is where the post-disturbance land cover equals the forest label
var degradation = coded.select('post_1').eq(1)
                      .updateMask(minSizeMask)
// Deforestation is defined as a disturbance that results in a change in land cover
var deforestation = coded.select('post_1').gt(1)
                        .updateMask(minSizeMask)
// MAGNITUDE
var mag = coded.select('mag_1').updateMask(coded.select('mag_1').gt(10))       
// Map.addLayer(mag, {min: 10,  max: 200, 
//                             palette: ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']}, 
//                             'Change magnitude MASK').setShown(1)
// Map.addLayer(coded.select('mag_1'), {min: 10,  max: 200, 
//                             palette: ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']}, 
//                             'Change magnitude').setShown(1)                       
// Dates of change
var changeDate = coded.select('dist_1').updateMask(mag)
                    .updateMask(minSizeMask).updateMask(coded.select('dist_1').gt(2009)).clip(parks_union)
Map.addLayer(changeDate, {min:2010, max:2018, palette:color}, 'CODED_YoD_2010_2018')
var gonzalo = coded.select('dist_1').updateMask(mag)
                    .updateMask(minSizeMask).clip(parks_union)
//Map.addLayer(gonzalo, {min:1987, max:2018, palette:color}, 'gonzalo')
Export.image.toDrive({image:gonzalo,
                      scale:30,
                      folder:'gonzalo',
                      description:'CODED_distrubances88_18'
})
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//  Compute the histogram of the disturbance date coded
var coded_histo = changeDate.reduceRegion({
  reducer: ee.Reducer.histogram({maxBuckets: 9, minBucketWidth:1,  maxRaw : 9}),   //  reducer: ee.Reducer.histogram({minBucketWidth: 0.1}), // 10 dates per year :)  or .25 for 4!!!
  scale: 30,
  geometry: parks_union,
  maxPixels: 1e13
});
//print (coded_histo)
var h = ee.Dictionary(coded_histo.get('dist_1')).get('histogram')
var x = ee.Dictionary(coded_histo.get('dist_1')).get('bucketMeans')
var x = ee.List(x).map(function(v) {return ee.String(v)})
// var hhh = ui.Chart.image.histogram(changeDate, parks_union,30 );
// print (hhh)
//  Compute the histogram of the disturbance date BFAST
var bfast_histo = combo.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: parks_union,
  maxPixels: 1e13
});
var h1 = ee.Dictionary(bfast_histo.get('first')).get('histogram')
var x1 = ee.Dictionary(bfast_histo.get('first')).get('bucketMeans')
x1 = ee.List(x1).map(function(v) {return ee.String(v)})
//  Compute the histogram of the disturbance date LANDTRENDR
var lt_histo = landt.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: parks_union,
  maxPixels: 1e13
});
var h2 = ee.Dictionary(lt_histo.get('yod')).get('histogram')
var x2 = ee.Dictionary(lt_histo.get('yod')).get('bucketMeans')
x2 = ee.List(x2).map(function(v) {return ee.String(v)})
//  Compute the histogram of the disturbance date NITA
var nita_histo = nita_dates1.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: parks_union,
  maxPixels: 1e13
});
var h3 = ee.Dictionary(nita_histo.get('b1')).get('histogram')
var x3 = ee.Dictionary(nita_histo.get('b1')).get('bucketMeans')
x3 = ee.List(x3).map(function(v) {return ee.String(v)})
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
//panel.style().set({position: 'bottom-right'});
//panel.style().set('backgroundColor', '#fa9fb5');
panel.style().set('width', '650px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Forest disturbances 2010-2018',
    style: {fontSize: '20px', fontWeight: 'bold', color: '1f78b4', position: 'bottom-right' }//) , backgroundColor: '#225ea8'}
  }),
  ui.Label({
    value: 'Temporal profiles using 4 algorithms',
    style: {fontSize: '12px', fontWeight: 'bold', color: '1f78b4', position: 'bottom-right'}//, backgroundColor: '#225ea8'}
  })
]);
panel.add(intro);
 // CODED
var c1 = ui.Chart.array.values(h, 0, x)
                .setChartType('ColumnChart')
  c1.setOptions({
    title: 'CODED',
    legend: { position: "none" },
    colors: ['#1f78b4'],
    //backgroundColor: '#deebf7',
    height:150,
    chartArea: {top: 30, bottom: 10}, 
    vAxis: {title: 'Disturbance (pixels)', maxValue: 1},
    hAxis: {title: 'time', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, c1);
  // // BFAST
var c2 = ui.Chart.array.values(h1, 0, x1)
                .setChartType('ColumnChart')
  c2.setOptions({
    title: 'BFAST',
    legend: { position: "none" },
    colors: ['#1f78b4'],
    //backgroundColor: '#deebf7',
    height:150,
    chartArea: {top: 30, bottom: 10}, 
    vAxis: {title: 'Disturbance (pixels)', maxValue: 1},
    hAxis: {title: 'time', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, c2);
  // // LANDTRENDR
var c3 = ui.Chart.array.values(h2, 0, x2)
                .setChartType('ColumnChart')
  c3.setOptions({
    title: 'LANDTRENDR',
    legend: { position: "none" },
    colors: ['#1f78b4'],
    //backgroundColor: '#deebf7',
    height:150,
    chartArea: {top: 30, bottom: 10}, 
    vAxis: {title: 'Disturbance (pixels)', maxValue: 1},
    hAxis: {title: 'time', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, c3);
  // // NITA
var c4 = ui.Chart.array.values(h3, 0, x3)
                .setChartType('ColumnChart')
  c4.setOptions({
    title: 'NITA',
    legend: { position: "none" },
    colors: ['#1f78b4'],
    //backgroundColor: '#deebf7',
    height:150,
    chartArea: {top: 30, bottom: 10}, 
    vAxis: {title: 'Disturbance (pixels)', maxValue: 1},
    hAxis: {title: 'time', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(4, c4);
// Legend
var legend = ui.Panel({style: {shown: false, width: '150px'}});
legend.style().set({position: 'bottom-right'});
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});
legendMaps.style().set({position: 'bottom-right'});
legendMaps.add(ui.Label('Disturbance Year'));
legendMaps.add(makeRow('#a6cee3', '2010'));
legendMaps.add(makeRow('#1f78b4', '2011'));
legendMaps.add(makeRow('#b2df8a', '2012'));
legendMaps.add(makeRow('#33a02c', '2013'));
legendMaps.add(makeRow('#fb9a99', '2014'));
legendMaps.add(makeRow('#e31a1c', '2015'));
legendMaps.add(makeRow('#fdbf6f', '2016'));
legendMaps.add(makeRow('#ff7f00', '2017'));
legendMaps.add(makeRow('#2510d6', '2018'));
// Set up display
Map.setOptions('GRAYMAP', {'GRAYMAP': GRAYMAP}).setControlVisibility(false, true, true, true, true, false)
Map.style().set('cursor', 'crosshair');
//Map.setOptions('TERRAIN');
// Add the panels to the ui.root.
Map.add(legend)
Map.add(legendMaps)
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var nita_xxx = nita_date.clip(parks_union).divide(1000).int()  
//var nita_mag1=nita_mag.updateMask(nita_mag.lt(-0.18)).clip(parks_union)
var nita_xxx = nita_xxx.updateMask(nita_mag1.lt(-0.18))//.updateMask(nita_xxx.lt(1999)) //to plot from 1986 to 1998
  // Compute the histogram of the disturbance date
var nita_test = nita_xxx.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: parks_union,
  maxPixels: 1e13
});
print(nita_test, 'histogram')
var h = ee.Dictionary(nita_test.get('b1')).get('histogram')
var x = ee.Dictionary(nita_test.get('b1')).get('bucketMeans')
x = ee.List(x).map(function(v) {return ee.String(v)})
var c = ui.Chart.array.values(h, 0, x)
                .setChartType('ColumnChart')
print(c)
// var forested = ui.Chart.array.values(h, 0, x)
//                 .setChartType('ColumnChart')
//   forested.setOptions({
//     title: 'Example stable-forest pixel',
//     colors: ['#0ed642'],
//     backgroundColor: '#deebf7',
//     height:150,
//     chartArea: {top: 30, bottom: 10}, 
//     vAxis: {title: 'Vegetation Fraction', maxValue: 1},
//     hAxis: {title: 'time', format: 'MM-yy', gridlines: {count: 7}},
//   });
  //print (forested)
  //panel.widgets().set(3, forested);