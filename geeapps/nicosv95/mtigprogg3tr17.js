var previo = ui.import && ui.import("previo", "imageCollection", {
      "id": "MODIS/MCD43A4_006_NDVI"
    }) || ee.ImageCollection("MODIS/MCD43A4_006_NDVI");
// Script: CODIGO_TF_PROGRAMACION_MTIG
// Autores : Nikolai Shurupov, Adrían Vicioso Matrat y
//           Pablo Aguilera Capitán
// Fecha : 02 / 02 / 2020
// Descipción: este scipt analiza las principales variables a estudiar
// para la evaluación de incendios pasados, mostrándolas al usuario
// mediante una interfaz sencilla, en la que puede escoger el país
// que quiere estudiar y las fechas, generando diferentes mapas,
// así como otros recursos visuales encaminados a mostrar la
// información relevante a dichos incendios.
//--------------------------------------------------------------------
//------------ Creación de la interfaz de usuario --------------------
//--------------------------------------------------------------------
// variabe tipo etiqueta, para el encabezado de la interfaz
var encabezado = ui.Label("ESTUDIO DE VARIABLES RELATIVAS A INCENDIOS");
encabezado.style().set({
  color: 'black',
  fontWeight: 'bold',
  fontSize: '20px',
  padding: '10px',
  stretch: 'both'
});
// se crea el panel general, que contendrá diferentes widgets y se le añade
// el encabezado
var panel = ui.Panel({style: {width: '450px'}})
    .add(encabezado);
