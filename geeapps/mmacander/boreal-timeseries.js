var dod_sites = ui.import && ui.import("dod_sites", "table", {
      "id": "users/masseyr44/shapefiles/DoD_AK_sites"
    }) || ee.FeatureCollection("users/masseyr44/shapefiles/DoD_AK_sites");
var viz = require('users/mmacander/boreal_viz:fxns'); // Load module
var vizPublic = require('users/mmacander/public:functions/viz'); // Load module
 // Display a grid of linked maps, each with a different visualization. 
 // Currently used for a GEE app
//LC Setup
var aboveLc = ee.Image("projects/foreststructure/ABoVE/ORNL_DAAC/ABoVE_LandCover_v01")
var aboveLc_2015_2020 = ee.ImageCollection("projects/foreststructure/ABoVE/BiomeShift/ABoVE_LC_2020").mosaic()
  .select('y2015','y2016','y2017','y2018','y2019','y2020')
aboveLc = aboveLc.addBands(aboveLc_2015_2020);
var lcYears = ee.List.sequence(1985,2020).getInfo();
var aboveLcColl = ee.ImageCollection(lcYears.map(function(year) {
  var band = 'y' + year;
  var nextYear = year + 1
  return aboveLc.select(band)
    .set('system:time_start', ee.Date(year + '-01-01').millis(),
         'system:time_end', ee.Date(nextYear + '-01-01').millis())
    .rename('above_lc_co')
    .addBands(ee.Image(year).rename('year').uint16());
}));
var aboveLcMssColl = ee.ImageCollection('projects/foreststructure/Alaska/MSS/above_lc_mss_v20220619_tests')
  .filter(ee.Filter.calendarRange(1972,1984,'year'));
var lc_coll = aboveLcColl.select('above_lc_co').merge(aboveLcMssColl);//.filter(ee.Filter.calendarRange(2001, 2014, 'year')));
print(lc_coll, 'aboveLcMerged')
var lc_2020 = lc_coll.filterDate(ee.Date.fromYMD(2020,1,1), ee.Date.fromYMD(2020,12,31)).first();//.
//PFT Setup
////////////////////////////////////////
//PFT Setup
var pftMaps = ee.ImageCollection("projects/foreststructure/ABoVE/BiomeShift/MosaicsFilled202109")
  .filter(ee.Filter.inList('version', ['20210911_pft_noRatePreds','20210922_tallShrub_lidar_noRatePreds']));
var pftMaps = ee.List.sequence(1985,2020,5).map(function(year) {
  return pftMaps.filter(ee.Filter.calendarRange(year,null,'year')).toList(1000)});
pftMaps = ee.ImageCollection(pftMaps.flatten());
print(pftMaps, 'pftMaps');
function getPftYearStack(pftMaps, year) {
  var pftYearColl = pftMaps.filter(ee.Filter.calendarRange(year, null, 'year')).select('cover');
  return pftYearColl.filterMetadata('response','equals','cTree').first().rename('cTree_cover')
    .addBands(pftYearColl.filterMetadata('response','equals','bTree').first().rename('bTree_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','allDecShrub').first().rename('allDecShrub_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','decshrabs').first().rename('decshrabs_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','alnshr').first().rename('alnshr_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','betshr').first().rename('betshr_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','salshr').first().rename('salshr_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','allEvShrub').first().rename('allEvShrub_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','graminoid').first().rename('graminoid_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','allForb').first().rename('allForb_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','tmlichen_light2').first().rename('tmlichen_light2_cover'))
    .addBands(pftYearColl.filterMetadata('response','equals','talshr').first().rename('talshr_cover'))
    .clamp(0,100) //A few are outside nominal range
    .set('system:time_start', ee.Date.fromYMD(year,1,1), 'system:time_end', ee.Date.fromYMD(ee.Number(year).add(1),1,1))
}
var pft1985 = getPftYearStack(pftMaps, 1985);
print(pft1985, '1985 PFT Stack');
Map.addLayer(pft1985, {min:0, max:60}, 'pft1985');
var pftTS = ee.ImageCollection(
  ee.List.sequence(1985,2020,5).map(function(year) {return getPftYearStack(pftMaps, year)}));
print(pftTS);
// Map.addLayer(pftTS);
// throw('stop')
var mapTitles = ['Land Cover','PFT Cover (Conifer Tree)', 'Recent High-res Image'];
var legendTitles = ['Land Cover','Land Cover']
//Legend for continuous scale
var vis_decid = {min:0, max:100, palette:['065D18','FFD905']};
var vis_tc = {min:0, max:100, palette:['1153AE','FE7932']};
var vis_lc = viz.above_lc_viz;
var places = {
  'Fort Greely': [ -145.961, 63.898541, 9],
  'Fort Wainwright': [-147.418,64.621, 9],
  'Fort Richardson': [-149.663, 61.303, 10],
  'Black Rapids Training site': [-145.806, 63.508, 12],
  'Deltana Training site': [-145.163, 63.789, 11],
  'Clear station': [-149.216, 64.29, 12],
  'Kodiak station': [-152.572, 57.789, 11]
  };
