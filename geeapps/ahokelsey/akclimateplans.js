var BaselineErosion = ui.import && ui.import("BaselineErosion", "table", {
      "id": "users/ahokelsey/BaselineErosionAssessment"
    }) || ee.FeatureCollection("users/ahokelsey/BaselineErosionAssessment"),
    ClimateActionPlan = ui.import && ui.import("ClimateActionPlan", "table", {
      "id": "users/ahokelsey/ClimateActionPlan"
    }) || ee.FeatureCollection("users/ahokelsey/ClimateActionPlan");
//////////////// Map of Climate Change Plans in Alaska //////////////////////
///////////////////////////////////////////////////////////////
//                1) Import Layers of Interest               //
///////////////////////////////////////////////////////////////
var BaselineErosion = ee.FeatureCollection("users/ahokelsey/BaselineErosionAssessment");
var ClimateActionPlan = ee.FeatureCollection("users/ahokelsey/ClimateActionPlan");
///////////////////////////////////////////////////////////////
//      2) Set up map appearance and app layers             //
///////////////////////////////////////////////////////////////
Map.setCenter(-153.751590, 65.438643, 4);
Map.setOptions('hybrid');
Map.style().set('cursor', 'crosshair');
//Add these layers to the map. They will be added but not displayed
Map.addLayer(BaselineErosion, {color: 'blue'}, 'Adaptation Plans');
Map.addLayer(ClimateActionPlan, {color: 'red'}, 'Action Plans');
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//App title
var header = ui.Label('Climate Plans in Alaska', {fontSize: '25px', fontWeight: 'bold', color: '4393c3'});
//App summary
var text = ui.Label('To turn toggle layers, click the drop-down options from the Layers botton in the top right corner of the map.', {fontSize: '15px', fontWeight: 'bold'});
var text2 = ui.Label('Climate planning is underway in Alaska by way of statewide, borough, city and Alaska Native village plans. This tool visualizes climate action plans, climate adaptation plans, hazard mitigation plans, and impact assessments. Click the points for a url to the plan. Some publications that include this map:',{fontSize: '15px'});
//Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text, text2],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4393c3'},
  }),
  ui.Label({
    value:'Legend:',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel 
panel.add(intro);
//Add main panel to the root of our GUI
ui.root.insert(1,panel);
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 'max'.
function makeLegend2 (rdbu) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((rdbu.max-rdbu.min)/100.0).add(rdbu.min);
  var legendImage = gradient.visualize(rdbu);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('0'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('1')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add this widget to the panel
panel.add(makeLegend2(rdbu));