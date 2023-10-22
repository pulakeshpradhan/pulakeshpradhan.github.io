var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/pmisson/DVuelo_Jaen_Granada_Malaga"
    }) || ee.ImageCollection("users/pmisson/DVuelo_Jaen_Granada_Malaga");
Map.setOptions('SATELLITE');
Map.setCenter(-3.5301, 37.5397, 9);
var mosaic = imageCollection.mosaic();
Map.addLayer(mosaic)