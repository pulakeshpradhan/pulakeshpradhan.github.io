var POZOS = ui.import && ui.import("POZOS", "table", {
      "id": "users/jmadrigal1leccion/Puntos_ocotepex1"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Puntos_ocotepex1"),
    Colonias = ui.import && ui.import("Colonias", "table", {
      "id": "users/jmadrigal1leccion/Colonias"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Colonias"),
    Denue = ui.import && ui.import("Denue", "table", {
      "id": "users/jmadrigal1leccion/DENUE"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/DENUE"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/jmadrigal1leccion/DENUE"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/DENUE");
Map.setCenter (-99.22, 18.97, 13)
// Representamos los datos del vector
Map.addLayer(Colonias, {color: 'orange'},'Colonias')
Map.addLayer(table, {color: 'red'},'Denue')
Map.addLayer(POZOS, {color: 'blue'},'POZOS')