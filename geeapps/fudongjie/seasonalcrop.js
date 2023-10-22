var table = ee.FeatureCollection("users/fudongjie/ReferenceData_SouthEastAsia_v4"),
    c1 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N00E100_001"),
    c2 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N00E110_001"),
    c3 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N00E120_001"),
    c4 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N00E130_001"),
    c5 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N00E90_001"),
    c6 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N10E100_001"),
    c7 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N10E110_001"),
    c8 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N10E120_001"),
    c9 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N10E90_001"),
    c10 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N20E100_001"),
    c11 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_N20E90_001"),
    c12 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E100_001"),
    c13 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E120_001"),
    c14 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E130_001"),
    c15 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E140_001"),
    c16 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E150_001"),
    c17 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E160_001"),
    c18 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S10E90_001"),
    c19 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S20E110_001"),
    c20 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S20E120_001"),
    c21 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S20E140_001"),
    c22 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S20E150_001"),
    c23 = ee.Image("users/fudongjie/Crop30m/GFSAD30SEACE_2015_S20E160_001"),
    water = ee.ImageCollection("JRC/GSW1_0/YearlyHistory"),
    imageCollection = ee.ImageCollection("JRC/GSW1_0/MonthlyHistory");
var myCrop=ee.ImageCollection([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c10,c11,c12,c13,c14,
              c15,c16,c17,c18,c19,c20,c21,c22,c23]);
myCrop=myCrop.mosaic();
Map.addLayer(table)
var cropViz = {max: 2, palette: ['f4a460']};
// var myWater=water.map(function(img){
//   return img.gte(2);
// })
var myWater=water.filterDate('2015-01-01','2015-12-31').first();
myWater=ee.Image(myWater);
myWater=myWater.updateMask(myWater.gte(2))
var waterViz = { min:2,max: 3, palette: ['8989ff', '0000FF']};
var center = {lon: 103.1018, lat: 15.3991, zoom: 7};
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
rightMap.setControlVisibility({mapTypeControl: true});
rightMap.setControlVisibility({layerList : true});
rightMap.setOptions('satellite');
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
leftMap.addLayer(myCrop.updateMask(myCrop.eq(2)),cropViz)
rightMap.addLayer(myWater,waterViz)
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
// ui.root.add(myPanel)
// ui.root.add(panel)
// Set crosshair cursor for clicking on Map
leftMap.style().set("cursor","crosshair");
rightMap.style().set("cursor","crosshair");