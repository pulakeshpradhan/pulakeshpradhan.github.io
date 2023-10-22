//
var countries = ['ARG']
var countryNames = ['Argentina']
var zoomLevel = 8
// ogrinfo  -al gadm36_ARG_2.shp | grep NAME_1 | grep -v NL | sed 's/  NAME_1 (String) =//g' | awk '{printf("\"%s\", ",$0)}' | sed 's/" /"/g'
var level1 = ["Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Buenos Aires", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Catamarca", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chaco", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Chubut", "Ciudad de Buenos Aires", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Córdoba", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Corrientes", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Entre Ríos", "Formosa", "Formosa", "Formosa", "Formosa", "Formosa", "Formosa", "Formosa", "Formosa", "Formosa", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "Jujuy", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Pampa", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "La Rioja", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Mendoza", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Misiones", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Neuquén", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Río Negro", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "Salta", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Juan", "San Luis", "San Luis", "San Luis", "San Luis", "San Luis", "San Luis", "San Luis", "San Luis", "San Luis", "Santa Cruz", "Santa Cruz", "Santa Cruz", "Santa Cruz", "Santa Cruz", "Santa Cruz", "Santa Cruz", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santa Fe", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Santiago del Estero", "Tierra del Fuego", "Tierra del Fuego", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán", "Tucumán"]
// ogrinfo  -al gadm36_ARG_2.shp | grep NAME_2 | grep -v VAR | grep -v NL | sed 's/ NAME_2 (String) = //g' | awk '{printf("\"%s\", ",$0)}'
var level2 = ["Adolfo Alsina", "Adolfo Gonzales Chaves", "Alberti", "Almirante Brown", "Ameghino", "Arrecifes", "Avellaneda", "Ayacucho", "Azul", "Bahía Blanca", "Balcarce", "Baradero", "Benito Juárez", "Berazategui", "Berisso", "Bolívar", "Bragado", "Brandsen", "Campana", "Cañuelas", "Capitán Sarmiento", "Carlos Casares", "Carlos Tejedor", "Carmen de Areco", "Castelli", "Chacabuco", "Chascomús", "Chivilcoy", "Colón", "Coronel de Marina Leonardo Rosales", "Coronel Dorrego", "Coronel Pringles", "Coronel Suárez", "Daireaux", "Dolores", "Ensenada", "Escobar", "Esteban Echeverría", "Exaltación de la Cruz", "Florencio Varela", "General Alvarado", "General Alvear", "General Arenales", "General Belgrano", "General Guido", "General Juan Madariaga", "General La Madrid", "General Las Heras", "General Lavalle", "General Paz", "General Pinto", "General Pueyrredón", "General Rodríguez", "General San Martín", "General Sarmiento", "General Viamonte", "General Villegas", "Guaminí", "Hipólito Yrigoyen", "Junín", "La Costa", "La Matanza", "La Plata", "Lanús", "Laprida", "Las Flores", "Leandro N. Alem", "Lincoln", "Lobería", "Lobos", "Lomas de Zamora", "Luján", "Magdalena", "Maipú", "Mar Chiquita", "Marcos Paz", "Mercedes", "Merlo", "Monte", "Monte Hermoso", "Moreno", "Morón", "Navarro", "Necochea", "Nueve de Julio", "Olavarría", "Patagones", "Pehuajó", "Pellegrini", "Pergamino", "Pila", "Pilar", "Pinamar", "Puán", "Quilmes", "Ramallo", "Rauch", "Rivadavia", "Rojas", "Roque Pérez", "Saavedra", "Saladillo", "Salliqueló", "Salto", "San Andrés de Giles", "San Antonio de Areco", "San Cayetano", "San Fernando (1)", "San Fernando (2)", "San Isidro", "San Nicolás", "San Pedro", "San Vicente", "Suipacha", "Tandil", "Tapalqué", "Tigre", "Tordillo", "Tornquist", "Trenque Lauquen", "Tres Arroyos", "Tres de Febrero", "Tres Lomas", "Veinticinco de Mayo", "Vicente López", "Villa Gesell", "Villarino", "Zárate", "Ambato", "Ancasti", "Andalgalá", "Antofagasta de la Sierra", "Belén", "Capayán", "Capital", "El Alto", "Fray Mamerto Esquiú", "La Paz", "Paclín", "Pomán", "Santa María", "Santa Rosa", "Tinogasta", "Valle Viejo", "Almirante Brown", "Bermejo", "Chacabuco", "Comandante Fernández", "Doce de Octubre", "Fray Justo Santa María de Oro", "General Belgrano", "General Donovan", "General Güemes", "Independencia", "Libertad", "Libertador General San Martín", "Maipú", "Mayor Luis J. Fontana", "Nueve de Julio", "O'Higgins", "Presidencia de la Plaza", "Primero de Mayo", "Quitilipi", "San Fernando", "San Lorenzo", "Sargento Cabral", "Tapenagá", "Veinticinco de Mayo", "Biedma", "Cushamen", "Escalante", "Florentino Ameghino", "Futaleufú", "Gaiman", "Gastre", "Languiñeo", "Mártires", "Paso de Indios", "Rawson", "Rió Senguer", "Sarmiento", "Tehuelches", "Telsen", "Distrito Federal", "Calamuchita", "Capital", "Colón", "Cruz del Eje", "General Roca", "General San Martín", "Ischilín", "Juárez Celman", "Marcos Juárez", "Minas", "Pocho", "Presidente Roque Sáenz Peña", "Punilla", "Rió Cuarto", "Rió Primero", "Rió Seco", "Rió Segundo", "San Alberto", "San Javier", "San Justo", "Santa María", "Sobremonte", "Tercero Arriba", "Totoral", "Tulumba", "Unión", "Bella Vista", "Berón de Astrada", "Capital", "Concepción", "Curuzú Cuatiá", "Empedrado", "Esquina", "General Alvear", "General Paz", "Goya", "Itatí", "Ituzaingó", "Lavalle", "Mburucuyá", "Mercedes", "Monte Caseros", "Paso de los Libres", "Saladas", "San Cosme", "San Luis del Palmar", "San Martín", "San Miguel", "San Roque", "Santo Tomé", "Sauce", "Colón", "Concordia", "Diamante", "Federación", "Federal", "Feliciano", "Gualeguay", "Gualeguaychú", "Isla", "Islas del Ibicuy", "La Paz", "Nogoyá", "Paraná", "Tala", "Uruguay", "Victoria", "Villaguay", "Bermejo", "Formosa", "Laishi", "Matacos", "Patiño", "Pilagás", "Pilcomayo", "Pirané", "Ramón Lista", "Capital", "Cochinoca", "El Carmen", "Humahuaca", "Ledesma", "Palpalá", "Rinconada", "San Antonio", "San Pedro", "Santa Bárbara", "Santa Catalina", "Susques", "Tilcara", "Tumbaya", "Valle Grande", "Yavi", "Atreucó", "Caleu Caleu", "Capital", "Catriló", "Chalileo", "Chapaleufú", "Chical Có", "Conhelo", "Curacó", "Guatraché", "Hucal", "Lihuel Calel", "Limay Mahuida", "Loventué", "Maracó", "Puelén", "Quemú Quemú", "Rancul", "Realicó", "Toay", "Trenel", "Utracán", "Arauco", "Capital", "Castro Barros", "Chamical", "Chilecito", "Coronel Felipe Varela", "Famatina", "General Angel Vicente Peñaloza", "General Belgrano", "General Juan Facundo Quiroga", "General Lamadrid", "General Ocampo", "General San Martín", "Independencia", "Rosario Vera Peñaloza", "San Blas de los Sauces", "Sanagasta", "Vinchina", "Capital", "General Alvear", "Godoy Cruz", "Guaymallén", "Junín", "La Paz", "Las Heras", "Lavalle", "Luján de Cuyo", "Maipú", "Malargüe", "Rivadavia", "San Carlos", "San Martín", "San Rafael", "Santa Rosa", "Tunuyán", "Tupungato", "Apóstoles", "Cainguás", "Candelaria", "Capital", "Concepción", "Eldorado", "General Manuel Belgrano", "Guaraní", "Iguazú", "Leandro N. Alem", "Libertador General San Martín", "Montecarlo", "Oberá", "San Ignacio", "San Javier", "San Pedro", "Veinticinco de Mayo", "Aluminé", "Añelo", "Catán Lil", "Chos Malal", "Collón Curá", "Confluencia", "Huiliches", "Lacar", "Loncopué", "Los Lagos", "Minas", "Ñorquín", "Pehuenches", "Picún Leufú", "Picunches", "Zapala", "Adolfo Alsina", "Avellaneda", "Bariloche", "Conesa", "El Cuy", "General Roca", "Ñorquinco", "Nueve de Julio", "Pichi Mahuida", "Pilcaniyeu", "San Antonio", "Valcheta", "Veinticinco de Mayo", "Anta", "Cachi", "Cafayate", "Capital", "Cerrillos", "Chicoana", "General Güemes", "General José de San Martín", "Guachipas", "Iruya", "La Caldera", "La Candelaria", "La Poma", "La Viña", "Los Andes", "Metán", "Molinos", "Orán", "Rivadavia", "Rosario de la Frontera", "Rosario de Lerma", "San Carlos", "Santa Victoria", "Albardón", "Angaco", "Calingasta", "Capital", "Caucete", "Chimbas", "Iglesia", "Jáchal", "Pocito", "Rawson", "Rivadavia", "San Martín", "Santa Lucía", "Sarmiento", "Ullum", "Valle Fértil", "Veinticinco de Mayo", "Zonda", "Ayacucho", "Belgrano", "Chacabuco", "Coronel Pringles", "General Pedernera", "Gobernador Dupuy", "Junín", "La Capital", "Libertador General San Martín", "Corpen Aike", "Deseado", "Güer Aike", "Lago Argentino", "Lago Buenos Aires", "Magallanes", "Rió Chico", "Belgrano", "Caseros", "Castellanos", "Constitución", "Garay", "General López", "General Obligado", "Iriondo", "La Capital", "Las Colonias", "Nueve de Julio", "Rosario", "San Cristóbal", "San Javier", "San Jerónimo", "San Justo", "San Lorenzo", "San Martín", "Vera", "Aguirre", "Alberdi", "Atamisqui", "Avellaneda", "Banda", "Belgrano", "Capital", "Choya", "Copo", "Figueroa", "General Taboada", "Guasayán", "Jiménez", "Juan Felipe Ibarra", "Loreto", "Mitre", "Moreno", "Ojo de Agua", "Pellegrini", "Quebrachos", "Rió Hondo", "Rivadavia", "Robles", "Salavina", "San Martín", "Sarmiento", "Silípica", "Rió Grande", "Ushuaia", "Burruyacú", "Capital", "Chicligasta", "Cruz Alta", "Famaillá", "Graneros", "Juan B. Alberdi", "La Cocha", "Leales", "Lules", "Monteros", "Rió Chico", "Simoca", "Tafí del Valle", "Tafí Viejo", "Trancas", "Yerba Buena"]
print('level 1,2 check:',level1.length,level2.length)
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
// get unique values for the level 1 labels
var level1_values = level1.filter( onlyUnique )
var level1_index = 0
var level1_code = level1_values[level1_index]
function onlyLevel1(value, index, self) { 
    return level1[index] === level1_code;
}
var level2_values = level2.filter( onlyLevel1 )
var county = level2_values[0]
var countyLevel = '2'
var countryIndex = 0
var table = ee.FeatureCollection("users/plewis/gadm36_"
          +countries[countryIndex]+"_"+countyLevel)
var map = Map    
//ui.root.clear();
//var mapOptions = {
//    lat: 0,
//    lon: 0,/
//    zoom: 8,
//    streetViewControl: true,
//  };
//var map = ui.Map();
//map.setOptions('Satellite');
//ui.root.add(map);
// Adds charts next to the map to interactively display a
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Time plots for bands',
    style: {fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var long = ui.Label('lon:');
var lati = ui.Label('lat:');
var latlon = ui.Panel(
  [long,lati],ui.Panel.Layout.flow('horizontal'));
panel.add(latlon);
// Register a callback on the default map to be invoked when the map is clicked.
map.onClick(function(coords) {
  // string for lon/lat
  var latitude = coords.lat.toFixed(4)
  var longitude = coords.lon.toFixed(4)
  // Update the lon/lat panel with values from the click event.
  long.setValue('lon: ' + longitude),
  lati.setValue('lat: ' + latitude);
  // Add a white dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // get the time series of data for 1986-2019
  var pointset = getSeries(point).select(
    ['B1','B2','B3','B4','B5','B6','B7'],
    ['B1_blue','B2_green','B3_red','B4_nir','B5_swir','B6_NDVI','B7_NDWI'])
  // this is an ImageCollection
  // We want to insert the dot in the 'blank' layer
  // so we have to find that
  var dot = ui.Map.Layer(point, {color: 'FFFFFF'},'blank');
  var layers = map.layers()
  var lay_name, index, layer
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    lay_name = lay.getName()
    names.push(lay_name)
  })
  var index = names.indexOf('blank');
  if (index > -1) {
    // if name in names
    map.layers().set(index, dot);
  }
  // now generate the chart as image series
  // Chart options:
  // https://developers.google.com/chart/
  // interactive/docs/gallery/linechart#configuration-options
  var chart1 = ui.Chart.image.series(pointset, 
    point, ee.Reducer.mean(), 30)
    .setOptions({
      title: county+' time series at '+'lat: '+latitude+' lon: '+longitude,
      vAxis: {title: 'Reflectance or VI'},
      hAxis: {title: 'Date, annual average'},
      pointSize: 2,
      lineWidth: 2,
      colors: ['blue','green','red','black','purple','orange','cyan'],
      curveType: 'none',
    })
  // add chart to panel
  panel.widgets().set(2, chart1);
});
map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//var map = Map
var allowed = {},translator={}
// switch off classes
var classes = false
var classlist = ['geometry','vegetation','crop',
  'veg','urban','water','class','forest','soil']
