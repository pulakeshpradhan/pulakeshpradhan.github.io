var Meg = ui.import && ui.import("Meg", "table", {
      "id": "users/tbm1826/MG_district_boundary"
    }) || ee.FeatureCollection("users/tbm1826/MG_district_boundary");
var dataset = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers').filterBounds(Meg);
Map.addLayer(dataset, {}, 'river');
Export.table.toDrive(dataset,"Meghalaya_River", "shp");