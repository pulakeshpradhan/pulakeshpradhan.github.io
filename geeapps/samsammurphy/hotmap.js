var sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
// DEPENDENCIES
var hotmap = require('users/samsammurphy/HOTMAP:HOTMAP');
// URL parameters
var zoom = ui.url.get('zoom', 10);
var target_lon = ui.url.get('target_lon', 147.89687265198546);
var target_lat = ui.url.get('target_lat', -32.5868899964412);
var target_location = ee.Geometry.Point(target_lon, target_lat);
var mapcenter_lon = ui.url.get('mapcenter_lon',target_lon);
var mapcenter_lat = ui.url.get('mapcenter_lat',target_lat);
var fontfamily = ui.url.get('image', null);
var tutorial_onoff = ui.url.get('tutorial', true);
var image_date = ee.Date(ui.url.get('image_date', Date.now()));
// static globals
var target_color = 'cyan';
var target_selector = 'disabled';
var wavebands = ['blue','green','red','nir','swir1','swir2']
var s2_wavebands = ['B2','B3','B4','B8A','B11','B12']
var fontfamily = 'MS Gothic';
// datetime globals
var now = ee.Date(Date.now())
var daterange_start = image_date.advance(-30, 'days')
var daterange_stop = image_date.advance(20, 'days')
var recent_sentinel2 = sentinel2.filterDate(now.advance(-10, 'days'), now)
var youngest_sentinel2_asset = find_nearest_image(recent_sentinel2, 'COPERNICUS/S2/', s2_wavebands, now)
// var youngest_sentinel2_date = ee.Image(youngest_sentinel2_asset.getInfo()).date()
// global image variable
var image = null;
// LAYOUT
  // CUSTOM MAIN COMPONENTS (flow order)
  ui.root.clear();
  var tutorial = ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style:{width: '300px'}});
  var map = ui.Map()
  var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style:{width: '300px'}});
  ui.root.add(tutorial);
  ui.root.add(map);
  ui.root.add(panel);
  // TUTORIAL panel (flow widgets)
  var title = 'Tutorial';
  var p1 = "This is a wildfire detection app";
  var p2 = "The main controls are in the panel to the right";
  var p3 = "'Select New Target' to update the target location on the map for wildfire detection";
  var p4 = "'Run Wildfire Detection' to find fires in a new location";
  var p5 = "The most recent image is displayed by default. Navigate through the satellite archive using 'previous' and 'next'. Date and time is in UTC.";
  var p6 = "The 'Layers' menu has the name of the layers on the map";
  var p7 = "The 'Search Places' toolbar can search for places by name";
  tutorial.add(ui.Label(title,{fontWeight:'bold'}));
  tutorial.add(ui.Label(p1));
  tutorial.add(ui.Label(p2));
  tutorial.add(ui.Label(p3));
  tutorial.add(ui.Label(p4));
  tutorial.add(ui.Label(p5));
  tutorial.add(ui.Label(p6));
  tutorial.add(ui.Label(p7));
  tutorial.style().set({'shown': tutorial_onoff});
  // MAP
    // MAP INFO panel (absolute widgets)
    var map_info = ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style:{position: 'bottom-left'}});
    var minititle = ui.Label('Map information', {fontWeight:'bold'});
    var label_num_hot = ui.Label('...')
    var label_lon = ui.Label('target lon: '+target_lon);
    var label_lat = ui.Label('target lat: '+target_lat);
    map_info.add(minititle);
    map_info.add(ui.Panel([ui.Label('Active Fire Fronts = '), label_num_hot], ui.Panel.Layout.flow('horizontal')))
    map_info.add(label_lon);
    map_info.add(label_lat);
    map.add(map_info);
    // SHARE button
    var share_button = ui.Button('Share', share_button_event, false,
        {position: 'bottom-center',
        backgroundColor: '#aaaaff',
        color: '#8d5fd3',
        border: 'none',
        fontFamily: 'monospace',
      });
    var toast = ui.Label('copy the url to share this map view', 
        {position: 'bottom-center', 
        shown:false,
        color: '#8d5fd3',
        fontFamily: 'monospace'
        })
    map.add(share_button);
    map.add(toast);
  // CONTROL panel
  var label_panel_title = ui.Label('HOTMAP',{fontWeight:'bold', fontSize:'16pt', fontFamily:fontfamily});
  var label_panel_subtitle1 = ui.Label('Wildfire detection using Sentinel 2',{fontFamily:fontfamily});
  var button_select_target = ui.Button('Select New Target', select_target_button_event, false, {stretch:'horizontal'});
  var button_run_detection = ui.Button('Run Wildfire Detection', run_detection_event, true, {stretch:'horizontal', color:'rgb(100, 100, 100)'})
  var button_previous = ui.Button('previous', previousImage, false, {stretch:'horizontal'})
  var button_next = ui.Button('next', nextImage, false, {stretch:'horizontal'})
  var buttons_previous_next = ui.Panel([button_previous, button_next], ui.Panel.Layout.flow('horizontal'));
  var label_image_date = ui.Label('...', {fontFamily:fontfamily});
  var showTutorial = ui.Checkbox('tutorial', tutorial_onoff, showTutorial_event);
  var showDisclaimer = ui.Checkbox('disclaimer',false, showDisclaimer_event);
  var label_disclaimer = ui.Label('This app is a prototype aimed to inspire better use of satellite data for wildfire detection. However, it will fail to detect, or incorrectly label, fires. You should not rely on this app for critical knowledge, instead use official government data and warning systems for your country and/or region.',{shown:false});
  var label_contact = ui.Panel([ui.Label('Contact', {fontWeight:'bold'}), ui.Label('sam@geospatialdatascience.co.uk')])
  var label_website = ui.Label('Website',{}, 'https://samsammurphy.com/')
  var label_linkedin = ui.Label('LinkedIn',{}, 'https://www.linkedin.com/in/samsammurphy/')
  var label_github = ui.Label('Github',{}, 'https://github.com/samsammurphy')
  var contact_details = ui.Panel([label_website, label_linkedin, label_github], ui.Panel.Layout.flow('horizontal'))
  panel.add(label_panel_title);
  panel.add(label_panel_subtitle1);
  panel.add(button_select_target);
  panel.add(button_run_detection);
  panel.add(buttons_previous_next);
  panel.add(ui.Panel([ui.Label('Image date = '), label_image_date], ui.Panel.Layout.flow('horizontal')));
  panel.add(showTutorial);
  panel.add(showDisclaimer);
  panel.add(label_disclaimer);
  panel.add(label_contact);
  panel.add(contact_details);
