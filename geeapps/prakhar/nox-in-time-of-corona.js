// File name: AQ_SplitCompare
// Author: Prakhar Misra
// Date created: 3/27/2020
// Date last modified: 3/27/2020
// Location - Machida
// Descrp: visualzie changes due to Corona on NO2
// Reference: https://dhruvmehrotra3.users.earthengine.app/view/earther-time-series
// ------------------------------------------------------------------------------
//             prepare base data
//-------------------------------------------------------------------------------
function maskS5clouds(image) {
  // Mask the clouds
  var qa = image.select('cloud_fraction');
  // Both flags should be set to zero, indicating clear conditions.
  var fractionThreshold = 0.2
  var mask = qa.lt(fractionThreshold);
  return image.updateMask(mask);
} 
function getImage(collection) {
  // just apply a list of mappings
  return collection.map(maskS5clouds).select('tropospheric_NO2_column_number_density').mean();
}
// data collection to use
var datacollection = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
// get images for a list of weeks
var no2_201906w1 = getImage(datacollection.filterDate('2019-06-01', '2019-06-06'));
var no2_201902w4 = getImage(datacollection.filterDate('2019-02-21', '2019-02-28'));
var no2_201903w1 = getImage(datacollection.filterDate('2019-03-01', '2019-03-07'));
var no2_201903w2 = getImage(datacollection.filterDate('2019-03-08', '2019-03-14'));
var no2_201903w3 = getImage(datacollection.filterDate('2019-03-15', '2019-03-21'));
var no2_201903w4 = getImage(datacollection.filterDate('2019-03-22', '2019-03-28'));
// 2020
var no2_202002w4 = getImage(datacollection.filterDate('2020-02-21', '2020-02-28'));
var no2_202003w1 = getImage(datacollection.filterDate('2020-03-01', '2020-03-07'));                
// corona in India weeks                  
var no2_202003w2 = getImage(datacollection.filterDate('2020-03-08', '2020-03-14'));
var no2_202003w3 = getImage(datacollection.filterDate('2020-03-15', '2020-03-21'));
var no2_202003w4 = getImage(datacollection.filterDate('2020-03-22', '2020-03-28'));
var no2_202004w1 = getImage(datacollection.filterDate('2020-03-29', '2020-04-04'));
var no2_202004w2 = getImage(datacollection.filterDate('2020-04-05', '2020-04-11'));
//var no2_202004w2 = getImage(datacollection.filterDate('2020-04-05', '2020-04-11'));
var no2_202004w3 = getImage(datacollection.filterDate('2020-04-12', '2020-04-18'));
var no2_202004w4 = getImage(datacollection.filterDate('2020-04-19', '2020-04-25'));
// ------------------------------------------------------------------------------
//             make split map
//-------------------------------------------------------------------------------
function showLayer(images, indexPalette, indexNames) {
  // complete resuable function
  Map.add(ui.Label(
    'NO2 trend before and after lockdown', {fontWeight: 'bold', fontSize: '24px'}));
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
  var mapStyle = [{stylers: [{saturation: -100}]}, 
                {elementType:"labels", stylers:[{visibility:"on"}]},
                {featureType:"road", stylers:[{visibility:"on"}]}];
  // Create the left map, and have it display layer 0.
  var leftMap = ui.Map();
  leftMap.setControlVisibility(true);
  //leftMap.setOptions("Gray", {"Gray": mapStyle});
  var leftSelector = addLayerSelector(leftMap, 8, 'top-left');
  // Create the right map, and have it display layer 1.
  var rightMap = ui.Map();
  rightMap.setControlVisibility(true);
  rightMap.setOptions("Gray", {"Gray": mapStyle});
  var rightSelector = addLayerSelector(rightMap, 10, 'top-right');
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
  var linker = ui.Map.Linker([leftMap, rightMap]);
  // ============ Function to build up the legend panel ===============
  var addLegend = function(palette, names, lbl, pos) {
    var legend      = ui.Panel({style:{position:pos, padding:"8px 15px"}});
    var legendTitle = ui.Label({value:lbl, style:{margin:"0 0 4px 0", padding:"0"}});
    legend.add(legendTitle);
    var makeRow = function(color, name) {
      var colorBox    = ui.Label({style:{backgroundColor:color, border:"1px solid black", padding:"8px", margin:"0 0 4px 0"}});
      var description = ui.Label({value:name, style:{margin:"0 0 4px 6px"}});
      return ui.Panel({widgets:[colorBox, description], layout:ui.Panel.Layout.Flow("horizontal")});
    };
    for (var i = palette.length-1; i >= 0; i--) legend.add(makeRow(palette[i], names[i]));
    return legend;
  };
  var viLegendPanel = addLegend(indexPalette, indexNames, "NO2 (umol/m^2)", "bottom-left");
  leftMap.add(viLegendPanel);
  // =================== Text panel at the map footer ==================
  var refPanel = ui.Panel([
    ui.Label({
      value: 'Tropospheric NO2  before and after lockdown',
      style: {fontSize: "24px", fontWeight: "bold", margin: "0px 8px 0px 8px"}
    }),
    ui.Label({
      value: "Data Source Reference",
      style: {fontSize: "12px", fontWeight: "bold", margin: "0px 8px 0px 8px"}
    }),
    ui.Label({
      targetUrl: "https://prakhar.users.earthengine.app/view/cloud-fraction-effect-on-nox", 
      style: {margin: "0px 8px 0px 8px"}, 
      value: "Weekly mean of tropospheric column number density from 'Sentinel-5P NRTI NO2: Near Real-Time Nitrogen Dioxide' product. Cloud fraction was set as 20%.  To explore influence of cloud fraction check https://prakhar.users.earthengine.app/view/cloud-fraction-effect-on-nox"
    })
  ]);
  var discPanel = ui.Panel([
    ui.Label({
      value: "Disclaimer",
      style: {fontSize: "12px", fontWeight: "bold", margin: "8px 8px 0px 8px"}
    }),
    ui.Label({
      targetUrl: "https://mprakhar.github.io/",
      style: {margin: "0px 8px 0px 8px"}, 
      value: "The products elaborated in the framework of this project are realized to the best of our ability, optimizing the available data and information. All geographic data limitations due to  scale, resolution, date and interpretation of the original data sources. https://mprakhar.github.io/ "
    })
  ]);
  var textPanel = ui.Panel({style: {height: "100px"}});
  textPanel.add(refPanel);
  textPanel.add(discPanel);
  //  ------  set the full final scene  here ----------
  // Set the SplitPanel and textPanel in UI root.
  var pageGrid = ui.Panel([splitPanel,textPanel], ui.Panel.Layout.Flow("vertical"), {stretch: "both"});
  ui.root.widgets().reset([pageGrid]);
  leftMap.setCenter(77.45, 28.5, 6);
}
// -----------------------------------------------------------------------------------
/*
 * Set up the maps and control widgets
 */