// se crean variables para las fechas de estudio y se les asigna un valor
// por defecto
var dia1 = 15;
var dia2 = 15;
var mes1 = 7;
var mes2 = 7;
var año1 = 2018;
var año2 = 2019;
//------------------------------------------------------------------
// funcion que nos devuelve la fecha en el formato correcto para 
// hacer lo filtros. Tenemos que introducirle el año mes y dia
// algo que vendrá en función de lo que el usuario elija
function fecha (año, mes , dia){
  var fecha_string = año.toString() + '-' + mes.toString() + '-' 
  + dia.toString();
  return fecha_string;
}
//------------------------------------------------------------------
// funcion que nos genera un filtro en funcion del pais que
// se le de al argumento. Utiliza una colección de shapefiles
// de todos los paises del mundo.
function filtro_pais (pais_eleg) {
  var filtro = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', pais_eleg)));
    return filtro;
}
// se crea una lista con la disponibilidad de eleccion  de 
// dias y meses y años
var lista_años = ['2000', '2001', '2002', '2003', '2004',
'2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012',
'2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
var lista_meses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
'11', '12'];
var lista_dias = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
'11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
'22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
//------------------------------------------------------------------
// se crea un panel con una disposición horizontal, para albergar
// la seleccion de las fechas
var layout_fechas = ui.Panel.Layout.flow('horizontal', 'true');
// se le añade una descripción a cada seleccion
var primera = ui.Label ('Fecha más antigua:');
var segunda = ui.Label ('Fecha más reciente:');
// se crean paneles que tendrán las selecciones de cada fecha
var panel_fecha_1 = ui.Panel({style: {width: '400px'}}).
setLayout(layout_fechas);
var panel_fecha_2 = ui.Panel({style: {width: '400px'}}).
setLayout(layout_fechas);
// se añade una etiqueta para pedirle al usuario que introduzca
// las fechas 
var fechas = ui.Label ("Seleccione las fechas que quiere \
comparar (día/mes/año):");
// -------------------------------------------------------------
// se crean variables que definen las selecciones de fechas, 
// diferenciadas en año, mes y día, y teniendo una posición
// por defecto, que corresponde a los valores por defecto
// anteriormente dados
var años1 = ui.Select({
  items: lista_años,
  placeholder: 'año',
  value: '2018',
  onChange: function(item) {
    año1 = item;
  }
});
var meses1 = ui.Select({
  items: lista_meses,
  placeholder: 'mes',
  value: '7',
  onChange: function(item) {
    mes1 = item;
  }
});
var dias1 = ui.Select({
  items: lista_dias,
  placeholder: 'dia',
  value: '15',
  onChange: function(item) {
    dia1 = item;
  }
});
// variables para la segunda fecha
var años2 = ui.Select({
  items: lista_años,
  placeholder: 'año',
  value:'2019',
  onChange: function(item) {
    año2 = item;
  }
});
var meses2 = ui.Select({
  items: lista_meses,
  placeholder: 'mes',
  value: '7',
  onChange: function(item){
    mes2 = item;
  }
});
var dias2 = ui.Select({
  items: lista_dias,
  placeholder: 'dia',
  value:'15',
  onChange: function(item){
    dia2 = item;
  }
});
//----------------------------------------------------------
// se añade a los paneles destinados a las selecciones los
// componentes, primero la descripcion y luego las selecciones
panel_fecha_1.widgets().add(primera).add(dias1).add(meses1)
.add(años1);
panel_fecha_2.widgets().add(segunda).add(dias2).add(meses2)
.add(años2);
//-------------------------------------------------------------
// se crea una variable que albergará el centroide de cada país,
// que servirá para el posicionamiento de los mapas, así como 
// otros cálculos
var paises = {
"Aruba": [-69.97564096,12.51562863],
"Antigua and Barbuda": [-61.79123792,17.27981563],
"Afghanistan": [66.02647098,33.83880586],
"Algeria": [2.632388122,28.16323959],
"Azerbaijan": [47.53268956,40.29211798],
"Albania": [20.06838415,41.14228459],
"Armenia": [44.9473915,40.2862005],
"Andorra": [1.576766502,42.54865426],
"Angola": [17.54471786,-12.29531944],
"American Samoa": [-170.7078332,-14.3044054],
"Argentina": [-65.16768272,-35.37618372],
"Australia": [134.4895628,-25.73496855],
"Austria": [14.14019177,47.59290263],
"Anguilla": [-63.0600807,18.22287445],
"Bahrain": [50.55964395,26.02240693],
"Barbados": [-59.56195466,13.1787147],
"Botswana": [23.81502783,-22.1820037],
"Bermuda": [-64.73701064,32.31792009],
"Belgium": [4.663988677,50.64285123],
"Bahamas The": [-76.54662399,24.20112825],
"Bangladesh": [90.26849826,23.84323275],
"Belize": [-88.68600654,17.21685361],
"Bosnia and Herzegovina": [17.786531,44.16811507],
"Bolivia": [-64.67059522,-16.7149743],
"Myanmar (Burma)": [96.50692114,21.15431881],
"Benin": [2.343134643,9.647319471],
"Byelarus": [28.0467875,53.53999766],
"Solomon Islands": [159.6343165,-8.918215849],
"Brazil": [-53.09008606,-10.77302009],
"Bhutan": [90.42943411,27.4154148],
"Bulgaria": [25.231507,42.76137672],
"Bouvet Island": [3.412522013,-54.42190483],
"Brunei": [114.761101,4.521445464],
"Burundi": [29.88714613,-3.35617465],
"Canada": [-98.26544775,61.39204194],
"Cambodia": [104.9239813,12.7164319],
"Chad": [18.66447912,15.36116673],
"Sri Lanka": [80.70472725,7.608085191],
"Congo": [15.22429387,-0.840231822],
"Zaire": [23.65499278,-2.876113745],
"China": [103.8342008,36.56309785],
"Chile": [-71.37398134,-37.85289524],
"Cayman Islands": [-81.23845124,19.30866226],
"Cocos (Keeling) Islands": [96.83688605,-12.17124869],
"Cameroon": [12.74359418,5.685951589],
"Comoros": [43.67591712,-11.89275515],
"Colombia": [-73.07321492,3.900749163],
"Northern Mariana Islands": [145.6792178,15.08851819],
"Costa Rica": [-84.18821314,9.970197392],
"Central African Republic": [20.48282611,6.571340777],
"Cuba": [-79.03617697,21.62110682],
"Cape Verde": [-23.96778699,15.97896577],
"Cook Islands": [-158.9089498,-20.93401036],
"Cyprus": [33.22176239,35.04588159],
"Denmark": [10.04629681,55.96339791],
"Djibouti": [42.57776536,11.74967652],
"Dominica": [-61.35552694,15.43655219],
"Jarvis Island": [-160.0272248,-0.386017466],
"Dominican Republic": [-70.48463498,18.89444757],
"Ecuador": [-78.76707313,-1.427420109],
"Egypt": [29.87190346,26.49418384],
"Ireland": [-8.150579831,53.17638071],
"Equatorial Guinea": [10.34198336,1.712337866],
"Estonia": [25.52761599,58.67413614],
"Eritrea": [38.85148306,15.35849486],
"El Salvador": [-88.86651145,13.7368969],
"Ethiopia": [39.61603198,8.626219602],
"Czech Republic": [15.33841182,49.742859],
"French Guiana": [-53.24122376,3.924688028],
"Finland": [26.2663707,64.5004223],
"Fiji": [171.9684791,-17.45203386],
"Falkland Islands (Islas Malvinas)": [-59.36329821,-51.73711652],
"Federated States of Micronesia": [159.4042472,6.492370489],
"Faroe Islands": [-6.884109546,62.03106556],
"French Polynesia": [-146.4185449,-14.85492977],
"Baker Island": [-176.4616445,0.219097172],
"France": [2.551955276,46.56450214],
"French Southern & Antarctic Lands": [68.86192039,-49.191794],
"Gambia. The": [-15.38655505,13.45265022],
"Gabon": [11.79723667,-0.590945179],
"Georgia": [43.51744847,42.17631092],
"Ghana": [-1.207289069,7.959925113],
"Gibraltar": [-5.34489353,36.1382128],
"Grenada": [-61.67937749,12.11292582],
"Guernsey": [-2.576392934,49.45870844],
"Greenland": [-41.38947708,74.72091167],
"Germany": [10.39364663,51.10656192],
"Glorioso Islands": [47.29094829,-11.56622292],
"Guadeloupe": [-61.53674451,16.20346056],
"Guam": [144.7755968,13.44356515],
"Greece": [22.96103798,39.06832122],
"Guatemala": [-90.35658588,15.70212309],
"Guinea": [-10.94155551,10.43828438],
"Guyana": [-58.97478087,4.792017508],
"Gaza Strip": [34.37274995,31.40186539],
"Haiti": [-72.67976505,18.94103393],
"Heard Island & McDonald Islands": [73.49837334,-53.09133259],
"Honduras": [-86.61916331,14.81900732],
"Howland Island": [-176.6374176,0.80009658],
"Croatia": [16.41178015,45.05116215],
"Hungary": [19.41344909,47.16650259],
"Iceland": [-18.6054668,64.99758844],
"Indonesia": [117.3690872,-2.283060044],
"Man. Isle of": [-4.525850221,54.22908019],
"India": [79.61623204,22.88359643],
"British Indian Ocean Territory": [72.43402899,-7.33426821],
"Iran": [54.30137409,32.5658376],
"Israel": [34.96570616,31.35825487],
"Italy": [12.07236771,42.79650596],
"Ivory Coast": [-5.555620733,7.631537724],
"Iraq": [43.77213545,33.04802422],
"Japan": [137.9907444,37.56216144],
"Jersey": [-2.128800764,49.21932705],
"Jamaica": [-77.31922201,18.15129451],
"Jan Mayen": [-8.40353233,71.02084811],
"Jordan": [36.78672909,31.253316],
"Johnston Atoll": [-169.5339254,16.72804832],
"Juan De Nova Island": [42.74374567,-17.0644908],
"Kenya": [37.85788188,0.529862465],
"Kyrgyzstan": [74.55559628,41.46505396],
"North Korea": [127.1819577,40.14306385],
"Kiribati": [-157.3710212,1.838936211],
"South Korea": [127.8347859,36.37507632],
"Christmas Island": [105.7036983,-10.44411526],
"Kuwait": [47.59084828,29.34078879],
"Kazakhstan": [67.30177359,48.16008808],
"Laos": [103.763291,18.50274275],
"Lebanon": [35.88802607,33.9202654],
"Latvia": [24.92942495,56.85753455],
"Lithuania": [23.89812216,55.33567042],
"Liberia": [-9.307913504,6.448091859],
"Slovakia": [19.49165106,48.70753085],
"Liechtenstein": [9.55426913,47.15184761],
"Lesotho": [28.24301088,-29.58099985],
"Luxembourg": [6.087813625,49.77062796],
"Libya": [18.02328719,27.04395393],
"Madagascar": [46.70598428,-19.37353392],
"Martinique": [-61.021287,14.65254855],
"Macau": [113.5446597,22.20025131],
"Moldova": [28.47393059,47.19387086],
"Mayotte": [45.13516038,-12.81979558],
"Mongolia": [103.0832178,46.83529069],
"Montserrat": [-62.18693362,16.73536462],
"Malawi": [34.30723321,-13.21580366],
"Macedonia": [21.69747575,41.59968267],
"Mali": [-3.524422199,17.35027936],
"Monaco": [7.412821471,43.74798088],
"Morocco": [-6.317815277,31.88359242],
"Mauritius": [57.87075527,-20.25186813],
"Midway Islands": [-177.3788154,28.2051968],
"Mauritania": [-10.33229756,20.25985139],
"Malta": [14.4419214,35.89052244],
"Oman": [56.10983911,20.60228607],
"Maldives": [73.25221968,3.216466766],
"Montenegro": [19.25324047,42.79132403],
"Mexico": [-102.5328674,23.95046417],
"Malaysia": [109.7081896,3.792367482],
"Mozambique": [35.55217759,-17.2597642],
"New Caledonia": [165.7154892,-21.31633776],
"Niue": [-169.8687819,-19.05230929],
"Norfolk Island": [167.9525968,-29.03765705],
"Niger": [9.39764774,17.42614884],
"Vanuatu": [167.7181487,-16.25505213],
"Nigeria": [8.105306422,9.593959894],
"Netherlands": [5.602520768,52.2489011],
"Norway": [14.08452364,64.44783776],
"Nepal": [83.93854801,28.25300728],
"Nauru": [166.9293765,-0.522103113],
"Suriname": [-55.91182623,4.126394485],
"Netherlands Antilles": [-68.69366948,12.18780313],
"Nicaragua": [-85.03478271,12.83990547],
"New Zealand": [171.7799023,-41.83887362],
"Paraguay": [-58.39102389,-23.23621066],
"Pitcairn Islands": [-128.5932104,-24.47652155],
"Peru": [-74.37548838,-9.163819879],
"Paracel Islands": [112.3755589,16.70168815],
"Spratly Islands": [115.5979485,10.562934],
"Pakistan": [69.3859662,29.96702235],
"Poland": [19.40088385,52.1246099],
"Panama": [-80.10109595,8.506481485],
"Portugal": [-8.562730569,39.60099468],
"Papua New Guinea": [145.2411745,-6.47839859],
"Pacific Islands (Palau)": [134.5752425,7.515074884],
"Guinea-Bissau": [-14.96348267,12.03170051],
"Qatar": [51.19120099,25.31507848],
"Reunion": [55.53817919,-21.12166117],
"Marshall Islands": [168.3726868,7.691290312],
"Romania": [24.96925848,45.84361475],
"Philippines": [122.8787084,11.74183379],
"Puerto Rico": [-66.46233924,18.22132944],
"Russia": [96.69192635,61.98837763],
"Rwanda": [29.91765165,-1.997891954],
"Saudi Arabia": [44.58558816,24.02314403],
"St. Pierre and Miquelon": [-56.3235518,46.95314944],
"St. Kitts and Nevis": [-62.75351757,17.32618928],
"Seychelles": [52.22986934,-6.35438576],
"South Africa": [25.0832651,-28.99320536],
"Senegal": [-14.46765328,14.36696501],
"St. Helena": [-5.717149699,-15.96154478],
"Slovenia": [14.82653641,46.1235634],
"Sierra Leone": [-11.79192158,8.560284443],
"San Marino": [12.46097655,43.94294326],
"Singapore": [103.8080526,1.351616135],
"Somalia": [45.86259061,6.063723511],
"Spain": [-3.648460866,40.22798858],
"Serbia": [20.80545769,44.03204591],
"St. Lucia": [-60.96871248,13.89786929],
"Sudan": [30.04995192,13.83153427],
"Svalbard": [18.48354241,78.86365728],
"Sweden": [16.73976586,62.7900621],
"South Georgia and the South Sandwich Is": [-36.38237451,-54.48814516],
"Syria": [38.50559191,35.01304784],
"Switzerland": [8.234391877,46.80249557],
"United Arab Emirates": [54.33506465,23.91043413],
"Trinidad and Tobago": [-61.25317568,10.4686431],
"Thailand": [101.0174377,15.12733346],
"Tajikistan": [71.04200377,38.52817766],
"Turks and Caicos Islands": [-71.84291827,21.85321959],
"Tokelau": [-171.8526596,-9.195174424],
"Tonga": [-174.8312929,-20.3933696],
"Togo": [0.975721213,8.534960719],
"Sao Tome and Principe": [6.736587813,0.456984037],
"Tunisia": [9.561168347,34.11070387],
"Turkey": [35.1795934,39.06048136],
"Tuvalu": [178.5575687,-7.827811099],
"Taiwan": [120.9507986,23.75401183],
"Turkmenistan": [59.38437733,39.12228503],
"Tanzania. United Republic of": [34.82345403,-6.270353381],
"Uganda": [32.38621788,1.279963529],
"United Kingdom": [-2.895584267,54.15534988],
"Ukraine": [31.38711464,49.01708817],
"United States": [-112.4915179,45.69558115],
"Burkina Faso": [-1.74014151,12.27792952],
"Uruguay": [-56.01239623,-32.79964551],
"Uzbekistan": [63.16937198,41.75043681],
"St. Vincent and the Grenadines": [-61.1937652,13.25480782],
"Venezuela": [-66.16957169,7.122435565],
"British Virgin Islands": [-64.53042575,18.44458761],
"Vietnam": [106.3011711,16.65938828],
"Virgin Islands": [-64.76258596,17.73553814],
"Namibia": [17.22193022,-22.13210247],
"West Bank": [35.25628199,31.94625626],
"Wallis and Futuna": [-177.1507759,-13.7874264],
"Western Sahara": [-13.13654022,24.66167068],
"Wake Island": [166.6380028,19.30204239],
"Western Samoa": [-172.1594627,-13.75836525],
"Swaziland": [31.49752897,-26.56264211],
"Yemen": [47.62558118,15.80796304],
"Zambia": [27.79824943,-13.45301834],
"Zimbabwe": [29.87183767,-19.0000981]
};
//-------------------------------------------------------------
// se crea una variable que tendrá guardado el país que el usuario
// quiera evaluar, y se centra el mapa por defecto en Australia
var pais_elegido = "Australia";
Map.setCenter(paises[pais_elegido][0], paises[pais_elegido][1]);
//--------------------------------------------------------------
// se crea un panel de seleccion, para que el usuario elija entre
// los países que se han recopilado, cuando el usuario cambia de
// país el mapa cambia el centro al centroide del país seleccionado
var seleccion = ui.Select({
  items: Object.keys(paises),
  placeholder: 'Escoja el país de su interés',
  value: 'Australia',
  onChange: function(key) {
    Map.setCenter(paises[key][0], paises[key][1]);
    pais_elegido = key;
  }
});
// se actualiza el estilo de este panel, para que cubra todo el ancho
// del panel base
seleccion.style().set({stretch: 'both'});
// se añaden, en orden todos estos paneles al panel base
panel.widgets().add(seleccion);
panel.widgets().add(fechas);
panel.widgets().add(panel_fecha_1);
panel.widgets().add(panel_fecha_2);
//###############################################################
//###-----------------------NDVI------------------------------###
//###############################################################
// se crea un bottón para mostrar los índices NDVI
var ejecución_NDVI = ui.Button('Pulse para visualizar\
 los valores de NDVI para cada fecha');
