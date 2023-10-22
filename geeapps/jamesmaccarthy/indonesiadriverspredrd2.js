Map.setCenter(110.6139, -0.5122, 8)
var pred = ee.ImageCollection('projects/anika-alert-drivers/assets/round2_predictions')
var chips = ee.FeatureCollection('projects/anika-alert-drivers/assets/test_chips_all')
var glad = ee.FeatureCollection('projects/anika-alert-drivers/assets/glad_alerts/glad_july2019')
            .filterBounds(pred.geometry())
var selected_chips = ee.List([
  '49MDV_0','49MDV_1','49MDV_16','49MDV_45','49MDV_51',
  '49MDV_81','49MDV_88','49MDV_93','49NDA_54','49NDA_64',
  '49NDA_57','49NDA_75','49NDA_34','49NDA_86','49NDA_25',
  '49NDA_7','49NDA_14','49NDA_37','49NDA_88','49MDU_90',
  '49MDU_64','49MDU_95','49MDU_67','49MDU_81','49MDU_92',
  '49MDU_43','49MDU_74','49MDU_83'
])
var test_chips = chips.filter(ee.Filter.inList('name', selected_chips))
var s2 = ee.ImageCollection('projects/nicfi-data-sharing/assets/alert-drivers/s2-ref-imgs/s2_20190805')
            .mosaic()
            .updateMask(pred.mosaic().gte(0))
Map.addLayer(s2, null, 'Sentinel-2')
var pred_viz = {
  min:0,
  max:11,
  opacity: 0.8,
  palette:[
    'F5A700',
    'FFDD94',
    'EDE900',
    'FFFEA3',
    '139100',
    '99F78B',
    '8F8F8F',
    'DEDEDE',
    '6200FF',
    '734900',
    '3D98FF',
    'F500E4'
  ]
}
Map.addLayer(pred, pred_viz, 'Prediction')
Map.addLayer(glad.style({fillColor:'red', color:'FFFFFF00', pointSize:3}), null, 'GLAD Alerts', false)
Map.addLayer(test_chips.style({color:'00ffd5', fillColor:'FFFFFF00'}), null, 'Chips')