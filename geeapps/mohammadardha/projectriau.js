var prioritas = ui.import && ui.import("prioritas", "table", {
      "id": "users/mohammadardha/PRIORITASPEMADAMAN"
    }) || ee.FeatureCollection("users/mohammadardha/PRIORITASPEMADAMAN"),
    Tubuh_Air = ui.import && ui.import("Tubuh_Air", "table", {
      "id": "users/mohammadardha/TubuhAir"
    }) || ee.FeatureCollection("users/mohammadardha/TubuhAir"),
    Jalan = ui.import && ui.import("Jalan", "table", {
      "id": "users/mohammadardha/jalanRiau"
    }) || ee.FeatureCollection("users/mohammadardha/jalanRiau");
// Select HS. Check properties of a HS, using Inspector to select metadata. 
var Tinggi = prioritas.filterMetadata('Prioritas', 'equals', 'Tinggi');
Map.addLayer(Tinggi, {color: 'FF0000'}, 'Prioritas Tinggi');
// Select HS. Check properties of a HS, using Inspector to select metadata. 
var Sedang = prioritas.filterMetadata('Prioritas', 'equals', 'Sedang');
Map.addLayer(Sedang, {color: '#eaff02'}, 'Prioritas Sedang');
// Select HS. Check properties of a HS, using Inspector to select metadata. 
var Rendah = prioritas.filterMetadata('Prioritas', 'equals', 'Rendah');
Map.addLayer(Rendah, {color: '#0bff67'}, 'Prioritas Rendah');
// Add Jalan 
Map.addLayer(Jalan, {color: '#080200'}, 'Jalan');
// Add Tubuh Air 
Map.addLayer(Tubuh_Air, {color: '#2d00ff'}, 'Tubuh Air');