// se actualiza el estilo de este botón
ejecución_NDVI.style().set({
  border: '1px solid black',
  stretch: 'both',
  fontWeight: 'bold',
  color: 'black',
});
// se crea una función que se ejecutará al ser pulsado
ejecución_NDVI.onClick(function() {
  // primero se limpia cualquier otra información que haya en el mapa, 
  // para no entorpecer el entendimiento de los nuevos datos añadidos
  Map.clear();
  // seleccion de ambas fechas para las que se quiere obtener informacion
  var fecha_1 = fecha(año1, mes1, dia1);
  var fecha_2 = fecha(año2, mes2, dia2);
  // se ejecuta la función de filtrado, para generar el filtro de países
  var fc = filtro_pais (pais_elegido);
  // carga de la base de datos de MODIS y filtrado por fechas
  var imagen1 = ee.ImageCollection('MODIS/MCD43A4_006_NDVI')
                .filter(ee.Filter.date(fecha_1));
  // generalizacion a traves del empleo de la mediana            
  var median1 = imagen1.median();
  var clip1 = median1.clipToCollection(fc);
  //se genera la segunda imagen con los mismos procedimientos
  var imagen2 = ee.ImageCollection('MODIS/MCD43A4_006_NDVI')
                .filter(ee.Filter.date(fecha_2));
  var median2 = imagen2.median();
  var clip2 = median2.clipToCollection(fc);
  // un variable que se utilizará para generar el gráfico de cambios
  // contiene una lista de todas las imágenes diarias comprendidas en
  // dos fechas
  var grafica = ee.ImageCollection('MODIS/MCD43A4_006_NDVI')
                .filterDate(fecha_1, fecha_2)
                .select('NDVI');
  // asignacion de los parametros de visualizacion
  var colorizedVis = {
    min: 0.0,
    max: 1.0,
    palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901','66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01','012E01', '011D01', '011301'
    ],
  };
  // eleccion del titulo de la leyenda y formato
  var legendTitle = ui.Label({
    value: 'NDVI',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // creamos el panel y posicion de la leyenda
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 10px'
    }
  }).add(legendTitle);
  // crear la imagen de la leyenda
  var lon = ee.Image.pixelLonLat().select('latitude');
  //asignacion de valores de la leyenda
  var gradient = lon.multiply((colorizedVis.max-colorizedVis.min)
  /100.0).add(colorizedVis.min);
  //asignacion a la leyenda de la paleta de visualizacion del mapa
  var legendImage = gradient.visualize(colorizedVis);
  //asignacion de las etiquetas de la leyenda (maximo y minimo)  
  var len_max = ui.Label(colorizedVis['max']);
  var miniatura = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions: '10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  var len_min = ui.Label (colorizedVis['min']);
  // añadiendo a la leyenda por orden, los elementos
  legend.add(len_max).add(miniatura).add(len_min);
  //anadir a la vista final la leyenda
  Map.add(legend);
  //anadir a la vista final el NDVI de cada fecha
  Map.addLayer(clip1, colorizedVis, 'NDVI-1');
  Map.addLayer (clip2, colorizedVis, 'NDVI-2');
  // Se crea un título para el posterior gráfico que se va a crear,
  // para diferenciarlo bien de otros elemntos y que se vea bien 
  // con qué características se ha generado
  var titulo_grafica = ui.Label('Cambio de NDVI entre las fechas ' +
  fecha_1 + ' y ' + fecha_2 + " para el país: " + pais_elegido);
  // se crea un chart (gráfico)
  var chart = ui.Chart.image.series({
    imageCollection: grafica,
    region: fc,
    reducer: ee.Reducer.mean(),
    scale: 1000
  });
  // Se establece el estilo y tamaño del gráfico y se añade al panel base
  chart.style().set({
    position: 'bottom-right',
    width: '400px',
    height: '300px'
  });
  panel.add(titulo_grafica);
  panel.add(chart);
});
//###############################################################
//###-----------------------NBR-------------------------------###
//###############################################################
// creación de un botón para el índice
var ejecución_NBR = ui.Button('Pulse para valorar los incendios\
 entre dos fechas mediante el índice NBR');
