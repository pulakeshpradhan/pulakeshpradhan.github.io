var table = ui.import && ui.import("table", "table", {
      "id": "users/kadepasca100/airdingin"
    }) || ee.FeatureCollection("users/kadepasca100/airdingin");
Map.setCenter(103.335666,-4.772839, 10);
Map.addLayer(table);