var indexPalette = ['#0b429d', '#4c4daa', '#7558b5', '#9c62bc', '#c36dbc', '#ff7259'];
var indexNames   = ["0","40","80","120","160", "200"];
var band_viz = {
  min: 0,
  max: 0.0002,
  palette: indexPalette
};
var images = {
  '2019 Feb week4': no2_201902w4.visualize(band_viz),
  '2019 Mar week1': no2_201903w1.visualize(band_viz),
  '2019 Mar week2': no2_201903w2.visualize(band_viz),
  '2019 Mar week3': no2_201903w3.visualize(band_viz),
  '2019 Mar week4': no2_201903w4.visualize(band_viz),
  //'no2_201906 week1': no2_201906w1.visualize(band_viz),
  '2020 Feb week4': no2_202002w4.visualize(band_viz),
  '2020 Mar week1': no2_202003w1.visualize(band_viz),
  '2020 Mar week2': no2_202003w2.visualize(band_viz),
  '2020 Mar week3': no2_202003w3.visualize(band_viz),
  '2020 Mar week4 (Indian lockdown start)': no2_202003w4.visualize(band_viz),
  '2020 Apr week1': no2_202004w1.visualize(band_viz), 
  '2020 Apr week2': no2_202004w2.visualize(band_viz),
  '2020 Apr week3': no2_202004w3.visualize(band_viz),
  '2020 Apr week4': no2_202004w4.visualize(band_viz)
  };
showLayer(images, indexPalette,indexNames);