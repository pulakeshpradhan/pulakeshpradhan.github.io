// Read images//__________________________________________________________________________________
var image = ee.Image("users/niteshpatidar88/Impervious_app/IS_smooth_fill_1992_2017");
var change_mag = ee.Image("users/niteshpatidar88/Impervious_app/IS_change_mag_1992_2017");
var change_dur = ee.Image("users/niteshpatidar88/Impervious_app/IS_change_dur_1992_20171");
var change_tim = ee.Image("users/niteshpatidar88/Impervious_app/IS_change_tim_1992_2017");
var msk = image.gt(0.05); var image = image.updateMask(msk);
var msk = change_mag.lt(1).and(change_mag.gt(-1)); var change_mag = change_mag.updateMask(msk);
var mskd = change_dur.lt(26).and(change_dur.gt(0)); var change_dur = change_dur.updateMask(mskd);
var mskt = change_tim.lt(26).and(change_tim.gt(0)); var change_tim = change_tim.updateMask(mskt);
// List of bands and year
var is_bands = ['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18','b19','b20','b21','b22','b23','b24','b25','b26'];
var year = ['1992', '1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'];
var image = image.select(is_bands).rename(year);
// _______________________________________________________________________________________________
// VISUALIZATION PARAMETERS_______________________________________________________________________
var palette_is = ['dcde44','ffb86e','ff6047','ff0000','c20202'];
var palette_is2 = ['dcde44','ffb86e','c20202'];
var palette_change = ['70ff6e','bcffd4','d4fffd','ffeffb','f18fae','ff3b83','ce052a'];
var palette_dur = ['1b18ff','8529ff','9176ff','ff1df8','ff144a'];
var palette_tim = ['feffc8','f7ff76','d8e240','bbf361','4aeb36','11bc36']
// 'd1f58a',
// Map.addLayer(image.select('b1'), {min: 0, max: 1, palette: palette_is}, 'Impervious surface fraction 1992');
/*-------------------------------------------------------------------------------
Configure layers and locations
 */
var vis_para_is = {
    visParams: {min: 0, max: 1, palette: palette_is},
    defaultVisibility: false
};
var vis_para_change = {
    visParams: {min: -1, max: 1, palette: palette_change},
    defaultVisibility: true
};
var vis_para_tim = {
    visParams: {min: 1, max: 26, palette: palette_tim},
    defaultVisibility: true
};
var vis_para_dur = {
    visParams: {min: 1, max: 8, palette: palette_dur},
    defaultVisibility: true
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'AIRPORT': {lon: 77.08, lat: 28.55, zoom: 12},
  'NOIDA': {lon: 77.393, lat: 28.5359, zoom: 11},
  'FARIDABAD': {lon: 77.3115, lat: 28.3765, zoom: 11},
  'NCR': {lon: 77.2140, lat: 28.6420, zoom: 10}
};
//_____________________________________________________________________________________________________________
// CREATE MAP PANEL --------------------------------------------------------------------------------------------
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// ______________________________________________________________________________________________________________
// ADD LAYERS TO THE MAP AND CENTER IT___________________________________________________________________________
for (var key in year) {
  var layer = year[key];
  var image_b = image.select(layer).visualize(vis_para_is.visParams);
  mapPanel.add(ui.Map.Layer(image_b, {}, layer, vis_para_is.defaultVisibility));
}
var image_change = change_mag.visualize(vis_para_change.visParams); mapPanel.add(ui.Map.Layer(image_change, {}, 'change', vis_para_change.defaultVisibility));
var image_tim = change_tim.visualize(vis_para_tim.visParams); mapPanel.add(ui.Map.Layer(image_tim, {}, 'tim', vis_para_is.defaultVisibility));
var image_dur = change_dur.visualize(vis_para_dur.visParams); mapPanel.add(ui.Map.Layer(image_dur, {}, 'dur', vis_para_is.defaultVisibility));
// --------------------------------------------------------------------------------------------------------------
// CREATE A SLIDER_________________________________________________________________________________________
var selectItems = year;
var layerSelect = ui.Slider({
  min: 1992,
  max: 2017,
  step: 1,
  style: {stretch: 'horizontal', width:'250px', position: 'top-right',whiteSpace: 'nowrap'},
  // value: 2017,
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    // SetLegend(layerProperties[selected].legend);
  }
});
// ---------------------------------------------------------------------------------------------------------------
layerSelect.setValue(2017)
// Add TITLES AND EXPLANATORY TEXT TO A SIDE PANEL_______________________________________________________________
var header = ui.Label('Impervious Surface Change in NCR, India', {fontSize: '15px', color: 'red'});
var text = ui.Label(
    'Results from analysis of Landsat images using Rule-based Spectral Unmixing Algorithm (RBSUA).',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '330px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'For more information see Paper by Patidar and Keshari', {},
    'https://www.tandfonline.com/doi/full/10.1080/01431161.2019.1711243');
