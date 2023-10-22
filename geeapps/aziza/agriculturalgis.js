var image = ee.Image("users/aziza/2018_06_24_Deere_Field_NDRE"),
    image2 = ee.Image("users/aziza/2018_07_08_Deere_Field_NDRE"),
    image3 = ee.Image("users/aziza/2018_07_24_Deere_Field_NDRE");
Map.addLayer(image);
Map.addLayer(image2);
Map.addLayer(image3);