// se establece el estilo
ejecución_NBR.style().set({
  border: '1px solid brown',
  stretch: 'both',
  fontWeight: 'bold',
  color: 'brown',
});
// función que se ejecutará al hacer click en su botón, igual
// que anteriormente
ejecución_NBR.onClick(function() {
  //seleccion de las fechas para el estudio del indice NBR
  var fecha_1 = fecha(año1, mes1, dia1);
  var fecha_2 = fecha(año2, mes2, dia2);
  // se limpa cualquier resultado generado anteriormente, algo
  // que se hace con todas las funciones para no ensuciar la 
  // presetación de resultados
  Map.clear();
  // carga de la base de datos de MODIS y filtrado por fechas
  var quemado = ee.ImageCollection('MODIS/006/MCD43A4') 
     .filterDate(fecha_1, fecha_2);
  // generalizacion de las imagenes a traves de la mediana  
  var median = quemado.reduce(ee.Reducer.median()); 
  var paises = filtro_pais (pais_elegido);
  // Clip de los valores de modis con el area de estudio elegida por el usuario
  var clip = median.clipToCollection(paises);
  // obtencion del indice
  var NBR= clip.normalizedDifference (['Nadir_Reflectance_Band2_median',
  'Nadir_Reflectance_Band7_median']) ; 
  // eleccion de parametros de visualizacion
  var colorizedVis= {
  min: 0.0,
  max: 1.0,
  palette: [
    '#7F0010', '#E02E20', '#EC6521', '#F6D53B'],
    };
  // eleccion del titulo de la leyenda y formato
  var legendTitle = ui.Label({
    value: 'NBR',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // crear el panel y posicion de la leyenda
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 10px'
    }
  }).add(legendTitle);
  // crear la imagen de la leyenda
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((colorizedVis.max-colorizedVis.min)
  /100.0).add(colorizedVis.min);
  var legendImage = gradient.visualize(colorizedVis);
  // asignar valor en la parte superior de la leyenda
  var len_max = ui.Label(colorizedVis['max']);
  // crear la miniatura a partir de la imagen 
  var miniatura = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions: '10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  // asignar valor a la parte inferior de la leyenda
  var len_min = ui.Label(colorizedVis['min']);
  legend.add(len_max).add(miniatura).add(len_min);
  //mostrar leyenda en la vista final junto con el mapa del indice
  Map.add(legend);
  Map.addLayer(NBR, colorizedVis, 'NBR');
});
//###############################################################
//###-----------------------MULTI NDVI------------------------###
//###############################################################
// igual que anteriormente, creación del botón, del estilo y la
// función de ejecución
var ejecución_DIFF_NDVI = ui.Button('Pulse para visualizar un \
análisis multitemporal del NDVI de ambas fechas');
ejecución_DIFF_NDVI.style().set({
  border: '1px solid green',
  stretch: 'both',
  fontWeight: 'bold',
  color: 'green',
});
ejecución_DIFF_NDVI.onClick(function() {
  var fecha_1 = fecha(año1, mes1, dia1);
  var fecha_2 = fecha(año2, mes2, dia2);
  Map.clear();
  var Tiempo1 = ee.ImageCollection ('MODIS/006/MCD43A4')
    .filterDate (fecha_1);
  var Tiempo1b = Tiempo1.reduce(ee.Reducer.median());
  var Tiempo2 = ee.ImageCollection ('MODIS/006/MCD43A4')
    .filterDate (fecha_2); 
  var Tiempo2b = Tiempo2.reduce(ee.Reducer.median());
  // calculo del NDVI para las dos fechas
  var NDVI1 = Tiempo1b.normalizedDifference (['Nadir_Reflectance_Band2_median',
  'Nadir_Reflectance_Band1_median']);
  var NDVI2 = Tiempo2b.normalizedDifference (['Nadir_Reflectance_Band2_median',
  'Nadir_Reflectance_Band1_median']);
  // asignacion del NDVI de cada fecha a un cañon de color RGB para el
  // analisis multitemporal
  var NDVImultitemporal = NDVI1.addBands(NDVI2).addBands(NDVI2);
  var paises = filtro_pais (pais_elegido);
  // Clip del analisis multitemporal a la region de estudio
  var clipped2 = NDVImultitemporal.clipToCollection(paises);
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  });
  // generar titulo de la leyenda
  var legendTitle = ui.Label({
    value: 'Análisis multitemporal NDVI',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // asignar titulo de la leyenda al panel
  legend.add(legendTitle);
  // dar formato a la leyenda.
  var makeRow = function(color, name) {
        var colorBox = ui.Label({
          style: {
            backgroundColor: '#' + color,
            padding: '8px',
            margin: '0 0 4px 0'
          }
        });
        var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
        });
        return ui.Panel({
          widgets: [colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal')
        });
  };
  //eleccion de la paleta
  var palette =['FF0000', '1500ff'];
  // etiquetas de la leyenda
  var names = [fecha_1, fecha_2];
  // asignacion de cada color a su etiqueta
  for (var i = 0; i < 2; i++) {
    legend.add(makeRow(palette[i], names[i]));
    }  
  // se añade la imagen con una visualicación determinada 
  // para poder observar correctamente las diferencias
  Map.addLayer (clipped2, {max: 1.0, min: 0.1, gamma: 1.0,},
  'NDVI multitemporal');
  //anadir a la vista final la leyenda
  Map.add(legend);  
});
//###############################################################
//###-----------------------GIF-------------------------------###
//###############################################################
var ejecución_GIF = ui.Button('Pulse para generar un GIF\
 que muestre los cambios a lo largo del tiempo');
