var aoi = 0
// Import all the scripts
var aoi_filter = require('users/Amravati/UI:aoiFilter');
var mapFloods = require('users/Amravati/UI:mapFloods');
var zscore = require('users/Amravati/UI:zscore');
var floodLegend = require('users/Amravati/UI:floodLegend');
var generateChart = require('users/Amravati/UI:AvailabilityGraph')
//generateCollectionChart
// Import the aoiFilter module and create nested
// dictionary for level0, level1 & level 2 boundaries (slower)
// Better is to create and store the dictionary beforehand,
// rather than having to compute it everytime.
var country_name = aoi_filter.countries
// Define a function to update aoi when drop down is selected
function updateAoi(level_0, level_1){
  //print('updating AOI')
  aoi = ee.FeatureCollection("FAO/GAUL/2015/level2")
        .filter(ee.Filter.equals('ADM0_NAME', level_0))
        .filter(ee.Filter.equals('ADM1_NAME', level_1))
        .geometry();
}
updateAoi('India', 'Bihar')
// Define a default start date
var start_date = [ee.Date('2020-05-01'), ee.Date('2020-07-20')];
var advance_days = [60, 8];
// Modify the function from DeVries to fit the needs
function getFloodImage(s1_collection_t1, s1_collection_t2){
  // Z-score thresholds
  var zvv_thd = -3;
  var zvh_thd = -3;
  // Historical open water probability threshold (pow; %) 
  var pow_thd = 50;
  // Historical inundation probability threshold (pin; %)
  var pin_thd = 25;
  // Compute Z-scores per instrument mode and orbital direction
  var z_iwasc = zscore.calc_zscore(s1_collection_t1, s1_collection_t2.mean(), 'IW');
  //var z_iwdsc = zscore.calc_zscore(s1_collection_t1, s1_collection_t2, 'IW', 'DESCENDING');
  //var z_smasc = zscore.calc_zscore(s1_collection_t1, s1_collection_t2, 'SM', 'ASCENDING');
  //var z_smdsc = zscore.calc_zscore(s1_collection_t1, s1_collection_t2, 'SM', 'DESCENDING');
  var z = ee.ImageCollection.fromImages([z_iwasc])
    .sort('system:time_start');
  // Run flood mapping algorithm on latest Z-score
  // Change `false` to `true` to use DSWE algorithm for historical inundation
  // Note that this will take longer than just using the JRC surface water data (default)
  var floods = mapFloods.mapFloods(z.mean(), zvv_thd, zvh_thd, pow_thd, pin_thd, false);
  return(floods.clip(aoi))
}
// Create a function for getting updated Sentinel-1 collection
function getSentinel1WithinDateRange(date, span){
  var filters = [
    ee.Filter.listContains("transmitterReceiverPolarisation", "VV"),
    ee.Filter.listContains("transmitterReceiverPolarisation", "VH"),
    ee.Filter.or(
      ee.Filter.equals("instrumentMode", "IW"),
      ee.Filter.equals("instrumentMode", "SM")
      ),
    //ee.Filter.equals('orbitProperties_pass', "ASCENDING"),
    ee.Filter.bounds(aoi),
    ee.Filter.eq('resolution_meters', 10),
    ee.Filter.date(date, date.advance(span+1, 'day'))
  ];
  var s1_collection = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(filters)
  return s1_collection;
}
function createS1Composite(s1_collection){
  var composite = ee.Image.cat([
    s1_collection.select('VH').mean(),
    s1_collection.select('VV').mean(),
    s1_collection.select('VH').mean()
    ]);
  return composite.clip(aoi);
}
// Create a function for getting updated Sentinel-2 collection
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);//.divide(10000);
}
function getSentinel2WithinDateRange(date, span){
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                    .filterBounds(aoi)
                    .filterDate(date, date.advance(span+1, 'day'))
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
                    .map(maskS2clouds)
                    .select('B4', 'B3', 'B2');
  return sentinel2.mean().clip(aoi)
}
// Create a function to generate Image dynamically
function getS1Image(index){
  var s1_collection = getSentinel1WithinDateRange(start_date[index], advance_days[index]);
  return createS1Composite(s1_collection);
}
function getS2Image(index){
  return getSentinel2WithinDateRange(start_date[index], advance_days[index]);
}
//var s1RawVizParams = {'min': -20, 'max': -10};
var s1RawVizParams = {min: [-25, -20, -25], max: [0, 10, 0]}
var s2RawVizParams = {bands: ['B4', 'B3', 'B2'], max: 3048, gamma: 1};
var show_left_sar = true
var show_right_sar = true
var show_left_optical = false
var show_right_optical = false
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = (defaultValue == '0') ? ui.Label("Pre-flood dates") : ui.Label("Post-flood dates");
  var show_optical = (defaultValue == '0') ? show_left_optical : show_right_optical
  var show_sar = (defaultValue == '0') ? show_left_sar : show_right_sar
  var controlPanel = ui.Panel({style: {position: position, width:'15%'}});
  // Add text to point towards the chart
  controlPanel.add(
    ui.Label('Data availability chart:',
      {
        stretch: 'horizontal',
        textAlign: 'left',
        //maxWidth : '200px'
      })
  );
  // This function changes the given map to show the selected image.
  function updateMap() {
    mapToChange.layers().set(0, ui.Map.Layer(getS1Image(defaultValue), s1RawVizParams, 'Sentinel-1', show_sar));
    mapToChange.layers().set(1, ui.Map.Layer(getS2Image(defaultValue), s2RawVizParams, 'Sentinel-2', show_optical));
    if (defaultValue == 1){
      mapToChange.layers().set(2, ui.Map.Layer(
        getFloodImage(getSentinel1WithinDateRange(start_date[0], advance_days[0]), 
                      getSentinel1WithinDateRange(start_date[1], advance_days[1])), 
        {palette: mapFloods.palette}, 'Flood Map', false));
    }
  }
  // Add dropdown for states first so that
  // it can be updated from within country dropdown
  var countryDD = ui.Select({items:[], placeholder:'Loading..', style:{fontSize:'8px', color:'red'}})
  var statesDD = ui.Select([], 'Waiting for country..')
  var countryNames = ee.List(Object.keys(country_name))
  //print(countryNames)
  countryNames.evaluate(function(states){
    countryDD.items().reset(states)
    countryDD.setPlaceholder('Select a country')
    countryDD.onChange(function(state){
      // once you select a state (onChange) get all counties and fill the dropdown
      statesDD.setPlaceholder('Loading...')
      var counties = ee.List(country_name[state]);
      //print(counties)
      counties.evaluate(function(countiesNames){
        statesDD.items().reset(countiesNames)
        statesDD.setPlaceholder('Select a state')
      })
    })
  })
  statesDD.onChange(function(value){
    print('State updated', value)
    updateAoi(countryDD.getValue(), value)
    // Using updateMap() function here will only update one map
    updateBothMapPanel()
  })
  // Add the date slider for both the maps
  var dateSlider = ui.DateSlider({
    // MM-DD-YYYY
    start: '01-01-2015',
    period: 1,
    onChange:function renderedDate(dateRange){
      start_date[defaultValue] = dateRange.start();
      updateMap();
      //updateTitle(defaultValue);
      updateFloodMap()
      updateChart(mapToChange, defaultValue, controlPanel);
    }});
  // Set the default date of the date slider from the actual map dates
  dateSlider = dateSlider.setValue(start_date[defaultValue].format('Y-MM-dd').getInfo());
  // Add the text box for users to enter the desired span
  var text_box = ui.Textbox({
    placeholder: "Succeeding days - e.g. "+String(advance_days[defaultValue]),
    onChange: function updateDate(text){
      advance_days[defaultValue] = Number(text);
      updateMap();
      //updateTitle(defaultValue);
      updateFloodMap();
      updateChart(mapToChange, defaultValue, controlPanel);
    }});
  // Set a common title
  var title = ui.Label('Flood Mapper',
  {
    stretch: 'horizontal',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
  });
  // use the legend module to create the legend for flood layer
  var legend = floodLegend.legend();
  // Create main control panel
  if(defaultValue == 0){
    var dd_heading = ui.Label("Select area of interest:")
    controlPanel.add(dd_heading)
    controlPanel.add(countryDD)
    controlPanel.add(statesDD)
  }
  controlPanel.add(label)
  controlPanel.add(dateSlider)
  controlPanel.add(text_box)
  // dummy panel to add on the either side
  var dummyPanel = ui.Panel({
    //layout: ui.Panel.Layout.flow('vertical'),
    widgets: [], 
    style: {width:'15%'}});
  //mapToChange.add(controlPanel);
  mapToChange.add(legend);
  mapToChange.add(title);
  return [controlPanel, dummyPanel];
}
// Create left and right maps
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var left_collapse = addLayerSelector(leftMap, 0, 'top-left');
var left_dummy = left_collapse[1];
left_collapse = left_collapse[0];
var right_collapse = addLayerSelector(rightMap, 1, 'top-right');
var right_dummy = right_collapse[1];
right_collapse = right_collapse[0];
var collapse = [left_collapse, right_collapse]
// Create a function that takes the checkbox boolean
// value of the two layers of both the maps and updates
// the variable. This function will be called before the 
// updateMap funtion.
function updateVisibility(){
  // Use the checkbox information to update the layers
  // in both the maps. 0 is SAR, 1 is optical.  
  show_left_sar = leftMap.layers().get(0).getShown()
  show_right_sar = rightMap.layers().get(0).getShown()
  show_left_optical = leftMap.layers().get(1).getShown()
  show_right_optical = rightMap.layers().get(1).getShown()
}
// This function is called only when 
// a new state is selected
function updateBothMapPanel(){
  updateVisibility()
  // Add Sentinel-1 images to both the maps
  leftMap.layers().set(0, ui.Map.Layer(getS1Image(0),s1RawVizParams, 'Sentinel-1', show_left_sar));
  rightMap.layers().set(0, ui.Map.Layer(getS1Image(1),s1RawVizParams, 'Sentinel-1', show_right_sar));
  // Add Sentinel-2 images to both the maps  
  leftMap.layers().set(1, ui.Map.Layer(getS2Image(0),s2RawVizParams, 'Sentinel-2', show_left_optical));
  rightMap.layers().set(1, ui.Map.Layer(getS2Image(1),s2RawVizParams, 'Sentinel-2', show_right_optical));
  // Update the flood map
  updateFloodMap()
  leftMap.centerObject(aoi, 7)
}
// Update flood map
function updateFloodMap(){
  //print(rightMap.getBounds())
  rightMap.layers().set(2, ui.Map.Layer(
        getFloodImage(getSentinel1WithinDateRange(start_date[0], advance_days[0]), 
                      getSentinel1WithinDateRange(start_date[1], advance_days[1])), 
        {palette: mapFloods.palette}, 'Flood Map', false));
}
//print(leftMap.widgets().get(1))
// Update availability graph
function updateChart(map, defaultValue, controlPanel){
  var chart = generateChart.generateCollectionChart(
    getSentinel1WithinDateRange(start_date[defaultValue], advance_days[defaultValue])
    )
  if (map.widgets().length()>1){
    collapse[defaultValue].widgets().set(1, chart)
  }else{
    controlPanel.add(chart)
  }
  //var frequency_panel = ui.Panel({widgets: [chart], style: {position: 'bottom-left'}});
  //map.widgets().set(0, frequency_panel)
}
//print(left_dummy, right_dummy)
var leftPiece = ui.Panel(
  [
    collapse[0],
    leftMap,
    left_dummy
    ],
    ui.Panel.Layout.Flow('horizontal', true), {stretch: 'both'});
var rightPiece = ui.Panel(
  [
    right_dummy,
    rightMap,
    collapse[1]
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftPiece,
  secondPanel: rightPiece,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
function refresh(){
  ui.root.widgets().reset([splitPanel]);
}
refresh();
var linker = ui.Map.Linker([leftMap, rightMap]);
//rightMap.centerObject(aoi, 7);
leftMap.centerObject(aoi, 7);