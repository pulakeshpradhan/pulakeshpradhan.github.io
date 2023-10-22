var table1 = ui.import && ui.import("table1", "table", {
      "id": "users/mbuenaventura/Deforestacion_2016"
    }) || ee.FeatureCollection("users/mbuenaventura/Deforestacion_2016"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/mbuenaventura/Deforestacion_2017"
    }) || ee.FeatureCollection("users/mbuenaventura/Deforestacion_2017"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/mbuenaventura/Deforestacion_2018"
    }) || ee.FeatureCollection("users/mbuenaventura/Deforestacion_2018"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/mbuenaventura/Municipios_Proyecto"
    }) || ee.FeatureCollection("users/mbuenaventura/Municipios_Proyecto"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/mbuenaventura/Densidad_de_Cultivos_de_Coca"
    }) || ee.FeatureCollection("users/mbuenaventura/Densidad_de_Cultivos_de_Coca"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/mbuenaventura/Zonas_de_Reserva_Campesina"
    }) || ee.FeatureCollection("users/mbuenaventura/Zonas_de_Reserva_Campesina"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "users/mbuenaventura/Vias"
    }) || ee.FeatureCollection("users/mbuenaventura/Vias"),
    table8 = ui.import && ui.import("table8", "table", {
      "id": "users/mbuenaventura/Veredas_2020"
    }) || ee.FeatureCollection("users/mbuenaventura/Veredas_2020"),
    table10 = ui.import && ui.import("table10", "table", {
      "id": "users/mbuenaventura/Resguardos_Indigenas"
    }) || ee.FeatureCollection("users/mbuenaventura/Resguardos_Indigenas"),
    table11 = ui.import && ui.import("table11", "table", {
      "id": "users/mbuenaventura/Centros_Poblados_2020"
    }) || ee.FeatureCollection("users/mbuenaventura/Centros_Poblados_2020"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "users/mbuenaventura/Drenaje_Doble"
    }) || ee.FeatureCollection("users/mbuenaventura/Drenaje_Doble"),
    table12 = ui.import && ui.import("table12", "table", {
      "id": "users/mbuenaventura/Drenaje_Sencillo"
    }) || ee.FeatureCollection("users/mbuenaventura/Drenaje_Sencillo"),
    table13 = ui.import && ui.import("table13", "table", {
      "id": "users/mbuenaventura/ZonificacionLeySegunda"
    }) || ee.FeatureCollection("users/mbuenaventura/ZonificacionLeySegunda"),
    table14 = ui.import && ui.import("table14", "table", {
      "id": "users/mbuenaventura/Zonificacion_Ambiental_PDET_Guaviare"
    }) || ee.FeatureCollection("users/mbuenaventura/Zonificacion_Ambiental_PDET_Guaviare"),
    table15 = ui.import && ui.import("table15", "table", {
      "id": "users/mbuenaventura/Zonificacion_Ambiental_PDET_Meta"
    }) || ee.FeatureCollection("users/mbuenaventura/Zonificacion_Ambiental_PDET_Meta"),
    table16 = ui.import && ui.import("table16", "table", {
      "id": "users/mbuenaventura/Deforestacion_2019"
    }) || ee.FeatureCollection("users/mbuenaventura/Deforestacion_2019"),
    table17 = ui.import && ui.import("table17", "table", {
      "id": "users/mbuenaventura/Densidad_Cultivos_Coca_2020"
    }) || ee.FeatureCollection("users/mbuenaventura/Densidad_Cultivos_Coca_2020"),
    table18 = ui.import && ui.import("table18", "table", {
      "id": "users/mbuenaventura/Frontera_Agricola_Meta"
    }) || ee.FeatureCollection("users/mbuenaventura/Frontera_Agricola_Meta"),
    table19 = ui.import && ui.import("table19", "table", {
      "id": "users/mbuenaventura/Frontera_Agricola_Guaviare"
    }) || ee.FeatureCollection("users/mbuenaventura/Frontera_Agricola_Guaviare"),
    table20 = ui.import && ui.import("table20", "table", {
      "id": "users/mbuenaventura/Aptitud_Palma"
    }) || ee.FeatureCollection("users/mbuenaventura/Aptitud_Palma"),
    table21 = ui.import && ui.import("table21", "table", {
      "id": "users/mbuenaventura/Nucleos_PNIS"
    }) || ee.FeatureCollection("users/mbuenaventura/Nucleos_PNIS"),
    table22 = ui.import && ui.import("table22", "table", {
      "id": "users/mbuenaventura/IE_Proyecto"
    }) || ee.FeatureCollection("users/mbuenaventura/IE_Proyecto");
