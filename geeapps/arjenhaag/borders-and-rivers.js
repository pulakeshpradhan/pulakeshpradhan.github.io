var borders = ui.import && ui.import("borders", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013"),
    rivers_NaturalEarth = ui.import && ui.import("rivers_NaturalEarth", "table", {
      "id": "users/arjenhaag/ne_10m_rivers_lake_centerlines"
    }) || ee.FeatureCollection("users/arjenhaag/ne_10m_rivers_lake_centerlines"),
    JRC_water_yearly = ui.import && ui.import("JRC_water_yearly", "imageCollection", {
      "id": "JRC/GSW1_2/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_2/YearlyHistory"),
    JRC_water_all = ui.import && ui.import("JRC_water_all", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater");
// Borders and Rivers, visualization app
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
// buffer
var river_buffer = 20000;
// JRC yearly water classification: 
/*
0	cccccc	No data
1	ffffff	Not water
2	99d9ea	Seasonal water
3	0000ff	Permanent water
*/
var JRC_threshold = 3;
// ---------------------------------------------------------------------------------------------------- //
// Processing
// ---------------------------------------------------------------------------------------------------- //
// borders
var convertPolyToLine = function(feature) {
  var new_geom = ee.Geometry.MultiLineString(feature.geometry().coordinates().map(function(coords) {
    return ee.List(coords).flatten();
  }));
  return ee.Feature(new_geom).copyProperties(feature);
};
var borders_lines = borders.map(convertPolyToLine);
// rivers
var rivers_buffered = rivers_NaturalEarth.map(function(feature) {
  return feature.buffer(river_buffer);
});
// JRC water
var years          = JRC_water_yearly.aggregate_array('year');
var water_years_ic = JRC_water_yearly.map(function(img) {
  return img.gte(JRC_threshold).copyProperties(img);
});
var water_years_mean = water_years_ic.reduce(ee.Reducer.mean());
// border=river
var water_max  = ee.Image(JRC_water_all.select('max_extent')).unmask(0);
water_max      = water_max.clipToCollection(rivers_buffered);
var border_img = ee.Image().byte().paint(borders, 0, 2).add(1).unmask(0);
border_img     = border_img.clipToCollection(rivers_buffered);
var water_eq_borders = water_max.multiply(border_img);
water_eq_borders     = water_eq_borders.updateMask(water_eq_borders);
// ---------------------------------------------------------------------------------------------------- //
// UI
// ---------------------------------------------------------------------------------------------------- //
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Borders & Rivers',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  // intro text(s)
  ui.Label({
    value: "WORK-IN-PROGRESS",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  }),
  ui.Label({
    value: "First attempt at identifying where borders and rivers (potentially) overlap.",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  }),
  ui.Panel([
    ui.Label({
      value: "Idea based on:",
      style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
    }),
    ui.Label({
      value: "The Age of Borders",
      style: {fontSize: '12px'},
      targetUrl: 'https://www.reddit.com/r/MapPorn/comments/7ndxz9/i_tried_to_find_the_date_of_origin_for_every'
    })
  ], ui.Panel.Layout.flow('horizontal'))
]);
// panel combining all UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '250px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ---------------------------------------------------------------------------------------------------- //
// Map
// ---------------------------------------------------------------------------------------------------- //
Map.centerObject(rivers_NaturalEarth);
var maplayer_rivers  = ui.Map.Layer(rivers_NaturalEarth, {color:'blue'}, 'rivers', true);
var maplayer_borders = ui.Map.Layer(ee.Image().byte().paint(borders, 0, 2), {color:'black'}, 'borders', false);
var maplayer_match   = ui.Map.Layer(water_eq_borders, {min:1, max:1}, 'borders = river (JRC)', true);
maplayer_rivers.setOpacity(0.2);
Map.add(maplayer_rivers);
Map.add(maplayer_borders);
Map.add(maplayer_match);