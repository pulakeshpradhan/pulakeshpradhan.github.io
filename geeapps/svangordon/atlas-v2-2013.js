var image = ee.Image("users/svangordon/v0730"),
    image2 = ee.Image("users/svangordon/v0731");
var geom = image.geometry().union(image2.geometry())
// Map.addLayer(geom)
    var palettizer = require('users/svangordon/palettizer:palettizer');
    var atlasColors = [
        "8400a8", // Forest / Forêt
        "8bad8b", // Savanna / Savane
        "000080", // Wetland - floodplain / Prairie marécageuse - vallée inondable
        "ffcc99", // Steppe / Steppe
        "808000", // Plantation / Plantation
        "33cccc", // Mangrove / Mangrove
        "ffff96", // Agriculture / Zone de culture
        "3366ff", // Water bodies / Plans d'eau
        "ff99cc", // Sandy area / surfaces sableuses
        "969696", // Rocky land / Terrains rocheux
        "a87000", // Bare soil / Sols dénudés
        "ff0000", // Settlements / Habitations
        "ccff66", // Irrigated agriculture / Cultures irriguées
        "a95ce6", // Gallery forest and riparian forest / Forêt galerie et formation ripicole
        "d296e6", // Degraded forest / Forêt dégradée
        "a83800", // Bowe / Bowé
        "f5a27a", // Thicket / Fourré
        "ebc961", // Agriculture in shallows and recession / Cultures des bas-fonds et de décrue
        "28734b", // Woodland / Forêt claire
        "ebdf73", // Cropland and fallow with oil palms / Cultures et jachère sous palmier à huile
        "beffa6", // Swamp forest / Forêt marécageuse
        "a6c28c", // Sahelian short grass savanna / Savane sahélienne
        "0a9696", // Herbaceous savanna / Savane herbacée
        "749373", // Shrubland / Zone arbustive
        "505050", // Open mine / Carrière
        "FFFFFF"  // Cloud / Nuage
    ];
    var atlasClasses = [1,2,3,4,6,7,8,9,10,11,12,13,14,15,21,22,23,24,25,27,28,29,31,32,78,99];
    var image = ee.ImageCollection([image, image2]).min().clip(geom);
    var image = palettizer.visualizeCategoricalImage(image, 'b1', atlasClasses, atlasColors);
    // var south = palettizer.visualizeCategoricalImage(image2, 'b1', atlasClasses, atlasColors);
    Map.addLayer(image, {}, 'Atlas V2 2013 Landsat 8');
    Map.centerObject(image);
    // Map.addLayer(south, {}, 'south')
    // print(Object.keys(palettizer))
    // Map.addLayer(image)