var pfts = {
  'Conifer Tree': ['cTree', 80],
  'Broadleaf Tree': ['bTree', 80],
  'Deciduous Shrub': ['allDecShrub', 80],
  'Evergreen Shrub': ['allEvShrub', 80],
  'Graminoid': ['graminoid', 80],
  'Forb': ['allForb', 80],
  'Lichen': ['tmlichen_light2', 80]
}
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 2px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 6px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var lc_legend = ui.Panel({style: {shown: true, width: '200px'}});
lc_legend.style().set({position: 'bottom-left'});
lc_legend.add(ui.Label('Land Cover Class'))
lc_legend.add(makeRow("#000000", '00: Not Mapped'))
lc_legend.add(makeRow("#003300", '01: Evergreen Forest'))
lc_legend.add(makeRow("#00dd00", '02: Deciduous Forest'))
lc_legend.add(makeRow("#008800", '03: Mixed Forest'))
lc_legend.add(makeRow("#79843b", '04: Woodland'))
lc_legend.add(makeRow("#694704", '05: Low Shrub'))
lc_legend.add(makeRow("#ad3714", '06: Tall Shrub'))
lc_legend.add(makeRow("#afa377", '07: Open Shrubs'))
lc_legend.add(makeRow("#eac856", '08: Herbaceous'))
lc_legend.add(makeRow("#a38d1e", '09: Tussock Tundra'))
lc_legend.add(makeRow("#dfe5a2", '10: Sparsely Vegetated'))
lc_legend.add(makeRow("#57da92", '11: Fen'))
lc_legend.add(makeRow("#d18523", '12: Bog'))
lc_legend.add(makeRow("#15bbe9", '13: Shallows/littoral'))
lc_legend.add(makeRow("#666666", '14: Barren'))
lc_legend.add(makeRow("#96b1d4", '15: Water'))
// print(lc_legend, 'lc_legend')
function makeLegend(vis, legend_title) {
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,8,100', dimensions:'50x150'},  
    style: {padding: '0 0 0 0', position: 'bottom-left'}
  });
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: legend_title,
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 0 0',
      padding: '0 0 0 0'
    }
  });
  var lp = ui.Panel({
    widgets: [legendTitle,thumb],
    layout: ui.Panel.Layout.Flow('vertical')
  }); 
  //print(lp)
  var rp = ui.Panel({
    widgets: [
      ui.Label(),
      ui.Label(vis['max']), 
      ui.Label({style: {stretch: 'vertical'}}), 
      ui.Label(vis['min'])
    ],
    layout: ui.Panel.Layout.Flow('vertical'),
    style: {stretch: 'vertical',fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 0 0',
      padding: '0'}
  });
  //print(rp)
  return ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '10 5 0 0'
  },
  layout: ui.Panel.Layout.Flow('horizontal')
  }).add(lp).add(rp)
}
// function to create map widget
// var make_map = function(name, image_, vis, legend_title_){
var make_map = function(name, image_, vis) {//, legend_){
  var map = ui.Map();
  map.add(ui.Label({value:name, style:{fontWeight: 'bold', fontSize: '22px'}}))
  map.addLayer(image_, vis, name);
  map.setOptions({mapTypeId:'TERRAIN'})
  map.setControlVisibility({layerList:false, mapTypeControl:false, scaleControl: true, zoomControl: false, fullscreenControl:false });
  // map.add(legend_)
  // map.add(makeLegend(vis, legend_title_))
  return map
}
// make empty map
var make_empty_map = function(name){
  var map = ui.Map();
  map.add(ui.Label({value:name, style:{fontWeight: 'bold', fontSize: '22px'}}))
  map.setOptions({mapTypeId:'HYBRID'})
  map.setControlVisibility({layerList:false, mapTypeControl:false, scaleControl: true, zoomControl: false, fullscreenControl:false });
  return map
}
// Create a title.
var title = ui.Label('Land cover and PFT cover', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '32px'
});
/*
var ak_fire_ = ak_fire.map(function(elem){ return elem.set({'YEAR': ee.Number.parse(elem.get('FIREYEAR'))}) })
var fires = ak_fire.filterMetadata('YEAR', 'not_less_than', 2013).filterMetadata('YEAR', 'not_greater_than', 2018)
print(fires)
*/
function getPftYear(pftColl, year) {
  return pftColl.filter(ee.Filter.calendarRange(year,year,'year')).first()
}
// make decid and tree cover map widgets
var map1 = make_map(mapTitles[0], lc_2020.unmask(0), vis_lc);//, lc_legend)
var coverViz = {bands: 'cTree_cover', min:0, max:101, palette: vizPublic.glcf_tree_cover_palette_zeroGray};
var map2 = make_map(mapTitles[1], getPftYear(pftTS, 2020), coverViz);//, lc_legend)
map1.add(lc_legend)
// var map1 = make_map(mapTitles[0], get_decid(decid2015, tc2015, 25), vis_decid, legendTitles[0])
// var map2 = make_map(mapTitles[1], tc2015, vis_tc, legendTitles[1])
var empty_map = make_empty_map(mapTitles[2])
var dod_sites_fill = ee.Image().toByte().paint(dod_sites, 1, 2)
map1.addLayer(dod_sites_fill, {palette:'ff0000'})
map2.addLayer(dod_sites_fill, {palette:'ff0000'})
empty_map.addLayer(dod_sites_fill, {palette:'ff0000'})
// link the maps
var linker = ui.Map.Linker([map1, map2, empty_map]);
// Create a grid of maps.
var mapGrid = ui.Panel([
    ui.Panel([map1], null, {stretch: 'both'}),
    ui.Panel([map2], null, {stretch: 'both'}),
    ui.Panel([empty_map], null, {stretch: 'both'}),
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// widget for selecting location
var select_location = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    map1.setCenter(places[key][0], places[key][1]);
    map1.setZoom(places[key][2])},
  style: {
    //'stretch': 'horizontal',
    'background-color': 'white',
    'margin': '12px',
    'shown': true,
    // 'textAlign': 'center',
    'fontWeight': 'bold',
    //'position': 'top-center',
    'fontSize': '24px',
    'textAlign': 'left'
  }
});
// Set a place holder for location selector
select_location.setPlaceholder('Choose a location...');
// widget for selecting PFT
var select_pft = ui.Select({
  items: Object.keys(pfts),
  onChange: function(key) {
    coverViz = {
      bands: pfts[key][0] + '_cover',
      min: 0,
      max: pfts[key][1],
      palette: vizPublic.glcf_tree_cover_palette_zeroGray};
    var pft_ = getPftYear(pftTS, select_year.getValue());
    print(pft_);
    // mapTitles[1] = 'PFT Cover ('+pfts[key][0];
    print(map2.widgets());
    map2.remove(map2.widgets().get(0));
    map2.add(ui.Label({value:key+' Top Cover (%)', style:{fontWeight: 'bold', fontSize: '22px'}}))
    var pft_layer_new = ui.Map.Layer(pft_, coverViz, mapTitles[1]);
    map2.layers().set(0, pft_layer_new);
    print(pft_layer_new)},
    // map1.setCenter(places[key][0], places[key][1]);
    // map1.setZoom(places[key][2])},
  style: {
    //'stretch': 'horizontal',
    'background-color': 'white',
    'margin': '12px',
    'shown': true,
    // 'textAlign': 'center',
    'fontWeight': 'bold',
    //'position': 'top-center',
    'fontSize': '24px',
    'textAlign': 'left'
  }
});
// Set a place holder for PFT selector
select_pft.setPlaceholder('Choose a PFT...');
// widget for selecting year 
var select_year = ui.Slider({
  min: 1972,
  max: 2020,
  step: 1,
  onChange: function(year) {
    var lc_ = lc_coll.filterDate(ee.Date.fromYMD(year,1,1), ee.Date.fromYMD(year,12,31)).first();//.multiply(land)
    var lc_layer_new = ui.Map.Layer(lc_.unmask(0), vis_lc, mapTitles[0]);
    // var lc_layer_new2 = ui.Map.Layer(lc_.unmask(0), vis_lc, mapTitles[1]);
    map1.layers().set(0, lc_layer_new);
    var pft_ = getPftYear(pftTS, year);
    // print(pft_);
    var pft_layer_new = ui.Map.Layer(pft_, coverViz, mapTitles[1]);
    map2.layers().set(0, pft_layer_new);
    // print(pft_layer_new);
    // var tc_ = tc_coll.filterDate(ee.Date.fromYMD(year,1,1), ee.Date.fromYMD(year,12,31)).first().multiply(land)
    // var decid_ = decid_coll.filterDate(ee.Date.fromYMD(year,1,1), ee.Date.fromYMD(year,12,31)).first()
    // var thresh_ = tree_cover_thresholds[select_tc_threshold.getValue()]
    // var decid_ = get_decid(decid_, tc_, thresh_)
    // var decid_layer_new = ui.Map.Layer(decid_, vis_decid, mapTitles[0])
    // map1.layers().set(0, decid_layer_new);
    // var tc_layer_new = ui.Map.Layer(tc_, vis_tc, mapTitles[1])
    // map2.layers().set(0, tc_layer_new);
  },
  style: {
    //'stretch': 'horizontal',
    'background-color': 'white',
    'margin': '22px',
    'shown': true,
    'textAlign': 'center',
    'fontWeight': 'bold',
    'position': 'bottom-center',
    'fontSize': '16px',
    'textAlign': 'left'
  }
});
// Create a grid of maps.
var widgetGrid = ui.Panel([
    select_location.setValue('Fort Greely'),
    // select_tc_threshold.setValue('Tree cover > 25 %'),
    select_year.setValue('2020'),
    select_pft.setValue('Conifer Tree')], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'})
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, widgetGrid, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
print(map2.widgets())
//map1.setCenter(-145.577218, 63.895541);
//map1.setZoom(10);