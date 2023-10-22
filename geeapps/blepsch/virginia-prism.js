var date = '2018-07-01';
var mapZoom = 7;
var dataset = 'OREGONSTATE/PRISM/AN81m';
var displaying = 'data'; // 'max' 'min' 'mean' 'data'
var prismDataset = ee.ImageCollection(dataset)
                    .filter(ee.Filter.date(date));
print(prismDataset);
var m = ee.ImageCollection(dataset).select('ppt').min();
print(m);
//print(m.date());
var statesDataset = ee.FeatureCollection('TIGER/2018/States');
var vaCollection = statesDataset.filter(ee.Filter.eq('NAME','Virginia'));
var virginia = vaCollection.first();
var precipitation = prismDataset.select('ppt');
var palette = {
  min: 0.0,
  max: 300.0,
  palette: ['red', 'yellow', 'green', 'cyan', 'purple']
};
var mapLon = -78.668;
var mapLat = 37.522;
Map.setCenter(mapLon, mapLat, mapZoom);
Map.addLayer(precipitation.first().clip(virginia.geometry()), palette, 'ppt ' + date);
//Map.addLayer(m.clip(virginia.geometry()), palette, 'm ' + date);
var newLayer = function () {
  Map.addLayer(precipitation.first().clip(virginia.geometry()), palette, 'ppt ' + date.millis());
}
var removeLayer = function (name) {
  var layers = Map.layers();
  var names = [];
  layers.forEach(function(lay) {
    names.push(lay.getName());
  });
  var index = names.indexOf(name);
  if (index > -1) {
    Map.remove(layers.get(index));
  }
};
/*
  idk if start/stop animation is even possible
  requestAnimationFrame and setTimeout are both disabled for this ide
  and doing a normal recursive function lags very hard
  but what is possible and what i'll focus on:
   - user can enter specific date to view data from/date slider (DONE)
   - user can enter coordinates to center map on (DONE)
   - include legend and date on map (date automatically included on date slider)
   - maybe custom zoom in/out buttons (DONE)
*/
var changeDate = function() {
  var toRemove;
  if (typeof date == "string") {
    toRemove = ('ppt ' + date);
  } else {
    toRemove = ('ppt ' + date.millis());
  }
  //print(dateSlider.getValue()[0]);
  date = ee.Date(dateSlider.getValue()[0]);
  prismDataset = ee.ImageCollection('OREGONSTATE/PRISM/AN81m').filter(ee.Filter.date(date));
  precipitation = prismDataset.select('ppt');
  newLayer();
  removeLayer(toRemove);
}
// to get more precise values on the slider, change 365 days to another number
var dateSlider = ui.DateSlider('2000-07-01','2018-07-01', date, 365, changeDate, false, {position: 'top-left'});
//print(dateSlider);
var changeMapCenter = function(lon, lat) {
  mapLon = lon;
  mapLat = lat;
  Map.setCenter(lon, lat, mapZoom);
}
var checkLongLat = function() {
  /*
    i can do different input formats but
    easiest would just be a space
    -31.254 74.213
  */
  var value = enterLongLat.getValue();
  var listy = value.split(' ');
  if (listy.length != 2) {
    return;
  }
  changeMapCenter(parseInt(listy[0]),parseInt(listy[1]));
}
var enterLongLat = ui.Textbox('longitude latitude', '', checkLongLat, false, {position: 'middle-left'});
// custom zoom in and out buttons aren't really necessary, but if you don't have them
// it resets the zoom if you enter new coordinates
var zoomIn = function() {
  mapZoom ++;
  Map.setCenter(mapLon, mapLat, mapZoom);
}
var zoomOut = function() {
  mapZoom --;
  Map.setCenter(mapLon, mapLat, mapZoom);
}
var zoomInButton = ui.Button('zoom in', zoomIn);
var zoomOutButton = ui.Button('zoom out', zoomOut);
function makeButton(name, callback, position) {
  return ui.Button(name, callback, false, {position: position}); 
}
var animating = false;
function animate() {
  if (animating) {
    // increment date on date slider (automatically updates layer)
    if (dateSlider.getValue()[0] >= 1498867200000) {
      dateSlider.setValue(962409600000);
    } else {
      dateSlider.setValue(dateSlider.getValue()[1]);
    }
    // clear layer from map
    //print(dateSlider.getValue());
    ui.util.setTimeout(animate, 7500);
  }
}
var datasetLabel = ui.Label('dataset: ' + dataset, {position: 'bottom-left'});
function resumeAnimation() {
  animating = true;
  animate();  
}
function stopAnimation() {
  //print('stopping');
  animating = false;
}
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
function displayMax() {
  var toRemove;
  var displayDate;
  if (typeof date == "string") {
    toRemove = ('ppt ' + date);
    displayDate = date;
  } else {
    toRemove = ('ppt ' + date.millis());
    displayDate = date.millis();
  }
  var m = ee.ImageCollection(dataset).select('ppt').max();
  Map.addLayer(m.clip(virginia.geometry()), palette, 'ppt ' + displayDate);
  removeLayer(toRemove);
}
function displayMin() {
  var toRemove;
  var displayDate;
  if (typeof date == "string") {
    toRemove = ('ppt ' + date);
    displayDate = date;
  } else {
    toRemove = ('ppt ' + date.millis());
    displayDate = date.millis();
  }
  var m = ee.ImageCollection(dataset).select('ppt').min();
  Map.addLayer(m.clip(virginia.geometry()), palette, 'ppt ' + displayDate);
  removeLayer(toRemove);
}
panel.add(ui.Button('zoom in', zoomIn));
panel.add(ui.Button('zoom out', zoomOut));
panel.add(dateSlider);
panel.add(datasetLabel);
panel.add(enterLongLat);
panel.add(ui.Button('start animation', resumeAnimation));
panel.add(ui.Button('stop animation', stopAnimation));
panel.add(ui.Button('show max', displayMax));
panel.add(ui.Button('show min', displayMin));
ui.root.add(panel);