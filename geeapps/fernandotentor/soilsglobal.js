var hwsd2 = ui.import && ui.import("hwsd2", "image", {
      "id": "projects/sat-io/open-datasets/FAO/HWSD_V2_SMU"
    }) || ee.Image("projects/sat-io/open-datasets/FAO/HWSD_V2_SMU");
Map.addLayer(hwsd2.select('HWSD2_ID').randomVisualizer(), {}, 'HSWD2 ID');
Map.addLayer(hwsd2.select('WISE30s_ID').randomVisualizer(), {}, 'WISE30s ID');
Map.addLayer(hwsd2.select('COVERAGE').randomVisualizer(), {}, 'COVERAGE');
Map.addLayer(hwsd2.select('SHARE').randomVisualizer(), {}, 'SHARE');
Map.addLayer(hwsd2.select('WRB4').randomVisualizer(), {}, 'WRB4');
Map.addLayer(hwsd2.select('WRB_PHASES').randomVisualizer(), {}, 'WRB_PHASES');
Map.addLayer(hwsd2.select('WRB2_CODE').randomVisualizer(), {}, 'WRB2_CODE');
Map.addLayer(hwsd2.select('FAO90').randomVisualizer(), {}, 'FAO90');
Map.addLayer(hwsd2.select('KOPPEN').randomVisualizer(), {}, 'KOPPEN');
Map.addLayer(hwsd2.select('TEXTURE_USDA').randomVisualizer(), {}, 'TEXTURE_USDA');
Map.addLayer(hwsd2.select('REF_BULK_DENSITY').randomVisualizer(), {}, 'REF_BULK_DENSITY');
Map.addLayer(hwsd2.select('BULK_DENSITY').randomVisualizer(), {}, 'BULK_DENSITY');
Map.addLayer(hwsd2.select('DRAINAGE').randomVisualizer(), {}, 'DRAINAGE');
Map.addLayer(hwsd2.select('ROOT_DEPTH').randomVisualizer(), {}, 'ROOT_DEPTH');
Map.addLayer(hwsd2.select('AWC').randomVisualizer(), {}, 'AWC');
Map.addLayer(hwsd2.select('PHASE1').randomVisualizer(), {}, 'PHASE1');
Map.addLayer(hwsd2.select('PHASE2').randomVisualizer(), {}, 'PHASE2');
Map.addLayer(hwsd2.select('ROOTS').randomVisualizer(), {}, 'ROOTS');
Map.addLayer(hwsd2.select('IL').randomVisualizer(), {}, 'IL');
Map.addLayer(hwsd2.select('ADD_PROP').randomVisualizer(), {}, 'ADD_PROP');