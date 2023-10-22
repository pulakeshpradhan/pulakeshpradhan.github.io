var clase1 = ui.import && ui.import("clase1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -87.30878051892302,
            15.511763616205677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -86.95309814587614,
            15.629500946286404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -86.83774170056364,
            15.670494716917863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -86.89679321423552,
            15.612307566634806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.64523681775114,
            15.851561961097007
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-87.30878051892302, 15.511763616205677]),
            {
              "clase": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-86.95309814587614, 15.629500946286404]),
            {
              "clase": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-86.83774170056364, 15.670494716917863]),
            {
              "clase": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-86.89679321423552, 15.612307566634806]),
            {
              "clase": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.64523681775114, 15.851561961097007]),
            {
              "clase": 1,
              "system:index": "4"
            })]),
    clase2 = ui.import && ui.import("clase2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -86.79379638806364,
            15.77624703837972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.20853027478239,
            15.603048995670035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.66171630993864,
            15.607017005830524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.32794745439669,
            15.75617557640025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.35403998369357,
            15.769722456566111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.1964548396506,
            15.760471026531313
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 2
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-86.79379638806364, 15.77624703837972]),
            {
              "clase": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.20853027478239, 15.603048995670035]),
            {
              "clase": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.66171630993864, 15.607017005830524]),
            {
              "clase": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.32794745439669, 15.75617557640025]),
            {
              "clase": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.35403998369357, 15.769722456566111]),
            {
              "clase": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.1964548396506, 15.760471026531313]),
            {
              "clase": 2,
              "system:index": "5"
            })]),
    clase3 = ui.import && ui.import("clase3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -87.42928680554411,
            15.797060543372233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.23705275530001,
            15.798052335996688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.13843329424044,
            15.783268432264665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.38219244951388,
            15.803090179584947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.37086279863497,
            15.825882789720223
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 3
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-87.42928680554411, 15.797060543372233]),
            {
              "clase": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.23705275530001, 15.798052335996688]),
            {
              "clase": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.13843329424044, 15.783268432264665]),
            {
              "clase": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.38219244951388, 15.803090179584947]),
            {
              "clase": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.37086279863497, 15.825882789720223]),
            {
              "clase": 3,
              "system:index": "4"
            })]);
var dropdownPanel;
var resultPanel;
var admin1Selected;
var admin0Selected;
var admin0Select;
var admin1Select;
var admin2Select;
var admin0Names;
var admin1Names;
//Inicio de Filtro Dinámico
// Drill-down (Cascading Forms) in Earth Engine
// This script shows how to build hierarchical selection using UI Widgets
var admin00 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var admin0 = admin00.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var admin11= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var admin1 = admin11.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var admin22= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var admin2 = admin22.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
// Create a panel to hold the drop-down boxes
 dropdownPanel = ui.Panel();
// Create a panel to hold the result
var resultPanel = ui.Panel();
// Define 3 dropdowns for admin0, admin1 and admin2 names
// Keep them disbled. We will add items later
 admin0Select = ui.Select({
    placeholder: 'Espere por favor..',
  }).setDisabled(true)
 admin1Select = ui.Select({
    placeholder: 'Seleccione un Municipio',
  }).setDisabled(true)
 admin2Select = ui.Select({
  placeholder: 'Seleccione un Municipio',
}).setDisabled(true)
dropdownPanel.add(admin0Select)
dropdownPanel.add(admin1Select)
//dropdownPanel.add(admin2Select)
// *************************
// Define callback functions
// *************************
// We need to do this first since the functions need to
// be defined before they are used.
// Define the onChange() function for admin0Select
 var admin0Selected = function(admin0Selection) {
  resultPanel.clear()
  admin1Select.setPlaceholder('Por favor espere..')
  // Now we have admin0 values, fetch admin1 values for that country
  admin1Names = admin2
    .filter(ee.Filter.eq('ADM1_NAME', admin0Selection))
    .aggregate_array('ADM2_NAME')
    .sort()
  // Use evaluate() to not block the UI
  admin1Names.evaluate(function(items){
    admin1Select.setPlaceholder('Seleccione un Municipio')
    admin1Select.items().reset(items)
    // Now that we have items, enable the menu
    admin1Select.setDisabled(false)
  })
}
// Define the onChange() function for admin1Select
 admin1Selected = function(admin1Selection) {
 var admin0Value = admin0Select.getValue()
   var admin1Value = admin1Select.getValue()
  //var admin2Value = admin2Select.getValue()
  var result =  admin1Value + ',' + admin0Value
   Map.clear();
  var label = ui.Label('Usted seleccionó: ' + result)
  resultPanel.add(label)
//Mostrará unicamente el país seleccionado
var country = admin1.filterMetadata('ADM1_NAME', 'equals',admin0Value); // Country border polygons of high accuracy
    studyarea = ee.FeatureCollection([country.geometry()]);       //Luis Usar studyarea para filtrar por país
}
// Register the callback functions
admin0Select.onChange(admin0Selected)
//admin1Select.onChange(admin1Selected)
//admin2Select.onChange(admin2Selected)
// ******************
// Populate the items
// ******************
// Get all country names and sort them
 admin0Names = admin1.aggregate_array('ADM1_NAME').sort()