ejecución_GIF.style().set({
  border: '1px solid purple',
  stretch: 'both',
  fontWeight: 'bold',
  color: 'purple',
});
ejecución_GIF.onClick(function() {
  var fecha_1 = fecha(año1, mes1, dia1);
  var fecha_2 = fecha(año2, mes2, dia2);
  var paises = filtro_pais (pais_elegido);
  // obtencion de la geometria del pais   
  var geometria = paises.first().geometry();
  // tiítulo para el GIF
  var nombre_GIF = ui.Label ('Se ha generado un GIF para: '
  + pais_elegido);
  var collection = ee.ImageCollection("MODIS/006/MOD13Q1")
    .filterDate(fecha_1, fecha_2)
    .select('NDVI');
  //establecimiento de los argumentos de visualizacion
  var args = {
    crs: 'EPSG:3857',  // Mercator
    region: geometria,
    min: -2000,
    max: 10000,
    palette: 'black, blanchedalmond, green, green',
    framesPerSecond: 5, //numero de imagenes por segundo
  };
  // Crer un video miniatura y añadirlo a la visualizacion final
  var thumb = ui.Thumbnail({
    image: collection,
    params: args
  });
  panel.widgets().add(nombre_GIF).add(thumb);
});
//###############################################################
//###--------------Índice de severidad de incendios-----------###
//###############################################################
var ejecución_SEVI= ui.Button('Pulse para visualizar el\
 índice de severidad de incendios entre las fechas');
