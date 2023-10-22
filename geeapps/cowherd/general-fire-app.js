//Paradise Fire Animation from geog285 re-centered on other fires
//authors: Marianne Cowherd, Jeff Chambers, Yanlei Fang, and Jared Stapp
////////////////////////////////////////////////////////
///////Insert packages from Gennadii Donchyts///////////
////////////////////////////////////////////////////////  
var animation = require('users/gena/packages:animation');
var utils = require('users/gena/packages:utils');
var palettes = require('users/gena/packages:palettes');
//////////////////////////////
/////// Parameters ///////////
//////////////////////////////
// Create color palette to correspond with Data Quality Flag categories.
var DQFVisParam = {
  min: 0,
  max: 5,
  palette: [
    'FFFF00',    // 0:  Good quality fire pixel
    '8BC34A',    // 1:  Good quality fire-free pixel
    'B3E5FC',    // 2:  Invalid pixel due to opaque cloud
    '2196F3',    // 3:  Invalid pixel due to to surface type, sunglint,
                 //     LZA threshold exceeded, off earth, or missing input data
    'B2EBF2',    // 4:  Invalid pixel due to bad input data
    'C5CAE9',    // 5:  Invalid pixel due to algorithm failure
  ]
 };
 var timezones = {
  Hawaii: 'US/Hawaii',
  Alaska: 'US/Alaska',
  Pacific: 'US/Pacific',
  Arizona: 'US/Arizona',
  Mountain: 'US/Mountain',
  Central: 'US/Central',
  Eastern: 'US/Eastern',
  UTC: 'UTC'
};
var fire_places = {
  Caldor: [ -120.331433, 38.601810, '2021-08-18T10:30','UTC',40],
  Dixie: [-120.919, 40.1419, '2021-08-05T21:30','UTC',50],
  // Lava: [-122.31252, 41.35687, ee.Date(Date.now()).format().slice(0,16),'UTC'],
  // Shell: [-118.90908, 34.94175, ee.Date(Date.now()).advance(-5,'hour').format().slice(0,16),'UTC'],
  // WillowLive: [-121.58945, 36.18676,ee.Date(Date.now()).format().slice(0,16),'UTC'],
  // MtHoodLive: [-121.43993, 45.08488, ee.Date(Date.now()).format().slice(0,16),'UTC'],
  Willow: [-121.58945, 36.18676,'2021-06-18T15:00','US/Pacific',30],
  MtHood: [-121.43993, 45.08488, '2021-06-19T19:00','US/Pacific','UTC',30],
  Creek: [-119.38,37.22,'2020-09-06T08:00','US/Pacific',30],
  Palisades: [-118.57333, 34.08458, '2021-05-15T21:00','US/Pacific',30],
  Camp: [-121.544, 39.817, '2018-11-09T06:00', 'US/Pacific',30],
  Slater: [ -123.35080608244088, 41.9123032904128, '2020-09-08T20:00','US/Pacific',30],
  Mendocino: [ -122.88610561998834, 39.188171086755986,'2020-07-19T12:00','US/Pacific',30],
  Custom: ['NaN' ],
  Live: ['Live']
};
var fire_mask_codes = [10, 30, 11, 31, 12, 32, 13, 33, 14, 34, 15, 35];
var confidence_values = [1.0, 1.0, 0.9, 0.9, 0.8, 0.8, 0.5, 0.5, 0.3, 0.3, 0.1, 0.1];
var affected_area_palette = ['white', 'yellow', 'orange', 'red', 'purple'];
var default_confidence_value = 0;
//////////////////
/// FUNCTIONS ////
//////////////////
//plot fire mask codes --> "confidence values" from perimeter code
var map_from_mask_codes_to_confidence_values = function(image) {
return image
.clip(area_of_interest)
.remap(fire_mask_codes, confidence_values, default_confidence_value);
};
var limit = function(i){
  var mask = i.gt(0.1);
  var p = i.updateMask(mask);
  return p;
};
var liveFireButton = ui.Checkbox('Live', false);
var panel3 = ui.Panel({style: {width: '100px', position: 'top-center'}})
    .add(liveFireButton)