//Definir el titulo
var TituloMapa = ui.Label({
  value: 'Observatorio del Territorio', // Titulo del mapa
  style: {position: 'bottom-left', // Posicion
  fontWeight: 'bold', // Negrita
  fontSize: '22px'}}); // Tamaño de fuente
Map.add(TituloMapa); //Incorporar el titulo en el visor
Map.setCenter(-72.4884244, 1.9312415,8);
Map.addLayer(table22,{color:'FF6F00'},'Instituciones educativas',false);
Map.addLayer(table21,{color:'D3C000'},'Nucleos PNIS',false);
Map.addLayer(table20,{color:'D35400'},'Aptitud cultivo de Palma',false);
Map.addLayer(table19,{color:'green'},'Frontera agrícola Dpto Guaviare',false);
Map.addLayer(table18,{color:'green'},'Frontera agrícola Dpto Meta',false);
Map.addLayer(table1,{color:'yellow'},'Deforestación 2016',false);
Map.addLayer(table2,{color:'yellow'},'Deforestación 2017',false);
Map.addLayer(table3,{color:'yellow'},'Deforestación 2018',false);
Map.addLayer(table16,{color:'yellow'},'Deforestación 2019',false);
//Map.addLayer(table4,{color: '808000'},'Todos los Municipios',true);
Map.addLayer(table5,{color:'green'},'Densidad de cultivos de uso ilicito 2019',false);
Map.addLayer(table17,{color:'green'},'Densidad de cultivos de uso ilicito 2020',false);
Map.addLayer(table6,{color:'FF5733'},'Zonas de reserva campesina',false);
Map.addLayer(table14,{color:'0033cc'},'Zonificación ambiental PDET Guaviare',false);
Map.addLayer(table15,{color:'0033cc'},'Zonificación ambiental PDET Meta',false);
Map.addLayer(table13,{color:'bf00ff'},'Zonificación Ley segunda',false);
Map.addLayer(table7,{color:'17202A'},'Vias',false);
Map.addLayer(table8,{color:'5D6D7E'},'Veredas',false);
Map.addLayer(table10,{color:'00bfff'},'Resguardos Indígenas',false);
//Map.addLayer(table11,{color:'ff9900'},'Centros Poblados',false);
Map.addLayer(table9,{color:'0000ff'},'Drenaje doble',false);
Map.addLayer(table12,{color:'0000ff'},'Drenaje sencillo',false);
//Cargar el shapefile desde la variable 
var province_1 = ee.FeatureCollection(table4);
//Filtrar las áreas de interes de acuerdo al nombre del atributo.
var filter1 = ee.Filter.inList('MPIO_CNMBR', ['VISTAHERMOSA']);
var filter2 = ee.Filter.inList('MPIO_CNMBR', ['PUERTO RICO']);
var filter3 = ee.Filter.inList('MPIO_CNMBR', ['LA MACARENA']);
var filter4 = ee.Filter.inList('MPIO_CNMBR', ['SAN JOSÉ DEL GUAVIARE']);
var filter5 = ee.Filter.inList('MPIO_CNMBR', ['EL RETORNO']);
var filter6 = ee.Filter.inList('MPIO_CNMBR', ['MIRAFLORES']);
var filter7 = ee.Filter.inList('MPIO_CNMBR', ['CALAMAR']);
var filtered_area1 = province_1.filter(filter1);
var filtered_area2 = province_1.filter(filter2);
var filtered_area3 = province_1.filter(filter3);
var filtered_area4 = province_1.filter(filter4);
var filtered_area5 = province_1.filter(filter5);
var filtered_area6 = province_1.filter(filter6);
var filtered_area7 = province_1.filter(filter7);
Map.addLayer(filtered_area1, {color: 'blue'}, 'Vistahermosa', true, 0.5);
Map.addLayer(filtered_area2, {color: 'FF00FF'}, 'Puerto Rico', true, 0.5);
Map.addLayer(filtered_area3, {color: 'green'}, 'La Macarena', true, 0.5);
Map.addLayer(filtered_area4, {color: '808000'}, 'San José del Guaviare', true, 0.5);
Map.addLayer(filtered_area5, {color: '008080'}, 'El Retorno', true, 0.5);
Map.addLayer(filtered_area6, {color: '00FF00'}, 'Miraflores', true, 0.5);
Map.addLayer(filtered_area7, {color: '800080'}, 'Calamar', true, 0.5);