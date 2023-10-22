var image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/Berlin4"
    }) || ee.Image("users/pmisson/Berlin4"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                13.273551112517485,
                52.565723171257424
              ],
              [
                13.273551112517485,
                52.431121414478135
              ],
              [
                13.567435389861235,
                52.431121414478135
              ],
              [
                13.567435389861235,
                52.565723171257424
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[13.273551112517485, 52.565723171257424],
          [13.273551112517485, 52.431121414478135],
          [13.567435389861235, 52.431121414478135],
          [13.567435389861235, 52.565723171257424]]], null, false),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/SantanderMosaic_low_modificado"
    }) || ee.Image("users/pmisson/SantanderMosaic_low_modificado"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/pmisson/iss067e359111_modificado"
    }) || ee.Image("users/pmisson/iss067e359111_modificado"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/pmisson/iss047e022994_modificado"
    }) || ee.Image("users/pmisson/iss047e022994_modificado"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/pmisson/KX10_GIU_20220319_W445_N4240_202200103151_L4A_B_RGB"
    }) || ee.Image("users/pmisson/KX10_GIU_20220319_W445_N4240_202200103151_L4A_B_RGB"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/pmisson/SDGSAT-1/sdgsat_SPAIN_2"
    }) || ee.ImageCollection("users/pmisson/SDGSAT-1/sdgsat_SPAIN_2");
Map.setOptions('SATELLITE');
// Define the location as a point geometry
var point = ee.Geometry.Point(-3.8006, 43.4655); // Replace 'lon' and 'lat' with the longitude and latitude of your desired location.
// Load an image collection (for example, Landsat 8 collection)
var collection = imageCollection
  .filterDate('2023-04-18', '2023-12-31') // Add date range if needed
  .filterBounds(point)//.first();
var area =image3.geometry()
// Print the filtered collection
print("Filtered Image Collection:", collection);
Map.addLayer(image2,{},'Santander 2013 (ASM)');
Map.addLayer(image4,{},'Santander 2016 (ISS)');
Map.addLayer(image3,{},'Santander 2017 (ISS)');
var imageVisParam = {"opacity":1,"bands":["b1","b2","b3"],"max":[4000,4000,1000],"gamma":[2,2,3]};
Map.addLayer(image5.clip(area),imageVisParam,'Santander 2022 (SDGSAT-1)');
Map.addLayer(collection,imageVisParam,'Santander 2023 (SDGSAT-1)');//
Map.setCenter(-3.8006, 43.4655,11);