var s2 = ui.import && ui.import("s2", "image", {
      "id": "projects/nicfi-data-sharing/assets/alert-drivers/s2-ref-imgs/S2B_MSIL2A_20190805T024559_N0213_R132_T49MDV_20190805T064725"
    }) || ee.Image("projects/nicfi-data-sharing/assets/alert-drivers/s2-ref-imgs/S2B_MSIL2A_20190805T024559_N0213_R132_T49MDV_20190805T064725"),
    pred = ui.import && ui.import("pred", "image", {
      "id": "projects/nicfi-data-sharing/assets/alert-drivers/round1_pred"
    }) || ee.Image("projects/nicfi-data-sharing/assets/alert-drivers/round1_pred"),
    image = ui.import && ui.import("image", "image", {
      "id": "projects/nicfi-data-sharing/assets/alert-drivers/planet_jul2019"
    }) || ee.Image("projects/nicfi-data-sharing/assets/alert-drivers/planet_jul2019"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/anika-alert-drivers/assets/test_chips_20211202"
    }) || ee.FeatureCollection("projects/anika-alert-drivers/assets/test_chips_20211202"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/anika-alert-drivers/assets/glad_july2019"
    }) || ee.FeatureCollection("projects/anika-alert-drivers/assets/glad_july2019");
Map.setCenter(110.6139, -0.5122, 10)
var chips = ee.FeatureCollection(table)
var glad = ee.FeatureCollection(table2).filterBounds(pred.geometry())
Map.addLayer(s2, null, 'Sentinel-2')
var pred_viz = {
  min:2,
  max:12,
  opacity: 0.8,
  palette:[
    'C4B000', // old large ag
    'ADADAD', // old mining
    'DAD700', // old small ag
    '21801D', // natural forest
    'DAC300', // new large ag
    'D8D8D8', // new mining
    'F2EF00', // new small ag
    '705400', // roads
    '3DD636', // selective logging
    '6900FF', // settlements
    '00A5FF'  // water
  ]
}
Map.addLayer(pred, pred_viz, 'Prediction')
Map.addLayer(glad.style({fillColor:'red', color:'FFFFFF00', pointSize:3}), null, 'GLAD Alerts')
Map.addLayer(chips.style({color:'00ffd5', fillColor:'FFFFFF00'}), null, 'Chips')