var AoI = ui.import && ui.import("AoI", "table", {
      "id": "users/arjenhaag/EthiopiaFloods2020/AwashRiverBasin_simplified"
    }) || ee.FeatureCollection("users/arjenhaag/EthiopiaFloods2020/AwashRiverBasin_simplified"),
    Weredas = ui.import && ui.import("Weredas", "table", {
      "id": "users/arjenhaag/EthiopiaFloods2020/aw_Weredas_2016"
    }) || ee.FeatureCollection("users/arjenhaag/EthiopiaFloods2020/aw_Weredas_2016"),
    basins = ui.import && ui.import("basins", "table", {
      "id": "users/arjenhaag/EthiopiaFloods2020/sub_basins"
    }) || ee.FeatureCollection("users/arjenhaag/EthiopiaFloods2020/sub_basins"),
    water = ui.import && ui.import("water", "imageCollection", {
      "id": "users/arjenhaag/EthiopiaFloods2020/water_monthly_final"
    }) || ee.ImageCollection("users/arjenhaag/EthiopiaFloods2020/water_monthly_final"),
    water_mode = ui.import && ui.import("water_mode", "imageCollection", {
      "id": "users/arjenhaag/EthiopiaFloods2020/water_monthly_final_mode"
    }) || ee.ImageCollection("users/arjenhaag/EthiopiaFloods2020/water_monthly_final_mode"),
    builtup_mask = ui.import && ui.import("builtup_mask", "image", {
      "id": "users/arjenhaag/EthiopiaFloods2020/builtup_mask"
    }) || ee.Image("users/arjenhaag/EthiopiaFloods2020/builtup_mask"),
    WorldCover = ui.import && ui.import("WorldCover", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100"),
    WorldPop = ui.import && ui.import("WorldPop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    roads = ui.import && ui.import("roads", "table", {
      "id": "users/arjenhaag/EthiopiaFloods2020/roads_GRIP4"
    }) || ee.FeatureCollection("users/arjenhaag/EthiopiaFloods2020/roads_GRIP4"),
    buildings = ui.import && ui.import("buildings", "table", {
      "id": "users/arjenhaag/EthiopiaFloods2020/buildings_OSM"
    }) || ee.FeatureCollection("users/arjenhaag/EthiopiaFloods2020/buildings_OSM");