// MAIN FUNCTIONS
// nearest image in time to target date
function find_nearest_image(ic, collection_name, wavebands, image_date){
  // hopefully this closure works..🤞
  var target_date = image_date
  // map this over the image collection
  function timedelta_from_target_date(ith_image){
    var image_time = ee.Date(ith_image.get('system:time_start'));
    var timedelta = ee.Number(image_time.difference(target_date, 'second')).abs()
    return ee.Feature(target_location, {
      'timedelta':timedelta,
      'system:index': ith_image.get('system:index')
    })
  }
  var image_name = ic
    .filterBounds(target_location)
    .filterDate(daterange_start, daterange_stop)
    .map(timedelta_from_target_date)
    .sort('timedelta')
    .first()
    .get('system:index')
  return ee.String(collection_name).cat(image_name);
}
// run detection button onClick event
function run_detection_event(){
  // update UI
  button_next.setDisabled(true) // disable to avoid double clicking next
  button_run_detection.setDisabled(true)
  button_run_detection.style().set({color:'rgb(100, 100, 100)', fontWeight:'normal'});
  button_run_detection.setLabel('Finding nearest image..')
  label_image_date.setValue('...')
  label_num_hot.setValue('...')
  // search for nearest image asset
  var image_asset_name = find_nearest_image(sentinel2, 'COPERNICUS/S2/', s2_wavebands, image_date)
  // when nearest image asset found..
  image_asset_name.evaluate(function(result) {
    // update global image variables
    image = ee.Image(result).select(s2_wavebands, wavebands)
    image_date = ee.Date(image.date());
    image_date.millis().evaluate(function(result){
      ui.url.set('image_date', result)  
    })
    // enable 'next' button if not youngest image in collection
    youngest_sentinel2_asset.evaluate(function(id){
      var youngest_sentinel2_date = ee.Image(id).date()
      var isyoungest = ee.Algorithms.If(image_date.millis().eq(youngest_sentinel2_date.millis()), true, false)
      var button_next_disabled = ee.Algorithms.If(isyoungest, true, false)
      button_next_disabled.evaluate(function(disable_button){
        button_next.setDisabled(disable_button)      
      })
    });
    // run the detection
    run_detection()
  });
}
// wildfire detection
function run_detection(){
  button_run_detection.setLabel('Running detection..')
  // input layers
  var toa = image.divide(10000);
  var visible = toa.select(['red','green','blue']);
  var infrared = toa.select(['swir2','swir1','nir']);
  // wildfire detection
  var hotvectors = hotmap.hotmap(toa);
  var num_fires = hotvectors.size()
  // update map
  map.layers().reset()
  map.addLayer(visible,{min:0,max:0.3},'normal vision');
  map.addLayer(infrared,{min:0,max:0.4},'infrared vision');
  map.addLayer(hotvectors,{color:'red'},'heat detection');
  map.addLayer(target_location, {color:target_color}, 'target');
  // update other UI components
  num_fires.evaluate(function(result){
    button_run_detection.setLabel('Success')
    label_num_hot.setValue(result)
  })
  var string_image_date = image_date.format('dd MMM YYYY HH:mm:ss')
  string_image_date.evaluate(function(result){
    label_image_date.setValue(result);
  })
}
// EVENT HANDLERS
map.onClick(map_click_event);
map.onChangeZoom(map_zoom_event);
map.onChangeCenter(map_center_event);
function showTutorial_event(e){
  var onoff = tutorial.style().get('shown');
  tutorial.style().set({'shown':!onoff});
  ui.url.set('tutorial', !onoff)
}
function showDisclaimer_event(e){
  var onoff = label_disclaimer.style().get('shown');
  label_disclaimer.style().set({'shown':!onoff});
}
function select_target_button_event(){
  // cursor and button label
  map.style().set('cursor', 'crosshair');
  button_select_target.setLabel('Click on map');
  target_selector = 'enabled';
  return
}
function map_click_event(coords){
  if (target_selector == 'disabled'){
    return
  }
  // reset ui
  map.style().set('cursor', 'hand');
  button_select_target.setLabel('Select New Target');
  target_selector='disabled';
  // save to url variables
  ui.url.set('target_lon', coords.lon)
  ui.url.set('target_lat', coords.lat)
  // update map
  target_location = ee.Geometry.Point(coords.lon, coords.lat);
  map.layers().set(3, ui.Map.Layer(target_location, {color: target_color}, 'target'));
  // update map minipanel
  label_lon.setValue('target lon: '+coords.lon.toFixed(2));
  label_lat.setValue('target lat: '+coords.lat.toFixed(2));
  // enable run detection button
  button_run_detection.setDisabled(false)
  button_run_detection.style().set({color:'rgb(250, 50, 20)', fontWeight:'bold'});
  button_run_detection.setLabel('Run Wildfire Detection')
}
function map_zoom_event(zoom){
  ui.url.set('zoom',zoom)
}
function map_center_event(center){
  mapcenter_lon = ui.url.set('mapcenter_lon',center.lon);
  mapcenter_lat = ui.url.set('mapcenter_lat',center.lat);
}
function share_button_event(e){
  share_button.style().set({'shown':false});
  toast.style().set({'shown':true});
  ui.util.setTimeout(function(result){
    toast.style().set({'shown':false});
    share_button.style().set({'shown':true});
  }, 4000)
}
function previousImage(e){
  daterange_start = image_date.advance(-20, 'days')
  daterange_stop = image_date.advance(-1, 'second');
  run_detection_event();
}
function nextImage(e){
  daterange_start = image_date.advance(1, 'second');
  daterange_stop = image_date.advance(20, 'days')
  run_detection_event();
}
// Initialize map
run_detection_event()
map.centerObject(ee.Geometry.Point([mapcenter_lon, mapcenter_lat]), zoom);