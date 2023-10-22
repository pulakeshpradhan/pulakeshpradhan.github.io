var SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    DarEsSalaam_bounds = ui.import && ui.import("DarEsSalaam_bounds", "table", {
      "id": "users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_bounds"
    }) || ee.FeatureCollection("users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_bounds"),
    DarEsSalaam_DTM = ui.import && ui.import("DarEsSalaam_DTM", "image", {
      "id": "users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_DTM_EPSG32737_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_DTM_EPSG32737_1m"),
    DarEsSalaam_DSM = ui.import && ui.import("DarEsSalaam_DSM", "image", {
      "id": "users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_DSM_EPSG32737_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/DarEsSalaam/DarEsSalaam_DSM_EPSG32737_1m"),
    Pontianak_bounds = ui.import && ui.import("Pontianak_bounds", "table", {
      "id": "users/arjenhaag/ParTerra/Pontianak/Pontianak_bounds"
    }) || ee.FeatureCollection("users/arjenhaag/ParTerra/Pontianak/Pontianak_bounds"),
    Pontianak_DTM = ui.import && ui.import("Pontianak_DTM", "image", {
      "id": "users/arjenhaag/ParTerra/Pontianak/Pontianak_DTM_EPSG32749_5m"
    }) || ee.Image("users/arjenhaag/ParTerra/Pontianak/Pontianak_DTM_EPSG32749_5m"),
    Pontianak_DSM = ui.import && ui.import("Pontianak_DSM", "image", {
      "id": "users/arjenhaag/ParTerra/Pontianak/Pontianak_DSM_EPSG32749_5m"
    }) || ee.Image("users/arjenhaag/ParTerra/Pontianak/Pontianak_DSM_EPSG32749_5m"),
    Amsterdam_bounds = ui.import && ui.import("Amsterdam_bounds", "table", {
      "id": "users/arjenhaag/ParTerra/Amsterdam/Amsterdam_bounds"
    }) || ee.FeatureCollection("users/arjenhaag/ParTerra/Amsterdam/Amsterdam_bounds"),
    Amsterdam_DTM = ui.import && ui.import("Amsterdam_DTM", "image", {
      "id": "users/arjenhaag/ParTerra/Amsterdam/Amsterdam_DTM_EPSG32631_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/Amsterdam/Amsterdam_DTM_EPSG32631_1m"),
    Amsterdam_DSM = ui.import && ui.import("Amsterdam_DSM", "image", {
      "id": "users/arjenhaag/ParTerra/Amsterdam/Amsterdam_DSM_EPSG32631_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/Amsterdam/Amsterdam_DSM_EPSG32631_1m"),
    Ljubljana_bounds = ui.import && ui.import("Ljubljana_bounds", "table", {
      "id": "users/arjenhaag/ParTerra/Ljubljana/Ljubljana_bounds"
    }) || ee.FeatureCollection("users/arjenhaag/ParTerra/Ljubljana/Ljubljana_bounds"),
    Ljubljana_DTM = ui.import && ui.import("Ljubljana_DTM", "image", {
      "id": "users/arjenhaag/ParTerra/Ljubljana/Ljubljana_DTM_EPSG32633_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/Ljubljana/Ljubljana_DTM_EPSG32633_1m"),
    Ljubljana_DSM = ui.import && ui.import("Ljubljana_DSM", "image", {
      "id": "users/arjenhaag/ParTerra/Ljubljana/Ljubljana_DSM_EPSG32633_1m"
    }) || ee.Image("users/arjenhaag/ParTerra/Ljubljana/Ljubljana_DSM_EPSG32633_1m"),
    Venice_bounds = ui.import && ui.import("Venice_bounds", "table", {
      "id": "users/arjenhaag/ParTerra/Venice/Venice_bounds"
    }) || ee.FeatureCollection("users/arjenhaag/ParTerra/Venice/Venice_bounds"),
    Venice_DTM = ui.import && ui.import("Venice_DTM", "image", {
      "id": "users/arjenhaag/ParTerra/Venice/Venice_DTM_EPSG32633_05m"
    }) || ee.Image("users/arjenhaag/ParTerra/Venice/Venice_DTM_EPSG32633_05m"),
    Venice_DSM = ui.import && ui.import("Venice_DSM", "image", {
      "id": "users/arjenhaag/ParTerra/Venice/Venice_DSM_EPSG32633_05m"
    }) || ee.Image("users/arjenhaag/ParTerra/Venice/Venice_DSM_EPSG32633_05m");
// ParTerra (input and output) data visualization
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// data
var data = ee.Dictionary({
  'DarEsSalaam': ee.Dictionary({
    'region':    DarEsSalaam_bounds,
    'DTM':       DarEsSalaam_DTM,
    'DSM':       DarEsSalaam_DSM,
    'version':   0.1,
    'res':       1,
    'area':      40,
    'buildings': 68799,
    'roads':     4427,
    'railways':  39,
    'waterways': 2290,
    'water':     12,
    'min':       -5,
    'max':       45
  }),
  'Pontianak': ee.Dictionary({
    'region':    Pontianak_bounds,
    'DTM':       Pontianak_DTM,
    'DSM':       Pontianak_DSM,
    'version':   0.1,
    'res':       5,
    'area':      3590,
    'buildings': 198831,
    'roads':     8641,
    'railways':  0,
    'waterways': 509,
    'water':     57,
    'min':       -5,
    'max':       20
  }),
  'Amsterdam': ee.Dictionary({
    'region':    Amsterdam_bounds,
    'DTM':       Amsterdam_DTM,
    'DSM':       Amsterdam_DSM,
    'version':   0.1,
    'res':       1,
    'area':      180,
    'buildings': 169890,
    'roads':     42246,
    'railways':  4438,
    'waterways': 1256,
    'water':     4432,
    'min':       -5,
    'max':       20
  }),
  'Ljubljana': ee.Dictionary({
    'region':    Ljubljana_bounds,
    'DTM':       Ljubljana_DTM,
    'DSM':       Ljubljana_DSM,
    'version':   1.0,
    'res':       1,
    'area':      10,
    'buildings': 4129,
    'roads':     2762,
    'railways':  154,
    'waterways': 23,
    'water':     8,
    'min':       275,
    'max':       375
  }),
  'Venice': ee.Dictionary({
    'region':    Venice_bounds,
    'DTM':       Venice_DTM,
    'DSM':       Venice_DSM,
    'version':   0.1,
    'res':       0.5,
    'area':      18,
    'buildings': 6279,
    'roads':     6340,
    'railways':  162,
    'waterways': 256,
    'water':     175,
    'min':       -3,
    'max':       10
  })
});
var bounds_all    = DarEsSalaam_bounds.merge(Pontianak_bounds).merge(Amsterdam_bounds).merge(Ljubljana_bounds).merge(Venice_bounds);
// visual parameters
var DEM_min       = 0;
var DEM_max       = 1000;
var DEM_colours   = ['blue', 'green', 'yellow', 'red', 'white'];
var visParams_DEM = {min:DEM_min, max:DEM_max, palette:DEM_colours};
// ----------------------------------------------------------------------------------------- //
// Functions
// ----------------------------------------------------------------------------------------- //
// remove layer from map
function clearLayer(name) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == name) {
      Map.layers().remove(layer);
    }
  });
}
// hillshading
function radians(img) {
  return img.toFloat().multiply(3.1415927).divide(180);
}
function calcHillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
function applyHillshade(image, min, max, azimuth, zenith, weight, height_multiplier) {
  // default parameters
  if (typeof min == 'undefined') azimuth = DEM_min;
  if (typeof max == 'undefined') azimuth = DEM_max;
  if (typeof azimuth == 'undefined') azimuth = 90;
  if (typeof zenith == 'undefined') zenith = 60;
  if (typeof weight == 'undefined') weight = 2;
  if (typeof height_multiplier == 'undefined') height_multiplier = 1;
  // function
  var image_rgb = image.visualize({min:min, max:max, palette:DEM_colours, forceRgbOutput:true});
  var hsv       = image_rgb.unitScale(0, 255).rgbToHsv();
  var terrain   = ee.call('Terrain', image.multiply(height_multiplier));
  var slope     = radians(terrain.select(['slope']));
  var aspect    = radians(terrain.select(['aspect']));
  var hs        = calcHillshade(azimuth, zenith, slope, aspect);
  var intensity = hs.multiply(weight).multiply(hsv.select('value'));
  var huesat    = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
function createLegend(params) {
  var legend = ui.Panel([
    ui.Label('Legend', {fontWeight: 'bold', fontSize: '16px'}),
    ui.Label('elevation (m)', {fontSize: '14px'}),
    ], ui.Panel.Layout.flow('vertical'), {position: 'bottom-left'}
  );
  var legend_count = params.palette.length;
  var legend_steps = (params.max-params.min)/(legend_count-1);
  for (var i=0; i<legend_count; i++) {
    var label_1 = ui.Label({style:{
      backgroundColor:params.palette[i],
      border:'1px solid black',
      padding:'8px',
      margin:'7px 0px 0px 8px'
    }});
    var label_2 = ui.Label(String(params.min+i*legend_steps));
    var panel = ui.Panel([label_1, label_2], ui.Panel.Layout.Flow('horizontal'));
    legend.add(panel);
  }
  legend_panel.add(legend);
  // return legend;
}
// update all elements based on selected region
function updateSelection() {
  // clear legend
  legend_panel.clear();
  // clear analysis panel
  // analyser_version.setValue('calculating...');
  analyser_res.setValue('calculating...');
  analyser_area.setValue('calculating...');
  analyser_buildings.setValue('calculating...');
  analyser_roads.setValue('calculating...');
  analyser_railways.setValue('calculating...');
  analyser_waterways.setValue('calculating...');
  analyser_water.setValue('calculating...');
  // clear map
  Map.clear();
  // clearLayer('region');
  // clearLayer('buildings');
  // clearLayer('waterways');
  // clearLayer('water polygons');
  // clearLayer('roads');
  // clearLayer('railways');
  // clearLayer('DTM');
  // clearLayer('DSM');
  // get region from selector
  var region_string = selector.getValue();
  region_string     = ee.String(ee.List(region_string.split('(')).get(0)).trim().replace(' ', '', 'g');
  var region_data   = ee.Dictionary(data.get(region_string));
  var region        = ee.FeatureCollection(region_data.get('region'));
  // get DEMs
  var DTM           = ee.Image(region_data.get('DTM'));
  var DSM           = ee.Image(region_data.get('DSM'));
  // get pre-set min/max for DEMs
  var region_min    = region_data.get('min');
  var region_max    = region_data.get('max');
  // get features
  // var buildings     = buildings_all.filterBounds(region.geometry());
  // var waterways     = waterways_all.filterBounds(region.geometry());
  // var water         = water_all.filterBounds(region.geometry());
  // var roads         = roads_all.filterBounds(region.geometry());
  // var railways      = railways_all.filterBounds(region.geometry());
  // update analysis
  // region_data.get('version').evaluate(function(result) {
  //   analyser_version.setValue(result);
  // });
  region_data.get('area').evaluate(function(result) {
    analyser_area.setValue(result);
  });
  region_data.get('buildings').evaluate(function(result) {
    analyser_buildings.setValue(result);
  });
  region_data.get('roads').evaluate(function(result) {
    analyser_roads.setValue(result);
  });
  region_data.get('railways').evaluate(function(result) {
    analyser_railways.setValue(result);
  });
  region_data.get('waterways').evaluate(function(result) {
    analyser_waterways.setValue(result);
  });
  region_data.get('water').evaluate(function(result) {
    analyser_water.setValue(result);
  });
  region_data.get('res').evaluate(function(result) {
    analyser_res.setValue(result);
  });
  // update legend
  createLegend({min:region_min.getInfo(), max:region_max.getInfo(), palette:DEM_colours});
  // update map
  Map.centerObject(region, 14);
  // Map.addLayer(SRTM, visParams_DEM, 'SRTM', false);
  Map.addLayer(applyHillshade(SRTM, region_min, region_max), {}, 'SRTM', true);
  // Map.addLayer(DTM, visParams_DEM, 'DTM', false);
  // Map.addLayer(DSM, visParams_DEM, 'DSM', false);
  Map.addLayer(applyHillshade(DTM, region_min, region_max), {}, 'DTM', true);
  Map.addLayer(applyHillshade(DSM, region_min, region_max), {}, 'DSM', true);
  // Map.addLayer(buildings, {}, 'OSM buildings', false);
  // Map.addLayer(water, {color:'blue'}, 'OSM water polygons', false);
  // Map.addLayer(waterways, {color:'blue'}, 'OSM waterways', false);
  // Map.addLayer(roads, {color:'red'}, 'OSM roads', false);
  // Map.addLayer(railways, {color:'black'}, 'OSM railways', false);
  Map.addLayer(ee.Image().byte().paint(region, 0, 2), {}, 'region', true);
}
// ----------------------------------------------------------------------------------------- //
// User Interface
// ----------------------------------------------------------------------------------------- //
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'ParTerra Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  // intro text(s)
  ui.Label({
    value: "WORK-IN-PROGRESS",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  }),
  ui.Label({
    value: "The Participatory Terrain model (ParTerra) fuses together data from OpenStreetMaps (OSM) \
            and a base Digital Elevation Model (DEM), which by default is the Shuttle Radar Topography Mission (SRTM) DEM.",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  }),
  ui.Label({
    value: "This app allows for a quick inspection of input and output data for some regions for which \
            preliminary results have already been obtained.",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  })
]);
// region selector
var selector = ui.Select({
  items: ['Amsterdam (Netherlands)', 'Ljubljana (Slovenia)', 'Venice (Italy)','Dar Es Salaam (Tanzania)', 'Pontianak (Indonesia)'],
  placeholder: 'Select a region',
  // value: ,
  onChange: updateSelection,
  // disabled: ,
  style: {width: '200px'}
});
var selector_panel = ui.Panel([
  ui.Label({value: 'Region selection:', style: {fontWeight: 'bold'}}),
  selector
]);
// region analysis
// var analyser_version   = ui.Label('');
var analyser_res       = ui.Label('');
var analyser_area      = ui.Label('');
var analyser_buildings = ui.Label('');
var analyser_roads     = ui.Label('');
var analyser_railways  = ui.Label('');
var analyser_waterways = ui.Label('');
var analyser_water     = ui.Label('');
var analyser_panel = ui.Panel([
  ui.Panel([
    // ui.Label('Version:'),
    ui.Label('Resolution (m):'),
    ui.Label('Area (km2):'),
    ui.Label('Buildings:'),
    ui.Label('Roads:'),
    ui.Label('Railways:'),
    ui.Label('Waterways:'),
    ui.Label('Water polygons:')
  ]),
  ui.Panel([
    // analyser_version,
    analyser_res,
    analyser_area,
    analyser_buildings,
    analyser_roads,
    analyser_railways,
    analyser_waterways,
    analyser_water
  ])
], ui.Panel.Layout.flow('horizontal'));
var legend_panel = ui.Panel([]);
// panel combining all UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, selector_panel, analyser_panel, legend_panel],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '250px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
var points_all = bounds_all.map(function(f) {
  return f.geometry().centroid();
});
Map.centerObject(bounds_all);
// Map.addLayer(SRTM, visParams_DEM, 'SRTM', false);
Map.addLayer(applyHillshade(SRTM, DEM_min, DEM_max), {opacity:0.25}, 'SRTM', true);
Map.addLayer(points_all, {color:'red'}, 'regions', true);
createLegend(visParams_DEM);