// Awash River Basin floods 2020
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// water maps spatial resolution
var res = 10;
// landcover processing and visualization
// var lc_remap_in = [10,20,30,40,50,60,70,80,90,95,100];
// var lc_remap_out = [1,2,3,4,5,6,7,8,9,10,11];
// var lc_names  = ["Trees","Shrubland","Grassland","Cropland","Built-up","Barren / sparse vegetation","Snow and ice","Open water","Herbaceous wetland","Mangroves","Moss and lichen"];
// var lc_colors = ["#006400","#ffbb22","#ffff4c","#f096ff","#fa0000","#b4b4b4","#f0f0f0","#0064c8","#0096a0","#00cf75","#fae6a0"];
var lc_remap_in = [10,20,30,40,50,60,80,90];
var lc_remap_out = [1,2,3,4,5,6,7,8];
var lc_names  = ["Trees","Shrubland","Grassland","Cropland","Built-up","Barren / sparse vegetation","Open water","Herbaceous wetland"];
var lc_colors = ["#006400","#ffbb22","#ffff4c","#f096ff","#fa0000","#b4b4b4","#0064c8","#0096a0"];
// population processing and visualization
var pop_thresh = 10;
// visual parameters
var visParams_water = {min:0, max:3, palette:['white','blue','green','red']};
var visParams_lc = {min:lc_remap_out[0], max:lc_remap_out[-1], palette:lc_colors};
var visParams_pop = {min:pop_thresh, max:100, palette:['#fff7ec','#fdbb84','#d7301f']};
// legend(s)
var dict_water = {"names": ["Permanent","Seasonal","Flooded"], "colors": ["blue","green","red"]};
var dict_lc = {"names": lc_names, "colors": lc_colors};
var dict_pop = {"names": ["10","50","100+"], "colors": ['#fff7ec','#fdbb84','#d7301f']};
// ----------------------------------------------------------------------------------------- //
// UI
// ----------------------------------------------------------------------------------------- //
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
function createLegend(panel, dict, title) {
  var legendTitle = ui.Label({
    value: title,
    style: {fontWeight:'bold', fontSize:'18px', margin:'0 0 4px 0', padding: '0'}
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  var makeRow = function(color, name) {
    var colorBox = ui.Label({style: {backgroundColor:color, padding:'8px', margin:'0 0 4px 0'}});
    var description = ui.Label({value:name, style: {margin:'0 0 4px 6px'}});
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  // Map.add(panel);
  return panel;
}
var legend_panel = createLegend(legend, dict_water, 'Water');
legend_panel = createLegend(legend_panel, dict_pop, 'Population');
legend_panel = createLegend(legend_panel, dict_lc, 'Landcover');
function toggleRefs() {
  refs_txt.style().set('shown', !refs_txt.style().get('shown'));
}
var refsButton = ui.Button({
  label: 'i',
  onClick: toggleRefs,
  style: {margin:'0px', padding: '0px'}
});
var refs_txt = ui.Panel({
  widgets: [
    ui.Label({
      value: 'Awash River Basin 2020 Floods Assessment',
      style: {fontWeight:'bold', fontSize:'11px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'Monthly water/flood maps (July-September 2020) derived from Sentinel-1, Sentinel-2 and Landsat 8, using the HYDrologic Remote Sensing Analysis for Floods (HYDRAFloods) tool.',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'Contains modified Copernicus Sentinel data [2020]',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'Landsat 8 images courtesy of the U.S. Geological Survey (USGS)',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'Landcover © ESA WorldCover project 2020',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'Population from WorldPop at www.worldpop.org',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'roads from GRIP4 at www.globio.info',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'buildings © OpenStreetMap contributors',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    }),
    ui.Label({
      value: 'For more information contact arjen.haag@deltares.nl',
      style: {fontSize:'10px', margin:'2px 2px', padding: '0px'}
    })
  ],
  style: {
    position: 'bottom-right',
    width: '240px',
    padding: '2px 2px',
    shown: false
  }
});
var refs = ui.Panel({
  widgets: [
    refsButton,
    refs_txt
  ],
  style: {
    position: 'bottom-right',
    padding: '0px 0px'
  }
});
// ----------------------------------------------------------------------------------------- //
// Processing
// ----------------------------------------------------------------------------------------- //
// bounds
var bbox = AoI.geometry().bounds();
// landcover
WorldCover = WorldCover.filterBounds(bbox);
WorldCover = WorldCover.mosaic().clip(bbox).remap(lc_remap_in, lc_remap_out);
// population
WorldPop = WorldPop.filterBounds(bbox);
WorldPop = WorldPop.mosaic().clip(bbox);
// water maps
// water = water.filter(ee.Filter.eq('resolution_meters', res));
water = water_mode.filter(ee.Filter.eq('resolution_meters', res));
var water_7 = ee.Image(water.filter(ee.Filter.eq('month', 7)).first());
var water_8 = ee.Image(water.filter(ee.Filter.eq('month', 8)).first());
var water_9 = ee.Image(water.filter(ee.Filter.eq('month', 9)).first());
water = water.map(function(img) {
  return img.updateMask(img);
});
var water_max = water.min();
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
Map.centerObject(AoI);
Map.setOptions({'mapTypeId':'HYBRID'});
Map.add(legend_panel);
Map.add(refs);
Map.addLayer(ee.Image.constant(0).clip(AoI.geometry().bounds()), {palette:['white']}, 'Background', true, 0.5);
Map.addLayer(WorldCover, visParams_lc, 'Landcover (ESA WorldCover)', false);
Map.addLayer(WorldPop.updateMask(WorldPop.gte(pop_thresh)), visParams_pop, 'Population (WorldPop)', false);
Map.addLayer(water_7.updateMask(water_7), visParams_water, 'Water July 2020', true);
Map.addLayer(water_8.updateMask(water_8), visParams_water, 'Water August 2020', false);
Map.addLayer(water_9.updateMask(water_9), visParams_water, 'Water September 2020', false);
Map.addLayer(water_max.updateMask(water_max), visParams_water, 'Water max extent (July-September)', false);
Map.addLayer(builtup_mask.updateMask(builtup_mask), {min:0, max:1, palette:'black'}, 'built-up mask', false);
Map.addLayer(buildings, {}, 'buildings (OSM)', false);
// Map.addLayer(ee.Image().byte().paint(buildings,0,2), {}, 'buildings (OSM)', false);
Map.addLayer(ee.Image().byte().paint(roads,0,2), {palette:['orange']}, 'roads (GRIP4)', false);
Map.addLayer(ee.Image().byte().paint(Weredas,0,2), {palette:['grey']}, 'Weredas', false);
Map.addLayer(ee.Image().byte().paint(basins,0,2), {palette:['black']}, 'Sub-Basins', false);
Map.addLayer(ee.Image().byte().paint(AoI,0,2), {}, 'Area of Interest', false);
Map.addLayer(ee.Image().byte().paint(bbox,0,2), {}, 'Bounding Box', true);