var guixi = ui.import && ui.import("guixi", "table", {
      "id": "users/danielhirst1998/guixi-poc/guixi-aoi"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/guixi-aoi"),
    saganoseki = ui.import && ui.import("saganoseki", "table", {
      "id": "users/danielhirst1998/guixi-poc/saganoseki"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/saganoseki"),
    portpirie = ui.import && ui.import("portpirie", "table", {
      "id": "users/danielhirst1998/guixi-poc/portpirie"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/portpirie"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                131.87247752608002,
                33.25773928226207
              ],
              [
                131.87095403135956,
                33.25650119511937
              ],
              [
                131.8731427139157,
                33.25504776608641
              ],
              [
                131.87419413984955,
                33.25662679896249
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[131.87247752608002, 33.25773928226207],
          [131.87095403135956, 33.25650119511937],
          [131.8731427139157, 33.25504776608641],
          [131.87419413984955, 33.25662679896249]]]);
// ========== DECLARING VARIABLES ========== //
var places = {
  Guixi: guixi,
  Saganoseki: saganoseki,
  "Port Pirie": portpirie,
};
// ========== DIFFERENCE ALGORITHMS ========== //
// Just image subtraction: image 2 - image1
var simple_subtraction = function(im1, im2) {
  return im2.subtract(im1);
}
// Converts from signed number (+ve or -ve) to a positive only intensity. 
// got this from a paper, i can't remember where though
var convert2intensity = function (img) {
  img = img.updateMask(img.gte(-30));
  img = img.updateMask(img.lte(30));
  // Amplitude
  var VV = img.expression( '10 ** (VV / 20)', {'VV': img.select('VV')});
  VV = VV.select(['constant'], ['VV']);
  var VH = img.expression( '10 ** (VH / 20)', {'VH': img.select('VH')});
  VH = VH.select(['constant'], ['VH']);
  // Intensity
  VV = VV.multiply(VV);
  VH = VH.multiply(VH);
  return VV.addBands(VH);
};
// Better subtraction method - log intensity 2 - log intensity 1
var log_subtraction = function(im1, im2) {
  return convert2intensity(im2).log().subtract(convert2intensity(im1).log())
}
// Make dicts of the algorithms and vizualisation parameters so we can choose in the app
var algos = {
  'Simple Subtraction': simple_subtraction,
  'Log Subtraction': log_subtraction
}
var vizParam_list = {
  'Simple Subtraction': {min: -40, max: 40, palette: ['0000FF','FFFFFF', 'FF0000']},
  'Log Subtraction': {min: -10, max: 10, palette: ['0000FF','FFFFFF', 'FF0000']}
}
var heatMap_vizParam_list = {
  'Simple Subtraction':{palette:['blue','lightgreen','yellow','red'],min:0,max:100},
  'Log Subtraction':{palette:['blue','lightgreen','yellow','red'],min:0,max:10}
}
// ========== DEFAULT PARAMETERS ========== //
var region = guixi;
var startDate = '2020-01-01';
var endDate = '2020-06-31';
var mean = 5;
var mult = 3;
var algo = simple_subtraction;
var vizParams = vizParam_list['Simple Subtraction']
var heatMap_vizParams = heatMap_vizParam_list['Simple Subtraction']
// ========== SETTING UP SETUP PANEL ========== //
// Main option panel where you choose your options at the start
var mainPanel = ui.Panel();
mainPanel.style().set({
  width: '350px',
  fontSize: '9px',
  position: 'bottom-right'
});
// panel on left that includes the time series
var leftPanel = ui.Panel();
leftPanel.style().set({
  width: '400px',
  fontSize: '9px',
  position: 'top-left'
});
var leftPanelLabel = ui.Label("Draw a polygon to find the variance of that area over time")
// Central panel with the slider that allows you to scrub between images
var topPanel = ui.Panel();
topPanel.style().set({
  width: '600px'});
Map.add(mainPanel);
// Converts map to satellite image by default
Map.setOptions("SATELLITE")
var title = ui.Label("GUIXI PROOF OF CONCEPT")
title.style().set('fontWeight', 'bold');
mainPanel.add(title)
//panel.add(ui.Label("This app takes SAR imagery and subtracts them to detect differences over smelter sites. Currently, this app supports the smelters Guixi and Saganoseki and the uranium mine Port Pirie, with the ability to add more."))
mainPanel.add(ui.Label("1. SELECT YOUR TARGET SMELTER"))
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    region = places[key]
    Map.centerObject(region, 16);
  }
});
select.setPlaceholder('Choose a location...');
mainPanel.add(select)
mainPanel.add(ui.Label("3. SELECT THE START DATE AND END DATE YOU WOULD LIKE TO SEE"))
mainPanel.add(ui.Label("Note: The date that you choose may not be the exact date of acquisition, but instead the closest date to it."))
mainPanel.add(ui.Label("Start Date:"))
var startDateSlider = ui.DateSlider({
  start: '2015-01-01',
  end: '2020-05-31',
  value: null,
  period: 1,
  onChange: function(value) {
    startDate = value;
  }
});
mainPanel.add(startDateSlider.setValue('2020-01-01'));
mainPanel.add(ui.Label("End Date:"))
var endDateSlider = ui.DateSlider({
  start: '2015-01-01',
  end: '2020-05-31',
  value: null,
  period: 1,
  onChange: function(value) {
    endDate = value;
  }
});
mainPanel.add(endDateSlider.setValue('2020-05-31'));
mainPanel.add(ui.Label("4. SELECT YOUR DIFFERENCE ALGORITHM"))
var algo_select = ui.Select({
  items: Object.keys(algos),
  onChange: function(key) {
    algo = algos[key]
    vizParams = vizParam_list[key]
    heatMap_vizParams = heatMap_vizParam_list[key]
  }
});
algo_select.setPlaceholder('Choose a difference algorithm...');
mainPanel.add(algo_select)
mainPanel.add(ui.Label("5. RUN THE APP"))
mainPanel.add(ui.Label("Click Run again if you have updated any of the parameters on this panel."))
var button = ui.Button({
  label: 'Run',
  onClick: function() {
    run_time_series(startDate, endDate, region, algo, vizParams,heatMap_vizParams);
  }
});
mainPanel.add(button)
// ========== MAIN FUNCTION ========== //
function run_time_series(start_date, end_date, region, algo, vizParams, heatMap_vizParams) {
  // Remove the results panels until they've been updated
  Map.clear()
  Map.add(mainPanel)
  // Clear results panels from old info
  leftPanel.clear()
  leftPanel.add(leftPanelLabel)
  topPanel.clear()
  // makes sure dates are ee date objects
  start_date = ee.Date(start_date.start())
  end_date = ee.Date(end_date.start())
  // grab all images from region within date range
  var images = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(region)
    .filterDate(start_date, end_date)
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .select('VV','VH')
  ;
  print(images)
  // get rid of all of the image that isn't the smelter
  var images_clipped = images.map( function(image) {return image.clip(region.geometry())});
  // sort ImageCollection by date of acquisition
  var images_clipped_sorted = images_clipped.sort("system:time_start");
  // Convert ImageCollection to list for ease of use
  var list = images_clipped_sorted.toList(images_clipped.size());
  print(list)
  // There are 3 orbits that go in a loop. Descending and Ascending primarily. Isolate each orbit so we can compare
  // images from same orbit
  // TODO: Update this. Discuss with Peter whether we can compare all ascending orbits together, even if they are
  // Slightly different. If so, we can cut this down to 'ascending' and 'descending' orbits 
  var orbit_1 = images_clipped_sorted.filter(ee.Filter.stringContains('platform_number','B'));
  var orbit_2 = images_clipped_sorted.filter(ee.Filter.stringContains('platform_number','A')).filter(ee.Filter.lt('relativeOrbitNumber_start',100));
  var orbit_3 = images_clipped_sorted.filter(ee.Filter.stringContains('platform_number','A')).filter(ee.Filter.gte('relativeOrbitNumber_start',100));
  print(orbit_1)
  print(orbit_2)
  print(orbit_3)
  // Subtract images in sequence function
  var subtract_images = function(im1, filter) {
    im1 = ee.Image(im1);
    var startDate = im1.date().advance(1,'day');
    var endDate = startDate.advance(30,'day')
    // This seems like it'll take a long time, but is the best way. Just search for the next image and get it from an imagecollection
    var im2 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(region)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(filter)
    .select('VV','VH')
    .first()
    ;
    // Perform subtraction algorithm that was chosen in the first panel
    var diff = algo(im1, im2);
    // Set metadata that makes it easier to chart
    diff = diff.setMulti({
      'system:time_start':im1.get('system:time_start'),
      'system:time_end':im2.get('system:time_end'),
      'im1_id':im1.get('system:index'),
      'im2_id':im2.get('system:index')
    });
    return diff;
  }
  // run subtraction algorithm for each orbit
  var subtract_orbit1 = function(im1) {
    return subtract_images(im1, ee.Filter.stringContains('platform_number','B'));
  }
  var subtract_orbit2 = function(im1) {
    return subtract_images(im1, ee.Filter.and(ee.Filter.stringContains('platform_number','A'),ee.Filter.lt('relativeOrbitNumber_start',100)));
  }
  var subtract_orbit3 = function(im1) {
    return subtract_images(im1, ee.Filter.and(ee.Filter.stringContains('platform_number','A'),ee.Filter.gte('relativeOrbitNumber_start',100)));
  }
  // Turn all differences into a single list
  var differences = ee.List([])
  differences = differences.cat(ee.Algorithms.If(orbit_1.size().gt(0), orbit_1.map(subtract_orbit1).toList(orbit_1.size()), []))
  differences = differences.cat(ee.Algorithms.If(orbit_2.size().gt(0), orbit_2.map(subtract_orbit2).toList(orbit_2.size()), []))
  differences = differences.cat(ee.Algorithms.If(orbit_3.size().gt(0), orbit_3.map(subtract_orbit3).toList(orbit_3.size()), []))  
  print(differences)
  differences = ee.ImageCollection(differences)
  var differences_list = differences.toList(differences.size())
  // Turn list of differences into a heatmap, using the variance as the number value
  var change_map = differences.reduce(ee.Reducer.variance())
  var s2_vizParams = {
    bands: ['B4','B3','B2'],
    min: 0,
    max: 7000
  };
  var s1_vizParams = {
    bands: 'VV',
    min: -18, 
    max: 10
  };
  var diffs_slider = ui.Slider(0,differences_list.size().getInfo()-1,0,1);
  diffs_slider.onChange(function(value) {
    // Remove all previous satellite images on page
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    // Add image slider
    topPanel.clear()
    topPanel.add(diffs_slider)
    Map.addLayer(ee.Image(differences_list.get(value)).select('VV'),vizParams,'Difference')
    var start_date = ee.Date(ee.Image(differences_list.get(value)).get('system:time_start'))
    var end_date = ee.Date(ee.Image(differences_list.get(value)).get('system:time_end'))
    // Add miscellany of satellite images that can be seen in the layer tab of the app. Only do this on change of
    // slider
    // Sentinel 2 image close to acquisition of S1 image used as image1
    var s2_start_image = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(region)
      .filterDate(start_date.advance(-2,'day'), start_date.advance(3,'day'))
      .first()
      .clip(region.geometry())
    // Sentinel 2 image close to acquisition of S1 image used as image2
    var s2_end_image = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(region)
      .filterDate(end_date.advance(-2,'day'), end_date.advance(3,'day'))
      .first()
      .clip(region.geometry())
    Map.addLayer(s2_start_image,s2_vizParams,'S2 Image 1',false)
    Map.addLayer(s2_end_image,s2_vizParams,'S2 Image 2',false)
    // Sentinel 1 image used as image 1
    var s1_start_image = ee.ImageCollection('COPERNICUS/S1_GRD')
      .filterBounds(region)
      .filterDate(start_date.advance(-1,'day'), start_date.advance(1,'day'))
      .first()
      .clip(region.geometry())
    // Sentinel 1 image used as image 2
    var s1_end_image = ee.ImageCollection('COPERNICUS/S1_GRD')
      .filterBounds(region)
      .filterDate(end_date.advance(-1,'day'), end_date.advance(1,'day'))
      .first()
      .clip(region.geometry())
    Map.addLayer(s1_start_image,s1_vizParams,'S1 Image 1',false)
    Map.addLayer(s1_end_image,s1_vizParams,'S1 Image 2',false)
    Map.addLayer(change_map.select("VV_variance"),heatMap_vizParams,'Heat Map',false)
    // Add labels on the top middle panels that show the id of the sentinel images
    topPanel.add(ui.Label('S1 Image 1 id: '+ ee.Image(differences_list.get(value)).get('im1_id').getInfo()))
    topPanel.add(ui.Label('S1 Image 2 id: '+ ee.Image(differences_list.get(value)).get('im2_id').getInfo()))
    topPanel.add(ui.Label('S2 Image 1 id: ' + s2_start_image.id().getInfo()))
    topPanel.add(ui.Label('S2 Image 2 id: ' + s2_end_image.id().getInfo()))
  });
  // Add variance and difference image to map
  Map.addLayer(ee.Image(differences_list.get(0)).select('VV'),vizParams,'Difference')
  Map.addLayer(change_map.select("VV_variance"),heatMap_vizParams,'Heat Map',false)
  // Add the initial s2 and s1 images to Map
  start_date = ee.Date(ee.Image(differences_list.get(0)).get('system:time_start'))
  end_date = ee.Date(ee.Image(differences_list.get(0)).get('system:time_end'))
  var s2_start_image = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(region)
    .filterDate(start_date.advance(-2,'day'), start_date.advance(10,'day'))
    .first().clip(region.geometry())
  var s2_end_image = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(region)
    .filterDate(end_date.advance(-2,'day'), end_date.advance(10,'day'))
    .first().clip(region.geometry())
  Map.addLayer(s2_start_image,s2_vizParams,'S2 Image 1',false)
  Map.addLayer(s2_end_image,s2_vizParams,'S2 Image 2',false)
  var s1_start_image = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(region)
    .filterDate(start_date.advance(-1,'day'), start_date.advance(1,'day'))
    .first().clip(region.geometry())
  var s1_end_image = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(region)
    .filterDate(end_date.advance(-1,'day'), end_date.advance(1,'day'))
    .first().clip(region.geometry())
  Map.addLayer(s1_start_image,s1_vizParams,'S1 Image 1',false)
  Map.addLayer(s1_end_image,s1_vizParams,'S1 Image 2',false)
  diffs_slider.style().set({width: '580px'})
  topPanel.add(diffs_slider)
  Map.add(topPanel)
  // Add a time series for each drawn layer
  var drawingTools = Map.drawingTools();
  print(drawingTools.layers())
  drawingTools.layers().forEach(function(el,idx) {
    print(el.get('shown'))
    if (el.get('shown')) {
      leftPanel.add(ui.Chart.image.series(differences,el.toGeometry(),ee.Reducer.variance()))
    }
  })
  Map.add(leftPanel)
}