var style = require('users/gena/packages:style'),
  utils = require('users/kindgard/geoFRA:common/utils.js'),
  variables = require('users/kindgard/geoFRA:common/variables.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n/module2.js')
var config = {
  titulo_de_tabla: 'Perdida de bosque', //titulo de la tabla de exportacion de superficies
  informacion_adicional_de_tabla: 'Scripts FRA-online Beta', //informacion adicional que contendra la tabla de superficies a exportar
  country: '',
  countryIso: 'BOL',
  periodoDeTrabajo: '2000-2010', //opciones: 2000-2010, 2010-2016
  ownMapId: null, //'users/debcysjec/mapa_desacuerdo' id de raster en asset que representa mapa de cambios de usuario 
  coverPixelValues: null, //lista valores de pixel que representan mapa de cambios ingresado por el usuario, tendra el formato [1,2,3,...]
  percentTreeCoverModis: 10,
  levelOfAgreementBetweenMaps: 50,
  landsatMosaic: {
    imageSource: 'LC08/C01/T1_RT',
    startDate: '2016-01-01',
    endDate: '2016-12-31',
    percentile: 50,
    cloudScore: 10,
    visParams: {
      bands: ['NIR', 'SWIR1', 'RED'],
      gamma: '0.95,1.1,1',
      min: '0',
      max: '0.5',
    },
    isShownAdvConf: false
  },
  export_forest_cover_change_hansen_gfc: true,
  export_forest_cover_change_gl30: true,
  export_forest_cover_change_modis_vegetation: true,
  export_forest_cover_change_jaxa_fnf: true,
  export_forest_cover_change_esacci_lc: true,
  i18n: i18n.en
};
var auxVariables = {
  isShownAdvConfForOwnMap: false,
  isShownAdvancedConfForExportAreas: false
}
var parametersGenerator = {
  '2000-2010': {
    landsat_mosaic: function() {
      return config.landsatMosaic.isShownAdvConf ? {
        imageId: 'landsat_mosaic',
        countryIso: config.countryIso,
        startDate: config.landsatMosaic.startDate,
        endDate: config.landsatMosaic.endDate,
        imageSource: config.landsatMosaic.imageSource,
        percentile: config.landsatMosaic.percentile,
        cloudScore: config.landsatMosaic.cloudScore,
      } : {
        imageId: 'landsat_mosaic',
        countryIso: config.countryIso,
        startDate: config.landsatMosaic.startDate,
        endDate: config.landsatMosaic.endDate,
      }
    },
    'forest_cover_change_hansen_gfc': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change_hansen_gfc',
        initialYear: 2001,
        finalYear: 2010,
        version: 2018
      }
    },
    'forest_cover_change_gl30': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_gl30',
        initialYear: 2000,
        finalYear: 2010
      }
    },
    'forest_cover_change_modis_vegetation': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_modis_vegetation',
        initialYear: 2000,
        finalYear: 2010,
        percentTreeCoverModis: config.percentTreeCoverModis,
      }
    },
    'forest_cover_change_jaxa_fnf': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_jaxa_fnf',
        initialYear: 2007,
        finalYear: 2010
      }
    },
    forest_cover_change_esacci_lc: function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_esacci_lc',
        initialYear: 2000,
        finalYear: 2010,
      }
    },
    'user_map': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'user_map',
        ownMapId: config.ownMapId,
        coverPixelValues: config.coverPixelValues,
      }
    },
    'hybrid_map': function() {
      return {
        countryIso: config.countryIso,
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
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2000,
            finalYear: 2010,
            percentTreeCoverModis: config.percentTreeCoverModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2007,
            finalYear: 2010
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esacci_lc',
            initialYear: 2000,
            finalYear: 2010
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvConfForOwnMap ?
              config.ownMapId : '',
            coverPixelValues: config.coverPixelValues,
          }
        ]
      }
    },
    new_cover_map: function(isParamsForGenerateImage) {
      isParamsForGenerateImage = typeof(isParamsForGenerateImage) == 'undefined' ? true : isParamsForGenerateImage
      return isParamsForGenerateImage ? {
        imageId: 'new_cover_map',
        countryIso: config.countryIso,
        levelOfAgreementBetweenMaps: config.levelOfAgreementBetweenMaps,
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
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2000,
            finalYear: 2010,
            percentTreeCoverModis: config.percentTreeCoverModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2007,
            finalYear: 2010
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esacci_lc',
            initialYear: 2000,
            finalYear: 2010
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvConfForOwnMap ?
              config.ownMapId : '',
            coverPixelValues: config.coverPixelValues,
          }
        ],
      } : {
        imageId: 'new_cover_map',
        countryIso: config.countryIso,
        levelOfAgreementBetweenMaps: utils.getRoundLevelOfAgreementBetweenMaps(config.levelOfAgreementBetweenMaps, 5),
        percentTreeCoverModis: config.percentTreeCoverModis,
        workPeriod: '2000-2010',
      }
    },
  },
  '2010-2019': {
    landsat_mosaic: function() {
      return config.landsatMosaic.isShownAdvConf ? {
        imageId: 'landsat_mosaic',
        countryIso: config.countryIso,
        startDate: config.landsatMosaic.startDate,
        endDate: config.landsatMosaic.endDate,
        imageSource: config.landsatMosaic.imageSource,
        percentile: config.landsatMosaic.percentile,
        cloudScore: config.landsatMosaic.cloudScore,
      } : {
        imageId: 'landsat_mosaic',
        countryIso: config.countryIso,
        startDate: config.landsatMosaic.startDate,
        endDate: config.landsatMosaic.endDate,
      }
    },
    'forest_cover_change_hansen_gfc': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change_hansen_gfc',
        initialYear: 2010,
        finalYear: 2019,
        version: 2019
      }
    },
    'forest_cover_change_modis_vegetation': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_modis_vegetation',
        initialYear: 2010,
        finalYear: 2019,
        percentTreeCoverModis: config.percentTreeCoverModis,
      }
    },
    'forest_cover_change_jaxa_fnf': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_jaxa_fnf',
        initialYear: 2010,
        finalYear: 2017
      }
    },
    forest_cover_change_esacci_lc: function() {
      return {
        countryIso: config.countryIso,
        imageId: 'forest_cover_change',
        forestImageId: 'forest_esacci_lc',
        initialYear: 2010,
        finalYear: 2018,
      }
    },
    'user_map': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'user_map',
        ownMapId: config.ownMapId,
        coverPixelValues: config.coverPixelValues,
      }
    },
    'hybrid_map': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'hybrid_map',
        imagesParametersForGenerateHybridMap: [{
            imageId: 'forest_cover_change_hansen_gfc',
            initialYear: 2010,
            finalYear: 2019,
            version: 2019
          }, {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esacci_lc',
            initialYear: 2000,
            finalYear: 2018
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2010,
            finalYear: 2019,
            percentTreeCoverModis: config.percentTreeCoverModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2010,
            finalYear: 2017
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvConfForOwnMap ?
              config.ownMapId : '',
            coverPixelValues: config.coverPixelValues,
          }
        ]
      }
    },
    new_cover_map: function(isParamsForGenerateImage) {
      isParamsForGenerateImage = typeof(isParamsForGenerateImage) == 'undefined' ? true : isParamsForGenerateImage
      return isParamsForGenerateImage ? {
        imageId: 'new_cover_map',
        countryIso: config.countryIso,
        levelOfAgreementBetweenMaps: config.levelOfAgreementBetweenMaps,
        workPeriod: '2010-2019',
        imagesParametersForGenerateHybridMap: [{
            imageId: 'forest_cover_change_hansen_gfc',
            initialYear: 2010,
            finalYear: 2019,
            version: 2019
          }, {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_esacci_lc',
            initialYear: 2000,
            finalYear: 2018
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_modis_vegetation',
            initialYear: 2010,
            finalYear: 2019,
            percentTreeCoverModis: config.percentTreeCoverModis,
          },
          {
            imageId: 'forest_cover_change',
            forestImageId: 'forest_jaxa_fnf',
            initialYear: 2010,
            finalYear: 2017
          },
          {
            imageId: 'user_map',
            ownMapId: auxVariables.isShownAdvConfForOwnMap ?
              config.ownMapId : '',
            coverPixelValues: config.coverPixelValues,
          }
        ],
      } : {
        imageId: 'new_cover_map',
        countryIso: config.countryIso,
        levelOfAgreementBetweenMaps: utils.getRoundLevelOfAgreementBetweenMaps(config.levelOfAgreementBetweenMaps, 4),
        workPeriod: '2010-2019',
        percentTreeCoverModis: config.percentTreeCoverModis,
      }
    },
  }
}
var versions = {
  'forest_hansen_gfc': 2019,
}
var nameLayers = {
  landsat_mosaic: function() {
    return config.i18n["LANDSAT mosaic"]
  },
  'forest_cover_change_hansen_gfc': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return config.i18n["Lost"] + ' ' + config.i18n["GFC(HANSEN)"]
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["GFC(HANSEN)"] +
      ' ' +
      versions.forest_hansen_gfc +
      ' (' +
      initialYear +
      '-' +
      finalYear +
      ')'
  },
  'forest_cover_change_gl30': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return config.i18n["Lost"] +
        ' ' +
        config.i18n["GlobeLand 30"]
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["GlobeLand 30"] +
      ' (' +
      initialYear +
      '-' +
      finalYear +
      ')'
  },
  'forest_cover_change_modis_vegetation': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return config.i18n["Lost"] +
        ' ' +
        config.i18n["MODIS"] +
        "," +
        config.percentTreeCoverModis +
        "%"
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["MODIS"] +
      ", " +
      config.percentTreeCoverModis +
      "%" +
      ' (' + initialYear + '-' + finalYear + ')'
  },
  'forest_cover_change_jaxa_fnf': function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return config.i18n["Lost"] +
        ' ' +
        config.i18n["Forest/No Forest(JAXA)"]
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["Forest/No Forest(JAXA)"] +
      ' (' +
      initialYear +
      '-' +
      finalYear +
      ')'
  },
  forest_cover_change_esacci_lc: function(initialYear, finalYear) {
    if (typeof(initialYear) == 'undefined')
      return config.i18n["Lost"] +
        ' ' +
        config.i18n["Land cover 300m(ESA CCI)"]
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["Land cover 300m(ESA CCI)"] +
      ' (' +
      initialYear +
      '-' +
      finalYear +
      ')'
  },
  'user_map': function() {
    return config.i18n["Lost"] +
      ' ' +
      config.i18n["Own map"]
  },
  'hybrid_map': function() {
    return config.i18n["hybrid map"]
  },
  new_cover_map: function() {
    return config.i18n["New change map"] +
      "(" +
      config.i18n["level min. of agrmt. btw. maps"] +
      " " +
      config.levelOfAgreementBetweenMaps +
      "%)"
  }
}
var imageIds = [
  'forest_cover_change_hansen_gfc',
  'forest_cover_change_gl30',
  'forest_cover_change_modis_vegetation',
  'forest_cover_change_jaxa_fnf',
  'forest_cover_change_esacci_lc',
  'new_cover_map'
]
function getNumberOfImagesUsedForHybridMap() {
  var imageParameters = parametersGenerator[config.periodoDeTrabajo].hybrid_map()
  var result = utils.getImage(imageParameters)
  return result.numberOfImagesUsed
}
function showLayersAndStatistics() {
  Map.centerObject(utils.getLimitCountry(config.countryIso))
  uiElements.areasPanel.show(true)
  ui.util.setTimeout(function() {
    showStatistics()
    showLayers()
  }, 1000)
  var configurationForLegend = variables.paletteAndTextsForHybridMapLegend[getNumberOfImagesUsedForHybridMap()]
  uiElements.hybridMapLegend.ui.refresh(configurationForLegend)
}
function showLayers() {
  uiElements.layersManager.resetExcept(['background'])
  var habilitedImageIds = Object.keys(parametersGenerator[config.periodoDeTrabajo]) // obtained habilited sources for period
  var images = {}
  // ----- obtained forest loss of each source ----- 
  habilitedImageIds.forEach(function(imageId) {
    if (imageId == 'user_map' && !auxVariables.isShownAdvConfForOwnMap)
      return null
    var imageParameters = parametersGenerator[config.periodoDeTrabajo][imageId]()
    var maskAndBandRename = (imageId == 'hybrid_map' || imageId == 'landsat_mosaic' ?
      false :
      true)
    images[imageId] = utils.getImage(imageParameters,
      maskAndBandRename,
      maskAndBandRename)
  })
  var visualizationParameters = {
    'landsat_mosaic': config.landsatMosaic.isShownAdvConf ?
      config.landsatMosaic.visParams : null,
    'forest_cover_change_hansen_gfc': { palette: 'de6500' },
    'forest_cover_change_gl30': { palette: 'e509b7' },
    'forest_cover_change_modis_vegetation': { palette: '9b0000' },
    'forest_cover_change_jaxa_fnf': { palette: '660000' },
    forest_cover_change_esacci_lc: { palette: 'c65d90' },
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
    'new_cover_map': { palette: '891800' }
  }
  for (var imageId in images) {
    var result = images[imageId]
    var image = result.image
    var imageParameters = parametersGenerator[config.periodoDeTrabajo][imageId]()
    var initialYear = imageParameters.initialYear
    var finalYear = imageParameters.finalYear
    var visParams = result.visParams ?
      result.visParams : (
        imageId == 'hybrid_map' ?
        visualizationParameters[imageId][images[imageId].numberOfImagesUsed] :
        visualizationParameters[imageId]
      )
    uiElements.layersManager.add(ui.Map.Layer(image,
        visParams,
        nameLayers[imageId](initialYear, finalYear),
        false),
      imageId)
  }
}
function showStatistics() {
  var statisticsPanelElementTitles = {
    'forest_cover_change_hansen_gfc': uiElements.statisticTitle1Label,
    'forest_cover_change_gl30': uiElements.statisticTitle2Label,
    'forest_cover_change_modis_vegetation': uiElements.statisticTitle4Label,
    'forest_cover_change_jaxa_fnf': uiElements.statisticTitle5Label,
    forest_cover_change_esacci_lc: uiElements.statisticTitle6Label,
    new_cover_map: uiElements.statisticTitle7Label.ui,
  }
  var statisticsPanelElementText = {
    'forest_cover_change_hansen_gfc': uiElements.estadistica1Label,
    'forest_cover_change_gl30': uiElements.estadistica2Label,
    'forest_cover_change_modis_vegetation': uiElements.estadistica4Label,
    'forest_cover_change_jaxa_fnf': uiElements.estadistica5Label,
    forest_cover_change_esacci_lc: uiElements.statistic6Label,
    new_cover_map: uiElements.statistic7Label,
  }
  var habilitedImageIds = Object.keys(parametersGenerator[config.periodoDeTrabajo])
  // --- set title for elements in statistics panel ---
  imageIds.forEach(function(imageId) {
    if (habilitedImageIds.indexOf(imageId) >= 0) {
      var imageParameters = parametersGenerator[config.periodoDeTrabajo][imageId]()
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
        statisticsPanelElementText[imageId].setValue(
          Math.floor(Number(precalculatedAreas[imageId].getInfo()))
          .toLocaleString('en-US') + ' ha.')
      else {
        var imageParameters = parametersGenerator[config.periodoDeTrabajo][imageId]()
        utils.calculateArea(imageParameters).getInfo(function(valor) {
          statisticsPanelElementText[imageId].setValue(
            Math.floor(Number(valor))
            .toLocaleString('en-US') + ' ha.')
        })
      }
    }
  })
}
function exportAreas() {
  var workPeriod = parametersGenerator[config.periodoDeTrabajo]
  var imagesId = Object.keys(workPeriod)
  var dataToExport = {
    'forest_cover_change_hansen_gfc': config.export_forest_cover_change_hansen_gfc || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_gl30': config.export_forest_cover_change_gl30 || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_modis_vegetation': config.export_forest_cover_change_modis_vegetation || !auxVariables.isShownAdvancedConfForExportAreas,
    'forest_cover_change_jaxa_fnf': config.export_forest_cover_change_jaxa_fnf || !auxVariables.isShownAdvancedConfForExportAreas,
    forest_cover_change_esacci_lc: config.export_forest_cover_change_esacci_lc || !auxVariables.isShownAdvancedConfForExportAreas,
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
    '0_Módulo': config.titulo_de_tabla, //establecemos el titulo de la tabla
    '0_Fuente': config.informacion_adicional_de_tabla, // establecemos la informacion adicional que contendra la tabla
    '0_País': config.countryName,
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
    description: 'areas_' + config.countryIso,
    fileFormat: 'CSV'
  })
}
function exportImages() {
  var imagesForWorkPeriod = parametersGenerator[config.periodoDeTrabajo]
  for (var imageId in imagesForWorkPeriod) {
    if (imageIds.indexOf(imageId) >= 0) {
      var imageParameters = imagesForWorkPeriod[imageId]()
      var result = utils.getImage(imageParameters)
      Export.image.toAsset({
        assetId: imageId + '_' + config.countryIso,
        image: result.image,
        region: utils.getLimitCountry(config.countryIso),
        description: imageId + '_' + config.countryIso,
        maxPixels: 5000000000000,
        crs: 'EPSG:4326',
        crsTransform: [0.00025, 0, -180, 0, -0.00025, 80]
      });
    }
  }
}
function getPrecalculatedAreas() {
  var areas = {}
  var parametersGeneratorForWorkPeriod = parametersGenerator[config.periodoDeTrabajo]
  for (var imageId in parametersGeneratorForWorkPeriod) {
    var imageParameters = parametersGeneratorForWorkPeriod[imageId](false)
    areas[imageId] = utils.getArea(imageParameters, 'module2')
  }
  return areas
}
/*funcion que verificara la validez de todos los parametros de config si existen alguna conf. invalida
se devolvera un mensaje de alerta, caso contrario 'false' que indica que no hay ningun 
parametro invalido*/
function existBaseInvalidParams() {
  if (!config.countryName) //si no se escogio un pais se devuelve un mensaje de error
    throw 'Sección 1: País no especificado'
}
function exitsInvalidParamsForShowLayers() {
  existBaseInvalidParams()
  if (auxVariables.isShownAdvConfForOwnMap && (!config.ownMapId || !config.coverPixelValues)) //si habiendo cargado un id de mapa de usuario pero no se especifica los valores de pixel del mismo entonces se muestra un mensaje de error
    throw 'Sección 2: ID de mapa de usuario o valores de píxel no especificados'
  if (config.landsatMosaic.fuenteDeImagenes && (
      !config.landsatMosaic.startDate ||
      !config.landsatMosaic.endDate ||
      !config.landsatMosaic.percentile ||
      !config.landsatMosaic.cloudScore ||
      !config.landsatMosaic.visParams.bands[0] ||
      !config.landsatMosaic.visParams.bands[1] ||
      !config.landsatMosaic.visParams.bands[2] ||
      !config.landsatMosaic.visParams.gamma ||
      !config.landsatMosaic.visParams.min ||
      !config.landsatMosaic.visParams.max)) //si habiendo establecido una fuente de imagenes no se establecio los demas parametros de mosaico se muestra una advertencia
    throw 'Sección 4: Parámetros de mosaico incompletos'
}
function existInvalidParamsForExportAreas() {
  existBaseInvalidParams()
}
function existInvalidParamsForExportImages() {
  existBaseInvalidParams()
}
function updateUis() {
  Object.keys(uiElements).forEach(function(key) {
    uiElements[key].updateUi ?
      uiElements[key].updateUi() :
      null
  })
}
// --------------- interfaz de usuario ---------------
var uiElements = (function() {
  var workPeriodsList = {
    '2000-2010': '2000-2010',
    '2010-2019': '2010-2019'
  }
  var paises = utils.getNameAndIsoCountry(); //contendra pares de clave, valor de los nombres de paises
  return {
    countrySelect: {
      ui: ui.Select({
        value: config.countryName ? config.countryName : null,
        placeholder: config.i18n["Select a country"],
        items: Object.keys(paises),
        style: {
          margin: '0 0 0 15px'
        },
        onChange: function(key) {
          config.countryName = key;
          config.countryIso = paises[key];
        }
      }),
      updateUi: function() {
        this.ui.setPlaceholder(config.i18n["Select a country"])
      }
    },
    periodoDeTrabajoSelect: {
      ui: ui.Select({
        value: config.periodoDeTrabajo ? config.periodoDeTrabajo : null,
        placeholder: config.i18n["Interest period"],
        items: Object.keys(workPeriodsList),
        style: {
          margin: '0 0 0 15px'
        },
        onChange: function(key) {
          config.periodoDeTrabajo = workPeriodsList[key];
          eleAdvConfForExportAreas.refreshElements(config.periodoDeTrabajo)
        }
      }),
      updateUi: function() {
        this.ui.setPlaceholder(config.i18n["Interest period"])
      }
    },
    advConfForOwnMapButton: {
      ui: ui.Button({
        label: config.i18n["More >>"],
        style: { fontWeight: 'bold' },
        onClick: function() {
          auxVariables.isShownAdvConfForOwnMap = !auxVariables.isShownAdvConfForOwnMap
          additionalPanels.advancedConfigurationForOwnMap.style().set('shown', auxVariables.isShownAdvConfForOwnMap)
          uiElements.advConfForOwnMapButton.ui.setLabel(auxVariables.isShownAdvConfForOwnMap ?
            config.i18n["<< Less"] :
            config.i18n["More >>"]
          )
        }
      }),
      updateUi: function() {
        this.ui.setLabel(auxVariables.isShownAdvConfForOwnMap ?
          config.i18n["<< Less"] :
          config.i18n["More >>"])
      }
    },
    ownMapIdLabel: {
      ui: ui.Label(config.i18n["Own map ID (in Asset) :"], {
        padding: '5px 0'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Own map ID (in Asset) :"])
      }
    },
    ownMapIdTextbox: ui.Textbox({
      value: config.ownMapId ? config.ownMapId : null,
      placeholder: 'users/user/assetid',
      style: { width: '150px', },
      onChange: function(value) {
        config.ownMapId = value;
      }
    }),
    coverPixelValuesLabel: {
      ui: ui.Label(config.i18n["Pixel Values forest :"], {
        padding: '5px 0'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Pixel Values forest :"])
      }
    },
    coverPixelValuesTextbox: ui.Textbox({
      value: config.coverPixelValues ? config.coverPixelValues : null,
      placeholder: '1,2,3,4',
      style: { width: '150px', },
      onChange: function(value) {
        config.coverPixelValues = value;
      }
    }),
    percentTreeCoverModisSlider: ui.Slider({
      value: config.percentTreeCoverModis,
      min: 10,
      max: 50,
      step: 10,
      style: {
        width: '250px',
        margin: '0 42px'
      },
      onChange: function(value) {
        config.percentTreeCoverModis = value;
      }
    }),
    levelOfAgreementBetweenMaps: {
      ui: ui.Label(config.i18n["Level min. of agreement between maps(%) :"], {
        padding: '5px 0'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Level min. of agreement between maps(%) :"])
      }
    },
    levelOfAgreementBetweenMapsSlider: ui.Slider({
      value: config.levelOfAgreementBetweenMaps,
      min: 1,
      max: 100,
      step: 1,
      style: {
        width: '250px',
        margin: '0 42px'
      },
      onChange: function(value) {
        config.levelOfAgreementBetweenMaps = value
      }
    }),
    landsatMosaicPanel: new panels.LandsatMosaicPanel(config.landsatMosaic, config),
    // ----- elementos UI de exportacion de superficies de fuentes de imagenes -----
    expandAdvancedConfForExportAreasButton: {
      ui: ui.Button({
        label: config.i18n["More >>"],
        style: { fontWeight: 'bold' },
        onClick: function() {
          auxVariables.isShownAdvancedConfForExportAreas = !auxVariables.isShownAdvancedConfForExportAreas
          paneles.advancedConfForExportAreas.style().set('shown', auxVariables.isShownAdvancedConfForExportAreas)
          uiElements.expandAdvancedConfForExportAreasButton.ui.setLabel(auxVariables.isShownAdvancedConfForExportAreas ?
            config.i18n["<< Less"] :
            config.i18n["More >>"]
          )
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["More >>"])
      }
    },
    /*exportarSuperficieGlc30_2010Checkbox: ui.Checkbox({
  label: config.i18n["GlobeLand 30"] + ' ' + year.forest_gl30,
  value: true,
  onChange: function(checked) {
    config.exportarSuperficieGlc30_2010 = checked ? 1 : 0;
  }
}),*/
    // ---------- elementos de panel de estadisticas ----------
    statisticTitle1Label: ui.Label('', {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '5px',
      padding: '0px'
    }),
    statisticTitle2Label: ui.Label('', {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '5px',
      padding: '0px'
    }),
    statisticTitle4Label: ui.Label('', {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '5px',
      padding: '0px'
    }),
    statisticTitle5Label: ui.Label('', {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '5px',
      padding: '0px'
    }),
    statisticTitle6Label: ui.Label('', {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '5px',
      padding: '0px'
    }),
    statisticTitle7Label: {
      ui: ui.Label('', { fontWeight: 'bold' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["New change map"] +
          "(" +
          config.i18n["level min. min. of agrmt. btw. maps"] +
          " " +
          config.levelOfAgreementBetweenMaps +
          "%)")
      }
    },
    estadistica1Label: new panels.StatisticLabel(config),
    estadistica2Label: new panels.StatisticLabel(config),
    estadistica4Label: new panels.StatisticLabel(config),
    estadistica5Label: new panels.StatisticLabel(config),
    statistic6Label: new panels.StatisticLabel(config),
    statistic7Label: new panels.StatisticLabel(config),
    // ---------- buttons ----------
    mostrarButton: {
      ui: ui.Button({
        label: config.i18n["Show layers"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          function clearEstadisticasPanel() {
            uiElements.estadistica1Label.reset()
            uiElements.estadistica2Label.reset()
            uiElements.estadistica4Label.reset()
            uiElements.estadistica5Label.reset()
            uiElements.statistic6Label.reset()
            uiElements.statistic7Label.reset()
          }
          clearEstadisticasPanel(); //al volver al mostrar los layers se borra la anterior informacion del panel de estadisticas
          try {
            exitsInvalidParamsForShowLayers()
            showLayersAndStatistics();
          } catch (msg) { //se valida todos los parametros de config si hay algun error se muestra un mensaje de alerta
            alert(msg)
          }
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Show layers"])
      }
    },
    exportAreasButton: {
      ui: ui.Button({
        label: config.i18n["Export area estimates(csv)"],
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
      updateUi: function() {
        this.ui.setLabel(config.i18n["Export area estimates(csv)"])
      }
    },
    exportImagesButton: {
      ui: ui.Button({
        label: config.i18n["Export raster files(.tiff)"],
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
      updateUi: function() {
        this.ui.setLabel(config.i18n["Export raster files(.tiff)"])
      }
    },
    layersManager: new panels.LayersManager({
      'background': ui.Map.Layer(ee.Image(1), { palette: ['000'] },
        'background',
        true,
        0.5)
    }, function() {}),
    hybridMapLegend: {
      ui: new panels.LegendPanel(config.i18n["Legend hybrid map"],
        variables.paletteAndTextsForHybridMapLegend[6],
        'bottom-left'),
      updateUi: function() {
        this.ui.updateLanguage(config.i18n["Legend hybrid map"])
      }
    },
    moduleTitle: {
      ui: ui.Label({
        value: config.i18n["Forest cover change"],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Forest cover change"])
      }
    },
    countrySectionTitle: {
      ui: ui.Label('1) ' + config.i18n["Country"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('1) ' + config.i18n["Country"])
      }
    },
    interestPeriodSectionTitle: {
      ui: ui.Label('2) ' + config.i18n["Interest period"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('2) ' + config.i18n["Interest period"])
      }
    },
    ownMapSectionTitle: {
      ui: ui.Label('3) ' + config.i18n["Own map"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3) ' + config.i18n["Own map"])
      }
    },
    forestParametersSectionTitle: {
      ui: ui.Label('4) ' + config.i18n["Forest parameters"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('4) ' + config.i18n["Forest parameters"])
      }
    },
    newChangeMapSectionTitle: {
      ui: ui.Label('5) ' + config.i18n["New change map parameters"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('5) ' + config.i18n["New change map parameters"])
      }
    },
    landsatMosaicSectionTitle: {
      ui: ui.Label('6) ' + config.i18n["LANDSAT Mosaic"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('6) ' + config.i18n["LANDSAT Mosaic"])
      }
    },
    statisticsExportSectionTitle: {
      ui: ui.Label('7) ' + config.i18n["Export area statistics"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('7) ' + config.i18n["Export area statistics"])
      }
    },
    statisticsTitle: {
      ui: ui.Label(config.i18n["Forest change area"], {
        fontWeight: 'bold',
        fontSize: '15px',
        textAlign: 'center',
        stretch: 'horizontal'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Forest change area"])
      }
    },
    languageSelect: ui.Select({
      value: 'English',
      items: ['English', 'Español'],
      style: {
        margin: '0 0 0 15px',
        position: 'top-right'
      },
      onChange: function(key) {
        config.i18n = key == 'English' ?
          i18n.en : (
            key == 'Español' ?
            i18n.es :
            i18n.fr
          )
        updateUis()
      }
    }),
    pruebaButton: ui.Button({
      label: 'Prueba',
      style: { fontWeight: 'bold' },
      onClick: function() {
        print(config);
      }
    }),
  };
})();
var paneles = {
  workLimit: ui.Panel([
    uiElements.countrySelect.ui,
  ]),
  periodoDeTrabajo: ui.Panel([
    uiElements.periodoDeTrabajoSelect.ui,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  advancedConfigurationForOwnMap: ui.Panel([
    uiElements.advConfForOwnMapButton.ui,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  mapaUsuario: ui.Panel([
    uiElements.ownMapIdLabel.ui,
    uiElements.ownMapIdTextbox,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  coverPixelValues: ui.Panel([
    uiElements.coverPixelValuesLabel.ui,
    uiElements.coverPixelValuesTextbox,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  percentTreeCoverModis: ui.Panel([
    ui.Label(config.i18n["Tree cover MODIS(%) :"]),
    uiElements.percentTreeCoverModisSlider,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  levelOfAgreementBetweenMaps: ui.Panel([
    uiElements.levelOfAgreementBetweenMaps.ui,
    uiElements.levelOfAgreementBetweenMapsSlider,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  expandAdvancedConfForExportAreas: ui.Panel([
    uiElements.expandAdvancedConfForExportAreasButton.ui
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  advancedConfForExportAreas: ui.Panel([], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    border: '1px solid #D8D8D8',
    shown: false,
    margin: '0 0 0 15px',
  }),
  // ---------- subpaneles de panel estadisticas ----------
  estadistica1: ui.Panel([
    uiElements.statisticTitle1Label,
    uiElements.estadistica1Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  estadistica2: ui.Panel([
    uiElements.statisticTitle2Label,
    uiElements.estadistica2Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  estadistica4: ui.Panel([
    uiElements.statisticTitle4Label,
    uiElements.estadistica4Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  estadistica5: ui.Panel([
    uiElements.statisticTitle5Label,
    uiElements.estadistica5Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  statistic6: ui.Panel([
    uiElements.statisticTitle6Label,
    uiElements.statistic6Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  statistic7: ui.Panel([
    uiElements.statisticTitle7Label.ui,
    uiElements.statistic7Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px'
  }),
  buttons: ui.Panel([
    uiElements.mostrarButton.ui,
    uiElements.exportAreasButton.ui,
    uiElements.exportImagesButton.ui,
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
    margin: '10px 0'
  }),
};
function ElementsAdvancedConfForExportAreas(panel) {
  this.elements = {}
  this.panel = panel
  this.createElements()
}
// --- created checkbox for export areas ---
ElementsAdvancedConfForExportAreas.prototype.createElements = function() {
  var actual = this
  imageIds.forEach(function(imageId) {
    actual.elements[imageId] = ui.Checkbox({
      label: nameLayers[imageId](),
      value: true,
      onChange: function(checked) {
        config['export_' + imageId] = checked ? 1 : 0;
      }
    })
  })
}
ElementsAdvancedConfForExportAreas.prototype.refreshElements = function(workPeriod) {
  var imagesIdForWorkPeriod = Object.keys(parametersGenerator[workPeriod])
  var actual = this
  actual.panel.clear()
  imagesIdForWorkPeriod.forEach(function(imageId) {
    if (imageIds.indexOf(imageId) >= 0) {
      actual.panel.add(actual.elements[imageId])
    }
  })
}
var eleAdvConfForExportAreas = new ElementsAdvancedConfForExportAreas(paneles.advancedConfForExportAreas)
eleAdvConfForExportAreas.refreshElements(config.periodoDeTrabajo)
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
      uiElements.moduleTitle.ui,
      uiElements.countrySectionTitle.ui,
      paneles.workLimit,
      uiElements.interestPeriodSectionTitle.ui,
      paneles.periodoDeTrabajo,
      uiElements.ownMapSectionTitle.ui,
      paneles.advancedConfigurationForOwnMap,
      additionalPanels.advancedConfigurationForOwnMap,
      uiElements.forestParametersSectionTitle.ui,
      paneles.percentTreeCoverModis,
      uiElements.newChangeMapSectionTitle.ui,
      paneles.levelOfAgreementBetweenMaps,
      uiElements.landsatMosaicSectionTitle.ui,
      uiElements.landsatMosaicPanel.ui,
      uiElements.statisticsExportSectionTitle.ui,
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
      uiElements.statisticsTitle.ui,
      paneles.estadistica1,
      paneles.estadistica2,
      paneles.estadistica4,
      paneles.estadistica5,
      paneles.statistic6,
      paneles.statistic7,
    ],
    style: {
      width: '440px',
      position: 'bottom-right' //el panel se ubicara a lado inferior derecho sobre el mapa
    }
  })
};
uiElements.areasPanel = new panels.StatisticsPanel(config,
  'right',
  panelesPrincipales.estadisticas,
  false)
Map.setCenter(14.13, 12.39, 2)
ui.root.insert(0, panelesPrincipales.principal)
Map.add(uiElements.languageSelect)
uiElements.hybridMapLegend.ui.addToMap()