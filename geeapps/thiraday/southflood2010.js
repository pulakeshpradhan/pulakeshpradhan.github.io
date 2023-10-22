var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-thiraday/assets/tifraseter2010n1"
    }) || ee.Image("projects/ee-thiraday/assets/tifraseter2010n1");
var vispar = {min:10, max:30, palette:['0067FF']}
Map.setCenter(100, 8, 8);
Map.addLayer( image, vispar, 'flood2010')