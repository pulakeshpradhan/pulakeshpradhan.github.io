var image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/JL1GF03C01_MSS_20210924055731_200062031_105_0204_001_L1A_MSS_ORTHO_MS"
    }) || ee.Image("users/pmisson/JL1GF03C01_MSS_20210924055731_200062031_105_0204_001_L1A_MSS_ORTHO_MS"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/E_4PAQVUUAg_Ltz-denoise-low-light-sharpen-motion_modificado"
    }) || ee.Image("users/pmisson/E_4PAQVUUAg_Ltz-denoise-low-light-sharpen-motion_modificado"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "max": 4096,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"max":4096,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.881887166505813,
                28.641022843914865
              ],
              [
                -17.881887166505813,
                28.608325205342837
              ],
              [
                -17.826612203126906,
                28.608325205342837
              ],
              [
                -17.826612203126906,
                28.641022843914865
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
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-17.881887166505813, 28.641022843914865],
          [-17.881887166505813, 28.608325205342837],
          [-17.826612203126906, 28.608325205342837],
          [-17.826612203126906, 28.641022843914865]]], null, false),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/pmisson/LaPalma_volcan"
    }) || ee.Image("users/pmisson/LaPalma_volcan"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.8984146509803,
                28.630092985174176
              ],
              [
                -17.8984146509803,
                28.595281848127218
              ],
              [
                -17.84622959238655,
                28.595281848127218
              ],
              [
                -17.84622959238655,
                28.630092985174176
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
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-17.8984146509803, 28.630092985174176],
          [-17.8984146509803, 28.595281848127218],
          [-17.84622959238655, 28.595281848127218],
          [-17.84622959238655, 28.630092985174176]]], null, false),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/pmisson/LaPalma_Cosmo_2"
    }) || ee.Image("users/pmisson/LaPalma_Cosmo_2"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/pmisson/ISS043-E-69142-denoise-low-light-sharpen-motion_modificado"
    }) || ee.Image("users/pmisson/ISS043-E-69142-denoise-low-light-sharpen-motion_modificado"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/pmisson/ISS065-E-415980-denoise-severe-noise_modificado"
    }) || ee.Image("users/pmisson/ISS065-E-415980-denoise-severe-noise_modificado"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/pmisson/iss065e439563-denoise-raw_modificado"
    }) || ee.Image("users/pmisson/iss065e439563-denoise-raw_modificado"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/pmisson/iss065e439574-denoise-raw_modificado"
    }) || ee.Image("users/pmisson/iss065e439574-denoise-raw_modificado");
/*
// Load the two images to be registered.
var image1 = image2;
var image2 = image;
// Use bicubic resampling during registration.
var image1Orig = image1.resample('bicubic');
var image2Orig = image2.resample('bicubic');
// Choose to register using only the 'R' band.
var image1RedBand = image1Orig.select('b1');
var image2RedBand = image2Orig.select('b1');
var displacement = image2RedBand.displacement({
  referenceImage: image1RedBand,
  maxOffset: 1000.0,
  patchWidth: 1000.0
});
var offset = displacement.select('dx').hypot(displacement.select('dy'));
var angle = displacement.select('dx').atan2(displacement.select('dy'));
// Display offset distance and angle.
Map.addLayer(offset, {min:0, max: 20}, 'offset');
Map.addLayer(angle, {min: -Math.PI, max: Math.PI}, 'angle');
Map.setCenter(-17.86888, 28.61529, 15);
// Use the computed displacement to register all original bands.
var registered = image2Orig.displace(displacement);
// Show the results of co-registering the images.
var visParams = {bands: ['b1', 'b2', 'b3'], max: 4000};
Map.addLayer(image1Orig, visParams, 'Reference');
Map.addLayer(image2Orig, visParams, 'Before Registration');
Map.addLayer(registered, visParams, 'After Registration');
*/
Map.setOptions('SATELLITE');
Map.addLayer(image5, visParams2, 'ISS_Samantha_Cristoforety');
Map.setCenter(-17.8561, 28.6132,12);
var image3=image3.clip(geometry2)
var visParams2 = {bands: ['b1', 'b2', 'b3'], max: 255};
Map.addLayer(image2, visParams2, 'ISS_Thomas_Pesquet');
Map.addLayer(image6, visParams2, 'ISS_Thomas_Pesquet_1');
var visParams = {bands: ['b1', 'b2', 'b3'],min:1, max: 4000,gamma:5};
Map.addLayer(image4, visParams2, 'ISS_Oleg_Novitskiy');
Map.addLayer(image7, visParams2, 'ISS_Thomas_Pesquet_2');
Map.addLayer(image8, visParams2, 'ISS_Thomas_Pesquet_3');
//Map.addLayer(image3, visParams, 'CGS');
var composite2=image3.visualize(visParams)
Map.addLayer(composite2, {}, 'CGS');
//Export.image.toDrive(composite2,'LaPalma','LaPalma',{scale:1, region: geometry,type: 'float'})