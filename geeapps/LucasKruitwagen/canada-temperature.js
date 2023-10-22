var LSIB = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    NEXGDDP = ee.ImageCollection("NASA/NEX-GDDP");
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var tools = require('users/fitoprincipe/geetools:tools');
print (LSIB.filter(ee.Filter.eq('country_co','CA')))
var canada = ee.Feature(LSIB.filter(ee.Filter.eq('country_co','CA')).geometry())
Map.addLayer(canada,{},'Canada')
Map.centerObject(canada)
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
//print (LSIB)
var SUBTITLE_STYLE = {
  fontSize: '16px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
  stretch: 'horizontal'
};
var master_container = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{width: '300px'},
})
var global_label = ui.Label({
  value:'Global mean temperature: ',
  style:PARAGRAPH_STYLE,
})
var canada_label = ui.Label({
  value:'Canada mean temperature: ',
  style:PARAGRAPH_STYLE,
})
var showImage = function(val,widg){ //, year, month) {
  tools.map.removeLayerByName('Temperature')
  var year = val//year_slider.getValue()
  print ('showing image','year',year)
  var filt_sdate = ee.Date.fromYMD(year, 1, 1);
  var filt_edate = filt_sdate.advance(1, 'year');
  var image_min = NEXGDDP.select('tasmin').filter(ee.Filter.inList('scenario',['historical','rcp85'])).filterBounds(canada.geometry()).filterDate(filt_sdate, filt_edate).mean().clip(canada.geometry());
  var image_max = NEXGDDP.select('tasmax').filterBounds(canada.geometry()).filterDate(filt_sdate, filt_edate).mean().clip(canada.geometry());
  var mean_temp = ee.ImageCollection.fromImages([image_min.select(['tasmin'],['temp']),image_max.select(['tasmax'],['temp'])])
    .cast({'temp':'float'},['temp'])
    .mean()
    .subtract(ee.Image(273));
  var temp_params = {
    min: -30,
    max: 30,
    palette: ['blue', 'white', 'red']
  }
  var temp_layer = ui.Map.Layer(mean_temp, temp_params, 'Temperature')
  Map.layers().add(temp_layer)
  //canada_label.setValue('Canada mean temperature: '+ mean_temp.reduceRegion(ee.Reducer.mean(),canada.geometry(),10000).get('temp').getInfo())
  /*
  var canada_mean_temp = mean_temp.reduceRegion(ee.Reducer.mean(),canada.geometry(),10000).get('temp')
  print (canada_mean_temp)
  canada_mean_temp.evaluate(function(result) {
    canada_label.setValue('Canada mean temperature: ... loading ...')
    print (result.toFixed(2))
    canada_label.setValue('Canada mean temperature: '+ result.toFixed(2))
  })
  */
};
showImage(2018,null)
var year_slider = ui.Slider({
  min: 1970,
  max: 2099,
  value: 2018,
  step: 1,
  onChange: showImage,
  style: LABEL_STYLE
});
var title_label = ui.Label({
  value:'Canada Temperature',
  style:TITLE_STYLE,
})
var instructions_label = ui.Label({
  value:'Use the slider to adjust the imagery year. Imagery shows the yearly mean temperature, colormapped to -+30degC. Future projections are for rcp8.5 (i.e. BAD) emissions pathway, and reduce daily projections from approx. 20 climate models from CMIP5. Click the map to inspect the temperature at a specific point.',
  style:PARAGRAPH_STYLE,
})
var pt_label = ui.Label({
  value:'Clicked point temperature: ',
  style:PARAGRAPH_STYLE,
})
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  pt_label.setValue('Clicked point temperature: ...loading...')
  var year = year_slider.getValue()
  print ('showing image','year',year)
  var filt_sdate = ee.Date.fromYMD(year, 1, 1);
  var filt_edate = filt_sdate.advance(1, 'year');
  var image_min = NEXGDDP.select('tasmin').filter(ee.Filter.inList('scenario',['historical','rcp85'])).filterBounds(canada.geometry()).filterDate(filt_sdate, filt_edate).mean().clip(canada.geometry());
  var image_max = NEXGDDP.select('tasmax').filterBounds(canada.geometry()).filterDate(filt_sdate, filt_edate).mean().clip(canada.geometry());
  var mean_temp = ee.ImageCollection.fromImages([image_min.select(['tasmin'],['temp']),image_max.select(['tasmax'],['temp'])])
    .cast({'temp':'float'},['temp'])
    .mean()
    .subtract(ee.Image(273));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint = mean_temp.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('temp');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    pt_label.setValue('Clicked point temperature: '+result.toFixed(2)+'degC')
    // Add a label with the results from the server.
  });
});
Map.style().set('cursor', 'crosshair');
master_container.add(title_label)
master_container.add(instructions_label)
master_container.add(year_slider)
//master_container.add(global_label)
//master_container.add(canada_label)
master_container.add(pt_label)
ui.root.insert(0,master_container)