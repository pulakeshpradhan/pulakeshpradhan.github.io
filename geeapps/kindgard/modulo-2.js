var utils = require('users/kindgard/geoFRA:common/utils.js'),
  variables = require('users/kindgard/geoFRA:common/variables.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js');
/*var configuracion = {
  country: null, //'Burundi'
  periodoDeTrabajo: null, //opciones: 2000-2010, 2010-2016
  firstYear: 2000,
  secondYear: 2010,
  thirdYear: 2016,
  ownMapId: null, //'users/debcysjec/mapa_desacuerdo' id de raster en asset que representa mapa de cambios de usuario 
    coverPixelValues: null, //lista valores de pixel que representan mapa de cambios ingresado por el usuario, tendra el formato [1,2,3,...]
  porcentajeCoberturaBosqueModis: 50,
  mosaico: {
    fuenteDeImagenes: null, //'LC8_L1T'
    fechaInicial: null, //'2016-01-01'
    fechaFinal: null, //'2016-12-31'
    percentil: null,
      cloudScore: null,
  },
  parametrosVisualizacion: {
      bandasAVisualizar: [null, null, null],
      gamma: null,
      min: null,
      max: null,
    }
};*/
var configuracion = {
  titulo_de_tabla: 'Perdida de bosque', //titulo de la tabla de exportacion de superficies
  informacion_adicional_de_tabla: 'Scripts FRA-online Beta', //informacion adicional que contendra la tabla de superficies a exportar
  country: '',
  countryIso: 'BOL',
  periodoDeTrabajo: '2000-2010', //opciones: 2000-2010, 2010-2016
  firstYear: 2000,
  secondYear: 2010,
  thirdYear: 2016,
  ownMapId: null, //'users/debcysjec/mapa_desacuerdo' id de raster en asset que representa mapa de cambios de usuario 
  coverPixelValues: null, //lista valores de pixel que representan mapa de cambios ingresado por el usuario, tendra el formato [1,2,3,...]
  porcentajeCoberturaBosqueModis: 50,
  mosaico: {
    fuenteDeImagenes: 'LC8_L1T',
    fechaInicial: '2016-01-01',
    fechaFinal: '2016-12-31',
    percentil: 50,
    cloudScore: 10,
  },
  parametrosVisualizacion: {
    bandasAVisualizar: ['B6', 'B5', 'B4'],
    gamma: '0.95,1.1,1',
    min: '0',
    max: '0.5',
  },
  export_forest_cover_change_hansen_gfc: true,
  export_forest_cover_change_gl30: true,
  export_forest_cover_change_esa_glc2: true,
  export_forest_cover_change_modis_vegetation: true,
  export_forest_cover_change_jaxa_fnf: true
};
var constantes = {
  parametrosVisualizacion: {
    // --- el script solo contiene la opcion de realizar mosaico usando simple composite por lo tanto los parametros de visualizacion para las sigtes. fuentes son en realidad para TOA ---
    LT5_L1T: {
      'bandasAVisualizar': ['B5', 'B4', 'B3'],
      'min': '0',
      'max': '0.5',
      'gamma': '1,1,1'
    },
    LE7_L1T: {
      'bandasAVisualizar': ['B5', 'B4', 'B3'],
      'min': '0',
      'max': '0.5',
      'gamma': '1,1,1'
    },
    LC8_L1T: {
      'bandasAVisualizar': ['B6', 'B5', 'B4'],
      'min': '0',
      'max': '0.5',
      'gamma': '0.95,1.1,1'
    },
    probabilityPalette1: [ // paleta para 4 fuentes de imagenes en mapa de probabilidad
      'baecba', //0%, 0 - 20% celeste claro
      'FF0000', //25%, 20 - 40% rojo
      'FF8000', //75%, 40 - 60% naranja
      'FFFF00', //100%, 60 - 80% amarillo
      '0B3B0B', //100%, 83 - 100% verde oscuro
    ],
    probabilityPalette2: [ // paleta para 5 fuentes de imagenes en mapa de probabilidad
      'baecba', //0%, 0 - 16.6% celeste claro
      'FF0000', //20%, 16.6 - 33.3% rojo
      'FF8000', //40%, 33.3 - 49.8% naranja
      'FFFF00', //60%, 49.8 - 66.4% amarillo
      '01DF01', //80%, 66.4 - 83% verde agua
      '0B3B0B', //100%, 83 - 100% verde oscuro
    ],
    probabilityPalette3: [ // paleta para 6 fuentes de imagenes en mapa de probabilidad
      'baecba', //0%, 0% - 14.28% celeste claro
      'FF0000', //16.66%, 14.28% - 28.56% rojo
      'FF8000', //33.32%, 28.56%- 42.84% naranja
      'FFFF00', //49.98%, 42.84% - 57.12% amarillo
      '0040FF', //66.64%, 57.12 - 71.4% azul claro
      '01DF01', //83.3%, 71.4% - 85.68% verde agua
      '0B3B0B', //100%, 85.68 - 100% verde oscuro
    ]
  },
  workPeriodsAndRemap: {
    '2000-2010': {
      'forest_cover_change_hansen_gfc': { initialYear: 2001, finalYear: 2010 },
      /*'forest_cover_change_gl30': { initialYear: 2000, finalYear: 2010 },
'forest_cover_change_esa_glc': { initialYear: 2000, finalYear: 2005 },
'forest_cover_change_modis_vegetation': { initialYear: 2000, finalYear: 2010 },
'forest_cover_change_jaxa_fnf': { initialYear: 2007, finalYear: 2010 }*/
    },
    '2010-2018': {
      'forest_cover_change_hansen_gfc': { initialYear: 2010, finalYear: 2018 },
      'forest_cover_change_esa_glc': { initialYear: 2005, finalYear: 2010 },
      'forest_cover_change_modis_vegetation': { initialYear: 2010, finalYear: 2015 },
      'forest_cover_change_jaxa_fnf': { initialYear: 2010, finalYear: 2017 }
    }
  },
  gfcHansenYear: 2017
}
var auxVariables = {
  isShownAdvancedConfigurationForOwnMap: false,
  isShownAdvancedConfForExportAreas: false
}
var i18n = {
  "Cambio de cobertura de bosque": "Cambio de cobertura de bosque", // main title and table title
  // ----- text for section 1 -----
  "País": "País",
  "Seleccione un país": "Seleccione un país",
  // ----- text for section 2 -----
  "Período de interés": "Período de interés",
  // ----- text for section 3 -----
  "Mapa propio": "Mapa propio",
  'Más >>': 'Más >>',
  '<< Menos': '<< Menos',
  "ID de mapa propio(en Asset) :": "ID de mapa propio(en Asset) :",
  "Valores de píxel de bosque :": "Valores de píxel de bosque :",
  // ----- text for section 4 -----
  "Parámetros de bosque": "Parámetros de bosque",
  "Tree cover MODIS(%) :": "Tree cover MODIS(%) :",
  "Tree cover HANSEN(%) :": "Tree cover HANSEN(%) :",
  // ----- text for section 5 -----
  "Mosaico": "Mosaico",
  "Fuente de imágenes :": "Fuente de imágenes :",
  "Fecha inicial :": "Fecha inicial :",
  "Fecha final :": "Fecha final :",
  "Percentil :": "Percentil :",
  "Cloud score :": "Cloud score :",
  "Bandas a visualizar :": "Bandas a visualizar :",
  "Gamma :": "Gamma :",
  "Mín. :": "Mín. :",
  "Máx. :": "Máx. :",
  // ----- text for section 6 -----
  'Exportar estadísticas de superficies': 'Exportar estadísticas de superficies',
  // ----- text for buttons -----
  "Mostrar capas": "Mostrar capas",
  'Exportar superficies': 'Exportar superficies',
  'Exportar mapas': 'Exportar mapas',
  // ----- text for layers -----
  "Mosaico LANDSAT": "Mosaico LANDSAT",
  "Pérdida": "Pérdida",
  "Mapa de probabilidad": "Mapa de probabilidad",
  "mapa propio": "mapa propio",
  // ----- text for statistics -----
  "Área de pérdida de bosque": "Área de pérdida de bosque",
  "Calculando...": "Calculando...",
  // ----- text for legend -----
  'Leyenda de mapa de probabilidad': 'Leyenda de mapa de probabilidad',
  // ----- common texts for statistics and layers -----
  "GFC(HANSEN)": "GFC(HANSEN)",
  "GlobeLand 30": "GlobeLand 30",
  "Global Land Cover(ESA)": "Global Land Cover(ESA)",
  "MODIS": "MODIS",
  "Forest/No Forest(JAXA)": "Forest/No Forest(JAXA)",
}
var parametersGenerator = {
  '2000-2010': {
    'forest_cover_change_hansen_gfc': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change_hansen_gfc',
        initialYear: 2001,
        finalYear: 2010,
        version: 2018
      }
    },
    'forest_cover_change_gl30': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_gl30',
        initialYear: 2000,
        finalYear: 2010
      }
    },
    'forest_cover_change_esa_glc2': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_esa_glc2',
        initialYear: 2000,
        finalYear: 2005
      }
    },
    'forest_cover_change_modis_vegetation': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_modis_vegetation',
        initialYear: 2000,
        finalYear: 2010,
        percentTreeCoverModis: configuracion.porcentajeCoberturaBosqueModis,
      }
    },
    'forest_cover_change_jaxa_fnf': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_jaxa_fnf',
        initialYear: 2007,
        finalYear: 2010
      }
    },
    'user_map': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'user_map',
        ownMapId: configuracion.ownMapId,
        coverPixelValues: configuracion.coverPixelValues,
      }
    },
    'hybrid_map': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'hybrid_map',
        imagesParametersForGenerateHybridMap: [{
            imageId: 'forest_cover_change_hansen_gfc',
            initialYear: 2001,
            finalYear: 2010,
            version: 2018
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_gl30',
            initialYear: 2000,
            finalYear: 2010
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esa_glc2',
            initialYear: 2000,
            finalYear: 2005
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2000,
            finalYear: 2010,
            percentTreeCoverModis: configuracion.porcentajeCoberturaBosqueModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2007,
            finalYear: 2010
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvancedConfigurationForOwnMap ?
              configuracion.ownMapId : '',
            coverPixelValues: configuracion.coverPixelValues,
          }
        ]
      }
    },
  },
  '2010-2018': {
    'forest_cover_change_hansen_gfc': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change_hansen_gfc',
        initialYear: 2010,
        finalYear: 2018,
        version: 2018
      }
    },
    'forest_cover_change_esa_glc2': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_esa_glc2',
        initialYear: 2005,
        finalYear: 2010
      }
    },
    'forest_cover_change_modis_vegetation': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_modis_vegetation',
        initialYear: 2010,
        finalYear: 2015,
        percentTreeCoverModis: configuracion.porcentajeCoberturaBosqueModis,
      }
    },
    'forest_cover_change_jaxa_fnf': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_jaxa_fnf',
        initialYear: 2010,
        finalYear: 2017
      }
    },
    'user_map': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'user_map',
        ownMapId: configuracion.ownMapId,
        coverPixelValues: configuracion.coverPixelValues,
      }
    },
    'hybrid_map': function() {
      return {
        countryIso: configuracion.countryIso,
        imageId: 'hybrid_map',
        imagesParametersForGenerateHybridMap: [{
            imageId: 'forest_cover_change_hansen_gfc',
            initialYear: 2010,
            finalYear: 2018,
            version: 2018
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esa_glc2',
            initialYear: 2005,
            finalYear: 2010
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2010,
            finalYear: 2015,
            percentTreeCoverModis: configuracion.porcentajeCoberturaBosqueModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2010,
            finalYear: 2017
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvancedConfigurationForOwnMap ?
              configuracion.ownMapId : '',
            coverPixelValues: configuracion.coverPixelValues,
          }
        ]
      }
    }
  }
}
var versions = {
  'forest_hansen_gfc': 2018,
}
var nameLayers = {
  'forest_cover_change_hansen_gfc': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return i18n["Pérdida"] + ' ' + i18n["GFC(HANSEN)"]
    return i18n["Pérdida"] + ' ' + i18n["GFC(HANSEN)"] + ' ' + versions.forest_hansen_gfc + ' (' + initialYear + '-' + finalYear + ')'
  },
  'forest_cover_change_gl30': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return i18n["Pérdida"] + ' ' + i18n["GlobeLand 30"]
    return i18n["Pérdida"] + ' ' + i18n["GlobeLand 30"] + ' (' + initialYear + '-' + finalYear + ')'
  },
  'forest_cover_change_esa_glc2': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return i18n["Pérdida"] + ' ' + i18n["Global Land Cover(ESA)"]
    return i18n["Pérdida"] + ' ' + i18n["Global Land Cover(ESA)"] + ' (' + initialYear + '-' + finalYear + ')'
  },
  'forest_cover_change_modis_vegetation': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return i18n["Pérdida"] + ' ' + i18n["MODIS"]
    return i18n["Pérdida"] + ' ' + i18n["MODIS"] + ' (' + initialYear + '-' + finalYear + ')'
  },
  'forest_cover_change_jaxa_fnf': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return i18n["Pérdida"] + ' ' + i18n["Forest/No Forest(JAXA)"]
    return i18n["Pérdida"] + ' ' + i18n["Forest/No Forest(JAXA)"] + ' (' + initialYear + '-' + finalYear + ')'
  },
  'user_map': function() {
    return i18n["Pérdida"] + ' ' + i18n["mapa propio"]
  },
  'hybrid_map': function() {
    return i18n["Mapa de probabilidad"]
  }
}
function getNumberOfImagesUsedForHybridMap() {
  var imageParameters = parametersGenerator[configuracion.periodoDeTrabajo].hybrid_map()
  var result = utils.getImage(imageParameters)
  return result.numberOfImagesUsed
}
function mostrar() {
  // ----- show layers -----
  /*if (configuracion.mosaico.fuenteDeImagenes) { //si se establecio una fuente de imagenes e ingresa a esta funcion 'mostrarLayers' es porque se definieron todos los parametros del mosaico y se muestra el mismo
    var mosaico = obtenerMosaico();
    Map.addLayer(mosaico, {
      'bands': [configuracion.parametrosVisualizacion.bandasAVisualizar[0], configuracion.parametrosVisualizacion.bandasAVisualizar[1], configuracion.parametrosVisualizacion.bandasAVisualizar[2]],
      'gamma': configuracion.parametrosVisualizacion.gamma,
      'min': configuracion.parametrosVisualizacion.min,
      'max': configuracion.parametrosVisualizacion.max,
    }, i18n["Mosaico LANDSAT"], false);
  }*/
  showLayers()
  showStatistics()
  var configurationForLegend = variables.paletteAndTextsForHybridMapLegend[getNumberOfImagesUsedForHybridMap()]
  paneles.hybridMapLegend.addToMap()
  paneles.hybridMapLegend.refresh(configurationForLegend)
}
function showLayers() {
  var habilitedImageIds = Object.keys(parametersGenerator[configuracion.periodoDeTrabajo]) // obtained habilited sources for period
  var images = {}
  // ----- obtained forest loss of each source ----- 
  habilitedImageIds.forEach(function(imageId) {
    if (imageId == 'user_map' && !auxVariables.isShownAdvancedConfigurationForOwnMap)
      return null
    var imageParameters = parametersGenerator[configuracion.periodoDeTrabajo][imageId]()
    images[imageId] = utils.getImage(imageParameters)
  })
  var visualizationParameters = {
    'forest_cover_change_hansen_gfc': { palette: 'de6500' },
    'forest_cover_change_gl30': { palette: 'e509b7' },
    'forest_cover_change_esa_glc2': { palette: 'c65d90' },
    'forest_cover_change_modis_vegetation': { palette: '9b0000' },
    'forest_cover_change_jaxa_fnf': { palette: '660000' },
    'user_map': { palette: '000' },
    'hybrid_map': {
      4: {
        palette: variables.paletteAndTextsForHybridMapLegend[4].palette,
        min: 0,
        max: 1
      },
      5: {
        palette: variables.paletteAndTextsForHybridMapLegend[5].palette,
        min: 0,
        max: 1
      },
      6: {
        palette: variables.paletteAndTextsForHybridMapLegend[6].palette,
        min: 0,
        max: 1
      }
    },
  }
  Map.centerObject(utils.getLimitCountry(configuracion.countryIso))
  for (var imageId in images) {
    var image = images[imageId].image
    var imageParameters = parametersGenerator[configuracion.periodoDeTrabajo][imageId]()
    var initialYear = imageParameters.initialYear
    var finalYear = imageParameters.finalYear
    if (imageId == 'hybrid_map') {
      var numberOfImagesUsed = images[imageId].numberOfImagesUsed
      Map.addLayer(image,
        visualizationParameters[imageId][numberOfImagesUsed],
        nameLayers[imageId](initialYear, finalYear),
        false)
    } else
      Map.addLayer(image, visualizationParameters[imageId],
        nameLayers[imageId](initialYear, finalYear),
        false)
  }
}
function showStatistics() {
  var statisticsPanelElementTitles = {
    'forest_cover_change_hansen_gfc': elementos.hansenTituloLabel,
    'forest_cover_change_gl30': elementos.glc30TituloLabel,
    'forest_cover_change_esa_glc2': elementos.lcEsaTituloLabel,
    'forest_cover_change_modis_vegetation': elementos.modisTituloLabel,
    'forest_cover_change_jaxa_fnf': elementos.fnfTituloLabel
  }
  var statisticsPanelElementText = {
    'forest_cover_change_hansen_gfc': elementos.estadistica1Label,
    'forest_cover_change_gl30': elementos.estadistica2Label,
    'forest_cover_change_esa_glc2': elementos.estadistica3Label,
    'forest_cover_change_modis_vegetation': elementos.estadistica4Label,
    'forest_cover_change_jaxa_fnf': elementos.estadistica5Label
  }
  var imageIds = [
    'forest_cover_change_hansen_gfc',
    'forest_cover_change_gl30',
    'forest_cover_change_esa_glc2',
    'forest_cover_change_modis_vegetation',
    'forest_cover_change_jaxa_fnf'
  ]
  var habilitedImageIds = Object.keys(parametersGenerator[configuracion.periodoDeTrabajo])
  // --- set title for elements in statistics panel ---
  imageIds.forEach(function(imageId) {
    if (habilitedImageIds.indexOf(imageId) >= 0) {
      var imageParameters = parametersGenerator[configuracion.periodoDeTrabajo][imageId]()
      var initialYear = imageParameters.initialYear
      var finalYear = imageParameters.finalYear
      statisticsPanelElementTitles[imageId].setValue(nameLayers[imageId](initialYear, finalYear) + ' :') //formatamos el titulo de la estadistica con los valores correctos de gestiones
    } else {
      statisticsPanelElementTitles[imageId].setValue(nameLayers[imageId]() + ' :')
      statisticsPanelElementText[imageId].setValue(' - - - - - ')
    }
  })
  // --- show precalculated areas ---
  var precalculatedAreas = getPrecalculatedAreas()
  imageIds.forEach(function(imageId) {
    if (habilitedImageIds.indexOf(imageId) >= 0) {
      if (precalculatedAreas[imageId].getInfo() >= 0)
        statisticsPanelElementText[imageId].setValue(Math.floor(Number(precalculatedAreas[imageId].getInfo())).toLocaleString('en-US') + ' ha.')
      else {
        var imageParameters = parametersGenerator[configuracion.periodoDeTrabajo][imageId]()
        utils.calculateArea(imageParameters).getInfo(function(valor) {
          statisticsPanelElementText[imageId].setValue(Math.floor(Number(valor)).toLocaleString('en-US') + ' ha.')
        })
      }
    }
  })
}
function exportAreas() {
  var workPeriod = parametersGenerator[configuracion.periodoDeTrabajo]
  var imagesId = Object.keys(workPeriod)
  var dataToExport = {
    'forest_cover_change_hansen_gfc': configuracion.export_forest_cover_change_hansen_gfc || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_gl30': configuracion.export_forest_cover_change_gl30 || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_esa_glc2': configuracion.export_forest_cover_change_esa_glc2 || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_modis_vegetation': configuracion.export_forest_cover_change_modis_vegetation || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_jaxa_fnf': configuracion.export_forest_cover_change_jaxa_fnf || !auxVariables.isShownAdvancedConfForExportAreas,
  }
  var nameColumnForImage = {}
  var imagesIdFiltered = imagesId.filter(function(imageId) {
    return dataToExport[imageId]
  })
  imagesIdFiltered.forEach(function(imageId) {
    var imageParameters = workPeriod[imageId]()
    var initialYear = imageParameters.initialYear
    var finalYear = imageParameters.finalYear
    nameColumnForImage[imageId] = nameLayers[imageId](initialYear, finalYear)
  })
  var aditionalInformation = {
    '0_Módulo': configuracion.titulo_de_tabla, //establecemos el titulo de la tabla
    '0_Fuente': configuracion.informacion_adicional_de_tabla, // establecemos la informacion adicional que contendra la tabla
    '0_País': configuracion.countryName,
    '0_Unidades': 'Hectárea'
  }
  imagesIdFiltered.forEach(function(imageId) {
    aditionalInformation[nameColumnForImage[imageId]] = ''
  })
  var downloadDates = {}
  var precalculatedAreas = getPrecalculatedAreas() //se lee todas las areas para todas las fuentes de imagenes para un determinado pais
  imagesIdFiltered.forEach(function(imageId) {
    var area
    if (precalculatedAreas[imageId].getInfo() >= 0)
      area = precalculatedAreas[imageId]
    else {
      var imageParameters = parametersGenerator[imageId]()
      area = utils.calculateArea(imageParameters)
    }
    var colummName = nameColumnForImage[imageId]
    downloadDates[colummName] = area.format('%,.0f')
  })
  Export.table.toDrive({
    collection: ee.FeatureCollection([
      ee.Feature(null, aditionalInformation),
      ee.Feature(null, downloadDates)
    ]),
    description: 'areas_' + configuracion.countryIso,
    fileFormat: 'CSV'
  })
}
function exportImages() {
  var imagesId = [
    'forest_cover_change_hansen_gfc',
    'forest_cover_change_gl30',
    'forest_cover_change_esa_glc2',
    'forest_cover_change_modis_vegetation',
    'forest_cover_change_jaxa_fnf',
  ]
  var imagesForWorkPeriod = parametersGenerator[configuracion.periodoDeTrabajo]
  for (var imageId in imagesForWorkPeriod) {
    if (imagesId.indexOf(imageId) >= 0) {
      var imageParameters = imagesForWorkPeriod[imageId]()
      var result = utils.getImage(imageParameters)
      Export.image.toAsset({
        assetId: imageId + '_' + configuracion.countryIso,
        image: result.image,
        region: utils.getLimitCountry(configuracion.countryIso),
        description: imageId + '_' + configuracion.countryIso,
        maxPixels: 5000000000000,
        crs: 'EPSG:4326',
        crsTransform: [0.00025, 0, -180, 0, -0.00025, 80]
      });
    }
  }
}
/*funcion que genera un mosaico en base a parametros de: limite, fuente de imagenes, fecha inicial, fecha final y porcentaje de cobertura de bosque*/
function obtenerMosaico() {
  var paisVector = utils.getLimitCountry(configuracion.countryIso); // filtrando la geometria de un determinado pais
  // ----- generacion de mosaico landsat -----
  var coleccion = ee.ImageCollection('LANDSAT/' + configuracion.mosaico.fuenteDeImagenes)
    .filterDate(configuracion.mosaico.fechaInicial, configuracion.mosaico.fechaFinal)
    .filterBounds(paisVector);
  var mosaico = ee.Algorithms.Landsat.simpleComposite(coleccion, configuracion.mosaico.percentil, configuracion.mosaico.cloudScore, 40, true).clip(paisVector);
  return mosaico;
}
function getPrecalculatedAreas() {
  var areas = {}
  var parametersGeneratorForWorkPeriod = parametersGenerator[configuracion.periodoDeTrabajo]
  for (var imageId in parametersGeneratorForWorkPeriod) {
    var imageParameters = parametersGeneratorForWorkPeriod[imageId]()
    areas[imageId] = utils.getArea(imageParameters, 'module2')
  }
  return areas
}
/*funcion que verificara la validez de todos los parametros de configuracion si existen alguna conf. invalida
se devolvera un mensaje de alerta, caso contrario 'false' que indica que no hay ningun 
parametro invalido*/
function existBaseInvalidParams() {
  if (!configuracion.countryName) //si no se escogio un pais se devuelve un mensaje de error
    throw 'Sección 1: País no especificado'
}
function exitsInvalidParamsForShowLayers() {
  existBaseInvalidParams()
  if (auxVariables.isShownAdvancedConfigurationForOwnMap && (!configuracion.ownMapId || !configuracion.coverPixelValues)) //si habiendo cargado un id de mapa de usuario pero no se especifica los valores de pixel del mismo entonces se muestra un mensaje de error
    throw 'Sección 2: ID de mapa de usuario o valores de píxel no especificados'
  if (configuracion.mosaico.fuenteDeImagenes && (
      !configuracion.mosaico.fechaInicial ||
      !configuracion.mosaico.fechaFinal ||
      !configuracion.mosaico.percentil ||
      !configuracion.mosaico.cloudScore ||
      !configuracion.parametrosVisualizacion.bandasAVisualizar[0] ||
      !configuracion.parametrosVisualizacion.bandasAVisualizar[1] ||
      !configuracion.parametrosVisualizacion.bandasAVisualizar[2] ||
      !configuracion.parametrosVisualizacion.gamma ||
      !configuracion.parametrosVisualizacion.min ||
      !configuracion.parametrosVisualizacion.max)) //si habiendo establecido una fuente de imagenes no se establecio los demas parametros de mosaico se muestra una advertencia
    throw 'Sección 4: Parámetros de mosaico incompletos'
}
function existInvalidParamsForExportAreas() {
  existBaseInvalidParams()
}
function existInvalidParamsForExportImages() {
  existBaseInvalidParams()
}
// --------------- interfaz de usuario ---------------
var elementos = (function() {
  var paises = utils.getNameAndIsoCountry(); //contendra pares de clave, valor de los nombres de paises
  var fuenteDeImagenes = {
    LT5_L1T: 'LT5_L1T',
    LE7_L1T: 'LE7_L1T',
    LC8_L1T: 'LC8_L1T',
  };
  var bandasAVisualizar = {
    'B1': 'B1',
    'B2': 'B2',
    'B3': 'B3',
    'B4': 'B4',
    'B5': 'B5',
    'B6': 'B6',
  };
  //rango de gestiones disponibles para analisis
  var workPeriodText = {}
  var workPeriodsIds = Object.keys(constantes.workPeriodsAndRemap)
  workPeriodsIds.forEach(function(workPeriod) {
    workPeriodText[workPeriod] = workPeriod
  })
  return {
    countrySelect: ui.Select({
      value: configuracion.countryName ? configuracion.countryName : null,
      placeholder: i18n["Seleccione un país"],
      items: Object.keys(paises),
      onChange: function(key) {
        configuracion.countryName = key;
        configuracion.countryIso = paises[key];
      }
    }),
    periodoDeTrabajoSelect: ui.Select({
      value: configuracion.periodoDeTrabajo ? configuracion.periodoDeTrabajo : null,
      placeholder: 'Períodos de trabajo',
      items: Object.keys(workPeriodText),
      onChange: function(key) {
        configuracion.periodoDeTrabajo = workPeriodText[key];
        eleAdvConfForExportAreas.refreshElements(configuracion.periodoDeTrabajo)
      }
    }),
    advancedConfigurationForOwnMapButton: ui.Button({
      label: i18n["Más >>"],
      style: { fontWeight: 'bold' },
      onClick: function() {
        auxVariables.isShownAdvancedConfigurationForOwnMap = !auxVariables.isShownAdvancedConfigurationForOwnMap
        additionalPanels.advancedConfigurationForOwnMap.style().set('shown', auxVariables.isShownAdvancedConfigurationForOwnMap)
        elementos.advancedConfigurationForOwnMapButton.setLabel(auxVariables.isShownAdvancedConfigurationForOwnMap ?
          i18n["<< Menos"] :
          i18n["Más >>"]
        )
      }
    }),
    ownMapIdTextbox: ui.Textbox({
      value: configuracion.ownMapId ? configuracion.ownMapId : null,
      placeholder: 'users/user/assetid',
      style: { width: '150px', },
      onChange: function(value) {
        configuracion.ownMapId = value;
      }
    }),
    coverPixelValuesTextbox: ui.Textbox({
      value: configuracion.coverPixelValues ? configuracion.coverPixelValues : null,
      placeholder: '1,2,3,4',
      style: { width: '150px', },
      onChange: function(value) {
        configuracion.coverPixelValues = value;
      }
    }),
    porcentajeCoberturaBosqueModisSlider: ui.Slider({
      value: configuracion.porcentajeCoberturaBosqueModis,
      min: 0,
      max: 100,
      step: 5,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        configuracion.porcentajeCoberturaBosqueModis = value;
      }
    }),
    // ---------- UI para mosaico ----------
    fuenteDeImagenesSelect: ui.Select({
      value: configuracion.mosaico.fuenteDeImagenes ? configuracion.mosaico.fuenteDeImagenes : null,
      placeholder: 'Sensor',
      items: Object.keys(fuenteDeImagenes),
      onChange: function(key) {
        configuracion.mosaico.fuenteDeImagenes = fuenteDeImagenes[key];
        switch (configuracion.mosaico.fuenteDeImagenes) { //en funcion de la fuente de imagenes se establece los parametros de visualizacion por defecto para tal fuente de imagenes
          case 'LT5_L1T':
            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion.LT5_L1T;
            break;
          case 'LE7_L1T':
            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion.LE7_L1T;
            break;
          case 'LC8_L1T':
            configuracion.parametrosVisualizacion = constantes.parametrosVisualizacion.LC8_L1T;
            break;
        }
        // ----- actualizando la interfaz de usuario con los nuevos parametros de visualizacion -----
        elementos.bandasAVisualizarRedSelect.setValue(configuracion.parametrosVisualizacion.bandasAVisualizar[0], false);
        elementos.bandasAVisualizarGreenSelect.setValue(configuracion.parametrosVisualizacion.bandasAVisualizar[1], false);
        elementos.bandasAVisualizarBlueSelect.setValue(configuracion.parametrosVisualizacion.bandasAVisualizar[2], false);
        elementos.gammaTextBox.setValue(configuracion.parametrosVisualizacion.gamma, false);
        elementos.minTextBox.setValue(configuracion.parametrosVisualizacion.min, false);
        elementos.maxTextBox.setValue(configuracion.parametrosVisualizacion.max, false);
      }
    }),
    fechaInicialTextbox: ui.Textbox({
      value: configuracion.mosaico.fechaInicial ? configuracion.mosaico.fechaInicial : null,
      placeholder: 'YYYY-MM-DD',
      style: { width: '90px', },
      onChange: function(value) {
        configuracion.mosaico.fechaInicial = value ? value : null; //si el usuario ecribe una cadena vacia se coloca el valor en null
      }
    }),
    fechaFinalTextbox: ui.Textbox({
      value: configuracion.mosaico.fechaFinal ? configuracion.mosaico.fechaFinal : null,
      placeholder: 'YYYY-MM-DD',
      style: { width: '90px', },
      onChange: function(value) {
        configuracion.mosaico.fechaFinal = value ? value : null; //si el usuario ecribe una cadena vacia se coloca el valor en null
      }
    }),
    percentilSlider: ui.Slider({
      value: configuracion.mosaico.percentil ? configuracion.mosaico.percentil : 0,
      min: 0,
      max: 100,
      step: 5,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        configuracion.mosaico.percentil = value;
      }
    }),
    cloudScoreSlider: ui.Slider({
      value: configuracion.mosaico.cloudScore ? configuracion.mosaico.cloudScore : 0,
      min: 0,
      max: 100,
      step: 5,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        configuracion.mosaico.cloudScore = value;
      }
    }),
    bandasAVisualizarRedSelect: ui.Select({
      value: configuracion.parametrosVisualizacion.bandasAVisualizar[0] ? configuracion.parametrosVisualizacion.bandasAVisualizar[0] : null,
      placeholder: 'R',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        configuracion.parametrosVisualizacion.bandasAVisualizar[0] = bandasAVisualizar[key];
      }
    }),
    bandasAVisualizarGreenSelect: ui.Select({
      value: configuracion.parametrosVisualizacion.bandasAVisualizar[1] ? configuracion.parametrosVisualizacion.bandasAVisualizar[1] : null,
      placeholder: 'G',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        configuracion.parametrosVisualizacion.bandasAVisualizar[1] = bandasAVisualizar[key];
      }
    }),
    bandasAVisualizarBlueSelect: ui.Select({
      value: configuracion.parametrosVisualizacion.bandasAVisualizar[2] ? configuracion.parametrosVisualizacion.bandasAVisualizar[2] : null,
      placeholder: 'B',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        configuracion.parametrosVisualizacion.bandasAVisualizar[2] = bandasAVisualizar[key];
      }
    }),
    gammaTextBox: ui.Textbox({
      value: configuracion.parametrosVisualizacion.gamma ? configuracion.parametrosVisualizacion.gamma : null,
      placeholder: '0,0,0',
      style: { width: '100px', },
      onChange: function(value) {
        configuracion.parametrosVisualizacion.gamma = value;
      }
    }),
    minTextBox: ui.Textbox({
      value: configuracion.parametrosVisualizacion.min ? configuracion.parametrosVisualizacion.min : null,
      placeholder: '0',
      style: { width: '50px', },
      onChange: function(value) {
        configuracion.parametrosVisualizacion.min = value;
      }
    }),
    maxTextBox: ui.Textbox({
      value: configuracion.parametrosVisualizacion.max ? configuracion.parametrosVisualizacion.max : null,
      placeholder: '0',
      style: { width: '50px', },
      onChange: function(value) {
        configuracion.parametrosVisualizacion.max = value;
      }
    }),
    // ----- elementos UI de exportacion de superficies de fuentes de imagenes -----
    expandAdvancedConfForExportAreasButton: ui.Button({
      label: i18n["Más >>"],
      style: { fontWeight: 'bold' },
      onClick: function() {
        auxVariables.isShownAdvancedConfForExportAreas = !auxVariables.isShownAdvancedConfForExportAreas
        paneles.advancedConfForExportAreas.style().set('shown', auxVariables.isShownAdvancedConfForExportAreas)
        elementos.expandAdvancedConfForExportAreasButton.setLabel(auxVariables.isShownAdvancedConfForExportAreas ?
          i18n["<< Menos"] :
          i18n["Más >>"]
        )
      }
    }),
    /*exportarSuperficieGlc30_2010Checkbox: ui.Checkbox({
  label: i18n["GlobeLand 30"] + ' ' + year.forest_gl30,
  value: true,
  onChange: function(checked) {
    configuracion.exportarSuperficieGlc30_2010 = checked ? 1 : 0;
  }
}),*/
    // ---------- elementos de panel de estadisticas ----------
    hansenTituloLabel: ui.Label('', { fontWeight: 'bold' }),
    glc30TituloLabel: ui.Label('', { fontWeight: 'bold' }),
    lcEsaTituloLabel: ui.Label('', { fontWeight: 'bold' }),
    modisTituloLabel: ui.Label('', { fontWeight: 'bold' }),
    fnfTituloLabel: ui.Label('', { fontWeight: 'bold' }),
    estadistica1Label: ui.Label(i18n["Calculando..."]),
    estadistica2Label: ui.Label(i18n["Calculando..."]),
    estadistica3Label: ui.Label(i18n["Calculando..."]),
    estadistica4Label: ui.Label(i18n["Calculando..."]),
    estadistica5Label: ui.Label(i18n["Calculando..."]),
    // ---------- buttons ----------
    mostrarButton: ui.Button({
      label: i18n["Mostrar capas"],
      style: {
        stretch: 'horizontal',
        fontWeight: 'bold'
      },
      onClick: function() {
        function clearEstadisticasPanel() {
          elementos.estadistica1Label.setValue(i18n["Calculando..."]);
          elementos.estadistica2Label.setValue(i18n["Calculando..."]);
          elementos.estadistica3Label.setValue(i18n["Calculando..."]);
          elementos.estadistica4Label.setValue(i18n["Calculando..."]);
          elementos.estadistica5Label.setValue(i18n["Calculando..."]);
        }
        Map.clear();
        clearEstadisticasPanel(); //al volver al mostrar los layers se borra la anterior informacion del panel de estadisticas
        try {
          exitsInvalidParamsForShowLayers()
          mostrar();
          Map.add(panelesPrincipales.estadisticas); //cada vez que se borre el mapa en la anterior linea se debera volver a agregar el panel de estadisticas al mapa
        } catch (msg) { //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
          alert(msg)
        }
      }
    }),
    exportAreasButton: ui.Button({
      label: i18n['Exportar superficies'],
      style: {
        stretch: 'horizontal',
        fontWeight: 'bold'
      },
      onClick: function() {
        try {
          existInvalidParamsForExportAreas()
          exportAreas()
        } catch (msg) {
          alert(msg)
        }
      }
    }),
    exportImagesButton: ui.Button({
      label: i18n['Exportar mapas'],
      style: {
        stretch: 'horizontal',
        fontWeight: 'bold'
      },
      onClick: function() {
        try {
          existInvalidParamsForExportImages()
          exportImages()
        } catch (msg) {
          alert(msg)
        }
      }
    }),
    pruebaButton: ui.Button({
      label: 'Prueba',
      style: { fontWeight: 'bold' },
      onClick: function(argument) {
        print(configuracion);
      }
    }),
  };
})();
var paneles = {
  workLimit: ui.Panel([
    elementos.countrySelect,
  ]),
  periodoDeTrabajo: ui.Panel([
    elementos.periodoDeTrabajoSelect,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  advancedConfigurationForOwnMap: ui.Panel([
    elementos.advancedConfigurationForOwnMapButton,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  mapaUsuario: ui.Panel([
    ui.Label(i18n["ID de mapa propio(en Asset) :"]),
    elementos.ownMapIdTextbox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  coverPixelValues: ui.Panel([
    ui.Label(i18n["Valores de píxel de bosque :"]),
    elementos.coverPixelValuesTextbox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  porcentajeCoberturaBosqueModis: ui.Panel([
    ui.Label(i18n["Tree cover MODIS(%) :"]),
    elementos.porcentajeCoberturaBosqueModisSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  fuenteDeImagenes: ui.Panel([
    ui.Label(i18n["Fuente de imágenes :"]),
    elementos.fuenteDeImagenesSelect,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  fechaInicial: ui.Panel([
    ui.Label(i18n["Fecha inicial :"]),
    elementos.fechaInicialTextbox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  fechaFinal: ui.Panel([
    ui.Label(i18n["Fecha final :"]),
    elementos.fechaFinalTextbox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  percentil: ui.Panel([
    ui.Label(i18n["Percentil :"]),
    elementos.percentilSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  cloudScore: ui.Panel([
    ui.Label(i18n["Cloud score :"]),
    elementos.cloudScoreSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  bandasAVisualizar: ui.Panel([
    ui.Label(i18n["Bandas a visualizar :"]),
    elementos.bandasAVisualizarRedSelect,
    elementos.bandasAVisualizarGreenSelect,
    elementos.bandasAVisualizarBlueSelect,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  gamma: ui.Panel([
    ui.Label(i18n["Gamma :"]),
    elementos.gammaTextBox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  minMax: ui.Panel([
    ui.Label(i18n["Mín. :"]),
    elementos.minTextBox,
    ui.Label(i18n["Máx. :"]),
    elementos.maxTextBox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  expandAdvancedConfForExportAreas: ui.Panel([
    elementos.expandAdvancedConfForExportAreasButton
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  advancedConfForExportAreas: ui.Panel([], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    border: '1px solid #D8D8D8',
    shown: false,
    margin: '0 0 0 15px',
  }),
  // ---------- subpaneles de panel estadisticas ----------
  estadistica1: ui.Panel([
    elementos.hansenTituloLabel,
    elementos.estadistica1Label,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  estadistica2: ui.Panel([
    elementos.glc30TituloLabel,
    elementos.estadistica2Label,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  estadistica3: ui.Panel([
    elementos.lcEsaTituloLabel,
    elementos.estadistica3Label,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  estadistica4: ui.Panel([
    elementos.modisTituloLabel,
    elementos.estadistica4Label,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  estadistica5: ui.Panel([
    elementos.fnfTituloLabel,
    elementos.estadistica5Label,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  buttons: ui.Panel([
    elementos.mostrarButton,
    elementos.exportAreasButton,
    elementos.exportImagesButton
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
    margin: '10px 0'
  }),
  hybridMapLegend: new panels.LegendPanel(i18n['Leyenda de mapa de probabilidad'], null, 'bottom-left')
};
function ElementsAdvancedConfForExportAreas(panel) {
  this.elements = {}
  this.panel = panel
  this.createElements()
}
// --- created checkbox for export areas ---
ElementsAdvancedConfForExportAreas.prototype.createElements = function() {
  var imagesId = [
    'forest_cover_change_hansen_gfc',
    'forest_cover_change_gl30',
    'forest_cover_change_esa_glc2',
    'forest_cover_change_modis_vegetation',
    'forest_cover_change_jaxa_fnf',
  ]
  var actual = this
  imagesId.forEach(function(imageId) {
    actual.elements[imageId] = ui.Checkbox({
      label: nameLayers[imageId](),
      value: true,
      onChange: function(checked) {
        configuracion['export_' + imageId] = checked ? 1 : 0;
      }
    })
  })
}
ElementsAdvancedConfForExportAreas.prototype.refreshElements = function(workPeriod) {
  var imagesId = [
    'forest_cover_change_hansen_gfc',
    'forest_cover_change_gl30',
    'forest_cover_change_esa_glc2',
    'forest_cover_change_modis_vegetation',
    'forest_cover_change_jaxa_fnf',
  ]
  var imagesIdForWorkPeriod = Object.keys(parametersGenerator[workPeriod])
  var actual = this
  actual.panel.clear()
  imagesIdForWorkPeriod.forEach(function(imageId) {
    if (imagesId.indexOf(imageId) >= 0) {
      actual.panel.add(actual.elements[imageId])
    }
  })
}
var eleAdvConfForExportAreas = new ElementsAdvancedConfForExportAreas(paneles.advancedConfForExportAreas)
eleAdvConfForExportAreas.refreshElements(configuracion.periodoDeTrabajo)
var additionalPanels = {
  advancedConfigurationForOwnMap: ui.Panel([
    paneles.mapaUsuario,
    paneles.coverPixelValues,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    border: '1px solid #D8D8D8',
    shown: false,
    margin: '0 0 0 15px',
  }),
}
var panelesPrincipales = {
  principal: ui.Panel({
    widgets: [
      ui.Label({
        value: i18n["Cambio de cobertura de bosque"],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center'
        }
      }),
      ui.Label('1) ' + i18n["País"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.workLimit,
      ui.Label('2) ' + i18n["Período de interés"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.periodoDeTrabajo,
      ui.Label('3) ' + i18n["Mapa propio"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.advancedConfigurationForOwnMap,
      additionalPanels.advancedConfigurationForOwnMap,
      ui.Label('4) ' + i18n["Parámetros de bosque"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.porcentajeCoberturaBosqueModis,
      ui.Label('5) ' + i18n["Mosaico"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.fuenteDeImagenes,
      paneles.fechaInicial,
      paneles.fechaFinal,
      paneles.cloudScore,
      paneles.percentil,
      paneles.bandasAVisualizar,
      paneles.gamma,
      paneles.minMax,
      ui.Label('6) ' + i18n["Exportar estadísticas de superficies"], { fontWeight: 'bold', fontSize: '15px' }),
      paneles.expandAdvancedConfForExportAreas,
      paneles.advancedConfForExportAreas,
      paneles.buttons,
    ],
    style: {
      width: '360px',
      padding: '8px'
    }
  }),
  estadisticas: ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), //cada area estara en una fila separada
    widgets: [
      ui.Label(i18n["Área de pérdida de bosque"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      paneles.estadistica1,
      paneles.estadistica2,
      paneles.estadistica3,
      paneles.estadistica4,
      paneles.estadistica5,
    ],
    style: {
      width: '400px',
      position: 'bottom-right' //el panel se ubicara a lado inferior derecho sobre el mapa
    }
  })
};
ui.root.insert(0, panelesPrincipales.principal);