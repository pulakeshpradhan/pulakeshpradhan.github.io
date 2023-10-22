var mining = ui.import && ui.import("mining", "table", {
      "id": "projects/sat-io/open-datasets/global-mining/global_mining_polygons"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/global-mining/global_mining_polygons"),
    validation = ui.import && ui.import("validation", "table", {
      "id": "projects/sat-io/open-datasets/global-mining/global_mining_validation"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/global-mining/global_mining_validation");
Map.addLayer(ee.FeatureCollection(mining).style({fillColor: '00000000',color: 'af8dc3',width:3}),{},'Mining Polygons')
Map.addLayer(ee.FeatureCollection(validation).style({color: 'FC8D59',width:4}),{},'Mining Validation Points')
Map.setOptions('SATELLITE')