var getGeometryImports = function (){
  try{allowed['geometry']=geometry}catch(err){var tmp;}
  try{allowed['geometry1']=geometry1}catch(err){var tmp;}
  try{allowed['geometry2']=geometry2}catch(err){var tmp;}
  try{allowed['geometry3']=geometry3}catch(err){var tmp;}
  try{allowed['geometry4']=geometry4}catch(err){var tmp;}
  try{allowed['geometry5']=geometry5}catch(err){var tmp;}
  try{allowed['geometry6']=geometry6}catch(err){var tmp;}
  try{allowed['geometry7']=geometry7}catch(err){var tmp;}
  try{allowed['geometry8']=geometry8}catch(err){var tmp;}
  try{allowed['geometry9']=geometry9}catch(err){var tmp;}
  try{allowed['geometry10']=geometry10}catch(err){var tmp;}
  try{allowed['vegetation']=vegetation}catch(err){var tmp;}
  try{allowed['vegetation1']=vegetation1}catch(err){var tmp;}
  try{allowed['vegetation2']=vegetation2}catch(err){var tmp;}
  try{allowed['vegetation3']=vegetation3}catch(err){var tmp;}
  try{allowed['vegetation4']=vegetation4}catch(err){var tmp;}
  try{allowed['vegetation5']=vegetation5}catch(err){var tmp;}
  try{allowed['vegetation6']=vegetation6}catch(err){var tmp;}
  try{allowed['vegetation7']=vegetation7}catch(err){var tmp;}
  try{allowed['vegetation8']=vegetation8}catch(err){var tmp;}
  try{allowed['vegetation9']=vegetation9}catch(err){var tmp;}
  try{allowed['vegetation10']=vegetation10}catch(err){var tmp;}
  try{allowed['crop']=crop}catch(err){var tmp;}
  try{allowed['crop1']=crop1}catch(err){var tmp;}
  try{allowed['crop2']=crop2}catch(err){var tmp;}
  try{allowed['crop3']=crop3}catch(err){var tmp;}
  try{allowed['crop4']=crop4}catch(err){var tmp;}
  try{allowed['crop5']=crop5}catch(err){var tmp;}
  try{allowed['crop6']=crop6}catch(err){var tmp;}
  try{allowed['crop7']=crop7}catch(err){var tmp;}
  try{allowed['crop8']=crop8}catch(err){var tmp;}
  try{allowed['crop9']=crop9}catch(err){var tmp;}
  try{allowed['crop10']=crop10}catch(err){var tmp;}
  try{allowed['veg']=veg}catch(err){var tmp;}
  try{allowed['veg1']=veg1}catch(err){var tmp;}
  try{allowed['veg2']=veg2}catch(err){var tmp;}
  try{allowed['veg3']=veg3}catch(err){var tmp;}
  try{allowed['veg4']=veg4}catch(err){var tmp;}
  try{allowed['veg5']=veg5}catch(err){var tmp;}
  try{allowed['veg6']=veg6}catch(err){var tmp;}
  try{allowed['veg7']=veg7}catch(err){var tmp;}
  try{allowed['veg8']=veg8}catch(err){var tmp;}
  try{allowed['veg9']=veg9}catch(err){var tmp;}
  try{allowed['veg10']=veg10}catch(err){var tmp;}
  try{allowed['urban']=urban}catch(err){var tmp;}
  try{allowed['urban1']=urban1}catch(err){var tmp;}
  try{allowed['urban2']=urban2}catch(err){var tmp;}
  try{allowed['urban3']=urban3}catch(err){var tmp;}
  try{allowed['urban4']=urban4}catch(err){var tmp;}
  try{allowed['urban5']=urban5}catch(err){var tmp;}
  try{allowed['urban6']=urban6}catch(err){var tmp;}
  try{allowed['urban7']=urban7}catch(err){var tmp;}
  try{allowed['urban8']=urban8}catch(err){var tmp;}
  try{allowed['urban9']=urban9}catch(err){var tmp;}
  try{allowed['urban10']=urban10}catch(err){var tmp;}
  try{allowed['class0']=class0}catch(err){var tmp;}
  try{allowed['class1']=class1}catch(err){var tmp;}
  try{allowed['class2']=class2}catch(err){var tmp;}
  try{allowed['class3']=class3}catch(err){var tmp;}
  try{allowed['class4']=class4}catch(err){var tmp;}
  try{allowed['class5']=class5}catch(err){var tmp;}
  try{allowed['class6']=class6}catch(err){var tmp;}
  try{allowed['class7']=class7}catch(err){var tmp;}
  try{allowed['class8']=class8}catch(err){var tmp;}
  try{allowed['class9']=class9}catch(err){var tmp;}
  try{allowed['class10']=class10}catch(err){var tmp;}
  try{allowed['water']=water}catch(err){var tmp;}
  try{allowed['water1']=water1}catch(err){var tmp;}
  try{allowed['water2']=water2}catch(err){var tmp;}
  try{allowed['water3']=water3}catch(err){var tmp;}
  try{allowed['water4']=water4}catch(err){var tmp;}
  try{allowed['water5']=water5}catch(err){var tmp;}
  try{allowed['water6']=water6}catch(err){var tmp;}
  try{allowed['water7']=water7}catch(err){var tmp;}
  try{allowed['water8']=water8}catch(err){var tmp;}
  try{allowed['water9']=water9}catch(err){var tmp;}
  try{allowed['water10']=water10}catch(err){var tmp;}
  try{allowed['forest']=forest}catch(err){var tmp;}
  try{allowed['forest1']=forest1}catch(err){var tmp;}
  try{allowed['forest2']=forest2}catch(err){var tmp;}
  try{allowed['forest3']=forest3}catch(err){var tmp;}
  try{allowed['forest4']=forest4}catch(err){var tmp;}
  try{allowed['forest5']=forest5}catch(err){var tmp;}
  try{allowed['forest6']=forest6}catch(err){var tmp;}
  try{allowed['forest7']=forest7}catch(err){var tmp;}
  try{allowed['forest8']=forest8}catch(err){var tmp;}
  try{allowed['forest9']=forest9}catch(err){var tmp;}
  try{allowed['forest10']=forest10}catch(err){var tmp;}
  try{allowed['soil']=soil}catch(err){var tmp;}
  try{allowed['soil1']=soil1}catch(err){var tmp;}
  try{allowed['soil2']=soil2}catch(err){var tmp;}
  try{allowed['soil3']=soil3}catch(err){var tmp;}
  try{allowed['soil4']=soil4}catch(err){var tmp;}
  try{allowed['soil5']=soil5}catch(err){var tmp;}
  try{allowed['soil6']=soil6}catch(err){var tmp;}
  try{allowed['soil7']=soil7}catch(err){var tmp;}
  try{allowed['soil8']=soil8}catch(err){var tmp;}
  try{allowed['soil9']=soil9}catch(err){var tmp;}
  try{allowed['soil10']=soil10}catch(err){var tmp;}
  //now add a translator
  for (var key in allowed){
    if (! key in translator){
      translator[key] = key
    }
  }
}
//
// EE functions
//
var scale = ee.Image(0.0001);
var cloudMaskL457 = function (image) {
  var qa = image.select('pixel_qa')
  var cloud = qa.bitwiseAnd(1 << 5)
        .and(qa.bitwiseAnd(1 << 7))
        .or(qa.bitwiseAnd(1 << 3))
  var mask2 = image.mask().reduce(ee.Reducer.min())
  return image.updateMask(cloud.not()).updateMask(mask2)
         .multiply(scale)
}
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).multiply(scale)
}
var getLS = function (year){
  // derive ls from year
  var ls = 7
  if (year <= 1984 ){
    ls = 4;
  } else if (year <= 2012){
    ls = 5;
  } else if (year >= 2013){
    ls = 8
  }
  return ls;
}
var getDataset = function (year,timespan){
  // derive ls from year
  year = parseInt(year)
  timespan=parseInt(timespan)
  if (isNaN(year)){
    return
  }
  var ls = getLS(year)
  print('getting data for ',county)
  var shape = table.filter(ee.Filter.eq('NAME_2',county));
  shape = shape.geometry().bounds()
  var t11 = year+timespan
  var t12 = year-timespan
  var t1 = 'YEAR-01-01'.replace('YEAR',t12.toString())
  var t2 = 'YEAR-12-31'.replace('YEAR',t11.toString())
  //print(ls,t1,t2)
  if (ls == 8) {
    // .filterMetadata('IMAGE_QUALITY', 'equals', 9)
    var image = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
        .filterDate(t1,t2)
        .filterBounds(shape)
        .map(maskL8sr).map(maskBad).median().clip(shape);
    return image
  } else if (ls == 7){
    return ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
        .filterDate(t1,t2)
        .filterBounds(shape)
        .map(cloudMaskL457).map(maskBad).median().clip(shape);
 } else if (ls == 5){
    return ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
        .filterDate(t1,t2)
        .filterBounds(shape)
        .map(cloudMaskL457).map(maskBad).median().clip(shape); 
 } else if (ls == 4){
    return ee.ImageCollection("LANDSAT/LT04/C01/T1_SR")
        .filterDate(t1,t2)
        .filterBounds(shape)
        .map(cloudMaskL457).map(maskBad).median().clip(shape);
 }
}
var getAllBandsIn = function (ls) {
  if (ls == 8) {
    // leave out B1 and 7 for compatibility
    return ['B2', 'B3', 'B4', 'B5', 'B6'];
  } else {
    return ['B1', 'B2', 'B3', 'B4', 'B5'];
  }
}
var getAllBandsOut = function (ls) {
  return ['blue', 'green', 'red', 'nir', 'swir'];
}
var getBands = function (ls,type) {
  if (type == 'fcc'){
    // FCC
    return ['nir','red','green'];
  } else if (type == 'rcc'){
    // RGB
    return ['red','green','blue'];
  } else if (type == 'VIs'){
    return ['NDVI','NDWI','NDWI']
  }
}
var year = 0
var timespan = 1
var types = ['fcc', 'rcc', 'VIs']
// load vector shape file
var table = ee.Collection.loadTable("users/plewis/gadm36_"
          +countries[countryIndex]+"_"+countyLevel)
