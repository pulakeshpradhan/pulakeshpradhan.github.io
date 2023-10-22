var amenazas_inunda = ui.import && ui.import("amenazas_inunda", "table", {
      "id": "users/jmadrigal1leccion/Amenaza_por_Inundaciones"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Amenaza_por_Inundaciones"),
    Ainunda = ui.import && ui.import("Ainunda", "table", {
      "id": "users/jmadrigal1leccion/AInundaciones"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/AInundaciones"),
    laCancha = ui.import && ui.import("laCancha", "table", {
      "id": "users/jmadrigal1leccion/LaCancha"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/LaCancha"),
    afecinfrainun = ui.import && ui.import("afecinfrainun", "table", {
      "id": "users/jmadrigal1leccion/Afecinfrainun"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Afecinfrainun"),
    pacifico = ui.import && ui.import("pacifico", "table", {
      "id": "users/jmadrigal1leccion/ElPacificook"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/ElPacificook"),
    inun = ui.import && ui.import("inun", "table", {
      "id": "users/jmadrigal1leccion/Pacumulaguainundacion"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Pacumulaguainundacion"),
    puntos = ui.import && ui.import("puntos", "table", {
      "id": "users/jmadrigal1leccion/Afecviv"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Afecviv"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -75.53695301055909,
            6.249530736820138
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-75.53695301055909, 6.249530736820138]);
Map.setCenter (-75.54, 6.25, 18)
// Representamos los datos del vector
Map.addLayer(amenazas_inunda, {color: 'blue'},'Amenazas Inundación')
Map.addLayer(pacifico, {color: 'green'},'El Pacifico' )
Map.addLayer(laCancha, {color: 'red'},'Las Canchas ')
Map.addLayer(puntos, {color: 'white'},'Afecviv ')
// Map.addLayer(image, {color: 'grey'},'DEM' )