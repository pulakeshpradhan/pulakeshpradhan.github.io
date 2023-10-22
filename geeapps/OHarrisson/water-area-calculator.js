var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            6.1684132321236795,
            46.235102196649244
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([6.1684132321236795, 46.235102196649244]);
// Zoom size
var zoom = 10;
//function initMap(map) {
//  var blrROI = ee.Geometry.Point(geometry);
//  Map.centerObject(geometry, zoom);
//}
//initMap(Map);
// defining k, which is used for buffer size
var k=[0];
// defining sizes of square buffer
var size = {
          500: [500],
          5000: [5000],
          10000: [10000],
          15000: [15000],
          50000: [50000]
}
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
// UI launcher
var button = panel.add(ui.Button({
  label: 'Perform urban analysis',
  onClick: function() {
    var maps = [createMap1(), createMap2()]; //,createMap3(),createMap4()];
    ui.root.widgets().reset(maps);
    var linker = ui.Map.Linker(maps);
    maps[0].centerObject(geometry, zoom);
  }
}));
// Buffer for reducing area computation within the defined size
var blrPoly =  geometry.buffer(500);
var select = panel.add(ui.Select({
  items: Object.keys(size),
  onChange: function(key) {
    k=size[key][0];
    print('Your buffer zone has a size of ' + k + '.');
    blrPoly =  geometry.buffer(k);
  }
}));
ui.root.clear();
ui.root.add(panel);
// Buffer for reducing area computation within the defined size
var blrPoly =  geometry.buffer(500);
var select = ui.Select({
  items: Object.keys(size),
  onChange: function(key) {
    k=size[key][0];
    print('Your buffer zone has a size of ' + k + '.');
    blrPoly =  geometry.buffer(k);
  }
});
// Ask user to select a location
print('Select a location of interest.')
// Set a place holder.
select.setPlaceholder('Choose a buffer size...');
print(select);
// bands selection
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
// cloud free image from LandSat 5, with filter on date and bounds
var image = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1')
    .filterDate('1990-01-01', '1993-01-01')
    .filterBounds(geometry)
    .sort('CLOUD_COVER')
    .first())
    .select(bands);
//define parameters
var truecolour = {
  bands: ['B4','B3','B2'], //
  min: 0,
  max:150,
};
// UI launcher
var button = ui.Button({
  label: 'Perform urban analysis',
  onClick: function() {
    var maps = [createMap1(), createMap2()]; //,createMap3(),createMap4()];
    ui.root.widgets().reset(maps);
    var linker = ui.Map.Linker(maps);
    maps[0].centerObject(geometry, zoom);
  }
});
print(button);
// creating map functions
function createMap1() {
  var map1 = new ui.Map();
//add image to map
map1.addLayer(image,truecolour, 'Controlled_Color');
//define parameters
var green = image.select('B3');
var swi = image.select('B4');
var mndwi = green.subtract(swi).divide(green.add(swi)).rename('MNDWI');
var mndwipara = {min: 0, max: 0.7, palette: ['white', 'blue']};
// map1.addLayer(mndwi, mndwipara, 'MNDWI');
//apply threshold to select only positive pixels 
var lake_mask= mndwi.gt(0);
// Map.addLayer(lake_mask);
//image reducer
var meanDictionary =image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: image.geometry(),
  scale: 30,
  maxPixels: 1e9
});
var lake_mask_ = ee.Image(1).mask(lake_mask).toInt();
var test = ee.ImageCollection([lake_mask_]);
var test = test.reduce(ee.Reducer.max());
map1.addLayer(test,{min: 1, max: 5, palette: ['0000FF', '1BCFFF','66ff33','F4FF0B','FA0007']},'Classification');
var area = ee.Image.pixelArea().divide(10000);
lake_mask = lake_mask.updateMask(lake_mask);
var lake_mask_ = lake_mask.multiply(area).select([0],['Water area']);
var area_image = lake_mask_;
var areas = area_image.reduceRegion('sum', blrPoly, 30); // size of each pixel in square meters
map1.addLayer(blrPoly, {}, 'blrPoly');
// Legend for UI
map1.add(ui.Label('Legend-Date', {position:'bottom-center'}));
print(areas);
return map1;
}
function createMap2() {
  var map2 = new ui.Map();
//add image to map
map2.addLayer(image,truecolour, 'Controlled_Color');
//define parameters
var green = image.select('B3');
var swi = image.select('B4');
var mndwi = green.subtract(swi).divide(green.add(swi)).rename('MNDWI');
var mndwipara = {min: 0, max: 0.7, palette: ['white', 'blue']};
// map2.addLayer(mndwi, mndwipara, 'MNDWI');
//apply threshold to select only positive pixels 
var lake_mask= mndwi.gt(0);
// Map.addLayer(lake_mask);
//image reducer
var meanDictionary =image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: image.geometry(),
  scale: 30,
  maxPixels: 1e9
});
var lake_mask_ = ee.Image(1).mask(lake_mask).toInt();
var test = ee.ImageCollection([lake_mask_]);
var test = test.reduce(ee.Reducer.max());
map2.addLayer(test,{min: 1, max: 5, palette: ['0000FF', '1BCFFF','66ff33','F4FF0B','FA0007']},'Classification');
var area = ee.Image.pixelArea().divide(10000);
lake_mask = lake_mask.updateMask(lake_mask);
var lake_mask_ = lake_mask.multiply(area).select([0],['Water area']);
var area_image = lake_mask_;
var areas = area_image.reduceRegion('sum', blrPoly, 30);
map2.addLayer(blrPoly, {}, 'blrPoly');
// Legend for UI
map2.add(ui.Label('Legend-Date', {position:'bottom-center'}));
print(areas);
return map2
}