/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dsm = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    ulb = ee.FeatureCollection("users/morceli09/el_taref");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
// Posons une palette pour visualiser cette élévation
var elevationVis = { 
  min : 100.0,
  max : 5000.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611','ffb613','ff8b13',
    'ff6e08','ff500d','ff0000','de0101','c21301','0602ff','235cb1',
    '307ef3','269db1','30c8e2','32d3ef','3be285','3ff38f','86e26f'
    ],
};
// Mais nous ne sommes intéressés que de voir notre zone d'étude
// Voir ci-dessus que la limite ULB est déjà importée ci-dessus en tant que variable 'ulb'
Map.centerObject(ulb,7);
// Maintenant, sélectionnons la première bande 'DSM' et mosaïquons et découpons la limite DSM à ULB
var dsm_ulb = dsm.select('DSM').filterBounds(ulb).mosaic().clip(ulb);
// La commande ci-dessous ajoutera un DSM découpé à la vue cartographique
Map.addLayer(dsm_ulb, elevationVis, 'Elevation (ALOS)');