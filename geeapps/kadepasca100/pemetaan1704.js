var image = ui.import && ui.import("image", "image", {
      "id": "projects/pemetaan1704/assets/1704030014"
    }) || ee.Image("projects/pemetaan1704/assets/1704030014"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/pemetaan1704/assets/batas_airdingin"
    }) || ee.FeatureCollection("projects/pemetaan1704/assets/batas_airdingin"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/pemetaan1704/assets/bangunan_airdingin"
    }) || ee.FeatureCollection("projects/pemetaan1704/assets/bangunan_airdingin");
Map.setCenter(103.348108,-4.793669, 18);
Map.addLayer(image,{},'Basemap Drone');
Map.addLayer(table,{},'Batas Desa');
Map.addLayer(table2,{},'Bangunan Pemukiman');