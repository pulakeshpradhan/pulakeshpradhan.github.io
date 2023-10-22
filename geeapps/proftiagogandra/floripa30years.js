//Temporal Evolution of ISC - Final
var isc = 
    /* color: #a38cc5 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-48.65155356406251, -27.36114959079642],
          [-48.65155356406251, -27.87100162966152],
          [-48.31647055625001, -27.87100162966152],
          [-48.31647055625001, -27.36114959079642]]], null, false);
// Load an image of the ISC from 1984
var l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
.filterBounds(isc).filterDate('1988-01-01','1990-01-01')
.filter(ee.Filter.eq('WRS_PATH', 220))
.filter(ee.Filter.eq('WRS_ROW', 79))
.select(['B1','B2','B3']);
var imagel5 = ee.Image(l5.sort('CLOUD_COVER_LAND').first()).clip(isc);
//Image from 2019
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filterBounds(isc).filterDate('2018-01-01','2019-10-01')
.filter(ee.Filter.eq('WRS_PATH', 220))
.filter(ee.Filter.eq('WRS_ROW', 79))
.select(['B2','B3','B4']);
var imagel8 = ee.Image(l8.sort('CLOUD_COVER_LAND').first()).clip(isc);
//Visualization parameters
var vl8 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var vl5 = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 2500,
  gamma: 1.2,
};
// Add a 1989 composite to the default Map.
Map.addLayer(imagel5, vl5, '1989');
// Make another map and add a 2019  composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(imagel8, vl8, '2019');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.centerObject(isc, 12);