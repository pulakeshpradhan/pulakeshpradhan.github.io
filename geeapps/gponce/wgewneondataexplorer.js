var neon_srer_hs = ui.import && ui.import("neon_srer_hs", "imageCollection", {
      "id": "users/gponce/usda_ars/image_collections/neon_srer_2017_hs"
    }) || ee.ImageCollection("users/gponce/usda_ars/image_collections/neon_srer_2017_hs"),
    rgb10cm_srer = ui.import && ui.import("rgb10cm_srer", "imageCollection", {
      "id": "users/gponce/usda_ars/image_collections/neon_srer_2017_rgb"
    }) || ee.ImageCollection("users/gponce/usda_ars/image_collections/neon_srer_2017_rgb"),
    ltar_sites = ui.import && ui.import("ltar_sites", "table", {
      "id": "users/gponce/usda_ars/shapefiles/LTAR/ltar_boundaries"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/LTAR/ltar_boundaries"),
    wgew = ui.import && ui.import("wgew", "table", {
      "id": "users/gponce/usda_ars/shapefiles/WGEW/wgew_shp"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/WGEW/wgew_shp"),
    neon_wgew_2018_hs = ui.import && ui.import("neon_wgew_2018_hs", "imageCollection", {
      "id": "users/gponce/usda_ars/wgew_neon_2018/L3/reflectances/neon_wgew_2018_hs"
    }) || ee.ImageCollection("users/gponce/usda_ars/wgew_neon_2018/L3/reflectances/neon_wgew_2018_hs"),
    rgb10cm_wgew = ui.import && ui.import("rgb10cm_wgew", "imageCollection", {
      "id": "users/gponce/usda_ars/wgew_neon_2018/L3/camera/neon_wgew_2018_rgb"
    }) || ee.ImageCollection("users/gponce/usda_ars/wgew_neon_2018/L3/camera/neon_wgew_2018_rgb");
//# *** NEON-SRER-2017 hyperspectral data explorer *** 
//# USDA-ARS-SWRC, 2018
//# Contact info: 
//# Guillermo Ponce <geponce@arizona.edu>
// Center and zoom
Map.centerObject(wgew,11)
// Get site boundaries
var site = wgew// ltar_sites.filter(ee.Filter.eq('acronym','WGEW'));
// RGB 10 cm
var rgb_img = rgb10cm_wgew;
// Hyperspectral 1m
var hs_img = neon_wgew_2018_hs;
// Title 
 var v_title = 'NEON-WGEW-2018 Hyperspectral Data Explorer';
 //'NEON-SRER-2017 Hyperspectral Data Explorer'
var v_site = 'WGEW';
// Load 10cm image for reference
var rgb_10cm_site = rgb_img.mosaic();
rgb_10cm_site = rgb_10cm_site.updateMask(rgb_10cm_site.neq(0));
// Set hyperspectral bands to use
var falseColor_NIR = ['b90','b34','b19'];
var naturalColor = ['b58','b33','b19'];
var ndvi_bands = ['b90','b58'];
// Get NDVI
var ndvi = hs_img.map(function (img) {
          return img.select(ndvi_bands);
        }).mosaic().divide(10000).normalizedDifference(ndvi_bands);
// Create FalseColor-NIR
var map_nirfc = hs_img.map(function (img) {
          return img.select(falseColor_NIR);
  }).mosaic().divide(10000);
// Create RGB
var map_rgb= hs_img.map(function (img) {
          return img.select(naturalColor)
  }).mosaic().divide(10000)
// Create image with all bands to create plot
var blist = ee.List.sequence(1,426)
var bd = blist.map(function (e) {
      return ee.String("b").cat(ee.String(ee.Number(e).toInt()))
  })  
var img_all = hs_img.map(function (img) {
          return img.select(bd).divide(10000)
  }).mosaic()
// Get image to get grid polygon
var img =  ee.Image(img_all.select('b1').clip(wgew)).setDefaultProjection({
  crs: 'EPSG:4326',
  scale: 1
})
// Map.addLayer(img,{},"ForGrid")
var aSeed = ee.Image.pixelCoordinates(img.projection()).int32().add(2147483648).uint32()
var aSeed1 = aSeed.select(0).bitwiseAnd(65535).leftShift(16).add(aSeed.select(1).bitwiseAnd(65535)).select(['x']).clip(wgew)
// Show grid 
var i =aSeed1.addBands(img).reduceToVectors({
  geometry: wgew,
  crs: img.projection(),
  scale: img.projection().nominalScale(),
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean(),
  maxPixels:1e13,
  geometryInNativeProjection: true
});
var poly = ee.Image().toByte()
                  .paint(i, 3,1);
// Map.addLayer(poly,{
// //       palette: 'ff3333,FF0000,000000,0000FF,32CD32,FFFFFF,FFFF00',
// //       max: 3,
// //       opacity: 0.9
//   },"GRID-Polygons-WGS84", true)
// Set chart options
// Set chart options
//var wavelengths = [] // For labeling Wavelengths
//for (var i = 381; i <= 2510; i += 5) wavelengths.push(i)
var wavelengths = ee.List.sequence(381, 2510, 5).getInfo()
// print(wl2)
// print(wavelengths)
var bands_no =  ee.List.sequence(1, 426).getInfo() 
//var bands_no = [];
//for (var i = 1; i < 427; ++i) bands_no.push(i)
// Create a panel to hold widgets.
var panel = ui.Panel();
panel.style().set('width', '800px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: v_title,
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on the image area for pixel inspection.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(5, dot);
  // Create spectral by wavelength chart.
  var hsChart = ui.Chart.image.regions({
    image: img_all,
    regions: point,
    reducer: ee.Reducer.mean(),
    scale: 1,
    xLabels: wavelengths
    }).setSeriesNames(['Spectral signature for pixel Lon:'+coords.lon.toFixed(2)+' Lat:'+coords.lat.toFixed(2)]);
  hsChart.setOptions({
    title: v_title + ' (λ)',
    vAxis: {title: 'Reflectance',
            viewWindow: {
                min: 0,
                max: 1}
           },
    hAxis: {title: 'λ(nm)', 
            gridlines: {count: 10},
    }
  });
  panel.widgets().set(2, hsChart);
  var hsChart2 = ui.Chart.image.regions({
    image: img_all,
    regions: point,
    reducer: ee.Reducer.mean(),
    scale: 1,
    xLabels: bands_no
    }).setSeriesNames(['Spectral signature for pixel Lon:'+coords.lon.toFixed(2)+' Lat:'+coords.lat.toFixed(2)]);
  hsChart2.setOptions({
    title: v_title + ' (band #)',
    vAxis: {title: 'Reflectance',
            viewWindow: {
                min: 0,
                max: 1}
           },
    hAxis: {title: 'Bands', 
            gridlines: {count: 10}
    }
  });
  panel.widgets().set(3, hsChart2);
});
Map.style().set('cursor', 'crosshair');
// Adding Maps
var palette_ndvi = "61150D,6A2515,74361D,7E4625,87572D,916835,9B783D,A58945,AE9A4D,B8AA55,C2BB5D,CCCC66,BABF5E,A9B356,98A74E,879A46,768E3E,658237,54762F,436927,325D1F,215117,104510"; //From ESRI
// Display RGB 10cm
Map.addLayer(rgb_10cm_site,{},'CameraRGB_10cm',true)
// Display NDVI from Hyperspectral 1m
Map.addLayer(ndvi, {min:0, max:0.8, palette:palette_ndvi}, 'NDVI_1m_HS',false)
// Display false-color NIR from Hyperspectral 1m
Map.addLayer(map_nirfc.visualize({min: [0, 0, 0], max: [0.3, 0.2, 0.2], gamma:1.6}),{},'FalseColor-NIR_1m_HS',false)
// Display natural-color RGB from Hyperspectral 1m
Map.addLayer(map_rgb, {bands: naturalColor, min:0, max:0.3, gamma:1.6},'NaturalColor-RGB_1m_HS',false);
// Add SRER Boundary
Map.addLayer(site.style({
                    color: "FFFF00",  // Line color
                    width: 3,
                    fillColor: "FFFF0000"}),{},v_site)
// Enable the left panel
ui.root.insert(0, panel);