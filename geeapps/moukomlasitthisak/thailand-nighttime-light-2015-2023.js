//1) โหลดพื้นที่ศึกษาในประเทศไทย
var ROI = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.eq('country_na', 'Thailand'));
Map.addLayer(ROI, {'palette': 'f03b20', 'opacity': 1}, 'Ukraine', true);
var images = {
  '2015': getMonthlySentinelComposite('2015-01-01', '2015-12-31'),
  '2016': getMonthlySentinelComposite('2016-01-01', '2016-12-31'),
  '2017': getMonthlySentinelComposite('2017-01-01', '2017-12-31'),
  '2018': getMonthlySentinelComposite('2018-01-01', '2018-12-31'),
  '2019': getMonthlySentinelComposite('2019-01-01', '2019-12-31'),
  '2020': getMonthlySentinelComposite('2020-01-01', '2020-12-31'),
  '2021': getMonthlySentinelComposite('2021-01-01', '2021-12-31'),
  '2022': getMonthlySentinelComposite('2022-01-01', '2022-12-31'),
  '2023': getMonthlySentinelComposite('2023-01-01', '2023-12-31'),
};
function getMonthlySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var night = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
                      .filterDate(date, date.advance(1, 'month'))
                      .filterBounds(ROI)
                      .select('avg_rad')
                      .median();
  return night.clip(ROI).visualize({min: 1, max: 20, palette:['violet','indigo','blue','green','yellow','orange','red']});
}
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
  var label = ui.Label('เลือกปีเพื่อเปรียบเทียบ');
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
leftMap.centerObject(ROI, 6);
leftMap.setOptions("HYBRID")
rightMap.setOptions("HYBRID");