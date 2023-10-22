var Yavari_19880715_cl = ui.import && ui.import("Yavari_19880715_cl", "table", {
      "id": "users/zoltansylvester/Yavari_19880715_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Yavari_19880715_cl"),
    Yavari_20160813_cl = ui.import && ui.import("Yavari_20160813_cl", "table", {
      "id": "users/zoltansylvester/Yavari_20160813_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Yavari_20160813_cl"),
    Yavari_trib_19880715_cl = ui.import && ui.import("Yavari_trib_19880715_cl", "table", {
      "id": "users/zoltansylvester/Yavari_trib_19880715_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Yavari_trib_19880715_cl"),
    Yavari_trib_20160713_cl = ui.import && ui.import("Yavari_trib_20160713_cl", "table", {
      "id": "users/zoltansylvester/Yavari_trib_20160713_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Yavari_trib_20160713_cl"),
    Yavari_2016 = ui.import && ui.import("Yavari_2016", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_005063_20160813"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_005063_20160813"),
    Yavari_1988 = ui.import && ui.import("Yavari_1988", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_005063_19880715"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_005063_19880715"),
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
    }) || {"bands":["B3","B2","B1"],"min":0,"max":1700},
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
    }) || {"bands":["B4","B3","B2"],"min":0,"max":1700};
Map.addLayer(Yavari_1988, L5_visParams, 'Yavari_1988');
Map.addLayer(Yavari_2016, L8_visParams, 'Yavari_2016');
Map.addLayer(Yavari_19880715_cl, {color: 'FF0000'}, 'Yavari_19880715_cl');
Map.addLayer(Yavari_20160813_cl, {color: 'FF0000'}, 'Yavari_20160813_cl');
Map.centerObject(Yavari_20160813_cl);
Map.addLayer(Yavari_trib_19880715_cl, {color: 'FF0000'}, 'Yavari_trib_19880715_cl');
Map.addLayer(Yavari_trib_20160713_cl, {color: 'FF0000'}, 'Yavari_trib_20160713_cl');
Map.setCenter(-71.40, -4.50, 16);