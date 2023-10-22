// Demonstrates before/after imagery comparison with Sentinel-5P
// Written 2020-04-21. Author Simon Andersson @s_andersson (twitter)
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.Reds[9];
// Config
var lon = 5;
var lat = 48;
var zoom = 4;
var months = 2;
var mask_threshold = 0.000025;
var NO2_STYLE= {min: mask_threshold, max: 0.00016, palette: palette, opacity:0.75};
var today = ee.Date(new Date());
var year_ago = today.advance(-12, 'month');
var s5ImageCollection = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
// Get average Sentinel-5P NO2 tropospheric column from 2 month period
function getSentinel5Composite(date) {
  var sentinel5 = s5ImageCollection
                      .select("tropospheric_NO2_column_number_density") //mol/m^2
                      .filterDate(date.advance(-months, 'month'),date)
                      .median();
  sentinel5 = sentinel5.updateMask(sentinel5.gt(mask_threshold))
  return sentinel5
}
// Get date of last Sentinel-5P acquisition ingested into GEE
var latestImg = s5ImageCollection
              .filterDate(today.advance(-1, 'week'),today)
              .limit(1, 'system:time_start', false).first();
var latestImgDateStr  = ee.String("Latest data as of ")
                        .cat(ee.Date(latestImg.get('system:time_start')).format("EE dd-MMM-y"))
/*
 * Set up the maps and panels
 */
// Create the left map
var leftMap = ui.Map();
leftMap.setOptions("TERRAIN")
leftMap.setControlVisibility(false);
leftMap.addLayer(getSentinel5Composite(year_ago), NO2_STYLE,
  "tropospheric_NO2_column_number_density", true)
var leftSelector = addUiPanel(leftMap,"This Time Last Year (Average over 2 months)", 'top-left');
// Create the right map
var rightMap = ui.Map();
rightMap.setOptions("TERRAIN")
rightMap.setControlVisibility(false);
rightMap.addLayer(getSentinel5Composite(today), NO2_STYLE,
  "tropospheric_NO2_column_number_density", true)
var rightSelector = addUiPanel(rightMap,"Current (Average over last 2 months)", 'top-right');
// Adds a panel with text to each map
function addUiPanel(mapToChange,label_text, position) {
  var label = ui.Label(label_text);
    var controlPanel =
      ui.Panel({widgets: [label], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(lon, lat, zoom);
/*
 * The legend panel in the bottom-left
 */
// A color bar widget for NO2. Makes a horizontal color bar to display the given
// color palette.
function ColorBarNO2(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
       palette: palette
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and  labels representing
// the minimum, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(parseInt(NO2_STYLE["min"]/1e-6).toString()+" μmol/m^2", {margin: '4px 8px', 
                                                                          textAlign: 'left', stretch: 'horizontal', fontSize: '10px', fontWeight: 'bold'}),
        ui.Label(parseInt(NO2_STYLE["max"]/1e-6).toString()+" μmol/m^2", {margin: '4px 8px', fontSize: '10px', fontWeight: 'bold'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBarNO2(NO2_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '1px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '1px',
};
var latestImgDatelabel = ui.Label({style:LEGEND_FOOTNOTE_STYLE})
latestImgDatelabel.setValue(latestImgDateStr.getInfo(), true)
var panel = ui.Panel(
    [
      ui.Label('Air Pollution - NO2', LEGEND_TITLE_STYLE),
      ui.Label('Use the slider to compare the current air pollution levels to this time last year. Pan or use the search bar to choose location.', LEGEND_FOOTNOTE_STYLE),
      latestImgDatelabel,
      makeLegend(),
      ui.Label('NO2 tropospheric column, qa_value>0.75. Copernicus Sentinel-5P', LEGEND_FOOTNOTE_STYLE),
      // ui.Label("Processing: i) Convert ESA Level-2 NO2 Product to Level-3, binned by latitude/longitude ii) Take median for 'tropospheric_NO2_column_number_density' over 2 month time window determined from today's date iii) Apply a contrast stretch and transparency mask for values < 25μmol/m^2", LEGEND_FOOTNOTE_STYLE),
      ui.Label('Author: Simon Andersson @s_andersson', LEGEND_FOOTNOTE_STYLE, 'https://twitter.com/s_andersson'),
      ui.Label(
      'Information about processing applied by Google', LEGEND_FOOTNOTE_STYLE,
      'https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_NRTI_L3_NO2'),
      ui.Label('Source Code', 
      LEGEND_FOOTNOTE_STYLE, 
      'https://code.earthengine.google.com/?accept_repo=users/sandersson0013/air-pollution-app')
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '310px', position: 'bottom-left'})
leftMap.add(panel);