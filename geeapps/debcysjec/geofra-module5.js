var utils = require('users/kindgard/geoFRA:common/utils.js'),
  imageGenerator = require('users/kindgard/geoFRA:common/imageGenerator.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n/module5.js')
var config = {
  'titulo_de_tabla': 'Características de bosque', //titulo de la tabla de exportacion de superficies
  'informacion_adicional_de_tabla': 'Scripts FRA-online Beta', //informacion adicional que contendra la tabla de superficies a exportar
  nombrePais: '',
  countryIso: '',
  year: 2019,
  fuenteDeBosqueAUsar: 'hansen', //fuente de bosque a usar para procesos del script, valores posibles: hansen o mapa_usuario
  treeCoverHansen: 10,
  idMapaUsuario: 'users/debcysjec/mapa_desacuerdo',
  valoresPixelBosqueMapaUsuario: null, //lista de valores de pixel que representan bosque en el mapa de bosque de usuario
  landsatMosaic1: {
    imageSource: 'LC08/C01/T1_RT',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
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
    startDate: '2020-01-01',
    endDate: '2020-12-31',
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
  i18n: i18n.en,
  yearLimit: 2019, // year limit for all processes
}
var textForLayers = {}
function updateTextForLayers() {
  textForLayers = {
    'background': config.i18n["Background"],
    mangroves: config.i18n["Mangroves area"] +
      ' ' +
      config.year,
    intact_forest_landscape: config.i18n["Intact forest landscape area"] + ' ' + config.year,
    landsat_mosaic1: config.i18n["First LANDSAT mosaic"],
    landsat_mosaic2: config.i18n["Second LANDSAT mosaic"],
  }
}
var imageIdList = [
  'landsat_mosaic1',
  'landsat_mosaic2',
  'mangroves',
  'intact_forest_landscape'
]
var paramsGenerator = {
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
      endDate: config.landsatMosaic2.endDate,
    }
  },
  'mangroves': function() {
    return {
      imageId: 'mangroves',
      countryIso: config.countryIso,
      year: config.year,
    }
  },
  'intact_forest_landscape': function() {
    return {
      imageId: 'intact_forest_landscape',
      countryIso: config.countryIso,
      year: config.year,
    }
  }
}
function showLayers() {
  updateTextForLayers()
  var countryLimit = utils.getLimitCountry(config.countryIso)
  uiElements.layersManager.resetExcept(['background'])
  var imagesList = {}
  imageIdList.forEach(function(imageId) {
    try {
      var params = paramsGenerator[imageId]()
      var maskAndRenamedBand = imageId == 'landsat_mosaic1' || imageId == 'landsat_mosaic2' ?
        false :
        true
      imagesList[imageId] = utils.getImage(params,
        maskAndRenamedBand,
        maskAndRenamedBand)
    } catch (exception) {
      null
    }
  })
  var visParams = {
    landsat_mosaic1: config.landsatMosaic1.visParams,
    landsat_mosaic2: config.landsatMosaic2.visParams,
    mangroves: { palette: '#7cfc00' },
    intact_forest_landscape: { palette: '#33ffd4' },
  }
  if (config.centrarVisorEnPais) Map.centerObject(countryLimit)
  Object.keys(imagesList).forEach(function(imageId) {
    var image = imagesList[imageId].image
    uiElements.layersManager.add(
      ui.Map.Layer(image, imagesList[imageId].visParams ?
        imagesList[imageId].visParams :
        visParams[imageId],
        textForLayers[imageId],
        false),
      imageId)
  })
}
function showStatistics() {
  var statisticsPanelAreaLabel = {
    mangroves: uiElements.estadisticaValor1Label.ui,
    intact_forest_landscape: uiElements.estadisticaValor2Label.ui
  }
  uiElements.statisticsTitle.ui.setValue(config.i18n["Areas(Year"] +
    ' ' +
    config.year + ')')
  var precalculatedAreas = getPrecalculatedAreas() //se lee todas las areas para todas las fuentes de imagenes para un determinado pais
  Object.keys(precalculatedAreas).forEach(function(imageId) {
    var area = precalculatedAreas[imageId]
    area.evaluate(function(area) {
      if (area >= 0) {
        statisticsPanelAreaLabel[imageId].setValue(Math.floor(area)
          .toLocaleString('en-US') + ' ha.')
      } else {
        try {
          var imageParams = paramsGenerator[imageId]()
          precalculatedAreas[imageId] = utils.calculateArea(imageParams)
          precalculatedAreas[imageId].evaluate(function(area, error) {
            if (error) {
              statisticsPanelAreaLabel[imageId].setValue(config.i18n["Comp. time out"])
            } else {
              statisticsPanelAreaLabel[imageId].setValue(Math.floor(Number(area))
                .toLocaleString('en-US') + ' ha.')
            }
          })
        } catch (exception) {
          statisticsPanelAreaLabel[imageId].setValue("- - - - -")
        }
      }
    })
  })
}
function getPrecalculatedAreas() {
  var areas = {}
  imageIdList.forEach(function(imageId) {
    if (imageId != 'landsat_mosaic1' &&
      imageId != 'landsat_mosaic2') {
      var imageParams = paramsGenerator[imageId]()
      areas[imageId] = utils.getArea(imageParams, 'module5')
    }
  })
  return areas
}
/*Genera una tabla con informacion de manglares para las gestiones de 2000 a config.yearLimit y
para cobertura de bosque intacto de 2013 a config.yearLimit todo esto para un pais*/
function exportInformationForAllYears() {
  // --- generate a range of years from the year 2000 until the year config.yearLimit ---
  var allYears = new Array()
  for (var i = 2000; i <= config.yearLimit; i++) allYears.push(i)
  var informacionAdicional = {}
  informacionAdicional[config.i18n['0_Módulo']] = config.i18n["Características de bosque"], //establecemos el titulo de la tabla
    informacionAdicional[config.i18n['0_Fuente']] = config.i18n["Scripts FRA-online Beta"] // establecemos la informacion adicional que contendra la tabla
  informacionAdicional[config.i18n['0_País']] = config.countryName,
    informacionAdicional[config.i18n['0_Unidades']] = config.i18n['Hectárea']
  informacionAdicional[config.i18n['Dato']] = '' // esta clave no es establecida con valor, esto es para que las columnas de la tabla tengan uniformidad en todas las filas
  allYears.forEach(function(value) {
    informacionAdicional[value] = '' // estas claves no son establecidas con valores, esto es para que las columnas de la tabla tengan uniformidad en todas las filas 
  })
  // ---------- se define diferentes array uno de strings y otro de enteros porque uno se usara en el 'map' y otro para obtener las columnas de la tabla que se exportara(estas deben ser strings) --------
  var allYearsString = allYears.map(function(value) { return value.toString() })
  // --- gestiones en las que se obtendra superficie de manglares ---
  var gestionesManglaresList = ee.List(allYears)
  var gestionesManglaresStringList = ee.List(allYearsString)
  // --- gestiones en las que se obtendra la superficie de bosque intacto ---
  var gestionesBosqueIntactoList = ee.List(allYears.filter(function(value) { return value >= 2013 }));
  var gestionesBosqueIntactoStringList = ee.List(allYearsString.filter(function(value) { return parseInt(value) >= 2013 }));
  // ----- se obtiene el valor bosque total para cada gestion -----
  var valoresAreaManglaresList = gestionesManglaresList.map(function(gestion) {
    var countryLimit = utils.getLimitCountry(config.countryIso);
    var manglaresImage = imageGenerator['mangroves'](countryLimit, gestion); //obtenido manglares de una determinada gestion
    var areaManglaresImage = manglaresImage.multiply(ee.Image.pixelArea().divide(10000));
    var valorAreaManglaresImage = areaManglaresImage.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: countryLimit.geometry(),
      scale: 200,
      maxPixels: 500000000000
    });
    return ee.Number(valorAreaManglaresImage.get('1')).format('%,.0f');
  });
  // ----- obtenido valores de area de bosque en areas protegidas para cada gestion -----
  var valoresAreaBosqueIntactoList = gestionesBosqueIntactoList.map(function(gestion) {
    var countryLimit = utils.getLimitCountry(config.countryIso);
    var coberturaBosqueIntactoImage = imageGenerator['intact_forest_landscape'](countryLimit, gestion); //obtenido bosque intacto de una determinada gestion
    var areaCoberturaBosqueIntactoImage = coberturaBosqueIntactoImage.multiply(ee.Image.pixelArea().divide(10000));
    var valorAreaCoberturaBosqueIntactoImage = areaCoberturaBosqueIntactoImage.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: countryLimit.geometry(),
      scale: 1113.19,
      maxPixels: 5000000000000
    });
    return ee.Number(valorAreaCoberturaBosqueIntactoImage.get('b1')).format('%,.0f');
  });
  var auxColumn1 = {}
  auxColumn1[config.i18n['Dato']] = config.i18n['Mangroves area']
  var valorAreaManglaresFeature = ee.Feature(null, ee.Dictionary.fromLists(
    gestionesManglaresStringList,
    valoresAreaManglaresList
  ).combine(ee.Dictionary(auxColumn1)));
  var auxColumn2 = {}
  auxColumn2[config.i18n['Dato']] = config.i18n['Intact forest landscape area']
  var valoresAreaBosqueIntactoFeature = ee.Feature(null, ee.Dictionary.fromLists(
    gestionesBosqueIntactoStringList,
    valoresAreaBosqueIntactoList
  ).combine(ee.Dictionary(auxColumn2)));
  var informacionAdicionalFeature = ee.Feature(null, informacionAdicional);
  Export.table.toDrive({
    collection: ee.FeatureCollection([informacionAdicionalFeature, valorAreaManglaresFeature, valoresAreaBosqueIntactoFeature]),
    description: config.i18n["informacion_caracteristicas_bosque_2000_"] + config.yearLimit + '_' + config.countryName,
    fileFormat: 'CSV'
  });
}
function existenParametrosInvalidosDeConfiguracion() {
  function areInvalidsDates(startDate, endDate, imageSource, isShownAdvConf) {
    var validations = [
      function(startDate, endDate) {
        return startDate < 1984 || endDate < 1984
      },
      function(startDate, endDate, imageSource, isShownAdvConf) {
        return isShownAdvConf &&
          imageSource == 'LT5_L1T' && (
            startDate < 1984 ||
            2012 < startDate ||
            endDate < 1984 ||
            2012 < endDate)
      },
      function(startDate, endDate, imageSource, isShownAdvConf) {
        return isShownAdvConf &&
          imageSource == 'LE7_L1T' && (
            startDate < 1999 ||
            2017 < startDate ||
            startDate < 1999 ||
            2017 < startDate)
      },
      function(startDate, endDate, imageSource, isShownAdvConf) {
        return isShownAdvConf &&
          imageSource == 'LC08/C01/T1_RT' &&
          (startDate < 2013 || endDate < 2013)
      }
    ]
    validations.forEach(function(fn) {
      if (fn(startDate, endDate, imageSource, isShownAdvConf))
        return "Sección 4.1. Rango de fechas erróneo para la fuente de imágenes escogida"
    })
  }
  if (!config.countryIso)
    return 'Sección 1: País no especificado'
  // ----- mosaics validation -----
  var configForMosaics = {
    landsat_mosaic1: config.landsatMosaic1,
    landsat_mosaic2: config.landsatMosaic2
  }
  for (var key in configForMosaics) {
    var startDateMosaic1 = configForMosaics[key].startDate.split("-")[0]
    var endDateMosaic1 = configForMosaics[key].endDate.split("-")[0]
    var result = areInvalidsDates(startDateMosaic1,
      endDateMosaic1,
      configForMosaics[key].imageSource,
      configForMosaics[key].isShownAdvConf)
    if (result)
      return result
  }
  return false
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
  var fuenteDeBosqueAUsar = {
    'Hansen v1.5 2017': 'hansen',
  };
  fuenteDeBosqueAUsar[config.i18n['Mapa de usuario']] = 'mapa_usuario'
  // si se especifico un mapa de bosque a usar por defecto en 'configuracion' se establece el 'select' a tal valor buscando para ello en 'fuenteDeBosqueAUsar' la clave correspondiente al fuente de mapa configurada
  var valorFuenteDeBosqueAUsar = config.fuenteDeBosqueAUsar ?
    (config.fuenteDeBosqueAUsar == 'hansen' ?
      'Hansen v1.5 2017' :
      config.i18n['Mapa de usuario']) :
    null;
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
    fuenteDeBosqueAUsarSelect: ui.Select({
      value: valorFuenteDeBosqueAUsar,
      placeholder: 'Fuente',
      items: Object.keys(fuenteDeBosqueAUsar),
      onChange: function(key) {
        config.fuenteDeBosqueAUsar = fuenteDeBosqueAUsar[key];
      }
    }),
    treeCoverSlider: ui.Slider({
      value: config.treeCoverHansen,
      min: 0,
      max: 100,
      step: 5,
      style: { stretch: 'horizontal' },
      onChange: function(value) {
        config.treeCoverHansen = value;
      }
    }),
    idMapaUsuarioTextBox: ui.Textbox({
      value: config.idMapaUsuario ? config.idMapaUsuario : null,
      placeholder: 'users/user/assetid',
      style: { width: '100px', },
      onChange: function(value) {
        config.idMapaUsuario = value;
      }
    }),
    valoresPixelBosqueMapaUsuarioTextbox: ui.Textbox({
      value: config.valoresPixelBosqueMapaUsuario ? config.valoresPixelBosqueMapaUsuario : null,
      placeholder: '1,2,3,4',
      style: { width: '150px', },
      onChange: function(value) {
        config.valoresPixelBosqueMapaUsuario = value;
      }
    }),
    landsatMosaic1Panel: new panels.LandsatMosaicPanel(config.landsatMosaic1, config),
    landsatMosaic2Panel: new panels.LandsatMosaicPanel(config.landsatMosaic2, config),
    centrarVisorEnPaisCheckbox: ui.Checkbox({
      label: config.i18n["Centrar visor en país"],
      value: true,
      onChange: function(checked) {
        config.centrarVisorEnPais = checked ? 1 : 0;
      }
    }),
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
      ui: ui.Label(config.i18n["Mangroves area"] + ' :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Mangroves area"] + ' :')
      }
    },
    statisticTitle2Label: {
      ui: ui.Label(config.i18n["Intact forest landscape area"] + ' :', {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '0px'
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Intact forest landscape area"] + ' :')
      }
    },
    estadisticaValor1Label: new panels.StatisticLabel(config),
    estadisticaValor2Label: new panels.StatisticLabel(config),
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
        value: config.i18n["Forest characteristics"],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      updateUi: function() {
        this.ui.setValue(config.i18n["Forest characteristics"])
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
      ui: ui.Label('2) ' + config.i18n["Year of interest"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('2) ' + config.i18n["Year of interest"])
      }
    },
    landsatMosaicsSectionTitle: {
      ui: ui.Label('3) ' + config.i18n["LANDSAT Mosaics"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('3) ' + config.i18n["LANDSAT Mosaics"])
      }
    },
    firstMosaicSectionTitle: {
      ui: ui.Label('3.1) ' + config.i18n["First mosaic"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3.1) ' + config.i18n["First mosaic"])
      }
    },
    secondMosaicSectionTitle: {
      ui: ui.Label('3.2) ' + config.i18n["Second mosaic"], {
        fontWeight: 'bold',
        fontSize: '15px'
      }),
      updateUi: function() {
        this.ui.setValue('3.2) ' + config.i18n["Second mosaic"])
      }
    },
    otherOptionsTitle: {
      ui: ui.Label('4) ' + config.i18n["Other options"], {
        fontWeight: 'bold',
        fontSize: '15px',
      }),
      updateUi: function() {
        this.ui.setValue('4) ' + config.i18n["Other options"])
      }
    },
    // ---------- botones ----------
    mostrarCapas: {
      ui: ui.Button({
        label: config.i18n["Mostrar capas"],
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          function showLayersAndStatistics() {
            var paisVector = utils.getLimitCountry(config.countryIso)
            if (config.centrarVisorEnPais) Map.centerObject(paisVector)
            uiElements.areasPanel.show(true)
            ui.util.setTimeout(function() {
              showLayers()
              showStatistics()
            }, 1000)
          }
          // se borra la informacion del panel de estadisticas
          function clearEstadisticasPanel() {
            uiElements.estadisticaValor1Label.reset()
            uiElements.estadisticaValor2Label.reset()
          }
          clearEstadisticasPanel(); //al volver al mostrar los layers se borra la anterior informacion del panel de estadisticas
          if (!existenParametrosInvalidosDeConfiguracion()) { //se valida todos los parametros de configuracion si hay algun error se muestra un mensaje de alerta
            showLayersAndStatistics()
          } else
            alert(existenParametrosInvalidosDeConfiguracion())
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Show layers"])
      }
    },
    exportInformationForAllYearsButton: {
      ui: ui.Button({
        label: config.i18n["Export information from 2000 to"] +
          ' ' +
          config.yearLimit,
        style: {
          stretch: 'horizontal',
          fontWeight: 'bold'
        },
        onClick: function() {
          exportInformationForAllYears();
        }
      }),
      updateUi: function() {
        this.ui.setLabel(config.i18n["Export information from 2000 to"] +
          ' ' +
          config.yearLimit)
      }
    },
  }
})();
var paneles = {
  gestion: ui.Panel([
    uiElements.gestionSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  fuenteDeBosqueAUsarPanel: ui.Panel([
    ui.Label(config.i18n["Fuente de bosque a usar:"]),
    uiElements.fuenteDeBosqueAUsarSelect,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  treeCover: ui.Panel([
    ui.Label(config.i18n["Tree cover Hansen(%):"]),
    uiElements.treeCoverSlider,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  idMapaUsuario: ui.Panel([
    ui.Label(config.i18n["Id de mapa de usuario:"]),
    uiElements.idMapaUsuarioTextBox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  valoresPixelBosqueMapaUsuarioPanel: ui.Panel([
    ui.Label(config.i18n["Valores de píxel de bosque:"]),
    uiElements.valoresPixelBosqueMapaUsuarioTextbox,
  ], ui.Panel.Layout.flow('horizontal'), { 'fontSize': '12px' }),
  centrarVisorEnPais: ui.Panel([
    uiElements.centrarVisorEnPaisCheckbox,
  ], ui.Panel.Layout.flow('vertical'), {
    fontSize: '12px',
    margin: '0 0 0 15px'
  }),
  botones: ui.Panel([
    uiElements.mostrarCapas.ui,
    uiElements.exportInformationForAllYearsButton.ui
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
  }),
  // ---------- subpaneles de panel estadisticas ----------
  estadistica1: ui.Panel([
    uiElements.statisticTitle1Label.ui,
    uiElements.estadisticaValor1Label.ui,
  ], ui.Panel.Layout.flow('horizontal')),
  estadistica2: ui.Panel([
    uiElements.statisticTitle2Label.ui,
    uiElements.estadisticaValor2Label.ui,
  ], ui.Panel.Layout.flow('horizontal')),
};
var mainPanels = {
  principal: ui.Panel({
    widgets: [
      uiElements.moduleTitle.ui,
      uiElements.countrySectionTitle.ui,
      uiElements.countrySelect.ui,
      uiElements.yearSectionTitle.ui,
      paneles.gestion,
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
      width: '340px',
      padding: '8px'
    }
  }),
  areas: ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), //cada area estara en una fila separada
    widgets: [
      uiElements.statisticsTitle.ui,
      paneles.estadistica1,
      paneles.estadistica2,
    ],
    style: {
      width: '350px',
      position: 'bottom-right' //el panel se ubicara a lado inferior derecho sobre el mapa
    }
  })
};
ui.root.insert(0, mainPanels.principal);
Map.add(uiElements.languageSelect)
uiElements.areasPanel = new panels.StatisticsPanel(config,
  'right',
  mainPanels.areas,
  false
)