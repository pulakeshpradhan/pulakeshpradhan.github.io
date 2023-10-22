var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-spiruel/assets/pixel_pioneers"
    }) || ee.Image("projects/ee-spiruel/assets/pixel_pioneers");
Map.addLayer(image)
Map.centerObject(image, 10)