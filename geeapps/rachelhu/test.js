var l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    ned_10m = ui.import && ui.import("ned_10m", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    sent2 = ui.import && ui.import("sent2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    l7 = ui.import && ui.import("l7", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T2_SR"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T2_SR"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
// Define the visualization parameters for the images.  
var eightVizParams = { 
    bands: ['B6', 'B5', 'B4'], 
    min: 580.35, 
    max: 3555.1, 
    gamma: [0.95, 1.1, 1] 
  }; 
  var sentVizParams = { 
    bands: ['B11', 'B8', 'B4'], 
    min: 580.35, 
    max: 3555.1, 
    gamma: [0.95, 1.1, 1] 
  };
  var sevenVizParams = { 
    bands: ['B5', 'B4', 'B3'], 
    min: 580.35, 
    max: 3555.1, 
    gamma: [0.95, 1.1, 1] 
  };
//panels
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
  panel.style().set({
    width: '30%',
    'text-align': 'center'
  })
ui.root.add(panel);
// DROPDOWN
var places = {
  'Amazon River, Brazil': [-61.18, -3.645, '2018-10-01', '2020-12-01'],
  'Cedar River, Iowa': [-91.00, 42.0, '2016-07-08', '2016-07-09'],  
  'Tigris River, Iraq': [45.76, 32.52, '2015-10-10', '2016-10-13'],
  'James River, South Dakota': [-98.3, 45.6, '2018-03-09', '2020-03-10'],
  'Red River, North Dakota': [-97.14, 48.32, '2015-05-20', '2016-05-22']
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Visualize(places[key][0], places[key][1], places[key][2], places[key][3])
  }
});
select.setPlaceholder('Choose a location...');
// END DROPDOWN
// START CUSTOM INPUT
var lonTextbox = ui.Textbox({
  placeholder: 'Enter the longitude of your potential floodpoint.',
  onChange: function(text) {
    panel.add(latTextbox);
  }
})
lonTextbox.style().set('width', '70%');
var latTextbox = ui.Textbox({
  placeholder: 'Enter the latitude of your potential floodpoint.',
  onChange: function(text) {
    panel.add(startTextbox);
  }
});
latTextbox.style().set('width', '70%');
var startTextbox = ui.Textbox({
  placeholder: 'Enter the beginning date of reference in format: yyyy-mm-dd',
  onChange: function(text) {
    panel.add(endTextbox);
  }
});
startTextbox.style().set('width', '90%');
var endTextbox = ui.Textbox({
  placeholder: 'Enter the end date of reference in format: yyyy-mm-dd',
  onChange: function(text) {
    Visualize(Number(lonTextbox.getValue()), Number(latTextbox.getValue()), startTextbox.getValue(), endTextbox.getValue());
    //call function to remove clouds
  }
})
endTextbox.style().set('width', '90%');
// END CUSTOM INPUT
// Ms. Howard's code made into a function with a few small edits.
function Visualize (lon, lat, dateRangeStart, dateRangeEnd) {
  // Create a reference point to center buffer.
  var center = ee.Geometry.Point(lon, lat); 
  var dem_circle = center.buffer(3000);
  var roi = ee.Geometry.Rectangle([lon - 0.5, lat - 0.5, lon + 0.5, lat + 0.5]);
  Map.centerObject(center, 13); 
  // create a mask of the buffered DEM that shows only pixels < mean elevation
  // apply a reducer to get the mean elevation
  var myReducer = ee.Reducer.mean();
  var averageElevation = srtm.clip(dem_circle).reduceRegion(
    {
    reducer: myReducer,
    bestEffort: true,
    }).get('elevation').getInfo();
  var elevationVizParams = { 
    min: averageElevation - 5, 
    max: averageElevation + 5, 
    palette: ['1017ff','1d97ff','33ffec','52ff78','fcff3d'] 
  };
  // Find various satellite images
  var my_flood_eight = ee.Image(l8
    .filterBounds(roi)
    .filterDate(dateRangeStart, dateRangeEnd)
    .median());
  var my_flood_seven = ee.Image(l7
    .filterBounds(roi)
    .filterDate(dateRangeStart, dateRangeEnd)
    .median());
  var my_flood_sent = ee.Image(sent2
    .filterBounds(roi)
    .filterDate(dateRangeStart, dateRangeEnd)
    .median());
  var waterElevation = srtm.clip(center).reduceRegion(
    {
    reducer: myReducer,
    bestEffort: true,
    }).get('elevation').getInfo();
  //cast data type to number
  //numbers that comes out of earth engine are a different data type
  var sliderValue = 1;
  var mask = srtm.lte(waterElevation + sliderValue + 1); 
  var flood = srtm.updateMask(mask);
  // Add the image to the map, using the visualization parameters. 
  Map.clear();
  Map.addLayer(my_flood_eight.clip(roi), eightVizParams, 'Median Landsat 8 False Color Image');
  Map.addLayer(srtm.clip(dem_circle), elevationVizParams, 'Elevation'); 
  Map.addLayer(flood.clip(dem_circle), {palette: ['FF6347']}, 'Flooded Region at 1m Above Median Water Level');
  var panel2 = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  panel2.style().set({
    width: '517px',
    position: 'bottom-center'
  });
  Map.add(panel2);
  var panel3 = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  panel3.style().set({
    width: '250px',
    position: 'top-center'
  });
  Map.add(panel3);
  var sentButton = ui.Button('No Landsat-8 image available? Try Sentinel-2.');
  sentButton.onClick(function() {
    Map.addLayer(my_flood_sent.clip(roi), sentVizParams, 'Median Sentinel-2 False Color Image');
  });
  panel2.add(sentButton);
  var l7Button = ui.Button('Or try Landsat-7.');
  l7Button.onClick(function() {
    Map.addLayer(my_flood_seven.clip(roi), sevenVizParams, 'Median Landsat 7 False Color Image');
  });
  panel2.add(l7Button);
  var clearButton = ui.Button('Clear entire map.');
  clearButton.onClick(function() {
    Map.clear();
  });
  panel2.add(clearButton);
  var slider = ui.Slider(0, 10);
  slider.setValue(1);
  var keep1 = ui.Map.Layer(my_flood_eight.clip(roi), eightVizParams, 'Median Landsat 8 False Color Image');
  var keep2 = ui.Map.Layer(srtm.clip(dem_circle), elevationVizParams, 'Elevation');
  slider.onChange(function(value) {
      Map.layers().reset([keep1, keep2]);
      sliderValue = value;
      mask = srtm.lte(waterElevation + sliderValue + 1);
      flood = srtm.updateMask(mask);
      Map.addLayer(flood.clip(dem_circle), {palette: ['FF6347']}, 'Flooded Region at ' + String(sliderValue) + 'm Above Median Water Level');
  });
  panel3.add(ui.Label('Flood height (m):'))
  panel3.add(slider);
}
//Leanh's code
var longText = ui.Textbox({
  placeholder: 'Enter longitude of flood.',
  onChange: function(text) {
    panel.add(latText);
  }
});
var latText = ui.Textbox({
  placeholder: 'Enter latitude of flood.',
  onChange: function(text) {
    panel.add(heightText);
  }
});
var heightText = ui.Textbox({
  placeholder: 'Enter elevation that is higher than expected flood level',
  onChange: function(text) {
    panel.add(gammaText);
  }
});
heightText.style().set('width', '70%');
var gammaText = ui.Textbox({
  placeholder: 'Enter gamma for image (0-2, 2 is preferred).',
  onChange: function(text) {
    panel.add(opacityText);
  }
});
var opacityText = ui.Textbox({
  placeholder: 'Enter opacity for slope and hillshade (0-1, 0.2 is preferred).',
  onChange: function(text) {
    panel.add(hillshade_minText);
  }
});
opacityText.style().set('width', '70%');
var hillshade_minText = ui.Textbox({
  placeholder: 'Enter min range of hillshade (0-255, 150 is preferred).',
  onChange: function(text) {
    panel.add(hillshade_maxText);
  }
});
hillshade_minText.style().set('width', '70%');
var hillshade_maxText = ui.Textbox({
  placeholder: 'Enter max range of hillshade (0-255, 255 is preferred).',
  onChange: function(text) {
    panel.add(slope_minText);
  }
});
hillshade_maxText.style().set('width', '70%');
var slope_minText = ui.Textbox({
  placeholder: 'Enter min range of slope (0-255, 0 is preferred).',
  onChange: function(text) {
    panel.add(slope_maxText);
  }
});
slope_minText.style().set('width', '70%');
var slope_maxText = ui.Textbox({
  placeholder: 'Enter max range of slope (0-255, 60 is preferred).',
  onChange: function(text) {
      Map.clear();
      Visual(Number(longText.getValue()), Number(latText.getValue()), Number(heightText.getValue()), 
      Number(gammaText.getValue()), Number(opacityText.getValue()), Number(hillshade_minText.getValue()), 
      Number(hillshade_maxText.getValue()), Number(slope_minText.getValue()), Number(slope_maxText.getValue()));
  }
});
slope_maxText.style().set('width', '70%');
//Function for visualize 
function Visual (longitude, latitude, height, gamma, opacity, hillshade_min, 
hillshade_max, slope_min, slope_max) {
//Buffer
var center = ee.Geometry.Point(longitude, latitude); 
//region of interest circle
var roi_circle = center.buffer(40000); 
//elevation dataset
var my_flood = ee.Image(srtm); 
//Center map and map scale
Map.centerObject(center, 11); 
//Map
var checkbox1 = ui.Checkbox('Show DEM/SRTM Data', true);
checkbox1.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(srtm, {min: 0, max: 1000, gamma: [gamma] }, 'DEM'); //blue-low, red-high
panel.add(checkbox1);
//////
var checkbox2 = ui.Checkbox('Show Hillshade', true);
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
panel.add(checkbox2);
var hillshade = ee.Terrain.hillshade(srtm);
Map.addLayer(hillshade.clip(roi_circle), {min: hillshade_min, max:hillshade_max, opacity: opacity}, 'Hillshade');
//////
var checkbox3 = ui.Checkbox('Show slope', true);
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
panel.add(checkbox3);
var slope = ee.Terrain.slope(srtm);
Map.addLayer(slope.clip(roi_circle), {min: slope_min, max: slope_max, opacity: opacity}, 'Slope');
//////
var checkbox4 = ui.Checkbox('Show Black is Below Number Entered', true);
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
panel.add(checkbox4);
var high = srtm.gt(height); //white color above
Map.addLayer(high.clip(roi_circle), {opacity: 0.45}, 'Black is below Number Entered');
}
var buttonLocation = ui.Button('View flood prediction in given region');
buttonLocation.onClick(function() {
  panel.clear();
  panel.add(menu);
  panel.add(ui.Label('Select a location...'));
  panel.add(select);
  panel.add(ui.Label('or input your own!'));
  panel.add(lonTextbox);
});
var buttonElevationMap = ui.Button('View detailed elevation map');
buttonElevationMap.onClick(function() {
  panel.clear();
  panel.add(menu);
  panel.add(ui.Label('Enter parameters to generate elevation map...'));
  panel.add(longText);
}); 
var menu = ui.Button('Back to menu!');
menu.onClick(function() {
  panel.clear();
  panel.add(buttonLocation);
  panel.add(buttonElevationMap);
})
panel.add(buttonLocation)
panel.add(buttonElevationMap)