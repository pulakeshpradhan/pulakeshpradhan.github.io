var Jutai_19890805_cl = ui.import && ui.import("Jutai_19890805_cl", "table", {
      "id": "users/zoltansylvester/Jutai_19890805_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jutai_19890805_cl"),
    Jutai_20170802_cl = ui.import && ui.import("Jutai_20170802_cl", "table", {
      "id": "users/zoltansylvester/Jutai_20170802_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jutai_20170802_cl"),
    Jutai_2017 = ui.import && ui.import("Jutai_2017", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_003063_20170802"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_003063_20170802"),
    Jutai_1989 = ui.import && ui.import("Jutai_1989", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_003063_19890805"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_003063_19890805"),
    Jurua_Tarauaca_20070729_cl = ui.import && ui.import("Jurua_Tarauaca_20070729_cl", "table", {
      "id": "users/zoltansylvester/Jurua_Tarauaca_20070729_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_Tarauaca_20070729_cl"),
    Jurua_Tarauaca_20170724_cl = ui.import && ui.import("Jurua_Tarauaca_20170724_cl", "table", {
      "id": "users/zoltansylvester/Jurua_Tarauaca_20170724_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_Tarauaca_20170724_cl"),
    Jurua_Tarauaca_2007 = ui.import && ui.import("Jurua_Tarauaca_2007", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_004065_20070729"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_004065_20070729"),
    Jurua_Tarauaca_2017 = ui.import && ui.import("Jurua_Tarauaca_2017", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_004065_20170724"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_004065_20170724"),
    Jurua_2_20160815_cl = ui.import && ui.import("Jurua_2_20160815_cl", "table", {
      "id": "users/zoltansylvester/Jurua_2_20160815_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_2_20160815_cl"),
    Jurua_2_19970710_cl = ui.import && ui.import("Jurua_2_19970710_cl", "table", {
      "id": "users/zoltansylvester/Jurua_2_19970710_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_2_19970710_cl"),
    Jurua_19871012_cl = ui.import && ui.import("Jurua_19871012_cl", "table", {
      "id": "users/zoltansylvester/Jurua_19871012_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_19871012_cl"),
    Jurua_20170710_cl = ui.import && ui.import("Jurua_20170710_cl", "table", {
      "id": "users/zoltansylvester/Jurua_20170710_cl"
    }) || ee.FeatureCollection("users/zoltansylvester/Jurua_20170710_cl"),
    Jurua_1987 = ui.import && ui.import("Jurua_1987", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_002064_19871012"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_002064_19871012"),
    Jurua_2017 = ui.import && ui.import("Jurua_2017", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_002064_20170710"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_002064_20170710"),
    Jurua_2_1997 = ui.import && ui.import("Jurua_2_1997", "image", {
      "id": "LANDSAT/LT05/C01/T1_SR/LT05_003065_19970710"
    }) || ee.Image("LANDSAT/LT05/C01/T1_SR/LT05_003065_19970710"),
    Jurua_2_2016 = ui.import && ui.import("Jurua_2_2016", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_003065_20160815"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_003065_20160815"),
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
Map.addLayer(Jutai_1989, L5_visParams, 'Jutai_1989');
Map.addLayer(Jurua_Tarauaca_2007, L5_visParams, 'Jurua_Tarauaca_2007');
Map.addLayer(Jurua_1987, L5_visParams, 'Jurua_1987');
Map.addLayer(Jurua_2_1997, L5_visParams, 'Jurua_2_1997');
Map.addLayer(Jutai_2017, L8_visParams, 'Jutai_2017');
Map.addLayer(Jurua_Tarauaca_2017, L8_visParams, 'Jurua_Tarauaca_2017');
Map.addLayer(Jurua_2017, L8_visParams, 'Jurua_2017');
Map.addLayer(Jurua_2_2016, L8_visParams, 'Jurua_2_2016');
Map.addLayer(Jutai_19890805_cl, {color: 'FF0000'}, 'Jutai_19890805_cl');
Map.addLayer(Jutai_20170802_cl, {color: 'FF0000'}, 'Jutai_20170802_cl');
Map.addLayer(Jurua_Tarauaca_20070729_cl, {color: 'FF0000'}, 'Jurua_Tarauaca_20070729_cl');
Map.addLayer(Jurua_Tarauaca_20170724_cl, {color: 'FF0000'}, 'Jurua_Tarauaca_20170724_cl');
Map.addLayer(Jurua_2_19970710_cl, {color: 'FF0000'}, 'Jurua_2_19970710_cl');
Map.addLayer(Jurua_2_20160815_cl, {color: 'FF0000'}, 'Jurua_2_20160815_cl');
Map.addLayer(Jurua_19871012_cl, {color: 'FF0000'}, 'Jurua_19871012_cl');
Map.addLayer(Jurua_20170710_cl, {color: 'FF0000'}, 'Jurua_20170710_cl');
Map.setCenter(-70.13, -6.74, 14);