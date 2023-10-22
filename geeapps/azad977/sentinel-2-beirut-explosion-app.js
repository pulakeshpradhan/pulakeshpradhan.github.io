var geo = ui.import && ui.import("geo", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            35.5190823233144,
            33.90148335399517
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([35.5190823233144, 33.90148335399517]);
var countries = ee.FeatureCollection("USDOS/LSIB/2017");
//Map.addLayer(countries, {},'countries');
var Lebanon = countries.filter(ee.Filter.eq('country_co', 'LE'));
//
var label1 = ui.Label('After');
var label2 = ui.Label('Before');
var title1 = ui.Label('Before');
title1.style().set('position', 'top-right');
//Map.addLayer(Lebanon, {},'Lebanon');
var geo = ee.Geometry.Point(35.518202558757515,33.90110934692082);  // Beirut explosion
//var mtSM = geo;
var image1 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(geo.buffer(10000))
    .filterDate('2020-07-1', '2020-08-1')
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 0.5));
    //.mosaic()
    //.filterBounds(Lebanon);
  //.map(function(image){return image.clip(Lebanon)});
print(image1, 'image1');
var image2 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(geo.buffer(10000))
    .filterDate('2020-08-8', '2020-08-9');
    //.filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20));
    //.mosaic()
    //.filterBounds(Lebanon);
print(image2, 'image2');
var linkedMap = ui.Map();
Map.addLayer(image2, {bands: ['B4', 'B3', 'B2'], max: 4400}, 'true color2');
//Map.add(label1);
var title = ui.Label('Image 2020-7-19 Before, Image 2020-8-8 After');
title.style().set('position', 'top-left');
Map.add(title);
//Map.add(title);
linkedMap.addLayer(image1, {bands: ['B4', 'B3', 'B2'], max: 3900}, 'true color1');
//var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
linker.get(0).setCenter(35.518202558757515,33.90110934692082,15);