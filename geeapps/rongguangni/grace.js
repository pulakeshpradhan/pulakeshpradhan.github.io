var table = ui.import && ui.import("table", "table", {
      "id": "users/rongguangni/China"
    }) || ee.FeatureCollection("users/rongguangni/China");
// Select images from a collection with a silder.
var collection = ee.ImageCollection('NASA/GRACE/MASS_GRIDS/LAND').select('lwe_thickness_csr')
    // .select('stable_lights')
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = collection.filterDate(dateRange).median();
  Map.addLayer({
    eeObject: ee.Image(image).clip(table),
    visParams: {
      min: -15,
      max: 15,
      palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
    },
    name: String(year)
  });
};
// Create a label and slider.
// var label = ui.Label('Light Intensity for Year');
var slider = ui.Slider({
  min: 2002,
  max: 2017,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [ slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
slider.setValue(2017);
Map.setCenter(110, 35, 4);
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
  return Math.pow(val, 1) *15;
}
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
};
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(-1)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.1)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(POPULATION_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
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
      ui.Label('水当量厚度', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(厘米)', LEGEND_FOOTNOTE_STYLE),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));