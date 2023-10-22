var Purus_19870701_cl = ui.import && ui.import("Purus_19870701_cl", "table", {
      "id": "users/zoltansylvester/Purus_19870701_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Purus_19870701_cl"),
    Purus_20170804_cl = ui.import && ui.import("Purus_20170804_cl", "table", {
      "id": "users/zoltansylvester/Purus_20170804_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Purus_20170804_cl"),
    Purus_2_19870726_cl = ui.import && ui.import("Purus_2_19870726_cl", "table", {
      "id": "users/zoltansylvester/Purus_2_19870726_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Purus_2_19870726_cl"),
    Purus_2_20170728_cl = ui.import && ui.import("Purus_2_20170728_cl", "table", {
      "id": "users/zoltansylvester/Purus_2_20170728_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Purus_2_20170728_cl"),
    purus_2017 = ui.import && ui.import("purus_2017", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_001065_20170804"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_001065_20170804"),
    purus_1987 = ui.import && ui.import("purus_1987", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_001065_19870701"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_001065_19870701"),
    purus_2_1987 = ui.import && ui.import("purus_2_1987", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_233065_19870726"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_233065_19870726"),
    purus_2_2017 = ui.import && ui.import("purus_2_2017", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_233065_20170728"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_233065_20170728"),
    L8_visParams = ui.import && ui.import("L8_visParams", "imageVisParam", {
      "params": {
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0,
        "max": 1700
      }
    }) || {"bands":["B4","B3","B2"],"min":0,"max":1700},
    L5_visParams = ui.import && ui.import("L5_visParams", "imageVisParam", {
      "params": {
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0,
        "max": 1700
      }
    }) || {"bands":["B3","B2","B1"],"min":0,"max":1700};
Map.addLayer(purus_1987, L5_visParams, 'Purus_1987');
Map.addLayer(purus_2_1987, L5_visParams, 'Purus_2_1987');
Map.addLayer(purus_2017, L8_visParams, 'Purus_2017');
Map.addLayer(purus_2_2017, L8_visParams, 'Purus_2_2017');
Map.addLayer(Purus_19870701_cl, {color: 'FF0000'}, 'Purus_19870701_cl');
Map.addLayer(Purus_20170804_cl, {color: 'FF0000'}, 'Purus_20170804_cl');
Map.addLayer(Purus_2_19870726_cl, {color: 'FF0000'}, 'Purus_2_19870726_cl');
Map.addLayer(Purus_2_20170728_cl, {color: 'FF0000'}, 'Purus_2_20170728_cl');
Map.setCenter(-65.20, -7.42, 12);