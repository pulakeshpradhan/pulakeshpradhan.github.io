var image = ee.Image("users/rodrigogallis/ConcentraodeNematoides"),
    image2 = ee.Image("users/rodrigogallis/Falhas_SVM"),
    image3 = ee.Image("users/rodrigogallis/teste"),
    image4 = ee.Image("users/rodrigogallis/Concentracao2018"),
    image5 = ee.Image("users/rodrigogallis/ConcentraoNematoide"),
    image6 = ee.Image("users/rodrigogallis/Produtividade_cor"),
    image7 = ee.Image("users/rodrigogallis/Produtividade2018cor");
//Map.setCenter(-25.01, -4.28, 4);
Map.addLayer(image, {bands: ['b1', 'b2', 'b3']}, 'Nematoide Municipio');
Map.addLayer(image2, {bands: ['b1', 'b2', 'b3']}, 'Falha');
Map.addLayer(image3, {bands: ['b1', 'b2', 'b3']}, 'Pivo RGB');
Map.addLayer(image4, {bands: ['b1', 'b2', 'b3']}, 'Concentracao Nematoide 2018');
Map.addLayer(image5, {bands: ['b1', 'b2', 'b3']}, 'Concentracao Nematoide 2019');
Map.addLayer(image6, {bands: ['b1', 'b2', 'b3']}, 'Produtividade 2019');
Map.addLayer(image7, {bands: ['b1', 'b2', 'b3']}, 'Produtividade 2018');
//Map.addLayer(image)
//Map.addLayer(image2)
//Map.addLayer(image3)
//Map.addLayer(image4)
//Map.addLayer(image5)
//Map.addLayer(image6)
Map.centerObject(image,12);