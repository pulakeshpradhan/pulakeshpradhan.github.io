var image = ui.import && ui.import("image", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_argentina"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_argentina"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -64.01510603353381,
            -23.181924882700557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            38.900180705034245,
            -6.830303598015216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.91962604620221,
            47.07312652187764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.97320979458243,
            16.901260892285546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            44.96409980690328,
            41.95733680295583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            65.89437535019579,
            50.55421800969955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            28.101953395029682,
            56.43390229580819
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-64.01510603353381, -23.181924882700557]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([38.900180705034245, -6.830303598015216]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([25.91962604620221, 47.07312652187764]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([106.97320979458243, 16.901260892285546]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([44.96409980690328, 41.95733680295583]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([65.89437535019579, 50.55421800969955]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([28.101953395029682, 56.43390229580819]),
            {
              "system:index": "6"
            })]),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/nitamihaidaniel/corona/DS1027-1009DA251_tanzania"
    }) || ee.Image("users/nitamihaidaniel/corona/DS1027-1009DA251_tanzania"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_romania"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_romania"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_vietnam"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_vietnam"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_caucaz"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_caucaz"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_kazakhstan"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_kazakhstan"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/nitamihaidaniel/corona/KH4_latvia"
    }) || ee.Image("users/nitamihaidaniel/corona/KH4_latvia");
Map.setCenter(0,0,3);
Map.addLayer(image, {min:10, max:250}, 'Corona Argentina', false);
Map.addLayer(image2, {min:10, max:250}, 'Corona Tanzania', false);
Map.addLayer(image3, {min:-68.114, max:249.07}, 'Corona Romania', false);
Map.addLayer(image4, {min:-68.114, max:249.07}, 'Corona Vietnam', false);
Map.addLayer(image5, {min:-68.114, max:249.07}, 'Corona Caucaz', false);
Map.addLayer(image6, {min:-68.114, max:249.07}, 'Corona Kazakhstan', false);
Map.addLayer(image7, {min:-68.114, max:249.07}, 'Corona Latvia', false);