var style = require('users/gena/packages:style'),
  utils = require('users/kindgard/geoFRA:common/utils.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n/module3.js')
var config = {
  nombrePais: '',
  countryIso: 'BOL',
  year: 2020,
  fuenteDeBosqueAUsar: 'forest_hansen_gfc', //valores posibles: 'forest_hansen_gfc' o 'user_map', es la fuente de bosque a usar para procesos del script, 
  hansenVersion: 'v1.7',
  hansenYearVersion: 2019,
  treeCoverHansen: 10,
  ownMap: {
    ownMapId: "",
    pixelValuesForest: "",
    vectorId: "",
    isShownAdvConf: false
  },
  idMapaUsuario: '',
  valoresPixelBosqueMapaUsuario: "", // valores de ejemplo: '1,2' , '1' ; lista de valores de pixel que representan bosque en el mapa de bosque de usuario
  landsatMosaic1: {
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
  landsatMosaic2: {
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
  centrarVisorEnPais: true, //opcion que permite centrar el visor en el limite del pais
  yearLimit: 2020, // year limit for all processes
  i18n: i18n.en
};
var parametersGenerator = {
  'forest_hansen_gfc': function() {
    return {
      imageId: 'forest',
      forestImageId: 'forest_hansen_gfc',
      countryIso: config.countryIso,
      treeCanopyCoverGfcHansen: config.treeCoverHansen,
      year: config.year,
      version: config.year < 2019 ? 2018 : 2019
    }
  },
  'user_map': function() {
    return {
      imageId: 'user_map',
      countryIso: config.countryIso,
      ownMapId: config.ownMap.ownMapId,
      coverPixelValues: config.ownMap.pixelValuesForest
    }
  },
  'modis_total_burn': function() {
    return {
      countryIso: config.countryIso,
      imageId: 'modis_total_burn',
      year: config.year,
    }
  },
  'modis_burned_forest': function() {
    return config.fuenteDeBosqueAUsar == 'forest_hansen_gfc' ? {
      countryIso: config.countryIso,
      imageId: 'modis_burned_forest',
      forestImageId: 'forest_hansen_gfc',
      treeCanopyCoverGfcHansen: config.treeCoverHansen,
      year: config.year,
      version: config.year < 2019 ? 2018 : 2019
    } : {
      countryIso: config.countryIso,
      imageId: 'modis_burned_forest',
      forestImageId: 'user_map',
      ownMapId: config.ownMap.ownMapId,
      coverPixelValues: config.ownMap.pixelValuesForest,
      year: config.year,
    }
  },
  'landsat_mosaic1': function() {
    return config.landsatMosaic1.isShownAdvConf ? {
      imageId: 'landsat_mosaic',
      countryIso: config.countryIso,
      startDate: config.landsatMosaic1.startDate,
      endDate: config.landsatMosaic1.endDate,
      imageSource: config.landsatMosaic1.imageSource,
      percentile: config.landsatMosaic1.percentile,
      cloudScore: config.landsatMosaic1.cloudScore,
    } : {
      imageId: 'landsat_mosaic',
      countryIso: config.countryIso,
      startDate: config.landsatMosaic1.startDate,
      endDate: config.landsatMosaic1.endDate,
    }
  },
  'landsat_mosaic2': function() {
    return config.landsatMosaic2.isShownAdvConf ? {
      imageId: 'landsat_mosaic',
      countryIso: config.countryIso,
      startDate: config.landsatMosaic2.startDate,
      endDate: config.landsatMosaic2.endDate,
      imageSource: config.landsatMosaic2.imageSource,
      percentile: config.landsatMosaic2.percentile,
      cloudScore: config.landsatMosaic2.cloudScore,
    } : {
      imageId: 'landsat_mosaic',
      countryIso: config.countryIso,
      startDate: config.landsatMosaic2.startDate,
      endDate: config.landsatMosaic2.endDate
    }
  },
  modis_fire_frequency: function() {
    return {
      imageId: 'modis_fire_frequency',
      countryIso: config.countryIso
    }
  }
}
var imageIdList = [
  'modis_total_burn',
  'modis_burned_forest',
]
var textForLayers = {}
function updateTextForLayers() {
  textForLayers = {
    'background': config.i18n['Background'],
    'landsat_mosaic1': config.i18n["First mosaic LANDSAT"],
    'landsat_mosaic2': config.i18n["Second mosaic LANDSAT"],
    'forest_hansen_gfc': config.i18n["GFC(HANSEN)"] + ' ' + config.year + ', ' + config.treeCoverHansen + '%',
    'user_map': config.i18n["Own map"],
    'modis_total_burn': config.i18n["Total burned area"] + ' ' + config.year,
    'modis_burned_forest': config.i18n["Forest burned area"] + ' ' + config.year,
    modis_fire_frequency: config.i18n["Frequency of fires"] + ' 2000 - ' + (new Date()).getFullYear()
  }
}
function showLayers() {
  updateTextForLayers()
  uiElements.layersManager.resetExcept(['background'])
  var limitCountry = utils.getLimitCountry(config.countryIso)
  var imageIdList = [
    'landsat_mosaic1',
    'landsat_mosaic2',
    config.fuenteDeBosqueAUsar,
    'modis_total_burn',
    'modis_burned_forest',
    'modis_fire_frequency'
  ]
  var imageList = {}
  // ------ obteniendo mascara de bosque a usar para procesos -----
  imageIdList.forEach(function(value) {
    var parameters = parametersGenerator[value]()
    try {
      imageList[value] = utils.getImage(parameters,
        value == 'landsat_mosaic1' || value == 'landsat_mosaic2' ?
        false :
        true,
        value == 'landsat_mosaic1' || value == 'landsat_mosaic2' ?
        false :
        true
      )
    } catch (exception) {
      null
    }
  })
  var visParams = {
    landsat_mosaic1: config.landsatMosaic1.isShownAdvConf ?
      config.landsatMosaic1.visParams : null,
    landsat_mosaic2: config.landsatMosaic2.isShownAdvConf ?
      config.landsatMosaic2.visParams : null,
    'forest_hansen_gfc': { palette: '2EFE64' },
    'user_map': { palette: '2EFE64' },
    'modis_total_burn': { palette: "#FF4000" },
    'modis_burned_forest': { palette: '#B40404' },
    modis_fire_frequency: {
      min: 1,
      max: (new Date()).getFullYear() - 2000 + 1,
      palette: ['17d61d', 'd63000']
    }
  }
  if (config.centrarVisorEnPais) Map.centerObject(limitCountry)
  for (var key in imageList) {
    uiElements.layersManager.add(ui.Map.Layer(imageList[key].image,
      imageList[key].visParams ?
      imageList[key].visParams :
      visParams[key],
      textForLayers[key],
      false), key)
  }
}
function showStatistics() {
  var statisticsValues = {
    'modis_total_burn': uiElements.statisticValue1Label.ui,
    'modis_burned_forest': uiElements.statisticValue2Label.ui
  }
  panelesPrincipales.statistics.style().set('shown', true)
  uiElements.statisticsTitle.ui.setValue(config.i18n["Areas(Year"] +
    ' ' +
    config.year + ')')
  var precalculatedAreas = getPrecalculatedAreas()
  Object.keys(precalculatedAreas).forEach(function(imageId) {
    var area = precalculatedAreas[imageId]
    area.getInfo(function(value) {
      if (value >= 0) {
        statisticsValues[imageId].setValue(Math.floor(value)
          .toLocaleString('en-US') + ' ha.')
      } else {
        try {
          var imageParameters = parametersGenerator[imageId]()
          var calculateArea = utils.calculateArea(imageParameters)
          calculateArea.evaluate(function(area, error) {
            if (error)
              statisticsValues[imageId].setValue(config.i18n["Comp. time out"])
            else
              statisticsValues[imageId].setValue(Math.floor(Number(area))
                .toLocaleString('en-US') + ' ha.')
          })
        } catch (exception) {
          statisticsValues[imageId].setValue("- - - - -")
        }
      }
    })
  })
}
function getAreasForAllYears(imageId) {
  var params = {
    'modis_total_burn': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'modis_total_burn'
      }
    },
    'modis_burned_forest': function() {
      return {
        countryIso: config.countryIso,
        imageId: 'modis_burned_forest',
        forestImageId: 'forest_hansen_gfc',
        treeCanopyCoverGfcHansen: config.treeCoverHansen,
        version: config.hansenYearVersion,
      }
    }
  }
  var totalBurnForAllYears = utils.getArea(params[imageId](), 'module3', true)
  var yearsArray = []
  for (var i = 2000; i <= config.yearLimit; i++) yearsArray.push(i.toString())
  var yearList = ee.List(yearsArray)
  var allValuesList = yearList.map(function(year) {
    var row = ee.Feature(totalBurnForAllYears
      .filterMetadata('year', 'equals', ee.Number.parse(year))
      .first())
    var area = ee.Algorithms.If(row,
      ee.Algorithms.If(row.get('area'),
        ee.Number(row.get('area')).floor(),
        0),
      null)
    return area
  })
  var yearsAndValues = ee.Dictionary.fromLists(yearsArray,
    allValuesList
  ).getInfo()
  return yearsAndValues
}
function getDataTable() {
  function getRows(totalBurnAreas, forestBurnedAreas) {
    var yearsArray = []
    for (var i = 2000; i <= config.yearLimit; i++) yearsArray.push(i)
    var rows = yearsArray.map(function(year) {
      return {
        c: [{ v: year },
          { v: totalBurnAreas[year] },
          { v: forestBurnedAreas[year] }
        ]
      }
    })
    return rows
  }
  function convertToDataTable(totalBurnAreas, forestBurnedAreas) {
    var rows = getRows(totalBurnAreas, forestBurnedAreas)
    return {
      cols: [{ id: 'task', label: 'Year', type: 'number' },
        { id: 'hours', label: 'Total burn', type: 'number' },
        { id: 'hours', label: 'Burned forest', type: 'number' }
      ],
      rows: rows
    }
  }
  var totalBurnAreas = getAreasForAllYears('modis_total_burn')
  var forestBurnedAreas = getAreasForAllYears('modis_burned_forest')
  var dataTable = convertToDataTable(totalBurnAreas, forestBurnedAreas)
  return dataTable
}
function showStatisticsGraph() {
  uiElements.statisticsGraph.show()
}
function showStatisticsTable() {
  uiElements.statisticsTable.show()
}
function getPrecalculatedAreas() {
  var areas = {}
  imageIdList.map(function(imageId) {
    var imageParameters = parametersGenerator[imageId]()
    areas[imageId] = utils.getArea(imageParameters, 'module3')
  })
  return areas
}
function exportMaps() {
  var imageList = []
  imageIdList.forEach(function(imageId) {
    var parameters = parametersGenerator[imageId]()
    var result = utils.getImage(parameters)
    imageList.push({
      imageId: imageId,
      result: result
    })
  })
  imageList.forEach(function(value) {
    var imageId = value.imageId
    var image = value.result.image
    Export.image.toAsset({
      assetId: imageId + '_' + config.countryIso,
      image: image,
      region: utils.getLimitCountry(config.countryIso),
      description: imageId + '_' + config.countryIso,
      maxPixels: 5000000000000,
      crs: 'EPSG:4326',
      crsTransform: [0.00025, 0, -180, 0, -0.00025, 80]
    })
  })
}
function exportInfoForAllYears() {
  // --- generate a range of years from the year 2000 until the year config.yearLimit ---
  var years = new Array()
  for (var i = 2000; i <= config.yearLimit; i++) years.push(i.toString())
  var aditionalInfo = {
    '0_Module': config.i18n["Burned areas"],
    '0_Source': "Scripts FRA-online Beta",
    '0_Country': config.nombrePais,
    '0_Unit': config.i18n['Hectares']
  }
  aditionalInfo['Date'] = '' // esta clave no es establecida con valor, esto es para que las columnas de la tabla tengan uniformidad en todas las filas
  aditionalInfo[config.i18n['0_Forest']] = 'HANSEN ' +
    config.hansenVersion + ' ' +
    config.hansenYearVersion +
    ', Tree cover ' +
    config.treeCoverHansen + '%';
  years.forEach(function(value) {
    aditionalInfo[value] = '' // estas claves no son establecidas con valores, esto es para que las columnas de la tabla tengan uniformidad en todas las filas 
  })
  var yearStringList = ee.List(years)
  // --- se obtiene el valor de area quemada para cada gestion ---
  var totalBurnForAllYears = utils.getArea({
    countryIso: config.countryIso,
    imageId: 'modis_total_burn'
  }, 'module3', true)
  var totalBurnValuesList = yearStringList.map(function(year) {
    return ee.Number(ee.Feature(totalBurnForAllYears
          .filterMetadata('year', 'equals', ee.Number.parse(year))
          .first())
        .get('area'))
      .format('%,.0f')
  })
  // --- obtenido valores de area de bosque quemado para cada gestion ---
  var burnedForestForAllYears = utils.getArea({
    countryIso: config.countryIso,
    imageId: 'modis_burned_forest',
    forestImageId: 'forest_hansen_gfc',
    treeCanopyCoverGfcHansen: config.treeCoverHansen,
    version: config.hansenYearVersion,
  }, 'module3', true)
  var burnedForestValuesList = yearStringList.map(function(year) {
    return ee.Number(ee.Feature(burnedForestForAllYears
          .filterMetadata('year', 'equals', ee.Number.parse(year))
          .first())
        .get('area'))
      .format('%,.0f')
  })
  var auxColumn1 = {}
  auxColumn1['Date'] = config.i18n['Total burned area']
  var totalBurnValuesFeature = ee.Feature(null, ee.Dictionary.fromLists(yearStringList,
    totalBurnValuesList
  ).combine(ee.Dictionary(auxColumn1)))
  var auxColumn2 = {}
  auxColumn2['Date'] = config.i18n['Forest burned area']
  var burnedForestValuesFeature = ee.Feature(null, ee.Dictionary.fromLists(
    yearStringList,
    burnedForestValuesList
  ).combine(ee.Dictionary(auxColumn2)))
  Export.table.toDrive({
    collection: ee.FeatureCollection([
      ee.Feature(null, aditionalInfo),
      totalBurnValuesFeature,
      burnedForestValuesFeature
    ]),
    description: config.i18n['information_burning_2000_'] +
      config.yearLimit +
      '_' +
      config.nombrePais,
    fileFormat: 'CSV'
  })
}
/*funcion que verificara la validez de todos los parametros de configuracion si existen alguna conf. invalida
se devolvera un mensaje de alerta, caso contrario 'false' que indica que no hay ningun 
parametro invalido*/
function existenParametrosInvalidosDeConfiguracion() {
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
  if (!config.nombrePais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  // ----- validacion para seccion 3.2 -----
  if (config.fuenteDeBosqueAUsar == 'user_map' &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest)) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 3.2: Id de mapa de usuario o valores de píxel no especificados'
  // ----- validacion para primer mosaico landsat -----
  var startDateMosaic1 = config.landsatMosaic1.startDate.split("-")[0]
  var endDateMosaic1 = config.landsatMosaic1.endDate.split("-")[0]
  var result = areInvalidsDates(startDateMosaic1,
    endDateMosaic1,
    config.landsatMosaic1.imageSource,
    config.landsatMosaic1.isShownAdvConf)
  if (result)
    return result
  // ----- validacion para segundo mosaico landsat -----
  var startDateMosaic2 = config.landsatMosaic2.startDate.split("-")[0]
  var endDateMosaic2 = config.landsatMosaic2.endDate.split("-")[0]
  result = areInvalidsDates(startDateMosaic2,
    endDateMosaic2,
    config.landsatMosaic1.imageSource,
    config.landsatMosaic1.isShownAdvConf)
  if (result)
    return result
  return false;
}
function existenParametrosInvalidosDeConfiguracionExportInfoForAllYears() {
  if (!config.nombrePais) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 1: País no especificado'
  // ----- validacion para seccion 3.2 -----
  if (config.fuenteDeBosqueAUsar == 'user_map' &&
    (!config.ownMap.ownMapId ||
      !config.ownMap.pixelValuesForest)) //si no se escogio un pais se devuelve un mensaje de error
    return 'Sección 3.2: Id de mapa de usuario o valores de píxel no especificados'
}
function updateUis() {
  updateTextForLayers()
  for (var key in uiElements)
    if (uiElements[key].updateUi)
      uiElements[key].updateUi()
}
// --------------- interfaz de usuario ---------------
var uiElements = (function() {
  var paises = utils.getNameAndIsoCountry() //contendra pares de clave, valor de los nombres de paises
  // opciones en mapa de bosque a usar para procesos
  var fuenteDeBosqueAUsar = {}
  fuenteDeBosqueAUsar["Hansen " +
    config.hansenVersion +
    " " +
    config.hansenYearVersion] = 'forest_hansen_gfc'
  fuenteDeBosqueAUsar[config.i18n["Own map"]] = 'user_map'
  // si se especifico un mapa de bosque a usar por defecto en 'configuracion' se establece el 'select' a tal valor buscando para ello en 'fuenteDeBosqueAUsar' la clave correspondiente al fuente de mapa configurada
  var valorFuenteDeBosqueAUsar = config.fuenteDeBosqueAUsar ? (
      config.fuenteDeBosqueAUsar == 'forest_hansen_gfc' ?
      "Hansen " +
      config.hansenVersion +
      " " +
      config.hansenYearVersion :
      config.i18n['Own map']) :
    null
  return {
    paisSelect: {
      ui: ui.Select({
        value: config.nombrePais ? config.nombrePais : null,
        placeholder: config.i18n["Select a country"],
        items: Object.keys(paises),
        onChange: function(key) {
          config.nombrePais = key;
          config.countryIso = paises[key];
        }
      }),
      updateUi: function() {
        this.ui.setPlaceholder(config.i18n["Select a country"])
      }
    },
    yearLabel: {
      ui: ui.Label(config.i18n["Year :"]),
      updateUi: function() {
        this.ui.setValue(config.i18n["Year :"])
      }
    },
    gestionSlider: ui.Slider({
      value: config.year,
      min: 2000,
      max: config.yearLimit,
      step: 1,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        config.year = value;
      }
    }),
    forestMapToUseLabel: {
      ui: ui.Label(config.i18n["Forest map to use :"]),
      updateUi: function() {
        this.ui.setValue(config.i18n["Forest map to use :"])
      }
    },
    fuenteDeBosqueAUsarSelect: ui.Select({
      value: valorFuenteDeBosqueAUsar,
      placeholder: 'Fuente',
      items: Object.keys(fuenteDeBosqueAUsar),
      onChange: function(key) {
        config.fuenteDeBosqueAUsar = fuenteDeBosqueAUsar[key];
      }
    }),
    treeCoverLabel: {
      ui: ui.Label(config.i18n["Min. tree cover(%) :"]),
      updateUi: function() {
        this.ui.setValue(config.i18n["Min. tree cover(%) :"])
      }
    },
    treeCoverSlider: ui.Slider({
      value: config.treeCoverHansen,
      min: 10,
      max: 50,
      step: 10,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        config.treeCoverHansen = value;
      }
    }),
    ownMapPanel: new panels.OwnMapPanel(config),
    // ----- elementos UI para el primer mosaico-----
    landsatMosaic1Panel: new panels.LandsatMosaicPanel(config.landsatMosaic1, config),
    landsatMosaic2Panel: new panels.LandsatMosaicPanel(config.landsatMosaic2, config),
    centrarVisorEnPaisCheckbox: ui.Checkbox({
      label: config.i18n["Zoom on the country"],
      value: true,
      onChange: function(checked) {
        config.centrarVisorEnPais = checked ? 1 : 0;
      }
    }),
    // ---------- botones ----------
    showLayers: {
      ui: ui.Button({
        label: config.i18n["Show layers"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          // se borra la informacion del panel de estadisticas
          function clearStatisticsPanel() {
            uiElements.statisticValue1Label.reset()
            uiElements.statisticValue2Label.reset()
          }
          clearStatisticsPanel(); //al volver al mostrar los layers se borra la anterior informacion del panel de estadisticas
          if (!existenParametrosInvalidosDeConfiguracion()) { //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            showLayers()
            showStatistics()
          } else
            alert(existenParametrosInvalidosDeConfiguracion())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Show layers"])
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
    exportMapsButton: {
      ui: ui.Button({
        label: config.i18n["Export burned forest raster(.tiff)"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracionExportInfoForAllYears()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportMaps();
          else
            alert(existenParametrosInvalidosDeConfiguracionExportInfoForAllYears())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Export burned forest raster(.tiff)"])
      }
    },
    exportInfoForAllYearsButton: {
      ui: ui.Button({
        label: config.i18n["Export burning infos from 2000 to"] + ' ' + config.yearLimit,
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          if (!existenParametrosInvalidosDeConfiguracionExportInfoForAllYears()) //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            exportInfoForAllYears();
          else
            alert(existenParametrosInvalidosDeConfiguracionExportInfoForAllYears())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Export burning infos from 2000 to"] + ' ' + config.yearLimit)
      }
    },
    // ---------- elementos de panel de estadisticas ----------
    statisticsTitle: {
      ui: ui.Label(config.i18n["Areas(Year"] +
        ' ' +
        config.year + ')', {
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'center',
          stretch: 'horizontal', //el label ocupara todo el ancho del panel de estadisticas y al usar textAlign el titulo se centreara
        }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Areas(Year"] +
          ' ' +
          config.year + ')')
      }
    },
    statisticTitle1Label: {
      ui: ui.Label(config.i18n["Total burned area"] + ' :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Total burned area"] + ' :')
      }
    },
    statisticTitle2Label: {
      ui: ui.Label(config.i18n["Forest burned area"] + ' :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Forest burned area"] + ' :')
      }
    },
    statisticValue1Label: new panels.StatisticLabel(config),
    statisticValue2Label: new panels.StatisticLabel(config),
    layersManager: new panels.LayersManager({
      'background': ui.Map.Layer(ee.Image(1), { palette: ['000'] },
        config.i18n["Background"],
        true,
        0.5)
    }, function(layer, layerId) {
      layer.setName(textForLayers[layerId])
    }),
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
        value: config.i18n["Burned areas"],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Burned areas"])
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
    yearSectionTitle: {
      ui: ui.Label('2) ' + config.i18n["Burned Area(MODIS MCD64A1.006, 500m)"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('2) ' + config.i18n["Burned Area(MODIS MCD64A1.006, 500m)"])
      }
    },
    forestMapSectionTitle: {
      ui: ui.Label('3) ' + config.i18n["Forest map"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3) ' + config.i18n["Forest map"])
      }
    },
    landsatMosaicsSectionTitle: {
      ui: ui.Label('4) ' + config.i18n["LANDSAT Mosaics"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('4) ' + config.i18n["LANDSAT Mosaics"])
      }
    },
    otherOptionsTitle: {
      ui: ui.Label('5) ' + config.i18n["Other options"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('5) ' + config.i18n["Other options"])
      }
    },
    gfcSectionTitle: {
      ui: ui.Label('3.1) ' + config.i18n["Settings GFC(Hansen) tree cover"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3.1) ' + config.i18n["Settings GFC(Hansen) tree cover"])
      }
    },
    ownMapSectionTitle: {
      ui: ui.Label('3.2) ' + config.i18n["Own map"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3.2) ' + config.i18n["Own map"])
      }
    },
    firstMosaicSectionTitle: {
      ui: ui.Label('4.1) ' + config.i18n["First mosaic"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('4.1) ' + config.i18n["First mosaic"])
      }
    },
    secondMosaicSectionTitle: {
      ui: ui.Label('4.2) ' + config.i18n["Second mosaic"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('4.2) ' + config.i18n["Second mosaic"])
      }
    },
    statisticsGraph: new panels.StatisticsGraph({
      title: 'Areas 2000-2020',
      vAxis: {
        title: 'Area (hectare)'
      },
      hAxis: {
        title: 'Year'
      },
      legend: 'none',
      lineWidth: 1,
      pointSize: 4,
    }, 'LineChart', getDataTable, 'bottom-left', 500, 300),
    statisticsTable: new panels.StatisticsTable({
      title: 'Areas 2000-2020',
      vAxis: {
        title: 'Area (hectare)'
      },
      hAxis: {
        title: 'Year'
      },
      legend: 'none',
      lineWidth: 1,
      pointSize: 4,
    }, getDataTable, 'bottom-left', 400, 300)
  }
})();
var paneles = {
  limite: ui.Panel([
    uiElements.paisSelect.ui,
  ]),
  gestion: ui.Panel([
    uiElements.yearLabel.ui,
    uiElements.gestionSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  fuenteDeBosqueAUsarPanel: ui.Panel([
    uiElements.forestMapToUseLabel.ui,
    uiElements.fuenteDeBosqueAUsarSelect,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  treeCover: ui.Panel([
    uiElements.treeCoverLabel.ui,
    uiElements.treeCoverSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  centrarVisorEnPais: ui.Panel([
    uiElements.centrarVisorEnPaisCheckbox,
  ], ui.Panel.Layout.flow('vertical'), { 'fontSize': '12px' }),
  botones: ui.Panel([
    uiElements.showLayers.ui,
    uiElements.showStatisticsGraph.ui,
    uiElements.showStatisticsTable.ui,
    uiElements.exportMapsButton.ui,
    uiElements.exportInfoForAllYearsButton.ui,
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
  }),
  // ---------- subpaneles de panel estadisticas ----------
  statistic1: ui.Panel([
    uiElements.statisticTitle1Label.ui,
    uiElements.statisticValue1Label.ui
  ], ui.Panel.Layout.flow('horizontal')),
  statistic2: ui.Panel([
    uiElements.statisticTitle2Label.ui,
    uiElements.statisticValue2Label.ui,
  ], ui.Panel.Layout.flow('horizontal')),
}
var panelesPrincipales = {
  principal: ui.Panel({
    widgets: [
      uiElements.moduleTitle.ui,
      uiElements.countrySectionTitle.ui,
      paneles.limite,
      uiElements.yearSectionTitle.ui,
      paneles.gestion,
      uiElements.forestMapSectionTitle.ui,
      paneles.fuenteDeBosqueAUsarPanel,
      uiElements.gfcSectionTitle.ui,
      paneles.treeCover,
      uiElements.ownMapSectionTitle.ui,
      uiElements.ownMapPanel.ui,
      uiElements.landsatMosaicsSectionTitle.ui,
      uiElements.firstMosaicSectionTitle.ui,
      uiElements.landsatMosaic1Panel.ui,
      uiElements.secondMosaicSectionTitle.ui,
      uiElements.landsatMosaic2Panel.ui,
      uiElements.otherOptionsTitle.ui,
      paneles.centrarVisorEnPais,
      paneles.botones
    ],
    style: {
      width: '350px',
      padding: '8px'
    }
  }),
  statistics: ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), //cada area estara en una fila separada
    widgets: [
      uiElements.statisticsTitle.ui,
      paneles.statistic1,
      paneles.statistic2,
    ],
    style: {
      width: '350px',
      position: 'bottom-right',
      shown: false,
    }
  })
};
ui.root.insert(0, panelesPrincipales.principal)
Map.setCenter(14.13, 12.39, 2)
Map.add(panelesPrincipales.statistics)
Map.add(uiElements.languageSelect)