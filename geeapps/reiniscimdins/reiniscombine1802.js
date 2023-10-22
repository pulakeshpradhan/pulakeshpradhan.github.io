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
      min:-20,
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
// Corine data
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
s.date_style = {fontSize: '15px', 
                      color: '#0066cc',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both'};
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
// weather widgets
c.Panel = ui.Panel({style: {backgroundColor: '00005555',position:'bottom-left'}});
c.startSlider = ui.DateSlider('2018-01-01');
c.button = ui.Button('SHOOOOT!!!');
c.slider = ui.Slider({min:0, max:18, step : 6, value: 0})
c.drop = ui.Select(Object.keys(m.imgInfo.bands), null, "temperature");
c.checkbox = ui.Checkbox('Show layer', true);
c.start_day = ui.Label('Date: ', s.date_style);
c.cloud_cover = ui.Label('Forecast hour:', s.date_style);
c.type = ui.Label('Band:', s.date_style);
// Sentinel widgets
c.S_Panel = ui.Panel({style: {backgroundColor: '00005555',position:'top-left'}});
c.S_startSlider = ui.DateSlider('2021-05-01');
c.S_endSlider = ui.DateSlider('2021-05-02');
c.S_button = ui.Button('SHOOOOT!!!');
c.S_slider = ui.Slider({min:0, max:100, step : 1, value: 100})
c.S_checkbox = ui.Checkbox('Show layer', true);
c.S_start_day = ui.Label('Start date: ', s.date_style);
c.S_end_day = ui.Label('End date: ', s.date_style);
c.S_cloud_cover = ui.Label('Cloud cover:', s.date_style);
// Corine widgets
// c.C_Panel = ui.Panel({style: {height: '60px', width: '300px', backgroundColor: '00005555', position:'top-right', shown: false}});
c.C_checkbox = ui.Checkbox('mask out NB', false);
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
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
c.C_controlPanel = ui.Panel({style: {backgroundColor: '00005555', position:'top-right', shown: true},
  widgets: [
    ui.Label('1. Select a drawing mode.'),
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
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  // style: {position: 'bottom-left'},
  layout: null,
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
c.Panel.add(c.start_day);
c.Panel.add(c.startSlider);
c.Panel.add(c.type);
c.Panel.add(c.drop);
c.Panel.add(c.cloud_cover);
c.Panel.add(c.slider);
c.Panel.add(c.button);
c.Panel.add(c.checkbox);
// Sentinel
c.S_Panel.add(c.S_start_day);
c.S_Panel.add(c.S_startSlider);
c.S_Panel.add(c.S_end_day);
c.S_Panel.add(c.S_endSlider);
c.S_Panel.add(c.S_cloud_cover);
c.S_Panel.add(c.S_slider);
c.S_Panel.add(c.S_button);
c.S_Panel.add(c.S_checkbox);
// Corine
Map.add(c.C_checkbox)
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
  // var S2Median = m.s2.median();
  // S2Median = (S2Median, {max: 0.3, min: 0.0, bands: ['B4', 'B3', 'B2'],}, 'S2 median');
  // Map.setCenter(26, 57, 6);
  // var s2 = ui.Map.Layer({eeObject:S2Median});
  // Map.add(s2)
  // c.S_checkbox.onChange(function(checked) {
  //   if(checked){Map.add(s2)}
  //   else{Map.remove(s2)}})
  var S2Median = m.s2.median();
  Map.addLayer (S2Median, {max: 0.3, min: 0.0, bands: ['B4', 'B3', 'B2'],}, 'S2 median');
  Map.setCenter(26, 57, 6);
});
//  Corine function
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
c.C_checkbox.onChange(function(checked) {
    if(checked){
      Map.clear();
      Map.add(c.C_checkbox);
      Map.add(c.C_controlPanel);
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
    //print('my vectors: ', m.vectors);
    Map.addLayer(m.vectors, {}, 'Burnable area (vector)');
    m.pix_area = ee.Image.pixelArea().updateMask(finalMask).divide(1000000).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: m.aoi,
      scale: 50,
      bestEffort: true
      })
    // m.txt_m = print("area of potential burned area: ", ee.Number(m.pix_area.get("area")).getInfo() + " km2");
      // m.txt_m = ee.Number((m.pix_area.get("area")).getInfo() + " km2")
       m.txt_m = m.pix_area.get("area")
    // m.pix_area_all = ee.Image.pixelArea().divide(1000000).reduceRegion({
    //   reducer: ee.Reducer.sum(),
    //   geometry: m.aoi,
    //   scale: 50,
    //   bestEffort: true
    // })
    // print("area of full area of interest: ", ee.Number(m.pix_area_all.get("area")).getInfo() + " km2");
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
        Map.add(c.button);
        Map.add(c.Panel);
        Map.add(c.S_Panel); 
    }
else{ Map.clear();
      Map.add(c.C_checkbox);
      Map.add(c.C_controlPanel);
      Map.add(c.button);
      // Map.add(c.areaPanel);
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
}
Map.add(c.Panel);
Map.add(c.S_Panel); 
})}
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
Map.add(c.Panel);
Map.add(c.S_Panel);
Map.add(c.C_controlPanel);