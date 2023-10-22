var Bosque_Estable = ui.import && ui.import("Bosque_Estable", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -80.33203125,
            4.2441604509926565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.4662879742682,
            19.520774603238404
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 1
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-80.33203125, 4.2441604509926565]),
            {
              "clase": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.4662879742682, 19.520774603238404]),
            {
              "clase": 1,
              "system:index": "1"
            })]),
    No_Bosque_Estable = ui.import && ui.import("No_Bosque_Estable", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -80.68359375,
            2.928411920192264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -71.5923866070807,
            18.445550419203695
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 2
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-80.68359375, 2.928411920192264]),
            {
              "clase": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-71.5923866070807, 18.445550419203695]),
            {
              "clase": 2,
              "system:index": "1"
            })]),
    Deforestacion = ui.import && ui.import("Deforestacion", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -80.15625,
            2.1381756378402463
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "clase": 3
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-80.15625, 2.1381756378402463]),
            {
              "clase": 3,
              "system:index": "0"
            })]);
var configuracion = {
    // --- solo se toma en cuenta el limite configurado con cadena no vacia ---
    'limite': {
    },'mosaico': {
    },
     'mosaico2': {
    },
    parametrosVisualizacion: {
        'bands': ['','',''],
        'gamma': '',
        'min': '',
        'max': '',
    },
    parametrosVisualizacion2: {
        'bands': ['','',''],
        'gamma': '',
        'min': '',
        'max': '',
    },
    parametrosClasificacion: {
        'cart': 0,
        'randomForest': 0,
        'svm': 0,
        'metodo': 'cart',
        'metodo': 'cart',
        'gamma': 0.5,
        'costo': 0.25,
    },
};
var constantes = {
    parametrosVisualizacion: {
       'landsat5':{
            'bands': ['B5','B4','B3'],
            'min': '0',
            'max': '0.5',
            'gamma': '0.95,1.1,1'
        },
       'landsat8': {
            'bands': ['B6','B5','B4'],
            'min': '0',
            'max': '0.5',
            'gamma':  '0.95,1.1,1'
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
var nombreLimite;
function obtenerMosaico() {
    var mosaico;
    var mosaico2;
    var limite;
      // console.log(configuracion);
    //---------- se obtiene el limite ----------
    // se obtendra de un ft, de un pais del mundo, de un pais de mesoamerica o una subregion
    // var nombreLimite = configuracion.limite.featureCollection | configuracion.limite.paisMundial | configuracion.limite.paisMesoamerica | configuracion.limite.subRegion; // se obtiene el nombre del limite en orden de aparicion
    // print(nombreLimite);
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
    //---------- se obtiene la coleccion de imagenes con los filtros dados ----------
    var coleccion = ee.ImageCollection(configuracion.mosaico.coleccion)
        .filterBounds(limite) //se filtra las escenas en el pais dado
        .filterDate(configuracion.mosaico.fechaInicial, configuracion.mosaico.fechaFinal) //se filtra las escenas entre la fecha inicial y final
        .filterMetadata('CLOUD_COVER', 'less_than', configuracion.mosaico.cloudCover) //se filtra por porcentaje de nubosidad
            if(configuracion.mosaico.diaInicial && configuracion.mosaico.diaFinal)
        coleccion = coleccion.filter(ee.Filter.calendarRange(parseInt(configuracion.mosaico.diaInicial), parseInt(configuracion.mosaico.diaFinal)));
    //---------- se obtiene el mosaico con el metodo seleccionado----------
    if(configuracion.mosaico.metodoMosaico == 'simple_composite'){ //si el metodo elegido es simple composite se usa percentil, cloud cloudScore para obtener el mosaico
        mosaico = ee.Algorithms.Landsat.simpleComposite(coleccion, configuracion.mosaico.percentil, configuracion.mosaico.cloudScore, 40, true).clip(limite);
    }else if(configuracion.mosaico.metodoMosaico == 'mediana'){
        mosaico = coleccion.median().clip(limite)
    }//si el meotodo de mosaico elegido es 'mediana' se usa directamente la mediana
    //---------- se obtiene la coleccion de imagenes con los filtros dados Mosaico2----------
    var coleccion2 = ee.ImageCollection(configuracion.mosaico2.coleccion)
        .filterBounds(limite) //se filtra las escenas en el pais dado
        .filterDate(configuracion.mosaico2.fechaInicial, configuracion.mosaico2.fechaFinal) //se filtra las escenas entre la fecha inicial y final
        .filterMetadata('CLOUD_COVER', 'less_than', configuracion.mosaico2.cloudCover) //se filtra por porcentaje de nubosidad
        if(configuracion.mosaico2.diaInicial && configuracion.mosaico2.diaFinal)
        coleccion2 = coleccion2.filter(ee.Filter.calendarRange(parseInt(configuracion.mosaico2.diaInicial), parseInt(configuracion.mosaico2.diaFinal)));
    //---------- se obtiene el mosaico con el metodo seleccionado----------
    if(configuracion.mosaico2.metodoMosaico == 'simple_composite'){ //si el metodo elegido es simple composite se usa percentil, cloud cloudScore para obtener el mosaico
        mosaico2 = ee.Algorithms.Landsat.simpleComposite(coleccion2, configuracion.mosaico2.percentil, configuracion.mosaico2.cloudScore, 40, true).clip(limite);
    }else if(configuracion.mosaico2.metodoMosaico == 'mediana'){
        mosaico2 = coleccion2.median().clip(limite)
    }//si el meotodo de mosaico elegido es 'mediana' se usa directamente la mediana
    //---------- se visualiza los mosaicos con los parametros dados----------
    return [limite, mosaico, mosaico2];
}
//funcion que muestra el mosaico, la geometria del pais
function mostrarLayers() {
    var paisMosaico = obtenerMosaico();
    var pais = paisMosaico[0];
    var mosaico = paisMosaico[1];
    var mosaico2 = paisMosaico[2];
    //---------- se visualiza el mosaico con los parametros dados----------
    Map.centerObject(pais,8);
     //mostrar mosaicos
    Map.addLayer(pais, { color: '81BEF7' }, 'limite', true)
    Map.addLayer(mosaico, configuracion.parametrosVisualizacion, 'mosaico', false);
    Map.addLayer(mosaico2, configuracion.parametrosVisualizacion2, 'mosaico2', false);
}
function clasificar() {
    var paisMosaico = obtenerMosaico();
    var pais = paisMosaico[0];
    var mosaico = paisMosaico[1];
    var mosaico2 = paisMosaico[2];
    //Enparejamiento de bandas
    var my_band_names = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    var l7 = function(image) {
    return image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1','B7'], my_band_names);};
    var l8 = function(image) {
        return image.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'], my_band_names);
    };
    var m_a1 = mosaico;//1996
    var m_a2 = mosaico2;//l7(2006)
    //mosaico Uno
    if (configuracion.mosaico.coleccion==='LC8_L1T'){
      m_a1 = l8(m_a1);//l8(m1)
    }
    if (configuracion.mosaico.coleccion==='LE7_L1T'){
      m_a1 = l7(m_a1);//l7(m1)
    }
    //mosaico Dos
    if (configuracion.mosaico2.coleccion==='LC8_L1T'){
      m_a2 = l8(m_a2);//l8(m2)
    }
    if (configuracion.mosaico2.coleccion==='LE7_L1T'){
      m_a2 = l7(m_a2);//l7(m2)
    }
    //Create image ratio bands
    var rat45_a1 = m_a1.select("B4").divide(m_a1.select("B5"));
    var rat46_a1 = m_a1.select("B4").divide(m_a1.select("B6"));
    var rat47_a1 = m_a1.select("B4").divide(m_a1.select("B7"));
    var rat56_a1 = m_a1.select("B5").divide(m_a1.select("B6"));
    var rat57_a1 = m_a1.select("B5").divide(m_a1.select("B7"));
    var rat67_a1 = m_a1.select("B6").divide(m_a1.select("B7"));
    var rat45_a2 = m_a2.select("B4").divide(m_a2.select("B5"));
    var rat46_a2 = m_a2.select("B4").divide(m_a2.select("B6"));
    var rat47_a2 = m_a2.select("B4").divide(m_a2.select("B7"));
    var rat56_a2 = m_a2.select("B5").divide(m_a2.select("B6"));
    var rat57_a2 = m_a2.select("B5").divide(m_a2.select("B7"));
    var rat67_a2 = m_a2.select("B6").divide(m_a2.select("B7"));
    //Agregando las Bandas de Ratio
    var m_a1_rat = m_a1.addBands(rat45_a1).addBands(rat46_a1).addBands(rat47_a1).addBands(rat56_a1).addBands(rat57_a1).addBands(rat67_a1);
    var m_a2_rat = m_a2.addBands(rat45_a2).addBands(rat46_a2).addBands(rat47_a2).addBands(rat56_a2).addBands(rat57_a2).addBands(rat67_a2);
    var mosaico12 = m_a1_rat.addBands(m_a2_rat);
    //la lista de clases disponibles
    var puntosEntrenamiento = (Bosque_Estable.merge(No_Bosque_Estable)).merge(Deforestacion); //creamos un feature collection donde se agregaran las clases con las cuales se clasificara   
    puntosEntrenamiento = puntosEntrenamiento.filterBounds(pais)
    //print(puntosEntrenamiento);
    switch(configuracion.parametrosClasificacion.metodo){
        case 'svm':
            var muestrasDePixel = mosaico12.sampleRegions({
                collection: puntosEntrenamiento,
                properties: ['clase'],
                scale: 100
            });
            var clasificador = ee.Classifier.svm({
              kernelType: 'RBF',
              gamma: configuracion.parametrosClasificacion.gamma,
              cost: configuracion.parametrosClasificacion.costo
            });
            //entrenamos el clasificador con las muestras tomadas en la anterior linea
            var clasificadorEntrenado = clasificador.train(muestrasDePixel, 'clase');
            var clasificacion = mosaico12.classify(clasificadorEntrenado);
            break;
        case 'cart':
            var clasificador = mosaico12.trainClassifier({
                'training_features': puntosEntrenamiento,
                'training_property': 'clase',
                'classifier_name': 'Cart',
                'crs': 'EPSG:4326',
                'crs_transform': [0.0002694945852358564, 0, -180, 0, -0.0002694945852358564, 90],
            });
            var clasificacion = mosaico12.classify(clasificador);
            break;
        case 'random_forest':
             var muestrasDePixel = mosaico12.sampleRegions({
                   collection: puntosEntrenamiento,
                  properties: ['clase'],
                  scale: 30
              });
              var clasificadorRandomForest = ee.Classifier.randomForest(3).train(muestrasDePixel, 'clase');
              var clasificacion = mosaico12.classify(clasificadorRandomForest);
            break;
    }
     Map.addLayer(clasificacion, { palette: '29761D,F0F01D,F01D24', min:1, max: 3, }, 'clasificacion', false);
     return (clasificacion);
}
var elementos = (function() {
    var coleccion = {
        'LT5_L1T': 'LT5_L1T',
        'LE7_L1T': 'LE7_L1T',
        'LC8_L1T': 'LC8_L1T',
    };
    var metodoMosaico = {
        'mediana': 'mediana',
        'simple_composite': 'simple_composite',
    };
    var bandas = {
        'B1': 'B1',
        'B2': 'B2',
        'B3': 'B3',
        'B4': 'B4',
        'B5': 'B5',
        'B6': 'B6',
    };
    var metodoClasificacion = {
        'svm': 'svm',
        'cart': 'cart',
        'random_forest': 'random_forest',
    };
/**/
    return {
        textBoxParametrosMosaico: ui.Textbox({style: { width: '200px', },
            onChange: function(value) {
                var configuracionParametrosMosaico = JSON.parse(value); //se deserializa la configuracion de parametros de mosaico
                //asignamos los parametros obtenidos de la serializacion a la configuracion mosaico de la clasificacion
                configuracion.limite = configuracionParametrosMosaico.limite;
                configuracion.mosaico = configuracionParametrosMosaico.mosaico;
                configuracion.parametrosVisualizacion = configuracionParametrosMosaico.parametrosVisualizacion;
                configuracion.mosaico2 = configuracionParametrosMosaico.mosaico2;
                configuracion.parametrosVisualizacion2 = configuracionParametrosMosaico.parametrosVisualizacion2;
                // --- se actualiza la interfaz para que muestre los par. de vis. que se cargaron ---
                elementos.selectParametrosVisualizacionRojo.setPlaceholder(configuracion.parametrosVisualizacion.bands[0], false);
                elementos.selectParametrosVisualizacionAmarillo.setPlaceholder(configuracion.parametrosVisualizacion.bands[1], false);
                elementos.selectParametrosVisualizacionVerde.setPlaceholder(configuracion.parametrosVisualizacion.bands[2], false);
                elementos.textBoxGamma.setPlaceholder(configuracion.parametrosVisualizacion.gamma, false);
                elementos.textBoxMin.setPlaceholder(configuracion.parametrosVisualizacion.min, false);
                elementos.textBoxMax.setPlaceholder(configuracion.parametrosVisualizacion.max, false);
                 // --- se actualiza la interfaz para que muestre los par. de vis. que se cargaron del m,osaico 2 ---
                elementos.selectParametrosVisualizacionRojo2.setPlaceholder(configuracion.parametrosVisualizacion2.bands[0], false);
                elementos.selectParametrosVisualizacionAmarillo2.setPlaceholder(configuracion.parametrosVisualizacion2.bands[1], false);
                elementos.selectParametrosVisualizacionVerde2.setPlaceholder(configuracion.parametrosVisualizacion2.bands[2], false);
                elementos.textBoxGamma2.setPlaceholder(configuracion.parametrosVisualizacion2.gamma, false);
                elementos.textBoxMin2.setPlaceholder(configuracion.parametrosVisualizacion2.min, false);
                elementos.textBoxMax2.setPlaceholder(configuracion.parametrosVisualizacion2.max, false);
            }
        }),
        // ---------- opciones de visualizacion ----------
        selectParametrosVisualizacionRojo: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'R',
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[0] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionAmarillo: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'G',
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[1] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionVerde: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'B',
            onChange: function(key) {
                configuracion.parametrosVisualizacion.bands[2] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxGamma: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat8.gamma, style: { width: '90px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion.gamma = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxMin: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat8.min, style: { width: '70px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion.min = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxMax: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat8.max, style: { width: '70px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion.max = value; //se establece el id de pais cuando se modifica el select
            }
        }),
         // ---------- opciones de visualizacion 2 ----------
        selectParametrosVisualizacionRojo2: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'R',
            onChange: function(key) {
                configuracion.parametrosVisualizacion2.bands[0] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionAmarillo2: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'G',
            onChange: function(key) {
                configuracion.parametrosVisualizacion2.bands[1] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        selectParametrosVisualizacionVerde2: ui.Select({
            items: Object.keys(bandas),
            placeholder: 'B',
            onChange: function(key) {
                configuracion.parametrosVisualizacion2.bands[2] = bandas[key]; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxGamma2: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat5.gamma, style: { width: '90px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion2.gamma = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxMin2: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat5.min, style: { width: '70px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion2.min = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        textBoxMax2: ui.Textbox({ placeholder: constantes.parametrosVisualizacion.landsat5.max, style: { width: '70px', },
            onChange: function(value) {
                configuracion.parametrosVisualizacion2.max = value; //se establece el id de pais cuando se modifica el select
            }
        }),
        /*Clasificacion*/
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
        // ---------- botones ----------
        buttonMostrarLayers: ui.Button({ label: 'Mostrar layers', style: { fontWeight: 'bold' },
            onClick: function(argument) {
                Map.clear();
                console.log(configuracion)
                mostrarLayers();
            }
        }),
        buttonClasificar: ui.Button({
            label: 'Clasificar',
            style: { fontWeight: 'bold' },
            onClick: function(argument) {                              
                Map.layers().reset();
                mostrarLayers();
                var clasificacion=clasificar();
            }
        }),
        buttonDescargarImagenes: ui.Button({
            label: 'Descargar Imagenes',
            style: { fontWeight: 'bold' },
            onClick: function(argument) {                              
                var paisMosaico = obtenerMosaico();
                var pais = paisMosaico[0];
                var mosaico = paisMosaico[1];
                var mosaico2 = paisMosaico[2];
                var clasificacion=clasificar();
                Export.image.toDrive({
                    image: mosaico.select(['B3', 'B4', 'B5']),
                    description: 'Mosaico1',
                    fileNamePrefix: 'Mosaico',
                    scale:30,
                    maxPixels: 1e12,
                });
                 Export.image.toDrive({
                    image: mosaico2.select(['B3', 'B4', 'B5']),
                    description: 'Mosaico2',
                    fileNamePrefix: 'Mosaico2',
                    scale:30,
                    maxPixels: 1e12,
                });
                  Export.image.toDrive({
                    image: clasificacion,
                    description: 'Clasificacion',
                    fileNamePrefix: 'Clasificacion',
                    maxPixels: 1e12,
                });
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
                    'pais': configuracion.pais,
                    'coleccion': configuracion.mosaico.coleccion,
                    'fechaInicial': configuracion.mosaico.fechaInicial,
                    'fechaFinal': configuracion.mosaico.fechaFinal,
                    'diaInicial': configuracion.mosaico.diaInicial,
                    'diaFinal': configuracion.mosaico.diaFinal,
                    'percentil': configuracion.mosaico.percentil,
                    'cloudScore': configuracion.mosaico.cloudScore,
                    /*mosaico2*/
                    'coleccion2': configuracion.mosaico2.coleccion,
                    'fechaInicial2': configuracion.mosaico2.fechaInicial,
                    'fechaFinal2': configuracion.mosaico2.fechaFinal,
                    'diaInicial2': configuracion.mosaico2.diaInicial,
                    'diaFinal2': configuracion.mosaico2.diaFinal,
                    'percentil2': configuracion.mosaico2.percentil,
                    'cloudScore2': configuracion.mosaico2.cloudScore,
                 }));
                //exportamos como tabla la feature collection de metadatos de la imagen
                Export.table.toDrive({
                    collection: parametros,
                    description: 'parametros_' + configuracion.pais+ '_'+ fechaActual.getFullYear()+ '_'+ (fechaActual.getMonth()+ 1)+ '_'+ fechaActual.getDate(),
                    fileNamePrefix: 'parametros_' + 'parametros_' + configuracion.pais+ '_'+ fechaActual.getFullYear()+ '_'+ (fechaActual.getMonth()+ 1)+ '_'+ fechaActual.getDate(),
                    fileFormat: 'CSV'
                });
            }
        }),
    };
})();
var paneles = {
    clases: ui.Panel(),
    parametrosVisualizacionRojoAmarilloVerde: ui.Panel([
        ui.Label('Bandas:'),
        elementos.selectParametrosVisualizacionRojo,
        elementos.selectParametrosVisualizacionAmarillo,
        elementos.selectParametrosVisualizacionVerde,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosVisualizacionGamma: ui.Panel([
        ui.Label('Gamma:'),
        elementos.textBoxGamma,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosVisualizacionMinMax: ui.Panel([
        ui.Label('Min:'),
        elementos.textBoxMin,
        ui.Label('Max:'),
        elementos.textBoxMax,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosVisualizacionRojoAmarilloVerde2: ui.Panel([
        ui.Label('Bandas:'),
        elementos.selectParametrosVisualizacionRojo2,
        elementos.selectParametrosVisualizacionAmarillo2,
        elementos.selectParametrosVisualizacionVerde2,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosVisualizacionGamma2: ui.Panel([
        ui.Label('Gamma:'),
        elementos.textBoxGamma2,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosVisualizacionMinMax2: ui.Panel([
        ui.Label('Min:'),
        elementos.textBoxMin2,
        ui.Label('Max:'),
        elementos.textBoxMax2,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosClasificacionMetodo: ui.Panel([
        ui.Label('Metodo:'),
        elementos.selectParametrosClasificacionMetodo,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    parametrosClasificacionGammaCosto: ui.Panel([
        ui.Label('Gamma:'),
        elementos.textBoxParametrosClasificacionGamma,
        ui.Label('Costo:'),
        elementos.textBoxParametrosClasificacionCosto,
    ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px'}),
    botones: ui.Panel([
        elementos.buttonMostrarLayers,
        elementos.buttonClasificar,
        elementos.buttonDescargarParametros
    ], ui.Panel.Layout.flow('horizontal'))
}
/*leyenda*/
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 8px'
  }
});
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var colores =  [
 {color: '2EFE2E', texto : 'Bosque Estable'}, //clase 6
 {color: 'F2DA05', texto : 'No Bosque Estable'}, //clase 11
 {color: 'DF0101', texto : 'Deforestacion'}, //clase 5
 ];
colores.forEach(function (valor, index) {
  legend.add(makeRow(valor.color, valor.texto))
  // body...
})
var panelPrincipal = ui.Panel({
    widgets: [
        ui.Label({
            value: 'Deforestacion para un periodo de análisis',
            style: { fontWeight: 'bold',  fontSize: '20px', margin: '5px 5px', textAlign: 'center' }
        }),
        ui.Label('1) Parametros mosaicos', {fontWeight: 'bold',fontSize: '15px'}),
        elementos.textBoxParametrosMosaico,
        ui.Label('2) Parametros visualizacion mosaico 1', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.parametrosVisualizacionRojoAmarilloVerde,
        paneles.parametrosVisualizacionGamma,
        paneles.parametrosVisualizacionMinMax,
        ui.Label('3) Parametros visualizacion mosaico 2', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.parametrosVisualizacionRojoAmarilloVerde2,
        paneles.parametrosVisualizacionGamma2,
        paneles.parametrosVisualizacionMinMax2,
        ui.Label('4) Parametros de clasificacion', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.parametrosClasificacionMetodo,
        paneles.parametrosClasificacionGammaCosto,
        ui.Label('5) Visualizacion y Descargas', { fontWeight: 'bold', fontSize: '15px'}),
        paneles.botones,
        ui.Label('6) Descarga de Resultados', { fontWeight: 'bold', fontSize: '15px'}),
        elementos.buttonDescargarImagenes,
        ui.Label('7) Leyenda', { fontWeight: 'bold', fontSize: '15px'}),
        legend,
    ],
    style: {
        width: '340px',
        padding: '8px'
    }
});
ui.root.insert(0, panelPrincipal);