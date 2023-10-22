var sub_area = ui.import && ui.import("sub_area", "table", {
      "id": "users/piotrjaniec2/G_SUBAREA_84"
    }) || ee.FeatureCollection("users/piotrjaniec2/G_SUBAREA_84"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
Map.addLayer(sub_area, {}, 'Wydzielenia');
Map.centerObject(sub_area)
/*
Create the panel
*/
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'10%'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Indeks wilgotności',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('Use 20 m Sentinel imagery to'+
  ' visualize the wegetation wetness.'+
  ' Select from multiple area of interest and dates', {});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
// Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  var aoi = sub_area.filterBounds(point);
  Map.centerObject(aoi)
var Start_period = ee.Date('2016-01-01');
var now = Date.now();
var End_period = ee.Date('2020-01-01');
//import collection  
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 14, // Every 14 days
    onChange: renderDateRange
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
 var S2 = ee.ImageCollection('COPERNICUS/S2')
.filterDate(dateRange.start(), dateRange.end())
.filterBounds(aoi);
// Function to calculate and add an NDVI band
var addNDMI_sen = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B11']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDMI_sen)
          .sort("CLOUD_COVERAGE_ASSESSMENT")
          .first();
var NDMI_sen = S2.select(['nd']);
// Display NDVI results on map
var layer = Map.addLayer(NDMI_sen.clip(aoi), {min:-1, max:1, palette: ['blue', 'white', 'green']}, 'NDMI');
Map.layers().remove([layer])
}
});
// Add title and description to the panel.  
panel.add(intro).add(subtitle);
///////////////////////////////////////////////////////////////////////////
//var aoi = sub_area.filter(ee.Filter.eq("a_i_num", 213007292))