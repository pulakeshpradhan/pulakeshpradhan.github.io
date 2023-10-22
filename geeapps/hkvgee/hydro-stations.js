var table = ui.import && ui.import("table", "table", {
      "id": "users/hkvgee/Hydrostations"
    }) || ee.FeatureCollection("users/hkvgee/Hydrostations");
Map.addLayer(table);
Map.centerObject(table);