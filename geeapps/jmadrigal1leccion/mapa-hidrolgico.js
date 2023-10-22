var manzanas_1 = ee.FeatureCollection("users/jmadrigal1leccion/Manzanas"),
    Cuencas_1 = ee.FeatureCollection("users/jmadrigal1leccion/Cuencas"),
    Red__hidrica_La_Rafita_1 = ee.FeatureCollection("users/jmadrigal1leccion/Red__hidrica_La_Rafita"),
    pacifico = ee.FeatureCollection("users/jmadrigal1leccion/ElPacificook");
	Map.setCenter (-75.54, 6.25, 16)
	// Configure un fondo satelital
Map.setOptions('Satellite')
// Representamos los datos del vector
//Map.addLayer(manzanas_1, {color: 'grey', opacity:0.5},'Manzanas')
Map.addLayer(Cuencas_1, {color: 'blue'},'Cuencas' )
Map.addLayer(Red__hidrica_La_Rafita_1, {color: 'blue'},'Red_hidrica')
Map.addLayer(pacifico, {color: 'yellow'},'El Pacifico' )