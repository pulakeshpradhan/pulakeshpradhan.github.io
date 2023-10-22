var jaipur = ui.import && ui.import("jaipur", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
//GlobCover: Global Land Cover Map
var dataset = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var landcover = dataset.select('landcover');
var clip=landcover.clip(jaipur);
Map.addLayer(clip, {}, 'Landcover 2009');
Map.setCenter(75.78, 27.1052, 9);