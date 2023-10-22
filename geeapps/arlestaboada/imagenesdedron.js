var curicocha=ee.FeatureCollection('users/arlestaboada/curicocha').geometry();
  var llamacocha=ee.FeatureCollection('users/arlestaboada/llamacocha').geometry();
  var cuenca_vilcanota_final=ee.FeatureCollection('users/arlestaboada/cuenca_vilcanota_final').geometry();
 var Ortho_Bofedal_Curicocha_10cm=ee.Image('users/arlestaboada/Ortho_Bofedal_Curicocha_10cm');
  var Ortho_Llamacocha_10cm=ee.Image('users/arlestaboada/Ortho_Llamacocha_10cm');
  var Ortophoto_Curicocha_JPEG=ee.Image('users/arlestaboada/Ortophoto_Curicocha_JPEG');
 var ortho_llamacocha_II_15cm=ee.Image('users/arlestaboada/ortho_llamacocha_II_15cm');
 Map.centerObject(curicocha)
 Map.addLayer(curicocha,[],"curicocha");
 Map.addLayer(llamacocha,[],"llamacocha");
 Map.addLayer(cuenca_vilcanota_final,[],"cuenca_vilcanota_final");
 Map.addLayer(Ortho_Bofedal_Curicocha_10cm,[],"Ortho_Bofedal_Curicocha_10cm");
 Map.addLayer(Ortho_Llamacocha_10cm,[],"Ortho_Llamacocha_10cm");
 Map.addLayer(Ortophoto_Curicocha_JPEG,[],"Ortophoto_Curicocha_JPEG");
  Map.addLayer(ortho_llamacocha_II_15cm,[],"ortho_llamacocha_II_15cm");