var shenzhenShape = table.filter(ee.Filter.eq('NAME_2',county))
// centre shape
map.centerObject(shenzhenShape,zoomLevel)
var ls, bandsIn, bandsOut, data, ndvi, i
var params, ndwi, url
var type = types[0]
var fromYear = 1986, toYear = 2019
var yearName, labelName
var layerInfo = {}
var setYear = function (yearset){
  year = parseInt(yearset)
  // Display the results.
  yearName = year.toString()
  labelName = yearName+'_'+type+'_'+timespan.toString();
  timespan = parseInt(timespan);
  return year
}
// check if name in layer
var isInLayer = function(name) {
  var layers = map.layers()
  var lay_name, index, layer
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    layer = layers.get(index)
    return true
  } 
  return false
};
var checkExists = function(labelName){
  if (noLabel === true) {
    return false
  }
  return isInLayer(labelName);
}
// remove layer name
var removeLayer = function(name) {
  var layers = map.layers()
  var lay_name, index, layer
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    layer = layers.get(index)
    map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
var addVIS = function(data){
  // add NDVI and NDWI to image
  ndvi = data.normalizedDifference(['B4', 'B3'])
                .select(['nd'],['B6']);
  ndwi = data.normalizedDifference(['B4', 'B5'])
                .select(['nd'],['B7']);
  // combine the datasets
  data = data.addBands([ndvi]).addBands([ndwi]).float();
  return data
}
var level2_values = level2.filter( onlyLevel1 )
var sound = []
var result = []
var b
var nBands 
var nImages
/*
** Dont trust anything blue > 0.5
*/
var maskBad = function(image) {
  var mask = image.select(['B1']).lt(0.5);
  print(mask)
  return image.updateMask(mask);
};
var getSeries = function(point){
  // returns ImageCollection for point
  // containing pixel values for each band
  result = []
  sound = []
  for (var year=parseInt(fromYear); year<parseInt(toYear);year++){
    var ls = getLS(year)
    var fblank = ee.Image([0,0,0,0,0]).float().select(
      ['constant', 'constant_1', 'constant_2', 
       'constant_3', 'constant_4'], // old names
      getAllBandsIn(ls)               // new names
    ).set('nImages','1')
    fblank = fblank.updateMask(fblank)
    var bandsIn = getAllBandsIn(ls)
    var bandsOut = ['B1','B2','B3','B4','B5']
    var t11 = year+timespan
    var t12 = year-timespan
    var t1 = 'YEAR-01-01'.replace('YEAR',t12.toString())
    var t2 = 'YEAR-12-31'.replace('YEAR',t11.toString())
    if (ls == 8) {
      // .filterMetadata('IMAGE_QUALITY', 'equals', 9)
      var image = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
          .filterDate(t1,t2)
          .filterBounds(point)
          .map(maskL8sr).map(maskBad)
      nImages = image.size()
         // so if this fails we have zero bands
      image = image.median().clip(point)
      image = image.set('nImages',ee.String(nImages))
      image = ee.ImageCollection([image,fblank])
              .filterMetadata('nImages',"greater_than", '0').first()
      image = image.select(bandsIn,bandsOut)
          .set('system:time_start',year.toString()+'-06-06')
      image = addVIS(image)
      result.push(image)        
    } else if (ls == 7){
      var image = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
          .filterDate(t1,t2)
          .filterBounds(point)
          .map(cloudMaskL457).map(maskBad)
      nImages = image.size()
      image = image.median().clip(point)
      image = image.set('nImages',ee.String(nImages))
      image = ee.ImageCollection([image,fblank])
              .filterMetadata('nImages',"greater_than", '0').first()
      image = image.select(bandsIn,bandsOut)
          .set('system:time_start',year.toString()+'-06-06')
      image = addVIS(image)
      result.push(image)        
     } else if (ls == 5){
      var image = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
          .filterDate(t1,t2)
          .filterBounds(point)
          .map(cloudMaskL457).map(maskBad)
      nImages = image.size()
      image = image.median().clip(point)
      image = image.set('nImages',ee.String(nImages))
      image = ee.ImageCollection([image,fblank])
              .filterMetadata('nImages',"greater_than", '0').first()
      image = image.select(bandsIn,bandsOut)
          .set('system:time_start',year.toString()+'-06-06')
      image = addVIS(image)
      result.push(image)       
    } else if (ls == 4){
      var image = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR")
          .filterDate(t1,t2)
          .filterBounds(point)
          .map(cloudMaskL457).map(maskBad)
      nImages = image.size()
      image = image.median().clip(point)
      image = image.set('nImages',ee.String(nImages))
      image = ee.ImageCollection([image,fblank])
              .filterMetadata('nImages',"greater_than", '0').first()
      image = image.select(bandsIn,bandsOut)
          .set('system:time_start',year.toString()+'-06-06')
      image = addVIS(image)
      result.push(image)       } 
  }
  // ).merge(
      // .filterMetadata('IMAGE_QUALITY', 'equals', 9)
  return ee.ImageCollection(result)
}
var doit = function (yearset){
  shenzhenShape = table.filter(ee.Filter.eq('NAME_2',county))
  // centre shape
  //map.centerObject(shenzhenShape,zoomLevel)
  if (yearset === 0){
    return
  }
  // sets yearName and labelName
  year = setYear(yearset)
  print('the year is',year)
  if (!((parseInt(year)>=parseInt(fromYear)) && (parseInt(year)<=parseInt(toYear)))){
    return
  }
  ls = getLS(year)
  print ('doit now',labelName,checkExists(labelName),labelName)
  // does labelName already appear in
  // layers? 
  if (checkExists(labelName)){
    print(labelName+' exists')
    return
  }
  // select visualisation parameters
  if ( type == 'VIs' ) {
    params = {bands: getBands(ls,type), min: -1, max: 1, gamma: 0.7}
  } else{
    params = {bands: getBands(ls,type), gain: [1000,1000,1000]};
  }
  print('landsat: '+ls)
  bandsIn = getAllBandsIn(ls)
  bandsOut = getAllBandsOut(ls)
  print('reading image data',year,timespan)
  // read Image data
  data = getDataset(year,timespan).select(bandsIn,bandsOut)
  // add an NDVI band
  ndvi = data.normalizedDifference([bandsOut[3], bandsOut[2]])
                .select(['nd'],['NDVI']);
  ndwi = data.normalizedDifference([bandsOut[3], bandsOut[4]])
                .select(['nd'],['NDWI']);
  // combine the datasets
  data = data.addBands([ndvi]).addBands([ndwi]).float();
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
    featureCollection: shenzhenShape,
    color: 1,
    width: 1
  });
  var outlineMask = empty.paint({
    featureCollection: shenzhenShape,
    color: 1
  });
  data = data.addBands([outlineMask])
  if ( classes ){
    // now generate data layers for classes
    // get class information
    // assumed as globals ...
    getGeometryImports()
    var allowedList = [],allowedListNames = []
    for (var key in allowed){
      allowedListNames.unshift(key)
      allowedList.unshift(allowed[key])
    }
    var classy = ee.Image().byte();
    var i = 0;
    for (var key in allowed){
      classy = classy.paint({
        featureCollection: allowed[key],
        color: i
      });
      i++;
    }
   print(allowedList)
  }
  var properties = data.propertyNames();  
  url = data.clip(shenzhenShape.geometry().bounds()).getDownloadURL({
        name: yearName,
        scale: 30,
        format: 'tiff'
      });
  map.addLayer(data, params, labelName);
  layerInfo[labelName] = labelName;
  noLabel = false
  panel2.remove(label);
  label = ui.Label(yearName);
  var u2=label.setUrl(url);
  panel2.add(label);
  //print('Metadata properties: ', properties);
  //var csv_url = allowedfc.getDownloadUrl('csv')
  //print(csv_url)
  // make sure these two are always on top
  if ( classes){
    if (!('classes' in layerInfo)){
      map.addLayer(classy, {}, 'classes');
      layerInfo['classes'] = 'classes';
    }else{
      removeLayer('classes')
      map.addLayer(classy, {}, 'classes');
    }
  }
  // add another layer for drawing
  var blank = ee.Image().byte();
  if (!('blank' in layerInfo)){
    map.addLayer(blank,{},'blank')
    layerInfo['blank']=blank
  }else{
    removeLayer('blank')
    map.addLayer(blank, {}, 'blank');
  }
  if (!(county in layerInfo)){
    map.addLayer(outline,{},county)
    layerInfo[county]=county
  }else{
    print('removing '+county)
    removeLayer(county)
    map.addLayer(outline, {}, county);
  }
};
var label,thisyear;
var years = {'Year ...':'Year ...'};
var typos = {};
// initialise
// years is a dictionary of years
for ( i = parseInt(fromYear); i <= parseInt(toYear); i++){
  years[i] = setYear(i)
}
// reset variable year
year = setYear(fromYear)
// typos is dictionary of
// display types 
for (i = 0 ; i < types.length ; i++){
  typos[types[i]] = types[i]
}
// select from dictionary years
// set year, yearName and labelName
//
var select = ui.Select({
  items: Object.keys(years),
  placeholder: year.toString(),
  onChange: function(key) {
    year = setYear(key)
    print ('setting year to',year,checkExists(labelName),labelName)
    if (year !== NaN){
      print('reloading ...',county,type,year,timespan)
      doit(year);
    }
  }
});
// select from dictionary typos
// set type, labelName
var displayType = ui.Select({
  items: Object.keys(typos),
  placeholder: type,
  onChange: function(key) {
    type = key;
    year = setYear(year);
    print ('setting type to',type,checkExists(labelName),labelName)
    if (year !== NaN){
      print('reloading ...',county,type,year,timespan)
      doit(year);
    }
  }
})
// location selektor
var level1_select = ui.Select({
  items: level1_values,
  placeholder: level1_code,
  onChange: function(key) {
    level1_code = key
    level1_index = level1_values.indexOf(level1_code)
    level2_values = level2.filter( onlyLevel1 )
    var save_year = year
    clearFunction()
    county = level2_values[0]
    level2_select[level1_index].setValue(county)
    clearFunction()
    year = setYear(save_year)
    if (year !== NaN){
      print('reloading ...',level1_code,county,type,year,timespan)
      doit(year);
    }
    //select.setValue(year)
  }
})
// location selektor
var level2_select = [];
var save_level1 = level1_index
for (level1_index=0; level1_index <= level1_values.length; level1_index++){
  level1_code = level1_values[level1_index]
  level2_select.push(ui.Select({
    items: level2.filter( onlyLevel1 ),
    placeholder: county,
    onChange: function(key) {
      print('loading ' + county);
      var save_year = year
      clearFunction()
      year = setYear(save_year)
      county = key
      if (year !== NaN){
        print('reloading ...',level1_code,county,type,year,timespan)
        doit(year);
      }
    }
  }))
}
// reset values
level1_index = save_level1
level1_code = level1_values[level1_index]
// extend the time window for composite
var times = {0:0,1:1,2:2,3:3};
var timewindow = ui.Select({
  items: Object.keys(times),
  onChange: function(key) {
    timespan = key
    year = setYear(year)
    print ('setting time window to',timespan,checkExists(labelName),labelName)
    if (year !== NaN){
      print('reloading ...',county,type,year,timespan)
      doit(year);
    }
  }
})
var clearFunction = function () {
  map.centerObject(shenzhenShape,zoomLevel);
  panel2.clear();
  year = setYear(fromYear)
  addPanels(clear,displayType,select,timewindow)
  for (var key in layerInfo){
      removeLayer(key);
  }
  //year = setYear(year);
  noLabel = true
  select.setValue('Year ...');
  //timewindow.setValue('Set window ...')
  //displayType.setValue('Display ...')
}
var panel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '150px',position: 'bottom-left'}
});
var addPanels = function(clear,displayType,
          select,timewindow){
  var save_year = year
  year = setYear(save_year)
  print('reloading labels ...',county,type,year,timespan)
  panel2.remove(label);
  label = ui.Label(yearName);
  var u2=label.setUrl(url);
  var title = ui.Label('P. Lewis, UCL');
  title.setUrl('http://www2.geog.ucl.ac.uk/~plewis');
  panel2.add(title);
  var title = ui.Label('NCEO');
  title.setUrl('http://www.nceo.ac.uk');
  panel2.add(title);
  panel2.add(clear);
  panel2.add(displayType);
  panel2.add(select);
  panel2.add(timewindow);
  panel2.add(label);
  panel2.add(level1_select)
  panel2.add(level2_select[level1_index])
  year = setYear(save_year);
  try {
    select.setValue(year);
    displayType.setValue(type);
    timewindow.setValue(timespan);
    level1_select.setValue(level1_code)
    level2_select[level1_code].setValue(county)
  }
  catch (err){
    print('error',err);
  }
  if (! checkExists(labelName)){
    map.addLayer(data, params, labelName);
    layerInfo[labelName] = labelName;
    // actions if we have a new image
    // to display
    panel2.remove(label);
    label = ui.Label(yearName);
    var u2=label.setUrl(url);
    //panel2.add(label);
  }
};
// clear all terms
var noLabel = false
var clear = ui.Button('Clear ...');
clear.onClick(clearFunction);
// Set a place holder.
select.setValue(year.toString());
displayType.setValue(type);
timewindow.setValue(timespan.toString());
map.centerObject(shenzhenShape,zoomLevel)
//panel.style().set('background-color', 'black');
//map.style().set('background-color', 'black');
// add buttons
addPanels(clear,displayType,select,timewindow);
ui.root.add(panel2);