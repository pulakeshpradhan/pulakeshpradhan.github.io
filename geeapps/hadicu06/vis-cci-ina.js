var cci_2018 = ui.import && ui.import("cci_2018", "image", {
      "id": "users/hadicu06/IIASA/reference/C3S_LC_L4_LCCS_Map_300m_P1Y_2018_v2_1_1_Indonesia"
    }) || ee.Image("users/hadicu06/IIASA/reference/C3S_LC_L4_LCCS_Map_300m_P1Y_2018_v2_1_1_Indonesia");
var classStruct_cci = {
  '0: no_data': {number: 0, color: '000000'},
  '10: cropland_rainfed': {number: 10, color: 'FFFF64'},
  '11: cropland_rainfed_herbaceous_cover': {number: 11, color: 'FFFF64'},
  '12: cropland_rainfed_tree_or_shrub_cover': {number: 12, color: 'FFFF00'},
  '20: cropland_irrigated': {number: 20, color: 'AAF0F0'},
  '30: mosaic_cropland': {number: 30, color: 'DCF064'},
  '40: mosaic_natural_vegetation': {number: 40, color: 'C8C864'},
  '50: tree_broadleaved_evergreen_closed_to_open': {number: 50, color: '006400'},
  '60: tree_broadleaved_deciduous_closed_to_open': {number: 60, color: '00A000'},
  '61: tree_broadleaved_deciduous_closed': {number: 61, color: '00A000'},
  '62: tree_broadleaved_deciduous_open': {number: 62, color: 'AAC800'},
  '70: tree_needleleaved_evergreen_closed_to_open': {number: 70, color: '003C00'},
  '71: tree_needleleaved_evergreen_closed': {number: 71, color: '003C00'},
  '72: tree_needleleaved_evergreen_open': {number: 72, color: '005000'},
  '80: tree_needleleaved_deciduous_closed_to_open': {number: 80, color: '285000'},
  '81: tree_needleleaved_deciduous_closed': {number: 81, color: '285000'},
  '82: tree_needleleaved_deciduous_open': {number: 82, color: '286400'},
  '90: tree_mixed': {number: 90, color: '788200'},
  '100: mosaic_tree_and_shrub': {number: 100, color: '8CA000'},
  '110: mosaic_herbaceous': {number: 110, color: 'BE9600'},
  '120: shrubland': {number: 120, color: '966400'},
  '121: shrubland_evergreen': {number: 121, color: '784B00'},
  '122: shrubland_deciduous': {number: 122, color: '966400'},
  '130: grassland': {number: 130, color: 'FFB432'},
  '140: lichens_and_mosses': {number: 140, color: 'FFDCD2'},
  '150: sparse_vegetation': {number: 150, color: 'FFEBAF'},
  '151: sparse_tree': {number: 151, color: 'FFC864'},
  '152: sparse_shrub': {number: 152, color: 'FFD278'},
  '153: sparse_herbaceous': {number: 153, color: 'FFEBAF'},
  '160: tree_cover_flooded_fresh_or_brakish_water': {number: 160, color: '00785A'},
  '170: tree_cover_flooded_saline_water': {number: 170, color: '009678'},
  '180: shrub_or_herbaceous_cover_flooded': {number: 180, color: '00DC82'},
  '190: urban ': {number: 190, color: 'C31400'},
  '200: bare_areas': {number: 200, color: 'FFF5D7'},
  '201: bare_areas_consolidated': {number: 201, color: 'DCDCDC'},
  '202: bare_areas_unconsolidated': {number: 202, color: 'FFF5D7'},
  '210: water': {number: 210, color: '0046C8'},
  '220: snow_and_ice': {number: 220, color: 'FFFFFF'}
};
var classNamesList_cci = getIds(classStruct_cci);
var classNames_cci = ee.List(classNamesList_cci);
var classNumbers_cci = getList(classStruct_cci,'number');
var PALETTE_list_cci = getList(classStruct_cci,'color');
// Create the panel for the legend items.
var legend_cci = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle_cci = ui.Label({
  value: 'ESA CCI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend_cci.add(legendTitle_cci);
for (var i = 0; i < classNamesList_cci.length; i++){
  legend_cci.add(makeRow(PALETTE_list_cci[i],classNamesList_cci[i]));
}
// Map.addLayer(cci_2018, {min:0, max:220, palette:PALETTE_list_cci}, "ESA-CCI-2018") // This doesn't map the colour to the visualization correctly
print("classNumbers_cci", classNumbers_cci)
print("classNumbers_cci.length", classNumbers_cci.length)
Map.addLayer(cci_2018.remap(classNumbers_cci, ee.List.sequence(0,37,1)), {min:0, max:37, palette:PALETTE_list_cci}, "ESA-CCI-2018")
Map.add(legend_cci)
function getIds(struct){
  return Object.keys(struct);
}
function getList(struct,column){
  return Object.keys(struct).map(function(k){
    var value = struct[k][column];
    return value;
  });
}
function makeRow(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
Map.setCenter(115.28828640032881, -0.6582104365218485, 5)