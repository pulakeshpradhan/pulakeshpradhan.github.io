var table = ui.import && ui.import("table", "table", {
      "id": "users/rongguangni/China"
    }) || ee.FeatureCollection("users/rongguangni/China");
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2021-06-01', '2021-08-30');
var band_viz = {
  min: 1850,
  max: 1920,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(table), band_viz, 'S5P CH4(2021夏)');
Map.setCenter(110,35, 4);
/*
 * The legend panel in the bottom-left
 */
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function undoColorStretch(val) {
  return Math.pow(val, 1) *2352;
}
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0.6341)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.8)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(POPULATION_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '10px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('Column averaged dry air mixing ratio of methane ', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(ppbV)', LEGEND_FOOTNOTE_STYLE),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));