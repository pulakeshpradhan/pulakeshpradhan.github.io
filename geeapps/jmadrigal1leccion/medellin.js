var amenazas_inunda = ui.import && ui.import("amenazas_inunda", "table", {
      "id": "users/jmadrigal1leccion/Amenaza_por_Inundaciones"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Amenaza_por_Inundaciones"),
    Ainunda = ui.import && ui.import("Ainunda", "table", {
      "id": "users/jmadrigal1leccion/AInundaciones"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/AInundaciones"),
    Pinos = ui.import && ui.import("Pinos", "table", {
      "id": "users/jmadrigal1leccion/LosPinos"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/LosPinos"),
    laCancha = ui.import && ui.import("laCancha", "table", {
      "id": "users/jmadrigal1leccion/LaCancha"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/LaCancha"),
    RiesgosNa = ui.import && ui.import("RiesgosNa", "table", {
      "id": "users/jmadrigal1leccion/Riesgos_naturales"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Riesgos_naturales"),
    Afecviv = ui.import && ui.import("Afecviv", "table", {
      "id": "users/jmadrigal1leccion/Afecviv"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Afecviv"),
    afecinfrainun = ui.import && ui.import("afecinfrainun", "table", {
      "id": "users/jmadrigal1leccion/Afecinfrainun"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Afecinfrainun"),
    Evacuacion = ui.import && ui.import("Evacuacion", "table", {
      "id": "users/jmadrigal1leccion/Evacuacion"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Evacuacion"),
    pacifico = ui.import && ui.import("pacifico", "table", {
      "id": "users/jmadrigal1leccion/ElPacificook"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/ElPacificook"),
    inun = ui.import && ui.import("inun", "table", {
      "id": "users/jmadrigal1leccion/Pacumulaguainundacion"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/Pacumulaguainundacion");
Map.setCenter (-75.54, 6.25, 15)
// Representamos los datos del vector
Map.addLayer(amenazas_inunda, {color: 'blue'},'Amenazas')
Map.addLayer(Ainunda,{color: 'orange'}, 'Areas de Inundación')
Map.addLayer(Pinos,{color: 'red'}, 'Pinos')
Map.addLayer(laCancha, {color: 'pink'},'Las Canchas ')
Map.addLayer(RiesgosNa, {color: 'green'},'Riesgo Natural' )
Map.addLayer(Afecviv, {color: 'green'},'Viviendas afectadas' )
Map.addLayer(pacifico, {color: 'green'},'El Pacifico' )
Map.addLayer(Evacuacion, {color: 'green'},'evacuacion' )
Map.addLayer(inun, {color: 'green'},'Pacumulaguainu' )