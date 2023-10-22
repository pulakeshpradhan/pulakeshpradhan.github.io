var wetland2017 = ui.import && ui.import("wetland2017", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2017_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2017_RF_GEE"),
    wetland2021 = ui.import && ui.import("wetland2021", "image", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_2021_RF_GEE"
    }) || ee.Image("users/lexisgis/NigerDelta/NigerDelta_2021_RF_GEE"),
    SA = ui.import && ui.import("SA", "table", {
      "id": "users/lexisgis/NigerDelta/NigerDelta_aoi"
    }) || ee.FeatureCollection("users/lexisgis/NigerDelta/NigerDelta_aoi");
var Apal = [
  '#AAFF00', // Wetlands
  '#FF0000', //Mangroves
  '#FFFF73', // Agriculture
  '#FFFFFF', // Bare surface
  '#00734C', // Forest
  '#828282', // Urban
  '#E65078', // Woodland/Shrub/Grasslands 
  '#005CE6', // Water
];
var styling = {color: 'F5F5F5', fillColor: '00000000', width: 1.5};
Map.centerObject(SA,8.5);
Map.addLayer(wetland2021, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2021)');
// Map.addLayer(wetland2020, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2020)');
// Map.addLayer(wetland2019, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2019)');
// Map.addLayer(wetland2018, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2018)');
Map.addLayer(wetland2017, {min:1, max:8, palette:Apal}, 'Wetland Inventory (2017)');
Map.addLayer(SA.style(styling),{},'Study Area');
//Set Satellite image as reference base
Map.setOptions('HYBRID');