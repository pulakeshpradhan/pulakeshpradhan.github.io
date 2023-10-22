var utils = require('users/kindgard/geoFRA:common/utils.js'),
  panels = require('users/kindgard/geoFRA:common/panels.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n.js'),
  errors = require('users/kindgard/geoFRA:common/errors.js')
var kaposImage = ee.Image('users/fernandobezares/Kapos_WGS84')
var esaCciImagesList = {
  2000: ee.Image("users/fernandobezares/ESA_CCI/ESACCI-LC-L4-LCCS-Map-300m-P1Y-1992_2015-v207").select('b9'),
  2005: ee.Image("users/fernandobezares/ESA_CCI/ESACCI-LC-L4-LCCS-Map-300m-P1Y-1992_2015-v207").select('b14'),
  2010: ee.Image("users/fernandobezares/ESA_CCI/ESACCI-LC-L4-LCCS-Map-300m-P1Y-1992_2015-v207").select('b19'),
  2015: ee.Image("users/fernandobezares/ESA_CCI/ESACCI-LC-L4-LCCS-Map-300m-P1Y-1992_2015-v207").select('b24'),
  2018: ee.Image('users/fernandobezares/ESA_CCI/CCI_2018')
}
var remapIpccClassToText = {
  1: 'Forest ',
  2: 'Grassland ',
  3: 'Cropland ',
  4: 'Wetland ',
  5: 'Settlement ',
  6: 'Otherland ',
  7: 'No data',
}
var configuration = {
  countryIso: '',
  year: '',
  kaposLevel: null,
  i18n: i18n.en,
  kaposLevelLegend: {
    palette: [
      'f49bff',
      'FF0000',
      'FF8000',
      'FFFF00',
      '0040FF',
      '01DF01',
      '0B3B0B',
    ],
    text: [
      'Level 0',
      '1: Elevation ≥ 4 500 m',
      '2: Elevation 3500 - 4500m',
      '3: Elevation 2500 - 3500m',
      '4: Elevation 1500 - 2500m',
      '5: Elevation 1000 - 1500m',
      '6: Elevation 300 - 1000m',
    ]
  },
  ipccClassLegend: {
    palette: [
      '006400',
      'FFB432',
      'FFFF64',
      '009678',
      'C31400',
      'FFF5D7',
      '000',
    ],
    text: [
      remapIpccClassToText[1],
      remapIpccClassToText[2],
      remapIpccClassToText[3],
      remapIpccClassToText[4],
      remapIpccClassToText[5],
      remapIpccClassToText[6],
      remapIpccClassToText[7],
    ]
  },
  mgciDistributionLegend: {
    palette: [
      'ea0202',
      'fc3500',
      'ff8300',
      'ff9e00',
      'ffc500',
      'ffff00',
      'e0ff00',
      'c1ff00',
      '00FF00',
      '04B404',
      '0B610B',
    ],
    text: [
      '0 %',
      '10 %',
      '20 %',
      '30 %',
      '40 %',
      '50 %',
      '60 %',
      '70 %',
      '80 %',
      '90 %',
      '100 %',
    ]
  }
}
var i18nLocal = {
  es: {
    'Class, Kapos and Year': 'Class, Kapos and Year'
  },
  en: {
    'Class, Kapos and Year': 'Class, Kapos and Year'
  }
}
function updateI18n() {
  configuration.i18n['Class, Kapos and Year'] = 'Class, Kapos and Year'
  configuration.i18n['ESA CCI'] = 'ESA CCI'
  configuration.i18n['Kapos level'] = 'Kapos level'
  configuration.i18n['Select an country'] = 'Select an country'
  configuration.i18n['Select an year'] = 'Select an year'
  configuration.i18n['Select an level'] = 'Select an level'
  configuration.i18n['Kapos level not specified'] = 'Kapos level not specified'
  configuration.i18n['Export statistics'] = 'Export statistics'
  configuration.i18n['Show chart'] = 'Show chart'
}
updateI18n()
Map.setCenter(-3.705, 9.25, 3)
function getKaposImage() {
  var kaposInLevel = kaposImage.eq(configuration.kaposLevel)
  return kaposInLevel
}
function getEsaCciImage() {
  var esaCciReclasificated = ee.Image(esaCciImagesList[configuration.year]).remap(
    [0, 10, 11, 12, 20, 30, 40, 50, 60, 61, 62, 70, 71, 72, 80, 81, 82, 90, 100, 110, 120,
      121, 122, 130, 140, 150, 151, 152, 153, 160, 170, 180, 190, 200, 201, 202, 210, 220
    ],
    [7, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 5, 6, 6, 6, 4, 6
    ]
  )
  return esaCciReclasificated
}
function getKaposImageMask() {
  var kaposLevel = getKaposImage()
  return kaposLevel.mask(kaposLevel)
}
function getEsaCciImageInKaposLevel() {
  var image = getEsaCciImage()
  var kaposLevelMask = getKaposImageMask()
  image = image.mask(kaposLevelMask)
  var countryLimit = utils.getLimitCountry(configuration.countryIso)
  var imageInCountry = image.clip(countryLimit)
  return imageInCountry
}
function getMgci(year, kaposLevel) {
  var informationRows = utils.getArea({ iso: configuration.countryIso, year: year }, 'kapos', true)
  var forestArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 1).first()).get('level ' + kaposLevel)
  var grasslandArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 2).first()).get('level ' + kaposLevel)
  var croplandArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 3).first()).get('level ' + kaposLevel)
  var wetlandArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 4).first()).get('level ' + kaposLevel)
  var settlementArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 5).first()).get('level ' + kaposLevel)
  var otherlandArea = ee.Feature(informationRows.filterMetadata('class', 'equals', 6).first()).get('level ' + kaposLevel)
  var num = ee.Number(forestArea).add(ee.Number(grasslandArea)).add(ee.Number(croplandArea))
  var den = ee.Number(forestArea)
    .add(ee.Number(grasslandArea))
    .add(ee.Number(croplandArea))
    .add(ee.Number(wetlandArea))
    .add(ee.Number(settlementArea))
    .add(ee.Number(otherlandArea))
  return num.divide(den).multiply(100)
}
function getIpccAresByKaposArea(year, ipccClass, kaposLevel) {
  var ipccClassRow = utils.getArea({
    iso: configuration.countryIso,
    year: year,
    class: ipccClass,
  }, 'kapos', true)
  var ipccClassArea = ee.Number(ee.Feature(ipccClassRow.first()).get('level ' + kaposLevel))
  var kaposLevelArea = utils.getArea({
    countryIso: configuration.countryIso,
    imageId: 'kaposlevel',
    kaposLevel: kaposLevel
  }, 'kaposlevel')
  return ipccClassArea.divide(kaposLevelArea).multiply(100)
}
function getMgciNational(year) {
  function getNumerator() {
    var yearRows = utils.getArea({
      year: year,
      iso: configuration.countryIso
    }, 'kapos', true)
    var ipccClassesList = ee.List([1, 2, 3])
    var kaposLevelsList = ee.List([1, 2, 3, 4, 5, 6])
    var ipccAreasList = ipccClassesList.map(function(ipccClass) {
      var ipccClassRow = ee.Feature(yearRows.filterMetadata('class', 'equals', ipccClass).first())
      var ipccAreaInKaposLevels = kaposLevelsList.map(function(kaposLevel) {
        return ipccClassRow.get(ee.String('level ').cat(ee.Number(kaposLevel).format()))
      })
      return ipccAreaInKaposLevels.reduce(ee.Reducer.sum())
    })
    return ee.Number(ipccAreasList.reduce(ee.Reducer.sum()))
  }
  function getDenominator() {
    var kaposLevelsList = ee.List([1, 2, 3, 4, 5, 6])
    var kaposLevelAreas = kaposLevelsList.map(function(kaposLevel) {
      return utils.getArea({
        countryIso: configuration.countryIso,
        imageId: 'kaposlevel',
        kaposLevel: kaposLevel
      }, 'kaposlevel')
    })
    return kaposLevelAreas.reduce(ee.Reducer.sum())
  }
  var numerator = getNumerator()
  var denominator = getDenominator()
  return numerator.divide(denominator)
}
function exportStatistics() {
  var years = Object.keys(esaCciImagesList)
  var kaposLevels = [0, 1, 2, 3, 4, 5, 6]
  var ipccClasses = [1, 2, 3, 4, 5, 6]
  var datesFeatureList = []
  years.forEach(function(year) {
    kaposLevels.forEach(function(kaposLevel) {
      var mgciIndex = getMgci(parseInt(year), kaposLevel)
      var dates = {
        country: configuration.countryIso,
        year: year,
        elevation: 'Kapos ' + kaposLevel,
        landtype: 'all',
        value: mgciIndex,
        unit: 'PERCENT',
      }
      datesFeatureList.push(ee.Feature(null, dates))
    })
  })
  years.forEach(function(year) {
    kaposLevels.forEach(function(kaposLevel) {
      ipccClasses.forEach(function(ipccClass) {
        var ipccClassDivideKaposArea = getIpccAresByKaposArea(parseInt(year), ipccClass, kaposLevel)
        var dates = {
          country: configuration.countryIso,
          year: year,
          elevation: 'Kapos ' + kaposLevel,
          landtype: remapIpccClassToText[ipccClass],
          value: ipccClassDivideKaposArea,
          unit: 'PERCENT',
        }
        datesFeatureList.push(ee.Feature(null, dates))
      })
    })
  })
  years.forEach(function(year) {
    var dates = {
      country: configuration.countryIso,
      year: year,
      elevation: 'all',
      landtype: '',
      value: getMgciNational(parseInt(year)),
      unit: 'PERCENT',
    }
    datesFeatureList.push(ee.Feature(null, dates))
  })
  var datesFc = ee.FeatureCollection(datesFeatureList)
  Export.table.toDrive({
    collection: datesFc,
    description: 'kapos_areas_' + configuration.countryIso,
    fileFormat: 'CSV'
  })
}
function ChartPanel() {
  this.panel = this.createPanel()
}
ChartPanel.prototype.createPanel = function() {
  return ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      width: '250px',
      position: 'bottom-right',
      shown: false
    }
  })
}
ChartPanel.prototype.update = function() {
  var yearList = ee.List([2000, 2005, 2010, 2015, 2018])
  var kaposLevel = configuration.kaposLevel
  var yearVsMgciList = yearList.map(function(year) {
    return ee.Feature(null, { mgci: getMgci(year, kaposLevel), year: year })
  })
  var yearVsMgciChart = ui.Chart.feature.byFeature(yearVsMgciList, 'year', 'mgci')
  yearVsMgciChart.setOptions({
    title: 'MGCI in Kapos ' + kaposLevel,
    hAxis: { title: 'Year' },
    legend: { position: 'none' },
    vAxis: {
      title: 'Percent (%)',
      logScale: true
    }
  })
  this.panel.style().set('shown', true)
  this.panel.clear()
  this.panel.add(yearVsMgciChart)
}
ChartPanel.prototype.addToMap = function() {
  Map.add(this.panel)
}
function updateEsaCciLayer() {
  if (configuration.year && configuration.kaposLevel != null) {
    var image = getEsaCciImageInKaposLevel()
    localPanels.layersManager.resetExcept(0)
    localPanels.layersManager.add(ui.Map.Layer(image, { palette: configuration.ipccClassLegend.palette, min: 1, max: 7 },
        'ESA CCI ' + configuration.year + ' - Kapos Level ' + configuration.kaposLevel),
      'esa_cci')
  }
}
function exitsInvalidParamsShowChart() {
  errors.existCountryErrors(1, configuration)
  if (configuration.kaposLevel == null)
    throw configuration.i18n['Section'] + ' 3: ' + configuration.i18n['Kapos level not specified']
}
function exitsInvalidParamsForYear() {
  errors.existCountryErrors(1, configuration)
}
function existsInvalidParamsForKaposLevel() {
  exitsInvalidParamsForYear()
}
var nameAndNumberKaposLevel = {
  'Level 0': 0,
  'Level 1': 1,
  'Level 2': 2,
  'Level 3': 3,
  'Level 4': 4,
  'Level 5': 5,
  'Level 6': 6
}
var uiElements = {
  countrySelect: new panels.CountryElement(configuration, function(countryIso) {
    try {
      errors.existCountryErrors(1, configuration)
      var countryLimit = utils.getLimitCountry(countryIso)
      ui.util.setTimeout(function() {
        Map.centerObject(countryLimit)
        uiElements.yearSelect.setDisabled(false)
      }, 10)
    } catch (msg) {
      alert(msg)
    }
  }),
  yearSelect: ui.Select({
    value: configuration.year ? configuration.year : null,
    placeholder: configuration.i18n['Select an year'],
    items: ['2000',
      '2005',
      '2010',
      '2015',
      '2018',
    ],
    disabled: true,
    style: {
      margin: '0 0 0 20px'
    },
    onChange: function(key) {
      try {
        exitsInvalidParamsForYear()
        configuration.year = key
        uiElements.kaposLevelSelect.setDisabled(false)
        updateEsaCciLayer()
      } catch (msg) {
        alert(msg)
      }
    }
  }),
  kaposLevelSelect: ui.Select({
    value: configuration.kaposLevel ? configuration.kaposLevel : null,
    placeholder: configuration.i18n['Select an level'],
    items: Object.keys(nameAndNumberKaposLevel),
    disabled: true,
    style: {
      margin: '0 0 0 20px'
    },
    onChange: function(key) {
      try {
        existsInvalidParamsForKaposLevel()
        configuration.kaposLevel = nameAndNumberKaposLevel[key]
        updateEsaCciLayer()
      } catch (msg) {
        alert(msg)
      }
    }
  }),
  exportStatisticsButton: ui.Button({
    label: configuration.i18n['Export statistics'],
    style: {
      stretch: 'horizontal',
      fontWeight: 'bold'
    },
    onClick: function() {
      try {
        errors.existCountryErrors(1, configuration)
        exportStatistics()
      } catch (msg) {
        alert(msg)
      }
    }
  }),
  showChartButton: ui.Button({
    label: configuration.i18n['Show chart'],
    style: {
      stretch: 'horizontal',
      fontWeight: 'bold'
    },
    onClick: function() {
      try {
        exitsInvalidParamsShowChart()
        localPanels.chartPanel.update()
      } catch (msg) {
        alert(msg)
      }
    }
  }),
  yearForDistributionMapSelect: ui.Select({
    value: '2018',
    placeholder: configuration.i18n['Select an year'],
    items: ['2000',
      '2005',
      '2010',
      '2015',
      '2018',
    ],
    style: {
      margin: '0 0 0 80px'
    },
    disabled: true,
    onChange: function(key) {
      localPanels.layersManager.updateRawLayer(0, ui.Map.CloudStorageLayer({
        bucket: 'geofra2020',
        path: 'kapos/' + key,
        maxZoom: 16,
        suffix: '.png',
        name: 'MGCI distribution in ' + key
      }))
    }
  }),
}
var localPanels = {
  buttons: ui.Panel([
    uiElements.exportStatisticsButton,
    uiElements.showChartButton
  ], ui.Panel.Layout.flow('vertical'), {
    border: '2px outset #E6E6E6',
    margin: '10px 0'
  }),
  ipccClassLegend: new panels.LegendPanel('IPCC class legend',
    configuration.ipccClassLegend,
    'bottom-right'),
  mgciDistributionLegend: new panels.LegendPanel('MGCI distribution legend',
    configuration.mgciDistributionLegend,
    'bottom-left',
    '150px'),
  chartPanel: new ChartPanel(),
  yearForDistributionMap: ui.Panel({
    widgets: [
      ui.Label('Distribution map year: ', { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.yearForDistributionMapSelect,
    ],
    style: {
      width: '250px',
      padding: '8px',
      position: 'top-center',
    }
  }),
  layersManager: new panels.LayersManager({
    background: ui.Map.CloudStorageLayer({
      bucket: 'geofra2020',
      path: 'kapos3/2018',
      maxZoom: 10,
      suffix: '.png',
      name: 'MGCI distribution in 2018'
    })
  })
}
var mainPanels = {
  principal: ui.Panel({
    widgets: [
      ui.Label({
        value: configuration.i18n['Class, Kapos and Year'],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      ui.Label('1) ' + configuration.i18n['Country'], { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.countrySelect.element,
      ui.Label('2) ' + configuration.i18n['ESA CCI'], { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.yearSelect,
      ui.Label('3) ' + configuration.i18n['Kapos level'], { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.kaposLevelSelect,
      localPanels.buttons
    ],
    style: {
      width: '250px',
      padding: '8px',
      position: 'top-left',
      stretch: 'horizontal'
    }
  }),
}
localPanels.ipccClassLegend.addToMap()
localPanels.mgciDistributionLegend.addToMap()
localPanels.chartPanel.addToMap()
Map.add(localPanels.yearForDistributionMap)
Map.add(mainPanels.principal)