// Fetch the value using evaluate() to not block the UI
admin0Names.evaluate(function(items){
  admin0Select.items().reset(items)
  // Now that we have items, enable the menu
  admin0Select.setDisabled(false)
  // Change placeholder
  admin0Select.setPlaceholder('Seleccione un Departamento')
})
//Fin 
var cloud = "CLOUD_COVER";
var configuracion = {
    // --- solo se toma en cuenta el limite configurado con cadena no vacia ---
    'limite': {
        featureCollection: '',
        paisMundial: '',
        paisMesoamerica: 'Republica_Dominicana',
        subRegion: 'Azua', //solo existe subregiones para Dominican Republic(o Republica_Dominicana) y Panama
    },'mosaico': {
        'coleccion': 'LC8_L1T',
        'metodoMosaico': 'simple_composite',
        'cloudCover': 10,
        'percentil': 50,
        'cloudScore': 10,
        'fechaInicial': '2015-01-01',
        'fechaFinal': '2015-12-31',
        'diaInicial': 90,
        'diaFinal': 300,
    },
    parametrosVisualizacion: {
        'bands': ['','',''],
        'gamma': '0.95,1.1,1',
        'min': '0',
        'max': '0.5',
    },
    parametrosClasificacion: {
        'cart': 0,
        'randomForest': 0,
        'svm': 0,
        'metodo': 'cart',
        'gamma': 0.5,
        'costo': 0.25,
    },
    clases: [],
    paletaLeyenda: [
        ['367c25', 'ffe63d', '111fff', ],
        ['clase 1', 'clase 2', 'clase 3', ]
    ]
};
var constantes = {
    parametrosVisualizacion: {
        'LT5_L1T':{
            'bands': ['B5','B4','B3'],
            'min': '0',
            'max': '0.5',
            'gamma': '0.95,1.1,1'
        },
       'LC8_L1T_S': {
            'bands': ['B5','B6','B4'],
            'min': '0',
            'max': '0.5',
            'gamma':  '0.95,1.1,1'
        },
        'LC8_L1T_M': {
            'bands': ['B5','B6','B4'],
            'min': '7000',
            'max': '14000',
            'gamma':  '0.95,1.1,1'
        },
        'LANDSAT/LC08/C01/T1_RT_M': {
            'bands': ['B5','B6','B4'],
            'min': '7000',
            'max': '14000',
            'gamma':  '0.95,1.1,1'
        },
        'S2': {
            'bands': ['B8','B11','B4'],
            'min': '0',
            'max': '3000',
            'gamma':  '0.95,1.1,1'
        },
       'LANDSAT/LT05/C01/T1_S':{
            'bands': ['B4','B5','B3'],
            'min': '0',
            'max': '0.5',
            'gamma': '0.95,1.1,1'
        },
        'LANDSAT/LT05/C01/T1_M':{
            'bands': ['B4','B5','B3'],
            'min': '0',
            'max': '150',
            'gamma': '0.95,1.1,1'
        },
    },
    limites:{
        paisMundial: '1Alw7XqVTqPCgn0uVEx8Iv2wBhJXUSo8Zdvk4Kmot', //todos los paises del mundo
        // --- paises de mesoamerica ---
        // para panama solo se tomara de los paises de todo el mundo
        Colombia : '10Si7ZJCdldPcUWRAeFEkMPR7LsXAkZminsPQdIBC',
        Costa_Rica : '1qgW2GM1-bUKyVU2fOJDFe4qXTR9pf-D4t-WHiYsJ',
        El_Salvador : '1D6dB3QyC4XKEgvKTgJDZBVz8RpfdgqEcJb0jfLoY',
        Guatemala : '1rvhDVla1VZyJYfNBFo3VR7LurOeu0A_C5TZm-uqL',
        Honduras : '1d_9wi_kZGFNc9nJD-P5HmJnx7RKgXgaCWN0qnVIw',
        Mexico : '1SaQNBUAeBVGdYu8CRCgssnWKMSToa9p6kEdROW_H',
        Republica_Dominicana : '17wCLtHQh9oF8ME91hCYXM5lJdxqgjgW3pBzeT3KE',
        Panama_subregiones : '1mx_3oX_w-TV9MpSOHTE1qaRJ464xAlKFfyDGaaEa',
        Republica_Dominicana_subregiones : '1Q1f-kmZY6Y5h_l1eCrpeinoIP_5b07lfP_Ngwymb',
    }
}
var listaClases = [clase1, clase2, clase3]; //lista de nombre de variables de clases que estan disponibles
var nombreLimite;
//funcion que muestra el mosaico, la geometria del pais
function mostrar() {
    var mosaico;
    var limite;
var depa_names =     admin0Select.getValue();
var muni_names =     admin1Select.getValue();
// Area de estudio
var admin00 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var admin0 = admin00.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var studyarea = ee.FeatureCollection([admin0.geometry()]);
var admin11= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var admin1 = admin11.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depa = ee.FeatureCollection(admin1).filter(ee.Filter.inList('ADM1_NAME', [depa_names])); // Country border polygons of high accuracy
var studyarea2 = ee.FeatureCollection([depa.geometry()]);
var admin22= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var admin2 = admin22.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depar = ee.FeatureCollection(admin2).filter(ee.Filter.inList('ADM1_NAME', [depa_names]));
var muni = ee.FeatureCollection(depar).filter(ee.Filter.inList('ADM2_NAME', [muni_names]));
limite = ee.FeatureCollection([muni.geometry()]);  
if (muni_names === null){
  limite = studyarea2;
}
    // console.log(configuracion);
    //---------- se obtiene el limite ----------
    // se obtendra de un ft, de un pais del mundo, de un pais de mesoamerica o una subregion
    // var nombreLimite = configuracion.limite.featureCollection | configuracion.limite.paisMundial | configuracion.limite.paisMesoamerica | configuracion.limite.subRegion; // se obtiene el nombre del limite en orden de aparicion 
    // print(nombreLimite);
/*
    if(configuracion.limite.featureCollection){
        nombreLimite = configuracion.limite.featureCollection;
        limite = ee.FeatureCollection('ft:'+ nombreLimite); 
    }else if(configuracion.limite.paisMundial){
        nombreLimite = configuracion.limite.paisMundial;
        if(configuracion.limite.subRegion){ //si se escribio una sub region entonces tratara de obtener su limite siempre y cuando sea de Dominican Republic o Panama
            // solo existen subregion para republica dominicana y panama
            switch(configuracion.limite.paisMundial){
                case 'Dominican Republic':
                    limite = ee.FeatureCollection('ft:'+ constantes.limites.Republica_Dominicana_subregiones).filterMetadata('name', 'equals', configuracion.limite.subRegion)
                case 'Panama':
                    limite = ee.FeatureCollection('ft:'+ constantes.limites.Panama_subregiones).filterMetadata('name', 'equals', configuracion.limite.subRegion)
                default:
                    limite = ee.FeatureCollection('ft:' + constantes.limites.paisMundial).filterMetadata('name', 'equals', nombreLimite); 
            }
        }else{
            //se obtiene geometria de un pais cualquiera del mundo
            limite = ee.FeatureCollection('ft:' + constantes.limites.paisMundial).filterMetadata('name', 'equals', nombreLimite); 
        }//si no se escribio una subregion solo se toma en cuenta el pais
    }else if(configuracion.limite.paisMesoamerica){
        nombreLimite = configuracion.limite.paisMesoamerica;
        if(configuracion.limite.subRegion){ //si se escribio una sub region entonces tratara de obtener su limite siempre y cuando sea de Dominican Republic o Panama
            // solo existen subregion para republica dominicana y panama
            switch(configuracion.limite.paisMesoamerica){
                case 'Republica_Dominicana':
                    limite = ee.FeatureCollection('ft:'+ constantes.limites.Republica_Dominicana_subregiones).filterMetadata('name', 'equals', configuracion.limite.subRegion);
                    break;
                case 'Panama':
                    limite = ee.FeatureCollection('ft:' +constantes.limites.Panama_subregiones).filterMetadata('name', 'equals', configuracion.limite.subRegion);
                    break;
                default:
                    limite = ee.FeatureCollection('ft:'+ constantes.limites[configuracion.limite.paisMesoamerica]); 
            }
        }else{
            if(configuracion.limite.paisMesoamerica == 'Panama') //aun no se tiene una geometria de panama individual, entonces se carga de los paises del mundo
                limite = ee.featureCollectionection('ft:' + constantes.limites.paisMundial).filterMetadata('name', 'equals', configuracion.limite.paisMundial); 
            else
                limite = ee.FeatureCollection('ft:'+ constantes.limites[configuracion.limite.paisMesoamerica]); 
        }//se obtiene geometria de un pais de mesoamerica
    }
*/
    //---------- se obtiene la coleccion de imagenes con los filtros dados ----------
    var coleccion = ee.ImageCollection(configuracion.mosaico.coleccion) 
        .filterBounds(limite) //se filtra las escenas en el limite dado
        .filterDate(configuracion.mosaico.fechaInicial, configuracion.mosaico.fechaFinal) //se filtra las escenas entre la fecha inicial y final
        .filterMetadata(cloud, 'less_than', configuracion.mosaico.cloudCover) //se filtra por porcentaje de nubosidad
        //.filter(ee.Filter.calendarRange(ee.Number(configuracion.mosaico.diaInicial), configuracion.mosaico.diaFinal));
       /*
        if(coleccion == 'COPERNICUS/S2'){
          print("Hola 3")
        coleccion = ee.ImageCollection(configuracion.mosaico.coleccion) 
        .filterBounds(limite) //se filtra las escenas en el limite dado
        .filterDate(configuracion.mosaico.fechaInicial, configuracion.mosaico.fechaFinal) //se filtra las escenas entre la fecha inicial y final
        .filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'less_than', configuracion.mosaico.cloudCover)
        }
        */
    //---------- se obtiene el mosaico con el metodo seleccionado----------
    if(configuracion.mosaico.metodoMosaico == 'simple_composite'){ //si el metodo elegido es simple composite se usa percentil, cloud cloudScore para obtener el mosaico
        mosaico = ee.Algorithms.Landsat.simpleComposite(coleccion, configuracion.mosaico.percentil, configuracion.mosaico.cloudScore, 40, true).clip(limite);
    }else if(configuracion.mosaico.metodoMosaico == 'mediana'){
        mosaico = coleccion.median().clip(limite)
    }//si el meotodo de mosaico elegido es 'mediana' se usa directamente la mediana
    else if(configuracion.mosaico.metodoMosaico == 'mediana S2'){
      mosaico = coleccion.median().clip(limite)
    }//si el meotodo de mosaico elegido es 'mediana' se usa directamente la mediana
    //---------- se visualiza el mosaico con los parametros dados----------
    Map.centerObject(limite,8);
    Map.addLayer(limite, { color: '81BEF7' }, 'limite', false); //visualizamos el limite
    Map.addLayer(mosaico, {
        'bands': configuracion.parametrosVisualizacion.bands,
        'gamma': configuracion.parametrosVisualizacion.gamma,  
        'min': configuracion.parametrosVisualizacion.min,
        'max': configuracion.parametrosVisualizacion.max,
    }, 'mosaico', false);
    return [limite, mosaico];
}
function clasificar() {
    var limiteMosaico = mostrar();
    var limite = limiteMosaico[0];
    var mosaico = limiteMosaico[1];
    print("limite",limite)
    print("Mosaico",mosaico)
    //la lista de clases disponibles
    var puntosEntrenamiento = ee.FeatureCollection([]); //creamos un feature collection donde se agregaran las clases con las cuales se clasificara
    //se agrega los puntos de las clases con las cuales se clasificara
    configuracion.clases.forEach(function (clase) {
        puntosEntrenamiento= puntosEntrenamiento.merge(listaClases[clase- 1]);
    });
    var claseMinima = configuracion.clases.shift(); //se obtiene la minima clase con la cual se clasificara
    var claseMaxima = configuracion.clases.pop() //se obtiene la maxima clase con la cual se clasificara
    puntosEntrenamiento = puntosEntrenamiento.filterBounds(limite)
    var clasificacionSvm;
    var clasificacionCart;
    var clasificacionRandomForest;
    if(configuracion.parametrosClasificacion.libsvm){
        var muestrasDePixel_svm = mosaico.sampleRegions({
            collection: puntosEntrenamiento,
            properties: ['clase'],
            scale: 30
        });
        var clasificadorSvm = ee.Classifier.libsvm({
          kernelType: 'RBF',
          gamma: configuracion.parametrosClasificacion.gamma, 
          cost: configuracion.parametrosClasificacion.costo 
        });
        //entrenamos el clasificador con las muestras tomadas en la anterior linea
        var clasificadorEntrenadoSvm = clasificadorSvm.train(muestrasDePixel_svm, 'clase');
        clasificacionSvm = mosaico.classify(clasificadorEntrenadoSvm);
    }
    if(configuracion.parametrosClasificacion.smileCart){
        var muestrasDePixel_cart = mosaico.sampleRegions({
            collection: puntosEntrenamiento,
            properties: ['clase'],
            scale: 30
        });
        var clasificadorCart = ee.Classifier.smileCart().train(muestrasDePixel_cart, 'clase');
            clasificacionCart = mosaico.classify(clasificadorCart);
    }
    if(configuracion.parametrosClasificacion.smileRandomForest){
        var muestrasDePixel_RF = mosaico.sampleRegions({
            collection: puntosEntrenamiento,
            properties: ['clase'],
            scale: 30
        });
        var clasificadorRandomForest = ee.Classifier.smileRandomForest(10).train(muestrasDePixel_RF, 'clase');
            clasificacionRandomForest = mosaico.classify(clasificadorRandomForest);
    }
    // se muestran las clasificaciones que seleccion el usuario
    if(clasificacionSvm) 
        Map.addLayer(clasificacionSvm, {
            palette: configuracion.paletaLeyenda[0].slice(claseMinima- 1, claseMaxima),
            min: claseMinima,
            max: claseMaxima,
        }, 'clasificacion svm', false);
    if(clasificacionCart) 
        Map.addLayer(clasificacionCart, {
            palette: configuracion.paletaLeyenda[0].slice(claseMinima- 1, claseMaxima),
            min: claseMinima,
            max: claseMaxima,
        }, 'clasificacion cart', false);
    if(clasificacionRandomForest) 
        Map.addLayer(clasificacionRandomForest, {
            palette: configuracion.paletaLeyenda[0].slice(claseMinima- 1, claseMaxima),
            min: claseMinima,
            max: claseMaxima,
        }, 'clasificacion random forest', false);
}
var elementos = (function() {
    // tipo de limites que se pueden escoger: un id de ft, paises de todo el mundo, o solo paises de mesoamerica
    var tipoLimite = {
        'feature_collection': 'feature_collection',
        'pais_mundial': 'pais_mundial',
        'pais_mesoamerica': 'pais_mesoamerica',
    };
    var paisMesoamerica = { 
      'Colombia' : 'Colombia',
      'Costa_Rica' : 'Costa_Rica',
      'El_Salvador' : 'El_Salvador',
      'Guatemala' : 'Guatemala',
      'Honduras' : 'Honduras',
      'Mexico' : 'Mexico',
      'Panama' : 'Panama',
      'Republica_Dominicana' : 'Republica_Dominicana',
    };
    var coleccion = {
        'LT5_L1T': 'LANDSAT/LT05/C01/T1',
        'LC8_L1T': 'LANDSAT/LC08/C01/T1_RT',
        'S2':'COPERNICUS/S2',
    };
    var metodoMosaico = {
        'mediana': 'mediana',
        'mediana S2': 'mediana S2',
        'simple_composite': 'simple_composite',
    };
    var bandas = {
        'B1': 'B1',
        'B2': 'B2',
        'B3': 'B3',
        'B4': 'B4',
        'B5': 'B5',
        'B6': 'B6',
        'B7': 'B7',
        'B8': 'B8',
        'B9': 'B9',
        'B10': 'B10',
        'B11': 'B11'
    };
    var metodoClasificacion = {
        'svm': 'svm',
        'cart': 'cart',
        'random_forest': 'random_forest',
    };    
    // se inicializa los elementos de interfaz con los parametros del json 'configuracion' en el 'value' de cada elemento
    // el placeholder solo es referencia 
    return {
        // ---------- elementos de limite de trabajo ----------
        textBoxFeatureCollection: ui.Textbox({
            value: configuracion.limite.featureCollection,
            placeholder: '1SaQNBUAeBVGdYu8CRCgssnWKMSToa9p6kEdROW_H',
            style: { width: '100px', }, 
            onChange: function(value) {
                configuracion.limite.featureCollection = value; //si se escribio una cadena vacia igual se asigna ese cadena vacia, deberia volver al valor por defecto inicial, pero para ello deberia haber valores por defecto constantes para la configuracion
            }
        }),
        textBoxPaisMundial: ui.Textbox({
            value: configuracion.limite.paisMundial,
            placeholder: 'Republic Dominican',
            style: { width: '100px', }, 
            onChange: function(value) {
                configuracion.limite.paisMundial = value; //si se escribio una cadena vacia igual se asigna ese cadena vacia, deberia volver al valor por defecto inicial, pero para ello deberia haber valores por defecto constantes para la configuracion
            }
        }),
        selectPaisMesoamerica: ui.Select({
            value: configuracion.limite.paisMesoamerica? configuracion.limite.paisMesoamerica: null,
            placeholder: 'Pais mesoamerica',
            items: Object.keys(paisMesoamerica),
            onChange: function(key) {
                configuracion.limite.paisMesoamerica = paisMesoamerica[key];
            }
        }),
        textBoxSubRegion: ui.Textbox({ 
            value: configuracion.limite.subRegion,
            placeholder: 'Azua',
            style: { width: '100px', }, 
            onChange: function(value) {
                configuracion.limite.subRegion = value; 
            }
        }),
        // ---------- elementos de parametros de mosaico ----------
        selectMetodoMosaico: ui.Select({
            value: configuracion.mosaico.metodoMosaico? configuracion.mosaico.metodoMosaico: null,
            placeholder: 'Metodo mosaico',
            items: Object.keys(metodoMosaico),
            onChange: function(key) {
            configuracion.mosaico.metodoMosaico = metodoMosaico[key]; //se establece el id de pais cuando se modifica el select
                 //---------- obteniendo parametros de visualizacion por defecto----------
                if(configuracion.mosaico.metodoMosaico == 'simple_composite'){ //si se hizo simple composite todos los parametros de visualizacion seran de TOA
                      switch(configuracion.mosaico.coleccion){
                            case 'LANDSAT/LT05/C01/T1':
                            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion["LANDSAT/LT05/C01/T1_S"];
                            break;
                        case 'LANDSAT/LC08/C01/T1_RT':
                            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion.LC8_L1T_S;
                            break;
                    }
                }else if( configuracion.mosaico.metodoMosaico == 'mediana' ){
                    if(configuracion.mosaico.coleccion) //si esta definido una coleccion se obtiene los par. de viz. de tal coleccion
                        configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion[configuracion.mosaico.coleccion+"_M"]; //si se establece una coleccion no definida, existara errores al acceder al json de parametros de viz.
                }
                else if( configuracion.mosaico.metodoMosaico == 'mediana S2' ){
                     switch(configuracion.mosaico.coleccion){
                        case 'COPERNICUS/S2':
                         cloud= "CLOUD_COVERAGE_ASSESSMENT"
                            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion.S2;
                            break;
                }
                }
                // --- se actualiza la interfaz para que muestre los par. de vis. por defecto de la coleccion---
                //se establece al select de banda rojo, amarillo y verde al valor por defecto de par. de vis. de la coleccion escogida
                // print("configuracion",elementos.selectParametrosVisualizacionRojo)
                elementos.selectParametrosVisualizacionRojo.setValue(configuracion.parametrosVisualizacion.bands[0], false); 
                elementos.selectParametrosVisualizacionAmarillo.setValue(configuracion.parametrosVisualizacion.bands[1], false); 
                elementos.selectParametrosVisualizacionVerde.setValue(configuracion.parametrosVisualizacion.bands[2], false); 
                elementos.textBoxGamma.setValue(configuracion.parametrosVisualizacion.gamma, false); 
                elementos.textBoxMin.setValue(configuracion.parametrosVisualizacion.min, false); 
                elementos.textBoxMax.setValue(configuracion.parametrosVisualizacion.max, false); 
            }
        }),
        selectColeccion: ui.Select({
            value: configuracion.mosaico.coleccion? configuracion.mosaico.coleccion: null,
            items: Object.keys(coleccion),
            placeholder: 'Sensor',
            onChange: function(key) {
                configuracion.mosaico.coleccion = coleccion[key]; //se establece el id de pais cuando se modifica el select
               //---------- obteniendo parametros de visualizacion por defecto----------
            }
        }),
        sliderPercentil: ui.Slider({ 
            value: configuracion.mosaico.percentil, min : 0, max : 100, step : 5,
            style: { width: '150px', stretch: 'horizontal'},
            onChange: function(value) {
                configuracion.mosaico.percentil = value;
            }
        }),
        sliderCloudScore: ui.Slider({ 
            value: configuracion.mosaico.cloudScore, min : 0, max : 100, step : 5,
            style: { width: '150px', stretch: 'horizontal'},
            onChange: function(value) {
                configuracion.mosaico.cloudScore = value;
            }
        }),
        textBoxFechaInicial: ui.Textbox({ 
            value: configuracion.mosaico.fechaInicial, 
            placeholder: 'YYYY-MM-DD', 
            style: { width: '90px', },
            onChange: function(value) {
                configuracion.mosaico.fechaInicial = value;
            }
        }),
        textBoxFechaFinal: ui.Textbox({ 
            value: configuracion.mosaico.fechaFinal, 
            placeholder: 'YYYY-MM-DD', 
            style: { width: '90px', },
            onChange: function(value) {
                configuracion.mosaico.fechaFinal = value;
            }
        }),
        textBoxDiaInicial: ui.Textbox({ 
            value: configuracion.mosaico.diaInicial, 
            placeholder: '0', 
            style: { width: '50px', },
            onChange: function(value) {
                configuracion.mosaico.diaInicial = value;
            }
        }),
        textBoxDiaFinal: ui.Textbox({ 
            value: configuracion.mosaico.diaFinal, 
            placeholder: '0', 
            style: { width: '50px', }, 
            onChange: function(value) {
                configuracion.mosaico.diaFinal = value;
            }
        }),
        sliderCloudCover: ui.Slider({ 
            value: configuracion.mosaico.cloudCover, min : 0, max : 100, step : 5,
            style: { width: '150px', stretch: 'horizontal'},
            onChange: function(value) {
                configuracion.mosaico.cloudCover = value;
            }
        }),
        // ---------- opciones de visualizacion ----------
        selectParametrosVisualizacionRojo: ui.Select({
            value: configuracion.parametrosVisualizacion.bands[0]? configuracion.parametrosVisualizacion.bands[0]: null, 
            placeholder: 'R',
            items: Object.keys(bandas),
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[0] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionAmarillo: ui.Select({
            value: configuracion.parametrosVisualizacion.bands[1]? configuracion.parametrosVisualizacion.bands[1]: null, 
            placeholder: 'G',
            items: Object.keys(bandas),
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[1] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionVerde: ui.Select({
            value: configuracion.parametrosVisualizacion.bands[2]? configuracion.parametrosVisualizacion.bands[2]: null, 
            placeholder: 'B',
            items: Object.keys(bandas),
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[2] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxGamma: ui.Textbox({ 
            value: configuracion.parametrosVisualizacion.gamma, 
            placeholder: '0,0,0',
            style: { width: '100px', }, 
            onChange: function(value) {
                configuracion.parametrosVisualizacion.gamma = value; //se establece el id de pais cuando se modifica el select
            } 
        }),
        textBoxMin: ui.Textbox({ 
            value: configuracion.parametrosVisualizacion.min, 
            placeholder: '0',
            style: { width: '50px', }, 
            onChange: function(value) {
                configuracion.parametrosVisualizacion.min = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxMax: ui.Textbox({ 
            value: configuracion.parametrosVisualizacion.max, 
            placeholder: '0',
            style: { width: '50px', }, 
            onChange: function(value) {
                configuracion.parametrosVisualizacion.max = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        checkboxSvm:ui.Checkbox({ label: "Svm", value: false, onChange: function(checked) {
            configuracion.parametrosClasificacion.libsvm = checked? 1: 0;
            // si se habilita svm tbn se habilita establecer gamma y costo
            elementos.textBoxParametrosClasificacionGamma.setDisabled(!checked); 
            elementos.textBoxParametrosClasificacionCosto.setDisabled(!checked);
        }}),
        checkboxCart:ui.Checkbox({ label: "Cart", value: false, onChange: function(checked) {
            configuracion.parametrosClasificacion.smileCart = checked? 1: 0;
        }}),
        checkboxRandomForest:ui.Checkbox({ label: "Random forest", value: false, onChange: function(checked) {
            configuracion.parametrosClasificacion.smileRandomForest = checked? 1: 0;
        }}),
        selectParametrosClasificacionMetodo: ui.Select({
            items: Object.keys(metodoClasificacion),
            placeholder: 'Metodo clasificacion',
            onChange: function(key) {
                configuracion.parametrosClasificacion.metodo = metodoClasificacion[key]; //se establece el id de pais cuando se modifica el select
                // si metodo de class. no es svm se desahabilita gamma y costo
                elementos.textBoxParametrosClasificacionGamma.setDisabled(key != 'svm'? true: false);
                elementos.textBoxParametrosClasificacionCosto.setDisabled(key != 'svm'? true: false);
            }
        }),
        textBoxParametrosClasificacionGamma: ui.Textbox({ placeholder: configuracion.parametrosClasificacion.gamma, style: { width: '90px', }, disabled: true, 
            onChange: function(value) {
                if(value!== true && value!== false)
                    configuracion.parametrosClasificacion.gamma = parseFloat(value); //se convierte a float el valor ingresado porque el mismo es string
            } 
        }),
        textBoxParametrosClasificacionCosto: ui.Textbox({ placeholder: configuracion.parametrosClasificacion.costo, style: { width: '70px', }, disabled: true, 
            onChange: function(value) {
                if(value!== true && value!== false)
                    configuracion.parametrosClasificacion.costo = parseFloat(value); //se convierte a float el valor ingresado porque el mismo es string
            }
        }),
        checkboxClase1:ui.Checkbox({ value: false, style: { margin: '0 0 8px 0'} }),
        checkboxClase2:ui.Checkbox({ value: false, style: { margin: '0 0 8px 0'} }),
        checkboxClase3:ui.Checkbox({ value: false, style: { margin: '0 0 8px 0'} }),
        // ---------- botones ----------
        buttonMostrar: ui.Button({ label: 'Mostrar layers', style: { fontWeight: 'bold' },
            onClick: function(argument) {
                Map.clear();    
                mostrar();
                //clasificar();
            }
        }),
        buttonClasificar: ui.Button({
            label: 'Clasificar',
            style: { fontWeight: 'bold' },
            onClick: function(argument) {
                // console.log(configuracion);
                configuracion.clases = [];
                //iteramos sobre todos los checkbox de clase para ver con cuales se clasificara
                for(var i = 1; i<= 3; i++)
                    if(elementos['checkboxClase'+ i].getValue()) //verificamos si la clase se checkeo
                        configuracion.clases.push(i); //agregamos la clase para clasificar
                Map.layers().reset();
                mostrar();
                clasificar();
            }
        }),
        buttonDescargarParametros: ui.Button({ label: 'Descargar parametros', style: { fontWeight: 'bold' },
            onClick: function(argument) {
                // --- mostrando parametros de mosaico como json string ---
                var parametrosMosaico = JSON.stringify(configuracion);
                print("------ parametros de mosaico ------");
                print(parametrosMosaico);
                var fechaActual = new Date();
                var parametros = ee.FeatureCollection( ee.Feature(null, {
                    'hora_descarga': fechaActual.toString(),
                    'json': parametrosMosaico,
                    'featureCollection': configuracion.limite.featureCollection,
                    'paisMundial': configuracion.limite.paisMundial,
                    'paisMesoamerica': configuracion.limite.paisMesoamerica,
                    'subRegion': configuracion.limite.subRegion,
                    'metodoMosaico': configuracion.mosaico.metodoMosaico,
                    'coleccion': configuracion.mosaico.coleccion,
                    'cloudCover': configuracion.mosaico.cloudCover,
                    'fechaInicial': configuracion.mosaico.fechaInicial,
                    'fechaFinal': configuracion.mosaico.fechaFinal,
                    'diaInicial': configuracion.mosaico.diaInicial,
                    'diaFinal': configuracion.mosaico.diaFinal,
                    'percentil': configuracion.mosaico.percentil,
                    'cloudScore': configuracion.mosaico.cloudScore,
                 }));
                //exportamos como tabla la feature collection de metadatos de la imagen
                Export.table.toDrive({
                    collection: parametros,
                    description: 'parametros_' + nombreLimite + '_'+ fechaActual.getFullYear()+ '_'+ (fechaActual.getMonth()+ 1)+ '_'+ fechaActual.getDate(),
                    fileNamePrefix: 'parametros_' + nombreLimite + '_'+ fechaActual.getFullYear()+ '_'+ (fechaActual.getMonth()+ 1)+ '_'+ fechaActual.getDate(),
                    fileFormat: 'CSV'
                });
            }
        }),
    };
})();
var paneles = {
    /*
    limite: ui.Panel([
        ui.Label('ft:'),
        elementos.textBoxFeatureCollection,
        ui.Label('Pais del mundo:'),
        elementos.textBoxPaisMundial,
        ui.Label('Pais mesoamerica:'),
        elementos.selectPaisMesoamerica ,
        ui.Label('Sub region:'),
        elementos.textBoxSubRegion ,
    ]),
    */ 
    clases: ui.Panel(),
    coleccion: ui.Panel([
        ui.Label('Coleccion de Datos:'),
        elementos.selectColeccion,
            ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    metodoMosaico: ui.Panel([
        ui.Label('Método Mosaico:'),
        elementos.selectMetodoMosaico,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaicoPercentil: ui.Panel([
        ui.Label('Iluminación:'),
        elementos.sliderPercentil,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaicoCloudScore: ui.Panel([
        ui.Label('% Nube Pixel:'),
        elementos.sliderCloudScore,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1Fecha: ui.Panel([
        ui.Label('Inicio:'),
        elementos.textBoxFechaInicial,
        ui.Label('Final:'),
        elementos.textBoxFechaFinal,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1Dia: ui.Panel([
        ui.Label('Dia inicial:'),
        elementos.textBoxDiaInicial,
        ui.Label('Dia final:'),
        elementos.textBoxDiaFinal,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1FiltroNubes: ui.Panel([
        ui.Label('% Nube (Escena):'),
        elementos.sliderCloudCover,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1ParametrosVisualizacionRojoAmarilloVerde: ui.Panel([
        ui.Label('Bandas:'),
        elementos.selectParametrosVisualizacionRojo,
        elementos.selectParametrosVisualizacionAmarillo,
        elementos.selectParametrosVisualizacionVerde,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1ParametrosVisualizacionGamma: ui.Panel([
        ui.Label('Gamma:'),
        elementos.textBoxGamma,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    mosaico1ParametrosVisualizacionMinMax: ui.Panel([
        ui.Label('Min:'),
        elementos.textBoxMin,
        ui.Label('Max:'),
        elementos.textBoxMax,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    /*
    botones: ui.Panel([
        elementos.buttonMostrar,
        //elementos.buttonDescargarParametros
    ], ui.Panel.Layout.flow('horizontal')),
    */
    parametrosClasificacionMetodo: ui.Panel([
        ui.Label('Metodo:'),
        elementos.checkboxSvm,
        elementos.checkboxCart,
        elementos.checkboxRandomForest,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosClasificacionGammaCosto: ui.Panel([
        ui.Label('Gamma:'),
        elementos.textBoxParametrosClasificacionGamma,
        ui.Label('Costo:'),
        elementos.textBoxParametrosClasificacionCosto,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    botones: ui.Panel([
        elementos.buttonMostrar,
        //elementos.buttonClasificar,
    ], ui.Panel.Layout.flow('horizontal')),
    botones2: ui.Panel([
        //elementos.buttonMostrar,
        elementos.buttonClasificar,
    ], ui.Panel.Layout.flow('horizontal')),
}
// Creates and styles 1 row of the leyenda.
var makeRow = function(color, name, indice) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
        style: {
            backgroundColor: '#' + color,
            padding: '8px',
            margin: '0 0 0 4px'
        }
    });
    // Create the label filled with the description text.
    var description = ui.Label({ value: name, style: { margin: '0 0 0 4px'} });
    return ui.Panel({
        widgets: [ elementos['checkboxClase'+ (indice+1)], description ,colorBox],
        layout: ui.Panel.Layout.Flow('horizontal')
    });
};
//creamos la leyenda en base a configuracion.paletaLeyenda
configuracion.paletaLeyenda[0].forEach(function(color, indice) {
    paneles.clases.add(makeRow(color, configuracion.paletaLeyenda[1][indice], indice))
})
var panelPrincipal = ui.Panel({
    widgets: [
        ui.Label({
            value: 'Data-Spatial Analysis',
            style: {
                fontWeight: 'bold',
                fontSize: '20px',
                margin: '5px 5px',
                textAlign: 'center'
            }
        }),
        ui.Label({
            value: 'Análisis espacial y detección remota para el aprendizaje automático en el uso del suelo / cobertura del suelo en Google Earth Engine',
            style: {
                //fontWeight: 'bold',
                fontSize: '12px',
                margin: '5px 5px',
                textAlign: 'left'
            }
        }),        
        ui.Label('1) Área de Estudio', {fontWeight: 'bold',fontSize: '15px'}),
        //paneles.limite,
        dropdownPanel,
        ui.Label('2) Parametros de mosaico', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.coleccion,
        paneles.metodoMosaico,
        paneles.mosaico1FiltroNubes,
        ui.Label('Parametros simple composite', {fontWeight: 'bold', fontSize: '13px', textAlign: 'center'}),
        paneles.mosaicoPercentil,
        paneles.mosaicoCloudScore,
        ui.Label('Rango de Fecha', {fontWeight: 'bold', fontSize: '13px', textAlign: 'center'}),
        paneles.mosaico1Fecha,
        paneles.mosaico1Dia,
        ui.Label('3) Parámetros de visualizacion', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.mosaico1ParametrosVisualizacionRojoAmarilloVerde,
        paneles.mosaico1ParametrosVisualizacionGamma,
        paneles.mosaico1ParametrosVisualizacionMinMax,
        paneles.botones,
        ui.Label('4) Parámetros de Clasificación', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.parametrosClasificacionMetodo,
        paneles.parametrosClasificacionGammaCosto,
        ui.Label('3) Definición de Clases', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.clases,
        paneles.botones2,
    ],
    style: {
        width: '340px',
        padding: '8px'
    }
});
ui.root.insert(0, panelPrincipal);
// inicializarInterfaz();