var style = require('users/gena/packages:style'),
  utils = require('users/kindgard/geoFRA:common/utils.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js'),
  variables = require('users/kindgard/geoFRA:common/variables.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n/module1.js')
var config = { //informacion que se usara para interfaz
  'informacion_adicional_de_tabla': 'Scripts FRA-online Beta', //informacion adicional que contendra la tabla de superficies a exportar
  linkLeyendasFuentes: 'https://drive.google.com/open?id=1PxAEP9NS0rPbH_zFq-6EMq073Sg4zGj9', //link de documento de leyendas y fuentes usadas en el script
  // ----- configuración para recursos cargados por el usuario -----
  ownMap: {
    ownMapId: "",
    pixelValuesForest: "",
    vectorId: "",
    isShownAdvConf: false
  },
  'pais': '',
  countryIso: 'URY',
  'treeCover': 10, //porcentaje de cobertura por defecto para global forest change de Hansen
  // ----- configuración para exportacion de superficies -----
  exportArea: {
    forest_gl30: true,
    forest_jaxa_fnf: true,
    forest_esa_glc: true,
    forest_hansen_gfc: true,
    forest_esa_africover: true,
    forest_tandemx_fnf: true,
    forest_copernicus_lc: true,
    new_cover_map: true,
  },
  // ----- configuración para mosaico landsat -----
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
  // ----- configuración para mosaico sentinel -----
  fechaInicialMosaicoSentinel: '2016-01-01',
  fechaFinalMosaicoSentinel: '2016-12-31',
  cloudyPixelPercentageMosaicoSentinel: 10, //es el cloud cover de sentinel
  cloudScoreMosaicoSentinel: 20, //valores menores de score de nubes seran enmascarados
  visParamsMosaicoSentinel: {
    bands: ['RED', 'GREEN', 'BLUE'],
    gamma: '1.6',
    min: '0',
    max: '0.4',
  },
  porcentajeProbabilidad: 75, //porcentaje de coincidencia minimo en los bosques para el mapa de probabilidad
  centrarVisorEnPais: true, //opcion que permite centrar el visor en el limite del pais
  i18n: i18n.en
}
var auxVariables = {
  // --- variables auxiliares que se usaran para controlar el estado de visualización de las configuraciones adicionales ---
  shownAdvancedConfOfResourceLoad: false,
  shownAdvConfOfSentinelMosaic: false,
  shownAdvConfOfAreasExport: false,
  configuracionAvanzadaExportarMapa: false,
  runnedForFirstTime: true
}
var imagesId = [
  'landsat_mosaic',
  'sentinel_mosaic',
  'forest_gl30',
  'forest_jaxa_fnf',
  'forest_esa_glc',
  'forest_hansen_gfc',
  'forest_esa_africover',
  'forest_tandemx_fnf',
  'forest_copernicus_lc',
  'user_map',
  'hybrid_map',
  'new_cover_map',
  'country_area',
]
var year = {
  'forest_gl30': 2010,
  'forest_hansen_gfc': 2020,
  'forest_esa_glc': 2009,
  'forest_esa_africover': 2017,
  'forest_jaxa_fnf': 2017,
  'forest_tandemx_fnf': 2019,
  'forest_copernicus_lc': 2019
}
var constantes = {
  visParamsMosaicoSentinel: {
    bands: ['RED', 'GREEN', 'BLUE'],
    gamma: '1.6',
    min: '0',
    max: '0.4',
  },
  textForImages: {
    forest_gl30: config.i18n['GlobeLand 30'] + ' ' + year.forest_gl30,
    forest_jaxa_fnf: config.i18n['Forest/No Forest(JAXA)'] + ' ' + year.forest_jaxa_fnf,
    forest_esa_glc: config.i18n['Global Land Cover(ESA)'] + ' ' + year.forest_esa_glc,
    forest_hansen_gfc: config.i18n['GFC(HANSEN)'] + ' ' + year.forest_hansen_gfc,
    forest_esa_africover: config.i18n['AfriCover(ESA)'] + ' ' + year.forest_esa_africover,
    forest_tandemx_fnf: config.i18n['Forest/Non-Forest(TanDEM-X)'] + ' ' + year.forest_tandemx_fnf,
    forest_copernicus_lc: config.i18n['Landcover 100m(COPERNICUS)'] + ' ' + year.forest_copernicus_lc,
    new_cover_map: config.i18n['New tree cover map']
  }
}
var parametersGenerator = {
  'forest_gl30': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_gl30',
      countryIso: config.countryIso,
      year: year['forest_gl30']
    }
  },
  'forest_hansen_gfc': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_hansen_gfc',
      countryIso: config.countryIso,
      version: year['forest_hansen_gfc'],
      year: year['forest_hansen_gfc'],
      treeCanopyCoverGfcHansen: config.treeCover
    }
  },
  'forest_esa_glc': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_esa_glc',
      countryIso: config.countryIso,
      year: year['forest_esa_glc']
    }
  },
  'forest_esa_africover': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_esa_africover',
      countryIso: config.countryIso,
      year: year['forest_esa_africover']
    }
  },
  'forest_jaxa_fnf': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_jaxa_fnf',
      countryIso: config.countryIso,
      year: year['forest_jaxa_fnf']
    }
  },
  'forest_tandemx_fnf': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_tandemx_fnf',
      countryIso: config.countryIso,
      year: year['forest_tandemx_fnf']
    }
  },
  forest_copernicus_lc: function() {
    return {
      countryIso: config.countryIso,
      imageId: 'forest',
      forestImageId: 'forest_copernicus_lc',
      year: year.forest_copernicus_lc
    }
  },
  'user_map': function() {
    return {
      imageId: 'user_map',
      countryIso: config.countryIso,
      ownMapId: config.ownMap.ownMapId,
      coverPixelValues: config.ownMap.pixelValuesForest,
    }
  },
  'hybrid_map': function() {
    return {
      imageId: 'hybrid_map',
      countryIso: config.countryIso,
      imagesParametersForGenerateHybridMap: [ // forests to generate the hybrid map
        { imageId: 'forest', forestImageId: 'forest_gl30', year: 2010 },
        { imageId: 'forest', forestImageId: 'forest_hansen_gfc', year: 2019, version: 2019 },
        { imageId: 'forest', forestImageId: 'forest_esa_glc', year: 2009 },
        { imageId: 'forest', forestImageId: 'forest_esa_africover', year: 2017 },
        { imageId: 'forest', forestImageId: 'forest_jaxa_fnf', year: 2017 },
        { imageId: 'forest', forestImageId: 'forest_tandemx_fnf', year: 2019 },
        { imageId: 'forest', forestImageId: 'forest_copernicus_lc', year: 2019 },
        // { imageId: 'user_map' }
      ],
      treeCanopyCoverGfcHansen: config.treeCover,
      ownMapId: config.ownMap.ownMapId, //id de raster en asset que representa mapa local de bosque de pais
      forestPixelValues: config.ownMap.pixelValuesForest, //lista valores de pixel que representan bosque en el mapa local ingresado por el usuario, tendra el formato [1,2,3,...]
    }
  },
  'new_cover_map': function(parametersForGenerateImage) {
    parametersForGenerateImage = typeof(parametersForGenerateImage) == 'undefined' ? true : parametersForGenerateImage
    var oficialsLevels = {
      5: [
        { round: 0, exact: 0 },
        { round: 20, exact: 20 },
        { round: 40, exact: 40 },
        { round: 60, exact: 60 },
        { round: 80, exact: 80 },
        { round: 100, exact: 100 }
      ],
      6: [
        { round: 0, exact: 0 },
        { round: 15, exact: 16.66 },
        { round: 32, exact: 33.33 },
        { round: 49, exact: 50 },
        { round: 65, exact: 66.66 },
        { round: 82, exact: 83.33 },
        { round: 100, exact: 100 }
      ],
      7: [
        { round: 0, exact: 0 },
        { round: 13, exact: 14.28 },
        { round: 27, exact: 28.57 },
        { round: 41, exact: 42.85 },
        { round: 56, exact: 57.14 },
        { round: 70, exact: 71.42 },
        { round: 84, exact: 85.71 },
        { round: 100, exact: 100 },
      ]
    }
    function getRoundLevelOfAgreementBetweenMaps(level) {
      var numberOfImagesUsedForHybridMap = getNumberOfImagesUsedForHybridMap()
      var oficialLevel = oficialsLevels[numberOfImagesUsedForHybridMap]
      for (var index = 0; index < oficialLevel.length; index++) {
        var currentValue = oficialLevel[index]
        var nextValue = oficialLevel[index + 1]
        if (currentValue.exact < level && level <= nextValue.exact)
          return nextValue.round
      }
    }
    return parametersForGenerateImage ? {
      imageId: 'new_cover_map',
      countryIso: config.countryIso,
      levelOfAgreementBetweenMaps: config.porcentajeProbabilidad,
      treeCanopyCoverGfcHansen: config.treeCover,
      // ownMapId: config.ownMap.ownMapId, //id de raster en asset que representa mapa local de bosque de pais
      // forestPixelValues: config.ownMap.pixelValuesForest, //lista valores de pixel que representan bosque en el mapa local ingresado por el usuario, tendra el formato [1,2,3,...]    }
      imagesParametersForGenerateHybridMap: [ // forests to generate the hybrid map
        { imageId: 'forest', forestImageId: 'forest_gl30', year: 2010 },
        { imageId: 'forest', forestImageId: 'forest_hansen_gfc', year: 2019, version: 2019 },
        { imageId: 'forest', forestImageId: 'forest_esa_glc', year: 2009 },
        { imageId: 'forest', forestImageId: 'forest_esa_africover', year: 2017 },
        { imageId: 'forest', forestImageId: 'forest_jaxa_fnf', year: 2017 },
        { imageId: 'forest', forestImageId: 'forest_tandemx_fnf', year: 2019 },
        { imageId: 'forest', forestImageId: 'forest_copernicus_lc', year: 2019 },
        // { imageId: 'user_map' }
      ],
    } : { // parameters for read precalculated areas
      imageId: 'new_cover_map',
      countryIso: config.countryIso,
      levelOfAgreementBetweenMaps: getRoundLevelOfAgreementBetweenMaps(config.porcentajeProbabilidad),
      treeCanopyCoverGfcHansen: config.treeCover,
    }
  },
  'country_area': function() {
    return {
      imageId: 'country_area',
      countryIso: config.countryIso
    }
  },
  'landsat_mosaic': function() {
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
  'sentinel_mosaic': function() {
    return auxVariables.shownAdvConfOfSentinelMosaic ? {
      imageId: 'sentinel_mosaic',
      countryIso: config.countryIso,
      initialDate: config.fechaInicialMosaicoSentinel,
      finalDate: config.fechaFinalMosaicoSentinel,
      cloudyPixelPercentage: config.cloudyPixelPercentageMosaicoSentinel,
      cloudScore: config.cloudScoreMosaicoSentinel,
    } : {
      imageId: 'sentinel_mosaic',
      countryIso: config.countryIso,
      initialDate: config.fechaInicialMosaicoSentinel,
      finalDate: config.fechaFinalMosaicoSentinel,
    }
  },
}
function getNumberOfImagesUsedForHybridMap() {
  var imageParameters = parametersGenerator.new_cover_map(true)
  var result = utils.getImage(imageParameters)
  return result.numberOfImagesUsed
}
var textForLayers = {}
function updateTextForLayers() {
  textForLayers = {
    'background': config.i18n['Background'],
    'background-hybridmap': config.i18n['Background: Global hybrid map'],
    'landsat_mosaic': config.i18n["mosaico LANDSAT"],
    'sentinel_mosaic': config.i18n["mosaico SENTINEL"],
    'forest_gl30': config.i18n["GlobeLand 30"] + ' ' + year.forest_gl30,
    'forest_hansen_gfc': config.i18n["GFC(HANSEN)"] + ' ' + year['forest_hansen_gfc'] + ', ' + config.treeCover + '%',
    'forest_esa_glc': config.i18n["Global Land Cover(ESA)"] + ' ' + year.forest_esa_glc,
    'forest_esa_africover': config.i18n["AfriCover(ESA)"] + ' ' + year.forest_esa_africover,
    'forest_jaxa_fnf': config.i18n['Forest/No Forest(JAXA)'] + ' ' + year['forest_jaxa_fnf'],
    'forest_tandemx_fnf': 'Forest/Non-Forest(TanDEM-X)' + ' ' + year['forest_tandemx_fnf'],
    'forest_copernicus_lc': 'Landcover 100m(COPERNICUS)' + ' ' + year['forest_copernicus_lc'],
    'country_area': config.i18n["Total national area"],
    'user_map': config.i18n["recurso agregado: mapa de bosque usuario"],
    'hybrid_map': config.i18n["mapa de probabilidad"],
    'new_cover_map': config.i18n["Nuevo mapa de bosque(nivel de acuerdo mayor a"] + ' ' + config.porcentajeProbabilidad + '%)',
    'resource': config.i18n["recurso agregado: vector"],
  }
}
function showLayers() {
  updateTextForLayers()
  elementos.layersManager.resetExcept(['background'])
  // ----- obteniendo bosque de las diferentes fuentes -----
  var forestImageList = imagesId.map(function(imageId) {
    var result
    try {
      if (imageId == 'country_area' ||
        imageId == 'user_map' && (
          !config.ownMap.isShownAdvConf || !config.ownMap.ownMapId
        )) //si el usuario desplego la configuracion adicional de 'carga de recursos' y agrego un id de asset se tomara en cuenta su mapa de bosque para la visualizacion
        throw "Error"
      var imageParameters = parametersGenerator[imageId]()
      result = utils.getImage(imageParameters,
        imageId == 'hybrid_map' || imageId == 'landsat_mosaic' || imageId == 'sentinel_mosaic' ?
        false :
        true,
        imageId == 'hybrid_map' || imageId == 'landsat_mosaic' || imageId == 'sentinel_mosaic' ?
        false :
        true)
      return {
        imageId: imageId,
        result: result
      }
    } catch (exception) {
      null
    }
  })
  var numberOfImagesUsedForHybridMap = getNumberOfImagesUsedForHybridMap()
  var configurationForLegend = variables.paletteAndTextsForHybridMapLegend[numberOfImagesUsedForHybridMap]
  elementos.hybridMapLegend.ui.refresh(configurationForLegend)
  var visualizationParameters = {
    'sentinel_mosaic': config.shownAdvConfOfSentinelMosaic ?
      config.visParamsMosaicoSentinel : constantes.visParamsMosaicoSentinel,
    'landsat_mosaic': config.landsatMosaic.isShownAdvConf ?
      config.landsatMosaic.visParams : null,
    'forest_gl30': { palette: '7cfc00' },
    'forest_hansen_gfc': { palette: '2EFE64' },
    'forest_esa_glc': { palette: '3ADF00' },
    'forest_esa_africover': { palette: '2E8B57' },
    'forest_jaxa_fnf': { palette: '04B431' },
    'forest_tandemx_fnf': { palette: '33ffd4' },
    forest_copernicus_lc: { palette: '015401' },
    'user_map': { palette: '298A08' },
    'hybrid_map': variables.visualizationParametersOfLayers.hybrid_map,
    'new_cover_map': { palette: '0B6121' }
  }
  forestImageList.map(function(imageIdAndResult) {
    if (typeof(imageIdAndResult) != 'undefined') {
      var imageId = imageIdAndResult.imageId
      var image = imageIdAndResult.result.image
      if (imageId == 'hybrid_map') {
        var numberOfImagesUsed = imageIdAndResult.result.numberOfImagesUsed
        elementos.layersManager.add(ui.Map.Layer(image,
          visualizationParameters[imageId][numberOfImagesUsed],
          textForLayers[imageId], false), imageId)
      } else {
        elementos.layersManager.add(ui.Map.Layer(image,
          imageIdAndResult.result.visParams ?
          imageIdAndResult.result.visParams :
          visualizationParameters[imageId],
          textForLayers[imageId], false), imageId)
      }
    }
  })
  if (config.ownMap.isShownAdvConf && config.idVector) //si el usuario expandio el panel de carga de recursos y establecio un id de vector, entonces se muestra el vector
    elementos.layersManager.add(ui.Map.Layer(ee.FeatureCollection(config.idVector),
      null,
      textForLayers['resource'],
      false), 'resource')
}
function showStatistics() {
  var statisticsPanelElementText = {
    'forest_gl30': elementos.estadistica1Label,
    'forest_hansen_gfc': elementos.estadistica2Label,
    'forest_esa_glc': elementos.estadistica3Label,
    'forest_esa_africover': elementos.estadistica4Label,
    'forest_jaxa_fnf': elementos.estadistica5Label,
    'forest_tandemx_fnf': elementos.estadistica6Label,
    forest_copernicus_lc: elementos.estadistica9Label,
    'new_cover_map': elementos.estadistica7Label,
    'country_area': elementos.estadistica8Label
  }
  var percentagesPanelElementText = {
    'forest_gl30': elementos.estadisticaPorcentaje1Label,
    'forest_hansen_gfc': elementos.estadisticaPorcentaje2Label,
    'forest_esa_glc': elementos.estadisticaPorcentaje3Label,
    'forest_esa_africover': elementos.estadisticaPorcentaje4Label,
    'forest_jaxa_fnf': elementos.estadisticaPorcentaje5Label,
    'forest_tandemx_fnf': elementos.estadisticaPorcentaje6Label,
    forest_copernicus_lc: elementos.estadisticaPorcentaje8Label,
    'new_cover_map': elementos.estadisticaPorcentaje7Label,
  }
  // --------------- calculo de superficies y porcentajes de bosque para un pais ---------------
  function calculatePercentage(precalculatedAreas, imageId, percentagesPanelElementText) {
    if (imageId != 'country_area') {
      var percentage = precalculatedAreas[imageId].divide(precalculatedAreas['country_area'])
        .multiply(100)
        .format('%.2f')
      percentage.evaluate(function(value) {
        percentagesPanelElementText[imageId].setValue(value + '%')
      })
    }
  }
  var precalculatedAreas = getPrecalculatedAreas() //se lee todas las areas para todas las fuentes de imagenes para un determinado pais
  Object.keys(precalculatedAreas).forEach(function(imageId) {
    var area = precalculatedAreas[imageId]
    if (imageId == 'forest_esa_africover' && variables.africaIso.indexOf(config.countryIso) == -1) {
      statisticsPanelElementText[imageId].setValue('- - - - -')
      percentagesPanelElementText[imageId].setValue('- - - - -');
    } else {
      area.evaluate(function(area) {
        if (area >= 0) {
          statisticsPanelElementText[imageId].setValue(Math.floor(area)
            .toLocaleString('en-US') + ' ha.')
          calculatePercentage(precalculatedAreas, imageId, percentagesPanelElementText)
        } else {
          var imageParameters = parametersGenerator[imageId]()
          precalculatedAreas[imageId] = utils.calculateArea(imageParameters)
          precalculatedAreas[imageId].evaluate(function(area, error) {
            if (error) {
              statisticsPanelElementText[imageId].setValue(config.i18n["Comp. time out"])
              percentagesPanelElementText[imageId].setValue(config.i18n["Comp. time out"])
            } else {
              statisticsPanelElementText[imageId].setValue(Math.floor(Number(area))
                .toLocaleString('en-US') + ' ha.')
              calculatePercentage(precalculatedAreas, imageId, percentagesPanelElementText)
            }
          })
        }
      })
    }
  })
}
// funcion para leer el area de bosque para todas las fuentes de un determinado pais
function getPrecalculatedAreas() {
  var areas = {}
  imagesId.map(function(imageId) {
    if (imageId != 'hybrid_map' &&
      imageId != 'user_map' &&
      imageId != 'landsat_mosaic' &&
      imageId != 'sentinel_mosaic') {
      var imageParameters = parametersGenerator[imageId](false)
      areas[imageId] = utils.getArea(imageParameters, 'module1')
    }
  })
  return areas
}
function getAreasForAllImages() {
  function getAreaBySourceSpecific(params, allAreasFc) {
    function convertParamsToFilter(params) {
      var filters
      var sw = true
      for (var key in params) {
        if (sw) {
          filters = ee.Filter.and(ee.Filter.eq(key, params[key]))
          sw = false
        }
        filters = ee.Filter.and(filters, ee.Filter.eq(key, params[key]))
      }
      return filters
    }
    if (params.imageId == 'country_area')
      return utils.getArea(params).floor().getInfo()
    var paramsFilter = convertParamsToFilter(params)
    var row = ee.Feature(allAreasFc.filter(paramsFilter)
      .first())
    var area = ee.Algorithms.If(row,
      ee.Algorithms.If(row.get('area'),
        ee.Number(row.get('area')).floor(),
        0),
      null)
    return area.getInfo()
  }
  var areas = {}
  var allAreasFc = utils.getArea({ countryIso: config.countryIso }, 'module1', true)
  imagesId.forEach(function(imageId) {
    if (imageId != 'landsat_mosaic' &&
      imageId != 'sentinel_mosaic' &&
      imageId != 'hybrid_map' &&
      imageId != 'user_map') {
      var params = parametersGenerator[imageId]()
      var area = getAreaBySourceSpecific(params, allAreasFc)
      areas[imageId] = area
    }
  })
  return areas
}
function getDataTable() {
  function getRows(allAreas) {
    var rows = Object.keys(allAreas).map(function(imageId) {
      return {
        c: [{ v: textForLayers[imageId] },
          { v: allAreas[imageId] },
        ]
      }
    })
    return rows
  }
  function convertToDataTable(allAreas) {
    var rows = getRows(allAreas)
    return {
      cols: [
        { id: 'hours', label: 'Source', type: 'string' },
        { id: 'hours', label: 'Area', type: 'number' },
      ],
      rows: rows
    }
  }
  var allAreas = getAreasForAllImages()
  var dataTable = convertToDataTable(allAreas)
  return dataTable
}
function showStatisticsGraph() {
  updateTextForLayers()
  elementos.statisticsGraph.show()
}
function showStatisticsTable() {
  updateTextForLayers()
  elementos.statisticsTable.show()
}
/*
Se exporta por defecto todas las fuentes de bosque. Si el usuario expandio la conf. adicional
entonces se exporta solo las fuentes que seleccione el usuario
*/
function exportStatistics() {
  var dataToExport = {
    forest_gl30: config.exportArea.forest_gl30 || !auxVariables.shownAdvConfOfAreasExport,
    forest_hansen_gfc: config.exportArea.forest_hansen_gfc || !auxVariables.shownAdvConfOfAreasExport,
    forest_esa_glc: config.exportArea.forest_esa_glc || !auxVariables.shownAdvConfOfAreasExport,
    forest_esa_africover: (variables.africaIso.indexOf(config.countryIso) >= 0) && (config.exportArea.forest_esa_africover || !auxVariables.shownAdvConfOfAreasExport), //si se marco para exportar superficie AfriCover(ESA) y + ' ' + year.forest_esa_africover el pais es africano entonces se exporta la superficie de tal fuente,
    forest_jaxa_fnf: config.exportArea.forest_jaxa_fnf || !auxVariables.shownAdvConfOfAreasExport,
    forest_tandemx_fnf: config.exportArea.forest_tandemx_fnf || !auxVariables.shownAdvConfOfAreasExport,
    forest_copernicus_lc: config.exportArea.forest_copernicus_lc || !auxVariables.shownAdvConfOfAreasExport,
    user_map: false,
    hybrid_map: false,
    new_cover_map: config.exportArea.new_cover_map || !auxVariables.shownAdvConfOfAreasExport,
    country_area: false,
  }
  var nameColumnForImage = {
    forest_gl30: constantes.textForImages.forest_gl30,
    forest_hansen_gfc: config.i18n["GFC(HANSEN)"] + ' ' + year.forest_hansen_gfc + ', ' + config.treeCover + '%',
    forest_esa_glc: constantes.textForImages.forest_esa_glc,
    forest_esa_africover: constantes.textForImages.forest_esa_africover,
    forest_jaxa_fnf: constantes.textForImages.forest_jaxa_fnf,
    forest_tandemx_fnf: constantes.textForImages.forest_tandemx_fnf,
    forest_copernicus_lc: constantes.textForImages.forest_copernicus_lc,
    new_cover_map: config.i18n["Nuevo mapa de bosque(nivel de acuerdo mayor a"] + ' ' + config.porcentajeProbabilidad + '%' + ')'
  }
  var aditionalInformation = {
    '0_Module': config.i18n['Área de bosques'], //establecemos el titulo de la tabla
    '0_Source': config.informacion_adicional_de_tabla, // establecemos la informacion adicional que contendra la tabla
    '0_Country': config.pais,
    '0_Unit': 'Hectare'
  }
  var imagesIdFiltered = imagesId.filter(function(imageId) {
    return dataToExport[imageId]
  })
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
    description: 'areas_' + config.pais,
    fileFormat: 'CSV'
  })
}
function exportarMapas() {
  // ----- obteniendo bosque de las diferentes fuentes -----
  var imageList = []
  imagesId.forEach(function(imageId) {
    var result
    try {
      if (imageId != 'user_map' &&
        imageId != 'country_area') {
        var imageParameters = parametersGenerator[imageId]()
        result = utils.getImage(imageParameters, imageId == 'hybrid_map' ? false : true)
        imageList.push({
          imageId: imageId,
          result: result
        })
      }
    } catch (exception) {
      null
    }
  })
  imageList.forEach(function(imageIdAndResult) {
    var imageId = imageIdAndResult.imageId
    var result = imageIdAndResult.result
    Export.image.toAsset({
      assetId: imageId + '_' + config.countryIso,
      image: result.image,
      region: utils.getLimitCountry(config.countryIso),
      description: imageId + '_' + config.countryIso,
      maxPixels: 5000000000000,
      crs: 'EPSG:4326',
      crsTransform: [0.00025, 0, -180, 0, -0.00025, 80]
    });
  })
}
function exportarParametrosBosqueProbabilidad() {
  var parametrosAExportar = {
    pais: config.pais,
    treeCover: config.treeCover,
    porcentajeProbabilidad: config.porcentajeProbabilidad,
    landsatMosaic: {
      startDate: config.landsatMosaic.startDate,
      endDate: config.landsatMosaic.endDate,
    },
    fechaInicialMosaicoSentinel: config.fechaInicialMosaicoSentinel,
    fechaFinalMosaicoSentinel: config.fechaFinalMosaicoSentinel,
  }
  // se exporta parametros de mapa de usuario si el subpanel de conf. esta expandido y se el usuario conf. correctamente los par. del mapa de usuario
  if (config.ownMap.isShownAdvConf) {
    parametrosAExportar.ownMap.ownMapId = config.ownMap.ownMapId;
    parametrosAExportar.ownMap.pixelValuesForest = config.ownMap.pixelValuesForest;
  }
  // se exporta parametros de mosaico landsat si el subpanel de conf. esta expandido
  if (config.landsatMosaic.isShownAdvConf) {
    parametrosAExportar.landsatMosaic.imageSource = config.imageSource;
    parametrosAExportar.landsatMosaic.cloudScore = config.cloudScore;
    parametrosAExportar.landsatMosaic.percentile = config.percentile;
    parametrosAExportar.landsatMosaic.visParams = config.visParams;
  }
  // se exporta parametros de mosaico sentinel si el subpanel de conf. esta expandido
  if (auxVariables.shownAdvConfOfSentinelMosaic) {
    parametrosAExportar.cloudyPixelPercentageMosaicoSentinel = config.cloudyPixelPercentageMosaicoSentinel;
    parametrosAExportar.cloudScoreMosaicoSentinel = config.cloudScoreMosaicoSentinel;
    parametrosAExportar.visParamsMosaicoSentinel = config.visParamsMosaicoSentinel;
  }
  alert("\t\t\t\t\t\t\t\t\t\t\t\t\t----- " + config.i18n["Parámetros de script"] + " -----\n\n" +
    JSON.stringify(parametrosAExportar))
}
function exportarMosaicoLandsat() {
  var countryLimit = utils.getLimitCountry(config.countryIso)
  Map.centerObject(countryLimit, 6)
  var result = utils.generateNumerateGrids(countryLimit)
  var grids = result.grids
  var gridsImage = result.gridsImage
  var numbersImage = result.numbersImage
  var params = parametersGenerator['landsat_mosaic']()
  var imageResult = utils.getImage(params, false, false)
  var landsatMosaic = imageResult.image
  var bands = config.landsatMosaic.isShownAdvConf ?
    config.landsatMosaic.visParams.bands :
    imageResult.visParams.bands
  var landsatMosaicList = grids.map(function(grilla) {
    return landsatMosaic.clip(grilla)
  })
  landsatMosaicList = landsatMosaicList.toList(ee.Number(landsatMosaicList.size()))
  var cantidadImagenes = landsatMosaicList.size().getInfo()
  var gridList = grids.toList(cantidadImagenes)
  for (var i = 0; i < cantidadImagenes; i++) {
    var imagen = ee.Image(landsatMosaicList.get(i)).select(bands)
    Export.image.toDrive({
      image: imagen,
      description: 'landsat_mosaic_' + config.pais + "_" + (i + 1),
      maxPixels: 5000000000000,
      region: ee.Feature(gridList.get(i)).geometry(),
      'crs': 'EPSG:32719',
      'crsTransform': [30, 0, 546585, 0, -30, 8040955]
    })
  }
  Map.addLayer(gridsImage, { palette: ['0000ff'], opacity: 0.8 }, 'grids')
  Map.addLayer(numbersImage, null, 'numbers of grids')
}
function areInvalidsDates(startDate, endDate, imageSource, isShownAdvConf) {
  // si los rangos de gestiones estan fuera de la disponibilidad de imagenes se muestra un mensaje de error
  if (startDate < 1984 || endDate < 1984)
    return "Sección 4.1. Rango de fechas erróneo para sensor Landsat"
  // --- si los rangos de fechas estan fuera de las fechas en las cuales estan disponibles las fuentes de imagenes, se lanzan mensajes de error ---
  if (isShownAdvConf &&
    imageSource == 'LT5_L1T' && (
      startDate < 1984 ||
      2012 < startDate ||
      endDate < 1984 ||
      2012 < endDate)
  )
    return "Sección 4.1. Rango de fechas erróneo para la fuente de imágenes escogida"
  if (isShownAdvConf &&
    imageSource == 'LE7_L1T' && (
      startDate < 1999 ||
      2017 < startDate ||
      startDate < 1999 ||
      2017 < startDate)
  )
    return "Sección 4.1. Rango de fechas erróneo para la fuente de imágenes escogida"
  if (isShownAdvConf &&
    imageSource == 'LC08/C01/T1_RT' &&
    (startDate < 2013 || endDate < 2013)
  )
    return "Sección 4.1. Rango de fechas erróneo para la fuente de imágenes escogida"
}
/*funcion que verificara la validez de todos los parametros de configuracion si existen alguna conf. invalida
se devolvera un mensaje de alerta, caso contrario 'false' que indica que no hay ningun 
parametro invalido*/
function existenParametrosInvalidosDeConfiguracion() {
  if (!config.pais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  //si se muestra conf. avanzada de de recursos de usuario y se carga un id de mapa de usuario pero no se especifica los valores de pixel de bosque del mismo, entonces se muestra un mensaje de error
  if (config.ownMap.isShownAdvConf &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest))
    return 'Sección 2: Id de mapa de usuario o valores de píxel no especificados'
  // ----- validacion para mosaico landsat -----
  var result = areInvalidsDates(config.landsatMosaic.startDate,
    config.landsatMosaic.endDate,
    config.landsatMosaic.imageSource,
    config.landsatMosaic.isShownAdvConf)
  if (result)
    return result
  // ----- validacion para mosaico sentinel -----
  var gestionInicialMosaicoSentinel = config.fechaInicialMosaicoSentinel.split("-")[0];
  var gestionFinalMosaicoSentinel = config.fechaFinalMosaicoSentinel.split("-")[0];
  // si los rangos de gestiones estan fuera de la disponibilidad de imagenes se muestra un mensaje de error
  if (gestionInicialMosaicoSentinel < 2015 ||
    gestionFinalMosaicoSentinel < 2015 ||
    gestionInicialMosaicoSentinel > 2018 ||
    gestionFinalMosaicoSentinel > 2018)
    return "Sección 5. Rango de fechas erróneo para sensor Sentinel 2"
  return false;
}
function existenParametrosInvalidosDeConfiguracionexportStatistics() {
  if (!config.pais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  //si se selecciono exportar el area de mapa de bosque obtenido en base al mapa de probabilidad y se ingreso un id de mapa de usuario y no se especifico valores de pixel de bosque entonces no se podra obtener el mapa de probabilida por lo tanto habra un error
  if (config.exportarSuperficieMapaBosque &&
    config.ownMap.isShownAdvConf &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest))
    return 'Sección 2: Id de mapa de usuario o valores de píxel no especificados, no se podrá exportar la superficie del mapa de bosque obtenido a partir del mapa de probabilidad'
  return false;
}
function existenParametrosInvalidosDeConfiguracionExportarMapas() {
  if (!config.pais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  //si se expandio la opciones avanzadas de la seccion 2 y se especifico un id de mapa de usuario pero no valores de pixel, nose podra generar el mapa de probabilidad ni el mapa de bosque obtenido a partir del mismo
  if (config.ownMap.isShownAdvConf &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest))
    return 'Sección 2: Id de mapa de usuario o valores de píxel no especificados, no se podrá exportar el mapa de bosque obtenido a partir del mapa de probabilidad'
  return false
}
function existenParametrosInvalidosDeConfiguracionExportarParametros() {
  if (!config.pais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  //si se expandio la opciones avanzadas de la seccion 2 y se especifico un id de mapa de usuario pero no valores de pixel entonces los parametros a exportar tendra inconsistencia
  if (config.ownMap.isShownAdvConf &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest))
    return 'Sección 2: Id de mapa de usuario o valores de píxel no especificados, se intenta exportar un mapa de usuario sin valores de píxel para bosque'
  return false;
}
function existenParametrosInvalidosDeConfiguracionExportarMosaicoLandsat() {
  if (!config.pais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  // ----- validacion para mosaico landsat -----
  var result = areInvalidsDates(config.landsatMosaic.startDate,
    config.landsatMosaic.endDate,
    config.landsatMosaic.imageSource,
    config.landsatMosaic.isShownAdvConf)
  if (result)
    return result
  return false;
}
function updateUis() {
  updateTextForLayers()
  for (var key in elementos)
    if (elementos[key].updateUi)
      elementos[key].updateUi()
}
// --------------- interfaz de usuario ---------------
var elementos = (function() {
  var paises = utils.getNameAndIsoCountry(); //contendra pares de clave, valor de los nombres de paises
  var bandasAVisualizar = {
    'BLUE': 'BLUE',
    'GREEN': 'GREEN',
    'RED': 'RED',
    'NIR': 'NIR',
    'SWIR1': 'SWIR1',
    'SWIR2': 'SWIR2',
  };
  return {
    countrySelect: {
      ui: ui.Select({
        value: config.pais ? config.pais : null,
        placeholder: config.i18n["Seleccione un país"],
        items: Object.keys(paises),
        style: {
          margin: '0 0 0 15px'
        },
        onChange: function(key) {
          config.pais = key;
          config.countryIso = paises[key];
        }
      }),
      updateUi: function() {
        this.ui.setPlaceholder(config.i18n["Seleccione un país"])
      }
    },
    ownMapPanel: new panels.OwnMapPanel(config),
    treeCover: {
      ui: ui.Label(config.i18n["Tree cover Hansen(%) :"], { padding: '5px 0' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Tree cover Hansen(%) :"])
      }
    },
    treeCoverSlider: ui.Slider({
      value: config.treeCover,
      min: 0,
      max: 100,
      step: 10,
      style: { width: '250px', margin: '0 42px' },
      onChange: function(value) {
        config.treeCover = value;
      }
    }),
    porcentajeProbabilidad: {
      ui: ui.Label(config.i18n["Level min. of agreement between maps(%) :"], { padding: '5px 0' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Level min. of agreement between maps(%) :"])
      }
    },
    porcentajeProbabilidadSlider: ui.Slider({
      value: config.porcentajeProbabilidad,
      min: 1,
      max: 100,
      step: 1,
      style: { width: '250px', margin: '0 42px' },
      onChange: function(value) {
        config.porcentajeProbabilidad = value;
      }
    }),
    landsatMosaicPanel: new panels.LandsatMosaicPanel(config.landsatMosaic, config),
    // ----- elementos UI de mosaico sentinel -----
    initialDateOfSentinelMosaic: {
      ui: ui.Label(config.i18n["Fecha inicial :"], { padding: '5px 0' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Fecha inicial :"])
      }
    },
    finalDateOfSentinelMosaic: {
      ui: ui.Label(config.i18n["Fecha final :"], { padding: '5px 0' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Fecha final :"])
      }
    },
    fechaInicialMosaicoSentinelTextbox: ui.Textbox({
      value: config.fechaInicialMosaicoSentinel ? config.fechaInicialMosaicoSentinel : null,
      placeholder: 'YYYY-MM-DD',
      style: { width: '90px', },
      onChange: function(value) {
        config.fechaInicialMosaicoSentinel = value ? value : null; //si el usuario ecribe una cadena vacia se coloca el valor en null
      }
    }),
    fechaFinalMosaicoSentinelTextbox: ui.Textbox({
      value: config.fechaFinalMosaicoSentinel ? config.fechaFinalMosaicoSentinel : null,
      placeholder: 'YYYY-MM-DD',
      style: { width: '90px', },
      onChange: function(value) {
        config.fechaFinalMosaicoSentinel = value ? value : null; //si el usuario ecribe una cadena vacia se coloca el valor en null
      }
    }),
    confAdvOfSentinelMosaicButton: {
      ui: ui.Button({
        label: config.i18n["More >>"],
        style: { fontWeight: 'bold' },
        onClick: function() {
          auxVariables.shownAdvConfOfSentinelMosaic = !auxVariables.shownAdvConfOfSentinelMosaic
          panelesAdicionales.advConfSentinelMosaicPanel.style().set('shown', auxVariables.shownAdvConfOfSentinelMosaic)
          elementos.confAdvOfSentinelMosaicButton.ui.setLabel(auxVariables.shownAdvConfOfSentinelMosaic ?
            config.i18n["<< Less"] :
            config.i18n["More >>"]
          )
        }
      }),
      updateUi: function() {
        this.ui.setLabel(auxVariables.shownAdvConfOfSentinelMosaic ?
          config.i18n["<< Less"] :
          config.i18n["More >>"])
      }
    },
    cloudyPixelPercentageMosaicoSentinelSlider: ui.Slider({
      value: config.cloudyPixelPercentageMosaicoSentinel ? config.cloudyPixelPercentageMosaicoSentinel : null,
      min: 0,
      max: 100,
      step: 1,
      style: { width: '250px', margin: '0 42px' },
      onChange: function(value) {
        config.cloudyPixelPercentageMosaicoSentinel = value;
      }
    }),
    cloudScoreMosaicoSentinelSlider: ui.Slider({
      value: config.cloudScoreMosaicoSentinel ? config.cloudScoreMosaicoSentinel : null,
      min: 0,
      max: 100,
      step: 1,
      style: { width: '250px', margin: '0 42px' },
      onChange: function(value) {
        config.cloudScoreMosaicoSentinel = value;
      }
    }),
    sentinelMosaicBands: {
      ui: ui.Label(config.i18n["Bandas :"], { padding: '5px 0' }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Bandas :"])
      }
    },
    bandaRedMosaicoSentinelSelect: ui.Select({
      value: config.visParamsMosaicoSentinel.bands[0] ? config.visParamsMosaicoSentinel.bands[0] : null,
      placeholder: 'R',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        config.visParamsMosaicoSentinel.bands[0] = bandasAVisualizar[key];
      }
    }),
    bandaGreenMosaicoSentinelSelect: ui.Select({
      value: config.visParamsMosaicoSentinel.bands[1] ? config.visParamsMosaicoSentinel.bands[1] : null,
      placeholder: 'G',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        config.visParamsMosaicoSentinel.bands[1] = bandasAVisualizar[key];
      }
    }),
    bandaBlueMosaicoSentinelSelect: ui.Select({
      value: config.visParamsMosaicoSentinel.bands[2] ? config.visParamsMosaicoSentinel.bands[2] : null,
      placeholder: 'B',
      items: Object.keys(bandasAVisualizar),
      onChange: function(key) {
        config.visParamsMosaicoSentinel.bands[2] = bandasAVisualizar[key];
      }
    }),
    minMosaicoSentinelTextBox: ui.Textbox({
      value: config.visParamsMosaicoSentinel.min ? config.visParamsMosaicoSentinel.min : null,
      placeholder: '0',
      style: { width: '50px', },
      onChange: function(value) {
        config.visParamsMosaicoSentinel.min = value;
      }
    }),
    maxMosaicoSentinelTextBox: ui.Textbox({
      value: config.visParamsMosaicoSentinel.max ? config.visParamsMosaicoSentinel.max : null,
      placeholder: '0',
      style: { width: '50px', },
      onChange: function(value) {
        config.visParamsMosaicoSentinel.max = value;
      }
    }),
    gammaMosaicoSentinelTextBox: ui.Textbox({
      value: config.visParamsMosaicoSentinel.gamma ? config.visParamsMosaicoSentinel.gamma : null,
      placeholder: '0',
      style: { width: '100px', },
      onChange: function(value) {
        config.visParamsMosaicoSentinel.gamma = value;
      }
    }),
    // ----- elementos UI de exportacion de superficies de fuentes de imagenes -----
    advConfAreasExportButton: {
      ui: ui.Button({
        label: config.i18n["More >>"],
        style: { fontWeight: 'bold' },
        onClick: function() {
          auxVariables.shownAdvConfOfAreasExport = !auxVariables.shownAdvConfOfAreasExport
          paneles.areasExport.style().set('shown', auxVariables.shownAdvConfOfAreasExport)
          elementos.advConfAreasExportButton.ui.setLabel(auxVariables.shownAdvConfOfAreasExport ?
            config.i18n["<< Less"] :
            config.i18n["More >>"]
          )
        }
      }),
      updateUi: function() {
        this.ui.setLabel(auxVariables.shownAdvConfOfAreasExport ?
          config.i18n["<< Less"] :
          config.i18n["More >>"])
      }
    },
    centrarVisorEnPaisCheckbox: ui.Checkbox({
      label: config.i18n["Centrar visor en mapa"],
      value: true,
      onChange: function(checked) {
        config.centrarVisorEnPais = checked ? 1 : 0;
      }
    }),
    // ---------- elementos de panel de estadisticas ----------
    estadistica1Label: new panels.StatisticLabel(config),
    estadistica2Label: new panels.StatisticLabel(config),
    tituloEstadistica2Label: {
      ui: ui.Label(config.i18n['GFC(HANSEN)'] + ' ' + year.forest_hansen_gfc + ', ' + config.treeCover + '% :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {}
    }, //titulo de superficie para HANSEN, esto se coloca porque si se modifica el treeCover en la interfaz esto debe vari, {margin: '5px', padding: '0px'}ar
    estadistica3Label: new panels.StatisticLabel(config),
    estadistica4Label: new panels.StatisticLabel(config),
    estadistica5Label: new panels.StatisticLabel(config),
    estadistica6Label: new panels.StatisticLabel(config),
    estadistica7Label: new panels.StatisticLabel(config),
    tituloEstadistica7Label: {
      ui: ui.Label(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :')
      }
    }, //titulo de superficie para mapa de bosque(obtenido en base al mapa de probabilidad), esto se coloca porque si se modifica el porcentajeProbabilidad en la interfaz esto debe vari, {margin: '5px', padding: '0px'}ar
    tituloEstadistica8Label: {
      ui: ui.Label(config.i18n["Total national area"] + " :", {
        fontSize: '14px',
        margin: '5px',
        padding: '0px',
        fontWeight: 'bold'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Total national area"] + " :")
      }
    },
    estadistica8Label: new panels.StatisticLabel(config),
    estadistica9Label: new panels.StatisticLabel(config),
    // ---------- elementos de panel de estadisticas de porcentajes ----------
    estadisticaPorcentaje1Label: new panels.StatisticLabel(config),
    estadisticaPorcentaje2Label: new panels.StatisticLabel(config),
    tituloEstadisticaPorcentaje2Label: {
      ui: ui.Label(config.i18n['GFC(HANSEN)'] + ' ' + year.forest_hansen_gfc + ', ' + config.treeCover + '% :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {}
    }, //titulo de superficie para HANSEN, esto se coloca porque si se modifica el treeCover en la interfaz esto debe vari, {margin: '5px', padding: '0px'}ar
    estadisticaPorcentaje3Label: new panels.StatisticLabel(config),
    estadisticaPorcentaje4Label: new panels.StatisticLabel(config),
    estadisticaPorcentaje5Label: new panels.StatisticLabel(config),
    estadisticaPorcentaje6Label: new panels.StatisticLabel(config),
    estadisticaPorcentaje7Label: new panels.StatisticLabel(config),
    tituloEstadisticaPorcentaje7Label: {
      ui: ui.Label(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :')
      }
    }, //titulo de superficie para HANSEN, esto se coloca porque si se modifica el treeCover en la interfaz esto debe vari, {margin: '5px', padding: '0px'}ar
    estadisticaPorcentaje8Label: new panels.StatisticLabel(config),
    statisticsGraph: new panels.StatisticsGraph({
      title: 'Forest areas',
      vAxis: {
        title: 'Area (hectare)'
      },
      hAxis: {
        title: 'Sources'
      },
      legend: 'none',
      lineWidth: 1,
      pointSize: 4,
    }, 'ColumnChart', getDataTable, 'bottom-left', 500, 300),
    statisticsTable: new panels.StatisticsTable({
      title: 'Forest areas',
      vAxis: {
        title: 'Area (hectare)'
      },
      hAxis: {
        title: 'Sources'
      },
      legend: 'none',
      lineWidth: 1,
      pointSize: 4,
    }, getDataTable, 'bottom-left', 500, 300),
    // ---------- botones ----------
    mostrarButton: {
      ui: ui.Button({
        label: config.i18n["Mostrar capas"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          function showLayersAndStatistics() {
            auxVariables.runnedForFirstTime = false
            var paisVector = utils.getLimitCountry(config.countryIso)
            if (config.centrarVisorEnPais) Map.centerObject(paisVector)
            elementos.areasPanel.show(true)
            elementos.percentagesPanel.show(true)
            ui.util.setTimeout(function() {
              showStatistics()
              showLayers()
            }, 1000)
          }
          /* funcion que borra la informacion de los paneles de estadisticas de superficies y porcentajes,
          titulos de algunos de los elementos de los mismos y el panel de leyenda; todo esto se hace para tener actualizada
          la interfaz con la informacion configurada por el usuario en la misma interfaz*/
          function limpiarPaneles() {
            // ----- actualizamos los titulos de las estadisticas de los subpaneles con los valores establecidos para HANSEN y para el mapa de bosque obtenido a partir de el de probabilidad -----
            elementos.tituloEstadistica2Label.ui.setValue(config.i18n['GFC(HANSEN)'] + ' ' + year.forest_hansen_gfc + ', ' + config.treeCover + '% :');
            elementos.tituloEstadistica7Label.ui.setValue(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :');
            elementos.tituloEstadisticaPorcentaje2Label.ui.setValue(config.i18n['GFC(HANSEN)'] + ' ' + year.forest_hansen_gfc + ', ' + config.treeCover + '% :');
            elementos.tituloEstadisticaPorcentaje7Label.ui.setValue(config.i18n["Área de probabilidad mayor a"] + ' ' + config.porcentajeProbabilidad + '% :');
            elementos.estadistica1Label.reset()
            elementos.estadistica2Label.reset()
            elementos.estadistica3Label.reset()
            elementos.estadistica4Label.reset()
            elementos.estadistica5Label.reset()
            elementos.estadistica6Label.reset()
            elementos.estadistica7Label.reset()
            elementos.estadistica8Label.reset()
            elementos.estadistica9Label.reset()
            elementos.estadisticaPorcentaje1Label.reset()
            elementos.estadisticaPorcentaje2Label.reset()
            elementos.estadisticaPorcentaje3Label.reset()
            elementos.estadisticaPorcentaje4Label.reset()
            elementos.estadisticaPorcentaje5Label.reset()
            elementos.estadisticaPorcentaje6Label.reset()
            elementos.estadisticaPorcentaje7Label.reset()
            elementos.estadisticaPorcentaje8Label.reset()
          }
          limpiarPaneles(); //al volver al mostrar los layers se borra la anterior informacion del panel de estadisticas
          if (!existenParametrosInvalidosDeConfiguracion()) { //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            showLayersAndStatistics()
          } else
            alert(existenParametrosInvalidosDeConfiguracion())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Mostrar capas"])
      }
    },
    showStatisticsGraph: {
      ui: ui.Button({
        label: config.i18n["Show statistics graph"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracion()) {
            showStatisticsGraph()
          } else
            alert(existenParametrosInvalidosDeConfiguracion())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Show statistics graph"])
      }
    },
    showStatisticsTable: {
      ui: ui.Button({
        label: config.i18n["Show statistics table"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracion())
            showStatisticsTable()
          else
            alert(existenParametrosInvalidosDeConfiguracion())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Show statistics table"])
      }
    },
    exportStatisticsButton: {
      ui: ui.Button({
        label: config.i18n["Exportar superficies"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracionexportStatistics()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportStatistics();
          else
            alert(existenParametrosInvalidosDeConfiguracionexportStatistics())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Exportar superficies"])
      }
    },
    exportarMapasButton: {
      ui: ui.Button({
        label: config.i18n["Exportar mapas"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracionExportarMapas()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportarMapas();
          else
            alert(existenParametrosInvalidosDeConfiguracionExportarMapas())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Exportar mapas"])
      }
    },
    exportarParametrosBosqueProbabilidadButton: {
      ui: ui.Button({
        label: config.i18n["Exportar parámetros de prob. de bosque"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracionExportarParametros()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportarParametrosBosqueProbabilidad();
          else
            alert(existenParametrosInvalidosDeConfiguracionExportarParametros())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Exportar parámetros de prob. de bosque"])
      }
    },
    // este boton mostrar un link en consola de un documento donde se encuentra las leyendas y fuentes usadas en el script
    mostrarLinkLeyendasFuentesButton: {
      ui: ui.Button({
        label: config.i18n["Link de leyendas y fuentes"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          alert('\t\t\t\t-----' + config.i18n['Legend and sources used'] + '-----\n\n' +
            config.linkLeyendasFuentes)
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Link de leyendas y fuentes"])
      }
    },
    exportarMosaicoLandsatButton: {
      ui: ui.Button({
        label: config.i18n["Exportar mosaico Landsat"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          Map.clear();
          if (!existenParametrosInvalidosDeConfiguracionExportarMosaicoLandsat()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportarMosaicoLandsat();
          else
            alert(existenParametrosInvalidosDeConfiguracionExportarMosaicoLandsat())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Exportar mosaico Landsat"])
      }
    },
    hybridMapLegend: {
      ui: new panels.LegendPanel(config.i18n['Leyenda de mapa de probabilidad'],
        variables.paletteAndTextsForHybridMapLegend[6],
        'top-left'),
      updateUi: function() {
        this.ui.updateLanguage(config.i18n['Leyenda de mapa de probabilidad'])
      }
    },
    languageSelect: ui.Select({
      value: 'English',
      items: ['English', 'Español', 'Français'],
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
    moduleTitle: {
      ui: ui.Label({
        value: config.i18n['Área de bosques'],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n['Área de bosques'])
      }
    },
    countrySectionTitle: {
      ui: ui.Label('1) ' + config.i18n["País"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('1) ' + config.i18n["País"])
      }
    },
    resourcesLoadSectionTitle: {
      ui: ui.Label('2) ' + config.i18n["Carga de recursos"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('2) ' + config.i18n["Carga de recursos"])
      }
    },
    treeCoverSectionTitle: {
      ui: ui.Label('3) ' + config.i18n["Parámetros de cobertura de copa"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('3) ' + config.i18n["Parámetros de cobertura de copa"])
      }
    },
    landsatMosaicSectionTitle: {
      ui: ui.Label('4) ' + config.i18n["Mosaico LANDSAT"], { fontWeight: 'bold', fontSize: '15px', }),
      updateUi: function() {
        this.ui.setValue('4) ' + config.i18n["Mosaico LANDSAT"])
      }
    },
    sentinelMosaicSectionTitle: {
      ui: ui.Label('5) ' + config.i18n["Mosaico SENTINEL/S2"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('5) ' + config.i18n["Mosaico SENTINEL/S2"])
      }
    },
    statisticsExportSectionTitle: {
      ui: ui.Label('6) ' + config.i18n["Exportar estadísticas de superficies"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('6) ' + config.i18n["Exportar estadísticas de superficies"])
      }
    },
    probabilityParametersSectionTitle: {
      ui: ui.Label('7) ' + config.i18n["Parámetros de probabilidad"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('7) ' + config.i18n["Parámetros de probabilidad"])
      }
    },
    otherOptionsSectionTitle: {
      ui: ui.Label('8) ' + config.i18n["Otras opciones"], { fontWeight: 'bold', fontSize: '15px' }),
      updateUi: function() {
        this.ui.setValue('8) ' + config.i18n["Otras opciones"])
      }
    },
    percentagesSectionTitle: {
      ui: ui.Label(config.i18n["Porcentaje de cobertura de bosque"], {
        fontWeight: 'bold',
        fontSize: '15px',
        textAlign: 'center',
        stretch: 'horizontal'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Porcentaje de cobertura de bosque"])
      }
    },
    statisticsSectionTitle: {
      ui: ui.Label(config.i18n["Superficie de bosque"], {
        fontWeight: 'bold',
        fontSize: '15px',
        textAlign: 'center',
        stretch: 'horizontal'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Superficie de bosque"])
      }
    },
    layersManager: new panels.LayersManager({
      'background': ui.Map.Layer(ee.Image(1), { palette: ['000'] },
        'Background',
        true,
        0.5),
      'background-hybridmap': ui.Map.CloudStorageLayer({
        bucket: 'geofra2020',
        path: 'module1/hybridmap',
        maxZoom: 10,
        suffix: '.png',
        name: config.i18n['Background: Global hybrid map']
      })
    }, function(layer, layerId) {
      layer.setName(textForLayers[layerId])
    }),
    exportAreaCheckboxs: {},
  }
})()
//generate checkbox for 'Export area statistics' section
imagesId.forEach(function(imageId) {
  if (imageId != 'landsat_mosaic' &&
    imageId != 'sentinel_mosaic' &&
    imageId != 'user_map' &&
    imageId != 'hybrid_map' &&
    imageId != 'country_area')
    elementos.exportAreaCheckboxs[imageId] = ui.Checkbox({
      label: constantes.textForImages[imageId],
      value: true,
      onChange: function(checked) {
        config.exportArea[imageId] = checked ? 1 : 0
      }
    })
})
var paneles = {
  // ----- elementos UI para carga de raster y vector de usuario -----
  treeCover: ui.Panel([
    elementos.treeCover.ui,
    elementos.treeCoverSlider,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  porcentajeProbabilidad: ui.Panel([
    elementos.porcentajeProbabilidad.ui,
    elementos.porcentajeProbabilidadSlider,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  // ----- paneles para mosaico sentinel -----
  fechaInicialMosaicoSentinel: ui.Panel([
    elementos.initialDateOfSentinelMosaic.ui,
    elementos.fechaInicialMosaicoSentinelTextbox,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  fechaFinalMosaicoSentinel: ui.Panel([
    elementos.finalDateOfSentinelMosaic.ui,
    elementos.fechaFinalMosaicoSentinelTextbox,
  ], ui.Panel.Layout.flow('horizontal'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  configuracionAvanzadaMosaicoSentinel: ui.Panel([
    elementos.confAdvOfSentinelMosaicButton.ui,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  cloudyPixelPercentageMosaicoSentinel: ui.Panel([
    ui.Label(config.i18n["Cloudy pixel percentage :"], { padding: '5px 0' }),
    elementos.cloudyPixelPercentageMosaicoSentinelSlider,
  ], ui.Panel.Layout.flow('vertical'), { 'fontSize': '12px' }),
  cloudScoreMosaicoSentinel: ui.Panel([
    ui.Label(config.i18n["Cloud score :"], { padding: '5px 0' }),
    elementos.cloudScoreMosaicoSentinelSlider,
  ], ui.Panel.Layout.flow('vertical'), { 'fontSize': '12px' }),
  bandasMosaicoSentinel: ui.Panel([
    ui.Panel([
      elementos.sentinelMosaicBands.ui
    ]),
    ui.Panel([
      elementos.bandaRedMosaicoSentinelSelect,
      elementos.bandaGreenMosaicoSentinelSelect,
      elementos.bandaBlueMosaicoSentinelSelect,
    ], ui.Panel.Layout.flow('horizontal'), { margin: '0 auto' }),
  ], ui.Panel.Layout.flow('vertical'), { 'fontSize': '12px' }),
  gammaMosaicoSentinel: ui.Panel([
    ui.Label(config.i18n["Gamma :"], { padding: '5px 0' }),
    elementos.gammaMosaicoSentinelTextBox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  minMaxMosaicoSentinel: ui.Panel([
    ui.Label(config.i18n["Mín. :"], { padding: '5px 0' }),
    elementos.minMosaicoSentinelTextBox,
    ui.Label(config.i18n["Máx. :"], { padding: '5px 0' }),
    elementos.maxMosaicoSentinelTextBox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  // ----- paneles para exportacion de superficies de fuentes de imagenes -----
  configuracionAvanzadaExportarSuperficie: ui.Panel([
    elementos.advConfAreasExportButton.ui
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  areasExport: ui.Panel((function() {
    return Object.keys(elementos.exportAreaCheckboxs).map(function(imageId) {
      return elementos.exportAreaCheckboxs[imageId]
    })
  })(), ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    border: '1px solid #D8D8D8',
    shown: false,
    margin: '0 0 0 15px',
  }),
  centrarVisorEnPais: ui.Panel([
    elementos.centrarVisorEnPaisCheckbox,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  botones: ui.Panel([
    elementos.mostrarButton.ui,
    elementos.showStatisticsGraph.ui,
    elementos.showStatisticsTable.ui,
    elementos.exportStatisticsButton.ui,
    elementos.exportarMapasButton.ui,
    elementos.exportarParametrosBosqueProbabilidadButton.ui,
    elementos.mostrarLinkLeyendasFuentesButton.ui,
    elementos.exportarMosaicoLandsatButton.ui
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
    margin: '10px 0'
  }),
  // ---------- subpaneles de panel de estadisticas de superficies ----------
  estadistica1: ui.Panel([
    ui.Label(config.i18n["GlobeLand 30"] + ' ' + year.forest_gl30 + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica1Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica2: ui.Panel([
    elementos.tituloEstadistica2Label.ui,
    elementos.estadistica2Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica3: ui.Panel([
    ui.Label(config.i18n["Global Land Cover(ESA)"] + ' ' + year.forest_esa_glc + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica3Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica4: ui.Panel([
    ui.Label(config.i18n["AfriCover(ESA)"] + ' ' + year.forest_esa_africover + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica4Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica5: ui.Panel([
    ui.Label(config.i18n["Forest/No Forest(JAXA)"] + ' ' + year.forest_jaxa_fnf + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica5Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica6: ui.Panel([
    ui.Label(config.i18n["Forest/Non-Forest(TanDEM-X)"] + ' ' + year.forest_tandemx_fnf + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica6Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica7: ui.Panel([
    elementos.tituloEstadistica7Label.ui,
    elementos.estadistica7Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica8: ui.Panel([
    elementos.tituloEstadistica8Label.ui,
    elementos.estadistica8Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica9: ui.Panel([
    ui.Label(config.i18n['Landcover 100m(COPERNICUS)'] + ' ' + year.forest_copernicus_lc + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadistica9Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  // ---------- subpaneles de panel estadisticas de porcentajes ----------
  estadisticaPorcentaje1: ui.Panel([
    ui.Label(config.i18n["GlobeLand 30"] + ' ' + year.forest_gl30 + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje1Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje2: ui.Panel([
    elementos.tituloEstadisticaPorcentaje2Label.ui,
    elementos.estadisticaPorcentaje2Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje3: ui.Panel([
    ui.Label(config.i18n["Global Land Cover(ESA)"] + ' ' + year.forest_esa_glc + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje3Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje4: ui.Panel([
    ui.Label(config.i18n["AfriCover(ESA)"] + ' ' + year.forest_esa_africover + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje4Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje5: ui.Panel([
    ui.Label(config.i18n["Forest/No Forest(JAXA)"] + ' ' + year.forest_jaxa_fnf + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje5Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje6: ui.Panel([
    ui.Label(config.i18n["Forest/Non-Forest(TanDEM-X)"] + ' ' + year.forest_tandemx_fnf + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje6Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje7: ui.Panel([
    elementos.tituloEstadisticaPorcentaje7Label.ui,
    elementos.estadisticaPorcentaje7Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
  estadisticaPorcentaje8: ui.Panel([
    ui.Label(config.i18n["Landcover 100m(COPERNICUS)"] + ' ' + year.forest_copernicus_lc + ' :', {
      fontSize: '14px',
      margin: '5px',
      padding: '0px',
      fontWeight: 'bold'
    }),
    elementos.estadisticaPorcentaje8Label.getUi(),
  ], ui.Panel.Layout.flow('horizontal')),
};
var panelesAdicionales = {
  advConfSentinelMosaicPanel: ui.Panel([
    paneles.cloudyPixelPercentageMosaicoSentinel,
    paneles.cloudScoreMosaicoSentinel,
    paneles.bandasMosaicoSentinel,
    paneles.gammaMosaicoSentinel,
    paneles.minMaxMosaicoSentinel,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    border: '1px solid #D8D8D8',
    shown: false,
    margin: '0 0 0 15px',
  }),
}
var mainPanels = {
  principal: ui.Panel({
    widgets: [
      elementos.moduleTitle.ui,
      elementos.countrySectionTitle.ui,
      elementos.countrySelect.ui,
      elementos.resourcesLoadSectionTitle.ui,
      elementos.ownMapPanel.ui,
      elementos.treeCoverSectionTitle.ui,
      paneles.treeCover,
      elementos.landsatMosaicSectionTitle.ui,
      elementos.landsatMosaicPanel.ui,
      elementos.sentinelMosaicSectionTitle.ui,
      paneles.fechaInicialMosaicoSentinel,
      paneles.fechaFinalMosaicoSentinel,
      paneles.configuracionAvanzadaMosaicoSentinel,
      panelesAdicionales.advConfSentinelMosaicPanel,
      elementos.statisticsExportSectionTitle.ui,
      paneles.configuracionAvanzadaExportarSuperficie,
      paneles.areasExport,
      elementos.probabilityParametersSectionTitle.ui,
      paneles.porcentajeProbabilidad,
      elementos.otherOptionsSectionTitle.ui,
      paneles.centrarVisorEnPais,
      paneles.botones
    ],
    style: {
      width: '350px',
      padding: '8px'
    }
  }),
  percentages: ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), //cada area estara en una fila separada
    widgets: [
      elementos.percentagesSectionTitle.ui,
      paneles.estadisticaPorcentaje1,
      paneles.estadisticaPorcentaje2,
      paneles.estadisticaPorcentaje3,
      paneles.estadisticaPorcentaje4,
      paneles.estadisticaPorcentaje5,
      paneles.estadisticaPorcentaje6,
      paneles.estadisticaPorcentaje8,
      paneles.estadisticaPorcentaje7,
    ],
    style: {
      width: '370px',
      position: 'bottom-right', //el panel se ubicara a lado inferior derecho sobre el mapa
      shown: true
    }
  }),
  statistics: ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), //cada area estara en una fila separada
    widgets: [
      elementos.statisticsSectionTitle.ui,
      paneles.estadistica1,
      paneles.estadistica2,
      paneles.estadistica3,
      paneles.estadistica4,
      paneles.estadistica5,
      paneles.estadistica6,
      paneles.estadistica9,
      paneles.estadistica7,
      paneles.estadistica8,
    ],
    style: {
      width: '370px',
      position: 'bottom-left', //el panel se ubicara a lado inferior derecho sobre el mapa
      shown: true
    }
  }),
};
elementos.areasPanel = new panels.StatisticsPanel(config,
  'left',
  mainPanels.statistics,
  false
)
elementos.percentagesPanel = new panels.StatisticsPanel(config,
  'right', mainPanels.percentages,
  false
)
ui.root.insert(0, mainPanels.principal)
Map.setCenter(14.13, 12.39, 2)
Map.add(elementos.languageSelect)
elementos.hybridMapLegend.ui.addToMap()
ui.root.onResize(function(deviceInfo) {
  if (!auxVariables.runnedForFirstTime) {
    if ((deviceInfo.width < 1500 || deviceInfo.height < 900)) {
      elementos.areasPanel.show(false)
      elementos.percentagesPanel.show(false)
    } else {
      elementos.areasPanel.show(true)
      elementos.percentagesPanel.show(true)
    }
  }
});