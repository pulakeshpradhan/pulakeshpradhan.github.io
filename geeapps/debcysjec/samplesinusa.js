var panels = require('users/kindgard/geoFRA:common/panels.js'),
  i18n = require('users/kindgard/geoFRA:common/i18n.js')
var country = 'USA'
var samplesInCountry = ee.FeatureCollection('users/debcysjec/faofra2020/samples/usa')
var proyectColumn = 'USA_provin'
var configuration = {
  i18n: i18n.en,
  stateAndNumberOfSamples: null,
  samplesLegend: {
    palette: ['000',
      'ff0000',
      'e33801',
      'ff9700',
      'e9a301',
      'fff300',
      'dfdf00',
      '55ff00',
      '15c900',
      '00ffd4',
      '03c8cb',
      '00a6ff',
      '0075c6',
      '0061ff',
      '001ea4',
      '7800ff',
      '7600be',
      'ec03ff',
      'a700a2',
    ],
    text: [
      'Proyect 0',
      'Proyect 1',
      'Proyect 2',
      'Proyect 3',
      'Proyect 4',
      'Proyect 5',
      'Proyect 6',
      'Proyect 7',
      'Proyect 8',
      'Proyect 9',
      'Proyect 10',
      'Proyect 11',
      'Proyect 12',
      'Proyect 13',
      'Proyect 14',
      'Proyect 15',
      'Proyect 16',
      'Proyect 17',
      'Proyect 18',
    ]
  },
}
var palette = ee.Dictionary({
  0: '000',
  1: 'ff0000',
  2: 'e33801',
  3: 'ff9700',
  4: 'e9a301',
  5: 'fff300',
  6: 'dfdf00',
  7: '55ff00',
  8: '15c900',
  9: '00ffd4',
  10: '03c8cb',
  11: '00a6ff',
  12: '0075c6',
  13: '0061ff',
  14: '001ea4',
  15: '7800ff',
  16: '7600be',
  17: 'ec03ff',
  18: 'a700a2',
})
function updateI18n() {
  configuration.i18n['Samples in ' + country] = 'Samples in ' + country
  configuration.i18n['State'] = 'State'
  configuration.i18n['Proyect'] = 'Proyect'
  configuration.i18n['Samples legend'] = 'Samples legend'
}
function updateStateAndNumbersInConf() {
  var onlyProyectNameCollection = samplesInCountry.map(function(element) {
    var proyectName = ee.Feature(element).get(proyectColumn)
    return ee.Feature(null, { proyectName: ee.String(proyectName) })
  })
  var onlyProyectNameList = onlyProyectNameCollection.toList(1000000).map(function(element) {
    return ee.Feature(element).get('proyectName')
  })
  var stateNameWithoutNumberList = onlyProyectNameList.distinct().map(function(ele) {
    var provinSplit = ee.String(ele).split('_')
    var proyect = ee.String(provinSplit.get(provinSplit.size().add(-1)))
    var isNumber = ee.Algorithms.If(proyect.match("^[0-9]*$").size().eq(1), 1, 0)
    var proyectNumber = ee.Algorithms.If(isNumber, provinSplit.slice(0, provinSplit.size().add(-1)).join('_'), ele)
    return proyectNumber
  })
  var uniqueStateNameList = stateNameWithoutNumberList.distinct().sort()
  var numberOfProyects = uniqueStateNameList.map(function(stateName) {
    return stateNameWithoutNumberList.frequency(stateName)
  })
  var info = ee.Dictionary.fromLists(uniqueStateNameList, numberOfProyects)
  info = info.map(function(key, value) {
    var proyectArray = ee.Algorithms.If(ee.Number(value).gt(1), ee.List.sequence(1, value), ee.List([]))
    return ee.List(proyectArray).map(function(number) {
      return ee.Number(number).format('%.0f')
    })
  })
  configuration.stateAndNumberOfSamples = info.getInfo()
}
updateI18n()
updateStateAndNumbersInConf()
function LayersManager() {
  this.createLayers()
}
LayersManager.prototype.updateLayer = function(index, image, text, visParams, shown) {
  this.layers[index].setEeObject(image ? image : ee.Image(0).mask(0))
  this.layers[index].setName(text)
  if (visParams)
    this.layers[index].setVisParams(visParams)
  if (typeof(shown) != 'undefined')
    this.layers[index].setShown(shown)
}
LayersManager.prototype.createLayers = function() {
  this.layers = [
    ui.Map.Layer(ee.Image(0).mask(0), null, 'Samples in state', false),
    ui.Map.Layer(ee.Image(0).mask(0), null, 'Samples in proyect', false),
  ]
  var layers = Map.layers()
  this.layers.forEach(function(layer) {
    layers.add(layer)
  })
}
function updateStateSamplesLayer() {
  function getSamplesInState() {
    return samplesInCountry.filter(ee.Filter.stringContains(proyectColumn, configuration.state))
  }
  function getSamplesWithProyectNumber(samples) {
    return samples.map(function(sample) {
      var provin = ee.String(sample.get(proyectColumn))
      var provinSplit = provin.split('_')
      var proyect = ee.String(provinSplit.get(provinSplit.size().add(-1)))
      var isNumber = ee.Algorithms.If(proyect.match("^[0-9]*$").size().eq(1), 1, 0)
      var proyectNumber = ee.Algorithms.If(isNumber, ee.Number.parse(proyect), 0)
      return ee.Feature(sample.geometry(), { proyect: proyectNumber })
    })
  }
  function getSamplesWithPalette(samplesRemapped) {
    return samplesRemapped.map(function(sample) {
      return sample.set({ style: { color: palette.get(sample.get('proyect')) } })
    })
  }
  var samplesInState = getSamplesInState()
  var samplesRemapped = getSamplesWithProyectNumber(samplesInState)
  var samplesWithPalette = getSamplesWithPalette(samplesRemapped)
  ui.util.setTimeout(function() {
    Map.centerObject(samplesInState)
  }, 10)
  uiElements.layersManager.updateLayer(1, null, 'Samples in proyect', null, false)
  uiElements.layersManager.updateLayer(0,
    samplesWithPalette.style({ styleProperty: "style" }),
    'Samples in ' + configuration.state,
    null,
    true
  )
}
function updateProyectLayer() {
  function getProyectSamples() {
    var countryProvin = configuration.state + '_' + configuration.proyect
    return samplesInCountry.filterMetadata(proyectColumn, 'equals', countryProvin)
  }
  var proyectSamples = getProyectSamples()
  uiElements.layersManager.updateLayer(1,
    proyectSamples,
    'Samples in ' + configuration.state + ' - Proyect ' + configuration.proyect,
    null,
    true
  )
}
Map.addLayer(ee.Image(1), { palette: ['000'] }, 'background', true, 0.5)
function updateProyectSelect() {
  var proyectList = configuration.stateAndNumberOfSamples[configuration.state]
  uiElements.numberOfSampleSelect.items().reset(proyectList)
  uiElements.numberOfSampleSelect.setDisabled(false)
}
var uiElements = {
  layersManager: new LayersManager(),
  stateSelect: ui.Select({
    value: configuration.state ? configuration.state : null,
    placeholder: configuration.i18n['State'],
    items: Object.keys(configuration.stateAndNumberOfSamples),
    style: {
      margin: '0 0 0 20px'
    },
    onChange: function(key) {
      configuration.state = key
      updateStateSamplesLayer()
      updateProyectSelect()
    }
  }),
  numberOfSampleSelect: ui.Select({
    value: configuration.numberOfSample ? configuration.numberOfSample : null,
    placeholder: configuration.i18n['Proyect'],
    style: {
      margin: '0 0 0 20px'
    },
    items: ['1', '2', '3'],
    disabled: true,
    onChange: function(key) {
      configuration.proyect = key
      updateProyectLayer()
    }
  }),
}
var localPanels = {
  kaposLevelLegend: new panels.LegendPanel(configuration.i18n['Samples legend'],
    configuration.samplesLegend,
    'bottom-right', 200),
}
var mainPanels = {
  principal: ui.Panel({
    widgets: [
      ui.Label({
        value: configuration.i18n['Samples in ' + country],
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '5px 5px',
          textAlign: 'center',
          stretch: 'horizontal'
        }
      }),
      ui.Label('1) ' + configuration.i18n['State'], { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.stateSelect,
      ui.Label('2) ' + configuration.i18n['Proyect'], { fontWeight: 'bold', fontSize: '15px' }),
      uiElements.numberOfSampleSelect,
    ],
    style: {
      width: '350px',
      padding: '8px',
      position: 'top-left',
      stretch: 'horizontal'
    }
  }),
}
localPanels.kaposLevelLegend.addToMap()
Map.add(mainPanels.principal)
Map.setCenter(-3.705, 9.25, 3)