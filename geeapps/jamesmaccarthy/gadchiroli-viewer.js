var image = ui.import && ui.import("image", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-jun2020-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-jun2020-composite"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-nov2020-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-nov2020-composite"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-oct2020-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-oct2020-composite"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-jun2020-cloudless-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-jun2020-cloudless-composite"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-dec2020-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-dec2020-composite"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-jan2021-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-jan2021-composite"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-feb2021-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-feb2021-composite"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-mar2021-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-mar2021-composite"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-mar2021-cloudless-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-mar2021-cloudless-composite"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-apr2021-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-apr2021-composite"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-may2021-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-may2021-composite"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "projects/gadchiroli/assets/gadchiroli-may2021-cloudless-composite"
    }) || ee.Image("projects/gadchiroli/assets/gadchiroli-may2021-cloudless-composite");
var viz = {
  bands: ['b3', 'b2', 'b1'],
  min: 250,
  max: 2500
}
Map.addLayer(image12, viz, 'may2021_cloudless')
Map.addLayer(image11, viz, 'may2021', false)
Map.addLayer(image10, viz, 'apr2021', false)
Map.addLayer(image9, viz, 'mar2021_cloudless', false)
Map.addLayer(image8, viz, 'mar2021', false)
Map.addLayer(image7, viz, 'feb2021', false)
Map.addLayer(image6, viz, 'jan2021', false)
Map.addLayer(image5, viz, 'dec2020', false)
Map.addLayer(image2, viz, 'nov2020', false)
Map.addLayer(image3, viz, 'oct2020', false)
Map.addLayer(image, viz, 'jun2020', false)
Map.addLayer(image4, viz, 'jun2020_cloudless', false)