var linkPanel = ui.Panel(
    [ui.Label('', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
// Create a visibility checkbox and an opacity slider_________________________________________________________
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Show Impervious Surface',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.flow('horizontal'));
toolPanel.add(viewPanel);
// ---------------------------------------------------------------------------------------------------------------
toolPanel.add(ui.Label('Use slider to change year', {'font-size': '14px', 'fontWeight': '100'}));
toolPanel.add(layerSelect);
// ------------------------------------------------------------------------------------------------------------
// A color bar widget. Makes a horizontal color bar to display the given________________________________________________
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x5',
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
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(0, {margin: '4px 8px'}),
        ui.Label(0.5,
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(1), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette_is), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '13px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// // Assemble the legend panel.
toolPanel.add(ui.Panel(
  [ui.Label('Impervious Surface', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(Fraction within 30 m by 30 m Landsat pixels)', LEGEND_FOOTNOTE_STYLE)]
  ))
// --------------------------------------------------------------------------------------------------------------
// Center the map
var defaultLocation = locationDict.AIRPORT;
mapPanel.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// -----------------------------------------------------------------------------------------------------------
// CHECKBOX CHANGE MAGNITUDE______________________________________________________________________________________________________
var checkbox_chm = ui.Checkbox('Show CHANGE MAGNITUDE', false);
checkbox_chm.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  mapPanel.layers().get('26').setShown(checked);
});
toolPanel.add(checkbox_chm);
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend_chm() {
  var labelPanel = ui.Panel(
      [
        ui.Label(-1, {margin: '4px 8px'}),
        ui.Label(0,
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(1, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette_change), labelPanel]);
}
// // Assemble the legend panel.
toolPanel.add(ui.Panel(
  [ui.Label('Change magnitude', LEGEND_TITLE_STYLE), makeLegend_chm(),
      ui.Label(
          '(Change in fraction between 1992 to 2017)', LEGEND_FOOTNOTE_STYLE)]
  ))
// --------------------------------------------------------------------------------------------------------------
// ___________________________________________________________________________________________________________
// CHECKBOX CHANGE YEAR______________________________________________________________________________________________________
var checkbox_chy = ui.Checkbox('Show CHANGE YEAR', false);
checkbox_chy.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  mapPanel.layers().get('27').setShown(checked);
});
toolPanel.add(checkbox_chy);
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend_chy() {
  var labelPanel = ui.Panel(
      [
        ui.Label(1992, {margin: '4px 8px'}),
        ui.Label(2004,
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(2017, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette_tim), labelPanel]);
}
// // Assemble the legend panel.
toolPanel.add(ui.Panel(
  [ui.Label('Change YEAR', LEGEND_TITLE_STYLE), makeLegend_chy(),
      ui.Label(
          '(The year in which the growth started)', LEGEND_FOOTNOTE_STYLE)]
  ))
// --------------------------------------------------------------------------------------------------------------
// CHECKBOX CHANGE DURATION______________________________________________________________________________________________________
var checkbox_chd = ui.Checkbox('Show CHANGE DURATION', false);
checkbox_chd.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  mapPanel.layers().get('28').setShown(checked);
});
toolPanel.add(checkbox_chd);
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend_chd() {
  var labelPanel = ui.Panel(
      [
        ui.Label(1, {margin: '4px 8px'}),
        ui.Label(5,
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(9, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette_dur), labelPanel]);
}
// // Assemble the legend panel.
toolPanel.add(ui.Panel(
  [ui.Label('Change duration', LEGEND_TITLE_STYLE), makeLegend_chd(),
      ui.Label(
          '(The time required to completely fill the pixel with Impervious Surface or to reach a stable fraction)', LEGEND_FOOTNOTE_STYLE)]
  ))
// --------------------------------------------------------------------------------------------------------------
// Create the location pulldown____________________________________________________________________________________
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Visit Example Locations', {'font-size': '18px'}), locationSelect
]);
toolPanel.add(locationPanel);
// ----------------------------------------------------------------------------------------------------------------
// slider.setValue(2007);