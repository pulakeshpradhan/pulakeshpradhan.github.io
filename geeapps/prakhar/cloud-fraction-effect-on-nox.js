// File name: AQ_SplitCompare
// Author: Prakhar Misra
// Date created: 3/27/2020
// Date last modified: 3/27/2020
// Location - Machida
// Descrp: Compare effect of changing the cloud fraction on NOx inference 
// ------------------------------------------------------------------------------
//             prepare base data
//-------------------------------------------------------------------------------
function getImage(fractionThreshold){
  function maskS5clouds(image) {
    // Mask the clouds
    var qa = image.select('cloud_fraction');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.lt(fractionThreshold);
    return image.updateMask(mask);
  } 
  function getImage(collection, fractionThreshold) {
    // just apply a list of mappings
    return collection.map(maskS5clouds).select('NO2_column_number_density').mean();
  }
  // data collection to use
  var datacollection = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
  // get images for a list of weeks
  var no2_201902w4 = getImage(datacollection.filterDate('2020-03-01', '2020-03-19'), 0.2);
  var band_viz = {
    min: 0,
    max: 0.0002,
    palette: ['#0b429d', '#4c4daa', '#7558b5', '#9c62bc', '#c36dbc', '#ff7259']
  };
  Map.addLayer(no2_201902w4, band_viz, "NOx cf:"+String(fractionThreshold))
}
// Create a label and slider.
var label = ui.Label('"Cloud fraction" for mean NOx (2020/03/01 -- 2020/03/19');
var slider = ui.Slider({
  min: 0,
  max: 1,
  step: .05,
  onChange: getImage,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
slider.setValue(0.05);
Map.setCenter(77, 28.5, 8);