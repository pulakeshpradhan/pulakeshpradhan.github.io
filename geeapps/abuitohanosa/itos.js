var geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -75.29276807308199,
            40.06396083376212
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-75.29276807308199, 40.06396083376212]);
var geometry = geometry2.buffer(350000)
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')//VCMCFG//VCMSLCFG
                  .filter(ee.Filter.date('2018-09-01', '2018-10-30'))
                  .filterBounds(geometry)
                  .select('avg_rad')
                  .mean();
var dataset = dataset.clip(geometry)
var dataset = dataset.visualize({min: 0.0, max: 60.0, palette: ['ffffff', '1eff10', 'ff2300']})
/////////////////////////
var dataset2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')//VCMCFG//VCMSLCFG
                  .filter(ee.Filter.date('2019-09-01', '2019-10-30'))
                  .filterBounds(geometry)
                  .select('avg_rad')
                  .mean();
var dataset2 = dataset2.clip(geometry)
var dataset2 = dataset2.visualize({min: 0.0, max: 60.0, palette: ['000000', '1eff10', 'ff2300']})
//////////
// var nighttime = dataset.select('avg_rad')
//                 .mean();//avg_rad
var christmas = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')//VCMCFG//VCMSLCFG
                  .filter(ee.Filter.date('2018-11-01', '2019-01-10'))
                  .filterBounds(geometry)
                  .select(['avg_rad'])//.select(['B4','B5','pixel_qa'], ['RED', 'NIR', 'pixel_qa'])
                  .mean();
var christmas = christmas.clip(geometry)
var christmas = christmas.visualize({min: 0.0, max: 60.0, palette: ['ffffff', '1eff10', 'ff2300']})
///////////////////////////
var christmas2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')//VCMCFG//VCMSLCFG
                  .filter(ee.Filter.date('2019-11-01', '2020-01-10'))
                  .filterBounds(geometry)
                  .select(['avg_rad'])//.select(['B4','B5','pixel_qa'], ['RED', 'NIR', 'pixel_qa'])
                  .mean();
var christmas2 = christmas2.clip(geometry)
var christmas2 = christmas2.visualize({min: 0.0, max: 60.0, palette: ['000000', '1eff10', 'ff2300']})
//////////////////////
//var nighttime2 = dataset2.select('avg_rad')//.rename('AVG_RAD')
  //              .mean();//avg_rad
print(christmas)
var change = christmas.subtract(dataset);
print(change, {}, 'change')
//var change2 = dataset.subtract(christmas)
//Map.addLayer(change2, {min: -1, max: 1, palette: 'red, white, green'}, 'change2')
//var change = nighttime.subtract(nightime2)
var nighttimeVis = {min: 0.0, max: 60.0, palette: ['000000', '1eff10', 'ff2300']};
Map.addLayer(dataset, nighttimeVis, 'Autumn');
Map.addLayer(christmas, nighttimeVis, 'christmas');
//Map.addLayer(change, {min: 0, max: 60}, 'change') //min: -1, max: 1, palette: 'red, white, green'
/////////_____________________________________________________________________________///////////
var images = {
  'Autumn 2018': dataset,
  'Autumn 2019': dataset2,
  'Christmas 2018': christmas,
  'Christmas 2019': christmas2,
}
/////////_____________________________________________________________________________///////////
/////////_____________________________________________________________________________///////////
// var main = ui.Panel({style: {width: '310px', padding: '1px'}});
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var title = ui.Label('2018-08-01 2018-10-10', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
// main.add(title);
// ui.root.insert(0, main);
//////////////////________________________________SPLIT PANEL_______________________________/////////////////
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-75.7846, 40.6623, 8);
//////////////////_______________________________________________________________/////////////////