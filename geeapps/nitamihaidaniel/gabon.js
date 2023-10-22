var change = ui.import && ui.import("change", "image", {
      "id": "users/nitamihaidaniel/gabon/change2019_gabon"
    }) || ee.Image("users/nitamihaidaniel/gabon/change2019_gabon"),
    B1184 = ui.import && ui.import("B1184", "image", {
      "id": "users/nitamihaidaniel/gabon/s2_false_2019_gabon"
    }) || ee.Image("users/nitamihaidaniel/gabon/s2_false_2019_gabon"),
    Amenajament = ui.import && ui.import("Amenajament", "image", {
      "id": "users/nitamihaidaniel/gabon/amenajament_gabon2019"
    }) || ee.Image("users/nitamihaidaniel/gabon/amenajament_gabon2019");
var s1 = ['#ff54d2', '#e7ff64', '#4cff41', '#06ba1c'];
Map.addLayer(change, {bands: 'VV', min: 0.5, max: 1.5, palette: s1 }, 'Change Radar Jan2020 ',false);
Map.setCenter(11, 0, 8);
Map.addLayer(B1184, {min:300, max:4000}, 'False color Jan2020', false);
Map.addLayer(Amenajament, {min:0, max:255}, 'Amenagement 2019');