var table = ee.FeatureCollection("users/gdispiri/info4ny/Boundaries"),
    table2 = ee.FeatureCollection("users/gdispiri/info4ny/preschools"),
    table3 = ee.FeatureCollection("users/gdispiri/info4ny/librarys"),
    table4 = ee.FeatureCollection("users/gdispiri/info4ny/playAreas"),
    table5 = ee.FeatureCollection("users/gdispiri/info4ny/pools"),
    table6 = ee.FeatureCollection("users/gdispiri/info4ny/youthEmploy"),
    table7 = ee.FeatureCollection("users/gdispiri/info4ny/subwayStations"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
// the city of new york divided
var main = ee.FeatureCollection(table);
Map.addLayer(main, {color: '#a5b2d6'},
'new york city');
Map.centerObject(table);
var bufferSize = '400';
var select = ui.Select({
items: ['200', '400', '600', '800','1000'],
placeholder: 'Choose the buffer size (default: 400 m)'});
select.onChange(function(selected) {
bufferSize = selected;
});
select.style().set('position', 'top-right');
Map.add(select);
Map.onClick(function(coords){
var pointFeature = ee.Feature(
ee.Geometry.Point([coords.lon, coords.lat]));
var buffered = pointFeature.buffer(Number(bufferSize));
Map.addLayer(buffered, {color: 'gray'}, 'Buffered Area');
// for preschool locations
var one = ee.FeatureCollection(table2);
var PREschoolBuffer = one.filterBounds(buffered.geometry());
Map.addLayer(PREschoolBuffer, {color: '#808000'},'pre schools in buffer');
// for library locations
var two = ee.FeatureCollection(table3);
var libraryBuffer = two.filterBounds(buffered.geometry());
Map.addLayer(libraryBuffer, {color: 'yellow'}, 'librarys in buffer');
// for parks/ play areas
var three = ee.FeatureCollection(table4);
var parksBuffer = three.filterBounds(buffered.geometry());
Map.addLayer(parksBuffer, {color: 'green'},'play areas in buffer');
// for pools 
var four = ee.FeatureCollection(table5);
var poolBuffer = four.filterBounds(buffered.geometry());
Map.addLayer(poolBuffer, {color: '#38c7d6'},'pools in buffer');
// for youth jobs 
var five = ee.FeatureCollection(table6);
var jobBuffer = five.filterBounds(buffered.geometry());
Map.addLayer(jobBuffer, {color: '#ff18e2'},'youth jobs in buffer');
// for subway entrences 
var six = ee.FeatureCollection(table7);
var entrenceBuffer = six.filterBounds(buffered.geometry());
Map.addLayer(entrenceBuffer, {color: 'black'},'subway entrences in buffer');
});
var button = ui.Button({
label: 'Go to NYC',
onClick: function() {Map.setCenter(-73.937641,40.680890);
Map.setZoom(10);}
});
Map.add(button);
// ui.Map
var insetMap = ui.Map();
var createInset = function() {
var bounds =ee.Geometry.Rectangle(Map.getBounds());
insetMap.centerObject(bounds);
insetMap.clear();
insetMap.addLayer(bounds);
};
createInset();
// Get a new inset map when you click on the Map.
Map.onClick(createInset);
// Display the insetMap in the Map.
insetMap.style().set('position', 'bottom-right');
Map.add
(insetMap);