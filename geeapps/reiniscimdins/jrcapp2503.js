var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
/**
 * UI Pattern Template
 * 
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 */
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
var m = {};
// band visulisation
m.imgInfo = {
bands: {
  "temperature":{
    bname: "temperature_2m_above_ground",
    color: "d4e7b0",
    vis: {
      min:-40,
      max:50,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "precipitation":{
    bname: "precipitable_water_entire_atmosphere",
    color: "d4e7b0",
    vis: {
      min:0,
      max:100,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "wind":{
    bname: "u_component_of_wind_10m_above_ground",
    color: "d4e7b0",
    vis: {
      min:0,
      max:30,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}}},
}
// weather data
m.data_collection = ee.ImageCollection("NOAA/GFS0P25")
// sentinel data
m.S2Col = ee.ImageCollection('COPERNICUS/S2_SR')
// FIRMS data
m.firms = ee.ImageCollection("FIRMS")
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
m.srtm = ee.Image("CGIAR/SRTM90_V4")
m.elev = m.srtm.select("elevation")
m.slope = ee.Terrain.slope(m.elev)
m.aspect = ee.Terrain.aspect(m.elev)
m.population = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1');
m.builtUpMultitemporal = m.population.select('built');
m.static = ee.Image.cat([m.elev, m.slope, m.aspect, m.builtUpMultitemporal ]);
m.staticInfo = {
bands: {
  "elevation":{
    bname: "elevation",
    color: "d4e7b0",
    vis: {
      min:0,
      max:2000,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "slope":{
    bname: "slope",
    color: "d4e7b0",
    vis: {
      min:0,
      max:30,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "aspect":{
    bname: "aspect",
    color: "d4e7b0",
    vis: {
      min:0,
      max:360,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "built":{
    bname: "built",
    color: "d4e7b0",
    vis: {
      min:0,
      max:6,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}}},
}
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
var s = {};
s.date_style = {fontSize: '11px', 
                      color: '#0066cc',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both',
                      margin: '2px 0 2px 0',
                      padding: '0'
};
s.date_style2 = {fontSize: '13px', 
                      color: '#0066cc',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both',
                      fontWeight: 'bold',
                      margin: '2px 0 2px 0',
                      padding: '0'
};
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
var c = {};
// ,position:'bottom-left'
// weather widgets
c.Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left',stretch: 'both'}});
c.startSlider = ui.DateSlider('2018-01-01');
c.button = ui.Button('Add layer');
c.slider = ui.Slider({min:0, max:18, step : 6, value: 0})
c.drop = ui.Select(Object.keys(m.imgInfo.bands), null, "temperature");
c.checkbox = ui.Checkbox('Show layer', true);
c.start_day = ui.Label('Date: ', s.date_style);
c.cloud_cover = ui.Label('Forecast hour:', s.date_style);
c.type = ui.Label('Band:', s.date_style);
c.weather_title = ui.Label('Weather data: ', s.date_style2);
c.S2_title = ui.Label('Sentinel-2 data: ', s.date_style2);
c.line_title = ui.Label('_________________', s.date_style2);
c.Firms_title = ui.Label('FIRMS data: ', s.date_style2);
c.other_title = ui.Label('Other fire related data: ', s.date_style2);
c.line_title2 = ui.Label('_________________', s.date_style2);
// Sentinel widgets
c.S_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF', width: '450px'}});
c.S_startSlider = ui.DateSlider('2021-05-01');
c.S_endSlider = ui.DateSlider('2021-05-02');
c.S_button = ui.Button('Add layer');
c.S_slider = ui.Slider({min:0, max:100, step : 1, value: 100})
c.S_checkbox = ui.Checkbox('Show layer', true);
c.S_start_day = ui.Label('Start date: ', s.date_style);
c.S_end_day = ui.Label('End date: ', s.date_style);
c.S_cloud_cover = ui.Label('Cloud cover:', s.date_style);
// FIRMS widget
c.F_startSlider = ui.DateSlider('2022-01-01');
c.F_button = ui.Button('Add layer');
c.F_checkbox = ui.Checkbox('Show layer', true);
c.F_start_day = ui.Label('Date: ', s.date_style);
c.F_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'top-right'}});
// Static widgets
c.Stat_label = ui.Label("Select band to display",s.date_style);
c.Stat_selectBand = ui.Select(Object.keys(m.staticInfo.bands), null, "elevation");
c.Stat_checkbox = ui.Checkbox('Show layer', true);
c.Stat_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-right'}});
c.Stat_button = ui.Button('Add layer');
c.Title_panel = ui.Panel();
c.Title_panel_lbl1 = ui.Label('Application prototype 24.02.22', s.date_style2);
c.Title_panel_lbl2 = ui.Label('Cloud computing based web solution to support CEMS On-Demand Mapping service end users. Aplication is aimed to support resource smart AOI definition and service activation', s.date_style);
c.Title_panel.add(c.Title_panel_lbl1)
c.Title_panel.add(c.Title_panel_lbl2)
c.Title_panel.style().set({
  height: '80px', width: '450px'
});
/*******************************************************************************
 * Composition * 
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
// weather  
c.Panel.add(c.weather_title)
c.Panel.add(c.start_day);
c.Panel.add(c.startSlider);
c.Panel.add(c.type);
c.Panel.add(c.drop);
c.Panel.add(c.cloud_cover);
c.Panel.add(c.slider);
c.Panel.add(c.button);
c.Panel.add(c.checkbox);
//c.Panel.add(c.line_title);
// Sentinel
c.S_Panel.add(c.S2_title)
c.S_Panel.add(c.S_start_day);
c.S_Panel.add(c.S_startSlider);
c.S_Panel.add(c.S_end_day);
c.S_Panel.add(c.S_endSlider);
c.S_Panel.add(c.S_cloud_cover);
c.S_Panel.add(c.S_slider);
c.S_Panel.add(c.S_button);
c.S_Panel.add(c.S_checkbox);
// FIRMS
c.F_Panel.add(c.Firms_title);
c.F_Panel.add(c.F_start_day);
c.F_Panel.add(c.F_startSlider);
c.F_Panel.add(c.F_button);
c.F_Panel.add(c.F_checkbox);
// Static
// c.F_Panel.add(c.line_title2)
c.F_Panel.add(c.other_title)
c.F_Panel.add(c.Stat_label)
c.F_Panel.add(c.Stat_selectBand)
c.F_Panel.add(c.Stat_button)
c.F_Panel.add(c.Stat_checkbox)
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
// weather function
c.button.onClick(function () {
  var hour = c.slider.getValue();
  var day = ee.Date(c.startSlider.getValue()[0])
  var band = c.drop.getValue();
  print(ee.Date(c.startSlider.getValue()[0]).format('YYYY-MM-dd'));
m.img = m.data_collection
    .filterDate(ee.Date(c.startSlider.getValue()[0]).format('YYYY-MM-dd'))
    .filterDate(day,day.advance(6,'hour'))
    .filter(ee.Filter.lt('forecast_time',day.advance(1,'day').millis()))
    .filter(ee.Filter.eq('forecast_hours', hour))
    .select(m.imgInfo.bands[band].bname)
  print(m.img)
  var visParams = m.imgInfo.bands[band].vis
  Map.setCenter(26, 57, 6);
  var layer = ui.Map.Layer({eeObject:m.img, visParams:visParams});
  Map.add(layer)
  c.checkbox.onChange(function(checked) {
    if(checked){Map.add(layer)}
    else{Map.remove(layer)}})
  });
// Sentinel function
// cloud function
  function maskS2clouds(image) {
    var qa = image.select('QA60');
    // Bits 10 and 11 are clouds and cirrus, respectively.
    var cloudBitMask = 1 << 10;
    var cirrusBitMask = 1 << 11;
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
    return image.updateMask(mask).divide(10000);
  }
c.S_button.onClick(function () {
  var cloud_threshold = c.S_slider.getValue();
  m.s2 = m.S2Col.filterDate(ee.Date(c.S_startSlider.getValue()[0]).format('YYYY-MM-dd'), ee.Date(c.S_endSlider.getValue()[0]).format('YYYY-MM-dd'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud_threshold))
    .map(maskS2clouds);
  var S2Median = m.s2.median();
  Map.addLayer (S2Median, {max: 0.3, min: 0.0, bands: ['B4', 'B3', 'B2'],}, 'S2 median');
  Map.setCenter(26, 57, 6);
})
// FIRMS function
c.F_button.onClick(function () {
  var F_day = ee.Date(c.F_startSlider.getValue()[0])
  print(ee.Date(c.F_startSlider.getValue()[0]).format('YYYY-MM-dd'));
  m.firms.filterDate(ee.Date(c.F_startSlider.getValue()[0]).format('YYYY-MM-dd'))
  m.fires = m.firms.select('T21');
  var F_layer = ui.Map.Layer({eeObject:m.fires, visParams:firesVis});
  Map.add(F_layer)
  c.F_checkbox.onChange(function(checked) {
    if(checked){Map.add(F_layer)}
    else{Map.remove(F_layer)}})
  });
// Static function
c.Stat_button.onClick(function () {
  var band = c.Stat_selectBand.getValue();
  var S_layer = ui.Map.Layer({
  eeObject: m.static.select(m.staticInfo.bands[band].bname),
  visParams: m.staticInfo.bands[band].vis,
  });
  Map.add(S_layer)
c.Stat_checkbox.onChange(function(checked) {
    if(checked){Map.add(S_layer)}
    else{Map.remove(S_layer)}})
  });
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
// Map.add(c.Panel);
// Map.add(c.S_Panel);
c.split = ui.SplitPanel(c.Panel, c.S_Panel, "vertical")
ui.root.insert(0, c.split)
Map.add(c.F_Panel);
Map.add(c.Stat_Panel);
/**
 * UI Pattern Template
 * 
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 */
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
m.drawingTools = Map.drawingTools();
m.drawingTools.setShown(false);
while (m.drawingTools.layers().length() > 0) {
  m.layer = m.drawingTools.layers().get(0);
  m.drawingTools.layers().remove(m.layer);
}
m.dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
m.drawingTools.layers().add(m.dummyGeometry);
function clearGeometry() {
  m.layers = m.drawingTools.layers();
  m.layers.get(0).geometries().remove(m.layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  m.drawingTools.setShape('rectangle');
  m.drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  m.drawingTools.setShape('polygon');
  m.drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  m.drawingTools.setShape('point');
  m.drawingTools.draw();
}
m.corine = ee.Image('COPERNICUS/CORINE/V20/100m/2018');
var finalMask = m.corine.mask();
var maskOutCity = m.corine.gt(142);
finalMask = finalMask.multiply(maskOutCity);
// step 2 --> get the mask to remove the rocks/ice and add to the previous mask
var maskOutRocksIce = (m.corine.eq(331).or(m.corine.eq(332)).or(m.corine.eq(335))).not();
finalMask = finalMask.multiply(maskOutRocksIce);
// step 3 --> get the mask to remove the water bodies and add to the previous mask
var maskOutWater = m.corine.lt(511);
var finalMask = finalMask.multiply(maskOutWater);
// step 4 --> apply the mask to the original corine image
m.finalCorine = m.corine.updateMask(finalMask);
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
c.Panel = ui.Panel({
  style:
      {position: 'bottom-right', shown: false}
});
c.checkbox_c = ui.Checkbox('clip non-vegetated areas', false);
// c.areaPanel = ui.Panel({
//   style:
//       {height: '60px', width: '300px', position: 'bottom-right', shown: false}
// });
/*******************************************************************************
 * Composition * 
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
m.drawingTools.onDraw(ui.util.debounce(area, 500));
m.drawingTools.onEdit(ui.util.debounce(area, 500));
function area() {
 // Get the drawn geometry; it will define the reduction region.
  m.aoi = m.drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  m.drawingTools.setShape(null);
  m.clp = m.corine.clip(m.aoi)	
  m.clpm = m.finalCorine.clip(m.aoi)	
  m.Clp = ui.Map.Layer({eeObject: m.clp});
  m.Clpm = ui.Map.Layer({eeObject: m.clpm});
Map.add(m.Clp)
c.checkbox_c.onChange(function(checked) {
    if(checked){
      Map.clear();
      Map.add(c.checkbox_c);
      Map.add(controlPanel);
      Map.add(c.areaPanel);
      m.masked = m.clp.updateMask(finalMask);
      Map.addLayer(m.masked, {}, 'Burnable area (raster)');
    m.vectors = m.masked.reduceToVectors({
      geometry: m.aoi,
      crs: m.clp.projection(),
      scale: 100,
      geometryType: 'polygon',
      eightConnected: false,
      labelProperty: 'zone',
      //reducer: ee.Reducer.mean(),
    });
    Map.addLayer(m.vectors, {}, 'Burnable area (vector)');
    m.pix_area = ee.Image.pixelArea().updateMask(finalMask).divide(1000000).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: m.aoi,
      scale: 50,
      bestEffort: true
      })
c.button = ui.Button({
          label: 'Export vectors to Drive',
          // React to the button's click event.
          onClick: function() 
          {
          Export.table.toDrive({
      collection: m.vectors,
      description: 'exportTableExample',
      fileFormat: 'SHP'
    });
      }
    })
        Map.add(c.button);
    }
else{ Map.clear();
      Map.add(c.checkbox_c);
      Map.add(controlPanel);
      Map.add(c.button);
      Map.add(c.areaPanel);
      m.masked = m.clp;
      Map.addLayer(m.masked, {}, 'All area (raster)');
    m.vectors = m.masked.reduceToVectors({
      geometry: m.aoi,
      crs: m.clp.projection(),
      scale: 100,
      geometryType: 'polygon',
      eightConnected: false,
      labelProperty: 'zone',
      //reducer: ee.Reducer.mean(),
    });
    //print('my vectors: ', m.vectors);
    Map.addLayer(m.vectors, {}, 'All area (vector)');
    m.pix_area_all = ee.Image.pixelArea().divide(1000000).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: m.aoi,
      scale: 50,
      bestEffort: true
    })
    // m.txt_a = print("area of full area of interest: ", ee.Number(m.pix_area_all.get("area")).getInfo() + " km2");
    // if (!c.areaPanel.style().get('shown')) {
    // c.areaPanel.add(c.label_all);
    // c.areaPanel.style().set('shown', true);
    // } 
c.button = ui.Button({
          label: 'Export vectors to Drive',
          // React to the button's click event.
          onClick: function() 
          {
          Export.table.toDrive({
      collection: m.vectors,
      description: 'exportTableExample',
      fileFormat: 'SHP'
    });
      }
    })
}})
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Land cover',s.date_style2),
    ui.Label('Draw a geometry',s.date_style),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {backgroundColor: '#FFFFFF',position: 'bottom-right'},
  layout: null,
});
print()
controlPanel.add(c.checkbox_c);
Map.add(controlPanel);
Map.add(c.Title_panel);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/