//clears previous widgets, establishes user-input datetime
var setupmap = function(key){
  Map.clear();
  Map.setOptions('HYBRID');
  Map.style().set({cursor:'crosshair'});
  //we do not like if/else statements apparently: re-cast to ee.Algorithms.If()
  var fireDate;
  if(fire_places[key][0]!='NaN' && fire_places[key][0]!='Live'){
    var point = ee.Geometry.Point(fire_places[key][0],fire_places[key][1]);
    fireDate = fire_places[key][2];
    var tz = fire_places[key][3];
    // tz = fire_places[key][3];
    var buffer = fire_places[key][4];
    make_map(point,fireDate,tz, 5, buffer ,key); //5 is duration (hours), 30 is radius (kilometers)
    Map.add(panel3);
    liveFireButton.onChange(function(checked) {
      fireDate = ee.Algorithms.If(checked, ee.Date(Date.now()).advance(-2,'hour').format().slice(0,16),fire_places[key][2])
      // Makes fire pseudo-real-time
      Map.clear();
      Map.setOptions('HYBRID');
      Map.style().set({cursor:'crosshair'});
      make_map(point,fireDate,tz, 5, 30,key)
      Map.add(panel3);
    });
  }else{ 
    if(fire_places[key][0]==='Live'){
      ui.util.getCurrentPosition(function(coords){
      var crd = coords.getInfo().coordinates;
      var temp = JSON.stringify(crd);
      var split = temp.indexOf(',');
      var lon = (temp.slice(1,split));
      var lat = (temp.slice(split+1,-1));
      var newDate = new Date();
      var nowDate = JSON.stringify(newDate).slice(1,11);
      var nowTime = JSON.stringify(newDate).slice(12,17);
      var time = nowTime;
      var tz = 'UTC';
      Map.clear();
      Map.setOptions('HYBRID');
      //add this back in when goes comes back
      var dateString = ee.String(nowDate).cat('T').cat(ee.String(nowTime)); 
      var timeDuration = 4;
      var point = ee.Geometry.Point(ee.Number(Number(lon)), ee.Number(Number(lat)));
      var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Selected Point');
      Map.layers().set(0, dot);
      var buffer = 30;
      var date2 = ee.Date(Date.now()).advance(-2,'hour').format().slice(0,16);
      make_map(point,date2,tz,timeDuration, buffer, key);
      });
    } else{ 
    var resetButton = ui.Button({label: 'Reset', 
      style:{stretch: 'horizontal',
             margin: '0 0 0 0',
             padding: '0'
      }});
    var nowButton = ui.Button({label: 'Use Current Time'});
    var nowButton2 = ui.Button({label: 'Use Current Time'});
    var hereButton = ui.Button({label: 'Use Current Location'});
    fireDate = ui.Textbox('YYYY-MM-DD');
    fireDate.style().set('stretch', 'horizontal');
    var time = ui.Textbox('HH:MM');
    time.style().set('stretch', 'horizontal');
    //time.style().set('width', '70px');
    var duration = ui.Textbox({value:1});
    duration.style().set('stretch', 'horizontal');
    var latLabel = ui.Label('Lat:');
    var latBox = ui.Textbox({value:37.32});
    latBox.style().set('stretch', 'horizontal');
    var lonLabel = ui.Label('Lon:');
    var lonBox = ui.Textbox({value:-119.38});
    lonBox.style().set('width', '85px');
    var bufferBox = ui.Textbox({value:20});
    bufferBox.style().set('stretch', 'horizontal');
    var submitButton = ui.Button({label: 'Submit', style:{stretch: 'horizontal'}});
    var note1 = ui.Label({
      value: 'Fire images will not appear before 2017-05-24 (GOES-16), and better images for the western US (GOES-17) begin 2018-08-27.',
      style: {
        fontWeight: 'bold',
        fontSize: '9px',
        margin: '0px 4px 4px 10px',// 1top 2right 3bottom 4left
        padding: '0'
      }
    });
    var note2 = ui.Label({
      value: 'Maximum duration of 5 hr is recommended.',
      style: {
        fontWeight: 'bold',
        fontSize: '9px',
        margin: '0px 4px 4px 10px',// 1top 2right 3bottom 4left
        padding: '0'
      }
    });
    var note3 = ui.Label({
      value: 'Setting a smaller duration or buffer will help the animation load faster.',
      style: {
        fontWeight: 'bold',
        fontSize: '9px',
        margin: '4px 4px 4px 10px',// 1top 2right 3bottom 4left
        padding: '0'
      }
    });
    var selectTZ = ui.Select({items: Object.keys(timezones), value: 'Pacific'});
    var panel = ui.Panel({style: {width: '290px', position: 'bottom-right'}})
        .add(ui.Label('Define the time range', {fontWeight: 'bold'}))
        .add(nowButton)
        .add(hereButton)
        .add(ui.Panel([ui.Label('Date:'), fireDate], ui.Panel.Layout.Flow('horizontal')))
        .add(note1)
        .add(ui.Panel([ui.Label('Time:'), time], ui.Panel.Layout.Flow('horizontal')))
        .add(ui.Panel([ui.Label('Time Zone:'),selectTZ],ui.Panel.Layout.Flow('horizontal')))
        .add(ui.Panel([ui.Label('Duration (hr):'), duration], ui.Panel.Layout.Flow('horizontal')))
        .add(note2)
        .add(ui.Label('Click on the map or enter coordinates', {fontWeight: 'bold'}))
        .add(ui.Panel([ui.Panel([lonLabel, lonBox, latLabel, latBox],ui.Panel.Layout.Flow('horizontal'))],null,{stretch: 'horizontal'}))
        .add(ui.Label('Define a buffer around the point', {fontWeight: 'bold'}))
        .add(ui.Panel([ui.Label('Buffer (km):'), bufferBox], ui.Panel.Layout.Flow('horizontal')))
        .add(note3)
        .add(submitButton);
    var panel2 = ui.Panel({style: {width: '100px', position: 'bottom-right'}})
        .add(resetButton)
    // Add a red dot for the intial point
    point = ee.Geometry.Point(lonBox.getValue(), latBox.getValue());
    var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Selected Point');
    Map.layers().set(0, dot);
    Map.onClick(function(coords) {
      // Create or update the location label (the second widget in the panel)
      var location = 'lon: ' + coords.lon.toFixed(5) + ' ' +
                     'lat: ' + coords.lat.toFixed(5);
      lonBox.setValue(coords.lon.toFixed(5));
      latBox.setValue(coords.lat.toFixed(5));
      // Add a red dot for the point clicked on.
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Selected Point');
      Map.layers().set(0, dot);
    });
    Map.add(panel);
    Map.add(panel2);
    hereButton.onClick(function(){
      ui.util.getCurrentPosition(function(coords){
      var crd = coords.getInfo().coordinates;
      var temp = JSON.stringify(crd);
      var split = temp.indexOf(',');
      lonBox.setValue(temp.slice(1,split));
      latBox.setValue(temp.slice(split+1,-1));
      });
    });
    //set a callback function for when the user clicks now
    nowButton.onClick(function(){
      var newDate = new Date();
      var nowDate = JSON.stringify(newDate).slice(1,11);
      var nowTime = JSON.stringify(newDate).slice(12,17);
      //var newDate = ee.Date(Date.now()).advance(-10,'hour').format().slice(0,10)
      //var newTime = ee.Date(Date.now()).advance(-10,'hour').format().slice(11,16)
      fireDate.setValue(nowDate);
      time.setValue(nowTime);
      selectTZ.setValue('UTC');
    });
    // set a callback function for when the user clicks submit.
    submitButton.onClick(function(){
      Map.clear();
      Map.add(panel);
      Map.add(panel2);
      Map.setOptions('HYBRID');
      var dateString = ee.String(fireDate.getValue()).cat('T').cat(ee.String(time.getValue()));
      var timeDuration = duration.getValue();
      var point = ee.Geometry.Point(ee.Number(Number(lonBox.getValue())), ee.Number(Number(latBox.getValue())));
      var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Selected Point');
      Map.layers().set(0, dot);
      var tz = timezones[selectTZ.getValue()];
      var buffer = ee.Number(Number(bufferBox.getValue()));
      make_map(point,dateString,tz,timeDuration, buffer, key);
    });
    // set a callback function for when the user clicks reset
    resetButton.onClick(function(){
      Map.clear();
      Map.setOptions('HYBRID');
      var select = ui.Select({
        items: Object.keys(fire_places),
        onChange: setupmap
      });
      select.setPlaceholder('Choose a fire...');
      Map.add(select);
    });
  }
  }
};
var make_map = function(point,end,tz,duration,buffer,key){
  var select2 = ui.Select({
    items: Object.keys(fire_places), value: key,
    onChange:
    setupmap
  });
  Map.add(select2);
  var radius_meters = ee.Number(buffer).multiply(1000); //convert km to m
  var area_of_interest = point.buffer(radius_meters);
  var endDate = ee.Date(end,tz);
  var duration2 = -Number(duration);
  var startDate = endDate.advance(duration2,'hour');
  //only show where there is fire confidence
  Map.centerObject(point,11);
  // Pixel regularization
  function dateFromDay(year, doy){
    var date = ee.Date(year); // initialize a date in `year-01-01`
    date = date.advance((ee.Number.parse(doy)),'day');
    date = date.advance(-1,'day'); //because you initialize at day 1 and then anvance
    var month = ee.String(date.get('month'));
    var day = ee.String(date.get('day'));
    return month.cat('-').cat(day);
  }
  var goes_16_data = ee.ImageCollection('NOAA/GOES/16/FDCF')
  .filterDate(startDate, endDate)
  .filterBounds(area_of_interest)
  .select(['Mask']);
  var goes_17_data = ee.ImageCollection('NOAA/GOES/17/FDCF')
  .filterDate(startDate,endDate)
  .filterBounds(area_of_interest)
  .select(['Mask']);
  var DQF = ee.ImageCollection('NOAA/GOES/17/FDCF')
  .filterDate(startDate,endDate)
  .filterBounds(area_of_interest)
  .first()
  .select(['DQF']);
  var goes_prepare = ee.Algorithms.If(goes_17_data.size().eq(0),goes_16_data.map(function(i){return i}),goes_17_data.map(function(i){return i}));
  goes_prepare = ee.ImageCollection(goes_prepare);
  var isImage = ee.Algorithms.If(goes_prepare.size().eq(0),'No GOES images exist for this time','');
  //print(isImage)
  //print(goes_prepare)
  //Map.addLayer(DQF, DQFVisParam, 'Fire Data Quality Flags', true, 0.7);
  var goes_animate = goes_prepare.map(function(i){
      i = i.clip(area_of_interest);
      i = i.select(['Mask']);
      i = i.remap(fire_mask_codes,confidence_values, default_confidence_value);
      i = i.clip(area_of_interest);
      i = i.resample('bicubic'); // resampling smooth the edges of square pixels
      var name = ee.String(i.get('system:id'));
      var year = name.slice(18,22);
      var doy = name.slice(22,25);
      var date = dateFromDay(year,doy);
      var hour = name.slice(25,27);
      var minute = name.slice(27,29);
      name = year.cat('-').cat(date).cat(' ').cat(hour).cat(':').cat(minute);
      i = i.set({ label: name }); //set up the label for each image by slicing the system id 
      return i;
  });
  //could also use affected_area_palette
  animation.animate(goes_animate.map(limit), {
    vis: { min: 0, max: 1, palette: palettes.cb.YlOrRd[9].slice(0).reverse(), opacity: 0.8 },
    label: 'label',
    maxFrames: goes_animate.size(),
    timeStep: 100
  });
  var legend = ui.Panel({
    style: {
      position: 'top-right',
      padding: '8px 15px'
    }
  });
  // Create and add the legend title.
  var legendTitle1 = ui.Label({
    value: 'Animation will start when all layers load after',
    style: {
      fontWeight: 'bold',
      fontSize: '10px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  var legendTitle2 = ui.Label({
    value: 'a few minutes. Please press play to start.',
    style: {
      fontWeight: 'bold',
      fontSize: '10px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  legend.add(legendTitle1).add(legendTitle2);
  Map.add(legend);
};
var select = ui.Select({
  items: Object.keys(fire_places),
  onChange:
    setupmap
});
//Set a place holder.
select.setPlaceholder('Choose a fire...');
Map.add(select);
Map.setOptions('HYBRID');