ejecución_SEVI.style().set({
  border: '1px solid red',
  stretch: 'both',
  fontWeight: 'bold',
  color: 'red',
});
ejecución_SEVI.onClick(function() {
  var fecha_1 = fecha(año1, mes1, dia1);
  var fecha_2 = fecha(año2, mes2, dia2);
  Map.clear();
  var paises = filtro_pais (pais_elegido);
  var modis1 = ee.ImageCollection('MODIS/006/MCD43A4') 
     .filterDate(fecha_1);
  var median1 = modis1.reduce(ee.Reducer.median()); 
  var clip1 = median1.clipToCollection(paises);
  // Calculo del índice NBR a traves con las bandas NIR y SWIR 
  var NBR_fecha_1= clip1.normalizedDifference (['Nadir_Reflectance_Band2_median',
  'Nadir_Reflectance_Band7_median']);
  var modis2 = ee.ImageCollection('MODIS/006/MCD43A4') 
     .filterDate(fecha_2);
  var median2 = modis2.reduce(ee.Reducer.median()); 
  var clip2 = median2.clipToCollection(paises);
  // Calculo del índice NBR a traves con las bandas NIR y SWIR 
  var NBR_fecha_2= clip2.normalizedDifference (['Nadir_Reflectance_Band2_median',
  'Nadir_Reflectance_Band7_median']) ; 
  // Obtencion del indice de severidad de incendios mediante
  // resta de NBR de ambas fechas
  var IndiceSeveridad = NBR_fecha_1.subtract(NBR_fecha_2);
  //selección de parametros de visualizacion 
  var colorizedVis_severidad = {
      max: 1.0,
      min: 0.0,
      'palette': ['011301', '011D01', '012E01', '023B01', '004C00',
      '056201','207401', '3E8601', '529400', '74A901', '99B718',
      'FCD163','F1B555', 'DF923D', 'CE7E45']};
  // eleccion del titulo de la leyenda y formato
  var legendTitle = ui.Label({
    value: 'Índice de severidad de incendios',
    style: {
      maxWidth: '55px',
      fontWeight: 'bold',
      fontSize: '12px',
      margin: '0 0 1px 0',
      padding: '0'
      }
  });
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '2px 4'
    }
  }).add(legendTitle);
  // crear la imagen de la leyenda
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((colorizedVis_severidad.
  max-colorizedVis_severidad.min)/100.0).add(colorizedVis_severidad.min);
  var legendImage = gradient.visualize(colorizedVis_severidad);
  // asignar valor en la parte superior de la leyenda
  var len_max = ui.Label(colorizedVis_severidad['max']);
  // crear la miniatura a partir de la imagen 
  var miniatura = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions: '10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  // asignar valor a la parte inferior de la leyenda
  var len_min = ui.Label(colorizedVis_severidad['min']);
  legend.add(len_max).add(miniatura).add(len_min);
  Map.add(legend);
  Map.addLayer (IndiceSeveridad, colorizedVis_severidad,
  'Indice de severidad');
});
// se crea un último botón para borrar los Widgets GIS, charts 
// y sus respectivos titulos. Es necesario pulsar varias veces
// el boton para borrar todo, es un problema derivado de
// problemas dentro de la función .remove
var borrado = ui.Button('Pulse aquí si quiere eliminar todos\
 los widgets generados (gráficas y GIFs)');
borrado.style().set({
  border: '1px solid blue',
  stretch:'both',
  fontWeight: 'bold',
  color: 'blue'
 });
 // función a ejecutar para borrar los widgets sobrantes
 borrado.onClick(function(){
   // se mira a ver cuántos elementos tiene el panel
   var numero_widgets = panel.widgets().length();
   // si tiene más de 10 significa que hay más que los 
   // botones básicos, y son los que será necesario borrar,
   // que se hace con un bucle for, para borrar todos los
   // widgets a partir del décimo
   if (numero_widgets > 10) {
     for (var i = 11; i <= numero_widgets; i++){
       panel.remove(panel.widgets().get(i));
     }
    }
  });
// se añaden todos los botones al panel base, en orden
// y por último se añade el panel base a la página principal
panel.widgets().add(ejecución_NDVI);
panel.widgets().add(ejecución_NBR);
panel.widgets().add(ejecución_DIFF_NDVI);
panel.widgets().add(ejecución_GIF);
panel.widgets().add(ejecución_SEVI);
panel.widgets().add(borrado);
ui.root.add(panel);