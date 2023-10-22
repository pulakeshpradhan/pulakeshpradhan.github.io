/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dsm = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    faomatifou = ee.FeatureCollection("users/gharbiyamina6/bv_matifou");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
// Posons une palette pour visualiser cette élévation.
var elevPalette = ['yellow', 'green', 'Brown'];
var elev = {min: 1000, max: 3000, palette: elevPalette};
// Mais nous ne sommes intéressés que de voir notre zone d'étude
// Voir ci-dessus que la limite faomatifou est déjà importée ci-dessus en tant que variable 'faomatifou'
Map.centerObject(faomatifou,7);
// Maintenant, sélectionnons la première bande 'DSM' et mosaïquons et découpons la limite DSM à faomatifou
var dsm_faomatifou = dsm.select('DSM').filterBounds(faomatifou).mosaic().clip(faomatifou);
// La commande ci-dessous ajoutera un DSM découpé à la vue cartographique
Map.addLayer(dsm_faomatifou, elev, 'Elevation (ALOS)');